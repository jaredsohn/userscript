// ==UserScript==
// @name           Derpy Orangered
// @namespace      http://www.reddit.com/r/mylittlepony/
// @description    Replace orangered with Derpy
// @include        http://www.reddit.com/*
// ==/UserScript==



var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.reddit.com/static/mail.png")
{
images[x].src = "http://i54.tinypic.com/1z1uuxe.png";

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle( '#header-img {margin-top:22px; margin-bottom:0px; margin-right: 5px;}');
}
x=x+1;
}

