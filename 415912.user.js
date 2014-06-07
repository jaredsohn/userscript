// ==UserScript==
// @name        InkBunny: Replace shrunk images with full images.
// @description Replaces shrunk images with full images in submission view. If modified, a lime border is added.
// @author      Magi
// @include     https://inkbunny.net/submissionview.php?id=*
// @icon        https://inkbunny.net/imagesbeta67/INKBunnyLogo.ico
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
    
    // find image
    var img = document.querySelector('.widget_imageFromSubmission img')
        , a = img.parentElement
        , div = a.parentElement
        ;
    
    /* if img is wrapped in <a href ...>, then replace image.src with a.href
     * & add visual style to indicate modification to the user */
    if (a.tagName == 'A') {
        div.removeChild(a);
        img.src = a.href;
        img.style.border = '1px solid lime';
        div.appendChild(img);
    }
    
})();
