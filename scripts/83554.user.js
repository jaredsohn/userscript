// ==UserScript==
// @name           ADP Login remember
// @namespace      http://userscripts.org/users/AntAreS24
// @description    Remove autocomplete=off from the ADP website login page
// @include        https://secure.adppayroll.com.au/index.php
// ==/UserScript==

GM_addStyle("");

e=document.getElementsByTagName('USERNAME')[0];
e.setAttribute( "autocomplete", "on" );

e=document.getElementsByTagName('USERID')[0];
e.setAttribute( "autocomplete", "on" );

e=document.getElementsByTagName('PASSWORD')[0];
e.setAttribute( "autocomplete", "on" );