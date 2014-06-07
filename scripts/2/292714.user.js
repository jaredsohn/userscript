// ==UserScript== 
// @name                Dispenser.tf Autobump
// @namespace           http://steamcommunity.com/profiles/76561198065785055/
// @version             1.8
// @description         Bumps shop on Dispenser.tf
// @include             http://dispenser.tf/*
// @exclude             http://dispenser.tf/
// @exclude             http://dispenser.tf/view_*
// @exclude             http://dispenser.tf/edit*
// @exclude             http://dispenser.tf/credit/
// @exclude             http://dispenser.tf/?*
// @exclude             http://dispenser.tf/trade/*
// @exclude             http://dispenser.tf/search/
// @exclude             http://dispenser.tf/s/*
// @exclude             http://dispenser.tf/forum/*
// @exclude             http://dispenser.tf/donation/
// @exclude             http://dispenser.tf/item_*
// @exclude             http://dispenser.tf/create_*
// @run-at	            document-end 
// @copyright           2014+, Sir Campsalot
// ==/UserScript== 
  
(function() { 

	/*********** SETTINGS ***********/
	
	var DispenserRandomBumpTimes = false;        //random page reload times on Dispenser.tf?
	var DispenserBumpIfNotRandom = 65;           //if not random bump time, shop bump time
	var DispenserMaxBumpTime = 70;               //max random bump time on Dispenser.tf
	var DispenserMinBumpTime = 65;               //minimum random bump time on Dispenser.tf
	
	/******** END OF SETTINGS *******/
	
	function randominrange(low,high) {return Math.round(Math.random()*(high-low)+low);}
	
	function notify(notify) { 
		var divid = "stab"; //lol the acronym for steam trade autobump is stab
		var div = document.getElementById(divid); 
		if (!div) { 
			var trades;
			trades = document.getElementById("shop_info");
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
			RELOAD_MINUTES = 60;
			bump_trades();
		} 
		var hr = Math.floor(reload_time/3600);
		var min = Math.floor(reload_time/60)-hr*60;
		var sec = reload_time-((hr*3600)+(min*60));
		if (sec<10) {
			if (min<10) notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":0"+min+":0"+sec); 
			else notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":"+min+":0"+sec); 
		}
		else {
			if (min<10) notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":0"+min+":"+sec); 
			else notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":"+min+":"+sec); 
		}
	} 
	
	function bump_trades() {
		var xpr, anchor;
		if (ParseUrl()=="http://dispenser.tf/id/undefined" || ParseUrl()=="http://dispenser.tf/undefined") {
			xpr = document.evaluate(".//p/a[@class='actionbutton']/i[@class='fa fa-arrow-circle-up']", document, null, XPathResult.ANY_TYPE, null);
			anchor = xpr.iterateNext();
			anchor = anchor.parentNode;
			anchor.click();
		}
	   	reload_time = RELOAD_MINUTES*60;
	   	counter = setInterval(showstatus, 1000);  
	} 
	
	var reload_time, counter, RELOAD_MINUTES;
	if (ParseUrl()=="http://dispenser.tf/id/undefined" || ParseUrl()=="http://dispenser.tf/undefined") {
		if (DispenserRandomBumpTimes) RELOAD_MINUTES = randominrange(DispenserMinBumpTime,DispenserMaxBumpTime);
		else RELOAD_MINUTES = DispenserBumpIfNotRandom;
	}
	bump_trades();
}).call(this);