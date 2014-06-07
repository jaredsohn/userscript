// ==UserScript==
// @name          Remove background ads on Stuff
// @namespace     http://www.stuff.co.nz
// @description	  Get rid of the big background ads on Stuff which make it impossible to read content easily.
// @include       http://www.stuff.co.nz/*
// @include       http://stuff.co.nz/*
// ==/UserScript==

if(document.body) document.body.style.backgroundPosition = '-9999px -9999px'

if(document.getElementById('slidedown')) var timer = setInterval(function() {
	if(document.getElementById('slidedown').style.display!='none') {
		document.getElementById('slidedown').style.display = 'none'
		clearInterval(timer)
	}
},100)