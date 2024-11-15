import React from 'react'

function FuturesSelected({ futuresAssetType, futuresPriceData }) {
    let futuresCurrentPrices = futuresPriceData?.currentPrices || [];
    let currentPrice = futuresCurrentPrices.find(
        (item) => item.assetType === futuresAssetType
    );
    return (
        <div>
            <span class="crypto-icon-small">
                <img src={`icon/${futuresAssetType}.png`} style={{ width: "48px", height: "48px" }} />
            </span>
            <span class="money-type">${futuresAssetType}_USDT:&nbsp;&nbsp;</span>
            <span class="money-value">
                ${currentPrice?.price != null ? Intl.NumberFormat(
                    "en-US"
                ).format(
                    currentPrice.price
                ) : ""}
            </span> &nbsp;&nbsp;
            <span class={currentPrice?.percent >= 0
                ? "percent-plus"
                : "percent-minus"
            }>${currentPrice?.percent != null ? (currentPrice.percent * 100).toFixed(2) : ""}%
            </span>
        </div>
    )
}

export default FuturesSelected