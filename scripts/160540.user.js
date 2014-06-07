// ==UserScript==
// @name        Minimize Navigation in Google Webapps
// @namespace   https://github.com/astanin
// @include     https://mail.google.tld/*
// @version     1.3.1
// @grant       none
// ==/UserScript==

function resizableElements() {
    // elements to be resized when navigation bar is toggled
    var reader = [].concat(document.getElementById("scrollable-sections"),
                           document.getElementById("viewer-entries-container"));
    var gmail  = [].concat(document.getElementsByClassName("aeN")[0],
                           document.getElementsByClassName("ajl")[0],
                           document.getElementById(":rp"));
    return [].concat(reader, gmail);
}

function adjustResizableElements(delta) {
    var panes = resizableElements();
    console.log(panes);
    for (var i=0; i < panes.length; i++) {
        if (panes[i] != null) {
            var name = panes[i].id || ("class=\"" + panes[i].className + "\"");
            var oldh = panes[i].clientHeight;
            panes[i].style.height = (panes[i].clientHeight + delta) + "px";
            console.log(name+ " height: " + oldh + " -> " + panes[i].clientHeight);
        }
    }
}

function addToggleButton() {
    var tb = document.getElementById("toggle_google_bars");
    var gb = document.getElementById("gb");
    if (tb) {
        return;
    }
    if (!gb) { // try to add toggle button later (several times)
        window.triedToAddToggleButton += 1;
        if (window.triedToAddToggleButton < 5) {
            setTimeout(addToggleButton, 2000);
        }
        return;
    }
    // create toggle button
    var tb = document.createElement("div");
    tb.setAttribute("id","toggle_google_bars");
    // styles
    var baseStyle = "background: url('https://ssl.gstatic.com/ui/v1/zippy/arrow_down.png') no-repeat center #f2f2f2;" +
                    "height: 8px;" +
                    "width: 100%;" +
                    "cursor: pointer;";
    var flippedStyle = "-moz-transform: scaleY(-1);" +
                    "-o-transform: scaleY(-1);" +
                    "-webkit-transform: scaleY(-1);" +
                    "transform: scaleY(-1);" +
                    "filter: FlipV;" +
                    "-ms-filter: 'FlipV';";
    tb.setAttribute("style", baseStyle);
    var headHeight = gb.offsetHeight - 8;
    adjustResizableElements(headHeight);
    gb.style.marginTop = "-102px";
    // insert toggle button after google bars
    gb.parentNode.insertBefore(tb, gb.nextSibling);
    
    // add callback
    tb.addEventListener("click", function() {
        var gb = document.getElementById("gb");
        var tb = document.getElementById("toggle_google_bars");
        if (gb && (gb.style.marginTop == "0px")) {
            adjustResizableElements(headHeight);
            gb.style.marginTop = "-102px";
            tb.setAttribute("style", baseStyle);
        } else {
            adjustResizableElements(-headHeight);
            gb.style.marginTop = "0px";
            tb.setAttribute("style", baseStyle + flippedStyle);
        }
        return false;
    }, false);
    return;
}
// wait until google bars appear, check every second
setTimeout(addToggleButton, 1000);
window.triedToAddToggleButton = 0;