// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Greasemonkey-->Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "KoooraFC", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          KoooraFC
// @namespace     http://www.soccerspeech.com/
// @description   Adds a new button (Favourite Competitions) into the main menu(under "Member services")  to quickly access "Your Favorite" competitions in Kooora.com and Goalzz.com
// @include       http://www.kooora.com/*
// @include       http://kooora.com/*
// @include       http://goalzz.com/*
// @include       http://www.goalzz.com/*
// ==/UserScript==

	var href = window.location.host;
	var linksw, comp, lang;
	if(href == "kooora.com" || href == "www.kooora.com") {
		linksw = "default";
		comp = "http://www.kooora.com/default.aspx?favs=true";
		lang = "مسابقاتك المفضلة";
		tom  = "غدا";
	}
	if(href == "goalzz.com" || href == "www.goalzz.com") {
		linksw = "main";
		comp ="main.aspx?favs=true";
		lang = "Favourite Competitions";
		tom  = "Tomorrow";
	}

	var now = new Date();
	var month = now.getMonth() + 1;
	var day   = now.getDate();
	var year  = now.getFullYear();
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate()+1);
	tomorrow.setMonth(tomorrow.getMonth()+1);
	var cont = '<br /><nobr><img src=i/b1.gif>&nbsp;<a href=\'' + linksw + '.aspx?region=-1&area=-1&dd=' + day + '&mm=' + month + '&yy=' + year + '\'>' + lang + '</a>&nbsp;<img src=i/b1.gif>&nbsp;<a href=\'' + linksw + '.aspx?region=-1&area=-1&dd=' + tomorrow.getDate() + '&mm=' + tomorrow.getMonth() + '&yy=' + tomorrow.getFullYear() + '\'>' + tom + '</a></nobr>';
	var anchorTags = document.getElementsByTagName("a");
	for (var i = 0; i < anchorTags.length; i++) {
		if(anchorTags[i].href == comp) {
			anchorTags[i].parentNode.parentNode.innerHTML += cont;
			break;
		}
	}