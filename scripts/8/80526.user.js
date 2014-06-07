// ==UserScript==
// @name Kinopoisk Top-cleaner
// @version        1.3.2011
// @description It hides title banner from Kinopoisk.ru
// @include	http://kinopoisk.ru*
// @include	http://www.kinopoisk.ru/*
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
addGlobalStyle('body { background-image:none !important; } html { background-image:none !important; } #top .brand { position:relative !important; display:none !important; height:0px !important; } #top .master { top:11px !important; } #top { height:119px !important; } .png form .line_brand { display:none !important; } .ny2011 { top:-9px !important; } .logo { top:19px !important; } #top .menu { top: 11px !important; } #top_form { top: 23px !important; } #menu_top_help { top: 28px !important; } .filmfans { display:none !important; } .search { width:272px  !important; }');