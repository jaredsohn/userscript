// ==UserScript==
// @name        Easy Globe Reader
// @description Changes the copy text of globeandmail.com to a more readable, larger serif
// @namespace   http://rewinder.ca
// @include     http://theglobeandmail.com/*
// @include     http://www.theglobeandmail.com/*
// @include     http://beta.theglobeandmail.com/*
// @include     https://theglobeandmail.com/*
// ==/UserScript==

function switchCopy() {
    if (!document.getElementById("article")) { return; }
    var copy = document.getElementById("article").childNodes[4];
    if (copy.className.indexOf("copy") == -1) {
        return;
    } else {
        for (var j=0; j<copy.childNodes.length; j++) {
            if (copy.childNodes[j].nodeType == "1" && copy.childNodes[j].parentNode == copy) {
                copy.childNodes[j].style.fontFamily = "Georgia, 'Times New Roman', serif";
                copy.childNodes[j].style.fontSize = "0.875em";
            }
        }
    }
    
}

window.addEventListener("load", function() {
    switchCopy();
}, false);