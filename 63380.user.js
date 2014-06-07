// ==UserScript==
// @name		[PG] x-tra login
// @namespace	[http://thx.spacequadrat.de] [http://userscripts.org/scripts/show/57745]
// @namespace	autor: das_bazie
// @description	erzeugt ein alternatieves login menue fuer 6 penner
// @version		1.0
// @include		*pennergame.de/
// @include             *pennergame.de/login/
// @include		*pennergame.de/logout/
// @include		*pennergame.de/login/check/
// @exclude		*pennergame.de/chat/applet/
// @exclude		*board.pennergame.de/*
// @exclude		*newboard.pennergame.de/*
// @exclude		*pennergame.de/change_please/*
// ==/UserScript==

// wechsellink ermitteln
var url = document.location.href;
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gotolink = "http://www.pennergame.de/overview/"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://i34.tinypic.com/1zc1h4y.jpg\">"
var cityid = "BERLIN"
var cityid2 = "Hamburg"
}
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www")>=0) {
var gotolink = "http://berlin.pennergame.de/overview/"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://i35.tinypic.com/21e0mco.jpg\">"
var cityid = "HAMBURG"
var cityid2 = "BERLIN"
}
// Linkadressen fuer pennergame ohne www
if (url.indexOf("http://pennergame")>=0) {
var gotolink = "http://berlin.pennergame.de"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://i35.tinypic.com/21e0mco.jpg\">"
var cityid = "HAMBURG"
var cityid2 = "BERLIN"
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
// penner 6
var BPennerName6 = GM_getValue("BPennerName6In");
if (BPennerName6 == null){BPennerName6 = "";};
var BPennerPass6 = GM_getValue("BPennerPass6In");
if (BPennerPass6 == null){BPennerPass6 = "";};

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

// login block 1 hamburg
// penner 1
var XtraLogInHamburgPenner1Name = "Penner 1:<input value=\""+HPennerName1+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginHamburgPenner1Pass = "<input value=\""+HPennerPass1+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInHamburgPenner1 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInHamburgPenner1Name+XtraLoginHamburgPenner1Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 2
var XtraLogInHamburgPenner2Name = "Penner 2:<input value=\""+HPennerName2+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginHamburgPenner2Pass = "<input value=\""+HPennerPass2+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInHamburgPenner2 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInHamburgPenner2Name+XtraLoginHamburgPenner2Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 3
var XtraLogInHamburgPenner3Name = "Penner 3:<input value=\""+HPennerName3+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginHamburgPenner3Pass = "<input value=\""+HPennerPass3+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInHamburgPenner3 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInHamburgPenner3Name+XtraLoginHamburgPenner3Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// block 1 hamburg zusammenfassen
var XtraLogInHamburgBlock1 = "<div class=\"XtraLogin\">"+XtraLogInHamburgPenner1+"<hr size=\"2\" color=\"#000000\">"+XtraLogInHamburgPenner2+"<hr size=\"2\" color=\"#000000\">"+XtraLogInHamburgPenner3+"</div>";

// login block 2 hamburg
// penner 4
var XtraLogInHamburgPenner4Name = "Penner 4:<input value=\""+HPennerName4+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginHamburgPenner4Pass = "<input value=\""+HPennerPass4+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInHamburgPenner4 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInHamburgPenner4Name+XtraLoginHamburgPenner4Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 5
var XtraLogInHamburgPenner5Name = "Penner 5:<input value=\""+HPennerName5+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginHamburgPenner5Pass = "<input value=\""+HPennerPass5+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInHamburgPenner5 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInHamburgPenner5Name+XtraLoginHamburgPenner5Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 6
var XtraLogInHamburgPenner6Name = "Penner 6:<input value=\""+HPennerName6+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginHamburgPenner6Pass = "<input value=\""+HPennerPass6+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInHamburgPenner6 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInHamburgPenner6Name+XtraLoginHamburgPenner6Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// block 2 hamburg zusammenfassen
var XtraLogInHamburgBlock2 = "<div class=\"XtraLogin\">"+XtraLogInHamburgPenner4+"<hr size=\"2\" color=\"#000000\">"+XtraLogInHamburgPenner5+"<hr size=\"2\" color=\"#000000\">"+XtraLogInHamburgPenner6+"</div>";

// login block 1 berlin
// penner 1
var XtraLogInBerlinPenner1Name = "Penner 1:<input value=\""+BPennerName1+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginBerlinPenner1Pass = "<input value=\""+BPennerPass1+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInBerlinPenner1 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInBerlinPenner1Name+XtraLoginBerlinPenner1Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 2
var XtraLogInBerlinPenner2Name = "Penner 2:<input value=\""+BPennerName2+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginBerlinPenner2Pass = "<input value=\""+BPennerPass2+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInBerlinPenner2 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInBerlinPenner2Name+XtraLoginBerlinPenner2Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 3
var XtraLogInBerlinPenner3Name = "Penner 3:<input value=\""+BPennerName3+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginBerlinPenner3Pass = "<input value=\""+BPennerPass3+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInBerlinPenner3 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInBerlinPenner3Name+XtraLoginBerlinPenner3Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// block 1 berlin zusammenfassen
var XtraLogInBerlinBlock1 = "<div class=\"XtraLogin\">"+XtraLogInBerlinPenner1+"<hr size=\"2\" color=\"#000000\">"+XtraLogInBerlinPenner2+"<hr size=\"2\" color=\"#000000\">"+XtraLogInBerlinPenner3+"</div>";

// login block 2 Berlin
// penner 4
var XtraLogInBerlinPenner4Name = "Penner 4:<input value=\""+BPennerName4+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginBerlinPenner4Pass = "<input value=\""+BPennerPass4+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInBerlinPenner4 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInBerlinPenner4Name+XtraLoginBerlinPenner4Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 5
var XtraLogInBerlinPenner5Name = "Penner 5:<input value=\""+BPennerName5+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginBerlinPenner5Pass = "<input value=\""+BPennerPass5+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInBerlinPenner5 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInBerlinPenner5Name+XtraLoginBerlinPenner5Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// penner 6
var XtraLogInBerlinPenner6Name = "Penner 6:<input value=\""+BPennerName6+"\" name=\"username\" id=\"login_username\" maxlength=\"30\" size=\"20\" type=\"text\"/>";
var XtraLoginBerlinPenner6Pass = "<input value=\""+BPennerPass6+"\" maxlength=\"32\" name=\"password\" id=\"password\" type=\"hidden\"/>";
var XtraLogInBerlinPenner6 = "<form method=\"post\" action=\"/login/check/\" id=\"loginform\">"+XtraLogInBerlinPenner6Name+XtraLoginBerlinPenner6Pass+"<input class=\"formbutton\"  name=\"submitForm\" value=\"Login\" type=\"submit\"/></form>";
// block 2 berlin zusammenfassen
var XtraLogInBerlinBlock2 = "<div class=\"XtraLogin\">"+XtraLogInBerlinPenner4+"<hr size=\"2\" color=\"#000000\">"+XtraLogInBerlinPenner5+"<hr size=\"2\" color=\"#000000\">"+XtraLogInBerlinPenner6+"</div>";

// menuebildung hamburg bei http://www.pennergame und http://pennergame
if(window.location.href == "http://www.pennergame.de/" || window.location.href == "http://www.pennergame.de/logout/" || window.location.href == "http://www.pennergame.de/pw_forgotten/" || window.location.href == "http://www.pennergame.de/login/" || window.location.href == "http://www.pennergame.de/login/check/" || window.location.href == "http://pennergame.de/" || window.location.href == "http://pennergame.de/logout/" || window.location.href == "http://pennergame.de/pw_forgotten/" || window.location.href == "http://pennergame.de/login/" || window.location.href == "http://pennergame.de/login/check/")
{var XtraLogInMenue = ""+XtraLogInHamburgBlock1+XtraLogInHamburgBlock2+"";}
// menuebildung berlin bei http://berlin.pennergame
if(window.location.href == "http://berlin.pennergame.de/" || window.location.href == "http://berlin.pennergame.de/logout/" || window.location.href == "http://berlin.pennergame.de/pw_forgotten/" || window.location.href == "http://berlin.pennergame.de/login/" || window.location.href == "http://berlin.pennergame.de/login/check/")
{var XtraLogInMenue = ""+XtraLogInBerlinBlock1+XtraLogInBerlinBlock2+"";}

// login block 3 update und infos
var XtraLogInSwitchLink = "<a href=\""+gotolink+"\" title=\"Switch to "+cityid2+"\">"+switchpic+" "+cityid+"</a>";
var XtraLogInOptionen = "<input type=\"submit\" class=\"formbutton\" name=\"EinstellungenXtraLogIn\" value=\"Einstellungen\" />";

// block 3 zusammenfassen
var XtraLogInBlock3 = "<div id=\"XtraLogInInfo\" class=\"XtraLogin\"><a href=\"http://userscripts.org/scripts/show/60297\" title=\"Userscripts.org\">X-Tra Login Menue V 1.1</a><hr size=\"2\" color=\"#000000\">"+XtraLogInSwitchLink+"<hr size=\"2\" color=\"#000000\">"+XtraLogInOptionen+"</div>";

// menue div erzeugen
var XtraLoginDiv = document.createElement('div');
document.body.appendChild(XtraLoginDiv);
// menue einfuegen
XtraLoginDiv.innerHTML = "<div name=\"XtraLogInMainDiv\" id=\"XtraLoginMainDiv\">"+XtraLogInMenue+XtraLogInBlock3+"</div>";

// optionsmenue
if (url.indexOf("http://berlin")>=0)
{var OXtraLogInTop = "Einstellungen f&uuml;r Berlin";}
else
{var OXtraLogInTop = "Einstellungen f&uuml;r Hamburg";}
// penner 1
if (url.indexOf("http://berlin")>=0)
{var OXtraLogInPenner1 = "<p>Penner 1:</p>Name:<input name=\"BPennerName1In\" size=\"30\" type=\"text\" value=\""+BPennerName1+"\" /><br/>Passwort:<input name=\"BPennerPass1In\" size=\"30\" type=\"password\" value=\""+BPennerPass1+"\" />";}
else
{var OXtraLogInPenner1 = "<p>Penner 1:</p>Name:<input name=\"HPennerName1In\" size=\"30\" type=\"text\" value=\""+HPennerName1+"\" /><br/>Passwort:<input name=\"HPennerPass1In\" size=\"30\" type=\"password\" value=\""+HPennerPass1+"\" />";}
// penner 2
if (url.indexOf("http://berlin")>=0)
{var OXtraLogInPenner2 = "<p>Penner 2:</p>Name:<input name=\"BPennerName2In\" size=\"30\" type=\"text\" value=\""+BPennerName2+"\" /><br/>Passwort:<input name=\"BPennerPass2In\" size=\"30\" type=\"password\" value=\""+BPennerPass2+"\" />";}
else
{var OXtraLogInPenner2 = "<p>Penner 2:</p>Name:<input name=\"HPennerName2In\" size=\"30\" type=\"text\" value=\""+HPennerName2+"\" /><br/>Passwort:<input name=\"HPennerPass2In\" size=\"30\" type=\"password\" value=\""+HPennerPass2+"\" />";}
// penner 3
if (url.indexOf("http://berlin")>=0)
{var OXtraLogInPenner3 = "<p>Penner 3:</p>Name:<input name=\"BPennerName3In\" size=\"30\" type=\"text\" value=\""+BPennerName3+"\" /><br/>Passwort:<input name=\"BPennerPass3In\" size=\"30\" type=\"password\" value=\""+BPennerPass3+"\" />";}
else
{var OXtraLogInPenner3 = "<p>Penner 3:</p>Name:<input name=\"HPennerName3In\" size=\"30\" type=\"text\" value=\""+HPennerName3+"\" /><br/>Passwort:<input name=\"HPennerPass3In\" size=\"30\" type=\"password\" value=\""+HPennerPass3+"\" />";}
// penner 4
if (url.indexOf("http://berlin")>=0)
{var OXtraLogInPenner4 = "<p>Penner 4:</p>Name:<input name=\"BPennerName4In\" size=\"30\" type=\"text\" value=\""+BPennerName4+"\" /><br/>Passwort:<input name=\"BPennerPass4In\" size=\"30\" type=\"password\" value=\""+BPennerPass4+"\" />";}
else
{var OXtraLogInPenner4 = "<p>Penner 4:</p>Name:<input name=\"HPennerName4In\" size=\"30\" type=\"text\" value=\""+HPennerName4+"\" /><br/>Passwort:<input name=\"HPennerPass4In\" size=\"30\" type=\"password\" value=\""+HPennerPass4+"\" />";}
// penner 5
if (url.indexOf("http://berlin")>=0)
{var OXtraLogInPenner5 = "<p>Penner 5:</p>Name:<input name=\"BPennerName5In\" size=\"30\" type=\"text\" value=\""+BPennerName5+"\" /><br/>Passwort:<input name=\"BPennerPass5In\" size=\"30\" type=\"password\" value=\""+BPennerPass5+"\" />";}
else
{var OXtraLogInPenner5 = "<p>Penner 5:</p>Name:<input name=\"HPennerName5In\" size=\"30\" type=\"text\" value=\""+HPennerName5+"\" /><br/>Passwort:<input name=\"HPennerPass5In\" size=\"30\" type=\"password\" value=\""+HPennerPass5+"\" />";}
// penner 6
if (url.indexOf("http://berlin")>=0)
{var OXtraLogInPenner6 = "<p>Penner 6:</p>Name:<input name=\"BPennerName6In\" size=\"30\" type=\"text\" value=\""+BPennerName6+"\" /><br/>Passwort:<input name=\"BPennerPass6In\" size=\"30\" type=\"password\" value=\""+BPennerPass6+"\" />";}
else
{var OXtraLogInPenner6 = "<p>Penner 6:</p>Name:<input name=\"HPennerName6In\" size=\"30\" type=\"text\" value=\""+HPennerName6+"\" /><br/>Passwort:<input name=\"HPennerPass6In\" size=\"30\" type=\"password\" value=\""+HPennerPass6+"\" />";}

if (url.indexOf("http://berlin")>=0)
{var OXtraLogInInfo = "Auf dieser Einstellungsseite werden nur Penner f&uuml;r <font color=\"green\" weight=\"bold\" size=\"15px\"><u>Berlin</u></font> verwaltet!!";}
else
{var OXtraLogInInfo = "Auf dieser Einstellungsseite werden nur Penner f&uuml;r <font color=\"green\" weight=\"bold\" size=\"15px\"><u>Hamburg</u></font> verwaltet!!";}

var XtraLogInOptionenMenue1 = "<div id=\"OXtraLogInSettings\" class=\"XtraLogin\">"+OXtraLogInPenner1+"<hr size=\"2\" color=\"#000000\">"+OXtraLogInPenner2+"<hr size=\"2\" color=\"#000000\">"+OXtraLogInPenner3+"</div>";
var XtraLogInOptionenMenue2 = "<div id=\"OXtraLogInSettings\" class=\"XtraLogin\">"+OXtraLogInPenner4+"<hr size=\"2\" color=\"#000000\">"+OXtraLogInPenner5+"<hr size=\"2\" color=\"#000000\">"+OXtraLogInPenner6+"</div>";

var XtraLogInSpeichern = "<input type=\"submit\" class=\"formbutton\"  name=\"SpeichernXtraLogIn\" value=\"Speichern\" />";
var XtraLogInSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenXtraLogIn\" value=\"Abbrechen\" />";
var XtraLogInOptionenMenue3 = "<div id=\"XtraLogInInfo\" class=\"XtraLogin\">"+OXtraLogInTop+"<hr size=\"2\" color=\"#000000\">"+XtraLogInSchliessen+""+XtraLogInSpeichern+"<hr size=\"2\" color=\"#000000\">"+OXtraLogInInfo+"</div>";

// beim klick auf einstellungen
document.getElementsByName('EinstellungenXtraLogIn')[0].addEventListener('click', function EinstellungenXtraLogIn () {
// optionsmenue bilden
document.getElementsByName('XtraLogInMainDiv')[0].innerHTML = ""+XtraLogInOptionenMenue1+XtraLogInOptionenMenue2+XtraLogInOptionenMenue3+"";
// speichern klicken
document.getElementsByName('SpeichernXtraLogIn')[0].addEventListener('click', function Schliessen () {

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
// berlin penner 6 name und passwort
GM_setValue("BPennerName6In", document.getElementsByName('BPennerName6In')[0].value);
GM_setValue("BPennerPass6In", document.getElementsByName('BPennerPass6In')[0].value);

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
// hamburg penner 6 name und passwort
GM_setValue("HPennerName6In", document.getElementsByName('HPennerName6In')[0].value);
GM_setValue("HPennerPass6In", document.getElementsByName('HPennerPass6In')[0].value);
}

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