// ==UserScript==
// @name           Caribic Islands Spamkill
// @namespace      Caribic Islands Spamkill
// @include        http://s*.caribicislands.org/s4/index.php?sid=*
// ==/UserScript==

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~ Entfernen der Werbung ~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

document.getElementsByTagName('div')[1].innerHTML = '';                                                                                                                   // Werbebalken oben entfernen
document.getElementsByTagName('table')[0].getElementsByTagName('td')[document.getElementsByTagName('table')[0].getElementsByTagName('td').length-1].innerHTML = '&nbsp;'; // Werbung am Rechten Rand entfernen   

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~ ENDE ~~~~~ Entfernen der Werbung ~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
