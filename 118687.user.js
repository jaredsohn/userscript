// ==UserScript==
// @name          AdFly Quick Skip
// @namespace     Dragazarth
// @description	  Skips AdFly's countdown timer and starts the download
// @include       http://adf.ly/*
// @version        0.2
// ==/UserScript==
// thankyou to simpsoholic





document.addEventListener("DOMContentLoaded", skip, false)

skip () {

countdown = 1; 
counter(); 
window.location = _.G("skip_button").href;

}