// ==UserScript==
// @name          Web PTT style clear
// @namespace     http://alowblow.blogspot.com/WebPttStyleClear
// @description   Clear Css and image in ptt web ver.
// @include       http://www.ptt.cc/*
// @version       2011.1222a
// ==/UserScript==

(function(){
    var image = document.getElementById("header").firstChild;
    alert(image.id);
    image.parentNode.removeChild(image);
    alert("down");
})();