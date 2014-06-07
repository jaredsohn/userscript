// ==UserScript==
// @name           Reply Box Font
// @namespace      Reply Box Font
// @description    Replaces the font in the post reply box
// @include        http://*bungie.net/*/createpost.aspx*
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

addGlobalStyle('textarea {width: 526px; font-family: Arial,Helvetica,sans-serif; font-size: 12px;}');