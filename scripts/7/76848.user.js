// ==UserScript==
// @name           3.4 Ikariam Pillage Helper (Tristan Mod)
// @namespace      PhasmaExMachina
// @description    Changes to make pillaging easier.
// @include        http://s*.en.ikariam.com/*?*
// @include        http://s*.en.ikariam.com/
// @include        http://s*.en.ikariam.com/index.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @version		   0.26.2
//
// @history        0.26.2 Modified to run on all en.ikariam.com servers
// @history        0.26.1 Limited operation of script to .org test server
// @history        0.26.1 Configured protected goods calculation for .org test server version 3.4
// @history        0.26 Added check online status mission to targets overview
// @history        0.25 Added blockade port button to targets overview
// @history        0.25 Fixed processing of target city names that contain a space
// @history        0.25 Fixed reload all spies button in targets overview
// @history        0.24 Fixed redirection loop on island links in town advisor page (you may have to completely uninstall the previous version with "remove all data..." checked if you're stuck in a loop.)
// @history        0.23 Added refresh all spies button to targets overview
// @history        0.23 Added withdraw mission to targets overview
// @history        0.22 Added inspect garrison to targets overview
// @history        0.21 Misc improvements to targets overview interface
// @history        0.20 Better target island ID detection
// @history        0.20 Added targets overview drop-down under research advisor - more features soon(ish)
// @history        0.19 Fixed withdraw bug 
// @history        0.18 Added link to discussion boards to about tab in options
// @history        0.18 Warehouse and garrison missions on hideout page no longer require page refresh
// @history        0.17 Moved options to drop down under "scripts" in top right of page
// @history        0.16 Added inspect garrison mission button to hideout page
// @history        0.15 Added links to hideout(s) that spy is from on island view
// @history        0.14 Added target player and alliance name to entries on hideout page
// @history        0.14 Improved action buttons
// @history        0.13 Added optional debug mode to display script execution time
// @history        0.13 Drastically reduced island view load time (from 4 seconds down to about 50 milliseconds)
// @history        0.13 Added pillage helper stats to cities on island view
// @history        0.13 Added link to view cities on their islands in hideout view
// @history        0.13 Inactives are marked on hideout page
// @history        0.12 Shows the number of mortars needed (thanks Bedevere)
// @history        0.12 Added commas to resource amounts
// @history        0.11 Resources available reports now display time since last report instead of report date
// @history        0.10 Added detailed report button to battle reports where you lost on the first round
// @history        0.09 Added optional spy icons next to cities in which you have a spy on island view
// @history        0.09 Added optional blinking effect on names of inactive cities on island view
// @history        0.09 Added optional marking of cities not in an alliance in red
// @history        0.08 Added settings to Ikariam options page
// @history        0.07 Fixed memory overflow caused by spy list being stored as an array rather than an object
// @history        0.06 Fixed URL error with pillage and blockade buttons on hideout page
// @history        0.06 Fixed error caused by spying on a city with a new spy
// @history        0.05 Added target city's port level to hideout page
// @history        0.04 Added notification of military occupation to hideout page
// @history        0.03 Enabled automatic script update checking
// @history        0.03 Towns with no available resources after inspecting warehouse are now marked as such
// @history        0.03 Added target city level to hideout page
// @history        0.02 Fixed redirection back to hideout after using get resources atter withdrawing a spy
//
// ==/UserScript==

ScriptUpdater.check(59879, "0.26");


IkaTools.init({
	debugMode:false,
	trackData:{
		resources:false, construction:false,
	}
});

Config.prefix = 'testing' + document.domain;

Config.settings = {
	"General":{
		html:'<p>General settings for the Pillage Helper.</p>',
		fields:{
			targetsOverview:{
				type:'checkbox',
				label:'Targets Overview',
				text:'targets overview dropdown under research advisor',
				value:true,
			},
		}
	},
	"Island":{
		html:'<p>These settings will effect the way things are displayed on the island view.</p>', 
		fields:{
			islandShowSpies:{
				type:'checkbox', 
				label:'Spy Icons',
				text:'show spy icons next to the cities in which you have spies',
				value:true,
			},
			islandBlinkInactives:{
				type:'checkbox', 
				label:'Blink Inactives',
				text:'make names of inactive cities blink ',
				value:true,
			},
			islandMarkLoners:{
				type:'checkbox', 
				label:'Mark Loners',
				text:'names of cities not in an alliance in red ',
				value:true,
			},			
		}
	},
	"Missions":{
		html:'<p>Select which missions you would like shown.</p>',
		fields:{
			showMissionGold:{
				type:'checkbox',
				label:'Gold',
				text:'show spy out treasure chamber',
				value:false,
			},
			showMissionResearch:{
				type:'checkbox',
				label:'Research',
				text:'show spy out research level',
				value:false,
			},
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">Ikariam Pillage Helper v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a></p>\
				<p>This script is designed to make your life easier when pillaging.</p>\
				<p>Please post all feedback and bug reports <a href="http://userscripts.org/scripts/discuss/' + ScriptUpdater.scriptId + '" target="_blank">here</a>.</p>',
		fields:{
			debugMode:{
				type:'checkbox',
				label:'Debug Mode',
				text:'show script execution time',
				value:false,
			},
		},
	}
};
Config.scriptName = 'Ikariam Pillage Helper';



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
		IkaTools.addOptionsLink("Pillage Helper");
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
	cityReloadSpies:function(city, callback) {
		var hideout = IkaTools.cityGetBuildingByType('safehouse', city);
		if(hideout) {
			IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=safehouse&position=' + hideout.position + '&id=' + hideout.cityId, function(root) {
				// clear spies from this city
				var newSpies = {};
				for(var spyId in Pillage.spies) 
					if(Pillage.spies[spyId].cityId != city.id)
						newSpies[spyId] = Pillage.spies[spyId];
				Pillage.spies = newSpies;
				Pillage.saveSpies();
				// load spies in city
				$('#mainview div.spyinfo', root).each(function(i) {
					try { var targetId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var targetId = false; }
					if(targetId) {
						// reload spy data
						var spyId = $('.missionButton a', this)[0].href.match(/spy=(\d+)/)[1];
						var spy = Pillage.getSpyById(spyId);
						spy = spy ? spy : {id:spyId};
						spy.targetId = targetId;
						spy.cityId = city.id;
						Pillage.spies[spyId] = spy;
						// reload target data
						var target = Pillage.getTargetById(targetId);
						target = target ? target : {id:targetId};
						var tmp = $('li.city a', this).html();
						target.cityName = tmp.match(/^[^\(]+/)[0];
						target.islandX = tmp.match(/\((\d+),\d+\)/)[1];
						target.islandY = tmp.match(/\(\d+,(\d+)\)/)[1];
						Pillage.targets[targetId] = target;
						
					}
				});
				Pillage.saveTargets();
				Pillage.saveSpies();		
				if(typeof(callback) == 'function') callback();
			});
		}
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
			div.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:950px; margin-left:-776px; position:relative; z-index:10500;'); 
			$('li#advResearch').append(div);
			GM_addStyle('#pillageHelperTargetsOverview a { display:inline !important; color:#000099 !important; }\
						#pillageHelperTargetsOverview a:hover { text-decoration:underline !important; }\
						#pillageHelperTargetsOverview * { font-size:12px !important; }\
						#pillageHelperTargetsOverview th { font-weight:bold; }\
						#pillageHelperTargetsOverview th, #pillageHelperTargetsOverview td { padding:5px !important; border-bottom:1px dotted #9D836A !important; }\
						#pillageHelperTargetsOverview tr.even { background-color:#FDF7DD !important; } \
						#pillageHelperTargetsOverview th { line-height:14px !important; }\
						#pillageHelperTargetsOverview td { border-left:1px dotted #9D836A !important; padding:2px 5px !important; }\
						#pillageHelperTargetsOverview tr:hover > td { background-color:#CBECFF !important; }\
						#pillageHelperTargetsOverview td.pillageHelperTargetsOverviewSpies { position:relative; text-align:center; }\
						#pillageHelperTargetsOverview img.disabled { opacity:.2; }\
						#pillageHelperTargetsOverview .pillageHelperTargetsOverviewSpies .pillageHelperTargetsOverviewSpiesDetails { margin-top:0; margin-left:-72px; position:absolute; background-color:#FDF7DD; z-index:20000; display:none; border:1px solid #666; padding:1em !important; text-align:left; width:200px;}\
						#pillageHelperTargetsOverview .pillageHelperTargetsOverviewSpies:hover .pillageHelperTargetsOverviewSpiesDetails { display:block; }\
						.pillageHelperTargetsOverviewGarrison .pillageHelperTargetsOverviewGarrisonDetails { display:none; position:absolute; background-color:#FDF7DD; padding:.5em; border:1px solid #666; margin-left:-50px; z-index:30000; margin-top:4px;  }\
						.pillageHelperTargetsOverviewGarrison:hover .pillageHelperTargetsOverviewGarrisonDetails { display:block; }');
		}
		var html = '<table cellpadding="0" cellspacing="0" border="0" width="100%">\
						<tr valign="middle" style="background-image:url(/skin/input/button.gif); height:14px;">\
							<th>Player</th>\
							<th>Ally</th>\
							<th>City</th>\
							<th style="text-align:center"><img src="/skin/img/city/building_townhall.gif" style="height:16px" title="City Level"/></th>\
							<th style="text-align:center"><img src="/skin/layout/stadtmauer_icon.gif" style="height:16px" title="Wall Level"/></th>\
							<th style="text-align:center"><img src="/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:16px" title="Port Level"/></th>\
							<th style="text-align:center"><img src="/skin/img/city/building_port.gif" style="height:16px" title="Port Level"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_wood.gif" style="height:14px;" title="Wood available for pillaging"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_wine.gif" style="height:14px;" title="Wine available for pillaging"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_marble.gif" style="height:14px;" title="Marble available for pillaging"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_crystal.gif" style="height:14px;" title="Crystal available for pillaging"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_sulfur.gif" style="height:16px;" title="Sulphur available for pillagin"/></th>\
							<th style="text-align:center;"><img src="/skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:16px;" title="Trade ships required to carry lootg"/></th>\
							<th style="text-align:center;"><img src="/skin/img/city/building_barracks.gif" style="height:16px;" title="Garrison information"/></th>\
							<th style="text-align:center"><img src="/skin/characters/military/120x100/spy_120x100.gif" style="height:16px" title="Spies in target"/></th>\
							<th style="text-align:right"><img src="' + Pillage.icons.refreshSmall + '" style="cursor:pointer;" id="PillageHelperTargetsOverviewRefresh" title="Reload all spies"/></th>\
						</tr>';
		var targets = Pillage.targets;
		var i = 0;
		for(var id in targets) {
			i++;
			var target = targets[id];
			var spies = Pillage.targetGetSpies(target);
			// load city info if absent
			if(spies.length > 0 && Pillage.targetGetCityLevel(target) == '?')
				Pillage.targetFetchCityInfo(target, Pillage.drawTargetsOverview);	
			// get number of spies per city
			var cities = IkaTools.getCities();
			var spiesPerCity = {};
			for(var z = 0; z < spies.length; z++) {
				spiesPerCity[spies[z].cityId] = typeof(spiesPerCity[spies[z].cityId]) != 'undefined' ? spiesPerCity[spies[z].cityId] + 1 : 1;
			}			
			html += '<tr class="' + (i%2 == 0 ? 'even' : '') + '" id="pillageHelperTargetOverview_' + target.id + '">';
	
			html += '	<td>' + (Pillage.targetGetPlayerName(target) ? Pillage.targetGetPlayerName(target) : '?') + '</td>';
			html += '	<td>' + (Pillage.targetGetAllianceName(target) ? Pillage.targetGetAllianceName(target) : '?') + '</td>';
			var nameWithCoords = '[' + target.islandX + ':' + target.islandY + '] ' + target.cityName;
			html += '	<td>' + (spies.length > 0 ? '<a href="/index.php?view=city&id=' + target.id + '">' : '') + nameWithCoords + (spies.length > 0 ? '</a>' : '') + 
							(Pillage.targetIsOccupied(target) ? ' <img src="/skin/img/island/besatzung_rot_cursor.gif" style="vertical-align:middle; height:18px;"/>' : '') + 
						'</td>';
			html += '	<td title="City Level" style="text-align:center">' + Pillage.targetGetCityLevel(target) + '</td>\
						<td title="Wall Level" style="text-align:center">' + Pillage.targetGetWallLevel(target) + '</td>\
						<td title="Mortars Needed"  style="text-align:center">' + Pillage.targetGetMortarsNeeded(target) + '</td>\
						<td title="Port Level"  style="text-align:center">' + Pillage.targetGetPortLevel(target) + '</td>';
			// resources
			var resourcesUpdatedString = Pillage.targetGetResourcesLastUpdatedString(target);
			for(var z = 0; z < Pillage.resourceTypes.length; z++) {
				var type = Pillage.resourceTypes[z];
				var available = Pillage.targetGetResourceAvailable(target, type);
				html += '<td title="Last checked: ' + resourcesUpdatedString + '" style="text-align:center;" id="pillageHelperTargetResource' + type + '_' + target.id + '">' + (available > 0 ? IkaTools.addCommas(available) : (resourcesUpdatedString == '?' ? '?' : '-')) + '</td>';
			}
			// ships
			var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
			html += '<td title="Last checked: ' + resourcesUpdatedString + '" style="text-align:center; font-weight:bold;" id="pillageHelperTargetOverviewShips_' + target.id + '">' + (resourcesUpdatedString != '?' ? Math.ceil(totalAvailable / 500) : (resourcesUpdatedString == '?' ? '?' : '-') ) + 
					'</td>';		
			// garrison
			var garrisonHtml = typeof(target.garrison) != 'undefined' ? target.garrison.html : false;
			html += '<td style="text-align:center;" class="pillageHelperTargetsOverviewGarrison">' + 
						(garrisonHtml ? 
						 		(garrisonHtml.match(/class="count">[1-9]/) ? '<img src="/skin/layout/shield-icon2.gif" style="height:14px; vertical-align:middle;"/>' : '-')
								: '?'
						) + 
						(garrisonHtml ? '<div class="pillageHelperTargetsOverviewGarrisonDetails">Updated: ' + Pillage.targetGetGarrisonLastUpdatedString(target) + 
							(garrisonHtml.match(/class="count">[1-9]/) ? '<br/><br/>' + garrisonHtml : '') + 
							'</div>' : '') +
					'</td>';
			// spies
			html += '	<td title="Number of spies in ' + target.cityName + '" style="text-align:center;">';
							var numSpiesTotal = 0;
							for(var x in spies)
								numSpiesTotal++;
							html += numSpiesTotal > 0 ? numSpiesTotal : '-';
			html += '	</td>\
						<td style="text-align:right;">'
							html += Pillage.targetGetIslandId(target) ?
									'	<a href="/index.php?view=island&cityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '"><img src="/skin/layout/icon-island.gif" style="height:16px;" title="View ' + target.cityName + ' on its island"/></a>' :
									'	<img src="/skin/layout/icon-island.gif" style="height:16px;" class="disabled" title="Unable to view island because its ID is not yet known"/>'
			// missions
							html += '<div class="pillageHelperTargetsOverviewSpies" style="display:inline;">';
							if(numSpiesTotal > 0) {
								html += '<img src="/skin/layout/icon-mission.gif" style="height:14px; cursor:pointer;"/>';
								var spiesHtml = '<div class="pillageHelperTargetsOverviewSpiesDetails" style="padding-bottom:0 !important;">';
								for(var x in spies) {
									var city = IkaTools.getCityById(spies[x].cityId);
									var hideout = city ? IkaTools.cityGetBuildingByType('safehouse', city) : false;
									spiesHtml += hideout ? '<div style="margin-bottom:1em;">\
																<img src="/skin/layout/icon-missionAbort.gif" style="height:14px; float:right; margin-left:4px; cursor:pointer;" title="Withdraw from ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionWithdraw" name="' + spies[x].id + '"/>\
																<img src="/skin/layout/bulb-on.gif" style="height:16px; float:right; cursor:pointer; margin-left:2px;" title="Check online status for the owner of ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionOnline" name="' + spies[x].id + '"/>\
																<img src="/skin/img/city/building_barracks.gif" style="height:16px; float:right; cursor:pointer;" title="Inspect garrison in ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionGarrison" name="' + spies[x].id + '"/>\
																<img src="/skin/img/city/building_warehouse.gif" style="height:16px; float:right; cursor:pointer;" title="Inspect warehouse in ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionResources" name="' + spies[x].id + '"/>\
																<a href="javascript:Pillage.goTo(\'http://' + document.domain + '/index.php?view=safehouse&position=' + hideout.position + '&id=' + city.id + '\', ' + city.id + ');" title="Go to hideout in ' + city.name + '">' + city.name + '</a>' +
															'</div>' 
															: '';
								}
								html += spiesHtml + '</div>';
							} else
								html += '<img src="/skin/layout/icon-mission.gif" style="height:14px;" class="disabled" title="You have no speis in ' + target.cityName + '"/>'
							html += '</div>';
			// pillage
							html += ' <a href="/index.php?view=plunder&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="Pillage ' + target.cityName + '"><img src="/skin/actions/plunder.gif" style="height:14px;"/></a>';
			// blockade
							html += ' <a href="/index.php?view=blockade&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="Blockade ' + target.cityName + '"><img src="/skin/actions/blockade.gif" style="height:14px;"/></a>';
			// send spy
							html += Pillage.targetGetIslandId(target) ?
										' <a href="/index.php?view=sendSpy&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="Send spy to ' + target.cityName + '"><img src="/skin/actions/espionage.gif" style="height:14px;"/></a>' :
										' <img src="/skin/actions/espionage.gif" style="height:14px;" class="disabled" title="Unable to send spy because island ID is not yet known"/>';											
							html += numSpiesTotal == 0 ? 
									'<img src="' + Pillage.icons.trash + '" title="Remove ' + target.cityName + ' from target list" style="cursor:pointer;" class="pillageHelperTargetOverviewDeleteImg" name="' + target.id + '" />' : 
									'<img src="' + Pillage.icons.trash + '" title="You still have spies in ' + target.cityName + '" class="disabled"/> '
			html +='	&nbsp; </td>';
						
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
		$('img.pillageHelperTargetsOverviewMissionResources').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.tackTargetsOverview();
				Pillage.missionResources(spyId, function(spy) {
					Pillage.drawTargetsOverview();	
					Pillage.tackTargetsOverview(false);
					/*
					var target = Pillage.getTargetById(spy.targetId);
					$('#pillageHelperTargetOverviewShips_' + target.id).html(Pillage.targetGetShipsNeeded(target));
					$('#pillageHelperTargetOverviewShips_' + target.id).attr('title', 'Last updated: ' + Pillage.targetGetResourcesLastUpdatedString(target));
					for(var i = 0; i < Pillage.resourceTypes.length; i++) {
						var type = Pillage.resourceTypes[i];
						var qty = IkaTools.addCommas(Pillage.targetGetResourceAvailable(target, type));
						$('#pillageHelperTargetResource' + type + '_' + target.id).html(qty == 0 ? '-' : qty);	
						$('#pillageHelperTargetResource' + type + '_' + target.id).attr('title', 'Last updated: ' + Pillage.targetGetResourcesLastUpdatedString(target));
					}
					*/
				});
			}, false);
		});
		$('img.pillageHelperTargetsOverviewMissionGarrison').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.tackTargetsOverview();
				Pillage.missionGarrison(spyId, function(spy) {
					Pillage.drawTargetsOverview();	
					Pillage.tackTargetsOverview(false);
				});
			}, false);
		});
		$('img.pillageHelperTargetsOverviewMissionOnline').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.tackTargetsOverview();
				Pillage.missionOnline(spyId, function(spy) {
					Pillage.tackTargetsOverview(false);
				});
			}, false);
		});
		$('img.pillageHelperTargetsOverviewMissionWithdraw').each(function() {
			var spyId = this.name;
			this.addEventListener('click', function() {
				Pillage.missionWithdraw(spyId, function() {
					Pillage.drawTargetsOverview();	
				});
			}, false);
		});
		// reload all targets
		$('#PillageHelperTargetsOverviewRefresh')[0].addEventListener('click', function() {
			this.src = Pillage.icons.loading;			
			var cities = IkaTools.getCities();
			var numHideouts = 0;
			for(var i = 0; i < cities.length; i++) {
				var hideout = IkaTools.cityGetBuildingByType('safehouse');
				if(hideout) {
					numHideouts++;
					Pillage.cityReloadSpies(cities[i], function() {
						numHideouts--;
						if(numHideouts == 0) {
							Pillage.loadData();
							Pillage.drawTargetsOverview();
						}
					});
				}
			}
		}, false);
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
		Pillage.targets = newTargets;
		Pillage.saveTargets();
		Pillage.drawTargetsOverview();
	},
	fetchPlayerScore:function(playerName, type, callback) {
		IkaTools.getRemoteDocument('http://' + document.domain + '/index.php', callback, 'POST', "view=highscore&highscoreType=" + type + "&searchUser=" + playerName);
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
	missionGarrison:function(spyId, callback) {
		Pillage.tackTargetsOverview();
		var spy = Pillage.getSpyById(spyId);
		var target = Pillage.getTargetById(spy.targetId);
		var targetId = target.id;
		var cityId = spy ? spy.cityId : false;
		Pillage.lastTarget = Pillage.getTargetById(targetId);
		var spies = Pillage.getSpiesByTargetId(targetId, cityId);
		var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(cityId));
		if(!hideout) 
			alert("Can't fina a hideout in " + IkaTools.getCityById(cityId).name + '!');
		else {
			Pillage.targetFetchCityInfo(target, function() {
				var url = cityId ? 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + cityId + '&position=' + hideout.position + '&spy=' + spy.id : false;
				IkaTools.getRemoteDocument(url, function(doc) {
					var risk = $('#missionlist li.garrison .missionRisk', doc).text().match(/\d+%/)[0];
					var cost = $('#missionlist li.garrison .missionCosts .gold', doc).text();
					var c = confirm('This garrison mission will cost ' + cost + ' gold and has a ' + risk + ' risk of failure.');
					if(c) {
						var url = 'http://' + document.domain + '/' + $('#missionlist li.garrison .missionStart a', doc).attr('href');						
						IkaTools.getRemoteDocument(url, function(doc) {
							var success = $('.reportTable', doc).size() > 0;
							if(!success) {
								alert('Mission failed.');
								Pillage.deleteSpy(spy.id);
							} else {
								target.garrison = {
									html:'', 
									lastUpdated:success ? $('td', $('#mainview table.record tr', doc)[2])[1].innerHTML : false
								};
								$('td.report', doc).each(function() {
									target.garrison.html += this.innerHTML;
								});
								// generate result message
								var msg = '';
								$('.reportTable tr', doc).each(function() {
									try { 
										msg += $('td', this)[1].innerHTML.match(/\d/) ? $('td', this)[0].innerHTML + ' ' + $('td', this)[1].innerHTML + "\n" : ''; 
									} catch(e) {}
								});
								Pillage.saveTarget(target);
								alert(msg == '' ? "No troops in town" : msg);
							}
							if(typeof(callback) == 'function')
								callback(spy);
						});
					} else
						Pillage.tackTargetsOverview(false);
				});
			});
		}
	},
	missionResources:function(spyId, callback) {
		var spy = Pillage.getSpyById(spyId);
		var target = Pillage.getTargetById(spy.targetId);
		cityId = spy.cityId;
		Pillage.lastTarget = target;
		// find a spy
		var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(cityId));
		if(!hideout) 
			alert('There is no hideout in ' + IkaTools.getCityById(cityId).name + '!');
		else {
			Pillage.targetFetchCityInfo(Pillage.lastTarget, function() {
				var url = cityId ? 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + cityId + '&position=' + hideout.position + '&spy=' + spy.id : false;
				IkaTools.getRemoteDocument(url, function(doc) {
					var risk = $('#missionlist li.resources .missionRisk', doc).text().match(/\d+%/)[0];
					var cost = $('#missionlist li.resources .missionCosts .gold', doc).text();
					var c = confirm('This mission will cost ' + cost + ' gold and has a ' + risk + ' risk of failure.');
					Pillage.tackTargetsOverview(false);
					if(c) {
						var url = 'http://' + document.domain + '/' + $('#missionlist li.resources .missionStart a', doc).attr('href');						
						IkaTools.getRemoteDocument(url, function(doc) {
							var target = Pillage.lastTarget;
							var success = $('#resources', doc).size() > 0;
							target.resources = {
								wood:success ? parseInt($('.count', $('#resources tr', doc)[1]).text().replace(/,|\s|\./g, '')) : 0,
								wine:success ? parseInt($('.count', $('#resources tr', doc)[2]).text().replace(/,|\s|\./g, '')) : 0,
								marble:success ? parseInt($('.count', $('#resources tr', doc)[3]).text().replace(/,|\s|\./g, '')) : 0,
								glass:success ? parseInt($('.count', $('#resources tr', doc)[4]).text().replace(/,|\s|\./g, '')) : 0,
								sulfur:success ? parseInt($('.count', $('#resources tr', doc)[5]).text().replace(/,|\s|\./g, '')) : 0,
								lastUpdated:success ? $('td', $('#mainview table.record tr', doc)[2])[1].innerHTML : false,
							}
							Pillage.saveTarget(target);
							if(!success) {
								alert('Mission failed.');
								Pillage.deleteSpy(spyId);	
							}
							if(typeof(callback) == 'function') callback(spy);
						});
					}
				});
			});
		}
	},
	missionOnline:function(spyId, callback) {
		var spy = Pillage.getSpyById(spyId);
		var target = Pillage.getTargetById(spy.targetId);
		cityId = spy.cityId;
		Pillage.lastTarget = target;
		// find a spy
		var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(cityId));
		if(!hideout) 
			alert('There is no hideout in ' + IkaTools.getCityById(cityId).name + '!');
		else {
			Pillage.targetFetchCityInfo(Pillage.lastTarget, function() {
				var url = cityId ? 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + cityId + '&position=' + hideout.position + '&spy=' + spy.id : false;
				IkaTools.getRemoteDocument(url, function(doc) {
					var risk = $('#missionlist li.online .missionRisk', doc).text().match(/\d+%/)[0];
					var cost = $('#missionlist li.online .missionCosts .gold', doc).text();
					var c = confirm('This mission will cost ' + cost + ' gold and has a ' + risk + ' risk of failure.');
					Pillage.tackTargetsOverview(false);
					if(c) {
						var url = 'http://' + document.domain + '/' + $('#missionlist li.online .missionStart a', doc).attr('href');						
						IkaTools.getRemoteDocument(url, function(doc) {
							var target = Pillage.lastTarget;
							if($('div.content table.record tr', doc).size() == 6) {
								alert($('div.content table.record tr td.report', doc).eq(0).text());
							} else {
								alert('Mission failed.');
								Pillage.deleteSpy(spyId);	
							}
							if(typeof(callback) == 'function') callback(spy);
						});
					}
				});
			});
		}
	},
	missionWithdraw:function(spyId, callback) {
		var spy = Pillage.getSpyById(spyId);
		var hideout = spy ? IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(spy.cityId)) : false;
		if(hideout) {
			var url = 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + spy.cityId + '&position=' + hideout.position + '&spy=' + spy.id;
			IkaTools.getRemoteDocument(url, function(root) {
				var url = $('ul#missionlist li.retreat a', root).attr('href').toString();
				IkaTools.getRemoteDocument('http://' + document.domain + '/' + url, function(root) {
					Pillage.deleteSpy(spyId);
					if(typeof(callback) == 'function') callback();
				});
			});
		}
	},
	safehouseDrawTargetResources:function(target) {
		var html = 'Resources: ';
		var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
		if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
			if(totalAvailable > 0) {
				html += ' <ul class="resources" style="margin:0; display:inline; margin-left:10px;">';
				for(var i = 0; i < Pillage.resourceTypes.length; i++) {
					var type = Pillage.resourceTypes[i];
					var available = Pillage.targetGetResourceAvailable(target, type);
					if(available > 0)
						html += ' <li class="' + type + '" style="display:inline; padding-left:33px; margin-right:10px; font-weight:normal;">' + IkaTools.addCommas(available) + '</li>';
				}
				var shipsNeeded = Math.ceil(totalAvailable / 500);
				html += '</ul> <img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:24px; vertical-align:middle"/> ' + shipsNeeded;
			} else
				html += ' none ';
				var time = Pillage.targetGetResourcesLastUpdatedString(target);
			html += ' &nbsp; &nbsp;  (' + (time.match(/-/) ? '0s' : time) +' ago) </div>';
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
		return typeof(target.playerName) == 'undefined' ? false : target.playerName;
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
		var protected = 0;
		for(var i = 0; i < target.warehouses.length; i++) 
			protected += (target.warehouses[i] * 480 + 100);
		return onHand - protected > 0 ? onHand - protected : 0;
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
			if(Pillage.spies[x].targetId == target.id)
				spies.push(Pillage.spies[x]);
		return spies;
	},
	targetFetchCityInfo:function(target, callback) {
		Pillage.lastTarget = target;
		IkaTools.getRemoteDocument('http://' + document.domain +'/index.php?view=city&id=' + target.id, function(doc) {
			var target = Pillage.lastTarget;
			Pillage.targetProcessCityInfo(target, doc);
			callback();
		});
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
		target.islandId = $('#breadcrumbs a.island', doc)[0].href.match(/id=(\d+)/)[1];
		try { target.playerName = $('#information li.owner', doc)[0].innerHTML.replace(/<.+>/, ''); } catch(e) {}
		try { target.allianceName = $('#information li.ally', doc)[0].innerHTML.replace(/<.+>/, ''); } catch(e) {}
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
			var markLoners = Config.get('islandMarkLoners');
			var showSpies = Config.get('islandShowSpies');
			try { var selectedCityId = document.location.toString().match(/cityId=(\d+)/)[1]; } catch(e) { var selectedCityId = false; }
			$('ul#cities li.cityLocation').each(function(i) {
				try { var target = Pillage.getTargetById(parseInt(this.innerHTML.match(/city_(\d+)/)[1])); } catch(e) { var target = false; }
				if($('.spy', this)[0]) {
					if(showSpies) {		// spy icon
						var img = document.createElement('img');
						img.src = Pillage.icons.spy;
						img.setAttribute('style', 'vertical-align:middle; margin-left:-6px; position:relative; top:-1px;');
						img.title = "You have a spy in this town";
						$('span.before', this).after(img);
					}
					// list hideout(s)
					if(target) {
						var spyDiv = $('.spy', this)[0];
						spyDiv.style.padding = "1em 0";
						spyDiv.innerHTML = '<img src="/skin/img/city/building_safehouse.gif" style="height:14px; display:inline; position:relative; top:4px;"/>: ';
						var cities = IkaTools.getCities();
						for(var i = 0; i < cities.length; i++) {
							var spies = Pillage.getSpiesByTargetId(target.id, cities[i].id);
							var numSpies = 0;
							for(x in spies) { numSpies++; }
							if(numSpies > 0) {
								var a = document.createElement('a');
								a.innerHTML = cities[i].name;
								a.href = "javascript:Pillage.goTo('http://" + document.domain + "/index.php?view=safehouse&position=" + IkaTools.cityGetBuildingByType('safehouse', cities[i]).position + "&id=" + cities[i].id + "', " + cities[i].id + ");";
								a.style.marginLeft = ".5em";
								spyDiv.appendChild(a);
							}
						}
					}
				}
				if(markLoners && !this.innerHTML.match(/view=allyPage/)) {
					this.className += ' pillageHelperLoner';
				}	
				

				if(target) {
					try { target.islandId = document.location.toString().match(/island&id=(\d+)/)[1]; } catch(e) {}
					try { target.cityLevel = $('.citylevel', this)[0].innerHTML.replace(/[^\d]/g, ''); } catch(e) { alert(e); }
					try { target.inactive = $('.inactivity', this)[0] ? true : false; } catch(e) { alert(e); }
					try { target.playerName = $('.owner', this).html().replace(/(<[^d].*?\/>|<[^d].*?<\/[^\d]+?>)/g, '').match(/^\s*([^\s].+)\s*$/)[1]; } catch(e) { alert(e); }
					
					/*
					// fetch player score
					if(target.playerName) {
						Pillage.fetchPlayerScore(target.playerName, 'score', function(doc) {
							alert($('td.score', doc)[0].innerHTML.replace(/[^\d]/g, ''));
						});
					}
					*/
					
					try { target.allianceName = $('.ally', this).html().match(/<a[^>]+?>([^<]+?)<\/a>/)[1]; } catch(e) { target.allianceName = '-' }
					var html = '<div class="pillageHelperInfoWrapper"><p style="margin-top:1.5em;"><strong>Pillage Helper:</strong>\
									<span style="font-size:8px; position:relative; top:-2px;">\
										<span title="Wall level"><img src="/skin/layout/stadtmauer_icon.gif" style="height:16px; display:inline; margin-left:5px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '</span>\
										<span title="Mortars needed"><img src="/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:16px; margin-left:7px; display:inline; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
										<span title="Port level"><img src="/skin/img/city/building_port.gif" style="height:16px; margin-left:5px; vertical-align:middle; display:inline;"/> ' + Pillage.targetGetPortLevel(target) + '</span>\
									</span>\
								</p>';
					var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
					if(Pillage.targetGetResourcesLastUpdatedString(target) != '?') {
						html += '<p style="font-size:8px;" title="Resources available - ' + Pillage.targetGetResourcesLastUpdatedString(target) +' ago">\
							<img src="/skin/img/city/building_warehouse.gif" style="vertical-align:middle; height:16px; margin-top:2px; display:inline;"/>: &nbsp;';
						if(totalAvailable > 0) {
							for(var i = 0; i < Pillage.resourceTypes.length; i++) {
								var type = Pillage.resourceTypes[i];
								var available = Pillage.targetGetResourceAvailable(target, type);
								if(available > 0)
									html += ' <img src="/skin/resources/icon_' + type + '.gif" style="display:inline; height:12px; vertical-align:middle; margin-right:2px;"/>' + IkaTools.addCommas(available);
							}
							var shipsNeeded = Math.ceil(totalAvailable / 500);
							html += ' <img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:14px; vertical-align:middle; display:inline;"/> ' + shipsNeeded;
						} else
							html += ' none ';
						html += '</p></div>';
					}
					var div = document.createElement('div');
					div.innerHTML = html;
					$('ul.cityinfo', this).append(div);
					if(selectedCityId && selectedCityId == target.id) {
						target.position = this.id.match(/\d+$/)[0];
						$('#information .cityinfo')[0].innerHTML += $('#cityLocation' + target.position + ' .pillageHelperInfoWrapper')[0].innerHTML;
					}
					Pillage.saveTarget(target);
					
				}
			});
			if(Config.get('islandBlinkInactives'))
				GM_addStyle('span.inactivity { text-decoration:blink !important; }')
			GM_addStyle('li.pillageHelperLoner * { color:#CC0000 !important; }')
		},
		militaryAdvisorReportView:function() {
			if($('#troopsReport .contentBox01h .link a.button').size() == 0) {
				var btn = document.createElement('p');
				btn.setAttribute('style', 'text-align:center; margin:1em 0;');
				btn.innerHTML = '<a href="/index.php?view=militaryAdvisorDetailedReportView&combatRound=1&detailedCombatId=' + document.location.toString().match(/combatId=(\d+)/)[1] + '" class="button">Detailed Combat Report</a>';
				$('#troopsReport .contentBox01h .content').append(btn);
			}
		},
		plunder:function() {
			var target = Pillage.getTargetById(document.location.toString().match(/destinationCityId=(\d+)/)[1]);
			try { unsafeWindow.sliders['slider_305'].setActualValue(Pillage.targetGetMortarsNeeded(target)); } catch(e) {}
		},
		safehouse:function() {
			if(!document.location.toString().match(/tab=reports/)) {
				// clear spies from this city
				var newSpies = {};
				for(var spyId in Pillage.spies) 
					if(Pillage.spies[spyId].cityId != IkaTools.getCurrentCityId())
						newSpies[spyId] = Pillage.spies[spyId];
				Pillage.spies = newSpies;
				Pillage.saveSpies();			
	
				GM_addStyle('.pillageHelperAttackButton { height:25px; margin:0; margin-left:2px; vertical-align:middle; top:-1px; position:relative; }\
							div.spyinfo div.missionAbort, div.spyinfo div.missionButton, div.spyinfo li.city + li.status { display:none; }\
							div.spyinfo li.city + li.status + li.status { display:block; }\
							.pillageGarrisonMission { position:relative; text-align:left; }\
							.pillageGarrisonReport { display:none; position:absolute; top:24px; left:-4px; z-index:10000; background:#F6EBBD; padding:1em; border:1px solid #666; }\
							.pillageGarrisonReport .reportTable tr:first-child { display:none; }\
							.pillageGarrisonMission:hover .pillageGarrisonReport { display:block; }\
							.pillageGarrisonReport:hover { display:none !important; }');
				$('#mainview div.spyinfo').each(function(i) {
					 // re-display status 
					if($('div.time', this).size() > 0) {
						$('.status', this).attr('style', 'display:block;');
					}
					try { var targetId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var targetId = false; }
					if(targetId) {
						// reload spy data
						var spyId = $('.missionButton a', this)[0].href.match(/spy=(\d+)/)[1];
						var spy = Pillage.getSpyById(spyId);
						spy = spy ? spy : {id:spyId};
						spy.targetId = targetId;
						spy.cityId = IkaTools.getCurrentCityId();
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
						$('.city', this)[0].innerHTML += ' &nbsp; <a href="/index.php?view=island&cityId=' + target.id + '" title="View city on island"><img src="/skin/layout/icon-island.gif" style="vertical-align:middle;"/></a>';
						var div = document.createElement('div');
						div.id = "pillageHelperTools" + targetId;
						div.setAttribute('style', 'margin-top:1.5em; margin-left:1em;');
						var html = '<p align="right">\
								<a title="Mission List" href="' + $('.missionButton a', this).attr('href') + '"><img src="/skin/layout/icon-mission.gif" class="pillageHelperAttackButton"/></a>\
								<a href="javascript:void(0)" id="pillageHelperMissionResources' + spyId + '" class="button" title="Inspect Resources" style="padding-left:2px; padding-right:2px;">\
									<img src="/skin/img/city/building_warehouse.gif" style="height:21px; vertical-align:middle"/></a>\
								<a href="javascript:void(0)" id="pillageHelperMissionGarrison' + spyId + '" class="button pillageGarrisonMission" style="padding-left:6px; padding-right:6px;">\
									<img src="/skin/img/city/building_barracks.gif" style="height:17px; position:relative; top:-1px; vertical-align:middle;"/>';
									
						if(typeof(target.garrison) != 'undefined') {
							html += '<div class="pillageGarrisonReport">' + Pillage.targetGetGarrisonLastUpdatedString(target) + ' ago:<br/><br/>' +
										target.garrison.html + 
									'</div>';	
						}
						html += '</a>\
								<a title="Pillage" href="/index.php?view=plunder&destinationCityId=' + target.id + '"><img src="/skin/actions/plunder.gif" class="pillageHelperAttackButton"/></a>\
								<a title="Blockade" href="/index.php?view=blockade&destinationCityId=' + target.id + '"><img src="/skin/actions/blockade.gif" class="pillageHelperAttackButton"/></a>\
								<a title="Withdraw" id="PillageHelperWithdraw_' + spy.id + '" href="javascript:void(0)"><img src="/skin/layout/icon-missionAbort.gif" class="pillageHelperAttackButton"/></a>\
							</p><p style="margin-top:-2em;">\
								<img src="/skin/img/city/building_townhall.gif" style="height:25px; margin-left:-20px; vertical-align:middle"/> ' + Pillage.targetGetCityLevel(target) + '\
								<img src="/skin/layout/stadtmauer_icon.gif" style="height:25px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '\
								<span title="Mortars needed"><img src="/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:25px; margin-left:10px; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
								<img src="/skin/img/city/building_port.gif" style="height:25px; margin-left:10px; vertical-align:middle"/> ' + Pillage.targetGetPortLevel(target) + '\
								';
						if(Pillage.targetIsOccupied(target)) {
							html += '<img src="/skin/img/island/besatzung_rot_cursor.gif" style="margin-left:10px; height:30px; vertical-align:middle" title="The target city is under military occupation"/> '
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
						// inspect resources
						$('#pillageHelperMissionResources' + spyId)[0].addEventListener('click', function() { 
							Pillage.missionResources(spy.id, function(spy) {
								var target = Pillage.getTargetById(spy.targetId);
								Pillage.safehouseDrawTargetResources(target);
							}); 
						}, false);
						$('#pillageHelperMissionGarrison' + spyId)[0].addEventListener('click', function() { 
							Pillage.missionGarrison(spyId, function(spy) {
								var target = Pillage.getTargetById(spy.targetId);
								$('#pillageHelperMissionGarrison' + spy.id +' div')[0].innerHTML = target.garrison.html;
							}); 
						}, false);
						$('#PillageHelperWithdraw_' + spy.id)[0].addEventListener('click', function() {
							var hideout = IkaTools.cityGetBuildingByType('safehouse', IkaTools.getCityById(spy.cityId));
							var url = 'http://' + document.domain + '/index.php?view=safehouseMissions&id=' + spy.cityId + '&position=' + hideout.position + '&spy=' + spy.id;
							IkaTools.getRemoteDocument(url, function(root) {
								document.location = $('ul#missionlist li.retreat a', root).attr('href');
							});
						}, false);
					}
				});
				Pillage.saveSpies();
				Pillage.saveTargets();	
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
		loading:'data:application/force-download;base64,R0lGODlhEAAQAPQAAPDWmoDJdenVl7zPiOLTlJ7LfrXOhYDJdabNgY/KecvQjdPSkIfJd8TQi4DIdZfLfK3NhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA%3D%3D',
		checkmark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC',
	},
	resourceTypes:['wood', 'wine', 'marble', 'glass', 'sulfur'],
}

Pillage.init();