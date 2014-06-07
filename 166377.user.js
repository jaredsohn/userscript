// ==UserScript==
// @name        GoogleSignInEditableEmail
// @namespace   GoogleSignInEditableEmail
// @description Show email text input instead of preselected email
// @include     https://accounts.google.com/Login*
// @include     https://accounts.google.com/ServiceLogin*
// @version     1
// @grant       none
// ==/UserScript==

var email = document.getElementById('Email');
email.setAttribute('type','text')

if (email.getAttribute('type') == 'text') {
	var emailSpan = document.getElementById('reauthEmail');
	emailSpan.style.visibility = 'hidden';
}
