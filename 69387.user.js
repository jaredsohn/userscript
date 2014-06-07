// ==UserScript==
// @name          iGoogle Complete Cleanup with Footer shrink
// @description   Cleanup iGoogle completely and reduce your footer
// @namespace      http://userscripts.org/users/74740
// @description   http://userscripts.org/scripts/show/69387
// @include       http://google.*/ig*
// @include       http://*.google.*/ig*
// @include       http://*.google.*/ig*
// @include       http://google.*/ig*
// @exclude       http://google.*/ig/*
// @exclude       http://*.google.*/ig/*
// @exclude       https://*.google.*/ig/*
// @exclude       https://google.*/ig/*
// @exclude       https://*.google.tld/accounts/ServiceLogin?continue=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&followup=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&service=ig&passive=true&cd=US&hl=en&nui=1&ltmpl=default
// @exclude       http://*.google.tld/accounts/ServiceLogin?continue=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&followup=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&service=ig&passive=true&cd=US&hl=en&nui=1&ltmpl=default
// @copyright      NJA
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
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

GM_addStyle("#footerwrap {height:30px !important;}");
GM_addStyle("#addstuff, #footer_promos, #themeinfo, #promo  {display:none !important;}");