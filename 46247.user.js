// ==UserScript==
// @name           mBank autocomplete
// @include        https://www.mbank.com.pl/
// ==/UserScript==

 var input = document.getElementById('customer');
 input.setAttribute('autocomplete', 'on');
 input.focus();
