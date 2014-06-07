// ==UserScript==
// @name           GoogleCal Map to URL 
// @description    Put a URL in the 'Where' field in Google Calendar, then clicking 'map' will take you to the URL
// @include        http://maps.google.*
// ==/UserScript==

//  Simply forwards from Google Maps page saying
//  'Not a valid KML file' to whatever URL you put in
//  It may need some more replace() for punctuation symbols

var str=document.location.href
for (i=39;i<str.length;i++) {
if(str.substr(i,4)=="http"){
	var newstr=str.substr(i)
	var newstr=newstr.replace(/%3A/g,":")
	var newstr=newstr.replace(/%2F/g,"/")
	var newstr=newstr.replace(/%3F/g,"?")
	var newstr=newstr.replace(/%3D/g,"=")
	var newstr=newstr.replace(/%26/g,"&")
	window.location=newstr
}}