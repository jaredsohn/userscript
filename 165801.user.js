// ==UserScript==
// @name           DeleteUnnecessaryAds
// @description    Deletes Some Ads
// @version        1.0.0
// @include        *
// ==/UserScript==

var name = {"moving-boxesr"}

window.addEventListener('load', function() {
  
  for(i in name)
    document.getElementById(name[i]).parentNode.removeChild(document.getElementById(name[i]));

 }, false)

