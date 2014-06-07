// ==UserScript==
// @name          Geen verwijzing achterlaten - Chrome
// @description	  Activeert automatisch het bolletje "Geen verwijzing achterlaten" bij het verplaatsen van een topic
// @author        Infinitum
// @version 	  1.0
// @match         http://forum.tribalwars.nl/postings.php?t=*
// ==/UserScript==

while (controle<1) {
     if (document.readystate == "complete") {
          controle = 1
          var labels = document.getElementsByTagName('label'); 
          for (var i = 0; i < labels.length; ++i) { 
               if (labels[i].textContent == "Geen verwijzing achterlaten") { 
               labels[i].click(); 
               }
          }
     }
}