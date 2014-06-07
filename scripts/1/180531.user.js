// ==UserScript==
// @name        kill growthhacker.tv share bar
// @namespace   com.abtain.grease.killgbar
// @description kill growth bar
// @include     http://share.growthhacker.tv/*
// @version     1
// @grant       none
// ==/UserScript==

function a()
{
document.getElementsByClassName('frame_box')[0].setAttribute("style", "top: 0px");
document.getElementById('bar').style.display = 'none';
}

setTimeout(a, 7000);