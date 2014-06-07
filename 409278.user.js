// ==UserScript==
// @name	Asana Customisations
// @version	1.2
// @author         sob508
// @namespace      sob508
// @downloadURL    http://userscripts.org/scripts/source/409278.user.js
// @updateURL      http://userscripts.org/scripts/source/409278.meta.js
// @include		http://app.asana.com/*
// @include		https://app.asana.com/*
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

addGlobalStyle('/* s body { background: linear-gradient(to left bottom, #001294 0%, #00B39E 50%, #001294 100%) !important; } */');
addGlobalStyle('body { box-shadow: inset 0 0 280px 110px rgb(0, 0, 60); }');
addGlobalStyle('.logo.expanded { opacity: .4; }');