// ==UserScript==
// @name        Google Font Changes
// @version     1.3
// @author      sob508
// @namespace   sob508
// @description Redcue the heading font size
// @downloadURL http://userscripts.org/scripts/source/409277.user.js
// @updateURL   http://userscripts.org/scripts/source/409277.meta.js
// @include	https://www.google.co.za*
// @include	http://www.google.co.za*
// @include	https://www.google.com*
// @include	http://www.google.com*
// @run-at document-start
// ==/UserScript==

function addGlobalStyle(css){
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

GM_addStyle('html #res h3 a, html #tads h3 a { margin-bottom: 2px !important; font-size: 16px; line-height: 16px; }');
GM_addStyle('html .nrg-title a { font-size: 16px; line-height: 16px; }');
GM_addStyle('html #newsbox h3 a { font-size: 16px !important; line-height: 16px !important; }');
GM_addStyle('html #imagebox_bigimages a { font-size: 16px !important; line-height: 16px !important; }');