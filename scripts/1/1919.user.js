// ==UserScript==
// @name	RapidShare Quick DL
// @version	0.9
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

		//this could mean we're at the 'wait' section, so lets check
		dlbox = document.getElementById("dl");
		if (dlbox) {
			//At waiting section
			rxp = /unescape\('([^']*)'\)/i;
			v = document.body.innerHTML.match(rxp);
			d = document.createElement('div');
			d.innerHTML = unescape(v[1]);
			dlbox.parentNode.insertBefore(d, dlbox);
			dlbox.parentNode.removeChild(dlbox);
		}
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
