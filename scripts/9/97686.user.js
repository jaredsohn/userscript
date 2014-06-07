// ==UserScript==
// @name          minecraft.net fullscreen (Google chrome)
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Resizes the minecraft applet to full screen (Google chrome)
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
firstApplet.style.top      = '0';
firstApplet.style.left     = '0';

// Remove the body scrollbars
document.getElementsByTagName('body')[0].style.overflow = 'hidden';