// ==UserScript==
// @name	RapidShare Quick DL
// @version	0.8
// @author	CBWhiz
// @namespace	http://cbwhiz.blamethepixel.com/greasemonkey
// @description	RapidShare Quick DL
// @include	http://*rapidshare.de*

// ==/UserScript==


(function() {
	//GM_log("Rapidshare Quick DL Loaded");

	//First, get all INPUT elements that say 'Free' on them
	freebuttons = document.evaluate("//input[@value='Free']", document, null,7, null); 
	
	//Next, check how many we have
	if(freebuttons.snapshotLength != 1) {
		//GM_log("Wrong Count of 'Free' buttons: " + freebuttons.snapshotLength);
		//and return false if we don't have just one

		//this could mean we're at the 'wait' section, so fuck with 'c'
		var c = -1;
		setInterval("c = -1;", 100);
		return false;
	}
	
	//Need to click "Free", so lets grab it
	freebutton = freebuttons.snapshotItem(0);
	if (freebutton.wrappedJSObject) {
		freebutton = freebutton.wrappedJSObject; //Check for XPCNativeWrapper, and unwrap if req.
	}
	//GM_log("freebutton is a " + freebutton);

	freebutton.click();

})();