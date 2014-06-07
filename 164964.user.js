// ==UserScript==
// @name        MDN Floating Contents
// @namespace   http://techlivezheng.me
// @description Floating contents for Mozilla Developer Network
// @author      Techlive Zheng
// @version     v1.0
// @include     https://developer.mozilla.org/*
// @grant       none
// ==/UserScript==

var article_nav = document.getElementById('article-nav');
var article_nav_page_toc = Array.filter( article_nav.childNodes, function(elem){
    return elem.attributes && elem.attributes.class.value == 'page-toc';
})[0];
var article_nav_page_anchors = Array.filter( article_nav.childNodes, function(elem){
    return elem.attributes && elem.attributes.class.value == 'page-anchors';
})[0];
article_nav_page_toc.setAttribute('style', 'position:fixed;bottom:45px;right:5px;width:auto;max-height:80%;overflow:scroll;white-space:nowrap;');
article_nav_page_toc.style.visibility="hidden";
article_nav_page_anchors.setAttribute('style', 'position:fixed;bottom:5px;right:5px;');
article_nav_page_anchors.addEventListener("click", function( event ) {
    if (article_nav_page_toc.style.visibility == "hidden") {
        article_nav_page_toc.style.visibility="visible";
    } else {
        article_nav_page_toc.style.visibility="hidden";
    }
}, false);


