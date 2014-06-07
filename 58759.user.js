


// ==UserScript==
// @name           prueba3
// @namespace      prueba3
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

// @include			http://s*.ikariam.*/index.php*

// ==/UserScript==

// Version Log:
//		v1.2.1 (8. June 2009)
//			- Fixed a bug which caused no resource reduction when a reduction building is being upgrade.
//			- Improved positioning of the icons. Icon and info box at construction spot are now correctly positioned.
//
//		v1.2.0 (2. June 2009)
//			- New: Added icon and info box to construction spot (thanks to giangkid for the suggestion).
//
//		v1.1.1 (26. May 2009)
//			- Fixed a bug when NOT using Black Canvas add-on to Firefox, the level indication is not centralized correctly.
//
//		v1.1.0 (25. May 2009)
//			- New: Added a info box which shows up when mouse over the icon, the box can be turned off in the options page.
//			- Fixed a bug where in a rare case, an icon is not shown on the wall.
//			- Fixed a bug which caused no sulfur reduction bonus.
//
//		v1.0.3 (17. May 2009)
//			- Fixed first time running check which caused unnecessarily research checks.
//
//		v1.0.2 (17. May 2009)
//			- Fix to support different languages (thanks to oliezekat).
//			- Improved bureaucracy-spot check.
//
//		v1.0.1 (17. May 2009)
//			- Fixed bureaucracy-spot, not showing if you are not done with that research.
//			- Removed alert boxes which shows up at the start.
//
// 		v1.0.0 (16. May 2009)
//			- Release.

// URL to icons
var imgURL = "http://www.atdao.dk/public/images/";

// Server host and hostname
var host = top.location.host;
var hostname = top.location.hostname.split(".");

// Materials reduction from researches
var pulley = GM_getValue(host + "_iuw_pulley", false);
var geometry = GM_getValue(host + "_iuw_geometry", false);
var spirit = GM_getValue(host + "_iuw_spirit", false);

// Var for showing info box or not, default true
var showInfoBox = GM_getValue(host + "_iuw_infobox", true);

// If spot/pos 13 is available
var bureaucracy = GM_getValue(host + "_iuw_bureaucracy", false);

// First timer var
var firstTimer = GM_getValue(host + "_iuw_first_timer", true);

// Gets the view
var view = getView();

// Helper var to check if we should skip the checking the research
var skipResearch = GM_getValue(host + "_iuw_skip_research", false);

// Extracting action
var uri = top.location.search, action = getAction(uri);

// Just after login
if (action == "loginAvatar" && skipResearch == false) {

	// Do syncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), false);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// When user clicks on academy or research advisor
if ((view == "academy" || view == "researchAdvisor") && skipResearch == false) {
	
	// Do asyncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), true);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// Options view
if (view == "options") {

	// Getting the URI
	var uri = top.location.search.split("&");
	
	// If the setting is set, we assign the new settings
	if (isDefined(uri[1])) {
		
		var pos = uri[1].indexOf("=");
		var setting = uri[1].substr(pos+1);
		
		if (setting == "false") {
		
			showInfoBox = false;
			GM_setValue(host + "_iuw_infobox", false);
			
		} else if (setting == "true") {
		
			showInfoBox = true;
			GM_setValue(host + "_iuw_infobox", true);
			
		}
		
	}

	// Creating the setting panel for this mod
	var settingPanel = document.createElement("div"), child;
	var checkedYes ="", checkedNo = "";
	
	settingPanel.className = "contentBox01h";
	
	if (showInfoBox) {
		checkedYes = 'checked';
	} else {
		checkedNo = 'checked';
	}

    child = '<h3 class="header"><span class="textLabel">Ikariam Upgrade Watcher</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options"><table cellpadding="0" cellspacing="0"><tr><th>Show info box</th><td><input type="radio" name="iuwInfoBox" value="true" '+checkedYes+'> Yes<br><input type="radio" name="iuwInfoBox" value="false" '+checkedNo+'> No</td></tr></table><div class="centerButton"><input class="button" type="submit" value="Save Setting" /></div></form></div><div class="footer"></div></div>';
	
	settingPanel.innerHTML = child;
	
	// Inserting the setting panel before the vacation mode setting
	document.getElementById("mainview").insertBefore(settingPanel, document.getElementById("vacationMode"));

}

// When city is shown
if (view == "city") {

	// If it is the mod is running for the first time,
	// we check the research
	if (firstTimer) {
		
		// Do syncronized request
		// Check researches, pulley, geometry, spirit, bureaucracy
		getResearch(host, getCityId(), false);
		GM_setValue(host + "_iuw_first_timer", false);
		
	}

	// Getting the list of buildings
	var buildingList = document.getElementById('locations');
	
	// If we find a list of buildings, then we start adding icon to each building
	if (buildingList) {
				
		// Ressource variables
		var wood, wine, marble, crystal, sulfur;
	
		// Get the resources we have in town
		if (document.getElementById('value_wood')) { wood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { wine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { marble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { crystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { sulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
	
		// Get each building/spot from the building list
		var spot = buildingList.getElementsByTagName('li');
		
		// Info about each building/spot
		var building, level, upLevel, posTop, posRight, img, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur;
		
		// If the town is constructing or upgrading a building
		var construction = false;
		
		// Reduced materials
		var redAll = 0, redWood = 0, redWine = 0, redMarble = 0, redCrystal = 0, redSulfur = 0;
		
		// Assigning reductions in %
		if (pulley) { redAll = 2; }
		if (geometry) { redAll = redAll + 4; }
		if (spirit) { redAll = redAll + 8; }
		redAll = (100 - redAll) / 100;
		
		// We check if the user has built some material reduction buildings
		for (var i = 0; i < spot.length; i++) {
			
			building = spot[i].getElementsByTagName('div');
			
			if (isDefined(building, 0) && building[0].className != 'flag') {
			
				if (building[0].className == 'constructionSite') {
					
					construction = true;
					
				}
				
				switch (spot[i].className) {
					case 'architect':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redMarble = parseInt(level);
						break;
					case 'optician':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redCrystal = parseInt(level);
						break;
					case 'carpentering':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWood = parseInt(level);
						break;
					case 'vineyard':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWine = parseInt(level);
						break;
					case 'fireworker':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redSulfur = parseInt(level);
						break;
				}
				
			}
			
		}
		
		// Setting the material reduction in percent
		redWood = (100 - redWood) / 100;
		redWine = (100 - redWine) / 100;
		redMarble = (100 - redMarble) / 100;
		redCrystal = (100 - redCrystal) / 100;
		redSulfur = (100 - redSulfur) / 100;
		
		// Variable for database
		var POSITIONS, BUILDINGS;
		
		// Loadinng DB
		loadDB();
	
		// Creating the icon for each building
		for (var i = 0; i < spot.length; i++) {
	
			building = spot[i].getElementsByTagName('div');
			
			// Check for bureaucracy spot
			if (i == 13) {
								
				if (!bureaucracy) {
					
					// If the research have not been done
					// we skip skip the position 13
					continue;
					
				}
			
			}
			
			if (isDefined(building, 0) && building[0].className != 'flag') {		
				
				// Gets the level of a building
				level = spot[i].getElementsByTagName('a');
				level = getBuildingLevel(level[0].title);
				
				// Defines some style
				building[0].style.fontWeight = 'bold';
				building[0].style.color = 'white';
				
				// Default image to use is no.png
				// no.png = red
				// yes.png = green
				// wait.png = blue
				// unknown.png = grey
				img = 'no';
				
				var buildingType = spot[i].className;
				var iconId = "iuwIcon" + i;
				var posTop, posRight, posInfoTop, posInfoLeft;
				
				// The upgrade level
				// Note: because the database starts with lvl 2 of all buildings,
				// and the index starts with 0, we have to get one level below
				if (building[0].className == 'constructionSite') {
					// If we find a contruction spot, we would like to see the level after the construction
					upLevel = parseInt(level);
					
					// Positioning for construction spot
					posTop = POSITIONS['constructionSite'][0]["y"];
					posRight = POSITIONS['constructionSite'][0]["x"];
					posInfoTop = POSITIONS['constructionSite'][1]["y"];
					posInfoLeft = POSITIONS['constructionSite'][1]["x"];
					
				} else if (isDefined(POSITIONS[buildingType]) && isDefined(BUILDINGS[buildingType])) {
				
					// Positioning for other buildings
					upLevel = parseInt(level) - 1;
					posTop = POSITIONS[buildingType][0]["y"];
					posRight = POSITIONS[buildingType][0]["x"];
					posInfoTop = POSITIONS[buildingType][1]["y"];
					posInfoLeft = POSITIONS[buildingType][1]["x"];
				}
				
				// 3 special cases, uses more than wood and marble			
				switch (buildingType) {
					case 'palace':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'palaceColony':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'academy':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							
							//DEBUG(buildingType, upLevel , reqWood, 0, 0, reqCrystal, 0);
							
							if (wood >= reqWood && crystal >= reqCrystal) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqCrystal, true);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					default:
					
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
															
							//DEBUG(buildingType, (upLevel+2), reqWood, 0, reqMarble, 0, 0);
							
							if (wood >= reqWood && marble >= reqMarble) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqMarble);
							}
							
							if (buildingType == 'townHall') {
								//alert(height);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
						
					break;
				}
			}
	
		}
	}
}

//---------------------------- FUNCTIONS ----------------------------//

/**
 * Creates an icon to attach a building
 * @param object obj
 * @param string icon id
 * @param integer position top
 * @param integer position right
 * @param string images
 * @param integer level
 * @return void
 */
function createIcon(obj, id, top, right, img, level) {
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + imgURL + img +'.png\');">'+ level +'</div>';
}

/**
 * Creates a info box and attach it to an event to an icon (Palace, Residens)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function addOnMouseOverEventPalace(id, target, posTop, posLeft, resWood, resWine, resMarble, resCrystal, resSulfur) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curWine, curMarble, curCrystal, curSulfur, colorWood, colorWine, colorMarble, colorCrystal, colorSulfur;
	var estWood, estWine, estMarble, estCrystal, estSulfur;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m2.png')";
	div.style.height = "102px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { curWine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { curMarble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { curCrystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { curSulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
		
		// Estimating the resource status
		estWood = curWood - resWood;
		estWine = curWine - resWine;
		estMarble = curMarble - resMarble;
		estCrystal = curCrystal - resCrystal;
		estSulfur = curSulfur - resSulfur;
		
		// Adding color to the values
		// Red if negative
		// Green if 0 or positive
		if (estWood >= 0) {	colorWood = "green"; } else { colorWood = "red"; }
		if (estWine >= 0) {	colorWine = "green"; } else { colorWine = "red"; }
		if (estMarble >= 0) { colorMarble = "green"; } else { colorMarble = "red"; }
		if (estCrystal >= 0) { colorCrystal = "green"; } else { colorCrystal = "red"; }
		if (estSulfur >= 0) { colorSulfur = "green"; } else { colorSulfur = "red"; }
		
		// Nasty, ugly HTML for the info box
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l2.png\'); height: 102px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wine.png" /> '+ estWine +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'marble.png" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'glass.png" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'sulfur.png" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r2.png\'); height: 102px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}

/**
 * Creates a info box and attach it to an event to an icon (Academy, other 2 resource requied buildings)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer second resource
 * @param boolean if second resource is crystal
 * @return void
 */
function addOnMouseOverEventDefault(id, target, posTop, posLeft, resWood, res2, isCrystal) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curRes2, colorWood, colorRes2;
	var estWood, estRes2, resIcon2;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m.png')";
	div.style.height = "46px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
		
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }		
		// Estimating the wood status
		estWood = curWood - resWood;
		
		// In order to re-use this function, there is a crystal check
		if (isCrystal) {
	
			if (document.getElementById('value_crystal')) { curRes2 = document.getElementById('value_crystal').textContent.replace(",",""); }
			
			resIcon2 = "glass";
		
		} else {
		
			if (document.getElementById('value_marble')) { curRes2 = document.getElementById('value_marble').textContent.replace(",",""); }
			resIcon2 = "marble";
		}
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l.png\'); height: 46px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + resIcon2 +'.png" /> '+ estRes2 +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r.png\'); height: 46px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}


/**
 * Outputs upgrade values for a building
 * @param string building
 * @param integer level
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function DEBUG(build, lvl, wd, wn, m, c, s) {
	alert(build + " " + lvl + "\r\nwood: " + wd + "\r\nwine: " + wn + "\r\nmarble: " + m + "\r\ncrystal: " + c + "\r\nsulfur: " + s);
}

/**
 * Extracts the action value from URI
 * @param string uri
 * @return string
 */
function getAction(uri) {
	var pos, action;
	
	pos = uri.indexOf("&");
	
	action = uri.substr(8, (pos - 8));
	
	return action;	
}

/**
 * Gets the id of the body-tag which determines the view
 * @return string
 */
function getView() {
	var obj = document.getElementsByTagName("body");
	return obj[0].id;
}

/**
 * Extracts a building level from a given text
 * @param txt
 * @return integer
 */
function getBuildingLevel(txt) {
	var level;
	
	level = getIntValue(txt, '?');
	
	return level;
}

/**
 * Checks if a giving object is defined
 * @param object
 * @param variable
 * @return boolean
 */
function isDefined(object, variable) {
	if (variable != null) {
		return (typeof(eval(object)[variable]) != 'undefined');
	} else {
		return (typeof(eval(object)) != 'undefined');
	}
}

/**
 * Using XMLHttpRequest protocol to get the research list
 * @param url
 * @param id
 * @return void
 */
function getResearch(url, id, asyn) {
	xmlhttp=null;
	
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if (xmlhttp != null) {
	
		xmlhttp.open("GET", 'http://' + url + "/index.php?view=researchOverview&id=" + id, asyn);
		xmlhttp.send(null);
		
		if (asyn == true) {
			xmlhttp.onreadystatechange = stateChange;
		} else {
			stateChange();
		}
		
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
}

function stateChange() {
	if (xmlhttp.readyState == 4) {// 4 = "loaded"
		if (xmlhttp.status == 200) {// 200 = OK
			checkResearch(xmlhttp.responseText);
		} else {
			alert("Problem retrieving data");
		}
	}
}

/**
 * Gets the city ID
 * @return integer
 */
function getCityId() {
	var div = document.getElementById('changeCityForm');
	var a = div.getElementsByTagName('a');	
	var id = a[4].href, pos;

	pos = id.indexOf('id=') + 3;
	id = id.substr(pos);
	
	return parseInt(id);
}

/**
 * Check if some researches have been done (pulley, geometry, spirit, bureaucracy)
 * 
 * @param txt
 * @return void
 */
function checkResearch(txt) {
	var pattern = /<li class="([a-z]+)">[\r\n]+.+<a href="\?view=researchDetail&id=[0-9]+&position=[0-9]&researchId=(2020|2060|2100|2110)+"/g;	
	var matches = txt.match(pattern);
	
	// Pulley ID: 2020
	if (matches[0].indexOf('unexplored') == -1) {
		pulley = true;
		GM_setValue(host + "_iuw_pulley", true);
	}
	
	// Geometry ID: 2060
	if (matches[1].indexOf('unexplored') == -1) {
		geometry = true;
		GM_setValue(host + "_iuw_geometry", true);
	}
	
	// Spirit ID: 2100
	if (matches[2].indexOf('unexplored') == -1) {
		spirit = true;
		GM_setValue(host + "_iuw_spirit", true);
	}
	
	// Bureaucracy ID: 2110
	if (matches[3].indexOf('unexplored') == -1) {
		bureaucracy = true;
		GM_setValue(host + "_iuw_bureaucracy", true);
	}
	
	// If all needed research are done, no reason to check it again
	if (pulley && geometry && spirit && bureaucracy) {
		GM_setValue(host + "_iuw_skip_research", true);
	}
	
	//alert("pulley: " + pulley + "\r\ngeometry: " + geometry + "\r\nspirit: " + spirit + "\r\nbureaucracy: " + bureaucracy);
}

//Contributed by oliezekat
/**
 * Extracts number from string
 * @param str
 * @param defaultValue
 * @return integer
 */
function getIntValue(str, defaultValue) {
	var temp = ""+str;
	
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
		return defaultValue;
	}
	
	return temp;
}

//---------------------------- DATABASE ----------------------------//

function loadDB() {
	// positions for each icon
	POSITIONS = {
		// palace
		"palace" : [
			{ "x" : 40, "y" : 70 },		// positioning the icon
			{ "x" : 10, "y" : 96 },		// positioning the info box
		],
		
		// palaceColony
		"palaceColony" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 10, "y" : 96 },
		],
		
		// academy
		"academy" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// townHall
		"townHall" : [
			{ "x" : 35, "y" : 85 },
			{ "x" : 10, "y" : 38 },
		],

		// architect
		"architect" : [
			{ "x" : 50, "y" : 65 },
			{ "x" : 22, "y" : 18 },
		],

		// safehouse
		"safehouse" : [
			{ "x" : 40, "y" : 42 },
			{ "x" : -6, "y" : -6 },
		],

		//wall
		"wall" : [
			{ "x" : 150, "y" : 40 },
			{ "x" : 500, "y" : 64 },
		],

		// shipyard
		"shipyard" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// port
		"port" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 60, "y" : 24 },
		],

		// glassblowing
		"glassblowing" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// warehouse
		"warehouse" : [
			{ "x" : 60, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// museum
		"museum" : [
			{ "x" : 45, "y" : 60 },
			{ "x" : 6, "y" : 12 },
		],

		// workshop
		"workshop" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// forester
		"forester" : [
			{ "x" : 45, "y" : 50 },
			{ "x" : 26, "y" : 3 },
		],

		// optician
		"optician" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// barracks
		"barracks" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],

		// carpentering
		"carpentering" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// embassy
		"embassy" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 0, "y" : 12 },
		],
		
		// stonemason
		"stonemason" : [
			{ "x" : 50, "y" : 50 },
			{ "x" : 16, "y" : 3 },
		],

		// fireworker
		"fireworker" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// winegrower
		"winegrower" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// vineyard
		"vineyard" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 26, "y" : 12 },	// MANGLER
		],

		// tavern
		"tavern" : [
			{ "x" : 40, "y" : 50 },
			{ "x" : 20, "y" : 3 },
		],

		// alchemist
		"alchemist" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// branchOffice
		"branchOffice" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],
		
		// construction spot
		"constructionSite" : [
			{ "x" : 45, "y" : 59 },
			{ "x" : 18, "y" : 15 },
		]		
	};

	// All index start with level 2
	BUILDINGS = {
		// palace, wood, wine, marble, crystal, sulfur
		"palace" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// palaceColony, wood, wine, marble, crystal, sulfur
		"palaceColony" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// academy, wood, crystal
		"academy" : [
			{ "wood" : 68, "crystal" : 0 },
			{ "wood" : 115, "crystal" : 0 },
			{ "wood" : 263, "crystal" : 0 },
			{ "wood" : 382, "crystal" : 225 },
			{ "wood" : 626, "crystal" : 428 },
			{ "wood" : 982, "crystal" : 744 },
			{ "wood" : 1330, "crystal" : 1089 },
			{ "wood" : 2004, "crystal" : 1748 },
			{ "wood" : 2665, "crystal" : 2454 },
			{ "wood" : 3916, "crystal" : 3786 },
			{ "wood" : 5156, "crystal" : 5216 },
			{ "wood" : 7446, "crystal" : 7862 },
			{ "wood" : 9753, "crystal" : 10729 },
			{ "wood" : 12751, "crystal" : 14599 },
			{ "wood" : 18163, "crystal" : 21627 },
			{ "wood" : 23691, "crystal" : 29321 },
			{ "wood" : 33450, "crystal" : 43020 },
			{ "wood" : 43571, "crystal" : 58213 },
			{ "wood" : 56728, "crystal" : 78724 },
			{ "wood" : 73832, "crystal" : 106414 },
			{ "wood" : 103458, "crystal" : 154857 },
			{ "wood" : 144203, "crystal" : 224146 },
			{ "wood" : 175057, "crystal" : 282571 },
			{ "wood" : 243929, "crystal" : 408877 }		// level 25
		],
		
		// townHall, wood, marble
		"townHall" : [
			{ "wood" : 158, "marble" : 0 },
			{ "wood" : 335, "marble" : 0 },
			{ "wood" : 623, "marble" : 0 },
			{ "wood" : 923, "marble" : 285 },
			{ "wood" : 1390, "marble" : 551 },
			{ "wood" : 2015, "marble" : 936 },
			{ "wood" : 2706, "marble" : 1411 },
			{ "wood" : 3661, "marble" : 2091 },
			{ "wood" : 4776, "marble" : 2945 },
			{ "wood" : 6173, "marble" : 4072 },
			{ "wood" : 8074, "marble" : 5664 },
			{ "wood" : 10281, "marble" : 7637 },
			{ "wood" : 13023, "marble" : 10214 },
			{ "wood" : 16424, "marble" : 13575 },
			{ "wood" : 20986, "marble" : 18254 },
			{ "wood" : 25423, "marble" : 23250 },
			{ "wood" : 32285, "marble" : 31022 },
			{ "wood" : 40232, "marble" : 40599 },
			{ "wood" : 49286, "marble" : 52216 },
			{ "wood" : 61207, "marble" : 68069 },
			{ "wood" : 74804, "marble" : 87316 },
			{ "wood" : 93956, "marble" : 115101 },
			{ "wood" : 113035, "marble" : 145326 },
			{ "wood" : 141594, "marble" : 191053 },
			{ "wood" : 170213, "marble" : 241039 },
			{ "wood" : 210011, "marble" : 312128 },
			{ "wood" : 258875, "marble" : 403824 },
			{ "wood" : 314902, "marble" : 515592 }	// level 29
		],

		// architect, wood, marble
		"architect" : [
			{ "wood" : 291, "marble" : 160 },
			{ "wood" : 413, "marble" : 222 },
			{ "wood" : 555, "marble" : 295 },
			{ "wood" : 720, "marble" : 379 },
			{ "wood" : 911, "marble" : 475 },
			{ "wood" : 1133, "marble" : 587 },
			{ "wood" : 1390, "marble" : 716 },
			{ "wood" : 1689, "marble" : 865 },
			{ "wood" : 2035, "marble" : 1036 },
			{ "wood" : 2437, "marble" : 1233 },
			{ "wood" : 2902, "marble" : 1460 },
			{ "wood" : 3443, "marble" : 1722 },
			{ "wood" : 4070, "marble" : 2023 },
			{ "wood" : 4797, "marble" : 2369 },
			{ "wood" : 5640, "marble" : 2767 },
			{ "wood" : 6618, "marble" : 3226 },
			{ "wood" : 7754, "marble" : 3752 },
			{ "wood" : 9070, "marble" : 4358 },
			{ "wood" : 10598, "marble" : 5056 },
			{ "wood" : 12369, "marble" : 5857 },
			{ "wood" : 14424, "marble" : 6777 },
			{ "wood" : 16807, "marble" : 7836 },
			{ "wood" : 19573, "marble" : 9052 },
			{ "wood" : 22780, "marble" : 10448 },
			{ "wood" : 26501, "marble" : 12054 },
			{ "wood" : 30817, "marble" : 13899 },
			{ "wood" : 35825, "marble" : 16017 },
			{ "wood" : 41631, "marble" : 18450 },
			{ "wood" : 48371, "marble" : 21245 },
			{ "wood" : 56185, "marble" : 24454 },
			{ "wood" : 65251, "marble" : 28141 }	// level 32
		],

		// safehouse, wood, marble
		"safehouse" : [
			{ "wood" : 248, "marble" : 0 },
			{ "wood" : 402, "marble" : 0 },
			{ "wood" : 578, "marble" : 129 },
			{ "wood" : 779, "marble" : 197 },
			{ "wood" : 1007, "marble" : 275 },
			{ "wood" : 1267, "marble" : 366 },
			{ "wood" : 1564, "marble" : 471 },
			{ "wood" : 1903, "marble" : 593 },
			{ "wood" : 2288, "marble" : 735 },
			{ "wood" : 2728, "marble" : 900 },
			{ "wood" : 3230, "marble" : 1090 },
			{ "wood" : 3801, "marble" : 1312 },
			{ "wood" : 4453, "marble" : 1569 },
			{ "wood" : 5195, "marble" : 1866 },
			{ "wood" : 6042, "marble" : 2212 },
			{ "wood" : 7007, "marble" : 2613 },
			{ "wood" : 8107, "marble" : 3078 },
			{ "wood" : 9547, "marble" : 3617 },
			{ "wood" : 10793, "marble" : 4242 },
			{ "wood" : 12422, "marble" : 4967 },
			{ "wood" : 14282, "marble" : 5810 },
			{ "wood" : 16400, "marble" : 6785 },
			{ "wood" : 18815, "marble" : 7919 },
			{ "wood" : 21570, "marble" : 9233 },
			{ "wood" : 24708, "marble" : 10757 },
			{ "wood" : 29488, "marble" : 12526 },
			{ "wood" : 33741, "marble" : 14577 },
			{ "wood" : 38589, "marble" : 16956 },
			{ "wood" : 44115, "marble" : 19715 },
			{ "wood" : 46585, "marble" : 21399 },
			{ "wood" : 53221, "marble" : 24867 }	// level 32
		],

		//wall, wood, marble
		"wall" : [
			{ "wood" : 361, "marble" : 203 },
			{ "wood" : 657, "marble" : 516 },
			{ "wood" : 1012, "marble" : 892 },
			{ "wood" : 1439, "marble" : 1344 },
			{ "wood" : 1951, "marble" : 1885 },
			{ "wood" : 2565, "marble" : 2535 },
			{ "wood" : 3302, "marble" : 3315 },
			{ "wood" : 4186, "marble" : 4251 },
			{ "wood" : 5247, "marble" : 5374 },
			{ "wood" : 6521, "marble" : 6721 },
			{ "wood" : 8049, "marble" : 8338 },
			{ "wood" : 9882, "marble" : 10279 },
			{ "wood" : 12083, "marble" : 12608 },
			{ "wood" : 14724, "marble" : 15402 },
			{ "wood" : 17892, "marble" : 18755 },
			{ "wood" : 21695, "marble" : 22779 },
			{ "wood" : 26258, "marble" : 27607 },
			{ "wood" : 31733, "marble" : 33402 },
			{ "wood" : 38304, "marble" : 40355 },
			{ "wood" : 46189, "marble" : 48699 },
			{ "wood" : 55650, "marble" : 58711 },
			{ "wood" : 67004, "marble" : 70726 },
			{ "wood" : 80629, "marble" : 85144 },
			{ "wood" : 96979, "marble" : 102446 },
			{ "wood" : 116599, "marble" : 123208 },
			{ "wood" : 140143, "marble" : 148122 },
			{ "wood" : 168395, "marble" : 178019 },
			{ "wood" : 202298, "marble" : 213896 },
			{ "wood" : 242982, "marble" : 256948 },
			{ "wood" : 291802, "marble" : 308610 },
			{ "wood" : 350387, "marble" : 370605 }	// level 32
		],

		// shipyard, wood, marble
		"shipyard" : [
			{ "wood" : 202, "marble" : 0 },
			{ "wood" : 324, "marble" : 0 },
			{ "wood" : 477, "marble" : 0 },
			{ "wood" : 671, "marble" : 0 },
			{ "wood" : 914, "marble" : 778 },
			{ "wood" : 1222, "marble" : 1052 },
			{ "wood" : 1609, "marble" : 1397 },
			{ "wood" : 2096, "marble" : 1832 },
			{ "wood" : 2711, "marble" : 2381 },
			{ "wood" : 3485, "marble" : 3071 },
			{ "wood" : 4460, "marble" : 3942 },
			{ "wood" : 5689, "marble" : 5038 },
			{ "wood" : 7238, "marble" : 6420 },
			{ "wood" : 9190, "marble" : 8161 },
			{ "wood" : 11648, "marble" : 10354 },
			{ "wood" : 14745, "marble" : 13117 },
			{ "wood" : 18650, "marble" : 16600 },
			{ "wood" : 23568, "marble" : 20989 },
			{ "wood" : 29765, "marble" : 26517 },
			{ "wood" : 37572, "marble" : 33484 },
			{ "wood" : 47412, "marble" : 42261 },
			{ "wood" : 59807, "marble" : 53321 },
			{ "wood" : 75428, "marble" : 67256 },
			{ "wood" : 95107, "marble" : 84814 }	// level 25
		],

		// port, wood, marble
		"port" : [
			{ "wood" : 150, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 429, "marble" : 0 },
			{ "wood" : 637, "marble" : 0 },
			{ "wood" : 894, "marble" : 176 },
			{ "wood" : 1207, "marble" : 326 },
			{ "wood" : 1645, "marble" : 540 },
			{ "wood" : 2106, "marble" : 791 },
			{ "wood" : 2735, "marble" : 1138 },
			{ "wood" : 3537, "marble" : 1598 },
			{ "wood" : 4492, "marble" : 2176 },
			{ "wood" : 5689, "marble" : 2928 },
			{ "wood" : 7103, "marble" : 3859 },
			{ "wood" : 8850, "marble" : 5051 },
			{ "wood" : 11094, "marble" : 6628 },
			{ "wood" : 13731, "marble" : 8566 },
			{ "wood" : 17062, "marble" : 11089 },
			{ "wood" : 21097, "marble" : 14265 },
			{ "wood" : 25965, "marble" : 18241 },
			{ "wood" : 31810, "marble" : 23197 },
			{ "wood" : 39190, "marble" : 29642 },
			{ "wood" : 47998, "marble" : 37636 },
			{ "wood" : 58713, "marble" : 47703 },
			{ "wood" : 71955, "marble" : 60556 },
			{ "wood" : 87627, "marble" : 76366 },
			{ "wood" : 94250, "marble" : 85042 }	// level 27
		],

		// glassblowing, wood, marble
		"glassblowing" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// warehouse, wood, marble
		"warehouse" : [
			{ "wood" : 288, "marble" : 0 },
			{ "wood" : 442, "marble" : 0 },
			{ "wood" : 626, "marble" : 96 },
			{ "wood" : 847, "marble" : 211 },
			{ "wood" : 1113, "marble" : 349 },
			{ "wood" : 1431, "marble" : 515 },
			{ "wood" : 1813, "marble" : 714 },
			{ "wood" : 2272, "marble" : 953 },
			{ "wood" : 2822, "marble" : 1240 },
			{ "wood" : 3483, "marble" : 1584 },
			{ "wood" : 4275, "marble" : 1997 },
			{ "wood" : 5226, "marble" : 2492 },
			{ "wood" : 6368, "marble" : 3086 },
			{ "wood" : 7737, "marble" : 3800 },
			{ "wood" : 9380, "marble" : 4656 },
			{ "wood" : 11353, "marble" : 5683 },
			{ "wood" : 13719, "marble" : 6915 },
			{ "wood" : 16559, "marble" : 8394 },
			{ "wood" : 19967, "marble" : 10169 },
			{ "wood" : 24056, "marble" : 12299 },
			{ "wood" : 28963, "marble" : 14855 },
			{ "wood" : 34852, "marble" : 17922 },
			{ "wood" : 41918, "marble" : 21602 },
			{ "wood" : 50398, "marble" : 26019 },
			{ "wood" : 60574, "marble" : 31319 },
			{ "wood" : 72784, "marble" : 37678 },
			{ "wood" : 87437, "marble" : 45310 },
			{ "wood" : 105021, "marble" : 54468 },
			{ "wood" : 126121, "marble" : 65458 },
			{ "wood" : 151441, "marble" : 78645 },
			{ "wood" : 181825, "marble" : 94471 },
			{ "wood" : 218286, "marble" : 113461 },
			{ "wood" : 262039, "marble" : 136249 },
			{ "wood" : 314543, "marble" : 163595 },
			{ "wood" : 377548, "marble" : 196409 },
			{ "wood" : 453153, "marble" : 235787 },
			{ "wood" : 543880, "marble" : 283041 },
			{ "wood" : 652752, "marble" : 339745 },
			{ "wood" : 783398, "marble" : 407790 }	// level 40
		],

		// museum, wood, marble
		"museum" : [
			{ "wood" : 1435, "marble" : 1190 },
			{ "wood" : 2748, "marble" : 2573 },
			{ "wood" : 4716, "marble" : 4676 },
			{ "wood" : 7669, "marble" : 7871 },
			{ "wood" : 12099, "marble" : 12729 },
			{ "wood" : 18744, "marble" : 20112 },
			{ "wood" : 28710, "marble" : 31335 },
			{ "wood" : 43661, "marble" : 48394 },
			{ "wood" : 66086, "marble" : 74323 },
			{ "wood" : 99724, "marble" : 113736 },
			{ "wood" : 150181, "marble" : 173643 },
			{ "wood" : 225866, "marble" : 264701 },
			{ "wood" : 339394, "marble" : 403110 },
			{ "wood" : 509686, "marble" : 613492 },
			{ "wood" : 765124, "marble" : 933272 }	// level 16
		],

		// workshop, wood, marble, missing 2 (level 30, 31)
		"workshop" : [
			{ "wood" : 383, "marble" : 167 },
			{ "wood" : 569, "marble" : 251 },
			{ "wood" : 781, "marble" : 349 },
			{ "wood" : 1023, "marble" : 461 },
			{ "wood" : 1299, "marble" : 592 },
			{ "wood" : 1613, "marble" : 744 },
			{ "wood" : 1972, "marble" : 920 },
			{ "wood" : 2380, "marble" : 1125 },
			{ "wood" : 2846, "marble" : 1362 },
			{ "wood" : 3377, "marble" : 1637 },
			{ "wood" : 3982, "marble" : 1956 },
			{ "wood" : 4672, "marble" : 2326 },
			{ "wood" : 5458, "marble" : 2755 },
			{ "wood" : 6355, "marble" : 3253 },
			{ "wood" : 7377, "marble" : 3831 },
			{ "wood" : 8542, "marble" : 4500 },
			{ "wood" : 9870, "marble" : 5279 },
			{ "wood" : 11385, "marble" : 6180 },
			{ "wood" : 13111, "marble" : 7226 },
			{ "wood" : 15078, "marble" : 8439 },
			{ "wood" : 17714, "marble" : 9776 },
			{ "wood" : 19481, "marble" : 11477 },
			{ "wood" : 22796, "marble" : 13373 },
			{ "wood" : 26119, "marble" : 15570 },
			{ "wood" : 29909, "marble" : 18118 },
			{ "wood" : 34228, "marble" : 21074 },
			{ "wood" : 39153, "marble" : 24503 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 58462, "marble" : 38447 }	// level 31
		],

		// forester, wood, marble
		"forester" : [
			{ "wood" : 430, "marble" : 104 },
			{ "wood" : 664, "marble" : 237 },
			{ "wood" : 968, "marble" : 410 },
			{ "wood" : 1364, "marble" : 635 },
			{ "wood" : 1878, "marble" : 928 },
			{ "wood" : 2546, "marble" : 1309 },
			{ "wood" : 3415, "marble" : 1803 },
			{ "wood" : 4544, "marble" : 2446 },
			{ "wood" : 6013, "marble" : 3282 },
			{ "wood" : 7922, "marble" : 4368 },
			{ "wood" : 10403, "marble" : 5781 },
			{ "wood" : 13629, "marble" : 7617 },
			{ "wood" : 17823, "marble" : 10422 },
			{ "wood" : 23274, "marble" : 13108 },
			{ "wood" : 30362, "marble" : 17142 },
			{ "wood" : 39574, "marble" : 22386 },
			{ "wood" : 51552, "marble" : 29204 },
			{ "wood" : 67123, "marble" : 38068 },
			{ "wood" : 87363, "marble" : 49589 },
			{ "wood" : 113680, "marble" : 64569 },
			{ "wood" : 160157, "marble" : 91013 }	// level 22
		],

		// optician, wood, marble
		"optician" : [
			{ "wood" : 188, "marble" : 35 },
			{ "wood" : 269, "marble" : 96 },
			{ "wood" : 362, "marble" : 167 },
			{ "wood" : 471, "marble" : 249 },
			{ "wood" : 597, "marble" : 345 },
			{ "wood" : 742, "marble" : 455 },
			{ "wood" : 912, "marble" : 584 },
			{ "wood" : 1108, "marble" : 733 },
			{ "wood" : 1335, "marble" : 905 },
			{ "wood" : 1600, "marble" : 1106 },
			{ "wood" : 1906, "marble" : 1338 },
			{ "wood" : 2261, "marble" : 1608 },
			{ "wood" : 2673, "marble" : 1921 },
			{ "wood" : 3152, "marble" : 2283 },
			{ "wood" : 3706, "marble" : 2704 },
			{ "wood" : 4348, "marble" : 3191 },
			{ "wood" : 5096, "marble" : 3759 },
			{ "wood" : 5962, "marble" : 4416 },
			{ "wood" : 6966, "marble" : 5178 },
			{ "wood" : 8131, "marble" : 6062 },
			{ "wood" : 9482, "marble" : 7087 },
			{ "wood" : 11050, "marble" : 8276 },
			{ "wood" : 12868, "marble" : 9656 },
			{ "wood" : 14978, "marble" : 11257 },
			{ "wood" : 17424, "marble" : 13113 },
			{ "wood" : 20262, "marble" : 15267 },
			{ "wood" : 23553, "marble" : 17762 },
			{ "wood" : 27373, "marble" : 20662 },
			{ "wood" : 31804, "marble" : 24024 },
			{ "wood" : 36943, "marble" : 27922 },
			{ "wood" : 42904, "marble" : 32447 }	// level 32
		],

		// barracks, wood, marble, missing 1 (level 29)
		"barracks" : [
			{ "wood" : 114, "marble" : 0 },
			{ "wood" : 195, "marble" : 0 },
			{ "wood" : 296, "marble" : 0 },
			{ "wood" : 420, "marble" : 0 },
			{ "wood" : 574, "marble" : 0 },
			{ "wood" : 766, "marble" : 0 },
			{ "wood" : 1003, "marble" : 0 },
			{ "wood" : 1297, "marble" : 178 },
			{ "wood" : 1662, "marble" : 431 },
			{ "wood" : 2115, "marble" : 745 },
			{ "wood" : 2676, "marble" : 1134 },
			{ "wood" : 3371, "marble" : 1616 },
			{ "wood" : 4234, "marble" : 2214 },
			{ "wood" : 5304, "marble" : 2956 },
			{ "wood" : 6630, "marble" : 3875 },
			{ "wood" : 8275, "marble" : 5015 },
			{ "wood" : 10314, "marble" : 6429 },
			{ "wood" : 12843, "marble" : 8183 },
			{ "wood" : 15979, "marble" : 10357 },
			{ "wood" : 19868, "marble" : 13052 },
			{ "wood" : 24690, "marble" : 16395 },
			{ "wood" : 30669, "marble" : 20540 },
			{ "wood" : 38083, "marble" : 25680 },
			{ "wood" : 47277, "marble" : 32054 },
			{ "wood" : 58772, "marble" : 39957 },
			{ "wood" : 72932, "marble" : 49839 },
			{ "wood" : 90490, "marble" : 61909 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 158796, "marble" : 109259 },
			{ "wood" : 186750, "marble" : 128687 }	// level 31
		],

		// carpentering, wood, marble
		"carpentering" : [
			{ "wood" : 122, "marble" : 0 },
			{ "wood" : 192, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 372, "marble" : 0 },
			{ "wood" : 486, "marble" : 0 },
			{ "wood" : 620, "marble" : 0 },
			{ "wood" : 777, "marble" : 359 },
			{ "wood" : 962, "marble" : 444 },
			{ "wood" : 1178, "marble" : 546 },
			{ "wood" : 1432, "marble" : 669 },
			{ "wood" : 1730, "marble" : 816 },
			{ "wood" : 2078, "marble" : 993 },
			{ "wood" : 2486, "marble" : 1205 },
			{ "wood" : 2964, "marble" : 1459 },
			{ "wood" : 3524, "marble" : 1765 },
			{ "wood" : 4178, "marble" : 2131 },
			{ "wood" : 4944, "marble" : 2571 },
			{ "wood" : 5841, "marble" : 3097 },
			{ "wood" : 6890, "marble" : 3731 },
			{ "wood" : 8117, "marble" : 4490 },
			{ "wood" : 9550, "marble" : 5402 },
			{ "wood" : 11229, "marble" : 6496 },
			{ "wood" : 13190, "marble" : 7809 },
			{ "wood" : 15484, "marble" : 9383 },
			{ "wood" : 18167, "marble" : 11273 },
			{ "wood" : 21299, "marble" : 13543 },
			{ "wood" : 24946, "marble" : 16263 },
			{ "wood" : 29245, "marble" : 19531 },
			{ "wood" : 34247, "marble" : 23450 },
			{ "wood" : 40096, "marble" : 28154 },
			{ "wood" : 46930, "marble" : 33798 }	// level 32
		],

		// embassy, wood, marble
		"embassy" : [
			{ "wood" : 415, "marble" : 342 },
			{ "wood" : 623, "marble" : 571 },
			{ "wood" : 873, "marble" : 850 },
			{ "wood" : 1173, "marble" : 1190 },
			{ "wood" : 1532, "marble" : 1606 },
			{ "wood" : 1964, "marble" : 2112 },
			{ "wood" : 2482, "marble" : 2730 },
			{ "wood" : 3103, "marble" : 3484 },
			{ "wood" : 3849, "marble" : 4404 },
			{ "wood" : 4743, "marble" : 5527 },
			{ "wood" : 5817, "marble" : 6896 },
			{ "wood" : 7105, "marble" : 8566 },
			{ "wood" : 8651, "marble" : 10604 },
			{ "wood" : 10507, "marble" : 13090 },
			{ "wood" : 12733, "marble" : 16123 },
			{ "wood" : 15404, "marble" : 19824 },
			{ "wood" : 18498, "marble" : 24339 },
			{ "wood" : 22457, "marble" : 29846 },
			{ "wood" : 27074, "marble" : 36564 },
			{ "wood" : 32290, "marble" : 45216 },
			{ "wood" : 39261, "marble" : 54769 },
			{ "wood" : 47240, "marble" : 66733 },
			{ "wood" : 56812, "marble" : 81859 },
			{ "wood" : 70157, "marble" : 104537 },
			{ "wood" : 84318, "marble" : 129580 },
			{ "wood" : 101310, "marble" : 158759 },
			{ "wood" : 121979, "marble" : 193849 },
			{ "wood" : 146503, "marble" : 236659 },
			{ "wood" : 175932, "marble" : 288888 },
			{ "wood" : 222202, "marble" : 358869 },
			{ "wood" : 266778, "marble" : 437985 }	// level 32
		],

		// stonemason, wood, marble
		"stonemason" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87833 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 }	// level 24
		],

		// fireworker, wood, marble
		"fireworker" : [
			{ "wood" : 353, "marble" : 212 },
			{ "wood" : 445, "marble" : 302 },
			{ "wood" : 551, "marble" : 405 },
			{ "wood" : 673, "marble" : 526 },
			{ "wood" : 813, "marble" : 665 },
			{ "wood" : 974, "marble" : 827 },
			{ "wood" : 1159, "marble" : 1015 },
			{ "wood" : 1373, "marble" : 1233 },
			{ "wood" : 1618, "marble" : 1486 },
			{ "wood" : 1899, "marble" : 1779 },
			{ "wood" : 2223, "marble" : 2120 },
			{ "wood" : 2596, "marble" : 2514 },
			{ "wood" : 3025, "marble" : 2972 },
			{ "wood" : 3517, "marble" : 3503 },
			{ "wood" : 4084, "marble" : 4119 },
			{ "wood" : 4737, "marble" : 4834 },
			{ "wood" : 5487, "marble" : 5663 },
			{ "wood" : 6347, "marble" : 6624 },
			{ "wood" : 7339, "marble" : 7739 },
			{ "wood" : 8480, "marble" : 9033 },
			{ "wood" : 9791, "marble" : 10534 },
			{ "wood" : 11298, "marble" : 12275 },
			{ "wood" : 13031, "marble" : 14295 },
			{ "wood" : 15025, "marble" : 16637 },
			{ "wood" : 17318, "marble" : 19355 },
			{ "wood" : 19955, "marble" : 22508 },
			{ "wood" : 22987, "marble" : 26164 }	// level 28
		],

		// winegrower, wood, marble
		"winegrower" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42484, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72052, "marble" : 39791 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// vineyard, wood, marble
		"vineyard" : [
			{ "wood" : 423, "marble" : 198 },
			{ "wood" : 520, "marble" : 285 },
			{ "wood" : 631, "marble" : 387 },
			{ "wood" : 758, "marble" : 504 },
			{ "wood" : 905, "marble" : 640 },
			{ "wood" : 1074, "marble" : 798 },
			{ "wood" : 1269, "marble" : 981 },
			{ "wood" : 1492, "marble" : 1194 },
			{ "wood" : 1749, "marble" : 1440 },
			{ "wood" : 2045, "marble" : 1726 },
			{ "wood" : 2384, "marble" : 2058 },
			{ "wood" : 2775, "marble" : 2443 },
			{ "wood" : 3225, "marble" : 2889 },
			{ "wood" : 3741, "marble" : 3407 },
			{ "wood" : 4336, "marble" : 4008 },
			{ "wood" : 5019, "marble" : 4705 },
			{ "wood" : 5813, "marble" : 5513 },
			{ "wood" : 6875, "marble" : 6450 },
			{ "wood" : 7941, "marble" : 7537 },
			{ "wood" : 8944, "marble" : 8800 },
			{ "wood" : 10319, "marble" : 10263 },
			{ "wood" : 11900, "marble" : 11961 },
			{ "wood" : 13718, "marble" : 13930 },
			{ "wood" : 15809, "marble" : 16214 },
			{ "wood" : 18215, "marble" : 18864 },
			{ "wood" : 20978, "marble" : 21938 },
			{ "wood" : 24159, "marble" : 25503 },
			{ "wood" : 27816, "marble" : 29639 },
			{ "wood" : 32021, "marble" : 34437 },
			{ "wood" : 36857, "marble" : 40002 },
			{ "wood" : 42419, "marble" : 46457 }	// level 32
		],

		// tavern, wood, marble
		"tavern" : [
			{ "wood" : 222, "marble" : 0 },
			{ "wood" : 367, "marble" : 0 },
			{ "wood" : 541, "marble" : 94 },
			{ "wood" : 750, "marble" : 122 },
			{ "wood" : 1001, "marble" : 158 },
			{ "wood" : 1302, "marble" : 206 },
			{ "wood" : 1663, "marble" : 267 },
			{ "wood" : 2097, "marble" : 348 },
			{ "wood" : 2617, "marble" : 452 },
			{ "wood" : 3241, "marble" : 587 },
			{ "wood" : 3990, "marble" : 764 },
			{ "wood" : 4888, "marble" : 993 },
			{ "wood" : 5967, "marble" : 1290 },
			{ "wood" : 7261, "marble" : 1677 },
			{ "wood" : 8814, "marble" : 2181 },
			{ "wood" : 10678, "marble" : 2835 },
			{ "wood" : 12914, "marble" : 3685 },
			{ "wood" : 15598, "marble" : 4791 },
			{ "wood" : 18818, "marble" : 6228 },
			{ "wood" : 22683, "marble" : 8097 },
			{ "wood" : 27320, "marble" : 10526 },
			{ "wood" : 32885, "marble" : 13684 },
			{ "wood" : 39562, "marble" : 17789 },
			{ "wood" : 47576, "marble" : 23125 },
			{ "wood" : 57192, "marble" : 30063 },
			{ "wood" : 68731, "marble" : 39082 },
			{ "wood" : 82578, "marble" : 50806 },
			{ "wood" : 99194, "marble" : 66048 },
			{ "wood" : 119134, "marble" : 85862 },
			{ "wood" : 143061, "marble" : 111621 },
			{ "wood" : 171774, "marble" : 145107 },
			{ "wood" : 206230, "marble" : 188640 },
			{ "wood" : 247577, "marble" : 245231 }	// level 34
		],

		// alchemist, wood, marble
		"alchemist" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],
		
		// branchOffice, 
		"branchOffice" : [
			{ "wood" : 173, "marble" : 0 },
			{ "wood" : 346, "marble" : 0 },
			{ "wood" : 581, "marble" : 0 },
			{ "wood" : 896, "marble" : 540 },
			{ "wood" : 1314, "marble" : 792 },
			{ "wood" : 1863, "marble" : 1123 },
			{ "wood" : 2580, "marble" : 1555 },
			{ "wood" : 3509, "marble" : 2115 },
			{ "wood" : 4706, "marble" : 2837 },
			{ "wood" : 6241, "marble" : 3762 },
			{ "wood" : 8203, "marble" : 4945 },
			{ "wood" : 10699, "marble" : 6450 },
			{ "wood" : 13866, "marble" : 8359 },
			{ "wood" : 17872, "marble" : 10774 },
			{ "wood" : 22926, "marble" : 13820 },
			{ "wood" : 29286, "marble" : 17654 },
			{ "wood" : 37272, "marble" : 22469 },
			{ "wood" : 47282, "marble" : 28502 },
			{ "wood" : 59806, "marble" : 36051 },
			{ "wood" : 75448, "marble" : 45481 }	// level 21
		]
	};
}









// ==UserScript==
// @name AllScoresInline

// @include http://*.ikariam.*/*
// @exclude http://board.ikariam.*/*
// @require http://userscripts.org/scripts/source/57756.user.js

// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var lversion = "2.61";
var urlscript = "http://userscripts.org/scripts/show/63338";
ScriptUpdater.check(63338, '2.61');

var TotalView = GM_getValue('AllScoresInline_Control_TotalView', true);
var MilitaryView = GM_getValue('AllScoresInline_Control_MilitaryView', true);
var GoldView = GM_getValue('AllScoresInline_Control_GoldView', true);
var BuilderView = GM_getValue('AllScoresInline_Control_BuilderView', true);
var BuildingView = GM_getValue('AllScoresInline_Control_BuildingView', true);
var ResearchView = GM_getValue('AllScoresInline_Control_ResearchView', true);
var ResearcherView = GM_getValue('AllScoresInline_Control_ResearcherView', true);
var OffenseView = GM_getValue('AllScoresInline_Control_OffenseView', true);
var DefenseView = GM_getValue('AllScoresInline_Control_DefenseView', true);
var TradeView = GM_getValue('AllScoresInline_Control_TradeView', true);
var RankView = GM_getValue('AllScoresInline_Control_RankView', true);

var post = {
    score: "score",
    military: "army_score_main",
    gold: "trader_score_secondary",
    building_main:  "building_score_main",
    building_sec:  "building_score_secondary",
    research_main: "research_score_main",
    research_sec: "research_score_secondary",
    offense: "offense",
    defense: "defense",
    trade: "trade"};
    
var updateCounter =0;

var scoreTypes = {
    0: "score", 
    1: "military",
    2: "allyscore",		
    3: "gold",
    4: "building_main",
    5: "building_sec",
    6: "research_main",
    7: "research_sec",
    8: "offense",
    9: "defense",
   10: "trade"};

var scoreShown = false;

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// called using player name, score type, 
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload:onload
    });
}

function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createBaseDiv() {
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "inlinescore");
    
    /*var scoreDiv = */
	scoreElement.innerHTML += 
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"total_score\" class=\"ally\">Scores:" + 
        "</li>";
	
	if (TotalView == true) {
	scoreElement.innerHTML += 		
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"total_score\" class=\"ally\">" +
			"<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.score + ":</span>" +
            "<div id=\"score\">" + lang.unknown + "</div>" +
	    "</li>";
	}
	if (MilitaryView == true) {
	scoreElement.innerHTML += 		
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"army_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.military + ":</span>" +
            "<div id=\"military_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (BuilderView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"building_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.building_main + ":</span>" +
            "<div id=\"building_main_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (BuildingView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"building_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.building_sec + ":</span>" +
            "<div id=\"building_sec_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (ResearcherView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"research_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.research_main + ":</span>" +
            "<div id=\"research_main_score\">" + lang.unknown + "</div>" +
        "</li>";
	
	}
	if (ResearchView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"research_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.research_sec + ":</span>" +
            "<div id=\"research_sec_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (OffenseView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"offense_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.offense + ":</span>" +
            "<div id=\"offense_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (DefenseView == true) {
	scoreElement.innerHTML += 
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"defense_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.defense + ":</span>" +
            "<div id=\"defense_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (TradeView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trade_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.trade + ":</span>" +
            "<div id=\"trade_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (GoldView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trader_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.gold + ":</span>" +
            "<div id=\"gold_score\">" + lang.unknown + "</div>" +
        "</li>";
    }

    /*scoreElement.innerHTML = scoreDiv;*/
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
    scoreShown = true;
}

function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function updateScore(type, score) {
    document.getElementById(type).innerHTML = score;
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: hidden;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
	var place = getElementsByClass(hiddenDiv, "place", false);
	var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
            var totalRank = place[e].innerHTML;
			if (RankView == true) {	
				totalScore += " (#"+totalRank+")";
			}
        }
    }
    document.body.removeChild(hiddenDiv);
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function cityInformation() {
    if (!document.getElementById("inlinescore")) {
        createBaseDiv();
    }
    // Get the lanugage
    lang = defineLanguage(domain);
    
    var playerScore = -1;
    // Remove the "points" information (as of 0.2.8), and get the value for later
    var infoContainer = document.getElementById("infocontainer");
    if (infoContainer) {
        var pointsLi = getElementsByClass(infoContainer, "name", false);
        if (pointsLi[1]) {
            playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
            pointsLi[1].style.display = "none";
        }
    }
    
    // Remove the disabled actions... looks messy when it happens
    var actions = document.getElementById("actions");
    if (actions) {
        textSpans = getElementsByClass(actions, "disabled", true);
        for (var cnt = 0; cnt < textSpans.length;cnt++) {
            //textSpans[cnt].style.display = "none";
        }
    }
    
    // Removes the report player link, again causes a fliker
    var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";

	if (TotalView == true) {
		updateScore("score", lang.fetch);
	}
	if (MilitaryView == true) {
		updateScore("military_score", lang.fetch);
	}
	if (GoldView == true) {
        updateScore("gold_score", lang.fetch);
	}
	if (BuilderView == true) {
        updateScore("building_main_score", lang.fetch);
	}
	if (BuildingView == true) {
        updateScore("building_sec_score", lang.fetch);
	}
	if (ResearcherView == true) {
        updateScore("research_main_score", lang.fetch);
	}
	if (ResearchView == true) {
        updateScore("research_sec_score", lang.fetch);
	}
	if (OffenseView == true) {
        updateScore("offense_score", lang.fetch);
	}
	if (DefenseView == true) {
        updateScore("defense_score", lang.fetch);
	}
	if (TradeView == true) {
        updateScore("trade_score", lang.fetch);
	}

    var listParts = "";
    // Get the players name
    listParts = getElementsByClass(document,"owner", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
    playerName = playerName.replace(/&nbsp;/g, " "); // replace any silly nubspaces!
    
    // Get the players town level for gold pillage data
    listParts = getElementsByClass(document,"citylevel", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, ''), 10); // trim up the town level
    
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

		requestScore(playerName, 'score', function(responseDetails) {
            updateDetails('score', playerName, townLevel, responseDetails.responseText);
        });       
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'building_main', function(responseDetails) {
            updateDetails('building_main_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'building_sec', function(responseDetails) {
            updateDetails('building_sec_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'research_main', function(responseDetails) {
            updateDetails('research_main_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'research_sec', function(responseDetails) {
            updateDetails('research_sec_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'offense', function(responseDetails) {
            updateDetails('offense_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'defense', function(responseDetails) {
            updateDetails('defense_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'trade', function(responseDetails) {
            updateDetails('trade_score', playerName, townLevel, responseDetails.responseText);
        });
	
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 10; interation++) {
            var type = scoreTypes[interation];
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}


function defineLanguage(langTDL) {
    switch (langTDL) {
        case "ar":
            language = {
            float:"left",
            scores:"Puntuaciones",
            fetch:"cargando...",
            unknown:"Desconocido",
            allyscore:"Puntos de Alianza",
            score:"Puntos Totales",
            military:"Generales",
            gold:"Reserva de Oro",
            building_main:  "Constructor",
            building_sec:  "Construcción",
            research_main: "Investigadores",
            research_sec: "Investigación",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Mostrar posición"};
            break;
        case "bg":
            language = {
            float:"left",
            scores:"Точки",
            fetch:"Изтегляне...",
            unknown:"Няма информация",
            allyscore:"Съюзни точки",
            score:"Общ резултат",
            military:"Генерали",
            gold:"Злато",
            building_main: "Строители",
            building_sec: "Ниво сгради",
            research_main: "Учени",
            research_sec: "Нива на научните изследвания",
            offense: "Нападение",
            defense: "Защита",
            trade: "Търговия",
            rank: "Show rank"};
            break;
        case  "br":
            language = {
            float:"left",
            scores: "Pontuações",
            fetch: "Carregando...",
            unknown: "Desconhecido",
            allyscore: "Pontos da Aliança",
            score: "Pontos Totais",
            military: "Generais",
            gold: "Ouro",
            building_main: "Alvenaria",
            building_sec: "Contrução",
            research_main: "Cientistas",
            research_sec: "Pesquisa",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Show rank"};
            break;
        case "by":
            language = {
            float:"left",
            scores:"Баллы",
            fetch:"Ищем...",
            unknown:"Неизвестно",
            allyscore:"Баллы альянса",
            score:"Общий счет",
            military:"Генералы",
            gold:"Золото",
            building_main:  "Строители",
            building_sec:  "Уровни зданий",
            research_main: "Ученые",
            research_sec: "Уровень исследований",
            offense: "Баллы атаки",
            defense: "Баллы защиты",
            trade: "Баллы торговли",
            rank: "Show rank"};
            break;
        case "cn":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            rank: "Show rank"};
            break; 
        case "cz":
            language = {
            float:"left",
            scores:"Scores",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "de":
            language = {
            float:"left",
            scores:"Punkte",
            fetch:"Laden...",
            unknown:"Unbekannt",
            allyscore:"Ally Punkte",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand",
            building_main:  "Baumeister",
            building_sec:  "Gebäudestufen",
            research_main: "Forscher",
            research_sec: "Forschungslvl",
            offense: "Offensivpunkte",
            defense: "Defensivpunkte",
            trade: "Handelsscore",
            rank: "Show rank"};
            break;
        case "es":
            language = {
            float:"left",
            scores:"Puntuaciones",
            fetch:"cargando...",
            unknown:"Desconocido",
            allyscore:"Puntos de Alianza",
            score:"Puntos Totales",
            military:"Generales",
            gold:"Reserva de Oro",
            building_main:  "Constructor",
            building_sec:  "Construcción",
            research_main: "Investigadores",
            research_sec: "Investigación",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Mostrar posición"};
            break;
        case "fr":
            language = {
            float:"left",
            scores:"Points",
            fetch:"Fetching...",
            unknown:"Inconnu",
            allyscore:"Alliance Points",
            score:"Total des points",
            military:"Généraux",
            gold:"Réserves d'or",
            building_main: "Constructeur",
            building_sec: "Bâtiments",
            research_main: "Science",
            research_sec: "Recherche",
            offense: "Attaque",
            defense: "Défense",
            trade: "Commerce",
            rank: "Show rank"};
            break;
        case "gr":
            language = {
            float:"left",
            scores:"Βαθμολογία",
            fetch:"ανάκτηση...",
            unknown:"Άγνωστο",
            allyscore:"Συμμαχία",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός",
            building_main:  "Οικοδόμοι",
            building_sec:  "Κτίρια",
            research_main: "Επιστήμονες",
            research_sec: "Έρευνες",
            offense: "Επίθεση",
            defense: "Άμυνα",
            trade: "Εμπόριο",
            rank: "Show rank"};
            break;
        case "hk":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            rank: "Show rank"};
            break; 
        case "hu":
            language = {
            float:"left",
            scores:"Pontok",
            fetch:"Töltés...",
            unknown:"Ismeretlen",
            allyscore:"Szövetség",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany",
            building_main:  "Építők",
            building_sec:  "Épületek",
            research_main: "Tudósok",
            research_sec: "Fejlesztés",
            offense: "Támadás",
            defense: "Védelem",
            trade: "Kereskedelem",
            rank: "Show rank"};
            break;
        case "il":
            language = {
            float:"right",
            scores:"ניקוד",
            fetch:"טוען...",
            unknown:"לא ידוע",
            allyscore:"ניקוד הברית",
            score:"ניקוד כללי",
            military:"גנרלים",
            gold:"מלאי זהב",
            building_main:  "בונים מוסמכים",
            building_sec:  "שלבי בנייה",
            research_main: "מדענים",
            research_sec: "שלבי מחקר",
            offense: "נקודות התקפה",
            defense: "נקודות הגנה",
            trade: "ניקוד מסחר",
            rank: "הראה דרגה"};
            break;
        case "it":
            language = {
            float:"left",
            scores:"Punteggi",
            fetch:"Caricamento...",
            unknown:"Sconosciuto",
            allyscore:"Punti Alleanza",
            score:"Punteggio Totale",
            military:"Punteggio Militare",
            gold:"Tesoro",
            building_main: "Costruttori",
            building_sec: "Costruzioni",
            research_main: "Scienziati",
            research_sec: "Ricerche",
            offense: "Offensivo",
            defense: "Difensivo",
            trade: "Commercio",
            rank: "Show rank"};
            break;
       case "lv":
            language = {
            float:"left",
            scores:"Punkti",
            fetch:"Ielādē...",
            unknown:"Nezināms",
            allyscore:"Alianses Punkti",
            score:"Kopējie Punkti",
            military:"Ģenerāļi",
            gold:"Zelts",
            building_main:  "Celtnieki",
            building_sec:  "Celtniecība",
            research_main: "Zinātnieki",
            research_sec: "Pētniecība",
            offense: "Uzbrukums",
            defense: "Aizsardzība",
            trade: "Tirdzniecība",
            rank: "Parādīt pozīciju"};
            break;
        case "nl":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Ophalen...",
            unknown:"Onbekend",
            score:"Totale score",
            military:"Militaire Score",
            gold:"Voorraad goud",
            building_main:  "Meesterb.",
            building_sec:  "Gebouwniv.",
            research_main: "Wetenschapp.",
            research_sec: "Onderz.niv.",
            offense: "Aanvalspunten",
            defense: "Defensiepunten",
            trade: "Handelsscore",
            rank: "Rang zichtbaar"}; 
            break;
        case "net":
            language = {
            float:"left",
            scores:"Puan",
            fetch:"Bekleniyor...",
            unknown:"Bilinmeyen",
            allyscore:"İttifak Puanı",
            score:"Toplam Puan",
            military:"General Puanı",
            gold:"Altın Puanı",
            building_main: "Usta inşaatçılar",
            building_sec: "Bina Seviyeleri",
            research_main: "Bilim Adamları",
            research_sec: "Araştırma Seviyeleri",
            offense: "Saldırı",
            defense: "Savunma",
            trade: "Ticaret",
            rank: "Sırlamayı Göster"};
            break;
        case "pl":
            language = {
            float:"left",
            scores:"Wyniki",
            fetch:"Pobieranie...",
            unknown:"Nieznany",
            allyscore:"Sojusz",
            score:"Całkowity",
            military:"Generałowie",
            gold:"Złoto",
            building_main:  "Budowa",
            building_sec:  "Budynki",
            research_main: "Naukowcy",
            research_sec: "Badania",
            offense: "Ofensywa",
            defense: "Obrona",
            trade: "Handel",
            rank: "Show rank"};
            break;
        case  "pt":
            language = {
            float:"left",
            scores: "Pontuações",
            fetch: "Carregando...",
            unknown: "Desconhecido",
            allyscore: "Pontos da Aliança",
            score: "Pontos Totais",
            military: "Generais",
            gold: "Ouro",
            building_main: "Alvenaria",
            building_sec: "Contrução",
            research_main: "Cientistas",
            research_sec: "Pesquisa",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Show rank"};
            break;
        case "ro":
            language = {
            float:"left",
            scores:"Scoruri",
            fetch:"Incarcare...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            score:"Scor Total",
            military:"Generali",
            gold:"Stoc Aur",
            building_main:  "Constructori",
            building_sec:  "Cladiri",
            research_main: "Cercetatori",
            research_sec: "Cercetare",
            offense: "Atac",
            defense: "Aparare",
            trade: "Puncte Comert",
            rank: "Pozitie"};
            break;
        case "ru":
            language = {
            float:"left",
            scores:"Баллы",
            fetch:"Ищем...",
            unknown:"Неизвестно",
            allyscore:"Баллы альянса",
            score:"Общий счет",
            military:"Генералы",
            gold:"Золото",
            building_main:  "Строители",
            building_sec:  "Уровни зданий",
            research_main: "Ученые",
            research_sec: "Уровень исследований",
            offense: "Баллы атаки",
            defense: "Баллы защиты",
            trade: "Баллы торговли",
            rank: "Show rank"};
            break;
        case "sk":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Celkové Skóre",
            military:"Vojenské skóre",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "tr":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "tw":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            rank: "Show rank"};
            break;
         case "ua":
            language = {
            float:"left",
            scores:"Бали",
            fetch:"Пошук...",
            unknown:"Невідомо",
            allyscore:"Бали альянсу",
            score:"Загальний рахунок",
            military:"Генерали",
            gold:"Запас золота",
            building_main:  "Будівельники",
            building_sec:  "Рівні будівель",
            research_main: "Вчені",
            research_sec: "Рівні дослідження",
            offense: "Наступальні бали",
            defense: "Бали захисту",
            trade: "Топ торгівлі",
            rank: "Show rank"};
            break; 
        case "vn":
            language = {
            float:"left",
            scores:"Scores", 
            fetch:"Đang tải...",
            unknown:"Không biết",
            allyscore:"Liên minh",
            score:"Tổng điểm",
            military:"Quân sự",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "ikariam":
            switch (subDomain) 
            {
                case "ae":
                    language = {
                    float:"right",
                    scores:"النقاط",
                    fetch:"جلب...",
                    unknown:"غير معروف",
                    allyscore:"نقاط الحلف",
                    score:"مجموع النقاط",
                    military:"الجنرالات",
                    gold:"نقاط الذهب",
                    building_main:  "معلم بناء",
                    building_sec:  "مستوى المباني",
                    research_main: "باحث",
                    research_sec: "مستوى الأبحاث",
                    offense: "نقاط الهجوم",
                    defense: "نقاط الدفاع",
                    trade: "ترتيب التجارة",
                    rank: "Show rank"};
                    break;
                case  "ar":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    rank: "Mostrar posición"};
                    break;
                case  "ba":
                    language = {
                    float:"left",
                    scores:"Bodovi",
                    fetch:"Privlacan...",
                    unknown:"Nepoznat",
                    allyscore:"Savezni Bodovi",
                    score:"Totalni Bodovi",
                    military:"Vojni Bodovi",
                    gold:"Zlatni Bodovi",
                    building_main: "Konstruktor",
                    building_sec: "Izgradnja",
                    research_main: "Nauka",
                    research_sec: "Istrazivanje",
                    offense: "Ofanziva",
                    defense: "Odbrana",
                    trade: "Trgovanje",
                    rank: "Show rank"};
                    break;
                case  "cl":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    rank: "Mostrar posición"};
                    break;
                case  "co":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    rank: "Show rank"};
                    break;
                case "fi":
                    language = {
                    float:"left",
                    scores:"Scores",
                    fetch:"haetaan...",
                    unknown:"Unknown",
                    allyscore:"Ally Score",
                    score:"Kokonaispisteet",
                    military:"Sotilaspisteet",
                    gold:"Gold Score",
                    building_main:  "Builder",
                    building_sec:  "Building",
                    research_main: "Science",
                    research_sec: "Research",
                    offense: "Offense",
                    defense: "Defense",
                    trade: "Trading",
                    rank: "Show rank"};
                    break;
                case "id":
                    language = {
                    float:"left",
                    scores:"Skor",
                    fetch:"Memuat...",
                    unknown:"Tidak diketahui",
                    allyscore:"Skor Sekutu",
                    score:"Total Skor",
                    military:"Skor Militer",
                    gold:"Skor Emas",
                    building_main:  "Pekerja",
                    building_sec:  "Membangun",
                    research_main: "Sains",
                    research_sec: "Penelitian",
                    offense: "Menyerang",
                    defense: "Bertahan",
                    trade: "Berdagang",
                    rank: "Show rank"};
                    break;
                case "ir":
                    language = {
                    float:"right",
                    scores:"امتیاز",
                    fetch:"در حال جستجو",
                    unknown:"نامعلوم",
                    allyscore:"امتیاز اتحاد",
                    score:"امتیاز کلی",
                    military:"امتیاز ژنرال",
                    gold:"طلا",
                    building_main:  "بناء",
                    building_sec:  "ساختمان",
                    research_main: "محقق",
                    research_sec: "تحقیق",
                    offense: "اهجومی",
                    defense: "دفاعی",
                    trade: "تجاری",
                    rank: "Show rank"};
                    break;
	    }
            break;
        default:
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
    }
    return language;
}

function init() {
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation();
        }
    }
}
function setChekbox(idsave,id)	// control state of the checkbox
{
		var savevalue = GM_getValue(idsave,true);
		if (savevalue == false) document.getElementById(id).checked = false;
		else document.getElementById(id).checked = true;
}

function displayOnOptions_fn() {

		var ScoreOptions = document.createElement("div");
		ScoreOptions.setAttribute('id','optionAllScoresInline');
		ScoreOptions.innerHTML = 
			"<div class='contentBox01h'>" +
				"<h3 class='header'>"+
					"<span class='textLabel'>AllScoresInline Control v"+ lversion +" <a href='"+ urlscript +"' target='_blank'>(by Woeka and AnneDeGeus)</a></span> "+
				"</h3>"+
				"<div class='content'>" +
					"<table cellpadding='0' cellspacing='0'>"+
						"<tbody>"+
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.score +"</th>" +
								"<td><input type='checkbox' id='optionTotal'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.military +"</th>" +
								"<td><input type='checkbox' id='optionMilitary'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.gold +"</th>" +
								"<td><input type='checkbox' id='optionGold'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.building_main +"</th>" +
								"<td><input type='checkbox' id='optionBuilder'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.building_sec +"</th>" +
								"<td><input type='checkbox' id='optionBuilding'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.research_main +"</th>" +
								"<td><input type='checkbox' id='optionResearcher'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.research_sec +"</th>" +
								"<td><input type='checkbox' id='optionResearch'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.offense +"</th>" +
								"<td><input type='checkbox' id='optionOffense'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.defense +"</th>" +
								"<td><input type='checkbox' id='optionDefense'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.trade +"</th>" +
								"<td><input type='checkbox' id='optionTrade'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.rank +"</th>" +
								"<td><input type='checkbox' id='optionRank'></td>"+
							"</tr>" +
						"</tbody>"+
					"</table>" +
				"</div>" +
				/*"<div class='centerButton'>"+	
					"<span class='button'id='AllScoresInlineSave'>Save</span>"+	
				"</div>"+*/
                "<div class='footer'></div>" +
            "</div>";			

		document.getElementById("mainview").insertBefore(ScoreOptions, document.getElementById("vacationMode"));	

		document.getElementById('optionTotal').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_TotalView', document.getElementById('optionTotal').checked);},true);
		document.getElementById('optionMilitary').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_MilitaryView', document.getElementById('optionMilitary').checked);},true);
		document.getElementById('optionGold').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_GoldView', document.getElementById('optionGold').checked);},true);
		document.getElementById('optionBuilder').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_BuilderView', document.getElementById('optionBuilder').checked);},true);
		document.getElementById('optionBuilding').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_BuildingView', document.getElementById('optionBuilding').checked);},true);
		document.getElementById('optionResearch').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_ResearchView', document.getElementById('optionResearch').checked);},true);
		document.getElementById('optionResearcher').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_ResearcherView', document.getElementById('optionResearcher').checked);},true);
		document.getElementById('optionOffense').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_OffenseView', document.getElementById('optionOffense').checked);},true);
		document.getElementById('optionDefense').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_DefenseView', document.getElementById('optionDefense').checked);},true);
		document.getElementById('optionTrade').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_TradeView', document.getElementById('optionTrade').checked);},true);
		document.getElementById('optionRank').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_RankView', document.getElementById('optionRank').checked);},true);
		
		// controll state of chekbox
		setChekbox('AllScoresInline_Control_TotalView','optionTotal');
		setChekbox('AllScoresInline_Control_MilitaryView','optionMilitary');
		setChekbox('AllScoresInline_Control_GoldView','optionGold');
		setChekbox('AllScoresInline_Control_BuilderView','optionBuilder');
		setChekbox('AllScoresInline_Control_BuildingView','optionBuilding');
		setChekbox('AllScoresInline_Control_ResearchView','optionResearch');
		setChekbox('AllScoresInline_Control_ResearcherView','optionResearcher');
		setChekbox('AllScoresInline_Control_OffenseView','optionOffense');
		setChekbox('AllScoresInline_Control_DefenseView','optionDefense');
		setChekbox('AllScoresInline_Control_TradeView','optionTrade');
		setChekbox('AllScoresInline_Control_RankView','optionRank');
}

//start script
if (document.getElementById('options_changePass')) {
    lang = defineLanguage(domain);
	displayOnOptions_fn();
} else {
    lang = defineLanguage(domain);
	init();
}








// ==UserScript==
// @name           Big map
// @namespace      Ikariam
// @include        http://*.ikariam.*/index.php?view=worldmap_iso*
// @author		matheod
// ==/UserScript==

function option(titre, message, nom)
{
actuel = "Activer";
if(GM_getValue(nom)){actuel="Désactiver";}
GM_registerMenuCommand(actuel+" "+titre,fonction);
function fonction()
{
if(confirm("Voulez vous vraiment "+actuel+" "+message))
{
if(GM_getValue(nom)){GM_setValue(nom, false);}else{GM_setValue(nom, true);}
}
location.reload();
}
}
option("par défaut", "l'affichage par défaut de la big map ?","defaut");

nodediv = document.createElement("div");
nodediv.setAttribute('id','bigmap');
document.body.appendChild(nodediv);
if(GM_getValue("defaut")){
document.getElementById("scrollcover").style.overflow="visible";document.getElementById("map1").style.cursor="default";document.getElementById("dragHandlerOverlay").style.border="5px solid black";document.getElementById("dragHandlerOverlay").style.opacity="0.1";
document.getElementById('bigmap').innerHTML="<div id='bigmap1' style='display:none;position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"bigmap1\").style.display=\"none\";document.getElementById(\"bigmap2\").style.display=\"block\";document.getElementById(\"scrollcover\").style.overflow=\"visible\";document.getElementById(\"map1\").style.cursor=\"default\";document.getElementById(\"dragHandlerOverlay\").style.border=\"5px solid black\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"0.1\";'><img src='http://img38.imageshack.us/img38/2343/redhatstarthere.png'></div><div id='bigmap2' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"bigmap1\").style.display=\"block\";document.getElementById(\"bigmap2\").style.display=\"none\";document.getElementById(\"scrollcover\").style.overflow=\"hidden\";document.getElementById(\"map1\").style.cursor=\"move\";document.getElementById(\"dragHandlerOverlay\").style.border=\"none\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"1\";'><img src='http://img513.imageshack.us/img513/3854/redhatstarthere2.png'></div>";
}else{
document.getElementById('bigmap').innerHTML="<div id='bigmap1' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"bigmap1\").style.display=\"none\";document.getElementById(\"bigmap2\").style.display=\"block\";document.getElementById(\"scrollcover\").style.overflow=\"visible\";document.getElementById(\"map1\").style.cursor=\"default\";document.getElementById(\"dragHandlerOverlay\").style.border=\"5px solid black\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"0.1\";'><img src='http://img38.imageshack.us/img38/2343/redhatstarthere.png'></div><div id='bigmap2' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;display:none;' onclick='document.getElementById(\"bigmap1\").style.display=\"block\";document.getElementById(\"bigmap2\").style.display=\"none\";document.getElementById(\"scrollcover\").style.overflow=\"hidden\";document.getElementById(\"map1\").style.cursor=\"move\";document.getElementById(\"dragHandlerOverlay\").style.border=\"none\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"1\";'><img src='http://img513.imageshack.us/img513/3854/redhatstarthere2.png'></div>";
}


















// ==UserScript==
// @name           Ikariam Military Cargo (Blank Canvas)


// @include        http://s*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*

// ==/UserScript==

GM_addStyle('.resourcesOnBoard h5 { display:none; }\
			.resourcesOnBoard .unitBox { width:35px; float:left; margin-top:4px; text-align:center; }\
			.resourcesOnBoard .unitBox img { width:20px; }\
			.resourcesOnBoard .unitBox .iconSmall { padding-top:4px; }\
			.resourcesOnBoard .count { text-align:center; font-weight:normal; font-size:10px; }\
			.resourcesOnBoard .icon { text-align:center; }\
			tr.own td:first-child + td {  }');

var elems = document.getElementById('mainview').getElementsByTagName('div');
for(var i = 0; i < elems.length; i++) {
	if(elems[i].className == 'tooltip2' && elems[i].innerHTML.match(/count/)) {
		try {
			var src = elems[i].innerHTML;
			var target = elems[i].parentNode;
			target.wrappedJSObject.onmouseover = null;
			target.style.cursor = "auto";
			target.innerHTML = "";
			target.innerHTML += '<table class="resourcesOnBoard" style="width:275px;">' + src + '</table>';	
		} catch(e) {}
	}
}



















// ==UserScript==
// @name           antropomorfico
// @namespace      antropomorfico script
// @include        http://s*.ikariam.*/*

// @version        1.00
// ==/UserScript==


javascript:d=document;pretty=function(t){ c=t.id.substring(7); m=d.getElementById('tbl_mail'+c); or=m.style.display; m.style.display=''; x=m.innerText || m.textContent; x=x.replace(/ +/g, ' ').replace(/(^ )|( $)/g, ''); tds=t.getElementsByTagName('td'); tt=tds[3]; h = tt.innerHTML.substring(0,1); if (h!='A') {h="<span style='color: red'>"+h+"</span>";} tt.innerHTML = h + " : <span style='color: " + (h == 'A' ? 'blue' : 'red') + "'>" + x.substring(0,45) + "</span>"; m.style.display=or; for(j=0; j<tds.length; j++) { s=tds[j].style; s.whiteSpace='nowrap';s.overflow= 'hidden'; } tds[1].style.display='none'; tds[5].style.fontSize='8px'};t=d.getElementsByClassName('entry');for(i=0;i<t.length;i++) { pretty(t[i]); }; tb=t[0].parentNode;th=tb.childNodes[0];th.childNodes[3].style.display='none';tb.innerHTML="<tr><td colspan='10' style='background:#edcf7c; font-weight: bold;'><big><a href='http://s12.ikariam.es/index.php?view=sendIKMessage&msgType=51&allyId=1542' style='color:#5E3703'>ENVIAR UN MENSAJE A LA ALIANZA</a></big></td></tr>"+tb.innerHTML;void(0);













