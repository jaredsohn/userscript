// ==UserScript==
// @name           Remove Google Search Ads
// @namespace      http://userscripts.org/users/432583
// @description    Removes ads from Google search result pages
// @version        1.1
// @author         eddie_j
// @homepage       http://userscripts.org/scripts/show/124101
// @include        http://www.google.*
// @include        https://www.google.*
// ==/UserScript==
GM_addStyle("#tads { display:none; }");
GM_addStyle("#tadsb { display:none; }");
GM_addStyle("#rhs { display:none; }");