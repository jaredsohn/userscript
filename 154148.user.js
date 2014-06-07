// ==UserScript==
// @name           Pre-render next page in DermNet NZ, and enable use of the right arrow key.
// @description    Pre-render next page in DerNet NZ image galleries. Enable Predict network actions to improve page load performance in Chrome Settings.
// @include        http://www.dermnetnz.org/*
// @version        1.0
// ==/UserScript==
var a = document.getElementsByTagName('a'); 
for (i = 0; i < a.length; i++) {
	if (a[i].text == "next") {
		var href = a[i].getAttribute('href');
		var l = document.createElement('link');
		l.setAttribute('rel','prerender');
		l.setAttribute('href', href);
		document.getElementsByTagName("body")[0].appendChild(l);

		document.addEventListener('keyup', function(e) {
			if (e.keyCode === 39) location.href = href;
		}, false);
	}
}
