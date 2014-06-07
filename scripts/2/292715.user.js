// ==UserScript== 
// @name                TF2Outpost Autobump
// @namespace           http://steamcommunity.com/profiles/76561198065785055/
// @version             2.6
// @description         Bumps trades on TF2 Outpost
// @include             http://www.tf2outpost.com/trades 
// @include             http://www.tf2outpost.com/trade/* 
// @run-at              document-end 
// @copyright           2013+, Sir Campsalot
// ==/UserScript== 

(function() { 

	/*********** SETTINGS ***********/
		
	var OutpostBumpOnePerReload = false;         //bump only one trade per reload on Outpost?
	var OutpostWaitBetweenBump = false;          //wait a few seconds between each trade bump when bumping all? doesn't work with OutpostBumpOnePerReload
	var OutpostTimeBetweenEachBump = 10;         //seconds between each bump when OutpostWaitBetweenBump is true
	
	var OutpostRandomReloadTimes = true;         //random page reload times on Outpost?
	var OutpostReloadIfNotRandom = 1;            //if not random page reload time, reload time for all trade bump on Outpost
	var OutpostMaxReloadTime = 5;                //max random reload time for all trade bump on Outpost
	var OutpostMinReloadTime = 1;                //minimum random reload time for all trade bump on Outpost
	var OutpostSingleReloadIfNotRandom = 5;      //if not random page reload time, reload time for single trade bump on Outpost
	var OutpostSingleMaxReloadTime = 10;         //max random reload time for single trade bump on Outpost
	var OutpostSingleMinReloadTime = 5;          //minimum random reload time for single trade bump on Outpost
	
	/******** END OF SETTINGS *******/
	
	function randominrange(low,high) {return Math.round(Math.random()*(high-low)+low);}
	
	function ParseUrl() {
		var parser = document.createElement('a'); 
		parser.href = undefined;
		return parser; 
	}
	
	function notify(notify) { 
		var divid = "stab"; //lol the acronym for steam trade autobump is stab
		var div = document.getElementById(divid); 
		if (!div) { 
			var trades;
			if (ParseUrl()=="http://www.tf2outpost.com/undefined") trades = document.getElementById("trades");
			if (ParseUrl()=="http://www.tf2outpost.com/trade/undefined") trades = document.getElementById("trade"); 
			var div = document.createElement("div"); 
			div.id = divid; 
			trades.insertBefore(div, trades.childNodes[0]); 
		} 
		div.innerHTML = notify; 
	} 
	
	function showstatus() { 
		reload_time--; 
		if (reload_time <= 0) { 
			clearInterval(counter); 
			location.reload(); 
			return; 
		} 
		var hr = Math.floor(reload_time/3600);
		var min = Math.floor(reload_time/60)-hr*60;
		var sec = reload_time-((hr*3600)+(min*60));
		if (sec<10) notify("TF2 Outpost AutoBump: Reloading page in "+min+":0"+sec); 
		else notify("TF2 Outpost AutoBump: Reloading page in "+min+":"+sec); 
	} 
	
	function bump_trades() {
		var xpr, anchor;
		xpr = document.evaluate(".//li/a[@class='trade_bump']/div[@class='icon_bump']", document, null, XPathResult.ANY_TYPE, null);
		while (anchor = xpr.iterateNext()) {
			anchor = anchor.parentNode;
			if (anchor.getAttribute('data-tradeid')) break;
		}
		if (anchor && anchor.getAttribute('data-tradeid')) {
			anchor.click();
			if (!OutpostBumpOnePerReload) {
				if (OutpostWaitBetweenBump) setTimeout(bump_trades,(OutpostTimeBetweenEachBump*1000));
				else setTimeout(bump_trades,5);
			}
		}
	   	reload_time = RELOAD_MINUTES*60;
	   	counter = setInterval(showstatus, 1000);  
	} 
	
	var reload_time, counter, RELOAD_MINUTES;
	if (ParseUrl()=="http://www.tf2outpost.com/undefined") {
		if (OutpostRandomReloadTimes) RELOAD_MINUTES = randominrange(OutpostMinReloadTime,OutpostMaxReloadTime);
		else RELOAD_MINUTES = OutpostReloadIfNotRandom;
	}
	if (ParseUrl()=="http://www.tf2outpost.com/trade/undefined") {
		if (OutpostRandomReloadTimes) RELOAD_MINUTES = randominrange(OutpostSingleMinReloadTime,OutpostSingleMaxReloadTime);
		else RELOAD_MINUTES = OutpostSingleReloadIfNotRandom;
	}
	bump_trades();
}).call(this);