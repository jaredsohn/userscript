// ==UserScript==
// @name           Mefi steak
// @namespace      http://plutor.org/
// @description    Adds delicious steak to MetaFilter
// @include        http://metafilter.com/
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/
// @include        http://*.metafilter.com/*
// ==/UserScript==
//

function mefi_steak_init() {
    var steak = document.createElement('div');
    steak.style.backgroundImage = 'url(http://plutor.org/temp/steak.jpg)';
    steak.style.padding = '10px';
    steak.style.width = '480px';
    steak.style.height = '355px';
    steak.style.position = 'absolute';
    steak.style.top = '10px';
    steak.style.left = '10px';
    steak.id = 'steak';

    var close = document.createElement('div');
    close.innerHTML = 'HIDE STEAK';
    close.style.cursor = 'pointer';
    close.style.background = 'white';
    close.style.padding = '5px';
    close.style.color = 'black';
    close.style.cssFloat = 'right';
    close.style.opacity = '0.7';
    close.addEventListener("click", function() {
        var steak = document.getElementById('steak');
        if (steak && steak.parentNode)
            steak.parentNode.removeChild(steak);
    }, true);

    steak.appendChild(close);
    document.body.appendChild(steak);
}

mefi_steak_init();

// The photo of a steak is by ratterrell on Flickr:
// <http://flickr.com/photos/ratterrell/35727928/>
