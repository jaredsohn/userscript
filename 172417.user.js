// ==UserScript==
// @name            Hide Yahoo toolbar on Flickr
// @description     Make the Yahoo 'eyebrow' toolbar vanish on Flickr
// @namespace       http://bluefuton.com
// @version         0.1
// @author          Chris Rosser
// @license         MIT
// @released        2013-07-02
// @updated         2013-07-02
// @match           *://flickr.com/*
// @match           *://www.flickr.com/*
// @run-at          document-start
// ==/UserScript==
(function () {
    'use strict';
     
    document.addEventListener('DOMContentLoaded', function (e) {
        document.getElementById('eyebrow').style.display = 'none';
        document.querySelector('body').classList.remove("with-eyebrow");
    });
})();