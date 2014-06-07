// ==UserScript==
// @name           Ipernity V2 Image Unblocker
// @namespace      http://www.ipernity.com
// @description    Removes the invisible image blocking images on ipernity. Works with the new version of Ipernity
// @version        0.1 (21 July 2013)
// @grant          none
// @include        http://www.ipernity.com/doc/*
// ==/UserScript==


var re = new RegExp('/sizes');
var t = re.test(document.location.href);

var blockingimage;

if (t) { // we are on the page "All sizes"
    var div = document.getElementById("embed_preview");
    var image_elements = div.getElementsByTagName("img");

    for (var i = 0; i < image_elements.length; i++) {
        var image_element = image_elements[i];
        if (image_element.style.display == 'block')  // it's the one !!!
            blockingimage = image_element;
    }
} else { // we are on the single photo page
    blockingimage = document.getElementById("zgif");
}

blockingimage.parentNode.removeChild(blockingimage);