// ==UserScript==
// @name           WordPress.com TextArea Override
// @namespace      airodyssey.net
// @description    Replaces font in the WP HTML editor
// @include        http://*.wordpress.com/wp-admin/*
// @include        https://*.wordpress.com/wp-admin/*
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

addGlobalStyle('#wp_mce_fullscreen, #wp-content-editor-container #content { font-family: Helvetica,Arial,sans-serif !important; font-size: 1.1em !important; }');
