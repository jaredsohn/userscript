// ==UserScript==
// @name           RemoveLightbox2
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/*
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

addGlobalStyle('body.lightbox #photo-lightbox {display:none !important}');
addGlobalStyle('body.lightbox {overflow:visible  !important}');
addGlobalStyle('div.zoom-trigger {cursor:default !important}');
