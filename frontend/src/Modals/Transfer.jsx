function Transfer({ futuresUSDTBalance, spotUSDTBalance }) {
    function transferUSDT() {
        const transferUSDTType =
          document.getElementById("transfer-USDT-type").value;
        const transferUSDTAmount = parseFloat(
          document.getElementById("transfer-USDT-amount").value
        );
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
            // console.log(futuresUSDTBalance, spotUSDTBalance);
            futuresUSDTBalance += transferUSDTAmount;
            spotUSDTBalance -= transferUSDTAmount;
            // console.log(futuresUSDTBalance, spotUSDTBalance);
          }
        }
        document.getElementById("transfer-modal-futures-USDT").textContent =
          futuresUSDTBalance.toFixed(2);
        document.getElementById("transfer-modal-spot-USDT").textContent =
          spotUSDTBalance.toFixed(2);
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
                ></span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="money-type">Est. Spot Balance(USDT)</span>
                <span className="money-value" id="transfer-modal-spot-USDT"></span>
            </p>
            <br />
            <p style={{ fontSize: "20px" }}>
                <span>Mode:</span>
                <select name="transferType" id="transfer-USDT-type">
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