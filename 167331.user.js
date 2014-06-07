// ==UserScript==
// @name        GTAForums Image Widthener
// @namespace   ALMOST610
// @description Stops Oversize Images Stretching Out The Screen Width.
// @updateURL   https://userscripts.org/scripts/source/167331.meta.js
// @downloadURL https://userscripts.org/scripts/source/167331.user.js
// @homepageURL https://userscripts.org/scripts/show/167331
// @icon        http://s3.amazonaws.com/uso_ss/icon/167331/large.png?1368345852
// @include     http://www.gtaforums.com/*
// @version     1.5
// ==/UserScript==


//  HERE ADDS THE NEW STYLES
var ScreenSize = screen.width;
var MaxImgSize;
MaxImgSize = (70 / 100) * ScreenSize;
if (ScreenSize > 1920){
    MaxImgSize = (80 / 100) * ScreenSize;
}
if (ScreenSize === 1920){
    MaxImgSize = (80 / 100) * ScreenSize;
}
if (ScreenSize === 1366){
    MaxImgSize = (72 / 100) * ScreenSize;
}
if (ScreenSize > 1025 && ScreenSize < 1920){
    MaxImgSize = (72 / 100) * ScreenSize;
}
if (ScreenSize === 1024){
    MaxImgSize = (63 / 100) * ScreenSize;
}
if (ScreenSize > 801 && ScreenSize < 1024){
    MaxImgSize = (63 / 100) * ScreenSize;
}
if (ScreenSize === 800){
    MaxImgSize = (52 / 100) * ScreenSize;
}
if (ScreenSize < 800){
    MaxImgSize = (40 / 100) * ScreenSize;
}
var css = ".shrinkimage { max-width:" +MaxImgSize +"px;}";

var htmlDiv = document.createElement('div');
htmlDiv.innerHTML = '<p>foo</p><style>' + css + '</style>';
document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
//  NEW STYLES FINISHED




// HERE ADDS THE NEW CLASS TO ALL IMAGES
var images = document.getElementsByTagName("img");
var i;


for(i = 0; i < images.length; i++) {
    images[i].className += "shrinkimage";
}
// NEW IMAGE CLASS FINISHED