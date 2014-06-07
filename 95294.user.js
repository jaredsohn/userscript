// ==UserScript==
// @name           iStock Icon Spacing Fix
// @namespace      http://userscripts.org/users/DesignHaus
// @description    Adds 1px margin-right to iStock icons
// @include        http://www.istockphoto.com/
// @include        http://.istockphoto.com/*
// @include        http://*.istockphoto.com/*

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

addGlobalStyle('.icons { margin-right: 1px !important; }');