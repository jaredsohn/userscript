// ==UserScript==
// @name           Facebook zynga poker boot V.3 ( view-card-all-player )
// @include        http://apps.facebook.com/texas_holdem/*
// @include        https://register.facebook.com/*
// ==/UserScript==
(function() {
	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//not allowed under table 'Hollywood 40K / 80K'
	justplaylinks = document.evaluate("//a[contains(@href,'play&')]", document, null,7, null); 

	justplaylink = justplaylinks.snapshotItem(0);
	if(justplaylink!=null){
		//GM_log(justplaylink + " table found ");
		// go to new location
		document.location=justplaylink;
	}

	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Ankara 1 / 2'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}
})();


location.replace("http://apps.facebook.com/texas_holdem/required2.php");