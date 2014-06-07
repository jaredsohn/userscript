// Image Host Redirector 1.3
// Copyright (c) 2006 Todd James
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
//
// ==UserScript==
// @name           Image Host Redirector
// @version        1.3
// @namespace      http://userscripts.org/people/3628
// @description    Automatically redirects image pages on free image hosts to the image itself.
// @include        *
// ==/UserScript==

(function() {
    var currentLocation = document.location.href;

    // imageshack.us
    if (currentLocation.match(/^https?:\/\/img[0-9]+\.imageshack\.us\/my\.php\?(.*&)?image=.+$/)) {
        document.location.href = document.getElementById('thepic').getAttribute('src');
    }

    // imagehigh.com
    else if (currentLocation.match(/^https?:\/\/(.*\.)?imagehigh\.com\/view\.php\?(.*&)?id=.+$/)) {
        document.location.href = document.getElementById('thepic').getAttribute('src');
    }

    // imagevenue.com
    else if (currentLocation.match(/^https?:\/\/img[0-9]+\.imagevenue\.com\/img\.php\?(.*&)?image=.+$/)) {
        document.location.href = document.location.protocol + '//' + document.location.hostname + '/' + document.getElementById('thepic').getAttribute('src');
    }

    // fapomatic.com
    else if (currentLocation.match(/^https?:\/\/(.*\.)?fapomatic\.com\/show\.php\?(.*&)?f=.+$/)) {
        document.location.href = document.getElementById('subject').getAttribute('src');
    }

    // tinypic.com
    else if (currentLocation.match(/^https?:\/\/(.*\.)?tinypic.com\/view\/\?(.*&)?pic=.+$/)) {
        var imageElems = document.getElementsByTagName('img');

        for (var i = 0; i < imageElems.length; i++) {
            if (imageElems[i].getAttribute('alt') == 'Image hosting by TinyPic') {
                document.location.href = imageElems[i].getAttribute('src');
            }
        }
    }
})();
