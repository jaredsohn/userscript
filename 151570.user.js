// ==UserScript==
// @name           Pre-render next page in WebPath, and enable use of the right arrow key.
// @description    Pre-render next page in the University of Utah's Department of Pathology's WebPath. Enable Predict network actions to improve page load performance in Chrome Settings.
// @include        http://library.med.utah.edu/*
// @include        http://courses.path.utah.edu/*
// @version        1.1
// ==/UserScript==
var a = document.getElementsByTagName('a'); 
for (i = 0; i < a.length; i++) {
	var images = a[i].getElementsByTagName('img');
	if (images.length == 1 && images[0].getAttribute('src').indexOf("fwd") >= 0) {
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