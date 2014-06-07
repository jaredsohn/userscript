// ==UserScript==
// @name           ShakiraGallery Photo Full-Size Click
// @namespace      http://localhost/shakiragalleryfullsize
// @description    Opens up photos in full-size on shakiragallery.com
// @include        http://www.shakiragallery.com/pictures/details/*
// ==/UserScript==

try {
    //
    // Look for all img tags with class 'thumbnailimg'.
    //
    var imgs = document.getElementsByTagName ('img');
    var i;

    for (i = 0; i < imgs.length; ++i) {
        if (imgs[i].className == 'thumbnailimg') {
            if (imgs[i].parentNode.tagName == 'A') {
                var url = imgs[i].src;
                var re = new RegExp ("/normal_");

                url = url.replace (re, "/");

                imgs[i].parentNode.setAttribute ('href', url);
            }

            break;
        }
    }
}
catch (e) {
    //
    // Swallow the exception.
    //
}