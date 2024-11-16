import TradingViewWidget from "../TradingViewWidget";

function Spot({ tradingEnable, spotUSDTBalance, spotCurrentPrices, spotAssetType, spotBalances, assetTypes, selectedSpotChartSymbol }) 
{
  function spotTrading(positionType, orderType) {
    if (!tradingEnable) return;
    tradingEnable = false;

    let amount = 0;
    let limitPrice = 0;
    if (orderType == "market") {
      amount = parseFloat(document.getElementById("spot-market-amount").value);
    }
    if (orderType == "limit") {
      amount = parseFloat(document.getElementById("spot-limit-amount").value);
      limitPrice = parseFloat(
        document.getElementById("spot-limit-price").value
      );
      if (isNaN(limitPrice)) {
        alert("Please enter a valid Limit Price");
        tradingEnable = true;
        return;
      }
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      tradingEnable = true;
      return;
    }

    if (positionType == "buy") {
      let spotCurrentPrice = spotCurrentPrices.filter((item) => item.assetType == spotAssetType)[0];

      if (spotCurrentPrice?.price != null && spotUSDTBalance < amount * spotCurrentPrice.price) {
        console.log(spotUSDTBalance, amount, spotCurrentPrices);
        alert("Insufficient USDT");
        tradingEnable = true;
        return;
      }
    }

    if (positionType == "sell") {
      if (amount > spotBalances[assetTypes.indexOf(spotAssetType) + 1]) {
        alert("Insufficient " + spotAssetType + amount + "/" + spotBalances[assetTypes.indexOf(spotAssetType) + 1] + "/" + (assetTypes.indexOf(spotAssetType) + 1) + ":" + spotBalances.length);
        tradingEnable = true;
        return;
      }
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/openSpotPosition`, { method: "POST", headers: { Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json", },
      body: JSON.stringify({
        spotAssetType,
        positionType,
        orderType,
        amount,
        limitPrice,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        tradingEnable = true;
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert(`${positionType} ${amount} ${spotAssetType}`);
      tradingEnable = true;
    })
    .catch((error) => {
      tradingEnable = true;
      console.error("Error placing bet:", error);
      alert("Error placing bet. Please try again.");
    });
  }

  function showSpotAssetsList() {
    const isVisible =
      document.getElementById("spot-dropdownOptions").style
        .display === "block";
    document.getElementById("spot-dropdownOptions").style.display =
      isVisible ? "none" : "block";
  }

  return (
    <div id="spot" className="tabcontent trading-panel">
      <div id="spot-statistics"></div>
      <div id="spot-now-price" style={{ margin: "10px" }}></div>
      <h3 style={{ margin: "15px" }}>MEXC Spot Asset Price Chart</h3>

      <div className="chart-container">
        <TradingViewWidget symbol={selectedSpotChartSymbol} key={selectedSpotChartSymbol} id="tradingview-widget"></TradingViewWidget>
      </div>

      <div className="order-panel">
        <div className="order-header">
          <div className="asset-label">Select an Asset Type:</div>
          <div className="custom-dropdown">
            <div className="custom-dropdown-selected" id="spot-dropdownSelected" onClick={() => { showSpotAssetsList(); }}></div>
            <div className="custom-dropdown-options" id="spot-dropdownOptions"></div>
          </div>
          <div style={{ margin: "15px" }} id="spot-assets-statistics"></div>
        </div>

        <div>
          <label style={{ color: "rgb(255, 0, 0)", fontSize: "24px" }}>Market:{" "}</label>
          &nbsp;&nbsp;
          <label>Amount:</label>
          <input type="number" id="spot-market-amount" min="1" max="100" style={{ width: "80px", fontSize: "20px" }} />
          <span className="money-unit" id="spot-market-unit"></span>
          &nbsp;&nbsp;
          <button id="market-buy-button" className="playbutttton" style={{ marginTop: "15px" }} 
            onClick={() => spotTrading("buy", "market")}>Buy
          </button>
          &nbsp;&nbsp;
          <button  id="market-sell-button" className="playbutttton" style={{ marginTop: "15px" }}
            onClick={() => spotTrading("sell", "market")}>Sell
          </button>
        </div>
        <div>
          <label style={{ color: "rgb(255, 0, 0)", fontSize: "24px" }}>Limit:{" "}
          </label>
          &nbsp;&nbsp;
          <label>Amount:</label>
          <input type="number" id="spot-limit-amount" min="1" max="100" style={{ width: "80px", fontSize: "20px" }} />
          <span className="money-unit" id="spot-limit-unit"></span>
          &nbsp;&nbsp;
          <label>Price:</label>
          <input type="number" id="spot-limit-price" min="1" max="100" style={{ width: "80px", fontSize: "20px" }} />
          <span className="money-unit">(USDT)</span>&nbsp;&nbsp;
          <button id="limit-buy-button" className="playbutttton" style={{ marginTop: "15px" }}
            onClick={() => spotTrading("buy", "limit")}>Buy
          </button>
          &nbsp;&nbsp;
          <button id="limit-sell-button" className="playbutttton" style={{ marginTop: "15px" }}
            onClick={() => spotTrading("sell", "limit")}>Sell
          </button>
        </div>
      </div>
      {/* <h3 style={{ color: '#ff8c00' }}>Open Positions</h3>
      <div id="spot-open-positions"></div> */}
      <h3 style={{ color: "#ff8c00" }}>Open Orders</h3>
      <div id="spot-open-orders"></div>
      <h3 style={{ color: "#ff8c00" }}>Closed Positions</h3>
      <div id="spot-closed-positions"></div>
    </div>
  )
}

export default Spot;