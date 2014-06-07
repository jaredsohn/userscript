// ==UserScript==
// @name           V5.5seriestester
// @namespace      http://www.stumbleupon.com/stumbler/Dreamicrzycool/reviews/
// @description    SU beta script test5.01
// @include        http://*.stumbleupon.com/*
// ==/UserScript==

(function () {
    
var nodes = document.querySelectorAll('body, div, p, table, tr, td, h1, l-footer');

for (i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var computedStyle = document.defaultView.getComputedStyle(node, null);
    var bg = computedStyle.getPropertyValue('background').toLowerCase();

    var rgb = bg.replace(/[^0-9,]/g, '').split(',');

    /* If each RGB component is greater than 0xc0 ... */
    if ((rgb[0] > 0xc0 && rgb[1] > 0xc0 && rgb[2] > 0xc0) ||
        /* ... or if this is <body> with auto/transparent background */
        (node.tagName.toLowerCase() == 'body' && (bg == 'auto' ||
        bg == 'transparent')))
    {
        node.style.background = '#000000';
    }
}

})();