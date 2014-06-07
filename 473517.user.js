// ==UserScript== 
// @name                Dota 2 Lounge Autobump
// @namespace           http://steamcommunity.com/profiles/76561198065785055/
// @version             1.1
// @description         Bumps trades on Dota 2 Lounge
// @include             http://dota2lounge.com/mytrades*
// @run-at              document-end 
// @copyright           2014+, Sir Campsalot
// ==/UserScript== 
  
(function() { 
	
	/*********** SETTINGS ***********/
	
	var Dota2LoungeBumpOnePerReload = false;      //bump only one trade per reload on Dota 2 Lounge?
	var Dota2LoungeWaitBetweenBump = false;       //wait a few seconds between each trade bump? doesn't work with Dota2LoungeBumpOnePerReload
	var Dota2LoungeTimeBetweenEachBump = 10;      //seconds between each bump when Dota2LoungeWaitBetweenBump is true
	
	var Dota2LoungeRandomReloadTimes = false;     //random page reload times on Dota 2 Lounge?
	var Dota2LoungeReloadIfNotRandom = 1;         //if not random page reload time, reload time for all trade bump on Dota 2 Lounge
	var Dota2LoungeMaxReloadTime = 5;             //max random reload time for all trade bump on Dota 2 Lounge
	var Dota2LoungeMinReloadTime = 1;             //minimum random reload time for all trade bump on Dota 2 Lounge
	
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
		if (sec<10) notify("Dota 2 Lounge AutoBump: Reloading page in "+min+":0"+sec); 
		else notify("Dota 2 Lounge AutoBump: Reloading page in "+min+":"+sec); 
	} 
	
	function bump_trades() {
		xpr = document.evaluate(".//div[@class='tradepoll']/div[@class='tradeheader']/a[@class='buttonright']", document, null, XPathResult.ANY_TYPE, null);
		anchor = xpr.iterateNext();
		if (anchor && anchor.getAttribute('onclick')) {
			anchor.click();
			if (!Dota2LoungeBumpOnePerReload) {
				if (Dota2LoungeWaitBetweenBump) setTimeout(bump_trades,(Dota2LoungeTimeBetweenEachBump*1000));
				else setTimeout(bump_trades,5);
			}
		}
      	reload_time = RELOAD_MINUTES*60;
	   	counter = setInterval(showstatus, 1000);  
	}
	
	var reload_time, counter, RELOAD_MINUTES;
	if (Dota2LoungeRandomReloadTimes) RELOAD_MINUTES = randominrange(Dota2LoungeMinReloadTime,Dota2LoungeMaxReloadTime);
	else RELOAD_MINUTES = Dota2LoungeReloadIfNotRandom;
	bump_trades(); 
}).call(this);