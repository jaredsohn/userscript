// ==UserScript==
// @name           Graymaker
// @namespace      http://odyniec.net/
// @description    Makes bright background darker and easier for the eyes
// @include        http://*
// @include        https://*
// ==/UserScript==

(function () {
    
var nodes = document.querySelectorAll('body, div, p, table, tr, td, h1');

for (i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var computedStyle = document.defaultView.getComputedStyle(node, null);
    var bgColor = computedStyle.getPropertyValue('background-color').toLowerCase();

    var rgb = bgColor.replace(/[^0-9,]/g, '').split(',');

    /* If each RGB component is greater than 0xc0 ... */
    if ((rgb[0] > 0xc0 && rgb[1] > 0xc0 && rgb[2] > 0xc0) ||
        /* ... or if this is <body> with auto/transparent background */
        (node.tagName.toLowerCase() == 'body' && (bgColor == 'auto' ||
        bgColor == 'transparent')))
    {
        node.style.backgroundColor = '#c0c0c0';
    }
}

})();
