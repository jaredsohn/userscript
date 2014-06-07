// ==UserScript==
// @name           Remove Google Background
// @namespace      ayr.userscript
// @description    Removes the google background
// @include        http://*google.co.uk/*

// ==/UserScript==
(function(){

function removeElement(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
removeElement( 'fpdi' );

})();