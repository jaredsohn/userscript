// ==UserScript==
// @name        FIMFiction Upvote
// @namespace   http://shadedraco.com/
// @version     0.2
// @description Adds a Google +1 Button to FIMFiction blog posts.
// @include     http*://www.fimfiction.net/blog/*
// @copyright   2012+, The Equestrian Gentlecolt
// ==/UserScript==
var Container = document.getElementsByClassName('comment_container')[0].parentNode;
var BlogIdSpan = document.getElementsByClassName('dataspan item')[0];
if (Container != null && BlogIdSpan != null) {
    Container.innerHTML = '<img src="//www.fimfiction-static.net/themes/poni2.0/images/content_box_header_divider.png"><span style="display: inline-block; vertical-align: middle; padding: 0.2em"><g:plusone href="http://www.fimfiction.net/blog/'+BlogIdSpan.textContent+'"></g:plusone></span>' + Container.innerHTML;
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('head')[0]; s.appendChild(po);
}
