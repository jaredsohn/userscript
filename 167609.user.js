// ==UserScript==
// @name           Show larger Sized Image Attachments
// @namespace      http://*
// @description    Enlarge thumbnails.
// @include        http://*/showthread.php*
// ==/UserScript==

//Define maximum image width (fraction of screen resolution)
var MaxWidth = 0.15 * screen.width;
var imgURL = "initialized";
var i = 0;

//use CSS to set max image width & make posts fill 100% width of screen
var styleString = "img { max-width:" + MaxWidth + "px; } .page { width: !important; }";
GM_addStyle(styleString);

//Replace thumbnails with full sized attachment
var imgs = document.getElementsByTagName('img');
var len = imgs.length;
for (i = 0; i < len; i++) {
    if (imgs[i].className == "thumbnail") {
        //get URL of full sized image
        imgURL = imgs[i].src;
        imgURL = imgURL.replace("&stc=1&thumb=1","");
        imgURL = imgURL.replace("&thumb=1","");
        //replace thumbnail with full image
        imgs[i].src = imgURL;
    }
}
