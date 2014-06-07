// ==UserScript==
// @name           SU Background To Gray
// @namespace      http://www.stumbleupon.com/stumbler/Dreamicrzycool/reviews/
// @description    SU beta script test1
// @include        http://*.stumbleupon.com/*
// ==/UserScript==

(function () {
    
var nodes = document.querySelectorAll('<body>, body, div, p, table, tr, td, h1');

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