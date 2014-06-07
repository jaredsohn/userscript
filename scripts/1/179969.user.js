// ==UserScript==
// @name         Feedly - Open item in Background Tab With Enter/Return Key (for Google Chrome)
// @version      1.0
// @description  Opens the currently selected item in Feedly in a background tab. Compatible with Google Chrome.
// @include      http*://cloud.feedly.com/*
// ==/UserScript==

document.addEventListener('keypress', keyEventListener, true);

function keyEventListener(event) {
    currentSelectedItem=document.getElementsByClassName('selectedEntry');
    //if no feed item selected, exit
    if(currentSelectedItem && currentSelectedItem.length == 1){
        var currentURL = getCurrentEntryURL(currentSelectedItem[0]);
        if (currentURL) {
            if (event.keyCode == 13) {
                event.stopPropagation();
                event.preventDefault();
                openNewBackgroundTab(currentURL);
            }
        }
    }
}

function openNewBackgroundTab(url){
    var a = document.createElement("a");
    a.href = url;
    var evt = document.createEvent("MouseEvents");    
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
    a.dispatchEvent(evt);
}

function getCurrentEntryURL(currentSelectedItem) {
    x = currentSelectedItem.getElementsByClassName('title');
    return x[0].getAttribute('href');
}