// ==UserScript==
// @name Pardus Dogfighter
// @namespace pardus.at
// @description - Allows you to engage in combat by clicking on the ship graphic.
// @include http://*.pardus.at/main.php
// ==/UserScript==

//Created by Dusk (Artemis) or Optimist Tramplink (Orion). Enjoy!

document = unsafeWindow.document;
var universe = window.location.href.split("//")[1].split(".")[0];





var array = document.getElementsByTagName("td");

for( i = 0; i < array.length; i++) {
	if (array[i].title == "View Profile" && array[i].getAttribute('onclick')!= null){	
		array[i].setAttribute('tag', array[i].getAttribute('onclick').split("id=")[1].split("'")[0])
		//var id = array[i].getAttribute('onclick').split("id=")[1].split("'")[0]
		//var at = array[i].getAttribute('onclick');
		array[i].removeAttribute('onclick')			
		array[i].addEventListener('click', function(){
			window.location = "http://" + universe + ".pardus.at/ship2ship_combat.php?playerid=" + this.getAttribute('tag');		
		}, true)
						
		
		array[i].title = "Attack!";
		
	
	}else {

		array[i].title = "";
	}
}
