// Author : Alex Wolkov
// Idea : Ronny Orbach & Alex Wolkov
// Original Style : ikiwq.com

// ==UserScript==
// @name         Flip
// @namespace    alexw.me
// @description  Practical joke on your office friends
// ==/UserScript==
if (typeof GM_addStyle == 'undefined') 
    var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) return;
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
}
var CSS="body{-moz-transform: scaleX(-1);-o-transform: scaleX(-1);-webkit-transform: scaleX(-1);transform: scaleX(-1)}img{-moz-transform: scaleY(-1);-o-transform: scaleY(-1);-webkit-transform: scaleY(-1);transform: scaleY(-1)}";

setTimeout(function(){
GM_addStyle(CSS);
},1000*60*15);


