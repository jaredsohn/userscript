// ==UserScript==
// @name		Ikariam Attack Assistant
// @version 	0.2
// @namespace	ikariam.army
// @description	Play youtube on new attack on your city
// @icon		http://img710.imageshack.us/img710/6600/ikariamgeneralicon.png
// @author		bluesman ( http://userscripts.org/users/165018 )
// @include		http://s*.*.ikariam.*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license		GNU GPL v3 http://www.gnu.org/copyleft/gpl.html
//
// @history		0.1	initial version
// ==/UserScript==

var languages =
{
	rs:
	{
		'new_attacks' 			: 'Нови напад',
		'have_attack' 			: 'Иде нови напад на ваш град',
	},
	en:
	{
		'new_attacks' 			: 'New Attack',
		'have_attack' 			: 'You have new attack on your city',
	}
};

Ika = {
	server			: '',		// current server
	view 			: '',		// current view
	position 		: '',		// current building position
	cityLevel 		: 0,		// currentu city level
	language 		: 'en',		// selected language
	lang			: '',		// language strings
	script_name		: 'Ikariam Attack Assistant',
	script_version	: '0.1',
	script_url		: 'http://userscripts.org/scripts/show/114052',

	// parent container
	parentElement	: '#city #container #mainview #locations ',
	allyId 			: 0,

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

	cfgRead : function (key, default_value)
	{
		return GM_getValue (this.server + key, default_value);
	},

	cfgWrite : function (key, value)
	{
		GM_setValue (this.server + key, value);
	},

	// initialize
	init : function(name)
	{
		this.script_name = name;
		this.getServer();
		this.getView();
	}

};

// execute
Ika.init('Attack Assistant');

$(document).ready ( function()
{
	var attacksOnMe = Ika.cfgRead ('attacksOnMe', '');

	if ($('#advisors UL LI#advMilitary A').hasClass ('normalalert') || $('#advisors UL LI#advMilitary A').hasClass ('premiumalert'))
	{
		if (attacksOnMe != '1')
		{
			var ttt = '<div class="contentBox01h">'
				+ '<h3 class="header">' + Ika.lang.new_attacks + '</h3>'
				+ '<div class="content" align="center">'
				+ '	<h1 style="margin:20px 0; padding:0;">' + Ika.lang.have_attack + '</h1>'
				+ '	<iframe width="480" height="390" src="http://www.youtube.com/embed/nK5fKFFqJe4?autoplay=1" frameborder="0" allowfullscreen></iframe>'
				+ '</div></div>';
			$('#mainview').append(ttt);

			Ika.cfgWrite ('attacksOnMe', '1');
		}
	}

	else if ($('#advisors UL LI#advMilitary A').hasClass ('normal') || $('#advisors UL LI#advMilitary A').hasClass ('premium'))
	{
		if (attacksOnMe == '1')
		{
			Ika.cfgWrite ('attacksOnMe', '0');
		}
	}

});

// end of script