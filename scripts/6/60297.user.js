// ==UserScript==
// @name		[PG] x-tra login
// @namespace	[http://thx.spacequadrat.de] [http://userscripts.org/scripts/show/57745]
// @namespace	autor: das_bazie
// @description	erzeugt ein alternatieves login menue fuer 6 penner
// @version		1.5.5
// @include		*pennergame.de/*
// @include		*clodogame.fr/*
// @include		*mendigogame.es/*
// @include		*menelgame.pl/*
// @include		*dossergame.co.uk/*
// @include		*serserionline.com/*
// @include		*bumrise.com/*
// @include     *faveladogame.com.br/*
// @exclude      *change_please*
// @exclude      *board*
// @exclude		 *chat*
// @exclude      *forum*
// @exclude      *redirect*
// @exclude      *highscore*
// ==/UserScript==

// seitenadresse auslesen
var url = document.location.href;

// seitenspezifische optionen
// hamburg
if (url.indexOf("http://www.pennergame.de/")>=0) {
var city = "Hamburg";
var gamelink = "http://www.pennergame.de"
var select_1 = "<option selected value=\"http://www.pennergame.de/\">Hamburg</option>";}
else
{var select_1 = "<option value=\"http://www.pennergame.de/\">Hamburg</option>";}
// berlin
if (url.indexOf("http://berlin.pennergame.de/")>=0) {
var city = "Berlin";
var gamelink = "http://berlin.pennergame.de"
var select_2 = "<option selected value=\"http://berlin.pennergame.de/\">Berlin</option>";}
else
{var select_2 = "<option value=\"http://berlin.pennergame.de/\">Berlin</option>";}
// muenchen
if (url.indexOf("http://muenchen.pennergame.de/")>=0) {
var city = "M&uuml;nchen";
var gamelink = "http://muenchen.pennergame.de"
var select_3 = "<option selected value=\"http://muenchen.pennergame.de/\">M&uuml;nchen</option>";}
else
{var select_3 = "<option value=\"http://muenchen.pennergame.de/\">M&uuml;nchen</option>";}
// muenchen
if (url.indexOf("http://halloween.pennergame.de/")>=0) {
var city = "Halloween";
var gamelink = "http://halloween.pennergame.de"
var select_4 = "<option selected value=\"http://halloween.pennergame.de/\">Halloween</option>";}
else
{var select_4 = "<option value=\"http://halloween.pennergame.de/\">Halloween</option>";}
// Warschau
if (url.indexOf("http://warzawa.menelgame.pl/")>=0) {
var city = "Warschau";
var gamelink = "http://warzawa.menelgame.pl"
var select_5 = "<option selected value=\"http://warzawa.menelgame.pl/\">Warschau</option>";}
else
{var select_5 = "<option value=\"http://warzawa.menelgame.pl/\">Warschau</option>";}
// Krakau
if (url.indexOf("http://krakow.menelgame.pl/")>=0) {
var city = "Krakau";
var gamelink = "http://krakow.menelgame.pl"
var select_6 = "<option selected value=\"http://krakow.menelgame.pl/\">Krakau</option>";}
else
{var select_6 = "<option value=\"http://krakow.menelgame.pl/\">Krakau</option>";}
// paris
if (url.indexOf("http://paris.clodogame.fr/")>=0) {
var city = "Paris";
var gamelink = "http://paris.clodogame.fr"
var select_7 = "<option selected value=\"http://paris.clodogame.fr/\">Paris</option>";}
else
{var select_7 = "<option value=\"http://paris.clodogame.fr/\">Paris</option>";}
// marseille
if (url.indexOf("http://marseille.clodogame.fr/")>=0) {
var city = "Marseille";
var gamelink = "http://marseille.clodogame.fr"
var select_8 = "<option selected value=\"http://marseille.clodogame.fr/\">Marseille</option>";}
else
{var select_8 = "<option value=\"http://marseille.clodogame.fr/\">Marseille</option>";}
// madrid
if (url.indexOf("http://www.mendigogame.es/")>=0) {
var city = "Madrid";
var gamelink = "http://www.mendigogame.es"
var select_9 = "<option selected value=\"http://www.mendigogame.es/\">Madrid</option>";}
else
{var select_9 = "<option value=\"http://www.mendigogame.es/\">Madrid</option>";}
// london
if (url.indexOf("http://www.dossergame.co.uk/")>=0) {
var city = "London";
var gamelink = "http://www.dossergame.co.uk"
var select_10 = "<option selected value=\"http://www.dossergame.co.uk/\">London</option>";}
else
{var select_10 = "<option value=\"http://www.dossergame.co.uk/\">London</option>";}
// istanbul
if (url.indexOf("http://www.serserionline.com/")>=0) {
var city = "Istanbul";
var gamelink = "http://www.serserionline.com"
var select_11 = "<option selected value=\"http://www.serserionline.com/\">Istanbul</option>";}
else
{var select_11 = "<option value=\"http://www.serserionline.com/\">Istanbul</option>";}
// new york
if (url.indexOf("http://www.bumrise.com/")>=0) {
var city = "New York";
var gamelink = "http://www.bumrise.com"
var select_12 = "<option selected value=\"http://www.bumrise.com/\">New York</option>";}
else
{var select_12 = "<option value=\"http://www.bumrise.com/\">New York</option>";}
// Rio de Janero
if (url.indexOf("faveladogame.com.br/")>=0) {
var city = "Rio de Janero";
var gamelink = "http://www.faveladogame.com.br"
var select_13 = "<option selected value=\"http://www.faveladogame.com.br/\">Rio de Janero</option>";}
else
{var select_13 = "<option value=\"http://www.faveladogame.com.br/\">Rio de Janero</option>";}

var selectbox = ""+select_1+select_2+select_3+select_4+select_5+select_6+select_7+select_8+select_9+select_10+select_11+select_12+select_13+"";

// angaben fuer Updatefunktion
var CurrentScriptVersion = '1.5.5';
var xmlurl = 'http://userscripts.org/scripts/show/60297';
var downloadurl = 'http://userscripts.org/scripts/source/60297.user.js';

// Updaterequest
GM_xmlhttpRequest({
   method: 'GET',
   url: xmlurl,
   onload: function(responseDetails) {
      var content = responseDetails.responseText;
		try{
		var neueversion = content.split('<h3>Version:')[1].split('</h3>')[0];
		}
		catch(err){
		var neueversion = ""+CurrentScriptVersion+""
		}
		
// Userinfos
GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/overview/",
	onload: function( response ) {
		var content = response.responseText;
		try{
		var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
		}
		catch(err){
		var userid = 0
		}

// css in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// css fuer menue
addGlobalStyle('#XtraLoginMainDiv {position:absolute; left:50%; margin-left:-500px; top:68px; width:768px; }')
addGlobalStyle('.XtraLogin { text-align:right; width:240px; float:left; background-image:url(http://media.pennergame.de/img/pv4/bg_grunge-right-info.png); font-size:12px; font-weight:bold; padding:8px; }')
addGlobalStyle('#XtraLogInInfo a { color:blue; font-weight:bold; text-decoration:none; font-size:13px; } ')
addGlobalStyle('#XtraLogInInfo a:hover { color:red; font-weight:bold; text-decoration:none; font-size:13px; }')
addGlobalStyle('#XtraLogInInfo { text-align:center; }')
addGlobalStyle('#OXtraLogInSettings { text-align:right; } ')
addGlobalStyle('#OXtraLogInSettings p { text-align:center; } ')

// voreinstellungen penner 1-6
//penner 1
var pennerName1 = GM_getValue("pennerName1In" + location.protocol + location.host + location.path, "Penner 1");
var pennerPass1 = GM_getValue("pennerPass1In" + location.protocol + location.host + location.path, "");
//penner 2
var pennerName2 = GM_getValue("pennerName2In" + location.protocol + location.host + location.path, "Penner 2");
var pennerPass2 = GM_getValue("pennerPass2In" + location.protocol + location.host + location.path, "");
//penner 3
var pennerName3 = GM_getValue("pennerName3In" + location.protocol + location.host + location.path, "Penner 3");
var pennerPass3 = GM_getValue("pennerPass3In" + location.protocol + location.host + location.path, "");
//penner 4
var pennerName4 = GM_getValue("pennerName4In" + location.protocol + location.host + location.path, "Penner 4");
var pennerPass4 = GM_getValue("pennerPass4In" + location.protocol + location.host + location.path, "");
//penner 5
var pennerName5 = GM_getValue("pennerName5In" + location.protocol + location.host + location.path, "Penner 5");
var pennerPass5 = GM_getValue("pennerPass5In" + location.protocol + location.host + location.path, "");
//penner 6
var pennerName6 = GM_getValue("pennerName6In" + location.protocol + location.host + location.path, "Penner 6");
var pennerPass6 = GM_getValue("pennerPass6In" + location.protocol + location.host + location.path, "");

// login block 1
// penner 1
var loginPennerName1 = "Penner 1:<input value=\""+pennerName1+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var loginPennerPass1 = "<input value=\""+pennerPass1+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var loginPenner1 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+loginPennerName1+loginPennerPass1+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 2
var loginPennerName2 = "Penner 2:<input value=\""+pennerName2+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var loginPennerPass2 = "<input value=\""+pennerPass2+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var loginPenner2 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+loginPennerName2+loginPennerPass2+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 3
var loginPennerName3 = "Penner 3:<input value=\""+pennerName3+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var loginPennerPass3 = "<input value=\""+pennerPass3+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var loginPenner3 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+loginPennerName3+loginPennerPass3+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// block 1 zusammenfassen
var loginBlock1 = "<div class=\"XtraLogin\">"+loginPenner1+"<hr size=\"2\" color=\"#000000\">"+loginPenner2+"<hr size=\"2\" color=\"#000000\">"+loginPenner3+"</div>";

// login block 2
// penner 4
var loginPennerName4 = "Penner 1:<input value=\""+pennerName4+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var loginPennerPass4 = "<input value=\""+pennerPass4+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var loginPenner4 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+loginPennerName4+loginPennerPass4+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 5
var loginPennerName5 = "Penner 2:<input value=\""+pennerName5+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var loginPennerPass5 = "<input value=\""+pennerPass5+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var loginPenner5 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+loginPennerName5+loginPennerPass5+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 6
var loginPennerName6 = "Penner 3:<input value=\""+pennerName6+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var loginPennerPass6 = "<input value=\""+pennerPass6+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var loginPenner6 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+loginPennerName6+loginPennerPass6+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// block 2 zusammenfassen
var loginBlock2 = "<div class=\"XtraLogin\">"+loginPenner4+"<hr size=\"2\" color=\"#000000\">"+loginPenner5+"<hr size=\"2\" color=\"#000000\">"+loginPenner6+"</div>";

var loginSwitchLink = "CitySwitch => <select onChange=\"document.location.href=this.value\">"+selectbox+"</select>";
var loginOptionen = "<input type=\"submit\" class=\"formbutton\" name=\"EinstellungenXtraLogIn\" value=\"Einstellungen\" />";

if (CurrentScriptVersion != neueversion) {
var loginBlock3 = "<div id=\"XtraLogInInfo\" class=\"XtraLogin\"><a href=\"http://userscripts.org/scripts/show/60297\" target=\"_blank\" title=\"Update Verf&uuml;gbar\"><font color=\"red\">X-Tra Login Menue V:"+CurrentScriptVersion+"</font></a><hr size=\"2\" color=\"#000000\">"+loginSwitchLink+"<hr size=\"2\" color=\"#000000\">"+loginOptionen+"</div>";
}else{
var loginBlock3 = "<div id=\"XtraLogInInfo\" class=\"XtraLogin\"><a href=\"http://userscripts.org/scripts/show/60297\" target=\"_blank\" title=\"Userscripts.org\">X-Tra Login Menue V:"+CurrentScriptVersion+"</a><hr size=\"2\" color=\"#000000\">"+loginSwitchLink+"<hr size=\"2\" color=\"#000000\">"+loginOptionen+"</div>";
}

if (userid == 0) {

// menue div erzeugen
var XtraLoginDiv = document.createElement('div');
document.body.appendChild(XtraLoginDiv);
// menue einfuegen
XtraLoginDiv.innerHTML = "<div name=\"XtraLogInMainDiv\" id=\"XtraLoginMainDiv\">"+loginBlock1+loginBlock2+loginBlock3+"</div>";

var oLoginTop = "Einstellungen f&uuml;r "+city+"";
var oLoginPenner1 = "<p>Penner 1:</p>Name:<input name=\"pennerName1In\" size=\"30\" type=\"text\" value=\""+pennerName1+"\" /><br/>Passwort:<input name=\"pennerPass1In\" size=\"30\" type=\"password\" value=\""+pennerPass1+"\" />";
var oLoginPenner2 = "<p>Penner 2:</p>Name:<input name=\"pennerName2In\" size=\"30\" type=\"text\" value=\""+pennerName2+"\" /><br/>Passwort:<input name=\"pennerPass2In\" size=\"30\" type=\"password\" value=\""+pennerPass2+"\" />";
var oLoginPenner3 = "<p>Penner 3:</p>Name:<input name=\"pennerName3In\" size=\"30\" type=\"text\" value=\""+pennerName3+"\" /><br/>Passwort:<input name=\"pennerPass3In\" size=\"30\" type=\"password\" value=\""+pennerPass3+"\" />";
var oLoginPenner4 = "<p>Penner 4:</p>Name:<input name=\"pennerName4In\" size=\"30\" type=\"text\" value=\""+pennerName4+"\" /><br/>Passwort:<input name=\"pennerPass4In\" size=\"30\" type=\"password\" value=\""+pennerPass4+"\" />";
var oLoginPenner5 = "<p>Penner 5:</p>Name:<input name=\"pennerName5In\" size=\"30\" type=\"text\" value=\""+pennerName5+"\" /><br/>Passwort:<input name=\"pennerPass5In\" size=\"30\" type=\"password\" value=\""+pennerPass5+"\" />";
var oLoginPenner6 = "<p>Penner 6:</p>Name:<input name=\"pennerName6In\" size=\"30\" type=\"text\" value=\""+pennerName6+"\" /><br/>Passwort:<input name=\"pennerPass6In\" size=\"30\" type=\"password\" value=\""+pennerPass6+"\" />";
var oLoginInfo = "Auf dieser Einstellungsseite werden nur Penner f&uuml;r <font color=\"green\" weight=\"bold\" size=\"15px\"><u>"+city+"</u></font> verwaltet!!";

var loginOptionenMenue1 = "<div id=\"OXtraLogInSettings\" class=\"XtraLogin\">"+oLoginPenner1+"<hr size=\"2\" color=\"#000000\">"+oLoginPenner2+"<hr size=\"2\" color=\"#000000\">"+oLoginPenner3+"</div>";
var loginOptionenMenue2 = "<div id=\"OXtraLogInSettings\" class=\"XtraLogin\">"+oLoginPenner4+"<hr size=\"2\" color=\"#000000\">"+oLoginPenner5+"<hr size=\"2\" color=\"#000000\">"+oLoginPenner6+"</div>";

var loginSpeichern = "<input type=\"submit\" class=\"formbutton\"  name=\"SpeichernXtraLogIn\" value=\"Speichern\" />";
var loginSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenXtraLogIn\" value=\"Abbrechen\" />";
var loginOptionenMenue3 = "<div id=\"XtraLogInInfo\" class=\"XtraLogin\">"+oLoginTop+"<hr size=\"2\" color=\"#000000\">"+loginSchliessen+""+loginSpeichern+"<hr size=\"2\" color=\"#000000\">"+oLoginInfo+"</div>";

// beim klick auf einstellungen
document.getElementsByName('EinstellungenXtraLogIn')[0].addEventListener('click', function EinstellungenXtraLogIn () {
// optionsmenue bilden
document.getElementsByName('XtraLogInMainDiv')[0].innerHTML = ""+loginOptionenMenue1+loginOptionenMenue2+loginOptionenMenue3+"";
// speichern klicken
document.getElementsByName('SpeichernXtraLogIn')[0].addEventListener('click', function Schliessen () {

// penner 1 name und passwort
GM_setValue("pennerName1In" + location.protocol + location.host + location.path, document.getElementsByName('pennerName1In')[0].value);
GM_setValue("pennerPass1In" + location.protocol + location.host + location.path, document.getElementsByName('pennerPass1In')[0].value);
// penner 2 name und passwort
GM_setValue("pennerName2In" + location.protocol + location.host + location.path, document.getElementsByName('pennerName2In')[0].value);
GM_setValue("pennerPass2In" + location.protocol + location.host + location.path, document.getElementsByName('pennerPass2In')[0].value);
// penner 3 name und passwort
GM_setValue("pennerName3In" + location.protocol + location.host + location.path, document.getElementsByName('pennerName3In')[0].value);
GM_setValue("pennerPass3In" + location.protocol + location.host + location.path, document.getElementsByName('pennerPass3In')[0].value);
// penner 4 name und passwort
GM_setValue("pennerName4In" + location.protocol + location.host + location.path, document.getElementsByName('pennerName4In')[0].value);
GM_setValue("pennerPass4In" + location.protocol + location.host + location.path, document.getElementsByName('pennerPass4In')[0].value);
// penner 5 name und passwort
GM_setValue("pennerName5In" + location.protocol + location.host + location.path, document.getElementsByName('pennerName5In')[0].value);
GM_setValue("pennerPass5In" + location.protocol + location.host + location.path, document.getElementsByName('pennerPass5In')[0].value);
// penner 6 name und passwort
GM_setValue("pennerName6In" + location.protocol + location.host + location.path, document.getElementsByName('pennerName6In')[0].value);
GM_setValue("pennerPass6In" + location.protocol + location.host + location.path, document.getElementsByName('pennerPass6In')[0].value);

// nach speichern Seite neu laden ----------
window.location.reload();
},false);

// Wurde Schliessen geklickt dann...
document.getElementsByName('SchliessenXtraLogIn')[0].addEventListener('click', function Schliessen () {
// Seite neu laden
window.location.reload();
},false);

// nach einstellungen neu laden
},false);

}else{

// menue div erzeugen
var XtraLoginDiv = document.createElement('div');
document.body.appendChild(XtraLoginDiv);
// menue einfuegen
XtraLoginDiv.innerHTML = "";

}

// klammern fuer userid
}})
// klammern fuer update
}})