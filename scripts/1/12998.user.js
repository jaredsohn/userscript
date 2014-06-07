// ==UserScript==
// @name           Script Remover
// @namespace      localhost
// @description    Removes all scripts from included pages (but, unfortunately, not before pop-up scripts have done their thing!)
// @include        *
// ==/UserScript==

// I use it at http://caselaw.lp.findlaw.com/* where there are lots of scripts which do nothing for the user

var allScripts = document.getElementsByTagName('script');
var n = allScripts.length;
for (var i = allScripts.length - 1; i >= 0; i--) {
	allScripts[i].parentNode.removeChild(allScripts[i]);
}
alert(n + " scripts were removed from this page!");
