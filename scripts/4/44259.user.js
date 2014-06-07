// ==UserScript==
// @name           Juuuz Autologin
// @namespace      blank
// @include        http://www.juuuz.com/*
// ==/UserScript==


var timer = 1000;
var timo, maySubmit = true;

var form = document.forms.namedItem('loginForm');
var uid = form.elements.namedItem('userLogin');
var pw = form.elements.namedItem('userPassword');

var email_conf = GM_getValue('email');
var password_conf = GM_getValue('password');

var email_form = document.getElementById('userLogin');
var password_form = document.getElementById('userPassword');
var submit_form = document.getElementById('loginForm');


GM_registerMenuCommand('Account-Informationen festlegen', setAccountInformation);
GM_registerMenuCommand('Account-Informationen zurücksetzen', clearAccountInformation);

if(!email_conf && submit_form)
{
	var result = confirm('You did not save your user information yet. Would you like to do it now to use the autologin?');
	if(result)
	{
		setAccountInformation();
		location.reload();
	}
}

if(email_conf && email_form)
	email_form.value = email_conf;

if(password_conf && password_form)
	password_form.value = password_conf;

function doSignIn() {
	if(uid.value.length && pw.value.length && maySubmit) {  // Form must be non-empty and not being typed into
		form.submit();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();


function setAccountInformation()
{
	var email_prompt = prompt('Enter your username here:', (email_conf ? email_conf : ''));
	if(email_prompt)
	{
		GM_setValue('email', email_prompt);
	
		var password_prompt = prompt('Enter your password here:');
		if(password_prompt)
			GM_setValue('password', password_prompt);
	}
}

function clearAccountInformation()
{
	GM_setValue('email', '');
	GM_setValue('password', '');
	
	alert('Saved username and password have been erased!');
}