// by K.J.
// keith.jamison@gmail.com
// -------
// adapted from Henrik Maagensen's Clean Gmail Print

// ==UserScript==
// @name           Cleaner Gmail Print
// @namespace      http://mason.gmu.edu/~kjamiso2/gm/
// @description    Cleans the entire Gmail header and footer when you print.  Additionally removes the message count line if there is only 1 message.
// @include        http://mail.google.com/*/?*&ik=*&view=pt&*
// @include        https://mail.google.com/*/?*&ik=*&view=pt&*
// @grant          none
// ==/UserScript==


var tables = document.getElementsByTagName('table');
if (tables) {
	tables[0].parentNode.removeChild(tables[0]);
}

var lines = document.getElementsByTagName('hr');
if (lines) {
	lines[lines.length-1].parentNode.removeChild(lines[lines.length-1]);
	lines[0].parentNode.removeChild(lines[0]);
}

var msgelem = document.evaluate("//font[@size=-1 and .='1 message']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

if(msgelem)
	msgelem.singleNodeValue.parentNode.removeChild(msgelem.singleNodeValue);

