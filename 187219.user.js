// ==UserScript==
// @name          fullscreen firstrowus1.eu
// @namespace     emc3 - http://eliasmartinezcohen.com
// @description   make the links and stream rly big on firstrowus1
// @include       http://firstrowus1.eu/watch/*
//@require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
$(document).ready(function() {
	$("td[align='center'][width='650']").css({
		z-index: '9999999',
		position: 'fixed',
		top: '0px',
		width: '90vw',
		margin: 0px auto;
	});
});