// Inquira auto-login script for Greasemonkey
// 06/11/2009 : Written by Matt Cook, with Nicholai Burton on the assist
// 09/17/2009 : TimMo : Corrected a bug where an Inquira page containing a username,
//                         but no password field (like the "Find Authors" page), would
//                         cause the script to silently fail with errors.
//
// ==UserScript==
// @name           Inquira auto-login
// @namespace      http://gtausers
// @description    Automatically log into Inquira Information Center
// @include        http://atl-inqapp*
// @include        http://atl-inqlb*
// @include		   http://infocenter*
// @include        http://infomanager*
// @include        http://chsinquiralb/*
// ==/UserScript==

var username = 'JohnDo';     // Replace JohnDo with your Inquira username
var password = 'Password1';  // Replace Password1 with your Inquira password

// DO NOT EDIT BELOW THIS LINE
var userbox = document.getElementsByName('userid')[0];
var passwordbox = document.getElementsByName('password')[0];
var domainbox = document.getElementsByName('domain')[0];
if (typeof (userbox) != 'undefined') {
	userbox.value = username;
	if (typeof (domainbox) != 'undefined') {
		domainbox.value = 'blackbaud';
	}
	if (typeof (passwordbox) != 'undefined') {
		passwordbox.value = password;
		document.forms[0].submit();
	}
}