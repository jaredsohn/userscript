// ==UserScript==
// @name          linksave.in click'n'load button enabler
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Enables the click'n'load button instantly
// @include       http://*linksave.in/*
// ==/UserScript==

// Update the image
document.getElementById('cnl_image').src = 'img/cnl.jpg';

// Make the button work
document.getElementById('cnl_link').href = 'javascript:load_cnl2();';