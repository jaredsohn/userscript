// ==UserScript==
// @name          No PI Ticker
// @namespace     http://jwebnet.net/personal/scripts
// @description	  Remove the PonyIsland ticker
// @include       http://ponyisland.*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

//window.addEventListener("load", function(e) {
    // Do stuff
    
    var ltopic = document.getElementById('ltopic');
    if (ltopic) {
        ltopic.parentNode.removeChild(ltopic);
        } else {
            // there are no textareas on this page
            }
    //}, false);
