// ==UserScript==
// @name       Surfline Live Cam Ad Skip
// @namespace  http://surfline.com
// @version    0.1
// @description  Skips Live Cam Ad and reloads cam only after 20 seconds
// @match       http://*.surfline.com/surf-report/*
// @copyright  2099+, ?
// ==/UserScript==


startCamWithoutAd();
jQuery("#preRollAd").fadeOut("fast");
            jQuery("#preRollAd").remove();
            jQuery("#pushContentDown").remove();
            jQuery("#top-module-cam-report").fadeIn();

window.setInterval(function(){
  startCamWithoutAd();
}, 20000);