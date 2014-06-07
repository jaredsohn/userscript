// ==UserScript==
// @name           Error Page Auto Reload
// @namespace      http://dttvb.yi.org/
// @include        *
// ==/UserScript==

function g(i) {
	return document.getElementById(i);
}

if (g('errorPageContainer') && g('errorTitle') && unsafeWindow.retryThis) {
	var rcd = 10;
	var ot = document.title;
	var oh = g('errorTitleText').innerHTML;
	function setTitle(x) {
		document.title = x + ' / ' + ot;
		g('errorTitleText').innerHTML = oh + '<br />' + x;
	}
	function cd() {
		if (rcd <= 0) {
			setTitle ('Reloading...');
			unsafeWindow.retryThis ();
		} else {
			setTitle ('Reload in ' + rcd + ' second' + (rcd == 1 ? '' : 's'));
			setTimeout (cd, 1000);
			rcd --;
		}
	}
	cd ();
}