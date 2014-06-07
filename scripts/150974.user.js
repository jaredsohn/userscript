// ==UserScript==
// @name        Minimize Navigation in Google Webapps
// @namespace   https://github.com/astanin
// @include     https://mail.google.tld/*
// @include     https://translate.google.tld/*
// @include     http://translate.google.tld/*
// @include     https://www.google.tld/calendar/*
// @include     https://plus.google.tld/*
// @version     1.2
// @grant       none
// ==/UserScript==

// cross-browser arrow styles; thanks to @RedBanHammer
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

function resizableElements() {
    // elements to be resized when navigation bar is toggled
    var elms  = [].concat(document.getElementsByClassName("aeN")[0],
                          document.getElementsByClassName("ajl")[0],
                          document.getElementById(":rp")
    );
    return elms;
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

// It used to be: `var gb = document.getElementById("gb")' everywhere.
// That's not working anymore with new Google design (2013-10).
function getNavigationContainer() {
    var navbar = null;
    // for new Gmail (2013-10)
    if (document.domain.indexOf("mail") >= 0) {
        navbar = document.getElementsByClassName("w-asV")[0];
        return navbar;
    }
    // for new Calendar (2013-10)
    if (!navbar) {
        navbar = document.getElementById("onegoogbar");
    }
    // for Translate still using the old design and other sites
    if (!navbar) {
        navbar = document.getElementById("gb");
    }
    return navbar;
}

function createToggleButton() {
    var tb = document.createElement("div");
    tb.setAttribute("id","toggle_google_bars");
    tb.setAttribute("style", baseStyle);
    return tb;
}

function insertToggleButton(gb, tb) {
    gb.parentNode.insertBefore(tb, gb.nextSibling);
}

function hideGoogleBar(gb, tb, headHeight) {
    adjustResizableElements(headHeight);
    gb.style.display = "none";
    tb.setAttribute("style", baseStyle);
}

function showGoogleBar(gb, tb, headHeight) {
    adjustResizableElements(-headHeight);
    gb.style.display = "block";
    tb.setAttribute("style", baseStyle + flippedStyle);
}

function createButtonCallback(headHeight) {
    function toggleButtonCallback() {
        var gb = getNavigationContainer();
        var tb = document.getElementById("toggle_google_bars");
        if (gb && (gb.style.display == "block")) {
            hideGoogleBar(gb, tb, headHeight);
        } else {
            showGoogleBar(gb, tb, headHeight);
        }
        return false;
    }
    return toggleButtonCallback;
}

function addToggleButton() {
    var tb = document.getElementById("toggle_google_bars");
    var gb = getNavigationContainer();
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
    // create a toggle button
    var tb = createToggleButton();
    var headHeight = gb.offsetHeight - 8;
    hideGoogleBar(gb, tb, headHeight);
    // avoid spacing between googlebar and the toggle button
    tb.style.marginBottom = gb.style.marginBottom;
    gb.style.marginBottom = "0px";
    // insert toggle button
    insertToggleButton(gb, tb);
    // add callback
    tb.addEventListener("click", createButtonCallback(), false);
    return;
}

// wait until google bars appear, check every second
setTimeout(addToggleButton, 1000);
window.triedToAddToggleButton = 0;
