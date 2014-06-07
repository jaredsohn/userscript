// ==UserScript==
// @name Elance Auto Login
// @description Allows you to automatically sign in to Elance (www.elance.com)
// @include https://secure.elance.com/c/reg/main/login.pl*
// @author  Fahim Zahid
// @version 1.0
// ==/UserScript==


window.addEventListener('load',
function() {

var formexists = document.getElementsByTagName('form');

if (formexists.length) {
	var form = document.forms.namedItem('login');
	form.elements.namedItem('login_name').value = "USERNAME";
	form.elements.namedItem('password').value = "PASSWORD";
	form.submit();
} 

}, true);