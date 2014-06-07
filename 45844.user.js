// ==UserScript== 
// @name Blogger Content Warning Autoskip
// @namespace http://www.kuribo.info/ 
// @include https://www.blogger.com/blogin.g?blogspotURL=* 
// ==/UserScript== 

(function () {
  var link = document.getElementById("continueButton");
  if (link) {
    location.href = link.href;
  }
})();