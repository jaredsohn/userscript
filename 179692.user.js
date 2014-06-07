// ==UserScript==
// @name           Physical Order Results Success
// @namespace      http://wwww.pgc.umn.edu
// @description    Close the popup
// @include        https://warp.nga.mil/cgi-bin/nlprime/PhysicalOrderResults.cgi?SUCCESS
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

window.successPhpSend = function() {
	window.location.assign("http://csv-dev.pgc.umn.edu/success.php?success=SUCCESS");
}

window.setTimeout(successPhpSend(), 2000);