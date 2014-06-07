// ==UserScript==
// @name           Ukryte Opcje w LiveBoxie
// @version        1.0
// @namespace      http://luki.net.pl
// @description    Dodaje przycisk który przenosi nas do ukrytych opcji.
// @include        http://192.168.1.1/cache/*/index.cgi
// ==/UserScript==

var table = document.getElementsByClassName('menuban');
table = table[0].parentNode;
table.innerHTML += "<td onmouseover=\"javascript:className='menubanHover'\" onmouseout=\"javascript:className='menuban'\" onclick=\"javascript: mimic_button ('navigator: 730 ..', 0)\" class=\"menuban\" align=\"CENTER\" height=\"30\" valign=\"MIDDLE\">Ukryte opcje</td><td class=\"menubanVerticalLine\" align=\"CENTER\" height=\"20\" valign=\"MIDDLE\">&nbsp;</td>"