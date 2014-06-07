// ==UserScript==
// @name           HP PSC 2500
// @namespace      http://userscripts.org/users/317806
// @description    Ads the A4 document format to the scan document format list
// @include        http://hppsc2500/scan/wshome.htm
// ==/UserScript==

var code = document.createElement('option');
code.setAttribute('value','3');
code.setAttribute('selected','selected');
code.appendChild(document.createTextNode('A4'));

document.getElementById('ws_size').appendChild(code); 