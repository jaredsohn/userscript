// ==UserScript==
// @name           Poker boot V.2 ( view-card-all-player )
// @namespace      
// @include        *http://www2.poker88.asia/TXH-pk88/txh.php*
// @include        *http://www2.poker88.asia/pk88/home.php?action=login*  
// ==/UserScript==
(function() {

	//allowed under table 'Smallest 3000 / 10000'
	justplaylinks = document.evaluate("//a[contains(@href,'play&')]", document, null,7, null); 

	justplaylink = justplaylinks.snapshotItem(0);
	if(justplaylink!=null){
		//GM_log(justplaylink + " table found ");
		// go to new location
		document.location=justplaylink;
	}

	//allowed to play on table 'Smallest 3000 / 10000'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Smaller 7500 / 25000'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Small 15000 / 50000'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Medium 30000 / 250000'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}

	//allowed to play on table 'Large 75000 / 500000'
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

	//allowed to play on table 'VIP 150000 / 750000'
	cancelbuttons = document.evaluate("//input[@value='Cancel']", document, null,7, null); 

	//Grabs "Cancel"s
	cancelbutton = cancelbuttons.snapshotItem(0);
	if(cancelbutton!=null){
   	//GM_log(cancelbutton.name + " table found ");
		// Click Button
		cancelbutton.click();
	}
})();


location.replace("http://www2.poker88.asia/TXH-pk88/txh.php");