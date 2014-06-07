// ==UserScript==
// @name          HideSpoilers
// @author        Simivar
// @namespace     http://strims.swimg.pl/js/HideSpoilers.js
// @grant         none
// @description   Chowa spoilery : )
// @include       http://strims.pl/*
// @include       https://strims.pl/*
// @include       http://*.strims.pl/*
// @include       strims.pl/*
// @include       *.strims.pl/*
// @include       https://*.strims.pl/*
// @version       1
// ==/UserScript==
$(function() {
	// ukrywa spoilery na stronie uzytkownika o nicku simivar
	if ( document.location.href.indexOf('/u/simivar') > -1 ) {
		$("samp").hide();
	} 
	//ukrywa spoilery na substrimie MariuszMaxKolonko
	else if ( document.location.href.indexOf('/s/MariuszMaxKolonko') > -1 ) {
		$("samp").hide();
	} 
});


