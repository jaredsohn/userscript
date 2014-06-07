// ==UserScript==
// @name           Ikariam Alliance Secretary
// @namespace      holyschmidt
// @description    Some tools to assist your alliance.
// @include        http://s2.en.ikariam.com/*
// @exclude        http://s2.en.ikariam.com/*oldView=embassyGeneralTroops*
// @exclude        http://s2.en.ikariam.com/*oldView=embassyGeneralAttacksToAlly*
// @exclude        http://s2.en.ikariam.com/*oldView=embassyGeneralAttacksFromAlly*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 
// @require        http://userscripts.org/scripts/source/61914.user.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @version        0.24
//
// @history        0.23 Bugfix in reading highscores.
// @history        0.22 Further improvements to settings.
// @history        0.21 Performance improvement in incoming + outgoing views.
// @history        0.20 Major re-work (mostly server side) to remove client-side authentication.  Secretary now uploads scores as well.
// @history        0.15 Updated island info that gets uploaded.
// @history        0.13 Changed settings dialog.  Added debug dialog.
// @history        0.13 Changed settings dialog.  Added debug dialog.
// @history        0.12 Added support for uploading Communication Spy Reports.
// @history        0.11 Catch put in to ensure page being read is the correct view.
// @history        0.10 Moved where server and domain were being read.
// @history        0.09 Added support for alliance member cities.
// @history        0.08 Some minor structure changes put in place.
// @history        0.07 Added support for outgoing attacks.
// @history        0.06 Fixed errors when user does not have General's access.
// @history        0.05 Added support for incoming attacks.
// @history        0.04 Added support for multiple servers/alliances.
// @history        0.03 Small issue with FF3.0
// @history        0.02 Few minor changes to include/exclude lines
// @history        0.01 Initial Version
//
// ==/UserScript==

var startTime = new Date();

try { ScriptUpdater.check(61919, "0.24"); } catch(e) {}

Config.scriptName = 'Alliance Secretary';
Config.settings = {
	"General":{
		html:'<p>General settings.</p>',
		fields:{
			enabled:{
				type:'checkbox',
				label:'Enabled',
				text:'is the secretary enabled?',
				value:true,
			},
			silentErrors:{
				type:'checkbox',
				label:'Silent Error',
				text:'show error in console (true) or alert (false)?',
				value:true,
			},
			uploadSite:{
				type:'text',
				label:'Upload Site',
				width:'300',
				value:'',
			},
			maxScoreOffset:{
				type:'text',
				label:'Maximum score offset',
				value:'-1',
			},
		},
	},
}

Secretary = {
	enabled:Config.get('enabled'),
	site:Config.get('uploadSite'),
	server:getServerDomain() + '.' + getServerWorld(),
	runTimeError:false,
	debugLevel:10,
	cities:null,
	island:null,
	incoming:null,
	outgoing:null,
	spyReports:null,
	units:{},
	init:function(root) {
		IkaTools.addOptionsLink(Config.scriptName);
		if (Secretary.enabled && $('ul.error')[0] == null)
		{ 
			// Add settings/debug interface for script
			Secretary.customize();

			// parse current view (page)
			if(typeof(Secretary.views[document.body.id]) == 'function') {
				Secretary.Icon.Busy();
				Secretary.views[document.body.id]();
			}
		}
	},
	customize:function() {
		try {
			GM_addStyle(
				'#ikSecretaryStatus { position:absolute; top:5px; right:5px; z-index:9999; background-color:#FFFFFF; padding:2px 2px 0 2px; border:1px solid; text-align:right; } ' +
				'#ikSecretaryStatus img { position:relative; } ' +
				'#ikSecretaryStatusIcon #ikSecretaryConsole { cursor:pointer } '
			);

			$('body').append(
				'<div id="ikSecretaryStatus">' +
					'<img id="ikSecretaryConsole" src="http://tools.betawarriors.com/common/console.png" width="16" height="16" title="Console"/>' +
					'<img id="ikSecretaryStatusIcon" src="http://tools.betawarriors.com/common/upload-idle.gif" width="16" height="16" title="Idle"/>' + 
				'</div>'
			);
	
			$('#ikSecretaryStatus #ikSecretaryConsole').click(function() {
				Secretary.Console.show();
			});
		} catch(e) { 
			/* do nothing */ 
		}
	},
	readIncoming:function(root)	{
		try {
			if ($('#mainview table.table01 tr.rowRanks', root).length > 0) {
				counter = 0;
				Secretary.incoming = { };
				$('#mainview table.table01 tr.rowRanks', root).each(function() {
					if ($('script', this)[0] != null) {
						countdown = $('script', this)[0].innerHTML;
						end = countdown.substr(countdown.indexOf('enddate: ') + 9);
						end = end.substr(0, end.indexOf(','));
						action = $('td', this)[1].innerHTML;
						units = $('td', this)[2].innerHTML;
						attacker = $('a', this)[0].innerHTML; 
						attackerTown = $('a', this)[0].href.substr($('a', this)[0].href.indexOf('cityId=') + 7);
						defender = $('a', this)[1].innerHTML; 
						defenderTown = $('a', this)[1].href.substr($('a', this)[1].href.indexOf('cityId=') + 7);
						Secretary.incoming[counter] = {
							"end"          : end,
							"action"       : action,
							"units"        : units,
							"attacker"     : attacker, 
							"attackerTown" : attackerTown,
							"defender"     : defender, 
							"defenderTown" : defenderTown,
						};
						counter++;
					}
				});
			}
		}
		catch(e) {
			Secretary.Console.writeLine("(ERROR)Secretary.readIncoming() Unknown exception thrown!\n" + e);
			Secretary.incoming = null;
		}
	},
	readIsland:function(root) {
		if (Secretary.Settings.get('player_id', '') == '') {
			Secretary.Icon.Error("Player not found!  Please visit the Options page.");
			return;
		}
		try { 
			if ($("#cities li[id^='cityLocation']", root).length > 0) {
				var count = 0; 
				Secretary.island = {};
				Secretary.island.island_id = $("#cities li.buildplace a", root)[0] != undefined 
					? $("#cities li.buildplace a", root)[0].href.match(/islandId=[0-9]*/).join('').replace('islandId=','') : null;
				if (Secretary.island.island_id == null) {
					Secretary.island.island_id = $("#cities li.espionage a", root)[0] != undefined
					? $("#cities li.espionage a", root)[0].href.match(/islandId=[0-9]*/).join('').replace('islandId=','') : null;
				}
				Secretary.island.llevel      = $('#tradegood', root).attr('class').match(/level[0-9]*/).join('').replace('level','');
				Secretary.island.blevel      = $('#islandfeatures .wood', root).attr('class').match(/level[0-9]*/).join('').replace('level','');
				if (Secretary.island.island_id != null) { 
					Secretary.island.colonies = {};
					$("#cities li[id^='cityLocation']", root).each(function() {
						if (Secretary.island != null) {
							Secretary.island.colonies[count] = {};
							if ($("a[id^='city_']", this)[0] != undefined) {
								player_id = $(".owner .icons a.sendMessage", this)[0] != null
									? $(".owner .icons a.sendMessage", this)[0].href.match(/receiverId=([0-9]*)/)[1]
									: Secretary.Settings.get('player_id', null);
								if (player_id != null)
								{
									var col   = trim($('.cityinfo .name td:eq(1)', this).text());
									colony    = col.match(/(.+)\s\(/)[1]; 
									colony_id = $("a[id^='city_']", this)[0].id.replace('city_','');
									player    = trim($('.cityinfo .owner td:eq(1)', this).text()); 
									pStatus   = $("a[id^='city_'] span.inactivity", this)[0] != undefined ? 'i' :
									            $("a[id^='city_'] span.vacation", this)[0] != undefined ? 'v' : 'a';
									pTotal    = '-1';
									ally      = trim($("a[href*='view=allyPage']", this).text()); if (ally == "") ally = "-";
									ally_id   = ally != '-' ? $("a[href*='view=allyPage']", this).attr('href').match(/allyId=(\d+)/)[1] : -1;
									level     = col.match(/\((\d+)\)/)[1]; 
									Secretary.island.colonies[count] = {
										"colony"    : colony,
										"colony_id" : colony_id,
										"player"    : player,
										"player_id" : player_id,
										"status"    : pStatus,
										"total"     : pTotal,
										"ally"      : ally,
										"ally_id"   : ally_id,
										"level"     : level
									};
								}
								else { 
									Secretary.Console.writeLine("(ERROR)Secretary.readIsland() player_id not found!");
									Secretary.island = null;
								}
							}
							count++;
						}
					});
				}
				else { 
					Secretary.Console.writeLine("(ERROR)Secretary.readIsland() island_id not found!");
					Secretary.island = null;
				}
			}
		}
		catch(e) {
			Secretary.Console.writeLine("(ERROR)Secretary.readIsland() Unknown exception thrown!\n" + e);
			Secretary.island = null;
		}
		Secretary.Icon.Idle();
		//Secretary.Console.writeLine(Secretary.island.toSource());
	},
	readAlliance:function(root) {
		var circularLink = $('#all li a', root)[0];
		if (circularLink != null && circularLink.href != null) {
			circularLink = circularLink.href; 
			if (circularLink.indexOf('allyId=') != -1 && circularLink.indexOf('&msgType=51') != -1)
			{
				ally = circularLink.substr(circularLink.indexOf('allyId=') + 7);
				ally = ally.substr(0, ally.indexOf('&msgType=51'));
				Secretary.Settings.set('SecretaryAlly', ally);
			}
		}
	},
	readCities:function(root) {
		try {
			if ($('#mainview #memberList tbody tr', root).length > 0) {
				counter = 0;
				Secretary.cities = { };
				$('#mainview #memberList tbody tr').each(function() {
					player = $('td', this)[1].innerHTML;
					$('td.cityInfo ul li a.city', this).each(function() {
						cityDetails = this.href.split('&');
						island = cityDetails[1].substr(3);
						id = cityDetails[2].substr(12);
						name = this.innerHTML.split(" [")[0];
						x = this.innerHTML.split(" [")[1].replace(']','').split(':')[0];
						y = this.innerHTML.split(" [")[1].replace(']','').split(':')[1];
						Secretary.cities[counter++] = {
							"id"     : id,
							"name"   : name,
							"x"      : x,
							"y"      : y,
							"island" : island,
							"player" : player
						};
					});
				}); 
			}
		}
		catch(e) {
			Secretary.Console.writeLine("(ERROR)Secretary.readCities() Unknown exception thrown!\n" + e);
			Secretary.cities = null;
		}
		Secretary.Icon.Idle();
	},
	readOutgoing:function(root) {
		try {
			if ($('#mainview table.table01 tr.rowRanks', root).length > 0) {
				counter = 0;
				Secretary.outgoing = { };
				$('#mainview table.table01 tr.rowRanks', root).each(function() {
					if ($('script', this)[0] != null) {
						countdown = $('script', this)[0].innerHTML;
						end = countdown.substr(countdown.indexOf('enddate: ') + 9);
						end = end.substr(0, end.indexOf(','));
						action = $('td', this)[1].innerHTML;
						units = $('td', this)[2].innerHTML;
						attacker = $('a', this)[0].innerHTML; 
						attackerTown = $('a', this)[0].href.substr($('a', this)[0].href.indexOf('cityId=') + 7);
						defender = $('a', this)[1].innerHTML; 
						defenderTown = $('a', this)[1].href.substr($('a', this)[1].href.indexOf('cityId=') + 7);
						try { recallId = $('a', this)[2].href.match(/eventId=(\d+)/)[1]; } catch(e) { recallId = false; }
						Secretary.outgoing[counter] = {
							"end"          : end,
							"action"       : action,
							"units"        : units,
							"attacker"     : attacker, 
							"attackerTown" : attackerTown,
							"defender"     : defender, 
							"defenderTown" : defenderTown,
							"recallId"     : recallId,
						};
						counter++;
					}
				});
			}
		}
		catch(e) {
			Secretary.Console.writeLine("(ERROR)Secretary.readOutgoing() Unknown exception thrown!\n" + e);
			Secretary.outgoing = null;
		}
		Secretary.Icon.Idle();
	},
	readReports:function(root) {
		var mission = $('.contentBox01h table tbody tr:first-child td:last-child', root).text();
		switch (mission) {
			case "Spy out messages":
				var message = 0;
				Secretary.spyReports = {};
				Secretary.spyReports['id'] = document.URL.match(/reportId=[0-9]*/).join('').replace('reportId=','');
				Secretary.spyReports['type'] = 'messages';
				Secretary.spyReports['time'] = $('.contentBox01h table tbody tr:eq(2) td:last-child', root).text().replace(/:/g,';');
				Secretary.spyReports['messages'] = {};
				$('.contentBox01h .reportTable tr:gt(0)', root).each(function() {
					var sender    = $("td:eq(0) a[href*='receiverId=']", this)[0].href.match(/receiverId=[0-9]*/).join('').replace

('receiverId=','');
					var timestamp = $("td:eq(2)", this).text();
					var receiver  = $("td:eq(3) a[href*='receiverId=']", this)[0] != null 
						? $("td:eq(3) a[href*='receiverId=']", this)[0].href.match(/receiverId=[0-9]*/).join('').replace

('receiverId=','') : -1;
					Secretary.spyReports['messages'][message++] = {
						"sender"   : sender,
						"ts"       : timestamp.replace(/:/g,';'),
						"receiver" : receiver
					};
				});
				if (Secretary.spyReports['messages'] == {}) {
					Secretary.spyReports = null;
				}
			break;
			default: 
			break;
		}
		Secretary.Icon.Idle();
	},
	readScores:function(root) {
		if (Secretary.Settings.get('player_id', '') == '') {
			Secretary.Icon.Error("Player not found!  Please visit the Options page.");
			return;
		}
		counter = 0;
		Secretary.scores = { }; 
		Secretary.scores['type'] = $("form select[name='highscoreType']", root)[0].value;
		Secretary.scores['offset'] = $("form select[name='offset']", root)[0].value; 
		if (Secretary.scores['type'] == 'score') {
			Config.set('maxScoreOffset', $("form select[name='offset'] option:last-child", root)[0].value);
		}
		if (Secretary.scores['offset'] == -1) {
			Secretary.scores = null;
		}
		else
		{
			Secretary.scores['searchUser'] = $("input[name='searchUser']", root).attr('value');
			$('#mainview table.table01:eq(1) tr', root).each(function() {
				if ($('td.place', this).size() > 0 && counter < 100) {
					action = $("a[title='Write message']", this)[0];
					if (action == null) {
						player = Secretary.Settings.get('player_id', '');
					} else {
						player = action.href.match(/receiverId=[0-9]*/)[0].replace('receiverId=','');
					}
					player_name  = $('td.name', this).text();
					position     = $('td.place', this).text();
					position     = position == '' ? Secretary.scores[counter - 1].position : position;
					ally         = $('a.allyLink', this)[0].href.match(/allyId=[0-9]*/)[0].replace('allyId=','');
					ally_name    = $('td.allytag', this).text();
					points       = $('td.score', this).text();
						Secretary.scores[counter] = {
						"position"     : position,
						"player"       : player,
						"player_name"  : player_name,
						"ally"         : ally,
						"ally_name"    : ally_name,
						"points"       : points
					};
					counter++;
				}
			});
		}
		Secretary.Icon.Idle(); 
	},
	readTroops:function(table, root) {
		try {
			if ($(table, root).length > 0) {
				$(table, root).each(function() {
					var playerName = '';
					var unitCount = 0;
					var unitNames = new Array();
					$('th', this).each(function() { 
						if ($(this).html() != '') {
							unitNames.push($(this).attr('title')); 
						}
					}); 
					$('td', this).each(function() {
						if (playerName == '') {
							playerName = $(this).text();
							if (Secretary.units[playerName] == null) { 
								Secretary.units[playerName] = {};
							}
						} else {
							var unitName = unitNames[unitCount++]; 
							if (unitName != undefined) {
								Secretary.units[playerName][unitName] = $(this).text();
							}
							if (unitCount == unitNames.length) {
								playerName = '';
								unitCount = 0;
							}
						}
					});
				});
			}
		}
		catch(e) {
			Secretary.Console.writeLine("(ERROR)Secretary.readTroops() Unknown exception thrown!\n" + e);
			Secretary.units = null;
		}
		Secretary.Icon.Idle();
	},
	offload:function(struct)  {

		//var endTime = new Date();
		//alert( (endTime.getTime() - startTime.getTime()) + 'ms');
		//return;

		if (Secretary.runTimeError) { return; }
		var ally = Secretary.Settings.get('SecretaryAlly', '');
		if (ally == '') {
			Secretary.Icon.Error("Alliance not found! Please visit your embassy.");
			return;
		} 
		if (Secretary.site == '') {
			Secretary.Icon.Error("Upload site not found!");
			return;
		}

		if (Secretary[struct] != null) {
			Secretary.Icon.Wait();

			postData = 'server=' + Secretary.server + '&alliance=' + ally;
			postData += '&type=' + struct + '&' + struct + '=' + Secretary[struct].toSource();

			var d = new Date();
			Secretary.Console.writeLine("\nStructure: " + struct + "\nDate: " + d, 1);
			Secretary.Console.writeLine("PostData: " + postData, 2);

			GM_xmlhttpRequest({
				method				: "POST",
				url					: Secretary.site,
				data				: postData,
				headers				: {
					"User-agent"	: navigator.userAgent, 
					"Accept"		: "application/atom+xml,application/xml,text/xml", 
					"Cookie"		: document.cookie,
					"Referer"		: "http://" + document.domain + "/index.php",
					"Content-type"	: "application/x-www-form-urlencoded",
				},
				onload				: function(data) { 
					// Update the image to show we have finished uploading 
					if (data.responseText.indexOf("(IK-UPLOAD-COMPLETE)") == -1 || data.responseText.indexOf("(ERROR)") != -1) {
						Secretary.Icon.Error("Upload failed!");
						Secretary.Settings.set('SecretaryError', data.responseText);
						Secretary.Console.writeLine(data.responseText);
						if (!Config.get('silentErrors')) {
							alert('Transfer error: ' + data.responseText);
						}
					} else {
						Secretary.Icon.Complete();
					}
				}
			});
		}
	},
	Console: {
		output:'',
		show:function()
		{
			ScriptDialog.init("Debug Console", "50%", null);
			ScriptDialog.show(Secretary.Console);
		},
		onshown:function()
		{
			var body = ScriptDialog.getBody(); if (body == null) return;
			var html = new Array();
			html.push('<textarea id="ikSecretaryConsoleOutput" readonly="readonly" ');
			html.push('style="width:95%; height:300px; background-color:black; color:white; font: 10px Arial; margin-left:10px;">');
			html.push(Secretary.Console.output);
			html.push('</textarea>');
			body.innerHTML = html.join('');
			Secretary.Console.scrollToBottom();
			$('#ScriptDialogFooter').append(
				'<input id="ikSecretaryConsoleOutputClear" style="background-image: url(http://tools.betawarriors.com/common/clear_16.png);" ' +
					'value="Clear" style="width:85px;" title="Clear Debug Console" type="submit">');
			$('#ScriptDialogFooter #ikSecretaryConsoleOutputClear').click(function() {
				Secretary.Console.output = '';
				$('#ikSecretaryConsoleOutput').text(Secretary.Console.output);
				this.blur();
			});
		},
		scrollToBottom:function()
		{
			$('#ikSecretaryConsoleOutput').each(function() {
				this.scrollTop = this.scrollHeight;
			});
		},
		writeLine:function(text, level)
		{
			if (level == null || level <= Secretary.debugLevel) {
				Secretary.Console.output += text + '\n';
				$('#ikSecretaryConsoleOutput').text(Secretary.Console.output);
				Secretary.Console.scrollToBottom();
			}
		}
	},
	Settings: {
		get:function(key, def) {
			return GM_getValue(Secretary.server + '.' + key, def);
		},
		set:function(key, value) {
			GM_setValue(Secretary.server + '.' + key, value);
		}
	},
	Icon:{
		Busy:function() { 
			$('#ikSecretaryStatusIcon').attr('src', 'http://tools.betawarriors.com/common/upload-busy.gif');
			$('#ikSecretaryStatusIcon').attr('title', 'Processing');
		},
		Complete:function() {
			$('#ikSecretaryStatusIcon').attr('src', 'http://tools.betawarriors.com/common/upload-complete.gif');
			$('#ikSecretaryStatusIcon').attr('title', 'Complete');
		},
		Error:function(error) { 
			Secretary.runTimeError = true; 
			$('#ikSecretaryStatusIcon').attr('src', 'http://tools.betawarriors.com/common/upload-error.gif');
			$('#ikSecretaryStatusIcon').attr('title', 'Error: ' + error);
		},
		Idle:function() { 
			$('#ikSecretaryStatusIcon').attr('src', 'http://tools.betawarriors.com/common/upload-idle.gif');
			$('#ikSecretaryStatusIcon').attr('title', 'Idle');
		},
		Wait:function() {
			$('#ikSecretaryStatusIcon').attr('src', 'http://tools.betawarriors.com/common/upload-waiting.gif');
			$('#ikSecretaryStatusIcon').attr('title', 'Uploading');
		}
	},
	views:{
		'embassy':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			Secretary.readAlliance(root);
			Secretary.readCities(root); 
			Secretary.offload('cities');
		},
		'embassyGeneralAttacksToAlly':function(root) { 
			root = typeof(root) == 'undefined' ? document : root; 
			Secretary.readAlliance(root);
			Secretary.readIncoming(root);
			Secretary.offload('incoming');
		},
		'embassyGeneralAttacksFromAlly':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			Secretary.readAlliance(root);
			Secretary.readOutgoing(root);
			Secretary.offload('outgoing');
		},
		'embassyGeneralTroops':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			Secretary.readAlliance(root);
			Secretary.readTroops('div#tab1 table', root); 
			Secretary.readTroops('div#tab2 table', root); 
			Secretary.offload('units');
		},
		'highscore':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			Secretary.readScores(root);
			Secretary.offload('scores');	
		},
		'island':function(root) {
			root = typeof(root) == 'undefined' ? document : root; 
			Secretary.readIsland(root); 
			Secretary.offload('island');
		},
		'options':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			Secretary.Settings.set('player_id', $('#options_debug td:first').text().replace(/^\s+|\s+$/g,""));
			Secretary.Icon.Complete();
		},
		'safehouseReports':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			Secretary.readReports(root);
			Secretary.offload('spyReports');
		}
	}
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

Secretary.init();