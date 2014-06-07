// ==UserScript==
// @name        Ikariam ExMachina (LITE)
// @namespace   PhasmaExMachina
// @description A collection of mods and tools for Ikariam by PhasmaExMachina
// @author      PhasmaExMachina  - Updates by Isgard
// @website     http://userscripts.org/scripts/show/102840
// @version     0.1
//
// @include     http://*.ikariam.*/
// @include     http://*.ikariam.*/index.php
// @include     http://s*.ikariam.*/*
// @include     http://ikariam.dev/*
// @exclude   http://*.ikariam.*/board   
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require   http://userscripts.org/scripts/source/102839.user.js
// @require   http://userscripts.org/scripts/source/99735.user.js
// @require   http://userscripts.org/scripts/source/99733.user.js
// @require   http://userscripts.org/scripts/source/99734.user.js      
// 
// @history		0.1 Fisrt version
//
// ==/UserScript==

var startTime = new Date();

ScriptUpdater.check(102840, "0.1");

var isChrome = navigator.userAgent.match(/Chrome/i);

Config.prefix = document.domain;
Config.footerHtml = '';
Config.reloadOnSave = true;
Config.scriptName = "Ikariam ExMachina (LITE)";

var optionLanguage = {'Auto select':''};
for (var code in IkaTools.text)
{
  optionLanguage[IkaTools.text[code].name] = code;
}

Config.settings = {
	"Dummy":{
  	fields:{
  		language:{
  			type:'select',
  			label:'Language',
  			text:'language for this script',
  			options:optionLanguage,
  			value:'',
  		}
   }
  }
}

IkaTools.config.language = Config.get('language');
IkaTools.lang = IkaTools.getLanguage();

var optionLists = {};
optionLists[IkaTools.getText('optionsListValues', 'disabled', 'Disabled')] = 'none';
optionLists[IkaTools.getText('optionsListValues', 'dropdown', 'Dropdown')] = 'dropdown';
optionLists[IkaTools.getText('optionsListValues', 'bottom', 'Bottom')] = 'bottom';

Config.settings = {
	"General":{
    label: IkaTools.getText('optionsLabels', 'general', "General"),
  	fields:{
  		language:{
  			type:'select',
  			label:'Language',
  			text:'language for this script',
  			options:optionLanguage,
  			value:'',
  		},
  		externalArmyHelper:{
  			type:'checkbox',
  			label:'<a href="http://userscripts.org/scripts/show/94360" target="_blank" title="v0.31 by Dino.pl" style="font-weight:bold !important;">Army Helper</a>',
  			text:IkaTools.getText('optionsTexts', 'externalArmyHelper', 'show troop layout in deployment screens') + ' (by <a href="http://userscripts.org/users/grandag" target="_blank">GrAndAG</a>)',
  			value:true,
  		},
  		keyboardShortcuts:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'keyboardShortcuts', 'Keyboard Shortcuts'),
  			text:IkaTools.getText('optionsTexts', 'keyboardShortcuts', 'press 1 through # of cities to change city etc.'),
  			value:true,
  		},
  		resourceLinks:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'resourceLinks', 'Resource Links'),
  			text:IkaTools.getText('optionsTexts', 'resourceLinks', 'turn resource icons into links'),
  			value:true,
  		},
  		expandCargo:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'expandCargo', 'Expand Cargo'),
  			text:IkaTools.getText('optionsTexts', 'expandCargo', 'always show cargo in military movements'),
  			value:true,
  		},
  		messagePreviews:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'messagePreviews', 'Message Previews'),
  			text:IkaTools.getText('optionsTexts', 'messagePreviews', 'show first line of messages instead of subject'),
  			value:true,
  		},
  		allianceColor:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'allianceColor', 'Alliance Highlighter'),
  			text:IkaTools.getText('optionsTexts', 'allianceColor', 'lets you highlight alliences in different colors'),
  			value:true,
  		}
  	}
  },
  "Overviews":{
  	label: IkaTools.getText('optionsLabels', 'overviews', "Overviews"),
    fields:{
    		empireOverview:{
    			type:'select',
    			label:IkaTools.getText('optionsLabels', 'empireOverview', 'Empire'),
    			text:IkaTools.getText('optionsTexts', 'empireOverview', 'overview of empire'),
    			options:optionLists,
    			value:'dropdown',
    		},
    		buildingsOverview:{
    			type:'select',
    			label:IkaTools.getText('optionsLabels', 'buildingsOverview', 'Buildings'),
    			text:IkaTools.getText('optionsTexts', 'buildingsOverview', 'overview of buildings'),
    			options:optionLists,
    			value:'dropdown',
    		},
    		militaryOverview:{
    			type:'select',
    			label:IkaTools.getText('optionsLabels', 'militaryOverview', 'Military'),
    			text:IkaTools.getText('optionsTexts', 'militaryOverview', 'overview of your armies'),
    			options:optionLists,
    			value:'dropdown',
    		},
    		militaryOverviewOnlyOwned:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'militaryOverviewOnlyOwned', 'Military'),
    			text:IkaTools.getText('optionsTexts', 'militaryOverviewOnlyOwned', 'overview only Owned Cities'),
    			value:false,
    		},
    		targetsOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'targetsOverview', 'Espionage'),
    			text:IkaTools.getText('optionsTexts', 'targetsOverview', 'espionage overview under research advisor'),
    			value:true,
    		},
    		buildingList:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'buildingList', 'Building List'),
    			text:IkaTools.getText('optionsTexts', 'buildingList', 'add list of buildings to the show town button'),
    			value:true,
    		},
    		tradeOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'tradeOverview', 'Trade'),
    			text:IkaTools.getText('optionsTexts', 'tradeOverview', 'shows overview of all trade offers in trading post'),
    			value:true,
    		},
    		worldOverview:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'worldOverview', 'World Map'),
    			text:IkaTools.getText('optionsTexts', 'worldOverview', 'adds a world map button to show world map overview'),
    			value:true,
    		},
    		resourceDetails:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'resourceDetails', 'Resource Details'),
    			text:IkaTools.getText('optionsTexts', 'resourceDetails', 'show detailed resource information'),
    			value:true,
    		},
    		showBuildingLevels:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'showBuildingLevels', 'Building Levels'),
    			text:IkaTools.getText('optionsTexts', 'showBuildingLevels', 'show building levels in city view'),
    			value:true,
    		},
    		showBuildingNames:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'showBuildingNames', 'Building Names'),
    			text:IkaTools.getText('optionsTexts', 'showBuildingNames', 'show building names in city view'),
    			value:false,
    		},
    		splitPersonalities:{
    			type:'checkbox',
    			label:IkaTools.getText('optionsLabels', 'splitPersonalities', 'Split Personalities'),
    			text:IkaTools.getText('optionsTexts', 'splitPersonalities', 'split advisor links'),
    			value:true,
    		}
  	  }
  },
  "Pillaging":{
    label:IkaTools.getText('optionsLabels', 'pillaging', "Pillaging"),
  	html:'<p>'+IkaTools.getText('optionsTexts', 'pillaging', 'Tools to help with pillaging')+'</p>',
  	fields:{
  		islandShowSpies:{
  			type:'checkbox', 
  			label:IkaTools.getText('optionsLabels', 'islandShowSpies', 'Spy Icons'),
  			text:IkaTools.getText('optionsTexts', 'islandShowSpies', 'show spy icons next to the cities in which you have spies'),
  			value:true,
  		},
  		islandBlinkInactives:{
  			type:'checkbox', 
  			label:IkaTools.getText('optionsLabels', 'islandBlinkInactives', 'Blink Inactives'),
  			text:IkaTools.getText('optionsTexts', 'islandBlinkInactives', 'make names of inactive cities blink'),
  			value:true,
  		},
  		islandMarkLoners:{
  			type:'checkbox', 
  			label:IkaTools.getText('optionsLabels', 'islandMarkLoners', 'Mark Loners'),
  			text:IkaTools.getText('optionsTexts', 'islandMarkLoners', 'names of cities not in an alliance in red'),
  			value:true,
  		}
  	}
  },
  "Treaties":{
    label:IkaTools.getText('optionsLabels', 'treaties', "Treaties"),
		html:'<p>'+IkaTools.getText('optionsTexts', 'treaties', 'Select the locations where you would like to have CT icons displayed:')+'</p>',
		fields:{
			ctAlliance:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctAlliance', 'Alliance'),
				text:IkaTools.getText('optionsTexts', 'ctAlliance', 'show icons next players in alliance views'),
				value:true,
			},
			ctInbox:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctInbox', 'Inbox'),
				text:IkaTools.getText('optionsTexts', 'ctInbox', 'show icons next to messages in inbox'),
				value:true,
			},
			ctIslandView:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctIslandView', 'Island'),
				text:IkaTools.getText('optionsTexts', 'ctIslandView', 'show icons next to city names in island view'),
				value:true,
			},
			ctTradeTreaties:{
				type:'checkbox',
				label:IkaTools.getText('optionsLabels', 'ctTradeTreaties', 'Treaty'),
				text:IkaTools.getText('optionsTexts', 'ctTradeTreaties', 'show icons next players in treaty view'),
				value:true,
			}
		}
	},
  "About":{
    label:IkaTools.getText('optionsLabels', 'about', "About"),
  	html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">Ikariam ExMachina (LITE) v' + ScriptUpdater.scriptCurrentVersion +
  			'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a> - Updates by <a href="http://userscripts.org/users/118652" target="_blank">Isgard</a>' +
  			'<p>This is a collection of Ikariam tools by PhasmaExMachina - Updates by Isgard</p>',
  	fields:{
  		debugMode:{
  			type:'checkbox',
  			label:IkaTools.getText('optionsLabels', 'debugMode', 'Debug Mode'),
  			text:IkaTools.getText('optionsTexts', 'debugMode', 'show script execution time'),
  			value:false,
  		}
  	}
  }
};

IkaTools.config.debugMode = Config.get('debugMode');

unsafeWindow.ikaEmpireGoTo = IkaTools.goTo;

var ExMachina = {
	buttonMilitaryAdviser:document.querySelector('#advMilitary'),
	movementsUpdated:false,
	worldOverview:false,
	townOverview:false,
	buildingsOverview:false,
	expiredMovements:{},
	currentCityId: 0,
	currentIslandId: 0,
	init:function() 
	{
		if(document.querySelector('#loginForm') == null && document.body.id != 'errorLoggedOut' && document.querySelectorAll('#mainview').length == 1) 
		{	// in game
			var aux;
			
			IkaTools.init();
			IkaTools.buildingTypes.contains = function(p_val) 
			{
				return (this.indexOf(p_val) > -1);
			}
			
			this.currentCityId = IkaTools.getCurrentCityId();
			this.currentIslandId = IkaTools.getCurrentIslandId();

			// shortcuts
			if(Config.get('keyboardShortcuts')) {
				ExMachina.keyboardShortcutsListenerActive = true;
				function goToCityByIndex(i) {
					var options = document.querySelector('#citySelect').options;
					if(i <= options.length) {
						var city = IkaTools.getCityById(options[i].value);
						if(city) {
							if (IkaTools.getView().match(/^(plunder|sendSpy)$/))
								IkaTools.goTo(document.location.toString(), city.id); 
							else if (IkaTools.getView().match(/^(resource|tradegood)$/) && IkaTools.cityGetIslandId(city))
								IkaTools.goTo(document.location.toString().replace(/id=\d+/, 'id=' + IkaTools.cityGetIslandId(city)), city.id); 
							else if (IkaTools.getView() == 'worldmap_iso')
								IkaTools.goTo('/index.php?view=worldmap_iso', city.id); 
							else if (IkaTools.getView() == 'island') {
								var islandId = IkaTools.cityGetIslandId(city);
								if(islandId)
									IkaTools.goTo('/index.php?view=island&islandId=' + islandId + '&cityId=' + city.id, city.id);
								else 
									IkaTools.goTo('/index.php?view=city&id=' + city.id, city.id);
							} else {
								var building = IkaTools.cityGetBuildingByType(IkaTools.getView(), city);
								if (building) {
								
									IkaTools.goTo('/index.php?view=' + building.type + '&id=' + city.id + '&position=' + building.position, city.id);
								}
								else 
									IkaTools.goTo('/index.php?view=city&id=' + city.id, city.id);
							}
						}
					}
				}
				
				aux = $(document.querySelectorAll('input'));
				aux.focus(function() {
					ExMachina.keyboardShortcutsListenerActive = false;
				});
				aux.blur(function() {
					ExMachina.keyboardShortcutsListenerActive = true;
				});
				
				aux = $(document.querySelectorAll('textarea'));
				aux.focus(function() {
					ExMachina.keyboardShortcutsListenerActive = false;
				});
				aux.blur(function() {
					ExMachina.keyboardShortcutsListenerActive = true;
				});
				function goToBuilding(type) {
					var building = IkaTools.cityGetBuildingByType(type);
					if(building)
						document.location = '/index.php?view=' + type + '&id=' + ExMachina.currentCityId + '&position=' + building.position;
					else 
					{
						var cities = IkaTools.getCities();
						cities.forEach(function(city)
						{
							var building = IkaTools.cityGetBuildingByType(type, city);
							if(building)
								IkaTools.goTo('/index.php?view=' + type + '&id=' + building.cityId + '&position=' + building.position, city.id);
						});
					} 
				}
				$(window).keyup(function(event) {
					if (ExMachina.keyboardShortcutsListenerActive && !event.metaKey) {
						switch (event.which) {
							case 49: case 97: goToCityByIndex(0); break;
							case 50: case 98: goToCityByIndex(1); break;
							case 51: case 99: goToCityByIndex(2); break;
							case 52: case 100: goToCityByIndex(3); break;
							case 53: case 101: goToCityByIndex(4); break;
							case 54: case 102: goToCityByIndex(5); break;
							case 55: case 103: goToCityByIndex(6); break;
							case 56: case 104: goToCityByIndex(7); break;
							case 57: case 105: goToCityByIndex(8); break;
							case 48: case 96: goToCityByIndex(9); break;
							case 109: goToCityByIndex(10); break;
							case 65: goToBuilding('academy'); break; // A - go to academy
							case 66: goToBuilding('barracks'); break; // B - go to barracks
							case 72: goToBuilding('safehouse'); break; // H - go to hideout 
							case 84: goToBuilding('tavern'); break; // T - go to tavern
							case 77: goToBuilding('museum'); break; // M - go to museum
							case 76: goToBuilding('townHall'); break; // L - town hall
							case 80: goToBuilding('branchOffice'); break; // P - trade post
							case 69: goToBuilding('embassy'); break; // E - embassy
							case 70: 
								document.location = '/index.php?view=finances'; 
								break; // D - diplomatic advisor
							case 68: 
								document.location = '/index.php?view=diplomacyAdvisor'; 
								break; // D - diplomatic advisor
							case 192: 
								document.location = '/index.php?view=tradeAdvisor';
								break; // ` - town hall
							case 87:
								document.location = '/index.php?view=worldmap_iso'; 
								break; // W - go to warehouse
							case 67: // C - go to city view
								document.location = '/index.php?view=city&id=' + ExMachina.currentCityId; 
								break;
							case 73: // I - go to Island
								document.location = '/index.php?view=island&islandId=' + IkaTools.cityGetIslandId() + '&cityId=' + ExMachina.currentCityId; 
								break;
						}
					}			
				}); 
			}
			
			GM_addStyle('#avatarNotes .button2 { display:none !important; }\
			 #avatarNotes #messageBox { padding-top:5px !important; }\
			 #avatarNotes .ft { margin-top:-5px !important; } #yui-gen0 { bottom:5px !important; }');
			//------------------------------ Resource Links -----------------------------------
      if (Config.get('resourceLinks') || Config.get('resourceDetails'))
      {
  		  var rNav = IkaTools.querySelectorAsArray('#cityResources ul.resources li.population, #cityResources ul.resources li.wood, #cityResources ul.resources li.wine, #cityResources ul.resources li.marble, #cityResources ul.resources li.glass, #cityResources ul.resources li.sulfur', document);
  		}
			function resourceLinks() {
				if (rNav.length > 2) 
				{
					$(document.querySelector('#cityNav')).css('height', '10px');
  				rNav.forEach(function(item) 
  				{
  				  var resource = item.className;
						switch (resource) {
							case 'wood':
								var url = '/index.php?view=resource&type=resource&id=' + ExMachina.currentIslandId;
								break;
							case 'population':
								var url = "/index.php?view=townHall&id=" + ExMachina.currentCityId + "&position=0";
								break;
							default:
								var url = '/index.php?view=tradegood&type=tradegood&id=' + ExMachina.currentIslandId;
						}
						switch (resource) {
							case 'glass':
								var translated = 'crystal';
								break;
							case 'population':
								var translated = 'inhabitants';
								break;
							default:
								var translated = resource;
						}
						item.style.cursor = 'pointer';
						item.addEventListener('mouseover', function(){
							this.style.cursor = 'pointer';
							var target = IkaTools.querySelector('#value_' + translated, this); 
							if (target != null)
							{
  							target.style.whiteSpace = 'nowrap';
  							target.style.textShadow = '#666 2px 2px 2px';
  							target.style.color = '#000000';
  						}
						}, true);
						item.addEventListener('mouseout', function(){
							var target = IkaTools.querySelector('#value_' + translated, this); 
							if (target != null)
							{
  							target.style.textShadow = 'none';
  							target.style.color = 'inherit';
  						}
						}, true);
						item.addEventListener('click', function(){
							document.location = url;
						}, true);
					});
				}
			}
			if(Config.get('resourceLinks')) resourceLinks();
			//------------------------------ Resource Details -----------------------------------
			function resourceDetails() {
				GM_addStyle('#cityResources ul.resources li .tooltip td { padding:2px !important; width: auto !important; }\
					 		#cityResources ul.resources li div.capacity { border:1px inset #906646; height:3px; position:relative; top:-6px; '+IkaRTL.txtLeft+':1px; width:95%; }\
					 		#cityResources ul.resources li div.onhand { position:absolute; top:0; '+IkaRTL.txtLeft+':0; height:inherit; background-color:#a00; }\
					 		#cityResources ul.resources li div.safe { position:absolute; top:0;  height:inherit; background-color:#690; }\
				');
				rNav.forEach(function(item) 
				{
					if (item.className != 'population')
					{
  					var qty = $('span:eq(1)', item);
  					qty.css({'fontSize': '12px', 'position': 'relative', 'top': '-3px'});
  					var onHand = parseInt(qty.text().replace(/[^\d]/g, ''));
  					var tooltip = $(IkaTools.querySelector('.tooltip', item));
  					// get capacity
  					var capacity = tooltip.text().match(/((\d|,|\.)+k?).*$/i)[1];
  					var isThousands = /k$/g.test(capacity);
  					capacity = parseInt(capacity.replace(/[^\d]/g, ''));
  					capacity = isThousands ? capacity * 1000 : capacity;
  					var capacityPercent = Math.round(onHand / capacity * 100);
  					var change = IkaTools.cityGetResourceChange(item.className);
  					var ttHtml = '<table cellpadding="0" cellspacing="0" border="0">';
  					ttHtml += '<tr><td>'+IkaTools.getText('interface', 'Capacity', "Capacity")+': </td><td>' +  IkaTools.addCommas(capacity) + ' (' + capacityPercent + '%)</td></tr>';
  					// calculate qty safe
  					var numWarehouses = 0;
  					var warehouseLevels = 0;
  					var buildings = $.isArray(IkaTools.getCurrentCity().buildings) ? IkaTools.getCurrentCity().buildings : [];
  					
  					buildings.forEach(function(building)
  					{
  						if (building.type == 'warehouse') 
  						{
  							numWarehouses++;
  							warehouseLevels += parseInt(building.level);
  						}
  					});
  					
  					var qtyProtected = (warehouseLevels * 480) + 100;
  					var safe = onHand > qtyProtected ? qtyProtected : onHand;
  					var safePercent = safe > 0 ? Math.round(safe / onHand * 100) : 0;
  					var unsafe = qtyProtected > onHand ? 0 : onHand - qtyProtected;
  					var unsafePercent = Math.round(unsafe / onHand * 100);
  					if(onHand > 0)
  						ttHtml += '<tr><td>'+IkaTools.getText('interface', 'Safe', "Safe")+':  </td><td> ' + IkaTools.addCommas(safe) + ' (' + safePercent + '%)</td></tr>';
  					if (unsafe > 0) {
  						var lootableColor = unsafePercent > 50 ? ' style="color:#a00; font-weight:bold"' : '';
  						ttHtml += '<tr><td' + lootableColor + '>'+IkaTools.getText('interface', 'Lootable', "Lootable")+':  </td><td' + lootableColor + '> ' + IkaTools.addCommas(unsafe) + ' (' + unsafePercent + '%)</td></tr>';
  					}
  					if (change != 0) {
  						// display income
  						ttHtml += '<tr><td style="padding-top:.75em !important;">'+IkaTools.getText('interface', 'Income', "Income")+': </td><td style="padding-top:.75em !important;">' + (change > 0 ? '+' : '') + change + ' (' + (change > 0 ? '+' : '') + IkaTools.addCommas(change * 24) + ' / '+IkaTools.getText('interface', 'day', "day")+')</td></tr>';
  						// show time until full
  						var hoursTotal = change > 0 ? (capacity - onHand) / change : onHand / Math.abs(change);
  						var hours = Math.floor(hoursTotal);
  						var minutesTotal = hoursTotal * 60;
  						var secondsTotal = minutesTotal * 60;
  						var days = Math.floor(hoursTotal / 24);
  						var hours = Math.floor(hoursTotal % 24);
  						var minutes = Math.floor(minutesTotal % 60);
  						var fullColor = hoursTotal <= 24 ? ' style="color:#a00; font-weight:bold"' : '' ;
  						ttHtml += '<tr><td' + fullColor + '>' + (change > 0 ? IkaTools.getText('interface', 'Full', 'Full') : IkaTools.getText('interface', 'Empty', 'Empty')) + ':  </td><td' + fullColor + '>' + (days > 0 ? days + 'd ' : '') + (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'm ' : '') + '</td></tr>';
  					}
  					tooltip.html(ttHtml + '</table>');
  					tooltip.css('top', '30px');					
  					// bar
  					qty.after('<div class="capacity"><div class="onhand" style="opacity:' + (.9 * (capacityPercent / 100)) + '; width:' + capacityPercent + '%"> </div><div class="safe" style="width:' + (capacityPercent * (safePercent / 100)) + '%"> </div></div>');
				  }
				});
			}
			if(Config.get('resourceDetails')) resourceDetails();
			//------------------------------ Empire Overview ----------------------------------
			function empireOverview() {
				ExMachina.buttonWorldView = document.querySelector('#changeCityForm .viewWorldmap');
				
				if(Config.get('empireOverview') != 'bottom' && Config.get('empireOverview') != 'none' && ExMachina.buttonWorldView)
					ExMachina.buttonWorldView.addEventListener('mouseover', ExMachina.drawEmpireOverview, false);
				else if(Config.get('empireOverview') == 'bottom')
					$(document).ready(ExMachina.drawEmpireOverview);
			}
			if(Config.get('empireOverview') && Config.get('empireOverview') != 'none') empireOverview();
			//------------------------------ Buildings Overview ----------------------------------				
			function buildingsOverview() {
				ExMachina.buttonTownAdviser = document.querySelector('#advCities');
				if(Config.get('buildingsOverview') == 'dropdown')
					ExMachina.buttonTownAdviser.addEventListener('mouseover', ExMachina.drawBuildingOverview, false);
				else
					$(document).ready(ExMachina.drawBuildingOverview);
			}
			if(Config.get('buildingsOverview') && Config.get('buildingsOverview') != 'none') buildingsOverview();
				
			if(Config.get('buildingList') && document.querySelectorAll('#cityResources li').length > 2) {
				if(document.querySelector('#changeCityForm .viewCity') != null)
					ExMachina.buttonTownView = document.querySelector('#changeCityForm .viewCity');
				else
					ExMachina.buttonTownView = document.querySelector('#changeCityForm .viewRelatedCity');
				ExMachina.buttonTownView.addEventListener('mouseover', ExMachina.drawTownOverview, false);
			}
			
			function militaryView() {
				if (Config.get('militaryOverview') != 'bottom' && Config.get('militaryOverview') != 'none')
					ExMachina.buttonMilitaryAdviser.addEventListener('mouseover', ExMachina.drawMilitaryOverview, false);
				else
					ExMachina.drawMilitaryOverview();
			}
			if (Config.get('militaryOverview') && Config.get('militaryOverview') != 'none') $(document).ready(militaryView);

      Treaty.init();
			Pillage.init();
			if(Config.get('splitPersonalities')) SplitPersonalities.init();
			if(Config.get('allianceColor')) AllianceColor.init();
			if(Config.get('researchLibrarian') && (IkaTools.getView() == 'researchOverview' || IkaTools.getView() == 'researchDetail'))
				Librarian.init();
			
			//------------------------------ Process View --------------------------------------
			if (typeof(ExMachina.views[IkaTools.getView()]) == 'function') 
				ExMachina.views[IkaTools.getView()]();
			
			IkaTools.addOptionsLink("Ikariam ExMachina (LITE)");
			
			//------------------------------ External Scripts -----------------------------------
			function loadExternalScripts() {
				if(Config.get('externalArmyHelper')) ExternalScripts.ArmyHelper();
			}
			loadExternalScripts();
		} 
		else if (document.querySelectorAll('form#loginForm').length == 1) 	// login
			ExMachina.views.login(); 
		else if(document.body.id == 'errorLoggedOut')
			ExMachina.views.errorLoggedOut();
			
    if(Config.get('debugMode')) 
    {
      var d = new Date();
      var endTime = d.getTime();
      IkaTools.debug('ExMachina Total: ' + (endTime - startTime) + 'ms');
    }
	},
	updateMilitaryOverview:function() 
	{
		var top = {phalanx:'-3px', steamgiant:'0;', spearman:'-1px', swordsman:'-3px', slinger:'-1px', archer:'0', marksman:'1px', ram:'-6px', catapult:'-9px', mortar:'-8px', gyrocopter:'-8px', bombardier:'-12px', cook:'-3px', medic:'1px'};
		var cities = IkaTools.getCities();
		// get totals
		var totalUnits = {};
		var totalUnitsInTraining = {};
		var totalShips = {};
		var styleAdded = false;

		IkaTools.unitTypes.forEach(function(unitType)
		{
			totalUnits[unitType] = 0;
			totalUnitsInTraining[unitType] = 0;
			GM_addStyle('#empireMilitaryOverview th.' + unitType + ' { background-image:url(/skin/characters/military/x40_y40/y40_' + unitType + '_faceright.gif) !important; background-repeat:no-repeat; background-position:center ' + (typeof(top[unitType]) != 'undefined' ? top[unitType] : '-2px') + '; }');	
		});
		IkaTools.shipTypes.forEach(function(shipType)
		{
			totalShips[shipType] = 0;
			GM_addStyle('#empireMilitaryOverview th.ship_' + shipType + ' { background-image:url(/skin/characters/fleet/40x40/ship_' + shipType + '_r_40x40.gif) !important; background-repeat:no-repeat; background-position:center ' + (typeof(top[shipType]) != 'undefined' ? top[shipType] : '-2px') + '; }');	
		});

		cities.forEach(function(city)
		{
			IkaTools.unitTypes.forEach(function(unitType)
			{
			  totalUnits[unitType] += IkaTools.cityGetUnitQty(unitType, city); 
				if (city.owned)
				  totalUnitsInTraining[unitType] += IkaTools.cityGetUnitInTraining(unitType, city).qty; 
			});
			IkaTools.shipTypes.forEach(function(shipType)
			{
				totalShips[shipType] += IkaTools.cityGetShipQty(shipType, city); 
			});
		});

		var html = '<table cellspacing="0" cellpadding="0" border="0" style="margin:0; width:100%;">\
				<tr valign="middle" style="background-image:url(/skin/input/button.gif); height:14px;">\
					<th><strong>'+IkaTools.getText('interface', 'City', "City")+'</strong></th>';
		// get movements
		var movs = IkaTools.getMovements();
		var unitsInTrans = {};
		var shipsInTrans = {};
		var str = '';

		movs.forEach(function(mov)
		{
			switch(mov.mission) {
				case 'plunder': var cityId = mov.originId; break;
				case 'deployarmy': var cityId = mov.direction == 'left' ? mov.originId : mov.targetId; break;
				case 'defend': var cityId = mov.direction == 'left' ? mov.originId : mov.targetId; break;
				case 'deployfleet': var cityId = mov.direction == 'left' ? mov.originId : mov.targetId; break;
				default: var cityId = false;
			}
			if(cityId) 
			{
				unitsInTrans[cityId] = typeof(unitsInTrans[cityId]) == 'undefined' ? {} : unitsInTrans[cityId];
				shipsInTrans[cityId] = typeof(shipsInTrans[cityId]) == 'undefined' ? {} : shipsInTrans[cityId];
				
    		mov.units.forEach(function(unit)
    		{
					try { var type = unit.iconSrc.match(/y40_([^_]+)/)[1]; } catch(e) { var type = false; }
					if(type) {
						totalUnits[type] += parseInt(unit.qty);
						unitsInTrans[cityId][type] = typeof(unitsInTrans[cityId][type]) == 'undefined' ? 0 : unitsInTrans[cityId][type];
						unitsInTrans[cityId][type] += parseInt(unit.qty);   
					}
					try { var type = unit.iconSrc.match(/ship_([^_]+)/)[1]; } catch(e) { var type = false; }
					if(type && type != 'transport') {
						totalShips[type] += parseInt(unit.qty);
						shipsInTrans[cityId][type] = typeof(shipsInTrans[cityId][type]) == 'undefined' ? 0 : shipsInTrans[cityId][type];
						shipsInTrans[cityId][type] += parseInt(unit.qty);   
					}
				});
			}
		});
		
		IkaTools.unitTypes.forEach(function(unitType)
		{
      if (totalUnitsInTraining[unitType] || (totalUnits[unitType] > 0))
			  html += '<th class="' + unitType + '" title="'+IkaTools.getUnitName(unitType)+'"> </th>';	
		});	
		IkaTools.shipTypes.forEach(function(shipType)
		{
      if (totalShips[shipType] > 0)
        html += '<th class="ship_' + shipType + '" title="'+IkaTools.getShipName(shipType)+'"> </th>';	
		});
		html += '<th></th></tr>';
		
		var even = false;
		cities.forEach(function(city)
		{
			if (!Config.get('militaryOverviewOnlyOwned') || city.owned)
			{
    		even = !even;
    		var view = city.type ? 'relatedCities' : 'cityMilitary-army';
    		html += '<tr' + (even ? ' class="even"' : '') + '>\
    			<td style="width:230px;">';
    		html += '<a href="javascript:ikaEmpireGoTo(\'/index.php?view=' + view + '&id=' +  city.id + '\', ' +  city.id + ');" style="font-weight:' + (city.id == ExMachina.currentCityId ? 'bold' : 'normal') + ';">' + 
    				city.name + ' (' + city.level + ')</a></td>';
    		IkaTools.unitTypes.forEach(function(unitType)
    		{
    			if (totalUnitsInTraining[unitType] || (totalUnits[unitType] > 0)) 
    			{
    				var inTraining = (city.owned) ? IkaTools.cityGetUnitInTraining(unitType, city) : 0;
    				var inTransit = (typeof(unitsInTrans[city.id]) != 'undefined' && typeof(unitsInTrans[city.id][unitType]) != 'undefined') ? unitsInTrans[city.id][unitType] : false;
    				var qty = IkaTools.cityGetUnitQty(unitType, city);
    				html += '<td align="center">' + (qty > 0 ? qty : ((inTransit || inTraining.qty > 0) ? '' : '-')) + 
    							(inTransit ? ' <span title="' + inTransit + ' '+IkaTools.getText('interface', 'inTransitTo', "in transit towards")+' ' + IkaTools.cityGetSimpleName(city) + '" style="font-size:.8em !important;">(+' + inTransit + ')</span>' : '') +
    							(inTraining.qty > 0 ? ' <span title="' + inTraining.qty + ' '+IkaTools.getText('interface', 'trainingBarracks', "training in barracks")+'" style="font-size:.8em !important; cursor:help;">(+' + inTraining.qty + ')</span>' : '') +
    						'</td>';
    			}
    		});
    		IkaTools.shipTypes.forEach(function(shipType)
    		{
    			if (totalShips[shipType] > 0) 
    			{
    				var inTransit = (typeof(shipsInTrans[city.id]) != 'undefined' && typeof(shipsInTrans[city.id][shipType]) != 'undefined') ? shipsInTrans[city.id][shipType] : false;
    				var qty = IkaTools.cityGetShipQty(shipType, city);
    				html += '<td align="center">' + (qty > 0 ? qty : (inTransit ? '' : '-')) + (inTransit ? ' <span title="' + inTransit + ' '+IkaTools.getText('interface', 'inTransitTo', "in transit towards")+' ' + IkaTools.cityGetSimpleName(city) + '" style="font-size:.8em !important;">(+' + inTransit + ')</span>' : '') +'</td>';
    			}
    		});
    		html += '<td style="min-width: 120px;">';
    		if (city.id != ExMachina.currentCityId) {
    			html += '<a href="http://' + document.domain + '/index.php?view=deployment&deploymentType=fleet&destinationCityId=' +  city.id + '" title="'+IkaTools.getText('interface', 'StationFleets', "Station fleets")+'"><img src="http://' + document.domain + '/skin/actions/move_fleet.gif" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px; margin-'+IkaRTL.txtLeft+':5px;"/></a>\
    					<a href="http://' + document.domain + '/index.php?view=deployment&deploymentType=army&destinationCityId=' +  city.id + '" title="'+IkaTools.getText('interface', 'DeployTroops', "Deploy troops")+'"><img src="http://' + document.domain + '/skin/actions/move_army.gif" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px;"/></a>';
    		} else {
    			html += '<img src="http://' + document.domain + '/skin/actions/move_fleet.gif" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px; margin-'+IkaRTL.txtLeft+':5px; opacity:.3;"/>\
    					<img src="http://' + document.domain + '/skin/actions/move_army.gif" style="display:inline; float:'+IkaRTL.txtRight+'; height:14px; opacity:.3;"/>';
    		}
    		// island link
    		if(IkaTools.cityGetIslandId(city) > 0) {
    			html += '<img src="http://' + document.domain + '/skin/layout/icon-island.gif" style="cursor:pointer; height:16px; margin-'+IkaRTL.txtRight+':2px; float:'+IkaRTL.txtRight+';" name="index.php?view=island&cityId=' + city.id + '&islandId=' + city.islandId + '" title="'+IkaTools.getText('interface', 'ViewCityIsland', "View city on island")+'"/>';
    		}
    		
    		if (city.owned)
    		{
      		var barracks = IkaTools.cityGetBuildingByType('barracks', city);
      		var shipyard = IkaTools.cityGetBuildingByType('shipyard', city);
      		if(shipyard)
      			html += '<a title="'+IkaTools.getText('interface', 'GoToShiyard', "Go to shipyard")+' ('+IkaTools.getText('interface', 'level', "level")+' ' + shipyard.level + ')" href="javascript:ikaEmpireGoTo(\'/index.php?view=shipyard&position=' + shipyard.position + '&id=' + shipyard.cityId + '\', ' + shipyard.cityId + ');"/><img src="http://' + document.domain + '/skin/img/city/building_shipyard.gif" style="float:'+IkaRTL.txtRight+'; margin-'+IkaRTL.txtRight+':5px; height:14px;"/></a>';
      		if(barracks)
      			html += '<a title="'+IkaTools.getText('interface', 'GoToBarracks', "Go to barracks")+' ('+IkaTools.getText('interface', 'level', "level")+' ' + barracks.level + ')" href="javascript:ikaEmpireGoTo(\'/index.php?view=barracks&position=' + barracks.position + '&id=' + barracks.cityId + '\', ' + barracks.cityId + ');"/><img src="http://' + document.domain + '/skin/img/city/building_barracks.gif" style="float:'+IkaRTL.txtRight+'; margin-'+IkaRTL.txtRight+':5px; height:14px;"/></a>';
    		}
    		html += '</td></tr>';
    	}
		});			
		// draw totals
		html += '<tr style="background-color:#F7E4AF;"><td> </td>'
		IkaTools.unitTypes.forEach(function(unitType)
		{
			if(totalUnitsInTraining[unitType] || (typeof(totalUnits[unitType]) != 'undefined' && totalUnits[unitType] > 0)) {
				html += '<td style="text-align:center;">' + 
							totalUnits[unitType] +
							(totalUnitsInTraining[unitType] > 0 ? ' <span title="' + totalUnits[unitType] + ' + ' + totalUnitsInTraining[unitType] + ' '+IkaTools.getText('interface', 'training', "training")+' = ' + (totalUnits[unitType] + totalUnitsInTraining[unitType]) + ' '+IkaTools.getText('interface', 'total', "total")+'" style="font-size:.8em !important; cursor:help;">(+' + totalUnitsInTraining[unitType] + ')</span>' : '') +  
						'</td>';
			}
		});
		IkaTools.shipTypes.forEach(function(shipType)
		{
			if(typeof(totalShips[shipType]) != 'undefined' && totalShips[shipType] > 0) {
				html += '<td style="text-align:center;">' + totalShips[shipType] + '</td>';
			}
		});
		html += '<td></td></tr></table>';
		ExMachina.troopOverview.innerHTML = html;

		IkaTools.querySelectorAsArray('td a', ExMachina.troopOverview).forEach(function(item) {
			if(item.href.match(/\ikaEmpireGoTo/)) {
				var url = item.href.match(/ikaEmpireGoTo\(('|")(.+?)('|")/)[2];
				var cityId = item.href.match(/id=(\d+)/)[1];
				$(item).click(function() { IkaTools.goTo(url, cityId); });
				item.href = "javascript:void(0);";
			}
		});
		$(IkaTools.querySelectorAll('img[src*="icon-island"]', ExMachina.troopOverview)).click(function() { 
			IkaTools.goTo(this.name, this.name.match(/cityId=(\d+)/)[1]); 
		});
	},
	drawBuildingOverview:function() {
		// check for owned building types
		var ownedBuildings = [];
		var cities = IkaTools.getOwnedCities();		
		var numPorts = 0;
		var maxPorts = 0;
		var numWarehouses = 0;
		var maxWarehouses = 0;

		cities.forEach(function(city)
		{
  		numPorts = 0; 
  		numWarehouses = 0; 
  		city.buildings.forEach(function(building)
  		{
				if (building.type == 'port')
				{
				  numPorts++;
				  if (numPorts > maxPorts)
				  {
  				  maxPorts++;
  				  ownedBuildings.push(building.type);
  				}
			  }
			  else if (building.type == 'warehouse')
				{
				  numWarehouses++;
				  if (numWarehouses > maxWarehouses)
				  {
  				  maxWarehouses++;
  				  ownedBuildings.push(building.type);
  				}
			  }
			  else if (ownedBuildings.indexOf(building.type) == -1)
				{
				  ownedBuildings.push(building.type);
				}
			});
		});
		ownedBuildings.sort();		
		
		if(!IkaTools.buildingsOverview) {
			IkaTools.buildingsOverview = document.createElement('div');
			IkaTools.buildingsOverview.id = "ikaEmpireBuildingOverview";
			GM_addStyle('#ikaEmpireBuildingOverview{ display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-597px; position:relative; z-index:30000; }');
			GM_addStyle('#ikaEmpireBuildingOverview table tbody tr td a { padding:0 !important; height:auto !important; width:auto !important; background:none !important; }');
			GM_addStyle('#ikaEmpireBuildingOverview a { height:auto; width:auto; } #ikaEmpireBuildingOverview table tbody tr td a:hover { text-decoration:underline !important; }');
						
			IkaTools.buildingsOverview.style.display = 'block'; 
			var table = document.createElement('table');
			table.style.width = "100%";
			var html = '<tr valign="middle" style="background-image:url(/skin/input/button.gif);"><td><div style="width:80px; padding-'+IkaRTL.txtLeft+':1em;"></div></td>';
			ownedBuildings.forEach(function(buildingType)
			{
				html += '<td style="text-align:center; padding:0 .05em;" title="';
				html += IkaTools.getText('buildings', buildingType);
				html += '"><img src="http://' + document.domain + '/skin/img/city/building_';
				html += buildingType == 'townHall' ? 'townhall' : buildingType;
				html += '.gif" style="max-height:21px; max-width:28px; margin-top:5px;"/></td>\</td>';
			});
			html += '</tr>';
			// draw buildings in each town
			cities.forEach(function(city, i)
			{
				var construction = IkaTools.cityGetBuildBuilding(city);
				// city name
				html += '<tr style="border-top:1px dotted #9D836A; background-color:' + (i % 2 != 0 ? "#FDF7DD" : "inherit") +
				        '" valign="middle"><td style="padding:.5em;"><a href="javascript:ikaEmpireGoTo(\'http://' + document.domain + 
				        '/index.php?view=city&id=' + city.id + '\', '+ city.id + ')"';
				if(ExMachina.currentCityId == city.id) 
					html += ' style="font-weight:bold;"';
				html += '>' + city.name + ' (' + city.level + ')</a></td>';
				// buildings
    		numPorts = 0; 
    		numWarehouses = 0; 
				ownedBuildings.forEach(function(buildingType)
				{
  				if (buildingType == 'port')
  				{
						var building = IkaTools.cityGetBuildingByType(buildingType, city, numPorts);
  				  numPorts++;
  				}
  			  else if (buildingType == 'warehouse')
  				{
						var building = IkaTools.cityGetBuildingByType(buildingType, city, numWarehouses);
  				  numWarehouses++;
  				}
  			  else
  			  {
						var building = IkaTools.cityGetBuildingByType(buildingType, city);
  			  }
					html += '<td name="c_' + building.cityId + '_p_' + building.position + '" style="text-align:center; border-'+IkaRTL.txtLeft+':1px dotted #9D836A;">';
					if(building) {
						var isUnderConstruction = construction && construction.position.toString() == building.position.toString();
						html += '<a href="javascript:ikaEmpireGoTo(\'http://' + document.domain + 
						        '/index.php?view=' + building.type + '&position=' + building.position + '&id=' + building.cityId + '\', ' + building.cityId + ');"';
						if(isUnderConstruction) 
							html += ' style="font-weight:bold; color:#000; font-size:1em;"';
						else if(IkaTools.buildingIsMaxed(building)) 
							html += ' style="color:#008;"';
						else if(IkaTools.buildingGetResourceMissingTotal(building) == 0) 
							html += ' style="font-weight:bold; color:#090;"';
						else
							html += ' style="color:#542C0F;"';
						html += '">' + building.level;
						if(isUnderConstruction)
							html += '<span style="padding:0 1px;"> » </span>' + (parseInt(building.level) + 1);
						html += '</a>';
					} else
						html += '-';
					html += '</td>';
				});
				html += '</tr>';
			});  
			table.innerHTML = html;
			IkaTools.buildingsOverview.appendChild(table);
			if(Config.get('buildingsOverview') == 'dropdown') {
				ExMachina.buttonTownAdviser.appendChild(IkaTools.buildingsOverview);
				ExMachina.buttonTownAdviser.addEventListener('mouseout', function() { document.querySelector('#ikaEmpireBuildingOverview').style.display = 'none'; }, true);
				//ExMachina.buttonTownAdviser.addEventListener('mouseover', function() { document.querySelector('#cityNav').style.height = "100px"; }, true);
				//ExMachina.buttonTownAdviser.addEventListener('mouseout', function() { document.querySelector('#cityNav').style.height = "10px"; }, true);
			} else {
				$('#container').append(IkaTools.buildingsOverview);
				$(IkaTools.buildingsOverview).css('margin-'+IkaRTL.txtLeft+'', '10px');
				$(IkaTools.buildingsOverview).css('margin-top', '1em');
				$(IkaTools.buildingsOverview).css('z-index', '0');
			}

			IkaTools.querySelectorAsArray('#ikaEmpireBuildingOverview td a', document).forEach(function(item) {
				if(/\ikaEmpireGoTo/.test(item.href)) {
					var url = item.href.match(/ikaEmpireGoTo\(('|")(.+?)('|")/)[2];
					var cityId = item.href.match(/id=(\d+)/)[1];
					$(item).click(function() { IkaTools.goTo(url, cityId); });
					item.href = "javascript:void(0);";
				}
			});
			// resource tooltip

			$('body').append('<div id="buildingOverviewTooltip" style="text-align:'+IkaRTL.txtLeft+'; z-index:40000; background:#FFFBDB; padding:5px 8px; font-size:11px; border:1px solid #542C0F; -webkit-border-radius: 5px; -moz-border-radius: 5px; position:absolute; top:0; '+IkaRTL.txtLeft+':0; display:none;">h </div>');
			
		  var ttp = document.querySelector('#buildingOverviewTooltip');
			$('td', IkaTools.buildingsOverview).mouseout(function(event) {
				ttp.style.display = 'none';
			});
			$('td', IkaTools.buildingsOverview).mousemove(function(event) {
				ttp.style[IkaRTL.txtLeft] =  event.pageX + 10 + 'px';
				ttp.style.top =  event.pageY + 20 + 'px';
			});
			$('td', IkaTools.buildingsOverview).mouseover(function() {
				try {
					var matches = $(this).attr('name').match(/c_(\d+)_p_(\d+)/);
					var building = IkaTools.cityGetBuildingByPosition(parseInt(matches[2]), IkaTools.getCityById(parseInt(matches[1])));
					if(building && !IkaTools.buildingIsMaxed(building)) {
						var hasResources = (IkaTools.buildingGetResourceMissingTotal(building) == 0);
						var html = '<p style="margin-bottom:.5em;' + (hasResources ? ' color:#009900; font-weight:bold;' : '') + '">' + building.name + ' (' + (parseInt(building.level) + 1) + ')</p>';
						var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
						var txt = '';
						resourceNames.forEach(function(resourceName)
						{
							if(hasResources) {
								var required = IkaTools.buildingGetResourceRequired(resourceName, building);
								if (required > 0)
									txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceName + '.gif" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(required) + '</span></nobr> ';
							} else {
								var missing = IkaTools.buildingGetResourceMissing(resourceName, building);
								if (missing > 0)
									txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceName + '.gif" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(missing) + '</span></nobr> ';
							}										 													 
						});
						txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_time.gif" style="height:14px; margin-'+IkaRTL.txtLeft+':5px; margin-top:-2px; vertical-align:middle;"/> <span style="font-size:.8em;">' + building.resources.time + '</span></nobr> ';
						$(ttp).html(html + '<div>' + (txt != '' ? txt : '???') + '</div>');
						ttp.style.display = 'block';
					}								
				} catch(e) { }
			});
		}
		document.querySelector('#ikaEmpireBuildingOverview').style.display = 'block';
	},
	drawEmpireOverview:function() {
		if(!ExMachina.worldOverview) {

			GM_addStyle('#ikaEmpireOverview tr.ikaEmpireOverviewRow {border-top:1px dotted #9D836A;}\
			             #ikaEmpireOverview tr.ikaEmpireOverviewRowUneven {border-top:1px dotted #9D836A; background-color: #FDF7DD}\
			             #ikaEmpireOverview td.ikaEmpireOverviewCell {border-'+IkaRTL.txtRight+':1px dotted #9D836A;}\
			             #ikaEmpireOverview a.cityLink {display:block; cursor:pointer; height:auto; background:none; width:auto; padding:.8em 1em; text-decoration:none;}\
			             #ikaEmpireOverview a.cityLink:hover { text-decoration:underline !important;}\
			             #ikaEmpireOverview a.resourceLinkFull {color:#ee0000; font-weight:bold;}\
			             #ikaEmpireOverview td.constructionHolder {border-'+IkaRTL.txtRight+':1px dotted #9D836A; font-size:.9em; text-align:center;}\
			             #ikaEmpireOverview td.ikaEmpireOverviewResource {text-align:center; font-size:.9em; padding:0 .2em; border-'+IkaRTL.txtRight+':1px dotted #9D836A;}\
			             #ikaEmpireOverview td.ikaEmpireOverviewResource span {font-size:.8em; padding-'+IkaRTL.txtLeft+':.4em;}\
			             #ikaEmpireOverview td.ikaEmpireOverviewResource a {display:inline; padding:0; width:auto; height:auto; background:none;}\
			             #ikaEmpireOverview a.resourceLinkFull {color:#ee0000; font-weight:bold;}\
			             #ikaEmpireOverview div.ikaEmpireOverviewUsedBar {border:1px outset #FEE8C8; width:50px; height:2px; margin:auto; margin-top:5px;}\
			             #ikaEmpireOverview div.ikaEmpireOverviewUsedBar div {background-color:#aa0000; line-height:2px; height:2px;}\
			             #ikaEmpireOverview img.ikaEmpireOverviewShipIcon {float:'+IkaRTL.txtRight+'; height:14px; margin:1px 10px 0 0;}\
			             #ikaEmpireOverview img.ikaEmpireOverviewResourceIcon {float:'+IkaRTL.txtRight+'; height:14px; margin:1px 4px 0 0; cursor:pointer;}\
			             #ikaEmpireOverview img.ikaEmpireOverviewIslandIcon {cursor:pointer; height:16px; margin-'+IkaRTL.txtRight+':2px; float:'+IkaRTL.txtRight+';}\
			             #ikaEmpireOverview tr.ikaEmpireOverviewTotalRow {border-top:1px dotted #9D836A; height:2em; background-color:#F7E4AF;}\
			             #ikaEmpireOverview tr.ikaEmpireOverviewTotalRow td {text-align:center; font-size:.9em; padding:.5em .2em; border-'+IkaRTL.txtRight+':1px dotted #9D836A;}');

			var cities = IkaTools.getOwnedCities();
			ExMachina.worldOverview = document.createElement('div');
			ExMachina.worldOverview.id = "buildingLinksWorldLinks";
			ExMachina.worldOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-320px; position:relative;'); 

				var table = document.createElement('table');
				ExMachina.worldOverview.appendChild(table);
				table.id="ikaEmpireOverview";
				table.style.width = "100%";
				table.innerHTML = '<tr valign="bottom" style="background-image:url(/skin/input/button.gif)"><td><div style="width:80px; padding-'+IkaRTL.txtLeft+':1em;"></div></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/img/city/constructionSite.gif" style="height:12px; margin-top:5px;" title="'+IkaTools.getText('interface', 'UnderConstrution', 'Building under construction')+'"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_citizen.gif" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_wood.gif" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_wine.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_marble.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_glass.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/resources/icon_sulfur.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="http://' + document.domain + '/skin/layout/bulb-on.gif" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><a href="http://' + document.domain + '/index.php?view=finances" style="background:none; padding:0; display:inline; height:auto; width:auto;"><img src="http://' + document.domain + '/skin/resources/icon_gold.gif" style="height:12px; margin-top:5px;"/></a></td>\
								<td></td></tr>';
				var resourceTotals = {gold:0, population:0, wood:0, wine:0, marble:0, glass:0, sulfur:0, research:0};
				var resourceChangeTotals = {gold:0, population:0, wood:0, wine:0, marble:0, glass:0, sulfur:0, research:0};
        var resourceNames = ["population", "wood", "wine", "marble", "glass", "sulfur", "research", "gold"];

				cities.forEach(function(city, i)
				{
					if(!city.type || /tradegood/.test(city.type)) {
						var isCurrent = city.id == ExMachina.currentCityId;
						var tr = document.createElement('tr');
						table.appendChild(tr);
						tr.className = "ikaEmpireOverviewRow" + (i % 2 != 0 ? "Uneven" : "");
							var td = document.createElement('td');
							td.className = "ikaEmpireOverviewCell";
							var a = document.createElement('a');
							a.className="cityLink";
							if (isCurrent)
							{
							  a.style.fontWeight = "bold";
						  }
							a.innerHTML = city.name + ' (' + (IkaTools.cityGetLevel(city) > 0 ? IkaTools.cityGetLevel(city) : '?') + ')'; // + ' (' + city.level + ')';
							a.rev = "/index.php?view=city&id=" + city.id; 
							a.name = city.id;
							a.addEventListener('click', function() {											
								IkaTools.goTo(this.rev, this.name);			
								return false;
							}, true);
							td.appendChild(a);	
							ExMachina.appendBuildingList(city.id, td, '100px', '-2.7em');
							tr.appendChild(td);
							// construction
							var construction = document.createElement('td');
							construction.className = 'constructionHolder';
							construction.id = 'ikaEmpireLinksBuildTime' + city.id;
							tr.appendChild(construction);
							// resources
							resourceNames.forEach(function(type)
							{
								var rTD = document.createElement('td');
									rTD.className = "ikaEmpireOverviewResource";
									var text = IkaTools.addCommas(IkaTools.cityGetResource(type, city));
									if(type != 'gold') {
										var change = IkaTools.cityGetResourceChange(type, city);
										resourceChangeTotals[type] += change;
										text += (change != 0 ?  '<span>(' + (change > 0 ? '+' : '') + change + ')</span>' : '');	
									}
								  else
								  {
								    var change = IkaTools.cityGetResource('gold', city);
								  }
									switch(type) {
										case 'population':
											var full = IkaTools.cityGetResourceMax(type, city) == IkaTools.cityGetResource(type, city) ? 'class="resourceLinkFull"' : '';
											rTD.innerHTML += '<a '+full+' href="http://' + document.domain + '/index.php?view=townHall&position=0&id=' + city.id + '" name="' + city.id +'">' + text + '</a>';	
											break;
										case 'gold':
											rTD.innerHTML += '<a href="http://' + document.domain + '/index.php?view=finances" name="' + city.id +'">' + 
																			((type == 'gold' && IkaTools.cityGetResource(type, city) > 0) ? '+' : '') +
																			IkaTools.addCommas(IkaTools.cityGetResource(type, city)) + '</a>';	
											break;
										case 'research':
											change = IkaTools.cityGetBuildingByType(city, 'academy') ? change : 0;
											if(IkaTools.cityGetBuildingByType(city, 'academy'))
												rTD.innerHTML += '<a href="http://' + document.domain + '/index.php?view=academy&position=' + IkaTools.cityGetBuildingByType(city, 'academy').position + '&id=' + city.id + '" name="' + city.id +'">' + (change > 0 ? change : '-');
											else
												rTD.innerHTML += (change > 0 ? change : '-');
											break;
										case 'wood':
											rTD.innerHTML += '<a href="http://' + document.domain + '/index.php?view=resource&type=resource&id=' + IkaTools.cityGetIslandId(city) + '" name="' + city.id +'">' + text + '</a>';	
											break;
										default:
											rTD.innerHTML += type.toString() != IkaTools.cityGetTradegoodType(city).toString() ? text : '<a href="http://' + document.domain + '/index.php?view=tradegood&type=tradegood&id=' + IkaTools.cityGetIslandId(city) + '" name="' + city.id +'">' + text + '</a>';	;
									}
									$(rTD).click(function(event) {
										event.preventDefault();
										var a = $('a', this);
										if(a.size() > 0) {
											a = a[0];
											var cityId = a.name;
											IkaTools.goTo(a.href, cityId);
										}
									});
									resourceTotals[type] += IkaTools.cityGetResource(type, city);		
									if(type != "gold") {
										var onHand = IkaTools.cityGetResource(type, city);
										if(type == 'research') {
											var percentUsed = Math.floor(IkaTools.cityGetResourceChange(type, city) / IkaTools.cityGetResourceMax(type, city) * 100);
										} else {
											var percentUsed = Math.floor(IkaTools.cityGetResource(type, city) / IkaTools.cityGetResourceMax(type, city) * 100);
										}
										percentUsed = percentUsed > 100 ? 100 : percentUsed;
										var capacity = IkaTools.cityGetResourceMax(type, city);
										rTD.title = IkaTools.getText('interface', 'Capacity', 'Capacity')+': ' +  IkaTools.addCommas(capacity) + ' (' + percentUsed + '%)';
										
										
										if(type == 'wine') {
											rTD.title += " - Wine consumption: " + IkaTools.cityGetWineConsumption(city) + " per hour";
										}
										rTD.innerHTML += '<div class="ikaEmpireOverviewUsedBar" style="">' +
																		   '<div style="width:' + percentUsed + '%; opacity:' + (percentUsed < 100 ? '.' + percentUsed : '1')+ ';"> </div>' +
																		 '</div>';
									}
									rTD.title += change != 0 ? " (" + (change > 0 ? '+' : '') + IkaTools.addCommas(change * 24) + " / "+IkaTools.getText('interface', 'day', 'day')+")" : '';
									// show time until full
									if (type != 'gold' && type != 'research') {
										var hoursTotal = change > 0 ? (capacity - onHand) / change : onHand / Math.abs(change);
										var hours = Math.floor(hoursTotal);
										var minutesTotal = hoursTotal * 60;
										var secondsTotal = minutesTotal * 60;
										var days = Math.floor(hoursTotal / 24);
										var hours = Math.floor(hoursTotal % 24);
										var minutes = Math.floor(minutesTotal % 60);
										var untilFullText = (days > 0 ? days + 'd ' : '') + (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'm ' : '');
										rTD.title += (change != 0 ? ' ' + (change > 0 ? IkaTools.getText('interface', 'Full', 'Full in')+' ' : IkaTools.getText('interface', 'Empty', 'Empty in')+' ') + untilFullText : '');
										// mark as red if full in less than a day
										if (hoursTotal <= 48) {
											$(rTD).css('color', '#700');
											$('*', rTD).css('color', '#700');
										}
										if (hoursTotal <= 24) {
											$(rTD).css('color', '#a00');
											$('*', rTD).css('color', '#a00');
											$(rTD).css('font-weight', 'bold');
											$('*', rTD).css('font-weight', 'bold');
										}
										if (hoursTotal <= 2) {
											$(rTD).css('font-size', '12px');
											$('*', rTD).css('font-size', '12px');
										}
									}
								tr.appendChild(rTD);	
							});	
							var td2 = document.createElement('td');
							var style = !isCurrent ? ' cursor:pointer;' : ' opacity:0.3';
							var ship = document.createElement('img');
							ship.src = "/skin/actions/transport.gif";
							ship.className = "ikaEmpireOverviewShipIcon"
							ship.setAttribute('style', style);
							if(!isCurrent) { 
								ship.title = IkaTools.getText('interface', 'TransportResources', 'Transport resources to') + " " + city.name.replace(/\ /g, ' ');
								ship.name = city.id;
								ship.addEventListener('click', function() { document.location = "/index.php?view=transport&destinationCityId=" + this.name; }, true); 
							}
							td2.appendChild(ship);
							if(IkaTools.cityGetIslandId(city) > 0 && IkaTools.cityGetTradegoodType(city)) {
								var tradegood = document.createElement('img');
									tradegood.src = "/skin/resources/icon_" + IkaTools.cityGetTradegoodType(city) + ".gif";
									tradegood.className = "ikaEmpireOverviewResourceIcon";
									tradegood.title = IkaTools.getText('interface', 'Level', 'Level') + " " + (IkaTools.cityGetTradegoodLevel(city) > 0 ? IkaTools.cityGetTradegoodLevel(city) : '?');
									tradegood.name = city.id;
									tradegood.addEventListener('click', function() { IkaTools.goTo("/index.php?view=tradegood&type=tradegood&id=" + IkaTools.cityGetIslandId(IkaTools.getCityById(this.name)), this.name); }, true); 
								td2.appendChild(tradegood);	
							}
							if(IkaTools.cityGetIslandId(city) > 0) {
								var wood = document.createElement('img');
									wood.src = "/skin/resources/icon_wood.gif";
									wood.className = "ikaEmpireOverviewResourceIcon";
									wood.title = IkaTools.getText('interface', 'Level', 'Level') + " " + (IkaTools.cityGetSawmillLevel(city) > 0 ? IkaTools.cityGetSawmillLevel(city) : '?');
									wood.name = city.id;
									wood.addEventListener('click', function() { IkaTools.goTo("/index.php?view=resource&type=resource&id=" + IkaTools.cityGetIslandId(IkaTools.getCityById(this.name)), this.name); }, true); 
								td2.appendChild(wood);
							}
							// island link
							if(IkaTools.cityGetIslandId(city) > 0) {
								$(td2).append('<img class="ikaEmpireOverviewIslandIcon" src="http://' + document.domain + '/skin/layout/icon-island.gif" name="index.php?view=island&cityId=' + city.id + '&islandId=' + city.islandId + '" title="'+IkaTools.getText('interface', 'ViewCityIsland', 'View city on island')+'"/>');
								$(IkaTools.querySelectorAll('img[src*="icon-island"]', td2)).click(function() { IkaTools.goTo(this.name, this.name.match(/cityId=(\d+)/)[1]); });
							}
							tr.appendChild(td2);
					}
				});
				
				var trTotals = document.createElement('tr');
				trTotals.className = "ikaEmpireOverviewTotalRow";
				trTotals.appendChild(document.createElement('td'));
				trTotals.appendChild(document.createElement('td'));
				trTotals.vAlign = "top";
				resourceNames.forEach(function(type)
				{
					var rtTd = document.createElement('td');
					if (type == 'research') {
						rtTd.innerHTML = '+' + IkaTools.addCommas(resourceChangeTotals['research']);
					} else if(type == 'gold') {
						rtTd.id = 'empireOverviewfinanceTotal';
						
					} else {
						rtTd.innerHTML = (type == 'gold' && resourceTotals[type] > 0) ? '+' : '';
						rtTd.innerHTML += IkaTools.addCommas(resourceTotals[type]);	
						rtTd.innerHTML += resourceChangeTotals[type] != 0 ? '<div style="font-size:.8em; margin-top:2px;">(' + (resourceChangeTotals[type] > 0 ? '+' : '') + IkaTools.addCommas(resourceChangeTotals[type]) + ')</div>' : '';
					}
					rtTd.title = resourceChangeTotals[type] != 0 ? "(" + (resourceChangeTotals[type] > 0 ? '+' : '') + IkaTools.addCommas(resourceChangeTotals[type] * 24) + " / "+IkaTools.getText('interface', 'day', 'day')+")" : "";
					trTotals.appendChild(rtTd);
				});
				trTotals.appendChild(document.createElement('td'));
				table.appendChild(trTotals);	
				
			if (Config.get('empireOverview') == 'dropdown') {
				ExMachina.buttonWorldView.appendChild(ExMachina.worldOverview);
				ExMachina.buttonWorldView.addEventListener('mouseout', function() {
					document.querySelector('#buildingLinksWorldLinks').style.display = 'none';
          if (!!ExMachina.buildTimers)
          {
            clearTimeout(ExMachina.buildTimers);
          }
				}, true);
/*			ExMachina.buttonWorldView.addEventListener('mouseover', function() {
					document.querySelector('#cityNav').style.height = "100px";
				}, true);
				ExMachina.buttonWorldView.addEventListener('mouseout', function() {
					document.querySelector('#cityNav').style.height = "10px";
				}, true);*/
			} else {
				$(document.querySelector('#container')).append(ExMachina.worldOverview);
				$(document.querySelector('#buildingLinksWorldLinks')).css('margin-'+IkaRTL.txtLeft+'', '10px');	
				$(document.querySelector('#buildingLinksWorldLinks')).css('margin-bottom', '1em');	
			}
			// update finances
			function updateFinances() {
				var total = IkaTools.getTotalIncome() - IkaTools.getTotalUpkeep();
				var itm = $(document.querySelector('#empireOverviewfinanceTotal'));
				itm.html('<a href="http://' + document.domain + '/index.php?view=finances" style="display:inline; height:auto; line-height:auto; background:none;">' + (total > 0 ? '+' : '') + IkaTools.addCommas(total) + '</a>');
				itm.css('color', total < 0 ? '#a00' : '');
				itm.css('font-weight', total < 0 ? 'bold' : '');
				itm.attr('title', IkaTools.addCommas(IkaTools.getTotalIncome()) + ' - ' + IkaTools.addCommas(IkaTools.getTotalUpkeep()) + ' '+IkaTools.getText('interface', 'upkeep', 'upkeep')+' (' + (total > 0 ? '+' : '') + IkaTools.addCommas(total * 24) + ' / '+IkaTools.getText('interface', 'day', 'day')+')');
			}
			if(Config.get('empireOverview') == 'dropdown')
				updateFinances();
		}
		document.querySelector('#buildingLinksWorldLinks').style.display = 'block';
		ExMachina.updateBuildTimers();
	},
	drawMilitaryOverview:function() {
		if (!document.querySelector('#empireMilitaryOverview')) {
			GM_addStyle('#empireMilitaryOverview a { display:inline !important; width:auto; }\
					#empireMilitaryOverview * { font-size:12px !important; }\
					#empireMilitaryOverview th, #empireMilitaryOverview td { padding:5px !important; border-bottom:1px dotted #9D836A !important; }\
					#empireMilitaryOverview tr.even { background-color:#FDF7DD !important; } \
					#empireMilitaryOverview th { line-height:14px !important; }\
					#empireMilitaryOverview td { border-'+IkaRTL.txtLeft+':1px dotted #9D836A !important; }');
			IkaTools.troopOverview = true;		
			ExMachina.troopOverview = document.createElement('div');
			ExMachina.troopOverview.id = "empireMilitaryOverview";
			ExMachina.troopOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-686px; position:relative; z-index:10500;');
			if (Config.get('militaryOverview') != 'bottom' && Config.get('militaryOverview') != 'none') {
				ExMachina.buttonMilitaryAdviser.appendChild(ExMachina.troopOverview);
				ExMachina.buttonMilitaryAdviser.addEventListener('mouseout', function() {
					document.querySelector('#empireMilitaryOverview').style.display = 'none';
				}, true);
				/*
				ExMachina.buttonMilitaryAdviser.addEventListener('mouseover', function() {
					document.querySelector('#cityNav').style.height = "100px";
				}, true);
				ExMachina.buttonMilitaryAdviser.addEventListener('mouseout', function() {
					document.querySelector('#cityNav').style.height = "10px";
				}, true);
				*/
			} else {
				$(document.querySelector('#container')).append(ExMachina.troopOverview);
				$(ExMachina.troopOverview).css('margin-'+IkaRTL.txtLeft+'', '10px');
				$(ExMachina.troopOverview).css('margin-top', '1em');
				$(ExMachina.troopOverview).css('z-index', '0');
				$(ExMachina.troopOverview).show();
			} 
			ExMachina.updateMilitaryOverview();
		}
		$(IkaTools.querySelector('#empireMilitaryOverview', ExMachina.buttonMilitaryAdviser)).show();
	},
	drawTownOverview:function() {
		ExMachina.appendBuildingList(ExMachina.currentCityId, ExMachina.buttonTownView);
		ExMachina.buttonTownView.removeEventListener('mouseover', ExMachina.drawTownOverview, false);
		IkaTools.querySelector('.buildingLinks', ExMachina.buttonTownView).style.display = "block";
	},
	appendBuildingList:function(cityId, target, left, top) {
		var div = document.createElement('div');
		div.className = "buildingLinks";
		div.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:400px; padding:1em 0 .2em 1em; position:absolute; z-index:1000;'); 
		if(left) { div.style[IkaRTL.txtLeft] = left; }
		if(top) { div.style.marginTop = top; }
		var city = IkaTools.getCityById(cityId);
		if(city.buildings) {
			var construction = IkaTools.cityGetBuildBuilding(city)
			var buildings = sortBuildingsByName(city.buildings);
			buildings.forEach(function(building)
			{
				if (building.position) {
					var a = document.createElement('a');
					a.setAttribute('style', 'display:block; margin-bottom:.8em; font-size:.9em; cursor:pointer; height:auto; background:none; line-height:1em; padding:0; width:100%;');
					a.name = building.cityId;
					a.style.color = (IkaTools.buildingGetResourceMissingTotal(building) == 0 && !IkaTools.buildingIsMaxed(building)) ? '#009900' : 'inherit';
					a.style.color = IkaTools.buildingIsMaxed(building) ? '#000088' : a.style.color;
					a.rev = '/index.php?view=' + building.type + '&position=' + building.position + '&id=' + cityId;
					a.addEventListener('click', function(){
						IkaTools.goTo(this.rev, this.name);
						return false;
					}, true);
					a.addEventListener('mouseover', function(){
						this.style.textDecoration = 'underline';
					}, true);
					a.addEventListener('mouseout', function(){
						this.style.textDecoration = 'none';
					}, true);
					var parsedName = building.name.length > 14 ? building.name.replace(/[^\s]+\s*$/, '') + '...' : building.name;
					a.innerHTML = '<img src="http://' + document.domain + '/skin/img/city/building_' + (building.position == 0 ? 'townhall' : building.type) + '.gif" align="absmiddle" style="margin-'+IkaRTL.txtRight+':.5em;  width:24px;"/>' +
					parsedName +
					' (' +
					building.level +
					((construction && construction.position.toString() == building.position.toString()) ? '<span style="padding:0 2px;">»</span>' + (parseInt(building.level) + 1) : '') +
					')    ';
					var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
  				resourceNames.forEach(function(resourceName)
					{
						var missing = IkaTools.buildingGetResourceMissing(resourceName, building);
						if (missing > 0) {
							a.innerHTML += '<img src="http://' + document.domain + '/skin/resources/icon_' + resourceName + '.gif" style="height:12px; margin-'+IkaRTL.txtLeft+':5px;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(missing) + '</span>';
						}
					});
					a.title = building.name + ' (' + building.level + ')';
					div.appendChild(a);
				}
			});
		}
		target.appendChild(div);
		target.addEventListener('mouseover', function() {
			IkaTools.querySelector('.buildingLinks', this).style.display = "block";
		}, true);
		target.addEventListener('mouseout', function() {
			IkaTools.querySelector('.buildingLinks', this).style.display = "none";
		}, true);

	},
	parseMessageList:function() {
		var messagesWrapperId = 'deleteMessages';
		GM_addStyle('#' + messagesWrapperId + ' tr th:first-child + th, #' + messagesWrapperId + ' tr td:first-child + td { display:none; }\
			#' + messagesWrapperId + ' tr td:first-child + td + td { padding-'+IkaRTL.txtLeft+':0 !important; }\
      #' + messagesWrapperId + ' .subject div { text-overflow: ellipsis }\
		')
  	//--------------------------------- Item Parse --------------------------
		var msgCnt = document.querySelector('#deleteMessages');
    IkaTools.querySelectorAsArray('tr.entry:not(.exMachinaParsed)', msgCnt).forEach(function(item) {
				item.className += ' exMachinaParsed';
				var playerCell = $('td:eq(2)', item);
				playerCell.append(' <nobr></nobr>'); // add tools wrapper next to name
				//-------------------------------- Treaty Tools ----------------------------------
				if (IkaTools.getView() == 'diplomacyAdvisor' && Config.get('ctInbox')) {
					var messageId = $(item).attr('id').match(/message(\d+)/)[1];
          var tblRep = IkaTools.querySelector('#tbl_reply' + messageId, msgCnt);
					if (tblRep != null) {
						var playerId = $(tblRep).html().match(/receiverId=(\d+)/);
						if (playerId) {
							playerId = playerId[1];
							if (Treaty.hasCt(playerId)) 
								$(IkaTools.querySelectorAll('nobr', playerCell[0])).append(Treaty.icons.ct);
							else 
								if (Treaty.hasPendingCt(playerId)) 
									$(IkaTools.querySelectorAll('nobr', playerCell[0])).append(Treaty.icons.ctPending);
						}
					}
				}
				//-------------------------------- Message Previews ------------------------------
				if (Config.get('messagePreviews')) {
					var subjectItm = $(IkaTools.querySelector('.subject', item));
					var subject = subjectItm.text();
					var icon = ''
					if (subject.match(/(circular\smessage)/i)) 
						icon = '<img src="/skin/img/city/building_embassy.gif" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'CircularMessage', "Circular alliance message")+'"/> ';
					else if (subject.match(/(cultural\sgoods\streaty)|(cultural\streaty)/i)) 
						icon = '<img src="/skin/museum/icon32_culturalgood.gif" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'CulturalMessage', "Cultural treaty message")+'"/> ';
					else if ($('.decision', $(item).next().next()).length > 0)
					{
						icon = '<img src="/skin/museum/icon32_culturalgood.gif" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'TreatyMessage', "Treaty message")+'"/> ';
						icon += '<img src="/skin/icons/wichtig.gif" style="height:9px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'TreatyMessage', "Treaty message")+'"/> ';
					}
					else if (subject.match(/\-/i)) 
						icon = '<img src="/skin/img/city/building_embassy.gif" style="height:16px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'CircularMessage', "Circular alliance message")+'"/> ';
					else
						icon = '<img src="/skin/board/schriftrolle_offen2.gif" style="height:14px; vertical-align:middle; display:inline;" title="'+IkaTools.getText('interface', 'PersonalMessage', "Personal message")+'"/> ';
					subjectItm.html('<div style="height:1.5em; overflow:hidden;">' + icon + $('.msgText', $(item).next()).text().substr(0, 80) + '</div>');
				}
				//--------------------------------- Reply as Circular ------------------
				var allianceId = IkaTools.getAllianceId();
				if(IkaTools.getView() == 'diplomacyAdvisor' && allianceId != 0)
        {
          var reply = IkaTools.querySelector('td.reply', $(item).next().next());
          var spn = IkaTools.querySelector('span', reply);
          var url = $('a:eq(0)', spn).attr('href').replace(/receiverId=[0-9]*/, 'allyId=' + allianceId) + '&msgType=51';
          $('a.button:eq(0)', spn).after(' <a class="button" href="' + url + '" title="'+IkaTools.getText('interface', 'ReplyCircular', "Reply to this message as a circular alliance message")+'">'+IkaTools.getText('interface', 'Circular', "Circular")+'</a>');
        }
		});
		
	},
	updateBuildTimers:function() {
		var cities = IkaTools.getOwnedCities();
    cities.forEach(function(city){
			var elem = document.getElementById('ikaEmpireLinksBuildTime' + city.id);
			if(IkaTools.cityGetBuildBuilding(city) && elem) {
				var building = IkaTools.cityGetBuildBuilding(city);
				var seconds = IkaTools.cityGetBuildSecondsRemaining(city);
				var timerText = IkaTools.formatSeconds(seconds);	
				elem.innerHTML = '<a href="javascript:ikaEmpireGoTo(\'/index.php?view=' + building.type + '&id=' + building.cityId + '&position=' + building.position + '\', ' + building.cityId + ')" ' +
									' style="background:none; padding:0; display:inline; height:auto; width:auto;">' + IkaTools.cityGetBuildBuilding(city).name + '</a>' +
								' <br/><span style="font-size:.9em;">' + timerText + '</span>';
			} else if(elem) {
				elem.innerHTML = "-";
			}
		});
		ExMachina.buildTimers = setTimeout(ExMachina.updateBuildTimers, 1000);
	},
	getCityListForInfoBox:function(cities) {
		GM_addStyle('.playerCityListForInfoBox td { padding:.25em 0 !important; font-size:11px !important; vertical-align:middle; text-align:'+IkaRTL.txtLeft+' !important; }\
					.playerCityListForInfoBox td img { width:auto; display:inline !important; margin-'+IkaRTL.txtRight+':1px !important; height:10px; position:relative; top:-2px; vertical-align:middle; }\
		');
		var html = '<table cellspacing="0", cellpadding="0" border="0" width="210px;" class="playerCityListForInfoBox">'
		cities.forEach(function(city) {
			html += '<tr valign="middle">';
			html += '<td style="font-size:11px;">' +
						'<a href="http://' + document.domain + '/index.php?view=island&id=' + city.islandId + '&selectCity=' + city.id + '" title="'+IkaTools.getText('interface', 'ViewCityIsland', 'View ' + city.name + ' on its island')+'">' +
						'[' + city.islandX + ':' + city.islandY + '] ' + (city.name.length > 10 ? city.name.match(/^.{10}/)[0] + '…' : city.name) + ' (' + city.level + ')</a>' +
					'</td><td>' +
						'<nobr><img src="http://' + document.domain + '/skin/resources/icon_wood.gif"/>' + city.woodLevel + ' </nobr>' +
					'</td><td>' +
						'<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + city.tradegoodType + '.gif"/>' + city.tradegoodLevel + '</nobr>' + 
					'</td>';
			html += '</tr>';
		});
		return html +'</table>';
	},
	drawShowHideOfflineAllies:function(containerId)
	{ 
    try
    {	
  		var boxH = document.querySelectorAll('#'+containerId+' .contentBox01h .header');
      switch (boxH.length)
      {
        case 0: 
          var header = $(null);
          break;
        case 1: 
          var header = $(boxH[0]);
          break;
        default:
          var header = $(boxH[1]);
      }
      
  		header.append('<a id="EMhideOfflineAllies" style="margin-'+IkaRTL.txtLeft+':5px; cursor:pointer;">'+IkaTools.getText('interface', 'HideOffline', "Hide offline")+'</a>');
  		header.append('<a id="EMshowOfflineAllies" style="margin-'+IkaRTL.txtLeft+':5px; cursor:pointer;">'+IkaTools.getText('interface', 'ShowOffline', "Show offline")+'</a>');
  		$(IkaTools.querySelector('#EMshowOfflineAllies', header)).hide();
  
  		$(IkaTools.querySelector('#EMhideOfflineAllies', header)).click(function (event)
      {
        event.preventDefault();
      	var off = IkaTools.querySelectorAsArray('.offline, .vacation, .inactive', document.querySelector('#'+containerId+' .contentBox01h:nth-child(2)'));
      	var i;
      	var nodo;
      	
        off.forEach(function(nodo)
      	{
      		try
      		{
      			$(nodo.parentNode).hide();
      		}
      		catch (err)
      		{
      		}
      	});
    		$(this).hide();
    		$(IkaTools.querySelector('#EMshowOfflineAllies', header)).show();
      });
  		
  		$(IkaTools.querySelector('#EMshowOfflineAllies', header)).click(function (event)
      {
        event.preventDefault();
      	var off = IkaTools.querySelectorAsArray('.offline, .vacation, .inactive', document.querySelector('#'+containerId+' .contentBox01h:nth-child(2)'));
      	var i;
      	var nodo;
      	
        off.forEach(function(nodo)
      	{
      		try
      		{
      			$(nodo.parentNode).show();
      		}
      		catch (err)
      		{
      	    alert(err.message);
      		}
      	});
    		$(this).hide();
    		$(IkaTools.querySelector('#EMhideOfflineAllies', header)).show();
      });
    }
    catch (err)
    {
    }
	},
	growl:function(type, title, message) {
		if(typeof(Growler) != 'undefined') {
			if(typeof(ExMachina.growlInitialized) == 'undefined') {
				Growler.addNoticeType('movement', 'Troop Movement');
				Growler.register('Ikariam Empire Overview', 'http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/ikariam_icon.png');
				ExMachina.growlInitialized = true;
			}
			Growler.growl(type, title, message);
		}
	},
	icons:{
		refreshSmall:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII%3D',
		loading:'data:application/force-download;base64,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%3D%3D',
		checkmark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC',
		cogEdit:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALzSURBVDjLdZPdT5JhGMaZf4Bbh3ZaBzn/gU46MM1iNrf8WExNVyz1IDUOHCFpfq4PmmZmtTTT8GMJNGAO0hgi8a0oIBAGfoS4N12gmUpmL1fPy9LGpu/27N2zPdfvvu7rfh4WANZRa2pqims2mycMBsME+bjHnUvYOJ3O1JmZmWQiTiLi9dXVVYRCIUil0nWVSpWkVCqTZTJZ6pEAIu4mYtpms1EmkylFr9dTi4uLWFhYABFSCoUihYCo4eFhWiwWdycAHA6HMBAIIBwOw+/3g4i3tVptzOv1wu12Qy6Xx4h4mzgDRVFQq9UQiUTCQwCpWkd6jTEQRjA/Px8HHQCYvcvlAgOwWCwQCAQxHo9Xl9CC0WhsZQ5PT0/DarVifHwcPT096O/vZxyBtAXbx6fwDXLgV7TC8ToLzq60EhYh2kn1FZ1OF/H5fLDb7dBoNGhqajLx+fzM+vr6zPb2dtPMxCNQWj42XaPAz1VsuKTQiy7/ZhExvba2FrfLVCZBYnBwEC0tLZkH7qzS7Kbv7nvYW1GC0omwO/cef5YNxEUZWGTGdDAYjPfI2GQckMTR2dkZB4TUpy9F3Hdj9K4Buwu3ELZV4rOYC9ebMvAqSmkWGYmdWFzp6+uLzM7OxiFMDr29vabJoSu1kTkB6KgZO4FSRINF2PLWwtOVQd/m5n/Ly8uzH4ZIxtRKgsTk5CSYv17+GNQU/5+4BNGvhfjhFmL++UW01XB6E+6BRCKpGxoaink8nrjYMNoB71gN6F09oktc/ApewyZx8oWI7Z/GUFVVFSsvL/8/xoGBASGTPHPz3rbx4FHVwql+gpC1ADtLRQg77sDZcSEmE7+IZ9XQ0IDc3Fxhwj1obGzsrq6upkceZgBby/C9yoe29iSML9n4cO8sLRGcT+dwOFROTg7NZrO7j3xMBJDafDNtf8/8DHvWDlhb0zFScQqV13MjhYWFScXFxckEkHrsa2RWwbkT0fulZ/Y1D9j0u+asjRtXsy3E7rHP+S+qJels2qSd5wAAAABJRU5ErkJggg%3D%3D',
		disk:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D',
		target:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNBNEZDMUE5OUMxQjExREY4QjVFRERBQkMxMzQ4QzJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNBNEZDMUFBOUMxQjExREY4QjVFRERBQkMxMzQ4QzJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E0RkMxQTc5QzFCMTFERjhCNUVEREFCQzEzNDhDMkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E0RkMxQTg5QzFCMTFERjhCNUVEREFCQzEzNDhDMkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Heb6gAAADGUlEQVR42pyVTUhUURSA35sZxhSr2RTMhIVMuAgxCVLCKChdWBQIUUyroDZFixbWQlD6haRFEUY/i8AoDDdBLQqiJPpZtBgwhCCoASuNkLDFzPjmt++8zh1ejjmjFz7uueece8599557nx2NRi1vs23b8vl8LiIHg0FXVttZuhPFYnEz/bToMpmMVSgU/sHbfNYiTRJks1krl8tZBJXJzbAGuUkCSXDRL9YWTWCaBCNJXT6fbwALNkrSalqlBHVwGB6y0o8katNtuIHuHVyC5uUmaCfoW3hAwEMaeBKK8Am2QB/2OL6DULOUBF1MfEaAVniPvAc2II+AjdwNUeSLkIMzzLkHKyomYGIjDLPPISbeQd6B+qnuvS09+59H/x19Pz5d6KbhILrzZQkcx3ErRapB6cU5zETZ9+P4OLI9EthbijLWJtsYQyd+J6WEJY7YJbbPOEtVIEvgA/Abpz76wtzcnJVOp8tqXRaVTCZNCb9CdwVqoUerzvUrbZFuQQvKtfAYh4QEl0CeBZSQsVmlXrYRte0290ZaACKwCxowdmo++YIO+lq5bHoXkuhWISZgO/IMtoDa5EzqEb/BVrimfuN2JBI5h3HAqq4Nw014qXekUvtlh8PhCAncL6Dv1K8ZZXVP5pVdGvteuR/YhuhnwW92GOqx99OvxH7bfIF84hTc10+NawJHdH6/31u+Ym9BjBFghAfwh3mvdO83MbwOb9CdMg9kwATQg/kAPxnuh0YOMSGOksh7cNJEJ8HloFUf04QvTGL3ZTY1q1UyDY9gNVxG75cqSaVSZfdAKkf0UmWMd8JpSOv80t3ymVI02wCDOEyB3MxbqINmEf+5aB1aojUwhO+4buffi7bAySdwOILDLBxDfo2uW+9JUYP70a9Df4Hxc72go4zLqtEOhULz3yKzynaQL2hV06T2DTABTfqCZtnrq5zVADjmcKtJINQx3gc9mLbBenWTKosTeEwqCibMb3apCbyPoCQbw6UNjhLorqkU7398foKKv0yZrIecIuFXTfzZc8jL/2Uu8NOfgBnkL9X+9P8IMABMVTt0o4ogOgAAAABJRU5ErkJggg%3D%3D',
		travelTime:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAWCAYAAACosj4+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU5NzVCOTZBOUMxMzExREY5NjE2ODZCNzIxODkzRDQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5NzVCOTZCOUMxMzExREY5NjE2ODZCNzIxODkzRDQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTk3NUI5Njg5QzEzMTFERjk2MTY4NkI3MjE4OTNENDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTk3NUI5Njk5QzEzMTFERjk2MTY4NkI3MjE4OTNENDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rEAZZAAADBElEQVR42syWXUiTURjH/+8+1DG0WeqcGM2W2fzC8EK7SlQio4swCqG7QAgpMiq6tIKuIpAuIuiDKC+kKAwlQ9IUMkZY5kfOaebMcM5lTnPu693eds565151NueE/nA45z2c99nvfZ7nPHsYjuPwP0myWQP2jpINf5FhzAOlwgvFDilkpZ1MVIGss25qmF8TuZfs+OWS4/uHEUyNO6A3sXRfreSg0cTT9asFGRrez2JoUmhPtFmgnm4LLJMLAZhVHvQK9+NjGTDybchTxSB3b0b0Q2bLOYJLjzswONIf4oR4ebngG6M28haFedrez6w8zWw0qa9MFHNFssOoTLkqMFZXc4zT7lcjJVW97vsz00a8aOxYEyZiD3XaWvB5ooe7vqslYHR7ogJV1fWCc1Nmi+D5p2kYSTsLKVAoRZxDJvYHqscKAu7NKy5A471awZk0ZXJgECWp9uHtswfQZu0OaZf5uniTM3n7lsPsccLl9cDBsXD6ZruXhcM3+Jlfk0E0zzqhEmfggvQ4dG0DyNXakJycBotlKmCzvdVNgUm49L1GXLvTxITlIQKzETn+Qo2zozi3dAteX0mamcvBl5FECkXE6oehVCvQ1doJs9G6LswqoARxLJ1jROKIwnjf1YSX2jakZ8VRqATpAXQZNTRnTlSW4/yNR8y/bIiiVfLdnIPOH+0DuOi5DbnEjVjFBLp1n1BZVYrc8rNMOHZEa4WA5FCkKpTl4dS7QyiquEyfz9Seph7yJXxY9WVThTFOJKGJTyRl4vA6e8jvhT0Q/DiBulv/0AeWz4WqP2t6yMX5jfM3LNykzpBkolnrh7Fa5ymM2VDnr0/TzwNQ5LqfLMtf11MRVWp7UBl4kjkY/MUCGKeuGX29i3QtL6uhM7ltRKFuW8RJrZKkr4QJqQGTC7oGfxU/WFECveFbdG9Zifwogv82gsV7x9v/hrYgweKhohqyaDRowdqSBo2Ib9L4PbNVhLm+URiG7YIGrSA7Ab+dHAa3qkELhmFSZWGdJw3aloUs2vojwACpxWUSDkNVZgAAAABJRU5ErkJggg%3D%3D'
	}
};
ExMachina.views = {};

ExMachina.views.branchOffice = function() {
	//--------------------------------- Anti Plus --------------------------
	if(Config.get('tradeOverview')) {
		GM_addStyle('#mainview div + div + form { display:none; } #tradeOverview .paginator, #tradeOverview .unicode { display:none !important; } #resourceSale0, #resourceBuy0 { padding-top:0 !important; } #tradeOverview td, #tradeOverview th { font-size:11px; } #tradeOverview img { height:12px; }\
			#tradeOverview table tr td:first-child { border:none !important; }\
			#tradeOverview tr td:first-child { border-'+IkaRTL.txtRight+':1px solid #f2d5a3 !important; }');
		$('div.contentBox01h:eq(2) h3').html('<span style="margin-'+IkaRTL.txtRight+':300px;" class="textLabel">'+IkaTools.getText('interface', 'SellOffers', "Sell Offers")+'</span><span class="textLabel">'+IkaTools.getText('interface', 'BuyOffers', "Buy Offers"));
		var target = $('div.contentBox01h:eq(2) div.content');
		target.html('<table id="tradeOverview" cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr><td id="resourceSale0" style="width:50%"></td><td id="resourceBuy0"></td></tr><tr><td id="resourceSale1"></td><td id="resourceBuy1"></td></tr><tr><td id="resourceSale2"></td><td id="resourceBuy2"></td></tr><tr><td id="resourceSale3"></td><td id="resourceBuy3"></td></tr><tr><td id="resourceSale4"></td><td id="resourceBuy4"></td></tr>');
	}
};
ExMachina.views.barracks = function(){
  GM_addStyle('#barracks #cityResources .tooltip {bottom:auto; '+IkaRTL.txtRight+':auto;}');
}
ExMachina.views.colonize = function(){
}
ExMachina.views.diplomacyAdvisor = function() {
	ExMachina.parseMessageList();
	// write circular message
	var allianceId = IkaTools.getAllianceId();
	if (allianceId) {
		$(document.querySelector('td.selection')).prepend('<div style="width:50%; float:'+IkaRTL.txtRight+'; text-align:'+IkaRTL.txtRight+';"><input id="newCircExMachina" title="'+IkaTools.getText('interface', 'NewCircularText', "Create a new circular message to your entire alliance")+'" type="submit" class="button" value="'+IkaTools.getText('interface', 'NewCircular', "New Circular")+'" name="#"></div>')
		$(document.querySelector('#newCircExMachina')).click(function(event) {
			event.preventDefault();
			this.blur();
			document.location = 'http://' + document.domain + '/index.php?view=sendIKMessage&msgType=51&allyId=' + allianceId;
		})
	}
}
ExMachina.views.diplomacyAdvisorAlly = function() 
{
	//--------------------------------- Hide Offline Allies --------------------------
  ExMachina.drawShowHideOfflineAllies('alliance');
}
ExMachina.views.diplomacyAdvisorOutBox = function() {
	ExMachina.parseMessageList();
	//--------------------------------- Message preview --------------------------
	GM_addStyle('#messages tr th:first-child + th, #messages tr td:first-child + td { display:none; }')
	
}
ExMachina.views.diplomacyAdvisorTreaty = function() {
}
ExMachina.views.dump = function(){
}
ExMachina.views.errorLoggedOut = function() {
}
ExMachina.views.embassy = function(){
	//--------------------------------- Hide Offline Allies --------------------------
  ExMachina.drawShowHideOfflineAllies('mainview');
}
ExMachina.views.highscore = function(){
}
ExMachina.views.island = function(){
	GM_addStyle('\
		#island { background-repeat:none !important; }\
		a.reportPlayer img, a.messageSend img { max-height:16px !important; vertical-align:middle !important; }\
	');
	//----------------------------------------------- Pillage Helper ----------------------------
	GM_addStyle('#actions ul.cityactions li.addTarget a { background:url(/skin/actions/espionage.gif) no-repeat center top; }');

	var markLoners = Config.get('islandMarkLoners');
	var showSpies = Config.get('islandShowSpies');
	try { var selectedCityId = document.location.toString().match(/cityId=(\d+)/)[1]; } catch(e) { var selectedCityId = false; }
	var tradegood = $('#islandfeatures #tradegood a').css('background-image').match(/\/([^\/]+)\.gif/)[1];
	switch(tradegood) {
		case 'wein': tradegood = 'wine'; break;
		case 'marmor': tradegood = 'marble'; break;
		case 'schwefel': tradegood = 'sulfur'; break;
		case 'kristall': tradegood = 'crystal'; break;
	}
	IkaTools.querySelectorAsArray('ul#cities li.cityLocation', document).forEach(function(item, i) {
		try { var cityId = item.innerHTML.match(/city_(\d+)/)[1]; } catch(e) { var cityId = false; }
		var target = cityId ? Pillage.getTargetById(cityId) : false;

		var spyDiv = IkaTools.querySelector('.spy td', item);
		if (spyDiv != null) {
			if(showSpies) {		// spy icon
				var img = document.createElement('img');
				img.src = Pillage.icons.spy;
				img.setAttribute('style', 'vertical-align:middle; margin-'+IkaRTL.txtLeft+':-6px; position:relative; top:-1px;');
				img.title = IkaTools.getText('interface', 'HaveASpy', 'You have a spy in this town');
				$('span.before', item).after(img);
			}
			// list hideout(s)
			if(target) {
				spyDiv.style.padding = "1em 0";
				spyDiv.innerHTML = '<img src="http://' + document.domain + '/skin/img/city/building_safehouse.gif" style="height:14px; display:inline; position:relative; top:4px;"/>: ';
				var cities = IkaTools.getCities();
				for(var i = 0; i < cities.length; i++) {
					var spies = Pillage.getSpiesByTargetId(target.id, cities[i].id);
					var numSpies = 0;
					for(x in spies) { numSpies++; }
					if(numSpies > 0) {
						var a = document.createElement('a');
						a.innerHTML = cities[i].name;
						a.href = "javascript:Pillage.goTo('http://" + document.domain + "/index.php?view=safehouse&position=" + IkaTools.cityGetBuildingByType('safehouse', cities[i]).position + "&id=" + cities[i].id + "', " + cities[i].id + ");";
						if (IkaRTL.isRTL) 
						  a.style.marginRight = ".5em";
						else
						  a.style.marginLeft = ".5em";
						spyDiv.appendChild(a);
					}
				}
				target.tradegood = tradegood;
				Pillage.saveTarget(target);
			}
		}
		
		if(markLoners && !item.innerHTML.match(/view=allyPage/)) {
			item.className += ' pillageHelperLoner';
		}	

		if(target) {
			try { target.islandId = document.location.toString().match(/island&id=(\d+)/)[1]; } catch(e) {}
			try { target.cityLevel = item.className.match(/\d+/); } catch(e) { alert(e); }
			try { target.inactive = (IkaTools.querySelector('.inactivity', item) != null) ? true : false; } catch(e) { alert(e); }
			try { target.playerName = $('.owner td:eq(1)', item).html().replace(/(<[^d].*?\/>|<[^d].*?<\/[^\d]+a?>)/g, '').trim(); } catch(e) { alert(e); }
			target.tradegood = tradegood;

			try { target.allianceName = $('.ally td:eq(1)', item).html().replace(/\n/g,'').replace(/<[^\/|^a].*/,'').replace(/\t/g,'').replace(/[ ]*</g,'<').replace(/>[ ]*/g,'>').trim(); } catch(e) { target.allianceName = '-' }
			var html = '<div class="pillageHelperInfoWrapper"><p style="margin-top:1.5em;"><strong>'+IkaTools.getText('pillageHelper', 'PillageHelper', 'Pillage Helper')+':</strong>\
							<span style="font-size:8px; position:relative; top:-2px;">\
								<span title="'+IkaTools.getText('pillageHelper', 'Wall', 'Wall level')+'"><img src="http://' + document.domain + '/skin/layout/stadtmauer_icon.gif" style="height:16px; display:inline; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '</span>\
								<span title="'+IkaTools.getText('pillageHelper', 'Mortars', 'Mortars needed')+'"><img src="http://' + document.domain + '/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:16px; margin-'+IkaRTL.txtLeft+':7px; display:inline; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
								<span title="'+IkaTools.getText('pillageHelper', 'Port', 'Port level')+'"><img src="http://' + document.domain + '/skin/img/city/building_port.gif" style="height:16px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle; display:inline;"/> ' + Pillage.targetGetPortLevel(target) + '</span>\
							</span>\
						</p>';
			var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
			if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
				html += '<p style="font-size:8px;" title="'+IkaTools.getText('pillageHelper', 'Resources', 'Resources available')+' - ' + Pillage.targetGetResourcesLastUpdatedString(target) +' '+IkaTools.getText('pillageHelper', 'lastReport', 'since last report')+'">\
					<img src="http://' + document.domain + '/skin/img/city/building_warehouse.gif" style="vertical-align:middle; height:16px; margin-top:2px; display:inline;"/>:  ';
				if(totalAvailable > 0) {
					for(var i = 0; i < Pillage.resourceTypes.length; i++) {
						var type = Pillage.resourceTypes[i];
						var available = Pillage.targetGetResourceAvailable(target, type);
						if(available > 0)
							html += ' <img src="http://' + document.domain + '/skin/resources/icon_' + type + '.gif" style="display:inline; height:12px; vertical-align:middle; margin-'+IkaRTL.txtRight+':2px;"/>' + IkaTools.addCommas(available);
					}
					var shipsNeeded = Math.ceil(totalAvailable / 500);
					html += ' <img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:14px; vertical-align:middle; display:inline;"/> ' + shipsNeeded;
				} else
					html += ' '+IkaTools.getText('pillageHelper', 'none', 'none')+' ';
				html += '</p></div>';
			}
			$('.cityinfo .spy td', item).append(html);
			if(selectedCityId && selectedCityId == target.id) {
				target.position = item.id.match(/\d+$/)[0];
				$('#information .cityinfo').after($('#cityLocation' + target.position + ' .pillageHelperInfoWrapper')[0].innerHTML);
			}
			Pillage.saveTarget(target);
		}
	});

	if(Config.get('islandBlinkInactives'))
		GM_addStyle('span.inactivity { text-decoration:blink !important; }')
	GM_addStyle('li.pillageHelperLoner * { color:#CC0000 !important; }')
}
ExMachina.views.login = function() {
	if($('select#logServer').size() == 0) {
		if (document.domain == 'en.ikariam.com') $('select[name="uni_url"]').append('<option value="s666.en.ikariam.com">Test Server</option>')
		GM_addStyle('#phasmaAutoLoginConfigButton:hover { opacity:1 !important; }');
		var settingsButton = $('<img id="phasmaAutoLoginConfigButton" src="' + ExMachina.icons.disk + '" style="float:'+IkaRTL.txtRight+'; margin-top:.5em; margin-'+IkaRTL.txtLeft+':1.2em; cursor:pointer; "/>');
		$('table#logindata').css('width', '100%');
		var loginButton = $('input[name="loginMode"]'); 
		var loginText = loginButton.attr('value');
		loginButton.before(settingsButton);
		var autoLogin = typeof(IkaTools.getVal('autoLogin')) == 'boolean' && IkaTools.getVal('autoLogin');
		$(settingsButton).attr('title', autoLogin ? 'Click to disable auto-login' : 'Click to set auto-login using this information');
		$(settingsButton).css('opacity', autoLogin ? '1' : '.5');
		$(settingsButton).click(function() {
			autoLogin = !autoLogin; // toggle auto login
			$(settingsButton).css('opacity', autoLogin ? '1' : '.5');
			if (autoLogin) {
				IkaTools.setVal('autoLogin', true);
				IkaTools.setVal('serverIndex', $('select#universe').attr('selectedIndex'));
				IkaTools.setVal('login', $('input#login').attr('value'));
				IkaTools.setVal('pass', $('input#pwd').attr('value'));
				document.location = document.location;
			} else {
				IkaTools.setVal('autoLogin', false);
				loginButton.attr('value', loginText);
			}
		});
		$('select#universe').attr('selectedIndex', IkaTools.getVal('serverIndex'));
		if (autoLogin) {
			$('#loginWrapper').css('display', 'block');
			$('input#login').attr('value', IkaTools.getVal('login'));
			$('input#pwd').attr('value', IkaTools.getVal('pass'));
			$('form#loginForm').attr('action', "http://" + $('select#universe').attr('value') + "/index.php?action=loginAvatar&function=login");
			var i = 2;
			$('input[name="loginMode"]').append('<span>kk</span>');
			loginButton.attr('value', loginText + '... ' + i);
			setInterval(function() {
				if (autoLogin) {
					i--;
					loginButton.attr('value', loginText + '... ' + i);
					if (i == 0) $('form#loginForm')[0].submit();
				}
			}, 1000);
		}
	} else {
		if(document.domain == 'en.ikariam.com') 
			$('select[name="uni_url"]').append('<option value="s666.en.ikariam.com">'+IkaTools.getText('interface', 'TestServer', "Test Server")+'</option>')
		GM_addStyle('#phasmaAutoLoginConfigButton:hover { opacity:1 !important; }');
		var settingsButton = $('<img id="phasmaAutoLoginConfigButton" src="' + ExMachina.icons.disk + '" style="float:'+IkaRTL.txtRight+'; margin-top:.5em; margin-'+IkaRTL.txtLeft+':1.2em; cursor:pointer; "/>');
		$('table#logindata').css('width', '100%');
		var loginButton = $('#loginBtn'); 
		var loginText = loginButton.attr('value');
		loginButton.css('width', '120px');
		loginButton.css('background', 'url("../img/sp-bg-content.png") no-repeat scroll -201px -200px transparent');
		loginButton.before(settingsButton);
		var autoLogin = typeof(IkaTools.getVal('autoLogin')) == 'boolean' && IkaTools.getVal('autoLogin');
		$(settingsButton).attr('title', autoLogin ? IkaTools.getText('interface', 'DisableAutoLogin', "Click to disable auto-login") : IkaTools.getText('interface', 'SetAutoLogin', 'Click to set auto-login using this information'));
		$(settingsButton).css('opacity',  autoLogin ? '1' : '.5');
		$(settingsButton).css('margin-'+IkaRTL.txtRight+'',  '20px');
		$(settingsButton).css('margin-top',  '15px');
		$(settingsButton).click(function() {
			autoLogin = !autoLogin;		// toggle auto login
			$(settingsButton).css('opacity', autoLogin ? '1' : '.5');
			if(autoLogin) {
				IkaTools.setVal('autoLogin', true);
				IkaTools.setVal('serverIndex',  $('select#logServer').attr('selectedIndex'));
				IkaTools.setVal('login',  $('input#loginName').attr('value'));
				IkaTools.setVal('pass',  $('input#loginPassword').attr('value'));
				document.location = document.location;
			} else {
				IkaTools.setVal('autoLogin', false);
				loginButton.attr('value', loginText);
			}
		});
		$('select#logServer').attr('selectedIndex', IkaTools.getVal('serverIndex'));
		if(autoLogin) {
			$('#loginWrapper').css('display', 'block');
			$('input#loginName').attr('value', IkaTools.getVal('login'));
			$('input#loginPassword').attr('value', IkaTools.getVal('pass'));
			$('form#loginForm').attr('action', "http://" + $('select#logServer').attr('value') + "/index.php?action=loginAvatar&function=login");
			var i = 2;
			$('input[name="loginMode"]').append('<span>kk</span>');
			loginButton.attr('value', loginText + '... ' + i);
			setInterval(function() {
				if(autoLogin) {
					i--;
					loginButton.attr('value', loginText + '... ' + i);
					if(i == 0) $('form#loginForm')[0].submit();
				}
			}, 1000); 
		}
	}
}
ExMachina.views.militaryAdvisorCombatReports = function(){
}
ExMachina.views.militaryAdvisorMilitaryMovements = function(){
	//--------------------------------- Show Cargo --------------------------
	if (Config.get('expandCargo')) {
		GM_addStyle('.phasmaMilitaryCargo { background:none !important; margin:0 !important;}\
					.phasmaMilitaryCargo tr { height:auto !important; }\
					.phasmaMilitaryCargo td { padding:0 3px !important; text-align:center !important; color:inherit !important; }\
					.phasmaMilitaryCargo tr.quantities td { font-size:10px !important; }\
					.phasmaMilitaryCargo td.icon img { height:20px !important; }\
					.phasmaMilitaryCargo td.iconSmall img { height:14px !important; }')
		IkaTools.querySelectorAsArray('#fleetMovements tr td .tooltip2',document).forEach(function(item){
			$(item).parent().css('cursor', 'inherit');
			$(item).css('background', 'red');
			var html = '<table cellpadding="0" cellspacing="0" border="0" style="width:auto" class="phasmaMilitaryCargo">'
			var units = '<tr>';
			var quantities = '<tr class="quantities">';
			var uBox = IkaTools.querySelectorAsArray('.unitBox div', item);
			
			if (uBox.length > 0 ) {
				uBox.forEach(function(item) {
				  switch (item.className)
				  {
				    case 'icon':
				    case 'iconSmall':
    					units += '<td class="' + item.className + '">' + item.innerHTML + '</td>';
    					break;
				    case 'count':
    					quantities += '<td>' + IkaTools.addCommas(item.innerHTML) + '</td>'
				      break;
				  }
  			});
				units += '</tr>'
				quantities += '</tr>'
				html += units + quantities + '</table>'
				$(item).parent().replaceWith('<td>'+html+'</td>');
			}
/*			
			else
			{
				units += '<td class="icon"><img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif"></td>'
        var shipCount = $(item).parent().text().split(/\//);
        if (shipCount.length > 1)
        {
 					units += '<td>' + shipCount[1].replace(/[^\d]/g, '') + ' ' + IkaTools.getText('interface', 'Units', "Units") +'</td>';
        }
				quantities += '<td>' + IkaTools.addCommas(shipCount[0].replace(/[^\d]/g, '')) + ' </td>'
			}
			units += '</tr>'
			quantities += '</tr>'
			html += units + quantities + '</table>'
			$(item).parent().replaceWith('<td>'+html+'</td>');
*/			
		});
	}
}
ExMachina.views.researchAdvisor = function(){
}
ExMachina.views.militaryAdvisorReportView = function(){
}
ExMachina.views.museum = function(){
	GM_addStyle('\
		td.capital { height:1em !important; overflow:visible; }\
		td.capital:hover { font-weight:bold; }\
		td.capital .playerCityListForInfoBox { display:none; position:absolute; width:auto !important; top:-5px; padding:5px 10px; '+IkaRTL.txtLeft+':120px; border:1px solid #666; background:#fff; z-index:50000; }\
		td.capital .playerCityListForInfoBox td:first-child { padding-'+IkaRTL.txtRight+':2em !important; white-space: nowrap; }\
		td.capital .playerCityListForInfoBox td { background-color:#fff; padding-'+IkaRTL.txtRight+':4px !important; }\
		td.capital:hover .playerCityListForInfoBox { display:block; }\
	');
	// ----- Loop through players -------
	IkaTools.querySelectorAsArray('#mainview td.player', document).forEach(function(item, i) {
		var playerName = $(item).text().trim();
	});
}
ExMachina.views.resource = function(){
}
ExMachina.views.safehouse = function()
{          
}
ExMachina.views.tradeAdvisor = function(){
}
ExMachina.views.tradeAdvisorTradeRoute = function(){
}
ExMachina.views.tradegood = function(){
}
ExMachina.views.transport = function() {
}
ExMachina.views.warehouse = function(){
}
ExMachina.views.workshop = function(){
}
ExMachina.views.worldmap_iso = function(){
}
ExMachina.views.townHall = function() {
  
	function predictPopulationOverfull() {
	  function _(s){
	    var l = 
	    {
	      full:IkaTools.getText('interface', 'Full', "Full in"),
	      stable:IkaTools.getText('interface', 'Stable', "Stable in")
	    }
      
	    return l[s] || '';
	  }
	  var satisfaction, curPopulation, maxPopulationSpace, timeLeftEx, msg_extra = "", happy;
	if(true) {
		happy               = parseInt($('div.happiness div.value').text());				
		curPopulation	= parseInt($('ul.stats li.space span.value:eq(0)').text());
		satisfaction        = curPopulation + happy;
		maxPopulationSpace = parseInt($('ul.stats li.space span.value:eq(1)').text());
		
	
	    var status = "full";
	    if (curPopulation > 0 && maxPopulationSpace > 0) {
	      if ((satisfaction <= maxPopulationSpace)) {
	        timeLeftEx = 1/0.02*Math.log(Math.abs(happy));
	        status = "stable"
	      } else {
	        timeLeftEx = 1/0.02*(Math.log(happy)-Math.log(satisfaction-maxPopulationSpace));
	      }
	      if ((satisfaction <= maxPopulationSpace) && (happy > 0)) {
	        msg_extra  = "* (" + satisfaction + ")";
	      }
	      if (Math.abs(timeLeftEx) == Infinity) timeLeftEx = 0;
	      $('ul.stats div.happiness span:eq(1)').html(_(status) + ' ' + durationHMS(timeLeftEx*3600,2) + msg_extra);
			}
		}
	}
	function durationHMS(seconds,depth){
	  var temp = {'day':'D', 'hour':'h', 'minute':'m', 'second':'s'}, ret = [], prefix = '';
	  if (seconds == 0) { return 'now'; }
	  else if (seconds < 0) { seconds = -seconds; prefix = '-'; }
		var x = [ Math.floor(seconds / 86400) , Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 , Math.ceil(seconds % 60) ];
		var y = [ temp.day, temp.hour, temp.minute, temp.second ];
		for (var i = 0; i < x.length; ++i){ if (x[i] != 0) { ret.push(x[i].toString() + y[i]); } }
	  if (depth && depth<ret.length) return prefix + ret.slice(0,depth).join(' ');
	  else return prefix + ret.join(' ');
	}
	predictPopulationOverfull();
}
ExMachina.views.city = function(root) {
	root = typeof(root) == 'undefined' ? document : root;
	try 
	{
		var cityId = $('a.button[href*="cityMilitary-army"]', root).attr('href').match(/id=(\d+)/)[1];
	}
	catch(e)
	{
	  var cityId = false; 
  }
	var city = IkaTools.getCityById(cityId);
	var islandId = $('#breadcrumbs a.island', root).attr('href').match(/id=(\d+)/)[1].toString();
	var isMyCity = $('#position0 a', root).size() == 1;
	if (root == document && (Config.get('showBuildingLevels') || Config.get('showBuildingNames'))) 
	{
		GM_addStyle('#locations li a, #locations li a { text-align:center; text-decoration:none !important; padding-top:20px; }\
					#locations li a { z-index:30000 !important; }\
					.ikaEmpireBuildingLevel { top:27px; color:#fff; background:#000; padding:2px; line-height:15px; -webkit-border-radius:20px; -moz-border-radius: 20px; border:2px outset #ccc; font-size:12px; position:relative; white-space:pre-wrap; }\
					span.ikaEmpireBuildingLevel {margin-'+IkaRTL.txtLeft+':-50%; margin-'+IkaRTL.txtRight+':-50%; padding:2px 6px; white-space:nowrap; }\
					#locations li a:hover .ikaEmpireBuildingLevel {   }\
					#locations li a:hover .ikaEmpireMissingResources { font-size:11px;  border-width:2px;    }\
					#locations li:hover { z-index:3000 !important; }\
					#locations li#position14:hover { z-index:0 !important; }\
					#locations li a:active .ikaEmpireBuildingLevel { border:2px inset #ccc; font-weight:bold; }\
					#locations li a:hover .ikaEmpireMissingResources { display:block; }\
					#locations li .buildable { background-color:#008800 !important; }\
					#locations li .unknown { background-color:#008888 !important; }\
					.ikaEmpireMissingResources { -webkit-border-radius:10px; -moz-border-radius: 10px;  display:none; width:90%; position:relative; top:30px; padding:2px 4px 2px 0; }\
					.ikaEmpireMissingResources img { height:9px !important; vertical-align:middle; }\
		');
	}
	
	function redrawDotForBuilding(building) 
	{
		if (root == document && (Config.get('showBuildingLevels') || Config.get('showBuildingNames'))) 
		{
			var dot = document.createElement('span');
			dot.className = "ikaEmpireBuildingLevel";
			if (building.level < 10 || building.level.toString() == 'NaN') 
				dot.style.padding = "2px 6px";
			if (Config.get('showBuildingLevels'))
			{
  			dot.innerHTML = building.level.toString() == 'NaN' ? 0 : building.level;
  		}
			if (Config.get('showBuildingNames'))
			{
			  dot.innerHTML = dot.innerHTML + ' ' + IkaTools.getText('buildingsShortNames', building.type, building.name);
			}
			var hasResources = (IkaTools.buildingGetResourceMissingTotal(building) == 0);
			var unknown = typeof(building.resourceLevel) == 'undefined' || building.level != building.resourceLevel;
			
			if (!isMyCity) 
				dot.style.background = "#880000"
			else if (unknown && !IkaTools.buildingIsMaxed(building))
				dot.style.background = "#008888"
		  else if (hasResources && !IkaTools.buildingIsMaxed(building)) 
				dot.style.background = "#008800";
			else if (IkaTools.buildingIsMaxed(building)) 
				dot.style.background = "#000088";
				
			var buildingLink = $('li#position' + building.position + ' a');
			$('.ikaEmpireBuildingLevel', buildingLink).remove(); // remove any existing dot 
			$('.ikaEmpireMissingResources', buildingLink).remove(); // remove any existing dot 
			buildingLink.append(dot);
			if (isMyCity && !IkaTools.buildingIsMaxed(building)) 
			{
				buildingLink.append('<br/>');
				buildingLink.append('<div class="ikaEmpireMissingResources ikaEmpireBuildingLevel' + (unknown ? ' unknown' : (hasResources ? ' buildable' : '')) + '"><span></span></div>');
				var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
				var txt = '';
				for (var b = 0; b < resourceNames.length; b++) {
					if (hasResources) {
						var required = IkaTools.buildingGetResourceRequired(resourceNames[b], building);
						if (required > 0) 
							txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceNames[b] + '.gif" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(required) + '</span></nobr> ';
					} else {
						var missing = IkaTools.buildingGetResourceMissing(resourceNames[b], building);
						if (missing > 0) 
							txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + resourceNames[b] + '.gif" style="height:12px; margin-'+IkaRTL.txtLeft+':5px; vertical-align:middle;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(missing) + '</span></nobr> ';
					}
				}
				txt += '<nobr><img src="http://' + document.domain + '/skin/resources/icon_time.gif" style="height:14px; margin-'+IkaRTL.txtLeft+':5px; margin-top:-2px; vertical-align:middle;"/> <span style="font-size:.8em;">' + building.resources.time + '</span></nobr> ';
				$('.ikaEmpireMissingResources span', buildingLink).append(txt != '' ? txt : '???');
			}    
		}
	}
	
	// loop through buildings   
	IkaTools.querySelectorAsArray('#mainview ul#locations li', root).forEach(function(item, i) 
	{
		try { var position = $(item).attr('id').toString().match(/\d+$/)[0]; } catch(e) { var position = false; }
		try { var level = $('a', item).attr('title').match(/\d+$/)[0]; } catch(e) { var level = null; }
		if(position && level) 
		{
			var building = IkaTools.cityGetBuildingByPosition(position, city);
			var type = IkaTools.querySelector('.buildingimg', item) != null ? item.className : (IkaTools.querySelector('.constructionSite', item) != null ? item.className : false);				
			if(type) 
			{
				var title = $(IkaTools.querySelector('a', item)).attr('title');
				building = building ? building : new IkaTools.building();
				building.level = parseInt(title.toString().match(/\d+$/));
				building.name = title.toString().replace(/\s[^\s]+\s\d+$/, '');  
				building.position = position;
				building.type = type;
				building.cityId = city.id;
				redrawDotForBuilding(building);
			}
		}
	});
}

var tab300Image = 'data:image/gif;base64,R0lGODlhLAEgAPcAAOfHjem6fv/y2/322uGwZO/Omfn36eWzcf7y6/rz4P747Nu3df733fr02uW8fuKuYvr55u7Fjf/y4PPevOzEkf/66v/x3Prz2uC1ct21beCvaP715vv04vv02OzOnfz26P723/z23vzy2e3Ml+rKnPLTpv/78//34v/14v315evDj+e/i+G9gOq6euK5e+O3dOvMn+vKlem9ef/64f/37P/55f/43//13/v22fv13+GvY/314v746v324//04OOxaP7z3/746P7z3f735/314P325P724f/35P335//45vz03/z12f313vz14/zz4v304//55/323P/z3fv33P715OKvZf/04f/y3v/47v/15P732//y3+KxaP/z3v3y3P/x3vz03eKyZ/v37P3y4P/66P702//w2fz04f/65/vz3Pz34fz43+rJlPr46+OvZf7y3P/z3P/x4fz43eGza/735OOvZP/46/325uGvZf/14fr47P/14P/22OjKjvf65frnx+a4fOOwaO7Jkt+5eP/25/js1v/27/vw3ObGi//25O/Qodu3bffkxPz56unIk/z58P/05Pv46ejAjPny1v/y3eWxXuTGkv/y5+nKm+HOlO/QpO/o1vX28P/28d24hOvCivfpxunEjezDi/3x2fzw2v/y1P3z2f/51f/x2vb35+vNmfLm0Pbv1fvz3t+xYeWxbOO9fOO1b+W7eeDChOG0a/357fz47+q5dPz67f/57P3esPr449+3eeKwaPPjv/f46vz14uvKl+m9fPj02fzx3fv22/v33v/25fn01/nx3Pnx3vv+7fjz3//13f3lv/rZo//43Oa/e//46ePCjfzvz//z4/DHj//oxv7lz//35f/77O3Xpd+ya9+zbOnIlf/34OrJlvj48PzpyOOtYuKuYPngwejHkvX04OC4hNzBeuPCf//16f/26v7t0/retvv05OzLl//15fj56/344v/44trChN3DivvhvP/36uKya//56f/46P724/735eKuY//03iH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTU0MDA5NjE4NTI4MTFERjlCNkZGMjFDREQ5NzgzREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTU0MDA5NjI4NTI4MTFERjlCNkZGMjFDREQ5NzgzREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNTQwMDk1Rjg1MjgxMURGOUI2RkYyMUNERDk3ODNEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNTQwMDk2MDg1MjgxMURGOUI2RkYyMUNERDk3ODNEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAsASAAAAj/AP0JHCgwDJd8Bw68cuPvh8OHECNKnEixosWLGDNqdEiwo8ePIEOKHEmypMmTKFOqXOlPB8uXMGPKnEmzps2bOD0+eEDu5LicQIMKHUq0qNGjSJMqXcq06U0NeJxKnUq1alIdrqxq3cq1a806MCuB5dKN25ww+dKqXcu2rdu3cOPKnUu3rt27ePPq3cu3790MGWhxqaLSE4lyV+xg4ZFEn+PHkCNLnky5suXLmDNr3sy5s+fPoEOL5rwOSjNnHgaFJOAPTxWwCzJt4lBhn74KdvDx2M17N77fwIMLH068uPHjyJP/7s28eXPl0KNLny7cufXr2LNr346dBpZHuE6I/1OErkqVQATmHPDXyyGGWILc8UkAhcydIfuG3LEufZ///wAGKOCABBZoYIFBJKjgggwu6Ft0B0Yo4YQTNmjhhRhmyN2G2bFDgxh6VDBDKdeM4AAGi7gQiD8uyPDCIJZMEIchSUDRTxP96OMfEjz2yOMQQAYJJIVEFmnkkQL+KGSQSDbp5JNQRrnPhdYRYocCBhhQizaN/KEKCwsA4kYYvLzwQgy+NGECAj20WUSNSSTRz5x01mlnP0sGeeeefPbp55+ABioonXkCOeihiCaqqKKF4kdhhg1+oI82+iAhRjicoMGIJiy0cEs60cgSyj1MpAJBMfzwc8SqT1BBxaqwwv/a5qyzLmrrrbjauSqttObq66/ABnsnkW3kQkYS2UiTCxbLbIBNH7K0UE80LMDQThLn4HCKEUScwM8ZCeyQ6rjklmvuueimq+667LLL67vw9tDuvPTWa++58ear775uFuHvv0Uc2mijkSDRDwpWoJBFIn6suQ0sAdgjzDQT/EMHEWWYooQSRBDRyg5H7NDxyCSX3PG9KKdML7/wmkyyyjDHbC7LNNds87t8Nuovj0EkQccRu2DRCSjmBDBLADBQM0MylFRzCRhKGMFtqsr4YPXVVrtMhNRcc43uDmCHLfbYZJdt9tlop3121i533fXXasct99x01222zAAD3OgJSQT/0YY8vxgAARpN2MJACTKo88kqw9zgxABAMPHP5JRXbvnlmGeu+eacd+7556CHLvropJdu+uVYp6766qxbXe8xG8TTBCvwrBBBIVPA4cQSW4Bx+u/ABy/88MQXbzzlrSevvOv1bpBFEZOMsII1b8ghwONfSH789tx37/333i8v/upan51CFv10UIAkEfwjhxlPaAEECODXb//9+OcPxP789+///wDsn9YG6AQrFGEJBVCBKP4xBTNQQX4hyJ8EJ0jBCoougAEUggY3yMEOCoF1AWTCGbbAgSWMQAXtmwIqqDCALaTBgjCMoQwliEEAevCGG8zgDaOgBCkkYAAxoEAK/wXwhCUA4YUzTKISlyi8Gv4PhzjMHA55+I8EaCGIEXhDMeBQRBRoj4lgDKMYNTc+qwEPhwMgwg1yAA1wUAAA/2CAAHaAjC7YYIx4zKMeJdgFYwxACgJQBBsQ8Y8oCAAYHbCAKfbIyEY6cngWWMMA/jEKEjgCEUKIggWagIMuiOCRoAylKDn3hTV0IA9wwAQbAOADEFiAAwPYQxlGSctahhIIaphEHprhgRGw8htX4EADrOAFWxrzmHgEwjyQ4QM4wAAeiDgEGILZACAUE5nYzKYMv6AGBgCBFDDwxgiIcYErpGCYQtCmOteZvzjkwAZjkEIJgvGMGihBAu+4gDXZyQ/PfnIPEsxgwBjooYsCBAQAOw%3D%3D'

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

function sortBuildingsByName(array) {
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

Treaty = {
	init:function() {
		var start = new Date();
		if(typeof(Treaty.views[IkaTools.getView()]) == 'function')
			Treaty.views[IkaTools.getView()]();
		if(Config.get('debugMode')) {
			var end = new Date();
			IkaTools.debug('Treaty: ' + IkaTools.addCommas(new Date() - start) + 'ms');
		}
	},
	getMaxNumCt:function() {
		if(typeof(Treaty.museumLevelsByCityId) == 'undefined') 
			Treaty.museumLevelsByCityId = IkaTools.getVal('museumLevelsByCityId');
		var newMuseums = {};
		var total = 0;
		for(var cityId in Treaty.museumLevelsByCityId) {
			if(Treaty.isMyCity(cityId)) {
				total += parseInt(Treaty.museumLevelsByCityId[cityId]);
				newMuseums[cityId] = Treaty.museumLevelsByCityId[cityId];
			}
		}
		Treaty.museumLevelsByCityId = newMuseums;
		IkaTools.setVal('museumLevelsByCityId', Treaty.museumLevelsByCityId);
		return total;
	},
	getNumCt:function() {
		if(typeof(Treaty.ctPlayerIds) == 'undefined') 
			Treaty.ctPlayerIds = IkaTools.getVal('ctPlayerIds');
		var i = 0;
		for(var x in Treaty.ctPlayerIds) i++;
		return i;
	},
	getNumCtFree:function() {
		return Treaty.getMaxNumCt() - Treaty.getNumCt() > 0 ? Treaty.getMaxNumCt() - Treaty.getNumCt() : 0;	
	},
	hasCt:function(playerId) {
		if(typeof(Treaty.ctPlayerIds) == 'undefined') 
			Treaty.ctPlayerIds = IkaTools.getVal('ctPlayerIds');
		return typeof(Treaty.ctPlayerIds[playerId]) != 'undefined';
	},
	hasPendingCt:function(playerId) {
		if(typeof(Treaty.ctPendingPlayerIds) == 'undefined') 
			Treaty.ctPendingPlayerIds = IkaTools.getVal('ctPendingPlayerIds');
		return typeof(Treaty.ctPendingPlayerIds[playerId]) != 'undefined';
	},
	icons:{
		ct:'<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" align="absmiddle" title="'+IkaTools.getText('interface', 'HaveACulturalTreaty', 'You cave a cultural treaty with this player')+'" style="cursor:help;" />',
		ctPending:'<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" align="absmiddle" style="opacity:.4; cursor:help;" title="'+IkaTools.getText('interface', 'RequestedCulturalTreaty', "You have requested a cultural treaty with this player")+'" />',
	},
	isMyCity:function(cityId) {
		var myCityIds = {};
		IkaTools.querySelectorAsArray('#citySelect option', document).forEach(function(item) {
			if (item.className == 'coords' || item.className == '' || item.className.match(/tradegood/))
				myCityIds[item.value] = true;									  
		});
		return typeof(myCityIds[cityId]) != 'undefined';
	},
	setMuseumLevelForCityId:function(level, cityId) {
		if(typeof(Treaty.museumLevelsByCityId) == 'undefined') 
			Treaty.museumLevelsByCityId = IkaTools.getVal('museumLevelsByCityId');
		Treaty.museumLevelsByCityId[cityId] = level;
		IkaTools.setVal('museumLevelsByCityId', Treaty.museumLevelsByCityId);
	},
	views:{
		city:function() {
			try { var cityId = document.location.toString().match(/id=(\d+)/)[1]; } catch(e) { var cityId = false; }
			cityId = cityId ? cityId : ExMachina.currentCityId;
			// update museum level
			if(Treaty.isMyCity(cityId)) {
				var museum = document.querySelector('ul#locations li.museum');
				if (museum != null)
				{
					Treaty.setMuseumLevelForCityId($('a', museum).attr('title').match(/\d$/)[0], cityId);
        }
			}
		},
		diplomacyAdvisorAlly:function() {
			if(Config.get('ctAlliance')) {
				$(document.querySelector("table#memberList thead tr")).append('<th class="catHdr">CT</th>')
				var cellNum = document.querySelectorAll("table#memberList thead th").length - 1;

				IkaTools.querySelectorAsArray("table#memberList tbody > tr", document).forEach( function(item) {	
					var td = document.createElement('td');
					try { var playerId = IkaTools.querySelector('.action .message', item).href.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
					if(playerId) {
						if(Treaty.hasCt(playerId))
							td.innerHTML = Treaty.icons.ct;
						else if(Treaty.hasPendingCt(playerId))
							td.innerHTML = Treaty.icons.ctPending;	
					}
					$(item).append(td);
				});
			}
		},
		diplomacyAdvisorTreaty:function(root) {
			root = typeof(root) != 'undefined' ? root : document;
			if(Config.get('ctTradeTreaties')) {
				$("table#commercialTreaty").each( function() {	
					$("thead > tr", this).each( function() {
						$(this).append('<th class="catHdr">CT</th>');
					});			
					var cellNum = $("thead > tr th", this).size() - 1;
					$("tbody > tr", this).each(function() {
						try { var playerId = this.innerHTML.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
						if(playerId) {
							$(this).append('<td></td>');
							if(Treaty.hasCt(playerId))
								$("td", this)[$("td", this).size() - 1].innerHTML = Treaty.icons.ct;
							else if(Treaty.hasPendingCt(playerId))
								$("td", this)[$("td", this).size() - 1].innerHTML = Treaty.icons.ctPending;	
						}
					});
				});
			}
			// store museum levels
			$('#culturalTreaties tbody tr', root).each(function() {
				try { 
					var level = parseInt($('td', this).eq(2).text());
					var cityId = this.innerHTML.match(/id=(\d+)/)[1];
					Treaty.setMuseumLevelForCityId(level, cityId);
				} catch(e) {}
			});
			IkaTools.setVal('initialized', 'yes');
		},
		embassy:function() {
			Treaty.views.diplomacyAdvisorAlly();
		},
		island:function() {
			if(Config.get('ctIslandView')) {
				IkaTools.querySelectorAsArray("ul#cities  li.city", document).forEach(function(item) {
					try { var playerId = item.innerHTML.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
					if(playerId) {
						if(Treaty.hasCt(playerId))
							$(IkaTools.querySelector('a .textLabel .before', item)).after(Treaty.icons.ct);
						else if(Treaty.hasPendingCt(playerId))
							$(IkaTools.querySelector('a .textLabel .before', item)).after(Treaty.icons.ctPending);
					}
				});
			} 
		},
		museum:function(root) {
			root = typeof(root) != 'undefined' ? root : document;
			// update museum level
			var level = parseInt($('#buildingUpgrade .buildingLevel', root).text().replace(/[^\d]/g, ''));
			var cityId = document.location.toString().match(/id=(\d+)/)[1];
			Treaty.setMuseumLevelForCityId(level, cityId);			
			// read pending CTs
			Treaty.ctPendingPlayerIds = {};
			var ctBox = 1;
			
			var tables = IkaTools.querySelectorAll('.contentBox01h', root);
			
			if (tables.length > 2)
			{
			  ctBox = 2;
  			IkaTools.querySelectorAsArray('tr', tables[1]).forEach(function(item, i) {
  				if(i > 0) {
  					var playerId = item.innerHTML.match(/receiverId=(\d+)/)[1];
  					Treaty.ctPendingPlayerIds[playerId] = true;
  				}
  			});
			}
			
			IkaTools.setVal('ctPendingPlayerIds', Treaty.ctPendingPlayerIds);
			// read CTs
			Treaty.ctPlayerIds = {};	

			IkaTools.querySelectorAsArray('tr', tables[ctBox]).forEach(function(item, i) {
				if(i > 0) {
					var playerId = item.innerHTML.match(/receiverId=(\d+)/)[1];
					Treaty.ctPlayerIds[playerId] = true;
				}
			});
			IkaTools.setVal('ctPlayerIds', Treaty.ctPlayerIds);
			// show max num treaties
			$(IkaTools.querySelector('h3.header', tables[ctBox])).append(' (' + Treaty.getNumCt() + '/' + Treaty.getMaxNumCt() + ')   -    ' + Treaty.getNumCtFree() + ' '+IkaTools.getText('interface', 'openSlots', 'open slots'));
			$(document.querySelector('#assignCulturalGoods div.totalCulturalGoods')).append(' '+IkaTools.getText('interface', 'of', 'of') + ' ' + Treaty.getMaxNumCt());
		},
		sendIKMessage:function() {
		}
	}
};

Pillage = {
	config:{
		showMissionGold:false,
		islandShowSpies:true,
		islandBlinkInactives:true,
		islandMarkLoners:true,
		debugMode:false,
		dateFormat:'M/D/Y - H:m',
	},
	targets:{},
	spies:{},
	init:function() {
		Pillage.debugStart('Pillage Helper');
		unsafeWindow.Pillage = Pillage;
		Pillage.loadData();
		if(typeof(Pillage.views[IkaTools.getView()]) == 'function')		// process current view
			Pillage.views[IkaTools.getView()]();					
		if(Config.get('targetsOverview')) {
			$('#advisors li#advResearch')[0].addEventListener('mouseover', Pillage.showTargetsOverview, false);
			Pillage.tackTargetsOverview(false);
		}
		Pillage.debugStop('Pillage Helper');
	},
	debugStart:function(str) {
		var d = new Date();
		Pillage.startTimes = typeof(Pillage.startTimes) == 'undefined' ? {} : Pillage.startTimes;
		Pillage.startTimes[str] = d.getTime();
	},
	debugStop:function(str) {
		if(Config.get('debugMode')) {
			IkaTools.config.debugMode = true;
			var end = new Date();
			IkaTools.debug(str + ': ' + IkaTools.addCommas(end.getTime() - Pillage.startTimes[str]) + 'ms');
		}
	},
	drawTargetsOverview:function() {
		if($('#pillageHelperTargetsOverview').size() == 0) {
			var div = document.createElement('div');
			div.id = 'pillageHelperTargetsOverview';
			div.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:'+IkaRTL.txtLeft+'; width:950px; margin-'+IkaRTL.txtLeft+':-776px; position:relative; z-index:10500;'); 
			$('li#advResearch').append(div);
			GM_addStyle('#pillageHelperTargetsOverview a { display:inline !important; color:#000099 !important; }\
						#pillageHelperTargetsOverview .targetsOverviewTravelTimes a { display:block !important; margin-bottom:.5em; height:auto; width:auto; }\
						#pillageHelperTargetsOverview .targetsOverviewTravelTimes { display:none; border:1px solid #666; padding:.5em; background-color:#fff; position:absolute; top:1.4em; '+IkaRTL.txtLeft+':-.4em; z-index:50000; width:200px;  }\
						#pillageHelperTargetsOverview td.travelTime:hover .targetsOverviewTravelTimes { display:block; }\
						#pillageHelperTargetsOverview a:hover { text-decoration:underline !important; }\
						#pillageHelperTargetsOverview * { font-size:11px !important; }\
						#pillageHelperTargetsOverview th { font-weight:bold; }\
						#pillageHelperTargetsOverview th, #pillageHelperTargetsOverview td { padding:5px !important; border-bottom:1px dotted #9D836A !important; }\
						#pillageHelperTargetsOverview tr.even { background-color:#FDF7DD !important; } \
						#pillageHelperTargetsOverview tr.uneven { background-color:#FEE8C8 !important; } \
						#pillageHelperTargetsOverview th { line-height:14px !important; }\
						#pillageHelperTargetsOverview td { border-'+IkaRTL.txtLeft+':1px dotted #9D836A !important; padding:2px 5px !important; }\
						#pillageHelperTargetsOverview tr:hover > td { background-color:#CBECFF !important; }\
						#pillageHelperTargetsOverview td.pillageHelperTargetsOverviewSpies { position:relative; text-align:center; }\
						#pillageHelperTargetsOverview img.disabled { opacity:.2; }\
						#pillageHelperTargetsOverview .pillageHelperTargetsOverviewSpies .pillageHelperTargetsOverviewSpiesDetails { margin-top:0; margin-'+IkaRTL.txtLeft+':-72px; position:absolute; background-color:#FDF7DD; z-index:20000; display:none; border:1px solid #666; padding:1em !important; text-align:'+IkaRTL.txtLeft+'; width:200px;}\
						#pillageHelperTargetsOverview .pillageHelperTargetsOverviewSpies:hover .pillageHelperTargetsOverviewSpiesDetails { display:block; }\
						.pillageHelperTargetsOverviewGarrison .pillageHelperTargetsOverviewGarrisonDetails { display:none; position:absolute; background-color:#FDF7DD; padding:.5em; border:1px solid #666; margin-'+IkaRTL.txtLeft+':-50px; z-index:30000; margin-top:4px; }\
						.pillageHelperTargetsOverviewGarrison:hover .pillageHelperTargetsOverviewGarrisonDetails { display:block; }');
		}
		var html = '<table cellpadding="0" cellspacing="0" border="0" width="100%"  style="width:100%; white-space:nowrap;">\
						<tr valign="middle" style="background-image:url(/skin/input/button.gif); height:14px;">\
							<th>'+IkaTools.getText('pillageHelper', 'Player', "Player")+'</th>\
							<th style="text-align:center"><img src="http://' + document.domain + '//skin/unitdesc/unit_attack.gif" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'MilitaryScore', "Player's military score")+'"/></th>\
							<th>'+IkaTools.getText('pillageHelper', 'City', "City")+'</th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/img/city/building_townhall.gif" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'CityLevel', "City Level")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/img/city/building_barracks.gif" style="height:16px;" title="'+IkaTools.getText('pillageHelper', 'Garrison', "Garrison information")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/layout/stadtmauer_icon.gif" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'Wall', "Wall Level")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'Mortars', "Mortars needed")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/img/city/building_port.gif" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'Port', "Port Level")+'"/></th>\
							<th style="text-align:center"><img src="http://' + document.domain + '/skin/characters/military/120x100/spy_120x100.gif" style="height:16px" title="'+IkaTools.getText('pillageHelper', 'SpyCount', "Spies in target")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_wood.gif" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Wood', "Wood available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_wine.gif" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Wine', "Wine available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_marble.gif" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Marble', "Marble available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_crystal.gif" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Crystal', "Crystal available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/resources/icon_sulfur.gif" style="height:16px;" title="'+IkaTools.getText('pillageHelper', 'Sulphur', "Sulphur available for pillaging")+'"/></th>\
							<th style="text-align:center;"><img src="http://' + document.domain + '/skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:16px;" title="'+IkaTools.getText('pillageHelper', 'Ships', "Trade ships required to carry loot")+'"/></th>\
							<th style="text-align:center;"><img src="' + ExMachina.icons.travelTime + '" style="height:14px;" title="'+IkaTools.getText('pillageHelper', 'Time', "Travel Time")+'"/></th>\
							<th></th>\
						</tr>';
		var targets = Pillage.targets;
		var sortBucket = {};
		var str = '';
		var c = 0;
		for(var x in targets) {
			c++;
			str += Pillage.targetGetPlayerName(targets[x]) + "\n";
			sortBucket[Pillage.targetGetPlayerName(targets[x]) + targets[x].cityName + c] = targets[x];
		}
		var sorted = sortArrayByKeys(sortBucket);
		var i = 0;
		for(var q = 0; q < sorted.length; q++) {
			var id = sorted[q].id;
			i++;
			var target = targets[id];
			var spies = Pillage.targetGetSpies(target);
			var now = new Date();
			
			// get number of spies per city
			var cities = IkaTools.getCities();
			var spiesPerCity = {};
			for(var z = 0; z < spies.length; z++) {
				spiesPerCity[spies[z].cityId] = typeof(spiesPerCity[spies[z].cityId]) != 'undefined' ? spiesPerCity[spies[z].cityId] + 1 : 1;
			}			
			html += '<tr class="' + (i%2 == 0 ? 'even' : 'uneven') + '" id="pillageHelperTargetOverview_' + target.id + '">';
			// alliance
			html += '	<td><nobr>' + (Pillage.targetGetPlayerName(target) ? Pillage.targetGetPlayerName(target) : '?') + 
							(Pillage.targetGetAllianceName(target) != '-' ? ' [' + Pillage.targetGetAllianceName(target) + ']' : '') +
						'</nobr></td>' 
			// military score
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'MilitaryScore', "Player's military score")+'">' + (typeof(target.militaryScore) == 'undefined' ? '?' : IkaTools.addCommas(target.militaryScore)) +	'</td>';
			var nameWithCoords = '[' + target.islandX + ':' + target.islandY + '] ' + target.cityName;
			html += '	<td>' + (Pillage.targetGetTradegoodType(target) ? '<img src="http://' + document.domain + '/skin/resources/icon_' + Pillage.targetGetTradegoodType(target) + '.gif" style="height:14px; vertical-align:middle; margin-'+IkaRTL.txtRight+':4px;"/> ' : '');
			html +=			(spies.length > 0 ? '<a href="http://' + document.domain + '/index.php?view=city&id=' + target.id + '">' : '') + nameWithCoords + (spies.length > 0 ? '</a>' : '') + 
							(Pillage.targetIsOccupied(target) ? ' <img src="http://' + document.domain + '/skin/img/island/besatzung_rot_cursor.gif" style="vertical-align:middle; height:18px;"/>' : '') + 
							(Pillage.targetIsInactive(target) ? ' (i)' : '') +
						'</td>';
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'CityLevel', "City Level")+'" style="text-align:center">' + Pillage.targetGetCityLevel(target) + '</td>';
			// garrison
			var garrisonHtml = typeof(target.garrison) != 'undefined' ? target.garrison.html : false;
			html += '<td style="text-align:center;" class="pillageHelperTargetsOverviewGarrison">' + 
						((typeof(target.militaryScore) != 'undefined' && target.militaryScore == 0) ? '-' : 
							(garrisonHtml ? 
							 		(garrisonHtml.match(/class="count">[1-9]/) ? '<img src="http://' + document.domain + '/skin/layout/shield-icon2.gif" style="height:14px; vertical-align:middle;"/>' : '-')
									: '?'
							) + 
							(garrisonHtml ? '<div class="pillageHelperTargetsOverviewGarrisonDetails">'+IkaTools.getText('pillageHelper', 'Updated', "Updated")+': ' + Pillage.targetGetGarrisonLastUpdatedString(target) + 
								(garrisonHtml.match(/class="count">[1-9]/) ? '<br/><br/>' + garrisonHtml : '') + 
								'</div>' : '')
						) +
					'</td>';
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'Wall', "Wall Level")+'" style="text-align:center">' + Pillage.targetGetWallLevel(target) + '</td>\
						<td title="'+IkaTools.getText('pillageHelper', 'Mortars', "Mortars Needed")+'"  style="text-align:center">' + Pillage.targetGetMortarsNeeded(target) + '</td>\
						<td title="'+IkaTools.getText('pillageHelper', 'Port', "Port Level")+'"  style="text-align:center">' + Pillage.targetGetPortLevel(target) + '</td>';
			// spies
			html += '	<td title="'+IkaTools.getText('pillageHelper', 'SpyCountIn', "Number of spies in")+' ' + target.cityName + '" style="text-align:center;">';
			var numSpiesTotal = 0;
			for(var x in spies)
			{
				numSpiesTotal += (spies[x].count != undefined) ? spies[x].count : 0;
			}
			html += numSpiesTotal > 0 ? numSpiesTotal : '-';
			// resources
			var resourcesUpdatedString = Pillage.targetGetResourcesLastUpdatedString(target);
			for(var z = 0; z < Pillage.resourceTypes.length; z++) {
				var type = Pillage.resourceTypes[z];
				var available = Pillage.targetGetResourceAvailable(target, type);
				html += '<td title="'+IkaTools.getText('pillageHelper', 'LastChecked', "Last checked")+': ' + resourcesUpdatedString + '" style="text-align:center;" id="pillageHelperTargetResource' + type + '_' + target.id + '">' + (available > 0 ? IkaTools.addCommas(available) : (resourcesUpdatedString == '?' ? '?' : '-')) + '</td>';
			}
			// ships
			var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
			html += '<td title="'+IkaTools.getText('pillageHelper', 'LastChecked', "Last checked")+': ' + resourcesUpdatedString + '" style="text-align:center; font-weight:bold;" id="pillageHelperTargetOverviewShips_' + target.id + '">' + (resourcesUpdatedString != '?' ? Math.ceil(totalAvailable / 500) : (resourcesUpdatedString == '?' ? '?' : '-') ) + 
					'</td>';		
			// travel time
			function convertMsToTimeStr(ms) {
				var seconds = Math.round(ms / 1000);
				var minutes = Math.floor(seconds / 60);
				var hours = Math.floor(minutes / 60);
				minutes -= hours * 60;
				return (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'm ' : '');
			}
			function getTravelTimesForAllCitiesAsHtml() {
				var cities = IkaTools.getCities();
				var html = '<div class="targetsOverviewTravelTimes">';
				for(var i = 0; i < cities.length; i++) {
					var time = IkaTools.getTravelTime(target.islandX, target.islandY, IkaTools.cityGetIslandX(cities[i]), IkaTools.cityGetIslandY(cities[i]));
					html += '<a href="javascript:void(0);" title="Go to ' + cities[i].name + '" name="' + cities[i].id + '">' + cities[i].name + ' - ' + convertMsToTimeStr(time) + '</a>';
				}
				return html +'</div>';
			}	
			var travelTime = IkaTools.getTravelTime(target.islandX, target.islandY, IkaTools.cityGetIslandX(), IkaTools.cityGetIslandY());
			html += '	<td class="travelTime"><div style="position:relative; height:1em; overflow:visible;">' + convertMsToTimeStr(travelTime) + getTravelTimesForAllCitiesAsHtml() + '</div></td>';	
			// tools
			html += '	</td>\
						<td style="text-align:'+IkaRTL.txtRight+';">'
							html += Pillage.targetGetIslandId(target) ?
									'	<a href="http://' + document.domain + '/index.php?view=island&cityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '"><img src="http://' + document.domain + '/skin/layout/icon-island.gif" style="height:16px;" title="'+IkaTools.getText('interface', 'ViewCityIsland', "View city on its island")+'"/></a>' :
									'	<img src="http://' + document.domain + '/skin/layout/icon-island.gif" style="height:16px;" class="disabled" title="'+IkaTools.getText('pillageHelper', 'ViewNoIslandInfo', "Unable to view island because its ID is not yet known")+'"/>';
			// missions
			html += ' <a href="http://' + document.domain + '/index.php?view=spyMissions&id=' + target.id + '" title="'+IkaTools.getText('pillageHelper', 'Mission', "Mission")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/layout/icon-mission.gif" style="height:14px;"/></a>';
			// pillage
			html += ' <a href="http://' + document.domain + '/index.php?view=plunder&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="'+IkaTools.getText('pillageHelper', 'Pillage', "Pillage")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/actions/plunder.gif" style="height:14px;"/></a>';
			// blockade
			html += ' <a href="http://' + document.domain + '/index.php?view=blockade&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="'+IkaTools.getText('pillageHelper', 'Blockade', "Blockade")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/actions/blockade.gif" style="height:14px;"/></a>';
			// send spy
			html += Pillage.targetGetIslandId(target) ?
						' <a href="http://' + document.domain + '/index.php?view=sendSpy&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="'+IkaTools.getText('pillageHelper', 'SendSpy', "Send spy to")+' ' + target.cityName + '"><img src="http://' + document.domain + '/skin/actions/espionage.gif" style="height:14px;"/></a>' :
						' <img src="http://' + document.domain + '/skin/actions/espionage.gif" style="height:14px;" class="disabled" title="'+IkaTools.getText('pillageHelper', 'SendNoIslandInfo', "Unable to send spy because island ID is not yet known")+'"/>';
			html += numSpiesTotal == 0 ? 
					'<img src="' + Pillage.icons.trash + '" title="'+IkaTools.getText('pillageHelper', 'RemoveCity', "Remove city from target list")+' (' + target.cityName + ')" style="cursor:pointer;" class="pillageHelperTargetOverviewDeleteImg" name="' + target.id + '" />' : 
					'<img src="' + Pillage.icons.trash + '" title="'+IkaTools.getText('pillageHelper', 'CantRemoveCity', "You still have spies in")+' ' + target.cityName + '" class="disabled"/> '
			html +='	  </td>';
			html += '</tr>';
		}
		html += '</table>';
		$('#pillageHelperTargetsOverview').html(html);
		// add event listeners
		$('img.pillageHelperTargetOverviewDeleteImg').each(function() {
			var targetId = this.name;
			this.addEventListener('click', function() {
				Pillage.deleteTarget(targetId);
			}, false);
		});
		$('#pillageHelperTargetsOverview .targetsOverviewTravelTimes a').click(function() {
			IkaTools.goTo('http://' + document.domain + '/index.php?view=city&id=' + this.name, this.name);
		});
	},
	deleteSpy:function(spyId) {
		var newSpies = {};
		for(var x in Pillage.spies)
			if(Pillage.spies[x].id != spyId)
				newSpies[x] = Pillage.spies[x];
		Pillage.spies = newSpies;
		Pillage.saveSpies();
		Pillage.drawTargetsOverview();
	},
	deleteTarget:function(targetId) {
		var newTargets = {};
		for(var x in Pillage.targets)
			if(Pillage.targets[x].id != targetId)
				newTargets[x] = Pillage.targets[x];

		var newMissions = {};
		for(var y in Pillage.missions)
			if(Pillage.missions[y].target != targetId)
				newMissions[y] = Pillage.missions[y];

		Pillage.targets = newTargets;
		Pillage.saveTargets();

		Pillage.missions = newMissions;
		Pillage.savewMissions();

		Pillage.drawTargetsOverview();
	},
	formatDate:function(month, day, year, hour, minute) {
		var str = Pillage.config.dateFormat;
		return str.replace(/M/, month).replace(/D/, day).replace(/Y/, year).replace(/H/, hour).replace(/m/, minute);
	},
	goTo:function(url, cityId) {
		IkaTools.goTo(url, cityId);
	},
	getBoolConfig:function(key, bool) {
		bool = typeof(bool) == 'undefined' ? Pillage.config[key] : bool;
		if(bool)
			return IkaTools.getVal('config.' + key) == 'no' ? false : true;
		else 
			return IkaTools.getVal('config.' + key)  == 'yes' ? true : false;
	},
	targetGetMortarsNeeded:function(target) {
		if(Pillage.targetGetWallLevel(target) == '?')
			return '?';
		else if(target.wallLevel == 0) 
			return 0;
		else if(target.cityLevel < 5)
			return target.wallLevel < 4 ? 3 : 4;
		else if(target.cityLevel < 10)
			return target.wallLevel < 4 ? 5 : (target.wallLevel < 10 ? 10 : 12);
		else // city level 10+
			return target.wallLevel < 5 ? 7 : (target.wallLevel < 10 ? 14 : 18);
	},
	getSpiesByTargetId:function(targetId, cityId) {
		cityId = typeof(cityId) == 'undefined' ? false : cityId;
		var spies = [];
		for(var spyId in Pillage.spies) {
			if((Pillage.spies[spyId].targetId == targetId && !cityId) || (Pillage.spies[spyId].targetId == targetId && Pillage.spies[spyId].cityId == cityId))
				spies.push(Pillage.spies[spyId]);
		}
		return spies;
	},
	getSpyById:function(spyId) {
		return typeof(Pillage.spies[spyId]) == 'object' ? Pillage.spies[spyId] : false;
	},
	getTargetById:function(targetId) {
		return typeof(Pillage.targets[targetId]) == 'object' ? Pillage.targets[targetId] : false;
	},
	getTimeSinceString:function(timeStart) {
		var start = new Date(timeStart.month+' '+timeStart.day+', '+timeStart.year+' '+timeStart.hours+':'+timeStart.minutes+':'+timeStart.seconds);
		var timeEnd = Pillage.getTimeObjectFromString($('#servertime').text());
		var end = new Date(timeEnd.month+' '+timeEnd.day+', '+timeEnd.year+' '+timeEnd.hours+':'+timeEnd.minutes+':'+timeEnd.seconds);
		var diff = Math.floor((end.getTime() - start.getTime()) / 1000);
		var days = diff > 60*60*24 ? Math.floor(diff / (60*60*24)) : 0; 
		var hours = diff > 60*60 ? Math.floor((diff - days * 60 *60 * 24) / (60*60)) % 60 : 0; 
		var minutes = Math.floor((diff - days * 60 * 60 * 24 - hours * 60 * 60) / 60); 
		
		if(diff < 60) 
			return diff+'s';
		else 
			return (days > 0 ? days + 'd ' : '').toString() + (hours > 0 ? hours + 'h ' : '').toString() + (minutes > 0 ? minutes + 'm' : '').toString();		
	},
	getTimeObjectFromString:function(str) {
		return {
			day:str.match(/^0*(\d+)/)[1], 
			month:str.match(/\.0*(\d+)\./)[1],
			year:str.match(/\.(\d{4})/)[1],
			hours:str.match(/\s0*(\d+)/)[1],
			minutes:str.match(/:0*(\d+):/)[1],
			seconds:str.match(/:0*(\d+)$/)[1],
		};
	},
	hideTargetsOverview:function() {
		try { $('#pillageHelperTargetsOverview')[0].style.display = 'none'; } catch(e) {}
	},
	loadData:function() {
		Pillage.spies = (typeof(IkaTools.getVal('spies')) != 'object') ? {} : IkaTools.getVal('spies');
		Pillage.targets = (typeof(IkaTools.getVal('targets')) != 'object') ? {} : IkaTools.getVal('targets');
		Pillage.missions = (typeof(IkaTools.getVal('missions')) != 'object') ? {} : IkaTools.getVal('missions');	
	},
	safehouseDrawTargetResources:function(target) {
		var html = IkaTools.getText('pillageHelper', 'Resources', "Resources")+': ';
		var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
		if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
			if(totalAvailable > 0) {
				html += ' <ul class="resources" style="margin:0; display:inline; margin-'+IkaRTL.txtLeft+':10px;">';
				for(var i = 0; i < Pillage.resourceTypes.length; i++) {
					var type = Pillage.resourceTypes[i];
					var available = Pillage.targetGetResourceAvailable(target, type);
					if(available > 0)
						html += ' <li class="' + type + '" style="display:inline; padding-'+IkaRTL.txtLeft+':33px; margin-'+IkaRTL.txtRight+':10px; font-weight:normal;">' + IkaTools.addCommas(available) + '</li>';
				}
				var shipsNeeded = Math.ceil(totalAvailable / 500);
				html += '</ul> <img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:24px; vertical-align:middle"/> ' + shipsNeeded;
			} else
				html += ' '+IkaTools.getText('pillageHelper', 'none', "none")+' ';
				var time = Pillage.targetGetResourcesLastUpdatedString(target);
			html += '      (' + (time.match(/-/) ? '0s' : time) +' '+IkaTools.getText('pillageHelper', 'lastReport', "since last report")+') </div>';
		}
		try { $('#PillageHelperTargetResources_' + target.id)[0].innerHTML = html; } catch(e) { return html; }
	},
	saveMissions:function() {
		IkaTools.setVal('missions', Pillage.missions);
	},
	saveSpies:function() {
		IkaTools.setVal('spies', Pillage.spies);
	},
	saveTargets:function() {
		IkaTools.setVal('targets', Pillage.targets);
	},
	saveTarget:function(target) {
		Pillage.targets[target.id] = target;
		Pillage.saveTargets();
	},
	showTargetsOverview:function() {
		if($('#pillageHelperTargetsOverview').size() == 0)
			Pillage.drawTargetsOverview();
		$('#pillageHelperTargetsOverview')[0].style.display = 'block';
	},
	tackTargetsOverview:function(tack) {
		if(typeof(tack) == 'undefined' || tack)
			try { $('#advisors li#advResearch')[0].removeEventListener('mouseout', Pillage.hideTargetsOverview, false); } catch(e) {}
		else
			try { $('#advisors li#advResearch')[0].addEventListener('mouseout', Pillage.hideTargetsOverview, false); } catch(e) {}
	},
	targetGetAllianceName:function(target) {
		return typeof(target.allianceName) == 'undefined' ? false : target.allianceName;
	},
	targetIsInactive:function(target) {
		return (typeof(target.inactive) == 'undefined' || !target.inactive) ? false : true;
	},
	targetGetCityLevel:function(target) {
		return (typeof(target.cityLevel) != 'undefined' && target.cityLevel.toString().match(/^\d+$/)) ? parseInt(target.cityLevel) : '?';
	},
	targetGetIslandId:function(target) {
		return (typeof(target.islandId) != 'undefined' && target.islandId.toString().match(/^\d+$/)) ? target.islandId : false;
	},
	targetGetPlayerName:function(target) {
		return trim(typeof(target.playerName) == 'undefined' ? false : target.playerName);
	},
	targetGetPortLevel:function(target) {
		return (typeof(target.portLevel) != 'undefined' && target.portLevel.toString().match(/^\d+$/)) ? parseInt(target.portLevel) : '?';
	},
	targetGetResourcesLastUpdatedString:function(target) {
		if(typeof(target.resources) != 'undefined' && typeof(target.resources.lastUpdated) != 'undefined') {
			try {
				var updated = Pillage.getTimeObjectFromString(target.resources.lastUpdated);

				var month = target.resources.lastUpdated.match(/\.(\d+)\./)[1];
				var day = target.resources.lastUpdated.match(/^\s*(\d+)\./)[1];
				var year = target.resources.lastUpdated.match(/\d\d\d\d/)[0];
				var hour = target.resources.lastUpdated.match(/[^:](\d+):/)[1];
				var minute = target.resources.lastUpdated.match(/:(\d+):/)[1];

				var now = Pillage.getTimeObjectFromString($('#servertime').text());

				var str = Pillage.getTimeSinceString(updated, now);
				return str.match(/^-/) ? '0s' : str;


			} catch(e) { return '?'; }
		} else
			return '?';
	},
	targetGetGarrisonLastUpdatedString:function(target) {
		if(typeof(target.garrison) != 'undefined' && typeof(target.garrison.lastUpdated) != 'undefined') {
			try {
				var updated = Pillage.getTimeObjectFromString(target.garrison.lastUpdated);
				var now = Pillage.getTimeObjectFromString($('#servertime').text());
				return Pillage.getTimeSinceString(updated, now);
			} catch(e) { return '?'; }
		} else
			return '?';
	},
	targetGetRerource:function(target, type) {
		return (typeof(target.resources) == 'undefined'	|| typeof(target.resources[type]) == 'undefined') ? 0 : target.resources[type];
	},
	targetGetResourceAvailable:function(target, type) {
		var onHand = Pillage.targetGetRerource(target, type);
		if(typeof(target.warehouses) == 'undefined')
			return onHand;
		var numProtected = 0;
		for(var i = 0; i < target.warehouses.length; i++) 
			numProtected += (target.warehouses[i] * (Pillage.targetIsInactive(target) ? 80 : 480) + 100);
		return onHand - numProtected > 0 ? onHand - numProtected : 0;
	},
	targetGetResourceAvailableTotal:function(target) {
		var available = 0;
		for(var i = 0; i < Pillage.resourceTypes.length; i++)
			available += Pillage.targetGetResourceAvailable(target, Pillage.resourceTypes[i]);
		return available;
	},
	targetGetShipsNeeded:function(target) {
		var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
		return shipsNeeded = Math.ceil(totalAvailable / 500);
	},
	targetGetWallLevel:function(target) {
		return (typeof(target.wallLevel) != 'undefined' && target.wallLevel.toString().match(/^\d+$/)) ? parseInt(target.wallLevel) : '?';
	},
	targetGetSpies:function(target) {
		var spies = [];
		for(var x in Pillage.spies)
		{
			if(Pillage.spies[x].targetId == target.id)
				spies.push(Pillage.spies[x]);
		}
		return spies;
	},
	targetGetTradegoodType:function(target) {
		return typeof(target.tradegood) == 'undefined' ? false : target.tradegood;
	},
	targetIsOccupied:function(target) {
		return typeof(target.occupied) == 'undefined' ? false : target.occupied;
	},
	targetProcessCityInfo:function(target, doc) {
		doc = typeof(doc) == 'undefined' ? document : doc;
		target.warehouses = [];
		$('#mainview #locations li', doc).each(function(i) {
			if(this.className.match(/warehouse/))
				target.warehouses.push(parseInt($('a', this).attr('title').match(/\d+$/)[0]));
		});
		try { target.wallLevel = $('#position14 a', doc)[0].title.match(/\d+$/)[0]; } catch(e) { target.wallLevel = 0 }
		target.cityLevel = $('#position0 a', doc)[0].title.match(/\d+$/)[0];
		try { target.portLevel = $('#locations li.port a', doc)[0].title.match(/\d+$/)[0]; } catch(e) { target.portLevel = 0 }
		target.occupied = $('.occupation_warning', doc).size() > 0;
		target.islandId = $('#breadcrumbs a.island', doc).attr('href').match(/id=(\d+)/)[1];

		try { target.playerName = $('#information li.owner', doc)[0].innerHTML.replace(/<.+>/, ''); } catch(e) {}
		try { target.allianceName = $('#information li.ally', doc)[0].innerHTML.replace(/<.+>/, '').trim(); } catch(e) {}
		Pillage.saveTarget(target);
	},
	views:{
		city:function() {
			try { var cityId = document.location.toString().match(/id=(\d+)/)[1]; } catch(e) { var cityId = false; }
			if(cityId) {
				var target = Pillage.getTargetById(cityId);
				if(target)
					Pillage.targetProcessCityInfo(target);
			}
		}, 
		island:function() {
			
		},
		militaryAdvisorReportView:function() {
			if($('#troopsReport .contentBox01h .link a.button').size() == 0) {
				var btn = document.createElement('p');
				btn.setAttribute('style', 'text-align:center; margin:1em 0;');
				btn.innerHTML = '<a href="http://' + document.domain + '/index.php?view=militaryAdvisorDetailedReportView&combatRound=1&detailedCombatId=' + document.location.toString().match(/combatId=(\d+)/)[1] + '" class="button">Detailed Combat Report</a>';
				$('#troopsReport .contentBox01h .content').append(btn);
			}
		},
		plunder:function() {
			var target = Pillage.getTargetById($('input[name*="destinationCityId"]').attr('value'));
			try { unsafeWindow.sliders['slider_305'].setActualValue(Pillage.targetGetMortarsNeeded(target)); } catch(e) {}
		},
		safehouse:function() {
  		var isReports = document.location.toString().match(/tab=reports/);
  		if (!isReports)
  		{
  		  try
  		  {
  		    isReports = $('#mainview .yui-nav .selected a').attr('href').toString().match(/tab=reports/);
  		  }
  		  catch (e)
  		  {
  		  }
  		}
			if (!isReports) {
				// clear spies from this city
				var cityId = ExMachina.currentCityId;
				var newSpies = {};
				for(var spyId in Pillage.spies) 
				{
					if(Pillage.spies[spyId].cityId != cityId)
						newSpies[spyId] = Pillage.spies[spyId];
				}
				Pillage.spies = newSpies;
				Pillage.saveSpies();			
				$('#mainview div.spyinfo').each(function(i) 
				{
					 // re-display status 
					if($('div.time', this).size() > 0) {
						$('.status', this).attr('style', 'display:block;');
					}
					try { var targetId = this.innerHTML.match(/view=city&amp;id=(\d+)/)[1]; } catch(e) { var targetId = false; }
					if(targetId) 
					{
						// reload spy data
						var spyId = targetId +'_'+cityId;
						var spy = Pillage.getSpyById(spyId);
						spy = spy ? spy : {id:spyId};
						spy.targetId = targetId;
						spy.cityId = cityId;
  					try { spy.count = Number(trim($('li', this)[1].innerHTML).split(' ')[0]); } catch(e) { spy.count = 1; }
						Pillage.spies[spyId] = spy;

						// reload target data
						var target = Pillage.getTargetById(targetId);
						target = target ? target : {id:targetId};
						var tmp = $('li.city a', this).html();
						target.cityName = tmp.match(/^[^\(]+/)[0];
						target.islandX = tmp.match(/\((\d+),\d+\)/)[1];
						target.islandY = tmp.match(/\(\d+,(\d+)\)/)[1];
						Pillage.targets[targetId] = target;
						var playerName = Pillage.targetGetPlayerName(target);
						if(playerName) {
							var nameLink = $('.city a', this)[0];
							nameLink.innerHTML += " - " + playerName;	
						}
						var allianceName = Pillage.targetGetAllianceName(target);
						if(allianceName) {
							var nameLink = $('.city a', this)[0];
							nameLink.innerHTML += " [" + allianceName + "]";	
						}
						if(Pillage.targetIsInactive(target)) {
							var nameLink = $('.city a', this)[0];
							nameLink.style.color = "#666";
							nameLink.title += " - Inactive";
							nameLink.innerHTML += " (i)";
						}
						$('.city', this)[0].innerHTML += '   <a href="http://' + document.domain + '/index.php?view=island&cityId=' + target.id + '" title="View city on island"><img src="http://' + document.domain + '/skin/layout/icon-island.gif" style="vertical-align:middle;"/></a>';
						var div = document.createElement('div');
						div.id = "pillageHelperTools" + targetId;
						div.setAttribute('style', 'margin-top:1.5em; margin-'+IkaRTL.txtLeft+':1em;');
						var html = '<p align="'+IkaRTL.txtRight+'">\
								<a title="'+IkaTools.getText('pillageHelper', 'Pillage', "Pillage")+'" href="http://' + document.domain + '/index.php?view=plunder&destinationCityId=' + target.id + '"><img src="http://' + document.domain + '/skin/actions/plunder.gif" class="pillageHelperAttackButton"/></a>\
								<a title="'+IkaTools.getText('pillageHelper', 'Blockade', "Blockade")+'" href="http://' + document.domain + '/index.php?view=blockade&destinationCityId=' + target.id + '"><img src="http://' + document.domain + '/skin/actions/blockade.gif" class="pillageHelperAttackButton"/></a>\
							</p><p style="margin-top:-2em;">\
								<img src="http://' + document.domain + '/skin/img/city/building_townhall.gif" style="height:25px; margin-'+IkaRTL.txtLeft+':-20px; vertical-align:middle"/> ' + Pillage.targetGetCityLevel(target) + '\
								<img src="http://' + document.domain + '/skin/layout/stadtmauer_icon.gif" style="height:25px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '\
								<span title="'+IkaTools.getText('pillageHelper', 'Mortars', "Mortars needed")+'"><img src="http://' + document.domain + '/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:25px; margin-'+IkaRTL.txtLeft+':10px; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
								<img src="http://' + document.domain + '/skin/img/city/building_port.gif" style="height:25px; margin-'+IkaRTL.txtLeft+':10px; vertical-align:middle"/> ' + Pillage.targetGetPortLevel(target) + '\
								';
						if(Pillage.targetIsOccupied(target)) {
							html += '<img src="http://' + document.domain + '/skin/img/island/besatzung_rot_cursor.gif" style="margin-'+IkaRTL.txtLeft+':10px; height:30px; vertical-align:middle" title="'+IkaTools.getText('pillageHelper', 'TargetOccupied', "The target city is under military occupation")+'"/> '
						}
						html += '</p>';
						var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
						if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
							html += '<div style="margin-bottom:1em; margin-top:5px;" id="PillageHelperTargetResources_' + target.id + '">';
							html += Pillage.safehouseDrawTargetResources(target);
							html += '</div>';
						}
						div.innerHTML = html;
						$(this).append(div);
					}
				});
				Pillage.saveSpies();
				Pillage.saveTargets();	
			} 
		  else
		  {
		    //Parse reports
		    var table = $('#espionageReports');
		    var reports = $('tr:has(td.money)', table).has('.resultImage img[src*="skin/buttons/yes.gif"]');
		    var rBody;
		    var island;
		    var cityName;
		    var playerName;
		    var targets;
		    var target;
		    var reportId;
		    var report;
		    var btn;
		    var rtype;
		    var ftItem;
		    var combo, option;
		    
		    reports.each(function(i)
		    {
 		      try
 		      {
   		      reportId = reports[i].id.match(/\d+/);
   		      
   		      if (!Pillage.missions[reportId])
   		      {
     		      targets = [];
     		      targetIsland = $('.targetIsland', reports[i])[0].innerHTML.match(/\d+/g);
     		      cityName = $('.targetCity', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      playerName = $('.targetOwner', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      
     		      for (var targetID in Pillage.targets)
     		      {
     		        target = Pillage.targets[targetID];
     		        if ((target.islandX == targetIsland[0]) && (target.islandY == targetIsland[1]))
     		        {
         		      if ((cityName == target.cityName.replace(/&nbsp;/g,' ').trim()) && (playerName == target.playerName.replace(/&nbsp;/g,' ').trim()))
         		      {
         		        targets.unshift(target);
         		      }
         		      else
         		      {
         		        targets.push(target);
         		      }
     		        }
     		      }
     		      
     		      if (targets.length > 0)
     		      {     		      
        		    rBody = $('.report table.reportTable', $(reports[i]).next());
      		      rtype = rBody[0].id;
      		      switch (rtype)
      		      {
      		        case 'resources':
      		        {
      		          if (targets.length > 0)
      		          {
        		          ftItem = $('.reportDetailFooter:eq(1)', $(reports[i]).next());
        		          btn = document.createElement('a');
        		          btn.innerHTML = IkaTools.getText('pillageHelper', 'UpdateData', "Update Data In");
        		          btn.title = IkaTools.getText('pillageHelper', 'UpdateDataTxt', "Updates the selected city spy info with this report");
        		          btn.className = 'button';
        		          btn.href = 'javascript:void(0);';
        		          btn.reportId = reportId;
        		          $(btn).click(function()
        		          {
        		            var reportId = this.reportId;
        		            var combo = $('#'+'pillageHelperRPT_'+reportId);
        		            var resources = $('#tbl_mail'+reportId+' .report table.reportTable td.count');
        		            var target = Pillage.targets[combo[0].value];
          							target.resources = {
          								wood:parseInt($(resources[0]).text().replace(/,|\s|\./g, '')),
          								wine:parseInt($(resources[1]).text().replace(/,|\s|\./g, '')),
          								marble:parseInt($(resources[2]).text().replace(/,|\s|\./g, '')),
          								glass:parseInt($(resources[3]).text().replace(/,|\s|\./g, '')),
          								sulfur:parseInt($(resources[4]).text().replace(/,|\s|\./g, '')),
          								lastUpdated: $('#message'+reportId+' td.date')[0].innerHTML.trim()
          							};
          							Pillage.saveTarget(target);
          							var report = {id: reportId, target: target.id};
          							Pillage.missions[reportId] = report;
          							Pillage.saveMissions(target);
          							$(this).remove();
          							combo.remove();
        		          });
        		          ftItem[0].appendChild(btn);
        		          combo = document.createElement('select');
        		          combo.id = 'pillageHelperRPT_'+reportId;
        		          for (var i = 0; i < targets.length; i++)
        		          {
        		            option = document.createElement('option');
        		            option.innerHTML = targets[i].cityName + ' ['+targets[i].islandX+':'+targets[i].islandY+']';
        		            option.value = targets[i].id;
        		            option.selected = (i == 0);
        		            combo.appendChild(option);
        		          }
        		          ftItem[0].appendChild(combo);          		          
        		        }
      		        }
      		      }
        		  }
      		  }
  		    }
  		    catch(e)
  		    {
  		    }
		    });
		    
		    reports = $('tr:has(td.garrison)', table).has('.resultImage img[src*="skin/buttons/yes.gif"]');
		    reports.each(function(i)
		    {
 		      try
 		      {
   		      reportId = reports[i].id.match(/\d+/);
   		      
   		      if (!Pillage.missions[reportId])
   		      {
     		      targets = [];
     		      targetIsland = $('.targetIsland', reports[i])[0].innerHTML.match(/\d+/g);
     		      cityName = $('.targetCity', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      playerName = $('.targetOwner', reports[i])[0].innerHTML.match(/^[^\(]+/)[0].replace(/&nbsp;/g,' ').trim();
     		      
     		      for (var targetID in Pillage.targets)
     		      {
     		        target = Pillage.targets[targetID];
     		        if ((target.islandX == targetIsland[0]) && (target.islandY == targetIsland[1]))
     		        {
         		      if ((cityName == target.cityName.replace(/&nbsp;/g,' ').trim()) && (playerName == target.playerName.replace(/&nbsp;/g,' ').trim()))
         		      {
         		        targets.unshift(target);
         		      }
         		      else
         		      {
         		        targets.push(target);
         		      }
     		        }
     		      }
     		      
     		      if (targets.length > 0)
     		      {     		      
  		          ftItem = $('.reportDetailFooter:eq(1)', $(reports[i]).next());
  		          btn = document.createElement('a');
  		          btn.innerHTML = IkaTools.getText('pillageHelper', 'UpdateData', "Update Data In");
  		          btn.title = IkaTools.getText('pillageHelper', 'UpdateDataTxt', "Updates the selected city spy info with this report");
  		          btn.className = 'button';
  		          btn.href = 'javascript:void(0);';
  		          btn.reportId = reportId;
  		          $(btn).click(function()
  		          {
  		            var reportId = this.reportId;
  		            var combo = $('#'+'pillageHelperRPT_'+reportId);
  		            var target = Pillage.targets[combo[0].value];
        		      var garrison = $('#tbl_mail'+reportId+' td.report');

                  target.garrison = {
  									html:'', 
     								lastUpdated: $('#message'+reportId+' td.date')[0].innerHTML.trim()
  								};
  								garrison.each(function() {
  									target.garrison.html += this.innerHTML;
  								});    							

    							Pillage.saveTarget(target);
    							var report = {id: reportId, target: target.id};
    							
            			Pillage.missions[reportId] = report;
            			Pillage.saveMissions(target);
    							$(this).remove();
    							combo.remove();
  		          });
  		          ftItem[0].appendChild(btn);
  		          combo = document.createElement('select');
  		          combo.id = 'pillageHelperRPT_'+reportId;
  		          for (var i = 0; i < targets.length; i++)
  		          {
  		            option = document.createElement('option');
  		            option.innerHTML = targets[i].cityName + ' ['+targets[i].islandX+':'+targets[i].islandY+']';
  		            option.value = targets[i].id;
  		            option.selected = (i == 0);
  		            combo.appendChild(option);
  		          }
  		          ftItem[0].appendChild(combo);          		          
  		        }
      		  }
  		    }
  		    catch(e)
  		    {
  		    }
		    });
		    
		  }
		},
		safehouseMissions:function() {
			if(!Config.get('showMissionGold')) GM_addStyle('#safehouseMissions #mainview ul#missionlist li.gold { display:none; }');
			if(!Config.get('showMissionResearch')) GM_addStyle('#safehouseMissions #mainview ul#missionlist li.research { display:none; }');
		},
	},
	icons:{
		magnifier:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH5SURBVDjLpZK/a5NhEMe/748kRqypmqQQgz/oUPUPECpCoEVwyNStIA6COFR33boIjg6mg4uL0k0EO1RFISKImkHQxlbQRAsx0dgKJm/e53nunnOwViR5leJnuZs+973jHBHB/+D/ah7X2LXWloilyMw5YgtD3CDiBWN4Zno8bQcJHBFBucauZfsolZDCru0OfFcAAUISrLZDfPzSKxuiibOT+T6JCwDMtrQzYQvZHQ5Cw2h3GK0OI9AWBzJJZFOxgtJUGpTABQAiLu5OOviuGIEWkBUwC7pasNZj7N2ThNJUjBQY4pznAoEWsBWwxU+JFXSVRTzmQWvKRR5RG4KVGMgKrAVYflexAAugDCEygdbUCI2F7zobk7FZY76DIDQgrT9HCwwt1FsBhhIu4p4D3kiS8B0MJz28ftfGSPfl8MPLxbGBAqVpptbslJc+fEPMA7JDPrIpH3FX8LzaROdrE5O51jalgid3Lh4b6/sDALh6971riErGcFET58gwDPGndG9JT6ReHcwfPorGygu8rdxvGxMeP3XtzcofgigWZ0/EtQ7n0/sOTe0/Mo7V5WeoVu61z1yvZzZX+BsnZx9opYLpevXp7eXKIrL5UWit0n0r/Isb50bjRGreiyWmgs76lfM31y5tSQAAc6czHjONXLi13thygih+AEq4N6GqMsuhAAAAAElFTkSuQmCC',
		spy:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABCFBMVEX///9ycnJmZmZQUlRKSkoqO1AzMzNLV2BAQEBbW1s7PkBmZmZQUlRAQEA6OjpQUlRKSkpmZmZbW1tQUlRCUFz/iBNbW1s1Oj1KSko8PT46OjpcRTdbW1tQVFk8PT5bW1txV0ZQUlRKSko8PT46Ojr/0F3/xlv/v0//vkv6tE3iq1PoqEv/oivJoWf/liG2mFG5jk6ph3DleyaAiJCFhYWOgnt+goacfE/Fby2dd0XIbCKTeE14eHhzeX5ycnKAbk1zamNpaWmMYz9haW9mZmZjZmprYVVYYWlbW1tMXnRLV2BQVFlKSkpFS1FER0hMQDlAQEA+QUc8PT46OjoqO1AxNTszMzMaK0ckQyxyAAAAWHRSTlMAERERERERMzNEZnd3d3eIiJmZmZmqqqq7u7vM3d3d7u7u7u7u////////////////////////////////////////////////////////////////////WlH2oAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACp0RVh0Q3JlYXRpb24gVGltZQBEaSA5IE1yeiAyMDA0IDIzOjM1OjAzICswMTAw5cKdqgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAACeSURBVBiVY2DACrhlPBSF2RB8QTsXDx8/ATif0dHFw9s30I8XJsDk4uphbmAZqgw3wdFNU0tN118cJiDk7OQZbh8iDTeDWcRI21pVXxRhC7uDnoa6jgIrXIDf2dTCytCLC8bn9DAzM3a39QvggAqIuZiZ2Jh4+wRLQgXkPexs7Ey8/cJUoAKyPh4uHiY+QXABFh4JJT8lOSk+JO8hAADVTReg4JziyQAAAABJRU5ErkJggg%3D%3D',
		spy2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH2AQPDg46zUtbQgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAALGSURBVHjabVJbSJNhGH7+g9uc2zxsOreZS8ScEKmkICoUFkFBEkRE3WX3XXahXmoQBkXQdUU3YpdFhWBJetFNuc2keWg6dSd33v79O/7f32ewaHMvvHwv3/e8D+/7fA+Diujvu9Sgb1XO1arUNxKpVH0sGtn0Hh7MRUPBBfqcrcTzlRdFJvli35O7G43EcKbHBpkwZ4WU+Jpl1RlCxLeVeKZUjAxfa1JoJH0yIW5O3J9gCJFhdziwsryMbZcLRkurRAjZqTc0jG8717dKfWypELLhdzlR2uro7GTETBb+QADew0PkcznUN+phsli53v7z3RFvaKHqChkx1X7z9h149vbA8zxEMY0ahQIW62l0dCmh0dRh3f4D0UiY+Z+AKxV6g6ndaV8bSgtJBIIBqNRaMKSII78XYf8uXL9cUsB7sARIDyjcX6kFpqanW47P+cfjsvDzqZzbeSnH7XPyk4dX5Pln92RLq3kVVeKfBrMzM0ccpzGFRA7pZByhwB7iYT9ujVnx6oMbzW3WeDWCsm80mYzLju0CRmzbqNNqMfvGi0ReCVNHHzbdny5QSA3NQlUNdI3GcwZD/aS5s5f5+NmJ/ZgW3zaCaDaa4KTi7Wy6FSzDtsiy8gvlKJwg4Dh28eLl660bTjtiggxG1Yig3w+f1wM1FXRweBTZbGGAY0j/4ODQksfjFspWOGXt6gnQhkw2Q91HIBXzSMQj0Oqa0Dc4BIu5DTZbN5xr9qurK4vvactAGUFRKvBHwSAadI347XbB56sFkXkYze3ICGk41r4jHk8iEgqB51S6Eyvki0SZSiZGVbVqJhzyQSI1dFOZgjlkM7m/BsuIIuKxGNJpQVXIi4/KJkgnwpNU5N19SXoupASVIByAZTnIMqHTSSgWi9SdxwRRcCwpc2NlWKg9pijZV0ARoJkGozzOAlWW8Lx6S6msGyuB/wDcr0r2Xd/+igAAAABJRU5ErkJggg%3D%3D',
		trash:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC',
		refreshSmall:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII%3D',
		loading:'data:application/force-download;base64,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%3D%3D',
		checkmark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC',
	},
	resourceTypes:['wood', 'wine', 'marble', 'glass', 'sulfur'],
}

Librarian = {
	init:function() {
		Librarian.loadResearches();
		if(typeof(Librarian.views[IkaTools.getView()]) == 'function')
			Librarian.views[IkaTools.getView()]();
	},
	research:function() {
		this.name;
		this.field;
		this.effect;
		this.isKnown;
	},
	getResearchByName:function(name) {
		for(var i = 0; i < Librarian.researches.length; i++)
			if(Librarian.researches[i].name == name)
				return Librarian.researches[i];	
		return false
	},
	saveResearch:function(research) {
		var found = false;
		for(var i = 0; i < Librarian.researches.length; i++) {
			if(Librarian.researches[i].name == research.name) {
				Librarian.researches[i] = research;	
				found = true;	
			}
		}
		if(!found) 
			Librarian.researches.push(research);
		Librarian.saveResearches();
	},
	loadResearches:function() {
		Librarian.researches = (typeof(IkaTools.getVal('researches').length) !== 'undefined' && IkaTools.getVal('researches').length > 0) ? IkaTools.getVal('researches') : new Array();
	},
	saveResearches:function() { 
		IkaTools.setVal('researches', Librarian.researches);
	},
	views:{
		researchDetail:function(root) {
			try {
				root = typeof(root) == 'undefined' ? document.body : root;
				var name = $('td', $('#mainview .contentBox01h .content table tr', root)[1]).eq(1).text();
				var research = Librarian.getResearchByName(name);
				if(!research)
					var research = new Librarian.research();					
				research.name = name;
				research.field = $('td', $('#mainview .contentBox01h .content table tr', root)[0]).eq(1).text();
				var desc = $('td', $('#mainview .contentBox01h .content table tr', root)[2]).eq(1).text();
				try { research.effect = desc.match(/:(.+?)$/)[1]; } catch(e) {
					try { research.effect = desc.match(/\.\s*([^\.]+?)$/)[1]; } catch(e) { research.effec = '?'; }
				}
				try { research.completeIn = $('td', $('#mainview .contentBox01h .content table tr', root)[3]).eq(1).text().replace(/\(.+\)/, '').replace(/h\s/, ':').replace(/m\s\d+s/, ''); } catch(e) { research.completeIn = '' }
				Librarian.saveResearch(research);
			} catch(e) { alert(e); return false; }
		},
		researchOverview:function(root) {
			root = typeof(root) == 'undefined' ? document.body : root;
			GM_addStyle(' \
				#mainview .buildingDescription { min-height:inherit; margin-bottom:20px; }\
				#mainview .buildingDescription h1:first-child { height:40px; width:110%; margin-'+IkaRTL.txtLeft+':365px; }\
				#mainview .buildingDescription h1:first-child + p { margin-'+IkaRTL.txtLeft+':170px; margin-'+IkaRTL.txtRight+':0; }\
				#mainview .contentBox01h { position:relative !important; float:none !important; }\
				#mainview .contentBox01h hr { display:none; }\
				#mainview .contentBox01h .content ul { list-style-type:none !important; } \
				#mainview .contentBox01h .content ul li { margin-bottom:.5em; list-style-type:none !important; } \
				#mainview .contentBox01h .content ul li a:hover * { text-decoration:underline !important; } \
				#mainview .contentBox01h .content ul li.unexplored * { color:#B18F61 !important; } \
			');
			function drawResearches() {
				$('#mainview .contentBox01h .content ul li', root).each(function() {													 
					this.style['float'] = IkaRTL.txtLeft;
					this.style.width= "100%";
					var name = $('a', this).attr('title');
					if(this.className == 'unexplored') {
						$('a', this).attr('style', 'color:#B18F62;');	
						this.style.color = '#B18F62';
					}				
					var research;
					if(research = Librarian.getResearchByName(name)) {
						var html = $('a', this).html();
						html = html.match(/<span/) ? html.match(/<span\sclass="researchLink".+?>(.+?)<\/span>/)[1] : html;
						$('a', this)[0].innerHTML = ('\
							<div style="width: 150px; float:'+IkaRTL.txtLeft+'; margin-'+IkaRTL.txtRight+':2em;">' + html + '</div>\
							<div style="width: 70px; float:'+IkaRTL.txtLeft+'; margin-'+IkaRTL.txtRight+':2em;">' + (this.className == 'explored' ? '<span style="font-size:0;"> </span>' : research.completeIn)+ '</div>\
							<div style="margin-'+IkaRTL.txtLeft+':270px; margin-'+IkaRTL.txtRight+':30px;">' + research.effect + '</div>\
						');
					}
				});
			}
			drawResearches();
		}
	},
	
}

SplitPersonalities = {
	init:function() {
		SplitPersonalities.military();
		SplitPersonalities.research();
		SplitPersonalities.diplomat();
		
	},
	splitAdviser:function(id, leftTitle, rightTitle) {
		var original = document.getElementById(id).getElementsByTagName('a')[0];
		var copy = original.cloneNode(false);
		copy.setAttribute('style', "width:51px; height:108px; position:absolute; background:none; top:0; '+IkaRTL.txtLeft+':0;");
		document.getElementById(id).appendChild(copy);
		copy.title += leftTitle ? " (" + leftTitle + ")" : '';
		original.title += rightTitle ? " (" + rightTitle + ")" : '';
		return [original, copy];
	},
	military:function() {
		var tmp = SplitPersonalities.splitAdviser('advMilitary', IkaTools.getText('interface', 'TroopMovements', 'Troop Movements'), IkaTools.getText('interface', 'CombatReports', 'Combat Reports'));
		var original = tmp[0];
		var copy = tmp[1];
		original.href  = original.href.replace(/militaryAdvisorMilitaryMovements/,'militaryAdvisorCombatReports');
	},
	diplomat:function() {
		var tmp = SplitPersonalities.splitAdviser('advDiplomacy', IkaTools.getText('interface', 'Inbox', 'Inbox'), IkaTools.getText('interface', 'Alliance', 'Alliance'));
		var original = tmp[0];
		var copy = tmp[1];
		original.href      = "/index.php?view=diplomacyAdvisorAlly";
	},
	research:function() {
		// find an academy
		var cities = IkaTools.getCities();
		var academy;
		for(var i = 0; i < cities.length; i++) {
			if(academy = IkaTools.cityGetBuildingByType('academy', cities[i])) {
				var tmp = SplitPersonalities.splitAdviser('advResearch', false,  IkaTools.getText('interface', 'Library', 'Library'));
				var original = tmp[0];
				var copy = tmp[1];
				original.href      = "/index.php?view=researchOverview&position=" + academy.position + "&id=" + academy.cityId;
				i = cities.length;
			}
		}
	}
}

var Growler = typeof(Growler) == 'undefined' ? {} : Growler;
if(isChrome) (function() {
	Growler = {
		appName:"Growler",
		noticeTypes:{},
		iconSrc:'',
		addNoticeType:function(typeKey, name, enabled) {},
		register:function(appName, iconSrc) {
			Growler.iconSrc = typeof(iconSrc) == 'undefined' ? '' : iconSrc;
		},
		growl:function(typeKey, title, message) {
			chrome.extension.sendRequest({name: 'growl', title:title, message:message});
		}
	}
})();

var ExternalScripts = {}
//----------------------------- Ikariam Army Helper v0.31 - http://userscripts.org/scripts/show/94360 
ExternalScripts.ArmyHelper = function () {
  //-----------------------------------------------------------------------------
  const languages = {
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "arabic":       { garrison: "القوات العسكرية", advisor: "المستشار", cityLevel: "مستوى دار البلدية", support: "مساعدة",
                      artillery: "المدافع", air: "طيران", line1: "الخط الأمامي", line2: "معركة طويلة المدى", 
                      flankLeft: "الجناح الأيسر", flankRight: "الجناح الأيمن", submarine: "غواصة", reserve: "احتياطي",    
                      phalanx: "كتيبة", steamgiant: "عملاق بخاري", spearman: "حامل الرمح", swordsman: "مبارز", slinger: "مقلاع حجارة",    
                      archer: "رامي سهام", marksman: "رماة", ram: "مدق", catapult: "منجنيق", mortar: "هاون",    
                      gyrocopter: "طائرة مروحية", bombardier: "قاصف", cook: "طباخ", medic: "طبيب",    
                      ship_ram: "سفينة مزودة بقوة دفع", ship_flamethrower: "قاذف اللهب", ship_steamboat: "قوة دفع الطارة",
                      ship_ballista: "سفينة حاملة لسلاح المرجام", ship_catapult: "سفينة مزودة بمنجنيق", ship_mortar: "سفينة هاون", 
                      ship_submarine: "غواصة",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "bosnian":      { garrison: "Garnizon", advisor: "Savjetnik", cityLevel: "Gradski Level", support: "Podrška", 
                      artillery: "Artiljerija", air: "Zračne jedinice", line1: "Prva borbena linija", line2: "Linija borbe sa distance", 
                      flankLeft: "Lijevi bok", flankRight: "Desni bok", submarine: "Pomorska", reserve: "Rezerva", 
                      phalanx: "Kopljanik", steamgiant: "Željezni div", spearman: "Bacač koplja", swordsman: "Mačevalac", slinger: "Praćkar",
                      archer: "Strijelac", marksman: "Sumforni Mušketar", ram: "Ovan", catapult: "Katapult", mortar: "Minobacač", 
                      gyrocopter: "Girokopter", bombardier: "Bombarder", cook: "Kuhar", medic: "Doktor", 
                      ship_ram: "Brod Ovan", ship_flamethrower: "Vatreni Brod", ship_steamboat: "Parni Ratni Brod", 
                      ship_ballista: "Brod Kopljar", ship_catapult: "Brod Katapult", ship_mortar: "Brod Minobacač", 
                      ship_submarine: "Podmornica",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "bulgarian":    { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "chinese":      { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "czech":        { garrison: "Posádka", advisor: "Poradce", cityLevel: "Úroveň radnice", support: "Podpora",
                      artillery: "Dělostřelectvo", air: "Letectvo", line1: "První linie", line2: "Druhá linie",
                      flankLeft: "Levé křídlo", flankRight: "Pravé křídlo", submarine: "Ponorka", reserve: "Rezerva",
                      phalanx: "Hoplit", steamgiant: "Parní obr", spearman: "Kopitník", swordsman: "Šermíř", slinger: "Střelec s prakem",
                      archer: "Lukostřelec", marksman: "Střelec", ram: "Beranidlo", catapult: "Katapult", mortar: "Dělo",
                      gyrocopter: "Gyrokoptéra", bombardier: "Balónový bombardér", cook: "Kuchař", medic: "Doktor",
                      ship_ram: "Beranidlová loď", ship_flamethrower: "Plamenometná loď", ship_steamboat: "Parní beranidlo",
                      ship_ballista: "Balistová loď", ship_catapult: "Katapultová loď", ship_mortar: "Dělová loď",
                      ship_submarine: "Ponorka",
                      addSlot: "Přidat jednotky do jednoho pole", removeSlot: "Odebrat jednotky z jednoho pole", fillRow: "Naplnit jednu linii jednotkami",
                      selectUnits: "Vybrat jednotky", assignNone: "Žádné", assignAll: "Všechny", assignField: "Naplnit bojiště",
                      presetsTitle: "Šablony", presetsAdd: "Přidat šablonu", presetsRemove: "Odebrat šablonu", presetsNewName: "Název šablony",
                      optShowTitles: "Zobrazit názvy linií" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "danish":       { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "dutch":        { garrison: "Garnizoen", advisor: "Adviseur", cityLevel: "Stadsgrootte", support: "Ondersteuning", 
                      artillery: "Artillerie", air: "Lucht", line1: "Front linie", line2: "Lange afstands gevechtslinie", 
                      flankLeft: "Linker flank", flankRight: "Rechter flank", submarine: "Duikboten", reserve: "Reserves", 
                      phalanx: "Hopliet", steamgiant: "Stoomreus", spearman: "Speerwerper", swordsman: "Zwaardvechter", slinger: "Steenslinger", 
                      archer: "Boogschutter", marksman: "Zwavel schutter", ram: "Ram", catapult: "Katapult", mortar: "Mortier", 
                      gyrocopter: "Gyrocopter", bombardier: "Bombardier", cook: "Kok", medic: "Dokter", 
                      ship_ram: "Ramschip", ship_flamethrower: "Vuurschip", ship_steamboat: "Schepradram", 
                      ship_ballista: "Ballista Schip", ship_catapult: "Katapult Schip", ship_mortar: "Mortier Schip", 
                      ship_submarine: "Onderzeeër",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "english":      { garrison: "Garrison", advisor: "Advisor", cityLevel: "Town level", support: "Support", 
                      artillery: "Artillery", air: "Air", line1: "Front line", line2: "Long-range battle line", 
                      flankLeft: "Left flank", flankRight: "Right flank", submarine: "Submarine", reserve: "Reserve",
                      phalanx: "Phalanx", steamgiant: "Steam giant", spearman: "Spearman", swordsman: "Swordsman", slinger: "Slinger",
                      archer: "Archer", marksman: "Marksman", ram: "Ram", catapult: "Catapult", mortar: "Mortar",
                      gyrocopter: "Gyrocopter", bombardier: "Bombardier", cook: "Cook", medic: "Medic",
                      ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                      ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                      ship_submarine: "Diving Boat",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "finish":       { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "french":       { garrison: "Garnison", advisor: "Conseiller", cityLevel: "Niveau ville ", support: "Support", 
                      artillery: "Artillerie", air: "Unité aérienne", line1: "Ligne de front ", line2: "Ligne de bataille de longue portée", 
                      flankLeft: "Flanc gauche", flankRight: "Flanc droit", submarine: "Submarine", reserve: "Réserve", 
                      phalanx: "Phalange", steamgiant: "Géant à vapeur", spearman: "Lancier", swordsman: "Épéiste", slinger: "Lance pierre",
                      archer: "Archer", marksman: "Tireur d'élite", ram: "Bélier", catapult: "Catapulte", mortar: "Mortier", 
                      gyrocopter: "Gyrocoptère", bombardier: "Bombardier", cook: "Cuisiner", medic: "Médecin",
                      ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                      ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                      ship_submarine: "Diving Boat",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "german":       { garrison: "Garnison", advisor: "Berater", cityLevel: "Stadtgröße", support: "Unterstützung",
                      artillery: "Artillerie", air: "Luft", line1: "Hauptkampflinie", line2: "Fernkampfreihe", 
                      flankLeft: "linke Flanke", flankRight: "rechte Flanke", submarine: "U-Boot", reserve: "Reserve",
                      phalanx: "Hoplit", steamgiant: "Dampfgigant", spearman: "Speerträger", swordsman: "Schwertkämpfer", slinger: "Steinschleuderer",
                      archer: "Bogenschütze", marksman: "Schwefelbüchsen-Schütze", ram: "Ramme", catapult: "Katapult", mortar: "Mörser",
                      gyrocopter: "Gyrokopter", bombardier: "Bombardier", cook: "Koch", medic: "Arzt",
                      ship_ram: "Rammschiff", ship_flamethrower: "Feuerschiff", ship_steamboat: "Schaufelradramme",
                      ship_ballista: "Ballistaschiff", ship_catapult: "Katapultschiff", ship_mortar: "Mörserschiff",
                      ship_submarine: "Tauchboot",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "greek":        { garrison: "Φρουρά", advisor: "Σύμβουλος", cityLevel: "Επίπεδο Πόλης", support: "Μονάδες Υποστήριξης",
                      artillery: "Μονάδες Πυροβολικού", air: "Εναέριες Μονάδες", line1: "Κύρια Γραμμή Μάχης", line2: "Γραμμή Μάχης Μεγάλης Εμβέλειας",
                      flankLeft: "Αριστερή Πλευρά", flankRight: "Δεξιά Πλευρά", submarine: "Υποβρύχιες Μονάδες", reserve: "Απόθεμα",
                      phalanx: "Οπλίτης", steamgiant: "Γίγαντας Ατμού", spearman: "Εκτοξευτής Δόρατος", swordsman: "Ξιφομάχος", slinger: "Εκτοξευτής",
                      archer: "Τοξότης", marksman: "Πυροβολητής Θείου", ram: "Κριός", catapult: "Καταπέλτης", mortar: "Κονίαμα",
                      gyrocopter: "Γυροκόπτερο", bombardier: "Βομβαρδιστικό", cook: "Μάγειρας", medic: "Γιατρός",
                      ship_ram: "Σκάφος(-η) Έμβολο", ship_flamethrower: "Φλογοβόλο(-α)", ship_steamboat: "Σκάφος(-η) Κουπί-Ρόδα-Κριός", 
                      ship_ballista: "Σκάφος(-η) Βαλλιστών", ship_catapult: "Σκάφος(-η) Καταπελτών", ship_mortar: "Σκάφος(-η) Κονιάματος", 
                      ship_submarine: "Βάρκα(-ες) Κατάδυσης",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "hebrew":       { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "hungarian":    { garrison: "Helyőrség", advisor: "Tanácsadó", cityLevel: "Város méret", support: "Támogatás",
                      artillery: "Tüzérségi", air: "Légi", line1: "Frontvonalban", line2: "Lövész vonalban",
                      flankLeft: "Bal szárnyon", flankRight: "Jobb szárnyon", submarine: "Búvárhajó", reserve: "Foglalt",
                      phalanx: "Hoplita", steamgiant: "Gőzóriás", spearman: "Lándzsás", swordsman: "Kardos", slinger: "Parittyás",
                      archer: "Íjász", marksman: "Lövész", ram: "Faltörőkos", catapult: "Katapult", mortar: "Ágyú",
                      gyrocopter: "Gyrocopter", bombardier: "Ballonos bombázó", cook: "Séf", medic: "Felcser",
                      ship_ram: "Törőhajó", ship_flamethrower: "Lánghajó", ship_steamboat: "Evezőkerék hajó",
                      ship_ballista: "Balliszta", ship_catapult: "Katapult hajó", ship_mortar: "Ágyúhajó",
                      ship_submarine: "Búvárhajó",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "italian":      { garrison: "Guarnigione", advisor: "Consulente", cityLevel: "Livello Municipio", support: "Supporto", 
                      artillery: "Artiglieria", air: "Aria", line1: "Prima linea", line2: "Armi a lungo raggio", 
                      flankLeft: "Fianco sinistro", flankRight: "Fianco destro", submarine: "Sottomarino", reserve: "Riserve",
                      phalanx: "Oplita", steamgiant: "Giganti a Vapore", spearman: "Giavellottiere", swordsman: "Spadaccino", slinger: "Fromboliere",
                      archer: "Arciere", marksman: "Tiratore fucile a zolfo", ram: "Ariete", catapult: "Catapulta", mortar: "Mortaio",
                      gyrocopter: "Girocottero", bombardier: "Pallone bombardiere", cook: "Cuoco", medic: "Guaritore",
                      ship_ram: "Nave con Ariete", ship_flamethrower: "Nave lanciafiamme", ship_steamboat: "Ariete su Nave a Vapore", 
                      ship_ballista: "Nave con Balestra", ship_catapult: "Nave con Catapulta", ship_mortar: "Nave con Mortaio", 
                      ship_submarine: "Sottomarino",
                      addSlot: "Aggiungi unità ad uno slot", removeSlot: "Rimuovi unità ad uno slot", fillRow: "Riempi una linea con le unità",
                      selectUnits: "Seleziona unità", assignNone: "Nessuna", assignAll: "Tutte", assignField: "Riempi campo di battaglia",
                      presetsTitle: "Battaglioni", presetsAdd: "Aggiungi nuovo battaglione", presetsRemove: "Elimina battaglione", presetsNewName: "Specifica il nome del battaglione che vuoi salvare",
                      optShowTitles: "Visualizza il titolo delle linee di battaglia" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "norwegian":    { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "korean":       { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "latvian":      { garrison: "Garnizons", advisor: "Konsultants", cityLevel: "Pilsētas līmenis", support: "Palīdzība",
                      artillery: "Artilērija", air: "Gaisa spēki", line1: "Priekšējā līnija", line2: "Tālās kaujas līnija",
                      flankLeft: "Kreisais flangs", flankRight: "Labais flangs", submarine: "Zemūdene", reserve: "Rezervē",
                      phalanx: "Šķēpnesis", steamgiant: "Tvaika milzis", spearman: "Pīķnesis", swordsman: "Paukotājs", slinger: "Metējs",
                      archer: "Lokšāvējs", marksman: "Šāvējs", ram: "Tarāns", catapult: "Katapulta", mortar: "Mīnmetējs",
                      gyrocopter: "Helikopters", bombardier: "Balons bombardieris", cook: "Pavārs", medic: "Ārsts",
                      ship_ram: "Tarāna kuģis", ship_flamethrower: "Ugunsmetējs", ship_steamboat: "Dzenrata kuģis",
                      ship_ballista: "Ballistiskais kuģis", ship_catapult: "Katapultas kuģis", ship_mortar: "Mīnmetēja kuģis",
                      ship_submarine: "Zemūdene",
                      addSlot: "Pievienot vienības uz vienu lauciņu", removeSlot: "Noņemt vienības no viena lauciņa", fillRow: "Aizpildīt vienu kaujas rindu ar vienībām",
                      selectUnits: "Izvēlies vienības", assignNone: "Nevienu", assignAll: "Sūtīt visu", assignField: "Aizpildīt kaujas lauku",
                      presetsTitle: "Iepriekšplānots sastāvs", presetsAdd: "Pievienot jaunu sastāvu", presetsRemove: "Dzēst sastāvu", presetsNewName: "Norādiet nosaukumu kaujas sastāvam lai to saglabātu",
                      optShowTitles: "Rādīt kaujas rindu virsrakstus" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "lithuanian":   { garrison: "Įgula", advisor: "Patarėjas", cityLevel: "Miesto lygis", support: "Palaikymas",
                      artillery: "Artilerija", air: "Oro gynyba", line1: "Priekinė mūšio linija", line2: "Ilgo-diapazono kariai",
                      flankLeft: "Kairysis flangas", flankRight: "Dešinysis flangas", submarine: "Povandeninis laivas", reserve: "Rezervas",
                      phalanx: "Falanga", steamgiant: "Garais varomas gigantas", spearman: "Ietininkas", swordsman: "Fechtuotojas", slinger: "Stropuotojas",
                      archer: "Lankininkas", marksman: "Sieros karabinieriai", ram: "Taranas", catapult: "Katapulta", mortar: "Mortyra",
                      gyrocopter: "Girokopteris", bombardier: "Balionas-Bombarduotojas", cook: "Kokas", medic: "Daktaras",
                      ship_ram: "Taranas", ship_flamethrower: "Ugninis laivas", ship_steamboat: "Garais varomas taranas",
                      ship_ballista: "Balistinis laivas", ship_catapult: "Laivas su katapulta", ship_mortar: "Mortyrinis laivas",
                      ship_submarine: "Krovininis laivas",
                      addSlot: "Užpildyti laukelius", removeSlot: "Pašalinti karinius vienetus iš laukelių", fillRow: "Užpildyti vieną eilutę kariniais vienetais",
                      selectUnits: "Pasirinkti vienetus", assignNone: "Nė vieno", assignAll: "Visi", assignField: "Užpildyti mūšio laukus",
                      presetsTitle: "Išankstinis nustatymas", presetsAdd: "Įvesti naują išankstinį nustatymą", presetsRemove: "Ištrinti išankstinį nustatymą", presetsNewName: "Nurodykite išankstinio nustatymo pavadinimą išsaugojimui",
                      optShowTitles: "Rodyti mūšio eilutėje pavadinimus" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "pinoy":        { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "polish":       { garrison: "Garnizon", advisor: "Pole bitwy", cityLevel: "Poziom ratusza", support: "Wsparcie",
                      artillery: "Artyleria", air: "Lotnictwo", line1: "Linia frontu", line2: "Linia walki na odległość",
                      flankLeft: "Lewa flanka", flankRight: "Prawa flanka", submarine: "Okręty podwodne", reserve: "Rezerwa",
                      phalanx: "Hoplita", steamgiant: "Gigant", spearman: "Włócznik", swordsman: "Wojownik", slinger: "Procarz",
                      archer: "Łucznik", marksman: "Strzelec", ram: "Taran", catapult: "Katapulta", mortar: "Moździerz",
                      gyrocopter: "Żyrokopter", bombardier: "Bombardier", cook: "Kucharz", medic: "Medyk",
                      ship_ram: "Okręt z taranem", ship_flamethrower: "Okręt z miotaczem ognia", ship_steamboat: "Okręt parowy z taranem",
                      ship_ballista: "Balista", ship_catapult: "Okręt z katapultą", ship_mortar: "Okręt z moździerzem",
                      ship_submarine: "Okręt podwodny",
                      addSlot: "Wypełnij jeden slot", removeSlot: "Opróżnij jeden slot", fillRow: "Wypełnij całą linię",
                      selectUnits: "Wybierz jednostki", assignNone: "Nic", assignAll: "Wszystko", assignField: "Wypełnij pole bitwy",
                      presetsTitle: "Ustawienia", presetsAdd: "Dodaj ustawienie", presetsRemove: "Usuń ustawienie", presetsNewName: "Podaj nazwę ustawienia",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "portuguese":   { garrison: "Guarnição", advisor: "Orientador", cityLevel: "Nível da Câmara", support: "Suporte",
                      artillery: "Artilharia", air: "Aéreo", line1: "Linha de Frente", line2: "Linha de longo alcance", 
                      flankLeft: "Flanco Esquerdo", flankRight: "Flanco Direito", submarine: "Submergível", reserve: "Reserva", 
                      phalanx: "Hoplita", steamgiant: "Gigantes a Vapor", spearman: "Lanceiro", swordsman: "Espadachim", slinger: "Fundeiro",
                      archer: "Arqueiro", marksman: "Fuzileiros", ram: "Aríete", catapult: "Catapulta", mortar: "Morteiro", 
                      gyrocopter: "Giro-cóptero", bombardier: "Balão-Bombardeiro", cook: "Cozinheiro", medic: "Médico", 
                      ship_ram: "Trireme", ship_flamethrower: "Lança-Chamas", ship_steamboat: "Abalroador a Vapor", 
                      ship_ballista: "Barco Balista", ship_catapult: "Barco Catapulta", ship_mortar: "Barco Morteiro", 
                      ship_submarine: "Submergível",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "romanian":     { garrison: "Cazarma", advisor: "Asezarea trupelor pe campul de lupta", cityLevel: "Nivel Oras", support: "Unitati Ajutoare",
                      artillery: "Artilerie", air: "Suport Aerian", line1: "Prima Linie", line2: "Unitati cu raza lunga de Atac",
                      flankLeft: "Flancul Stang", flankRight: "Flancul Drept", submarine: "Submersibile", reserve: "Rezerve",
                      phalanx: "Phalanx", steamgiant: "Gigant pe aburi", spearman: "Aruncator cu sulita", swordsman: "Spadasin", slinger: "Aruncator cu prastia",
                      archer: "Arcas", marksman: "Tragator", ram: "Berbec", catapult: "Catapulta", mortar: "Mortier",
                      gyrocopter: "Girocopter", bombardier: "Bombardier", cook: "Bucatar", medic: "Medic",
                      ship_ram: "Nava-Berbec", ship_flamethrower: "Nava cu Aruncator Flacari", ship_steamboat: "Berbec cu vasla circulara",
                      ship_ballista: "Nava balistica", ship_catapult: "Nava cu catapulta", ship_mortar: "Nava Mortier",
                      ship_submarine: "Submarin",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "russian":      { garrison: "Гарнизон", advisor: "Помощник", cityLevel: "Уровень города", support: "Поддержка", 
                      artillery: "Артиллерия", air: "Авиация", line1: "Линия фронта", line2: "Стрелковые подразделения", 
                      flankLeft: "Левый фланг", flankRight: "Правый фланг", submarine: "Подводные лодки", reserve: "Резерв",
                      phalanx: "Гоплит", steamgiant: "Паровой гигант", spearman: "Копейщик", swordsman: "Мечник", slinger: "Пращник",
                      archer: "Лучник", marksman: "Стрелок", ram: "Таран", catapult: "Катапульта", mortar: "Мортира",
                      gyrocopter: "Гирокоптер", bombardier: "Бомбардировщик", cook: "Повар", medic: "Доктор",
                      ship_ram: "Корабль с тараном", ship_flamethrower: "Огнемётный корабль", ship_steamboat: "Пароход с тараном", 
                      ship_ballista: "Корабль с баллистой", ship_catapult: "Корабль с катапультой", ship_mortar: "Корабль с мортирой", 
                      ship_submarine: "Подводная лодка",
                      addSlot: "Добавить войска в одну клетку", removeSlot: "Убрать войска из одной клетки", fillRow: "Заполнить войсками один ряд",
                      selectUnits: "Выбрать войска", assignNone: "Ничего", assignAll: "Все", assignField: "Заполнить поле боя",
                      presetsTitle: "Закладки", presetsAdd: "Добавить новую закладку", presetsRemove: "Удалить закладку", presetsNewName: "Укажите имя новой закладки для сохранения",
                      optShowTitles: "Отображать названия линий фронта" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "serbian":      { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "slovak":       { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "slovene":      { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "spanish":      { garrison: "Guarnición", advisor: "Asesor", cityLevel: "Nivel de la ciudad", support: "Apoyo", 
                      artillery: "Artillería", air: "Aire", line1: "Línea de combate principal", line2: "Línea de combate a larga distancia", 
                      flankLeft: "Flanco izquierdo", flankRight: "Flanco derecho", submarine: "Submarino", reserve: "Reserva", 
                      phalanx: "Hoplita", steamgiant: "Gigante a vapor", spearman: "Lancero", swordsman: "Espadachín", slinger: "Hondero",
                      archer: "Arquero", marksman: "Fusilero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", 
                      gyrocopter: "Girocóptero", bombardier: "Bombardero", cook: "Cocinero", medic: "Médico", 
                      ship_ram: "Barco-Espolón", ship_flamethrower: "Barco-Lanzallamas", ship_steamboat: "Barco-Espolón a vapor", 
                      ship_ballista: "Barco-Ballesta", ship_catapult: "Barco-Catapulta", ship_mortar: "Barco-Mortero", 
                      ship_submarine: "Submarino",
                      addSlot: "Agregar unidades en un casillero", removeSlot: "Quitar unidades de un casillero", fillRow: "Llenar una fila con unidades",
                      selectUnits: "Seleccionar unidades", assignNone: "Ninguna", assignAll: "Todas", assignField: "Llenar Campo de Batalla",
                      presetsTitle: "Plantilla", presetsAdd: "Agregar Plantilla", presetsRemove: "Eliminar Plantilla", presetsNewName: "Especifica el nombre de la plantilla",
                      optShowTitles: "Mostrar las casillas del campo de batalla" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "swedish":      { garrison: "Garnison", advisor: "Rådgivare", cityLevel: "Stadsnivå", support: "Support",
                      artillery: "Artilleri", air: "Flyg", line1: "Frontlinje", line2: "Distanslinje",
                      flankLeft: "Vänster flank", flankRight: "Höger flank", submarine: "Ubåt", reserve: "Reserv",
                      phalanx: "Hoplit", steamgiant: "Ång-jätte", spearman: "Spjutkastare", swordsman: "Svärdsman", slinger: "Slungare",
                      archer: "Bågskytt", marksman: "Karabinjär", ram: "Murbräcka", catapult: "Katapult", mortar: "Mörsare",
                      gyrocopter: "Gyrokopter", bombardier: "Ballongbombare", cook: "Kock", medic: "Doktor",
                      ship_ram: "Rammskepp", ship_flamethrower: "Eldskepp", ship_steamboat: "Skovelramm",
                      ship_ballista: "Ballistskepp", ship_catapult: "Katapultskepp", ship_mortar: "Mörsarskepp",
                      ship_submarine: "Ubåt",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "turkish":      { garrison: "Garnizon", advisor: "Danışman", cityLevel: "Şehir Boyutu", support: "Destek",
                      artillery: "Topçu", air: "Hava", line1: "Ön Cephe", line2: "Uzun Menzilli Savaş Hattı",
                      flankLeft: "Sol Kanat", flankRight: "Sağ Kanat", submarine: "Submarine", reserve: "Rezerv",
                      phalanx: "Phalanx", steamgiant: "Buhar Devi", spearman: "Mızrakçı", swordsman: "Kılıç", slinger: "Taşçı",
                      archer: "Okçu", marksman: "Tüfekçi", ram: "Şahmerdan", catapult: "Mancınık", mortar: "Topçu",
                      gyrocopter: "Gyrokopter", bombardier: "Balon", cook: "Aşçı", medic: "Doktor",
                      ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                      ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                      ship_submarine: "Diving Boat",
                      addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                      selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                      presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                      optShowTitles: "Show battlefield row titles" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "ukrainian":      { garrison: "Гарнізон", advisor: "Помічник", cityLevel: "Рівень міста", support: "Підтримка", 
                      artillery: "Артилерія", air: "Авіація", line1: "Лінія фронту", line2: "Стрілки", 
                      flankLeft: "Лівий фланг", flankRight: "Правий фланг", submarine: "Підводні човни", reserve: "Резерв",
                      phalanx: "Гопліт", steamgiant: "Паровий гігант", spearman: "Списоносець", swordsman: "Мечник", slinger: "Пращник",
                      archer: "Лучник", marksman: "Карабінер", ram: "Таран", catapult: "Катапульта", mortar: "Мортира",
                      gyrocopter: "Гірокоптер", bombardier: "Бомбардувальник", cook: "Повар", medic: "Лікар",
                      ship_ram: "Корабель з тараном", ship_flamethrower: "Вогнеметний корабель", ship_steamboat: "Пароплав з тараном", 
                      ship_ballista: "Корабель з балістою", ship_catapult: "Корабель з катапультою", ship_mortar: "Корабель з мортирою", 
                      ship_submarine: "Підводний човен",
                      addSlot: "Додати війська в одну клітинку", removeSlot: "Забрати війська з однієї клітинки", fillRow: "Заповнити військами один ряд",
                      selectUnits: "Вибрати війська", assignNone: "Нічого", assignAll: "Все", assignField: "Заповнити поле бою",
                      presetsTitle: "Закладки", presetsAdd: "Додати нову закладку", presetsRemove: "Видалити закладку", presetsNewName: "Вкажіть назву нової закладки для збереження",
                      optShowTitles: "Зображати назви ліній фронту" },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "urdu":         { },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  "vietnamese":   { }
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  };
  var language = languages[getLanguage()];
  if (typeof(language) == 'undefined') {
    language = languages.english;
  }
  
  //-----------------------------------------------------------------------------
  const images = {
    hintTop           : "data:image/png;base64,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",
    hintLeft          : "data:image/png;base64,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",
    hintBottom        : "data:image/png;base64,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",
    hintRight         : "data:image/png;base64,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",
    square            : "data:image/gif;base64,R0lGODlhIwAjAMQXALKehsOsms62p+XKw72rk8uzo/HU0erOyfTW076olPDTz7umkMGrmMGvmOTJwtm/tLejjPfZ2NO6rbmljtvBt/ja2cy7o////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAjACMAAAV14FVRQmmeaKoKD3JF0yXPdG3fM2FIeO/bjMBv6AMIiciaMcmULZvJJ5Qonf6q1h42e9tylccvzit2hstgdPesNrfT7xm5PBfXv3duPru39qd/UIFNg0yFUWxth0gABXEzCQoNjxYDFwcLAJqbnJ2enwAQDhchADs=",
    empty             : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    phalanx           : "data:image/gif;base64,R0lGODlhKAAoAMQAABwNDtina2pHJZloUM9vKvjq42pWTa2in7ltLfrJVkEiC2g4NIpWKtKLNFQwIrCDb4owDm8wDP35gu+WNcy+uj8GA4FMGfipQNexOqtaKayDK+zKPZ5pJ7llFp9CHwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqu4sG+cAHP6SHTOEnd+bkEAc2pUHD1Sg4BY+FZmHbG40ghcACuJ4oU6VhcAb4tKeOwgk8V8SjDYWDRalFmMqGi0vHJJZGQSOBqFnp9fkIleGIWBBwaGAkYDiaIYgRuABwOHJJimh8eiwMPAw2bUg0JFw0WEAQDAwwdpUcbDRsXEwIRAgsOsYdSGrQbtg8RFgYCHQO/RxoEGMMbExwWSh0BDyMG2UcIBBnQ0g0NtwQLDwUUDw6u3eMEwxgTfLdXAgoKDgwGRwMeDQQaYMDQYEIDBB5ELOD3wUk/CBkyIBh4EAECCCYiSYHgAUGGcQDH+SKh8YgFBhwihP7LECGCgmUktxg46UGDTQv4BGgh4VCKA2OM2jw4QGHniJJHDOhDaWEABaJRFKopI8BChAdPD3Ab0XOLA3wODmhFhiSOCANLPhgAgLSh2Q8PPGhUUEEAz7cZIDAQ4aACQ6lmOUQYwRYm4DgL/IoAoOAq17cLFiggoeDvXzWvVFwWw2tLCAA7",
    steamgiant        : "data:image/gif;base64,R0lGODlhKAAoAMQAAJ13UWxKMbCMYUgoGg0IC3FbRcOdcEo4KYZMLi0YDvrw5DkuIzIjGuHOpmQ8JatqM140Gt61gFpGMr8AAPgCAYdiQnVBIkAfCIuLgYtLIZ5cONqPTfxPPh8YFCMkJQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOYkaeaKqmmYM8YhCtdP1BHaFDDtEoM5uQBLkYO54ORqGgUJgcCmy4ylggC4+HUChMnooolQaBjC46gicxwGQoY9VgcZiiLvHVAmOobDANKBZ5KgUNAIgECwUYGAAbJoQoXA8ZGRoFBB0DDB4AkZIkHhpllgYFCRUGBxWhJBkMCAOqBhoIER0VAAcCriIOwBAHBg0RAggbEgScAL4fFtADCBYIAn0apwepBnaE0GUAx4gByAAKGAfNrhBXtAAIBu8Phg0BBWMPGygZEAAG8RbGYXIU4ACJAAwcjNA344GGhxq6tRDwQIAABxUKOLDQZQC7CA1CAujAw0EAhAcG/ziA2O2ZA0QCAEDoggDLggQ4dQloIOBmhxwESLQc0Q6RBowFZCFh0IHBgQMLGKTpMIZfhasWJACoYIEBHW0HuhSQgCdPhgEWbA2Q0MVBgq8JJGTUGIoBO2ESJFgY4GGB3wQHTlZQKAmC1wN5A1jA+TMBAQYJLpgJtfewXgYjDH5o5ezGAI97c42QEMCBgc4fHPAYkMBDHRJQT6MegXBBANgMLM4WcYCBbxKcAiyY3TXBzxE4fmJGjYVAghMLCJSdXWE5CQnDd384MOiEB+2bv5/ADn4BYeRBtUs9gSP97KcLQD3wIEGAgs4IEOWOwB/A2A4FAPADEK6wUsACFoXEkw8E2x0AQV7ZdZbSBZF1FgIAOw==",
    spearman          : "data:image/gif;base64,R0lGODlhKAAoAOZ/APTHjOfk6M+tT8ViIrOvqXFIF8yPTNLNuq6Gbvrqx+LbxotnTuzn1V5USqGVLOvjyqtpPXyvb++XTLB5SsuXYPHs0tc1L/75afzz1IlHLvdoVs3IUf/SQvSLMMulPrKil/z22r2NVdCmbf/3Wt96JvzlafuzO/nHXdrPvubXubBSMNarj/zwhfrlp+i7iv3YaP/9dY2Gd5WVjaOglct0SNTClycPB/7lR8zKxvLduvZ3Z0gTCJdsE04qFMK+tAgDAZEHA/rEaJRWH28oEOPIqPXXrfy4deCjRn5nJPrXVsyYi/7rO/7NTFlDMfu0ave2UzAjDr8HAf/ldoo0GfaqabQ1DP/dPNeZHuK+Qy48P4hxZPykXfXw24lXSKp6JObIUvftXmcyHe3tV1oFBOW3Xd7b3uK0f/jv0/vfg93XSbaafONMOvFWN/HZnimjCEmbM2TVV//7T3xAHOfEYOLCd+K4IvueRaKcofu9RuCqc+G7b9bCIPeBWcbJ29HPzv322SH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjIJ+fgQHKAxniiAYGI2HDAEBBHefFSCGDytKSggomoUgDz6dAWU+o4QKXUBAUVEWOg+rhBU+fp1lClyDZwu5ulG4XRW/yAd3ONU4ZQ8gK0BjNjtj4Bkx0NGDDwogFSg+fURqPzYhFGYULjULvuWHZzgLPfAQMmSYAMFGE1X6EhH48QOCnB5dJlBQoyChQoZ5AAAwkgDACga0LBZa+COMCwNQmtgIk09kIQVQYmTZsaPHlDA2JrRxyYoBlw/wptBcEKOJgRwJMFnE0AIACwFyhjCEJ6IFkR47KBTJAfLXJQBPXpR4gaaNCyFQbKRhgUacFhtD/8KYyRGSEQYnHEZc4HMCBgw0LQTUgfFCjw0RNHZA8dFASIgimRgBsKIXxpYkcWBcOBFEzAUYXn4MGbJjBpcKOLQsgNAigaIzeEaMuNHBjokbcW4s6YBHDBgk8H40IPeHi4KiXgBUOlSEww0mazp0YMPGxBIrS+xscOBARgMZxwwpIFBARPhCRS6A0XDiBR+xGqTAGMHkCPdGDw4wONRCgpMtUuiggxFGOMEHC2DUQUIaDpy3SF3IPBEEFVJowIYFV9RRxRVVDEACGGls4JpFAuzBxxESWADEhgMcccQJVKjHwwrLlQMCCgV4MQUPQhyBxRVriPWFCkmckGMOSyHghdMHKrRIgwo+fmGABx0A4AECIyZ0BgI8eEABDQYIIIAHBtCAx5AD1ABhOWd8gISOBbwpRA9QyOGBG2+0JNIZCnyAwAJhQAFFBHC88QMSIhDHEwZnPCCHAE2IgsMPEqXAkyEhzIGAIBNAYUAIll46CAZkTBBCJinEKUKNogJABgUUVEKADRCIEKqofzxAhwA1CDIDrQhosR+uCkBgQBPHgCADFAsQkcKaFh0gUA8HDELAAiKo4SBPXQgxgRqEcOGDnjyB8MEEZmiBayIMxNBAtevGK0ggADs=",
    swordsman         : "data:image/gif;base64,R0lGODlhKAAoAMQAAMuKdJSLhf/8+21lYlY2L++ylK1qUc/GxfrMrVgnEaFcOxgLBwMAALB6Zm1KQIRZTIBAL00cBCUMAJhkVLirpvTu5sJySjkWBikZFDYhHd6gg0UqI243GiwRA+bd3AAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeZICubEsJbSyLAjzf51vhPOkJh56wIlAJGYzZoHZEOmMBYM9JTbJeR8wjwEUUMKyDR4gBaAoIb2PD2gkzDceCsGavBm4hAPAwACYFKw8aFEIigAVmDRooBhsTBoYiDQ8OEw4EJhoaDo+ZkhkOAAaXIxRefAsDDZIfEhkPBAsbiwUVFQhxGa0fDQ0JHBMbGBAGHAoADRMEYLwIABfHCtMQEQmyVrwABQ3RFgoGFhAJC7wlybIJ4NMJEebnDh8MFwn1Fx0S7yMNALsL+PQS3Cunb1O5BRfocWgXIZ8+AAjsdLgnoaIEgu8mIHggYkGVUPo+PPAigsuAkwE8chTSh0gDgQM1BHjwUCGIPgfKklGg6eGAzwNG3mXAgMHBgVs9fVIYEJLEAApiPAQYwLEpCQgO4n3YsKGD1REdPn3AsABjU4sjypoNWRHjggwQvn5A2EweAQORrBKAYKdjgm1WIfA1MawpAQ0PsskdwUxfCAA7",
    slinger           : "data:image/gif;base64,R0lGODlhKAAoAMQAANKZdRALB45QHVVjjSsYCeqsii4mJUpUdnBLOlItFEkxJvHKqHlSQzE2SZZkUD1GY05HUadzWjshC4ZcSf/vzox7cl49LamksG8+HbmDaBcXGiMoN71qIm56qWxaYAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZDlel6murAoAWdXOtIhxuFDvayL8mARvSCJIEhjMjzgzOJ2aEfI3WSyYJY1Bo9k0GpuSJVKgRLAj7WPQOUA8JQWCMZHo0IHGwcPIACwkCgwGIxIcaBoBCAgGGQ4IhQkWBCJCN1gBAQ4wBS8jGBmAlSJ3RJkML34ZIgRIQqwiEpiKDrUTEwALFgkJlGglmQR9GY5kBRG+v1kBFpsAcxEOCsomMA8MDnQKCoTUJbkFHgPEAAzeKgULABBsFRce3eciuAUZDWxsFgfyIwCdDhsODBhwIMEAfiI6ZVCwYc0BBRIONOBnAcORABoaPGhAQONEeRKSSIKwkYCBBxv5jREg4KAMBSsVND4IAzKAAQAv0y2A4EWlBALMFtSLwIDkgAfyAkhYSmBCBAQKHgg8sO9cACM/8+ihSvWgVawENEjl2pWfUgkBGpKViPDD1QAfNHqA4KRtiabSgNoNFGGCAgLT9opQEE2BhQUvBSuopYFABMQy7C52IFiMp8ojLBQoMAHziM0FPIvoc0ZZCAA7",
    archer            : "data:image/gif;base64,R0lGODlhKAAoAMQAAKiOd6uckGRGMyURDpFbNtCfWU07MRAFBOfe07yxpJlpRUcrHq97U/rscnZVQlhPS3A9KS8sK0oRDG9nZYx+dX1vXePTuP38l6mIQdbFq4VYPjkfFtPViffLiVwwIQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeKDolKQm18EgBLJu+cfskVPAElJLt48HlTr+AwbAaXZ5PDoZwTE0oj4ghICo0vg3Oc0qtliKTSQTd7XQw8AJ8UTaTHgat4SMo+BWABAoMHwMKdiUHHxEDBwR+cAoQCwIOIhBGiB8HnANwcA4aAgajIhuZmgMDC58Mrq+El5okGwsGghgKDoMEHhojHrMkAhsDpAsHAx4LyMDCIgwFAguiC40DErWmC88E0QwGDAQCHsUHGx0i1s8CGoPk4hryFBodXNwlCBZDLQICgwwUPAAAABBBCAU6OJAwQMSAAAgiRszAJYUGPwUYOKDAUYLHjxI8iPTA6UGFiDxi6Az4JmBCAB8bDFBQs6GdK34PzCxQYGCAlmkHKgSoYMpBwFjPYpIjJpOoCAGCDj37YMCDAwcQACwJMqKSgKl8imwcaqyEBLBUhRKcYeDABBISAIAF8ODBBKEVDDxAQGKBpWcJAmSgMKouAAt8uwZ79jKDBQsZEiRAnFiEA3zCBDvOsDlDxGENn1WYDPkxggQVuDoEu8zkZNTt5KoDa2DDBkUjDkBQUMAUWk64hwnKsAEthdsRTKiqVXxqhVWhEy0o1lwYAw3WopcYUBMstWYoFkD4i7YF9wWyy6NYBUFDBvUpHGWEH7+RnRAAOw==",
    marksman          : "data:image/gif;base64,R0lGODlhKAAoAMQAANugX/TWohMKDG5JMikYEVE1KsGObhwuT7F7Ut6wghEXJo9OMEkqHTguL5tvT/7932wvEzUhGW9SR65rL2Q7KYdFGK1/ZaJWHoJdSY5jOsdvTRchN6tdQcx2JUAeCwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZOkET1CubOsCTxxnbm2LFZCg/O2zl04HlnokfsiPZyIEBAIAy4SR9EEml8oCsdshqjcPpDLZBRIGCwVs83i0mQGjIGfbGB7BwIKwWAwOdjUeBAIMfzpRgiwGEYWPBQwUHAYNiyNPCBgIDgOFAqAEDFSXBgAICBkIpg4MEREFjhiXHwCdqBkZDg6RCxocHAlHghIWBQQDEhEDzMcUCxwaTmd2BhgMewYSA5EFsXPP0V1fFMISNwgLFScB2hQUAxkEn6IF4RkUv6E2AxAQBsKMzYtFoACGa/MIRBiVb94rGw0aLDNgrcExBRgVALSAIdYHhQMWvBuw5kcBB+86tQrIKMGBBHgjBNiDxqHkD2zcNihYqSDCRwIlFE7ikETAhog6N4DC6ELUgCTzeCrYoHMprRFupmbUiXHDgasi5ik4cIDrVLJfwX4w6hWt27Rq377doFZEA6pvG5yri8DTSq4nDdT94E+AzxEDVllQS6HCBVKI+dC4urBCB8hhGfijhUEgnhWGJoy5RMEABVAsPKirUIEWahf+IAxuQaCC7NkrJNHBHZQBhkC8SWDYsTf42tdJQgAAOw==",
    ram               : "data:image/gif;base64,R0lGODlhKAAoAMQAACkaEUo5KTQgF5BTNkIpHGpRO7RtS1pHM/jnqpJyTP786dyCUHtdPQYEBKuOYTgsIB8YFBoRDcJ/VBEMCvi1duiMXdawd5dZP2Q3JPTIj1kyD+eib2xEFNeVYKpkQAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vo2cMPs9ucAECDT6J5MIQ4hadiqSzUFo9iew0g5gtDBIDWNwJG7JZRuFQMFAUcPhqIPZIPEGfOJ0oACIABAQYCxQIcBkpCxsVixUdFBUVFB1nCQyYBBObgYMGFVwUTiUeF3hEHqgXGGsCD4IEfwCzgQIYHgsLFQMomhATEBCAwhBrmxMRwwLLnYMDzxgnGgGvAdbX1moNwRHAy8yuggEY5CIath/B1rKvsw8HmNu/3t8Ay7CCGiITAQcf1gceCPjzKkKDBvAKHJwFaKC9b/gI6EsnoAADBxQcBIggAJ4DBAgcdDxwsOSEbyjvusXi8EHNgYAFOlwKdCBAAQuHHHBENmwWuJQDRTDoV0BQgpo2AywrkKHpy0sF1mzsycxntA8k+wWsOTBqQAIOLFgYOpTaQE60/nAMkEBEAYAvAwZjE/eiAwYPqL0a2C2ZML8E2IjoR0BrAIIvtcJjENBarL5p/fpk+UHABw4CCHf7p/jaxBGAPmjg5heZZRGZP1Trq9oV4aApkm0KnSJWCaV5g51WoeFzDGqzeAgfTry48ePIkytfzrxGCAA7",
    catapult          : "data:image/gif;base64,R0lGODlhKAAoAMQAAG5ILZxhMg0FBY5sUEssD8aslCsqK6OLdy0dEzUnHVtKNVY7JkM2JXVxc1NJQm1YRWE1En9OGWJAJUQsHzc4O1o9L1QaG4o2Ikc9NMJ6RFAwIj5ARmJfYB4aGH9WNQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdD1nng17A1AtkoAuFalkMoNBhZMZnnyezONAbTpNgGzFwaEerthKRbLFUMCmoqaSBQjRJvLEDU8xJrl6XPOJogMFKQsATQNvLhoXJQIIJ2wAEhIbBwWUlS0WJAQCJQAig5ATFBscDR6UXysQiiICECgSCgAaBhsbBh0IHQYGmB8RBAkDGQx5EVkKDx4TCaMGCLq5IxgYDCPQER8PANAVAQEGUQoeChjJAAkiuAkd7a8iDgqcIh0POA8IAgIeAcQeHgwGPPjhgds1aAnSTWMw74OABBDIKRigz02HggImLJiwZgGCVxKYceQzQt8AEQE44XQ4icBBgQd4PFwMgEDDBAFrNHyEwK7DBGbvBpS6lGTAgQUdODwYQI4BAwAeFixIOKbCSKlAIvF7wKEABwdNHFCwJmBDAw4MLEDo4JQBNQVw4f5YA0CBhDYAKFAwMFFIgw0ObjZocIAihAklGCRoKzKCYwBOay7AtQRevHkbDHXQkGcEgVyLOwjoQCLXvFFmPyx4t0CdiAS63omApsFtAlckELB7pZiBAtUjJERI0Jp2pBI1nbIj4DnBBF0fEEc/gWBBVBUjn5MuwVw1HwKdaXRPMYF5gPB60qtfz769+/chAAA7",
    mortar            : "data:image/gif;base64,R0lGODlhKAAoAMQAAA4HBTgiGdu+mSUYEXBQN0IlGJFrTLCQcNWiZWhSS5dfMl1FL0c2JzotIVBLTIJZQ1Q5KLB+TkotIGdkZ2s2KVI/NKldS3NKH44+MUQ+PmE6EzA1PHxhRZJ6aC0gGAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3fuElAWs5KkgDBl7pAgkPbQaBaHAvJ1SKBsZgOiNOF4IR4EyyGZ0GhWFkLCeYILDRYAEmiwkFpqgpRI1NpFwIScAwGCQcoDB0HDyIDCxMVTx4QcAMMDQwoBBwIix8eBRIVonMTBiwBAAMDKH8FIhqfrQGzlymEHQ4DAIYoABQiBXELs8QDPSiEBwcZEwJZCEwfyh0JgwcVBh0IAQMe3sYfCFklHQYEFFUWGBTYHwoJe30SEAECBwYRtA2z9p0lFbpSBQQAQIQ3BwmeDEhgAB+BBxAjGnhgqkSCDRscTOjwwdUHDhcKXJhgqduABgQI+0Q4MJCgBANYSkyYmWAjiQuXZHHz0GCBPQUQUjHgkM2cShI0M2QAQ+JTt326eHoggA9BBIjDdEHAN4LATAdgHZTo9sebh6HmGDBY8CAoQYEMHhAY98GB0gwb6jRVxZNBhQUqERDoeYADhAVd1ALeJGLHBwmrSCyo0OCSX0sBFkSIwCBIAQPiQiMwwI1DhA+IPQUgUVnM0wYVLKGtAKgAhJS4d/yh+jjQAI8i1DYY2Ijy3wX7gHhQpYqgSQgXPkAPeXpEZV2S9yEPcD3yCA0CvfWQAHFAhTyvApJQ69cDAA8plsufwb0ywRXebEhocJ+I//8ABijggAQWGEMIADs=",
    gyrocopter        : "data:image/gif;base64,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",
    bombardier        : "data:image/gif;base64,R0lGODlhKAAoAMQAAI9pSmoND2xdSU8HB6yRaosyMPPbo4pFOnNKNSETD8uleQUGBXUwKFQ3Ktq4h4ZZRzcuK6RxTFVGNUwpHbGDVjIhGaBOQ6GKZXAeHYNyV4MYGZk9OZR+XrqYb39bOgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZClmGYeabOueRHQcHfFsEffurNNtwI5huClYOrzkx0EpbCwWx9DgAG4oOmWLWXAWIg6pNGIpUrSsjqJwYBcoYapBwShrImhSxjA7aBgFYWJDFkYPDwJ5Ih0cDIcIDBgKHR0OCgoGFI4PGAyKHwR+hQwIB5OVllQIGEUaCHkCDhoahRoBCAQEapMKFxgBXbd5HB0BGq0BGxcZugoEGQoHA8ABnmgXEQGsBbYWCsyUKQ4A0wzaeRcW2sjeFwIcHAIEDhEDAxgYA3kZ6hhdtgCcpVChi4M9bfrQCFBXrcCvgATiCWD2zN60TwACaHM4AKK7dxcIkDv4ScAvbfke/3S48JFDSA8WE+aREEljgAEPCLAUMDEkAoufREjAp3EAggvweGYIOcFegqAiKpwcwABpBqVI7U2ASuLXPXhXe/6cAIHrhwoJElgEoGIiB3IfJLzi6sHDiAQTeE5sMILCXKgSIlAAICJBBQkCtn7wQLisWREAKPjNmxiBh7+PSwhG0KBuZhcDGiBAMGFBggWfSTSAYLqCgLQJGlRAnXlAgggCWkuoAADABAYTMphtMKGC6OIVDr/mmQCQWQwHGsRuwKH4A9YQOjDY8Ph3aNESJuSdfZsB38d1fyavyxMCoASOzT6wvKpOhAxtPECAn7lzhP8AmMMAcLvB9xR6/wkWICMpFUCAVgWpLaYgffBBGOEIjFkmHQTxXSjCaGft5yELaaERAgA7",
    cook              : "data:image/gif;base64,R0lGODlhKAAoAMQAANGZa6l5VcSxqkxTsaSamykRBhAFAmxgYPr19JlfPjAtVlQ3KnVNNKir5l9q3PG2jVonEkIXCsi/w3MtFO7VzHeE9TEeFys0i/l/eT5HoYp9kUEuJJJDITs9cRkeRgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeO5ChRJ1KubFtKSCzHbm1/R64RxLHdwJbBssgdgsjVgSCQCJJQkabpjCYNDIAW8LAGDYbAY0yheG+WsDagdT0oT2vCkkhsDItFC0B5IMpRCxsBhAwBCS0cCGMYGGZQhmNbDCsFEQl9GH4AUBZZARsbFiwREQUTYmWUSAcLRKIMBaSmBZamSRkSALFpBi21wGC+SBUVTgcWHh0aLMC1YEnFDg4SFQMOFQ3NBcLDQQPFGRnZ0w47K91QAloaFxcDDAfYBAxdJGB6UGIACR4ZHaU0xFiQSsQBAz+iiJnjYUAHhBRiELAEgY0BWVa0HOigbEEBAjMMHmBAMOMDABoOwESYwAECyBiPRDCoI+cBKJZ1JjBIAeiDhgUMVunbZQBnggkTNJyo8qGWUCgECkHgkIDDBAgHJGglIMIAszMzCUFACqFA1q1nSsxM4LFUBAMHBMjlmpbEpUOmEDIRQOBrXYNhF4A5oKHwgAt/SWzIk0aBuAHiECc2KMxxhgGQ3U0W8faAgguXMV/eLCIAhMVFFKjOR1pEAUEHuBUYG6B1UwujPliotRIRaQulSuz2Oxl4BNa2R2yIAAF5chG4E/4NAQA7",
    medic             : "data:image/gif;base64,R0lGODlhKAAoAMQAAFcxJ6NqRt6XYfHr625ILwYEBnlubvnblmNPTZmLiz00M7KmpiUUD45cPUxAQKaYl6B8cAQCK8OzsS0CKyYVSH4JCT4mGcF9UWdfYXJeWrWpCB0eJ4V6etTJyOOzdgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZPl5x+GZbOuSTSofwWvbFuTt6IHcwFJhSBAIeKugclggXC5Go3I5fAYIAAKhMAUyGAUAAMz8bLq3AqMBKCgyCgs6CAhctA5CbX5jEBoBbFh8NhwNFlpabCMLA4QkDwMSAIiADSQUGJePdh0DDxYMiAAkERENGhpzUAIXEgMdEGKDIhEbZx8AqlNGFwEBDx0SsXZ7BRPIFBEiBEpWBBYWCRILHR2/AQcfDMjIy12BYGAGDw/DCWwBAm3ec79yDgwYCeYdCwRfbAWm310NF6QcYODAYRq1DBk+NBGTZc+Uf80UGOBgIMECCQ8SQHhEwskliQQfLFhQziFHJxdE2mCoKHJBggQYOI7QA0iBA3IiMyYwwDGBMER+bOJ0mYDDj0cWHEBAEEoOAwQZJiIAgMABRwVYM8iyUNXngAEJGBTkSQirGAQQIBhIWw0sAwcLYhJyUKEuAAdaESAI1gEUgKKPENStkNRBVQUWP1kA+ciBgsF3HUsc9uAtArJ8HA+u4MCxAw4SJMDEcJPjBgAVxBi2yWHkSwMSZW5YrLcqAno7jSrgIFMEVqiGB3JY6ThBbxEb8AodjgHDZEfHPwSn2Nw5AwMdoovIq0B7C6U7vbdI8FV8CwOY+YQAADs=",
    ship_ram          : "data:image/gif;base64,R0lGODlhKAAoANUAAPnu0KqMce6kXK6nk3NeT6h1SP///W4xEZFJHalZJpWIdYtrU8K1lrVjK8l5T5tSI+RmNqqbg+TculgqEot5Z2I6KP7+5LWvoIlLIVIxIHpGJuLbxXVIN7WEVpVNIJhbNP6NjJlmPsrApDEWC+DTt4tUOcK8qp2bjtTKqdh/fKNRHdTMtahgRM7Hs2JLPurhwPmGNoVaQ1gfCX1CGn9LNqN+Xm5ALNza0/16ftrRsOJ/W3xQMebi4IZQLcrUvu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqLT4UkynEpqkmMtdlaQDinRRmCOob3Igo0RuPIN8qya+IpRBXM43iKYiDAICLz85ChQmfYt+UywQMAIpMQs3jIw3Ux0qDiA4KT4Wl4x/UQydOJ4kFqyiowYtUwEgnp8AAK2ujBaFUCIqHCkgEDIit7etu15QAQgIGh8HFQEbJCQvL8i5rMtPNSMHCSozBzsrLejn18e32FEdIyPOEyMTJi0i+frpLSQDUgEeTJhgY+CBCyYSJrxwYcCAEyciMJDCIMGHDBoOyJjAsGNDiIgIZHgwMUqJBhoqTNBQo6HDhydCuoix48CDAAv+OVmgAkOH/w4FIoBUQMDFgqMFQnyYMeEADBYBnqD4II5FjQA1koaQMYLmjkENEjSA5EBHySYvSiD4EKLAzwIWP/T40CCsCrENbFSgQActgQoPEngI0aEGOQ91H8xYvDjDXl8E/hkOLFecBw3OPGj2MKOCjVJNBijYkoMAhR1hMQROLDaB65QlOqRZIiGCTgYE/rygAfgBht+bfSOwYSNDDAcdcvQtIiKREDO9FriIEML1g+sefi+uUIKGgwgLykYtgoc0gQhCshAYkiNQhBohgKuw8YEFi9csBDigUAN9APQ/MFABgCJUYEUSLzAQQAgalMDCbyEEqFR+ZtERgAtpkFBDDDo1UUMaBx7s0MsPLpRQggPjLbDeDyLooMN4UIi23AAc2MDBAj8kKEQEZQFYx44KMLBcADqwcNaPSdTAwmxINunkk1BG2WQQADs=",
    ship_flamethrower : "data:image/gif;base64,R0lGODlhKAAoANUAAHRELk0nE6mNceufWm9kWJhrTmcyFWc5KPsAAFxekKZaKCgSB/qMjLqskVgzIvlvcNLJq8lmKY1GHLhtU8SylnMJBK9cRZB7Y3g4FIiP255UJJROIbCfg9KckoRHKopjSIhKNBMJBZVYOHpYPrInETMdE8+ETI0DAqtOH+HYtpyVnrddK0E0KLIXBtx8NoZULn1BHEIeDOnhvv+dnsa9n/S7bf9/f5RKMRYQPnp6qyYhJcdnaWFNQLuyos5DOu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQalQlS1KptoMqpINmmq5MpJ3jgMBKSK2dyv4uOoFIbVe7EhcAqhXRYdkIyXTk4ISELCyUxDhQCAoIUBQkJJQYwHiAAAA4XCAgcdgIoHjwHJAAHBw4BMT8WCBajKBskoBUOBrsBNBc+s2ofMAcYoCQVJxUBASAWExOiYSIBu7fIyjExB6oA0g02HYFPKxIxGAYYGMm5nQGMND89DzM24R0NThcRGwYB6ihWYFDlqsSCCxToPWBg44GFHQzSLFGwQkSBARhFrHKgLQYBBvRsgJxxQgeLDzsiLSmgIMIAFy40ruIGooNIBgwXnghRwiAP/5VKGmxY4bLGAQOcQNwosGPHwoU2WrCY+e5CkxcaNLg0UeAoAE0BWBgo4ONBCx4jRrzgdGBEExobYEiQ4GJAjQK6VDlwcIAHjBdp9R7wMOKCDCYXmGFAocBFjQEfPGjYpIrbxgAHNABVImNPgwIwSsBYscGFCQUoUMDI5IEtZhE3VkhLwuGCNAFTN2wIIIGxgg2KYqQLsAiACBEWnuUzwuGD1R8QCDz/8M7Aiqwb1PnT5m8VgOQWQEiUF1nahQtpBPwcFkEBdt1yI6BgNtP4MwEcIFwYQeBHZ29C6GeYEL68sIF7WWUVgQT+YHbAVCBMwEpa8XBQAAD5pCDAB/EYQV7BBZG9J4F2GGwAwAhsjYAFBAU4J8QFIjynhIYjrCYXBszQZQIHp1AgxAcjxPOZi0+k8NkLcmkw1wom/DDOIBcUQMB4URi5oQci+GiEACNsJsiXYIYp5phklmkmEkEAADs=",
    ship_steamboat    : "data:image/gif;base64,R0lGODlhKAAoANUAAGdWSJVtT8Kykah3SjUtJldSUfmvd4RUM82OV66jiK2WddbNrGdIN2czE/nIdHlTOnZubKtaKraEVVQoDsxlLceiZ7tqK/rKh5yMc1dJQJVnQoFaRIt3YsCWYZdPIP/rjXFPPGthW0syIxgSEeWbWVQ6KzgcDIw3Fv+mTDw4NueCON/WtDklGGQ7I2ZHLnM9Gr6kelxAL+KoaHxGIREXHEItIuffvMF+RevjwMq/o5p/Z0dBQIRgPSUjI6CAVO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/QMHi9wusiMikcslk6gQcTsvWrFqZthwEdMJdv+Bf7jQMm5vPs1qJwawUnMTaLKBQOCmCfA5WTBouKT05ZitUZgomDSctIgJWCwIwCzAdhGY+ExMeDTQvA5dLFRcyPgEae2EzDSaMNJoNHh1HSRguIgw3DhcKYTkTLzOBPRkPGQyLEkk7JSAlDBcfBgKhVTAmBzcpGSEQEAUAHQMRMD82HDU86i4gMjIdqVUCMy0tBCk73RAbGdEyCit0sHjwQF2JGC54xGuyQIUDBwh4+MiQb0sNGNIk6EiXIQXBGhJI6PiyYJcDGRIGuDDBIkUBDgwwyDiwgcQFAxkItGARICKY/woIJGg4cACBjAEHXOR7AACABhkXLmgYwYJFCR+gvsB8MADBwwsObrwQUeBbgWYaQIBoxEKEgQ8VDjXBoRbEhmgnEdwIgQHCjr81RNRgwaCDjBgmFH5RsCEljwAGHsqAkcDv3zyCaxQIAeNChwBgbIBIOSDAjVJ2U9DA93cHN2/eOMC4caOMFQ4DeDzosCEGDwQDBPfAt1mftwIEeoyYgOBLgg1EA/jYoFcDCZX3uIXYDiFnDxojTMhC4mWJ6A0Hp0uQoPshAgb4MmzekbzHgbQTIkhQcKMcEw69xTDdBgNoUOBbDujWVE4EPEDCSRrM8IIGNwxAyxI5NNaBBGpB9e2BBg1IEJYFJJaoAm0FblAQCAsp8VwFHdjlQAWVAeNBBBHciGOOLjDAQF0xhPDDhf+tiFAMRAjgQjAz6IijB3WpVcIIOcAwjRUBqMWAgRggkcCSL4QpZo8+ljAQCQYYQIJcSySQwwIDkKCAbUQk8ECYDeTZgo8MxABZmiSg0IFz1SixQAB4tqBlDHYFoIIKKKDgHx9EHOrBDFr+CAIDEdCGwJWUIiGAblESFIEFEfwIWqi1qFjXAXZEoNYGrCqRoasPRECBrBtwUKsSK/CggQYAvKHiBr38qoQOXNYZQKHK/iAAZC1GqwQMMlh7RhAAOw==",
    ship_ballista     : "data:image/gif;base64,R0lGODlhKAAoANUAAP6OhqQKCnBFK/thYf/7+z5Fq9DGpvsBAdadYpuHb2xcXJJuT7mtlKZZJnA5GTEUCgAAgLZzTn2H/GI5KshwNYxIHa9gLFgqFPrIxp1UJb+4qayagYhhSs0CAlEvJVkIA4uRlH5GIt3UsvtCP4J0aZCIv83JzKp5ZoVWMo9RJrxXb6JQHphaN4JPPNM2N55wQZNGKujw88srZHkID6hYRSkeW5qpr+XdurXHzOriv389OPsbGZhZYFFAReLX2+7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqFN4Xm6szVIAUGV2kgKWazQk2lEY2Fos3psMMQdqOYCpOzijQGBjR1BAAHB3Z4eltUJxYrFiUydASFlAQHAD48VSwVGSUSEocjlQMHA5aFN1M3GS+hopOIlYd2mRgGUyIICAoFEgUfpDExpwMxeLlTBr0oLyQ9IYcdGjhzLjguLhtuUgYoKBUvERMTHegbNjwBMDYBNCdUOc8VKCkOD+gdICA6ATpIzOAhr1W4CxNQ5EMXoB+aHj0+9NBFxEAfJp4uXBCA4sKHDgBBKPjwwYOCDaxEGJDTogXFJQsyrEAh4MKDGR1mKFDw4AWC/wwLNiQgBwABjQROGJCoQMHmgwcTHLR4EaInAg7kWlzQEeHFAicGWjDI8eKCgwYsFrxYKwCqjgksWDzwoPFCiBMINkRghaSFAG8JHKzI0GBtCx2IJ3iYQMMnzQgWLDTIwCLJhglihCQQ4MABjMOfaToI4cACiggUUlsgHWKDZaQ/VhpgIMCcYEiTG1CwUCHE4NwhBOyOgMCAiItE4hjf4JoE586/CUvv/Ym0ABYCQkROYeFE5hsMGBhIkCCHiAQWW0Sd/FtyhgrwYQiY/+OGG6UaKmlg0G0z+gRiKKXLBingM1p8pGnkAAocYLFBMT5U4sMfLXAw3gL7ceDaEDls8GtcZw7UNVpaQhhQCQExoLgFfwxoqEEELDBSRA4JpDBZgTg2YMFX9fnggwkmaAACIzQycAINC3hjGQvsRcfjDwzgYAMImRGxAQsbNsHAAvGlEAIgQmxAJXJjzLaBLuAZ98aabLbp5ptwxqlEEAA7",
    ship_catapult     : "data:image/gif;base64,R0lGODlhKAAoANUAAIlNKK6QdLShh8OylP379nBKNq5bJrlkKXJjUB4WD65yS5RtUkIyJ9NpTNTIqOLYuP6ZZ+h5NVVMOWA9LPaFOtOCUZ2IcJJ4YcVkJp4zJ9Slf41bQumTW7SEV9h+OnY7G65/Zt5sKlcxG65cQceXavB0T/28uMZ2NsZHL/asbMZrMalSGv9maNl0L8J4Xv+Lj9tEPZ1TJp1dOuvhwc1uLNJxM8vAotunYf9/hP+sSOC7ire9wXRCI+q8nv9XWe7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQ6DZwc1GinFchCAxiS9znAdB+Ox1g5U3UqEUpIvEYqKIpOhxap1I8XEwNCA3ccM39EeTgmLjY/JBViDwKDdQoaLCYwFkIPAQgTDAqIawKaPhkiIy4yDAyiBQJrNi8mLBkSryIbMiMVIwkbaxo4MAASBQUfPDwVENAFDJZUDjAoBRIfAAIBOgsiChApEL0dAwKPRTNqSQIGLQcSCBo6JBYXFhMTMgAjCws+xDigAMSQARRy3Gh3RMABDCduBMg3YIaDUK8mKNChQYYMFxUK2tgQIQQFOkg6hFjxkMQABK/mIZgp4QAEEzNmaKgAwiGF/xgxaigpE0PFwxMbGEhYKmHBhQ0BQPQgQDXAhg/wgspQ8qCZ0QMrVnhIocECgl+yCGjQ4MBCRhEfQkSgZkTABhsDDAjEcOBhCw4VmDFAIGBHgQSIEVxAYCDCAiQz8CECtYAGgA81aGAIa2AFjwUeYohIrCFFnAOzjNi4MOhBPiEbJgTFgEGzgYEPQ+iOw/sAACxEbIzYgGjAhUcznD6oHIGGAXgtThy4vS3GB4EAABQoEqAE8QcgOv1wsCD1jwEyWrQwquKrdmUTRPDQDnx8gwadBIy4IETAgvpDCDAQDS14YBQPExSA4AQ8DDNEAA2MgMUCMQwiQAOPJWFcLzIYAGDAPiACIJ4QCvAn3HY/uFCChE7k9MAAC4wQAwAy3FWEBSN0YkMDJSzAUBQOHeACBxzQFcAjEDbQxRgWyPAMBBwAaEGEdHkRQAEjQDPiDwJc8GMdxi1QSiJklmnmmWhmEQQAOw==",
    ship_mortar       : "data:image/gif;base64,R0lGODlhKAAoANUAAPv6+rqsj8W6m8/GqJVtUGY1F1IzJIpFG4pcR9/WtQoDAlsuF8Z2OKVVOqpvTCoZEJqJcc9pSvXMkIpUOWlKOGE6KbpcRL1lLJh8ZH1EI3RcSP/npqSOdnREMoZJH8uPZ9OndXo+FqOVfYdGM5lcMrFXIJpgP+maVYg9EplLHrB8YZdWJaqIbD8nHv/6u5VMNraMZo5RJmNCMObfw7eab//wrvbAfEMhDP3cnK+dgW8+H9B/PH5RPX1QMKmSaO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqFQYSEynBMHs+hwIRIGZlducAc4CclObAAzU6zS8OZHNmQEDRDgIvO9FGAYYGhQVBQYUImN3CTwUEwySFz0yFGksGHJqBBMICBQyFYcZPyIRDxN/XAMONx6HBQ8LBSE5PBO5q1OOEwoLBwU3Dw4FBTwdFS0tagIXGQ8GwpY9BR08Bi0PPJtTMyQXDBk3Nx82IBUdE8k8KgUkLCw5WA4pJQwgMHUdBhUG/S0QmNjxwQQCAruYECDRqcSOEApujFD24IECAw9kwJBQQ4BBByy2MGFx4IADBzEurKiw4N8/fwpiGpDggsDCHTtMcFAigFCK/xAkHBC4cEJDzIoxF1DwIQHHhg86OnTwMCDhkAQcdv5AUCCFBxMgbOAI0EImDacb0qb98CLDvCNYIbwRIFdACh0hVoCo4WIDjbAb+LqoQdgGia9HWr0I8APr2wAEEKRIUcAEgR4OTKC4sOOEDQk2TpRIseLtVRUWJggYoILDlgEYtGLIsMCrBw8hcodAMdlrbh1FOFhokCOBihc7Z2T60xNCjNEZSh6YjFuHsQI6uiGwgGFGjhEIZrRqIEKIcgxWZmCIwT5GhhDSPbTfQ8SPxw6MYURoQB+yaT4Y2JRDT3i9NwojQwgwAgY/BGBBBAgMMIMKEZhg1RECaDCKJSIRkT6AGA7sN4+DEVhwYRIcpNMBgkRsR4AYBDwYoRQDaDBBeRgyloMFFiBHhh9KYFDijIAcgYFORSap5JJMNplEEAA7",
    ship_submarine    : "data:image/gif;base64,R0lGODlhKAAoANUAAPOcbdXMrK2jiJJtTVU2KZWLdqySc3ZZR/ZzLMC3mQIDDLVdKIhcR8VkKjUxL1pSTm07GYxFG7FjNsGPXrl5V3hLNDI5QnhmVGI+LZhYPIlWOtFrK3pEK2tJOEwrF4t7aE5CO7drRYxJJKloSXZwb3hTPZpMI6R3Vsx2UN1zL6xYIoM/GZdTLq9xVEFCRWZRQc9aIXY+GoNONBoZHf+BL59eQiceIOXdum5AJcSpeKSDYItPKsFSHstqPDYnIu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrUYTglvx9hkZAtaiwKUdJkAhAGNWDv8Kj6LLodEoFGD37UEqCAM5Fg4HBAogbkNzAj8DFBMgLwkJBW1SAQIFmQYPDj8BDRwcFQQylZYlDAwlESIuF104NjsqHioJVgWpDCIwMD0UJQuFOAsxJicJeVIXJQcVCxspKBQWFi8ErBgrOwIfBbdRBR2rGw0tLRIsIC4uHTsMOjoTOpkf4E43GCUr5SctLAsaqGN3YcIEAznmCbhgKsmFF+I8RFigygaBBuUyvLDgakKOHAZOHDDgpECAABgIeIDQoYICHywwmEgxggEIjhd0DNBx4Zwy/yYBLhDAUWIUBwwKMFCgEKKBBhfVqoGoESLEoicCOnTAAEGEjKTnJGBsIAMDBxMqMrAYgUJHlJMCSkDgIINBjR0+OERDQAMBAAAUMtRAcaJhEwE4cHTQgNTDhmjS/gIQmGGa4SYFirKY4TjFBgkURgBIgQDBggwh3FIRwJWDiIAbQjgKQbq0CdT3LBmQG0PFghrnGqQYjoAHhxof3LxwILECgwyQHzeIoaFElQAGNiCQAMKH1h0NwnuenpLKBxIfQvQdUOBACQ4qGiyYryKGjBYGChgg+eRGgT4DgHPDAdqwEsEKEHhQwQiC/XXVE5MYEUAuMVQIQUoFEIDaX4gMESBAAh8ccMEtH1SwGAr8dXgEMyKmqOKLMMYo44w01khjEAA7",
    presetRemove      : "data:image/gif;base64,R0lGODlhSwBLALMAAOXMrt+3m+/nxsp0YqMEBJgVE8+QfMsWE6I2MLRLQLhANrIEBNBOQqcEBKcRD+7mwiH5BAEAAA8ALAAAAABLAEsAAAT/8MlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu7zwmAIEAQAASBAwGIZH3MwwGSo/xyUgOd80BQwG9bqbaAyPovWUZh4XCuvQFqGkHNGo7pxuNNd0CRi/wcmRtMnZ/DQR5bHxvYYaIgXswhXgEiImRfXeWj3NlLpOblnpemY6VlJCeK6Chomylh5SVlqmDKaytp6OMfoe5p7WrAE69vqfGs2tOjbKzzZXBKLi/x2vM1MfQnbYi09inDL3f2QSpJ1Pi4+Sz7M7I7ZUDqt1vd77P8O75+fiVBQECuBUZpkBdu3771s0qYCCgwCI/ChqEhzDhKYYOH35wCKBgRYsT/9lhdHgrIIAEIfm92zcy4CqTKD+CVNdSIwmOElPuw1fzBU52Mmdu6ikJpkKhKonG4IjyKFKRDUnSYAp0JVKlU4EYcKAz34CMZnhx7dougZB5knhpcop0lE0VsNg+JeCWkNo/+ubmq+vzbrOgQi+hPee3ql5+iPjCLZz3MNBqim4xbuz4lDvFJWCtBDwTmeC3HApzBvmu3xoAgz28KWa4sjOKxhQABK2hninKla3KQjCEdgYgA8Z2LYCALAEEs337CBh8eJKmuPMhB5vZ4daUI0+m5E39XMDrBmtqN8hdakkB4L/VNOnR6qzp5uF+F/6r58+K5V1+mk9NKdV+8OnnE1V/VWH1AFUH5afcTQRSYqAECFKiYA3WCffgBD8hEuCC3qHH1YUUULVhDg4NAGIFHEHRHQ4crfhFRvGRCGMIMHK4n4A95Kjjjjz26OOPQAYp5JBEDhkBADs%3D",
    presetPlus        : "data:image/gif;base64,R0lGODlhDwAPAKIFAFeZVIbjfF6hWnrQcmOTUv///wAAAAAAACH5BAEAAAUALAAAAAAPAA8AAAMnWLrc/jA6AoRUIIBb8oYCQWlC6QDDEKzpxwCwEAiwe2qcl8Nc73MJADs="
  }
  
  //-----------------------------------------------------------------------------
  const unitsList = {
    army:   [["phalanx", "steamgiant", "spearman", "swordsman" , "slinger"   , "archer", "marksman"],
             ["ram"    , "catapult"  , "mortar"  , "gyrocopter", "bombardier", "cook"  , "medic"   ]],
    fleet:  [["ship_ram", "ship_flamethrower", "ship_steamboat", "ship_ballista"],
             ["ship_catapult", "ship_mortar", "ship_submarine"]]
  };
  
  const unitsProperties = {
    army: {
      phalanx     : { garrison: 1 },
      steamgiant  : { garrison: 3 },
      spearman    : { garrison: 1 },
      swordsman   : { garrison: 1 },
      slinger     : { garrison: 1 },
      archer      : { garrison: 1 },
      marksman    : { garrison: 4 },
      ram         : { garrison: 5 },
      catapult    : { garrison: 5 },
      mortar      : { garrison: 5 },
      gyrocopter  : { garrison: 1 },
      bombardier  : { garrison: 2 },
      cook        : { garrison: 2 },
      medic       : { garrison: 1 }
    },
    fleet: {
      ship_ram          : { garrison: 3 },
      ship_flamethrower : { garrison: 3 },
      ship_steamboat    : { garrison: 3 },
      ship_ballista     : { garrison: 3 },
      ship_catapult     : { garrison: 3 },
      ship_mortar       : { garrison: 3 },
      ship_submarine    : { garrison: 1 }
    }
  };
  
  const battleProperties = {
    army: {
      line1     : ["phalanx", "steamgiant", "spearman", "swordsman"],
      line2     : ["marksman", "archer", "slinger"],
      artillery : ["mortar", "catapult" , "ram" ],
      flankLeft : ["swordsman", "spearman"],
      flankRight: ["swordsman", "spearman"],
      air1      : ["gyrocopter"],
      air2      : ["bombardier"],
      support1  : ["medic"],
  	support2  : ["cook"]
    },
    fleet: {
      line1     : ["ship_ram", "ship_flamethrower", "ship_steamboat", "ship_ballista", "ship_catapult", "ship_mortar" ],
      line2     : ["ship_mortar", "ship_catapult", "ship_ballista" ],
      submarine : ["ship_submarine"],
    }
  }
  
  //For each equal townhall level or more: 
  //   slots_type: [number_of_slots, slot_size]
  const battlefieldProperties = {
    army: {
      1  : { line1: [3, 30], line2: [3, 30], artillery: [1, 30], flankLeft: [0, 30], flankRight: [0, 30], air1: [1, 10], air2: [1, 10], support1: [1, 0], support2: [1, 0]},
      5  : { line1: [5, 30], line2: [5, 30], artillery: [2, 30], flankLeft: [1, 30], flankRight: [1, 30], air1: [1, 20], air2: [1, 20], support1: [1, 0], support2: [1, 0]},
      10 : { line1: [7, 30], line2: [7, 30], artillery: [3, 30], flankLeft: [2, 30], flankRight: [2, 30], air1: [1, 30], air2: [1, 30], support1: [1, 0], support2: [1, 0]},
  	17 : { line1: [7, 40], line2: [7, 40], artillery: [4, 30], flankLeft: [3, 30], flankRight: [3, 30], air1: [2, 20], air2: [2, 20], support1: [1, 0], support2: [1, 0]},
  	25 : { line1: [7, 50], line2: [7, 50], artillery: [5, 30], flankLeft: [3, 40], flankRight: [3, 40], air1: [2, 30], air2: [2, 30], support1: [1, 0], support2: [1, 0]}
    },
    fleet: {
      1  : { line1: [5, 30], line2: [5, 30], submarine: [1, 30] }
    }
  }
  
  var view;
  var city;
  
  var data = {
    army: {
      phalanx           : 0,
      steamgiant        : 0,
      spearman          : 0,
      swordsman         : 0,
      slinger           : 0,
      archer            : 0,
      marksman          : 0,
      ram               : 0,
      catapult          : 0,
      mortar            : 0,
      gyrocopter        : 0,
      bombardier        : 0,
      cook              : 0,
      medic             : 0
    },
    fleet: {
      ship_ram          : 0,
      ship_flamethrower : 0,
      ship_steamboat    : 0,
      ship_ballista     : 0,
      ship_catapult     : 0,
      ship_mortar       : 0,
      ship_submarine    : 0
    }
  };
  var options = {
    signature         : 'ikaArmyHelper',
    showPreviewTitles : true
  };
  
  var update = true;
  var presets = {army: {}, fleet: {}};
  var placed = {};
  var wallLevel = 0;
  var cityLevel = 0;
  
  //-----------------------------------------------------------------------------
  function getLanguage() {
//    var lang = 'english';
    $("script").each( function() {
      var langMatch = /LocalizationStrings\['language'\]\s+=\s+'([a-zA-Z]+)';/g.exec( this.innerHTML );
      if ( langMatch ) {
        lang = {
        ar:  "spanish",    by:  "russian",  br:  "portugese",  bg:  "bulgarian",
        cl:  "spanish",    cn:  "chinese",  co:  "spanish",    cz:  "czech",
        dk:  "danish",     en:  "english",  fi:  "finish",     fr:  "french",
        de:  "german",     gr:  "greek",    it:  "italian",    hk:  "chinese",
        hu:  "hungarian",  il:  "hebrew",   kr:  "korean",     lv:  "latvian",
        lt:  "lithuanian", mx:  "spanish",  nl:  "dutch",      no:  "norwegian",
        pk:  "urdu",       pe:  "spanish",  ph:  "pinoy",      pt:  "portuguese",
        pl:  "polish",     ro:  "romanian", ru:  "russian",    rs:  "serbian",
        sk:  "slovak",     si:  "slovene",  es:  "spanish",    se:  "swedish",
        tw:  "chinese",    tr:  "turkish",  ua:  "ukranian",   ae:  "arabic",
        us:  "english",    ve:  "spanish",  vn:  "vietnamese", ba:  "bosnian"
        }[langMatch[1]] || 'english';
      }
      delete langMatch;
    });
    return lang;
  }
  
  //-----------------------------------------------------------------------------
  function oc(a) {
    var o = {};
    for (var i = 0; i < a.length; i++) {
      o[a[i]]=i;
    }
    return o;
  }
  
  //-----------------------------------------------------------------------------
  function getUnitsFromMilitaryOverview(type) {
    var res = "";
    var rows = $("div.contentBox01h:first div.content table tr");
    for (var row = 0; row < rows.length; row+=2) {
      var values = $("td", rows[row+1]);
      for (var i = 0; i < values.length; i++) {
        var unit = unitsList[type][row / 2][i];
        var value = values[i].innerHTML;
        data[type][unit] = parseInt(value);
        if (isNaN(data[type][unit])) {
          data[type][unit] = 0;
        }
      }
    }
    IkaTools.setVal("ikariamArmyHelper.units." + type + "." + city, data[type]);
  }
  
  //-----------------------------------------------------------------------------
  function getUnitsFromBuilding(type) {
    var units = $("#units > li");
    units.each( function() {
      var unit = $(this).attr("class").replace(/^unit\s/,"");
      var value = $("div.unitinfo > div.unitcount", this).contents()[1].nodeValue;
      data[type][unit] = parseInt(value);
      if (isNaN(data[type][unit])) {
        data[type][unit] = 0;
      }
    });
    IkaTools.setVal("ikariamArmyHelper.units." + type + "." + city, data[type]);
  }
  
  //-----------------------------------------------------------------------------
  function storeTargetCity() {
    IkaTools.querySelectorAsArray("ul#cities li.cityLocation.city", document).forEach(function(item) {
      var aCity = IkaTools.querySelector("a", item);
      if (aCity != null)
      {
        var id = aCity.id;
        id = parseInt(id.substr(id.indexOf('_') + 1));
        if (isNaN(id)) {
          id = 0;
        }
      }
      else
      {
        id = 0;
      }
      var lname = IkaTools.querySelector('.cityinfo .name td:not(.nameValue):not(.icons)', item).innerHTML.match(/\(\d+/);
      if (lname != null)
      {
        var level = parseInt(lname[lname.length-1].match(/\d+/));
      }
      else
      {
        var level = parseInt(item.className.match(/\d+/));
      }
      IkaTools.setVal("ikariamArmyHelper.targetCityLevel." + id, level);
    });
  }
  
  //-----------------------------------------------------------------------------
  function getCityLevel() {
    var hall = IkaTools.cityGetBuildingByType("townHall");
    var level = (hall) ? hall.level : "0";
    IkaTools.setVal("ikariamArmyHelper.cityHallLevel." + city, level);
  }
  
  //-----------------------------------------------------------------------------
  function getWallLevel() {
    var wall = IkaTools.cityGetBuildingByType("wall");
    var level = (wall) ? wall.level : "0";
    IkaTools.setVal("ikariamArmyHelper.cityWallLevel." + city, level);
  }
  
  //-----------------------------------------------------------------------------
  function calcGarrison() {
    var garrison = 0;
    for (var key in data.army) {
      garrison += data.army[key]; // * unitsProperties.army[key].garrison;
    }
    var garrisonMaximum = 250 + 50 * (cityLevel + wallLevel);
  
    var style = "";
    if (garrison.current > garrison.maximum) {
      style = 'color: #f00; font-weight:bold;'
    } else if (garrison.current > 0.9 * garrison.maximum) {
      style = 'color: #c30;'
    }
  
    return { current: garrison, maximum: garrisonMaximum, style: style };
  }
  
  //-----------------------------------------------------------------------------
  function appendGarrisonInfo() {
    var garrison = calcGarrison();
    
    var entry = document.createElement('li');
    entry.setAttribute('class', 'citylevel');
    entry.setAttribute('id','garrisonInfo');
    var html = '<span class="textLabel">'+ language.garrison + ': </span>' + 
               '<span style="' + garrison.style + '">' + garrison.current + " / " + garrison.maximum + '</span>';
    entry.innerHTML = html;
    
    var button = $("div#information div.centerButton");
    button.before(entry);
  
    html  = '<div id="armyPreview" style="top:180px; '+IkaRTL.txtLeft+':230px; width: 362px; height: 203px; z-index: 9999; position: absolute; text-align: justify; background-color: #FCF4DE; padding: 1px 5px 5px 5px; display: none;">';
    html += "<table>\n";
    
    for (row in unitsList.army) {
      html += '<tr align="center">\n';
      for (i in unitsList.army[row]) {
        html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.army[unitsList.army[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.army[row][i]]+'" title="'+language[unitsList.army[row][i]]+'"><br><span>'+data.army[unitsList.army[row][i]]+'</span></div></td>\n'
      }
      html += '</tr>\n';
    }
  
    html += '<tr align="center">\n';
    for (row in unitsList.fleet) {
      for (i in unitsList.fleet[row]) {
        html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.fleet[unitsList.fleet[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.fleet[row][i]]+'" title="'+language[unitsList.fleet[row][i]]+'"><br><span>'+data.fleet[unitsList.fleet[row][i]]+'</span></div></td>\n'
      }
    }
    html += '</tr>\n';
  
      html += "</table>";
    html += "<div style='position: absolute; top: -10px; '+IkaRTL.txtLeft+': -5px; width: 384px; height: 5px;'><img width='100%' src='" + images.hintTop + "'/></div>" +
            "<div style='1000; position: absolute; top: 2px; '+IkaRTL.txtLeft+': -5px; width: 12px; height: 100%; background: transparent url(" + images.hintLeft + ") repeat-y scroll 0 0;'></div><div style='position: absolute; top: 2px; '+IkaRTL.txtRight+': -5px; width: 12px; height: 100%; background: transparent url(" + images.hintRight + ") repeat-y scroll 0 0;'></div>" +
            "<div style='position: absolute; bottom: 2px; '+IkaRTL.txtLeft+': -5px; width: 384px; height: 5px;'><img width='100%' src='" + images.hintBottom + "'/></div>";
    html += '</div>';
    
    $("div#mainview").before(html);
    
    entry.setAttribute('style', "cursor: pointer");
    entry.setAttribute('onMouseOut' , "this.style.backgroundColor = null; document.getElementById('armyPreview').style.display = 'none'");
    entry.setAttribute('onMouseOver', "this.style.backgroundColor = '#deac63'; document.getElementById('armyPreview').style.display = 'inline'");
  }
  
  //-----------------------------------------------------------------------------
  function appendGarrisonInfo2TownHall() {
    var garrison = calcGarrison();
    
    var html = '<span class="value occupied">' + garrison.current + ' / </span>';
    var elem = $("li.garrisonLimit span.textLabel");
    elem.append(html);
    
    $("li.garrisonLimit span[class='value occupied']").each( function() {
      this.setAttribute('style', garrison.style);
    });
  }
  
  //-----------------------------------------------------------------------------
  function appendGarrisonInfo2Wall() {
    var garrison = calcGarrison();
    
    var html = '<span style="' + garrison.style + '">' + garrison.current + " / " + garrison.maximum + '</span></li>';
    $("#wallInfoBox div.weapon ~ span.textLabel").eq(2).next().html(html);
  }
  //-----------------------------------------------------------------------------
  function unitsPreviewUpdate(type, targetBattlefieldProperties, forces, draw) {
    for (key in battleProperties[type]) {
      for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
        var u = 0;
        for (; u < battleProperties[type][key].length; u++) {
          var unit = battleProperties[type][key][u];
          if (forces[unit] > 0) {
            var max = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
            if (max > forces[unit] || max == 0) {
              n = forces[unit];
            } else {
              n = max;
            }
            forces[unit] -= n;
            placed[key+i] = {unit: unit, num: n};
            if (draw) {
              $("span#"+key+i).text(n + ((max == 0)?'':(' / ' + max)));
              $("img#"+key+i).attr("src", images[unit]);
              $("img#"+key+i).attr("title", language[unit]);
            }
            break;
          }
        }
        if (u == battleProperties[type][key].length) {
          placed[key+i] = {unit: "", num: 0};
          if (draw) {
            $("span#"+key+i).text("0");
            $("img#"+key+i).attr("src", images.empty);
            $("img#"+key+i).attr("title", '');
          }
        }
      }
    }
    if (draw) {
      var html = "";
      for (key in forces) {
        if (forces[key] > 0) {
          html += '<td class="advisorSquare" style="padding-top: 3px;"><img class="advisorUnitIcon" src="'+images[key]+'" title="'+language[key]+'">';
          html += '<br><span>'+forces[key]+'</span></td>\n';
        }
      }
      if (html != "") {
        html = '<table style="width: 1%;" align='+IkaRTL.txtLeft+'><tr align="center">\n' + html;
        html += '</tr></table>\n'
      }
      $("span#armyReserve").html(html);
    }
  }
  
  //-----------------------------------------------------------------------------
  function assignedUnits(type, newForces) {
    var units = $("ul.assignUnits > li");
    var forces = [];
    for (key in data[type]) {
      forces[key] = 0;
    }
  
    units.each( function() {
      var unit = $(this).attr("class").replace(/^\s*(.*?)\s*$/,"$1").replace(/\s+.*$/,"");
      var input = $("input.textfield", this);
      if (typeof(newForces) != 'undefined') {
        input.attr("value", newForces[unit]);
        var evt = document.createEvent("KeyEvents");
        evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
        input[0].dispatchEvent(evt);
      }
      var value = input.attr("value");
      forces[unit] = parseInt(value);
      if (isNaN(forces[unit])) {
        forces[unit] = 0;
      }
    });
    return forces;
  }
  
  //-----------------------------------------------------------------------------
  function unitsChangeHandler(type, targetBattlefieldProperties, draw) {
    if (update) {
      unitsPreviewUpdate(type, targetBattlefieldProperties, assignedUnits(type), draw);
    }
  }
  
  //-----------------------------------------------------------------------------
  function drawUnitsSquare(targetBattlefieldProperties, squareTypes, width) {
    if (squareTypes == '') {
      return '<td width="'+width+'" style="padding-top: 3px;">&nbsp;</td>';
    }
    var html = '';
    var title = squareTypes;
    if (squareTypes.length > 1) {
      title = squareTypes.shift();
    }
    $(squareTypes).each( function() {
      for (var i=0; i < targetBattlefieldProperties[this][0]; i++) {
        squareHtml  = '<td class="advisorSquare" style="padding-top: 3px;"><img id="'+this+i+'" class="advisorUnitIcon" src="'+images.empty+'">';
        squareHtml += '<br><span id="'+this+i+'">0</td>\n';
        if ( (i & 1) == ((this == 'flankRight')?1:0) || this == 'reserve' ) {
          html += squareHtml;
        } else {
          html = squareHtml + html;
        }
      }
    });
    if (html != '') {
      html = '<td width="'+width+'" style="padding-top: 3px;">' + ((options.showPreviewTitles)?(language[title] + ':<br>'):'') + '<table style="width: 1%;"><tr align=center>\n' + html;
      html += '</tr></table></td>\n';
    } else {
      return '<td width="'+width+'" style="padding-top: 3px;">&nbsp;</td>';
    }
    return html;
  }
  
  //-----------------------------------------------------------------------------
  function drawUnitButtons(type, targetBattlefieldProperties, draw) {
    GM_addStyle(
      'input.fillRow { position: absolute; top: 10px; '+IkaRTL.txtLeft+': 630px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
      'input.fillRow:active { padding: 3px 0px 1px 0px; } ' +
      'input.addSlot { position: absolute; top: 10px; '+IkaRTL.txtLeft+': 613px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
      'input.addSlot:active { padding: 3px 0px 1px 0px; } ' +
      'input.removeSlot { position: absolute; top: 10px; '+IkaRTL.txtLeft+': 541px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
      'input.removeSlot:active { padding: 3px 0px 1px 0px; } ' +
      'div.assignRightBlock { height: 45px; text-align: '+IkaRTL.txtRight+'; margin: -15px 24px -15px 5px;"}'
    );
    $("ul.assignUnits > li input.textfield").each( function() {
      var place = $(this).parent();
      place.append('<input type="button" value="-" class="button removeSlot" title="'+language.removeSlot+'">');
      place.append('<input type="button" value="+" class="button addSlot" title="'+language.addSlot+'">');
      if (draw) {
        place.append('<input type="button" value="#" class="button fillRow" title="'+language.fillRow+'">');
      }
      
      var unit = $(this).parents("li:last").attr("class").replace(/^\s*(.*?)\s*$/,"$1").replace(/\s+.*$/,"");
      var id = $(this).attr("id");
      $("input.removeSlot", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(-1, type, targetBattlefieldProperties, unit, id); }, false);
      $("input.addSlot", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(+1, type, targetBattlefieldProperties, unit, id); }, false);
      if (draw) {
        $("input.fillRow", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(0, type, targetBattlefieldProperties, unit, id); }, false);
      }
    });
    
    var bottomButtons = '<hr> \
    <div class="assignRightBlock"> '+language.selectUnits+': \
    <!--input type="button" value="'+language.assignField+'" class="button" id="assignField"--> \
    <input type="button" value="'+language.assignAll+'" class="button" id="assignAll"> \
    <input type="button" value="'+language.assignNone+'" class="button" id="assignNone"> \
    </div>\n';
    $("ul.assignUnits").after(bottomButtons);
    
  //  $("#assignField").click( function() { this.blur(); assignField(type, targetBattlefieldProperties); });
    $("#assignNone").click( function() { this.blur(); assignUnits("setMin", type, targetBattlefieldProperties, draw); });
    $("#assignAll").click( function() { this.blur(); assignUnits("setMax", type, targetBattlefieldProperties, draw); });
  }
  
  //-----------------------------------------------------------------------------
  function assignUnits(what, type, targetBattlefieldProperties, draw) {
    update = false;
    $("ul.assignUnits > li > div.sliderinput a."+what).each( function() {
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent( 'click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null );
      this.dispatchEvent(event);
    });
    update = true;
    unitsChangeHandler(type, targetBattlefieldProperties, draw)
  }
  
  //-----------------------------------------------------------------------------
  function assignField(type, targetBattlefieldProperties) {
    var preplaced = placed;
    for (key in battleProperties[type]) {
      for (unit in battleProperties[type][key]) {
        var unitsNum = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
        for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
          if (unit == preplaced[key+i].unit || preplaced[key+i].unit == "") {
          }
        }
      }
    }
  }
  
  //-----------------------------------------------------------------------------
  function unitChangeNumber(inc, type, targetBattlefieldProperties, unit, id) {
    var input = $("#"+id);
    var value = parseInt(input.attr("value"));
    if (isNaN(value)) {
      value = 0;
    }
    
    if (inc == 0) {
      var unitsToPlace = 0;
      for (key in battleProperties[type]) {
        if (unit in oc(battleProperties[type][key])) {
          var unitsNum = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
          for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
            if (unit == placed[key+i].unit || placed[key+i].unit == "" || 
                oc(battleProperties[type][key])[unit] < oc(battleProperties[type][key])[placed[key+i].unit]) {
              if (unitsNum == 0) {
                unitsToPlace = 99999;
                break;
              } else {
                unitsToPlace += unitsNum - ((unit == placed[key+i].unit)?placed[key+i].num:0);
              }
            }
          }
          if (unitsToPlace > 0 && key != "flankLeft") {
            break;
          }
        }
      }
      value += unitsToPlace;
    } else {
      var unitsPerSlot = 1;
      for (key in battleProperties[type]) {
        for (var u = 0; u < battleProperties[type][key].length; u++) {
          if (unit == battleProperties[type][key][u]) {
            unitsPerSlot = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
            if (unitsPerSlot == 0) {
              unitsPerSlot = Math.floor(30 / unitsProperties[type][unit].garrison);
            }
            break;
          }
        }
        if (unitsPerSlot != 1) {
          break;
        }
      }
      value = Math.floor((value+((inc<0)?unitsPerSlot-1:0))/unitsPerSlot)*unitsPerSlot + unitsPerSlot*inc;
    }
    input.attr("value", value);
  	var evt = document.createEvent("KeyEvents");
  	evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
  	input[0].dispatchEvent(evt);
  }
  
  //-----------------------------------------------------------------------------
  function drawAttackHelper(type, draw) {
    var targetId = parseInt($("form > input[name='destinationCityId']").attr("value"));
    var targetLevel = IkaTools.getVal("ikariamArmyHelper.targetCityLevel." + targetId);
    if (typeof(targetLevel) == 'object') {
      targetLevel = 10;
    }  
    
    var targetBattlefieldProperties;
    for (var key in battlefieldProperties[type]) {
      if (targetLevel < key) break;
      targetBattlefieldProperties = battlefieldProperties[type][key];
    }
  
    GM_addStyle(
      '#container .assignUnits .weight {'+IkaRTL.txtLeft+': 88px; width: 24px; !important;}' +
      '#container .assignUnits .sliderinput {margin-'+IkaRTL.txtLeft+': 140px; !important;}' +
      '#container .assignUnits .textfield {'+IkaRTL.txtLeft+': 557px; !important;}'
    );
  
    if (draw) {
      var place = $("div#select" + type.slice(0,1).toUpperCase() + type.slice(1));
      
      GM_addStyle(
        'td.advisorSquare     { background:url(' + images.square + ') no-repeat top center; background-position: 6px 3px; } ' +
        'img.advisorUnitIcon  { width:36px; height:36px; padding: 0px 6px 0px 6px; cursor: pointer; !important; }' +
        '#missionSummary .targetName  {width: 400px; !important;}'
      );
  
      targetCityLevelText = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="textLabel1">' + language.cityLevel + ": " + targetLevel + '</span>';
      $("div#missionSummary div.plunderInfo div.targetName").append(targetCityLevelText);
      $("div#missionSummary div.journeyTarget").append(targetCityLevelText);
  
      const tableLayout = {
        army  : [ ["air", "air2"]	 	   , ["artillery"], ["air", "air1"]		   , "\n", 
                 ["support", "support1"] , ["line2"]    , ["support", "support2"], "\n",
                 ["flankLeft"] 		   , ["line1"]    , ["flankRight"]
                ],
        fleet : [ ""           		   , ["line2"]    , ["submarine"]          , "\n",
                  ""         			   , ["line1"]    ,  ""
                ]
      };
      var entry = document.createElement('div');
      entry.setAttribute('id', 'plunderAdvisor');
      entry.setAttribute('class', 'contentBox01h');
      var html = '<h3 class="header">'+ language.advisor + '</h3>\n';
      html += '<div style="margin: -18px 10px 8px 5px; text-align: '+IkaRTL.txtRight+';">By <a target="_blank" href="http://userscripts.org/scripts/show/94360">Ikariam Army Helper</a>.</div>\n';
      html += '<div class="content">\n';
      html += '<table border=0><tr align="center">\n';
  
      $(tableLayout[type]).each( function() {
        if (this == "\n") {
          html += '</tr><tr align="center">';
        } else {
          html += drawUnitsSquare(targetBattlefieldProperties, this, "33%");
        }
      });
      
      html += '</tr><tr>';
  
      html += '<td colspan=3 height="80" align="'+IkaRTL.txtLeft+'" style="padding-top: 3px;"><p>'+language.reserve+':<br><span id="armyReserve"></span></p></td>';
      
      html += '</tr></table>\n';
      html += '</div>\n';
      html += '<div class="footer"></div>\n';
      entry.innerHTML = html;
      place.append(entry);
    }
   
    installHandlers(type, targetBattlefieldProperties, draw)  
    drawUnitButtons(type, targetBattlefieldProperties, draw);
    drawPresetsBox(type, targetBattlefieldProperties, draw);
  }
  
  //-----------------------------------------------------------------------------
  function installHandlers(type, targetBattlefieldProperties, draw) {
    $("ul.assignUnits > li > div.sliderinput > div.sliderbg > div.sliderthumb").each( function() {
      $(this)[0].addEventListener ("DOMAttrModified", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
    });
    $("ul.assignUnits > li > div.sliderinput a.setMin").each( function() {
      $(this)[0].addEventListener ("click", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
    });
    $("ul.assignUnits > li > div.sliderinput a.setMax").each( function() {
      $(this)[0].addEventListener ("click", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
    });
    $("ul.assignUnits > li input.textfield").each( function() {
      $(this)[0].addEventListener ("keyup", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
    });
    unitsChangeHandler(type, targetBattlefieldProperties, draw);
  }
  
  //-----------------------------------------------------------------------------
  function drawPresetsBox(type, targetBattlefieldProperties, draw) {
    var presetsData = IkaTools.getVal("ikariamArmyHelper.presets");
    if (type in presetsData) {
      presets = presetsData;
    }
    
    var div = document.createElement('div');
    div.setAttribute('class', "content");
    var html = '<div id="ikaArmyPresets" style="overflow: auto; max-height: 350px; margin-'+IkaRTL.txtLeft+': 3px; margin-'+IkaRTL.txtRight+': 3px;"></div>';
    html += '<div style="text-align: '+IkaRTL.txtRight+'; margin-'+IkaRTL.txtRight+': 5px;"><a href="" clsss="" id="ikaArmyPresetsAddNew">'+language.presetsAdd+'</a></div>';
    div.innerHTML = html;
    IkaTools.addInfoBox(language.presetsTitle, div);
    presetsDraw(type, targetBattlefieldProperties, draw);
    $("#ikaArmyPresetsAddNew").click( function() { presetsAddNew(type, targetBattlefieldProperties, draw); return false; });
  }
  
  //-----------------------------------------------------------------------------
  function presetsDraw(type, targetBattlefieldProperties, draw, animateName) {
    var html = '';
    for (name in presets[type]) {
      var tooltip = "";
      for (unit in presets[type][name]) {
        if (presets[type][name][unit] > 0) {
          tooltip += ((tooltip!='')?'  |  ':'') + language[unit] + ':&nbsp;' + presets[type][name][unit];
        }
      }
      html += '<div class="iakArmyPresetsRow" name="'+escape(name)+'"><table width="100%" border="0" style="font-size: 11px;"><tr>';
      html += '<td width="15"><a href="" class="iakArmyPresetsApplyPlus"><img width="15" src="'+images.presetPlus+'"></a></td>';
      html += '<td><a href="" class="iakArmyPresetsApply" title="'+tooltip+'">'+name+'</a></td>';
      html += '<td width="15"><a href="" class="iakArmyPresetsRemove"><img width="15" src="'+images.presetRemove+'" title="'+language.presetsRemove+'"></a></td>';
      html += '</tr></table></div>\n';
    }
    
    $("#ikaArmyPresets").html(html);
    if (typeof(animateName) != 'undefined') {
      $("#ikaArmyPresets div.iakArmyPresetsRow[name="+escape(animateName)+"]").hide().slideDown(750);
    }
    $("#ikaArmyPresets a.iakArmyPresetsApply").click( function() {
      $(this).parents("div.iakArmyPresetsRow").animate( { backgroundColor: "#deac63" }, 300  ).animate( { backgroundColor: "#f6ebba" }, 300);
      presetsApply(type, targetBattlefieldProperties, draw, $(this).parents("div.iakArmyPresetsRow").attr("name"));
      return false;
    });
    $("#ikaArmyPresets a.iakArmyPresetsApplyPlus").click( function() {
      $(this).parents("div.iakArmyPresetsRow").animate( { backgroundColor: "#deac63" }, 300  ).animate( { backgroundColor: "#f6ebba" }, 300);
      presetsApply(type, targetBattlefieldProperties, draw, $(this).parents("div.iakArmyPresetsRow").attr("name"), true);
      return false;
    });
    $("#ikaArmyPresets a.iakArmyPresetsRemove").click( function() {
      $(this).parents("div.iakArmyPresetsRow").slideUp(750, function() { presetsRemove(type, targetBattlefieldProperties, draw, $(this).attr("name")); });
      return false;
    });
  }
  
  //-----------------------------------------------------------------------------
  function presetsAddNew(type, targetBattlefieldProperties, draw) {
    var name = prompt(language.presetsNewName+":");
    if (name != null & name != "") {
      presets[type][name] = {};
      var forces = assignedUnits(type);
      for (unit in forces) {
        presets[type][name][unit] = forces[unit];
      }
      IkaTools.setVal("ikariamArmyHelper.presets", presets);
      presetsDraw(type, targetBattlefieldProperties, draw, name);
    }
  }
  
  //-----------------------------------------------------------------------------
  function presetsApply(type, targetBattlefieldProperties, draw, name, plus) {
    name = unescape(name);
    var newForces = presets[type][name];
    if (typeof(plus) != 'undefined' && plus) {
      var forces = assignedUnits(type);
      for (unit in newForces) {
        newForces[unit] += forces[unit];
      }
    }
    update = false;
    assignedUnits(type, newForces);
    update = true;
    unitsChangeHandler(type, targetBattlefieldProperties, draw)
  }
  
  //-----------------------------------------------------------------------------
  function presetsRemove(type, targetBattlefieldProperties, draw, name) {
    name = unescape(name);
    delete presets[type][name];
    IkaTools.setVal("ikariamArmyHelper.presets", presets);
    presetsDraw(type, targetBattlefieldProperties, draw);
  }
  
  //-----------------------------------------------------------------------------
  function drawOptions() {
    var div = document.createElement('div');
    div.setAttribute('class', "content");
    var html = '<h3><a href="http://userscripts.org/scripts/show/94360" target="_blank">Ikariam Army Helper </a> <span style="font-weight: normal;"> by <a href="http://userscripts.org/users/273982" target="_blank">Dino.pl</a></span></h3>'
    html += '<table cellpadding="0" cellspacing="0">';
    html += '<tr><th>'+language.optShowTitles+'</th><td><input id="ikaArmy_showPreviewTitles" type="checkbox"'+ (options.showPreviewTitles ? ' checked' : '') +'></td></tr>'
    html += '</table>';
    div.innerHTML = html;
    if (IkaTools.addOptionBlock(div))
    {    
      $("#ikaArmy_showPreviewTitles").change( function() { optionSave(this.id.match(/_(.+)$/)[1], this.checked);});
    }
  }
  
  //-----------------------------------------------------------------------------
  function optionSave(option, value) {
    options[option] = value;
    IkaTools.setVal("ikariamArmyHelper.options", options);
  }
  
  //-----------------------------------------------------------------------------
  function optionsLoad() {
    var newOptions = IkaTools.getVal("ikariamArmyHelper.options");
    if ("signature" in newOptions) {
      options = newOptions;
    }
  }
  
  //-----------------------------------------------------------------------------
  function main() {
 
    view = IkaTools.getView();
    city = ExMachina.currentCityId;
    
    optionsLoad();
  
    switch (view) {
      case "cityMilitary-army":
      case "cityMilitary-fleet":
        getUnitsFromMilitaryOverview(view.replace(/.*-/,""));
        break;
      case "barracks":
        getUnitsFromBuilding("army");
        break;
      case "shipyard":
        getUnitsFromBuilding("fleet");
        break;
      case "city":
        getCityLevel();
        getWallLevel();
        break;
      case "island":
        storeTargetCity();
        break;
    }
  
    $(["army", "fleet"]).each( function(i, type) {
      unitsStored = IkaTools.getVal("ikariamArmyHelper.units." + type + "." + city);
      for (unit in unitsStored) {
        if (typeof(unitsStored[unit]) != 'undefined') {
          data[type][unit] = unitsStored[unit];
        }
      }
    });
    wallLevel = parseInt(IkaTools.getVal("ikariamArmyHelper.cityWallLevel." + city));
    cityLevel = parseInt(IkaTools.getVal("ikariamArmyHelper.cityHallLevel." + city));
  
    switch (view) {
      case "city":
        appendGarrisonInfo();
        break;
      case "townHall":
        appendGarrisonInfo2TownHall();
        break;
      case "wall":
        appendGarrisonInfo2Wall();
        break;
      case "plunder":
      case "defendCity":
      case "occupy":
        drawAttackHelper("army", true);
        break;
      case "blockade":
      case "defendPort":
        drawAttackHelper("fleet", true);
        break;
      case "deployment":
        drawAttackHelper($("#deploymentForm :input[name=function]").attr("value").replace(/^deploy/,"").toLowerCase(), false);
        break;
      case "options":
        drawOptions();
        break;
    }
  }
  
  
  //-----------------------------------------------------------------------------
  main();
  //-----------------------------------------------------------------------------
}

AllianceColor = {
	init:function() {		
		AllianceColor.startTime = new Date();
		var input = document.createElement('input');
		input.id = 'allianceColorSetValue';
		input.type = 'hidden';
		AllianceColor.lastColorVal = '';
		document.body.appendChild(input);
		GM_addStyle('.alliesHighlighterSelector { position:relative; display:inline; margin-'+IkaRTL.txtLeft+':5px; }\
						.alliesHighlighterSelector a { display:block; margin-bottom:.5em; }\
						.alliesHighlighterSelector img { display:inline !important; vertical-align:middle; height:14px; cursor:pointer; }\
						.alliesHighlighterSelector div { display:none; position:absolute; background-color:#F6EBBA; border:1px solid #DCA354; top:15px; '+IkaRTL.txtLeft+':0; padding:1em 1em .5em 1em; '+IkaRTL.txtLeft+':-5px;  z-index:11000 !important; }\
						.alliesHighlighterSelector:hover div { display:block; }\
						');
		if(typeof(AllianceColor.views[IkaTools.getView()]) == 'function')
			AllianceColor.views[IkaTools.getView()]();
		var d = new Date();
//		IkaTools.debug("Allies Highlighter: " + (d.getTime() - AllianceColor.startTime.getTime()));
	},
	addAllianceColorSelector:function(a) {
		a = typeof(a[0]) != 'undefined' ? a[0] : a;
		try { var allianceId = a.href.match(/allyId=(\d+)/)[1]; } catch(e) { var allianceId = false; }
		if(allianceId) {
			var div = document.createElement('div');
			div.className = "alliesHighlighterSelector";
			div.innerHTML = '<img src="' + AllianceColor.icons.color + '"/><div>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_none\';" style="color:#7E2D04;cursor:pointer;">None</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_red\';" style="color:#cc0000;cursor:pointer;">Red</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_green\';" style="color:#00cc00;cursor:pointer;">Green</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_blue\';" style="color:#0000cc;cursor:pointer;">Blue</a>\
				<a class="allianceColorSetItem" onClick="document.getElementById(\'allianceColorSetValue\').value = \''+allianceId + '_purple\';" style="color:#880088;cursor:pointer;">Purple</a>\
				</div>\
			';
			$(a).after(div);
		}
	},	
	loadAlliances:function() {
//		AllianceColor.alliances = typeof(AllianceColor.alliances) == 'undefined' ? (typeof(IkaTools.getVal('alliances') == 'undefined') ? {} : IkaTools.getVal('alliances')) : AllianceColor.alliances;
		AllianceColor.alliances = !!IkaTools.getVal('alliances') ? IkaTools.getVal('alliances') : [];
	}, 
	getAllianceById:function(id) {
		if(id) {
			AllianceColor.loadAlliances();
			var alliance = (!!AllianceColor.alliances && typeof(AllianceColor.alliances[id]) != 'undefined') ? AllianceColor.alliances[id] : false;
			return alliance;
		} else
			return false;
	},
	setAllianceColor:function(allianceId, color) {
		$('#allianceColorSetValue')[0].value = allianceId + '_' + color;
	},
	startChangeListener:function() {
		setInterval(function() {
			if($('#allianceColorSetValue')[0].value != AllianceColor.lastColorVal) {
				AllianceColor.lastColorVal = $('#allianceColorSetValue')[0].value;
				var val = AllianceColor.lastColorVal;
				AllianceColor.loadAlliances();
				var allianceId = val.match(/^\d+/)[0];
				var color = val.match(/_(.+)$/)[1];
				var alliance = AllianceColor.getAllianceById(allianceId);
				alliance = alliance ? alliance : {};
				alliance.id = allianceId;
				alliance.color = color;
				AllianceColor.alliances[allianceId] = alliance;
				IkaTools.setVal('alliances', AllianceColor.alliances);
				AllianceColor.updateColors();
			}
		}, 500);
	},
	updateColors:function() {
		switch(IkaTools.getView()) {
			case 'allyHighscore':
				$('#mainview .contentBox01h .content .table01 tr').each(function() {
					try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
					if(allyLink) {
						try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
						if(ally) {
							this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
						}
					}
				});
				case 'island': 
				$('ul#cities li').each(function() {
					try { var allyId = this.innerHTML.match(/allyId=(\d+)/)[1]; } catch(e) { var allyId = false; }
					var alliance = AllianceColor.getAllianceById(allyId);
					if(allyId && alliance) {
						this.className = this.className.replace(/allianceColor[^\s*]/, '') + ' allianceColor_' + alliance.color;
					}
				});
				break;		
			case 'highscore':
				$('#mainview .contentBox01h .content .table01 tr').each(function() {
					try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
					if(allyLink) {
						try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
						if(ally) {
							this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
						}
					}
				});
				break;
		}
	},
	views:{
		allyHighscore:function() {
			GM_addStyle('#mainview .contentBox01h .content .table01 tr.allianceColor_red * { color:red; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_green * { color:green; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_blue * { color:blue; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_purple * { color:purple; }');
			$('#mainview .contentBox01h .content .table01 tr').each(function() {
				try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
				if(allyLink) {
					AllianceColor.addAllianceColorSelector(allyLink);
					try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
					if(ally) {
						this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
					}
				}
			});
			AllianceColor.startChangeListener();
		},
		island:function() {
			GM_addStyle('#cities li.allianceColor_red .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.red.left + ') !important; }\
						#cities li.allianceColor_red .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.red.right + ') !important; }\
						#cities li.allianceColor_red .textLabel { background-image:url(' + AllianceColor.icons.scroll.red.bg + ') !important; }\
						#cities li.allianceColor_green .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.green.left + ') !important; }\
						#cities li.allianceColor_green .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.green.right + ') !important; }\
						#cities li.allianceColor_green .textLabel { background-image:url(' + AllianceColor.icons.scroll.green.bg + ') !important; }\
						#cities li.allianceColor_blue .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.blue.left + ') !important; }\
						#cities li.allianceColor_blue .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.blue.right + ') !important; }\
						#cities li.allianceColor_blue .textLabel { background-image:url(' + AllianceColor.icons.scroll.blue.bg + ') !important; }\
						#cities li.allianceColor_purple .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.purple.left + ') !important; }\
						#cities li.allianceColor_purple .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.purple.right + ') !important; }\
						#cities li.allianceColor_purple .textLabel { background-image:url(' + AllianceColor.icons.scroll.purple.bg + ') !important; }');
			
			IkaTools.querySelectorAsArray('ul#cities li',document).forEach(function(item) {
				try { var allyId = item.innerHTML.match(/allyId=(\d+)/)[1]; } catch(e) { var allyId = false; }
				if (allyId) {
					AllianceColor.addAllianceColorSelector($('.cityinfo .ally td:eq(1) a', item).eq(0));
				}
			});
			AllianceColor.updateColors();
			AllianceColor.startChangeListener();
		},
		highscore:function() {
			$('#mainview .contentBox01h .content .table01 tr').each(function() {
				try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
				if(allyLink) {
					if(!allyLink.href.match(/allyId=0/))
						AllianceColor.addAllianceColorSelector(allyLink);
					try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
					if(ally) {
						this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
					}
				}
			});
			GM_addStyle('#mainview .contentBox01h .content .table01 tr.allianceColor_red * { color:red; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_green * { color:green; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_blue * { color:blue; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_purple * { color:purple; }');
			AllianceColor.startChangeListener();
		},
	},
	icons:{
		color:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMnSURBVHjaVJNJaBNhFMf/38w3M5l0MknTPWltVVyLbaGCgjtYQVGseBGKV/HgyZuiB8GDF0FE9CaCXtSDoOCCu4goiCJIoS5Nl5jYGjOdJJNtls/nUtFveLxv4P3/7/ceM0wIgfnDxky5qVrZs4iFRnqY3tstyYl2CX6r5E63yfU3PXrt8tJk7T7+OWzeQBldt0hxM6dXa4nhTdEB9EUWIKGaiEoMIW8OSnWS4qar5ucu6hn3aMPWev6vARs70GP62Rs7jOUDW1pWIaL7qOIzYnDQQUWdMNCGFWBOEfX0Q/DU3TvyaHFEPiwszlInVF2Kn9ke7h8YaluGd+pbhGBhIXTKJsII6FYB916ClXQwbRuELLbXnVvHdeAwB2vd2a+Fd29u7sVbdZokCTTRY5DQJKlJ2SASVtKAbzOQC5/hN2xEkHty0N7LrvCQ1jnSrzSD63HIqCNOgma4hO+iARxRGkGrFQFLoqgBk18gJ5aCtwzp+ZfX9nGVJ/uS4Ta8ByPcJPUEdRVk4qOR7obwATsH5CrAV9rbV5VIPkCWE3BzymoOqasjpkQxFTBCBVEIqGRmMPzqrjjOb/FMCMiSOC0DdQtIJOF9Y10cec0PVBUB1bjiT5CwQrlMYdYikGxiKRZ+R8UGgircqgrPbfS5+4Wn52SxMlxicMoAlSBP1DKNq9LYBjGZdhMwRyROCahSdHCUZ2fgerEUr2TVVxNCrFwfZ3g8TiISiyrgUzaIOkaG4WIYfJYovtMy7QKCNa2wX43B84xnHJ/Epeuj7v6+DTKPFjhmp2hEMlAUIqGRTRojUmaIF8jKIr5Vy2CNp2G9yNJmY1clcVx55nyoXrj9yMHyqI9mwv4+QcRpMiAza5LeM0T+c4kr2lHQNUw/TaNcD50cFPfG+a8fwXaPPbhV6fQ+1vZsHYxiYEhDgcYR1MMlw6CTDBI+iqkKpu5MwH5TONsI4/x/PxPrzhjI5I8YYId2rY+YvYsj6IopaAx88JkSgk/0DbzOZdXAOhXH7LlBcTD4z2D+hNi7vhYUh1vgrW1iortV+H47ydshni+BfmNYbEz9W/9DgAEAHjlV3dGNk1wAAAAASUVORK5CYII%3D',
		scroll:{
			red:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAHQREdIeHuZPT8EcHORCQupra+lkZIkUFJUWFvW4uJoWFpwXF7YaGtYfH9cfH7QaGpEVFXAQEOVISJcWFvW5udQfH3IREbMaGm0QEPa/v6UYGPSxseM9PedUVPrZ2e2Dg+EqKvvg4OAlJet1dfvl5ffHx+liYv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGszicjsjjUGFMHjOESwRRAQwCAkMhQWBYEA4rVkvamECcjmj0KXlC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6SlhQEDxgQAWJZW10AEw2nWhJDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAOpra/vg4P///wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjALQaGuRCQokUFOlkZJoWFpwXF5UWFrYaGvW4uPa/v/W5ubMaGpEVFXQREdcfH5cWFtQfH3AQEHIREdIeHm0QENYfH+ZPT6UYGOpra/SxseM9PedUVPrZ2eEqKvGamvvl5eliYvvg4PfHx////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOLpcCgIi0UhIYjADiwWQCCwiBsgzOkUEDhKDIxTiiESeTwbU0WzIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IACgEAFAwToF1fDQ8VSkJGSK+wF00jQQA7',	
			},
			green:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAC10EVDSHnnmT2/kQo7qa4npZDWJFErBHDycF8n1uDmVFjuaFkW2Gsr1uVHUHzqXFitwECxyEVLWH3TlSEW0GiptEEWzGs72v1LXHziRFT+lGIjpYlngJeL62WvjPaHtg13hKuj74NT3x33nVMT0sZbrdev75f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGgzCcjsjjcGFMHi8DC0ThABwCggIhMWBEFBgrVmsibUCeEaf0EXVC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6Slg0DFBUZAWJZW10ADxKnWhNDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAI7qa+j74P///wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjAEW0Gm/kQonpZDWJFDuaFsn1uEW2GjycFzmVFjqXFi10Ec72v1HUH1LXH0WzGitwEMr1uSptEFDSHlLWHziRFSxyEXnmT47qaz+lGIjpYuL62WvjPV3hKrLxmn3nVMT0sev75ej74NT3x////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOMJgDgMi0UhIXi4CiwWwCDgeCMYzOi0EDBVEIxTSiEQd0CfD2XjIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAEAEAERQSoF1fCgkTSkJGSK+wGE0jQQA7',	
			},
			blue:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnABEjdB4/0k9r5muC6hw6wWR96RQqiUJg5BYtlRo3trjD9RYumhcwnBo2sxAicB9B10hl5b/J9hYulx9A1B9B1ho2tBAhbREjcrnE9RUskRgypVRv57G99HWL69nf+j1c42J76eDl+8fQ9yVH4IOX7SpM4eXp+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGwzCcjsjjcGFMHiOHhgMxARACgsJAcUhcEA8rVmvigEqfzahDEnlC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6SlhgHFRYZAWJZW10AEhSnWhBDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAGuC6uDl+////wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjABo2tBQqiUJg5GR96bjD9RYtlRYumho3thcwnBAhbREjch9B1hEjdL/J9h9B1x4/0hAicBo2sxYul7nE9RUskR9A1E9r5hgypWuC6lRv57G99Jqq8dnf+j1c42J76SpM4eXp++Dl+8fQ9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOLpcEAEi0WhIYjADiwXQEEQghcozOiUIDoqCIxTiiEQbkMbz6WTIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAEwIACRQPoF1fDBILSkJGSK+wF00jQQA7',	
			},
			purple:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAJ4e0lgRdLZC5MNk6cZr6pIcwWgUibtP5nQWmuS49XYXnHEWlYkatuS59aIf13IWl1UQcKIf1m4Vkea/9lYRcrhI5Ycas1IQbYgatKAf1H0Ypb1U5/HZ+uGx9Ml16/Pg+/Xl+8+D7aol4K0q4cJi6enH97M94////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGozCcjsjjEGFMHicCC2SRCRQAhwEhIWBQFg4rVgvqkEamjcgTKnE+5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6Slg0CGBcSAGJZW10BDxGnWhVDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAMZr6vPg+////wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjAIgatLZC5MNk6WgUiXEWleS49XQWmnYXnIkatlUQcG4Vkea/9qAf1J4e0lYRclgRdIcas3IWl6If1qIf11IQbeS59cZr6rtP5n0Ypb1U59ia8fHZ+uGx9PXl+60q4cJi6bM94/Pg++nH9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOMJgDgMi0WhIWiyCywWwCEASBMYzOi0EEA7CJBTaiESaDufjAWXIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAFQEAFAoNoF1fDxESSkJGSK+wGE0jQQA7',	
			},
		},
	}
};

unsafeWindow.allianceColorSet = function(allianceId, color) {
	$('#allianceColorSetValue')[0].value = allianceId + '_' + color;
};

function trim(txt) {
	txt = (typeof(txt) == 'undefined' || !txt) ? '' : txt;
	return txt.toString().replace(/^\s*/, '').replace(/\s*$/, '');
}

ExMachina.init();
