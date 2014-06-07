// ==UserScript==
// @name           TW news font family hack
// @namespace      http://userscripts.org/users/kabaism
// @description    To Hck TW news from optimizing font-family
// @include        http://beta.tw.news.yahoo.com/*
// @require http://userscript-updater-generator.appspot.com/?id=113978
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

addGlobalStyle('body, h1, h2, h3, h4, h5, h6, p { font-family: arial,STHeiti, PMingLiu, sans-serif; }');
