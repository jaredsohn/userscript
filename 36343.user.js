// ==UserScript==
// @name           Facebook Auto-Login
// @description    Automatically logins in to Facebook when Username/Password is given.
// @namespace      http://userscripts.org/users/71106
// @include        http://*.facebook.com/
// @copyright      Tristian Flanagan
// ==/UserScript==

var email = GM_getValue('facebook_email', '');
var password = GM_getValue('facebook_password', '');

function doLogin(){
	var f = document.evaluate("//form[@name='menubar_login']",document,null,9,null).singleNodeValue,
		e = document.getElementById('email'),
		p = document.getElementById('pass');
	if(email=="" || password==""){
		setFields();
	}else{
		e.value = email;
		p.value = password;
		f.submit();
	}
}

function setFields(){
	var facebook_email = prompt("Email:");
	var facebook_password = prompt("Password:");
	GM_setValue('facebook_email', facebook_email);
	GM_setValue('facebook_password', facebook_password);
	username = facebook_email;
	password = facebook_password;
	doLogin();
}

window.addEventListener('load', doLogin, false);
GM_registerMenuCommand('Facebook Field Values', setFields);