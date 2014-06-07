// ==UserScript==
// @name           Facebook auto-login
// @namespace      facebook.com
// @description    Automatically logs in to facebook (providing password is remembered by firefox)
// @include        http://*.facebook.com/*
// ==/UserScript==

// I wrote this as the other one on userscripts didn't seem to work in every login situation - this one should handle everything I think

// search for 'pass' element
if (p=document.getElementById('pass')) {
	if (p.value) {
		a=p.parentNode;
		while(!a.submit && (a!=null)) {a=a.parentNode;}
		a.submit();
	}
}
