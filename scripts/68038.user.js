// ==UserScript==
// @name           Khanwars V3 Mod
// @author         Metis
// @license        Public Domain
// @version        47
// @namespace      http://userscripts.zarenkriege.de
// @include        http*://*game*.khanwars.com/*
// @include        http*://*game*.zarenkriege.de/*
// @include        http*://*game*.utopiakingdoms.com/*
// @include        http*://*game*.guerrakhan.com/*
// @include        http*://*game*.lesseigneurs.fr*
// @include        http*://*game*.khanwars.com.pt*
// @include        http*://*game*.khanwars.es*
// @include        http*://*game*.khanwars.cl*
// @include        http*://*game*.deche.vn*
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
// Configured to "BR" for kidmais

// TODO-Items: 
//  - Bug in Updater fixen; doppelte Nachfrage verhindern (highest prio!)
//  - Garbage-Collecting: Camps und Burgen verschwinden nicht aus der Listen der Gebäude, Ressourcen, Einheiten (highest Prio)
//  - Code-Refactoring!!! (highest prio !!!!)
//  - Liste der Ressourcen
//    * Live-Aktualisierung der Ressourcen in der Tabelle (low prio)
//  - Liste der Burgen und ihrer Gebäude
//    * Anzeige der Gebäude aus der Bauschleife und ihrer Fertigstellung (high prio)
//    * Verlinkung der Gebäude auf die jeweilige Seite (normal prio)
//  - Liste der Burgen und ihrer Einheiten (normal prio)
//    * Darstellung der Einheiten in Produktion (low prio)
//    * Einheiten die unterwegs sind? (low prio)
//  - Support für ALLE Khanwars-Server (low prio)
//  - Internationalisierung / Übersetzungen (low prio)
//  - Anzeige der Dauer bis Bot-Schutz und Countdown anzeigen (normal prio)

// -----------------------------------------------------------------------
// Fix für Chrome, dort HTML5-LocalStorage benutzen.
// -----------------------------------------------------------------------
if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
}

// -----------------------------------------------------------------------
// Logger Initialisierungen 
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
// Updater Initialisierungen 
// -----------------------------------------------------------------------
if (!Updater) var Updater = {};

Updater = {
	_ScriptURL:			 '',
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
			headers:			{ Accept:"text/javascript; charset=UTF-8" , 'Cache-Control': 'no-cache'},
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
	
	if (typeof CallBackFct == 'function') {
		CallBackFct.call(this._Parent, availableVersion, response);
	}
};
	
// -----------------------------------------------------------------------
// Empire-Board Initialisierungen 
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

Castle = {
	Name       : 'unknown',
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
	guerrakhan:		 {},
	Handler:		 {},
	Language:		 {},
	StartTime:		 0,
	ServerTimeDiff:	 0,
	TimeToCaptcha:   -1,
	EndTime:		 0,
	LogEnabled:		 true,
	MainID:			 'KWEmpireBoard',
	
	// Skript-Meta-Daten
	ScriptName:		 'guerrakhan Empire Board',
	Version:		 47,
	HomePage:		 '',
	ScriptURL:		 '',
	UserScriptsID:	 89608
};
	
// Initialisierung des kompletten Objektes
EmpireBoard.Start = function() {
	this.StartTime = new Date().getTime();
	this.HomePage		 = 'http://userscripts.org/scripts/show/'+this.UserScriptsID;
	this.ScriptURL		 = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.user.js';
	
	// Log initialisieren
	Logger.Enabled = this.LogEnabled;
	Logger.Info('Start ...');	
	
	// DOM initialisieren 
	this.DOM.Init(this);
	
	// Str
	Str.Init();
	
	this.guerrakhan.Init(this);

	// DB initialisieren
	this.DB.Init(this);
	this.DB.Load_Options();		
	this.DB.Load_Temp();		
	
	Locale.Init(this.DB.Options["Locale"]);
	
	if (EmpireBoard.guerrakhan.IsCaptcha()) {
		// Abbruch wenn Botschutz & Co
		EmpireBoard.guerrakhan.AttachCaptchaClick();
		return;
	}
		
	EmpireBoard.guerrakhan.FetchServerTime();
	
	// Renders initialisieren
	this.Renders.Init(this);
	
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
	this.Renders.Render();
	
	// Ausführungszeit berechnen und ausgeben
	this.EndTime = new Date().getTime();
	Logger.Info('Ended after '+((EmpireBoard.EndTime - EmpireBoard.StartTime)/1000)+'s');	
};	

EmpireBoard.SendRequest = function (mode, url, string) {
	
	Logger.Debug('SendRequest:' + url);
	
	GM_xmlhttpRequest({
    	method: mode,
   		url: url,
    	headers: {
			'Content-type' : 'application/x-www-form-urlencoded',        	
        	'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    	},			
		onload: function(r) {
			EmpireBoard.ExtensionStatus(r);
		}
	});	
};

EmpireBoard.ExtensionStatus = function(r) {
	if (r.readyState == 4) {
	    if (r.status == 200) {
	    	EmpireBoard.Renders.MakeCastleList(r.responseText);
		} else {
	        alert("There was a problem with the request. Please try again! ("+r.status+")");
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
		Logger.Info('Not need check update today');
	}
};
	
EmpireBoard._CompareScriptUpdate = function(availableVersion) {
	Logger.Info('Available version: ' + availableVersion);
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
	Logger.Debug('FetchData...');
	
	// Abbruch, wenn Bot-Schutz & Co gezeigt werden, da dieser Seiteneffekte haben
	if (this.guerrakhan.IsCaptcha()) {	
		return false;
	}
	
	// Current cities
	this.guerrakhan.FetchCastles();
	
	// Buildings
	if (this.guerrakhan.IsBuildingList()) {
		this.guerrakhan.FetchBuildings();
	}
		
	// Ressourcen 
	this.guerrakhan.FetchResources();
	if (this.guerrakhan.IsOverview()) {	
		this.guerrakhan.FetchProduction();
	}
	
	// Einheiten 
	if (this.guerrakhan.IsPohod()) {
		this.guerrakhan.FetchArmy();
	}
	
	// Karte {
	if (!this.guerrakhan.IsUtopia() && this.guerrakhan.IsMap()) {
		this.guerrakhan.FetchMapImages();
	}
	
	EmpireBoard.DB.Save_Options();
};

// -----------------------------------------------------------------------
// EmpireBoard-DOM Initialisierungen 
// -----------------------------------------------------------------------
EmpireBoard.DOM = {
	_Parent: null
};

EmpireBoard.DOM.Init = function(parent) {
	Logger.Debug('EmpireBoard.DOM.Init');
	this._Parent = parent;
};

EmpireBoard.DOM.Create_Document = function(responseText) {
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');

	html.innerHTML = responseText;
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
	
EmpireBoard.DOM.Get_Last_Node = function(path, root) {
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1) {
		return value.snapshotItem(value.snapshotLength-1);
	}
	return null;
};
	
EmpireBoard.DOM.Get_First_Node_Value = function(path, defaultValue, root) {
	var value = this.Get_First_Node(path, root);
	if (value != null) {
		return value.value;
	}
	else {
		return defaultValue;
	}
};
	
EmpireBoard.DOM.Get_Last_Node_Value = function(path, defaultValue, root) {
	var value = this.Get_Last_Node(path, root);
	if (value != null) {
		return value.value;
	}
	else {
		return defaultValue;
	}
};
	
EmpireBoard.DOM.Get_First_Node_TextContent = function(path, defaultValue, root) {
	var value = this.Get_First_Node(path, root);
	if (value != null) {
		return value.textContent;
	}
	else {
		return defaultValue;
	}
};

EmpireBoard.DOM.Get_First_Node_Title = function(path, defaultValue, root) {
	var value = this.Get_First_Node(path, root);
	if ((value != null) && (value.title != '')) {
		return value.title;
	} 
	else {
		return defaultValue;
	}
};
	
EmpireBoard.DOM.Has_ClassName = function(oElm, strClassName) {
	var arrayClassNames = oElm.className.split(' ');
	var Found = false;
	var arrayClassNamesLength = arrayClassNames.length;
	for (var k = 0; k < arrayClassNamesLength; k++) {
		if (arrayClassNames[k] == strClassName) {
			Found = true;
			break;
		}
	}
	return Found;
};

// -----------------------------------------------------------------------
// String Operationen und Formatierungen
// -----------------------------------------------------------------------
if (!Str) var Str = {};

Str.Init = function () {
	this.CreateUnitIds();
	this.CreateUnitsPopulation();
	this.CreateBuildingLinks();
}

Str.Trim = function (zeichenkette) {
  // Erst führende, dann Abschließende Whitespaces entfernen
  // und das Ergebnis dieser Operationen zurückliefern
  return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
}

Str.ToTwoDigits = function (value) {
	var twoDigitStr = "00" + value;
	return twoDigitStr.substr(twoDigitStr.length-2);	
}

Str.FormatTime = function(time) {
	var hours = Math.floor(time);
	var minutes = Math.floor((time-hours) * 60);
	var seconds = Math.floor((((time-hours) * 60) - minutes) * 60);
	
	return Str.ToTwoDigits(hours) + ":" + Str.ToTwoDigits(minutes) + ":" + Str.ToTwoDigits(seconds);}

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

// -----------------------------------------------------------------------
// guerrakhan Initialisierung
// -----------------------------------------------------------------------
EmpireBoard.guerrakhan = {
	_Parent:				null,
	_Host:					null,
	_World:					null
};
	
EmpireBoard.guerrakhan.Init = function(parent) {
	Logger.Debug('EmpireBoard.guerrakhan.Init');
	this._Parent = parent;
};
	
EmpireBoard.guerrakhan.Host = function() {
	if (this._Host == null) {
		this._Host = '';		
		this._Host = document.location.host;
	}
		
	return this._Host;
};	

EmpireBoard.guerrakhan.World = function() {
	if (this._World == null) {
		this._World = '';
		this._World = document.title.match(/World \d+|Welt \d+|Map \d+/);
	}
	
	return this._World;
}

EmpireBoard.guerrakhan.IsUtopia = function() {
	return window.location.host.indexOf('utopiakingdoms') > 0;
}

EmpireBoard.guerrakhan.IsCaptcha  = function() {
	Logger.Debug('IsCaptcha');
	return window.location.href.indexOf('botcaptcha') > 0 || 
		   window.location.href.indexOf('terms.php') > 0 ||
		   window.location.href.indexOf('premium_urlaub.php') > 0 ||
		   window.location.href.indexOf('choose_race.php') > 0 ||
		   window.location.href.indexOf('nocastle.php') > 0;
};

EmpireBoard.guerrakhan.IsBuildingList = function() {
	Logger.Debug('IsBuildingList');
	return window.location.href.indexOf('buildings.php') > 0;
}

EmpireBoard.guerrakhan.IsOverview = function() {
	Logger.Debug('IsOverview');
	return window.location.href.indexOf('overview.php') > 0;
}

EmpireBoard.guerrakhan.IsMap = function() {
	Logger.Debug('IsMap');
	return window.location.href.indexOf('map.php') > 0;
}

EmpireBoard.guerrakhan.IsPohod = function() {
	Logger.Debug('IsPohod');
	return window.location.href.indexOf('pohod.php') > 0;
}

EmpireBoard.guerrakhan.CurrentCastleKoordId = function() {
	var currentCastle = "";
	
	if (this.IsUtopia()) {
		currentCastle = document.getElementById('changeCastle').childNodes[1].childNodes[1].innerHTML;
		currentCastle = currentCastle.replace(' (', '(');
	}
	else {
		currentCastle = Str.Trim (document.getElementById('changeCastle').childNodes[1].innerHTML);
	}
	
	return currentCastle.match(/\(\d+:\d+\)/);	
};

EmpireBoard.guerrakhan.FetchServerTime = function() {
	var serverTime = EmpireBoard.DOM.Get_Nodes("//div[@id='serverTime']//strong").snapshotItem(0).innerHTML;
	var serverHour = serverTime.substr(0, 2);
	var localHour = new Date().getHours();
	EmpireBoard.ServerTimeDiff = serverHour - localHour;	
	//alert(EmpireBoard.ServerTimeDiff);
}

EmpireBoard.guerrakhan.FetchCastles = function() {	
	Logger.Debug('FetchCastles');	
	
	var castleUrl = 'http://' + window.location.host + '/ajax_castles.php';	
	this._Parent.SendRequest ("POST", castleUrl, "");	
};

EmpireBoard.guerrakhan.FetchBuildings = function() {	
	Logger.Debug('FetchBuildings');
	
	var buildingsList = document.getElementById('buildingsList');
    var CurrentCastleKoordId = this.CurrentCastleKoordId();
	var currentCastle = this._Parent.DB.CurrentCastles[CurrentCastleKoordId];
	if (currentCastle.Buildings == undefined) {
		currentCastle.Buildings = {};
	}
	
	var j=0;
	for (var i = 1; i<buildingsList.childNodes.length; i=i+2) {
		currentCastle.Buildings[j] = buildingsList.childNodes[i].childNodes[1].childNodes[1].innerHTML;
		j++;
	}
	
	this.FetchBuildingQueue();
};

EmpireBoard.guerrakhan.FetchBuildingQueue = function() {	
	Logger.Debug('FetchBuildingQueue');
		
    var CurrentCastleKoordId = this.CurrentCastleKoordId();
	var currentCastle = this._Parent.DB.CurrentCastles[CurrentCastleKoordId];
	if (currentCastle.BuildingQueue == undefined) {
		currentCastle.BuildingQueue = {};		
	}
		
	currentCastle.BuildingQueue[0] = new BuildingQueueItem();
	currentCastle.BuildingQueue[1] = new BuildingQueueItem();
	currentCastle.BuildingQueue[2] = new BuildingQueueItem();
	
	if (!EmpireBoard.DOM.Has_Node("//div[@id='buildingsQueue']")) {
		return;
	}	
	
	// Building-Finishtime ermitteln
	var queueItems = EmpireBoard.DOM.Get_Nodes("//div[@id='buildingsQueue']//div[@class='info']");	
	for (var i = 0; i < queueItems.snapshotLength; i++) {
		var queueItem = queueItems.snapshotItem(i);
		var finishTime = parse(queueItem.childNodes[3].innerHTML);
		currentCastle.BuildingQueue[i].Finished = finishTime.getTime();
	}
	
	// Building-Ids auslesen
	var queueItems = EmpireBoard.DOM.Get_Nodes("//div[@id='buildingsQueue']//div[@class='thumbnail']//a");	
	for (var i = 0; i < queueItems.snapshotLength; i++) {	
		var queueItem = queueItems.snapshotItem(i);
		var buildingId = queueItem.innerHTML.match(/\d+.jpg/)[0].match(/\d+/);
		currentCastle.BuildingQueue[i].BuildingId = buildingId - 1;
	}	
};

function parse(dateString) {
	var year = dateString.substr(0, 4);
	var month = dateString.substr(5,2) - 1;
	var day = dateString.substr(8,2);
	var hour = dateString.substr(11,2);
	var minute = dateString.substr(14,2);
	var second = dateString.substr(17,2);
	
	var date = new Date(year, month, day, hour, minute, second);	
	return date;
}

EmpireBoard.guerrakhan.FetchResources = function() {	
	Logger.Debug('FetchResources');
	
    var CurrentCastleKoordId = this.CurrentCastleKoordId();	
	var currentCastle = this._Parent.DB.CurrentCastles[CurrentCastleKoordId];
	if (currentCastle == undefined) {
		currentCastle = {};
	}
	
	if (currentCastle.Resources == undefined) {
		currentCastle.Resources = new Resources();
	}
	
	currentCastle.Resources.Gold = this.GetResource('HaveGold');
	currentCastle.Resources.Iron = this.GetResource('HaveIron');
	currentCastle.Resources.Wood = this.GetResource('HaveWood');
	currentCastle.Resources.Food = this.GetResource('HaveFood');	
	currentCastle.PopulationUsed = this.GetResource('population_used');
	currentCastle.FetchDate = new Date().getTime();
	
	if (EmpireBoard.guerrakhan.IsUtopia()) {	
		var pop = this._Parent.DOM.Get_First_Node("//li[@class='population']", document).innerHTML;
		var maxPop = pop.match(/\/\d+/)[0];
		currentCastle.Population = maxPop.match(/\d+/);
	}
	else {
		currentCastle.Population = this._Parent.DOM.Get_First_Node("//span[@id='population_used_max']", document).innerHTML;
	}
};

EmpireBoard.guerrakhan.FetchProduction = function() {	
	Logger.Debug('FetchProduction');
	
    var CurrentCastleKoordId = this.CurrentCastleKoordId();	
	var currentCastle = this._Parent.DB.CurrentCastles[CurrentCastleKoordId];
	
	if (currentCastle == undefined) {
		currentCastle = {};
	}
	
	if (currentCastle.Resources == undefined) {
		currentCastle.Resources = new Resources();
	}
	
	currentCastle.Resources.GoldProd = this.GetResourceProduction('PerHour_1');
	currentCastle.Resources.IronProd = this.GetResourceProduction('PerHour_2');
	currentCastle.Resources.WoodProd = this.GetResourceProduction('PerHour_3');
	currentCastle.Resources.FoodProd = this.GetResourceProduction('PerHour_4');
	if (EmpireBoard.guerrakhan.IsUtopia()) {	
		currentCastle.Storage = this._Parent.DOM.Get_First_Node("//div[@class='storageLimit']" ,document).innerHTML;
	}
	else {
		currentCastle.Storage = this._Parent.DOM.Get_First_Node("//span[@id='barGoldMax']", document).innerHTML;
	}

	this.FetchBuildingQueue();			
};

EmpireBoard.guerrakhan.GetResource = function(id) {	
	Logger.Debug('EmpireBoard.guerrakhan.GetResource');	
	var resource = document.getElementById(id);
	return resource.innerHTML;
};

EmpireBoard.guerrakhan.GetResourceProduction = function(id) {	
	Logger.Debug('EmpireBoard.guerrakhan.GetResourceProduction');	
	var resource = document.getElementById(id).innerHTML;	
	return resource.match(/\d+/);
};

EmpireBoard.guerrakhan.FetchMapImages = function() {	
	Logger.Debug('FetchMapImages');
	this.MapImages = new Array();
	var i, j;
	
	for (j = 0; j<7; j++) {
		for (i = 0; i<4; i++) {
			this.MapImages[i*7+j] = new Image();
			this.MapImages[i*7+j].src = "map_gd.php?x=" + (i*60+(i==0?1:0)) + "&y=" + (j*36+(j==0?1:0)); 
		}
	}
};

EmpireBoard.guerrakhan.FetchArmy = function() {
	Logger.Debug('FetchArmy');
	
    var CurrentCastleKoordId = this.CurrentCastleKoordId();	
	var currentCastle = this._Parent.DB.CurrentCastles[CurrentCastleKoordId];
	if (currentCastle == undefined) {
		currentCastle = {};
	}
	
	if (currentCastle.Units == undefined) {
		currentCastle.Units = {};
	}
	
	for (var i = 1; i<18; i++) {
		currentCastle.Units[i]=0;
	}
	
	var unitRows = EmpireBoard.DOM.Get_Nodes("//table[@id='units_to_send']//tbody//tr");	
	for (var i = 0; i < unitRows.snapshotLength; i++) {
		var unitRow = unitRows.snapshotItem(i);
		var unitId = Str.UnitsId[unitRow.innerHTML.match(/units\[\d+\]/)[0].match(/\d+/)];
		var unitCount = unitRow.childNodes[3].innerHTML.match(/\d+/);
		//alert(unitId + ":" + unitCount);
		currentCastle.Units[unitId] = unitCount;
	}
	
	//alert (EmpireBoard.DB.Serialize(currentCastle.Units));
}

EmpireBoard.guerrakhan.GetRightBanner = function() {
	var rightBanner = document.getElementById('rightBanner');
	if (rightBanner == null) {
		rightBanner = document.createElement("div");
		rightBanner.setAttribute('id', 'rightBanner');
		
		document.getElementById("mainWrapper").insertBefore(rightBanner, document.getElementById("footer"));		
	}
	return rightBanner;
}

EmpireBoard.guerrakhan.GetCurrentCastle = function() {	
	var currentCastle = "";
	
	if (EmpireBoard.guerrakhan.IsUtopia()) {
		currentCastle = document.getElementById('changeCastle').childNodes[1].childNodes[1].innerHTML;
		currentCastle = currentCastle.replace(' (', '(');
	}
	else {
		currentCastle = Str.Trim (document.getElementById('changeCastle').childNodes[1].innerHTML);
	}
	
	return currentCastle;
}

EmpireBoard.guerrakhan.ExtractCastle = function (castleHTML) {	
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
		var loyreg = '';
		if (EmpireBoard.guerrakhan.IsUtopia()) {
			loyreg = castleHTML.match(/:\d+</)[0];
		}
		else {
			loyreg = castleHTML.match(/>\d+</)[0];
		}	
		currentCastle.Loyality = loyreg.match(/\d+/);	
	}
	
	EmpireBoard.DB.CurrentCastles[castleKoord] = currentCastle;
}

EmpireBoard.guerrakhan.IsCurrentCastleKoordId = function(castleId) {
	var currentCastle = EmpireBoard.guerrakhan.GetCurrentCastle();
	return currentCastle.indexOf(castleId) > 0;
}

EmpireBoard.guerrakhan.IsCurrentCastle = function(castleHTML) {
	var currentCastle = EmpireBoard.guerrakhan.GetCurrentCastle();
	return castleHTML.indexOf(currentCastle) > 0;
}

EmpireBoard.guerrakhan.CalcResource = function (res, resProd, storage, fetchDate) {
	Logger.Debug("EmpireBoard.guerrakhan.CalcResource");
	var now = new Date().getTime();		
	var calc = res + (now - fetchDate) / 1000 / 60 / 60 * resProd;
	
	if (calc > storage) {
		calc = storage;
	}	
	return Math.floor(calc);
};

EmpireBoard.guerrakhan.AttachCaptchaClick = function() {
	var captcha = EmpireBoard.DOM.Get_Nodes("//input[@type='image']");
	var img = captcha.snapshotItem(0);
	img.addEventListener("click", EmpireBoard.Handler.CaptchaClicked, false);
}

// -----------------------------------------------------------------------
// EmpireBoard-DB
// -----------------------------------------------------------------------
EmpireBoard.DB = {
	_Parent:			 null,
	Prefix:				 '',
	CurrentCastles:		 {},
	ExtracedCastleIds:	 {},
	Options:			 {}
};

EmpireBoard.DB.Init = function(parent, host) {
	Logger.Debug('EmpireBoard.DB.Init');
	
	this._Parent = parent;
	if (host == undefined) {
		// TODO: WTF?
		host = this._Parent.guerrakhan.Host();
	}
	
	// TODO: WTF?
	var prefix = host;
	prefix = prefix.replace('.guerrakhan.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
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
		Logger.Error("EmpireBoard.DB.UnSerialize: " + e);
	}
};

EmpireBoard.DB.GetVar = function(varname, vardefault) {
	var varId = EmpireBoard.guerrakhan.Host() + '/' + EmpireBoard.guerrakhan.World() + '/' + varname;
	var res = GM_getValue(varId);
	if (res == undefined) {
		return vardefault;
	}
	
	return res;
};

EmpireBoard.DB.Load = function() {
	Logger.Debug("EmpireBoard.DB.Load");
	config = this.UnSerialize(this.GetVar("CurrentCastles", ""));	
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	this.CurrentCastles = config;	
};	
	
EmpireBoard.DB.SetVar = function (varname, varvalue) {
	var varId = EmpireBoard.guerrakhan.Host() + '/' + EmpireBoard.guerrakhan.World() + '/' + varname;
	GM_setValue(varId, varvalue);
}

EmpireBoard.DB.Save = function() {
	this.SetVar("CurrentCastles", this.Serialize(this.CurrentCastles));
};

EmpireBoard.DB.Load_Options = function() {
	Logger.Debug("EmpireBoard.DB.Load_Options");
	this.Options = this.UnSerialize(GM_getValue("Option"));
	if (this.Options == undefined)						this.Options = {};
	if (this.Options["Table_Resources"] == undefined)	this.Options["Table_Resources"] = true;
	if (this.Options["Table_Buildings"] == undefined)	this.Options["Table_Buildings"] = true;
	if (this.Options["Table_Army"] == undefined)	 	this.Options["Table_Army"] = true;
	if (this.Options["AutoUpdate"] == undefined)	 	this.Options["AutoUpdate"] = true;
	if (this.Options["Locale"]== undefined)				this.Options["Locale"] = "de";
};

EmpireBoard.DB.Save_Options = function() {
	GM_setValue('Option', this.Serialize(this.Options));
};

EmpireBoard.DB.Load_Temp = function() {
	Logger.Debug("EmpireBoard.DB.Load_Temp");	
	
	EmpireBoard.TimeToCaptcha = this.UnSerialize(this.GetVar("TimeToCaptcha", 3600));	
};

EmpireBoard.DB.Save_Temp = function() {
	this.SetVar("TimeToCaptcha", this.Serialize(EmpireBoard.TimeToCaptcha));
};

// Alte Burgen löschen 
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

// Überprüft, ob die Burg beim Extrahieren der Daten in der Burgliste gefunden wurde.
EmpireBoard.DB.CastleInCastleList = function (castleId) {
	var found = EmpireBoard.DB.ExtracedCastleIds[castleId];
	if (found == true)
		return true;
	else
		return false;
};
	
// -----------------------------------------------------------------------
// Language Initialisierung
// -----------------------------------------------------------------------
if (!Locale) var Locale = {};

Locale.Init = function (langCode) {
	this.LangCode = langCode;
	this.Load_Texts();
	this.Languages = this.LoadLanguages();
	Logger.Info("using language: " + this.LangCode);
}

Locale.LoadLanguages = function() {
	var languages = {
		"de" : "Deutsch",
		"br" : "Deutsch",
		"en" : "English (not finished yet)"
	};
	
	return languages;
};
	
Locale.Load_Texts = function() {
	switch(this.LangCode) {
		case "de":
			this.Load_Texts_DE();
			break;
		default:
			this.Load_Texts_EN();
			break;
	}
};

Locale.Load_Texts_DE = function() {
	this.Text = {
		Option							: "Optionen",
		Opt_Table_Resources 			: "Ressourcen anzeigen",
		Opt_Table_Buildings 			: "Gebäude anzeigen",
		Opt_Table_Army 					: "Armee anzeigen",
		Opt_AutoUpdate					: "Neue Versionen automatisch installieren",
		Opt_Language					: "Sprache",
		New_Version						: "Neue Version",
		Available						: "verfügbar",
		KlickToInstall					: "Hier</a> klicken, um die neue Version zu installieren."
	};
}

Locale.Load_Texts_BR = function() {
	this.Text = {
		Option							: "opções",
		Opt_Table_Resources 			: "Recursos",
		Opt_Table_Buildings 			: "Construções",
		Opt_Table_Army 					: "Exército",
		Opt_AutoUpdate					: "Nova versão instalada automaticamente",
		Opt_Language					: "Idioma",
		New_Version						: "Nova versão",
		Available						: "disponível",
		KlickToInstall					: "Clique</a> para instalar a nova versão."
	};
}

Locale.Load_Texts_EN = function() {
	this.Text = {
		Option							: "Options",
		Opt_Table_Resources 			: "show resource table",
		Opt_Table_Buildings 			: "show building table",
		Opt_Table_Army 					: "show army table",
		Opt_AutoUpdate					: "automatically install new versions",
		Opt_Language					: "language",
		New_Version						: "new version",
		Available						: "available",
		KlickToInstall					: "Click</a> to install new version."
	};}
	
// -----------------------------------------------------------------------
// EmpireBoard-Renderer
// -----------------------------------------------------------------------
EmpireBoard.Renders = {
	_Parent:			 null
};

EmpireBoard.Renders.Init = function(parent) {
	Logger.Debug('EmpireBoard.Renders.Init');
	this._Parent = parent;
	this.Set_Styles();	
};

EmpireBoard.Renders.Set_Styles = function() {
	if (EmpireBoard.guerrakhan.IsUtopia()) {
		Logger.Debug('Using Utopia-Styles');
		this.Set_Utopia_Styles();
	}
	else {
		Logger.Debug('Using guerrakhan-Styles');
		this.Set_guerrakhan_Styles();
	}
};

EmpireBoard.Renders.Set_guerrakhan_Styles = function() {
	var default_style = "																													   \
		.EmpireBoardCastleList {                                                                                                               \
			width: 230px;                                                                                                                      \
			float: left;                                                                                                                       \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoardCastleList .leftMenu {                                                                                                     \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/subnav_bottom.png') 0 bottom no-repeat;                        \
			padding: 0 0 39px 0;                                                                                                               \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoardCastleList .leftMenu .wrapper {                                                                                            \
			padding: 20px 0 0 0;                                                                                                               \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/subnav_top.png') no-repeat;                                    \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoardCastleList .leftMenu h2 {                                                                                                  \
			height: 43px;                                                                                                                      \
			line-height: 43px;                                                                                                                 \
			text-align: center;                                                                                                                \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/subnav_title.png') no-repeat;                                  \
			padding: 13px 0 15px 0;                                                                                                            \
			color: #633e20;                                                                                                                    \
			font-size: 15px;                                                                                                                   \
			font-weight: bold;                                                                                                                 \
			text-shadow: 0px 1px 0px #ffe792;                                                                                                  \
			-moz-text-shadow: 0px 1px 0px #ffe792;                                                                                             \
			-webkit-text-shadow: 0px 1px 0px #ffe792;                                                                                          \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoardCastleList dd                                                                                                              \
		{                                                                                                                                      \
			border: 1px solid #ffd678;                                                                                                         \
			padding: 0 0 5px 0;                                                                                                                \
			margin: 0 0 5px 0;                                                                                                                 \
			background: #ffd499;                                                                                                               \
			border-radius: 8px; -moz-border-radius: 8px;                                                                                       \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoardCastleList dd.current                                                                                                      \
		{                                                                                                                                      \
			background: #B38254;                                                                                                               \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoardCastleList dd a                                                                                                            \
		{		                                                                                                                               \
			display: block;                                                                                                                    \
			cursor: pointer;                                                                                                                   \
			text-decoration: none;                                                                                                             \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/h_ico_castle_menu.png') -10px -5px no-repeat;                  \
			padding: 5px 5px 5px 45px;                                                                                                         \
			border-radius: 5px;                                                                                                                \
			-moz-border-radius: 5px;                                                                                                           \
			-webkit-border-radius: 5px;                                                                                                        \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoardCastleList dd a.capital {                                                                                                  \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/h_ico_castle_menu.png') -10px -125px no-repeat;                \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoardCastleList dd a.camp {                                                                                                     \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/map/camp.png')  no-repeat;                                     \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoardCastleList dd big                                                                                                          \
		{                                                                                                                                      \
			display: block;                                                                                                                    \
			font-size: 12px;                                                                                                                   \
			line-height: 11px;                                                                                                                 \
			font-weight: bold;                                                                                                                 \
			color: #000;                                                                                                                       \
			margin: 0 0 4px 0;                                                                                                                 \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoardCastleList dd small                                                                                                        \
		{                                                                                                                                      \
			display: block;                                                                                                                    \
			color: #000000;                                                                                                                    \
			font-size: 11px;                                                                                                                   \
			line-height: 11px;                                                                                                                 \
		}	                                                                                                                                   \
		                                                                                                                                       \
		.EmpireBoard                                                                                                                           \
		{                                                                                                                                      \
			width: 900px;                                                                                                                      \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/c_bknd.jpg') center center no-repeat;                          \
			border-radius: 8px;                                                                                                                \
			-moz-border-radius: 8px;                                                                                                           \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoard table                                                                                                                     \
		{                                                                                                                                      \
			padding: 3px;                                                                                                                      \
			width: 880px;                                                                                                                      \
			background: #ffd499;                                                                                                               \
			border-radius: 8px;                                                                                                                \
			-moz-border-radius: 8px;                                                                                                           \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard h2                                                                                                                        \
		{                                                                                                                                      \
			color: #fff;                                                                                                                       \
			font-size: 16px;                                                                                                                   \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/title_h2_back.png') right center no-repeat;                    \
			height: 38px;                                                                                                                      \
			line-height: 38px;                                                                                                                 \
			padding: 0 14px;                                                                                                                   \
			margin-Bottom: 10px;                                                                                                               \
			text-shadow:0px 2px 3px #000;                                                                                                      \
			border-radius: 8px;                                                                                                                \
			-moz-border-radius: 8px;                                                                                                           \
			-webkit-border-radius: 8px;                                                                                                        \
			box-shadow: 0 0 8px #000;                                                                                                          \
			-moz-box-shadow: 0 0 8px #000;                                                                                                     \
			-webkit-box-shadow: 0 0 8px #000;                                                                                                  \
			border:1px solid #000;                                                                                                             \
			border-top:1px solid #582801;                                                                                                      \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard table thead tr td                                                                                                         \
		{                                                                                                                                      \
			font-size: 9px;                                                                                                                    \
			text-transform: uppercase;                                                                                                         \
			background: #b38254;                                                                                                               \
			padding: 5px;                                                                                                                      \
			color: #000;                                                                                                                       \
			text-align: center;                                                                                                                \
			font-weight: bold;                                                                                                                 \
			border-radius: 3px;                                                                                                                \
			-moz-border-radius: 3px;                                                                                                           \
			-webkit-border-radius: 3px;                                                                                                        \
			max-width:25px;                                                                                                                   \
			overflow:hidden;                                                                                                                  \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard table tbody tr.current                                                                                                   \
		{                                                                                                                                     \
			background: #D0B45F;                                                                                                              \
		}                                                                                                                                     \
                                                                                                                                               \
		.EmpireBoard table tbody tr td                                                                                                         \
		{                                                                                                                                      \
			padding: 1px;                                                                                                                      \
			border-bottom: 1px solid #d0b45f;                                                                                                  \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard table tbody tr td a,                                                                                                      \
		.EmpireBoard table thead tr td a                                                                                                       \
		{                                                                                                                                      \
			color: #000;                                                                                                                       \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard table tbody tr td img                                                                                                     \
		{                                                                                                                                      \
			vertical-align: middle;		                                                                                                       \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoard table tbody tr td.number                                                                                                  \
		{                                                                                                                                      \
			border-bottom: 1px solid #9F9595;                                                                                                  \
			padding-left: 3px;                                                                                                                 \
			padding-right: 2px;                                                                                                                \
			color: 000;                                                                                                                        \
			text-align:right;                                                                                                                  \
			vertical-align: top;			                                                                                                   \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard table tbody tr p.number                                                                                                   \
		{                                                                                                                                      \
			padding-left: 3px;                                                                                                                 \
			padding-right: 2px;                                                                                                                \
			color: 000;                                                                                                                        \
			text-align:right;                                                                                                                  \
			vertical-align: top;			                                                                                                   \
		}		                                                                                                                               \
		                                                                                                                                       \
		.EmpireBoard table tbody tr td.Sum                                                                                                     \
		{                                                                                                                                      \
			border-bottom: 1px solid #9F9595;                                                                                                  \
			padding: 5px;                                                                                                                      \
			color: #000;                                                                                                                       \
			text-align:right;                                                                                                                  \
			font-weight: bold;                                                                                                                 \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard table tbody tr td a img                                                                                                   \
		{                                                                                                                                      \
			text-decoration:none;                                                                                                              \
			border: none;                                                                                                                      \
		}                                                                                                                                      \
		                                                                                                                                       \
		.EmpireBoard table.Percent                                                                                                             \
		{                                                                                                                                      \
			border-spacing: 0;                                                                                                                 \
			border-collapse: collapse;                                                                                                         \
			height: 4px;                                                                                                                       \
			width: 92%;                                                                                                                        \
			margin-left: 3px;                                                                                                                  \
			margin-right: 3px;                                                                                                                 \
			margin-top:2px;                                                                                                                    \
			margin-bottom:2px;                                                                                                                 \
		}                                                                                                                                      \
                                                                                                                                               \
		.EmpireBoard table.Percent td                                                                                                          \
		{                                                                                                                                      \
			color: black;                                                                                                                      \
			background-color: #a1a1a1;                                                                                                         \
			min-width: 0px;                                                                                                                    \
			height: 4px;                                                                                                                       \
			border: 1px solid black;                                                                                                           \
			padding: 0;			                                                                                                               \
		}		                                                                                                                               \
		                                                                                                                                       \
		.EmpireBoard table.Percent td.Normal                                                                                                   \
		{                                                                                                                                      \
			background-color: #73443E;                                                                                                         \
		}		                                                                                                                               \
		.EmpireBoard table.Percent td.Warning                                                                                                  \
		{                                                                                                                                      \
			background-color: #8F1D1A;                                                                                                         \
		}		                                                                                                                               \
		.EmpireBoard table.Percent td.AlmostFull                                                                                               \
		{                                                                                                                                      \
			background-color: #B42521;                                                                                                         \
		}		                                                                                                                               \
		.EmpireBoard table.Percent td.Full                                                                                                     \
		{                                                                                                                                      \
			background-color: #ff0000;                                                                                                         \
		}															                                                                           \
																																			   \
		.EmpireBoardBuildingQueue {																											\
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
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/map/gotomap.gif') no-repeat scroll 0 0 ;				\
			margin-left: 10px;							\
			padding: 5px;								\
			border: 1px solid #FFD499;                  \
			min-width: 40px;                            \
			border-radius: 3px;                         \
			-moz-border-radius: 3px;                    \
			-webkit-border-radius: 3px;                 \
		}												\
		";
	
	GM_addStyle(default_style);
};	

EmpireBoard.Renders.Set_Utopia_Styles = function() {
	var default_style = "																													  \
		.EmpireBoardCastleList {                                                                                                              \
			width: 210px;                                                                                                                     \
			float: left;                                                                                                                      \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoardCastleList h2 {                                                                                                           \
			height: 31px;                                                                                                                     \
			line-height: 31px;                                                                                                                \
			background: url('../../img_ut/utopia/title_small_bknd.gif') no-repeat;                                                            \
			padding: 0 0 0 10px;                                                                                                              \
			color: #dab694;                                                                                                                   \
			font-size: 12px;                                                                                                                  \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoardCastleList dd                                                                                                             \
		{                                                                                                                                     \
			border: 1px solid #aaaaaa;                                                                                                        \
			padding: 0 0 5px 0;                                                                                                               \
			margin: 0 0 5px 0;                                                                                                                \
			background: #696969;                                                                                                              \
			border-radius: 8px; -moz-border-radius: 8px;                                                                                      \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoardCastleList dd.current                                                                                                     \
		{                                                                                                                                     \
			background: #aaaaaa;                                                                                                              \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoardCastleList dd a                                                                                                           \
		{		                                                                                                                              \
			display: block;                                                                                                                   \
			cursor: pointer;                                                                                                                  \
			text-decoration: none;                                                                                                            \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/h_ico_castle_menu.png') -10px -5px no-repeat;                 \
			padding: 5px 5px 5px 45px;                                                                                                        \
			border-radius: 5px;                                                                                                               \
			-moz-border-radius: 5px;                                                                                                          \
			-webkit-border-radius: 5px;                                                                                                       \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoardCastleList dd a.capital {                                                                                                 \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/h_ico_castle_menu.png') -10px -125px no-repeat;               \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoardCastleList dd a.camp {                                                                                                    \
			background: url('http://33.xs-software.com/guerrakhan/game3.0/img/3.0/map/camp.png')  no-repeat;                                    \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoardCastleList dd big                                                                                                         \
		{                                                                                                                                     \
			display: block;                                                                                                                   \
			font-size: 12px;                                                                                                                  \
			line-height: 11px;                                                                                                                \
			font-weight: bold;                                                                                                                \
			color: #000;                                                                                                                      \
			margin: 0 0 4px 0;                                                                                                                \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoardCastleList dd small                                                                                                       \
		{                                                                                                                                     \
			display: block;                                                                                                                   \
			color: #000000;                                                                                                                   \
			font-size: 11px;                                                                                                                  \
			line-height: 11px;                                                                                                                \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoard {                                                                                                                        \
			width: 850px;                                                                                                                     \
			background: #696969 url('http://game2.utopiakingdoms.com/img_ut/utopia/box_bknd.jpg') right 0 no-repeat;                          \
			padding: 10px;                                                                                                                    \
			border-bottom: 4px solid #353535;                                                                                                 \
			color: #fff;                                                                                                                      \
			                                                                                                                                  \
			overflow: hidden;                                                                                                                 \
			border-radius: 8px;                                                                                                               \
			-moz-border-radius: 8px;                                                                                                          \
		}                                                                                                                                     \
		                                                                                                                                      \
                                                                                                                                              \
		.EmpireBoard table {                                                                                                                  \
			margin:10px;                                                                                                                      \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard h2                                                                                                                       \
		{                                                                                                                                     \
			color: #fff;                                                                                                                      \
			font-size: 16px;                                                                                                                  \
			background: url('http://game2.utopiakingdoms.com/img_ut/utopia/title_bknd.jpg') right center no-repeat;                           \
			height: 38px;                                                                                                                     \
			line-height: 38px;                                                                                                                \
			padding: 0 0 0 15px;                                                                                                              \
			text-shadow:0px 2px 3px #000;                                                                                                     \
			border-radius: 8px;                                                                                                               \
			-moz-border-radius: 8px;                                                                                                          \
			-webkit-border-radius: 8px;                                                                                                       \
			box-shadow: 0 0 8px #000;                                                                                                         \
			-moz-box-shadow: 0 0 8px #000;                                                                                                    \
			-webkit-box-shadow: 0 0 8px #000;                                                                                                 \
			border:1px solid #000;                                                                                                            \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table thead tr td                                                                                                        \
		{                                                                                                                                     \
			font-size: 9px;                                                                                                                   \
			text-transform: uppercase;                                                                                                        \
			background: #3F3B3B;                                                                                                              \
			padding: 5px 2px;                                                                                                                     \
			color: #fff;                                                                                                                      \
			text-align: center;                                                                                                               \
			font-weight: bold;                                                                                                                \
			border-radius: 3px;                                                                                                               \
			-moz-border-radius: 3px;                                                                                                          \
			-webkit-border-radius: 3px;                                                                                                       \
			max-width:35px;                                                                                                                   \
			overflow:hidden;                                                                                                                  \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table tbody tr.current                                                                                                   \
		{                                                                                                                                     \
			background: #515151;                                                                                                              \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table tbody tr td                                                                                                        \
		{                                                                                                                                     \
			border-bottom: 1px solid #9F9595;                                                                                                 \
			padding: 5px;                                                                                                                     \
			color: #fff;                                                                                                                      \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table tbody tr td.number                                                                                                 \
		{                                                                                                                                     \
			border-bottom: 1px solid #9F9595;                                                                                                 \
			padding-left: 3px;                                                                                                                \
			padding-right: 2px;                                                                                                               \
			color: #fff;                                                                                                                      \
			text-align:right;                                                                                                                 \
			vertical-align: top;			                                                                                                  \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table tbody tr p.number                                                                                                  \
		{                                                                                                                                     \
			padding-left: 3px;                                                                                                                \
			padding-right: 2px;                                                                                                               \
			color: #fff;                                                                                                                      \
			text-align:right;                                                                                                                 \
			vertical-align: top;			                                                                                                  \
		}		                                                                                                                              \
		                                                                                                                                      \
		.EmpireBoard table tbody tr td.Sum                                                                                                    \
		{                                                                                                                                     \
			border-bottom: 1px solid #9F9595;                                                                                                 \
			padding: 5px;                                                                                                                     \
			color: #fff;                                                                                                                      \
			text-align:right;                                                                                                                 \
			font-weight: bold;                                                                                                                \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoard table tbody tr td a,                                                                                                     \
		.EmpireBoard table thead tr td a                                                                                                      \
		{                                                                                                                                     \
			color: #fff;                                                                                                                      \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table tbody tr td img                                                                                                    \
		{                                                                                                                                     \
			vertical-align: middle;                                                                                                           \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table tbody tr td a img                                                                                                  \
		{                                                                                                                                     \
			text-decoration:none;                                                                                                             \
			border: none;                                                                                                                     \
		}                                                                                                                                     \
		                                                                                                                                      \
		.EmpireBoard table.Percent                                                                                                            \
		{                                                                                                                                     \
			border-spacing: 0;                                                                                                                \
			border-collapse: collapse;                                                                                                        \
			height: 4px;                                                                                                                      \
			width: 92%;                                                                                                                       \
			margin-left: 3px;                                                                                                                 \
			margin-right: 3px;                                                                                                                \
			margin-top:2px;                                                                                                                   \
			margin-bottom:2px;                                                                                                                \
		}                                                                                                                                     \
                                                                                                                                              \
		.EmpireBoard table.Percent td                                                                                                         \
		{                                                                                                                                     \
			background-color: #a1a1a1;                                                                                                        \
			min-width: 0px;                                                                                                                   \
			height: 4px;                                                                                                                      \
			border: 1px solid black;                                                                                                          \
			padding: 0;			                                                                                                              \
		}		                                                                                                                              \
		                                                                                                                                      \
		.EmpireBoard table.Percent td.Normal                                                                                                  \
		{                                                                                                                                     \
			background-color: #73443E;                                                                                                        \
		}		                                                                                                                              \
		.EmpireBoard table.Percent td.Warning                                                                                                 \
		{                                                                                                                                     \
			background-color: #8F1D1A;                                                                                                        \
		}		                                                                                                                              \
		.EmpireBoard table.Percent td.AlmostFull                                                                                              \
		{                                                                                                                                     \
			background-color: #B42521;                                                                                                        \
		}		                                                                                                                              \
		.EmpireBoard table.Percent td.Full                                                                                                    \
		{                                                                                                                                     \
			background-color: #ff0000;                                                                                                        \
		}		                                                                                                                              \
																																			   \
		.EmpireBoardBuildingQueue {																											\
			color: lightgreen;							\
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
			background: #3F3B3B;						\
			margin-left: 10px;							\
			padding: 5px;								\
			border: 1px solid #9F9595;                  \
			min-width: 40px;                            \
			border-radius: 3px;                         \
			-moz-border-radius: 3px;                    \
			-webkit-border-radius: 3px;                 \
		}												\
		";
	
	GM_addStyle(default_style);
};	

EmpireBoard.Renders.Render = function() {
	Logger.Debug('EmpireBoard.Renders.Render');

	var contentDiv = document.getElementById('pageBody');
	boardDiv = document.createElement("div");
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
	
	if (!EmpireBoard.guerrakhan.IsUtopia() && EmpireBoard.guerrakhan.IsMap()) {	
		this.Render_WorldMap();
	}	
	
	if (!EmpireBoard.guerrakhan.IsUtopia()) {
		this.Render_CaptchaButton();
	}
};

EmpireBoard.Renders.Render_CaptchaButton = function() {
	var mainMenu = EmpireBoard.DOM.Get_Nodes("//div[@class='topMenu left']//ul");	
	var ul = mainMenu.snapshotItem(0);
	var captchaButton = document.createElement("li");
	captchaButton.innerHTML = "<a href=\"/botcaptcha.php\">Botschutz in <span id=\"TimeToCaptcha\"> </span></a>";
	ul.appendChild(captchaButton);
	EmpireBoard.Handler.CaptchaTimerTick();
}

EmpireBoard.Renders.Render_Options = function(boardDiv) {
	Logger.Debug('EmpireBoard.Renders.Render_Options');
	
	var optionDiv = document.createElement("div");
	optionDiv.setAttribute("class", "EmpireBoardOptions");
	boardDiv.appendChild(optionDiv);
		
	var wrapper = document.createElement("div");
	wrapper.setAttribute("style", "padding: 10px;");
	optionDiv.appendChild(wrapper);
	
	var optionBox = document.createElement("div");
	optionBox.setAttribute("class", "box");	
	wrapper.appendChild(optionBox);
		
	var optionHeader = document.createElement("h2");
	optionHeader.innerHTML = Locale.Text.Option;
	optionBox.appendChild(optionHeader);
		
	var button = document.createElement("img");
	button.setAttribute("src", "http://33.xs-software.com/guerrakhan/game3.0/img/3.0/map/gotomap.gif");
	button.setAttribute("style", "vertical-align: middle; margin-left: 10px;");
	button.addEventListener("click", EmpireBoard.Handler.OptionButtonClicked, false);
	optionHeader.appendChild(button);
	
	var tableWrapper = document.createElement("div");
	tableWrapper.setAttribute("id", "EmpireBoardOptionTable");	
	tableWrapper.setAttribute("style", "visibility: hidden;");
	tableWrapper.style.height = "0px";
	optionBox.appendChild(tableWrapper);
	
	var optionTable = document.createElement("table");
	optionTable.appendChild(createOption("Table_Resources", Locale.Text.Opt_Table_Resources));
	optionTable.appendChild(createOption("Table_Buildings", Locale.Text.Opt_Table_Buildings));	
	optionTable.appendChild(createOption("Table_Army", Locale.Text.Opt_Table_Army));
	optionTable.appendChild(createOption("AutoUpdate", Locale.Text.Opt_AutoUpdate));
	if (EmpireBoard.DB.Options["HasNewVersion"]) {
		var tr = document.createElement("tr"); 
		var td = document.createElement("td");		
		tr.appendChild(td);	
		td.setAttribute("colSpan", "2");
		td.innerHTML = "<br/><p style=\"font-weight:bold; color: red;\">" + Locale.Text.New_Version + " " + EmpireBoard.DB.Options["AvailableVersion"] + " " + Locale.Text.Available + ". <a href=\"http://userscripts.org/scripts/source/" + EmpireBoard.UserScriptsID + ".user.js\" target=\"_blank\">" + Locale.Text.KlickToInstall;
		optionTable.appendChild(tr);
	}
	optionTable.appendChild(createLanguageOption());
	
	tableWrapper.appendChild(optionTable);
	
	var copyDiv = document.createElement("div");		
	copyDiv.innerHTML = "<p class=\"Footer\">Powered by <a href=\"http://userscripts.org/scripts/show/" + EmpireBoard.UserScriptsID + "\" target=\"_blank\"><b>" + EmpireBoard.ScriptName + "</b></a> <span dir=\"ltr\">(<span>v. <i>" + EmpireBoard.Version + "</i></span>)</span>";
	optionBox.appendChild(copyDiv);
}

function createLanguageOption() {
	var tr = document.createElement("tr");
	
	var tdOption = document.createElement("td");
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

function createOption(option, caption) {		
	var tr = document.createElement("tr");
	
	var tdOption = document.createElement("td");
	tdOption.setAttribute("style", "text-align: center;");
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
	
EmpireBoard.Renders.Render_Resource_List = function(boardDiv) {
	Logger.Debug('EmpireBoard.Renders.Render_Resource_List');
	
	tableDiv = document.createElement("div");
	tableDiv.setAttribute('class', 'EmpireBoardResources');
	var empireTable = "\
		<div style=\"padding:10px;\"> \
			<div class=\"box\"> \
				<h2>Übersicht Königreich - Ressourcen</h2>\
					<table border=\"0\" width=\"810px\" cellspacing=\"1\">\
						<thead>\
							<tr>	\
								<td>&nbsp;</td>\
								<td>Burg</td>\
								<td>Loyalität</td>\
								<td colspan=\"2\">Bevölkerung</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/guerrakhan/game3.0/img/3.0/res_ico_gold.gif\">Gold</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/guerrakhan/game3.0/img/3.0/res_ico_iron.gif\">Eisen</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/guerrakhan/game3.0/img/3.0/res_ico_wood.gif\">Holz</td>\
								<td colspan=\"2\"><img style=\"margin-right: 10px; vertical-align:middle;\" src=\"http://33.xs-software.com/guerrakhan/game3.0/img/3.0/res_ico_food.gif\">Farm</td>\
								<td>Lager</td>\
							</tr>\
						</thead>\
						<tbody>";	

	var sum =new Resources();
	
	for (var castleId in EmpireBoard.DB.CurrentCastles) {
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];
		var myClass="";
		if (EmpireBoard.guerrakhan.IsCurrentCastleKoordId(castleId)) {
			myClass = "current";
		}		
		empireTable += "<tr class='" + myClass + "'>";
		
		empireTable += "<td>";
		empireTable += "<a href='map.php?setx="+currentCastle.X+"&sety="+currentCastle.Y;
		empireTable += "'>";
		empireTable += "<img src='http://game2.utopiakingdoms.com/img/revolution/march_details.gif'>";		
		empireTable += "</a>";
		empireTable += "</td>";
		
		empireTable += "<td>";
		empireTable += "<a href='main.php?tpid="; 
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
		gold = EmpireBoard.guerrakhan.CalcResource(gold, goldProd, storage, fetchDate);
		
		sum.Gold += gold;
		empireTable += this.Render_Resource(gold, goldProd, storage, "Gold");
		
		sum.GoldProd += goldProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.GoldProd) +"</td>";

		var iron = parseInt(currentCastle.Resources.Iron);
		var ironProd = parseInt(currentCastle.Resources.IronProd);
		if (isNaN(iron)) iron=0;		
		if (isNaN(ironProd)) ironProd=0;
		iron = EmpireBoard.guerrakhan.CalcResource(iron, ironProd, storage, fetchDate);
		sum.Iron += iron;
		empireTable += this.Render_Resource(iron, ironProd, storage, "Eisen");
		
		sum.IronProd += ironProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.IronProd) +"</td>";
		
		var wood = parseInt(currentCastle.Resources.Wood);
		var woodProd = parseInt(currentCastle.Resources.WoodProd);
		if (isNaN(wood)) wood=0;		
		if (isNaN(woodProd)) woodProd=0;
		wood = EmpireBoard.guerrakhan.CalcResource(wood, woodProd, storage, fetchDate);
		sum.Wood += wood;
		empireTable += this.Render_Resource(wood, woodProd, storage, "Holz");
		
		sum.WoodProd += woodProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.WoodProd) +"</td>";

		var food = parseInt(currentCastle.Resources.Food);
		var foodProd = parseInt(currentCastle.Resources.FoodProd);
		if (isNaN(food)) food=0;		
		if (isNaN(foodProd)) foodProd=0;
		food = EmpireBoard.guerrakhan.CalcResource(food, foodProd, storage, fetchDate);
		sum.Food += food;
		empireTable += this.Render_Resource(food, foodProd, storage, "Nahrung");

		sum.FoodProd += foodProd;
		empireTable += "<td class='number'>+&nbsp;" + Str.ToDecimalGrouping(currentCastle.Resources.FoodProd) +"</td>";
		empireTable += "<td class='number'>" + Str.ToDecimalGrouping(storage) +"</td>";
		
		empireTable += "</tr>";		
	}
	
	empireTable += "<td colspan='2' class='Sum'>Summe:</td>";
	empireTable += "<td class='Sum'>&nbsp;</td>";
	empireTable += "<td colspan='2' class='Sum'>&nbsp;</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Gold) +"</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.GoldProd) +"</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Iron) +"</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.IronProd) +"</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Wood) +"</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.WoodProd) +"</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(sum.Food) +"</td>";
	empireTable += "<td class='Sum'>+&nbsp;" + Str.ToDecimalGrouping(sum.FoodProd) +"</td>";
	empireTable += "<td class='Sum'>&nbsp;</td>";
		
	empireTable += "</tbody></table></div></div>";
	tableDiv.innerHTML = empireTable;
	boardDiv.appendChild(tableDiv);
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
		if (EmpireBoard.guerrakhan.IsOverview() && EmpireBoard.guerrakhan.IsUtopia()) {
			// sehr seltsames Verhalten in der Burgübersicht mit den Tooltips.
			overviewFix = "";
		}
		var timeToFull = (storage - resValue) / resProd;
		var tooltip = "title=\"header=[" + title + "] body" + overviewFix + "[belegt " + resFull + "%<br />Voll in " + Str.FormatTime(timeToFull) + "]\"";		
		cellHTML += "<td><p class='number' " + tooltip +" >" + Str.ToDecimalGrouping(resValue) + "</p>";
		cellHTML += "<table class='Percent'><tbody><tr><td class='" + storageWarning + "' width='" + resFull + "%'></td>";
		cellHTML += "<td width=\"" + (100-resFull) + "\"></td></tr></tbody></table>";
	return cellHTML;
}

EmpireBoard.Renders.Render_Building_List = function(boardDiv) {
	Logger.Debug('EmpireBoard.Renders.Render_Building_List');

	tableDiv = document.createElement("div");
	tableDiv.setAttribute('class', 'EmpireBoardBuildings');
	var empireTable = "\
		<div style=\"padding:10px;\">\
			<div class=\"box\">\
				<h2>Übersicht Königreich - Gebäude</h2>\
					<table border=\"0\" width=\"810px\" cellspacing=\"1\">\
						<thead>\
							<tr>\
								<td>&nbsp;</td>\
								<td>Burg</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_1.jpg' style='vertical-align:middle' width='30px'><br/>Gold</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_2.jpg' style='vertical-align:middle' width='30px'><br/>Eisen</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_3.jpg' style='vertical-align:middle' width='30px'><br/>Holz</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_4.jpg' style='vertical-align:middle' width='30px'><br/>Farm</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_5.jpg' style='vertical-align:middle' width='30px'><br/>Häuser</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_6.jpg' style='vertical-align:middle' width='30px'><br/>Kaserne</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_7.jpg' style='vertical-align:middle' width='30px'><br/>Stall</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_8.jpg' style='vertical-align:middle' width='30px'><br/>Waffenschmiede</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_9.jpg' style='vertical-align:middle' width='30px'><br/>Markt</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_10.jpg' style='vertical-align:middle' width='30px'><br/>Schmiede</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_11.jpg' style='vertical-align:middle' width='30px'><br/>Lazarett</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_12.jpg' style='vertical-align:middle' width='30px'><br/>Mauer</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_13_race_2.jpg' style='vertical-align:middle' width='30px'><br/>AO</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_14.jpg' style='vertical-align:middle' width='30px'><br/>Versteck</td>\
								<td><img src='http://33.xs-software.com/guerrakhan/game3.0/img/buildings/tiny/building_15.jpg' style='vertical-align:middle' width='30px'><br/>Lager</td>\
							</tr>\
						</thead>\
						<tbody>";	

	for (var castleId in EmpireBoard.DB.CurrentCastles) {
		var myClass="";
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];
		if (EmpireBoard.guerrakhan.IsCurrentCastleKoordId(castleId)) {
			myClass = "current";
		}		
		empireTable += "<tr class='" + myClass + "'>";
		
		empireTable += "<td>";
		empireTable += "<a href='map.php?setx="+currentCastle.X+"&sety="+currentCastle.Y;
		empireTable += "'>";
		empireTable += "<img src='http://game2.utopiakingdoms.com/img/revolution/march_details.gif'>";		
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
			    empireTable += this.RenderBuildingQueue(currentCastle, buildingId, currentCastle.Buildings[buildingId]);
			}
			
			if (hasLink) {
				empireTable += "</a>";
			}
			
			empireTable += "</td>";
		}
		
		empireTable += "</tr>";
		//alert(EmpireBoard.DB.CurrentCastles[castleId].Name);	
	}
	
	empireTable += "</tbody></table></div></div>";	
	tableDiv.innerHTML = empireTable;
	boardDiv.appendChild(tableDiv);
};

EmpireBoard.Renders.RenderBuildingQueue = function(currentCastle, buildingId, finalLevel) {
	// Logger.Debug("RenderBuildingQueue " + buildingId + " " + finalLevel);
	
	if (currentCastle.BuildingQueue == undefined) {
		currentCastle.BuildingQueue = {};					
		currentCastle.BuildingQueue[0] = new BuildingQueueItem();
		currentCastle.BuildingQueue[1] = new BuildingQueueItem();
		currentCastle.BuildingQueue[2] = new BuildingQueueItem();
	}
	
		var overviewFix = "="; 
		if (EmpireBoard.guerrakhan.IsOverview() && EmpireBoard.guerrakhan.IsUtopia()) {
			// sehr seltsames Verhalten in der Burgübersicht mit den Tooltips.
			overviewFix = "";
		}
	
	var buildingQueue = "";
	var now = new Date().getTime() + EmpireBoard.ServerTimeDiff * 60 * 60 * 1000;
	var currentLevel = finalLevel;
	for (var i = 2; i > -1; i--) {		
		if (currentCastle.BuildingQueue[i].BuildingId == buildingId) {
			currentLevel --;
			var finishDate = new Date(currentCastle.BuildingQueue[i].Finished).toLocaleString();			
			var tooltip = "title=\"header=[Ausbau] body" + overviewFix + "[Fertig am:<br />" + finishDate + "]\"";
			var isFinished = "";
			if (now > currentCastle.BuildingQueue[i].Finished) {
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
	
	//alert(buildingQueue);
	return buildingQueue;
}

EmpireBoard.Renders.Render_Unit_List = function(boardDiv) {
	Logger.Debug('EmpireBoard.Renders.Render_Unit_List');
	
	tableDiv = document.createElement("div");
	tableDiv.setAttribute('class', 'EmpireBoardUnits');
	var empireTable = "\
		<div style=\"padding:10px;\"> \
			<div class=\"box\"> \
				<h2>Übersicht Königreich - Einheiten</h2>\
					<table border=\"0\" width=\"810px\" cellspacing=\"1\">\
						<thead>\
							<tr>	\
								<td>Muralha</td>\
								<td>Cerco</td>\
								<td>Lanceiro</td>\
								<td>Espadachim</td>\
								<td>Guerreiro</td>\
								<td>Batedor</td>\
								<td>Gladiador</td>\
								<td>Cavalaria Leve</td>\
								<td>Cavalaria Pesada</td>\
								<td>Ariete</td>\
								<td>Balista</td>\
								<td>Catapulta</td>\
								<td>Trabuco</td>\
								<td>Arqueiro Curto</td>\
								<td>Arqueiro Longo</td>\
								<td>Besteiro</td>\
								<td>Cavalaria Arqueira</td>\
								<td>Unidade Especial</td>\
								<td>Adeliger</td>\
							</tr>\
						</thead>\
						<tbody>";	

	var sum ={};
	var popSum = 0;
	for (var i = 1; i<18; i++) {
		sum[i]=0;
	}
		
	for (var castleId in EmpireBoard.DB.CurrentCastles) {
		var currentCastle = EmpireBoard.DB.CurrentCastles[castleId];
		var myClass="";
		if (EmpireBoard.guerrakhan.IsCurrentCastleKoordId(castleId)) {
			myClass = "current";
		}		
		empireTable += "<tr class='" + myClass + "'>";
				
		empireTable += "<td>";
		empireTable += "<a href='main.php?tpid="; 
		empireTable += currentCastle.Id;		
		empireTable += "&location=pohod.php'>";
		empireTable += currentCastle.Name;		
		empireTable += "</a>";
	
		empireTable += "</td>";

		if (currentCastle.Units == undefined) {
			currentCastle.Units = {};
		}
		var unit;
		
		var population = getPopulation(currentCastle);
		popSum += population;
		empireTable += "<td class=\"number\">" + Str.ToDecimalGrouping(population) + "</td>";
		
		for (var i = 1; i<18; i++) {
			unit = GetUnitCount(currentCastle, i);
			sum[i] += unit;
			empireTable += "<td class=\"number\">" + Str.ToDecimalGrouping(unit) + "</td>";
		}
						
		empireTable += "</tr>";		
	}
	
	empireTable += "<tr>";
	empireTable += "<td class='Sum'>Summe:</td>";
	empireTable += "<td class='Sum'>" + Str.ToDecimalGrouping(popSum) + "</td>";
	for (var i = 1; i<18; i++) {
		empireTable += "<td class=\"Sum\">" + Str.ToDecimalGrouping(sum[i]) + "</td>";
	}	
	empireTable += "</tr>";
		
	empireTable += "</tbody></table></div></div>";
	tableDiv.innerHTML = empireTable;
	boardDiv.appendChild(tableDiv);
};
	
function getPopulation(currentCastle) {
	var popSum = 0;
	for (var i = 1; i<18; i++) {
		var pop = Str.UnitsPop[i];
		var count = GetUnitCount(currentCastle, i);
		popSum += pop * count;
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

EmpireBoard.Renders.MakeCastleList = function (responseText) {		
	// Hack, alle Burgen  als jeweils ein Zeile umwandeln.
	responseText = responseText.replace(/<\/dd>/g, "</dd>\n");
	var formattedCastleList = "";
	// einzelnes Castle ermitteln
	var castles = responseText.match(/<dd.*<\/dd>/g);
	
	if (castles) {
		Logger.Info(castles.length + " castles found.");
		for (var i = 0; i < castles.length; ++i) {	
			EmpireBoard.guerrakhan.ExtractCastle(castles[i]);
			formattedCastleList +=  this.FormatCastleInCastleList(castles[i]);
		}
	}
	EmpireBoard.DB.GarbageCollect();
	EmpireBoard.DB.Save();
	
	var rightNav = EmpireBoard.guerrakhan.GetRightBanner();	
        
	var castleNav = document.createElement("div");
	castleNav.setAttribute('class', 'EmpireBoardCastleList');
	
	var myLeftMenu = document.createElement("div");
	myLeftMenu.setAttribute('class', 'leftMenu');

	var myWrapper = document.createElement("div");
	myWrapper.setAttribute('class', 'wrapper');

	var myCastles = document.createElement("dl");
	myCastles.setAttribute('id', 'castlesList');
	myCastles.innerHTML = formattedCastleList;
	
	var myH2 = document.createElement("h2");
	var myText = document.createTextNode("Burgen");
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
}
	
EmpireBoard.Renders.FormatCastleInCastleList = function (castleHTML) {	
	var currentCastle = EmpireBoard.guerrakhan.IsCurrentCastle(castleHTML);	
	
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
	EmpireBoard.guerrakhan.GetRightBanner().appendChild(miniMap);
	miniMap.setAttribute("style", "left:0px; top: -240px");
	
	// Button in MapMenu einfügen
	var mapmenu = EmpireBoard.DOM.Get_First_Node("//ul[@class='topMenu']");
	var Ned_showBigMapButton = document.createElement('li');
	Ned_showBigMapButton.innerHTML = "<a href=\"#\">World</a>";
	Ned_showBigMapButton.addEventListener('click', EmpireBoard.Handler.OnWorldMapShow, true);
    mapmenu.appendChild(Ned_showBigMapButton);
			
	// Wrapper für die Welt-Karte
	var globalMapWrapper = document.createElement("div");
	globalMapWrapper.id  = "worldMapWrapper";
	globalMapWrapper.setAttribute("style", "visibility:hidden;");
	
	// Overlay für Transparent-Effekt
	var overlay = document.createElement("div");
	overlay.setAttribute("style", "background-color: rgb(0, 0, 0); opacity: 0.8; width: 1920px; height: 1500px;z-index:1998;left:0;top:0px;position:absolute;");	
	globalMapWrapper.appendChild (overlay);
	
	// Menu auf der Welt-Karte
	var closeButton = document.createElement("ul");
	closeButton.innerHTML="<li style=\"float:right;\"><a href='#'>Schließen</a></li>";
	closeButton.addEventListener("click", EmpireBoard.Handler.OnWorldMapHide, true);
	closeButton.setAttribute("class", "topMenu");
	closeButton.setAttribute("style", "z-index:2000;left:155px;top:20px;position:absolute;");	
	globalMapWrapper.appendChild(closeButton);
	
	// Border für die Karte
	var mapBorder = document.createElement("img");
	mapBorder.setAttribute("src", "http://33.xs-software.com/guerrakhan/game3.0/img/3.0/map/map_border.png");
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
}

EmpireBoard.Handler.OnWorldMapShow = function (event) {
	var i,j;  
	var mapArea = document.getElementById("worldMapCanvas");
	var ctx = mapArea.getContext('2d');
  
	ctx.fillStyle = "#005000";
	ctx.fillRect (0, 0, 1000, 1000);
	var img = EmpireBoard.guerrakhan.MapImages;
	
	for (j = 0; j<7; j++) {
		for (i = 0; i<4; i++) {
			if (img[i*7+j].complete) ctx.drawImage(img[i*7+j], i*301, j*181);
		}	
	}
	
    var selectedX = unsafeWindow._xMap, selectedY = unsafeWindow._yMap; 
	
	ctx.lineWidth   = 2;
	ctx.strokeStyle = '#fff';
	ctx.strokeRect(Math.floor(selectedX/15)*15*5,Math.floor(selectedY/9)*9*5,77,47);

	// Map anzeigen
	document.getElementById("worldMapWrapper").style.visibility="visible";
}

EmpireBoard.Handler.OnWorldMapHide = function (event) {
	document.getElementById("worldMapWrapper").style.visibility="hidden";	
}

EmpireBoard.Handler.OnWorldMapClicked = function (e) {
	var x,y;

	if (!e) var e = window.event;
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
	
	x = Math.floor((x-offsetX)/5);
	y = Math.floor((y-offsetY)/5);  
  
	document.getElementById("worldMapWrapper").style.visibility="hidden";
	unsafeWindow.search_map(x,y);
}

EmpireBoard.Handler.CheckOptionClicked = function(e) {
	this.value = (this.value == '1' ? '0' : '1');
	EmpireBoard.DB.Options[this.name] = (this.value == '1');
	EmpireBoard.DB.Save_Options();
};

EmpireBoard.Handler.LanguageChanged = function(e) {
	EmpireBoard.DB.Options[this.name] = (this.value);
	EmpireBoard.DB.Save_Options();
};

EmpireBoard.Handler.OptionButtonClicked = function(e) {
	var table = document.getElementById("EmpireBoardOptionTable");
	if (table.style.visibility == "hidden") {
		table.style.visibility = "visible";
		table.style.height = "100%";
	}
	else {
		table.style.visibility = "hidden";
		table.style.height = "0px";
	}	
};

EmpireBoard.Handler.CaptchaTimerTick = function(e) {
	EmpireBoard.TimeToCaptcha -= 1;	
	EmpireBoard.DB.Save_Temp();
	var minute = Math.floor(EmpireBoard.TimeToCaptcha / 60);
	var second = EmpireBoard.TimeToCaptcha - 60 * minute;
	//alert(EmpireBoard.TimeToCaptcha);
	if (EmpireBoard.TimeToCaptcha > 1) {
		var span = document.getElementById("TimeToCaptcha");
		span.innerHTML = Str.ToTwoDigits(minute) + ":" + Str.ToTwoDigits(second);
		if (EmpireBoard.TimeToCaptcha > 1200) {
		}
		else if (EmpireBoard.TimeToCaptcha > 600) {
			span.parentNode.style.background = "yellow";
			span.parentNode.style.color = "black";
		} 
		else {
			span.parentNode.style.background = "red";
		}
		setTimeout(function(){EmpireBoard.Handler.CaptchaTimerTick()}, 1000);
	}	
}

EmpireBoard.Handler.CaptchaClicked = function(e) {
	EmpireBoard.TimeToCaptcha = 3600;
	EmpireBoard.DB.Save_Temp();
}

// -----------------------------------------------------------------------
// EmpireBoard starten
// -----------------------------------------------------------------------
EmpireBoard.Start();