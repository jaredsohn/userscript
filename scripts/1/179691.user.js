// ==UserScript==
// @name           Multiple License Check
// @namespace      http://wwww.pgc.umn.edu
// @description    Agreement
// @include        https://warp.nga.mil/cgi-bin/nlprime/MultipleLicenseCheck.cgi*
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

window.clickAccept= function() {
	acceptButton = document.getElementsByName("Accept");
	click(acceptButton[0]);
}

window.setTimeout(clickAccept(), 4000);