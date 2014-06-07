// ==UserScript==
// @name       ForTurkingbear
// @version    1
// @description  Changes all images to turkingbear's avatar
// @match      http://*/*
// @copyright  2012+, Tjololo
// ==/UserScript==

var url="http://mturkforum.com/image.php?u=25402&dateline=1368061328&type=profile";
var images = document.getElementsByTagName('img'); 
for(var i = 0; i < images.length; i++) {
    images[i].src = url;
}
