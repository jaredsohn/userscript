// Facebook Secure
// version 0.1
// 2008-02-04
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Secure
// @description   Forces facebook to use secure connection.
// @include       http://www.facebook.com/*
// ==/UserScript==
//

location.href = location.href.replace(/^http:/, 'https:');

//