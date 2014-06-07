// Honcast video resizer
// version 0.2 beta!
//
// ----------------------------------------------------------------------------
// "THE BEER-WARE LICENSE" (Revision 42):
// <rasmusm@diku.dk> wrote this file. As long as you retain this notice you
// can do whatever you want with this stuff. If we meet some day, and you think
// this stuff is worth it, you can buy me a beer in return Rasmus Meldgaard
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name          Honcast video in full window
// @namespace     http://rasmusm.dk/tmp
// @description   Change size of the video to fill the whole browser window for videos on honcast.com
// @include       http://honcast.com/*
// ==/UserScript==

var videodiv=document.getElementById("video");
var oldinnerHTML = videodiv.innerHTML;

function clicktest() {
    oldinnerHTML = oldinnerHTML.replace("640", window.innerWidth);
    oldinnerHTML = oldinnerHTML.replace("360", window.innerHeight);

    document.body.innerHTML = oldinnerHTML;
};


document.getElementById("tools").innerHTML = document.getElementById("tools").innerHTML + '<input type="button" value="Resize" id="resize"/>';
document.getElementById("resize").addEventListener("click", clicktest, true);
