// ==UserScript==
// @name		Automata Tábornok
// @description	Automata tábornok jelezz, ha támadják a szövetséged egy tagját.
// @namespace	general.ikariam
// @version 	0.1.1
// @author		HoaxMaLac ( http://userscripts.org/scripts/show/106103 )
// @include		http://*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly*
// @include		http://*.ikariam.*/index.php?view=embassyGeneralAttacksFromAlly*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license		GNU GPL v3 http://www.gnu.org/copyleft/gpl.html
//
// ==/UserScript==

var languages =
{
	en:
	{
		'no_attacks' : 'A szövetséged egyetlen tagja sincs támadás alatt.',
		'reload' : 'FRISSÍTÉS',
		'new_attacks' : 'Új támadás: ',
		'stopped_attacks' : 'Terminated attacks: ',
		'no_new_attacks' : 'Nincs új támadás ',
		'changed_attacks' : 'Changed attacks. ',
		'changed_attacks_title' : 'ATTACK CHANGE',
		'units' : 'egység',
	}
};

Ika = {
	server: '',			// szerver
	view : '',			// nézet
	position : '',		// pozició
	cityLevel : 0,		// város szint
	language : 'en',	// nyelv
	lang: '',			// nyelv

	// parent container
	parentElement : '#city #container #mainview #locations ',

	allyId : 0,

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
			var allyId = $("#allyinfo tbody TR:eq(7) TD:eq(1) A").attr('href');
			var regExp = new RegExp("allyId\=([0-9]+)", "ig");
			var RegExpRes = regExp.exec(allyId);
			this.allyId = (RegExpRes == null) ? '' : RegExpRes[1];

			this.cfgWrite ('allyId', this.allyId);
		}
	},

	// initialize
	init : function()
	{
		this.getServer();
		this.getView();
		this.getAllyId ();
	}

};

// execute
Ika.init();

var refresh_interval = 120;
const flashurl  = "http://img534.imageshack.us/img534/6408/alarm.swf";

var alerts =
{
	0 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/nK5fKFFqJe4?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	1 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/A-Vv4PRtV58?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	2 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/yuk62WtK4sk?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	3 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/IvNBdSerHVU?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	4 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/9e5cqe_JE0Q?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	5 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/9e5cqe_JE0Q?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	6 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/9e5cqe_JE0Q?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	7 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/9e5cqe_JE0Q?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	8 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/9e5cqe_JE0Q?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	9 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/s_FQVF0UFR4?autoplay=1" frameborder="0" allowfullscreen></iframe>',
	10 : '<iframe width="480" height="390" src="http://www.youtube.com/embed/YgcFbPrt1I8?autoplay=1" frameborder="0" allowfullscreen></iframe>',
};

// const ALERT_NUMBER = Math.floor(Math.random() * 10);
const ALERT_NUMBER = 10;

$(document).ready ( function()
{
	if (Ika.view == 'embassyGeneralAttacksToAlly')
	{
		var c = '';
		var c1 = '';
		var cnt = 0;

		$("#mainview .table01 .rowRanks").each( function ()
		{
			var t = $('TD:eq(0) DIV .time', this).text().trim();
			if (t != '')
			{
				cnt++;
				var d = ' ► ' + $('TD', this).eq(1).html();
				d += ' → ' + $('TD', this).eq(2).html() + ' ' + Ika.lang.units + ' → ';
				d += $('TD', this).eq(3).text();
				d += '  ► ' + $('TD', this).eq(4).text();
				d += '\nhttp://' + window.location.hostname + $('TD:eq(3) A', this).attr('href');
				d += '  ► http://' + window.location.hostname + $('TD:eq(4) A', this).attr('href');
				d += '\n\n';
				c1 = d;
				c += t + d;
			}
		});

		var oldGeneral = Ika.cfgRead ('general', '');
		var oldGeneralCnt = Ika.cfgRead ('generalCnt', 0);

		if (c == '')
		{
			c = Ika.lang.no_attacks;
		}
		else
		{
			refresh_interval = 60; // reduce refresh interval to 1 minute
		}

		var html_content = '<div id="AttackInfoArea" align="center">'
			+ '<textarea id="reportArea" onclick="this.select();">' + c + '</textarea><br /><br />'
			+ '<a class="button" id="reloadButton" onclick="self.location.reload()">' + Ika.lang.reload + ' ( ' + refresh_interval + ' s )</a><br /><br />';
			+ '</div>';

		$('#mainview .content').prepend (html_content);

		if (oldGeneral != c1)
		{
			var attackDiff = cnt - oldGeneralCnt;
			var s = '';
			if (attackDiff > 0)			{ s = Ika.lang.new_attacks + attackDiff; 	$('#mainview .content').append('<div align="center">' + alerts[ALERT_NUMBER] + '</div>');}
			else if (attackDiff < 0)	{ s = Ika.lang.stopped_attacks + Math.abs(attackDiff); }
			else						{ s = Ika.lang.no_new_attacks; }

			$("#AttackInfoArea").prepend ('<h1 id="reportAreaTitle">' + Ika.lang.changed_attacks + s +'</h1>');

			top.document.title = Ika.lang.changed_attacks_title;
			Ika.cfgWrite ('general', c1);
			Ika.cfgWrite ('generalCnt', cnt);
		}

//		$('BODY').append ('<div id="reloadCounter" title="reload countdown">' + refresh_interval + '</div>');
		var t = setInterval (function rcd() { --refresh_interval; $('#reloadButton').text(Ika.lang.reload + ' ( ' + refresh_interval + ' s )'); }, 1000);
		setTimeout ("self.location.reload()", refresh_interval * 1000);
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
				if (time == '-')		{ time = ' '; }
				else if (time != '')	{ time = '  ' + time + ': '; }

				c += time + $('TD', this).eq(1).html();
				c += ' (' + units + ' ' + Ika.lang.units + ')';
				c += '   ' + $('TD', this).eq(3).text();

				c += '   ' + $('TD', this).eq(4).text();
				c += '\n';
			}
		});

		if (c != '')
		{
			$('#mainview .content').prepend ('<div id="AttackInfoArea" align="center"><textarea id="reportArea">' + c + '</textarea><br /><br /><a class="button" id="reloadButton" onclick="self.location.reload()" >' + Ika.lang.reload + '</a><br /><br /></div>');
		}
	}

});

/* Styles in general view */
GM_addStyle("#reportArea { width:90%; margin:1em auto; height:94px; }");
GM_addStyle("#reportAreaTitle { margin:0.5em 0 !important; padding:0; }");
GM_addStyle("#reloadCounter { z-index:999; position: fixed; top:0; right:0; padding:10px; font-size:11px; color:#000; }");

// end of script