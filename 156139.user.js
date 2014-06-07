// ==UserScript==
// @name Email Withheld for join.me
// @author Tommy Smith
// @version 1.2
// @description Hides your email on Gmail, Google Docs, or Google Sites whilst in a join.me room.
// @include http*://*.google.com
// @include http*://*.google.com/*
// @include http*://*.gmail.com
// @include http*://*.gmail.com/*
// @include http*://*.google.ca
// @include http*://*.google.ca/*
// @include http*://google.com
// @include http*://google.com/*
// @include http*://gmail.com
// @include http*://gmail.com/*
// @include http*://google.ca
// @include http*://google.ca/*
// ==/UserScript==
// USER! If you are seeing this, it means you haven't installed Tampermonkey for Google Chrome or Greasemonkey for Firefox, a browser addon that makes this script work. Go get it!
if (!document.getElementsByClassName("msg")[0]) {
if (!document.getElementById("gbi4t")) {
} else {
document.getElementById("gbi4t").innerHTML = "Email Withheld for join.me";
}
for(i=0;i<document.getElementsByClassName("gbps2").length;i++) { document.getElementsByClassName("gbps2")[i].innerHTML = "Email Withheld for join.me"; }
} else {
document.getElementsByClassName("msg")[0].innerHTML = "Loading Email@Withheld@for@join.me&hellip;";
var timerID = window.setInterval(function () {
if (!document.getElementById("gbi4t")) {
} else {
document.getElementById("gbi4t").innerHTML = "Email Withheld for join.me";
}
for(i=0;i<document.getElementsByClassName("gbps2").length;i++) { document.getElementsByClassName("gbps2")[i].innerHTML = "Email Withheld for join.me"; if (i == document.getElementsByClassName("gbps2").length-1) { timerID = clearInterval(timerID); } }
}, 250);
}