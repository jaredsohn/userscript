// ==UserScript==
// @name Onvista Auto Login
// @description Automatically sign in to Onvista accounts
// @include http://*.onvista.de*
// @version 0.1
// ==/UserScript==

var USERNAME = "YOUR USERNAME COMES HERE";
var PASSWORD = "YOUR PASSWORD COMES HERE";

// available are
// Depot 			--> var TARGET = /depot/";
// MyMarket 		--> var TARGET = "/mymarket/";
// Watchlist 		--> var TARGET = "/watchlist/watchlist.html";
// RealPush-Watchlist	--> var TARGET = "/watchlist/realpush.html";
// Watchlist MyMarket --> var TARGET = "/watchlist/mymarket.html";
// Vergleichs-Watchlist --> var TARGET = "/watchlist/vergleichs-watchlist.html";
// FreeTrades 		--> var TARGET = "/tools/freetrades/aktionen.html";
// Einstellungen 		--> var TARGET = "/einstellungen.html";

// replace TARGET with one above
var TARGET = "/watchlist/mymarket.html";

//add event listener to call my anonymous function after the page loads
window.addEventListener('load',
function() {
//Get email address box and fill it
document.getElementById("USERNAME").value = USERNAME;

//Get password box and fill it
document.getElementById("PASSWORD").value = PASSWORD;

//Get target box and choose one 
document.getElementById("TARGET").value = TARGET;

//And finally submit the form
document.getElementById("formular").submit();
}, true);