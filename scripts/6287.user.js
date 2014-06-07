// ==UserScript==
// @name	Game Button Clicker
// @version	0.01
// @author	Redux
// @namespace	
// @description	Button Auto-Clicker 
// @include	http://www.gatesofsurvival.com/frame.php

// ==/UserScript==


(function() {


	//Get all INPUT elements that say 'Add To Friends' on them
	friendbuttons = document.evaluate("//input[@value='Mine More Iron]", document, null,7, null); 

	//Grabs "Add to Friends"
	friendbutton = friendbuttons.snapshotItem(0);
	// Click Button
	friendbutton.click();

})();