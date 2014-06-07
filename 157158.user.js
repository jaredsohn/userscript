// ==UserScript==
// @name        gifclick
// @namespace   localhost
// @include     http://gifctrl.com/*
// @version     1
// ==/UserScript==

window.setInterval(function(){
var gif = document.getElementById('frame');
    gif.click();
var closer = document.getElementsByClassName('close');
if(closer[0]) closer[0].click();

}, 120000)