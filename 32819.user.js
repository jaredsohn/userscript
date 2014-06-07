// ==UserScript==

// @name           Auto Refresh

// @namespace      http://userscripts.org/users/64181/scripts

// @include        *

// @description    Auto refresh any page you want!!! Just add it to the 'Included Pages' list in the 'Manage User Scripts...' option !!!

// ==/UserScript==

    var refreshold = true;
    var minold = 10;
    var maxold = 15;
    var AUTO_REFRESH = GM_getValue("Refresh", "true");
    var MIN = GM_getValue("Min", 3000);  // seconds x1000
    var MAX = GM_getValue("Max", 5000);  // seconds x1000

function getRefreshTime() {
  return (parseInt(MIN) + Math.round(Math.random() * (MAX - MIN)));
} 

if (AUTO_REFRESH) {
  setTimeout("location.href= document.URL", getRefreshTime());
}

