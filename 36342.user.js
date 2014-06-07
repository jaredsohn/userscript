// ==UserScript==
// @name           The Helper Auto-Login
// @description    Automatically logins in to TheHelper.net when Username/Password is given.
// @namespace      http://userscripts.org/users/71106
// @include        http://www.thehelper.net/*
// @copyright      Tristian Flanagan
// ==/UserScript==

var username = GM_getValue('thelper_username', '');
var password = GM_getValue('thelper_password', '');

function doLogin(){
	var f = document.evaluate("//form[@action='login.php?do=login']",document,null,9,null).singleNodeValue,
		u = document.getElementById('navbar_username'),
		p = document.getElementById('navbar_password');
	if(username=="" || password==""){
		setFields();
	}else{
		u.value = username;
		p.value = password;
		f.submit();
	}
}

function setFields(){
	var thelper_username = prompt("Username:");
	var thelper_password = prompt("Password:");
	GM_setValue('thelper_username', thelper_username);
	GM_setValue('thelper_password', thelper_password);
	username = thelper_username;
	password = thelper_password;
	doLogin();
}

window.addEventListener('load', doLogin, false);
GM_registerMenuCommand('TheHelper.net Field Values', setFields);