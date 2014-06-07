// ==UserScript==
// @name		Ikariam Counter
// @version 	1.1
// @namespace	ikariam.army
// @description	Simple counter for Ikariam
// @icon		http://img710.imageshack.us/img710/6600/ikariamgeneralicon.png
// @author		bluesman ( http://userscripts.org/users/165018 )
// @include		http://s*.*.ikariam.*
// @exclude		http://support.ikariam.*/*
// @exclude		http://board.*.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license		GNU GPL v3 http://www.gnu.org/copyleft/gpl.html
//
// @history		1.1 	first release 
// @history		1.0 	initial version
// ==/UserScript==

var languages =
{
	rs:
	{
		'send' 					: 'Пошаљи',
		'settings' 				: 'Подешавање',
		'seconds'				: 'секунди',
	},
	en:
	{
		'send' 					: 'Submit Circular Message',
		'settings' 				: 'Settings',
		'seconds'				: 'seconds',
	}
};

Ika = {
	server			: '',		// current server
	view 			: '',		// current view
	position 		: '',		// current building position
	cityLevel 		: 0,		// currentu city level
	language 		: 'en',		// selected language
	lang			: '',		// language strings
	script_name		: 'Ikariam Counter',
	script_version	: '1.1',
	script_url		: 'http://userscripts.org/scripts/show/119145',

	counters		: [],

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

	getCounters : function ()
	{
		this.counters = eval(this.cfgRead('counters'));
		if (typeof this.counters == 'undefined')
		{
			this.counters = [];
		}
	},

	saveCounters : function ()
	{
		this.cfgWrite('counters', uneval(this.counters));
	},

	removeCounter : function (i)
	{
		i = parseInt (i);
		if (typeof this.counters[i] != 'undefined')
		{
			this.counters.splice(i,1);
		}
		this.saveCounters();
		this.redrawCounters();
	},

	clearCounters : function ()
	{
		this.counters = [];
		this.saveCounters();
		this.redrawCounters();
	},

	addCounter : function ()
	{
		var c = { name : '', h : 0, m : 0, s : 0 };
		c.name = $('#ic_timer INPUT[name=cname]').val().trim();
		if (c.name == '') { c.name = 'counter'; }
		
		c.h = parseInt ($('#ic_timer SELECT[name=ch]').val());
		c.m = parseInt ($('#ic_timer SELECT[name=cm]').val());
		c.s = parseInt ($('#ic_timer SELECT[name=cs]').val());

		var d = new Date();
		var timestamp = parseInt (d.getTime());
		timestamp = parseInt (timestamp / 1000)

		var ts = timestamp + c.s + (c.m * 60) + (c.h * 3600);
		var counter = { name : c.name, ts : ts };

		if (this.counters.length == 0)
		{
			this.counters = [];
		}

		this.counters[this.counters.length] = counter;
		this.saveCounters();
		this.redrawCounters();
	},

	displayCounters : function ()
	{
		var html = '';
		var d = new Date();
		var timestamp = parseInt (d.getTime() / 1000);
		for (i in this.counters)
		{
			var seconds = parseInt(this.counters[i].ts) - timestamp;
			html += '<p ' + (seconds < 0 ? 'class="expired"' : '') + '>' + this.counters[i].name + ' : <span class="ic_countdown" id="counter_' + i + '" title="' + seconds + '">' + Ika.secondsToTime(seconds) + '</span> <a class="ic_deleteCounter" title="' + i + '" href="javascript:;">&nbsp;X&nbsp;</a></p>';
		}
		return html;
	},

	redrawCounters : function ()
	{
		$('#ic_timer #theCounters').html(this.displayCounters());
	},

	secondsToTime : function (s)
	{
		s = parseInt(s);
		var hours = (s > 3600) ? Math.floor(s / 3600) : 0;
		s = s - (hours * 3600);
		var minutes = (s > 60) ? Math.floor(s / 60) : 0;
		s = s - (minutes * 60);
		var seconds = s;
		return '' + (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'm ' : '') + seconds + 's';
	},

	// initialize
	init : function(name)
	{
		this.script_name = name;
		this.getServer();
		this.getView();
		this.getCounters();
		this.saveCounters();
	}

};

// execute
Ika.init('Ikariam Counter');

$(document).ready ( function()
{
	var ch = 0, cm = 15, cs = 0;

	var html = '<div id="ic_timer">'
		+ '<h4>' + Ika.script_name + '</h4>'
		+ '<div id="newCounter">'
		+ '<b>Add New Counter</b><br />'
		+ '<input type="text" name="cname" value="counter" size="15" maxlenght="20" onfocus="if(this.value == \'counter\') { this.value=\'\'; }" onblur="if(this.value == \'\') { this.value=\'counter\'; }" /><br />'
		+ '<select name="ch"><optgroup label="H">';

	for (i = 0; i < 24; i++)	{ html += '<option value="' + i +'" ' + (ch == i ? 'selected' : '') + '>' + i + '</option>'; }
	html += '</optgroup></select>';
	html += '<select name="cm"><optgroup label="M">';
	for (i = 0; i < 60; i++)	{ html += '<option value="' + i +'" ' + (cm == i ? 'selected' : '') + '>' + i + '</option>'; }
	html += '</optgroup></select>';
	html += '<select name="cs"><optgroup label="S">';
	for (i = 0; i < 60; i++)	{ html += '<option value="' + i +'" ' + (cs == i ? 'selected' : '') + '>' + i + '</option>'; }
	html += '</optgroup></select>';
	html += '<br /><br /><b><a href="javascript:;" class="button" id="addCounterButton">Add</a></b> <a href="javascript:;" class="newCounterButton button" >Cancel</a><br /><br />';
	html += '</div>';
	html += '<a href="javascript:;" class="newCounterButton" >Add New</a> | <a href="javascript:;" id="clearCounterButton" >Clear All</a>';
	html += '	<div id="theCounters">';
	html += Ika.displayCounters ();
	html += '	</div>';
	html += '</div>';

	$('body').append(html);

	$('#addCounterButton').click(function (evt) { Ika.addCounter (); });
	$('.newCounterButton').click(function (evt) { $('#ic_timer #newCounter').toggle(); });
	$('#clearCounterButton').click(function (evt) {
		if(confirm('Clear all counters?'))
		{
			Ika.clearCounters ();
		}
	});
	$('.ic_deleteCounter').click(function (evt) {
		if(confirm('Remove this counter?'))
		{
			Ika.removeCounter($(this).attr('title'));
		}
	});

	setInterval (function rcd() {
		$('.ic_countdown').each( function(k,v) {
			var s = parseInt($(this).attr('title')) - 1;
			$(this).attr('title', s);
			$(this).text(Ika.secondsToTime(s));
			if (s < 0)
			{
				$(this).parent().addClass('expired');
			}
		});
	}, 1000);

	var html = '<li class="ic_menu" id="bgm_scripts">'
		+ '<a href="javascript:;" title="' + Ika.script_name + '"><img src="/skin/resources/icon_time.gif" align="absmiddle" border="0" alt="script" /></a>'
		+ '<ul>'
		+ '	<li><a href="javascript:;" id="ic_menu_toggle" title="' + Ika.script_name + '">' + Ika.script_name + '</a></li>'
		+ '</ul>'
		+ '</li>'
	$(html).prependTo('#GF_toolbar UL');
	if (Ika.counters.length == 0)
	{
		GM_addStyle ('#ic_timer { display: none; }' );
	}

	$('#ic_menu_toggle').click( function(evt) { $('#ic_timer').toggle(); } );
});


/* Styles in general view */
var css = ""
	+ "#ic_timer { z-index:99; position: fixed; top:30px; left:10px; min-width:140px; width:auto; background:#fff; border:1px solid #C1E4F8; box-shadow:0 0 10px rgba(0,0,0,0.5); }"
	+ "#ic_timer H4 { font-weight:bold; color:#fff; background:#337CB1; padding:5px; margin:0; margin-bottom:5px; }"
	+ "#ic_timer #newCounter { display:none; padding:5px 0; bottom:5px 0; }"
	+ "#ic_timer SELECT { padding:0; margin:0; }"
	+ "#ic_timer SELECT OPTION { padding:0 0 0 5px; margin:0; }"
	+ "#ic_timer P { padding:2px 0; margin:2px 0; border-bottom:1px solid #a0a0a0; background:#fff; color:#000; display: block; }"
	+ "#ic_timer P.expired { background:#f00; color:#ff0; }"
	+ "#ic_timer .ic_countdown { font-size:14px; font-weight: bold; }"
	+ "#ic_timer .ic_deleteCounter { display:inline-block; float:right; color:#ff0000; }"
	+ "#ic_timer .ic_deleteCounter:hover { background:#ff0000; color:#fff; }"

GM_addStyle (css);

GM_addStyle("#GF_toolbar UL LI { padding:2px; padding-right:5px; border-right:1px solid #79C2ED; }");
GM_addStyle("#GF_toolbar UL LI A { padding:2px; margin:5px; }");
GM_addStyle("#GF_toolbar UL LI UL { display:none; position:absolute; float:none; width:auto; padding-top:5px; margin-left:-75px; z-index:99; text-align:left;}");
GM_addStyle("#GF_toolbar UL LI UL LI { display:block; float:none; padding:5px; color:#666; background:#fff; border:1px solid #a0a0a0; }");
GM_addStyle("#GF_toolbar UL LI UL LI A { color:#000 }");
GM_addStyle("#bgm_scripts:hover UL { display: block; }");

// end of script
