// ==UserScript==
// @name           Imperion Mods
// @namespace      PhasmaExMachina
// @description    Misc improvements for Imperion
// @include        http://u*.imperion.*/*
// @include        http://beta.imperion.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         PhasmaExMachina
// @require        http://userscripts.org/scripts/source/58203.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
//
// @version        0.39
//
// @history        0.39 Enabled system survey for Xen
// @history        0.39 Fixed display of negative resource production
// @history        0.39 Cleaned up and re-organized code a bit to make it easier to update and maintain
// @history        0.39 Send fleet icons next to espionage and combat reports now default to attack mission 
// @history        0.38 Fixed use of large recyclers for terrans when using auto harvest
// @history        0.37 New planet list drop-down is no longer drawn when you only have one planet
// @history        0.37 Added auto harvest comets feature under map tab in settings (disabled by default)  
// @history        0.36 Fixed broken debris view
// @history        0.35 Added number of recyclers needed to asteroid view
// @history        0.34 Added send fleet icon to reports page
// @history        0.34 Clicking on target name in report page will view target on map for combat and espionage reports
// @history        0.34 Added option to show recource capacity remaining instead of time until full
// @history        0.33 Terrans now have a config tab that lets you choose which recycler to use (large by default)
// @history        0.33 Fixed detection of certain config options in map view
// @history        0.32 Added time since last survey to system survey button
// @history        0.31 Fixed glitch in reading of trade reports when username has a number in it
// @history        0.30 Fixed a stupid bug in my part in new planet list planet ID detection 
// @history        0.29 Attempted to add number of large recyclers needed on comets (untested)
// @history        0.28 Fixed glitch that caused big map and survey icons to fail in v0.27 
// @history        0.28 Fixed handling of unread planets in new planet list
// @history        0.27 Fixed bug planet details in map view in Firefox v3.6.3
// @history        0.26 Fixed combat reports reading debris field information instead of resources stolen
// @history        0.26 Added clear all cached reports button to planet details in map view
// @history        0.26 Combat reports in planet detail in map view now show number of qi stolen
// @history        0.26 Combat reports in planet detail in map view now only display resource stolen if amount > 0
// @history        0.26 Combat reports in reports view now show number of qi stolen
// @history        0.26 Fixed unit help now working in combat reports when resource icons are enable
// @history        0.25 Added report type icons to report page for comet harvest and espionage
// @history        0.25 Added button to reports page to clear cached report information
// @history        0.25 Added loading animation to reports page while  fetching report data
// @history        0.25 Added resource icons to intelligence reports in report page
// @history        0.25 Added trade icon and resources to reports page
// @history        0.25 Added combat icon to reports in reports page
// @history        0.25 Added combat resources gathered to reports page
// @history        0.25 Fixed handling of intelligence reports that do not contain resource information
// @history        0.25 Improved initial detection of system view on map view
// @history        0.25 Added button to solar system view to survey all empty planets (titan and terran only)
// @history        0.24 Added initial report tracking (beta)
// @history        0.23 Improved handling of increased map height when switching to system, planet, and comet views
// @history        0.23 Added resource totals and number of recyclers required to debris fields and comets
// @history        0.23 Added option to add commas to resource values on comets and debris fields
// @history        0.22 Added planet names to event list
// @history        0.22 Fixed missing resource icons on espionage reports
// @history        0.21 Added current resource amounts to planet list 
// @history        0.20 Fixed excessive margin between planets in new drop-down planet list 
// @history        0.19 Replaced standard planet list with one that hides when you mouse-out
// @history        0.19 New planet list has drop-down list of buildings for each planet
// @history        0.18 Fixed bug in handling of building detection 
// @history        0.17 Added options to hide icons and resources missing in building list
// @history        0.16 Added number of days remaining for next planet to embassy expansion tab
// @history        0.15 Fixed bug caused by attempt to handle large numbers in research centrt
// @history        0.14 Added taller galexy map view
// @history        0.13 Fixed handling of large numbers in research center research time calculations
// @history        0.12 Added resources missing to building list
// @history        0.12 Buildings level circle for buildings that can be build are now green in planet view
// @history        0.11 Fixed building image sources in building menu 
// @history        0.10 Added fleet overview to fleet base
// @history        0.09 Removed returning merchants from events because they were messing other things up
// @history        0.08 Fixed handling of images in Brain 
// @history        0.07 Prevented corruption of planet surface view data when switching planets
// @history        0.06 Removed alert from merchant page that was left from testing
// @history        0.05 Fixed icon help windows not popuping up on reports
// @history        0.05 Added incoming attacks to tracked events
// @history        0.04 Fixed buttons not working on report list page
// @history        0.03 Improved replacement of resource names in text with icons
// @history        0.02 Added option to colorize all timers with your race color
// @history        0.01 First release with update checker and config options
//
//
// ==/UserScript==

ScriptUpdater.check(67294, '0.39');

Config.scriptName = "Imperion Mods by PhasmaExMachina";
Config.prefix = document.domain;

Config.tabs = {
	"General":{
		html:'<p>General Options</p>',
		fields:{
			planetList:{
				type:'checkbox',
				label:'Planet List',
				text:'replace the planet list with a better one',
				value:true
			},
			resourceDetails:{
				type:'checkbox',
				label:'Resource Details',
				text:'show resource production and full times',
				value:true
			},
			resourceCapacity:{
				type:'checkbox',
				label:'Resource Capacity',
				text:'show remaining capacity instead of time until full',
				value:false
			},
			useResourceIcon:{
				type:'checkbox',
				label:'Resource Icons',
				text:'replace instances of resource names with icons',
				value:true
			},
			colorizeTimers:{
				type:'checkbox',
				label:'Colorize Timers',
				text:'make timers display in your race color',
				value:true
			},
			trackEvents:{
				type:'checkbox',
				label:'Track Events',
				text:'keep track of events and add an events button',
				value:true
			}
		}
	},
	"Building List":{
		html:'<p>General Options</p>',
		fields:{
			buildingList:{
				type:'checkbox',
				label:'Enabled',
				text:'show drop-down building list under current planet icon',
				value:true
			},
			buildingListIcons:{
				type:'checkbox',
				label:'Icons',
				text:'show building icons in list',
				value:true
			},
			buildingListMissingResources:{
				type:'checkbox',
				label:'Missing Resources',
				text:'show the number of resources missing to upgrade',
				value:true
			}
		}
	},
	"Map":{
		html:'<p>The following options are related to the map view</p>',
		fields:{
			bigMap:{
				type:'checkbox',
				label:'Big Map',
				text:'increase the height of the map view',
				value:true
			},
			addMapCommas:{
				type:'checkbox',
				label:'Add Commas',
				text:'add commas to numerical values in map views',
				value:true
			},
			autoHarvest:{
				type:'checkbox',
				label:'Auto Harvest',
				text:'automatically send harvesters to nearby comets',
				value:false
			}
		}
	},
	"Misc":{
		html:'<p>The following options are related to specific buildings or views</p>',
		fields:{
			fleetBaseSummary:{
				type:'checkbox',
				label:'Fleet Overview',
				text:'show an overview in the fleet base',
				value:true
			},
			fleetBaseFullPercentage:{
				type:'checkbox',
				label:'Cargo Used',
				text:'show percentage of possible cargo used in the fleet base',
				value:true
			},
			planetBuildingLevels:{
				type:'checkbox',
				label:'Building Levels',
				text:'add building level indicators to the planet view',
				value:true
			}
		}
	},
	"Terrans":{
		html:'<p>The following options only apply to Terrans players',
		fields:{
			usingLargeRecylers:{
				type:'checkbox',
				label:'Large Recyclers',
				text:'use large recyclers in calculations',
				value:true
			}
		}
	},
	"Xen":{
		html:'<p>The following options only apply to Xen players',
		fields:{
			reportRefreshLink:{
				type:'checkbox',
				label:'Refresh Reports Link',
				text:'add a refresh link on reports to refresh in one click',
				value:true
			}
		}
	},
	"About":{
		html:'<p>This script performs some basic modifications of the game.</p><p><strong>Author:</strong> <a href="http://userscripts.org/users/PhasmaExMachina">PhasmaExMachina</a></p>'	}
};

//Config.show();

Growler.addNoticeType("incomingAttack", "Incoming Attack");
Growler.addNoticeType("building", "Building Completion");
Growler.addNoticeType("outgoingAttack", "Outgoing Attack");
Growler.addNoticeType("harvesting", "Harvesting in Progress");
Growler.addNoticeType("incomingFriendly", "Incoming Friendly");
Growler.addNoticeType("outgoingMerchant", "Outgoing Merchant");
Growler.addNoticeType("incomingMerchant", "Incoming Merchant");
Growler.register('Imperion Mods', 'http://i763.photobucket.com/albums/xx278/PhasmaExMachina/imperion/icon.png');

function Planet(id, name) {
	this.id = id;	
	this.name = name;
	this.buildings = {};
	this.imgSrc = {};
	this.resources = {
			updated:0,
			metal:{
				initialQty:0,
				productionPerMS:0,
				capacity:0
			},
			crystal:{
				initialQty:0,
				productionPerMS:0,
				capacity:0
			},
			fuel:{
				initialQty:0,
				productionPerMS:0,
				capacity:0
			}
	};
}

function Building() {
	this.name = null;
	this.position = null;
	this.level = null;
	this.href = null;
}

var startTime = new Date();

Imperion = {
	planets:{},
	reports:null,
	//----------------- constructor --------------------
	init:function() {
		// load data
		Imperion.planets = Imperion.getVal('planets');
		// update planet data
		var planet = Imperion.getCurrentPlanet();
		planet.name = $('#planetList').text();
		var d = new Date();
		planet.resources = {
			updated:d.getTime(),
			metal:{
				initialQty:unsafeWindow.resourceCounter1.getCharge(),
				productionPerMS:unsafeWindow.resourceCounter1.productionPerMS,
				capacity:unsafeWindow.resourceCounter1.capacity
			},
			crystal:{
				initialQty:unsafeWindow.resourceCounter2.getCharge(),
				productionPerMS:unsafeWindow.resourceCounter2.productionPerMS,
				capacity:unsafeWindow.resourceCounter2.capacity
			},
			fuel:{
				initialQty:unsafeWindow.resourceCounter3.getCharge(),
				productionPerMS:unsafeWindow.resourceCounter3.productionPerMS,
				capacity:unsafeWindow.resourceCounter3.capacity
			}
		};
		planet.fuelProduction = parseInt(unsafeWindow.resourceCounter3.productionPerMS * 60 * 60 * 1000);
		planet.iconUrl = $('#navigation .icon:eq(0)').css('background-image').replace(/^url\(("|')/, '').replace(/("|')\)/, '');
		Imperion.savePlanet(planet);
		// process current view
		if($('#fleetBase').size() == 1)
			this.views.fleetBase();
		else if(typeof(this.views[this.getCurrentView()]) == 'function')
			this.views[this.getCurrentView()]();
		else if($('#planetSurface').size() == 1)
			this.views.planet();
		
		// check for building and update
		var currentPosition = document.location.toString().match(/\/(\d+)/);						 
		if($('div#building').size() == 1 && currentPosition) {
			var building = Imperion.planetGetBuildingByPosition(currentPosition[1]);
			building.cost = {
				metal:$('div.upgradeTop div.interface_icon_metal').text().replace(/,/g, '').replace(/\./g, ''),
				crystal:$('div.upgradeTop div.interface_icon_crystal').text().replace(/,/g, '').replace(/\./g, ''),
				fuel:$('div.upgradeTop div.interface_icon_deuterium').text().replace(/,/g, '').replace(/\./g, ''),
			}
			building.position = currentPosition[1];
			building.level = parseInt($('div.level').eq(0).text());
			building.planetId = Imperion.getCurrentPlanetId();
			building.name = $('div.informationBuilding div.top div.floatLeft').text();
			Imperion.saveBuilding(building);
		}
		
		// ad resource production
		if(Config.get('resourceDetails')) {
			function drawResourceDetails(type) {
				var resourceNum = 1;
				var left = 30;
				switch(type) {
					case 'crystal': left = 205; resourceNum = 2; break;
					case 'fuel': left = 375; resourceNum = 3; break;
				}			
				var income = Imperion.planetGetResourceProductionPerHour(type);
				$('#storageR' + resourceNum).after('<div class="resourceDetails" style="left:' + left + 'px;">' + 
					'<span title="' + (income > 0 ? '+' : '') + income + ' per hour">' + (income > 0 ? '+' : '') + income + '</span>' +
					'<span class="resourceFullTimer" id="' + type + 'FullTimer" title="' + (Config.get('resourceCapacity') ? 'Free space remaining' : 'Time until full') + '"/>' +
					'</div>'
				);
			}
			drawResourceDetails('metal');
			drawResourceDetails('crystal');
			drawResourceDetails('fuel');
			function updateResourceDetails() {
				if(Config.get('resourceCapacity')) {
					$('#metalFullTimer').html(addCommas(Imperion.getPlanetResourceCapacityRemaining('metal')));
					$('#crystalFullTimer').html(addCommas(Imperion.getPlanetResourceCapacityRemaining('crystal')));
					$('#fuelFullTimer').html(addCommas(Imperion.getPlanetResourceCapacityRemaining('fuel')));
				} else {
					$('#metalFullTimer').html(Imperion.getPlanetResourceTimeToFullString('metal'));
					$('#crystalFullTimer').html(Imperion.getPlanetResourceTimeToFullString('crystal'));
					$('#fuelFullTimer').html(Imperion.getPlanetResourceTimeToFullString('fuel'));
				}		
				setTimeout(updateResourceDetails, 1000);
			}
			updateResourceDetails();
		}
		
		// colorize timers
		function colorizeTimers() { $('span.impCountDown').each(function() { this.className += ' fontColorRace'; }); }
		if(Config.get('colorizeTimers')) colorizeTimers();
		
		// add building list
		function drawBuildingList() {
			var newDiv = document.createElement('div');
			$('div#navigation div.interface_navigation_planet a').eq(0).before(newDiv);
			newDiv.appendChild($('div#navigation div.interface_navigation_planet a')[0]);
			newDiv.id = "buildingListWrapper";
			var html = Imperion.planetGetHtmlBuildingList();
			newDiv.innerHTML += html;
		}
		GM_addStyle('\
			#buildingListWrapper:hover .planetBuildingList { display:block; }\
			.planetBuildingList { \
				background:#000; border: 2px outset #666; -moz-border-radius:5px; padding:10px; left:30px; position:absolute;\
				z-index:100000; position:absolute; top:71px; height:auto !important; display:none;\
			} \
			.planetBuildingList * { color: #aaa !important; font-size:11px !important; line-height:2.6em !important;  }\
			.planetBuildingList td { font-weight:normal !important; }\
			.planetBuildingList a { display:block !important; height:30px !important; overflow:hidden; line-height:2em !important; margin-left:0 !important; float:none !important; clear:both !important; width:auto !important; !important; }\
			.planetBuildingList tr:hover td { background-color:#333 !important; }\
			.planetBuildingList td a img { height:40px !important; border:none; vertical-align:middle; margin:-10px 5px 0 0; }\
			div#resourceBar div.count { font-size:13px !important; text-align:left !important; line-height:1em !important; height:1em !important; padding:5px 0 0 0; }\
			div.resourceDetails { position:absolute; top:20px; color:#666 !important; font-size:9px !important; }\
			span.resourceFullTimer { margin-left:2em; }\
			.planetBuildingList img.resourceIconReport { width:16px; height:16px; margin-right:0; vertical-align:middle; }\
		');
		if(Config.get('buildingList')) drawBuildingList();
		
		// replace planet list
		function replacePlanetList() {
			if($('ul.planetList a').size() > 0) {
				GM_addStyle('#planetList li a:first-child { font-size:12px; font-weight:normal; color:#fff; display:block; line-height:2.5em !important; height:2.5em !important; clear:both; margin-left:0 !important; padding-left:10px; }'+
							'#planetList a:hover { background-color:#333; }'+
							'#planetList li { font-size:12px; height:2.5em !important; position:relative; list-style-type:none;  }'+
							'#planetList a img { height:20px; border:none; margin-right:.5em; }'+
							'#planetList div {'+
								'background:#000; border: 2px outset #666; -moz-border-radius:5px; padding:10px; left:30px; position:absolute;'+
								'z-index:100000; position:absolute; top:71px; height:auto !important; display:none;'+
							'}'+
							'#planetList:hover div:first-child { display:block; }'+
							'#planetList li .planetBuildingList { position:absolute; top:0; left:100%; display:none; }'+
							'#planetList li:hover .planetBuildingList { display:block; }'+
							'#planetList li .planetBuildingList a { padding-left:0 !important; }');
				var planetDropdown = document.createElement('a');
				$('#planetList').after(planetDropdown);
				$('#planetList').remove();
				planetDropdown.innerHTML = Imperion.getCurrentPlanet().name;
				planetDropdown.className = "fontBold fontSize20 fontCalibri fontColorRace bgNoRepeat bgRight enabled interface_navigation_arrow";
				planetDropdown.id = 'planetList';
				var planetList = document.createElement('div');
				planetList.setAttribute('style', 'position:absolute; top:50px; left:110px; color:#fff;');
				$(planetDropdown).append(planetList);
				var html = '';
				$('ul.planetList a').each(function() {
					try {
						var id = this.href.match(/buildings\/(\d+)/)[1];
						var planet = Imperion.getPlanetById(id);
						var planet = planet ? planet : new Planet(id, $(this).text());
					} catch(e) {
						var planet = Imperion.getCurrentPlanet();
					}
					html += '<li><nobr><a href="http://' + document.domain + '/planet/buildings/' + planet.id + '" style="width:100%; float:left;">' + 
							'<img src="' + (typeof(planet.iconUrl) != 'undefined' ? planet.iconUrl : '/img/x.gif') + '" style="vertical-align:middle"/> ' +
							planet.name + '      ' +
							'<img src="/img/interface/icon/metal.png" style="vertical-align:middle; height:20px; margin-right:0;"/>' + addCommas(Imperion.planetGetResource('metal', planet)) + 
							' <img src="/img/interface/icon/crystal.png" style="vertical-align:middle; height:20px; margin-right:0;"/>' + addCommas(Imperion.planetGetResource('crystal', planet)) + 
							' <img src="/img/interface/icon/deuterium.png" style="vertical-align:middle; height:20px; margin-right:0;"/>' + addCommas(Imperion.planetGetResource('fuel', planet)) + 
							' </a></nobr>';
					if(Config.get('buildingList'))
						html += Imperion.planetGetHtmlBuildingList(planet);
					html += '</li>';
				});
				planetList.innerHTML = html;
			}
		}
		if(Config.get('planetList')) replacePlanetList();
		
		// add config icon
		function drawConfigIcon() {
			var cfgImg = document.createElement('img');
			cfgImg.src = icons.config;
			cfgImg.title = "Imperion Mods Script Options";
			cfgImg.setAttribute('style', 'vertical-align:middle; margin:-2px 0 0 4px; cursor:pointer;');
			cfgImg.addEventListener('click', Config.show, false);
			var target = $('li', $('#head ul').eq(1));
			target.eq(target.size() - 3).append(cfgImg);
		}
		drawConfigIcon();
		
		// add timer
		if(Config.get('trackEvents')) {
			var img = document.createElement('img');
			img.setAttribute('style', 'margin-left:110px; margin-top:9px; cursor:pointer;' +
				'opacity:' + ((typeof(Imperion.getVal('timerWindowOpen')) != 'object' && Imperion.getVal('timerWindowOpen')) ? '1' : '.5') + ';'				 
			);
			
			img.title = "Show/hide event list";
			img.src = icons.clock;
			img.addEventListener('click', function() { 
				var alreadyOpen = typeof(Imperion.getVal('timerWindowOpen')) != 'object' && Imperion.getVal('timerWindowOpen');
				this.style.opacity = alreadyOpen ? .5 : 1;
				Imperion.setVal('timerWindowOpen', !alreadyOpen); 
				if(!alreadyOpen)
					Imperion.loadTimerWindow(); 
			}, false);
			$('#head ul:first-child').append(img);
			// read timers
			setTimeout(function() {
				var timers = Imperion.getVal('timers');		
				// incoming attacks
				$('#incomingAttackContent a.interface_troops_left').each(function() {
					var id = this.id.match(/\d+$/)[0];
					var timeStr = $('.impCountDown', this).text();
					timers[id] = {
						id:id,
						expire:Imperion.getExpireTimeFromStringTimer(timeStr),
						str:$('span:first-child', this).text(),
						type:'incomingAttack',
						planetName:Imperion.getCurrentPlanet().name,
						href:this.href
					}
				});
				// outgoing attacks
				$('#outgoingAttackContent a.interface_troops_left').each(function() {
					var id = this.id.match(/\d+$/)[0];
					var timeStr = $('.impCountDown', this).text();
					var str = $('span:first-child', this).text();
					timers[id] = {
						id:id,
						expire:Imperion.getExpireTimeFromStringTimer(timeStr),
						str:str,
						type:str.match(/Harvesting/) ? 'harvesting' : 'outgoingAttack',
						planetName:Imperion.getCurrentPlanet().name,
						href:this.href
					}
				});
				// incoming friendly
				$('#incomingSupportContent a.interface_troops_left').each(function() {
					var id = this.id.match(/\d+$/)[0];
					var timeStr = $('.impCountDown', this).text();
					timers[id] = {
						id:id,
						expire:Imperion.getExpireTimeFromStringTimer(timeStr),
						str:$('span:first-child', this).text(),
						type:'incomingFriendly',
						planetName:Imperion.getCurrentPlanet().name,
						href:this.href
					}
				});
				Imperion.setVal('timers', timers);
			}, 2500);
			// set timer events
			setInterval(function() {
				var timers = Imperion.getVal('timers');
				var d = new Date();
				for(var id in timers) {
					var e = timers[id]; 
					if(e != null) {
						var expire = new Date(e.expire);
						if(expire.getTime() < d.getTime()) {
							timers[id] = null;	
						} else {
							if(expire.getTime() - d.getTime() <= 4000) {
								if(expire.getTime() - d.getTime() > 0) {
									var message = '';
									switch(e.type) {
										case 'building': message = 'completed'; break;	
									}
									var fullMessage = e.str + ' ' + message;
									Growler.growl(e.type, 'Imperion', fullMessage);
								}
								var newTimers = Imperion.getVal('timers');
								for(var id in timers)
									if(timers[id].id != e.id)
										newTimers[e.id] = e;	
								Imperion.setVal('timers', newTimers);
							}
						}
					}
				}
				Imperion.setVal('timers', timers);
			}, 4000);
		}
		if(typeof(Imperion.getVal('timerWindowOpen')) != 'object' && Imperion.getVal('timerWindowOpen')) 
			setTimeout(Imperion.loadTimerWindow, 4000);
		
		
		if(Config.get('autoHarvest')) {
			// check fleet base
			// auto harvest
			function chekForAbilityToRecycle(callback) {
				GetAsyncDom('http://' + document.domain + '/fleetBase/show/1', function(dom) {
					// get num free fleet slots
					var slots = $('.fleetbaseSlots', dom).text().match( /(\d+)[^\d]+(\d+)/);
					var numOpenSlots = slots[2] - slots[1];
					// get num recyclers
					var fleetsOnPlanetFound = false;
					var numRecyclersAvailable = 0;
					$('div.fleetTable', dom).each(function(i) {
						if(!fleetsOnPlanetFound && $('.impCountDown', this).size() == 0) {
							fleetsOnPlanetFound = true;
							var index = (Imperion.getRace() == 'terrans' && Config.get('usingLargeRecylers')) ? 10 : 11;	// recyclers index
							numRecyclersAvailable = $('table tr:eq(4) td:eq(' + index + ')', this).text().replace(/,|\./g, '');
						}
					});
					Imperion.setVal('numRecyclersAvailable', numRecyclersAvailable);
					// check if recycling can be done
					if(numOpenSlots > 0 && numRecyclersAvailable > 0) {
						callback();						
					} else
						Imperion.goToNextPlanet();
				});
			}
			
			function getRandomHarvestInterval() {
				var variance = Math.floor(Math.random()*16);	// 15 minute variance
				return 60000 * (5 + variance);
			}
			function runHarvestCheck() {
				Imperion.setVal('performAutoHarvestNow', false);
				chekForAbilityToRecycle(function() {
					Imperion.setVal('performAutoHarvestNow', true);
					document.location = '/map/index';
				});
				setTimeout(runHarvestCheck, getRandomHarvestInterval());
			}
			setTimeout(runHarvestCheck, getRandomHarvestInterval());
		}
	},
	loadTimerWindow:function() {	
		var win = window.open('about:blank','imperiodEvents'+document.domain,'width=300,height=400,toolbar=no,location=no,status=no,menubar=no,directories=no,copyhistory=no') ;
		setTimeout(function() {
			var bod = win.content.document.body;
			win.content.document.title = "Imperion Events";
			bod.innerHTML = '<style type="text/css">\
					body { background:#000; }\
					* { color:#fff; background:#000; font:11px Arial,sans-serif; }\
					a { text-decoration:none; }\
					a:hover { text-decoration:underline; }\
					strong { font-size:12px; font-weight:bold; }\
				</style>\
			';
			win.Imperion = Imperion;
			var d = new Date();
			try {
				var timers = Imperion.getVal('timers');
				var html = '';
				var buildings = [];
				var outgoingAttacks = [];
				var incomingFriendly = [];
				var outgoingMerchants = [];
				var timerTypes = {};
				for(var id in timers) {
					if(timers[id] != null) {
						switch(timers[id].type) {
							case 'building': buildings.push(timers[id]); break;
							case 'outgoingAttack': outgoingAttacks.push(timers[id]); break;
							case 'incomingFriendly': incomingFriendly.push(timers[id]); break;
						}
						timerTypes[timers[id].type] = typeof(timerTypes[timers[id].type]) == 'undefined' ? [] : timerTypes[timers[id].type];
						timerTypes[timers[id].type].push(timers[id]);
					}
				}	
				function getMonthStr(month) {
					switch(month) {
						case 0: month = 'Jan'; break;
						case 1: month = 'Feb'; break;
						case 2: month = 'Mar'; break;
						case 3: month = 'Apr'; break;
						case 4: month = 'May'; break;
						case 5: month = 'Jun'; break;
						case 6: month = 'Jul'; break;
						case 7: month = 'Aug'; break;
						case 8: month = 'Sep'; break;
						case 9: month = 'Oct'; break;
						case 10: month = 'Nov'; break;
						case 11: month = 'Dec'; break;
					}
					return month;
				}
				function getEventHtml(e) {
					var ex = new Date(e.expire);
					var html = '<p title="' + 
									getMonthStr(ex.getMonth()) + '. '  + ex.getDate()  + ' at ' + ex.getHours() + ':' + ex.getMinutes()+ 
								'">    ';
					html += typeof(e.href) != 'undefined' ? '<a href="javascript:void(0);" onclick="javascript:opener.location = \'' + e.href + '\';">' : '';
					html += '<span id="event' + e.id + '">' + Imperion.getEventTimeRemainingString(e) + 
								'</span> - ' + e.str + (typeof(e.planetName) != 'undefined' ? ' [' + e.planetName + ']' : '');	
					html += typeof(e.href) != 'undefined' ? '</a>' : '';
					return html + '</p>';
				}				
				if(typeof(timerTypes['incomingAttack']) != 'undefined' && timerTypes['incomingAttack'].length > 0) {
					html += '<p><strong style="color:red;">Incoming Attacks</strong></p>';
					for(var i = 0; i < timerTypes['incomingAttack'].length; i++)
						html += getEventHtml(timerTypes['incomingAttack'][i]);
				}
				if(buildings.length > 0) {
					html += '<p><strong>Buildings</strong></p>';
					for(var i = 0; i < buildings.length; i++)
						html += getEventHtml(buildings[i]);
				}
				if(outgoingAttacks.length > 0) {
					html += '<p><strong>Outgoing Attacks</strong></p>';
					for(var i = 0; i < outgoingAttacks.length; i++)
						html += getEventHtml(outgoingAttacks[i]);
				}
				if(typeof(timerTypes['harvesting']) != 'undefined' && timerTypes['harvesting'].length > 0) {
					html += '<p><strong>Harvesting in Progress</strong></p>';
					for(var i = 0; i < timerTypes['harvesting'].length; i++)
						html += getEventHtml(timerTypes['harvesting'][i]);
				}
				if(incomingFriendly.length > 0) {
					html += '<p><strong>Incoming Friendly</strong></p>';
					for(var i = 0; i < incomingFriendly.length; i++)
						html += getEventHtml(incomingFriendly[i]);
				}
				if(typeof(timerTypes['outgoingMerchant']) != 'undefined' && timerTypes['outgoingMerchant'].length > 0) {
					html += '<p><strong>Outgoing Merchants</strong></p>';
					for(var i = 0; i < timerTypes['outgoingMerchant'].length; i++)
						html += getEventHtml(timerTypes['outgoingMerchant'][i]);
				}
				if(typeof(timerTypes['incomingMerchant']) != 'undefined' && timerTypes['incomingMerchant'].length > 0) {
					html += '<p><strong>Incoming Merchants</strong></p>';
					for(var i = 0; i < timerTypes['incomingMerchant'].length; i++)
						html += getEventHtml(timerTypes['incomingMerchant'][i]);
				}
				
				bod.innerHTML += html;
			} catch(e) { alert(e); }
			
 			win.setInterval(function() {
				var smallest = {expire:null,str:''};					 
				for(var id in timers) {
					if(timers[id] != null) {
						smallest = (smallest.expire == null || timers[id].expire < smallest.expire) ? {expire:timers[id].expire, str:timers[id].str} : smallest;
						win.content.document.getElementById('event' + id).innerHTML = Imperion.getEventTimeRemainingString(timers[id]);
					}
				}
				win.document.title = Imperion.getEventTimeRemainingString(smallest) + ' ' + smallest.str;//.match(/>(.+)</)[1];
			}, 1000);
		}, 500);		
	},
	buildingGetCost:function(resourceType, building) {
		if(typeof(building.cost) == 'undefined') return 0;
		return parseInt(building.cost[resourceType]);
	},
	buildingGetCostMissing:function(resourceType, building) {
		if(typeof(building.cost) == 'undefined') return 0;
		var planet = Imperion.getPlanetById(building.planetId);
		var missing = Imperion.buildingGetCost(resourceType, building) - Imperion.planetGetResource(resourceType, planet);
		return missing > 0 ? missing : 0;
	},
	buildingGetCostMissingTotal:function(building) {
		return Imperion.buildingGetCostMissing('metal', building) + Imperion.buildingGetCostMissing('crystal', building) + Imperion.buildingGetCostMissing('fuel', building);
	},
	getExpireTimeFromStringTimer:function(timeStr) {
		var hours = parseInt(timeStr.match(/^\s*(\d+):/)[1].replace(/^0/, ''));
		var minutes = parseInt(timeStr.match(/:(\d+):/)[1].replace(/^0/, ''));
		var seconds = parseInt(timeStr.match(/:(\d+)\s*$/)[1].replace(/^0/, ''));
		var msRemaining = seconds * 1000 + (minutes * 60000) + (hours * 1000 * 60 * 60);
		var d = new Date();
		return d.getTime() + msRemaining;
	},
	getEventTimeRemainingString:function(e, showDays) {
		var d = new Date();
		var secondsTotal = Math.ceil((e.expire - d.getTime()) / 1000);
		if(secondsTotal > 0) {
			var minutesTotal = Math.floor(secondsTotal / 60);
			var hoursTotal = Math.floor(minutesTotal / 60);
			var hours = hoursTotal;
			var seconds = (secondsTotal % 60) < 10 ? '0' + (secondsTotal % 60) : secondsTotal % 60;
			var minutes = (minutesTotal % 60) < 10 ? '0' + (minutesTotal % 60) : minutesTotal % 60;
			if(typeof(showDays) != 'undefined' && showDays) {
				var days = Math.floor(hoursTotal  / 24);
				hours = hoursTotal % 24;
				return (days > 0 ? days + 'd ' : '') + hours + ':' + minutes + ':' + seconds;
			} else
				return hours + ':' + minutes + ':' + seconds;
		} else
			return '<span style="text-decoration:blink; color:red; font-weight:bold;">0:00:00</span>';
	},
	getCurrentPlanet:function() {
		var currPlanet = Imperion.getPlanetById(Imperion.getCurrentPlanetId());
		return currPlanet ? currPlanet : new Planet(Imperion.getCurrentPlanetId());
	},
	getDurationStringFromMs:function(ms) {
		var numSeconds = Math.floor(ms / 1000);
		var numDays = numSeconds / 60 / 60 / 24;
		var minutesRemaining = numDays * 60 * 24;
		var hoursRemaining = minutesRemaining / 60;
		var days = Math.floor(numDays) > 0 ? Math.floor(numDays) + 'd ' : '';
		var hours = Math.floor(hoursRemaining % 24) > 0 ? Math.floor(hoursRemaining % 24) + 'h ' : ''; 
		var totalMinutes = numDays * 24 * 60;
		var minutes = Math.floor(minutesRemaining % 60) + 'm';
		return days + hours + minutes;
	},
	getPlanetById:function(id) {
		return typeof(Imperion.planets[id]) != 'undefined' ? Imperion.planets[id] : false;
	},
	//----------------- Get Current Planet ID ----------
	getCurrentPlanetId:function() {
		return $('div#navigation div.interface_navigation_planet a')[0].href.match(/\d+$/)[0];
	},
	//----------------- Get Current View ---------------
	getCurrentView:function() {
		try { return document.location.toString().match(/http:\/\/[^\/]+\/([^\/]+)\//)[1] } catch(e) { return ''; }
	},
	getRace:function() {
		var checkStr = $('#navigation div.helper a.interface_navigation_galaxy').css('background-image');
		if(checkStr.match(/\/titans\//))
			return 'titans';
		else if(checkStr.match(/\/xen\//))
			return 'xen';
		else return 'terrans';
	},
	getReports:function() {
		if(Imperion.reports == null) Imperion.reports = Imperion.getVal('reports');
		Imperion.reports = (Imperion.reports == null) ? {} : Imperion.reports;
		return Imperion.reports;
	},
	getReportById:function(id) {
		var reports = Imperion.getReports();
		var d = new Date();
		return typeof(reports[id]) != 'undefined' ? reports[id] : {'id':id, type:'unknown', cached:d.getTime(), parsed:false};
	},
	getReportByUrl:function(url) {
		dom = url == document.location ? document : GetClassicDom(url);
		var matches = url.match(/\/id\/([^\/]+)\/[^\d]*(\d+)/);
		var id = matches[2];
		var report = Imperion.getReportById(id);
		report.type = matches[1];
		switch(report.type) {
			case 'combat':
				var targetHref = $('.interface_content_building_content_center .content h1:first a:eq(1)', dom).attr('href');
				if(!targetHref.match(/comet/)) {
					report.targetHref = $('.interface_content_building_content_center .content h1:first a:eq(1)', dom).attr('href');
					report.targetId = report.targetHref.match(/\d+\s*$/)[0];
				}
				try {
					var numP = $('div.content p', dom).size();
					var qiMatches = $('div.content p:eq(' + (numP - 1) + ')', dom).text().match(/(\d+)\s*Qi/);
					var resources = $('div.content p:eq(' + (numP - (qiMatches ? 2 : 1)) + ')', dom).text().match(/(\d+)[^\d]+(\d+)[^\d]+(\d+)/);
					report.resourcesGathered = {
						metal: parseInt(resources[1]),
						crystal: parseInt(resources[2]),
						fuel: parseInt(resources[3]),
						qi: qiMatches ? parseInt(qiMatches[1]) : 0						
					};
				} catch(e) {
					report.resourcesGathered = {metal:0, crystal:0, fuel:0, qi:0};
				}
				report.parsed = true;
				break;
			case 'recycle':
				try {
					var resources = $('h3:eq(1)', dom).text().match(/(\d+)[^\d]+(\d+)[^\d]+(\d+)/);
					report.resourcesGathered = {
						metal: parseInt(resources[1]),
						crystal: parseInt(resources[2]),
						fuel: parseInt(resources[3])
					};
				} catch(e) {
					report.resourcesGathered = {metal:0, crystal:0, fuel:0};
				}
				report.parsed = true;
				break;
			case 'espionage':
				report.targetHref = $('.interface_content_building_content_center .content h1:first a', dom).attr('href');
				report.targetId = report.targetHref.match(/\d+\s*$/)[0];
				// find resource table
				$('div.fleetTable table', dom).each(function() {
					if($('tr:eq(0) td:eq(1) img', this).size() == 0) {
						var cells = $('tr:eq(2) td', this);
						report.resourcesAvailable = {
							metal:parseInt(cells.eq(1).text()),
							crystal:parseInt(cells.eq(2).text()),
							fuel:parseInt(cells.eq(3).text()),
							qi:parseInt(cells.eq(4).text())
						};
					};
				});
				if(typeof(report.resourcesAvailable) == 'undefined') report.resourcesAvailable = {metal:0, crystal:0, fuel:0};
				report.parsed = true;
				break;
			case 'trade':
				var resources = $('div.content div.fontSize12', dom).text().match(/(\d+)[^\d]+(\d+)[^\d]+(\d+)[^\d]*$/);
				report.resources = {
					metal:parseInt(resources[1]),
					crystal:parseInt(resources[2]),
					fuel:parseInt(resources[3])
				};
				report.parsed = true;
				break;
		}
		Imperion.saveReport(report);
		return report;
	},
	getShipPayload:function(shipId) {
		return parseFloat($('.interface_icon_attrbiutes_payload', GetClassicDom("/help/ship/" + shipId)).text());
	},
	getShipName:function(shipId) {
		return $('.overlay div.interface_overlay_top h1:eq(0)', GetClassicDom("/help/ship/" + shipId)).text().replace(/[^:]+:\s*/, '');
	},
	getRemoteDocument:function(url, callback, method, data) {
		method = typeof(method) == 'undefined' ? 'GET' : method;
		data = typeof(data) == 'undefined' ? '' : data;
		var headers = {
			"User-agent":navigator.userAgent, 
			"Accept":method == 'POST' ? "application/atom+xml,application/xml,text/xml" : "text/html", 
		}
		if(method == 'POST') {
			headers['Content-type'] = 'application/x-www-form-urlencoded';	
		}
		GM_xmlhttpRequest ({
			method:method,
			url:url,
			data:data,
			headers:headers,
			onload: function (response){
				var html = document.createElement("html");
				html.innerHTML = response.responseText;
				var response = document.implementation.createDocument("", "", null);
				response.appendChild(html);
				callback(response);
			}
		});
	},
	goToNextPlanet:function() {
		if ($('ul.planetList a').size() > 0) {
			var currentFound = false;
			var planetIds = [];
			var planetNames = [];
			var currentIndex = 0;
			$('ul.planetList a').each(function(i){
				try { var id = this.href.match(/buildings\/(\d+)/)[1]; } catch (e) { var id = Imperion.getCurrentPlanetId(); }
				planetIds.push(id);
				planetNames.push(Imperion.getPlanetById(id).name);
				currentIndex = id == Imperion.getCurrentPlanetId() ? i : currentIndex;
			});
			var index = currentIndex > planetIds.length - 2 ? 0 : currentIndex + 1;
			document.location = 'http://' + document.domain + '/planet/buildings/' + planetIds[index];
		} else
			document.location = 'http://' + document.domain + '/planet/buildings/' + Imperion.getCurrentPlanetId();
	},
	planetGetBuildings:function(planet) {
		planet = typeof(planet) != 'undefined' ? planet : Imperion.getCurrentPlanet();
		return typeof(planet.buildings) != 'undefined' ? planet.buildings : {};
	},
	planetGetBuildingByPosition:function(position, planet) {
		planet = typeof(planet) != 'undefined' ? planet : Imperion.getCurrentPlanet();
		var buildings = Imperion.planetGetBuildings(planet);
		return typeof(buildings[position]) != 'undefined' ? buildings[position] : {};
	},
	planetGetResource:function(type, planet) {
		planet = typeof(planet) != 'undefined' ? planet : Imperion.getCurrentPlanet();
		var d = new Date();
		return Math.floor(planet.resources[type].initialQty + ((d.getTime() - planet.resources.updated) * planet.resources[type].productionPerMS));
	},
	planetGetResourceProductionPerHour:function(resource, planet) {
		planet = typeof(planet) != 'undefined' ? planet : Imperion.getCurrentPlanet();
		var production = typeof(planet.resources[resource].productionPerMS) != 'undefined' ? planet.resources[resource].productionPerMS : 0;
		return parseInt(production * 60 * 60 * 1000);
	},
	planetGetHtmlBuildingList:function(planet) {
		unsafeWindow.changePlanet = function(id, href) {
			$.get('/planet/buildings/' + id, function(data) {
			 	if(typeof(href) != 'undefined')
					document.location = href;					
			});
		}
		planet = typeof(planet) == 'undefined' ? Imperion.getCurrentPlanet() : planet;
		var html = '<div class="planetBuildingList"><table cellpadding="0" cellspacing="0" border="0">';
		// add buildings
		var buildings = sortBuildingsByName(Imperion.planetGetBuildings(planet));
		for(var x in buildings) {
			if(buildings[x].position < 100) {
				//planet.buildings	
				var building = buildings[x];
				var missingMetal = Imperion.buildingGetCostMissing('metal', building);
				var missingCrystal = Imperion.buildingGetCostMissing('crystal', building);
				var missingFuel = Imperion.buildingGetCostMissing('fuel', building);
				var missingTotal = missingMetal + missingCrystal + missingFuel;					
				var href = planet.id == Imperion.getCurrentPlanetId() ? building.href : "javascript:changePlanet(" + planet.id + ", '" + building.href + "');";
				html += '<tr><td style="padding-right:2em;"><a href="' +  href + '" style="font-weight:' + (missingTotal == 0 ? 'bold' : 'normal') + '"> ' + 
						(Config.get('buildingListIcons') ? '<nobr><img src="' + building.imgSrc + '"/>' : '') +
						building.name + ' (' + building.level + ')</a></nobr></td>' +
						(Config.get('buildingListMissingResources') ?
							'<td><nobr>' + (missingMetal > 0 ? '<img src="/img/interface/icon/metal.png" class="resourceIconReport"/>' + (addCommas(missingMetal))  : '') + '</nobr></td>' +
							'<td><nobr>' + (missingCrystal > 0 ? '<img src="/img/interface/icon/crystal.png" class="resourceIconReport"/>' + (addCommas(missingCrystal))  : '') + '</nobr></td>' +
							'<td><nobr>' + (missingFuel > 0 ? '<img src="/img/interface/icon/deuterium.png" class="resourceIconReport"/>' + (addCommas(missingFuel))  : '') + '</nobr></td>'
						: '') +
					'</tr>';
			}
		}
		html += '</table></div>';
		return html;
	},
	getPlanetResourceTimeToFullString:function(type, planet) {
		planet = typeof(planet) != 'undefined' ? planet : Imperion.getCurrentPlanet();
		var charge = planet.resources[type].initialQty;
		var capacity = planet.resources[type].capacity;
		var free = capacity - charge;
		var msToFill = free / planet.resources[type].productionPerMS;
		var secondsToFill = parseInt(msToFill / 1000);
		var d = new Date();
		var secondsLeft = secondsToFill - parseInt((d.getTime() - startTime.getTime()) / 1000); 
		var minutesLeft = Math.floor(secondsLeft / 60);
		var hoursLeft = Math.floor(minutesLeft / 60);
		var daysLeft = Math.floor(hoursLeft / 24);
		var seconds = (daysLeft == 0 && hoursLeft == 0) ? (secondsLeft % 60) + 's' : '';
		var minutes = minutesLeft > 0 ? (minutesLeft % 60) + (seconds != '' ? ':' : 'm') : '';
		var hours = hoursLeft > 0 ? (hoursLeft % 24) + 'h ' : '';
		var days = daysLeft > 0 ? daysLeft + 'd ' : '';
		var timeString = days + hours + minutes + seconds;
		return timeString;
	},
	getPlanetResourceCapacityRemaining:function(type, planet) {
		planet = typeof(planet) != 'undefined' ? planet : Imperion.getCurrentPlanet();
		var charge = planet.resources[type].initialQty;
		var capacity = planet.resources[type].capacity;
		return capacity - charge;
	},
	saveBuilding:function(building) {
		var planet = Imperion.getPlanetById(building.planetId);
		planet.buildings[building.position] = building;
		Imperion.savePlanet(planet);
	},
	savePlanet:function(planet) {
		Imperion.planets[planet.id] = planet;
		Imperion.savePlanets();
	},
	savePlanets:function() {
		Imperion.setVal('planets', Imperion.planets);
	},
	saveReport:function(report) {
		var reports = Imperion.getReports();
		reports[report.id] = report;
		Imperion.setVal('reports', reports);		
	},
	//----------------- Views --------------------------
	views:{
		brain:function() {
			var loc = document.location.toString();
			// reports
			if(loc.match(/brain\/report\/\d+\/target\/\d+\//)) {
				// replace icons
				if(Config.get('useResourceIcon')) {
					GM_addStyle('img.resourceIconReport { width:90%; vertical-align:middle; }\
								div.fleetTable table tr td img.resourceIconReport { width:auto !important; margin-left:5px; }');
					$('div.content table.colorWhite tr td').each(function() {
						var html = this.innerHTML;
						if(!html.match(/<img/)) {
							html = html.replace(/\bmetal\b/ig, '<img src="/img/interface/icon/metal.png" title="Metal" class="resourceIconReport"/>');
							html = html.replace(/\bcrystal\b/ig, '<img src="/img/interface/icon/crystal.png" title="Crystal" class="resourceIconReport"/>');
							html = html.replace(/\bdeuterium\b/ig, '<img src="/img/interface/icon/deuterium.png" title="Deuterium" class="resourceIconReport"/>');
							html = html.replace(/\btritium\b/ig, '<img src="/img/interface/icon/deuterium.png"  title="Tritium" class="resourceIconReport"/>');
							html = html.replace(/\bQi-Units\b/ig, '<img src="' + icons.qi + '" class="resourceIconReport" title="Qi-Units" style="height:20px;"/>');
							this.innerHTML = html;
						}
					});
				}
				if(Config.get('reportRefreshLink')) {
					var button = document.createElement('div');
					button.setAttribute('style', 'width:100px; float:right;');
					button.innerHTML = '<a href="#">[ refresh ]</a>';
					button.addEventListener('click', function() {
						var position = loc.match(/brain\/report\/(\d+)\/target\/\d+\//)[1];
						var targetId = loc.match(/brain\/report\/\d+\/target\/(\d+)\//)[1];
						var url = 'http://' + document.domain + '/brain/show/' + position;					
						data = typeof(data) == 'undefined' ? '' : data;
						var headers = {
							"User-agent":navigator.userAgent, 
							"Accept":"text/html", 
							"Referer":'http://' + document.domain,
						}
						GM_xmlhttpRequest ({
							method:'GET',
							url:url,
							data:data,
							headers:headers,
							onload: function (response){
								var html = document.createElement("html");
								html.innerHTML = response.responseText;
								var response = document.implementation.createDocument("", "", null);
								response.appendChild(html);
								$('#brain td a.buttonNormal', response).each(function() {
									if(this.href.indexOf('/' + targetId + '/') != -1) {
										document.location = 'http://' + document.domain + '' + this.href;	
									}
								});
							}
						});
					}, false);
					$('#brain div:first-child h1').append(button);
				}
			}
		},
		embassy:function() {
			setTimeout(function() {
				var timeStr = $('span.impCountDown:eq(1)').text().match(/(\d+):(\d+):(\d+)/);
				var evt = {expire:Imperion.getExpireTimeFromStringTimer($('span.impCountDown:eq(1)').text())};
				var timerDisplay = document.createElement('span');
				timerDisplay.className = 'fontColorRace';
				$('h1:eq(2)').append(': ');
				$('h1:eq(2)').append(timerDisplay);
				setInterval(function() {								
					timerDisplay.innerHTML = Imperion.getEventTimeRemainingString(evt, true);
				}, 1000);
			}, 1000);
		},
		fleetBase:function() {
			// overview tab
			if($('ul.tabs:eq(0) li:first a.active').size() == 1) {
				// add percent full
				if(Config.get('fleetBaseFullPercentage')) {
					$('div.fleetTable table').each(function(i) {
						$('td', $('tr', this).eq(6)).eq(2).each(function() {
							try {
								var cargo = $(this).text().match(/(\d+)\s+\//)[1];
								var capacity = Math.ceil($(this).text().replace(/,/, '.').match(/\/\s+(.+)$/)[1]);
								this.innerHTML = '<span class="fontColorRace">' + (Math.floor(cargo / capacity * 100) ).toString() + 
												 '%</span>   (' + this.innerHTML + ')';
							} catch(e) {}
						});
					});
				}
				// add ship totals
				if(Config.get('fleetBaseSummary')) {
					// get total metal
					var totalMetal = 0;
					$('#fleetBase table.colorWhite td li.interface_icon_metal').each(function() {
						totalMetal += parseInt($(this).text().replace(/,/g, '').replace(/\./g, ''));																		  
					});
					// get total crystal
					var totalCrystal = 0;
					$('#fleetBase table.colorWhite td li.interface_icon_crystal').each(function() {
						totalCrystal += parseInt($(this).text().replace(/,/g, '').replace(/\./g, ''));																		  
					});
					// get total fuel
					var totalFuel = 0;
					$('#fleetBase table.colorWhite td li.interface_icon_deuterium').each(function() {
						totalFuel += parseInt($(this).text().replace(/,/g, '').replace(/\./g, ''));																		  
					});
					
					var shipTypes = {};
					var overviewTable = null;
					$('#fleetBase table.colorWhite').each(function(i) {
						if(i == 0) {
							overviewTable = $(this).clone(true);
						}
						if(parseInt($('tr:eq(4) td', this).eq(1).text().replace(/,|\./g, '')).toString() != 'NaN') {
							$('tr:eq(4) td', this).each(function(cellNum) {
								if(cellNum > 0) {								 
									shipTypes[cellNum] = typeof(shipTypes[cellNum]) != 'undefined' ? shipTypes[cellNum] : 0;
									shipTypes[cellNum] += parseInt($(this).text().replace(/,|\./g, ''));
								}
							});
						}
					});										
					var h = document.createElement('h1');
					h.innerHTML = '<br/>Fleet Overview';
					var targetH = $('#fleetBase h1:eq(0)');
					targetH.before(h);
					var wrapper = document.createElement('div');
					wrapper.className = "fleetTable bgNoRepeat interface_fleet_table_background";
					wrapper.style.marginBottom = "3em";
					$('tr:eq(0)', overviewTable).remove();
					$('tr:eq(0)', overviewTable).remove();
					$('tr', overviewTable).each(function(i) {
						if(i > 3) $(this).remove();
					});
					$('tr:eq(2) td', overviewTable).each(function(i) {
						if(i > 0) {
							this.innerHTML = shipTypes[i];	
							this.className = shipTypes[i] > 0 ? this.className.replace(/colorGrey/, 'fontBold') : this.className.replace(/fontBold/, 'colorGrey');
						}
					});
					var totalEnergy = 0;
					$('table.colorWhite td.energy').each(function() {
						totalEnergy += parseInt($(this).text().replace(/,/g, '').replace(/\./g, ''));
					});
					var tr = document.createElement('tr');
					tr.className = 'colorGrey';
					for(var i = 0; i < 3; i++) {
						var td = document.createElement('td');
						switch(i) {
							case 0:
								td.className = 'borderNone';
								td.innerHTML = '';
								break;
							case 1:
								td.className = '';
								td.innerHTML = '<div class="energy fontSize12 bgNoRepeat bgCenterLeft interface_icon_energy1" style="padding-left:15px;">' + totalEnergy + '</div>';
								td.setAttribute('colspan', '3');
								break;
							case 2:
								td.className = 'borderNone fontSize12 fontRight';
								td.innerHTML = '<ul class="resourceCost">' +
													'<li class="bgNoRepeat interface_icon_deuterium" style="float:right;">' + addCommas(totalFuel) + 
													'<li class="bgNoRepeat interface_icon_crystal" style="float:right;">' + addCommas(totalCrystal) + 
													'<li class="bgNoRepeat interface_icon_metal" style="float:right;">' + addCommas(totalMetal) + 
												'</ul>';
								td.setAttribute('colspan', '9');
								break;
						}
						tr.appendChild(td);
					}
					$(overviewTable).append(tr);
					$(wrapper).append(overviewTable);
					targetH.before(wrapper);
					// move fleet slots
					var fleetSlots = $('#fleetBase div:first');
					fleetSlots.attr('style', 'float:right; margin:8px 15px 0 0; padding:0;');
					$('ul.tabs:eq(0)').before(fleetSlots);
					$('ul.tabs:eq(0)')[0].style.width = 'auto';
				}
			}
			// check for auto harvest
			if(Imperion.getVal('performAutoHarvestNow')) {
				Imperion.setVal('performAutoHarvestNow', false);
				if($('ul.tabs:eq(0) li:first a.active').size() == 1) {
					Imperion.goToNextPlanet();
				} else {
					setTimeout(function() {
	 					// check fuel used
						var fuelRequired = parseInt($('#informationFuel').text());
						if(fuelRequired != 'NaN' && fuelRequired <= Imperion.planetGetResource('fuel')) {
							Imperion.setVal('performAutoHarvestNow', true);
							$('#sendForm')[0].submit();
						} else
							Imperion.goToNextPlanet();
					}, 5000);
				}
			}
		},
		map:function() {			
			Config.preloadData();	// make sure config data is already available to avoid GM conflicts with unsafeWindow
			GM_addStyle('.naviBigItem { display:none !important; } #mapGalaxy div { cursor:pointer !important; }');
			
			function getMapObject() {
				var map = {
					generator:null,
					getCurrentSystemId:function() {
						return map.generator.getSystemIdByPlanetId(Imperion.getCurrentPlanetId());
					},
					getCurrentGalaxyId:function() {
						return  map.generator.getGalaxyIdBySystemId(map.getCurrentSystemId());
					},
					getCoordsBySystemId:function(id) {
						return map.generator.getCoordsBySystemId(id);
					},
					getCurrentSystemCoords:function() {
						return map.getCoordsBySystemId(map.getCurrentSystemId());
					},
					getPlanetsBySystemId:function(id) {
						return map.generator.getPlanetsBySystemId(id);
					},
					getSystemIdByCoords:function(x,y) {
						return map.generator.getSystemIdByCoords(x, y, map.getCurrentGalaxyId());
					},
					getCometsBySystemId:function(id) {
						return (typeof(map.data[id]) != 'undefined' && typeof(map.data[id]["14"]) != 'undefined') ? map.data[id]["14"] : false;
					},
					getCometsNearby:function() {
						var cometsFound = [];
						var coords = map.getCurrentSystemCoords();
						for(var x = coords.x - 3; x < coords.x + 3; x++) {
							for(var y = coords.y - 3; y < coords.y + 3; y++) {
								var systemId = map.getSystemIdByCoords(x,y);
								var comets = map.getCometsBySystemId(systemId);
								for(var i = 0; i < comets.length; i++) {
									comets[i].systemId = systemId;
									comets[i].coords = map.getCoordsBySystemId(systemId);
									comets[i].distance = map.getDistance(map.getCurrentSystemCoords(), comets[i].coords);
									cometsFound.push(comets[i]);
								}
							}
						}
						return cometsFound;
					},
					getDistance:function(from, to) {
						return map.generator.pytagoras(from, to);
					},
					getClosestOpenComet:function(maxDist) {
						maxDist = typeof(maxDist) == 'undefined' ? 999 : maxDist;
						var comets = map.getCometsNearby();
						// get closest comet
						var closestComet = false;
						for(var i = 0; i < comets.length; i++) {
							var total = comets[i].r1 + comets[i].r2 + comets[i].r3;
							closestComet = (!closestComet || (total > 1000 && comets[i].distance <= maxDist && closestComet.distance > comets[i].distance) && typeof(comets[i]['11']) == 'undefined') ? comets[i] : closestComet;
						}
						return closestComet;
					}
				}
				map.generator = unsafeWindow.config.generator;
				map.data = unsafeWindow.mapData;
				return map;
			}
			var map = getMapObject();
			
			
			// check for auto harvest
			if(Imperion.getVal('performAutoHarvestNow')) {
				Imperion.setVal('performAutoHarvestNow', false);
				var numRecyclersAvailable = Imperion.getVal('numRecyclersAvailable');
				// check closest comet
				var closestComet  = map.getClosestOpenComet(1);
				if(closestComet) {
					var total = closestComet.r1 + closestComet.r2 + closestComet.r3;
					var numHarvestersNeeded = Math.ceil(total / Imperion.getShipPayload(getHarvesterId()));
					var numHarvestersUsed = numHarvestersNeeded < numRecyclersAvailable ? numHarvestersNeeded : numRecyclersAvailable;
					var url = 'http://' + document.domain + '/fleetBase/mission/1/planetId/c' + closestComet.id + '/m/301/ships/' + 
						((Imperion.getRace() == 'terrans' && Config.get('usingLargeRecylers')) ? ',,,' : ',,,,') + numHarvestersUsed;
					Imperion.setVal('performAutoHarvestNow', true);
					document.location = url;
				} else {
					Imperion.goToNextPlanet();
				}
			}
			
			
			
			
			Imperion.getReports();	// make sure reports are accessible
			var currentSystemId = false;
			
			var mapContentHeight = $('div#mapContent').css('height');
			var mapHeight = $('div#map').css('height');
			function increaseMapSize() {
				if(Config.get('bigMap')) {
					if($('#mapWrapper').size() == 0) {
						$('#mapInfo').attr('style', 'position:absolute; z-index:100; top:0; left:0;');
						var mapWrapper = document.createElement('div');
						mapWrapper.id = "mapWrapper";
						$(mapWrapper).attr('style', 'height:645px; width:100%; position:relative; overflow:hidden;');
						$('div#mapContent').before(mapWrapper);
						$(mapWrapper).append($('div#mapContent'));
						$('div#mapContent').css('overflow', 'visible');
					}
					$('div#map').css('height', '645px');
					$('div#mapWrapper').css('height', '645px');
				}
			}
			increaseMapSize();
			function decreaseMapSize() {
				$('div#mapWrapper').css('height', mapHeight);
				$('div#map').css('height', mapHeight);
			}
			function InitListener (div,attrName,onFire) {
				var ListenerForElemet = document.getElementById(div);
				function ChargeFireEvent(eventElement,attribute) {			
					var attr = eventElement.getAttributeNode(attribute);
					if(attr == null) {
						eventElement.setAttribute('style', '');
						attr = eventElement.getAttributeNode(attribute);
					}
					var eventObject = document.createEvent('MutationEvent');
					eventObject.initMutationEvent("DOMAttrModified", true, true, attr, null, attr.value, attribute, MutationEvent.MODIFICATION);
					eventElement.dispatchEvent(eventObject);
				}
				ChargeFireEvent(ListenerForElemet, attrName);
				ListenerForElemet.addEventListener ('DOMAttrModified', onFire, false);  // Firefox, Opera
			}
			
			
			var mapSystemListenerEnabled = false;
			var mapZoomOutDetectSet = false;
			var systemSurveyTimes = Imperion.getVal('systemSurveyTimes');
			function systemView() {
				if(!mapZoomOutDetectSet) {
					mapZoomOutDetectSet = true;
					$('a#zoomOut').click(increaseMapSize);
					var surveyWrapper = document.createElement('div');
					var survey = document.createElement('img');
					survey.src = icons.survey;
					survey.id = 'phasmaSurveySystemButton';
					surveyWrapper.setAttribute('style', 'color:#ccc; text-align:right; position:absolute; top:5px; right:5px; !important; z-index:3000; ');
					survey.setAttribute('style', 'vertical-align:middle; cursor:pointer !important;');
					surveyWrapper.innerHTML = '<span id="phasmaSurveyTimeString"></span> ';
					$(surveyWrapper).append(survey);
					$('#mapSystem').append(surveyWrapper);
					$(survey).click(function(){
						try {
							var systemId = document.location.toString().match(/system\/(\d+)/)[1];
						} catch (e) {
							var systemId = currentSystemId;
						}
						if(systemId) {
							var planets = unsafeWindow.mapData[systemId][1];
							var planetsToSurvey = [];
							for(var planetId in planets) {
								if(typeof(planets[planetId][4]) == 'undefined' && unsafeWindow.config.generator.getPlanetTypeId(planetId) != 1) {
									planetsToSurvey.push(planets[planetId]);
								}
							}
							// check for available fleet slots
							var fleetDom = GetClassic('http://' + document.domain + '/fleetBase/show/1');
							var slots = $('.fleetbaseSlots:eq(0)', fleetDom).text().match(/(\d+)[^\d]+(\d+)/);
							var slotsAvailable = parseInt(slots[2]) - parseInt(slots[1]);
							var error = false;
							if(slotsAvailable < planetsToSurvey.length) {
								alert("Unable to perform Raids.\n\nYou only have " + slotsAvailable + " of the " + planetsToSurvey.length + " fleet slots needed.")
								error = true;
							}			
							if(!error && confirm('Are you sure you want to survey ' + planetsToSurvey.length + ' empty planets?' +
								"\n\nYou must have " + planetsToSurvey.length + " fleet slots and spied available."
							)) {
								$('#phasmaSurveySystemButton').attr('src', icons.loading);
								var spiesSent = 0;
								for(var i = 0; i < planetsToSurvey.length; i++) {
									var planet = planetsToSurvey[i];
									var planetId = planet[2];
									var fleetBaseUrl = 'http://' + document.domain + '/fleetBase/mission/1/planetId/' + planetId + '/m/302/ships/';
									var dom = GetClassic('http://' + document.domain + '/fleetBase/mission/1/planetId/' + planetId);
									var form = $('form', dom)[0];
									var data = {
										f: $('input[name=f]', form).attr('value'),
										tan: $('input[name=tan]', form).attr('value'),
										targetType: 'p',
										'ship[2]': 5,
										mission: 302,
										planet: planetId
									}
									var resultDom = PostClassicDom(form.action, data);
									if($('#default_meta_overview[class*=active]', resultDom).size() == 1) spiesSent++;
								}
								$('#phasmaSurveySystemButton').attr('src', icons.survey);
								var remaining = planetsToSurvey.length - spiesSent;
								var d = new Date();
								var systemSurveyTimes = Imperion.getVal('systemSurveyTimes');
								systemSurveyTimes[systemId] = d.getTime(); 
								Imperion.setVal('systemSurveyTimes', systemSurveyTimes);
								alert("Spies successfully sent to " + spiesSent + " planets. " + (remaining > 0 ? "\n\nUnable to survey " + remaining + " planet" + (remaining > 1 ? 's' : '') + ".\n\nCheck fleet spot and spy availability." : ''));
							}
							return false; // don't zoom the map back out
						}
					});
				}
				$('#phasmaSurveySystemButton').attr('title', 'Raids unoccupied planets in this system');
				if($('#mapSystem').css('top') == '0px') {
					decreaseMapSize();
					try {
						var systemId = document.location.toString().match(/system\/(\d+)/)[1];
					} catch (e) {
						var systemId = currentSystemId;
					}
					if(typeof(systemSurveyTimes[systemId]) != 'undefined') {
						var d = new Date();
						var timeSinceStr = Imperion.getDurationStringFromMs(d.getTime() - systemSurveyTimes[systemId]);
						$('#phasmaSurveyTimeString').html(timeSinceStr);
					} else {
						$('#phasmaSurveyTimeString').html('');
					}
				}
			}
			function enableMapSystemListener() {
				if(!mapSystemListenerEnabled) {
					mapSystemListenerEnabled = true;
					InitListener('mapSystem', "style", systemView);
				}
			}
			function listenForSystem() {
				if($('#mapSystem').size() == 1) {
					enableMapSystemListener();
					systemView();
				}
				if(!mapSystemListenerEnabled)
					setTimeout(listenForSystem, 500);
			}
			listenForSystem();
			
			// set up report saver
			unsafeWindow.phasmaReportsToSave = [];
			setInterval(function() {
				if(unsafeWindow.phasmaReportsToSave.length > 0) {
					var newSaves = [];
					for(var i = 0; i < unsafeWindow.phasmaReportsToSave.length; i++) {
						Imperion.saveReport(unsafeWindow.phasmaReportsToSave[i]);
						newSaves.push(unsafeWindow.phasmaReportsToSave[i]);
					}
					unsafeWindow.phasmaReportsToSave = newSaves;
				}
			}, 1000);
			
			function getHarvesterId() {
				switch(Imperion.getRace()) {
					case 'titans': return 24; break;
					case 'xen': return 44; break
					case 'terrans': return Config.get('usingLargeRecylers') ? 3 : 4; break;
					default: return 0;
				}
			}
			function getRecyclerHtml(total, type) {
				var numHarvesters = Math.ceil(total / Imperion.getShipPayload(getHarvesterId()));
				return '<tr><td>Total:</td><td id="ImperionMods' + type + 'Total">' + (Config.get('addMapCommas') ? addCommas(total) : total) + '</td></tr>' +
						'<tr class="fontColorRace"><td>' + Imperion.getShipName(getHarvesterId()) + ':</td>'+
						'<td id="ImperionMods' + type + 'RecyclerCount">' + numHarvesters + '</td></tr>';
			}
			// comet displayed
			function cometView() {
				if($('#mapDialog_cometInfo').css('display') == 'block') {
					currentSystemId = document.location.toString().match(/system\/(\d+)/)[1];												   
					decreaseMapSize();
					enableMapSystemListener();
					// add total resources:
					var total = 0;
					$('#mapDialog_cometInfo table:eq(0) tr td').each(function(i) {
						if(this.innerHTML.match(/\d/) && i < 6) {
							total += parseInt(this.innerHTML.replace(/[^\d]/g, ''));
							if(Config.get('addMapCommas')) this.innerHTML = addCommas(this.innerHTML);
						}
					});
					var numHarvesters = Math.ceil(total / Imperion.getShipPayload(getHarvesterId()));
					if($('#ImperionModsCometRecyclerCount').size() == 0) {
						$('#mapDialog_cometInfo table:eq(0)').append(getRecyclerHtml(total, 'Comet'));
					} else {
						$('#ImperionModsCometTotal').html((Config.get('addMapCommas') ? addCommas(total) : total));
						$('#ImperionModsCometRecyclerCount').html(numHarvesters);
					}
					var recycleUrl = $('#recycle').attr('href');
					$('#recycle').attr('href', recycleUrl + '/ships/' + 
						((Imperion.getRace() == 'terrans' && Config.get('usingLargeRecylers')) ? ',,,' + numHarvesters : ',,,,' + numHarvesters)
					);
				}
			}
			InitListener("mapDialog_cometInfo","style",cometView);
			// debris field displayed
			function debrisView() {
				if($('#mapDialog_debrisInfo').css('display') == 'block') {
					currentSystemId = document.location.toString().match(/system\/(\d+)/)[1];												   
					decreaseMapSize();
					enableMapSystemListener();
					// add total resources:
					var total = 0;
					$('#mapDialog_debrisInfo table:eq(0) tr td').each(function(i) {
						if(this.innerHTML.match(/\d/) && i < 6) {
							total += parseInt(this.innerHTML.replace(/[^\d]/g, ''));
							if(Config.get('addMapCommas')) this.innerHTML = addCommas(this.innerHTML);
						}
					});
					var numHarvesters = Math.ceil(total / Imperion.getShipPayload(getHarvesterId()));
					if($('#ImperionModsDebrisRecyclerCount').size() == 0) {
						$('#mapDialog_debrisInfo table:eq(0)').append(getRecyclerHtml(total, 'Debris'));
					} else {
						$('#ImperionModsDebrisTotal').html((Config.get('addMapCommas') ? addCommas(total) : total));
						$('#ImperionModsDebrisRecyclerCount').html(numHarvesters);
					}
					var recycleUrl = $('#recycle').attr('href');
					$('#recycle').attr('href', recycleUrl + '/ships/' + 
						((Imperion.getRace() == 'terrans' && Config.get('usingLargeRecylers')) ? ',,,' + numHarvesters : ',,,,' + numHarvesters)
					);
				}
			}
			InitListener("mapDialog_debrisInfo","style",debrisView);
			// Asteroid displayed
			function asteroidView() {
				if($('#mapDialog_asteroidInfo').css('display') == 'block') {
					currentSystemId = document.location.toString().match(/system\/(\d+)/)[1];												   
					decreaseMapSize();
					enableMapSystemListener();
					// add total resources:
					var total = 0;
					$('#mapDialog_asteroidInfo table:eq(0) tr td').each(function(i) {
						if(this.innerHTML.match(/\d/) && i < 6) {
							total += parseInt(this.innerHTML.replace(/[^\d]/g, ''));
							if(Config.get('addMapCommas')) this.innerHTML = addCommas(this.innerHTML);
						}
					});
					var numHarvesters = Math.ceil(total / Imperion.getShipPayload(getHarvesterId()));
					if($('#ImperionModsAsteroidRecyclerCount').size() == 0) {
						$('#mapDialog_asteroidInfo table:eq(0)').append(getRecyclerHtml(total, 'Asteroid'));
					} else {
						$('#ImperionModsAsteroidTotal').html((Config.get('addMapCommas') ? addCommas(total) : total));
						$('#ImperionModsAsteroidRecyclerCount').html(numHarvesters);
					}
					var recycleUrl = $('#recycle').attr('href');
					$('#recycle').attr('href', recycleUrl + '/ships/' + 
						((Imperion.getRace() == 'terrans' && Config.get('usingLargeRecylers')) ? ',,,' + numHarvesters : ',,,,' + numHarvesters)
					);
				}
			}
			InitListener("mapDialog_asteroidInfo","style",asteroidView);
			// planet updated
			function planetView() {
				if($('#mapDialog_climateInfo').css('display') == 'block') {
					decreaseMapSize();
					enableMapSystemListener();
					currentSystemId = document.location.toString().match(/system\/(\d+)/)[1];
					// add clear report cache button
					if($('#phasmaClearCache').size() == 0) {
						var clearCache = document.createElement('img');
						clearCache.title = 'Clear all cached reports';
						clearCache.src = icons.pageDelete;
						clearCache.id = 'phasmaClearCache';
						$(clearCache).click(function() { Imperion.setVal('reports', {}); alert('Cached reports have been cleared') });
						clearCache.setAttribute('style', 'cursor:pointer; margin:0 0 0 .5em; vertical-align:middle;');
						$('#mapDialog_reports h1').append(clearCache);
					}
					
					$('#mapDialog_reports tr a[href*=/report/show/]').each(function() {
						this.title = this.innerHTML;
						var matches = this.href.match(/report\/show\/id\/([^\/]+)\/[^\d]+(\d+)/);
						var report = Imperion.getReportById(matches[2]);
						GM_addStyle('img.reportIcon, img.resourceIconReport { vertical-align:middle; border:none; }\
									img.resourceIconReport { height:16px; ');
						if(matches[1].match(/espionage|combat/)) {
							this.innerHTML = this.innerHTML.replace(/^\s*0/, '').replace(/\/\d\d\s/, ' ').replace(/\d\d:\d\d:\d\d\s/, '').replace(/\s0/g, ' ').replace(/AM/, '').replace(/PM/, '').replace(/\/0/, '/') + '';
							if(!report.parsed) {
								this.innerHTML = '<img title="Loading" src="' + icons.loading + '" class="reportIcon" style="border:none;"/> ' + this.innerHTML;
								report = Imperion.getReportByUrl(this.href);
								$('img', this).remove();
								unsafeWindow.phasmaReportsToSave.push(report);
							} 
						}
						switch (report.type) {
							case 'espionage':
								this.innerHTML = '<noBr><img title="espionage" src="' + icons.espionage + '" class="reportIcon"/> ' +
													this.innerHTML +
													'<img src="/img/interface/icon/metal.png" class="resourceIconReport"/>' +
													addCommas(report.resourcesAvailable.metal) +
													' <img src="/img/interface/icon/crystal.png" class="resourceIconReport"/>' +
													addCommas(report.resourcesAvailable.crystal) +
													' <img src="/img/interface/icon/deuterium.png" class="resourceIconReport"/>' +
													addCommas(report.resourcesAvailable.fuel) +
													(report.resourcesAvailable.qi > 0 ? ' <img src="' + icons.qi + '" class="resourceIconReport"/>' + addCommas(report.resourcesAvailable.qi) : '') +
												'</nobr>';
								break;
							case 'combat':
								this.innerHTML = '<noBr><img title="combat" src="' + icons.combat + '" class="reportIcon"/> ' +
													this.innerHTML +
													(report.resourcesGathered.metal > 0 ? ' <img src="/img/interface/icon/metal.png" title="Metal" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.metal) : '') +
													(report.resourcesGathered.crystal > 0 ? ' <img src="/img/interface/icon/crystal.png" title="Crystal" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.crystal) : '') +
													(report.resourcesGathered.fuel > 0 ? ' <img src="/img/interface/icon/deuterium.png" title="Fuel" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.fuel) : '') +
													(report.resourcesGathered.qi > 0 ? ' <img src="' + icons.qi + '" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.qi) : '') +
												'</nobr>';
								parsed = true;
								break;
						}
					});
				}
			}
			InitListener("mapDialog_climateInfo","style",planetView);
			
			// get best energy production
			var g = unsafeWindow.config.generator
			
			var best = 0;
			var bestSystemId = 0;
			var c = g.getCoordsBySystemId(map.getCurrentSystemId());
			
			var html = '<div style="color:#fff">';
			
			/*
			for(var systemId in map.data) {						// loop through systems				
				if(map.getDistance(c, g.getCoordsBySystemId(systemId)) <= 20) {
					var planets = g.getPlanetsBySystemId(systemId);
					for(var planetId in planets) {		// loop through planets
						if(planetId.toString().match(/^\d+$/) && planets[planetId].type != 6 && planets[planetId].type != 3) {
							var climate = g.getPlanetClimate(planets[planetId].id, planets[planetId].type);
							for(var p = 1; p < 5; p++) {
								if(typeof(climate[p]) != 'undefined' && climate[p].toString() != 'NaN' && climate[p] > 180) {
									var coords = g.getCoordsBySystemId(systemId);
									html += '<a href="http://u1.imperion.com.au/map/index/#/center/' + systemId + '/system/' + planets[planetId].id.toString().replace(/\d\d$/, '') + '/planet/' + planets[planetId].id + '">' + planets[planetId].id +  ' (' + coords.x + ', ' + coords.y + ' - ' + climate[p] + ') ' + map.getDistance(c, g.getCoordsBySystemId(systemId)) + ' ' + planets[planetId].type + '</a><br/>';
									best = climate[p];
									bestSystemId = systemId;
									var type = planets[planetId].type;
								}
							}
						}
					}
				}
			}
			if(!document.location.toString().match(/center/))
				document.body.innerHTML = (html);
			//alert('system:' + systemId + ', planet:' + bestPlanetId + ', type:' + type + 'e:' + best)
			*/
			
			
			
			
			
			
			
			
			function dump(obj) {
				var str = "\n\n";
				for(var x in obj) {
					str += x + ": " + typeof(obj[x]) +"\n";
				}
				str += "\n\n";
				for(var x in obj) {
					str += x + ": " + obj[x] +"\n";
				}
				document.body.innerHTML = (str);
			}
			
			if(Config.get('bigMap')) {
				setTimeout(function() {
			//		increaseMapSize();
				}, 1500);
			}
		},
		market:function() {
			// update merchant timers
			setTimeout(function() {
				var timers = Imperion.getVal('timers');
				$('tr', $('#slotContent table').eq(0)).each(function(i) {
					if(i > 2 && i%2 == 0) {
						var eventId = ($('td', this).eq(0).html() + $('td', this).eq(1).html() + $('td', this).eq(2).html() + $('td', this).eq(3).html()).replace(/\s/g, '').replace(/</g, '').replace(/>/g, '').replace(/"/g, '');
						var timeStr = $('td', this).eq(4).text();
						var str = $('td', this).eq(2).text() + ' ';
						str += $('div', $('td', this).eq(3)).eq(0).text() != '0' ? '  <img src="/img/interface/icon/metal.png" style="height:16px; vertical-align:middle"/>' + $('div', $('td', this).eq(3)).eq(0).text() : '';
						str += $('div', $('td', this).eq(3)).eq(1).text() != '0' ? '  <img src="/img/interface/icon/crystal.png" style="height:16px; vertical-align:middle"/>' + $('div', $('td', this).eq(3)).eq(1).text() : '';
						str += $('div', $('td', this).eq(3)).eq(2).text() != '0' ? '  <img src="/img/interface/icon/deuterium.png" style="height:16px; vertical-align:middle"/>' + $('div', $('td', this).eq(3)).eq(2).text() : '';
						timers[eventId] = {id:eventId, expire:Imperion.getExpireTimeFromStringTimer(timeStr), str:str, type:'outgoingMerchant'}
					}				
				});
				$('tr', $('#slotContent table').eq(1)).each(function(i) {
					if(i > 2 && i%2 == 0) {
						var eventId = ($('td', this).eq(0).html() + $('td', this).eq(1).html() + $('td', this).eq(2).html()).replace(/\s/g, '').replace(/</g, '').replace(/>/g, '').replace(/"/g, '');
						var timeStr = $('td', this).eq(3).text();
						var str = $('td', this).eq(1).text() + ' ';
						str += $('div', $('td', this).eq(2)).eq(0).text() != '0' ? '  <img src="/img/interface/icon/metal.png" style="height:16px; vertical-align:middle"/>' + $('div', $('td', this).eq(2)).eq(0).text() : '';
						str += $('div', $('td', this).eq(2)).eq(1).text() != '0' ? '  <img src="/img/interface/icon/crystal.png" style="height:16px; vertical-align:middle"/>' + $('div', $('td', this).eq(2)).eq(1).text() : '';
						str += $('div', $('td', this).eq(2)).eq(2).text() != '0' ? '  <img src="/img/interface/icon/deuterium.png" style="height:16px; vertical-align:middle"/>' + $('div', $('td', this).eq(2)).eq(2).text() : '';
						timers[eventId] = {id:eventId, expire:Imperion.getExpireTimeFromStringTimer(timeStr), str:str, type:'incomingMerchant'}
					}				
				});
				Imperion.setVal('timers', timers);
			}, 1000);
		},
		planet:function() {
			if($('#planetSurface').size() == 1) {
				GM_addStyle('\
					area * { display:block; }\
					div.buildingLevel {\
						display:inline; padding:2px 4px; border:2px outset #666; background:#000; z-index:100000; color:#aaa; font-size:10px; -moz-border-radius:10px; \
					}\
				');
				var planet = Imperion.getCurrentPlanet();
				var newBuildings = {};
				$('div#planetSurface div.circle').each(function(i) {
					if(!this.className.match(/new/)) {
						var position = this.id.match(/\d+$/)[0];
						var building = Imperion.planetGetBuildingByPosition(position);
						building = building ? building : new Building();
						building.level = parseInt($('area#area_' + position).attr('title').match(/\d+$/)[0]);
						building.name = $('area#area_' + position).attr('title').replace(/\s[^\s]+\s\d+$/, '');
						building.href = $('area#area_' + position).attr('href');
						building.imgSrc = getStyle($('a', this)[0], 'background-image').replace(/^url\(/, '').replace(/\)$/, '').replace(/"/g, '');
						building.position = position;
						building.planetId = Imperion.getCurrentPlanetId();
						if(Config.get('planetBuildingLevels')) { $('a', this).html('<div class="buildingLevel" style="' + (Imperion.buildingGetCostMissingTotal(building) == 0 ? 'background-color:#1BB621; color:#fff; border:2px solid #000;' : '') + '">' + building.level + '</div>'); }
						newBuildings[position] = building;
					}
				});	
				planet.buildings = newBuildings;
				Imperion.savePlanet(planet);
				// update build timers
				setTimeout(function() {
					var timers = Imperion.getVal('timers');
					$('#buildingQueue table tr').each(function(i) {
						if(i > 0 && i%2 == 0) {
							var eventId = $('td', this).eq(0).html().match(/delEvent\/(\d+)/)[1];
							var timeStr = $('td', this).eq(2).text();
							timers[eventId] = {
								id:eventId,
								expire:Imperion.getExpireTimeFromStringTimer(timeStr),
								str:$('td', this).eq(1).text(),
								planetName:Imperion.getCurrentPlanet().name,
								type:'building',
							}
						}				
					});
					Imperion.setVal('timers', timers);
				}, 1000);
			}
		},
		report:function() {
			// process report list
			if($('form#reportIndexForm').size() == 1) {
				// add clear report cache button
				var clearCache = document.createElement('img');
				clearCache.title = 'Clear cached reports';
				clearCache.src = icons.pageDelete;
				$(clearCache).click(function() { Imperion.setVal('reports', {}); alert('Cached reports have been cleared') });
				clearCache.setAttribute('style', 'float:right; cursor:pointer; margin:10px 20px 0 0;');
				$('#submitDelete').after(clearCache);
				$('form#reportIndexForm tr').each(function() {
					var reportLink = $('td:eq(2) a[href*=/report/show/]', this);
					if(reportLink.size() == 1) {
						var matches = reportLink.attr('href').match(/\/id\/([^\/]+)\/[^\d]*(\d+)/);
						var id = matches[2];
						var report = Imperion.getReportById(id);
						report.type = matches[1];
						if (!report.parsed && matches[1].match(/espionage|recycle|trade|combat/)) {
							$('td:eq(1)', this).html('<img title="Harvest comet" src="' + icons.loading + '" class="reportIcon"/> ');
							report = Imperion.getReportByUrl(reportLink.attr('href'));
						}								
						GM_addStyle('img.reportIcon, img.resourceIconReport { vertical-align:middle; height:16px; opacity:.5; border:none;}\
									 tr:hover img.reportIcon, tr:hover img.resourceIconReport { opacity:1;}');
						switch(report.type) {
							case 'combat':
								$('td:eq(1)', this).html('<img title="Combat" src="' + icons.combat + '" class="reportIcon"/> ');
								if(typeof(report.targetHref) != 'undefined') { 
									var targetText = reportLink.text().match(/[^\s]+\s*$/)[0];
									reportLink.html(reportLink.text().replace(/\s[^\s]+\s*$/, ''));
								}
								reportLink.after(
									(typeof(report.targetHref) != 'undefined' ? 
										' <a href="' + report.targetHref + '" title="View target on map" class="colorDarkGrey">' + targetText + '</a> ' +
										' <a href="/fleetBase/mission/1/planetId/' + report.targetId + '/m/301" title="Send fleet"><img src="' + icons.go + '" class="reportIcon"/</a> ' 
										: '') +
									'    ' +
									(report.resourcesGathered.metal > 0 ? ' <img src="/img/interface/icon/metal.png" title="Metal" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.metal) : '') +
									(report.resourcesGathered.crystal > 0 ? ' <img src="/img/interface/icon/crystal.png" title="Crystal" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.crystal) : '') +
									(report.resourcesGathered.fuel > 0 ? ' <img src="/img/interface/icon/deuterium.png" title="Fuel" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.fuel) : '') +
									(report.resourcesGathered.qi > 0 ? ' <img src="' + icons.qi + '" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.qi) : '')
								);
								break;								
							case 'espionage':
								$('td:eq(1)', this).html('<img title="Espionage" src="' + icons.espionage + '" class="reportIcon"/> ');								
								if(typeof(report.targetHref) != 'undefined') { 
									var targetText = reportLink.text().match(/[^\s]+\s*$/)[0];
									reportLink.html(reportLink.text().replace(/\s[^\s]+\s*$/, ''));
								}
								reportLink.after(
									(typeof(report.targetHref) != 'undefined' ? 
										' <a href="' + report.targetHref + '" title="View target on map" class="colorDarkGrey">' + targetText + '</a> ' +
										' <a href="/fleetBase/mission/1/planetId/' + report.targetId + '/m/301" title="Send fleet"><img src="' + icons.go + '" class="reportIcon"/</a> ' 
										: '') +
									'    <img src="/img/interface/icon/metal.png" title="Metal" class="resourceIconReport"/>' + addCommas(report.resourcesAvailable.metal) +
									' <img src="/img/interface/icon/crystal.png" title="Crystal" class="resourceIconReport"/>' + addCommas(report.resourcesAvailable.crystal) +
									' <img src="/img/interface/icon/deuterium.png" title="Fuel" class="resourceIconReport"/>' + addCommas(report.resourcesAvailable.fuel) +
									(report.resourcesAvailable.qi > 0 ? ' <img src="' + icons.qi + '" class="resourceIconReport"/>' + addCommas(report.resourcesAvailable.qi) : '')
								);
								break;
							case 'recycle':
								reportLink.after(
									'    <img src="/img/interface/icon/metal.png" title="Metal" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.metal) +
									' <img src="/img/interface/icon/crystal.png" title="Crystal" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.crystal) +
									' <img src="/img/interface/icon/deuterium.png" title="Fuel" class="resourceIconReport"/>' + addCommas(report.resourcesGathered.fuel)
								);
								$('td:eq(1)', this).html('<img title="Harvest comet" src="' + icons.recycle + '" class="reportIcon"/> ');								
								break;
							case 'trade':
								$('td:eq(1)', this).html('<img title="Trade" src="' + icons.trade + '" class="reportIcon"/> ');								
								reportLink.after('    ' + 
									(report.resources.metal > 0 ? '<img src="/img/interface/icon/metal.png" title="Metal" class="resourceIconReport"/>' + addCommas(report.resources.metal) : '') +
									(report.resources.crystal > 0 ? ' <img src="/img/interface/icon/crystal.png" title="Crystal" class="resourceIconReport"/>' + addCommas(report.resources.crystal) : '') +
									(report.resources.fuel > 0 ? ' <img src="/img/interface/icon/deuterium.png" title="Fuel" class="resourceIconReport"/>' + addCommas(report.resources.fuel) : '')
								);
								break;
						}
					}
				});
			}
			// parse reports
			if(document.location.toString().match(/\/report\/show\/id\//)) Imperion.getReportByUrl(document.location.toString());
			if(Config.get('useResourceIcon') && document.location.toString().match(/\/show\//)) {
				GM_addStyle('img.resourceIconReport { height:25px !important; padding-left:.5em; width:24px !important; vertical-align:middle; margin-left:-7px; margin-right:-5px; }');
				function replaceIcons(str) {
					$(str).each(function() {
						if (!this.innerHTML.match(/<img/)) {
							var html = this.innerHTML;
							html = html.replace(/\bmetal\b/ig, '<img src="/img/interface/icon/metal.png" title="Metal" class="resourceIconReport"/>');
							html = html.replace(/\bcrystal\b/ig, '<img src="/img/interface/icon/crystal.png" title="Crystal" class="resourceIconReport"/>');
							html = html.replace(/\bdeuterium\b/ig, '<img src="/img/interface/icon/deuterium.png" title="Deuterium" class="resourceIconReport"/>');
							html = html.replace(/\btritium\b/ig, '<img src="/img/interface/icon/deuterium.png" title="Tritium" class="resourceIconReport"/>');
							html = html.replace(/\bQi-Units\b/ig, ' <img src="' + icons.qi + '" class="resourceIconReport" title="Qi-Units" style="height:20px; margin:0;"/> ');
							this.innerHTML = html;
						}
					});
				}
				replaceIcons('div.content p');
				replaceIcons('div.content h3');
				replaceIcons('div.fleetTable tr td');
			}
		},
		researchCenter:function() {
			// read current research and production
			var fields = [];
			$('#researchCenter table.toggleTable').each(function(i) {
				if(i > 0) { // ignore first one
					fields.push({
						research:$('tr td', this).eq(2).text().replace(/(\.|,)(\d+)\s*$/, '_$2').replace(/\.|,/g, '').replace(/_/, '.'),
						production:$('tr', this).eq(2).text().replace(/(\.|,)(\d+)\s+/, '_$2').replace(/\.|,/g, '').replace(/_/, '.').match(/\d+\.?\d*/)[0],
					});
				}
			});
			// update time remaining labels
			$('div.extraTable').each(function(i) {
				GM_addStyle('td a.buttonError { color:#FBB !important; }');
				var research = fields[i].research;
				var production = fields[i].production;
				$('table.colorWhite tr', this).each(function(i) {
					if(i > 1 && $('td.spacer', this).size() == 0) {
						var cost = parseInt($('td', this).eq(2).text().replace(/^\s*-\s*$/, 0).replace(/[^\d]/g, '')); 
						var remaining = cost - research;
						if(remaining > 0) {
							var numDays = remaining / production;
							var minutesRemaining = numDays * 60 * 24;
							var hoursRemaining = minutesRemaining / 60;
							var days = Math.floor(numDays) > 0 ? Math.floor(numDays) + 'd ' : '';
							var hours = Math.floor(hoursRemaining % 24) > 0 ? Math.floor(hoursRemaining % 24) + 'h ' : ''; 
							var totalMinutes = numDays * 24 * 60;
							var minutes = Math.floor(minutesRemaining % 60) + 'm';
							var html = $('td a.buttonError', this).html().match(/^\s*<span.*<\/span>/)[0];
							$('td a.buttonError', this).html(html + days + hours + minutes);
						}
					}
				});
			});;
		},
		shipYard:function() {
		}
	},
	//----------------- setValue -----------------------
	getVal:function(key, useDomain) {
		if(typeof(useDomain) == 'undefined' || useDomain) {
			key = document.domain + key;	
		}
		return eval(GM_getValue(key, ('({})')));
	},
	//----------------- setValue -----------------------
	setVal:function(key, value, useDomain) {
		if(typeof(useDomain) == 'undefined' || useDomain) {
			key = document.domain + key;	
		}
		GM_setValue(key, uneval(value));
	},
	
}

function sortArrayByKeys(array) {
	var duplicateKeys = new Array();
	var keys = new Array();
	for(k in array) {
		keys.push(k);
	}
	keys.sort();
	var newArray = new Array();
	for(var i = 0; i < keys.length; i++) {
		newArray.push(array[keys[i]]);
	}	
	return newArray
}
function sortBuildingsByName(buildings) {
	var array = [];
	for(var x in buildings) {
		array.push(buildings[x]);	
	}
	var sortArray = new Array();
	for(var i = 0; i < array.length; i++) {
		var empty = false;
		var nameLevel = array[i].name + array[i].level;
		while(!empty) {
			if(typeof(sortArray[nameLevel]) == 'undefined') {
				sortArray[nameLevel] = array[i];
				empty = true;
			}
			nameLevel +=  " ";
		}
	}
	return sortArrayByKeys(sortArray);
}


function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function GetClassic(url){	
	var xhttp;
	if (window.XMLHttpRequest) {
		xhttp=new XMLHttpRequest();
	}
	else { // Internet Explorer 5/6	  
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",url,false);	
	xhttp.send(null);
	return xhttp.responseText;
}

var domCache = {}; // stores HTTP request dom results to avoid multiple calls
function GetAsync(url, callback) {
	$.ajax({
		url:url,
		success:callback
	});
}
function GetAsyncDom(url, callback){
	if(typeof(domCache[url]) == 'undefined') {
		var html = document.createElement("html");
		GetAsync(url, function(data) {
			html.innerHTML = data;
			var response = document.implementation.createDocument("", "", null);
			response.appendChild(html);
			domCache[url] = response;
			callback(domCache[url]);
		})
	} else {
		callback(domCache[url]);
	} 
}
function GetClassicDom(url) {
	if(typeof(domCache[url]) == 'undefined') {
		var html = document.createElement("html");
		html.innerHTML = GetClassic(url);
		var response = document.implementation.createDocument("", "", null);
		response.appendChild(html);
		domCache[url] = response;
	}
	return domCache[url];
}
function PostClassic(url, data){
	var params = "";
	for(var x in data) {
		params += x + '=' + data[x] + '&';
	}	
	params = params.replace(/&$/);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST",url,false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("Content-length", params.length);
	xhttp.setRequestHeader("Connection", "close");
	xhttp.send(params);
	return xhttp.responseText;
}
function PostClassicDom(url, data) {
	var html = document.createElement("html");
	html.innerHTML = PostClassic(url, data)
	var response = document.implementation.createDocument("", "", null);
	response.appendChild(html);
	return response;
}


var icons = {
	clock:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMESURBVDjLXZNrSFNxGMYPgQQRfYv6EgR9kCgKohtFgRAVQUHQh24GQReqhViWlVYbZJlZmZmombfVpJXTdHa3reM8uszmWpqnmQuX5drmLsdjenR7ev9DR3Xgd3h43+d5/pw/HA4AN9zITSPUhJ14R0xn87+h2ZzJvZVInJpzAQOXQOQMt+/5rvhMCLXv9Vjrt1rSXitmwj+Jua1+Ox+2HfGNdGf6yW8l5sUKPNVcRsiaPDA22Ahv6/7Ae/0aKdviQ0G7B/c6f8Zg+gbfh079Mjno0MhS58lflOsgEjh3BXc+bM/0DzbvDwj314znt/bjof0HdPw3FBq6kP+oCxVNfdDZvqPsrQmf6zdFRtyPJgbrFoqUTeS+FnPrekpmiC2lS+QcUx+qrf0wmFzodYfgC0nwhoYh9oegfdmLsmYXHj7JhV23erS7ZNYHyibGLiLtXsO19BoHSiwu6Ok09gwFg/gy8BO/STOkKFBk7EWh2YkLeh5Hy4Ws2B2w157iDvOpxw4UPRPRTSfL41FIsow7ZeXwUFF4dBQ1L96A/xLEFf1HMC/LxAt25PH+VN0HXH1gh2dEwdBoBGO0OKvW4L7hCdIvavBSsMIRVHCi0ArmZZl4wbYrz/yHSq1Ql9vQLylUEoE7GMal3OuxMG/7CO848N6n4HheK5iXZeIFmy88Nu+8aYJG24G3ziB+0Ee7wwqemlvQ5w9hcAJwyUDtpwBOFLeBeVkmXpB0qlK9RV2HlLsCsvUivHRhQwoQjhCkA1TgJX1OK0JVzIN5WSZesPZ44XKia+P5BqSS4aq+BzZXABLdhyQrsJPOqv4MVcEbMA/zsky8gLHyYO7hI9laecOZWuzLfYXU2zzSblmQerMZqjwTknOeY9dlIw5kVcrMG/8XpoQgCEkOhwNNJn5i7bFSrFDpsCrFEIPpLacr0WxpibYIQpS86/8pMBqNswnJ6XSivqHBv3R3pmbxzgwz4Z+EaTXtwqIogrzjxIJ4QVVV1UyihxgjFv3/K09Bu/lEkBgg5rLZH+fT5dvfn7iFAAAAAElFTkSuQmCC',	
	config:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC',
	qi:'data:image/png;base64,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',
	espionage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH2AQPDg46zUtbQgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAALGSURBVHjabVJbSJNhGH7+g9uc2zxsOreZS8ScEKmkICoUFkFBEkRE3WX3XXahXmoQBkXQdUU3YpdFhWBJetFNuc2keWg6dSd33v79O/7f32ewaHMvvHwv3/e8D+/7fA+Diujvu9Sgb1XO1arUNxKpVH0sGtn0Hh7MRUPBBfqcrcTzlRdFJvli35O7G43EcKbHBpkwZ4WU+Jpl1RlCxLeVeKZUjAxfa1JoJH0yIW5O3J9gCJFhdziwsryMbZcLRkurRAjZqTc0jG8717dKfWypELLhdzlR2uro7GTETBb+QADew0PkcznUN+phsli53v7z3RFvaKHqChkx1X7z9h149vbA8zxEMY0ahQIW62l0dCmh0dRh3f4D0UiY+Z+AKxV6g6ndaV8bSgtJBIIBqNRaMKSII78XYf8uXL9cUsB7sARIDyjcX6kFpqanW47P+cfjsvDzqZzbeSnH7XPyk4dX5Pln92RLq3kVVeKfBrMzM0ccpzGFRA7pZByhwB7iYT9ujVnx6oMbzW3WeDWCsm80mYzLju0CRmzbqNNqMfvGi0ReCVNHHzbdny5QSA3NQlUNdI3GcwZD/aS5s5f5+NmJ/ZgW3zaCaDaa4KTi7Wy6FSzDtsiy8gvlKJwg4Dh28eLl660bTjtiggxG1Yig3w+f1wM1FXRweBTZbGGAY0j/4ODQksfjFspWOGXt6gnQhkw2Q91HIBXzSMQj0Oqa0Dc4BIu5DTZbN5xr9qurK4vvactAGUFRKvBHwSAadI347XbB56sFkXkYze3ICGk41r4jHk8iEgqB51S6Eyvki0SZSiZGVbVqJhzyQSI1dFOZgjlkM7m/BsuIIuKxGNJpQVXIi4/KJkgnwpNU5N19SXoupASVIByAZTnIMqHTSSgWi9SdxwRRcCwpc2NlWKg9pijZV0ARoJkGozzOAlWW8Lx6S6msGyuB/wDcr0r2Xd/+igAAAABJRU5ErkJggg%3D%3D',
	pageDelete:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkhJREFUeNqUU0toU0EUPfN5n0RTI1ip6EoJpQtRBCu4qVQouFIJoVap4EKtuOsiuCriRgSxG63iRqRqBY1UXYggiliU6q4rP7hooBJJE4nUxr68N+Od13ylFbxw38zcmXvuuZ/Htl98/qPsBfGK0tBao1kYAwR9LMHzjuQbJeehrVmkcf4ycgD/kqmv8+2D4+/vxVx51PoLRJrIRp58yoFVoxoiivYHOzvgDmfw+0oSt47tHjhx9wNrc+WAFBw1DF6j7UqBqEUqZbhGJA/tJoVyoLAv0Y7xwe4jS7562JyqrG1ccuD02CCba1VldmrvVmxIT8Kn89JoEl6gkhFyU4y3AjiGVhXAiOIa2VIZo8mdodYkINwKt6BsBwETDQBbiDD/GoCJX1j0ME8aWulyV0cMFWHjlxvDxFgPPOm0psBW7AFZqS6MIhpZXLOenHvx043DFxZ4IwVGLFi41pVAXddCpM1B7lIaDzZbuH29FyUR0WWIsYDqUGcQdeRyG5uDc6qJa+Pz+XOwXk0idfY0UXWpEArTb96dyc19Z3WAt7NF87510rgA1q6Dd/MyUsdTQKkAXfTBKKU9OzrxaHZuSLJGsLDnrQB0MJNHiv2HgL7+BsOXGejHLyBZ1SPsPX2ZbkIw46gVOWmo+9egJq7SfCgiJsAtG4xWKfmyw+GuTav+C9n0CKbv3EB31xZYNLG+9jH1MY+iQkZalYXXiQvPesykaegVW+hH+9Cf+IbCzFN43A5TK1aCzMmZ7LAJv400jv+XvCH3R4ABADkKvfJiBGzqAAAAAElFTkSuQmCC',
	recycle:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB9gHCQ4fEVDlpB4AAAHrSURBVDjLpdPNSxRgEAbw366Crl9RyuqqWR5CKdPIMhKpW1B46RIdpI+DFdIl6BBJFAXlpW5dsj8ggm7RPRFFzIpqQ9O0UotaLdLI1F3toG0uFgQ9t2fmeWaYeecN+BuKZSlUL8c8iGNKt6i5lbL0VcaDjipxxbyYmC7VTidzg9pFnVgpT0sx14rY5o61SuWKmDIuYUG2MMhRJWhallwThiGYUqBCqzwlSZ7Q742rFpZ5hgxVjgnq+CVJLZCQL74snzTkkTav3DPu5fIeFg26vHIPAWGFChSDRQEblCpzwXu33NduiwablINZc34YE9biqVMGTKdLN63GORUOgWfO6FOvTxxEdYrqtFORCpeUOiJTSMBbA84HBS1apzo5xkZnBeVjMWW8uIQCB2QKgTItdqsMCqtRoDIpnPQYTaue94mYd24keZY1iuwKIE2zDiXqffVJl1o9xlLMdfLFbDai20ndInaYMOKFPQFQ47hye6WZk+dL0vjRoAdua3JdXETIqLhs83KM6NejbalAqZBGPYpsTek87K4PrtmuU0h2Mv7NpIfq9BpeuoMxM167KJE8md/I1pBihhE39S5dYtqKbv3Wq0SZGbNmzIoZMqpVnv3i8nw347Oo55p9XP5k/4R9GlU77L9QIPdP4Z/ddpK68WLt7gAAAABJRU5ErkJggg%3D%3D',
	loading:'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7',
	trade:'data:image/gif;base64,R0lGODlhEAAQANUmAICq1XSi0aHA4Iqx2GaYzIau15a53JC12muczqvH41+Uynqm04yy2X2o1Hek0mKWy6fE4m+ez2yczpy93rbO57fP556+33Gg0I+02rPM5pu83qrG44St1qTC4bDK5ZW43Ji63bTN5q7J5IOs1pK221ySyf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAQABAAAAZcQJNQWBoaj8PSAck0lRicZiWT6GhIA4CDSfFsBCBMoRGQIEMiiOXDGC0uTWNJG5c3kvWiMKCvmwgRfXElDwgBAAMGAglIJSUKgAsFBxMQTI6Fh4kCTY+CeZ95R0EAOw%3D%3D',
	combat:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHzSURBVHjajFJLSxtRFP7uTH6BdFECLhwJnQgGpYsuKyUtJRtTV/Gx68ZWV7rsX6ha0CG00qUP8BFBDISYoOBaaqGkNJ1xYTbdZCwY3Zh7PPdObGudiPNi5s53zv0eRxAR2h1d8VESkPAqK6ItSDUIuy07Qzv53zT9bo0edg5SO5yBOw4hIhrUvAMT2sDqGaGFuY8o7+fhVqvojEZhsZx7N2icXfAzgkS0DrvjF573mThvNEIZREKpK2+YOOl3YikG0MZr8X8KVjxDzuwiSgcFzL5fZI6X6O9/pJvWff9WIiESTJBaZeeKu+sgaerdAzbGfTxoMi1gZi4bAIwmvhx6gOTYQnQY17RvOMDX9NQbJF+kISWQeGwxkhfpL/vu+LCuEV32MDlOFhOT43rn+Q+fUd7b5vkzlRhU3Z+ondS4NhDhn/rKOGQdB+NvJ1UKQgOdmU8aUNzfRnIghdJeAZLpq1FGq1idid5eWFYMhd0ip0OIeJUloeikXw3pzqpdCw9qcoh6GpVY5aTUAbOt2MjlOJFVoT1wOZpcblNb5Ho/GGNqM4+946BIcDepJsLQ3xtbQfGtFGIPKvh69A0TU6/x7GmKCyRqtRP+I1n7KXy/jpdPLvHvVN0YJCXFbQ2KZY9RoIW0dpelBusj5H1f/hPHlQADAFcv+VoR+XzCAAAAAElFTkSuQmCC',
	survey:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAA0dJREFUOMuFk11rWwUAhp+zkyZN0vQkbdIkLU2/aNPZ0tjWomWjTt1gKltVREW9HOuFyi7c3a5FBG+FoeKFCIofiCKDiXZoaSfTQaWtS2la2jRJ89kk5+T7nJzjRdDtRnx+wMP7wvuKPMDMlSdpG5TML197qce30GvZuReu8ZgEu3X+C2EZUEEMQfv1s0Nd6bcvLg2NDCxmlWy28tXy5+8nZcVsb7MYB9nf9R/ifwluDDF7X2DqGHN6vItn36z39s+OV4XebS0zUaZgzlsUo3BSn/9y6DUj6B8wDaZWt/P6d0v+QM8q19fvC9o6eM51avLqbc9Ttk7zCJP5b/lm7VOKlZIwqgUt/QuLWF0jbG5ZJ/qnw5evvHPr7gd9ptobca0laFQKbvFow9zR+yhtko2roUu8mD6Hpmn0dPpwSk40XeDwcIpS39j5Vx5fn3P6u1f4IgKAeLFJrdujn3fNPuS8l3cTDHjxSN24nR4sFiuqLtBognqig71E2j6ghdVLn4RvXnYK+i81OLGaZyuzE78t5cLolRg5pRVNa4KmQ6MJVRW6XWYa3lOUfEPPXpszT5857W4l+GjRpB1EalL/uPR0xRcQC80AfT02mjqoTahqoOrQ1EGwShxEE52Bxp+Vha/TPy21o4vzdZ2jBGXfsHDBOzXYtZn1MRzwo+pQ01oStdmSmC0isZIDS3rN94R8uBwKWlLiZBFuaCizXvXhoVl/aLvQhd0zhtkstrrrrSqaDroBoqObWCwtect3Cxdulm+Jo8Bbz1ubB5GyfXjG9UzdJplSzSB+rwPNAI1WErmsk8zWSRxViMZrwrj1Ts/JdGbF9DEwvVEjE2UtuRvfHz0THf8+EsYhucjlFLKpHMpxDqopHEIGt73IXKiEtzQyGF5JnTYB7EcMPoPD+b3cr8Pn8uMz9hvsrKwjWRVmpBK+sSoOSxWrXsIoyTSOi+z9kUlFktVNE4ACfPiqpB1uyj8WsvHXHwnZbFPyLqqiGLW8rMrhQiUZU/LHqWpMztX2lWR9by9q/PZzlDXhn02/FzSjpDT31Aud7zr72yeK2fpBMVbdScTU3YRs7BdSemxD5ngLykDj3zc+eE0DmAE7YN2AsgZV/oe/AbOzjkrgkKWhAAAAInpUWHRTb2Z0d2FyZQAAeNpzTMlPSlXwzE1MTw1KTUypBAAvnAXUrgypTQAAAABJRU5ErkJggg%3D%3D',
	go:'data:image/gif;base64,R0lGODlhEAAQAKU9AK3NlKrLkWOfManKkPn792KeMfn8+DSJGKjLkEqRHJbBgPb69JfCgtnp1dzr2HGnP1eYKIm4a2KjRm+lPWmjOR57A4W2atTmzyiBA1ubKYGzWjOIFYCzYfP48Pf69l6fOqHHijeJGzOIC2WfMWujN1+hQ2iiNWilRkSPFm6kOeHu3pC8dKXIjXSrT3yvVZjCgyqCCrDOlkaQGWalSDyLEJ7FiFKXIqHGijeICYK1Z1ygPI66b4W2Zv///////////yH5BAEAAD8ALAAAAAAQABAAAAZJwJ9wSCwaj8ikcll8jJhCigaSnKRMBVegJUOSYoAAYgU64Y4CwC7C4+ReOowxM2DdahbGbHO0JVA0HwoSB0wiJSFQMBVQjY5QQQA7',
	viewPlanet:'data:image/png;base64,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',
	sendFleet:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAP2SURBVHjaYvz//z8DMsg/mmQLpHKB2BSIRYGYBYg/AvHJ///+T5tkO38HsnqAAGKEGQDUCFK4AIhDfGVd2AU5RRk+feNm+PaLgeHP3x8MfxheMux9vv3P3z9/d//58zdsrueKLyB9AAEENgComRXI3m8iom3tJuvI8OkHO8NPhl8Mdz4xMrD9Z2d4++0fw/8/vxg4Gb4xPP95mOHMszOX/vz+Y7csdMNHgABigrpkgZGwmrWNlAnDu7+/GH4zMTL8+cPE8P0PG1ALG8O7n+wMr35wMjz5yMogx2PGYCKhrvfr5+/lII0AAcT83vWRDZDuilbzYb7y9yvDc4bvDN///WH48oMHqJEV6BoGhttPPzN8/PqVgV3wLQMj/20GCxENhr3XTiktPrngIkAAgVxQ6C5lzvrqx1eGz0Cf/v0nwiD0V4Dh2htGhvefGRguPvzM8Iv9PQOL8mWG98JnGa7/fcZw7eUjhnBdJ2agK7IAAggUcKayfNIMF749Y3jNwcSgxazM8A9o0MNXvxh+/PjOwC/xn+GT0C6GO/8+MDD8/M8g8Ied4fbrnwwuCkYMv3/+0QUIIJABwlws3AwPgQa8+vmNgZdLieHDL16G9+//MfCL/mAQE/zG8PqvAYP0+WkMf4GufC2rwfDuAxcDDycvw+9ffwQAAogJGAuMjMCY/PXzE8P/b5IMLL//Mmw/8ZuBkYOT4fkdFobHj/gYpH5yMvz5/Z9BRkSTgf3OeYbfQJcxAGPvz58/jAABxPL3z793n359khZmFmDg5dBnePKaheHHb1YGyX9ZDPxcfxl+Pv3N8PnhHwZpIRUGTQlzhs9AV1x6so/h3Vd3BqDejwABxAKMz3MP3j2SVuGSZdjz4iiDAJcKAxuzLMOff78YXLXjGf7+/wcM2L/AcPnP8OzjYwZdGWuGL7++M1RvyAD6Xu06QAAxAf0xZd2Ng3/keUQZWL49Zfj49hiDoOBPhh/AhAPS/PDtbYb7b28x3H19jeHD97cMD9/dZTCQtWVQlTBm+Mx60QYggJjmea/cBYyObbuuHWSwlzZg4GfmZhDk+Qc0AJh8//5hEOeTY5Dgk2eQ5FdiYGXmZBDllWY49/gow/G7p74BkzkfQACBYgEYHb9jDty+cOTn91967oZ2DDdfsTBc/vOTYcHxHoZfQK+AXKMsosVgoeTGcPrhEYYDtw7+5Porp3mn7fZ3gACCZyaPqU68wPBY+ef3X9c460QWhr8SwIDmYmAEJmsR/k8MzduiGbQlLRgO3zrymfu/nNal1ltPQPoAAogRPTtbt5oHAnNc2t+//3T//f0nCBX++IH5isiffwys3//9ZX3V9v8PTD1AgAEAtq+8UF09hdsAAAAASUVORK5CYII%3D'
}



Imperion.init();
