// ==UserScript==
// @name           Ikariam Search
// @namespace      PhasmaExMachina , Arabick By Samerramez
// @description    Lets you search for islands, cities, players, etc. from in game using www.ika-world.com
// @include        http://s*.ikariam.*/*?*
// @include        http://s*.ikariam.*/
// @include        http://s*.ikariam.*/index.php
// @include        http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        0.09
//
// @history        0.08 Added world map overview
// @history        0.07 Updated formatting of search results to fit in search block
// @history        0.07 Stripped annoying ad block that covered search after a few seconds 
// @history        0.05 Fixed bug in name and alliance search
// @history        0.04 Added icon to crumb navs to easily open and use search form
// @history        0.04 Search icon now appears next to your own name on island view
// @history        0.04 Removed icons from city names on island view to reduce clutter
// @history        0.04 Added search icon next to player names in inbox
// @history        0.03 Fixed handling of spaces in player names
// @history        0.02 Made search icons lighter
// @history        0.02 Fixed searching for a player after searching for an alliance
//
// ==/UserScript==

ScriptUpdater.check(59825, "0.09");

IkaTools.init();

var IkaSearch = {
	init:function() {
		if(document.location.toString().match(/ika-world/)) {
			IkaSearch.handleIkaWorld();	
		} else {
			GM_addStyle('.ikaSearchIcon { opacity:.3; } .ikaSearchIcon:hover { opacity:1; }');
			
			unsafeWindow.IkaSearch = IkaSearch;
			var div = document.createElement('div');
			div.innerHTML = IkaSearch.formHtml;
			$('#mainview').append(div);
			var buttonClose = document.createElement('div');
			buttonClose.innerHTML = 'اغلاق الباحث';
			buttonClose.id = "ikaSearchButtonClose";
			buttonClose.setAttribute('style', 'display:none; position:absolute; top:0; padding-right:17px; right:0; background-color:#fff; padding:.5em 1em; font-weight:bold; z-index:25000; cursor:pointer; border:1px solid #563C2F; border-width:0 0 1px 1px;');
			buttonClose.addEventListener('click', IkaSearch.hideAll, false);
			$('#mainview').append(buttonClose);
			if(typeof(IkaSearch.views[IkaTools.getView()]) == 'function')
				IkaSearch.views[IkaTools.getView()]();
			var spn = document.createElement('div');
			spn.setAttribute('style', 'width:100px; float:right; text-align:right; margin-top:-2px;');
			// add world icon 
			var imgWorld = document.createElement('img');
			imgWorld.setAttribute('style', 'padding:5px; cursor:pointer;');
			imgWorld.title = 'World Map Overview';
			imgWorld.src = IkaSearch.icons.world;
			imgWorld.addEventListener('click', function() { IkaSearch.showWorld();  }, false);
			spn.appendChild(imgWorld);
			// add search icon to crumb nav
			var img = document.createElement('img');
			img.setAttribute('style', 'margin-right:25px; padding:5px; cursor:pointer; margin-top:-3px;');
			img.title = 'Open Search Winow';
			img.src = IkaSearch.icons.magnifier;
			img.addEventListener('click', function() { IkaSearch.showForm(); }, false);
			spn.appendChild(img);
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
			var html = '<h3 class="header">World Search</h3><div class="content" style="padding:.5em 1em;">\
							<p style="padding-left:.8em;">Player: <input tyle="text" style="width:100px;" id="ikaSearchPlayerName"/></p>\
							<p>Alliance: <input tyle="text" style="width:100px;" id="ikaSearchAlliance"/></p>\
							<p style="text-align:center; padding-top:1em;"><a id="ikaSearchWorldSubmit" href="javascript:void(0)" class="button">Search</a></p>\
						</div><div class="footer"/>';
			infoBox.innerHTML = html;
		$('#breadcrumbs').after(infoBox);
		$('#ikaSearchWorldSubmit')[0].addEventListener('click', IkaSearch.performWorldSearch, false);
		// load map data
		GM_xmlhttpRequest({method:"GET", url:"http://s2.ikariam.org/index.php?action=WorldMap&function=getJSONArea&x_min=1&x_max=100&y_min=1&y_max=100",
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
			$('#messages tr.entry').each(function() {
				var playerName = $('td', this).eq(2).text().replace(/\s*$/, '');
				var a = document.createElement('a');
				a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
				a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
				$('a', $('td', this).eq(2)).append(a);
			});
		},
		island:function() {
			// get cities on island
			var cities = {};
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
			$('.ally').each(function() {
				try { var allyName = $('a', this)[0].innerHTML; } catch(e) { var allyName = false; }
				if(allyName) {
					var a = document.createElement('a');
					a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for cities in this alliance"/>';
					a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
					$('a.messageSend', this).before(a);
				}
			});
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
		world:'data:image/png;base64,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%3D',
	},
	formHtml:'<form style="display:none; position:absolute; top:0; background:url(/skin/layout/bg_stone.jpg); left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;" id="ikaSearchForm" method="post" target="ikaSearchResults" action="http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch" onsubmit="IkaSearch.hideForm(); IkaSearch.showResults()">\
					<table style="margin:50px auto;"><tr align="center"><td>السيرفر</td><td colspan="2">\
					<select name="land" id="ikaSearchSelectServer" style="width: 200px;">\
					<option value="de">ikariam.de</option><option value="en">ikariam.org</option><option value="ae">ae.ikariam.com</option><option value="ar">ar.ikariam.com</option><option value="ba">ba.ikariam.com</option><option value="bg">ikariam.bg</option><option value="br">ikariam.com.br</option><option value="by">ikariam.by</option><option value="cl">cl.ikariam.com</option><option value="cn">ikariam.cn</option><option value="co">co.ikariam.com</option><option value="cz">ikariam.cz</option><option value="dk">ikariam.dk</option><option value="ee">ee.ikariam.com</option><option value="eg">eg.ikariam.org</option><option value="es">ikariam.es</option><option value="fi">fi.ikariam.com</option><option value="fr">ikariam.fr</option><option value="gr">ikariam.gr</option><option value="hr">hr.ikariam.org</option><option value="hk">ikariam.hk</option><option value="hu">ikariam.hu</option><option value="id">id.ikariam.com</option><option value="ih">ih.ikariam.org</option><option value="il">ikariam.co.il</option><option value="in">in.ikariam.org</option><option value="ir">ir.ikariam.com</option><option value="it">ikariam.it</option><option value="jp">jp.ikariam.org</option><option value="kr">ikariam.kr</option><option value="lt">ikariam.lt</option><option value="lv">ikariam.lv</option><option value="me">me.ikariam.org</option><option value="mx">ikariam.com.mx</option><option value="nl">ikariam.nl</option><option value="no">ikariam.no</option><option value="pe">ikariam.pe</option><option value="ph">ikariam.ph</option><option value="pk">ikariam.pk</option><option value="pl">ikariam.pl</option><option value="pt">ikariam.com.pt</option><option value="ro">ikariam.ro</option><option value="rs">ikariam.rs</option><option value="ru">ikariam.ru</option><option value="sa">sa.ikariam.org</option><option value="se">ikariam.se</option><option value="si">ikariam.si</option><option value="sk">ikariam.sk</option><option value="tr">ikariam.net</option><option value="tw">ikariam.tw</option><option value="ua">ikariam.com.ua</option><option value="us">ikariam.com</option><option value="ve">ikariam.com.ve</option><option value="vn">ikariam.vn</option>  \
				  </select>\
				</td>\
				<td>المعجزة</td>\
				<td colspan="2">\
				  <select name="wunder" style="width: 200px;">\
					<option selected="selected" value="0">-</option><option value="1">Hephaistos</option><option value="2">Temple of Gaia</option><option value="3">Garden of Dionysus</option><option value="4">Temple of Athene</option><option value="5">Temple of Hermes</option><option value="6">Ares</option><option value="7">Temple of Poseidon</option><option value="8">Colossus</option>      </select>\
				</td> 	\
			  </tr>  \
			  <tr align="center">\
				<td>العالم</td>\
				<td colspan="2">	  \
				  <select name="welt" id="ikaSearchServer" style="width: 200px;">\
					<option selected="selected" value="1">Alpha</option><option value="2">Beta</option><option value="3">Gamma</option><option value="4">Delta</option><option value="5">Epsilon</option><option value="6">Zeta</option><option value="7">Eta</option><option value="8">Theta</option><option value="9">Iota</option><option value="10">Kappa</option><option value="11">Lambda</option><option value="12">My</option><option value="13">Ny</option><option value="14">Xi</option><option value="15">Omikron</option><option value="16">Pi</option><option value="99">Speedserver</option><option value="666">Test-Server</option>      </select>\
				</td>\
				<td/>\
				<td/>\
				<td/>\
			  </tr> \
			  <tr align="center">\
				<td>اسم-اللاعب</td>\
				<td colspan="2"><input type="text" value="" name="spieler" style="width: 200px;" id="ikaSearchPlayerName"/></td>  \
				<td>التحالف</td>\
				<td colspan="2"><input type="text" value="" name="allianz" style="width: 200px;" id="ikaSearchAllianceName"/></td>  \
			  </tr>	    \
			  <tr align="center">\
				<td>اسم-الجزيرة</td>\
				<td colspan="2"><input type="text" value="" name="insel_name" style="width: 200px;"/></td>  \
				<td>اسم-المدينة</td>\
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
				<td>الخشب</td>\
				<td>\
				  <select name="holz_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="holz_level" style="width: 100px;"/></td> 	  	\
				<td>\
				  <select name="luxus">\
					<option selected="selected" value="0">Luxury Goods</option><option value="1">Marble</option><option value="2">Wine</option><option value="3">Crystall</option><option value="4">Sulphur</option>      </select>	  \
				</td>\
				<td>\
				  <select name="luxus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="luxusgut_level" style="width: 100px;"/></td>  \
			  </tr>			\
			  <tr>  	  \
				<td>دار البلدية</td>\
				<td>\
				  <select name="rathaus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="rathaus" style="width: 100px;"/></td>  	  \
				<td>البلديات</td>\
				<td>\
				  <select name="besiedelt_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
			  <td><input type="text" value="" name="besiedelt" style="width: 100px;"/></td> \
			  </tr>  \
			  <tr>\
				<td>الأحداثيات</td>\
				<td>X: <input type="text" value="0" name="x_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Y: <input type="text" value="0" name="y_start" maxlength="3" style="width: 50px;"/></td>\
				<td>الحالة</td>\
				<td><select name="xxx" style="width: 100px;"><option value="">=</option></select></td>\
				<td>\
				  <select name="status" style="width: 100px;">\
					<option selected="selected" value="0">الكل</option><option value="1">فعال</option><option value="2">عطلة</option><option value="3">خامل</option>      </select>\
				</td></tr><tr><td>1. الترتيب</td><td>\
				  <select name="asc_desc_1" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_1" style="width: 100px;">\
					<option selected="selected" value="0">Player</option><option value="1">Ally</option><option value="2">Status</option><option value="3">Town-name</option><option value="4">Town Hall</option><option value="5">X</option><option value="6">Y</option><option value="7">Island-name</option><option value="8">Wonder</option><option value="9">Wood</option><option value="10">Towns</option>      </select>\
				</td><td>2. الترتيب</td><td>\
				  <select name="asc_desc_2" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_2" style="width: 100px;">\
					<option value="0">Player</option><option selected="selected" value="1">Ally</option><option value="2">Status</option><option value="3">Town-name</option><option value="4">Town Hall</option><option value="5">X</option><option value="6">Y</option><option value="7">Island-name</option><option value="8">Wonder</option><option value="9">Wood</option><option value="10">Towns</option>      </select>\
				</td></tr><tr><td align="center" colspan="6"><input type="submit" value="Search" class="button"/></td></tr></table>			\
		</form>',
};

IkaSearch.init();