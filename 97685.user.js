// ==UserScript==
// @name          minecraft.net fullscreen (Firefox)
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Resizes the minecraft applet to full screen (Firefox)
// @include       http://*minecraft.net/game/
// ==/UserScript==

// Get all applets
var allApplets = document.getElementsByTagName('applet');

// Get the first applet
var firstApplet = allApplets[0];

// Change the width and height
firstApplet.width = window.innerWidth;
firstApplet.height = window.innerHeight;

// Move the applet a bit
firstApplet.style.position = 'absolute';
firstApplet.style.top      = '235px';
firstApplet.style.left     = '0';

// Remove the body scrollbars
document.getElementsByTagName('body')[0].style.overflow = 'hidden';
