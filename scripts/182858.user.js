// ==UserScript==
// @name        PearlyWhites
// @namespace   http://www.verhey.net/
// @description Show pictures on OkCupid even though you have no pictures of yourself ("First, show us your pearly whites - You must have at least one photo to view everyone else's photos.")
// @include     http://www.okcupid.com/*
// @version     0.1
// @grant       none
// ==/UserScript==

  var div0 = document.getElementById("photo_blocker");
  if (div0) {
    div0.style.display = "none";
  }

  var div1 = document.getElementById("photo_blocker_windowshade");
  if (div1) {
    div1.style.display = "none";
  }
  
