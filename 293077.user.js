// ==UserScript==
// @name       Kittenator
// @namespace  net.charries96.animals
// @version    0.1
// @description  enter something useful
// @include    *
// @copyright  2013+, charries96
// ==/UserScript==

var img = document.getElementsByTagName("img");
for(var i = 0; i < img.length; i++){
    var width = img[i].clientWidth;
    var height = img[i].clientHeight; 
    
    var g = "";
    
    var min = -10;
	var max = 10;
	var random = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if(random >= 0)
        g = "g/";
    
    img[i].src = "http://placekitten.com/" + g + width + "/" + height;
    
    g = "";
}
