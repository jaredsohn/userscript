// ==UserScript==
// @name          LL & ETI Styling
// @namespace     
// @description   Adds some custom CSS to everyone's favorite website
// @include       *endoftheinter.net/*
// @exclude       
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


addGlobalStyle('h1, .menubar a {color: #B4B4B4 !important; text-shadow: -1px -1px 1px #666666, 1px 1px 0px #fff !important; border-bottom:0px !important; text-decoration: none !important; font-style:normal !important; } a:hover{color: #004A7F !important;} .menubar a{ text-shadow: -1px -1px 0px #666666, 1px 1px 0px #fff !important;} .menubar a:hover{color: #FF7F7F !important; }'	);