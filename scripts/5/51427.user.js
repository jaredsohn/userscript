// ==UserScript==
// @name          Jumping Google logo
// @namespace     http://localhost/
// @description   replaces Google logo by IPv6 version
// @include      http://*.google.*/*
// ==/UserScript==
var theImage;
theImage = document.getElementById('logo');
if (theImage) {
	theImage.src='http://www.google.com/images/ipv6_logo.gif';
}
