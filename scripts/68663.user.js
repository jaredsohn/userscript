// ==UserScript==
// @name          Facebook Script
// @description   Make any script work on Facebook
// @require       http://gmconfig.googlecode.com/svn/trunk/fb_gm_frame.js
// @include       http://*.facebook.com/*
// ==/UserScript==

function fbPageChanged() {
     if (GM_testUrl(['http://*.facebook.com/home.php*'])) {
		// All your code goes here
(function (){
	var redirectTo = location.href;
	redirectTo = redirectTo.replace(/www\.facebook\.com\/home\.php\?\#\!\/joseph\.abe\/\?ref\=mf/, 'www.facebook.com');
        var redirect = location.href;
        redirect = redirect.replace(/www\.facebook\.com\/\?ref\=logo\#\!\/joseph\.abe\?ref\=nf/, 'www.facebook.com');
	if ( redirectTo != location.href ) location.href = redirectTo;
        else if (redirect != location.href) location.href = redirect;
})();
     }

