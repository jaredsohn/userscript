// ==UserScript==
// @name           Earth Lost PowerAddon
// @namespace      elpoweraddon
// @include        *engine*.earthlost.de*
// ==/UserScript==


//   .------.
//  / Readme \
// +-------------------------------------------------+
// | Dieses Script bietet ein paar Erweiterungen     |
// | für das Browsergame "Earth Lost". Aufschluss    |
// | über die Features findet ihr in der             |
// | Konfiguration. Standardmäßig sind alle Features |
// | eingeschaltet.                                  |
// | Für Accountsperrungen (z.B. weil Werbung        |
// | geblockt wird) übernehmen wir keine Haftung.    |
// |                                                 |
// | Info: Zur Zeit ist es noch erforderlich nach    |
// | dem Login die kompeltte Seite (Aktualisieren    |
// | oder F5) neu zu laden.                          |
// |                                                 |
// | Version: 0.32                                   |
// |                                                 |
// +-------------------------------------------------+


//  .-------------.
// / Konfiguration \
// -----------------------------------------------

// Module (Aktivieren: true | Deaktivieren: false)

// - Blockers
   var configAdframe = true;	//Blockt die große Werbung
   var configVoten = true;	//Blockt die Aufforderung zu Voten
   var configHilfe = true;	//Blockt die Tutorial Zeile
   var configXtended = true;	//Blockt die Xtended Account Werbung
   var configOnline = true;	//Blockt die Anzahl der eingeloggten User
   var configCopyright = true;	//Blockt das Copyright
   var configRadio = true;	//Blockt das Radio Werbung

// - Features
   var configBannerclick = true;	//Banner wird geöffnet, aber Wartezeit übersprungen
   var configBannerclick2 = true;	//Banner wird versteckt geöffnet und Wartezeit übersprungen
   var configNachrichten = true;	//Nachrichten als gelesen markieren
   var configIntroreload = true;	//Neuladen der Übersicht (notwendig für korrekte Zeit im Titel)
   var configTitletime = true;		//Zeit zum nächsten Ereignis im Titel
   var configTitletimenew = false;	//Zeit zum nächsten Ereignis im Titel (BETA)
   var configAllyLink = true;		//Erweitert den Allianz Link im rechten Menü
   var configGesuch = true;		//leert die Gesuchfelder
   var configGesuch2 = true;		//Gesuch-Felder Quick-Links zum schnelleren ausfüllen
   var configGesuchLink = true;		//Erweitert den Gesuche Link im rechten Menü
   var configAngebot = true;		//Angeboteansicht nach Annahme
   var configAngebotLink = true;	//Erweitert den Angebote Link im rechten Menü

// - Variablen
   var reloadtime = 2000;		//Zeit bis zum Reload bei Ankündigungen (Standard: 2000)
   var reloadtimeBannerclick = 2000;	//Zeit bis zum Reload bei Bannerclick (Standard: 2000)
   var reloadtimeAngebot = 1000;	//Zeit bis zum Reload bei Angebot angenommen (Standard: 2000)
   var reloadtimeIntro = 60000;		//Zeit in welchen Abständen die Übersicht neu geladen wird (Standard: 60000)
   var reloadtimeGesuch = 500;		//Zeit bis Gesuch-Felder geleert werden (Standard: 1000)

// -----------------------------------------------

// +-------------------------------------+
// | unterhalb keine Änderung notwendig! |
// +-------------------------------------+

// +---------+
// | General |
// +---------+


// -Session ID

var splittedHtml = document.body.innerHTML.split("sid=");
var sid = splittedHtml[1].slice(0,32);

// addStyle

function addStyle(add)
{
    var headTag = document.getElementsByTagName("head");
    if (headTag.length > 0)
    {
        var create = document.createElement("style");
        create.type = "text/css";
        create.innerHTML = add;
        headTag[0].appendChild(create);
    }
}

// -Hiddenframes

if (document.location.href.match("navi.phtml")) {
document.body.innerHTML += "<iframe id='hiddeniframe' name='hiddeniframe' width='0' height='0' style='visibility: hidden;'></iframe>";

var introlocation = document.location.href.replace(/navi/g,"intro");

document.body.innerHTML += "<iframe id='hiddenintro' name='hiddenintro' width='0' height='0' style='visibility: hidden;' src='"+introlocation+"'></iframe>";
}

// +--------+
// | Module |
// +--------+

// -Titletime

if (configTitletime && document.location.href.match("intro.phtml") && parent.location.href.match("navi.phtml")) {
var nexttime = 0;

function getTime(gesamt)
  {
    if (gesamt <= 0) { return ''; }
    days = Math.floor(gesamt / 24 / 3600);
    hours = Math.floor(gesamt / 3600) % 24;
    minutes = Math.floor(gesamt / 60) % 60;
    seconds = Math.floor(gesamt % 60);
    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
 
    if (days > 0)
    {
      gstring = days + ' Tage ' + hours + ':' + minutes + ':' + seconds;
    } else {
      gstring = hours + ':' + minutes + ':' + seconds;
    }
    return gstring;
  }

function ZeitAnzeigen()
  {
  now = Math.floor(Date.parse(new Date())/1000);
  gesamt = nexttime-now;

  gstring = getTime(gesamt);
  if (gesamt > 0) { top.document.title = gstring+" - Earth Lost"; setTimeout(function () {ZeitAnzeigen()}, 1000); }
  else if (gesamt < -1) { top.document.title = "FERTIG - Earth Lost";}
  else { top.document.title = "FERTIG - Earth Lost"; }
  }

function nextEvent(time)
  {
	var time = parseFloat(time); 
	now = Math.floor(Date.parse(new Date())/1000);
  	nexttime = time+now;

	if (time > 0) {
      	setTimeout(function () {ZeitAnzeigen()}, 1);
    	}
  }

var splittedHtml = document.body.innerHTML.split("nextEvent(");
var splittedHtml2 = splittedHtml[1].split(")");
nextEvent(splittedHtml2[0]);
}

// -Titletimenew

if (configTitletimenew && document.location.href.match("main.phtml")) {
var nexttime = 0;

function getTime(gesamt)
  {
    if (gesamt <= 0) { return ''; }
    days = Math.floor(gesamt / 24 / 3600);
    hours = Math.floor(gesamt / 3600) % 24;
    minutes = Math.floor(gesamt / 60) % 60;
    seconds = Math.floor(gesamt % 60);
    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
 
    if (days > 0)
    {
      gstring = days + ' Tage ' + hours + ':' + minutes + ':' + seconds;
    } else {
      gstring = hours + ':' + minutes + ':' + seconds;
    }
    return gstring;
  }

function ZeitAnzeigen()
  {
	var nexttime = document.body.ntobject.value;
  now = Math.floor(Date.parse(new Date())/1000);
  gesamt = nexttime-now;

    gstring = getTime(gesamt);
    if (gesamt > 0) { top.document.title = gstring+" - Earth Lost"; setTimeout(function () {ZeitAnzeigen()}, 1000); }
    else if (gesamt < -1) { top.document.title = "FERTIG - Earth Lost";}
    else { top.document.title = "FERTIG - Earth Lost"; }
}
}

if (configTitletimenew && document.location.href.match("intro.phtml")) {
var nexttime = 0;

	function nextEvent(time)
  	{
		var time = parseFloat(time); 
		now = Math.floor(Date.parse(new Date())/1000);
  		nexttime = time+now;

		if (time > 0) {

	        var create = body.createElement("input");
        	create.type = "hidden";
		create.name = "ntobject";
		create.value = nexttime;
        	create.innerHTML = add;
        	top.body.appendChild(create);

	      	setTimeout(function () {top.ZeitAnzeigen()}, 1);
    		}

	}

var splittedHtml = document.body.innerHTML.split("nextEvent(");
var splittedHtml2 = splittedHtml[1].split(")");
nextEvent(splittedHtml2[0]);
}

// -Introreload

if (configIntroreload && document.location.href.match("intro.phtml")) {

function introReload() {
self.location.reload();
setTimeout(function () { introReload() },reloadtimeIntro);
}

setTimeout(function () { introReload() },reloadtimeIntro);
}

// -Adframe

if (configAdframe) {
addStyle("#adframe {visibility: hidden; height: 0;} #minimize {visibility: hidden; height: 0; innerHTML: '';} ");
}

// -Bannerclick

if (configBannerclick) {
if (document.location.href.match("forcedclick.phtml")) {
document.location.href = document.location.href + "&do=done";
}
}

// -Bannerclick2

if (configBannerclick2 && document.location.href.match("rohstoffe.phtml")) {
document.body.innerHTML = document.body.innerHTML.replace(/forcedclick.phtml?id/g, "forcedclick.phtml?do=done&id");
document.body.innerHTML = document.body.innerHTML.replace(/_blank/g, "hiddeniframe");
document.body.innerHTML = document.body.innerHTML.replace(/didit=1;/g, "didit=1; setTimeout(function () {self.location.reload()},"+reloadtimeBannerclick+");");
}

// -Gesuch

if (configGesuch && document.location.href.match("handel.phtml")) {
if (document.body.innerHTML.match("Ihr Gesuch wurde erstellt")) {

function gesuchClearfields() {
document.getElementsByName("eisen")[0].value="";
document.getElementsByName("titan")[0].value="";
document.getElementsByName("wasser")[0].value="";
document.getElementsByName("wasserstoff")[0].value="";
document.getElementsByName("nahrung")[0].value="";
}

setTimeout(function () { gesuchClearfields(); },reloadtimeGesuch);
}
}

// -Gesuch2

if (configGesuch2 && document.location.href.match("handel.phtml" && "create")) {

document.body.innerHTML = document.body.innerHTML.replace(/<td>Eisen/g, '<td>Eisen</td><td><a href="#" onclick="javascript: document.forms.angebot.eisen.value=10000;">10k</a> <a href="#" onclick="javascript: document.forms.angebot.eisen.value=5000;">5k</a> <a href="#" onclick="javascript: document.forms.angebot.eisen.value=0;">0k</a>');

document.body.innerHTML = document.body.innerHTML.replace(/<td>Titan/g, '<td>Titan</td><td><a href="#" onclick="javascript: document.forms.angebot.titan.value=10000;">10k</a> <a href="#" onclick="javascript: document.forms.angebot.titan.value=5000;">5k</a> <a href="#" onclick="javascript: document.forms.angebot.titan.value=0;">0k</a>');

document.body.innerHTML = document.body.innerHTML.replace(/<td>Wasser</g, '<td>Wasser</td><td><a href="#" onclick="javascript: document.forms.angebot.wasser.value=10000;">10k</a> <a href="#" onclick="javascript: document.forms.angebot.wasser.value=5000;">5k</a> <a href="#" onclick="javascript: document.forms.angebot.wasser.value=0;">0k</a><');

document.body.innerHTML = document.body.innerHTML.replace(/<td>Wasserstoff/g, '<td>Wasserstoff</td><td><a href="#" onclick="javascript: document.forms.angebot.wasserstoff.value=10000;">10k</a> <a href="#" onclick="javascript: document.forms.angebot.wasserstoff.value=5000;">5k</a> <a href="#" onclick="javascript: document.forms.angebot.wasserstoff.value=0;">0k</a>');

document.body.innerHTML = document.body.innerHTML.replace(/<td>Nahrung/g, '<td>Nahrung</td><td><a href="#" onclick="javascript: document.forms.angebot.nahrung.value=10000;">10k</a> <a href="#" onclick="javascript: document.forms.angebot.nahrung.value=5000;">5k</a> <a href="#" onclick="javascript: document.forms.angebot.nahrung.value=0;">0k</a>');
}

// -AllyLink

if (configAllyLink && document.location.href.match("ally.phtml")) {
document.body.innerHTML = document.body.innerHTML.replace(/Verwalten/, 'Verw</a> | <a href="allianz.phtml?do=verwalten_member&sid='+sid+'" target="main">Mitgl</a> | <a href="allianz.phtml?do=verwalten_planeten&sid='+sid+'" target="main">Plani');
}

// -GesuchLink

if (configGesuchLink && document.location.href.match("ally.phtml")) {
document.body.innerHTML = document.body.innerHTML.replace(/Gesuche/g, 'Gesuche</a> | <a href="handel.phtml?do=create&sid='+sid+'" target="main">Neu</a> | <a href="handel.phtml?show=all&sid='+sid+'" target="main">Anz');
}

// -Angebot

if (configAngebot && document.location.href.match("handel.phtml")) {
if (document.body.innerHTML.match("Sie haben das Angebot angenommen")) {
setTimeout(function () { document.location.href="handel.phtml?do=angebote&sid="+sid; }, reloadtimeAngebot);
}
}

// -AngebotLink

if (configAngebotLink && document.location.href.match("ally.phtml")) {
document.body.innerHTML = document.body.innerHTML.replace(/Angebote/g, 'Angebote</a> | <a href="handel.phtml?do=angebote&fusis=1&sid='+sid+'" target="main">Fusi</a> | <a href="handel.phtml?do=angebote&hsp=1&sid='+sid+'" target="main">HSP');
}

// -Nachrichten

if (configNachrichten && document.location.href.match("intro.phtml")) {

var msg0 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=0&all=0" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Private Nachrichten/g, msg0);

var msg1 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=1&all=1" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Bauereignisse/g, msg1);

var msg2 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=2&all=2" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Forschungsereignisse/g, msg2);

var msg3 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=3&all=3" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Flottenereignisse/g, msg3);

var msg4 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=4&all=4" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Spionageberichte/g, msg4);

var msg5 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=5&all=5" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Spezialereignisse/g, msg5);

var msg6 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=6&all=6" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Funkverkehr/g, msg6);

var msg7 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=7&all=7" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Diplomatie/g, msg7);

var msg8 = 'Private Nachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=8&all=8" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Allianznachrichten/g, msg8);

var msg9 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=9&all=9" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Handelsnachrichten/g, msg9);

var msg10 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=10&all=10" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Ankündigungen/g, msg10);

var msg11 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=11&all=11" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Postausgang/g, msg11);

var msg12 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=12&all=12" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Archiv/g, msg12);

var msg13 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=13&all=13" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/Langstreckenticker/g, msg13);

var msg14 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=14&all=14" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/SMS-Nachrichten/g, msg14);

var msg15 = 'Handelsnachrichten" border="0"></a><a href="messages.phtml?sid='+sid+'&view=15&all=15" target="hiddeniframe" onclick="javascript: setTimeout(function () {self.location.reload()},'+reloadtime+');">X<font color="#000000';
document.body.innerHTML = document.body.innerHTML.replace(/E-Mails/g, msg15);
}


// -Blockers
//  TRs

var trs = document.getElementsByTagName("tr");

for (i=0; i < trs.length; i++) {
if (trs[i].className == "normaltext") {
if (trs[i].innerHTML.match('Wenn Sie Hilfe') && configHilfe) {
  trs[i].innerHTML = '';
}
if (trs[i].innerHTML.match("Spielen Sie den Earth Lost Xtended Account") && configXtended) {
  trs[i].innerHTML = '';
}
if (trs[i].innerHTML.match('voten') && configVoten) {
  trs[i].innerHTML = '';
}
if (trs[i].innerHTML.match('radio') && configRadio) {
  trs[i].innerHTML = '';
}
}
}

//  DIVs

var divs = document.getElementsByTagName("div");

for (i=0; i < divs.length; i++) {
if (divs[i].className == "copyright" && configCopyright) {
  divs[i].innerHTML = '';
}
}

//  TDs

var tds = document.getElementsByTagName("td");

for (i=0; i < tds.length; i++) {
if (tds[i].className == "cost" && tds[i].innerHTML.match('Online') && configOnline) {
  tds[i].innerHTML = '';
}
}