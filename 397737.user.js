// ==UserScript== 
// @name                Steam Trade Autobump
// @namespace           http://steamcommunity.com/profiles/76561198065785055/
// @version             4.22
// @description         Bumps trades on a bunch of trading sites
// @include             http://www.tf2outpost.com/trade*
// @include             http://bazaar.tf/trade*
// @include             http://bazaar.tf/my*
// @include             http://dispenser.tf/*
// @include             http://csgolounge.com/mytrades*
// @include             http://dota2lounge.com/mytrades*
// @include             http://tf2tp.com/myTrades.php*
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
// @run-at              document-end 
// @copyright           2013+, Sir Campsalot
// ==/UserScript== 
  
(function() { 

//for some reason, TF2 Trading Post bumping only works on chrome
//this is why I don't actually say on userscripts that the script bumps on tf2tp
//if you use chrome and want to bump trades on tf2tp, go ahead
//sorry to other browser users

	/*********** SETTINGS ***********/
	
	var OutpostBumpOnePerReload = false;         //bump only one trade per reload on Outpost?
	var OutpostWaitBetweenBump = false;          //wait a few seconds between each trade bump when bumping all? doesn't work with OutpostBumpOnePerReload
	var OutpostTimeBetweenEachBump = 10;         //seconds between each bump when OutpostWaitBetweenBump is true
	
	var CSGOLoungeBumpOnePerReload = false;      //bump only one trade per reload on CSGO Lounge?
	var CSGOLoungeWaitBetweenBump = false;       //wait a few seconds between each trade bump? doesn't work with CSGOLoungeBumpOnePerReload
	var CSGOLoungeTimeBetweenEachBump = 10;      //seconds between each bump when CSGOLoungeWaitBetweenBump is true
	
	var Dota2LoungeBumpOnePerReload = false;     //bump only one trade per reload on Dota2Lounge?
	var Dota2LoungeWaitBetweenBump = false;      //wait a few seconds between each trade bump? doesn't work with Dota2LoungeBumpOnePerReload
	var Dota2LoungeTimeBetweenEachBump = 10;     //seconds between each bump when Dota2LoungeWaitBetweenBump is true
	
	var TradingPostBumpRandomTrade = false;      //choose a random trade to bump on TF2TP?
	var TradingPostTradeToBump = 1;              //pick what trade number from "My Trades"; doesn't work with TradingPostBumpRandomTrade
	
	var OutpostRandomReloadTimes = true;         //random page reload times on Outpost?
	var BazaarRandomReloadTimes = false;         //random page reload times on Bazaar.tf?
	var DispenserRandomBumpTimes = false;        //random page reload times on Dispenser.tf?
	var CSGOLoungeRandomReloadTimes = false;     //random page reload times on CSGOLounge?
	var Dota2LoungeRandomReloadTimes = false;    //random page reload times on Dota2Lounge?
	var TradingPostRandomReloadTimes = false;    //random page reload times on Trading Post?
	
	var OutpostReloadIfNotRandom = 1;            //if not random page reload time, reload time for all trade bump on Outpost
	var OutpostMaxReloadTime = 5;                //max random reload time for all trade bump on Outpost
	var OutpostMinReloadTime = 1;                //minimum random reload time for all trade bump on Outpost
	var OutpostSingleReloadIfNotRandom = 5;      //if not random page reload time, reload time for single trade bump on Outpost
	var OutpostSingleMaxReloadTime = 10;         //max random reload time for single trade bump on Outpost
	var OutpostSingleMinReloadTime = 5;          //minimum random reload time for single trade bump on Outpost
	
	var BazaarReloadIfNotRandom = 1;             //if not random page reload time, reload time for all trade bump on Bazaar
	var BazaarMaxReloadTime = 5;                 //max random reload time for all trade bump on Bazaar
	var BazaarMinReloadTIme = 1;                 //minimum random reload time for all trade bump on Bazaar
	
	var DispenserBumpIfNotRandom = 65;           //if not random bump time, shop bump time
	var DispenserMaxBumpTime = 70;               //max random bump time on Dispenser.tf
	var DispenserMinBumpTime = 65;               //minimum random bump time on Dispenser.tf
	
	var CSGOLoungeReloadIfNotRandom = 1;         //if not random page reload time, reload time for all trade bump on CSGO Lounge
	var CSGOLoungeMaxReloadTime = 5;             //max random reload time for all trade bump on CSGO Lounge
	var CSGOLoungeMinReloadTIme = 1;             //minimum random reload time for all trade bump on CSGO Lounge
	
	var Dota2LoungeReloadIfNotRandom = 1;        //if not random page reload time, reload time for all trade bump on Dota 2 Lounge
	var Dota2LoungeMaxReloadTime = 5;            //max random reload time for all trade bump on Dota 2 Lounge
	var Dota2LoungeMinReloadTIme = 1;            //minimum random reload time for all trade bump on Dota 2 Lounge
	
	var TradingPostReloadIfNotRandom = 1;       //if not random page reload time, reload time for trade bump on Trading Post
	var TradingPostMaxReloadTime = 5;           //max random reload time for trade bump on Trading Post
	var TradingPostMinReloadTIme = 1;           //minimum random reload time for trade bump on Trading Post
	
	/******** END OF SETTINGS *******/
	
	function randominrange(low,high) {return Math.round(Math.random()*(high-low)+low);}
	
	function ParseUrl() {
		var parser = document.createElement('a'); 
		parser.href = undefined;
		return parser; 
	}
	
	function tptradecount() {
		var total = 0;
		var xpr = document.evaluate(".//tr/td/div[@class='trade']",document,null,XPathResult.ANY_TYPE,null);
		var anchor;
		while (anchor = xpr.iterateNext()) {
			if (anchor && anchor.getAttribute('id')) total++;
			else break;
		}
		return total;
	}
	
	function notify(notify) { 
		var divid = "stab"; //lol the acronym for steam trade autobump is stab
		var div = document.getElementById(divid); 
		if (!div) { 
			var trades;
			if (ParseUrl()=="http://www.tf2outpost.com/undefined" || ParseUrl()=="http://bazaar.tf/undefined") trades = document.getElementById("trades");
			if (ParseUrl()=="http://www.tf2outpost.com/trade/undefined") trades = document.getElementById("trade"); 
			if (ParseUrl()=="http://dispenser.tf/id/undefined" || ParseUrl()=="http://dispenser.tf/undefined") trades = document.getElementById("shop_info");
			if (ParseUrl()=="http://csgolounge.com/undefined" || ParseUrl()=="http://dota2lounge.com/undefined") trades = document.getElementById("main");
			if (ParseUrl()=="http://tf2tp.com/undefined") trades = document.getElementById("content");
			var div = document.createElement("div"); 
			div.id = divid; 
			trades.insertBefore(div, trades.childNodes[0]); 
		} 
		div.innerHTML = notify; 
	} 
	
	function showstatus() { 
		reload_time--; 
		if (tpdelay > 0) {
			tpdelay--;
			if (tpdelay==0 && ParseUrl()=="http://tf2tp.com/undefined") acceptallalerts(false);
		}
		if (reload_time <= 0) { 
			clearInterval(counter); 
			if (ParseUrl()=="http://dispenser.tf/undefined" || ParseUrl()=="http://dispenser.tf/id/undefined") {
				RELOAD_MINUTES = 60;
				bump_trades();
			}
			else location.reload(); 
			return; 
		} 
		var hr = Math.floor(reload_time/3600);
		var min = Math.floor(reload_time/60)-hr*60;
		var sec = reload_time-((hr*3600)+(min*60));
		if (ParseUrl()=="http://www.tf2outpost.com/undefined" || ParseUrl()=="http://www.tf2outpost.com/trade/undefined") { 
			if (sec<10) notify("TF2 Outpost AutoBump: Reloading page in "+min+":0"+sec); 
			else notify("TF2 Outpost AutoBump: Reloading page in "+min+":"+sec); 
		}
		if (ParseUrl()=="http://bazaar.tf/undefined") {
			if (sec<10) notify("Bazaar.tf AutoBump: Reloading page in "+min+":0"+sec); 
			else notify("Bazaar.tf AutoBump: Reloading page in "+min+":"+sec); 
		}
		if (ParseUrl=="http://dispenser.tf/undefined" || ParseUrl()=="http://dispenser.tf/id/undefined") {
			if (sec<10) {
				if (min<10) notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":0"+min+":0"+sec); 
				else notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":"+min+":0"+sec); 
			}
			else {
				if (min<10) notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":0"+min+":"+sec); 
				else notify("Dispenser.tf AutoBump: Bumping shop in "+hr+":"+min+":"+sec); 
			}
		}
		if (ParseUrl()=="http://csgolounge.com/undefined") {
			if (sec<10) notify("CSGO Lounge AutoBump: Reloading page in "+min+":0"+sec); 
			else notify("CSGO Lounge AutoBump: Reloading page in "+min+":"+sec);
		}
		if (ParseUrl()=="http://dota2lounge.com/undefined") {
			if (sec<10) notify("Dota 2 Lounge AutoBump: Reloading page in "+min+":0"+sec); 
			else notify("Dota 2 Lounge AutoBump: Reloading page in "+min+":"+sec);
		}
		if (ParseUrl()=="http://tf2tp.com/undefined") {
			if (sec<10) notify("TF2 Trading Post AutoBump: Reloading page in "+min+":0"+sec);
			else notify("TF2 Trading Post AutoBump: Reloading page in "+min+":"+sec);
		}
	} 
	
	function acceptallalerts (accept) {
		if (accept) {
			unsafeWindow.confirm = function() {return true;}  
			unsafeWindow.alert = null;
		}
		else {
			unsafeWindow.confirm = conf;
			unsafeWindow.alert = aler;
		}
	}
	
	function bump_trades() {
		var xpr, anchor;
		if (ParseUrl()=="http://www.tf2outpost.com/undefined" || ParseUrl()=="http://www.tf2outpost.com/trade/undefined") {
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
		}
		if (ParseUrl()=="http://dispenser.tf/id/undefined" || ParseUrl()=="http://dispenser.tf/undefined") {
			xpr = document.evaluate(".//p/a[@class='actionbutton']/i[@class='fa fa-arrow-circle-up']", document, null, XPathResult.ANY_TYPE, null);
			anchor = xpr.iterateNext();
			anchor = anchor.parentNode;
			anchor.click();
		}
		if (ParseUrl()=="http://csgolounge.com/undefined" || ParseUrl()=="http://dota2lounge.com/undefined") {
			xpr = document.evaluate(".//div[@class='tradepoll']/div[@class='tradeheader']/a[@class='buttonright']", document, null, XPathResult.ANY_TYPE, null);
			anchor = xpr.iterateNext();
			if (anchor && anchor.getAttribute('onclick')) {
				anchor.click();
				if (ParseUrl()=="http://csgolounge.com/undefined" && !CSGOLoungeBumpOnePerReload) {
					if (CSGOLoungeWaitBetweenBump) setTimeout(bump_trades,(CSGOLoungeTimeBetweenEachBump*1000));
					else setTimeout(bump_trades,5);
				}
				if (ParseUrl()=="http://dota2lounge.com/undefined" && !Dota2LoungeBumpOnePerReload) {
					if (Dota2LoungeWaitBetweenBump) setTimeout(bump_trades,(Dota2LoungeTimeBetweenEachBump*1000));
					else setTimeout(bump_trades,5);
				}
			}
		}
		if (ParseUrl()=="http://tf2tp.com/undefined") {
			var tf2tpttb;
			if (TradingPostBumpRandomTrade) tf2tpttb = randominrange(1,tptradecount());
			else {
				if (TradingPostTradeToBump>tptradecount()) tf2tpttb = tptradecount();
				else tf2tpttb = TradingPostTradeToBump;
			}
			acceptallalerts(true);
			xpr = document.evaluate(".//div[@class='trade']/h5/a[@class='bumpAjaxLink']", document, null, XPathResult.ANY_TYPE, null);
			for (var ttb = tf2tpttb; (ttb>0 && ttb<=tptradecount()); ttb--) anchor = xpr.iterateNext();
			if (anchor) anchor.click();
		}
	   	reload_time = RELOAD_MINUTES*60;
	   	counter = setInterval(showstatus, 1000);  
	} 
	
	var reload_time, counter, RELOAD_MINUTES;
	var conf = unsafeWindow.confirm;
	var aler = unsafeWindow.alert;
	var tpdelay = 2;
	if (ParseUrl()=="http://www.tf2outpost.com/undefined") {
		if (OutpostRandomReloadTimes) RELOAD_MINUTES = randominrange(OutpostMinReloadTime,OutpostMaxReloadTime);
		else RELOAD_MINUTES = OutpostReloadIfNotRandom;
	}
	if (ParseUrl()=="http://www.tf2outpost.com/trade/undefined") {
		if (OutpostRandomReloadTimes) RELOAD_MINUTES = randominrange(OutpostSingleMinReloadTime,OutpostSingleMaxReloadTime);
		else RELOAD_MINUTES = OutpostSingleReloadIfNotRandom;
	}
	if (ParseUrl()=="http://bazaar.tf/undefined") {
		if (BazaarRandomReloadTimes) RELOAD_MINUTES = randominrange(BazaarMinReloadTime,BazaarMaxReloadTime);
		else RELOAD_MINUTES = BazaarReloadIfNotRandom;
	}
	if (ParseUrl()=="http://dispenser.tf/id/undefined" || ParseUrl()=="http://dispenser.tf/undefined") {
		if (DispenserRandomBumpTimes) RELOAD_MINUTES = randominrange(DispenserMinBumpTime,DispenserMaxBumpTime);
		else RELOAD_MINUTES = DispenserBumpIfNotRandom;
	}
	if (ParseUrl()=="http://csgolounge.com/undefined") {
		if (CSGOLoungeRandomReloadTimes) RELOAD_MINUTES = randominrange(CSGOLoungeMinReloadTIme,CSGOLoungeMaxReloadTime);
		else RELOAD_MINUTES = CSGOLoungeReloadIfNotRandom;
	}
	if (ParseUrl()=="http://dota2lounge.com/undefined") {
		if (Dota2LoungeRandomReloadTimes) RELOAD_MINUTES = randominrange(Dota2LoungeMinReloadTIme,Dota2LoungeMaxReloadTime);
		else RELOAD_MINUTES = Dota2LoungeReloadIfNotRandom;
	}
	if (ParseUrl()=="http://tf2tp.com/undefined") {
		if (TradingPostRandomReloadTimes) RELOAD_MINUTES = randominrange(TradingPostMinReloadTIme,TradingPostMaxReloadTime);
		else RELOAD_MINUTES = TradingPostReloadIfNotRandom;
	}
	bump_trades();
}).call(this);
  
/**************************************************Changelog********************************************************
 *  
 * 1.0 - Base TF2Outpost autobump; only for http://www.tf2outpost.com/trades 
 *  
 * 1.1 - Bazaar.tf supported and timer changed to seconds only given that there's always only 1 minute 
 *  
 * 1.2 - Single trade bumping supported on TF2Outpost 
 *  
 * 1.3 - Bugfixes with single trade bumping timer notification 
 *  
 * 1.4 - Bazaar.tf autobumping supported on all Bazaar.tf pages because trades bump as long as you're logged in 
 *  
 * 1.5 - Pages with submissions excluded from Bazaar.tf autobump 
 *  
 * 1.6 - More bugfixes with single trade bumping timer notification 
 *  
 * 1.7 - Single trades now have 5 minutes autoreload time to make some things less annoying
 *  
 * 1.8 - Bugfixes and new autoreload countdown with minutes support now that there's sometimes minutes 
 *  
 * 1.9 - The actual bump script replaced with more efficient way of bumping
 * 
 * 2.0 - Dispenser.tf now supported; several Dispenser.tf pages excluded
 * 
 * 2.1 - Dispenser.tf bump fixed after button ID change
 * 
 * 2.2 - It was pointed out to me that this didn't work on Firefox; fixed
 * 
 * 2.3 - Added 5 minutes to Dispenser.tf bump time to allow slow computers to be slow; Made Outpost reload time more random because people are paranoid.
 * 
 * 2.4 - 5 minutes reload time on Bazaar.tf profiles
 * 
 * 2.5 - CSGO Lounge supported
 *
 * 4.20 - Dota 2 Lounge and TF2 Trading Post supported; bazaar support reduced to just the trades page; a bunch of settings added; blaze it
 * 
 * 4.21 - somebody couldn't figure out how to remove the notification .-.
 * 
 *******************************************************************************************************************/