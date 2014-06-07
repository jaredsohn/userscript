// ==UserScript==
// @name		PowerLogIn 1.3a 6
// @namespace	bazie at http://thx.spacequadrat.de
// @description	das script erzeugt ein login menue mit dem man aus mehreren accounts auswaehlen kann. ueber die einstellungen lassen sich die accounts einfach verwalten.
// @Version		1.3a 5
// @include		*pennergame.de/
// @include		*pennergame.de/news/
// @include		*berlin.pennergame.de/
// @include		*pennergame.de/logout/*
// @include		*berlin.pennergame.de/logout/*
// @include		*pennergame.de/pw_forgotten/*
// @include		*berlin.pennergame.de/pw_forgotten/*
// @include		*pennergame.de/login/*
// @include		*berlin.pennergame.de/login/*
// @include		*pennergame.de/login/check/
// @include		*berlin.pennergame.de/login/check/
// @include		*pennergame.sevenload.de/logout/
// @include		*berlin.pennergame.de/news/
// @include		*pennergame.de/?landing=true
// ==/UserScript==


// changelog 06.07.09
// standarteinträge für hamburg auf 10 erhöht
//
// changelog 15.05.09
// kleinigkeiten gefixt und finale version auf 1.3a (+ anzahl einstellbarer penner) gesetzt
//
// changelog 09.05.09
// nichtanzeigen des loginmenues nach klick auf pennerplakat (hamburg oder berlin) gefixt
// login und einstellungsmenue fuer berlin und hamburg auf 5 / 10 / 15 / 20 / 25 / 30 penner erhöht (jeh nach version)
//
// changelog 07.05.09
// optik etwas angepasst
// switchlink auf staedtenamen gelegt
// einstellungesmenue so abgeaendert das nur berliner penner auf der berlin seite und
// hamburger penner auf der hamburger seite editiert werden koennen
// passwortfeld zeigt nun passwort als punkte dar und nichtmehr klartext
// standards wurden entfernt. felder sind bei erstnutzung komplett leer
// anzeigeproblem auf pennergame.sevenload.de bei logout gefixt
// loesung: automatische weiterleitung von pennergame.sevenload.de auf pennergame.de
//
// changelog: 05.05.09
// grungeruest erstellt und optionsmenue eingefuegt bzw eingestellt


// AP #1
// wechsellink ermitteln
var url = document.location.href;
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gotolink = "http://www.pennergame.de"
var logincheck = "http://berlin.pennergame.de/login/check/"
}
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www")>=0) {
var gotolink = "http://berlin.pennergame.de"
var logincheck = "http://www.pennergame.de/login/check/"
}
// Linkadressen fuer pennergame ohne www
if (url.indexOf("http://pennergame")>=0) {
var gotolink = "http://berlin.pennergame.de"
var logincheck = "http://www.pennergame.de/login/check/"
}

// wechseln der url wenn pennergame.sevenload.de aufgerufen ist sodas das loginmenue angezeigt wird
if(window.location.href == "http://pennergame.sevenload.de/logout/") {
window.location.replace('http://www.pennergame.de/'); 
}
// ------------------------------------

// AP #2
// menuefarben
var MenueBG1 = "#313131";
var BorderColor1 = "#000000";
var Version = "1.3a 5"

// standart eintraege penner berlin
// penner 1
var BPennerName1 = GM_getValue("BPennerName1In");
if (BPennerName1 == null){BPennerName1 = "";};
var BPennerPass1 = GM_getValue("BPennerPass1In");
if (BPennerPass1 == null){BPennerPass1 = "";};
// penner 2
var BPennerName2 = GM_getValue("BPennerName2In");
if (BPennerName2 == null){BPennerName2 = "";};
var BPennerPass2 = GM_getValue("BPennerPass2In");
if (BPennerPass2 == null){BPennerPass2 = "";};
// penner 3
var BPennerName3 = GM_getValue("BPennerName3In");
if (BPennerName3 == null){BPennerName3 = "";};
var BPennerPass3 = GM_getValue("BPennerPass3In");
if (BPennerPass3 == null){BPennerPass3 = "";};
// penner 4
var BPennerName4 = GM_getValue("BPennerName4In");
if (BPennerName4 == null){BPennerName4 = "";};
var BPennerPass4 = GM_getValue("BPennerPass4In");
if (BPennerPass4 == null){BPennerPass4 = "";};
// penner 5
var BPennerName5 = GM_getValue("BPennerName5In");
if (BPennerName5 == null){BPennerName5 = "";};
var BPennerPass5 = GM_getValue("BPennerPass5In");
if (BPennerPass5 == null){BPennerPass5 = "";};

// standart eintraege penner hamburg
// penner 1
var HPennerName1 = GM_getValue("HPennerName1In");
if (HPennerName1 == null){HPennerName1 = "";};
var HPennerPass1 = GM_getValue("HPennerPass1In");
if (HPennerPass1 == null){HPennerPass1 = "";};
// penner 2
var HPennerName2 = GM_getValue("HPennerName2In");
if (HPennerName2 == null){HPennerName2 = "";};
var HPennerPass2 = GM_getValue("HPennerPass2In");
if (HPennerPass2 == null){HPennerPass2 = "";};
// penner 3
var HPennerName3 = GM_getValue("HPennerName3In");
if (HPennerName3 == null){HPennerName3 = "";};
var HPennerPass3 = GM_getValue("HPennerPass3In");
if (HPennerPass3 == null){HPennerPass3 = "";};
// penner 4
var HPennerName4 = GM_getValue("HPennerName4In");
if (HPennerName4 == null){HPennerName4 = "";};
var HPennerPass4 = GM_getValue("HPennerPass4In");
if (HPennerPass4 == null){HPennerPass4 = "";};
// penner 5
var HPennerName5 = GM_getValue("HPennerName5In");
if (HPennerName5 == null){HPennerName5 = "";};
var HPennerPass5 = GM_getValue("HPennerPass5In");
if (HPennerPass5 == null){HPennerPass5 = "";};
// penner 6
var HPennerName6 = GM_getValue("HPennerName6In");
if (HPennerName6 == null){HPennerName6 = "";};
var HPennerPass6 = GM_getValue("HPennerPass6In");
if (HPennerPass6 == null){HPennerPass6 = "";};
// penner 7
var HPennerName7 = GM_getValue("HPennerName7In");
if (HPennerName7 == null){HPennerName7 = "";};
var HPennerPass7 = GM_getValue("HPennerPass7In");
if (HPennerPass7 == null){HPennerPass7 = "";};
// penner 8
var HPennerName8 = GM_getValue("HPennerName8In");
if (HPennerName8 == null){HPennerName8 = "";};
var HPennerPass8 = GM_getValue("HPennerPass8In");
if (HPennerPass8 == null){HPennerPass8 = "";};
// penner 9
var HPennerName9 = GM_getValue("HPennerName9In");
if (HPennerName9 == null){HPennerName9 = "";};
var HPennerPass9 = GM_getValue("HPennerPass9In");
if (HPennerPass9 == null){HPennerPass9 = "";};
// penner 10
var HPennerName10 = GM_getValue("HPennerName10In");
if (HPennerName10 == null){HPennerName10 = "";};
var HPennerPass10 = GM_getValue("HPennerPass10In");
if (HPennerPass10 == null){HPennerPass10 = "";};
//-------------------------------------

// AP #3a
// loginmenue fuer hamburg
if(window.location.href == "http://www.pennergame.de/" || window.location.href == "http://www.pennergame.de/?landing=true" || window.location.href == "http://www.pennergame.de/logout/" || window.location.href == "http://www.pennergame.de/news/" || window.location.href == "http://www.pennergame.de/pw_forgotten/" || window.location.href == "http://www.pennergame.de/login/" || window.location.href == "http://www.pennergame.de/login/check/" || window.location.href == "http://pennergame.de/" || window.location.href == "http://pennergame.de/logout/" || window.location.href == "http://pennergame.de/pw_forgotten/" || window.location.href == "http://pennergame.de/login/" || window.location.href == "http://pennergame.de/login/check/")
{

var CSwitch = "<li><a href=\""+gotolink+"\" title=\"Switch to BERLIN\"><span style=\"color:white\"><b>HAMBURG</b></span></a></li>";

var CPenner1 = "<li><a><font color=\"orange\">Penner 1</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName1+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass1+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner2 = "<li><a><font color=\"orange\">Penner 2</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName2+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass2+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner3 = "<li><a><font color=\"orange\">Penner 3</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName3+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass3+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner4 = "<li><a><font color=\"orange\">Penner 4</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName4+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass4+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner5 = "<li><a><font color=\"orange\">Penner 5</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass5+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner6 = "<li><a><font color=\"orange\">Penner 6</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass5+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";


var CPenner7 = "<li><a><font color=\"orange\">Penner 7</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass5+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";


var CPenner8 = "<li><a><font color=\"orange\">Penner 8</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass5+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";


var CPenner9 = "<li><a><font color=\"orange\">Penner 9</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass5+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";


var CPenner10 = "<li><a><font color=\"orange\">Penner 10</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+HPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+HPennerPass5+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

};
//-------------------------------------

// AP #3b
// loginmenue fuer berlin
if(window.location.href == "http://www.berlin.pennergame.de/" || window.location.href == "http://berlin.pennergame.de/?landing=true" || window.location.href == "http://www.berlin.pennergame.de/logout/" || window.location.href == "http://www.berlin.pennergame.de/pw_forgotten/" || window.location.href == "http://www.berlin.pennergame.de/login/" || window.location.href == "http://www.berlin.pennergame.de/login/check/" || window.location.href == "http://berlin.pennergame.de/" || window.location.href == "http://berlin.pennergame.de/news/" || window.location.href == "http://berlin.pennergame.de/logout/" || window.location.href == "http://berlin.pennergame.de/pw_forgotten/" || window.location.href == "http://berlin.pennergame.de/login/" || window.location.href == "http://berlin.pennergame.de/login/check/")
{

var CSwitch = "<li><a href=\""+gotolink+"\" title=\"Switch to HAMBURG\"><span style=\"color:white\"><b>BERLIN</b></span></a></li>";

var CPenner1 = "<li><a><font color=\"orange\">Penner 1</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName1+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass1+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner2 = "<li><a><font color=\"orange\">Penner 2</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName2+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass2+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner3 = "<li><a><font color=\"orange\">Penner 3</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName3+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass3+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner4 = "<li><a><font color=\"orange\">Penner 4</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName4+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass4+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner5 = "<li><a><font color=\"orange\">Penner 5</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass5+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner6 = "<li><a><font color=\"orange\">Penner 5</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass6+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner7 = "<li><a><font color=\"orange\">Penner 5</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass7+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner8 = "<li><a><font color=\"orange\">Penner 5</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass8+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner9 = "<li><a><font color=\"orange\">Penner 5</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass9+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";

var CPenner10 = "<li><a><font color=\"orange\">Penner 5</font></a><form method=\"post\" action=\""+logincheck+"\"><input id=\"player\" maxlength=\"30\" size=\"16\" type=\"text\" name=\"username\" value=\""+BPennerName5+"\"/><input id=\"password\" maxlength=\"32\" size=\"7\" type=\"password\" name=\"password\" id=\"password\" value=\""+BPennerPass10+"\"/>&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" /></form></li>";


};

var CTitle = "<li><a target=\"_blank\" href=\"http://thx.spacequadrat.de/\" title=\"C 2009 by bazie @ THX\"><span style=\"color:white\"><b>PowerLogIn</b><font color=\"orange\"> "+Version+"</font></span></a></li>";
var CLinkkette = ""+CSwitch+CPenner1+CPenner2+CPenner3+CPenner4+CPenner5+""
var CPasswort = "<li><a href=\"/pw_forgotten/\"><font color=\"white\">Passwort vergessen</font></a></li>";
var CSettings = "<li><div align=\"center\"><input type=\"submit\" class=\"formbutton\" name=\"EinstellungenExtraMenue\" value=\"Einstellungen\" /></div></li>";
document.getElementById("footer").innerHTML += "<span name=\"Menue\" style=\"position:fixed;top:20px;right:20px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:0.8;opacity:0.8;border:1px solid "+BorderColor1+"; background-color:"+MenueBG1+"\"><div class=\"content\" style=\"padding-top:20px\"><ul><div align=\"center\">"+CTitle+CLinkkette+CPasswort+CSettings+"</div></ul></div></span>";

//-------------------------------------

// AP #4a
// optionsmenue fuer berlin und hamburg
// ueberschrift optionsmenue
var OMenueTop = "<br><a><span style=\"color:white;\"><b>PowerLogIn</b><font color=\"orange\"> "+Version+"</font></a></span>";

// stadtname optionsmenue
if (url.indexOf("http://berlin")>=0) {
var OMenueCity = "<a><span style=\"color:white\"><b>Login Berlin</b></span></a>";
} else {
var OMenueCity = "<a><span style=\"color:white\"><b>Login Hamburg</b></span></a>";
}

// name und passwort penner 1 fuer berlin und hamburg
if (url.indexOf("http://berlin")>=0) {
var OPenner1 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 1</b></span></a><center><input name=\"BPennerName1In\" size=\"16\" type=\"text\" value=\""+BPennerName1+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"BPennerPass1In\" size=\"16\" type=\"password\" value=\""+BPennerPass1+"\" /></center>";
} else {
var OPenner1 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 1</b></span></a><center><input name=\"HPennerName1In\" size=\"16\" type=\"text\" value=\""+HPennerName1+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"HPennerPass1In\" size=\"16\" type=\"password\" value=\""+BPennerPass1+"\" /></center>";
}

// name und passwort penner 2 fuer berlin und hamburg
if (url.indexOf("http://berlin")>=0) {
var OPenner2 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 2</b></span></a><center><input name=\"BPennerName2In\" size=\"16\" type=\"text\" value=\""+BPennerName2+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"BPennerPass2In\" size=\"16\" type=\"password\" value=\""+BPennerPass2+"\" /></center>";
} else {
var OPenner2 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 2</b></span></a><center><input name=\"HPennerName2In\" size=\"16\" type=\"text\" value=\""+HPennerName2+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"HPennerPass2In\" size=\"16\" type=\"password\" value=\""+BPennerPass2+"\" /></center>";
}

// name und passwort penner 2 fuer berlin und hamburg
if (url.indexOf("http://berlin")>=0) {
var OPenner3 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 3</b></span></a><center><input name=\"BPennerName3In\" size=\"16\" type=\"text\" value=\""+BPennerName3+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"BPennerPass3In\" size=\"16\" type=\"password\" value=\""+BPennerPass3+"\" /></center>";
} else {
var OPenner3 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 3</b></span></a><center><input name=\"HPennerName3In\" size=\"16\" type=\"text\" value=\""+HPennerName3+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"HPennerPass3In\" size=\"16\" type=\"password\" value=\""+BPennerPass3+"\" /></center>";
}

// name und passwort penner 2 fuer berlin und hamburg
if (url.indexOf("http://berlin")>=0) {
var OPenner4 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 4</b></span></a><center><input name=\"BPennerName4In\" size=\"16\" type=\"text\" value=\""+BPennerName4+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"BPennerPass4In\" size=\"16\" type=\"password\" value=\""+BPennerPass4+"\" /></center>";
} else {
var OPenner4 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 4</b></span></a><center><input name=\"HPennerName4In\" size=\"16\" type=\"text\" value=\""+HPennerName4+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"HPennerPass4In\" size=\"16\" type=\"password\" value=\""+BPennerPass4+"\" /></center>";
}

// name und passwort penner 2 fuer berlin und hamburg
if (url.indexOf("http://berlin")>=0) {
var OPenner5 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 5</b></span></a><center><input name=\"BPennerName5In\" size=\"16\" type=\"text\" value=\""+BPennerName5+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"BPennerPass5In\" size=\"16\" type=\"password\" value=\""+BPennerPass5+"\" /></center>";
} else {
var OPenner5 = "<a><span align=\"center\" style=\"color:orange;\"><b>Penner 5</b></span></a><center><input name=\"HPennerName5In\" size=\"16\" type=\"text\" value=\""+HPennerName5+"\" /><br><span align=\"center\" style=\"color:white;\">Passwort</span></a><center><input name=\"HPennerPass5In\" size=\"16\" type=\"password\" value=\""+BPennerPass5+"\" /></center>";
}

// AP #4b
// linkkette und buttons optionsmenue
var OLinkkette = ""+OMenueTop+OMenueCity+OPenner1+OPenner2+OPenner3+OPenner4+OPenner5+""
var CSpeichern = "<li><div align=\"center\">_______________________<br><input type=\"submit\" class=\"formbutton\"  name=\"SpeichernExtraMenue\" value=\"Speichern\" />";
var CSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" /><br>&nbsp;</li></div>";

// AP #5a
// beim klick auf einstellungen
document.getElementsByName('EinstellungenExtraMenue')[0].addEventListener('click', function EinstellungenExtraMenue () {
// optionsmenue bilden
document.getElementsByName('Menue')[0].innerHTML = "<span style=\"position:fixed;top:20px;right:20px;-moz-border-radius:20px;-moz-opacity:0.7;opacity:0.7;border:1px solid "+BorderColor1+";background-color:"+MenueBG1+"\"><div class=\"content\" style=\"padding-top:15px\"><ul><li><div align=\"center\"><span style=\"color:#0099FF; font-size:14px;\"><b>EINSTELLUNGEN</b></span></div></li>"+OLinkkette+CSpeichern+CSchliessen+"</ul></div></span>";
// speichern klicken
document.getElementsByName('SpeichernExtraMenue')[0].addEventListener('click', function Schliessen () {


// AP #5b
if (url.indexOf("http://berlin")>=0) {

// berlin penner 1 name und passwort
GM_setValue("BPennerName1In", document.getElementsByName('BPennerName1In')[0].value);
GM_setValue("BPennerPass1In", document.getElementsByName('BPennerPass1In')[0].value);
// berlin penner 2 name und passwort
GM_setValue("BPennerName2In", document.getElementsByName('BPennerName2In')[0].value);
GM_setValue("BPennerPass2In", document.getElementsByName('BPennerPass2In')[0].value);
// berlin penner 3 name und passwort
GM_setValue("BPennerName3In", document.getElementsByName('BPennerName3In')[0].value);
GM_setValue("BPennerPass3In", document.getElementsByName('BPennerPass3In')[0].value);
// berlin penner 4 name und passwort
GM_setValue("BPennerName4In", document.getElementsByName('BPennerName4In')[0].value);
GM_setValue("BPennerPass4In", document.getElementsByName('BPennerPass4In')[0].value);
// berlin penner 5 name und passwort
GM_setValue("BPennerName5In", document.getElementsByName('BPennerName5In')[0].value);
GM_setValue("BPennerPass5In", document.getElementsByName('BPennerPass5In')[0].value);


} else {

// hamburg penner 1 name und passwort
GM_setValue("HPennerName1In", document.getElementsByName('HPennerName1In')[0].value);
GM_setValue("HPennerPass1In", document.getElementsByName('HPennerPass1In')[0].value);
// hamburg penner 2 name und passwort
GM_setValue("HPennerName2In", document.getElementsByName('HPennerName2In')[0].value);
GM_setValue("HPennerPass2In", document.getElementsByName('HPennerPass2In')[0].value);
// hamburg penner 3 name und passwort
GM_setValue("HPennerName3In", document.getElementsByName('HPennerName3In')[0].value);
GM_setValue("HPennerPass3In", document.getElementsByName('HPennerPass3In')[0].value);
// hamburg penner 4 name und passwort
GM_setValue("HPennerName4In", document.getElementsByName('HPennerName4In')[0].value);
GM_setValue("HPennerPass4In", document.getElementsByName('HPennerPass4In')[0].value);
// hamburg penner 5 name und passwort
GM_setValue("HPennerName5In", document.getElementsByName('HPennerName5In')[0].value);
GM_setValue("HPennerPass5In", document.getElementsByName('HPennerPass5In')[0].value);

}
// Seite neu laden ----------
window.location.reload();
},false);

// AP #5c
// Wurde Schliessen geklickt dann...
document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
// Seite neu laden
window.location.reload();
},false);

},false);