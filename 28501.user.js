// ==UserScript==
// @name          Yahoo Login Info
// @namespace     http://www.maracaibodenoche.com
// @description   Script to save the login information for Yahoo!
// @include       https://login.yahoo.com/*
//www.yahoo.com
// ==/UserScript==

var username = document.getElementById('username');

if (username != null) {
	document.getElementById('username').value = 'Your username goes here';
}
document.getElementById('passwd').value = 'Your password goes here';
document.forms[0].submit();
