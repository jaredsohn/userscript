// ==UserScript==
// @name           Diigolet
// @namespace      http://www.diigo.com
// @description    Load diigolet automatically if you don't use diigo toolbar
// ==/UserScript==

s=document.createElement('script');
s.type='text/javascript';
s.src='http://www.diigo.com/javascripts/webtoolbar/diigolet_b_h_b.js';
document.body.appendChild(s);