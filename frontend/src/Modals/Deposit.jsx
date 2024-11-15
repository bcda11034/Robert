import "../trading.css";
import axios from "axios";

function Deposit({ availableAmount, options, selectedNetwork, networks }) {
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })

    function copyAddress() {
        const address = document.getElementById("address").innerText;
        navigator.clipboard.writeText(address)
            .then(() => {
                alert("Address copied to clipboard");
            })
            .catch((err) => {
                alert("Failed to copy address");
            });
    }

    function validateForm() {
        const amountInput = document.getElementById("amountInput");
        const addressInput = document.getElementById("addressInput");
        const amountValue = amountInput.value.trim();
        const isValidAmount =
            !amountValue.startsWith("0") &&
            !isNaN(parseFloat(amountValue)) &&
            parseFloat(amountValue) >= 10 &&
            parseFloat(amountValue) <= availableAmount;
        const withdrawButton = document.getElementById("withdrawButton");
        // Check if there are any error messages or if inputs are invalid
        if (addressInput.value.length === 42 && isValidAmount) {
            withdrawButton.disabled = false;
        } else {
            withdrawButton.disabled = true;
        }
    }

    return (
        <div id="popup-modal" className="popup-modal">
            <div className="popup-modal-content">
                <div id="user-info">
                    <div className="zaclose">
                        <img
                            src="img/close.png"
                            id="popup-close-btn"
                            className="closee"
                            onClick={() => {
                                document
                                    .getElementById("popup-modal")
                                    .setAttribute("style", "display: none");
                            }}
                        />
                        <h2 style={{ fontSize: "20px" }}>Transfer Crypto</h2>
                    </div>
                    <div className="deposit-header"></div>
                    <div className="toggle-buttons-custom">
                        <button
                            id="deposit-toggle-custom"
                            style={{
                                fontSize: "14px",
                                borderRadius: "10px",
                                paddingTop: "11px",
                            }}
                            className="toggle-button-custom active"
                            onClick={(event) => {
                                document
                                    .getElementById("withdraw-toggle-custom")
                                    .classList.remove("active");
                                document
                                    .getElementById("deposit-toggle-custom")
                                    .classList.add("active");
                                document
                                    .getElementById("deposit-content-custom")
                                    .classList.add("active");
                                document
                                    .getElementById("withdraw-content-custom")
                                    .classList.remove("active");
                                event.currentTarget.classList.add("active");
                            }}
                        >
                            Deposit
                        </button>

                        <button
                            id="withdraw-toggle-custom"
                            style={{
                                fontSize: "14px",
                                borderRadius: "10px",
                                paddingTop: "11px",
                            }}
                            className="toggle-button-custom"
                            onClick={(event) => {
                                document
                                    .getElementById("deposit-toggle-custom")
                                    .classList.remove("active");
                                document
                                    .getElementById("withdraw-toggle-custom")
                                    .classList.add("active");
                                document
                                    .getElementById("withdraw-content-custom")
                                    .classList.add("active");
                                document
                                    .getElementById("deposit-content-custom")
                                    .classList.remove("active");
                                event.currentTarget.classList.add("active");
                            }}
                        >
                            Withdraw
                        </button>
                    </div>
                    {/* <!-- DEPOSIT --> */}
                    <div
                        id="deposit-content-custom"
                        className="content-section-custom active"
                    >
                        <div id="network-selectors">
                            {/* <!--Asset Dropdown--> */}
                            <div
                                className="custom-dropdown"
                                style={{ flex: 1, fontWeight: 550, fontSize: "15px" }}
                            >
                                <label className="choose">Choose Asset</label>
                                <div
                                    className="custom-dropdown-selected"
                                    style={{
                                        marginBottom: "5px",
                                        marginTop: "5px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: "#26235a",
                                        padding: "10px",
                                        borderRadius: "8px",
                                    }}
                                    id="network-selector2"
                                    onClick={() => {
                                        document
                                            .querySelectorAll(".custom-dropdown")
                                            .forEach((dropdown) => {
                                                const selected = dropdown.querySelector(
                                                    ".custom-dropdown-selected"
                                                );
                                                const options = dropdown.querySelector(
                                                    ".custom-dropdown-options"
                                                );

                                                selected.addEventListener("click", () => {
                                                    dropdown.classList.toggle("open");
                                                });

                                                options
                                                    .querySelectorAll(".custom-dropdown-option")
                                                    .forEach((option) => {
                                                        option.addEventListener("click", () => {
                                                            selected.querySelector(
                                                                ".custom-dropdown-selected-text"
                                                            ).textContent = option.textContent;
                                                            dropdown.classList.remove("open");
                                                        });
                                                    });

                                                // Close dropdown when clicking outside
                                                window.addEventListener("click", (event) => {
                                                    if (!dropdown.contains(event.target)) {
                                                        dropdown.classList.remove("open");
                                                    }
                                                });
                                            });
                                    }}
                                >
                                    <span className="custom-dropdown-selected-text">
                                        USDT
                                    </span>
                                    <span className="custom-dropdown-arrow">
                                        <img width="14px" src="img/arrow-right.png" />
                                    </span>
                                </div>
                                <div className="custom-dropdown-options">
                                    <hr className="separator2" />
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/ETH.png"
                                            style={{
                                                width: "24px",
                                                marginLeft: "10px",
                                            }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>ETH</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/brett.png"
                                            style={{
                                                width: "25px",
                                                height: "25px",
                                                marginLeft: "10px",
                                            }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>BRETT</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/people.png"
                                            style={{ width: "22px", marginLeft: "10px" }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>PEOPLE</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/USDT.png"
                                            style={{ width: "22px", marginLeft: "10px" }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>USDT</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/USDC.png"
                                            style={{ width: "22px", marginLeft: "10px" }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>USDC</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/BNB.png"
                                            style={{ width: "22px", marginLeft: "10px" }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>BNB</span>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Network Dropdown--> */}
                            <div
                                className="custom-dropdown"
                                style={{ flex: 1, fontWeight: 550, fontSize: "15px" }}
                            >
                                <label className="choose">Choose Network</label>
                                <div
                                    className="custom-dropdown-selected"
                                    style={{
                                        marginBottom: "5px",
                                        marginTop: "5px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: "#26235a",
                                        padding: "10px",
                                        borderRadius: "8px",
                                    }}
                                    id="network-selector2"
                                    onClick={() => {
                                        document
                                            .querySelectorAll(".custom-dropdown")
                                            .forEach((dropdown) => {
                                                const selected = dropdown.querySelector(
                                                    ".custom-dropdown-selected"
                                                );
                                                const options = dropdown.querySelector(
                                                    ".custom-dropdown-options"
                                                );

                                                selected.addEventListener("click", () => {
                                                    dropdown.classList.toggle("open");
                                                });

                                                options
                                                    .querySelectorAll(".custom-dropdown-option")
                                                    .forEach((option) => {
                                                        option.addEventListener("click", () => {
                                                            selected.querySelector(
                                                                ".custom-dropdown-selected-text"
                                                            ).textContent = option.textContent;
                                                            dropdown.classList.remove("open");
                                                        });
                                                    });

                                                // Close dropdown when clicking outside
                                                window.addEventListener("click", (event) => {
                                                    if (!dropdown.contains(event.target)) {
                                                        dropdown.classList.remove("open");
                                                    }
                                                });
                                            });
                                    }}
                                >
                                    <span className="custom-dropdown-selected-text">
                                        ERC-20
                                    </span>
                                    <span className="custom-dropdown-arrow">
                                        <img width="14px" src="img/arrow-right.png" />
                                    </span>
                                </div>
                                <div className="custom-dropdown-options">
                                    <hr className="separator2" />
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/ETH3.png"
                                            style={{
                                                width: "15px",
                                                height: "24px",
                                                marginLeft: "15px",
                                            }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>ERC-20</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/bsc.png"
                                            style={{
                                                width: "25px",
                                                height: "25px",
                                                marginLeft: "10px",
                                            }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>BSC</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/base.png"
                                            style={{ width: "22px", marginLeft: "10px" }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>Base</span>
                                    </div>
                                    <div className="custom-dropdown-option">
                                        <img
                                            src="img/arb.png"
                                            style={{ width: "22px", marginLeft: "10px" }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>
                                            Arbitrum One
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="qr-add" style={{ marginBottom: "15px" }}>
                            {/* <!-- QR Code Image --> */}
                            <div id="qr-code-container">
                                <img id="qr-code" style={{ display: "none" }} />
                            </div>
                            <div id="address-container">
                                <div style={{ overflow: "hidden" }}>
                                    <label className="choose">Deposit Address</label>
                                    <div id="address"></div>
                                </div>
                                <img
                                    src="img/copy.png"
                                    style={{ width: "21px", marginTop: "15px" }}
                                    id="copy-icon"
                                    onClick={copyAddress}
                                />
                            </div>
                        </div>
                        <div
                            id="warningContainer"
                            className="warning-container-darkblue"
                        >
                            <p className="warning-text">
                                <img src="img/warning2.png" className="warning-icon" />
                                Minimum Deposit: $1.5 ∼ 1.5 USDT
                            </p>
                        </div>
                    </div>

                    {/* <!-- WITHDRAW --> */}
                    <div
                        id="withdraw-content-custom"
                        className="content-section-custom"
                        style={{ fontWeight: "bold" }}
                    >
                        <div id="network-selectors">
                            {/* <!--Asset Dropdown--> */}
                            <div className="custom-dropdown" style={{ flex: 1 }}>
                                <label className="choose">Choose Asset</label>
                                <div
                                    className="custom-dropdown-selected"
                                    style={{
                                        margin: "5px 0",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: "#26235a",
                                        padding: "10px",
                                        borderRadius: "8px",
                                    }}
                                    id="network-selector1"
                                    onClick={() => {
                                        document
                                            .querySelectorAll(".custom-dropdown")
                                            .forEach((dropdown) => {
                                                const selected = dropdown.querySelector(
                                                    ".custom-dropdown-selected"
                                                );
                                                const options = dropdown.querySelector(
                                                    ".custom-dropdown-options"
                                                );

                                                selected.addEventListener("click", () => {
                                                    dropdown.classList.toggle("open");
                                                });

                                                options
                                                    .querySelectorAll(".custom-dropdown-option")
                                                    .forEach((option) => {
                                                        option.addEventListener("click", () => {
                                                            selected.querySelector(
                                                                ".custom-dropdown-selected-text"
                                                            ).textContent = option.textContent;
                                                            dropdown.classList.remove("open");
                                                        });
                                                    });

                                                // Close dropdown when clicking outside
                                                window.addEventListener("click", (event) => {
                                                    if (!dropdown.contains(event.target)) {
                                                        dropdown.classList.remove("open");
                                                    }
                                                });
                                            });
                                    }}
                                >
                                    <span
                                        className="custom-dropdown-selected-text"
                                        style={{ fontSize: "15px" }}
                                    >
                                        USDT
                                    </span>
                                    <span className="custom-dropdown-arrow">
                                        <img width="14px" src="img/arrow-right.png" />
                                    </span>
                                </div>
                                <div
                                    className="custom-dropdown-options"
                                    id="transfer-crypto-assets"
                                >
                                    <hr className="separator2" />
                                    <div
                                        className="custom-dropdown-option"
                                        style={{
                                            fontSize: "14px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "10px",
                                        }}
                                    >
                                        <div
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <img
                                                src="img/ETH.png"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                            <span style={{ marginLeft: "10px" }}>ETH</span>
                                        </div>
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "#929292",
                                            }}
                                        >
                                            0.00
                                        </span>
                                    </div>
                                    <div
                                        className="custom-dropdown-option"
                                        style={{
                                            fontSize: "14px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "10px",
                                        }}
                                    >
                                        <div
                                            style={{ display: "flex", alignitems: "center" }}
                                        >
                                            <img
                                                src="img/brett.png"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                            <span style={{ marginLeft: "10px" }}>BRETT</span>
                                        </div>
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                display: "flex",
                                                color: "#afafaf",
                                            }}
                                        >
                                            0.00
                                        </span>
                                    </div>
                                    <div
                                        className="custom-dropdown-option"
                                        style={{
                                            fontSize: "14px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "10px",
                                        }}
                                    >
                                        <div
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <img
                                                src="img/people.png"
                                                alt="People Icon"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                            <span style={{ marginLeft: "10px" }}>PEOPLE</span>
                                        </div>
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                display: "flex",
                                                color: "#afafaf",
                                            }}
                                        >
                                            0.00
                                        </span>
                                    </div>
                                    {
                                        options.map((option, index) => (
                                            <div
                                                key={index}
                                                className="custom-dropdown-option"
                                                style={{
                                                    fontSize: "14px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: "10px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <img
                                                        src={option.imgSrc}
                                                        alt={`${option.label} icon`}
                                                        style={{ width: "24px", height: "24px" }}
                                                    />
                                                    <span style={{ marginLeft: "10px" }}>
                                                        {option.label}
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: "bold",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: "#afafaf",
                                                    }}
                                                >
                                                    {option.balance}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {/* <!--Network Dropdown--> */}
                            <div
                                className="custom-dropdown"
                                style={{ flex: 1, fontSize: "15px" }}
                            >
                                <label className="choose">Choose Network</label>
                                <div
                                    className="custom-dropdown-selected"
                                    style={{
                                        margin: "5px 0",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: "#26235a",
                                        padding: "10px",
                                        borderRadius: "8px",
                                    }}
                                    onClick={() => {
                                        document
                                            .querySelectorAll(".custom-dropdown")
                                            .forEach((dropdown) => {
                                                const selected = dropdown.querySelector(
                                                    ".custom-dropdown-selected"
                                                );
                                                const options = dropdown.querySelector(
                                                    ".custom-dropdown-options"
                                                );

                                                selected.addEventListener("click", () => {
                                                    dropdown.classList.toggle("open");
                                                });

                                                options
                                                    .querySelectorAll(".custom-dropdown-option")
                                                    .forEach((option) => {
                                                        option.addEventListener("click", () => {
                                                            selected.querySelector(
                                                                ".custom-dropdown-selected-text"
                                                            ).textContent = option.textContent;
                                                            dropdown.classList.remove("open");
                                                        });
                                                    });

                                                // Close dropdown when clicking outside
                                                window.addEventListener("click", (event) => {
                                                    if (!dropdown.contains(event.target)) {
                                                        dropdown.classList.remove("open");
                                                    }
                                                });
                                            });
                                    }}
                                    id="network-selector2"
                                >
                                    <span className="custom-dropdown-selected-text">
                                        {selectedNetwork}
                                    </span>
                                    <span className="custom-dropdown-arrow">
                                        <img
                                            width="14px"
                                            src="img/arrow-right.png"
                                            alt="Arrow icon"
                                        />
                                    </span>
                                </div>
                                {
                                    <div className="custom-dropdown-options">
                                        <hr className="separator2" />
                                        {networks.map((network, index) => (
                                            <div
                                                key={index}
                                                className="custom-dropdown-option"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    padding: "5px 0",
                                                }}
                                            >
                                                <img
                                                    src={network.imgSrc}
                                                    alt={`${network.label} icon`}
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        marginLeft: "10px",
                                                    }}
                                                />
                                                <span style={{ marginLeft: "10px" }}>
                                                    {network.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>

                        <span
                            id="welcome-message"
                            style={{ pointerEvents: "none", color: "transparent" }}
                        >
                            Login
                        </span>
                        <div className="amount-sectionz">
                            <div className="razss">
                                <label style={{ margin: 0 }} className="choose">
                                    Withdraw Address
                                </label>
                                <div
                                    id="error-message2"
                                    className="error-message2"
                                ></div>
                            </div>
                            <div className="input-wrapperz">
                                <input
                                    type="text"
                                    id="addressInput"
                                    className="inputz"
                                    style={{
                                        height: "20px",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                    }}
                                    placeholder="0xc4.."
                                    onChange={(event) => {
                                        if (event.target.value !== 42) {
                                            document.getElementById(
                                                "error-message2"
                                            ).textContent = "Invalid address";
                                        } else {
                                            const errorMessage2 =
                                                document.getElementById("error-message2");
                                            errorMessage2.textContent = "";
                                        }
                                        validateForm();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="amount-sectionz">
                            <div className="razss">
                                <label style={{ margin: 0 }} className="choose">
                                    Amount
                                </label>
                                <div id="error-message" className="error-message"></div>
                            </div>

                            <div className="input-wrapperz">
                                <input
                                    id="amountInput"
                                    style={{
                                        height: "20px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                    placeholder="10"
                                    className="inputz"
                                    type="number"
                                    onChange={(event) => {
                                        const amountValue = event.target.value;
                                        const inputAmount = parseFloat(amountValue); // Parse user input to float
                                        const errorMessage =
                                            document.getElementById("error-message");
                                        // Clear any previous error message
                                        errorMessage.textContent = "";

                                        if (amountValue.startsWith("0")) {
                                            errorMessage.textContent =
                                                "Minimum withdrawal amount is 10";
                                        } else if (isNaN(inputAmount)) {
                                            return; // Skip validation if input is not a number
                                        } else if (inputAmount < 10) {
                                            errorMessage.textContent =
                                                "Minimum withdrawal amount is 10";
                                        } else if (inputAmount > availableAmount) {
                                            errorMessage.textContent = "Insufficient amount";
                                        }

                                        validateForm();
                                    }}
                                />
                            </div>
                        </div>

                        <div className="availablez">
                            Available
                            <span
                                style={{ fontWeight: "bold" }}
                                id="availableAmount"
                                className="available-valuez"
                            >
                                0.000
                            </span>
                        </div>
                        <div className="memo-sectionz">
                            <label className="choose">MEMO (Optional)</label>
                            <input
                                type="text"
                                style={{ fontSize: "12px", color: "#dcd9ff" }}
                                className="inputz"
                            />
                        </div>
                        <div className="network-feez">
                            <span style={{ color: "#dcd9ff", fontSize: "14px" }}>
                                Network Fee
                            </span>
                            <span style={{ fontSize: "14px" }} className="fee-valuez">
                                &lt; 0.01 USDT
                            </span>
                        </div>
                        <button
                            className="withdraw-button33"
                            id="withdrawButton"
                            onClick={async () => {
                                const address =
                                    document.getElementById("addressInput").value;
                                const amount =
                                    document.getElementById("amountInput").value;
                                const username =
                                    document.getElementById(
                                        "welcome-message"
                                    ).textContent;

                                try {
                                    const response = await api.post(
                                        "/api/withdrawal/withdrawRequest",
                                        { address, amount, username },
                                        {
                                            headers: {
                                                Authorization:
                                                    "Bearer " + localStorage.getItem("token"),
                                            },
                                        }
                                    );
                                    const data = response.data;
                                    if (data.ok) {
                                        alert("Withdrawal request sent successfully!");
                                    } else {
                                        alert("Failed to send the withdrawal request.");
                                    }
                                } catch (error) {
                                    console.error(
                                        "Error sending withdrawal request:",
                                        error
                                    );
                                    alert("An error occurred.");
                                }
                            }}
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deposit;