// ==UserScript==
// @name         Google Reader - Open item in Background Tab With Enter/Return Key (for Google Chrome)
// @version      1.3
// @description  Opens the currently selected item in Google Reader in a background tab. Compatible with Google Chrome.
// @include      http*://www.google.com/reader/view/*
// @include      http*://www.google.us/reader/*
// @include      http*://www.google.co.in/reader/*
// @include      http*://www.google.de/reader/*
// @include      http*://www.google.co.jp/reader/*
// @include      http*://www.google.com.hk/reader/*
// @include      http*://www.google.co.uk/reader/*
// @include      http*://www.google.fr/reader/*
// ==/UserScript==

document.addEventListener('keypress', keyEventListener, true);

function keyEventListener(event) {
    currentSelectedReaderItem=document.getElementById('current-entry');
    //if no feed item selected, exit
    if(currentSelectedReaderItem){
        var currentURL = getCurrentEntryURL(currentSelectedReaderItem);
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

function getCurrentEntryURL(currentSelectedReaderItem) {
    x = currentSelectedReaderItem.getElementsByTagName('a');
    return x[0].getAttribute('href');
}