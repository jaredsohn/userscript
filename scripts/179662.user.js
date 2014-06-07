// ==UserScript==
// @name       Remove Browser Ponies
// @namespace  browserPoniesRemover
// @version    1.0
// @description  Removes Browser Ponies from all Tumblr blogs
// @match      *.tumblr.com/*
// @copyright  2013+, CodeMeA/Pikachu/Andrew
// ==/UserScript==

if(typeof(BrowserPonies) !== "undefined") {
    BrowserPonies.Util.onload(function() {
        BrowserPonies.unspawnAll();
        BrowserPonies.stop();
        console.log('Disabled Ponies!');
    });
}