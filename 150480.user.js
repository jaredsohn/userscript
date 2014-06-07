// ==UserScript==
// @name        Fix Facebook RTL languages
// @namespace   MVGM
// @description Make texts more readable. (For rtl langueges like Persian, Syriac, N'ko & ...)
// @include     http*://*.facebook.*
// @version     0.1 (beta)
// ==/UserScript==

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = 'span[dir="rtl"] { direction: rtl; display: inline-block !important; text-align: right; }';
document.getElementsByTagName('head')[0].appendChild(style);