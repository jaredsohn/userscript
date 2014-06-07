// ==UserScript==
// @name           Cleanup Geenstijl
// @namespace      http://userscripts.org/users/107427
// @description    Remove the top header
// @include        http://*.geenstijl.nl/*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

// Not sure why I use a function here.
(function() {
 // Remove headers
 $('#headmain').remove();
 $('#headextra').remove();
 // Move everything else up
 $('#navholder').css('top','0px');
 $('#colprim').css('top','45px');
 $('#colsec').css('top','45px');
 $('#colter').css('top','45px');
 }) ();