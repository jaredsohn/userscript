// ==UserScript==
// @name           Reply Box Font v2
// @namespace      Reply Box Font v2
// @description    Replaces the font in the post reply box, now with a bigger text box!
// @include        *bungie.net/*/createpost.aspx*
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

addGlobalStyle('textarea {width: 526px; height: 500px; font-family: Arial,Helvetica,sans-serif; font-size: 12px;}');