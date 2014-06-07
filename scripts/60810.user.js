// ==UserScript==
// @name          Analytics Including Today
// @namespace     Google Analytics
// @description   Previous month and today
// @include       https://www.google.com/analytics/reporting*
// @exclude
// ==/UserScript==

var url = window.location.href;
var ourParameter = "&pdr=";

var today = new Date();
var day = today.getDate().toString();
var month = (today.getMonth() + 1).toString();
var year = today.getFullYear().toString();
var ourSpread;

if(day < 10)
	day = '0' + day;
	
if(month < 10)
	month = '0' + month;
	
	monthp = month-1;
	
	if(monthp < 10)
	monthp = '0' + monthp;
	
var ourSpread = year + monthp + day + '-' + year + month + day;

if(url.indexOf(ourParameter) < 0)
	window.location.href += '&pdr=' + ourSpread;
