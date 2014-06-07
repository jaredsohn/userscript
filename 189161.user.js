// ==UserScript==
// @name       	NaN.X with Spartacus
// @namespace   Mafiawars
// @description NaNx is like dronex on roids
// @grant       none
// @include     http://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     0.18d
// ==/UserScript==

function injectScript(source) {
    // Utilities
    var isFunction = function (arg) {
            return (Object.prototype.toString.call(arg) == "[object Function]");
        };
    var jsEscape = function (str) {
            // Replaces quotes with numerical escape sequences to
            // avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
            if (!str || !str.length) return str;
            // use \W in the square brackets if you have trouble with any values.
            var r = /['"<>\/]/g,
                result = "",
                l = 0,
                c;
            do {
                c = r.exec(str);
                result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
            } while (c && ((l = r.lastIndex) > 0))
            return (result.length ? result : str);
        };
    var bFunction = isFunction(source);
    var elem = document.createElement("script"); // create the new script element.
    var script, ret, id = "";
    if (bFunction) {
        // We're dealing with a function, prepare the arguments.
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            var raw = arguments[i];
            var arg;
            if (isFunction(raw)) // argument is a function.
            arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
            else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
            arg = "(new Date(" + raw.getTime().toString() + "))";
            else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
            arg = "(new RegExp(" + raw.toString() + "))";
            else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
            arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
            else arg = raw.toString(); // Anything else number/boolean
            args.push(arg); // push the new argument on the list
        }
        // generate a random id string for the script block
        while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
        // build the final script string, wrapping the original in a boot-strapper/proxy:
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('" + id + "').innerText=JSON.stringify(value);})();";
        elem.id = id;
    } else // plain string, just copy it over.
    {
        script = source;
    }
    elem.type = "text/javascript";
    elem.innerHTML = script;
    // insert the element into the DOM (it starts to execute instantly)
    document.head.appendChild(elem);
    if (bFunction) {
        // get the return value from our function:
        ret = JSON.parse(elem.innerText);
        // remove the now-useless clutter.
        elem.parentNode.removeChild(elem);
        // make sure the garbage collector picks it instantly. (and hope it does)
        delete(elem);
        // see if our returned value was thrown or not
        if (ret.throwValue) throw (ret.callResult);
        else return (ret.callResult);
    } else // plain text insertion, return the new script element.
    return (elem);
}
var myscript = function(){
	try {
		if (localStorage.getItem) {
			storage = localStorage;
		}
		else if (window.localStorage.getItem) {
			storage = window.localStorage;
		}
	}
	catch(e) {} 
	var NaNx = {
		version: '0.18d',
		CurrentLevel: 0,
		SendJobReq: 0,
		ClickGo: 0,
		JobMap: new Array(),
		StamMap: new Array(),
		CurrentEnergyJob: new Array(),
		CurrentStaminaJob: new Array(),
		State:{
			isRunning: true,
			isBlocking: false,
			StamCostChecked: false,
			isSorting: true,
			isBanditDetected: false
		},
		Counters:{
			JobMapCount: 0,
			StamMapCount: 0,
			slotsrobbed: 0,
			switchNRG: 0,
			ajaxerr0r: 0,
			BagmanCount: 0,
			MasterMindCount: 0,
			WheelManCount: 0,
			jobsdonecurrent: 0
		},
		Settings:{
			Restart: false,
			AutoStart: false,
			Speed: 350,
			SkillSpending: 0,
			SkillToSpend: 'none',
			MFury:false,
			PAttack:true,
			SShield:true,
			SShieldA:true,
			BKamiO:true,
			SortP:true,
			nummatt:3,
			BKamiS:20,
			StopV:0,
			StopO:0,
			AType:0,
			seltarget:6,
			StamFirst: 0,
			isHiding: new Array()
		}
	};

	var NYJobMap = {
		D1:[
			{isName: "Perform a Hit (1.200)", isJobID: 37, isTab: 1, isCity: 1, isCost: 5, isTheXP: 6},
			{isName: "Grow Your Family (1.250)", isJobID: 8, isTab: 1, isCity: 1, isCost: 4, isTheXP: 5},
			{isName: "Collect Protection Money (1.333)", isJobID: 5, isTab: 1, isCity: 1, isCost: 3, isTheXP: 4},
			{isName: "Rob the Warehouse (1.000)", isJobID: 4, isTab: 1, isCity: 1, isCost: 3, isTheXP: 3},
			{isName: "Rough Up Dealers (1.000)", isJobID: 3, isTab: 1, isCity: 1, isCost: 3, isTheXP: 3},
			{isName: "Rob a Drug Runner (1.000)", isJobID: 2, isTab: 1, isCity: 1, isCost: 2, isTheXP: 2},
			{isName: "Chase Away Thugs (1.000)", isJobID: 1, isTab: 1, isCity: 1, isCost: 1, isTheXP: 1}
		],
		D2:[
			{isName: "Mugging (1.0000)", isJobID: 6, isTab: 2, isCity: 1, isCost: 0},
			{isName: "Auto Theft (1.3333)", isJobID: 7, isTab: 2, isCity: 1, isCost: 0},
			{isName: "Take Out a Rogue Cop (1.3333)", isJobID: 9, isTab: 2, isCity: 1, isCost: 0},
			{isName: "Collect on a Loan (1.2500)", isJobID: 10, isTab: 2, isCity: 1, isCost: 0},
			{isName: "Bank Heist (1.6667)", isJobID: 11, isTab: 2, isCity: 1, isCost: 0},
			{isName: "Jewelry Store Job (1.7143)", isJobID: 12, isTab: 2, isCity: 1, isCost: 0},
			{isName: "Hijack a Semi (1.7143)", isJobID: 38, isTab: 2, isCity: 1, isCost: 0}
		],	
		D3:[
			{isName: "Destroy Enemy Mob Hideout (1.2000)", isJobID: 13, isTab: 3, isCity: 1, isCost: 0},
			{isName: "Kill a Protected Snitch (1.2000)", isJobID: 14, isTab: 3, isCity: 1, isCost: 0},
			{isName: "Bust a Made Man Out of Prison (1.2000)", isJobID: 15, isTab: 3, isCity: 1, isCost: 0},
			{isName: "Asian Museum Break-in (1.3333)", isJobID: 16, isTab: 3, isCity: 1, isCost: 0},
			{isName: "Fight a Haitian Gang (1.6000)", isJobID: 17, isTab: 3, isCity: 1, isCost: 0},
			{isName: "Clip the Irish Mob's Local Enforcer (1.4444)", isJobID: 39, isTab: 3, isCity: 1, isCost: 0},
			{isName: "Steal a Tanker Truck (1.2857)", isJobID: 40, isTab: 3, isCity: 1, isCost: 0}
		],
		D4:[
			{isName: "Federal Reserve Raid (1.5909)", isJobID: 18, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Smuggle Thai Gems (1.5625)", isJobID: 19, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Liquor Smuggling (1.4815)", isJobID: 22, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Run Illegal Poker Game (2.1111)", isJobID: 26, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Wiretap the Cops (1.8889)", isJobID: 28, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Rob an Electronics Store (1.4286)", isJobID: 41, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Burn Down a Tenement (1.5625)", isJobID: 42, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Distill Some Liquor (1.5556)", isJobID: 23, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Manufacture Tokens (1.5556)", isJobID: 24, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Get Cheating Deck (1.5556)", isJobID: 25, isTab: 4, isCity: 1, isCost: 0},
			{isName: "Overtake Phone Central (1.5556)", isJobID: 27, isTab: 4, isCity: 1, isCost: 0}
		],
		D5:[
			{isName: "Repel the Yakuza (1.8182)", isJobID: 29, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Disrupt Rival Smuggling Ring (1.7692)", isJobID: 30, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Invade Tong-controlled Neighborhood (1.5909)", isJobID: 31, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Sell Guns to the Russian Mob (1.8182)", isJobID: 32, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Protect your City against a Rival Family (1.8710)", isJobID: 33, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Assassinate a Political Figure (1.8710)", isJobID: 34, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Exterminate a Rival Family (1.8611)", isJobID: 35, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Obtain Compromising Photos (1.4800)", isJobID: 43, isTab: 5, isCity: 1, isCost: 0},
			{isName: "Frame a Rival Capo (1.6522)", isJobID: 44, isTab: 5, isCity: 1, isCost: 0}
		],
		D6:[
			{isName: "Steal an Air Freight Delivery (1.4643)", isJobID: 45, isTab: 6, isCity: 1, isCost: 0},
			{isName: "Run a Biker Gang Out of Town (1.4839)", isJobID: 46, isTab: 6, isCity: 1, isCost: 0},
			{isName: "Flip a Snitch (1.5909)", isJobID: 47, isTab: 6, isCity: 1, isCost: 0},
			{isName: "Steal Bank Records (1.5185)", isJobID: 48, isTab: 6, isCity: 1, isCost: 0},
			{isName: "Loot the Police Impound Lot (1.2778)", isJobID: 49, isTab: 6, isCity: 1, isCost: 0},
			{isName: "Recruit a Rival Crew Member (1.6667)", isJobID: 50, isTab: 6, isCity: 1, isCost: 0},
			{isName: "Dodge an FBI Tail (1.6667)", isJobID: 51, isTab: 6, isCity: 1, isCost: 0},
			{isName: "Whack a Rival Crew Leader (1.7600)", isJobID: 52, isTab: 6, isCity: 1, isCost: 0}
		],
		D7:[
			{isName: "Influence a Harbor Official (1.6444)", isJobID: 53, isTab: 7, isCity: 1, isCost: 0},
			{isName: "Move Stolen Merchandise (1.8125)", isJobID: 54, isTab: 7, isCity: 1, isCost: 0},
			{isName: "Snuff a Rat (1.8205)", isJobID: 55, isTab: 7, isCity: 1, isCost: 0},
			{isName: "Help a Fugitive Flee the Country (1.8333)", isJobID: 56, isTab: 7, isCity: 1, isCost: 0},
			{isName: "Dispose of a Body (1.8636)", isJobID: 57, isTab: 7, isCity: 1, isCost: 0},
			{isName: "Ransom a Businessman's Kids (1.5000)", isJobID: 58, isTab: 7, isCity: 1, isCost: 0},
			{isName: "Fix the Big Game (1.5333)", isJobID: 59, isTab: 7, isCity: 1, isCost: 0},
			{isName: "Steal an Arms Shipment (1.8750)", isJobID: 60, isTab: 7, isCity: 1, isCost: 0}
		],
		D8:[
			{isName: "Extort a Corrupt Judge (1.9524)", isJobID: 61, isTab: 8, isCity: 1, isCost: 0},
			{isName: "Embezzle Funds Through a Phony Company (1.8000)", isJobID: 62, isTab: 8, isCity: 1, isCost: 0},
			{isName: "Break Into the Armory (1.5333)", isJobID: 63, isTab: 8, isCity: 1, isCost: 0},
			{isName: "Rip Off the Armenian Mob (1.7333)", isJobID: 64, isTab: 8, isCity: 1, isCost: 0},
			{isName: "Muscle in on a Triad Operation (1.9500)", isJobID: 65, isTab: 8, isCity: 1, isCost: 0},
			{isName: "Ambush a Rival at a Sit Down (1.8776)", isJobID: 66, isTab: 8, isCity: 1, isCost: 0},
			{isName: "Order a Hit on a Public Official (2.0323)", isJobID: 67, isTab: 8, isCity: 1, isCost: 0},
			{isName: "Take Over an Identity Theft Ring (1.8750)", isJobID: 68, isTab: 8, isCity: 1, isCost: 0}
		],
		D9:[
			{isName: "Settle a Beef... Permanently (1.9167)", isJobID: 69, isTab: 9, isCity: 1, isCost: 0},
			{isName: "Buy Off a Federal Agent (2.1613)", isJobID: 70, isTab: 9, isCity: 1, isCost: 0},
			{isName: "Make a Deal with the Mexican Cartel (1.9167)", isJobID: 71, isTab: 9, isCity: 1, isCost: 0},
			{isName: "Blackmail the District Attorney (1.8974)", isJobID: 72, isTab: 9, isCity: 1, isCost: 0},
			{isName: "Shake Down a City Council Member (2.0000)", isJobID: 73, isTab: 9, isCity: 1, isCost: 0},
			{isName: "Make Arrangements for a Visiting Don (1.9167)", isJobID: 74, isTab: 9, isCity: 1, isCost: 0},
			{isName: "Take Control of a Casino (1.9206)", isJobID: 75, isTab: 9, isCity: 1, isCost: 0},
			{isName: "Travel to the Old Country (1.9565)", isJobID: 76, isTab: 9, isCity: 1, isCost: 0}
		]
	};

	var BRLJobMap = {
		D1:[
			{isName: "Scope Out the Financial District (1.152)", isJobID: 1, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Set Up Your Operation in a Renovated Skyscraper (1.152)", isJobID: 2, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Ask an Informant About Local Crime Activity (1.163)", isJobID: 3, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Steal Artwork from the Paco Imperial (1.531)", isJobID: 4, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Bribe a Corporate Executive (1.152)", isJobID: 5, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Ambush a Group of Neo-Imperium (1.531)", isJobID: 6, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Destroy a Bondinho Tram (1.136)", isJobID: 7, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Blackmail a Cathedral Representative (1.146)", isJobID: 8, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Run a Collection Plate Con (1.378)", isJobID: 9, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Track Down Lieutenant Sandoval (1.598)", isJobID: 10, isTab: 1, isCity: 7, isCost: 0},
			{isName: "Assassinate a Politician at a Museum Gala (1.47)", isJobID: 11, isTab: 1, isCity: 7, isCost: 0}
		],
		D2:[
			{isName: "Meet a Contact at Mosqueiro (1.47)", isJobID: 13, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Impersonate a Wealthy Entrepreneur (1.47)", isJobID: 14, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Dispose of a Police Chief (1.705)", isJobID: 15, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Intimidate the Local Crime Ring (1.957)", isJobID: 16, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Track Down Neo-Imperium Members (1.705)", isJobID: 17, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Smuggle a Shipment Through Aeroporto de Belem (1.649)", isJobID: 18, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Steal the Plans (1.77)", isJobID: 19, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Burn Down a Jungle Hideout (1.899)", isJobID: 20, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Establish a Spy Ring of Belem Fishermen (1.818)", isJobID: 21, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Gun Down Kidnappers (2.027)", isJobID: 22, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Capture a Neo-Imperium Captain (1.862)", isJobID: 23, isTab: 2, isCity: 7, isCost: 0},
			{isName: "Bribe a City Official (1.862)", isJobID: 24, isTab: 2, isCity: 7, isCost: 0}
		],
		D3:[
			{isName: "Blackmail a City Official (1.7)", isJobID: 25, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Gather Intel from Street Rats (1.572)", isJobID: 26, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Assassinate a Neo-Imperium Spokesman (1.619)", isJobID: 27, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Bribe a Police Commandant (1.661)", isJobID: 28, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Pilfer from a Rebel Supply House (1.619)", isJobID: 29, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Locate a Rebel Outpost (1.665)", isJobID: 30, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Intercept a Rebel Convoy (1.742)", isJobID: 31, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Take Out a Rebel Lookout (1.631)", isJobID: 32, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Create a Diversion in the Jungle (1.67)", isJobID: 33, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Blow Up a Munitions Dump (1.602)", isJobID: 34, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Open Fire on Rebel Fighters (1.701)", isJobID: 35, isTab: 3, isCity: 7, isCost: 0},
			{isName: "Rescue a Hostage (1.637)", isJobID: 36, isTab: 3, isCity: 7, isCost: 0}
		],
		D4:[
			{isName: "Move to a Sao Paolo Safe House (1.702)", isJobID: 37, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Transport a Drug Shipment (1.731)", isJobID: 38, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Push Over a Gun Runner (1.827)", isJobID: 39, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Pass Along a Bribe (1.757)", isJobID: 40, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Contact a Comando do Candiru Agent (1.87)", isJobID: 41, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Scout Out the City (1.781)", isJobID: 42, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Rob a Jewelry Store (1.889)", isJobID: 43, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Burn Down a Slum Building (1.907)", isJobID: 44, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Escape a Police Pursuit (1.824)", isJobID: 45, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Demolish a Rooftop Helipad (1.855)", isJobID: 46, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Wipe Out a Favela Street Gang (1.873)", isJobID: 47, isTab: 4, isCity: 7, isCost: 0},
			{isName: "Interrogate a Neo-Imperium Supporter (1.889)", isJobID: 48, isTab: 4, isCity: 7, isCost: 0}
		],
		D5:[
			{isName: "Smuggle Weapons Down the River to a Recife Port (1.843)", isJobID: 49, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Negotiate a Sit-Down with the Comando do Candiru (1.813)", isJobID: 50, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Auction Off a Rival's Private Island (1.788)", isJobID: 51, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Detonate an Ethanol Shipment (1.859)", isJobID: 52, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Create a Shark Scare (1.832)", isJobID: 53, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Steal Confidential Medical Records (1.937)", isJobID: 54, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Blackmail a University Instructor (1.996)", isJobID: 55, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Raid a Biochemist's Lab (1.962)", isJobID: 56, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Sink a Cargo Ship in Port (1.764)", isJobID: 57, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Take Over a Shipyard (1.943)", isJobID: 58, isTab: 5, isCity: 7, isCost: 0},
			{isName: "Give Chase to the Neo-Imperium (1.984)", isJobID: 59, isTab: 5, isCity: 7, isCost: 0}
		],
		D6:[
			{isName: "Shake Down Some Locals For Information (2.006)", isJobID: 60, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Discover Connections to Local Gangs (2.021)", isJobID: 61, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Bribe a News Network Executive (2.061)", isJobID: 62, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Make an Announcement on a Local TV Network (1.905)", isJobID: 63, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Convince The Locals Of Your Good Intentions (2.01)", isJobID: 64, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Hunt Down The Revolucao Vermelho's Affiliates (1.937)", isJobID: 65, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Bust Up a Local Drug Ring (1.971)", isJobID: 66, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Delay a Police Patrol (2.04)", isJobID: 67, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Hijack a Fuel Truck (1.971)", isJobID: 68, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Offer Protection to a Franchise Business (1.996)", isJobID: 69, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Execute a Slum Gang Leader (2.086)", isJobID: 70, isTab: 6, isCity: 7, isCost: 0},
			{isName: "Make a Direct Assault on the RV Base (2.099)", isJobID: 71, isTab: 6, isCity: 7, isCost: 0}
		],
		D7:[
			{isName: "Mobilize Your Operation (2.006)", isJobID: 72, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Generate Revenue for Your Cause (2.079)", isJobID: 73, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Find Proof of Police Corruption (2.04)", isJobID: 74, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Rendezvous with Comando do Candiru Agents (2.079)", isJobID: 75, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Bribe a Carnival Director (2.079)", isJobID: 76, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Take Advantage of a Distracted Crowd (2.04)", isJobID: 77, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Blend in with a Group of Float Performers (2.015)", isJobID: 78, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Assassinate the Guest of Honor (2.058)", isJobID: 79, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Cut the RV's Purse Strings (2.006)", isJobID: 80, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Tail a Group of RV to Their Base (2.04)", isJobID: 81, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Remove the Police Protection (2.015)", isJobID: 82, isTab: 7, isCity: 7, isCost: 0},
			{isName: "Demolish an RV stronghold (2.065)", isJobID: 83, isTab: 7, isCity: 7, isCost: 0}
		],
		D8:[
			{isName: "Prepare an Ambush for a Neo-Imperium Sect (2.015)", isJobID: 84, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Interrogate Comando do Condiru Agents (2.05)", isJobID: 85, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Acquire Funds for Taubate Operations (2.086)", isJobID: 86, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Bribe a Taubate Prison Worker (2.221)", isJobID: 87, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Infiltrate Taubate Prison (2.05)", isJobID: 88, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Arrange for Prisoner Transfers (1.974)", isJobID: 89, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Disable Police Emergency Response (2.04)", isJobID: 90, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Cause Civilian Panic (2.099)", isJobID: 91, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Scout For Potential (2.065)", isJobID: 92, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Break Mafia Members Out of Taubate (2.024)", isJobID: 93, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Destroy the Neo-Imperium's Cover Operations (2.072)", isJobID: 94, isTab: 8, isCity: 7, isCost: 0},
			{isName: "Assassinate the Neo-Imperium's Primary Heads (2.191)", isJobID: 95, isTab: 8, isCity: 7, isCost: 0}
		],
		D124:[
			{isName: "Open A Plastic Surgery Clinic (2.13x)", isJobID: 931, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Cater To Your Criminal Clientele (2.13x)", isJobID: 932, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Learn That A Boss Could Use Your Help (2.22x)", isJobID: 933, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Receive A Down Payment For The Job (2.40x)", isJobID: 934, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Help Him With Your Expertise (2.14x)", isJobID: 935, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Change His Identity To Help Him Escape (2.20x)", isJobID: 936, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Learn That You Have Been Double Crossed (2.20x)", isJobID: 937, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Track Him Down (2.19x)", isJobID: 938, isTab: 124, isCity: 7, isCost: 0},
			{isName: "Take Care of Your Unobliging Client (2.43x)", isJobID: 939, isTab: 124, isCity: 7, isCost: 0}
		]
	};
	
	var CHIJobMap = {
		D1:[
			{isName: "Meet With the South Gang Family (1.333)", isJobID: 1, isTab: 1, isCity: 8, isCost: 0},
			{isName: "Drive North of the Border (1.333)", isJobID: 2, isTab: 1, isCity: 8, isCost: 0},
			{isName: "Set Up a Rum Running Operation (1.25)", isJobID: 3, isTab: 1, isCity: 8, isCost: 0},
			{isName: "Smuggle a Shipment Back to Chicago (1.75)", isJobID: 4, isTab: 1, isCity: 8, isCost: 0},
			{isName: "Break Into Guido Pantucci's Warehouse (1.25)", isJobID: 5, isTab: 1, isCity: 8, isCost: 0},
			{isName: "Dodge the Guards (1.75)", isJobID: 6, isTab: 1, isCity: 8, isCost: 0},
			{isName: "Get Rid of Pantucci (1.167)", isJobID: 7, isTab: 1, isCity: 8, isCost: 0},
			{isName: "Dispose of the Bodies (1.333)", isJobID: 8, isTab: 1, isCity: 8, isCost: 0}
		],
		D2:[
			{isName: "Run an illegal Establishment (1.933)", isJobID: 9, isTab: 2, isCity: 8, isCost: 0},
			{isName: "Secure Hooch to Sell in Your Joint (2.167)", isJobID: 10, isTab: 2, isCity: 8, isCost: 0},
			{isName: "Recruit Loyal Gunmen (1.611)", isJobID: 11, isTab: 2, isCity: 8, isCost: 0},
			{isName: "Case Warehouses on the North Side (2.143)", isJobID: 12, isTab: 2, isCity: 8, isCost: 0},
			{isName: "Expose a Treachery in Your Family (1.625)", isJobID: 13, isTab: 2, isCity: 8, isCost: 0},
			{isName: "Cripple the Colosimo Clan's Assets (1.926)", isJobID: 14, isTab: 2, isCity: 8, isCost: 0},
			{isName: "Ambush the Don's Limo (1.939)", isJobID: 15, isTab: 2, isCity: 8, isCost: 0},
			{isName: "Get the Respect You Deserve (1.972)", isJobID: 16, isTab: 2, isCity: 8, isCost: 0}
		],
		D3:[ 
			{isName: "Move Smuggled Liquor (1.889)", isJobID: 17, isTab: 3, isCity: 8, isCost: 0},
			{isName: "Collect Income From Your Establishments (1.974)", isJobID: 18, isTab: 3, isCity: 8, isCost: 0},
			{isName: "Stuff Local Cop's Pockets With Greens (1.905)", isJobID: 19, isTab: 3, isCity: 8, isCost: 0},
			{isName: "Organize a Private Party (1.926)", isJobID: 20, isTab: 3, isCity: 8, isCost: 0},
			{isName: "Evade an Ambush (1.852)", isJobID: 21, isTab: 3, isCity: 8, isCost: 0},
			{isName: "Uncover a Plot Against You (1.868)", isJobID: 22, isTab: 3, isCity: 8, isCost: 0},
			{isName: "Order a Hit on Disloyal Associates (1.938)", isJobID: 23, isTab: 3, isCity: 8, isCost: 0},
			{isName: "Put Brother Franky in Concrete Shoes (1.882)", isJobID: 24, isTab: 3, isCity: 8, isCost: 0}
		],
		D4:[
			{isName: "Set Up a Distillery in Cicero (1.662)", isJobID: 25, isTab: 4, isCity: 8, isCost: 0},
			{isName: "Meet With a Mayoral Candidate (1.734)", isJobID: 26, isTab: 4, isCity: 8, isCost: 0},
			{isName: "Threaten Voters at Polling Stations (1.696)", isJobID: 27, isTab: 4, isCity: 8, isCost: 0},
			{isName: "Get Puppet Mayor Elected (1.722)", isJobID: 28, isTab: 4, isCity: 8, isCost: 0},
			{isName: "Escape a Federal Agents Raid on Your Distillery (1.711)", isJobID: 29, isTab: 4, isCity: 8, isCost: 0},
			{isName: "Find Out About Mayor's Dealings With the Bureau (1.667)", isJobID: 30, isTab: 4, isCity: 8, isCost: 0},
			{isName: "Blackmail a Prohibition Bureau Top Agent (1.824)", isJobID: 31, isTab: 4, isCity: 8, isCost: 0},
			{isName: "Frame Mayor in a Political Scandal (1.867)", isJobID: 32, isTab: 4, isCity: 8, isCost: 0}
		],
		D5:[ 
			{isName: "Travel South to the Caribbean (1.965)", isJobID: 33, isTab: 5, isCity: 8, isCost: 0},
			{isName: "Set Up a Rum Running Base of Operation (1.84)", isJobID: 34, isTab: 5, isCity: 8, isCost: 0},
			{isName: "Monitor Coast Guard Patrols (1.957)", isJobID: 35, isTab: 5, isCity: 8, isCost: 0},
			{isName: "Hijack a Rival Ship (1.743)", isJobID: 36, isTab: 5, isCity: 8, isCost: 0},
			{isName: "Eliminate the Competition (1.867)", isJobID: 37, isTab: 5, isCity: 8, isCost: 0},
			{isName: "Comb the Beach for Scraps (1.831)", isJobID: 38, isTab: 5, isCity: 8, isCost: 0},
			{isName: "Ferry Customers Across the Rum Line (1.965)", isJobID: 39, isTab: 5, isCity: 8, isCost: 0},
			{isName: "Host Happy Hours on Board (1.939)", isJobID: 40, isTab: 5, isCity: 8, isCost: 0}
		],
		D6:[
			{isName: "Catch a Saboteur (1.974)", isJobID: 41, isTab: 6, isCity: 8, isCost: 0},
			{isName: "Storm Into a North Side Gang Brewery (2.078)", isJobID: 42, isTab: 6, isCity: 8, isCost: 0},
			{isName: "Dodge a Firebombing on Your Headquarters (1.982)", isJobID: 43, isTab: 6, isCity: 8, isCost: 0},
			{isName: "Salvage Your Valuables From a Blazing Fire (1.948)", isJobID: 44, isTab: 6, isCity: 8, isCost: 0},
			{isName: "Call for a Truce With the North Siders (1.988)", isJobID: 45, isTab: 6, isCity: 8, isCost: 0},
			{isName: "Narrowly Survive an Assassination Attempt (1.957)", isJobID: 46, isTab: 6, isCity: 8, isCost: 0},
			{isName: "Plan a Decisive Blow Against the North Siders (1.988)", isJobID: 47, isTab: 6, isCity: 8, isCost: 0},
			{isName: "Flee the Scene Before the Police Arrive (1.963)", isJobID: 48, isTab: 6, isCity: 8, isCost: 0}
		]
	};
	
	var LONJobMap = {
		D1:[
			{isName: "Claim Your Winnings After The Match (1.281)", isJobID: 1, isTab: 1, isCity: 9, isCost: 0},
			{isName: "Fight Off The Thugs (1.496)", isJobID: 2, isTab: 1, isCity: 9, isCost: 0},
			{isName: "Discuss Your Options With The Betting Mafia (1.496)", isJobID: 3, isTab: 1, isCity: 9, isCost: 0},
			{isName: "Persuade \"The Kid\" To Throw The Championship Fight (1.281)", isJobID: 4, isTab: 1, isCity: 9, isCost: 0},
			{isName: "Spike \"The Kid's\" Energy Drink With A Neurotoxin (1.602)", isJobID: 5, isTab: 1, isCity: 9, isCost: 0},
			{isName: "Bet On \"The Kid\" Losing The Championship Fight (1.423)", isJobID: 6, isTab: 1, isCity: 9, isCost: 0},
			{isName: "Watch The Fight (1.373)", isJobID: 7, isTab: 1, isCity: 9, isCost: 0},
			{isName: "Collect Your Take (1.707)", isJobID: 8, isTab: 1, isCity: 9, isCost: 0}
		],
		D2:[
			{isName: "Force An Immigrant Family From Their Home (1.373)", isJobID: 9, isTab: 2, isCity: 9, isCost: 0},
			{isName: "Meet The Land Mafia To Collect Your Take (1.707)", isJobID: 10, isTab: 2, isCity: 9, isCost: 0},
			{isName: "Intimidate The New Celebrity Residents (1.602)", isJobID: 11, isTab: 2, isCity: 9, isCost: 0},
			{isName: "Case The Nouvelle Vague Art Gallery (1.868)", isJobID: 12, isTab: 2, isCity: 9, isCost: 0},
			{isName: "Destroy The Rare East End Works Painting (1.778)", isJobID: 13, isTab: 2, isCity: 9, isCost: 0},
			{isName: "Burn Down A Brand New Condo (1.815)", isJobID: 14, isTab: 2, isCity: 9, isCost: 0},
			{isName: "Collect Your Take From The Construction Firms (2.134)", isJobID: 15, isTab: 2, isCity: 9, isCost: 0},
			{isName: "Leave The East End (1.957)", isJobID: 16, isTab: 2, isCity: 9, isCost: 0}
		],
		D3:[ 
			{isName: "Write About The Mysterious Shooting (1.887)", isJobID: 17, isTab: 3, isCity: 9, isCost: 0},
			{isName: "Work With The PI At The Crime Scene (1.829)", isJobID: 18, isTab: 3, isCity: 9, isCost: 0},
			{isName: "Approach The Police With Leads (2.051)", isJobID: 19, isTab: 3, isCity: 9, isCost: 0},
			{isName: "Search For A Trail (1.921)", isJobID: 20, isTab: 3, isCity: 9, isCost: 0},
			{isName: "Threaten To Expose The Royal (1.849)", isJobID: 21, isTab: 3, isCity: 9, isCost: 0},
			{isName: "Lay A Trap For The Royal (1.867)", isJobID: 22, isTab: 3, isCity: 9, isCost: 0},
			{isName: "Tell The Editor The Truth (1.82)", isJobID: 23, isTab: 3, isCity: 9, isCost: 0},
			{isName: "Publish False Story Under Threat (1.867)", isJobID: 24, isTab: 3, isCity: 9, isCost: 0}
		],
		D4:[
			{isName: "Accept The Offer Made By The Russians (1.778)", isJobID: 25, isTab: 4, isCity: 9, isCost: 0},
			{isName: "Provide Insider Information On Your Gang (2.074)", isJobID: 26, isTab: 4, isCity: 9, isCost: 0},
			{isName: "Escape The Hitmen After Being Discovered (1.92)", isJobID: 27, isTab: 4, isCity: 9, isCost: 0},
			{isName: "Take Shelter In A Warehouse (2.021)", isJobID: 28, isTab: 4, isCity: 9, isCost: 0},
			{isName: "Fake Your Own Death (1.88)", isJobID: 29, isTab: 4, isCity: 9, isCost: 0},
			{isName: "Create A Russian Identity (2.081)", isJobID: 30, isTab: 4, isCity: 9, isCost: 0},
			{isName: "Eliminate Your Gang With The Russians (1.93)", isJobID: 31, isTab: 4, isCity: 9, isCost: 0},
			{isName: "Run The Racket (1.981)", isJobID: 32, isTab: 4, isCity: 9, isCost: 0}
		],
		D5:[ 
			{isName: "Sneak Into The Gambling Den (1.92)", isJobID: 33, isTab: 5, isCity: 9, isCost: 0},
			{isName: "Gamble Away All Your Savings (1.93)", isJobID: 34, isTab: 5, isCity: 9, isCost: 0},
			{isName: "Bargain To Push 'Power Ups' To Pay Off Your Debts (1.891)", isJobID: 35, isTab: 5, isCity: 9, isCost: 0},
			{isName: "Sell 'Power Ups' At School (2.087)", isJobID: 36, isTab: 5, isCity: 9, isCost: 0},
			{isName: "Start An Operation (1.981)", isJobID: 37, isTab: 5, isCity: 9, isCost: 0},
			{isName: "Pay Off Your Debts (1.988)", isJobID: 38, isTab: 5, isCity: 9, isCost: 0},
			{isName: "Run Your Empire (2.241)", isJobID: 39, isTab: 5, isCity: 9, isCost: 0},
			{isName: "Join The Inner Circle (2.087)", isJobID: 40, isTab: 5, isCity: 9, isCost: 0}
		],
		D6:[
			{isName: "Analyze Your Agent's Data (1.93)", isJobID: 41, isTab: 6, isCity: 9, isCost: 0},
			{isName: "Organize A Raid On The Gang Hideout (1.891)", isJobID: 42, isTab: 6, isCity: 9, isCost: 0},
			{isName: "Ambush The Convoy Transporting The Gang Boss (2.087)", isJobID: 43, isTab: 6, isCity: 9, isCost: 0},
			{isName: "Drive The Gang Boss To A Safehouse (2.045)", isJobID: 44, isTab: 6, isCity: 9, isCost: 0},
			{isName: "Forge The Reports (2.176)", isJobID: 45, isTab: 6, isCity: 9, isCost: 0},
			{isName: "Observe Your Agent Snooping Around (2.083)", isJobID: 46, isTab: 6, isCity: 9, isCost: 0},
			{isName: "Snipe Your Agent Before He Goes Public (1.929)", isJobID: 47, isTab: 6, isCity: 9, isCost: 0},
			{isName: "Close The Investigation (2.048)", isJobID: 48, isTab: 6, isCity: 9, isCost: 0}
		],
		D7:[
			{isName: "Track Down Your Target (2.134)", isJobID: 49, isTab: 7, isCity: 9, isCost: 0},
			{isName: "Assassinate Your Target (2.027)", isJobID: 50, isTab: 7, isCity: 9, isCost: 0},
			{isName: "Declare Your Retirement To The Boss (2)", isJobID: 51, isTab: 7, isCity: 9, isCost: 0},
			{isName: "Chase Down Your Son's Kidnappers (2.231)", isJobID: 52, isTab: 7, isCity: 9, isCost: 0},
			{isName: "Sneak Into The Manor (2.19)", isJobID: 53, isTab: 7, isCity: 9, isCost: 0},
			{isName: "Rescue Your Son (1.92)", isJobID: 54, isTab: 7, isCity: 9, isCost: 0},
			{isName: "Take Out The Boss And His Guards (2.037)", isJobID: 55, isTab: 7, isCity: 9, isCost: 0},
			{isName: "Retire To The Isle Of Wight (2.226)", isJobID: 56, isTab: 7, isCity: 9, isCost: 0}
		],
		D8:[
			{isName: "Meet Your Source (2.021)", isJobID: 57, isTab: 8, isCity: 9, isCost: 0},
			{isName: "Investigate The Trail Of The Puzzle Box (2.252)", isJobID: 58, isTab: 8, isCity: 9, isCost: 0},
			{isName: "Audition Your Potential Partners (2.045)", isJobID: 59, isTab: 8, isCity: 9, isCost: 0},
			{isName: "Storm The Tower Of London (2.037)", isJobID: 60, isTab: 8, isCity: 9, isCost: 0},
			{isName: "Steal The Puzzle Box (2.134)", isJobID: 61, isTab: 8, isCity: 9, isCost: 0},
			{isName: "Fight Off The Police (2.279)", isJobID: 62, isTab: 8, isCity: 9, isCost: 0},
			{isName: "Escape Into The Back Alleys (2.133)", isJobID: 63, isTab: 8, isCity: 9, isCost: 0},
			{isName: "Open The Puzzle Box (1.969)", isJobID: 64, isTab: 8, isCity: 9, isCost: 0}
		],
		D9:[
			{isName: "Set Up A Drug Racket From Your Kebab Shop (2.193)", isJobID: 65, isTab: 9, isCity: 9, isCost: 0},
			{isName: "Expand The Business With Turkish Smugglers' Help (2.19)", isJobID: 66, isTab: 9, isCity: 9, isCost: 0},
			{isName: "Reap The Benefits (2.226)", isJobID: 67, isTab: 9, isCity: 9, isCost: 0},
			{isName: "Suspect Foul Play (2.187)", isJobID: 68, isTab: 9, isCity: 9, isCost: 0},
			{isName: "Silence Your Disloyal Associates (2.134)", isJobID: 69, isTab: 9, isCity: 9, isCost: 0},
			{isName: "Pretend To Be A Survivor (2.134)", isJobID: 70, isTab: 9, isCity: 9, isCost: 0},
			{isName: "Get Compensation From Insurance Company (2.048)", isJobID: 71, isTab: 9, isCity: 9, isCost: 0},
			{isName: "Open Various Branches Across London But Beware (2.051)", isJobID: 72, isTab: 9, isCity: 9, isCost: 0}
		],
		D10:[
			{isName: "Queue Up At The Grande Stadium For The Game (2.134)", isJobID: 73, isTab: 10, isCity: 9, isCost: 0},
			{isName: "Enjoy The Game At Rival Team's Cost (2.252)", isJobID: 74, isTab: 10, isCity: 9, isCost: 0},
			{isName: "Go To A Pub To Celebrate Your Team's Win (2.231)", isJobID: 75, isTab: 10, isCity: 9, isCost: 0},
			{isName: "Poke Your Team's Victory In Rival Fans' Faces (2.226)", isJobID: 76, isTab: 10, isCity: 9, isCost: 0},
			{isName: "Defend Yourself From The Rival's Fans (2.231)", isJobID: 77, isTab: 10, isCity: 9, isCost: 0},
			{isName: "Make A Run For It And Hide (2.187)", isJobID: 78, isTab: 10, isCity: 9, isCost: 0},
			{isName: "Speak To Your Uncle With Connections (2.222)", isJobID: 79, isTab: 10, isCity: 9, isCost: 0},
			{isName: "Make The Club Pay For Their Disrespect (2.226)", isJobID: 80, isTab: 10, isCity: 9, isCost: 0}
		]
	};
	
	var SAJobMap = {
		D1:[
			{isName: "Help Out At The Shipwreck (1.754)", isJobID: 1, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Steal The Cargo Of Diamonds (1.945)", isJobID: 2, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Hunt For The Highest Bidder (1.98)", isJobID: 3, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Rally The Union To Join Your Operation (1.994)", isJobID: 4, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Hide Your Shipment (2.024)", isJobID: 5, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Discover A Rat In Your Operation (2.024)", isJobID: 6, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Hire The Mafia As Muscle (2.047)", isJobID: 7, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Protect Your Shipment Into International Waters (2.126)", isJobID: 8, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Join Forces With The Mafia (2.126)", isJobID: 9, isTab: 1, isCity: 10, isCost: 0},
			{isName: "Set Up A Diamond Smuggling Racket (2.237)", isJobID: 10, isTab: 1, isCity: 10, isCost: 0}
		],
		D2:[
			{isName: "Steal A Diamond At Work (1.822)", isJobID: 11, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Defend Yourself Against The Supervisors (1.949)", isJobID: 12, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Distract The Guards (2.024)", isJobID: 13, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Loot The Safe Of Diamonds (1.889)", isJobID: 14, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Locate The Militia By The River (1.889)", isJobID: 15, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Trade Diamonds For High-Grade Weapons (2.105)", isJobID: 16, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Incite The Miners to Riot (2.126)", isJobID: 17, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Wage War Against The Mining Corporation (2.086)", isJobID: 18, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Establish Yourself As A Rebel Leader (2.19)", isJobID: 19, isTab: 2, isCity: 10, isCost: 0},
			{isName: "Distribute The Spoils Of War (2.267)", isJobID: 20, isTab: 2, isCity: 10, isCost: 0}
		],
		D3:[ 
			{isName: "Accept The Job For A Top-Secret Mission (1.889)", isJobID: 21, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Reach The Medical Facility Without Being Noticed (2.126)", isJobID: 22, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Dodge All High Security Elements (2.024)", isJobID: 23, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Gain Access To The Disease Containment Chamber (2.126)", isJobID: 24, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Eliminate An Unexpected Roadblock (2.024)", isJobID: 25, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Open The Virus Vault With Protective Gear (2.227)", isJobID: 26, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Take What You Came For (2.126)", isJobID: 27, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Flee The Scene Without Leaving A Trail (2.204)", isJobID: 28, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Be At The Right Place At The Right Time (2.18)", isJobID: 29, isTab: 3, isCity: 10, isCost: 0},
			{isName: "Sell The Virus To The Highest Bidder (2.289)", isJobID: 30, isTab: 3, isCity: 10, isCost: 0}
		],
		D4:[
			{isName: "Spy On The Witch Doctor (1.786)", isJobID: 31, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Discover The Secret Location Of The Herbs (1.877)", isJobID: 32, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Fake An Injury And Seek Doctor's Aid (1.913)", isJobID: 33, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Offer A Contract To The Witch Doctor (1.9)", isJobID: 34, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Threaten The Doctor To Part With His \"Herbal Meds\" (2.127)", isJobID: 35, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Gather A Mob To Force Doctor To Agree (1.99)", isJobID: 36, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Set Doctor's House On Fire As A Warning (2.225)", isJobID: 37, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Discover That The Doctor Has Escaped (2.162)", isJobID: 38, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Launch A Manhunt For Doctor (2.254)", isJobID: 39, isTab: 4, isCity: 10, isCost: 0},
			{isName: "Ensure That The Doctor Is In The Boss' Clutches (2.294)", isJobID: 40, isTab: 4, isCity: 10, isCost: 0}
		],
		D5:[ 
			{isName: "Acquire Car Parts From Local Hoodlums (1.798)", isJobID: 41, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Offer Your Expertise For Their Business (1.875)", isJobID: 42, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Go Through A Series Of Tests To Prove Yourself (1.913)", isJobID: 43, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Get Recruited For A Lucrative Project (2.139)", isJobID: 44, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Proceed To Dealer's Warehouse (1.965)", isJobID: 45, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Discover A Special Package In The Car (2.211)", isJobID: 46, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Notice That You Are Being Followed (2.246)", isJobID: 47, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Lose Them On The Highway (2.238)", isJobID: 48, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Bury Your Treasure In A Nearby Field (2.258)", isJobID: 49, isTab: 5, isCity: 10, isCost: 0},
			{isName: "Finish Your Car-Jacking Job As Planned (2.302)", isJobID: 50, isTab: 5, isCity: 10, isCost: 0}
		],
		D6:[
			{isName: "Assign Your Protege To An Undercover Operation (1.849)", isJobID: 51, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Crack Down On Narcotics Rings In The Slums (1.887)", isJobID: 52, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Bring Your Protege In On Your Operation (2.154)", isJobID: 53, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Stage A Break In Into The Evidence Room (1.951)", isJobID: 54, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Find Prospective Buyers In The Mafia (2.196)", isJobID: 55, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Resell Snow Candy To The Mafia (2.225)", isJobID: 56, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Run A Substance Raid In The Slums (2.24)", isJobID: 57, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Fake The Arrest Of Your Protege (2.239)", isJobID: 58, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Shift To Another Precinct In The City (2.267)", isJobID: 59, isTab: 6, isCity: 10, isCost: 0},
			{isName: "Get Cure For Disease With Your Profits (2.306)", isJobID: 60, isTab: 6, isCity: 10, isCost: 0}
		],
		D7:[
			{isName: "Refuse To Poach For Rhino Horns And Ivory (1.874)", isJobID: 61, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Give In To Militant Pressure To Poach (1.913)", isJobID: 62, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Track Down And Hunt Rhinos (2.154)", isJobID: 63, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Make A Futile Attempt To Escape Rangers (2.184)", isJobID: 64, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Endure Torture During Interrogation (2.211)", isJobID: 65, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Cut A Deal With Rangers (2.224)", isJobID: 66, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Lead Rangers To Closest Militant Hideout (2.232)", isJobID: 67, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Take Cover From Gunfire (2.246)", isJobID: 68, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Expose Other Militant Pockets (2.296)", isJobID: 69, isTab: 7, isCity: 10, isCost: 0},
			{isName: "Become An Informer For The Rangers (2.313)", isJobID: 70, isTab: 7, isCity: 10, isCost: 0}
		],
		D8:[
			{isName: "Launch An Assault On The Football Stadium (2.09)", isJobID: 71, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Demand That The President Be Surrendered To You (1.926)", isJobID: 72, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Give The President Time To Escape (2.267)", isJobID: 73, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Launch Deadly Virus Grenades Into The Crowd (2.196)", isJobID: 74, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Abduct The Nation's Most Influential Media Mogul (2.296)", isJobID: 75, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Blow Up The Grounded Blimp To Cover Your Escape (2.241)", isJobID: 76, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Secure The Hideout While You Wait For The Boss (2.311)", isJobID: 77, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Persuade The Mogul To Join Your Cause (2.282)", isJobID: 78, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Release Footage Of The President Abandoning The Stadium Victims (2.366)", isJobID: 79, isTab: 8, isCity: 10, isCost: 0},
			{isName: "Influence Public Opinion Through The Mogul's News Networks (2.395)", isJobID: 80, isTab: 8, isCity: 10, isCost: 0}
		],
		D9:[
			{isName: "Alert President Of Public Frenzy (1.964)", isJobID: 81, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Call For A Meeting In A Secluded Location (2.224)", isJobID: 82, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Join President's Entourage At Springbok (2.296)", isJobID: 83, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Protect President From Public Humiliation (2.239)", isJobID: 84, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Transport President To Safe House (2.254)", isJobID: 85, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Double-Cross the President (2.324)", isJobID: 86, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Force President To Confront His Past (2.26)", isJobID: 87, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Record President's Confession To Crimes Of Genocide (2.285)", isJobID: 88, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Tip-Off President's Whereabouts To Police (2.387)", isJobID: 89, isTab: 9, isCity: 10, isCost: 0},
			{isName: "Escape Safe House Unnoticed (2.401)", isJobID: 90, isTab: 9, isCity: 10, isCost: 0}
		],
		D10:[
			{isName: "Gain The Cooperation Of Key Members Of Parliament (2.163)", isJobID: 91, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Take Control Of The Leading Political Party (2.225)", isJobID: 92, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Organize Terror Attacks By Your Militants (2.296)", isJobID: 93, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Double Cross And Have Them Eliminated (2.222)", isJobID: 94, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Declare A State Of Emergency In The Country (2.253)", isJobID: 95, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Establish Martial Law (2.282)", isJobID: 96, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Offer Restitution To Terror Attack Victims (2.270)", isJobID: 97, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Publicize Your Philanthropy To Win Public Approval (2.290)", isJobID: 98, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Get Sworn In As President (2.416)", isJobID: 99, isTab: 10, isCity: 10, isCost: 0},
			{isName: "Offer Your Associates Key Roles In The Cabinet (2.423)", isJobID: 120, isTab: 10, isCity: 10, isCost: 0}
			/*
				{isName: "Gain The Cooperation Of Key Members Of Parliament (2.163)", isJobID: 91, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Take Control Of The Leading Political Party (2.225)", isJobID: 92, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Organize Terror Attacks By Your Militants (2.296)", isJobID: 93, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Double Cross And Have Them Eliminated (2.205)", isJobID: 94, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Declare A State Of Emergency In The Country (2.253)", isJobID: 95, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Establish Martial Law (2.324)", isJobID: 96, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Offer Restitution To Terror Attack Victims (2.270)", isJobID: 97, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Publicize Your Philanthropy To Win Public Approval (2.290)", isJobID: 98, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Get Sworn In As President (2.416)", isJobID: 99, isTab: 10, isCity: 10, isCost: 0},
				{isName: "Offer Your Associates Key Roles In The Cabinet (2.423)", isJobID: 120, isTab: 10, isCity: 10, isCost: 0}
			*/
		],
		D133:[
			{isName: "Accept A Smuggling Assignment (1.826)", isJobID: 1034, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Pick Up A Package At The Harbor (1.957)", isJobID: 1035, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Escape The Police Ambush (1.797)", isJobID: 1036, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Break Into The Police Warehouse (1.902)", isJobID: 1037, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Steal Back The Package (2.240)", isJobID: 1038, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Implicate Your Old Gang Leader (2.054)", isJobID: 1039, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Deliver The Package To Your New Boss (2.122)", isJobID: 1040, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Recruit Your Old Gang Members (2.282)", isJobID: 1041, isTab: 133, isCity: 10, isCost: 0},
			{isName: "Get Rewarded For Your Loyalty (2.143)", isJobID: 1042, isTab: 133, isCity: 10, isCost: 0}
		]
	};	
	
	var StamJobs = new Array(
		{isName: "Gain The Cooperation Of Key Members Of Parliament (2.163)", isJobID: 91, isCity: 10, isCost: 0, isTab: 10, isTheXP: 0, isRatio:0, isMastered:"Unknown"},
		{isName: "Double Cross And Have Them Eliminated (2.222)", isJobID: 94, isCity: 10, isCost: 0, isTab: 10, isTheXP: 0, isRatio:0, isMastered:"Unknown"},
		{isName: "Offer Restitution To Terror Attack Victims (2.270)", isJobID: 97, isCity: 10, isCost: 0, isTab: 10, isTheXP: 0, isRatio:0, isMastered:"Unknown"}
	);
	
	var t1;
	var t2;
	var SkillPointAssinRunning = false;
	var SPAvaiable;
	var SkillsTo;
	var isFirstLoad = true;
	var GrabCostCount = 0;
	var zserver = /\/\/(.*)\.mafiawars/.exec(document.location.href)[1];
	/*Spartacus v1.26*/
	var logs=[],
	looted = {},
	run=false,
	closed=false,
	starimg = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/TeamVSTeam/result_star_filled.png" width="12" height="12" align="top" />',
	nostarimg = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/TeamVSTeam/result_star_grey.png" width="12" height="12" align="top" />',
	socke, // websocket
	currdata, // copy of data
	cmdqueue=[],
	meid, //me
	meteam, // my team
	tscore = {"1":0,"2":0},
	poweratt = undefined,
	poweruplist = {},
	playerinfo={},
	playerids={},
	starting_in,
	starting_in_counter,
	stam_on_start=-1,
	healed_in,
	healed_in_counter,
	restart_in,
	restart_in_counter,
	itemdatabase={},
	friendlist={},
	worstitems,
	stats = { arenas:0,crests:0, xp:0, stamina:0, respect_start:0, respect:0, ranks:[0,0,0,0,0,0], stars:0},
	powerup_status = {},
	last_update = 0,
	conn_checker,
    healtimer=[0,0,0,0,0,0],
	replenish=0,
	da_game = [],
	protect = {},
	powerup_command = { count:{},active:-1,target:undefined },
	over_table = false,
	reconnect_retry = 0,
	arenalist=[],
	last_crests = false;
	
	var powerups = {
		1:{name:"Stamina Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_staminarefill_01.png"},
		2:{name:"Arena Health Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_arenahealthrefill_01.png"},
		3:{name:"Meta Flair",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_quartflair_01.png"},
		4:{name:"Pain Killer",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_painkiller_01.png"},
		5:{name:"Kamikaze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_suckerpunch_01.png"},
		6:{name:"Drained",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_drained_02.png"},
		7:{name:"Reflector",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_reflector_01.png"},
		//8:{name:"Freeze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_freeze_01.png"}
		//9:{name:"Dual Strike",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_dualstrike_01.png"}
		10:{name:"Tri-Rage",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_tri-rage_01.png"}
	};

	var difficulty = [
		'Easy',
		'Normal',
		'Hard'
	];

	var r_difficulty = {
		'Easy':0,
		'Normal':1,
		'Hard':2
	};
	
	var SpartStylez = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px; margin:1px;}'+
		'#spartacus_loading { display:none; }'+
		'#spartacus_table td { padding:3px; }'+
		'#spartacus_table th { padding:3px; }'+
		'#spartacus_table { width:100%; border: 1px solid black; }'+
		'#spartacus_table tr:nth-child(odd) { background: #181818; }'+
		'#spartacus_attmatrix td { padding:3px; border: 1px solid grey; width:20px; text-align:center; }'+
		'#spartacus_attmatrix th { padding:4px; border: 1px solid white; width:20px; text-align:center; }'+
		'#spartacus_attmatrix { border: 1px solid white; }'+
		'.spartacus_teamblue { background: #0E374B !important;}'+
		'.spartacus_teamred { background: #331A1E !important;}'+
		'.spartacus_usepowerup { cursor:pointer; }'+
		'.spartacus_notusepowerup { cursor:default; }'+
		'.spartacus_puclick { cursor:pointer; }'+
		'.spartacus_punoclick { cursor:default; }'+
		'.spartacus_pufull { opacity:1; }'+
		'.spartacus_puhalf { opacity:0.6; }'+
		'.spartacus_puoff { opacity:0.2; }'+
		'.spartacus_puactive { border:1px solid white; }'+
		'.spartacus_punormal { border:1px solid #101010; }'+
		'.spartacus_conf { display:none; }'+
		'.spartacus_lobbyconf { display:none; }'+
		'#spartacus_delay { display:none; }'+
		'.spartacus_offsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-10px -5px;padding-left: 30px;}'+
		'.spartacus_defsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-230px -110px;padding-left: 30px;}'+
		'.spartacus_lootlog { display:none; }'+
		'.spartacus_arenalog { display:none; }'+
		'.spartacus_privateconf { display:none; }'+
		'.spartacus_chalconf { display:none; }'+
	'</style>';
	var optable = 
		'<tr><th style="width: 55px; height:20px;">Rank<img height="16" width="16" src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/item_treasure_chest_key.gif" id="spartacus_lockrank" style="display:none;" /></th>'+
		'<th>Opponent</th><th>Info</th><th>Respect</th><th style="width:65px;">Health</th><th>Score</th><th>Stamina</th><th style="width:80px;">Shields</th><th>Intervene</th></tr>'+
		'<tr id="spartacus_op0"><td style="height:38px;"><span id="spartacus_rank0">#1</span></td><td><span id="spartacus_name0">Opponent 0</span></td><td><span id="spartacus_diff0" class="difficulty"></span></td><td><span id="spartacus_respect0" class="respect">0</span></td><td><span class="health" id="spartacus_health0">0</span></td><td><span id="spartacus_score0">0</span></td><td><span id="spartacus_stam0" class="stamina">?</span></td><td><span id="spartacus_pu0"></span></td><td><span id="spartacus_usepu0"></span></td></tr>'+
		'<tr id="spartacus_op1"><td style="height:38px;"><span id="spartacus_rank1">#2</span></td><td><span id="spartacus_name1">Opponent 1</span></td><td><span id="spartacus_diff1" class="difficulty"></span></td><td><span id="spartacus_respect1" class="respect">0</span></td><td><span class="health" id="spartacus_health1">0</span></td><td><span id="spartacus_score1">0</span></td><td><span id="spartacus_stam1" class="stamina">?</span><td><span id="spartacus_pu1"></span></td><td><span id="spartacus_usepu1"></span></td></tr>'+
		'<tr id="spartacus_op2"><td style="height:38px;"><span id="spartacus_rank2">#3</span></td><td><span id="spartacus_name2">Opponent 2</span></td><td><span id="spartacus_diff2" class="difficulty"></span></td><td><span id="spartacus_respect2" class="respect">0</span></td><td><span class="health" id="spartacus_health2">0</span></td><td><span id="spartacus_score2">0</span></td><td><span id="spartacus_stam2" class="stamina">?</span><td><span id="spartacus_pu2"></span></td><td><span id="spartacus_usepu2"></span></td></tr>'+
		'<tr id="spartacus_op3"><td style="height:38px;"><span id="spartacus_rank3">#4</span></td><td><span id="spartacus_name3">Opponent 3</span></td><td><span id="spartacus_diff3" class="difficulty"></span></td><td><span id="spartacus_respect3" class="respect">0</span></td><td><span class="health" id="spartacus_health3">0</span></td><td><span id="spartacus_score3">0</span></td><td><span id="spartacus_stam3" class="stamina">?</span><td><span id="spartacus_pu3"></span></td><td><span id="spartacus_usepu3"></span></td></tr>'+
		'<tr id="spartacus_op4"><td style="height:38px;"><span id="spartacus_rank4">#5</span></td><td><span id="spartacus_name4">Opponent 4</span></td><td><span id="spartacus_diff4" class="difficulty"></span></td><td><span id="spartacus_respect4" class="respect">0</span></td><td><span class="health" id="spartacus_health4">0</span></td><td><span id="spartacus_score4">0</span></td><td><span id="spartacus_stam4" class="stamina">?</span><td><span id="spartacus_pu4"></span></td><td><span id="spartacus_usepu4"></span></td></tr>'+
		'<tr id="spartacus_op5"><td style="height:38px;"><span id="spartacus_rank5">#6</span></td><td><span id="spartacus_name5">Opponent 5</span></td><td><span id="spartacus_diff5" class="difficulty"></span></td><td><span id="spartacus_respect5" class="respect">0</span></td><td><span class="health" id="spartacus_health5">0</span></td><td><span id="spartacus_score5">0</span></td><td><span id="spartacus_stam5" class="stamina">?</span><td><span id="spartacus_pu5"></span></td><td><span id="spartacus_usepu5"></span></td></tr>';
		
	readSettings();	
//	var MainIndexOf = '<div class="messages" style="background: url(https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/popup/rp_sales/stroke_of_midnight_bg.jpg) no-repeat; background-size: 100%;">'+
//	var MainIndexOf = '<div class="messages" style="background: url(https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/popup/rp_sales/carnival_craze_bg.jpg) no-repeat; background-size: 100%;">'+
	var MainIndexOf = '<div class="messages" style="background: url(https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/empire/london_hp_bg.png) no-repeat; background-size: 100%;">'+
	'<center style="height:10px">'+  
	' &nbsp; <span class="good"><font size="+1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NaN.&#12324; v'+NaNx.version+'</font></span> &nbsp; '+ 
	' &nbsp; <a href="#" style="margin:1px; float:right;" class="sexy_button_new short orange" id="close"><span><span><img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/iced.png"></span></span></a> &nbsp; '+ 
	' &nbsp; <a href="#" style="margin:1px; float:right;" class="sexy_button_new short green" id="makeit"><span><span>Start</span></span></a> &nbsp; '+ 
	' &nbsp; <a href="#" style="margin:1px; float:right;display:none;" class="sexy_button_new short red" id="STAHP"><span><span>Stop</span></span></a> &nbsp; '+ 
	' &nbsp; <a id="Settings" class="sexy_button_new short black" href="#" style="margin:1px; float:right;"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png" style="vertical-align:text-top;"></span></span></a> &nbsp; '+
	' &nbsp; <a id="NaNxAS" class="sexy_button_new short orange" style="margin:1px; float:right; display:none;" href="#"><span><span> Autostarting... (stop) </span></span></a> &nbsp; '+
	'</center>'+
	/*'<center><a class="sexy_button_new short green"><span><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif">  Energy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></center><br>'+*/
	'<br><hr>'+
	'<div id="NaNx_Config" style="display:none;">'+
	'<center><a style="width:450px;" class="sexy_button_new short orange"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png"> Settings </span></span></a></center><br>'+	
	'&nbsp;Apply <select id="NXSS" onChange="SkillSpending(this.value)"><option value="0">No!</option><option value="1">Attack</option><option value="2">Defense</option><option value="3">Health</option><option value="4">Energy</option><option value="5">Stamina</option></select> Skillpoints when out of resources<br>'+
	'&nbsp;Speed: <input type="radio" name="NaNxSpeed" id="fast" value="350" onChange="RadioCheck(this.value)">Fast <input name="NaNxSpeed" id="normal" type="radio" value="500" onChange="RadioCheck(this.value)">Normal <input name="NaNxSpeed" id="slow" type="radio" value="1000" onChange="RadioCheck(this.value)">Slow<br>'+
	'&nbsp;Restart In 5 Minutes? <input id="NaNx_restart" type="checkbox" class="nanx_input"/><br>'+
	'&nbsp;Spend <select id="SpendFirst" title="Spend Which Resource First" class="nanx_input">'+
	'<option value="0">Energy</option>'+
	'<option value="1">Stamina</option>'+
	'</select> First<br>'+
	'&nbsp;AutoStart? <input id="NaNx_AutoStart" type="checkbox" class="nanx_input"/><br><br>'+	
	//ARENA!
	'&nbsp;Arena:&nbsp;<select id="spartacus_arenatype" title="Select what Arena to join" class="nanx_input">'+(User.max_stamina<3000?'<option value="sw">20 Stamina</option>':'')+'<option value="lw">100 Stamina</option>'+(User.max_stamina>=3000?'<option value="hw">500 Stamina</option>':'')+'<option value="rw">1 Stamina (Special)</option></select>&nbsp;<input type="checkbox" id="spartacus_mobfury" title="Do 100/500 Mob-Fury Arenas instead of regular." class="nanx_input"/>Mob-Fury Arenas <span class="more_in">(only 100 or 500 stamina)</span><br>'+
	'&nbsp;Powerattack:&nbsp;<input type="checkbox" id="spartacus_powerattack" checked class="nanx_input"/>&nbsp;Number of attacks: <input type="text" id="spartacus_numatt" value="'+NaNx.Settings.nummatt+'" title="Number of attacks to batch, maximum=3" class="nanx_input"/>'+
	'&nbsp;Target to attack:<select id="spartacus_seltarget" title="Decide target priority" class="nanx_input">'+
	'	<option value="lowhealth">Lowest health alive</option>'+
	'	<option value="highhealth">Highest health</option>'+
	'	<option value="mostpoints">Most points alive</option>'+
	'	<option value="leastpoints">Least points alive</option>'+
	'	<option value="mostrespect">Most respect alive</option>'+
	'	<option value="leastrespect">Least respect alive</option>'+
	'	<option value="allalive">Attack all alive</option>'+
	'	<option value="leastdiff" selected>Least difficulty</option>'+
	'</select><br>'+
	'&nbsp;Don\'t attack defense shielded players: <input type="checkbox" id="spartacus_skipshield" checked title="Skip def shielded players" class="nanx_input" /><br />'+
	'&nbsp;Don\'t attack attack shielded players: <input type="checkbox" id="spartacus_skipshield_a" title="Skip att shielded players" class="nanx_input" /><br />'+
	'&nbsp;Use kamikazi at the last <input type="text" value="'+NaNx.Settings.BKamiS+'" id="spartacus_boostkami_s" class="nanx_input">s of the battle: <input type="checkbox" id="spartacus_boostkami" class="nanx_input" /><br>'+
	'&nbsp;Stop attacking: <select id="spartacus_stopon" title="In-arena play style" class="nanx_input">'+
	'<option value="never" selected>never (attack until stamina is gone)</option>'+
	'<option value="stop">now (do not attack)</option>'+
	'<option value="teamleading">when your team is leading by x points (only MobFury)</option>'+
	'<option value="leading">when having the lead by a specific number of points</option>'+
	'<option value="leading3">when having the 3rd place by a specific number of points</option>'+
	'<option value="leading5">when having the 5th place by a specific number of points</option>'+
	'<option value="staminaused">when specific amount of stamina used</option>'+
	'<option value="staminaleft">when specific amount of stamina left</option>'+
	'<option value="score">when score reached. Not 100% accurate!</option>'+
	'<option value="stars">when specific stars archieved (only MobFury)</option>'+
	'</select><span id="spartacus_show_stopon_value"> value: <input type="text" id="spartacus_stoponvalue" value="'+NaNx.Settings.StopV+'" style="width: 40px;" class="nanx_input" /></span><br>'+
	'&nbsp;Do not sort player list: <input type="checkbox" id="spartacus_sortplayer" class="nanx_input" />'+
	'<br><br><hr></div>'+
	'<div id="JobSelectionDiv">'+
	'<center><a style="width:450px;" class="sexy_button_new short green"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif"> Energy Options </span></span></a></center><br>'+
	'<span class="good">&nbsp;New York: </span><select id="NYJobs">'+ //LOLZ @ &nbsp;
	'<option value="none">--New York D1--</option>';
		for (i = 0; i < NYJobMap['D1'].length; i++) {
				MainIndexOf += '<option value="NY_1_' + i + '">' + NYJobMap['D1'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D2--</option>';
		for (i = 0; i < NYJobMap['D2'].length; i++) {
				MainIndexOf += '<option value="NY_2_' + i + '">' + NYJobMap['D2'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D3--</option>';
		for (i = 0; i < NYJobMap['D3'].length; i++) {
				MainIndexOf += '<option value="NY_3_' + i + '">' + NYJobMap['D3'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D4--</option>';
		for (i = 0; i < NYJobMap['D4'].length; i++) {
				MainIndexOf += '<option value="NY_4_' + i + '">' + NYJobMap['D4'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D5--</option>';
		for (i = 0; i < NYJobMap['D5'].length; i++) {
				MainIndexOf += '<option value="NY_5_' + i + '">' + NYJobMap['D5'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D6--</option>';
		for (i = 0; i < NYJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="NY_6_' + i + '">' + NYJobMap['D6'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D7--</option>';
		for (i = 0; i < NYJobMap['D7'].length; i++) {
				MainIndexOf += '<option value="NY_7_' + i + '">' + NYJobMap['D7'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D8--</option>';
		for (i = 0; i < NYJobMap['D8'].length; i++) {
				MainIndexOf += '<option value="NY_8_' + i + '">' + NYJobMap['D8'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--New York D9--</option>';
		for (i = 0; i < NYJobMap['D9'].length; i++) {
				MainIndexOf += '<option value="NY_9_' + i + '">' + NYJobMap['D9'][i].isName + '</option>'
		}
	MainIndexOf += '</select> <span class="energy_highlight"><span id="ADD_NYJOB">[Add Job]</span></span><br>'+
	
	'<span class="good">&nbsp;Brazil: </span><select id="BRLJobs">'+
	'<option value="none">--Brazil D1--</option>';
		for (i = 0; i < BRLJobMap['D1'].length; i++) {
				MainIndexOf += '<option value="BRL_1_' + i + '">' + BRLJobMap['D1'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil D2--</option>';
		for (i = 0; i < BRLJobMap['D2'].length; i++) {
				MainIndexOf += '<option value="BRL_2_' + i + '">' + BRLJobMap['D2'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil D3--</option>';
		for (i = 0; i < BRLJobMap['D3'].length; i++) {
				MainIndexOf += '<option value="BRL_3_' + i + '">' + BRLJobMap['D3'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil D4--</option>';
		for (i = 0; i < BRLJobMap['D4'].length; i++) {
				MainIndexOf += '<option value="BRL_4_' + i + '">' + BRLJobMap['D4'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil D5--</option>';
		for (i = 0; i < BRLJobMap['D5'].length; i++) {
				MainIndexOf += '<option value="BRL_5_' + i + '">' + BRLJobMap['D5'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil D6--</option>';
		for (i = 0; i < BRLJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="BRL_6_' + i + '">' + BRLJobMap['D6'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil D7--</option>';
		for (i = 0; i < BRLJobMap['D7'].length; i++) {
				MainIndexOf += '<option value="BRL_7_' + i + '">' + BRLJobMap['D7'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil D8--</option>';
		for (i = 0; i < BRLJobMap['D8'].length; i++) {
				MainIndexOf += '<option value="BRL_8_' + i + '">' + BRLJobMap['D8'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Brazil Face It--</option>';
		for (i = 0; i < BRLJobMap['D124'].length; i++) {
				MainIndexOf += '<option value="BRL_124_' + i + '">' + BRLJobMap['D124'][i].isName + '</option>'
		}
	MainIndexOf += '</select> <span class="energy_highlight"><span id="ADD_BRLJOB">[Add Job]</span></span><br>'+

	'<span class="good">&nbsp;Chicago: </span><select id="CHIJobs">'+
	'<option value="none">--Chicago D1--</option>';
		for (i = 0; i < CHIJobMap['D1'].length; i++) {
				MainIndexOf += '<option value="CHI_1_' + i + '">' + CHIJobMap['D1'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Chicago D2--</option>';
		for (i = 0; i < CHIJobMap['D2'].length; i++) {
				MainIndexOf += '<option value="CHI_2_' + i + '">' + CHIJobMap['D2'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Chicago D3--</option>';
		for (i = 0; i < CHIJobMap['D3'].length; i++) {
				MainIndexOf += '<option value="CHI_3_' + i + '">' + CHIJobMap['D3'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Chicago D4--</option>';
		for (i = 0; i < CHIJobMap['D4'].length; i++) {
				MainIndexOf += '<option value="CHI_4_' + i + '">' + CHIJobMap['D4'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Chicago D5--</option>';
		for (i = 0; i < CHIJobMap['D5'].length; i++) {
				MainIndexOf += '<option value="CHI_5_' + i + '">' + CHIJobMap['D5'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--Chicago D6--</option>';
		for (i = 0; i < CHIJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="CHI_6_' + i + '">' + CHIJobMap['D6'][i].isName + '</option>'
		}
	MainIndexOf += '</select> <span class="energy_highlight"><span id="ADD_CHIJobs">[Add Job]</span></span><br>'+

	'<span class="good">&nbsp;London: </span><select id="LONJobs">'+
	'<option value="none">--London D1--</option>';
		for (i = 0; i < LONJobMap['D1'].length; i++) {
				MainIndexOf += '<option value="LON_1_' + i + '">' + LONJobMap['D1'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D2--</option>';
		for (i = 0; i < LONJobMap['D2'].length; i++) {
				MainIndexOf += '<option value="LON_2_' + i + '">' + LONJobMap['D2'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D3--</option>';
		for (i = 0; i < LONJobMap['D3'].length; i++) {
				MainIndexOf += '<option value="LON_3_' + i + '">' + LONJobMap['D3'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D4--</option>';
		for (i = 0; i < LONJobMap['D4'].length; i++) {
				MainIndexOf += '<option value="LON_4_' + i + '">' + LONJobMap['D4'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D5--</option>';
		for (i = 0; i < LONJobMap['D5'].length; i++) {
				MainIndexOf += '<option value="LON_5_' + i + '">' + LONJobMap['D5'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D6--</option>';
		for (i = 0; i < LONJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="LON_6_' + i + '">' + LONJobMap['D6'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D7--</option>';
		for (i = 0; i < LONJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="LON_7_' + i + '">' + LONJobMap['D7'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D8--</option>';
		for (i = 0; i < LONJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="LON_8_' + i + '">' + LONJobMap['D8'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D9--</option>';
		for (i = 0; i < LONJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="LON_9_' + i + '">' + LONJobMap['D9'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--London D10--</option>';
		for (i = 0; i < LONJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="LON_10_' + i + '">' + LONJobMap['D10'][i].isName + '</option>'
		}
	MainIndexOf += '</select> <span class="energy_highlight"><span id="ADD_LONJobs">[Add Job]</span></span><br>'+
	
	'<span class="good">&nbsp;South Africa: </span><select id="SAJobs">'+
	'<option value="none">--South Africa D1--</option>';
		for (i = 0; i < SAJobMap['D1'].length; i++) {
				MainIndexOf += '<option value="SA_1_' + i + '">' + SAJobMap['D1'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D2--</option>';
		for (i = 0; i < SAJobMap['D2'].length; i++) {
				MainIndexOf += '<option value="SA_2_' + i + '">' + SAJobMap['D2'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D3--</option>';
		for (i = 0; i < SAJobMap['D3'].length; i++) {
				MainIndexOf += '<option value="SA_3_' + i + '">' + SAJobMap['D3'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D4--</option>';
		for (i = 0; i < SAJobMap['D4'].length; i++) {
				MainIndexOf += '<option value="SA_4_' + i + '">' + SAJobMap['D4'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D5--</option>';
		for (i = 0; i < SAJobMap['D5'].length; i++) {
				MainIndexOf += '<option value="SA_5_' + i + '">' + SAJobMap['D5'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D6--</option>';
		for (i = 0; i < SAJobMap['D6'].length; i++) {
				MainIndexOf += '<option value="SA_6_' + i + '">' + SAJobMap['D6'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D7--</option>';
		for (i = 0; i < SAJobMap['D7'].length; i++) {
				MainIndexOf += '<option value="SA_7_' + i + '">' + SAJobMap['D7'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D8--</option>';
		for (i = 0; i < SAJobMap['D8'].length; i++) {
				MainIndexOf += '<option value="SA_8_' + i + '">' + SAJobMap['D8'][i].isName + '</option>'
		}
		MainIndexOf += '<option value="none">--South Africa D9--</option>';
		for (i = 0; i < SAJobMap['D9'].length; i++) {
				MainIndexOf += '<option value="SA_9_' + i + '">' + SAJobMap['D9'][i].isName + '</option>'
		}		
		MainIndexOf += '<option value="none">--South Africa D10--</option>';
		for (i = 0; i < SAJobMap['D10'].length; i++) {
				MainIndexOf += '<option value="SA_10_' + i + '">' + SAJobMap['D10'][i].isName + '</option>'
		}		
		MainIndexOf += '<option value="none">--South Africa Cape Courage--</option>';
		for (i = 0; i < SAJobMap['D133'].length; i++) {
				MainIndexOf += '<option value="SA_133_' + i + '">' + SAJobMap['D133'][i].isName + '</option>'
		}	
		
	MainIndexOf += '</select> <span class="energy_highlight"><span id="ADD_SAJobs">[Add Job]</span></span><br>'+
	'<br>&nbsp;Job(s) to do: <span id="dragEm">Enable Sorting</span> <span style="display:none;" class="good" id="SortLists"> Lists are now sortable!</span><ul id="customjobs"></ul>'+
	'<span class="bad">&nbsp;*Jobs will be done in the above order!</span><br><br>'+

	'<center><a style="width:450px;" class="sexy_button_new short red"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"> Stamina Options </span></span></a></center><br>'+
	'<span class="good">&nbsp;Stamina: </span><select id="StamOpt">'+
	'<option value="STAM_1_Rob">Rob in NY</option><option disabled>Arena</option>'+
	'<option value="STAM_2_Arena">Spactacus v1.26</option><option disabled>SA D10 Stamina Jobs</option>';
	for (i = 0; i < StamJobs.length; i++) {
			MainIndexOf += '<option value="STAM_10_' + i + '">' + StamJobs[i].isName + '</option>'
	}
	MainIndexOf += '</select>'+
	'<span class="energy_highlight"><span id="ADD_StamOpts"> [Add <i>this</i>]</span></span><br><br>'+
	'&nbsp;Stamina Choice(s): <span id="dragEm">Enable Sorting</span><span style="display:none;" class="good" id="SortLists"> Lists are now sortable!</span><ul id="customStaminaChoice"></ul>'+
	'</div>'+
	
	'<div id="RunningDiv" style="display:none;">'+
	'Job: <span id="ActiveJob" class="energy_highlight"></span><br><br>'+
	'Job List: <span id="JobList" class="energy_highlight"></span><br>'+
	'Status: <span id="Activity" class=""></span><br><br>'+
	'Levelups: <span id="LvlUps" class="energy_highlight">0</span><br><br>'+
	'Last Levelup: <span id="LastLVL" class="energy_highlight"></span><br><br>'+
	'Levelup Speed: <span id="LVLUPSPD" class="energy_highlight"></span><br><br>'+
	'Jobs Done: <span id="JobsDone" class="energy_highlight">0</span><br><br>'+
	'Top Mafia: <span id="topmafia_stats" class="energy_highlight"></span><br><br>'+
	'Bandits Killed: <span id="BanditsKilled" class="energy_highlight">0</span><br><br>'+
	'<div id="gxRDivS" style="clear:both; display:none;">'+
	SpartStylez+
	'<table style="width:100%;">'+
	'<tr><td width="150">Stage:</td><td colspan=2><table width="100%"><tr><td><span id="spartacus_stage">Not started</span></td><td>Connection: <span id="spartacus_connstatus">-</span> <span id="spartacus_connstatus2"></span> <span id="spartacus_delay"></span></td><td>Crests: <span class=arena_mastery_crests id="spartacus_crests">Loading...</span></td></tr></table></td></tr>'+
	'<tr><td valign="top">Time left:</td><td colspan="2"><span id="spartacus_timeleftbar"></span></td></tr>'+
	'<tr><td valign="top">Power-Ups<br /><span class="more_in">(Click to use)</span>:</td><td colspan="2" valign="top"><span id="spartacus_powerups"></span></td></tr>'+
	'<tr><td>Stamina:</td><td colspan="2"><span class="stamina" id="spartacus_me_st">0</span>, next +<span id="spartacus_replenish">?</span> in <span id="spartacus_me_sr">0</span>s, used: <span class="stamina" id="spartacus_me_stused">0</span></td></tr>'+
	'<tr><td>Health:</td><td colspan="2"><span class="health" id="spartacus_me_health">100</span>% &nbsp; <span id="spartacus_healin"></span></td></tr>'+
	'<tr><td>Teamscores:</td><td colspan="2"><span id="spartacus_teamscore"></span></td></tr>'+
	'<tr><td colspan="3">'+
	'<table id="spartacus_table" cellspacing=0>'+
	optable+
	'</table>'+
	'</td></tr>'+
	'<tr><td valign="top"><a href="#" id="spartacus_toggleloot" title="Click to show/hide loot log">Loot/Stats:</a></td><td></td></tr>'+
	'<tr class="spartacus_lootlog"><td valign=top>Stats:</td><td colspan="2"><span id="spartacus_allstats"></span></td></tr>'+
	'<tr class="spartacus_lootlog"><td valign=top>Loot:</td><td colspan="2" id="spartacus_lootlog"></td></tr>'+
	'<tr><td valign="top"><a href="#" id="spartacus_togglearenas" title="Click to show/hide arena log">Arenas:</a></td><td></td></tr>'+
	'<tr class="spartacus_arenalog"><td valign=top></td><td colspan="2" id="spartacus_arenalog"></td></tr>'+
	'<tr><td colspan="3"><span id="spartacus_log"></span></td></tr>'+
	'</div>'+
	'</div></div><br>';
	
	function grabInfoz(){
		if(!NaNx.State.isRunning){
			return;
		}
		GrabCostCount = 0;
		if(NaNx.Counters.JobMapCount < NaNx.JobMap.length){
			if(NaNx.JobMap[NaNx.Counters.JobMapCount].isCost == 0){
				log('Grabbing Energy Requirements for '+NaNx.JobMap[NaNx.Counters.JobMapCount].isName);
				Dotravel(NaNx.JobMap[NaNx.Counters.JobMapCount].isCity, 'job', NaNx.JobMap[NaNx.Counters.JobMapCount].isTab, setTimeout(function(){grabENXP(NaNx.Counters.JobMapCount);},4000));
				return;
			}else{
				NaNx.Counters.JobMapCount++;
				grabInfoz();
				return;
			}
		}
		if(NaNx.Counters.StamMapCount < NaNx.StamMap.length){
			if(NaNx.StamMap[NaNx.Counters.StamMapCount].isCost == 0){
				log('Grabbing Stamina Requirements for '+NaNx.StamMap[NaNx.Counters.StamMapCount].isName);
				Dotravel(10, 'job', 10, setTimeout(function(){grabStamCost(NaNx.Counters.StamMapCount);},4000));
				return;
			}else{
				NaNx.Counters.StamMapCount++;
				grabInfoz();
				return;
			}
		}
		//if($("input:radio[@name=JobOrder]:checked").val() == 0){
		//	NaNx.JobMap.sort(orderByJobCost);
		//}
		if(isFirstLoad){
			isFirstLoad = false;
			document.getElementById('JobList').innerHTML = '';
			for(var i = 0; i < NaNx.JobMap.length; i++){
				var GetName = parseStuff(NaNx.JobMap[i].isName);
				NaNx.JobMap[i].isName = GetName.name;
				NaNx.JobMap[i].isRatio = GetName.ratio;
				document.getElementById('JobList').innerHTML += '<li style="list-style: none; background: none repeat scroll 0 0 #111111; border: 1px solid #333333; width:500px; margin:1px;"><img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_star_16x16_'+NaNx.JobMap[i].isMastered+'_01.gif">'+ NaNx.JobMap[i].isName+' <img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">'+ NaNx.JobMap[i].isCost+' <img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">'+NaNx.JobMap[i].isTheXP+' ('+NaNx.JobMap[i].isRatio+')</li>';
			}
			for(var i = 0; i < NaNx.StamMap.length; i++){
				if(['Gain The Cooperation Of Key Members Of Parliament (2.163)','Double Cross And Have Them Eliminated (2.222)','Offer Restitution To Terror Attack Victims (2.270)'].indexOf(NaNx.StamMap[i].isName) !== -1){
					var GetName = parseStuff(NaNx.StamMap[i].isName);
					NaNx.StamMap[i].isName = GetName.name;
					NaNx.StamMap[i].isRatio = GetName.ratio;
					document.getElementById('JobList').innerHTML += '<li style="list-style: none; background: none repeat scroll 0 0 #111111; border: 1px solid #333333; width:500px; margin:1px;"><img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_star_16x16_'+NaNx.StamMap[i].isMastered+'_01.gif">'+ NaNx.StamMap[i].isName+' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif">'+ NaNx.StamMap[i].isCost+' <img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">'+NaNx.StamMap[i].isTheXP+' ('+NaNx.StamMap[i].isRatio+')</li>';
				}else{
					document.getElementById('JobList').innerHTML += '<li style="list-style: none; background: none repeat scroll 0 0 #111111; border: 1px solid #333333; width:500px; margin:1px;"><img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/v3/family_icon_19x19pixels.png">'+ NaNx.StamMap[i].isName+' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif">'+ NaNx.StamMap[i].isCost+'</li>';
				}
			}
		}
		var new_job;
		var EnergySelected = CheckEnergyArray();
		var StaminaSelected = CheckStaminaArray();
		if(EnergySelected == 'nonefound'||NaNx.Settings.StamFirst == 1 && StaminaSelected != 'nonefound'){
			var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
			if(StaminaSelected != 'nonefound'){
				var starM = '';
				NaNx.Counters.switchNRG = DoesIHaveEnergy;
				NaNx.CurrentStaminaJob = new Array();
				if(NaNx.StamMap[StaminaSelected].isTab == 'arena'){
					NaNx.StamMap[StaminaSelected].isCost = parseInt($('#spartacus_arenatype>option:selected').text())
					if(NaNx.StamMap[StaminaSelected].isCost > parseInt(document.getElementById('user_stamina').innerHTML)){
						grabInfoz();
						return;
					}else{
						document.getElementById('ActiveJob').innerHTML = 'Spartacus v1.26 by Team Spockholm'
						startarena();
						return;
					}
				}
				if(NaNx.StamMap[StaminaSelected].isOldCity == 'Robbing in NY'){
					new_job = {isName:"Robbing in NY",isCity:1, isCost:25,isTab:"robbing"};
				}else{
					new_job = {isName:NaNx.StamMap[StaminaSelected].isName,isJobID:NaNx.StamMap[StaminaSelected].isJobID,isCity:NaNx.StamMap[StaminaSelected].isCity, isCost:NaNx.StamMap[StaminaSelected].isCost,isTab:NaNx.StamMap[StaminaSelected].isTab,isTheXP:NaNx.StamMap[StaminaSelected].isTheXP,isMastered:"Unknown"};
					starM = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_star_16x16_'+NaNx.StamMap[StaminaSelected].isMastered+'_01.gif">';
				} 
				NaNx.CurrentStaminaJob.push(new_job);
				document.getElementById('ActiveJob').innerHTML = starM + NaNx.CurrentStaminaJob[0].isName;
				if(NaNx.CurrentStaminaJob[0].isName == 'Robbing in NY'){
					Dotravel(1, 'robbing', 'robbing', setTimeout(function(){NaNx.State.isBlocking = false;PreRob();},3500));
				}else{
					Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBlocking = false;StamJobIt();},3500));				
				}
				return;
			}
		}
		if(EnergySelected == 'nonefound' && StaminaSelected == 'nonefound'){
			SPAvaiable = parseInt($('#user_skill').text());	
			if(SPAvaiable > 0 && NaNx.Settings.SkillToSpend != 'none'){
				SkillPointAssinRunning = true;
				SpendSkillCycle();
				return;
			}
			if($('#NaNx_restart').is(':checked')){
				log('Outta NRG & Stamina restarting in 5 minutes ('+displayTime()+')');
				$('#Activity').append(' <a href="#" id="insta_RS">(Restart Now)</a>');
				NaNx.ClickGo = setTimeout(function(){grabInfoz();},1000*60*5)
				$('#insta_RS').click(function(){
					clearTimeout(NaNx.ClickGo);
					log('Attempting a restart...');
					grabInfoz();				
					return false;
				});
				if(NaNx.StamMap[0].isTab == 'arena'){
					$('#Activity').append(' <a href="#" id="insta_ARS">(Try Retrieve Stamina)</a>');
					$('#insta_ARS').click(function(){
						clearTimeout(NaNx.ClickGo);
						log('Attempting a restart...');
						GrabRequest('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8', 'none', function(msg){
							do_ajax('inner_page', 'remote/html_server.php?xw_controller=index&xw_action=view', 1, 1, 0, 0); 
							setTimeout(function(){grabInfoz();},6000);
						});
						return false;
					});
				}
			}else{
				log('Outta NRG & Stamina');
				$('#STAHP').click();
			}
			return;
		}
		$('#gxRDivS').hide();
		NaNx.CurrentEnergyJob = new Array();
		if(StaminaSelected == 'nonefound' && NaNx.Settings.StamFirst == 1){
			var setupfakeStamJob = {isCost:NaNx.StamMap[0].isCost};
			NaNx.CurrentStaminaJob.push(setupfakeStamJob);
		}
		if(NaNx.JobMap[EnergySelected].isOldCity){
			new_job = {isName:NaNx.JobMap[EnergySelected].isName,isJobID:NaNx.JobMap[EnergySelected].isJobID, isCost:NaNx.JobMap[EnergySelected].isCost,isTheXP:NaNx.JobMap[EnergySelected].isTheXP,isTab:NaNx.JobMap[EnergySelected].isTab,isCity:NaNx.JobMap[EnergySelected].isCity,isOldCity: true, isFlashNY: false, isUsingButton: false, isMastered:NaNx.JobMap[EnergySelected].isMastered, isRatio:NaNx.JobMap[EnergySelected].isRatio};
		}else{
			new_job = {isName:NaNx.JobMap[EnergySelected].isName,isJobID:NaNx.JobMap[EnergySelected].isJobID, isCost:NaNx.JobMap[EnergySelected].isCost,isTheXP:NaNx.JobMap[EnergySelected].isTheXP,isTab:NaNx.JobMap[EnergySelected].isTab,isCity:NaNx.JobMap[EnergySelected].isCity,isOldCity: false, isFlashNY: false, isUsingButton: true, isMastered:NaNx.JobMap[EnergySelected].isMastered, isRatio:NaNx.JobMap[EnergySelected].isRatio};
		}
		NaNx.CurrentEnergyJob.push(new_job);
		if(NaNx.CurrentEnergyJob[0].isCost == 0){
			log('no nrg')
			return;
		}
		document.getElementById('ActiveJob').innerHTML = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_star_16x16_'+NaNx.CurrentEnergyJob[0].isMastered+'_01.gif">' +NaNx.CurrentEnergyJob[0].isName+' ('+NaNx.CurrentEnergyJob[0].isRatio+')';
		Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBlocking = false;doTheJob();},3000));
	}
	
	function parseStuff( str ) { // By Esa
		var re = /^(.*?)\(([0-9.]+)\)/
		var matches = str.match( re );
		if( matches && matches.length == 3 ) {
			return {
				name: matches[1],
				ratio: parseFloat( matches[2] ).toFixed(3)
			}
		}
		return null;
	}	
	
	function orderByJobCost(a, b) {
		return b.isCost - a.isCost;
	}
	
	function CheckEnergyArray() {
		var Energy = parseInt(document.getElementById('user_energy').innerHTML);
		var fail = 'nonefound';
		var CurrentNRG = parseInt(document.getElementById('user_energy').innerHTML);
		var CurrentSTAM = parseInt(document.getElementById('user_stamina').innerHTML);
		var CurrentXP2LVL = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		var combinedEn2xp = (CurrentXP2LVL/(CurrentNRG+CurrentSTAM)).toFixed(2);
		/*if($("input:radio[@name=JobOrder]:checked").val() == 1){
		//(SortByRatio){
			for(i = 0; i < NaNx.JobMap.length; i++){
				LevelAttempt = false;
				if(i+1 >= NaNx.JobMap.length){
					if(NaNx.JobMap[0].isCost <= Energy) {
						return 0;
					}else{
						for(var lvl=0; lvl< NaNx.JobMap.length; lvl++) {
							if (NaNx.JobMap[lvl].isCost <= Energy) {
								LevelAttempt = true;
								return lvl;
							}else if(lvl == NaNx.JobMap.length-1){
								return fail;
							}
						}
					}
				}else if(combinedEn2xp < NaNx.JobMap[i].isRatio && NaNx.JobMap[i+1].isRatio > combinedEn2xp){
					if(NaNx.JobMap[i+1].isCost <= Energy){
						logit((i+1)+' '+NaNx.JobMap[i+1].isName)
						return i+1;
					}
				}
			}
		}else{ */
//		(SortByCost){
			for(var i=0; i< NaNx.JobMap.length; i++) {
				if (NaNx.JobMap[i].isCost <= Energy) {
					return i;
				}else if(i == NaNx.JobMap.length-1){
					return fail;
				}
			}
	//	}
	}
	
	function CheckStaminaArray() {
		var Stamina = parseInt(document.getElementById('user_stamina').innerHTML);
		var fail = 'nonefound';
		for(var i=0; i< NaNx.StamMap.length; i++) {
			if (NaNx.StamMap[i].isCost <= Stamina) {
				return i;
			}else if(i == NaNx.StamMap.length-1){
				return fail;
			}
		}
	}
	
	function grabENXP(num){
		if(!NaNx.State.isRunning){
			return;
		}
		var JobToCheck;
		if(NaNx.JobMap[num].isUsingButton) {
			JobToCheck = $('#btn_dojob_' + NaNx.JobMap[num].isJobID);
		}else {
			JobToCheck = $('#city_job_'+ NaNx.JobMap[num].isJobID);
		}
		if (JobToCheck.length < 1){
			GrabCostCount++;
			if(GrabCostCount > 3){
				Dotravel(NaNx.JobMap[NaNx.Counters.JobMapCount].isCity, 'job', NaNx.JobMap[NaNx.Counters.JobMapCount].isTab, setTimeout(function(){GrabCostCount = 0; grabENXP(NaNx.Counters.JobMapCount);},4000));
				return;
			}
			setTimeout(function(){grabENXP(num);},3000);
			return;
		}
		if(NaNx.JobMap[num].isOldCity){
			NaNx.JobMap[num].isCost = parseInt($('#city_job_' + NaNx.JobMap[num].isJobID + ' > .job_energy > .energy').text());
			NaNx.JobMap[num].isTheXP = parseInt($('#city_job_' + NaNx.JobMap[num].isJobID + ' > .job_reward > .experience').text());
			NaNx.JobMap[num].isRatio = (NaNx.JobMap[num].isTheXP/NaNx.JobMap[num].isCost).toFixed(3);
			try{
				var getmastery = $('#city_job_' + NaNx.JobMap[num].isJobID + ' > .job_name').text();
				if(/Level 3 Mastered/.test(getmastery)){
				//Gold mastery
					NaNx.JobMap[num].isMastered = "gold";
				}else if(/Level 2 Mastered/.test(getmastery)){
				//Silver mastery
					NaNx.JobMap[num].isMastered = "silver";
				}else{
				//Bronze mastery
					NaNx.JobMap[num].isMastered = "bronze";
				}
			}catch(none){
				NaNx.JobMap[num].isMastered = "ruby";
			}
		}else {
			NaNx.JobMap[num].isCost = parseInt($('#job-id-' + NaNx.JobMap[num].isJobID + ' > .job_details.clearfix > .uses.clearfix > .energy').attr('current_value'));
			NaNx.JobMap[num].isTheXP = parseInt($('#job-id-' + NaNx.JobMap[num].isJobID + ' > .job_details.clearfix > .pays.clearfix > .experience').attr('current_value'));
			NaNx.JobMap[num].isRatio = (NaNx.JobMap[num].isTheXP/NaNx.JobMap[num].isCost).toFixed(3);
			try{
				var MasteredSoFar = $('#job-id-' + NaNx.JobMap[num].isJobID).closest("[class^='district']").attr('class'); //district  mastery_level_2
				var MasteredSoFarSplit = MasteredSoFar.split('_');
				if(parseInt(MasteredSoFarSplit[2]) == 4){
				//ruby mastery
					NaNx.JobMap[num].isMastered = "ruby";
				}else if(parseInt(MasteredSoFarSplit[2]) == 3){
				//Gold mastery
					NaNx.JobMap[num].isMastered = "gold";
				}else if(parseInt(MasteredSoFarSplit[2]) == 2){
				//Silver mastery
					NaNx.JobMap[num].isMastered = "silver";
				}else if(parseInt(MasteredSoFarSplit[2]) == 1||MasteredSoFarSplit[2] == null){
				//Bronze mastery
					NaNx.JobMap[num].isMastered = "bronze";
				}
			}catch(none){
				NaNx.JobMap[num].isMastered = "ruby";
			}
		}
		if(NaNx.JobMap[num].isCost == 0||isNaN(NaNx.JobMap[num].isCost)){
			Dotravel(NaNx.JobMap[NaNx.Counters.JobMapCount].isCity, 'job', NaNx.JobMap[NaNx.Counters.JobMapCount].isTab, setTimeout(function(){GrabCostCount = 0; grabENXP(NaNx.Counters.JobMapCount);},4000));
		}else{
			setTimeout(function(){grabInfoz();},2500);
		}
	}
	
	function grabStamCost(num){
		if(!NaNx.State.isRunning){
			return;
		}
		var JobToCheck = $('#btn_dojob_'+NaNx.StamMap[num].isJobID)
		if (JobToCheck.length < 1){
			GrabCostCount++;
			if(GrabCostCount > 3){
				Dotravel(10, 'job', 10, setTimeout(function(){GrabCostCount = 0; grabStamCost(num);},4000));
				return;
			}
			setTimeout(function(){grabENXP(num);},3000);
			return;
		}
		NaNx.StamMap[num].isCost = parseInt($('#job-id-' + NaNx.StamMap[num].isJobID + ' > .job_details.clearfix > .uses.clearfix > .stamina').attr('current_value'));
		NaNx.StamMap[num].isTheXP = parseInt($('#job-id-' + NaNx.StamMap[num].isJobID + ' > .job_details.clearfix > .pays.clearfix > .experience').attr('current_value'));
		NaNx.StamMap[num].isRatio = (NaNx.StamMap[num].isTheXP/NaNx.StamMap[num].isCost).toFixed(3);
		try{
			var MasteredSoFar = $('#job-id-' + NaNx.StamMap[num].isJobID).closest("[class^='district']").attr('class'); //district  mastery_level_2
			if (MasteredSoFar == null||MasteredSoFar.length < 1){
				setTimeout(function(){grabStamCost();},2500);
				return;
			}
			var MasteredSoFarSplit = MasteredSoFar.split('_');
			if(parseInt(MasteredSoFarSplit[2]) == 4){
			//ruby mastery
				NaNx.StamMap[num].isMastered = "ruby";
			}else if(parseInt(MasteredSoFarSplit[2]) == 3){
			//Gold mastery
				NaNx.StamMap[num].isMastered = "gold";
			}else if(parseInt(MasteredSoFarSplit[2]) == 2){
			//Silver mastery
				NaNx.StamMap[num].isMastered = "silver";
			}else if(parseInt(MasteredSoFarSplit[2]) == 1||MasteredSoFarSplit[2] == null){
			//Bronze mastery
				NaNx.StamMap[num].isMastered = "bronze";
			}
		}catch(none){
			NaNx.StamMap[num].isMastered = "ruby";
		}
		if(NaNx.StamMap[num].isCost == 0||isNaN(NaNx.StamMap[num].isCost)){
			Dotravel(10, 'job', 10, setTimeout(function(){grabStamCost(num);},4000));
		}else{
			setTimeout(function(){grabInfoz();},2500);
		}
	}
	
	function PreRob(){
		if(!NaNx.State.isRunning){
			return;
		}
		CloseDoopidPopup();
		var DoesIHaveStam = parseInt(document.getElementById('user_stamina').innerHTML);
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		if(DoesIHaveEnergy > NaNx.Counters.switchNRG+10 && NaNx.Settings.StamFirst != 1){
			setTimeout(function(){grabInfoz();},2500);
			return;
		}
		if(DoesIHaveStam < 20 && DoesIHaveEnergy < NaNx.CurrentEnergyJob[0].isCost){
			setTimeout(function(){grabInfoz();},2500);
			return;
		}
		if(DoesIHaveStam < 20){
			setTimeout(function(){grabInfoz();},2500);
			return;
		}
		var tabtest = document.evaluate('//li[contains(@class, "tab_on")]//a[contains(., "Robbing")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
		if (tabtest == 0){
			Dotravel(1, 'robbing', 'robbing', setTimeout(function(){PreRob();},3500))
			return;
		}
		var slotcount = 8;
		for (var i=8; i >=0; i--) {
			GrabRequest('remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=1&slot='+slotcount, 'none', function(msg){
				NaNx.Counters.slotsrobbed++;
				if(msg.indexOf('You are now LEVEL')!=-1) {
					logit('Levelup!');
					leveluped();
				}
				if(NaNx.Counters.slotsrobbed == 9){
					refb();
				}
			});
			slotcount--;
		}
	}	
	
	function refb(){
		if(!NaNx.State.isRunning){
			return;
		}
		NaNx.Counters.slotsrobbed = 0;
		GrabRequest('remote/html_server.php?xw_controller=robbing&xw_action=refresh', 'none', function(msg){
			Dotravel(1, 'robbing', 'robbing', setTimeout(function(){PreRob();},3500));
		});
	}
	
	function CloseDoopidPopup(){
		if($('.pop_bg').length>0){
			$('.pop_bg').each( function(){
				var id = this.id;
				MW.Popup.hide( id.substr( id.lastIndexOf("_") +1 ) );
			});
		}
	}
	
	function grab_bonus() {
		GrabRequest('xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city=1&mwcom=1&no_load=1&xw_client_id=8','lvlup',function(page){
			if (page.indexOf('ERROR 500: response never closed')!=-1) {
				return;
			} else {
				var data = JSON.parse(page.replace(/^(\s\d\s+)/,''));
				document.getElementById('LastLVL').innerHTML = 'Level: '+data.user_fields.user_level+' You received: '+data.bonusName;
			}
		});
	};
	
	function GrabRequest(url, type, handler, errorhandler) {
		if(!NaNx.State.isRunning){
			return;
		}
		if(url.indexOf('html_server.php') >= 0){
			url = url.substr(url.indexOf('?')+1);
		}
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			timeout: 10000,
			data: params,
			cache: false,
			success: function(e){
				if (/ERROR 500/.test(e) && type != 'lvlup') {
					setTimeout(function () {
						GrabRequest(url, type, handler);
					}, 333)
				}else{
				    try { 
                        var user_update = JSON.parse(e);
                        user_fields_update(user_update.user_fields);
                        user_info_update(user_update.user_fields, user_update.user_info);
                    } catch (err) {}
					handler(e)
                }
			},
			error: function(e){
				NaNx.Counters.ajaxerr0r++;
				if(NaNx.Counters.ajaxerr0r > 2 && type != 'lvlup'){
					NaNx.Counters.ajaxerr0r = 0;
					setTimeout(function () {
						GrabRequest(url, type, handler);
					}, 333);
				}else if (type != 'lvlup'){
					setTimeout(function () {
						GrabRequest(url, type, handler);
					}, 333);
				}
			}
		});
	}

	function Dotravel(destination, from, tab, callback) {
		if(!NaNx.State.isRunning){
			return;
		}
	    var userid = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
		var fromCity = CurrentCity();
        var url = 'html_server.php?xw_controller=travel&xw_action=travel';
        var data = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,  
			'cb': (userid + parseInt(new Date().getTime().toString().substring(0, 10))),
			'xw_client_id': 8,
			'destination': destination || 1,
			'from': from || 'job',
			'tab': tab || 1,
			'zone': 1
		};
		if(tab == 'robbing'){
			delete data.tab;	
		}if(tab == 'homeit'){
			url = 'html_server.php?xw_controller=index&xw_action=view';
			delete data.ajax;	
			delete data.liteload;	
			delete data.sf_xw_user_id;	
			delete data.sf_xw_sig;	
			delete data.cb;	
			delete data.destination;	
			delete data.from;
			delete data.tab;
			delete data.zone;		
		}
        $.ajax({
			url:url,
			data:data,
            success: function (htmlText) {
                var $htmlText = $(htmlText);
                $('#inner_page').empty();
                $('#inner_page').html(htmlText);
				User.page = setCurrentCity(htmlText);
                if (fromCity != (CurrentCity($htmlText))) {
					if (typeof callback == 'function'){
						setTimeout(function(){
							callback && callback();
						},5000);
					}
				}
			},
			error: function (EEEE){
				setTimeout(function(){ Dotravel(destination, from, tab, function(){
						callback();
					}); 
				},2000);
			}
        });

        function CurrentCity(html) {
            var CityData = html || document.body.innerHTML;
            var CurrentCityr;
            if (/current_city_id'.\s*=\s*parseInt."(\d)".;/i.test(CityData)) {
                CurrentCityr = /current_city_id'.\s*=\s*parseInt."(\d)".;/i.exec(CityData)[1];
            } else {
                CurrentCityr = String($(CityData).find('#mw_city_wrapper').attr('class')).substring(7);
            }
            return (CurrentCityr)
        }
    }
	
	function setCurrentCity(shtml) {
		// get User object, error free, undefined if not found.
		var usr = User&&User.page ? User : (unsafeWindow||window||{}).User;
		if (!(usr && usr.page)){
			// in case no User object, some weird thing happens, abort.
			logit('Fatal error: No user object found.');
		} else {
			// only if response is a valid string
			if (typeof shtml === 'string') {
				// match only in full page loads.
				var page_rex = /Page:\s*([a-zA-Z]*)_controller/i;
				// test if the page is a full page load
				if (page_rex .test(shtml)) {
					// assign page name to User.page game var.
					usr.page = page_rex.exec(shtml)[1];
					// assign page name to game inner div.
					$('#inner_page').attr('class', usr.page + '_controller');
				}
			}
		// end else
		}
		// return current page, if assign fails, return the old one.
		return usr.page;
	}
	
	function logit(msg) {
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
	
	function log(msg) {
		$('#Activity').text(msg);
	}
	
	function create_div() {
		if(document.getElementById('gxDiv')) {
			document.getElementById('gxDiv').innerHTML = MainIndexOf;
		} else {
			var gxDiv=document.createElement("div");
			gxDiv.id = 'gxDiv';
			var content=document.getElementById('content_row');
			content.insertBefore(gxDiv, content.firstChild);
			document.getElementById('gxDiv').innerHTML = MainIndexOf;
		}
	}
	create_div();
	
	$('#close').click(function(){
		window.stop();
		clearInterval(NaNx.SendJobReq);
		clearTimeout(NaNx.ClickGo);	
		clearInterval(restart_in_counter);
		SkillPointAssinRunning = false;
		NaNx.State.isRunning = false;
		run = false;
		closed = true;
		try {
			socke.close();
		} catch(noopenedyet) {}
		$('#gxDiv').remove();
	});

	RadioCheck = function(n){
		if (NaNx.Settings.Speed != n){
			NaNx.Settings.Speed = n;
		}
		writeSettings();
	}
	
	SkillSpending = function (n) {
		if (NaNx.Settings.SkillSpending != n) {
			NaNx.Settings.SkillSpending = n;
		}
		writeSettings();
		switch (parseInt(n)) {
			case 0:
				NaNx.Settings.SkillToSpend = 'none';
				SkillsTo = 'None';
				break;
			case 1:
				NaNx.Settings.SkillToSpend = 'attack';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-attack.gif"/> Attack!';
				break;
			case 2:
				NaNx.Settings.SkillToSpend = 'defense';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-defense.gif"/> Defense!';
				break;
			case 3:
				NaNx.Settings.SkillToSpend = 'max_health';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-health.gif"/> Health!';
				break;
			case 4:
				NaNx.Settings.SkillToSpend = 'max_energy';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif"/> Energy!';
				break;
			case 5:
				NaNx.Settings.SkillToSpend = 'max_stamina';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"/> Stamina!';
				break;
		}
	};
	
	$('input[name=NaNxSpeed][value='+NaNx.Settings.Speed+']').prop("checked",true);
	$('#NXSS option:eq(' + NaNx.Settings.SkillSpending + ')').prop('selected', true);
	SkillSpending(NaNx.Settings.SkillSpending);
		
	$('#ADD_NYJOB').click(function(){
		$('#NYJobs option:selected').each(function() {
			if($('ul#customjobs li:contains("'+$('#NYJobs>option:selected').text()+'")').length > 0) {
				return;
			}else{
				$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$('#NYJobs>option:selected').text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+$('#NYJobs').val()+'">X</a></span></span>'));
				$(this).hide();
			}
		});
	}); 

	$('#ADD_BRLJOB').click(function(){
		$('#BRLJobs option:selected').each(function() {
			if($('ul#customjobs li:contains("'+$('#BRLJobs>option:selected').text()+'")').length > 0) {
				return;
			}
			$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$('#BRLJobs>option:selected').text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+$('#BRLJobs').val()+'">X</a></span></span>'));
			$(this).hide();
		});
	}); 
	
	$('#ADD_CHIJobs').click(function(){
		$('#CHIJobs option:selected').each(function() {
			if($('ul#customjobs li:contains("'+$('#CHIJobs>option:selected').text()+'")').length > 0) {
				return;
			}
			$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$('#CHIJobs>option:selected').text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+$('#CHIJobs').val()+'">X</a></span></span>'));
			$(this).hide();
		});
	}); 
	
	$('#ADD_LONJobs').click(function(){
		$('#LONJobs option:selected').each(function() {
			if($('ul#customjobs li:contains("'+$('#LONJobs>option:selected').text()+'")').length > 0) {
				return;
			}
			$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$('#LONJobs>option:selected').text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+$('#LONJobs').val()+'">X</a></span></span>'));
			$(this).hide();
		});
	}); 
	
	$('#ADD_SAJobs').click(function(){
		$('#SAJobs option:selected').each(function() {
			if($('ul#customjobs li:contains("'+$('#SAJobs>option:selected').text()+'")').length > 0) {
				return;
			}
			$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$('#SAJobs>option:selected').text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+$('#SAJobs').val()+'">X</a></span></span>'));
			$(this).hide();
		});
	}); 
	
	$('#ADD_StamOpts').click(function(){
		$('#StamOpt option:selected').each(function() {
			if($('ul#customStaminaChoice li:contains("'+$('#StamOpt>option:selected').text()+'")').length > 0) {
				return;
			}
			if($('ul#customStaminaChoice li:contains("Spactacus v1.26")').length > 0) {
				return;
			}
			if($('#StamOpt').val() == 'STAM_2_Arena'){
				$('#customStaminaChoice li a').each(function(){
					$("#StamOpt option[value=" + $(this).attr('id') + "]").show();
					$(this).parent().parent().parent().remove();
				})
			}
			$('#customStaminaChoice').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$('#StamOpt>option:selected').text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+$('#StamOpt').val()+'">X</a></span></span>'));
			$(this).hide();
		});
	});
	
	$('.clearitem').live('click', function(){
		var selectedMenu = $(this).attr('id').split('_');
		selectedMenu = selectedMenu[0];
		if(selectedMenu == 'NY'){
			$("#NYJobs option[value=" + $(this).attr('id') + "]").show();
		}else if(selectedMenu == 'BRL'){
			$("#BRLJobs option[value=" + $(this).attr('id') + "]").show();
		}else if(selectedMenu == 'CHI'){
			$("#CHIJobs option[value=" + $(this).attr('id') + "]").show();
		}else if(selectedMenu == 'LON'){
			$("#LONJobs option[value=" + $(this).attr('id') + "]").show();
		}else if(selectedMenu == 'SA'){
			$("#SAJobs option[value=" + $(this).attr('id') + "]").show();
		}else if(selectedMenu == 'STAM'){
			$("#StamOpt option[value=" + $(this).attr('id') + "]").show();
		}
		$(this).parent().parent().parent().remove();
		return false;
	});
	
	$('#makeit').click(function(){
		clearTimeout(NaNx.ClickGo);	
		$('#NaNxAS').hide();
		NaNx.Settings.isHiding = new Array();
		$('#customjobs li a').each(function(){
			var new_job;
			NaNx.Settings.isHiding.push($(this).attr('id'));
			var info = $(this).attr('id').split('_');
			var city = info[0];
			var district = 'D'+parseInt(info[1]);
			var job = parseInt(info[2]);
			if(city == 'NY'){
				new_job = {isName:NYJobMap[district][job].isName, isJobID:NYJobMap[district][job].isJobID, isTab:NYJobMap[district][job].isTab, isCity:NYJobMap[district][job].isCity, isCost:NYJobMap[district][job].isCost, isOldCity: true, isFlashNY: false, isUsingButton: false};
			}else if(city == 'NY' && district == 'D1'){//['37','8','5','4','3','2','1'].indexOf(job) !== -1){
				var extra = (NYJobMap[district][job].isTheXP/NYJobMap[district][job].isCost).toFixed(3);
				new_job = {isName:NYJobMap[district][job].isName, isJobID:NYJobMap[district][job].isJobID, isTab:NYJobMap[district][job].isTab, isCity:NYJobMap[district][job].isCity, isCost:NYJobMap[district][job].isCost, isOldCity: false, isFlashNY: true, isUsingButton: false, isCost: NYJobMap[district][job].isCost, isTheXP: NYJobMap[district][job].isTheXP, isRatio: extra};
			}else if(city == 'BRL'){
				new_job = {isName:BRLJobMap[district][job].isName, isJobID:BRLJobMap[district][job].isJobID, isTab:BRLJobMap[district][job].isTab, isCity:BRLJobMap[district][job].isCity, isCost:BRLJobMap[district][job].isCost, isOldCity: false, isFlashNY: false, isUsingButton: true};
			}else if(city == 'CHI'){
				new_job = {isName:CHIJobMap[district][job].isName, isJobID:CHIJobMap[district][job].isJobID, isTab:CHIJobMap[district][job].isTab, isCity:CHIJobMap[district][job].isCity, isCost:CHIJobMap[district][job].isCost, isOldCity: false, isFlashNY: false, isUsingButton: true};
			}else if(city == 'LON'){
				new_job = {isName:LONJobMap[district][job].isName, isJobID:LONJobMap[district][job].isJobID, isTab:LONJobMap[district][job].isTab, isCity:LONJobMap[district][job].isCity, isCost:LONJobMap[district][job].isCost, isOldCity: false, isFlashNY: false, isUsingButton: true};
			}else if(city == 'SA'){
				new_job = {isName:SAJobMap[district][job].isName, isJobID:SAJobMap[district][job].isJobID, isTab:SAJobMap[district][job].isTab, isCity:SAJobMap[district][job].isCity, isCost:SAJobMap[district][job].isCost, isOldCity: false, isFlashNY: false, isUsingButton: true};
			}	
			NaNx.JobMap.push(new_job);
		});
		if(NaNx.JobMap.length < 1){
			alert('You must add at least one job');
			return;
		}
		$('#customStaminaChoice li a').each(function(){
			var new_job;
			NaNx.Settings.isHiding.push($(this).attr('id'));
			var info = $(this).attr('id').split('_');
			var InfoZ = parseInt(info[2]);
			if(isNaN(InfoZ)){
				if(info[2] == 'Arena'){
					var tmparenacost = parseInt($('#spartacus_arenatype>option:selected').text())
					new_job = {
						isName:"Spartacus v1.26", isCity:1, isCost:tmparenacost, isTab:"arena"
					};
				}else{
					new_job = {
						isName:"Robbing in NY",isCity:1, isCost:25,isTab:"robbing"
					};
				}
			}else{
				new_job = {
					isName:StamJobs[InfoZ].isName,isJobID:StamJobs[InfoZ].isJobID,isCity:StamJobs[InfoZ].isCity, isCost:StamJobs[InfoZ].isCost,isTab:StamJobs[InfoZ].isTab,isTheXP:StamJobs[InfoZ].isTheXP,isMastered:"Unknown"
				};
			}
			NaNx.StamMap.push(new_job);
		});
//		logit(JSON.stringify(NaNx.StamMap, null, 4))
//		return;
		if(NaNx.StamMap.length < 1){
			alert('You must add at least one Stamina Option');
			return;
		}
		writeSettings();
		$('#makeit').hide();
		$('#STAHP').show();
		$('#JobSelectionDiv').hide();
		$('#RunningDiv').show();	
		t1 = new Date()
		grabInfoz();
	});
	
	$('#dragEm').live('click', function(){
		if(NaNx.State.isSorting){
			$('#customjobs').sortable();
			$('#customjobs').disableSelection();
			$('#customStaminaChoice').sortable();
			$('#customStaminaChoice').disableSelection();		
			$("[id='dragEm']").text('Disable Sorting');
			$("[id='SortLists']").show();			
			NaNx.State.isSorting = false;
		}else{
			$('#customjobs').sortable('destroy');
			$('#customjobs').disableSelection('destroy');
			$('#customStaminaChoice').sortable('destroy');
			$('#customStaminaChoice').disableSelection('destroy');
			$("[id='dragEm']").text('Enable Sorting');
			$("[id='SortLists']").hide();
			NaNx.State.isSorting = true;
		}
	});
	
	$('#STAHP').click(function(){
		if(NaNx.State.isRunning){
			$('#STAHP').html('<span><span>GO!!!!</span></span>');
			log('Starting..');
			$(this).addClass('green');
			$(this).removeClass('red');			
			NaNx.State.isRunning = false;
			clearTimeout(NaNx.ClickGo);	
			clearInterval(NaNx.SendJobReq);	
			SkillPointAssinRunning = false;
			log('NaNx Stopped...');
			window.stop();
		}else{
			$('#STAHP').html('<span><span>Stop!</span></span>');
			$(this).addClass('red');
			$(this).removeClass('green');
			NaNx.State.isRunning = true;
			grabInfoz();
		}
	});
		
	$('#spartacus_arenatype').prop('selectedIndex', NaNx.Settings.AType);
	$('#spartacus_seltarget').prop('selectedIndex', NaNx.Settings.seltarget);
	$('#spartacus_stopon').prop('selectedIndex', NaNx.Settings.StopO);		
	$('#SpendFirst').prop('selectedIndex', NaNx.Settings.StamFirst);
	$('#NYJobs').prop('selectedIndex', 74);
	$('#BRLJobs').prop('selectedIndex', 93);
	$('#CHIJobs').prop('selectedIndex', 11);
	$('#LONJobs').prop('selectedIndex', 69);
	$('#SAJobs').prop('selectedIndex', 105);
	$('#StamOpt').prop('selectedIndex', 4);
	
	if (NaNx.Settings.Restart){
		document.getElementById("NaNx_restart").checked = true;
	}else {
		document.getElementById("NaNx_restart").checked = false;
	}
	if (NaNx.Settings.AutoStart){
		document.getElementById("NaNx_AutoStart").checked = true;
	}else {
		document.getElementById("NaNx_AutoStart").checked = false;
	}
	if (NaNx.Settings.MFury){
		document.getElementById("spartacus_mobfury").checked = true;
	}else {
		document.getElementById("spartacus_mobfury").checked = false;
	}
	if (NaNx.Settings.PAttack){
		document.getElementById("spartacus_powerattack").checked = true;
	}else {
		document.getElementById("spartacus_powerattack").checked = false;
	}
	if (NaNx.Settings.SShield){
		document.getElementById("spartacus_skipshield").checked = true;
	}else {
		document.getElementById("spartacus_skipshield").checked = false;
	}
	if (NaNx.Settings.SShieldA){
		document.getElementById("spartacus_skipshield_a").checked = true;
	}else {
		document.getElementById("spartacus_skipshield_a").checked = false;
	}
	if (NaNx.Settings.BKamiO){
		document.getElementById("spartacus_boostkami_s").checked = true;
	}else {
		document.getElementById("spartacus_boostkami_s").checked = false;
	}
	if (NaNx.Settings.SortP){
		document.getElementById("spartacus_sortplayer").checked = true;
	}else {
		document.getElementById("spartacus_sortplayer").checked = false;
	}
	
	$(".nanx_input").change(function(){
		if (document.getElementById("NaNx_restart").checked) {
			NaNx.Settings.Restart = true;
		}else{
			NaNx.Settings.Restart = false;
		}
		if (document.getElementById("NaNx_AutoStart").checked) {
			NaNx.Settings.AutoStart = true;
		}else{
			NaNx.Settings.AutoStart = false;
		}
		if (document.getElementById("spartacus_mobfury").checked) {
			NaNx.Settings.MFury = true;
		}else{
			NaNx.Settings.MFury = false;
		}
		if (document.getElementById("spartacus_powerattack").checked) {
			NaNx.Settings.PAttack = true;
		}else{
			NaNx.Settings.PAttack = false;
		}	
		if (document.getElementById("spartacus_skipshield").checked) {
			NaNx.Settings.SShield = true;
		}else{
			NaNx.Settings.SShield = false;
		}
		if (document.getElementById("spartacus_skipshield_a").checked) {
			NaNx.Settings.SShieldA = true;
		}else{
			NaNx.Settings.SShieldA = false;
		}		
		if (document.getElementById("spartacus_boostkami_s").checked) {
			NaNx.Settings.BKamiO = true;
		}else{
			NaNx.Settings.BKamiO = false;
		}
		if (document.getElementById("spartacus_sortplayer").checked) {
			NaNx.Settings.SortP = true;
		}else{
			NaNx.Settings.SortP = false;
		}		
		NaNx.Settings.nummatt = $('#spartacus_numatt').val();
		NaNx.Settings.BKamiS = $('#spartacus_boostkami_s').val();
		NaNx.Settings.StopV = $('#spartacus_stoponvalue').val();
		NaNx.Settings.AType = $('#spartacus_arenatype').prop("selectedIndex");
		NaNx.Settings.seltarget = $('#spartacus_seltarget').prop("selectedIndex");
		NaNx.Settings.StopO = $('#spartacus_stopon').prop("selectedIndex");
		NaNx.Settings.StamFirst = $('#SpendFirst').prop("selectedIndex");
//		logit('Changed')
		writeSettings();
	});

	function loadCustomJobList(){
		for(var i = 0; i < NaNx.Settings.isHiding.length; i++){
			var temp = NaNx.Settings.isHiding[i].split('_');
			if(temp[0] == 'NY'){
				$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$("#NYJobs>option[value="+NaNx.Settings.isHiding[i]+"]").text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+NaNx.Settings.isHiding[i]+'">X</a></span></span>'));
				$("#NYJobs option[value="+NaNx.Settings.isHiding[i]+"]").hide();
			}else if(temp[0] == 'BRL'){
				$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$("#BRLJobs>option[value="+NaNx.Settings.isHiding[i]+"]").text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+NaNx.Settings.isHiding[i]+'">X</a></span></span>'));
				$("#BRLJobs option[value="+NaNx.Settings.isHiding[i]+"]").hide();
			}else if(temp[0] == 'CHI'){
				$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$("#CHIJobs>option[value="+NaNx.Settings.isHiding[i]+"]").text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+NaNx.Settings.isHiding[i]+'">X</a></span></span>'));
				$("#CHIJobs option[value="+NaNx.Settings.isHiding[i]+"]").hide();
			}else if(temp[0] == 'LON'){
				$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$("#LONJobs>option[value="+NaNx.Settings.isHiding[i]+"]").text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+NaNx.Settings.isHiding[i]+'">X</a></span></span>'));
				$("#LONJobs option[value="+NaNx.Settings.isHiding[i]+"]").hide();
			}else if(temp[0] == 'SA'){
				$('#customjobs').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$("#SAJobs>option[value="+NaNx.Settings.isHiding[i]+"]").text()+' <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+NaNx.Settings.isHiding[i]+'">X</a></span></span>'));
				$("#SAJobs option[value="+NaNx.Settings.isHiding[i]+"]").hide();
			}else if(temp[0] == 'STAM'){
				$('#customStaminaChoice').append($('<li style="clear:both;"></li>').html('<span style="background: none repeat scroll 0 0 #111111;border: 1px solid #333333;height: 24px;width:524px;float:left;">'+$("#StamOpt>option[value="+NaNx.Settings.isHiding[i]+"]").text()+'  <span style="float:right;margin:3px;"><a href="#" class="clearitem" id="'+NaNx.Settings.isHiding[i]+'">X</a></span></span>'));
				$("#StamOpt option[value="+NaNx.Settings.isHiding[i]+"]").hide();
			}
		}
	}loadCustomJobList();
	
	$('#NYJobs option').each(function(){
		if($(this).val() == 'none'){
			$(this).attr("disabled","disabled");
		}else if(jQuery.inArray($(this).val(), NaNx.Settings.isHiding) > -1){
			$(this).hide();
		}
	});
	$('#BRLJobs option').each(function(){
		if($(this).val() == 'none'){
			$(this).attr("disabled","disabled");
		}else if(jQuery.inArray($(this).val(), NaNx.Settings.isHiding) > -1){
			$(this).hide();
		}
	});
	$('#CHIJobs option').each(function(){
		if($(this).val() == 'none'){
			$(this).attr("disabled","disabled");
		}else if(jQuery.inArray($(this).val(), NaNx.Settings.isHiding) > -1){
			$(this).hide();
		}
	});
	$('#LONJobs option').each(function(){
		if($(this).val() == 'none'){
			$(this).attr("disabled","disabled");
		}else if(jQuery.inArray($(this).val(), NaNx.Settings.isHiding) > -1){
			$(this).hide();
		}
	});
	$('#SAJobs option').each(function(){
		if($(this).val() == 'none'){
			$(this).attr("disabled","disabled");
		}else if($(this).val() == 'SA_10_0'){
			$(this).hide();
		}else if($(this).val() == 'SA_10_3'){
			$(this).hide();
		}else if($(this).val() == 'SA_10_6'){
			$(this).hide();
		}else if(jQuery.inArray($(this).val(), NaNx.Settings.isHiding) > -1){
			$(this).hide();
		}
	});
	
	if (NaNx.Settings.AutoStart){
		$('#NaNxAS').show();
		NaNx.ClickGo = setTimeout(function(){autorunNanx();},15000);
	}
	
	$('#NaNxAS').click(function(){
		clearTimeout(NaNx.ClickGo);	
		$('#NaNxAS').hide();
		return false;
	})
	
	$('#Settings').click(function () {
		if(document.getElementById('NaNx_Config').style.display == "none"){
			$('#Settings').addClass('green').removeClass('black');
			$('#NaNx_Config').show();
		}else{
			$('#Settings').addClass('black').removeClass('green');
			$('#NaNx_Config').hide();
		}
		return false;
	})

	function autorunNanx(){
		if (NaNx.Settings.AutoStart){
			$('#makeit').click()
		}else{
			return;
		}		
	}

	function doTheJob(){
		if(!NaNx.State.isRunning){
			return;
		}
		log('Doing Job');
		if(NaNx.State.isBlocking){
			return;
		}
		var JobToClick;
		if(NaNx.CurrentEnergyJob[0].isUsingButton) {
			JobToClick = $('#btn_dojob_'+NaNx.CurrentEnergyJob[0].isJobID).prop('href');
		}else if(NaNx.CurrentEnergyJob[0].isOldCity){
			JobToClick = $('#city_job_'+ NaNx.CurrentEnergyJob[0].isJobID +' > .job_action > a').attr('href');
		}else{
			JobToClick = $('#job_'+ NaNx.CurrentEnergyJob[0].isJobID +' > a').attr('href');
		}
		if (JobToClick == null||JobToClick.length < 1){
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('job el is null, Reloading Page')
			NaNx.State.isBlocking = true;			
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},5000));
			return;
		}
		if(NaNx.CurrentEnergyJob[0].isCity != /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1]){
			grabInfoz();
			return;
		}
		NaNx.SendJobReq = setInterval(function(){
			GrabRequest(JobToClick, 'lvlup', function(object){
				if(NaNx.CurrentEnergyJob[0].isUsingButton) {
					JobBCLS(object)
				}else if(NaNx.CurrentEnergyJob[0].isFlashNY){
					FlashJobNY(object)
				}else{
					JobNY(object)
				}
			});
		}, $("input:radio[@name=NaNxSpeed]:checked").val());
	}

	function StamJobIt(){
		if(!NaNx.State.isRunning){
			return;
		}
		CloseDoopidPopup();
		var DoesIHaveStam = parseInt(document.getElementById('user_stamina').innerHTML);
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		if(DoesIHaveEnergy > NaNx.Counters.switchNRG+10 && NaNx.Settings.StamFirst != 1){
			setTimeout(function(){grabInfoz();},2500);
			return;
		}
		if(DoesIHaveStam < NaNx.CurrentStaminaJob[0].isCost && DoesIHaveEnergy < NaNx.CurrentEnergyJob[0].isCost){
			setTimeout(function(){grabInfoz();},2500);
			return;
		}
		if(DoesIHaveStam < NaNx.CurrentStaminaJob[0].isCost){
			setTimeout(function(){grabInfoz();},2500);
			return;
		}
		if(DoesIHaveEnergy == 0){
			log('Waiting for 1 energy so we can do a stamina requiring job');
			setTimeout(function(){StamJobIt();},1000*60);
			return;
		}
		log('Doing Job');
		if(NaNx.State.isBlocking){
			return;
		}
		var JobToClick = $('#btn_dojob_'+NaNx.CurrentStaminaJob[0].isJobID).prop('href');
		if (JobToClick == null||JobToClick.length < 1){
			window.stop();
			clearInterval(NaNx.SendJobReq);	
			logit('job el is null, Reloading Page')
			NaNx.State.isBlocking = true;			
			Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},5000));
			return;
		}
		if(NaNx.CurrentStaminaJob[0].isCity != /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1]){
			grabInfoz();
			return;
		}
		NaNx.SendJobReq = setInterval(function(){
			GrabRequest(JobToClick, 'lvlup', function(object){
				StamSA(object)
			});
		}, $("input:radio[@name=NaNxSpeed]:checked").val());
	} 
	
	function updateStats(multipler, stats_div){
		var stat_count = parseInt($('#'+stats_div).text());
		nmult = parseInt(multipler);
		stat_count = (stat_count + nmult);
		$('#'+stats_div).text(stat_count);
	}
	
	function FlashJobNY(Object){
		if(!NaNx.State.isRunning){
			return;
		}
		CloseDoopidPopup();
		if (/index_controller/.test(response)) {
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('Session timed out, reloading job page...');
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},3000));
			return;
		}else if (/It looks like you changed cities in another browser window/.test(response)) {
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('Travelling detected!');
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},3000));
			return;
		}else if (/There was an issue processing your request/.test(response)) {
//			window.stop();
	//		clearInterval(NaNx.SendJobReq);
			logit('There was an issue processing your request...');
		}else {
			var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
			if(onMarketPlace > 0){
				window.stop();
				clearInterval(NaNx.SendJobReq);
				logit('Marketplace Tab, Why i go here..');
				Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},5000));
				return;
			}
			if (typeof response == 'object') {
				var object = response;
			}
			else {
				try{
					var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
				}catch (err) {
					window.stop();
					clearInterval(NaNx.SendJobReq);
					logit('no parse?');
					Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},3000));
					return;
				}
			}
			try {
				user_fields_update(object.user_fields);
				user_info_update(object.user_fields, object.user_info);
			}
			catch (do_job_user_fields) {
				logit('Ran into trouble in do_job(), user_fields: '+do_job_user_fields);
			}
			try{
				if (Util.isset(object.questData)) {
					MW.QuestBar.update(object.questData);
				}
			}catch (err) {
				window.stop();
				clearInterval(NaNx.SendJobReq);
				logit('no obj?');
				return;
			}
			if (Util.isset(object.popup)) {
				if (/You are now LEVEL/.test(object.popup)){
					logit('Levelup!');
					leveluped();
				}
			}
			//job successfully done
			if (Util.isset(object.jobResult)) {
				jobResult = object.jobResult;
				updateStats(1, 'JobsDone');
				NaNx.Counters.jobsdonecurrent++;
				if (jobResult.extraData.bonusCash > 0) {
					NaNx.Counters.BagmanCount++;
				}
				if (jobResult.extraData.bonusExperience > 0) {
					NaNx.Counters.MasterMindCount++;
				}
				if (jobResult.energy == 0) {
					NaNx.Counters.WheelManCount++;
				}				
				if (NaNx.Counters.MasterMindCount > 0 || NaNx.Counters.WheelManCount > 0 || NaNx.Counters.BagmanCount > 0) {
					NaNx.Counters.jobsdonecurrent = parseInt($('#JobsDone').text());
					var masterratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.MasterMindCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					var wheelratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.WheelManCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					var bagratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.BagmanCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					document.getElementById('topmafia_stats').innerHTML = (NaNx.Counters.MasterMindCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">x'+NaNx.Counters.MasterMindCount+masterratio:'')+(NaNx.Counters.WheelManCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">x'+NaNx.Counters.WheelManCount+wheelratio:'')+(NaNx.Counters.BagmanCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_cash_16x16_01.gif">x'+NaNx.Counters.BagmanCount+bagratio:'');
				}
			}
			//change jobs
			if (Util.isset(object.user_fields)) {
				var leftoverNRG = parseInt(object.user_fields.user_energy);
				if(NaNx.CurrentEnergyJob[0].isJobID != NaNx.JobMap[0].isJobID){
					if(NaNx.JobMap[0].isCost < leftoverNRG){
						window.stop();
						clearInterval(NaNx.SendJobReq);		
						setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000);
						return;
					}
				}
			}
			var DoesIHaveStam = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
			if(NaNx.Settings.StamFirst == 1 && DoesIHaveStam >= NaNx.CurrentStaminaJob[0].isCost && !NaNx.State.isBanditDetected){
				window.stop();
				clearInterval(NaNx.SendJobReq);
				setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000);
				return;
			}
			//job not done, need to buy stuff
			if (Util.isset(object.data)) {
				if (Util.isset(object.data.impulseBuy)) {
					window.stop();
					clearInterval(NaNx.SendJobReq);
					if (object.data.impulseBuy.success == 1) {
						logit($(object.data.impulseBuy.message).text());
					}
					else {
						if (/You need the following items for this job/.test(object.data.impulseBuy.message)) {
							logit('You need the following items for this job')
						}else if (/You do not have enough cash to do this job/.test(object.data.impulseBuy.message)) {
							logit('You do not have enough cash to do this job.')
						}else if (/These loot drops/.test(object.data.impulseBuy.message)) {
							logit('Need consumables...')
						}else if (/(not_enough_energy|You do not have enough energy|You do not have enough Stamina)/i.test(object.data.impulseBuy.message)) {
							logit('Ran out of energy.');
							setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000);
							return;
						}else {
							logit(object.data.impulseBuy.message);
						}
					}
				}
			}
			var JobToClick = $('#job_'+ NaNx.CurrentEnergyJob[0].isJobID);
			if (JobToClick == null||JobToClick.length < 1){
				log('job el is null, Reloading Page')
				window.stop();
				clearInterval(NaNx.SendJobReq);		
				Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000));
			}
		}
	}
	
	function JobNY(Object){
		if(!NaNx.State.isRunning){
			return;
		}
		CloseDoopidPopup();
		m=[];
		var msg = Object;
		var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
		if(onMarketPlace > 0){
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('Marketplace Tab, Why i go here..');
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},5000));
			return;
		}
		if(/: Completed/.test(msg)) {
			var leftoverNRG = /user_energy.*?(\d+)/.exec(msg)[1];
			document.getElementById('user_energy').innerHTML = leftoverNRG;
			document.getElementById('exp_to_next_level').innerHTML = /exp_to_next_level.*?(\d+)/.exec(msg)[1];
			if(msg.indexOf('You are now LEVEL')!=-1) {
				logit('Levelup!');
				leveluped();
			}
			updateStats(1, 'JobsDone');
			NaNx.Counters.jobsdonecurrent++;
			if (/As a Top Mafia Wheelman/.test(msg)) { 
				NaNx.Counters.WheelManCount++;
			}
			if (/As a Top Mafia Mastermind/.test(msg)) { 
				NaNx.Counters.MasterMindCount++;
			}
			if (/As a Top Mafia Bagman/.test(msg)) { 
				NaNx.Counters.BagmanCount++;
			}
			if (NaNx.Counters.MasterMindCount > 0 || NaNx.Counters.WheelManCount > 0 || NaNx.Counters.BagmanCount > 0) {
				NaNx.Counters.jobsdonecurrent = parseInt($('#JobsDone').text());
				var masterratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.MasterMindCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
				var wheelratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.WheelManCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
				var bagratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.BagmanCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
				document.getElementById('topmafia_stats').innerHTML = (NaNx.Counters.MasterMindCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">x'+NaNx.Counters.MasterMindCount+masterratio:'')+(NaNx.Counters.WheelManCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">x'+NaNx.Counters.WheelManCount+wheelratio:'')+(NaNx.Counters.BagmanCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_cash_16x16_01.gif">x'+NaNx.Counters.BagmanCount+bagratio:'');
			}
			//change jobs
			if(NaNx.CurrentEnergyJob[0].isJobID != NaNx.JobMap[0].isJobID){
				if(NaNx.JobMap[0].isCost < leftoverNRG){
					window.stop();
					clearInterval(NaNx.SendJobReq);						
					setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000);
					return;
				}
			}
			var DoesIHaveStam = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
			if(NaNx.Settings.StamFirst == 1 && DoesIHaveStam >= NaNx.CurrentStaminaJob[0].isCost && !NaNx.State.isBanditDetected){
				window.stop();
				clearInterval(NaNx.SendJobReq);
				setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000);
				return;
			}
		}else{
			if (/Error while loading page from/.test(msg)) {
				logit('Mafia Wars overloaded...');
			}else if (/There was an issue processing your request. Please try again/.test(msg)) {
				logit('There was an issue processing your request. Please try again.');
			}
			window.stop();
			clearInterval(NaNx.SendJobReq);
			if (/You need the following items for this job/.exec(msg)){
				logit('You need the following items for this job.');
			}else if (/You need more cash to buy these items/.exec(msg)){
				logit('You need more cash to buy these items.');
			}else if (/You don't have the necessary items/.test(msg)){
				logit('Missing items to repeat job');
			}else if (m=/You don't have enough (.*?) for this job/.exec(msg)){
				logit('Need more '+m[1]+' to complete job.');
			}else if (/These loot drops are needed for this job/.exec(msg)){
				logit('Need consumables to do job, stopping');
			}else if (/It looks like you changed cities in another browser window/.test(msg)){
				logit('You have changed cities in another window. Travel back and then continue.');
			}else if (m=/You need .* Energy/.test(msg)){
				logit('Outta energy.');
			}else if (/to take this job/.test(msg)){
				logit('Outta energy.');
			}else if (/index_controller/.test(msg)) {
				logit('Session timed out, reloading job page...');
			}
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000));
			return;
		}
		var JobToClick = $('#city_job_'+ NaNx.CurrentEnergyJob[0].isJobID +' > .job_action > a').attr('href');
		if (JobToClick == null||JobToClick.length < 1){
			log('job el is null, Reloading Page')
			window.stop();
			clearInterval(NaNx.SendJobReq);			
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000));
			return;
		}
	}
	
	function JobBCLS(response){
		if(!NaNx.State.isRunning){
			return;
		}
		CloseDoopidPopup();
		if (/index_controller/.test(response)) {
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('Session timed out, reloading job page...');
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},3000));
			return;
		}else if (/It looks like you changed cities in another browser window/.test(response)) {
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('Travelling detected!');
			Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},3000));
			return;
		}else if (/There was an issue processing your request/.test(response)) {
//			window.stop();
	//		clearInterval(NaNx.SendJobReq);
			logit('There was an issue processing your request...');
		}else {
			var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
			if(onMarketPlace > 0){
				window.stop();
				clearInterval(NaNx.SendJobReq);
				logit('Marketplace Tab, Why i go here..');
				Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},5000));
				return;
			}
			if (typeof response == 'object') {
				var object = response;
			}
			else {
				try{
					var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
				}catch (err) {
					window.stop();
					clearInterval(NaNx.SendJobReq);
					logit('no parse?');
					Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;doTheJob();},3000));
					return;
				}
			}
			try {
				user_fields_update(object.user_fields);
				user_info_update(object.user_fields, object.user_info);
			}
			catch (do_job_user_fields) {
				logit('Ran into trouble in do_job(), user_fields: '+do_job_user_fields);
			}
			try{
				if (Util.isset(object.questData)) {
					MW.QuestBar.update(object.questData);
				}
			}catch (err) {
				window.stop();
				clearInterval(NaNx.SendJobReq);
				logit('no obj?');
				return;
			}
			if (Util.isset(object.popup)) {
				if (/You are now LEVEL/.test(object.popup)){
					logit('Levelup!');
					leveluped();
				}
			}
			var crewMembers = parseInt(document.getElementById('btn_queue').childNodes[0].childNodes[0].childNodes[2].innerHTML);
			//job successfully done
			if (Util.isset(object.jobResult)) {
				jobResult = object.jobResult;
				updateStats(1, 'JobsDone');
				NaNx.Counters.jobsdonecurrent++;
				if (jobResult.extraData.bonusCash > 0) {
					NaNx.Counters.BagmanCount++;
				}
				if (jobResult.extraData.bonusExperience > 0) {
					NaNx.Counters.MasterMindCount++;
				}
				if (jobResult.energy == 0) {
					NaNx.Counters.WheelManCount++;
				}				
				if (NaNx.Counters.MasterMindCount > 0 || NaNx.Counters.WheelManCount > 0 || NaNx.Counters.BagmanCount > 0) {
					NaNx.Counters.jobsdonecurrent = parseInt($('#JobsDone').text());
					var masterratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.MasterMindCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					var wheelratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.WheelManCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					var bagratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.BagmanCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					document.getElementById('topmafia_stats').innerHTML = (NaNx.Counters.MasterMindCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">x'+NaNx.Counters.MasterMindCount+masterratio:'')+(NaNx.Counters.WheelManCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">x'+NaNx.Counters.WheelManCount+wheelratio:'')+(NaNx.Counters.BagmanCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_cash_16x16_01.gif">x'+NaNx.Counters.BagmanCount+bagratio:'');
				}
	
				if (jobResult.lootBandit.length > 0) {
					var bandit = $(jobResult.lootBandit[0].markup).find('.bandit-desc:first').html();
					logit('Found a '+bandit+'!');
					if (/Job/.test(bandit)) {
						window.stop();
						clearInterval(NaNx.SendJobReq);
						logit('Found a '+bandit+'! Proceeding to eliminate...');
						if(crewMembers != 0){
							updateStats(1, 'BanditsKilled');
							NaNx.CurrentLevel = $('#user_level').text();
							GrabRequest('xw_controller=Job&xw_action=eliminateBandit&xw_city='+NaNx.CurrentEnergyJob[0].isCity+'&stage='+NaNx.CurrentEnergyJob[0].isTab+'&job='+NaNx.CurrentEnergyJob[0].isJobID, 'none', setTimeout(function(){
								Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){
									var banditlvlr = $('#user_level').text();
									if(banditlvlr > NaNx.CurrentLevel){
										logit('Levelup!');
										leveluped();
									}
									NaNx.State.isBlocking = false;NaNx.State.isBanditDetected = false;doTheJob();
								},3000));
							},3000));
							return;
						}else if(crewMembers == 0){
							logit('Found a '+bandit+'! No Crew!');
							setTimeout(function(){NaNx.State.isBlocking = false;NaNx.State.isBanditDetected = false;doTheJob();},1000*60*5)
							return;
						}
					}else if (/XP/.test(bandit)) {
						if(crewMembers == 0){
							window.stop();
							clearInterval(NaNx.SendJobReq);
							logit('Found a '+bandit+'! No Crew!');
							setTimeout(function(){NaNx.State.isBlocking = false;NaNx.State.isBanditDetected = false;doTheJob();},1000*60*5)
							return;
						}
						NaNx.State.isBanditDetected = true;
					}
				}
			}
			//change jobs
			if(!NaNx.State.isBanditDetected){
				if (Util.isset(object.user_fields)) {
					var leftoverNRG = parseInt(object.user_fields.user_energy);
					if(NaNx.CurrentEnergyJob[0].isJobID != NaNx.JobMap[0].isJobID){
						if(NaNx.JobMap[0].isCost < leftoverNRG){
							window.stop();
							clearInterval(NaNx.SendJobReq);		
							logit('change jobs no bandit F9');
							setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000);
							return;
						}
					}
				}
			}
			var DoesIHaveStam = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
			if(NaNx.Settings.StamFirst == 1 && DoesIHaveStam >= NaNx.CurrentStaminaJob[0].isCost && !NaNx.State.isBanditDetected){
				window.stop();
				clearInterval(NaNx.SendJobReq);
				setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000);
				return;
			}
			//job not done, need to buy stuff
			if (Util.isset(object.data)) {
				if (Util.isset(object.data.impulseBuy)) {
					window.stop();
					clearInterval(NaNx.SendJobReq);
					if (object.data.impulseBuy.success == 1) {
						logit($(object.data.impulseBuy.message).text());
					}
					else {
						if (/You must eliminate the (.*?) before you can complete this job/.exec(object.data.impulseBuy.message)) {
							window.stop();
							clearInterval(NaNx.SendJobReq);
							logit('Found a Job Bandit! Proceeding to eliminate...');
							updateStats(1, 'BanditsKilled');
							NaNx.CurrentLevel = $('#user_level').text();
							GrabRequest('xw_controller=Job&xw_action=eliminateBandit&xw_city='+NaNx.CurrentEnergyJob[0].isCity+'&stage='+NaNx.CurrentEnergyJob[0].isTab+'&job='+NaNx.CurrentEnergyJob[0].isJobID, 'none', setTimeout(function(){
								Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){
									var banditlvlr = $('#user_level').text();
									if(banditlvlr > NaNx.CurrentLevel){
										logit('Levelup!');
										leveluped();
									}
									NaNx.State.isBlocking = false;NaNx.State.isBanditDetected = false;doTheJob();
								},3000));
							},3000));
							return;
						}else if (/You need the following items for this job/.test(object.data.impulseBuy.message)) {
							logit('You need the following items for this job')
						}else if (/You do not have enough cash to do this job/.test(object.data.impulseBuy.message)) {
							logit('You do not have enough cash to do this job.')
						}else if (/These loot drops/.test(object.data.impulseBuy.message)) {
							logit('Need consumables...')
						}else if(/(not_enough_energy|You do not have enough energy|You do not have enough Stamina)/i.test(object.data.impulseBuy.message) && NaNx.State.isBanditDetected){
							updateStats(1, 'BanditsKilled');
							NaNx.CurrentLevel = $('#user_level').text();
							GrabRequest('xw_controller=Job&xw_action=eliminateBandit&xw_city='+NaNx.CurrentEnergyJob[0].isCity+'&stage='+NaNx.CurrentEnergyJob[0].isTab+'&job='+NaNx.CurrentEnergyJob[0].isJobID, 'none', setTimeout(function(){
								Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){
									var banditlvlr = $('#user_level').text();
									if(banditlvlr > NaNx.CurrentLevel){
										logit('Levelup!');
										leveluped();
									}
									NaNx.State.isBlocking = false;NaNx.State.isBanditDetected = false;doTheJob();
								},3000));
							},3000));
							return;
						}else if (/(not_enough_energy|You do not have enough energy|You do not have enough Stamina)/i.test(object.data.impulseBuy.message)) {
							logit('Ran out of energy.');
							Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000));
							return;
						}else {
							logit(object.data.impulseBuy.message);
						}
					}
				}
			}
			var JobToClick = $('#btn_dojob_'+NaNx.CurrentEnergyJob[0].isJobID).prop('href');
			if (JobToClick == null||JobToClick.length < 1){
				log('job el is null, Reloading Page')
				window.stop();
				clearInterval(NaNx.SendJobReq);					
				Dotravel(NaNx.CurrentEnergyJob[0].isCity, 'job', NaNx.CurrentEnergyJob[0].isTab, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000));
			}
		}
	}
	
	function StamSA(response){
		if(!NaNx.State.isRunning){
			return;
		}
		CloseDoopidPopup();
		if (/index_controller/.test(response)) {
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('Session timed out, reloading job page...');
			Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBlocking = false;StamJobIt();},3500));
			return;
		}else if (/It looks like you changed cities in another browser window/.test(response)) {
			window.stop();
			clearInterval(NaNx.SendJobReq);
			logit('Travelling detected!');
			Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBlocking = false;StamJobIt();},3500));
			return;
		}else if (/There was an issue processing your request/.test(response)) {
//			window.stop();
	//		clearInterval(NaNx.SendJobReq);
			logit('There was an issue processing your request...');
		}else {
			var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
			if(onMarketPlace > 0){
				window.stop();
				clearInterval(NaNx.SendJobReq);
				logit('Marketplace Tab, Why i go here..');
				Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBlocking = false;StamJobIt();},5000));
				return;
			}
			if (typeof response == 'object') {
				var object = response;
			}
			else {
				try{
					var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
				}catch (err) {
					window.stop();
					clearInterval(NaNx.SendJobReq);
					logit('no parse?');
					Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBlocking = false;StamJobIt();},3500));
					return;
				}
			}
			try {
				user_fields_update(object.user_fields);
				user_info_update(object.user_fields, object.user_info);
			}
			catch (do_job_user_fields) {
				logit('Ran into trouble in do_job(), user_fields: '+do_job_user_fields);
			}
			try{
				if (Util.isset(object.questData)) {
					MW.QuestBar.update(object.questData);
				}
			}catch (err) {
				window.stop();
				clearInterval(NaNx.SendJobReq);
				logit('no obj?');
				return;
			}
			if (Util.isset(object.popup)) {
				if (/You are now LEVEL/.test(object.popup)){
					logit('Levelup!');
					leveluped();
				}
			}
			//job successfully done
			if (Util.isset(object.jobResult)) {
				jobResult = object.jobResult;
				updateStats(1, 'JobsDone');
				NaNx.Counters.jobsdonecurrent++;
				if (jobResult.extraData.bonusCash > 0) {
					NaNx.Counters.BagmanCount++;
				}
				if (jobResult.extraData.bonusExperience > 0) {
					NaNx.Counters.MasterMindCount++;
				}
				if (jobResult.stamina == 0) {
					NaNx.Counters.WheelManCount++;
				}				
				if (NaNx.Counters.MasterMindCount > 0 || NaNx.Counters.WheelManCount > 0 || NaNx.Counters.BagmanCount > 0) {
					NaNx.Counters.jobsdonecurrent = parseInt($('#JobsDone').text());
					var masterratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.MasterMindCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					var wheelratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.WheelManCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					var bagratio = ' <span class="more_in">('+parseFloat(NaNx.Counters.BagmanCount/NaNx.Counters.jobsdonecurrent*100).toFixed(2)+'%)</span>&nbsp;';
					document.getElementById('topmafia_stats').innerHTML = (NaNx.Counters.MasterMindCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">x'+NaNx.Counters.MasterMindCount+masterratio:'')+(NaNx.Counters.WheelManCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">x'+NaNx.Counters.WheelManCount+wheelratio:'')+(NaNx.Counters.BagmanCount>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_cash_16x16_01.gif">x'+NaNx.Counters.BagmanCount+bagratio:'');
				}
			}
			var DoesIHaveStam = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
			if(NaNx.Settings.StamFirst == 0 && DoesIHaveEnergy >= NaNx.CurrentEnergyJob[0].isCost){
				window.stop();
				clearInterval(NaNx.SendJobReq);
				setTimeout(function(){grabInfoz();},3000);
				return;
			}
			//job not done, need to buy stuff
			if (Util.isset(object.data)) {
				if (Util.isset(object.data.impulseBuy)) {
					window.stop();
					clearInterval(NaNx.SendJobReq);
					if (object.data.impulseBuy.success == 1) {
						logit($(object.data.impulseBuy.message).text());
					}
					else {
						if (/You need the following items for this job/.test(object.data.impulseBuy.message)) {
							logit('You need the following items for this job')
						}else if (/You do not have enough cash to do this job/.test(object.data.impulseBuy.message)) {
							logit('You do not have enough cash to do this job.')
						}else if (/These loot drops/.test(object.data.impulseBuy.message)) {
							logit('Need consumables...')
						}else if (/(not_enough_energy|You do not have enough energy|You do not have enough Stamina)/i.test(object.data.impulseBuy.message)) {
							logit('Ran out of energy.');
							Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000));
							return;
						}else {
							logit(object.data.impulseBuy.message);
						}
					}
				}
			}
			var JobToClick = $('#btn_dojob_'+NaNx.CurrentStaminaJob[0].isJobID).prop('href');
			if (JobToClick == null||JobToClick.length < 1){
				log('job el is null, Reloading Page')
				window.stop();
				clearInterval(NaNx.SendJobReq);			
				Dotravel(10, 'job', 10, setTimeout(function(){NaNx.State.isBanditDetected = false;grabInfoz();},3000));
				return;
			}
		}
	}
	/*START SPART*/
	function startarena() {
		clearInterval(restart_in_counter);
		if(!run) {
			$('#gxRDivS').show();
			run = true;
			set_progress_bar(0,0,'');
			check_stamina(join_arena);
		}
	}
	
	function create_handler(){
		$('.spartacus_att').click(function(){
			attack($(this).attr('data-id'),1);
			return false;
		});
		$('#spartacus_toggleloot').click(function(){
			$('.spartacus_lootlog').toggle();
			return false;
		});
		$('#spartacus_togglearenas').click(function(){
			$('.spartacus_arenalog').toggle();
			return false;
		});
		$('#spartacus_stopon').change(function(){
			if(this.selectedIndex>1) {
				$('#spartacus_show_stopon_value').show();
			} else {
				$('#spartacus_show_stopon_value').hide();
			}
		}).trigger('change');
		$('#spartacus_table').hover(function(){
			over_table = true;
			$('#spartacus_table').css('border-color','#444');
			$('#spartacus_lockrank').show();
		},function(){
			over_table = false;
			$('#spartacus_table').css('border-color','black');
			$('#spartacus_lockrank').hide();
			
		});
	}
	create_handler();
	update_crests();

	/****************** connection functions ****************/

	function join_arena() {
		//check if Spartacus is still running
		if ($('#gxRDivS').length == 0) {
			run = false;
			return;
		}

		/* initialize vars */
		cmdqueue=[];
		meid=null;
		meteam=null;
		poweratt = undefined;
		poweruplist = {};
		playerinfo={};
		playerids={};
		stam_on_start = -1;
		powerup_status = {};
		powerup_command = { count:{},active:-1,target:undefined };
		da_game = [];
		protect = {};
		$('span[id*="spartacus_rank"]').html('');
		$('span[id*="spartacus_pu"]').html('');
		$('span[id*="spartacus_name"]').html('');
		$('span[id*="spartacus_respect"]').html('');
		$('span[id*="spartacus_diff"]').html('');
		$('span[id*="spartacus_health"]').html('');
		$('span[id*="spartacus_score"]').html('');
		$('span[id*="spartacus_usepu"]').html('');
		/* join */
		log('Joining arena...');
		var type = $('#spartacus_arenatype').val();
		replenish=(type=="sw"?2:(type=="lw"?10:50));
		$('#spartacus_replenish').text(replenish);
		var gametype = '';
		if($('#spartacus_mobfury').is(':checked')) {log('Joining MobFury Arena...'); gametype = '&arenaGameType=2'; }
		GrabRequest('xw_controller=Lobby&xw_action=join_arena&arenaType='+type+gametype+'&xw_client_id=8', 'spart', function(msg){
			//console.log(msg);
			var json = JSON.parse(msg);
			if(json.data.success == 1) {
				run = true;
				if(json.data.message=="User is in another arena") {
					log('Successfully re-joined Arena.');
				} else {
					log('Successfully joined Arena.');
				}
				$('#user_stamina').text('0');
				load_arena();
			}
			else {
				if (json.data.message.indexOf('Refresh to claim your rewards from the previous Arena')!=-1) {
					log('Claiming your rewards from the previous Arena');
					get_rewards();
				}
				else if(json.data.message.indexOf('have enough stamina to join this arena')!=-1) {
					log('Not enough Stamina, stopping.');
					$('#spartacus_table').html(optable);
					grabInfoz();
				}
				else if(json.data.message.indexOf('Unable to join')!=-1) {
					var wait = Math.floor(Math.round((Math.random() * 8))+2);
					log('Unable to join this Arena. Join another one. Trying again in '+wait+'s...');
					setTimeout(join_arena,wait*1000);
				}
				else {
					log('Could not join, msg='+json.data.message);
					run = false;
				}
			}

		},function(){
			log('Error on trying to join arena, retrying in 30 seconds...');
			setTimeout(join_arena,30000);
		});
	}

	function load_arena(){
		GrabRequest('xw_controller=Lobby&xw_action=loadArena&xw_client_id=8&exit=t', 'spart', function(msg){
			var m;
			if(m = /viewObj.init\(\"([^\"]*)\",/.exec(msg)) {
				var wslink = m[1];
				connect_arena(wslink);
			}
		},function(){
			log('Error on trying to load');
		});
	}

	function connect_arena(sockenurl) {
		socke=new WebSocket(sockenurl);
		socke.onopen=function(){
			log('Connected to Arena.');
			$('#spartacus_table').html(optable);
			conn_checker = setInterval(check_connection,100);
		};
		socke.onmessage=function(msg){
			var json=JSON.parse(msg.data);
			try {
				if((json.mi.ammo==-1) && (json.ac)) {
					if(json.ac.substr(0,1)=="2") {
						if(json.ac.substr(2,1)=="1") {
							log('Successfully escaped! Brave Sir Robin ran <a href=\"http://www.youtube.com/watch?v=BZwuTo7zKM8&feature=player_detailpage#t=59s\" target=\"_blank\">away away!</a>');
							// give me my stamina back!
							GrabRequest('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8', 'spart', function(){
								log('Stamina retrieved.');
								$('#spartacus_stage').html('Waiting for Start.');
							});
						} else {
							log('Could not leave, too late. You are trapped in here, good luck.');
						}
					}
				}
			} catch(all) {console.log(all);}
			
			update_info(json);
			decide_actions();
			send_queue();


		};
		socke.onclose=function(){
			last_update=0;
			clearInterval(conn_checker);
			$('#spartacus_connstatus').html('-');
			set_progress_bar(0,0,'');
			
			if(currdata && (currdata.s==2)) {
				console.log(currdata);
				try {
					if((currdata.s<1) && (currdata.mi.ammo==-1)){
						run = false;
						return;
					}
				} catch(all) {console.log(all);}
			
				reconnect_retry++;
				if(reconnect_retry>3) {
					log('Probably lost connection, not retrying again.');
				} else {
					log('Probably lost connection, reconnecting');
					join_arena();
				}
			} else if (currdata.s==4) {
				log('Closed connection, challenge decline or expired.');
				// give me my stamina back!
				GrabRequest('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8', 'spart', function(){
					log('Stamina retrieved.');
					$('#spartacus_stage').html('Waiting for Start.');
					run = false;
					if($('#spartacus_mobfury').is(':checked')) {
						startarena();
					}
				});	
			}
			else
			{
				reconnect_retry = 0;
				get_rewards();
			}
		};
	}


	function check_connection(){
		if(!run) {
			clearInterval(conn_checker);
		}
		if(last_update>0){
			var res,gap=(new Date()).getTime()-last_update;
			if(gap<600) {
				res='<span class="good">Good!</span>';
			} else if(gap<1200) {
				res='<span style="color:orange;font-weight:600;">Slow...</span>';
			} else {
				res='<span class="bad">Stalled!</span>';
			}
			$('#spartacus_connstatus').html(res);
		}
	}

	function am_i_leading_by(points) {
		var i,best_player_points=0;
		for(i in currdata.pi) {
			if(i!=meid) {
				if(currdata.pi[i].sc>best_player_points) { best_player_points=currdata.pi[i].sc;}
			}
		}
		var my_score=currdata.pi[meid].sc;
		return my_score-points>best_player_points;
	}

	function are_we_leading_by(points) {
		var team1 = parseInt(tscore["1"]);
		var team2 = parseInt(tscore["2"]);
		if (meteam == 1) {
			return team1-points>team2;
		}
		else {
			return team2-points>team1;
		}
	}
	// sorry, too lazy to make a generic function. If you steal this code, feel free to improve it.
	function am_i_targeting(points,targetrank) {
		var scores=[];
	
		for(i in currdata.pi) {
			if(i!=meid) {
				scores.push(currdata.pi[i].sc);
			}
		}
		
		scores.sort(function(a,b){return b-a;});
		
		var my_score=currdata.pi[meid].sc;
		
		return my_score-points>scores[targetrank-1];
	}
			
	function decide_allowed_to_attack(){
		try {
			var stopon = $('#spartacus_stopon').val();
			var stoponval = parseInt($('#spartacus_stoponvalue').val());
			var stamused = stam_on_start-currdata.mi.st;
			var score = currdata.pi[meid].sc;

			if(currdata.pi[meid].ph==0) { return false; } // me dead
			if(currdata.mi.st<10) { return false; } // no stam
			if((currdata.mi.st<50) && (poweratt)) { return false; } // no stam
			switch(stopon) {
				case "never": return true;
				case "stop": return false;
				case "teamleading": return !are_we_leading_by(stoponval);
				case "leading": return !am_i_leading_by(stoponval);
				case "leading3": return !am_i_targeting(stoponval,3);
				case "leading5": return !am_i_targeting(stoponval,5);
				case "staminaused": return stamused<stoponval;
				case "staminaleft": return currdata.mi.st>stoponval;
				case "score": return score<stoponval;
				case "stars": return currdata.ti[meteam].stars<stoponval;
			}
		} catch(err) {}
		return true;
	}

	function decide_who_to_attack(count){
		var i,list=[];
		// override active?
		
		if(powerup_command.target!==undefined) {
			//console.log('override');
			
			if((currdata.pi) && (currdata.pi[powerup_command.target]) && (currdata.pi[powerup_command.target].ph>0)) {
				for(i=0;i<count;i++) {
					list.push(powerup_command.target);
				}
				//console.log('override, successful:'+JSON.stringify(list));
				return list;
			} else {
				// target is not alive anymore
				powerup_command.target = undefined;
				$('.spartacus_kill').removeClass('spartacus_puactive').addClass('spartacus_punormal');
				// continue with normal selection
				//console.log('override not successful');
			}					
		}
		
		var target=$('#spartacus_seltarget').val();
		if(powerup_status.kami_active) { target="highhealth"; }
		var skipshield_d=$('#spartacus_skipshield').is(':checked');
		var skipshield_a=$('#spartacus_skipshield_a').is(':checked');
		var bestid=-1,best=0;
		for(i in currdata.pi) {
			if(i!=meid) {
				if(!protect[i]) {
					if((!meteam) || (currdata.pi[i].tm!=meteam)) { // De Morgan, attack only enemies
						if((currdata.pi[i].ph>0)) {
							if(!(
								(skipshield_d && (currdata.pi[i].pu>1)) ||
								(skipshield_a && (currdata.pi[i].pu%2==1))
							)){
								var val;
								switch(target) {
									case "lowhealth": val=100-currdata.pi[i].ph; break;
									case "highhealth": val=currdata.pi[i].ph; break;
									case "leastpoints": val=1000000-currdata.pi[i].sc; break;
									case "mostpoints": val=currdata.pi[i].sc;break;
									case "leastrespect": val=10000-playerinfo[i].respect; break;
									case "mostrespect": val=playerinfo[i].respect; break;
									case "allalive": val=1; break;
									case "leastdiff": val=3-r_difficulty[playerinfo[i].diff]; break;
								}
								if(val>best) {
									list=[];
									list.push(i);
									best=val;
								} else if(val==best) {
									list.push(i);
								}
							}
						}
					}
				}
			}
		}
		
		if(list.length==0) {
			//console.log('doh, no target.');
		} else if(list.length>count) {
			list=list.slice(0,count);
		} else if(list.length<count) {
			while(list.length<count) {
				list.push(list[0]);
			}
		}
		return list;
	}

	function decide_actions(){
		var numatt = parseInt($('#spartacus_numatt').val()) || 3;
		if(numatt>3) { numatt=3; }
		
		if(currdata.s==2) { // fight active
			if($('#spartacus_powerattack').is(':checked')) {
				poweratt_on();
			} else {
				poweratt_off();
			}
			// power ups
			var usekami=$('#spartacus_boostkami').is(':checked');
			if(usekami && !powerup_status.kami_used) {
				var kamitime = parseInt($('#spartacus_boostkami_s').val());
				if(currdata.t<kamitime) {
					use_powerup(5);
				}
			}
			
			// send queued powerup
			if(powerup_command.active!=-1) {
				cmdqueue.unshift('3:'+powerup_command.active);
				if ((powerup_command.active==1) || (powerup_command.active==2)) { // don't retry heal or stam refill
					powerup_command.active = -1;
					$('.spartacus_boost.spartacus_puactive').removeClass('spartacus_puactive').addClass('spartacus_punormal');
					$('.spartacus_boost2.spartacus_puactive').removeClass('spartacus_puactive').addClass('spartacus_punormal');
				}
			}

			if(decide_allowed_to_attack()) {
				var i,who=decide_who_to_attack(numatt-cmdqueue.length);
				for(i=0;i<who.length;i++) {
					attack(who[i],1);
				}
			}
			//console.log(cmdqueue);
		}
	}

	function get_rewards(handler) {
		// log('Retrieving rewards...');
		GrabRequest('xw_controller=Arena&xw_action=rewards&xw_client_id=8', 'spart', function(msg){
			parse_loot(msg);
			setTimeout(function(){ getStats(displayMafiaStats); },2000);
			run = false;
			
		});
	}
	function update_crests(){
		GrabRequest('xw_controller=lobby&xw_action=play', 'spart', function(resp){
			var $page = $('<div>'+resp+'</div>');
			var crests = parseInt($page.find('.mastery_stat_cont').find('.respect_value').text());
			var output = '';
			if(!isNaN(crests)){
				if(last_crests){
					output += crests+'<span class="good">(+'+(crests-last_crests)+')</span>';
				}
				else{
					output += crests;
					last_crests = crests;
				}
			}
			$('#spartacus_crests').html(output);
		},$.noop)
	}
	
	function parse_loot(msg){
		window.eikea=msg;
		var $msg=$('<div>'+msg+'</div>');
		var rewards={},arena={};
		var mobfury = false;
		if ($msg.find('div.team-status').length > 0) {
			mobfury = true;
			rewards.xp = parseInt($msg.find('div.xp-earned span.value').text()) || 0;
			rewards.respect = parseInt($msg.find('div.respect-earned span.value').text()) || 0;
		}
		else {
			rewards.xp = parseInt($msg.find('.xp_earned > .value').text()) || 0;
			rewards.respect = parseInt($msg.find('.respect_earned > .value:first').text()) || 0;
		}
		//rewards.xp = (mobfury ? parseInt($msg.find('span.value:first','div.xp-earned').text()) : parseInt($msg.find('.xp_earned > .value').text()));
		//rewards.respect = (mobfury ? parseInt($msg.find('span.value:first','div.respect-earned').text()) : parseInt($msg.find('.respect_earned > .value:first').text()));
		if($msg.find('.respect_earned > .label:last').text().indexOf('Crests')!=-1) {
			rewards.crests=parseInt($msg.find('.respect_earned > .value:last').text()) || 0;
		}
		rewards.stam_cur=parseInt($msg.find('.stamina_stats > .current').text());
		rewards.stam_total=parseInt($msg.find('.stamina_stats > span:last').text());
		if (mobfury) {
			if($msg.find('div.team-board.winner').find('li.myself').length > 0) {
				rewards.rank = 1;
			}
			else {
				rewards.rank = 6;
			}
			// get my team, there is probably an easier way for that
			if($msg.find('.team-red .myself').length>0) {
				rewards.stars=$msg.find('.team-red .gold-star').length;
			} else {
				rewards.stars=$msg.find('.team-blue .gold-star').length;
			}
		}
		else {
			rewards.rank = $msg.find('.rank_holder > .position').text();
		}
		if(currdata) {
			rewards.stamused=(stam_on_start - currdata.mi.st);
		}
		rewards.ratio=(rewards.xp / rewards.stamused).toFixed(2);
		rewards.loot=[];
		rewards.points=parseInt($('#spartacus_score'+meid).text());
		
		var loot_strings=[];
		$($msg.find('#your_reward_list > .arena_fight_rewards_item_container')).each(function(){
			var loot = {};
			loot.name = $(this).find('.arena_reward_items_bg > .name').text().trim() || $(this).find('.arena_reward_items_special_bg > .name').text().trim();
			loot.id = $(this).find('.arena_reward_items_bg img').attr('item_id') || false;
			loot.src = $(this).find('.arena_reward_items_bg img').attr('src') || $(this).find('.arena_reward_items_special_bg img').attr('src');
			loot.quantity = parseInt($(this).find('.qty').text().trim().substr(2)) || 1;
			loot.attack = parseInt($(this).find('.attack').text().trim()) || 0;
			loot.defense = parseInt($(this).find('.defense').text().trim()) || 0;
			rewards.loot.push(loot);
			loot_strings.push('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		});
		if(rewards.crests){
			var loot={ name:"Crests", src:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/crestlogo_16.png",quantity:rewards.crests };
			rewards.loot.push(loot);
			loot_strings.unshift('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		}
		if(rewards.stars) {
			var loot={ name:"Stars", src:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/TeamVSTeam/result_star_filled.png",quantity:rewards.stars };
			rewards.loot.push(loot);
			loot_strings.unshift('<img src="'+loot.src+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		}
		// console.log(rewards);
		log('Result: #'+rewards.rank+' <span class="experience">'+rewards.xp+' ('+rewards.ratio+')</span> <span class="respect">'+(rewards.respect>0?'+':'')+rewards.respect+'</span> '+loot_strings.join(''));
		write_loot();
		update_crests();
		
		var logline='';
		var opponents=0, opponentname='',name='',score=0,resp=0,pos=1;
		if (mobfury) {
			//Team Red
			logline += '[<span class="spartacus_teamred"><strong>Team Red</strong></span>] ';
			$($msg.find('div.team-red .standings_list')).each(function(){
				name = $(this).find('.name').text();
				score = $(this).find('.score').text();
				resp = $(this).find('.respect_wrapper').html();
				logline += pos+'. '+name+' <span class="respect">'+resp+'</span> Score: '+score+' - ';
				pos++;
			});
			//Team Blue
			logline += ' [<span class="spartacus_teamblue"><strong>Team Blue</strong></span>] ';
			pos = 1;
			$($msg.find('div.team-blue .standings_list')).each(function(){
				name = $(this).find('.name').text();
				score = $(this).find('.score').text();
				resp = $(this).find('.respect_wrapper').html();
				logline += pos+'. '+name+' <span class="respect">'+resp+'</span> Score: '+score+' - ';
				pos++;
			});
			arena.teamred = parseInt($msg.find('#team-red-score').text()) || 0;
			arena.teamblue = parseInt($msg.find('#team-blue-score').text()) || 0;
			arena.type = 'mobfury';
			opponentname = 'Mob Fury';
			stats.respect = parseInt($msg.find('li.standings_list.myself div.respect_wrapper').html());
		}
		else {
			$($msg.find('.standings_list')).each(function(){
				var pos=$(this).find('.pos').text();
				var name=$(this).find('.name').text();
				var resp=$(this).find('.respect_wrapper').html();
				var powerups='';
				$(this).find('.powerups_used img').each(function(){
					powerups+='<img src="'+this.src+'" width="16" height="16" />';
				});
				logline+=pos+'. '+name+' <span class="respect">'+resp+'</span> '+powerups+' ';
				if(pos==parseInt(rewards.rank)) { stats.respect=parseInt(resp); }
				opponents++;
				if(!$(this).hasClass('its_me') || !$(this).hasClass('myself')) { opponentname=name; }
			});
		}
		log(logline);
		
		// arena list
		arena.rank = parseInt(rewards.rank);
		arena.stam = rewards.stamused>0?rewards.stamused:0;
		arena.points = rewards.points;
		arena.crests = rewards.crests;
		arena.opponents = (mobfury ? 1 : opponents);
		arena.opponentname = opponentname;
		arena.diff = '';
		$('span[id*="spartacus_diff"]').each(function(){arena.diff+=$(this).text().substr(0,1);})		
		arenalist.push(arena);
		write_arenas();

		if(msg.indexOf('You are now LEVEL')!=-1) {
			$('#Activity').html('<span class="good">Levelup!</span>');
			leveluped();
		}
		stats.stamina+=rewards.stamused;
		stats.xp+=rewards.xp;
		stats.arenas++;
		if(rewards.stars) {
			stats.stars+=rewards.stars;
		}
		stats.ranks[parseInt(rewards.rank)-1]++;
		stats.crests+=rewards.crests;
	}

	function add_loot(item) {
		var id = (Util.isset(item.id) ? item.id : item.name);
		if (typeof looted[id] == 'object') {
			looted[id].quantity += item.quantity;
		}
		else {
			looted[id] = {
				"id": id, "name": item.name, "src": item.src, "quantity": item.quantity, "attack":item.attack, "defense":item.defense
			}
		}
	}

	function sort_loot(){
		var x,list = [];
		for (x in looted) {
			list.push(x);
		}
		list.sort(function(a,b){
			if(looted[a].name=="Ices") { return -1; }
			if(looted[b].name=="Ices") { return 1; }
			if(looted[a].name=="Crests") { return -1; }
			if(looted[b].name=="Crests") { return 1; }
			if(looted[a].name=="Stars") { return -1; }
			if(looted[b].name=="Stars") { return 1; }
			return compare(max(looted[a].attack,looted[a].defense),max(looted[b].attack,looted[b].defense));
		});
		return list;
	}

	function write_loot() {
		var sorted=sort_loot();
		var loothtml = '<table>';
		for (i=0;i<sorted.length;i++) {
			var loot = looted[sorted[i]];
			var image = '<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" title="'+loot.name+'" width="16" height="16" />';
			if (itemdatabase[loot.id]) {
				var loot2 = itemdatabase[loot.id];
				var attack = '', defense = '', improves = false, improve = '', stopat = '';
				if (loot2.attack > 0) {
					attack = '['+loot2.attack+'A';
					if(worstitems[itemdatabase[loot.id].type].att<loot2.attack) {
						improves = true;
						improve += '<span class="attack good">+'+(loot2.attack - worstitems[itemdatabase[loot.id].type].att)+'</span> ';
					}
				}
				if (loot2.defense > 0) {
					defense = loot2.defense+'D]';
					if(worstitems[itemdatabase[loot.id].type].def<loot2.defense) {
						improves = true;
						improve += '<span class="defense good">+'+(loot2.defense - worstitems[itemdatabase[loot.id].type].def)+'</span>';
					}
				}	
				var have = loot.quantity;
				have = (loot2.quantity>0?' <span class="more_in">Have: '+(loot2.quantity+loot.quantity)+'</span>':'');
				loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td><td>'+image+'<span style="'+(improves?"color:yellow;":"")+'">'+loot2.name+'</td><td>'+attack+'</td><td>'+defense+'</span></td><td>'+improve+'</td><td>'+have+'</td></tr>';
			}
			else
			{
				if(loot.name=="Ices") {
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td><span style="color: #609AD1; font-weight:bold;">'+image+loot.name+'</span></td><td></tr>';
				} else if (loot.name=="Stars") {
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td><span style="color: yellow; font-weight:bold;">'+image+loot.name+'</span></td><td></tr>';
				} else {
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td>'+image+loot.name+'</td><td></tr>';
				}
			}
		}
		loothtml += '</table>';
		$('#spartacus_lootlog').html(loothtml);
	}
	
	function write_arenas(){
		var i,score,html='';
		for(i=0;i<arenalist.length;i++){
			var type,arena=arenalist[i];
			if (arena.opponents > 2) {
				type = 'Rank: '+arena.rank+" of "+arena.opponents;
				score = 'Score: '+arena.points;
			}
			if (arena.opponents < 3) {
				type = (arena.rank==1?'Won':'Lost')+" against "+arena.opponentname;
				score = 'Score: '+arena.points;
			}
			if (arena.type == 'mobfury') {
				type = 'MobFury '+(arena.rank==1?'Victory':'Loss');
				score = 'Red: '+arena.teamred+' vs Blue: '+arena.teamblue;
			}
			html += 'Arena #'+(i+1)+' '+type+', '+score+', Stamina: '+arena.stam+(arena.crests?', Crests:'+arena.crests:'')+'';
			html+='<br />';
		}
		$('#spartacus_arenalog').html(html);
	}
	
	function get_stage(i) {
		if(i==0) { return "Waiting for more players.."; }
		if(i==1) { return "Waiting for Start."; }
		if(i==2) { return "Fighting!"; }
		if(i==3) { return "Finished."; }
		if(i==4) { return "Waiting for Opponent(s)..."; } // challenge mode
		return "Unknown:"+i;
	}

	function send_queue() {
		if(cmdqueue.length>0) {
			var string='{"Nonce":'+currdata.mi.ammo+',"CMD":"'+cmdqueue.join(';')+'"}'
			cmdqueue=[];
			socke.send(string);
		}
	} 

	function attack(i,num) {
		var j;
		for(j=0;j<num;j++) {
			cmdqueue.push("1:"+i);
		}
	}

	function poweratt_on() {
		if(poweratt!==true) {
			cmdqueue.push("2:1");
			poweratt=true;
		}
	}

	function poweratt_off() {
		if(poweratt!==false) {
			cmdqueue.push("2:0");
			poweratt=false;
		}
		return false
	}


	function use_powerup(id) {
		powerup_command.active=id;
		powerup_command.target=undefined;
	}

	function update_info(data) {
		if(data.s==2) {
			// update last data received
			if(last_update>0) {
				var newtime=(new Date()).getTime();
				$('#spartacus_delay').text((newtime-last_update)+'ms');
				last_update=newtime;
			} else {
				last_update=(new Date()).getTime();
			}
		}
		set_progress_bar(data.t,data.s==2?90:20,data.t+' seconds left');
		if(data.s==1) {
			starting_in = unix_timestamp()+data.t;
			clearInterval(starting_in_counter) ;
			starting_in_counter = setInterval(function(){
				if(starting_in < unix_timestamp()) {
					clearInterval(starting_in_counter) ;
				} else {
					set_progress_bar(parseInt(starting_in - unix_timestamp()),20,starting_in - unix_timestamp()+' seconds left');
				}
			},1000);
			if(data.mi) {
				stam_on_start = data.mi.st; // save at start
			}
		}
		else {
			clearInterval(starting_in_counter);
		}
		if(data.mi && (stam_on_start==-1)) {
			stam_on_start = data.mi.st;
		}
		$('#spartacus_stage').html(get_stage(data.s));
		if(data.s<1) {
			$('#spartacus_stage').append(' <a href="#" id="spartacus_leave">(leave)</a>');
			$('#spartacus_leave').click(function(){
				socke.send('{"Nonce":-1,"CMD":"2"}');
				return false;
			});
		}

		tscore={"1":0,"2":0};
		
		// enemy powerups
		for(i in data.pi) {
			var pi=data.pi[i];
			// thanks Alex for this idea
			if(pi.ph == 0){
				if(healtimer[i]<10) {
					healtimer[i] = unix_timestamp() + 10;
					$('#spartacus_usepu'+i+' > .spartacus_boost').removeClass('spartacus_puclick').addClass('spartacus_punoclick').removeClass('spartacus_pufull').addClass('spartacus_puoff');
					$('#spartacus_usepu'+i+' > .spartacus_kill').removeClass('spartacus_puclick').addClass('spartacus_punoclick').removeClass('spartacus_pufull').addClass('spartacus_puoff');
					$('#spartacus_usepu'+i+' > .spartacus_boost2').removeClass('spartacus_punoclick').addClass('spartacus_puclick').removeClass('spartacus_puoff').addClass('spartacus_pufull');
				}
				var t=(healtimer[i] - unix_timestamp()); if(t<1) { t=1; }
				$('#spartacus_health'+i).html('<span class="bad">in '+t+'s</span>');
			}
			else {
				$('#spartacus_health'+i).html(pi.ph.toFixed(1)+'%');
					$('#spartacus_usepu'+i+' > .spartacus_boost').removeClass('spartacus_punoclick').addClass('spartacus_puclick').removeClass('spartacus_puoff').addClass('spartacus_pufull');
					$('#spartacus_usepu'+i+' > .spartacus_kill').removeClass('spartacus_punoclick').addClass('spartacus_puclick').removeClass('spartacus_puoff').addClass('spartacus_pufull');
					$('#spartacus_usepu'+i+' > .spartacus_boost2').removeClass('spartacus_puclick').addClass('spartacus_punoclick').removeClass('spartacus_pufull').addClass('spartacus_puoff');
			}
			if(unix_timestamp()>healtimer[i]) {
				healtimer[i] = 0;
			}

			$('#spartacus_score'+i).html(pi.sc);
			if (pi.tm == 1) {
				$('#spartacus_op'+i).addClass('spartacus_teamred');
			}
			else if (pi.tm == 2) {
				$('#spartacus_op'+i).addClass('spartacus_teamblue');
			}
			else {
				$('#spartacus_op'+i).removeClass('spartacus_teamblue').removeClass('spartacus_teamred');
			}
			if(pi.tm) {
				tscore[pi.tm]+=pi.sc;
			}
			
			var puhtml='';
			if(pi.pu>1) { puhtml+='<span class="spartacus_defsh">&nbsp;</span> '; }
			if(pi.pu%2==1) { puhtml+='<span class="spartacus_offsh">&nbsp;</span> '; }
			$('#spartacus_pu'+i).html(puhtml);
		}
		if(data.ti) {
			if(data.ti["1"] && data.ti["2"]) {
				tscore["1"]+=2000 * data.ti["1"].stars;
				tscore["2"]+=2000 * data.ti["2"].stars;
				var t1=tscore["1"], t2=tscore["2"];
				var s1='',s2='';
				if(data.ti["1"].stars==0) {
					s1=nostarimg;
				} else {
					for(var i=0;i<data.ti["1"].stars;i++) { s1+=starimg; }
				}
				if(data.ti["2"].stars==0) {
					s2=nostarimg;
				} else {
					for(var i=0;i<data.ti["2"].stars;i++) { s2+=starimg; }
				}

				if(meteam==1) {
					$('#spartacus_teamscore').html('<span style="color:#ec2d2d;">Team Red (you)</span> score: <span class="'+(t1>=t2?'good':'bad')+'">'+t1+'</span> '+s1+' vs. <span style="color:#0099FF;">Team Blue</span> score: <span class="'+(t2>=t1?'good':'bad')+'">'+t2+'</span> '+s1);
				} else {
					$('#spartacus_teamscore').html('<span style="color:#0099FF;">Team Blue (you)</span> score: <span class="'+(t2>=t1?'good':'bad')+'">'+t2+'</span> '+s2+' vs. <span style="color:#ec2d2d;">Team Red</span> score: <span class="'+(t1>=t2?'good':'bad')+'">'+t1+'</span> '+s1);
				}
			}
		}
		if(data.mi) {
			$('#spartacus_me_st').html(data.mi.st);
			if(data.mi.pui) {
				update_powerups(data.mi.pui);
			}
			$('#spartacus_me_sr').html(data.mi.sr);

			if(currdata && currdata.mi) {
				if(data.mi.st>currdata.mi.stam+100) { 
					log('Used a stamina refill!');
					stam_on_start += (data.mi.st-currdata.mi.stam);
				}
			}
			$('#spartacus_me_stused').html(stam_on_start - data.mi.st);
			if (Util.isset(data.mi.tpst)) {
				var stamarr = data.mi.tpst.split('|'), stai;
				for (stai=0;stai<stamarr.length;stai++) {
					var stampi = stamarr[stai].split(',');
					$('#spartacus_stam'+stampi[0]).html(stampi[1]+'%');
				}
			}
		}

		if(meid) {
			$('#spartacus_me_health').removeClass('good').removeClass('bad').addClass(data.pi[meid].ph>0?'good':'bad').html(data.pi[meid].ph);
			if((data.pi[meid].ph==0) && (currdata.pi[meid].ph>0)) {
				healed_in=unix_timestamp()+10;
				clearInterval(healed_in_counter);
				healed_in_counter = setInterval(function(){
					if(unix_timestamp()>healed_in) {
						clearInterval(healed_in_counter);
						$('#spartacus_healin').html('');
					} else {
						$('#spartacus_healin').html('Healing in '+(healed_in - unix_timestamp())+'s');
					}
				},1000);
			} else {
				try {
					$('#spartacus_healin').html('');
					clearInterval(healed_in_counter);
				} catch(e){ }
			}
		}

		for(i in data.pi) {
			if((data.pi[i].pid) && (!playerids[data.pi[i].pid])) {
				playerinfo[i]={ id:data.pi[i].pid };
				playerids[data.pi[i].pid]=i;
				if(data.pi[i].pid==User.id.substr(2)) {
					meid=i;
				}

				GrabRequest('xw_controller=Arena&xw_action=getSingleUserData&pid='+data.pi[i].pid+'&xw_client_id=8', 'spart', function(msg){
					var id,json=JSON.parse(msg);
					for(id in json.data.result) {
						var nr=playerids[id];
						playerinfo[nr].name=json.data.result[id].name;
						playerinfo[nr].respect=json.data.result[id].playerRespect.replace(',','').replace('K','000');
						playerinfo[nr].diff=difficulty[json.data.result[id].defenseFlag+json.data.result[id].mafiaDefenseFlag];
						if(id == User.id.substr(2)) {
							$('#spartacus_name'+nr).html('<span id="spartacus_hover'+nr+'"><img src="'+json.data.result[id].pic+'" width="32" height="32" /><span class="good">Me!</span></span>');
							$('#spartacus_diff'+nr).html('<div class="difficulty">-</div>');
							if(!stats.respect) { stats.respect_start=json.data.result[id].playerRespect.replace(',','').replace('K','000'); }
							$('#spartacus_usepu'+nr).html(
								'<img src="'+powerups[2].pic+'" width="24" height="24" data-id="2" '+$c('boost2',['puoff','punoclick','punormal'])+' title="Use health boost">'+
								'<img src="'+powerups[3].pic+'" width="24" height="24" data-id="3" '+$c('boost',['pufull','puclick','punormal'])+' title="Use meta flair">'+
								'<img src="'+powerups[4].pic+'" width="24" height="24" data-id="4" '+$c('boost',['pufull','puclick','punormal'])+' title="Use pain killer">'+
								'<img src="'+powerups[7].pic+'" width="24" height="24" data-id="7" '+$c('boost',['pufull','puclick','punormal'])+' title="Use reflector">'
							);
						}
						else {
							var m;
							if(m=/\d+_(\d+)_\d+/.exec(json.data.result[id].pic)) {
								var fb=(friendlist[m[1]]?' <img width="12" height="12" title="Facebook Friend: '+friendlist[m[1]]+'" src="http://www.facebook.com/favicon.ico">':'');
								$('#spartacus_name'+nr).html('<span id="spartacus_hover'+nr+'"><img src="'+json.data.result[id].pic+'" width="32" height="32" /><a href="https://www.facebook.com/'+m[1]+'" target="_blank">'+playerinfo[nr].name+fb+'</a></span>');
							} else {
								$('#spartacus_name'+nr).html('<span id="spartacus_hover'+nr+'"><img src="'+json.data.result[id].pic+'" width="32" height="32" />'+playerinfo[nr].name+'</span>');
							}
							$('#spartacus_name'+nr).append('<span data-id="'+id+'" id="spartacus_infobox'+nr+'" style="display:none;position:absolute;border:2px white solid;background-color:#222;padding:5px;border-radius:5px;">loading...</span>');
							$('#spartacus_diff'+nr).html('<div class="difficulty">'+playerinfo[nr].diff+'</div>');
							var target='https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/leaderboard/leaderboardTarget.png';
							var defense='https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-defense_04.gif';
							$('#spartacus_usepu'+nr).html(
								'<img src="'+powerups[5].pic+'" width="24" height="24" data-nr="'+nr+'" data-id="5" '+$c('boost',['pufull','puclick','punormal'])+' title="Nuke opponent (Kamikaze)">'+
								'<img src="'+powerups[6].pic+'" width="24" height="24" data-nr="'+nr+'" data-id="6" '+$c('boost',['pufull','puclick','punormal'])+' title="Use drain on opponent">'+
								'<img src="'+target+'" width="24" height="24" data-nr="'+nr+'" '+$c('kill',['pufull','puclick','punormal'])+' title="Hit this player until dead" >'+
								'<img src="'+defense+'" width="24" height="24" data-nr="'+nr+'" '+$c('protect',['puhalf','puclick','punormal'])+' title="Do not attack this player (click to enable, click again to disable)" >'


							);
						}
						$('#spartacus_name'+nr).append('<span data-id="'+id+'" id="spartacus_infobox'+nr+'" style="display:none;position:absolute;border:2px white solid;background-color:#222;padding:5px;border-radius:5px;">loading...</span>');

						$('#spartacus_respect'+nr).html(playerinfo[nr].respect);
						var testnumbs = 'spartacus';
						$('#spartacus_hover'+nr).hover(function(event){
							var num=this.id.substr(6+testnumbs.length);
							var id=$('#spartacus_infobox'+num).attr('data-id');
							$('#spartacus_infobox'+num).css("top",event.pageY+'px').css("left",(event.pageX-100)+'px');
							if(!$('#spartacus_infobox'+num).attr('spdone')) {
								$('#spartacus_infobox'+num).html('Profile loading...');
								load_player_profile(id,num);
							}
							$('#spartacus_infobox'+num).show();
						},function(){
							var num=this.id.substr(6+testnumbs.length);
							$('#spartacus_infobox'+num).hide();
						});
						
						
						/* intervene, protect */
						$('#spartacus_usepu'+nr,' > .spartacus_protect').click(function(){
							var pnr=$(this).attr('data-nr');
							if(protect[pnr]) {
								delete protect[pnr];
								$(this).removeClass('spartacus_pufull').addClass('spartacus_puhalf');
							} else {
								protect[pnr] = 1;
								$(this).removeClass('spartacus_puhalf').addClass('spartacus_pufull');
							}
						});
						
						/* intervene, kill */
						$('#spartacus_usepu'+nr,' > .spartacus_kill').click(function(){
							if($(this).hasClass('spartacus_puclick')) { // only when active
								var pnr=$(this).attr('data-nr');
								if(powerup_command.target==pnr) { // turn off
									$(this).removeClass('spartacus_puactive').addClass('spartacus_punormal');
									powerup_command.target=undefined;
								} else if (powerup_command.target===undefined) { // no target yet
									$(this).removeClass('spartacus_punormal').addClass('spartacus_puactive');
									powerup_command.target=pnr;
								} else { // switch target
									$('#spartacus_usepu'+powerup_command.target,' > img.spartacus_kill').removeClass('spartacus_puactive').addClass('spartacus_punormal');
									$(this).removeClass('spartacus_punormal').addClass('spartacus_puactive');
									powerup_command.target=pnr;
								}
							}
						});
						
						/* intervene, boost */
						$('#spartacus_usepu'+nr+' > .spartacus_boost,#spartacus_usepu'+nr+' > .spartacus_boost2').click(function(){
							//console.log('click');
							if($(this).hasClass('spartacus_puclick')) { // only when active
								var puid=$(this).attr('data-id');
								var pnr=$(this).attr('data-nr');
								$('.spartacus_boost.spartacus_puactive').removeClass('spartacus_puactive').addClass('spartacus_punormal');
								$(this).removeClass('spartacus_punormal').addClass('spartacus_puactive');
								powerup_command.active = puid;
								powerup_command.target = pnr;
							}
						});
					}
				});
			}

			if(!meteam) {
				if(data.pi[i] && (data.pi[i].pid==User.id.substr(2))) {
					if(data.pi[i].tm!=0) {
						meteam=data.pi[i].tm;
						//log('found team:'+meteam);
					}
				}			
			}
		}
		// sort player and rank
		var rank=[];
		for(i in playerinfo) {
			rank.push(i);
		}
		try {
			rank.sort(function(a,b){return cmp(data.pi[a].sc, data.pi[b].sc);});
		} catch (notyetstartederror) {}
		for(i=0;i<rank.length;i++){
			if(!$('#spartacus_sortplayer').is(':checked')) {
				if(!over_table) {
					$('#spartacus_table').append($('#spartacus_op'+rank[i]));
				}
			}
			$('#spartacus_rank'+rank[i]).html('#'+(i+1));
		}
		// save old
		currdata=data;
	}
	function load_player_profile(id,nr) {
		$('#spartacus_infobox'+nr).attr('spdone','true');
		GrabRequest('xw_controller=stats&xw_action=view&user='+btoa('p|'+id), 'spart', function(result){
			var $msg=$('<div>'+result.replace(/<img/g,'<noimg')+'</div>');
			window.eike1=result;
			window.eike2=$msg;
			try {
				var name=$msg.find('.stats_title_text').html().re('a> ([^>]*)"');
				var level=$msg.find('.stats_title_text').html().re('level (\\d*)');
				var tag=$msg.find('.stats_title_text > a').text().trim();
				var llink=$msg.find('.stats_title_text > a').attr('href');
				var arena_stats=$msg.find('#arena_collection .collection_list').text().trim().replace(/s*\n\s*/g,"<br />").replace(/:/g,': ');
				var mafia=$msg.find('a:contains("Ask Mafia to Attack")').length==0;
				var fid=atob(unescape(llink.re('id=([^&]*)&')));
			} catch(nofam) {
				var name=$msg.find('.stats_title_text').text().trim().re('"(.*)"');
				var tag="no family";
				var llink='';


			}
			var html='Full name: '+name+'<br />'+
			'Family: '+tag+' ('+fid+')<br/>'+
			'Level: '+level+'<br />'+
			(mafia?'<span class="good">In your mafia</span>':"Not a mafia member")+'<br /><br />'+
			arena_stats;
			$('#spartacus_infobox'+nr).html(html);
			if(tag&&llink) {
				$('#spartacus_hover'+nr+' > img').after(
					'<a href="http://'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=clan&xw_action=view&xw_city=7&mwcom=1&id='+escape(btoa(fid))+'&from_red_link=1" class="mw_new_ajax" selector="#inner_page"><span style="color:red">'+tag+'</span></a> '
				);
			}
		});
	}

	function update_powerups(pui) {
		var html='<table><tr>';
		var i,pups=pui.split('|');
		for(i=0;i<pups.length;i++) {
			var pup=pups[i].split(',');
			var m=(pup[0].indexOf('-')===0);
			pup[0]=Math.abs(pup[0]);
			poweruplist[pup[0]]={ num:pup[2],cooldown:pup[1],type:m }
			if((powerup_command.count[pup[0]]!=pup[2]) && (powerup_command.active==pup[0])) {
				powerup_command.active=-1;
				$('.spartacus_boost.spartacus_puactive').removeClass('spartacus_puactive').addClass('spartacus_punormal');
			}
			powerup_command.count[pup[0]]=pup[2];
		}
		for(i in powerups) {
			if((poweruplist[i].cooldown>0) && (i!=5)) {
				html+='<td valign=top style="text-align:center;"><img class="spartacus_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
				html+='<br /><span title="On cooldown or active">A/C</span> '+poweruplist[i].cooldown+'s</span>';
			} else if (powerup_command.active==i) {
				html+='<td valign=top style="text-align:center;"><img class="spartacus_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num+
				'<br /><span title="Firing (sending command to server)">Fire</span>';
			} else {
				html+='<td valign=top style="text-align:center;"><img class="spartacus_usepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
				html+='<br /><span id="spartacus_pustatus'+i+'"></span>';
			}
			html+='</td>';
		}
		html+='</table>';
		if(poweruplist[5].cooldown>0) {
			powerup_status.kami_active = true;
			powerup_status.kami_used = true;
		}

		$('#spartacus_powerups').html(html);
		$('.spartacus_usepowerup').click(function(){
			var id=$(this).attr('data-id');
			log('Using powerup: '+powerups[id].name);
			$('#spartacus_pustatus'+id).html('<span title="Firing (sending command to server)">Fire</span>');
			use_powerup(id);
			return false;
		});
	}

	function getdiff(now,old){
		if(!old) { return ''; }
		if(parseInt(old)<parseInt(now)) {
			return ' (<span class="good">+'+(parseInt(now)-parseInt(old))+'</span>)';
		} else {
			return '';
		}
	}
	
	function set_progress_bar(value,of,text){
		var pc=100-parseInt(value/of*100);
		if(pc<0) { pc=0; }
		if(pc>100) { pc=100; }
		
		if($('#spartacusbar').length>0) {
			$('#spartacusbar > div').css('width',pc+'%');
			$('#spartacusbar p').text(text);

			if(pc>=88) {
				$('#spartacusbar').removeClass('gold').addClass('ruby');
			} else {
				$('#spartacusbar').removeClass('ruby').addClass('gold');
			}
		} else {
			$('#spartacus_timeleftbar').html(''+
				'<div class="bossInfo">'+
				'<div style="position:relative; height:25px; ">'+
				'<div id="spartacusbar" class="progressBar gold dark_border" style="width:488px; float:left;">'+
				'<div style="width: '+pc+'%;"></div><p style="text-align:center;">'+text+'</p>'+
				'<div style="width: '+pc+'%;"><p style="text-align:center;color:#FFFFFF;">'+text+'</p></div></div>'+
				'</div>'+
				'<div class="progBackground" style="display: none;"></div>'+
				'<div class="clearfix" style="clear:both;"></div></div>');
		}
	}

	function displayMafiaStats(){
		setTimeout(function(){ grabInfoz(); },1000);
		display_all_stats();
	}


	function display_all_stats(){
		var html='';
		html+='Total arenas: '+stats.arenas+' ';
		html+='[';
		html+=stats.ranks[0]+'&times1st, ';
		html+=stats.ranks[1]+'&times2nd, ';
		html+=stats.ranks[2]+'&times3rd, ';
		html+=stats.ranks[3]+'&times4th, ';
		html+=stats.ranks[4]+'&times5th, ';
		html+=stats.ranks[5]+'&times6th';
		html+=']<br />';

		html+='Respect: <span class="respect">'+stats.respect+' ('+sdiff(stats.respect - stats.respect_start)+')</span> ';
		if(stats.crests) {
			html+='Crests: <span class="arena_mastery_crests">'+sdiff(stats.crests)+'</span> ';
		}
		html+='<span class="experience">'+stats.xp+'</span> ';
		html+='<span class="stamina">'+stats.stamina+'</span> ';
		html+='<span class="experience">'+(stats.stamina==0?0:(stats.xp/stats.stamina).toFixed(2))+'</span> ';
		if(stats.stars) {
			html+='<span class="good">'+starimg+stats.stars+'</span> '
		}
		$('#spartacus_allstats').html(html);
	}

	function sdiff(num,color) {
		if(num==0) {
			return '&plusmn;0';
		} else if(num>0) {
			return '+'+num;
		} else {
			return num;
		}
	}
	function cmp(v1,v2){
		return (v1>v2?-1:(v1<v2?1:0));
	}


	var Ping = {
		inUse:false,
		start:0,
		ping:function(ip, callback) {
			if(!this.inUse) {

				this.inUse = true;
				this.callback = callback
				this.ip = ip;

				var _that = this;

				this.img = new Image();

				this.img.onload = function() {_that.good();};
				this.img.onerror = function() {_that.good();};

				this.start = (new Date()).getTime();
				this.img.src = "http://" + ip + '?id='+Math.random(4);
				this.timer = setTimeout(function() { _that.bad();}, 1500);
			}
		},
		good:function(){
			if(this.inUse) {
				this.inUse = false;
				this.callback((new Date()).getTime()-this.start);
				clearTimeout(this.timer);
			}
		},
		bad:function(){
			if(this.inUse) {
				this.inUse = false;
				this.callback(-1);
			}
		}
	}

	function update_game_ui_sp(object) {
		if (Util.isset(object.user_fields)) {
			user_fields_update(object.user_fields);
			user_info_update(object.user_fields, object.user_info);
			if (Util.isset(object.user_fields.zmc_event_count)) {
				$('#zmc_event_count').text(object.user_fields.zmc_event_count);
			}
		}
		if (Util.isset(object.questData)) {
			MW.QuestBar.update(object.questData);
		}
	}	

	function isArray(obj) {
		return obj.constructor == Array;
	}
	function loadInventoryAAN() {
		User.clicks++;
		var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_city': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+'xw_controller=inventory&xw_action=view&from_controller=inventory',
			data: params,
			cache: false,
			success: function(response){
				var ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
				worstitems = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(response)[1]);
				for (x in ZyngaItems) {
					ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
					itemdatabase[ZyngaItems[x].id] = ZyngaItems[x]; //{quantity: ZyngaItems[x].quantity}
				}
				log('Inventory load complete.');
				load_friendlist();

			},
			error: function(){
				log('<span class="bad">Inventory Load failed!</span>');
				load_friendlist();
			}
		});
	}

	function load_friendlist(){
		FB.api('/me/friends',function(data){ 
			var i;
			for(i=0;i<data.data.length;i++) {
				friendlist[data.data[i].id]=data.data[i].name;
			} 
			log('Friendlist load complete.');
		});
	}
	
	function getStats(handler) {
		GrabRequest('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=&city=7&xw_client_id=8', 'spart', function(msg){
			var data = JSON.parse(msg);
			update_game_ui_sp(data);
			stats.mafiaatt=parseInt(data.fightbar.group_atk);
			stats.mafiadef=parseInt(data.fightbar.group_def);
			stats.stam=parseInt(data.user_fields.user_max_stamina);
			stats.worstitems=data.worstitems;
			if(handler) { handler(); }
		});
	}

	function min(a,b){
		return a<b?a:b;
	}
	function max(a,b){
		return a>b?a:b;
	}
	function commas(s) {
		var d;
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}
	function compare(a,b) {
		if (a==b) { return 0; }
		if (a>b) { return -1; }
		return 1;
	}

	function $c(element,spockclasses,otherclasses) {
		var i,str=' class="spartacus_'+element+'';
		if($.isArray(spockclasses)) {
			for(i=0;i<spockclasses.length;i++) {
				str+=' spartacus_'+spockclasses[i];
			}
		}
		if($.isArray(otherclasses)) {
			for(i=0;i<otherclasses.length;i++) {
				str+=' '+otherclasses;
			}
		}
		str+='"';
		return str;
	}
	
	function check_stamina(handler) {
		log('Checking stamina...');
		GrabRequest('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&city=7&xw_client_id=8', 'spart', function(msg){
			try {
				var data = JSON.parse(msg);
				update_game_ui_sp(data);
				var stamavail=data.user_fields.user_stamina;
				var xpneed=data.user_fields.exp_to_next_level;
			} catch(e) {
				logit('Error parsing JSON, retry in 5s...');
				setTimeout(check_stamina,5000,handler);
				return;
			}
			var can_restart = true;
			var stamneed=parseInt($('#spartacus_arenatype>option:selected').text())
			logit(stamneed)
			if(stamavail>stamneed){
				can_restart = true;
			} else {
				can_restart = false;
			}
			if (can_restart) {
				handler();
			} else {
				logit('Not enough stamina.');
				run = false;
				grabInfoz();
			}
		});
	}
	
	function timestamp(sec) {
		var now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		var CurS = now.getSeconds();
		CurS = (CurS<10?'0'+CurS:CurS);
		if(sec) {
			return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
		} else {
			return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
		}
	}

	// by Eike
	String.prototype.re = function(regex){
		var r=new RegExp(regex);
		var m;
		if(m=r.exec(this)) {
			return m[1];
		} else {
			return '';
		}
	}
	/*END SPART*/
	function writeSettings(){
		localStorage.setItem("NaNx", JSON.stringify(NaNx.Settings));
	}
 
	function readSettings(){
		if (!localStorage.getItem("NaNx")) { //no settings
			writeSettings();
		} else {
			var tempsettings = JSON.parse(localStorage.getItem("NaNx"));
			NaNx.Settings = tempsettings;
		}
	}
		
	function displayTime() {
		var str = "";

		var currentTime = new Date()
		var hours = currentTime.getHours()
		var minutes = currentTime.getMinutes()
		var seconds = currentTime.getSeconds()
		
		minutes = minutes+5;
		
		if (minutes < 10) {
			minutes = "0" + minutes
		}
		if(minutes > 59){
			minutes = 60 - minutes;
			minutes = "0" + Math.abs(minutes);
			hours = hours+1;
		}
		if (seconds < 10) {
			seconds = "0" + seconds
		}
		str += hours + ":" + minutes + ":" + seconds + " ";
		if(hours > 11){
			str += "PM"
		} else {
			str += "AM"
		}
		return str;
	}
	
	function leveluped(){
		window.stop();
		updateStats(1, 'LvlUps');
		grab_bonus();
		t2 = new Date()
		var dif = t1.getTime() - t2.getTime()
		var Seconds_from_T1_to_T2 = dif / 1000;
		document.getElementById('LVLUPSPD').innerHTML = Math.abs(Seconds_from_T1_to_T2) +' Seconds';
		t1 = new Date()
	}
	
	var mylazybk = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
//	if (mylazybk == 'p|150195276') {	

	function SpendSkillCycle() {
		if(!NaNx.State.isRunning){
			return;
		}
		if(NaNx.Settings.SkillToSpend == 'none'||!SkillPointAssinRunning){
			SkillPointAssinRunning = false;
			return;
		}
		var url;
		var SkillPointNum;
		if(SPAvaiable >= 5 && SPAvaiable < 25){
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+NaNx.Settings.SkillToSpend+'&upgrade_amt=5&no_load=1&source=level_up_popup';
		}else if(SPAvaiable >= 25 && SPAvaiable < 100){
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+NaNx.Settings.SkillToSpend+'&upgrade_amt=25&no_load=1&source=level_up_popup';
		}else if(SPAvaiable >= 100){
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+NaNx.Settings.SkillToSpend+'&upgrade_amt=100&no_load=1&source=level_up_popup';
		}else{
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+NaNx.Settings.SkillToSpend+'&upgrade_amt=1&no_load=1&source=level_up_popup';
		}
		if(url.match(/&upgrade_amt=5/g)){
			SkillPointNum = '5 Skillpoints';
		}else if(url.match(/&upgrade_amt=25/g)){
			SkillPointNum = '25 Skillpoints';
		}else if(url.match(/&upgrade_amt=100/g)){
			SkillPointNum = '100 Skillpoints';
		}else if(url.match(/&upgrade_amt=1&/g)){
			SkillPointNum = '1 Skillpoint';
		}
		GrabRequest(url, 'none', function(msg){
			if(!NaNx.State.isRunning){
				return;
			}
			$('#Activity').html('<span class="good">Applied <font color="gold">'+SkillPointNum+'</font> to:</span> <font color="gold">'+SkillsTo+'</font>');
			try{
				var data = JSON.parse(msg);
				user_fields_update(data.user_fields);
                user_info_update(data.user_fields, data.user_info);
				SPAvaiable = parseInt(data.user_fields.user_skill);
				if(SPAvaiable == 0){
					SkillPointAssinRunning = false;
					grabInfoz();
					return;
				}else{
					SpendSkillCycle();
				}
			}catch(errz){
				setTimeout(function(){SpendSkillCycle();},1000);
			}
		});
	}
	
	/*add analytics*/
function loadContent(file) {
	var head=document.getElementsByTagName('head').item(0);
	var scriptTag=document.getElementById('loadScript');
	if(scriptTag)head.removeChild(scriptTag);
	script=document.createElement('script');
	script.src=file;
	script.type='text/javascript';
	script.id='loadScript';
	head.appendChild(script);
	setTimeout(load,1000);
}
loadContent('http://www.google-analytics.com/ga.js');
function load() {
	try {
		var pageTracker=_gat._getTracker("UA-35022618-1");
		pageTracker._trackPageview("/NANX");
	} catch(err){}
}
/*end analytics*/
};
injectScript(myscript);