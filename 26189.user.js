// by K.J.
// keith.jamison@gmail.com
// -------
// adapted from Henrik Maagensen's Clean Gmail Print

// ==UserScript==
// @name           Cleaner Gmail Print + no message count
// @namespace      http://mason.gmu.edu/~kjamiso2/gm/
// @description    Cleans the entire Gmail header, footer, & message count when you print
// @include        http://mail.google.com/*/?*&ik=*&view=pt&*
// @include        https://mail.google.com/*/?*&ik=*&view=pt&*
// @grant          none
// ==/UserScript==

var tables = document.getElementsByTagName('table');
if (tables) {
	tables[0].parentNode.removeChild(tables[0]);
}

var hlines = document.getElementsByTagName('hr');
if (hlines) {
	hlines[hlines.length-1].parentNode.removeChild(hlines[hlines.length-1]);
	hlines[0].parentNode.removeChild(hlines[0]);
}


var msgelem = document.evaluate("//font[@size=-1 and contains(.,'message')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

if(msgelem){
	msgelem.singleNodeValue.parentNode.removeChild(msgelem.singleNodeValue);
}