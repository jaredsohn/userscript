// ==UserScript==
// @name           polbank24 autocomplete
// @include        https://www.polbank24.pl/netbanking/
// ==/UserScript==

 var flds = document.getElementsByName('fldLoginUserId');
 flds[0].setAttribute('autocomplete', 'on');
 input.focus();