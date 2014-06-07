// ==UserScript==
// @name           antropomorfico
// @namespace      antropomorfico script
// @include        http://s*.ikariam.*/*
// @require		   	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        	http://userscripts.org/scripts/source/57377.user.js
// @require       	http://userscripts.org/scripts/source/57756.user.js
// @require http://userscripts.org/scripts/source/58203.user.js
//
// ==/UserScript==

ScriptUpdater.check(57197, "0.17");

IkaTools.init();
unsafeWindow.IkaTools = IkaTools;

IkaEmpire = {
	buttonMilitaryAdviser:$('#advMilitary')[0],
	movementsUpdated:false,
	worldOverview:false,
	townOverview:false,
	buildingsOverview:false,
	expiredMovements:{},
	init:function() {
		//------------------------------ Military Adviser ----------------------------------
		IkaEmpire.buttonMilitaryAdviser.addEventListener('mouseover', function() {
			if(typeof(IkaEmpire.militaryOverview) == 'undefined') {
				IkaEmpire.militaryOverview = document.createElement('div');	
				IkaEmpire.militaryOverview.setAttribute('style', 'display:block; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:700px; margin-left:-450px; z-index:9000; position:relative;');
				IkaEmpire.militaryOverview.innerHTML = '<table cellpadding="0" cellspacing="15" border="0" style="margin:1em; width:100%;"><tr>' +
							'<td id="ikaEmpireMilitaryOverviewTransport"><div style="font-size:2em; padding:2em; text-align:center;">loading ...</div></td></tr></table>';
				IkaEmpire.buttonMilitaryAdviser.appendChild(IkaEmpire.militaryOverview);
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
		IkaEmpire.buttonMilitaryAdviser.addEventListener('mouseout', function() {
			if(typeof(IkaEmpire.militaryOverview) != 'undefined') {
				IkaEmpire.militaryOverview.style.display = 'none';	
			}
		}, true);
		
		IkaEmpire.buttonTownView = $('#changeCityForm .viewCity')[0];
		IkaEmpire.buttonTownView.addEventListener('mouseover', IkaEmpire.drawTownOverview, false);
		IkaEmpire.buttonIslandView = $('#changeCityForm .viewIsland')[0];
		IkaEmpire.buttonIslandView.addEventListener('mouseover', IkaEmpire.drawBuildingsOverview, false);
		IkaEmpire.buttonWorldView = $('#changeCityForm .viewWorldmap')[0];
		IkaEmpire.buttonWorldView.addEventListener('mouseover', IkaEmpire.drawWorldOverview, false);
		
		setInterval(IkaEmpire.updateMovementTimers, 1000);
	},
	drawTownOverview:function() {
		IkaEmpire.appendBuildingList(IkaTools.getCurrentCityId(), IkaEmpire.buttonTownView);
		IkaEmpire.buttonTownView.removeEventListener('mouseover', IkaEmpire.drawTownOverview, false);
		$('.buildingLinks', IkaEmpire.buttonTownView)[0].style.display = "block";
	},
	drawWorldOverview:function() {
		if(!IkaTools.worldOverview) {
			var cities = IkaTools.getCities();
			IkaTools.worldOverview = document.createElement('div');
			IkaTools.worldOverview.id = "buildingLinksWorldLinks";
			IkaTools.worldOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:950px; margin-left:-320px; position:relative;'); 
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
										resourceTds[type].innerHTML += '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:IkaTools.goTo(\'/index.php?view=townHall&position=0&id=' + cities[i].id + '\', ' + cities[i].id + ')">' + text + '</a>';	
										break;
									case 'gold':
										resourceTds[type].innerHTML += '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:IkaTools.goTo(\'/index.php?view=finances\', ' + cities[i].id + ')">' + 
																		((type == 'gold' && IkaTools.cityGetResource(type, cities[i]) > 0) ? '+' : '') +
																		IkaTools.addCommas(IkaTools.cityGetResource(type, cities[i])) + '</a>';	
										break;
									case 'research':
										if(IkaTools.cityGetBuildingByType(cities[i], 'academy')) {
											resourceTds[type].innerHTML += '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:IkaTools.goTo(\'/index.php?view=academy&position=' + IkaTools.cityGetBuildingByType(cities[i], 'academy').position + '&id=' + cities[i].id + '\', ' + cities[i].id + ')">+' + change;
										}
										break;
									case 'wood':
										resourceTds[type].innerHTML += '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:IkaTools.goTo(\'/index.php?view=resource&type=resource&id=' + IkaTools.cityGetIslandId(cities[i]) + '\', ' + cities[i].id + ')">' + text + '</a>';	
										break;
									default:
										resourceTds[type].innerHTML += type.toString() != IkaTools.cityGetTradegoodType(cities[i]).toString() ? text : '<a style="display:inline; padding:0; width:auto; height:auto; background:none;" href="javascript:IkaTools.goTo(\'/index.php?view=tradegood&type=tradegood&id=' + IkaTools.cityGetIslandId(cities[i]) + '\', ' + cities[i].id + ')">' + text + '</a>';	;
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
																	(percentUsed < 100 ? '.' + percentUsed : '1')+ ';">&nbsp;</div>' +
																	'</div>';
								}
							tr.appendChild(resourceTds[type]);	
						}	
						var td2 = document.createElement('td');
						var style = !isCurrent ? ' cursor:pointer;' : ' opacity:0.3';
						var deploy = document.createElement('img');
							deploy.src = "/skin/actions/move_army.gif";
							deploy.setAttribute('style', 'float:right; height:14px; margin:1px .75em 0 0;' + style);
							if(!isCurrent) { 
								deploy.title = "Deploy troops to " + cities[i].name;
								deploy.name = cities[i].id;
								deploy.addEventListener('click', function() { document.location = "/index.php?view=deployment&deploymentType=army&destinationCityId=" + this.name; }, true); 
							}
						td2.appendChild(deploy);
						var fleet = document.createElement('img');
							fleet.src = "/skin/actions/move_fleet.gif";
							fleet.setAttribute('style', 'float:right; height:14px; margin:1px 4px 0 0;' + style);
							if(!isCurrent) { 
								fleet.title = "Deploy ships to " + cities[i].name;
								fleet.name = cities[i].id;
								fleet.addEventListener('click', function() { document.location = "/index.php?view=deployment&deploymentType=fleet&destinationCityId=" + this.name; }, true); 
							}
						td2.appendChild(fleet);
						var ship = document.createElement('img');
							ship.src = "/skin/actions/transport.gif";
							ship.setAttribute('style', 'float:right; height:14px; margin:1px 4px 0 0;' + style);
							if(!isCurrent) { 
								ship.title = "Transport resources to " + cities[i].name;
								ship.name = cities[i].id;
								ship.addEventListener('click', function() { document.location = "/index.php?view=transport&destinationCityId=" + this.name; }, true); 
							}
						td2.appendChild(ship);
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
				var trTotals = document.createElement('tr');
				trTotals.setAttribute('style', 'border-top:1px dotted #9D836A; height:2em; background-color:#F7E4AF;');
					trTotals.innerHTML += '<td style="border-right:1px dotted #9D836A;">&nbsp;</td>';
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
			IkaTools.worldOverview.appendChild(table);
			IkaEmpire.buttonWorldView.appendChild(IkaTools.worldOverview);
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
			GM_addStyle("#ikaEmpireBuildingOverview table tbody tr td a:hover { text-decoration:underline !important; }");
						
			IkaTools.buildingsOverview.setAttribute('style', 'display:none; background-color:#FEE8C8; border:1px solid #9D836A; text-align:left; width:950px; margin-left:-404px; position:relative;'); 
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
					// city name
					html.push('<tr style="border-top:1px dotted #9D836A; background-color:');
					html.push(i % 2 != 0 ? "#FDF7DD" : "inherit");
					html.push('" valign="middle"><td style="padding:.5em;"><a href="javascript:IkaTools.goTo(\'http://');
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
								html.push('<a href="javascript:IkaTools.goTo(\'http://');
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
								if(IkaTools.buildingGetResourceMissingTotal(building) == 0) 
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
				table.innerHTML = html.join('');
			IkaTools.buildingsOverview.appendChild(table);
			IkaEmpire.buttonIslandView.appendChild(IkaTools.buildingsOverview);
			IkaEmpire.buttonIslandView.addEventListener('mouseout', function() { $('#ikaEmpireBuildingOverview')[0].style.display = 'none'; }, true);
			IkaEmpire.buttonIslandView.addEventListener('mouseover', function() { $('#cityNav')[0].style.height = "100px"; }, true);
			IkaEmpire.buttonIslandView.addEventListener('mouseout', function() { $('#cityNav')[0].style.height = "10px"; }, true);
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
				a.style.color = IkaTools.buildingGetResourceMissingTotal(buildings[i]) == 0 ? '#009900' : 'inherit';
				a.rev = '/index.php?view=' + buildings[i].type + '&position=' + buildings[i].position + '&id=' + cityId;
				a.addEventListener('click', function() { IkaTools.goTo(this.rev, this.name); return false; }, true);
				a.addEventListener('mouseover', function() { this.style.textDecoration = 'underline'; }, true);
				a.addEventListener('mouseout', function() { this.style.textDecoration = 'none'; }, true);
				var parsedName =  buildings[i].name.length > 14 ? buildings[i].name.replace(/[^\s]+\s*$/, '') + '...' : buildings[i].name;
				a.innerHTML = '<img src="/skin/img/city/building_' + (buildings[i].position == 0 ? 'townhall' : buildings[i].type) + '.gif" align="absmiddle" style="margin-right:.5em;  width:24px;"/>' + 
							parsedName + ' (' + buildings[i].level + ') &nbsp; &nbsp;';	
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
			movementsHtml += '<tr>'+
				'<td id="ikaEmpireMovementTimer' + movements[i].id + '">' + IkaTools.formatMilliseconds(parseInt(movements[i].arrivalTime) - d.getTime()) + '</td>' +
				'<td style="text-align:left;">' + unitsHtml + '</td>' +
				'<td><a href="http://s2.ikariam.org/index.php?view=island&cityId=' + movements[i].originId + '"/>' + movements[i].originCityName + '</a><br>(' + movements[i].originPlayerName + ')</td>' +
				'<td>' + (movements[i].direction == 'left' ? '<img src="/skin/interface/arrow_left_' + arrowColor + '.gif" style="height:10px;"/>' : '&nbsp;') + '</td>' +
				'<td><img src="skin/interface/mission_' + movements[i].mission + '.gif" title="' + movements[i].description + '"/></td>'+
				'<td>' + (movements[i].direction == 'right' ? '<img src="/skin/interface/arrow_right_' + arrowColor + '.gif" style="height:10px;"/>' : '&nbsp;') + '</td>' +
				'<td><div><a href="http://s2.ikariam.org/index.php?view=island&cityId=' + movements[i].targetId + '"/>' + movements[i].targetCityName + '</a></div>' +
					(movements[i].originPlayerName ? '(' + movements[i].targetPlayerName + ')</td>' : '') +
				'<td>' + (movements[i].direction != 'left' ? '<a href="' + movements[i].abortHref + '" title="Abort Mission" style="padding:none; height:auto; width:auto;"><img src="http://s2.ikariam.org/skin/interface/btn_abort.gif"/></a>' : '&nbsp;') + '</td>' +
				'</tr>';
		}
		transportDiv.innerHTML = '<table id="ikaEmpireTradeMovements" cellpadding="0" cellspacing="0" border="0" style="width:100%;">'+	
									'<tr><th>Time</th><th>Units</th><th>Origin</th><th>&nbsp;</th><th>Mission</th><th>&nbsp;</th><th>Destination</th><th>Action</th></tr>' + 
									movementsHtml + '</table>';
		GM_addStyle("#ikaEmpireTradeMovements th { text-align:center; font-weight:bold; padding-bottom:.5em; }" +
					"#ikaEmpireTradeMovements td { padding:.25em; text-align:center; }" +
					"#ikaEmpireTradeMovements a { padding:0; width:auto; height:auto; font-size:inherit; text-decoration:underline; color:#000099; display:inline; }");
	},
	updateMovementTimers:function() {
		var d = new Date();
		var movements = IkaTools.getMovements();	
		for(var i = 0; i < movements.length; i++) {		
			var timeLeft = parseInt(movements[i].arrivalTime) - d.getTime();
			if(timeLeft < 0 && !IkaEmpire.expiredMovements[movements[i].id] && movements[i].direction) {
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
				elem.innerHTML = '<a href="javascript:IkaTools.goTo(\'/index.php?view=' + building.type + '&id=' + building.cityId + '&position=' + building.position + '\', ' + building.cityId + ')" ' +
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
			nameLevel +=  "&nbsp;";
		}
	}
	return sortArrayByKeys(sortArray);
}


IkaEmpire.init();



// ==UserScript==
// @name           antropomorfico
// @namespace      antropomorfico script
// @include        http://s*.ikariam.*/*

// @version        1.00
// ==/UserScript==


javascript:d=document;pretty=function(t){ c=t.id.substring(7); m=d.getElementById('tbl_mail'+c); or=m.style.display; m.style.display=''; x=m.innerText || m.textContent; x=x.replace(/ +/g, ' ').replace(/(^ )|( $)/g, ''); tds=t.getElementsByTagName('td'); tt=tds[3]; h = tt.innerHTML.substring(0,1); if (h!='A') {h="<span style='color: red'>"+h+"</span>";} tt.innerHTML = h + " : <span style='color: " + (h == 'A' ? 'blue' : 'red') + "'>" + x.substring(0,45) + "</span>"; m.style.display=or; for(j=0; j<tds.length; j++) { s=tds[j].style; s.whiteSpace='nowrap';s.overflow= 'hidden'; } tds[1].style.display='none'; tds[5].style.fontSize='8px'};t=d.getElementsByClassName('entry');for(i=0;i<t.length;i++) { pretty(t[i]); }; tb=t[0].parentNode;th=tb.childNodes[0];th.childNodes[3].style.display='none';tb.innerHTML="<tr><td colspan='10' style='background:#edcf7c; font-weight: bold;'><big><a href='http://s12.ikariam.es/index.php?view=sendIKMessage&msgType=51&allyId=1542' style='color:#5E3703'>ENVIAR UN MENSAJE A LA ALIANZA</a></big></td></tr>"+tb.innerHTML;void(0);










