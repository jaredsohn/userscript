// ==UserScript==
// @name          OGame Build Timer
// @namespace     http://alecspopa.com/
// @description   Displays the time until you can build
// @version 	  3.1.1
// @include 	  http://*.ogame.*/*
// @grant         none
// @run-at        document-end
// ==/UserScript==


/********************************************************************************/
/*** Script Options *************************************************************/
/********************************************************************************/
// 0 to add timer on every building even if you dont have the research to build it
// 1 to add timer only on buildings that you can build
var unknownBuildingDisableBuildTime = 1;

// 0 disable right sidebar banner
// 1 enable rightside banner
var showBanner = 0;


/********************************************************************************/
/*** Page Variables ***********************************************************************/
/********************************************************************************/
// get jquery
var $ = unsafeWindow.jQuery;
// debuging console.log
var console = unsafeWindow.console;


/********************************************************************************/
/*** Variables ******************************************************************/
/********************************************************************************/
// curent page. ex: 'resource'
var urlPage = $('body').attr('id');


// buildings [0]=metal, [1]=cry, [2]=deu, [3]=multiplication factor, [4]=building level, [5]=needMetal, [6]=needCry, [7]=needDeu, [8]=etaMetal, [9]=etaCry, [10]=etaDeu
var buildings = {
	// resource buildings
	1   : new Array(60, 15, 0, 1.5, 0, 0, 0, 0, 0, 0, 0), 				// Metal Mine
	2   : new Array(48, 24, 0, 1.6, 0, 0, 0, 0, 0, 0, 0), 				// Crystal Mine
	3   : new Array(225, 75, 0, 1.5, 0, 0, 0, 0, 0, 0, 0), 				// Deuterium Synthesizer
	4   : new Array(75, 30, 0, 1.5, 0, 0, 0, 0, 0, 0, 0), 				// Solar Plant
	12  : new Array(900, 360, 180, 1.8, 0, 0, 0, 0, 0, 0, 0), 			// Fusion Reactor
	212 : new Array(0, 2000, 500, 1, 0, 0, 0, 0, 0, 0, 0),				// Solar Satellite
	22  : new Array(1000, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0), 				// Metal Storage
	23  : new Array(1000, 500, 0, 2, 0, 0, 0, 0, 0, 0, 0), 				// Crystal Storage
	24  : new Array(1000, 1000, 0, 2, 0, 0, 0, 0, 0, 0, 0), 			// Deuterium Tank
	25  : new Array(1000, 1000, 0, 2, 0, 0, 0, 0, 0, 0, 0), 			// Metal Den
	26  : new Array(1000, 1000, 0, 2, 0, 0, 0, 0, 0, 0, 0), 			// Deuterium Tank
	27  : new Array(1000, 1000, 0, 2, 0, 0, 0, 0, 0, 0, 0), 			// Deuterium Tank
	// station buildings
	14  : new Array(400, 120, 200, 2, 0, 0, 0, 0, 0, 0, 0), 			// Robotics Factory
	21  : new Array(400, 200, 100, 2, 0, 0, 0, 0, 0, 0, 0), 			// Shipyard
	31  : new Array(200, 400, 200, 2, 0, 0, 0, 0, 0, 0, 0), 			// Research Lab
	34  : new Array(20000, 40000, 0, 2, 0, 0, 0, 0, 0, 0, 0), 			// Alliance Depot
	44  : new Array(20000, 20000, 1000, 2, 0, 0, 0, 0, 0, 0, 0), 		// Missile Silo
	15  : new Array(1000000, 500000, 100000, 2, 0, 0, 0, 0, 0, 0, 0), 	// Nanite Factory
	33  : new Array(0, 50000, 100000, 2, 0, 0, 0, 0, 0, 0, 0), 			// Terraformer *energy dosen't have build time because it depends on the energy source
	// research
	113 : new Array(0, 800, 400, 2, 0, 0, 0, 0, 0, 0, 0), 				// Energy Technology
	120 : new Array(200, 100, 0, 2, 0, 0, 0, 0, 0, 0, 0), 				// Laser Technology
	121 : new Array(1000, 300, 100, 2, 0, 0, 0, 0, 0, 0, 0), 			// Ion Technology
	114 : new Array(0, 4000, 2000, 2, 0, 0, 0, 0, 0, 0, 0), 			// Hyperspace Technology
	122 : new Array(2000, 4000, 1000, 2, 0, 0, 0, 0, 0, 0, 0), 			// Plasma Technology
	115 : new Array(400, 0, 600, 2, 0, 0, 0, 0, 0, 0, 0), 				// Combustion Drive
	117 : new Array(2000, 4000, 600, 2, 0, 0, 0, 0, 0, 0, 0), 			// Impulse Drive
	118 : new Array(10000, 20000, 6000, 2, 0, 0, 0, 0, 0, 0, 0), 		// Hyperspace Drive
	106 : new Array(200, 1000, 200, 2, 0, 0, 0, 0, 0, 0, 0), 			// Espionage Technology
	108 : new Array(0, 400, 600, 2, 0, 0, 0, 0, 0, 0, 0), 				// Computer Technology
	124 : new Array(4000, 8000, 4000, 1.75, 0, 0, 0, 0, 0, 0, 0), 		// Astrophysics
	123 : new Array(240000, 400000, 160000, 2, 0, 0, 0, 0, 0, 0, 0), 	// Intergalactic Research Network
	199 : new Array(0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0), 					// Graviton Technology *energy dosen't have build time because it depends on the energy source
	111 : new Array(1000, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0), 				// Armour Technology
	109 : new Array(800, 200, 0, 2, 0, 0, 0, 0, 0, 0, 0), 				// Weapons Technology
	110 : new Array(200, 600, 0, 2, 0, 0, 0, 0, 0, 0, 0), 				// Shielding Technology
	// shipyard
	204 : new Array(3000, 1000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Light Fighter
	205 : new Array(6000, 4000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Heavy Fighter
	206 : new Array(20000, 7000, 2000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Cruiser
	207 : new Array(45000, 15000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Battleship
	215 : new Array(30000, 40000, 15000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Battlecruiser
	211 : new Array(50000, 25000, 15000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Bomber
	213 : new Array(60000, 50000, 15000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Destroyer
	214 : new Array(5000000, 4000000, 1000000, 1, 0, 0, 0, 0, 0, 0, 0), // Deathstar
	202 : new Array(2000, 2000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Small Cargo
	203 : new Array(6000, 6000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Large Cargo
	208 : new Array(10000, 20000, 10000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Colony Ship
	209 : new Array(10000, 6000, 2000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Recycler
	210 : new Array(0, 1000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 				// Espionage Probe
	212 : new Array(0, 2000, 500, 1, 0, 0, 0, 0, 0, 0, 0), 				// Solar Satellite
	// defense
	401 : new Array(2000, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0), 				// Rocket Launcher
	402 : new Array(1500, 500, 0, 1, 0, 0, 0, 0, 0, 0, 0),				// Light Laser
	403 : new Array(6000, 2000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Heavy Laser
	404 : new Array(20000, 15000, 2000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Gauss Cannon
	405 : new Array(2000, 6000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Ion Cannon
	406 : new Array(50000, 50000, 30000, 1, 0, 0, 0, 0, 0, 0, 0), 		// Plasma Turret
	407 : new Array(10000, 10000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Small Shield Dome
	408 : new Array(50000, 50000, 0, 1, 0, 0, 0, 0, 0, 0, 0), 			// Large Shield Dome
	502 : new Array(8000, 0, 2000, 1, 0, 0, 0, 0, 0, 0, 0), 			// Anti-Ballistic Missiles
	503 : new Array(12500, 2500, 10000, 1, 0, 0, 0, 0, 0, 0, 0) 		// Interplanetary Missiles
};


/********************************************************************************/
/*** Util Functions ******************************************************************/
/********************************************************************************/
// convert build time is something human readable
function timeConvertor(etaTime) {
	if(etaTime == 'Infinity' || etaTime == '-Infinity') {
		return '&#8734';
	} else {
		var etaDays = Math.floor(etaTime / 86400);
		var etaHours = (Math.floor(etaTime / 3600)) - etaDays * 24;
		var etaMinutes = (Math.floor(etaTime / 60)) - etaDays * 24 * 60 - etaHours * 60;
		var etaSeconds = Math.floor(etaTime - etaDays * 24 * 60 * 60 - etaHours * 60 * 60 - etaMinutes * 60);
		
		if (etaTime >= 86400 * 100) {
			// more than 100 days
			return '~' + etaDays + 'd';
		} else if (etaTime >= 86400) {
			//more than a day
			return etaDays + 'd ' + etaHours + 'h ' + etaMinutes + 'm '; //seconds aren't added if time is in days
		} else if (etaTime >= 3600 && etaTime < 86400) {
			// more than a houre
			return etaHours + 'h ' + etaMinutes + 'm ' + etaSeconds + 's';
		} else if (etaTime >= 60 && etaTime < 3600) {
			// more than a ninute
			return etaMinutes + 'm ' + etaSeconds + 's';
		} else if (etaTime >= 1 && etaTime < 60) {
			// more than a second
			return etaSeconds + 's';
		} else  {
			// 0 or negative time
			return '-';
		}
	}
}

// add span element for timer and init timers
function initTimers() {
	$('#buttonz a.slideIn').each(function() {
		var t = $(this);
		// do not add timers on available builtings and on not researched buildings
		if ( !t .closest('li').hasClass('on') && !(t.closest('li').hasClass('off') && unknownBuildingDisableBuildTime)) {
			// building reference
			var bRef = parseInt(t.attr('ref'));

			// get building level
			var lvl = t.find('span.level');
			var lvlLabel = lvl.find('span.textlabel').detach();
			bLevel = parseInt(lvl.html());
			lvlLabel.prependTo(lvl);
			            
			// set building level in resources array
			buildings[bRef][4]  = bLevel;
			
			// need metal, cry, deu for all buildings on page (Math.floor(metalLvl1 * Math.pow(factor, level)));
			buildings[bRef][5]  = Math.floor(buildings[bRef][0] * Math.pow(buildings[bRef][3], buildings[bRef][4]));
			buildings[bRef][6]  = Math.floor(buildings[bRef][1] * Math.pow(buildings[bRef][3], buildings[bRef][4]));
			buildings[bRef][7]  = Math.floor(buildings[bRef][2] * Math.pow(buildings[bRef][3], buildings[bRef][4]));

			// eta metal, cry, deu ((need - available) / production) ***time in seconds
			buildings[bRef][8]  = Math.floor((buildings[bRef][5] - sResM.available) / sResM.production);
			buildings[bRef][9]  = Math.floor((buildings[bRef][6] - sResC.available) / sResC.production);
			buildings[bRef][10] = Math.floor((buildings[bRef][7] - sResD.available) / sResD.production);
			
			// add timer element
			t.append('<span ref="' + bRef + '" class="build-timer time" style="font-weight:normal;opacity:0.75;margin:-10px 1px 0 0;padding:0">loading...</span>');
		}
	});
}

// update timer values for all timers
function updateTimers(allTimers) {
	if ('function' === typeof allTimers.each) {
		allTimers.each(function() {
			var t = $(this),
				bRef = t.attr('ref');
				
			var mTimer = 0,
				cTimer = 0,
				dTimer = 0;

				// update timer for metal
			if (sResM.available < sResM.limit) {
				mTimer = --buildings[bRef][8];
			} else {
				buildings[bRef][8] = 'Infinity';
			}

			// update timer for crystal
			if (sResC.available < sResC.limit) {
				cTimer = --buildings[bRef][9];
			} else {
				buildings[bRef][9] = 'Infinity';
			}

			// update timer for deuterium
			if (sResD.available < sResD.limit) {
				dTimer = --buildings[bRef][10];
			} else {
				buildings[bRef][10] = 'Infinity';
			}
			
			// add timers
			t.html('<p>' + timeConvertor(mTimer) + '</p><p>' + timeConvertor(cTimer) + '</p><p>' + timeConvertor(dTimer) + '</p>');
		});
	}
}


/********************************************************************************/
/*** Init ***********************************************************************/
/********************************************************************************/
var init = function() {
	// window resource variables
	wResM = {};
    wResM.available  = unsafeWindow.resourceTickerMetal.available;
    wResM.limit      = unsafeWindow.resourceTickerMetal.limit[1] || unsafeWindow.resourceTickerMetal.limit;
    wResM.production = unsafeWindow.resourceTickerMetal.production;
	
	wResC = {};
    wResC.available  = unsafeWindow.resourceTickerCrystal.available;
    wResC.limit      = unsafeWindow.resourceTickerCrystal.limit[1] || unsafeWindow.resourceTickerCrystal.limit;
    wResC.production = unsafeWindow.resourceTickerCrystal.production;
	
	wResD = {};
    wResD.available  = unsafeWindow.resourceTickerDeuterium.available;
    wResD.limit      = unsafeWindow.resourceTickerDeuterium.limit[1] || unsafeWindow.resourceTickerDeuterium.limit;
    wResD.production = unsafeWindow.resourceTickerDeuterium.production;
	
	// script resource variables
	sResM = {
		available  : ('undefined' !== typeof wResM.available  ? parseFloat(wResM.available)  : 0),
        limit      : ('undefined' !== typeof wResM.limit      ? parseInt(wResM.limit)        : 0),
		production : ('undefined' !== typeof wResM.production ? parseFloat(wResM.production) : 0)
	},
	sResC = {
		available  : ('undefined' !== typeof wResC.available  ? parseFloat(wResC.available)  : 0),
        limit      : ('undefined' !== typeof wResC.limit      ? parseInt(wResC.limit)        : 0),
		production : ('undefined' !== typeof wResC.production ? parseFloat(wResC.production) : 0)
	},
	sResD = {
		available  : ('undefined' !== typeof wResD.available  ? parseFloat(wResD.available)  : 0),
        limit      : ('undefined' !== typeof wResD.limit      ? parseInt(wResD.limit)        : 0),
		production : ('undefined' !== typeof wResD.production ? parseFloat(wResD.production) : 0)
	};
	
	initTimers(); // init timers
	allTimers = $('.build-timer'); // get all timers
	var timer = self.setInterval(updateTimers, 1000, allTimers);
}


// if page has something to build
if (urlPage == 'resources' || urlPage == 'station' || urlPage == 'research' || urlPage == 'shipyard' || urlPage == 'defense') {
	// run the entire script after 1 second to leave room for ogame scripts to execute
	var initTimer = setTimeout(init, 1000);
}


/********************************************************************************/
/*** Extras *********************************************************************/
/********************************************************************************/
// hide banner
if (!showBanner) {
	$('#banner_skyscraper').remove();
}

// add signature
$('#siteFooter .content').append('<div style="position:absolute;right:0;bottom:0;"><a href="http://alecspopa.com" target="_blank" style="margin-left:0;">OGame Build Timer &copy; 2011</a></div>');