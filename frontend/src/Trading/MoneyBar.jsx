import React from 'react'

function MoneyBar({ futuresPriceData }) {
  return (
    <div class='money-bar' style={{ justifyContent: 'space-between' }}>
      {
        (futuresPriceData?.currentPrices || []).map(
          (price) => {
            return (
              <div class='money-div' style={{ display: 'flex', flexDirection: 'column' }}>
                <span class='money-type'>${price.assetType}:</span>
                <span class='money-value'>${new Intl.NumberFormat("en-US").format(price.price)}</span>
                <span class={price.percent >= 0 ? "percent-plus" : "percent-minus"}>${(price.percent * 100).toFixed(2)}%&nbsp;</span>
              </div>
            )
          }
        )
      }
    </div>
  )
}

export default MoneyBar