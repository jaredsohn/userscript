// ==UserScript==
// @name           Droid Arabic Naskh On Every Page
// @namespace      dcrossland
// @description    Changes all fonts in all websites to use the new Google/Android Arabic Naskh font, Droid Arabic Naskh, through Google Web Fonts
// @include        https://*
// @include        http://*
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


function addGlobalLink(linkUrl) {
    var head, link;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet'; 
    link.href = linkUrl;
    head.appendChild(link);
}

addGlobalLink('http://fonts.googleapis.com/css?family=Droid+Arabic+Naskh&subset=all');
addGlobalStyle('* {font-family: "Droid Arabic Naskh" !important;}');