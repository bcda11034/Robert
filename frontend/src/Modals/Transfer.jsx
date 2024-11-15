import { useRef } from "react";

function Transfer({ futuresUSDTBalance, spotUSDTBalance }) {

  const transferUSDTTypeRef = useRef(null);
  const transferUSDTAmountRef = useRef(null);
  const transferModalFuturesUSDTRef = useRef(null);
  const transferModalSpotUSDTRef = useRef(null);

  const transferAmount = futuresUSDTBalance - spotUSDTBalance;
  function transferUSDT() {
    const transferUSDTType = transferUSDTTypeRef.current.value;
    const transferUSDTAmount = parseFloat(transferUSDTAmountRef.current.value);
    if (transferUSDTType == "fromFutures") {
      if (transferUSDTAmount > futuresUSDTBalance) {
        alert("Insufficient USDT in the Futures account");
        return;
      } else {
        futuresUSDTBalance -= transferUSDTAmount;
        spotUSDTBalance += transferUSDTAmount;
      }
    }
    if (transferUSDTType == "fromSpot") {
      if (transferUSDTAmount > spotUSDTBalance) {
        alert("Insufficient USDT in the Spot account");
        return;
      } else {
        futuresUSDTBalance += transferUSDTAmount;
        spotUSDTBalance -= transferUSDTAmount;
      }
    }
    transferModalFuturesUSDTRef.current.textContent = futuresUSDTBalance.toFixed(2);
    transferModalSpotUSDTRef.current.textContent = spotUSDTBalance.toFixed(2);
    fetch(`${process.env.REACT_APP_API_URL}/api/balance/updateBalance`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        futuresUSDTBalance,
        spotUSDTBalance,
      }),
    })
      .then((response) => {
        alert("Operation completed successfully!");
        response.json();
      })
      .catch((error) => console.error());
  }

  return (
    <div id="transfer-USDT-modal" className="modal">
      {/* <!-- Modal content --> */}
      <div className="modal-content-transfer">
        <span
          className="close"
          onClick={() => {
            document.getElementById("transfer-USDT-modal").style.display =
              "none";
          }}
        >
          &times;
        </span>
        <h2>USDT Transfer</h2>
        <br />
        <p>
          <span className="money-type">Est. Futures Balance(USDT)</span>
          <span
            className="money-value"
            id="transfer-modal-futures-USDT"
            ref={transferModalFuturesUSDTRef}
          ></span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="money-type">Est. Spot Balance(USDT)</span>
          <span
            className="money-value"
            id="transfer-modal-spot-USDT"
            ref={transferModalSpotUSDTRef}
          ></span>
        </p>
        <br />
        <p style={{ fontSize: "20px" }}>
          <span>Mode:</span>
          <select name="transferType" id="transfer-USDT-type" ref={transferUSDTTypeRef}>
            <option value="fromFutures" selected>
              Futures - Spot
            </option>
            <option value="fromSpot" selected>
              Spot - Futures
            </option>
          </select>
          <span>Amount:</span>
          <input
            type="number"
            min="1"
            max="100"
            id="transfer-USDT-amount"
            style={{ fontSize: "20px", margin: "10px" }}
            ref={transferUSDTAmountRef}
          />
          <span className="money-unit">(USDT)</span>
          <button id="transfer-USDT-btn" onClick={() => transferUSDT()}>
            Transfer
          </button>
        </p>
      </div>
    </div>
  )
}

export default Transfer