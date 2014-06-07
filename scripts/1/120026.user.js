// ==UserScript==
// @name		Ikariam Tábornok Segéd
// @description	A script jelezz, ha támadják a szövetséged egy tagját.
// @namespace	general.ikariam
// @version 	1.1
// @author		HoaxCoca ( http://userscripts.org/users/423390 )
// @include		http://*.ikariam.*
// @include		http://*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly*
// @include		http://*.ikariam.*/index.php?view=embassyGeneralAttacksFromAlly*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license		GNU GPL v3 http://www.gnu.org/copyleft/gpl.html
// @match http://*/*
// @match http://*.google.com/*
// @match http://www.google.com/*
//
// ==/UserScript==

var languages =
{
	hu:
	{
		'total' 				: 'összesen',
		'remaining' 			: 'hátralévő',
		'no_attacks' 			: 'Nincs támadás',
		'reload' 				: 'Frissités',
		'settings' 				: 'Beállitások',
		'copy' 					: 'Jelentés másolása',
		'copy_info'				: 'Klikk a szövegmezőre és Ctrl+C',
		'label_video_id'		: 'YouTube Video ID',
		'label_youtube_url'		: 'Másold be a YouTube videó azonosítóját',
		'label_refesh_normal'	: 'Frissítés intervallum (<b>inaktiv állapot</b>)',
		'label_refresh_attack'	: 'Frissítés intervallum (<b>aktiv állapot</b>)',
		'label_save_settings'	: 'Beállitások mentése',
		'label_cancel'			: 'Mégse',
		'seconds'				: 'másodperc',
		'new_attacks' 			: 'Új támadás: ',
		'stopped_attacks' 		: 'Terminated attacks: ',
		'no_new_attacks' 		: 'Nincs új támadás',
		'changed_attacks' 		: 'Támadás változott. ',
		'changed_attacks_title'	: 'TÁMADÁS VÁLTOZOTT',
		'units' 				: 'egység',
		'troops' 				: 'flotta',
		'ships' 				: 'hajó',
		'capture_port' 			: 'Occupy port (underway)',
		'capture_port_attack'	: 'Occupy port (underway)',
		'fleet_station' 		: 'Fleets station',
		'fleet_station_attack'	: 'Fleets station (underway)',
		'fleet_station_fight'	: 'Fleets station (Open Battle)',
		'defend_port' 			: 'Defend port! (underway)',
		'defend_port_battle'	: 'Defend port! (Open Battle)',
		'pillage' 				: 'Pillage (underway)',
		'pillage_fight'			: 'Pillage (Open Battle)',
		'deploy_troops' 		: 'Deploy troops',
		'deploy_troops_fight'	: 'Deploy troops (Open Battle)',
		'occupy_town' 			: 'Occupy town! (underway)',
		'occupy_town_fight' 	: 'Occupy town! (Open Battle)',
	}
};

Ika = {
	server			: '',
	view 			: '',
	position 		: '',
	cityLevel 		: 0,
	language 		: 'hu',
	lang			: '',
	script_name		: 'Ikariam Tábornok Segéd',
	script_version	: '',
	script_url		: '',

	// parent container
	parentElement	: '#city #container #mainview #locations ',
	allyId 			: 0,

	getServer : function ()
	{
		this.server = window.location.host;
		var temp = this.server.split('.');
		temp = temp[1];

		this.language = temp in languages ? temp : 'hu';
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
			var allyId = $("#allyinfo tbody TR:eq(7) TD:eq(1) A").attr('href');
			var regExp = new RegExp("allyId\=([0-9]+)", "ig");
			var RegExpRes = regExp.exec(allyId);
			this.allyId = (RegExpRes == null) ? '' : RegExpRes[1];

			this.cfgWrite ('allyId', this.allyId);
		}
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
		var temp = $("#iga_video_id_attack").val();
		this.cfgWrite ('video_id_attack', temp);
		var temp = $("#iga_refresh_normal").val();
		this.cfgWrite ('refresh_normal', temp);
		var temp = $("#iga_refresh_attack").val();
		this.cfgWrite ('refresh_attack', temp);
		$('#iga_settings_content').hide();
	},

	testSettings : function ()
	{
		$('#iga_settings_test').html('<iframe width="480" height="390" src="http://www.youtube.com/embed/' + $("#iga_video_id_attack").val() + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
	},

	copyAttacks : function ()
	{
		var s = $('#reportArea');
		$('.unitsCountLarge', s).remove();
		s = $(s).text();
		$('#reportAreaText').text(s);
		$('#reportAreaCopy').show();
		document.getElementById('reportAreaText').select();
	},

	// initialize
	init : function(name)
	{
		this.script_name 	 = name;
		this.getServer();
		this.getView();
		this.getAllyId();
	}

};

// execute
Ika.init('');

var refresh_interval = Ika.cfgRead('refresh_normal', 240);
const flashurl  = "http://img534.imageshack.us/img534/6408/alarm.swf";

$(document).ready ( function()
{
	if (Ika.view == 'embassyGeneralAttacksToAlly')
	{
		var c = '';
		var newAttacks = '';
		var cnt = 0;
		var attacks = [];

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

				if (   attackedType == Ika.lang.capture_port
					|| attackedType == Ika.lang.capture_port_attack
					|| attackedType == Ika.lang.fleet_station
					|| attackedType == Ika.lang.fleet_station_attack
					|| attackedType == Ika.lang.fleet_station_fight
					)
				{
					unitsText 	= Ika.lang.ships;
					unitsIcon 	= '/skin/characters/fleet/60x60/ship_mortar_faceright.gif';
					attackClass = 'navy';
				}

				attacks[cnt] = [attackedTime, attackedType, attackedUnits, attackedAttacker, attackedFromId, attackedId, attackedUrl, ''];

				var atackStatus =  ' ';
				if (attackedTime == '-')
				{
					if (   attackedType == Ika.lang.fleet_station_fight
						|| attackedType == Ika.lang.pillage_fight
						|| attackedType == Ika.lang.deploy_troops_fight
						|| attackedType == Ika.lang.occupy_town_fight
					)
					{
						attackedTime = '#';
						atackStatus = '§';
						attackClass += ' battle';
					}
					else
					{
						atackStatus = ' ';
						attackClass += ' deployed';
					}
				}
				else
				{
					attackClass += ' underway';
				}

				var d = '<div class="attackItem ' + attackClass + '" id="attack' + cnt + '">';
				d += '<span class="attackedCoordinates" id="attackedCoordinates' + cnt + '"></span> ' + '<br />\n' + '<span class="attackTime">' + attackedTime + '</span>' + '  ' + attackedType;
				d += '<span class="unitsCount">' + '   ' + attackedUnits + '  ' + '</span><span class="destination"><a target="attackWindow" href="' + attackedFromUrl + '">' + attackedAttacker + '</a></span> ' + atackStatus + ' <span class="source"><a target="attackWindow" href="' + attackedUrl + '">' + attackedDefender + '</a></span>';
				d += '<span class="attackUrls">' + '<br />\n' + attackedUrl + ' </span>';
				d += '<br />\n<br />\n</div>';

				newAttacks += attacks[cnt][1] + '||' + attacks[cnt][2] + '||' + attacks[cnt][3] + '||' + attacks[cnt][4] + '||' + attacks[cnt][5] + '\n';

				c += d;
			}
		});

		var oldAttacks = Ika.cfgRead ('general', '');
		var oldAttacksCnt = Ika.cfgRead ('generalCnt', 0);

		var oldAttacksPart = oldAttacks.split ('\n---\n');

		oldAttacks 		= oldAttacksPart[0];
		oldAttacksPart 	= (oldAttacksPart[1] == undefined) ? '' : oldAttacksPart[1];

		if (c == '')
		{
			c = '<p align="center" style="font-size:large;">' + Ika.lang.no_attacks + '</p>';
		}
		else
		{
			refresh_interval = Ika.cfgRead('refresh_attack', 120);;
		}

		var html_content = ''
			+ '<div id="AttackInfoArea" align="center"></div>'
			+ '<div id="reportArea" >' + c + '<div style="clear:left;"></div></div>'
			+ '<div id="reportAreaCopy"><textarea onclick="this.select();" id="reportAreaText"></textarea><p>' + Ika.lang.copy_info + '</p></div>'
			+ '<div style="margin-top:1em; padding:1em; text-align:center; background:#FBE2B5; border-top:1px solid #AB8659;">'
			+ '<p><a id="copyAttacks" class="button" href="javascript:;">' + Ika.lang.copy + '</a>'
			+ ' <a class="button" id="reloadButton" onclick="self.location.reload()">' + Ika.lang.reload + ' ( ' + refresh_interval + ' s )</a>'
			+ ' <a class="button" href="javascript:;" id="iga_settings_toggler">' + Ika.script_name + ' ' + Ika.lang.settings + '</a></p>'
			+ '<div id="iga_settings_content">'
			+ '<h1 class="reportAreaTitle">' + Ika.script_name + '' + Ika.script_version + ' ' + Ika.lang.settings + '</h1>'
			+ '<p>' + Ika.lang.label_video_id + ': <input type="text" id="iga_video_id_attack" value="nK5fKFFqJe4" size="50" /> &nbsp; '
			+ '<a id="iga_video_id_attack_test" href="javascript:;" >TESZT!</a></p>'
			+ '<p>' + Ika.lang.label_youtube_url + ': <br /><img src="http://i.imm.io/9Dhl.png" alt="video id" /></p>'
			+ '<p>' + Ika.lang.label_refesh_normal + ': <input type="text" id="iga_refresh_normal" value="240" size="5" /> ' + Ika.lang.seconds + '</p> '
			+ '<p>' + Ika.lang.label_refresh_attack + ': <input type="text" id="iga_refresh_attack" value="120" size="5" /> ' + Ika.lang.seconds + '</p> '
			+ '<p><a class="button" id="iga_settings_save">' + Ika.lang.label_save_settings + '</a> &nbsp; <a id="iga_settings_cancel">' + Ika.lang.label_cancel + '</a></p>'
			+ '<p id="iga_settings_test"></p>'
			+ '</div>'
			+ '<p><a href="' + Ika.script_url + '">' + Ika.script_name + ' ' + Ika.script_version + '</a></p>'
			+ '</div>'
			+ '</div>';

		$('#mainview .content').prepend (html_content);

		var coordinates = '';
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
			else						{ s = Ika.lang.no_new_attacks + + ' (' + Ika.lang.total + ': ' + cnt + ')'; }

//			$("#AttackInfoArea").prepend ('<h1 class="reportAreaTitle">' + Ika.lang.changed_attacks + ' (' + attackDiff + ')</h1>');
			$("#AttackInfoArea").prepend ('<h1 class="reportAreaTitle">' + s + '</h1>');

			top.document.title = Ika.lang.changed_attacks_title;

			Ika.cfgWrite ('general', newAttacks);
			Ika.cfgWrite ('generalCnt', cnt);

			for (var i in attacks)
			{
				$.ajax({
					type: "GET",
					async: false,
					url: attacks[i][6],
					success: function(msg)
					{
						if (/view=worldmap_iso(&|&amp;)islandX=([0-9]+)(&|&amp;)islandY=([0-9]+)"/.exec(msg))
						{
							attacks[i][7]= RegExp.$2 + ':' + RegExp.$4;
						}
						else
						{
							attacks[i][7] = 'xx:yy';
						}

						$('#attackedCoordinates' + i).text(attacks[i][7]);
						coordinates += attacks[i][7] + ',';
					}
				});

				Ika.cfgWrite ('general', newAttacks + '\n---\n' + coordinates);
			}

		}
		else
		{
			$("#AttackInfoArea").prepend ('<h1 class="reportAreaTitle">' + Ika.lang.no_new_attacks + ' (' + Ika.lang.total + ': ' + cnt + ')</h1>');

			var temp = oldAttacksPart.split(',');
			for (var j in temp)
			{
				var k = parseInt(j) + 1;
				$('#attackedCoordinates' + k).text(temp[j]);
			}
		}

		var t = setInterval (function rcd() { --refresh_interval; $('#reloadButton').text(Ika.lang.reload + ' ( ' + refresh_interval + ' s )'); }, 1000);
		setTimeout ("self.location.reload()", refresh_interval * 1000);

		$('#copyAttacks').click ( function () { Ika.copyAttacks(); });

		/* Menu item */
		$('#embassyMenu #general LI').eq(1).addClass('selected');

		/* Events */

		$("#iga_settings_toggler").click(function(){ Ika.toggleSettings(); });
		$("#iga_settings_save").click(function() { Ika.saveSettings(); });
		$("#iga_settings_cancel").click(function() { Ika.toggleSettings(); });
		$("#iga_video_id_attack_test").click(function() { Ika.testSettings (); });

	}

	else if (Ika.view == 'embassyGeneralAttacksFromAlly')
	{
		var c = '';
		var units, time;

		$("#mainview .table01 .rowRanks").each( function ()
		{
			units = $('TD', this).eq(2).html().trim();
			time = $('TD:eq(0) DIV .time', this).text().trim();

			if (units > 1)
			{
				if (time == '-')		{ time = '-  '; }
				else if (time != '')	{ time = time + '  '; }

				c += time + $('TD ', this).eq(1).html();
				c += '  ' + units + ' ' + '  ';
				c += '    ' + $('TD ', this).eq(3).html();
				c += '    ' + $('TD ', this).eq(4).html();
				c += '<br />';
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
GM_addStyle("#general UL { padding:0; list-style: none; margin:10px 0 !important; border-bottom: 1px solid #E4B873; }");
GM_addStyle("#general LI { padding:0; list-style: none !important; margin:0 !important; border-top: 1px solid #E4B873; text-align: center !important; background:#fff; }");
GM_addStyle("#general LI A { display: block; padding:10px 5px;  }");
GM_addStyle("#general LI.selected { background:#ff0; font-size: larger; }");
GM_addStyle("#general LI.selected A {  font-weight: bold; }");
GM_addStyle("#reportArea { width:660px; height:auto; overflow:auto; margin:0 auto; display: block; clear:none; text-align:left; line-height:130%; padding:0 5px; }");
GM_addStyle("#reportAreaOutgoing { width:600px; height:auto; overflow:auto; margin:10px auto; display: block; clear:none; text-align:left; line-height:130%; padding:0 10px; background:#fff; border:1px solid #E4B873; font:normal 1.2em Consolas,monospacel;}");
GM_addStyle("#reportAreaCopy { width:650px; margin:5px auto; display: none; }");
GM_addStyle("#reportAreaCopy TEXTAREA { width:100%; height:100px; }");
GM_addStyle(".reportAreaTitle { margin:0 !important; padding:0; }");
//GM_addStyle("#reloadCounter { z-index:999; position: fixed; top:0; right:0; padding:10px; font-size:11px; color:#000; }");
GM_addStyle("#reloadButton { cursor: pointer; }");
GM_addStyle(".attackItem { height:55px; padding:5px 0; margin:2px; border:1px solid #ccc; background:#fff; }");
GM_addStyle(".attackItem.army { float:left; width:324px; border:1px solid #c08000; }");
GM_addStyle(".attackItem.navy { float:left; width:324px; border:1px solid #a0a0c0; }");
GM_addStyle(".attackItem.battle { background:#ffffcc; border:1px solid #900000;  }");
GM_addStyle(".attackItem.deployed { color:#808080; border:1px solid #c0c0c0;  }");
GM_addStyle(".attackItem.underway { color:#000; background:#ffffcc; }");
GM_addStyle(".attackItem.army.underway { background:#ffe9e0; border:1px solid #ff0000; }");
GM_addStyle(".attackItem.navy.underway { background:#f0f9ff; border:1px solid #a0b0c0; }");
GM_addStyle(".attackItem.navy.battle { background:#d0e0ff; border:1px solid #0000ff; }");
GM_addStyle(".attackItem .attackedCoordinates { font-weight: bold; color:#000; }");
GM_addStyle(".attackItem .unitsCountLarge { color:#00c; font-size:15px; display: block; float:left; margin-left:-50px; margin-top:35px; width:45px; text-align: center; font-weight: bold; }");
GM_addStyle(".attackItem .unitsCount { color:#000; }");
GM_addStyle(".attackItem .attackTime { color:#0000c0; display:block; float:right; text-align:right; padding-right:5px; font-size:15px; }");
GM_addStyle(".attackItem .source { font-weight: bold; }");
GM_addStyle(".attackItem .source A { color:black; }");
GM_addStyle(".attackItem .destination { font-weight: bold; color:#ff0000; }");
GM_addStyle(".attackItem .destination A { color:#ff0000; }");
GM_addStyle(".attackUrls { display: none; }");
GM_addStyle(".unitsIcon { display: block; float: left; margin-right:1em; width:45px; height:50px; text-align: center; }");
GM_addStyle(".unitsIcon IMG { max-height:35px; max-width:40px; }");

GM_addStyle("#iga_settings { text-align: center; }");
GM_addStyle("#iga_settings_content { display:none; text-align: center; padding:10px; }");
GM_addStyle("#iga_settings_content P { margin:0; padding:1em 0; }");
GM_addStyle("#iga_settings_content A { cursor: pointer; }");

// end of script
