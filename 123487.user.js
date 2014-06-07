// ==UserScript==
// @name Wikipedia Cleanup
// @namespace http://userscripts.org/users/73089
// @description Removes the SOPA overlay from Wikipedia
// @include http://*.wikipedia.org/*
// ==/UserScript==

setTimeout("closeSopaPipa()", 10000);
setTimeout("closeAd();", 2000);
setTimeout("closeSiteNotice();", 2000);

window.closeSopaPipa = function() {
    var iCalledButton = document.createElement('button');
    iCalledButton.setAttribute('type', 'button');
    iCalledButton.innerHTML = 'I called my representatives, take me to the content.';
    iCalledButton.setAttribute('onclick', "closeIt()");
    iCalledButton.setAttribute('value', 'I called my representatives, take me to the content.');
    document.getElementById('mw-sopaColumn').appendChild(iCalledButton);
}    

window.closeIt = function() {
    var sopaOverlay = document.getElementById('mw-sopaOverlay');
    document.getElementById('mw-page-base').setAttribute('style', 'display: block;');
    document.getElementById('mw-head-base').setAttribute('style', 'display: block;');
    document.getElementById('content').setAttribute('style', 'display: block;');
    document.getElementById('mw-page-base').setAttribute('style', 'display: block;');
    document.getElementById('mw-head').setAttribute('style', 'display: block;');
    document.getElementById('mw-panel').setAttribute('style', 'display: block;');
    document.getElementById('footer').setAttribute('style', 'display: block;');
    sopaOverlay.parentNode.removeChild(sopaOverlay);
}

window.closeAd = function() {
    var closeBegStrip = document.getElementById("B12_5C_113007_temple_twin_A-close");
    if (closeBegStrip) {
        closeBegStrip.click();
    }
}

window.closeSiteNotice = function() {
    var siteNotice = document.getElementById("siteNotice");
    if (siteNotice) {
        siteNotice.parentNode.removeChild(deleted);
    }
}