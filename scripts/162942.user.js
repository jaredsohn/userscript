// ==UserScript==
// @name        Bing Image Slideshow Controls
// @description This script places slideshow controls on Bing Image
// @namespace   http://www.francoisauger.com/gmscripts
// @include     http://www.bing.com/images/*
// @version     1.1
// ==/UserScript==

var ss_int;
var delay = 3000;
var body = document.getElementsByTagName('body')[0];
var div = document.createElement('div');
div.style.cssText = 'position: fixed; left: 2px; top: 2px; z-index: 100000; background-color: rgba(255,255,255,0.5); color: #000; padding: 1px 2px;';
div.innerHTML = 
    '<a href="#" style="color: #444" onclick="startSlideshow();return false;">start</a> / ' +
    '<a href="#" style="color: #444" onclick="stopSlideshow();return false;">stop</a> ' +
    '<input onChange="updateInterval(this)" type="text" value="' + delay + '" style="background-color: transparent; border: 1px solid #aaa; width: 35px;height: 8px; font-size: 6px; text-align: right;"><span style="font-size: 8px;"> ms</span>';
body.appendChild(div);

document.startSlideshow = function() {
    ss_int = window.setInterval(function(){document.getElementById('iol_navr').click()}, delay);
}

document.stopSlideshow = function() {
    clearInterval(ss_int);
}

document.updateInterval = function(msInput) {
    delay = msInput.value;
    document.stopSlideshow();
    document.startSlideshow();
}