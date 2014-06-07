// ==UserScript==
// @name           Show Delicious Images
// @namespace      http://claytron.com/gmscripts/
// @description    Show images inline in delicious
// @include        http://delicious.com/*
// @include        http://www.delicious.com/*
// ==/UserScript==
//
// I totally ripped off some of this code from somewhere as an 
// example, but now I don't remember where :(  So to whoever it
// was, Thanks....and sorry.
//
// For an example, go here:
// http://delicious.com/claytron/funny+system:media:image

(function(){

function init() {
    var tags = document.getElementsByTagName('h4');
    re = /\.(jpg|jpeg|png|gif)$/i;
    // make sure not to get the same image multiple times
    var shown = new Array();
    for (i = 0; i < tags.length; i++) {
        var link_tag = tags[i].childNodes[1];
        var link_href = link_tag.href;
        if (re.test(link_href)) {
            if (shown.indexOf(link_href) == -1) {
                shown[i] = link_href;
                add_thumbnail(link_tag);
            };
        };
    };
}

function add_thumbnail(link) {
    var thumb = document.createElement('img');
    thumb.src = link;
    // When sizing down the page, this is as small as it gets.
    // This will ensure that the image is never cropped, but also
    // means that it will never be larger than this. Mixed feelings
    // here.
    thumb.style.maxWidth = "500px";
    thumb.style.display = "block";
    thumb.style.margin = "8px 0";
    link.parentNode.insertBefore(thumb, link.nextSibling);
}

init();

}());