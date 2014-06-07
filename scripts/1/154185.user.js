// ==UserScript== 
// @name Tumblr Replies Fix
// @namespace http://edada.ms/havent-set-this-up
// @description Allows you to click reply on replies 
// @include www.tumblr.com/* 
// @include http://tumblr.com/* 
// @include http://www.tumblr.com/* 
// ==/UserScript== 

function etnn(){ // make function to be executed
    var docHead = document.getElementsByTagName('head')[0];
    var theStyle = document.createElement('style');
    theStyle.type = 'text/css';
    theStyle.id = 'tumblr_replies_fix';
    var styleInner = '.notes .note .block, .notes .note.reblog .block { right: 33px !important; }';
    theStyle.innerHTML = styleInner;
    docHead.appendChild(theStyle);
}

window.addEventListener("DOMContentLoaded", etnn, true); // run it after body load