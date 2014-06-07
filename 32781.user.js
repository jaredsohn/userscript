// ==UserScript==
// @name           University Villa Autologin
// @namespace      By Matt Mitchell
// @description    Automatically login to Villa_Wireless
// @include        http://satellite043.hotsitenet.com/*
// ==/UserScript==

username = "";
password = "";
default_page = "http://www.google.com";

if (document.getElementById('navigation')) {
	window.location = default_page;
	}
else {
	document.getElementsByTagName('input')[0].value = username;
	document.getElementsByTagName('input')[1].value = password;
	document.getElementsByTagName('form')[0].submit();
}
