// ==UserScript==
// @name          Boing Boing Today's Date
// @description   Appends URL with today's date, so you can browse unshortened articles
// @include       http://www.boingboing.net/
// ==/UserScript==


var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();

if (day < 10) {day = "0" + day};
if (month < 10) {month = "0" + month};

window.location.href += year + "/" + month + "/" + day + "/";