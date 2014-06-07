var metadata=<> 
// ==UserScript==
// @name           Ikariam Verlauf Plotter
// @namespace      http://userscripts.org/scripts/show/94172
// @include        http://s*.ikariam.com/*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0e
// @updater:script http://userscripts.org/scripts/source/94172.user.js
// @updater:meta   http://userscripts.org/scripts/source/94172.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

// Lokalisierung
var languages = {
	de: {
		"settings_header": "Ikariam Verlauf Plotter",
		"highscore": "Highscore",
		"diplomacyAdvisor": "Diplomatieberater",
		"options": "Optionen",
		"saved": "Einstellungen erfolgreich gespeichert.",
		"plot": "Graph erstellen",
		"open": " anzeigen",
		"score": "Gesamtpunkte",
		"score_quota": "Gesamtpunkte Soll",
		"building_score_main": "Baumeister",
		"building_score_main_quota": "Baumeister Soll",
		"building_score_secondary": "Gebäudestufen",
		"building_score_secondary_quota": "Gebäudestufen Soll",
		"research_score_main": "Forscher",
		"research_score_main_quota": "Forscher Soll",
		"research_score_secondary": "Forschungslevel",
		"research_score_secondary_quota": "Forschungslevel Soll",
		"army_score_main": "Generäle",
		"army_score_main_quota": "Generäle Soll",
		"trader_score_secondary": "Goldbestand",
		"trader_score_secondary_quota": "Goldbestand Soll",
		"offense": "Offensivpunkte",
		"offense_quota": "Offensivpunkte Soll",
		"defense": "Defensivpunkte",
		"defense_quota": "Defensivpunkte Soll",
		"trade": "Handelshighscore",
		"trade_quota": "Handelshighscore Soll",
		"resources": "Rohstoffe",
		"resources_quota": "Rohstoffe Soll",
		"donations": "Spenden",
		"donations_quota": "Spenden Soll"
	}
};

var colors = {
			"score": "0;0;0",
			"score_quota": "105;105;105",
			"building_score_main": "255;0;255",
			"building_score_main_quota": "139;0;139",
			"building_score_secondary": "153;50;204",
			"building_score_secondary_quota": "104;34;139",
			"research_score_main": "0;0;255",
			"research_score_main_quota": "0;0;139",
			"research_score_secondary": "0;255;255",
			"research_score_secondary_quota": "0;139;139",
			"army_score_main": "255;0;0",
			"army_score_main_quota": "139;0;0",
			"trader_score_secondary": "255;255;0",
			"trader_score_secondary_quota": "139;139;0",
			"offense": "255;69;0",
			"offense_quota": "139;37;0",
			"defense": "192;255;62",
			"defense_quota": "105;139;34",
			"trade": "240;230;140",
			"trade_quota": "139;134;78",
			"resources": "255;140;0",
			"resources_quota": "205;102;0",
			"donations": "0;255;0",
			"donations_quota": "0;139;0"
	}

var lblselect = new Array("score", "building_score_main", "building_score_main_quota", "building_score_secondary", "building_score_secondary_quota", "research_score_main", "research_score_main_quota", "research_score_secondary", "research_score_secondary_quota", "army_score_main", "army_score_main_quota", "trader_score_secondary", "trader_score_secondary_quota", "offense", "offense_quota", "defense", "defense_quota", "trade", "trade_quota", "resources", "resources_quota", "donations", "donations_quota");

var href = document.location.href;
var server = getServer(href);
var lang = getLanguage(href);

// Update-Check
var update = new Updater(metadata,lang);
update.update();

var language = languages[lang];
if(language == null)
	language = languages['de'];

function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

var store = server+"_"+lang;

var linkimg = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAIAAABGj2DjAAAAAXNSR0IArs4c6QAAAAZiS0dEAKwAqwCtMd6kPAAAAAlwSFlzAAAOwgAADsIBFShKgAAAAAd0SU1FB9gGCgEUMaz2nH4AAAH1SURBVCjPjZE/aBMBFMbfe3dpem2aqDXJ0GsUtU1dDK0OaaBEdCgi1c1FHCwiTqVNSqS1CIVkEenin7VxKTqVUlBxaAcHQRykQ6TkDzRVQi4xhLSXXLjcPYcrDjFCf9v74Pse731o6Dp0AhHZMGvb29loRE2lGJGZmXlgeprgPzAzCuQMh31PluyybJqmpZv1Bv0bj0SIeDR22QSXE7vtAiIwWyK1Gcxm06hWgRkR2TAq7z/kYjE1mzUASJIQkYGp7YDy23eZmRl1Z4eZK5ub2WhE/ZFik3tH/L5ItC8QQEC0foBExqGqrK7mnz/Tfv5yhsZPXbteXFtTczkC6Atc8kbm7RMTQjrTTKfR0HUkNA5U5U0yn0g0FMVaSqJoxblGR88sL29Va3fu3dUbGuk6IZFROyi8fLEXj9cVBQmFHgkAuNVCANeVy97Y49qFoS6HAwBQFKi3h1qVSuHV6/zKilYqEdHJ8NXz8bjD72fEE+NBeenp57p27uLI3wYAQNxPJArJZLNaJRL6Jyf7FxbE4eFB2Xf46WP3jZve27ek9Y22PohNExDJZjs9NWWfnfta/u3xer7oLfH+g61SuWPd4uDios3jbqYz0sNHciiYWt8AAJSks6Hg92Kxs8fmdg/MzuV2d7/t7ctwLAiYNeahsTE4Nn8AwB/XY9MLd4wAAAAASUVORK5CYII%3D' alt='"+language["plot"]+"'>";
var players = loadArray(GM_getValue(store+'-players',''));
var myId = loadArray(GM_getValue(store+'-playerid',null));
var plot = loadArray(GM_getValue(store+'-plot', "[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]"));
var plot_perc = loadArray(GM_getValue(store+'-plotpercentage', "[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"));
var plot_max = loadArray(GM_getValue(store+'-plotquotamax', "[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"));
var page = getPage(href);

if(page == "highscore") {
	var titel = language[document.getElementsByName('highscoreType')[0].value];
	
	var liste = document.getElementsByTagName('table')[1].getElementsByTagName('tr');
	for(var i=1; i<liste.length; i++) {
		var user = liste[i].getElementsByTagName('td');
		if(user[4].getElementsByTagName('a').length > 0) {
			var id = user[4].getElementsByTagName('a')[0].getAttribute('href').replace(/\/index\.php\?view=sendIKMessage\&receiverId=(\d+)/,"$1");
			
			if(players[id] != null) {
				if(isOld(players[id][titel+"_update"])) {
					if(players[id][titel] == null)
						players[id][titel] = new Object();
					var off = howOld(players[id][titel+"_update"])

					if(off==0) {
						if(players[id][titel][0] == null)
							players[id][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][1] == null)
							players[id][titel][1] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][2] == null)
							players[id][titel][2] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][3] == null)
							players[id][titel][3] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][4] == null)
							players[id][titel][4] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][5] == null)
							players[id][titel][5] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][6] == null)
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						else {
							players[id][titel][0] = players[id][titel][1];
							players[id][titel][1] = players[id][titel][2];
							players[id][titel][2] = players[id][titel][3];
							players[id][titel][3] = players[id][titel][4];
							players[id][titel][4] = players[id][titel][5];
							players[id][titel][5] = players[id][titel][6];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==1) {
						if(players[id][titel][0] == null)
							players[id][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][1] == null) {
							players[id][titel][1] = players[id][titel][0];
							players[id][titel][2] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][2] == null) {
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][3] == null) {
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][4] == null) {
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][5] == null) {
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][6] == null) {
							players[id][titel][0] = players[id][titel][1];
							players[id][titel][1] = players[id][titel][2];
							players[id][titel][2] = players[id][titel][3];
							players[id][titel][3] = players[id][titel][4];
							players[id][titel][4] = players[id][titel][5];
							players[id][titel][5] = players[id][titel][5];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[id][titel][0] = players[id][titel][2];
							players[id][titel][1] = players[id][titel][3];
							players[id][titel][2] = players[id][titel][4];
							players[id][titel][3] = players[id][titel][5];
							players[id][titel][4] = players[id][titel][6];
							players[id][titel][5] = players[id][titel][6];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==2) {
						if(players[id][titel][0] == null)
							players[id][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][1] == null) {
							players[id][titel][1] = players[id][titel][0];
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][2] == null) {
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][3] == null) {
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][4] == null) {
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][5] == null) {
							players[id][titel][0] = players[id][titel][2];
							players[id][titel][1] = players[id][titel][3];
							players[id][titel][2] = players[id][titel][4];
							players[id][titel][3] = players[id][titel][4];
							players[id][titel][4] = players[id][titel][4];
							players[id][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][6] == null) {
							players[id][titel][0] = players[id][titel][2];
							players[id][titel][1] = players[id][titel][3];
							players[id][titel][2] = players[id][titel][4];
							players[id][titel][3] = players[id][titel][5];
							players[id][titel][4] = players[id][titel][5];
							players[id][titel][5] = players[id][titel][5];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[id][titel][0] = players[id][titel][3];
							players[id][titel][1] = players[id][titel][4];
							players[id][titel][2] = players[id][titel][5];
							players[id][titel][3] = players[id][titel][6];
							players[id][titel][4] = players[id][titel][6];
							players[id][titel][5] = players[id][titel][6];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==3) {
						if(players[id][titel][0] == null)
							players[id][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][1] == null) {
							players[id][titel][1] = players[id][titel][0];
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][2] == null) {
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][3] == null) {
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][4] == null) {
							players[id][titel][0] = players[id][titel][2];
							players[id][titel][1] = players[id][titel][3];
							players[id][titel][2] = players[id][titel][4];
							players[id][titel][3] = players[id][titel][4];
							players[id][titel][4] = players[id][titel][4];
							players[id][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][5] == null) {
							players[id][titel][0] = players[id][titel][2];
							players[id][titel][1] = players[id][titel][3];
							players[id][titel][2] = players[id][titel][4];
							players[id][titel][3] = players[id][titel][4];
							players[id][titel][4] = players[id][titel][4];
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][6] == null) {
							players[id][titel][0] = players[id][titel][3];
							players[id][titel][1] = players[id][titel][4];
							players[id][titel][2] = players[id][titel][5];
							players[id][titel][3] = players[id][titel][5];
							players[id][titel][4] = players[id][titel][5];
							players[id][titel][5] = players[id][titel][5];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[id][titel][0] = players[id][titel][4];
							players[id][titel][1] = players[id][titel][5];
							players[id][titel][2] = players[id][titel][6];
							players[id][titel][3] = players[id][titel][6];
							players[id][titel][4] = players[id][titel][6];
							players[id][titel][5] = players[id][titel][6];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==4) {
						if(players[id][titel][0] == null)
							players[id][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][1] == null) {
							players[id][titel][1] = players[id][titel][0];
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][2] == null) {
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][3] == null) {
							players[id][titel][0] = players[id][titel][1];
							players[id][titel][1] = players[id][titel][2];
							players[id][titel][2] = players[id][titel][2];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][2];
							players[id][titel][5] = players[id][titel][2];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][4] == null) {
							players[id][titel][0] = players[id][titel][2];
							players[id][titel][1] = players[id][titel][3];
							players[id][titel][2] = players[id][titel][3];
							players[id][titel][3] = players[id][titel][3];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = players[id][titel][3];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][5] == null) {
							players[id][titel][0] = players[id][titel][3];
							players[id][titel][1] = players[id][titel][4];
							players[id][titel][2] = players[id][titel][4];
							players[id][titel][3] = players[id][titel][4];
							players[id][titel][4] = players[id][titel][4];
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][6] == null) {
							players[id][titel][0] = players[id][titel][4];
							players[id][titel][1] = players[id][titel][5];
							players[id][titel][2] = players[id][titel][5];
							players[id][titel][3] = players[id][titel][5];
							players[id][titel][4] = players[id][titel][5];
							players[id][titel][5] = players[id][titel][5];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[id][titel][0] = players[id][titel][5];
							players[id][titel][1] = players[id][titel][6];
							players[id][titel][2] = players[id][titel][6];
							players[id][titel][3] = players[id][titel][6];
							players[id][titel][4] = players[id][titel][6];
							players[id][titel][5] = players[id][titel][6];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off>=5) {
						if(players[id][titel][0] == null)
							players[id][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[id][titel][1] == null) {
							players[id][titel][1] = players[id][titel][0];
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][2] == null) {
							players[id][titel][0] = players[id][titel][1];
							players[id][titel][1] = players[id][titel][1];
							players[id][titel][2] = players[id][titel][1];
							players[id][titel][3] = players[id][titel][1];
							players[id][titel][4] = players[id][titel][1];
							players[id][titel][5] = players[id][titel][1];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][3] == null) {
							players[id][titel][0] = players[id][titel][2];
							players[id][titel][1] = players[id][titel][2];
							players[id][titel][2] = players[id][titel][2];
							players[id][titel][3] = players[id][titel][2];
							players[id][titel][4] = players[id][titel][2];
							players[id][titel][5] = players[id][titel][2];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][4] == null) {
							players[id][titel][0] = players[id][titel][3];
							players[id][titel][1] = players[id][titel][3];
							players[id][titel][2] = players[id][titel][3];
							players[id][titel][3] = players[id][titel][3];
							players[id][titel][4] = players[id][titel][3];
							players[id][titel][5] = players[id][titel][3];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][5] == null) {
							players[id][titel][0] = players[id][titel][4];
							players[id][titel][1] = players[id][titel][4];
							players[id][titel][2] = players[id][titel][4];
							players[id][titel][3] = players[id][titel][4];
							players[id][titel][4] = players[id][titel][4];
							players[id][titel][5] = players[id][titel][4];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[id][titel][6] == null) {
							players[id][titel][0] = players[id][titel][5];
							players[id][titel][1] = players[id][titel][5];
							players[id][titel][2] = players[id][titel][5];
							players[id][titel][3] = players[id][titel][5];
							players[id][titel][4] = players[id][titel][5];
							players[id][titel][5] = players[id][titel][5];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[id][titel][0] = players[id][titel][6];
							players[id][titel][1] = players[id][titel][6];
							players[id][titel][2] = players[id][titel][6];
							players[id][titel][3] = players[id][titel][6];
							players[id][titel][4] = players[id][titel][6];
							players[id][titel][5] = players[id][titel][6];
							players[id][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					players[id][titel+"_update"] = updateTime();
				}
			}
		}
		else {
			if(myId != null) {
				if(isOld(players[myId][titel+"_update"])) {
					if(players[myId][titel] == null)
						players[myId][titel] = new Object();
						
					var off = howOld(players[myId][titel+"_update"])

					if(off==0) {
						if(players[myId][titel][0] == null)
							players[myId][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][1] == null)
							players[myId][titel][1] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][2] == null)
							players[myId][titel][2] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][3] == null)
							players[myId][titel][3] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][4] == null)
							players[myId][titel][4] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][5] == null)
							players[myId][titel][5] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][6] == null)
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						else {
							players[myId][titel][0] = players[myId][titel][1];
							players[myId][titel][1] = players[myId][titel][2];
							players[myId][titel][2] = players[myId][titel][3];
							players[myId][titel][3] = players[myId][titel][4];
							players[myId][titel][4] = players[myId][titel][5];
							players[myId][titel][5] = players[myId][titel][6];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==1) {
						if(players[myId][titel][0] == null)
							players[myId][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][1] == null) {
							players[myId][titel][1] = players[myId][titel][0];
							players[myId][titel][2] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][2] == null) {
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][3] == null) {
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][4] == null) {
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][5] == null) {
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][6] == null) {
							players[myId][titel][0] = players[myId][titel][1];
							players[myId][titel][1] = players[myId][titel][2];
							players[myId][titel][2] = players[myId][titel][3];
							players[myId][titel][3] = players[myId][titel][4];
							players[myId][titel][4] = players[myId][titel][5];
							players[myId][titel][5] = players[myId][titel][5];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][titel][0] = players[myId][titel][2];
							players[myId][titel][1] = players[myId][titel][3];
							players[myId][titel][2] = players[myId][titel][4];
							players[myId][titel][3] = players[myId][titel][5];
							players[myId][titel][4] = players[myId][titel][6];
							players[myId][titel][5] = players[myId][titel][6];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==2) {
						if(players[myId][titel][0] == null)
							players[myId][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][1] == null) {
							players[myId][titel][1] = players[myId][titel][0];
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][2] == null) {
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][3] == null) {
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][4] == null) {
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][5] == null) {
							players[myId][titel][0] = players[myId][titel][2];
							players[myId][titel][1] = players[myId][titel][3];
							players[myId][titel][2] = players[myId][titel][4];
							players[myId][titel][3] = players[myId][titel][4];
							players[myId][titel][4] = players[myId][titel][4];
							players[myId][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][6] == null) {
							players[myId][titel][0] = players[myId][titel][2];
							players[myId][titel][1] = players[myId][titel][3];
							players[myId][titel][2] = players[myId][titel][4];
							players[myId][titel][3] = players[myId][titel][5];
							players[myId][titel][4] = players[myId][titel][5];
							players[myId][titel][5] = players[myId][titel][5];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][titel][0] = players[myId][titel][3];
							players[myId][titel][1] = players[myId][titel][4];
							players[myId][titel][2] = players[myId][titel][5];
							players[myId][titel][3] = players[myId][titel][6];
							players[myId][titel][4] = players[myId][titel][6];
							players[myId][titel][5] = players[myId][titel][6];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==3) {
						if(players[myId][titel][0] == null)
							players[myId][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][1] == null) {
							players[myId][titel][1] = players[myId][titel][0];
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][2] == null) {
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][3] == null) {
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][4] == null) {
							players[myId][titel][0] = players[myId][titel][2];
							players[myId][titel][1] = players[myId][titel][3];
							players[myId][titel][2] = players[myId][titel][4];
							players[myId][titel][3] = players[myId][titel][4];
							players[myId][titel][4] = players[myId][titel][4];
							players[myId][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][5] == null) {
							players[myId][titel][0] = players[myId][titel][2];
							players[myId][titel][1] = players[myId][titel][3];
							players[myId][titel][2] = players[myId][titel][4];
							players[myId][titel][3] = players[myId][titel][4];
							players[myId][titel][4] = players[myId][titel][4];
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][6] == null) {
							players[myId][titel][0] = players[myId][titel][3];
							players[myId][titel][1] = players[myId][titel][4];
							players[myId][titel][2] = players[myId][titel][5];
							players[myId][titel][3] = players[myId][titel][5];
							players[myId][titel][4] = players[myId][titel][5];
							players[myId][titel][5] = players[myId][titel][5];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][titel][0] = players[myId][titel][4];
							players[myId][titel][1] = players[myId][titel][5];
							players[myId][titel][2] = players[myId][titel][6];
							players[myId][titel][3] = players[myId][titel][6];
							players[myId][titel][4] = players[myId][titel][6];
							players[myId][titel][5] = players[myId][titel][6];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off==4) {
						if(players[myId][titel][0] == null)
							players[myId][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][1] == null) {
							players[myId][titel][1] = players[myId][titel][0];
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][2] == null) {
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][3] == null) {
							players[myId][titel][0] = players[myId][titel][1];
							players[myId][titel][1] = players[myId][titel][2];
							players[myId][titel][2] = players[myId][titel][2];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][2];
							players[myId][titel][5] = players[myId][titel][2];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][4] == null) {
							players[myId][titel][0] = players[myId][titel][2];
							players[myId][titel][1] = players[myId][titel][3];
							players[myId][titel][2] = players[myId][titel][3];
							players[myId][titel][3] = players[myId][titel][3];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = players[myId][titel][3];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][5] == null) {
							players[myId][titel][0] = players[myId][titel][3];
							players[myId][titel][1] = players[myId][titel][4];
							players[myId][titel][2] = players[myId][titel][4];
							players[myId][titel][3] = players[myId][titel][4];
							players[myId][titel][4] = players[myId][titel][4];
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][6] == null) {
							players[myId][titel][0] = players[myId][titel][4];
							players[myId][titel][1] = players[myId][titel][5];
							players[myId][titel][2] = players[myId][titel][5];
							players[myId][titel][3] = players[myId][titel][5];
							players[myId][titel][4] = players[myId][titel][5];
							players[myId][titel][5] = players[myId][titel][5];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][titel][0] = players[myId][titel][5];
							players[myId][titel][1] = players[myId][titel][6];
							players[myId][titel][2] = players[myId][titel][6];
							players[myId][titel][3] = players[myId][titel][6];
							players[myId][titel][4] = players[myId][titel][6];
							players[myId][titel][5] = players[myId][titel][6];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}
					if(off>=5) {
						if(players[myId][titel][0] == null)
							players[myId][titel][0] = user[3].innerHTML.replace(/\./g,"");
						else if(players[myId][titel][1] == null) {
							players[myId][titel][1] = players[myId][titel][0];
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][2] == null) {
							players[myId][titel][0] = players[myId][titel][1];
							players[myId][titel][1] = players[myId][titel][1];
							players[myId][titel][2] = players[myId][titel][1];
							players[myId][titel][3] = players[myId][titel][1];
							players[myId][titel][4] = players[myId][titel][1];
							players[myId][titel][5] = players[myId][titel][1];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][3] == null) {
							players[myId][titel][0] = players[myId][titel][2];
							players[myId][titel][1] = players[myId][titel][2];
							players[myId][titel][2] = players[myId][titel][2];
							players[myId][titel][3] = players[myId][titel][2];
							players[myId][titel][4] = players[myId][titel][2];
							players[myId][titel][5] = players[myId][titel][2];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][4] == null) {
							players[myId][titel][0] = players[myId][titel][3];
							players[myId][titel][1] = players[myId][titel][3];
							players[myId][titel][2] = players[myId][titel][3];
							players[myId][titel][3] = players[myId][titel][3];
							players[myId][titel][4] = players[myId][titel][3];
							players[myId][titel][5] = players[myId][titel][3];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][5] == null) {
							players[myId][titel][0] = players[myId][titel][4];
							players[myId][titel][1] = players[myId][titel][4];
							players[myId][titel][2] = players[myId][titel][4];
							players[myId][titel][3] = players[myId][titel][4];
							players[myId][titel][4] = players[myId][titel][4];
							players[myId][titel][5] = players[myId][titel][4];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][titel][6] == null) {
							players[myId][titel][0] = players[myId][titel][5];
							players[myId][titel][1] = players[myId][titel][5];
							players[myId][titel][2] = players[myId][titel][5];
							players[myId][titel][3] = players[myId][titel][5];
							players[myId][titel][4] = players[myId][titel][5];
							players[myId][titel][5] = players[myId][titel][5];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][titel][0] = players[myId][titel][6];
							players[myId][titel][1] = players[myId][titel][6];
							players[myId][titel][2] = players[myId][titel][6];
							players[myId][titel][3] = players[myId][titel][6];
							players[myId][titel][4] = players[myId][titel][6];
							players[myId][titel][5] = players[myId][titel][6];
							players[myId][titel][6] = user[3].innerHTML.replace(/\./g,"");
						}
					}

					players[myId][titel+"_update"] = updateTime();
				}
			}
		}
	}

	GM_setValue(store+'-players',storeArray(players));	
}
else if (page == "diplomacyAdvisorAlly" || page == "embassy") {
	GM_addStyle("#mainview .action div ul{cursor:pointer;z-index:1000;float:right}");
	GM_addStyle("#mainview .action div ul li ul{display:none;position:absolute;background-color:#fae0ae;border:1px solid #e4b873;text-align:left;line-height:18px;margin: -22px 0 0 0;left:600px}");
	GM_addStyle("#mainview .action div ul li:hover ul{display:block}");
	GM_addStyle("#mainview .action div ul li ul li{padding:4px;width:150px}");
	GM_addStyle("#mainview .action div ul li ul li:hover{background-color:#fdf7dd}");
	
	var members = document.getElementById('memberList').getElementsByTagName('tr');
	
	var temp = new Object();

	for(var i=1; i<members.length; i++) {
		var member = members[i].getElementsByTagName('td');
				
		if(member[5].getElementsByTagName('a').length > 0) {	
			var id = member[5].getElementsByTagName('a')[member[5].getElementsByTagName('a').length-1].getAttribute('href').replace(/\?view=sendIKMessage\&receiverId=(\d+)/,"$1");
			temp[id] = id;
			
			if(players[id] == null)
				players[id] = new Object();


			if(isOld(players[id]["Name"+"_update"]) || players[id]["Name"]=="") {
				if(member[1].innerHTML.lastIndexOf("&nbsp;")>=0)
					players[id]["Name"] = member[1].innerHTML.substring(0,member[1].innerHTML.lastIndexOf("&nbsp;"));
				else
					players[id]["Name"] = member[1].innerHTML;
				players[id]["Name"+"_update"] = updateTime();
			}
			
			if(isOld(players[id][language["score"]+"_update"])) {
				if(players[id][language["score"]] == null)
					players[id][language["score"]] = new Object();

				var off = howOld(players[id][language["score"]+"_update"])

				if(off==0) {
					if(players[id][language["score"]][0] == null)
						players[id][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][1] == null)
						players[id][language["score"]][1] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][2] == null)
						players[id][language["score"]][2] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][3] == null)
						players[id][language["score"]][3] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][4] == null)
						players[id][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][5] == null)
						players[id][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][6] == null)
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					else {
						players[id][language["score"]][0] = players[id][language["score"]][1];
						players[id][language["score"]][1] = players[id][language["score"]][2];
						players[id][language["score"]][2] = players[id][language["score"]][3];
						players[id][language["score"]][3] = players[id][language["score"]][4];
						players[id][language["score"]][4] = players[id][language["score"]][5];
						players[id][language["score"]][5] = players[id][language["score"]][6];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
				}
				if(off==1) {
					if(players[id][language["score"]][0] == null)
						players[id][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][1] == null) {
						players[id][language["score"]][1] = players[id][language["score"]][0];
						players[id][language["score"]][2] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][2] == null) {
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][3] == null) {
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][4] == null) {
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][5] == null) {
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][6] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][1];
						players[id][language["score"]][1] = players[id][language["score"]][2];
						players[id][language["score"]][2] = players[id][language["score"]][3];
						players[id][language["score"]][3] = players[id][language["score"]][4];
						players[id][language["score"]][4] = players[id][language["score"]][5];
						players[id][language["score"]][5] = players[id][language["score"]][5];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else {
						players[id][language["score"]][0] = players[id][language["score"]][2];
						players[id][language["score"]][1] = players[id][language["score"]][3];
						players[id][language["score"]][2] = players[id][language["score"]][4];
						players[id][language["score"]][3] = players[id][language["score"]][5];
						players[id][language["score"]][4] = players[id][language["score"]][6];
						players[id][language["score"]][5] = players[id][language["score"]][6];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
				}
				if(off==2) {
					if(players[id][language["score"]][0] == null)
						players[id][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][1] == null) {
						players[id][language["score"]][1] = players[id][language["score"]][0];
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][2] == null) {
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][3] == null) {
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][4] == null) {
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][5] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][2];
						players[id][language["score"]][1] = players[id][language["score"]][3];
						players[id][language["score"]][2] = players[id][language["score"]][4];
						players[id][language["score"]][3] = players[id][language["score"]][4];
						players[id][language["score"]][4] = players[id][language["score"]][4];
						players[id][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][6] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][2];
						players[id][language["score"]][1] = players[id][language["score"]][3];
						players[id][language["score"]][2] = players[id][language["score"]][4];
						players[id][language["score"]][3] = players[id][language["score"]][5];
						players[id][language["score"]][4] = players[id][language["score"]][5];
						players[id][language["score"]][5] = players[id][language["score"]][5];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else {
						players[id][language["score"]][0] = players[id][language["score"]][3];
						players[id][language["score"]][1] = players[id][language["score"]][4];
						players[id][language["score"]][2] = players[id][language["score"]][5];
						players[id][language["score"]][3] = players[id][language["score"]][6];
						players[id][language["score"]][4] = players[id][language["score"]][6];
						players[id][language["score"]][5] = players[id][language["score"]][6];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
				}
				if(off==3) {
					if(players[id][language["score"]][0] == null)
						players[id][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][1] == null) {
						players[id][language["score"]][1] = players[id][language["score"]][0];
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][2] == null) {
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][3] == null) {
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][4] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][2];
						players[id][language["score"]][1] = players[id][language["score"]][3];
						players[id][language["score"]][2] = players[id][language["score"]][4];
						players[id][language["score"]][3] = players[id][language["score"]][4];
						players[id][language["score"]][4] = players[id][language["score"]][4];
						players[id][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][5] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][2];
						players[id][language["score"]][1] = players[id][language["score"]][3];
						players[id][language["score"]][2] = players[id][language["score"]][4];
						players[id][language["score"]][3] = players[id][language["score"]][4];
						players[id][language["score"]][4] = players[id][language["score"]][4];
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][6] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][3];
						players[id][language["score"]][1] = players[id][language["score"]][4];
						players[id][language["score"]][2] = players[id][language["score"]][5];
						players[id][language["score"]][3] = players[id][language["score"]][5];
						players[id][language["score"]][4] = players[id][language["score"]][5];
						players[id][language["score"]][5] = players[id][language["score"]][5];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else {
						players[id][language["score"]][0] = players[id][language["score"]][4];
						players[id][language["score"]][1] = players[id][language["score"]][5];
						players[id][language["score"]][2] = players[id][language["score"]][6];
						players[id][language["score"]][3] = players[id][language["score"]][6];
						players[id][language["score"]][4] = players[id][language["score"]][6];
						players[id][language["score"]][5] = players[id][language["score"]][6];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
				}
				if(off==4) {
					if(players[id][language["score"]][0] == null)
						players[id][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][1] == null) {
						players[id][language["score"]][1] = players[id][language["score"]][0];
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][2] == null) {
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][3] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][1];
						players[id][language["score"]][1] = players[id][language["score"]][2];
						players[id][language["score"]][2] = players[id][language["score"]][2];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][2];
						players[id][language["score"]][5] = players[id][language["score"]][2];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][4] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][2];
						players[id][language["score"]][1] = players[id][language["score"]][3];
						players[id][language["score"]][2] = players[id][language["score"]][3];
						players[id][language["score"]][3] = players[id][language["score"]][3];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = players[id][language["score"]][3];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][5] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][3];
						players[id][language["score"]][1] = players[id][language["score"]][4];
						players[id][language["score"]][2] = players[id][language["score"]][4];
						players[id][language["score"]][3] = players[id][language["score"]][4];
						players[id][language["score"]][4] = players[id][language["score"]][4];
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][6] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][4];
						players[id][language["score"]][1] = players[id][language["score"]][5];
						players[id][language["score"]][2] = players[id][language["score"]][5];
						players[id][language["score"]][3] = players[id][language["score"]][5];
						players[id][language["score"]][4] = players[id][language["score"]][5];
						players[id][language["score"]][5] = players[id][language["score"]][5];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else {
						players[id][language["score"]][0] = players[id][language["score"]][5];
						players[id][language["score"]][1] = players[id][language["score"]][6];
						players[id][language["score"]][2] = players[id][language["score"]][6];
						players[id][language["score"]][3] = players[id][language["score"]][6];
						players[id][language["score"]][4] = players[id][language["score"]][6];
						players[id][language["score"]][5] = players[id][language["score"]][6];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
				}
				if(off>=5) {
					if(players[id][language["score"]][0] == null)
						players[id][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
					else if(players[id][language["score"]][1] == null) {
						players[id][language["score"]][1] = players[id][language["score"]][0];
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][2] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][1];
						players[id][language["score"]][1] = players[id][language["score"]][1];
						players[id][language["score"]][2] = players[id][language["score"]][1];
						players[id][language["score"]][3] = players[id][language["score"]][1];
						players[id][language["score"]][4] = players[id][language["score"]][1];
						players[id][language["score"]][5] = players[id][language["score"]][1];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][3] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][2];
						players[id][language["score"]][1] = players[id][language["score"]][2];
						players[id][language["score"]][2] = players[id][language["score"]][2];
						players[id][language["score"]][3] = players[id][language["score"]][2];
						players[id][language["score"]][4] = players[id][language["score"]][2];
						players[id][language["score"]][5] = players[id][language["score"]][2];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][4] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][3];
						players[id][language["score"]][1] = players[id][language["score"]][3];
						players[id][language["score"]][2] = players[id][language["score"]][3];
						players[id][language["score"]][3] = players[id][language["score"]][3];
						players[id][language["score"]][4] = players[id][language["score"]][3];
						players[id][language["score"]][5] = players[id][language["score"]][3];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][5] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][4];
						players[id][language["score"]][1] = players[id][language["score"]][4];
						players[id][language["score"]][2] = players[id][language["score"]][4];
						players[id][language["score"]][3] = players[id][language["score"]][4];
						players[id][language["score"]][4] = players[id][language["score"]][4];
						players[id][language["score"]][5] = players[id][language["score"]][4];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else if(players[id][language["score"]][6] == null) {
						players[id][language["score"]][0] = players[id][language["score"]][5];
						players[id][language["score"]][1] = players[id][language["score"]][5];
						players[id][language["score"]][2] = players[id][language["score"]][5];
						players[id][language["score"]][3] = players[id][language["score"]][5];
						players[id][language["score"]][4] = players[id][language["score"]][5];
						players[id][language["score"]][5] = players[id][language["score"]][5];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
					else {
						players[id][language["score"]][0] = players[id][language["score"]][6];
						players[id][language["score"]][1] = players[id][language["score"]][6];
						players[id][language["score"]][2] = players[id][language["score"]][6];
						players[id][language["score"]][3] = players[id][language["score"]][6];
						players[id][language["score"]][4] = players[id][language["score"]][6];
						players[id][language["score"]][5] = players[id][language["score"]][6];
						players[id][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
					}
				}
				players[id][language["score"]+"_update"] = updateTime();
			}

			var labels = selectLabels();
			var percents = selectPercentage();
			var max = selectMax();
			var link = "http://karandaras.ka.funpic.de/index.php?titel="+players[id]["Name"]+"&labels="+makeLabels(labels)+"&koords="+makeDays(id,labels)+"&werte="+makeVals(id,labels,percents,max)+"&colors="+makeColors(labels);
			member[5].getElementsByTagName('div')[0].appendChild(createLinks(link, labels, players[id]["Name"]));

			for(var j=0; j<labels.length; j++) {
				if(isQuota(labels[j])) {
					if(players[id][language["score"]+"_update"] == players[id][language[getQuoted(labels[j])]+"_update"]) {
						var m = 6;
						while((players[id][language[getQuoted(labels[j])]][m] == null || players[id][language["score"]][m] == null) && m>=0) {
							m--;
						}

						if(m>=0 && ((max[j] == 0 && Math.round(players[id][language["score"]][m]*percents[j]/100) > players[id][language[getQuoted(labels[j])]][m]) || (max[j] > 0 && Math.min(max[j],Math.round(players[id][language["score"]][m]*percents[j]/100)) > players[id][language[getQuoted(labels[j])]][m])))
							member[1].setAttribute('style','color: #FF0000');
					}
				}
			}
		}
		else {
			if(myId != null) {
				temp[myId] = myId;
				
				if(players[myId] == null)
					players[myId] = new Object();

				if(isOld(players[myId]["Name"+"_update"]) || players[myId]["Name"]=="") {
					if(member[1].innerHTML.lastIndexOf("&nbsp;")>=0)
						players[myId]["Name"] = member[1].innerHTML.substring(0,member[1].innerHTML.lastIndexOf("&nbsp;"));
					else
						players[myId]["Name"] = member[1].innerHTML;
					players[myId]["Name"+"_update"] = updateTime();
				}
					
				if(isOld(players[myId][language["score"]+"_update"])) {
					if(players[myId][language["score"]] == null)
						players[myId][language["score"]] = new Object();

					var off = howOld(players[myId][language["score"]+"_update"])

					if(off==0) {
						if(players[myId][language["score"]][0] == null)
							players[myId][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][1] == null)
							players[myId][language["score"]][1] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][2] == null)
							players[myId][language["score"]][2] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][3] == null)
							players[myId][language["score"]][3] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][4] == null)
							players[myId][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][5] == null)
							players[myId][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][6] == null)
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						else {
							players[myId][language["score"]][0] = players[myId][language["score"]][1];
							players[myId][language["score"]][1] = players[myId][language["score"]][2];
							players[myId][language["score"]][2] = players[myId][language["score"]][3];
							players[myId][language["score"]][3] = players[myId][language["score"]][4];
							players[myId][language["score"]][4] = players[myId][language["score"]][5];
							players[myId][language["score"]][5] = players[myId][language["score"]][6];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
					}
					if(off==1) {
						if(players[myId][language["score"]][0] == null)
							players[myId][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][1] == null) {
							players[myId][language["score"]][1] = players[myId][language["score"]][0];
							players[myId][language["score"]][2] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][2] == null) {
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][3] == null) {
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][4] == null) {
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][5] == null) {
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][6] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][1];
							players[myId][language["score"]][1] = players[myId][language["score"]][2];
							players[myId][language["score"]][2] = players[myId][language["score"]][3];
							players[myId][language["score"]][3] = players[myId][language["score"]][4];
							players[myId][language["score"]][4] = players[myId][language["score"]][5];
							players[myId][language["score"]][5] = players[myId][language["score"]][5];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][language["score"]][0] = players[myId][language["score"]][2];
							players[myId][language["score"]][1] = players[myId][language["score"]][3];
							players[myId][language["score"]][2] = players[myId][language["score"]][4];
							players[myId][language["score"]][3] = players[myId][language["score"]][5];
							players[myId][language["score"]][4] = players[myId][language["score"]][6];
							players[myId][language["score"]][5] = players[myId][language["score"]][6];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
					}
					if(off==2) {
						if(players[myId][language["score"]][0] == null)
							players[myId][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][1] == null) {
							players[myId][language["score"]][1] = players[myId][language["score"]][0];
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][2] == null) {
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][3] == null) {
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][4] == null) {
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][5] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][2];
							players[myId][language["score"]][1] = players[myId][language["score"]][3];
							players[myId][language["score"]][2] = players[myId][language["score"]][4];
							players[myId][language["score"]][3] = players[myId][language["score"]][4];
							players[myId][language["score"]][4] = players[myId][language["score"]][4];
							players[myId][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][6] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][2];
							players[myId][language["score"]][1] = players[myId][language["score"]][3];
							players[myId][language["score"]][2] = players[myId][language["score"]][4];
							players[myId][language["score"]][3] = players[myId][language["score"]][5];
							players[myId][language["score"]][4] = players[myId][language["score"]][5];
							players[myId][language["score"]][5] = players[myId][language["score"]][5];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][language["score"]][0] = players[myId][language["score"]][3];
							players[myId][language["score"]][1] = players[myId][language["score"]][4];
							players[myId][language["score"]][2] = players[myId][language["score"]][5];
							players[myId][language["score"]][3] = players[myId][language["score"]][6];
							players[myId][language["score"]][4] = players[myId][language["score"]][6];
							players[myId][language["score"]][5] = players[myId][language["score"]][6];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
					}
					if(off==3) {
						if(players[myId][language["score"]][0] == null)
							players[myId][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][1] == null) {
							players[myId][language["score"]][1] = players[myId][language["score"]][0];
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][2] == null) {
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][3] == null) {
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][4] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][2];
							players[myId][language["score"]][1] = players[myId][language["score"]][3];
							players[myId][language["score"]][2] = players[myId][language["score"]][4];
							players[myId][language["score"]][3] = players[myId][language["score"]][4];
							players[myId][language["score"]][4] = players[myId][language["score"]][4];
							players[myId][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][5] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][2];
							players[myId][language["score"]][1] = players[myId][language["score"]][3];
							players[myId][language["score"]][2] = players[myId][language["score"]][4];
							players[myId][language["score"]][3] = players[myId][language["score"]][4];
							players[myId][language["score"]][4] = players[myId][language["score"]][4];
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][6] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][3];
							players[myId][language["score"]][1] = players[myId][language["score"]][4];
							players[myId][language["score"]][2] = players[myId][language["score"]][5];
							players[myId][language["score"]][3] = players[myId][language["score"]][5];
							players[myId][language["score"]][4] = players[myId][language["score"]][5];
							players[myId][language["score"]][5] = players[myId][language["score"]][5];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][language["score"]][0] = players[myId][language["score"]][4];
							players[myId][language["score"]][1] = players[myId][language["score"]][5];
							players[myId][language["score"]][2] = players[myId][language["score"]][6];
							players[myId][language["score"]][3] = players[myId][language["score"]][6];
							players[myId][language["score"]][4] = players[myId][language["score"]][6];
							players[myId][language["score"]][5] = players[myId][language["score"]][6];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
					}
					if(off==4) {
						if(players[myId][language["score"]][0] == null)
							players[myId][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][1] == null) {
							players[myId][language["score"]][1] = players[myId][language["score"]][0];
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][2] == null) {
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][3] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][1];
							players[myId][language["score"]][1] = players[myId][language["score"]][2];
							players[myId][language["score"]][2] = players[myId][language["score"]][2];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][2];
							players[myId][language["score"]][5] = players[myId][language["score"]][2];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][4] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][2];
							players[myId][language["score"]][1] = players[myId][language["score"]][3];
							players[myId][language["score"]][2] = players[myId][language["score"]][3];
							players[myId][language["score"]][3] = players[myId][language["score"]][3];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = players[myId][language["score"]][3];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][5] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][3];
							players[myId][language["score"]][1] = players[myId][language["score"]][4];
							players[myId][language["score"]][2] = players[myId][language["score"]][4];
							players[myId][language["score"]][3] = players[myId][language["score"]][4];
							players[myId][language["score"]][4] = players[myId][language["score"]][4];
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][6] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][4];
							players[myId][language["score"]][1] = players[myId][language["score"]][5];
							players[myId][language["score"]][2] = players[myId][language["score"]][5];
							players[myId][language["score"]][3] = players[myId][language["score"]][5];
							players[myId][language["score"]][4] = players[myId][language["score"]][5];
							players[myId][language["score"]][5] = players[myId][language["score"]][5];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][language["score"]][0] = players[myId][language["score"]][5];
							players[myId][language["score"]][1] = players[myId][language["score"]][6];
							players[myId][language["score"]][2] = players[myId][language["score"]][6];
							players[myId][language["score"]][3] = players[myId][language["score"]][6];
							players[myId][language["score"]][4] = players[myId][language["score"]][6];
							players[myId][language["score"]][5] = players[myId][language["score"]][6];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
					}
					if(off>=5) {
						if(players[myId][language["score"]][0] == null)
							players[myId][language["score"]][0] = member[4].innerHTML.replace(/\./g,"");
						else if(players[myId][language["score"]][1] == null) {
							players[myId][language["score"]][1] = players[myId][language["score"]][0];
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][2] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][1];
							players[myId][language["score"]][1] = players[myId][language["score"]][1];
							players[myId][language["score"]][2] = players[myId][language["score"]][1];
							players[myId][language["score"]][3] = players[myId][language["score"]][1];
							players[myId][language["score"]][4] = players[myId][language["score"]][1];
							players[myId][language["score"]][5] = players[myId][language["score"]][1];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][3] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][2];
							players[myId][language["score"]][1] = players[myId][language["score"]][2];
							players[myId][language["score"]][2] = players[myId][language["score"]][2];
							players[myId][language["score"]][3] = players[myId][language["score"]][2];
							players[myId][language["score"]][4] = players[myId][language["score"]][2];
							players[myId][language["score"]][5] = players[myId][language["score"]][2];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][4] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][3];
							players[myId][language["score"]][1] = players[myId][language["score"]][3];
							players[myId][language["score"]][2] = players[myId][language["score"]][3];
							players[myId][language["score"]][3] = players[myId][language["score"]][3];
							players[myId][language["score"]][4] = players[myId][language["score"]][3];
							players[myId][language["score"]][5] = players[myId][language["score"]][3];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][5] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][4];
							players[myId][language["score"]][1] = players[myId][language["score"]][4];
							players[myId][language["score"]][2] = players[myId][language["score"]][4];
							players[myId][language["score"]][3] = players[myId][language["score"]][4];
							players[myId][language["score"]][4] = players[myId][language["score"]][4];
							players[myId][language["score"]][5] = players[myId][language["score"]][4];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else if(players[myId][language["score"]][6] == null) {
							players[myId][language["score"]][0] = players[myId][language["score"]][5];
							players[myId][language["score"]][1] = players[myId][language["score"]][5];
							players[myId][language["score"]][2] = players[myId][language["score"]][5];
							players[myId][language["score"]][3] = players[myId][language["score"]][5];
							players[myId][language["score"]][4] = players[myId][language["score"]][5];
							players[myId][language["score"]][5] = players[myId][language["score"]][5];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
						else {
							players[myId][language["score"]][0] = players[myId][language["score"]][6];
							players[myId][language["score"]][1] = players[myId][language["score"]][6];
							players[myId][language["score"]][2] = players[myId][language["score"]][6];
							players[myId][language["score"]][3] = players[myId][language["score"]][6];
							players[myId][language["score"]][4] = players[myId][language["score"]][6];
							players[myId][language["score"]][5] = players[myId][language["score"]][6];
							players[myId][language["score"]][6] = member[4].innerHTML.replace(/\./g,"");
						}
					}

					players[myId][language["score"]+"_update"] = updateTime();
				}
				
				var plot_a = document.createElement('a');
				var labels = selectLabels();
				var percents = selectPercentage();
				var max = selectMax();
				var link = "http://karandaras.ka.funpic.de/index.php?titel="+players[myId]["Name"]+"&labels="+makeLabels(labels)+"&koords="+makeDays(myId,labels)+"&werte="+makeVals(myId,labels,percents,max)+"&colors="+makeColors(labels);
				member[5].getElementsByTagName('div')[0].appendChild(createLinks(link,labels, players[myId]["Name"]));

				for(var j=0; j<labels.length; j++) {
					if(isQuota(labels[j])) {
						if(players[myId][language["score"]+"_update"] == players[myId][language[getQuoted(labels[j])]+"_update"]) {
							var m = 6;
							while((players[myId][language[getQuoted(labels[j])]][m] == null || players[myId][language["score"]][m] == null) && m>=0) {
								m--;
							}

							if(m>=0 && ((max[j] == 0 && Math.round(players[myId][language["score"]][m]*percents[j]/100) > players[myId][language[getQuoted(labels[j])]][m]) || (max[j] > 0 && Math.min(max[j],Math.round(players[myId][language["score"]][m]*percents[j]/100)) > players[myId][language[getQuoted(labels[j])]][m])))
								member[1].setAttribute('style','color: #FF0000');
						}
					}
				}
			}
		}
		
		
	}

	for(var obj in players) {
		if(temp[obj] != obj) {
			delete players[obj];
		}
	}
	
	GM_setValue(store+'-players',storeArray(players));	
}
else if(page=="options_game" && myId == null) {
	myId = document.getElementById('options_debug').getElementsByTagName('td')[0].innerHTML.replace(/\s/g,"");

	GM_setValue(store+'-playerid',myId);
	
	myOptions();
}
else if(page=="options") {
	myOptions();
}

function myOptions() {
	var div = document.createElement('div');
	div.setAttribute('class', 'contentBox01h');
	div.setAttribute('id', 'plotterOptions');
	
	var check = new Array(23);
	for(var i=0; i<23; i++) {
		if(plot[i])
			check[i] = " checked"
		else
			check[i] = "";
	}
	div.innerHTML  = "<h3 class=header><span class=textLabel>"+language['settings_header']+"</span></h3>";
	div.innerHTML += "<div class=content>";
	div.innerHTML += "<table>"
				+"<tr>"
					+"<th>"+language["score"]+"</th><td><input id=plot_score type=checkbox"+check[0]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["building_score_main"]+"</th><td><input id=plot_building_score_main type=checkbox"+check[1]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["building_score_main_quota"]+"</th><td><input id=plot_building_score_main_quota type=checkbox"+check[2]+"> <input style='width: 50px' class=textfield  id=plot_building_score_main_quota_perc type=text value=\""+plot_perc[2]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_building_score_main_quota_max type=text value=\""+plot_max[2]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["building_score_secondary"]+"</th><td><input id=plot_building_score_secondary type=checkbox"+check[3]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["building_score_secondary_quota"]+"</th><td><input id=plot_building_score_secondary_quota type=checkbox"+check[4]+"> <input style='width: 50px' class=textfield  id=plot_building_score_secondary_quota_perc type=text value=\""+plot_perc[4]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_building_score_secondary_quota_max type=text value=\""+plot_max[4]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["research_score_main"]+"</th><td><input id=plot_research_score_main type=checkbox"+check[5]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["research_score_main_quota"]+"</th><td><input id=plot_research_score_main_quota type=checkbox"+check[6]+"> <input style='width: 50px' class=textfield  id=plot_research_score_main_quota_perc type=text value=\""+plot_perc[6]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_research_score_main_quota_max type=text value=\""+plot_max[6]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["research_score_secondary"]+"</th><td><input id=plot_research_score_secondary type=checkbox"+check[7]+"> </td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["research_score_secondary_quota"]+"</th><td><input id=plot_research_score_secondary_quota type=checkbox"+check[8]+"> <input style='width: 50px' class=textfield  id=plot_research_score_secondary_quota_perc type=text value=\""+plot_perc[8]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_research_score_secondary_quota_max type=text value=\""+plot_max[8]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["army_score_main"]+"</th><td><input id=plot_army_score_main type=checkbox"+check[9]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["army_score_main_quota"]+"</th><td><input id=plot_army_score_main_quota type=checkbox"+check[10]+"> <input style='width: 50px' class=textfield  id=plot_army_score_main_quota_perc type=text value=\""+plot_perc[10]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_army_score_main_quota_max type=text value=\""+plot_max[10]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["trader_score_secondary"]+"</th><td><input id=plot_trader_score_secondary type=checkbox"+check[11]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["trader_score_secondary_quota"]+"</th><td><input id=plot_trader_score_secondary_quota type=checkbox"+check[12]+"> <input style='width: 50px' class=textfield  id=plot_trader_score_secondary_quota_perc type=text value=\""+plot_perc[12]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_trader_score_secondary_quota_max type=text value=\""+plot_max[12]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["offense"]+"</th><td><input id=plot_offense type=checkbox"+check[13]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["offense_quota"]+"</th><td><input id=plot_offense_quota type=checkbox"+check[14]+"> <input style='width: 50px' class=textfield  id=plot_offense_quota_perc type=text value=\""+plot_perc[14]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_offense_quota_max type=text value=\""+plot_max[14]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["defense"]+"</th><td><input id=plot_defense type=checkbox"+check[15]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["defense_quota"]+"</th><td><input id=plot_defense_quota type=checkbox"+check[16]+"> <input style='width: 50px' class=textfield  id=plot_defense_quota_perc type=text value=\""+plot_perc[16]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_defense_quota_max type=text value=\""+plot_max[16]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["trade"]+"</th><td><input id=plot_trade type=checkbox"+check[17]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["trade_quota"]+"</th><td><input id=plot_trade_quota type=checkbox"+check[18]+"> <input style='width: 50px' class=textfield  id=plot_trade_quota_perc type=text value=\""+plot_perc[18]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_trade_quota_max type=text value=\""+plot_max[18]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["resources"]+"</th><td><input id=plot_resources type=checkbox"+check[19]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["resources_quota"]+"</th><td><input id=plot_resources_quota type=checkbox"+check[20]+"> <input style='width: 50px' class=textfield  id=plot_resources_quota_perc type=text value=\""+plot_perc[20]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_resources_quota_max type=text value=\""+plot_max[20]+"\"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["donations"]+"</th><td><input id=plot_donations type=checkbox"+check[21]+"></td>"
				+"</tr>"
				+"<tr>"
					+"<th>"+language["donations_quota"]+"</th><td><input id=plot_donations_quota type=checkbox"+check[22]+"> <input style='width: 50px' class=textfield  id=plot_donations_quota_perc type=text value=\""+plot_perc[22]+"\">%  Maximum:<input style='width: 50px' class=textfield  id=plot_donations_quota_max type=text value=\""+plot_max[22]+"\"></td>"
				+"</tr>"
			+"</table>"
			+"<div class=centerButton>"
			+"<input value=Speichern! id=plotterbutton class=button type=submit>"
			+"</div>"
			+"<div style='text-align: center;' id=plotterreturnbox></div>"
			+"</div>"
			+"<div class=footer>"
			+"</div>";
			
	document.getElementById('mainview').appendChild(div);
	
	document.getElementById('plotterbutton').addEventListener('click', savePlotter, true);
}

function savePlotter() {
	plot[0] = document.getElementById('plot_score').checked;
	plot[1] = document.getElementById('plot_building_score_main').checked;
	plot[2] = document.getElementById('plot_building_score_main_quota').checked;
	plot[3] = document.getElementById('plot_building_score_secondary').checked;
	plot[4] = document.getElementById('plot_building_score_secondary_quota').checked;
	plot[5] = document.getElementById('plot_research_score_main').checked;
	plot[6] = document.getElementById('plot_research_score_main_quota').checked;
	plot[7] = document.getElementById('plot_research_score_secondary').checked;
	plot[8] = document.getElementById('plot_research_score_secondary_quota').checked;
	plot[9] = document.getElementById('plot_army_score_main').checked;
	plot[10] = document.getElementById('plot_army_score_main_quota').checked;
	plot[11] = document.getElementById('plot_trader_score_secondary').checked;
	plot[12] = document.getElementById('plot_trader_score_secondary_quota').checked;
	plot[13] = document.getElementById('plot_offense').checked;
	plot[14] = document.getElementById('plot_offense_quota').checked;
	plot[15] = document.getElementById('plot_defense').checked;
	plot[16] = document.getElementById('plot_defense_quota').checked;
	plot[17] = document.getElementById('plot_trade').checked;
	plot[18] = document.getElementById('plot_trade_quota').checked;
	plot[19] = document.getElementById('plot_resources').checked;
	plot[20] = document.getElementById('plot_resources_quota').checked;
	plot[21] = document.getElementById('plot_donations').checked;
	plot[22] = document.getElementById('plot_donations_quota').checked;


	plot_perc[2] = parseFloat(document.getElementById('plot_building_score_main_quota_perc').value.replace(/,/, "."));
	plot_perc[4] = parseFloat(document.getElementById('plot_building_score_secondary_quota_perc').value.replace(/,/, "."));
	plot_perc[6] = parseFloat(document.getElementById('plot_research_score_main_quota_perc').value.replace(/,/, "."));
	plot_perc[8] = parseFloat(document.getElementById('plot_research_score_secondary_quota_perc').value.replace(/,/, "."));
	plot_perc[10] = parseFloat(document.getElementById('plot_army_score_main_quota_perc').value.replace(/,/, "."));
	plot_perc[12] = parseFloat(document.getElementById('plot_trader_score_secondary_quota_perc').value.replace(/,/, "."));
	plot_perc[14] = parseFloat(document.getElementById('plot_offense_quota_perc').value.replace(/,/, "."));
	plot_perc[16] = parseFloat(document.getElementById('plot_defense_quota_perc').value.replace(/,/, "."));
	plot_perc[18] = parseFloat(document.getElementById('plot_trade_quota_perc').value.replace(/,/, "."));
	plot_perc[20] = parseFloat(document.getElementById('plot_resources_quota_perc').value.replace(/,/, "."));
	plot_perc[22] = parseFloat(document.getElementById('plot_donations_quota_perc').value.replace(/,/, "."));

	plot_max[2] = parseFloat(document.getElementById('plot_building_score_main_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[4] = parseFloat(document.getElementById('plot_building_score_secondary_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[6] = parseFloat(document.getElementById('plot_research_score_main_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[8] = parseFloat(document.getElementById('plot_research_score_secondary_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[10] = parseFloat(document.getElementById('plot_army_score_main_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[12] = parseFloat(document.getElementById('plot_trader_score_secondary_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[14] = parseFloat(document.getElementById('plot_offense_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[16] = parseFloat(document.getElementById('plot_defense_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[18] = parseFloat(document.getElementById('plot_trade_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[20] = parseFloat(document.getElementById('plot_resources_quota_max').value.replace(/\./, "").replace(/,/, "."));
	plot_max[22] = parseFloat(document.getElementById('plot_donations_quota_max').value.replace(/\./, "").replace(/,/, "."));

	for(var i=2; i<23; i+=2) {
		if(isNaN(plot_perc[i]))
			plot_perc[i] = 0;
		if(isNaN(plot_max[i]))
			plot_max[i] = 0;
	}

	GM_setValue(store+'-plot', storeArray(plot));
	GM_setValue(store+'-plotpercentage', storeArray(plot_perc));
	GM_setValue(store+'-plotquotamax', storeArray(plot_max));

	document.getElementById('plotterreturnbox').innerHTML = language['saved'];
	document.getElementById('plotterbutton').blur();
}

function getPage(href) {
	if(href.indexOf("view=diplomacyAdvisorAlly")>=0)
		return "diplomacyAdvisorAlly";
	else if(href.indexOf("view=embassy")>=0)
		return "embassy";
	else if(href.indexOf("view=highscore")>=0)
		return "highscore";
	else if(getPageByContent() == language['highscore'])
		return "highscore";
	else if(getPageByContent() == language['diplomacyAdvisor'] && getTabPosition()==3)
		return "diplomacyAdvisorAlly";
	else if(href.indexOf("view=options&page=game")>=0)
		return "options_game";
	else if(getPageByContent() == "Optionen" && getTabPosition()==1)
		return "options_game";
	else if(getPageByContent() == language['options'])
		return "options";
	else if(href.indexOf("view=options")>=0)
		return "options";
	else
		return "";
}

function getPageByContent() {
	var mainview = document.getElementById('mainview');
	var header = mainview.getElementsByTagName('h1');
	if(header.length < 1)
		return "";
	else 
		return header[0].innerHTML;
}

function getTabPosition() {
	var tabz = document.getElementById('tabz');
	if(tabz != null) {
		if(tabz.getElementsByTagName('td')[0].getAttribute('class') == "selected") return 0;
		else if(tabz.getElementsByTagName('td')[1].getAttribute('class') == "selected") return 1;
		else if(tabz.getElementsByTagName('td')[2].getAttribute('class') == "selected") return 2;
		else if(tabz.getElementsByTagName('td')[3].getAttribute('class') == "selected") return 3;
	}
	else {
		if(document.getElementById('options_debug') != null)
			return 1;
	}
	
	return -1;
}


// Hilfsfunktionen
function storeArray(array) {
	return array.toSource();
}

function loadArray(string) {
	if(string=="")
		return new Object();
	else
		return eval(string);
}

function isOld(update) {
	var d = new Date();
	var jahr = d.getFullYear()+"";
	var monat = d.getMonth()+"";
	var tag = d.getDate()+"";
	
	while(jahr.length<4)
		jahr="0"+jahr;
	while(monat.length<2)
		monat="0"+monat;
	while(tag.length<2)
		tag="0"+tag;
	
	var today = jahr+"/"+monat+"/"+tag;
	
	if(update==null)
		return true;
		
	var d = update.split("/");
	jahr = d[0];
	monat = d[1];
	tag = d[2];
	
	while(jahr.length<4)
		jahr="0"+jahr;
	while(monat.length<2)
		monat="0"+monat;
	while(tag.length<2)
		tag="0"+tag;
	
	update = jahr+"/"+monat+"/"+tag;

	if(today.localeCompare(update) > 0)
		return true;
	else
		return false;
}

function howOld(update) {
	var d = new Date();
	var today = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate();
	
	return getOffset(update, today);
}

function updateTime() {
	var d = new Date();
	var jahr = d.getFullYear()+"";
	var monat = d.getMonth()+"";
	var tag = d.getDate()+"";
	
	while(jahr.length<4)
		jahr="0"+jahr;
	while(monat.length<2)
		monat="0"+monat;
	while(tag.length<2)
		tag="0"+tag;
	
	var today = jahr+"/"+monat+"/"+tag;
	
	return today;
}

function selectLabels() {
	var c=0;
	for(var i=0; i<plot.length; i++) {
		if(plot[i])
			c++;
	}
	
	var out = new Array(c);
	c = 0;
	
	for(var i=0; i<plot.length; i++) {
		if(plot[i]) {
			out[c] = lblselect[i];
			c++
		}
	}
	
	return out;
}

function selectPercentage() {
	var c=0;
	for(var i=0; i<plot.length; i++) {
		if(plot[i])
			c++;
	}
	
	var out = new Array(c);
	c = 0;
	
	for(var i=0; i<plot.length; i++) {
		if(plot[i]) {
			out[c] = plot_perc[i];
			c++
		}
	}
	
	return out;
}

function selectMax() {
	var c=0;
	for(var i=0; i<plot.length; i++) {
		if(plot[i])
			c++;
	}
	
	var out = new Array(c);
	c = 0;
	
	for(var i=0; i<plot.length; i++) {
		if(plot[i]) {
			out[c] = plot_max[i];
			c++;
		}
	}
	
	return out;
}

function makeLabels(labels) {
	var lab = language[labels[0]];
	for(var i=1; i<labels.length; i++)
		lab += ";"+language[labels[i]];
	
	return escape(lab);
}

function makeDays(id, labels) {
	var mostcurrent = "";
	for(var i=0; i<labels.length; i++) {
		if(players[id][labels[i]+"_update"] != null)
			if(mostcurrent=="" || mostcurrent.localeCompare(players[id][labels[i]+"_update"])>0)
				mostcurrent=players[id][labels[i]+"_update"];
	}
	
	var d = new Date();
	if(mostcurrent != "") {
		d.setFullYear(mostcurrent.split("/")[0]);
		d.setMonth(mostcurrent.split("/")[1]);
		d.setDate(mostcurrent.split("/")[2]);
	}
	
	var dates = new Array(7);
	for(var i=6; i>=0; i--) {
		dates[i] = d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear();
		d.setDate(d.getDate()-1);
	}
		
	return escape(dates.join(";"));
}

function makeVals(id, labels, percentage, max) {
	var mostcurrent = "";
	for(var i=0; i<labels.length; i++) {
		if(isQuota(labels[i]))
			if (players[id][language["score"]+"_update"] != null)
				if(mostcurrent=="" || mostcurrent.localeCompare(players[id][language["score"]+"_update"])>0)
					mostcurrent=players[id][language["score"]+"_update"];
		else if (players[id][language[labels[i]]+"_update"] != null)
			if(mostcurrent=="" || mostcurrent.localeCompare(players[id][language[labels[i]]+"_update"])>0)
				mostcurrent=players[id][language[labels[i]]+"_update"];
	}
	
	var offset = new Array(labels.length);
	for(var i=0; i<labels.length; i++) {
		if(isQuota(labels[i]))
			offset[i] = getOffset(players[id][language["score"]+"_update"], mostcurrent);
		else
			offset[i] = getOffset(players[id][language[labels[i]]+"_update"], mostcurrent);
	}

	var output = "";
	
	for(var i=0; i<labels.length; i++) {
		var vals = "";
		if(!isQuota(labels[i])) {
			if(players[id][language[labels[i]]] != null) {
				for(var k=1; k<7; k++) {
					if(players[id][language[labels[i]]][k] == null)
						players[id][language[labels[i]]][k] = players[id][language[labels[i]]][k-1];
				}
				
				
				if(offset[i]<7 && players[id][language[labels[i]]][offset[i]] != null)
					vals=players[id][language[labels[i]]][offset[i]];
				else if(offset[i]>=7 && players[id][language[labels[i]]][6] != null)
					vals=players[id][language[labels[i]]][6];
				else
					vals=0;

				var c = 1;

				for(var j=offset[i]+1; j<7; j++) {
					vals += ";"+players[id][language[labels[i]]][j];
					c++;
				}

				for(var j=c; j<7; j++) {
					if(players[id][language[labels[i]]][6] != null)
						vals += ";"+players[id][language[labels[i]]][6];
					else
						vals += ";0";
				}

				if(output=="")
					output=vals;
				else
					output+= "_"+vals;
			}
			else {
				if(output=="")
					output="0;0;0;0;0;0;0";
				else
					output+= "_0;0;0;0;0;0;0";
			}
		}
		else {
			if(players[id][language["score"]] != null) {
				for(var k=1; k<7; k++) {
					if(players[id][language["score"]][k] == null)
						players[id][language["score"]][k] = players[id][language["score"]][k-1];
				}
				if(max[i]==0) {
					if(offset[i]<7 && players[id][language["score"]][offset[i]] != null)
						vals=Math.round(players[id][language["score"]][offset[i]]*percentage[i]/100);
					else if(offset[i]>=7 && players[id][language["score"]][6] != null)
						vals=Math.round(players[id][language["score"]][6]*percentage[i]/100);
					else
						vals=0;
						

					var c = 1;

					for(var j=offset[i]+1; j<7; j++) {
						vals += ";"+Math.round(players[id][language["score"]][j]*percentage[i]/100);
						c++;
					}

					for(var j=c; j<7; j++) {
						if(players[id][language["score"]][6] != null)
							vals += ";"+Math.round(players[id][language["score"]][6]*percentage[i]/100);
						else
							vals += ";0";
					}
				}
				else {
					if(offset[i]<7 && players[id][language["score"]][offset[i]] != null)
						vals=Math.min(Math.round(players[id][language["score"]][offset[i]]*percentage[i]/100),max[i]);
					else if(offset[i]>=7 && players[id][language["score"]][6] != null)
						vals=Math.min(Math.round(players[id][language["score"]][6]*percentage[i]/100),max[i]);
					else
						vals=0;
						

					var c = 1;

					for(var j=offset[i]+1; j<7; j++) {
						vals += ";"+Math.min(Math.round(players[id][language["score"]][j]*percentage[i]/100),max[i]);
						c++;
					}

					for(var j=c; j<7; j++) {
						if(players[id][language["score"]][6] != null)
							vals += ";"+Math.min(Math.round(players[id][language["score"]][6]*percentage[i]/100),max[i]);
						else
							vals += ";0";
					}
				}

				if(output=="")
					output=vals;
				else
					output+= "_"+vals;
			}
			else {
				if(output=="")
					output="0;0;0;0;0;0;0";
				else
					output+= "_0;0;0;0;0;0;0";
			}
		}
	}
	
	return escape(output);
}

function getOffset(date1, date2) {
	if(date1 == date2)
		return 0;
		
	if(date1 == null)
		return 7;
		
	var d1 = new Date();
	var d2 = new Date();
	
	d1.setFullYear(date1.split("/")[0]);
	d2.setFullYear(date2.split("/")[0]);
	d1.setMonth(date1.split("/")[1]);
	d2.setMonth(date2.split("/")[1]);
	d1.setDate(date1.split("/")[2]);
	d2.setDate(date2.split("/")[2]);
	d1.setMinutes(0);
	d2.setMinutes(0);
	d1.setSeconds(0);
	d2.setSeconds(0);
	
	var DSTAdjust = 0;
	// constants used for our calculations below
	oneMinute = 1000 * 60;
	var oneDay = oneMinute * 60 * 24;
	// take care of spans across Daylight Saving Time changes
	if (d2 > d1) {
		DSTAdjust = (d2.getTimezoneOffset() - d1.getTimezoneOffset()) * oneMinute;
	} else {
		DSTAdjust = (d1.getTimezoneOffset() - d2.getTimezoneOffset()) * oneMinute;    
	}
	var diff = Math.abs(d2.getTime() - d1.getTime()) - DSTAdjust;
	return Math.ceil(diff/oneDay);
}

function makeColors(labels) {
	var col="";
	for(var i=0; i<labels.length; i++) {
		if(col=="")
			col = colors[labels[i]];
		else
			col += "_"+colors[labels[i]];
	}
	
	return escape(col);
}

function isQuota(label) {
	return (label.indexOf("_quota") > 0);
}

function getQuoted(label) {
	return label.substring(0,label.indexOf("_quota"));
}

function createLinks(link, labels, name) {
	var out = document.createElement('ul');
	var li = document.createElement('li');
	li.innerHTML = linkimg;
	var ul = document.createElement('ul');
	var li2 = document.createElement('li');
	li2.innerHTML = "<a href=\""+link+"\" target=plot>"+language["plot"]+"</a>";
	ul.appendChild(li2);

	var lis = new Array();
	for(var i=0; i<labels.length; i++) {
		if(labels[i]!="score" && !isQuota(labels[i])) {
			lis[i] = document.createElement('li');
			lis[i].innerHTML = "<a href=\"index.php?view=highscore&highscoreType="+labels[i]+"&searchUser="+name+"\" target=highscore>"+language[labels[i]]+language["open"]+"</a>";
			ul.appendChild(lis[i]);
		}
	}

	li.appendChild(ul);
	out.appendChild(li);
	return out;
}
