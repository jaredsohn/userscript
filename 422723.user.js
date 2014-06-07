// ==UserScript==
// @name            Scribd unblur
// @description		Unblur scribd.com documents
// @namespace		http://userscripts.org/users/404262
// @author          KrisWebDev
// @version         1.0
// @include         http://*.scribd.com/doc/*
// @include         https://*.scribd.com/doc/*
// @grant           GM_addStyle
// ==/UserScript==

GM_addStyle(".text_layer {	color: inherit !important; text-shadow: none !important; }"); 
GM_addStyle(".page-blur-promo {	display: none !important; }"); 
GM_addStyle(".page-blur-promo-overlay:parent {	display: none !important; }"); 
GM_addStyle(".absimg { opacity: 1.0 !important; }"); 
GM_addStyle(".page_missing_explanation { display: none !important; }"); 

