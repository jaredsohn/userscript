// ==UserScript==
// @name           Ikariam Search
// @include        http://s*.ikariam.*/*?*
// @include        http://s*.ikariam.*/
// @include        http://s*.ikariam.*/index.php
// @include        http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch
// @include        http://s*.ikariam.*
// @exclude        http://support.ikariam.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @require        http://buzzy.260mb.com/Ikariam/BD.js
// @require        http://buzzy.260mb.com/Ikariam/Idioma.js
// @require        http://buzzy.260mb.com/Ikariam/Lista.js
// @require        http://buzzy.260mb.com/Ikariam/Imagenes.js
// @require        http://buzzy.260mb.com/Ikariam/InfoCiudades.js
// ==/UserScript==

ScriptUpdater.check(60601, "0.12");

Config.prefix = document.domain;
Config.scriptName = '';
Config.settings = {
	"Iconos de Busqueda":{
		html:'<p>Seleccione los sitios en que le gustaría ver los iconos de búsqueda.</p>',
		fields:{
			
			searchIconCrumbNavs:{
				type:'checkbox',
				label:'Crumb Navigation',
				text:'mostrar icono catalejos.',
				value:true,
			},

			searchIconIslandPlayer:{
				type:'checkbox',
				label:'Jugador de Isla',
				text:'el nombre de jugador en la isla ve cuando una ciudad es seleccionada',
				value:true,
			},
			searchIconIslandAlly:{
				type:'checkbox',
				label:' Isla de Alianza',
				text:'el nombre de alianza en la isla se ve cuando una ciudad es seleccionada',
				value:true,
			},
			searchIconInbox:{
				type:'checkbox',
				label:'Bandeja Entrada',
				text:'al lado del remitente de la bandeja de entrada <a href="/index.php?view=diplomacyAdvisor">inbox</a>',
				value:true,
			},
			searchIconOutboxbox:{
				type:'checkbox',
				label:'Bandeja Salida',
				text:'al lado del remitente de la bandeja de salida <a href="/index.php?view=diplomacyAdvisorOutBox">outbox</a>',
				value:true,
			},
			searchIconTreaties:{
				type:'checkbox',
				label:'Museo',
				text:'al lado del remitente del museo <a href="/index.php?view=diplomacyAdvisorTreaty">treaty overview</a>',
				value:true,
			}			
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



IkaTools.init();

var IkaSearch = {
	init:function() {
		var startTime = new Date();
		if(document.location.toString().match(/ika-world/)) {
			IkaSearch.handleIkaWorld();	
		} else {
			IkaTools.addOptionsLink("Buscar");
			GM_addStyle('.ikaSearchIcon { opacity:.3; } .ikaSearchIcon:hover { opacity:1; }');
			
			unsafeWindow.IkaSearch = IkaSearch;
			var div = document.createElement('div');
			div.innerHTML = IkaSearch.formHtml;
			$('#mainview').append(div);
			var buttonClose = document.createElement('div');
			buttonClose.innerHTML = 'cerrar ventana';
			buttonClose.id = "ikaSearchButtonClose";
			buttonClose.setAttribute('style', 'display:none; position:absolute; top:0; padding-right:17px; right:0; background-color:#fff; padding:.5em 1em; font-weight:bold; z-index:25000; cursor:pointer; border:1px solid #563C2F; border-width:0 0 1px 1px;');
			buttonClose.addEventListener('click', IkaSearch.hideAll, false);
			$('#mainview').append(buttonClose);
			if(typeof(IkaSearch.views[IkaTools.getView()]) == 'function')
				IkaSearch.views[IkaTools.getView()]();
			var spn = document.createElement('div');
			spn.setAttribute('style', 'width:100px; float:right; text-align:right; margin-top:-2px; margin-right:25px;');
			// add world icon 
			var imgWorld = document.createElement('img');
			imgWorld.setAttribute('style', 'padding:5px; cursor:pointer;');
			imgWorld.title = 'Vista del Mapamundi';
			imgWorld.src = IkaSearch.icons.world;
			imgWorld.addEventListener('click', function() { IkaSearch.showWorld();  }, false);
			spn.appendChild(imgWorld);
			// add search icon to crumb nav
			if(Config.get('searchIconCrumbNavs')) {
				var img = document.createElement('img');
				img.setAttribute('style', 'padding:5px; cursor:pointer; margin-top:-3px;');
				img.title = 'Abrir ventana de busqueda';
				img.src = IkaSearch.icons.magnifier;
				img.addEventListener('click', function() { IkaSearch.showForm(); }, false);
				spn.appendChild(img);
			}
			$('#breadcrumbs h3:first-child').before(spn);
			// create search results
			if($('#ikaSearchResults').size() == 0) {
				var resultBox = document.createElement('iframe');
				resultBox.name = "ikaSearchResults";
				resultBox.id = "ikaSearchResults";
				resultBox.src = "";
				resultBox.setAttribute('style', 'position:absolute; top:0; left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none; ');
				$('#mainview')[0].style.position = 'relative';
				$('#mainview').append(resultBox);
			}
		}
		if(Config.get('debugMode')) {
			IkaTools.config.debugMode = true;
			var endTime = new Date();
			IkaTools.debug('Search: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
		}
	},
	drawWorldOverview:function() {
		var div = document.createElement('div');
			div.id = 'ikaSearchWorldWrapper';
			div.innerHTML = 'hello world';
			div.setAttribute('style', 'display:none; height:700px; position:absolute; top:0; background-color:#83C3FF; left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;');
		$('#mainview').append(div);
		IkaSearch.worldWrapper = div;
		// search box
		var infoBox = document.createElement('div');
			infoBox.className = 'dynamic';
			infoBox.id = 'ikaSearchInfoBox';
			var html = '<h3 class="header">Busqueda en Mapamundi</h3><div class="content" style="padding:.5em 1em;">\
							<p style="padding-left:.8em;">Jugador: <input tyle="text" style="width:100px;" id="ikaSearchPlayerName"/></p>\
							<p>Alianza: <input tyle="text" style="width:100px;" id="ikaSearchAlliance"/></p>\
							<p style="text-align:center;"><input id="ikaSearchWorldSubmit" value="Buscar" class="button" style="width:75px; display:inline;"/></p>\
						</div><div class="footer"/>';
			infoBox.innerHTML = html;
		$('#breadcrumbs').after(infoBox);
		$('#ikaSearchPlayerName')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchAlliance')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldSubmit')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldSubmit')[0].addEventListener('click', IkaSearch.performWorldSearch, false);
		
		// load map data
		GM_xmlhttpRequest({method:"GET", url:"http://" + document.domain + "/index.php?action=WorldMap&function=getJSONArea&x_min=1&x_max=100&y_min=1&y_max=100",
		  headers:{
			"Accept":"text/txt",
			},
		  onload:function(details) {
			var islands = unsafeWindow.JSON.parse(details.responseText).data;
			islands.getByCoords = function(x, y) {
				return (typeof(this[x]) != 'undefined' && typeof(this[x][y]) != 'undefined') ? this[x][y] : false;
			}				
			// figure out where your cities are
			var ownIslands = {};
			var cities = IkaTools.getCities();
			for(var i = 0; i < cities.length; i++) {
				var islandId = IkaTools.cityGetIslandId(cities[i]);
				if(islandId)
					ownIslands[islandId] = true;
			}
			var table = document.createElement('table');
			table.id = 'ikaSearchWorldTable';
			table.setAttribute('style', 'width:700px; margin:auto; margin-top:25px;');
			table.border = 1;
			table.cellPadding = 0; 
			table.cellSpacing = 0;
			var html = '';
			for(var y = 1; y <= 100; y++) {
				html += '<tr>';
					for(var x = 1; x <= 100; x++) {
						var island = islands.getByCoords(x, y);
						if(island) {
							document.title = (island[2]);
							switch(island[2]) {
								case '1': var type = 'Wine'; break;
								case '2': var type = 'Marble'; break;
								case '3': var type = 'Crystal'; break;
								case '4': var type = 'Sulphur'; break;
							}
						}
						html += '<td id="ikaSearchIsland_' + island[0] + '" ' + 
									(island ? 'title="' + island[1] + ' [' + x + ',' + y + '] - ' + type + ' (' + island[7] + (island[7] == 1 ? ' city' : ' cities') + ')"' : '') +
									' class="' + (island ? 'island' : '') + (typeof(ownIslands[island[0]]) != 'undefined' ? ' own' : '') + '" '+
									'onclick="document.location = \'http://' + document.domain + '/index.php?view=island&id=' + island[0] + '\'"></td>';
					}
				html += '</tr>';
			}
			table.innerHTML = html;
			IkaSearch.worldWrapper.appendChild(table);	
			
		  }
		});
	},
	setServer:function() {
		var serverDomain = document.domain.toString().replace(/^s\d+\./, '');
		var server = parseInt(document.domain.match(/s(\d+)\./)[1]);
		$('#ikaSearchSelectServer option').each(function(i) {
			if(this.innerHTML == serverDomain)
				this.selected = true;
		});
		$('#ikaSearchServer')[0].selectedIndex = server - 1;
	},
	worldSearchKeyUp:function(e) {
		if(e.keyCode == 13) IkaSearch.performWorldSearch();
	},
	resetSearch:function() {
		$('#ikaSearchForm input').each(function() { this.value = ''; });
	},
	performSearch:function() {
		document.location = "#";
		IkaSearch.setServer();
		$('#ikaSearchForm')[0].submit();
		$('#ikaSearchButtonClose')[0].style.display = 'block';
		IkaSearch.showResults();
	},
	performWorldSearch:function() {
		try { $('#ikaSearchWorldSubmit')[0].blur(); } catch(e) { }
		$('#ikaSearchWorldWrapper td.island').each(function(i) {
			if(this.className == 'island')
				this.style.backgroundColor = '#967647';
			else if(this.className.match(/own/))
				this.style.backgroundColor = '#0000CC';
		});
		var data = 'land=en&welt=2&spieler=' + $('#ikaSearchPlayerName')[0].value + '&allianz=' + $('#ikaSearchAlliance')[0].value;
		IkaTools.getRemoteDocument('http://ika-world.com/search.php?view=suche_stadt', function(result) {
			try { var numPages = parseInt($('form', result)[0].innerHTML.match(/from\s+(\d+)\s+pages/)[1]); } catch(e) { var numPages = 1; }
			if(typeof($('table', result)[1]) != 'undefined') {
				$('tr', $('table', result)[1]).each(function(i) {
					try { var islId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var islId = false; }
					if(islId) {
						try { $('#ikaSearchIsland_' + islId)[0].style.backgroundColor = "red"; } catch(e) {}
					}
				});
			}
			// draw additional pages
			for(var i = 2; i < 20 && i <= numPages; i++) {
				IkaSearch.getNextResultPage(i);
			}
		}, 'POST', data);
	},
	getNextResultPage:function(pageNum) {
		var data = 'land=en&welt=2&spieler=' + $('#ikaSearchPlayerName')[0].value + '&allianz=' + $('#ikaSearchAlliance')[0].value + '&seite=' + pageNum;
		IkaTools.getRemoteDocument('http://ika-world.com/search.php?view=suche_stadt', function(result) {
			if(typeof($('table', result)[1]) != 'undefined') {																					
				$('tr', $('table', result)[1]).each(function(i) {
					try { var islId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var islId = false; }
					if(islId) {
						$('#ikaSearchIsland_' + islId)[0].style.backgroundColor = "red";
					}
				});
			}
		}, 'POST', data);
	},
	handleIkaWorld:function() {
		$('script').attr('src', '');
		GM_addStyle('\
			#navi, #header, #header-navi, forum table:first-child, input.submit { display:none; }\
			#main { width:600px !important; margin:40px 0 0 0 !important; }\
			script + div { display:none !important; }\
			td, th { padding-left:2px !important; padding-right:2px !important; }\
			table { width:650px !important; }\
		');
		$('table').attr('cellspacing', '0');
		$('form table:first-child')[0].style.display = 'none';
		$('script').each(function(i) {
			if(this.src.match(/bin-layer/))
				this.nextElementSibling.style.display = "none";
		});
		$('#main a').each(function(i) {
			if(this.href.match(/ikariam/))
				this.target = "_Parent";
		});
	},
	hideForm:function() {
		$('#ikaSearchForm')[0].style.display = 'none';
	},
	hideResults:function() {
		$('#ikaSearchResults')[0].style.display = 'none';
		$('#ikaSearchButtonClose')[0].style.display = 'none';
	},
	hideAll:function() {
		try { $('#ikaSearchWorldWrapper')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchButtonClose')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchForm')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchResults')[0].style.display = 'none'; } catch(e) {}		
		try { $('#ikaSearchInfoBox')[0].style.display = 'none'; } catch(e) {}		
	},
	searchPlayer:function(playerName) {
		IkaSearch.resetSearch();
		$('#ikaSearchPlayerName').attr('value', playerName.replace(/&nbsp;/g, ' '));
		IkaSearch.performSearch();
	},
	searchAlliance:function(allianceName) {
		IkaSearch.resetSearch();
		$('#ikaSearchAllianceName').attr('value', allianceName);
		IkaSearch.performSearch();
	},
	showClose:function() {
		$('#ikaSearchButtonClose')[0].style.display = 'block';
	},
	showForm:function() {
		IkaSearch.hideAll();
		IkaSearch.setServer();
		$('#ikaSearchForm')[0].style.minHeight = $('#mainview')[0].clientHeight + 'px'; 
		$('#ikaSearchForm')[0].style.display = 'block';
		IkaSearch.showClose();
	},
	showResults:function() {
		IkaSearch.hideAll();
		$('#ikaSearchButtonClose')[0].style.display = 'block';
		$('#ikaSearchResults')[0].style.display = 'block'; 
		$('#ikaSearchResults')[0].style.height = $('#mainview')[0].clientHeight + 'px'; 
		IkaSearch.showClose();
	},
	showWorld:function() {
		IkaSearch.hideAll();
		IkaSearch.showClose();
		if(typeof(IkaSearch.worldWrapper) == 'undefined') {		
			IkaSearch.drawWorldOverview();			
			GM_addStyle('#ikaSearchWorldTable td { width:6px; height:6px; border:1px solid #83C3FF; }\
						#ikaSearchWorldTable td.island { background-color:#967647; cursor:pointer; }\
						#ikaSearchWorldTable td.own { background-color:#0000CC; }');
		}	
		IkaSearch.worldWrapper.style.display = 'block';
		$('#ikaSearchInfoBox')[0].style.display = 'block';
	},
	views:{
		diplomacyAdvisor:function() {
			if(Config.get('searchIconInbox')) {
				$('#messages tr.entry').each(function() {
					var playerName = $('td', this).eq(2).text().replace(/\s*$/, '');
					var a = document.createElement('a');
					a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
					a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
					$('a', $('td', this).eq(2)).append(a);
				});
			}
		},
		diplomacyAdvisorOutBox:function() {
			if(Config.get('searchIconOutboxbox')) {
				$('#deleteMessages tr.entry').each(function() {
					var playerName = $('td', this).eq(2).text().replace(/\s*$/, '');
					var a = document.createElement('a');
					a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
					a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
					$('a', $('td', this).eq(2)).append(a);
				});
			}
		},
		diplomacyAdvisorTreaty:function() {
			if(Config.get('searchIconTreaties')) {
				$('table#commercialTreaty tr').each(function(i) {
					if(i > 0) {								
						var playerName = $('td', this).eq(0).text().replace(/\s*$/, '').replace(/^\s*/, '');
						if(playerName != '' && !playerName.match(/\[.+\]/)) {
							var a = document.createElement('a');
							a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
							a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
							$('td', this).eq(0).append(a);
						}
					}
				});
			}
		},
		island:function() {
			// get cities on island
			var cities = {};
			if(Config.get('searchIconIslandPlayer')) {
				$('.owner').each(function() {					
					var playerName = this.innerHTML.match(/^\s*<span class="textLabel">.+?<\/span>\s*([^<]+)/)[1].replace(/\s/g, '');
					var a = document.createElement('a');
					a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
					a.href = 'javascript:IkaSearch.searchPlayer("' + playerName +'")';
					if($('a.messageSend', this).size() > 0) 
						$('a.messageSend', this).before(a);
					else
						this.appendChild(a);	
				});
			}
			if(Config.get('searchIconIslandAlly')) {
				$('.ally').each(function() {
					try { var allyName = $('a', this)[0].innerHTML; } catch(e) { var allyName = false; }
					if(allyName) {
						var a = document.createElement('a');
						a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for cities in this alliance"/>';
						a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
						$('a.messageSend', this).before(a);
					}
				});
			}
		},
		highscore:function() {
			$('.name').each(function() {
				var playerName = this.innerHTML;
				this.innerHTML += ' &nbsp; <a href="javascript:IkaSearch.searchPlayer(\'' + playerName +'\')"><img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/></a>';
			});
			$('.allytag').each(function() {
				try { var allyName = $('a.allyLink', this)[0].innerHTML; } catch(e) { var allyName = false; }
				if(allyName) {
					var a = document.createElement('a');
					a.innerHTML = ' &nbsp; <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for cities in this alliance"/>';
					a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
					$('a.allyLink', this).after(a);
				}
			});
		},
		options:function() {
			
		},
	},
	icons:{
		magnifier:'data:image/gif;base64,R0lGODlhDwALANU6AIeHhwwMDCQkJA4ODhISEkBAQAgICBMTEy8vLw8PDygoKAUFBZubmykpKRQUFBsbGzU1NYGBgQEBAQsLCxAQEAoKChcXFwMDA+Li4oyMjKioqIODgxERESEhIX5+fomJiYqKiioqKn19fR8fHxYWFhwcHJ6enuDg4FhYWMPDw05OTjY2Nnx8fKampjg4ODMzM6mpqQkJCRgYGPDw8DQ0NNHR0ePj425ubg0NDQAAAP///wAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAPAAsAAAZ/QJ1QAHEIdQYU4XjMwRTHgajD1AFyuQFIF7nkDBHmgoFI5HQTgAE3Oa4qr0PuUQioJI9AQYdzpSQQIx45CzU5OBw5DlgzAjkkGzkEGDkhhzlyHzkBWFc3WAQ4ORQsWBUtJjoMGjkZFDlmNjEDZ0w5JzkCFzINFgUNVTQIFiUKQQA7',
		world:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAArlJREFUeNoEwctrHHUAwPHv/H7z2N3sK7vbNu2GillppGmleDD0UB8gVOoTPSuKiAiiF2969iitKIIXwUtF8Q8QraJWalFSarc2kJpk03Q2u5vN7HNmduY3v/HzMd67+gYGoEnxVXByzsy+VbQLz6RaVJM0NaWRDoNk8sPAH31JYq1FkwiVKEwDUKlGafX6QrZ66WxttbhUbrDvO0wCA4jn28Htt29F1970Iu8DlapLUgpMDcRavbZcrH/16omXsY1F2r7HMNEoM8uBb2Cqp3iyfMpcSy9f/He8nsax/FT4Klw+lCl98WLjPNtpyFr0H0OdEuoMXiy529bc6QT0jIDnVp6gaOQ/6fQOHhU50353tbKSm0mbG/GEmTZpjQXuSHKr5dObdVELN9ko/cp91Wf1yGmZtzPvm1WndP54aZHfh7exMg3q8jDNrs9GL8AueejjP7Lp7GEkMNv0eKF2hrJZeFw4wp5PhOQfr4k7bXEvCNntK1Q65NjRkMiu0PezTPZj9lwXYVqQiLyZpgY6CUhmNlld44+mT3ucQyiNu5VQLTQw+w/jT+6h/Z9IdIhKlGGGcThUKqwtOQ+iogrdoUGiTWS+ymZLEHQ0UlgcqtepODWieMosiifCHfR+vj/0WLIybLjfkp3rIFWEmgmcuTL2vEWhPkYFf3K6fpQ77g57Xu+6GIXTz37buhEtWBmOJT7a2KGc02SlIodB0dnHsb7hsLPOYqnCleZNDqaji3LlpROdzqDv9QfehWdPnqNWWWI8MLHR2FpTsLc5+9CIR46c4fu/r7C+u/Vh1slclsvPN9BJ+td2tz1otu4+XXPy4oFijYLU1MsRpxZj3IMdvrv2C+u7rY8MIT62pInxytcX0EozHgf0B95jOcN5p5ApnlMxRSHBkumkO/Cue9PR5/ns3FUpBGma8v8AYLBeoHUSmicAAAAASUVORK5CYII%3D',
	},
	formHtml:'<form style="display:none; position:absolute; top:0; background:url(/skin/layout/bg_stone.jpg); left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;" id="ikaSearchForm" method="post" target="ikaSearchResults" action="http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch" onsubmit="IkaSearch.hideForm(); IkaSearch.showResults()">\
					<table style="margin:50px auto;"><tr align="center"><td>Pais</td><td colspan="2">\
					<select name="land" id="ikaSearchSelectServer" style="width: 200px;">\
					<option value="de">ikariam.de</option><option value="en">ikariam.org</option><option value="ae">ae.ikariam.com</option><option value="ar">ar.ikariam.com</option><option value="ba">ba.ikariam.com</option><option value="bg">ikariam.bg</option><option value="br">ikariam.com.br</option><option value="by">ikariam.by</option><option value="cl">cl.ikariam.com</option><option value="cn">ikariam.cn</option><option value="co">co.ikariam.com</option><option value="cz">ikariam.cz</option><option value="dk">ikariam.dk</option><option value="ee">ee.ikariam.com</option><option value="eg">eg.ikariam.org</option><option value="es">ikariam.es</option><option value="fi">fi.ikariam.com</option><option value="fr">ikariam.fr</option><option value="gr">ikariam.gr</option><option value="hr">hr.ikariam.org</option><option value="hk">ikariam.hk</option><option value="hu">ikariam.hu</option><option value="id">id.ikariam.com</option><option value="ih">ih.ikariam.org</option><option value="il">ikariam.co.il</option><option value="in">in.ikariam.org</option><option value="ir">ir.ikariam.com</option><option value="it">ikariam.it</option><option value="jp">jp.ikariam.org</option><option value="kr">ikariam.kr</option><option value="lt">ikariam.lt</option><option value="lv">ikariam.lv</option><option value="me">me.ikariam.org</option><option value="mx">ikariam.com.mx</option><option value="nl">ikariam.nl</option><option value="no">ikariam.no</option><option value="pe">ikariam.pe</option><option value="ph">ikariam.ph</option><option value="pk">ikariam.pk</option><option value="pl">ikariam.pl</option><option value="pt">ikariam.com.pt</option><option value="ro">ikariam.ro</option><option value="rs">ikariam.rs</option><option value="ru">ikariam.ru</option><option value="sa">sa.ikariam.org</option><option value="se">ikariam.se</option><option value="si">ikariam.si</option><option value="sk">ikariam.sk</option><option value="tr">ikariam.net</option><option value="tw">ikariam.tw</option><option value="ua">ikariam.com.ua</option><option value="us">ikariam.com</option><option value="ve">ikariam.com.ve</option><option value="vn">ikariam.vn</option>  \
				  </select>\
				</td>\
				<td>Maravilla</td>\
				<td colspan="2">\
				  <select name="wunder" style="width: 200px;">\
					<option selected="selected" value="0">-</option><option value="1">Fragua de Efesto</option><option value="2">Templo de Gaia</option><option value="3">Jardin de Dionisio</option><option value="4">Templo de Athenea</option><option value="5">Templo de Hermes</option><option value="6">Fortaleza de Ares</option><option value="7">Templo de Poseidon</option><option value="8">Coloso</option>      </select>\
				</td> 	\
			  </tr>  \
			  <tr align="center">\
				<td>Mundo</td>\
				<td colspan="2">	  \
				  <select name="welt" id="ikaSearchServer" style="width: 200px;">\
					<option selected="selected" value="1">Alpha</option><option value="2">Beta</option><option value="3">Gamma</option><option value="4">Delta</option><option value="5">Epsilon</option><option value="6">Zeta</option><option value="7">Eta</option><option value="8">Theta</option><option value="9">Iota</option><option value="10">Kappa</option><option value="11">Lambda</option><option value="12">My</option><option value="13">Ny</option><option value="14">Xi</option><option value="15">Omikron</option><option value="16">Pi</option><option value="99">Speedserver</option><option value="666">Test-Server</option>      </select>\
				</td>\
				<td/>\
				<td/>\
				<td/>\
			  </tr> \
			  <tr align="center">\
				<td>Nombre jugador</td>\
				<td colspan="2"><input type="text" value="" name="spieler" style="width: 200px;" id="ikaSearchPlayerName"/></td>  \
				<td>Alianza</td>\
				<td colspan="2"><input type="text" value="" name="allianz" style="width: 200px;" id="ikaSearchAllianceName"/></td>  \
			  </tr>	    \
			  <tr align="center">\
				<td>Nombre isla</td>\
				<td colspan="2"><input type="text" value="" name="insel_name" style="width: 200px;"/></td>  \
				<td>Nombre ciudad</td>\
				<td colspan="2"><input type="text" value="" name="stadt" style="width: 200px;"/></td>  \
			  </tr>  \
			  <tr> \
				<td>X</td>\
				<td>	  \
				  <select name="x_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="x" style="width: 100px;"/></td> \
				<td>X</td>\
				<td>	  \
				  <select name="x2_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="x2" style="width: 100px;"/></td> 	\
			  </tr>\
			  <tr> \
				<td>Y</td>\
				<td>\
				  <select name="y_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option> \
				  </select>\
				</td>\
				<td><input type="text" value="" name="y" style="width: 100px;"/></td> \
				<td>Y</td>\
				<td>\
				  <select name="y2_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option> 	  \
				  </select>\
				</td>\
				<td><input type="text" value="" name="y2" style="width: 100px;"/></td> \
			  </tr>\
			  <tr>\
				<td>Madera</td>\
				<td>\
				  <select name="holz_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="holz_level" style="width: 100px;"/></td> 	  	\
				<td>\
				  <select name="luxus">\
					<option selected="selected" value="0">Bienes de lujo</option><option value="1">Marmol</option><option value="2">Vino</option><option value="3">Cristal</option><option value="4">Azufre</option>      </select>	  \
				</td>\
				<td>\
				  <select name="luxus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="luxusgut_level" style="width: 100px;"/></td>  \
			  </tr>			\
			  <tr>  	  \
				<td>Intendencia</td>\
				<td>\
				  <select name="rathaus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="rathaus" style="width: 100px;"/></td>  	  \
				<td>Ciudades</td>\
				<td>\
				  <select name="besiedelt_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
			  <td><input type="text" value="" name="besiedelt" style="width: 100px;"/></td> \
			  </tr>  \
			  <tr>\
				<td>Coordenadas</td>\
				<td>X: <input type="text" value="0" name="x_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Y: <input type="text" value="0" name="y_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Estado</td>\
				<td><select name="xxx" style="width: 100px;"><option value="">=</option></select></td>\
				<td>\
				  <select name="status" style="width: 100px;">\
					<option selected="selected" value="0">Todo igual</option><option value="1">Normal</option><option value="2">Vacaciones</option><option value="3">Inactivo</option>      </select>\
				</td></tr><tr><td>1er orden</td><td>\
				  <select name="asc_desc_1" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_1" style="width: 100px;">\
					<option selected="selected" value="0">Jugador</option><option value="1">Alianza</option><option value="2">Estado</option><option value="3">Nombre de la ciudad</option><option value="4">Intendencia</option><option value="5">X</option><option value="6">Y</option><option value="7">Nombre de la isla</option><option value="8">Maravilla</option><option value="9">Madera</option><option value="10">Ciudades</option>      </select>\
				</td><td>2do orden</td><td>\
				  <select name="asc_desc_2" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_2" style="width: 100px;">\
					<option value="0">Jugador</option><option selected="selected" value="1">Alianza</option><option value="2">Estado</option><option value="3">Nombre ciudad</option><option value="4">Intendencia</option><option value="5">X</option><option value="6">Y</option><option value="7">Nombre de la isla</option><option value="8">Maravilla</option><option value="9">Madera</option><option value="10">Ciudades</option>      </select>\
				</td></tr><tr><td align="center" colspan="6"><input type="submit" value="Search" class="button"/></td></tr></table>			\
		</form>',
};

IkaSearch.init();
IkaSearch.init();





// ==UserScript==
// @name           Ikariam Pillage Helper
// @description    Changes to make pillaging easier.
// @include        http://s*.ikariam.*/*?*
// @include        http://s*.ikariam.*/
// @include        http://s*.ikariam.*/index.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js

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
																<img src="/skin/layout/icon-missionAbort.gif" style="height:14px; float:right; margin-left:2px; cursor:pointer;" title="Withdraw from ' + target.cityName + '" class="pillageHelperTargetsOverviewMissionWithdraw" name="' + spies[x].id + '"/>\
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




































// ==UserScript==
// @name           Ikariam Reloaded
// @namespace      Ikariam Reloaded
// @description    Removes the Premium publicity and adds some useful improvements

// @include        http://s*.ikariam.*
// @exclude        http://support.ikariam.*

// @require        http://buzzy.260mb.com/AutoUpdater.js
// @require        http://buzzy.260mb.com/Ikariam/BD.js
// @require        http://buzzy.260mb.com/Ikariam/Idioma.js
// @require        http://buzzy.260mb.com/Ikariam/Lista.js
// @require        http://buzzy.260mb.com/Ikariam/Imagenes.js
// @require        http://buzzy.260mb.com/Ikariam/InfoCiudades.js

// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0 España License
// @author         Buzzy
// @version        3.09
// @date           12/12/09

// @resource       bg_header		http://buzzy.260mb.com/Ikariam/img/bg_header.jpg
// ==/UserScript==

//--------------- LIBRERÍA ---------------//

function eliminaNodo(e){if(e)e.parentNode.removeChild(e);}
function colocaDelante(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2);}
function colocaDetras(e1,e2){if(e2)e2.parentNode.insertBefore(e1,e2.nextSibling);}
function swapNodos(e1,e2){if(e1&&e2){var nextSibling=e1.nextSibling;var parentNode=e1.parentNode;e2.parentNode.replaceChild(e1,e2);parentNode.insertBefore(e2,nextSibling)}}//El primer nodo tiene que ser posterior al segundo nodo.
function addGlobalStyle(css){var head=document.getElementsByTagName("head")[0];if(head){var style=document.createElement("style");style.type="text/css";style.innerHTML=css;head.appendChild(style)}}
function getHrefParam(param,href){var re=new RegExp(param+"="+"\\w+");var r=re.exec(href);if(r!=null){var s=r+"";return s.split("=")[1]}else{return r}}
function trim(cad){return cad.replace(/^\s+|\s+$/g,"")}
function seg2Time(t){var tiempo=[];tiempo[0]=Math.floor(t/86400);t-=tiempo[0]*86400;tiempo[1]=Math.floor(t/3600);t-=tiempo[1]*3600;tiempo[2]=Math.floor(t/60);t-=tiempo[2]*60;tiempo[3]=Math.ceil(t);return tiempo}

//--------------- fin LIBRERÍA ---------------//


//--------------- FUNCIONES ---------------//

/**
 * Añade un estilo global.
 */
function estiloGlobal (){
	addGlobalStyle (
		".headerReloaded { background: url(" + Img.PANEL_HEADER + "); height: 5px; z-index: 10000; }" +
		".bodyReloaded { background: url(" + Img.PANEL_BODY + ") repeat-y; z-index: 10000; }" +
		".footerReloaded { background: url(" + Img.PANEL_FOOTER + "); height: 5px; z-index: 10000; }" +
		".calc_td { float: left; padding-bottom: 5px; }" +
		".calc_tiempo { text-align: right; }" +
		"#worldmap_iso #scrollcover { height: 596px; }" +
		"#GF_toolbar ul { width: 1000px; }" +
		"#GF_toolbar li.version { position: absolute; left: 820px; }" +
		"#GF_toolbar li.serverTime { position: absolute; left: 880px; }" +
		"#advisors a.plusteaser { display: none; }" +
		".premiumExchange { display: none; }" +
		"#globalResources .transporters a { top: 17px; }" +
		"#globalResources .gold a { top: 49px; }" +
		"#fleetMovements .info { display: none; }" +
		".cannotbuild a { display: none; }" +
		".etiqueta { border: solid thin #D2D2D2; background-color: #F4F4F4; -moz-border-radius: 5px; padding: 5px; width: 200px; display: none; position: fixed; z-index: 1000; }" +
		".inputOpciones input { margin-right: 4px; }" +
		".barraProgreso { position: absolute; top: 85px; left: 248px; width: 200px; height: 20px; background-color: #FFF; border: solid thin #000; }" +
		".barraProgreso2 { position: absolute; top: 0; left: 0; background: url(" + Img.MISC_BARRA_PROGRESO + "); height: 17px; padding: 3px 3px 0 0; font-size: 11px; text-align: right; color: #FFF; font-weight: bold; width: 100%;}" +
		".barraProgreso3 { font-size: 11px; text-align: right; color: #000; font-weight: bold; padding-top: 3px; text-align: center; }" +
		".noBoton { position: absolute; top: 50px; right: 0px; width: 137px; text-align: center; }"
	);
}

/**
 * Consulta el nombre de la ciudad.
 * @param str texto con el nombre de la ciudad y las coordenadas. Parámetro opcional.
 * @return nombre de la ciudad.
 */
function consultaNombre (str){
	var nombre = "";
	
	if (!str){
		if (pagina == "relatedCities"){
			var ciudad = document.getElementsByClassName ("occupiedCities coords dropbutton")[0];
			if (!ciudad){
				ciudad = document.getElementsByClassName ("deployedCities coords dropbutton")[0];
			}
			
			nombre = ciudad.childNodes[2].textContent.split ("]")[1].substr (1);
		}else{
			nombre = document.getElementsByClassName ("optionList")[0].previousSibling.childNodes[2].textContent.split ("]")[1].substr (1);
		}
	}else{
		nombre = str.split ("]")[1].substr (1);
	}
	
	return nombre;
}

/**
 * Crea, si es necesario, la variable que guarda el nombre de las ciudades con su bien de lujo.
 * También la actualiza si se ha creado una nueva ciudad.
 * @return true si la ciudad actual es mía, sinó, false.
 */
function compruebaVariableCiudades (){
	var ciudades = GM_getValue (server + "ordenCiudades");

	if (pagina == "worldmap_iso"){
		var lista = document.getElementsByClassName ("optionList")[1];
	}else{
		var lista = document.getElementsByClassName ("optionList")[0];
	}
	
	if (!ciudades){
		//Inicializo la cadena
		var cad = [];
		var j = 0;
		var stop = false;
		while (j<lista.childNodes.length && !stop){
			if (lista.childNodes[j].title != ""){
				cad[j] = consultaNombre (lista.childNodes[j].childNodes[2].textContent) + "|-1";
			}else{
				stop = true;
			}
			
			j++;
		}
		
		GM_setValue (server + "ordenCiudades", cad.join ("#"));
		
		ciudades = cad;
	}else{
		ciudades = ciudades.split ("#");
	}
	
	var nombreCiudad = consultaNombre ();
	
	//Calculo el número de ciudades sin contar las que no son mías
	var num = 0;
	var mia = false;
	
	for (var i=0; i<lista.childNodes.length; i++){
		if (lista.childNodes[i].title != ""){
			num++;
			
			var nombre = consultaNombre (lista.childNodes[i].childNodes[2].textContent);
			if (nombre == nombreCiudad){
				mia = true;
			}
		}
	}

	if (ciudades.length != num){
		//Hay una nueva ciudad, actualizamos
		ciudades = ciudades.join ("#");
		ciudades += "#" + nombre + "|-1";
		GM_setValue (server + "ordenCiudades", ciudades);
	}
	
	return mia;
}

/**
 * Transforma un número en una cadena con separación de grupos de 3 cifras con comas.
 * @param num número sin comas.
 * @return cadena con comas.
 */
function transformaCifra (num){
	var negativo = false;

	if (num < 0){
		num = num*-1;
		negativo = true;
	}
	
	var cad = new Array ();
	var n = num;
	var i = n.toString ().length - 1;
	while (n >= 10){
		cad[i] = n%10;
		n = parseInt(n/10);
		i--;
	}
	cad[0] = n;
	
	var cad2 = "";
	var j = 0;
	for (var i=cad.length-1; i>=0; i--){
		cad2 = cad[i] + cad2;
		
		if (cad.length > 3){
			j++;
			if (j == 3 && i != 0){
				j = 0;
				cad2 = "," + cad2;
			}
		}
	}
	
	if (negativo){
		cad2 = "-" + cad2;
	}
	
	return cad2;
}

/**
 * Actualiza el nombre del objeto de la ciudad si es necesario.
 */
function actualizaNombreCiudad (){
	/**
	 * Actualiza el nombre del objeto que guarda información de la ciudad y la variable ordenCiudades.
	 * @param div capa donde se encuentran los nombres.
	 */
	function actualizaNombre (div){
		var nuevoNombre = div.childNodes[11].childNodes[1].value.replace (/[!"·$%&\/()=?¿|@#¬'¡*+<>,;.:\\ºª^\[\]\{\}]/g, "");
		
		//Comprobamos si el nuevo nombre no está repetido.
		var ciudades = document.getElementsByClassName ("optionList")[0].childNodes;
		var j = 0;
		var stop = false;
		while (j<ciudades.length && !stop){
			var nombreCiudad = consultaNombre (ciudades[j].childNodes[2].textContent);
			
			if (nombreCiudad == nuevoNombre){
				stop = true;
			}
			
			j++;
		}
		
		var boton = div.childNodes[11].childNodes[3];
		boton.type = "button";
		var formu = document.getElementsByTagName ("form")[0];
		formu.setAttribute ("onsubmit", "return false;");

		if (stop){
			alert (Lang["cityNameAlert"].split ("{x}")[0] + nuevoNombre + Lang["cityNameAlert"].split ("{x}")[1]);
			boton.blur ();
		}else{
			formu.submit ();
			
			//Actualizo la variable ordenCiudades
			var cad = GM_getValue (server + "ordenCiudades");
			cad = cad.replace (Ciudad.getNombre (), nuevoNombre);
			GM_setValue (server + "ordenCiudades", cad);
			
			//Actualizo el objeto ciudad
			Ciudad.actualizaNombre (nuevoNombre);
		}
	}
	
	//Añado un listener en el botón para renombrar una ciudad para actualizar la variable
	if (pagina == "renameCity"){
		var div = document.getElementsByClassName ("content")[1];
		div.childNodes[11].childNodes[3].addEventListener ("click", function (){ actualizaNombre (div); }, false);
		div.childNodes[11].childNodes[1].addEventListener ("keypress", function (e){ if (e.keyCode == 13) actualizaNombre (div); }, true);
	}
}

/**
 * Elimina la publicidad Premium.
 */
function eliminaPublicidad (){
	eliminaNodo (document.getElementById ("GF_toolbar").childNodes[3].childNodes[3]);
	eliminaNodo (document.getElementById ("viewCityImperium"));
	eliminaNodo (document.getElementById ("viewMilitaryImperium"));
	eliminaNodo (document.getElementById ("viewResearchImperium"));
	eliminaNodo (document.getElementById ("viewDiplomacyImperium"));
	eliminaNodo (document.getElementById ("trader"));
	eliminaNodo (document.getElementById ("globalResources").childNodes[3].childNodes[3]);
	eliminaNodo (document.getElementById ("setPremiumTransports"));
	eliminaNodo (document.getElementById ("viewDiplomacyImperium"));

	if (pagina == "transport"){
		eliminaNodo (document.getElementsByTagName ("form")[1].previousSibling.previousSibling);
		eliminaNodo (document.getElementsByTagName ("form")[1]);
	}
	
	if (pagina == "warehouse"){
		eliminaNodo (document.getElementById ("information"));
	}
	
	if (pagina != "tradeAdvisor"){
		eliminaNodo (document.getElementsByClassName ("next")[0]);
	}
	
	var archivo = document.getElementsByClassName ("yui-nav")[0];
	if (archivo){
		eliminaNodo (archivo.childNodes[5]);
	}
	
	if (pagina == "city"){
		eliminaNodo (document.getElementById ("reportInboxLeft"));
	}
	
	if (pagina == "militaryAdvisorReportView"){
		eliminaNodo (document.getElementById ("troopsReport").getElementsByTagName ("p")[0].childNodes[3]);
	}

	var tag = document.getElementsByClassName ("selected")[0];
	if (!tag) return;
	
	tag = tag.parentNode;
	
	//Elimino guardar en archivo bandeja de entrada
	if (tag.childNodes[1].className == "selected"){
		var span = document.getElementsByClassName ("reply");
		if (span){
			for (var i=0; i<span.length; i++){
				span[i].removeChild (span[i].childNodes[3]);
			}
		}
		
		var contrato = document.getElementsByClassName ("decision");
		if (contrato){
			for (var i=0; i<contrato.length; i++){
				eliminaNodo (contrato[i].nextSibling.nextSibling);
			}
		}
	}
	
	//Elimino guardar en archivo bandeja de salida
	if (tag.childNodes[3].className == "selected"){
		span = document.getElementsByClassName ("msgText");
		if (span){
			for (var i=0; i<span.length; i++){
				span[i].removeChild (span[i].childNodes[5]);
			}
		}
	}
	
}

function eliminaBarraNavegacion (){
	addGlobalStyle (
		"#mainview .buildingDescription h1,  #mainview h1{" +
			"margin: 0;" +
			"text-align: center;" +
		"}" +
		
		"#breadcrumbs {" +
			"display: none;" + 
		"}"
	);
	
	if (pagina == "militaryAdvisorDetailedReportView"){
		addGlobalStyle (
			"#header { background-image: url(" + GM_getResourceURL ("bg_header") + ") !important; }"
		);
	}
}

/**
 * Modifica algunos elementos gráficos y añade mejoras varias (las que no se pueden activar/desactivar).
 */
function cambiaUI (){
	/**
	 * Modifica de lugar las coordenadas de la isla.
	 */
	function coordenadas (){
		var info;
		
		if (pagina == "worldmap_iso"){

			document.getElementById ("islandName").textContent = document.getElementById ("islandBread").childNodes[0].textContent;
		
			info = document.getElementById ("information");
			if (info){
				info.childNodes[3].addEventListener ("DOMSubtreeModified", function (){ document.getElementById ("islandName").textContent = document.getElementById ("islandBread").childNodes[0].textContent; }, false);
			}
		}

		if (pagina == "city" || pagina == "relatedCities"){
			if (pagina == "city"){
				var n1 = "5px";
				var n2 = "4px";
				info = document.getElementById ("information");
			}else{
				var n1 = "-75px";
				var n2 = "-6px";
				info = document.getElementById ("backTo");
			}
			
			if (info){
				var barra = document.getElementById ("breadcrumbs");
				var nombre = barra.childNodes[3].textContent.split ("[");
				info.childNodes[1].innerHTML =	"<a href='" + barra.getElementsByTagName ("a")[0].href + "' style='position: absolute; left: " + n1 +  "; top: " + n2 + ";'><img src='http://" + host + "/skin/layout/icon-world.gif'/></a>" +
												"<span>" + nombre[0] + " [" + nombre[1] + "</span>";
				info.childNodes[1].childNodes[1].style.cursor = "pointer";
				info.childNodes[1].childNodes[1].addEventListener ("mouseover",
													function (){
														this.style.textDecoration = "underline";
													},
													false);
				info.childNodes[1].childNodes[1].addEventListener ("mouseout",
													function (){
														this.style.textDecoration = "none";
													},
													false);
				info.childNodes[1].childNodes[1].addEventListener ("click",
													function (){
														window.open (document.getElementById ("breadcrumbs").getElementsByTagName ("a")[1].href, "_self");
													},
													false);
			}
		}
		
		if (pagina == "island"){
			info = document.getElementById ("infocontainer");
			var nombre = document.getElementById ("breadcrumbs").childNodes[3].textContent.split ("[");
			info.childNodes[0].innerHTML =	"<a href='" + document.getElementById ("breadcrumbs").getElementsByTagName ("a")[0].href + "' style='position: absolute; left: 5px; top: 4px;'><img src='http://" + host + "/skin/layout/icon-world.gif'/></a>" +
											nombre[0] + " [" + nombre[1];
		}
	}
	
	/**
	 * Coloca links en el aserradero, mina y maravilla hacia el agora.
	 */
	function agora (){
		/**
		 * Crea el contenido del panel del agora.
		 * @return contenido del panel.
		 */
		function creaContenido (){
			var contenido = "";
			var ciudades = GM_getValue (server + "ordenCiudades").split ("#");
			
			for (var i=0; i<ciudades.length; i++){
				var ciudad = ciudades[i].split ("|")[0];
				var ciudad2 = GM_getValue (server + ciudad).split ("#");
				
				var bold = "";
				if (ciudad == Ciudad.getNombre ()){
					bold = "font-weight: bold;";
				}
				contenido += "<a style='color: #000; line-height: 22px; " + bold + "' href='http://" + host + "/index.php?view=islandBoard&id=" + ciudad2[6] + "'>" + ciudad2[7] + " [" + ciudad + "]</a><br/>";
			}
			
			return contenido;
		}
	
		if (pagina == "resource" || pagina == "tradegood" || pagina == "wonder"){
			var i;
			if (pagina == "resource"){
				i = 6;
			}else if (pagina == "tradegood"){
				i = 7;
			}else{
				i = 8;
			}
			
			var panel = document.createElement ("div");
			panel.id = "agoraReloaded";
			panel.className = "dynamic";
			
			if (panelesScript[i] == "1"){
				var abierto = true;
				var imagen = Img.PANEL_BOTON_MINIMIZAR;
				var vis = "visible";
				var hei = "auto";
			}else{
				var abierto = false;
				var imagen = Img.PANEL_BOTON_MAXIMIZAR;
				var vis = "hidden";
				var hei = "0";
			}
			
			var contenido = creaContenido ();
			
			panel.innerHTML =	"<h3 class='header'>Agora<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
								"<div class='content' style='text-align: center; visibility: " + vis + "; height: " + hei + ";'>" + contenido + "</div>" +
								"<div class='footer'></div>";
								
			colocaDetras (panel, document.getElementById ("resUpgrade"));
			
			document.getElementById ("agoraReloaded").getElementsByTagName ("img")[0].addEventListener (
				"click",
				function (){
					contenido = this.parentNode.parentNode.childNodes[1];
					
					if (abierto){
						abierto = false;
						this.src = Img.PANEL_BOTON_MAXIMIZAR;
						contenido.style.visibility = "hidden";
						contenido.style.height = "0";
						panelesScript[i] = 0;
						GM_setValue (server + "paneles", panelesScript.join ("#"));
					}else{
						abierto = true;
						this.src = Img.PANEL_BOTON_MINIMIZAR;
						contenido.style.height = "auto";
						contenido.style.visibility = "visible";
						panelesScript[i] = 1;
						GM_setValue (server + "paneles", panelesScript.join ("#"));
					}
				},
				false
			);
		}
	}
	
	/**
	 * Muestra la cantidad de vino necesária hasta que la población esté al máximo de capacidad.
	 */
	function vinoPoblacion (){
		if (pagina == "townHall"){
			vinoHora = document.getElementsByClassName ("serving")[0];
			if (vinoHora){
				//Existe taberna
				vinoHora = Math.floor (BaseDatos.taberna[parseInt (vinoHora.childNodes[0].textContent.replace ("+", ""))/60]*(1 - Ciudad.getPrensa ()/100));
				
				var poblacion = document.getElementsByClassName ("space")[0];
				var poblacionActual = parseInt (poblacion.childNodes[1].textContent);
				var poblacionTotal = parseInt (poblacion.childNodes[3].textContent);
				var num = poblacion.nextSibling.nextSibling.childNodes[3].textContent;
				var poblacionHora = parseFloat (num.match (/\d+/g).join ("."));
				
				if (num.search ("-") != -1 > 0 && (poblacionTotal != poblacionActual)){
					addGlobalStyle (
						"#townHall #CityOverview .stats { height: 155px; }"
					);
					
					var tiempoHora = ((poblacionTotal - poblacionActual)/poblacionHora);
					var tiempo = seg2Time (tiempoHora*3600);
					var vino = Math.ceil (tiempoHora*vinoHora);
					var t = "";
					var tmp = Lang["time"].split ("|");
					
					for (var i=0; i<3; i++){
						if (tiempo[i] != 0){
							t += tiempo[i] + tmp[i] + " ";
						}
					}
					
					var lista = document.getElementsByClassName ("stats")[0];
					
					var listaTiempo = document.createElement ("li");
					listaTiempo.style.position = "absolute";
					listaTiempo.style.left = "100px";
					listaTiempo.style.top = "100px";
					listaTiempo.style.backgroundImage = "url(http://" + host + "/skin/icons/growth_positive.gif)";
					listaTiempo.innerHTML =	"<span>" + Lang["time2"] + ":</span>" +
											"<span style='position: relative; left: 3px;'>" + t + "</span>" +
											"<img title='" + Lang["time2TitleTime"] + "' style='position: absolute; left: 170px; top: 3px;' src='" + Img.MISC_INFO + "'/>";
					
					var labelVino = document.getElementsByClassName ("cat wine")[0].childNodes[1].textContent;
					
					var listaVino = document.createElement ("li");
					listaVino.style.position = "absolute";
					listaVino.style.left = "318px";
					listaVino.style.top = "100px";
					listaVino.style.backgroundImage = "url(" + Img.RECURSO_VINO + ")";
					listaVino.innerHTML =	"<span style='position: relative; left: 3px;'>" + labelVino + ":</span>" +
											"<span style='position: relative; left: 6px;'>" + vino + "</span>" +
											"<img title='" + Lang["time2TitleWine"] + "' style='position: absolute; left: 170px; top: 3px;' src='" + Img.MISC_INFO + "'/>";

					lista.appendChild (listaTiempo, lista);						
					lista.appendChild (listaVino, lista);
				}
			}
		}
	}

	if (pagina == "diplomacyAdvisorTreaty"){
		var span = document.getElementsByClassName ("button")[0];
		if (span){
			span.parentNode.parentNode.style.height = "50px";
			span.style.position = "relative";
			span.style.right = "225px";
			span.style.top = "15px";
		}
	}
	
	document.getElementById ("footer").innerHTML = "<center>" + Ciudad.getNombre () + "</center>";
	
	coordenadas ();
	agora ();
	vinoPoblacion ();
}

/**
 * Crea un botón para cambiar entre iconos normales y Premium.
 */
function creaIconoPremium (){
	/**
	 * Cambia entre iconos normales o Premium.
	 */
	function cambiaImg (){
		if (GM_getValue (server + "iconosPremium")){
			GM_setValue (server + "iconosPremium", false);
		}else{
			GM_setValue (server + "iconosPremium", true);
		}
		window.location.reload ();
	}

	//Compruebo si hay que poner iconos Premium
	var premium = GM_getValue (server + "iconosPremium", false);
	if (premium){
		addGlobalStyle (
			"#advisors #advCities a.normal { background-image: url(skin/layout/advisors/mayor_premium.gif); }" +
			"#advisors #advMilitary a.normal { background-image: url(skin/layout/advisors/general_premium.gif); }" +
			"#advisors #advResearch a.normal { background-image: url(skin/layout/advisors/scientist_premium.gif); }" +
			"#advisors #advDiplomacy a.normal { background-image: url(skin/layout/advisors/diplomat_premium.gif); }" +
			"#advisors #advCities a.normalactive { background-image: url(skin/layout/advisors/mayor_premium_active.gif); }" +
			"#advisors #advMilitary a.normalactive { background-image: url(skin/layout/advisors/general_premium_active.gif); }" +
			"#advisors #advResearch a.normalactive { background-image: url(skin/layout/advisors/scientist_premium_active.gif); }" +
			"#advisors #advDiplomacy a.normalactive { background-image: url(skin/layout/advisors/diplomat_premium_active.gif); }" +
			"#advisors #advMilitary a.normalalert { background-image: url(skin/layout/advisors/general_premium_alert.gif); }"
		);
	}

	var nuevoBoton = document.createElement ("img");
	nuevoBoton.setAttribute ("id", "botonImg");
	nuevoBoton.style.position = "absolute";
	nuevoBoton.style.right = "12px";
	nuevoBoton.style.top = "111px";
	nuevoBoton.style.cursor = "pointer";
	nuevoBoton.style.zIndex = "10000";
	if (premium){
		nuevoBoton.title = Lang["advisorPremiumIcon"];
	}else{
		nuevoBoton.title = Lang["advisorIcon"];
	}
	nuevoBoton.src = Img.FLECHA_TIPO_1;

	colocaDetras (nuevoBoton, document.getElementById ("header"));
	
	nuevoBoton.addEventListener ("click", cambiaImg, false);
}

/**
 * Permite ordenar las ciudades y añade un icono del bien de lujo de la ciudad.
 */
function ordenImagenCiudades (){
	/**
	 * Actualiza la variable ordenCiudades.
	 */
	function guardar (){
		var ciudades = GM_getValue (server + "ordenCiudades").split ("#");
		var lista = document.getElementsByClassName ("optionList")[n];
		var aux = [];
		
		var i = 0;
		var stop = false;
		while (i<lista.childNodes.length && !stop){
			var nombre = consultaNombre (lista.childNodes[i].childNodes[2].textContent);
		
			if (lista.childNodes[i].title != ""){
				var j = 0;
				var stop2 = false;
				while (j<ciudades.length && !stop2){
					if (nombre == ciudades[j].split ("|")[0]){
						aux[i] = nombre + "|" + ciudades[j].split ("|")[1];
						stop2 = true;
					}
					
					j++;
				}
			}else{
				stop = true;
			}
			
			i++;
		}
		
		GM_setValue (server + "ordenCiudades", aux.join ("#"));
	}

	/**
	 * Intercambia los nodos de las ciudades.
	 * @param b true si se intercambia con el de arriba, sinó, false.
	 * @param nodo nodo donde que se ha apretado.
	 */
	function cambiaNodos (b, nodo){
		var num = parseInt (nodo.className.split ("_")[1]);
		var lista = document.getElementsByClassName ("optionList")[n];
		
		if (b){
			var nodo2 = nodo.previousSibling;
			if (nodo2){
				var clase1 = nodo.className;
				clase1 = "fila_" + (parseInt (clase1.split ("_")[1]) - 1);
				nodo.className = clase1;
				var clase2 = nodo2.className;
				clase2 = "fila_" + (parseInt (clase2.split ("_")[1]) + 1);
				nodo2.className = clase2;
				
				if (nodo == nodo.parentNode.lastChild){
					if (lista.childNodes[lista.childNodes.length - 1].title == ""){
						lista.childNodes[lista.childNodes.length - 1].className = "deployedCities coords";
					}else{
						lista.childNodes[lista.childNodes.length - 1].className = "coords";
					}
				}
				
				swapNodos (nodo, nodo2);
					
				//Intercambio las ciudades
				for (var i=0; i<lista.childNodes.length; i++){
					if (num == i){
						swapNodos (lista.childNodes[i], lista.childNodes[i-1]);
					}

					if (i == 0){
						lista.childNodes[0].className = "coords first";
					}else if (i > 0 && i < lista.childNodes.length - 1){
						lista.childNodes[i].className = "coords";
					}else{
						if (lista.childNodes[i].title == ""){
							lista.childNodes[i].className = "deployedCities coords last";
						}else{
							lista.childNodes[i].className = "coords last";
						}
					}
				}
			}
		}else{
			var nodo2 = nodo.nextSibling;
			if (nodo2 && nodo2.className != "fila_x"){
				var clase1 = nodo.className;
				clase1 = "fila_" + (parseInt (clase1.split ("_")[1]) + 1);
				nodo.className = clase1;
				var clase2 = nodo2.className;
				clase2 = "fila_" + (parseInt (clase2.split ("_")[1]) - 1);
				nodo2.className = clase2;
				
				swapNodos (nodo2, nodo);
				
				//Intercambio las ciudades
				for (var i=0; i<lista.childNodes.length; i++){
					if (num == i){
						swapNodos (lista.childNodes[i+1], lista.childNodes[i]);
					}
					
					if (i == 0){
						lista.childNodes[0].className = "coords first";
					}else if (i > 0 && i < lista.childNodes.length - 1){
						lista.childNodes[i].className = "coords";
					}else{
						if (lista.childNodes[i].title == ""){
							lista.childNodes[i].className = "deployedCities coords last";
						}else{
							lista.childNodes[i].className = "coords last";
						}
					}
				}
			}
		}
		
		guardar ();
	}

	/**
	 * Añade una fila con la imagen del bien de lujo y las flechas.
	 * @param num número de fila.
	 * @param nombre nombre de la ciudad de la fila.
	 * @param b true si es una fila de mi ciudad, sinó, false.
	 */
	function creaFila (num, nombre, b){
		var fila = document.createElement ("tr");
		fila.style.height = "24px";
		fila.style.border = "thin solid #A58151";
		if (b){
			fila.className = "fila_" + num;
		}else{
			fila.className = "fila_x";
		}
		
		var img = "";
		if (!b){
			img = "<img src='" + Img.MISC_BARRA_PROHIBIDO + "'/>";
		}
		
		var columna = document.createElement ("td");
		columna.innerHTML = img;
		columna.style.width = "30px";
		
		if (b){
			columna.className = "ciudadesIcono";
			columna.title = nombre;
		}
		
		fila.appendChild (columna);
		
		if (b){
			var flecha = document.createElement ("img");
			flecha.style.cursor = "pointer";
			flecha.style.position = "relative";
			flecha.style.left = "4px";
			flecha.style.top = "-2px";
			flecha.style.display = "block";
			flecha.src = Img.FLECHA_TIPO_5;
			flecha.addEventListener ("click", function (){ cambiaNodos (true, this.parentNode.parentNode); }, false);
			
			var flecha2 = document.createElement ("img");
			flecha2.style.cursor = "pointer";
			flecha2.style.position = "relative";
			flecha2.style.left = "4px";
			flecha2.style.bottom = "-2px";
			flecha2.style.display = "block";
			flecha2.src = Img.FLECHA_TIPO_6;
			flecha2.addEventListener ("click", function (){ cambiaNodos (false, this.parentNode.parentNode); }, false);
		}
		
		columna = document.createElement ("td");
		
		if (b){
			columna.appendChild (flecha);
			columna.appendChild (flecha2);
		}
							
		columna.style.width = "15px";
		fila.appendChild (columna);

		tabla.appendChild (fila);
	}
	
	/**
	 * Valida si el atributo que se ha modificado es el que oculta y hace visible la lista.
	 * @param nodo nodo del atributo que se modifica.
	 */
	function valida (nodo){
		var tablaIconos = document.getElementById ("tablaIconosCiudades");
		if (nodo.className == "optionList"){
			tablaIconos.style.visibility = "hidden";
			tablaAbierta = false;
		}else{
			tablaIconos.style.visibility = "visible";
			tablaAbierta = true;
		}	
	}
	
	var tablaAbierta = false;
	var n;
	if (pagina == "relatedCities" || pagina == "worldmap_iso"){
		n = 1;
	}else{
		n = 0;
	}
	var lista = document.getElementsByClassName ("optionList")[n];
	var ciudades = GM_getValue (server + "ordenCiudades").split ("#");

	var tabla = document.createElement ("table");
	tabla.id = "tablaIconosCiudades";
	tabla.border = "1";
	tabla.innerHTML = "";
	tabla.style.width = "45px";
	tabla.style.position = "relative";
	tabla.style.top = "32px";
	if (pagina == "museum"){
		tabla.style.left = "-19.6em";
		addGlobalStyle (
			"#museum table td{" +
				"padding: 0;" +
			"}"
		);
	}else if (pagina == "options"){
		tabla.style.left = "-19.6em";
		addGlobalStyle (
			"#options table td, #options table th {" +
				"padding: 0;" +
			"}"
		);
	}else{
		tabla.style.right = "33px";
	}
	tabla.style.border = "thin solid #A58151";
	tabla.style.backgroundImage = "url(" + Img.MISC_LISTA_CIUDADES_FONDO + ")";
	tabla.style.visibility = "hidden";

	var i = 0;
	while (i<ciudades.length){
		var stop = false;
		var j = i;
		while (j<lista.childNodes.length && !stop){
			if (lista.childNodes[j].title != ""){
				var nombre = consultaNombre (lista.childNodes[j].childNodes[2].textContent);

				if (nombre == ciudades[i].split ("|")[0]){
					stop = true;
					swapNodos (lista.childNodes[j], lista.childNodes[i]);
				}
			}else{
				stop = true;
			}
			
			j++;
		}
		
		creaFila (i, nombre, true);
		
		if (i == 0){
			lista.childNodes[0].className = "coords first";
		}else{
			lista.childNodes[i].className = "coords";
		}
		
		i++;
	}

	for (var j=i; j<lista.childNodes.length; j++){
		creaFila (-1, "", false);
	}
	
	var nodo = lista.childNodes[lista.childNodes.length - 1];
	if (nodo.title == ""){
		nodo.className = "deployedCities coords last";
	}else{
		nodo.className = "coords last";
	}
	
	colocaDelante (tabla, document.getElementById ("changeCityForm"));

	//Añado un listener al botón para mostrar la lista de ciudades
	document.getElementsByClassName ("optionList")[n].addEventListener ("DOMAttrModified", function (){ valida (this); }, false);
}

/**
 * Crea un panel con accesos a más paneles.
 */
function menuPaneles (){
	if (pagina == "city" && Ciudad.getMia ()){
		//Cargo la disposición de los paneles (abiertos o cerrados)
		var menu = GM_getValue (server + "menu", "0#0#0").split ("#");
	
		var menuAbierto = false;
		var pos = document.getElementById ("information");
		
		//Menú de los paneles
		var capa = document.createElement ("div");
		capa.id = "menuPaneles";
		capa.className = "dynamic";
		capa.style.display = "none";
		
		capa.innerHTML =	"<h3 class='header'>" + Lang["menu"] + "</h3>" +
							"<div class='content' style='height: 20px;'>" +
								"<img id='iconoMenuPuntos' title='" + Lang["pointsPlayer"] + "' style='cursor: pointer; position: absolute; top: 3px; left: 60px;' src='" + Img.MENU_PUNTOS + "'/></li>" +
								"<img id='iconoMenuTransporte' title='" + Lang["moveUnits"] + "' style='cursor: pointer; position: absolute; top: 3px; left: 100px;' src='" + Img.MENU_TRANSPORTE + "'/></li>" +
								"<img id='iconoMenuImagen' title='" + Lang["cityImage"] + "' style='cursor: pointer; position: absolute; top: 3px; left: 140px;' src='" + Img.MENU_IMAGEN + "'/></li>" +
							"</div>" +
							"<div class='footer'></div>";
		
		colocaDetras (capa, pos);
		
		//Botón para abrir el menú
		var panel = document.createElement ("img");
		panel.setAttribute ("width", "19px");
		panel.src = Img.MENU_ABRIR_MENU;
		panel.style.position = "absolute";
		panel.style.top = "5px";
		panel.style.right = "5px";
		panel.style.cursor = "pointer";
		panel.title = Lang["openMenu"];
		panel.addEventListener ("click",
								function (){
									if (!menuAbierto){
										document.getElementById ("menuPaneles").style.display = "inline";
										menuAbierto = true;
									}else{
										document.getElementById ("menuPaneles").style.display = "none";
										menuAbierto = false;
									}
								},
								false);

		pos.appendChild (panel);
		
		//Listener de los iconos del panel
		var img = document.getElementById ("iconoMenuPuntos");
		img.addEventListener (	"click",
								function (){
									if (menu[1] == "0"){
										creaPanelPuntos ();
										menu[1] = "1";
										GM_setValue (server + "menu", menu.join ("#"));
									}else{
										eliminaNodo (document.getElementById ("menuPanelPuntos"));
										menu[1] = "0";
										GM_setValue (server + "menu", menu.join ("#"));
									}
								},
								false);
		
		img = document.getElementById ("iconoMenuTransporte");
		img.addEventListener (	"click",
								function (){
									if (menu[0] == "0"){
										creaPanelTransporte ();
										menu[0] = "1";
										GM_setValue (server + "menu", menu.join ("#"));
									}else{
										eliminaNodo (document.getElementById ("menuPanelTransporte"));
										menu[0] = "0";
										GM_setValue (server + "menu", menu.join ("#"));
									}
								},
								false);
								
		img = document.getElementById ("iconoMenuImagen");
		img.addEventListener (	"click",
								function (){
									if (menu[2] == "0"){
										creaPanelImagen ();
										menu[2] = "1";
										GM_setValue (server + "menu", menu.join ("#"));
									}else{
										eliminaNodo (document.getElementById ("menuPanelImagen"));
										menu[2] = "0";
										GM_setValue (server + "menu", menu.join ("#"));
									}
								},
								false);
								
		//Creo los paneles
		if (menu[2] == "1"){
			creaPanelImagen ();
		}
		
		if (menu[0] == "1"){
			creaPanelTransporte ();
		}
		
		if (menu[1] == "1"){
			creaPanelPuntos ();
		}
	}
}

/**
 * Crea un panel para saber la puntuación del jugador.
 */
function creaPanelPuntos (){
	var capa = document.createElement ("div");
	capa.id = "menuPanelPuntos";
	capa.className = "dynamic";
	
	if (panelesScript[0] == "1"){
		var abierto = true;
		var imagen = Img.PANEL_BOTON_MINIMIZAR;
		var vis = "visible";
		var hei = "auto";
	}else{
		var abierto = false;
		var imagen = Img.PANEL_BOTON_MAXIMIZAR;
		var vis = "hidden";
		var hei = "0";
	}
	
	capa.innerHTML =	"<h3 class='header'>" + Lang["pointsPlayer"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
						"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" +
							"<table style='width: 100%;'>" +
								"<tr>" +
									"<td style='padding: 5px;'>" + Lang["score"] + "</td>" +
									"<td id='menuPuntuacion' style='font-weight: bold; text-align: right; padding-right: 5px;'>...</td>" +
								"</tr>" +
								"<tr>" +
									"<td style='padding: 5px;'>" + Lang["generals"] + "</td>" +
									"<td id='menuGenerales' style='font-weight: bold; text-align: right; padding-right: 5px;'>...</td>" +
								"</tr>" +
							"</table>" +
						"</div>" +
						"<div class='footer'></div>";
	
	colocaDetras (capa, document.getElementById ("menuPaneles"));
	
	document.getElementById ("menuPanelPuntos").getElementsByTagName ("img")[0].addEventListener (
		"click",
		function (){
			var contenido = this.parentNode.parentNode.childNodes[1];
			
			if (abierto){
				abierto = false;
				this.src = Img.PANEL_BOTON_MAXIMIZAR;
				contenido.style.visibility = "hidden";
				contenido.style.height = "0";
				panelesScript[0] = 0;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}else{
				abierto = true;
				this.src = Img.PANEL_BOTON_MINIMIZAR;
				contenido.style.height = "auto";
				contenido.style.visibility = "visible";
				panelesScript[0] = 1;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}
		},
		false
	);
	
	//Obtengo la puntuación total
	var url = "http://" + host + "/index.php?view=highscore&showMe=1";
	
	GM_xmlhttpRequest ({
		method: "GET",
		url: url,
		headers: {
			"User-agent": "Mozilla/5.0",
			"Accept": "text/html",
		},
		onload: function (respuesta){
			var pagina = document.implementation.createDocument ("", "", null);
			var html = document.createElement ("html");
			html.innerHTML = respuesta.responseText;
			pagina.appendChild (html);

			var fila = pagina.getElementsByClassName ("own")[0];
			if (!fila){
				pagina.getElementsByClassName ("alt own")[0];
			}
			
			document.getElementById ("menuPuntuacion").textContent = fila.childNodes[7].textContent;
			
			//Obtengo las generales
			url = "http://" + host + "/index.php";
			var boton = pagina.getElementById ("offset").parentNode.childNodes[7].value;
			
			GM_xmlhttpRequest ({
				method: "POST",
				url: url,
				data: "highscoreType=army_score_main&offset=-1&view=highscore&submit=" + boton + "&searchUser=&view=highscore",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function (respuesta){
					var pagina = document.implementation.createDocument ("", "", null);
					var html = document.createElement ("html");
					html.innerHTML = respuesta.responseText;
					pagina.appendChild (html);
					
					var fila = pagina.getElementsByClassName ("own")[0];
					if (!fila){
						pagina.getElementsByClassName ("alt own")[0];
					}

					document.getElementById ("menuGenerales").textContent = fila.childNodes[7].textContent;
				}
			});
		}
	});
}

/**
 * Crea un panel para poder desplegar unidades.
 */
function creaPanelTransporte (){
	/**
	 * Crea la lista de ciudades.
	 * @return contenido para añadir al panel.
	 */
	function creaContenido (){
		var contenido = "<ul id='listaIconosTransportar'>";
		var ciudades = GM_getValue (server + "ordenCiudades").split ("#");
		var top = 3;

		for (var i=0; i<ciudades.length; i++){
			var ciudad = ciudades[i].split ("|")[0];
			
			if (ciudad != Ciudad.getNombre ()){
				contenido += "<li style='padding: 5px 0 4px 5px;'>";
				contenido += "<span>" + ciudad + "</span>";
				contenido +=	"<img title='" + Lang["moveResources"] + "' style='cursor: pointer; position: absolute; right: 65px; top: " + top + "px;' src='" + Img.MENU_TRANSPORTE_RECURSOS + "'/>" +
								"<img title='" + Lang["moveTroops"] + "' style='cursor: pointer; position: absolute; right: 36px; top: " + top + "px;' src='" + Img.MENU_TRANSPORTE_TROPAS + "'/>" +
								"<img title='" + Lang["moveFleets"] + "' style='cursor: pointer; position: absolute; right: 7px; top: " + top + "px;' src='" + Img.MENU_TRANSPORTE_FLOTAS + "'/>";
				contenido += "</li>";
				
				top += 25;
			}
		}
		
		contenido += "</ul>";
		
		return contenido;
	}
	
	/**
	 * Calcula la dirección donde redirigir la página para enviar unidades.
	 * @param ciudad ciudad a la que se quieren enviar unidades.
	 * @param n 0 si se transportan recursos, 1, si se envian tropas y 2 si se envian flotas.
	 */
	function calculaDireccion (ciudad, n){
		var url = "http://" + host + "/index.php?";
		switch (n){
			case 0:
				url += "view=transport&destinationCityId=";
				break;
			case 1:
				url += "view=deployment&deploymentType=army&destinationCityId=";
				break;
			case 2:
				url += "view=deployment&deploymentType=fleet&destinationCityId=";
				break;
		}
		
		url += GM_getValue (server + ciudad).split ("#")[4];
		
		window.open (url, "_self");
	}

	var capa = document.createElement ("div");
	capa.id = "menuPanelTransporte";
	capa.className = "dynamic";
	
	if (panelesScript[1] == "1"){
		var abierto = true;
		var imagen = Img.PANEL_BOTON_MINIMIZAR;
		var vis = "visible";
		var hei = "auto";
	}else{
		var abierto = false;
		var imagen = Img.PANEL_BOTON_MAXIMIZAR;
		var vis = "hidden";
		var hei = "0";
	}
	
	var contenido = creaContenido ();
	
	capa.innerHTML =	"<h3 class='header'>" + Lang["moveUnits"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
						"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" + contenido + "</div>" +
						"<div class='footer'></div>";
	
	var panelPuntos = document.getElementById ("menuPanelPuntos");
	if (panelPuntos){
		colocaDetras (capa, panelPuntos);
	}else{
		colocaDetras (capa, document.getElementById ("menuPaneles"));
	}
	
	document.getElementById ("menuPanelTransporte").getElementsByTagName ("img")[0].addEventListener (
		"click",
		function (){
			var contenido = this.parentNode.parentNode.childNodes[1];
			
			if (abierto){
				abierto = false;
				this.src = Img.PANEL_BOTON_MAXIMIZAR;
				contenido.style.visibility = "hidden";
				contenido.style.height = "0";
				panelesScript[1] = 0;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}else{
				abierto = true;
				this.src = Img.PANEL_BOTON_MINIMIZAR;
				contenido.style.height = "auto";
				contenido.style.visibility = "visible";
				panelesScript[1] = 1;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}
		},
		false
	);

	//Añado listeners a todos los iconos
	var lista = document.getElementById ("listaIconosTransportar");
	for (var i=0; i<lista.childNodes.length; i++){
		var img = lista.childNodes[i].getElementsByTagName ("img");
		img[0].addEventListener ("click", function (){ calculaDireccion (this.parentNode.childNodes[0].textContent, 0); }, false);
		img[1].addEventListener ("click", function (){ calculaDireccion (this.parentNode.childNodes[0].textContent, 1); }, false);
		img[2].addEventListener ("click", function (){ calculaDireccion (this.parentNode.childNodes[0].textContent, 2); }, false);
	}
}

/**
 * Crea un panel para poder cambiar la imagen de la ciudad.
 */
function creaPanelImagen (){
	var capa = document.createElement ("div");
	capa.id = "menuPanelImagen";
	capa.className = "dynamic";
	
	if (panelesScript[2] == "1"){
		var abierto = true;
		var imagen = Img.PANEL_BOTON_MINIMIZAR;
		var vis = "visible";
		var hei = "auto";
	}else{
		var abierto = false;
		var imagen = Img.PANEL_BOTON_MAXIMIZAR;
		var vis = "hidden";
		var hei = "0";
	}
	
	capa.innerHTML = "<h3 class='header'>" + Lang["cityImage"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
					"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" +
						"<table style='width: 100%;'>" +
							"<tr>" +
								"<td style='padding-left: 5px;'>" + Ciudad.getNombre () + "</td>" +
								"<td style='padding-right: 5px; text-align: right'>" + Lang["cityLevel"] + ": <select id='selectImagen'></select></td>" +
							"</tr>" +
						"</table>" +
					"</div>" +
					"<div class='footer'></div>";
					
	var panel = document.getElementById ("menuPanelTransporte");
	if (panel){
		colocaDetras (capa, panel);
	}else{
		panel = document.getElementById ("menuPanelPuntos");
		if (panel){
			colocaDetras (capa, panel);
		}else{
			colocaDetras (capa, document.getElementById ("menuPaneles"));
		}
	}
	
	document.getElementById ("menuPanelImagen").getElementsByTagName ("img")[0].addEventListener (
		"click",
		function (){
			var contenido = this.parentNode.parentNode.childNodes[1];
			
			if (abierto){
				abierto = false;
				this.src = Img.PANEL_BOTON_MAXIMIZAR;
				contenido.style.visibility = "hidden";
				contenido.style.height = "0";
				panelesScript[2] = 0;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}else{
				abierto = true;
				this.src = Img.PANEL_BOTON_MINIMIZAR;
				contenido.style.height = "auto";
				contenido.style.visibility = "visible";
				panelesScript[2] = 1;
				GM_setValue (server + "paneles", panelesScript.join ("#"));
			}
		},
		false
	);
	
	//Consultamos el nivel de la ciudad
	var filtro = new RegExp (/\d+/);
	var nivel = filtro.exec (document.getElementById ("position0").childNodes[3].title);
	
	//Actualizo el nivel original (y el nivel modificado si es el caso)
	Ciudad.setNivelOriginal (nivel);
	
	var select = document.getElementById ("selectImagen");
	for (var i=1; i<=24; i++){
		var op = new Option (i, i);
		if (i == Ciudad.getNivelModificado ()){
			op.selected = true;
		}
		select.add (op, null);
	}
	
	addGlobalStyle (
		"#city #container .phase" + Ciudad.getNivelOriginal () + " {" +
			"background-image: url(skin/img/city/city_level" + Ciudad.getNivelModificado () + ".jpg);" +
		"}"
	)

	select.addEventListener ("change",
							function (){
								Ciudad.setNivelModificado (this.value);
								window.location.reload ();
							},
							false);
}

/**
 * Crea botones para aumentar de 500 en 500 los recursos para transportar.
 * También crea botones de reset.
 */
function creaBotonesRecursos (){
	/**
	 * Suma puntos en los recursos para ser transportados.
	 * @param num número de recursos a sumar.
	 * @param boton botón que se ha apretado.
	 * @param i número de hijo del nodo padre.
	 */
	function sumaPuntos (num, boton, i){
		boton.blur ();

		var input = document.getElementsByClassName ("resourceAssign")[0].childNodes[i].childNodes[5];
		
		var n = parseInt (input.value);
		if (!n){
			n = 0;
		}
		input.value = n + num;

		//Simulamos key up para actualizar el valor
		var evt = document.createEvent ("KeyEvents");
		evt.initKeyEvent ("keyup", true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent (evt);

	}

	/**
	 * Pone a 0 los puntos de los recursos para ser transportados.
	 * @param boton botón que se ha apretado.
	 * @param i número de hijo del nodo padre.
	 */
	function resetPuntos (boton, i){
		boton.blur ();

		var input = document.getElementsByClassName ("resourceAssign")[0].childNodes[i].childNodes[5];
		
		input.value = 0;

		//Simulamos keyup para actualizar el valor
		var evt = document.createEvent ("KeyEvents");
		evt.initKeyEvent ("keyup", true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent (evt);
	}

	/**
	 * Pone el máximo de los recursos.
	 * @param boton botón que se ha apretado.
	 * @param i número de hijo del nodo padre.
	 */
	function maxPuntos (boton, i){
		var input = document.getElementsByClassName ("resourceAssign")[0].childNodes[i].childNodes[5];
		input.style.color = "#FFFBF2";
		input.value = 1000000000;

		//Simulamos keyup para actualizar el valor
		var evt = document.createEvent ("KeyEvents");
		evt.initKeyEvent ("keyup", true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent (evt);
		
		input.style.color = "#000";
	}

	/**
	 * Crea y añade los botones de +500 y Reset.
	 * @param barras elemento donde se añaden los botones.
	 * @param i número de hijo de barras donde añadir los botones.
	 */
	function creaBotones (barras, i){
		var boton1 = document.createElement ("input");
		boton1.setAttribute ("type", "button");
		boton1.setAttribute ("class", "button");
		boton1.setAttribute ("value", "+500");
		boton1.style.position = "absolute";
		boton1.style.left = "515px";
		boton1.style.bottom = "-4px";
		
		var boton2 = document.createElement ("input");
		boton2.setAttribute ("type", "button");
		boton2.setAttribute ("class", "button");
		boton2.setAttribute ("value", "+1000");
		boton2.style.position = "absolute";
		boton2.style.left = "584px";
		boton2.style.bottom = "-4px";
		
		var boton3 = document.createElement ("span");
		boton3.style.position = "absolute";
		boton3.style.left = "410px";
		boton3.style.top = "32px";
		boton3.style.width = "126px";
		boton3.innerHTML = "<div><center><span style='cursor: pointer;'><b><u>" + Lang["max"] + "</u></b></span></center></div>";
		
		var boton4 = document.createElement ("span");
		boton4.style.position = "absolute";
		boton4.style.left = "410px";
		boton4.style.top = "-10px";
		boton4.style.width = "126px";
		boton4.innerHTML = "<div><center><span style='cursor: pointer;'><b><u>reset</u></b></span></center></div>";

		boton1.addEventListener ("click", function (){ sumaPuntos (500, this, i); }, false);
		boton2.addEventListener ("click", function (){ sumaPuntos (1000, this, i); }, false);
		boton3.childNodes[0].childNodes[0].childNodes[0].addEventListener ("click", function (){ maxPuntos (this, i); }, false);
		boton4.childNodes[0].childNodes[0].childNodes[0].addEventListener ("click", function (){ resetPuntos (this, i); }, false);
		
		barras.childNodes[i].appendChild (boton1);
		barras.childNodes[i].appendChild (boton2);
		barras.childNodes[i].appendChild (boton3);
		barras.childNodes[i].appendChild (boton4);
	}

	//Botones en el transporte
	if (pagina == "transport"){
		var barras = document.getElementsByClassName ("resourceAssign")[0];
		
		if (barras){
			barras.childNodes[1].style.marginTop = "15px";
			for (var i=1; i<barras.childNodes.length - 1; i += 2){
				barras.style.marginTop = "10px";
				barras.childNodes[i].style.left = "-76px";
				barras.childNodes[i].style.marginBottom = "26px";
				barras.childNodes[i].childNodes[5].style.top = "8px";
				
				creaBotones (barras, i);
			}
		}
	}else if (pagina == "colonize"){
		//Botones en crear una colonia
		var barras = document.getElementsByClassName ("resourceAssign")[0];
		
		if (barras){
			barras.childNodes[1].style.marginTop = "15px";
			for (var i=1; i<barras.childNodes.length - 2; i += 2){
				barras.style.marginTop = "10px";
				barras.childNodes[i].style.left = "-76px";
				barras.childNodes[i].style.marginBottom = "26px";
				barras.childNodes[i].childNodes[5].style.top = "8px";
				
				creaBotones (barras, i);
			}
			
			var barra = barras.childNodes[barras.childNodes.length - 2];
			barra.style.position = "relative";
			barra.style.right = "70px";
		}
	}
}

/**
 * Si el resultado (ingresos - manutencion) es negativo se pone de color rojo.
 * También añade el oro total ganado entre todas las ciudades.
 */
function informaOroMinas (){
	/**
	 * Si el resultado (ingresos - manutencion) es negativo se pone de color rojo.
	 * También añade el oro total de las ciudades.
	 * @param oro oro = oro total - oro ciudad actual.
	 * @param resultado ingresos - manutencion.
	 */
	function compruebaOro (oro, resultado){
		if (parseInt (resultado.textContent) < 0){
			resultado.style.color = "#FF0000";
			resultado.style.fontWeight = "bold";
		}else{
			resultado.style.color = "#612D04";
			resultado.style.fontWeight = "normal";
		}

		document.getElementById ("oroCiudades").textContent = transformaCifra (parseInt (resultado.textContent) + oro);
	}

	if (pagina == "resource" || pagina == "tradegood" || pagina == "academy"){
		//oro = oro total - oro ciudad actual
		var oro;
	
		var resultado = document.getElementById ("valueWorkCosts");
		if (parseInt (resultado.textContent) < 0){
			resultado.style.color = "#FF0000";
			resultado.style.fontWeight = "bold";
		}
	
		//Añado listener en la barra
		var barra = document.getElementById ("sliderthumb");
		barra.addEventListener ("DOMAttrModified", function (){ compruebaOro (oro, resultado); }, false);
		
		//Añado listener en el input
		var input;
		var panel;
		if (pagina == "academy"){
			input = document.getElementById ("inputScientists");
			panel = document.getElementById ("setScientists");
		}else{		
			input = document.getElementById ("inputWorkers");
			panel = document.getElementById ("setWorkersBox");
		}
		input.addEventListener ("keyup", function (){ compruebaOro (oro, resultado); }, false);

		//Cambio diseño
		var tmp = panel.getElementsByClassName ("gain")[0];
		tmp.style.position = "absolute";
		tmp.style.left = "100px";
		tmp = panel.getElementsByClassName ("costs")[0]
		tmp.style.position = "absolute";
		tmp.style.left = "350px";
		tmp.childNodes[1].style.position = "relative";
		tmp.childNodes[1].style.bottom = "2px";
		tmp.childNodes[4].style.position = "relative";
		tmp.childNodes[4].style.bottom = "2px";
		
		var eti = document.createElement ("span");
		eti.style.position = "absolute";
		eti.style.top = "25px";
		eti.style.left = "470px";
		eti.style.zIndex = "1000";
		eti.innerHTML = "<img src='http://" + host + "/skin/layout/sigma.gif'/><span style='position: relative; left: 10px; bottom: 2px;' id='oroCiudades'>...</span>";
		colocaDelante (eti, panel.getElementsByTagName ("ul")[0]);
		
		//Consulto valores para hacer los cálculos
		var url = document.getElementById ("globalResources").childNodes[3].childNodes[4].childNodes[0].href;
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {
						"User-agent": "Mozilla/5.0",
						"Accept": "text/html",
					 },
			onload: function (respuesta){
				var pagina = document.implementation.createDocument ("", "", null);
				var html = document.createElement ("html");
				html.innerHTML = respuesta.responseText;
				pagina.appendChild (html);
				
				var ciudades = pagina.getElementById ("balance").childNodes[1];
				var stop = false;
				var i = 2;

				while (i<=ciudades.childNodes.length - 6 && !stop){
					if (ciudades.childNodes[i].childNodes[1].textContent == Ciudad.getNombre ()){
						stop = true;
						oroCiudad = parseInt (ciudades.childNodes[i].childNodes[7].textContent.replace (/[.,]/g, ""));
					}
					
					i += 2;
				}

				var oroCiudades = ciudades.childNodes[ciudades.childNodes.length - 4].childNodes[7].textContent.replace (/[.,]/g, "");
				document.getElementById ("oroCiudades").textContent = transformaCifra (oroCiudades);
				
				oro = oroCiudades - oroCiudad;
			}
		});
	}
}

/**
 * Añade información útil en las minas.
 */
function creaInfoMinas (){
	/**
	 * Consulta el número de trabajadores máximo de un nivel.
	 * @param lvl nivel del aserradero/mina.
	 * @param b1 true si es aserradero, sinó, false.
	 * @param b2 true si hay investigación, sinó, false.
	 * @return número máximo de trabajadores.
	 */
	function getMaxTrabajadores (lvl, b1, b2){
		var aserradero = BaseDatos.aserradero.normal;
		var aserraderoInves = BaseDatos.aserradero.investigacion;
		
		var mina = BaseDatos.mina.normal;
		var minaInves = BaseDatos.mina.investigacion;
		if (b1){
			if (lvl > BaseDatos.aserradero.maxLvl){
				return Lang["notAvailable"];
			}else{
				if (b2){
					return aserraderoInves[lvl - 1];
				}else{
					return aserradero[lvl - 1];
				}
			}
		}else{
			if (lvl > BaseDatos.mina.maxLvl){
				return Lang["notAvailable"];
			}else{
				if (b2){
					return minaInves[lvl - 1];
				}else{
					return mina[lvl - 1];
				}
			}
		}
	}

	if (pagina == "resource" || pagina == "tradegood"){
		var div = document.getElementsByClassName ("resources");

		if (!div[1]) return;

		//Madera restante
		var num = parseInt (div[0].childNodes[1].childNodes[1].textContent.replace (/[.,]/g, "")) - parseInt (div[1].childNodes[1].childNodes[1].textContent.replace (/[.,]/g, ""));
		var cad = transformaCifra (num);
		
		var titulo = document.createElement ("h4");
		titulo.innerHTML = Lang["remainingResources"];
		
		var form = document.getElementsByClassName ("content")[0].getElementsByTagName ("form")[0];
		
		colocaDelante (titulo, form);
		
		var ul = document.createElement ("ul");
		ul.setAttribute ("class", "resources");
		ul.innerHTML = "<li class='wood'>" + cad + "</li>";
		colocaDelante (ul, form);
		
		//Trabajadores máximos
		if (pagina == "resource"){
			var aserradero = true;
		}else{
			var aserradero = false;
		}

		var num = parseInt (document.getElementsByClassName ("buildingLevel")[0].childNodes[1].textContent);
		var maxLvl = getMaxTrabajadores (num, aserradero, false);
		var maxLvlSig = getMaxTrabajadores (num + 1, aserradero, false);
		var maxLvlInves = getMaxTrabajadores (num, aserradero, true);
		var maxLvlSigInves = getMaxTrabajadores (num + 1, aserradero, true);
		
		var div = document.getElementsByClassName ("buildingLevel")[0];
		div.style.height = "145px";
		
		var lvl = div.childNodes[1].textContent;
		
		var info = document.createElement ("div");
		info.style.fontSize = "10px";
		info.style.fontWeight = "normal";
		info.innerHTML = Lang["maxWorkers"] +
						 "<br/><br/><center><table>" +
							"<tr>" +
								"<td width='60px'><center><u>" + Lang["cityLevel"] + " " + lvl + "</u></center></td>" +
								"<td width='30px'></td>" +
								"<td width='60px'><center><u>" + Lang["cityLevel"] + " " + (parseInt (lvl) + 1) + "</u></center></td>" +
							"</tr>" +
							"<tr>" +
								"<td style='font-size: 12px;'><center><b>" + maxLvl + "</b></center></td>" +
								"<td><img src='" + Img.FLECHA_TIPO_2 + "'/></td>" +
								"<td style='font-size: 12px;'><center><b>" + maxLvlSig + "</b></center></td>" +
							"</tr>" +
							"<tr>" +
								"<td style='font-size: 10px;'><center>(" + maxLvlInves + ")</center></td>" +
								"<td></td>" +
								"<td style='font-size: 10px;'><center>(" + maxLvlSigInves + ")</center></td>" +
							"</tr>" +
						 "</table></center>" +
						 "<img title='" + Lang["helpingHands"] + "' style='position: relative; bottom: 20px; right: 75px;' src='" + Img.MISC_INFO + "'/>";
		
		div.appendChild (info);
	}
}

/**
 * Añade links directos al aserradero y mina en la barra de recursos
 * y coloca el icono del bien de lujo de la ciudad en la lista de ciudades.
 */
function creaLinkMinas (){
	/**
	 * Actualiza la variable ordenCiudades con el bien de lujo de la ciudad.
	 * @param nodo tipo de bien de lujo de la ciudad.
	 */
	function actualizaVariable (nodo){
		var cad = GM_getValue (server + "ordenCiudades").split ("#");
		
		var stop = false;
		var i = 0;
		while (i<cad.length && !stop){
			if (cad[i].split ("|")[0] == Ciudad.getNombre ()){
				cad[i] = Ciudad.getNombre () + "|" + nodo;
				stop = true;
			}
			
			i++;
		}
		
		GM_setValue (server + "ordenCiudades", cad.join ("#"));
	}
	
	function rellena (){
		var cad = GM_getValue (server + "ordenCiudades").split ("#");
		var imgCiudades = document.getElementsByClassName ("ciudadesIcono");
		
		for (var i=0; i<imgCiudades.length; i++){
			var j = 0;
			var stop = false;
			var icono = "";
			
			while (j<cad.length && !stop){
				if (imgCiudades[i].title == cad[j].split ("|")[0]){
					stop = true;
					switch (parseInt (cad[j].split ("|")[1])){
						case 7:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.RECURSO_VINO + "'/>";
							break;
						
						case 9:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.RECURSO_MARMOL + "'/>";
							break;
							
						case 11:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.RECURSO_CRISTAL + "'/>";
							break;
							
						case 13:
							icono = "<img style='width: 20px; position: relative; top: 1px;' src='" + Img.RECURSO_AZUFRE + "'/>";
							break;
					}
				}
				
				j++;
			}
			
			imgCiudades[i].innerHTML = icono;
		}
	}
	
	var id = document.getElementsByClassName ("viewIsland")[0].firstChild.href.split ("id=")[1];
	var linkAserradero = "http://" + host + "/index.php?view=resource&type=resource&id=" + id;
	var nodoAserradero = document.getElementById ("cityResources").childNodes[2];
	
	if (nodoAserradero){
		nodoAserradero = nodoAserradero.childNodes[5].childNodes[2];
		nodoAserradero.style.cursor = "pointer";
		nodoAserradero.style.textDecoration = "underline";
		nodoAserradero.addEventListener ("click",
										function (){
											window.open (linkAserradero, "_self");
										},
										false);
	}
	
	var nodo = Ciudad.getMina ();

	if (nodo == -1){
		var url = document.getElementsByClassName ("viewIsland")[0].firstChild.href;
		
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {
						"User-agent": "Mozilla/5.0",
						"Accept": "text/html",
					 },
			onload: function (respuesta){
				var isla = document.implementation.createDocument ("", "", null);
				var html = document.createElement ("html");
				html.innerHTML = respuesta.responseText;
				isla.appendChild (html);
				
				var mina = isla.getElementById ("tradegood").className.split (" ")[0];
				switch (mina){
					case "wine":
						nodo = 7;
						break;
					
					case "marble":
						nodo = 9;
						break;
						
					case "crystal":
						nodo = 11;
						break;
						
					case "sulfur":
						nodo = 13;
						break;
				}

				Ciudad.setMina (nodo);
			
				var linkMina = "http://" + host + "/index.php?view=tradegood&type=tradegood&id=" + id;
				var nodoMina = document.getElementById ("cityResources").childNodes[2];
				
				if (nodoMina){
					nodoMina = nodoMina.childNodes[nodo].childNodes[2];
					nodoMina.style.cursor = "pointer";
					nodoMina.style.textDecoration = "underline";
					nodoMina.addEventListener ("click",
												function (){
													window.open (linkMina, "_self");
												},
												false);
				}
				
				//Actualizo la variable ordenCiudades
				actualizaVariable (nodo);
				
				//Leo el contenido de la variable ordenCiudades y coloco los iconos
				rellena ();
			}
		});
	}else{
		var linkMina = "http://" + host + "/index.php?view=tradegood&type=tradegood&id=" + id;
		var nodoMina = document.getElementById ("cityResources").childNodes[2];
		
		if (nodoMina){
			nodoMina = nodoMina.childNodes[nodo].childNodes[2];
			nodoMina.style.cursor = "pointer";
			nodoMina.style.textDecoration = "underline";
			nodoMina.addEventListener ("click",
										function (){
											window.open (linkMina, "_self");
										},
										false);
		}

		//Leo el contenido de la variable ordenCiudades y coloco los iconos
		rellena ();
	}
}

/**
 * Cambia el diseño del cuartel.
 */
function cuartelVistaAvanzada (){
	/**
	 * Cambia el tag h4 por un span.
	 * @param i número del nodo de la lista de unidades.
	 */
	function cambiaTag (i){
		var nodo = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].childNodes[1];
		var span = document.createElement ("span");
		span.textContent = nodo.textContent;
		span.style.fontSize = "14px";
		span.style.fontWeight = "bold";
		span.style.lineHeight = "22px";
		span.style.marginBottom = "2px";
		span.style.marginLeft = "130px";
		
		colocaDetras (span, nodo);
		nodo.parentNode.removeChild (nodo);
	}
	
	/**
	 * Mueve la capa con la descripción de la unidad.
	 * @param e Event.
	 * @param div capa con la descripción.
	 */
	function mueveDescripcion (e, div){
		div.style.display = "inline";
		div.style.left = e.clientX + 22 + "px";
		div.style.top = e.clientY + 17 + "px";
	}
	
	/**
	 * Esconde la capa con la descripción de la unidad.
	 * @param div capa con la descripción.
	 */
	function escondeDescripcion (div){
		div.style.display = "none";
	}
	
	/**
	 * Crea el span de la descripción.
	 * @param i número del nodo de la lista de unidades.
	 * @return span creado.
	 */
	function creaSpanDescripcion (i){
		var desc = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("p")[0].textContent;
		
		var div = document.createElement ("div");
		div.className = "capaDesc";
		div.style.zIndex = "1000";
		div.style.width = "270px";
		div.style.position = "fixed";
		div.style.textAlign = "justify";
		div.style.backgroundColor = "#FCF4DE";
		div.style.padding = "10px";
		div.style.display = "none";
		div.innerHTML = desc + "<div style='position: absolute; top: -10px; left: -5px; width: 300px; height: 5px;'><img src='" + Img.DESC_TOP + "'/></div>" +
						"<div style='1000; position: absolute; top: 2px; left: -5px; width: 12px; height: 100%; background: transparent url(" + Img.DESC_LEFT + ") repeat-y scroll 0 0;'></div><div style='position: absolute; top: 2px; right: -5px; width: 12px; height: 100%; background: transparent url(" + Img.DESC_RIGHT + ") repeat-y scroll 0 0;'></div>" +
						"<div style='position: absolute; bottom: 2px; left: -5px; width: 300px; height: 5px;'><img src='" + Img.DESC_BOTTOM + "'/></div>";
		
		unidades.childNodes[i].appendChild (div);
	
		var descLink = document.createElement ("span");
		descLink.textContent = Lang["description"];
		descLink.style.position = "relative";
		descLink.style.left = "28px";
		descLink.style.fontSize = "11px";
		descLink.style.cursor = "default";
		descLink.style.padding = "3px 0 3px 0";
		descLink.addEventListener ("mousemove",
									function (e){
										this.style.textDecoration = "underline";
										mueveDescripcion (e, div);
									},
									false);
		descLink.addEventListener ("mouseout",
									function (){
										this.style.textDecoration = "none";
										escondeDescripcion (div);
									},
									false);
		
		return descLink;
	}
	
	/**
	 * Consulta el bonus de la muralla.
	 * @param nivelMuralla nivel de la muralla.
	 */
	function consultaBonusMuralla (nivelMuralla){
		nivelMuralla = parseInt (nivelMuralla);
		var n;
		
		if (nivelMuralla < nivelIntendencia){
			n = ((nivelMuralla*nivelMuralla)/nivelIntendencia)/10 + 1;
		}else{
			n = nivelMuralla/10 + 1;
		}

		return n;
	}
	
	/**
	 * Valida el input de los boquetes.
	 * @param input input.
	 * @param ataqueEspecial ataque de la unidad con la habilidad especial.
	 * @param b true si se valida la unidad, false si se valida el total.
	 */
	function valida (input, ataqueEspecial, b){
		var ok;
		
		if (input.value == "" || isNaN (input.value) || parseInt (input.value) < 0 || parseInt (input.value) > 30){
			input.style.border = "solid thin #FFB9BB";
			input.style.backgroundColor = "#FBE3E4";
			ok = false;
		}else{
			input.style.border = "solid thin #BC575D";
			input.style.backgroundColor = "#FFF";
			ok = true;
		}
		
		if (b){
			var nodoMu = input.parentNode.getElementsByClassName ("ataqueMuralla")[0].childNodes[0];
		}else{
			var nodoMu = document.getElementById ("ataqueBoquetes");
		}
		
		if (ok){
			nodoMu.textContent = Math.round((parseInt (input.value)/10 + 1)*ataqueEspecial*10)/10;
		}else{
			nodoMu.textContent = ataqueEspecial;
		}
	}
	
	/**
	 * Coloca la etiqueta cuando el cursor pasa por encima del input.
	 * @param e Event.
	 * @param eti etiqueta con la descripción.
	 */
	function mueveEti (e, eti){
		eti.style.display = "inline";
		eti.style.left = e.clientX + 15 + "px";
		eti.style.top = e.clientY + 10 + "px";
	}
	
	/**
	 * Esconde la etiqueta al salir del input.
	 * @param eti etiqueta.
	 */
	function escondeEti (eti){
		eti.style.display = "none";
	}
	
	/**
	 * Crea la información de la unidad.
	 * @param basico true si la vista es básica, false si es avanzada.
	 */
	function creaInfo (basico){
		var tierra = false;
		var anchoBasico;
		var anchoAvanzado;
		var left;
		
		if (pagina == "barracks"){
			tierra = true;
			left = 180;
			anchoBasico = 240;
			anchoAvanzado = 225;
		}else{
			left = 240;
			anchoBasico = 240;
			anchoAvanzado = 150;
		}
		
		addGlobalStyle (
			".contentBox01h .tablaAvanzada {" +
				"position: absolute;" +
				"left: " + left + "px;" +
				"top: 75px;" +
				"width: " + anchoAvanzado + "px;" +
				"line-height: 18px;" +
				"cursor: default;" +
			"}" +
			
			".contentBox01h .tablaBasica {" +
				"position: absolute;" +
				"left: 225px;" +
				"top: 76px;" +
				"width: " + anchoBasico + "px;" +
				"line-height: 18px;" +
				"cursor: default;" +
			"}" +
			
			"#mainview .contentBox01h .content table td {" +
				"padding-top: 0;" +
			"}"
		);
		
		var unidad = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].src.split ("/");
		if (tierra){
			unidad = unidad[unidad.length-1].split ("_")[0];
			var ataque = BaseDatos.unidades[unidad].ataque;
			var defensa = BaseDatos.unidades[unidad].defensa;
			var resistencia = BaseDatos.unidades[unidad].resistencia;
		}else{
			unidad = unidad[unidad.length-1].split ("_")[1];
			var ataque = BaseDatos.barcos[unidad].ataque;
			var defensa = BaseDatos.barcos[unidad].defensa;
			var resistencia = BaseDatos.barcos[unidad].resistencia;
		}

		//Bonus
		var ataqueBonus = 0;
		var defensaBonus = 0;
		
		var icono = unidades.childNodes[i].getElementsByClassName ("att-icon")[0];
		if (icono){
			var img = icono.src.split ("/");
			img = img[img.length-1][10];
			if (tierra){
				ataqueBonus = BaseDatos.unidades[unidad].bonusAtaque[3 - parseInt (img)];
			}else{
				ataqueBonus = BaseDatos.barcos[unidad].bonusAtaque[3 - parseInt (img)];
			}
		}
		
		icono = unidades.childNodes[i].getElementsByClassName ("def-icon")[0];
		if (icono){
			var img = icono.src.split ("/");
			img = img[img.length-1][11];
			if (tierra){
				defensaBonus = BaseDatos.unidades[unidad].bonusDefensa[3 - parseInt (img)];
			}else{
				defensaBonus = BaseDatos.barcos[unidad].bonusDefensa[3 - parseInt (img)];
			}
		}
		
		//Habilidad especial
		var ataqueEspecial = 1;
		var defensaEspecial = 1;
		
		if (tierra){
			if (BaseDatos.unidades[unidad].especial == 0){
				ataqueEspecial = 1.3;
			}else if (BaseDatos.unidades[unidad].especial == 1){
				defensaEspecial = 1.3;
			}
		}else{
			if (BaseDatos.barcos[unidad].especial == 0){
				ataqueEspecial = 1.3;
			}else if (BaseDatos.barcos[unidad].especial == 1){
				defensaEspecial = 1.3;
			}
		}
		
		//Muralla
		if (tierra){
			var nivelMuralla = Ciudad.getMuralla ();
			var ataqueMuralla = 1;
			var defensaMuralla = 1;

			if (nivelMuralla != 0 && tierra){
				defensaMuralla = nivelMuralla/10 + 1;
			}
		}
		
		//Total
		var totalAtaque = ataque + ataqueBonus;
		var totalDefensa = defensa + defensaBonus;
		
		var totalAtaqueEspecial = Math.round(totalAtaque*ataqueEspecial*10)/10;
		var totalDefensaEspecial = Math.round(totalDefensa*defensaEspecial*10)/10;
		
		if (tierra){
			var totalAtaqueMuralla = Math.round(totalAtaque*ataqueEspecial*10)/10;
			var totalDefensaMuralla = Math.round(totalDefensa*defensaEspecial*defensaMuralla*10)/10;
		};

		//Creo la información avanzada
		var tabla = document.createElement ("table");
		tabla.className = "tablaAvanzada";
		var contenido = "<tr style='line-height: 20px;'>" +
							"<td width='40px'></td>" +
							"<td width='35px'></td>" +
							"<td width='35px'></td>" +
							"<td width='40px'><img src='" + Img.unidadesEspecial + "' title='" + Lang["bonusSpecial"] + ": +30%'/></td>";					
		if (tierra){
			contenido +=	"<td width='35px'></td>" +
							"<td width='40px'><img src='" + Img.unidadesMuralla + "' title='" + Lang["bonusWall"] + ": +" + nivelMuralla*10 + "%'/></td>";
		}
		contenido +=	"</tr>" + 
						"<tr>" +
							"<td><img src='" + Img.unidadesAtaque + "' title='" + Lang["attack"] + "'/></td>" +
							"<td title='" + ataque + " + " + ataqueBonus + "' class='ataqueBasico'><b>" + totalAtaque + "</b></td>" +
							"<td><img src='" + Img.FLECHA_TIPO_2 + "'/></center></td>" +
							"<td class='ataqueEspecial'><b>" + totalAtaqueEspecial + "</b></td>";
		if (tierra){
			contenido +=	"<td><img src='" + Img.FLECHA_TIPO_2 + "'/></center></td>" +
							"<td class='ataqueMuralla'><b>" + totalAtaqueMuralla + "</b></td>";
		}
		contenido +=	"</tr>" +
						"<tr>" +
							"<td><img src='" + Img.unidadesDefensa + "' title='" + Lang["defense"] + "'/></td>" +
							"<td title='" + defensa + " + " + defensaBonus + "' class='defensaBasica'><b>" + totalDefensa + "</b></td>" +
							"<td><img src='" + Img.FLECHA_TIPO_2 + "'/></td>" +
							"<td class='defensaEspecial'><b>" + totalDefensaEspecial + "</b></td>";
		if (tierra){
			contenido +=	"<td><img src='" + Img.FLECHA_TIPO_2 + "'/></td>" +
							"<td class='defensaMuralla'><b>" + totalDefensaMuralla + "</b></td>";
		}
		contenido +=	"</tr>" +
						"<tr>" +
							"<td><img src='" + Img.unidadesResistencia + "' title='" + Lang["endurance"] + "'/></td>" +
							"<td class='resistencia'><b>" + resistencia + "</b></td>" +
						"</tr>";
		
		tabla.innerHTML = contenido;

		//Creo la información básica
		var tabla2 = document.createElement ("table");
		tabla2.className = "tablaBasica";
		tabla2.innerHTML =	"<tr>" +
								"<td width='30px'><img src='" + Img.unidadesAtaque + "' title='" + Lang["attack"] + "'/></td>" +
								"<td width='50px' title='" + ataque + " + " + ataqueBonus + "'><b>" + totalAtaque + "</b></td>" +
								"<td width='30px'><img src='" + Img.unidadesDefensa + "' title='" + Lang["defense"] + "'/></td>" +
								"<td width='50px' title='" + defensa + " + " + defensaBonus + "'><b>" + totalDefensa + "</b></td>" +
								"<td width='30px'><img src='" + Img.unidadesResistencia + "' title='" + Lang["endurance"] + "'/></td>" +
								"<td width='50px'><b>" + resistencia + "</b></td>" +
							"</tr>";
		
		if (basico){
			tabla2.style.display = "inline";
			tabla.style.display = "none";
		}else{
			tabla2.style.display = "none";
			tabla.style.display = "inline";
		}
		
		colocaDetras (tabla, bonus);
		colocaDetras (tabla2, bonus);
		
		//Actualizo variables acumulativas de puntos
		var num = parseInt (tabla.parentNode.getElementsByClassName ("unitcount")[0].childNodes[1].textContent);
		a_a += parseFloat (tabla.getElementsByClassName ("ataqueEspecial")[0].textContent)*num;
		a_d += parseFloat (tabla.getElementsByClassName ("defensaBasica")[0].textContent)*num;
		d_a += parseFloat (tabla.getElementsByClassName ("ataqueBasico")[0].textContent)*num;
		if (pagina == "barracks"){
			d_d += parseFloat (tabla.getElementsByClassName ("defensaMuralla")[0].textContent)*num;
		}else if (pagina == "shipyard"){
			d_d += parseFloat (tabla.getElementsByClassName ("defensaEspecial")[0].textContent)*num;
		}
		r += parseFloat (tabla.getElementsByClassName ("resistencia")[0].textContent)*num;
		
		if (tierra){
			//Coloco el input de los boquetes
			var input = document.createElement ("input");
			input.className = "inputBoquetes";
			input.value = 0;
			input.style.width = "18px";
			input.style.height = "15px";
			input.style.background = "#FFF";
			input.style.border = "solid thin #BC575D";
			input.style.position = "absolute";
			input.style.left = "425px";
			input.style.top = "98px";
			input.style.fontSize = "12px";
			if (basico){
				input.style.display = "none";
			}
			
			//Creo la etiqueta
			var eti = document.createElement ("div");
			eti.className = "etiqueta";
			eti.textContent = Lang["labelWall"];
			colocaDetras (eti, tabla);
			colocaDetras (input, tabla);
			
			var ataqueEspecial = parseFloat (input.parentNode.getElementsByClassName ("ataqueEspecial")[0].childNodes[0].textContent);
			
			input.addEventListener ("keyup", function (){ valida (this, ataqueEspecial, true); }, false);
			input.addEventListener ("mousemove", function (e){ mueveEti (e, eti); }, false);
			input.addEventListener ("mouseout", function (){ escondeEti (eti); }, false);
			
		}
		
		//Coloco las etiquetas de los bonus en su lugar
		colocaEtiquetas (unidad, tierra);
		
		//Creo la flecha para cambiar entre modo básico y modo avanzado
		creaModos (unidad, basico);
	}
	
	/**
	 * Crea la flecha para cambiar entre modo básico y modo avanzado.
	 * @param unidad tipo de unidad que se analiza.
	 * @param basico true si la vista es básica, false si es avanzada.
	 */
	function creaModos (unidad, basico){
		var tabla = unidades.childNodes[i].getElementsByClassName ("tablaAvanzada")[0];
		
		var img = document.createElement ("img");
		if (basico){
			img.src = Img.unidadesModoBasicoVisible;
		}else{
			img.src = Img.unidadesModoAvanzadoVisible;
		}
		img.style.cursor = "pointer";
		img.style.position = "absolute";
		img.style.left = "128px";
		img.style.top = "65px";
		img.addEventListener ("click", function (){ cambiaModo (this); }, false);

		colocaDetras (img, tabla);
	}
	
	/**
	 * Cambia entre el modo básico y el avanzado.
	 * @param img imagen apretada.
	 */
	function cambiaModo (img){
		var clase = img.parentNode.className;
		var lista = img.parentNode.parentNode;
		var numNodo = 0;
		var i = 0;
		var stop = false;
		
		while (i<lista.childNodes.length && !stop){
			if (lista.childNodes[i].tagName == "LI"){
				if (lista.childNodes[i].className == clase){
					stop = true;
				}else{
					numNodo++;
				}
			}
			i++;
		}
		
		if (modoBasico[numNodo]){
			modoBasico[numNodo] = false;
			img.parentNode.getElementsByClassName ("tablaBasica")[0].style.display = "none";
			img.parentNode.getElementsByClassName ("tablaAvanzada")[0].style.display = "inline";
			
			var boquetes = img.parentNode.getElementsByClassName ("inputBoquetes")[0];
			if (boquetes){
				boquetes.style.display = "inline";
			}
			
			img.src = Img.unidadesModoAvanzadoVisible;
			
			var barra = img.parentNode.getElementsByClassName ("sliderinput")[0];
			if (barra){
				barra.style.top = "115px";
			}
			
			var costes = img.parentNode.getElementsByClassName ("costs")[0];
			costes.style.top = "120px";
			costes = costes.childNodes[3]
			costes.childNodes[costes.childNodes.length-1].style.bottom = "129px";
			
			img.parentNode.style.height = "220px";
			var e = img.parentNode.getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "55px";
			e = img.parentNode.getElementsByClassName ("unitcount")[0].style.top = "155px";
		}else{
			modoBasico[numNodo] = true;
			img.parentNode.getElementsByClassName ("tablaBasica")[0].style.display = "inline";
			img.parentNode.getElementsByClassName ("tablaAvanzada")[0].style.display = "none";
			
			var boquetes = img.parentNode.getElementsByClassName ("inputBoquetes")[0];
			if (boquetes){
				boquetes.style.display = "none";
			}
			
			img.src = Img.unidadesModoBasicoVisible;
			
			var barra = img.parentNode.getElementsByClassName ("sliderinput")[0];
			if (barra){
				barra.style.top = "45px";
			}
			
			var costes = img.parentNode.getElementsByClassName ("costs")[0];
			costes.style.top = "50px";
			costes = costes.childNodes[3];
			costes.childNodes[costes.childNodes.length-1].style.bottom = "59px";
			
			img.parentNode.style.height = "155px";
			var e = img.parentNode.getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "25px";
			e = img.parentNode.getElementsByClassName ("unitcount")[0].style.top = "130px";
		}
	}
	
	/**
	 * Coloca als etiquetas de los bonus en su lugar.
	 * @param unidad tipo de unidad que se analiza.
	 * @param tierra true si es el cuartel, false si es el astillero.
	 */
	function colocaEtiquetas (unidad, tierra){
		var tabla = unidades.childNodes[i].getElementsByClassName ("tablaAvanzada")[0];
		
		if (unidad == "cook" || unidad == "medic"){
			var noBonus = document.createElement ("img");
			noBonus.src = Img.MISC_BARRA_PROHIBIDO;
			noBonus.style.position = "absolute";
			noBonus.style.top = "49px";
			noBonus.style.left = "185px";
			
			colocaDetras (noBonus, tabla);
		}else{
			var hayAt = false;
			var img = unidades.childNodes[i].getElementsByClassName ("att-icon")[0];
			if (img){
				hayAt = true;
				img.style.position = "absolute";
				img.style.top = "45px";
				img.style.left = "180px";
			}
			
			var hayDef = false;
			img = unidades.childNodes[i].getElementsByClassName ("def-icon")[0];
			if (img){
				hayDef = true;
				img.style.position = "absolute";
				img.style.top = "45px";
				if (hayAt){
					img.style.left = "210px";
				}else{
					img.style.left = "180px";
				}
			}
			
			var especial = "";
			
			if (tierra){
				if (BaseDatos.unidades[unidad].especial == 0){
					especial = Lang["bonusAssault"];
				}else if (BaseDatos.unidades[unidad].especial == 1){
					especial = Lang["bonusResistance"];
				}
			}else{
				if (BaseDatos.barcos[unidad].especial == 0){
					especial = Lang["bonusAssault"];
				}else if (BaseDatos.barcos[unidad].especial == 1){
					especial = Lang["bonusResistance"];
				}
			}
			
			var span = document.createElement ("span");
			span.textContent = especial;
			span.style.position = "absolute";
			span.style.top = "45px";
			span.style.fontStyle = "italic";
			span.style.cursor = "default";
			span.title = Lang["bonusSpecial"];
			
			if (hayAt){
				if (hayDef){
					span.style.left = "240px";
				}else{
					span.style.left = "210px";
				}
			}else{
				if (hayDef){
					span.style.left = "210px";
				}else{
					span.style.left = "180px";
				}
			}
			
			colocaDetras (span, tabla);
		}
	}
	
	/**
	 * Según el input actualiza los recursos necesarios para formar la unidad.
	 */
	function cambiaBarra (){
		var barra = unidades.childNodes[i].getElementsByClassName ("sliderinput")[0];
		if (barra){
			barra.childNodes[1].childNodes[3].addEventListener ("DOMAttrModified", function (){ actualizaRecursos (this); }, false);
		}
	}
	
	/**
	 * Actualiza los recursos.
	 * @param barra nodo de la barra deslizante.
	 */
	function actualizaRecursos (barra){
		var n = parseInt (barra.parentNode.parentNode.parentNode.getElementsByClassName ("forminput")[0].childNodes[1].value);
		if (n == 0){
			n = 1;
		}
		
		var clase = barra.parentNode.parentNode.parentNode.className;
		var lista = barra.parentNode.parentNode.parentNode.parentNode;
		var numNodo = 0;
		var i = 0;
		var stop = false;
		
		while (i<lista.childNodes.length && !stop){
			if (lista.childNodes[i].tagName == "LI"){
				if (lista.childNodes[i].className == clase){
					stop = true;
				}else{
					numNodo++;
				}
			}
			i++;
		}

		var recursos = barra.parentNode.parentNode.parentNode.getElementsByClassName ("resources")[0];
		for (var i=0; i<recursos.childNodes.length; i++){
			var info = recursos.childNodes[i];
			if (info.className != "time"){
				info.childNodes[1].textContent = transformaCifra (parseInt (recursosUnidad[numNodo].recursos[info.className])*n);
			}
		}
	}
	
	/**
	 * Clase. Contiene la cantidad de recursos por unidad.
	 */
	function Recursos (){
		this.recursos = { citizens: 0, wood: 0, marble: 0, wine: 0, glass: 0, sulfur: 0, upkeep: 0 }
	}
	
	/**
	 * Crea un panel con los puntos de ataque y defensa de las tropas/barcos en la ciudad.
	 */
	function visionGlobalPuntos (){
		a_a = Math.round (a_a*10)/10;
		a_d = Math.round (a_d*10)/10;
		d_a = Math.round (d_a*10)/10;
		d_d = Math.round (d_d*10)/10;
		r = Math.round (r*10)/10;
		
		var tierra = false;
		
		if (pagina == "barracks"){
			tierra = true;
		}

		var div = document.createElement ("div");
		div.id = "puntosUnidades";
		div.className = "dynamic";
		
		if (tierra){
			var i = 4;
		}else{
			var i = 5;
		}
		
		if (panelesScript[i] == "1"){
			var abierto = true;
			var imagen = Img.PANEL_BOTON_MINIMIZAR;
			var vis = "visible";
			var hei = "auto";
		}else{
			var abierto = false;
			var imagen = Img.PANEL_BOTON_MAXIMIZAR;
			var vis = "hidden";
			var hei = "0";
		}
		
		var contenido = "<h3 class='header'>" + Lang["globalView"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
						"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" +
							"<h4 style='background-color: #FFFBDB; font-size: 12px; margin: 6px 0; padding: 2px; text-align: center;'>" + Lang["offensiveStrength"] + "</h4>" +
							"<table>" +
								"<tr>" +
									"<td width='20px' style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["attack"] + "' src='" + Img.unidadesAtaque + "'/></td>" +
									"<td id='ataqueBoquetes' style='padding-left: 20px;'>" + a_a + "</td>" +
								"</tr>" +
								"<tr>" +
									"<td style='padding-left: 55px;'><img title = '" + Lang["defense"] + "' src='" + Img.unidadesDefensa + "'/></td>" +
									"<td style='padding-left: 20px;'>" + a_d + "</td>" +
								"</tr>" +
							"</table>" +
							"<h4 style='background-color: #FFFBDB; font-size: 12px; margin: 6px 0; padding: 2px; text-align: center;'>" + Lang["defensiveStrength"] + "</h4>" +
							"<table>" +
								"<tr>" +
									"<td style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["attack"] + "' src='" + Img.unidadesAtaque + "'/></td>" +
									"<td style='padding-left: 20px;'>" + d_a + "</td>" +
								"</tr>" +
								"<tr>" +
									"<td style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["defense"] + "' src='" + Img.unidadesDefensa + "'/></td>" +
									"<td style='padding-left: 20px; padding-bottom: 3px;'>" + d_d + "</td>" +
								"</tr>" +
							"</table>" +
							"<h4 style='background-color: #FFFBDB; font-size: 12px; margin: 6px 0; padding: 2px; text-align: center;'>" + Lang["endurance"] + ":</h4>" +
							"<table>" +
								"<tr>" +
									"<td style='padding-left: 55px; padding-bottom: 3px;'><img title = '" + Lang["endurance"] + "' src='" + Img.unidadesResistencia + "'/></td>" +
									"<td style='padding-left: 20px; padding-bottom: 3px;'>" + r + "</td>" +
								"</tr>" +
							"</table>";
							
		if (tierra){
			contenido += 	"<input id='inputBoquetes' value='0' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; position: absolute; right: 30px; top: 25px; font-size: 12px;'/>" +
							"<div id='etiBoquetes' class='etiqueta'>" + Lang["labelWall"] + "</div>";
		}
		contenido +=	"</div>" +
						"<div class='footer'></div>";
		
		div.innerHTML = contenido;
		
		colocaDetras (div, document.getElementById ("buildingUpgrade"));
		
		document.getElementById ("puntosUnidades").getElementsByTagName ("img")[0].addEventListener (
			"click",
			function (){
				var contenido = this.parentNode.parentNode.childNodes[1];
				
				if (abierto){
					abierto = false;
					this.src = Img.PANEL_BOTON_MAXIMIZAR;
					contenido.style.visibility = "hidden";
					contenido.style.height = "0";
					panelesScript[i] = 0;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
				}else{
					abierto = true;
					this.src = Img.PANEL_BOTON_MINIMIZAR;
					contenido.style.height = "auto";
					contenido.style.visibility = "visible";
					panelesScript[i] = 1;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
				}
			},
			false
		);
		
		if (tierra){
			var eti = document.getElementById ("etiBoquetes");
			var ataque = parseFloat (document.getElementById ("ataqueBoquetes").textContent);
			
			var input = document.getElementById ("inputBoquetes");
			input.addEventListener ("keyup", function (){ valida (this, ataque, false); }, false);
			input.addEventListener ("mousemove", function (e){ mueveEti (e, eti); }, false);
			input.addEventListener ("mouseout", function (){ escondeEti (eti); }, false);
		}
	}
	
	/**
	 * Coloca un botón para cambiar el vista de todas las unidades.
	 */
	function colocaBotonModo (){
		var input = document.createElement ("input");
		input.type = "button";
		input.className = "button";
		input.value = Lang["unitView"];
		input.addEventListener ("click",
								function (){
									GM_setValue (server + "basico", !basico);
									window.location.reload ();
								},
								false);
		
		colocaDetras (input, document.getElementsByClassName ("buildingDescription")[0]);
	}
	
	//Variables acumulativas de los puntos
	var a_a = 0;
	var a_d = 0;
	var d_a = 0;
	var d_d = 0;
	var r = 0;
	
	if (pagina == "barracks" || pagina == "shipyard"){
		colocaBotonModo ();
	
		var x = 0;
		var recursosUnidad = [];
		var unidades = document.getElementById ("units");
		var basico = GM_getValue (server + "basico", true);
		var modoBasico = [];
		
		for (var i=1; i<=unidades.childNodes.length - 2; i+=2){
			//Guardo los recursos por unidad
			recursosUnidad[x] = new Recursos ();
			var recursos = unidades.childNodes[i].getElementsByClassName ("resources")[0];
			for (var y=0; y<recursos.childNodes.length; y++){
				var info = recursos.childNodes[y];
				recursosUnidad[x].recursos[info.className] = info.childNodes[1].textContent.replace (/[.,]/g, "");
			}
			
			//Guardo el estado de los modos de vista de cada unidad
			modoBasico[x] = basico;
			
			cambiaTag (i);
			unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("p")[0].style.display = "none";
			
			var img = document.createElement ("img");
			img.src = Img.DESC_ICONO;
			img.style.position = "relative";
			img.style.left = "25px";
			img.style.top = "2px";
			colocaDetras (img, unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].childNodes[1]);
			
			var descLink = creaSpanDescripcion (i);
			colocaDetras (descLink, img);
			
			var hr = unidades.childNodes[i].getElementsByTagName ("hr")[0];
			if (!hr){
				hr = document.createElement ("hr");
				colocaDetras (hr, unidades.childNodes[i].getElementsByClassName ("unitinfo")[0]);
			}
			hr.style.position = "relative";
			hr.style.top = "-10px";
			
			var bonus = document.createElement ("span");
			bonus.innerHTML = "<u>" + Lang["bonus"] + "</u>:";
			bonus.style.position = "absolute";
			bonus.style.left = "130px";
			bonus.style.top = "45px";
			colocaDetras (bonus, hr);
			
			var costes = unidades.childNodes[i].getElementsByClassName ("costs")[0];
			costes.style.position = "relative";
			if (basico){
				costes.style.top = "50px";
			}else{
				costes.style.top = "120px";
			}
			
			var barra = unidades.childNodes[i].getElementsByClassName ("sliderinput")[0];
			if (barra){
				var barra2 = barra;
				barra.parentNode.removeChild (barra);
				colocaDetras (barra2, costes);
				barra.style.position = "relative";
				if (basico){
					barra.style.top = "45px";
				}else{
					barra.style.top = "115px";
				}
			}
			
			costes = costes.childNodes[3];
			var coste = costes.childNodes[costes.childNodes.length-1];
			coste.style.position = "absolute";
			if (basico){
				coste.style.bottom = "59px";
			}else{
				coste.style.bottom = "129px";
			}
			coste.style.right = "151px";
			
			coste = costes.childNodes[costes.childNodes.length-2];
			coste.style.position = "relative";
			coste.style.bottom = "0";
			
			coste.style.right = "-9px";
			
			if (basico){
				unidades.childNodes[i].style.height = "155px";
				var e = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "25px";
				e = unidades.childNodes[i].getElementsByClassName ("unitcount")[0].style.top = "130px";
			}else{
				unidades.childNodes[i].style.height = "220px";
				var e = unidades.childNodes[i].getElementsByClassName ("unitinfo")[0].getElementsByTagName ("img")[1].style.top = "55px";
				e = unidades.childNodes[i].getElementsByClassName ("unitcount")[0].style.top = "155px";
			}
			
			var span = unidades.childNodes[i].getElementsByClassName ("setMax")[0];
			if (span){
				span.addEventListener ("click", function (){ actualizaRecursos (this.parentNode.parentNode.getElementsByClassName ("sliderinput")[0].childNodes[1].childNodes[3]); }, false);
			}
			
			//creaInfo (basico);//  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  
			cambiaBarra ();
			x++;
		}
		
		//visionGlobalPuntos ();//  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  //  MIRAR  
	}
}

function ordenaMiembrosAlianza (){
	function cambiaEstilo (){
		var claro = true;
		for (var i=1; i<=miembros.childNodes.length - 2; i+=2){
			var clase = miembros.childNodes[i].className;
			if (clase == "default" || clase == " default" || clase == "alt" || clase == " alt"){
				if (claro){
					claro = false;
					miembros.childNodes[i].className = "default";
				}else{
					claro = true;
					miembros.childNodes[i].className = "alt";
				}
			}else{
				claro = !claro;
				miembros.childNodes[i].className = "highlight alt";
			}
		}
	}

	function ordena (campo){
		var i = 1;
		
		try{
			lista.vesInicioPDI (campo);
			var id = lista.consulta ().getId ();
			swapNodos (miembros.childNodes[1], document.getElementById (id));
			while (!lista.finalPDI (campo)){
				i += 2;
				lista.muevePDI (true, campo);
				id = lista.consulta ().getId ();
				swapNodos (miembros.childNodes[i], document.getElementById (id));
			}
		}catch (msg){}
		
		cambiaEstilo ();
	}

	function ordenaInver (campo){
		var i = 1;
		
		try{
			lista.vesFinalPDI (campo);
			var id = lista.consulta ().getId ();
			swapNodos (miembros.childNodes[1], document.getElementById (id));
			while (!lista.inicioPDI (campo)){
				i += 2;
				lista.muevePDI (false, campo);
				id = lista.consulta ().getId ();
				swapNodos (miembros.childNodes[i], document.getElementById (id));
			}
		}catch (msg){}
		
		cambiaEstilo ();
	}
	
	function creaListener (i){
		var titulo = tabla.childNodes[1].childNodes[1].childNodes[i];
		
		if (i == 1){
			titulo.style.width = "80px";
		}
		
		if (titulo.childNodes.length == 0) return;
		
		var j;
		if (i == 1){
			j = 0;
		}else if (i == 3){
			j = 1;
		}else if (i == 5){
			j = 2;
		}else if (i == 7){
			j = 3;
		}else if (i == 9){
			j = 4;
		}
		
		var span = document.createElement ("span");
		span.textContent = String.fromCharCode (8657);
		span.className = "unicode";
		span.style.position = "relative";
		span.style.left = "3px";
		span.style.color = "#434A93";
		span.style.cursor = "pointer";
		span.addEventListener ("mouseover", function (){ this.style.textDecoration = "underline"; }, false);
		span.addEventListener ("mouseout", function (){ this.style.textDecoration = "none"; }, false);
		span.addEventListener ("click",
								function (){
									GM_setValue (server + "ordenEmbajada", j);
									ordena (j);
								},
								false);
		
		var span2 = document.createElement ("span");
		span2.textContent = String.fromCharCode (8659);
		span2.className = "unicode";
		span2.style.position = "relative";
		span2.style.left = "5px";
		span2.style.color = "#434A93";
		span2.style.cursor = "pointer";
		span2.addEventListener ("mouseover", function (){ this.style.textDecoration = "underline"; }, false);
		span2.addEventListener ("mouseout", function (){ this.style.textDecoration = "none"; }, false);
		span2.addEventListener ("click",
								function (){
									GM_setValue (server + "ordenEmbajada", j + 10);
									ordenaInver (j);
								},
								false);
		
		titulo.appendChild (span);
		titulo.appendChild (span2);
	}
	
	/**
	 * Crea un botón para resetear la ordenación de las columnas.
	 */
	function creaBotonReset (){
		var boton = document.createElement ("span");
		boton.textContent = "Reset";
		boton.style.fontWeight = "bold";
		boton.style.position = "absolute";
		boton.style.right = "10px";
		boton.style.top = "10px";
		boton.style.cursor = "pointer";
		
		boton.addEventListener ("mouseover", function (){ this.style.textDecoration = "underline"; }, false);
		boton.addEventListener ("mouseout", function (){ this.style.textDecoration = "none"; }, false);
		boton.addEventListener ("click",
								function (){
									GM_deleteValue (server + "ordenEmbajada");
									window.location.reload ();
								},
								false);
		
		colocaDetras (boton, tabla.parentNode.previousSibling);
	}

	if (pagina == "embassy" || pagina == "diplomacyAdvisorAlly"){
		var tabla = document.getElementById ("memberList");
		
		if (tabla){
			creaBotonReset ();
			
			var miembros = tabla.childNodes[3];
			var compruebaCiudad = true;
			if (tabla.childNodes[1].childNodes[1].childNodes[5].childNodes.length == 0){
				compruebaCiudad = false;
			}
			
			//Creo la lista y añado los elementos
			try{
				var lista = new Lista ();
				var j = 1;
				for (var i=1; i<=miembros.childNodes.length - 2; i+=2){
					var linea = miembros.childNodes[i].childNodes[1].className;
					var nombre = miembros.childNodes[i].childNodes[3].textContent.toLowerCase ();
					var ciudad = "";
					if (compruebaCiudad){
						var ciudad = miembros.childNodes[i].childNodes[5].childNodes[1].childNodes[0].childNodes[0].textContent;
						var re = new RegExp (/\d+/g);
						ciudad = re.exec (ciudad);
					}
					var rango = miembros.childNodes[i].childNodes[7].textContent.toLowerCase ();
					var num = parseInt (miembros.childNodes[i].childNodes[9].textContent.replace (/[.,]/g, ""));
					
					miembros.childNodes[i].id = "miembro" + j;
					lista.introduce (new Elemento (linea, nombre, ciudad, rango, num, "miembro" + j));
					j++;
				}
			}catch (msg){}
			
			for (var i=1; i<=9; i+=2){
				creaListener (i);
			}
			
			var n = GM_getValue (server + "ordenEmbajada", -1);
			
			if (n >=0 && n <= 4){
				ordena (n);
			}else if (n >= 10 && n <= 14){
				ordenaInver (n - 10);
			}
		}
	}
}

/**
 * Crea un panel donde se informa del riesgo que corren otros jugadores al enviar espías.
 */
function creaPanelEspias (){
	/**
	 * Calcula los valores de riesgo de todos las etiquetas.
	 * @param valorIntendencia nivel de la intendencia.
	 * @param valorEscondite nivel del escondite.
	 * @param valorNumero número de espías.
	 * @param valorEsconditeEnemigo nivel del escondite del enemigo.
	 * @return valores de las etiquetas.
	 */
	function calculaEtiquetas (valorIntendencia, valorEscondite, valorNumero, valorEsconditeEnemigo){
		var etiquetas = [];
		
		etiquetas[0] = 5*(valorNumero + 1) + 2*(valorEscondite - valorIntendencia - valorEsconditeEnemigo);
		etiquetas[1] = etiquetas[0] - 10;
		etiquetas[2] = etiquetas[1] + 24;
		etiquetas[3] = etiquetas[1] + 30;
		etiquetas[4] = etiquetas[1] + 40;
		etiquetas[5] = etiquetas[1] + 50;
		etiquetas[6] = etiquetas[1] + 70;
		etiquetas[7] = etiquetas[1] + 80;
		etiquetas[8] = etiquetas[1] + 90;
		etiquetas[9] = etiquetas[1] + 30;
		
		for (var i=0; i<10; i++){
			if (etiquetas[i] < 5){
				etiquetas[i] = 5;
			}else if (etiquetas[i] > 95){
				etiquetas[i] = 95;
			}
		}
		
		return etiquetas;
	}
	
	/**
	 * Calcula los valores según los parámetros.
	 */
	function calcula (){
		var ok = true;

		for (var i=0; i<4; i++){
			if (inputs[i].value == "" || isNaN (inputs[i].value) || parseInt (inputs[i].value) < 1){
				inputs[i].style.border = "solid thin #FFB9BB";
				inputs[i].style.backgroundColor = "#FBE3E4";
				ok = false;
			}else{
				inputs[i].style.border = "solid thin #BC575D";
				inputs[i].style.backgroundColor = "#FFF";
			}
		}
		
		if (ok){
			var etiquetas = calculaEtiquetas (parseInt (inputs[0].value), parseInt (inputs[1].value), parseInt (inputs[2].value), parseInt (inputs[3].value));
			for (var i=0; i<10; i++){
				document.getElementById ("eti" + (i + 1)).textContent = etiquetas[i] + "%";
			}
		}
	}
	
	if (pagina == "safehouse"){
		var valorIntendencia = parseInt (GM_getValue (server + Ciudad.getNombre ()).split ("#")[1]);
		var valorEscondite = parseInt (document.getElementsByClassName ("buildingLevel")[0].childNodes[1].textContent);
		
		var pos = document.getElementById ("reportInboxLeft").getElementsByTagName ("li")[1].textContent;
		var filtro = new RegExp (/\d+/);
		var valorNumero = parseInt (filtro.exec (pos));
		
		var etiquetas = calculaEtiquetas (valorIntendencia, valorEscondite, valorNumero, 1);

		var panel = document.createElement ("div");
		panel.className = "contentBox01h";
		panel.innerHTML =	"<h3 class='header'>" +
								"<span class='textLabel'>" + Lang["spyTitle"] + "</span>" +
							"</h3>" +
							"<div class='content' style='padding: 10px;'>" +
								"<table>" +
									"<tr>" +
										"<td width='50%' padding-right: 20px;>" + Lang["spyTownHall"] + "</td>" +
										"<td><input id='inputEspia1' value='" + valorIntendencia + "' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyHideout"] + "</td>" +
										"<td><input id='inputEspia2' value='" + valorEscondite + "' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyNumber"] + "</td>" +
										"<td><input id='inputEspia3' value='" + valorNumero + "' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyHideoutEnemy"] + "</td>" +
										"<td><input id='inputEspia4' value='1' style='width: 18px; height: 15px; background: #FFF; border: solid thin #BC575D; font-size: 12px;'/></td>" +
									"</tr>" +
								"</table>" +
								"<hr/>" +
								"<table>" +
									"<tr>" +
										"<td width='230px;' padding-right: 20px;><b>" + Lang["spyLabel1"] + "</b></td>" +
										"<td width='120px;'><span id='eti1'>" + etiquetas[0] + "%</span></td>" +
										"<td>" + Lang["spyLabel3"] + "</td>" +
										"<td><span id='eti3'>" + etiquetas[2] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel4"] + "</td>" +
										"<td><span id='eti4'>" + etiquetas[3] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td>" + Lang["spyLabel2"] + "</td>" +
										"<td><span id='eti2'>" + etiquetas[1] + "%</span></td>" +
										"<td>" + Lang["spyLabel5"] + "</td>" +
										"<td><span id='eti5'>" + etiquetas[4] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel6"] + "</td>" +
										"<td><span id='eti6'>" + etiquetas[5] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel7"] + "</td>" +
										"<td><span id='eti7'>" + etiquetas[6] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel8"] + "</td>" +
										"<td><span id='eti8'>" + etiquetas[7] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel9"] + "</td>" +
										"<td><span id='eti9'>" + etiquetas[8] + "%</span></td>" +
									"</tr>" +
									"<tr>" +
										"<td></td>" +
										"<td></td>" +
										"<td>" + Lang["spyLabel10"] + "</td>" +
										"<td><span id='eti10'>" + etiquetas[9] + "%</span></td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
							"<div class='footer'/>";
							
		var pos = document.getElementsByClassName ("contentBox01h")[0];
		colocaDetras (panel, pos);
		
		document.getElementById ("eti1").style.fontWeight = "bold";
		
		var inputs = [];
		inputs[0] = document.getElementById ("inputEspia1");
		inputs[1] = document.getElementById ("inputEspia2");
		inputs[2] = document.getElementById ("inputEspia3");
		inputs[3] = document.getElementById ("inputEspia4");
		
		inputs[0].addEventListener ("keyup", calcula, false);
		inputs[1].addEventListener ("keyup", calcula, false);
		inputs[2].addEventListener ("keyup", calcula, false);
		inputs[3].addEventListener ("keyup", calcula, false);
	}
}

/**
 * Consulta los puntos Generales al hacer clic en una ciudad en la isla.
 */
function consultaGenerales (){
	/**
	 * Obtiene los puntos y los coloca debajo de la etiqueta "Puntos:".
	 */
	function consultaPuntos (){
		var panel = document.getElementById ("infocontainer");
	
		var eti = panel.getElementsByClassName ("name")[1].cloneNode (true);
		eti.id = "puntosGenerales";
		eti.childNodes[0].textContent = Lang["generals"] + ":";
		eti.childNodes[1].textContent = "...";
		colocaDetras (eti, panel.getElementsByClassName ("name")[1]);
	
		var nombre = trim (panel.getElementsByClassName ("owner")[0].childNodes[1].textContent).replace (/\s/g, "+");
		var url = "http://" + host + "/index.php?view=highscore&showMe=1";

		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {
				"User-agent": "Mozilla/5.0",
				"Accept": "text/html",
			},
			onload: function (respuesta){
				var pagina = document.implementation.createDocument ("", "", null);
				var html = document.createElement ("html");
				html.innerHTML = respuesta.responseText;
				pagina.appendChild (html);

				url = "http://" + host + "/index.php";
				var boton = pagina.getElementById ("offset").parentNode.childNodes[7].value;
				
				GM_xmlhttpRequest ({
					method: "POST",
					url: url,
					data: "highscoreType=army_score_main&offset=-1&view=highscore&submit=" + boton + "&searchUser=" + nombre + "&view=highscore",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (respuesta){
						var pagina = document.implementation.createDocument ("", "", null);
						var html = document.createElement ("html");
						html.innerHTML = respuesta.responseText;
						pagina.appendChild (html);
						
						var tabla = pagina.getElementsByClassName ("table01")[1].childNodes[1];
						var i = 2;
						var stop = false;
						nombre = nombre.replace (/\+/g, " ");
						
						while (i<=tabla.childNodes.length - 2 && !stop){
							if (tabla.childNodes[i].childNodes[3].textContent == nombre){
								var stop = true;
								var puntos = tabla.childNodes[i].childNodes[7].textContent;
								
								document.getElementById ("puntosGenerales").childNodes[1].textContent = puntos;
							}
							
							i += 2;
						}
					}
				});
			}
		});
	}

	if (pagina == "island"){
		var ciudades = document.getElementById ("cities");
		
		var ciudad = document.getElementById ("information");
		if (ciudad.childNodes.length != 3){
			consultaPuntos ();
		}
		
		for (var i=1; i<=ciudades.childNodes.length - 2; i+=2){
			if (ciudades.childNodes[i].className != "cityLocation buildplace"){
				ciudades.childNodes[i].addEventListener ("click", consultaPuntos, false);
			}
		}
	}
}

/**
 * Añade una calculadora de distancias.
 */
function calculaDistancia (){
	/**
	 * Calcula el tiempo a partir de 2 coordenadas.
	 * @param origen coordenada inicial.
	 * @param destino coordenada final.
	 * @param velocidad velocidad de la unidad.
	 * @return cadena con el tiempo.
	 */
	function calculaTiempo (origen, destino, velocidad){
		origen = origen.split (":");
		destino = destino.split (":");
		var x = destino[0] - origen[0];
		var y = destino[1] - origen[1];
		
		var cad = "...";
		
		if (x != 0 || y != 0){
			var tmp = Lang["time"].split ("|");
			
			var tiempo = seg2Time (Math.sqrt (Math.pow (x*(1200/velocidad), 2) + Math.pow (y*(1200/velocidad), 2))*60)
			
			t = "";
			
			for (var i=0; i<4; i++){
				if (tiempo[i] != 0){
					t += tiempo[i] + tmp[i] + " ";
				}
			}
			
			cad = t;
		}

		return cad;
	}

	/**
	 * Actualiza el tiempo cuando se selecciona una isla.
	 */
	function calcula (){
		var nombreIsla = document.getElementById ("islandBread").childNodes[0].textContent;
		var coordsFinal = nombreIsla.split (" [")[1].replace ("]", "");
		if (coordsInicio == coordsFinal){
			var tmp1 = "...";
			var tmp2 = tmp1;
		}else{
			var tmp1 = coordsFinal;
			var tmp2 = nombreIsla.split (" [")[0];
		}
		document.getElementById ("coordsIsla").textContent = tmp1;
		document.getElementById ("nombreIsla").textContent = tmp2;
		document.getElementById ("tiempoIslas").textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[1]);
		
		//Relleno la vista avanzada
		var celdas = document.getElementsByClassName ("calc_tiempo");
		for (var i=0; i<celdas.length; i++){
			celdas[i].textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[i]);
		}
	}
	
	/**
	 * Valida el input.
	 * @param input input.
	 */
	function validaInput (input){
		var valor = input.value;
		var i = parseInt (input.id.substring (input.id.length - 1));
		
		if (valor == "" || isNaN (valor) || parseInt (valor) < 0 || parseInt (valor) > 100){
			input.style.border = "solid thin #FFB9BB";
			input.style.backgroundColor = "#FBE3E4";
			inputs[i] = false;
		}else{
			input.style.border = "solid thin #BC575D";
			input.style.backgroundColor = "#FFF";
			inputs[i] = true;
		}
		
		i = 0;
		var stop = false;
		while (i<4 && !stop){
			if (!inputs[i]){
				stop = true;
			}
			
			i++;
		}
		
		if (!stop){
			var coordsInicio = document.getElementById ("inputCoordenada0").value + ":" + document.getElementById ("inputCoordenada1").value;
			var coordsFinal = document.getElementById ("inputCoordenada2").value + ":" + document.getElementById ("inputCoordenada3").value
			
			document.getElementById ("coordsIsla").textContent = "...";
			document.getElementById ("nombreIsla").textContent = "...";
			document.getElementById ("tiempoIslas").textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[1]);
																				 
			//Relleno la vista avanzada
			var celdas = document.getElementsByClassName ("calc_tiempo");
			for (var i=0; i<celdas.length; i++){
				celdas[i].textContent = calculaTiempo (coordsInicio, coordsFinal, BaseDatos.velocidad[i]);
			}
		}
	}
	
	/**
	 * Crea la calculadora normal.
	 */
	function panel (){
		var panel = document.createElement ("div");
		panel.id = "calcDistancia";
		panel.className = "dynamic";
		
		if (panelesScript[3] == "1"){
			var abierto = true;
			var imagen = Img.PANEL_BOTON_MINIMIZAR;
			var vis = "visible";
			var hei = "155px";
		}else{
			var abierto = false;
			var imagen = Img.PANEL_BOTON_MAXIMIZAR;
			var vis = "hidden";
			var hei = "0";
		}
		
		panel.innerHTML =	"<h3 class='header'>" + Lang["timeTitle"] + "<img src='" + imagen + "' style='position: absolute; right: 5px; top: 7px; cursor: pointer;'/></h3>" +
							"<div class='content' style='visibility: " + vis + "; height: " + hei + ";'>" +
								"<img id='flechaCalculadora' src='" + Img.FLECHA_TIPO_3 + "' style='position: absolute; right: 0; top: -5px; cursor: pointer;'/>" +
								"<div style='text-align: center; width: 100px; position: relative; top: 10px;'>" +
									"<span style='font-weight: bold; font-size: 13px;'>" + nombreIsla.split (" [")[1].replace ("]", "") + "<span><br/>" +
									"<span style='font-weight: normal; font-size: 12px;'>" + nombreIsla.split (" [")[0] + "<span><br/>" +
									"<span style='font-weight: normal; font-size: 11px;'>" + Ciudad.getNombre () + "</span>" +
								"</div>" +
								"<img style='position: absolute; top: 28px; left: 103px;' src='" + Img.FLECHA_TIPO_2 + "'/>" +
								"<div style='text-align: center; width: 100px; position: absolute; top: 10px; left: 120px;'>" +
									"<span id='coordsIsla' style='font-weight: bold; font-size: 13px;'>...</span><br/>" +
									"<span id='nombreIsla' style='font-weight: normal; font-size: 12px;'>...</span><br/>" +
								"</div>" +
								"<span id='tiempoIslas' style='position: absolute; top: 78px; width: 100%; text-align: center; font-weight: bold; font-size: 14px;'>...</span>" +
								"<input id='inputCoordenada0' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; left: 10px;' type='text' value='-'/>" +
								"<input id='inputCoordenada1' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; left: 52px;' type='text' value='-'/>" +
								"<img style='position: absolute; top: 125px; left: 103px;' src='" + Img.FLECHA_TIPO_2 + "'/>" +
								"<input id='inputCoordenada2' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; right: 52px;' type='text' value='-'/>" +
								"<input id='inputCoordenada3' style='background: #FFF; border: solid thin #BC575D; width: 28px; position: absolute; top: 120px; right: 10px;' type='text' value='-'/>" +
								"<span style='position: absolute; top: 123px; left: 46px; font-size: 14px; font-weight: bold;'>:</span>" +
								"<span style='position: absolute; top: 123px; right: 46px; font-size: 14px; font-weight: bold;'>:</span>" +
							"</div>" +
							"<div class='footer'></div>";
							
		colocaDetras (panel, document.getElementById ("navigation"));
		
		document.getElementById ("calcDistancia").getElementsByTagName ("img")[0].addEventListener (
			"click",
			function (){
				var contenido = this.parentNode.parentNode.childNodes[1];
				
				if (abierto){
					abierto = false;
					abiertoAvanzado = false;
					this.src = Img.PANEL_BOTON_MAXIMIZAR;
					contenido.style.visibility = "hidden";
					contenido.style.height = "0";
					panelesScript[3] = 0;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
					document.getElementById ("calcDistanciaAvanzada").style.display = "none";
					document.getElementById ("flechaCalculadora").src = Img.FLECHA_TIPO_3;
				}else{
					abierto = true;
					this.src = Img.PANEL_BOTON_MINIMIZAR;
					contenido.style.height = "155px";
					contenido.style.visibility = "visible";
					panelesScript[3] = 1;
					GM_setValue (server + "paneles", panelesScript.join ("#"));
				}
			},
			false
		);
	}
	
	/**
	 * Crea el panel avanzado.
	 */
	function panelAvanzado (){
		var panel = document.createElement ("div");
		panel.id = "calcDistanciaAvanzada";
		panel.className = "bodyReloaded";
		panel.style.display = "none";
		panel.style.position = "absolute";
		panel.style.top = "421px";
		panel.style.left = "252px";
		panel.style.width = "180px";
		
		panel.innerHTML =	"<div class='headerReloaded'></div>" +
							"<div class='content' style='width: 150px; padding: 7px 10px 0 13px;'>" +
								"<table style='width: 100%;'>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/military/120x100/spy_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_transport_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_ram_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_flamethrower_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_steamboat_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_ballista_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_catapult_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_mortar_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
									"<tr>" +
										"<td class='calc_td'><img src='http://" + host + "/skin/characters/fleet/120x100/ship_submarine_r_120x100.gif' width='30px'/></td>" +
										"<td class='calc_tiempo'>...</td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
							"<div class='footerReloaded'></div>";
		
		colocaDetras (panel, document.getElementById ("calcDistancia"));
		
		document.getElementById ("flechaCalculadora").addEventListener (
			"click",
			function (){
				var panel = document.getElementById ("calcDistanciaAvanzada");
				if (abiertoAvanzado){
					panel.style.display = "none";
					abiertoAvanzado = false;
					this.src = Img.FLECHA_TIPO_3;
				}else{
					panel.style.display = "inline";
					abiertoAvanzado = true;
					this.src = Img.FLECHA_TIPO_4;
				}
			},
			false
		);
	}
	
	if (pagina == "worldmap_iso"){
		var nombreIsla = document.getElementById ("islandBread").childNodes[0].textContent;
		
		//Booleanos de los inputs
		var inputs = [false, false, false, false];
		
		var abiertoAvanzado = false;
		
		panel ();
		panelAvanzado ();
		
		var coordsInicio = Ciudad.getCoordsIsla ();
		
		//Listener
		document.getElementById ("islandBread").addEventListener ("DOMSubtreeModified", calcula, false);
		
		for (var i=0; i<4; i++){
			var cas = document.getElementById ("inputCoordenada" + i);
			cas.addEventListener ("keyup", function (){ validaInput (this); }, false);
			cas.addEventListener (	"mousedown",
									function (){
										if (this.value == "-"){
											this.value = "";
										}
									},
									false);
		}
	}
}

/**
 * Modifica el diseño del supervisor de investigación y añade elementos útiles.
 */
function investigacionVistaAvanzada (){
	/**
	 * Calcula el tiempo para obtener los puntos necesarios.
	 * @param total puntos totales.
	 * @param actual puntos actuales.
	 * @param puntosHora puntos por hora.
	 * @return cadena con el tiempo.
	 */
	function calculaTiempo (total, actual, puntosHora){
		var tmp = Lang["time"].split ("|");

		var tiempo = seg2Time (((total - actual)/puntosHora)*3600);

		var t = "";
		
		if (tiempo[0] != 0){
			t += tiempo[0] + tmp[0] + " ";
		}
		
		if (tiempo[1] != 0){
			t += tiempo[1] + tmp[1] + " ";
		}
		
		if (tiempo[2] != 0){
			t += tiempo[2] + tmp[2];
		}
		
		return t;
	}
	
	/**
	 * Calcula el porcentaje de completado de la barra de progreso.
	 * @param total puntos totales.
	 * @param actual puntos actuales.
	 * @retutn portentaje.
	 */
	function calculaProgreso (total, actual){
		var p = actual/total;
		if (p > 1){
			p = 100.00;
		}else{
			p = (p*100).toFixed (2);
		}
		return p;
	}

	/**
	 * Crea el contenido de la capa con el tiempo restante y la barra de progreso.
	 */
	function creaContenido (){
		var tiempo = "...";
		var div;
		
		var total = capa.getElementsByClassName ("researchPoints")[0];
		
		if (total){
			total = parseInt (total.textContent.replace (/[.,]/g, ""));
			var tmp = document.getElementsByClassName ("points")[0].textContent;
			var actual = parseInt (tmp.substring (tmp.search (/\d/)).replace (/[.,]/g, ""));
			tmp = document.getElementsByClassName ("time")[0].textContent;
			var puntosHora = parseInt (tmp.substring (tmp.search (/\d/)).replace (/[.,]/g, ""));
			
			//Modifico la columna de la derecha
			eliminaNodo (capa.getElementsByClassName ("researchButton2")[0]);
			eliminaNodo (capa.getElementsByClassName ("costs")[0]);
			var boton = capa.getElementsByClassName ("researchButton")[0];
			if (boton){
				//Modifico el botón
				boton.style.position = "absolute";
				boton.style.top = "8px";
				boton.style.right = "10px";
			}else{
				//Calculo el tiempo
				tiempo = calculaTiempo (total, actual, puntosHora);

				div = document.createElement ("div");
				div.className = "noBoton";
				div.innerHTML = "<img src='http://" + host + "/skin/resources/icon_research.gif'/><br/>" +
								transformaCifra (actual) + " / <b>" + transformaCifra (total) + "</b>";
				colocaDetras (div, capa.childNodes[1]);
			}
		}
		
		//Creo la etiqueta del tiempo
		div = document.createElement ("div");
		div.textContent = tiempo;
		div.style.fontWeight = "bold";
		div.style.fontSize = "13px";
		div.style.position = "absolute";
		div.style.top = "60px";
		div.style.left = "180px";
		div.style.width = "337px";
		div.style.textAlign = "center";
		colocaDetras (div, capa.childNodes[1]);
		
		//Creo la barra de progreso
		if (total){
			var porcentaje = calculaProgreso (total, actual);
			var ancho;
			var estilo = "";
			var padding = 0;
			if (porcentaje < 21){
				ancho = Math.floor (porcentaje*2);
				estilo = "style='position: relative; left: " + (ancho + 4) + "px; color: #000;'";
			}else{
				ancho = Math.floor (porcentaje*2) - 3;
				padding = 3;
			}
		}else{
			var porcentaje = 0;
			var ancho = 0;
			var padding = 0;
		}
		
		div = document.createElement ("div");
		div.className = "barraProgreso";
		
		var contenido = "<div class='barraProgreso2' style='padding-right: " + padding + "px; width: " + ancho + "px;'><span " + estilo + ">" + porcentaje + "%</span></div>";
		
		div.innerHTML = contenido;
						
		colocaDetras (div, capa.childNodes[1]);

	}

	/**
	 * Mueve la capa con la descripción de la unidad.
	 * @param e Event.
	 * @param div capa con la descripción.
	 */
	function mueveDescripcion (e, div){
		div.style.display = "inline";
		div.style.left = e.clientX + 22 + "px";
		div.style.top = e.clientY + 17 + "px";
	}
	
	/**
	 * Esconde la capa con la descripción de la unidad.
	 * @param div capa con la descripción.
	 */
	function escondeDescripcion (div){
		div.style.display = "none";
	}
	
	/**
	 * Coloca la descripción en el mouseover.
	 * @return descripcion creada.
	 */
	function creaDescripcion (){
		var contenido = capa.getElementsByTagName ("p")[0].textContent;
		
		var div = document.createElement ("div");
		div.className = "capaDesc";
		div.style.zIndex = "1000";
		div.style.width = "270px";
		div.style.position = "fixed";
		div.style.textAlign = "justify";
		div.style.backgroundColor = "#FCF4DE";
		div.style.padding = "10px";
		div.style.display = "none";
		div.innerHTML = contenido + "<div style='position: absolute; top: -10px; left: -5px; width: 300px; height: 5px;'><img src='" + Img.DESC_TOP + "'/></div>" +
						"<div style='1000; position: absolute; top: 2px; left: -5px; width: 12px; height: 100%; background: transparent url(" + Img.DESC_LEFT + ") repeat-y scroll 0 0;'></div><div style='position: absolute; top: 2px; right: -5px; width: 12px; height: 100%; background: transparent url(" + Img.DESC_RIGHT + ") repeat-y scroll 0 0;'></div>" +
						"<div style='position: absolute; bottom: 2px; left: -5px; width: 300px; height: 5px;'><img src='" + Img.DESC_BOTTOM + "'/></div>";
		
		capa.appendChild (div);
		
		var descripcion = document.createElement ("span");
		descripcion.textContent = Lang["description"];
		descripcion.style.position = "absolute";
		descripcion.style.left = "195px";
		descripcion.style.top = "32px";
		descripcion.style.fontSize = "11px";
		descripcion.style.cursor = "default";
		descripcion.style.padding = "3px 0 3px 0";
		descripcion.addEventListener ("mousemove",
									function (e){
										this.style.textDecoration = "underline";
										mueveDescripcion (e, div);
									},
									false);
		descripcion.addEventListener ("mouseout",
									function (){
										this.style.textDecoration = "none";
										escondeDescripcion (div);
									},
									false);
		
		return descripcion;
	}

	if (pagina == "researchAdvisor"){
		var lista = document.getElementsByClassName ("researchTypes")[0];
		
		for (var i=1; i<=lista.childNodes.length - 2; i+=2){
			var capa = lista.childNodes[i];
			
			//Muevo imagen
			capa.getElementsByClassName ("leftBranch")[0].style.top = "28px";
			
			//Oculto descripción
			capa.getElementsByTagName ("p")[0].style.display = "none";

			//Creo la imagen de la descripción
			var img = document.createElement ("img");
			img.src = Img.DESC_ICONO;
			img.style.position = "absolute";
			img.style.left = "178px";
			img.style.top = "35px";
			colocaDetras (img, capa.childNodes[1]);
			
			//Creo la descripción
			var descripcion = creaDescripcion ();
			colocaDetras (descripcion, capa.childNodes[1]);
			
			//Creo el contenido
			creaContenido ();
		}
	}
}

/**
 * Funciones varias que siempre se ejecutan.
 */
function misc (){
	/**
	 * Coloca los recursos restantes de la maravilla.
	 */
	function colocaRestanteMaravilla (){
		if (pagina == "wonder"){
			var div = document.getElementsByClassName ("resources");
			
			if (!div[1]) return;
		
			var num = parseInt (div[0].childNodes[1].childNodes[1].textContent.replace (/[.,]/g, "")) - parseInt (div[1].childNodes[1].childNodes[1].textContent.replace (/[.,]/g, ""));
			var cad = transformaCifra (num);
			var clase = div[0].childNodes[1].className;
			
			var titulo = document.createElement ("h4");
			titulo.innerHTML = Lang["remainingResources"];
			
			var form = document.getElementsByClassName ("content")[0].getElementsByTagName ("form")[0];
			
			colocaDelante (titulo, form);
			
			var ul = document.createElement ("ul");
			ul.setAttribute ("class", "resources");
			ul.innerHTML = "<li class='" + clase + "'>" + cad + "</li>";
			colocaDelante (ul, form);
		}
	}
	
	colocaRestanteMaravilla ();
}

/**
 * Crea un menú de configuración de las funciones.
 */
function menuConfig (){
	function guardar (){
		for (var i=0; i<config.length; i++){
			if (document.getElementById ("guardarConfig" + i).checked){
				config[i] = "1";
			}else{
				config[i] = "0";
			}
		}

		GM_setValue (server + "config", config.join ("#"));
		
		window.open (document.getElementsByClassName ("viewCity")[0].childNodes[0].href, "_self");
	}
	
	/**
	 * Inicializa el estado de los checkbox.
	 */
	function inicializaCheckbox (){
		for (var i=0; i<config.length; i++){
			if (config[i] == "1"){
				document.getElementById ("guardarConfig" + i).checked = "checked";
			}
		}
	}
	
	/**
	 * Inicializa el estado de las funciones.
	 */
	function inicializaFunciones (){
		if (config[0] == "1")	eliminaBarraNavegacion ();
		if (config[1] == "1")	menuPaneles ();
		if (config[2] == "1")	creaIconoPremium ();
		if (config[3] == "1")	creaBotonesRecursos ();
		if (config[4] == "1")	informaOroMinas ();
		if (config[5] == "1")	creaInfoMinas ();
		if (config[6] == "1")	cuartelVistaAvanzada ();
		if (config[7] == "1")	investigacionVistaAvanzada ();
		if (config[8] == "1")	ordenaMiembrosAlianza ();
		if (config[9] == "1")	creaPanelEspias ();
		if (config[10] == "1")	consultaGenerales ();
		if (config[11] == "1")	calculaDistancia ();
		
	}
	
	var config = GM_getValue (server + "config", "1#1#1#1#1#1#1#1#1#1#1#1").split ("#");

	if (pagina == "options"){
		var panel = document.createElement ("div");
		panel.className = "contentBox01h";
		panel.innerHTML =	"<h3 class='header'>" +
								"<span class='textLabel'>Ikariam Reloaded</span>" +
							"</h3>" +
							"<div class='content' style='padding: 10px;'>" +
								"<div class='inputOpciones'><input id='guardarConfig0' type='checkbox'/>" + Lang["config0"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig1' type='checkbox'/>" + Lang["config1"].replace ("{x1}", "<i>" + Lang["pointsPlayer"] + "</i>").replace ("{x2}", "<i>" + Lang["moveUnits"] + "</i>").replace ("{x3}", "<i>" + Lang["cityImage"] + "</i>") + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig2' type='checkbox'/>" + Lang["config2"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig3' type='checkbox'/>" + Lang["config3"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig4' type='checkbox'/>" + Lang["config4"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig5' type='checkbox'/>" + Lang["config5"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig6' type='checkbox'/>" + Lang["config6"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig7' type='checkbox'/>" + Lang["config7"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig8' type='checkbox'/>" + Lang["config8"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig9' type='checkbox'/>" + Lang["config9"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig10' type='checkbox'/>" + Lang["config10"] + "</div>" +
								"<div class='inputOpciones'><input id='guardarConfig11' type='checkbox'/>" + Lang["config11"] + "</div>" +
								"<div><center><input class='button' type='button' id='botonGuardarMenu' value='" + Lang["save"] + "'/></center></div>" +
							"</div>" +
							"<div class='footer'/>";
		
		colocaDetras (panel, document.getElementsByClassName ("contentBox01h")[1]);
		
		document.getElementById ("botonGuardarMenu").addEventListener ("click", guardar, false);
		
		inicializaCheckbox ();
	}
	
	//Inicializo el estado de las funciones
	inicializaFunciones ();
}

/**
 * Calcula el tiempo de ejecución del script.
 */
function colocaMs (t1, t2){
	var li = document.createElement ("li");
	li.innerHTML = "<a href='http://userscripts.org/scripts/show/51336' target='_blank' title='Ikariam Reloaded'>" + (t2 - t1) + "ms</a>";
	
	document.getElementById ("GF_toolbar").childNodes[3].appendChild (li);
}

//--------------- fin FUNCIONES ---------------//


//--------------- SCRIPT ---------------//

var t1 = new Date ().getTime ();

autoUpdate (51336, "3.09");

var pagina = document.body.id;
eliminaPublicidad ();

var host = location.hostname;
var server = host.split (".")[0] + "::";
var panelesScript = GM_getValue (server + "paneles", "1#1#1#1#1#1#1#1#1").split ("#");

var Lang = new Language ().getTranslation ();
var Img = new Imagenes ();
var BaseDatos = new BD ();
var Ciudad = new Ciudad (compruebaVariableCiudades ());

estiloGlobal ();
actualizaNombreCiudad ();

cambiaUI ();
ordenImagenCiudades ();
creaLinkMinas ();
misc ();

menuConfig ();

colocaMs (t1, new Date ().getTime ());

//--------------- fin SCRIPT ---------------//