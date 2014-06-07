// ==UserScript==

// @name           Facebook Poke Alert

// @namespace      fbpa

// @description    Puts a big fat notice at the top of your page if someone's poked you. 

// @include     http*://facebook.com/home.php* 
// @include     http*://*.facebook.com/home.php* 
// @include     http*://*.facebook.com/ 
// @include     http*://*.facebook.com/?* 
// @include     http*://*.facebook.com/#* 

// ==/UserScript==
//includes now copied from someone else, if it doesn't work i'm assassinating mark zuckerberg
if(document.getElementById("pagelet_pokes") != null){
var header = document.getElementById("pagelet_stream_header");
var ratbastard = document.createElement("div");
ratbastard.style.backgroundColor="#000000";
header.parentNode.insertBefore(ratbastard, header);
header.parentNode.insertBefore(ratbastard, header);
ratbastard.style.textAlign="center";
header.parentNode.insertBefore(ratbastard, header);
var text = document.createElement("h1");
text.textContent = "THAT RAT BASTARD POKED YOU AGAIN. LET LOOSE THE DOGS OF WAR. BURN HIS CITY TO THE GROUND. AND WHEN YOU'RE DONE, POKE HIM.";
text.style.color="#ffffff";
ratbastard.appendChild(text);}