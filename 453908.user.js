// ==UserScript==
// @name dA No Image Dragging
// @author Tommy Smith
// @description Are images on devianTART being a drag? Bring back the copy and paste ability that has existed since the dawn of computers that dA denies the existence of with dA No Image Dragging!
// @version 0.2
// @include http*://deviantart.com/*
// @include http*://*.deviantart.com/*
// ==/UserScript==
window.setInterval("for(i=0;i<document.getElementsByClassName('mcbox ch').length;i++){document.getElementsByClassName('mcbox ch')[i].setAttribute('onmousedown','');document.getElementsByClassName('mcbox ch')[i].style.cursor='text';if(!document.getElementsByClassName('mcbox ch')[i].getElementsByClassName('mcb-preview')[0]){}else{for(j=0;j<document.getElementsByClassName('mcbox ch')[i].getElementsByClassName('mcb-preview').length;j++){document.getElementsByClassName('mcbox ch')[i].getElementsByClassName('mcb-preview')[j].style.cursor='text';}}}Surfer2=function(){};", 500);