// ImageFAP Gallery direct image
// rewritten at Nov, 11 2006
// Copyright (c) 2006, Purelora

// ==UserScript==
// @name          ImageFAP direct images
// @namespace     http://purelora.copy.its.
// @description   Auto download images hosted by ImageFAP
// @include       http://www.imagefap.com/gallery.php?gid=*
// @include       http://imagefap.com/gallery.php?gid=*
// ==/UserScript==

var arLinks = document.getElementsByTagName('img');

for ( var i=0; i < arLinks.length; i++ ) {
    var elem = arLinks[i];

    if ( elem.src.match( /images\.imagefap\.com\/images\/thumb/ig ) ) {
        elem.src = elem.src.replace( /thumb/, 'full' );
    }
}