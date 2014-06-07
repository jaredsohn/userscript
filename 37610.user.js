// ==UserScript==
// @name        NYTimes Floater
// @namespace   http://apartmentland.net/~doches/
// @description Removes the annoying login-pester-floater thing from the New York Times online
// @include http*://*.nytimes.com/*
// @include http*://nytimes.com/*
// ==/UserScript==

//var adBar = document.getElementsByTagName("div")[0]
var loginBar = document.getElementById("TP_container");
var shadow = document.getElementById("TP_container_shadow");
if(loginBar) {
  loginBar.parentNode.style.padding = "0px";
  loginBar.parentNode.removeChild(loginBar);
  shadow.parentNode.removeChild(shadow);
}
