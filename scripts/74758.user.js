// ==UserScript==
// @name          AniLinkz Auto-WatchMode
// @namespace     alawm_simple_scripts
// @description   Automatically enables WatchMode when you watch anime at AniLinkz
// @include       http://www.anilinkz.com/*
// ==/UserScript==

if(document.getElementById('ads1')&&document.getElementById('ads2')&&document.getElementById('ads3')&&document.getElementById('ads4')&&document.getElementById('ads5')&&document.getElementById('chatbox')){
document.getElementById('ads1').innerHTML = " ";
document.getElementById('ads2').innerHTML = " ";
document.getElementById('ads3').innerHTML = " ";
document.getElementById('ads4').innerHTML = " ";
document.getElementById('ads5').innerHTML = " ";
document.getElementById('chatbox').style.display="none";
}