// ==UserScript==
// @name       Fimfic Story author icon linker
// @namespace  Find completely unrelated shit at http://zippysqrl.tumblr.com very smutty (─ ω ─ )
// @homepage       http://userscripts.org/scripts/show/201989
// @updateURL      http://userscripts.org/scripts/source/201989.user.js
// @version    1.1
// @description  adjusts little things I am nitpicky about on fimfiction.net, because I can.
// @include        http://www.fimfiction.net/*
// @include        http://fimfiction.net/*
// @copyright  2014+, ZippySqrl
// ==/UserScript==
var imagestolink = document.getElementsByClassName("story_avatar");
var i;
for (i=0; i<imagestolink.length;i++){
    
    var Ima = imagestolink[i];
    var PNo = Ima.parentNode;
    if (PNo.className=="content_box post_content_box story_content_box"){
        //there has got to be an easier way to navigate nodes ._.
        var authspan = PNo.getElementsByClassName("author")[0];
        var authlink = authspan.getElementsByTagName("a")[0];
        var linkwrap = document.createElement('a');
        linkwrap.href = authlink.href;
        linkwrap.title = authlink.innerHTML;
        linkwrap.appendChild(Ima.cloneNode(true)); 
        PNo.replaceChild(linkwrap, Ima); 
    }
}
