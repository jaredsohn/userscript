// ==UserScript==
// @name           force HTTPS for GMail
// @include        http://mail.google.com/*
// @include        http://www.google.com/accounts/ServiceLogin?service=mail*
// @include        https://www.google.com/accounts/ServiceLogin?service=mail*
// ==/UserScript==

document.addEventListener('load',gmhttps,false);
var uriMatcher = new RegExp('http://mail\.google\.com')
var uriMatchResult = uriMatcher.exec(window.location.href)
if (uriMatchResult != null)
	window.location = location.href.replace('http', 'https');

function gmhttps()
{
	var s = document.getElementById('gaia_loginform');
	if(s)
	{
		s["continue"].value = 'https://mail.google.com/mail/';
		s.onsubmit = function () { return true; }
	}
}
