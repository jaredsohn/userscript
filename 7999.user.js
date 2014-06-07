// ==UserScript==
// @name           Wired.com printer friendly redirect
// @description    redirects to printer friendly pages
// @include        http://www.wired.com/*
// ==/UserScript==

if (document.location.href.match("0,")) document.location = document.location.href.replace("0,", "1,");