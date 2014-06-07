// ==UserScript==
// @name        Minitokyo
// @namespace   Minitokyo
// @description Minitokyo bigger thumbnails
// @include     http://gallery.minitokyo.net/*
// @version     1
// @grant       none
// ==/UserScript==

function addCss(cssString)
{
    var head = document.getElementsByTagName('head')[0]; 
    if (!head)
        return;
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
}

for (var i=0; i < document.images.length; i++)
{
    var img = document.images[i];
    if (img.src.contains("thumbs"))
        img.src = img.src.replace("static3", "static1").replace("thumbs", "view");
}

addCss(
'.scans > li { width: 500px !important; height: auto !important; vertical-align: bottom; display: inline-block !important; float: none !important; margin: 10px 3% !important; }' +
'.scans > li > a { width: 500px !important; }' +
'.scans > li > a > img { width: 500px; }' +
'.scans > li > p { width: 500px !important; }' +
'.scans { text-align: center; height: auto !important; }'
); 