// ==UserScript==
// @name           HideMyAss Anonymous Email Auto-Login
// @namespace      pete@hmastuff.com
// @description    Automatically logs in to HMA Anonymous Email with ability to save user+pass. Made for http://hmastuff.com to use with HideMyAss Anonymous Email @ http://hidemyass.com/anonymous-email/
// @include        https://hidemyass.com/anonymous-email/*
// @include        http://hidemyass.com/anonymous-email/*
// @copyright      hmastuff.com
// @author         pete@hmastuff.com
// @version        0.1
// @license        Public Domain
// ==/UserScript==

var username = GM_getValue('login_username', '');
var password = GM_getValue('login_password', '');

function main() {
if(username=='' || password=='') {options();}
else {
var f = document.getElementById('loginbutton'),
n = document.getElementsByTagName('input')[11],
p = document.getElementsByTagName('input')[12];
if(!f || !n || !p) {return;}
else {
if(n) {n.value = username;}
if(p) {p.value = password;}
f.click();
return true;
}
}
}

function options() {
var login_username = prompt('Email (e.g. myname@hmamail.com):');
var login_password = prompt('Password for HMAmail:');
if(login_username && login_password && login_username!='' && login_password!='') {
GM_setValue('login_username', login_username);
GM_setValue('login_password', login_password);
if(confirm('Reload to apply changes?')) {window.location.reload();}
} else {alert('Invalid Email address or password');}
return true;
}

// Nuller by JoeSimmons. Nulls out all the elements you put as the arguments.
// Syntax: nuller(someElement,anotherElement,moreElements);
function nuller() {
	for(x in arguments)
		if(x) {
			x=null;
			delete x;
		}
}

function leakAvoider() {
nuller(username,password,n,p,f,login_username,login_password);
window.removeEventListener('load', main, false);
document.removeEventListener('unload', leakAvoider, false);
return true;
}

window.addEventListener('load', main, false);
window.addEventListener('unload', leakAvoider, false);
GM_registerMenuCommand('HMA Anonymous Email Auto Login Options', options);