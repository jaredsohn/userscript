// coding: utf-8
// ==UserScript==
// @name        Ikariam Üzenet Formázó
// @version 	1.1
// @author		HoaxMalac ( http://userscripts.org/users/165018 )
// @homepage	http://userscripts.org/scripts/show/85798
// @description	Üzenet variáló
// @namespace	messages.ikariam
// @include		http://s*.ikariam.*/index.php*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// ==/UserScript==

var languages =
{
	hu:
	{
		'title' :		'Gyors linkek',
		'msg' : 		'Üzenetek',
		'report' :  	'Jelentések',
		'ally' : 		'Szövetség',
		'circular' : 	'Körüzenet',
		'members' : 	'Taglista',
		'chat' : 		'Chat',
		'typePrivate' : 'Üzenet',
		'typeDiplomacy' : 'Diplomácia',
		'showAll' : 	'Üzenetek kibontása',
		'showHeaders' : 'Fejléc mutatása',
		'colorMessages' : 	'Privát üzenetek szinezve',
		'colorNoMessages' : 'Privát üzenetek normálisan'
	},
	en:
	{
		'title' :		'Shortcuts',
		'msg' :			'Messages',
		'report' :		'Reports',
		'ally' :		'Ally',
		'circular' :	'Circular',
		'members' :		'Members',
		'chat' : 		'Chat',
		'typePrivate' : 'Message',
		'typeDiplomacy' : 'Diplomacy',
		'showAll' : 	'Show complete messages',
		'showHeaders' :	'Show headers only',
		'colorMessages' : 	'Private messages in color',
		'colorNoMessages' : 'Private messages normal'
	}
}

Ika = {
	server: '',			// szerver
	view : '',			// nézet
	position : '',		// pozició
	cityLevel : 0,		// város szint
	language : 'hu',	// nyelv
	lang: '',			// nyelv

	showAllMessages : 0,
	colorMessages : 0,

	// parent container
	parentElement : '#city #container #mainview #locations ',

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

	showMessages : function ()
	{
		if (this.showAllMessages == 1)
		{
			$("TABLE#messages .msgText").parent().show();
			$("TABLE#messages .text").show();
			$("#showAllMessages").text(Ika.lang['showHeaders']);
		}
		else
		{
			$("TABLE#messages .msgText").parent().hide();
			$("TABLE#messages .text").hide();
			$("#showAllMessages").text(Ika.lang['showAll']);
		}
	},

	colorPrivateMessages : function ()
	{
		if (this.colorMessages == 1)
		{
			$("#messages TR.entry").each (function () {
				var msgType = $("TD:eq(3)", this).text();
				if (msgType == Ika.lang['typePrivate'])			{ $(this).css('background-color', '#ffffc0'); }
				else if (msgType == Ika.lang['typeDiplomacy'])	{ $(this).css('background-color', '#c0d0e0') }
				else if (msgType == 'Кршење споразума')			{ $(this).css('background-color', '#ffcccc') }
			});
			$("#colorMessages").text(Ika.lang['colorNoMessages']);
		}
		else
		{
			$("#messages TR.entry").css('background-color', 'transparent');
			$("#colorMessages").text(Ika.lang['colorMessages']);
		}
	},

	toggleAllMessages : function ()
	{
		if (this.showAllMessages == 1)
		{
			this.showAllMessages = 0;
		}
		else
		{
			this.showAllMessages = 1;
		}
		this.cfgWrite ('showAllMessages', this.showAllMessages);

		this.showMessages();
	},

	toggleColorMessages : function ()
	{
		if (this.colorMessages == 1)
		{
			this.colorMessages = 0;
		}
		else
		{
			this.colorMessages = 1;
		}
		this.cfgWrite ('colorMessages', this.colorMessages);

		this.colorPrivateMessages();
	},

	appendShowAllMessages : function()
	{
		var t = (this.showAllMessages == 1) ? Ika.lang['showHeaders'] : Ika.lang['showAll'];
		var t = (this.colorMessages == 1)   ? Ika.lang['colorMessages'] : Ika.lang['colorNoMessages'];
		
		$('<center><p><a id="showAllMessages">' + t + '</a>' +
			' • <a id="colorMessages">' + t + '</a>' +
			'</p></center>'
		).insertBefore('.contentBox01 TABLE');
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
	},

	// initialize
	init : function()
	{
		this.getServer();
		this.getView();
		this.getAllyId ();
		this.showAllMessages = this.cfgRead ('showAllMessages', 0);
		this.colorMessages = this.cfgRead ('colorMessages', 0);
		this.appendShowAllMessages ();
		this.showMessages();
		this.colorPrivateMessages();
	}

};


// execute
Ika.init();

if (Ika.view != 'militaryAdvisorDetailedReportView')
{
	var s = '<div class="dynamic"><h3 class="header">' + Ika.lang['title'] + '</h3><div class="content">';

	s += '<center><p><a href="/index.php?view=diplomacyAdvisor" title="Bejövő Üzenetek">' + Ika.lang['msg'] + '</a>';
	s += ' • <a href="/index.php?view=militaryAdvisorCombatReports" title="Csata Jelentések">' + Ika.lang['report'] + '</a>';
	s += ' •  <a href="/index.php?view=diplomacyAdvisorAlly" title="Szövetség - Fórum">' + Ika.lang['ally'] + '</a></center>';
	if (Ika.allyId > 0)
	{
		s += '<center><a href="/index.php?view=diplomacyAdvisorAlly&listAllyMembers=1" title="Taglista mutatása">' + Ika.lang['members'] + '</a>';
		s += ' •  <a href="javascript:switchNoteDisplay(\'chatWindow\')" title="Chat">' + Ika.lang['chat'] + '</a>';
		s += ' •  <a href="/index.php?view=sendIKMessage&msgType=51&allyId=' + Ika.allyId + '" title="Üzenet a szövetség minden tagjának">' + Ika.lang['circular'] + '</a></center>';
	}
	s += '</p></div><div class="footer"></div></div>';

	$(s).insertBefore('#mainview');
}

if (Ika.view == 'diplomacyAdvisor' || Ika.view == 'diplomacyAdvisorOutBox' || Ika.view == 'sendIKMessage')
{
	GM_addStyle("#messages TR.entry.new TD { background:#fff; }");
	GM_addStyle(".msgText DIV fieldset { margin:0.5em; margin-left:0; border:1px solid #c0c0c0; padding:0.5em 1em; background:#fff; }");
	GM_addStyle(".msgText DIV .quote { border-left:1px solid #a0a0a0; padding-left: 1em; }");

	$(".msgText DIV").each (function () {
		var t = $(this).html();
		t = t.replace(/http\:\/\/([a-z0-9\-_:.,\/?#=;&%+]+)/gi, '<a target="_blank" href="http://$1">http://$1</a>')
		t = t.replace(/([^0-9]\s|\[)([0-9]{2})(\:|\s|\-)([0-9]{2})+?/gi, '$1<a target="_blank" href="/index.php?view=worldmap_iso&islandX=$2&islandY=$4">$2$3$4</a>')
		t = t.replace(/\[b\](.+)\[\/b\]+/gi, '<b>$1</b>')
		$(this).html(t);
	} );

	$(document).ready ( function()
	{
		$("#showAllMessages").click( function () {
			Ika.toggleAllMessages();
		}).css('cursor', 'pointer');
		$("#colorMessages").click( function () {
			Ika.toggleColorMessages();
		}).css('cursor', 'pointer');
	});
}

// end of script