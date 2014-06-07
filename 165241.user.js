// ==UserScript==
// @name       Cage Nicolas
// @version    0.1
// @description  adds nicolas cage everywhere
// @run-at document-end
// @copyright  2013, b7r
// @grant       none
// ==/UserScript==

var img = document.getElementsByTagName('img');
var image;

for(var i=0; i<img.length; i++) {
    image = new Image();
    image.src = img[i].src;
    
    img[i].style.width = image.width+"px";
    img[i].style.height = image.height+"px";
    
    img[i].src = 'http://cache2.allpostersimages.com/p/LRG/10/1062/Y4UL000Z/poster/nicolas-cage.jpg';
}