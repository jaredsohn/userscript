// ==UserScript==
// @name           eurobank autocomplete
// @include        https://online.eurobank.pl/bi/bezpieczenstwo_logowanie.ebk
// ==/UserScript==

 var flds = document.getElementsByName('uzytkownik');
 flds[0].setAttribute('autocomplete', 'on');
 input.focus();