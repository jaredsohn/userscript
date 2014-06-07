// ==UserScript==
// @name           google_search_focus
// @namespace      tag:snowhuouv,2007-12-30:google_search_focus
// @description    Pocus on Google's first result to make keyboard nav easier.
// @include        http://www.google.com/search*
// ==/UserScript==
document.getElementById('res').getElementsByTagName('a')[0].focus();