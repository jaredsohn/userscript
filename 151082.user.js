// ==UserScript==
// @name        last-fm antigif
// @author      fermion.name
// @namespace   fermion
// @description script stops all gifs on last.fm
// @include     http://www.last.fm/*
// @version     2
// ==/UserScript==

// So, I hate dumb guys who use animated gifs as avatars.
// HTML5 really rocks! If you're not stupid webmonkey, read about Canvas 
// http://www.w3schools.com/tags/ref_canvas.asp

function filter_images() {
    [].slice.apply(document.images).filter(is_gif_image).map(freeze_gif);
}

function is_gif_image(i) {
    return /^(?!data:).*userserve.*\.gif/i.test(i.src);
}

function freeze_gif(i) {
    // Replace all gifs by canvas
    var c = document.createElement('canvas');
    i.parentNode.replaceChild(c, i);
    
    var w = c.width = i.width;
    var h = c.height = i.height;
    
    // Copy frame from gif image into canvas
    c.getContext('2d').drawImage(i, 1, 1, w+1, h-2);
}

filter_images();

// Stop animations in ajax loaded shoutbox
document.addEventListener('DOMNodeInserted', function(event) {
    if (event.target.className.indexOf('shoutboxContainer') != -1) {
        filter_images();
    }
});