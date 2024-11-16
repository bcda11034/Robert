import React from 'react'

function AssetDropdown({ assetTypes, futuresAssetType, futuresPriceData, futuresSelectOption }) {

    return (
        <> {
            assetTypes.map((asset, index) => {
                if (asset != futuresAssetType) {
                    let currentPrice = (futuresPriceData?.currentPrices || []).find(
                        (item) => item.assetType === asset
                    );
                    return (
                        <div class="dropdown-option" id={`dropdown-option-${index}`} onClick={() => futuresSelectOption(asset)} key={`dropdown-option-${index}`}>
                            <span class="crypto-icon-small"><img src={`icon/${asset}.png`} /></span>
                            <span class="money-type">${asset}_USDT:&nbsp; </span>
                            <span class="money-value">
                                ${Intl.NumberFormat("en-US").format(currentPrice?.price)}
                            </span>&nbsp;&nbsp;
                            <span class={currentPrice?.percent >= 0 ? "percent-plus" : "percent-minus"}>
                                ${ (currentPrice?.percent != null) ? (currentPrice.percent * 100).toFixed(2) : "" }%
                            </span>
                        </div>
                    )
                }
            })
        }
        </>
    )

};

export default AssetDropdown;