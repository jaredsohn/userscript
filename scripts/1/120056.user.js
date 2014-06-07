// ==UserScript==
// @name       Youtube remove ads
// @version    0.1
// @description  remove ads
// @include    http://www.youtube.com/*
// @copyright  2011+, lolo888
// ==/UserScript==

function removeElement(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
removeElement('watch-channel-brand-div');