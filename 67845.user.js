// ==UserScript==
// @name           Ikariam Alliance Secretary (HCP Edition)
// @namespace      HardCorePawn
// @description    Some tools to assist your general.
// @include        http://s*.ikariam.org/*
// @exclude        http://s*.ikariam.org/*oldView=embassyGeneralTroops*
// @exclude        http://s*.ikariam.org/*oldView=embassyGeneralAttacksToAlly*
// @exclude        http://s*.ikariam.org/*oldView=embassyGeneralAttacksFromAlly*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/61914.user.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @version        0.17
//
// @history        0.17 updated island info to include co-ords
// @history        0.16 modded to work on all servers, but only on GeneralAttacksToAlly screen
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

try { ScriptUpdater.check(67845, "0.17"); } catch(e) {}

GeneralsSecretary = {
	server:getServerDomain() + '.' + getServerWorld(),
	parseError:false,
	debugLevel:1,
	cities:null,
	island:null,
	incoming:null,
	outgoing:null,
	spyReports:null,
	units:{},
	init:function(root) {
		if ($('ul.error')[0] == null)
		{
			// Add settings/debug interface for script
			GeneralsSecretary.customize();

			// parse current view (page)
			if(typeof(GeneralsSecretary.views[document.body.id]) == 'function')
				GeneralsSecretary.views[document.body.id]();
		}
	},
	customize:function() {
		try {
			GM_addStyle(
				'#ikSecretaryStatus { position:absolute; top:5px; right:5px; z-index:1000; background-color:#FFFFFF; padding:3px; border:1px solid; } ' +
				'#ikSecretaryStatus img { position:relative; } ' +
				'#ikSecretaryStatus #ikSecretarySettings, #ikSecretaryStatusIcon #ikSecretaryConsole { cursor:pointer } '
			);

			$('body').append(
				'<div id="ikSecretaryStatus">' +
					'<img id="ikSecretarySettings" src="http://tools.betawarriors.com/ikcrc/tool.ico" width="16" height="16" title="Settings"/>' +
					'<img id="ikSecretaryConsole" src="http://tools.betawarriors.com/common/console.png" width="16" height="16" title="Console"/>' +
					'<img id="ikSecretaryStatusIcon" src="http://tools.betawarriors.com/common/upload-idle.gif" width="16" height="16" title="Idle"/>' +
				'</div>'
			);
	
			$('#ikSecretaryStatus #ikSecretaryConsole').click(function() {
				GeneralsSecretary.Console.show();
			});
			$('#ikSecretaryStatus #ikSecretarySettings').click(function() {
				GeneralsSecretary.Settings.show();
			});
		} catch(e) { 
			/* do nothing */ 
		}
	},
	readIncoming:function(root)	{
		try {
			if ($('#mainview table.table01 tr.rowRanks', root).length > 0) {
				counter = 0;
				GeneralsSecretary.incoming = { };
				$('#mainview table.table01 tr.rowRanks', root).each(function() {
					if ($('td script', this)[0] != null) {
						countdown = $('td script', this)[0].innerHTML;
						end = countdown.substr(countdown.indexOf('enddate: ') + 9);
						end = end.substr(0, end.indexOf(','));
						action = $('td', this)[1].innerHTML;
						units = $('td', this)[2].innerHTML;
						attacker = $('td a', this)[0].innerHTML; 
						attackerTown = $('td a', this)[0].href.substr($('td a', this)[0].href.indexOf('cityId=') + 7);
						defender = $('td a', this)[1].innerHTML; 
						defenderTown = $('td a', this)[1].href.substr($('td a', this)[1].href.indexOf('cityId=') + 7);
						GeneralsSecretary.incoming[counter] = {
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
			GeneralsSecretary.Console.writeLine("(ERROR)GeneralsSecretary.readIncoming() Unknown exception thrown!\n" + e);
			GeneralsSecretary.incoming = null;
		}
	},
	readIsland:function(root) {
		if (GeneralsSecretary.Settings.get('player_id', '') == '') {
			GeneralsSecretary.Icon.Error("Player not found!  Please visit the Options page.");
			return;
		}
		GeneralsSecretary.Icon.Busy();
		try {
			if ($("#cities li[id^='cityLocation']", root).length > 0) {
				var count = 0;
				GeneralsSecretary.island = {};
				GeneralsSecretary.island.island_id = $("#cities li.buildplace a")[0] != undefined 
					? $("#cities li.buildplace a")[0].href.match(/islandId=[0-9]*/).join('').replace('islandId=','') : null;
				if (GeneralsSecretary.island.island_id == null) {
					GeneralsSecretary.island.island_id = $("#cities li.espionage a")[0] != undefined
					? $("#cities li.espionage a")[0].href.match(/islandId=[0-9]*/).join('').replace('islandId=','') : null;
				}
				GeneralsSecretary.island.x = $('span.island').text().match(/[0-9]*\:/).join('').replace(':','');
				GeneralsSecretary.island.y = $('span.island').text().match(/\:[0-9]*/).join('').replace(':','');
				GeneralsSecretary.island.llevel      = $('#tradegood').attr('class').match(/level[0-9]*/).join('').replace('level','');
				GeneralsSecretary.island.blevel      = $('#islandfeatures .wood').attr('class').match(/level[0-9]*/).join('').replace('level','');
				if (GeneralsSecretary.island.island_id != null) { 
					GeneralsSecretary.island.colonies = {};
					$("#cities li[id^='cityLocation']", root).each(function() {
						if (GeneralsSecretary.island != null) {
							GeneralsSecretary.island.colonies[count] = {};
							if ($("a[id^='city_']", this)[0] != undefined) {
								player_id = $('.cityinfo li.owner a.messageSend', this)[0] != undefined
									? $('.cityinfo li.owner a.messageSend', this)[0].href.match(/receiverId=[0-9]*/).join('').replace('receiverId=','')
									: GeneralsSecretary.Settings.get('player_id', null);
								if (player_id != null)
								{
									colony    = $('.cityinfo li.name span', this)[0].nextSibling.nodeValue;
									colony_id = $("a[id^='city_']", this)[0].id.replace('city_','');
									player  = $('.cityinfo li.owner span', this)[0].nextSibling.nodeValue.replace(/\s+$/,"");
									pStatus = $("a[id^='city_'] span.inactivity", this)[0] != undefined ? 'i' :
									          $("a[id^='city_'] span.vacation", this)[0] != undefined ? 'v' : 'a';
									pTotal  = '-1';
									ally    = $('.cityinfo li.ally a', this)[0] != null ? $('.cityinfo li.ally a', this).text() : '-';
									ally_id = ally!='-'?$('.cityinfo li.ally a', this)[0].href.match(/allyId=[0-9]*/).join('').replace('allyId=',''):-1;
									level     = $('.cityinfo li.citylevel span', this)[0].nextSibling.nodeValue;
									GeneralsSecretary.island.colonies[count] = {
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
									GeneralsSecretary.Console.writeLine("(ERROR)GeneralsSecretary.readIsland() player_id not found!");
									GeneralsSecretary.island = null;
								}
							}
							count++;
						}
					});
				}
				else { 
					GeneralsSecretary.Console.writeLine("(ERROR)GeneralsSecretary.readIsland() island_id not found!");
					GeneralsSecretary.island = null;
				}
			}
		}
		catch(e) {
			GeneralsSecretary.Console.writeLine("(ERROR)GeneralsSecretary.readIsland() Unknown exception thrown!\n" + e);
			GeneralsSecretary.island = null;
		}
		GeneralsSecretary.Icon.Idle();
		GeneralsSecretary.Console.writeLine(GeneralsSecretary.island.toSource(),2);
	},
	readAlliance:function(root) {
		var circularLink = $('#all li a', root)[0];
		if (circularLink != null && circularLink.href != null) {
			circularLink = circularLink.href; 
			if (circularLink.indexOf('allyId=') != -1 && circularLink.indexOf('&msgType=51') != -1)
			{
				ally = circularLink.substr(circularLink.indexOf('allyId=') + 7);
				ally = ally.substr(0, ally.indexOf('&msgType=51'));
				GeneralsSecretary.Settings.set('GeneralsSecretaryAlly', ally);
			}
		}
	},
	readCities:function(root) {
		GeneralsSecretary.Icon.Busy();
		try {
			if ($('#mainview #memberList tbody tr', root).length > 0) {
				counter = 0;
				GeneralsSecretary.cities = { };
				$('#mainview #memberList tbody tr').each(function() {
					player = $('td', this)[1].innerHTML;
					$('td.cityInfo ul li a.city', this).each(function() {
						cityDetails = this.href.split('&');
						island = cityDetails[1].substr(3);
						id = cityDetails[2].substr(12);
						name = this.innerHTML.split(" [")[0];
						x = this.innerHTML.split(" [")[1].replace(']','').split(':')[0];
						y = this.innerHTML.split(" [")[1].replace(']','').split(':')[1];
						GeneralsSecretary.cities[counter++] = {
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
			GeneralsSecretary.Console.writeLine("(ERROR)GeneralsSecretary.readCities() Unknown exception thrown!\n" + e);
			GeneralsSecretary.cities = null;
		}
		GeneralsSecretary.Icon.Idle();
	},
	readOutgoing:function(root) {
		GeneralsSecretary.Icon.Busy();
		try {
			if ($('#mainview table.table01 tr.rowRanks', root).length > 0) {
				counter = 0;
				GeneralsSecretary.outgoing = { };
				$('#mainview table.table01 tr.rowRanks', root).each(function() {
					if ($('td script', this)[0] != null) {
						countdown = $('td script', this)[0].innerHTML;
						end = countdown.substr(countdown.indexOf('enddate: ') + 9);
						end = end.substr(0, end.indexOf(','));
						action = $('td', this)[1].innerHTML;
						units = $('td', this)[2].innerHTML;
						attacker = $('td a', this)[0].innerHTML; 
						attackerTown = $('td a', this)[0].href.substr($('td a', this)[0].href.indexOf('cityId=') + 7);
						defender = $('td a', this)[1].innerHTML; 
						defenderTown = $('td a', this)[1].href.substr($('td a', this)[1].href.indexOf('cityId=') + 7);
						try { recallId = $('td a', this)[2].href.match(/eventId=(\d+)/)[1]; } catch(e) { recallId = false; }
						GeneralsSecretary.outgoing[counter] = {
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
			GeneralsSecretary.Console.writeLine("(ERROR)GeneralsSecretary.readOutgoing() Unknown exception thrown!\n" + e);
			GeneralsSecretary.outgoing = null;
		}
		GeneralsSecretary.Icon.Idle();
	},
	readReports:function(root) {
		GeneralsSecretary.Icon.Busy();
		var mission = $('.contentBox01h table tbody tr:first-child td:last-child', root).text();
		switch (mission) {
			case "Spy out messages":
				var message = 0;
				GeneralsSecretary.spyReports = {};
				GeneralsSecretary.spyReports['id'] = document.URL.match(/reportId=[0-9]*/).join('').replace('reportId=','');
				GeneralsSecretary.spyReports['type'] = 'messages';
				GeneralsSecretary.spyReports['time'] = $('.contentBox01h table tbody tr:eq(2) td:last-child', root).text().replace(/:/g,';');
				GeneralsSecretary.spyReports['messages'] = {};
				$('.contentBox01h .reportTable tr:gt(0)', root).each(function() {
					var sender    = $("td:eq(0) a[href*='receiverId=']", this)[0].href.match(/receiverId=[0-9]*/).join('').replace('receiverId=','');
					var timestamp = $("td:eq(2)", this).text();
					var receiver  = $("td:eq(3) a[href*='receiverId=']", this)[0] != null 
						? $("td:eq(3) a[href*='receiverId=']", this)[0].href.match(/receiverId=[0-9]*/).join('').replace('receiverId=','') : -1;
					GeneralsSecretary.spyReports['messages'][message++] = {
						"sender"   : sender,
						"ts"       : timestamp.replace(/:/g,';'),
						"receiver" : receiver
					};
				});
				if (GeneralsSecretary.spyReports['messages'] == {}) {
					GeneralsSecretary.spyReports = null;
				}
			break;
			default: 
			break;
		}
		GeneralsSecretary.Icon.Idle();
	},
	readTroops:function(table, root) {
		GeneralsSecretary.Icon.Busy();
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
							if (GeneralsSecretary.units[playerName] == null) { 
								GeneralsSecretary.units[playerName] = {};
							}
						} else {
							var unitName = unitNames[unitCount++]; 
							if (unitName != undefined) {
								GeneralsSecretary.units[playerName][unitName] = $(this).text();
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
			GeneralsSecretary.Console.writeLine("(ERROR)GeneralsSecretary.readTroops() Unknown exception thrown!\n" + e);
			GeneralsSecretary.units = null;
		}
		GeneralsSecretary.Icon.Idle();
	},
	offload:function(struct)  {
		if (GeneralsSecretary.parseError) { return; }

		var code = GeneralsSecretary.Settings.get('GeneralsSecretaryCode', '')
		var site = GeneralsSecretary.Settings.get('GeneralsSecretarySite', '');
		var ally = GeneralsSecretary.Settings.get('GeneralsSecretaryAlly', '');

		if (ally == '') {
			GeneralsSecretary.Icon.Error("Alliance not found!  Please visit your embassy.");
			return;
		}

		if (code != '' && site != '' && GeneralsSecretary[struct] != null) {
			GeneralsSecretary.Icon.Wait();

			postData = 'code=' + code;
			postData += '&server=' + GeneralsSecretary.server;
			postData += '&alliance=' + ally;
			postData += '&' + struct + '=' + GeneralsSecretary[struct].toSource();

			var d = new Date();
			GeneralsSecretary.Console.writeLine("\nStructure: " + struct + "\nDate: " + d, 1);
			GeneralsSecretary.Console.writeLine("PostData: " + postData, 2);

			/* Make the request */
			GM_xmlhttpRequest({
				method:				'POST',
				url:				site,
				data:				postData,
				headers: {
					'User-agent'	: 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type'	: 'application/x-www-form-urlencoded',
					'Accept'		: 'application/atom+xml,application/xml,text/xml' },
				onload:				function(data)  {
					/* Update the image to show we have finished uploading */
					if (data.responseText.indexOf("(IK-UPLOAD-COMPLETE)") == -1 || data.responseText.indexOf("(ERROR)") != -1) {
						GeneralsSecretary.Icon.Error("Upload failed!");
						GeneralsSecretary.Settings.set('GeneralsSecretaryError', data.responseText);
						alert('Transfer error: ' + data.responseText);
					} else {
						GeneralsSecretary.Icon.Complete();
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
			ScriptDialog.show(GeneralsSecretary.Console);
		},
		onshown:function()
		{
			var body = ScriptDialog.getBody(); if (body == null) return;
			var html = new Array();
			html.push('<textarea id="ikSecretaryConsoleOutput" readonly="readonly" ');
			html.push('style="width:95%; height:300px; background-color:black; color:white; font: 10px Arial; margin-left:10px;">');
			html.push(GeneralsSecretary.Console.output);
			html.push('</textarea>');
			body.innerHTML = html.join('');
			GeneralsSecretary.Console.scrollToBottom();
			$('#ScriptDialogFooter').append(
				'<input id="ikSecretaryConsoleOutputClear" style="background-image: url(http://tools.betawarriors.com/common/clear_16.png);" ' +
					'value="Clear" style="width:85px;" title="Clear Debug Console" type="submit">');
			$('#ScriptDialogFooter #ikSecretaryConsoleOutputClear').click(function() {
				GeneralsSecretary.Console.output = '';
				$('#ikSecretaryConsoleOutput').text(GeneralsSecretary.Console.output);
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
			if (level == null || level <= GeneralsSecretary.debugLevel) {
				GeneralsSecretary.Console.output += text + '\n';
				$('#ikSecretaryConsoleOutput').text(GeneralsSecretary.Console.output);
				GeneralsSecretary.Console.scrollToBottom();
			}
		}
	},
	Settings: {
		get:function(key, def) {
			return GM_getValue(GeneralsSecretary.server + '.' + key, def);
		},
		set:function(key, value) {
			GM_setValue(GeneralsSecretary.server + '.' + key, value);
		},
		show:function()
		{
			ScriptDialog.init("Secretary Settings", "250px", null);
			ScriptDialog.show(GeneralsSecretary.Settings);
		},
		onshown:function() {
			var body = ScriptDialog.getBody(); if (body == null) return;
			var html = new Array();
			html.push('<table style="margin-left: 25px; margin-right: 50px;" border="0" cellspacing="10px">');
			html.push('<tr height="25px">');
				html.push('<td width="50">Site:</td>');
				html.push('<td width="150"><input type="text" id="GeneralsSecretarySite" style="width:100%;" value="');
				html.push(GeneralsSecretary.Settings.get('GeneralsSecretarySite', ''));
				html.push('"/></td>');
			html.push('</tr>');
			html.push('<tr height="25px">');
				html.push('<td width="50">Code:</td>');
				html.push('<td width="150"><input type="text" id="GeneralsSecretaryCode" style="width:60%;" value="');
				html.push(GeneralsSecretary.Settings.get('GeneralsSecretaryCode', ''));
				html.push('"/></td>');
			html.push('</tr>');
			html.push('</table>'); 
			body.innerHTML = html.join('');

			$("input[type='checkbox']", body).click(function() { 
				GeneralsSecretary.Settings.set(this.id, this.checked);
			});
			$("input[type='text']", body).blur(function() {
				GeneralsSecretary.Settings.set(this.id, this.value);
			});
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
			GeneralsSecretary.parseError = true; 
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
			GeneralsSecretary.readAlliance(root);
			GeneralsSecretary.readCities(root); 
			GeneralsSecretary.offload('cities');
		},
		
		'embassyGeneralAttacksToAlly':function(root) { 
			root = typeof(root) == 'undefined' ? document : root; 
			GeneralsSecretary.readAlliance(root);
			GeneralsSecretary.readIncoming(root);
			GeneralsSecretary.offload('incoming');
		},
		/*
		'embassyGeneralAttacksFromAlly':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			GeneralsSecretary.readAlliance(root);
			GeneralsSecretary.readOutgoing(root);
			GeneralsSecretary.offload('outgoing');
		},
		*/
		/*
		'embassyGeneralTroops':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			GeneralsSecretary.readAlliance(root);
			GeneralsSecretary.readTroops('div#tab1 table', root); 
			GeneralsSecretary.readTroops('div#tab2 table', root); 
			GeneralsSecretary.offload('units');
		},
		*/
		
		'island':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			GeneralsSecretary.readIsland(root); 
			GeneralsSecretary.offload('island');
		},
		
		'options':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			GeneralsSecretary.Settings.set('player_id', $('#options_debug td:first').text().replace(/^\s+|\s+$/g,""));
		}
		/*
		'safehouseReports':function(root) {
			root = typeof(root) == 'undefined' ? document : root;
			GeneralsSecretary.readReports(root);
			GeneralsSecretary.offload('spyReports');
		}
		*/
	}
}

GeneralsSecretary.init();
