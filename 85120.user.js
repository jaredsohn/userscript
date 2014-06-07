// ==UserScript==
// @name           Remove Evernote Promotions
// @namespace      userscripts.org
// @description    Removes Promotions and container from Evernote.com. Gives more length to left side.
// @version        0.02
// @include        http://*evernote.com*
// @include        http://*.evernote.com/*
// @include        http://www.evernote.com/*
// @include        https://*.evernote.com/*
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('div.Header { visibility: hidden !important; }');
addStyle('div.SidebarInfoContainer { visibility: hidden !important; }');
addStyle('div.selectorScroll { height: 100% !important; }');