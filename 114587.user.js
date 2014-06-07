// ==UserScript==
// @name		IGA
// @description	Script to assist general with attack notifications
// @namespace	general.ikariam
// @icon		http://img710.imageshack.us/img710/6600/ikariamgeneralicon.png
// @version 	1.4
// @author		bluesman ( http://userscripts.org/users/165018 )
// @include		http://s*.*.ikariam.*
// @include		http://s*.*.ikariam.*/*view=embassyGeneralAttacksToAlly*
// @include		http://s*.*.ikariam.*/*view=embassyGeneralAttacksFromAlly*
// @exclude		http://support.ikariam.*/*
// @exclude		http://board.*.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license		GNU GPL v3 http://www.gnu.org/copyleft/gpl.html
//
// @history		1.4 	small fixes and optimization
// @history		1.3 	caching island coordinates
// @history		1.2 	caching ajax requests
// @history		1.0.1 	few fixes, showCityURL default to "no"
// @history		1.0 	initial version
// ==/UserScript==

var languages =
{
	rs:
	{
		'send' 					: 'Пошаљи кружну поруку',
		'circular' 				: 'Кружна порука - Савез',
		'circular_sent'			: 'Кружна порука је послата',
		'total' 				: 'укупно',
		'remaining' 			: 'преостало',
		'no_attacks' 			: 'Тренутно нема напада на чланове савеза',
		'reload' 				: 'Освежи страну',
		'settings' 				: 'Подешавање',

		'label_video_id'		: 'ID видеа са YouTube',
		'label_youtube_url'		: 'Ископирајте са YouTube URL-a само део који се односи на ID видеа',
		'label_refesh_normal'	: 'Интервал освежавања (<b>када нема напада</b>)',
		'label_refresh_attack'	: 'Интервал освежавања (<b>у току напада</b>)',
		'label_save_settings'	: 'Сачувај подешаваља',
		'label_cancel'			: 'Откажи',
		'label_show_full'		: 'Пун приказ',
		'label_show_compact'	: 'Компактан приказ',
		'label_show_url'		: 'Покажи URL',
		'label_hide_url'		: 'Склони URL',

		'seconds'				: 'секунди',
		'new_attacks' 			: 'Нови напади: ',
		'stopped_attacks' 		: 'Прекинути напади: ',
		'no_new_attacks' 		: 'Стање непромењено',
		'changed_attacks' 		: 'Промена напада. ',
		'changed_attacks_title' : 'ИЗМЕНА НАПАДА',
		'units' 				: 'јединица',
		'troops' 				: 'јединица',
		'ships' 				: 'бродова',
		'title_underway'		: 'На путу',
		'title_battle'			: 'У борби',
		'title_deployed'		: 'Прелокација трупа / бродова',

		'capture_port' 			: 'Окупирај луку (на путу)',
		'capture_port_attack' 	: 'Окупирај луку (отвори борбу)',
		'fleet_station' 		: 'Одредиште флота',
		'fleet_station_attack' 	: 'Одредиште флота (на путу)',
		'fleet_station_fight' 	: 'Одредиште флота (Отвори Борбу)',
		'defend_port' 			: 'Одбрани луку! (на путу)',
		'defend_port_battle'	: 'Одбрани луку! (Отвори Борбу)',
		'pillage' 				: 'Пљачка (на путу)',
		'pillage_fight'			: 'Пљачка (Отвори Борбу)',
		'pillage_return'		: 'Пљачка (Повратак)',
		'pillage_cancel'		: 'Пљачка (отказано)',
		'deploy_troops' 		: 'Прелокација трупа',
		'deploy_troops_underway': 'Прелокација трупа (на путу)',
		'deploy_troops_fight'	: 'Прелокација трупа (Отвори Борбу)',
		'deploy_troops_cancel'	: 'Прелокација трупа (отказано)',
		'occupy_town' 			: 'Окупирај град! (на путу)',
		'occupy_town_fight' 	: 'Окупирај град! (Отвори Борбу)',
		'reorganize' 			: 'Реорганизуј',
	},
	en:
	{
		'send' 					: 'Submit Circular Message',
		'circular' 				: 'Circular Message - Alliance',
		'circular_sent'			: 'Circular Message Sent',
		'total' 				: 'total',
		'remaining' 			: 'remaining',
		'no_attacks' 			: 'There are no attacks',
		'reload' 				: 'Reload Page',
		'settings' 				: 'Settings',

		'label_video_id'		: 'YouTube Video ID',
		'label_youtube_url'		: 'Copy and past only video id from the url',
		'label_refesh_normal'	: 'Refresh interval (<b>no new attacks</b>)',
		'label_refresh_attack'	: 'Refresh interval (<b>during attacks</b>)',
		'label_save_settings'	: 'Save Settings',
		'label_cancel'			: 'Cancel',
		'label_show_full'		: 'Show full',
		'label_show_compact'	: 'Show compact',
		'label_show_url'		: 'Show URL',
		'label_hide_url'		: 'Hide URL',

		'seconds'				: 'seconds',
		'new_attacks' 			: 'New attacks: ',
		'stopped_attacks' 		: 'Terminated attacks: ',
		'no_new_attacks' 		: 'Situation unchanged',
		'changed_attacks' 		: 'Changed attacks. ',
		'changed_attacks_title'	: 'ATTACK CHANGE',
		'units' 				: 'units',
		'troops' 				: 'troops',
		'ships' 				: 'ships',
		'title_underway'		: 'Underway',
		'title_battle'			: 'Open Battle',
		'title_deployed'		: 'Deploy troops / ships',

		'capture_port' 			: 'Occupy port (underway)',
		'capture_port_attack'	: 'Occupy port (Open Battle)',
		'fleet_station' 		: 'Fleets station',
		'fleet_station_attack'	: 'Fleets station (underway)',
		'fleet_station_fight'	: 'Fleets station (Open Battle)',
		'defend_port' 			: 'Defend port! (underway)',
		'defend_port_battle'	: 'Defend port! (Open Battle)',
		'pillage' 				: 'Pillage (underway)',
		'pillage_fight'			: 'Pillage (Open Battle)',
		'pillage_return'		: 'Pillage (Return)',
		'pillage_cancel'		: 'Pillage (Canceled)',
		'deploy_troops' 		: 'Deploy troops',
		'deploy_troops_underway': 'Deploy troops (underway)',
		'deploy_troops_fight'	: 'Deploy troops (Open Battle)',
		'deploy_troops_cancel'	: 'Deploy troops (Canceled)',
		'occupy_town' 			: 'Occupy town! (underway)',
		'occupy_town_fight' 	: 'Occupy town! (Open Battle)',
		'reorganize' 			: 'Reorganize',
	}
};

Ika = {
	server			: '',		// current server
	view 			: '',		// current view
	position 		: '',		// current building position
	cityLevel 		: 0,		// currentu city level
	language 		: 'en',		// selected language
	lang			: '',		// language strings
	script_name		: 'Ikariam General Assistant',
	script_version	: '1.4',
	script_url		: 'http://userscripts.org/scripts/show/114587',

	// parent container
	parentElement	: '#city #container #mainview #locations ',
	allyId 			: 0,
	playerId		: 0,
	receiverId		: 0,

	statusAttack	: '►',
	statusBattle	: '§',
	statusDeployed	: '☼',
	statusReturn	: '◄',

	showCityURL		: 'no',
	showInnerCoordinates : false,

	getServer : function ()
	{
		this.server = window.location.host;
		var temp = this.server.split('.');
		temp = temp[1];

		this.language = temp in languages ? temp : 'en';
		this.lang = languages[this.language];
	},

	// Find current city level
	getCityLevel : function ()
	{
		if (document.getElementById('position0'))
		{
			this.cityLevel = document.getElementById('position0').getElementsByTagName('a')[0].title;
			this.cityLevel = parseInt (this.cityLevel.substr(this.cityLevel.length - 2));

			if ( this.cityLevel > 26 )
			{
				this.cityLevel = 26;
			}
		}
	},

	getView : function ()
	{
		this.view = $('BODY').attr('id');

		if (this.view == 'buildingGround')
		{
			var regExp = new RegExp("position\=([a-zA-Z0-9]+)", "ig");
			var RegExpRes = regExp.exec(document.location.href);
			this.position = (RegExpRes == null) ? '' : RegExpRes[1];
		}
	},

	getInt : function (str)
	{
		return parseInt (str.replace(/,/g, ''));
	},

	cfgRead : function (key, default_value)
	{
		return GM_getValue (this.server + key, default_value);
	},

	cfgWrite : function (key, value)
	{
		GM_setValue (this.server + key, value);
	},

	getAllyId : function ()
	{
		this.allyId = this.cfgRead ('allyId', 0);

		if (Ika.view == 'diplomacyAdvisorAlly')
		{
			// ?view=sendIKMessage&msgType=51&allyId=340
			var allyId = $("#allyinfo tbody TR:eq(0) TD:eq(1) A").attr('href');
			var regExp = new RegExp("allyId\=([0-9]+)", "ig");
			var RegExpRes = regExp.exec(allyId);
			this.allyId = (RegExpRes == null) ? '' : RegExpRes[1];
			this.cfgWrite ('allyId', this.allyId);
		}

		this.playerId = $('SELECT#citySelect OPTION[selected]').val();
		this.cfgWrite ('playerId', this.playerId);
	},

	toggleSettings : function ()
	{
		if ($('#iga_settings_content').is(':visible'))
		{
			$('#iga_settings_content').hide();
			$('#iga_settings_test').html('');
		}
		else
		{
			$("#iga_video_id_attack").val(this.cfgRead('video_id_attack', 'IvNBdSerHVU'));
			$("#iga_refresh_normal").val(this.cfgRead('refresh_normal', 240));
			$("#iga_refresh_attack").val(this.cfgRead('refresh_attack', 120));
			$('#iga_settings_content').show();
		}
	},

	saveSettings : function ()
	{
		this.cfgWrite ('video_id_attack', $("#iga_video_id_attack").val());
		this.cfgWrite ('refresh_normal', parseInt($("#iga_refresh_normal").val()));
		this.cfgWrite ('refresh_attack', parseInt($("#iga_refresh_attack").val()));

		$('#iga_settings_content').hide();
	},

	testSettings : function ()
	{
		$('#iga_settings_test').html('<iframe width="480" height="390" src="http://www.youtube.com/embed/' + $("#iga_video_id_attack").val() + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
	},

	createTextReport : function ()
	{
		var s = $('#reportArea');
		var temp = $(s).html();
		$('.unitsCountLarge', s).remove();

		var txt = $('#AttackInfoArea .reportAreaTitle').text() + '\n\n';
		txt += $(s).text();
		txt = txt.replace(/:\n\n/ig, ':\n========================================================\n\n');
		$(s).html (temp);
		return txt;
	},

	copyAttacks : function ()
	{
		$('#notice #text').text(this.createTextReport());
	},

	showCityURLs : function ()
	{
		var showCityURL = Ika.cfgRead('showCityURL', 'no');

		if (showCityURL == 'yes')
		{
			Ika.cfgWrite ('showCityURL', 'no');
			$(".attackerCityName").remove();
			$(".defenderCityName").remove();
			Ika.copyAttacks();
			$("#showCityURL").text (Ika.lang.label_show_url);
		}
		else
		{
			Ika.cfgWrite ('showCityURL', 'yes');
			self.location.reload();
//			$("#showCityURL").text(Ika.lang.label_hide_url);
		}

		this.copyAttacks ();
	},

	toggleDisplay : function()
	{
		$("#reportArea").toggleClass('full');

		if($("#reportArea").hasClass('full'))
		{
			Ika.cfgWrite('display', 'full');
			$('#attacksToggle').text (Ika.lang.label_show_compact);
		}
		else
		{
			Ika.cfgWrite('display', '');
			$('#attacksToggle').text (Ika.lang.label_show_full);
		}
	},

	// initialize
	init : function(name)
	{
		this.script_name = name;
		this.getServer();
		this.getView();
		this.getAllyId();
	}

};

// execute
Ika.init('General Assistant');

var refresh_interval = Ika.cfgRead('refresh_normal', 240);
const flashurl  = "http://img534.imageshack.us/img534/6408/alarm.swf";

$(document).ready ( function()
{
	if (Ika.view == 'sendIKMessage')
	{
/*		var regExp = new RegExp("allyId\=([0-9]+)", "ig");
		var RegExpRes = regExp.exec(document.location);
		var allyId = (RegExpRes == null) ? '' : RegExpRes[1];

//		this.allyId = (RegExpRes == null) ? '' : RegExpRes[1];
//		this.cfgWrite ('allyId', this.allyId);

		var receiverId = $('#mainview #notice FORM INPUT[name=receiverId]').val();
		var mailRecipient = $('#mainview #notice FORM #mailRecipient SPAN').eq(1).text();
		var allyId = $('#mainview #notice FORM INPUT[name=allyId]').val();
		alert(allyId);
*/
	}

	if (Ika.view == 'embassyGeneralTroops')
	{
		var old_units = [];
		var keys = ['Army1', 'Army2', 'Navy']

		for (n in keys)
		{
			var k = keys[n];
			old_units[k] = Ika.cfgRead ('units' + k, '');
			old_units[k] = old_units[k].split('\n');

			for (var i = 0; i < old_units[k].length; i++)
			{
				old_units[k][i] = old_units[k][i].split(';');
			}
		}

		var units = [];
		units['Army1'] = [], units['Army2'] = [], units['Navy'] = [];

		var members_changed = false;

		var t = $("#mainview #tab1 TABLE").eq(0);
		$('tr', t).each ( function(k, v)
		{
			units['Army1'][k] = [];

			$("td", this).each (function (k1, v1)
			{
				units['Army1'][k][k1] = i = $(this).text().trim();

				// check if there are changes in number of members
				if (!members_changed)
				{
					var old_name = old_units['Army1'][k-1][0];
					var new_name = units['Army1'][k][0];
					if (old_name != new_name)
					{
						members_changed = true;
						$("#mainview #tab1 TABLE").prepend ('<tr><td colspan="20"><b style="display: block; padding:10px; color:red; background:#ffff00;">' + Ika.script_name + ': New members detected, please refresh.</b></td></tr>');
					}
				}

				if (!members_changed && k1 > 0 && typeof old_units['Army1'][k-1] != 'undefined')
				{
					i = parseInt (i);
					var old = parseInt (old_units['Army1'][k-1][k1]);
					var diff = i - old;

					if (diff < 0)		{ $(this).html(i + ' <span class="unitsLost">' + diff + '</span>') ; }
					else if (diff > 0)	{ $(this).html(i + ' <span class="unitsNew"> +' + diff + '</span>'); }
				}
			});
		});


		var t = $("#mainview #tab1 TABLE").eq(1);
		$('tr', t).each ( function(k, v)
		{
			units['Army2'][k] = [];

			$("td", this).each (function (k1, v1)
			{
				units['Army2'][k][k1] = i = $(this).text().trim();

				if (!members_changed && k1 > 0 && typeof old_units['Army2'][k-1] != 'undefined')
				{
					i = parseInt (i);
					var old = parseInt (old_units['Army2'][k-1][k1]);
					var diff = i - old;

					if (diff < 0)		{ $(this).html(i + ' <span class="unitsLost">' + diff + '</span>') ; }
					else if (diff > 0)	{ $(this).html(i + ' <span class="unitsNew"> +' + diff + '</span>'); }
				}
			});
		});

		var t = $("#mainview #tab2 TABLE").eq(0);
		$('tr', t).each ( function(k, v)
		{
			units['Navy'][k] = [];

			$("td", this).each (function (k1, v1)
			{
				units['Navy'][k][k1] = i = $(this).text().trim();

				if (!members_changed && k1 > 0 && typeof old_units['Navy'][k-1] != 'undefined')
				{
					i = parseInt (i);
					var old = parseInt (old_units['Navy'][k-1][k1]);
					var diff = i - old;

					if (diff < 0)		{ $(this).html(i + ' <span class="unitsLost">' + diff + '</span>') ; }
					else if (diff > 0)	{ $(this).html(i + ' <span class="unitsNew"> +' + diff + '</span>'); }
				}
			});
		});

		for (n in keys)
		{
			var k = keys[n];
			var s = '';
			for (var i = 1; i < units[k].length; i++)
			{
				var temp = units[k][i][0];
				for (var j = 1; j < units[k][i].length; j++)
				{
					temp += ';' + units[k][i][j];
				}
				s += temp + '\n';
			}

			Ika.cfgWrite ('units' + k, s);
		}

	}

	if (Ika.view == 'embassyGeneralAttacksToAlly')
	{
		var c = '';
		var newAttacks = '';
		var cnt = 0;
		var attacks = [];
		var attackedCities = [];
		var attacks_cool =
			{
				'battle' : '',
				'underway' : '',
				'deployed' : ''
			};

		var currentAttackedId = 0;

		$("#mainview .table01 .rowRanks").each( function (key, v)
		{
			var t = $('TD:eq(0) DIV .time', this).text().trim();
			var unitsText = Ika.lang.troops;
			var unitsIcon = '/skin/characters/military/x60_y60/y60_swordsman_faceright.gif';
			var attackClass = 'army';

			if (t != '')
			{
				var attackedTime 		= t;
				var attackedType 		= $('TD', this).eq(1).html();
				var attackedUnits 		= $('TD', this).eq(2).html();
				var attackedAttacker 	= $('TD', this).eq(3).text();
				var attackedDefender 	= $('TD', this).eq(4).text();
				var attackedFromUrl 	= 'http://' + window.location.hostname + $('TD:eq(3) A', this).attr('href');
				var attackedUrl 		= 'http://' + window.location.hostname + $('TD:eq(4) A', this).attr('href');
				var attackedFromId 		= attackedFromUrl.replace(/(.+)cityId=([0-9]+)/, '$2');
				var attackedId			= attackedUrl.replace(/(.+)cityId=([0-9]+)/, '$2');

				cnt++;

				if (attackedType == Ika.lang.capture_port || attackedType == Ika.lang.capture_port_attack || attackedType == Ika.lang.fleet_station || attackedType == Ika.lang.fleet_station_attack || attackedType == Ika.lang.fleet_station_fight )
				{
					unitsText 	= Ika.lang.ships;
//					unitsIcon 	= '/skin/characters/fleet/60x60/ship_mortar_faceright.gif';
//					unitsIcon 	= '/skin/characters/fleet/60x60/ship_ballista_faceright.gif';
					unitsIcon 	= '/skin/img/island/hafenblockade_rot.gif';
					attackClass = 'navy';
				}
				else if (attackedType == Ika.lang.pillage || attackedType == Ika.lang.pillage_fight || attackedType == Ika.lang.pillage_return || attackedType == Ika.lang.pillage_cancel)
				{
//					unitsIcon 	= '/skin/characters/fleet/40x40/ship_transport_r_40x40.gif';
					unitsIcon 	= '/skin/actions/plunder.gif';
				}

				attacks[cnt] = [attackedTime, attackedType, attackedUnits, attackedAttacker, attackedFromId, attackedId, attackedUrl, ''];
				attackedCities[attackedId] = attackedDefender;

				var attackStatus =  Ika.statusAttack;

				if (attackedTime == '-')
				{
					if (attackedType == Ika.lang.fleet_station_fight || attackedType == Ika.lang.pillage_fight || attackedType == Ika.lang.deploy_troops_fight || attackedType == Ika.lang.occupy_town_fight)
					{
						attackedTime = '#';
						attackStatus = Ika.statusBattle;
						attackClass += ' battle';
					}
					else
					{
						attackStatus = Ika.statusDeployed;
						attackClass += ' deployed';
					}
				}
				else
				{
					if (attackedType == Ika.lang.fleet_station_fight || attackedType == Ika.lang.pillage_fight || attackedType == Ika.lang.deploy_troops_fight || attackedType == Ika.lang.occupy_town_fight)
					{
						attackStatus = Ika.statusBattle;
						attackClass += ' battle';
					}
					else
					{
						attackClass += ' underway';
					}
				}

				var d = '';

				if (attackedId != currentAttackedId && attackedTime != '-')
				{
					currentAttackedId = attackedId;
					d += '\n<div class="attackItemTitle defender"><span class="attackedCoordinates" id="attackedCoordinatesA' + attackedId + '"></span> <a target="attackWindow" href="' + attackedUrl + '">' + attackedDefender + '</a></div>\n\n';
				}

				d += '<div class="attackItem ' + attackClass + '" id="attack' + cnt + '">';
				d += '<span class="unitsIcon"><img src="' + unitsIcon + '" /></span>';
				d += '<span class="unitsCountLarge">' + attackedUnits + '</span>';
				if (attackedTime != '-')
				{
					d += '<span class="attackTime">' + attackedTime + ' ' + attackStatus + '</span> ';
				}
				if (Ika.showInnerCoordinates)
				{
					d += '[<span class="attackedCoordinates" id="attackedCoordinates' + cnt + '"></span>] ';
				}
				if (attackedTime != '-')
				{
					d += '<span class="attackType">' + attackedType + '<br />\n</span>';
				}
				d += '<span class="source">'
					+ '<a id="attackerCityURL' + cnt + '" target="attackWindow" href="' + attackedFromUrl + '">' + attackedAttacker + '</a></span> '
					+ '(<span class="unitsCount">' + attackedUnits + ' ' + unitsText + '</span>) '
					+ '<span class="attackStatus">' + attackStatus + '</span>'
					+ ' <span class="destination"><a  id="defenderCityURL' + cnt + '" target="attackWindow" href="' + attackedUrl + '">' + attackedDefender + '</a></span>'
					+ '<span class="attackerCityName" id="attackerCityName' + cnt + '">\n' + attackedFromUrl + ' ' + attackStatus + '</span>'
					+ '<span class="defenderCityName" id="defenderCityName' + cnt + '">\n' + attackedUrl + '</span> '
					;
				d += '<br />\n<br />\n</div>';

				if (attackStatus == Ika.statusBattle)		{ attacks_cool['battle'] 	+= d; }
				else if (attackedTime != '-')				{ attacks_cool['underway'] 	+= d; }
				else if (attackStatus == Ika.statusAttack)	{ attacks_cool['battle'] 	+= d; }
				else 										{ attacks_cool['deployed'] 	+= d; }

				newAttacks += attacks[cnt][1] + '||' + attacks[cnt][2] + '||' + attacks[cnt][3] + '||' + attacks[cnt][4] + '||' + attacks[cnt][5] + '\n';
			}
		});

		var oldAttacks 		= Ika.cfgRead ('general', '');
		var oldAttacksCnt 	= Ika.cfgRead ('generalCnt', 0);

		var oldAttacksPart = oldAttacks.split ('\n---\n');

		oldAttacks 				= oldAttacksPart[0];
		oldAttacksPart 			= (oldAttacksPart[1] == undefined) ? '' : oldAttacksPart[1];

		if (attacks_cool['underway'] != '')	{ c += '<div class="attackItemTitle underway">' + Ika.lang.title_underway + ':</div>\n'  + attacks_cool['underway']; }
		if (attacks_cool['battle'] 	 != '')	{ c += '<div class="attackItemTitle battle">' 	+ Ika.lang.title_battle   + ':</div>\n'  + attacks_cool['battle'];   }
		if (attacks_cool['deployed'] != '')	{ c += '<div class="attackItemTitle deployed">' + Ika.lang.title_deployed + ':</div>\n'  + attacks_cool['deployed']; }

		if (c == '')
		{
			c = '<p align="center" style="font-size:large;">' + Ika.lang.no_attacks + '</p>';
		}
		else
		{
			refresh_interval = Ika.cfgRead('refresh_attack', 120);; // reduce refresh interval to 1 minute
		}

		var reportAreaClass = Ika.cfgRead ('display', '');
		if (reportAreaClass != '')
		{
			reportAreaClass = ' class="' + reportAreaClass + '"';
		}

		var html_content = ''
			+ '<div id="general_assistant">'
			+ '	<div id="AttackInfoArea" align="center"></div>'
			+ '	<div id="reportArea"' + reportAreaClass + '>' + c + '<div style="clear:left;"></div></div>'
			+ '	<div style="margin-top:1em; padding:1em; text-align:center; background:#FBE2B5; border-top:1px solid #AB8659;">'
			+ '		<p><a class="button" id="reloadButton" onclick="self.location.reload()">' + Ika.lang.reload + ' ( ' + refresh_interval + ' s )</a></p>'
			+ '		<div id="iga_settings_content">'
			+ '			<h1 class="reportAreaTitle">' + Ika.script_name + ' v' + Ika.script_version + ' ' + Ika.lang.settings + '</h1>'
			+ '			<p>' + Ika.lang.label_video_id + ': <input type="text" id="iga_video_id_attack" value="nK5fKFFqJe4" size="50" /> &nbsp; '
			+ '			<a id="iga_video_id_attack_test" href="javascript:;" >test</a></p>'
			+ '			<p>' + Ika.lang.label_youtube_url + ': <br /><img src="http://i.imm.io/9Dhl.png" alt="video id" /></p>'
			+ '			<p>' + Ika.lang.label_refesh_normal + ': <input type="text" id="iga_refresh_normal" value="240" size="5" /> ' + Ika.lang.seconds + '</p> '
			+ '			<p>' + Ika.lang.label_refresh_attack + ': <input type="text" id="iga_refresh_attack" value="120" size="5" /> ' + Ika.lang.seconds + '</p> '
			+ '			<p><a class="button" id="iga_settings_save">' + Ika.lang.label_save_settings + '</a> &nbsp; <a id="iga_settings_cancel">' + Ika.lang.label_cancel + '</a></p>'
			+ '			<p id="iga_settings_test"></p>'
			+ '		</div>'
			+ '		<p style="padding-top:10px;">'
			+ '		<a href="javascript:;" id="iga_settings_toggler">' + Ika.lang.settings + '</a>';

			if (reportAreaClass == '')		{ html_content += ' | <a href="javascript:;" id="attacksToggle">' + Ika.lang.label_show_full + '</a>'; }
			else							{ html_content += ' | <a href="javascript:;" id="attacksToggle">' + Ika.lang.label_show_compact + '</a>'; }

			var showCityURL = Ika.cfgRead('showCityURL', 'no');

			if (showCityURL == 'yes')		{ html_content += ' | <a href="javascript:;" id="showCityURL">' + Ika.lang.label_hide_url + '</a>'; }
			else							{ html_content += ' | <a href="javascript:;" id="showCityURL">' + Ika.lang.label_show_url + '</a>'; }

			html_content +=  '</p>'
			+ '		</div>'
			+ '	</div>'
			+ '	<p align="center">' + Ika.script_name + ' v ' + Ika.script_version + '<br /><a target="_blank" href="' + Ika.script_url + '">' + Ika.script_url + '</a></p>'
			+ '</div>';

		// add to view 
		$('#mainview .content').prepend (html_content);

		// if we don't show city urls then remove those elements
		if (showCityURL != 'yes')
		{
			$(".attackerCityName").remove();
			$(".defenderCityName").remove();
		}

		var coordinates = '';
		// changes in total number of attacks
		var attackDiff = parseInt(cnt - oldAttacksCnt);

		if (oldAttacks != newAttacks)
		{
			var s = '';
			if (attackDiff > 0)
			{
				s = Ika.lang.new_attacks + attackDiff + ' / ' + cnt;
				$('#mainview .content').append('<div align="center"><iframe width="480" height="390" src="http://www.youtube.com/embed/' + Ika.cfgRead('video_id_attack', 'IvNBdSerHVU') + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>');
			}
			else if (attackDiff < 0)	{ s = Ika.lang.stopped_attacks + Math.abs(attackDiff) + ' (' + Ika.lang.remaining + ': ' + cnt + ')'; }
			else
			{
				s = Ika.lang.no_new_attacks;
				if (parseInt(cnt) > 0)
				{
					s += ' (' + Ika.lang.total + ': ' + cnt + ')';
				}
			}

			$("#AttackInfoArea").prepend ('<h1 class="reportAreaTitle">' + s + '</h1>');

			top.document.title = Ika.lang.changed_attacks_title + ': ' + Ika.lang.new_attacks;

			Ika.cfgWrite ('general', newAttacks);
			Ika.cfgWrite ('generalCnt', cnt);

			// array to cache island coordinates
			var cityIslandCache = Ika.cfgRead ('cityIslandCache', '');

			if (cityIslandCache != '')	{ cityIslandCache = cityIslandCache.split(','); }
			else						{ cityIslandCache = []; }

			// now for all attacks try to get island coordinates
			for (var i in attacks)
			{
				var attackedId = attacks[i][5];

				// is it already cached byt city id ?
				if (typeof cityIslandCache[attackedId] != 'undefined' && cityIslandCache[attackedId] != '')
				{
					attacks[i][7] = cityIslandCache[attackedId];
				}
				else // then fetch by AJAX
				{
					$.ajax({
						type: "GET",
						async: false,
						url: attacks[i][6],
						success: function(msg)
						{
							if (/view=worldmap_iso(&|&amp;)islandX=([0-9]+)(&|&amp;)islandY=([0-9]+)"/.exec(msg))
							{
								attacks[i][7] = RegExp.$2 + ':' + RegExp.$4;
							}
							else
							{
								attacks[i][7] = 'xx:yy';
							}
							cityIslandCache[attackedId] = attacks[i][7];
						}
					});
				}

				if (Ika.showInnerCoordinates)
				{
					$('#attackedCoordinates' + i).text(attacks[i][7]);
				}
				
				$('#attackedCoordinatesA' + attackedId).text('[' + attacks[i][7] + ']');
				coordinates += attacks[i][7] + ',';

				Ika.cfgWrite ('general', newAttacks + '\n---\n' + coordinates);
			}
			Ika.cfgWrite ('cityIslandCache', cityIslandCache.join(','));
		}
		else // no, there are no changes in attacks 
		{
			var temp =  Ika.lang.no_new_attacks;

			if (cnt > 0 )
			{
				 temp += ' (' + Ika.lang.total + ': ' + cnt + ')';
			}

			$("#AttackInfoArea").prepend ('<h1 class="reportAreaTitle">' + temp + '</h1>');

			var temp = oldAttacksPart.split(',');
			for (var j in temp)
			{
				var k = parseInt(j) + 1;
				if (Ika.showInnerCoordinates)
				{
					$('#attackedCoordinates' + k).text(temp[j]);
				}
				if (typeof attacks[k] != 'undefined')
				{
					$('#attackedCoordinatesA' + attacks[k][5]).text('[' + temp[j] + ']');
				}
			}
		}

		var t = setInterval (function rcd() { --refresh_interval; $('#reloadButton').text(Ika.lang.reload + ' ( ' + refresh_interval + ' s )'); }, 1000);
		setTimeout ("self.location.reload()", refresh_interval * 1000);

		/* Menu item */
		$('#embassyMenu #general LI').eq(1).addClass('selected');

		/* Events */
		$("#iga_settings_toggler").click(		function() { Ika.toggleSettings(); });
		$("#iga_settings_save").click(			function() { Ika.saveSettings(); });
		$("#iga_settings_cancel").click(		function() { Ika.toggleSettings(); });
		$("#iga_video_id_attack_test").click(	function() { Ika.testSettings (); });
		$("#attacksToggle").click(				function() { Ika.toggleDisplay(); });
		$("#showCityURL").click(				function() { Ika.showCityURLs(); });

		/* Send circular message */
		if (Ika.allyId > 0 && Ika.playerId > 0)
		{
			var s= '<div id="notice">\n'
				+ '<form action="index.php" method="post">\n'
				+ '<input name="action" value="Messages" type="hidden">\n'
				+ '<input name="function" value="send" type="hidden">\n'
				+ '<input name="receiverId" value="' + Ika.playerId+ '" type="hidden">\n'
				+ '	<span>\n'
				+ '		<input name="relType" value="0" type="hidden">\n'
				+ '		<input name="relAction" value="0" type="hidden">\n'
				+ '		<input name="relCity" value="0" type="hidden">\n'
				+ '		<input name="msgType" value="51" id="treaties" type="hidden">\n'
				+ '		<input name="allyId" value="' + Ika.allyId + '" type="hidden">\n'
				+ '</span>\n'
				+ '<span><textarea id="text" style="height:210px;" class="textfield" name="content"></textarea></span><br>\n'
				+ '<div class="centerButton">\n'
				+ '	<a class="button" href="javascript:;" title="' + Ika.lang.send + '" id="iga_send_button">' + Ika.lang.send + '</a>\n'
				+ '	<p style="padding:10px; display: none; font-size:1.3em;">' + Ika.lang.circular_sent + '</p>\n'
				+ '</div>\n'
				+ '</form>\n'
				+ '</div>\n'

			$("#general_assistant").append (s);
			Ika.copyAttacks();

			$("#iga_send_button").click( function () {
				var d = $('#notice FORM').serialize();
				var t = $('#notice FORM #text').val();
				if (t == '')
				{
					alert('You can not send empty message. Type some text :)');
				}
				else
				{
					$.ajax({
						type: "POST",
						url: 'index.php',
						data: d,
						success: function(msg)
						{
							$("#notice .centerButton A").fadeOut(500).animate({ dummy:1}, 5500).fadeIn(500);
							$("#notice .centerButton P").animate({ dummy:1}, 500).fadeIn(500).animate({ dummy:1}, 4000).fadeOut(500);
						}
					});
				}
			});
		}
		else
		{
			$("#general_assistant").append ('<p align="center"><b>Please open your <a href="/index.php?view=diplomacyAdvisorAlly">Ally page</a> to fetch your ally ID<br />and you will be able to send circular messages directly from here.</b></p>');
		}
	}

/** Attacks from the ally */
	else if (Ika.view == 'embassyGeneralAttacksFromAlly')
	{
		var c = '';
		var units, time;
		var attacker_name = '';

		$("#mainview .table01 .rowRanks").each( function ()
		{
			units = $('TD', this).eq(2).html().trim();
			time = $('TD:eq(0) DIV .time', this).text().trim();

			var attackedTime = time;
			var attackedType = $('TD', this).eq(1).text();
			var attackClass = 'army';
			var unitsText = Ika.lang.troops;
			var attackStatus =  Ika.statusAttack;

			if (attackedType == Ika.lang.capture_port || attackedType == Ika.lang.capture_port_attack || attackedType == Ika.lang.fleet_station || attackedType == Ika.lang.fleet_station_attack || attackedType == Ika.lang.fleet_station_fight)
			{
				unitsText 	= Ika.lang.ships;
				unitsIcon 	= '/skin/characters/fleet/60x60/ship_mortar_faceright.gif';
				attackClass = 'navy';
			}

			if (attackedType == Ika.lang.fleet_station_fight || attackedType == Ika.lang.pillage_fight || attackedType == Ika.lang.deploy_troops_fight || attackedType == Ika.lang.occupy_town_fight)
			{
				attackedTime = '#';
				attackStatus = Ika.statusBattle;
				attackClass += ' battle';
			}
			else if (attackedType == Ika.lang.pillage)
			{
				attackStatus = Ika.statusAttack;
				attackClass += ' pillage';
			}
			else if (attackedType == Ika.lang.pillage_return)
			{
				attackStatus = Ika.statusReturn;
				attackClass += ' return';
			}
			else if (attackedType == Ika.lang.reorganize || attackedType == Ika.lang.deploy_troops_cancel || attackedType == Ika.lang.pillage_cancel)
			{
				attackStatus = Ika.statusReturn;
				attackClass += ' cancelled';
			}
			else if (time == '-')
			{
				attackStatus = Ika.statusDeployed;
				attackClass += ' deployed';
			}
			else
			{
				attackClass += ' underway';
			}

			// do not show those cities where other ally members deployed 1 unit
			if (units > 1)
			{
				if (time == '-')		{ time = ' ' ; }
				else if (time != '')	{ time = time + ': '; }

				var new_attacker_name = $('TD', this).eq(3).text();
				if (new_attacker_name != attacker_name)
				{
					attacker_name = new_attacker_name;
					c += '<div class="outgoing thetitle">' + new_attacker_name + '</div>\n';
				}

				c += '<div class="outgoing ' + attackClass + '">'
					+ time + $('TD', this).eq(1).html()
					+ ' → <span class="attackerName">' + $('TD', this).eq(3).html() + ' &nbsp; </span> '
					+ ' (' + units + ' ' + unitsText + ')'
					+ ' <span class="attackStatus">' + attackStatus + '</span> <span class="defenderName">' + $('TD', this).eq(4).html() + '</span>'
					+ '<br /><br /></div>';
			}
		});

		if (c != '')
		{
			$('#mainview .content').prepend ('<div id="AttackInfoArea" align="center">'
				+ '<div id="reportAreaOutgoing">' + c + '</div>'
				+ '<a class="button" id="reloadButton" onclick="self.location.reload()" >' + Ika.lang.reload + '</a>'
				+ '</div>');
		}

		$('#embassyMenu #general LI').eq(2).addClass('selected');
	}

	else if (Ika.view == 'embassyGeneralTroops')
	{
		$('#embassyMenu #general LI').eq(0).addClass('selected');
	}

});

/* Styles in general view */
var css = ""
	+ "#general UL { padding:0; list-style: none; margin:10px 0 !important; border-bottom: 1px solid #E4B873; }"
	+ "#general LI { padding:0; list-style: none !important; margin:0 !important; border-top: 1px solid #E4B873; text-align: center !important; background:#fff; }"
	+ "#general LI A { display: block; padding:10px 5px;  }"
	+ "#general LI.selected { background:#ff0; font-size: larger; }"
	+ "#general LI.selected A {  font-weight: bold; }"

	+ "#reportArea { width:660px; height:auto; overflow:auto; margin:0 auto; display: block; clear:none; text-align:left; line-height:130%; padding:0 5px; }"
	+ "#reportAreaOutgoing { width:650px; height:auto; overflow:auto; margin:10px auto; display: block; clear:none; text-align:left; line-height:130%; padding:0; background:#fff; border:1px solid #E4B873; font:normal 1.1em Consolas,monospace;}"
	+ ".reportAreaTitle { margin:0 !important; padding:0; }"

	+ "#reloadButton { cursor: pointer; }"
	+ ".attackItemTitle { clear:both; padding:5px 10px; margin:2px; border:1px solid #CEA370; color:#000; background:#ffff99; font-weight: normal; font-size:1.4em; text-align:center;}"
	+ ".attackItemTitle.defender { color:#000; background:transparent; border:none; border-bottom:1px solid #000; text-align:left; padding-left:0; padding-top:20px; }"
	+ ".attackItemTitle.deployed { color:#888; background:transparent; border:none; }"
	+ ".attackItemTitle.underway { color:#fff; background:#900; }"
	+ ".attackItem { height:55px; padding:5px 0; margin:2px; border:1px solid #ccc; background:#fff; }"
	+ ".attackItem.army { float:left; width:324px; border:1px solid #c08000; }"
	+ ".attackItem.navy { float:left; width:324px; border:1px solid #a0a0c0; }"
	+ ".attackItem.battle { background:#ffffcc; border:1px solid #900000;  }"
	+ ".attackItem.deployed { color:#999; border:1px solid #e0e0e0;  }"
	+ ".attackItem.underway { color:#000; background:#ffffcc; }"
	+ ".attackItem.army.underway { background:#ffe9e0; border:1px solid #ff0000; }"
	+ ".attackItem.navy.underway { background:#f0f9ff; border:1px solid #a0b0c0; }"
	+ ".attackItem.navy.battle { background:#d0e0ff; border:1px solid #0000ff; }"
	+ ".attackItem .attackedCoordinates { font-weight: bold; color: #77351B; padding:1px 2px; font-size:14px; line-height:100%; font-family:consolas, monospace;}"
	+ ".attackItem .unitsCountLarge { color:#00c; font-size:15px; display: block; float:left; margin-left:-50px; margin-top:35px; width:45px; text-align: center; font-weight: bold; }"
	+ ".attackItem .unitsCount { color:#000; font-family:consolas, monospace;}"
	+ ".attackItem .attackTime { color:#0000c0; display:block; float:right; text-align:right; padding-right:5px; font-size:15px; }"
	+ ".attackItem .source { font-weight: bold; }"
	+ ".attackItem .source A { color:black; }"
	+ ".attackItem .destination { font-weight: bold; color:#ff0000; }"
	+ ".attackItem .destination A { color:#ff0000; }"
	+ ".attackItem.deployed .source A { color:#666; }"
	+ ".attackItem.deployed .destination A { color:#B1504E; }"
	+ ".attackItem.deployed .unitsCount { color:#666; }"
	+ ".attackStatus { font-size:16px; line-height:12px; font-weight: bold; float:left; padding:0 5px; color:black; }"

	+ ".attackerCityName { display: none; }"
	+ ".defenderCityName { display: none; }"

	+ ".attackUrls { display: none; }"
	+ ".unitsIcon { display: block; float: left; margin-right:1em; width:45px; height:50px; text-align: center; }"
	+ ".unitsIcon IMG { max-height:35px; max-width:40px; }"

	+ "#reportArea.full .attackItem { height:auto; width:auto; float:none; clear:both; padding: 5px;}"
	+ "#reportArea.full .attackItem .unitsIcon { display:none;}"
	+ "#reportArea.full .attackItem .unitsIcon IMG { display:none;}"
	+ "#reportArea.full .attackItem .destination { float:right;}"
	+ "#reportArea.full .attackItem .source { width:25%; float:left; }"

	+ ".outgoing { border-bottom:1px solid #e0e0e0; padding: 5px 5px; clear:both; }"
	+ ".outgoing.thetitle { background:#DFAE69; color: #000; text-align: center; border:none; border-bottom:1px solid black; font-weight:normal; }"
	+ ".outgoing.navy { background:#c0d0ff;}"
	+ ".outgoing.deployed { background:#e8e8e8; color:#777; }"
	+ ".outgoing.battle { background:#f8d8d8; color:#000; }"
	+ ".outgoing.pillage { background:#e8d0FF; color:#000; }"
	+ ".outgoing.return { background:#e0f8e0; color:#666; }"
	+ ".outgoing.cancelled { background:#a0a0a0; color:#fff; }"
	+ ".outgoing .attackerName { font-weight:bold; color: #ff0000; float:left; min-width:20% ;}"
	+ ".outgoing .defenderName { font-weight:bold; color: #0000c0; float:right;}"
	+ ".outgoing.battle A { color: #ff0000; }"
	+ ".outgoing.return A { color: #008000; }"
	+ ".outgoing.deployed A { color: #506070; }"

	+ ".unitsLost { background:#ff0000; color:#fff; font-weight: bold; padding:2px 4px; border:0; }"
	+ ".unitsNew { background:#00ff00; color:#000; font-weight: bold; padding:2px 4px; border:0; }"

	+ "#iga_settings { text-align: center; }"
	+ "#iga_settings_content { display:none; text-align: center; padding:10px; }"
	+ "#iga_settings_content P { margin:0; padding:1em 0; }"
	+ "#iga_settings_content A { cursor: pointer; }"

GM_addStyle (css);

// end of script
