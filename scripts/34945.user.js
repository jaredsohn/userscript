// ==UserScript==
// @name           Facebook Black Jack cancel-play-clicker
// @include        *.facebook.com/black_jack/*
// ==/UserScript==

(function() {

	//Get all A elements that say 'Just play' on them
	justplaylinks = document.evaluate("//a[contains(@href,'play&')]", document, null,7, null); 

	justplaylink = justplaylinks.snapshotItem(0);
	if(justplaylink!=null){
		//GM_log(justplaylink + " link found");
		// go to new location
		document.location=justplaylink;
	}

	//Get all INPUT elements that say 'Cancel' on them
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " button found");
		// Click Button
		cancelbutton.click();
	}
})();
