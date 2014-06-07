// ==UserScript==
// @name           	Ikariam Empire Overview
// @namespace      	PhasmaExMachina
// @description    	Adds a dropdown menu to the Show Town with links to the buildings in your current city.
// @author			PhasmaExMachina
// @include       	http://s*.**.ikariam.*/*
// @require		   	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        	http://userscripts.org/scripts/source/57377.user.js
// @require       	http://userscripts.org/scripts/source/57756.user.js
// @require         http://userscripts.org/scripts/source/58203.user.js
// @require         http://userscripts.org/scripts/source/62718.user.js
// @version			0.30
//
// @history			0.30 Fixed height of table rows in buildings overview for google chrome 
// @history			0.29 Military overview now includes troops in transit in the totals
// @history			0.28 Setting debug mode now displays errors within included IkaTools script
// @history			0.27 Maxed buildings are no longer shown as upgradable in building lists and city view 
// @history			0.26 Added option to disable building levels in city view
// @history			0.26 Reduced chance of conflicts with other scripts
// @history			0.26 Improved city changing algorythms
// @history			0.26 Added links to city islands in world overview
// @history			0.26 Added reload all army info button to army overview
// @history			0.25 Fixed bug caused when displaying resource type next to city names in city select
// @history			0.24 Fixed bug where temples caused building overview to break
// @history			0.23 Added building level indicators to city view
// @history			0.23 Fixed calculation and display of income
// @history			0.23 Moved deploy ships/units to right in military overview to match world overview
// @history			0.22 Fixed bug in troop movement dropdown when blockading a port
// @history			0.22 Fixed error in calculation of population
// @history			0.22 Deployed and occuppied cities are no longer shown in builing overview (town adviser dropdown)
// @history			0.22 Added drop-down of troops in each town to military adviser
// @history			0.21 Fixed fetal error when viewing allied cities where you have troops stationed
// @history			0.20 Loading complete no longer triggers Growl notification
// @history			0.18 Added link to view troops in each city
// @history			0.17 Added support for Growl notifications
// @history			0.17 Added Growl notification for end of troop movement
// @history			0.16 Greatly reduced load time by drawing dropdowns on first mouseover instead of every page load
// @history			0.16 Increased width of building lists to allow more room for displaying missing resources
// @history			0.16 Added overview of building levels to view island button
//
// ==/UserScript==

var startTime = new Date();

ScriptUpdater.check(57197, "0.30");

Config.prefix = document.domain;
Config.scriptName = "Ikariam Empire Overview";
Config.settings = {
	"General":{
		html:'	<p>General options for the empire overview</p>',
		fields:{
			showBuildingLevels:{
				type:'checkbox',
				label:'Building Levels',
				text:'show building levels in city view',
				value:true,
			}
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">Ikariam Empire Overview v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a>\
				<p>Adds drop-down overviews of your empire to the Show world, island, town and adviser buttons. Features resource production, current transport movements, building links, army, etc.</p>',
		fields:{
			debugMode:{
				type:'checkbox',
				label:'Debug Mode',
				text:'show script execution time',
				value:false,
			}
		}
	}
};


IkaTools.config.debugMode = Config.get('debugMode');

IkaTools.init();
unsafeWindow.ikaEmpireGoTo = IkaTools.goTo;

IkaEmpire = {
	buttonWorldView:$('#changeCityForm .viewWorldmap')[0],
	buttonIslandView:$('#changeCityForm .viewIsland')[0],
	buttonMilitaryAdviser:$('#advMilitary')[0],
	buttonTownAdviser:$('#advCities')[0],
	
	movementsUpdated:false,
	worldOverview:false,
	townOverview:false,
	buildingsOverview:false,
	expiredMovements:{},
	init:function() {
		IkaTools.addOptionsLink("Empire Overview");
		if($('#changeCityForm .viewCity').size() > 0) {
			IkaEmpire.buttonTownView = $('#changeCityForm .viewCity')[0];
		} else {
			IkaEmpire.buttonTownView = $('#changeCityForm .viewRelatedCity')[0];
		}
		//------------------------------ Military Adviser ----------------------------------
		IkaEmpire.buttonIslandView.addEventListener('mouseover', function() {
			if(typeof(IkaEmpire.militaryOverview) == 'undefined') {
				IkaEmpire.militaryOverview = document.createElement('div');	
				IkaEmpire.militaryOverview.setAttribute('style', 'display:block; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:950px; margin-left:-405px; z-index:9000; position:relative;');
				IkaEmpire.militaryOverview.innerHTML = '<div id="ikaEmpireMilitaryOverviewTransport"><div style="font-size:2em; padding:2em; text-align:center;">loading ...</div></div>';
				IkaEmpire.buttonIslandView.appendChild(IkaEmpire.militaryOverview);
			}
			if(!IkaEmpire.movementsUpdated) {
				IkaEmpire.movementsUpdated = true;
				if(IkaTools.getView() == "militaryAdvisorMilitaryMovements") {
					IkaEmpire.drawMovements(IkaTools.getMovements());
				} else {
					IkaTools.getMovementsUpdate(IkaEmpire.drawMovements);
				}
			}
			IkaEmpire.militaryOverview.style.display = 'block';
		}, true);
		IkaEmpire.buttonIslandView.addEventListener('mouseout', function() {
			if(typeof(IkaEmpire.militaryOverview) != 'undefined') {
				IkaEmpire.militaryOverview.style.display = 'none';	
			}
		}, true);
		
		
		IkaEmpire.buttonTownView.addEventListener('mouseover', IkaEmpire.drawTownOverview, false);
		IkaEmpire.buttonTownAdviser.addEventListener('mouseover', IkaEmpire.drawBuildingsOverview, false);
		IkaEmpire.buttonWorldView.addEventListener('mouseover', IkaEmpire.drawWorldOverview, false);
		IkaEmpire.buttonMilitaryAdviser.addEventListener('mouseover', IkaEmpire.drawMilitaryOverview, false);
		
		if(typeof(IkaEmpire.views[IkaTools.getView()]) == 'function')
			IkaEmpire.views[IkaTools.getView()]();
		
		setInterval(IkaEmpire.updateMovementTimers, 1000);
	},
	drawMilitaryOverview:function() {
		if($('#empireMilitaryOverview').size() == 0) {
			IkaTools.troopOverview = true;		
			GM_addStyle('#empireMilitaryOverview a { display:inline !important; }\
						#empireMilitaryOverview * { font-size:12px !important; }\
						#empireMilitaryOverview th, #empireMilitaryOverview td { padding:5px !important; border-bottom:1px dotted #9D836A !important; }\
						#empireMilitaryOverview tr.even { background-color:#FDF7DD !important; } \
						#empireMilitaryOverview th { line-height:14px !important; }\
						#empireMilitaryOverview td { border-left:1px dotted #9D836A !important; }');
			var top = {phalanx:'-3px', steamgiant:'0;', spearman:'-1px', swordsman:'-3px', slinger:'-1px', archer:'0', marksman:'1px', ram:'-6px', catapult:'-9px', mortar:'-8px', gyrocopter:'-8px', bombardier:'-12px', cook:'-3px', medic:'1px'};
			var cities = IkaTools.getCities();
			// get totals
			var totalUnits = {};
			for(var i = 0; i < cities.length; i++) {
				for(var x = 0; x < IkaTools.unitTypes.length; x++) {
					totalUnits[IkaTools.unitTypes[x]] = typeof(totalUnits[IkaTools.unitTypes[x]]) == 'undefined' ? 0 : totalUnits[IkaTools.unitTypes[x]];
					totalUnits[IkaTools.unitTypes[x]] += IkaTools.cityGetUnitQty(IkaTools.unitTypes[x], cities[i]); 
					if(i == 0)	// output header styles once (only during first city)
						GM_addStyle('#empireMilitaryOverview th.' + IkaTools.unitTypes[x] + ' { background-image:url(/skin/characters/military/x40_y40/y40_' + IkaTools.unitTypes[x] + '_faceright.gif) !important; background-repeat:no-repeat; background-position:center ' + (typeof(top[IkaTools.unitTypes[x]]) != 'undefined' ? top[IkaTools.unitTypes[x]] : '-2px') + '; }');	
				}
			}
			IkaEmpire.troopOverview = document.createElement('div');
			IkaEmpire.troopOverview.id = "empireMilitaryOverview";
			IkaEmpire.troopOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:950px; margin-left:-686px; position:relative; z-index:10500;'); 
			var html = '<table cellspacing="0" cellpadding="0" border="0" style="margin:0; width:100%;">\
					<tr valign="middle" style="background-image:url(/skin/input/button.gif); height:14px;">\
						<th><strong>City</strong></th>';
			for(var x = 0; x < IkaTools.unitTypes.length; x++) {
				if(typeof(totalUnits[IkaTools.unitTypes[x]]) != 'undefined' && totalUnits[IkaTools.unitTypes[x]] > 0) {
					html += '<th class="' + IkaTools.unitTypes[x] + '"> </th>';	
				}
			}	
			html += '<th><img id="ikaEmpireMilitaryRefresh" src="' + IkaEmpire.icons.refreshSmall + '" style="float:right; margin-right:2px; cursor:pointer;" title="Reload all military information"/></th></tr>';
			// get movements
			var movs = IkaTools.getMovements();
			var unitsInTrans = {};
			var str = '';
			for(var i = 0; i < movs.length; i++) {
				switch(movs[i].mission) {
					case 'plunder': var cityId = movs[i].originId; break;
					case 'deployarmy': var cityId = movs[i].direction == 'left' ? movs[i].originId : movs[i].targetId; break;
					default: var cityId = false;
				}
				if(cityId) {
					unitsInTrans[cityId] = typeof(unitsInTrans[cityId]) == 'undefined' ? {} : unitsInTrans[cityId];
					for(var x = 0; x < movs[i].units.length; x++) {
						try { var type = movs[i].units[x].iconSrc.match(/y40_([^_]+)/)[1]; } catch(e) { var type = false; }
						if(type) {
							totalUnits[type] = typeof(totalUnits[type]) == 'undefined' ? 0 : totalUnits[type];
							totalUnits[type] += parseInt(movs[i].units[x].qty);
							unitsInTrans[cityId][type] = typeof(unitsInTrans[cityId][type]) == 'undefined' ? 0 : unitsInTrans[cityId][type];
							unitsInTrans[cityId][type] += parseInt(movs[i].units[x].qty);   
						}
					}
				}
			}
			
			for(var i = 0; i < cities.length; i++) {
				var view = cities[i].type ? 'relatedCities' : 'cityMilitary-army';
				html += '<tr' + (i % 2 != 0 ? ' class="even"' : '') + '>\
					<td style="width:230px;">';
				html += '<a href="javascript:ikaEmpireGoTo(\'/index.php?view=' + view + '&id=' +  cities[i].id + '\', ' +  cities[i].id + ');" style="font-weight:' + (cities[i].id == IkaTools.getCurrentCityId() ? 'bold' : 'normal') + ';">' + 
						cities[i].name + '</a></td>';
				for(var x = 0; x < IkaTools.unitTypes.length; x++) {
					if(typeof(totalUnits[IkaTools.unitTypes[x]]) != 'undefined' && totalUnits[IkaTools.unitTypes[x]] > 0) {
						var inTransit = (typeof(unitsInTrans[cities[i].id]) != 'undefined' && typeof(unitsInTrans[cities[i].id][IkaTools.unitTypes[x]]) != 'undefined') ? unitsInTrans[cities[i].id][IkaTools.unitTypes[x]] : false;
						var qty = IkaTools.cityGetUnitQty(IkaTools.unitTypes[x], cities[i]);
						html += '<td align="center">' + (qty > 0 ? qty : (inTransit ? '' : '-')) + (inTransit ? ' (' + (inTransit) + ')' : '') +'</td>';
					}
				}
				html += '<td>';
				if(cities[i].id != IkaTools.getCurrentCityId()) {
					html += '<a href="/index.php?view=deployment&deploymentType=fleet&destinationCityId=' +  cities[i].id + '" title="Station fleets"><img src="/skin/actions/move_fleet.gif" style="display:inline; float:right; height:14px; margin-left:5px;"/></a>\
							<a href="/index.php?view=deployment&deploymentType=army&destinationCityId=' +  cities[i].id + '" title="Deploy troops"><img src="/skin/actions/move_army.gif" style="display:inline; float:right; height:14px;"/></a>';
				} else {
					html += '<img src="/skin/actions/move_fleet.gif" style="display:inline; float:right; height:14px; margin-left:5px; opacity:.3;"/>\
							<img src="/skin/actions/move_army.gif" style="display:inline; float:right; height:14px; opacity:.3;"/>';
				}
				var barracks = IkaTools.cityGetBuildingByType('barracks', cities[i]);
				if(barracks) {
					html += '<a title="Go to barracks" href="javascript:ikaEmpireGoTo(\'/index.php?view=barracks&position=' + barracks.position + '&id=' + barracks.cityId + '\', ' + barracks.cityId + ');"/><img src="/skin/img/city/building_barracks.gif" style="float:right; margin-right:5px; height:14px;"/></a>';
				}
				html += '</td></tr>';
			}			
			// draw totals
			html += '<tr style="background-color:#F7E4AF;"><td> </td>'
			for(var x = 0; x < IkaTools.unitTypes.length; x++) {
				if(typeof(totalUnits[IkaTools.unitTypes[x]]) != 'undefined' && totalUnits[IkaTools.unitTypes[x]] > 0) {
					html += '<td style="text-align:center;">' + totalUnits[IkaTools.unitTypes[x]] + '</td>';
				}
			}
			html += '<td></td></tr></table>';
			IkaEmpire.troopOverview.innerHTML = html;
			IkaEmpire.buttonMilitaryAdviser.appendChild(IkaEmpire.troopOverview);
			IkaEmpire.buttonMilitaryAdviser.addEventListener('mouseout', function() { $('#empireMilitaryOverview')[0].style.display = 'none'; }, true);
			IkaEmpire.buttonMilitaryAdviser.addEventListener('mouseover', function() { $('#cityNav')[0].style.height = "100px"; }, true);
			IkaEmpire.buttonMilitaryAdviser.addEventListener('mouseout', function() { $('#cityNav')[0].style.height = "10px"; }, true);
			// reload all military info function
			$('#ikaEmpireMilitaryRefresh')[0].addEventListener('click', function() {
				$('#ikaEmpireMilitaryRefresh')[0].src = IkaEmpire.icons.loading;
				IkaTools.reloadAllMilitary(function() {
					$('#empireMilitaryOverview')[0].parentNode.removeChild($('#empireMilitaryOverview')[0]);
					IkaEmpire.drawMilitaryOverview();
					$('#ikaEmpireMilitaryRefresh')[0].src = IkaEmpire.icons.checkmark;
				});
			}, false);
		}
		$('#empireMilitaryOverview', IkaEmpire.buttonMilitaryAdviser)[0].style.display = "block";
	},
	drawTownOverview:function() {
		IkaEmpire.appendBuildingList(IkaTools.getCurrentCityId(), IkaEmpire.buttonTownView);
		IkaEmpire.buttonTownView.removeEventListener('mouseover', IkaEmpire.drawTownOverview, false);
		$('.buildingLinks', IkaEmpire.buttonTownView)[0].style.display = "block";
	},
	drawWorldOverview:function() {
		if(!IkaEmpire.worldOverview) {
			var cities = IkaTools.getCities();
			IkaEmpire.worldOverview = document.createElement('div');
			IkaEmpire.worldOverview.id = "buildingLinksWorldLinks";
			IkaEmpire.worldOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:950px; margin-left:-320px; position:relative;'); 
				var table = document.createElement('table');
				table.style.width = "100%";
				table.innerHTML = '<tr valign="bottom" style="background-image:url(/skin/input/button.gif)"><td><div style="width:80px; padding-left:1em;"></div></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/img/city/constructionSite.gif" style="height:12px; margin-top:5px;" title="Building under construction"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/resources/icon_citizen.gif" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/resources/icon_wood.gif" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/resources/icon_wine.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/resources/icon_marble.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/resources/icon_glass.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/resources/icon_sulfur.gif" style="height:12px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><img src="/skin/layout/bulb-on.gif" style="height:12px; margin-top:5px;"/></td>\
								  <td style="text-align:center; padding:0 .05em;"><a href="/index.php?view=finances" style="background:none; padding:0; display:inline; height:auto; width:auto;"><img src="/skin/resources/icon_gold.gif" style="height:12px; margin-top:5px;"/></a></td>\
								<td></td></tr>';
				var resourceTotals = {gold:0, population:0, wood:0, wine:0, marble:0, glass:0, sulfur:0, research:0};
				var resourceChangeTotals = {gold:0, population:0, wood:0, wine:0, marble:0, glass:0, sulfur:0, research:0};
				var cities = IkaTools.getCities();
				for(var i = 0; i < cities.length; i++) {
					if(!cities[i].type || cities[i].type.match(/tradegood/)) {
						var isCurrent = cities[i].id == IkaTools.getCurrentCityId();
						var tr = document.createElement('tr');
						tr.style.backgroundColor = i % 2 != 0 ? "#FDF7DD" : "inherit";
						tr.style.borderTop = "1px dotted #9D836A";
							var td = document.createElement('td');
							td.style.borderRight = "1px dotted #9D836A";
								var a = document.createElement('a');
								a.setAttribute('style', 'display:block; cursor:pointer; height:auto; background:none; width:auto; padding:.8em 1em; font-weight:' + (isCurrent ? 'bold' : 'normal') + ';');
								a.innerHTML = cities[i].name + ' (' + (IkaTools.cityGetLevel(cities[i]) > 0 ? IkaTools.cityGetLevel(cities[i]) : '?') + ')'; // + ' (' + cities[i].level + ')';
								a.rev = "/index.php?view=city&id=" + cities[i].id; 
								a.name = cities[i].id;
								a.title = "Income: "  + IkaTools.cityGetIncome(cities[i]);
								a.addEventListener('click', function() {											
									IkaTools.goTo(this.rev, this.name);			
									return false;
								}, true);
								a.addEventListener('mouseover', function() { this.style.textDecoration = 'underline'; }, true);
								a.addEventListener('mouseout', function() { this.style.textDecoration = 'none'; }, true);
							td.appendChild(a);		
							IkaEmpire.appendBuildingList(cities[i].id, td, '100px', '-2.7em');
							tr.appendChild(td);
							// construction
							var construction = document.createElement('td');
								construction.setAttribute('style', "border-right:1px dotted #9D836A; font-size:.9em; text-align:center;");
								construction.id = 'ikaEmpireLinksBuildTime' + cities[i].id;
							tr.appendChild(construction);
							// resources
							var resourceNames = ["population", "wood", "wine", "marble", "glass", "sulfur", "research", "gold"];
							var resourceTds = {};
							for(var z in resourceNames) {
								var type = resourceNames[z];
								resourceTds[type] = document.createElement('td');
									resourceTds[type].setAttribute('style', 'text-align:center; font-size:.9em; padding:0 .2em; border-right:1px dotted #9D836A');
									var text = IkaTools.addCommas(IkaTools.cityGetResource(type, cities[i]));
									if(type != 'gold') {
										var change = IkaTools.cityGetResourceChange(type, cities[i]);
										resourceChangeTotals[type] += change;
										text += (change != 0 ?  '<span style="font-size:.8em; padding-left:.4em;">(' + (change > 0 ? '+' : '') + change + ')</span>' : '');	
									}
									switch(type) {
										case 'population':
											var full = IkaTools.cityGetResourceMax(type, cities[i]) == IkaTools.cityGetResource(type, cities[i]) ? 'color:#ee0000; font-weight:bold;' : '';
											resourceTds[type].innerHTML += '<a style="'+full+' display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:ikaEmpireGoTo(\'/index.php?view=townHall&position=0&id=' + cities[i].id + '\', ' + cities[i].id + ')">' + text + '</a>';	
											break;
										case 'gold':
											resourceTds[type].innerHTML += '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:ikaEmpireGoTo(\'/index.php?view=finances\', ' + cities[i].id + ')">' + 
																			((type == 'gold' && IkaTools.cityGetResource(type, cities[i]) > 0) ? '+' : '') +
																			IkaTools.addCommas(IkaTools.cityGetResource(type, cities[i])) + '</a>';	
											break;
										case 'research':
											if(IkaTools.cityGetBuildingByType(cities[i], 'academy')) {

												resourceTds[type].innerHTML += '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:ikaEmpireGoTo(\'/index.php?view=academy&position=' + IkaTools.cityGetBuildingByType(cities[i], 'academy').position + '&id=' + cities[i].id + '\', ' + cities[i].id + ')">+' + change;
											}
											break;
										case 'wood':
											resourceTds[type].innerHTML += '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:ikaEmpireGoTo(\'/index.php?view=resource&type=resource&id=' + IkaTools.cityGetIslandId(cities[i]) + '\', ' + cities[i].id + ')">' + text + '</a>';	
											break;
										default:
											resourceTds[type].innerHTML += type.toString() != IkaTools.cityGetTradegoodType(cities[i]).toString() ? text : '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:ikaEmpireGoTo(\'/index.php?view=tradegood&type=tradegood&id=' + IkaTools.cityGetIslandId(cities[i]) + '\', ' + cities[i].id + ')">' + text + '</a>';	;
									}
									resourceTotals[type] += IkaTools.cityGetResource(type, cities[i]);		
									if(type != "gold") {
										if(type == 'research') {
											var percentUsed = Math.floor(IkaTools.cityGetResourceChange(type, cities[i]) / IkaTools.cityGetResourceMax(type, cities[i]) * 100);
										} else {
											var percentUsed = Math.floor(IkaTools.cityGetResource(type, cities[i]) / IkaTools.cityGetResourceMax(type, cities[i]) * 100);
										}
										percentUsed = percentUsed > 100 ? 100 : percentUsed;
										resourceTds[type].title = 'Capacity: ' +  IkaTools.addCommas(IkaTools.cityGetResourceMax(type, cities[i])) + ' (' + percentUsed + '%)';
										if(type == 'wine') {
											resourceTds[type].title += " - Wine consumption: " + IkaTools.cityGetWineConsumption(cities[i]) + " per hour";
										}
										resourceTds[type].innerHTML += '<div style="border:1px outset #FEE8C8; width:50px; height:2px; margin:auto; margin-top:5px;">' +
																		'<div style="background-color:#aa0000; line-height:2px; height:2px; width:' + percentUsed + '%; opacity:' + 
																		(percentUsed < 100 ? '.' + percentUsed : '1')+ ';"> </div>' +
																		'</div>';
									}
								tr.appendChild(resourceTds[type]);	
							}	
							var td2 = document.createElement('td');
							var style = !isCurrent ? ' cursor:pointer;' : ' opacity:0.3';
							var ship = document.createElement('img');
								ship.src = "/skin/actions/transport.gif";
								ship.setAttribute('style', 'float:right; height:14px; margin:1px 10px 0 0;' + style);
								if(!isCurrent) { 
									ship.title = "Transport resources to " + cities[i].name.replace(/\ /g, ' ');
									ship.name = cities[i].id;
									ship.addEventListener('click', function() { document.location = "/index.php?view=transport&destinationCityId=" + this.name; }, true); 
								}
							td2.appendChild(ship);
							// island link
							if(IkaTools.cityGetIslandId(cities[i]) > 0)
								$(td2).append('<img src="/skin/layout/icon-island.gif" style="cursor:pointer; height:16px; margin-right:2px; float:right;" onclick="ikaEmpireGoTo(\'/index.php?view=island&id=' + cities[i].islandId + '\',' + cities[i].id + ')" title="Go to island"/>');
							if(IkaTools.cityGetIslandId(cities[i]) > 0 && IkaTools.cityGetTradegoodType(cities[i])) {
								var tradegood = document.createElement('img');
									tradegood.src = "/skin/resources/icon_" + IkaTools.cityGetTradegoodType(cities[i]) + ".gif";
									tradegood.setAttribute('style', 'float:right; height:14px; margin:1px 4px 0 0; cursor:pointer;');
									tradegood.title = "Level " + (IkaTools.cityGetTradegoodLevel(cities[i]) > 0 ? IkaTools.cityGetTradegoodLevel(cities[i]) : '?');
									tradegood.name = cities[i].id;
									tradegood.addEventListener('click', function() { IkaTools.goTo("/index.php?view=tradegood&type=tradegood&id=" + IkaTools.cityGetIslandId(IkaTools.getCityById(this.name)), this.name); }, true); 
								td2.appendChild(tradegood);	
							}
							if(IkaTools.cityGetIslandId(cities[i]) > 0) {
								var wood = document.createElement('img');
									wood.src = "/skin/resources/icon_wood.gif";
									wood.setAttribute('style', 'float:right; height:14px; margin:1px 4px 0 0; cursor:pointer;');
									wood.title = "Level " + (IkaTools.cityGetSawmillLevel(cities[i]) > 0 ? IkaTools.cityGetSawmillLevel(cities[i]) : '?');
									wood.name = cities[i].id;
									wood.addEventListener('click', function() { IkaTools.goTo("/index.php?view=resource&type=resource&id=" + IkaTools.cityGetIslandId(IkaTools.getCityById(this.name)), this.name); }, true); 
								td2.appendChild(wood);
							}
							tr.appendChild(td2);
						table.appendChild(tr);
					}
				}
				var trTotals = document.createElement('tr');
				trTotals.setAttribute('style', 'border-top:1px dotted #9D836A; height:2em; background-color:#F7E4AF;');
					trTotals.innerHTML += '<td style="border-right:1px dotted #9D836A;"> </td>';
					var headerTd = document.createElement('td');
						headerTd.style.borderRight = "1px dotted #9D836A";
					trTotals.appendChild(headerTd);
					trTotals.vAlign = "top";
					var resourceNames = ["population", "wood", "wine", "marble", "glass", "sulfur", "research", "gold"];
					var resourceTotalTds = {};
					for(var z in resourceNames) {
						var type = resourceNames[z];
						resourceTotalTds[type] = document.createElement('td');
							resourceTotalTds[type].setAttribute('style', 'text-align:center; font-size:.9em; padding:.5em .2em; border-right:1px dotted #9D836A;');
							if(type == 'research') {
								resourceTotalTds[type].innerHTML = '+' + IkaTools.addCommas(resourceChangeTotals['research']); 
							} else {
								resourceTotalTds[type].innerHTML = (type == 'gold' && resourceTotals[type] > 0) ? '+' : '';
								resourceTotalTds[type].innerHTML += IkaTools.addCommas(resourceTotals[type]);	
								resourceTotalTds[type].innerHTML += resourceChangeTotals[type] != 0 ? '<div style="font-size:.8em; margin-top:2px;">(' + (resourceChangeTotals[type] > 0 ? '+' : '') + IkaTools.addCommas(resourceChangeTotals[type]) + ')</div>' : '';
							}
						trTotals.appendChild(resourceTotalTds[type]);	
					}
					var fillerTd = document.createElement('td');
					trTotals.appendChild(fillerTd);
				table.appendChild(trTotals);	
			IkaEmpire.worldOverview.appendChild(table);
			IkaEmpire.buttonWorldView.appendChild(IkaEmpire.worldOverview);
			IkaEmpire.buttonWorldView.addEventListener('mouseout', function() { $('#buildingLinksWorldLinks')[0].style.display = 'none'; }, true);
			IkaEmpire.buttonWorldView.addEventListener('mouseover', function() { $('#cityNav')[0].style.height = "100px"; }, true);
			IkaEmpire.buttonWorldView.addEventListener('mouseout', function() { $('#cityNav')[0].style.height = "10px"; }, true);
		}
		$('#buildingLinksWorldLinks')[0].style.display = 'block';
		IkaEmpire.updateBuildTimers();
	},
	drawBuildingsOverview:function() {
		// check for owned building types
		var ownedBuildings = {};
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			for(var x = 0; x < cities[i].buildings.length; x++) {
				ownedBuildings[cities[i].buildings[x].type] = true;
			}
		}
		if(!IkaTools.buildingsOverview) {
			var cities = IkaTools.getCities();
			IkaTools.buildingsOverview = document.createElement('div');
			IkaTools.buildingsOverview.id = "ikaEmpireBuildingOverview";
			GM_addStyle("#ikaEmpireBuildingOverview table tbody tr td a { padding:0 !important; height:auto !important; width:auto !important; background:none !important; }");
			GM_addStyle("#ikaEmpireBuildingOverview a { height:auto; } #ikaEmpireBuildingOverview table tbody tr td a:hover { text-decoration:underline !important; }");
						
			IkaTools.buildingsOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:950px; margin-left:-597px; position:relative; z-index:30000;'); 
				var table = document.createElement('table');
				table.style.width = "100%";
				var html = [];
				html.push('<tr valign="middle" style="background-image:url(/skin/input/button.gif);"><td><div style="width:80px; padding-left:1em;"></div></td>');
				for(var i = 0; i < IkaTools.buildingTypes.length; i++) {
					if(ownedBuildings[IkaTools.buildingTypes[i]]) {
						html.push('<td style="text-align:center; padding:0 .05em;" title="');
						html.push(IkaTools.getText('buildings.' + IkaTools.buildingTypes[i]));
						html.push('"><img src="/skin/img/city/building_');

						html.push(IkaTools.buildingTypes[i] == 'townHall' ? 'townhall' : IkaTools.buildingTypes[i]);
						html.push('.gif" style="max-height:21px; max-width:28px; margin-top:5px;"/></td>\</td>');
					}
				}
				html.push('</tr>');
				// draw buildings in each town
				for(var i = 0; i < cities.length; i++) {
					if(!cities[i].type || cities[i].type.match(/tradegood/)) {
						// city name
						html.push('<tr style="border-top:1px dotted #9D836A; background-color:');
						html.push(i % 2 != 0 ? "#FDF7DD" : "inherit");
						html.push('" valign="middle"><td style="padding:.5em;"><a href="javascript:ikaEmpireGoTo(\'http://');
						html.push(document.domain);
						html.push('/index.php?view=city&id=');
						html.push(cities[i].id);
						html.push('\', ');
						html.push(cities[i].id);
						html.push(')"');
						if(IkaTools.getCurrentCityId() == cities[i].id) 
							html.push(' style="font-weight:bold;"');
						html.push('>');
						html.push(cities[i].name);
						html.push(' (');
						html.push(cities[i].level);
						html.push(')</a></td>');
						// buildings
						for(var x = 0; x < IkaTools.buildingTypes.length; x++) {
							if(ownedBuildings[IkaTools.buildingTypes[x]]) {
								html.push('<td style="text-align:center; border-left:1px dotted #9D836A;">');
								var building = IkaTools.cityGetBuildingByType(IkaTools.buildingTypes[x], cities[i]);
								if(building) {
									html.push('<a href="javascript:ikaEmpireGoTo(\'http://');
									html.push(document.domain);
									html.push('/index.php?view=');
									html.push(building.type);
									html.push('&position=');
									html.push(building.position);
									html.push('&id=');
									html.push(building.cityId);
									html.push('\', ');
									html.push(building.cityId);
									html.push(');"');
									if(IkaTools.buildingGetResourceMissingTotal(building) == 0 && building.level != IkaTools.maxBuildingLevel) 
										html.push(' style="font-weight:bold; color:#009900"');
									html.push(' title="');
									html.push(IkaTools.getText('buildings.' + building.type));
									html.push('">');
									html.push(building.level);
									html.push('</a>');
								} else
									html.push('-');							
								html.push('</td>');
							}
						}
						html.push('</tr>');
					}
				}
				table.innerHTML = html.join('');
			IkaTools.buildingsOverview.appendChild(table);
			IkaEmpire.buttonTownAdviser.appendChild(IkaTools.buildingsOverview);
			IkaEmpire.buttonTownAdviser.addEventListener('mouseout', function() { $('#ikaEmpireBuildingOverview')[0].style.display = 'none'; }, true);
			IkaEmpire.buttonTownAdviser.addEventListener('mouseover', function() { $('#cityNav')[0].style.height = "100px"; }, true);
			IkaEmpire.buttonTownAdviser.addEventListener('mouseout', function() { $('#cityNav')[0].style.height = "10px"; }, true);
		}
		$('#ikaEmpireBuildingOverview')[0].style.display = 'block';
	},
	appendBuildingList:function(cityId, target, left, top) {
		var div = document.createElement('div');
		div.className = "buildingLinks";
		div.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:400px; padding:1em 0 .2em 1em; position:absolute; z-index:1000;'); 
		if(left) { div.style.left = left; }
		if(top) { div.style.marginTop = top; }
		if(IkaTools.getCityById(cityId).buildings) {
			var buildings = sortBuildingsByName(IkaTools.getCityById(cityId).buildings);
			for(var i = 0; i < buildings.length; i++) {
				var a = document.createElement('a');
				a.setAttribute('style', 'display:block; margin-bottom:.8em; font-size:.9em; cursor:pointer; height:auto; background:none; line-height:1em; padding:0; width:100%;');
				a.name = buildings[i].cityId;
				a.style.color = (IkaTools.buildingGetResourceMissingTotal(buildings[i]) == 0 && buildings[i].level != IkaTools.maxBuildingLevel) ? '#009900' : 'inherit';
				a.rev = '/index.php?view=' + buildings[i].type + '&position=' + buildings[i].position + '&id=' + cityId;
				a.addEventListener('click', function() { IkaTools.goTo(this.rev, this.name); return false; }, true);
				a.addEventListener('mouseover', function() { this.style.textDecoration = 'underline'; }, true);
				a.addEventListener('mouseout', function() { this.style.textDecoration = 'none'; }, true);
				var parsedName =  buildings[i].name.length > 14 ? buildings[i].name.replace(/[^\s]+\s*$/, '') + '...' : buildings[i].name;
				a.innerHTML = '<img src="/skin/img/city/building_' + (buildings[i].position == 0 ? 'townhall' : buildings[i].type) + '.gif" align="absmiddle" style="margin-right:.5em;  width:24px;"/>' + 
							parsedName + ' (' + buildings[i].level + ')    ';	
				var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
				for(var x = 0; x < resourceNames.length; x++) {
					var missing = IkaTools.buildingGetResourceMissing(resourceNames[x], buildings[i]);
					if(missing > 0) {
						a.innerHTML += '<img src="/skin/resources/icon_' + resourceNames[x] + '.gif" style="height:12px; margin-left:5px;"/> <span style="font-size:.8em;">' + IkaTools.addCommas(missing) + '</span>';
					}												 													 
				}						
				a.title = buildings[i].name + ' (' + buildings[i].level + ')';
				div.appendChild(a);
			}
		}
		target.appendChild(div);
		target.addEventListener('mouseover', function() {
			$('.buildingLinks', this)[0].style.display = "block";
		}, true);
		target.addEventListener('mouseout', function() {
			$('.buildingLinks', this)[0].style.display = "none";
		}, true);

	},
	drawMovements:function(movements) {
		var transportDiv = $('#ikaEmpireMilitaryOverviewTransport')[0];
		var movementsHtml = "";
		for(var i = 0; i < movements.length; i++) {				
			switch(movements[i].mission) {
				case 'transport': var target = transportDiv; break;
				case 'trade': var target = transportDiv; break;
				default: var target = transportDiv;
			}
			var d = new Date();
			var units = movements[i].units;
			var iconRowHtml = "";
			var qtyRowHtml = ""
			for(var x = 0; x < units.length; x++) {
				iconRowHtml += '<td style="padding:0 .5em .2em 0;" title="' + units[x].name + '"><img src="' + units[x].iconSrc + '" style="height:14px;"/></td>'; 
				qtyRowHtml += '<td style="padding:0 .5em .2em 0; font-size:.75em;">' + IkaTools.addCommas(units[x].qty) + '</td>'; 
			}
			var unitsHtml = '<table cellpadding="0" cellspacing="0" border="0"><tr>' + iconRowHtml + '</tr><tr>' + qtyRowHtml + ' </tr></table>';
			var arrowColor = movements[i].type != "hostile" ? 'green' : 'red';
			movementsHtml += '<tr style="' + (i != movements.length - 1 ? 'border-bottom: 1px dotted rgb(157, 131, 106);' : '') + '">'+
				'<td id="ikaEmpireMovementTimer' + movements[i].id + '">' + IkaTools.formatMilliseconds(parseInt(movements[i].arrivalTime) - d.getTime()) + '</td>' +
				'<td style="text-align:left;">' + unitsHtml + '</td>' +
				'<td><a href="http://' + document.domain + '/index.php?view=island&cityId=' + movements[i].originId + '"/>' + movements[i].originCityName + '</a><br>(' + movements[i].originPlayerName + ')</td>' +
				'<td>' + (movements[i].direction == 'left' ? '<img src="/skin/interface/arrow_left_' + arrowColor + '.gif" style="height:10px;"/>' : ' ') + '</td>' +
				'<td><img src="skin/interface/mission_' + movements[i].mission + '.gif" title="' + movements[i].description + '"/></td>'+
				'<td>' + (movements[i].direction == 'right' ? '<img src="/skin/interface/arrow_right_' + arrowColor + '.gif" style="height:10px;"/>' : ' ') + '</td>' +
				'<td><div><a href="http://' + document.domain + '/index.php?view=island&cityId=' + movements[i].targetId + '"/>' + movements[i].targetCityName + '</a></div>' +
					(movements[i].originPlayerName ? '(' + movements[i].targetPlayerName + ')</td>' : '') +
				'<td>' + ((movements[i].direction != 'left' && typeof(movements[i].abortHref) != 'undefined')? '<a href="' + movements[i].abortHref + '" title="Abort Mission" style="padding:none; height:auto; width:auto;"><img src="' + ( '/skin/interface/btn_abort.gif') + '"/></a>' : ' ') + '</td>' +
				'</tr>';
		}
		transportDiv.innerHTML = '<table id="ikaEmpireTradeMovements" cellpadding="0" cellspacing="0" border="0" style="width:100%;">'+	
									'<tr style="background-image:url(/skin/input/button.gif); border-bottom: 1px dotted rgb(157, 131, 106); vertical-align:middle;"><th>Time</th><th>Units</th><th>Origin</th><th> </th><th>Mission</th><th> </th><th>Destination</th><th>Action</th></tr>' + 
									movementsHtml + '</table>';
		GM_addStyle("#ikaEmpireTradeMovements th { text-align:center; font-weight:bold; padding:.5em 0; }" +
					"#ikaEmpireTradeMovements td { padding:.25em; text-align:center; }" +
					"#ikaEmpireTradeMovements a { background:none !important; padding:0 !important; width:auto !important; height:auto !important; font-size:inherit !important; text-decoration:underline !important; color:#000099 !important; display:inline !important; }");
	},
	updateMovementTimers:function() {
		var d = new Date();
		var movements = IkaTools.getMovements();	
		for(var i = 0; i < movements.length; i++) {		
			var timeLeft = parseInt(movements[i].arrivalTime) - d.getTime();
			if(timeLeft <= 0 && typeof(IkaEmpire.expiredMovements[movements[i].id]) == 'undefined' && movements[i].direction) {
				IkaEmpire.expiredMovements[movements[i].id] = true;
				IkaEmpire.growl('movement', "Troop Movement", movements[i].description + ' has ' + (movements[i].direction == 'right' ? 'arrived in ' + movements[i].targetCityName : 'returned to ' + movements[i].originCityName));
			}
			$('#ikaEmpireMovementTimer' + movements[i].id).html(IkaTools.formatMilliseconds(timeLeft));
		}
	},
	updateBuildTimers:function() {
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			var elem = document.getElementById('ikaEmpireLinksBuildTime' + cities[i].id);
			if(IkaTools.cityGetBuildBuilding(cities[i]) && elem) {
				var building = IkaTools.cityGetBuildBuilding(cities[i]);
				var seconds = IkaTools.cityGetBuildSecondsRemaining(cities[i]);
				var timerText = IkaTools.formatSeconds(seconds);	
				elem.innerHTML = '<a href="javascript:ikaEmpireGoTo(\'/index.php?view=' + building.type + '&id=' + building.cityId + '&position=' + building.position + '\', ' + building.cityId + ')" ' +
									' style="background:none; padding:0; display:inline; height:auto; width:auto;">' + IkaTools.cityGetBuildBuilding(cities[i]).name + '</a>' +
								' <br/><span style="font-size:.9em;">' + timerText + '</span>';
			} else {
				elem.innerHTML = "-";
			}
		}
		setTimeout(IkaEmpire.updateBuildTimers, 1000);
	},
	growl:function(type, title, message) {
		if(typeof(IkaEmpire.growlInitialized) == 'undefined') {
			Growler.addNoticeType('movement', 'Troop Movement');
			Growler.register('Ikariam Empire Overview', 'http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/ikariam_icon.png');
			IkaEmpire.growlInitialized = true;
		}
		Growler.growl(type, title, message);
	},
	icons:{
		refreshSmall:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII%3D',
		loading:'data:application/force-download;base64,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%3D%3D',
		checkmark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC',
	},	
	views:{
		city:function() {
			if(Config.get('showBuildingLevels')) {
				GM_addStyle('div.buildingimg, div.constructionSite{ text-align:center; }\
							.ikaEmpireBuildingLevel { color:#fff; background:#000; padding:2px; margin:auto; line-height:15px; -webkit-border-radius:20px; -moz-border-radius: 20px; border:2px outset #ccc; font-size:9px; position:relative;}');
				$('#mainview ul#locations li').each(function(i) {
					try { var position = this.id.match(/position(\d+)/)[1]; } catch(e) { var position = false }
					try { var building = IkaTools.cityGetBuildingByPosition(position); } catch(e) { var building = false; }
					if(building) {
						var dot = document.createElement('span');
						dot.className = "ikaEmpireBuildingLevel";
						if(building.level < 10 || building.level.toString() == 'NaN') dot.style.padding = "2px 6px";						
						dot.innerHTML = building.level.toString() == 'NaN' ? 0 : building.level;
						if(IkaTools.buildingGetResourceMissingTotal(building) == 0 && building.level != IkaTools.maxBuildingLevel) dot.style.background = "#008800";
						$('div.buildingimg', this).append(dot);
						$('div.constructionSite', this).append(dot);
						switch(building.type) {
							case 'safehouse': dot.style.top = "20px"; break;
							case 'tavern': dot.style.top = "20px"; break;
							case 'port': dot.style.top = "40px"; dot.style.left = "30px"; break;
							case 'townHall': dot.style.top = "50px"; break;
							case 'wall': dot.style.top = "20px"; dot.style.left = "180px"; break;
							default: dot.style.top = "40px";
						}
					}
				});
			}
		},
	},
};







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
			nameLevel +=  " ";
		}
	}
	return sortArrayByKeys(sortArray);
}


IkaEmpire.init();

if(Config.get('debugMode')) {
	var endTime = new Date();
	IkaTools.config.debugMode = true;
	IkaTools.debug('Empire Overview: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
}