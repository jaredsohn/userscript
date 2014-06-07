// ==UserScript==
// @name           GMail Ad Remover
// @description    Removes ads, webclips, and "related pages" from GMail
// @version        1.2
// @author         Ryan Hughes
// @namespace      rjhughes@umich.edu:gmailadremover
// @include        http://mail.google.*/mail/*
// @include        https://mail.google.*/mail/*
// ==/UserScript==

function destroyAds(){
  var webclips = document.getElementById('fb');
  if (webclips) {
    webclips.parentNode.removeChild(webclips);
  } // if there's a webclip to destroy

  var sponsored = document.getElementById('ra');
  if (sponsored) {
    sponsored.parentNode.removeChild(sponsored);
  } // if there's sponsored things to destroy

  var related = document.getElementById('rp');
  if (related) {
    related.parentNode.removeChild(related);
  } // if there's "related pages"
} // function destroyWebClip

(function () {
  window.setInterval(destroyAds, 500);
}());



