// ==UserScript==
// @name           Questmeister
// @author         Bouvere
// @version        0.1f
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*gondal*.de/*
// @include        http://*artyria.com/*
// @include        http://*artyria.de/*
// @include        http://*last-emperor.de/*
// @include        http://*lastemperor.de/*
// @description    Dieses Skript ist in der Lage die Quests bei Gondal, Artyria und Last Emperor vollständig zu übernehmen, insofern gewünscht. Für eventuelle negative Folgen der Nutzung dieses Skripts übernehme ich keinerlei Verantwortung.
// ==/UserScript==

if (window.location.hostname.search(/w1.gondal/) >= 0) {
	var KlonNr = 0;
	var ImgNr = 38;
} else if (window.location.hostname.search(/artyria/) >= 0) {
	var KlonNr = 1;
	var ImgNr = 26;
} else if ((window.location.hostname.search(/last-emperor/) >= 0) || (window.location.hostname.search(/lastemperor/) >= 0)) {
	var KlonNr = 2;
	var ImgNr = 19;
} else if (window.location.hostname.search(/w2.gondal/) >= 0) {
	var KlonNr = 3;
	var ImgNr = 38;
} else if (window.location.hostname.search(/gondal-de/) >= 0) {
	var KlonNr = 4;
	var ImgNr = 38;
}

function LadeSeite(Pfad, Min, Max) {
	window.setTimeout('window.location.pathname = "' + Pfad + '"', GetRandom(Min,Max));
}

function GetRandom( min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
	return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}

unsafeWindow.QuestEinstellungenSpeichern = function(Schwierigkeit) {
	window.setTimeout(GM_setValue, 0, 'Aktiv' + KlonNr, true);
	window.setTimeout(GM_setValue, 0, 'Schwierigkeit'  + KlonNr, Schwierigkeit);
}

unsafeWindow.QuestDeaktivieren = function() {
	window.setTimeout(GM_setValue, 0, 'Aktiv' + KlonNr, false);
}

if (GM_getValue("Aktiv" + KlonNr, false) || (window.location.pathname == "/characters/index")) {
	if (window.location.pathname == "/characters/index") {
		var QuestEinstellungen = document.createElement("div");
		QuestEinstellungen.innerHTML = 'Wähle den Schwierigkeitsgrad der auszuführenden Quests: <select id="Schwierigkeit"><option>Leicht</option><option>Schwer</option></select> <input type="button" value="Aktivieren" onclick="javascript:QuestEinstellungenSpeichern(document.getElementById(\'Schwierigkeit\').selectedIndex);alert(\'Automatisierung Aktiviert\');"/><input type="button" value="Deaktivieren" onclick="javascript:QuestDeaktivieren();alert(\'Automatisierung deaktiviert\');"/>';
		document.getElementsByClassName("content-bg")[0].appendChild(QuestEinstellungen);
		document.getElementsByClassName("content-bg")[0].insertBefore(QuestEinstellungen, document.getElementById("achievements"));
		document.getElementById("Schwierigkeit").selectedIndex = GM_getValue('Schwierigkeit'  + KlonNr,0);		
	}
	if (window.location.pathname == "/quests/start")
		if (document.getElementById("button-annehmen").src.search(/annehmen2/) == -1)
			LadeSeite("quests/start/" + unsafeWindow.quests[GM_getValue("Schwierigkeit" + KlonNr,0)].questId,1000,2000)
		else {
			GM_setValue("Aktiv" + KlonNr,false);
			alert('Das Tageslimit wurde erreicht, die Automatisierung wurde automatisch beendet');
		}
	if (window.location.pathname.split("/")[2] == "fight")
		LadeSeite(document.getElementsByTagName("img")[ImgNr].getAttribute('onclick').toString().split("'")[1],1000,2000);
	if (window.location.pathname.split("/")[2] == "results")
		LadeSeite("/quests/endText",1000,2000);
	if (window.location.pathname == "/quests/endText")
		LadeSeite("/quests/start",1000,2000);
	if (window.location.pathname.split("/")[2] == "finish")
		LadeSeite("/quests/start",1000,2000);
	if (window.location.pathname == "/quests/wait")
		LadeSeite("/quests/start",unsafeWindow.fullLifeAfter*1000,unsafeWindow.fullLifeAfter*1000 + 2000);
		//GM_xmlhttpRequest({
		//	method: "POST",
		//	url:'http://' + location.host + "/services/index/gold",
		//	headers:{'Content-type':'application/x-www-form-urlencoded'},
		//	data:"data[Service][duration]=" + (Math.floor(RemTime/36) - 1)/100
		//});
}