// ==UserScript==
// @id             imgur-full
// @name           Full-res imgur pictures
// @version        1.0
// @namespace      Full-res imgur pictures
// @author         sharix
// @description    Change low-res imgur pictures with full-res.
// @include        http://imgur.com/a/*
// @run-at         window-load
// ==/UserScript==

var i;
var pic = document.getElementById('image');
var picSrc = pic.src;
var fullSrc = picSrc.split('h.jpg')[0] + '.jpg';
pic.src = fullSrc;
//pic.max-width = '100% !important';

document.getElementById('next').onmousedown = function () {
    var i = 0;
    var pic = document.getElementById('image');
    var picSrc = pic.src;
    var fullSrc = picSrc.split('h.jpg')[0] + '.jpg';
    pic.src = fullSrc;
    pic.addEventListener("DOMAttrModified", function(event) {
        if (i == 0 && event.attrName == "src") {
        pic = document.getElementById('image');
        i = 1;   // this is to prevent endless loop
        picSrc = pic.src;
        fullSrc = picSrc.split('h.jpg')[0] + '.jpg';
        pic.src = fullSrc;
        }
});
return true;
};

