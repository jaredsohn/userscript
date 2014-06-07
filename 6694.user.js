// ==UserScript==
// @name	Mining
// @version	0.01
// @author	Redux
// @namespace	
// @description	Myspace Friend's Button Auto-Clicker 
// @include	http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID=*

// ==/UserScript==


(function() {


	//Get all INPUT elements that say 'Add To Friends' on them
	friendbuttons = document.evaluate("//input[@value='Mine some more']", document, null,7, null); 

	//Grabs "Add to Friends"
	friendbutton = friendbuttons.snapshotItem(0);
	// Click Button
	friendbutton.click();

})();





