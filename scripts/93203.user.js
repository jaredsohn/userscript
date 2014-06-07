// ==UserScript==
// @name           STP Universe Chooser
// @namespace      stp
// @description    Wählt euch das bevorzugte Universum auf der Startseite aus
// @include        http://strivetopower.de/
// @include        http://strivetopower.de/?hint=*
// @author		   EikeB
// @version        0.5
// ==/UserScript==

(function() {
	// set preferred universe
	//		- CHANGE HERE to preselect your favorite universe
	var preferredUniverse = "universe1";
	
	
	// get universe drop down
    var world = document.getElementById("world");
    
    if (world) {
    	var options = world.options;

    	for (var i = 0; i < options.length; i++) {
    		if (preferredUniverse == options[i].value) {
    			world.selectedIndex = i;
    			break;
    		}
    	}
    }
})();