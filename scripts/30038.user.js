// ==UserScript==
// @name           Remove Flickr from Trekweb
// @namespace      http://trekweb.com/
// @description    Remove Flickr from Trekweb
// @author         Matthew Ozor
// @include        http://trekweb.com/
// ==/UserScript==


var pics = document.getElementById('tw_flickr');
if (pics) {
    pics.parentNode.removeChild(pics);
}