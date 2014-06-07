// ==UserScript==
// @name        Stockcharts Show Only Charts
// @namespace   http://www.none.com
// @description None
// @match       http://*stockcharts.com/h-sc/
// @grant       none
// @version     0.1
// ==/UserScript==
var promoHeader = document.getElementsByClassName("sc2PromoHeader")[0]; 
if (promoHeader) { promoHeader.parentNode.removeChild(promoHeader); }
var beta = document.getElementsByClassName("beta")[0]; 
if (beta) { beta.parentNode.removeChild(beta); }
var workbench = document.getElementsByClassName("workbench")[0]; 
if (workbench) { workbench.parentNode.removeChild(workbench); }
var workbench = document.getElementsByClassName("workbench")[1]; 
if (workbench) { workbench.parentNode.removeChild(workbench); }
var nav = document.getElementById("nav");
if (nav) { nav.parentNode.removeChild(nav); }
var banner = document.getElementById("banner");
if (banner) { banner.parentNode.removeChild(banner); }
var workbenchAlerts = document.getElementById("workbenchAlerts");
if (workbenchAlerts) { workbenchAlerts.parentNode.removeChild(workbenchAlerts); } 


//EOF