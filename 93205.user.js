// ==UserScript==
// @name           Ogame Redesign: Message button in left menu
// @namespace      userscripts.org
// @version        0.6
// @description    Add message button in left menu
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=search*
// @exclude        http://*.ogame.*/game/index.php?page=logout*
// @exclude        http://*.ogame.*/game/index.php?page=buddies*
// @exclude        http://*.ogame.*/game/index.php?page=notices*
// @exclude        http://*.ogame.*/game/index.php?page=payment*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=traderlayer*
// @exclude        http://*.ogame.*/game/index.php?page=rocketlayer*
// @exclude        http://*.ogame.*/game/index.php?page=searchLayer*
// @exclude        http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude        http://*.ogame.*/game/index.php?page=station*openJumpgate* 
// @exclude        http://*.ogame.*/game/index.php?page=jumpgatelayer*
// ==/UserScript==
(function() 
{
	var theHref = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((theHref.indexOf ("/game/index.php?")                  <  0) ||
	    (theHref.indexOf ("/game/index.php?page=search")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=logout")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=buddies")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=notices")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=payment")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=showmessage")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=traderlayer")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=rocketlayer")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=searchLayer")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=globalTechtree")      > -1) ||
	    (theHref.indexOf ("openJumpgate")      > -1) ||
	    (theHref.indexOf ("/game/index.php?page=jumpgatelayer") > -1))
		return;

	var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
	var $ = unsafe.$;
	if ( !$ ) return;
	
//from Vesselin's OGame Redesign: Planet Menus 
	function firstCap (theString)
	{
		return theString.charAt (0).toUpperCase () + theString.slice (1);
	}

	if(document.getElementById('menuTable'))
	{
		var messTitleWords='Messages';
		var messAlert = document.getElementById ("message_alert_box");
		if (messAlert == null)
			messAlert = document.getElementById ("message_alert_box_default");
		if (messAlert)
		{
			messTitleWords = messAlert.title.replace (/[\d:]+/g, "").replace (/^\s\s*/, "").replace (/\s\s*$/, "").split (/\s+/);
			messTitleWords = firstCap (messTitleWords [messTitleWords.length - 1].replace (/\(.+\)/, ""));
		}
		messTitleWords = messTitleWords.replace(' ', '');
		if(messTitleWords.length == 0) messTitleWords = 'Messages';
			
		var message_num = document.getElementById('message_alert_box');
		var m_num = 0;
		if(message_num) m_num = message_num.children[0].textContent.replace(/\D/g, '');
		var objButton = $('#menuTable li').eq(1).clone(true);
		objButton.find('.menu_icon').html('');
		objButton.find('.menubutton')
			.removeClass('selected')
			.attr('href', 'index.php?page=messages')
			.attr('target', '_self')
			.attr('id','menumessages')
			.find('.textlabel').html(messTitleWords+' : '+m_num);
		//try {objButton.appendTo('#menuTableTools'); } catch(e) {objButton.appendTo('#menuTable');}
		$('ul#menuTable.leftmenu li').first().before(objButton);
		message_num = document.getElementById('menumessages');
		if(m_num > 0)
			message_num.className = "menubutton premiumHighligt";
		if (document.location.href.indexOf('page=messages') > -1) 
			message_num.className = "menubutton selected";
	}
}) ()

