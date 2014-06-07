// ==UserScript==
// @name            Madville Fixer
// @description     Get rid of the stupid frame on all the links
// @include         http://www.madville.com/*
// ==/UserScript==

(function (){
	
	var a = window.document.getElementsByTagName("a");
	for (i=0;i<a.length;i++) {
		if (a[i].href.match('link.php?') != null && a[i].title != null) {
			a[i].href=a[i].title;
		}
	}

}());