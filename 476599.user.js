// ==UserScript==
// @name        CollegeHumor Image Fixer
// @namespace   http://trgwii.net/
// @description Removes the stupid download.jpg from collegehumor images
// @include     /^https?://(www\.)?collegehumor.com/.*$/
// @version     1
// @grant       none
// ==/UserScript==

onload = function(){
  var elem = document.querySelectorAll('img[src="/images/download.jpg"]');
  for(i = 0; i < elem.length; i++)
    elem[i].parentElement.removeChild(elem[i]);
}
