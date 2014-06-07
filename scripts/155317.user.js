// ==UserScript==
// @name       Better Minethings Battery
// @version    0.1
// @description  Adds a date to the Minethings battery
// @match      http://*.minethings.com/*
// @copyright  2012+, Hotrootsoup
// ==/UserScript==
if (!document.getElementById("batteryLife")) { //No battery on page check.
    return;
}
var MTDateElement = document.getElementById("batteryLife");
var MTdate = MTDateElement.innerHTML;
var currentDate = new Date().getTime();
if (MTdate.indexOf("d") !== -1) {
    MTdate = MTdate.split(" ");
    MTdate[0] = MTdate[0].slice(0, -1);
    MTdate[0] = MTdate[0] * 86400000;
}
else {
    var tempArr = MTdate;
    MTdate = [];
    MTdate[0] = 0;
    MTdate[1] = tempArr;
}
MTdate[1] = MTdate[1].split(":");
MTdate[1][0] = MTdate[1][0] * 3600000;
MTdate[1][1] = MTdate[1][1] * 60000;
MTdate[1][2] = MTdate[1][2] * 1000;
currentDate = currentDate + MTdate[0];
for (i = 0; i < MTdate[1].length; i++) {
    currentDate = currentDate + MTdate[1][i];
}
var newElement = document.createElement("span");
var dateTemp = new Date(currentDate);
newElement.innerHTML = "| " + dateTemp.toDateString().slice(0, -4) + " " + dateTemp.getHours() + ":" + dateTemp.getMinutes();
MTDateElement.parentNode.appendChild(newElement);