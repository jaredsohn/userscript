// ==UserScript==
// @name           Galacticos Football
// @namespace      GalacticosFootball
// @description    
// @include        http://apps.facebook.com/galacticosfootball/simulation/prematchtraining*
// @exclude        
// ==/UserScript==


var playmatch = document.getElementsByName("Play Match")[0];

setTimeout(function() {

playmatch.click();
window.location.reload();  

}, 10000);