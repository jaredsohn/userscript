// ==UserScript==
// @name           millenet autocomplete
// @include        https://www.bankmillennium.pl/ 
// @include        http://www.bankmillennium.pl/ 
// @include        https://www.bankmillennium.pl/osobiste/Default.qz?LanguageID=pl-PL
// ==/UserScript==

 var flds = document.getElementsByName('millekod');
 flds[0].setAttribute('autocomplete', 'on');
 input.focus();