// ==UserScript==
// @name           PayPal Auto-Login
// @namespace      http://userscripts.org/users/49594
// @description    Automatically logs in to PayPal with easy configuration options. Based on JoeSimmons' script and corrected some errors so that it works with the latest greasemonkey.
// @include        https://www.paypal.com/*
// @include        http://www.paypal.com/*
// @copyright      RayZ/JoeSimmons
// @version        1.0.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var username = GM_getValue('pp_un', '');
var password = GM_getValue('pp_pw', '');

function main() {
if(!/^https?:\/\/www\.paypal\.com/.test(location.href)) {return;}
if(username=='' || password=='') {options();}
else {
var f = document.evaluate("//form[@name='login_form']",document,null,9,null).singleNodeValue,
n = document.getElementById('login_email'),
p = document.getElementById('login_password');
if(!f || !n || !p) {return;}
else {
if(n) {n.value = username;}
if(p) {p.value = password;}
f.submit();
return true;
}
}
}

function options() {
var pp_un = prompt('Username to remember');
var pp_pw = prompt('Password to remember');
if(pp_un && pp_pw && pp_un!='' && pp_pw!='') {
GM_setValue('pp_un', pp_un);
GM_setValue('pp_pw', pp_pw);
if(confirm('Reload to apply changes?')) {window.location.reload();}
} else {alert('Invalid username or password');}
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
nuller(username,password,n,p,f,pp_un,pp_pw);
window.removeEventListener('load', main, false);
document.removeEventListener('unload', leakAvoider, false);
return true;
}

window.addEventListener('load', main, false);
window.addEventListener('unload', leakAvoider, false);
GM_registerMenuCommand('PayPal Auto Login Options', options);