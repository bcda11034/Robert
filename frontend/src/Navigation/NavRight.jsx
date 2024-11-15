function NavRight ({ futuresUSDTBalance, spotUSDTBalance, navigate }) {
    
    function generateQRCode() {
        const qrCodeImg = document.getElementById("qr-code");
        const address = document.getElementById("address").innerText;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          address
        )}&size=150x150`;
        qrCodeImg.src = qrCodeUrl;
        qrCodeImg.style.display = "block"; // Show the QR code image
    }

    return (
        <div
        className="nav-right"
        style={{ flexDirection: "row", display: "flex" }}
        >
        {/* <!--right--> */}
        <button
            style={{ height: "60px", width: "120px", marginRight: "10px" }}
            className="deposit-btn"
            id="transfer-USDT-btn"
            onClick={() => {
            document.getElementById("transfer-USDT-modal").style.display =
                "block";
            document.getElementById(
                "transfer-modal-futures-USDT"
            ).textContent = futuresUSDTBalance.toFixed(2);
            document.getElementById(
                "transfer-modal-spot-USDT"
            ).textContent = spotUSDTBalance.toFixed(2);
            }}
        >
            <i
            style={{ marginRight: "10px" }}
            className="fas fa-arrow-right-arrow-left"
            ></i>
            Transfer
        </button>

        <button
            style={{ height: "60px" }}
            className="deposit-btn"
            id="deposit-btn"
            onClick={() => {
            document
                .getElementById("popup-modal")
                .setAttribute("style", "display: block");
            setTimeout(generateQRCode, 500);
            }}
        >
            <i style={{ marginRight: "10px" }} className="fas fa-wallet"></i>
            Deposit
        </button>

        <a
            id="user-icon2"
            style={{
            cursor: "pointer",
            borderRadius: "20px",
            padding: "0 10px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            }}
            onMouseEnter={() => {
            document.getElementById("main-menu2").style.display = "block";
            }}
            onMouseLeave={() => {
            setTimeout(function () {
                if (
                !document.getElementById("main-menu2").matches(":hover")
                ) {
                document.getElementById("main-menu2").style.display =
                    "none";
                }
            }, 100);
            }}
        >
            <span>Wallets</span>
        </a>

        <div
            id="icon2"
            onClick={(event) => {
            event.stopPropagation();
            }}
        >
            {/* <!-- Main dropdown content --> */}
            <div
            id="main-menu2"
            className="dropdown-content2"
            style={{
                marginRight: "20px",
                width: "250px",
                padding: "20px",
                borderRadius: "10px",
                zIndex: 10,
                boxShadow: "0 4px 8px rgba(0.3, 0.3, 0.3, 0.3)",
            }}
            onMouseLeave={(event) => {
                event.target.setAttribute("style", "display = none");
            }}
            onMouseEnter={(event) => {
                event.target.setAttribute("style", "display = block");
            }}
            >
            {/* <!-- Center the profile picture and welcome message --> */}
            <div className="balance-info">
                <span className="balance-text">
                <img style={{ width: "20px" }} src="img/USDT.png" />
                </span>
            </div>
            <hr
                className="separator3"
                style={{
                width: "70%",
                margin: "18px auto",
                border: 0,
                height: "1.8px",
                background: "linear-gradient(to right, #ff8c00, #ff0080)",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
            />
            {/* <!-- Main menu items --> */}
            <a
                href="#"
                id="activity-link"
                style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "8px",
                }}
            >
                <img
                src="img/activity.png"
                alt="Activity Icon" // Adding alt for accessibility
                style={{
                    width: "22px",
                    height: "22px",
                    marginRight: "20px",
                    marginLeft: "5px",
                }}
                />
                <p style={{ margin: 0, fontSize: "16px" }}>Spot</p>
            </a>

            <a
                href="#"
                id="privacy-security-link"
                style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "8px",
                }}
            >
                <img
                src="img/lock.png"
                alt="Lock Icon" // Adding alt for accessibility
                style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "20px",
                    marginLeft: "4px",
                }}
                />
                <p style={{ margin: 0, fontSize: "16px" }}>Futures</p>
            </a>

            <a
                href="#"
                id="support-link"
                style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "8px",
                }}
            >
                <img
                src="img/contact.png"
                alt="Contact Icon" // Adding alt for accessibility
                style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "20px",
                    marginLeft: "4px",
                }}
                />
                <p style={{ margin: 0, fontSize: "16px" }}>Copy Trade</p>
            </a>
            </div>
        </div>
        <a
            id="user-icon"
            style={{
            cursor: "pointer",
            borderRadius: "20px",
            padding: "0 10px",
            height: "45px",
            fontWeight: "bold",
            backgroundImage:
                "linear-gradient(rgb(29, 28, 73), rgb(50, 49, 121))",
            display: "flex",
            alignItems: "center",
            }}
            onMouseEnter={() => {
            document.getElementById("main-menu").style.display = "block";
            }}
            onMouseLeave={() => {
            setTimeout(function () {
                if (!document.getElementById("main-menu").matches(":hover")) {
                document.getElementById("main-menu").style.display = "none";
                }
            }, 100);
            }}
        >
            <img
            className="pfp"
            src="img/pfp.png"
            style={{ pointerEvents: "none" }}
            />
            <div
            className="icon"
            style={{
                width: "25px",
                height: "20px",
                margin: "4px 20px 0 10px",
                pointerEvents: "none",
            }}
            >
            <span
                id="welcome-message-duplicate"
                style={{ pointerEvents: "none", color: "#dcdcdc" }}
            >
                Login
            </span>
            </div>
            <img
            src="img/arrow-down.png"
            style={{
                width: "16px",
                height: "16px",
                marginLeft: "10px",
                pointerEvents: "none",
            }}
            />
        </a>
        <div
            id="icon3"
            onClick={(event) => {
            event.stopPropagation();
            }}
        >
            {/* <!-- Main dropdown content --> */}
            <div
            id="main-menu"
            className="dropdown-content"
            style={{
                marginRight: "20px",
                width: "250px",
                padding: "20px",
                borderRadius: "10px",
                zIndex: 10,
                boxShadow: "0 4px 8px rgba(0.3, 0.3, 0.3, 0.3)",
            }}
            onMouseLeave={() => {
                document.getElementById("main-menu").style.display = "none";
            }}
            onMouseEnter={() => {
                document.getElementById("main-menu").style.display = "block";
            }}
            >
            {/* <!-- Center the profile picture and welcome message --> */}
            <div
                style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "5px",
                }}
            >
                <img
                src="img/pfp.png"
                className="pfp-large"
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                }}
                />
            </div>

            <hr
                className="separator3"
                style={{
                width: "70%",
                margin: "18px auto",
                border: "0",
                height: "1.8px",
                background: "linear-gradient(to right, #ff8c00, #ff0080)",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
            />

            {/* Main menu items */}
            <a
                href="#"
                id="activity-link"
                style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "8px",
                }}
            >
                <img
                src="img/activity.png"
                style={{
                    width: "22px",
                    height: "22px",
                    marginRight: "20px",
                    marginLeft: "5px",
                }}
                />
                <p style={{ margin: 0, fontSize: "16px" }}>Activity</p>
            </a>

            <a
                href="#"
                id="privacy-security-link"
                style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "8px",
                }}
            >
                <img
                src="img/lock.png"
                style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "20px",
                    marginLeft: "4px",
                }}
                alt="Privacy and Security Icon"
                />
                <p style={{ margin: 0, fontSize: "16px" }}>
                Privacy & security
                </p>
            </a>

            <a
                href="#"
                id="support-link"
                style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "8px",
                }}
            >
                <img
                src="img/contact.png"
                style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "20px",
                    marginLeft: "4px",
                }}
                alt="Contact Icon"
                />
                <p style={{ margin: 0, fontSize: "16px" }}>Contact</p>
            </a>

            <a
                id="headerlogout-btn"
                style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                }}
                onClick={async (event) => {
                localStorage.removeItem("token");
                navigate("/login");
                }}
            >
                <img
                src="img/logout.png"
                style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "20px",
                }}
                alt="Logout Icon"
                />
                <p style={{ margin: 0, fontSize: "16px" }}>Login / Logout</p>
            </a>
            </div>
        </div>
        </div>
    )
}

export default NavRight;