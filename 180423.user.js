// ==UserScript==
// @name       AWBW no port 8080
// @namespace  http://www.grappigegovert.com/
// @version    1.0
// @description  Uses port 80 instead of 8080 with AWBW
// @match      http://awbw.amarriner.com/*
// @copyright  2013, GrappigegovertProductions
// ==/UserScript==

var images = document.querySelectorAll('img');
for(var i = 0, l = images.length; i < l; i++){
    images[i].src = images[i].src.replace("awbw.amarriner.com:8080", "awbw.amarriner.com");
}

var links = document.querySelectorAll('link');
for(var i = 0, l = links.length; i < l; i++){
    links[i].src = links[i].src.replace("awbw.amarriner.com:8080", "awbw.amarriner.com");
}