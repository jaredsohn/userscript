// ==UserScript==
// @name           Geocaching.com - large textarea (Long Description)
// @namespace      none
// @include        http*://www.geocaching.com/hide/*
// @author         Michalowic
// @version        1.2
// ==/UserScript==

GM_addStyle(".pole {width: 980px;}");
var elmLink = document.getElementById('tbLongDesc');
elmLink.setAttribute('class', 'pole');
elmLink.setAttribute('rows', '50');