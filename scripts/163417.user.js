// ==UserScript==
// @name          Youtube No Sidebar
// @namespace     http://nmgod.com
// @description   Removes tabs on the left side of youtube watching window
// @include        *.youtube.com/watch*
// @version        1.1
// @updateURL      http://userscripts.org/scripts/source/163417.meta.js
// @installURL     http://userscripts.org/scripts/source/163417.user.js
// @copyright     NMGod
// ==/UserScript==
    
setTimeout(function() {
    document.getElementById("guide").style.display = "none";
    document.getElementById("player").style.paddingLeft = "0";
    document.getElementById("watch7-main-container").style.paddingLeft = "0";
    document.getElementById("player-legacy").style.paddingLeft = "0";
}, 10);