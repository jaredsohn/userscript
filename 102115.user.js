// ==UserScript==
// @name          Facebook - Fixed NavBar

Top Nav Bar & More Prettiness
// @namespace     

http://userstyles.org
// @description	  This is a 

tweak that fixes basic usage problems and adds a 

little prettiness to the new Facebook layout 

introduced in Feb 2010.
// @author        whcodered
// 

@homepage      http://userstyles.org/styles/25094
// 

@include       http://facebook.com/*
// @include      

 https://facebook.com/*
// @include       

http://*.facebook.com/*
// @include       

https://*.facebook.com/*
// ==/UserScript==
(function

() {
var css = "#globalContainer #pageHead, 

.loggedout_menubar  {\n  width: 981px !important;\n  

left: 50%;\n  margin-left: -490.5px !important;\n  

z-index: 15 !important;\n}\n#pageHead {\n  position: 

fixed !important;\n  width: 981px !important;\n  

margin: 0 auto !important;\n  top: 0px;\n  z-index: 

15 !important;\n}\n#blueBar {\n  position: fixed !