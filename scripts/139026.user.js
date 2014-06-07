// ==UserScript==
// @name           CM_ebay_tools
// @namespace      
// @description    CM_ebay_tools
// @author         Vladimir Putsko
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://*.ebay.*
// @exclude     *.css
// @exclude     *.js

// @version        0.0.1
// ==/UserScript==

(function () {
var RunTime = [ new Date().getTime() ];

function allInOneOpera () {
	notRunYet = false;
}

function backupStart () {
	if(notRunYet) {
		var l4 = document.getElementById('l4');
		if( l4 ) allInOneOpera();
		else setTimeout(backupStart, 500);
	}
}

var notRunYet = true;
if( /khtml/i.test(navigator.appVersion) ) allInOneOpera();
else if (window.addEventListener) window.addEventListener("load",function () { if(notRunYet) allInOneOpera(); },false);
setTimeout(backupStart, 500);

})();
