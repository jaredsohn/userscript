// ==UserScript==
// @name           DOMreader
// @namespace      turoman.com
// @description	Reads DOM elements' inner HTML for debug purposes.
// @include        http://*.monoprix.*
// @include        https://*.monoprix.*
// @version		2.0
// ==/UserScript==

//Developer: Turo
//Updated Mar 2, 2012

window.addEventListener("load", function(event) {

var aa_String = "google-analytics";
var aa_Scripts = document.getElementsByTagName('script');

for (i=0; i<aa_Scripts.length; i++) {
   if (aa_Scripts[i].innerHTML.indexOf(aa_String) != -1) {
      var aa_Frame= "\r\n################## script #" + i + " ####################\r\n";
      console.log(aa_Frame + aa_Scripts[i + 2].innerHTML + aa_Frame);
      break;
   }
}}, false);