// SafePassport
// Jerry Chong <zanglang at time dot net dot my>
// Borrowed from Secure Yahoo and Gmail :P

// This software is licensed under the CC-GNU GPL
// <http://creativecommons.org/licenses/LGPL/2.1/>

// ==UserScript==
// @name	Safe Passport
// @namespace	none
// @description	Auto enable secure login for Microsoft Passport sites, i.e Hotmail
// @include	http://login.passport.net/uilogin.srf*
// ==/UserScript==


window.location.replace(window.location.href.replace(/^http\:(.+)/, "https:$1"));