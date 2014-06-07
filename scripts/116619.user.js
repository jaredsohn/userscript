// ==UserScript==
// @name          Google+ Add Friends Notification Remove Tool
// @namespace     http://userscripts.org/scripts/show/116619
// @description   Reomve Google+ Add Friends Notification and Hot Information Box.
// @include       https://plus.google.com/*
// @updateURL     http://userscripts.org/scripts/show/116619
// @version       2012.3.3
// ==/UserScript==

(function(){setInterval(function(){if(document.getElementsByClassName("GLQTuc PPczU")[0]){document.getElementsByClassName("GLQTuc PPczU")[0].parentNode.removeChild(document.getElementsByClassName("GLQTuc PPczU")[0])}if(document.getElementsByClassName("Wbhcze Te ch")[0]){document.getElementsByClassName("Wbhcze Te ch")[0].parentNode.removeChild(document.getElementsByClassName("Wbhcze Te ch")[0])}},200);})();