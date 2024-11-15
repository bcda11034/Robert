function NavLeft () {

    function selectTrading(evt, divId) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(divId).style.display = "block";
        evt.currentTarget.className += " active";
    }
    
    return (
        <div
        className="nav-left"
        style={{ flexDirection: "row", display: "flex" }}
        >
            {/* <!--left--> */}
            <div className="tab">
            <button
                className="tablinks"
                onClick={(event) => selectTrading(event, "futures")}
                id="defaultOpen"
            >
                Futures Trading
            </button>
            <button
                className="tablinks"
                onClick={(event) => selectTrading(event, "spot")}
            >
                Spot Trading
            </button>
            </div>
        </div>
    )
}

export default NavLeft;