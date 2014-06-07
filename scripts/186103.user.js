// ==UserScript==
// @name       elektrisch-roken , geen sneeuwstorm
// @namespace  http://actie-commitee-tegen-sneewstormen.com
// @version    0.1
// @description  sneeuw vrij!
// @match      http://www.elektrisch-roken.com/*
// @copyright  Public Domain
// ==/UserScript==


var initCleanup = function () {
    //stop snowstorm
    if (snowStorm) {
    	snowStorm.stop();
    }
    //voor later... doe iets aan die smilies..
};

if ( !!(window.addEventListener) )
window.addEventListener("DOMContentLoaded", initCleanup )
