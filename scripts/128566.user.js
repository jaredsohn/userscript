// ==UserScript==
// @name             Battery Checker
// @description  Try out the new battery API
// @include          *
// @run-at            document-start
// ==/UserScript==

var check = function()
{
var notify = (typeof GM_notification !== "undefined") ? GM_notification : window.alert; 
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || function(){notify("Battery API not supported in this browser."); throw new Error("Battery API not supported in this browser.")}();
var msg = "Battery status: " + Math.round(battery.level*100) + "% (" + (battery.charging ? "" : "dis") + "charging)\n"
    msg+= "Time until " + (battery.charging ? "" : "dis") + "charged: " + Math.round(battery.charging ? battery.chargingTime/60 : battery.dischargingTime/60) + " minutes";
notify(msg);        
};

GM_registerMenuCommand("Check Battery", check);