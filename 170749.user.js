// ==UserScript==
// @name          Gmail Wave Player
// @namespace     http://userscripts.org/users/109864
// @description   Adds a player to Gmail messages with WAV file attachments so they can be played in the browser
// @include       https://mail.google.com/*
// @grant         none
// @version       0.1.2013.0614
// ==/UserScript==

function EmbedWav(elem) {
    var nodeWavLink = document.evaluate('//a/img[contains(@src, "sound.gif")]/..', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
    
    try {
        var elemWavLink = nodeWavLink.singleNodeValue;
        elemWavLink.outerHTML = '<embed src=' + elemWavLink.href + ' autostart="false" loop="false" height="20" >';
    }
    catch (e) {
    }
}

document.body.addEventListener('DOMNodeInserted', EmbedWav, false);