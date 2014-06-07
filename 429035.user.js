// ==UserScript==
// @name        auspol knights
// @namespace   http://userscripts.org/scripts/review/429035
// @description knights auspol on the something awful forums
// @include     http://forums.somethingawful.com/*threadid=3611893*
// @version     0.1.0
// @grant       none
// @copyright	sick
// ==/UserScript==

var posters = document.getElementsByClassName('author');

for (var i = 0; i < posters.length; i++) {
  var thisElem = posters[i];
  thisElem.textContent = "Sir " + thisElem.textContent;
}