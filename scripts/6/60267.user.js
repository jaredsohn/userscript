// ==UserScript==
// @name	[PG] X-Tra Menue
// @Author	kingfr3sh
// @namespace	http://userscripts.org/scripts/show/60267
// @description	Fuegt ein alternatives Navigationsmenue ein
// @version	4.7.0 Nahrung & Waschen entfernt, Farben Sauberkeit Lebenspunkte geändert!

// @include	*pennergame.de/*
// @exclude	*pennergame.de/chat/applet/
// @exclude	*board.pennergame.de/*
// @exclude	*newboard.pennergame.de/*
// @exclude	*pennergame.de/change_please/*
// ==/UserScript==

// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// css fuer Hauptcontainer
addGlobalStyle('div#xtra_menue_container {list-style:none;}')
// css fuer links (normal)
addGlobalStyle('div.xtra_menue_content a {background: url(http://static.pennergame.de/img/pv4/bg_subnav-off.png) no-repeat; height:20px; display:block; color:#2b1c0c; text-decoration:none; padding:10px 0px 0px 0px; margin-top:-5px;font-size:12px; font-weight:bold; width:130px;}')
// css link class 1
addGlobalStyle('div.xtra_menue_content a.xtra_link_1 {background: url(http://static.pennergame.de/img/pv4/bg_subnav-off1.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_1:hover {background: url(http://static.pennergame.de/img/pv4/bg_subnav-on1.png) no-repeat;}')
// css link class 2
addGlobalStyle('div.xtra_menue_content a.xtra_link_2 {background: url(http://static.pennergame.de/img/pv4/bg_subnav-off2.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_2:hover {background: url(http://static.pennergame.de/img/pv4/bg_subnav-on2.png) no-repeat;}')
// css link class 3
addGlobalStyle('div.xtra_menue_content a.xtra_link_3 {background: url(http://static.pennergame.de/img/pv4/bg_subnav-off3.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_3:hover {background: url(http://static.pennergame.de/img/pv4/bg_subnav-on3.png) no-repeat;}')
// css link class 4
addGlobalStyle('div.xtra_menue_content a.xtra_link_4 {background: url(http://static.pennergame.de/img/pv4/bg_subnav-off4.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_4:hover {background: url(http://static.pennergame.de/img/pv4/bg_subnav-on4.png) no-repeat;}')
// css link class 5
addGlobalStyle('div.xtra_menue_content a.xtra_link_5 {background: url(http://static.pennergame.de/img/pv4/bg_subnav-off5.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_5:hover {background: url(http://static.pennergame.de/img/pv4/bg_subnav-on5.png) no-repeat;}')
// css h5 (Menue-Block Ueberschrift)
addGlobalStyle('#xtra_menue_container h5 {background: url(http://static.pennergame.de/img/pv4/bg_subnav-off.png) no-repeat;text-align:right;color:orange;font-size:15px;font-weight:bold;padding:6px 10px 4px 0px;margin-top:4px;margin-bottom:-5px;cursor:pointer;width:120px;height:15px;}')
// css fuer Tooltips
addGlobalStyle('a.tooltip1, a.tooltip1:link, a.tooltip1:visited, a.tooltip1:active { position: relative; text-decoration: none; }')
addGlobalStyle('a.tooltip1:hover { background: transparent; z-index: 1000; }')
addGlobalStyle('a.tooltip1 span { display: none; text-decoration: none; }')
addGlobalStyle('a.tooltip1:hover span { display:block; position:absolute; top:45px; left:0px; width:105px; z-index:1000; border:1px solid #000; border-left:5px solid #767676; padding:3px 10px 3px 10px; background:#2C2C2C; color:#ffffff; font:normal Verdana,Arial,Helvetica,Sans-serif; text-align:left; }')
// css fuer Update Tooltip
addGlobalStyle('a.XtraUpdateTooltip, a.XtraUpdateTooltip:link, a.XtraUpdateTooltip:visited, a.XtraUpdateTooltip:active { position: relative; text-decoration: none; }')
addGlobalStyle('a.XtraUpdateTooltip:hover { background: transparent; z-index: 1000; }')
addGlobalStyle('a.XtraUpdateTooltip span { display: none; text-decoration: none; }')
addGlobalStyle('a.XtraUpdateTooltip:hover span { display:block; position:absolute; top:-70px; left:220px; width:310px; z-index:-100; padding:10px 10px 10px 10px; background: url(http://static.pennergame.de/img/pv4/bg_notifyme.png) repeat-y; color:#000000; font:normal Verdana,Arial,Helvetica,Sans-serif; text-align:left; }')
// css copy
addGlobalStyle('a.copy { cursor:pointer; }')

// Seitenadresse ermitteln
var url = document.location.href;

// Linkadressen fuer Hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
var hslink1 = "http://www.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://img404.imageshack.us/img404/4464/hamburgwappenkingfr3sh.png\">"
var maxspenden = 10
var spenden1 = 9
var select_1 = "<option selected value=\"http://www.pennergame.de\">Hamburg</option>"
}else{
var select_1 = "<option value=\"http://www.pennergame.de\">Hamburg</option>"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de"
var hslink1 = "http://berlin.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://img72.imageshack.us/img72/3351/berlinwappenkingfr3sh.png\">"
var maxspenden = 10
var spenden1 = 9
var select_2 = "<option selected value=\"http://berlin.pennergame.de\">Berlin</option>"
}else{
var select_2 = "<option value=\"http://berlin.pennergame.de\">Berlin</option>"
}
// Linkadressen fuer Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var hslink1 = "http://muenchen.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://img811.imageshack.us/img811/5396/muenchenwappenkingfr3sh.png\">"
var maxspenden = 10
var spenden1 = 9
var select_3 = "<option selected value=\"http://muenchen.pennergame.de\">M&uuml;nchen</option>"
}else{
var select_3 = "<option value=\"http://muenchen.pennergame.de\">M&uuml;nchen</option>"
}

// Linkadressen fuer Koeln
if (url.indexOf("http://koeln.pennergame")>=0) {
var gamelink = "http://koeln.pennergame.de"
var hslink1 = "http://koeln.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://img339.imageshack.us/img339/6516/koelnwappenkingfr3sh.png\">"
var maxspenden = 10
var spenden1 = 9
var select_4 = "<option selected value=\"http://koeln.pennergame.de\">K&ouml;ln</option>"
}else{
var select_4 = "<option value=\"http://koeln.pennergame.de\">K&ouml;ln</option>"
}

// Linkadressen fuer HH Reloaded
if (url.indexOf("http://reloaded.pennergame")>=0) {
var gamelink = "http://reloaded.pennergame.de"
var hslink1 = "http://reloaded.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://img442.imageshack.us/img442/6686/reloadedwappenkingfr3sh.jpg\">"
var maxspenden = 10
var spenden1 = 9
var select_5 = "<option selected value=\"http://reloaded.pennergame.de\">Reloaded</option>"
}else{
var select_5 = "<option value=\"http://reloaded.pennergame.de\">Reloaded</option>"
}

// Linkadressen fuer Sylt
if (url.indexOf("http://sylt.pennergame")>=0) {
var gamelink = "http://sylt.pennergame.de"
var hslink1 = "http://sylt.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://img803.imageshack.us/img803/3083/syltwappenkingfr3sh.png\">"
var select_6 = "<option selected value=\"http://sylt.pennergame.de\">Sylt</option>"
}else{
var select_6 = "<option value=\"http://sylt.pennergame.de\">Sylt</option>"
}

// Angaben fuer Updatefunktion
var CurrentScriptVersion = '4.7.0';
var xmlurl = 'http://userscripts.org/scripts/show/60267';
var downloadurl = 'http://userscripts.org/scripts/source/60267.user.js';

// Updaterequest
GM_xmlhttpRequest({
   method: 'GET',
   url: xmlurl,
   onload: function(responseDetails) {
		var content = responseDetails.responseText;
			try{
			var neueversion = content.split('<h3>Version:')[1].split('</h3>')[0];
			}catch(e){
			var neueversion = ""+CurrentScriptVersion+""
			}

// Userinfos
GM_xmlhttpRequest({
  method: 'GET',
  url: ""+gamelink+"/overview/",
      onload: function( responseDetails ) {
      var content = responseDetails.responseText;
      var userid = content.match(/id\:([0-9]+)/)[1];
      

	if(gamelink.indexOf('sylt') > -1){
		//NUR Sylt
		var clean = content.match(/Lebenspunkte.*>(\d+)</)[1];
		var spendenbisherpur = 10;
	}else{
		//Alle Städte, bis auf Sylt
		var clean = content.match(/Sauberkeit: <b>(\d+) /)[1];
		var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
	}
	  
try {
var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];
} catch(err) {
var Name = content.split('<span style="font-family:\'CrackhousefranceRegular\'; font-size: 24px;">')[1].split('</span>')[0];
}
	  
// min-, max- Angriffspunkte ermitteln
GM_xmlhttpRequest({
   method: 'GET',
   url: ""+gamelink+"/fight/",
       onload: function( responseDetails ) {
         var lf = responseDetails.responseText;
         var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
         var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];
	  
// Banden- ID und Name bekommen
GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/dev/api/user."+userid+".xml",
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var bandenname = content.split('<name>')[2].split('</name>')[0];
		var bandenid = content.split('<id>')[2].split('</id>')[0];
		var hs2 = content.split('<points>')[1].split('</points>')[0];
		if (bandenid == "None"){
		var bandenid = 0
		}

// Bandeninformationen ermitteln
GM_xmlhttpRequest({
    method: 'GET',
   	url: ""+gamelink+"/dev/api/gang."+bandenid+".xml",
	onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			try{
			var bandenpunkte = dom.getElementsByTagName('points')[0].textContent; 
			var bandenposition = dom.getElementsByTagName('position')[0].textContent;
			var bandenmember = dom.getElementsByTagName('member_count')[0].textContent;
			}catch(err){
			var bandenpunkte = 0
			var bandenposition = 0
			var bandenmember = 0
			}
		 
// ermitteln gewonnene, verlorene Kaempfe innerhalb der Bande
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+gamelink+"/gang/memberlist/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			try{
			var bkw1 = acontent.split('Gewonnene K&auml;mpfe: <strong>')[1];			
			var bkw2 = bkw1.split('</strong>')[0];								
			var bkl1 = acontent.split('Verlorene K&auml;mpfe: <strong>')[1];					
			var bkl2 = bkl1.split('</strong>')[0];
			}catch(erro){
			var bkw1 = 0
			var bkw2 = 0
			var bkl1 = 0
			var bkl2 = 0
			}

// Kontostand Bandenkasse ermitteln		
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+gamelink+"/gang/",
        onload: function(responseDetails) {
        	var gcontent = responseDetails.responseText;
			try{
			var bn1 = gcontent.split('<td width="500" height="15" align="left" valign="top"><span class="tiername">')[1];
			var bg1 = gcontent.split('<td>Kasse: &euro;')[1];								
			var bg2 = bg1.split('</td>')[0];
			}catch(error){
			var bg2 = 0
			}

			
// Farben fuer Sauberkeit in %
var color = new Array();

color[0] = "#FF0000"; // rot 0%
color[10] = "#FF0000"; // rot 10%
color[20] = "#FF0000"; // rot 20%
color[30] = "#FF0000"; // rot 30%
color[40] = "#AF7817"; // orange 40%
color[50] = "#AF7817"; // orange 50%
color[60] = "#AF7817"; // orange 60%
color[70] = "#306754"; // mediumseagreen 70%
color[80] = "#306754"; // mediumseagreen 80%
color[90] = "#306754"; // mediumseagreen 90%
color[100] = "#347C17"; // green4 100%

// Menuepunkte Standard Einstellungen

// Xtra Menue Standard Position
// Menueposition Oben / Unten
var XtraMenueTopBottom = GM_getValue("XtraMenueTopBottomIn");
if (XtraMenueTopBottom == null){XtraMenueTopBottom = "top";};
// Menueposition von Unten / Oben (in Pixel) (345)
var XtraMenueTopBottomPx = GM_getValue("XtraMenueTopBottomPxIn");
if (XtraMenueTopBottomPx == null){XtraMenueTopBottomPx = "100";};
// Menueposition Rechts / Links
var XtraMenueRightLeft = GM_getValue("XtraMenueRightLeftIn");
if (XtraMenueRightLeft == null){XtraMenueRightLeft = "right";};
// Menueposition von Links / Rechts (in Pixel) (0)
var XtraMenueRightLeftPx = GM_getValue("XtraMenueRightLeftPxIn");
if (XtraMenueRightLeftPx == null){XtraMenueRightLeftPx = "0";};
// Menuefixierung (fixed = feststehend / absolute = scrollbar)
var XtraMenueAbsoluteFixed = GM_getValue("XtraMenueAbsoluteFixedIn");
if (XtraMenueAbsoluteFixed == null){XtraMenueAbsoluteFixed = "fixed";};
// Kassenkommentar
var XtraKassenKommentar = GM_getValue("XtraKassenKommentarIn");
if (XtraKassenKommentar == null){XtraKassenKommentar = "";};

// Xtra menue anzeigen (true = anzeigen | false = nicht anzeigen)
var XtraMenue = GM_getValue("XtraMenueIn");
if (XtraMenue == null){XtraMenue = "true";};
// Menuepunkte penner
// Pennerblock anzeigen (true = anzeigen | false = nicht anzeigen)
var PennerBlock = GM_getValue("XtraPennerBlockIn");
if (PennerBlock == null){PennerBlock = "true";};
// Spenden anzeigen (true = anzeigen | false = nicht anzeigen)
var Spenden = GM_getValue("XtraSpendenIn");
if (Spenden == null){Spenden = "true";};
// Sauberkeit anzeigen (true = anzeigen | false = nicht anzeigen)
var Sauberkeit = GM_getValue("XtraSauberkeitIn");
if (Sauberkeit == null){Sauberkeit = "true";};
// Uebersicht anzeigen (true = anzeigen | false = nicht anzeigen)
var Uebersicht = GM_getValue("XtraUebersichtIn");
if (Uebersicht == null){Uebersicht = "true";};
// Plunder anzeigen (true = anzeigen | false = nicht anzeigen)
var Plunder = GM_getValue("XtraPlunderIn");
if (Plunder == null){Plunder = "true";};
// Nachrichten anzeigen (true = anzeigen | false = nicht anzeigen)
var Nachrichten = GM_getValue("XtraNachrichtenIn");
if (Nachrichten == null){Nachrichten = "false";};
// Freunde anzeigen (true = anzeigen | false = nicht anzeigen)
var Freunde = GM_getValue("XtraFreundeIn");
if (Freunde == null){Freunde = "false";};
// Verbrechen anzeigen (true = anzeigen | false = nicht anzeigen)
var Verbrechen = GM_getValue("XtraVerbrechenIn");
if (Verbrechen == null){Verbrechen = "false";};
// Profil anzeigen (true = anzeigen | false = nicht anzeigen)
var Profil = GM_getValue("XtraProfilIn");
if (Profil == null){Profil = "true";};
// Highscore anzeigen (true = anzeigen | false = nicht anzeigen)
var Highscore = GM_getValue("XtraHighscoreIn");
if (Highscore == null){Highscore = "true";};
// Highscore anzeigen (true = anzeigen | false = nicht anzeigen)
var SuperHighscore = GM_getValue("XtraSuperHighscoreIn");
if (SuperHighscore == null){SuperHighscore = "true";};
 
// Menuepunkte Bande
// Bandeblock anzeigen (true = anzeigen | false = nicht anzeigen)
var BandeBlock = GM_getValue("XtraBandeBlockIn");
if (BandeBlock == null){BandeBlock = "true";};
// Bandenlink + Name anzeigen (true = anzeigen | false = nicht anzeigen)
var Bande = GM_getValue("XtraBandeIn");
if (Bande == null){Bande = "true";};
// Bandenprofil anzeigen (true = anzeigen | false = nicht anzeigen)
var Bandenprofil = GM_getValue("XtraBandenprofilIn");
if (Bandenprofil == null){Bandenprofil = "true";};
// Mitglieder anzeigen (true = anzeigen | false = nicht anzeigen)
var Mitglieder = GM_getValue("XtraMitgliederIn");
if (Mitglieder == null){Mitglieder = "false";};
// Forum anzeigen (true = anzeigen | false = nicht anzeigen)
var Forum = GM_getValue("XtraForumIn");
if (Forum == null){Forum = "false";};
// Kasse anzeigen (true = anzeigen | false = nicht anzeigen)
var Kasse = GM_getValue("XtraKasseIn");
if (Kasse == null){Kasse = "true";};
// Einzahlen anzeigen (true = anzeigen | false = nicht anzeigen)
var Einzahlen = GM_getValue("XtraEinzahlenIn");
if (Einzahlen == null){Einzahlen = "true";};
// Admin anzeigen (true = anzeigen | false = nicht anzeigen)
var Admin = GM_getValue("XtraAdminIn");
if (Admin == null){Admin = "false";};
// Bandeneigentum anzeigen (true = anzeigen | false = nicht anzeigen)
var Eigentum = GM_getValue("XtraEigentumIn");
if (Eigentum == null){Eigentum = "false";};
// Plunderbank anzeigen (true = anzeigen | false = nicht anzeigen)
var Plunderbank = GM_getValue("XtraPlunderbankIn");
if (Plunderbank == null){Plunderbank = "false";};
// Upgrade anzeigen (true = anzeigen | false = nicht anzeigen)
var Upgrade = GM_getValue("XtraUpgradeIn");
if (Upgrade == null){Upgrade = "false";};
// Liga anzeigen (true = anzeigen | false = nicht anzeigen)
var Liga = GM_getValue("XtraLigaIn");
if (Liga == null){Liga = "false";};
// Missionen anzeigen (true = anzeigen | false = nicht anzeigen)
var Missionen = GM_getValue("XtraMissionenIn");
if (Missionen == null){Missionen = "false";};

// Menuepunkte sonst.
// sonst.block anzeigen (true = anzeigen | false = nicht anzeigen)
var SonstigesBlock = GM_getValue("XtraSonstigesBlockIn");
if (SonstigesBlock == null){SonstigesBlock = "true";};
// Suche anzeigen (true = anzeigen | false = nicht anzeigen)
var Suche = GM_getValue("XtraSucheIn");
if (Suche == null){Suche = "true";};


// Menuepunkte erstellen (Menue ist in 4 Bloecke unterteilt, Menue-Block 1-4)

// Start Menue-Block Support
// Version
var XtraMenueSupport1 = "<a class=\"xtra_link_1\" href=\"http://userscripts.org/scripts/show/60267/\" target=\"_blank\" title=\"&copy; kingfr3sh\">X-Tra Menue "+CurrentScriptVersion+"</a>";
// userscripts.org (C)
var XtraMenueSupport2 = "<a class=\"xtra_link_5 copy\" >"+switchpic+" <select onChange=\"document.location.href=this.value\">"+select_1+select_2+select_3+select_4+select_5+select_6+"</select></a>";

// Einstellungen
var XtraMenueSupport3 = "<a class=\"xtra_link_2\" href=\""+gamelink+"/settings/\">Einstellungen</a>";
// Ende Menue-Block 4
// Linkkette Menue-Block 4
var XtraMenueBlockSupport = "<li><h5>Support</h5><div class=\"xtra_menue_content\">"+XtraMenueSupport1+XtraMenueSupport2+XtraMenueSupport3+"</div></li>";

// Start Menue-Block 1
// Spendenanzeige
if (spendenbisherpur>spenden1)
{var spenden = "<font color=\"green\"size=\"2px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"2px\">"+maxspenden+"</font></b>";}
else
{var spenden = "<font color=\"red\"size=\"2px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"2px\">"+maxspenden+"</font></b>";}
// Spenden
if (Spenden == "true" && gamelink.indexOf('sylt') == -1)
{var XtraMenueBlock1Link1 = "<a href=\""+gamelink+"/change_please/statistics/\"  title=\"Spenden-Statistik\" class=\"xtra_link_5\"><b>Spenden: "+spenden+"</b></a>";}
else{var XtraMenueBlock1Link1 = "";};
// Sauberkeit/Lebenspunkte
if (Sauberkeit == "true")
{
if(gamelink.indexOf('sylt') > -1)
{var XtraMenueBlock1Link2 = "<a href=\""+gamelink+"/city/medicine/\" class=\"xtra_link_2\"><b>Lebenspunkte: <font color=white>"+clean+"</font></b></a>";
}else{
var XtraMenueBlock1Link2 = "<a href=\""+gamelink+"/city/washhouse/\" class=\"xtra_link_2\"><b>Zu <font color=\""+color[clean]+"\">"+clean+"%</font> sauber</b></a>";}}
else{var XtraMenueBlock1Link2 = "";};
// Uebersicht
if (Uebersicht == "true")
{var XtraMenueBlock1Link5 = "<a href=\""+gamelink+"/overview/\" class=\"xtra_link_5\">&Uuml;bersicht</a>";}
else{var XtraMenueBlock1Link5 = "";};
// Plunder
if (Plunder == "true")
{var XtraMenueBlock1Link6 = "<a href=\""+gamelink+"/stock/plunder/\" class=\"xtra_link_4\">Plunder</a>";}
else{var XtraMenueBlock1Link6 = "";};
// Nachrichten
if (Nachrichten == "true")
{var XtraMenueBlock1Link7 = "<a href=\""+gamelink+"/messages/\" class=\"xtra_link_3\"><img src=\"http://static.pennergame.de/img/pv4/icons/new_msg.gif\">&nbsp;Nachrichten</a>";}
else{var XtraMenueBlock1Link7 = "";};
// Freunde
if (Freunde == "true")
{var XtraMenueBlock1Link8 = "<a href=\""+gamelink+"/friendlist/\" class=\"xtra_link_2\">Freundesliste</a>";}
else{var XtraMenueBlock1Link8 = "";};
// Verbrechen
if (Verbrechen == "true")
{var XtraMenueBlock1Link9 = "<a href=\""+gamelink+"/activities/crime/\" class=\"xtra_link_5\">Verbrechen</a>";}
else{var XtraMenueBlock1Link9 = "";};
// Profil
if (Profil == "true")
{var XtraMenueBlock1Link10 = "<a href=\""+gamelink+"/profil/id:" + userid + "/\" title=\"Dein Profil\" class=\"xtra_link_1\">"+Name+"</a>";}
else{var XtraMenueBlock1Link10 = "";};
// Lets Fight
// Highscorelink
var hslink = ""+hslink1+"/user/?min="+attmin+"&max="+attmax+"";
if (Highscore == "true")
{var XtraMenueBlock1Link11 = "<a class=\"xtra_link_4 tooltip1\" href=\""+hslink+"\">Let&#39;s Fight ("+hs2+")<span><u>Angriffspunkte</u><br><b>Von <font color=\"green\">"+attmin+"</font><br>bis <font color=\"red\">"+attmax+"</font></b></span></a>";}
else{var XtraMenueBlock1Link11 = "";};

// Superhighscore
// hse links
var SuperHighscoreHamburg = "http://hamburg.pennerzone.de/highscore/?page=1&points_min="+attmin+"&points_max="+attmax+"&gang=egal&action=Suchen&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=";
var SuperHighscoreBerlin = "http://berlin.pennerzone.de/highscore/?page=1&points_min="+attmin+"&points_max="+attmax+"&gang=egal&action=Suchen&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=";

if (SuperHighscore == "true"){
// Link Hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var XtraSuperHighscore = "<a href=\""+SuperHighscoreHamburg+"\" class=\"xtra_link_1\" target=\"_blank\" title=\"Externe Toolseite\">SuperHigscore</a>";}
// Link Berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var XtraSuperHighscore = "<a href=\""+SuperHighscoreBerlin+"\" class=\"xtra_link_1\" target=\"_blank\" title=\"Externe Toolseite\">SuperHigscore</a>";}
// Link Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) { var XtraSuperHighscore = ""; }
// Link Koeln
if (url.indexOf("http://koeln.pennergame")>=0) { var XtraSuperHighscore = ""; }
// Link Reloaded
if (url.indexOf("http://reloaded.pennergame")>=0) { var XtraSuperHighscore = ""; }
// Link Sylt
if (url.indexOf("http://sylt.pennergame")>=0) { var XtraSuperHighscore = ""; }

};

// Ende Menue-Block 1
// Linkkette Menue-Block 1
if (PennerBlock == "true")
{var XtraMenueBlock1 = "<li><h5>Penner</h5><div class=\"xtra_menue_content\">"+XtraMenueBlock1Link1+XtraMenueBlock1Link2+XtraMenueBlock1Link5+XtraMenueBlock1Link6+XtraMenueBlock1Link7+XtraMenueBlock1Link8+XtraMenueBlock1Link9+XtraMenueBlock1Link10+XtraMenueBlock1Link11+XtraSuperHighscore+"</div></li>";}
else{var XtraMenueBlock1 = "";};

// Wenn Bandenid vorhanden dann Menueblock/Menuepunkte anzeigen
if (bandenid != 0) {

// Start Menue-Block 2
// Bandenlink + Name
if (Bande == "true")
{var XtraMenueBlock2Link1 = "<a class=\"xtra_link_5 tooltip1\" href=\""+gamelink+"/gang/\">"+bandenname+"<span><u>K&auml;mpfe: <font color=\"green\"><br>WIN</font> / <font color=\"red\">LOOSE</font></u><br><b><font color=\"green\">"+bkw2+"</font> zu <font color=\"red\">"+bkl2+"</font></b><br><br><u>Punkte:</u><b> "+bandenpunkte+"</b><br><u>Position:</u><b> "+bandenposition+"</b><br><u>Mitglieder:</u><b> "+bandenmember+"</b></span></a>";}
else{var XtraMenueBlock2Link1 = "";};
// Bandenprofil
if (Bandenprofil == "true")
{var XtraMenueBlock2Link2 = "<a class=\"xtra_link_1\" href=\""+gamelink+"/profil/bande:"+bandenid+"/\">Bandenprofil</a>";}
else{var XtraMenueBlock2Link2 = "";};
// Bandenmitglieder
if (Mitglieder == "true")
{var XtraMenueBlock2Link3 = "<a class=\"xtra_link_4\" href=\""+gamelink+"/gang/memberlist/\">Mitglieder</a>";}
else{var XtraMenueBlock2Link3 = "";};
// Bandenforum
if (Forum == "true")
{var XtraMenueBlock2Link4 = "<a class=\"xtra_link_2\" href=\""+gamelink+"/gang/forum/\">Bandenforum</a>";}
else{var XtraMenueBlock2Link4 = "";};
// Bandenkasse part1
if (Kasse == "true")
{var XtraMenueBlock2Link5 = "<a class=\"xtra_link_1 tooltip1\" href=\"/gang/credit/\">Bandenkasse<span><u>Kontostand:</u><br><b>"+bg2+"&euro;</b></span></a>";}
else{var XtraMenueBlock2Link5 = "";};
// Bandenkasse part2
if (Einzahlen == "true")
{var XtraMenueBlock2Link6 = "<a class=\"xtra_link_5\"><form method=\"post\" action=\"/gang/cash/add/\"><input name=\"f_money\" type=\"text\" id=\"f_money\" size=\"10\"><input type=\"submit\" name=\"Submit\" value=\"&euro;\"><input name=\"f_comment\" type=\"hidden\" value=\""+XtraKassenKommentar+"\"></form></a>";}
else{var XtraMenueBlock2Link6 = "";};
// Admin Link
if (Admin == "true")
{var XtraMenueBlock2Link7 = "<a class=\"xtra_link_2\" href=\""+gamelink+"/gang/admin/\">(Co-)Adminbereich</a>";}
else{var XtraMenueBlock2Link7 = "";};
// Bandeneigentum
if (Eigentum == "true")
{var XtraMenueBlock2Link8 = "<a class=\"xtra_link_4\" href=\""+gamelink+"/gang/upgrades/\">Bandeneigentum</a>";}
else{var XtraMenueBlock2Link8 = "";};
// Plunderbank
if (Plunderbank == "true")
{var XtraMenueBlock2Link9 = "<a class=\"xtra_link_1\" href=\""+gamelink+"/gang/stuff/\">Plunderbank</a>";}
else{var XtraMenueBlock2Link9 = "";};
// Upgrade
if (Upgrade == "true")
{var XtraMenueBlock2Link10 = "<a class=\"xtra_link_3\" href=\""+gamelink+"/gang/stuff/upgrades/\">Upgrades</a>";}
else{var XtraMenueBlock2Link10 = "";};
// Liga Übersicht
if (Liga == "true")
{var XtraMenueBlock2Link11 = "<a class=\"xtra_link_4\" href=\""+gamelink+"/league/\">Liga</a>";}
else{var XtraMenueBlock2Link11 = "";};
// Missionen Übersicht
if (Missionen == "true")
{var XtraMenueBlock2Link12 = "<a class=\"xtra_link_3\" href=\""+gamelink+"/gang/missions/\">Missionen</a>";}
else{var XtraMenueBlock2Link12 = "";};
// Ende Menue-Block 2
// Linkkette Menue-Block 2
if (BandeBlock == "true")
{var XtraMenueBlock2 = "<li><h5>Bande</h5><div class=\"xtra_menue_content\">"+XtraMenueBlock2Link1+XtraMenueBlock2Link2+XtraMenueBlock2Link3+XtraMenueBlock2Link4+XtraMenueBlock2Link5+XtraMenueBlock2Link6+XtraMenueBlock2Link7+XtraMenueBlock2Link8+XtraMenueBlock2Link9+XtraMenueBlock2Link10+XtraMenueBlock2Link11+XtraMenueBlock2Link12+"</div></li>";}
else{var XtraMenueBlock2 = "";};

// wenn keine Bandenid bzw id 0 dann kein Menue
}else{
var XtraMenueBlock2 = "";
};

// Start Menue-Block 3
// Pennersuche
if (Suche == "true")
{var XtraMenueBlock3Link1 = "<a class=\"xtra_link_2\"><form method=\"GET\" action=\""+gamelink+"/highscore/user/\"><input name=\"name\" type=\"text\" size=\"7\"><input class=\"formbutton\" type=\"submit\" value=\"Suchen\"></form></a>";}
else{var XtraMenueBlock3Link1 = "";};
// Ende Menue-Block 3
// Linkkette Menue-Block 3
if (SonstigesBlock == "true")
{var XtraMenueBlock3 = "<li><h5>Sonst.</h5><div class=\"xtra_menue_content\">"+XtraMenueBlock3Link1+"</div></li>";}
else{var XtraMenueBlock3 = "";};

// Menue div erzeugen
var MyNewDiv = document.createElement('div');
document.body.appendChild(MyNewDiv);
// Menue bilden
if (XtraMenue == "true")
{MyNewDiv.innerHTML = "<div id=\"xtra_menue_container\" style=\""+XtraMenueRightLeft+":"+XtraMenueRightLeftPx+"px; "+XtraMenueTopBottom+":"+XtraMenueTopBottomPx+"px; position:"+XtraMenueAbsoluteFixed+";\">"+XtraMenueBlockSupport+XtraMenueBlock1+XtraMenueBlock2+XtraMenueBlock3+"</div>";}
else{MyNewDiv.innerHTML = "";};

// Updatediv erzeugen und fuellen
var XtraMenueUpdate = document.createElement('div');
document.body.appendChild(XtraMenueUpdate);

// Updateanzeige wenn Update verfuegbar
if (CurrentScriptVersion != neueversion)
{XtraMenueUpdate.innerHTML = "<div style=\"top:85px;left:120px;\" id=\"notifyme\" class=\"zabsolute zleft\"><div class=\"icon ok zleft\" id=\"nicon\"></div><div class=\"zleft right\" id=\"ntext\"><h2>X-Tra Menue Update</h2><p style=\"text-align:left;\"><b>Updateversion: "+neueversion+"</b><br/><a href=\""+downloadurl+"\"><font color=\"black\"><b><u>Update Installieren</u></b></font><br/><a href=\""+xmlurl+"\"><font color=\"black\"><b><u>Scripthomepage u. Infos</u></b></font></a></font></a></p></div></div>";}
else
{XtraMenueUpdate.innerHTML = "";}

// Optionsmenue
// Seitenerkennung fuer Optionsmenue
if(window.location.href == ""+gamelink+"/settings/"){

// Option Xtra Menue anzeigen ja/nein
if (XtraMenue == "true")
{var OXtraSettingMenue = "<input name=\"XtraMenueIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingMenue = "<input name=\"XtraMenueIn\" type=\"checkbox\" />";};

// Optionen fuer Menue-Block 1 (penner) --->>
// Option Penner-Block anzeigen ja/nein
if (PennerBlock == "true")
{var OXtraSettingPennerBlock = "<input name=\"XtraPennerBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingPennerBlock = "<input name=\"XtraPennerBlockIn\" type=\"checkbox\" />";};
// Option Spenden
if (Spenden == "true")
{var OXtraPennerSetting1 = "<input name=\"XtraSpendenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Spenden</span>";}
else
{var OXtraPennerSetting1 = "<input name=\"XtraSpendenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Spenden</span>";};
// Option Sauberkeit
if (Sauberkeit == "true")
{var OXtraPennerSetting2 = "<input name=\"XtraSauberkeitIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Sauberkeit</span>";}
else
{var OXtraPennerSetting2 = "<input name=\"XtraSauberkeitIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Sauberkeit</span>";};
// Option Uebersicht
if (Uebersicht == "true")
{var OXtraPennerSetting5 = "<input name=\"XtraUebersichtIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> &Uuml;bersicht</span>";}
else
{var OXtraPennerSetting5 = "<input name=\"XtraUebersichtIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> &Uuml;bersicht</span>";};
// Option Plunder
if (Plunder == "true")
{var OXtraPennerSetting6 = "<input name=\"XtraPlunderIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Plunder</span>";}
else
{var OXtraPennerSetting6 = "<input name=\"XtraPlunderIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Plunder</span>";};
// Option Nachrichten
if (Nachrichten == "true")
{var OXtraPennerSetting7 = "<input name=\"XtraNachrichtenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Nachrichten</span>";}
else
{var OXtraPennerSetting7 = "<input name=\"XtraNachrichtenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Nachrichten</span>";};
// Option Freunde
if (Freunde == "true")
{var OXtraPennerSetting8 = "<input name=\"XtraFreundeIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Freunde</span>";}
else
{var OXtraPennerSetting8 = "<input name=\"XtraFreundeIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Freunde</span>";};
// Option Verbrechen
if (Verbrechen == "true")
{var OXtraPennerSetting9 = "<input name=\"XtraVerbrechenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Verbrechen</span>";}
else
{var OXtraPennerSetting9 = "<input name=\"XtraVerbrechenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Verbrechen</span>";};
// Option Profil
if (Profil == "true")
{var OXtraPennerSetting10 = "<input name=\"XtraProfilIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Eigenes Profil</span>";}
else
{var OXtraPennerSetting10 = "<input name=\"XtraProfilIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Eigenes Profil</span>";};
// Option Highscore (lets fight)
if (Highscore == "true")
{var OXtraPennerSetting11 = "<input name=\"XtraHighscoreIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Let&#39;s Fight</span>";}
else
{var OXtraPennerSetting11 = "<input name=\"XtraHighscoreIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Let&#39;s Fight</span>";};
// Option Super Highscore
if (SuperHighscore == "true")
{var OXtraPennerSetting12 = "<input name=\"XtraSuperHighscoreIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\">SuperHighscore</span>";}
else
{var OXtraPennerSetting12 = "<input name=\"XtraSuperHighscoreIn\" type=\"checkbox\" /><span style=\"color:#000000;\">SuperHighscore</span>";};

// <<--- Optionen fuer Menue-Block 1 (penner)

// Optionen fuer Menue-Block 2 (bande) --->>
// Option Bandeblock anzeigen ja/nein
if (BandeBlock == "true")
{var OXtraSettingBandeBlock = "<input name=\"XtraBandeBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingBandeBlock = "<input name=\"XtraBandeBlockIn\" type=\"checkbox\" />";};
// Option Bande
if (Bande == "true")
{var OXtraBandeSetting1 = "<input name=\"XtraBandeIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Bande</span>";}
else
{var OXtraBandeSetting1 = "<input name=\"XtraBandeIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Bande</span>";};
// Option Bandenprofil
if (Bandenprofil == "true")
{var OXtraBandeSetting2 = "<input name=\"XtraBandenprofilIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Bandenprofil</span>";}
else
{var OXtraBandeSetting2 = "<input name=\"XtraBandenprofilIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Bandenprofil</span>";};
// Option Mitglieder
if (Mitglieder == "true")
{var OXtraBandeSetting3 = "<input name=\"XtraMitgliederIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Mitglieder</span>";}
else
{var OXtraBandeSetting3 = "<input name=\"XtraMitgliederIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Mitglieder</span>";};
// Option Forum
if (Forum == "true")
{var OXtraBandeSetting4 = "<input name=\"XtraForumIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Forum</span>";}
else
{var OXtraBandeSetting4 = "<input name=\"XtraForumIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Forum</span>";}
// Option Kasse
if (Kasse == "true")
{var OXtraBandeSetting5 = "<input name=\"XtraKasseIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Kasse</span>";}
else
{var OXtraBandeSetting5 = "<input name=\"XtraKasseIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Kasse</span>";}
// Option einzahlen
if (Einzahlen == "true")
{var OXtraBandeSetting6 = "<input name=\"XtraEinzahlenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Einzahlen</span>";}
else
{var OXtraBandeSetting6 = "<input name=\"XtraEinzahlenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Einzahlen</span>";}
// Option Admin
if (Admin == "true")
{var OXtraBandeSetting7 = "<input name=\"XtraAdminIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Admin</span>";}
else
{var OXtraBandeSetting7 = "<input name=\"XtraAdminIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Admin</span>";}
// Option Eigentum
if (Eigentum == "true")
{var OXtraBandeSetting8 = "<input name=\"XtraEigentumIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Eigentum</span>";}
else
{var OXtraBandeSetting8 = "<input name=\"XtraEigentumIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Eigentum</span>";}
// Option Plunderbank
if (Plunderbank == "true")
{var OXtraBandeSetting9 = "<input name=\"XtraPlunderbankIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Plunderbank</span>";}
else
{var OXtraBandeSetting9 = "<input name=\"XtraPlunderbankIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Plunderbank</span>";}
// Option Upgrade
if (Upgrade == "true")
{var OXtraBandeSetting10 = "<input name=\"XtraUpgradeIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Upgrade</span>";}
else
{var OXtraBandeSetting10 = "<input name=\"XtraUpgradeIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Upgrade</span>";}
// Option Liga Uebersicht
if (Liga == "true")
{var OXtraBandeSetting11 = "<input name=\"XtraLigaIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Liga</span>";}
else
{var OXtraBandeSetting11 = "<input name=\"XtraLigaIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Liga</span>";}
// Option Missionen Übersicht
if (Missionen == "true")
{var OXtraBandeSetting12 = "<input name=\"XtraMissionenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Missionen</span>";}
else
{var OXtraBandeSetting12 = "<input name=\"XtraMissionenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Missionen</span>";}
// <<--- Optionen fuer Menue-Block 2 (bande)

// Optionen fuer Menue-Block 3 (sonst.) --->>
// Option Bandeblock anzeigen ja/nein
if (SonstigesBlock == "true")
{var OXtraSettingSonstigesBlock = "<input name=\"XtraSonstigesBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingSonstigesBlock = "<input name=\"XtraSonstigesBlockIn\" type=\"checkbox\" />";};
// Option Suche
if (Suche == "true")
{var OXtraSonstigesSetting1 = "<input name=\"XtraSucheIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Suche</span>";}
else
{var OXtraSonstigesSetting1 = "<input name=\"XtraSucheIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Suche</span>";}
// <<--- Optionen fuer Menueblock 3 (sonst.)

// Optionen fuer Position --->>
var OXtraMenueTopBottomPx = "<input name=\"XtraMenueTopBottomPxIn\" size=\"10\" type=\"text\" value=\""+XtraMenueTopBottomPx+"\" />";
if (XtraMenueTopBottom == "top"){
var select_top_1 = "<option selected value=\"top\">Oben</option>";
var select_top_2 = "<option value=\"bottom\">Unten</option>";
}else{
var select_top_1 = "<option value=\"top\">Oben</option>";
var select_top_2 = "<option selected value=\"bottom\">Unten</option>";
}
var OXtraMenueTopBottom = "<select name=\"XtraMenueTopBottomIn\">"+select_top_1+select_top_2+"</select>";
var OXtraMenueRightLeftPx = "<input name=\"XtraMenueRightLeftPxIn\" type=\"text\" size=\"10\" value=\""+XtraMenueRightLeftPx+"\" />";
if (XtraMenueRightLeft == "right"){
var select_right_1 = "<option selected value=\"right\">Rechts</option>";
var select_right_2 = "<option value=\"left\">Links</option>";
}else{
var select_right_1 = "<option value=\"right\">Rechts</option>";
var select_right_2 = "<option selected value=\"left\">Links</option>";
}
var OXtraMenueRightLeft = "<select name=\"XtraMenueRightLeftIn\">"+select_right_1+select_right_2+"</select>";
if (XtraMenueAbsoluteFixed == "absolute"){
var select_absolute_1 = "<option selected value=\"absolute\">Scrollbar</option>";
var select_absolute_2 = "<option value=\"Fixed\">Fixiert</option>";
}else{
var select_absolute_1 = "<option value=\"absolute\">Scrollbar</option>";
var select_absolute_2 = "<option selected value=\"Fixed\">Fixiert</option>";
}
var OXtraMenueAbsoluteFixed = "<select name=\"XtraMenueAbsoluteFixedIn\">"+select_absolute_1+select_absolute_2+"</select>";
// <<--- Optionen fuer Position

// Optionsmenue Kopfbereich
var OXtraBereichTop1 = "<tr><td colspan=\"3\" align=\"left\" height=\"15\" valign=\"top\"><span class=\"tiername\">X-Tra Menue Einstellungen</span><hr size=\"1\"></td></tr>";
var OXtraBereichTop2 = "<tr><td>Xtra-Men&uuml; ein-/ausblenden: "+OXtraSettingMenue+" | Kassenkommentar: <input name=\"XtraKassenKommentarIn\" size=\"10\" type=\"text\" value=\""+XtraKassenKommentar+"\" /><br/><hr size=\"1\"></td><tr>";
// Optionsmenue Penner
var OXtraBereichPennerBlock1 = "<tr><td><u>Men&uuml;punkte Penner anzeigen? "+OXtraSettingPennerBlock+" Wenn JA welche:</u><br></td></tr>";
var OXtraBereichPennerBlock2 = "<tr><td>"+OXtraPennerSetting1+" | "+OXtraPennerSetting2+" | "+OXtraPennerSetting5+" | "+OXtraPennerSetting6+"<br/></td></tr>";
var OXtraBereichPennerBlock3 = "<tr><td>"+OXtraPennerSetting7+" | "+OXtraPennerSetting8+" | "+OXtraPennerSetting9+" | "+OXtraPennerSetting10+" | "+OXtraPennerSetting11+" | "+OXtraPennerSetting12+"<br/><hr size=\"1\"></td></tr>";
var OXtraBereichPenner = ""+OXtraBereichPennerBlock1+OXtraBereichPennerBlock2+OXtraBereichPennerBlock3+"";
// Optionsmenue Bande
// wenn bandenid vorhanden dann Menueblock/Menuepunkte anzeigen
if (bandenid != 0) {
var OXtraBereichBandeBlock1 = "<tr><td><u>Men&uuml;punkte Bande anzeigen? "+OXtraSettingBandeBlock+" Wenn JA welche:</u><br></td>";
var OXtraBereichBandeBlock2 = "<tr><td>"+OXtraBandeSetting1+" | "+OXtraBandeSetting2+" | "+OXtraBandeSetting3+" | "+OXtraBandeSetting4+" | "+OXtraBandeSetting5+" | "+OXtraBandeSetting6+"<br/></td></tr>";
var OXtraBereichBandeBlock3 = "<tr><td>"+OXtraBandeSetting7+" | "+OXtraBandeSetting8+" | "+OXtraBandeSetting9+" | "+OXtraBandeSetting10+" | "+OXtraBandeSetting11+" | "+OXtraBandeSetting12+"<br/><hr size=\"1\"></td></tr>";
var OXtraBereichBande = ""+OXtraBereichBandeBlock1+OXtraBereichBandeBlock2+OXtraBereichBandeBlock3+"";
// wenn Bandenid 0 ausblenden
}else{
var OXtraBereichBande = "";
}
// Optionsmenue sonstiges
var OXtraBereichSonstigesBlock1 = "<tr><td><u>Men&uuml;punkte Sonst. anzeigen? "+OXtraSettingSonstigesBlock+" Wenn JA welche:</u><br></td></tr>";
var OXtraBereichSonstigesBlock2 = "<tr><td>"+OXtraSonstigesSetting1+"<br/><hr size=\"1\"></td></tr>";
var OXtraBereichSonstiges = ""+OXtraBereichSonstigesBlock1+OXtraBereichSonstigesBlock2+"";
// Optionsmenue Ausrichtung
var OXtraBereichStyleVertikal = "<tr><td>Men&uuml;ausrichtung Vertikal: "+OXtraMenueTopBottomPx+" Pixel von "+OXtraMenueTopBottom+"<br/></td></tr>";
var OXtraBereichStyleHorizontal = "<tr><td>Men&uuml;ausrichtung Horizon: "+OXtraMenueRightLeftPx+" Pixel von "+OXtraMenueRightLeft+"<br/><br/></td></tr>";
var OXtraBereichStyleFixierung = "<tr><td>Men&uuml; Fixierung: "+OXtraMenueAbsoluteFixed+"<br/><br/></td></tr>";
var OXtraBereichStyleFixierung1 = "<tr><td><b>Scrollbar:</b> Das Men&uuml; Scrollt mit der Seite mit<br/><b>Fixiert:</b> Das Men&uuml; bleibt stehen auch wen die Seite scrollt<br/><br/></td></tr>";
var OXtraBereichStyleFixierung2 = "<tr><td>Fixiert ist nicht zu empfehlen wenn viele Men&uuml;punkte aktiv sind da sonst die unteren Links nicht mehr erreichbar sind.<br/></td></tr>";
var OXtraBereichStyle = ""+OXtraBereichStyleVertikal+OXtraBereichStyleHorizontal+OXtraBereichStyleFixierung+OXtraBereichStyleFixierung1+OXtraBereichStyleFixierung2+"";

// Optionsmenue Fussbereich
var OXtraSpeichern = "<input type=\"submit\" class=\"formbutton\"  name=\"SpeichernXtraMenue\" value=\"Speichern\" />";
var OXtraBereichBottom = "<tr><td><br/>"+OXtraSpeichern+"</td></tr>";

var OXtraBereichKette = ""+OXtraBereichTop1+OXtraBereichTop2+OXtraBereichPenner+OXtraBereichBande+OXtraBereichSonstiges+OXtraBereichStyle+OXtraBereichBottom+"";

// Optionsmenue in html einfuegen
document.getElementById("content").innerHTML += "<div class=\"settingpoint setold\"><table class=\"tieritemA\" width=\"450\"><tbody>"+OXtraBereichKette+"</tbody></table></div>";

// wurde speichern geklickt dann...
document.getElementsByName('SpeichernXtraMenue')[0].addEventListener('click', function Schliessen () {

// Xtra Menue Option
if (document.getElementsByName('XtraMenueIn')[0].checked == true)
{GM_setValue("XtraMenueIn", "true");}else{GM_setValue("XtraMenueIn", "false");}
// Pennerblock Optionen speichern
// Pennerblock
if (document.getElementsByName('XtraPennerBlockIn')[0].checked == true)
{GM_setValue("XtraPennerBlockIn", "true");}else{GM_setValue("XtraPennerBlockIn", "false");}
// Spenden
if (document.getElementsByName('XtraSpendenIn')[0].checked == true)
{GM_setValue("XtraSpendenIn", "true");}else{GM_setValue("XtraSpendenIn", "false");}
// Sauberkeit
if (document.getElementsByName('XtraSauberkeitIn')[0].checked == true)
{GM_setValue("XtraSauberkeitIn", "true");}else{GM_setValue("XtraSauberkeitIn", "false");}
// Uebersicht
if (document.getElementsByName('XtraUebersichtIn')[0].checked == true)
{GM_setValue("XtraUebersichtIn", "true");}else{GM_setValue("XtraUebersichtIn", "false");}
// Plunder
if (document.getElementsByName('XtraPlunderIn')[0].checked == true)
{GM_setValue("XtraPlunderIn", "true");}else{GM_setValue("XtraPlunderIn", "false");}
// Nachrichten
if (document.getElementsByName('XtraNachrichtenIn')[0].checked == true)
{GM_setValue("XtraNachrichtenIn", "true");}else{GM_setValue("XtraNachrichtenIn", "false");}
// Freunde
if (document.getElementsByName('XtraFreundeIn')[0].checked == true)
{GM_setValue("XtraFreundeIn", "true");}else{GM_setValue("XtraFreundeIn", "false");}
// Verbrechen
if (document.getElementsByName('XtraVerbrechenIn')[0].checked == true)
{GM_setValue("XtraVerbrechenIn", "true");}else{GM_setValue("XtraVerbrechenIn", "false");}
// Profil
if (document.getElementsByName('XtraProfilIn')[0].checked == true)
{GM_setValue("XtraProfilIn", "true");}else{GM_setValue("XtraProfilIn", "false");}
// Highscore
if (document.getElementsByName('XtraHighscoreIn')[0].checked == true)
{GM_setValue("XtraHighscoreIn", "true");}else{GM_setValue("XtraHighscoreIn", "false");}
// Superhighscore
if (document.getElementsByName('XtraSuperHighscoreIn')[0].checked == true)
{GM_setValue("XtraSuperHighscoreIn", "true");}else{GM_setValue("XtraSuperHighscoreIn", "false");}

// Bandeblock Optionen speichern
// Bandeblock
if (bandenid != 0) {
if (document.getElementsByName('XtraBandeBlockIn')[0].checked == true)
{GM_setValue("XtraBandeBlockIn", "true");}else{GM_setValue("XtraBandeBlockIn", "false");}
// Bande
if (document.getElementsByName('XtraBandeIn')[0].checked == true)
{GM_setValue("XtraBandeIn", "true");}else{GM_setValue("XtraBandeIn", "false");}
// Bandenprofil
if (document.getElementsByName('XtraBandenprofilIn')[0].checked == true)
{GM_setValue("XtraBandenprofilIn", "true");}else{GM_setValue("XtraBandenprofilIn", "false");}
// Mitglieder
if (document.getElementsByName('XtraMitgliederIn')[0].checked == true)
{GM_setValue("XtraMitgliederIn", "true");}else{GM_setValue("XtraMitgliederIn", "false");}
// Forum
if (document.getElementsByName('XtraForumIn')[0].checked == true)
{GM_setValue("XtraForumIn", "true");}else{GM_setValue("XtraForumIn", "false");}
// Kasse
if (document.getElementsByName('XtraKasseIn')[0].checked == true)
{GM_setValue("XtraKasseIn", "true");}else{GM_setValue("XtraKasseIn", "false");}
// einzahlen
if (document.getElementsByName('XtraEinzahlenIn')[0].checked == true)
{GM_setValue("XtraEinzahlenIn", "true");}else{GM_setValue("XtraEinzahlenIn", "false");}
// Admin
if (document.getElementsByName('XtraAdminIn')[0].checked == true)
{GM_setValue("XtraAdminIn", "true");}else{GM_setValue("XtraAdminIn", "false");}
// Eigentum
if (document.getElementsByName('XtraEigentumIn')[0].checked == true)
{GM_setValue("XtraEigentumIn", "true");}else{GM_setValue("XtraEigentumIn", "false");}
// Plunderbank
if (document.getElementsByName('XtraPlunderbankIn')[0].checked == true)
{GM_setValue("XtraPlunderbankIn", "true");}else{GM_setValue("XtraPlunderbankIn", "false");}
// Upgrade
if (document.getElementsByName('XtraUpgradeIn')[0].checked == true)
{GM_setValue("XtraUpgradeIn", "true");}else{GM_setValue("XtraUpgradeIn", "false");}
// Liga
if (document.getElementsByName('XtraLigaIn')[0].checked == true)
{GM_setValue("XtraLigaIn", "true");}else{GM_setValue("XtraLigaIn", "false");}
// Missionen
if (document.getElementsByName('XtraMissionenIn')[0].checked == true)
{GM_setValue("XtraMissionenIn", "true");}else{GM_setValue("XtraMissionenIn", "false");}
} else { }

// sonst.Block Optionen speichern
// sonst.Block
if (document.getElementsByName('XtraSonstigesBlockIn')[0].checked == true)
{GM_setValue("XtraSonstigesBlockIn", "true");}else{GM_setValue("XtraSonstigesBlockIn", "false");}
// Suche
if (document.getElementsByName('XtraSucheIn')[0].checked == true)
{GM_setValue("XtraSucheIn", "true");}else{GM_setValue("XtraSucheIn", "false");}

// Optische Optionen speichern
// oben oder unten
GM_setValue("XtraMenueTopBottomIn", document.getElementsByName('XtraMenueTopBottomIn')[0].value);
// Pixel von oben oder unten
GM_setValue("XtraMenueTopBottomPxIn", document.getElementsByName('XtraMenueTopBottomPxIn')[0].value);
// rechts oder links
GM_setValue("XtraMenueRightLeftIn", document.getElementsByName('XtraMenueRightLeftIn')[0].value);
// Pixel von rechts oder links
GM_setValue("XtraMenueRightLeftPxIn", document.getElementsByName('XtraMenueRightLeftPxIn')[0].value);
// Fixierung des Menues
GM_setValue("XtraMenueAbsoluteFixedIn", document.getElementsByName('XtraMenueAbsoluteFixedIn')[0].value);
// Kassenkommetar
GM_setValue("XtraKassenKommentarIn", document.getElementsByName('XtraKassenKommentarIn')[0].value);

// Seite neu laden ----------
window.location.reload();
},false);

// Klammer Seitenerkennung Optionsmenue
}
// Klammern Bandenkasse
}})
// Klammern Bandenkaempfe
}})
// Klammern Bandeninfos
}})
// Klammern Banden- id, Name / Eigene Punkte
}})
// Klammern Angriffspunkte
}})
// Klammern Userinfos
}})
// Klammern Update
}})

