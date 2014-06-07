// ==UserScript==
// @name        Imagehost Direct Image
// @namespace   kra
// @include     *imageteam.org/*
// @include     *pimpandhost.com/*
// @include     *imagetwist.com/*
// @include     *imgdino.com/*
// @include     *imagebam.com/*
// @include     *imagevenue.com/*
// @include     *fastpic.ru/*
// @include     *pixroute.com/*
// @include     *postimage.org/*
// @include     *imgchili.com/*
// @include     *pixhost.org/*
// @version     1.1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.overlay_ad, .popupOverlay, #redirect-ad { display: none !important; }');


if(document.URL.indexOf("imageteam.org") >= 0){
var image = document.getElementById("container");
var theone = image.getElementsByTagName("img")[1];
img = theone.src;
window.location = img;
}

if(document.URL.indexOf("pimpandhost.com") >= 0){
var image = document.getElementById("imgholder");
var theone = image.getElementsByTagName("img")[0];
img = theone.src;
window.location = img;
}

if(document.URL.indexOf("imagetwist.com") >= 0){
var image = document.getElementById("left");
var theone = image.getElementsByTagName("img")[0];
img = theone.src;
window.location = img;
}

if(document.URL.indexOf("imgdino.com") >= 0){
var image = document.getElementById("cursor_lupa");
img = image.src;
window.location = img;
}

if(document.URL.indexOf("imagebam.com") >= 0){
document.body.setAttribute('onload',''); 
document.body.innerHTML = document.getElementById("imageContainer").innerHTML;
document.body.style.marginTop = "-26px";
}

if(document.URL.indexOf("imagevenue.com") >= 0){
var image = document.getElementById("thepic");
img = image.src;
window.location = img;
}

if(document.URL.indexOf("fastpic.ru") >= 0){
var image = document.getElementById("image");
img = image.src;
window.location = img;
}

if(document.URL.indexOf("pixroute.com") >= 0){
var theone = document.getElementsByTagName("img")[1];
img = theone.src;
window.location = img;
}

if(document.URL.indexOf("postimage.org") >= 0){
var theone = document.getElementsByTagName("img")[0];
img = theone.src;
window.location = img;
}

if(document.URL.indexOf("imgchili.com") >= 0){
var image = document.getElementById("show_image");
img = image.src;
window.location = img;
}

if(document.URL.indexOf("pixhost.org") >= 0){
var image = document.getElementById("show_image");
img = image.src;
window.location = img;
}