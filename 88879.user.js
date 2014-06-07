// ==UserScript==
// @name           RemoveLightbox
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

addGlobalStyle('#photo-drag-proxy { z-index:-10 };');
addGlobalStyle('#notes { position:absolute !important }');
document.getElementById('notes').setAttribute('style',document.getElementById('photo-drag-proxy').getAttribute('style'));
document.getElementById('photo').insertBefore(document.getElementById('notes'),document.getElementById('photo-drag-proxy'));
