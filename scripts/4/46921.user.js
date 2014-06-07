// ==UserScript==
// @name           Fix Opera's scroll to # anchor on page load
// @namespace      http://arty.name/
// @description    Sometimes you follow link with anchor in it (like #comments), but before page loads completely, you have scrolled it a bit. By default Opera scrolls to anchor at this moment, losing your context. This script fixes such behaviour. 
// @include        *
// ==/UserScript==

if (window.location.href.match(/#/)) {
    var scroll = 0;
    function handler(event){
        scroll = document.body.parentNode.scrollTop;
    }
    document.addEventListener('scroll', handler, false);
    document.addEventListener('load', function handler(event){
        if (scroll > 0) document.body.parentNode.scrollTop = scroll;
        document.removeEventListener('scroll', handler, false);
    }, false);
}
