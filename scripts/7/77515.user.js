// ==UserScript==

// @name          What.CD: SSL'ify What.CD links outside of What.CD

// @description   What.CD: SSL'ify What.CD links outside of What.CD

// @namespace     http://userscripts.org

// @include       *
// @exclude       *https://ssl.what.cd*
// @exclude       *http://what.cd*

// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace("http://what.cd", "https://ssl.what.cd");