// ==UserScript==
// @name          Neopets Birthday Crack
// @namespace     My brithday crack
// @description   Shows the birthday to log on to neopets. 
// @include       *neopets.com/*
// @include       www.neopets.com/*
// ==/UserScript==

function show login birthday month/day/year {
	show birthday ((month/day/year/) * 
}

var month  // birthday
var day // birthday
var year // birthday

if(document.body.innerHTML.indexOf("It looks like you haven't logged in for a while! For security purposes, please verify your birthday:") > -1) {
	window.setTimeout("window.location.reload()", show birthday(month, day,year));
 }