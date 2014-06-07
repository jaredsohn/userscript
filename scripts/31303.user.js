// ==UserScript==
// @name           CheckYourBets autologin
// @namespace      checkyourbets
// @description    Automatic login to checkyourbets.com
// @include        https://www.checkyourbets.com/*
// @exclude        https://www.checkyourbets.com/*/logout*
// ==/UserScript==

//// EDIT HERE ////
var login = "";
var pass = "";
///////////////////


function autologin() {
	var form = document.forms.namedItem('loginform');
	
	var username = document.getElementById('xuser');
	username.value = login;
	
	var password = document.getElementById('xpass');
	password.value = pass;


	if (username.value.length && password.value.length) {
		form.submit();
	}

}

autologin();
