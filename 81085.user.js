// ==UserScript==
// @name           TIBCOmmunity Login remember
// @namespace      http://userscripts.org/users/testben
// @include        http://www.tibcommunity.com/
// ==/UserScript==
GM_addStyle("");

e=document.getElementsByTagName('loginform')[0];
e.setAttribute( "autocomplete", "on" );