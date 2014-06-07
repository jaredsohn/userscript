// ==UserScript==
// @name		last.fm - weekly charts on user profiles
// @namespace		http://last.fm.weekly.charts/naglfar
// @descriptiom		Adds weekly chart tables on last.fm user profile pages through some dirty and pretty static hacks. Will probably work as long as you visit through last.fm or lastfm.de, can't say anything about other language versions as the last.fm team seems to find it amusing to use different html structures depending on the language.
// @include		http://last.fm/user/*
// @include		http://*.last.fm/user/*
// @include		http://lastfm.de/user/*
// @include		http://*.lastfm.de/user/*
// @include		http://beta.last.fm/user/*
// @include		http://*.lastfm.com.br/user/*
// @include		http://lastfm.com.br/user/*
// @include		http://*.lastfm.com.tr/user/*
// @include		http://lastfm.com.tr/user/*
// @include		http://lastfm.es/user/*
// @include		http://*.lastfm.es/user/*
// @include		https://*.lastfm.fr/user/*
// @include		https://lastfm.fr/user/*
// @include		https://*.lastfm.it/user/*
// @include		https://lastfm.jp/user/*
// @include		https://*.lastfm.jp/user/*
// @include		https://cn.last.fm/user/*
// @include		http://lastfm.pl/user/*
// @include		http://*.lastfm.pl/user/*
// @include		http://lastfm.ru/user/*
// @include		http://*.lastfm.ru/user/*
// @include		http://lastfm.se/user/*
// @include		http://*.lastfm.se/user/*
// @include		http://lastfm.nl/user/*
// @include		http://*.lastfm.nl/user/*
// ==/UserScript==


/*******************************************\
*
*	insert headline
*
*******
*
*	v0.3.6
*		- Seems like something broke recently. last.fm guys
*		  probably changed some html and the horrible piece
*		  of code which filters it fucked up. 
*		  Should be fixed now, but I can't be assed to put in
*		  too much testing effort.
*		  
*
*******
*
*	v0.3.5
*		- Added a configuration dialog, via the 'Settings'
*		  link, pretty much how most other ones on last.fm
*		  work. Through this, it's now possible to configure
*		  which charts will be shown first when loading the
*		  page, as well as how many entries you want to see.
*		  Settings are the same for all user pages, pondering
*		  wether I should make it user-specific or not.
*		  Probably not needed.
*		- Changed the position of the date-switcher for the
*		  better (maybe, at least I like it more, also it needed
*		  to make room for the Settings link)
*		  Decided I probably won't include a full-fledged
*		  date/week-picker as it's probably not needed.
*		- More language variables are needed, too lazy now.
*		- Fixed some bugs no one noticed, hopefully.
*		- Been wondering if I should use version numbers
*		  more carefully so I won't get to 1.0 all of a sudden.
*		  Made this one v0.3.5 for the lulz.
*
***
*
*	v0.3
*		- Added buttons to navigate to previous weekly charts.
*		- probably going to include a real date picker in the next
*		  version, once I figure out how I'd like it to look.
*		- Added some language variables for better localization,
*		  don't know why, most probably been bored.
*		  Translations are not complete and most probably
*		  wrong, as I don't speak most of these languages.
*		  => Translation tools were used.
*		- Cleaned up the code a bit more / i gots objects nows,
*		  yayz! / maybe lost a few comments in the process.
*
***
*
*	v0.2
*		- Added tabs for chosing other weekly charts
*		  (artists, tracks and albums now) which are
*		  fetched on demand.
*		- Added a loading-icon to show while Ajax request
*		  is handled. Yay!
*		- cleaned up code a tiny bit, even added some
*		  comments
*		- it's still ugly though.
*
***
*
*	v0.1 (initial release)
*		- Added weekly chart tables on user profiles,
*		  used filthy ways of accomplishing, but it works.
*		- I'd like to do this over some time, but I don't
*		  really know how right now and don't feel like
*		  thinkging something up.
*		- Maybe gonne add some comments some time
*		  don't feel like it now, though.
*
********************************************
*
*	Made by tutal33t on last.fm, taking all the blame for
*	this ugly piece of code.
*	Feel free to message me for suggestions.
*
\*******************************************/


/***	    localization strings	***/

var str_editPhrase = Array();
str_editPhrase["en"] = "See more/Edit"; str_editPhrase["de"] = "Weitere anzeigen"; str_editPhrase["it"] = "Visualizza tutti"; str_editPhrase["fr"] = "Voir plus"; str_editPhrase["es"] = "Ver más";
str_editPhrase["pt"] = "Ver mais"; str_editPhrase["ru"] = "?????"; str_editPhrase["pl"] = "Zobacz wiecej"; str_editPhrase["jp"] = "?????"; str_editPhrase["cn"] = "????/??";
str_editPhrase["se"] = "Se mer"; str_editPhrase["tr"] = "Daha fazlasi"; 
var str_topArtist = Array();
str_topArtist["en"] = "Top Artists"; str_topArtist["de"] = "Top-Künstler"; str_topArtist["it"] = "Artisti"; str_topArtist["fr"] = "Top Artistes"; str_topArtist["es"] = "Artistas";
str_topArtist["pt"] = "artistas"; str_topArtist["ru"] = "?????? ???????????"; str_topArtist["pl"] = "wykonawców"; str_topArtist["jp"] = "?????????"; str_topArtist["cn"] = "?????";
str_topArtist["se"] = "Toppartister"; str_topArtist["tr"] = "Popüler Sanatçilar";
var str_topTrack = Array();
str_topTrack["en"] = "Top Tracks"; str_topTrack["de"] = "Top-Titel"; str_topTrack["it"] = "Brani"; str_topTrack["fr"] = "Top Titres"; str_topTrack["es"] = "Temas"; str_topTrack["pt"] = "tocadas";
str_topTrack["ru"] = "??????? ??????????"; str_topTrack["pl"] = "utworów"; str_topTrack["jp"] = "??????? "; str_topTrack["cn"] = "????"; str_topTrack["se"] = "Topplåtar"; str_topTrack["tr"] = "Popüler Parçalar";
var str_topAlbum = Array();
str_topAlbum["en"] = "Top Albums"; str_topAlbum["de"] = "Top-Alben"; str_topAlbum["it"] = "Album"; str_topAlbum["fr"] = "Top Albums"; str_topAlbum["es"] = "Álbumes"; str_topAlbum["pt"] = "álbuns";
str_topAlbum["ru"] = "?????? ???????"; str_topAlbum["pl"] = "albumy"; str_topAlbum["jp"] = "???????"; str_topAlbum["cn"] = "??"; str_topAlbum["se"] = "Toppalbum"; str_topAlbum["tr"] = "Popüler Albümler";
var str_next = Array();
str_next["en"] = "next week"; str_next["de"] = "nächste Woche"; str_next["it"] = "prossima settimana"; str_next["fr"] = "semaine prochaine"; str_next["es"] = "próxima semana"; str_next["pt"] = "próxima semana";
str_next["ru"] = "????????? ??????"; str_next["pl"] = "przyszlym tygodniu"; str_next["jp"] = "??"; str_next["cn"] = "??"; str_next["se"] = "nästa vecka"; str_next["tr"] = "next Week";
var str_previous = Array();
str_previous["en"] = "previous week"; str_previous["de"] = "vorherige Woche"; str_previous["it"] = "settimana precedente"; str_previous["fr"] = "semaine précédente"; str_previous["es"] = "semana anterior";
str_previous["pt"] = "semana anterior"; str_previous["ru"] = "?????????? ??????"; str_previous["pl"] = "poprzednim tygodniu"; str_previous["jp"] = "???"; str_previous["cn"] = "???";
str_previous["se"] = "föregående vecka"; str_previous["tr"] = "previous week";
var str_loading = Array();
str_loading["en"] = "Weekly charts are loading..."; str_loading["de"] = "Wöchentliche Charts laden..."; str_loading["it"] = "Weekly charts are loading..."; str_loading["fr"] = "Weekly charts are loading..."; str_loading["es"] = "Weekly charts are loading...";
str_loading["pt"] = "Weekly charts are loading..."; str_loading["ru"] = "Weekly charts are loading..."; str_loading["pl"] = "Weekly charts are loading..."; str_loading["jp"] = "Weekly charts are loading..."; str_loading["cn"] = "Weekly charts are loading...";
str_loading["se"] = "Weekly charts are loading..."; str_loading["tr"] = "Weekly charts are loading...";
var str_settings = Array();
str_settings["en"] = "Settings"; str_settings["de"] = "Einstellungen"; str_settings["it"] = "Impostazioni"; str_settings["fr"] = "Paramètres"; str_settings["es"] = "Configuración";
str_settings["pt"] = "Configurações"; str_settings["ru"] = "?????????"; str_settings["pl"] = "Ustawienia"; str_settings["jp"] = "??"; str_settings["cn"] = "??";
str_settings["se"] = "Inställningar"; str_settings["tr"] = "Settings";

/***	end localization strings	***/


function chartData(chartType) {
	this.chartType = chartType;
    	var container = document.createElement("table");
	container.setAttribute("id", this.chartType+"Weekly");
	container.setAttribute("class", "candyStriped chart");
	container.style.display = "none";
	document.getElementById("weeklyCharts").insertBefore(container,document.getElementById("weeklyOptions"));
	this.chartData = Array();
	this.chartHeader = Array();
}
chartData.prototype.chartType;
chartData.prototype.chartHeader;
chartData.prototype.chartData;
chartData.prototype.sendRequest = function() {
	var url = "/user/"+user+"/charts?charttype=weekly&subtype="+this.chartType + (week == 0 ? "" : "&range=" + week);
	xmlhttp.open("GET", url);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4) {
			activeCharts.saveData(xmlhttp.responseText);
		}
	}
	xmlhttp.send(null)
}
chartData.prototype.loadData = function() {
	activeCharts = this;
	document.getElementById(this.chartType+"WeeklyLink").parentNode.className = "current";
	if (this.chartData[week] == null) {
		document.getElementById("ajaxIcon").style.display = "block";
		this.sendRequest();
	} else this.showData();
}
chartData.prototype.saveData = function(charts) {
	var tmp = "";
	if(charts.indexOf("<h3>") == -1) {
		this.chartHeader[week] = "<span class=\"h2Wrapper\"><a href=\"/user/"+user+"/charts?charttype=weekly&subtype="+this.chartType+"\">"+"No charts for this week."+"</a></span>";
		tmp = "<div style=\"padding: "+(maxCharts*10)+"px 0 "+(maxCharts*10)+"px 0 !important; color: #444 !important; text-align: center; font-size: 1.2em !important;\">No charts for this week.</div>";
	} else {
		var container = document.createElement("table");
		if (week == 0) {maxWeek = week = charts.substr(charts.lastIndexOf(".push(")+7, charts.substring(charts.lastIndexOf(".push(")+7).indexOf("\""))}
		charts = charts.substring(charts.indexOf('<h3>')-4, charts.lastIndexOf("</table>")+8); 	// cropping the important part from the rest (ugly, I know, but it works)
		container.innerHTML = charts;
		var i2 = 0;
		for (var i = 0; i < container.childNodes[3].childNodes.length; i++) {		// showing as many entries as available
			if (container.childNodes[3].childNodes[i].nodeType != 3 && i2 < maxCharts) {	 // stop after 10, though
				if (i % 2) tmp += "<tr>" + container.childNodes[3].childNodes[i].innerHTML + "</tr>";
				else tmp += "<tr class=\"odd\">" + container.childNodes[3].childNodes[i].innerHTML + "</tr>";
				i2++;
			}
		}
		this.chartHeader[week] = "<span class=\"h2Wrapper\"><a href=\"/user/"+user+"/charts?charttype=weekly&subtype="+this.chartType+"\">"+container.childNodes[1].innerHTML+"</a></span>";
	}
	this.chartData[week] = tmp;
	document.getElementById("ajaxIcon").style.display = "none";
	this.showData();
}
chartData.prototype.showData = function() {
	document.getElementById(this.chartType+"Weekly").innerHTML = this.chartData[week];
	document.getElementById(this.chartType+"Weekly").style.display = "table";
	document.getElementById("weeklyHeader").innerHTML = this.chartHeader[week];
	document.getElementById("weeklyChartsSeeMore").href = "/user/"+user+"/charts?charttype=weekly&subtype="+activeCharts.chartType;
	buildDatePicker();
}
chartData.prototype.hideData = function() {
	document.getElementById(this.chartType+"WeeklyLink").parentNode.className = "";
	document.getElementById(this.chartType+"Weekly").style.display = "none";
	document.getElementById("weeklyHeader").innerHTML = str_loading[lang];
	document.getElementById("weeklyChartsSeeMore").href = "/user/"+user+"/charts?charttype=weekly";
}

function buildDatePicker() {
	var datePick = document.getElementById("weeklyDatePicker");
	datePick.innerHTML = "<a href=\"javascript:void(0)\">&laquo; "+str_previous[lang]+"</a><a> | </a><a href=\"javascript:void(0)\">"+str_next[lang]+" &raquo;</a>";
	if (week == maxWeek) {
		datePick.lastChild.style.display = "none";
		datePick.childNodes[1].style.display = "none";
	}
	if (week == maxWeek - 10) {
		datePick.firstChild.style.display = "none";
		datePick.childNodes[1].style.display = "none";
	}
	datePick.firstChild.addEventListener('click',function(){if (document.getElementById("ajaxIcon").style.display == "none"){week--; activeCharts.hideData(); activeCharts.loadData();}}, false);
	datePick.lastChild.addEventListener('click',function(){if (document.getElementById("ajaxIcon").style.display == "none"){week++; activeCharts.hideData(); activeCharts.loadData();}}, false);
}

function showWeeklySettings() {
	if (document.getElementById("weeklyChartsSettings") == null) {
		var container = document.createElement("div");
		var dialogContent = "<table><tr><td rowspan=\"3\"  style=\"vertical-align: middle !important; padding-right:10px !important;\">Charts to load automatically on page load</td><td style=\"padding:4px 0px 0 9px !important\"><input id=\"fC1\" type=\"radio\" name=\"firstCharts\" value=\"artist\"></td><td>"+str_topArtist[lang]+"</td></tr>"
		dialogContent += "<tr><td style=\"padding:4px 0px 0 9px !important\"><input id=\"fC2\" type=\"radio\" name=\"firstCharts\" value=\"track\"></td><td>"+str_topTrack[lang]+"</td></tr>"
		dialogContent += "<tr><td style=\"padding:4px 0px 0 9px !important\"><input  id=\"fC3\"type=\"radio\" name=\"firstCharts\" value=\"album\"></td><td>"+str_topAlbum[lang]+"</td></tr>";
		dialogContent += "<tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>Number of entries to show</td><td style=\"padding:0px 3px 0px 0px !important;\"><input id=\"mC1\" type=\"text\" name=\"maxCharts\" size=\"1\" style=\"padding-top: 0px !important; padding-bottom: 1px !important;\"></td><td>(0 to 50)</td></tr></table>";
		
		container.setAttribute("class", "dialogBox modulePreferences");
		container.setAttribute("id", "weeklyChartsSettings");
		container.style.position = "fixed";
		container.style.left = "40%";
		container.style.top = "40%";
		
		container.innerHTML = "<a id=\"weeklyChartsSettingsClose\" href=\"javascript:void(0);\" class=\"dialogStatus dialogClose\" />";
		container.innerHTML += "<h3>"+str_settings[lang]+" <small>Weekly Charts</small></h3>";
		container.innerHTML += "<div class=\"dialogContent\">"+dialogContent+"</div><div class=\"dialogButtons\"><input type=\"submit\" id=\"weeklyChartsSettingsCancel\" class=\"button dialogButton dialogCancel\" value=\"Cancel\"><input type=\"submit\" id=\"weeklyChartsSettingsSubmit\" class=\"confirmButton dialogButton dialogConfirm\" value=\"Make it so\"></div>";

		document.getElementById("weeklyCharts").appendChild(container);
		
		var currFirstCharts = GM_getValue("firstCharts", "artist");
		
		if (currFirstCharts == "artist") document.getElementById("fC1").checked = true;
		else if (currFirstCharts == "track") document.getElementById("fC2").checked = true;
		else if (currFirstCharts == "album") document.getElementById("fC3").checked = true;
		
		document.getElementById("mC1").value = GM_getValue("maxCharts", 10);
		
		document.getElementById("weeklyChartsSettingsClose").addEventListener('click',function(){document.getElementById("weeklyCharts").removeChild(document.getElementById("weeklyChartsSettings"));}, false);
		document.getElementById("weeklyChartsSettingsCancel").addEventListener('click',function(){document.getElementById("weeklyCharts").removeChild(document.getElementById("weeklyChartsSettings"));}, false);
		document.getElementById("weeklyChartsSettingsSubmit").addEventListener('click',function(){
			if (document.getElementById("mC1").value.match(/^[0-9]+$/) && document.getElementById("mC1").value != maxCharts) {
				GM_setValue("maxCharts", document.getElementById("mC1").value);
				maxCharts = document.getElementById("mC1").value;
				for (var i = maxWeek; i > 0; i--) {
					weeklyArtist.chartData[i] = null;
					weeklyTrack.chartData[i] = null;
					weeklyAlbum.chartData[i] = null;
				}
				document.getElementById("ajaxIcon").style.margin = (maxCharts*11.3)+"px auto "+(maxCharts*11.4)+"px auto";
			}
			if (document.getElementById("fC1").checked == true) GM_setValue("firstCharts", "artist");
			else if (document.getElementById("fC2").checked == true) GM_setValue("firstCharts", "track");
			else if (document.getElementById("fC3").checked == true)  GM_setValue("firstCharts", "album");
			activeCharts.hideData();
			activeCharts.loadData();
			document.getElementById("weeklyCharts").removeChild(document.getElementById("weeklyChartsSettings"));
		}, false);
	}
}

function firstLoad() {
	if (window.location.hostname.match(/.*last\.fm.*/)) {		// a small check for lastfm.de compatibility
		lang = "en";
		if (document.getElementById("tasteometer") == null) var putHere = 5;
		else var putHere = 9;
	} else {
		if (window.location.hostname.match(/.*lastfm\.de.*/)) lang = "de";
		if (window.location.hostname.match(/.*lastfm\.it.*/)) lang = "it";
		if (window.location.hostname.match(/.*lastfm\.fr.*/)) lang = "fr";
		if (window.location.hostname.match(/.*lastfm\.es.*/)) lang = "es";
		if (window.location.hostname.match(/.*lastfm\.com\.br.*/)) lang = "pt";
		if (window.location.hostname.match(/.*lastfm\.ru.*/)) lang = "ru";
		if (window.location.hostname.match(/.*lastfm\.pl.*/)) lang = "pl";
		if (window.location.hostname.match(/.*lastfm\.jp.*/)) lang = "jp";
		if (window.location.hostname.match(/.*cn\.last.fm.*/)) lang = "cn";
		if (window.location.hostname.match(/.*lastfm\.se.*/)) lang = "se";
		if (window.location.hostname.match(/.*lastfm\.com\.tr.*/)) lang = "tr";
		if (document.getElementById("tasteometer") == null) var putHere = 9;
		else var putHere = 13;
	}
	
	var container = document.createElement("div");	// a basic div container to throw our stuff in
	container.setAttribute("class", "module chart");
	container.setAttribute("id", "weeklyCharts");
	
	var tmp;
	tmp = "<span class=\"moduleButtons\"><a id=\"weeklySettings\" href=\"javascript:void(0)\" class=\"mEdit icon\"><img class=\"settings_icon transparent_png\" height=\"9px\" width=\"9px\" src=\"http://cdn.last.fm/flatness/icons/settings.2.png\"><span>"+str_settings[lang]+"</span></a></span>";
	tmp += "<h2 id=\"weeklyHeader\" class=\"h2Brushed\">"+str_loading[lang]+"</h2>";
	tmp += "<div class=\"horizontalOptions clearit\"><ul><li><a id=\"artistWeeklyLink\" name=\"artist\" href=\"javascript:void(0)\">"+str_topArtist[lang]+"</a></li><li><a  id=\"trackWeeklyLink\" name=\"track\" href=\"javascript:void(0)\">"+str_topTrack[lang]+"</a></li><li><a id=\"albumWeeklyLink\" name=\"album\" href=\"javascript:void(0)\">"+str_topAlbum[lang]+"</a></li></ul></div>";
	tmp += "<span id=\"weeklyOptions\" class=\"moduleOptions\"><a id=\"weeklyChartsSeeMore\" href=\"/user/"+user+"/charts?charttype=weekly\">"+str_editPhrase[lang]+"</a></span>";
	tmp += "<span id=\"weeklyDatePicker\" class=\"horizontalOptions\" style=\"float: left !important; margin-top: -15px !important;\"></span>";
	
	container.innerHTML = tmp;
	document.getElementById("content").childNodes[3].childNodes[1].insertBefore(container, document.getElementById("content").childNodes[3].childNodes[1].childNodes[putHere].nextSibling);
	
	var ajaxIcon = document.createElement("img");
	ajaxIcon.src = "http://cdn.last.fm/flatness/spinner_big.gif";
	ajaxIcon.style.margin = (maxCharts*11.3)+"px auto "+(maxCharts*11.4)+"px auto";
	ajaxIcon.style.display = "block";
	ajaxIcon.id = "ajaxIcon";
	document.getElementById("weeklyCharts").insertBefore(ajaxIcon, document.getElementById("weeklyOptions"));	
	
	document.getElementById("artistWeeklyLink").addEventListener('click',function(){if (document.getElementById("ajaxIcon").style.display == "none"){activeCharts.hideData(); weeklyArtist.loadData();}}, false);		// adding event handlers to our tabs
	document.getElementById("trackWeeklyLink").addEventListener('click',function(){if (document.getElementById("ajaxIcon").style.display == "none"){activeCharts.hideData(); weeklyTrack.loadData();}}, false);
	document.getElementById("albumWeeklyLink").addEventListener('click',function(){if (document.getElementById("ajaxIcon").style.display == "none"){activeCharts.hideData(); weeklyAlbum.loadData();}}, false);
	document.getElementById("weeklySettings").addEventListener('click',function(){showWeeklySettings();}, false);
}



if (window.location.pathname.match(/\/user\/[A-Za-z0-9\_\-]+$/)) {		// checking again if we're on a user profile, since greasemonkey doesn't allow regexp matching
	// some globals following up	
	var xmlhttp = false;
	var user = window.location.pathname.substring(window.location.pathname.substring(0).lastIndexOf("/") + 1);
	var week = 0;
	var maxWeek = 0;
	var maxCharts = GM_getValue("maxCharts", 10);	
	var lang;
	
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		try { xmlhttp = new XMLHttpRequest(); }
		catch (e) { xmlhttp=false; }
	}
	if (!xmlhttp && window.createRequest) {
		try { xmlhttp = window.createRequest(); } 
		catch (e) { xmlhttp=false; }	
	}
		
	firstLoad();		// building some basic structure to work on
	
	var weeklyArtist = new chartData("artist");
	var weeklyTrack = new chartData("track");
	var weeklyAlbum = new chartData("album");
	
	var firstCharts = GM_getValue("firstCharts", "artist");	
	if (firstCharts == "artist") var activeCharts = weeklyArtist;	
	if (firstCharts == "track") var activeCharts = weeklyTrack;	
	if (firstCharts == "album") var activeCharts = weeklyAlbum;	
	
	activeCharts.loadData();
}