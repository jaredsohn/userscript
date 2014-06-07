// ==UserScript==
// @name           Google login
// @namespace      local
// @description    Prefill google account login form.
// @include        https://accounts.google.com/*
// @version        0.0.2
// ==/UserScript==


// set your custom values
var email             = 'example';
var persistentCookie  = 'no';
var checked           = '';


// fill in form
document.getElementById('Email').value 	            = email;
document.getElementById('PersistentCookie').value   = persistentCookie;
document.getElementById('PersistentCookie').checked = checked;
