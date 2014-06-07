// ==UserScript==
// @name       Highlight Google top Ads
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  The pale yellow color scheme on Google top ads is barely identifyable on some monitors. Make ads visible or remove the them
// @match      http://www.google.com/*
// @copyright  2013+, You
// ==/UserScript==

// Change this pale deceptive color....or remove the sucker
var BACKGROUND_COLOR = "#E5E2EE"; // Light colors - purple: "#E5E2EE"; blue:#DDEBEE  visible yellow:#F2F3D7
var BORDER_COLOR = "#E5E2EE";
var REMOVE_TOP_ADS = false;


// Retrieve 'tads' element - top ads. That was easy!
var tads = document.getElementById('tads');

if (tads != undefined){
    if (REMOVE_TOP_ADS) {
        tads.parentNode.removeChild(tads);
    } else {
        tads.style.backgroundColor = BACKGROUND_COLOR;
    	tads.style.borderColor = BORDER_COLOR;
    }
}