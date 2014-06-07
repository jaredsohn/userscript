// ==UserScript==
// @name           Download Parameters
// @namespace      http://wwww.pgc.umn.edu
// @description    Address page
// @include        https://warp.nga.mil/cgi-bin/nlprime/DownloadParametersForm.cgi*
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

window.addressOrder= function() {
	orderButton = document.getElementsByName("SUBMITBUTTON");
	click(orderButton[0]);
}

window.setTimeout(addressOrder(), 2000);