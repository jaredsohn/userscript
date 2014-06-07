// ==UserScript==
// @name        e621 Mascot Changer
// @namespace   e621MC
// @description e621 Mascot Changer
// @include     http://e621.net/*
// @include     http://e621.net/post/show/*
// @version     1.1
// ==/UserScript==

//sets default variable
var custbg = GM_getValue("custbg","http://e621.net/data/d0/b7/d0b706829850cb366694a78e4f3b7d35.png?1265100854");

//checks for mainpage
if (window.location.href == "http://e621.net/") {
unsafeWindow.backgs[5] = [custbg,"#012e56"];
}
//all the vars
var navbar, newElement, maglink, imgd, imgsrc;

navbar = document.getElementById ('add-to-pool');
newElement = document.createElement ('li'); //new list element

newElement.innerHTML = '<a id="maglink" href="#">Make background</a>'; //magic link

if (navbar) {
	navbar.parentNode.insertBefore (newElement, navbar.nextSibling); //adds link after the pool link
} 

maglink = document.getElementById ('maglink');

imgd = document.getElementById ('image');
imgsrc = imgd.src;

unsafeWindow.addEventListener("DOMContentLoaded", function() {
    document.getElementById("maglink").addEventListener("click", function(e) {
        GM_setValue('custbg', imgsrc);
        e.preventDefault();
        return false;
    }, false);
}, false);
