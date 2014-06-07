// ==UserScript==
// @name        Bakery Fakery
// @namespace   newthead
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     2
// @run-at      document-end
// @grant       none
// ==/UserScript==

var clickTimeout;
var goldenClickTimeout;
var bigCookie = document.getElementById("bigCookie");
var goldenCookie = document.getElementById("goldenCookie");

function toggleScript() {
    if (clickTimeout) {
        clearInterval(clickTimeout);
        clickTimeout = null;
    } else {
        clickTimeout = setInterval(clickIt, 1);
    }
    
    if (goldenClickTimeout) {
        clearInterval(goldenClickTimeout);
        goldenClickTimeout = null;
    } else {
        goldenClickTimeout = setInterval(goldenClick, 1000);
    }
}

function clickIt() {
    var evt = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    bigCookie.dispatchEvent(evt);
}

function goldenClick() {
    if (Game.goldenCookie.delay > 500) {
        Game.goldenCookie.delay = 500;
    }
    if (Game.goldenCookie.life > 0) {
        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        goldenCookie.dispatchEvent(evt);
    }
}

function addGui() {
    console.log("Loading clicker");
    
    var pane = document.getElementById("sectionLeft");
    
    var newDiv = document.createElement("button");
    newDiv.id = "startClickScript";
    newDiv.style.position = "absolute";
    newDiv.style.left = "auto";
    newDiv.style.right = "0";
    newDiv.style.width = "120px";
    newDiv.style.padding = "5px";
    newDiv.style.bottom = "10px";
    newDiv.style.textAlign = "center";
    newDiv.innerHTML = "Toggle Auto-click";
    newDiv.style.zIndex = "99999";
    newDiv.style.color = "#101010";
    
    pane.appendChild(newDiv);
    newDiv.addEventListener('click',toggleScript);
}

setTimeout(addGui,2000);