// ==UserScript==
// @name         X-Tra Menu 1.8 by kingfr3sh 24.April 09
// @namespace    Autor: kingfr3sh & bazie, auf Basis von: FB55
// @namespace    [http://userscripts.org/scripts/show/47349] [thx.spacequadrat.de]
// @description  Fuegt ein Umfangs- und informationsreiches Menue links ein.
// @include     *pennergame.de/*
// @include		*pennergame.de/change_please/statistics/
// @exclude		http://newboard.pennergame.de
// @exclude		http://change.pennergame.de/*
// @exclude		http://*.pennergame.de/change_please/*
// @exclude		http://berlin.pennergame.de/change_please_action/*
// ==/UserScript==
// ==UserScript==

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
// ermitteln gewonnene, verlorene kaempfe innerhalb der Bande
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
Benoetigtbrot = Math.ceil(Alk/35);

// AGP #7
// Banden-Infos bekommen
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

pcolor[6] = '#660000'; //rot
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
pcolor[24] = '#009900';// gruen

// AGP #12
// >>Bei vollen Spenden soll die Anzeige rot werden
var maxspenden = ""+maxspenden1+""

if (spendenbisherpur>spenden1) {
 var spenden = "<span style=\"color:red\"><big><b>"+spendenbisherpur+" / "+maxspenden1+"</b></big></span>";
}
 else {
 var spenden = "<span style=\"color:green\"><big><b>"+spendenbisherpur+" / "+maxspenden1+"</b></big></span>";
}
 
var maxflaschen = "1"

// AGP #13
// >>Menue-Punkte
var CTitle = "<li><a target=\"_blank\" href=\"http://userscripts.org/users/87874/\" title=\"X-Tra Men&uuml; (c) 2009 by kingfr3sh & bazie (zum script immer up2date)\"><span style=\"color:cyan\"><b>X-tra Men&uuml; </b>1.8</span></a></li>"

var CName = "<li><a href=\""+gotolink+"\" title=\"Switch to "+cityid2+"\"<span style=\"color:#99B200;\"><b>"+cityid+"</b></span></a></li>";

var CMenuepenner = "<li><a target=\"_blank\" href=\"http://thx.spacequadrat.de/\" title=\"thx homepage\"><span style=\"color:#DF8418\"><b>#### PENNER ####</span></a></li>";

var CSpenden = "<li><a href=\"/change_please/statistics/\"  title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Spenden: </span>"+spenden+"</a></li>";

var CWaschen = "<li><a href=\"/city/washhouse/\" title=\"waschen\"><b>Zu <font color=\""+color[clean]+"\">"+clean+"%</font> sauber</b></a><div align=\"center\"><form method=\"post\" action=\"/city/washhouse/buy/\"><input type=\"hidden\" value=\"2\" name=\"id\"><img src=\"http://img3.abload.de/img/schwamve0k.png\" width=\"16\" height=\"16\">&nbsp;<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r&nbsp;25,00&nbsp;&euro;&nbsp;\"></form></div></li>";

var CUebersicht = "<li><a href=\"/overview/\">&Uuml;bersicht</a></li>";

var CNachrichten = "<li><a href=\"/messages/\"><img src=\"http://media.pennergame.de/img/overview/new_msg.gif\">&nbsp;Nachrichten</a></li>";
 
var CFriends = "<li><a href=\""+link+"/friendlist/\">Freundesliste</a></li>";
 
var CProfil = "<li><a href=\""+link+"/profil/id:" + userid + "/\" title=\"Dein Profil\">"+Name+"</a></li>";

var CHigh = "<li><a class=\"tooltip\" href=\""+hslink+"/\">Let´s Fight ("+hs2+")<span><u>MIN / MAX Angriffspunkte</u><br><b>Von <font color=\"green\">"+attmin+"</font> bis <font color=\"red\">"+attmax+"</font> Punkte</b></span></a></li>";

var CMenuebande = "<li><a href=\"/gang/upgrades/\" title=\"Bandeneigentum\"><span style=\"color:#DF8418;\"><b>#### BANDE ####</b></span></a></li>"

var CBande = "<li><a class=\"tooltip\" href=\""+link+"/gang/\">"+bandenname+"<span><u>Kämpfe: <font color=\"green\">Gewonnen</font> / <font color=\"red\">Verloren</font></u><br><b><font color=\"green\">"+bkw2+"</font> zu <font color=\"red\">"+bkl2+"</font></b><br><br><u>Bandenpunkte:</u><b> "+bandenpunkte+"</b><br><u>Bandenposition:</u><b> "+bandenposition+"</b><br><u>Bandenmitglieder:</u><b> "+bandenmember+"</b></span></a></li>";
 
var CBandenprofil = "<li><a href=\""+link+"/profil/bande:"+bandenid+"/\">Bandenprofil</a></li>";

var CMember = "<li><a href=\""+link+"/gang/memberlist/\">Mitglieder</a></li>";

var CForum = "<li><a href=\""+link+"/gang/forum/\">Bandenforum</a></li>";

var CKasse = "<a class=\"tooltip\" href=\"/gang/credit/\"><img src=\"http://media.pennergame.de/de/img/cash.png\"> Bandenkasse<span><u>Kontostand Bandenkasse:</u><br><b>"+bg2+"&euro;</b></span></a><li><div align=\"center\"><form method=\"post\" action=\"/gang/cash/add/\"><input name=\"f_money\" type=\"text\" id=\"f_money\" size=\"3\"><input type=\"submit\" name=\"Submit\" value=\" €  Einzahlen\"><input name=\"f_comment\" type=\"hidden\" value=\"Für Bande\"></form><div></li>";

var CAdmin = "<li><a href=\""+link+"/gang/admin/\">(Co-)Adminbereich</a></li>";

var CMenuerest = "<li><a href=\"/city/supermarket/\" title=\"Supermarkt\"><span style=\"color:#DF8418;\"><b>#### SONST. ####</b></span></a></li>"

var CSuchen = "<li><form method=\"GET\" action=\""+link+"/highscore/search/\"><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/buddy/buddy_on.png\" alt=\"user\" title=\"user\"><font color=\"#262626\">.</color><input name=\"name\" type=\"text\" size=\"2\"><input class=\"formbutton\" type=\"submit\" value=\"Suchen\"></form></li>";
 
var CBier = "<li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Bier\"><input id=\"Bier\" type=\"hidden\" value=\"0.35\" /><input type=\"hidden\" name=\"promille\" value=\"35\" /><input type=\"hidden\" name=\"id\" value=\"1\" /><img src=\"http://media.pennergame.de/img/inventar/Bier.png\" alt=\"Bier\" title=\"Bier\" /><font color=\"#262626\">.</color><input id=\"menge_Bier\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbier+" /><input id=\"drink_Bier\" type=\"submit\" value=\"Trinken\"/></form></li>";

var CBrot = "<li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Brot\"><input id=\"Brot\" type=\"hidden\" value=\"-0.35\" /><input type=\"hidden\" name=\"promille\" value=\"-35\" /><input type=\"hidden\" name=\"id\" value=\"2\" /><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/inventar/Brot.png\" alt=\"Brot\" title=\"Brot\" /><font color=\"#262626\">.</color><input id=\"menge_Brot\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbrot+" /><input id=\"drink_Brot\" type=\"submit\" value=\"Essen\" /></form></li></ul></div></span>";

// AGP #14
// ab 18er Flaschenkurs wird der Kurs fett angezeigt
if (kurs <= 18) {
var CFlaschen = "<a href=\""+link+"/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" style=\"color:white\">Pfandflaschen <small><font color=\""+pcolor[kurs]+"\">("+kurs+"ct)</font></small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}
else {
var CFlaschen = "<a href=\""+link+"/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" style=\"color:white\">Pfandflaschen <small><b><font color=\""+pcolor[kurs]+"\">("+kurs+"ct)</font></b></span></small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}

// >>um den CAdmin Bereich zu aktivieren, einfach die 2 Backslashs & Sternchen entfernen.Das es so aussieht + CAdmin +

// AGP #15
// >>Hier wird nun das Menue gebildet
var Linkkette = ""+CTitle + CName + CMenuepenner + CSpenden + CWaschen + CUebersicht + CNachrichten + CFriends +  CProfil + CHigh + CMenuebande + CBande + CBandenprofil + CMember + CForum + CKasse + /*CAdmin +*/ CMenuerest + CSuchen + CFlaschen + CBier + CBrot +""

document.getElementById("footer").innerHTML += "<span style=\"position:fixed;bottom:20px;left:20px;-moz-border-radius:20px;-moz-opacity:0.7;opacity:0.7;border:1px solid #000000; background-color:#313131\"><div class=\"content\" style=\"padding-top:15px\"><ul><ul>"+Linkkette+"</ul></div></span>";

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