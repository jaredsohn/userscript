// ==UserScript==
// @name       KiwixToolbarRemover
// @namespace  mailto:nexutix@gmail.comm
// @version    0.1
// @description  Removes Kiwix Search Toolbar on webpages served through local Kiwix server. Use this if you have enabled custom search via browser to search kiwix database. This will not hide toolbar on search results page on indexed kiwix server. (You can use adblock to hide that element). Don't know what's kiwix? See kiwix.org.
// @include      http://127.0.0.1*
// ==/UserScript==

document.getElementById("bodyContent").style.position="absolute";
document.getElementById("bodyContent").style.top="0px";
document.getElementById("bodyContent").style.right="10px";
document.getElementById("bodyContent").style.left="10px";
var element = document.getElementById("kiwixtoolbar");
element.parentNode.removeChild(element);

