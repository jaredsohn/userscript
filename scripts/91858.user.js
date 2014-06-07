// ==UserScript==
// @name           Ikariam Search
// @namespace      http://userscripts.org/scripts/show/69026
// @description    Lets you search for islands, cities, players, etc. from in game using www.ika-world.com
// @include        http://s*.ikariam.*/*?*
// @include        http://s*.ikariam.*/
// @include        http://s*.ikariam.*/index.php
// @include        http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @version        0.26
//
// @history        0.26 Fix for recent ika-world domain redirect.
// @history        0.25 Added ref parameter to ika-world requests.
// @history        0.24 Added tr.ikariam.com domain mapping.
// @history        0.23 Added en.ikariam.com domain mapping.
// @history        0.22 Fixed to work with www.ika-world.com changes.
// @history        0.21 Fixed .pt and other a couple other domains that were not fixed in the previous go-around.
// @history        0.20 Added a less hacky fix for ikariam domain changes.  Fixed misspelled url.
// @history        0.19 Added hack to deal with ikariam.it domain is now it.ikariam.com
// @history        0.18 Added hack to deal with ikariam.com domain is now us.ikariam.com (maybe different in other parts of the world?)
// @history        0.17 Fixed a small display issue with appearance of "Add Side 1" and "Add Side 2" buttons.
// @history        0.16 Added "war planning" mode.  Use the "Add Side 1" or "Add Side 2" buttons to display two sides on the map, one in red and one in yellow.  Also implemented some island data caching.
// @history        0.15 Added "world view search" quicklinks alongside all plain search quicklinks.
// @history        0.14 Made search iframe scrollable horizontally (otherwise it's hard to use).  Updated about dialog.
// @history        0.13 Fixed bug that prevented world map view of search results from working
// @history        0.12 Added option to disable search icon in inbox view
// @history        0.12 Misc. improvements to options interface and addition of debug mode in about tab 
// @history        0.11 Added options & settings under "Scripts" in top right of page
// @history        0.10 Fixed world overview load data 
// @history        0.09 In world overview search, pressing enter in player or alliance fields now launches search
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

ScriptUpdater.check(69026, "0.26");

function curry(f) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return f.apply(this, args.concat([].slice.call(arguments, 0)));
  };
}

Config.prefix = document.domain;
Config.scriptName = 'Ikariam Search';
Config.settings = {
	"Search Icons":{
		html:'<p>Select the places you would like to see the search icons.</p>',
		fields:{
			searchIconCrumbNavs:{
				type:'checkbox',
				label:'Crumb Navigation',
				text:'search icon to right in crumb navigation',
				value:true,
			},
			searchIconIslandPlayer:{
				type:'checkbox',
				label:'Island Player',
				text:'player name in island view when a city is selected',
				value:true,
			},
			searchIconIslandAlly:{
				type:'checkbox',
				label:'Island Alliance',
				text:'alliance name in in island view when a city is selected',
				value:true,
			},
			searchIconInbox:{
				type:'checkbox',
				label:'Inbox',
				text:'next to sender name in <a href="/index.php?view=diplomacyAdvisor">inbox</a>',
				value:true,
			},
			searchIconOutboxbox:{
				type:'checkbox',
				label:'Outbox',
				text:'next to recipient name in <a href="/index.php?view=diplomacyAdvisorOutBox">outbox</a>',
				value:true,
			},
			searchIconTreaties:{
				type:'checkbox',
				label:'Treaty',
				text:'next to name in <a href="/index.php?view=diplomacyAdvisorTreaty">treaty overview</a>',
				value:true,
			}
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">Ikariam Search v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a> (bug fixes by <a href="http://userscripts.org/users/AubergineAnodyne" target="_blank">AubergineAnodyne</a>)\
				<p>Lets you search in-game for islands, cities, players, etc. from in game using <a href="http://ika-world.com" target="_blank">www.ika-world.com</a>.</p>',
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



IkaTools.init();

var IkaSearch = {
	init:function() {
		var startTime = new Date();
		if(document.location.toString().match(/ika-world/)) {
			IkaSearch.handleIkaWorld();	
		} else {
			IkaTools.addOptionsLink("Search");
			GM_addStyle('.ikaSearchIcon { opacity:.3; } .ikaSearchIcon:hover { opacity:1; }');
			
			IkaSearch.setServer();
			IkaSearch.formHtml = IkaSearch.formHtml.replace('IKASEARCH_REPLACE_DOMAIN', IkaSearch.serverDomain).replace('IKASEARCH_REPLACE_SERVER', IkaSearch.server);
			unsafeWindow.IkaSearch = IkaSearch;
			var div = document.createElement('div');
			div.innerHTML = IkaSearch.formHtml;
			$('#mainview').append(div);
			var buttonClose = document.createElement('div');
			buttonClose.innerHTML = 'close search';
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
			imgWorld.title = 'World Map Overview';
			imgWorld.src = IkaSearch.icons.world;
			imgWorld.addEventListener('click', function() { IkaSearch.showWorld();  }, false);
			spn.appendChild(imgWorld);
			// add search icon to crumb nav
			if(Config.get('searchIconCrumbNavs')) {
				var img = document.createElement('img');
				img.setAttribute('style', 'padding:5px; cursor:pointer; margin-top:-3px;');
				img.title = 'Open Search Winow';
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
				resultBox.setAttribute('style', 'position:absolute; top:0; left:0; border:none; width:100%; z-index:20000; display:none; ');
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
	drawWorldOverview:function(callback) {
		var div = document.createElement('div');
			div.id = 'ikaSearchWorldWrapper';
			div.innerHTML = 'hello world';
			div.setAttribute('style', 'display:none; height:750px; position:absolute; top:0; background-color:#83C3FF; left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;');
		$('#mainview').append(div);
		IkaSearch.worldWrapper = div;
		// search box
		var infoBox = document.createElement('div');
			infoBox.className = 'dynamic';
			infoBox.id = 'ikaSearchInfoBox';
			var html = '<h3 class="header">World Search</h3><div class="content" style="padding:.5em 1em;">\
							<p style="padding-left:.8em;">Player: <input tyle="text" style="width:100px;" id="ikaSearchWorldPlayerName"/></p>\
							<p>Alliance: <input tyle="text" style="width:100px;" id="ikaSearchWorldAlliance"/></p>\
							<p style="text-align:center;"><input id="ikaSearchWorldSubmit" value="Search" class="button" style="width:75px; display:inline;"/></p>\
							<p style="text-align:center;"><input id="ikaSearchWorldSubmitSide1" value="Add Side 1" class="button" style="width:60px; display:inline;"/> <input id="ikaSearchWorldSubmitSide2" value="Add Side 2" class="button" style="width:60px; display:inline;"/></p>\
						</div><div class="footer"/>';
			infoBox.innerHTML = html;
		$('#breadcrumbs').after(infoBox);
		$('#ikaSearchWorldPlayerName')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldAlliance')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldSubmit')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldSubmit')[0].addEventListener('click', function() {IkaSearch.performWorldSearch(); }, false);
		$('#ikaSearchWorldSubmitSide1')[0].addEventListener('click', function() {IkaSearch.performWorldSearch('side1'); }, false);
		$('#ikaSearchWorldSubmitSide2')[0].addEventListener('click', function() {IkaSearch.performWorldSearch('side2'); }, false);
		
		// load map data
		var handleIslandData = function(islands) {
		    islands.getByCoords = function(x, y) {
				return this[x] && this[x][y] ? this[x][y] : false;
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
		    if (callback) {
              callback();
            }
		};
		
		var islandData = IkaTools.getVal('IkaSearch-IslandData');
		// The only islandData we care about that changes is the number of cities.  This will only change slowly, so 
		// use a cached copy updated once every 4 days.  Also, it displays a lot faster if it doesn't have to 
		// reload the whole island dataset.
		if (islandData && islandData.cacheTime && ((new Date() - islandData.cacheTime) < 1000 * 60 * 60 * 24 * 4)) {
		    handleIslandData(islandData.data);
		} else {
		    GM_xmlhttpRequest({method:"GET", url:"http://" + document.domain + "/index.php?action=WorldMap&function=getJSONArea&x_min=1&x_max=100&y_min=1&y_max=100",
		      headers:{
			    "Accept":"text/txt",
			    },
		      onload:function(details) {
			    var islands = unsafeWindow.JSON.parse(details.responseText).data;
    			IkaTools.setVal('IkaSearch-IslandData', {"data": islands, "cacheTime": (new Date() - 0)});
    			handleIslandData(islands);
		      }
		    });
		}
	},
	setServer:function() {
	    var serverDomains = { 
            'ikariam.de': 'de',
            'ikariam.org': 'en',
            'ae.ikariam.com': 'ae',
            'ar.ikariam.com': 'ar',
            'ba.ikariam.com': 'ba',
            'ikariam.bg': 'bg',
            'ikariam.com.br': 'br',
            'ikariam.by': 'by',
            'cl.ikariam.com': 'cl',
            'ikariam.cn': 'cn',
            'co.ikariam.com': 'co',
            'ikariam.cz': 'cz',
            'ikariam.dk': 'dk',
            'ee.ikariam.com': 'ee',
            'en.ikariam.com': 'en',
            'eg.ikariam.org': 'eg',
            'ikariam.es': 'es',
            'fi.ikariam.com': 'fi',
            'ikariam.fr': 'fr',
            'ikariam.gr': 'gr',
            'hr.ikariam.org': 'hr',
            'ikariam.hk': 'hk',
            'ikariam.hu': 'hu',
            'id.ikariam.com': 'id',
            'ih.ikariam.org': 'ih',
            'ikariam.co.il': 'il',
            'in.ikariam.org': 'in',
            'ir.ikariam.com': 'ir',
            'ikariam.it': 'it',
            'jp.ikariam.org': 'jp',
            'ikariam.kr': 'kr',
            'ikariam.lt': 'lt',
            'ikariam.lv': 'lv',
            'me.ikariam.org': 'me',
            'ikariam.com.mx': 'mx',
            'ikariam.nl': 'nl',
            'ikariam.no': 'no',
            'ikariam.pe': 'pe',
            'ikariam.ph': 'ph',
            'ikariam.pk': 'pk',
            'ikariam.pl': 'pl',
            'ikariam.com.pt': 'pt',
            'ikariam.ro': 'ro',
            'ikariam.rs': 'rs',
            'ikariam.ru': 'ru',
            'sa.ikariam.org': 'sa',
            'ikariam.se': 'se',
            'ikariam.si': 'si',
            'ikariam.sk': 'sk',
            'ikariam.net': 'tr',
            'tr.ikariam.com': 'tr',
            'ikariam.tw': 'tw',
            'ikariam.com.ua': 'ua',
            'ikariam.com': 'us',
            'us.ikariam.com': 'us',
            'ikariam.com.ve': 've',
            'ikariam.vn': 'vn',
        };
	                    
		var serverDomain = document.domain.toString().replace(/^s\d+\./, '');
		var server = parseInt(document.domain.match(/s(\d+)\./)[1]);
		// Try several different domain formats because Ikariam finds it fun to 
		// change them every once in a while.
		var selected = false;
		//unsafeWindow.console.log("Searching for domain: " + serverDomain);
		if (serverDomains[serverDomain]) {
		    IkaSearch.serverDomain = serverDomains[serverDomain];
		    selected = true;
		}
		if (!selected) {
		    var serverDomainMatch = /^([^.]+)\.ikariam\.com$/.exec(serverDomain);
		    if (serverDomainMatch) {
		        serverDomain = 'ikariam.' + serverDomainMatch[1];
		        //unsafeWindow.console.log("Searching for domain: " + serverDomain);
		        if (serverDomains[serverDomain]) {
		            IkaSearch.serverDomain = serverDomains[serverDomain];
		            selected = true;
		        }
		        if (!selected) {
		            serverDomain = 'ikariam.com.' + serverDomainMatch[1];
		            //unsafeWindow.console.log("Searching for domain: " + serverDomain);
		            if (serverDomains[serverDomain]) {
		                IkaSearch.serverDomain = serverDomains[serverDomain];
		                selected = true;
		            }
		        }
		    }
		}
		if (!selected) {
		    throw Error("Unable to find match for " + document.domain.toString().replace(/^s\d+\./, ''));
		} else {
		    //unsafeWindow.console.log("Set IkaSearch.serverDomain to " + IkaSearch.serverDomain);
		}
		// Test world
		if (server == 666) {
		    server = 26;
		}
		if (server == 99) {
		    server = 25;
		}
		IkaSearch.server = server;
	},
	worldSearchKeyUp:function(e) {
		if(e.keyCode == 13) IkaSearch.performWorldSearch();
	},
	resetSearch:function() {
		$('#ikaSearchForm input').each(function() { this.value = ''; });
	},
	resetWorldSearch:function() {
		$('#ikaSearchWorldPlayerName').val('');
		$('#ikaSearchWorldAlliance').val('');
	},
	performSearch:function() {
		document.location = "#";
		$('#ikaSearchForm')[0].submit();
		$('#ikaSearchButtonClose')[0].style.display = 'block';
		IkaSearch.showResults();
	},
	performWorldSearch:function(addClass) {
		try { $('#ikaSearchWorldSubmit')[0].blur(); } catch(e) { }
		try { $('#ikaSearchWorldSubmitSide1')[0].blur(); } catch(e) { }
		try { $('#ikaSearchWorldSubmitSide2')[0].blur(); } catch(e) { }
		if (!addClass) {
		    $('#ikaSearchWorldWrapper td.island').removeClass('side1').removeClass('side2');
		}
		var url = 'http://us.ika-world.com/search.php?ref=gm_ikariam_search&view=suche_stadt&land=' + IkaSearch.serverDomain + '&welt=' + IkaSearch.server;
		var data = 'spieler=' + $('#ikaSearchWorldPlayerName')[0].value + '&allianz=' + $('#ikaSearchWorldAlliance')[0].value + '&seite=1';
		//unsafeWindow.console.log(url + " with " + data);
		IkaTools.getRemoteDocument(url, function(result) {
			try { var numPages = parseInt($('#main', result)[0].innerHTML.match(/from\s+(\d+)\s+pages/)[1]); } catch(e) { var numPages = 1; }
			//unsafeWindow.console.log("Num pages: " + numPages);
			if(typeof($('table', result)[1]) != 'undefined') {
			    addClass = addClass || 'side1';
				$('tr', $('table', result)[1]).each(function(i) {
					try { var islId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var islId = false; }
					if(islId) {
						try { $('#ikaSearchIsland_' + islId).addClass(addClass); } catch(e) {}
					}
				});
			}
			// draw additional pages
			for(var i = 2; i < 50 && i <= numPages; i++) {
				IkaSearch.getNextResultPage(i, addClass);
			}
		}, 'POST', data);
	},
	getNextResultPage:function(pageNum, addClass) {
		var url = 'http://us.ika-world.com/search.php?ref=gm_ikariam_search&view=suche_stadt&land=' + IkaSearch.serverDomain + '&welt=' + IkaSearch.server;
		var data = 'spieler=' + $('#ikaSearchWorldPlayerName')[0].value + '&allianz=' + $('#ikaSearchWorldAlliance')[0].value + '&seite=' + pageNum;
		//unsafeWindow.console.log(url + " with " + data);
		IkaTools.getRemoteDocument(url, function(result) {
		    addClass = addClass || 'side1';
			if(typeof($('table', result)[1]) != 'undefined') {																					
				$('tr', $('table', result)[1]).each(function(i) {
					try { var islId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var islId = false; }
					if(islId) {
						try { $('#ikaSearchIsland_' + islId).addClass(addClass); } catch(e) {}
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
	searchPlayerWorld:function(playerName) {
	    window.setTimeout(function() {
	        IkaSearch.resetWorldSearch();
		    IkaSearch.showWorld(function() {
		        $('#ikaSearchWorldPlayerName').attr('value', playerName.replace(/&nbsp;/g, ' '));
		        IkaSearch.performWorldSearch();
		    });
		}, 0);
	},
	searchAlliance:function(allianceName) {
		IkaSearch.resetSearch();
		$('#ikaSearchAllianceName').attr('value', allianceName);
		IkaSearch.performSearch();
	},
	searchAllianceWorld:function(allianceName) {
	    window.setTimeout(function() {
            IkaSearch.resetWorldSearch();
	        IkaSearch.showWorld(function() {
		        $('#ikaSearchWorldAlliance').attr('value', allianceName);
		        IkaSearch.performWorldSearch();
		    });
	    }, 0);
	},	
	showClose:function() {
		$('#ikaSearchButtonClose')[0].style.display = 'block';
	},
	showForm:function() {
		IkaSearch.hideAll();
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
	showWorld:function(callback) {
		IkaSearch.hideAll();
		IkaSearch.showClose();
		if(typeof(IkaSearch.worldWrapper) == 'undefined') {		
			IkaSearch.drawWorldOverview(callback);			
			GM_addStyle('#ikaSearchWorldTable td { width:6px; height:7px; border:1px solid #83C3FF; }\
						#ikaSearchWorldTable td.island { background-color:#967647; cursor:pointer; }\
						#ikaSearchWorldTable td.island.own { background:url(' + IkaSearch.icons.island_own + '); }\
						#ikaSearchWorldTable td.island.own.side1 { background:url(' + IkaSearch.icons.island_own_side1 + '); }\
						#ikaSearchWorldTable td.island.own.side2 { background:url(' + IkaSearch.icons.island_own_side2 + '); }\
						#ikaSearchWorldTable td.island.own.side1.side2 { background:url(' + IkaSearch.icons.island_own_side1_side2 + '); }\
						#ikaSearchWorldTable td.island.side1 { background:url(' + IkaSearch.icons.island_side1 + '); }\
						#ikaSearchWorldTable td.island.side2 { background:url(' + IkaSearch.icons.island_side2 + '); }\
						#ikaSearchWorldTable td.island.side1.side2 { background:url(' + IkaSearch.icons.island_side1_side2 + '); }');
		} else {
		    if (callback) {
		        callback();
		    }
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
					var aWorld = document.createElement('a');
					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
					aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline; margin:0 .2em;" title="Show this player\'s cities on world map"/></a>';
					$('a', $('td', this).eq(2)).append(a).append(aWorld);
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
					var aWorld = document.createElement('a');
					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
					aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline; margin:0 .2em;" title="Show this player\'s cities on world map"/></a>';
					$('a', $('td', this).eq(2)).append(a).append(aWorld);
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
					    	var aWorld = document.createElement('a');
        					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
		        			aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline; margin:0 .2em;" title="Show this player\'s cities on world map"/></a>';
					        $('a', $('td', this).eq(2)).append(a).append(aWorld);
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
					var aWorld = document.createElement('a');
					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
					aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline; margin:0 .2em;" title="Show this player\'s cities on world map"/></a>';
					if($('a.messageSend', this).size() > 0) {
						$('a.messageSend', this).before(a).before(aWorld);
					} else {
						this.appendChild(a); 
						$(this).append(aWorld);
			        }
				});
			}
			if(Config.get('searchIconIslandAlly')) {
				$('.ally').each(function() {
					try { var allyName = $('a', this)[0].innerHTML; } catch(e) { var allyName = false; }
					if(allyName) {
						var a = document.createElement('a');
						a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for cities in this alliance"/>';
						a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
						var aWorld = document.createElement('a');
					    aWorld.href= 'javascript:IkaSearch.searchAllianceWorld(\'' + allyName + '\')';
					    aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline; margin:0 .2em;" title="Show this player\'s cities on world map"/></a>';
						$('a.messageSend', this).before(a).before(aWorld);
					}
				});
			}
		},
		highscore:function() {
			$('.name').each(function() {
				var playerName = this.innerHTML;
				this.innerHTML += ' &nbsp; <a href="javascript:IkaSearch.searchPlayer(\'' + playerName +'\')"><img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/></a><a href="javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')"><img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline; margin:0 .2em;" title="Show this player\'s cities on world map"/></a>';
			});
			$('.allytag').each(function() {
				try { var allyName = $('a.allyLink', this)[0].innerHTML; } catch(e) { var allyName = false; }
				if(allyName) {
					var a = document.createElement('a');
					a.innerHTML = ' &nbsp; <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for cities in this alliance"/>';
					a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
					var aWorld = document.createElement('a');
    			    aWorld.href= 'javascript:IkaSearch.searchAllianceWorld(\'' + allyName + '\')';
				    aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline; margin:0 .2em;" title="Show this player\'s cities on world map"/></a>';
					$('a.allyLink', this).after(aWorld).after(a)
				}
			});
		},
		options:function() {
			
		},
	},
	icons:{
		magnifier:'data:image/gif;base64,R0lGODlhDwALANU6AIeHhwwMDCQkJA4ODhISEkBAQAgICBMTEy8vLw8PDygoKAUFBZubmykpKRQUFBsbGzU1NYGBgQEBAQsLCxAQEAoKChcXFwMDA+Li4oyMjKioqIODgxERESEhIX5+fomJiYqKiioqKn19fR8fHxYWFhwcHJ6enuDg4FhYWMPDw05OTjY2Nnx8fKampjg4ODMzM6mpqQkJCRgYGPDw8DQ0NNHR0ePj425ubg0NDQAAAP///wAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAPAAsAAAZ/QJ1QAHEIdQYU4XjMwRTHgajD1AFyuQFIF7nkDBHmgoFI5HQTgAE3Oa4qr0PuUQioJI9AQYdzpSQQIx45CzU5OBw5DlgzAjkkGzkEGDkhhzlyHzkBWFc3WAQ4ORQsWBUtJjoMGjkZFDlmNjEDZ0w5JzkCFzINFgUNVTQIFiUKQQA7',
		world:'data:image/png;base64,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%3D',
		island_own:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAABpJREFUGFdjZGBg%2BA%2FEWAFIAhvGKgg2hUo6ALHdHuNukMlKAAAAAElFTkSuQmCC',
		island_own_side1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAAB5JREFUGFdjZGBg%2BA%2FEWAFIAhvGKvgfJPofGyZdAgBtTDDR3nskhwAAAABJRU5ErkJggg%3D%3D',
		island_own_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAACBJREFUGFdjZGBg%2BA%2FEWAFIAhvGKvif4f8Nhv%2FYMOkSAK6KQAHtEKhxAAAAAElFTkSuQmCC',
		island_side1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAABdJREFUGFdj%2FM%2FAAERYAEgCGwYpp7UEAL9APcSoOKdAAAAAAElFTkSuQmCC',
		island_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAABdJREFUGFdj%2FH%2BD4T8DNgCSwIYZ6CABAHc5V%2ByvCt29AAAAAElFTkSuQmCC',
		island_side1_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAAB1JREFUGFdj%2FM%2FAAERQcAPOAov%2Bh%2BMbQDYU00MCAAOkS0QiTJV2AAAAAElFTkSuQmCC',
		island_own_side1_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAACJJREFUGFdjZGBg%2BA%2FEWAFIAhvGKvgfJPofjm8A2VBMugQAYFs4aWAd1TQAAAAASUVORK5CYII%3D',
	},
	formHtml:'<form style="display:none; position:absolute; top:0; background:url(/skin/layout/bg_stone.jpg); left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;" id="ikaSearchForm" method="post" target="ikaSearchResults" action="http://us.ika-world.com/search.php?ref=gm_ikariam_search&view=suche_stadt&land=IKASEARCH_REPLACE_DOMAIN&welt=IKASEARCH_REPLACE_SERVER" onsubmit="IkaSearch.hideForm(); IkaSearch.showResults()">\
					<table style="margin:50px auto;"> \
			  <tr align="center">\
				<td></td>\
				<td colspan="2">	  \
				</td>\
				<td>Wonder</td>\
				<td colspan="2">\
				  <select name="wunder" style="width: 200px;">\
					<option selected="selected" value="0">-</option><option value="1">Hephaistos</option><option value="2">Temple of Gaia</option><option value="3">Garden of Dionysus</option><option value="4">Temple of Athene</option><option value="5">Temple of Hermes</option><option value="6">Ares</option><option value="7">Temple of Poseidon</option><option value="8">Colossus</option>      </select>\
				</td> 	\
			  </tr> \
			  <tr align="center">\
				<td>Player-name</td>\
				<td colspan="2"><input type="text" value="" name="spieler" style="width: 200px;" id="ikaSearchPlayerName"/></td>  \
				<td>Ally</td>\
				<td colspan="2"><input type="text" value="" name="allianz" style="width: 200px;" id="ikaSearchAllianceName"/></td>  \
			  </tr>	    \
			  <tr align="center">\
				<td>Island-name</td>\
				<td colspan="2"><input type="text" value="" name="insel_name" style="width: 200px;"/></td>  \
				<td>Town-name</td>\
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
				<td>Wood</td>\
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
				<td>Town Hall</td>\
				<td>\
				  <select name="rathaus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="rathaus" style="width: 100px;"/></td>  	  \
				<td>Towns</td>\
				<td>\
				  <select name="besiedelt_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
			  <td><input type="text" value="" name="besiedelt" style="width: 100px;"/></td> \
			  </tr>  \
			  <tr>\
				<td>Start</td>\
				<td>X: <input type="text" value="0" name="x_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Y: <input type="text" value="0" name="y_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Status</td>\
				<td><select name="xxx" style="width: 100px;"><option value="">=</option></select></td>\
				<td>\
				  <select name="status" style="width: 100px;">\
					<option selected="selected" value="0">All the same</option><option value="1">Normal</option><option value="2">Vacation</option><option value="3">Inactive</option>      </select>\
				</td></tr><tr><td>1. sort</td><td>\
				  <select name="asc_desc_1" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_1" style="width: 100px;">\
					<option selected="selected" value="0">Player</option><option value="1">Ally</option><option value="2">Status</option><option value="3">Town-name</option><option value="4">Town Hall</option><option value="5">X</option><option value="6">Y</option><option value="7">Island-name</option><option value="8">Wonder</option><option value="9">Wood</option><option value="10">Towns</option>      </select>\
				</td><td>2. sort</td><td>\
				  <select name="asc_desc_2" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_2" style="width: 100px;">\
					<option value="0">Player</option><option selected="selected" value="1">Ally</option><option value="2">Status</option><option value="3">Town-name</option><option value="4">Town Hall</option><option value="5">X</option><option value="6">Y</option><option value="7">Island-name</option><option value="8">Wonder</option><option value="9">Wood</option><option value="10">Towns</option>      </select>\
				</td></tr><tr><td align="center" colspan="6"><input type="submit" value="Search" class="button"/></td></tr></table>			\
		</form>',
};

IkaSearch.init();