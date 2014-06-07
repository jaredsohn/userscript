// ==UserScript==
// @name          Google Hosted Images Full-sizer
// @description   Changes the medium-sized image to the full-sized image
// @include       http://images.google.com/hosted/*
// ==/UserScript==

(function (){
	var a = window.document.getElementsByTagName("img");
	var regTarget = /(.*)_landing$/i
	
	for (i=0;i<a.length;i++) {
		var m=a[i].src.match(regTarget)
		if (m) {
			a[i].src= m[1]+'_large';
		}
	}
	
}());