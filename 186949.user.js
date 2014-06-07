// ==UserScript==
// @name        Alza- real prices
// @author      zanazev
// @namespace   zanazev
// @version     0.1
// @updateURL   http://userscripts.org/scripts/source/186949.user.js
// @namespace   http://userscripts.org/users/283209
// @include     http://www.alza.sk/*
// @include     https://www.alza.sk/*
// @include     http://www.alza.cz/*
// @include     https://www.alza.cz/*
// @description Makes some simple css adjustment to show actual real prices in alza.cz and alza.sk product listings, which try to deceive you by showing no-tax prices instead of the taxed ones. The website is large and there will be many spots where i missed the prices, but the main purpose of the plugin is to show the real prices in the product listings and the product info pages.
// @copyright   Your mom
// @grant       none
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

var rules="";

rules+="#boxc .box .c2 {display:none! important;} \n";
rules+="#boxc .box .c1 {   font-size: 18px; font-weight: bold; color:red; top:-10px;} \n";
rules+=".priceDetail #prices .pricebase { display:none; } \n";
rules+="#best .b32 { display:none; } \n";
rules+="#best .b33 { font-weight:bold; font-size:10pt; } \n";

addGlobalStyle(rules);