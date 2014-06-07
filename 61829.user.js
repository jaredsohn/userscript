// ==UserScript==
// @name          Rick Roll
// @namespace     Kafke
// @description   Rick Rollin'
// @include       *
// ==/UserScript==

var allElements, thisElement;
allElements = document.getElementsByTagName('img');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    thisElement.src = 'http://t0.gstatic.com/images?q=tbn:_JOIwZlHrNNAxM:http://img530.imageshack.us/img530/2701/rick2px2.jpg';
}
if (location.href.indexOf("youtube.com/watch?v=") != -1){
if(!(location.href.indexOf("youtube.com/watch?v=Yu_moia-oVI") != -1))
{
window.location = "http://www.youtube.com/watch?v=Yu_moia-oVI";
}
}
if (location.href.indexOf("video.google.com") != -1){
window.location = "http://www.youtube.com/watch?v=Yu_moia-oVI";
}
