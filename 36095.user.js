// ==UserScript==
// @name          iGoogle Footer Remover
// @description   remove iGoogle footer
// @include       http://google.com/ig*
// @include       http://*.google.com/ig*
// @include       https://*.google.com/ig*
// @include       https://google.com/ig*
// @exclude       http://google.com/ig/*
// @exclude       http://*.google.com/ig/*
// @exclude       https://*.google.com/ig/*
// @exclude       https://google.com/ig/*
// @exclude       https://*.google.tld/accounts/ServiceLogin?continue=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&followup=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&service=ig&passive=true&cd=US&hl=en&nui=1&ltmpl=default
// @exclude       http://*.google.tld/accounts/ServiceLogin?continue=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&followup=http://www.google.com/ig%3Fhl%3Den%26source%3Diglk&service=ig&passive=true&cd=US&hl=en&nui=1&ltmpl=default
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

addGlobalStyle(
'#footerwrap {height:auto !important}' +
'#footerwrapinner {display:none}' +
'html {background-color:black;}' );