// ==UserScript==
// @name           Facebook zynga poker boot V.3 ( view-card-all-player )
// @namespace      http://richardsleegers.blogspot.com
// @include        *.facebook.com/texas_holdem/*
// @include        https://register.facebook.com/*
// ==/UserScript==
(function() {

	//not allowed under table 'Antalya 2K / 4K'
	justplaylinks = document.evaluate("//a[contains(@href,'play&')]", document, null,7, null); 

	justplaylink = justplaylinks.snapshotItem(0);
	if(justplaylink!=null){
		//GM_log(justplaylink + " table found ");
		// go to new location
		document.location=justplaylink;
	}

	//allowed to play on table 'Antalya 2k / 4k
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}<font face="Arial" size ="5" color="#000000">



	//allowed to play on table 'Antalya 5K /10K'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Pros Only 500K / 1M'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'High Rollers 1M / 2M'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Whales 5M / 10 M'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Mega Whales 10M / 20M'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Super Whales 20M / 40M'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}
})();


location.replace("http://apps.facebook.com/ztexas_holdem/required2.php");