// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include     http://www.youtube.com/*
// @copyright  2012+, You
// ==/UserScript==

function remove_recommended(t){
var t=setTimeout(function(){
var rec = document.getElementsByClassName("rec");
for(var i = 0; i < rec.length; i++){
rec[i].parentNode.parentNode.parentNode.setAttribute('style','display:none;');
}
},t)
}
remove_recommended();

window.addEventListener( "DOMContentLoaded", remove_recommended(2000), false );

document.getElementsByClassName('feed-load-more-container')[0].setAttribute("onclick","var t=setTimeout(function(){var rec = document.getElementsByClassName('rec');for(var i = 0; i < rec.length; i++){rec[i].parentNode.parentNode.parentNode.setAttribute('style','display:none;');}},2000)");
