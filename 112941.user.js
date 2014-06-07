// ==UserScript==
// @name          EasyHTTPS
// @namespace     http://userscripts.org/users/144580
// @description	  Script to change automatically login pages to HTTPS if available
// @version       0.05
// @include       http://userscripts.org/login*
// @include       http://www.userscripts.org/login*
// @include       http://login.live.com/*
// @include       http://facebook.com/
// @include       http://www.facebook.com/
// @include       http://facebook.com/login*
// @include       http://www.facebook.com/login*
// @include       http://mail.google.com/*
// @include       http://twitter.com/*
// @include       http://www.twitter.com/*
// @include       http://meebo.com/
// @include       http://www.meebo.com/
// ==/UserScript==

<!-- EasyHTTPS-->
<!-- Made originally by tegasinho -->
<!-- Edited by tegasinho -->
<!-- If you modify this script,please don´t delete this lines -->
<!-- This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. -->

function replaceHTTP()
{
location.href = location.href.replace(/http\:/, 'https:');
}

replaceHTTP()