// ==UserScript==
// @name           USISFix
// @namespace      http://www.ugurcetin.com.tr/
// @copyright      2009, Uğur Çetin (http://www.ugurcetin.com.tr)
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @description    YTÜ USIS'teki ders programının düzgün görünmesini sağlar
// @include        http://usis.yildiz.edu.tr/*
// ==/UserScript==

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle('.box { font-size: 10px ! important; }');