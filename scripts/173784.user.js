// ==UserScript==
// @name           Ipernity V2 Image Unblocker : All sizes
// @namespace      http://www.ipernity.com
// @description    removes the invisible image blocking images on ipernity. Works with the new version of Ipernity.
// @version        0.1 (20 July 2013)
// @grant          none
// @include        http://www.ipernity.com/*/sizes*
// ==/UserScript==



var div = document.getElementById("embed_preview");
var image_elements = div.getElementsByTagName("img");

for (var i = 0; i < image_elements.length; i++) {
    var image_element = image_elements[i];
    if (image_element.style.display == 'block')  // it's the one !!!
        var blockingimage = image_element;
    }
blockingimage.parentNode.removeChild(blockingimage);
