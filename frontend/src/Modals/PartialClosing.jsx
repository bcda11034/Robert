function PartialClosing({ partialClose }) {
    return (
        <div id="partial-closing-modal" className="modal">
            {/* <!-- Modal content --> */}
            <div className="modal-content">
            <span className="close">&times;</span>
            <h2 style={{ color: "#16171a" }}>Partial Closing</h2>
            <br />
            <p style={{ color: "#16171a", fontSize: "20px" }}>
                <input id="particalClosingPercent" type="number" min="1" max="100" defaultValue="100" />
                %&nbsp;&nbsp;
                <button onClick={() => partialClose()}>Confirm</button>
            </p>
            </div>
        </div>
    )
}

export default PartialClosing;