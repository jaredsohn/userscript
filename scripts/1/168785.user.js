// ==UserScript==
// @name        Travian 4.2 - Revolution Bot
// @namespace   Travian 4.2 - Revolution Bot
// @description Travian 4.2 - Revolution Bot by Andriy
// @include     http://*.travian.*/*
// @version     0.5
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @require     http://tablesorter.com/__jquery.tablesorter.min.js
// @author      Andriy
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant		GM_deleteValue
// @grant       GM_registerMenuCommand
// @grant	    GM_xmlhttpRequest
// @grant		GM_log
// ==/UserScript==

//ajax.php?cmd=mapPositionData&data[x]=-103&data[y]=11&data[zoomLevel]=1&ajaxToken=
//ajax.php?cmd=viewTileDetails&x=-103&y=11&ajaxToken=

//#region Plugin: sprintf

(function (e) { function r(e) { return Object.prototype.toString.call(e).slice(8, -1).toLowerCase() } function i(e, t) { for (var n = []; t > 0; n[--t] = e); return n.join("") } var t = function () { return t.cache.hasOwnProperty(arguments[0]) || (t.cache[arguments[0]] = t.parse(arguments[0])), t.format.call(null, t.cache[arguments[0]], arguments) }; t.format = function (e, n) { var s = 1, o = e.length, u = "", a, f = [], l, c, h, p, d, v; for (l = 0; l < o; l++) { u = r(e[l]); if (u === "string") f.push(e[l]); else if (u === "array") { h = e[l]; if (h[2]) { a = n[s]; for (c = 0; c < h[2].length; c++) { if (!a.hasOwnProperty(h[2][c])) throw t('[sprintf] property "%s" does not exist', h[2][c]); a = a[h[2][c]] } } else h[1] ? a = n[h[1]] : a = n[s++]; if (/[^s]/.test(h[8]) && r(a) != "number") throw t("[sprintf] expecting number but found %s", r(a)); switch (h[8]) { case "b": a = a.toString(2); break; case "c": a = String.fromCharCode(a); break; case "d": a = parseInt(a, 10); break; case "e": a = h[7] ? a.toExponential(h[7]) : a.toExponential(); break; case "f": a = h[7] ? parseFloat(a).toFixed(h[7]) : parseFloat(a); break; case "o": a = a.toString(8); break; case "s": a = (a = String(a)) && h[7] ? a.substring(0, h[7]) : a; break; case "u": a >>>= 0; break; case "x": a = a.toString(16); break; case "X": a = a.toString(16).toUpperCase() } a = /[def]/.test(h[8]) && h[3] && a >= 0 ? "+" + a : a, d = h[4] ? h[4] == "0" ? "0" : h[4].charAt(1) : " ", v = h[6] - String(a).length, p = h[6] ? i(d, v) : "", f.push(h[5] ? a + p : p + a) } } return f.join("") }, t.cache = {}, t.parse = function (e) { var t = e, n = [], r = [], i = 0; while (t) { if ((n = /^[^\x25]+/.exec(t)) !== null) r.push(n[0]); else if ((n = /^\x25{2}/.exec(t)) !== null) r.push("%"); else { if ((n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)) === null) throw "[sprintf] huh?"; if (n[2]) { i |= 1; var s = [], o = n[2], u = []; if ((u = /^([a-z_][a-z_\d]*)/i.exec(o)) === null) throw "[sprintf] huh?"; s.push(u[1]); while ((o = o.substring(u[0].length)) !== "") if ((u = /^\.([a-z_][a-z_\d]*)/i.exec(o)) !== null) s.push(u[1]); else { if ((u = /^\[(\d+)\]/.exec(o)) === null) throw "[sprintf] huh?"; s.push(u[1]) } n[2] = s } else i |= 2; if (i === 3) throw "[sprintf] mixing positional and named placeholders is not (yet) supported"; r.push(n) } t = t.substring(n[0].length) } return r }; var n = function (e, n, r) { return r = n.slice(0), r.splice(0, 0, e), t.apply(null, r) }; e.sprintf = t, e.vsprintf = n })(typeof exports != "undefined" ? exports : window);

//#endregion Plugin: sprintf

//#region Plugin: assocArraySize

// Get array size. Usage: $.assocArraySize({A:1, B:2})
$.assocArraySize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//#endregion assocArraySize

//#region getUrlVars, getUrlVar

$.extend({
	getUrlVars: function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name) {
		return $.getUrlVars()[name];
	}
});

//#endregion getUrlVars, getUrlVar

var StyleSheet = ["base", "black-tie", "blitzer", "cupertino", "dark-hive", "dot-luv", "eggplant", "excite-bike", "flick", "hot-sneaks", "humanity", "le-frog", "mint-choc", "overcast", "pepper-grinder", "redmond", "smoothness", "south-street", "start", "sunny", "swanky-purse", "trontastic", "ui-darkness", "ui-lightness", "vader"];
GM_addStyle('@import "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/' + StyleSheet[19] + '/jquery-ui.css";');
GM_addStyle(".ui-widget { font-size: 12px; }");
GM_addStyle(".ui-dialog .ui-dialog-buttonpane button, .ui-dialog .ui-dialog-content button { background-color: auto !important; background-image: auto !important; border: 0 solid transparent; cursor: pointer; font-family: Arial,Helvetica,Verdana,sans-serif; font-size: 11px; line-height: 15px; margin-right: 2px; padding: 0; white-space: nowrap; }");
GM_addStyle("button.ui-button, button.ui-button:hover, button.ui-state-disabled:hover, button, button:hover { border: 0 solid transparent; cursor: pointer; font-family: Arial,Helvetica,Verdana,sans-serif; font-size: 11px; line-height: 15px; margin-right: 2px; padding: 0; white-space: nowrap; }");
GM_addStyle(".LoadingAnimation .ui-dialog-titlebar { display: none; }");
GM_addStyle(".ui-widget-content .troop { width: 40px !important; margin: 2px; } .ui-widget-content .troopGroup { float: left; margin-left: 2px; }");
GM_addStyle("legend { font-weight: bold; }");
GM_addStyle(".border thead { font-weight: bold; text-align:center; } .border { border: 1px solid #848484; padding: 1px; } .border td { border: 1px solid #feeebd; padding: 2px; }");
GM_addStyle("table#search_result th { font-weight: bold; } table#search_result td { text-align:center; } table#search_result td a { font-weight: normal; } ");

//#region LanguageMgr

var LanguageMgr = {
	GameLanguage: null,
	Translate: null,
	Init: function() {
	    switch (this.GameLanguage) {
	        //#region IT
			case "it": {
				this.Translate = {
					CropsFinder: "Ricerca Campi",
					OasisFinder: "Ricerca Oasi",
					NaturesFinder: "Ricerca Belve",
					SearchCenterCoords: "Ricerca nel centro delle coordinate",
					X: "X",
					Y: "Y",
					YourVillages: "Tuoi Villaggi:",
					SearchParameters: "Parametri di ricerca",
					SearchZoom: "Zoom di ricerca",
					FieldFilter: "Filtro dei campi",
					BonusFilter: "Filtro del bonus",
					AnimalsFilter: "Filtro delle belve",
					Search: "Cerca",
					SearchInProgress: "Ricerca in corso",
					Analized: "Analizzati",
					Of: "di",
					Fields: "campi",
					SearchCompleted: "Ricerca completata!",
					Coordinates: "Coordinate",
					Distance: "Distanza",
					Type: "Tipo",
					Bonus: "Bonus",
					Nature: "Belve",
					Player: "Giocatore",
					Alliance: "Alleanza",
					Rat: "Topo",
					Spider: "Ragno",
					Snake: "Serpente",
					Bat: "Pipistrello",
					WildBoar: "Cinghiale",
					Wolf: "Lupo",
					Bear: "Orso",
					Crocodile: "Coccodrillo",
					Tiger: "Tigre",
					Elephant: "Elefante",
					Update_PageDoesntExist: "Pagina richiesta non esiste.",
					Update_AvailableNewVersion: "E' disponibile una nuova versione di '%s'. Vuoi aggiornare?",
					Update_TurnOff: "Vuoi disattivare auto aggiornamento per questo script?",
					Update_AutoUpdate: "Auto aggiornamento '%s'.",
					Update_CanBeReEnabled: "Auto aggiornamento per questo script puo' essere riattivato dal menu dei comandi.",
					Update_NoUpdatesAvailable: "Non sono disponibili nuovi aggiornamento per '%s'.",
					Update_TurnOn: "Abilita auto aggiornamento per '%s'.",
					Update_CheckUpdates: "Verifica aggiornamento per '%s'."
				};
				break;
			}
			//#endregion IT
		    //#region EN
			case "en": {
				this.Translate = {
					CropsFinder: "Crops Finder",
					OasisFinder: "Oasis Finder",
					NaturesFinder: "Natures Finder",
					SearchCenterCoords: "Search center coordinates",
					X: "X",
					Y: "Y",
					YourVillages: "Your Villages:",
					SearchParameters: "Search parameters",
					SearchZoom: "Search Zoom",
					FieldFilter: "Field filter",
					BonusFilter: "Bonus filter",
					AnimalsFilter: "Animals filter",
					Search: "Search",
					SearchInProgress: "Search in progress",
					Analized: "Analized",
					Of: "of",
					Fields: "fields",
					SearchCompleted: "Search completed!",
					Coordinates: "Coordinates",
					Distance: "Distance",
					Type: "Type",
					Bonus: "Bonus",
					Nature: "Nature",
					Player: "Player",
					Alliance: "Alliance",
					Rat: "Rat",
					Spider: "Spider",
					Snake: "Snake",
					Bat: "Bat",
					WildBoar: "WildBoar",
					Wolf: "Wolf",
					Bear: "Bear",
					Crocodile: "Crocodile",
					Tiger: "Tiger",
					Elephant: "Elephant",
					Update_PageDoesntExist: "The page you requested doesn't exist.",
					Update_AvailableNewVersion: "A new version of the '%s' user script is available. Do you want to update?",
					Update_TurnOff: "Do you want to turn off auto updating for this script?",
					Update_AutoUpdate: "Auto Update '%s'.",
					Update_CanBeReEnabled: "Automatic updates can be re-enabled for this script from the User Script Commands submenu.",
					Update_NoUpdatesAvailable: "No updates available for '%s'.",
					Update_TurnOn: "Enable '%s' updates.",
					Update_CheckUpdates: "Check '%s' for updates."
				};
				break;
			}
			//#endregion EN
		}
	},
	SetDomain: function(domain) {
		switch (domain) {
			case "it": { this.GameLanguage = "it"; break; }
			default: { this.GameLanguage = "en"; break; }
		}
	}
};

//#endregion LanguageMgr

//#region PositionDetail()
function PositionDetail() {
    this.TerritoryType = ExtraTools.eTerritoryType.None;
    this.Name = null;
    this.X = 0;
    this.Y = 0;
    this.MainVillage = false;
    this.Distribution = ExtraTools.eTerritoryDistribution.None;
    this.CanSendTroop = false;
    this.Tribe = ExtraTools.eTribe.None;
    this.AllyID = 0;
    this.AllyName = null;
    this.PlayerID = 0;
    this.PlayerName = null;
    this.VillageName = null;
    this.VillageX = 0;
    this.VillageY = 0;
    this.VillagePoints = 0;
    this.OasisBonus = ExtraTools.eOasisBonus.None;
    this.Rats = 0;
    this.Spiders = 0;
    this.Snakes = 0;
    this.Bats = 0;
    this.WildBoars = 0;
    this.Wolfs = 0;
    this.Bears = 0;
    this.Crocodiles = 0;
    this.Tigers = 0;
    this.Elephants = 0;
    this.Report1 = null;
    this.Report2 = null;
    this.Report3 = null;
    this.Report4 = null;
    this.Report5 = null;
}
//#endregion PositionDetail()

//#region PositionData()
function PositionData() {
    this.TerritoryType = ExtraTools.eTerritoryType.None;
    this.X = 0;
    this.Y = 0;
    this.Distribution = ExtraTools.eTerritoryDistribution.None;
    this.OasisBonus = ExtraTools.eOasisBonus.None;
    this.PlayerID = 0;
    this.PlayerName = null;
    this.AllyID = 0;
    this.AllyName = null;
    this.VillageName = null;
    this.VillagePoints = 0;
    this.Tribe = ExtraTools.eTribe.None;
    this.LastRaidDate = null;
    this.LastRaidHours = null;
    this.LastRaidResources = null;
    this.LastRaidMaxResources = null;
}
//#endregion PositionData()

//#region ReportData()
function ReportData() {
	this.ReportType = ExtraTools.eReportType.None;
	this.Subject = null;
	this.Time = null;
	this.AttackerUid = 0;
	this.AttackerUname = null;
	this.AttackerVid = 0;
	this.AttackerVname = null;
	this.AttackerSendUnit1 = 0;
	this.AttackerSendUnit2 = 0;
	this.AttackerSendUnit3 = 0;
	this.AttackerSendUnit4 = 0;
	this.AttackerSendUnit5 = 0;
	this.AttackerSendUnit6 = 0;
	this.AttackerSendUnit7 = 0;
	this.AttackerSendUnit8 = 0;
	this.AttackerSendUnit9 = 0;
	this.AttackerSendUnit10 = 0;
	this.AttackerSendUnitHero = 0;
	this.AttackerLostUnit1 = 0;
	this.AttackerLostUnit2 = 0;
	this.AttackerLostUnit3 = 0;
	this.AttackerLostUnit4 = 0;
	this.AttackerLostUnit5 = 0;
	this.AttackerLostUnit6 = 0;
	this.AttackerLostUnit7 = 0;
	this.AttackerLostUnit8 = 0;
	this.AttackerLostUnit9 = 0;
	this.AttackerLostUnit10 = 0;
	this.AttackerLostUnitHero = 0;
	this.AttackerPrisonersUnit1 = 0;
	this.AttackerPrisonersUnit2 = 0;
	this.AttackerPrisonersUnit3 = 0;
	this.AttackerPrisonersUnit4 = 0;
	this.AttackerPrisonersUnit5 = 0;
	this.AttackerPrisonersUnit6 = 0;
	this.AttackerPrisonersUnit7 = 0;
	this.AttackerPrisonersUnit8 = 0;
	this.AttackerPrisonersUnit9 = 0;
	this.AttackerPrisonersUnit10 = 0;
	this.AttackerPrisonersUnitHero = 0;
	this.AttackerGoodsLumber = 0;
	this.AttackerGoodsClay = 0;
	this.AttackerGoodsIron = 0;
	this.AttackerGoodsCrop = 0;
	this.AttackerGoodsCaptured = 0;
	this.AttackerGoodsMax = 0;
	this.DefenderUid = 0;
	this.DefenderUname = null;
	this.DefenderVid = 0;
	this.DefenderVname = null;
	this.DefenderUnit1 = 0;
	this.DefenderUnit2 = 0;
	this.DefenderUnit3 = 0;
	this.DefenderUnit4 = 0;
	this.DefenderUnit5 = 0;
	this.DefenderUnit6 = 0;
	this.DefenderUnit7 = 0;
	this.DefenderUnit8 = 0;
	this.DefenderUnit9 = 0;
	this.DefenderUnit10 = 0;
	this.DefenderUnitHero = 0;
}
//#endregion ReportData()

//#region QueueData()
function QueueData(type, time, d1, d2, d3) {
	this.ActionType = (type != "undefined") ? type : ExtraTools.eProcessActionType.None;
	this.ExecuteTime = (time != "undefined") ? time : 0;
	this.Data1 = (d1 != "undefined") ? d1 : null;
	this.Data2 = (d2 != "undefined") ? d2 : null;
	this.Data3 = (d3 != "undefined") ? d3 : null;
}
//#endregion QueueData()

//#region AutoUpdater
var AutoUpdater = {
	ID: '168785',
	Days: 1,
	Name: "Travian 4.2 - Revolution Bot",
	Version: 0.5,
	Time: new Date().getTime(),
	Call: function(response)
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/' + AutoUpdater.ID + '.meta.js',
			onload: function(xpr)
			{
				AutoUpdater.Compare(xpr, response);
			}
		});
	},
	Compare: function(xpr, response)
	{
		var update = ScriptSettings.LoadJSON("Update");
		var xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		var xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if ((xversion) && (xname[1] == AutoUpdater.Name))
		{
			xversion = xversion[1];
			xname = xname[1];
		}
		else
		{
			if ((xpr.responseText.match(LanguageMgr.Translate.Update_PageDoesntExist)) || (xname[1] != AutoUpdater.Name)) {
				update.Active = false;
				ScriptSettings.SaveJSON("Update", update);
			}
			return false;
		}
		if ((+xversion > +AutoUpdater.Version) && (confirm(sprintf(LanguageMgr.Translate.Update_AvailableNewVersion, xname))))
		{
			update.LastCheck = AutoUpdater.Time;
			top.location.href = 'http://userscripts.org/scripts/source/' + AutoUpdater.ID + '.user.js';
		}
		else if ((xversion) && (+xversion > +AutoUpdater.Version) )
		{
			if (confirm(LanguageMgr.Translate.Update_TurnOff))
			{
				update.Active = false;
				GM_registerMenuCommand(sprintf(LanguageMgr.Translate.Update_AutoUpdate, AutoUpdater.Name), function()
				{
					var update = ScriptSettings.LoadJSON("Update");
					update.LastCheck = new Date().getTime();
					ScriptSettings.SaveJSON("Update", update);
					AutoUpdater.Call(true);
				});
				alert(LanguageMgr.Translate.Update_CanBeReEnabled);
			}
			else
			{
				update.LastCheck = AutoUpdater.Time;
			}
		}
		else
		{
			if (response)
				alert(sprintf(LanguageMgr.Translate.Update_NoUpdatesAvailable, AutoUpdater.Name));
			update.LastCheck = AutoUpdater.Time;
		}
		ScriptSettings.SaveJSON("Update", update);
	},
	Check: function()
	{
		if ($.assocArraySize(ScriptSettings.LoadJSON("Update")) == 0) ScriptSettings.SaveJSON("Update", {Active:true, LastCheck:0});
		var update = ScriptSettings.LoadJSON("Update");
		if (!update.Active)
		{
			GM_registerMenuCommand(sprintf(LanguageMgr.Translate.Update_TurnOn, AutoUpdater.Name), function()
			{
				var update = ScriptSettings.LoadJSON("Update");
				update.Active = true;
				update.LastCheck = new Date().getTime();
				ScriptSettings.SaveJSON("Update", update);
				AutoUpdater.Call(true);
			});
		}
		else
		{
			if (+this.Time > (+update.LastCheck + 1000 * 60 * 60 * 24 * AutoUpdater.Days))
			{
				var update = ScriptSettings.LoadJSON("Update");
				update.LastCheck = AutoUpdater.Time;
				ScriptSettings.SaveJSON("Update", update);
				this.Call();
			}
			GM_registerMenuCommand(sprintf(LanguageMgr.Translate.Update_CheckUpdates, AutoUpdater.Name), function()
			{
				var update = ScriptSettings.LoadJSON("Update");
				update.LastCheck = new Date().getTime();
				ScriptSettings.SaveJSON("Update", update);
				AutoUpdater.Call(true);
			});
		}
	}
};
//#endregion AutoUpdater

var Main = {
    Defaults: {
        ScriptSpeed: 0.1,
		LogLevel: 3,	// 1=Error, 2=Warning, 3=Debug
		Page: document.location.href.split("/")[3].split("?")[0],
		Villages: [],
        ActiveVillage: {},
        GameVersion: 0,
		FirstDomain: "",
        AjaxToken: null,
		Queue: [],
		AllyReports: [],
    },
    GetDistance: function (x1, y1, x2, y2) {
        return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    },
	Log: function(msg, level) {
		if (level <= Main.Defaults.LogLevel)
			GM_log(msg);
	},
	ClearQueue: function(menu) {
		if (menu)
		{
			GM_registerMenuCommand("Clear Queue List", function()
			{
				Main.Defaults.Queue = [];
				ScriptSettings.SaveJSON("Queue", Main.Defaults.Queue);
				alert("Queue List cleared!");
			});
		} else {
			Main.Defaults.Queue = [];
			ScriptSettings.SaveJSON("Queue", Main.Defaults.Queue);	
		}
	},
	ExeQueue: function () {
        if (Main.Defaults.Queue.length == 0) return;
		var exeQueue = Main.Defaults.Queue.shift();
		if (exeQueue == "undefined") return;
		Main.Log("'ExeQueue'. Data=" + exeQueue.toSource(), 3);
        ScriptSettings.SaveJSON("Queue", Main.Defaults.Queue);
        switch (exeQueue.ActionType) {
        case ExtraTools.eProcessActionType.GetAllyAttacks:
            {
				Main.Log("'ExeQueue': GetAllyAttacks", 3);
                GM_xmlhttpRequest({
					method: 'GET',
					url: "http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.ALLY + "?s=3&f=31&fn=0",
					onload: function (xpr) {
						$("table#offs tbody tr", xpr.responseText).each(function (index) {
						    if ($(this).find("td.sub a img").attr("class").substr(8) == "iReport1") {
						        var href = $(this).find("td.sub a:eq(1)").attr("href").substr(16);
								var id = null;
								var aid = null;
								if (href.indexOf("&aid=") == -1) {
									id = href
								} else {
									id = href.substr(0, href.indexOf("&"));
									aid = href.substr(href.lastIndexOf("=") + 1);
								}
								Main.Defaults.Queue.filter(function(Queue) {
									alert(Queue.toSource() + "/r/n" + id);
									return (Queue.ActionType == ExtraTools.eProcessActionType.GetReport) && (Queue.Data1 == id)
								});
								if ((Main.Defaults.Queue.filter(function(Queue) { alert(Queue.toSource() + "/r/n" + id); return (Queue.ActionType == ExtraTools.eProcessActionType.GetReport) && (Queue.Data1 == id) }).length == 0) && (!$.inArray(id, Main.Defaults.AllyReports)))
								{
									Main.Log("'ExeQueue': GetAllyAttacks. Added new Queue.", 3);
									Main.Defaults.Queue.push(new QueueData(ExtraTools.eProcessActionType.GetReport, new Date().getTime() + 1000 * 60 * 60, id, aid));
								}
							}
						});
						Main.Defaults.Queue.sort(function (a, b) { return a.ExecuteTime - b.ExecuteTime; });
						Main.Log("'ExeQueue': GetAllyAttacks. Length=" + Main.Defaults.Queue.length, 3);
						ScriptSettings.SaveJSON("Queue", Main.Defaults.Queue);
					}
				});
                break;
            }
        case ExtraTools.eProcessActionType.GetReport:
            {
				Main.Log("'ExeQueue': GetReport", 3);
                GM_xmlhttpRequest({
					method: 'GET',
					url: "http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.REPORT + "",
					onload: function (xpr) {
						Main.Log("'ExeQueue': GetReport. Page Loaded!", 3);
						var report = ExtraTools.ParseReport();
						GM_log(report.toSource());
					}
				});
                break;
            }
        }
    },
    Run: function () {
		Main.Log("Start Execution.", 3);
        ExtraTools.GetGameVersion();
		Main.Log("GameVersion=" + Main.Defaults.GameVersion, 3);
        if (Main.Defaults.GameVersion != 4.2) {
			Main.Log("Stop Execution. Version not supported.", 2);
			return;
		}
        ExtraTools.GetFirstDomain();
		Main.Log("FirstDomain=" + Main.Defaults.FirstDomain, 3);
		LanguageMgr.SetDomain(Main.Defaults.FirstDomain);
		LanguageMgr.Init();
		AutoUpdater.Check();
        ExtraTools.GetAjaxToken();
		Main.Log("AjaxToken=" + Main.Defaults.AjaxToken, 3);
        ExtraTools.GetVillages();
		Main.Log("Villages=" + Main.Defaults.Villages.toSource(), 3);
		Main.Log("ActiveVillage=" + Main.Defaults.ActiveVillage.toSource(), 3);
		ScriptSettings.Delete("Queue");
		Main.Defaults.Queue = ScriptSettings.LoadJSON("Queue");
		Main.Defaults.AllyReports = ScriptSettings.LoadJSON("AllyReports");
		Main.Log("Timer 'GetAllyAttacks'. Time in ms=" + (1000 * 60 * 3 * Main.Defaults.ScriptSpeed), 3);
		setInterval(function () {
			Main.Log("Run Timer 'GetAllyAttacks'.", 3);
			Main.Defaults.Queue.push(new QueueData(ExtraTools.eProcessActionType.GetAllyAttacks, new Date().getTime()));
			Main.Defaults.Queue.sort(function (a, b) { return a.ExecuteTime - b.ExecuteTime; });
			ScriptSettings.SaveJSON("Queue", Main.Defaults.Queue);
		}, 1000 * 60 * 3 * Main.Defaults.ScriptSpeed);
		Main.Log("Timer 'ExeQueue'. Time in ms=" + (1000 * 60 * Main.Defaults.ScriptSpeed), 3);
        setInterval(Main.ExeQueue, 1000 * 60 * Main.Defaults.ScriptSpeed);
		var id = 1;
		alert("filter");
		Main.Defaults.Queue.filter(function(Queue) {
			alert(Queue.toSource() + "/r/n" + id);
			return (Queue.ActionType == ExtraTools.eProcessActionType.GetReport) && (Queue.Data1 == id)
		});
        switch (Main.Defaults.Page) {
        	case ExtraTools.GamePages.KARTE: {
        	    ScriptVisualElements.CreateFinderForm();
        	    //#region CROP FINDER
        	    $("#tabsFinder #tabs-cropsFinder form button").click(function() {
					$("#tabsFinder #tabs-cropsFinder #search_state div#in_progress span:eq(1)").text("0");
					$("#tabsFinder #tabs-cropsFinder #search_state div#in_progress span:eq(2)").text("0");
					$("#tabsFinder #tabs-cropsFinder #search_result tbody tr").remove();
					
					var x = ExtraTools.ConvertToInt($("#tabsFinder #tabs-cropsFinder form #x").val());
					var y = ExtraTools.ConvertToInt($("#tabsFinder #tabs-cropsFinder form #y").val());
					var zoom = ExtraTools.ConvertToInt($("#tabsFinder #tabs-cropsFinder form #zoom").val());
					
					var field1 = $("#tabsFinder #tabs-cropsFinder form #field1").attr("checked");
					var field2 = $("#tabsFinder #tabs-cropsFinder form #field2").attr("checked");
					var field3 = $("#tabsFinder #tabs-cropsFinder form #field3").attr("checked");
					var field4 = $("#tabsFinder #tabs-cropsFinder form #field4").attr("checked");
					var field5 = $("#tabsFinder #tabs-cropsFinder form #field5").attr("checked");
					var field6 = $("#tabsFinder #tabs-cropsFinder form #field6").attr("checked");
					var field7 = $("#tabsFinder #tabs-cropsFinder form #field7").attr("checked");
					var field8 = $("#tabsFinder #tabs-cropsFinder form #field8").attr("checked");
					var field9 = $("#tabsFinder #tabs-cropsFinder form #field9").attr("checked");
					var field10 = $("#tabsFinder #tabs-cropsFinder form #field10").attr("checked");
					var field11 = $("#tabsFinder #tabs-cropsFinder form #field11").attr("checked");
					var field12 = $("#tabsFinder #tabs-cropsFinder form #field12").attr("checked");
        	        
					if (!field1 || !field2 || !field3 || !field4 || !field5 || !field6 || !field7 || !field8 || !field9 || !field10 || !field11 || !field12) return;
					
					$("#tabsFinder #tabs-cropsFinder #search_state").show();
					$("#tabsFinder #tabs-cropsFinder #search_state div#in_progress").show();
					$("#tabsFinder #tabs-cropsFinder #search_state div#completed").hide();
					$("#tabsFinder #tabs-cropsFinder #search_result").show();
					
					var fields = 0;
					switch (zoom) {
						case 1: { fields = 99; break; }
						case 2: { fields = 357; break; }
						case 3: { fields = 961; break; }
					}
					$("#tabsFinder #tabs-cropsFinder #search_state div#in_progress span:eq(2)").text(fields);
					
        	        var jqxhr = $.ajax({
        	           url: "http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.AJAX,
        	           dataType: "text",
        	           contentType: "text",
        	           data: "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=" + zoom + "&ajaxToken=" + Main.Defaults.AjaxToken
        	        })
        	        .done(function (responseText) {
						var objResp = eval('(' + responseText + ')').response;
        	            if (!objResp.error) {
        	                var objTiles = objResp.data.tiles;
							for (var i = 0; i < objTiles.length; i++) {
								$("#tabsFinder #tabs-cropsFinder #search_state div#in_progress span:eq(1)").text(i + 1);
        	                    var d = ExtraTools.GetPositionData(objTiles[i]);
								if ((x == d.X) && (y == d.Y)) continue;
								if (d.TerritoryType == ExtraTools.eTerritoryType.Village) {
									var jqxhr2 = $.ajax({
										url: "http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.POSITION_DETAILS,
										dataType: "text",
										contentType: "text",
										data: "x=" + d.X + "&y=" + d.Y
									})
									.done(function (responseHtml) {
										var details = ExtraTools.GetPositionDetails(responseHtml);
										d.Distribution = details.Distribution;
									});
								}
								
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_3_3_3_9) && (!field1)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_3_4_5_6) && (!field2)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_4_4_4_6) && (!field3)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_4_5_3_6) && (!field4)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_5_3_4_6) && (!field5)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_1_1_1_15) && (!field6)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_4_4_3_7) && (!field7)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_3_4_4_7) && (!field8)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_4_3_4_7) && (!field9)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_3_5_4_6) && (!field10)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_4_3_5_6) && (!field11)) continue;
								if ((d.Distribution == ExtraTools.eTerritoryDistribution.T_5_4_3_6) && (!field12)) continue;
								
								if ((d.TerritoryType == ExtraTools.eTerritoryType.Village) || (d.TerritoryType == ExtraTools.eTerritoryType.AbandonedValley)) {
									$("#tabsFinder #tabs-cropsFinder #search_result tbody").append(
								        "<tr>" +
									        "<td><a href=\"http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.POSITION_DETAILS + "?x=" + d.X + "&y=" + d.Y + "\" target=\"_blank\">" + d.X + "|" + d.Y + "</a></td>" +
									        "<td>" + Main.GetDistance(x, y, d.X, d.Y) + "</td>" +
									        "<td>" + ExtraTools.TerritoryDistributionToName(d.Distribution) + "</td>" +
									        "<td>" + ((d.PlayerID != null && d.PlayerName != null) ? "<a href=\"http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.PROFILE + "?uid=" + d.PlayerID + "\" target=\"_blank\">" + d.PlayerName + "</a>" : "") + "</td>" +
									        "<td>" + ((d.AllyID != null && d.AllyName != null) ? "<a href=\"http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.ALLY + "?aid=" + d.AllyID + "\" target=\"_blank\">" + d.AllyName + "</a>" : "") + "</td>" +
								        "</tr>"
							        );
        	                    }
                            }
        	            } else {
        	                alert(objResp.errorMsg);
        	            }
        	        });
					
					$("#tabsFinder #tabs-cropsFinder #search_result").trigger("update"); 
					//$("#tabsFinder #tabs-cropsFinder #search_result").trigger("sorton", [[1,0]]);
					
					$("#tabsFinder #tabs-cropsFinder #search_state div#in_progress").hide();
                    $("#tabsFinder #tabs-cropsFinder #search_state div#completed").show();
        	    });
        	    //#endregion CROP FINDER
        	    //#region OASI FINDER
        	    $("#tabsFinder #tabs-oasisFinder form button").click(function () {
        	        $("#tabsFinder #tabs-oasisFinder #search_state div#in_progress span:eq(1)").text("0");
        	        $("#tabsFinder #tabs-oasisFinder #search_state div#in_progress span:eq(2)").text("0");
        	        $("#tabsFinder #tabs-oasisFinder #search_result tbody tr").remove();

        	        var x = ExtraTools.ConvertToInt($("#tabsFinder #tabs-oasisFinder form #x").val());
        	        var y = ExtraTools.ConvertToInt($("#tabsFinder #tabs-oasisFinder form #y").val());
        	        var zoom = ExtraTools.ConvertToInt($("#tabsFinder #tabs-oasisFinder form #zoom").val());

        	        var field1 = $("#tabsFinder #tabs-oasisFinder form #field1").attr("checked");
        	        var field2 = $("#tabsFinder #tabs-oasisFinder form #field2").attr("checked");
        	        var field3 = $("#tabsFinder #tabs-oasisFinder form #field3").attr("checked");
        	        var field4 = $("#tabsFinder #tabs-oasisFinder form #field4").attr("checked");
        	        var field5 = $("#tabsFinder #tabs-oasisFinder form #field5").attr("checked");
        	        var field6 = $("#tabsFinder #tabs-oasisFinder form #field6").attr("checked");
        	        var field7 = $("#tabsFinder #tabs-oasisFinder form #field7").attr("checked");
        	        var field8 = $("#tabsFinder #tabs-oasisFinder form #field8").attr("checked");
					
					if (!field1 || !field2 || !field3 || !field4 || !field5 || !field6 || !field7 || !field8) return;
					
        	        $("#tabsFinder #tabs-oasisFinder #search_state").show();
        	        $("#tabsFinder #tabs-oasisFinder #search_state div#in_progress").show();
        	        $("#tabsFinder #tabs-oasisFinder #search_state div#completed").hide();
        	        $("#tabsFinder #tabs-oasisFinder #search_result").show();

        	        var fields = 0;
        	        switch (zoom) {
        	            case 1: { fields = 99; break; }
        	            case 2: { fields = 357; break; }
        	            case 3: { fields = 961; break; }
        	        }
        	        $("#tabsFinder #tabs-oasisFinder #search_state div#in_progress span:eq(2)").text(fields);

        	        var jqxhr = $.ajax({
        	            url: "http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.AJAX,
        	            dataType: "text",
        	            contentType: "text",
        	            data: "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=" + zoom + "&ajaxToken=" + Main.Defaults.AjaxToken
        	        })
        	        .done(function (responseText) {
        	            var objResp = eval('(' + responseText + ')').response;
        	            if (!objResp.error) {
        	                var objTiles = objResp.data.tiles;
        	                for (var i = 0; i < objTiles.length; i++) {
        	                    $("#tabsFinder #tabs-oasisFinder #search_state div#in_progress span:eq(1)").text(i + 1);
        	                    var d = ExtraTools.GetPositionData(objTiles[i]);
        	                    if ((x == d.X) && (y == d.Y)) continue;
        	                    if ((d.TerritoryType == ExtraTools.eTerritoryType.FreeOasis) || (d.TerritoryType == ExtraTools.eTerritoryType.OccupiedOasi)) {
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Lumber25) && (!field1)) continue;
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Clay25) && (!field2)) continue;
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Iron25) && (!field3)) continue;
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Crop25) && (!field4)) continue;
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Crop50) && (!field5)) continue;
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Lumber25_Crop25) && (!field6)) continue;
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Clay25_Crop25) && (!field7)) continue;
        	                        if ((d.OasisBonus == ExtraTools.eOasisBonus.Iron25_Crop25) && (!field8)) continue;
        	                        $("#tabsFinder #tabs-oasisFinder #search_result tbody").append(
								        "<tr>" +
									        "<td><a href=\"http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.POSITION_DETAILS + "?x=" + d.X + "&y=" + d.Y + "\" target=\"_blank\">" + d.X + "|" + d.Y + "</a></td>" +
									        "<td>" + Main.GetDistance(x, y, d.X, d.Y) + "</td>" +
									        "<td>" + ExtraTools.OasiBonusToName(d.OasisBonus) + "</td>" +
									        "<td>" + ((d.PlayerID != null && d.PlayerName != null) ? "<a href=\"http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.PROFILE + "?uid=" + d.PlayerID + "\" target=\"_blank\">" + d.PlayerName + "</a>" : "") + "</td>" +
									        "<td>" + ((d.AllyID != null && d.AllyName != null) ? "<a href=\"http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.ALLY + "?aid=" + d.AllyID + "\" target=\"_blank\">" + d.AllyName + "</a>" : "") + "</td>" +
								        "</tr>"
							        );
        	                    }
        	                }
        	            } else {
        	                alert(objResp.errorMsg);
        	            }
        	        });

        	        $("#tabsFinder #tabs-oasisFinder #search_result").trigger("update");
        	        //$("#tabsFinder #tabs-oasisFinder #search_result").trigger("sorton", [[1,0]]);

        	        $("#tabsFinder #tabs-oasisFinder #search_state div#in_progress").hide();
        	        $("#tabsFinder #tabs-oasisFinder #search_state div#completed").show();
        	    });
        	    //#endregion OASI FINDER
				//#region ANIMALS FINDER
				$("#tabsFinder #tabs-animalsFinder form button").click(function () {
					$("#tabsFinder #tabs-animalsFinder #search_state div#in_progress span:eq(1)").text("0");
					$("#tabsFinder #tabs-animalsFinder #search_state div#in_progress span:eq(2)").text("0");
					$("#tabsFinder #tabs-animalsFinder #search_result tbody tr").remove();

					var x = ExtraTools.ConvertToInt($("#tabsFinder #tabs-animalsFinder form #x").val());
					var y = ExtraTools.ConvertToInt($("#tabsFinder #tabs-animalsFinder form #y").val());
					var zoom = ExtraTools.ConvertToInt($("#tabsFinder #tabs-animalsFinder form #zoom").val());

					var animal1 = $("#tabsFinder #tabs-animalsFinder form #animal1").attr("checked");
					var animal2 = $("#tabsFinder #tabs-animalsFinder form #animal2").attr("checked");
					var animal3 = $("#tabsFinder #tabs-animalsFinder form #animal3").attr("checked");
					var animal4 = $("#tabsFinder #tabs-animalsFinder form #animal4").attr("checked");
					var animal5 = $("#tabsFinder #tabs-animalsFinder form #animal5").attr("checked");
					var animal6 = $("#tabsFinder #tabs-animalsFinder form #fieldanimal6").attr("checked");
					var animal7 = $("#tabsFinder #tabs-animalsFinder form #animal7").attr("checked");
					var animal8 = $("#tabsFinder #tabs-animalsFinder form #animal8").attr("checked");
					var animal9 = $("#tabsFinder #tabs-animalsFinder form #animal9").attr("checked");
					var animal10 = $("#tabsFinder #tabs-animalsFinder form #animal10").attr("checked");
					
					if (!animal1 || !animal2 || !animal3 || !animal4 || !animal5 || !animal6 || !animal7 || !animal8 || !animal9 || !animal10) return;
					
					$("#tabsFinder #tabs-animalsFinder #search_state").show();
					$("#tabsFinder #tabs-animalsFinder #search_state div#in_progress").show();
					$("#tabsFinder #tabs-animalsFinder #search_state div#completed").hide();
					$("#tabsFinder #tabs-animalsFinder #search_result").show();

					var fields = 0;
					switch (zoom) {
						case 1: { fields = 99; break; }
						case 2: { fields = 357; break; }
						case 3: { fields = 961; break; }
					}
					$("#tabsFinder #tabs-animalsFinder #search_state div#in_progress span:eq(2)").text(fields);

					var jqxhr = $.ajax({
						url: "http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.AJAX,
						dataType: "text",
						contentType: "text",
						data: "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=" + zoom + "&ajaxToken=" + Main.Defaults.AjaxToken
					})
					.done(function (responseText) {
						var objResp = eval('(' + responseText + ')').response;
						if (!objResp.error) {
							var objTiles = objResp.data.tiles;
							for (var i = 0; i < objTiles.length; i++) {
								$("#tabsFinder #tabs-animalsFinder #search_state div#in_progress span:eq(1)").text(i + 1);
								var d = ExtraTools.GetPositionData(objTiles[i]);
								if ((x == d.X) && (y == d.Y)) continue;
								if (d.TerritoryType == ExtraTools.eTerritoryType.FreeOasis) {
									var dd = null;
									var jqxhr2 = $.ajax({
										url: "http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.POSITION_DETAILS,
										dataType: "text",
										contentType: "text",
										data: "x=" + d.X + "&y=" + d.Y
									})
									.done(function (responseHtml) {
										dd = ExtraTools.GetPositionDetails(responseHtml);
									});
									var view = false;
									if ((dd.Rats != 0) && (animal1)) view = true;
									if ((dd.Spiders != 0) && (animal2)) view = true;
									if ((dd.Snakes != 0) && (animal3)) view = true;
									if ((dd.Bats != 0) && (animal4)) view = true;
									if ((dd.WildBoars != 0) && (animal5)) view = true;
									if ((dd.Wolfs != 0) && (animal6)) view = true;
									if ((dd.Bears != 0) && (animal7)) view = true;
									if ((dd.Crocodiles != 0) && (animal8)) view = true;
									if ((dd.Tigers != 0) && (animal9)) view = true;
									if ((dd.Elephants != 0) && (animal10)) view = true;
									if (view) {
										$("#tabsFinder #tabs-animalsFinder #search_result tbody").append(
											"<tr>" +
												"<td><a href=\"http://" + ScriptSettings.Defaults.Server + "/" + ExtraTools.GamePages.POSITION_DETAILS + "?x=" + d.X + "&y=" + d.Y + "\" target=\"_blank\">" + d.X + "|" + d.Y + "</a></td>" +
												"<td>" + Main.GetDistance(x, y, d.X, d.Y) + "</td>" +
												"<td>" + ExtraTools.AnimalsToName(dd) + "</td>" +
											"</tr>"
										);
									}
								}
							}
						} else {
							alert(objResp.errorMsg);
						}
					});

					$("#tabsFinder #tabs-animalsFinder #search_result").trigger("update");
					//$("#tabsFinder #tabs-animalsFinder #search_result").trigger("sorton", [[1,0]]);

					$("#tabsFinder #tabs-animalsFinder #search_state div#in_progress").hide();
					$("#tabsFinder #tabs-animalsFinder #search_state div#completed").show();
				    //#endregion ANIMALS FINDER
				});
                break;
            }
			case ExtraTools.GamePages.ALLY: {
				if ($.getUrlVar("s") == 3) {
					$("table#offs tbody tr").each(function(index) {
						if ($(this).find("td.sub a img").attr("class").substr(8) == "iReport1") {
							var href = $(this).find("td.sub a:eq(1)").attr("href").substr(16);
							var id = null;
							var aid = null;
							if (href.indexOf("&aid=") == -1) {
								id = href;
							} else {
								id = href.substr(0, href.indexOf("&"));
								aid = href.substr(href.lastIndexOf("=") + 1);
							}
							if ((Main.Defaults.Queue.filter(function(Queue) { return (Queue.ActionType == ExtraTools.eProcessActionType.GetReport) && (Queue.Data1 == id) }).length == 0) && (!$.inArray(id, Main.Defaults.AllyReports)))
								Main.Defaults.Queue.push(new QueueData(ExtraTools.eProcessActionType.GetReport, new Date().getTime() + 1000 * 60 * 60, id, aid));
						}
					});
					Main.Defaults.Queue.sort(function(a, b) { return a.ExecuteTime - b.ExecuteTime; });
					ScriptSettings.SaveJSON("Queue", Main.Defaults.Queue);
				}
				break;
			}
        }
    },
	/*RequestAllyReport: function() {
		GM_log("window.AllyReportsToRequest.length=" + window.AllyReportsToRequest.length);
		if (window.AllyReportsToRequest.length > 0) {
			var url = window.AllyReportsToRequest.pop();
			GM_log("request: " + url);
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: url,
				onload: function(xpr)
				{
					window.AllyReports.push({Report: ExtraTools.ParseReport(xpr.responseText)});
					ScriptSettings.SaveJSON("AllyReports", window.AllyReports);
					if (window.AllyReportsToRequest.length > 0) Main.RequestAllyReport();
				}
			});
		}
	}*/
};

var ScriptSettings = {
    Defaults: {
        Server: document.location.href.split("/")[2]
    },
    Load: function(name, value) {
        return GM_getValue(ScriptSettings.Defaults.Server + "/" + AutoUpdater.ID + "/" + name, value)
    },
    Save: function(name, value) {
        GM_setValue(ScriptSettings.Defaults.Server + "/" + AutoUpdater.ID + "/" + name, value)
    },
	Delete: function(name) {
		GM_deleteValue(ScriptSettings.Defaults.Server + "/" + AutoUpdater.ID + "/" + name);
	},
    SaveJSON: function(name, value) {
        this.Save(name, JSON.stringify(value))
    },
    LoadJSON: function(name) {
         return jQuery.parseJSON((this.Load(name, "[]") == "") ? "[]" : this.Load(name, "[]"));
    },
    /*get_AllyPlayerList: function () {
        var a = this.LoadJSON("ally_player_list");
        return a
    },*/
    /*save_AllyList: function (a) {
        this.SaveJSON("ally_list", a)
    },*/
};

var ExtraTools = {
    //#region GamePages
    GamePages: {
        LOGIN: "login.php",
        LOGOUT: "logout.php",
        DORF1: "dorf1.php",
        DORF2: "dorf2.php",
        BUILD: "build.php",
        KARTE: "karte.php",
        POSITION_DETAILS: "position_details.php",
        MESSAGE: "nachrichten.php",
        REPORT: "berichte.php",
        STATISTIC: "statistiken.php",
        ALLY: "allianz.php",
        HERO_INVENTORY: "hero_inventory.php",
        HERO_ADVENTURE: "hero_adventure.php",
        HERO_AUCTION: "hero_auction.php",
        PROFILE: "spieler.php",
        OPTIONS: "options.php",
        AJAX: "ajax.php"
    },
    //#endregion GamePages
    //#region eProcessActionType
	eProcessActionType: {
		None: 0,
		GetAllyAttacks: 1,
		GetReport: 2
	},
    //#endregion eProcessActionType
    //#region eGameVersion
    eGameVersion: {
        None: 0,
        Version_4_0: 1,
        Version_4_2: 2
    },
    //#endregion eGameVersion
    //#region eTribe
    eTribe: {
        None: 0,
        Roman: 1,
        Teuton: 2,
        Gaul: 3,
        Natar: 4,
        Nature: 5
    },
    //#endregion eTribe
    //#region eTerritoryType
    eTerritoryType: {
        None: 0,
        Desert: 1,
        AbandonedValley: 2,
        Village: 3,
        FreeOasis: 4,
        OccupiedOasi: 5
    },
    //#endregion eTerritoryType
    //#region eTerritoryDistribution
    eTerritoryDistribution: {
        None: 0,
        T_3_3_3_9: 1,
        T_3_4_5_6: 2,
        T_4_4_4_6: 3,
        T_4_5_3_6: 4,
        T_5_3_4_6: 5,
        T_1_1_1_15: 6,
        T_4_4_3_7: 7,
        T_3_4_4_7: 8,
        T_4_3_4_7: 9,
        T_3_5_4_6: 10,
        T_4_3_5_6: 11,
        T_5_4_3_6: 12
    },
    //#endregion eTerritoryDistribution
    //#region eOasisBonus
    eOasisBonus: {
        None: 0,
        Lumber25: 1,
        Clay25: 2,
        Iron25: 3,
        Crop25: 4,
        Crop50: 5,
        Lumber25_Crop25: 6,
        Clay25_Crop25: 7,
        Iron25_Crop25: 8
    },
    //#endregion eOasisBonus
    //#region eResourcesCapacity
    eResourcesCapacity: {
        Warehouse: 0,
        Granary: 1
    },
    //#endregion eResourcesCapacity
    //#region eResourceType
    eResourceType: {
        Lumber: 0,
        Clay: 1,
        Iron: 2,
        Crop: 3,
        CropBalance: 4
    },
    //#endregion eResourceType
    //#region eSendTroopType
    eSendTroopType: {
        Reinforce: 0,
        Normal: 1,
        Raid: 2
    },
    //#endregion eSendTroopType
    //#region eReportType
	eReportType: {
		None: 0,
		Exploration: 1,
	},
    //#endregion eReportType
    //#region GetTribe
    GetTribe: function(n) {
        switch (n) {
            case "Romani": { return ExtraTools.eTribe.Roman; }
            case "Galli": { return ExtraTools.eTribe.Gaul; }
            case "Teutoni": { return ExtraTools.eTribe.Teuton; }
            case "Natar": { return ExtraTools.eTribe.Nature; }
            case "Nature": { return ExtraTools.eTribe.Nature; }
            default: { return ExtraTools.eTribe.None; }
        }
    },
    //#endregion GetTribe
    //#region GetTerritoryDistribution
    GetTerritoryDistribution: function () {
        switch (arguments.length) {
            case 1: {
                switch (arguments[0]) {
                    case "f6": { return ExtraTools.eTerritoryDistribution.T_1_1_1_15; }
                    case "f1": { return ExtraTools.eTerritoryDistribution.T_3_3_3_9; }
                    case "f8": { return ExtraTools.eTerritoryDistribution.T_3_4_4_7; }
                    case "f2": { return ExtraTools.eTerritoryDistribution.T_3_4_5_6; }
                    case "f10": { return ExtraTools.eTerritoryDistribution.T_3_5_4_6; }
                    case "f9": { return ExtraTools.eTerritoryDistribution.T_4_3_4_7; }
                    case "f11": { return ExtraTools.eTerritoryDistribution.T_4_3_5_6; }
                    case "f7": { return ExtraTools.eTerritoryDistribution.T_4_4_3_7; }
                    case "f3": { return ExtraTools.eTerritoryDistribution.T_4_4_4_6; }
                    case "f4": { return ExtraTools.eTerritoryDistribution.T_4_5_3_6; }
                    case "f5": { return ExtraTools.eTerritoryDistribution.T_5_3_4_6; }
                    case "f12": { return ExtraTools.eTerritoryDistribution.T_5_4_3_6; }
                    default: { return ExtraTools.eTerritoryDistribution.None; }
                }
                break;
            }
            case 4: {
                var territory = "T_" + arguments[0] + "_" + arguments[1] + "_" + arguments[2] + "_" + arguments[3];
                switch (territory) {
                    case "T_1_1_1_15": { return ExtraTools.eTerritoryDistribution.T_1_1_1_15; }
                    case "T_3_3_3_9": { return ExtraTools.eTerritoryDistribution.T_3_3_3_9; }
                    case "T_3_4_4_7": { return ExtraTools.eTerritoryDistribution.T_3_4_4_7; }
                    case "T_3_4_5_6": { return ExtraTools.eTerritoryDistribution.T_3_4_5_6; }
                    case "T_3_5_4_6": { return ExtraTools.eTerritoryDistribution.T_3_5_4_6; }
                    case "T_4_3_4_7": { return ExtraTools.eTerritoryDistribution.T_4_3_4_7; }
                    case "T_4_3_5_6": { return ExtraTools.eTerritoryDistribution.T_4_3_5_6; }
                    case "T_4_4_3_7": { return ExtraTools.eTerritoryDistribution.T_4_4_3_7; }
                    case "T_4_4_4_6": { return ExtraTools.eTerritoryDistribution.T_4_4_4_6; }
                    case "T_4_5_3_6": { return ExtraTools.eTerritoryDistribution.T_4_5_3_6; }
                    case "T_5_3_4_6": { return ExtraTools.eTerritoryDistribution.T_5_3_4_6; }
                    case "T_5_4_3_6": { return ExtraTools.eTerritoryDistribution.T_5_4_3_6; }
                    default: { return ExtraTools.eTerritoryDistribution.None; }
                }
                break;
            }
        }
        return null;
    },
    //#endregion GetTerritoryDistribution
    //#region TerritoryDistributionToName
    TerritoryDistributionToName: function(dist) {
        switch (dist) {
            case ExtraTools.eTerritoryDistribution.T_3_3_3_9: { return "3-3-3-9"; }
            case ExtraTools.eTerritoryDistribution.T_3_4_5_6: { return "3-4-5-6"; }
            case ExtraTools.eTerritoryDistribution.T_4_4_4_6: { return "4-4-4-6"; }
            case ExtraTools.eTerritoryDistribution.T_4_5_3_6: { return "4-5-3-6"; }
            case ExtraTools.eTerritoryDistribution.T_5_3_4_6: { return "5-3-4-6"; }
            case ExtraTools.eTerritoryDistribution.T_1_1_1_15: { return "1-1-1-15"; }
            case ExtraTools.eTerritoryDistribution.T_4_4_3_7: { return "4-4-3-7"; }
            case ExtraTools.eTerritoryDistribution.T_3_4_4_7: { return "3-4-4-7"; }
            case ExtraTools.eTerritoryDistribution.T_4_3_4_7: { return "4-3-4-7"; }
            case ExtraTools.eTerritoryDistribution.T_3_5_4_6: { return "3-5-4-6"; }
            case ExtraTools.eTerritoryDistribution.T_4_3_5_6: { return "4-3-5-6"; }
            case ExtraTools.eTerritoryDistribution.T_5_4_3_6: { return "5-4-3-6"; }
            default: { return ""; }
        }
    },
    //#endregion TerritoryDistributionToName
    //#region GetOasisBonus
    GetOasisBonus: function () {
        switch (arguments.length) {
            case 4: {
                var bonus = "B_" + arguments[0] + "_" + arguments[1] + "_" + arguments[2] + "_" + arguments[3];
                switch (bonus) {
                    case "B_25_0_0_0": { return ExtraTools.eOasisBonus.Lumber25; }
                    case "B_0_25_0_0": { return ExtraTools.eOasisBonus.Clay25; }
                    case "B_0_0_25_0": { return ExtraTools.eOasisBonus.Iron25; }
                    case "B_0_0_0_25": { return ExtraTools.eOasisBonus.Crop25; }
                    case "B_0_0_0_50": { return ExtraTools.eOasisBonus.Crop50; }
                    case "B_25_0_0_25": { return ExtraTools.eOasisBonus.Lumber25_Crop25; }
                    case "B_0_25_0_25": { return ExtraTools.eOasisBonus.Clay25_Crop25; }
                    case "B_0_0_25_25": { return ExtraTools.eOasisBonus.Iron25_Crop25; }
                }
                break;
            }
        }
        return ExtraTools.eOasisBonus.None;
    },
    //#endregion GetOasisBonus
    //#region OasiBonusToName
    OasiBonusToName: function (b) {
        switch (b) {
            case ExtraTools.eOasisBonus.Lumber25: { return "<img class='res r1Big' src='img/x.gif' /> 25%"; }
            case ExtraTools.eOasisBonus.Clay25: { return "<img class='res r2Big' src='img/x.gif' /> 25%"; }
            case ExtraTools.eOasisBonus.Iron25: { return "<img class='res r3Big' src='img/x.gif' /> 25%"; }
            case ExtraTools.eOasisBonus.Crop25: { return "<img class='res r4Big' src='img/x.gif' /> 25%"; }
            case ExtraTools.eOasisBonus.Crop50: { return "<img class='res r4Big' src='img/x.gif' /> 50%"; }
            case ExtraTools.eOasisBonus.Lumber25_Crop25: { return "<img class='res r1Big' src='img/x.gif' /> 25% <img class='res r4Big' src='img/x.gif' /> 25%"; }
            case ExtraTools.eOasisBonus.Clay25_Crop25: { return "<img class='res r2Big' src='img/x.gif' /> 25% <img class='res r4Big' src='img/x.gif' /> 25%"; }
            case ExtraTools.eOasisBonus.Iron25_Crop25: { return "<img class='res r3Big' src='img/x.gif' /> 25% <img class='res r4Big' src='img/x.gif' /> 25%"; }
        }
    },
    //#endregion OasiBonusToName
    //#region AnimalsToName
    AnimalsToName: function (d) {
        var r = "";
        if (d.Rats != 0) r = r + " &nbsp; <img class='unit u31' src='img/x.gif' /> " + d.Rats;
        if (d.Spiders != 0) r = r + " &nbsp; <img class='unit u32' src='img/x.gif' /> " + d.Spiders;
        if (d.Snakes != 0) r = r + " &nbsp; <img class='unit u33' src='img/x.gif' /> " + d.Snakes;
        if (d.Bats != 0) r = r + " &nbsp; <img class='unit u34' src='img/x.gif' /> " + d.Bats;
        if (d.WildBoars != 0) r = r + " &nbsp; <img class='unit u35' src='img/x.gif' /> " + d.WildBoars;
        if (d.Wolfs != 0) r = r + " &nbsp; <img class='unit u36' src='img/x.gif' /> " + d.Wolfs;
        if (d.Bears != 0) r = r + " &nbsp; <img class='unit u37' src='img/x.gif' /> " + d.Bears;
        if (d.Crocodiles != 0) r = r + " &nbsp; <img class='unit u38' src='img/x.gif' /> " + d.Crocodiles;
        if (d.Tigers != 0) r = r + " &nbsp; <img class='unit u39' src='img/x.gif' /> " + d.Tigers;
        if (d.Elephants != 0) r = r + " &nbsp; <img class='unit u40' src='img/x.gif' \> " + d.Elephants;
        return r.substr(8);
    },
    //#endregion AnimalsToName
    //#region ConvertToInt
    ConvertToInt: function(t) {
        return parseInt(t.replace(/[^\d.-]/g, ''));
    },
    //#endregion ConvertToInt
    //#region GetVillages
    GetVillages: function() {
        $("div#sidebarBoxVillagelist div ul li").each(function(index) {
            Main.Defaults.Villages[index] = {
                ID: ExtraTools.ConvertToInt($(this).find("a").attr("href").substr(8)),
                Name: $(this).find("div.name").text(),
                X: ExtraTools.ConvertToInt($(this).find("span[class='coordinateX']").text().substr(1)),
				Y: ExtraTools.ConvertToInt($(this).find("span[class='coordinateY']").text().substr(0, $(this).find("span[class='coordinateY']").text().length - 1)),
                Active: (($(this).find("a").attr("class") == "active") ? true : false)
            };
            if (Main.Defaults.Villages[index].Active)
            {
                Main.Defaults.ActiveVillage = Main.Defaults.Villages[index];
            }
        });
    },
    //#endregion GetVillages
    //#region GetGameVersion
    GetGameVersion: function() {
        var match = document.scripts[1].text.match(/Travian.Game.version = '([0-9.]+)';/);
        if (match) {
            Main.Defaults.GameVersion = match[1];
        }
    },
    //#endregion GetGameVersion
    //#region GetFirstDomain
    GetFirstDomain: function() {
        Main.Defaults.FirstDomain = ScriptSettings.Defaults.Server.match(/\b.travian.([A-Za-z.]+)\b/)[1];
    },
    //#endregion GetFirstDomain
    //#region GetAjaxToken
    GetAjaxToken: function() {
        var script = document.scripts[4].text;
        if (script.indexOf("ajaxToken") != -1) {
            var match = script.match(/window.ajaxToken = '([A-Za-z0-9]+)';/);
            if (match) {
                Main.Defaults.AjaxToken = match[1];
            }
        }
    },
    //#endregion GetAjaxToken
    //#region GetPositionData
    GetPositionData: function(d) {
        var o = new PositionData();
        if (d.t != undefined) {
            d.t = d.t.replace("\u200E", "", "gi");
            d.t = d.t.replace("&#x202d;", "", "gi");
            d.t = d.t.replace("\"", '"', "gi");
            d.t = d.t.replace("&#45;", "-", "gi");
            d.t = d.t.replace("&#x202d;", "", "gi");
            d.t = d.t.replace("&#x202c;", "", "gi");
        }
        if (d.t == undefined) {
            // DESERTO:           ({ x: "-108", y: "15" })
            o.TerritoryType = ExtraTools.eTerritoryType.Desert;
            o.X = d.x;
            o.Y = d.y;
        } else if ((d.t != undefined) && (d.d == undefined) && (d.c != undefined)) {
            //  VALLE ABBANDONATA: ({ x: "-107", y: "15", c: "{k.vt} {k.f3}", t: "<span class="coordinates coordinatesWrapper"><span class="coordinateX">(-103</span><span class="coordinatePipe">|</span><span class="coordinateY">15)</span></span><br />{b:ri1} 10.03.13 12:58 {b.ri1}<br />{b:bi1} 5 / 350" })
            o.TerritoryType = ExtraTools.eTerritoryType.AbandonedValley;
            o.X = d.x;
            o.Y = d.y;
            var match = d.c.match(/{k.(f[0-9]+)}/);
            if (match) {
                o.Distribution = ExtraTools.GetTerritoryDistribution(match[1]);
            }
        } else if ((d.t != undefined) && (d.d == -1) && (d.c != undefined) && (d.u == undefined)) {
            // OASI LIBERA:       ({ x: "-100", y: "15", d: -1, c: "{k.fo}", t: "<span class="coordinates coordinatesWrapper"><span class="coordinateX">(-99</span><span class="coordinatePipe">|</span><span class="coordinateY">14)</span></span><br />{a:r1} {a.r1} 25%<br />{b:ri1} 06.05.13 10:04 {b.ri1}<br />{b:bi2} 0 / 0" })
            o.TerritoryType = ExtraTools.eTerritoryType.FreeOasis;
            o.X = d.x;
            o.Y = d.y;
            var Lumber = 0;
            var Clay = 0;
            var Iron = 0;
            var Crop = 0;
            var m1 = d.t.match(/{a:r[0-4]} {a.r([0-4])} ([0-9]+)%/g);
            if (m1) {
                m2 = m1[0].match(/{a:r[0-4]} {a.r([0-4])} ([0-9]+)%/);
                if (m2) {
                    switch (ExtraTools.ConvertToInt(m2[1])) {
                        case 1: { Lumber = m2[2]; break; }
                        case 2: { Clay = m2[2]; break; }
                        case 3: { Iron = m2[2]; break; }
                        case 4: { Crop = m2[2]; break; }
                    }
                }
                if (m1.length == 2) {
                    var m3 = m1[1].match(/{a:r[0-4]} {a.r([0-4])} ([0-9]+)%/);
                    if (m3) {
                        switch (ExtraTools.ConvertToInt(m3[1])) {
                            case 1: { Lumber = m3[2]; break; }
                            case 2: { Clay = m3[2]; break; }
                            case 3: { Iron = m3[2]; break; }
                            case 4: { Crop = m3[2]; break; }
                        }
                    }
                }
                o.OasisBonus = ExtraTools.GetOasisBonus(Lumber, Clay, Iron, Crop);
            }
            m1 = d.t.match(/{b:ri1} ([0-9.]+) ([0-9:]+) {b.ri1}<br \/>{b:bi1} ([0-9]+) \/ ([0-9]+)/);
            if (m1) {
                o.LastRaidDate = m1[1];
                o.LastRaidHours = m1[2];
                o.LastRaidResources = m1[3];
                o.LastRaidMaxResources = m1[4];
            }
        } else if ((d.t != undefined) && (d.d == -1) && (d.c != undefined) && (d.u != undefined)) {
            // OASI OCCUPATA:     ({ x: "-108", y: "14", u: "29521", a: "158", d: -1, c: "{k.bt}", t: "\u200E&#x202d;<span class=\"coordinates coordinatesWrapper\"><span class=\"coordinateX\">(&#x202d;&#45;&#x202d;108&#x202c;&#x202c;</span><span class=\"coordinatePipe\">|</span><span class=\"coordinateY\">&#x202d;&#x202d;14&#x202c;&#x202c;)</span></span>&#x202c;\u200E<br />{a:r4} {a.r4} 25%<br />{k.spieler} naturally<br />{k.allianz} W@R.<br />{k.volk} {a.v1}" })
            o.TerritoryType = ExtraTools.eTerritoryType.OccupiedOasi;
            o.X = d.x;
            o.Y = d.y;
            var Lumber = 0;
            var Clay = 0;
            var Iron = 0;
            var Crop = 0;
            var m1 = d.t.match(/{a:r[0-4]} {a.r([0-4])} ([0-9]+)%/g);
            if (m1) {
                m2 = m1[0].match(/{a:r[0-4]} {a.r([0-4])} ([0-9]+)%/);
                if (m2) {
                    switch (ExtraTools.ConvertToInt(m2[1])) {
                        case 1: { Lumber = m2[2]; break; }
                        case 2: { Clay = m2[2]; break; }
                        case 3: { Iron = m2[2]; break; }
                        case 4: { Crop = m2[2]; break; }
                    }
                }
                if (m1.length == 2) {
                    var m3 = m1[1].match(/{a:r[0-4]} {a.r([0-4])} ([0-9]+)%/);
                    if (m3) {
                        switch (ExtraTools.ConvertToInt(m3[1])) {
                            case 1: { Lumber = m3[2]; break; }
                            case 2: { Clay = m3[2]; break; }
                            case 3: { Iron = m3[2]; break; }
                            case 4: { Crop = m3[2]; break; }
                        }
                    }
                }
                o.OasisBonus = ExtraTools.GetOasisBonus(Lumber, Clay, Iron, Crop);
            }
            o.PlayerID = d.u;
            var m1 = d.t.match(/{k.spieler} ([^<]+)<br \/>/);
            if (m1) {
                o.PlayerName = m1[1];
            }
            if (d.a != undefined) {
                o.AllyID = d.a;
                m1 = d.t.match(/{k.allianz} ([^<]+)<br \/>/);
                if (m1) {
                    o.AllyName = m1[1];
                }
            }
            m1 = d.t.match(/{b:ri1} ([0-9.]+) ([0-9:]+) {b.ri1}<br \/>{b:bi1} ([0-9]+) \/ ([0-9]+)/);
            if (m1) {
                o.LastRaidDate = m1[1];
                o.LastRaidHours = m1[2];
                o.LastRaidResources = m1[3];
                o.LastRaidMaxResources = m1[4];
            }
        } else if ((d.t != undefined) && (d.d > 0) && (d.c != undefined) && (d.u != undefined)) {
            // VILLAGGIO:         ({ x: "-107", y: "14", u: "29510", a: "158", d: "101015", c: "{k.dt} [05]", t: "\u200E&#x202d;<span class=\"coordinates coordinatesWrapper\"><span class=\"coordinateX\">(&#x202d;&#45;&#x202d;107&#x202c;&#x202c;</span><span class=\"coordinatePipe\">|</span><span class=\"coordinateY\">&#x202d;&#x202d;14&#x202c;&#x202c;)</span></span>&#x202c;\u200E<br />{k.spieler} Mattio<br />{k.einwohner} 149<br />{k.allianz} W@R.<br />{k.volk} {a.v2}<br />{b:ri1} 01.04.13 14:33 {b.ri1}<br />{b:bi1} 6 / 315" })
            // NATAR:             ({ x: "-99", y: "11", u: "1", d: "76257", c: "{k.dt} Villaggio di silvio00", t: "\u200E&#x202d;<span class=\"coordinates coordinatesWrapper\"><span class=\"coordinateX\">(&#x202d;&#45;&#x202d;99&#x202c;&#x202c;</span><span class=\"coordinatePipe\">|</span><span class=\"coordinateY\">&#x202d;&#x202d;11&#x202c;&#x202c;)</span></span>&#x202c;\u200E<br />{k.spieler} Natar<br />{k.einwohner} 178<br />{k.allianz} <br />{k.volk} {a.v5}<br />{b:ri1} oggi 21:09 {b.ri1}<br />{b:bi1} 406 / 4500" })
            o.TerritoryType = ExtraTools.eTerritoryType.Village;
            o.X = d.x;
            o.Y = d.y;
            o.PlayerID = d.u;
            var m1 = d.t.match(/{k.spieler} ([^<]+)<br \/>/);
            if (m1) {
                o.PlayerName = m1[1];
            }
            m1 = d.c.match(/{k.dt} (.+)/);
            if (m1) {
                o.VillageName = m1[1];
            }
            m1 = d.t.match(/{k.einwohner} ([0-9]+)<br \/>/);
            if (m1) {
                o.VillagePoints = m1[1];
            }
            if (d.a != undefined) {
                o.AllyID = d.a;
                m1 = d.t.match(/{k.allianz} ([^<]+)<br \/>/);
                if (m1) {
                    o.AllyName = m1[1];
                }
            }
            m1 = d.t.match(/{b:ri1} ([0-9.]+) ([0-9:]+) {b.ri1}<br \/>{b:bi1} ([0-9]+) \/ ([0-9]+)/);
            if (m1) {
                o.LastRaidDate = m1[1];
                o.LastRaidHours = m1[2];
                o.LastRaidResources = m1[3];
                o.LastRaidMaxResources = m1[4];
            }
        }
        return o;
    },
    //#endregion GetPositionData
    //#region GetPositionDetails
    GetPositionDetails: function (html) {
        var d = new PositionDetail();
        d.TerritoryType = ExtraTools.eTerritoryType.Desert;
        d.Name = $("div#content h1.titleInHeader span.coordText", html).text();
        d.X = ExtraTools.ConvertToInt($("div#content h1.titleInHeader span.coordinatesWrapper span.coordinateX", html).text().substr(1));
        d.Y = $("div#content h1.titleInHeader span.coordinatesWrapper span.coordinateY", html).text();
        d.Y = ExtraTools.ConvertToInt(d.Y.substr(0, d.Y.length - 1));
        d.MainVillage = ($("div#content h1.titleInHeader span.mainVillage", html).text() != "") ? true : false;
        if (($("div#tileDetails", html).attr("class").indexOf("village") == 0) && ($("div#map_details table#distribution tbody tr", html).length == 4) && ($("div#map_details table#troop_info", html).length == 0)) {
			// Valle Abbandonata
            d.TerritoryType = ExtraTools.eTerritoryType.AbandonedValley;
            var posDist1 = $.trim(ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr:eq(0) td.val", html).text()));
            var posDist2 = $.trim(ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr:eq(1) td.val", html).text()));
            var posDist3 = $.trim(ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr:eq(2) td.val", html).text()));
            var posDist4 = $.trim(ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr:eq(3) td.val", html).text()));
            d.Distribution = ExtraTools.GetTerritoryDistribution(posDist1, posDist2, posDist3, posDist4);
            d.CanSendTroop = ($("div#tileDetails div.options div.option:eq(1)", html).length == 1) ? true : false;
        } else if ($("div#tileDetails", html).attr("class").indexOf("oasis") == 0) {
            // Oasi
            d.TerritoryType = ExtraTools.eTerritoryType.FreeOasis;
            if ($("div#map_details table#village_info tr", html).length == 4) {
                d.TerritoryType = ExtraTools.eTerritoryType.OccupiedOasi;
                d.Tribe = ExtraTools.GetTribe($("div#map_details table#village_info tr:eq(0) td", html).text());
                d.AllyID = ExtraTools.ConvertToInt($("div#map_details table#village_info tr:eq(1) td a", html).attr("href").substr(16));
                d.AllyName = $("div#map_details table#village_info tr:eq(1) td a", html).text();
                d.PlayerID = ExtraTools.ConvertToInt($("div#map_details table#village_info tr:eq(2) td a", html).attr("href").substr(16));
                d.PlayerName = $("div#map_details table#village_info tr:eq(2) td a", html).text();
                d.VillageName = $("div#map_details table#village_info tr:eq(3) td a", html).text();
                var href = $("div#map_details table#village_info tr:eq(3) td a", html).attr("href").substr(12);
                d.VillageX = ExtraTools.ConvertToInt(href.substr(0, href.indexOf("&")));
                d.VillageY = ExtraTools.ConvertToInt(href.substr(href.indexOf("&") + 3));
            }
            var lumberBonus = 0;
            var clayBonus = 0;
            var ironBonus = 0;
            var cropBonus = 0;
            jQuery.each($("div#map_details table#distribution tbody tr", html), function () {
                switch ($("td.ico img", this).attr("class")) {
                    case "r1": { lumberBonus = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                    case "r2": { clayBonus = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                    case "r3": { ironBonus = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                    case "r4": { cropBonus = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                }

            });
            d.OasisBonus = ExtraTools.GetOasisBonus(lumberBonus, clayBonus, ironBonus, cropBonus);
            jQuery.each($("div#map_details table#troop_info:eq(0) tbody tr", html), function () {
                if ($("td.ico", this).html() != null) {
                    switch ($("td.ico img", this).attr("class").substr(6)) {
                        case "31": { d.Rats = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "32": { d.Spiders = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "33": { d.Snakes = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "34": { d.Bats = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "35": { d.WildBoars = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "36": { d.Wolfs = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "37": { d.Bears = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "38": { d.Crocodiles = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "39": { d.Tigers = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                        case "40": { d.Elephants = ExtraTools.ConvertToInt($("td.val", this).text()); break; }
                    }
                }
            });
            var i = 0;
            jQuery.each($("div#map_details table#troop_info:eq(1) tbody tr td a", html), function () {
                i = i + 1;
                switch (i) {
                    case 1: { d.Report1 = $(this).attr("href").substr(16); break; }
                    case 2: { d.Report2 = $(this).attr("href").substr(16); break; }
                    case 3: { d.Report3 = $(this).attr("href").substr(16); break; }
                    case 4: { d.Report4 = $(this).attr("href").substr(16); break; }
                    case 5: { d.Report5 = $(this).attr("href").substr(16); break; }
                }
            });
            d.CanSendTroop = true;
        } else if (($("div#tileDetails", html).attr("class").indexOf("village") != -1) && ($("div#map_details table#distribution tbody tr", html).length == 1)) {
            // Villaggio
            d.TerritoryType = ExtraTools.eTerritoryType.Village;
            var posDist1 = ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr td:eq(0)", html).text());
            var posDist2 = ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr td:eq(1)", html).text());
            var posDist3 = ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr td:eq(2)", html).text());
            var posDist4 = ExtraTools.ConvertToInt($("div#map_details table#distribution tbody tr td:eq(3)", html).text());
            d.Distribution = ExtraTools.GetTerritoryDistribution(posDist1, posDist2, posDist3, posDist4);

            d.Tribe = ExtraTools.GetTribe($("div#map_details table#village_info tbody tr:eq(0) td", html).text());
            d.AllyID = ExtraTools.ConvertToInt($("div#map_details table#village_info tbody tr:eq(1) td a", html).attr("href").substr(16));
            d.AllyName = $("div#map_details table#village_info tbody tr:eq(1) td a", html).text();
            d.PlayerID = ExtraTools.ConvertToInt($("div#map_details table#village_info tbody tr:eq(2) td a", html).attr("href").substr(16));
            d.PlayerName = $("div#map_details table#village_info tbody tr:eq(2) td a", html).text();
            d.VillagePoints = ExtraTools.ConvertToInt($("div#map_details table#village_info tbody tr:eq(3) td", html).text());
            var i = 0;
            jQuery.each($("div#map_details table#troop_info:eq(0) tbody tr td a", html), function () {
                i = i + 1;
                switch (i) {
                    case 1: { d.Report1 = $(this).attr("href").substr(16); break; }
                    case 2: { d.Report2 = $(this).attr("href").substr(16); break; }
                    case 3: { d.Report3 = $(this).attr("href").substr(16); break; }
                    case 4: { d.Report4 = $(this).attr("href").substr(16); break; }
                    case 5: { d.Report5 = $(this).attr("href").substr(16); break; }
                }
            });
            d.CanSendTroop = ($("div#tileDetails div.options div.option:eq(1)", html).length == 1) ? true : false;
        }
		return d;
    },
    //#endregion GetPositionDetails
    //#region ParseReport
	ParseReport: function(html) {
		var rd = new ReportData();
		if ($("div#report_surround div.paperContent table#attacker tbody.infos tr:eq(1) td.dropItems", html).length == 1) { //Espolorazioni
			rd.ReportType = ExtraTools.eReportType.Exploration;
			// TODO: Parsing delle esplorazioni
		} else if ($("div#report_surround div.paperContent table#defender", html).length == 1) { //Animali Catturati
			rd.ReportType = ExtraTools.eReportType.Exploration;
			// TODO: Parsing dei animali catturati.
		} else if ($("div#report_surround div.paperContent table#trade", html).length == 1) { //Commercio
			rd.ReportType = ExtraTools.eReportType.Exploration;
			// TODO: Parsing dei commerci.
		} else if ($("div#report_surround div.paperContent div.headline", html).length >= 1) { //Rinforzo
			rd.ReportType = ExtraTools.eReportType.Exploration;
			// TODO: Parsing dei rinforzi unita/animali.
		} else { //Attacchi
			rd.ReportType = ExtraTools.eReportType.Exploration;
			rd.Subject = $("div#report_surround div.paperContent div#subject div:eq(1)", html).text();
			rd.Time = $("div#report_surround div.paperContent div#time div:eq(1)", html).text();
			
			if (false) {
				rd.ReportType = ExtraTools.eReportType.Exploration;
			}
			
			rd.AttackerUid = $("div#report_surround div.paperContent table#attacker thead tr td.troopHeadline a:eq(0)", html).attr("href").substr(16);
			rd.AttackerUname = $("div#report_surround div.paperContent table#attacker thead tr td.troopHeadline a:eq(0)", html).text();
			rd.AttackerVid = $("div#report_surround div.paperContent table#attacker thead tr td.troopHeadline a:eq(1)", html).attr("href").substr(12);
			rd.AttackerVname = $("div#report_surround div.paperContent table#attacker thead tr td.troopHeadline a:eq(1)", html).text();
			
			rd.AttackerSendUnit1 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(0)", html).text();
			rd.AttackerSendUnit2 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(1)", html).text();
			rd.AttackerSendUnit3 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(2)", html).text();
			rd.AttackerSendUnit4 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(3)", html).text();
			rd.AttackerSendUnit5 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(4)", html).text();
			rd.AttackerSendUnit6 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(5)", html).text();
			rd.AttackerSendUnit7 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(6)", html).text();
			rd.AttackerSendUnit8 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(7)", html).text();
			rd.AttackerSendUnit9 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(8)", html).text();
			rd.AttackerSendUnit10 = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(9)", html).text();
			rd.AttackerSendUnitHero = $("div#report_surround div.paperContent table#attacker tbody:eq(1) td:eq(10, html)").text();
			
			rd.AttackerLostUnit1 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(0)", html).text();
			rd.AttackerLostUnit2 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(1)", html).text();
			rd.AttackerLostUnit3 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(2)", html).text();
			rd.AttackerLostUnit4 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(3)", html).text();
			rd.AttackerLostUnit5 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(4)", html).text();
			rd.AttackerLostUnit6 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(5)", html).text();
			rd.AttackerLostUnit7 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(6)", html).text();
			rd.AttackerLostUnit8 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(7)", html).text();
			rd.AttackerLostUnit9 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(8)", html).text();
			rd.AttackerLostUnit10 = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(9)", html).text();
			rd.AttackerLostUnitHero = $("div#report_surround div.paperContent table#attacker tbody:eq(2) td:eq(10)", html).text();
			
			if ($("div#report_surround div.paperContent table#attacker tbody", html).length == 6) {
				rd.AttackerPrisonersUnit1 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(0)", html).text();
				rd.AttackerPrisonersUnit2 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(1)", html).text();
				rd.AttackerPrisonersUnit3 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(2)", html).text();
				rd.AttackerPrisonersUnit4 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(3)", html).text();
				rd.AttackerPrisonersUnit5 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(4)", html).text();
				rd.AttackerPrisonersUnit6 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(5)", html).text();
				rd.AttackerPrisonersUnit7 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(6)", html).text();
				rd.AttackerPrisonersUnit8 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(7)", html).text();
				rd.AttackerPrisonersUnit9 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(8)", html).text();
				rd.AttackerPrisonersUnit10 = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(9)", html).text();
				rd.AttackerPrisonersUnitHero = $("div#report_surround div.paperContent table#attacker tbody:eq(3) td:eq(10)", html).text();
			}
			
			rd.AttackerGoodsLumber = $("div#report_surround div.paperContent table#attacker tbody.goods td div.res div.rArea:eq(0)", html).text();
			rd.AttackerGoodsClay = $("div#report_surround div.paperContent table#attacker tbody.goods td div.res div.rArea:eq(1)", html).text();
			rd.AttackerGoodsIron = $("div#report_surround div.paperContent table#attacker tbody.goods td div.res div.rArea:eq(2)", html).text();
			rd.AttackerGoodsCrop = $("div#report_surround div.paperContent table#attacker tbody.goods td div.res div.rArea:eq(3)", html).text();
			rd.AttackerGoodsCaptured = $("div#report_surround div.paperContent table#attacker tbody.goods td div.carry", html).text().split("/")[0];
			rd.AttackerGoodsMax = $("div#report_surround div.paperContent table#attacker tbody.goods td div.carry", html).text().split("/")[1];
			
			
			// TODO: Parsing delle informazioni sulle unita' catturate/liberate.
			// TODO: Parsing delle informazioni sulle spiate.
			
			if ($("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline span.none2", html).length === 1) {
				rd.DefenderUid = $("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline a:eq(0)", html).attr("href").substr(16);
				rd.DefenderUname = $("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline a:eq(0)", html).text();
				rd.DefenderVid = $("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline a:eq(1)", html).attr("href").substr(12);
				rd.DefenderVname = $("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline a:eq(1)", html).text();
			} else {
				rd.DefenderUname = $("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline span.none2", html).text();
				rd.DefenderVid = $("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline a:eq(0)", html).attr("href").substr(12);
				rd.DefenderVname = $("div#report_surround div.paperContent table:eq(1) thead tr td.troopHeadline a:eq(0)", html).text();
			}
			
			rd.DefenderUnit1 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(0)", html).text();
			rd.DefenderUnit2 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(1)", html).text();
			rd.DefenderUnit3 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(2)", html).text();
			rd.DefenderUnit4 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(3)", html).text();
			rd.DefenderUnit5 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(4)", html).text();
			rd.DefenderUnit6 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(5)", html).text();
			rd.DefenderUnit7 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(6)", html).text();
			rd.DefenderUnit8 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(7)", html).text();
			rd.DefenderUnit9 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(8)", html).text();
			rd.DefenderUnit10 = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(9)", html).text();
			rd.DefenderUnitHero = $("div#report_surround div.paperContent table:eq(1) tbody:eq(1) td:eq(10)", html).text();
			
			// TODO: Parsing dei rinforzi.
		}
		return rd;
	}
    //#endregion ParseReport
};
var ScriptVisualElements = {
    CreateFinderForm: function() {
        var villageOptions = "<option value=\"-1\"></option>";
        $.each(Main.Defaults.Villages, function(index, value) {
            villageOptions = villageOptions + "<option value=\"" + index + "\"" + ((value.Active) ? " selected" : "") + ">" + value.Name + "</option>";
        });
        $("div#content").append("<br />" +
            "<div id=\"tabsFinder\">" +
            "	<ul>" +
            "		<li><a href=\"#tabs-cropsFinder\">" + LanguageMgr.Translate.CropsFinder + "</a></li>" +
            "		<li><a href=\"#tabs-oasisFinder\">" + LanguageMgr.Translate.OasisFinder + "</a></li>" +
            "		<li><a href=\"#tabs-animalsFinder\">" + LanguageMgr.Translate.NaturesFinder + "</a></li>" +
            "	</ul>" +
            "	<div id=\"tabs-cropsFinder\">" +
			"		<form>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.SearchCenterCoords + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:10%\"><label>" + LanguageMgr.Translate.X + ":</label></td>" +
			"							<td style=\"width:40%\"><input id=\"x\" type=\"text\" size=\"4\" maxlength=\"4\" /></td>" +
			"							<td style=\"width:50%\"><label>" + LanguageMgr.Translate.YourVillages + ":</label></td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><label>" + LanguageMgr.Translate.Y + ":</label></td>" +
			"							<td><input id=\"y\" type=\"text\" size=\"4\" maxlength=\"4\" /></td>" +
			"							<td>" +
			"								<select id=\"city\">" + villageOptions + "</select>" +
			"							</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.SearchParameters + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:50%\"><label>" + LanguageMgr.Translate.SearchZoom + ":</label></td>" +
			"							<td style=\"width:50%\">" +
			"								<select id=\"zoom\">" +
			"									<option value=\"1\">1</option>" +
			"									<option value=\"2\">2</option>" +
			"									<option value=\"3\">3</option>" +
			"								</select>" +
			"							</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.FieldFilter + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:33%\"><input id=\"field6\" type=\"checkbox\" value=\"6\" /> 1-1-1-15</td>" +
			"							<td style=\"width:33%\"><input id=\"field8\" type=\"checkbox\" value=\"8\" /> 3-4-4-7</td>" +
			"							<td style=\"width:34%\"><input id=\"field4\" type=\"checkbox\" value=\"4\" /> 4-5-3-6</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"field1\" type=\"checkbox\" value=\"1\" /> 3-3-3-9</td>" +
			"							<td><input id=\"field9\" type=\"checkbox\" value=\"9\" /> 4-3-4-7</td>" +
			"							<td><input id=\"field5\" type=\"checkbox\" value=\"5\" /> 5-3-4-6</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"field3\" type=\"checkbox\" value=\"3\" /> 4-4-4-6</td>" +
			"							<td><input id=\"field7\" type=\"checkbox\" value=\"7\" /> 4-4-3-7</td>" +
			"							<td><input id=\"field10\" type=\"checkbox\" value=\"10\" /> 3-5-4-6</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"field2\" type=\"checkbox\" value=\"2\" /> 3-4-5-6</td>" +
			"							<td><input id=\"field11\" type=\"checkbox\" value=\"11\" /> 4-3-5-6</td>" +
			"							<td><input id=\"field12\" type=\"checkbox\" value=\"12\" /> 5-4-3-6</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<center><button type=\"button\">" + LanguageMgr.Translate.Search + "</button></center>" +
			"		</form>" +
			"		<div id=\"search_state\" class=\"ui-widget\">" +
			"			<br /><br />" +
			"			<div id=\"in_progress\" class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\">" +
			"				<p><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right: .3em;\"></span><strong>" + LanguageMgr.Translate.SearchInProgress + " ...</strong> " + LanguageMgr.Translate.SearchInProgress + " <span>0</span> " + LanguageMgr.Translate.Of + " <span>0</span> " + LanguageMgr.Translate.Fields + ".</p>" +
			"			</div>" +
			"			<div id=\"completed\" class=\"ui-state-highlight ui-corner-all\" style=\"padding: 0 .7em;\">" +
			"				<p><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right: .3em;\"></span><strong>" + LanguageMgr.Translate.SearchCompleted + "</strong></p>" +
			"			</div>" +
			"			<br />" +
			"		</div>" +
			"		<table id=\"search_result\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%; font-weight:bold;\" class=\"border\">" +
			"			<thead>" +
			"				<tr>" +
			"					<th>" + LanguageMgr.Translate.Coordinates + "</th>" +
			"					<th>" + LanguageMgr.Translate.Distance + "</th>" +
			"					<th>" + LanguageMgr.Translate.Type + "</th>" +
			"					<th>" + LanguageMgr.Translate.Player + "</th>" +
			"					<th>" + LanguageMgr.Translate.Alliance + "</th>" +
			"				</tr>" +
			"			</thead>" +
			"			<tbody>" +
			"			</tbody>" +
			"		</table>" +
			"	</div>" +
            "	<div id=\"tabs-oasisFinder\">" +
			"		<form>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.SearchCenterCoords + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:10%\"><label>" + LanguageMgr.Translate.X + ":</label></td>" +
			"							<td style=\"width:40%\"><input id=\"x\" type=\"text\" size=\"4\" maxlength=\"4\" /></td>" +
			"							<td style=\"width:50%\"><label>" + LanguageMgr.Translate.YourVillages + ":</label></td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><label>" + LanguageMgr.Translate.Y + ":</label></td>" +
			"							<td><input id=\"y\" type=\"text\" size=\"4\" maxlength=\"4\" /></td>" +
			"							<td>" +
			"								<select id=\"city\">" + villageOptions + "</select>" +
			"							</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.SearchParameters + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:50%\"><label>" + LanguageMgr.Translate.SearchZoom + ":</label></td>" +
			"							<td style=\"width:50%\">" +
			"								<select id=\"zoom\">" +
			"									<option value=\"1\">1</option>" +
			"									<option value=\"2\">2</option>" +
			"									<option value=\"3\">3</option>" +
			"								</select>" +
			"							</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.BonusFilter + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:33%\"><input id=\"field1\" type=\"checkbox\" value=\"1\" /> <img class=\"res r1Big\" src=\"img/x.gif\"/> 25%</td>" +
			"							<td style=\"width:33%\"><input id=\"field4\" type=\"checkbox\" value=\"4\" /> <img class=\"res r4Big\" src=\"img/x.gif\"/> 25%</td>" +
			"							<td style=\"width:34%\"><input id=\"field6\" type=\"checkbox\" value=\"6\" /> <img class=\"res r1Big\" src=\"img/x.gif\"/> 25% <img class=\"res r4Big\" src=\"img/x.gif\"/> 25%</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"field2\" type=\"checkbox\" value=\"2\" /> <img class=\"res r2Big\" src=\"img/x.gif\"/> 25%</td>" +
			"							<td><input id=\"field5\" type=\"checkbox\" value=\"5\" /> <img class=\"res r4Big\" src=\"img/x.gif\"/> 50%</td>" +
			"							<td><input id=\"field7\" type=\"checkbox\" value=\"7\" /> <img class=\"res r2Big\" src=\"img/x.gif\"/> 25% <img class=\"res r4Big\" src=\"img/x.gif\"/> 25%</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"field3\" type=\"checkbox\" value=\"3\" /> <img class=\"res r3Big\" src=\"img/x.gif\"/> 25%</td>" +
			"							<td></td>" +
			"							<td><input id=\"field8\" type=\"checkbox\" value=\"8\" /> <img class=\"res r3Big\" src=\"img/x.gif\"/> 25% <img class=\"res r4Big\" src=\"img/x.gif\"/> 25%</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<center><button type=\"button\">" + LanguageMgr.Translate.Search + "</button></center>" +
			"		</form>" +
			"		<div id=\"search_state\" class=\"ui-widget\">" +
			"			<br /><br />" +
			"			<div id=\"in_progress\" class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\">" +
			"				<p><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right: .3em;\"></span><strong>" + LanguageMgr.Translate.SearchInProgress + " ...</strong> " + LanguageMgr.Translate.Analized + " <span>0</span> " + LanguageMgr.Translate.Of + " <span>0</span> " + LanguageMgr.Translate.Fields + ".</p>" +
			"			</div>" +
			"			<div id=\"completed\" class=\"ui-state-highlight ui-corner-all\" style=\"padding: 0 .7em;\">" +
			"				<p><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right: .3em;\"></span><strong>" + LanguageMgr.Translate.SearchCompleted + "</strong></p>" +
			"			</div>" +
			"			<br />" +
			"		</div>" +
			"		<table id=\"search_result\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%; font-weight:bold;\" class=\"border\">" +
			"			<thead>" +
			"				<tr>" +
			"					<th>" + LanguageMgr.Translate.Coordinates + "</th>" +
			"					<th>" + LanguageMgr.Translate.Distance + "</th>" +
			"					<th>" + LanguageMgr.Translate.Bonus + "</th>" +
			"					<th>" + LanguageMgr.Translate.Player + "</th>" +
			"					<th>" + LanguageMgr.Translate.Alliance + "</th>" +
			"				</tr>" +
			"			</thead>" +
			"			<tbody>" +
			"			</tbody>" +
			"		</table>" +
			"	</div>" +
            "	<div id=\"tabs-animalsFinder\">" +
			"		<form>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.SearchCenterCoords + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:10%\"><label>" + LanguageMgr.Translate.X + ":</label></td>" +
			"							<td style=\"width:40%\"><input id=\"x\" type=\"text\" size=\"4\" maxlength=\"4\" /></td>" +
			"							<td style=\"width:50%\"><label>" + LanguageMgr.Translate.YourVillages + ":</label></td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><label>" + LanguageMgr.Translate.Y + ":</label></td>" +
			"							<td><input id=\"y\" type=\"text\" size=\"4\" maxlength=\"4\" /></td>" +
			"							<td>" +
			"								<select id=\"city\">" + villageOptions + "</select>" +
			"							</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.SearchParameters + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:50%\"><label>" + LanguageMgr.Translate.SearchZoom + ":</label></td>" +
			"							<td style=\"width:50%\">" +
			"								<select id=\"zoom\">" +
			"									<option value=\"1\">1</option>" +
			"									<option value=\"2\">2</option>" +
			"									<option value=\"3\">3</option>" +
			"								</select>" +
			"							</td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<fieldset>" +
			"				<legend>" + LanguageMgr.Translate.AnimalsFilter + "</legend>" +
			"				<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">" +
			"					<tbody>" +
			"						<tr>" +
			"							<td style=\"width:33%\"><input id=\"animal1\" type=\"checkbox\" value=\"1\" /> <img class='unit u31' src='img/x.gif' /> " + LanguageMgr.Translate.Rat + "</td>" +
			"							<td style=\"width:33%\"><input id=\"animal5\" type=\"checkbox\" value=\"5\" /> <img class='unit u35' src='img/x.gif' /> " + LanguageMgr.Translate.WildBoar + "</td>" +
			"							<td style=\"width:34%\"><input id=\"animal8\" type=\"checkbox\" value=\"8\" /> <img class='unit u38' src='img/x.gif' /> " + LanguageMgr.Translate.Crocodile + "</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"animal2\" type=\"checkbox\" value=\"2\" /> <img class='unit u32' src='img/x.gif' /> " + LanguageMgr.Translate.Spider + "</td>" +
			"							<td><input id=\"animal6\" type=\"checkbox\" value=\"6\" /> <img class='unit u36' src='img/x.gif' /> " + LanguageMgr.Translate.Wolf + "</td>" +
			"							<td><input id=\"animal9\" type=\"checkbox\" value=\"9\" /> <img class='unit u39' src='img/x.gif' /> " + LanguageMgr.Translate.Tiger + "</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"animal3\" type=\"checkbox\" value=\"3\" /> <img class='unit u33' src='img/x.gif' /> " + LanguageMgr.Translate.Snake + "</td>" +
			"							<td><input id=\"animal7\" type=\"checkbox\" value=\"7\" /> <img class='unit u37' src='img/x.gif' /> " + LanguageMgr.Translate.Bear + "</td>" +
			"							<td><input id=\"animal10\" type=\"checkbox\" value=\"10\" /> <img class='unit u40' src='img/x.gif' /> " + LanguageMgr.Translate.Elephant + "</td>" +
			"						</tr>" +
			"						<tr>" +
			"							<td><input id=\"animal4\" type=\"checkbox\" value=\"4\" /> <img class='unit u34' src='img/x.gif' /> " + LanguageMgr.Translate.Bat + "</td>" +
			"							<td></td>" +
			"							<td>" +
			"						</tr>" +
			"					</tbody>" +
			"				</table>" +
			"			</fieldset>" +
			"			<center><button type=\"button\">" + LanguageMgr.Translate.Search + "</button></center>" +
			"		</form>" +
			"		<div id=\"search_state\" class=\"ui-widget\">" +
			"			<br /><br />" +
			"			<div id=\"in_progress\" class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\">" +
			"				<p><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right: .3em;\"></span><strong>" + LanguageMgr.Translate.SearchInProgress + " ...</strong> " + LanguageMgr.Translate.Analized + " <span>0</span> " + LanguageMgr.Translate.Of + " <span>0</span> " + LanguageMgr.Translate.Fields + ".</p>" +
			"			</div>" +
			"			<div id=\"completed\" class=\"ui-state-highlight ui-corner-all\" style=\"padding: 0 .7em;\">" +
			"				<p><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right: .3em;\"></span><strong>" + LanguageMgr.Translate.SearchCompleted + "</strong></p>" +
			"			</div>" +
			"			<br />" +
			"		</div>" +
			"		<table id=\"search_result\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%; font-weight:bold;\" class=\"border\">" +
			"			<thead>" +
			"				<tr>" +
			"					<th>" + LanguageMgr.Translate.Coordinates + "</th>" +
			"					<th>" + LanguageMgr.Translate.Distance + "</th>" +
			"					<th>" + LanguageMgr.Translate.Nature + "</th>" +
			"				</tr>" +
			"			</thead>" +
			"			<tbody>" +
			"			</tbody>" +
			"		</table>" +
            "   </div>" +
            "</div>"
        );
		$("#tabsFinder").tabs();
		
		// CROP FINDER
		$("#tabsFinder #tabs-cropsFinder form button").button();
        $("#tabsFinder #tabs-cropsFinder form #x").attr("value", Main.Defaults.ActiveVillage.X);
        $("#tabsFinder #tabs-cropsFinder form #y").attr("value", Main.Defaults.ActiveVillage.Y);
        $("#tabsFinder #tabs-cropsFinder form select").change(function() {
            var index = $("#tabsFinder #tabs-cropsFinder form select option:selected").attr("value");
            $("#tabsFinder #tabs-cropsFinder form #x").attr("value", Main.Defaults.Villages[index].X);
            $("#tabsFinder #tabs-cropsFinder form #y").attr("value", Main.Defaults.Villages[index].Y);
        });
		$("#tabsFinder #tabs-cropsFinder form #x").change(function() {
			$("#tabsFinder #tabs-cropsFinder form select").val("-1");
		});
		$("#tabsFinder #tabs-cropsFinder form #y").change(function() {
			$("#tabsFinder #tabs-cropsFinder form select").val("-1");
		});
		$("#tabsFinder #tabs-cropsFinder #search_state").hide();
		$("#tabsFinder #tabs-cropsFinder #search_result").hide();
		$("#tabsFinder #tabs-cropsFinder #search_result").tablesorter();
		
		// OASIS FINDER
		$("#tabsFinder #tabs-oasisFinder form button").button();
        $("#tabsFinder #tabs-oasisFinder form #x").attr("value", Main.Defaults.ActiveVillage.X);
        $("#tabsFinder #tabs-oasisFinder form #y").attr("value", Main.Defaults.ActiveVillage.Y);
        $("#tabsFinder #tabs-oasisFinder form select").change(function() {
            var index = $("#tabsFinder #tabs-oasisFinder form select option:selected").attr("value");
            $("#tabsFinder #tabs-oasisFinder form #x").attr("value", Main.Defaults.Villages[index].X);
            $("#tabsFinder #tabs-oasisFinder form #y").attr("value", Main.Defaults.Villages[index].Y);
        });
		$("#tabsFinder #tabs-oasisFinder form #x").change(function() {
			$("#tabsFinder #tabs-oasisFinder form select").val("-1");
		});
		$("#tabsFinder #tabs-oasisFinder form #y").change(function() {
			$("#tabsFinder #tabs-oasisFinder form select").val("-1");
		});
		$("#tabsFinder #tabs-oasisFinder #search_state").hide();
		$("#tabsFinder #tabs-oasisFinder #search_result").hide();
		$("#tabsFinder #tabs-oasisFinder #search_result").tablesorter();

        // ANIMAL FINDER
		$("#tabsFinder #tabs-animalsFinder form button").button();
		$("#tabsFinder #tabs-animalsFinder form #x").attr("value", Main.Defaults.ActiveVillage.X);
		$("#tabsFinder #tabs-animalsFinder form #y").attr("value", Main.Defaults.ActiveVillage.Y);
		$("#tabsFinder #tabs-animalsFinder form select").change(function () {
		    var index = $("#tabsFinder #tabs-animalsFinder form select option:selected").attr("value");
		    $("#tabsFinder #tabs-animalsFinder form #x").attr("value", Main.Defaults.Villages[index].X);
		    $("#tabsFinder #tabs-animalsFinder form #y").attr("value", Main.Defaults.Villages[index].Y);
		});
		$("#tabsFinder #tabs-animalsFinder form #x").change(function () {
		    $("#tabsFinder #tabs-animalsFinder form select").val("-1");
		});
		$("#tabsFinder #tabs-animalsFinder form #y").change(function () {
		    $("#tabsFinder #tabs-animalsFinder form select").val("-1");
		});
		$("#tabsFinder #tabs-animalsFinder #search_state").hide();
		$("#tabsFinder #tabs-animalsFinder #search_result").hide();
		$("#tabsFinder #tabs-animalsFinder #search_result").tablesorter();
    }
};

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function () {
    $.ajaxSetup({
        async: false
    });
	Main.Run();
	Main.ClearQueue(true);
});