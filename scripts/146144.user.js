// ==UserScript==
// @name        Minimize Navigation Bar in Google Reader
// @namespace   https://github.com/astanin
// @include     https://www.google.tld/reader/*
// @include     http://www.google.tld/reader/*
// @version     1.1
// @grant       none
// ==/UserScript==

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
    tb.style.background = "url('https://ssl.gstatic.com/ui/v1/zippy/arrow_down.png') no-repeat center #f2f2f2";
    tb.style.height = "8px";
    tb.style.width = "100%";
    gb.style.display = "none";

    // insert toggle button after google bars
    gb.parentNode.insertBefore(tb, gb.nextSibling);

    // add callback
    tb.addEventListener("click", function() {
        var gb = document.getElementById("gb");
        var tb = document.getElementById("toggle_google_bars");
        if (gb && (gb.style.display == "block")) {
            gb.style.display = "none";
            tb.style.MozTransform = "rotate(0deg)";
        } else {
            gb.style.display = "block";
            tb.style.MozTransform = "rotate(180deg)";
        }
        return false;
    }, false);

    return;
}

// wait until google bars appear, check every second
setTimeout(addToggleButton, 1000);
window.triedToAddToggleButton = 0;
