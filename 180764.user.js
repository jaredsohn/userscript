// ==UserScript==
// @name			Robloto 
// @name           Roboto On Every Page
// @namespace      dcrossland & j1my 
// @description    Roblox uses Roboto instead of their bad fonts.  
// wow many font such web developer many talent (No, no talent. Shedletsky and design team, you're retards.)  
// @include        https://www.roblox.com*
// @include        http://www.roblox.com*
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

//Make any changes you want here
addGlobalLink('http://fonts.googleapis.com/css?family=Roboto&subset=all');
addGlobalStyle('* {font-family: Roboto !important;}');
// fin 
