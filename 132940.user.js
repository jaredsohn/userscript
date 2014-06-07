// ==UserScript==
// @name       	The Pirate Bay Popup Window Blocker
// @namespace  	http://userscripts.org/users/jamfrade
// @version    	2.0 (20121016)
// @description	Disable The Pirate Bay popup window
// @match	http://*.thepiratebay.org/*
// @match     	https://*.thepiratebay.org/*
// @match     	http://*.thepiratebay.se/*
// @match     	https://*.thepiratebay.se/*
// @include   	http://*thepiratebay.org/*
// @include   	https://*thepiratebay.org/*
// @include   	http://*thepiratebay.se/*
// @include   	https://*thepiratebay.se/*
// ==/UserScript==

document.cookie = "els_exrng=1; path=/";
document.cookie = "trn_exrng=1; path=/";
if ("undefined" != typeof localStorage) {
    localStorage.setItem('els_exrng_exp', 9999999999)
    localStorage.setItem('els_exrng', 1);
    localStorage.setItem('trn_exrng_exp', 9999999999)
    localStorage.setItem('trn_exrng', 1);
}