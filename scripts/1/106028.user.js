// ==UserScript==
// @name	Kill Y!J news readers' comments
// @namespace	http://idaemons.org/
// @description	Kill Y!J news readers' comments
// @include	http://headlines.yahoo.co.jp/hl?*
// @version	1.0
// ==/UserScript==

(function () {
     var div;
     if ((div = document.getElementById('commentTabContents')))
         div.parentNode.removeChild(div);
 })();
