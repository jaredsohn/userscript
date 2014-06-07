// ==UserScript==
// @name        Trader Attack Disabler
// @namespace   pardus.at
// @description Disables the attack buttons on the building screen.
// @author      Wes R (Artemis)
// @exclude     http://artemis.pardus.at/building.php
// @exclude     http://orion.pardus.at/building.php
// @exclude     http://pegasus.pardus.at/building.php
// @version     1
// ==/UserScript==

//If you want this to work in a universe other than Artemis, simply change the @exclude to @include in the header.

     var buttons = document.getElementsByTagName("input");

     if(buttons != null){
          var max = buttons.length;
          var x = 0;

          while(x < max){

	if(buttons[x].value == "Damage this building"){
	     buttons[x].disabled = true;
	}

	if(buttons[x].value == "Raid this building"){
	     buttons[x].disabled = true;
	}

	x += 1;
          }
     }