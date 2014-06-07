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
// @version        0.16.1
// @history        0.16.1 Fixed small error smaller icon than the original script, fixed error while using IkaDistanceCalc, remove magnified in island,city and highscore view to give space for the user of ikaCore tools.
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

ScriptUpdater.check(69026, "0.16.1");

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
				<p>Lets you search in-game for islands, cities, players, etc. from in game using <a href="http://ikaworld.com" target="_blank">www.ika-world.com</a>.</p>',
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
			
			unsafeWindow.IkaSearch = IkaSearch;
			var div = document.createElement('div');
			div.innerHTML = IkaSearch.formHtml;
			$('#mainview').append(div);
			var buttonClose = document.createElement('div');
			buttonClose.innerHTML = 'Close';
			buttonClose.id = "ikaSearchButtonClose";
			buttonClose.setAttribute('style', 'display:none; position:absolute; top:0; padding-right:17px; right:0; background-color:#fff; padding:.5em 1em; font-weight:bold; z-index:25000; cursor:pointer; border:1px solid #563C2F; border-width:0 0 1px 1px;');
			buttonClose.addEventListener('click', IkaSearch.hideAll, false);
			$('#mainview').append(buttonClose);
			if(typeof(IkaSearch.views[IkaTools.getView()]) == 'function')
				IkaSearch.views[IkaTools.getView()]();
			var spn = document.createElement('div');
			spn.setAttribute('style', 'float:right; text-align:right; margin-top:-2px; margin-right:25px;');
			// add world icon
			var imgWorld = document.createElement('img');
			imgWorld.setAttribute('style', 'cursor:pointer;');
			imgWorld.title = 'World Map Overview';
			imgWorld.src = IkaSearch.icons.world;
			imgWorld.addEventListener('click', function() { IkaSearch.showWorld();  }, false);
			spn.appendChild(imgWorld);
			// add search icon to crumb nav
			if(Config.get('searchIconCrumbNavs')) {
				var img = document.createElement('img');
				img.setAttribute('style', 'cursor:pointer;');
				img.title = 'Open Search Window';
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
		var serverDomain = document.domain.toString().replace(/^s\d+\./, '');
		var server = parseInt(document.domain.match(/s(\d+)\./)[1]);
		$('#ikaSearchSelectServer option').each(function(i) {
			if(this.innerHTML == serverDomain) {
				this.selected = true;
				IkaSearch.serverDomain = this.getAttribute('value');
		    }
		});
		$('#ikaSearchServer')[0].selectedIndex = server - 1;
		IkaSearch.server = server;
	},
	worldSearchKeyUp:function(e) {
		if(e.keyCode == 13) IkaSearch.performWorldSearch();
	},
	resetSearch:function() {
		$('#ikaSearchForm input').each(function() { this.value = ''; });
	},
	resetWorldSearch:function() {
		$('#ikaSearchWorldPlayer').val('');
		$('#ikaSearchWorldAlliance').val('');
	},
	performSearch:function() {
		document.location = "#";
		IkaSearch.setServer();
		$('#ikaSearchForm')[0].submit();
		$('#ikaSearchButtonClose')[0].style.display = 'block';
		IkaSearch.showResults();
	},
	performWorldSearch:function(addClass) {
		try { $('#ikaSearchWorldSubmit')[0].blur(); } catch(e) { }
		if (!addClass) {
		    $('#ikaSearchWorldWrapper td.island').removeClass('side1').removeClass('side2');
		}
		IkaSearch.setServer();
		var data = 'land=' + IkaSearch.serverDomain + '&welt=' + IkaSearch.server + '&spieler=' + $('#ikaSearchWorldPlayerName')[0].value + '&allianz=' + $('#ikaSearchWorldAlliance')[0].value;
		IkaTools.getRemoteDocument('http://ika-world.com/search.php?view=suche_stadt', function(result) {
			try { var numPages = parseInt($('form', result)[0].innerHTML.match(/from\s+(\d+)\s+pages/)[1]); } catch(e) { var numPages = 1; }
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
		var data = 'land=' + IkaSearch.serverDomain + '&welt=' + IkaSearch.server + '&spieler=' + $('#ikaSearchWorldPlayerName')[0].value + '&allianz=' + $('#ikaSearchWorldAlliance')[0].value + '&seite=' + pageNum;
		IkaTools.getRemoteDocument('http://ika-world.com/search.php?view=suche_stadt', function(result) {
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
					var aWorld = document.createElement('a');
					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
					aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline;" title="Show this player\'s cities on world map"/></a>';
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
					var aWorld = document.createElement('a');
					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
					aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline;" title="Show this player\'s cities on world map"/></a>';
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
					    	var aWorld = document.createElement('a');
        					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
		        			aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline;" title="Show this player\'s cities on world map"/></a>';
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
					a.href = 'javascript:IkaSearch.searchPlayer("' + playerName +'")';
					var aWorld = document.createElement('a');
					aWorld.href= 'javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')';
					aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline;" title="Show this player\'s cities on world map"/></a>';
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
						a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';
						var aWorld = document.createElement('a');
					    aWorld.href= 'javascript:IkaSearch.searchAllianceWorld(\'' + allyName + '\')';
					    aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline;" title="Show this player\'s cities on world map"/></a>';
						$('a.messageSend', this).before(a).before(aWorld);
					}
				});
			}
		},
		highscore:function() {
			$('.name').each(function() {
				var playerName = this.innerHTML;
				this.innerHTML += '<a href="javascript:IkaSearch.searchPlayerWorld(\'' + playerName + '\')"> <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline;" title="Show this player\'s cities on world map"/></a>';
			});
			$('.allytag').each(function() {
				try { var allyName = $('a.allyLink', this)[0].innerHTML; } catch(e) { var allyName = false; }
				if(allyName) {
				var a = document.createElement('a');
				a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';
				var aWorld = document.createElement('a');
                                aWorld.href= 'javascript:IkaSearch.searchAllianceWorld(\'' + allyName + '\')';
    				aWorld.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.world+'" style="display:inline;" title="Show this player\'s cities on world map"/></a>';
					$('a.allyLink', this).after(aWorld).after(a)
				}
			});
		},
		options:function() {
			
		},
	},
	icons:{
		magnifier:'data:image/gif;base64,R0lGODlhDwALANU6AIeHhwwMDCQkJA4ODhISEkBAQAgICBMTEy8vLw8PDygoKAUFBZubmykpKRQUFBsbGzU1NYGBgQEBAQsLCxAQEAoKChcXFwMDA+Li4oyMjKioqIODgxERESEhIX5+fomJiYqKiioqKn19fR8fHxYWFhwcHJ6enuDg4FhYWMPDw05OTjY2Nnx8fKampjg4ODMzM6mpqQkJCRgYGPDw8DQ0NNHR0ePj425ubg0NDQAAAP///wAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAPAAsAAAZ/QJ1QAHEIdQYU4XjMwRTHgajD1AFyuQFIF7nkDBHmgoFI5HQTgAE3Oa4qr0PuUQioJI9AQYdzpSQQIx45CzU5OBw5DlgzAjkkGzkEGDkhhzlyHzkBWFc3WAQ4ORQsWBUtJjoMGjkZFDlmNjEDZ0w5JzkCFzINFgUNVTQIFiUKQQA7',
		world:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAH6SURBVChTAe8BEP4BAAAAAHHGVAn+/wo1FggXYQsFDkT4+wANAP//+fb88r7r9+ad/fPyxppOtPYAVKlUCXvIal2f2InZyea4/s/qy/+33s//rdnQ/53PtP6EwoLgarVaZUyZTAoAcsNmPJvXhdrN77j/0PLM/8Xo0/+p3Nn/j8va/4vB1P+n07P/hsBy4FKhR0QAhMtxorzkpP6x8bn/te7F/6TZ1f+Ex9f/bLrH/3LNpP+M347/n86J/2ChU6wAk9J/5rLmof+S56T/vevT/3q90P9svMf/ZtSU/07baf9YzWX/mcqI/26lYOkAldOC76HflP983JL/kdLI/2Gszf9rucL/a8+o/1DDkP9RsG//kcGA/22jXu8AkdB85qnemf+F2ar/bbfJ/1an1/9Wp9H/UJq//06Vvf9copP/lL5//2ecWOoAesFqp6jWk/+By4D/ariq/1ek1f9Tpt3/S5nI/1Kdpv9vpn7/jrh4/06NRLIAYrRWQYW+ct+cy3//g8Wg/2uu0P9jqdn/X6G5/3Gwa/+Ks3H/ap9c5Dd9NEkATJlMClugT2R6sWbgmcmc/pC+xf+IuMv/kL20/46+dP9pnlrkQoM7ay5zLgsAAAAAAEyZMwpAjD1HVJVPq1uXYedXk2DuYJpd502OQ7E2fS9LLnMuCwAAAAAvUDE8VVY1kwAAAABJRU5ErkJggg==',
		island_own:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAABpJREFUGFdjZGBg%2BA%2FEWAFIAhvGKgg2hUo6ALHdHuNukMlKAAAAAElFTkSuQmCC',
		island_own_side1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAAB5JREFUGFdjZGBg%2BA%2FEWAFIAhvGKvgfJPofGyZdAgBtTDDR3nskhwAAAABJRU5ErkJggg%3D%3D',
		island_own_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAACBJREFUGFdjZGBg%2BA%2FEWAFIAhvGKvif4f8Nhv%2FYMOkSAK6KQAHtEKhxAAAAAElFTkSuQmCC',
		island_side1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAABdJREFUGFdj%2FM%2FAAERYAEgCGwYpp7UEAL9APcSoOKdAAAAAAElFTkSuQmCC',
		island_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAABdJREFUGFdj%2FH%2BD4T8DNgCSwIYZ6CABAHc5V%2ByvCt29AAAAAElFTkSuQmCC',
		island_side1_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAAB1JREFUGFdj%2FM%2FAAERQcAPOAov%2Bh%2BMbQDYU00MCAAOkS0QiTJV2AAAAAElFTkSuQmCC',
		island_own_side1_side2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIwWZ92UQAAACJJREFUGFdjZGBg%2BA%2FEWAFIAhvGKvgfJPofjm8A2VBMugQAYFs4aWAd1TQAAAAASUVORK5CYII%3D',
	},
	formHtml:'<form style="display:none; position:absolute; top:0; background:url(/skin/layout/bg_stone.jpg); left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;" id="ikaSearchForm" method="post" target="ikaSearchResults" action="http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch" onsubmit="IkaSearch.hideForm(); IkaSearch.showResults()">\
					<table style="margin:50px auto;"><tr align="center"><td>Country</td><td colspan="2">\
					<select name="land" id="ikaSearchSelectServer" style="width: 200px;">\
					<option value="de">ikariam.de</option><option value="en">ikariam.org</option><option value="ae">ae.ikariam.com</option><option value="ar">ar.ikariam.com</option><option value="ba">ba.ikariam.com</option><option value="bg">ikariam.bg</option><option value="br">ikariam.com.br</option><option value="by">ikariam.by</option><option value="cl">cl.ikariam.com</option><option value="cn">ikariam.cn</option><option value="co">co.ikariam.com</option><option value="cz">ikariam.cz</option><option value="dk">ikariam.dk</option><option value="ee">ee.ikariam.com</option><option value="eg">eg.ikariam.org</option><option value="es">ikariam.es</option><option value="fi">fi.ikariam.com</option><option value="fr">ikariam.fr</option><option value="gr">ikariam.gr</option><option value="hr">hr.ikariam.org</option><option value="hk">ikariam.hk</option><option value="hu">ikariam.hu</option><option value="id">id.ikariam.com</option><option value="ih">ih.ikariam.org</option><option value="il">ikariam.co.il</option><option value="in">in.ikariam.org</option><option value="ir">ir.ikariam.com</option><option value="it">ikariam.it</option><option value="jp">jp.ikariam.org</option><option value="kr">ikariam.kr</option><option value="lt">ikariam.lt</option><option value="lv">ikariam.lv</option><option value="me">me.ikariam.org</option><option value="mx">ikariam.com.mx</option><option value="nl">ikariam.nl</option><option value="no">ikariam.no</option><option value="pe">ikariam.pe</option><option value="ph">ikariam.ph</option><option value="pk">ikariam.pk</option><option value="pl">ikariam.pl</option><option value="pt">ikariam.com.pt</option><option value="ro">ikariam.ro</option><option value="rs">ikariam.rs</option><option value="ru">ikariam.ru</option><option value="sa">sa.ikariam.org</option><option value="se">ikariam.se</option><option value="si">ikariam.si</option><option value="sk">ikariam.sk</option><option value="tr">ikariam.net</option><option value="tw">ikariam.tw</option><option value="ua">ikariam.com.ua</option><option value="us">ikariam.com</option><option value="ve">ikariam.com.ve</option><option value="vn">ikariam.vn</option>  \
				  </select>\
				</td>\
				<td>Wonder</td>\
				<td colspan="2">\
				  <select name="wunder" style="width: 200px;">\
					<option selected="selected" value="0">-</option><option value="1">Hephaistos</option><option value="2">Temple of Gaia</option><option value="3">Garden of Dionysus</option><option value="4">Temple of Athene</option><option value="5">Temple of Hermes</option><option value="6">Ares</option><option value="7">Temple of Poseidon</option><option value="8">Colossus</option>      </select>\
				</td> 	\
			  </tr>  \
			  <tr align="center">\
				<td>World</td>\
				<td colspan="2">	  \
				  <select name="welt" id="ikaSearchServer" style="width: 200px;">\
					<option selected="selected" value="1">Alpha</option><option value="2">Beta</option><option value="3">Gamma</option><option value="4">Delta</option><option value="5">Epsilon</option><option value="6">Zeta</option><option value="7">Eta</option><option value="8">Theta</option><option value="9">Iota</option><option value="10">Kappa</option><option value="11">Lambda</option><option value="12">My</option><option value="13">Ny</option><option value="14">Xi</option><option value="15">Omikron</option><option value="16">Pi</option><option value="99">Speedserver</option><option value="666">Test-Server</option>      </select>\
				</td>\
				<td/>\
				<td/>\
				<td/>\
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