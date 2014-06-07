// ==UserScript==
// @name           rlsmix.net Simplify
// @namespace      maeki.org
// @description    Only display post titles and download links
// @include        http://www.rlsmix.net/*
// ==/UserScript==

GM_addStyle('img.alignleft {display:none; !important;}')
GM_addStyle('.post-info {display:none; !important;}')
GM_addStyle('.post-info2 {display:none; !important;}')
var posts = document.getElementsByClassName('home-post-wrap');
for (var j=0; j<posts.length; j++) {
    var thispost = posts[j];
    for (var i=0; i<thispost.childNodes.length; i++) {
        var element = thispost.childNodes[i];
        if(!!element) {
            if (element.nodeName === "P") {
                if (!element.hasAttribute('align'))
                    element.parentNode.removeChild(element);
            
            }
        }
}
}