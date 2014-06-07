// ==UserScript==
// @name           KodieFiles Image Redirect
// @namespace      http://none.existant
// @description    Links from a KodieFiles.nl gallery page directly to images.
// @include        http://91.192.38.68/
// ==/UserScript==
// collect all links
var allLinks = document.getElementsByTagName('a')



// walk through the array

for(var i=0; i < allLinks.length; i++) {
if (allLinks[i].href.match('/~k')){
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('/k','/full/k');
        allLinks[i].href = allLinks[i].href.replace('/thumbs/tn_','/full/');
        allLinks[i].href = allLinks[i].href.replace('.html','.jpg');}
}

// that's it!