// ==UserScript==
// @name       PROFO.SK Blocking Like to See
// @namespace  http://www.svetit.sk/
// @version    0.1
// @description  Script that block like to see and shows photos instantly
// @match      http://profo.sk/*
// @copyright  2014+, Kristian Patlevic
// ==/UserScript==

jQuery('.onp-sociallocker-content').show();

/* 
 * JavaScript block
 * var t = document.getElementsByClassName('onp-sociallocker-content'); for(var i=0;i<t.length;i++){ t[ i ].style.display="block"; }
 */