// ==UserScript==

// @name           Dogfighter Redux

// @namespace      Tartarus

// @include        http://artemis.pardus.at/main.php

// ==/UserScript==

var enabled = true;
document = unsafeWindow.document;
document.addEventListener('keydown', CheckKey, false);

var array = document.getElementsByTagName("td");
var targets = new Array()
for( i = 0; i < array.length; i++) {
	if (array[i].title == "View Profile" && array[i].getAttribute('onclick')!= null){	
		array[i].setAttribute('tag', array[i].getAttribute('onclick').split("id=")[1].split("'")[0])
		array[i].removeAttribute('onclick')			
		array[i].addEventListener('click', function(){
			window.location = "http://" + "artemis.pardus.at/ship2ship_combat.php?playerid=" + this.getAttribute('tag');		
		}, true)						
		
		array[i].title = "Attack!"		
		targets.push(array[i])
	}else {
		array[i].title = "";
	}
}

function CheckKey(ev){
	//if ((ev.which == 17) && (enabled)){
		window.location = "http://" + "artemis.pardus.at/ship2ship_combat.php?playerid=" + targets[0].getAttribute('tag');
		enabled = false;
	//}
}
		
