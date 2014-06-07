// ==UserScript==
// @name HattrickNoAds
// @namespace HattrickNoAds
// @description Script removes ads from site.
// @include http://www*.hattrick.org/*
// ==/UserScript==

allDivisions = document.getElementsByTagName("div");

//Function removes all ads from site
function f_remove_ads() {
  //We walk trough all divs
  for (i=0; i < allDivisions.length; i++) {
    //and we hide the ones that are displaying ads
    if (allDivisions[i].className.match("ad_top") || allDivisions[i].className.match("ad_skyscraper") || allDivisions[i].className.match("ad_bottom")) {
      allDivisions[i].style.display = "none";
    }
  }
}

//initialization
function f_init() {
  f_remove_ads();
}

f_init();