// ==UserScript==
// @name           Add to Cart
// @namespace      http://wwww.pgc.umn.edu
// @description    WARP auto add to cart script.
// @include        https://warp.nga.mil/cgi-bin/nlprime/SimpleQueryCGI.cgi
// @version		   0.1
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

window.failPhpSend = function() {
	window.location.assign("http://csv-dev.pgc.umn.edu/success.php?success=FAILURE");
}

window.checkBoxes = function() {
	allChecks = document.getElementsByName("SELECT");
	selectAllButton = document.getElementsByName("SelectAll")[0];
	orderButton = document.getElementsByName("OPERATION")[0];
	if (allChecks.length > 0) {
		click(selectAllButton);
		click(orderButton);
	}
}

checkBoxes();

if (document.getElementsByTagName("h1")[0].innerHTML == "No images matched the query.") {
	failPhpSend();
}