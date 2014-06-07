// coding: utf-8
// ==UserScript==
// @name                איקרים הודעה יותר טובה - דוקטור צחוק
// @version 	        1.3.3
// @author		דוקטור צחוק
// @icon		http://s3.amazonaws.com/uso_ss/icon/76873/large.png

// @description	        מסדר לכם את משלוח וקבל ההודעות בצורה אחרת לגמרי
// @namespace	        messages.ikariam
// @include		http://s*.*.ikariam.*/index.php*
// @exclude		http://support.ikariam.*/*
// @exclude		http://*.ikariam.*/index.php?view=safehouse*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
//-----------------------------
// CHANGELOG
//
// @history 1.3.3 german translation, thanks to Fan_of_Ikariam
// @history 1.3.2 add differenct colors for friends messages
// @history 1.3.1 bug fix: fix normal CR when copy/paste messages
// @history 1.3 options to select/deselect private or circular messages
// @history 1.2 toggle message colors
// @history 1.1 fix for Ikariam v0.4.4
// @history 1.0.2 added option to convert island coordinates to links to the island
// @history 1.0.1 small bug fixes
// @history 1.0.0 some major changes and language options
// @history 0.0.3 bug fix in url replace
// @history 0.0.2 few changes and fixes
// @history 0.0.1 initial version
//
// ==/UserScript==

var languages =
{
	rs:
	{
		'title' 	: 'Пречице',
		'msg' 		: 'Поруке',
		'report' 	: 'Извештаји',
		'ally' 		: 'Савез',
		'circular'	: 'Кружна',
		'members' 	: 'Чланови',
		'chat' 		: 'Chat',
		'typeCT' 			: 'нуди културни споразум',
		'typeCTAccept' 		: 'Прихвати културни споразум',
		'typePrivate' 		: 'Порука',
		'typeDiplomacy' 	: 'Контактирај дипломату',
		'typeDiplomacyBreak': 'Кршење споразума',
		'showAll' 			: 'Прикажи комплетне поруке',
		'showHeaders' 		: 'Прикажи само заглавље поруке',
		'colorMessages' 	: 'Приватне поруке у боји',
		'colorNoMessages' 	: 'Приватне поруке нормалне',
		'msgCircular' 		: 'Кружне поруке',
		'msgPrivate' 		: 'Приватне поруке',
		'msgFriends' 		: 'Поруке пријатеља'
	},
	de: // thanks to Fan_of_Ikariam
	{
	    'title'     : 'Schnellzugriffe',
	    'msg'       : 'Nachrichten',
	    'report'    : 'KB´s',
	    'ally'      : 'Ally-Forum',  
	    'circular'  : 'RM',
	    'members'   : 'Mitgliederliste',
	    'chat'      : 'Chat',
	    'typeCT'            : 'offene KGA Angebote',
	    'typeCTAccept'      : 'Angenommene KGA´s',
	    'typePrivate'       : 'Nachricht',
	    'typeDiplomacy'     : 'Diplomatie',
	    'typeDiplomacyBreak': 'Break treaty',
	    'showAll'           : 'Alle Nachrichten öffnern',
	    'showHeaders'       : 'Nur Betreff anzeigen',
	    'colorMessages'     : 'PN´s in Farbe anzeigen',
	    'colorNoMessages'   : 'PN normal anzeigen',
	    'msgCircular'       : 'Rundmail',
	    'msgPrivate'        : 'Privat',
	    'msgFriends'        : 'Freund'
	},
	en:
	{
		'title' 	: 'Shortcuts',
		'msg' 		: 'Messages',
		'report' 	: 'Reports',
		'ally' 		: 'Ally',
		'circular' 	: 'Circular',
		'members' 	: 'Members',
		'chat' 		: 'Chat',
		'typeCT' 			: 'offers cultural treaty',
		'typeCTAccept' 		: 'Accept cultural treaty',
		'typePrivate' 		: 'Message',
		'typeDiplomacy' 	: 'Diplomacy',
		'typeDiplomacyBreak': 'Break treaty',
		'showAll' 			: 'Show complete messages',
		'showHeaders' 		: 'Show headers only',
		'colorMessages' 	: 'Private messages in color',
		'colorNoMessages' 	: 'Private messages normal',
		'msgCircular' 		: 'Circular',
		'msgPrivate' 		: 'Private',
		'msgFriends' 		: 'Friends'
	},
         il: // תרגום - דוקטור צחוק
	{
		'title' 	: 'קיצורים',
		'msg' 		: 'הודעות',
		'report' 	: 'דוחות',
		'ally' 		: 'ברית',
		'circular' 	: 'הודעת ברית',
		'members' 	: 'חברים',
		'chat' 		: 'צ'אט',
		'typeCT' 		: 'מציע חוזה תרבות',
		'typeCTAccept' 		: 'קיבל חוזה תרבות',
		'typePrivate' 		: 'הודעה פרטית',
		'typeDiplomacy' 	: 'דיפלומטיה',
		'typeDiplomacyBreak'    : 'בטל חוזה',
		'showAll' 		: 'הראה הודעה מלאה',
		'showHeaders' 		: 'הראה כותרות בלבד',
		'colorMessages' 	: 'הודעות פרטיות בצבע',
		'colorNoMessages' 	: 'הודעות פרטיות ללא צבע',
		'msgCircular' 		: 'הודעת ברית',
		'msgPrivate' 		: 'הודעה פרטית',
		'msgFriends' 		: 'הודעה מחברים'
	}
}

Ika = {
	server: '',			// current server
	view : '',			// current view
	position : '',		// current building position
	cityLevel : 0,		// currentu city level
	language : 'en',	// selected language
	lang: '',			// language

	showAllMessages : 0,
	colorMessages : 0,

	emoticons:
	{
		grin 	: 'http://board.rs.ikariam.com/wcf/images/smilies/biggrin.png',
		tongue 	: 'http://board.rs.ikariam.com/wcf/images/smilies/tongue.png',
		kiss 	: 'http://board.rs.ikariam.com/wcf/images/smilies/love.png',
		smile 	: 'http://board.rs.ikariam.com/wcf/images/smilies/smile.png',
		sad 	: 'http://board.rs.ikariam.com/wcf/images/smilies/sad.png',
		wink 	: 'http://board.rs.ikariam.com/wcf/images/smilies/wink.png',
	},

	css :
	{
		'friends' 		: {'background-color': '#ffffbb'},
		'CT' 		 	: {'background-color': '#ffff00'},
		'CTAccept'	 	: {'background-color': '#00ff00'},
		'private' 		: {'background-color': '#ffffff'},
		'diplomacy' 	: {'background-color': '#c0d0e0'},
		'diplomacyBreak': {'background-color': '#ffcccc'}
	},

	friends : [],

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
		$("#colorMessages").text(Ika.lang['colorNoMessages']);

		if (this.colorMessages == 1)
		{
			/* fetch all friends */
			Ika.getFriends ();

			$("#messages TR.entry").each (function () {
				var msgType = $("TD:eq(3)", this).text();
				var sender = $("TD:eq(2)", this).text().trim();

				if ($.inArray(sender, Ika.friends) > -1)			{ $(this).css(Ika.css['friends']); $(this).addClass('msgPvt msgFriends'); }
				else if (msgType == Ika.lang['typeCT'])				{ $(this).css(Ika.css['CT']); $(this).addClass('msgCT'); }
				else if (msgType == Ika.lang['typeCTAccept'])		{ $(this).css(Ika.css['CTAccept']); $(this).addClass('msgCTAccept'); }
				else if (msgType == Ika.lang['typePrivate'])		{ $(this).css(Ika.css['private']); $(this).addClass('msgPvt'); }
				else if (msgType == Ika.lang['typeDiplomacy'])		{ $(this).css(Ika.css['diplomacy']); $(this).addClass('msgDipl'); }
				else if (msgType == Ika.lang['typeDiplomacyBreak'])	{ $(this).css(Ika.css['diplomacyBreak']); $(this).addClass('msgBrk'); }
				else { $(this).addClass('msgAlly'); }
			});

			$("#messages .mfSelect").show();

		}
		else
		{
			$("#messages TR.entry").css('background-color', 'transparent');
			$("#colorMessages").text(Ika.lang['colorMessages']);

			$("#messages .mfSelect").hide();
		}
	},

	addSelectLinks : function ()
	{
		var tr = $("#messages TD.selection").parent().prev();
		$('TD', tr).append (
			"<a id='mfSelectCircular' class='mfSelect' href='javascript:;'>" + this.lang['msgCircular'] + "</a>"
			+ "<a id='mfSelectPrivate' class='mfSelect' href='javascript:;'>" + this.lang['msgPrivate'] + "</a>"
			+ "<a id='mfSelectFriends' class='mfSelect' href='javascript:;'>" + this.lang['msgFriends'] + "</a>"
			);

	},

	selectCircular : function(className)
	{
		$("#messages TR").each ( function () {
			$("TD INPUT[type=checkbox]", this).attr('checked', false);
		});
		$("#messages ." + className).each ( function () {
			$("TD INPUT[type=checkbox]", this).attr('checked', true);
		});
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

		$('<p><a id="showAllMessages">' + t + '</a>' +
			' • <a id="colorMessages">' + t + '</a>' +
			'</p>'
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

	getFriends : function ()
	{
		$("UL.friends LI").each ( function (k,v) {
			var slotnum = parseInt($(".slotnum", this).text());
			var name = $(".name A", this).text();
			if (typeof name != 'undefined' && name != '')
			{
				Ika.friends[slotnum-1] = name;
			}
		});
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
		this.addSelectLinks();
		this.colorPrivateMessages();
	}

};


// execute
Ika.init();

if (Ika.view != 'militaryAdvisorDetailedReportView')
{
	var s = '<div class="dynamic"><h3 class="header">' + Ika.lang['title'] + '</h3><div class="content">';

	s += '<p><a href="/index.php?view=diplomacyAdvisor" title="Inbox">' + Ika.lang['msg'] + '</a>';
	s += ' • <a href="/index.php?view=militaryAdvisorCombatReports" title="Combat reports">' + Ika.lang['report'] + '</a>';
	s += ' • <a href="/index.php?view=diplomacyAdvisorAlly" title="Ally page">' + Ika.lang['ally'] + '</a>';
	if (Ika.allyId > 0)
	{
		s += ' • <a href="/index.php?view=diplomacyAdvisorAlly&listAllyMembers=1" title="List of all members">' + Ika.lang['members'] + '</a>';
		s += ' • <a href="javascript:switchNoteDisplay(\'chatWindow\')" title="Chat">' + Ika.lang['chat'] + '</a>';
		s += ' •  <a href="/index.php?view=sendIKMessage&msgType=51&allyId=' + Ika.allyId + '" title="Message to all">' + Ika.lang['circular'] + '</a>';
	}
	s += '</p></div><div class="footer"></div></div>';

	$(s).insertBefore('#mainview');
}

if (Ika.view == 'diplomacyAdvisor' || Ika.view == 'diplomacyAdvisorOutBox' || Ika.view == 'sendIKMessage')
{
	GM_addStyle("#messages .mfSelect { padding:0 0.5em; border-left:1px solid #a0a0a0; }");
	GM_addStyle("#messages TR.entry.new TD { background:#fff; }");
	GM_addStyle("#notice TEXTAREA.textfield { font-family: Consolas, Courier, Courier New, monospace; font-size:1.15em; letter-spacing:-0.03em; line-height:110%; }");
	GM_addStyle(".msgText DIV { padding:0.5em; font-family: Consolas, Courier, Courier New, monospace; font-size:1.15em; letter-spacing:-0.03em; line-height:110%; }");
	GM_addStyle(".msgText DIV A { color:#ff0000 !important; text-decoration: underline !important; font-family: Consolas, Courier, Courier New, monospace !important;}");
	GM_addStyle(".msgText DIV fieldset { margin:0.5em; margin-left:0; border:1px solid #c0c0c0; padding:0.5em 1em; background:#fff; }");
	GM_addStyle(".msgText DIV .quote { border-left:4px solid #DABA8B; padding-left: 1em; display:block; background:#fff; color:#70490E; }");

	$(".msgText DIV").each (function () {
		var t = $(this).text();
		t = t.replace(/http\:\/\/([a-z0-9\-_:.,\/?#=;&%+]+)/gi, '<a target="_blank" href="http://$1">http://$1</a>');
		t = t.replace(/([^0-9]\s|\[)([0-9]{2})(\:|\s|\-)([0-9]{2})+?/gi, '$1<a target="_blank" href="/index.php?view=worldmap_iso&islandX=$2&islandY=$4">$2$3$4</a>');
		t = t.replace(/\[b\](.+)\[\/b\]+/gi, '<b>$1</b>');
		t = t.replace(/\:D/g,  '<img src="' + Ika.emoticons.grin 	+ '" align="absmiddle" alt=":D" >');
		t = t.replace(/\:P/g,  '<img src="' + Ika.emoticons.tongue 	+ '" align="absmiddle" alt=":P" >');
		t = t.replace(/\:\*/g, '<img src="' + Ika.emoticons.kiss 	+ '" align="absmiddle" alt=":*" >');
		t = t.replace(/\:\)/g, '<img src="' + Ika.emoticons.smile 	+ '" align="absmiddle" alt=":)" >');
		t = t.replace(/\:\(/g, '<img src="' + Ika.emoticons.sad 	+ '" align="absmiddle" alt=":(" >');
		t = t.replace(/\;\)/g, '<img src="' + Ika.emoticons.wink 	+ '" align="absmiddle" alt=";)" >');
		t = t.replace(/\n/gi,  "<br/>\n")
		t = t.replace(/\n\>(.*)/g, '<span class="quote">&gt; $1</span>\n');
		$(this).html(t);
	} );

	$(document).ready ( function()
	{
		$("#showAllMessages").click( function () {	Ika.toggleAllMessages(); }).css('cursor', 'pointer');
		$("#colorMessages").click( function () { Ika.toggleColorMessages(); }).css('cursor', 'pointer');
		$("#mfSelectCircular").click( function () { Ika.selectCircular('msgAlly'); });
		$("#mfSelectPrivate").click( function () { Ika.selectCircular('msgPvt'); });
		$("#mfSelectFriends").click( function () { Ika.selectCircular('msgFriends'); });
	});
}

// end of script