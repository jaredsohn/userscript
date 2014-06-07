// ==UserScript== 
// @name                CSGO Lounge Autobump
// @namespace           http://steamcommunity.com/profiles/76561198065785055/
// @version             1.6
// @description         Bumps trades on CSGO Lounge
// @include             http://csgolounge.com/mytrades*
// @run-at              document-end 
// @copyright           2014+, Sir Campsalot
// ==/UserScript== 
  
(function() { 
	
	/*********** SETTINGS ***********/
	
	var CSGOLoungeBumpOnePerReload = false;      //bump only one trade per reload on CSGO Lounge?
	var CSGOLoungeWaitBetweenBump = false;       //wait a few seconds between each trade bump? doesn't work with CSGOLoungeBumpOnePerReload
	var CSGOLoungeTimeBetweenEachBump = 10;      //seconds between each bump when CSGOLoungeWaitBetweenBump is true
	
	var CSGOLoungeRandomReloadTimes = false;     //random page reload times on CSGOLounge?
	var CSGOLoungeReloadIfNotRandom = 1;         //if not random page reload time, reload time for all trade bump on CSGO Lounge
	var CSGOLoungeMaxReloadTime = 5;             //max random reload time for all trade bump on CSGO Lounge
	var CSGOLoungeMinReloadTime = 1;             //minimum random reload time for all trade bump on CSGO Lounge
	
	/******** END OF SETTINGS *******/
	
	function randominrange(low,high) {return Math.round(Math.random()*(high-low)+low);}
	
	function notify(notify) { 
		var divid = "stab"; //lol the acronym for steam trade autobump is stab
		var div = document.getElementById(divid); 
		if (!div) { 
			var trades = document.getElementById("main"); 
			var div = document.createElement("div"); 
			div.id = divid; 
			trades.insertBefore(div, trades.childNodes[0]); 
		} 
		div.innerHTML = notify; 
	} 
	  
	function showstatus() { 
		reload_time -= 1; 
		if (reload_time <= 0) { 
			clearInterval(counter); 
			location.reload(); 
			return; 
		} 
		var min = Math.floor(reload_time/60); 
		var sec = reload_time - min*60; 
		if (sec<10) notify("CSGO Lounge AutoBump: Reloading page in "+min+":0"+sec); 
		else notify("CSGO Lounge AutoBump: Reloading page in "+min+":"+sec); 
	} 
	
	function bump_trades() {
		xpr = document.evaluate(".//div[@class='tradepoll']/div[@class='tradeheader']/a[@class='buttonright']", document, null, XPathResult.ANY_TYPE, null);
		anchor = xpr.iterateNext();
		if (anchor && anchor.getAttribute('onclick')) {
			anchor.click();
			if (!CSGOLoungeBumpOnePerReload) {
				if (CSGOLoungeWaitBetweenBump) setTimeout(bump_trades,(CSGOLoungeTimeBetweenEachBump*1000));
				else setTimeout(bump_trades,5);
			}
		}
      	reload_time = RELOAD_MINUTES*60;
	   	counter = setInterval(showstatus, 1000);  
	}
	
	var reload_time, counter, RELOAD_MINUTES;
	if (CSGOLoungeRandomReloadTimes) RELOAD_MINUTES = randominrange(CSGOLoungeMinReloadTime,CSGOLoungeMaxReloadTime);
	else RELOAD_MINUTES = CSGOLoungeReloadIfNotRandom;
	bump_trades(); 
}).call(this);