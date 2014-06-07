// ==UserScript==
// @name           filmweb search focus
// @description    automatycznie zaznacza pole wyszukiwarki żeby nie trzeba na nie klikać
// @include        http://www.filmweb.pl/search
// ==/UserScript==

(document.evaluate("//input[@name='q'][@class='bigInputText']", document, null, 9, null).singleNodeValue || document.evaluate("//input[@name='q']", document, null, 9, null).singleNodeValue || { focus: function(){} }).focus();
