// ==UserScript==
// @name          probando probando 2

// @description    sin mas
// @include        http://s*.ikariam.*/*?*
// @include        http://s*.ikariam.*/
// @include        http://s*.ikariam.*/index.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @version		   0.24
//

// ==/UserScript==

ScriptUpdater.check(59879, "0.24");


IkaTools.init({
	debugMode:false,
	trackData:{
		resources:false, construction:false,
	}
});

Config.prefix = 'testing' + document.domain;

Config.settings = {
	"General":{
		html:'<p>Ajustes generales para el Ayudante del  Saqueo.</p>',
		fields:{
			targetsOverview:{
				type:'checkbox',
				label:'Tabla de saqueo',
				text:'ver la tabla debajo del informador de investigación',
				value:true,
			},
		}
	},
	"Isla":{
		html:'<p>Estos ajustes efectuarán el modo que las cosas son mostradas sobre la vista  de la isla.</p>', 
		fields:{
			islandShowSpies:{
				type:'checkbox', 
				label:'Iconos de espia',
				text:'muestre iconos de espía al lado de las ciudades en las cuales usted tiene espías',
				value:true,
			},
			islandBlinkInactives:{
				type:'checkbox', 
				label:'Parpadeo Inactivos',
				text:'haga los nombres de parpadeo de ciudades inactivo ',
				value:true,
			},
			islandMarkLoners:{
				type:'checkbox', 
				label:'Sin alianza',
				text:'los nombres de ciudades que no tienen alianza, se mostraran en rojo ',
				value:true,
			},			
		}
	},
	"Misiones":{
		html:'<p>Seleccione las misiones que le gustaría mostrar.</p>',
		fields:{
			showMissionGold:{
				type:'checkbox',
				label:'Oro',
				text:'el espía reconoce la cámara de tesoro',
				value:false,
			},
			showMissionResearch:{
				type:'checkbox',
				label:'Investigación',
				text:'el espía reconoce el nivel de investigación',
				value:false,
			},
		}
	},
"Acerca":{
		html:'<p><a href="' + 
				'</a>  <a href="" target="_blank"></a>\
				<p>Le deja buscar en juego islas, ciudades, jugadores, etc.  <a href="http://ika-world.com" target="_blank">www.ika-world.com</a>.</p>',	
		fields:{
                        debugMode:{
				type:'checkbox',
				label:'Modo de Ajuste',
				text:'muestra el tiempo de ejecución del script',
				value:false,
			}

			
		}
	}
};
Config.scriptName = 'Ikariam Ayudante del Saqueo';



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
		IkaTools.addOptionsLink("Ayudante del Saqueo");
		Pillage.debugStart('Ayudante del Saqueo');
		unsafeWindow.Pillage = Pillage;
		Pillage.loadData();
		if(typeof(Pillage.views[IkaTools.getView()]) == 'function')		// process current view
			Pillage.views[IkaTools.getView()]();					
		if(Config.get('targetsOverview')) {
			$('#advisors li#advResearch')[0].addEventListener('mouseover', Pillage.showTargetsOverview, false);
			Pillage.tackTargetsOverview(false);
		}
		Pillage.debugStop('Ayudante del Saqueo');
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
						target.cityName = tmp.match(/^[^\s]+/)[0];
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
							<th>Jugador</th>\
							<th>Alianza</th>\
							<th>Ciudad</th>\
							<th style="text-align:center"><img src="/skin/img/city/building_townhall.gif" style="height:16px" title="Nivel ciudad"/></th>\
							<th style="text-align:center"><img src="/skin/layout/stadtmauer_icon.gif" style="height:16px" title="Nivel del muro"/></th>\
							<th style="text-align:center"><img src="/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:16px" title="Morteros necesarios"/></th>\
							<th style="text-align:center"><img src="/skin/img/city/building_port.gif" style="height:16px" title="Nivel del puerto"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_wood.gif" style="height:14px;" title="Madera disponible para el saqueo"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_wine.gif" style="height:14px;" title="Vino disponible para el saqueo"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_marble.gif" style="height:14px;" title="Marmol disponible para el saqueo"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_crystal.gif" style="height:14px;" title="Cristal disponible para el saqueo"/></th>\
							<th style="text-align:center;"><img src="/skin/resources/icon_sulfur.gif" style="height:16px;" title="Azufre disponible para el saqueo"/></th>\
							<th style="text-align:center;"><img src="/skin/characters/fleet/40x40/ship_transport_r_40x40.gif" style="height:16px;" title="Barcos comerciales requeridos para llevar el botín"/></th>\
							<th style="text-align:center;"><img src="/skin/img/city/building_barracks.gif" style="height:16px;" title="Información de guarnición"/></th>\
							<th style="text-align:center"><img src="/skin/characters/military/120x100/spy_120x100.gif" style="height:16px" title="Espías en objetivo"/></th>\
							<th style="text-align:right"><img src="' + Pillage.icons.refreshSmall + '" style="cursor:pointer;" id="PillageHelperTargetsOverviewRefresh" title="Retirar los espias"/></th>\
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
			html += '	<td title="Nivel ciudad" style="text-align:center">' + Pillage.targetGetCityLevel(target) + '</td>\
						<td title="Nivel muralla" style="text-align:center">' + Pillage.targetGetWallLevel(target) + '</td>\
						<td title="Morteros necesarios"  style="text-align:center">' + Pillage.targetGetMortarsNeeded(target) + '</td>\
						<td title="Nivel de puerto"  style="text-align:center">' + Pillage.targetGetPortLevel(target) + '</td>';
			// resources
			var resourcesUpdatedString = Pillage.targetGetResourcesLastUpdatedString(target);
			for(var z = 0; z < Pillage.resourceTypes.length; z++) {
				var type = Pillage.resourceTypes[z];
				var available = Pillage.targetGetResourceAvailable(target, type);
				html += '<td title="Último espiado: ' + resourcesUpdatedString + '" style="text-align:center;" id="pillageHelperTargetResource' + type + '_' + target.id + '">' + (available > 0 ? IkaTools.addCommas(available) : (resourcesUpdatedString == '?' ? '?' : '-')) + '</td>';
			}
			// ships
			var totalAvailable = Pillage.targetGetResourceAvailableTotal(target);
			html += '<td title="Último espiado: ' + resourcesUpdatedString + '" style="text-align:center; font-weight:bold;" id="pillageHelperTargetOverviewShips_' + target.id + '">' + (resourcesUpdatedString != '?' ? Math.ceil(totalAvailable / 500) : (resourcesUpdatedString == '?' ? '?' : '-') ) + 
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
			html += '	<td title="Numero de espías en ' + target.cityName + '" style="text-align:center;">';
							var numSpiesTotal = 0;
							for(var x in spies)
								numSpiesTotal++;
							html += numSpiesTotal > 0 ? numSpiesTotal : '-';
			html += '	</td>\
						<td style="text-align:right;">'
							html += Pillage.targetGetIslandId(target) ?
									'	<a href="/index.php?view=island&cityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '"><img src="/skin/layout/icon-island.gif" style="height:16px;" title="Vista' + target.cityName + ' a su isla"/></a>' :
									'	<img src="/skin/layout/icon-island.gif" style="height:16px;" class="disabled" title="Incapaz de ver la isla porque aún no conocen su ID"/>'
			// missions
							html += '<div class="pillageHelperTargetsOverviewSpies" style="display:inline;">';
							if(numSpiesTotal > 0) {
								html += '<img src="/skin/layout/icon-mission.gif" style="height:14px; cursor:pointer;"/>';
								var spiesHtml = '<div class="pillageHelperTargetsOverviewSpiesDetails" style="padding-bottom:0 !important;">';
								for(var x in spies) {
									var city = IkaTools.getCityById(spies[x].cityId);
									var hideout = city ? IkaTools.cityGetBuildingByType('safehouse', city) : false;
									spiesHtml += hideout ? '<div style="margin-bottom:1em;">\
																<img src="/skin/layout/icon-missionAbort.gif" style="height:14px; float:right; margin-left:2px; cursor:pointer;" title="Retirar espía de ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionWithdraw" name="' + spies[x].id + '"/>\
																<img src="/skin/img/city/building_barracks.gif" style="height:16px; float:right; cursor:pointer;" title="Espiar ejercito de ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionGarrison" name="' + spies[x].id + '"/>\
																<img src="/skin/img/city/building_warehouse.gif" style="height:16px; float:right; cursor:pointer;" title="Espiar deposito de ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionResources" name="' + spies[x].id + '"/>\
																<a href="javascript:Pillage.goTo(\'http://' + document.domain + '/index.php?view=safehouse&position=' + hideout.position + '&id=' + city.id + '\', ' + city.id + ');" title="Ir al escondite ' + city.name + '">' + city.name + '</a>' +
															'</div>' 
															: '';
								}
								html += spiesHtml + '</div>';
							} else
								html += '<img src="/skin/layout/icon-mission.gif" style="height:14px;" class="disabled" title="No tienes espías en ' + target.cityName + '"/>'
							html += '</div>';
			// pillage
							html += ' <a href="/index.php?view=plunder&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="Saqueo ' + target.cityName + '"><img src="/skin/actions/plunder.gif" style="height:14px;"/></a>';
			// send spy
							html += Pillage.targetGetIslandId(target) ?
										' <a href="/index.php?view=sendSpy&destinationCityId=' + target.id + '&islandId=' + Pillage.targetGetIslandId(target) + '" title="Enviar espía a ' + target.cityName + '"><img src="/skin/actions/espionage.gif" style="height:14px;"/></a>' :
										' <img src="/skin/actions/espionage.gif" style="height:14px;" class="disabled" title="Incapaz de enviar el espía porque aún no saben la ID de la isla"/>';											
							html += numSpiesTotal == 0 ? 
									'<img src="' + Pillage.icons.trash + '" title="Remove ' + target.cityName + ' from target list" style="cursor:pointer;" class="pillageHelperTargetOverviewDeleteImg" name="' + target.id + '" />' : 
									'<img src="' + Pillage.icons.trash + '" title="Usted todavía tiene espías en ' + target.cityName + '" class="disabled"/> '
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
					$('#pillageHelperTargetOverviewShips_' + target.id).attr('title', 'Último puesto al día: ' + Pillage.targetGetResourcesLastUpdatedString(target));
					for(var i = 0; i < Pillage.resourceTypes.length; i++) {
						var type = Pillage.resourceTypes[i];
						var qty = IkaTools.addCommas(Pillage.targetGetResourceAvailable(target, type));
						$('#pillageHelperTargetResource' + type + '_' + target.id).html(qty == 0 ? '-' : qty);	
						$('#pillageHelperTargetResource' + type + '_' + target.id).attr('title', 'Último puesto al día: ' + Pillage.targetGetResourcesLastUpdatedString(target));
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
						if(numHideouts == 0)
							Pillage.drawTargetsOverview();
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
	formatDate:function(day , month, year, hour, minute) {
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
					var c = confirm('Esta misión de espiar el ejercito costará ' + cost + ' de oro y tiene un riesgo' + risk + ' de ser capturado.');
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
		var html = 'Recursos: ';
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
			protected += (target.warehouses[i] * 80 + 100);
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
						img.title = "Tienes un espia en esta ciudad";
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
						html += '<p style="font-size:8px;" title="Recursos disponibles - ' + Pillage.targetGetResourcesLastUpdatedString(target) +' hace">\
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
				btn.innerHTML = '<a href="/index.php?view=militaryAdvisorDetailedReportView&combatRound=1&detailedCombatId=' + document.location.toString().match(/combatId=(\d+)/)[1] + '" class="button">Informe Detallado De combate</a>';
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
						target.cityName = tmp.match(/^[^\s]+/)[0];
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
						$('.city', this)[0].innerHTML += ' &nbsp; <a href="/index.php?view=island&cityId=' + target.id + '" title="Vista de la ciudad de la isla"><img src="/skin/layout/icon-island.gif" style="vertical-align:middle;"/></a>';
						var div = document.createElement('div');
						div.id = "pillageHelperTools" + targetId;
						div.setAttribute('style', 'margin-top:1.5em; margin-left:1em;');
						var html = '<p align="right">\
								<a title="Lista de misiones" href="' + $('.missionButton a', this).attr('href') + '"><img src="/skin/layout/icon-mission.gif" class="pillageHelperAttackButton"/></a>\
								<a href="javascript:void(0)" id="pillageHelperMissionResources' + spyId + '" class="button" title="Inspeccionar recursos" style="padding-left:2px; padding-right:2px;">\
									<img src="/skin/img/city/building_warehouse.gif" style="height:21px; vertical-align:middle"/></a>\
								<a href="javascript:void(0)" id="pillageHelperMissionGarrison' + spyId + '" class="button pillageGarrisonMission" style="padding-left:6px; padding-right:6px;">\
									<img src="/skin/img/city/building_barracks.gif" style="height:17px; position:relative; top:-1px; vertical-align:middle;"/>';
									
						if(typeof(target.garrison) != 'undefined') {
							html += '<div class="pillageGarrisonReport">' + Pillage.targetGetGarrisonLastUpdatedString(target) + ' ago:<br/><br/>' +
										target.garrison.html + 
									'</div>';	
						}
						html += '</a>\
								<a title="Saquear" href="/index.php?view=plunder&destinationCityId=' + target.id + '"><img src="/skin/actions/plunder.gif" class="pillageHelperAttackButton"/></a>\
								<a title="Bloquear puerto" href="/index.php?view=blockade&destinationCityId=' + target.id + '"><img src="/skin/actions/blockade.gif" class="pillageHelperAttackButton"/></a>\
								<a title="Retirarse" id="PillageHelperWithdraw_' + spy.id + '" href="javascript:void(0)"><img src="/skin/layout/icon-missionAbort.gif" class="pillageHelperAttackButton"/></a>\
							</p><p style="margin-top:-2em;">\
								<img src="/skin/img/city/building_townhall.gif" style="height:25px; margin-left:-20px; vertical-align:middle"/> ' + Pillage.targetGetCityLevel(target) + '\
								<img src="/skin/layout/stadtmauer_icon.gif" style="height:25px; vertical-align:middle"/> ' + Pillage.targetGetWallLevel(target) + '\
								<span title="Morteros necesarios"><img src="/skin/characters/military/120x100/mortar_r_120x100.gif" style="height:25px; margin-left:10px; vertical-align:middle"/> ' + Pillage.targetGetMortarsNeeded(target) + '</span>\
								<img src="/skin/img/city/building_port.gif" style="height:25px; margin-left:10px; vertical-align:middle"/> ' + Pillage.targetGetPortLevel(target) + '\
								';
						if(Pillage.targetIsOccupied(target)) {
							html += '<img src="/skin/img/island/besatzung_rot_cursor.gif" style="margin-left:10px; height:30px; vertical-align:middle" title="a ciudad objetivo esta bajo la ocupación militar"/> '
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


// ==UserScript==
// @name           Ikariam All In One Embassy Tool
// ==/UserScript==

 
if(document.getElementById('embassy') == null && document.getElementById('alliance') == null) return;

var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

var tpl = GM_getValue('template', 0);

var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;
//var points_cell_idx = membersTab.rows[0].cells.length - 3;
var points_cell_idx = 4;

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
  co: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
  il: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

//Order by points... not needed anymore
//sortAlly();

//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue(domain + "." + server + ".members.2.8", {}) || {});
var recorded_points = eval(GM_getValue(domain + "." + server + ".points.2.8", {}) || {});
//Add reset and config images
var confRow = document.createElement('TR');
var confCell = document.createElement('TD');
confCell.setAttribute('colspan', '6');
confCell.innerHTML = "<img style='float: left' src='http://isoleunite.mmxforge.net/images/stories/ikariam/unit_boom_small.gif' alt='Config' title='Config' id='ainfoConfig'>";
confCell.innerHTML += "<img style='float: right' src='http://isoleunite.mmxforge.net/images/stories/ikariam/icon-backx20.gif' alt='Reset' title='Reset' id='ainfoReset'>";
confRow.appendChild(confCell);
membersTab.appendChild(confRow);

//Listener to reset member's points record
document.addEventListener('click',function(event) {
  //Send Message Button
  if (event.target.id=='ainfoReset') 
  {
    recorded_points = actualValues;
    if(confirm(lang[local]['confirm']))
      saveArray("points", recorded_points);
  }
  if (event.target.id=='ainfoConfig') 
  {
    showToolConfig(event);
  }
  if ( event.target.id=='eToolConfButton')
  {
    if(document.getElementById('eToolCfImages').checked)
      GM_setValue('template', 1);
    else
      GM_setValue('template', 0);
    document.getElementById('eToolConfDiv').style.display = 'none';
  }
}, true);
//addEventListener("keyup", showToolConfig, false);

function showToolConfig(e)
{
  //if(e.keyCode != 51) return;
  var div =  document.getElementById('eToolConfDiv');
  if(div) div.style.display = 'block';
  else
  {
    div = document.createElement('div'); 
    div.setAttribute('id', 'eToolConfDiv');
    div.setAttribute('class', 'dynamic');
    div.setAttribute('style', 'z-index: 10; border: 1px solid #CB9B6B; background-color: #FDF7DD; width: 229px; height: 150px; position: absolute; float: center;top: ' + e.pageY + 'px; left: ' + e.pageX +'px');
    div.innerHTML = '<h3 class="header" style="padding-top: 8px; height: 20px; background-image: url(http://s3.ikariam.it/skin/layout/bg_sidebox_header.jpg)"><b>Config</b></h3>'; 
    div.innerHTML += '<div style="margin-left: 80px; margin-top: 20px; text-align: left">';
    
    if(tpl == 0) div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0" checked >&nbsp;Text<br/>';
    else div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0">&nbsp;Text<br/>';
    
    if(tpl == 1) div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1" checked >&nbsp;Images</div>';
    else div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1">&nbsp;Images</div>';
    
    //GM_log(div.innerHTML);
    div.innerHTML += '<input id="eToolConfButton" type="button" class="button" value="Save">';
    document.body.appendChild(div); 
  }
}

var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;

for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b> Points: <b>" + members[member_name] + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray("members", actualValues);

/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

//Returns an Associative Array of the members's points
//While doing that, it sets the online/inactive/offline status
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  for(i=1; i < membersTab.rows.length - 1; i++)
  {
    setOnlineStatus(membersTab.rows[i]);
    pName = membersTab.rows[i].cells[1].innerHTML;
	  pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(/,/g, "") * 1; //Force variable type
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>New Entry</font>)";
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>" + (act - prev) + "</font>)";
    }
  }
  if(update_record) saveArray("points", recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(domain + '.' + server + '.' + variable + ".2.8", str);
}

function setOnlineStatus(tRow)
{
  if(tRow.cells[0].getAttribute('class') == 'online')
  {
    template('online', tRow, null);
  }
  else if(tRow.cells[0].getAttribute('class') == 'offline')
  {
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    var lastOnline = tRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
    var lastDate = convertIkariamDate( lastOnline );

    if( lastDate < inactiveDate )
      template('inactive', tRow, lastOnline);
    else
      template('offline', tRow, lastOnline);
  }
}

function template(status, rowElement, lastOnline)
{
  if(status == 'online')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML="<div style='width: 8em'><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/On.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML="<B><font color='#008800'>ONLINE</FONT></B>";        
        break;
    }
  }
  else if(status == 'inactive')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left'>("+lastOnline + ")</span><span style='float: right'><img src='http://www.ikariamods.com/gunmetal/cadmium/hardcode/crown.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<B><font color='#708090' SIZE='1'>("+lastOnline + ")INACTIVE</FONT></B>";        
        break;
    }
  }
  else if(status == 'offline')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left;'>("+lastOnline+")</span><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/Off.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<font color='#F00' SIZE='1'>("+lastOnline+")OFFLINE</FONT>";
        break;
    }
  }
  rowElement.cells[0].style.backgroundImage = "none";
}





// ==UserScript==
// @name			Ikariam Upgrade Watcher
// ==/UserScript==



/******************************* Support for GreaseKit Start ********************************/
// 	This work-around functions to support GreaseKit is original created by
//	Jim Tuttle (http://userscripts.org/scripts/review/41441), hence his should have
//	the credit for the functions. Thanks to him.
//	I have fixed the GM_getValue to support for default value which was not in the original version.

if(typeof GM_getValue === "undefined") {
	GM_getValue = function(name, defaultValue){
		var nameEQ = escape("_greasekit" + name) + "=", ca = document.cookie.split(';');
		for (var i = 0, c; i < ca.length; i++) { 
			var c = ca[i]; 
			while (c.charAt(0) == ' ') c = c.substring(1, c.length); 
			if (c.indexOf(nameEQ) == 0) {
				var value = unescape(c.substring(nameEQ.length, c.length));
				//	alert(name + ": " + value);
				return value;
			}
		}
		if (defaultValue != null) {
			return defaultValue;
		} else {
			return null;	
		}
	};
}

if(typeof GM_setValue === "undefined") {
	GM_setValue = function( name, value, options ){ 
		options = (options || {}); 
		if ( options.expiresInOneYear ){ 
			var today = new Date(); 
			today.setFullYear(today.getFullYear()+1, today.getMonth, today.getDay()); 
			options.expires = today; 
		}
		var curCookie = escape("_greasekit" + name) + "=" + escape(value) + 
		((options.expires) ? "; expires=" + options.expires.toGMTString() : "") + 
		((options.path)    ? "; path="    + options.path : "") + 
		((options.domain)  ? "; domain="  + options.domain : "") + 
		((options.secure)  ? "; secure" : ""); 
		document.cookie = curCookie; 
	};
}
/******************************* Support for GreaseKit End **********************************/


// URL to icons
//var imgURL = "http://www.atdao.dk/public/images/";

var imgYes, imgNo, imgWait, imgUnknown, imgWood, imgWine, imgMarble, imgSulfur, imgCrystal, imgScrollLeft_1, imgScrollLeft_2, imgScrollRight_1, imgScrollRight_2, imgScrollMiddle_1, imgScrollMiddle_2;

imgYes				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjatJbdK0NhHMd/Oy5ES5oUF/I2skySaBx5acWNXCrhwkuGC+IPIS4w5Qopl3JDLbOMFZLQxAy5mPKStJQL5vddz7RwZrPjV989ned0Pt+z55zn9z2aQCBAESqVVcYqYWlZWWL+huVnHbEOWE9KAI2CQQqrhSXP7y5IGx47Pb48kvvWHTxpyDCQLllHDfp66qzoeOcpJ2uF9RyNQTHLMrE5mTi1NU1vgbdI/5ASNAk0WDNAw3VDr3xoZZ1EMjA7Lhyti/tLZDuzUSxlLjRTe3kb1ebXLvOh7SeDUlZ/43ST5H24pL9UXlourQ+sYclmWIeYk8IeZlf3Uu+f4ShcCwZYgvlp0DxmH0/i5aF4CwywwAwZ6PC2WJ2zpFYJlgw2DCpntq3Sb29LLAUWmGDjx+D0Okntcl25MBTBICOeB6tU53ceDJkw0GKXql2CqZXonwsGfvQVtUsw/TC4xQ5UuwrS9Rh8MHDLebLqBqYcE4ZTGOz1V1ve0RXVKrDABBsG9+jnFrlPNQPBwua6D71Fq6P1I6/cauOGgwEWmOHNDpE3h34ezwPHtWCAFYrRb4HDQRMMnFg7K+4ccA4excAJD54ebrmJ6IrRRCbWXCzLXChofgv9VBH6VeGhf+w7Dp40Zhq/hv6OCP2naL8qlD5bssX8dbSfLR8CDACURMy5Nc8LLAAAAABJRU5ErkJggg==";
imgWait				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH/SURBVHjatJbNSwJRFMWvg2DCGFKEComLCLIPMqIiWlW7qCSIiDYRLfof2rduGS0k2lS0CSvaVauQqEjpwyCCwkDDCkmhhNDuGd6EfahjTheOMG+c35l5b+aeZ8hms1SgrKw2VgtLZjnFeISVYp2xTlmJfABDHoNK1jCrx7/3JB2GkpRIvtNN5E05WeesIKvFSF2tFvL2VWd46IC1yXrRYtDEmln2P5hWtuOUyRR8QpIkA00M1tCk15bmw0XWRSGD/qPz5NjW/jMFgi9USnV7Kmmot4o6mi3rfLirjhtz/tPKGl1YjVIklqZSCzd0z9d1zFlG+fCRFVKeMGcxp2bnb6W/wNXCtWCAJZifBoNLGw9mnh4qt8AAC0zVoApvy9pOnPQqweoBGwadPCAVe1tKKbDABBs/7pPLFOldwbDCbICB/b6Mhc1Xd1GF6YCBjK9U7xJMWaJ/Lhik0Ff0LsFMwSBWazfpbuByKMwoDMLtjbLuBh63wryCwfH4QE0GXVG3eWcWmGBLojEd8IBuBoKFjHhU36LtqRFbmltt2XAwwAIzt9kh8nzo584yFhzXggGWGqM/Aof7uhI4pXZW3DngHDxfAue3yETwTHPLNaEraolMzLmYFp8aNMVC3ypCvzs39K/vXpWT9S7z99APiNBPaN1V5Nu2uNRepnXb8iHAALTTzrv1a76ZAAAAAElFTkSuQmCC";
imgNo				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH6SURBVHjatJa7S8NgFMVvo7UGiq9JBxGnWkTEwYoPXFzFRelc6VDp0H/A2X9B7FDoXHQRVxfxgQ8QEalOUhx0EFu10NZq6jkxkfpIjTZeOP1ISn43373kns9VqVSkRrRBQ9AA5IW6jftXUB46hY6hnBXAZZGgBZqBxouplFLe3pZKNivPFxf6n40+n7ja28U9MSHNwaCGWzvQOvRgJ0E/FCnE455CIiGiaVIzFEXUcFjUSKSEqzh0VivBVHl3N1haXZWnrS35TTRNTopnbk7cY2MpXG5+l2AQWrifnVVeMhn5SzT09Ejr2hq3vAKd6Busaub8Yyz2ZziDz5JBlsF8TzBdWF5WUR6pN8ggi0yzRB1Yl+4CAeXHhtoNNL7j4ICwRe4gUEwmnYMzwNKZYPPHX97fF6ejfHjIpY8JOutprGXDLy+5dDGBV8NX6nQYTK8i/xxMkFcwVxwHvzHzTHDDL9DpaOjt5XLNBGn3yIjjCdzDw1zOmeCoORTS+HE4Vx9FdCbYpN5ynquhkGN8g0WPuDVfe0ONRksYtfWXBgyyyKwedrS8BOd5PQ3ns2SQZdroF8OB0eiG89vJyjcnHMZjaTjVxhPGyPUUkkl7lomaG2VJmEbzk+m3GaY/+sH00+k30/f7P5v+nmH6ObunCqtji9mgjN1jy6sAAwD9Hc4TcS9VxQAAAABJRU5ErkJggg==";
imgUnknown			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHmSURBVHjatJYxT8JQFIUvXYgJGOJkQ0zDpoiIDCbGsWETSUjjbhz8MfwCBzcmQ0gQN9LRuBhERHQjjSE4MBBhYSne0zwIqMXW1pscmj5433m8tvc0MJlMaElFWHusHVaItSHG31gj1hPrgTWwAwRsDFZZx6zDWq0mNRoNGg6HZBiG9aWiKBQOhymVSlEmkzF56JZ1zfpwYrDNOi+Xy8FKpUKmaS77hyRJEuVyOcrn82M+vWA9LzNQm83mia7rVK/XyU2l02lSVZWSyeQVn+qzBcz9ZpelFYtF13AU5mAuGIK1YICLeVooFKRer0d/LcwFAyzBnBkclUqlFd4e8lpggAXm1GANd0u1WiW/SrAOwYbBPg9Iv90tbgosMMHGx1ar1SK/q91u47AJg3UvF9auut0uDjIMQnhK/S7BDEn0zwWDEfqK3yWYIxi8y7Lsu0E0GrWePRi8JBIJ3w3i8TgOrzC4z2azJrqib/vOLDDBBrWPfs4DvhkIFjKiP132jaZpY261nuFggAXmfLND5F2in3u54JgLBljTGP0WONzXrcBx21mxcsA5eBYC56fIRFicccsNois6iUzsudgWrPzRSehHROgfzId+p9OxvozFYl9D/06E/sDpW4Xda4sixg2nry2fAgwA7hjKmyGdaWoAAAAASUVORK5CYII=";
imgWood				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjadJJNSNNxGMc///lvrb3828q1FJ1MKHCjlF4ouihJB4O69HJO8FCX6NC5a0XdeoGgc5ZEkIJ1iBpJRQmh4jxs2pZzm5ub/jfHxl7s3/6/sbJgz+V5+fF9nu/z/T1S6ttTtlsur2rBuWcUkmX6zlxBsdolmpjhf+Ce1p2cPD2Mu8/F/Mt7yKai1gwsN4ItaUaTJJVSyS7yHbt2E4+pvB99wn5Ht3Zw4LzUdHIhr/7jDdUi6Vyte3aNdOQrQf+41nRy+MdPPN1dwjsdGULTUfxhCKQLuCy/6N+Y1JtonsER2jo9goWkC6bvtZ4u4R+7jd3RxoOJVVrym9y6uI+FUEowKJvstBtVEV+9+0iAZV2kaOgzxbWIYPB4NERLzd+84aOz18viizf4zFmShTowXZT/0rbYIrglM7R7ReG6IcaJ4UsE5mbJb2Q4erafpS9BvJWseM/EEiSiYU2nLusC5TYLVIpZjDYLkVhdMN/hXlLRJRSbGbPLyKvn66LedaiHwMP79Axd1mQd2Pgahayg1mioOPayHC+Ig1EcVqaiW0xOrOA2QeunMWSb9RSR8OvaJRlZnklyZ0rj2OyCYGGoWsnMR/n4ISwGDDqr4KwBFYiX7XW19R3evR1nerHCiqqxmkhx7VwHRwYO8N0f+lPv2HapF4aO81uAAQAil+gxsz59XAAAAABJRU5ErkJggg==";
imgWine				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHGSURBVHjaYnx1ag4DOtj38OT/vefPM4iJMjDoyhgy2MmaM7AwMTAiq2FhwAKWnFgGpr//YmH4wXSP4SfTKwZPBl8UNUzomv78Y/gvIAYx78OrPwxf3/1jePLwBYbhGBpBThJXYYbzv7z7z2Dy3Q9DIyOyH1+/+/B/3oTdDFsunmeQU2cFi7Ebf2CQ0YCwHQRCGZzkzRlRbARpOrnkIsOD128YfPQNGfK1/BkaLKIZXh3mhtt8X3YDOODgGs/fePk/KLGLQYyPlyHR3JxBW0SMYcO1ywzzTxxnUDaTAWsC+ffh5d8MZ37thngJFBi/TzwF2wJS/P7zNwYFURGGwzdvMrz4+JlhUpcbw+79dxnUrdihNn9g2M6w+T/L+w8fGNp372JINrdkuPrmFcPqU2cYJJ7xMpQ7u4MVXr59GEyDQpdbCOKzZ/+OIeJx6/VrYNpFUwtMq8tIMtx88pzhxrnX8MARkUaENrP8N56Gjz9+MJjJyzOEm5kwCLFzMtx+85ph/YULDOefPmGYlFPKoH5eg+EYwxkGMQVmhm+f/zNE/KuERAcoREGmgKJCVUWVwS/GACOJgQLwDOcmhndMtxmSuKsYAAIMAHIKugpSnTR5AAAAAElFTkSuQmCC";
imgMarble			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGoSURBVHjahFJdL8NgFH46XddtXZdN4yOWmBAXSCSEGy5dSvxB/8MdQUSQIBIuFqLD0q7ZlK5dt7a8+p6Jj2Tm3PT07Xue83xUsE63MahYqsAcYRRC4xLpdBrJISb8/C4OGg7fBCYWF1C/ucLxwQ1EgWFtuczKE8NfIIlBw5VmqteHXQQdH1G8fPe4Ar3WZP8CXOghtJExRP4LvJaLtufiLQZqOQ529mJGlzrrC8A111Fm2ZxCW4/2D8D7jc2tWH+PeRAE+JMBN0yWZahqHr7fQUbJYW5xhdhIchrFQv7X/b4SnBcbRq0Wuy7Tdi6jeneL6r1OIJqm4cF4JS/6AvDNk9MzKE3Nkn5ejboJv+1BkmRksgqdnVw9fcdIkZXWKbJ8oUAyLOORgNqdEE37FS3Xg+vYcD2fZorDxR7Ac6CwIbWETjxwdrgLMSnCcVyiOr+0Cnl8HO9Rl4YMo46cqpKR/E6Cbw4lDRk5iYZlovvpcBQGeKjquD4/JU8SYu+f4DLEpEQ9jzZhhiP0YpoWPXnOPL5ULIEXpyxEPlzbQk7J0pndbHz59SHAAPFG0oxdJVVKAAAAAElFTkSuQmCC";
imgSulfur			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVHjajJJNaxNRFIafGZNp08zEJE3EaFOTCNFaRFqUggURddWFKC5cCP4H8V+4cVNc6cK6caMuBEGQaoVGLA1aJVosbZqONmnMh81kMu1UM85MQYrU4IELF877de49QnnmLp3KK723PmRyDJy8JuzWFzuSg6LVNosMnx1hLjtltdtb1n8L+A8mLYkiohRDbxyiNxrk47sMf4vsKuCAjPIL2FpCil7GaL1lLf+K0sJLHtwZ75wgfPyKpcTT7BE0TO8oPitDfypKS9NpapvIXWXu3bpp3R+/bf0zQXXxKR5JRtkrYKwvs6HXiCfDyEoXP+omp88NUy8v83VlzvojIHp9luP+bfo6oUg3tdUc048maAtR8vN5egIBhkbTLtbn07h0dYDnDye2Ezjk4NExNPUJ4QOD/DSbzL7OkUjLmM0F1KXvtBoNO5Gfvn4FNV9zTzAkIe4kO69eKZWYfPyMUxcuumKLuYI7f7Wyibauc2ZsiC+fqrSaJqrawuPbtx/1zQ032sq8DdYrHDmRwN+tUvhcd53KRQ3ZJvT4I8TiEuljvWRn1kimDiO632VXvaZgCn0Mjpy3QSGaDdON7Tg5FYmFXHGnHANF9rh3YecqO/+vKLP2CqYw9ASGsbq9kaLszCo4fX+gQL2yQaX8i+zkFL8FGABBCeG3MCTxbAAAAABJRU5ErkJggg==";
imgCrystal			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVHjabFLPTxNREP62u12WbdfSLiVSa1OgGIEABWMImiByENFoAvwBXLh68MK/4cmb8Wi4kXA0Bi7EH5Sfxq5GGzCSIpTYlO12a9utD3aq1Y2dy8y8N9+bb755XGb9GRrZT+ZmCWEY160tSFyFa1QjNDp8uhdix3wQ0VAL0uId3JC+skgx+d8Drkbg7SxPvlCuwixb+PgritWMh9lsHODPeYktcvfZ88okS5bb6wVKE49iqUxFacPCk2UNb05EJ+10kYcpWZS84waQ9cnn0QblplVrlNLek7/UXHXS1gwfbnW1UiKLAr78MCFIMpjohSxweL2r4UPiLSYnRuGPz+Jf6q5e7ykuuIFuVab5bOtq9ZA/KZSQ2VmjONYzBL3i1IazVzW/cZndi3cipTM0N4lI7h9g+loMS5sp9Mt5DMRHsJw8JMCjKwb+KE9qDwWqePnpCBFVqYu0+z2PQFXH3fHbuBqUEQkotf17onXqLjt40OcnqmLFwGC7gottbUT58cxETSivG2MdKhbGY3ih6bA/D4G/GTxe6WGoahAre7nafs+7P+wLUZw4yDnmtO92dOXvzHNLBuu4OYWwWMJYLAi/r4W6LW7uY7AzjMOcCfP3OIWCgaxRpLozAQYAw+q/LLa8YygAAAAASUVORK5CYII=";
imgScrollLeft_1		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAuCAYAAAAcEfjaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEPSURBVHjaYmQAgtZg8/8g+tMPFobP738wTDt2lpEBB2BC4f37z0AIMP55svP/h6NNDOeOXGfYe/YHg6oMC4O9IRfDvK1fGIx1VRjExf8yKOoqMwjwczCwcTEBbfjzA6jvPwPjf2aG/yD8j5GBiZkJjw2fn/z/8fIMw6OLRxke3brLICbJyCAkwcFw7DgLg5axIQM/PyODoIotAycHDwMzOwsDEwOJYFTDqIZRDaMaRjWMahiuGlgY3p5n+HG2i+HxwTsMu85+BdfTzsYcDJf3fmVge3URXE+zvtnPwAKspxnB9TTDP1Dty8DM8o+BnZURiP8zMDPiaQnsnl34/9SOYwxEtzVcU/sZSWlrAAQYAKhSVaS8GpLcAAAAAElFTkSuQmCC";
imgScrollRight_1	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAuCAYAAAAcEfjaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVHjaYmTAA1qDzf+D6E8/WBg+v//BMO3YWUYmBmLAv/9wJuOvY1Fg3q9v/xg+fPwBFry69xiDc9Vihg9HmxjOHbnOsPfsDwZVGRYGe0MuBtw2/AFp/s/A+J+Z4T8I/2NkYGJmYmD88+Ue2Ia/P/8wfP/xBaz2y9MbDBKadgw/Xp5heHTxKMOjW3cZxCQZGYQkOBiI8wMSGNUwqmFUw6iGUQ2jGoarBpZ/l2rAjN/AevoLUj0tUTaX4cfZLobHB+8w7Dr7FVxPOxvjrUX/gep9BmaWfwzsrIxA/J+BmREkQuu2BkCAAQA7Pl6Fy9SDcAAAAABJRU5ErkJggg==";
imgScrollMiddle_1	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAYAAADp73NqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAmSURBVHjaYvj//z8DA5j4dSzqPxMDCPz5cg/CGooEkj/gfgMIMAB2KxZChMiVfwAAAABJRU5ErkJggg==";
imgScrollLeft_2		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABmCAYAAAD/GnDbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEgSURBVHja7Ni9SgNREIbhd3ZPkjUIqxZGwUaMjZAibGElFuIVeA1egLcg2NjY2QjeheAPQQQTQVwlWAREm5hGURRjYIu4x802YhGNlc18MByGw8P0n5BkY2Xe9t63yNB+idiuhUKfON+22PJbpNs6sK/VdS5PG1TCiNkpw2I5z+7eO0GpSKHwwXRphhHfI5t3kgvdKHEWsS62N7HguM4PF9otGz1c0KxXad7cMT4pjE141M4Mc0EZ3xdGiwsMecO4OYPDH6NAgQIFChQoUKBAgQIFChQoUKDg/4Dh+Yoo3OT+5JbDsJP2S0uBx3WlQ/axnvZLmadjjO8hab9EnDjBNTG5jCRjcaX/BTnaWbPn+7V0GagjW17d+vocoCP7FGAAffVWFCyKGPAAAAAASUVORK5CYII=";
imgScrollRight_2	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABmCAYAAAD/GnDbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEBSURBVHja7Ni/agJBEAbwb+5OIpYpwgm2KVJKinRJ4SOky4NYBCvBxgews8pbCBaBeJUXSCAkhGhhsLDy32k25tzV2yLY5LAQ0nwDw84O+2PYdgQpUbu+MMk5Ux7mY4VGEIqDfUKb31JWwY29rZYak6myzZd2gNLtHSadKh4fXtEOFU4LHq6KOfw9IU6wgRgXJkktcFwHEkd9O2H9HeNLRfZtNHyDf3YJNepi8NTB4L2Hk7zg2M9ivz/sBAEBAQEBAQEBAQEBAQEBAQHB/wFPP1ds8bPUiHb2S365CRXW8Xn/gVa4sPul0nnq9kdvU+B6GkcZ2aaBK0knJQ6yI9sIMADZCV71Yy13bQAAAABJRU5ErkJggg==";
imgScrollMiddle_2	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABmCAYAAAAK5PtrAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAtSURBVHjaYv7//z8DEwMQMP0+Hv0fzGL48+UehDVKDB+C4dexKGj8wuMcIMAAUqQQxLAX0V0AAAAASUVORK5CYII=";


// Server host and hostname
var host = top.location.host;
var hostname = top.location.hostname.split(".");

// Game version
var version = GM_getValue(host + "_iuw_version", '');

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
	
	// gets the game version
	getGameVersion();
	
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
		
		// gets the game version
		getGameVersion();
		
	}
	
	// Getting the list of buildings
	var buildingList = document.getElementById('locations');
	
	// If we find a list of buildings, then we start adding icon to each building
	if (buildingList) {
				
		// Ressource variables
		var wood, wine, marble, crystal, sulfur;
	
		// Get the resources we have in town
		if (document.getElementById('value_wood')) {
			wood = document.getElementById('value_wood').textContent.replace(",","");
			wood = wood.replace(".","");
		}
		if (document.getElementById('value_wine')) {
			wine = document.getElementById('value_wine').textContent.replace(",","");
			wine = wine.replace(".","");
		}
		if (document.getElementById('value_marble')) {
			marble = document.getElementById('value_marble').textContent.replace(",","");
			marble = marble.replace(".","");
		}
		if (document.getElementById('value_crystal')) {
			crystal = document.getElementById('value_crystal').textContent.replace(",","");
			crystal = crystal.replace(".","");
		}
		if (document.getElementById('value_sulfur')) {
			sulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			sulfur = sulfur.replace(".","");
		}
	
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
					
					if (buildingType == 'palace' || buildingType == 'palaceColony') {
						// positioning of the info box for palace/colony is different than other
						posInfoTop = POSITIONS['constructionSite'][2]["y"];
						posInfoLeft = POSITIONS['constructionSite'][2]["x"];
					} else {
						posInfoTop = POSITIONS['constructionSite'][1]["y"];
						posInfoLeft = POSITIONS['constructionSite'][1]["x"];
					}
					
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
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * (redAll + redMarble - 1));
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * (redAll + redWine - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * (redAll + redSulfur - 1));
							}
							
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
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * (redAll + redMarble - 1));
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * (redAll + redWine - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * (redAll + redSulfur - 1));
							}
							
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
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
							}
							
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
					
					case 'temple':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
							}
							
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
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * (redAll + redMarble - 1));
							}
															
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
	var newImg = '';
	
	// no.png = red
	// yes.png = green
	// wait.png = blue
	// unknown.png = grey
	
	switch (img) {
		case 'yes':
			newImg = imgYes;
			break;
			
		case 'no':
			newImg = imgNo;
			break;
			
		case 'wait':
			newImg = imgWait;
			break;
			
		case 'unknown':
			newImg = imgUnknown;
			break;
			
		default:
			newImg = imgNo;
			break;
	}
	
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + newImg + '\');">'+ level +'</div>';
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
	div.style.backgroundImage = "url('" + imgScrollMiddle_2 + "')";
	div.style.height = "102px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) {
			curWood = document.getElementById('value_wood').textContent.replace(",","");
			curWood = curWood.replace(".","");
		}
		if (document.getElementById('value_wine')) {
			curWine = document.getElementById('value_wine').textContent.replace(",","");
			curWine = curWine.replace(".","");
		}
		if (document.getElementById('value_marble')) {
			curMarble = document.getElementById('value_marble').textContent.replace(",","");
			curMarble = curMarble.replace(".","");
		}
		if (document.getElementById('value_crystal')) {
			curCrystal = document.getElementById('value_crystal').textContent.replace(",","");
			curCrystal = curCrystal.replace(".","");
		}
		if (document.getElementById('value_sulfur')) {
			curSulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			curSulfur = curSulfur.replace(".","");
		}
		
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
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_2 + '\'); height: 102px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWood + '" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWine + '" /> '+ estWine +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgMarble + '" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgCrystal + '" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgSulfur + '" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_2 + '\'); height: 102px; float: left;"></div>';
		
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
	var newImg = '';
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgScrollMiddle_1 + "')";
	div.style.height = "46px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
		
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) {
			curWood = document.getElementById('value_wood').textContent.replace(",","");
			curWood = curWood.replace(".","");
		}		
		// Estimating the wood status
		estWood = curWood - resWood;
		
		// In order to re-use this function, there is a crystal check
		if (isCrystal) {
	
			if (document.getElementById('value_crystal')) {
				curRes2 = document.getElementById('value_crystal').textContent.replace(",","");
				curRes2 = curRes2.replace(".","");
			}
			
			resIcon2 = "glass";
			newImg = imgCrystal;
		
		} else {
		
			if (document.getElementById('value_marble')) {
				curRes2 = document.getElementById('value_marble').textContent.replace(",","");
				curRes2 = curRes2.replace(".","");
			}
			
			resIcon2 = "marble";
			newImg = imgMarble;
		}
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_1 +'\'); height: 46px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWood + '" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + newImg + '" /> '+ estRes2 +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_1 +'\'); height: 46px; float: left;"></div>';
		
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

/**
 * Get server game version
 * @return string
 */
function getGameVersion() {
	var toolbar = document.getElementById('GF_toolbar');
	var li =	toolbar.getElementsByTagName('li');

	for (var i = 0; i < li.length; i++) {
		if (li[i].className == 'version') {
			
			var tmp = li[i].getElementsByTagName('span')[0];
			GM_setValue(host + "_iuw_version", tmp.innerHTML);
			version = tmp.innerHTML;
			
			break;
		}
	}
	
}

//---------------------------- IMAGES ------------------------------//


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
			{ "x" : 26, "y" : 12 },
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
		
		// temple
		"temple" : [
			{ "x" : 26, "y" : 50 },
			{ "x" : -8, "y" : 3 },
		],
		
		// construction spot
		"constructionSite" : [
			{ "x" : 45, "y" : 59 },
			{ "x" : 18, "y" : 15 },
			{ "x" : 18, "y" : -40 },	// special for colony and palace
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
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 },	// level 10
			{ "wood" : 5230287, "wine" : 1233946, "marble" : 1591666, "crystal" : 1167487, "sulfur" : 1584248 },	// level 11
			{ "wood" : 10464974, "wine" : 2869957, "marble" : 3185009, "crystal" : 2715112, "sulfur" : 3688421 },	// level 12
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
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 },	// level 10
			{ "wood" : 5230287, "wine" : 1233946, "marble" : 1591666, "crystal" : 1167487, "sulfur" : 1584248 },	// level 11
			{ "wood" : 10464974, "wine" : 2869957, "marble" : 3185009, "crystal" : 2715112, "sulfur" : 3688421 },	// level 12
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
			{ "wood" : 243929, "crystal" : 408877 },		// level 25
			{ "wood" : 317207, "crystal" : 552140 },		// level 26
		],
		
		// temple, wood, crystal 
		"temple" : [
			{ "wood" : 228, "crystal" : 190 },
			{ "wood" : 333, "crystal" : 290 },
			{ "wood" : 465, "crystal" : 423 },
			{ "wood" : 598, "crystal" : 567 },
			{ "wood" : 760, "crystal" : 752 },
			{ "wood" : 958, "crystal" : 989 },
			{ "wood" : 1197, "crystal" : 1290 },	// level 8
			{ "wood" : 1432, "crystal" : 1610 },
			{ "wood" : 1773, "crystal" : 2080 },
			{ "wood" : 2112, "crystal" : 2586 },
			{ "wood" : 2512, "crystal" : 3210 },
			{ "wood" : 3082, "crystal" : 4109 },
			{ "wood" : 3655, "crystal" : 5084 },
			{ "wood" : 4458, "crystal" : 6471 },
			{ "wood" : 5126, "crystal" : 7765 },
			{ "wood" : 6232, "crystal" : 9850 },
			{ "wood" : 7167, "crystal" : 11821 },	// level 18
			{ "wood" : 8687, "crystal" : 14952 },
			{ "wood" : 10247, "crystal" : 18402 },
			{ "wood" : 11784, "crystal" : 22082 },
			{ "wood" : 14228, "crystal" : 27824 },
			{ "wood" : 16752, "crystal" : 34183 },
			{ "wood" : 19265, "crystal" : 41020 },
			{ "wood" : 23156, "crystal" : 51514 },
			{ "wood" : 26663, "crystal" : 61817 },
			{ "wood" : 32026, "crystal" : 77477 },
			{ "wood" : 36830, "crystal" : 92972 },
			{ "wood" : 43256, "crystal" : 113941 },	// level 29
				
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
			{ "wood" : 314902, "marble" : 515592 },	// level 29
			{ "wood" : 387655, "marble" : 666227 },
			{ "wood" : 471194, "marble" : 850031 },
			{ "wood" : 572580, "marble" : 1084292 },
			{ "wood" : 695615, "marble" : 1382826 },	// level 33
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
			{ "wood" : 7008, "marble" : 2613 },
			{ "wood" : 8108, "marble" : 3078 },
			{ "wood" : 9363, "marble" : 3617 },
			{ "wood" : 10793, "marble" : 4243 },
			{ "wood" : 12423, "marble" : 4968 },	// level 21
			{ "wood" : 14282, "marble" : 5810 },
			{ "wood" : 16401, "marble" : 6785 },
			{ "wood" : 18815, "marble" : 7919 },
			{ "wood" : 21570, "marble" : 9233 },
			{ "wood" : 24709, "marble" : 10758 },
			{ "wood" : 28288, "marble" : 12526 },
			{ "wood" : 32368, "marble" : 14577 },
			{ "wood" : 37019, "marble" : 16956 },
			{ "wood" : 42321, "marble" : 19716 },
			{ "wood" : 48365, "marble" : 22917 },
			{ "wood" : 55255, "marble" : 26631 }	// level 32
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
			{ "wood" : 350387, "marble" : 370605 },	// level 32
			{ "wood" : 420689, "marble" : 444998 },
			{ "wood" : 505049, "marble" : 534270 },	// level 34
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
			{ "wood" : 3485, "marble" : 3070 },
			{ "wood" : 4459, "marble" : 3941 },
			{ "wood" : 5688, "marble" : 5037 },
			{ "wood" : 7238, "marble" : 6420 },
			{ "wood" : 9190, "marble" : 8161 },
			{ "wood" : 11648, "marble" : 10354 },
			{ "wood" : 14746, "marble" : 13118 },	// level 17
			{ "wood" : 18650, "marble" : 16601 },
			{ "wood" : 23568, "marble" : 20989 },
			{ "wood" : 29765, "marble" : 26517 },
			{ "wood" : 37573, "marble" : 33484 },
			{ "wood" : 47412, "marble" : 42261 },
			{ "wood" : 59808, "marble" : 53321 },
			{ "wood" : 75428, "marble" : 67256 },
			{ "wood" : 95108, "marble" : 84814 },	// level 25
			{ "wood" : 119906, "marble" : 106938 },
			{ "wood" : 151151, "marble" : 134814 },
			{ "wood" : 190520, "marble" : 169937 },
			{ "wood" : 240124, "marble" : 214192 },
			{ "wood" : 302626, "marble" : 269954 },
			{ "wood" : 381378, "marble" : 340214 },
			{ "wood" : 480605, "marble" : 428741 },	// level 32
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
			{ "wood" : 94250, "marble" : 85042 },	// level 27
			{ "wood" : 130776, "marble" : 122156 },
			{ "wood" : 159019, "marble" : 153753 },
			{ "wood" : 193936, "marble" : 194088 },
			{ "wood" : 235848, "marble" : 244300 },
			{ "wood" : 286513, "marble" : 307173 },
			//{ "wood" : 0, "marble" : 0 },			// missing
			//{ "wood" : 423990, "marble" : 486969 },	// level 34
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
			{ "wood" : 122021, "marble" : 67485 },	// level 21
			{ "wood" : 158740, "marble" : 87835 },
			{ "wood" : 206471, "marble" : 114290 },
			{ "wood" : 268524, "marble" : 148680 },
			{ "wood" : 349194, "marble" : 193389 },
			{ "wood" : 454063, "marble" : 251512 },	// level 26
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
			{ "wood" : 44766, "marble" : 28481 },
			{ "wood" : 51166, "marble" : 33095 },
			{ "wood" : 58462, "marble" : 38447 },	// level 31
			{ "wood" : 66778, "marble" : 44656 },	// level 32
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
			{ "wood" : 160157, "marble" : 91013 },	// level 22
			{ "wood" : 192360, "marble" : 109337 },
			{ "wood" : 250172, "marble" : 142266 },
			{ "wood" : 325258, "marble" : 185046 },
			{ "wood" : 422862, "marble" : 240663 },	// level 26
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
			{ "wood" : 47277, "marble" : 32054 },	// level 25
			{ "wood" : 58676, "marble" : 39957 },
			{ "wood" : 72812, "marble" : 49757 },
			{ "wood" : 90341, "marble" : 61909 },
			{ "wood" : 112076, "marble" : 76977 },
			{ "wood" : 139028, "marble" : 95661 },
			{ "wood" : 172448, "marble" : 118830 },	// level 31
			{ "wood" : 213889, "marble" : 147560 },
			{ "wood" : 265276, "marble" : 183185 },
			{ "wood" : 328996, "marble" : 227359 },
			{ "wood" : 408008, "marble" : 282136 },
			{ "wood" : 505984, "marble" : 350059 },	// level 36
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
			{ "wood" : 268524, "marble" : 148680 },	// level 24
			{ "wood" : 349193, "marble" : 193389 },	// level 25
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
			{ "wood" : 4736, "marble" : 4834 },
			{ "wood" : 5485, "marble" : 5662 },		// level 18
			{ "wood" : 6346, "marble" : 6623 },
			{ "wood" : 7338, "marble" : 7738 },
			{ "wood" : 8478, "marble" : 9032 },
			{ "wood" : 9790, "marble" : 10534 },
			{ "wood" : 11297, "marble" : 12275 },	// level 23
			{ "wood" : 13030, "marble" : 13355 },
			{ "wood" : 14990, "marble" : 16636 },
			{ "wood" : 17317, "marble" : 19354 },
			{ "wood" : 19954, "marble" : 22507 },
			{ "wood" : 22986, "marble" : 26163 },	// level 28
			{ "wood" : 26472, "marble" : 30404 },
			{ "wood" : 30484, "marble" : 35325 },
			{ "wood" : 35096, "marble" : 41033 },
			{ "wood" : 40398, "marble" : 47652 },	// level 32
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
			{ "wood" : 122021, "marble" : 67485 },	// level 21
			{ "wood" : 158740, "marble" : 87835 },
			{ "wood" : 206471, "marble" : 114290 },
			{ "wood" : 268524, "marble" : 148680 },
			{ "wood" : 349194, "marble" : 193389 },
			{ "wood" : 454063, "marble" : 251512 },	// level 26
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
			{ "wood" : 247577, "marble" : 245231 },	// level 34
			{ "wood" : 297193, "marble" : 318801 },
			{ "wood" : 356732, "marble" : 414441 },
			{ "wood" : 428179, "marble" : 538774 },
			{ "wood" : 513916, "marble" : 700406 },
			{ "wood" : 616800, "marble" : 910528 },
			{ "wood" : 740261, "marble" : 1183686 },	// level 40
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
			{ "wood" : 122021, "marble" : 67485 },	// level 21
			{ "wood" : 158740, "marble" : 87835 },
			{ "wood" : 206471, "marble" : 114290 },
			{ "wood" : 268524, "marble" : 148680 },
			{ "wood" : 349194, "marble" : 193389 },
			{ "wood" : 454063, "marble" : 251512 },	// level 26
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
			{ "wood" : 47283, "marble" : 28503 },
			{ "wood" : 59806, "marble" : 36051 },
			{ "wood" : 75446, "marble" : 45481 },	// level 21
			{ "wood" : 94954, "marble" : 57240 },
			{ "wood" : 119244, "marble" : 71883 },
			{ "wood" : 149453, "marble" : 90092 },
			{ "wood" : 186977, "marble" : 112712 },	// level 25
		]
	};
}