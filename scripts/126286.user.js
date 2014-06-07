// ==UserScript==
// @name           Improve_Shipyard_page
// @namespace      by guardian
// @description    Impoves the shipyard page
// @include        *.war-facts.com/build_ship.php
// ==/UserScript==



window.addEventListener("load", function(e) {
  max5();
}, false);

function max5() {
setTimeout(function() 

	{var maxbuild = unsafeWindow.bsld ;

	maxbuild.setMaximum(50000);},500);



}