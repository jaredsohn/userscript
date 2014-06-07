// ==UserScript==
// @name          Fotoalbum.hu gyorslapozas jobbra-balra
// @namespace     http://www.admc.hu/
// @include       http://*.fotoalbum.hu/viewpicture/*
// @include       http://*.fotoalbum.hu/viewlarge/*
// @include       http://*.fotoalbum.hu/?get=/viewlarge/*
// @include       http://*.fotoalbum2.hu/viewpicture/*
// @include       http://*.fotoalbum2.hu/viewlarge/*
// @include       http://*.fotoalbum2.hu/?get=/viewlarge/*
// ==/UserScript==

// evvel megy: http://www.joanpiedra.com/jquery/greasemonkey/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://fotoalbum.hu/js/jquery.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery(erre) {
	//alert($); // check if the dollar (jquery) function works
	$(erre).click();
}


function billentyu(e) {
	var a=e.keyCode;
	if (a==37) {
		letsJQuery(".nav_prior");
		//$(".nav_prior").click();
	} else if (a==39) {
		letsJQuery(".nav_next");
		//$(".nav_next").click();
	}
}

document.addEventListener("keypress",billentyu,true);