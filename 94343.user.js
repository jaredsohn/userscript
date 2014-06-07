// coding: utf-8
// ==UserScript==
// @name           Khanwars V3 Mod
// @author         Metis
// @version        54
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
// ==/UserScript==

// Based on "Ikariam Empire Board" script (for Ikariam)
// http://userscripts.org/scripts/show/41051

// Further Information can be found here:
// http://forum.zarenkriege.de/viewtopic.php?f=86&t=19323

// TODO-Items: 
//  - resource list
//    * live-calculation of resources in table (--)
//    * calculate food usage in camp. (--)
//  - overview
//    * one page for all mine / workshop workers (o)
//  - building list 
//    * show buildings that can be build depending on current calculated resources (+)
//  - unit list
//    * units in marches? (--)
//    * unit in transfer (--)
//  - translations (o)
//  - PopUp-Tools
//    * march-time-calculator
//    * calc res for build troops (optimized use for left resis) (--)
//  - Map 
//    * adopt map overlay (show savenge) (++)
//    * auto fetch spy, show in castle-profile (hint on map, depends on map-overlay) (o)
//  - others
//    * march calculation (save troops, calc coords for entered time?) (--)

// -----------------------------------------------------------------------
// Fix for Google Chrome, use HTML5-LocalStorage instead of Greasemonkeys one.
// -----------------------------------------------------------------------
if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported") > -1) {
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
};

Logger.Log = function(level, msg) {
	GM_log("\n" + level + ":" + msg);
};
		
Logger.Debug = function(msg) {
	if (this.Enabled == true && this.LogLevel >=4) {		
		Logger.Log("DEBUG:", msg);
	}
};

Logger.Info = function(msg) {
	if (this.Enabled == true && this.LogLevel >=3) {		
		Logger.Log("INFO", msg);
	}
};

Logger.Warn = function(msg) {
	if (this.Enabled == true && this.LogLevel >=2) {
		Logger.Log("WARN", msg);
	}
};

Logger.Error = function(msg) {
	if (this.Enabled == true && this.LogLevel >=1) {		
		Logger.Log("ERROR", msg);
	}
};

// -----------------------------------------------------------------------
// Updater
// -----------------------------------------------------------------------
if (!Updater) var Updater = {};

Updater = {
	_ScriptURL:			 "",
	AvailableVersion:	 0
};
		
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
};
	
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
};
	
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
};

BuildingQueueItem = function() {
	this.BuildingId = -1;
	this.Finished = null;
};

ArmyQueueItem = function() {
	this.UnitId = -1;
	this.Count = 0;
	this.Finished = null;
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
};

EmpireBoard = {
	DOM:			 {},
	DB:				 {},
	Renders:		 {},
	Khanwars:		 {},
	Handler:		 {},
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
	Version:		 54,
	HomePageRoot:	 "http://userscripts.org/scripts/show/",
	ScriptURL:		 "http://userscripts.org/scripts/source/",
	UserScriptsID:	 89608
};
	
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
};

// Initialisierung des kompletten Objektes
EmpireBoard.Start = function() {
	this.StartTime = new Date().getTime();
	this.HomePageRoot	 += this.UserScriptsID;
	this.ScriptURL		 += this.UserScriptsID + ".user.js";
	
	this.BaseUrl = window.location.protocol + "//" + window.location.host;
	
	// Log initialisieren
	Logger.Enabled = this.LogEnabled;
	Logger.Info("Start ...");	
	
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
	
	if (EmpireBoard.Khanwars.IsCaptcha()) {
		// Abbruch wenn Botschutz & Co
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
	this.EndTime = new Date().getTime();
	Logger.Info('Ended after '+((EmpireBoard.EndTime - EmpireBoard.StartTime) / 1000) + "s");	
};	

EmpireBoard.SendRequest = function (mode, url, string, callback) {
	
	Logger.Debug('SendRequest:' + url);
	
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
};

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
		var ScriptURL = "http://userscripts.org/scripts/source/" + this.UserScriptsID + ".meta.js?" + new Date().getTime();
		Updater.Check(ScriptURL, function(availableVersion) { self._CompareScriptUpdate(availableVersion); });
	}
	else {
		Logger.Info("Not need check update today");
	}
};
	
EmpireBoard._CompareScriptUpdate = function(availableVersion) {
	Logger.Info("Available version: " + availableVersion);
	if (availableVersion != 0) {
		availableVersion = parseInt(availableVersion);
		
		if (availableVersion > this.Version) {
			this.DB.Options["HasNewVersion"] = true;
			if (EmpireBoard.DB.Options["AutoUpdate"]) {
				GM_openInTab(this.ScriptURL+'?version='+availableVersion+'.user.js');
			}
		}
		else {
			this.DB.Options["HasNewVersion"] = false;
		}
		
		this.DB.Options["AvailableVersion"] = availableVersion;
		this.DB.Options["LastCheckUpdate"] = this.StartTime;
		this.DB.Save_Options();
	}
};	

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
	
	// BuddyList
	if (this.Khanwars.IsBuddyList()) {
		EmpireBoard.Khanwars.FetchBuddyList();
	}
	
	// fetch onlinetimes
	EmpireBoard.Khanwars.FetchLastOnlineForBuddyList();
	
	// save all fetched data
	EmpireBoard.DB.Save_Options();
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
// EmpireBoard-DOM Initialisierungen 
// -----------------------------------------------------------------------
EmpireBoard.DOM = {
	_Parent : null
};

EmpireBoard.DOM.Init = function(parent) {
	Logger.Debug("EmpireBoard.DOM.Init");
	this._Parent = parent;
};

EmpireBoard.DOM.Create_Document = function(responseText) {
	// Thank sizzlemctwizzle and Seniltai
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument("", "", dt);
	var html = doc.createElement("html");
	
	var idx1 = responseText.indexOf("<html");
	var idx2 = responseText.indexOf("</html");
	var body = responseText.substring(idx1, idx2+7);
	
	html.innerHTML = body;
	doc.appendChild(html);
	
	return doc;
};
	
EmpireBoard.DOM.Get_Nodes = function(path, root) {
	var contextNode = root ? root.evaluate ? root : root.ownerDocument : document;	
	return contextNode.evaluate(path, contextNode, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
};
	
EmpireBoard.DOM.Has_Node = function(path, root) {
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1) {
		return true;
	}
	else {
		return false;
	}
};
	
EmpireBoard.DOM.Get_First_Node = function(path, root) {
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1) {
		return value.snapshotItem(0);
	}	
	return null;
};

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
	return value.replace(",", "");
}

Str.ToTwoDigits = function (value) {
	if (value > 99) {
		return value;
	}
	
	var twoDigitStr = "00" + value;
	return twoDigitStr.substr(twoDigitStr.length - 2);	
}

// im Format: yyyy-mm-dd hh:MM:ss
Str.ParseDate = function(dateString) {
	dateString = Str.Trim(dateString);
	var year = dateString.substr(0, 4);
	var month = dateString.substr(5,2) - 1;
	var day = dateString.substr(8,2);
	var hour = dateString.substr(11,2);
	var minute = dateString.substr(14,2);
	var second = dateString.substr(17,2);
	
	var date = new Date(year, month, day, hour, minute, second);	
	return date;
}

Str.ParseTime = function(timeString) {
	var result = timeString.match(/\d+/g);	
	var hours = parseInt(result[0]);
	var minutes = parseInt(result[1]);
	var seconds = parseInt(result[2]);
	var time = (((hours * 60) + minutes) * 60 + seconds) * 1000;
	return time;
}

Str.FormatTime = function(time) {
	var hours = Math.floor(time);
	var minutes = Math.floor((time-hours) * 60);
	var seconds = Math.floor((((time-hours) * 60) - minutes) * 60);
	
	return Str.ToTwoDigits(hours) + ":" + Str.ToTwoDigits(minutes) + ":" + Str.ToTwoDigits(seconds);}

Str.FormatDate = function(date) {
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
	return result;
}

Str.ToDecimalGrouping = function (nStr) {
	if (nStr==undefined || isNaN(nStr)) {
		return "-";
	}
	
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];	
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1;
}
	
Str.CreateUnitIds = function() {
	this.UnitsId =  new Object();
	this.UnitsId[1] = '1';
	this.UnitsId[2] = '2';
	this.UnitsId[3] = '3';
	this.UnitsId[4] = '4';
	this.UnitsId[5] = '16';
	this.UnitsId[6] = '16';
	this.UnitsId[7] = '16';
	this.UnitsId[8] = '16';
	this.UnitsId[9] = '5';
	this.UnitsId[10] = '6';
	this.UnitsId[11] = '7';
	this.UnitsId[12] = '8';
	this.UnitsId[13] = '9';
	this.UnitsId[14] = '10';
	this.UnitsId[15] = '11';
	this.UnitsId[16] = '12';
	this.UnitsId[17] = '13';
	this.UnitsId[18] = '14';
	this.UnitsId[19] = '15';
	this.UnitsId[20] = '17';
	this.UnitsId[21] = '16';
	this.UnitsId[22] = '16';
	this.UnitsId[23] = '16';
	this.UnitsId[24] = '16';
	this.UnitsId[25] = '16';
	this.UnitsId[26] = '16';
	this.UnitsId[27] = '16';
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
	_World:					null
};
	
EmpireBoard.Khanwars.Init = function(parent) {
	Logger.Debug('EmpireBoard.Khanwars.Init');
	this._Parent = parent;
};
	
EmpireBoard.Khanwars.Host = function() {
	if (this._Host == null) {
		this._Host = '';		
		this._Host = document.location.host;
	}
		
	return this._Host;
};	

EmpireBoard.Khanwars.World = function() {
	if (this._World == null) {
		this._World = '';
		this._World = document.title.match(/World \d+|Welt \d+|Map \d+/);
	}
	
	return this._World;
}

EmpireBoard.Khanwars.IsCaptcha  = function() {
	Logger.Debug('IsCaptcha');
	return window.location.href.indexOf('botcaptcha') > 0 || 
		   window.location.href.indexOf('terms.php') > 0 ||
		   window.location.href.indexOf('premium_urlaub.php') > 0 ||
		   window.location.href.indexOf('choose_race.php') > 0 ||
		   window.location.href.indexOf('nocastle.php') > 0;
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

EmpireBoard.Khanwars.IsCalculator = function() {
	var result = window.location.href.indexOf('calculator.php') > 0;
	Logger.Debug('IsCalculator ' + result);
	return result;
}

EmpireBoard.Khanwars.CurrentCastleKoordId = function() {
	var currentCastle = Str.Trim (document.getElementById('changeCastle').childNodes[1].innerHTML);
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
	Logger.Debug('FetchCastles');	
	
	var castleUrl = 'http://' + window.location.host + '/ajax_castles.php';	
	this._Parent.SendRequest ("POST", castleUrl, "", EmpireBoard.Renders.MakeCastleList);	
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
		level = parseInt(level[0].match(/\d+/));
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
		currentCastle.BuildingQueue[i].Finished = new Date().getTime() + finishTime;		
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
	currentCastle.FetchDate = new Date().getTime();
	currentCastle.Population = Str.ParseInt(this._Parent.DOM.Get_First_Node("//span[@id='population_used_max']", document).innerHTML);
};

EmpireBoard.Khanwars.FetchProduction = function() {	
	Logger.Debug('FetchProduction');
	
	var currentCastle = this.GetCurrentCastle();
	
	currentCastle.Resources.GoldProd = this.GetResourceProduction('PerHour_1');
	currentCastle.Resources.IronProd = this.GetResourceProduction('PerHour_2');
	currentCastle.Resources.WoodProd = this.GetResourceProduction('PerHour_3');
	currentCastle.Resources.FoodProd = this.GetResourceProduction('PerHour_4');
	currentCastle.Storage = Str.ParseInt(this._Parent.DOM.Get_First_Node("//span[@id='barGoldMax']", document).innerHTML);

	this.FetchBuildingQueue(currentCastle);			
};

EmpireBoard.Khanwars.GetResource = function(id) {	
	Logger.Debug('EmpireBoard.Khanwars.GetResource');	
	var resource = document.getElementById(id);	
	return Str.ParseInt(resource.innerHTML);
};

EmpireBoard.Khanwars.GetResourceProduction = function(id) {	
	Logger.Debug('EmpireBoard.Khanwars.GetResourceProduction');	
	var resource = document.getElementById(id).innerHTML;	
	return resource.replace(",", "").match(/\d+/);
};

EmpireBoard.Khanwars.FetchMapImages = function() {	
	Logger.Debug("FetchMapImages");
	this.MapImages = new Array();
	var i, j;
	
	for (j = 0; j < 6; j++) {
		for (i = 0; i < 4; i++) {
			this.MapImages[i * 6 + j] = new Image();
			this.MapImages[i * 6 + j].src = "map_gd.php?x=" + (i * 60 + (i == 0 ? 0 : 0)) + "&y=" + (j * 36 + (j == 0 ? 0 : 0)) + "&rand=" + (new Date()).getTime();
		}
	}
}

EmpireBoard.Khanwars.FetchMap = function(id) {
	return; 
	var BaseX = unsafeWindow._xMap;
	var BaseY = unsafeWindow._yMap;
	
	// alert(BaseX + ":" + BaseY);
	var map = EmpireBoard.DOM.Get_Nodes("//div[@id='" + id + "']/div[@class='wrapper']/div[not(@onclick)]");
		
	for (var k = 0; k < map.snapshotLength; k++) {
		var castleDiv = map.snapshotItem(k);
		var style = castleDiv.getAttribute("style") + "; cursor: pointer;";		
		castleDiv.setAttribute("style", style);
		castleDiv.addEventListener("click", EmpireBoard.Handler.MapSquareClicked, true);
		Logger.Debug(style);
	}	
	return;
}

EmpireBoard.Handler.MapSquareClicked = function(e) {
	// no idea why this is necessary...
	alert("TODO Clicked");
	// return;
	
	// var TempNode = Event.target;
	// while (! TempNode.hasAttribute("GM_X") && TempNode.parentNode) {
	// 	TempNode = TempNode.parentNode;
	// }
	  
	// unsafeWindow.displayPlayerMessage(0, "", TempNode.getAttribute("GM_X"), TempNode.getAttribute("GM_Y"));
}

EmpireBoard.Khanwars.FetchMap_OLD = function() {
	var map = EmpireBoard.DOM.Get_Nodes("//div[@id='now_map']//div[@class='wrapper']//div[contains(@class, 'mapBlock mapCastle') or contains(@class, 'mapBlock mapDarkKnight')]");
	for (var k = 0; k < map.snapshotLength; k++) {
		var castleDiv = map.snapshotItem(k);
		var castleName = castleDiv.title.match(/\[.*\)\]/)[0];		
		var crown = castleName.match(/<.*>/);
		if (crown) {
			castleName = castleName.replace(crown[0], "");
		}
			var castleKoord = castleName.match(/\(\d+:\d+\)/);
			castleName = castleName.replace(castleKoord[0], "");
			castleName = castleName.replace("[", "");
			castleName = castleName.replace("]", "");
			castleName = Str.Trim(castleName);
			Logger.Info(castleName + " - " + castleKoord);
	}	
	return;
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
	if ((new Date().getTime() - EmpireBoard.DB.BuddyList.LastFetched) / 1000 / 60 < 5) {
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
	
	EmpireBoard.DB.BuddyList.LastFetched = new Date().getTime();
	EmpireBoard.DB.Save();
}

EmpireBoard.Khanwars.FetchArmyFromPohod = function() {
	Logger.Debug('FetchArmyFromPohod');
	
	var currentCastle = this.GetCurrentCastle();
	
	for (var i = 1; i<18; i++) {
		currentCastle.Units[i]=0;
	}
	
	var unitRows = EmpireBoard.DOM.Get_Nodes("//table[@id='units_to_send']//tbody//tr");	
	for (var i = 0; i < unitRows.snapshotLength; i++) {
		var unitRow = unitRows.snapshotItem(i);
		var unitId = Str.UnitsId[unitRow.innerHTML.match(/units\[\d+\]/)[0].match(/\d+/)];
		var unitCount = unitRow.childNodes[3].innerHTML.replace(",", "").match(/\d+/);
		currentCastle.Units[unitId] = unitCount;
	}
}

EmpireBoard.Khanwars.FetchCastleFilter = function() {
	var filter = EmpireBoard.DOM.Get_First_Node("//form[@name='filterForm']//select[@name='filter']");
	filter.addEventListener("change", EmpireBoard.Handler.CastleFilterChanged , true);
}

EmpireBoard.Handler.CastleFilterChanged = function(e) {
	EmpireBoard.CastleFilter = this.value;
	EmpireBoard.DB.Save_Temp();
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
		currentCastle.Units[unitId] = unitCount;
	}
}

EmpireBoard.Khanwars.FetchArmyQueue = function (category) {	

	var currentCastle = this.GetCurrentCastle();
	
	var fromIdx = (category - 1) * 7;
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
		currentCastle.UnitQueue[idx].Count = unitCount;
		
		// lookup total buildTime 
		var queueId = "cnt_all[" + (i + 1) + "]";
		var buildTime = EmpireBoard.DOM.Get_Nodes("//span[@id='" + queueId + "']");
		var timeInSeconds = Str.ParseInt(buildTime.snapshotItem(0).title);
		currentCastle.UnitQueue[idx].Finished = new Date().getTime() + timeInSeconds * 1000;		
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
	Logger.Debug("EmpireBoard.Khanwars.CalcResource");
	var now = new Date().getTime();		
	var calc = res + (now - fetchDate) / 1000 / 60 / 60 * resProd;
	
	if (calc > storage) {
		calc = storage;
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

// -----------------------------------------------------------------------
// EmpireBoard-DB
// -----------------------------------------------------------------------
EmpireBoard.DB = {
	_Parent:			 null,
	Prefix:				 '',
	CurrentCastles:		 {},
	MessageArchive:		 {},
	ExtracedCastleIds:	 {},
	BuddyList:			 {},
	SavedArmies:		 {},
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
		config.LastFetched = new Date().getTime();
	}
	this.BuddyList = config;		
	
	config = this.UnSerialize(this.GetVar("SavedArmies", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	this.SavedArmies = config;	
};	
	
EmpireBoard.DB.SetVar = function (varname, varvalue) {
	var varId = EmpireBoard.Khanwars.Host() + '/' + EmpireBoard.Khanwars.World() + '/' + varname;
	GM_setValue(varId, varvalue);
}

EmpireBoard.DB.Save = function() {
	this.SetVar("CurrentCastles", this.Serialize(this.CurrentCastles));
	this.SetVar("MessageArchive", this.Serialize(this.MessageArchive));
	this.SetVar("BuddyList", this.Serialize(this.BuddyList));
	this.SetVar("SavedArmies", this.Serialize(this.SavedArmies));
};

EmpireBoard.DB.Load_Options = function() {
	Logger.Debug("EmpireBoard.DB.Load_Options");
	this.Options = this.UnSerialize(GM_getValue("Option"));
	if (this.Options == undefined)						this.Options = {};
	if (this.Options["EmpireBoardOptionTableExpanded"] == undefined)	this.Options["EmpireBoardOptionTableExpanded"] = true;
	if (this.Options["EmpireBoardResourcesExpanded"] == undefined)	this.Options["EmpireBoardResourcesExpanded"] = true;
	if (this.Options["EmpireBoardBuildingsExpanded"] == undefined)	this.Options["EmpireBoardBuildingsExpanded"] = true;
	if (this.Options["EmpireBoardUnitsExpanded"] == undefined)	this.Options["EmpireBoardUnitsExpanded"] = true;
	if (this.Options["Table_Resources"] == undefined)	this.Options["Table_Resources"] = true;
	if (this.Options["Table_Buildings"] == undefined)	this.Options["Table_Buildings"] = true;
	if (this.Options["Table_Army"] == undefined)	 	this.Options["Table_Army"] = true;
	if (this.Options["Ticker"] == undefined)	 		this.Options["Ticker"] = true;
	if (this.Options["AutoUpdate"] == undefined)	 	this.Options["AutoUpdate"] = true;
	if (this.Options["Locale"]== undefined)				this.Options["Locale"] = "de";
};

EmpireBoard.DB.Save_Options = function() {
	GM_setValue('Option', this.Serialize(this.Options));
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
	Logger.Debug(castleA.Name + " > " + castleB.Name);
	
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
		"hu" : "Magyar",
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
		case "hu":
			this.Load_Texts_HU();
			break;
		case "pt":
			this.Load_Texts_PT();
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
		Goldmine				: "Goldmine",
		Ironmine				: "Eisenmine",
		Lumberjacks				: "Holzfäller",
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
	};
};
	
// -----------------------------------------------------------------------
// EmpireBoard-Renderer
// -----------------------------------------------------------------------
EmpireBoard.Renders = {};

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
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/subnav_bottom.png') 0 bottom no-repeat; \
			padding: 0 0 39px 0;                        \
		}                                               \
                                                        \
		.EmpireBoardCastleList .leftMenu .wrapper {     \
			padding: 20px 0 0 0;                        \
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/subnav_top.png') no-repeat; \
		}                                               \
		                                                \
		.EmpireBoardCastleList .leftMenu h2 {           \
			height: 43px;                               \
			line-height: 43px;                          \
			text-align: center;                         \
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/subnav_title.png') no-repeat; \
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
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/h_ico_castle_menu.png') -10px -5px no-repeat; \
			padding: 5px 5px 5px 45px;                  \
			border-radius: 5px;                         \
			-moz-border-radius: 5px;                    \
			-webkit-border-radius: 5px;                 \
		}                                               \
		                                                \
		.EmpireBoardCastleList dd a.capital {           \
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/h_ico_castle_menu.png') -10px -125px no-repeat; \
		}                                               \
                                                        \
		.EmpireBoardCastleList dd a.camp {              \
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/map/camp.png')  no-repeat; \
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
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/c_bknd.jpg') center center no-repeat; \
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
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/title_h2_back.png') right center no-repeat; \
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
			background: url('http://33.xs-software.com/khanwars/game3.0/img/3.0/map/gotomap.gif') no-repeat scroll 0 0 ; \
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
			background: url(\"http://33.xs-software.com/khanwars/game3.0/img/3.0/submit_bknd.jpg\") repeat-x scroll 0 0 #925E2C;	\
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
			font-size: 10px; 							\
			text-decoration: none; 						\
			white-space:nowrap;; 						\
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
			background: url(\"http://33.xs-software.com/khanwars/game3.0/img/3.0/hotlinks_top.png\") no-repeat scroll 0 0 transparent; \
			position: absolute;           				\
			left: -40px;                          		\
			width: 170px;								\
			top: 50px;									\
			z-index: 5;									\
		}												\
														\
		#EmpireBoardBuddyList .wrapper {				\
			background: url(\"http://33.xs-software.com/khanwars/game3.0/img/3.0/hotlinks_bottom.png\") no-repeat scroll 0 bottom transparent;\
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
			max-width:125px; 							\
			overflow: hidden;                           \
		}												\
														\
		#EmpireBoardBuddyList a {						\
			color: #ECBC8D;								\
			font-weight: bold;							\
			text-decoration: none;						\
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
	}
	
	// enable / disable ticker
	if (!EmpireBoard.DB.Options["Ticker"]) {	
		var ticker = document.getElementById("scroller");
		ticker.parentNode.removeChild(ticker);
	}
	
	// link on top of scr
	EmpireBoard.Renders.Render_QuickLinks();
	
	// buddy-list	
	EmpireBoard.Renders.Render_BuddyList();
	
	// attatch to kw-buddy-list to add remove-Handler
	if (EmpireBoard.Khanwars.IsBuddyList()) {
		EmpireBoard.Renders.Render_AttachToRemoveButtons();
	}
	
	if (EmpireBoard.Khanwars.IsCalculator()) {
		EmpireBoard.Renders.Render_Calculator();
	}
};

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
	
	var buddyTable = "<span class=\"title\"><a href=\"/buddylist.php\">" + Locale.Text.BuddyList + "</a></span><div class=\"wrapper\"><table>";
	
	var sortedBuddyList = EmpireBoard.DB.SortBuddyList(EmpireBoard.DB.BuddyList);	
	
	for (var idx = 0; idx < sortedBuddyList.length; idx++) {
		var buddyId = sortedBuddyList[idx];
		if (buddyId == "LastFetched") {
			continue;
		}
		
		var buddy = EmpireBoard.DB.BuddyList[buddyId];
		buddyTable += "<tr>";
		buddyTable += "<td><a href=\"/preview.php?player_id=" + buddy.Id + "\">" + buddy.Name + "</a></td><td>";
		if ((new Date().getTime() - buddy.LastOnline) / 1000 / 60 / 60 < 1 ) {
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
	return EmpireBoard.DOM.Get_Nodes("//div[@id='skillsNav']//h2", mydoc).snapshotItem(0).innerHTML;
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
				
		// fromCastle
		EmpireBoard.Renders.MarchCoordinate(marchesRow.childNodes[5]);
		// toCastle
		EmpireBoard.Renders.MarchCoordinate(marchesRow.childNodes[7]);
	}		
}

EmpireBoard.Renders.MarchCoordinate = function(node) {
	var castleKoord = node.innerHTML.match(/\d+:\d+/);
	var castleId = "(" + castleKoord + ")"
	var castle = EmpireBoard.DB.CurrentCastles[castleId];
	if (!castle) {
		// not a own castle 
		return; 
	} 
	else {
		var formatedCastle = castleKoord + "<br/>" +
							 "<a href='map.php?setx=" + castle.X + "&sety=" + castle.Y + "' class=\"EmpireBoardMarch\">" +
							 "<img src='http://33.xs-software.com/khanwars/game3.0/img/3.0/map/gotocoords.gif' height='11px' style='border-style:none;'>" +							 
							 "&nbsp;" + castle.Name + "</a>";
		node.innerHTML = node.innerHTML.replace(castleKoord, formatedCastle);
		node.style.overflow = "hidden";
		node.style.maxWidth = "75px";
	}
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
		deleteButton.setAttribute("src", "http://33.xs-software.com/khanwars/game3.0/img/3.0/msg_delete.gif");
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
	Logger.Debug('EmpireBoard.Renders.Render_Options');
	
	var tableWrapper = this.Render_Section(boardDiv, "EmpireBoardOptionTable", Locale.Text.Option, false); 
	
	var optionTable = document.createElement("table");
	optionTable.setAttribute("cellspacing", "5");
	optionTable.appendChild(EmpireBoard.Renders.Render_Option("Table_Resources", Locale.Text.Opt_Table_Resources));
	optionTable.appendChild(EmpireBoard.Renders.Render_Option("Table_Buildings", Locale.Text.Opt_Table_Buildings));	
	optionTable.appendChild(EmpireBoard.Renders.Render_Option("Table_Army", Locale.Text.Opt_Table_Army));
	optionTable.appendChild(EmpireBoard.Renders.Render_Option("Ticker", Locale.Text.Opt_Ticker));
	optionTable.appendChild(EmpireBoard.Renders.Render_Option("AutoUpdate", Locale.Text.Opt_AutoUpdate));
	if (EmpireBoard.DB.Options["HasNewVersion"]) {
		var tr = document.createElement("tr"); 
		var td = document.createElement("td");		
		tr.appendChild(td);	
		td.setAttribute("colSpan", "2");
		td.innerHTML = "<br/><p style=\"font-weight:bold; color: red;\">" + Locale.Text.New_Version + " " + EmpireBoard.DB.Options["AvailableVersion"] + " " + Locale.Text.Available + ". <a href=\"http://userscripts.org/scripts/source/" + EmpireBoard.UserScriptsID + ".user.js\" target=\"_blank\">" + Locale.Text.KlickToInstall;
		optionTable.appendChild(tr);
	}
	
	optionTable.appendChild(EmpireBoard.Renders.Render_LanguageOption());
	optionTable.appendChild(EmpireBoard.Renders.Render_DeleteButton());
	tableWrapper.appendChild(optionTable);
	
	var copyDiv = document.createElement("div");		
	copyDiv.innerHTML = "<p class=\"Footer\">Powered by <a href=\"http://userscripts.org/scripts/show/" + EmpireBoard.UserScriptsID + "\" target=\"_blank\"><b>" + EmpireBoard.ScriptName + "</b></a> <span dir=\"ltr\">(<span>v. <i>" + EmpireBoard.Version + "</i></span>)</span>";		
	tableWrapper.parentNode.appendChild(copyDiv);
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

EmpireBoard.Renders.Render_Option = function(option, caption) {		
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
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/khanwars/game3.0/img/3.0/res_ico_gold.gif\">" + Locale.Text.Gold + "</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/khanwars/game3.0/img/3.0/res_ico_iron.gif\">" + Locale.Text.Iron + "</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/khanwars/game3.0/img/3.0/res_ico_wood.gif\">" + Locale.Text.Wood + "</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/khanwars/game3.0/img/3.0/res_ico_food.gif\">" + Locale.Text.Food + "</td>\
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
		empireTable += "<img src='http://33.xs-software.com/khanwars/game3.0/img/3.0/map/gotocoords.gif' height='15px'>";		
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
			fetchDate = new Date().getTime();
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

		empireTable += "<td class='number'>" + Str.ToDecimalGrouping(loyality) +"</td>";
		empireTable += "<td class='number'>" + Str.ToDecimalGrouping(currentCastle.PopulationUsed) +"</td>";
		empireTable += "<td class='number'>" + Str.ToDecimalGrouping(currentCastle.Population) +"</td>";
		
		var gold = parseInt(currentCastle.Resources.Gold);
		var goldProd = parseInt(currentCastle.Resources.GoldProd);
		if (isNaN(gold)) gold=0;		
		if (isNaN(goldProd)) goldProd=0;
		gold = EmpireBoard.Khanwars.CalcResource(gold, goldProd, storage, fetchDate);
		
		sum.Gold += gold;
		empireTable += this.Render_Resource(gold, goldProd, storage, Locale.Text.Gold);
		
		sum.GoldProd += goldProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.GoldProd) +"</td>";

		var iron = parseInt(currentCastle.Resources.Iron);
		var ironProd = parseInt(currentCastle.Resources.IronProd);
		if (isNaN(iron)) iron=0;		
		if (isNaN(ironProd)) ironProd=0;
		iron = EmpireBoard.Khanwars.CalcResource(iron, ironProd, storage, fetchDate);
		sum.Iron += iron;
		empireTable += this.Render_Resource(iron, ironProd, storage, Locale.Text.Iron);
		
		sum.IronProd += ironProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.IronProd) +"</td>";
		
		var wood = parseInt(currentCastle.Resources.Wood);
		var woodProd = parseInt(currentCastle.Resources.WoodProd);
		if (isNaN(wood)) wood=0;		
		if (isNaN(woodProd)) woodProd=0;
		wood = EmpireBoard.Khanwars.CalcResource(wood, woodProd, storage, fetchDate);
		sum.Wood += wood;
		empireTable += this.Render_Resource(wood, woodProd, storage, Locale.Text.Wood);
		
		sum.WoodProd += woodProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.WoodProd) +"</td>";

		var food = parseInt(currentCastle.Resources.Food);
		var foodProd = parseInt(currentCastle.Resources.FoodProd);
		
		if (isNaN(food)) food=0;		
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
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_1.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Goldmine + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_2.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Ironmine + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_3.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Lumberjacks + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_4.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Farms + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_5.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Dwellings + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_6.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Barracks + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_7.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Stables + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_8.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Workshop + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_9.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Marketplace + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_10.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Blacksmith + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_11.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Infirmary + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_12.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Wall + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_13_race_2.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Order + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_14.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Shelter + "</td>\
								<td><img src='http://33.xs-software.com/khanwars/game3.0/img/buildings/tiny/building_15.jpg' style='vertical-align:middle' width='30px'><br/>" + Locale.Text.Storages + "</td>\
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
		empireTable += "<img src='http://33.xs-software.com/khanwars/game3.0/img/3.0/map/gotocoords.gif' height='14px'>";		
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
	Logger.Debug("Render_BuildingQueue " + buildingId + " " + finalLevel);
	
	if (currentCastle.BuildingQueue == undefined) {
		currentCastle.BuildingQueue = {};					
		currentCastle.BuildingQueue[0] = new BuildingQueueItem();
		currentCastle.BuildingQueue[1] = new BuildingQueueItem();
		currentCastle.BuildingQueue[2] = new BuildingQueueItem();
	}
	
	var overviewFix = "=";
	var buildingQueue = "";
	var now = new Date().getTime();
	var currentLevel = finalLevel;
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
						  Locale.Text.Finished + ":<br />" + Str.FormatDate(finishDate) + "<br/>" +
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
		buildingQueue = currentCastle.Buildings[buildingId];
	}
		
	return buildingQueue;
}

EmpireBoard.Renders.Render_Unit_List = function(boardDiv) {
	Logger.Debug('EmpireBoard.Renders.Render_Unit_List');
	
	var empireTable = "\
					<table border=\"0\" width=\"810px\" cellspacing=\"1\">\
						<thead>\
							<tr>	\
								<td>" + Locale.Text.Castle + "</td>\
								<td>" + Locale.Text.Population + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/1.jpg' width='25px'>" + Locale.Text.Pikeman + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/2.jpg' width='25px'>" + Locale.Text.Swordsman + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/3.jpg' width='25px'>" + Locale.Text.Axeman + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/4.jpg' width='25px'>" + Locale.Text.Maceman + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/9.jpg' width='25px'>" + Locale.Text.Quickwalker + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/10.jpg' width='25px'>" + Locale.Text.LCavalry + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/11.jpg' width='25px'>" + Locale.Text.HCavalry + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/12.jpg' width='25px'>" + Locale.Text.Ram + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/13.jpg' width='25px'>" + Locale.Text.Ballistician + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/14.jpg' width='25px'>" + Locale.Text.Catapult + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/15.jpg' width='25px'>" + Locale.Text.Trebuchet + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/16.jpg' width='25px'>" + Locale.Text.Shortbow + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/17.jpg' width='25px'>" + Locale.Text.Longbow + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/18.jpg' width='25px'><br/>" + Locale.Text.Crossbow + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/19.jpg' width='25px'>" + Locale.Text.ArcherCavalry + "</td>\
								<td style='vertical-align:top'><div style='width:25px;height:17px;background-color:#492B11; padding-top:6px; '>...</div>" + Locale.Text.SpecialUnit + "</td>\
								<td style='vertical-align:top'><img src='http://33.xs-software.com/khanwars/game3.0/img/units/thumbs/20.jpg' width='25px'>" + Locale.Text.Nobleman + "</td>\
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
	var now = new Date().getTime();
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
	var now = new Date().getTime();
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
	// Hack, alle Burgen  als jeweils ein Zeile umwandeln.
	responseText = responseText.replace(/<\/dd>/g, "</dd>\n");
	var formattedCastleList = "";
	// einzelnes Castle ermitteln
	var castles = responseText.match(/<dd.*<\/dd>/g);
	
	if (castles) {
		Logger.Info(castles.length + " castles found.");
		for (var i = 0; i < castles.length; ++i) {	
			EmpireBoard.Khanwars.ExtractCastle(castles[i]);
			formattedCastleList +=  EmpireBoard.Renders.FormatCastleInCastleList(castles[i]);
		}
	}
	EmpireBoard.DB.GarbageCollect();
	EmpireBoard.DB.Save();
	
	var rightNav = EmpireBoard.Khanwars.GetRightBanner();	
    
	if (!EmpireBoard.DOM.Has_Node("//script[contains(@src, 'dragdrop.js')]")) {
		var ddscript = document.createElement("script");
		ddscript.setAttribute("type", "text/javascript");
		ddscript.setAttribute("src", "http://33.xs-software.com/khanwars/game3.0/js/dragdrop.js");
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
	overlay.setAttribute("style", "background-color: rgb(0, 0, 0); opacity: 0.8; width: 1920px; height: 1500px;z-index:1998;left:0;top:0px;position:absolute;");	
	globalMapWrapper.appendChild (overlay);
	
	// Menu auf der Welt-Karte
	var closeButton = document.createElement("ul");
	closeButton.innerHTML="<li style=\"float:right;\"><a href='#'>" + Locale.Text.Close + "</a></li>";
	closeButton.addEventListener("click", EmpireBoard.Handler.OnWorldMapHide, true);
	closeButton.setAttribute("class", "topMenu");
	closeButton.setAttribute("style", "z-index:2000;left:155px;top:20px;position:absolute;");	
	globalMapWrapper.appendChild(closeButton);
	
	// Border für die Karte
	var mapBorder = document.createElement("img");
	mapBorder.setAttribute("src", "http://33.xs-software.com/khanwars/game3.0/img/3.0/map/map_border.png");
	mapBorder.setAttribute("style", "z-index:1999;left:0px;top:25px;position:absolute;width:1205px;height:1299px;");	
	globalMapWrapper.appendChild(mapBorder);
	
	// Karte mittels Canvas zeichnen
	var mapArea = document.createElement("canvas");
	mapArea.id = "worldMapCanvas";
	mapArea.setAttribute('style', "z-index:2000; left:100px; top:162px; position:absolute;");	
	mapArea.height = '1005';
	mapArea.width = '1005';
	mapArea.addEventListener("click", EmpireBoard.Handler.OnWorldMapClicked, true);  
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

// -----------------------------------------------------------------------
// EmpireBoard-Event-Handler
// -----------------------------------------------------------------------
EmpireBoard.Handler.OnWorldMapShow = function (event) {
	var i,j;  
	var mapArea = document.getElementById("worldMapCanvas");
	var ctx = mapArea.getContext("2d");
  
	ctx.fillStyle = "#467828";
	ctx.fillRect (0, 0, 1005, 1005);
	var img = EmpireBoard.Khanwars.MapImages;
	
	for (j = 0; j < 6; j++) {
		for (i = 0; i < 4; i++) {
			if (img[i * 6 + j].complete) ctx.drawImage(img[i * 6 + j], i * 300, j * 180);
		}	
	}
		
    var selectedX = unsafeWindow._xMap; 
	var selectedY = unsafeWindow._yMap;
	
	ctx.lineWidth   = 2;
	ctx.strokeStyle = "#FFFFFF";
	ctx.strokeRect(Math.floor(selectedX / 15) * 15 * 5, Math.floor(selectedY / 9) * 9 * 5, 76, 46);

	// show map
	document.getElementById("worldMapWrapper").style.visibility = "visible";
}

EmpireBoard.Handler.OnWorldMapHide = function (event) {
	document.getElementById("worldMapWrapper").style.visibility = "hidden";	
}

// Fix for camp to zoom to the right coordinates
EmpireBoard.Renders.Render_CampZoomFix = function() {
	var currentCastleId = EmpireBoard.Khanwars.CurrentCastleKoordId();
	var currentCastle = EmpireBoard.DB.CurrentCastles[currentCastleId];
	var para = window.location.search;
	if (currentCastle.IsCamp && para.indexOf("x=") == -1 && para.indexOf("y=") == -1) {
		Logger.Debug("Camp-Fix: " + currentCastle.X + ":" + currentCastle.Y);
		var scripts = EmpireBoard.DOM.Get_Nodes("//div[@id='content']/script");		
		var functionText = "stopMoving();setTimeout(function(){search_map(" + currentCastle.X + "," + currentCastle.Y + ");}, 5000);"
		scripts.snapshotItem(1).innerHTML = functionText;
		EmpireBoard.ContentEval(functionText);		
	}
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
	
	x = Math.floor((x - offsetX) / 5);
	y = Math.floor((y - offsetY) / 5);  
  
	document.getElementById("worldMapWrapper").style.visibility = "hidden";
	EmpireBoard.ContentEval("search_map(" + x + "," + y + ")");	
}

EmpireBoard.Handler.CheckOptionClicked = function(e) {
	this.value = (this.value == "1" ? "0" : "1");
	EmpireBoard.DB.Options[this.name] = (this.value == "1");
	EmpireBoard.DB.Save_Options();
};

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
	
	var now = new Date().getTime();
	var archiveItem = new MessageItem();
	
	archiveItem.Id = now;
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
	var now = new Date().getTime();
	var archiveItem = new MessageItem();
	
	archiveItem.Id = now;
	
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
	if (id == "now_map" || id == "new_map" || id == "old_map") {
		Logger.Debug("MapChanged: " + id + "\n" + e.relatedNode.innerHTML);
		EmpireBoard.Khanwars.FetchMap(id);
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

// -----------------------------------------------------------------------
// EmpireBoard starten
// -----------------------------------------------------------------------
EmpireBoard.Start();