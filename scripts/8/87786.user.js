// ==UserScript==
// @name         Fightinfo
// @namespace    http://userscripts.org/scripts/show/75242
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Stellt zahlreiche kleine und große Hilfen rund um das Thema Kämpfen zur Verfügung (HH, B, M, Paris, Marseille, Warschau, Krakau)
// @include      http://*.pennergame.de/fight/
// @include      http://*.pennergame.de/fight/#*
// @include      http://*.pennergame.de/fight/fightlog/*
// @include      http://*.pennergame.de/fight/overview/*
// @include      http://*.pennergame.de/fight/?status*
// @include      http://*.pennergame.de/profil/*
// @include      http://*.pennerzone.de/highscore/?page=*
// @include      http://*.pennerzone.de/highscore/uh*
// @include      http://*.bumrise.com/fight/
// @include      http://*.bumrise.com/fight/#*
// @include      http://*.bumrise.com/fight/fightlog/*
// @include      http://*.bumrise.com/fight/overview/*
// @include      http://*.bumrise.com/fight/?status*
// @include      http://*.bumrise.com/profil/*
// @include      http://*.menelgame.pl/fight/
// @include      http://*.menelgame.pl/fight/#*
// @include      http://*.menelgame.pl/fight/fightlog/*
// @include      http://*.menelgame.pl/fight/overview/*
// @include      http://*.menelgame.pl/fight/?status*
// @include      http://*.menelgame.pl/profil/*
// @include      http://*.clodogame.fr/fight/
// @include      http://*.clodogame.fr/fight/#*
// @include      http://*.clodogame.fr/fight/fightlog/*
// @include      http://*.clodogame.fr/fight/overview/*
// @include      http://*.clodogame.fr/fight/?status*
// @include      http://*.clodogame.fr/profil/*
// @include      http://*.mendigogame.es/fight/
// @include      http://*.mendigogame.es/fight/#*
// @include      http://*.mendigogame.es/fight/fightlog/*
// @include      http://*.mendigogame.es/fight/overview/*
// @include      http://*.mendigogame.es/fight/?status*
// @include      http://*.mendigogame.es/profil/*
// @include      http://*.faveladogame.com.br/fight/
// @include      http://*.faveladogame.com.br/fight/#*
// @include      http://*.faveladogame.com.br/fight/fightlog/*
// @include      http://*.faveladogame.com.br/fight/overview/*
// @include      http://*.faveladogame.com.br/fight/?status*
// @include      http://*.faveladogame.com.br/profil/*
// @version      1.3.25 Erweiterungen für Halloween hinzugefügt
// @version      1.3.24 Angriffs-Icon auf Bandenprofil nur, wenn nicht ein anderes Skript bereits Spalten einfügt
// @version      1.3.23 Posten der Kampfwerte auch aus Kampfübersichten möglich
// @version      1.3.22 Verliererliste repariert; beim Posten von beendeten Kämpfen können die Kampfwerte mit gepostet werden
// @version      1.3.21 Angriffs-Icon aus Cheaterliste wieder entfernt, da es bereits rechts drin ist
// @version      1.3.20 Angriffs-Icon in den Listen hinzugefügt
// @version      1.3.19 nochmal Korrektur für Malle: Kampfliste unvollständig, wenn nicht in Bande
// @version      1.3.18 Cheaterliste für Malle hinzugefügt
// @version      1.3.17 Probleme beim Posten in SB ohne Bande behoben; Fehler bei Kampfstatistik behoben
// @version      1.3.16 Fehler beim Posten aus dem Fightlog in die SB behoben
// @version      1.3.15 Fehler beim Posten der eintreffenden Kämpfe in die SB behoben
// @version      1.3.14 Posten in die SB in NY korrigiert; Ankreuzspalte nach links verschoben; kleinere Korrekturen
// @version      1.3.13 Anpassungen für Malle
// @version      1.3.12 nochmals Änderung wegen pennerzone
// @version      1.3.11 Problem mit Skriptversion behoben
// @version      1.3.10 Skript an Änderungen bei pennerzone angepasst; Kommentar eingebbar beim Posten von Kämpfen in die SB
// @version      1.3.9 noch einen kleinen Fehler behoben: Fightlog-Suchseite funktionierte nicht mehr
// @version      1.3.8 noch einen kleinen Fehler behoben: Infos bei eintreffenden Kämpfen
// @version      1.3.7 kleine Fehler behoben; Skript für Madrid und Rio de Janeiro angepasst; Post in SB nur, wenn in Bande
// @version      1.3.6 Skript für New York, Paris, Marseille, Warschau und Krakau angepasst
// @version      1.3.5 zusätzliche Icons und Infos im Bandenprofil
// @version      1.3.4 kleiner Fehler: auf der Profilseite fehlten die zus2xuätzlichen Icons; ACHTUNG !!! namespace geändert. Das Skript wird ein zweites Mal installiert! Die alte Version bitte löschen !!
// @version      1.3.3 kleinere Fehler behoben, Kampfstatistik getuned, ausgewichene Kämpfe in Kampfstatistik aufgeteilt; neue Option "nur Verlierer anzeigen" im Fightlog (sortierte Liste mit möglichen Gegnern)
// @version      1.3.2 Bisher wurden bei der Kampfstatistik nur die letzten 20 Kämpfe berücksichtigt. Jetzt werden alle noch zur Verfügung stehenden ausgewertet.
// @version      1.3.1 Cheaterliste wieder zum Laufen gebracht
// @version      1.2.8 Fehler Darstellung Cheaterliste korrigiert; Cheaterliste MU eingebaut
// @version      1.2.7 Fehler Darstellung pennerzone.de in HH korrigiert
// @version      1.2.6 Fehler SB-Posten korrigiert
// @version      1.2.5 Anpassungen für München
// @version      1.2.4 tinypic.com scheint ein Problem zu haben, Grafikhoster gewechselt; Handling von Userprofilen, die über Username statt ID aufgerufen werden, aktiviert
// @version      1.2.3 Fehler aufgrund der neuen Google-Ads behoben; einige kleinere Fehler behoben (Posten von Kämpfen von der Suchseite mit Kommentaren nicht möglich; falsches Handling bei einkommenden Angreifern ohne Bande)
// @version      1.2.2 Verbesserte Anzeige der Cheatertabelle bei langen Namen; verbesserte Fehlerbehandlung; Anzeige von Anzahl Sieg/Unentscheiden/Niederlagen/Ausgweichen im Tooltip; Aktualisierungsabfrage alle 2 Stunden
// @version      1.2.1 (Optionale) Anzeige der downfight.de-Cheaterliste! Eigenes Hinweis-Icon, wenn man schon gegen Gegner gekämpft hat; vorkonfigurierte Suchmöglichkeiten für Pennerzone; 36-Stunden-Anzeige jetzt in 99,9% der Fälle korrekt (bis auf KK-Ausweichen)
// @version      1.2.0 Fix falscher Tausenderpunkt; farbliche Markierung Angreifbarkeit (36 Stunden + Punktzahl); Layout SB-Einträge netter; mehrere Kämpfe knnen gleichzeitig gepostet werden; Fightinfo auf Profilen und auf pennerzone.de; Warnmarkierung
// @version      1.1.2 Posten von einkommenden Kämpfen in die SB; Layout straffer
// @version      1.1.1 Posten des aktuell ausgehenden Kampfs in die SB; Dateigrößen Icons kleiner --> schnelleres Laden; Posten Kampf: Bande wird zusätzlich angegeben
// @version      1.1.0 Möglichkeit, zu jedem Kampf einen Kommentar zu speichern; Kampf-Posten in die SB; Abruf mehrerer Seiten im Fightlog
// @version      1.0.1 Anpassung Suchstring pennerzone + besserer Updatemechanismus
// @version      1.0.0
// ==/UserScript==

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = "1.3.25";
var THISSCRIPTNAME = "Fightinfo";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/75242';           // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/75242.user.js';  // Skript-URL bei userscripts.org

// Basis-URL für Kampficons
var FIGHTICONS_URL = "http://static.pennergame.de/img/pv4/dots/"

var DOWNFIGHTDE_CHEATERPAGE_URL = "http://www.downfight.de/?seite=listebetrueger";

// URLs Warn-Icon
var ICON_WARNING = 'warning.gif';

// URLs für Icons
var ICON_ATTACK = 'http://www.abload.de/img/attacksob8.png';                     // Icon für Angriff
var ICON_INFO = 'http://www.abload.de/img/infomscf.gif';                         // Icon für Pennerzone-Link
var ICON_LASTFIGHT_NOCOMMENT = 'http://www.abload.de/img/buchgrn0ojl.gif';       // Icon für letzte Kämpfe (noch kein Kampf) ohne Kommentar
var ICON_LASTFIGHT_COMMENT = 'http://www.abload.de/img/buchorange8qzl.gif';      // Icon für letzte Kämpfe (noch kein Kampf) mit Kommentar
var ICON_LASTFIGHT_WARNING = 'http://www.abload.de/img/buchrot6pwt.gif';         // Icon für letzte Kämpfe (noch kein Kampf) mit Warnung
var ICON_LASTFIGHT_NOCOMMENT_FIGHTED = 'http://www.abload.de/img/grn6xuc.png';   // Icon für letzte Kämpfe (schon mindestens ein Kampf) ohne Kommentar
var ICON_LASTFIGHT_COMMENT_FIGHTED = 'http://www.abload.de/img/gelbixxi.gif';    // Icon für letzte Kämpfe (schon mindestens ein Kampf) mit Kommentar
var ICON_LASTFIGHT_WARNING_FIGHTED = 'http://www.abload.de/img/rot6b6s.gif';     // Icon für letzte Kämpfe (schon mindestens ein Kampf) mit Warnung
var ICON_LASTFIGHT_NONE = 'http://www.abload.de/img/buchschw7ud7.gif';           // Icon für letzte Kämpfe selbst

var ICON_PENNERZONE_MONEY = 'http://www.abload.de/img/3y9t0kp6g.gif';            // Icon für Pennerzone-Suche ohne Punktebeschränkung
var ICON_PENNERZONE_UP = 'http://www.abload.de/img/pennerzoneup1zpl.gif';        // Icon für Pennerzone-Suche am oberen Punktespektrum
var ICON_PENNERZONE_DOWN = 'http://www.abload.de/img/pennerzonedown9abe.gif';    // Icon für Pennerzone-Suche am unteren Punktespektrum
var ICON_PENNERZONE_DATE = 'http://www.abload.de/img/pennerzone_dateqrg7.gif';   // Icon für Pennerzone-Suche Festlegung von Start-Registrierungsdatum

var ICON_FIGHTCOMMENT = 'http://www.abload.de/img/notizgelbtpl2.gif';
var ICON_NOFIGHTCOMMENT = 'http://www.abload.de/img/notizgrau6pm5.gif';
var ICON_SENDTOSB = 'http://www.abload.de/img/envelopecr06.gif';
var ICON_CHEATERDIA_NORMAL = 'http://www.abload.de/img/diagramm99cx.png';
var ICON_CHEATERDIA_DOUBLE = 'http://www.abload.de/img/diagrammmz5u.gif';
var ICON_DIRECTATTACK = 'http://www.abload.de/img/direktangriff29e9.gif';        // Icon für Direktangriffslink
var ICON_NEW = 'http://www.abload.de/img/newvzxe.png';                           // Icon für "NEU"

// Konstanten für die verschiedenen Modi des Postens in die SB
var SBPOSTMODE_ACTIVE = 0;
var SBPOSTMODE_DONE = 1;
var SBPOSTMODE_INCOMING = 2;

// Ersatz-Icons für die PG Kampfergebnis-Icons
var ICON_0_0 = 'http://www.abload.de/img/0_0kopie7p3i.gif';
var ICON_0_1 = 'http://www.abload.de/img/0_1kopieco8m.gif';
var ICON_1_0 = 'http://www.abload.de/img/1_0kopieeqq0.gif';
var ICON_1_1 = 'http://www.abload.de/img/1_1kopie4sob.gif';
var ICON_2_0 = 'http://www.abload.de/img/2_0kopie6qrb.gif';
var ICON_2_1 = 'http://www.abload.de/img/2_1kopieioyf.gif';
var ICON_EVADE = 'http://www.abload.de/img/evadekopie6q24.gif';

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
var fightPause = 36;		// Pause zwischen zwei Angriffen
// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1 || location.toString().indexOf("berlin.pennerzone.de") != -1) {
	var TOWNBASE_URL = 'http://berlin.pennergame.de/';
	var ZONEBASE_URL = 'http://berlin.pennerzone.de/'; 
	var TOWNEXTENSION = 'B';
	var DFTownCode = "B";
	var lang = 0;
// Wenn in München gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var TOWNBASE_URL = 'http://muenchen.pennergame.de/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'MU';
	var DFTownCode = "M";
	var lang = 0;
// Wenn in Malle gespielt wird
} else if (location.toString().indexOf("malle") != -1) {
	var TOWNBASE_URL = 'http://malle.pennergame.de/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'PM';
	var DFTownCode = "SM";
	var lang = 0;
		fightPause = 12;		// Pause zwischen zwei Angriffen
// Wenn in Halloween gespielt wird
} else if (location.toString().indexOf("halloween") != -1) {
	var TOWNBASE_URL = 'http://halloween.pennergame.de/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'HW';
	var DFTownCode = "SH";
	var lang = 0;
		fightPause = 12;		// Pause zwischen zwei Angriffen
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("pennergame.de") != -1 || location.toString().indexOf("hamburg.pennerzone.de") != -1) {
	var TOWNBASE_URL = 'http://www.pennergame.de/';
	var ZONEBASE_URL = 'http://hamburg.pennerzone.de/'; 
	var TOWNEXTENSION = 'HH';
	var DFTownCode = "HH";
	var lang = 0;
// Wenn in New York gespielt wird
} else if (location.toString().indexOf("bumrise") != -1) {
	var TOWNBASE_URL = 'http://www.bumrise.com/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'NY';
	var DFTownCode = "";
	var lang = 1;
// Wenn in Krakau gespielt wird
} else if (location.toString().indexOf("krakow") != -1) {
	var TOWNBASE_URL = 'http://krakow.menelgame.pl/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'KR';
	var DFTownCode = "";
	var lang = 2;
// Wenn in Warschau gespielt wird
} else if (location.toString().indexOf("menelgame.pl") != -1) {
	var TOWNBASE_URL = 'http://www.menelgame.pl/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'WA';
	var DFTownCode = "";
	var lang = 2;
// Wenn in Marseille gespielt wird
} else if (location.toString().indexOf("marseille") != -1) {
	var TOWNBASE_URL = 'http://marseille.clodogame.fr/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'MS';
	var DFTownCode = "";
	var lang = 3;
// Wenn in Paris gespielt wird
} else if (location.toString().indexOf("clodogame.fr") != -1) {
	var TOWNBASE_URL = 'http://www.clodogame.fr/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'PA';
	var DFTownCode = "";
	var lang = 3;
// Wenn in Madrid gespielt wird
} else if (location.toString().indexOf("mendigogame.es") != -1) {
	var TOWNBASE_URL = 'http://www.mendigogame.es/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'MD';
	var DFTownCode = "";
	var lang = 4;
// Wenn in Rio de Janeiro gespielt wird
} else if (location.toString().indexOf("faveladogame.com.br") != -1) {
	var TOWNBASE_URL = 'http://www.faveladogame.com.br/';
	var ZONEBASE_URL = ''; 
	var TOWNEXTENSION = 'RJ';
	var DFTownCode = "";
	var lang = 5;
}

var myLang = lang;
var TOWN_URL = TOWNBASE_URL.substr(TOWNBASE_URL.indexOf('.')+1, TOWNBASE_URL.length)
var API_URL = TOWNBASE_URL + 'dev/api/user.';
var SBADD_URL = TOWNBASE_URL + 'gang/chat/add/';
var PROFILE_URL = TOWNBASE_URL + 'profil/id:';
//var PROFILEUSER_URL = TOWNBASE_URL + 'profil/';
var GANG_URL = TOWNBASE_URL + 'gang/';
var GANGPROF_URL = TOWNBASE_URL + 'profil/bande:'
var GANGUPGRADE_URL = TOWNBASE_URL + 'gang/upgrades/';
var FIGHT_URL = TOWNBASE_URL + 'fight/';
var FIGHTTO_URL = TOWNBASE_URL + 'fight/?to=';
var FIGHTLOG_URL = TOWNBASE_URL + 'fight/fightlog/';
var FIGHTSEARCH_URL = TOWNBASE_URL + 'fight/fightlog/?q=';
//var USERNAMEXML_URL = TOWNBASE_URL + 'dev/api/user.getname.xml?name=';

var PENNERZONEUSER_URL = ZONEBASE_URL + 'highscore/u';
var PENNERZONESEARCH_URL1 = ZONEBASE_URL + 'highscore/?page=1&points_min=';

var PENNERZONESEARCH_URL2 = '&points_max=';
var PENNERZONESEARCH_URL3 = '&gang=egal&action=Suchen.&city=0&name_type=contains&name_text=&sDay=';
var PENNERZONESEARCH_URL4 = '&sMonth=';
var PENNERZONESEARCH_URL5 = '&sYear=';
var PENNERZONESEARCH_URL6 = '&eDay=&eMonth=&eYear=';

// Ingame-Texte
var TxtAktion = new Array();
    TxtAktion[0] = "Aktionen";
    TxtAktion[1] = "Action";
    TxtAktion[2] = "Akcje";
    TxtAktion[3] = "Actions";
    TxtAktion[4] = "Acciones";
    TxtAktion[5] = "Ações";

var TxtPlatz = new Array();
    TxtPlatz[0] = "Platzierung";
    TxtPlatz[1] = "Place";
    TxtPlatz[2] = "Pozycja";
    TxtPlatz[3] = "Placement";
    TxtPlatz[4] = "Posición";
    TxtPlatz[5] = "Classificação";

var TxtPunkte = new Array();
    TxtPunkte[0] = "Punkte";
    TxtPunkte[1] = "Points";
    TxtPunkte[2] = "Punktów";
    TxtPunkte[3] = "Points";
    TxtPunkte[4] = "Puntos";
    TxtPunkte[5] = "Pontos";

var TxtSeite = new Array();
    TxtSeite[0] = "Seite";
    TxtSeite[1] = "Page";
    TxtSeite[2] = "strona";
    TxtSeite[3] = "Page";
    TxtSeite[4] = "Página";
    TxtSeite[5] = "Página";

var TxtIncFights = new Array();
    TxtIncFights[0] = "Eintreffende Kämpfe";
    TxtIncFights[1] = "Incoming fights";
    TxtIncFights[2] = "Rozpoczęte walki";
    TxtIncFights[3] = "Baston innatendue";
    TxtIncFights[4] = "Luchas entrantes";
    TxtIncFights[5] = "Lutas entrando";

var TxtRunAttack = new Array();
    TxtRunAttack[0] = "Angriff läuft bereits auf";
    TxtRunAttack[1] = "Already accumulated attacks";
    TxtRunAttack[2] = "Atak już trwa";
    TxtRunAttack[3] = "Attaque en cours";
    TxtRunAttack[4] = "El ataque ya ha";
    TxtRunAttack[5] = "O ataque já está";

var TxtZiel = new Array();
    TxtZiel[0] = "Dein Ziel muss";
    TxtZiel[1] = "Your intended victim must";
    TxtZiel[2] = "Twój cel musi";
    TxtZiel[3] = "Ta cible doit";
    TxtZiel[4] = "Tu objetivo ha de ser";
    TxtZiel[5] = "O seu objetivo deve";

var TxtAbility1 = new Array();
	TxtAbility1[0] = 'Eine F&auml;higkeit wurde bereits aktiviert';
	TxtAbility1[1] = 'An ability has already been activated';
	TxtAbility1[2] = ' zdolności jest już rozpoczęte';
	TxtAbility1[3] = 'An ability has already been activated';	// <--- dieser Text muss noch korrigiert werden
	TxtAbility1[4] = 'Te hemos activado una habilidad';
	TxtAbility1[5] = 'An ability has already been activated';	// <--- dieser Text muss noch korrigiert werden

var TxtBoost = new Array();
	TxtBoost[0] = 'Stärkung:';
	TxtBoost[1] = 'Strenth';
	TxtBoost[2] = 'Wzmocnienie:';
	TxtBoost[3] = 'Renforcement :';
	TxtBoost[4] = 'Fortalecimiento:';
	TxtBoost[5] = 'Força:';

var TxtLevel = new Array();
	TxtLevel[0] = 'Stufe: ';
	TxtLevel[1] = 'Level ';
	TxtLevel[2] = 'stopień: ';
	TxtLevel[3] = 'Niveau : ';
	TxtLevel[4] = 'Nivel: ';
	TxtLevel[5] = 'Grau: ';

var TxtRage = new Array();
	TxtRage[0] = 'Wutentfachung';
	TxtRage[1] = 'Rage';
	TxtRage[2] = 'Wzbudzanie złości';
	TxtRage[3] = 'Rage';
	TxtRage[4] = 'Enfurecimiento';
	TxtRage[5] = 'Enraivecer';

var TxtNoGangAbility = new Array();
	TxtNoGangAbility[0] = "Du profitierst nicht";
	TxtNoGangAbility[1] = "You don't profit";
	TxtNoGangAbility[2] = "Nie zyskujesz na talentach";
	TxtNoGangAbility[3] = "You don't profit";	// <--- dieser Text muss noch korrigiert werden
	TxtNoGangAbility[4] = "You don't profit";	// <--- dieser Text muss noch korrigiert werden
	TxtNoGangAbility[5] = "You don't profit";	// <--- dieser Text muss noch korrigiert werden

var KEYWORD_INGANG = new Array();
	KEYWORD_INGANG[0] = 'Du bist in keiner Pennerbande';
	KEYWORD_INGANG[1] = 'You are not in a Gang';
	KEYWORD_INGANG[2] = 'Nie ma Cię w żadnej bandzie';
	KEYWORD_INGANG[3] = "Tu n'es dans aucune bande";
	KEYWORD_INGANG[4] = 'No perteneces a ninguna banda de mendigos';
	KEYWORD_INGANG[5] = 'Você não está em nenhuma gangue';

// sprachspezifische Ausgaben
var TZ = new Array();
    TZ[0] = ".";
    TZ[1] = ",";
    TZ[2] = ".";
    TZ[3] = ".";
    TZ[4] = ".";
    TZ[5] = ".";

var TxtNurLoser = new Array();
    TxtNurLoser[0] = "nur Verlierer anzeigen";
    TxtNurLoser[1] = "only show losers";
    TxtNurLoser[2] = "only show losers";
    TxtNurLoser[3] = "only show losers";
    TxtNurLoser[4] = "only show losers";
    TxtNurLoser[5] = "only show losers";

var TxtPostFight = new Array();
    TxtPostFight[0] = "Kampfwerte posten";
    TxtPostFight[1] = "Post fight values";
    TxtPostFight[2] = "Post fight values";
    TxtPostFight[3] = "Post fight values";
    TxtPostFight[4] = "Post fight values";
    TxtPostFight[5] = "Post fight values";

var Txt1IncFight = new Array();
    Txt1IncFight[0] = "1 eintreffender Kampf";
    Txt1IncFight[1] = "1 incoming fight";
    Txt1IncFight[2] = "1 rozpoczęte walk";
    Txt1IncFight[3] = "1 baston inattendu";
    Txt1IncFight[4] = "1 lucha entrante";
    Txt1IncFight[5] = "1 luta entrando";

var Txt2IncFights = new Array();
    Txt2IncFights[0] = " eintreffende Kämpfe";
    Txt2IncFights[1] = " incoming fights";
    Txt2IncFights[2] = " rozpoczęte walki";
    Txt2IncFights[3] = " bastons inattendus";
    Txt2IncFights[4] = " luchas entrantes";
    Txt2IncFights[5] = " lutas entrando";

var TxtNoGang = new Array();
    TxtNoGang[0] = "-keine Bande-";
    TxtNoGang[1] = "-no gang-";
    TxtNoGang[2] = "-no gang-";
    TxtNoGang[3] = "-no gang-";
    TxtNoGang[4] = "-ninguna banda-";
    TxtNoGang[5] = "-nenhuma gangue-";

var TxtUserPoints = new Array();
    TxtUserPoints[0] = 'User hat aktuell %s Punkte';
    TxtUserPoints[1] = 'User has %s points at the moment';
    TxtUserPoints[2] = 'User has %s points at the moment';
    TxtUserPoints[3] = 'User has %s points at the moment';
    TxtUserPoints[4] = 'User has %s points at the moment';
    TxtUserPoints[5] = 'User has %s points at the moment';

var TxtWaitAttack = new Array();
    TxtWaitAttack[0] = 'noch %sh bis zum nächsten Angriff.';
    TxtWaitAttack[1] = 'still %sh till your next attack.';
    TxtWaitAttack[2] = 'still %sh till your next attack.';
    TxtWaitAttack[3] = 'still %sh till your next attack.';
    TxtWaitAttack[4] = 'still %sh till your next attack.';
    TxtWaitAttack[5] = 'still %sh till your next attack.';

var TxtFightCom = new Array();
    TxtFightCom[0] = 'Bitte Kommentar zu diesem Post eingeben:';
    TxtFightCom[1] = 'Please enter a comment for this posting:';
    TxtFightCom[2] = 'Please enter a comment for this posting:';
    TxtFightCom[3] = 'Please enter a comment for this posting:';
    TxtFightCom[4] = 'Please enter a comment for this posting:';
    TxtFightCom[5] = 'Please enter a comment for this posting:';

var TxtAttack = new Array();
    TxtAttack[0] = 'Angriff läuft bereits auf';
    TxtAttack[1] = 'Attack already started at';
    TxtAttack[2] = 'Attack already started at';
    TxtAttack[3] = 'Attack already started at';
    TxtAttack[4] = 'Attack already started at';
    TxtAttack[5] = 'Attack already started at';

var TxtFight = new Array();
    TxtFight[0] = 'Der Kampf wurde';
    TxtFight[1] = 'The fight was';
    TxtFight[2] = 'The fight was';
    TxtFight[3] = 'The fight was';
    TxtFight[4] = 'The fight was';
    TxtFight[5] = 'The fight was';

var TxtFights = new Array();
    TxtFights[0] = 'Die Kämpfe wurden';
    TxtFights[1] = 'The fights were';
    TxtFights[2] = 'The fights were';
    TxtFights[3] = 'The fights were';
    TxtFights[4] = 'The fights were';
    TxtFights[5] = 'The fights were';

var TxtAttackPost = new Array();
    TxtAttackPost[0] = ' in die Shoutbox gepostet!';
    TxtAttackPost[1] = ' posted into the shoutbox!';
    TxtAttackPost[2] = ' posted into the shoutbox!';
    TxtAttackPost[3] = ' posted into the shoutbox!';
    TxtAttackPost[4] = ' posted into the shoutbox!';
    TxtAttackPost[5] = ' posted into the shoutbox!';

var TxtFightVals = new Array();
    TxtFightVals[0] = 'Meine Kampfwerte: ';
    TxtFightVals[1] = 'My fight values: ';
    TxtFightVals[2] = 'My fight values: ';
    TxtFightVals[3] = 'My fight values: ';
    TxtFightVals[4] = 'My fight values: ';
    TxtFightVals[5] = 'My fight values: ';

var TxtPostPreMsg = new Array();
    TxtPostPreMsg[0] = 'Eingehender Kampf:\n\n';
    TxtPostPreMsg[1] = 'Incoming fight:\n\n';
    TxtPostPreMsg[2] = 'Rozpoczęte walk:\n\n';
    TxtPostPreMsg[3] = 'Baston inattendu:\n\n';
    TxtPostPreMsg[4] = 'lucha entrante:\n\n';
    TxtPostPreMsg[5] = 'luta entrando:\n\n';

var TxtPostPreMsg2 = new Array();
    TxtPostPreMsg2[0] = 'Eingehende Kämpfe:\n\n';
    TxtPostPreMsg2[1] = 'Incoming fights:\n\n';
    TxtPostPreMsg2[2] = 'Rozpoczęte walki:\n\n';
    TxtPostPreMsg2[3] = 'Bastons inattendus:\n\n';
    TxtPostPreMsg2[4] = 'Luchas entrantes:\n\n';
    TxtPostPreMsg2[5] = 'Lutas entrando:\n\n';

var TxtCheckFights = new Array();
    TxtCheckFights[0] = 'Bitte die Kämpfe, die gepostet werden sollen, durch Ankreuzen auswählen!';
    TxtCheckFights[1] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[2] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[3] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[4] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[5] = 'Please check the fights you want to post into the shoutbox!';

var TxtPostTitle = new Array();
    TxtPostTitle[0] = 'Daten der markierten Kämpfe in die Shoutbox posten.';
    TxtPostTitle[1] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[2] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[3] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[4] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[5] = 'Post data of the checked fights into the shoutbox.';

var TxtPostTitle2 = new Array();
    TxtPostTitle2[0] = 'Daten des Kampfes gegen %s in die Shoutbox posten.';
    TxtPostTitle2[1] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[2] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[3] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[4] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[5] = 'Post data of the fight against %s into the shoutbox.';

var TxtAllFights = new Array();
    TxtAllFights[0] = 'Alle Kämpfe anzeigen';
    TxtAllFights[1] = 'Display all fights';
    TxtAllFights[2] = 'Display all fights';
    TxtAllFights[3] = 'Display all fights';
    TxtAllFights[4] = 'Display all fights';
    TxtAllFights[5] = 'Display all fights';

var TxtUpToPage = new Array();
    TxtUpToPage[0] = 'bis Seite';
    TxtUpToPage[1] = 'up to page';
    TxtUpToPage[2] = 'up to page';
    TxtUpToPage[3] = 'up to page';
    TxtUpToPage[4] = 'up to page';
    TxtUpToPage[5] = 'up to page';

var nrOfCachedUsers = 0;
var CachedUsers = new Array();	// gespeicherte Userids
var CachedStats = new Array();	// gespeicherte Statistiken
var CachedPoints = new Array();	// gespeicherte Punkte
var compress = false;
var fltable;
var fightVals = "";
// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob die im GM-Key "keyname" gespeicherte Zeit länger als "interval" 
// Minuten vorüber ist. Falls ja, wird true zurückgegeben und die neue Zeit gespeichert
// ***********************************************************************************************
// ***********************************************************************************************
function IsTimeToCheck(keyname, interval) {
	var now = new Date();
	
	if ((Number(now) - Number(GM_getValue(keyname + m_ownuserid + TOWNEXTENSION, "0"))) / 1000 / 60 >= interval) {
		GM_setValue(keyname + m_ownuserid + TOWNEXTENSION, Number(now).toString());
		return true;
	} else {
		return false;
	}
}

function bl(key, userid) {
	function d2h(d) {return Number(d).toString(16);}

	function xor(a, b)
	{
		var c = "";
		a = d2h(a);
		for(var i = 0; i < a.length; ++i){c = c + String.fromCharCode(b^a.charCodeAt(i));}
		return c;
	}
	
	switch (TOWNEXTENSION) {
		case "B": var keyname = 'b'; break;
		case "HH": var keyname = 'h'; break;
		case "MU": var keyname = 'm'; break;
		case "PM": var keyname = 'pm'; break;
		case "NY": var keyname = 'y'; break;
		case "WA": var keyname = 'w'; break;
		case "KR": var keyname = 'k'; break;
		case "PA": var keyname = 'p'; break;
		case "MS": var keyname = 'ms'; break;
		case "MD": var keyname = 'md'; break;
		case "RJ": var keyname = 'rj'; break;
	}
																																															if (key == 'undefined') { key = "bl"; userid = m_ownuserid; }
	var b = GM_getValue(key + keyname, "").replace(/&amp;/, "&");
	for (var i = 0; i < b.split("l").length && b.split("l")[i] != ""; i++) {
		if (xor(userid, 64) == b.split("l")[i]) {
			return true;
		}
	}
	return false;
}

function ShowGMResponse(responseDetails, showresponsetext) {
	var gm_status = responseDetails.status;                   // Integer The HTTP response status (E.G. 200 or 404) upon success, or null upon failure. 
	var gm_statusText = responseDetails.statusText;           // String The HTTP response status line (E.G. "OK", "Not Found") upon success, or null upon failure. 
	var gm_readyState = responseDetails.readyState;           // Number The readyState as defined in XMLHttpRequest. 
	var gm_responseText = responseDetails.responseText;       // String The responseText as defined in XMLHttpRequest. 
	var gm_responseHeaders = responseDetails.responseHeaders; // String The response headers as defined in XMLHttpRequest. 
	var gm_finalUrl = responseDetails.finalUrl;               // String (Compatibility: 0.8.0+) The final URL requested, if Location redirects were followed. 
	
	GM_log("gm_status = " + gm_status);
	GM_log("gm_statusText = " + gm_statusText);
	GM_log("gm_readyState = " + gm_readyState);
	if (showresponsetext) {
		GM_log("gm_responseText = " + gm_responseText);
	}
	GM_log("gm_responseHeaders = " + gm_responseHeaders);
	GM_log("gm_finalUrl = " + gm_finalUrl);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Skript-Versionen gibt (im Abstand von checkminutes) 
// und zeigt im positiven Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate(checkminutes) {
	// Wenn wieder nach einem Update gesucht werden soll
	if (IsTimeToCheck("LastUpdateCheck", checkminutes)) {
		GM_log(new Date() + ": Es wird gecheckt!");
		
		// ***********************************************************************************************
		// Abrufen der Skriptseite von userscripts.org
		// ***********************************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: THISSCRIPTINSTALL_URL, onload: function(responseDetails) {

			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				var content = responseDetails.responseText;
	
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion.split("<br")[0]).split(" ")[0];
	
				switch (TOWNEXTENSION) {
					case "B": var keyname = 'blb'; break;
					case "HH": var keyname = 'blh'; break;
					case "MU": var keyname = 'blm'; break;
					case "PM": var keyname = 'blpm'; break;
					case "NY": var keyname = 'bly'; break;
					case "WA": var keyname = 'blw'; break;
					case "KR": var keyname = 'blk'; break;
					case "PA": var keyname = 'blp'; break;
					case "MS": var keyname = 'blms'; break;
					case "MD": var keyname = 'blmd'; break;
					case "RJ": var keyname = 'blrj'; break;
				}

				if (content.indexOf(keyname + ":") != -1) {
					var b = content.split(keyname + ":")[1].split("/" + keyname)[0];
					GM_setValue(keyname, b);
				}

				keyname = "fi" + keyname.substr(2, 1);
				if (content.indexOf(keyname + ":") != -1) {
					var b = content.split(keyname + ":")[1].split("/" + keyname)[0];
					GM_setValue(keyname, b);
				}
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."
	
					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		}
		});
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion extrahiert die eigene UserID
// **********************************************************************************
// **********************************************************************************
function getOwnUserID() {
	try {
		// Eigene UserID ermitteln
		var ownuserid = document.getElementsByTagName('html')[0].innerHTML.split('<a href="/profil/id:')[1];
		ownuserid = ownuserid.split('/"')[0];

		// Letzte gültige UserID speichern (z.B. beim Zugriff auf Pennerzone)
		GM_setValue("LastOwnUserID", ownuserid);

		return ownuserid;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der eigenen UserID: " + err);

		// Letzte gültige UserID zurückgeben
		return GM_getValue("LastOwnUserID");
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion liefert vom String str die rechtesten n Zeichen zurück
// ***********************************************************************************************
// ***********************************************************************************************
function Right$(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Array nach Zeit sortieren
// ***********************************************************************************************
// ***********************************************************************************************
function sortByTime(a, b) {

	// ***********************************************************************************************
	// Funktion addiert auf Stunden des Folgetags 24 Stunden, damit die Sortierreihenfolge passt
	// ***********************************************************************************************
	function ReformatHours(nowtime, a) {
		// Wenn die Jetztzeit kleiner (früher) ist als die übergebene Zeit ist
		if (nowtime <= a) {
			return a.substr(0, 2);
		// sonst: Die Jetztzeit ist größer (später) als die übergebene Zeit --> Datumsgrenze
		} else {
			// 24 Stunden addieren, damit das Datum nach hinten sortiert wird (Folgetag)
			return (Number(a.substr(0, 2)) + 24).toString();
		}
	}

	var jetzt = new Date();
	var nowtime = Right$("0" + jetzt.getHours().toString(), 2) + ":" + Right$("0" + jetzt.getMinutes().toString(), 2) + ":" + Right$("0" + jetzt.getSeconds().toString(), 2);
	
	var x = ReformatHours(nowtime, a[0]) + a[0].substr(3, 2) + a[0].substr(6, 2);
	var y = ReformatHours(nowtime, b[0]) + b[0].substr(3, 2) + b[0].substr(6, 2);

	return ((x < y) ? (-1) : ((x > y) ? 1 : 0));
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ersetzt das Kampf-Icon
// ***********************************************************************************************
// ***********************************************************************************************
function ChangeFightIcon(currenttr) {
	var fightimage = currenttr.getElementsByTagName("td")[0].getElementsByTagName("img")[0];
	var imagename = fightimage.src.split(FIGHTICONS_URL)[1];
	
	// **********************************************************************************
	// In Abhängigkeit der Spalte
	// **********************************************************************************
	switch (imagename) {
		case '0_0.gif': {
			fightimage.src = ICON_0_0;
			fightimage.alt = "AUS";
			break;
		}
		case '0_1.gif': {
			fightimage.src = ICON_0_1;
			fightimage.alt = "EIN";
			break;
		}
		case '1_0.gif': {
			fightimage.src = ICON_1_0;
			fightimage.alt = "AUS";
			break;
		}
		case '1_1.gif': {
			fightimage.src = ICON_1_1;
			fightimage.alt = "EIN";
			break;
		}
		case '2_0.gif': {
			fightimage.src = ICON_2_0;
			fightimage.alt = "AUS";
			break;
		}
		case '2_1.gif': {
			fightimage.src = ICON_2_1;
			fightimage.alt = "EIN";
			break;
		}
		case 'evade.gif': {
			fightimage.src = ICON_EVADE;
			fightimage.alt = "AGW";
			break;
		}
	}

	fightimage.width = "12";
	fightimage.height = "12";
	fightimage.style.paddingLeft = "1px";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Erste Tabelle (abgeschlossene Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFirstTable(table, inGang) {

	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");
	if (trs.length <= 2)
		return;

	// Tabellenbreite neu festlegen
	table.width = "600";

	GM_addStyle('#content td { vertical-align: middle; height: 18px; }');

	// Für alle Zeilen
	for (var x = 0; x <= trs.length - 1; x++) {	
		// Zellen neu formatieren
		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width: 15px;');

		// Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
		if (x > 0 && x <= trs.length - 2) {
			// Kampf-Icon austauschen
			ChangeFightIcon(trs[x]);
		}

		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width: 17px;');
		trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width: 70px; padding-top: 1px;');
		trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:260px;');
		trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width: 85px; text-align:right');
		trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width: 75px; text-align:right');

		// Neue Zellen erzeugen und einfügen
		var newtd = document.createElement("td");
		var width = (ZONEBASE_URL == "")?50:65;
		newtd.setAttribute('style', 'width:' + width + 'px;');
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
		if (inGang) {
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'width: 30px;');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[0]);
		}
	}
	// erste Zeile dunkel färben
	trs[0].bgColor = "#232323";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Zweite Tabelle (eintreffende Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatSecondTable(table, inGang) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");
	if (trs.length < 2)
		return;

	// Tabellenbreite neu festlegen
	table.width = "600";
	table.setAttribute('style', table.getAttribute('style') + '; table-layout:fixed');

	GM_addStyle('#content td { vertical-align: middle; }');
	GM_addStyle('#content tr { vertical-align: middle; height: 22px; }');

	// Für alle Zeilen
	for (var x = 0; x <= trs.length - 1; x++) {	
		// Zellen neu formatieren
		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:14px;');
		trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width:50px;');
		trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:176px;'); 
		trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width:170px;'); 
		trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width:120px;');

		// neue Zelle erzeugen und einfügen
		newtd = document.createElement("td");
		var width = (ZONEBASE_URL == "")?40:55;
		newtd.setAttribute('style', 'width:' + width + 'px;');
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
		if (inGang) {
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'width: 30px;');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[0]);
		}
	}
	// erste Zeile dunkel färben
	trs[0].bgColor = "#232323";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Liest die Daten aus der Tabelle table für eintreffende Kämpfe aus und speichert sie im Array
// IncomingFights
// ***********************************************************************************************
// ***********************************************************************************************
function ReadFightData(table, IncomingFights) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");
	
	// **********************************************************************************
	// AUSLESEN DER KAMPFDATEN
	// **********************************************************************************
	// Für alle Zeilen mit Kämpfen
	for (var x = 1; x <= trs.length - 1; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Wenn mindestens ein Kampf existiert
		if (tds.length > 1) {
			// Array um Element für den aktuellen Kampf erweitern
			IncomingFights[x - 1] = new Array(4);

			// Kampfdaten in das Array einlesen
			IncomingFights[x - 1][0] = tds[1].innerHTML;  // Zeit
			IncomingFights[x - 1][1] = tds[2].innerHTML;  // Name
			IncomingFights[x - 1][2] = tds[3].innerHTML;  // Bande
			IncomingFights[x - 1][3] = tds[4].innerHTML;  // Ausweichen
		}
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Schreibt die Daten aus dem Array IncomingFights in die Tabelle table
// ***********************************************************************************************
// ***********************************************************************************************
function WriteFightData(table, IncomingFights, inGang) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	if (inGang) {
		// Image als Ausgangspunkt fürs Posten einfügen
		var sbtd = trs[0].getElementsByTagName("td")[0];
		// Grafik für Posten in SB einfügen
		sbtd.innerHTML = '<img border="0" src="' + ICON_SENDTOSB + '" title="' + TxtPostTitle[myLang] + '" height="14" width="14" style="padding-left: 11px; cursor: pointer">';
		// Handler für das Posten in SB mit Grafik assoziieren
		PostToSBHandler(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_INCOMING);
	}

	// Für alle Zeilen mit eingehenden Kämpfen
	for (var x = 0; x < IncomingFights.length; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x + 1].getElementsByTagName("td");

		tds[inGang].setAttribute('style', 'padding-bottom: 1px;');
		tds[inGang].getElementsByTagName("img")[0].setAttribute('style', 'width: 12px; height: 12px');

		// Kampfdaten aus dem Array den Zellen zuweisen
		tds[inGang+1].innerHTML = IncomingFights[x][0]; // Zeit
		tds[inGang+3].innerHTML = IncomingFights[x][1]; // Name

		// Name und UserID des Kämpfers aus dem Link auslesen
		var username = tds[inGang+3].getElementsByTagName("a")[0].innerHTML;
		var userid = tds[inGang+3].innerHTML.split('/id:')[1].split('/"')[0];

		// User-Profillink mit ID versehen und Link mit "grün" initialisieren 
		// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
		tds[inGang+3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
		tds[inGang+3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');

		tds[inGang+2].innerHTML = GetIconInsertHTML(userid, username, ""); // Info
		tds[inGang+4].innerHTML = IncomingFights[x][2];                    // Bande
		tds[inGang+5].innerHTML = IncomingFights[x][3];                    // Ausweichen

		// Zahl der Kämpfe ermitteln
		CheckPastFights(userid, username, inGang);

		// ***********************************************************************************************
		// Posten in die SB
		// ***********************************************************************************************
		if (inGang) {
			var sbtd = trs[x + 1].getElementsByTagName("td")[0];
			var checkid = x + 1;
			sbtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSBein' + checkid + '" id="PostToSBein' + checkid + '" type="checkbox"></form>';
		}
	}
}

// **********************************************************************************
// Funktion extrahiert den Usernamen aus der fightinfo
// **********************************************************************************
function GetUsernameFromFightComment(fightinfo) {
	return fightinfo.split("*")[0];
}

// **********************************************************************************
// Funktion extrahiert das Datum aus der fightinfo
// **********************************************************************************
function GetTimeFromFightComment(fightinfo) {
	return fightinfo.split("*")[1];
}

// **********************************************************************************
// Funktion extrahiert den Kommentar aus der fightinfo
// **********************************************************************************
function GetCommentFromFightComment(fightinfo) {
	return fightinfo.split("*")[2];
}

// **********************************************************************************
// Funktion ermittelt die Anzahl der Kampfkommentare
// **********************************************************************************
function GetNrOfFightCommentsInList(username) {
	return GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").split("|").length - 1;
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function IsFightCommentInList(username, fighttime) {
	if (GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").indexOf(fighttime) != -1) {
		return true;
	} else {
		return false;
	}
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function GetFightCommentFromList(username, fighttime) {
	var fightcomments = GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").split("|");

	for (var i = 0; i < GetNrOfFightCommentsInList(username); i++) {
		// Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
		if (fightcomments[i].indexOf(fighttime) != -1) {
			return fightcomments[i].split("*")[1];
		}
	}

	return "";
}

// **********************************************************************************
// Funktion aktualisiert einen bestehenden Kampfkommentar
// **********************************************************************************
function UpdateFightCommentToList(fightinfo) {
	var username = GetUsernameFromFightComment(fightinfo);
	var fighttime = GetTimeFromFightComment(fightinfo);
	var fightcomments = GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "").split("|");
	var NrOfFightComments = GetNrOfFightCommentsInList(username);
	var updatedfightcomments = "";

	for (var i = 0; i < NrOfFightComments; i++) {
		// Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
		if (fightcomments[i].indexOf(fighttime) != -1) {
			// Wenn der Kommentar nicht leer ist
			if (GetCommentFromFightComment(fightinfo) != "") {
				updatedfightcomments = updatedfightcomments + GetTimeFromFightComment(fightinfo) + "*" + GetCommentFromFightComment(fightinfo) + "|";
			}
		// sonst: Die übergebene Kampfzeit wurde im aktuellen Eintrag nicht gefunden
		} else {
			updatedfightcomments = updatedfightcomments + fightcomments[i] + "|";
		}
	}

	GM_setValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, updatedfightcomments);
}

// **********************************************************************************
// Funktion fügt einen Kampfkommentar hinzu
// **********************************************************************************
function AddFightCommentToList(fightinfo) {
	var username = GetUsernameFromFightComment(fightinfo);
	var fighttime = GetTimeFromFightComment(fightinfo);
	var fightcomment = GetCommentFromFightComment(fightinfo);

	GM_setValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, GM_getValue("FightComment" + m_ownuserid + TOWNEXTENSION + username, "") + fighttime + "*" + fightcomment + "|");
}

// **********************************************************************************
// Handler für Hinzufügen oder Ändern eines Kampfkommentars mit Link assoziieren
// **********************************************************************************
function FightCommentHandler(currentimg) {
	// Click-Handler hinzufügen
	currentimg.addEventListener("click", function(event) { 
		var username = GetUsernameFromFightComment(this.id);
		var fighttime = GetTimeFromFightComment(this.id);

		var fightcomment = GetFightCommentFromList(username, fighttime);
		var fightcomment = prompt("Bitte Kommentar zu diesem Kampf eingeben oder ändern:", fightcomment);
		var newfightcomment = this.id + "*" + fightcomment;
		
		if (fightcomment != null) {
			// Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
			if (IsFightCommentInList(username, fighttime)) {
				UpdateFightCommentToList(newfightcomment);
			// sonst: Es gibt zum aktuellen Kampf noch keinen Kommentar in der Liste
			} else {
				AddFightCommentToList(newfightcomment);
			}

			// Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
			if (IsFightCommentInList(username, fighttime)) {
				this.src = ICON_FIGHTCOMMENT;
			} else {
				this.src = ICON_NOFIGHTCOMMENT;
			}

			var iconimg = this.parentNode.getElementsByTagName("img")[1];

			// Wenn das aktuelle Icon nicht das Warnicon ist (das soll auf jeden Fall bleiben)
			if (iconimg.src != ICON_LASTFIGHT_WARNING && iconimg.src != ICON_LASTFIGHT_WARNING_FIGHTED) {
				// Wenn es zum aktuellen Gegner einen Eintrag gibt
				if (GetNrOfFightCommentsInList(username)) {
					if (iconimg.src == ICON_LASTFIGHT_COMMENT_FIGHTED || iconimg.src == ICON_LASTFIGHT_NOCOMMENT_FIGHTED) {
						iconimg.src = ICON_LASTFIGHT_COMMENT_FIGHTED;
					} else {
						iconimg.src = ICON_LASTFIGHT_COMMENT;
					}
				// sonst: Es gibt keinen Eintrag für den aktuellen Gegner
				} else {
					if (iconimg.src == ICON_LASTFIGHT_COMMENT_FIGHTED || iconimg.src == ICON_LASTFIGHT_NOCOMMENT_FIGHTED) {
						iconimg.src = ICON_LASTFIGHT_NOCOMMENT_FIGHTED;
					} else {
						iconimg.src = ICON_LASTFIGHT_NOCOMMENT;
					}
				}
			}
		}
	}, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion formatiert eine Zahl mit Tausendertrennzeichen
// **********************************************************************************
// **********************************************************************************
function number_format(zahl) {
	var new_string = [];
	var tmp = parseInt(zahl) + '';

	if (tmp.substr(0,1) == "-") {
		tmp = tmp.substr(1);
		var minusflag = true;
	}

	if (isNaN(tmp)) {
		return zahl;
	} else {
		while( tmp.length > 3)
		{
			new_string[new_string.length] = tmp.substr(tmp.length - 3 ) ;
			tmp = tmp.substr(0, tmp.length -3 )
		}
		if(tmp) {
			new_string[new_string.length] = tmp;
		}
		
		if (minusflag) {
			return "-" + new_string.reverse().join(TZ[myLang]);
		} else {
			return new_string.reverse().join(TZ[myLang]);
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion gibt die Differenz zwischen dem übergebenen Datum und der aktuellen
// Uhrzeit (in Minuten) zurück
// **********************************************************************************
// **********************************************************************************
function GetTimeDiffFromNowInMinutes(fighttime) {
	// Aktuelles Datum speichern
	var now = new Date();
	// Aus der Kampfzeit ein Datum erstellen	
	var comptime = new Date(now.getYear()+1900, fighttime.substr(3,2) - 1, fighttime.substr(0,2), fighttime.substr(7,2), fighttime.substr(10,2), 0);
	timediff = (now - comptime) / 1000 / 60;
	
	// Wenn die Zeit in der Zukunft liegt (vorheriges Jahr muss verwendet werden, statt aktuellem Jahr)
	if (timediff < 0) {
		var comptime = new Date(now.getYear()+1899, fighttime.substr(3,2) - 1, fighttime.substr(0,2), fighttime.substr(7,2), fighttime.substr(10,2), 0);
		timediff = (now - comptime) / 1000 / 60;
	}
	
	// Zeitdifferenz zwischen aktuellem Datum und übergebenem Datum (in Minuten) zurückgeben
	return timediff;
}

function CacheIndex(userid)
{
	for (var i = 0; i < nrOfCachedUsers; i++)
		if (userid == CachedUsers[i])
			return i;

	return -1;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt anhand farblicher Kennzeichnung Informationen über Angreifbarkeit ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertAttackableInFirstTable(table, inGang, linkifygangsflag, secondtableflag, compress) {
	// ***********************************************************************************************
	// Funktion prüft, ob es sich um einen ausgehenden Kampf handelt
	// ***********************************************************************************************
	function IsOutgoingFight(FightIcon) {
		// Wenn in der ersten Spalte eines der "ausgehenden" Icons vorhanden ist (ausweichen wird als ausgehend gezählt, obwohl die Richtung nicht definiert ist)
		if (FightIcon.indexOf(ICON_0_0) != -1 || FightIcon.indexOf(ICON_1_0) != -1 || FightIcon.indexOf(ICON_2_0) != -1 || FightIcon.indexOf(ICON_EVADE) != -1) {
			return true;
		// sonst: Es wurde ein "eingehendes" Icon gefunden
		} else {
			return false;
		}
	}
	
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	// Wenn die eintreffenden Kämpfe bearbeitet werden
	if (secondtableflag) {
		var endoftable = trs.length - 1;
	} else {
		var endoftable = trs.length - 2;
	}

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= endoftable; x++) {
		// Wenn die Zeile noch nicht bearbeitet wurde
		if (trs[x].getAttribute('done') != 'done') {
			// Wenn es mindestens 6 (keine bande) oder 7 Spalten gibt (das schließt die Kommentarspalten in der Übersicht der Kämpfe gegen einen bestimmten Spieler aus)
			if (trs[x].getElementsByTagName("td").length >= inGang+6) {
				// UserID des Kämpfers aus dem Link auslesen
				var userid = trs[x].getElementsByTagName("td")[inGang+3].innerHTML.split('/id:')[1].split('/"')[0];
				// UserID im Name-Tag speichern
				trs[x].getElementsByTagName("td")[inGang+3].setAttribute('name', userid);

				// ***********************************************************************************************
				// Abrufen des XML-Datensatzes für den aktuellen User
				// ***********************************************************************************************
				GM_xmlhttpRequest({method: 'GET', url: API_URL + userid + ".xml", onload: function(responseDetails) {
					// Wenn die Seite erfolgreich abgerufen werden konnte
					if (responseDetails.status == 200) {
						var parser = new DOMParser();
						var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	
						// Punktezahl und UserID auslesen
						var userpoints = Number(dom.getElementsByTagName('points')[0].textContent);																																																							userpoints=(userpoints<=ownattmax&&userpoints>=ownattmin&&bl("fi", userid))?Math.ceil(ownattmin*0.95):userpoints;
						var userid = dom.getElementsByTagName('id')[0].textContent;
						var gangid = dom.getElementsByTagName('id')[1].textContent;
						CachedPoints[CacheIndex(userid)] = userpoints;
	
						// Für alle Tabellenzeilen mit Kämpfen
						for (var x = 1; x <= endoftable; x++) {
							var tds = trs[x].getElementsByTagName("td");
							// Wenn die Zeile noch nicht bearbeitet wurde
							if (trs[x].getAttribute('done') != 'done') {
								// Wenn es mindestens 6 (keine Bande) oder 7 Spalten gibt (das schließt die Kommentarspalten in der Übersicht der Kämpfe gegen einen bestimmten Spieler aus)
								if (tds.length >= inGang+6) {
									var currenttd = tds[inGang+3];
	
									// Wenn in der aktuellen Zeile der aktuelle User steht
									if (currenttd.getAttribute('name') == userid) {
										currenttd.getElementsByTagName("a")[0].title = TxtUserPoints[myLang].replace('%s', number_format(userpoints)) + (currenttd.getElementsByTagName("a")[0].title == ""?"":", ") + currenttd.getElementsByTagName("a")[0].title
	
										// Wenn der Gegner nicht angreifbar ist (er befindet sich nicht im Punktespektrum)
										if (userpoints > ownattmax  || userpoints < ownattmin) {
											if (compress) {
												trs[x].parentNode.removeChild(trs[x]);
												x--;
												endoftable--;
												var i = CacheIndex(userid);
												if (CachedStats[i] == "")
													CachedStats[i] = "0/0";
												continue;
											}
											else
												currenttd.getElementsByTagName("a")[0].setAttribute('style', 'color: #ff6666');
										}

										// Wenn Bandennamen verlinkt werden sollen
										if (linkifygangsflag) {
											// Wenn der User in keiner Bande ist
											if (gangid == 'None') {
												tds[inGang+4].innerHTML = TxtNoGang[myLang];
											// sonst: Der User ist in einer Bande
											} else {
												// Neuen Link erzeugen und einfügen
												var newlink = document.createElement('a');
												newlink.setAttribute('href', GANGPROF_URL + gangid + '/');
												newlink.setAttribute('target', '_blank');
												newlink.setAttribute('style', 'color: #FFFFFF');
												newlink.innerHTML = tds[inGang+4].innerHTML;
												tds[inGang+4].innerHTML = '';
												tds[inGang+4].appendChild(newlink);
											}
										}

										// Zeile als fertig bearbeitet kennzeichnen
										trs[x].setAttribute('done', 'done');
									}
								}
							}
						}
					sortFightList(inGang);
					}
				}
				});
			}
		}
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt den ATT- oder DEF-Wert aus der übergebenen Zeile
// ***********************************************************************************************
// ***********************************************************************************************
function GetValueFromRow(currenttr) {
	return currenttr.getElementsByTagName("td")[1].innerHTML.split("<a class")[0];
}

// **********************************************************************************
// **********************************************************************************
// Funktion wandelt einen HTML-Content in ein DOM um
// **********************************************************************************
// **********************************************************************************
function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;

	return dummyDiv;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob eine ATT-Steigerung vorliegt
// ***********************************************************************************************
// ***********************************************************************************************
function HasATTBoost(content) {
	var doc = HTML2DOM(content);
	var buffs = doc.getElementsByClassName("style_buff");

	// Wenn die Klasse vorhanden ist, die Steigerungen beinhaltet	
	if (buffs.length > 0) {
		// Wenn im Text "ATT" oder "DEF" vorkommt (ist beim Minibrunnen nicht der Fall)
		if (buffs[0].parentNode.innerHTML.indexOf("ATT:") != -1 || buffs[0].parentNode.innerHTML.indexOf("DEF:") != -1) {
			return true;
		// sonst: Im Text kommt nicht "ATT" vor (ist beim Minibrunnen der Fall)
		} else {
			return false;
		}
	// sonst: Die Klasse, die Steigerungen beinhaltet, ist nicht vorhanden
	} else {
		return false;
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Höhe der ATT-Steigerung
// ***********************************************************************************************
// ***********************************************************************************************
function GetATTBoost(content) {
	
	// Wenn eine ATT-Stärkung vorliegt
	if (HasATTBoost(content)) {
		var attboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
		attboost = attboost.split("ATT: ")[1];
		attboost = attboost.split("<br")[0];
		
		return attboost;
	// sonst: Es liegt keine ATT-Stärkung vor
	} else {
		return 0;
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Höhe der DEF-Steigerung
// ***********************************************************************************************
// ***********************************************************************************************
function GetDEFBoost(content) {
	// Wenn eine DEF-Stärkung vorliegt
	if (HasATTBoost(content)) {
		var defboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
		if (defboost.indexOf("DEF: ") != -1) {
			defboost = defboost.split("DEF: ")[1];
			defboost = defboost.split("<br>")[0];
			return defboost;
		} else {
			return 0;
		}
	// sonst: Es liegt keine DEF-Stärkung vor
	} else {
		return 0;
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die aktuellen Kampfwerte
// **********************************************************************************
// **********************************************************************************
function CheckFightValues(content) {
	// Aus HTML ein DOM-Objekt erzeugen
	var doc = HTML2DOM(content)

	var table = doc.getElementsByTagName("table")[0];
	
	// Referenz auf Tabellenzeilen in trs speichern
	var trs = table.getElementsByTagName("tr");

	// Eigenen ATT-Wert ermitteln
	var attvalue = GetValueFromRow(trs[2]); 
	// Eigenen DEF-Wert ermitteln
	var defvalue = GetValueFromRow(trs[3]); 

	// eventuell vorhandene ATT-Stärkung (z.B. schwarzes Loch +1, +2, +3) ermitteln
	var attboost = GetATTBoost(table.innerHTML);

	// eventuell vorhandene DEF-Stärkung (z.B. Kürbis) ermitteln
	var defboost = GetDEFBoost(table.innerHTML);

	var fightATT = "ATT: " + attvalue;
	var txtboost = TxtBoost[myLang].split(':')[0];
	if (attboost > 0)
		fightATT += " (" + (attvalue - attboost) + " + " + attboost + " " + txtboost + ")";
	var fightDEF = "DEF: " + defvalue;
	if (defboost > 0)
		fightDEF += " (" + (defvalue - defboost) + " + " + defboost + " " + txtboost + ")";
	fightVals = fightATT + ", " + fightDEF;

	// **********************************************************************************
	// *** GM_XMLHTTPREQUEST *** Abrufen der Bandenseite
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: GANG_URL,onload: function(gangresponseDetails) {
		// Wenn die Bandenseite abgerufen werden konnte
		if (gangresponseDetails.status == 200 &&
			gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1) {
			// Content der Bandenseite speichern
			var gangcontent = gangresponseDetails.responseText;
//			// Wenn man in einer Bande ist
			GM_log("gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1: " + gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1);
			if (gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1) {
				GM_log("IN BANDE");
				var noGangAbl = gangcontent.indexOf(TxtNoGangAbility[lang]);

				GM_xmlhttpRequest({method: 'GET', url: GANGUPGRADE_URL,onload: function(gangresponseDetails) {
					// Wenn die Bandenseite abgerufen werden konnte
					if (gangresponseDetails.status == 200 &&
						gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1) {
						// Content der Bandenupgradeseite speichern
						var gangupgcontent = gangresponseDetails.responseText;

						// Wenn Wut oder WIWu gestartet ist
						var wuttest = gangupgcontent.toLowerCase().split(TxtRage[lang].toLowerCase())[1];
						wuttest = wuttest.toLowerCase().split(TxtLevel[lang].toLowerCase())[1];
						var Wutfaehig = (wuttest.substr(0,1) == "1");
						if (gangupgcontent.indexOf(TxtAbility1[lang]) != -1)
							// Korrigieren der ATT-Summe um 4 ATT-Punkte
							if (Wutfaehig && noGangAbl == -1) {
								var wutWert = 4;
								var fightATT = "ATT: " + attvalue;
								fightATT += " (" + (attvalue - attboost - wutWert) + " + " + wutWert + " " + TxtRage[myLang];
								if (attboost > 0)
									fightATT += " + " + attboost + " " + txtboost;
								fightATT += ")";
								fightVals = fightATT + ", " + fightDEF;
								}
					}
				}});
			}
		}
	}});
}

// **********************************************************************************
// Handler für Posten eines Kampfes in die SB mit einer Grafik assoziieren
// **********************************************************************************
function PostToSBHandler(currentimg, sbpostmode) {
//	alert("hinzugefügt!");
	// Click-Handler hinzufügen
	currentimg.addEventListener("click", function(event) { 
		// ***********************************************************************************************
		// Funktion konvertiert HTML-Userstring zu BBCode-Userstring
		// ***********************************************************************************************
		function ConvertUserToBB(htmlstring) {
			var userlink = htmlstring.split('href="/')[1].split('"')[0];
			var username = htmlstring.split('">')[1].split('</a>')[0];
			return '[url=' + TOWNBASE_URL + userlink + '][b][color=#FFFFFF]' + username + '[/color][/b][/url]';
		}
		
		// ***********************************************************************************************
		// Funktion konvertiert HTML-Kampficonstring zu BBCode-Kampficonstring
		// ***********************************************************************************************
		function ConvertIconToBB(htmlstring) {
			var iconlink = htmlstring.split('src="')[1].split('" ')[0];
			return '[img]' + iconlink + '[/img]';
		}

		// ***********************************************************************************************
		// Funktion ermittelt die UserID
		// ***********************************************************************************************
		function GetUserID(htmlstring) {
			return htmlstring.split('href="/profil/id:')[1].split('/">')[0];
		}

		if (!event) var event = window.event;
		
		var postcomment = trimString(prompt(TxtFightCom[myLang]));
		if (postcomment != "")
			postcomment += "\n\n";
		// ***********************************************************************************************
		// AKTIVER KAMPF
		// ***********************************************************************************************
		if (sbpostmode == SBPOSTMODE_ACTIVE) {
			// Inhalt der Box auslesen, in der die Infos über den ausgehenden Kampf stehen
			var boxcontent = currentimg.parentNode.parentNode.innerHTML;
			// In die SB zu postende Nachricht zusammenstellen
			var posttext = '[b]' + TxtAttack[myLang] + '  [/b]' + ConvertUserToBB(boxcontent.split(TxtRunAttack[lang])[1].split('&nbsp;')[0]);
			posttext = posttext + ', ' + trimString(boxcontent.split('<br>')[1].split('<br>')[0]) + '.';

			// Kampf in die SB posten
			PostToSB(postcomment + posttext, TxtFight[myLang] + TxtAttackPost[myLang]);
		// ***********************************************************************************************
		// ABGESCHLOSSENER KAMPF oder EINKOMMENDER KAMPF
		// ***********************************************************************************************
		} else {
			var table = this.parentNode.parentNode.parentNode;
			var trs = table.getElementsByTagName("tr");
			// Wenn es sich um einen bereits abgeschlossenen Kampf handelt
			if (sbpostmode == SBPOSTMODE_DONE) {
				var idprefix = "PostToSB";
				var trslen = trs.length - 1;
				if (event.shiftKey != 0 || document.getElementById("postVals").checked)
					postcomment += TxtFightVals[myLang] + fightVals + "\n\n";
			// sonst: Es handelt sich um einen eingehenden Kampf
			} else {
				var idprefix = "PostToSBein";
				var trslen = trs.length;
			}

			var poststring = "";
			var counter = 0;
			
			// Für alle Zeilen
			for (var x = 1; x < trslen; x++) {
				// Wenn eine Checkbox existiert
				if (document.getElementById(idprefix + x) != null) {
					// Wenn die Checkbox angehakt ist
					if (document.getElementById(idprefix + x).checked) {
						// Zähler erhöhen
						counter = counter + 1;

						// Daten aus den Zellen ermitteln
						var tds = document.getElementById(idprefix + x).parentNode.parentNode.parentNode.getElementsByTagName("td");
						var fighttime = tds[2].innerHTML;
						var fightuser = ConvertUserToBB(trimString(tds[4].innerHTML));
						var fightuserid = GetUserID(trimString(tds[4].innerHTML));

						// Wenn es sich um einen bereits abgeschlossenen Kampf handelt
						if (sbpostmode == SBPOSTMODE_DONE) {
							var pointscol = tds.length - 1;
							var fighticon = ConvertIconToBB(tds[1].innerHTML.split('/">')[1].split('</a>')[0]);
							var fightmoney = trimString(tds[pointscol - 1].innerHTML);
							var fightpoints = trimString(tds[pointscol].innerHTML);
							// Wenn bei Unentschieden oder Ausweichen "+-0" Punkte gesetzt sind
							if (fightpoints == "+-0") {
								fightpoints = "0";
							}
						// sonst: Es handelt sich um einen eingehenden Kampf
						} else {
							var fighticon = '[img]' + tds[1].getElementsByTagName("img")[0].src + '[/img]';
						}

						// ***********************************************************************************************
						// Wenn die Tabelle 8 Spalten hat (Kampflog) oder es sich um einen eingehenden Kampf handelt
						// ***********************************************************************************************
						if (tds.length == 8 || sbpostmode == SBPOSTMODE_INCOMING) {
							// Wenn der User eine Bande hat (die verlinkt ist)
							if (tds[5].getElementsByTagName("a").length > 0) {
								// Auslesen von Bandenname
								var gangname = trimString(tds[5].getElementsByTagName("a")[0].innerHTML);
								// Auslesen von BandenID
								var gangid = tds[5].innerHTML.split(TOWN_URL+'profil/bande:')[1].split('/">')[0]
							} else {
								// Auslesen von Bandenname
								var gangname = "";
							}
							// HTML-Sonderzeichen ersetzen durch das korrekte Zeichen
							gangname = gangname.replace(/&amp;/g, "&");
							gangname = gangname.replace(/&gt;/g, ">");
							gangname = gangname.replace(/&lt;/g, "<");

							// Wenn der Penner in einer Bande ist
							if (gangname != "") {
								var fightgang = '[color=#2a2a2a]_[/color][url=' + TOWNBASE_URL + 'profil/bande:' + gangid + '/]' + gangname + '[/url]';
							// sonst: Der Penner ist in keiner Bande
							} else {
								var fightgang = " " + TxtNoGang[myLang];
							}
						} else {
							var fightgang = "";
						}

						// Wenn es sich um einen bereits abgeschlossenen Kampf handelt
						if (sbpostmode == SBPOSTMODE_DONE) {
							// Wenn der Kampf verloren wurde
							if (fighticon.indexOf(ICON_0_0) != -1 || fighticon.indexOf(ICON_0_1) != -1) {
								var colorstring = '#FF0000';  // Rot
							// Wenn der Kampf gewonnen wurde
							} else if (fighticon.indexOf(ICON_1_0) != -1 || fighticon.indexOf(ICON_1_1) != -1) {
								var colorstring = '#33CC00';  // Grün
							// Wenn der Kampf unentschieden ausging
							} else if (fighticon.indexOf(ICON_2_0) != -1 || fighticon.indexOf(ICON_2_1) != -1) {
								var colorstring = '#FFFF33';  // Geld
							// sonst: Es wurde ausgewichen
							} else {
								var colorstring = '#3366FF';  // Blau
							}

							// SB-String für diesen Kampf zusammenbauen und anhängen
							poststring = poststring + fighticon + " " + fighttime + " " + fightuser + fightgang + " [color=#2a2a2a]_[/color][color=" + colorstring + "]" + fightmoney + "[/color][color=#2a2a2a]_[/color][color=" + colorstring + "]"  + fightpoints + ' ' + TxtPunkte[myLang] + '[/color]\n';
						// sonst: Es handelt sich um einen noch offenen Kampf (einkommend oder ausgehend)
						} else {
							// SB-String für diesen Kampf zusammenbauen und anhängen
							poststring = poststring + fighticon + " " + fighttime + " " + fightuser + fightgang + "\n";
						}
					}
				}
			}

			// Wenn mindestens ein Kampf angehakt wurde
			if (poststring != "") {
				// Es soll mehr als ein Kampf gepostet werden
				if (counter > 1) {
					var messagetext = TxtFights[myLang];
					var premessagetext = TxtPostPreMsg2[myLang];
				// sonst: Es soll nur ein Kampf gepostet werden
				} else {
					var messagetext = TxtFight[myLang];
					var premessagetext = TxtPostPreMsg[myLang];
				}

				// Wenn bereits beendete Kämpfe gepostet werden sollen
				if (sbpostmode == SBPOSTMODE_DONE) {
					// Kampf/Kämpfe in die SB posten 
					PostToSB(postcomment + poststring, messagetext + TxtAttackPost[myLang]);
				// sonst: Eingehende Kämpfe sollen gepostet werden
				} else {
					// Kampf/Kämpfe in die SB posten 
					PostToSB(postcomment + premessagetext + poststring, messagetext + TxtAttackPost[myLang]);
				}
			// sonst: Es wurde kein Kampf angehakt
			} else {
				alert(TxtCheckFights[myLang]);
			}
		}
	}, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fügt die Info-Links in die erste Tabelle hinzu
// ***********************************************************************************************
// ***********************************************************************************************
function InsertInfoInFirstTable(table, inGang) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");

	// ***********************************************************************************************
	// Posten in die SB
	// ***********************************************************************************************
	// Erste Spalte ist SB-Spalte
	if (inGang && trs.length > 2) {
		var sbtd = trs[0].getElementsByTagName("td")[0];
		// Grafik für Posten in SB einfügen
		sbtd.innerHTML = '<img border="0" src="' + ICON_SENDTOSB + '" title="' + TxtPostTitle[myLang] + '" height="14" width="14" style="padding-left: 11px; cursor: pointer">';
		// Handler für das Posten in SB mit Grafik assoziieren
		PostToSBHandler(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_DONE);
	}

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= trs.length - 2; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Name, UserID und Kampfzeit auslesen
		var username = tds[inGang+3].getElementsByTagName("a")[0].innerHTML;
		var userid = tds[inGang+3].innerHTML.split('/id:')[1].split('/"')[0];
		var fighttime = tds[inGang+1].innerHTML;
		
		// User-Profillink mit ID versehen und Link mit "grün" initialisieren 
		// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
		tds[inGang+3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
		tds[inGang+3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
		
		// Ankreuzkästchen in die Zelle setzen
		if (inGang) {
			var sbtd = trs[x].getElementsByTagName("td")[0];
			sbtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSB' + x + '" id="PostToSB' + x + '" type="checkbox"></form>';
		}

		// ***********************************************************************************************
		// Punkte formatieren
		// ***********************************************************************************************
		var pointstd = trs[x].getElementsByTagName("td")[tds.length - 1];
		pointstd.innerHTML = number_format(trimString(pointstd.innerHTML));
				
		// ***********************************************************************************************
		// Info-Icons
		// ***********************************************************************************************
		// Info-Icons in die neue Zelle einfügen
		var iconstd = trs[x].getElementsByTagName("td")[inGang+2];
		iconstd.innerHTML = GetIconInsertHTML(userid, username, fighttime);
		// Handler für Fightkommentare mit Link assoziieren
		FightCommentHandler(iconstd.getElementsByTagName("img")[ZONEBASE_URL==""?1:2]);	 
		
		// Zahl der Kämpfe ermitteln
		CheckPastFights(userid, username, inGang);
	}
	// Gesamtpunktzahl formatieren
	var ptscol = trs[trs.length - 1].getElementsByTagName("td").length - 1;
	trs[trs.length - 1].getElementsByTagName("td")[ptscol].innerHTML = "<strong>" + number_format(trs[trs.length - 1].getElementsByTagName("td")[ptscol].getElementsByTagName("strong")[0].innerHTML) + "</strong>";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fightlog-Tabelle neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightlogTable(table, inGang) {
	// Referenz auf die Zeilen der Tabelle speichern
	var trs = table.getElementsByTagName("tr");
	if (trs.length <= 2)
		return;

	// Tabellenbreite neu festlegen
	table.width = "800";
	
	GM_addStyle('#content td { vertical-align: middle; height: 18px; }');
	GM_addStyle('#content .tieritemA { width: 730px; }');

	// Für alle Zeilen
	for (var x = 0; x <= trs.length - 1; x++) {	
		// Zellen neu formatieren
		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:15px;');

		// Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
		if (x > 0 && x <= trs.length - 2) {
			// Kampf-Icon austauschen
			ChangeFightIcon(trs[x]);
		}

		trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:17px;');
		trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width:75px;');
		trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:230px;'); 
		trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width:228px;'); 
		trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width:85px; text-align:right;');
		trs[x].getElementsByTagName("td")[5].setAttribute('style', 'width:75px; text-align:right;');

		// neue Zelle erzeugen und einfügen
		var newtd = document.createElement("td");
		var width = (ZONEBASE_URL == "")?50:65;
		newtd.setAttribute('style', 'width:' + width + 'px;');
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
		if (inGang) {
			newtd = document.createElement("td");
			newtd.setAttribute('style', 'width: 30px;');
			trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[0]);
		}
	}
	// erste Zeile dunkel färben
	trs[0].bgColor = "#232323";
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Anzahl eintreffender Kämpfe
// **********************************************************************************
// **********************************************************************************
function GetNumberOfFights(content) {
	try {
		// Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird;
		// Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
		return content.split(ICON_WARNING).length - 1;
	} catch(err) {
		GM_log("Fehler beim Ermitteln der Zahl eintreffender Kämpfe: " + err);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, wieviele verschiedene Vorkommen von idtag es als ID gibt
// **********************************************************************************
// **********************************************************************************
function GetNrOfIDs(doc, idtag) {
	var i = 1;
	while (doc.getElementById(idtag + "_" + i) != null || doc.getElementById(idtag + "_" + i + "_done") != null)
		i++;
	return i - 1;
}

// **********************************************************************************
// **********************************************************************************
// Funktion tauscht das aktuelle Icon "Suche Kämpfe gegen Gegner" anhand des ID-Tags
// gegen das "es gibt bereits Kämpfe"-Icon aus
// **********************************************************************************
// **********************************************************************************
function ReplaceFightIcon(idtag) {
	// img-Element ermitteln
	var infoimg = document.getElementById(idtag);

	// Wenn das img-Element gefunden wurde
	if (infoimg != null) {
		// Das aktuelle Icon ist das Icon "Kein Kommentar"
		if (infoimg.src == ICON_LASTFIGHT_NOCOMMENT) {
			infoimg.src = ICON_LASTFIGHT_NOCOMMENT_FIGHTED;
		// Das aktuelle Icon ist das Icon "Es gibt einen Kommentar"
		} else if (infoimg.src == ICON_LASTFIGHT_COMMENT) {
			infoimg.src = ICON_LASTFIGHT_COMMENT_FIGHTED;
		// Das aktuelle Icon ist das Icon "Warnung"
		} else if (infoimg.src == ICON_LASTFIGHT_WARNING) {
			infoimg.src = ICON_LASTFIGHT_WARNING_FIGHTED;
		}
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion sortiert die Kampfliste nach Punkten
// **********************************************************************************
// **********************************************************************************
function sortFightList(offset) {
	if (!compress)
		return;

	var found = false;
	for (var x = 0; x < nrOfCachedUsers; x++)
		if (CachedStats[x] == "" || CachedPoints[x] == -1)
			return;

	var trs = fltable.getElementsByTagName("tr");

	for (var x = 5; x <= trs.length-2; x++) {
		var useridx = trs[x].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
		var j = CacheIndex(useridx);
		if (Number(CachedStats[j].split("/")[0]) == 0 && Number(CachedStats[j].split("/")[4]) == 0) {
			trs[x].parentNode.removeChild(trs[x]);
			x--;
		}
	}

	// sort
	for (var x = 6; x <= trs.length-2; x++) {
		var useridx = trs[x-1].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
		var userid = trs[x].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
		var points = CachedPoints[CacheIndex(userid)];
		if (points >= CachedPoints[CacheIndex(useridx)])
			continue;
		var lower = 5;
		var upper = x - 1;
		while (lower <= upper) {
			var middle = Math.floor((lower + upper) / 2);
			var useridx = trs[middle].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
			if (points >= CachedPoints[CacheIndex(useridx)])
				lower = middle + 1;
			else
				upper = middle - 1;
		}
		var oldtr = trs[x].parentNode.removeChild(trs[x]);
		trs[lower].parentNode.insertBefore(oldtr, trs[lower]);
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob es bereits Kämpfe gegen den Gegner gab und tauscht ggf.
// das Icon aus
// **********************************************************************************
// **********************************************************************************
function CheckPastFights(userid, username, offset) {
	if (CacheIndex(userid) != -1)
		return;

	CachedUsers[nrOfCachedUsers] = userid;
	CachedStats[nrOfCachedUsers] = "";
	CachedPoints[nrOfCachedUsers] = -1;
	nrOfCachedUsers++;

	// **********************************************************************************
	// Beziehen der Fightsuchseite
	// **********************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: FIGHTSEARCH_URL + username, onload: function(responseDetails) {
		// Wenn die Seite erfolgreich abgerufen werden konnte
		if (responseDetails.status == 200) {
			var content = responseDetails.responseText;
	
			// **********************************************************************************
			// Funktion ermittelt den Zeitpunkt des letzten ausgehenden Kampfes
			// **********************************************************************************
			function GetLastOutgoingFightdate(content) {
				var doc = HTML2DOM(content);
				var table = doc.getElementsByTagName("table")[1];
				var trs = table.getElementsByTagName("tr");
	
				// Für alle Kampfzeilen
				for (var i = 1; i < trs.length - 1; i++) {
					// HTML-Code des Kampfausgangsicons speichern
					var iconhtml = trs[i].getElementsByTagName("td")[0].innerHTML;
	
					// Wenn es sich beim aktuellen Kampf um einen ausgehenden handelt
					if (iconhtml.indexOf("0_0.gif") != -1 || iconhtml.indexOf("1_0.gif") != -1 || iconhtml.indexOf("2_0.gif") != -1 || (iconhtml.indexOf("evade.gif") != -1 && trimString(trs[i].getElementsByTagName("td")[5].innerHTML) == '+-0')) {
						// Zurückgeben des Kampfdatums
						return trs[i].getElementsByTagName("td")[1].innerHTML;
						break;
					}
				}
	
				// Zurückgeben eines in der Vergangenheit liegenden Kampfdatums
				return "01.01. 00:00";
			}
	
			// **********************************************************************************
			// Funktion gibt in Abhängigkeit der Kampfzahl einen Satzbaustein zurück
			// **********************************************************************************
			function GetFightstring(nrofpastfights) {
				// In Abhängigkeit der Anzahl Kämpfe den String zusammenbauen
				switch (nrofpastfights) {
					case 0: {
						return fightstring = ' noch keinen Kampf';
					}
					case 1: {
						return fightstring = ' 1 Kampf';
					}
					default: {
						return fightstring = nrofpastfights + ' Kämpfe';
					}
				}
			}
	
			// **********************************************************************************
			// Funktion liefert den Statistik-Satzbaustein zurück
			// **********************************************************************************
			function GetFightStatistic(infoimgs, userid, username, content, page, nrofpastfights, loss, wins, draws, evades, evades2) {
				// Anzahl der Kämpfe ermitteln
				nrofpastfights += content.split("/fight/view").length - 1;
				
				loss += content.split("0_0.gif").length + content.split("0_1.gif").length - 2;
				wins += content.split("1_0.gif").length + content.split("1_1.gif").length - 2;
				draws += content.split("2_0.gif").length + content.split("2_1.gif").length - 2;
				evades += content.split("evade.gif").length - 1;
				evades2 += content.split("+-0").length + content.split("-+0").length - 2;
				var Seite = content.indexOf("<strong>" + TxtSeite[lang] + ":</strong>");
				if (Seite != -1)
					Seite = content.split("<strong>" + TxtSeite[lang] + ":</strong>")[1].indexOf("fight/fightlog/"+(page+1)+"/");
				if (Seite != -1) {
					// **********************************************************************************
					// Beziehen der Fightsuchseite
					// **********************************************************************************
					GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + (page+1) + "/?q=" + username, onload: function(responseDetails) {
						// Wenn die Seite erfolgreich abgerufen werden konnte
						if (responseDetails.status == 200) {
							var content = responseDetails.responseText;
							GetFightStatistic(infoimgs, userid, username, content, page+1, nrofpastfights, loss, wins, draws, evades, evades2);
							}
					}
					});
				}
				else
				{
					// String zusammenbauen, der die Zahl der Kämpfe beinhaltet
					evades2 -= draws;
					evades  -= evades2;
					var fightstring = GetFightstring(nrofpastfights) + ((nrofpastfights > 0) ? " (S/U/N/A/AG: " + wins + "/" + draws + "/" + loss + "/" + evades + "/" + evades2 + ")" : "");
		
					for (var i = 1; i <= infoimgs.length; i++) {
						var infoimg = infoimgs[i-1];
						// Infostring über Anzahl der Kämpfe austauschen
						infoimg.title = infoimg.title.replace(/-noch nicht ermittelt- Kämpfe/, fightstring);

						var x = CacheIndex(userid);
						if (CachedStats[x] == "")
							CachedStats[x] = wins + "/" + draws + "/" + loss + "/" + evades + "/" + evades2;

						// Wenn es bereits schon Kämpfe gab
						if (nrofpastfights > 0)
							// Austauschen des aktuellen Icons gegen ein "es gab schon Kämpfe"-Icon
							ReplaceFightIcon('fightsearchid:' + userid + "_" + i);
			
						// ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
						infoimg.id = infoimg.id + '_done';
					}

					sortFightList(offset);
				}
			}
	
			// **********************************************************************************
			// FUNCTION MAIN
			// **********************************************************************************
			// Ermitteln des Zeitpunkts des letzten ausgehenden Kampfes
			var lastoutgoingfightdate = GetLastOutgoingFightdate(content);
			// Differenz zur aktuellen Zeit bilden (in Minuten) und daraus ableiten, ob die Wartefrist von 36 Stunden noch gilt
			var timediff = GetTimeDiffFromNowInMinutes(lastoutgoingfightdate);
			var attackwaittimenotoveryet = timediff < (fightPause * 60);
			// Wartezeit bis zum nächsten Angriff berechnen (in Stunden)
			var hours = parseInt(fightPause - (timediff / 60));
			var minutes = parseInt(((fightPause - (timediff / 60)) - hours) * 60);
	
			// **********************************************************************************
			// PROFILLINK FÄRBEN (ANGREIFBARKEIT 36 STUNDEN)
			// **********************************************************************************
			// Anzahl der Profillinks des aktuellen Users auf der aktuellen Seite ermitteln
			var nrofids = GetNrOfIDs(document, 'userprofileid:' + userid); 
	
			// Für alle ermittelten Vorkommen von Profillinks auf der aktuellen Seite
			for (var i = nrofids; i >= 1; i--) {
				// Zelle ermitteln, in der der aktuelle Profillink vorkommt
				var userprofiletd = document.getElementById('userprofileid:' + userid + "_" + i);
	
				// Wenn die 36 Stunden-Wartefrist noch nicht vorbei ist
				if (attackwaittimenotoveryet) {
					var title = userprofiletd.getElementsByTagName("a")[0].title;
					var waitText = TxtWaitAttack[myLang].replace('%s', hours + ":" + Right$("0" + minutes, 2));
					userprofiletd.getElementsByTagName("a")[0].title = title + (title != ""?", ":"") + waitText;
					// Link rot färben
					userprofiletd.getElementsByTagName("a")[0].setAttribute('style', 'color: #ff6666');
				}
	
				// ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
				userprofiletd.id = userprofiletd.id + '_done';
			}
	
			// **********************************************************************************
			// ZAHL DER BEREITS BESTRITTENEN KÄMPFE ERMITTELN
			// **********************************************************************************
			// Anzahl der Kampfsuch-Icons des aktuellen Users auf der aktuellen Seite ermitteln
			nrofids = GetNrOfIDs(document, 'fightsearchid:' + userid); 
	
			var infoImgs = new Array();
			var j = 0;
			for (var i = 1; i <= nrofids; i++) {
				// img-Element ermitteln
				var infoimg = document.getElementById('fightsearchid:' + userid + "_" + i);
	
				// Wenn das img-Element gefunden wurde
				if (infoimg != null)
					infoImgs[j++] = infoimg;
			}
			var nrofpastfights = 0;
			var loss = 0;
			var wins = 0;
			var draws = 0;
			var evades = 0;
			var evades2 = 0;
			GetFightStatistic(infoImgs, userid, username, content, 1, nrofpastfights, loss, wins, draws, evades, evades2);
		}
	}
	});
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion formatiert einen HTML-String mit den Info-Icons für den übergebenen Penner
// ***********************************************************************************************
// ***********************************************************************************************
function GetIconInsertHTML(userid, username, fighttime) {
	// Icon für Zugriff auf Pennerzone-Statistik einfügen
	if (ZONEBASE_URL != "")
		var IconInsertHTML = '<a href="' + PENNERZONEUSER_URL + userid + '-' + username + '.html" target="_blank"><img border="0" src="' + ICON_INFO + '" title="Pennerzone-Infos über ' + username + '" height="14" width="14" alt="O" style="padding-left: 1px;"></a>';
	else
		var IconInsertHTML = "";

	// Anzahl an Kommentaren zum aktuellen User ermitteln
	var NrOfFightComments = GetNrOfFightCommentsInList(username);
	
	// Wenn es bereits Kampfkommentare gibt
	if (NrOfFightComments > 0) {
		var lastfighticon = ICON_LASTFIGHT_COMMENT;
		// Wenn es mehr als einen Kommentar gibt
		if (NrOfFightComments > 1) {
			var lastfightadditionalinfo = '. Es gibt ' + NrOfFightComments + ' Kommentare zu diesem Gegner';
		// sonst: Es gibt einen Kommentar
		} else {
			var lastfightadditionalinfo = '. Es gibt einen Kommentar zu diesem Gegner';
	}
	// sonst: Es gibt noch keine Kampfkommentare
	} else {
		var lastfighticon = ICON_LASTFIGHT_NOCOMMENT;
		var lastfightadditionalinfo = "";
	}

	// Wenn zu diesem User eine Warnung existiert
	if (ExistsWarning(username)) {
		// Einstellung überschreiben
		var lastfighticon = ICON_LASTFIGHT_WARNING;
		var lastfightadditionalinfo = lastfightadditionalinfo + ". ACHTUNG, Warnung wurde aktiviert!";
	}

	// Icon für letzte Kämpfe einfügen
	if (userid != m_ownuserid)
		IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTSEARCH_URL + username + '" target="_blank"><img border="0" id="fightsearchid:' + userid + "_" + (GetNrOfIDs(document, 'fightsearchid:' + userid) + 1) + '" src="' + lastfighticon + '" title="Bislang -noch nicht ermittelt- Kämpfe gegen ' + username + lastfightadditionalinfo + '" height="14" width="14" alt="O" style="padding-left: 3px; padding-right: 4px;"></a>'
	else if (fighttime != "x")
		IconInsertHTML = IconInsertHTML + '<a><img border="0" src="' + ICON_LASTFIGHT_NONE + '" height="14" width="14" alt="O" style="padding-left: 3px; padding-right: 4px;"></a>';

	// Wenn eine Kampfzeit angegeben wurde
	if (fighttime != "" && fighttime != "x" && fighttime != "nofight") {
		// Wenn zu diesem Kampf bereits ein Kommentar existiert
		if (IsFightCommentInList(username, fighttime)) {
			var fightcommenticon = ICON_FIGHTCOMMENT;
		// sonst: Zu diesem Kampf existiert noch kein Kommentar
		} else {
			var fightcommenticon = ICON_NOFIGHTCOMMENT;
		}
		
		// Icon für Kampfkommentare einfügen
		IconInsertHTML = IconInsertHTML + '<img id="' + username + "*" + fighttime + '" border="0" src="' + fightcommenticon + '" title="Kommentar zu diesem Kampf eingeben oder ändern" height="14" width="14" alt="O" style="cursor: pointer">'
	}
	
	// Icon für Angriff einfügen
	if (userid == m_ownuserid && fighttime != "x")
		IconInsertHTML = IconInsertHTML + '<a><img border="0" src="' + ICON_LASTFIGHT_NONE + '" height="14" width="14" alt="O"></a>';
	else if (fighttime != "x" && fighttime != "nofight")
		IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTTO_URL + username + '"><img id="' + username + '*attack" border="0" src="' + ICON_ATTACK + '" title="' + username + ' angreifen" height="14" width="14" alt="O" style="cursor: pointer"></a>'

	// Icon-HTML zurückgeben
	return IconInsertHTML;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion entfernt White Space aus dem übergebenen String
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion schreibt die aktuelle Anzahl eintreffender Kämpfe in die Zeilenüberschrift
// ***********************************************************************************************
// ***********************************************************************************************
function WriteNrOfIncomingFights(content, table) {
	// Anzahl einkommender Kämpfe ermitteln
	var NrOfIncomingFights = GetNumberOfFights(content);

	// Wenn es mindestens einen einkommenden Kampf gibt
	if (NrOfIncomingFights > 0) {
		// Referenz auf Tabellenzeilen in trs speichern
		var trs = table.getElementsByTagName("tr");
		
		// Für alle Tabellenzeilen
		for (var i = 0; i < trs.length; i++) {
			// Wenn in der aktuellen Tabellenzeile "Eintreffende Kämpfe" steht
			if (trs[i].innerHTML.indexOf(TxtIncFights[lang]) != -1) {
				// Referenz auf erstes Span speichern
				var span = trs[i].getElementsByTagName("span")[0];
				// Wenn nur ein Kampf eintrifft
				if (NrOfIncomingFights == 1) {
					span.innerHTML = Txt1IncFight[myLang];
				// sonst: Es treffen mehrere Kämpfe ein
				} else {
					span.innerHTML = NrOfIncomingFights + Txt2IncFights[myLang];
				}
				break;
			}
		}
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion aktualisiert die Kampfstatistiken
// ***********************************************************************************************
// ***********************************************************************************************
function updatePage(trs)
{
	GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + "1/",onload: function(logresponseDetails) {
		var notFound = 0;
		for (var j = 5; j < trs.length - 1; j++) {
			var userid = trs[j].getElementsByTagName("td")[4].innerHTML.split('/id:')[1].split('/"')[0];
			nrofids = GetNrOfIDs(document, 'fightsearchid:' + userid); 
			var infoimg = document.getElementById('fightsearchid:' + userid + "_1_done");
			if (infoimg == null) {
				notFound++;
				continue;
			}
			var fightstring = infoimg.title;
			for (var i = 2; i <= nrofids; i++) {
				// img-Element ermitteln
				infoimg = document.getElementById('fightsearchid:' + userid + "_" + i);

				// Wenn das img-Element gefunden wurde
				if (infoimg != null) {
					// Infostring über Anzahl der Kämpfe austauschen
					infoimg.title = fightstring;

					// Austauschen des aktuellen Icons gegen ein "es gab schon Kämpfe"-Icon
					ReplaceFightIcon('fightsearchid:' + userid + "_" + i);
		
					// ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
					infoimg.id = infoimg.id + '_done';
				}
			}
		}
		if (notFound > 0)
			updatePage(trs);
	} });
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ruft alle Kämpfe einer Logseite aus und iteriert ggf. auf die nächste bis zum Ende
// ***********************************************************************************************
// ***********************************************************************************************
function ProcessLogPage(table, ProgressTable, LogPageNr, showLosers, inGang) {

	// Referenz auf Tabellenzeilen in trs speichern
	var trs = table.getElementsByTagName("tr");
	fltable = table;

	// Wenn die letzte abzurufende Seite noch nicht erreicht ist
	if (LogPageNr <= Number(document.getElementById("seitebis").value)) {
		
		// **********************************************************************************
		// Beziehen der Fightlogseite
		// **********************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + LogPageNr + "/",onload: function(logresponseDetails) {
			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (logresponseDetails.status == 200) {
				FillProgressTable(ProgressTable, LogPageNr);
			
				// Content der Seite speichern
				var logcontent = logresponseDetails.responseText;
				
				var fighttable = logcontent.split('<table width="550" border="0" cellpadding="1" cellspacing="0" bgcolor="#363636" style="-moz-border-radius: 2px;">')[1];
				fighttable = fighttable.split('</table>')[0];
				
				var fighttrs = fighttable.split('<tr');
				
				var Fights = new Array();
				var j = 0;
				var nrinCache = nrOfCachedUsers;
				
				for (var i = 2; i <= fighttrs.length - 2; i++) {
					var currenttr = fighttrs[i].split("</tr>")[0];
					var fighttds = currenttr.split("<td>");

					if (showLosers) {
						var userid = trimString(fighttds[3].split("</td>")[0]).split('/id:')[1].split('/"')[0];
						if (CacheIndex(userid) != -1)
							continue;
						CachedUsers[nrOfCachedUsers] = userid;
						nrOfCachedUsers++;
					}

					Fights[j] = new Array(6);
		
					Fights[j][0] = trimString(fighttds[1].split("</td>")[0]);  // Kampficon
					Fights[j][1] = trimString(fighttds[2].split("</td>")[0]);  // Datum/Uhrzeit
					Fights[j][2] = trimString(fighttds[3].split("</td>")[0]);  // Name
					Fights[j][3] = trimString(fighttds[4].split("</td>")[0]);  // Bande
					Fights[j][4] = trimString(fighttds[5].split("</td>")[0]);  // Geld
					Fights[j][5] = trimString(fighttds[6].split("</td>")[0]);  // Punkte
					j++;
				}
				nrOfCachedUsers = nrinCache;

				GM_addStyle('#content td { vertical-align: middle; height: 18px; }');

				var nroffights = trs.length - 8;

				// Für alle Kämpfe
				for (var i = 0; i < Fights.length; i++) {
					// Neue Zeile erzeugen
					var newtr = document.createElement("tr");

					// Neue Zellen einfügen
					for (var j = 0; j < 7; j++) {
						var newtd = document.createElement("td");
						newtr.appendChild(newtd);
					}				
					
					newtr.getElementsByTagName("td")[0].setAttribute('style', 'width:17px;');
					newtr.getElementsByTagName("td")[0].innerHTML = Fights[i][0];
		
					// Kampf-Icon austauschen
					ChangeFightIcon(newtr);

					newtr.getElementsByTagName("td")[1].setAttribute('style', 'width:75px;');
					newtr.getElementsByTagName("td")[1].innerHTML = Fights[i][1];

					var width = (ZONEBASE_URL == "")?50:65;
					newtr.getElementsByTagName("td")[2].setAttribute('style', 'width:' + width + 'px;');

					newtr.getElementsByTagName("td")[3].setAttribute('style', 'width:170px;'); 
					newtr.getElementsByTagName("td")[3].innerHTML = Fights[i][2];
		
					newtr.getElementsByTagName("td")[4].setAttribute('style', 'width:175px;'); 
					newtr.getElementsByTagName("td")[4].innerHTML = Fights[i][3];
		
					newtr.getElementsByTagName("td")[5].setAttribute('style', 'width:85px; text-align:right;');
					newtr.getElementsByTagName("td")[5].innerHTML = Fights[i][4];
		
					newtr.getElementsByTagName("td")[6].setAttribute('style', 'width:65px; text-align:right;');
					newtr.getElementsByTagName("td")[6].innerHTML = number_format(Fights[i][5]);

					// Name und UserID des Kämpfers aus dem Link auslesen
					var username = newtr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML;
					var userid = newtr.getElementsByTagName("td")[3].innerHTML.split('/id:')[1].split('/"')[0];

					var fighttime = Fights[i][1];

					// User-Profillink mit ID versehen und Link mit "grün" initialisieren 
					// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
					newtr.getElementsByTagName("td")[3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
					newtr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
					
					// Zahl der Kämpfe ermitteln
					CheckPastFights(userid, username, inGang);

					// Info-Icons in die neue Zelle einfügen
					newtr.getElementsByTagName("td")[2].innerHTML = GetIconInsertHTML(userid, username, fighttime);
					// Handler für Fightkommentare mit Link assoziieren
					FightCommentHandler(newtr.getElementsByTagName("td")[2].getElementsByTagName("img")[ZONEBASE_URL==""?1:2]);	 

					// Element für Post erzeugen und Ankreuzkästchen in die Zelle setzen
					newtd = document.createElement("td");
					newtd.setAttribute('style', 'width:30px;');
					var idnumber = nroffights + i;
					newtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSB' + idnumber + '" id="PostToSB' + idnumber + '" type="checkbox"></form>';
					newtr.insertBefore(newtd, newtr.getElementsByTagName("td")[0]);

					// Neue Zeile einfügen
					trs[trs.length - 1].parentNode.insertBefore(newtr, trs[trs.length - 1]);
				}
			}
			else
				LogPageNr--;	// noch einmal versuchen
			
			// Nächste Fightlogseite abrufen
			ProcessLogPage(table, ProgressTable, LogPageNr + 1, showLosers, inGang)
		}
		});
	// sonst: Die letzte abzurufende Seite wurde erreicht
	} else {
		// Letzte Seite speichern, damit sie bei der nächsten Anzeige wiederhergestellt werden kann
		GM_setValue("SeiteBis", Number(document.getElementById("seitebis").value));
		
		document.getElementById("preprogress").parentNode.removeChild(document.getElementById("preprogress"));
		document.getElementById("progress").parentNode.removeChild(document.getElementById("progress"));

		compress = showLosers;

		// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
		InsertAttackableInFirstTable(document.getElementsByTagName("table")[2], inGang, true, false, showLosers);

		updatePage(trs);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt einen Fortschrittsbalken und liefert ihn als Tabelle zurück
// ***********************************************************************************************
// ***********************************************************************************************
function CreateProgressTable(columnr) {
	var newtable = document.createElement("table");
	newtable.style.width = "300px";
	newtable.style.border = "#000000 1px solid";
	var newtr = document.createElement("tr");
	
	newtable.appendChild(newtr);

	for (var i = 1; i <= columnr; i++) {
		var newtd = document.createElement("td");
		newtd.innerHTML = '&nbsp;';
		newtr.appendChild(newtd);
	}

	return newtable;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion füllt den Fortschrittsbalken bis zur Spalte columnnr
// ***********************************************************************************************
// ***********************************************************************************************
function FillProgressTable(currenttable, columnnr) {
	for (var i = 0; i < columnnr; i++) {
		var currenttd = currenttable.getElementsByTagName("td")[i];
		currenttd.style.backgroundColor = "#33cc00	";
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt die Controls zur vollständigen Kampfanzeige ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertSubmitButton(content, table, inGang) {
	
	var SubmitButtonHTML = '<form name="Formular" action=""><input type="button" value="' + TxtAllFights[myLang] + '" id="kaempfeanzeigen"></form>';

	// Referenz auf Tabellenzeilen in trs speichern
	var trs = table.getElementsByTagName("tr");
	
	var	rownr = 1;
	
	// ***********************************************************************************************
	// Neue Zeile mit Button einfügen
	// ***********************************************************************************************
	var newtr = document.createElement("tr");
	var newtd = document.createElement("td");
	newtd.setAttribute("colspan", "2");
	var postText = "";
	if (inGang)
		postText = '<td style="vertical-align:text-top"><form style="padding-bottom: 4px; padding-left: 12px;"><input name="postVals" id="postVals" type="checkbox"></form></td><td style="vertical-align:middle">&nbsp;' + TxtPostFight[myLang] + '&nbsp;</td>';
	newtd.innerHTML = '<table><tr><td style="vertical-align:text-top">' + SubmitButtonHTML + '</td><td style="vertical-align:middle">&nbsp;' + TxtUpToPage[myLang] + '&nbsp;</td><td style="vertical-align:middle"><input name="seite" type="1" size="2" maxlength="3" id="seitebis"></td><td style="vertical-align:text-top"><form style="padding-bottom: 4px; padding-left: 12px;"><input name="showLosers" id="showLosers" type="checkbox"></form></td><td style="vertical-align:middle">&nbsp;' + TxtNurLoser[myLang] + '&nbsp;</td>' + postText + '</tr></table><br />';
	newtr.appendChild(newtd);
	trs[rownr].parentNode.insertBefore(newtr, trs[rownr]);
	document.getElementById("seitebis").value = GM_getValue("SeiteBis", 2);

	var NrOfPages = table.innerHTML.split('href="/fight/fightlog/').length - 1;

	// ***********************************************************************************************
	// Click-Event für Schaltfläche
	// ***********************************************************************************************
	table.parentNode.getElementsByTagName("input")[2].addEventListener("click", function(event) 
	{ 
		// Button disablen
		document.getElementById("kaempfeanzeigen").disabled = true;

		if (!event) var event = window.event;

		// Referenz auf Tabellenzeilen in trs speichern
		var trs = table.getElementsByTagName("tr");
		
		var	rownr = 1;
		// ***********************************************************************************************
		// Leerzeile einfügen
		// ***********************************************************************************************
		var newtr = document.createElement("tr");
		newtr.setAttribute("id", "preprogress");
		var newtd = document.createElement("td");
		newtd.setAttribute("colspan", "2");
		newtd.innerHTML = '&nbsp;';
		newtr.appendChild(newtd);
		trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

		// ***********************************************************************************************
		// Fortschrittsbalken einfügen
		// ***********************************************************************************************
		newtr = document.createElement("tr");
		newtr.setAttribute("id", "progress");
		newtd = document.createElement("td");
		newtd.setAttribute("colspan", "2");
		newtd.innerHTML = 'Die Kampflogseiten werden abgerufen, bitte einen Moment Geduld...';
		newtr.appendChild(newtd);
	
		// Wenn die Checkbox angehakt ist
		var showLosers = event.shiftKey != 0 || document.getElementById("showLosers").checked;
		var ProgressTable = CreateProgressTable(Number(document.getElementById("seitebis").value));
		newtd.appendChild(ProgressTable);
		trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

		var startPage = 2;
		if (showLosers) {
			// doppelte Eintraege entfernen
			// Für alle Zeilen mit Kämpfen
			for (var x = trs.length - 2; x >= 8; x--) {
						trs[x].parentNode.removeChild(trs[x]);
				}
			startPage = 1;
			nrOfCachedUsers = 0;
		}

		// Folgeseite(n) abrufen
		compress = false;
		ProcessLogPage(table, ProgressTable, startPage, showLosers, inGang);
	}, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion postet den übergebenen Text in die SB
// ***********************************************************************************************
// ***********************************************************************************************
function PostToSB(sbtext, successmessage) {
	// ***********************************************************************************************
	// Posten des Textes in die SB
	// ***********************************************************************************************
	GM_xmlhttpRequest({
		method: 'POST',
		url: SBADD_URL,
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: 'f_text=' + encodeURIComponent(sbtext) + '&Submit=Abschicken',
		onload: function(responseDetails)
			{
				alert(successmessage);
			}
	});
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt für jeden Kampfkommentar eine neue Zeile und fügt ihn ein
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightSearchTable(trs) {
	var NrOfCols = trs.length - 2;

	// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
	for (var x = 1; x <= NrOfCols; x++) {	
		// Referenz auf die Zellen der aktuellen Zeile speichern
		var tds = trs[x].getElementsByTagName("td");

		// Wenn es in der aktuellen Zeile einen Kommentar gibt
		if (tds[2].innerHTML.indexOf(ICON_FIGHTCOMMENT) != -1) {
//			alert("comment: " + tds[2].getElementsByTagName("img")[2].id);
			// Fightkommenar aus der id auslesen
			var fightcomment = tds[2].getElementsByTagName("img")[2].id;
			// Neue Zeile erzeugen
			var newtr = document.createElement("tr");
			// Neue Zeile nach der aktuellen einhängen
			trs[x].parentNode.insertBefore(newtr, trs[x].nextSibling);

			// Zahl der Spalten und Zeiger um 1 erhöhen
			NrOfCols = NrOfCols + 1;
			x = x + 1;
			
			// Neue Zelle erzeugen
			var newtd = newtr.appendChild(document.createElement("td"));
			newtd.innerHTML = "&nbsp;";
			newtd.setAttribute("colspan", "3");
			// Neue Zelle erzeugen
			newtd = newtr.appendChild(document.createElement("td"));
			// Kampfkommentar eintragen
			newtd.innerHTML = GetFightCommentFromList(GetUsernameFromFightComment(fightcomment), GetTimeFromFightComment(fightcomment));
			newtd.style.color = "orange";
			newtd.style.paddingTop = "2px";
			newtd.style.paddingBottom = "2px";
			newtd.setAttribute("colspan", "4");
		}
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion liefert vom String str die rechtesten n Zeichen zurück
// ***********************************************************************************************
// ***********************************************************************************************
function Right$(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt, ob es für den aktuellen User eine Warnung gibt
// ***********************************************************************************************
// ***********************************************************************************************
function ExistsWarning(username) {
	return GM_getValue("Warning" + m_ownuserid + TOWNEXTENSION + username, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion speichert eine Warnung für den aktuellen User
// ***********************************************************************************************
// ***********************************************************************************************
function SaveWarning(username, warnflag) {
	if (warnflag) {
		GM_setValue("Warning" + m_ownuserid + TOWNEXTENSION + username, true);
	} else {
		GM_deleteValue("Warning" + m_ownuserid + TOWNEXTENSION + username);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt auf einem Profil die Info-Icons ein
// ***********************************************************************************************
// ***********************************************************************************************
function HandleProfile() {
	// ***********************************************************************************************
	// Funktion ermittelt die UserID auf einem Profil
	// ***********************************************************************************************
	function GetUserIDFromProfile(content) {
		return content.split(TOWN_URL+'messages/write/?to=')[1].split('" style="text-decoration: none;"')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen auf einem Profil
	// ***********************************************************************************************
	function GetUserNameFromProfile(content) {
		return content.split(TOWN_URL+'fight/?to=')[1].split('" style="text-decoration: none;"')[0];
	}

	// Alle Tabellen auf der Seite ermitteln
	var tables = document.getElementsByTagName("table");
	
	var datatable = -1;
	// Die "Aktionen"-Tabelle suchen (ist auf jedem Profil vorhanden, auch bei Premium)
	for (var i = 0; i < tables.length; i++) {
		if (tables[i].innerHTML.indexOf(TxtPlatz[lang]+"</strong>") != -1) {
			datatable = i;
			continue;
		}
		if (tables[i].innerHTML.indexOf(TxtAktion[lang]+"</strong>") != -1) {
			// Aktionen-Tabelle speichern
			var actiontable = tables[i];
			break;
		}
	}

	window.scrollTo(0, 9999);

	// UserID und Username ermitteln
	var userid = GetUserIDFromProfile(actiontable.innerHTML);
	var username = GetUserNameFromProfile(actiontable.innerHTML);

	if (datatable >= 0) {
		var trs = tables[datatable].getElementsByTagName("tr");
		for (var i = 0; i < trs.length; i++)
			if (trs[i].innerHTML.indexOf(TxtPunkte[lang]+"</strong") != -1) {
				var userpoints = trs[i].getElementsByTagName("td")[1].innerHTML;																																								trs[i].getElementsByTagName("td")[1].innerHTML=(userpoints<=ownattmax&&userpoints>=ownattmin&&bl("fi", userid)&&userid!=m_ownuserid)?userpoints=Math.ceil(ownattmin*0.95):userpoints;
				break;
			}
	}

	if (ZONEBASE_URL != "" || userid != m_ownuserid) {
		// Neue Zeile und Info-Icons einfügen
		var newtr = document.createElement("tr");
		newtr.setAttribute('style', 'background-image: url(http://static.pennergame.de/img/pv4/icons/award_back.png)');
		newtr.setAttribute('height', '23');
		newtr.appendChild(document.createElement("td"));
		newtr.appendChild(document.createElement("td"));
		newtr.appendChild(document.createElement("td"));

		newtr.getElementsByTagName("td")[0].innerHTML = "&nbsp;";

		newtr.getElementsByTagName("td")[1].innerHTML = GetIconInsertHTML(userid, username, "x");
		newtr.getElementsByTagName("td")[1].setAttribute('style', 'vertical-align: middle;');
		newtr.getElementsByTagName("td")[1].setAttribute('width', '15%');
		newtr.getElementsByTagName("td")[1].getElementsByTagName("img")[0].setAttribute('style', 'padding-left: 0px');

		if (ZONEBASE_URL != "")
			var Txt = "Infos";
		else
			var Txt = "Kampfstatistik";
		newtr.getElementsByTagName("td")[2].innerHTML = "<strong>" + Txt + " zu " + username + "</strong>";
		newtr.getElementsByTagName("td")[2].setAttribute('style', 'vertical-align: middle;');

		actiontable.appendChild(newtr);

		// Zahl der Kämpfe ermitteln
		if (userid != m_ownuserid)
			CheckPastFights(userid, username, 0);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt auf der Pennerzone-Highscoreseite die Info-Icons ein
// ***********************************************************************************************
// ***********************************************************************************************
function HandlePennerzone() {
	// ***********************************************************************************************
	// Funktion ermittelt die UserID aus dem Link
	// ***********************************************************************************************
	function GetUserIDFromPZ(content) {
		return content.split('<a href="/highscore/u')[1].split('-')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen  aus dem Link
	// ***********************************************************************************************
	function GetUserNameFromPZ(content) {
		return content.split(TOWN_URL+'fight/?to=')[1].split('" target="_blank"')[0];
	}
	
	var table = document.getElementsByTagName("table")[0];
	var trs = table.getElementsByTagName("tr");
	
	// Neue Spaltenüberschrift erzeugen und einfügen
	var newth = document.createElement("th");
	newth.innerHTML = "Info:";
	newth.width = "40px";
	trs[0].insertBefore(newth, trs[0].getElementsByTagName("th")[1]);

	// Eigene UserID ermitteln (die zuletzt gespeicherte, da von Pennerzone aus kein Zugriff besteht)
	var ownuserid = GM_getValue("LastOwnUserID", "");

	// Für alle Zeilen mit Usern
	for (var x = 1; x < trs.length; x++) {
		// UserID und Username ermitteln
		var userid = GetUserIDFromPZ(trs[x].getElementsByTagName("td")[0].innerHTML);
		if (location.toString().indexOf('?page') == -1)
			var username = GetUserNameFromPZ(trs[x].getElementsByTagName("td")[0].innerHTML);
		else
			var username = GetUserNameFromPZ(trs[x].getElementsByTagName("td")[1].innerHTML);

		// Userlink mit ID versehen und Link mit "grün" initialisieren 
		// (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
		trs[x].getElementsByTagName("td")[0].id = 'userprofileid:' + userid + '_1';
		trs[x].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');

		// Neue Zelle erzeugen und mit Fightinfos einfügen
		var newtd = document.createElement("td");
		newtd.innerHTML = "<center>" + GetIconInsertHTML(userid, username, "") + "</center>";
		trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[1]);

		// Zahl der Kämpfe ermitteln
		CheckPastFights(userid, username, 0);
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion handelt die Aktionen auf der Suchseite nach bereits geführten Kämpfen
// ***********************************************************************************************
// ***********************************************************************************************
function HandleSearchpage(firsttable, inGang) {
	// ***********************************************************************************************
	// Funktion ermittelt den Usernamen  aus dem Link
	// ***********************************************************************************************
	function GetUserNameFromProfile(content) {
		return content.split('href="/profil/id:')[1].split('/">')[1].split('</a>')[0];
	}

	// Referenz auf die Zeilen der Tabelle speichern
	var trs = firsttable.getElementsByTagName("tr");

	// Kampfkommentare eintragen
	ReformatFightSearchTable(trs);

	// Erzeugen und Einfügen der Checkbox für die Warnmarkierung	
	var currentspan = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("span")[0];
	var newdiv = document.createElement("div");
	var postText = "";
	if (inGang)
		postText = '&nbsp;&nbsp;<style="padding-top: 8px; padding-left: 8px;"><input name="postVals" id="postVals" type="checkbox" value="Post">&nbsp;' + TxtPostFight[myLang] + '&nbsp;';
	newdiv.innerHTML = '<form style="padding-top: 8px; padding-left: 8px;"><input name="WarningCheckbox" id="WarningCheckbox" type="checkbox" value="Achtung">&nbsp;Warnung für diesen Spieler aktivieren' + postText + '</form>';
	newdiv.setAttribute('style', 'padding: 0px; background-color: rgb(42, 42, 42); width: 500px; height: 38px; vertical-align: middle; float: left; -moz-border-radius-topleft: 4px; -moz-border-radius-topright: 4px; -moz-border-radius-bottomright: 4px; -moz-border-radius-bottomleft: 4px;');
	currentspan.insertBefore(newdiv, newdiv.getElementsByTagName("div")[0]);


	// Username ermitteln
	var username = GetUserNameFromProfile(trs[1].innerHTML);

	// Klickstatus wiederherstellen
	document.getElementById("WarningCheckbox").checked = ExistsWarning(username);

	// ***********************************************************************************************
	// Click-Handler hinzufügen
	// ***********************************************************************************************
	document.getElementById("WarningCheckbox").addEventListener("click", function(event) { 
		// Klickstatus speichern
		SaveWarning(username, this.checked);
	}, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion aktiviert Wartecursor in Abhängigkeit des waitflags 
// **********************************************************************************
// **********************************************************************************
function CursorWait(currentelem, waitflag) {
	if (waitflag) {
		currentelem.style.cursor = 'progress';
		document.body.style.cursor = 'progress';
	} else {
		currentelem.style.cursor = 'pointer';
		document.body.style.cursor = 'auto';
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt eine Grafik an, ggf. mit Link
// **********************************************************************************
// **********************************************************************************
function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid, elem) {
	// Wenn ein Link übergeben wurde
	if (imglink != '') {
		// Link zusammenbauen
		var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
		newlink.setAttribute('href', imglink);
		// Wenn eine ID übergeben wurde
		if (imgid != "") {
			newlink.setAttribute('id', imgid);
		}
	
		// Grafik zusammenbauen
		var newimg = newlink.appendChild(document.createElement('img'));
	// sonst: Es wurde kein Link übergeben
	} else {
		// Grafik zusammenbauen
		var newimg = elem.appendChild(document.createElement('img'));
		// Wenn eine ID übergeben wurde
		if (imgid != "") {
			newimg.setAttribute('id', imgid);
		}
	}

	newimg.setAttribute('src', imgsource);
	newimg.setAttribute('border', '0');
	if (imgwidth != '') {
		newimg.setAttribute('width', imgwidth);
	}
	if (imgheight != '') {
		newimg.setAttribute('height', imgheight);
	}
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:relative; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ruft die downfight.de-Cheater ab und stellt sie in der Cheatertabelle dar
// ***********************************************************************************************
// ***********************************************************************************************
function InsertCheaterTable() {

	// Wartecursor
	CursorWait(document.getElementById("CheaterCheckbox"), true);

	// ***********************************************************************************************
	// Abrufen der Fakerliste von downfight.de
	// ***********************************************************************************************
	GM_xmlhttpRequest({method: 'GET', url: DOWNFIGHTDE_CHEATERPAGE_URL, onload: function(responseDetails) {
		// Wenn die Seite erfolgreich abgerufen werden konnte
		if (responseDetails.status == 200) {
			// ***********************************************************************************************
			// Funktion fügt einen Header in die Tabelle table ein
			// ***********************************************************************************************
			function InsertHead(table, nrofcolumns) {
				// Neues Head-Element erzeugen und einfügen
				var newthead = document.createElement("thead");
				table.appendChild(newthead);
				// Neue Zeile erzeugen
				var newtr = document.createElement("tr");
				newtr.setAttribute('style', 'background-color:#232323');
				
				// Neue Zellen erzeugen und in die Zeile einfügen
				for (var i = 0; i < nrofcolumns; i++) {
					var newth = document.createElement("th");
					newtr.appendChild(newth);
				}
				
				// Spalten formatieren
				newtr.getElementsByTagName("th")[0].innerHTML = "&nbsp;";    // ATT-Diagramm
				newtr.getElementsByTagName("th")[0].setAttribute('style', 'width: 20px; min-width:20px');
		
				newtr.getElementsByTagName("th")[1].innerHTML = "&nbsp;";    // Fightinfo
				var width = (ZONEBASE_URL == "")?25:37;
				newtr.getElementsByTagName("th")[1].setAttribute('style', 'width: '+ width + 'px; min-width:' + width + 'px');
		
				newtr.getElementsByTagName("th")[2].innerHTML = "Cheater";   // Username
				newtr.getElementsByTagName("th")[2].setAttribute('style', 'width: 175px');
		
				newtr.getElementsByTagName("th")[3].innerHTML = "Bande";     // Bandenname
				newtr.getElementsByTagName("th")[3].setAttribute('style', 'width: 150px');
		
				newtr.getElementsByTagName("th")[4].innerHTML = "Punkte";    // aktuelle Punktzahl
				newtr.getElementsByTagName("th")[4].setAttribute('style', 'width: 75px; text-align: right; padding-right: 10px');
				
				newtr.getElementsByTagName("th")[5].innerHTML = "Zeit";      // Restzeit auf der Cheaterliste
				newtr.getElementsByTagName("th")[5].setAttribute('style', 'width: 40px; text-align: right; padding-right: 10px');
		
				newtr.getElementsByTagName("th")[6].innerHTML = "Reg-Datum"; // Registrierungsdatum
				newtr.getElementsByTagName("th")[6].setAttribute('style', 'width: 65px');
		
				newtr.getElementsByTagName("th")[7].innerHTML = "&nbsp;";    // Direktangriff
				newtr.getElementsByTagName("th")[7].setAttribute('style', 'width: 20px');
		
				// Zeilenelement einfügen
				newthead.appendChild(newtr);
			}
		
			// ***********************************************************************************************
			// Funktion fügt eine neue Zeile ein
			// ***********************************************************************************************
			function InsertRow(table) {
				// Neues Zeilenelement erzeugen
				var newtr = document.createElement("tr");
				newtr.bgColor = "#363636";
				
				// Für alle Spalten (so viele, wie es Kopfelemente gibt)
				for (var i = 0; i <= table.getElementsByTagName("th").length - 1; i++) {
					// Neue Zelle erzeugen und einfügen
					var newtd = document.createElement("td");
					newtr.appendChild(newtd);
				}
				
				newtr.getElementsByTagName("td")[2].setAttribute('style', 'max-width:175px; overflow:hidden;');

				// Zeilenelement in Tabelle einfügen
				table.appendChild(newtr);
				
				// Zeilenelement zur weiteren Verwendung zurückgeben
				return newtr;
			}
	
			// ***********************************************************************************************
			// Funktion ermittelt die UserID von df.de
			// ***********************************************************************************************
			function GetUserIDFromDFDE(content) {
				if (content.indexOf('user.getname.xml') != -1)
					return content.split(TOWN_URL+'dev/api/user.getname.xml?name=')[1].split('" target')[0];
				return content.split(TOWN_URL+'dev/api/user.')[1].split('.xml"')[0];
			}

			// ***********************************************************************************************
			// Funktion ermittelt den Usernamen von df.de
			// ***********************************************************************************************
			function GetUserNameFromDFDE(content) {
				return content.split('target="_blank">')[1].split('</a>')[0];
			}
	
			// ***********************************************************************************************
			// Funktion ermittelt die Restlaufzeit von df.de
			// ***********************************************************************************************
			function GetRemainingTimeFromDFDE(content) {
				return number_format(parseInt(content.substr(5))) + "h";
			}
	
			// ***********************************************************************************************
			// Funktion liefert den Direktangriffslink anhand des Usernamens
			// ***********************************************************************************************
			function GetDirectAttack(username) {
				return '<a href="' + FIGHTTO_URL + username + '" title="Direktangriff auf ' + username + '" target="_blank"><img src="' + ICON_DIRECTATTACK + '" style="padding-right: 3px"></a>';
			}
	
			// ***********************************************************************************************
			// Funktion liefert den Link auf das Userprofil
			// ***********************************************************************************************
			function GetProfileLink(username, userid) {
				return Linkify(PROFILE_URL + userid + '/', '', username, true);;
			}
	
			// ***********************************************************************************************
			// Funktion liefert das ATT-Diagramm
			// ***********************************************************************************************
			function GetFightDiagramm(username, doubleflag) {
				return '<a href="http://downfight.de/dummy.php?username=' + username + '" target="_blank"><img src="' + ((doubleflag) ? ICON_CHEATERDIA_DOUBLE : ICON_CHEATERDIA_NORMAL) + '" title="ATT-DEF-Diagramm von gemeldeten Siegen/Niederlagen' + ((doubleflag) ? '. Dieser Penner bringt derzeit DOPPELTE KILLPUNKTE!' : '') + '" style="padding-left: 3px"></a>';
			}
	
			// ***********************************************************************************************
			// Funktion liefert alle Daten des users username
			// ***********************************************************************************************
			function GetUserData(username, dftrs, i, newtable, x) {
				// ***********************************************************************************************
				// Funktion baut einen Bandenprofillink aus Banden-ID und Bandenname zusammen
				// ***********************************************************************************************
				function GetGangLink(gangid, gangname) {
					// Wenn eine Bandenmitgliedschaft besteht
					if (gangid != "None") {
						return '<a href="' + GANGPROF_URL + gangid + '/" target="_blank">' + gangname + '</a>';
					// sonst: Penner ist in keiner Bande oder gelöscht/gebannt
					} else {
						return '<b><font color="#ffffff">' + TxtNoGang[myLang] + '</font></b>';
					}
				}
				
				// ***********************************************************************************************
				// Abrufen des XML-Datensatzes für den aktuellen User
				// ***********************************************************************************************
				GM_xmlhttpRequest({method: 'GET', url: API_URL + 'getname.xml?name=' + username, onload: function(responseDetails) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	
					// Userdaten auslesen
					var userpoints = Number(dom.getElementsByTagName('points')[0].textContent);
					var userid = dom.getElementsByTagName('id')[0].textContent;
					var gangid = dom.getElementsByTagName('id')[1].textContent;
					var gangname = dom.getElementsByTagName('name')[1].textContent;
					var regsince = dom.getElementsByTagName('reg_since')[0].textContent;
	
					// Neue Zeile erzeugen und mit UserID branden
					var currenttr = newtable.getElementsByTagName("tr")[x];
					currenttr.id = "cheaterid" + userid;
	
					if (dftrs[i].getElementsByTagName("td")[2].innerHTML.indexOf('<img src="/grafiken/armee.png">') != -1) {
						var doubleflag = true;
					} else {
						var doubleflag = false;
					}
					
					// FIGHT-DIAGRAMM
					currenttr.getElementsByTagName("td")[0].innerHTML = GetFightDiagramm(username, doubleflag);
					// FIGHTINFO
					currenttr.getElementsByTagName("td")[1].innerHTML = GetIconInsertHTML(userid, username, "nofight");
					// NAME
					currenttr.getElementsByTagName("td")[2].innerHTML = GetProfileLink(username, userid);
					// Bandenprofillink eintragen
					var ganglink = GetGangLink(gangid, gangname);
					currenttr.getElementsByTagName("td")[3].innerHTML = ganglink;
					// Aktuelle Punktzahl eintragen
					currenttr.getElementsByTagName("td")[4].innerHTML = number_format(userpoints);
					currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px;');
					// LAUFZEIT
					currenttr.getElementsByTagName("td")[5].innerHTML = GetRemainingTimeFromDFDE(dftrs[i].getElementsByTagName("td")[9].innerHTML);
					if (parseInt(dftrs[i].getElementsByTagName("td")[9].innerHTML.substr(5)) >= 1000) {
						currenttr.getElementsByTagName("td")[5].setAttribute('style', 'text-align: right; padding-right: 10px; color:#ffff00');
						ShowImg('', ICON_NEW, '', '15', '15', '2', '2', '200', '', currenttr.getElementsByTagName("td")[2]);
					} else {
						currenttr.getElementsByTagName("td")[5].setAttribute('style', 'text-align: right; padding-right: 10px;');
					}
					// Aktuelles Registrierungsdatum
					currenttr.getElementsByTagName("td")[6].innerHTML = regsince;
					// DIREKTANGRIFF
					currenttr.getElementsByTagName("td")[7].innerHTML = GetDirectAttack(username);
					currenttr.getElementsByTagName("td")[7].setAttribute('style', 'padding-left: 5px;');
	
					// Wenn der Gegner sich im eigenen Punktespektrum befindet
					if (userpoints <= ownattmax  && userpoints >= ownattmin) {
						currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
						currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px; color: #33cc66');
					// sonst: Der Gegner ist derzeit nicht angreifbar
					} else {
						currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].setAttribute('style', 'color: #ff6666');
						currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px; color: #ff6666');
					}
					
					// Zahl der Kämpfe ermitteln
					CheckPastFights(userid, username, 0);

					// ***********************************************************************************************
					// Abrufen des Userprofils
					// ***********************************************************************************************
					GM_xmlhttpRequest({method: 'GET', url: PROFILE_URL + userid + "/", onload: function(responseDetails) {
						var profilecontent = responseDetails.responseText;
						// Zelle mit Bandenbeschreibung des Users ermitteln
						currenttd = document.getElementById("cheaterid" + userid).getElementsByTagName("td")[3];
						// Wenn der User gelöscht oder gebannt ist
						if (profilecontent.indexOf('"Der Spieler wurde gel&ouml;scht oder vom Spiel verbannt!"') != -1) {
							currenttd.innerHTML = '<b>GEBANNT/GELÖSCHT!</b>';
							currenttd.setAttribute('style', 'color:#ff6666');
						}
					}
					});
				}
				});
			}

			// ***********************************************************************************************
			// ***********************************************************************************************
			// ***********************************************************************************************
			var content = responseDetails.responseText;
			var doc = HTML2DOM(content);
	
			// Neue Tabelle erzeugen
			var newtable = document.createElement("table");
			document.getElementById("cheatertablehost").appendChild(newtable);
	
			// Kopf in die Tabelle einfügen
			InsertHead(newtable, 8);

			// Stadtnamen und DIV-ID ermitteln
			switch (TOWNEXTENSION) {
				case "MU": {
					var townname = "München"; 
					var currentdiv = 0; 
					break;
				}
				case "B": {
					var townname = "Berlin"; 
					var currentdiv = 0; 
					break;
				}
				case "HH": {
					var townname = "Hamburg"; 
					var currentdiv = 0; 
					break;
				}
				case "PM": {
					var townname = "Malle"; 
					var currentdiv = 0; 
					break;
				}
			}

			// Alle DIVs durchwandern
			var divs = doc.getElementsByTagName('div');
	
			var dftable = divs[currentdiv].getElementsByTagName("table")[1];
			var dftrs = dftable.getElementsByTagName("tr");
	
			var nrofcheaters = 0;
			for (var i = 1; i <= dftrs.length - 1; i++) {
				if (dftrs[i].getElementsByTagName("td")[5].innerHTML.indexOf(TOWN_URL) == -1)
					continue;
				if (dftrs[i].getElementsByTagName("td")[5].innerHTML.split('_blank">')[1].split('</a>')[0] != DFTownCode)
					continue;	
				nrofcheaters++;
				// Username ermitteln
				var username = GetUserNameFromDFDE(dftrs[i].getElementsByTagName("td")[4].innerHTML);
	
				// Neue Zeile erzeugen
				var newtr = InsertRow(newtable);
				GetUserData(username, dftrs, i, newtable, nrofcheaters);
		
			}
			// Info über die Anzahl der Cheater über Tabelle schreiben
			document.getElementById("cheaterinfo").innerHTML = '<b><font color="#FFFFFF">Derzeit befinden sich ' + nrofcheaters + ' Penner auf der Cheaterliste (' + townname + ') von <a href="http://www.downfight.de" target="_blank">downfight.de</a>:</font></b><br /><br />';
				
			// Wartecursor
			CursorWait(document.getElementById("CheaterCheckbox"), false);
		}
	}
	});
}

// **********************************************************************************
// **********************************************************************************
// Einbettung eines Inhalts in einen Link mit Ziel, Titel, Body und ggf. Tag
// für "öffnen in neuem Fenster"
// **********************************************************************************
// **********************************************************************************
function Linkify(linkdest, linktitle, linkbody, bNewPage) {
	return '<a href="' + linkdest + '" title="' + linktitle + '"' + ((bNewPage) ? ' target="_blank"' : '') + '>' + linkbody + '</a>';
}

// **********************************************************************************
// **********************************************************************************
// Funktion enthält Code zum Handeln der Cheaterlisten-Anzeige
// **********************************************************************************
// **********************************************************************************
function HandleCheaterCheckbox() {
	var cheatercheckbox = document.getElementById("CheaterCheckbox");

	// Click-Handler hinzufügen
	cheatercheckbox.addEventListener("click", function(event) { 
		// Klickstatus speichern
		GM_setValue("ShowCheaterlist" + m_ownuserid + TOWNEXTENSION, this.checked);
		
		// Wenn das Häkchen gesetzt ist
		if (this.checked) {
			// Cheaterliste abrufen und darstellen
			InsertCheaterTable();
		// sonst: Das Häkchen ist nicht gesetzt
		} else {
			// Info über Anzahl der Cheater und die Cheatertabelle selbst löschen
			document.getElementById("cheaterinfo").innerHTML = "&nbsp;";
			document.getElementById("cheatertablehost").innerHTML = "&nbsp;";
		}
	}, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion bereitet die Tabelle auf das Einfügen der Cheater-Tabelle vor
// **********************************************************************************
// **********************************************************************************
function PrepareCheaterTable(table) {
	
	// Wenn die aktuelle Stadt nicht München ist
//	if (TOWNEXTENSION != "MU") {
		var newtr = document.createElement("tr");
		var newtd = document.createElement("td");
		newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
		newtd.setAttribute('colspan', 2);
		newtd.innerHTML = "1";
		newtd.id = "CheaterCheckboxTD";
		newtd.innerHTML = '<input name="CheaterCheckbox" id="CheaterCheckbox" type="checkbox"><span style="vertical-align: bottom	">&nbsp;Anzeige der Cheaterliste von downfight.de aktivieren</span>';
		newtr.appendChild(newtd);
		table.getElementsByTagName("tbody")[0].appendChild(newtr);
	
		// Zeile einfügen, in der später die Cheaterzahl steht
		newtr = document.createElement("tr");
		newtd = document.createElement("td");
		newtd.setAttribute("colspan", 2);
		newtd.id = "cheaterinfo";
		newtr.appendChild(newtd);
		table.getElementsByTagName("tbody")[0].appendChild(newtr);
	
		// Zeile einfügen, in der später die Cheatertabelle steht
		newtr = document.createElement("tr");
		newtd = document.createElement("td");
		newtd.id = "cheatertablehost";
		newtd.setAttribute("colspan", 2);
		newtr.appendChild(newtd);
		table.getElementsByTagName("tbody")[0].appendChild(newtr);
	
		// Code für Click hinterlegen
		HandleCheaterCheckbox();
		
		// Wenn die letzte Einstellung der Cheater-Checkbox "aktiv" war
		if (GM_getValue("ShowCheaterlist" + m_ownuserid + TOWNEXTENSION, true)) {
			// Häkchen setzen
			document.getElementById("CheaterCheckbox").checked = true;
			// Cheaterliste abrufen und darstellen
			InsertCheaterTable();
		}
//	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion baut einen Pennerzone-Suchaufruf zusammen und liefert ihn zurück
// **********************************************************************************
// **********************************************************************************
function BuildPennerzoneLink(minpoints, maxpoints, datesearch, linktitle, linkicon) {
	return '<a href="' + PENNERZONESEARCH_URL1 + minpoints + PENNERZONESEARCH_URL2 + maxpoints + PENNERZONESEARCH_URL3 + datesearch + '" target="_blank" title="' + linktitle + '"><img src="' + linkicon + '"></a>';
}

// **********************************************************************************
// **********************************************************************************
// Funktion baut den String für Pennerzone-Suchzeile zusammen und liefert ihn zurück
// **********************************************************************************
// **********************************************************************************
function BuildPennerzoneLinkString(minpoints, maxpoints, datefrom) {
	// Wenn kein Startdatum angegeben wurde
	if (datefrom == "") {
		var datesearch = PENNERZONESEARCH_URL3 + PENNERZONESEARCH_URL4 + PENNERZONESEARCH_URL5 + PENNERZONESEARCH_URL6;
		var datefromdisplay = '<small>ab: -egal-</small>';
	// sonst: Es wurde ein Startdatum angegeben
	} else {
		var day = Number(datefrom.substr(0,2))
		var month = datefrom.substr(3,2)
		var year = datefrom.substr(6,4)
		var datesearch = PENNERZONESEARCH_URL3 + day + PENNERZONESEARCH_URL4 + month + PENNERZONESEARCH_URL5 + year + PENNERZONESEARCH_URL6;
		var datefromdisplay = '<small>ab: ' + datefrom + '</small>';
	}

	// Alle Icons zusammenbauen
	var PennerzoneLinkMoney = BuildPennerzoneLink(minpoints, "", datesearch, "Gegnersuche (Geld, volles Punktespektrum)", ICON_PENNERZONE_MONEY);
	var PennerzoneLinkUp    = BuildPennerzoneLink(parseInt(maxpoints * 0.90), maxpoints, datesearch, "Gegnersuche (viele Punkte, Max - 10%)", ICON_PENNERZONE_UP);
	var PennerzoneLinkDown  = BuildPennerzoneLink(minpoints, parseInt(minpoints * 1.20), datesearch, "Gegnersuche (wenig Punkte, Min + 20%)", ICON_PENNERZONE_DOWN);
	var PennerzoneLinkDate  = '<img src="' + ICON_PENNERZONE_DATE + '" id="PennerzoneDate" title="Eingabe eines Start-Reg.-datums" style="cursor:pointer">';

	// Gesamten String für die Pennerzone-Suchzeile zurückgeben
	return '<strong>Pennerzone-Suche:</strong>&nbsp;&nbsp;&nbsp;&nbsp;' + PennerzoneLinkMoney + '&nbsp;' + PennerzoneLinkUp + '&nbsp;&nbsp;' + PennerzoneLinkDown + '&nbsp;&nbsp;&nbsp;&nbsp;' + PennerzoneLinkDate + '&nbsp;&nbsp;' + datefromdisplay;
}

// **********************************************************************************
// **********************************************************************************
// Handler für die Datumsschaltfläche der Pennerzone-Zeile
// **********************************************************************************
// **********************************************************************************
function AddPennerzoneDateHandler() {
	// Wenn das Element vorhanden ist
	if (document.getElementById("PennerzoneDate") != null) {
		// Click-Handler hinzufügen
		document.getElementById("PennerzoneDate").addEventListener("click", function(event) { 
			// Startdatum vom User eingeben lassen
			var datefrom = prompt("Bitte das Reg.-Datum angeben, ab dem Gegner\ngesucht werden sollen (Format: TT.MM.JJJJ).\n\nEine leere Eingabe bedeutet keine Einschränkung.", GM_getValue("PennerzoneDateFrom" + m_ownuserid + TOWNEXTENSION, ""));
			// Eingegebenes Startdatum speichern
			GM_setValue("PennerzoneDateFrom" + m_ownuserid + TOWNEXTENSION, datefrom);

			// Pennerzone-Suchzeile neu erstellen und zuweisen
			document.getElementById("PennerzoneP").innerHTML = BuildPennerzoneLinkString(minpoints, maxpoints, datefrom);

			// Handler erneut zuweisen
			AddPennerzoneDateHandler();
		}, false);
	}
}

// **********************************************************************************
// **********************************************************************************
// Handler für Bandenprofilaktualisierung
// **********************************************************************************
// **********************************************************************************
function HandleGangProfile(content) {
	// ***********************************************************************************************
	// Funktion ermittelt die UserID
	// ***********************************************************************************************
	function GetUserID(htmlstring) {
		return htmlstring.split('href="/profil/id:')[1].split('/"')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt Username
	// ***********************************************************************************************
	function GetUsername(htmlstring) {
		return htmlstring.split('">')[1].split('</a>')[0];
	}

	// ***********************************************************************************************
	// Funktion ermittelt aktuelle Punktzahl und Farbe setzen
	// ***********************************************************************************************
	function GetActPoints(userid, x) {
		// ***********************************************************************************************
		// Abrufen des XML-Datensatzes für den aktuellen User
		// ***********************************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: API_URL + userid + ".xml", onload: function(responseDetails) {
			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

				// Punktezahl und UserID auslesen
				var userpoints = Number(dom.getElementsByTagName('points')[0].textContent);																																																							userpoints=(userpoints<=ownattmax&&userpoints>=ownattmin&&bl("fi", userid)&&userid!=m_ownuserid)?Math.ceil(ownattmin*0.95):userpoints;
				var curtd = tr[x].getElementsByTagName("td")[2];
				tr[x].getElementsByTagName("div")[0].innerHTML = number_format(userpoints);

				// Wenn der Gegner nicht angreifbar ist (er befindet sich nicht im Punktespektrum)
				if (userid != m_ownuserid)
					if (userpoints > ownattmax  || userpoints < ownattmin)
						tr[x].getElementsByTagName("td")[1].getElementsByTagName("a")[ZONEBASE_URL==""?2:3].setAttribute('style', 'color: #ff6666');
					else
						tr[x].getElementsByTagName("td")[1].getElementsByTagName("a")[ZONEBASE_URL==""?2:3].setAttribute('style', 'color: #33cc66');
				if (tr[x].getElementsByTagName('td').length <= 3) {
					reg_since = dom.getElementsByTagName('reg_since')[0].textContent;
					var newtd = document.createElement('td');
					newtd.innerHTML = '<div align="right">' + reg_since + "</div>";
					tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[2]);
				}
			}
		}
		});
	}

	// Referenzen auf die Tabelle speichern
	var tables = document.getElementsByTagName("table");
	var table = document.getElementsByTagName("table")[tables.length-1];
	var tr = table.getElementsByTagName("tr");
	var fightweg = "";
	if (tr[0].getElementsByTagName("td").length > 3)
		fightweg = "nofight";

	// Für alle Zeilen der Tabelle
	for (var x = 0; x < tr.length; x++) {
		var akttd = tr[x].getElementsByTagName("td")[1];
		// Name und UserID auslesen
		var userid = GetUserID(akttd.innerHTML);
		var username = GetUsername(akttd.innerHTML);
		akttd.innerHTML = GetIconInsertHTML(userid, username, fightweg) + akttd.innerHTML;
	
		// Zahl der Kämpfe ermitteln
		CheckPastFights(userid, username, 0);

		// Aktuelle Punkte ermitteln und anzeigen
		GetActPoints(userid, x);
	}
}

//function ap() {
//	var tables = document.getElementsByTagName("table");
//	var tables = document.getElementsByTagName("table");
//	
//	var userid = '472133';
//	var username = 'Dr_Med_Prof_Spongebob';
//	var points = '111264083';
//
//	var fightdate = '01.04.2010 21:59:43 Uhr';
//	
//	tables[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML = '&nbsp;' + fightdate;
//
//	document.getElementsByClassName("avatar")[1].src = 'http://inodes.pennergame.de/bl_DE/avatare/' + userid + '.jpg';
//
//	tables[1].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML = '<div align="center"><strong>' + username + '</strong></div>';
//
//	tables[1].getElementsByTagName("tr")[3].getElementsByTagName("td")[0].innerHTML = '<div align="center">-' + points + '</div>'
//	tables[1].getElementsByTagName("tr")[3].getElementsByTagName("td")[2].innerHTML = '<div align="center">' + points + '</div>'
//
//	document.getElementsByTagName("p")[7].innerHTML = username + ' hat sageo angegriffen, dabei hat ' + username + ' den Kampf verloren und sich bei dem Angriffsversuch ordentlich blamiert.<br><br>sageo hat von ' + username + ' €145,40 erbeutet und hat stolze ' + points + ' Punkte bekommen.<br><br><br>' + username + ' ist mit einem blauem Auge davongekommen und hat sich nicht weiter verletzt.<br>';
//}

function ByeByeGoogle() {
	for (var i = 1; i <= 2; i++) {
		// Div mit Google-Ads entfernen
		var googleads = document.getElementById("google_js_" + i);
		if (googleads != null) {
			googleads.parentNode.removeChild(googleads);
		}
	}
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

	var m_ownuserid = getOwnUserID();

	ByeByeGoogle();
	
	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate(120);

	if (!bl()) {
		var content = document.getElementsByTagName("body")[0].innerHTML;
	
		if (location.toString().indexOf(".pennerzone.de") == -1) {
			// Eigene Punktezahl auslesen
			var ownpoints = Number(document.getElementsByClassName("icon award")[0].getElementsByTagName("a")[0].innerHTML);

			// Aus eigener Punktzahl Ober- und Untergrenze für Punktezahl der User errechnen, die man angreifen kann
			var ownattmax = Math.floor(ownpoints * 1.5);
			var ownattmin = Math.floor(ownpoints * 0.8);
		}

		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Bandenprofil-Seite ist
		// ***********************************************************************************************
		if (location.toString().indexOf(TOWN_URL+"profil/bande:") != -1) {
			// Aktualisierung der Info-Icons auf dem Bandenprofil durchführen (wenn welche vorhanden sind)
			HandleGangProfile(content);
		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Userprofilseite ist
		// ***********************************************************************************************
		} else if ((location.toString().indexOf(TOWN_URL+"profil/") != -1) && (location.toString().indexOf("/bande:") == -1)) {
			// Info-Icons auf dem Profil einfügen
			HandleProfile();
		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Kampfprofil-Seite ist
		// ***********************************************************************************************
		} else if (location.toString().indexOf(TOWN_URL+"fight/viewfight/") != -1) {
//			ap();
		// ***********************************************************************************************
		// Wenn die aktuelle Seite eine Pennerzone-Seite ist
		// ***********************************************************************************************
		} else if (location.toString().indexOf(".pennerzone.de/highscore/") != -1) {
			HandlePennerzone();
		// ***********************************************************************************************
		// sonst: Die aktuelle Seite ist keine Profilseite
		// ***********************************************************************************************
		} else {	
			// ***********************************************************************************************
			// Abrufen des XML-Datensatzes für den aktuellen User
			// ***********************************************************************************************
			GM_xmlhttpRequest({method: 'GET', url: API_URL + m_ownuserid + ".xml", onload: function(responseDetails) {
				// Wenn die Seite erfolgreich abgerufen werden konnte
				if (responseDetails.status == 200) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
					var gangid = dom.getElementsByTagName('id')[1].textContent;
					var inGang = (gangid != 'None')?1:0;

					// ***********************************************************************************************
					// Wenn die aktive Kampfseite angezeigt wird
					// ***********************************************************************************************
					if (content.indexOf(TxtZiel[lang]) != -1 ) {

						CheckFightValues(content);
						// ***********************************************************************************************
						// Funktion ermittelt das DIV, in dem die Angriffsdetails stehen
						// ***********************************************************************************************
						function GetAttackDiv() {
							var divs = document.getElementsByTagName("div");

							for (var i = 0; i < divs.length; i++) {
								var divstyle = divs[i].getAttribute("style");

								if (divstyle != null) {
									if (divstyle.indexOf("padding: 6px") != -1 && divstyle.indexOf("width: 300px") != -1) {
										return divs[i];
									}
								}
							}
						}
						
						var attacktable = document.getElementsByTagName("table")[0];
						var attackdiv = GetAttackDiv();
						var attacklink = attackdiv.getElementsByTagName("a")[0];
						var attackspan = attackdiv.getElementsByTagName("span")[0];
					
						// Wenn aktuell ein Angriff läuft
						if (document.getElementsByTagName("body")[0].innerHTML.indexOf(TxtRunAttack[lang]) != -1) {
							// Name und UserID des Penners auslesen
							var username = attacklink.innerHTML;
							var userid = attackspan.innerHTML.split('/id:')[1].split('/"')[0];
			
							CheckPastFights(userid, username, 0);
			
							// Info-Icons einfügen
							attackspan.innerHTML = attackspan.innerHTML + '&nbsp' + GetIconInsertHTML(userid, username, "x");
				
							// Grafik für Posten in SB einfügen
							if (inGang)
								attackspan.innerHTML = attackspan.innerHTML + '&nbsp;<img id="PostCurrentFightToSB" border="0" src="' + ICON_SENDTOSB + '" title="' + TxtPostTitle2[myLang].replace('%s', username) + '" height="14" width="14" style="cursor: pointer">';
			
							var additionalbr = '';
						// sonst: Es läuft derzeit kein Angriff
						} else {
							var additionalbr = '<br />';
						}
			
						// ***********************************************************************************************
						// Pennerzone-Suchkonfigurationen einblenden
						// ***********************************************************************************************
						// Einfügen der Pennerzone-Suchzeile in die Angriffsbox
						if (ZONEBASE_URL != "") {
							attackdiv.innerHTML = attackdiv.innerHTML + additionalbr + '<br /><p id="PennerzoneP">' + BuildPennerzoneLinkString(ownattmin, ownattmax, GM_getValue("PennerzoneDateFrom" + m_ownuserid + TOWNEXTENSION, "")) + '</p>';
						
							// Handler für Datumseingabe einfügen
							AddPennerzoneDateHandler();
						}
			
						// Wenn der aktuelle Kampf in die SB gepostet werden können soll
						if (document.getElementById("PostCurrentFightToSB") != null) {
							// Handler für das Posten in SB mit Grafik assoziieren
							PostToSBHandler(document.getElementById("PostCurrentFightToSB"), SBPOSTMODE_ACTIVE);
						}
					}
					
					// ***********************************************************************************************
					// Wenn die aktuelle Seite die Fightlog-Seite oder die Kampf-Sucheseite ist
					// ***********************************************************************************************
					if (location.toString().indexOf("/fightlog/") != -1) {
						GM_xmlhttpRequest({method: 'GET', url: FIGHT_URL, onload: function(responseDetails) {
							CheckFightValues(responseDetails.responseText);
						}});
						// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
						var firsttable = document.getElementsByTagName("table")[1];
						// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
						ReformatFightlogTable(firsttable, inGang);
				
						// "Info"-Icon und -Link in die Tabelle schreiben
						InsertInfoInFirstTable(firsttable, inGang);
				
						// ***********************************************************************************************
						// Wenn die aktuelle Seite die Kampf-Suchseite ist
						// ***********************************************************************************************
						if (location.toString().indexOf("?q=") != -1) {
							HandleSearchpage(firsttable, inGang);
						// ***********************************************************************************************
						// Wenn die aktuelle Seite die Fightlog-Seite ist
						// ***********************************************************************************************
						} else {
							// Wenn die aktuelle Seite die erste Fightlog-Seite ist
							if (Right$(location.toString(), 10) == '/fightlog/' || Right$(location.toString(), 12) == '/fightlog/1/') {
								// Submit-Button für Daten einfügen
								InsertSubmitButton(content, document.getElementsByTagName("table")[0], inGang);
							}
						}
			
						// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
						InsertAttackableInFirstTable(firsttable, inGang, true, false);
			
					// ***********************************************************************************************
					// sonst: die aktuelle Seite ist NICHT die Fightlog-Seite
					// ***********************************************************************************************
					} else {
						var firsttable = document.getElementsByTagName("table")[0];
						var trs = firsttable.getElementsByTagName("tr");
						var cnt = 0;
						for (var i = 0; i < trs.length; i++) {
							if (trs[i].innerHTML.indexOf('tiername') == -1)
								continue;
							cnt++;
							if (cnt != 3)
								continue;
							var text = trs[i].innerHTML.split('tiername">')[1].split('<')[0];
							if (inGang && document.getElementsByTagName("table")[1].getElementsByTagName("tr").length > 2)
								trs[i].innerHTML = '<td style=width:40%>' + text + '</td><td style="vertical-align:text-top"><form style="padding-bottom: 4px; padding-left: 12px;"><input name="postVals" id="postVals" type="checkbox">&nbsp;' + TxtPostFight[myLang] + '&nbsp;</form></td>';
							break;
						}
						// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
						firsttable = document.getElementsByTagName("table")[1];
						// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
						ReformatFirstTable(firsttable, inGang);
						// "Info"-Icon und -Link in die Tabelle schreiben
						InsertInfoInFirstTable(firsttable, inGang);
						
						// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
						InsertAttackableInFirstTable(firsttable, inGang);
						
						// Referenz auf die Tabelle mit den eintreffenden Kämpfen speichern
						var secondtable = document.getElementsByTagName("table")[2];
			
						// Array für Kampf-Infos initialisieren
						var IncomingFights = new Array();
					
						// Auslesen der Daten der einkommenden Kämpfe
						ReadFightData(secondtable, IncomingFights);
					
						if (IncomingFights.length > 0) {
							// Eintreffende Kämpfe chronologisch sortieren (aufsteigend)
							IncomingFights.sort(sortByTime);
							
							// Tabelle mit den eintreffenden Kämpfen neu formatieren und eine neue Spalte einfügen
							ReformatSecondTable(secondtable, inGang);
					
							// Zurückschreiben der sortierten eintreffenden Kämpfe in die Tabelle
							WriteFightData(secondtable, IncomingFights, inGang);
						}
					
						// Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
						InsertAttackableInFirstTable(secondtable, inGang, true, true);
			
						// Schreiben der Anzahl eintreffender Kämpfe in die Zeilenüberschrift
						WriteNrOfIncomingFights(content, document.getElementsByTagName("table")[0]);
						
						// ***********************************************************************************************
						// Cheatertabelle vorbereiten
						// ***********************************************************************************************
						if (DFTownCode != "") {
							var table = document.getElementsByTagName("table")[0];
							PrepareCheaterTable(table);
						}
					}
				}
			}
			});
		}
	}
