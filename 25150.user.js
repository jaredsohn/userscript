// ==UserScript==
// @name           force gmail basic html view
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://www.google.com/accounts/ServiceLogin?service=mail*
// @include        https://www.google.com/accounts/ServiceLogin?service=mail*
// ==/UserScript==

document.addEventListener('load',gmhtml,false);
if(window.location.href == 'http://mail.google.com/mail/' || window.location.href == 'http://mail.google.com/mail/?ui=1')
	window.location = location.href.replace('ui=1', 'ui=html');

function gmhtml()
{
	var s = document.getElementById('gaia_loginform');
	if(s)
	{
		s["continue"].value = 'https://mail.google.com/mail/?nsr=1&ui=html&zy=l';
		s.onsubmit = function () { return true; }
	}
}