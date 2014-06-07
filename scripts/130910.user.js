// ==UserScript==
// @name           Whitespace+ Begone
// @namespace      https://plus.google.com/
// @description    Replaces that whitespace with a background image
// @include        https://plus.google.com/*
// ==/UserScript==


// replace this with an image of your choosing
// probably a good idea to pick one with appropriate resolution for your viewing pleasure
var piclocation = "http://www.wallpaper4me.com/images/wallpapers/thepiratebay-77708.jpeg";


document.getElementById("contentPane").style.background = '#fff url("'+piclocation+'") fixed top left';
