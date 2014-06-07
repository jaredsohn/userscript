// ==UserScript==
// @name           Hanne til Norge
// @namespace      http://josteinaj.no/ns/userscripts/hanne-til-norge
// @description    Hanne Countdown
// @include        http://www.google.no/*
// @include        http://www.google.com/*
// ==/UserScript==

Date.prototype.getDOY = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - onejan) / 86400000);
} 

var input = document.getElementsByTagName('input')[0];
var home = new Date();
home.setFullYear(2011,6,3,22,0,0);
var now = new Date();
var hours = (home.getFullYear() - now.getFullYear())*365.25*24 +
            (home.getDOY() - now.getDOY())*24 +
            (home.getHours() - now.getHours());
var div = document.createElement('div');
div.innerHTML = 'Det er '+hours+' timer igjen til Hanne er tilbake i Norge!';
div.style.textAlign = 'center';
div.style.fontSize = '1em';
input.parentNode.insertBefore(div,input);