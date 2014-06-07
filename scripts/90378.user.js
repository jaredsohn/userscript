// ==UserScript==
// @name           E_Style
// @namespace      www.matthewneilcowan.com
// @description    Simplifies ECC's website with consistent coloration. Work in Progress.
// @include        http://www.eastcentral.edu/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/*I believe that if I had full access to changing the images and the css I could have this thing looking decent in < 3days. As is this has taken too much of my time.*/
/*My goal was to create a simple, consistent style across all the pages. In some cases I may have made things worse, but at least the current student page doesn't look like a kindergarten website anymore.*/ 
/*Unfortunately, the site's main problem remains the dancing haystack navigation. It's possible to find a needle in a haystack, but when it's moving all over the place...*/

addGlobalStyle('body {background: #2D5889;}' + '#container-center {background: none;}' + '#subheader2 {background: #2F7AC9;}' + '#wrapper {background: #2F7AC9;}' + '#fullheightcontainer {background: #fff;}' +  '#subheader1 {background: #2D5889;}' + '#header {background: #ccc;}' + '#navigation {background: #2D5889;}' + '#subfooter1 {background: #000;}' + '#subfooter2 {background: #2F7AC9;}' + '#navigation a {color: #FFF; padding-left: 10px; margin-left: 5px;}' 
+ '#center {background: #fff;}' + '#navigation_inner{float: left;}' + '.menulist a {color: #000;}' + '.menulist li, .menulist li a {color: #000;}' + '.menulist li a img{z-index: 1000;}'+ 'listMenuRoot {color: #000;}' + '#listMenuRoot li ul li a{color: #fff; background-color: #2D5889; }'+'#left{background: #102B48; color: #000; font-size: 1em;}' + '#container-center-bottom {background: #FFF;}' + '#search_social_links {display: block;}' + '.subnav {background: #102B48;}' + '.subnava {background: #102B48;}' + '.subnavb {background: #102B48;}' + '.subnav li {background: #FFF;}' + '.subnav ul li a {color: #000;}' + '#container-center {/*background: #fff;*/}' + '#container-center-top {background: #fff;}' + '#events {background: rgba(0,0,0,0);}' +'#container-center-right {background: #2D5889; color: #FFF;}' +  '#container-center-right ul li {background: #2D5889; color: #FFF; border: 1px solid #fff;}' + '#sports {background: #102B48;}' + '#subfooter2_top ul li a {color: #fff; font-size: 14px;}' + '.news_item_img {display: none;}' + '#container-center-right_inner {opacity: 0.5;}');

/*Whoever wrote the style on this next element...I have questions. Why specify width and height twice? Why put an image in a paragraph? It's not a word. Why specify styles inline at all unless it's an emergency? Also, as of 11/12/10 there are 3 unnecessary ul's on the main page. I hope it's just an oversight and not an attempt to compensate for the size of an image. */

addGlobalStyle('#container-center-right p a {display: none;}' + '#container-center-right ul {/*note to self: someday I will need to put code here to fix the height but not today*/}');
