// ==UserScript==
// @name           CL Skip Warning
// @namespace      none
// @include        http://*.craigslist.org/*
// ==/UserScript==

//document.body.innerHTML = document.body.innerHTML.replace(new RegExp('cgi-bin/.*cgi.*category=', 'g'), "");
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('i/.*\?.*=', 'g'), "");
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('i/autos', 'g'), "cta");