// ==UserScript==
// @name        glassdoor
// @namespace   glassdoor-remove-blur
// @description script to remove the blur effect on glassdoor reviews
// @include     http://www.glassdoor.com/Reviews/*
// @grant       none
// @version     1
// ==/UserScript==

var fbPrompt = document.getElementsByClassName("sneakPeekItemPromoBox");

for(var i=0 ; i < fbPrompt.length ; ++i){
    var item = fbPrompt[i];
    item.parentNode.removeChild(item);
}

document.getElementById("ReviewList").getElementsByTagName("li").className = "review";