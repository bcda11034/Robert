const { getAllUsers } = require('../services/userService');
const { getUserPositions, saveUserPositions } = require('./positionService');

async function startCheckingOrderService() {
    console.log('Checking orders service started...');
    setInterval(async () => {
        const allUsers = await getAllUsers();
        allUsers.forEach(async user => {
            let userPositions = await getUserPositions(user.username);
            let spotPositions = userPositions.spotPositions;
            spotPositions.filter(spotPosition => (spotPosition.orderType == "limit")).forEach(spotPosition => {
            
            });
        });
    }, 1000);
}

// {
//     id: 1731912827171,
//     assetType: 'BTC',
//     positionType: 'buy',
//     orderType: 'limit',
//     orderLimit: 0,
//     amount: 1,
//     limitPrice: 91348.01,
//     entryPrice: 91335.16
// }

module.exports = { startCheckingOrderService };