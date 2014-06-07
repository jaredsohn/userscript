// ==UserScript==
// @name          Tiervermittlung Disable AdBlock detection
// @namespace     de.ghaering.tiervermittlung.adblock 
// @description   Disable AdBlock detection on tiervermittlung.de 
// @match         *://*.tiervermittlung.de/*
// @version       0.2
// @grant         none
// @run-at        document-start
//
// ==/UserScript==

console.info("userscript running to remove ads");

   // observe any script execution
   var i = 0;
   document.addEventListener("beforescriptexecute", function( event ){
      var $script = event.target;
      if ($script.src) {
	console.debug("script loaded: " + $script.src);
      } else {
      var text = $script.textContent;
	if (text.contains("Lieber Tierfreund") || text.contains("Deaktivieren Sie bitte"))  {
		console.debug("blocked alert"); event.preventDefault();
 }
      }
      
   });
