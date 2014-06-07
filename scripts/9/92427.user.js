// I'm your man
// version 0.1 BETA!
// 10-12-2010
// Copyright (c) 2010, Tarik Čelik
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "I'm your man", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          I'm your man
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js
// @namespace     http://userscripts.org/users/heronimus
// @description   So she knows what how feel about her
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==
document.getElementById('rightCol').innerHTML += '<object width="244" height="208"><param name="movie" value="http://www.youtube.com/v/tKjSr1zOTq0?fs=1&amp;hl=hr_HR"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/tKjSr1zOTq0?fs=1&amp;hl=hr_HR" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="transparent" allowfullscreen="true" width="244" height="208"></embed></object>';
