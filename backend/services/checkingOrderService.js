const { getAllUsers, saveUser } = require('../services/userService');
const { getUserPositions, saveUserPositions, saveUserSpotPositions } = require('./positionService');
const { fetchCurrentMarketPrices } = require('../utils/market');
const { sendTokenBuyEmail, sendTokenSellEmail, sendSpotLimitSucceedEmail } = require('../utils/email');
const { closeSpotPosition } = require('./spotPositionService');
const { getUserBalance, updateUserBalance } = require('../services/balanceService');

async function startCheckingOrderService() {
    console.log('Checking orders service started...');
    setInterval(async () => {
        try {
            console.log("timer started");
            const allUsers = await getAllUsers();
            const currentMarketPrices = await fetchCurrentMarketPrices("spot");
            allUsers.forEach(async (user, userIndex, userArray) => {
                let userPositions = await getUserPositions(user.username);
                let spotPositions = userPositions.spotPositions;
                spotPositions.forEach((spotPosition, spotPositionIndex, spotPositionArray) => {
                    if (spotPosition.orderType == "limit" 
                        && spotPosition.orderLimit == 1
                        && currentMarketPrices != null) {
                        const currentMarketPrice = currentMarketPrices.find(
                            (item) => item.assetType == spotPosition.assetType
                        );
                        if (currentMarketPrice != null && currentMarketPrice?.price != null) {
                            if (spotPosition.positionType == 'buy' 
                                && currentMarketPrice.price <= spotPosition.limitPrice
                                && user.spotUSDTBalance >= spotPosition.amount * currentMarketPrice.price) {
                                // Add the amount and profit/loss
                                userArray[userIndex].spotUSDTBalance -= spotPosition.amount * currentMarketPrice.price;
                                spotPositionArray[spotPositionIndex].orderLimit = 0;
                                saveUser(userArray[userIndex]);
                                saveUserSpotPositions(user.username, spotPositionArray);
                                sendSpotLimitSucceedEmail(user.username, spotPosition, currentMarketPrice.price);
                                console.log(
                                    `limit order buy succeed!`
                                    `currentMarketPrice = ${currentMarketPrice.price}`
                                    `limitPrice = ${spotPosition.limitPrice}`
                                    `positionId = ${spotPosition.id}`
                                );

                            }
                            if (spotPosition.positionType == 'sell'
                                && currentMarketPrice.price >= spotPosition.limitPrice) {
                                userArray[userIndex].spotUSDTBalance += spotPosition.amount * currentMarketPrice.price;
                                spotPositionArray[spotPositionIndex].orderLimit = 0;
                                saveUser(userArray[userIndex]);
                                saveUserSpotPositions(user.username, spotPositionArray);
                                sendSpotLimitSucceedEmail(user.username, spotPosition, currentMarketPrice.price);
                                console.log(
                                    `limit order sell succeed!`
                                    `currentMarketPrice = ${currentMarketPrice.price}`
                                    `limitPrice = ${spotPosition.limitPrice}`
                                    `positionId = ${spotPosition.id}`
                                );

                            }
                        }
                    }
                });
            })
        } catch (error) {
            
        };
        console.log("timer finished");
    }, 1000);
}

module.exports = { startCheckingOrderService };