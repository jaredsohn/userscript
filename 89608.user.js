// coding: utf-8
// ==UserScript==
// @name           Khanwars V3 Mod
// @author         Metis
// @version        61
// @namespace      http://userscripts.zarenkriege.de
// @include        http*://*game*.khanwars.com/*
// @include        http*://*game*.zarenkriege.de/*
// @include        http*://*game*.guerrakhan.com/*
// @include        http*://*game*.lesseigneurs.fr*
// @include        http*://*game*.khanwars.com.pt*
// @include        http*://*game*.khanwars.es*
// @include        http*://*game*.khanwars.cl*
// @include        http*://*game*.deche.ongame.vn*
// @include        http*://*game*.khanwars.ro*
// @include        http*://*game*.khanwars.pl*
// @include        http*://*game*.hansavaslari.com*
// @include        http*://*game*.khanwars.it*
// @include        http*://*game*.hanovete.com*
// @include        http*://*game*.khanratnik.com*
// @include        http*://*game*.draugas.lt*
// @include        http*://*game*.khanwars.nl*
// @include        http*://*game*.khanwars.no*
// @include        http*://*game*.khanwars.se*
// @include        http*://*game*.pravyteli.com*
// @include        http*://*game*.khanwars.hu*
// @include        http*://*game*.khanwars.ae*
// @include        http*://*game*.khanwars.jp*
// @include        http*://*game*.khanwars.ir*
// @include        http*://*game*.lordwars.co.il*
// @include        http*://*game*.pravyteli.com*
// @include		   http*://khanwarsgame.madmoo.com*
// ==/UserScript==

// Based on "Ikariam Empire Board" script (for Ikariam)
// http://userscripts.org/scripts/show/41051

// Idea for Map-Overlay adopted from V.Nefedov & Bagatelle 
// http://userscripts.org/scripts/show/90409
// http://userscripts.org/scripts/show/60707

// Further Information can be found here:
// http://forum.zarenkriege.de/viewtopic.php?f=86&t=19323

// TODO-Items: 
//  - resource list
//    * live-calculation of resources in table (--)
//    * calculate food usage in camp. (--)
//  - overview
//  - building list 
//  - unit list
//    * units in marches? (--)
//    * unit in transfer (--)
//  - translations (o)
//  - PopUp-Tools
//    * march-time-calculator (-)
//    * calc res for build troops (optimized use for left resis) (--)
//  - march
//    * show arrival, return-time when starting marches. (+)
//  - Map 
//  - others
//    * march calculation (save troops, calc coords for entered time?) (--)

// -----------------------------------------------------------------------
// Fix for Google Chrome, use HTML5-LocalStorage instead of Greasemonkeys one.
// -----------------------------------------------------------------------
if (!this.GM_getValue) {
	this.GM_getValue = function (key, def) {
		return localStorage[key] || def;
	};
	
	this.GM_setValue = function (key, value) {
		return localStorage[key] = value;
	};
}

// -----------------------------------------------------------------------
// Logger
// -----------------------------------------------------------------------
if (!Logger) var Logger = {};

Logger = {
	Enabled: false,
	LogLevel: 3	// 1-Error, 2-Warn, 3-Info, 4-Debug
}

Logger.Log = function(level, msg) {
	GM_log("\n" + level + " " + Str.FormatDate(new Date(), true) + "\n" + msg);
}
		
Logger.Debug = function(msg) {
	if (this.Enabled == true && this.LogLevel >= 4) {		
		Logger.Log("DEBUG", msg);
	}
}

Logger.Info = function(msg) {
	if (this.Enabled == true && this.LogLevel >= 3) {		
		Logger.Log("INFO", msg);
	}
}

Logger.Warn = function(msg) {
	if (this.Enabled == true && this.LogLevel >= 2) {
		Logger.Log("WARN", msg);
	}
}

Logger.Error = function(msg) {
	if (this.Enabled == true && this.LogLevel >= 1) {		
		Logger.Log("ERROR", msg);
	}
}

// -----------------------------------------------------------------------
// Updater
// -----------------------------------------------------------------------
if (!Updater) var Updater = {};

Updater = {
	_ScriptURL:			 "",
	AvailableVersion:	 0
}
		
// CallBackFct function receive available version number (or null value if failed) as argument
Updater.Check = function(ScriptURL, CallBackFct) {
	this.AvailableVersion = 0;
	this._ScriptURL = ScriptURL;
	var self = this;
	
	try {
		GM_xmlhttpRequest({
			method:				"GET",
			url:				ScriptURL,
			headers:			{ Accept:"text/javascript; charset=UTF-8" , "Cache-Control": "no-cache"},
			overrideMimeType:	"application/javascript; charset=UTF-8",
			onload:				function(response) { self._ParseScript(response, CallBackFct); }
		});
	} 
	catch (e) {
		Logger.Warn("Update-Check fehlgeschlagen:" + e);
	}
}
	
Updater._ParseScript = function(response, CallBackFct) {
	var availableVersion = 0;
	
	if (response.status == 200) {
		var resReg = /@version\s+(\d+)/.exec(response.responseText);
		
		if (resReg != null) {
			availableVersion = resReg[1];
		}
	}
		
	this.AvailableVersion = availableVersion;
	
	if (typeof CallBackFct == "function") {
		CallBackFct.call(this._Parent, availableVersion, response);
	}
}
	
// -----------------------------------------------------------------------
// Empire-Board 
// -----------------------------------------------------------------------
if (!EmpireBoard) var EmpireBoard = {};

Resources = function() {
	this.FetchDate = new Date().getTime();
	this.Gold = 0;
	this.Iron = 0;
	this.Wood = 0;
	this.Food = 0;
	this.GoldProd = 0;
	this.IronProd = 0;
	this.WoodProd = 0;
	this.FoodProd = 0;
}

BuildingQueueItem = function() {
	this.BuildingId = -1;
	this.Finished = 0;
}

ArmyQueueItem = function() {
	this.UnitId = -1;
	this.Count = 0;
	this.Finished = 0;
}

Castle = {
	Name       : "unknown",
	IsCapital  : false,
    IsCamp     : false,
    Id         : 0,
    X          : 0,
    Y          : 0,
    Loyality   : 0,
    Population : 0,
    PopulationUsed : 0,
	Storage    : 0,
	Buildings  : {},
	BuildingQueue: {}, 
	Resources  : new Resources,
	Units	   : {}
}

MapItem = function() {
	this.Castle = "";
	this.Player = "";
	this.Clan = "";
	this.CastleId = 0;
}

SpyReport = function() {
	this.Content = "";
	this.Date = 0;
}

EmpireBoard = {
	DOM:			 {},
	DB:				 {},
	Renders:		 {},
	Khanwars:		 {},
	Handler:		 {},
	MineWorkers:	 {},
	StartTime:		 0,
	TimeToCaptcha:   -1,
	RefreshMode:	 "None",
	RefreshIndex:    -1,
	RefreshStep:	 0,
	CastleFilter:	 0,
	EndTime:		 0,
	LogEnabled:		 true,
	MainID:			 "KWEmpireBoard",
	BaseUrl: 		 "", 
	
	// Skript-Meta-Daten
	ScriptName:		 "KhanWars Empire Board",
	Version:		 61,
	HomePageRoot:	 "http://userscripts.org/scripts/show/",
	ScriptURL:		 "http://userscripts.org/scripts/source/",
	UserScriptsID:	 89608,
	
	MapZoom:		 1.0,
	MapX:			 0,
	MapY:			 0,
	MapFlags:		 {},
	TempPopulation:  0,
}

EmpireBoard.Renders = {};
	
Buddy = function() {
	this.Id = -1;
	this.Name = "";
	this.LastOnline = 0;
}

MessageItem = function() {
	this.Id = -1;
	this.Sender = "";
	this.Date = 0; 
	this.Text = "";
}

EmpireBoard.Init = function() {
	var flags = EmpireBoard.MapFlags;
	flags["old_mapX"] = -1;
	flags["old_mapY"] = -1;
	flags["now_mapX"] = -1;
	flags["now_mapY"] = -1;
	flags["new_mapX"] = -1;
	flags["new_mapY"] = -1;
}

// Initialisierung des kompletten Objektes
EmpireBoard.Start = function() {
	this.StartTime = Str.Now();
	this.HomePageRoot	 += this.UserScriptsID;
	this.ScriptURL		 += this.UserScriptsID + ".user.js";
	
	this.BaseUrl = window.location.protocol + "//" + window.location.host;
	
	// Log initialisieren
	Logger.Enabled = this.LogEnabled;
	Logger.Info("Start ...");	
	
	this.Init();
	
	// DOM initialisieren 
	this.DOM.Init(this);
	
	// Str
	Str.Init();
	
	this.Khanwars.Init(this);

	// DB initialisieren
	this.DB.Init(this);
	this.DB.Load_Options();		
	this.DB.Load_Temp();		
	
	Locale.Init(this.DB.Options["Locale"]);
	
	if (window.location.host.indexOf("twitter") > 0 ) {
		// WTF: keine Ahnung was Twitter hier macht und wie es sich reinhängt,
		// aber auf jeden Fall wird aus irgend einem Grund das Skript durch Twitter
		// mit einem völlig falschen Host ausgelöst. 
		return;		
	}
	
	if (EmpireBoard.Khanwars.IsCaptcha()) {
		// stop script if captcha
		EmpireBoard.Khanwars.AttachCaptchaClick();
		return;
	}
			
	// Renders initialisieren
	this.Renders.Init();
	
	// Daten laden
	this.DB.Load();
	
	// Update-Check 
	try {
		this.CheckScriptUpdate();
	} 
	catch (e) {
		Logger.Warn("Update-Check fehlgeschlagen:" + e);
	}
	
	// Daten sammeln 
	this.FetchData();	
	
	// Renderer starten.
	if (EmpireBoard.RefreshMode == "None") {
		this.Renders.Render();
	}
	else {
		setTimeout(function(){EmpireBoard.DoRefreshStep()}, 1000);		
	}
	
	// Ausführungszeit berechnen und ausgeben
	this.EndTime = Str.Now();
	Logger.Info("Ended after " + ((EmpireBoard.EndTime - EmpireBoard.StartTime) / 1000) + "s");	
}

EmpireBoard.SendRequest = function (mode, url, string, callback) {	
	Logger.Debug("SendRequest:" + url);
	GM_xmlhttpRequest({
    	method: mode,
   		url: url,
    	headers: {
			"Content-type" : "application/x-www-form-urlencoded",        	
        	"Accept": "application/atom+xml,application/xml,text/xml,text/html"
    	},			
		onload: function(response) {			
			EmpireBoard.ExtensionStatus(response, callback);
		}
	});	
}

EmpireBoard.ExtensionStatus = function(response, callback) {
	if (response.readyState == 4) {
	    if (response.status == 200) {			
	    	callback.call(this._Parent, response.responseText);
		} 
		else {
	        alert("There was a problem with the request. Please try again! (" + response.status + ")");
		}
  	}
}

EmpireBoard.CheckScriptUpdate = function() {
	if ((this.DB.Options["LastCheckUpdate"] == undefined) || (this.DB.Options["LastCheckUpdate"] < this.StartTime - (1000 * 60 * 60 * 24))) {
		var self = this;
		var ScriptURL = "http://userscripts.org/scripts/source/" + this.UserScriptsID + ".meta.js?" + Str.Now();
		Updater.Check(ScriptURL, function(availableVersion) { self._CompareScriptUpdate(availableVersion); });
	}
	else {
		Logger.Info("Not need check update today");
	}
}
	
EmpireBoard._CompareScriptUpdate = function(availableVersion) {
	Logger.Info("Available version: " + availableVersion);
	if (availableVersion != 0) {
		availableVersion = parseInt(availableVersion);
		
		if (availableVersion > this.Version) {
			this.DB.Options["HasNewVersion"] = true;
			if (EmpireBoard.DB.Options["AutoUpdate"]) {
				GM_openInTab(this.ScriptURL + "?version=" + availableVersion + ".user.js");
			}
		}
		else {
			this.DB.Options["HasNewVersion"] = false;
		}
		
		this.DB.Options["AvailableVersion"] = availableVersion;
		this.DB.Options["LastCheckUpdate"] = this.StartTime;
		this.DB.Save_Options();
	}
}

EmpireBoard.FetchData = function() {
	Logger.Debug("FetchData...");
	
	// Abbruch, wenn Bot-Schutz & Co gezeigt werden, da dieser Seiteneffekte haben
	if (this.Khanwars.IsCaptcha()) {	
		return false;
	}
	
	// Current cities
	this.Khanwars.FetchCastles();
	
	// Buildings
	if (this.Khanwars.IsBuildingList()) {
		this.Khanwars.FetchBuildings();
	}
		
	// Ressourcen 
	this.Khanwars.FetchResources();
	if (this.Khanwars.IsOverview()) {	
		this.Khanwars.FetchBuildingsFromOverview();
		this.Khanwars.FetchProduction();
	}
	
	// army from pohod (currently stationed in castle) 
	if (this.Khanwars.IsPohod() && !this.Khanwars.IsSendMarch()) {
		this.Khanwars.FetchArmyFromPohod();
		this.Khanwars.FetchCastleFilter();
	}
	
	if (this.Khanwars.IsBarrack()) {
		this.Khanwars.FetchArmyQueues();
	}
	
	// Map
	if (this.Khanwars.IsMap()) {
		this.Khanwars.FetchMapImages();
		document.addEventListener("DOMNodeInserted", EmpireBoard.Handler.MapChanged, true);
	}
	
	// auto fetch spy-reports
	if (this.Khanwars.IsSpyMessages()) {
		this.Khanwars.FetchSpyReports();
	}
	
	// BuddyList
	if (this.Khanwars.IsBuddyList()) {
		EmpireBoard.Khanwars.FetchBuddyList();
	}
	
	// fetch onlinetimes for buddies
	if (EmpireBoard.DB.Options["BuddyList"]) {
		EmpireBoard.Khanwars.FetchLastOnlineForBuddyList();
	}
}

EmpireBoard.ContentEval = function(source) {
	if ("function" == typeof source) {
		source = "(" + source + ")();";
	}

	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	document.body.appendChild(script);
	document.body.removeChild(script);
}

EmpireBoard.DoRefreshStep = function () {
	var castles = EmpireBoard.DB.SortCastles(EmpireBoard.DB.CurrentCastles);	
	var url = EmpireBoard.BaseUrl + "/overview.php";
	if (EmpireBoard.RefreshIndex < castles.length) {
		url = EmpireBoard.BaseUrl + "/main.php?";
		var castleId = castles[EmpireBoard.RefreshIndex];
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];	
		
		if (currentCastle.IsCamp) {
			url += "campId="; 
		}
		else {
			url += "tpid="; 
		}
		
		url += currentCastle.Id + "&location="
		if (EmpireBoard.RefreshMode == "EmpireBoardResources") {
			url += currentCastle.Id + "&location=overview.php";
			EmpireBoard.RefreshIndex++;
		}
		else if (EmpireBoard.RefreshMode == "EmpireBoardBuildings") {
			url += currentCastle.Id + "&location=buildings.php";
			EmpireBoard.RefreshIndex++;			
		}
		else if (EmpireBoard.RefreshMode == "EmpireBoardUnits") {
			if (EmpireBoard.RefreshStep == 0) {				
				url += EmpireBoard.BaseUrl + "/pohod.php";
			}
			else {
				url += EmpireBoard.BaseUrl + "/barracks.php?unit_type=" + EmpireBoard.RefreshStep;
			}
			
			EmpireBoard.RefreshStep++;
			if (EmpireBoard.RefreshStep > 4) {
				EmpireBoard.RefreshStep = 0;
				EmpireBoard.RefreshIndex++;
			}
		}
	}
	else {
		EmpireBoard.RefreshIndex = 0;
		EmpireBoard.RefreshMode = "None";		
	}
	
	EmpireBoard.DB.Save_Temp();
	Logger.Info("Navigate to: " + url);
	window.location.href = url;
}

// -----------------------------------------------------------------------
// EmpireBoard-DOM 
// -----------------------------------------------------------------------
EmpireBoard.DOM = {
}

EmpireBoard.DOM.Init = function(parent) {
	Logger.Debug("EmpireBoard.DOM.Init");
}

// doesn't work in chrome :-( 
// the created document can't be queried via xpath 
// if someone knows a working solution, let me know :-)
EmpireBoard.DOM.Create_Document = function(responseText) {
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument("", "", dt);
	var html = doc.createElement("html");
		
	var idx1 = responseText.indexOf("<html");
	if (idx1 != -1) {
		var idx2 = responseText.indexOf("</html");
		var body = responseText.substring(idx1, idx2 + 7);
	}
	else {
		var body = responseText;
	}
	
	html.innerHTML = body;
	doc.appendChild(html);	
	return doc;
}
		
EmpireBoard.DOM.Get_Nodes = function(path, root) {
	var contextNode = root ? root.evaluate ? root : root.ownerDocument : document;	
	return contextNode.evaluate(path, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
	
EmpireBoard.DOM.Has_Node = function(path, root) {
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1) {
		return true;
	}
	else {
		return false;
	}
}
	
EmpireBoard.DOM.Get_First_Node = function(path, root) {
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1) {
		return value.snapshotItem(0);
	}	
	
	return null;
}

// -----------------------------------------------------------------------
// base64 encoded images
// -----------------------------------------------------------------------
if (!ImageData) var ImageData = {};

ImageData = {
	RefreshSectionButton:  	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAY2SURBVEhLjVZnUFRXGF0m46/EJJNJMWYSu44l9kqkCkpUVMSOKEiTKiAoIF1EacsirCAqIJ0VUJpUqYJYKMKwIiBiQUAhIgLqOHhyv7vuGsc/2Zkz73tv7/vOPV+7T0nw8bdOZT4mfDUkAD7IHwmUlJS4Tddx48Yp7hULPhr0/9jYmODDhw+C9+/fC/rHxgvyq6Wyl+lnpDEZZio/Yf+K72C4bDz2Lf+W2wSjld9zhFqoIebIJlxw1uVXORKO6SM32BS34t1wO+EY8kMtcNxgCUxUJ4A7X686H6arf4TBkq859i795gsSIg0y+QtJHtuR6L6Ng+z/3mecMMSdRHf0VZxFe04QTu5fAb3V0yEw1pgEK82JOKg+AZYavypAig4o/8CV0QZOGC5DqvcupPnshsR3z2eg50R20VUPFWcd8LwyGmWRh0C+BaZaU+G/bzkCjFcp4MskhpspQ2i0FGILFaR6bMMlnz24HufOUU2IdUVl9GHukJyVnrFDcbg1CkQH8bQkAo+LTsNGdx4EJlrT+O4CDygj2FQFoVbaiHXRR6StNoMWEr0NUZ0WirslaeiR1qCroQxd9cW4X56Cpqww3Erywo1YF9TEHMH1806cTJrpj/7r52Gvt1BG4Ld3KULMVBBspoZMoT0arqWjKMYPZSkiNFbmovdxB4aHXmF0ZBgjQ4MY6n+G553NeMyIpAXnUJfii9o4V05SGe2IJokvXlSd+0Tgs3sRr5IQCw2UJARi6GU/nj1sRXdnK7MHmOMRDPb34VVvJ/rabqO7uQLdTWV42lSOrps5aMkT406yF25edEX1BWc0pnpzAoeti1gOtKfDc8d8ThB+UBWlScF4+/Ytd0p48+YNXr7oQUtNPrpvZ+NRZQKkeREcbSWxeFiTgfbSeNzNCOBVdCP2KBpSvHiiOYH5upmcQHRQHZHWmpzg3bt3nITwZnQUD5trURjjiwcFEWiU+KExzZej5UoQ2oqi0XEtFi3Zoahnjqkf5ASO+oshsFw/GxSiMEuNLwiIiBQ8bW9C0QUvtOeGoDkrHG2szhtYGO5dCUBbnghtBWJIs4W4y2Jfl+TBQ0QKOAEpcNadAVe92fA3UkZJsugzBbJwDaOzqQYPiiLRfScHQwM9eD3Qi+F/CH0cg71daC2OReU5J166nVeFOLRlgYyAnDttnA73HQuRHOKEnq42ltRehh4efxmeoSYzEvWZQvQ/bmWhG1GEUR5OaVkqisJteC/czwr4ROC+bR6O6c+Fx44FCDDTQLSbAVKDbJF4whzZpx2RHWaPK0JbSPyNcTPJB/dKEjHQ/YDnR+6cwnmvQoJisR2fR9QLCgVEQN3stXMBC9MqRDhsRoy3CeKPm+CM42aE2ayFyEoLyV67UBvvjrp0Ifo6mz5TQQTS8jRGcIgPP+oF3mgUItq90FyVT0E/1tVhNjpICbTBZbEbJ4ly0kO08xbEe+5B4XlPPGosxSsWQioAUiFX0lKWhsJwW+QEmaA+2fMTAeWAypTGBY0NariLPsYojDuFivQzKE0JRVmyEDdz41jJ3mBJ7sMoy8HI8BAGnz/lGGV2Y1ECroqskBVgzDrbRUZgtnYGjm6exRWEW6/hY5Zmkth+AyQsD1UZUZDWFuLJ/UYM9D7ByOshtuNhpqAHPffr0FZ1GR3V2XjSWoeajHBkBZmCRjdVkoKAypTmUZS9DldBcynMUhNnD+tCEmiFyksRaK7KQXt9BToaKtHZUI5W5rg2XYS8iMO4KnZGVWoICqJckHnSCJeOGyAvxEyWZBoVhzdM46Bmo7EtU7EaQjY+Iux0EOdpgDRGlClywGWGPLET8iMckB1sAcnxvZD4GSIzwBSZpw6wc4KtZWdGitdOWG+cC8EBzcmwW/sHzFV/xpFNM+G7ZzGvJupuskmZ//6VCDRh09acBqI6REyd2G4tDyltiuaYHJRLsukENNOeBsEmtXmw1f4dFmq/8BPMes1vXA0l3m3rHA7eI9v/5DOLyL13LeTEVHW0Ebqn5wRaQyAfO9VmyM5lc/WJ3DEdm3Q8EhHZRGyvMxkOf0+B4/qpilDSy6SWcicPL11pDeHQukn8/c++PraqzwF9XRhrTuEgWw75s/9zpXd2qM9SOP8XplOgKx8A3IsAAAAASUVORK5CYII=",
	MaximizeSectionButton: 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAWzMLXDQMXTUNXjYOXzcPXT4dXj8eRz0uSTsqSj4uTj8sUTwkVz8lYDgQYjoSZDwUZT0VZj4WZz8XYz4YX0AfVkAnUkAqX0AgYUEfZkAaaEAYaUEZakIaa0MbbUUdbkYeb0cfYEEgYkIgYUIhYkMiY0QjZEQiZUUjZEUkZUYlZkcmZ0gnaUopa0wrbE0sb1AvcEggcUkhckoic0sjdEwkdU0ldk4md08neVEpelIqe1MrfFQsfVUtflYuf1cvcFEwcVIxclMyfF09UFZbWF5jW2FmX2VpeWNNeWRNYWdraW9zf3RogFgwgVkxgloyg1szhFw0hV01hl42h183iWE5imI6i2M7jWU9jmY+j2c/kGhAkWlBk2tDmHBInXVNnnZOhXxxhXxyhn51hn52oXlRo3tTpHxUpX1Vp39XqIBYqYFZqoJaq4NbrYVdr4dfsYlhs4tjtIxktY1lt49nuJBou5NrvpZuv5dvwZlxwppyxJx0yKB4yqJ6y6N7zKR8zqZ+z6d/op+doaCds7Kxs7SytLSzubq70KiA0qqC1q6G2bGJ27OL3raO4rqS5LyU6cGZ6sKa68Ob7MScwcPFx8nMx8nNx8rMx8rNz9HS0NHT09TV09TW1NXV1NXW2dvc4OHi7u/v7/Dw+Pn5+Pn6/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoW7mZAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAB0UlEQVQoU2P4/59Dgp2dXVRUSUsbDHQ0Vdk4//9n+K8kyMrMwsrKxxeVEJ+QkJBWVFtXEiDyn4FLgJGRCSTDHJ6Rnp4BxHn1E3pCeBgkZaVlZGQE+ROb26dObW9O9MjKSK2cWCHJoB4cGhrq79OyYPGy5cuXLV7Q4lNeVtrfp8+gFhQWHpQ8e/FyKFg8N7m6omuyA4NaYESoz+ylMPHly5fO9anqnASU8IvybF2CEF++fEmrZ8ckRwZNu6jEBcjiy5cvSGqc6MigbRfdhKIBqKWpcaITg65fTDvQPchgWXsHUELbzHIaUHSRFwwAOTMqew0YtC1NQRLLZ7m6gIDbQpBEaTdQwsYaYtQUd6C493wga1l7SRdIIhhq+RRXF+85ICVLmoo6HRi0rSNhzp3pBlIPcm5hA1DCMjqsDepekPlADW1FBTUODFoWkbE+c5GDZJ5Pfl4lUMIsMC4seS4iEOelZOXlFhswaJqYxISGIAd7Vk5OdqYeg7KCkLm/vZ9/UnP79OntzUkxzlFR0VHhGgzc8sL8ciaWVlbWtnb2voEBfr729nZ2JrwM/6XkpAX4peUNjYxNTEzMzYCEsbGiNDCV/BdXUlFRUgIScKAk9v8/AIFj9lZgu5irAAAAAElFTkSuQmCC",
	MinimizeSectionButton: 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAWzMLXDQMXTUNXjYOXzcPXT4dXj8eRz0uSTsqSj4uTj8sUTwkVz8lYDgQYjoSZDwUZT0VZj4WZz8XYz4YX0AfVkAnUkAqX0AgYUEfZkAaaEAYaUEZakIaa0MbbUUdbkYeb0cfYEEgYkIgYUIhYkMiY0QjZEQiZUUjZEUkZUYlZkcmZ0gnaUopa0wrbE0sb1AvcEggcUkhckoic0sjdEwkdU0ldk4md08neVEpelIqe1MrfFQsfVUtflYuf1cvcFEwcVIxclMyUFZbUVdcVVpfeWNNeWRNf3RogFgwgVkxgloyg1szhFw0hV01hl42h183iWE5imI6i2M7jWU9jmY+j2c/kGhAkWlBk2tDmHBInXVNnnZOhXxxhXxyhn51hn52oXlRo3tTpHxUpX1Vp39XqIBYqYFZqoJaq4NbrYVdr4dfsYlhs4tjtIxktY1lt49nuJBou5NrvpZuv5dvwZlxwppyxJx0xZ11yKB4yqJ6y6N7zKR8zqZ+z6d/kZSXnqKkop+doaCdpqmsp6qtqKuus7KxsLK1s7SytLSzubq7vsDC0KiA0qqC1q6G2bGJ27OL3raO4rqS5LyU6cGZ6sKa68Ob7MScx8nMx8nNx8rMx8rN09TV1NXV1NXW4OHi9vb2+Pn5+Pn6+fr6/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMo2IoAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAABx0lEQVQoU2P4/59Dgp2dXVRUSUsbDHQ0Vdk4//9n+K8kyMrMwsrKxxcWEx0TE5OUV1Vd4CPyn4FLgJGRCSTDHJySnJwCxFk1UyYE8DBIykrLyMgI8sc2dc2Y0dUUm5GWklg6tUSSQd0/MDDQ26Nt/sKly5YtXTi/zaO4qHDyJH0GNb+gYL/4OQuXQcHCufHlJX3THRjUfEMCPeYsgYkvW7ZkrkdZ7zSghFeYe8cihPiyZYs6KnqmOTJo2oXFzkcWX7ZsflzdVEcGbbvwRpiGdoiCRY11U50YdL0iuoDuAYF611YwvbSrByihbWY5Eyru4uwK0TO7dKIBg7alKVhicYMzCHSD3De7sB8oYWMNMmpxM1gcKAMyqqAPJOEPsnxBCwyALM/rdWDQtg7FdG5uLVDCMty9E9WDne45lQ4MWhahkR5zkYNknkd2VilQwsw3Kih+LiIQ5yWkZWXmGzBomphEBAYgB3taRkZ6qh6DsoKQube9l1tcU9esWV1NcW5hYWHhYcEaDNzywvxyJpZWVta2dvaevj5envb2dnYmvAz/peSkBfil5Q2NjE1MTMzNgISxsaI0MJX8F1dSUVFSAhJwoCT2/z8Ah/b1Zv3AaFEAAAAASUVORK5CYII=",
	BuddyOnlineIcon:		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAACbSURBVChTY2RAB/W8FgwMTBxg4caPBzDkwQL1/A4Mdbz3Ger5/sNxHd9zhnreBFQN9XweKIqQNYDZvAUQDfUMHAxgE5BMRGfX8X1nqOeSAComZCrMEJDp9XwZ+J0AV9wAUhxBnGK+ClAoCADdDHQTHjeD5fgNoJ7kbcDvQd7lqMFXx9ePVUMd33pwiGHGHo8GMEyBtsAxMDYRAABEooLZ5LwhSwAAAABJRU5ErkJggg==",
	BuddyOfflineIcon:		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAACVSURBVChTY2RAA/X19RZAIQ6QcGNj4wF0eTAfqMihoaHhPhD/R8LPgeIJKBqAAh5oipA1/AfKF4A19BYWcgIVPsenGCj3HahBAmQ9XlNhhoBNBxIZBEwFOwmorgGkOIJIxRUMyyIixEFuIqQBaKgBLNiAalGCDCU0gHLLUYIPKNCPQ8N6oKngSEIPbw2QR5AwKDbhAACXBtvmjJuJpwAAAABJRU5ErkJggg==",
	ArchiveMessageButton:	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAABp0RVh0QXV0aG9yAFVsZWFkIFN5c3RlbXMsIEluYy7JHT52AAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS420IOtWgAAAfRJREFUOE+VkN9vS2Ech9+64kYIF9y44MaVCwmZiAsJS6VlTZaU1LK0mx9jWMQIW8KGWLWZiM5cWATZeqrH6djFWSkXgkSbimwtPavTw/wDZhe1LnY+vt9XpJFUwps8ed837/Oc9+R1CBqlePMimpYSy3j/9+H4KgRm13nvQzoUrjDj/muWdvDH50dHUQsrcWihpAZC5C7/HTlos7kYb53IxY6VJ2InUIv8g+PzH9UD78jdSDj4tiUl1X8yNxyYSwZdC1pXHWoxHnTZ7NCtHdQs5nCVqba+fjXoqyhnttSM+EPK6TqQM0/uG2pWC7rNU1BaynqwofK4e2vlZWgnJOE/obOy3rfnu6G0zFmqfx/fmDfjzTCiTbYx7LPf3/UiG3Ehc32XJBtx48M9L4wRn22MNNnsUjMl9Cs7oPU6JaOXnEherUdmYDfeDrglmZtu6MF6JC7+cjSauRHRs9sxa6YwY4xhZkpHWulGKuRC+pYH6UEPUmE3suoFfCuOS4ddbsRQ+yZ8edqDYnQ/rEQ7rGf9eHHnFJI3Dkt4baXCKGlt0mGXGxEJbIA51oXcUCNytxthxI7g05M+TD/vl/DaiLXJ80mCXW5EeO96FNRO+SBV6PfoUapUz9jlRlxuWIvCw3PIRzv+CXa5EZ3bVo6ed67B/8DNT4TT2y9/14n9AAAAAElFTkSuQmCC",
	MessageSendedIcon:		"data:image/gif;base64,R0lGODlhEAAQANUAAP/yz//tvP/npf/ehP/beP/NRP+/D/CwAO2uAOeqANadANKaALmIAFSrSlzVSlaqSVnQQXHiW3rgZnDRWYLta4nwcofscGLURXvmYFyoRIHdYeOnAMuVAPS0BP29Df/AE//FJv/IMf/JNf/OSP/RU//WZv/gi//kmv/prf/qsf/uwP/12v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAAAQABAAAAaYQJZwSCyyQpyFUsFsKpWhg4GwAliv1tXAk+gUDAMsdls4dABfAkAgCAgAZMDhYP2aBATCaUuyIhIAKgEiUwOGAydvAAh0ASkkhIYfKA2KCQhuAgYlBIYEAg2VAJduBgGnoakVDSiXmgJ3AQ0TGhQVFhgPIxsha2wADRK2FBEOFxkhDMrKIA0WFcQOEA1GQqmh09VGodrbREEAOw==",
	MessageReceivedIcon:	"data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAEpnq0lpqkRwqEF20EV/1Ep41VmI0VuM4mGa3WCW5maS4Guc7XCg7HKi8LmIAMuVANKaANadAOOnAOeqAO2uAPCwAPS0BP29Df+/D//AE//FJv/IMf/JNf/NRP/OSP/RU//WZv/beP/ehP/gi//kmv/npf/prf/qsf/tvP/uwP/yz//12gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAi5AP8JHEiw4D8OERJGkMCwoUIIHChgGMFihcWLFlmIyGDBgoeJGDGOyODhgoUVH0esMJHChIkVGz2suFDBIoiJJUSIMEGCpEULNVeWGEF0xMYOKVSsoEDBookAJzQQzdABBIoUKyw0fRrARFERITK4TFGBwokADgKoVZuirViyHwQoaOCAQYIDAVqSMCG2woACBhAwqLsgwEqXKzhM+BeAQODBDQJseECZMgeBjdeqNUhwM2fOAT4PDAgAOw==",
	IconMapRes:				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAMAAADHVLbdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAANDM1Ozo6Ojs+PT1BV3khWXkkW3skW3wjW34kXn4mYH4tQEBBTEtNVVdXW15UWltaXF9ZYGNbbXlZcXteXYAmX4AnX4AoX4IoYIAoYYIpYYIqYYIrYoIsYYQqYoQtZIQsZYUtZYUuZYYtZoYuZoYvZ4gvZIA1ZoI2ZYQwZIQxZoQzZ4cwZ4YyZ4Q0ZYE6aoQ5boU9bIc9aIgwaYkyaYsyaYs0a4o3a4wza440bI00bY41cI09cpM6dJU8dJc9coZNcItAc4xDdo1EdI9GeYZLeo5NcoFZdIpSd4lbeo1XfI5QfohaeZBJe5NJepNOfpBLfJVQfJFbjDsLmUMNnUESnmQwokkOsV8brVsgrm4+v3gqh2VHmXhJg5JUhpVVhpFbi5dVjJZWjZlckIBeiJB0k5VpjaBdlaJfjKBnl6ZtnaZjm6dom6t8t4RPtotXsp1PoZZjpZ5op6JdvqJWqqdivaVssax3yIIt0Yw726oyxolA0ZJD0pdG1phN0Jhb1a1G1K5I37hF1q1u3qli16xy2Lt/5LxK5sFI6cVN58Nb58xu6MdjhIKAnqiFnqiKoaKcxLaLx8WIwMCX1cGU7duN9MCD8MSJ5NO289m3+ty4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgt30AAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAA60lEQVQYVwHgAB//AP8+IgYKNTszIBshNTozJAD/PHN0YSw7OEpljm1pKxwA/2yBgoh1KyMyDwENjZCPAP82a4qJenAoCS8OAxJIKgD/PzVojIeAkgUUDAQCSTkA/z4mG1CLlWoHRxMREFI+AP84GyAlTk0XGRslREEzPQD/FwspNTMgIBkbIyMaGjUA/0uFhmc0MzU3Y1FPKTM4AP9gbpeZk0EkXlp9fnZCIAD/HWZ/lpqYX3J5W3h8g00A/xgfTG+ElHdxWFNUV3tiAP8VHhxAZJFDMF1cWVVWMQD/GRsZGUEuChYlLUZFJwgRFkNaZRipPgAAAABJRU5ErkJggg==",
	IconMapPop:				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAMAAADHVLbdAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAJBILMyAXNiQVOCYdSi0cRzEhRDQjSjEiTjMgTDkqUDonVj4rVUEoWkAmWkEvXEkuV0Y+XE49X1A7VnkfWHkgWn0jXXomXH0kXX4lZUgrb08rYks0ZEkzb1MvZ1U9bVY3b1Y+dVk5dVw9f145YH8pXFNOZFFEaldJa1hUb19SaFpaaVxYc1tBcFxCdltAcVtKcF1Sd2BKfWNCe2ZPfmFJe2lZc25qe3Jtf3ZtXYAmX4AnYIEoYIIpYoMqY4QrY4YsZYItZIUsZIQtZIYtZocuZ4gvZ4owaIIza4A2bIQ2bIQ4b4Q5b4c8aIkwaYoxaosya4s0aYwyaowza440bI00bI41bo82bZA2dJU8dJY9doVAeYdCe4ZIfodIeJlAeZpBe55Eh2Y8k3I/gmlBh2pHhmtKhGtPiHFWjnZVjnhblHhalnpbiHpvgoBKhIRRhIdaiYFbhJBYhJJYjIJjj4NpiY5hjIJ4iZlgi5pklIFrk4xhlItlk41ulI1plo9qmYdtlIR2k4V9lYxykYl7lIp/mop8m4x4kpdonZBymJB5nJJ7npN/g6RLoodTpY92rZFpqpRyq5l/spZvmo6BoJOApJGDppuMqZeCr5+PraCVtqCFt6SNsaWY0bmG4MWWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvJJkVQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAA5klEQVQYV2P4nxDpJmEdWDmryNk1ONSP4b9fsL+9fUWuemuxf3iYG8N/SddQv9gePk7h6XFhoS4M/91DItzrtHg02C1rgoOA/MSoEId6bdZUFvPqkJAghv+9kW72eeXc0lwtfuHh4Qz/44PtnKLnqjHqzIwJ9vdn+B9g61nWZSHIb9jU3eFjy/DfxqO5SpmZSVeJTWhqJ9B+p4zSPhVZXgEFRRm5dicgvzArLT1lQqZedo6UGdA+K69+A47k+RNN9I2NGoH6xVTz2zST5k02lW+YViDC8F/CxtG7ZMac2ZOm1PqKiwIAYQBKcndVJEQAAAAASUVORK5CYII=",
	IconMarchRes:			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAKDSURBVDhPY2CAABZVVVUuIM0E5cMoEJ8ZiBnRxBkY5s2bJ3Vsfcnq40ujXh3Y0JOvqKjIDlXEOGXSpI6F8+asO3Rw75wTxw5X7Nu3N1BBQYEfZBHDnfPri6+u9/x3f4fr/xeHPP9e2du8sL6+XhRkS1dnp4+3l88nSwur/wEBgf+nTOr/v2zJ4jf79+1rZLC1teU4u7e/6eWRmD8vj/r+v73K6P+p5TGnNq5drA1y5owZM1LtHVz+W1nZ/c/Nyb0wY8ZMn8TERB6Y01mvHJtf9OZU6o8ne7z+X13r9v/D4zV7N2zYIJmZlnHCytr2v62tw39nR+f306ZOC0b3L/P2Nb2h7y8Wffp0b+KP+zcPlm7evFmipLB4Wn5+werAgOBvmZk5j2bPnuOAEVCgUD2yZ5n1gV3L7aGhCVIDClGWNavXWNXV1UkghzBIgg0cUtgBZlSA1K1dvsD+1sb6aw8PTNwwf+40TeS43LJyocqG7tLJB5b35p/eOCVv4ZypKnAb183pbdnd7vf/07GO/5+ub/1w68yOhoyMDEGQgt3rlkTtqnL8f36C1f8rU13+31yZ//TEjgXxYNf19PSIrZtae/TeosT/387M+P/zwZH/759cubxy3nTLK5smbL3Qafl/V77y/0MVKv/PdFr8v7E0+c/JXcuDwL7q6uoSn9Vesv301Ij/zzfn/b+4qfH/9b2z1u+bXTttRajI/3pjrv+9Zlz/p1hx/d9XZ/z/8JqefHhwWFhY8PQ0V02Y1xr35+qxeT8ObJwZPWf2LOlVTVnTJucnrNtf6fRjZbjW35XF/jdWLJqlgR6OrItmTQhes3imHXp0AKNCZtWqVbpGRkagVMMIAA/LKKm4OIeuAAAAAElFTkSuQmCC",
	IconMarchPop:			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAISSURBVDhPY2bADpiAwqxAzAyV/o9DHYowSLHAiWNHO4C4H8gWAWIWQhoZlZWVBffv3TGtODn0f05c4P+N61dtjoiIkAdqBLkCJ2BatHChfUdVyufMANP/ib6W/8vSQ/7s37e3BqiDDZ9Glu3btsVGuDv8T/J3+B/nZ//fzdzg/4Z1a5cDNXHh08i8fPlyt4LkuJ9Zvjr/a+Pt/vs6mv/ftnVLO1ATOy6NjCBJOTk5lc2bNhwwV5f472ok87+nqe51amqqC1COG5s/QR7nX7p0qffObVvX9nS0vfQy0/gf5278v7O2/MvS+XPOHD18uCwoKEgGOYRBNvGuW728a2J9+s8UT83/YY56/130FP6nBZj/L4my+x/mbPi/KiPg//6dm/YD1QrBbGbq7OzU6Wss+LlyUvr/xnT3/9mBZv8rEpz+50Xa/K9McPlfGe/6vznD+39becK/Xbt2BcNsZSopKVHcuKjvdmWC+/+qOKf/XXl2/4+vav0/uS72f3WK5/+WbL//JTFO/zOCnP5ev3atFJqqGEBO5ejr6XBat3jG7XA7/f892bb/r+yf/n9hR9r/3BCX/12lAf8n1eX/2r5p7bKEhAQp5EACa46OjlbZvnlj14aFXVd2r+z9sHxCydelM5qeLZo7fd+mTZvCQEkRiGHpFyOdcuvq6kr19/ebz549276wsFCbi4sLFCCgeIQnOwB9vNXDMYIz1AAAAABJRU5ErkJggg==",
	ButtonAttack:			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAW/SURBVEhLjZZpUFNXFMcfOn7oTO3itGrttKiIjkvdiksB2RRREGVRAS0YhLBFIYDEIgIiiICCBBVNTEBCQIOKEqAK2FIsYrEuUFqrdboC02rtONPFUSD8+86JieVbM/Ofe99N3vmd7d4bG+H5x2vZXEwc/acADFuWBBsbG57TOGbMGOuz9QfPJ/S9yWQShoeHhcHBQeGRaaxw8eod88v0kbhPhnTZm9iy5FWELhqLsMWv8JwkWfoa61C0K8oUa6FN8eXRosq0QDQcjMR13S58WZmGi4eikb35fUS4TAQb93aZi0jnN+Dn5weVSiVKjSPKYmxxmmCFEPRAhBOq0jdAv3s9i+b/fT63LxQ39LvxoE2F+/UHsH/LEvg7T4MQ7m6LOI9JkMvl6OrqwtAQMPDMhNISJbY6juPIyIF9oYtwek8wDFkhqNm7aYRonWAVqf5oUyXi4RU1Wo8lgGwLkSumIjdsMQPo09l5HYODYFWXq6GULoNe4cP6tDSe9dlxOa6ok9gYiYzResthGS4Vx6Dv8hH80lyCbb5zIESssGPv5PEy0fshdHd3Q61W48mTAYYUFyuhU/gy4PapTDbUUabAtfKd6KxIxRcnP+I5rbVrdjDsTm0uHrVrIPefbwbkfOiAfRJnhvT09KCurg4ajdYaiaGyDCVxHgywiAxSUUlUYALRGkX2Vc1e/P75iReArJAF3CV5kqVIiY9GY2MjmpqaoNdX4dnTIQyJkVSUadB9Lm8E5GZVOm5VZ4BGAlFEV7Up6Dq9hwGJAQvEGnhOQ8bGuQw4FL4I+aEO8Pf3R3NzM9ra2tDe3m4u/IAJVbqT+M5YMALSbchigwSiLqJ0UZRUaAZEeU1nQHGMGw5LHVEkcUBBmAOSt0ez8f7+fjz47QFMIoTUUGvAdX0GG+k5k42vz+bwSCCCULosgKTAhRBivWeCUqSMdbcCCFIavxKxURHo6+vj7uro6BCjGILJBCiVSoZ8e34/7l7I46JaIJQuiogiYABFkOJrj1R/M4g2FEm3KwD5UnfEy2IYQKCamhoGkIxnT3G6CHBNGwND6nRcKlxnbd8fPi5Cgt88M4CM71gzDTvXzWBZAAQhFe7PQm9vL1pbW6HVavH06QBDyjVqXCqR4EbZeOCP02hXCrwPSPfq8l8Adq+fg7TA2aAxfcN72BM8f0QkGoUfgoKC0NLSAqPRiOzsbAb89fhX3K0ezca/qRyFzlIBTcpYPo8obdYIyDDt5sygedi7aSEfVjS3pIvGXIkjEmVSNDQ0sGp1eeg6+TLQn4l+o4BbOeNRnxbKADr8aC/wRqMUkfdFUS5smDYdHVQFWx2tAPrusGw5jstXIWxzMC6c0bHx4X9u4/saAb3VtqjPCUZzSRx7X38ggjvKCqAaUJuSUTo28sM/QKF4BnHrioapo1SJq3Ei2QelCS64o7dhz+9VC3h8WbxCfo5Db8M4GNJd2fu6/HDe2QyQrrTnwlq8JO8pJfRMx8PR7Z7suTrJG5poL3xSIMD0sILT8lP5WHRpBfzdJkIeVeD+eXsYMjxBRzcdglYAtSmlhgxRFBbvj2xbgWMJXmycLhq1lxNuqAQ2Sjk/nxaCH0XITbWAgWsiRIxKHfsSzmRvRmOh1FxkOiqSfexYtNkoPRTFwUhnjsKSJo5kkxuMUW+xDImBqM0Ng07qg56i13HrhIDWgwI6zyWjSmGLU5lBkK2ZDWGrx2TEr3wXUS7joVg7nbuIOog2Hc35pBXrQlCCU4QEJiDVh5xShjjh+FIHNGSO4ugMCoHTLPW0g7DWdQ62e76DaNcJfIPJlr/N0VDhdwXMYlGX0f6gM4vgtE8ITF1HjtAzrZdtnImL4XZoEe8MshHkam++l6PcJrHhGLeJfD0SiOYElq+ajMTVU5DkPdWaSnqZoqXaWdJLI/2GlOBly++P+PcR4DYL9O8i3GMKi+YWWdb+z0jvbHSbYTX+L+Q3TPzO5SPDAAAAAElFTkSuQmCC",
	MapIconSpyReport:		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAgwUWigAUjgMQjAIRjAQTkwENlwAOlQAPmwAMmAANmAAOnwAKnAAMkAARmgAXogAIoQAJrQANoQATrhQYsQQHsQALsQQItQAJtQcLugAHvAAGvAEHuQAIugYPvgMJsQQRthcYow8ishcjwwADwAAExgECxwUGwQMJwgUKyQIDzAUFzwcHww0RwA8QxxETxBcbyhkZzRoZzR8f0AgI0AkJ3BQU3RUV3BcW3xcX3B0dziYkzzIs0DEr0DIs4R8d5B0d5R4e6SEh7ycn5Do58Soq9S0t9jQy9zUz+DAw+DIy+jMz/DQ0/jc2/jc3/zw6/T076EM87kE79kI7/0E+2khJ9F5W82tn9nBr+3dx/3tx/Kul/+nn/+/tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA49LSHgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAAiElEQVQYVw3BhQLBUBQA0GuasT0x8eQw3d3d3ePy/5/xOAeYhuOsbo+v5GKgFwQ51mo22tcokMAdEVfrxbIHpIhJ5YGH3XYAYgWztQvejvs+2CI46+D7tJl2gZdCiOfvaz6pAk/9CaWuftRxGcyUxjO50ROHBdA6HZI3mErnwwSYzm4yWv4M7AcEuBogREeN3QAAAABJRU5ErkJggg==",
	RecallButton:			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAQywORy8QTTUVTjUWSzcaWzMLXDQMXTUNXjYOXzcPUjkXVjwaVj0cWD8dXT4dXj8eRz0uSTsqSj4uTj8sUTwkVz8lYDgQYjoSZDwUZT0VZj4WZz8XYz4Yfz8AWEAeXUIbX0AfVkAnUkAqX0AgX0YiYUEfZkAaaEAYaUEZakIaa0MbbUUdbkYeb0cfYEEgYkIgYUIhYkMiY0QjYEYhZEQiZUUjZEUkZUYlZkcmZEkjZ0gnZUsmaUopa0wrak8pbE0sa1Erb1Avblc3cEggcUkhckoic0sjdEwkdU0ldk4md08neVEpelIqe1MrfFQsfVUtflYuf1cvcFEwcVIxclMycFs+cV5DcmBHfnx4gFgwgVkxgloyg1szhFw0hV01hl42h183h2QzjmA0j2E1iGA4iWE5imI6i2M7jGQ8jWU9jmY+j2c/k2U6kGhAkWlBkmpCk2tDlGxElW1Flm5Gl29HmHBImXFJmnJKm3NLnXVNnnZOn3dPpHZLoXlRonpSo3tTpHxUpX1Vp39XsIAGv5gFt5o9qIBYqYFZqoJaq4NbrYVdr4dfoplbsYlhsopis4tjtIxktY1lt49nu4xhvY9muJBouZFpupJqu5NrvJRsvZVtvpZuv5dvvapCu6pItaRRsaNatKhVtKlbrahsqah8rah+yo8AyY8CxJENy5EAyJEHzJIAzZQCzZYCyJEIwp4jxKElz6Agxa450bEm5LYG5bgJwJhwwZlxwppyxJx0xZ11xp52x593yrVYyKB4yaF5yqJ6y6N7zKR8zaV9zqZ+z6d/3MwW2skp6cIs8dl77eByqamCqKmDorypwbWf0KiA0amB0qqC06uD1q6G2bGJ27OL3raO4rqS5LyU0MeIzdO06cGZ6sKa68Ob7MSc7eGA9eOa8uuc9+ep9Oyo+Oqy+O2/9/G9+PLD+/jf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhFlo1gAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACO0lEQVQoU2P4/19QRUBAQFFR38ISDKzNjfiF/v9n+K8vxcXBycUlLp5TXVVdXd0w8eChybGy/xmEJdnY2EEyHBlNjY1NQNx9+M61RFEGNS0NTU1NKQkpyfj2jk4gaG+q23F3rhqDaUJaWlpMbnJube2cOdt37tgxd87MaTdvODAYx6dnxCenJCfXLluwcUNvEiMj4665V+4HMxjHZaUlp6SUpKWvPfns4dbWSAXGPTsv3QNKROeknlm8evmqNadevXz+6nw4N+OB3RfuhTCYB+aknJn/6tWrx69evXh1mjWCifHw3mN3QxgsA/Nyz24GSkAAjzPjxaMHj90NZbCNzs9dugUuYRLGePnikQtACUtPn+glUPEnj245WjFeOLhzx3UnBksfD+9FYImnD04c3+TIx7hz9rRpV4ES/n7+80Di29btu32uxZ6Zceec6ZOvgCQSghaulFuxvi2jYTcjiyPjnO2zpk+8FMxg6ZcdG5eYnpGRXVjWwCjvyDhl2ozJE44CJXzy0uPTsvIKS8or6xltgBJT+yf27Q9msPDOLkzMyC4oLquoqmF0VGWc2t7e070DKOEZV5aelVdUChSvY3TkZWxvb+/umuTEYO7unp+WmJmdVwjUAwxaoERnZ0ezHYOBrrRXTFB0TFx8Ylp6dnFhfk5OTl5OhhmDiI6MhLa7j6+vX0BgUFRcbHRUUFBgoLsYw391bQ1JCQ0dF1c3d3d3L08g4eampwFMJf+V9Q0N9fWBBBzoK/3/DwCKZAN204phJgAAAABJRU5ErkJggg==",
	WorldMapIconCastle:		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAQTQYQTUZQzYZRDcaRjgbRzobSDocSjwcTD0dTT8eVUYiV0cjWEgjW0okXUwlXk0mX04mYVAnalgrblstb1wtcFwudWAwfGczgWo2gmw2g203hW43iHA5i3Q7jHQ7kHg9kno+lHs+m4FBoYVFp4xIr5FKtZhOt5lPuZtPwaFUxKRUxKRVxqVWy6tYzKtY1rNd17Rd3Llg37th4Lxi475j5cBk6sRm6sVn7MVm7cZn7cdo7cho8Mlp8cpp8stq9s5r9s9s+NFs/dRv/9dx/9hxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi0CPrwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAAsklEQVQoUz3P1xKCMBQEUIxg74rYe+9dsCOb//+kuA5oXm7u2UxmVlNKfI/RMoyQEEpp/i705aRv6hTN30XayiYifCJ+MHXCfhJA2cPwm/9hBBz9J5ooVeuNQgdyHW/WahahB8BqA2sDUo4JmSvOqe7lNo8tmBCiB7xO95vzONuQeULyDkjvsHM5YBJyb36yt+WWQ1YJRY+Xk4sNAR1ChfO52tkzh8FA/MoFlVguqB+AUh/VnyZYNsxaFgAAAABJRU5ErkJggg==",
	WorldMapIconCapital:	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAQzUXQTUYQTUZRTYYTzcUSjkYTToYVzYOWzgOXTsPXT0NVT0XVz4XUDsYWD4XXTsQYz4RZD8RX0IWX0IXY0AOZkUPZ0YPakQPZ0YXYEMYd0oTdUoVdk4UclULclYLqjYshFMVhlQXhlUYh1YYhl0Sh1sfjFYXiFsfl2wSoWYeom4WqW8ntnAmvXcjvXgj5C1f0GFEqowMtJUMwIodwZ4OypYVypoUwIkhyYIrz44g1ZggzrgH3LwU5rkb4KAq7qs56bci8q468rM08rQ097c4y4l607BW5pBA7ZVB8YdF2scF2sgF3csF3cwF5scL7MYX9M4b9N0L+t8T+twW68Ah8cEk8cEl++0G++0H++wI/PUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZl3WjgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAAzUlEQVQoU2XQ1Q4CMRAF0KWDy+Lu7u62uLtL//87SrckBMJ9meZ0MpmWIwS+Qwj3CwCEA0C0B5mDFlYBOJBHpQDa0iWjBZBG5VS8aw89OuNOeuFZeakgd0gBunQrpQdFyI1EsdbCvKt6brj4cM3KxHaoR2ICFhKR+sHOxNg7NisnfKo0jz0TE1nyfh1sy5vB7Z6UiQISH37sZ9Ns94H9EnEfUfCuWAh08Ecc7clwsZz3J20H60GG3Oj5zjhvYJOVKrXmHbVKSeX/7X//8wJ2FShWaJpyGgAAAABJRU5ErkJggg==",
	ButtonSendMail:			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAiVwxiV40j2E1kGM3k2Y6lmc5mWo8pXZIq3xOq35Ts4RWt4pfuotdvY5gw5Rm1qd537CC5LWH57iK9caY+Mmb/9Ci/9q0/+bN//To////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOYURwQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAAUElEQVQYV0XMRw7AIBBD0SGFoYaWfv97OgiNlLeyvPiEHwEhl9ZKDiC4+g7VEeIjIsHfwhPsJSzBnMIQ1nQMaerNhZntnrk3B71pyFaz6scHTbYsf0X+2RQAAAAASUVORK5CYII=",
}

// -----------------------------------------------------------------------
// String Operationen und Formatierungen
// -----------------------------------------------------------------------
if (!Str) var Str = {};

Str.Init = function () {
	this.CreateUnitIds();
	this.CreateUnitsPopulation();
	this.CreateBuildingLinks();
	this.CreateUnitLinks();
}

Str.Trim = function (zeichenkette) {
  // Erst führende, dann Abschließende Whitespaces entfernen
  // und das Ergebnis dieser Operationen zurückliefern
  return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
}

// Khanwars numbers for resources displayed with "," as grouping
// remove it to use buildIn parse-functions
Str.ParseInt = function(value) {	
	var result = parseInt(String(value).replace(",", ""));
	Logger.Debug(value + " - " + result);
	return result;
}

Str.ToTwoDigits = function (value) {
	if (value > 99) {
		return value;
	}
	
	var twoDigitStr = "00" + value;
	return twoDigitStr.substr(twoDigitStr.length - 2);	
}

Str.Now = function() {
	return new Date().getTime();
}

// im Format: yyyy-mm-dd hh:MM:ss
Str.ParseDate = function(dateString) {
	dateString = Str.Trim(dateString);
	var year = dateString.substr(0, 4);
	var month = dateString.substr(5, 2) - 1;
	var day = dateString.substr(8, 2);
	var hour = dateString.substr(11, 2);
	var minute = dateString.substr(14, 2);
	var second = dateString.substr(17, 2);
	
	var date = new Date(year, month, day, hour, minute, second);	
	return date;
}

Str.ParseTime = function(timeString) {
	
	var result = timeString.split(":");	
	Logger.Info(result[0] + " - " +result[1] + " - " + result[2]);
	var hours = parseInt(result[0], 10);
	var minutes = parseInt(result[1], 10);
	var seconds = parseInt(result[2], 10);
	var time = (((hours * 60) + minutes) * 60 + seconds) * 1000;
	Logger.Info(timeString + " - " + hours + " - " + minutes + " - " + seconds + " - " + time);
	return time;
}

Str.FormatTime = function(time) {	
	if (isNaN(time) || !isFinite(time)) {
		return "-";
	}
	
	var hours = Math.floor(time);
	var minutes = Math.floor((time-hours) * 60);
	var seconds = Math.floor((((time-hours) * 60) - minutes) * 60);
	
	return Str.ToTwoDigits(hours) + ":" + Str.ToTwoDigits(minutes) + ":" + Str.ToTwoDigits(seconds);
}

Str.FormatDate = function(date, withMilliseconds) {
	if (date.getTime() == 0) {
		return "";
	}
	
	// 2010-12-09 17:29:40
	var result = "";
	result += (date.getYear() + 1900) + "-";
	result += this.ToTwoDigits((date.getMonth() + 1)) + "-";
	result += this.ToTwoDigits(date.getDate()) + " ";
	result += this.ToTwoDigits(date.getHours()) + ":";
	result += this.ToTwoDigits(date.getMinutes()) + ":";
	result += this.ToTwoDigits(date.getSeconds());
	if (withMilliseconds) {
		result += "." + this.ToTwoDigits(date.getMilliseconds());
	}
	return result;
}

Str.ToDecimalGrouping = function (nStr) {
	if (nStr==undefined || isNaN(nStr)) {
		return "-";
	}
	
	nStr += "";
	x = nStr.split('.');
	x1 = x[0];	
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1" + "." + "$2");
	}
	
	return x1;
}
	
Str.CreateUnitIds = function() {
	this.UnitsId =  new Object();
	this.UnitsId[1] = "1";
	this.UnitsId[2] = "2";
	this.UnitsId[3] = "3";
	this.UnitsId[4] = "4";
	this.UnitsId[5] = "16";
	this.UnitsId[6] = "16";
	this.UnitsId[7] = "16";
	this.UnitsId[8] = "16";
	this.UnitsId[9] = "5";
	this.UnitsId[10] = "6";
	this.UnitsId[11] = "7";
	this.UnitsId[12] = "8";
	this.UnitsId[13] = "9";
	this.UnitsId[14] = "10";
	this.UnitsId[15] = "11";
	this.UnitsId[16] = "12";
	this.UnitsId[17] = "13";
	this.UnitsId[18] = "14";
	this.UnitsId[19] = "15";
	this.UnitsId[20] = "17";
	this.UnitsId[21] = "16";
	this.UnitsId[22] = "16";
	this.UnitsId[23] = "16";
	this.UnitsId[24] = "16";
	this.UnitsId[25] = "16";
	this.UnitsId[26] = "16";
	this.UnitsId[27] = "16";
};

Str.CreateUnitsPopulation = function() {
	this.UnitsPop =  new Object();
	this.UnitsPop[1] = 1;
	this.UnitsPop[2] = 1;
	this.UnitsPop[3] = 1;
	this.UnitsPop[4] = 1;
	this.UnitsPop[5] = 2;
	this.UnitsPop[6] = 4;
	this.UnitsPop[7] = 6;
	this.UnitsPop[8] = 5;
	this.UnitsPop[9] = 6;
	this.UnitsPop[10] = 8;
	this.UnitsPop[11] = 10;
	this.UnitsPop[12] = 1;
	this.UnitsPop[13] = 1;
	this.UnitsPop[14] = 1;
	this.UnitsPop[15] = 5;
	this.UnitsPop[16] = 10;
	this.UnitsPop[17] = 100;
};

Str.CreateBuildingLinks = function() {
	this.BuildingLinks = new Object();
	this.BuildingLinks[0] = "";		// Goldmine
	this.BuildingLinks[1] = ""; 	// Eisenmine
	this.BuildingLinks[2] = "";		// Holzhütte
	this.BuildingLinks[3] = "";		// Farm
	this.BuildingLinks[4] = "";		// Häuser
	this.BuildingLinks[5] = "/barracks.php?unit_type=1";		// Baracken
	this.BuildingLinks[6] = "/barracks.php?unit_type=2";		// Stall
	this.BuildingLinks[7] = "/barracks.php?unit_type=4";		// Waffenschmiede
	this.BuildingLinks[8] = "/market.php?action=1";		// Marktplatz
	this.BuildingLinks[9] = "/upgrades.php";		// Schmiede
	this.BuildingLinks[10] = "";	// Lazarett
	this.BuildingLinks[11] = "";	// Mauer
	this.BuildingLinks[12] = "/barracks.php?unit_type=3";	// Adelsorden
	this.BuildingLinks[13] = "";	// Versteck
	this.BuildingLinks[14] = "";	// Lager
}

Str.CreateUnitLinks = function() {
	this.UnitLinks = new Object();
	this.UnitLinks[1] = "/barracks.php?unit_type=1"; 	
	this.UnitLinks[2] = "/barracks.php?unit_type=1";		
	this.UnitLinks[3] = "/barracks.php?unit_type=1";		
	this.UnitLinks[4] = "/barracks.php?unit_type=1";		
	this.UnitLinks[5] = "/barracks.php?unit_type=2";
	this.UnitLinks[6] = "/barracks.php?unit_type=2";
	this.UnitLinks[7] = "/barracks.php?unit_type=2";
	this.UnitLinks[8] = "/barracks.php?unit_type=4";
	this.UnitLinks[9] = "/barracks.php?unit_type=4";
	this.UnitLinks[10] = "/barracks.php?unit_type=4";
	this.UnitLinks[11] = "/barracks.php?unit_type=4";
	this.UnitLinks[12] = "/barracks.php?unit_type=1";	
	this.UnitLinks[13] = "/barracks.php?unit_type=1";	
	this.UnitLinks[14] = "/barracks.php?unit_type=1";	
	this.UnitLinks[15] = "/barracks.php?unit_type=2";	
	this.UnitLinks[16] = "/barracks.php?unit_type=3";
	this.UnitLinks[17] = "/barracks.php?unit_type=3";
}

// -----------------------------------------------------------------------
// Khanwars Initialisierung
// -----------------------------------------------------------------------
EmpireBoard.Khanwars = {
	_Parent:				null,
	_Host:					null,
	_World:					null,
}
	
EmpireBoard.Khanwars.Init = function(parent) {
	Logger.Debug("EmpireBoard.Khanwars.Init");
	this._Parent = parent;
}
	
EmpireBoard.Khanwars.Host = function() {
	if (this._Host == null) {
		this._Host = "";
		this._Host = document.location.host;
	}
		
	return this._Host;
}

EmpireBoard.Khanwars.World = function() {
	if (this._World == null) {
		this._World = "";
		this._World = document.title.match(/World \d+|Welt \d+|Map \d+/);
	}
	
	return this._World;
}

EmpireBoard.Khanwars.IsCaptcha  = function() {
	Logger.Debug("IsCaptcha");
	return window.location.href.indexOf("botcaptcha") > 0 || 
		   window.location.href.indexOf("terms.php") > 0 ||
		   window.location.href.indexOf("premium_urlaub.php") > 0 ||
		   window.location.href.indexOf("choose_race.php") > 0 ||
		   window.location.href.indexOf("nocastle.php") > 0;
};

EmpireBoard.Khanwars.IsBuildingList = function() {
	Logger.Debug('IsBuildingList');
	return window.location.href.indexOf('buildings.php') > 0;
}

EmpireBoard.Khanwars.IsMarket = function() {
	return window.location.href.indexOf('market.php') > 0;
};

EmpireBoard.Khanwars.IsOverview = function() {
	Logger.Debug('IsOverview');
	return window.location.href.indexOf('overview.php') > 0;
}

EmpireBoard.Khanwars.IsMap = function() {
	Logger.Debug('IsMap');
	return window.location.href.indexOf('map.php') > 0;
}

EmpireBoard.Khanwars.IsPohod = function() {
	Logger.Debug('IsPohod');
	return window.location.href.indexOf('pohod.php') > 0;
}

EmpireBoard.Khanwars.IsSendMarch = function() {
	Logger.Debug('IsSendMarch');
	return EmpireBoard.DOM.Has_Node("//div[@id='addedMarchesHolder']");
}

EmpireBoard.Khanwars.IsMessages = function() {
	var result = window.location.href.indexOf('news.php') > 0 || window.location.href.indexOf('writenote.php')>0;
	Logger.Debug('IsMessages ' + result);
	return result;
}

EmpireBoard.Khanwars.IsSendMessageCategory = function() {
	var result = window.location.href.indexOf('news.php?allsent=yes') > 0;
	Logger.Debug('IsSendMessageCategory ' + result);
	return result;
}

EmpireBoard.Khanwars.IsMessagesArchive = function() {
	var result = window.location.href.indexOf('news.php?type=99') > 0;
	Logger.Debug('IsMessagesArchive ' + result);
	return result;
}

EmpireBoard.Khanwars.IsSpyMessages = function() {
	var result = window.location.href.indexOf("news.php") > 0 && window.location.href.indexOf("type=5") > 0;
	Logger.Debug("IsSpyMessages " + result);
	return result;
}

EmpireBoard.Khanwars.IsBuddyList = function() {
	var result = window.location.href.indexOf('buddylist.php') > 0;
	Logger.Debug('IsBuddyList ' + result);
	return result;
}

EmpireBoard.Khanwars.IsBarrack = function() {
	var result = window.location.href.indexOf('barracks.php') > 0;
	Logger.Debug('IsBarrack ' + result);
	return result;
}

EmpireBoard.Khanwars.IsBarrackType = function(type) {
	var result = window.location.href.indexOf('barracks.php?unit_type=' + type) > 0;
	Logger.Debug("IsBarrack Type " + type + " " + result);
	return result;
}

EmpireBoard.Khanwars.IsPlayerPreview = function() {
	var result = window.location.href.indexOf('preview.php?player_id=') > 0;
	Logger.Debug('IsPlayerPreview ' + result);
	return result;
}

EmpireBoard.Khanwars.IsPreview = function() {
	var result = window.location.href.indexOf("preview.php") > 0;
	Logger.Debug("IsPreview " + result);
	return result;
}

EmpireBoard.Khanwars.IsVipSearch = function() {
	var result = window.location.href.indexOf("vip_search.php") > 0;
	Logger.Debug("IsVipSearch " + result);
	return result;
}

EmpireBoard.Khanwars.IsCalculator = function() {
	var result = window.location.href.indexOf("calculator.php") > 0;
	Logger.Debug("IsCalculator " + result);
	return result;
}

EmpireBoard.Khanwars.CurrentCastleKoordId = function() {
	var currentCastle = Str.Trim (document.getElementById("changeCastle").childNodes[1].innerHTML);
	return currentCastle.match(/\(\d+:\d+\)/);	
};

EmpireBoard.Khanwars.GetCurrentCastle = function (){
    var CurrentCastleKoordId = this.CurrentCastleKoordId();	
	var currentCastle = EmpireBoard.DB.CurrentCastles[CurrentCastleKoordId];
	
	if (currentCastle == undefined) {
		currentCastle = {};
	}
	
	if (currentCastle.Buildings == undefined) {
		currentCastle.Buildings = {};
	}
	
	if (currentCastle.BuildingQueue == undefined) {
		currentCastle.BuildingQueue = {};		
	}
	
	if (currentCastle.Resources == undefined) {
		currentCastle.Resources = new Resources();
	}
	
	if (currentCastle.Units == undefined) {
		currentCastle.Units = {};
	}
	
	if (currentCastle.UnitQueue == undefined) {
		currentCastle.UnitQueue = {};		
	}
		
	return currentCastle;
}

EmpireBoard.Khanwars.FetchCastles = function() {	
	Logger.Debug("FetchCastles");	
	var castleUrl = "http://" + window.location.host + "/ajax_castles.php";	
	EmpireBoard.SendRequest ("POST", castleUrl, "", EmpireBoard.Renders.MakeCastleList);	
};

EmpireBoard.Khanwars.FetchBuildingsFromOverview = function() {
	Logger.Debug('FetchBuildingsFromOverview');
	var currentCastle = this.GetCurrentCastle();
	var buildings = EmpireBoard.DOM.Get_Nodes("//a[contains(@class, 'building')]");

	for (var i = 0; i < buildings.snapshotLength; i++) {
		var building = buildings.snapshotItem(i); 
		var buildingId = building.getAttribute("class").match(/b-\d+/);
		if (!buildingId) {
			// ignore taverne
			continue;
		}
		
		buildingId = parseInt(buildingId[0].match(/\d+/)) - 1;
		
		var level = building.title.match(/\[.*\]/);
		if(!level) {
			// happens from time to time, don't know why. 
			Logger.Warn("unexpected fetch " + building.title);
			level = 0;
		}
		else {
			level = parseInt(level[0].match(/\d+/));
		}
		
		currentCastle.Buildings[buildingId] = level;
	}
}

EmpireBoard.Khanwars.FetchBuildings = function() {	
	Logger.Debug('FetchBuildings');
	
	var buildingsList = document.getElementById('buildingsList');
	
	var currentCastle = this.GetCurrentCastle();
	
	var j = 0;
	for (var i = 1; i<buildingsList.childNodes.length; i=i+2) {
		currentCastle.Buildings[j] = buildingsList.childNodes[i].childNodes[1].childNodes[1].innerHTML;
		j++;
	}
	
	this.FetchBuildingQueue(currentCastle);
};

EmpireBoard.Khanwars.FetchBuildingQueue = function(currentCastle) {	
	Logger.Debug('FetchBuildingQueue');
			
	currentCastle.BuildingQueue[0] = new BuildingQueueItem();
	currentCastle.BuildingQueue[1] = new BuildingQueueItem();
	currentCastle.BuildingQueue[2] = new BuildingQueueItem();
	
	if (!EmpireBoard.DOM.Has_Node("//div[@id='buildingsQueue']")) {
		return;
	}	
	
	// Building-Finishtime ermitteln
	var queueItems = EmpireBoard.DOM.Get_Nodes("//div[@id='buildingsQueue']//div[@class='info']//span[@class='timeLeft']//span");	
	for (var i = 0; i < queueItems.snapshotLength; i++) {
		var queueItem = queueItems.snapshotItem(i);			
		var finishTime = Str.ParseTime(queueItem.innerHTML);	
		currentCastle.BuildingQueue[i].Finished = Str.Now() + finishTime;		
	}
	
	// Building-Ids auslesen
	var queueItems = EmpireBoard.DOM.Get_Nodes("//div[@id='buildingsQueue']//div[@class='thumbnail']//a");	
	for (var i = 0; i < queueItems.snapshotLength; i++) {	
		var queueItem = queueItems.snapshotItem(i);		
		var buildingId = queueItem.href.match(/posted_id=\d+/)[0].match(/\d+/);
		currentCastle.BuildingQueue[i].BuildingId = buildingId - 1;
	}	
};

EmpireBoard.Khanwars.FetchResources = function() {	
	Logger.Debug('FetchResources');
	var currentCastle = this.GetCurrentCastle();
	
	currentCastle.Resources.Gold = this.GetResource('HaveGold');
	currentCastle.Resources.Iron = this.GetResource('HaveIron');
	currentCastle.Resources.Wood = this.GetResource('HaveWood');
	currentCastle.Resources.Food = this.GetResource('HaveFood');	
	currentCastle.PopulationUsed = this.GetResource('population_used');
	currentCastle.FetchDate = Str.Now();
	currentCastle.Population = Str.ParseInt(EmpireBoard.DOM.Get_First_Node("//span[@id='population_used_max']", document).innerHTML);
};

EmpireBoard.Khanwars.FetchProduction = function() {	
	Logger.Debug('FetchProduction');
	
	var currentCastle = this.GetCurrentCastle();
	
	currentCastle.Resources.GoldProd = this.GetResourceProduction('PerHour_1');
	currentCastle.Resources.IronProd = this.GetResourceProduction('PerHour_2');
	currentCastle.Resources.WoodProd = this.GetResourceProduction('PerHour_3');
	currentCastle.Resources.FoodProd = this.GetResourceProduction('PerHour_4');
	currentCastle.Storage = Str.ParseInt(EmpireBoard.DOM.Get_First_Node("//span[@id='barGoldMax']").innerHTML);

	this.FetchBuildingQueue(currentCastle);			
};

EmpireBoard.Khanwars.GetResource = function(id) {	
	Logger.Debug('EmpireBoard.Khanwars.GetResource');	
	var resource = document.getElementById(id);	
	return Str.ParseInt(resource.innerHTML);
};

EmpireBoard.Khanwars.GetResourceProduction = function(id) {	
	Logger.Debug("EmpireBoard.Khanwars.GetResourceProduction");	
	var resource = document.getElementById(id).innerHTML;
	return Str.ParseInt(resource);
};

EmpireBoard.Khanwars.FetchMapImages = function() {	
	Logger.Debug("FetchMapImages");
	this.MapImages = new Array();
	var i, j;
	
	for (j = 0; j < 6; j++) {
		for (i = 0; i < 4; i++) {
			this.MapImages[i * 6 + j] = new Image();
			this.MapImages[i * 6 + j].src = "map_gd.php?x=" + (i * 60) + "&y=" + (j * 36) + "&rand=" + Str.Now();
		}
	}
}
		
EmpireBoard.Khanwars.FetchMap = function(ID) {	
	var extendedMap = EmpireBoard.DB.Options["ExtendedMap"];
	if (!extendedMap) {
		return;
	}

	var BaseX = EmpireBoard.MapX;
	var BaseY = EmpireBoard.MapY;
	Logger.Info("Fetching Map with ID '" + ID + "' at position " + BaseX + ":" + BaseY + " .");

	if (EmpireBoard.MapFlags[ID+"X"] == BaseX && EmpireBoard.MapFlags[ID+"Y"] == BaseY) {
		// to avoid sensless doubleFetching
		Logger.Warn("FetchMap canceled.");
		return;
	}	
	
	var mapMinScavenge = EmpireBoard.DB.Options["MapMinScavenge"];
	var mapMinHealing = EmpireBoard.DB.Options["MapMinHealing"];
	var PatLeft = /left: (\d+)px/i;
	var PatTop = /top: (\d+)px/i;
		
    var Present = new Object();	
    var FocusCoords = /\?setx=(\d+)&sety=(\d+)$/i.exec(window.location);
    FocusCoords ?
      FocusCoords = [FocusCoords[1], FocusCoords[2]] : FocusCoords = [0, 0];
    
	var Map = EmpireBoard.DOM.Get_First_Node("//div[@id='" + ID + "']");
    var Nodes = EmpireBoard.DOM.Get_Nodes("//div[@id='" + ID + "']//div[contains(@class,'mapBlock')]");
	
	for (var N = 0; N < Nodes.snapshotLength; N++) {
		if (Nodes.snapshotItem(N).hasAttribute("title")) {
			var CurrX = Number(PatLeft.exec(Nodes.snapshotItem(N).getAttribute("style"))[1]) / 50;
			var CurrY = Number(PatTop.exec(Nodes.snapshotItem(N).getAttribute("style"))[1]) / 50;
			var key = CurrX + ":" + CurrY;
			Nodes.snapshotItem(N).setAttribute("gm_x", CurrX + BaseX);
			Nodes.snapshotItem(N).setAttribute("gm_y", CurrY + BaseY);
			Present[key] = true;
		}
	}

    var InsertionPoint = Map.getElementsByClassName("wrapper")[0];
    if (! InsertionPoint) {
		return;
	}
	
	for (var X = 0; X < 15; X++) {
		for (var Y = 0; Y < 9; Y++) {
			var key = X + ":" + Y;
			if (!Present[key]) {
				var newNode = document.createElement("div");
				newNode.setAttribute("class", "mapBlock");
				newNode.setAttribute("style", "left: " + String(X * 50) + "px; top: " + String(Y * 50) + "px;");
				newNode.setAttribute("gm_x", X + BaseX);
				newNode.setAttribute("gm_y", Y + BaseY);				
				InsertionPoint.insertBefore(newNode, InsertionPoint.lastChild);
				var key = String(X + BaseX) + ":" + String(Y + BaseY);
				EmpireBoard.DB.MapData[key] = new MapItem();
			}
		}
	}
    
	var PatGold = /res_ico_gold.gif.+?>\s*(\d+)\s*/i;
	var PatIron = /res_ico_iron.gif.+?>\s*(\d+)\s*/i;
	var PatWood = /res_ico_wood.gif.+?>\s*(\d+)\s*/i;
	var PatFood = /res_ico_food.gif.+?>\s*(\d+)\s*/i;
	var PatPop = /ico_pop.gif.+?>\s*(\d+)\s*/i;
	var PatCoords = /header=\[.+?\((\d+):(\d+)\)\]/i;
	var PatCastleCoords = /^\s*header=\[\s*.*?([^>]*?)\s*\((\d+):(\d+)\)/i;
	var PatCapital = /icon\_crown\.gif/i;
    var PatPlayer = /overview\/player\.gif' \/> (.+?)\s*</i;
    var PatLevel = /exp\.gif.+?>\s*\d+\s*\((\d+)\)\s*<br\/>/i;
    var PatClan = /icon\_clan\.gif' \/> (.+?)\s*</i;
    var PatLogo = /<img src='clanLogos.+?\/>/i;
    var RelativeX, RelativeY;
	
	if (Nodes.snapshotLength > 0) { // grid has cities
		for (var N = 0; N < Nodes.snapshotLength; N++) {
			var TempText = Nodes.snapshotItem(N).getAttribute("title");
			if (TempText) {
				var Player = PatPlayer.exec(TempText);
				TempText = TempText.replace(PatLogo, "");
				TempText = TempText.replace(/,/gi,'');
				var Coords = PatCoords.exec(TempText);
				Coords = [Coords[1], Coords[2]];
				RelativeX = Number(Nodes.snapshotItem(N).getAttribute("gm_x")) - BaseX;
				RelativeY = Number(Nodes.snapshotItem(N).getAttribute("gm_y")) - BaseY;
				var Gold = PatGold.exec(TempText)[1];
				var Iron = PatIron.exec(TempText)[1];
				var Wood = PatWood.exec(TempText)[1];
				var Food = PatFood.exec(TempText)[1];
				var Scavenge = Number(Gold) + Number(Iron)	+ Number(Wood) + Number(Food);
				var Pop = PatPop.exec(TempText);
				Pop ? Pop = Number(Pop[1]) : Pop = 0;

				if (Scavenge > mapMinScavenge || Pop >= mapMinHealing) {
					var Labelled = document.evaluate(
						"descendant::*[@GM_JunkAttr]",
						Nodes.snapshotItem(N), null, XPathResult.FIRST_ORDERED_NODE_TYPE,
						null
					).singleNodeValue;
					
					if (! Labelled) { //Ned
						Nodes.snapshotItem(N).innerHTML +=
								"<span GM_JunkAttr='1' style='font-size: 9pt; background-color:#000; font-family: sans-serif;'><b><br />" +
								"<div style=\"color:yellow;text-shadow:0 1px 0 #000000;padding-left:17px;background:url(" + ImageData.IconMapRes + ") no-repeat;\">" + (Scavenge > 0 ? (Scavenge > 1000 ? String(Math.round(Scavenge / 1000)) + '&nbsp;K' : String(Scavenge)) :"-") + "</div>" +
								"<div style=\"color:#FFA500;text-shadow:0 1px 0 #000000;padding-left:17px;background:url(" + ImageData.IconMapPop + ") no-repeat;\">" + (Pop > mapMinHealing ? String(Pop) :"-") +"</div>" + //Ned
								"</b></span>";
						TempText = TempText.replace(PatFood,
							function () {
								return arguments[0] + "<br/>" + Locale.Text.Total + ": " + String(Scavenge);
							}
						);
					}
				}


				var key = Nodes.snapshotItem(N).getAttribute("gm_x") + ":" + Nodes.snapshotItem(N).getAttribute("gm_y");
				var mapItem = new MapItem();
				
				if (Player) {					
					var castleId = parseInt(String(Nodes.snapshotItem(N).getAttribute("onclick")).match(/\d+/), 10);					
					var Match = PatCastleCoords.exec(TempText).slice(1);
					// var key = Match[1] + ":" + Match[2];
					var isCapital = Number((PatCapital.test(TempText)));
					mapItem.IsCapital = isCapital;
					mapItem.Castle = Match[0];
					mapItem.Player = Player[1];
					mapItem.Clan = PatClan.exec(TempText) ? PatClan.exec(TempText)[1] : "";
					mapItem.CastleId = castleId;
					if (mapItem.Player == "gosiagg") {
						Logger.Debug("found castle " + key + " " + mapItem.CastleId + " " + mapItem.IsCapital + " " + mapItem.Castle + " " + mapItem.Player + " " + mapItem.Clan);
					}
					var spyReport = EmpireBoard.DB.SpyReports[key];
					if (spyReport) {
						// Show Spy-Report-Hint
						Logger.Debug("Found Spy for castle " + key);
						var spyHintIcon = document.createElement("div");
						spyHintIcon.setAttribute("class", "mapSign s99");
						Nodes.snapshotItem(N).appendChild(spyHintIcon);
												
						TempText = TempText.replace(PatPop,
							function () {
								return arguments[0] + "<br/>" + Locale.Text.SpyReport + ":" + Str.FormatDate(new Date(spyReport.Date));
							}
						);
						
						// Logger.Debug(TempText);
					}
				}
				else 
				{
					// empty block with scavange do nothing					
					// Logger.Debug("TODO?!?" + key + "\n" + Nodes.snapshotItem(N).getAttribute("title"));
				}

				Nodes.snapshotItem(N).setAttribute("title", TempText);
				
				EmpireBoard.DB.MapData[key] = mapItem;
			}
		}
	}

    // highlight target square
	var selectedCoord = EmpireBoard.DOM.Get_First_Node("descendant::div[@class='wrapper']/div[@gm_x='" + FocusCoords[0] + "'][@gm_y='" + FocusCoords[1] + "']");
	if (selectedCoord) {
		var style = selectedCoord.getAttribute("style") + ";border: solid 1px white;";
		selectedCoord.setAttribute("style", style);
	}

	// add clickability to "empty" squares, for sending camps/scavenge
    var emptyCoords = EmpireBoard.DOM.Get_Nodes("//div[@id='" + ID + "']/div[@class='wrapper']/div[not(@onclick)]");	
	for (var idx = 0; idx < emptyCoords.snapshotLength; idx++) {
		var currentNode = emptyCoords.snapshotItem(idx);
		var style = currentNode.getAttribute("style") + "; cursor: pointer;";
		currentNode.setAttribute("style", style);
		currentNode.addEventListener("click", EmpireBoard.Handler.EmptyMapBlockClicked, true);
	}
	
	// Logger.Debug(EmpireBoard.DB.Serialize(EmpireBoard.DB.MapData));
	// strange workaround to avoid GM-access-violation because this function is called as a callback
	setTimeout(function() {EmpireBoard.DB.Save();}, 0);
	EmpireBoard.MapFlags[ID+"X"] = BaseX;
	EmpireBoard.MapFlags[ID+"Y"] = BaseY;
}

EmpireBoard.Khanwars.FetchBuddyList = function() {
	var buddyItems = EmpireBoard.DOM.Get_Nodes("//div[@class='playersList']//a[@class='deletePlayer']");
	for (var i = 0; i < buddyItems.snapshotLength; i++) {
		var buddyItem = buddyItems.snapshotItem(i);
		var buddyId = buddyItem.href.match(/delbuddy=\d+/)[0].match(/\d+/)[0];
		var buddy = EmpireBoard.DB.BuddyList[buddyId];
		if (!buddy) {
			buddy = new Buddy();
			EmpireBoard.DB.BuddyList[buddyId] = buddy;
			buddy.Id = buddyId;
			buddy.Name = buddyItem.nextSibling.nextSibling.innerHTML; 
		}
	}
}

EmpireBoard.Khanwars.FetchLastOnlineForBuddyList = function() {		
	if ((Str.Now() - EmpireBoard.DB.BuddyList.LastFetched) / 1000 / 60 < 5) {
		// no need to fetch onlinetimes now, only once in 5 minutes
		return; 
	}
	
	if (EmpireBoard.Khanwars.GetCurrentCastle().IsCamp)
	{
		// fetching of online-times from camp not possible
		return;
	}
	
	for (var buddyId in EmpireBoard.DB.BuddyList) {
		if (buddyId == "LastFetched") {
			continue;
		}
		
		var buddy = EmpireBoard.DB.BuddyList[buddyId];
		var url = EmpireBoard.BaseUrl + "/preview.php?player_id=" + buddy.Id;
		EmpireBoard.SendRequest ("GET", url, "", EmpireBoard.FetchBuddy);
	}
	
	EmpireBoard.DB.BuddyList.LastFetched = Str.Now();
	EmpireBoard.DB.Save();
}

EmpireBoard.FetchBuddy = function(responseText) {	
	var mydoc = EmpireBoard.DOM.Create_Document(responseText);	
	var username = EmpireBoard.Khanwars.GetPlayerNameFromPreview(mydoc);
	var buddy = EmpireBoard.DB.GetBuddyByName(username);
	buddy.LastOnline = EmpireBoard.Khanwars.GetPlayerLastOnlineFromPreview(mydoc);
	EmpireBoard.DB.Save();
}

EmpireBoard.Khanwars.GetPlayerLastOnlineFromPreview = function(mydoc) {
	var rows = EmpireBoard.DOM.Get_Nodes("//div[@class='row']//div[@class='right']", mydoc);
	if (rows.snapshotLength == 0) {
		// player not found (wrong id?)
		return 0;
	}
	
	var oncell = rows.snapshotItem(0).innerHTML;	
	var ontime = oncell.match(/\d+-\d+-\d+ \d+:\d+:\d+/);
	if (ontime) {
		return Str.ParseDate(ontime[0]).getTime();
	}
	else {
		return 0;
	}
}

EmpireBoard.Khanwars.GetPlayerNameFromPreview = function(mydoc) {
	return EmpireBoard.DOM.Get_First_Node("//div[@id='skillsNav']//h2", mydoc).innerHTML;
}

EmpireBoard.Khanwars.FetchArmyFromPohod = function() {
	Logger.Debug('FetchArmyFromPohod');
	
	var currentCastle = this.GetCurrentCastle();
	
	for (var i = 1; i < 18; i++) {
		currentCastle.Units[i]=0;
	}
	
	var unitRows = EmpireBoard.DOM.Get_Nodes("//table[@id='units_to_send']//tbody//tr");	
	for (var i = 0; i < unitRows.snapshotLength; i++) {
		var unitRow = unitRows.snapshotItem(i);
		var unitId = Str.UnitsId[unitRow.innerHTML.match(/units\[\d+\]/)[0].match(/\d+/)];
		var unitCount = unitRow.childNodes[3].childNodes[0].innerHTML;
		currentCastle.Units[unitId] = Str.ParseInt(unitCount);
	}
}

EmpireBoard.Khanwars.FetchCastleFilter = function() {
	var filter = EmpireBoard.DOM.Get_First_Node("//form[@name='filterForm']//select[@name='filter']");
	filter.addEventListener("change", EmpireBoard.Handler.CastleFilterChanged , true);
}

EmpireBoard.Khanwars.FetchArmyQueues = function() {	
	for (var i = 1; i < 5; i++) {
		if (this.IsBarrackType(i)) {
			this.FetchArmyFromBarrack(i);
			this.FetchArmyQueue(i);		
		}
	}	
}

EmpireBoard.Khanwars.FetchArmyFromBarrack = function (category) {	
	var units = EmpireBoard.DOM.Get_Nodes("//div[@id='unitsList']//div[@class='unitPreview']");
	if (units.snapshotLength == 0) {
		return; 
	}
	
	var currentCastle = this.GetCurrentCastle();
	
	for (var i = 0; i < units.snapshotLength; i++) {
		var unit = units.snapshotItem(i);
		var unitId = Str.UnitsId[unit.id.match(/\d+/)];
		var unitCount = unit.previousSibling.previousSibling.childNodes[1].innerHTML;
		currentCastle.Units[unitId] = Str.ParseInt(unitCount);
	}
}

EmpireBoard.Khanwars.FetchArmyQueue = function (category) {	
	var currentCastle = this.GetCurrentCastle();	
	var fromIdx = (category - 1) * 7;	// max 7 queue-Items per building
	var toIdx = category * 7;
	
	// remove old stored data
	for (var i = fromIdx; i < toIdx; i++) {
		currentCastle.UnitQueue[i] = new ArmyQueueItem();
	}

	var queue = EmpireBoard.DOM.Get_Nodes("//div[@id='armyQueue']//div[@class='queueArmy']//div[@class='wrapper']");
	if (queue.snapshotLength == 0) {
		return;
	}
	
	// extract queue
	for (var i = 0; i < queue.snapshotLength; i++) {
		var idx = fromIdx + i;	
		var queueItem = queue.snapshotItem(i);
		
		var thumbnailInfo = queueItem.childNodes[1].innerHTML;
		var unitId = thumbnailInfo.match(/\d+.jpg/)[0].match(/\d+/);
		currentCastle.UnitQueue[idx].UnitId = Str.UnitsId[unitId];
		
		var buildInfo = queueItem.childNodes[3].innerHTML;
		var unitCount = buildInfo.match(/\d+ x/)[0].match(/\d+/);
		currentCastle.UnitQueue[idx].Count = Str.ParseInt(unitCount);
		
		// lookup total buildTime 
		var queueId = "cnt_all[" + (i + 1) + "]";
		var buildTime = EmpireBoard.DOM.Get_Nodes("//span[@id='" + queueId + "']");
		var timeInSeconds = Str.ParseInt(buildTime.snapshotItem(0).title);
		currentCastle.UnitQueue[idx].Finished = Str.Now() + timeInSeconds * 1000;		
	}	
}

EmpireBoard.Khanwars.FetchSpyReports = function() {
	var spyReports = EmpireBoard.DOM.Get_Nodes("//div[@class='box message']");
	
	for (var i = 0; i < spyReports.snapshotLength; i++) {
		var spyMessage = spyReports.snapshotItem(i);
		var coords = spyMessage.innerHTML.match(/\[\d+:\d+\]/g);
		if (coords.length > 1) {
			// more than 1 coord may be spyed by other or unsuccessfull report
			continue;
		}
	
	
		var mapX = coords[0].match(/\d+/g)[0];
		var mapY = coords[0].match(/\d+/g)[1];
		
		var newCoords = coords[0] + "&nbsp;<a href='pohod.php?attackx=" + mapX + "&attacky=" + mapY + "'><img src='" + ImageData.ButtonAttack +"' border='0' width='12px'></a>";
		spyMessage.innerHTML = spyMessage.innerHTML.replace(coords[0], newCoords);
		var key = mapX + ":" + mapY;
		var spyReport = new SpyReport();
		spyReport.Content = spyMessage.getElementsByTagName("p")[0].innerHTML;
		spyReport.Date = EmpireBoard.GetMessageDate(spyMessage).getTime();
		var savedReport = EmpireBoard.DB.SpyReports[key]
		if (savedReport) {
			if (savedReport.Date >= spyReport.Date) {
				// saved Report is current or newer
				continue;
			}			
		}
		
		EmpireBoard.DB.SpyReports[key] = spyReport;		
	}
}

EmpireBoard.Khanwars.GetRightBanner = function() {
	var rightBanner = document.getElementById('rightBanner');
	if (rightBanner == null) {
		rightBanner = document.createElement("div");
		rightBanner.setAttribute('id', 'rightBanner');
		
		document.getElementById("mainWrapper").insertBefore(rightBanner, document.getElementById("footer"));		
	}
	return rightBanner;
}

EmpireBoard.Khanwars.GetCurrentCastleName = function() {	
	var currentCastle = Str.Trim (document.getElementById('changeCastle').childNodes[1].innerHTML);	
	return currentCastle;
}

EmpireBoard.Khanwars.ExtractCastle = function (castleHTML) {	
	castleHTML = castleHTML.replace(/,/, "");
	// als ID werden die Koord benutzt. Regex sucht nach (xx:yy)	
	var castleKoord = castleHTML.match(/\(\d+:\d+\)/);
		
	if (EmpireBoard.DB.CurrentCastles[castleKoord]==undefined) {
		EmpireBoard.DB.CurrentCastles[castleKoord] = {};		
	}
	EmpireBoard.DB.ExtracedCastleIds[castleKoord] = true;
	
	var currentCastle = EmpireBoard.DB.CurrentCastles[castleKoord];
	var idx1 = castleHTML.indexOf('<big>') + 5;
	var idx2 = castleHTML.indexOf('(');
	currentCastle.Name = castleHTML.substring(idx1, idx2);
	var sucheCapital = /class="capital"/;
	currentCastle.IsCapital = sucheCapital.test(castleHTML);
	currentCastle.X = castleHTML.match(/\(\d+:/)[0].match(/\d+/);
	currentCastle.Y = castleHTML.match(/:\d+\)/)[0].match(/\d+/);
	var castleId = castleHTML.match(/tpid=\d+/);
	currentCastle.IsCamp = false;
	if (castleId==null) {
		castleId = castleHTML.match(/campId=\d+/);
		currentCastle.IsCamp = true;
	}	
	currentCastle.Id = castleId[0].match(/\d+/);
	currentCastle.Loyality = 0;
	
	if (!currentCastle.IsCamp) {
		var loyreg = castleHTML.match(/>\d+</)[0];
		currentCastle.Loyality = loyreg.match(/\d+/);	
	}
	
	EmpireBoard.DB.CurrentCastles[castleKoord] = currentCastle;
}

EmpireBoard.Khanwars.IsCurrentCastleKoordId = function(castleId) {
	var currentCastle = this.GetCurrentCastleName();
	return currentCastle.indexOf(castleId) > 0;
}

EmpireBoard.Khanwars.IsCurrentCastle = function(castleHTML) {
	var currentCastle = EmpireBoard.Khanwars.GetCurrentCastleName();
	return castleHTML.indexOf(currentCastle) > 0;
}

EmpireBoard.Khanwars.CalcResource = function (res, resProd, storage, fetchDate) {
	Logger.Debug("EmpireBoard.Khanwars.CalcResource:" + res + ", " + resProd + ", " + storage + ", " + fetchDate);
	if (isNaN(res)) {
		res = 0;
	}
	
	if (isNaN(resProd)) {
		resProd = 0;
	}
	
	var calc = res + (Str.Now() - fetchDate) / 1000 / 60 / 60 * resProd;
	
	if (calc > storage) {
		if (storage > 0) {
			calc = storage;
		}
		else {
			calc = res;
		}
	}
	
	return Math.floor(calc);
};

EmpireBoard.Khanwars.AttachCaptchaClick = function() {
	var captcha = EmpireBoard.DOM.Get_Nodes("//input[@type='image']");
	var img = captcha.snapshotItem(0);
	img.addEventListener("click", EmpireBoard.Handler.CaptchaClicked, false);
}

EmpireBoard.Khanwars.Language = function() {
	var kwLanguage = EmpireBoard.DOM.Get_Nodes("//div[@class='currentLanguage']//img");
	if (kwLanguage.snapshotLength == 0) {
		return "en";	// Default-Language
	}
	
	return kwLanguage.snapshotItem(0).alt.substr(0, 2);
}

EmpireBoard.Khanwars.GetPlayerLevel = function() {
	var level = EmpireBoard.DOM.Get_First_Node("//div[@id='userDetails']//div[@class='details']//p//strong");
	return parseInt(level.innerHTML, 10);
}

EmpireBoard.Khanwars.FetchWorkers = function(id) {	
	var bid = "b_id=" + (id + 1);	
	GM_xmlhttpRequest({
    	method: "post",
   		url: "ajax_buildings.php",
    	headers: {
			"Content-type" : "application/x-www-form-urlencoded",        	
        	"Accept": "application/atom+xml,application/xml,text/xml,text/html"
    	},
		data: bid,
		onload: function(response) {
			var sliderParams = response.responseText.match(/mineSlider\(.*\);/)[0];
			sliderParams = sliderParams.substr(11, sliderParams.length - 13);
			var values = sliderParams.split(",");
			document.getElementById("slider_all" + id).innerHTML = values[0];
			document.getElementById("total_workers" + id).innerHTML = values[4];
			document.getElementById("slider_income" + id).innerHTML = values[6];
			var mineSlider = "var SliderObject" + id + " = new empireBoardMineSlider(" + sliderParams + ", " + id + ");";
			EmpireBoard.TempPopulation -= parseInt(values[0]);
			EmpireBoard.ContentEval(mineSlider);
			document.getElementById("slider_all" + id).addEventListener("DOMSubtreeModified", EmpireBoard.Handler.WorkerSliderChanged, true);
		}
	});	
}

EmpireBoard.Khanwars.SaveWorkers = function(id) {
	var bid = id + 1; // id in khanwars 1 bigger than in empireboard
	var workers = document.getElementById("slider_all" + id).innerHTML;	
	var updateData = "b_id=" + bid + "&updateWorkers=" + workers;
	
	GM_xmlhttpRequest({
    	method: "post",
   		url: "ajax_workers.php",
    	headers: {
			"Content-type" : "application/x-www-form-urlencoded",        	
        	"Accept": "application/atom+xml,application/xml,text/xml,text/html"
    	},
		data: updateData,
		onload: function(response) {	
			var result = EmpireBoard.DB.UnSerialize(response.responseText);
			document.getElementById("population_used").innerHTML = result.new_pop;
			EmpireBoard.Khanwars.GetCurrentCastle().PopulationUsed = result.new_pop;
			document.getElementById("PerHour_"+bid).innerHTML = document.getElementById("slider_income" + id).innerHTML;
		}
	});
}

var BuildingValues = [
  [],
  [ // gold mine
    [30, 65, 40, 45],
    [47, 103, 63, 71],
    [60, 130, 80, 90],
    [75, 163, 100, 113],
    [95, 206, 127, 142],
    [120, 260, 160, 180],
    [151, 327, 201, 226],
    [190, 412, 254, 285],
    [240, 520, 320, 360],
    [302, 655, 403, 453],
    [381, 826, 508, 571],
    [480, 1040, 640, 720],
    [605, 1311, 807, 907],
    [762, 1652, 1016, 1143],
    [960, 2081, 1281, 1441],
    [1210, 2623, 1614, 1816],
    [1525, 3305, 2034, 2288],
    [1922, 4164, 2562, 2883],
    [2421, 5247, 3229, 3632],
    [3051, 6611, 4068, 4577],
    [3845, 8330, 5126, 5767],
    [4844, 10497, 6459, 7267],
    [6104, 13226, 8139, 9156],
    [7691, 16665, 10255, 11537],
    [9691, 20997, 12921, 14537],
    [12211, 26457, 16281, 18316],
    [15386, 33336, 20514, 23079],
    [19386, 42003, 25848, 29079],
    [24426, 52924, 32569, 36640],
    [30777, 66685, 41037, 46166]
  ],
  [ // iron mine
    [60, 35, 55, 45],
    [95, 55, 87, 71],
    [120, 70, 110, 90],
    [151, 88, 138, 113],
    [190, 111, 174, 142],
    [240, 140, 220, 180],
    [302, 176, 277, 226],
    [381, 222, 349, 285],
    [480, 280, 440, 360],
    [605, 352, 554, 453],
    [762, 444, 698, 571],
    [960, 560, 880, 720],
    [1210, 706, 1109, 907],
    [1525, 889, 1398, 1143],
    [1921, 1121, 1761, 1441],
    [2421, 1412, 2219, 1816],
    [3051, 1779, 2796, 2288],
    [3844, 2242, 3523, 2883],
    [4843, 2825, 4440, 3632],
    [6103, 3560, 5594, 4577],
    [7690, 4485, 7049, 5767],
    [9689, 5652, 8882, 7267],
    [12208, 7121, 11191, 9156],
    [15383, 8973, 14101, 11537],
    [19382, 11306, 17767, 14537],
    [24422, 14246, 22387, 18316],
    [30772, 17950, 28207, 23079],
    [38772, 22617, 35541, 29079],
    [48853, 28497, 44782, 36640],
    [61555, 35907, 56425, 46166]
  ],
  [ // lumber mill
    [65, 55, 35, 40],
    [103, 87, 55, 63],
    [130, 110, 70, 80],
    [163, 138, 88, 100],
    [206, 174, 111, 127],
    [260, 220, 140, 160],
    [327, 277, 176, 201],
    [412, 349, 222, 254],
    [520, 440, 280, 320],
    [655, 554, 352, 403],
    [826, 698, 444, 508],
    [1040, 880, 560, 640],
    [1311, 1109, 706, 807],
    [1652, 1398, 889, 1016],
    [2081, 1761, 1121, 1281],
    [2623, 2219, 1412, 1614],
    [3305, 2796, 1779, 2034],
    [4164, 3523, 2242, 2562],
    [5247, 4440, 2825, 3229],
    [6611, 5594, 3560, 4068],
    [8330, 7049, 4485, 5126],
    [10497, 8882, 5652, 6459],
    [13226, 11191, 7121, 8139],
    [16665, 14101, 8973, 10255],
    [20997, 17767, 11306, 12921],
    [26457, 22387, 14246, 16281],
    [33336, 28207, 17950, 20514],
    [42003, 35541, 22617, 25848],
    [52924, 44782, 28497, 32569],
    [100000, 56425, 35907, 41037]
  ],
  [ // farms
    [55, 50, 35, 70],
    [87, 79, 55, 111],
    [110, 100, 70, 140],
    [138, 126, 88, 176],
    [174, 158, 111, 222],
    [220, 200, 140, 280],
    [277, 252, 176, 352],
    [349, 317, 222, 444],
    [440, 400, 280, 560],
    [554, 504, 352, 705],
    [698, 635, 444, 889],
    [880, 800, 560, 1120],
    [1109, 1008, 706, 1412],
    [1398, 1271, 889, 1779],
    [1761, 1601, 1121, 2242],
    [2219, 2017, 1412, 2825],
    [2796, 2542, 1779, 3559],
    [3523, 3203, 2242, 4485],
    [4440, 4036, 2825, 5651],
    [5594, 5086, 3560, 7120],
    [7049, 6408, 4485, 8971],
    [8882, 8074, 5652, 11304],
    [11191, 10174, 7121, 14243],
    [14101, 12819, 8973, 17946],
    [17767, 16152, 11306, 22613],
    [22387, 20351, 14246, 28492],
    [28207, 25643, 17950, 35900],
    [35541, 32310, 22617, 45234],
    [44782, 40711, 28497, 56995],
    [56425, 51296, 35907, 71814]
  ],
  [ // houses
    [35, 30, 45, 40],
    [55, 47, 71, 63],
    [70, 60, 90, 80],
    [88, 75, 113, 100],
    [111, 95, 142, 127],
    [140, 120, 180, 160],
    [176, 151, 226, 201],
    [222, 190, 285, 254],
    [280, 240, 360, 320],
    [352, 302, 453, 403],
    [444, 381, 571, 508],
    [560, 480, 720, 640],
    [706, 605, 907, 807],
    [889, 762, 1143, 1016],
    [1121, 960, 1441, 1281],
    [1412, 1210, 1816, 1614],
    [1779, 1525, 2288, 2034],
    [2242, 1922, 2883, 2562],
    [2825, 2421, 3632, 3229],
    [3560, 3051, 4577, 4068],
    [4485, 3845, 5767, 5126],
    [5652, 4844, 7267, 6459],
    [7121, 6104, 9156, 8139],
    [8973, 7691, 11537, 10255],
    [11306, 9691, 14537, 12921],
    [14246, 12211, 18316, 16281],
    [17950, 15386, 23079, 20514],
    [22617, 19386, 29079, 25848],
    [28497, 24426, 36640, 32569],
    [35907, 30777, 46166, 41037]
  ],
  [ // barracks
    [170, 90, 200, 100],
    [269, 142, 317, 158],
    [340, 180, 400, 200],
    [428, 226, 504, 252],
    [539, 285, 635, 317],
    [680, 360, 800, 400],
    [857, 453, 1008, 504],
    [1079, 571, 1270, 635],
    [1360, 720, 1600, 800],
    [1714, 907, 2017, 1008],
    [2160, 1143, 2541, 1270],
    [2722, 1441, 3202, 1601],
    [3429, 1815, 4035, 2017],
    [4321, 2287, 5084, 2542],
    [5445, 2882, 6406, 3203],
    [6860, 3632, 8071, 4035],
    [8644, 4576, 10170, 5085],
    [10892, 5766, 12814, 6407],
    [13724, 7265, 16146, 8073],
    [17292, 9154, 20344, 10172],
    [21788, 11535, 25633, 12816],
    [27453, 14534, 32298, 16149],
    [34591, 18313, 40696, 20348],
    [43585, 23074, 51277, 25638],
    [54917, 29074, 64609, 32304]
  ],
  [ // stables
    [300, 245, 255, 235],
    [476, 388, 404, 373],
    [600, 490, 510, 470],
    [756, 617, 642, 592],
    [952, 778, 809, 746],
    [1200, 980, 1020, 940],
    [1512, 1235, 1285, 1184],
    [1905, 1556, 1619, 1492],
    [2401, 1961, 2041, 1881],
    [3025, 2470, 2571, 2370],
    [3812, 3113, 3240, 2986],
    [4803, 3922, 4083, 3762],
    [6052, 4942, 5144, 4741],
    [7626, 6228, 6482, 5973],
    [9609, 7847, 8167, 7527],
    [12107, 9887, 10291, 9484],
    [15255, 12458, 12966, 11949],
    [19221, 15697, 16338, 15056],
    [24219, 19779, 20586, 18971],
    [30516, 24921, 25938, 23904]
  ],
  [ // guild
    [155, 265, 305, 235],
    [246, 420, 484, 373],
    [310, 530, 610, 470],
    [390, 667, 768, 592],
    [492, 841, 968, 746],
    [620, 1060, 1220, 940],
    [781, 1336, 1537, 1184],
    [984, 1683, 1937, 1492],
    [1240, 2121, 2441, 1881],
    [1563, 2672, 3076, 2370],
    [1969, 3367, 3875, 2986],
    [2481, 4243, 4883, 3762],
    [3127, 5346, 6153, 4741],
    [3940, 6736, 7753, 5973],
    [4964, 8487, 9769, 7527]
  ],
  [ // market
    [105, 95, 105, 95],
    [166, 150, 166, 150],
    [210, 190, 210, 190],
    [264, 239, 264, 239],
    [333, 301, 333, 301],
    [420, 380, 420, 380],
    [529, 478, 529, 478],
    [667, 603, 667, 603],
    [840, 760, 840, 760],
    [1058, 958, 1058, 958],
    [1334, 1207, 1334, 1207],
    [1681, 1521, 1681, 1521],
    [2118, 1916, 2118, 1916],
    [2669, 2414, 2669, 2414],
    [3363, 3042, 3363, 3042],
    [4237, 3834, 4237, 3834],
    [5339, 4830, 5339, 4830],
    [6727, 6086, 6727, 6086],
    [8476, 7669, 8476, 7669],
    [10680, 9663, 10680, 9663],
    [13457, 12176, 13457, 12176],
    [16956, 15341, 16956, 15341],
    [21365, 19330, 21365, 19330],
    [26920, 24356, 26920, 24356],
    [33919, 30689, 33919, 30689]
  ],
  [ // training grounds
    [230, 245, 225, 185],
    [365, 388, 357, 293],
    [460, 490, 450, 370],
    [579, 617, 567, 466],
    [730, 778, 714, 587],
    [920, 980, 900, 740],
    [1159, 1235, 1134, 932],
    [1461, 1556, 1429, 1175],
    [1841, 1961, 1801, 1480],
    [2319, 2470, 2269, 1865],
    [2922, 3113, 2859, 2350],
    [3682, 3922, 3602, 2962],
    [4640, 4942, 4539, 3732],
    [5846, 6228, 5719, 4702],
    [7366, 7847, 7206, 5925],
    [9282, 9887, 9080, 7466],
    [11695, 12458, 11441, 9407],
    [14736, 15697, 14416, 11853],
    [18568, 19779, 18164, 14935],
    [23395, 24921, 22887, 18818]
  ],
  [ // hospital
    [305, 245, 225, 315],
    [484, 388, 357, 500],
    [610, 490, 450, 630],
    [768, 617, 567, 793],
    [968, 778, 714, 1000],
    [1220, 980, 900, 1260],
    [1537, 1235, 1134, 1588],
    [1937, 1556, 1429, 2001],
    [2441, 1961, 1801, 2521],
    [3076, 2470, 2269, 3176]
  ],
  [ // wall
    [35, 50, 100, 20],
    [55, 79, 158, 31],
    [70, 100, 200, 40],
    [88, 126, 252, 50],
    [111, 158, 317, 63],
    [140, 200, 400, 80],
    [176, 252, 504, 100],
    [222, 317, 635, 127],
    [280, 400, 800, 160],
    [352, 504, 1008, 201],
    [1332, 1905, 3810, 762],
    [1680, 2400, 4803, 960],
    [2118, 3024, 6051, 1209],
    [2667, 3813, 7626, 1524],
    [3363, 4803, 9609, 1920],
    [7060, 10085, 20175, 4035],
    [8895, 12710, 25425, 5085],
    [11210, 16015, 32035, 6405],
    [14125, 20180, 40365, 8070],
    [17800, 25430, 50860, 10170]
  ],
  [ // order
    [55000, 26400, 38500, 55000],
    [88000, 44000, 60500, 88000],
    [220000, 110000, 99000, 165000],
    [400000, 270000, 210000, 340000]
  ],
  [ // guard station
    [45, 55, 45, 35],
    [71, 87, 71, 55],
    [90, 110, 90, 70],
    [113, 138, 113, 88],
    [142, 174, 142, 111],
    [180, 220, 180, 140],
    [226, 277, 226, 176],
    [285, 349, 285, 222],
    [360, 440, 360, 280],
    [453, 554, 453, 352]
  ],
  [ // store house
    [47, 62, 45, 52],
    [74, 98, 71, 39],
    [94, 124, 90, 50],
    [118, 156, 113, 63],
    [149, 196, 142, 79],
    [188, 248, 180, 100],
    [236, 312, 226, 126],
    [298, 393, 285, 158],
    [376, 496, 360, 200],
    [474, 625, 453, 252],
    [597, 787, 571, 317],
    [752, 992, 720, 400],
    [948, 1250, 907, 504],
    [1194, 1576, 1143, 635],
    [1505, 1985, 1441, 800],
    [1896, 2502, 1816, 1008],
    [2389, 3152, 2288, 1271],
    [3011, 3972, 2883, 1601],
    [3794, 5005, 3632, 2018],
    [4780, 6306, 4577, 2543],
    [6023, 7946, 5767, 3204],
    [7590, 10012, 7267, 4037],
    [9563, 12615, 9156, 5087],
    [12050, 15895, 11537, 6409],
    [15183, 20028, 14537, 8076],
    [19130, 25236, 18316, 10175],
    [24104, 31797, 23079, 12821],
    [30371, 40065, 29079, 16155],
    [38268, 50482, 36640, 20355],
    [48218, 63607, 46166, 25648]
  ]
];

// -----------------------------------------------------------------------
// EmpireBoard-DB
// -----------------------------------------------------------------------
EmpireBoard.DB = {
	_Parent:			 null,
	Prefix:				 "",
	CurrentCastles:		 {},
	MapData:			 {},
	MessageArchive:		 {},
	ExtracedCastleIds:	 {},
	BuddyList:			 {},
	SavedArmies:		 {},
	SpyReports:			 {},
	Options:			 {}
};

EmpireBoard.DB.Init = function(parent, host) {
	Logger.Debug('EmpireBoard.DB.Init');
	
	this._Parent = parent;
	if (host == undefined) {
		// TODO: WTF?
		host = this._Parent.Khanwars.Host();
	}
	
	// TODO: WTF?
	var prefix = host;
	prefix = prefix.replace('.khanwars.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
};
		
EmpireBoard.DB.Reset = function() {
	this.CurrentCastles = {};
	this.MapData = {};
	this.SavedArmies = {};
	this.BuddyList = {};
	this.SpyReports = {};
	this.Save();
};
		
EmpireBoard.DB.Serialize = function(data) {
	try {
		return JSON.stringify(data);
	} 
	catch (e) {
		Logger.Error("EmpireBoard.DB.Serialize: " + e);
	}
};

EmpireBoard.DB.UnSerialize = function(data) {
	try {
		return JSON.parse(data);
	} 
	catch (e) {
		Logger.Error("EmpireBoard.DB.UnSerialize: " + e + "\n" + data);
	}
};

EmpireBoard.DB.GetVar = function(varname, vardefault) {
	var varId = EmpireBoard.Khanwars.Host() + '/' + EmpireBoard.Khanwars.World() + '/' + varname;
	var res = GM_getValue(varId);
	if (res == undefined) {
		return vardefault;
	}
	
	return res;
};

EmpireBoard.DB.Load = function() {
	Logger.Debug("EmpireBoard.DB.Load");
	var config = this.UnSerialize(this.GetVar("CurrentCastles", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	this.CurrentCastles = config;	
	
	config = this.UnSerialize(this.GetVar("MessageArchive", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	this.MessageArchive = config;		
	
	config = this.UnSerialize(this.GetVar("BuddyList", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
		config.LastFetched = Str.Now();
	}
	this.BuddyList = config;		
	
	config = this.UnSerialize(this.GetVar("SavedArmies", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	this.SavedArmies = config;	

	config = this.UnSerialize(this.GetVar("MapData", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	this.MapData = config;	
	
	config = this.UnSerialize(this.GetVar("SpyReports", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	this.SpyReports = config;	
};	
	
EmpireBoard.DB.SetVar = function (varname, varvalue) {
	var varId = EmpireBoard.Khanwars.Host() + '/' + EmpireBoard.Khanwars.World() + '/' + varname;
	GM_setValue(varId, varvalue);
}

EmpireBoard.DB.Save = function() {
	Logger.Info("Save Data ...");
	this.SetVar("CurrentCastles", this.Serialize(this.CurrentCastles));
	this.SetVar("MessageArchive", this.Serialize(this.MessageArchive));
	this.SetVar("BuddyList", this.Serialize(this.BuddyList));
	this.SetVar("SavedArmies", this.Serialize(this.SavedArmies));
	this.SetVar("MapData", this.Serialize(this.MapData));
	this.SetVar("SpyReports", this.Serialize(this.SpyReports));
};

EmpireBoard.DB.Load_Options = function() {
	Logger.Debug("EmpireBoard.DB.Load_Options");
	this.Options = this.UnSerialize(GM_getValue("Option"));
	if (this.Options == undefined) {
		this.Options = {};
	}
	
	this.InitOptionIfMissing("EmpireBoardOptionTableExpanded", true);
	this.InitOptionIfMissing("EmpireBoardResourcesExpanded", true);
	this.InitOptionIfMissing("EmpireBoardBuildingsExpanded", true);
	this.InitOptionIfMissing("EmpireBoardUnitsExpanded", true);
	this.InitOptionIfMissing("Table_Resources", true);
	this.InitOptionIfMissing("Table_Buildings", true);
	this.InitOptionIfMissing("Table_Army", true);
	this.InitOptionIfMissing("BuddyList", true);
	this.InitOptionIfMissing("Ticker", true);
	this.InitOptionIfMissing("AutoUpdate", true);
	this.InitOptionIfMissing("Locale", "de");
	this.InitOptionIfMissing("ExtendedMap", true);
	this.InitOptionIfMissing("MapMinScavenge", 0);
	this.InitOptionIfMissing("MapMinHealing", 200);
};

EmpireBoard.DB.InitOptionIfMissing = function(name, value) {
	if (this.Options[name] == undefined) {
		this.Options[name] = value;
	}
}

EmpireBoard.DB.Save_Options = function() {
	GM_setValue("Option", this.Serialize(this.Options));
};

EmpireBoard.DB.Load_Temp = function() {
	Logger.Debug("EmpireBoard.DB.Load_Temp");
	EmpireBoard.RefreshMode = this.UnSerialize(this.GetVar("RefreshMode", "\"None\""));
	EmpireBoard.RefreshIndex = this.UnSerialize(this.GetVar("RefreshIndex", 0));
	EmpireBoard.RefreshStep = this.UnSerialize(this.GetVar("RefreshStep", 0));
	EmpireBoard.TimeToCaptcha = this.UnSerialize(this.GetVar("TimeToCaptcha", 3600));
	EmpireBoard.CastleFilter = this.UnSerialize(this.GetVar("CastleFilter", 0));
};

EmpireBoard.DB.Save_Temp = function() {	
	this.SetVar("TimeToCaptcha", this.Serialize(EmpireBoard.TimeToCaptcha));
	this.SetVar("RefreshMode", this.Serialize(EmpireBoard.RefreshMode));
	this.SetVar("RefreshIndex", this.Serialize(EmpireBoard.RefreshIndex));
	this.SetVar("RefreshStep", this.Serialize(EmpireBoard.RefreshStep));
	this.SetVar("CastleFilter", this.Serialize(EmpireBoard.CastleFilter));
};

// remove old castles from storage 
EmpireBoard.DB.GarbageCollect = function() {
	var garbage = {};
	
	for (var castleId in EmpireBoard.DB.CurrentCastles) {		
		if (!this.CastleInCastleList(castleId)) {
			garbage[castleId] = true;
		}
	}
	
	for (var castleId in garbage) {
		delete EmpireBoard.DB.CurrentCastles[castleId];
	}
}

EmpireBoard.DB.Sort = function (list, comparer) {
	var result = new Array();
	for (var item in list) {
		result.push(item);
	}
	
	result.sort(comparer);
	return result;
}

EmpireBoard.DB.SortCastles = function (castles) {
	return this.Sort(castles, Comparer.CastleComparer);
}

EmpireBoard.DB.SortMessages = function (messages) {
	return this.Sort(messages, Comparer.MessageComparer);
}

EmpireBoard.DB.GetMessageCount = function() {
	var count = 0;
	for (var message in EmpireBoard.DB.MessageArchive) {
		count++;
	}
	return count;
};

// Überprüfen ob die Burg beim Extrahieren der Daten in der Burgliste gefunden wurde.
EmpireBoard.DB.CastleInCastleList = function (castleId) {
	var found = EmpireBoard.DB.ExtracedCastleIds[castleId];
	if (found == true)
		return true;
	else
		return false;
};
	
EmpireBoard.DB.GetTotalUnitQueue = function (unitId) {
	var queueItems = new Array();
	
	var castles = this.SortCastles(EmpireBoard.DB.CurrentCastles);
	for (var idx = 0; idx < castles.length; idx++) {
		var castleId = castles[idx];
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];
		if (currentCastle.UnitQueue) {	
			for (var i = 0; i < 28; i++) {
				var queueItem = currentCastle.UnitQueue[i];
				if (queueItem) {			
					if (queueItem.UnitId == unitId) {
						queueItems.push(queueItem);
					}
				}
			}
		}
	}
	
	return queueItems.sort(Comparer.UnitQueueFinishedComparer);
}

EmpireBoard.DB.GetBuddyByName = function(username) {
	for (var buddyId in EmpireBoard.DB.BuddyList) {
		if (buddyId == "LastFetched") {
			continue;
		}
		
		var buddy = EmpireBoard.DB.BuddyList[buddyId];
		if (buddy.Name == username) {
			return buddy;
		}
	}	
}

EmpireBoard.DB.SortBuddyList = function (buddyList) {
	return this.Sort(buddyList, Comparer.BuddyComparer);
}

EmpireBoard.DB.GetCastlesForPayer = function (playerName) {
	var result = new Array();
	
	for (var itemId in EmpireBoard.DB.MapData) {
		var mapItem = EmpireBoard.DB.MapData[itemId];
		// Logger.Debug(item.Player);
		if (mapItem.Player == playerName) {
			result.push(itemId);
		}
	}
	
	result.sort(Comparer.MapItemComparer);
	return result;
}

// -----------------------------------------------------------------------
// Comparer Initialisierung
// -----------------------------------------------------------------------
if (!Comparer) var Comparer = {};

Comparer.CastleComparer = function (castleIdA, castleIdB) {
	var castleA = EmpireBoard.DB.CurrentCastles[castleIdA];
	var castleB = EmpireBoard.DB.CurrentCastles[castleIdB];
	if (castleA.IsCamp || castleB.IsCamp) {
		return false;
	}
	// Logger.Debug(castleA.Name + " > " + castleB.Name);
	
	return castleA.Name > castleB.Name;	
}

Comparer.MessageComparer = function (messageIdA, messageIdB) {
	var messageA = EmpireBoard.DB.MessageArchive[messageIdA];
	var messageB = EmpireBoard.DB.MessageArchive[messageIdB];	
	return messageA.Date > messageB.Date;	
}

Comparer.UnitQueueFinishedComparer = function (queueItemA, queueItemB) {
	return queueItemA.Finished > queueItemB.Finished;
} 

Comparer.BuddyComparer = function (buddyIdA, buddyIdB) {
	if (buddyIdA == "LastFetched" || buddyIdB == "LastFetched") {
		return false;
	}
	
	var buddyA = EmpireBoard.DB.BuddyList[buddyIdA];
	var buddyB = EmpireBoard.DB.BuddyList[buddyIdB];	
	return buddyA.Name.toLowerCase() > buddyB.Name.toLowerCase();
}

Comparer.MapItemComparer = function (mapItemIdA, mapItemIdB) {
	var castleA = EmpireBoard.DB.MapData[mapItemIdA];
	var castleB = EmpireBoard.DB.MapData[mapItemIdB];
	
	return castleA.Castle > castleB.Castle;
}

// -----------------------------------------------------------------------
// Language Initialisierung
// -----------------------------------------------------------------------
if (!Locale) var Locale = {};

Locale.Init = function (langCode) {	
	this.LangCode = langCode;
	if (this.LangCode == "-") {
		this.LangCode = EmpireBoard.Khanwars.Language();
	}
	
	this.Load_Texts();
	this.Languages = this.LoadLanguages();
	Logger.Info("using language: " + this.LangCode);
}

Locale.LoadLanguages = function() {
	var languages = {
		"-"	 : "Automatic",
		"ar" : "عربي",
		"de" : "Deutsch",
		"en" : "English",
		"fa" : "فارسی",
		"fr" : "Francais",
		"it" : "Italiano",
		"lt" : "Lietuviškai",
		"hu" : "Magyar",
		"ua" : "Українське",
		"pt" : "Português",
		"vn" : "Việt"
	};
	
	return languages;
};
	
Locale.Load_Texts = function() {
	switch(this.LangCode) {
		case "ar":
			this.Load_Texts_AR();
			break;
		case "de":
			this.Load_Texts_DE();
			break;
		case "fa":
			this.Load_Texts_FA();
			break;
		case "fr":
			this.Load_Texts_FR();
			break;
		case "hu":
			this.Load_Texts_HU();
			break;
		case "it":
			this.Load_Texts_IT();
			break;
		case "lt":
			this.Load_Texts_LT();
			break;
		case "pt":
			this.Load_Texts_PT();
			break;		
		case "ua":
			this.Load_Texts_UA();
			break;
		case "vn":
			this.Load_Texts_VI();
			break;
		default:
			this.Load_Texts_EN();
			break;
	}
};

Locale.Load_Texts_AR = function() {
	this.Text = {
		Option 					: "خيارات",
		Opt_Table_Resources 	: "إظهار جدول الموارد",
		Opt_Table_Buildings 	: "إظهار جدول المباني",
		Opt_Table_Army 			: "إظهار جدول الجيش",
		Opt_AutoUpdate 			: "تثبيت إصدارات جديدة تلقائيا",
		Opt_Language 			: "language (تعريب eprince bheddi)",
		Opt_Ticker 				: "رسائل الشريط العام",
		New_Version 			: "الإصدار الجديد",
		Available 				: "المتاحة",
		KlickToInstall 			: "أنقر لتثبيت الإصدار الجديد.",
		TimeToCaptcha 			: "وقت صورة التحقق",
		Castle 					: "القلعة",
		Castles 				: "القلاع",
		World 					: "العالم",
		Close 					: "إغلاق",
		Total 					: "مجموع",
		BoardName 				: "نظرة عامة",
		Resources 				: "الموارد",
		Loyalty 				: "الولاء",
		Gold 					: "الذهب",
		Iron 					: "الحديد",
		Wood 					: "الخشب",
		Food 					: "الطعام",
		Storage 				: "الاستيعاب",
		Filled 					: "الموجود",
		FullIn 					: "يمتلء في",
		Buildings 				: "المباني",
		Building 				: "بناء",
		Finished 				: "انتهاء",
		Goldmine 				: "منجم الذهب",
		Ironmine 				: "منجم الحديد",
		Lumberjacks 			: "معمل النشارة",
		Farms 					: "المزارع",
		Dwellings 				: "المساكن",
		Barracks 				: "الثكنات",
		Stables 				: "الاسطبل",
		Workshop 				: "الورشة",
		Marketplace 			: "السوق",
		Blacksmith 				: "الحداد",
		Infirmary 				: "المستشفى",
		Wall 					: "الحائط",
		Order 					: "القصر",
		Shelter 				: "مخبأ",
		Storages 				: "المخازن",
		Units 					: "وحدات",
		Population 				: "السكان",
		Pikeman 				: "مقاتل الرمح",
		Swordsman 				: "مقاتل السيف",
		Axeman 					: "مقاتل الفأس",
		Maceman 				: "مقاتل الصولجان",
		Quickwalker 			: "الجواسيس",
		LCavalry 				: "الفرسان الخفيفة",
		HCavalry 				: "الفرسان الثقيلة",
		Ram 					: "محطمة الأبواب",
		Ballistician 			: "مقلاع السهم العملاق",
		Catapult 				: "المنجنيق",
		Trebuchet 				: "مقلاع الحجارة",
		Shortbow 				: "رماة القوس القصير",
		Longbow 				: "رماة القوس الطويل",
		Crossbow 				: "رماة القوس المتقاطع",
		ArcherCavalry 			: "فرسان الأسهم",
		SpecialUnit 			: "الوحدة الخاصة",
		Nobleman 				: "النبيل",
		Reset 					: "إعادة تعيين الاعدادات",
		Opt_DeleteAll 			: "حذف كافة البيانات المخزنة",
		DeleteDataQuestion 		: "هل أنت متأكد أنك تريد حذف كافة البيانات المخزنة؟",
		ConvertRes 				: "السوق المحلي",
		SendRes 				: "إرسال الموارد",
		ClanForum 				: "منتدى التحالف",
		VIPSearch 				: "البحث الخاص",
		Vote 					: "تصويت",
		Archive 				: "أرشيف",
		ArchiveButton 			: "أرشيف",
		Sender 					: "من",
		Date 					: "التاريخ",
		Message 				: "رسالة",
		ArchivedMessages 		: "الرسائل المؤرشفة",
		DeleteMessageQuestion 	: "هل تريد حذف هذه الرسالة من الأرشيف؟",
		BuddyList 				: "قائمة الأصدقاء",
		RemoveFromBuddyList 	: "إزالة من قائمة الأصدقاء",
		Save 					: "حفظ",
		Opt_ExtendedMap 		: "الخريطة الموسعة (عرض معلومات الفائض في الخريطة)",
		Opt_MapMinScavenge 		: "ادنى حد لفائض الموارد على الخريطة",
		Opt_MapMinHealing 		: "ادنى حد لفائض الجنود على الخريطة",
		PlayerProfil 			: "معلومات اللاعب",
		Coordinates 			: "الاحداثيات",
		SpyReport 				: "التجسس",
		Delete 					: "حذف",
		Worker 					: "العمال",
		Production 				: "الدخل",
		CurrentLevel 			: "المستوى الحالي",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};
}

Locale.Load_Texts_DE = function() {
	this.Text = {
		Option					: "Optionen",
		Opt_Table_Resources 	: "Ressourcen anzeigen",
		Opt_Table_Buildings 	: "Gebäude anzeigen",
		Opt_Table_Army 			: "Armee anzeigen",
		Opt_AutoUpdate			: "Neue Versionen automatisch installieren",
		Opt_Language			: "Sprache",
		Opt_Ticker				: "Ticker anzeigen",
		New_Version				: "Neue Version",
		Available				: "verfügbar",
		KlickToInstall			: "Hier</a> klicken, um die neue Version zu installieren.",
		TimeToCaptcha			: "Botschutz in",
		Castle					: "Burg",
		Castles					: "Burgen",
		World					: "Welt",
		Close					: "Schließen",
		Total					: "Summe",
		BoardName				: "Übersicht Königreich",
		Resources				: "Rohstoffe",
		Loyalty					: "Loyalität",
		Gold					: "Gold",
		Iron					: "Eisen",
		Wood					: "Holz",
		Food					: "Nahrung",
		Storage					: "Lager",
		Filled					: "Belegt",
		FullIn					: "Voll in",
		Buildings				: "Gebäude",
		Building				: "Ausbau",
		Finished				: "Fertig am",
		Goldmine				: "Goldgrube",
		Ironmine				: "Eisenmine",
		Lumberjacks				: "Holzfällerhütte",
		Farms					: "Bauernhöfe",
		Dwellings				: "Häuser",
		Barracks				: "Kaserne",
		Stables					: "Stall",
		Workshop				: "Waffenschmiede",
		Marketplace				: "Markt",
		Blacksmith				: "Schmiede",
		Infirmary				: "Lazarett",
		Wall					: "Mauer",
		Order					: "Adelsorden",
		Shelter					: "Versteck",
		Storages				: "Lager",
		Units					: "Einheiten",
		Population				: "Bevölkerung",
		Pikeman					: "Pikenier",
		Swordsman				: "Schwertkämpfer",
		Axeman					: "Axtkämpfer",
		Maceman					: "Keulenträger",
		Quickwalker				: "Späher",
		LCavalry				: "Leichte Kavallerie",
		HCavalry 				: "Schwere Kavallerie",
		Ram						: "Rammen",
		Ballistician			: "Balliste",
		Catapult				: "Katapult",
		Trebuchet				: "Trebuchet",
		Shortbow				: "Bogenschütze",
		Longbow 				: "Langbogenschütze",
		Crossbow				: "Armbrustschütze",
		ArcherCavalry 			: "Berittener Bogenschütze",
		SpecialUnit				: "Spezialeinheit",
		Nobleman				: "Adliger",
		Reset					: "Daten zurücksetzen",
		Opt_DeleteAll			: "ALLE gespeicherten Daten löschen",
		DeleteDataQuestion		: "Bist du sicher, dass du ALLE gespeicherten Daten löschen willst?",
		ConvertRes				: "Innenmarkt",
		SendRes					: "Ressourcen versenden",
		ClanForum				: "Clan-Forum",
		VIPSearch				: "VIP-Suche",
		Vote					: "Voten",
		Archive					: "Archivieren",
		ArchiveButton			: "Archiv",
		Sender					: "Absender",
		Date					: "Datum",
		Message					: "Nachricht",
		ArchivedMessages		: "Archivierte Nachrichten",
		DeleteMessageQuestion 	: "Willst du diese Nachricht endgültig aus dem Archiv entfernen?",
		BuddyList				: "Freundesliste",
		RemoveFromBuddyList 	: "Von Freundesliste entfernen",
		Save					: "Speichern",
		Opt_ExtendedMap			: "Erweiterte Karte (Ressourcen und Verwundete auf Karte anzeigen)", 
		Opt_MapMinScavenge		: "min. Anzahl der Ressourcen auf der Karte",
		Opt_MapMinHealing		: "min. Anzahl der Verwundeten auf Karte",
		PlayerProfil			: "Spieler Info",
		Coordinates				: "Koordinaten",
		SpyReport				: "Spionage",
		Delete					: "Löschen",
		Worker					: "Arbeiter",
		Production				: "Fördermenge", 
		CurrentLevel			: "Aktuelles Level",
		NextLevel				: "Nächstes Level", 
		MaxLevelReached			: "Maximales Level erreicht.",
	};
}

Locale.Load_Texts_EN = function() {
	this.Text = {
		Option					: "Options",
		Opt_Table_Resources 	: "show resource table",
		Opt_Table_Buildings 	: "show building table",
		Opt_Table_Army 			: "show army table",
		Opt_AutoUpdate			: "automatically install new versions",
		Opt_Language			: "language",
		Opt_Ticker				: "display ticker messages",
		New_Version				: "new version",
		Available				: "available",
		KlickToInstall			: "Click</a> to install new version.",
		TimeToCaptcha			: "time to captcha",
		Castle					: "Castle",
		Castles					: "Castles",
		World					: "World",
		Close					: "Close",
		Total					: "Total",
		BoardName				: "Overview",
		Resources				: "Resources",
		Loyalty					: "Loyalty",
		Gold					: "Gold",
		Iron					: "Iron",
		Wood					: "Wood",
		Food					: "Food",
		Storage					: "Storage",
		Filled					: "Filled",
		FullIn					: "Full in",
		Buildings				: "Buildings",
		Building				: "Building",
		Finished				: "Finished",
		Goldmine				: "Goldmine",
		Ironmine				: "Ironmine",
		Lumberjacks				: "Lumberjacks",
		Farms					: "Farms",
		Dwellings				: "Dwellings",
		Barracks				: "Barracks",
		Stables					: "Stables",
		Workshop				: "Workshop",
		Marketplace				: "Marketplace",
		Blacksmith				: "Blacksmith",
		Infirmary				: "Infirmary",
		Wall					: "Wall",
		Order					: "Order",
		Shelter					: "Shelter",
		Storages				: "Storages",
		Units					: "Units",
		Population				: "Population",
		Pikeman					: "Pikeman",
		Swordsman				: "Swordsman",
		Axeman					: "Axeman",
		Maceman					: "Maceman",
		Quickwalker				: "Quickwalker",
		LCavalry				: "Light Cavalry",
		HCavalry 				: "Heavy Cavalry",
		Ram						: "Ram",
		Ballistician			: "Ballistician",
		Catapult				: "Catapult",
		Trebuchet				: "Trebuchet",
		Shortbow				: "Shortbow Archer",
		Longbow 				: "Longbow Archer",
		Crossbow				: "Crossbow Archer",
		ArcherCavalry 			: "Archer Cavalry",
		SpecialUnit				: "Special Unit",
		Nobleman				: "Nobleman",
		Reset					: "Reset data",
		Opt_DeleteAll			: "Delete ALL stored data",
		DeleteDataQuestion		: "Are you sure you want to delete ALL stored data ?",
		ConvertRes				: "Internal market",
		SendRes					: "Send Resources",
		ClanForum				: "Clan-Forum",
		VIPSearch				: "VIP-Search",
		Vote					: "Vote",
		Archive					: "Archive",
		ArchiveButton			: "Archive",
		Sender					: "From",
		Date					: "Date",
		Message					: "Message",
		ArchivedMessages		: "Archived messages",
		DeleteMessageQuestion	: "Do you want to delete that message from archive?",
		BuddyList				: "Buddy-list",
		RemoveFromBuddyList 	: "Remove from buddy-list",
		Save					: "Save",
		Opt_ExtendedMap			: "Extended Map (show scavenge and healing info on map)", 
		Opt_MapMinScavenge		: "min. resources to show on map",
		Opt_MapMinHealing		: "min. healings to show on map",
		PlayerProfil			: "Player Info",
		Coordinates				: "Coordinates",
		SpyReport				: "Spy",
		Delete					: "Delete",
		Worker					: "Workers",
		Production				: "Income", 
		CurrentLevel			: "Current level",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};
};

Locale.Load_Texts_FA = function() {
	this.Text = {
		Option					: "Options",
		Opt_Table_Resources 	: "show resource table",
		Opt_Table_Buildings 	: "show building table",
		Opt_Table_Army 			: "show army table",
		Opt_AutoUpdate			: "automatically install new versions",
		Opt_Language			: "language",
		Opt_Ticker				: "display ticker messages",
		New_Version				: "new version",
		Available				: "available",
		KlickToInstall			: "Click</a> to install new version.",
		TimeToCaptcha			: "time to captcha",
		Castle					: "قلعه",
		Castles					: "لیست قلعه ها",
		World					: "World",
		Close					: "Close",
		Total					: "مجموع",
		BoardName				: "قلعه ها",
		Resources				: "Resources",
		Loyalty					: "وفاداری",
		Gold					: "طلا",
		Iron					: "آهن",
		Wood					: "چوب",
		Food					: "غذا",
		Storage					: "Storage",
		Filled					: "Filled",
		FullIn					: "Full in",
		Buildings				: "نگاه کلی",
		Building				: "Building",
		Finished				: "Finished",
		Goldmine				: "معدن طلا",
		Ironmine				: "معدن آهن",
		Lumberjacks				: "چوب بری",
		Farms					: "مزرعه",
		Dwellings				: "خانه",
		Barracks				: "سربازخانه",
		Stables					: "اصطبل",
		Workshop				: "کارگاه",
		Marketplace				: "بازار",
		Blacksmith				: "آهنگری",
		Infirmary				: "درمانگاه",
		Wall					: "دیوار",
		Order					: "قصر",
		Shelter					: "پناهگاه",
		Storages				: "انبار",
		Units					: "Units",
		Population				: "جمعیت",
		Pikeman					: "نیزه دار",
		Swordsman				: "شمشیرزن",
		Axeman					: "تبرزن",
		Maceman					: "گرزدار",
		Quickwalker				: "جاسوس",
		LCavalry				: "سواره سبک",
		HCavalry 				: "سواره سنگین",
		Ram						: "دژکوب",
		Ballistician			: "بالستیک",
		Catapult				: "منجنیق",
		Trebuchet				: "قلعه کوژ",
		Shortbow				: "کمان کوتاه",
		Longbow 				: "کمان بلند",
		Crossbow				: "صلیبی",
		ArcherCavalry 			: "کماندار سواره",
		SpecialUnit				: "یگان ویژه",
		Nobleman				: "نجیب زاده",
		Reset					: "Reset data",
		Opt_DeleteAll			: "Delete ALL stored data",
		DeleteDataQuestion		: "Are you sure you want to delete ALL stored data ?",
		ConvertRes				: "Internal market",
		SendRes					: "Send Resources",
		ClanForum				: "Clan-Forum",
		VIPSearch				: "VIP-Search",
		Vote					: "Vote",
		Archive					: "Archive",
		ArchiveButton			: "Archive",
		Sender					: "From",
		Date					: "Date",
		Message					: "Message",
		ArchivedMessages		: "Archived messages",
		DeleteMessageQuestion	: "Do you want to delete that message from archive?",
		BuddyList				: "Buddy-list",
		RemoveFromBuddyList 	: "Remove from buddy-list",
		Save					: "Save",
		Opt_ExtendedMap			: "Extended Map (show scavenge and healing info on map)", 
		Opt_MapMinScavenge		: "min. resources to show on map",
		Opt_MapMinHealing		: "min. healings to show on map",
		PlayerProfil			: "Player Info",
		Coordinates				: "Coordinates",
		SpyReport				: "Spy",
		Delete					: "Delete",
		Worker					: "Workers",
		Production				: "Income", 
		CurrentLevel			: "Current level",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};
}

Locale.Load_Texts_FR = function() {
	this.Text = {
		Option					: "Options",
		Opt_Table_Resources 	: "voir table ressource ",
		Opt_Table_Buildings 	: "voir table construction",
		Opt_Table_Army 			: "voir table armées",
		Opt_AutoUpdate			: "install auto nouvelles versions",
		Opt_Language			: "Langue",
		Opt_Ticker				: "Afficher messages chat public",
		New_Version				: "nouvelle version",
		Available				: "disponible",
		KlickToInstall			: "Cliquer</a> pour installer nouvelle version.",
		TimeToCaptcha			: "Decompte captcha",
		Castle					: "Château",
		Castles					: "Châteaux",
		World					: "Monde",
		Close					: "Fermer",
		Total					: "Total",
		BoardName				: "Vue générale",
		Resources				: "Ressources",
		Loyalty					: "Loyauté",
		Gold					: "Or",
		Iron					: "Fer",
		Wood					: "Bois",
		Food					: "Nourriture",
		Storage					: "Entrepôts",
		Filled					: "Remplis",
		FullIn					: "Plein dans",
		Buildings				: "Constructions",
		Building				: "Constuction",
		Finished				: "Terminer",
		Goldmine				: "Mine or",
		Ironmine				: "Mine Fer",
		Lumberjacks				: "Scierie",
		Farms					: "Ferme",
		Dwellings				: "Habitation",
		Barracks				: "Caserne",
		Stables					: "Ecurie",
		Workshop				: "Atelier",
		Marketplace				: "Marche",
		Blacksmith				: "Forge",
		Infirmary				: "Infirmerie",
		Wall					: "Mur",
		Order					: "Ordre",
		Shelter					: "Cachette",
		Storages				: "Entrepots",
		Units					: "Unités",
		Population				: "Population",
		Pikeman					: "Lancier",
		Swordsman				: "Infanterie lourde",
		Axeman					: "Sauvage",
		Maceman					: "Gardien",
		Quickwalker				: "Eclaireur",
		LCavalry				: "Chevalier leger",
		HCavalry 				: "chevalier lourd",
		Ram						: "Belier",
		Ballistician			: "Balliste",
		Catapult				: "Catapulte",
		Trebuchet				: "Trébuchet",
		Shortbow				: "Archer Bandit",
		Longbow 				: "Archer lourd",
		Crossbow				: "Arbaletrier",
		ArcherCavalry 			: "Archer monté",
		SpecialUnit				: "Unité speciale",
		Nobleman				: "Noble",
		Reset					: "Effacer données",
		Opt_DeleteAll			: "effacer toutes les données",
		DeleteDataQuestion		: "Etes-vous sur de vouloir effacer toutes les donnees?",
		ConvertRes				: "Marché interne",
		SendRes					: "envoi ressources",
		ClanForum				: "Clan-Forum",
		VIPSearch				: "VIP-Recherche",
		Vote					: "Vote",
		Archive					: "Archive",
		ArchiveButton			: "Archive",
		Sender					: "de",
		Date					: "Date",
		Message					: "Message",
		ArchivedMessages		: "Messages archivés",
		DeleteMessageQuestion	: "voulez vous effacer ce message archivé ?",
		BuddyList				: "Liste raccourcis",
		RemoveFromBuddyList 	: "effacer de la liste",
		Save					: "Sauvegarder",
		Opt_ExtendedMap			: "Agrandissement carte (voir infos sur récupération et la guérison sur la carte)", 
		Opt_MapMinScavenge		: "min. resources visible sur la carte",
		Opt_MapMinHealing		: "min. soins visibles sur la carte",
		PlayerProfil			: "Info joueur",
		Coordinates				: "Coordonnées",
		SpyReport				: "ESPION",
		Delete					: "EFFACER",
		Worker					: "Production",
		Production				: "rendement", 
		CurrentLevel			: "Niveau actuel",
		NextLevel				: "Niveau suivant", 
		MaxLevelReached			: "Niveau maximum atteint.",
	};
};

Locale.Load_Texts_HU = function() {
	this.Text = {  
		Option                  : "Opciók",  
		Opt_Table_Resources     : "nyersanyag táblázat",  
		Opt_Table_Buildings     : "épületek táblázat",  
		Opt_Table_Army          : "hadseregek táblázat",  
		Opt_AutoUpdate          : "új változat automatikus telepítése",  
		Opt_Language            : "nyelv",  
		Opt_Ticker				: "display ticker messages",
		New_Version             : "Új változat",  
		Available               : "létezik",  
		KlickToInstall          : "Kattintás</a> az új változat telepítéséhez.",  
		TimeToCaptcha           : "Bot védelem",  
		Castle                  : "Vár",  
		Castles                 : "Várak",  
		World                   : "Világ",  
		Close                   : "Bezárás",  
		Total                   : "Összesen",  
		BoardName               : "Áttekintés",  
		Resources               : "Nyersanyagok",  
		Loyalty                 : "Hűség",  
		Gold                    : "Arany",  
		Iron                    : "Vas",  
		Wood                    : "Fa",  
		Food                    : "Élelem",  
		Storage                 : "Raktár",  
		Filled                  : "Telítettség",  
		FullIn                  : "Megtellik",  
		Buildings               : "Épületek",  
		Building                : "Épület",  
		Finished                : "Finished",  
		Goldmine                : "Aranybánya",  
		Ironmine                : "Vasbánya",  
		Lumberjacks             : "Fatelep",  
		Farms                   : "Farmok",  
		Dwellings               : "Lakóházak",  
		Barracks                : "Kaszárnya",  
		Stables                 : "Istálló",  
		Workshop                : "Műhely",  
		Marketplace             : "Piac",  
		Blacksmith              : "Fegyverkovács",  
		Infirmary               : "Katonai kórház",  
		Wall                    : "Várfal",  
		Order                   : "Rendház",  
		Shelter                 : "Rejtekhely",  
		Storages                : "Raktárak",  
		Units                   : "Egységek",  
		Population              : "Népesség",  
		Pikeman                 : "Lándzsás",  
		Swordsman               : "Kardforgató",  
		Axeman                  : "Fejszés",  
		Maceman                 : "Buzogányos",  
		Quickwalker             : "Gyorsfutó",  
		LCavalry                : "Könnyűlovas",  
		HCavalry                : "Nehézlovas",  
		Ram                     : "Faltörő kos",  
		Ballistician            : "Balliszta",  
		Catapult                : "Katapult",  
		Trebuchet               : "Trebuchet",  
		Shortbow                : "Könnyű íjász",  
		Longbow                 : "Nehéz íjász",  
		Crossbow                : "Nyílpuskás íjász",  
		ArcherCavalry           : "Lovasíjász",  
		SpecialUnit             : "Különleges egység",  
		Nobleman                : "Nemes",
		Reset					: "Reset data",
		Opt_DeleteAll			: "Delete ALL stored data",
		DeleteDataQuestion		: "Are you sure you want to delete ALL stored data ?",
		ConvertRes				: "Internal market",
		SendRes					: "Send Resources",
		ClanForum				: "Clan-Forum",
		VIPSearch				: "VIP-Search",
		Vote					: "Vote",
		Archive					: "Archive",
		ArchiveButton			: "Archive",
		Sender					: "From",
		Date					: "Date",
		Message					: "Message",
		ArchivedMessages		: "Archived messages",
		DeleteMessageQuestion	: "Do you want to delete that message from archive?",
		BuddyList				: "Buddy-list",
		RemoveFromBuddyList 	: "Remove from buddy-list",
		Save					: "Save",
		Opt_ExtendedMap			: "Extended Map (show scavenge and healing info on map)", 
		Opt_MapMinScavenge		: "min. resources to show on map",
		Opt_MapMinHealing		: "min. healings to show on map",
		PlayerProfil			: "Player Info",
		Coordinates				: "Coordinates",
		SpyReport				: "Spy",
		Delete					: "Delete",
		Worker					: "Workers",
		Production				: "Income", 
		CurrentLevel			: "Current level",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};  
};

Locale.Load_Texts_IT = function() {
	this.Text = {
		Option 					: "Opzioni",
		Opt_Table_Resources 	: "mostra tavolo di risorse",
		Opt_Table_Buildings 	: "mostra tavolo di costruzioni",
		Opt_Table_Army 			: "mostra tavolo di esercito",
		Opt_AutoUpdate 			: "installare automaticamente gli aggiornamenti",
		Opt_Language 			: "Lingua",
		New_Version 			: "nuova versione",
		Available 				: "disponibile",
		KlickToInstall 			: "Clicca per installare la nuova versione.",
		TimeToCaptcha 			: "Orologio anti bot",
		Castle 					: "Castello",
		Castles 				: "Castelli",
		World 					: "Mondo",
		Close 					: "Chiudere",
		Total					: "Totale",
		BoardName 				: "Overview",
		Resources 				: "Risorse",
		Loyalty 				: "Lealtà",
		Gold 					: "Oro",
		Iron					: "Ferro",
		Wood 					: "Legno",
		Food 					: "Cibo",
		Storage 				: "Magazzino",
		Filled 					: "Pieno",
		FullIn 					: "Pieno in",
		Buildings 				: "Costruzioni",
		Building 				: "Costruzione",
		Finished 				: "Finito",
		Goldmine 				: "Miniera d´oro",
		Ironmine 				: "Miniera di ferro",
		Lumberjacks 			: "Taglialegna",
		Farms 					: "Fattorie",
		Dwellings 				: "Abitazioni",
		Barracks 				: "Caserma",
		Stables 				: "Stalla",
		Workshop 				: "Officina",
		Marketplace 			: "Mercato",
		Blacksmith 				: "Fabbro",
		Infirmary 				: "Infermeria",
		Wall 					: "Mura",
		Order 					: "Ordine",
		Shelter 				: "Rifugio",
		Storages 				: "Magazzino",
		Units 					: "Unità",
		Population 				: "Popolazione",
		Pikeman 				: "Picchiere",
		Swordsman 				: "Spadaccino",
		Axeman 					: "Soldato con ascia",
		Maceman 				: "Soldato con mazza",
		Quickwalker 			: "Esploratore",
		LCavalry 				: "Cavaliere Leggero",
		HCavalry 				: "Cavaliere Pesante",
		Ram 					: "Ariete",
		Ballistician 			: "Ballista",
		Catapult 				: "Catapulta",
		Trebuchet 				: "Trabucco",
		Shortbow 				: "Arciere leggero",
		Longbow 				: "Arciere pesante",
		Crossbow 				: "Balestriere",
		ArcherCavalry 			: "Cavaliere Arciere",
		SpecialUnit 			: "Unità Speciale",
		Nobleman 				: "Nobiluomo",	
		Reset					: "Reimpostare i dati",
		Opt_DeleteAll			: "Elimina TUTTI i dati memorizzati",
		DeleteDataQuestion		: "Sei sicuro di voler eliminare TUTTI i dati memorizzati?",
		ConvertRes		 		: "Mercato Interno",
		SendRes					: "Invia Risorse",
		ClanForum		 		: "Clan Forum",
		VIPSearch				: "Ricerca avanzata",
		Vote 					: "Votar",
		Archive					: "Archiviare",
		ArchiveButton			: "Archivio",
		Sender					: "De",
		Date					: "Data",
		Message					: "Messaggio ",
		ArchivedMessages		: "Messaggi archiviati",
		DeleteMessageQuestion	: "Vuoi eliminare tale messaggio da archivio?",
		BuddyList				: "Buddy-list",
		RemoveFromBuddyList 	: "Rimuove dal buddy-list",
		Save					: "Salvare",
		Opt_ExtendedMap			: "Extended Map (show scavenge and healing info on map)", 
		Opt_MapMinScavenge		: "min. resources to show on map",
		Opt_MapMinHealing		: "min. healings to show on map",
		PlayerProfil			: "Player Info",
		Coordinates				: "Coordinates",
		SpyReport				: "Spy",
		Delete					: "Delete",
		Worker					: "Workers",
		Production				: "Income", 
		CurrentLevel			: "Current level",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};
}

Locale.Load_Texts_LT = function() {
	this.Text = {
		Option 					: "Nustatymai",
		Opt_Table_Resources 	: "Resursų lentelė",
		Opt_Table_Buildings 	: "Pastatų lentelė",
		Opt_Table_Army 			: "Karių lentelė",
		Opt_AutoUpdate 			: "Naujos skripto versijos automatinis atnaujinimas",
		Opt_Language 			: "Kalba",
		Opt_Ticker 				: "Ticker anzeigen",
		New_Version 			: "Nauja versija",
		Available 				: "išleista",
		KlickToInstall 			: "instaliuoti nauja versiją.",
		TimeToCaptcha 			: "laikas iki patikrinimo",
		Castle 					: "Pilis",
		Castles 				: "Pilys",
		World 					: "Pasaulis",
		Close 					: "Uždaryti",
		Total 					: "Viso",
		BoardName 				: "Imperijos apžvalga",
		Resources 				: "Resursai",
		Loyalty 				: "Ištikimybė",
		Gold 					: "Auksas",
		Iron 					: "Geležis",
		Wood 					: "Medis",
		Food 					: "Maistas",
		Storage 				: "Stovykla",
		Filled 					: "Užpildyta",
		FullIn 					: "Pilna",
		Buildings 				: "Pastatai",
		Building 				: "Pastatas",
		Finished 				: "Baigta",
		Goldmine 				: "Aukso kasykla",
		Ironmine 				: "Geležies kasykla",
		Lumberjacks 			: "Lentpjūvė",
		Farms 					: "Ferma",
		Dwellings 				: "Namai",
		Barracks 				: "Kareivinės",
		Stables 				: "Arklidės",
		Workshop 				: "Dirbtuvės",
		Marketplace 			: "Turgus",
		Blacksmith 				: "Kalvė",
		Infirmary 				: "Gydykla",
		Wall 					: "Siena",
		Order 					: "Orderis",
		Shelter 				: "Slėptuvė",
		Storages 				: "Sandėlis",
		Units 					: "Kariai",
		Population 				: "populiacija",
		Pikeman 				: "Ietininkas",
		Swordsman 				: "Karys su kardu",
		Axeman 					: "Karys su kirviu",
		Maceman 				: "Vėzdininkas",
		Quickwalker 			: "Šnipas",
		LCavalry 				: "Lengvoji kavalerija",
		HCavalry 				: "Sunkioji kavalerija",
		Ram 					: "Taranas",
		Ballistician 			: "Balista",
		Catapult 				: "Katapulta",
		Trebuchet 				: "Trebušetas",
		Shortbow 				: "Šaulys su mažu lanku",
		Longbow 				: "Šaulys su dideliu lanku",
		Crossbow 				: "Arbaletininkas",
		ArcherCavalry 			: "Raitas šaulys",
		SpecialUnit 			: "Unikalus karys",
		Nobleman 				: "Bajoras",
		Reset 					: "Reset",
		Opt_DeleteAll 			: "Ištrinti išsaugotus žaidimo duomenis",
		DeleteDataQuestion 		: "Ar tikrai ištrinti išsaugtus žaidimo duomenis?",
		ConvertRes 				: "Vidinis turgus",
		SendRes 				: "Siųsti resursus",
		ClanForum 				: "Klano forumas",
		VIPSearch 				: "VIP paieška",
		Vote 					: "Palaikyti",
		Archive 				: "Archyvas",
		ArchiveButton 			: "Archyvuoti",
		Sender 					: "Siuntėjas",
		Date 					: "Data",
		Message 				: "Žinutė",
		ArchivedMessages 		: "Archyvuotos žinutės",
		DeleteMessageQuestion 	: "Ar nori šią žinutę iš archyvo išmesti?",
		BuddyList 				: "Draugų sąrašas",
		RemoveFromBuddyList 	: "Pašalinti iš draugų sąrašo",
		Save 					: "Išsaugoti",
		Opt_ExtendedMap			: "Informatyvesnis žemėlapis (rodyti mūšių liekanas ir sužeistus karius)",
		Opt_MapMinScavenge 		: "min resursų kiekis rodomas žemėlapyje",
		Opt_MapMinHealing 		: "min. sužeistų karių kiekis rodomas žemėlapyje",
		PlayerProfil 			: "Žaidėjo profilis",
		Coordinates 			: "Koordinatės",
		SpyReport 				: "Šnipų ataskaita",
		Delete 					: "Šalinti",
		Worker					: "Workers",
		Production				: "Income", 
		CurrentLevel			: "Current level",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};
};

Locale.Load_Texts_PT = function() {
	this.Text = {
		Option 					: "Opções",
		Opt_Table_Resources 	: "mostrar tabela de recursos",
		Opt_Table_Buildings 	: "mostrar tabela de construções",
		Opt_Table_Army 			: "mostrar tabela de exército",
		Opt_AutoUpdate 			: "instalar updates automaticamente",
		Opt_Language 			: "Idioma",
		Opt_Ticker				: "mostrar mensagens globais",
		New_Version 			: "nova versão",
		Available 				: "disponível",
		KlickToInstall 			: "Click para instalar a nova versão.",
		TimeToCaptcha 			: "Relógio anti bot",
		Castle 					: "Castelo",
		Castles 				: "Castelos",
		World 					: "Mundo",
		Close 					: "Fechar",
		Total					: "Total",
		BoardName 				: "Visão geral",
		Resources 				: "Recursos",
		Loyalty 				: "Lealdade",
		Gold 					: "Ouro",
		Iron	 				: "Ferro",
		Wood 					: "Madeira",
		Food 					: "Comida",
		Storage 				: "Armazém",
		Filled 					: "Cheio",
		FullIn 					: "Cheio em",
		Buildings 				: "Construções",
		Building 				: "Construção",
		Finished 				: "Terminado",
		Goldmine 				: "Mina de Ouro",
		Ironmine 				: "Mina de Ferro",
		Lumberjacks 			: "Madeireira",
		Farms 					: "Fazenda",
		Dwellings 				: "Moradias",
		Barracks 				: "Quartel",
		Stables 				: "Estábulo",
		Workshop 				: "Oficina",
		Marketplace 			: "Mercado",
		Blacksmith 				: "Ferreiro",
		Infirmary 				: "Enfermaria",
		Wall 					: "Muralha",
		Order 					: "Academia",
		Shelter 				: "Abrigo",
		Storages 				: "Armazéns",
		Units 					: "Unidades",
		Population 				: "População",
		Pikeman 				: "Lanceiro",
		Swordsman 				: "Espadachim",
		Axeman 					: "Guerreiro",
		Maceman 				: "Gladiador",
		Quickwalker 			: "Batedor",
		LCavalry 				: "Cavalaria Leve",
		HCavalry 				: "Cavalaria Pesada",
		Ram 					: "Ariete",
		Ballistician 			: "Balista",
		Catapult 				: "Catapulta",
		Trebuchet 				: "Trabuco",
		Shortbow 				: "Arqueiro Curto",
		Longbow 				: "Arqueiro Longo",
		Crossbow 				: "Besteiro",
		ArcherCavalry 			: "Cavalaria Arqueira",
		SpecialUnit 			: "Unidade Especial",
		Nobleman 				: "Nobre",	
		Reset					: "Resetar dados",
		Opt_DeleteAll			: "Deletar TODOS dados armazenados",
		DeleteDataQuestion		: "Você realmente deseja deletar TODOS dados armazenados?",
		ConvertRes		 		: "Mercado Interno",
		SendRes 				: "Enviar Recursos",
		ClanForum		 		: "Forum do Clan",
		VIPSearch				: "Procura VIP",
		Vote 					: "Votar",
		Archive 				: "Arquivar",
		ArchiveButton 			: "Arquivo",
		Sender 					: "De",
		Date 					: "Data",
		Message 				: "Mensagem",
		ArchivedMessages 		: "Mensagens Arquivadas",
		DeleteMessageQuestion 	: "Você quer apagar esta mensagem do arquivo?",
		BuddyList				: "Buddy-list",
		RemoveFromBuddyList 	: "Remove from buddy-list",
		Save					: "Save",
		Opt_ExtendedMap			: "Mapa Extendido (mostrar info de limpeza e cura no mapa)", 
		Opt_MapMinScavenge		: "Recurso mín. para mostrar no mapa",
		Opt_MapMinHealing		: "Cura mín. para mostrar no mapa",
		PlayerProfil			: "Info de jogador",
		Coordinates				: "Coordenadas",
		SpyReport				: "Espião",
		Delete					: "Eliminar",
		Worker					: "Trabalhadores",
		Production				: "Rendimento", 
		CurrentLevel			: "Nível Actual",
		NextLevel				: "Próximo Nível", 
		MaxLevelReached			: "Nível máximo atingido.",
	};
}

Locale.Load_Texts_UA= function() {
	this.Text = {
		Option 					: "Опції",
		Opt_Table_Resources 	: "Таблиця ресурсів",
		Opt_Table_Buildings 	: " Таблиця будинків",
		Opt_Table_Army 			: "Таблиця армії",
		Opt_AutoUpdate 			: "Автооновлення",
		Opt_Language 			: "Мова",
		Opt_Ticker 				: "Тікер",
		New_Version 			: "Нова версія",
		Available 				: "Дата виходу",
		KlickToInstall 			: "Встановити нову версію",
		TimeToCaptcha 			: "час інспекції",
		Castle 					: "Замок",
		Castles 				: "Замки",
		World 					: "Всесвіт",
		Close 					: "Закрити",
		Total 					: "Всього",
		BoardName 				: "Огляд Імперії",
		Resources 				: "Ресурси",
		Loyalty 				: "Лояльність",
		Gold 					: "Золото",
		Iron 					: "Залізо",
		Wood 					: "Дерево",
		Food 					: "Провізія",
		Storage 				: "Склад",
		Filled 					: "Заповнений",
		FullIn 					: "Брутто",
		Buildings 				: "Будинки",
		Building 				: "Будівництво",
		Finished 				: "Завершено",
		Goldmine 				: "Золотий рудник",
		Ironmine 				: "Залізний рудник",
		Lumberjacks 			: "Лісопилка",
		Farms			 		: "Ферма",
		Dwellings 				: "Поселення",
		Barracks 				: "Казарма",
		Stables 				: "Стайня",
		Workshop 				: "Майстерня",
		Marketplace 			: "Ринок",
		Blacksmith	 			: "Кузня",
		Infirmary 				: "Лазарет",
		Wall 					: "Стіна",
		Order 					: "Орден",
		Shelter 				: "Сховище",
		Storages 				: "Склади",
		Units 					: "Юніти",
		Population 				: "Населення",
		Pikeman 				: "Списник",
		Swordsman 				: "Мечник",
		Axeman 					: "Сокирник",
		Maceman 				: "Булавник",
		Quickwalker 			: "Розвідник",
		LCavalry 				: "Легка кавалерія",
		HCavalry			 	: "Тяжка кавалерія",
		Ram 					: "Таран",
		Ballistician 			: "Баліста",
		Catapult 				: "Катапульта",
		Trebuchet 				: "Требушет",
		Shortbow 				: "Стрілок",
		Longbow 				: "Лучник",
		Crossbow 				: "Арбалетник",
		ArcherCavalry 			: "Кінний лучник",
		SpecialUnit 			: "Унікальний юніт",
		Nobleman 				: "Аристократ",
		Reset 					: "Скидання",
		Opt_DeleteAll 			: "Видалити всі дані?",
		DeleteDataQuestion 		: "Видалити дані?",
		ConvertRes 				: "Внутрішній ринок",
		SendRes 				: "Відправка ресурсів",
		ClanForum 				: "Форум клану",
		VIPSearch 				: "VIP пошук ",
		Vote 					: "Голосуй за ресурси",
		Archive 				: "Архів",
		ArchiveButton 			: "Кнопка Архів",
		Sender 					: "Відправника",
		Date 					: "Дата",
		Message 				: "Повідомлення",
		ArchivedMessages 		: "Архів повідомлень",
		DeleteMessageQuestion	: "Ви хочете це повідомлення видалити?",
		BuddyList 				: "Список друзів",
		RemoveFromBuddyList 	: "Видалити зі списку друзів",
		Save	 				: "Зберегти",
		Opt_ExtendedMap 		: "Інформаційна карта (див. залишки битв і поранених)",
		Opt_MapMinScavenge 		: "min ресурсів показано на карті",
		Opt_MapMinHealing 		: "min поранених солдатів, показаний на карті",
		PlayerProfil 			: "Профіль гравця",
		Coordinates 			: "Координати",
		SpyReport 				: "Шпигунський звіт",
		Delete	 				: "Видалити",
		Worker					: "Workers",
		Production				: "Income", 
		CurrentLevel			: "Current level",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};
};

Locale.Load_Texts_VI = function() {
	this.Text = {
		Option					: "Thiết lập",
		Opt_Table_Resources 	: "Hiển thị bảng tổng quan tài nguyên",
		Opt_Table_Buildings 	: "Hiển thị bảng tổng quan công trình",
		Opt_Table_Army 			: "Hiển thị bảng thông tin quân đội",
		Opt_AutoUpdate			: "Tự động cài đặt phiên bản mới",
		Opt_Language			: "Ngôn ngữ",
		Opt_Ticker				: "display ticker messages",
		New_Version				: "Phiên bản mới",
		Available				: "có hiệu lực",
		KlickToInstall			: "Click,để cài đặt phiên bản mới",
		TimeToCaptcha			: "Thời gian Xác thực",
		Castle					: "Lâu đài",
		Castles					: "Danh mục lâu đài",
		World					: "Thế giới",
		Close					: "Đóng lại",
		Total					: "Tổng",
		BoardName				: "Bảng",
		Resources				: "Tổng quan tài nguyên",
		Loyalty					: "Điểm trung thành",
		Gold					: "Vàng",
		Iron					: "Sắt",
		Wood					: "Gỗ",
		Food					: "Thịt",
		Storage					: "Sức chứa",
		Filled					: "Chiếm",
		FullIn					: "Đầy trong",
		Buildings				: "Tổng quan công trình",
		Building				: "Đang xây dựng",
		Finished				: "Hoàn thành",
		Goldmine				: "Mỏ vàng",
		Ironmine				: "Mỏ sắt",
		Lumberjacks				: "Nhà ĐốnGỗ",
		Farms					: "Nông trại",
		Dwellings				: "Nhà dân",
		Barracks				: "Trại lính",
		Stables					: "Trại ngựa",
		Workshop				: "Xưởng CơGiới",
		Marketplace				: "Khu chợ",
		Blacksmith				: "Lò rèn",
		Infirmary				: "Bệnh xá",
		Wall					: "Tường thành",
		Order					: "Thánh điện",
		Shelter					: "Hầm chứa",
		Storages				: "Kho hàng",
		Units					: "Thông tin quân đội",
		Population				: "Quân số",
		Pikeman					: "Giáo binh",
		Swordsman				: "Kiếm sĩ",
		Axeman					: "Phủ quân",
		Maceman					: "Chùy quân",
		Quickwalker				: "Thiên lý mã",
		LCavalry				: "Kỵ binh",
		HCavalry 				: "Kỵ sỹ",
		Ram						: "Thiết chiến xa",
		Ballistician			: "Tiễn xa",
		Catapult				: "Thạch xa",
		Trebuchet				: "Đẩu thạch cơ",
		Shortbow				: "Cung thủ",
		Longbow 				: "Trường cung thủ",
		Crossbow				: "Thập tự cung",
		ArcherCavalry 			: "Xạ kỵ binh",
		SpecialUnit				: "Quân đặc biệt",
		Nobleman				: "Quý tộc",
		Reset					: "Làm mới dữ liệu",
		Opt_DeleteAll			: "Xóa tất cả dữ liệu cũ",
		DeleteDataQuestion		: "Bạn có muốn xóa tất cả dữ liệu cũ?",
		ConvertRes				: "Internal market",
		SendRes					: "Send Resources",
		ClanForum				: "Clan-Forum",
		VIPSearch				: "VIP-Search",
		Vote					: "Vote",
		Archive					: "Archive",
		ArchiveButton			: "Archive",
		Sender					: "From",
		Date					: "Date",
		Message					: "Message",
		ArchivedMessages		: "Archived messages",
		DeleteMessageQuestion	: "Do you want to delete that message from archive?",
		BuddyList				: "Buddy-list",
		RemoveFromBuddyList 	: "Remove from buddy-list",
		Save					: "Save",
		Opt_ExtendedMap			: "Extended Map (show scavenge and healing info on map)", 
		Opt_MapMinScavenge		: "min. resources to show on map",
		Opt_MapMinHealing		: "min. healings to show on map",
		PlayerProfil			: "Player Info",
		Coordinates				: "Coordinates",
		SpyReport				: "Spy",
		Delete					: "Delete",
		Worker					: "Workers",
		Production				: "Income", 
		CurrentLevel			: "Current level",
		NextLevel				: "Next level", 
		MaxLevelReached			: "Maximum level reached.",
	};
};
	
// -----------------------------------------------------------------------
// EmpireBoard-Renderer
// -----------------------------------------------------------------------

EmpireBoard.Renders.Init = function() {
	Logger.Debug('EmpireBoard.Renders.Init');
	this.Set_Styles();	
};

EmpireBoard.Renders.Set_Styles = function() {
	var default_style = "								\
		.EmpireBoardCastleList {                        \
			width: 230px;                               \
			float: left;                                \
		}                                               \
		                                                \
		.EmpireBoardCastleList .leftMenu {              \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/subnav_bottom.png') 0 bottom no-repeat; \
			padding: 0 0 39px 0;                        \
		}                                               \
                                                        \
		.EmpireBoardCastleList .leftMenu .wrapper {     \
			padding: 20px 0 0 0;                        \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/subnav_top.png') no-repeat; \
		}                                               \
		                                                \
		.EmpireBoardCastleList .leftMenu h2 {           \
			height: 43px;                               \
			line-height: 43px;                          \
			text-align: center;                         \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/subnav_title.png') no-repeat; \
			padding: 13px 0 15px 0;                     \
			color: #633e20;                             \
			font-size: 15px;                            \
			font-weight: bold;                          \
			text-shadow: 0px 1px 0px #ffe792;           \
			-moz-text-shadow: 0px 1px 0px #ffe792;      \
			-webkit-text-shadow: 0px 1px 0px #ffe792;   \
		}                                               \
		                                                \
		.EmpireBoardCastleList dd                       \
		{                                               \
			border: 1px solid #ffd678;                  \
			padding: 0 0 5px 0;                         \
			margin: 0 0 5px 0;                          \
			background: #ffd499;                        \
			border-radius: 8px; -moz-border-radius: 8px;\
		}                                               \
                                                        \
		.EmpireBoardCastleList dd.current               \
		{                                               \
			background: #B38254;                        \
		}                                               \
		                                                \
		.EmpireBoardCastleList dd a                     \
		{		                                        \
			display: block;                             \
			cursor: pointer;                            \
			text-decoration: none;                      \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/h_ico_castle_menu.png') -10px -5px no-repeat; \
			padding: 5px 5px 5px 45px;                  \
			border-radius: 5px;                         \
			-moz-border-radius: 5px;                    \
			-webkit-border-radius: 5px;                 \
		}                                               \
		                                                \
		.EmpireBoardCastleList dd a.capital {           \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/h_ico_castle_menu.png') -10px -125px no-repeat; \
		}                                               \
                                                        \
		.EmpireBoardCastleList dd a.camp {              \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/map/camp.png')  no-repeat; \
		}                                               \
		                                                \
		.EmpireBoardCastleList dd big                   \
		{                                               \
			display: block;                             \
			font-size: 12px;                            \
			line-height: 11px;                          \
			font-weight: bold;                          \
			color: #000;                                \
			margin: 0 0 4px 0;                          \
		}                                               \
                                                        \
		.EmpireBoardCastleList dd small                 \
		{                                               \
			display: block;                             \
			color: #000000;                             \
			font-size: 11px;                            \
			line-height: 11px;                          \
		}	                                            \
		                                                \
		.EmpireBoard                                    \
		{                                               \
			width: 900px;                               \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/c_bknd.jpg') center center no-repeat; \
			border-radius: 8px;                         \
			-moz-border-radius: 8px;                    \
		}                                               \
		                                                \
		.EmpireBoard table                              \
		{                                               \
			padding: 3px;                               \
			width: 880px;                               \
			background: #ffd499;                        \
			border-radius: 8px;                         \
			-moz-border-radius: 8px;                    \
		}                                               \
                                                        \
		.EmpireBoard h2                                 \
		{                                               \
			color: #fff;                                \
			font-size: 16px;                            \
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/title_h2_back.png') right center no-repeat; \
			height: 38px;                               \
			line-height: 38px;                          \
			padding: 0 14px;                            \
			margin-Bottom: 10px;                        \
			text-shadow:0px 2px 3px #000;               \
			border-radius: 8px;                         \
			-moz-border-radius: 8px;                    \
			-webkit-border-radius: 8px;                 \
			box-shadow: 0 0 8px #000;                   \
			-moz-box-shadow: 0 0 8px #000;              \
			-webkit-box-shadow: 0 0 8px #000;           \
			border:1px solid #000;                      \
			border-top:1px solid #582801;               \
		}                                               \
                                                        \
		.EmpireBoard table thead tr td                  \
		{                                               \
			font-size: 9px;                             \
			text-transform: uppercase;                  \
			background: #b38254;                        \
			padding: 5px;                               \
			color: #000;                                \
			text-align: center;                         \
			font-weight: bold;                          \
			border-radius: 3px;                         \
			-moz-border-radius: 3px;                    \
			-webkit-border-radius: 3px;                 \
			max-width:25px;                             \
			overflow:hidden;                            \
		}                                               \
                                                        \
		.EmpireBoard table tbody tr.current             \
		{                                               \
			background: #D0B45F;                        \
		}                                               \
                                                        \
		.EmpireBoard table tbody tr td                  \
		{                                               \
			padding: 1px;                               \
			border-bottom: 1px solid #d0b45f;           \
		}                                               \
                                                        \
		.EmpireBoard table tbody tr td a,               \
		.EmpireBoard table thead tr td a                \
		{                                               \
			color: #000;                                \
		}                                               \
                                                        \
		.EmpireBoard table tbody tr td img              \
		{                                               \
			vertical-align: middle;		                \
		}                                               \
		                                                \
		.EmpireBoard table tbody tr td.number           \
		{                                               \
			font-size: 11px;                            \
			border-bottom: 1px solid #9F9595;           \
			padding-left: 3px;                          \
			padding-right: 2px;                         \
			color: 000;                                 \
			text-align:right;                           \
			vertical-align: top;			            \
		}                                               \
                                                        \
		.EmpireBoard table tbody tr p.number            \
		{                                               \
			padding-left: 3px;                          \
			padding-right: 2px;                         \
			color: 000;                                 \
			text-align:right;                           \
			vertical-align: top;			            \
		}		                                        \
		                                                \
		.EmpireBoard table tbody tr td.Sum              \
		{                                               \
			font-size: 11px;                            \
			border-bottom: 1px solid #9F9595;           \
			padding: 5px;                               \
			color: #000;                                \
			text-align:right;                           \
			font-weight: bold;                          \
			vertical-align: top;			            \
		}                                               \
                                                        \
		.EmpireBoard table tbody tr td a img            \
		{                                               \
			text-decoration:none;                       \
			border: none;                               \
		}                                               \
		                                                \
		.EmpireBoard table.Percent                      \
		{                                               \
			border-spacing: 0;                          \
			border-collapse: collapse;                  \
			height: 4px;                                \
			width: 92%;                                 \
			margin-left: 3px;                           \
			margin-right: 3px;                          \
			margin-top:2px;                             \
			margin-bottom:2px;                          \
		}                                               \
                                                        \
		.EmpireBoard table.Percent td                   \
		{                                               \
			color: black;                               \
			background-color: #a1a1a1;                  \
			min-width: 0px;                             \
			height: 4px;                                \
			border: 1px solid black;                    \
			padding: 0;			                        \
		}		                                        \
		                                                \
		.EmpireBoard table.Percent td.Normal            \
		{                                               \
			background-color: #73443E;                  \
		}		                                        \
		.EmpireBoard table.Percent td.Warning           \
		{                                               \
			background-color: #8F1D1A;                  \
		}		                                        \
		.EmpireBoard table.Percent td.AlmostFull        \
		{                                               \
			background-color: #B42521;                  \
		}		                                        \
		.EmpireBoard table.Percent td.Full              \
		{                                               \
			background-color: #ff0000;                  \
		}												\
														\
		.EmpireBoardBuildingQueue {						\
			color: darkgreen;							\
			font-weight:bold;							\
		}												\
														\
		.Footer {										\
			color: white;								\
			padding: 5px;								\
			text-align: right;							\
		}												\
														\
		.Footer a {										\
			color: white;								\
		}												\
														\
		.optionButton {									\
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/map/gotomap.gif') no-repeat scroll 0 0 ; \
			margin-left: 10px;							\
			padding: 5px;								\
			border: 1px solid #FFD499;                  \
			min-width: 40px;                            \
			border-radius: 3px;                         \
			-moz-border-radius: 3px;                    \
			-webkit-border-radius: 3px;                 \
		}												\
														\
		#deleteButton {									\
			-moz-border-radius: 5px 5px 5px 5px;		\
			background: url(\"http://static.xs-software.com/khanwars/game3.0/img/3.0/submit_bknd.jpg\") repeat-x scroll 0 0 #925E2C;	\
			border: 1px solid #DFB388;					\
			color: #FFFFFF;								\
			cursor: pointer;							\
			font-size: 12px;							\
			font-weight: bold;							\
			padding: 6px 12px;							\
			text-align: center;							\
			text-transform: uppercase;					\
		}												\
														\
		#deleteButton:hover {							\
			background: none repeat scroll 0 0 #4F2E0F; \
			border-color: #FFFFFF;						\
		}												\
														\
		#EmpireBoardQuickLinks ul {						\
			list-style : none outside none;				\
		}												\
														\
		#EmpireBoardQuickLinks  {						\
			padding: 3px;								\
			margin: 5px;								\
			height: 20px;								\
		}												\
														\
		#EmpireBoardQuickLinks ul li a:hover {			\
			background: none repeat scroll 0 0 #EEB661;	\
			border-color: #FDD79D #F2BD6C #EEB661;		\
			color: #452604;								\
			text-shadow: 0 1px 0 #FDD79E;				\
		}												\
														\
		#EmpireBoardQuickLinks ul li a {				\
			-moz-border-radius: 5px 5px 5px 5px;		\
			background: none repeat scroll 0 0 #452604;	\
			border-color: #1A0001 #452604 #774F2A;		\
			border-style: solid;						\
			border-width: 1px;							\
			color: #F1DFCD;								\
			cursor: pointer;							\
			display: block;								\
			float: left;								\
			font-size: 11px;							\
			line-height: 11px;							\
			padding: 4px 8px 7px;						\
			text-decoration: none;						\
		}												\
														\
		#EmpireBoardQuickLinks ul li {					\
			float: left;								\
			margin: 0 3px;								\
		}												\
														\
		.message p.options a#archive {					\
			background-image: url(" + ImageData.ArchiveMessageButton + ")\
		}												\
														\
		.EmpireBoardMessageArchive {					\
			width: 100%;								\
			max-height: 300px;							\
			overflow:scroll;overflow-x: auto;			\
		}												\
														\
		.EmpireBoardMessageTable {						\
			padding: 3px;                               \
			width: 100%;                                \
			background: #ffd499;                        \
		}												\
														\
		.EmpireBoardMessageTable tbody tr td 	        \
		{                                               \
			font-size: 9px;                             \
			padding: 5px;                               \
			border-bottom: 1px solid #9F9595;           \
			max-width:300px; 							\
			max-height:20px; 							\
			overflow:hidden;                           	\
		} 												\
														\
		.EmpireBoardMessageTable tbody tr.current       \
		{                                               \
			background: #d0b45f;    			        \
		} 												\
														\
		.EmpireBoardMessageTable thead tr td 	        \
		{                                               \
			font-size: 9px;                             \
			text-transform: uppercase;                  \
			background: #b38254;                        \
			padding: 5px;                               \
			color: #000;                                \
			text-align: center;                         \
			font-weight: bold;                          \
			border-radius: 3px;                         \
			-moz-border-radius: 3px;                    \
			-webkit-border-radius: 3px;                 \
			overflow:hidden;                            \
		} 												\
														\
		.EmpireBoardMessageTable .send       			\
		{                                               \
			color: blue;    			        		\
		} 												\
														\
		.EmpireBoardMessageTable .received     			\
		{                                               \
			color: green;    			        		\
		} 												\
														\
		#header .topMenu.left {							\
			right: 0 !important;						\
		}												\
														\
		.EmpireBoardMarch {								\
			border-spacing: 1;                          \
			border-collapse: collapse;                  \
		}												\
														\
		.EmpireBoardMarch tbody tr td {					\
			border: 0px !important;						\
			padding: 1px !important;					\
		}												\
														\
		.EmpireBoardMarchCastleName {					\
			font-size: 10px; 							\
			text-decoration: none; 						\
			white-space:nowrap; 						\
		}												\
														\
		.EmpireBoardMarchContent {						\
			font-size: 10px; 							\
			text-decoration: none; 						\
			white-space:nowrap; 						\
		}												\
														\
		.marchType-2, .marchType-3, .marchType-4, 		\
		.marchType-5, .marchType-7 {					\
			color: #FFFFFF !important;					\
		}												\
														\
		.marchType-7 {									\
			background-color: #FFA500 !important;		\
		}												\
														\
		.marchType-8 {									\
			background-color: #4682B4  !important;		\
		}												\
														\
		.EmpireBoardArmyQueue {							\
			border-spacing: 0;                          \
			border-collapse: collapse;                  \
		}												\
														\
		.EmpireBoardArmyQueue td {						\
			text-align : right;							\
			padding: 1px 5px;							\
		}												\
		.EmpireBoardArmyQueue td {						\
		}												\
														\
		.EmpireBoardArmyQueue td.finished {				\
			color : lightgreen;							\
		}												\
														\
		.EmpireBoardArmyQueue tr.sum {					\
			border-top: 1px solid #9F9595;           	\
			font-weight: bold;                          \
		}												\
														\
		#EmpireBoardBuddyList  {						\
			background: url(\"http://static.xs-software.com/khanwars/game3.0/img/3.0/hotlinks_top.png\") no-repeat scroll 0 0 transparent; \
			position: absolute;           				\
			left: -40px;                          		\
			width: 170px;								\
			top: 50px;									\
			z-index: 5;									\
		}												\
														\
		#EmpireBoardBuddyList .wrapper {				\
			background: url(\"http://static.xs-software.com/khanwars/game3.0/img/3.0/hotlinks_bottom.png\") no-repeat scroll 0 bottom transparent;\
			overflow: hidden;                           \
			padding: 0 16px 16px 8px;                   \
		}												\
														\
		#EmpireBoardBuddyList span.title {				\
			color: #E0944A;								\
			display: block;								\
			font-size: 11px;							\
			font-weight: bold;							\
			padding: 13px 0 10px 25px;					\
		}												\
														\
		#EmpireBoardBuddyList table {					\
			border-spacing: 0;                          \
			border-collapse: collapse;                  \
			width: 100%;                  				\
		}												\
														\
		#EmpireBoardBuddyList td {						\
			font-size: 11px;							\
			background-color: #37220F;					\
			border-bottom: 1px solid #825325;			\
			padding: 3px 3px;							\
			text-align: right;							\
			white-space:nowrap;; 						\
			max-width:114px; 							\
			overflow: hidden;                           \
		}												\
														\
		#EmpireBoardBuddyList a {						\
			color: #ECBC8D;								\
			font-weight: bold;							\
			text-decoration: none;						\
		}												\
														\
		.EmpireBoardProfilCastleList tbody tr.current   \
		{                                               \
			background: #D0B45F;                        \
		}                                               \
                                                        \
		.mapBlock .s99 {								\
			background: url(" + ImageData.MapIconSpyReport + ") repeat scroll 0 0 transparent;	\
			position: absolute;							\
			left: 19px;									\
			top: 1px;									\
		}												\
		.box p.options a#delete {						\
			background-image: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/msg_delete.gif');	\
		}												\
														\
		.box p.options a {								\
			background-repeat: no-repeat;				\
			font-size: 11px;							\
			font-weight: bold;							\
			padding: 0 6px 0 17px;						\
		}												\
														\
		.box p.options {								\
			border-top: 1px dashed #BF8853;				\
			margin: 10px 0 0;							\
			overflow: hidden;							\
			padding: 5px 0 0;							\
		}												\
														\
		ul.topMenu li a#WorldMapCurrCastle.Normal{		\
			background: url('" + ImageData.WorldMapIconCastle + "') no-repeat scroll 5px 4px transparent;\
		}												\
														\
		ul.topMenu li a#WorldMapCurrCastle.IsCapital{	\
			background: url('" + ImageData.WorldMapIconCapital + "') no-repeat scroll 5px 4px transparent;\
		}												\
														\
		ul.topMenu li a#WorldMapCurrPlayer {			\
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/overview/player.gif') no-repeat scroll 5px 4px transparent;\
		}												\
														\
		ul.topMenu li a#WorldMapCurrClan {				\
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/icon_clan.gif') no-repeat scroll 5px 4px transparent;\
		}												\
														\
		ul.topMenu li a.Default {						\
			background: no-repeat scroll 5px 4px transparent;\
			padding: 5px 5px 5px 5px;					\
			text-align: center;							\
		}												\
														\
		.important {									\
			font-weight: bold;							\
			color: red;									\
		}												\
														\
		.warning {										\
			font-weight: bold;							\
			color: orange;								\
		}												\
														\
		.EmpireBoardWorkersStats {						\
			color: #674307;								\
			font-size: 14px;							\
			padding: 5px;								\
			text-shadow: 0 1px 1px #D5AC59;				\
		}												\
														\
		.EmpireBoardBuildingLevel {						\
			color: #E4BD6F;								\
			font-size: 14px;							\
			text-shadow: 0 1px 0 #000000;				\
			font-weight: bold;							\
			padding: 3px;								\
		}												\
														\
		.EmpireBoardBuildingName {						\
			color: #FFFFFF;								\
			font-size: 16px;							\
			font-weight: bold;							\
			padding: 5px 0px;							\
		}												\
														\
		a.EmpireBoardWorkersSaveButton {				\
			-moz-border-radius: 10px 10px 10px 10px;	\
			border-radius: 10px 10px 10px 10px;			\
			background: url('http://static.xs-software.com/khanwars/game3.0/img/3.0/overview/dialog_button.jpg') repeat-x scroll 0 0 transparent;\
			border: 1px solid #D5AC59;					\
			color: #D5AC59;								\
			display: block;								\
			float: right;								\
			font-weight: bold;							\
			font-size: 14px;							\
			line-height: 25px;							\
			padding: 0 20px;							\
			margin: -4px 15px;							\
			text-decoration: none;						\
			text-shadow: 0 2px 2px #000000;				\
		}												\
														\
		.EmpireBoardDialogHeader {						\
			-moz-border-radius: 5px 5px 5px 5px;		\
			border-radius: 5px;							\
			background: none repeat scroll 0 0 #E4BD6F;	\
			color: #674307;								\
			font-size: 16px;							\
			font-weight: bold;							\
			padding: 10px;								\
		}												\
														\
		";
	
	GM_addStyle(default_style);
};	

EmpireBoard.Renders.Render = function() {
	Logger.Debug('EmpireBoard.Renders.Render');

	var contentDiv = document.getElementById('pageBody');
	
	var clearDiv = document.createElement("div");
	clearDiv.setAttribute("style", "clear: both;");
	contentDiv.appendChild(clearDiv);
	
	var boardDiv = document.createElement("div");
	boardDiv.setAttribute('class', 'EmpireBoard');
	
	// Ressourcen-Liste rendern
	if (EmpireBoard.DB.Options["Table_Resources"]) {	
		this.Render_Resource_List(boardDiv);
	}
	
	// Buildinglist rendern 
	if (EmpireBoard.DB.Options["Table_Buildings"]) {
		this.Render_Building_List(boardDiv);
	}
	
	// Units rendern
	if (EmpireBoard.DB.Options["Table_Army"]) {
		this.Render_Unit_List(boardDiv);
	}
	
	// Footer und Optionen rendern 
	this.Render_Options(boardDiv);
	
	contentDiv.appendChild(boardDiv);	
	
	if (EmpireBoard.Khanwars.IsMap()) {	
		this.Render_CampZoomFix();
		this.Render_WorldMap();
	}


	this.Render_CaptchaButton();

	// Burgnamen in Mark-Auswahl schreiben
	if (EmpireBoard.Khanwars.IsMarket()) {
		EmpireBoard.Renders.Render_MarketList();
	}
	
	// insert buddylist buttons 
	if (EmpireBoard.Khanwars.IsPlayerPreview()) {
		EmpireBoard.Renders.Render_BuddyListButtons();
	}

	// insert tab with castles of player 
	if (EmpireBoard.Khanwars.IsPreview()) {
		EmpireBoard.Renders.Render_PlayerInfo();
		EmpireBoard.Renders.Fix_KB_Link();
	}	
	
	if (EmpireBoard.Khanwars.IsMessages()) {
		EmpireBoard.Renders.Render_MessageArchiveButton();
		EmpireBoard.Renders.Render_HighlightCurrentMessageCategory();
		EmpireBoard.Renders.Render_SaveToArchiveButtons();
	}
	
	if (EmpireBoard.Khanwars.IsMessagesArchive()) {
		EmpireBoard.Renders.Render_MessageArchive();
	}
	
	// replace coordinates with castlenames 
	if (EmpireBoard.Khanwars.IsPohod()) {
		EmpireBoard.Renders.Render_Pohod();
		EmpireBoard.Renders.Render_CastleFilter();
		EmpireBoard.Renders.Render_MarchPage();
	}
	
	// enable / disable ticker
	if (!EmpireBoard.DB.Options["Ticker"]) {	
		var ticker = document.getElementById("scroller");
		ticker.parentNode.removeChild(ticker);
	}
	
	// link on top of scr
	EmpireBoard.Renders.Render_QuickLinks();
	
	// buddy-list
	if (EmpireBoard.DB.Options["BuddyList"]) {
		EmpireBoard.Renders.Render_BuddyList();
	}
	
	// attatch to kw-buddy-list to add remove-Handler
	if (EmpireBoard.Khanwars.IsBuddyList()) {
		EmpireBoard.Renders.Render_AttachToRemoveButtons();
	}
	
	if (EmpireBoard.Khanwars.IsCalculator()) {
		EmpireBoard.Renders.Render_Calculator();
	}

	if (EmpireBoard.Khanwars.IsVipSearch()) {
		EmpireBoard.Renders.Render_VipSearch();
	}
	
	if (EmpireBoard.Khanwars.IsOverview()) {
		EmpireBoard.Renders.Render_OverviewMenu();
		EmpireBoard.Renders.Render_WorkerButton();
	}
};

EmpireBoard.Renders.Render_MarchPage = function() {
	var isAtteckPage = EmpireBoard.DOM.Get_Nodes("//div[@class='box']//label[@for='att_x']");
	if (isAtteckPage.snapshotLength == 0) {
		return;
	}
	
	//alert("found");
	// TODO calculate and display arrival- and return-time for march.
}

// remove if bug is fixed in khanwars 
EmpireBoard.Renders.Fix_KB_Link = function() {
	var links = EmpireBoard.DOM.Get_Nodes("//img[contains(@src, 'report_version.gif')]");
	for (var i = 0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		link.setAttribute("src", "http://static.xs-software.com/khanwars/game3.0/css/../img/3.0/map/gotomap.gif");
	}
}

EmpireBoard.Renders.Render_CastleFilter = function() {
	if (EmpireBoard.CastleFilter != "0") {	
		var filter = EmpireBoard.DOM.Get_First_Node("//form[@name='filterForm']//select[@name='filter']");
		filter.setAttribute("style", "border: 1px solid #FF0000");
		
		if (window.location.search.indexOf("filter") == -1) {
			if (window.location.search != "") {
				window.location += "&filter=" + EmpireBoard.CastleFilter;
			} 
			else {
				window.location += "?filter=" + EmpireBoard.CastleFilter;
			}
		}
	}
}

EmpireBoard.Renders.Render_AttachToRemoveButtons = function() {
	var removeButtons = EmpireBoard.DOM.Get_Nodes("//a[@class='deletePlayer']");
	for (var i = 0; i < removeButtons.snapshotLength; i++) {
		var removeButton = removeButtons.snapshotItem(i);
		var buddyId = removeButton.href.match(/delbuddy=\d+/)[0].match(/\d+/)[0];		
		removeButton.addEventListener("click", EmpireBoard.Handler.RemoveBuddyButtonClicked, true);
	}
}

EmpireBoard.Renders.Render_BuddyListButtons = function() {
	var playerId = parseInt(window.location.href.match(/id=\d+/)[0].match(/\d+/)[0]);
	var addBuddyButton = EmpireBoard.DOM.Get_Nodes("//div[@class='leftMenu']//a[contains(@href, 'buddylist.php')]").snapshotItem(0);
	addBuddyButton.title = playerId;
	addBuddyButton.addEventListener("click", EmpireBoard.Handler.AddBuddyButtonClicked, true);
	
	var username = EmpireBoard.Khanwars.GetPlayerNameFromPreview(document);
	var buddy = EmpireBoard.DB.GetBuddyByName(username);
	if (buddy) {
		var leftMenu = EmpireBoard.DOM.Get_Nodes("//div[@class='leftMenu']//ul[@class='menu']").snapshotItem(0);
		var removeButton = document.createElement("li");
		var removeLink = document.createElement("a");
		removeLink.title = Locale.Text.RemoveFromBuddyList;
		removeLink.innerHTML = Locale.Text.RemoveFromBuddyList;
		removeLink.href = "/buddylist.php?delbuddy=" + buddy.Id;
		removeLink.addEventListener("click", EmpireBoard.Handler.RemoveBuddyButtonClicked, true);
		removeButton.appendChild(removeLink);
		leftMenu.appendChild(removeButton);
	}
}

EmpireBoard.Renders.Render_BuddyList = function() {
	var mainWrapper = document.getElementById("mainWrapper");	
	var buddyList = document.createElement("div");
	buddyList.id = "EmpireBoardBuddyList";
	
	var buddyTable = "<span class='title'><a href='/buddylist.php'>" + Locale.Text.BuddyList + "</a></span><div class=\"wrapper\"><table>";
	
	var sortedBuddyList = EmpireBoard.DB.SortBuddyList(EmpireBoard.DB.BuddyList);	
	
	for (var idx = 0; idx < sortedBuddyList.length; idx++) {
		var buddyId = sortedBuddyList[idx];
		if (buddyId == "LastFetched") {
			continue;
		}
		
		var buddy = EmpireBoard.DB.BuddyList[buddyId];
		buddyTable += "<tr>";
		buddyTable += "<td><a href='/writenote.php?player_to=" + buddy.Name + "'><img src='" + ImageData.ButtonSendMail + "' border='0'></a></td>";
		buddyTable += "<td><a href=\"/preview.php?player_id=" + buddy.Id + "\">" + buddy.Name + "</a></td><td>";
		if ((Str.Now() - buddy.LastOnline) / 1000 / 60 / 60 < 1 ) {
			buddyTable += "<img title=\"" + Str.FormatDate(new Date(buddy.LastOnline)) + "\" src=\"" + ImageData.BuddyOnlineIcon + "\">";
		}
		else {
			buddyTable += "<img title=\"" + Str.FormatDate(new Date(buddy.LastOnline)) + "\" src=\"" + ImageData.BuddyOfflineIcon + "\">";
		}
		buddyTable += "</td></tr>";
	}
	buddyTable += "</table></div>";
	
	buddyList.innerHTML = buddyTable;
	mainWrapper.appendChild(buddyList);
	
	var hotlinksMenu = document.getElementById("hotlinksMenu");
	var top = 50 + buddyList.clientHeight + 15;
	if (hotlinksMenu && top > 305) {				
		hotlinksMenu.setAttribute("style", "top:" + top + "px;");
		var showHotLinks = document.getElementById("showHotLinks");
		showHotLinks.setAttribute("style", "top:" + (top + 7) + "px;");
	}	
}

EmpireBoard.Renders.Render_QuickLinks = function() {
	var insertionPoint = document.getElementById("content");
	if (insertionPoint) {
		var linkNode = document.createElement("div");
		linkNode.id = "EmpireBoardQuickLinks";	  
		linkNode.innerHTML = "<ul>" + 
			"<li><a href=\"market.php?action=4\">" + Locale.Text.ConvertRes + "</a></li>" +
			"<li><a href=\"market.php?action=2\">" + Locale.Text.SendRes + "</a></li>" +
			"<li><a href=\"vip_status.php\">" + Locale.Text.BoardName    + "</a></li>" +
			"<li><a href=\"forum.php\">" + Locale.Text.ClanForum  + "</a></li>" +
			"<li><a href=\"vip_search.php\">" + Locale.Text.VIPSearch  + "</a></li>" +
			"<li><a href=\"vote.php\">" + Locale.Text.Vote + "</a></li></ul>";
		insertionPoint.insertBefore(linkNode, insertionPoint.firstChild);
		var mapButtons = document.getElementById("mapButtons");
		if (mapButtons) {
			mapButtons.style.top = "72px";
		}
	}
}

EmpireBoard.Renders.Render_Pohod = function(){
	var marchesRows = EmpireBoard.DOM.Get_Nodes("//div[@class='box']//table[@class='center']//tbody//tr");
	if (marchesRows.snapshotLength == 0) {
		return;
	}
	
	for (var idx = 0; idx < marchesRows.snapshotLength; idx++) {
		var marchesRow = marchesRows.snapshotItem(idx);
		if (marchesRow.childNodes.length > 15) {
			EmpireBoard.Renders.MarchRecallButton(marchesRow);
			marchesRow.removeChild(marchesRow.childNodes[15]);
		}

		// fromCastle
		EmpireBoard.Renders.MarchCoordinate(marchesRow.childNodes[5]);		
		// toCastle
		EmpireBoard.Renders.MarchCoordinate(marchesRow.childNodes[7]);
		// Content
		EmpireBoard.Renders.MarchContent(marchesRow.childNodes[9]);		
	}	
	
	var headerRows = EmpireBoard.DOM.Get_Nodes("//div[@class='box']//table[@class='center']//thead//tr");
	for (var idx = 0; idx < headerRows.snapshotLength; idx++) {
		var headerRow = headerRows.snapshotItem(idx);
		if (headerRow.childNodes.length > 15) {
			headerRow.removeChild(headerRow.childNodes[15]);
		}		
	}
}

EmpireBoard.Renders.MarchRecallButton = function(marchesRow) {

	var recallCell = marchesRow.childNodes[15]; 
	var recallButton = recallCell.getElementsByTagName("a")[0];	
	if (!recallButton){		
		return;
	}
	
	recallButton.setAttribute("title", recallButton.innerHTML);
	recallButton.setAttribute("onclick", "");
	recallCell.removeChild(recallButton);
	var infoCell = marchesRow.childNodes[1];
	recallButton.innerHTML = "<img src='" + ImageData.RecallButton + "' border='0' width='14'>";
	infoCell.appendChild(recallButton);
}

EmpireBoard.Renders.MarchContent = function(node) {
	var button = node.childNodes[0];
	if (!button || !button.href) {
		// button not available in multi-target-marches
		return;
	}
	
	var href = button.href;
	var content = href.replace(/,/gi, "");
	content = content.replace(/%20/gi, "");
	content = content.match(/\d+/g);
	
	if (content.length < 5) {
		var res = "-";
		var pop = parseInt(content[0], 10);
	}
	else {
		var gold = parseInt(content[0], 10);
		var iron = parseInt(content[1], 10);
		var wood = parseInt(content[2], 10);
		var food = parseInt(content[3], 10);
		var pop = parseInt(content[4], 10);
		var total = gold + iron + wood + food;
		if (total == 0) {
			var res = "-";
		}
		else {
			var res = (gold > 1000 ? Math.round(gold / 1000) + "K" : gold) + "/" +
					  (iron > 1000 ? Math.round(iron / 1000) + "K" : iron) + "/" +
					  (wood > 1000 ? Math.round(wood / 1000) + "K" : wood) + "/" +
					  (food > 1000 ? Math.round(food / 1000) + "K" : food);
		}
	}
	
	node.innerHTML = "<span class=\"EmpireBoardMarchContent\">" +
			"<a href=\"" + href + "\"><img src=\"" + ImageData.IconMarchRes + "\" border=\"0\"></a>&nbsp;" + res + "<br/>" +
			"<a href=\"" + href + "\"><img src=\"" + ImageData.IconMarchPop + "\" border=\"0\"></a>&nbsp;" + Str.ToDecimalGrouping(pop) + "</span>";
}

EmpireBoard.Renders.MarchCoordinate = function(node) {
	var castleKoord = node.innerHTML.match(/\d+:\d+/);
	var castleId = "(" + castleKoord + ")"
	var castle = EmpireBoard.DB.CurrentCastles[castleId];
		
	if (!castle) {
		var x = castleKoord[0].match(/\d+/g)[0];
		var y = castleKoord[0].match(/\d+/g)[1];
		var key = x + ":" + y;
		var castle = EmpireBoard.DB.MapData[key];
		if (!castle) {
			castle = new MapItem();
		}
		var castleName = castle.Castle;
		var castleId = castle.CastleId;
	} 
	else {
		var x = castle.X;
		var y = castle.Y;
		var castleName = castle.Name;
		var castleId = castle.Id;
	}
	
	var formatedCastle = "<table class='EmpireBoardMarch'><tr><td style='width:11px'>" + 
						"<a href='map.php?setx=" + x + "&sety=" + y + "'>" +
						"<img src='http://static.xs-software.com/khanwars/game3.0/img/3.0/map/gotocoords.gif' height='11px' style='border-style:none;'></a></td><td rowspan='2'>" +
						node.innerHTML + "</td></tr><tr><td>" + 
						"<a href='pohod.php?attackx=" + x + "&attacky=" + y + "'>" +
						"<img src='" + ImageData.ButtonAttack + "' height='11px' style='border-style:none;'></a></td></tr>" +
						"<tr><td colspan='2' class='EmpireBoardMarchCastleName'><a href='preview.php?castle_id=" + castleId + "'>" + castleName + "</a></td></tr></table>";
						
	node.innerHTML = formatedCastle;
	node.style.overflow = "hidden";
	node.style.maxWidth = "75px";
}

EmpireBoard.Renders.Render_HighlightCurrentMessageCategory = function(){
	var messageNavButtons = EmpireBoard.DOM.Get_Nodes("//ul[@class='buttons messages']//a");
	for (var i = 0; i < messageNavButtons.snapshotLength; i++){
		var navButton = messageNavButtons.snapshotItem(i);
		if (window.location.href.indexOf(navButton.getAttribute("href")) > 0) {
			navButton.setAttribute("style", "color: #FFC496;background:none repeat scroll 0 0 rgba(52, 23, 0, 0.7);");
		}
	}	
}

EmpireBoard.Renders.Render_MessageArchive = function(){
	// Info-Banner entfernen	
	var infoBann = EmpireBoard.DOM.Get_Nodes("//div[@class='infosmall']").snapshotItem(0);
	var form = infoBann.parentNode;
	form.removeChild(infoBann);
	
	var messageHeader = document.createElement("h2");
	messageHeader.innerHTML = Locale.Text.ArchivedMessages;
	form.appendChild(messageHeader);
	
	var tableHeader = document.createElement("div");
	tableHeader.setAttribute("style", "padding:5px 5px 0px 5px;");
	tableHeader.innerHTML = "<table class=\"EmpireBoardMessageTable\"><thead><tr>" +
			"<td style=\"width:15px;\">&nbsp</td>" +
			"<td style=\"width:15px;\">&nbsp</td>" +
			"<td style=\"width:100px\">" + Locale.Text.Sender +"</td>" + 
			"<td style=\"width:100px\">" + Locale.Text.Date + "</td>" +
			"<td>" + Locale.Text.Message + "</td></tr></thead></table>";
	form.appendChild(tableHeader);
	
	var wrapperDiv = document.createElement("div");
	wrapperDiv.setAttribute("style", "padding: 0px 5px 5px 5px;");
	form.appendChild(wrapperDiv);
	
	var messagesDiv = document.createElement("div");
	messagesDiv.setAttribute("class", "EmpireBoardMessageArchive");
	wrapperDiv.appendChild(messagesDiv);

	var messagesTable = document.createElement("table");
	messagesTable.setAttribute("class", "EmpireBoardMessageTable");
	messagesDiv.appendChild(messagesTable);
	
	var tableBody = document.createElement("tbody");
	messagesTable.appendChild(tableBody);
		
	var messages = EmpireBoard.DB.SortMessages(EmpireBoard.DB.MessageArchive);			
	
	for (var idx = (messages.length - 1); idx >= 0; idx--) {
		var messageId = messages[idx];
		var message = EmpireBoard.DB.MessageArchive[messageId];

		var messageRow = document.createElement("tr");	
		messageRow.setAttribute("title", messageId);
		messageRow.addEventListener("click", EmpireBoard.Handler.MessageClicked, false);
		tableBody.appendChild(messageRow);

		var deleteCell = document.createElement("td");
		deleteCell.setAttribute("style", "width:15px;");
		messageRow.appendChild(deleteCell);
		
		var deleteButton = document.createElement("img");
		deleteButton.setAttribute("title", messageId);
		deleteButton.setAttribute("src", "http://static.xs-software.com/khanwars/game3.0/img/3.0/msg_delete.gif");
		deleteButton.addEventListener("click", EmpireBoard.Handler.DeleteMessageClicked, false);
		deleteCell.appendChild(deleteButton);
		
		var directionCell = document.createElement("td");
		directionCell.setAttribute("style", "width:15px;");
		messageRow.appendChild(directionCell);
		if (message.Sended) {
			directionCell.innerHTML = "<img src=\"" + ImageData.MessageSendedIcon + "\">";
		}
		else {
			directionCell.innerHTML = "<img src=\"" + ImageData.MessageReceivedIcon + "\">";
		}
		
		var senderCell = document.createElement("td");
		senderCell.setAttribute("style", "width:100px;");
		senderCell.innerHTML = message.Sender;
		messageRow.appendChild(senderCell);
		
		var dateCell = document.createElement("td");
		dateCell.setAttribute("style", "width:100px;");
		dateCell.innerHTML = Str.FormatDate(new Date(message.Date));
		messageRow.appendChild(dateCell);		
		
		var textCell = document.createElement("td");
		textCell.innerHTML = message.Text.substr(0, 50);
		messageRow.appendChild(textCell);
	}

	var messageHeader = document.createElement("h2");
	messageHeader.innerHTML = Locale.Text.Message;
	form.appendChild(messageHeader);
	
	var messageWrapper = document.createElement("div");
	messageWrapper.setAttribute("class", "messageWrapper");
	messageWrapper.innerHTML = "" +
		"<div class=\"userDetails\">" +
		"  <div class=\"details\">" +
		"    <small id=\"EmpireBoardMessageSender\">&nbsp;</small>" +
		"  </div><br/>" +
		"  <div class=\"details\">" +
		"    <small id=\"EmpireBoardMessageDate\">&nbsp;</small>" +
		"  </div>" +
		"</div>" +
		"<div class=\"box message\">" +
		"  <div class=\"wrapper-1\">" +
		"    <div id=\"EmpireBoardMessagePreview\" class=\"wrapper-2\">&nbsp;" +
		"    </div>" +
		"  </div>" +
		"</div>";
	
	form.appendChild(messageWrapper);	
};

EmpireBoard.Renders.Render_MessageArchiveCount = function(){
	var messageCount = document.getElementById("EmpireBoardMessageArchiveCount");
	messageCount.innerHTML = EmpireBoard.DB.GetMessageCount();
}

EmpireBoard.Renders.Render_SaveToArchiveButtons = function(){
	if (EmpireBoard.Khanwars.IsSendMessageCategory()) {
		this.Render_SaveToArchiveButtonsForSendMessages();
	}
	else {
		this.Render_SaveToArchiveButtonsForReceivedMessages();		
	}
}

EmpireBoard.Renders.Render_SaveToArchiveButtonsForReceivedMessages = function(){
	var messages = EmpireBoard.DOM.Get_Nodes("//div[@class='messageWrapper']//p[@class='options']");
	if (messages.snapshotLength == 0) {
		return;
	}
	
	for (var i = 0; i < messages.snapshotLength; i++) {
		var message = messages.snapshotItem(i);
		var archiveButton = document.createElement("a");
		archiveButton.setAttribute("id", "archive");
		archiveButton.setAttribute("title", message.parentNode.parentNode.parentNode.id);
		archiveButton.setAttribute("href", "#");		
		archiveButton.innerHTML = Locale.Text.Archive;
		archiveButton.addEventListener("click", EmpireBoard.Handler.SaveToArchiveButtonClicked, false);
		message.appendChild(archiveButton);
	}
};

EmpireBoard.Renders.Render_SaveToArchiveButtonsForSendMessages = function(){
	var messages = EmpireBoard.DOM.Get_Nodes("//div[@class='box message']//p[@class='options']");
	if (messages.snapshotLength == 0) {
		return;
	}

	for (var i = 0; i < messages.snapshotLength; i++) {
		var message = messages.snapshotItem(i);
		var archiveButton = document.createElement("a");
		archiveButton.setAttribute("id", "archive");
		archiveButton.setAttribute("title", i);
		archiveButton.setAttribute("href", "#");		
		archiveButton.innerHTML = Locale.Text.Archive;
		archiveButton.addEventListener("click", EmpireBoard.Handler.SaveSendMessageToArchiveButtonClicked, false);
		message.appendChild(archiveButton);
	}
}

EmpireBoard.Renders.Render_MessageArchiveButton = function(){
	var buttons = EmpireBoard.DOM.Get_Nodes("//ul[@class='buttons messages']");
	if (buttons.snapshotLength == 0) {
		return;
	}
	
	var archiveButton = document.createElement("li");
	var messageCount = EmpireBoard.DB.GetMessageCount();
	archiveButton.innerHTML = "<a href=\"news.php?type=99\">" + Locale.Text.ArchiveButton + "<small id=\"EmpireBoardMessageArchiveCount\">" + messageCount + "</small></a>";
	
	buttons.snapshotItem(0).appendChild(archiveButton);
};

EmpireBoard.Renders.Render_Message = function(message) {
	var previewPlaceholder = document.getElementById("EmpireBoardMessagePreview");
	previewPlaceholder.innerHTML = message.Text;

	var senderPlaceholder = document.getElementById("EmpireBoardMessageSender");
	senderPlaceholder.innerHTML = message.Sender;
	
	var datePlaceholder = document.getElementById("EmpireBoardMessageDate");
	var messageDate = new Date(message.Date);
	datePlaceholder.innerHTML = Str.FormatDate(messageDate);
}

EmpireBoard.Renders.Render_MarketList = function() {
	var marketItems = EmpireBoard.DOM.Get_Nodes("//select[@id='fastNav']//option");	
	
	for (var i = 0; i < marketItems.snapshotLength; i++) {
		var marketItem = marketItems.snapshotItem(i);
		var castleId = "(" + marketItem.innerHTML + ")";
		var castle = EmpireBoard.DB.CurrentCastles[castleId];
		marketItem.innerHTML = castle.Name + " " + castleId;
	}
};

EmpireBoard.Renders.Render_CaptchaButton = function() {
	var mainMenu = EmpireBoard.DOM.Get_Nodes("//div[@class='topMenu left']//ul");	
	var ul = mainMenu.snapshotItem(0);
	var captchaButton = document.createElement("li");
	captchaButton.innerHTML = "<a href=\"/botcaptcha.php\">" + Locale.Text.TimeToCaptcha + " <span id=\"TimeToCaptcha\"> </span></a>";
	ul.appendChild(captchaButton);
	EmpireBoard.Handler.CaptchaTimerTick();
}

EmpireBoard.Renders.Render_Options = function(boardDiv) {
	Logger.Debug("EmpireBoard.Renders.Render_Options");
	
	var tableWrapper = this.Render_Section(boardDiv, "EmpireBoardOptionTable", Locale.Text.Option, false); 
	
	var optionTable = document.createElement("table");
	optionTable.setAttribute("cellspacing", "5");
	optionTable.appendChild(EmpireBoard.Renders.Render_CheckOption("Table_Resources", Locale.Text.Opt_Table_Resources));
	optionTable.appendChild(EmpireBoard.Renders.Render_CheckOption("Table_Buildings", Locale.Text.Opt_Table_Buildings));	
	optionTable.appendChild(EmpireBoard.Renders.Render_CheckOption("Table_Army", Locale.Text.Opt_Table_Army));
	optionTable.appendChild(EmpireBoard.Renders.Render_CheckOption("Ticker", Locale.Text.Opt_Ticker));
	optionTable.appendChild(EmpireBoard.Renders.Render_CheckOption("BuddyList", Locale.Text.BuddyList));
	optionTable.appendChild(EmpireBoard.Renders.Render_CheckOption("AutoUpdate", Locale.Text.Opt_AutoUpdate));
	if (EmpireBoard.DB.Options["HasNewVersion"]) {
		var tr = document.createElement("tr"); 
		var td = document.createElement("td");		
		tr.appendChild(td);	
		td.setAttribute("colSpan", "2");
		td.innerHTML = "<br/><p style=\"font-weight:bold; color: red;\">" + Locale.Text.New_Version + " " + EmpireBoard.DB.Options["AvailableVersion"] + " " + Locale.Text.Available + ". <a href=\"http://userscripts.org/scripts/source/" + EmpireBoard.UserScriptsID + ".user.js\" target=\"_blank\">" + Locale.Text.KlickToInstall;
		optionTable.appendChild(tr);
	}
	
	optionTable.appendChild(EmpireBoard.Renders.Render_LanguageOption());	
	optionTable.appendChild(EmpireBoard.Renders.Render_CheckOption("ExtendedMap", Locale.Text.Opt_ExtendedMap));
	optionTable.appendChild(EmpireBoard.Renders.Render_NumberOption("MapMinScavenge", Locale.Text.Opt_MapMinScavenge));
	optionTable.appendChild(EmpireBoard.Renders.Render_NumberOption("MapMinHealing", Locale.Text.Opt_MapMinHealing));
	optionTable.appendChild(EmpireBoard.Renders.Render_DeleteButton());
	tableWrapper.appendChild(optionTable);
	
	var copyDiv = document.createElement("div");		
	copyDiv.innerHTML = "<p class=\"Footer\">Powered by <a href=\"http://userscripts.org/scripts/show/" + EmpireBoard.UserScriptsID + "\" target=\"_blank\"><b>" + EmpireBoard.ScriptName + "</b></a> <span dir=\"ltr\">(<span>v. <i>" + EmpireBoard.Version + "</i></span>)</span>";		
	tableWrapper.parentNode.appendChild(copyDiv);
}

EmpireBoard.Renders.Render_NumberOption = function(option, caption) {
	var tr = document.createElement("tr");
	
	var tdOption = document.createElement("td");
	tdOption.setAttribute("style", "text-align: center;width: 100px");
	tr.appendChild(tdOption);
	
	var tdCaption = document.createElement("td");	
	tdCaption.setAttribute("style", "padding-left: 5px;");
	tdCaption.innerHTML = caption;
	tr.appendChild(tdCaption);
	
	var numberOption = document.createElement("input");
	numberOption.setAttribute("type", "text");
	numberOption.setAttribute("name", option);
	numberOption.setAttribute("size", 10);
	numberOption.setAttribute("maxlength", 10);
	numberOption.setAttribute("value", EmpireBoard.DB.Options[option]);	
	numberOption.addEventListener("change", EmpireBoard.Handler.NumberOptionChanged, false);	
	tdOption.appendChild(numberOption);	
	return tr;	
}

EmpireBoard.Renders.Render_DeleteButton = function() {
	var tr = document.createElement("tr");
	
	var tdOption = document.createElement("td");
	tdOption.setAttribute("style", "text-align: center;");
	tr.appendChild(tdOption);
	
	var tdCaption = document.createElement("td");	
	tdCaption.setAttribute("style", "padding-left: 5px;");
	tdCaption.innerHTML = Locale.Text.Opt_DeleteAll;
	tr.appendChild(tdCaption);
	
	var deleteButton = document.createElement("input");
	deleteButton.setAttribute("type", "button");
	deleteButton.setAttribute("id", "deleteButton");
	deleteButton.setAttribute("value",  Locale.Text.Reset);
	deleteButton.addEventListener('click', EmpireBoard.Handler.DeleteDataClicked, false);	
	tdOption.appendChild(deleteButton);
	return tr;
}

EmpireBoard.Renders.Render_LanguageOption = function() {
	var tr = document.createElement("tr");
	
	var tdOption = document.createElement("td");
	tdOption.setAttribute("style", "text-align: center;width: 100px");
	tr.appendChild(tdOption);
	
	var tdCaption = document.createElement("td");	
	tdCaption.setAttribute("style", "padding-left: 5px;");
	tdCaption.innerHTML = Locale.Text.Opt_Language;
	tr.appendChild(tdCaption);
	
	var languageOption = document.createElement("select");
	var options = "";
	for (var lang in Locale.Languages) {		
		options += "<option value=\"" + lang + "\"";
		if (lang == EmpireBoard.DB.Options["Locale"]) {
			options += " selected ";
		}
		options += ">" + Locale.Languages[lang] + "</option>";
	}	
	
	languageOption.setAttribute("name", "Locale");
	languageOption.innerHTML = options;
	languageOption.addEventListener('change', EmpireBoard.Handler.LanguageChanged, false);	
	tdOption.appendChild(languageOption);
	return tr;
}

EmpireBoard.Renders.Render_CheckOption = function(option, caption) {		
	var tr = document.createElement("tr");
	
	var tdOption = document.createElement("td");
	tdOption.setAttribute("style", "text-align: center;width: 100px");
	tr.appendChild(tdOption);
	
	var tdCaption = document.createElement("td");	
	tdCaption.setAttribute("style", "padding-left: 5px;");
	tdCaption.innerHTML = caption;
	tr.appendChild(tdCaption);
	
	var resourceOption = document.createElement("input");
	resourceOption.setAttribute("type", "checkbox");
	resourceOption.setAttribute("name", option);
	resourceOption.setAttribute("value", EmpireBoard.DB.Options[option] ? "1" : "0");	
	if (EmpireBoard.DB.Options[option] == true) {
		resourceOption.setAttribute("checked", "checked");
	}
	resourceOption.addEventListener('click', EmpireBoard.Handler.CheckOptionClicked, false);	
	tdOption.appendChild(resourceOption);
	return tr;
};
	
EmpireBoard.Renders.Render_Section = function(boardDiv, sectionId, caption, hasRefresh) {
	Logger.Debug('EmpireBoard.Renders.Render_Section: ' + sectionId);
	
	var tableDiv = document.createElement("div");
	tableDiv.setAttribute("class", sectionId);
	boardDiv.appendChild(tableDiv);
	
	var wrapper = document.createElement("div");
	wrapper.setAttribute("style", "padding: 10px;");
	tableDiv.appendChild(wrapper);
	
	var tableBox = document.createElement("div");
	tableBox.setAttribute("class", "box");	
	wrapper.appendChild(tableBox);
	
	var tableHeader = document.createElement("h2");
	tableBox.appendChild(tableHeader);
	
	var button = document.createElement("img");
	button.setAttribute("style", "vertical-align: middle; margin-right: 10px;");
	button.setAttribute("tableId", sectionId);
	button.addEventListener("click", EmpireBoard.Handler.SectionMinMaxButtonClicked, false);
	tableHeader.appendChild(button);
	
	if (hasRefresh) {
		var refreshButton = document.createElement("img");
		refreshButton.setAttribute("src", ImageData.RefreshSectionButton);
		refreshButton.setAttribute("style", "vertical-align: middle; margin-right: 10px;");
		refreshButton.setAttribute("refreshMode", sectionId);
		refreshButton.addEventListener("click", EmpireBoard.Handler.SectionRefreshButtonClicked, false);
		tableHeader.appendChild(refreshButton);
	}
	
	var tableCaption = document.createTextNode(Locale.Text.BoardName + " - " + caption);
	tableHeader.appendChild(tableCaption);
	
	var tableWrapper = document.createElement("div");
	tableWrapper.setAttribute("id", sectionId);
	if (EmpireBoard.DB.Options[sectionId+"Expanded"]) {
		button.setAttribute("src", ImageData.MinimizeSectionButton);
		tableWrapper.style.visibility = "visible";
		tableWrapper.style.height = "100%";
	}
	else {
		button.setAttribute("src", ImageData.MaximizeSectionButton);
		tableWrapper.style.visibility = "hidden";
		tableWrapper.style.height = "0px";
	}
	
	tableBox.appendChild(tableWrapper);
	
	return tableWrapper;
};

EmpireBoard.Renders.Render_Resource_List = function(boardDiv) {	
	var empireTable = "\
					<table border=\"0\" width=\"810px\" cellspacing=\"1\">\
						<thead>\
							<tr>	\
								<td>&nbsp;</td>\
								<td>" + Locale.Text.Castle + "</td>\
								<td>" + Locale.Text.Loyalty + "</td>\
								<td colspan=\"2\">" + Locale.Text.Population + "</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://static.xs-software.com/khanwars/game3.0/img/3.0/res_ico_gold.gif\">" + Locale.Text.Gold + "</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://static.xs-software.com/khanwars/game3.0/img/3.0/res_ico_iron.gif\">" + Locale.Text.Iron + "</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://static.xs-software.com/khanwars/game3.0/img/3.0/res_ico_wood.gif\">" + Locale.Text.Wood + "</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://static.xs-software.com/khanwars/game3.0/img/3.0/res_ico_food.gif\">" + Locale.Text.Food + "</td>\
								<td>" + Locale.Text.Storage + "</td>\
							</tr>\
						</thead>\
						<tbody>";	

	var sum = new Resources();
	
	var castles = EmpireBoard.DB.SortCastles(EmpireBoard.DB.CurrentCastles);	
	
	for (var idx = 0; idx < castles.length; idx++) {
		var castleId = castles[idx];
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];
		var myClass="";
		if (EmpireBoard.Khanwars.IsCurrentCastleKoordId(castleId)) {
			myClass = "current";
		}		
		empireTable += "<tr class='" + myClass + "'>";
		
		empireTable += "<td>";
		empireTable += "<a href='map.php?setx=" + currentCastle.X + "&sety=" + currentCastle.Y;
		empireTable += "'>";
		empireTable += "<img src='http://static.xs-software.com/khanwars/game3.0/img/3.0/map/gotocoords.gif' height='15px'>";		
		empireTable += "</a>";
		empireTable += "</td>";
		
		empireTable += "<td style='overflow:hidden;max-width:125px;'>";
		empireTable += "<a href='main.php?";
		if (currentCastle.IsCamp) {
			empireTable += "campId="; 
		}
		else {
			empireTable += "tpid="; 
		}
		empireTable += currentCastle.Id;		
		empireTable += "'>";
		empireTable += currentCastle.Name;		
		empireTable += "</a>";
	
		empireTable += "</td>";

		if (currentCastle.Resources == undefined) {
			currentCastle.Resources = {};
		}
			
		var fetchDate = currentCastle.FetchDate;
		if (fetchDate == undefined) {
			fetchDate = Str.Now();
		}
		
		var storage = currentCastle.Storage;	
		if (storage==undefined) {
			storage = 0;
		}
		
		if (storage ==0 && currentCastle.IsCamp) {
			storage = 400000;
		}
		
		var loyality = currentCastle.Loyality;
		if (loyality==undefined) {
			loyality = 0;
		}

		empireTable += "<td class='number'>";
		if (currentCastle.IsCamp) {
			empireTable += "-";
		}
		else if (loyality <= 3000) {
			empireTable += "<span class='important'>" + Str.ToDecimalGrouping(loyality) + "</span>";
		}
		else if (loyality < 10000) {
			empireTable += "<span class='warning'>" + Str.ToDecimalGrouping(loyality) + "</span>";
		}
		else {
			empireTable += Str.ToDecimalGrouping(loyality);
		}
		
		empireTable += "</td>";
		empireTable += "<td class='number'>";
		if (currentCastle.PopulationUsed == currentCastle.Population && currentCastle.Population < 50894) {
			empireTable += "<span class='important'>" + Str.ToDecimalGrouping(currentCastle.PopulationUsed) + "</span>";
		}
		else if (currentCastle.PopulationUsed / currentCastle.Population > 0.9 && currentCastle.Population < 50894) {
			empireTable += "<span class='warning'>" + Str.ToDecimalGrouping(currentCastle.PopulationUsed) + "</span>";
		} 
		else {
			empireTable += Str.ToDecimalGrouping(currentCastle.PopulationUsed);
		}
		
		empireTable += "</td>";
		empireTable += "<td class='number'>" + Str.ToDecimalGrouping(currentCastle.Population) +"</td>";
		
		var gold = currentCastle.Resources.Gold;
		var goldProd = currentCastle.Resources.GoldProd;
		if (isNaN(goldProd)) goldProd = 0;
		gold = EmpireBoard.Khanwars.CalcResource(gold, goldProd, storage, fetchDate);
		
		sum.Gold += gold;
		empireTable += this.Render_Resource(gold, goldProd, storage, Locale.Text.Gold);
		
		sum.GoldProd += goldProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.GoldProd) +"</td>";

		var iron = currentCastle.Resources.Iron;
		var ironProd = currentCastle.Resources.IronProd;
		if (isNaN(ironProd)) ironProd=0;
		iron = EmpireBoard.Khanwars.CalcResource(iron, ironProd, storage, fetchDate);
		sum.Iron += iron;
		empireTable += this.Render_Resource(iron, ironProd, storage, Locale.Text.Iron);
		
		sum.IronProd += ironProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.IronProd) +"</td>";
		
		var wood = currentCastle.Resources.Wood;
		var woodProd = currentCastle.Resources.WoodProd;
		if (isNaN(woodProd)) woodProd=0;
		wood = EmpireBoard.Khanwars.CalcResource(wood, woodProd, storage, fetchDate);
		sum.Wood += wood;
		empireTable += this.Render_Resource(wood, woodProd, storage, Locale.Text.Wood);
		
		sum.WoodProd += woodProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.WoodProd) +"</td>";

		var food = currentCastle.Resources.Food;
		var foodProd = currentCastle.Resources.FoodProd;		
		if (isNaN(foodProd)) foodProd=0;
		food = EmpireBoard.Khanwars.CalcResource(food, foodProd, storage, fetchDate);
		sum.Food += food;
		empireTable += this.Render_Resource(food, foodProd, storage, Locale.Text.Food);

		sum.FoodProd += foodProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.FoodProd) +"</td>";
		empireTable += "<td class='number'>" + Str.ToDecimalGrouping(storage) +"</td>";
		
		empireTable += "</tr>";		
	}
	
	empireTable += "<td colspan='2' class='Sum'>" + Locale.Text.Total + ":</td>";
	empireTable += "<td class='Sum'>&nbsp;</td>";
	empireTable += "<td colspan='2' class='Sum'>&nbsp;</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Gold) + "</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.GoldProd) + "</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Iron) + "</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.IronProd) + "</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Wood) + "</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.WoodProd) + "</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Food) + "</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.FoodProd) + "</td>";
	empireTable += "<td class='Sum'>&nbsp;</td>";		
	empireTable += "</tbody></table>";
	
	var tableWrapper = this.Render_Section(boardDiv, "EmpireBoardResources", Locale.Text.Resources, true); 
	tableWrapper.innerHTML = empireTable;
};

EmpireBoard.Renders.Render_Resource = function(resValue, resProd, storage, title) {
	Logger.Debug('EmpireBoard.Renders.Render_Resource');
	
	var cellHTML = "";				
	var resFull = Math.round(resValue / storage * 100);
	if (isNaN(resFull) || !isFinite(resFull)) {
		resFull = 0;
	}
		
	var storageWarning = "Normal"; 		
	if (resFull >= 99) {
		storageWarning = "Full";
	}
	else if (resFull >= 90) {
		storageWarning = "AlmostFull";
	}
	else if (resFull >= 80) {
		storageWarning = "Warning";
	}
	
	var overviewFix = "=";
	var timeToFull = (storage - resValue) / resProd;
	var tooltip = "title=\"header=[" + title + "] body" + overviewFix + "[" + Locale.Text.Filled + " " + resFull + "%<br />" + Locale.Text.FullIn + " " + Str.FormatTime(timeToFull) + "]\"";		
	cellHTML += "<td class='number'><p " + tooltip +" >" + Str.ToDecimalGrouping(resValue) + "</p>";
	cellHTML += "<table class='Percent'><tbody><tr><td class='" + storageWarning + "' width='" + resFull + "%'></td>";
	cellHTML += "<td width=\"" + (100-resFull) + "\"></td></tr></tbody></table>";
	return cellHTML;
}

EmpireBoard.Renders.Render_Building_List = function(boardDiv) {
	Logger.Debug('EmpireBoard.Renders.Render_Building_List');

	var empireTable = "\
					<table border=\"0\" width=\"810px\" cellspacing=\"1\">\
						<thead>\
							<tr>\
								<td>&nbsp;</td>\
								<td>" + Locale.Text.Castle + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_1.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Goldmine + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_2.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Ironmine + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_3.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Lumberjacks + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_4.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Farms + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_5.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Dwellings + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_6.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Barracks + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_7.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Stables + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_8.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Workshop + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_9.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Marketplace + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_10.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Blacksmith + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_11.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Infirmary + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_12.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Wall + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_13_race_2.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Order + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_14.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Shelter + "</td>\
								<td><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_15.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Storages + "</td>\
							</tr>\
						</thead>\
						<tbody>";	

	var castles = EmpireBoard.DB.SortCastles(EmpireBoard.DB.CurrentCastles);
	for (var idx = 0; idx < castles.length; idx++) {
		var castleId = castles[idx];
		var myClass="";
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];
		
		if (currentCastle.IsCamp) {
			// no need to render buildings of camp
			continue; 
		}
		
		if (EmpireBoard.Khanwars.IsCurrentCastleKoordId(castleId)) {
			myClass = "current";
		}	
		
		empireTable += "<tr class='" + myClass + "'>";
		empireTable += "<td>";
		empireTable += "<a href='map.php?setx="+currentCastle.X+"&sety="+currentCastle.Y;
		empireTable += "'>";
		empireTable += "<img src='http://static.xs-software.com/khanwars/game3.0/img/3.0/map/gotocoords.gif' height='14px'>";		
		empireTable += "</a>";
		empireTable += "</td>";
		
		empireTable += "<td>";
		
		empireTable += "<a href='main.php?tpid=";
		empireTable += currentCastle.Id;		
		empireTable += "&location=buildings.php'>";
		empireTable += currentCastle.Name;		
		empireTable += "</a>";

		
		empireTable += "</td>";
		for (var buildingId in currentCastle.Buildings) {
			empireTable += "<td class='number'>";
			
			// Verlinkung der Gebäude
			var location = Str.BuildingLinks[buildingId];
			var hasLink = false;
			if (location != "" && currentCastle.Buildings[buildingId]!="") { 
				location = "&location=" + location;
				empireTable += "<a href='main.php?tpid=";
				empireTable += currentCastle.Id;
				empireTable += location + "'>";
			}
						
			if (currentCastle.Buildings[buildingId]=="") {
				empireTable += "-";
			}
			else {
			    empireTable += this.Render_BuildingQueue(currentCastle, buildingId, currentCastle.Buildings[buildingId]);				
			}
			
			if (hasLink) {
				empireTable += "</a>";
			}
						
			empireTable += "</td>";
		}
		
		empireTable += "</tr>";
	}
	
	empireTable += "</tbody></table>";	
	
	var tableWrapper = this.Render_Section(boardDiv, "EmpireBoardBuildings", Locale.Text.Buildings, true); 
	tableWrapper.innerHTML = empireTable;	
};

EmpireBoard.Renders.Render_BuildingQueue = function(currentCastle, buildingId, finalLevel) {
	// Logger.Debug("Render_BuildingQueue " + buildingId + " " + finalLevel);
	
	if (currentCastle.BuildingQueue == undefined) {
		currentCastle.BuildingQueue = {};					
		currentCastle.BuildingQueue[0] = new BuildingQueueItem();
		currentCastle.BuildingQueue[1] = new BuildingQueueItem();
		currentCastle.BuildingQueue[2] = new BuildingQueueItem();
	}
	
	var overviewFix = "=";
	var buildingQueue = "";
	var now = Str.Now();
	var currentLevel = finalLevel;
	var buildingItemCount = 0;
	for (var i = 0; i < 3; i++) {
		if (currentCastle.BuildingQueue[i].BuildingId != -1) {
			buildingItemCount ++;
		}
	}
	
	var nextLevelHeaderText = EmpireBoard.Renders.Render_BuildingTooltip(currentCastle, buildingId, finalLevel, buildingItemCount);
	
	for (var i = 2; i > -1; i--) {		
		if (currentCastle.BuildingQueue[i].BuildingId == buildingId) {
			currentLevel --;
			var finishDate = new Date(currentCastle.BuildingQueue[i].Finished);
			var finishedIn = (finishDate.getTime() - now) / 1000 / 60 / 60;
			if (finishedIn < 0) {
				finishedIn = 0;
			}
			var tooltip = "title=\"header=[" + Locale.Text.Building + "] " +  
						  "body" + overviewFix + "[" + 
						  Locale.Text.Building + ":<br/>" + Str.FormatTime(finishedIn) + "<br/>" +
						  Locale.Text.Finished + ":<br />" + Str.FormatDate(finishDate) + "<br/><br/>" +
						  nextLevelHeaderText + "<br/>" +
						  "]\"";
			var isFinished = "";
			if (finishedIn == 0) {
				isFinished = "<span style=\"color: red;\">!</span>";
			}
			var item = "<span " + tooltip + ">" + currentLevel + isFinished + "»" + "</span>";
			buildingQueue = item + buildingQueue;
		}
	}
	
	if (buildingQueue.length > 0) {
		buildingQueue = "<span class=\"EmpireBoardBuildingQueue\">" + buildingQueue + currentCastle.Buildings[buildingId] + "</span>";
	}
	else {
		var tooltip = "title=\"header=[" + Locale.Text.Building + "] " +  
					  "body" + overviewFix + "[" + 
					  nextLevelHeaderText + "<br/>" +
					  "]\"";
						  
		buildingQueue = "<span " + tooltip + ">" + currentCastle.Buildings[buildingId] + "</span>";
	}
		
	return buildingQueue;
}

EmpireBoard.Renders.Render_BuildingTooltip = function(currentCastle, buildingId, finalLevel, buildingItemCount) {
	var buildingValuesId = parseInt(buildingId) + 1;
	var buildingValues = BuildingValues[buildingValuesId][finalLevel];
	var info = Locale.Text.NextLevel + ":<br/>";
	if (!buildingValues) {
		return info + Locale.Text.MaxLevelReached;
	}
	
	var availableRes = 0;
	var storage = currentCastle.Storage;
	var fetchDate = currentCastle.FetchDate;
	
	info += "<table>";
	
	availableRes = EmpireBoard.Khanwars.CalcResource(currentCastle.Resources.Gold, currentCastle.Resources.GoldProd, storage, fetchDate);	
	info += EmpireBoard.Renders.Render_ResourcesForNextBuildingLevel(Locale.Text.Gold, availableRes, buildingValues[0], buildingItemCount);
	
	availableRes = EmpireBoard.Khanwars.CalcResource(currentCastle.Resources.Iron, currentCastle.Resources.IronProd, storage, fetchDate);	
	info += EmpireBoard.Renders.Render_ResourcesForNextBuildingLevel(Locale.Text.Iron, availableRes, buildingValues[1], buildingItemCount);
	
	availableRes = EmpireBoard.Khanwars.CalcResource(currentCastle.Resources.Wood, currentCastle.Resources.WoodProd, storage, fetchDate);	
	info += EmpireBoard.Renders.Render_ResourcesForNextBuildingLevel(Locale.Text.Wood, availableRes, buildingValues[2], buildingItemCount);
	
	availableRes = EmpireBoard.Khanwars.CalcResource(currentCastle.Resources.Food, currentCastle.Resources.FoodProd, storage, fetchDate);	
	info += EmpireBoard.Renders.Render_ResourcesForNextBuildingLevel(Locale.Text.Food, availableRes, buildingValues[3], buildingItemCount);
	
	info += "</table>";
	return info;
}

EmpireBoard.Renders.Render_ResourcesForNextBuildingLevel = function(caption, currentResources, neededResources, buildingItemCount) {
	var style = "";
	var info = "<tr><td>" + caption + ":</td><td>";
	
	if (buildingItemCount >= 2) {
		neededResources = Math.floor(neededResources * 1.2);
	}
	
	if (currentResources >= neededResources) {
		info += "<span style='color:lightgreen;'>" + Str.ToDecimalGrouping(neededResources);
	}
	else {
		info += "<span style='color:orange;'>" + Str.ToDecimalGrouping(neededResources) +
				"&nbsp;(" + Str.ToDecimalGrouping(currentResources - neededResources) + ")";
	}
	
	info += "</span></td></tr>";	
	return info;
}

EmpireBoard.Renders.Render_Unit_List = function(boardDiv) {
	Logger.Debug('EmpireBoard.Renders.Render_Unit_List');
	
	var empireTable = "\
					<table border=\"0\" width=\"810px\" cellspacing=\"1\">\
						<thead>\
							<tr>	\
								<td>" + Locale.Text.Castle + "</td>\
								<td>" + Locale.Text.Population + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/1.jpg' width='25px'>" + Locale.Text.Pikeman + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/2.jpg' width='25px'>" + Locale.Text.Swordsman + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/3.jpg' width='25px'>" + Locale.Text.Axeman + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/4.jpg' width='25px'>" + Locale.Text.Maceman + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/9.jpg' width='25px'>" + Locale.Text.Quickwalker + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/10.jpg' width='25px'>" + Locale.Text.LCavalry + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/11.jpg' width='25px'>" + Locale.Text.HCavalry + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/12.jpg' width='25px'>" + Locale.Text.Ram + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/13.jpg' width='25px'>" + Locale.Text.Ballistician + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/14.jpg' width='25px'>" + Locale.Text.Catapult + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/15.jpg' width='25px'>" + Locale.Text.Trebuchet + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/16.jpg' width='25px'>" + Locale.Text.Shortbow + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/17.jpg' width='25px'>" + Locale.Text.Longbow + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/18.jpg' width='25px'><br/>" + Locale.Text.Crossbow + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/19.jpg' width='25px'>" + Locale.Text.ArcherCavalry + "</td>\
								<td style='vertical-align:top'><div style='width:25px;height:17px;background-color:#492B11; padding-top:6px; '>...</div>" + Locale.Text.SpecialUnit + "</td>\
								<td style='vertical-align:top'><img src='http://static.xs-software.com/khanwars/game3.0/img/units/thumbs/20.jpg' width='25px'>" + Locale.Text.Nobleman + "</td>\
							</tr>\
						</thead>\
						<tbody>";	

	var sum = {};
	var popSum = 0;
	var popInProdutionSum = 0;
	
	for (var i = 1; i < 18; i++) {
		sum[i]=0;
	}
		
	var castles = EmpireBoard.DB.SortCastles(EmpireBoard.DB.CurrentCastles);	
	for (var idx = 0; idx < castles.length; idx++) {
		var castleId = castles[idx];
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];
		var myClass="";
		if (EmpireBoard.Khanwars.IsCurrentCastleKoordId(castleId)) {
			myClass = "current";
		}		
		empireTable += "<tr class='" + myClass + "'>";
		empireTable += "<td style='overflow:hidden;max-width:125px;'>";
		var castlePohod = "main.php?";
		var barackLink = "main.php?";
		
		if (currentCastle.IsCamp) {
			castlePohod += "campId=";
			barackLink += "campId=";
		}
		else {
			castlePohod += "tpid=";
			barackLink += "tpid=";
		}
		
		castlePohod += currentCastle.Id;
		barackLink += currentCastle.Id;
		castlePohod += "&location=pohod.php";
		barackLink += "&location=";
		
		empireTable += "<a href=\"" + castlePohod + "\">";
		empireTable += currentCastle.Name;		
		empireTable += "</a>";
	
		empireTable += "</td>";

		if (currentCastle.Units == undefined) {
			currentCastle.Units = {};
		}		
		
		var population = getPopulation(currentCastle);
		popSum += population;

		var popInProduction = getPopInProduction(currentCastle);			
		popInProdutionSum += popInProduction;
		
		empireTable += "<td class=\"number\">" + Str.ToDecimalGrouping(population);
		if (popInProduction > 0) {
			empireTable += "<br/>+&nbsp;<span style=\"color: darkgreen;\">" + Str.ToDecimalGrouping(popInProduction) + "</span>";
		}
		
		empireTable += "</td>";
		
		for (var i = 1; i < 18; i++) {
			var unitCount = GetUnitCount(currentCastle, i);
			sum[i] += unitCount;
						
			var unitLink = barackLink + Str.UnitLinks[i];
			empireTable += "<td class=\"number\">";
			empireTable += "<a href=\"" + unitLink + "\">" + Str.ToDecimalGrouping(unitCount) + "</a>";
			empireTable += this.Render_ArmyQueue(currentCastle, i);
			empireTable += "</td>";
		}
						
		empireTable += "</tr>";		
	}
	
	empireTable += "<tr>";
	empireTable += "<td class='Sum'>" + Locale.Text.Total + ":</td>";
	empireTable += "<td class='Sum'>";
	empireTable += Str.ToDecimalGrouping(popSum); 
	if (popInProdutionSum > 0) {
		empireTable += "<br/><span style=\"color : darkgreen;\">+&nbsp;" + Str.ToDecimalGrouping(popInProdutionSum) + "</span>";
	}
	empireTable += "</td>";
	for (var i = 1; i < 18; i++) {
		empireTable += "<td class=\"Sum\">";
		empireTable += Str.ToDecimalGrouping(sum[i]);
		empireTable += this.Render_ArmyQueueSum(i);		
		empireTable += "</td>";
	}	
	empireTable += "</tr>";
		
	empireTable += "</tbody></table>";
	
	var tableWrapper = this.Render_Section(boardDiv, "EmpireBoardUnits", Locale.Text.Units, true); 
	tableWrapper.innerHTML = empireTable;	
};
	
EmpireBoard.Renders.Render_ArmyQueue = function(currentCastle, unitId) {
	if (!currentCastle.UnitQueue) {
		return "";
	}
	
	var sum = 0;	
	var buildingQueueHTML = "";
	var now = Str.Now();
	var tooltip = "title=\"header=[" + Locale.Text.Building + "] " +  
						  "body=[<table class='EmpireBoardArmyQueue'>";						  
	var hasFinishedQueueItem = false;
	var maxFinishedTime = 0;
	
	for (var i = 0; i < 28; i++) {
		var queueItem = currentCastle.UnitQueue[i];
		if (queueItem) {			
			if (queueItem.UnitId == unitId) {
				var finishDate = new Date(queueItem.Finished);
				var finishedIn = (finishDate.getTime() - now) / 1000 / 60 / 60;
				if (finishedIn < 0) {
					finishedIn = 0;
					hasFinishedQueueItem = true;
				}
				if (finishedIn > maxFinishedTime ) {
					maxFinishedTime = finishedIn;
				}
				
				var count = parseInt(queueItem.Count);				
				sum += count;
								
				tooltip += "<tr>" + 
						   "<td>+</td>" +
						   "<td>" + Str.ToDecimalGrouping(count) + "</td>";
				
				if (finishedIn == 0) {
					tooltip += "<td class='finished'>";
				}
				else {
					tooltip += "<td>";
				}
				
				tooltip += "(" + Str.FormatTime(finishedIn) + ")</td>";						   
				tooltip += "</tr>";
			}
		}
	}
		
	if (sum > 0) {
		tooltip += "<tr class='sum'>" +
				   "<td>Σ</td>" +
				   "<td>" + Str.ToDecimalGrouping(sum) + "</td>";
				   
		if (maxFinishedTime == 0) {
			tooltip += "<td class='finished'>";
		}
		else {
			tooltip += "<td>";
		}
		
		tooltip += "(" + Str.FormatTime(maxFinishedTime) + ")</td>";
		tooltip += "</tr>";
		tooltip += "</table>]\"";
		buildingQueueHTML = "<br/><span style=\"color : darkgreen;\" " + tooltip + ">+&nbsp;" + Str.ToDecimalGrouping(sum) + "</span>";
		if (hasFinishedQueueItem) {
			buildingQueueHTML += "<span style=\"color: red; font-weight:bold;\">!</span>";
		}
	}
	
	return buildingQueueHTML;
}

EmpireBoard.Renders.Render_ArmyQueueSum = function(unitId) {	
	var sum = 0;	
	var buildingQueueHTML = "";
	var now = Str.Now();
	var tooltip = "title=\"header=[" + Locale.Text.Building + "] " +  
						  "body=[<table class='EmpireBoardArmyQueue'>";						  
	var maxFinishedTime = 0;
	
	var queueItems = EmpireBoard.DB.GetTotalUnitQueue(unitId);
	
	for (var idx = 0; idx < queueItems.length; idx++) {
		var queueItem = queueItems[idx];
		var finishDate = new Date(queueItem.Finished);
		var finishedIn = (finishDate.getTime() - now) / 1000 / 60 / 60;
		if (finishedIn < 0) {
			finishedIn = 0;					
		}
		if (finishedIn > maxFinishedTime ) {
			maxFinishedTime = finishedIn;
		}
		
		var count = parseInt(queueItem.Count);				
		sum += count;
						
		tooltip += "<tr>" + 
				   "<td>+</td>" +
				   "<td>" + Str.ToDecimalGrouping(count) + "</td>";
		
		if (finishedIn == 0) {
			tooltip += "<td class='finished'>";
		}
		else {
			tooltip += "<td>";
		}
		
		tooltip += "(" + Str.FormatTime(finishedIn) + ")</td>";						   
		tooltip += "</tr>";
	}
	
	if (sum > 0) {
		tooltip += "<tr class='sum'>" +
				   "<td>Σ</td>" +
				   "<td>" + Str.ToDecimalGrouping(sum) + "</td>";
				   
		if (maxFinishedTime == 0) {
			tooltip += "<td class='finished'>";
		}
		else {
			tooltip += "<td>";
		}
		
		tooltip += "(" + Str.FormatTime(maxFinishedTime) + ")</td>";
		tooltip += "</tr>";
		tooltip += "</table>]\"";
		buildingQueueHTML = "<br/><span style=\"color : darkgreen;\" " + tooltip + ">+&nbsp;" + Str.ToDecimalGrouping(sum) + "</span>";
	}
	
	return buildingQueueHTML;
}
	
function getPopulation(currentCastle) {
	var popSum = 0;
	for (var i = 1; i<18; i++) {
		var pop = Str.UnitsPop[i];
		var count = GetUnitCount(currentCastle, i);
		popSum += pop * count;
	}
	return popSum;
}

function getPopInProduction(currentCastle) {
	if (!currentCastle.UnitQueue) {
		return 0;
	}
	
	var popSum = 0;
	for (var i = 0; i < 28; i++) {
		var queueItem = currentCastle.UnitQueue[i];
		if (queueItem) {
			var pop = 0;
			var count = 0;
			if (queueItem.UnitId != -1) {
				var pop = Str.UnitsPop[queueItem.UnitId];
				var count = parseInt(queueItem.Count);		
			}
			
			popSum += pop * count;
		}
	}
	return popSum;
}

function GetUnitCount(currentCastle, unitId) {
	var unit = 0;
	unit = parseInt(currentCastle.Units[unitId]);
	if (unit==undefined || isNaN(unit)) {
		return 0;
	}
	return unit;
}

function GetInProductionCount(currentCastle, unitId) {
	if (!currentCastle.UnitQueue) {
		return 0;
	}

	var sum = 0;
	for (var i = 0; i < 28; i++) {
		var queueItem = currentCastle.UnitQueue[i];
		if (queueItem) {
			if (queueItem.UnitId == unitId) {
				sum += parseInt(queueItem.Count);
			}	
		}
	}
	
	return sum;
}

EmpireBoard.Renders.MakeCastleList = function (responseText) {			
	var formattedCastleList = "";
	var idx1 = responseText.indexOf("<dd");
	var count = 0;
	
	while (idx1 != -1) {
		var idx2 = responseText.indexOf("</dd>", idx1);
		var castleHTML = responseText.substring(idx1, idx2 + 5);
		EmpireBoard.Khanwars.ExtractCastle(castleHTML);
		formattedCastleList +=  EmpireBoard.Renders.FormatCastleInCastleList(castleHTML);
		idx1 = responseText.indexOf("<dd", idx2);
		count++;
	}
	
	if (count == 0) {
		Logger.Error(responseText);
	}
	
	Logger.Info(count + " castles found.");	
	EmpireBoard.DB.GarbageCollect();
	EmpireBoard.DB.Save();
	
	var rightNav = EmpireBoard.Khanwars.GetRightBanner();	
    
	if (!EmpireBoard.DOM.Has_Node("//script[contains(@src, 'dragdrop.js')]")) {
		var ddscript = document.createElement("script");
		ddscript.setAttribute("type", "text/javascript");
		ddscript.setAttribute("src", "http://static.xs-software.com/khanwars/game3.0/js/dragdrop.js");
		rightNav.appendChild(ddscript);
	}
	
	var castleNav = document.createElement("div");
	castleNav.setAttribute('class', 'EmpireBoardCastleList');
	castleNav.setAttribute('id', 'EmpireBoardCastleList');
	castleNav.addEventListener("mouseup", EmpireBoard.Handler.CastleListMoved, false);
	
	var myLeftMenu = document.createElement("div");
	myLeftMenu.setAttribute('class', 'leftMenu');

	var myWrapper = document.createElement("div");
	myWrapper.setAttribute('class', 'wrapper');

	var myCastles = document.createElement("dl");
	myCastles.setAttribute('id', 'castlesList');
	myCastles.innerHTML = formattedCastleList;
	
	var myH2 = document.createElement("h2");
	var myText = document.createTextNode(Locale.Text.Castles);
	myH2.appendChild(myText);
	
	myWrapper.appendChild(myH2);
	myWrapper.appendChild(myCastles);
	myLeftMenu.appendChild(myWrapper);
	castleNav.appendChild(myLeftMenu);
	if (rightNav.hasChildNodes()) {
		// an erster Stelle in der rechten Nav einfügen, vor etwaigen Werbebannern.
		var firstChild = rightNav.childNodes[0];
		rightNav.insertBefore(castleNav, firstChild);

	}
	else {
		// bei VIPs gibt es keine Werbebanner, also direkt einfügen.
		rightNav.appendChild(castleNav);	
	}
	EmpireBoard.ContentEval( function() { new Draggable($('EmpireBoardCastleList'), {handle: $('EmpireBoardCastleList'), revert: false}); } );
	if (EmpireBoard.DB.Options["CastleListX"] != undefined) {
		castleNav.style.position = "absolute";	
		castleNav.style.zIndex = "1000";	
		castleNav.style.left = -200;
		castleNav.style.top = EmpireBoard.DB.Options["CastleListY"];
		castleNav.style.left = EmpireBoard.DB.Options["CastleListX"];
	}
}
	
EmpireBoard.Renders.FormatCastleInCastleList = function (castleHTML) {	
	var currentCastle = EmpireBoard.Khanwars.IsCurrentCastle(castleHTML);	
	
	if (castleHTML.indexOf("location=http") ==-1) {
		var location = "location=" + escape(window.location.href);
		castleHTML = castleHTML.replace(/location=/, location);
	}
	
	if (castleHTML.indexOf('capital') > 0) {
		// Hauptburg
		castleHTML = castleHTML.replace(/<a/g, "<a class='capital' ");	
	}
	
	if (castleHTML.indexOf('campId=') > 0) {	
		// camp
		castleHTML = castleHTML.replace(/<a/g, "<a class='camp' ");	
	}
	
	if (currentCastle) {
		castleHTML = castleHTML.replace(/<dd/g, "<dd class='current' ");	
	}
		
	return castleHTML;
}

EmpireBoard.Renders.Render_WorldMap = function () {
	Logger.Debug('EmpireBoard.Renders.Render_WorldMap');
		
	// Minimap in den rechten Navi-Bereich verschieben.
	var miniMap = document.getElementById("smallMapWrapper");
	miniMap.parentNode.removeChild(miniMap);
	miniMap.addEventListener("mouseup", EmpireBoard.Handler.MiniMapMoved, false);
	EmpireBoard.Khanwars.GetRightBanner().appendChild(miniMap);	
	if (EmpireBoard.DB.Options["MiniMapX"] != undefined) {	
		miniMap.style.top = EmpireBoard.DB.Options["MiniMapY"];
		miniMap.style.left = EmpireBoard.DB.Options["MiniMapX"];		
	}
	else
	{
		miniMap.setAttribute("style", "left:0px; top: -240px");
	}
	
	// Button in MapMenu einfügen
	var mapmenu = EmpireBoard.DOM.Get_First_Node("//ul[@class='topMenu']");
	var Ned_showBigMapButton = document.createElement('li');
	Ned_showBigMapButton.innerHTML = "<a href=\"#\">" + Locale.Text.World + "</a>";
	Ned_showBigMapButton.addEventListener('click', EmpireBoard.Handler.OnWorldMapShow, true);
    mapmenu.appendChild(Ned_showBigMapButton);
			
	// Wrapper für die Welt-Karte
	var globalMapWrapper = document.createElement("div");
	globalMapWrapper.id  = "worldMapWrapper";
	globalMapWrapper.setAttribute("style", "visibility:hidden;");
	
	// Overlay für transparent-Effekt
	var overlay = document.createElement("div");
	var height = document.body.clientHeight;
	overlay.setAttribute("style", "background-color: rgb(0, 0, 0); opacity: 0.8; width: 1920px; height: " + height + "px;z-index:1998;left:0;top:0px;position:absolute;");
	globalMapWrapper.appendChild (overlay);
	
	// Menu auf der Welt-Karte
	var worldMapMenu = document.createElement("ul");
	worldMapMenu.innerHTML = "<li><a id='WorldMapCurrX' style='width:23px;' class='Default'>&nbsp;</a></li>" +
						     "<li><a id='WorldMapCurrY' style='width:23px;' class='Default'>&nbsp;</a></li>" + 
						     "<li><a id='WorldMapCurrCastle' class='Normal' style='width:110px;overflow:hidden;white-space:nowrap;'>&nbsp;</a></li>" + 
						     "<li><a id='WorldMapCurrPlayer' style='width:110px;overflow:hidden;white-space:nowrap;'>&nbsp;</a></li>" + 
						     "<li><a id='WorldMapCurrClan' style='width:110px;overflow:hidden;white-space:nowrap;'>&nbsp;</a></li>"; 

	var zoomOutButton = document.createElement("li");
	zoomOutButton.innerHTML = "<a class='Default' style='width:15px;'>-</a>";
	zoomOutButton.addEventListener("click", EmpireBoard.Handler.OnWorldMapZoomOut, true);
	worldMapMenu.appendChild(zoomOutButton);
	
	var zoomInButton = document.createElement("li");
	zoomInButton.innerHTML = "<a class='Default' style='width:15px;'>+</a>";
	zoomInButton.addEventListener("click", EmpireBoard.Handler.OnWorldMapZoomIn, true);
	worldMapMenu.appendChild(zoomInButton);
	
	worldMapMenu.setAttribute("class", "topMenu");
	worldMapMenu.setAttribute("style", "z-index:2001;left:155px;top:0px;position:fixed;");	
	globalMapWrapper.appendChild(worldMapMenu);

	var closeButton = document.createElement("li");
	closeButton.innerHTML = "<a href='#'>" + Locale.Text.Close + "</a>";
	closeButton.setAttribute("style", "float:right;");
	closeButton.addEventListener("click", EmpireBoard.Handler.OnWorldMapHide, true);
	worldMapMenu.appendChild(closeButton);
	
	// Border für die Karte
	var mapBorder = document.createElement("img");
	mapBorder.setAttribute("id", "WorldMapBorder");
	mapBorder.setAttribute("src", "http://static.xs-software.com/khanwars/game3.0/img/3.0/map/map_border.png");
	mapBorder.setAttribute("style", "z-index:1999;left:0px;top:5px;position:absolute;width:1205px;height:1299px;");	
	globalMapWrapper.appendChild(mapBorder);
	
	// Karte mittels Canvas zeichnen
	var mapArea = document.createElement("canvas");
	mapArea.id = "worldMapCanvas";
	mapArea.setAttribute('style', "z-index:2000; left:100px; top:125px; position:absolute;");	
	mapArea.height = '1005';
	mapArea.width = '1005';
	mapArea.addEventListener("click", EmpireBoard.Handler.OnWorldMapClicked, true); 
	mapArea.addEventListener("mousemove", EmpireBoard.Handler.OnWorldMapMouseMoved, true); 
	globalMapWrapper.appendChild(mapArea);		
	
    var body = document.getElementsByTagName("body")[0];
	body.appendChild(globalMapWrapper);	
	
	// go to castle
	var currentId = EmpireBoard.Khanwars.CurrentCastleKoordId();	
	var currentCastle = EmpireBoard.DB.CurrentCastles[currentId];
	if (currentCastle.IsCamp) {
		EmpireBoard.ContentEval("search_map(" + currentCastle.X +"," + currentCastle.Y + ")");		
	}
}

EmpireBoard.Renders.Render_Calculator = function() {
	var buttonRow = EmpireBoard.DOM.Get_Nodes("//div[@class='buttonrow']").snapshotItem(1);
	
	var buttonDiv = document.createElement("div");
	buttonDiv.setAttribute("class", "buttonrow");
	buttonRow.parentNode.appendChild(buttonDiv);
	
	var savedArmies = document.createElement("select");
	savedArmies.id = "EmpireBoardSavedArmyList";
	savedArmies.setAttribute("style", "margin: 5px; background: none repeat scroll 0 0 #644527;border: 1px solid #815F3F;color: #FFFFFF;font-size: 12px;");
	savedArmies.addEventListener("change", EmpireBoard.Handler.SavedArmyChanged , false)
	EmpireBoard.Renders.Render_SavedArmyList(savedArmies);
	buttonDiv.appendChild(savedArmies);
	
	var armyName = document.createElement("input");
	armyName.id = "EmpireBoardSaveArmyName";
	armyName.setAttribute("style", "margin: 5px; cursor: default; text-transform: none;-moz-border-radius:0px; background: none repeat scroll 0 0 #4F2E0F; padding: 3px 5px");
	armyName.type = "text";
	armyName.size = 15;
	buttonDiv.appendChild(armyName);
	
	var saveButton = document.createElement("input");
	saveButton.type = "button";
	saveButton.value = Locale.Text.Save;	
	saveButton.addEventListener("click", EmpireBoard.Handler.SaveCalculatorClicked, false);
	buttonDiv.appendChild(saveButton);
}

EmpireBoard.Renders.Render_SavedArmyList = function(savedArmySelect) {	
	savedArmySelect.innerHTML ="";
	
	var armyOption = document.createElement("option");
	armyOption.value = "";
	armyOption.innerHTML = "";
	savedArmySelect.appendChild(armyOption);
	
	for (var armyName in EmpireBoard.DB.SavedArmies) {
		armyOption = document.createElement("option");
		armyOption.value = armyName;
		armyOption.innerHTML = armyName;
		savedArmySelect.appendChild(armyOption);
	}
}

// Fix for camp to zoom to the right coordinates
EmpireBoard.Renders.Render_CampZoomFix = function() {
	var currentCastle = EmpireBoard.Khanwars.GetCurrentCastle();
	if (!currentCastle.IsCamp) {
		return;
	}
	
	var para = window.location.search;
	if (para.indexOf("x=") == -1 && para.indexOf("y=") == -1) {
		var x = currentCastle.X;
		var y = currentCastle.Y
	}
	else {
		var x = para.match(/x=\d+/)[0].match(/\d+/);
		var y = para.match(/y=\d+/)[0].match(/\d+/);		
	}
	
	Logger.Debug("Camp-Fix: " + x + ":" + y);
	var scripts = EmpireBoard.DOM.Get_Nodes("//div[@id='content']/script");
	var functionText = "stopMoving();setTimeout(function(){search_map(" + x + "," + y + ");}, 5000);";
	scripts.snapshotItem(1).innerHTML = functionText;
	EmpireBoard.ContentEval(functionText);
}

EmpireBoard.Renders.GetOrCreateTabNavigation = function() {
	var tabs = EmpireBoard.DOM.Get_First_Node("//ul[@class='tabsNavigation']");
	
	if (!tabs) {
		var tabsHolder = document.createElement("div");
		tabsHolder.setAttribute("class", "tabsHolder");
		
		var tabs = document.createElement("ul");
		tabs.setAttribute("class", "tabsNavigation");
		tabs.innerHTML = "<li><a class=\"activeTab\" onclick=\"setActiveTab($$('.tabsNavigation a'), 'tab_info_', $('tab_info_1'), this)\" href=\"javascript:;\">" + Locale.Text.PlayerProfil + "</a></li>";
		tabsHolder.appendChild(tabs);
		
		var content = EmpireBoard.DOM.Get_First_Node("//div[@id='content']");
		content.insertBefore(tabsHolder, content.childNodes[0]);
	}

	return tabs;
}

EmpireBoard.Renders.Render_PlayerInfo = function() {
	var tabs = EmpireBoard.Renders.GetOrCreateTabNavigation();	
	var infoTab = EmpireBoard.DOM.Get_First_Node("//div[@id='tab_info_1']");
	var currentCastle = infoTab.innerHTML.match(/\[\d+:\d+\]/)[0];
	var currentCastleX = currentCastle.match(/\d+/g)[0];
	var currentCastleY = currentCastle.match(/\d+/g)[1];

	EmpireBoard.Renders.Render_CastleTabPage(tabs, currentCastleX, currentCastleY);
	EmpireBoard.Renders.Render_LastSpyReport(tabs, currentCastleX, currentCastleY);
}

EmpireBoard.Renders.Render_LastSpyReport = function(tabs, currentCastleX, currentCastleY) {
	var key = currentCastleX + ":" + currentCastleY;
	var spyReport = EmpireBoard.DB.SpyReports[key];
	if (!spyReport) {
		return;		
	}
	
	var castle = EmpireBoard.DB.MapData[key];
	if (!castle) {
		castle = new MapItem();
	}
		
	var castleTabButton = document.createElement("li");
	castleTabButton.innerHTML = "<a onclick=\"setActiveTab($$('.tabsNavigation a'), 'tab_info_', $('tab_info_4'), this)\" href=\"javascript:;\">" + Locale.Text.SpyReport + "</a>";
	tabs.appendChild(castleTabButton);

	var content = EmpireBoard.DOM.Get_First_Node("//div[@id='content']");
	var spyReportTab = document.createElement("div");
	spyReportTab.setAttribute("id", "tab_info_4");
	spyReportTab.setAttribute("style", "display: none;");
		
	var spyTabContent = "<h2>" + Locale.Text.Castle + "</h2>" + 
						"<div class='box'><div class='wrapper-1'><div class='wrapper-2'>" + 
						"<div class='textformbox'>" +
						"<div class='row'>" +
		                "<div class='left'>" + Locale.Text.Castle + ":</div>" +
						"<div class='right'>" + castle.Castle;
						
	if (castle.IsCapital) {
		spyTabContent += " <img alt='Capital' src='http://static.xs-software.com/khanwars/game3.0/img/3.0/icon_crown.gif'>";
	}
	
	spyTabContent += "</div>" +
					"</div>" + 
					"<div class='row'>" + 
		            "<div class='left'>" + Locale.Text.Coordinates + ":</div>" + 
					"<div class='right'><a href='map.php?setx=" + currentCastleX + "&sety=" + currentCastleY + "'>[" + currentCastleX + ":" + currentCastleY + "]</a>&nbsp;&nbsp;" + 
					"<a href='pohod.php?attackx=" + currentCastleX + "&attacky=" + currentCastleY + "'><img width='12px' src='" + ImageData.ButtonAttack + "' border='0'></a>" +						
					"</div>" +
					"</div>" + 
					"</div></div></div></div>";
								
	spyTabContent += "<h2>" + Locale.Text.SpyReport;
	var oneDay = 24 * 60 * 60 * 1000;
	if ((Str.Now() - spyReport.Date) > oneDay) {
		spyTabContent += " <span style='color:red;'>" + Str.FormatDate(new Date(spyReport.Date)) + "</span>";
	}
	else {
		spyTabContent += " " + Str.FormatDate(new Date(spyReport.Date)); 
	}
	
	spyTabContent += "</h2>" + 
					"<div class='box'>" + 
					"<div class='wrapper-1'><div class='wrapper-2'>";						
	spyTabContent += "<p>" + spyReport.Content + "</p>";	
	spyTabContent += "<p class='options'></p>";
	spyTabContent += "</div></div></div>";
	spyReportTab.innerHTML = spyTabContent;
	
	var options = spyReportTab.getElementsByClassName("options")[0];
	var deleteButton = document.createElement("a");
	deleteButton.setAttribute("href", window.location);
	deleteButton.setAttribute("id", "delete");
	deleteButton.setAttribute("title", key);
	deleteButton.addEventListener("click", EmpireBoard.Handler.DeleteSavedSpyReportClicked, false);
	deleteButton.innerHTML = Locale.Text.Delete;
	options.appendChild(deleteButton);
	content.appendChild(spyReportTab);
}
 
EmpireBoard.Renders.Render_CastleTabPage = function(tabs, currentCastleX, currentCastleY) {	
	var castleTabButton = document.createElement("li");
	castleTabButton.innerHTML = "<a onclick=\"setActiveTab($$('.tabsNavigation a'), 'tab_info_', $('tab_info_3'), this)\" href=\"javascript:;\">" + Locale.Text.Castles + "</a>";
	tabs.appendChild(castleTabButton);
	
	var content = EmpireBoard.DOM.Get_First_Node("//div[@id='content']");
	var castleTab = document.createElement("div");
	castleTab.setAttribute("id", "tab_info_3");
	castleTab.setAttribute("style", "display: none;");
	var castleList = "<h2>" + Locale.Text.Castles + "</h2>"  + 
						"<div class=\"box\">" + 
						"<div class=\"wrapper-1\"><div class=\"wrapper-2\">" + 
						"<table class='EmpireBoardProfilCastleList'><thead>" + 
						"<tr><td colspan=\"2\">&nbsp;</td><td>" + Locale.Text.Castle + "</td><td>" + Locale.Text.Coordinates + "</td><td>" + Locale.Text.SpyReport + "</td></tr></thead>" + 
						"<tbody>";
	
	var playerName = EmpireBoard.Khanwars.GetPlayerNameFromPreview(document);	
	var mapItemIds = EmpireBoard.DB.GetCastlesForPayer(playerName);	

	for (var i = 0; i < mapItemIds.length; i++) {
		var mapItemId = mapItemIds[i];
		var mapItem = EmpireBoard.DB.MapData[mapItemId];
		var x = mapItemId.match(/\d+/g)[0];
		var y = mapItemId.match(/\d+/g)[1];
		var style = "";
		if (x == currentCastleX && y == currentCastleY) {
			style = "current";
		}
		
		castleList += "<tr class='" + style + "'>" + 
					"<td><a href='map.php?setx=" + x + "&sety=" + y + "'><img src=\"http://static.xs-software.com/khanwars/game3.0/img/3.0/map/gotocoords.gif\" border='0'></a></td>" +
					"<td><a href=\"pohod.php?attackx=" + x + "&attacky=" + y + "\"><img src=\"" + ImageData.ButtonAttack + "\" border='0'></a></td>" + 
					"<td><a href=\"preview.php?castle_id=" + mapItem.CastleId + "\">" + mapItem.Castle + "</a>";
		if (mapItem.IsCapital) {
			castleList += " <img alt='Capital' src='http://static.xs-software.com/khanwars/game3.0/img/3.0/icon_crown.gif'>";
		}

		castleList += "</td><td>" + x + ":" + y + "</td>";
		castleList += "<td>";
		var spyReport = EmpireBoard.DB.SpyReports[mapItemId];
		if (spyReport) {
			castleList += Str.FormatDate(new Date(spyReport.Date));
		}
		
		castleList += "</td>";
		castleList += "</tr>";
	}
	
	castleList += "</tbody></table></div></div>";

	castleTab.innerHTML = castleList;
	content.appendChild(castleTab);
}

EmpireBoard.Renders.Render_OverviewMenu = function() {
	var overview = document.getElementById("overview");
	var menu = overview.getElementsByClassName("topMenu")[0];
	overview.removeChild(menu);
	overview.insertBefore(menu, overview.childNodes[0]);
}

EmpireBoard.Renders.Render_WorkerButton = function() {
	var menu = EmpireBoard.DOM.Get_First_Node("//ul[@class='topMenu']");
	var button = document.createElement("li");
	button.innerHTML = "<a href='#' onclick='return false;'>" + Locale.Text.Worker + "</a>";
	button.addEventListener("click", EmpireBoard.Handler.WorkerButtonClicked, false);
	menu.appendChild(button);
}

EmpireBoard.Renders.Render_SliderSkript = function() {
	var skript = document.createElement("script");
	skript.setAttribute("type", "text/javascript");
	skript.innerHTML = 	"function empireBoardMineSlider(workers,allowedWorkers,allowedMaximum,minWorkers,maxWorkers,canUpdate,income,skillIncome,raceIncome,tavernPenalty,baseIncome,mineWorkerIncome,blackCastle, id){\n" +
					    "	this.id = id;\n" +
						"	this.workers = workers;\n" + 
						"	this.allowedWorkers = allowedWorkers;\n" + 
						"	this.minWorkers = minWorkers;\n" +
						"	this.maxWorkers = maxWorkers;\n" +
						"	this.canUpdate = canUpdate;\n" +
						"	this.income = income;\n" +
						"	this.skillIncome = skillIncome;\n" +
						"	this.raceIncome = raceIncome;\n" +
						"	this.tavernPenalty = tavernPenalty;\n" +
						"	this.baseIncome = baseIncome;\n" +
						"	this.mineWorkerIncome = mineWorkerIncome;\n" +
						"	this.allowedMaximum = allowedMaximum;\n" +
						"	this.blackCastle = blackCastle;\n" +
						"	var obj = this;\n" +
						"	var disabled = false;\n" +
						"	if(this.allowedMaximum == 0)\n" +
						"		disabled = true;\n" +
						"	var sliderId = 'zoom_slider'+this.id;\n" +
						"	this.sliderObject = new Control.Slider($(sliderId).down('.handle'),$(sliderId),{\n" +
						"		//Options\n" +
						"		range: $R(this.minWorkers, this.allowedMaximum),\n" +
						"		values: $R(this.minWorkers, this.allowedMaximum),\n" +
						"		sliderValue: this.workers,\n" +
						"		minimum: this.minWorkers,\n" +
						"		disabled: disabled,\n" +
						"		onSlide: function(value){\n" +
						"			obj.handleSlides(value);\n" +
						"		},\n" +
						"		onChange: function(value){\n" +
						"			obj.sliderChanges(value);\n" +
						"		}\n" +
						"	});\n" +
						"}\n" +
						"function handleSlides(value){\n" +
						"	this.workers = value;\n" +
						"	this.income = this.calculateIncome();\n" +
						"	$('slider_all'+this.id).update(parseInt(value));\n" +
						"	$('slider_income'+this.id).update(parseInt(this.income));\n" +
						"	return true;\n" +
						"}\n" +
						"function sliderChanges(value){\n" +
						"	this.workers = value;\n" +
						"	this.income = this.calculateIncome();\n" +
						"	$('slider_all'+this.id).update(parseInt(value));\n" +
						"	$('slider_income'+this.id).update(parseInt(this.income));\n" +
						"	return true;\n" +
						"}\n" +
						"function calculateIncome(){\n" +
						"	var newIncome = Math.round(this.mineWorkerIncome * this.workers * this.skillIncome + this.baseIncome);\n" +
						"	newIncome = Math.round(newIncome * this.raceIncome);\n" +
						"	newIncome = Math.round(newIncome * this.blackCastle);\n" +
						"	newIncome = Math.round(newIncome * this.tavernPenalty);\n" +
						"	return newIncome;\n" +
						"}\n" +
						"empireBoardMineSlider.prototype.handleSlides = handleSlides;\n" +
						"empireBoardMineSlider.prototype.sliderChanges = sliderChanges;\n" +
						"empireBoardMineSlider.prototype.calculateIncome = calculateIncome;\n";
	return skript;
}

EmpireBoard.Renders.Render_Slider = function(id, caption) {
	var castle = EmpireBoard.Khanwars.GetCurrentCastle();
	var slider = "<tr>" + 
				 "<td colspan='2' class='EmpireBoardBuildingName'>" + caption + "</td>" + 
				 "<td rowspan='4' width='400px'>" + 
				   "<div class='workersSlider' >" + 
				   "<div class='bar' id='zoom_slider" + id + "'><div class='handle' id ='handle" + id + "'></div></div></div>" +
				 "</td></tr>" +
				 "<tr><td rowspan='3'><img src='http://static.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_" + (id + 1) + ".jpg'></td>" + 
				 "<td class='EmpireBoardBuildingLevel'><small>" + Locale.Text.CurrentLevel + ": <strong>" + castle.Buildings[id] + "</strong></small></td></tr>" + 
				 "<tr><td class='EmpireBoardWorkersStats'><small>" + Locale.Text.Worker + ":</small>&nbsp;<span id='slider_all" + id + "'>&nbsp;</span>&nbsp;/&nbsp;<span id='total_workers" + id + "'>&nbsp;</span></td></tr>" + 
				 "<tr><td class='EmpireBoardWorkersStats'><small>" + Locale.Text.Production + ":</small>&nbsp;<span id='slider_income" + id + "'>&nbsp;</span></div></td></tr>";
	return slider;
}

EmpireBoard.Renders.Render_VipSearch = function() {
	var level = EmpireBoard.Khanwars.GetPlayerLevel();
	var input = document.getElementById("ot_points");
	if (input) input.setAttribute("value", level);
	
	input = document.getElementById("do_points");
	if (input) input.setAttribute("value", level);

	input = document.getElementById("ot_x");
	if (input) input.setAttribute("value", 1);

	input = document.getElementById("do_x");
	if (input) input.setAttribute("value", 200);

	input = document.getElementById("ot_y");
	if (input) input.setAttribute("value", 1);

	input = document.getElementById("do_y");
	if (input) input.setAttribute("value", 200);
	
	var rows = EmpireBoard.DOM.Get_Nodes("//div[@class='box']//table//tr");
	for (var i = 0; i < rows.snapshotLength; i++) {
		var row = rows.snapshotItem(i);
		row.removeChild(row.childNodes[9]);
	}
}

// -----------------------------------------------------------------------
// EmpireBoard-Event-Handler
// -----------------------------------------------------------------------
EmpireBoard.Handler.OnWorldMapShow = function (event) {
	var i,j; 
	var gdImageWidth = 301;
	var gdImageHeight = 181;
	var zoom = EmpireBoard.MapZoom;
	var mapArea = document.getElementById("worldMapCanvas");
	mapArea.height = 201 * 5 * zoom;
	mapArea.width = 201 * 5 * zoom;
	var ctx = mapArea.getContext("2d");
  
	ctx.fillStyle = "#467828";
	ctx.fillRect (0, 0, 1005 * zoom, 1005 * zoom);
	var img = EmpireBoard.Khanwars.MapImages;
	
	for (j = 0; j < 6; j++) {
		for (i = 0; i < 4; i++) {
			if (img[i * 6 + j].complete) {
				ctx.drawImage(img[i * 6 + j], i * 300 * zoom, j * 180 * zoom, gdImageWidth * zoom, gdImageHeight * zoom); // size of gd_map-Image: 301x181 
			};
		}	
	}
		
    var selectedX = EmpireBoard.MapX;
	var selectedY = EmpireBoard.MapY;
	
	ctx.lineWidth   = 2;
	ctx.strokeStyle = "#FFFFFF";
	ctx.strokeRect(Math.floor(selectedX / 15) * 15 * 5 * zoom, Math.floor(selectedY / 9) * 9 * 5 * zoom, 15 * 5 * zoom + 1, 9 * 5 * zoom + 1);

	// fix border size
	var worldMapBorder = document.getElementById("WorldMapBorder");
	var horizontalScale = 1.34;
	var verticalScale = 67 / 30;
	var borderWidth = 900 * horizontalScale * zoom;
	var borderLeft = 100 - 75 * horizontalScale * zoom;
	var borderHeight = 580 * verticalScale * zoom;
	var borderTop = 125 - 62 * verticalScale * zoom;
	worldMapBorder.setAttribute("style", "z-index: 1999; left: " + borderLeft + "px; top: " + borderTop + "px; position: absolute; width: " + borderWidth + "px; height: " + borderHeight + "px;");
			
	// show map
	document.getElementById("worldMapWrapper").style.visibility = "visible";
}

EmpireBoard.Handler.OnWorldMapHide = function (event) {
	document.getElementById("worldMapWrapper").style.visibility = "hidden";	
}

EmpireBoard.Handler.OnWorldMapClicked = function (e) {
	var x, y;

	if (!e) {
		var e = window.event;
	}

	x = e.pageX;
	y = e.pageY;
	
	var elem = e.target;
	var offsetX = 0;
	var offsetY = 0;
	
    while (elem)
    {
        offsetX += elem.offsetLeft;
        offsetY += elem.offsetTop;
        elem = elem.offsetParent;
    }
	
	zoom = EmpireBoard.MapZoom;	
	x = Math.floor((x - offsetX) / 5 / zoom / 15) * 15;
	x = Math.max(1, x);
	y = Math.floor((y - offsetY) / 5 / zoom / 9) * 9;  
	y = Math.max(1, y);
	
	document.getElementById("worldMapWrapper").style.visibility = "hidden";
	// cancel if current region clicked	
	if (EmpireBoard.MapX == x && EmpireBoard.MapY == y) {
		return;
	}
	
	EmpireBoard.ContentEval("search_map(" + x + "," + y + ")");	
}

EmpireBoard.Handler.CheckOptionClicked = function(e) {
	this.value = (this.value == "1" ? "0" : "1");
	EmpireBoard.DB.Options[this.name] = (this.value == "1");
	EmpireBoard.DB.Save_Options();
};

EmpireBoard.Handler.NumberOptionChanged = function(e) {
	EmpireBoard.DB.Options[this.name] = isNaN(Number(this.value)) ? 0 : parseInt(this.value, 10);
	EmpireBoard.DB.Save_Options();
}

EmpireBoard.Handler.LanguageChanged = function(e) {
	EmpireBoard.DB.Options[this.name] = (this.value);
	EmpireBoard.DB.Save_Options();
};

EmpireBoard.Handler.SectionMinMaxButtonClicked = function(e) {
	var tableId = this.getAttribute("tableId");
	var expandedOption = tableId + "Expanded";
	var table = document.getElementById(tableId);
	if (table.style.visibility == "hidden") {
		table.style.visibility = "visible";
		table.style.height = "100%";
		EmpireBoard.DB.Options[expandedOption] = true;
		this.src = ImageData.MinimizeSectionButton;
	}
	else {
		table.style.visibility = "hidden";
		table.style.height = "0px";
		EmpireBoard.DB.Options[expandedOption] = false;
		this.src = ImageData.MaximizeSectionButton;;
	}
	
	EmpireBoard.DB.Save_Options();
};

EmpireBoard.Handler.SectionRefreshButtonClicked = function(e) {
	EmpireBoard.RefreshMode = this.getAttribute("refreshMode");
	EmpireBoard.RefreshIndex = 0;
	EmpireBoard.DB.Save_Temp();
	EmpireBoard.DoRefreshStep();
}

EmpireBoard.Handler.CaptchaTimerTick = function(e) {
	EmpireBoard.TimeToCaptcha -= 1;	
	EmpireBoard.DB.Save_Temp();
	
	var minute = Math.floor(EmpireBoard.TimeToCaptcha / 60);
	var second = EmpireBoard.TimeToCaptcha - 60 * minute;
	
	if (EmpireBoard.TimeToCaptcha > 1) {
		var span = document.getElementById("TimeToCaptcha");
		span.innerHTML = Str.ToTwoDigits(minute) + ":" + Str.ToTwoDigits(second);
		if (EmpireBoard.TimeToCaptcha < 600) {
			span.parentNode.style.background = "yellow";
			span.parentNode.style.color = "black";
		} 
		
		setTimeout(function(){EmpireBoard.Handler.CaptchaTimerTick()}, 1000);
	}	
}

EmpireBoard.Handler.CaptchaClicked = function(e) {
	EmpireBoard.TimeToCaptcha = 3600;
	EmpireBoard.DB.Save_Temp();
}

EmpireBoard.Handler.CastleListMoved = function(e) {
	if (e.button == 0) {
		EmpireBoard.DB.Options["CastleListX"] = document.getElementById("EmpireBoardCastleList").style.left;
		EmpireBoard.DB.Options["CastleListY"] = document.getElementById("EmpireBoardCastleList").style.top;
		EmpireBoard.DB.Save_Options();
	};	
}

EmpireBoard.Handler.MiniMapMoved = function(e) {
	if (e.button == 0) {
		EmpireBoard.DB.Options["MiniMapX"] = document.getElementById("smallMapWrapper").style.left;
		EmpireBoard.DB.Options["MiniMapY"] = document.getElementById("smallMapWrapper").style.top;
		EmpireBoard.DB.Save_Options();
	};	
}

EmpireBoard.Handler.DeleteDataClicked = function(e) {
	var answer = confirm(EmpireBoard.ScriptName + ":\n\n" + Locale.Text.DeleteDataQuestion);
	if (!answer) {
		return;
	}
	
	EmpireBoard.DB.Reset();
	window.location.href = window.location.href;	
}

EmpireBoard.Handler.SaveToArchiveButtonClicked = function(e) {
	var messageDivId = this.getAttribute("title");
	
	var message = EmpireBoard.DOM.Get_Nodes("//div[@id='" + messageDivId + "']");
	if (message.snapshotLength == 0) {
		alert("Error: Message not found!");
		return;
	}
	message = message.snapshotItem(0);
		
	var archiveItem = new MessageItem();	
	archiveItem.Id = Str.Now();
	archiveItem.Text = EmpireBoard.DOM.Get_Nodes("//div[@id='" + messageDivId + "']//p").snapshotItem(0).innerHTML;
	
	archiveItem.Date = EmpireBoard.GetMessageDate(message); 
	archiveItem.Sender = EmpireBoard.GetMessageSender(message);
	archiveItem.Sended = false;	
	EmpireBoard.DB.MessageArchive[archiveItem.Id] = archiveItem;
	EmpireBoard.DB.Save();
	EmpireBoard.Renders.Render_MessageArchiveCount();
};

EmpireBoard.Handler.SaveSendMessageToArchiveButtonClicked = function(e) {
	var messageIndex = parseInt(this.getAttribute("title"));
	
	var messages = EmpireBoard.DOM.Get_Nodes("//div[@class='box message']");
	if (messages.snapshotLength == 0) {
		return; 
	}

	var message = messages.snapshotItem(messageIndex);
	var archiveItem = new MessageItem();
	
	archiveItem.Id = Str.Now();
	
	// wrappertext contains messagetext AND options, workaround to get only the text
	var wrapperText = message.childNodes[1].childNodes[0].innerHTML;
	var optionIndex = wrapperText.indexOf('<p class="options">');
	archiveItem.Text = wrapperText.substring(0, optionIndex);
	
	archiveItem.Date = EmpireBoard.GetSendMessageDate(message); 
	archiveItem.Sender = EmpireBoard.GetSendMessageRecipent(message);
	archiveItem.Sended = true;
	EmpireBoard.DB.MessageArchive[archiveItem.Id] = archiveItem;
	EmpireBoard.DB.Save();
	EmpireBoard.Renders.Render_MessageArchiveCount();	
}

EmpireBoard.GetMessageSender = function(message) {	
	var messageWrapper = message.parentNode;
	var header = messageWrapper.previousSibling.previousSibling;
	var value = "";
	if (header.childNodes.length == 1) {
		value = header.innerHTML;
	}
	else {
		value = header.childNodes[1].innerHTML;
	}
	
	return value;
}

EmpireBoard.GetSendMessageRecipent = function(message) {
	var header = message.previousSibling.previousSibling;	
	return header.childNodes[1].innerHTML;
}

EmpireBoard.GetSendMessageDate = function(message) {
	var header = message.previousSibling.previousSibling;		
	return Str.ParseDate(header.childNodes[3].innerHTML);
}

EmpireBoard.GetMessageDate = function(message) {	
	var date = message.previousSibling.previousSibling.childNodes[3].childNodes[0].innerHTML
	return Str.ParseDate(date);
}

EmpireBoard.Handler.MessageClicked = function(e) {
	// MessageId is stored in custom Attribute of tr
	var messageId = this.getAttribute("title");
	var message = EmpireBoard.DB.MessageArchive[messageId];
	
	// replace content of placeholders
	EmpireBoard.Renders.Render_Message(message);
		
	// remove old highlights 
	var currentMessages = EmpireBoard.DOM.Get_Nodes("//table[@class='EmpireBoardMessageTable']//tr[@class='current']");
	if (currentMessages.snapshotLength > 0) {
		for (var i = 0; i<currentMessages.snapshotLength; i++) {
			var currentMessage = currentMessages.snapshotItem(i);
			currentMessage.setAttribute("class", "");
		}
	}
	
	// highlight selected current message in list
	var currentMessage = EmpireBoard.DOM.Get_Nodes("//table[@class='EmpireBoardMessageTable']//tr[@title='" + messageId + "']");
	currentMessage.snapshotItem(0).setAttribute("class", "current");
}

EmpireBoard.Handler.DeleteMessageClicked = function(e) {
	var answer = confirm(EmpireBoard.ScriptName + ":\n\n" + Locale.Text.DeleteMessageQuestion);
	if (!answer) {
		return;
	}
	
	var messageId = this.getAttribute("title");
	var message = EmpireBoard.DOM.Get_Nodes("//table[@class='EmpireBoardMessageTable']//tr[@title='" + messageId + "']").snapshotItem(0);
	message.parentNode.removeChild(message);	
	delete EmpireBoard.DB.MessageArchive[messageId];
	EmpireBoard.DB.Save();
	EmpireBoard.Renders.Render_Message(new MessageItem());
	EmpireBoard.Renders.Render_MessageArchiveCount();
}

EmpireBoard.Handler.AddBuddyButtonClicked = function(e) {
	var playerId = this.title;
	var buddy = new Buddy();
	buddy.Id = playerId;
	buddy.Name = EmpireBoard.Khanwars.GetPlayerNameFromPreview(document);	
	buddy.LastOnline = EmpireBoard.Khanwars.GetPlayerLastOnlineFromPreview(document);
	EmpireBoard.DB.BuddyList[playerId] = buddy;
	EmpireBoard.DB.Save();
}

EmpireBoard.Handler.RemoveBuddyButtonClicked = function(e) {
	var playerId = parseInt(this.href.match(/delbuddy=\d+/)[0].match(/\d+/)[0]);	
	delete EmpireBoard.DB.BuddyList[playerId];
	EmpireBoard.DB.Save();
}

EmpireBoard.Handler.MapChanged = function(e) {
	var id = e.relatedNode.getAttribute("id");		
	if (id == "new_map" || id == "now_map" || id == "old_map") {		
		Logger.Debug("MapChanged: " + id);		
		read_content_global("_xMap", got, id);
	}
}

var read_content_global;

(
	function() {
		var callbacks = [];
		// var callback_counter = 0;

		function dispatch_global(id, name, value, test) {
			var msg_data = {
				'type': 'read_content_global',
				'callback_id': name,
				'name': name,
				'data': value,
				'test': test,
			};
			
			var msg = JSON.stringify(msg_data);
			window.postMessage(msg, '*');
		}
		
		location.href = 'javascript:'+dispatch_global.toString();

		function receive_global(event) {
			try {
				var result = JSON.parse(event.data);
				if ('read_content_global' != result.type) return;
				if (!callbacks[result.callback_id]) return;
				callbacks[result.callback_id](result.name, result.data, result.test);
				del(callbacks[result.callback_id]);
			} catch (e) {
				// No-op.
			}
		}
		
		window.addEventListener('message', receive_global, false);

		read_content_global = function(name, callback, test) {
			var id = name; //(callback_counter++);
			callbacks[id] = callback;

			location.href = 'javascript:dispatch_global('
				+ id + ', "'
				+ name.replace(/\"/g, '\\"') + '", '
				+ name 
				+ ', "' + test + '");void(0);';
		}
	}
)();

function got(name, value, id) {
	Logger.Info("Script value " + name + " with value " + value + " read " + id);
	if (name == "_xMap") {
		EmpireBoard.MapX = value;
		read_content_global("_yMap", got, id);
	}
	
	if (name == "_yMap") {
		EmpireBoard.MapY = value;
		EmpireBoard.Khanwars.FetchMap(id);
		//EmpireBoard.Khanwars.FetchMap("now_map");
	}
}

EmpireBoard.Handler.SaveCalculatorClicked = function(e) {
	var nameTextBox = document.getElementById("EmpireBoardSaveArmyName");	
	var armyName = nameTextBox.value;
	if (armyName == "") {
		nameTextBox.focus();
		return;
	}
	
	var army = new Object();
	var fields = EmpireBoard.DOM.Get_Nodes("//form[@id='calculator_form']//table//input");
	for (var i = 0; i < fields.snapshotLength; i++) {
		var field = fields.snapshotItem(i);
		army[field.name] = field.value;
	}
	
	var selects = EmpireBoard.DOM.Get_Nodes("//form[@id='calculator_form']//table//select");
	for (var i = 0; i < selects.snapshotLength; i++) {
		var field = selects.snapshotItem(i);
		army[field.name] = field.value;
	}
	
	EmpireBoard.DB.SavedArmies[armyName] = army;	
	EmpireBoard.DB.Save();
	
	var savedArmySelect = document.getElementById("EmpireBoardSavedArmyList");
	EmpireBoard.Renders.Render_SavedArmyList(savedArmySelect);
	savedArmySelect.value = armyName;
}

EmpireBoard.Handler.SavedArmyChanged = function(e) {
	var nameTextBox = document.getElementById("EmpireBoardSaveArmyName");
	armyName = this.value;
	if (armyName == "") {
		EmpireBoard.ContentEval("clearCalculator()");
		nameTextBox.value = "";
		return;
	}
	
	nameTextBox.value = armyName;

	var army = EmpireBoard.DB.SavedArmies[armyName];
	for (var fieldName in army) {
		var field = EmpireBoard.DOM.Get_First_Node("//form[@id='calculator_form']//table//input[@name='" + fieldName + "'] | //form[@id='calculator_form']//table//select[@name='" + fieldName + "']");
		field.value = army[fieldName];
	}
}

EmpireBoard.Handler.EmptyMapBlockClicked = function(e) {
	// no idea why this is necessary...
	var mapBlock = e.target;
	var script = "displayPlayerMessage(0, \"\"," + mapBlock.getAttribute("gm_x") + "," + mapBlock.getAttribute("gm_y") + ");";
	EmpireBoard.ContentEval(script);
}

EmpireBoard.Handler.CastleFilterChanged = function(e) {
	EmpireBoard.CastleFilter = this.value;
	EmpireBoard.DB.Save_Temp();
}

EmpireBoard.Handler.DeleteSavedSpyReportClicked = function(e) {
	var key = this.title;
	delete EmpireBoard.DB.SpyReports[key];
	EmpireBoard.DB.Save();
}

EmpireBoard.Handler.OnWorldMapMouseMoved = function (e) {
	var x, y;

	if (!e) {
		var e = window.event;
	}
	
	x = e.pageX;
	y = e.pageY;
	
	var elem = e.target;
	var offsetX = 0;
	var offsetY = 0;
	
    while (elem)
    {
        offsetX += elem.offsetLeft;
        offsetY += elem.offsetTop;
        elem = elem.offsetParent;
    }
	
	zoom = EmpireBoard.MapZoom;
	x = Math.floor((x - offsetX) / 5 / zoom);
	y = Math.floor((y - offsetY) / 5 / zoom);  

	var currX = document.getElementById("WorldMapCurrX");
	currX.innerHTML = x;
	var currY = document.getElementById("WorldMapCurrY");
	currY.innerHTML = y;
	var key = x + ":" + y;
	var mapItem = EmpireBoard.DB.MapData[key];
	if(!mapItem) {
		mapItem = new MapItem();
	}
	
	document.getElementById("WorldMapCurrCastle").innerHTML = mapItem.Castle == "" ? "&nbsp;" : mapItem.Castle;
	if (mapItem.IsCapital){
		document.getElementById("WorldMapCurrCastle").setAttribute("class", "IsCapital");
	}
	else {
		document.getElementById("WorldMapCurrCastle").setAttribute("class", "Normal");
	}
	
	document.getElementById("WorldMapCurrPlayer").innerHTML = mapItem.Player == "" ? "&nbsp;" : mapItem.Player;
	document.getElementById("WorldMapCurrClan").innerHTML = mapItem.Clan == "" ? "&nbsp;" : mapItem.Clan;
	//Logger.Debug(x + ":" + y);
}

EmpireBoard.Handler.OnWorldMapZoomOut = function(e) {
	EmpireBoard.Handler.OnWorldMapZoom(-0.1);
}

EmpireBoard.Handler.OnWorldMapZoomIn = function(e) {
	EmpireBoard.Handler.OnWorldMapZoom(0.1);
}

EmpireBoard.Handler.OnWorldMapZoom = function(delta) {
	EmpireBoard.MapZoom += delta;
	EmpireBoard.MapZoom = Math.max(0.5, EmpireBoard.MapZoom);
	EmpireBoard.MapZoom = Math.min(EmpireBoard.MapZoom, 2);
	EmpireBoard.Handler.OnWorldMapShow();
}

EmpireBoard.Handler.WorkerButtonClicked = function(e) {
	var currentCastle = EmpireBoard.Khanwars.GetCurrentCastle();
	EmpireBoard.TempPopulation = currentCastle.PopulationUsed;
	var dialog = document.getElementById("msg1");
	dialog.setAttribute("style", "");
	dialog.appendChild(EmpireBoard.Renders.Render_SliderSkript());
	
	var content = "<a onclick=\"Effect.Fade('msg1', {duration: 0.5});showTooltip = 1; return false;\" title='" + Locale.Text.Close + "' class='close' href='#'></a>" + 
				  "<div class='EmpireBoardDialogHeader'>" + Locale.Text.Population + "&nbsp;" +
				  "<span id='currentPopulation'>" + currentCastle.PopulationUsed + "</span>&nbsp;/&nbsp;" +
				  "<span id='totalPopulation'>" + currentCastle.Population + "</span>" + 
				  "<a class='EmpireBoardWorkersSaveButton' href='#' onclick='return false;'>" + Locale.Text.Save + "</a></div>";

	dialog.innerHTML = content;
	var saveButton = dialog.getElementsByClassName("EmpireBoardWorkersSaveButton")[0];
	saveButton.addEventListener("click", EmpireBoard.Handler.SaveWorkersButtonClicked, false);
	
	var spacer = "<tr><td colspan='3' style='border-bottom: 1px solid #E4BD6F; padding:3px;'></td></tr>";
	var sliderTable = document.createElement("table");
	sliderTable.setAttribute("width", "100%");
	sliderTable.setAttribute("cellspacing", "0");
	
	var sliderTableContent = EmpireBoard.Renders.Render_Slider(0, Locale.Text.Goldmine) + spacer +
							 EmpireBoard.Renders.Render_Slider(1, Locale.Text.Ironmine) + spacer +
							 EmpireBoard.Renders.Render_Slider(2, Locale.Text.Lumberjacks) + spacer +
							 EmpireBoard.Renders.Render_Slider(3, Locale.Text.Farms);
	sliderTable.innerHTML = sliderTableContent;
	dialog.appendChild(sliderTable);
		
	EmpireBoard.Khanwars.FetchWorkers(0);
	EmpireBoard.Khanwars.FetchWorkers(1);
	EmpireBoard.Khanwars.FetchWorkers(2);
	EmpireBoard.Khanwars.FetchWorkers(3);
		
	dialog.scrollIntoView(false);
}

EmpireBoard.Handler.WorkerSliderChanged = function(e) {
	var workersGold = parseInt(document.getElementById("slider_all0").innerHTML);
	var workersIron = parseInt(document.getElementById("slider_all1").innerHTML);
	var workersWood = parseInt(document.getElementById("slider_all2").innerHTML);
	var workersFood = parseInt(document.getElementById("slider_all3").innerHTML);
	var maxPop = parseInt(document.getElementById("totalPopulation").innerHTML, 10);
	var pop = EmpireBoard.TempPopulation + workersGold + workersIron + workersWood + workersFood;	
	var popSpan = document.getElementById("currentPopulation");
	popSpan.innerHTML = pop;
	
	if (pop > maxPop) {
		popSpan.setAttribute("class", "important");
	}
	else {
		popSpan.setAttribute("class", "");
	}	
}

EmpireBoard.Handler.SaveWorkersButtonClicked = function(e) {
	var pop = parseInt(document.getElementById("currentPopulation").innerHTML, 10);
	var maxPop = parseInt(document.getElementById("totalPopulation").innerHTML, 10);
	
	if (pop > maxPop) {
		document.getElementById("currentPopulation").setAttribute("class", "important");
		return;
	}
	
	EmpireBoard.Khanwars.SaveWorkers(0);
	EmpireBoard.Khanwars.SaveWorkers(1);
	EmpireBoard.Khanwars.SaveWorkers(2);
	EmpireBoard.Khanwars.SaveWorkers(3);
	document.getElementById("msg1").setAttribute("style", "display: none;");
}

// -----------------------------------------------------------------------
// EmpireBoard starten
// -----------------------------------------------------------------------
EmpireBoard.Start();