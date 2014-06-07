// ==UserScript==
// @name           RemoveAutoComplete
// @namespace      https://account.enmasse.com/
// @include        *.enmasse.com/*
// ==/UserScript==
if (document.getElementById('signin_user_email'))
	document.getElementById('signin_user_email').removeAttribute('autocomplete');
if (document.getElementById('signin_user_password'))
	document.getElementById('signin_user_password').removeAttribute('autocomplete');
if (document.getElementById('user_email'))
	document.getElementById('user_email').removeAttribute('autocomplete');
if (document.getElementById('user_password'))
	document.getElementById('user_password').removeAttribute('autocomplete');