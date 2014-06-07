// ==UserScript==
// @name        Unspoiler /r/pokemon
// @namespace   www.reddit.com/r/pokemon/*
// @description Removes spoilers from /r/pokemon
// @include     http://www.reddit.com/r/pokemon/*
// @version     1
// @grant       all
// ==/UserScript==
// thing id-t3_18dojw linkflair linkflair-spoiler odd link 
var css = '.listing-page .linkflair-spoiler a.title, .listing-page .linkflair-spoiler a.title:hover {\
    background: transparent !important;\
    color: blue !important;\
}\
.title {\
    border: none !important;\
}\
.listing-page .linkflair-spoiler a.title:visited {\
    color: #551A8B !important;\
}\
.listing-page .linkflair-spoiler a.title:before, .flairselector .linkflair-spoiler a.title:before {\
    display: none;\
}\
.listing-page .linkflair-spoiler .thumbnail img {\
    display: block;\
}\
.listing-page .linkflair-spoiler .thumbnail {\
    background: transparent;\
}\
.linkflairlabel {\
    display: none;\
}',
    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);