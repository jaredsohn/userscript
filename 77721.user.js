// ==UserScript==
// @name           Flickr View on Black Large
// @description    Adds link to Flickr image page to view large on black using BigHugeLabs.com
// @author         dcxxcd
// @version        0.1
// @namespace      view_on_black_large
// @include        http://www.flickr.com/photos/*
// ==/UserScript==
// 2010-05-26
// Copyright (c) 2010 dcxxcd
// Released under GPLv3
// http://www.gnu.org/copyleft/gpl.html
(function(){
    var onblackURL = 'http://bighugelabs.com/onblack.php?size=large&url='+encodeURIComponent(location.href);
    var about = document.evaluate('//div[@id="About"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var onblackDiv = document.createElement('div');
    onblackDiv.id = 'ViewOnBlack';
    var onblackLink = document.createElement('a');
    var words = document.createTextNode('View on black');
    onblackLink.appendChild(words);
    onblackLink.href = onblackURL;
    onblackDiv.appendChild(onblackLink);
    about.insertBefore(onblackDiv, about.childNodes[5]);
})();
