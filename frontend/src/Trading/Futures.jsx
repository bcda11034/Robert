import TradingViewWidget from "../TradingViewWidget";

function Futures ({selectedFuturesChartSymbol, tradingEnable, futuresAssetType}) {

  async function futuresTrading(positionType, orderType) {
    if(!tradingEnable)return;
    tradingEnable = false;

    let betAmount = 0;
    let leverage = 0;
    let limitPrice = 0;
    if (orderType == "market") {
      betAmount = parseFloat(document.getElementById("bet-amount").value);
      leverage = parseFloat(document.getElementById("bet-leverage").value);
    }
    if (orderType == "limit") {
      betAmount = parseFloat(document.getElementById("limit-amount").value);
      leverage = parseFloat(document.getElementById("limit-leverage").value);
      limitPrice = parseFloat(document.getElementById("limit-price").value);
      if (isNaN(limitPrice)) {
        alert("Please enter a valid Limit Price");
        tradingEnable = true;
        return;
      }
    }

    if (isNaN(betAmount) || betAmount <= 0) {
      alert("Please enter a valid bet amount.");
      tradingEnable = true;
      return;
    }
    if (isNaN(leverage) || leverage < 1 || leverage > 300) {
      alert("Please enter a valid bet amount.");
      tradingEnable = true;
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/position/openFuturesPosition`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        futuresAssetType,
        positionType: positionType === "long" ? "Long" : "Short",
        orderType: orderType,
        amount: betAmount,
        leverage: leverage,
        limitPrice: limitPrice,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          tradingEnable = true;
          throw new Error("Network response was not ok");
        }
        tradingEnable = true;
        return response.json();
      })
      .then((data) => {
        //fetchUserData();
        tradingEnable = true;
        alert(`Placed a ${positionType} bet of $${betAmount}`);
      })
      .catch((error) => {
        tradingEnable = true;
        console.error("Error placing bet:", error);
        alert("Error placing bet. Please try again.");
      });
  }

  function showFuturesAssetsList() {
    const isVisible =
      document.getElementById("futures-dropdownOptions").style
        .display === "block";
    document.getElementById("futures-dropdownOptions").style.display =
      isVisible ? "none" : "block";
  }

  return (
      <div id="futures" className="tabcontent trading-panel">
      <div id="futures-statistics"></div>
      <div id="futures-now-price" style={{ margin: "10px" }}></div>
      <h3 style={{ margin: "15px" }}>MEXC Futures Asset Price Chart</h3>
      <div className="chart-container">
        <TradingViewWidget
          symbol={selectedFuturesChartSymbol}
          key={selectedFuturesChartSymbol}
          id="futures-tradingview-widget"
        ></TradingViewWidget>
      </div>

      <div className="order-panel">
        <div className="order-header">
          <div className="asset-label">Select an Asset Type:</div>
          <div className="custom-dropdown">
            <div
              className="custom-dropdown-selected"
              id="futures-dropdownSelected"
              onClick={() => {showFuturesAssetsList();}}
            ></div>
            <div
              className="custom-dropdown-options"
              id="futures-dropdownOptions"
            ></div>
          </div>
        </div>

        <div>
          <label style={{ color: "rgb(255, 0, 0)", fontSize: "24px" }}>
            Market Order:{" "}
          </label>
          &nbsp;&nbsp;
          <label>Bet Amount:</label>
          <input
            type="number"
            id="bet-amount"
            min="1"
            max="100"
            style={{ width: "80px", fontSize: "20px" }}
          />
          <span className="money-unit">(USDT)</span>&nbsp;&nbsp;
          <label>Leverage:</label>
          <input
            type="number"
            id="bet-leverage"
            min="1"
            max="300"
            defaultValue="1"
            style={{ width: "50px", fontSize: "20px" }}
          />
          &nbsp;&nbsp;
          <button
            id="long-button"
            className="playbutttton"
            style={{ marginTop: "15px" }}
            onClick={() => tradingEnable && futuresTrading("long", "market")}
          >
            Long
          </button>
          &nbsp;&nbsp;
          <button
            id="short-button"
            className="playbutttton"
            style={{ marginTop: "15px" }}
            onClick={() => tradingEnable && futuresTrading("short", "market")}
          >
            Short
          </button>
          &nbsp;&nbsp;
        </div>
        <div>
          <label style={{ color: "rgb(255, 0, 0)", fontSize: "24px" }}>
            Limit Order:{" "}
          </label>
          &nbsp;&nbsp;
          <label>Bet Amount:</label>
          <input
            type="number"
            id="limit-amount"
            min="1"
            max="100"
            style={{ width: "80px", fontSize: "20px" }}
          />
          <span className="money-unit">(USDT)</span>&nbsp;&nbsp;
          <label>Leverage:</label>
          <input
            type="number"
            id="limit-leverage"
            min="1"
            max="300"
            defaultValue="1"
            style={{ width: "50px", fontSize: "20px" }}
          />
          &nbsp;&nbsp;
          <label>Limit Price:</label>
          <input
            type="number"
            id="limit-price"
            style={{ width: "100px", fontSize: "20px" }}
          />
          <span className="money-unit">(USDT)</span>&nbsp;&nbsp;
          <button
            id="limit-long-button"
            className="playbutttton"
            style={{ marginTop: "15px" }}
            onClick={() => {
              futuresTrading("long", "limit");
            }}
          >
            Long
          </button>
          &nbsp;&nbsp;
          <button
            id="limit-short-button"
            className="playbutttton"
            style={{ marginTop: "15px" }}
            onClick={() => {
              futuresTrading("short", "limit");
            }}
          >
            Short
          </button>
          &nbsp;&nbsp;
        </div>
      </div>
      <h3 style={{ color: "#ff8c00" }}>Open Positions</h3>
      <div id="futures-open-positions"></div>
      <h3 style={{ color: "#ff8c00" }}>Open Orders</h3>
      <div id="futures-open-orders"></div>
      <h3 style={{ color: "#ff8c00" }}>Closed Positions</h3>
      <div id="futures-closed-positions"></div>
    </div>
  )
}

export default Futures;