// ==UserScript==
// @name          Ikariam Treaty Tools
// @namespace     PhasmaExMachina
// @description   Shows an icon next to players you have a CAT with and lets you send CAT requests even if your museums are full.
// @include       http://s*.ikariam.*/*
// @exclude       http://support*.ikariam.*/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require       http://userscripts.org/scripts/source/57377.user.js
// @require       http://userscripts.org/scripts/source/57756.user.js
// @require       http://userscripts.org/scripts/source/62718.user.js
//
// @version       1.24
//
// @history       1.24 Re-worked code base from the ground up
// @history       1.24 Moved CT category in alliance view to right to minimize conflicts with other scripts 
// @history       1.24 Added CT column to embassy view
// @history       1.24 Added CT column to trade treaties view
// @history       1.24 Added options to hide CT icons
// @history       1.24 Added number of total CT slots to museum view
// @history       1.23 Renamed to "Ikariam Treaty Tools" (manually un-install old versions)
// @history       1.23 Added options to "scripts" in top right corner 
// @history       1.22 Fixed drawing of pending cat requests on inbox page
//
// ==/UserScript==


/*
   Based entirely on Yoshi Toranaga's Ikariam CAT Indicator (http://userscripts.org/scripts/show/50376) which is a much
   improved version of a feature that was found in the old BC Ikariam Tools.
*/

var startTime = new Date();

ScriptUpdater.check(58855, '1.24');

Config.prefix = document.domain;
Config.scriptName = "Ikariam Treaty Tools Modified";
Config.settings = {
	"CT Icons":{
		html:'<p>Select the locations where you would like to have CT icons displayed:</p>',
		fields:{
			ctAlliance:{
				type:'checkbox',
				label:'Alliance',
				text:'show icons next players in alliance views',
				value:true,
			},
			ctInbox:{
				type:'checkbox',
				label:'Inbox',
				text:'show icons next to messages in inbox',
				value:true,
			},
			ctIslandView:{
				type:'checkbox',
				label:'Island',
				text:'show icons next to city names in island view',
				value:true,
			},
			ctTradeTreaties:{
				type:'checkbox',
				label:'Treaty',
				text:'show icons next players in treaty view',
				value:true,
			}
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">Ikariam Treaty Tools v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a>\
				<p>Shows an icon next to players you have a CAT with and lets you send CAT requests even if your museums are full.</p>',
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

Treaty = {
	init:function() {
		IkaTools.addOptionsLink("Treaty Tools");
		if(typeof(Treaty.views[IkaTools.getView()]) == 'function')
			Treaty.views[IkaTools.getView()]();
		if(IkaTools.getVal('initialized').toString() != 'yes') {
			IkaTools.setVal('initialized', 'yes');
			IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=diplomacyAdvisorTreaty', Treaty.views.diplomacyAdvisorTreaty);
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
		ct:'<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" align="absmiddle" title="You cave a cultural treaty with this player" style="cursor:help;" />',
		ctPending:'<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" align="absmiddle" style="opacity:.4; cursor:help;" title="You have requested a cultural treaty with this player" />',
	},
	isMyCity:function(cityId) {
		var myCityIds = {};
		$('#citySelect option').each(function(i) {
			if(this.className == 'coords' || this.className == '' || this.className.match(/tradegood/))
				myCityIds[this.value] = true;									  
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
			cityId = cityId ? cityId : IkaTools.getCurrentCityId();
			// update museum level
			if(Treaty.isMyCity(cityId)) {
				$('ul#locations li').each(function() {
					if(this.className == 'museum')
						Treaty.setMuseumLevelForCityId($('a', this).attr('title').match(/\d$/)[0], cityId);
				});
			}
		},
		diplomacyAdvisor:function() {
			if(Config.get('ctInbox')) {
				$("table#messages tr.entry").each(function(i) {
					var messageId = this.id.match(/message(\d+)/)[1];
					var playerId = $('#tbl_reply' + messageId)[0].innerHTML.match(/receiverId=(\d+)/)[1];
					if(Treaty.hasCt(playerId)) {
						$("td", this)[2].innerHTML = Treaty.icons.ct + ' ' + $("td", this)[2].innerHTML;
					} else if(Treaty.hasPendingCt(playerId)) {
						$("td", this)[2].innerHTML = Treaty.icons.ctPending + ' ' + $("td", this)[2].innerHTML;
					}
				});
			}
		},
		diplomacyAdvisorAlly:function() {
			if(Config.get('ctAlliance')) {
				$("table#memberList").each( function() {	
					$("thead > tr", this).each( function() {
						$(this).append('<th class="catHdr">CT</th>');
					});			
					var cellNum = $("thead > tr th", this).size() - 1;
					$("tbody > tr", this).each(function() {
						var td = document.createElement('td');
						$(this).append(td);
						try { var playerId = this.innerHTML.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
						if(playerId) {
							if(Treaty.hasCt(playerId))
								$("td", this)[cellNum].innerHTML = Treaty.icons.ct;
							else if(Treaty.hasPendingCt(playerId))
								$("td", this)[cellNum].innerHTML = Treaty.icons.ctPending;	
						}
					});
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
		},
		embassy:function() {
			Treaty.views.diplomacyAdvisorAlly();
		},
		island:function() {
			if(Config.get('ctIslandView')) {
				$("ul#cities  li.city").each(function() {					
					try { var playerId = this.innerHTML.match(/receiverId=(\d+)/)[1]; } catch(e) { var playerId = false; }
					if(playerId) {
						if(Treaty.hasCt(playerId))
							$('a .textLabel .before', this).after(Treaty.icons.ct);
						else if(Treaty.hasPendingCt(playerId))
							$('a .textLabel .before', this).after(Treaty.icons.ctPending);
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
			$('tr', $('.contentBox01h', root).eq(1)).each(function(i) {
				if(i > 0) {
					var playerId = this.innerHTML.match(/receiverId=(\d+)/)[1];
					Treaty.ctPendingPlayerIds[playerId] = true;
				}
			});
			IkaTools.setVal('ctPendingPlayerIds', Treaty.ctPendingPlayerIds);
			// read CTs
			Treaty.ctPlayerIds = {};	
			$('tr', $('.contentBox01h', root).eq(2)).each(function(i) {
				if(i > 0) {
					var playerId = this.innerHTML.match(/receiverId=(\d+)/)[1];
					Treaty.ctPlayerIds[playerId] = true;
				}
			});
			IkaTools.setVal('ctPlayerIds', Treaty.ctPlayerIds);
			// show max num treaties
			$('h3.header', $('div.contentBox01h').eq(2)).append(' (' + Treaty.getNumCt() + '/' + Treaty.getMaxNumCt() + ') &nbsp; - &nbsp;  ' + Treaty.getNumCtFree() + ' open slots');
			$('#assignCulturalGoods div.totalCulturalGoods').append(' of ' + Treaty.getMaxNumCt());
		},
		sendIKMessage:function() {
			var selector = document.getElementById('treaties');
			var elems = selector.options;
			var catEnabled = false;
			for(var i = 0; i < elems.length; i++) {
				if(elems[i].value.toString() == '77')
					catEnabled = true;
			}
			if(!catEnabled) {
				var option = document.createElement('option');
				option.value = '77';
				option.innerHTML = "Request cultural goods treaty";
				selector.appendChild(option);
			}
			if(!catEnabled) {
				var option = document.createElement('option');
				option.value = '79';
				option.innerHTML = "Accept cultural goods treaty";
				selector.appendChild(option);
			}
		}
	}
};

Treaty.init();

if(Config.get('debugMode')) {
	var endTime = new Date();
	IkaTools.config.debugMode = true;
	IkaTools.debug('Treaty Tools: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
}

