// ==UserScript==
// @name           YotsubaAT
// @namespace      Http://www.anontalk.com/
// @description    Makes AnonTalk look like /b/.
// @include        Http://www.anontalk.com/*
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
"UL#main_menu {background-color: #F0E0D6; !IMPORTANT}" +
"BODY {background-image:URL('http://img190.imageshack.us/img190/9836/fadeu.png');" +
"background-repeat:repeat-x;" +
"background-color:#FFFFEE}" +
"H1:after {content:' ;_;'}" +
"unimportant:after {content:' ex. Non-Pedo Material'}");
