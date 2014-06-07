// ==UserScript==
// @name          Geen verwijzing achterlaten
// @description	  Activeert automatisch het bolletje "Geen verwijzing achterlaten" bij het verplaatsen van een topic
// @author        Infinitum
// @version 	  1.0
// @include       http://forum.tribalwars.nl/postings.php?t=*
// ==/UserScript==

var labels = document.getElementsByTagName('label'); 
for (var i = 0; i < labels.length; ++i) { 
    if (labels[i].textContent == "Geen verwijzing achterlaten") { 
        labels[i].click(); 
    }
}