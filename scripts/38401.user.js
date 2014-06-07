// ==UserScript==
// @name          iGoogle Footer and left tab Cleanup
// @description   Cleanup iGoogle Footer and remove left tabs
// @namespace      http://userscripts.org/users/74740
// @description   http://userscripts.org/scripts/show/38401
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
// @version        2.0.2
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

GM_addStyle("#themeinfo, #footer_promos  {display:none !important;}");

var main = document.getElementById('col1');
if (main)
{
    document.getElementById('col1').style.display = "none";
}