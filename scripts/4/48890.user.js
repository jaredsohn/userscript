// ==UserScript==
// @name         X-Tra Menu 1.9 beta6  by kingfr3sh.user 25. April 09
// @namespace    Autor: kingfr3sh & bazie, auf Basis von: FB55
// @namespace    [http://userscripts.org/users/87874/] [thx.spacequadrat.de]
// @description  Fuegt ein Umfangs- und informationsreiches Menue links ein.
// @include      *pennergame.de/*
// @exclude		 http://newboard.pennergame.de
// @exclude		 http://change.pennergame.de/*
// ==/UserScript==
// ==UserScript==



// changelog: 25.04.09
// Sauberkeit, Waschen 6€, Waschen 25€, Uebersicht, Nachrichten, Freundesliste, Admin, Spieler suchen, Bier, Wodka, Brot, Currywurst, Hamburger als Einstellungsoption hinzugefügt
// Script nochmal mit Trennlinien unterteilt wegen der Uebersicht


// AGP #1
// richtige Linkadresse, Spendenanzahl und Staedtenamen fuer Wechsellink
var url = document.location.href;

// AGP #1a
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
var hslink1 = "http://berlin.pennergame.de/highscore"
var cityid = "BERLIN"
var cityid2 = "HAMBURG"
var maxspenden1 = 10
var spenden1 = 9
}
// AGP #1b
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www")>=0) {
var link = "http://www.pennergame.de"
var hslink1 = "http://highscore.pennergame.de/highscore"
var cityid = "HAMBURG"
var cityid2 = "BERLIN"
var maxspenden1 = 50
var spenden1 = 49
}
// AGP #1c
// Linkadressen fuer pennergame ohne www
if (url.indexOf("http://pennergame")>=0) {
var link = "http://pennergame.de"
var hslink1 = "http://highscore.pennergame.de/highscore"
var cityid = "HAMBURG"
var cityid2 = "BERLIN"
var maxspenden1 = 50
var spenden1 = 49
}

// AGP #2
// richtigen Wechsellink ermitteln
if (url.indexOf("http://berlin")>=0) {
var gotolink = "http://www.pennergame.de/overview/"
} else {
var gotolink = "http://berlin.pennergame.de/overview/"
}

// AGP #3
// ermitteln gewonnene, verlorene Kaempfe innerhalb der Bande
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/gang/memberlist/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var bkw1 = acontent.split('Gewonnene K&auml;mpfe: <strong>')[1];			
			var bkw2 = bkw1.split('</strong>')[0];								
			var bkl1 = acontent.split('Verlorene K&auml;mpfe: <strong>')[1];					
			var bkl2 = bkl1.split('</strong>')[0];								

// AGP #4
// Kontostand Bandenkasse ermitteln		
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/gang/",
        onload: function(responseDetails) {
        	var gcontent = responseDetails.responseText;
			var bn1 = gcontent.split('<td width="500" height="15" align="left" valign="top"><span class="tiername">')[1];
			var bg1 = gcontent.split('<td>Kasse: &euro;')[1];								
			var bg2 = bg1.split('</td>')[0];								

// AGP #5
// Userinfos und Flaschenkurs ermitteln
GM_xmlhttpRequest({
  method: 'GET',
  url: ""+link+"/overview/",
      onload: function( response ) {
      var content = response.responseText;
      var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
      var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
      var prom2 = content.match(/\u003E([0-9]\.[0-9]+)\u0026permil\u003B\u003C/)[1];
      var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
      var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];
	  var kurs = content.split('<a href="/stock/bottle/"><span id="pfandflaschen_kurs_ajax">')[1].split('</span> Cent</a>')[0];

// AGP #6
// Benoetigte Brot- und Biermenge ausrechnen:
if(document.getElementById("pfandflaschen_kurs_ajax_style")){
Pos = document.getElementsByTagName("li")[2].innerHTML.indexOf(".");
Alk = document.getElementsByTagName("li")[2].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 299 - Alk;
Benoetigtbier = Math.floor(Benoetigtprozent/35);
Benoetigtwodka = Math.floor(Benoetigtprozent/250);
Benoetigtbrot = Math.ceil(Alk/35);
Benoetigtwurst = Math.ceil(Alk/100);
Benoetigtburger = Math.ceil(Alk/200);

// AGP #7
// Banden- ID und Name bekommen
GM_xmlhttpRequest({
      method: 'GET',
      url: ""+link+"/dev/api/user."+userid+".xml",
      onload: function(responseDetails) {
           var content = responseDetails.responseText;
         var bandenid = content.split('<id>')[2].split('</id>')[0];
         var bandenname = content.split('<name>')[2].split('</name>')[0];
         var hs2 = content.split('<points>')[1].split('</points>')[0];

// AGP #8		 
// Bandeninformationen ermitteln
GM_xmlhttpRequest({
    method: 'GET',
   	url: ""+link+"/dev/api/gang."+bandenid+".xml",
	onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var bandenpunkte = dom.getElementsByTagName('points')[0].textContent; 
		var bandenposition = dom.getElementsByTagName('position')[0].textContent;
		var bandenmember = dom.getElementsByTagName('member_count')[0].textContent;

// AGP #9
// min-, max- Angriffspunkte ermitteln
GM_xmlhttpRequest({
   method: 'GET',
   url: ""+link+"/fight/overview/",
       onload: function( response ) {
         var lf = response.responseText;
         var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
         var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];

var hslink = ""+hslink1+"/range/?max_points="+attmax+"&min_points="+attmin+"&serverload=low"

// AGP #10
// Farben fuer Sauberkeit in %
var color = new Array();

color[0] = "#CC0000"; //rot 0%
color[10] = "#CC3300"; // 10%
color[20] = "#FF0000"; // 20%
color[30] = "#FF3300"; // 30%
color[40] = "#FF6600"; // 40%
color[50] = "#FF9900"; // 50%
color[60] = "#FFCC00"; // 60%
color[70] = "#CCCC00"; // 70%
color[80] = "#99CC00"; // 80%
color[90] = "#33CC00"; // 90%
color[100] = "#009900"; //gruen 100%

// AGP #11
// Farben fuer Pfandkurs
var pcolor = new Array();

pcolor[6] = '#660000'; //rot (6 cent)
pcolor[7] = '#990000';
pcolor[8] = '#FF0000';
pcolor[9] = '#FF3300';
pcolor[10] = '#FF6600';
pcolor[11] = '#FF9900';
pcolor[12] = '#FFFF00';
pcolor[13] = '#CCFF00';
pcolor[14] = '#99FF00';
pcolor[15] = '#33FF00';
pcolor[16] = '#00FF00';
pcolor[17] = '#33CC00';
pcolor[18] = '#009900';
pcolor[19] = '#009900';
pcolor[20] = '#009900';
pcolor[21] = '#009900';
pcolor[22] = '#009900';
pcolor[23] = '#009900';
pcolor[24] = '#009900';// gruen (24 cent)

// AGP #12
// >>Bei vollen Spenden soll die Anzeige gruen werden der letzte Wert ist das Ziel, darum gruen, unter maximaler Spende wird es rot angezeigt
var maxspenden = ""+maxspenden1+""

if (spendenbisherpur>spenden1) {
 var spenden = "<font color=\"green\"size=\"3px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"2px\">"+maxspenden1+"</font></b>";
}
 else {
 var spenden = "<font color=\"red\"size=\"2px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"3px\">"+maxspenden1+"</font></b>";
}

 
var maxflaschen = "1"

// AGP #13a
// Settings Part 1 (Position des Menues)

// Menueposition von Unten / Oben (in Pixel) (20)
var MenueBottom = GM_getValue("MenueBottomIn");
if (MenueBottom == null){MenueBottom = "20";};
// Menueposition von Links / Rechts (in Pixel) (20)
var MenueLeft = GM_getValue("MenueLeftIn");
if (MenueLeft == null){MenueLeft = "20";};
// Menueposition Oben / Unten
var MenueTopBottom = GM_getValue("MenueTopBottomIn");
if (MenueTopBottom == null){MenueTopBottom = "bottom";};
// Menueposition Rechts / Links
var MenueRightLeft = GM_getValue("MenueRightLeftIn");
if (MenueRightLeft == null){MenueRightLeft = "left";};

// ------------------------------------------------------------------------------------------------------------------------------
// AGP #13b
// Settings Part 2 (Menuepunkte Standardeinstellungen true= standardmaessig an / false= standardmaessig aus)

// Button Sauberkeit anzeigen (true = anzeigen | false = nicht anzeigen)
var Sauberkeit = GM_getValue("MenueSauberkeitIn");
if (Sauberkeit == null){Sauberkeit = "true";};

// Button Waschen 6 € anzeigen (true = anzeigen | false = nicht anzeigen)
var Waschen6 = GM_getValue("MenueWaschen6In");
if (Waschen6 == null){Waschen6 = "false";};

// Button Waschen 25 € anzeigen (true = anzeigen | false = nicht anzeigen)
var Waschen25 = GM_getValue("MenueWaschen25In");
if (Waschen25 == null){Waschen25 = "true";};

// Uebersicht anzeigen (true = anzeigen | false = nicht anzeigen)
var Uebersicht = GM_getValue("MenueUebersichtIn");
if (Uebersicht == null){Uebersicht = "true";};

// Nachrichten anzeigen (true = anzeigen | false = nicht anzeigen)
var Nachrichten = GM_getValue("MenueNachrichtenIn");
if (Nachrichten == null){Nachrichten = "true";};

// Freundesliste anzeigen (true = anzeigen | false = nicht anzeigen)
var Friends = GM_getValue("MenueFriendsIn");
if (Friends == null){Friends = "true";};

// (Co)-Admin anzeigen (true = Anzeigen | false = nicht anzeigen)
var Admin = GM_getValue("MenueAdminIn");
if (Admin == null) {Admin = "false";};

// Button Spieler Suchen anzeigen (true = Anzeigen | false = nicht anzeigen)
var Suchen = GM_getValue("MenueSuchenIn");
if (Suchen == null){Suchen = "true";};

// Button Bier anzeigen (true = Anzeigen | false = nicht anzeigen)
var Bier = GM_getValue("MenueBierIn");
if (Bier == null){Bier = "true";};

// Button Wodka anzeigen (true = Anzeigen | false = nicht anzeigen)
var Wodka = GM_getValue("MenueWodkaIn");
if (Wodka == null){Wodka = "false";};

// Button Brot anzeigen (true = Anzeigen | false = nicht anzeigen)
var Brot = GM_getValue("MenueBrotIn");
if (Brot == null){Brot = "true";};

// Button Currywurst anzeigen (true = Anzeigen | false = nicht anzeigen)
var Currywurst = GM_getValue("MenueCurrywurstIn");
if (Currywurst == null){Currywurst = "false";};

// Button Hamburger anzeigen (true = Anzeigen | false = nicht anzeigen)
var Hamburger = GM_getValue("MenueHamburgerIn");
if (Hamburger == null){Hamburger = "false";};


// -----------------------------------------------------------------------------------------------------------------------------

// AGP #14
// >>Menue-Punkte
var CTitle = "<li><a target=\"_blank\" href=\"http://userscripts.org/users/87874/\" title=\"X-Tra Men&uuml; (c) 2009 by kingfr3sh & bazie (zum script immer up2date)\"><span style=\"color:cyan\"><b>X-tra Men&uuml; </b>1.9 beta</span></a></li>"
// Switch
var CName = "<li><a href=\""+gotolink+"\" title=\"Switch to "+cityid2+"\"<span style=\"color:#99B200;\"><b>"+cityid+"</b></span></a></li>";

var CMenuepenner = "<li><a target=\"_blank\" href=\"http://thx.spacequadrat.de/\" title=\"thx homepage\"><span style=\"color:#DF8418\"><b>#### PENNER ####</span></a></li>";

var CSpenden = "<li><a href=\"/change_please/statistics/\"  title=\"Spenden-Statistik\"><font color=\"#ffffff\"><b>Spenden: </b></font>"+spenden+"</a></li>";

if (Sauberkeit == "true")
{var CSauberkeit = "<li><a href=\"/city/washhouse/\" title=\"waschen\"><b><font color=\"#ffffff\">Zu </font><font color=\""+color[clean]+"\">"+clean+"%</font><font color=\"#ffffff\"> sauber</font></b></a></li>";}
else{var CSauberkeit = "";};

if (Waschen6 == "true")
{var CWaschen6 = "<li><div align=\"center\"><form method=\"post\" action=\"/city/washhouse/buy/\"><input type=\"hidden\" value=\"1\" name=\"id\"><img src=\"http://img3.abload.de/img/schwamve0k.png\" width=\"16\" height=\"16\">&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r&nbsp;6,00&nbsp;&euro;&nbsp;&nbsp;\"></form></div></li>";}
else{var CWaschen6 = "";};

if (Waschen25 == "true")
{var CWaschen25 = "<li><div align=\"center\"><form method=\"post\" action=\"/city/washhouse/buy/\"><input type=\"hidden\" value=\"2\" name=\"id\"><img src=\"http://img3.abload.de/img/schwamve0k.png\" width=\"16\" height=\"16\">&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r&nbsp;25,00&nbsp;&euro;&nbsp;\"></form></div></li>";}
else{var CWaschen25 = "";};

if (Uebersicht == "true")
{var CUebersicht = "<li><a href=\"/overview/\"><font color=\"#ffffff\">&Uuml;bersicht</font></a></li>";}
else{var CUebersicht = "";};

if (Nachrichten == "true")
{var CNachrichten = "<li><a href=\"/messages/\"><img src=\"http://media.pennergame.de/img/overview/new_msg.gif\"><font color=\"#ffffff\">&nbsp;Nachrichten</font></a></li>";}
else{var CNachrichten = "";};
 
if (Friends == "true")
{var CFriends = "<li><a href=\""+link+"/friendlist/\"><font color=\"#ffffff\">Freundesliste</font></a></li>";}
else{var CFriends = "";};
 
var CProfil = "<li><a href=\""+link+"/profil/id:" + userid + "/\" title=\"Dein Profil\"><font color=\"#ffffff\">"+Name+"</font></a></li>";

var CHigh = "<li><a class=\"tooltip\" href=\""+hslink+"/\"><font color=\"#ffffff\">Let´s Fight ("+hs2+")</font><span><u>Angriffspunkte</u><br><b>Von <font color=\"green\">"+attmin+"</font> bis <font color=\"red\">"+attmax+"</font></b></span></a></li>";

var CMenuebande = "<li><a href=\"/gang/upgrades/\" title=\"Bandeneigentum\"><span style=\"color:#DF8418;\"><b>#### BANDE ####</b></span></a></li>"

var CBande = "<li><a class=\"tooltip\" href=\""+link+"/gang/\"><font color=\"#ffffff\">"+bandenname+"</font><span><u>K&auml;mpfe: <font color=\"green\"><br>Gewonnen</font> / <font color=\"red\">Verloren</font></u><br><b><font color=\"green\">"+bkw2+"</font> zu <font color=\"red\">"+bkl2+"</font></b><br><br><u>Punkte:</u><b> "+bandenpunkte+"</b><br><u>Position:</u><b> "+bandenposition+"</b><br><u>Mitglieder:</u><b> "+bandenmember+"</b></span></a></li>";
 
var CBandenprofil = "<li><a href=\""+link+"/profil/bande:"+bandenid+"/\"><font color=\"#ffffff\">Bandenprofil</font></a></li>";

var CMember = "<li><a href=\""+link+"/gang/memberlist/\"><font color=\"#ffffff\">Mitglieder</font></a></li>";

var CForum = "<li><a href=\""+link+"/gang/forum/\"><font color=\"#ffffff\">Bandenforum</font></a></li>";

var CKasse = "<a class=\"tooltip\" href=\"/gang/credit/\"><img src=\"http://media.pennergame.de/de/img/cash.png\"><font color=\"#ffffff\"> Bandenkasse</font><span><u>Kontostand:</u><br><b>"+bg2+"&euro;</b></span></a><li><div align=\"center\"><form method=\"post\" action=\"/gang/cash/add/\"><input name=\"f_money\" type=\"text\" id=\"f_money\" size=\"3\"><input type=\"submit\" name=\"Submit\" value=\"€ Einzahlen\"><input name=\"f_comment\" type=\"hidden\" value=\"Für Bande\"></form><div></li>";

if (Admin == "true")
{var CAdmin = "<li><a href=\""+link+"/gang/admin/\"><font color=\"#ffffff\">(Co-)Adminbereich</font></a></li>";}
else{var CAdmin = "";};

var CMenuerest = "<li><a href=\"/city/supermarket/\" title=\"Supermarkt\"><span style=\"color:#DF8418;\"><b>#### SONST. ####</b></span></a></li>"

if (Suchen == "true")
{var CSuchen = "<li><form method=\"GET\" action=\""+link+"/highscore/search/\"><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/buddy/buddy_on.png\" alt=\"user\" title=\"user\"><font color=\"#262626\">.</color><input name=\"name\" type=\"text\" size=\"2\"><input class=\"formbutton\" type=\"submit\" value=\"Suchen\"></form></li>";}
else{var CSuchen = "";};
 
if (Bier == "true")
{var CBier = "<li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Bier\"><input id=\"Bier\" type=\"hidden\" value=\"0.35\" /><input type=\"hidden\" name=\"promille\" value=\"35\" /><input type=\"hidden\" name=\"id\" value=\"1\" /><img src=\"http://media.pennergame.de/img/inventar/Bier.png\" alt=\"Bier\" title=\"Bier\" /><font color=\"#262626\">.</color><input id=\"menge_Bier\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbier+" /><input id=\"drink_Bier\" type=\"submit\" value=\"Trinken\"/></form></li>";}
else{var CBier = "";};

if (Wodka == "true")
{var CWodka = "<li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Wodka\"><input id=\"Wodka\" type=\"hidden\" value=\"2.50\" /><input type=\"hidden\" name=\"promille\" value=\"250\" /><input type=\"hidden\" name=\"id\" value=\"7\" /><img src=\"http://media.pennergame.de/img/inventar/Wodka.png\" alt=\"Wodka\" title=\"Wodka\" /><font color=\"#262626\">.</color><input id=\"menge_Wodka\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtwodka+" /><input id=\"drink_Wodka\" type=\"submit\" value=\"Trinken\"/></form></li>";}
else{var CWodka = "";};

if (Brot == "true")
{var CBrot = "<li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Brot\"><input id=\"Brot\" type=\"hidden\" value=\"-0.35\" /><input type=\"hidden\" name=\"promille\" value=\"-35\" /><input type=\"hidden\" name=\"id\" value=\"2\" /><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/inventar/Brot.png\" alt=\"Brot\" title=\"Brot\" /><font color=\"#262626\">.</color><input id=\"menge_Brot\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbrot+" /><input id=\"drink_Brot\" type=\"submit\" value=\"Essen\" /></form></li>";}
else{var CBrot = "";};

if (Currywurst == "true")
{var CCurrywurst = "<li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Currywurst\"><input id=\"Currywurst\" type=\"hidden\" value=\"-1.00\" /><input type=\"hidden\" name=\"promille\" value=\"-100\" /><input type=\"hidden\" name=\"id\" value=\"3\" /><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/inventar/Currywurst.png\" alt=\"Currywurst\" title=\"Currywurst\" /><font color=\"#262626\">.</color><input id=\"menge_Currywurst\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtwurst+" /><input id=\"drink_Currywurst\" type=\"submit\" value=\"Essen\" /></form></li>";}
else{var CCurrywurst = "";};

if (Hamburger == "true")
{var CHamburger = "<li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Hamburger\"><input id=\"Hamburger\" type=\"hidden\" value=\"-2.00\" /><input type=\"hidden\" name=\"promille\" value=\"-200\" /><input type=\"hidden\" name=\"id\" value=\"4\" /><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/inventar/Hamburger.png\" alt=\"Hamburger\" title=\"Hamburger\" /><font color=\"#262626\">.</color><input id=\"menge_Hamburger\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtburger+" /><input id=\"drink_Hamburger\" type=\"submit\" value=\"Essen\" /></form></li>";}
else{var CHamburger = "";};

var CEinstellungen = "<li><div align=\"center\"><input type=\"submit\" class=\"formbutton\" name=\"EinstellungenExtraMenue\" value=\"# Einstellungen #\" /></div></li>";

var CSpeichern = "<li><div align=\"center\">_______________________<br><input type=\"submit\" class=\"formbutton\"  name=\"SpeichernExtraMenue\" value=\"Speichern\" />";
var CSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" /><br>&nbsp;</li></div>";

// ------------------------------------------------------------------------------------------------------------------------------

// AGP #15
// ab 18er Flaschenkurs wird der Kurs fett angezeigt
if (kurs <= 18) {
var CFlaschen = "<a href=\""+link+"/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" style=\"color:white\"><b>Pfandflaschen </b><small><font color=\""+pcolor[kurs]+"\">("+kurs+"ct)</font></small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}
else {
var CFlaschen = "<a href=\""+link+"/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" style=\"color:white\">Pfandflaschen </b><small><b><font color=\""+pcolor[kurs]+"\">("+kurs+"ct)</font></b></span></small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}

// AGP #16
// >>Hier wird nun das Menue gebildet
var Linkkette = ""+ CTitle + CName + CMenuepenner + CSpenden + CSauberkeit + CWaschen6 + CWaschen25 + CUebersicht + CNachrichten + CFriends +  CProfil + CHigh + CMenuebande + CBande + CBandenprofil + CMember + CForum + CKasse + CAdmin + CMenuerest + CSuchen + CFlaschen + CBier + CWodka + CBrot + CCurrywurst + CHamburger +""

document.getElementById("footer").innerHTML += "<span name=\"Menue\" style=\"position:fixed;"+MenueTopBottom+":"+MenueBottom+"px;"+MenueRightLeft+":"+MenueLeft+"px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:0.7;opacity:0.7;border:1px solid #000000; background-color:#313131\"><div class=\"content\" style=\"padding-top:15px\"><ul>"+Linkkette+CEinstellungen+"</ul></div></span>";

// AGP #16
// Settings Part 3 (Optionsmenue Menuepunkte)

// Optionsmenue Optik
// Menueabstand von Unten Einstellungsoption
var OMenueBottom = "<div align=\"center\"><a>Abstand Unten / Oben</a><input name=\"MenueBottomIn\" size=\"10\" type=\"text\" value=\""+MenueBottom+"\" />&nbsp<span style=\"color:#CCCCCC;\">(Pixel)</span></div>";
// Menueabstand von Links Einstellungsoption
var OMenueLeft = "<div align=\"center\"><a>Abstand Links / Rechts</a><input name=\"MenueLeftIn\" type=\"text\" size=\"10\" value=\""+MenueLeft+"\" />&nbsp<span style=\"color:#CCCCCC;\">(Pixel)</span></div>";
// Menueposition Oben / Unten Einstellungsoption
var OMenueAusrichtung = "<div align=\"center\"><a>Men&uuml; Ausrichtung</a><br><select size=\"1\" name=\"MenueTopBottomIn\"><option selected value=\"Bottom\">Unten</option><option value=\"top\">Oben</option></select><select size=\"1\" name=\"MenueRightLeftIn\"><option selected value=\"left\">Links</option><option value=\"right\">Rechts</option></select></div>";

// Optikmenue Linkkette bilden
var OMenueOptik = "<br><a><span style=\"color:#DF8418;\"><b>Optikoptionen</b></a></span>"+OMenueBottom+OMenueLeft+OMenueAusrichtung;

// ------------------------------------------------------------------------------------------------------------------------------
// Optionsmenue Menuepunkte
// Waschen fuer 6 €
if (Waschen6 == "true")
{var OWaschen6 = "<div align=\"left\"><input name=\"MenueWaschen6In\" type=\"checkbox\" checked=\"checked\" /><span style=\"color:#CCCCCC;\">waschen 6 &euro;</span></div>";}
else
{var OWaschen6 = "<div align=\"left\"><input name=\"MenueWaschen6In\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">waschen 6 &euro;</span></div>";};
// Waschen fuer 25 €
if (Waschen25 == "true")
{var OWaschen25 = "<div align=\"left\"><input name=\"MenueWaschen25In\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">waschen 25 &euro;</span></div>";}
else
{var OWaschen25 = "<div align=\"left\"><input name=\"MenueWaschen25In\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">waschen 25 &euro;</span></div>";};
// Sauberkeit
if (Sauberkeit == "true")
{var OSauberkeit = "<div align=\"left\"><input name=\"SauberkeitIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Sauberkeit</span></div>";}
else
{var OSauberkeit = "<div align=\"left\"><input name=\"SauberkeitIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Sauberkeit</span></div>";};
// Uebersicht
if (Uebersicht == "true")
{var OUebersicht = "<div align=\"left\"><input name=\"UebersichtIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">&Uuml;bersicht</span></div>";}
else
{var OUebersicht = "<div align=\"left\"><input name=\"UebersichtIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">&Uuml;bersicht</span></div>";};
// Nachrichten
if (Nachrichten == "true")
{var ONachrichten = "<div align=\"left\"><input name=\"NachrichtenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Nachrichten</span></div>";}
else
{var ONachrichten = "<div align=\"left\"><input name=\"NachrichtenIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Nachrichten</span></div>";};
// Freundesliste
if (Friends == "true")
{var OFriends = "<div align=\"left\"><input name=\"FriendsIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Freundesliste</span></div>";}
else
{var OFriends = "<div align=\"left\"><input name=\"FriendsIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Freundesliste</span></div>";};
// Admin
if (Admin == "true")
{var OAdmin = "<div align=\"left\"><input name=\"AdminIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">(Co)-Admin</span></div>";}
else
{var OAdmin = "<div align=\"left\"><input name=\"AdminIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">(Co)-Admin</span></div>";};
// Spieler suchen
if (Suchen == "true")
{var OSuchen = "<div align=\"left\"><input name=\"SuchenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Spieler suchen</span></div>";}
else
{var OSuchen = "<div align=\"left\"><input name=\"SuchenIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Spieler suchen</span></div>";};
// Bier trinken
if (Bier == "true")
{var OBier = "<div align=\"left\"><input name=\"BierIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Bier</span></div>";}
else
{var OBier = "<div align=\"left\"><input name=\"BierIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Bier</span></div>";};
// Wodka trinken
if (Wodka == "true")
{var OWodka = "<div align=\"left\"><input name=\"WodkaIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Wodka</span></div>";}
else
{var OWodka = "<div align=\"left\"><input name=\"WodkaIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Wodka</span></div>";};
// Brot essen
if (Brot == "true")
{var OBrot = "<div align=\"left\"><input name=\"BrotIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Brot</span></div>";}
else
{var OBrot = "<div align=\"left\"><input name=\"BrotIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Brot</span></div>";};
// Currywurst essen
if (Currywurst == "true")
{var OCurrywurst = "<div align=\"left\"><input name=\"CurrywurstIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Currywurst</span></div>";}
else
{var OCurrywurst = "<div align=\"left\"><input name=\"CurrywurstIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Currywurst</span></div>";};
// Hamburger essen
if (Hamburger == "true")
{var OHamburger = "<div align=\"left\"><input name=\"HamburgerIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Hamburger</span></div>";}
else
{var OHamburger = "<div align=\"left\"><input name=\"HamburgerIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Hamburger</span></div>";};

// ------------------------------------------------------------------------------------------------------------------------------

// Optionsmenue Linkkette bilden
var OMenueLinks = "<br><a><span style=\"color:#DF8418;\"><b>Linkoptionen</b></a></span>"+OSauberkeit+OWaschen6+OWaschen25+OUebersicht+ONachrichten+OFriends+OAdmin+OSuchen+OBier+OWodka+OBrot+OCurrywurst+OHamburger;

// Optionsmenue Funktionen
// Wurde Einstellungen geklickt dann...
document.getElementsByName('EinstellungenExtraMenue')[0].addEventListener('click', function EinstellungenExtraMenue () {

// Einstellungs Menue einfuegen
document.getElementsByName('Menue')[0].innerHTML = "<span style=\"position:fixed;"+MenueTopBottom+":"+MenueBottom+"px;"+MenueRightLeft+":"+MenueLeft+"px;-moz-border-radius:20px;-moz-opacity:0.7;opacity:0.7;border:1px solid #000000; background-color:#313131\"><div class=\"content\" style=\"padding-top:15px\"><ul><li><div align=\"center\"><span style=\"color:#0099FF; font-size:14px;\"><b>EINSTELLUNGEN</b></span></div></li>"+OMenueOptik+OMenueLinks+CSpeichern+CSchliessen+"</ul></div></span>";

// Wurde Speichern geklickt dann...
document.getElementsByName('SpeichernExtraMenue')[0].addEventListener('click', function Schliessen () {

// Speichern...
// ... der Optischen Einstellungen
GM_setValue("MenueBottomIn", document.getElementsByName('MenueBottomIn')[0].value);
GM_setValue("MenueLeftIn", document.getElementsByName('MenueLeftIn')[0].value);
GM_setValue("MenueTopBottomIn", document.getElementsByName('MenueTopBottomIn')[0].value);
GM_setValue("MenueRightLeftIn", document.getElementsByName('MenueRightLeftIn')[0].value);

// ... der anzuzeigenden Links im Menue
// Sauberkeit
if (document.getElementsByName('SauberkeitIn')[0].checked == true)
{GM_setValue("MenueSauberkeitIn", "true");}else{GM_setValue("MenueSauberkeitIn", "false");}
// Waschen fuer 6 €
if (document.getElementsByName('MenueWaschen6In')[0].checked == true)
{GM_setValue("MenueWaschen6In", "true");}else{GM_setValue("MenueWaschen6In", "false");}
// Waschen fuer 25 €
if (document.getElementsByName('MenueWaschen25In')[0].checked == true)
{GM_setValue("MenueWaschen25In", "true");}else{GM_setValue("MenueWaschen25In", "false");}
// Uebersicht
if (document.getElementsByName('UebersichtIn')[0].checked == true)
{GM_setValue("MenueUebersichtIn", "true");}else{GM_setValue("MenueUebersichtIn", "false");}
// Nachrichten
if (document.getElementsByName('NachrichtenIn')[0].checked == true)
{GM_setValue("MenueNachrichtenIn", "true");}else{GM_setValue("MenueNachrichtenIn", "false");}
// Freundesliste
if (document.getElementsByName('FriendsIn')[0].checked == true)
{GM_setValue("MenueFriendsIn", "true");}else{GM_setValue("MenueFriendsIn", "false");}
// Adminbereich
if (document.getElementsByName('AdminIn')[0].checked == true)
{GM_setValue("MenueAdminIn", "true");}else{GM_setValue("MenueAdminIn", "false");}
// Spieler suchen
if (document.getElementsByName('SuchenIn')[0].checked == true)
{GM_setValue("MenueSuchenIn", "true");}else{GM_setValue("MenueSuchenIn", "false");}
// Bier trinken
if (document.getElementsByName('BierIn')[0].checked == true)
{GM_setValue("MenueBierIn", "true");}else{GM_setValue("MenueBierIn", "false");}
// Wodka trinken
if (document.getElementsByName('WodkaIn')[0].checked == true)
{GM_setValue("MenueWodkaIn", "true");}else{GM_setValue("MenueWodkaIn", "false");}
// Brot essen
if (document.getElementsByName('BrotIn')[0].checked == true)
{GM_setValue("MenueBrotIn", "true");}else{GM_setValue("MenueBrotIn", "false");}
// Currywurst essen
if (document.getElementsByName('CurrywurstIn')[0].checked == true)
{GM_setValue("MenueCurrywurstIn", "true");}else{GM_setValue("MenueCurrywurstIn", "false");}
// Hamburger essen
if (document.getElementsByName('HamburgerIn')[0].checked == true)
{GM_setValue("MenueHamburgerIn", "true");}else{GM_setValue("MenueHamburgerIn", "false");}

// ------------------------------------------------------------------------------------------------------------------------------

// Seite neu laden ----------
window.location.reload();
},false);

// Wurde Schliessen geklickt dann...
document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
// Seite neu laden
window.location.reload();
},false);

},false);
}
}
)
}
}
)
}
}
)
}
}
})
}
}
)
}
}
)