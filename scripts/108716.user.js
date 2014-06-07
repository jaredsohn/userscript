// ==UserScript==
// @name Recommended Page Section Hiding on FB
// @namespace http://userscripts.org
// @description hides the recommended pages area on fb which appears on the home page
// @include http://www.facebook.com
// @exclude *
// ==/UserScript==

var pageSection=document.getElementById('c4e34b93574e503908010838');
pageSection.style.visibility='hidden';