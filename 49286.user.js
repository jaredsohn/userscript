// ==UserScript==
// @name			[PG] X-Tra Menue
// @namespace		Autor: das_bazie & kingfr3sh
// @namespace		http://thx.spacequadrat.de http://userscripts.org/scripts/show/49286
// @description		Fuegt ein alternatives Navigationsmenue ein
// @version			4.2.3
// @include			*pennergame.de/*
// @exclude			*pennergame.de/chat/applet/
// @ exclude		*board.pennergame.de/*
// @exclude			*newboard.pennergame.de/*
// @exclude			*pennergame.de/change_please/*
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

// css fuer hauptcontainer
addGlobalStyle('div#xtra_menue_container {list-style:none;}')
// css fuer links (normal)
addGlobalStyle('div.xtra_menue_content a {background: url(http://media.pennergame.de/img/pv4/bg_subnav-off.png) no-repeat; height:20px; display:block; color:#2b1c0c; text-decoration:none; padding:10px 0px 0px 0px; margin-top:-5px;font-size:12px; font-weight:bold; width:130px;}')
// css link class 1
addGlobalStyle('div.xtra_menue_content a.xtra_link_1 {background: url(http://media.pennergame.de/img/pv4/bg_subnav-off1.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_1:hover {background: url(http://media.pennergame.de/img/pv4/bg_subnav-on1.png) no-repeat;}')
// css link class 2
addGlobalStyle('div.xtra_menue_content a.xtra_link_2 {background: url(http://media.pennergame.de/img/pv4/bg_subnav-off2.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_2:hover {background: url(http://media.pennergame.de/img/pv4/bg_subnav-on2.png) no-repeat;}')
// css link class 3
addGlobalStyle('div.xtra_menue_content a.xtra_link_3 {background: url(http://media.pennergame.de/img/pv4/bg_subnav-off3.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_3:hover {background: url(http://media.pennergame.de/img/pv4/bg_subnav-on3.png) no-repeat;}')
// css link class 4
addGlobalStyle('div.xtra_menue_content a.xtra_link_4 {background: url(http://media.pennergame.de/img/pv4/bg_subnav-off4.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_4:hover {background: url(http://media.pennergame.de/img/pv4/bg_subnav-on4.png) no-repeat;}')
// css link class 5
addGlobalStyle('div.xtra_menue_content a.xtra_link_5 {background: url(http://media.pennergame.de/img/pv4/bg_subnav-off5.png) no-repeat;}')
addGlobalStyle('div.xtra_menue_content a.xtra_link_5:hover {background: url(http://media.pennergame.de/img/pv4/bg_subnav-on5.png) no-repeat;}')
// css h5 (menue-block ueberschrift)
addGlobalStyle('#xtra_menue_container h5 {background: url(http://media.pennergame.de/img/pv4/bg_subnav-off.png) no-repeat;text-align:right;color:orange;font-size:15px;font-weight:bold;padding:6px 10px 4px 0px;margin-top:4px;margin-bottom:-5px;cursor:pointer;width:120px;height:15px;}')
// css fuer tooltips
addGlobalStyle('a.tooltip1, a.tooltip1:link, a.tooltip1:visited, a.tooltip1:active { position: relative; text-decoration: none; }')
addGlobalStyle('a.tooltip1:hover { background: transparent; z-index: 1000; }')
addGlobalStyle('a.tooltip1 span { display: none; text-decoration: none; }')
addGlobalStyle('a.tooltip1:hover span { display:block; position:absolute; top:45px; left:0px; width:105px; z-index:1000; border:1px solid #000; border-left:5px solid #767676; padding:3px 10px 3px 10px; background:#2C2C2C; color:#ffffff; font:normal Verdana,Arial,Helvetica,Sans-serif; text-align:left; }')
// css fuer update tooltip
addGlobalStyle('a.XtraUpdateTooltip, a.XtraUpdateTooltip:link, a.XtraUpdateTooltip:visited, a.XtraUpdateTooltip:active { position: relative; text-decoration: none; }')
addGlobalStyle('a.XtraUpdateTooltip:hover { background: transparent; z-index: 1000; }')
addGlobalStyle('a.XtraUpdateTooltip span { display: none; text-decoration: none; }')
addGlobalStyle('a.XtraUpdateTooltip:hover span { display:block; position:absolute; top:-70px; left:220px; width:310px; z-index:-100; padding:10px 10px 10px 10px; background: url(http://media.pennergame.de/img/pv4/bg_notifyme.png) repeat-y; color:#000000; font:normal Verdana,Arial,Helvetica,Sans-serif; text-align:left; }')
// css copy
addGlobalStyle('a.copy { cursor:pointer; }')

// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
var hslink1 = "http://www.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://i35.tinypic.com/21e0mco.jpg\">"
var maxspenden = 50
var spenden1 = 49
var select_1 = "<option selected value=\"http://www.pennergame.de\">Hamburg</option>"
}else{
var select_1 = "<option value=\"http://www.pennergame.de\">Hamburg</option>"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de"
var hslink1 = "http://berlin.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://i34.tinypic.com/1zc1h4y.jpg\">"
var maxspenden = 20
var spenden1 = 19
var select_2 = "<option selected value=\"http://berlin.pennergame.de\">Berlin</option>"
}else{
var select_2 = "<option value=\"http://berlin.pennergame.de\">Berlin</option>"
}
// Linkadressen fuer muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var hslink1 = "http://muenchen.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://i40.tinypic.com/rlg8z7.jpg\">"
var maxspenden = 50
var spenden1 = 49
var select_3 = "<option selected value=\"http://muenchen.pennergame.de\">M&uuml;nchen</option>"
}else{
var select_3 = "<option value=\"http://muenchen.pennergame.de\">M&uuml;nchen</option>"
}

// Linkadressen fuer malle
if (url.indexOf("http://malle.pennergame")>=0) {
var gamelink = "http://malle.pennergame.de"
var hslink1 = "http://malle.pennergame.de/highscore"
var switchpic = "<img width=\"14px\" height=\"14px\" src=\"http://i25.tinypic.com/zn30af.gif\">"
var maxspenden = 50
var spenden1 = 49
var select_4 = "<option selected value=\"http://malle.pennergame.de\">Malle</option>"
}else{
var select_4 = "<option value=\"http://malle.pennergame.de\">Malle</option>"
}

// angaben fuer Updatefunktion
var CurrentScriptVersion = '4.2.3';
var xmlurl = 'http://userscripts.org/scripts/show/49286';
var downloadurl = 'http://userscripts.org/scripts/source/49286.user.js';

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
      var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
      var clean = content.match(/Sauberkeit.*>(\d+)%</)[1];
      var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
      var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];

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

// Benoetigte Brot- und Biermenge ausrechnen:
Posa = document.getElementById("options");
Pos = Posa.getElementsByTagName("li")[1].innerHTML.indexOf(".");
Alk = Posa.getElementsByTagName("li")[1].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 350 - Alk;
Benoetigtprozent2 = 299 - Alk;
Benoetigtwodka = Math.floor(Benoetigtprozent/250);
Benoetigtwurst = Math.ceil(Alk/100);
Benoetigtbier = Math.floor(Benoetigtprozent2/35);
Benoetigtbrot = Math.ceil(Alk/35);
Benoetigtburger = Math.ceil(Alk/200);
			
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

// menuepunkte standarteinstellungen

// xtra menue standart position
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
if (XtraMenueAbsoluteFixed == null){XtraMenueAbsoluteFixed = "absolute";};
// Kassenkommentar
var XtraKassenKommentar = GM_getValue("XtraKassenKommentarIn");
if (XtraKassenKommentar == null){XtraKassenKommentar = "";};

// xtra menue anzeigen (true = anzeigen | false = nicht anzeigen)
var XtraMenue = GM_getValue("XtraMenueIn");
if (XtraMenue == null){XtraMenue = "true";};
// menuepunkte penner
// pennerblock anzeigen (true = anzeigen | false = nicht anzeigen)
var PennerBlock = GM_getValue("XtraPennerBlockIn");
if (PennerBlock == null){PennerBlock = "true";};
// spenden anzeigen (true = anzeigen | false = nicht anzeigen)
var Spenden = GM_getValue("XtraSpendenIn");
if (Spenden == null){Spenden = "true";};
// sauberkeit anzeigen (true = anzeigen | false = nicht anzeigen)
var Sauberkeit = GM_getValue("XtraSauberkeitIn");
if (Sauberkeit == null){Sauberkeit = "true";};
// waschen6 anzeigen (true = anzeigen | false = nicht anzeigen)
var Waschen6 = GM_getValue("XtraWaschen6In");
if (Waschen6 == null){Waschen6 = "false";};
// waschen25 anzeigen (true = anzeigen | false = nicht anzeigen)
var Waschen25 = GM_getValue("XtraWaschen25In");
if (Waschen25 == null){Waschen25 = "true";};
// uebersicht anzeigen (true = anzeigen | false = nicht anzeigen)
var Uebersicht = GM_getValue("XtraUebersichtIn");
if (Uebersicht == null){Uebersicht = "true";};
// plunder anzeigen (true = anzeigen | false = nicht anzeigen)
var Plunder = GM_getValue("XtraPlunderIn");
if (Plunder == null){Plunder = "true";};
// nachrichten anzeigen (true = anzeigen | false = nicht anzeigen)
var Nachrichten = GM_getValue("XtraNachrichtenIn");
if (Nachrichten == null){Nachrichten = "false";};
// freunde anzeigen (true = anzeigen | false = nicht anzeigen)
var Freunde = GM_getValue("XtraFreundeIn");
if (Freunde == null){Freunde = "false";};
// profil anzeigen (true = anzeigen | false = nicht anzeigen)
var Profil = GM_getValue("XtraProfilIn");
if (Profil == null){Profil = "false";};
// highscore anzeigen (true = anzeigen | false = nicht anzeigen)
var Highscore = GM_getValue("XtraHighscoreIn");
if (Highscore == null){Highscore = "true";};
// highscore anzeigen (true = anzeigen | false = nicht anzeigen)
var SuperHighscore = GM_getValue("XtraSuperHighscoreIn");
if (SuperHighscore == null){SuperHighscore = "true";};

// menuepunkte bande
// bandeblock anzeigen (true = anzeigen | false = nicht anzeigen)
var BandeBlock = GM_getValue("XtraBandeBlockIn");
if (BandeBlock == null){BandeBlock = "true";};
// bandenlink + name anzeigen (true = anzeigen | false = nicht anzeigen)
var Bande = GM_getValue("XtraBandeIn");
if (Bande == null){Bande = "true";};
// bandenprofil anzeigen (true = anzeigen | false = nicht anzeigen)
var Bandenprofil = GM_getValue("XtraBandenprofilIn");
if (Bandenprofil == null){Bandenprofil = "false";};
// mitglieder anzeigen (true = anzeigen | false = nicht anzeigen)
var Mitglieder = GM_getValue("XtraMitgliederIn");
if (Mitglieder == null){Mitglieder = "false";};
// forum anzeigen (true = anzeigen | false = nicht anzeigen)
var Forum = GM_getValue("XtraForumIn");
if (Forum == null){Forum = "false";};
// kasse anzeigen (true = anzeigen | false = nicht anzeigen)
var Kasse = GM_getValue("XtraKasseIn");
if (Kasse == null){Kasse = "true";};
// einzahlen anzeigen (true = anzeigen | false = nicht anzeigen)
var Einzahlen = GM_getValue("XtraEinzahlenIn");
if (Einzahlen == null){Einzahlen = "true";};
// admin anzeigen (true = anzeigen | false = nicht anzeigen)
var Admin = GM_getValue("XtraAdminIn");
if (Admin == null){Admin = "false";};
// bandeneigentum anzeigen (true = anzeigen | false = nicht anzeigen)
var Eigentum = GM_getValue("XtraEigentumIn");
if (Eigentum == null){Eigentum = "false";};
// plunderbank anzeigen (true = anzeigen | false = nicht anzeigen)
var Plunderbank = GM_getValue("XtraPlunderbankIn");
if (Plunderbank == null){Plunderbank = "false";};
// upgrade anzeigen (true = anzeigen | false = nicht anzeigen)
var Upgrade = GM_getValue("XtraUpgradeIn");
if (Upgrade == null){Upgrade = "false";};

// menuepunkte sonst.
// sonst.block anzeigen (true = anzeigen | false = nicht anzeigen)
var SonstigesBlock = GM_getValue("XtraSonstigesBlockIn");
if (SonstigesBlock == null){SonstigesBlock = "true";};
// suche anzeigen (true = anzeigen | false = nicht anzeigen)
var Suche = GM_getValue("XtraSucheIn");
if (Suche == null){Suche = "true";};
// bier anzeigen (true = anzeigen | false = nicht anzeigen)
var Bier = GM_getValue("XtraBierIn");
if (Bier == null){Bier = "true";};
// wodka anzeigen (true = anzeigen | false = nicht anzeigen)
var Wodka = GM_getValue("XtraWodkaIn");
if (Wodka == null){Wodka = "false";};
// brot anzeigen (true = anzeigen | false = nicht anzeigen)
var Brot = GM_getValue("XtraBrotIn");
if (Brot == null){Brot = "true";};
// currywurst anzeigen (true = anzeigen | false = nicht anzeigen)
var Wurst = GM_getValue("XtraWurstIn");
if (Wurst == null){Wurst = "false";};
// hamburger anzeigen (true = anzeigen | false = nicht anzeigen)
var Burger = GM_getValue("XtraBurgerIn");
if (Burger == null){Burger = "false";};

// menuepunkte erstellen (menue ist in 4 bloecke unterteilt, menue-block 1-4)

// start menue-block support
// verion
var XtraMenueSupport1 = "<a class=\"xtra_link_1\" href=\"http://userscripts.org/scripts/show/49286/\" target=\"_blank\" title=\"&copy; kingfr3sh & bazie\">X-Tra Menue "+CurrentScriptVersion+"</a>";
// userscripts.org (C)
var XtraMenueSupport2 = "<a class=\"xtra_link_5 copy\" >"+switchpic+" <select onChange=\"document.location.href=this.value\">"+select_1+select_2+select_3+select_4+"</select></a>";

// einstellungen
var XtraMenueSupport3 = "<a class=\"xtra_link_2\" href=\""+gamelink+"/settings/\">Einstellungen</a>";
// ende menue-block 4
// linkkette menueblock 4
var XtraMenueBlockSupport = "<li><h5>Support</h5><div class=\"xtra_menue_content\">"+XtraMenueSupport1+XtraMenueSupport2+XtraMenueSupport3+"</div></li>";

// start menue-block 1
// spendenanzeige
if (spendenbisherpur>spenden1)
{var spenden = "<font color=\"green\"size=\"2px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"2px\">"+maxspenden+"</font></b>";}
else
{var spenden = "<font color=\"red\"size=\"2px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"2px\">"+maxspenden+"</font></b>";}
// spenden
if (Spenden == "true")
{var XtraMenueBlock1Link1 = "<a href=\""+gamelink+"/change_please/statistics/\"  title=\"Spenden-Statistik\" class=\"xtra_link_5\"><b>Spenden: "+spenden+"</b></a>";}
else{var XtraMenueBlock1Link1 = "";};
// sauberkeit
if (Sauberkeit == "true")
{var XtraMenueBlock1Link2 = "<a href=\""+gamelink+"/city/washhouse/\" class=\"xtra_link_2\"><b>Zu <font color=\""+color[clean]+"\">"+clean+"%</font> sauber</b></a>";}
else{var XtraMenueBlock1Link2 = "";};
// waschen 6euro
if (Waschen6 == "true")
{var XtraMenueBlock1Link3 = "<a class=\"xtra_link_3\"><form method=\"post\" action=\"/city/washhouse/buy/\"><input type=\"hidden\" value=\"1\" name=\"id\"><input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"waschen 6,00&nbsp;&euro;\"></form></a>";}
else{var XtraMenueBlock1Link3 = "";};
// waschen 25euro
if (Waschen25 == "true")
{var XtraMenueBlock1Link4 = "<a class=\"xtra_link_1\"><form method=\"post\" action=\"/city/washhouse/buy/\"><input type=\"hidden\" value=\"2\" name=\"id\"><input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"waschen 25,00&nbsp;&euro;\"></form></a>";}
else{var XtraMenueBlock1Link4 = "";};
// uebersicht
if (Uebersicht == "true")
{var XtraMenueBlock1Link5 = "<a href=\""+gamelink+"/overview/\" class=\"xtra_link_5\">&Uuml;bersicht</a>";}
else{var XtraMenueBlock1Link5 = "";};
// plunder
if (Plunder == "true")
{var XtraMenueBlock1Link6 = "<a href=\""+gamelink+"/stock/plunder/\" class=\"xtra_link_4\">Plunder</a>";}
else{var XtraMenueBlock1Link6 = "";};
// nachrichten
if (Nachrichten == "true")
{var XtraMenueBlock1Link7 = "<a href=\""+gamelink+"/messages/\" class=\"xtra_link_3\"><img src=\"http://media.pennergame.de/img/overview/new_msg.gif\">&nbsp;Nachrichten</a>";}
else{var XtraMenueBlock1Link7 = "";};
// freunde
if (Freunde == "true")
{var XtraMenueBlock1Link8 = "<a href=\""+gamelink+"/friendlist/\" class=\"xtra_link_2\">Freundesliste</a>";}
else{var XtraMenueBlock1Link8 = "";};
// profil
if (Profil == "true")
{var XtraMenueBlock1Link9 = "<a href=\""+gamelink+"/profil/id:" + userid + "/\" title=\"Dein Profil\" class=\"xtra_link_1\">"+Name+"</a>";}
else{var XtraMenueBlock1Link9 = "";};
// lets fight
// Highscorelink
var hslink = ""+hslink1+"/user/?min="+attmin+"&max="+attmax+"";
if (Highscore == "true")
{var XtraMenueBlock1Link10 = "<a class=\"xtra_link_4 tooltip1\" href=\""+hslink+"\">Let&#39;s Fight ("+hs2+")<span><u>Angriffspunkte</u><br><b>Von <font color=\"green\">"+attmin+"</font><br>bis <font color=\"red\">"+attmax+"</font></b></span></a>";}
else{var XtraMenueBlock1Link10 = "";};

// superhighscore
// hse links
var SuperHighscoreHamburg = "http://hamburg.pennerzone.de/highscore/?page=1&points_min="+attmin+"&points_max="+attmax+"&gang=egal&action=Suchen&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=";
var SuperHighscoreBerlin = "http://berlin.pennerzone.de/highscore/?page=1&points_min="+attmin+"&points_max="+attmax+"&gang=egal&action=Suchen&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=";

if (SuperHighscore == "true"){
// link hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var XtraSuperHighscore = "<a href=\""+SuperHighscoreHamburg+"\" class=\"xtra_link_1\" target=\"_blank\" title=\"Externe Toolseite\">SuperHigscore</a>";}
// link berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var XtraSuperHighscore = "<a href=\""+SuperHighscoreBerlin+"\" class=\"xtra_link_1\" target=\"_blank\" title=\"Externe Toolseite\">SuperHigscore</a>";}
// link muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) { var XtraSuperHighscore = ""; }
// link malle
if (url.indexOf("http://malle.pennergame")>=0) { var XtraSuperHighscore = ""; }

};

// ende menue-block 1
// linkkette menueblock 1
if (PennerBlock == "true")
{var XtraMenueBlock1 = "<li><h5>Penner</h5><div class=\"xtra_menue_content\">"+XtraMenueBlock1Link1+XtraMenueBlock1Link2+XtraMenueBlock1Link3+XtraMenueBlock1Link4+XtraMenueBlock1Link5+XtraMenueBlock1Link6+XtraMenueBlock1Link7+XtraMenueBlock1Link8+XtraMenueBlock1Link9+XtraMenueBlock1Link10+XtraSuperHighscore+"</div></li>";}
else{var XtraMenueBlock1 = "";};

// wenn bandenid vorhanden dan menueblock/menuepunkte anzeigen
if (bandenid != 0) {

// start menue-block 2
// bandenlink + name
if (Bande == "true")
{var XtraMenueBlock2Link1 = "<a class=\"xtra_link_5 tooltip1\" href=\""+gamelink+"/gang/\">"+bandenname+"<span><u>K&auml;mpfe: <font color=\"green\"><br>WIN</font> / <font color=\"red\">LOOSE</font></u><br><b><font color=\"green\">"+bkw2+"</font> zu <font color=\"red\">"+bkl2+"</font></b><br><br><u>Punkte:</u><b> "+bandenpunkte+"</b><br><u>Position:</u><b> "+bandenposition+"</b><br><u>Mitglieder:</u><b> "+bandenmember+"</b></span></a>";}
else{var XtraMenueBlock2Link1 = "";};
// bandenprofil
if (Bandenprofil == "true")
{var XtraMenueBlock2Link2 = "<a class=\"xtra_link_1\" href=\""+gamelink+"/profil/bande:"+bandenid+"/\">Bandenprofil</a>";}
else{var XtraMenueBlock2Link2 = "";};
// bandenmitglieder
if (Mitglieder == "true")
{var XtraMenueBlock2Link3 = "<a class=\"xtra_link_4\" href=\""+gamelink+"/gang/memberlist/\">Mitglieder</a>";}
else{var XtraMenueBlock2Link3 = "";};
// bandenforum
if (Forum == "true")
{var XtraMenueBlock2Link4 = "<a class=\"xtra_link_2\" href=\""+gamelink+"/gang/forum/\">Bandenforum</a>";}
else{var XtraMenueBlock2Link4 = "";};
// bandenkasse part1
if (Kasse == "true")
{var XtraMenueBlock2Link5 = "<a class=\"xtra_link_1 tooltip1\" href=\"/gang/credit/\">Bandenkasse<span><u>Kontostand:</u><br><b>"+bg2+"&euro;</b></span></a>";}
else{var XtraMenueBlock2Link5 = "";};
// bandenkasse part2
if (Einzahlen == "true")
{var XtraMenueBlock2Link6 = "<a class=\"xtra_link_5\"><form method=\"post\" action=\"/gang/cash/add/\"><input name=\"f_money\" type=\"text\" id=\"f_money\" size=\"10\"><input type=\"submit\" name=\"Submit\" value=\"&euro;\"><input name=\"f_comment\" type=\"hidden\" value=\""+XtraKassenKommentar+"\"></form></a>";}
else{var XtraMenueBlock2Link6 = "";};
// admin link
if (Admin == "true")
{var XtraMenueBlock2Link7 = "<a class=\"xtra_link_2\" href=\""+gamelink+"/gang/admin/\">(Co-)Adminbereich</a>";}
else{var XtraMenueBlock2Link7 = "";};
// bandeneigentum
if (Eigentum == "true")
{var XtraMenueBlock2Link8 = "<a class=\"xtra_link_4\" href=\""+gamelink+"/gang/upgrades/\">Bandeneigentum</a>";}
else{var XtraMenueBlock2Link8 = "";};
// plunderbank
if (Plunderbank == "true")
{var XtraMenueBlock2Link9 = "<a class=\"xtra_link_1\" href=\""+gamelink+"/gang/stuff/\">Plunderbank</a>";}
else{var XtraMenueBlock2Link9 = "";};
// upgrade
if (Upgrade == "true")
{var XtraMenueBlock2Link10 = "<a class=\"xtra_link_3\" href=\""+gamelink+"/gang/stuff/upgrades/\">Upgrades</a>";}
else{var XtraMenueBlock2Link10 = "";};
// ende menue-block 2
// linkkette menueblock 2
if (BandeBlock == "true")
{var XtraMenueBlock2 = "<li><h5>Bande</h5><div class=\"xtra_menue_content\">"+XtraMenueBlock2Link1+XtraMenueBlock2Link2+XtraMenueBlock2Link3+XtraMenueBlock2Link4+XtraMenueBlock2Link5+XtraMenueBlock2Link6+XtraMenueBlock2Link7+XtraMenueBlock2Link8+XtraMenueBlock2Link9+XtraMenueBlock2Link10+"</div></li>";}
else{var XtraMenueBlock2 = "";};

// wenn keine bandenid bzw id 0 dan kein menue
}else{
var XtraMenueBlock2 = "";
};

// start menue-block 3
// pennersuche
if (Suche == "true")
{var XtraMenueBlock3Link1 = "<a class=\"xtra_link_2\"><form method=\"GET\" action=\""+gamelink+"/highscore/user/\"><input name=\"name\" type=\"text\" size=\"7\"><input class=\"formbutton\" type=\"submit\" value=\"Suchen\"></form></a>";}
else{var XtraMenueBlock3Link1 = "";};
// bier
if (Bier == "true")
{var XtraMenueBlock3Link2 = "<a class=\"xtra_link_5\"><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Bier\"><input id=\"Bier\" type=\"hidden\" value=\"0.35\" /><input type=\"hidden\" name=\"promille\" value=\"35\" /><input type=\"hidden\" name=\"id\" value=\"1\" /><input id=\"menge_Bier\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbier+" /><input id=\"drink_Bier\" type=\"submit\" value=\"Bier\"/></form></a>";}
else{var XtraMenueBlock3Link2 = "";};
// wodka
if (Wodka == "true")
{var XtraMenueBlock3Link3 = "<a class=\"xtra_link_1\"><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Wodka\"><input id=\"Wodka\" type=\"hidden\" value=\"2.50\" /><input type=\"hidden\" name=\"promille\" value=\"250\" /><input type=\"hidden\" name=\"id\" value=\"7\" /><input id=\"menge_Wodka\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtwodka+" /><input id=\"drink_Wodka\" type=\"submit\" value=\"Wodka\"/></form></a>";}
else{var XtraMenueBlock3Link3 = "";};
// brot
if (Brot == "true")
{var XtraMenueBlock3Link4 = "<a class=\"xtra_link_3\"><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Brot\"><input id=\"Brot\" type=\"hidden\" value=\"-0.35\" /><input type=\"hidden\" name=\"promille\" value=\"-35\" /><input type=\"hidden\" name=\"id\" value=\"2\" /><input id=\"menge_Brot\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbrot+" /><input id=\"drink_Brot\" type=\"submit\" value=\"Brot\" /></form></a>";}
else{var XtraMenueBlock3Link4 = "";};
// currywurst
if (Wurst == "true")
{var XtraMenueBlock3Link5 = "<a class=\"xtra_link_4\"><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Currywurst\"><input id=\"Currywurst\" type=\"hidden\" value=\"-1.00\" /><input type=\"hidden\" name=\"promille\" value=\"-100\" /><input type=\"hidden\" name=\"id\" value=\"3\" /><input id=\"menge_Currywurst\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtwurst+" /><input id=\"drink_Currywurst\" type=\"submit\" value=\"Currywurst\" /></form></a>";}
else{var XtraMenueBlock3Link5 = "";};
// hamburger
if (Burger == "true")
{var XtraMenueBlock3Link6 = "<a class=\"xtra_link_1\"><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Hamburger\"><input id=\"Hamburger\" type=\"hidden\" value=\"-2.00\" /><input type=\"hidden\" name=\"promille\" value=\"-200\" /><input type=\"hidden\" name=\"id\" value=\"4\" /><input id=\"menge_Hamburger\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtburger+" /><input id=\"drink_Hamburger\" type=\"submit\" value=\"Hamburger\" /></form></a>";}
else{var XtraMenueBlock3Link6 = "";};
// ende menue-block 3
// linkkette menueblock 3
if (SonstigesBlock == "true")
{var XtraMenueBlock3 = "<li><h5>Sonst.</h5><div class=\"xtra_menue_content\">"+XtraMenueBlock3Link1+XtraMenueBlock3Link2+XtraMenueBlock3Link3+XtraMenueBlock3Link4+XtraMenueBlock3Link5+XtraMenueBlock3Link6+"</div></li>";}
else{var XtraMenueBlock3 = "";};

// menue div erzeugen
var MyNewDiv = document.createElement('div');
document.body.appendChild(MyNewDiv);
// menue bilden
if (XtraMenue == "true")
{MyNewDiv.innerHTML = "<div id=\"xtra_menue_container\" style=\""+XtraMenueRightLeft+":"+XtraMenueRightLeftPx+"px; "+XtraMenueTopBottom+":"+XtraMenueTopBottomPx+"px; position:"+XtraMenueAbsoluteFixed+";\">"+XtraMenueBlockSupport+XtraMenueBlock1+XtraMenueBlock2+XtraMenueBlock3+"</div>";}
else{MyNewDiv.innerHTML = "";};

// updatediv erzeugen und fuellen
var XtraMenueUpdate = document.createElement('div');
document.body.appendChild(XtraMenueUpdate);

// updateanzeige wen update verfuegbar
if (CurrentScriptVersion != neueversion)
{XtraMenueUpdate.innerHTML = "<div style=\"top:85px;left:120px;\" id=\"notifyme\" class=\"zabsolute zleft\"><div class=\"icon ok zleft\" id=\"nicon\"></div><div class=\"zleft right\" id=\"ntext\"><h2>X-Tra Menue Update</h2><p style=\"text-align:left;\"><b>Updateversion: "+neueversion+"</b><br/><a href=\""+downloadurl+"\"><font color=\"black\"><b><u>Update Installieren</u></b></font><br/><a href=\""+xmlurl+"\"><font color=\"black\"><b><u>Scripthomepage u. Infos</u></b></font></a></font></a></p></div></div>";}
else
{XtraMenueUpdate.innerHTML = "";}

// optionsmenue
// seitenerkennung fuer optionsmenue
if(window.location.href == ""+gamelink+"/settings/"){

// option xtra menue anzeigen ja/nein
if (XtraMenue == "true")
{var OXtraSettingMenue = "<input name=\"XtraMenueIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingMenue = "<input name=\"XtraMenueIn\" type=\"checkbox\" />";};

// optionen fuer menueblock 1 (penner) --->>
// option pennerblock anzeigen ja/nein
if (PennerBlock == "true")
{var OXtraSettingPennerBlock = "<input name=\"XtraPennerBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingPennerBlock = "<input name=\"XtraPennerBlockIn\" type=\"checkbox\" />";};
// option spenden
if (Spenden == "true")
{var OXtraPennerSetting1 = "<input name=\"XtraSpendenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Spenden</span>";}
else
{var OXtraPennerSetting1 = "<input name=\"XtraSpendenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Spenden</span>";};
// option sauberkeit
if (Sauberkeit == "true")
{var OXtraPennerSetting2 = "<input name=\"XtraSauberkeitIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Sauberkeit</span>";}
else
{var OXtraPennerSetting2 = "<input name=\"XtraSauberkeitIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Sauberkeit</span>";};
// option waschen6
if (Waschen6 == "true")
{var OXtraPennerSetting3 = "<input name=\"XtraWaschen6In\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Waschen 6&euro;</span>";}
else
{var OXtraPennerSetting3 = "<input name=\"XtraWaschen6In\" type=\"checkbox\" /><span style=\"color:#000000;\"> Waschen 6&euro;</span>";};
// option waschen25
if (Waschen25 == "true")
{var OXtraPennerSetting4 = "<input name=\"XtraWaschen25In\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Waschen 25&euro;</span>";}
else
{var OXtraPennerSetting4 = "<input name=\"XtraWaschen25In\" type=\"checkbox\" /><span style=\"color:#000000;\"> Waschen 25&euro;</span>";};
// option uebersicht
if (Uebersicht == "true")
{var OXtraPennerSetting5 = "<input name=\"XtraUebersichtIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> &Uuml;bersicht</span>";}
else
{var OXtraPennerSetting5 = "<input name=\"XtraUebersichtIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> &Uuml;bersicht</span>";};
// option plunder
if (Plunder == "true")
{var OXtraPennerSetting6 = "<input name=\"XtraPlunderIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Plunder</span>";}
else
{var OXtraPennerSetting6 = "<input name=\"XtraPlunderIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Plunder</span>";};
// option nachrichten
if (Nachrichten == "true")
{var OXtraPennerSetting7 = "<input name=\"XtraNachrichtenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Nachrichten</span>";}
else
{var OXtraPennerSetting7 = "<input name=\"XtraNachrichtenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Nachrichten</span>";};
// option freunde
if (Freunde == "true")
{var OXtraPennerSetting8 = "<input name=\"XtraFreundeIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Freunde</span>";}
else
{var OXtraPennerSetting8 = "<input name=\"XtraFreundeIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Freunde</span>";};
// option profil
if (Profil == "true")
{var OXtraPennerSetting9 = "<input name=\"XtraProfilIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Eigenes Profil</span>";}
else
{var OXtraPennerSetting9 = "<input name=\"XtraProfilIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Eigenes Profil</span>";};
// option highscore (lets fight)
if (Highscore == "true")
{var OXtraPennerSetting10 = "<input name=\"XtraHighscoreIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Let&#39;s Fight</span>";}
else
{var OXtraPennerSetting10 = "<input name=\"XtraHighscoreIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Let&#39;s Fight</span>";};
// option superhighscore
if (SuperHighscore == "true")
{var OXtraPennerSetting11 = "<input name=\"XtraSuperHighscoreIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\">SuperHighscore</span>";}
else
{var OXtraPennerSetting11 = "<input name=\"XtraSuperHighscoreIn\" type=\"checkbox\" /><span style=\"color:#000000;\">SuperHighscore</span>";};

// <<--- optionen fuer menueblock 1 (penner)

// optionen fuer menueblock 2 (bande) --->>
// option bandeblock anzeigen ja/nein
if (BandeBlock == "true")
{var OXtraSettingBandeBlock = "<input name=\"XtraBandeBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingBandeBlock = "<input name=\"XtraBandeBlockIn\" type=\"checkbox\" />";};
// option bande
if (Bande == "true")
{var OXtraBandeSetting1 = "<input name=\"XtraBandeIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Bande</span>";}
else
{var OXtraBandeSetting1 = "<input name=\"XtraBandeIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Bande</span>";};
// option bandenprofil
if (Bandenprofil == "true")
{var OXtraBandeSetting2 = "<input name=\"XtraBandenprofilIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Bandenprofil</span>";}
else
{var OXtraBandeSetting2 = "<input name=\"XtraBandenprofilIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Bandenprofil</span>";};
// option mitglieder
if (Mitglieder == "true")
{var OXtraBandeSetting3 = "<input name=\"XtraMitgliederIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Mitglieder</span>";}
else
{var OXtraBandeSetting3 = "<input name=\"XtraMitgliederIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Mitglieder</span>";};
// option forum
if (Forum == "true")
{var OXtraBandeSetting4 = "<input name=\"XtraForumIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Forum</span>";}
else
{var OXtraBandeSetting4 = "<input name=\"XtraForumIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Forum</span>";}
// option kasse
if (Kasse == "true")
{var OXtraBandeSetting5 = "<input name=\"XtraKasseIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Kasse</span>";}
else
{var OXtraBandeSetting5 = "<input name=\"XtraKasseIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Kasse</span>";}
// option einzahlen
if (Einzahlen == "true")
{var OXtraBandeSetting6 = "<input name=\"XtraEinzahlenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Einzahlen</span>";}
else
{var OXtraBandeSetting6 = "<input name=\"XtraEinzahlenIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Einzahlen</span>";}
// option admin
if (Admin == "true")
{var OXtraBandeSetting7 = "<input name=\"XtraAdminIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Admin</span>";}
else
{var OXtraBandeSetting7 = "<input name=\"XtraAdminIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Admin</span>";}
// option eigentum
if (Eigentum == "true")
{var OXtraBandeSetting8 = "<input name=\"XtraEigentumIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Eigentum</span>";}
else
{var OXtraBandeSetting8 = "<input name=\"XtraEigentumIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Eigentum</span>";}
// option plunderbank
if (Plunderbank == "true")
{var OXtraBandeSetting9 = "<input name=\"XtraPlunderbankIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Plunderbank</span>";}
else
{var OXtraBandeSetting9 = "<input name=\"XtraPlunderbankIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Plunderbank</span>";}
// option upgrade
if (Upgrade == "true")
{var OXtraBandeSetting10 = "<input name=\"XtraUpgradeIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Upgrade</span>";}
else
{var OXtraBandeSetting10 = "<input name=\"XtraUpgradeIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Upgrade</span>";}
// <<--- optionen fuer menueblock 2 (bande)

// optionen fuer menueblock 3 (sonst.) --->>
// option bandeblock anzeigen ja/nein
if (SonstigesBlock == "true")
{var OXtraSettingSonstigesBlock = "<input name=\"XtraSonstigesBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else
{var OXtraSettingSonstigesBlock = "<input name=\"XtraSonstigesBlockIn\" type=\"checkbox\" />";};
// option suche
if (Suche == "true")
{var OXtraSonstigesSetting1 = "<input name=\"XtraSucheIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Suche</span>";}
else
{var OXtraSonstigesSetting1 = "<input name=\"XtraSucheIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Suche</span>";}
// option bier
if (Bier == "true")
{var OXtraSonstigesSetting2 = "<input name=\"XtraBierIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Bier</span>";}
else
{var OXtraSonstigesSetting2 = "<input name=\"XtraBierIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Bier</span>";}
// option wodka
if (Wodka == "true")
{var OXtraSonstigesSetting3 = "<input name=\"XtraWodkaIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Wodka</span>";}
else
{var OXtraSonstigesSetting3 = "<input name=\"XtraWodkaIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Wodka</span>";}
// option brot
if (Brot == "true")
{var OXtraSonstigesSetting4 = "<input name=\"XtraBrotIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Brot</span>";}
else
{var OXtraSonstigesSetting4 = "<input name=\"XtraBrotIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Brot</span>";}
// option wurst
if (Wurst == "true")
{var OXtraSonstigesSetting5 = "<input name=\"XtraWurstIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Currywurst</span>";}
else
{var OXtraSonstigesSetting5 = "<input name=\"XtraWurstIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Currywurst</span>";}
// option burger
if (Burger == "true")
{var OXtraSonstigesSetting6 = "<input name=\"XtraBurgerIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#ffffff;\"> Hamburger</span>";}
else
{var OXtraSonstigesSetting6 = "<input name=\"XtraBurgerIn\" type=\"checkbox\" /><span style=\"color:#000000;\"> Hamburger</span>";}
// <<--- optionen fuer menueblock 3 (sonst.)

// optionen fuer position --->>
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
// <<--- optionen fuer position

// optionsmenue kopfbereich
var OXtraBereichTop1 = "<tr><td colspan=\"3\" align=\"left\" height=\"15\" valign=\"top\"><span class=\"tiername\">X-Tra Menue Einstellungen</span><hr size=\"1\"></td></tr>";
var OXtraBereichTop2 = "<tr><td>Xtra-Men&uuml; ein-/ausblenden: "+OXtraSettingMenue+" | Kassenkommentar: <input name=\"XtraKassenKommentarIn\" size=\"10\" type=\"text\" value=\""+XtraKassenKommentar+"\" /><br/><hr size=\"1\"></td><tr>";
// optionsmenue penner
var OXtraBereichPennerBlock1 = "<tr><td><u>Men&uuml;punkte Penner anzeigen? "+OXtraSettingPennerBlock+" Wenn JA welche:</u><br></td></tr>";
var OXtraBereichPennerBlock2 = "<tr><td>"+OXtraPennerSetting1+" | "+OXtraPennerSetting2+" | "+OXtraPennerSetting3+" | "+OXtraPennerSetting4+" | "+OXtraPennerSetting5+" | "+OXtraPennerSetting6+"<br/></td></tr>";
var OXtraBereichPennerBlock3 = "<tr><td>"+OXtraPennerSetting7+" | "+OXtraPennerSetting8+" | "+OXtraPennerSetting9+" | "+OXtraPennerSetting10+" | "+OXtraPennerSetting11+"<br/><hr size=\"1\"></td></tr>";
var OXtraBereichPenner = ""+OXtraBereichPennerBlock1+OXtraBereichPennerBlock2+OXtraBereichPennerBlock3+"";
// optionsmenue bande
// wenn bandenid vorhanden dan menueblock/menuepunkte anzeigen
if (bandenid != 0) {
var OXtraBereichBandeBlock1 = "<tr><td><u>Men&uuml;punkte Bande anzeigen? "+OXtraSettingBandeBlock+" Wenn JA welche:</u><br></td>";
var OXtraBereichBandeBlock2 = "<tr><td>"+OXtraBandeSetting1+" | "+OXtraBandeSetting2+" | "+OXtraBandeSetting3+" | "+OXtraBandeSetting4+" | "+OXtraBandeSetting5+" | "+OXtraBandeSetting6+"<br/></td></tr>";
var OXtraBereichBandeBlock3 = "<tr><td>"+OXtraBandeSetting7+" | "+OXtraBandeSetting8+" | "+OXtraBandeSetting9+" | "+OXtraBandeSetting10+"<br/><hr size=\"1\"></td></tr>";
var OXtraBereichBande = ""+OXtraBereichBandeBlock1+OXtraBereichBandeBlock2+OXtraBereichBandeBlock3+"";
// wenn bandenid 0 ausblenden
}else{
var OXtraBereichBande = "";
}
// optionsmenue sonstiges
var OXtraBereichSonstigesBlock1 = "<tr><td><u>Men&uuml;punkte Sonst. anzeigen? "+OXtraSettingSonstigesBlock+" Wenn JA welche:</u><br></td></tr>";
var OXtraBereichSonstigesBlock2 = "<tr><td>"+OXtraSonstigesSetting1+" | "+OXtraSonstigesSetting2+" | "+OXtraSonstigesSetting3+" | "+OXtraSonstigesSetting4+" | "+OXtraSonstigesSetting5+" | "+OXtraSonstigesSetting6+"<br/><hr size=\"1\"></td></tr>";
var OXtraBereichSonstiges = ""+OXtraBereichSonstigesBlock1+OXtraBereichSonstigesBlock2+"";
// optionsmenue ausrichtung
var OXtraBereichStyleVertikal = "<tr><td>Men&uuml;ausrichtung Vertikal: "+OXtraMenueTopBottomPx+" Pixel von "+OXtraMenueTopBottom+"<br/></td></tr>";
var OXtraBereichStyleHorizontal = "<tr><td>Men&uuml;ausrichtung Horizon: "+OXtraMenueRightLeftPx+" Pixel von "+OXtraMenueRightLeft+"<br/><br/></td></tr>";
var OXtraBereichStyleFixierung = "<tr><td>Men&uuml; Fixierung: "+OXtraMenueAbsoluteFixed+"<br/><br/></td></tr>";
var OXtraBereichStyleFixierung1 = "<tr><td><b>Scrollbar:</b> Das Men&uuml; Scrollt mit der Seite mit<br/><b>Fixiert:</b> Das Men&uuml; bleibt stehen auch wen die Seite scrollt<br/><br/></td></tr>";
var OXtraBereichStyleFixierung2 = "<tr><td>Fixiert ist nicht zu empfehlen wenn viele Men&uuml;punkte aktiv sind da sonst die unteren Links nicht mehr erreichbar sind.<br/></td></tr>";
var OXtraBereichStyle = ""+OXtraBereichStyleVertikal+OXtraBereichStyleHorizontal+OXtraBereichStyleFixierung+OXtraBereichStyleFixierung1+OXtraBereichStyleFixierung2+"";

// optionsmenue fussbereich
var OXtraSpeichern = "<input type=\"submit\" class=\"formbutton\"  name=\"SpeichernXtraMenue\" value=\"Speichern\" />";
var OXtraBereichBottom = "<tr><td><br/>"+OXtraSpeichern+"</td></tr>";

var OXtraBereichKette = ""+OXtraBereichTop1+OXtraBereichTop2+OXtraBereichPenner+OXtraBereichBande+OXtraBereichSonstiges+OXtraBereichStyle+OXtraBereichBottom+"";

// optionsmenue in html einfuegen
document.getElementById("content").innerHTML += "<div class=\"settingpoint setold\"><table class=\"tieritemA\" width=\"450\"><tbody>"+OXtraBereichKette+"</tbody></table></div>";

// Wurde Speichern geklickt dann...
document.getElementsByName('SpeichernXtraMenue')[0].addEventListener('click', function Schliessen () {

// xtra menue option
if (document.getElementsByName('XtraMenueIn')[0].checked == true)
{GM_setValue("XtraMenueIn", "true");}else{GM_setValue("XtraMenueIn", "false");}
// pennerblock optionen speichern
// pennerblock
if (document.getElementsByName('XtraPennerBlockIn')[0].checked == true)
{GM_setValue("XtraPennerBlockIn", "true");}else{GM_setValue("XtraPennerBlockIn", "false");}
// spenden
if (document.getElementsByName('XtraSpendenIn')[0].checked == true)
{GM_setValue("XtraSpendenIn", "true");}else{GM_setValue("XtraSpendenIn", "false");}
// sauberkeit
if (document.getElementsByName('XtraSauberkeitIn')[0].checked == true)
{GM_setValue("XtraSauberkeitIn", "true");}else{GM_setValue("XtraSauberkeitIn", "false");}
// waschen6
if (document.getElementsByName('XtraWaschen6In')[0].checked == true)
{GM_setValue("XtraWaschen6In", "true");}else{GM_setValue("XtraWaschen6In", "false");}
// waschen25
if (document.getElementsByName('XtraWaschen25In')[0].checked == true)
{GM_setValue("XtraWaschen25In", "true");}else{GM_setValue("XtraWaschen25In", "false");}
// uebersicht
if (document.getElementsByName('XtraUebersichtIn')[0].checked == true)
{GM_setValue("XtraUebersichtIn", "true");}else{GM_setValue("XtraUebersichtIn", "false");}
// plunder
if (document.getElementsByName('XtraPlunderIn')[0].checked == true)
{GM_setValue("XtraPlunderIn", "true");}else{GM_setValue("XtraPlunderIn", "false");}
// nachrichten
if (document.getElementsByName('XtraNachrichtenIn')[0].checked == true)
{GM_setValue("XtraNachrichtenIn", "true");}else{GM_setValue("XtraNachrichtenIn", "false");}
// freunde
if (document.getElementsByName('XtraFreundeIn')[0].checked == true)
{GM_setValue("XtraFreundeIn", "true");}else{GM_setValue("XtraFreundeIn", "false");}
// profil
if (document.getElementsByName('XtraProfilIn')[0].checked == true)
{GM_setValue("XtraProfilIn", "true");}else{GM_setValue("XtraProfilIn", "false");}
// highscore
if (document.getElementsByName('XtraHighscoreIn')[0].checked == true)
{GM_setValue("XtraHighscoreIn", "true");}else{GM_setValue("XtraHighscoreIn", "false");}
// superhighscore
if (document.getElementsByName('XtraSuperHighscoreIn')[0].checked == true)
{GM_setValue("XtraSuperHighscoreIn", "true");}else{GM_setValue("XtraSuperHighscoreIn", "false");}

// bandeblock optionen speichern
// bandeblock
if (document.getElementsByName('XtraBandeBlockIn')[0].checked == true)
{GM_setValue("XtraBandeBlockIn", "true");}else{GM_setValue("XtraBandeBlockIn", "false");}
// bande
if (document.getElementsByName('XtraBandeIn')[0].checked == true)
{GM_setValue("XtraBandeIn", "true");}else{GM_setValue("XtraBandeIn", "false");}
// bandenprofil
if (document.getElementsByName('XtraBandenprofilIn')[0].checked == true)
{GM_setValue("XtraBandenprofilIn", "true");}else{GM_setValue("XtraBandenprofilIn", "false");}
// mitglieder
if (document.getElementsByName('XtraMitgliederIn')[0].checked == true)
{GM_setValue("XtraMitgliederIn", "true");}else{GM_setValue("XtraMitgliederIn", "false");}
// forum
if (document.getElementsByName('XtraForumIn')[0].checked == true)
{GM_setValue("XtraForumIn", "true");}else{GM_setValue("XtraForumIn", "false");}
// kasse
if (document.getElementsByName('XtraKasseIn')[0].checked == true)
{GM_setValue("XtraKasseIn", "true");}else{GM_setValue("XtraKasseIn", "false");}
// einzahlen
if (document.getElementsByName('XtraEinzahlenIn')[0].checked == true)
{GM_setValue("XtraEinzahlenIn", "true");}else{GM_setValue("XtraEinzahlenIn", "false");}
// admin
if (document.getElementsByName('XtraAdminIn')[0].checked == true)
{GM_setValue("XtraAdminIn", "true");}else{GM_setValue("XtraAdminIn", "false");}
// eigentum
if (document.getElementsByName('XtraEigentumIn')[0].checked == true)
{GM_setValue("XtraEigentumIn", "true");}else{GM_setValue("XtraEigentumIn", "false");}
// plunderbank
if (document.getElementsByName('XtraPlunderbankIn')[0].checked == true)
{GM_setValue("XtraPlunderbankIn", "true");}else{GM_setValue("XtraPlunderbankIn", "false");}
// upgrade
if (document.getElementsByName('XtraUpgradeIn')[0].checked == true)
{GM_setValue("XtraUpgradeIn", "true");}else{GM_setValue("XtraUpgradeIn", "false");}

// sonst.block optionen speichern
// sonst.block
if (document.getElementsByName('XtraSonstigesBlockIn')[0].checked == true)
{GM_setValue("XtraSonstigesBlockIn", "true");}else{GM_setValue("XtraSonstigesBlockIn", "false");}
// suche
if (document.getElementsByName('XtraSucheIn')[0].checked == true)
{GM_setValue("XtraSucheIn", "true");}else{GM_setValue("XtraSucheIn", "false");}
// bier
if (document.getElementsByName('XtraBierIn')[0].checked == true)
{GM_setValue("XtraBierIn", "true");}else{GM_setValue("XtraBierIn", "false");}
// wodka
if (document.getElementsByName('XtraWodkaIn')[0].checked == true)
{GM_setValue("XtraWodkaIn", "true");}else{GM_setValue("XtraWodkaIn", "false");}
// brot
if (document.getElementsByName('XtraBrotIn')[0].checked == true)
{GM_setValue("XtraBrotIn", "true");}else{GM_setValue("XtraBrotIn", "false");}
// wurst
if (document.getElementsByName('XtraWurstIn')[0].checked == true)
{GM_setValue("XtraWurstIn", "true");}else{GM_setValue("XtraWurstIn", "false");}
// burger
if (document.getElementsByName('XtraBurgerIn')[0].checked == true)
{GM_setValue("XtraBurgerIn", "true");}else{GM_setValue("XtraBurgerIn", "false");}

// optische optionen speichern
// oben oder unten
GM_setValue("XtraMenueTopBottomIn", document.getElementsByName('XtraMenueTopBottomIn')[0].value);
// pixel von oben oder unten
GM_setValue("XtraMenueTopBottomPxIn", document.getElementsByName('XtraMenueTopBottomPxIn')[0].value);
// rechts oder links
GM_setValue("XtraMenueRightLeftIn", document.getElementsByName('XtraMenueRightLeftIn')[0].value);
// pixel von rechts oder links
GM_setValue("XtraMenueRightLeftPxIn", document.getElementsByName('XtraMenueRightLeftPxIn')[0].value);
// fixierung des menues
GM_setValue("XtraMenueAbsoluteFixedIn", document.getElementsByName('XtraMenueAbsoluteFixedIn')[0].value);
// kassenkommetar
GM_setValue("XtraKassenKommentarIn", document.getElementsByName('XtraKassenKommentarIn')[0].value);

// Seite neu laden ----------
window.location.reload();
},false);

// klammer seitenerkennung optionsmenue
}
// klammern bandenkasse
}})
// klammern bandenkaempfe
}})
// klammern bandeninfos
}})
// klammern banden- id, name / eigene punkte
}})
// klammern angriffspunkte
}})
// klammern userinfos
}})
// klammern update
}})