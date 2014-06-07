// ==UserScript==
// @name           Save for Later
// @namespace      http://wwww.pgc.umn.edu
// @description    Save the cart for later use wth Bryan's script
// @include        https://warp.nga.mil/cgi-bin/nlprime/Cart.cgi
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

function saveAll() {
	selectAllButton = document.getElementsByName("TOGGLE")[0];
	saveForLaterButton = document.getElementsByName("SAVE_FOR_LATER")[0];
	click(selectAllButton);
	click(saveForLaterButton);
}

window.successPhpSend = function(last) {
	if (last == true) {
		window.location.assign("http://csv-dev.pgc.umn.edu/success.php?success=SUCCESS&last=true");
	}
	else {
		window.location.assign("http://csv-dev.pgc.umn.edu/success.php?success=SUCCESS");
	}
}

if (Number(document.getElementsByName("Selection")[0].getElementsByTagName("b")[4].innerHTML) > 1999) {
	var r=confirm("You have reached or exceeded 1999 items in the saved cart. Acknowledging this message will take you to some arbitrary site to break the loop. There will be instructions on this page for proceeding.");
	if (r==true) {
		successPhpSend(true);
	}
	else {
		// Too bad, so sad. 
		successPhpSend(true);
	}
}
else if (document.getElementsByName("Selection")[0].getElementsByTagName("font")[1].innerHTML == "\nYour cart is empty.\n") {
	successPhpSend(false);
}

else {
	saveAll();
}