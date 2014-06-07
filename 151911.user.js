// ==UserScript==
// @name        MyGoogleLogo
// @namespace   http://localhost
// @description Change the Google logo and bacgkround image with your own hosted image / Just change the logo and background values below with your own online(hosted image location) or hard drive(path and file name) values
// @version     12
// @include     http://*.google.*/*
// @include     https://*.google.*/*
// @resource    logo http://img15.picoodle.com/i55d/morbidboy/lhi7_9f7_u9vpf.png
// @resource    background http://img10.picoodle.com/i55d/morbidboy/e5fj_5fb_u9vpf.jpg
// ==/UserScript==
// --------------------------------------------------------------------------------------------------------------------------------
// Add a custom LOGO from a local file on your hard drive or an image online
//
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "User-Logo";
newLogo.border = 'no'

// Uncomment the following line for a local background image file which is in the same location as this .js javascript script - edit the name of the file in the internet address in the filelogo resource section at the top
newLogo.src = GM_getResourceURL ("logo");

// Replace the logo
oldLogo.parentNode.replaceChild(newLogo, oldLogo);

// --------------------------------------------------------------------------------------------------------------------------------
//
// Add a custom BACKGROUND from a local file on your hard drive or an image online
//
var b = document.body;

// Set a background image
b.style.background = '#ccc url("' + GM_getResourceURL ("background") + '") no-repeat center center fixed';

// Set the size of the image to fit
b.style.backgroundSize = "cover";

// Quick mod to remove footer entirely - disable greasemonkey to change Google settings
var oldFoot = document.getElementById('fbar');
if (oldFoot) {
    oldFoot.parentNode.removeChild(oldFoot);
}
