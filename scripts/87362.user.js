// ==UserScript==
// @name           Facebook zynga poker boot V.3 ( view-card-all-player )
// @namespace      http://richardsleegers.blogspot.com
// @include        *.facebook.com/texas_holdem/*
// @include        https://register.facebook.com/*
// ==/UserScript==
(function() {

	justplaylinks = document.evaluate("//a[contains(@href,'play&')]", document, null,7, null); 
	justplaylink = justplaylinks.snapshotItem(0);
	if(justplaylink!=null){
		document.location=justplaylink;
	}


	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
		cancelbutton.click();
	}
})();
