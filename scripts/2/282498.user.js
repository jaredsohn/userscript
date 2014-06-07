// ==UserScript==
// @name        Pinterest like thumblr
// @version     0.1.2
// @include     http://pinterest.com/*
// @include     http://www.pinterest.com/*
// @include     https://www.pinterest.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       GM_addStyle
// @author      Christopher Juhlin
// ==/UserScript==


var tags = document.getElementsByTagName('img');

for (var i = 0; i < tags.length; i++) {

  tags[i].src = tags[i].src.replace('236x', '550x');
}

GM_addStyle ( "                                     \
.GridItems.variableHeightLayout>.item   \
{  \
position: static !important;  \
} \
.Pin.summary.summary  \
{  \
width: 50% !important;  \
margin: 0 auto; \
}  \
" );

var r = /-Th(-\d+)?\./;
var images = document.images;
for( i=0; i<images.length; ++i ) {
var img = images[i];
img.removeAttribute("style");
}