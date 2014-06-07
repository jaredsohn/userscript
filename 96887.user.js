// ==UserScript==
// @name           GaiaOnline - Password Focus
// @namespace      http://userscripts.org/users/126924
// @description    Makes the Password field have focus
// @include        http://www.gaiaonline.com/*
// @include        http://*.gaiaonline.com/marketplace/userstore/*/buy/*
// @include        http://*.gaiaonline.com/marketplace/mystore/sell/?step=confirm
// @include        http://*.gaiaonline.com/marketplace/mystore/cancel/?id=*
// ==/UserScript==

els = document.getElementsByClassName("marketplaceInputField")
for( var i = 0; i < els.length; i++ ){
	if( els[i].name == "password" ){ els[i].focus(); break; }
}