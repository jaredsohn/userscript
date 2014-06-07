// ==UserScript==
// @name        Piperka Auto-Reload
// @namespace   com.maltera
// @description Automatically reloads the Piperka update list when opening a comic.
// @include     http://piperka.net/updates.html
// @grant       none
// @version     1
// ==/UserScript==

document.body.addEventListener( "click", function (event) {
    var target = event.target;
    if ('a' != target.tagName.toLowerCase()) return;
    if ('_blank' != target.getAttribute( 'target' )) return;
    
    window.setTimeout( function() {
        location.reload( true );
    }, 1 );
}, false );
