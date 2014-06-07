// ==UserScript==
// @name           Alior Bank autocomplete
// @include        https://aliorbank.pl/hades/do/Login
// ==/UserScript==

 var flds = document.getElementsByName('p_alias');
 flds[0].setAttribute('autocomplete', 'on');
 input.focus();