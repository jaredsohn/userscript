// ==UserScript==
// @name           Skip GameTrailers Age Check
// @namespace      http://www.shaungrady.com
// @author         Shaun Grady
// @description    Lightweight script to skip the age check
// @include        http://www.gametrailers.com/*
// @include        http://gametrailers.com/
// ==/UserScript==

(function(){
  var ageCheckYear = document.getElementById('ageCheckYear');
  if (!!ageCheckYear){
    ageCheckYear.selectedIndex = 50;
    ageCheckYear.parentNode.getElementsByTagName('input')[0].click();
  }
})();