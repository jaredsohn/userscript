// ==UserScript==
// @name           Botwin Style
// @namespace      http://www.erepublik.com
// @description    Botwin Style
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
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

addGlobalStyle('#logo a { background-image: url("http://i.imgur.com/kt5VH.png") !important;}');
addGlobalStyle('body { background-image: url("http://www.gamerswallpapers.com/user-content/uploads/wall/o/49/Erepublik-Ruined-World-Widescreen-Wallpaper.jpg") !important; }');
addGlobalStyle('.illustration { background: #FFF !important; }');