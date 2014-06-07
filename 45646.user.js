// ==UserScript==
// @name Travian No Ads (Advertisements disabler)
// @author Nabu
// @namespace T3
// @version 0.1
// @description  Travian No-Ad (Advertisements Disabler)
// @include http://*.travian*.*/*.php*

// ==/UserScript==
var browserType;

if (document.layers) {browserType = "nn4"}
if (document.all) {browserType = "ie"}
if (window.navigator.userAgent.toLowerCase().match("gecko")) {
   browserType= "gecko"
}

  if (browserType == "gecko" )
     document.poppedLayer = 
         eval('document.getElementById("dynamic_header")');
  else if (browserType == "ie")
     document.poppedLayer = 
        eval('document.getElementById("dynamic_header")');
  else
     document.poppedLayer =   
        eval('document.layers["dynamic_header"]');
  document.poppedLayer.style.visibility = "hidden";
