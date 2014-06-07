// This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
// More info: http://greasemonkey.mozdev.org/
//
// ==UserScript==
// @name         GReader_redirect
// @version      1.0
// @author       Chen Xi
// @e-mail       imchenxi@gmail.com
// @description  redirect GReader http to https
// @include      http://www.google.com/reader/*
// ==/UserScript==

function checkForHttpAccessToGoogleReader() {
  var httpUrl = 'http://www.google.com/reader';
  var httpsUrl = 'https://www.google.com/reader';
//  if (window.location.href.indexOf (httpUrl) > 0) {
	window.location.href=window.location.href.replace (httpUrl, httpsUrl);
// }
};

checkForHttpAccessToGoogleReader()