// ==UserScript==
// @name           clean4fuckr
// @namespace      jarod1701
// @include        http://4fuckr.com/*
// ==/UserScript==

var imglinks = document.getElementsByTagName('a');

for (var i = 0; i < imglinks.length; i++) {
    
    if (imglinks[i].className == 'thumb') {

        var href = imglinks[i].href;
        var parentdiv = imglinks[i].parentNode;
        
        if (href.substring(0, 24) != 'http://4fuckr.com/image_') {

            // crappy link
            
            parentdiv.style.display = 'none';

        }        
    }
}