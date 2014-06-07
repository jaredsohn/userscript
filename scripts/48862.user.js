// ==UserScript==
// @name         Pennerbar berlin by basti1012
// @namespace    Autor: basti1012 ze3igt alles was man brauch
// @description  Fuegt ein infpormations menue am rand ein
// @include      http://berlin.pennergame.de*
// @exclude      *www.pennergame.de*
// ==/UserScript==
// ==UserScript==

GM_xmlhttpRequest({
  method: 'GET',
  url: "http://berlin.pennergame.de/overview/",
      onload: function( response ) {
      var content = response.responseText;
      var skill = content.split('<li><span class="att">')[1].split('</span> ATT</li>')[0];
      var skill1 = content.split('<li><span class="def">')[1].split('</span> DEF</li>')[0];
      var skill2 = content.split('<li><span class="mitleid">')[1].split('</span>  Mitleid</li>')[0];
      var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
      var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
      var att = content.split('<span class="att">')[1].split('</span>')[0];
      var def = content.split('<span class="def">')[1].split('</span>')[0];
      var platz = content.split('<span class="v">')[1].split('</span>')[0];
      var geld = content.split('<span class="v">')[2].split('</span>')[0];
      var prom2 = content.match(/\u003E([0-9]\.[0-9]+)\u0026permil\u003B\u003C/)[1];
      var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
      var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];
	  var kurs = content.split('<a href="/stock/bottle/"><span id="pfandflaschen_kurs_ajax">')[1].split('</span> Cent</a>')[0];

// >>Benoetigte Brot- und Biermenge ausrechnen:
var Alk = prom2
var Benoetigtprozent = 299 - Alk;
var Benoetigtbier = Math.floor(Benoetigtprozent/35);
var Benoetigtbrot = Math.ceil(Alk/35);

// >>Banden-Infos bekommen
GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://berlin.pennergame.de/dev/api/user.'+userid+'.xml',
      onload: function(responseDetails) {
           var content = responseDetails.responseText;
         var bandenid = content.split('<id>')[2].split('</id>')[0];
         var bandenname = content.split('<name>')[2].split('</name>')[0];
         var hs2 = content.split('<points>')[1].split('</points>')[0];

GM_xmlhttpRequest({
	method: 'GET',
	url: "http://berlin.pennergame.de/fight/overview/",
		onload: function( response ) {
		var lf = response.responseText;
		var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
		var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];

var hslink = 'http://berlin.pennergame.de/highscore/range/?max_points='+attmax+'&min_points='+attmin+'&serverload=low'

// >>Bei 10 Spenden soll die Anzeige rot sein
var maxspenden = "<span style=\"color:green\"><big><b>10</b></big></span>" //sollte PG wieder auf 200 Spenden umstellen, muss das hier angepasst werden.

if (spendenbisherpur>9) {
 var spendenbisher = "<span style=\"color:red\"><big><b>"+spendenbisherpur+"</b></big></span>";
}
 else {
 var spendenbisher = spendenbisherpur;
}
 
var maxflaschen = "1"

var CName = "<li><a href=\"http://www.pennergame.de\" title=\"nach Hamburg\"<span style=\"color:#99B200;\"><b>Berlin</b></span></a></li>";

var CMenuepenner = "<li><a href=\"http://www.berlin.pennergame.de\" title=\"nach Berlin\"<span style=\"color:#99B200;\"><b>Hamburg</b></span></a></li>";

var CSpenden = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"basti homepage\"><span style=\"color:#1006F8\"><b>Basti1012</span></a></li>";

var CWaschen = "<li><a href=\"/change_please/statistics/\"  title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Spenden: </span><span style=\"color:green\"<middle>"+spendenbisher+"</b></middle></span> / "+maxspenden+"</a></li>";

var CUebersicht = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Sauber: </span><span style=\"color:green\"<middle>"+clean+"%</b></middle></span></a></li>";

var CNachrichten = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Promille: </span><span style=\"color:green\"<middle>"+prom2+"‰</b></middle></span></a></li>";
 
var CFriends = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Pennerid: </span><span style=\"color:green\"<middle>"+userid+"</b></middle></span></a></li>";
 
var CProfil = "<li><a href=\"http://berlin.pennergame.de/profil/id:" + userid + "/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b></span><span style=\"color:green\"<middle>"+Name+"</b></middle></span></a></li>";

var CHigh = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b></span>ATT:<span style=\"color:green\"<middle>"+att+"</b></middle></span></a></li>";

var CMenuebande = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:red\"></span>DEF:<span style=\"color:green\"<middle>"+def+"</middle></span></a></li>"; 
 
var CBande =  "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Bande: </span><span style=\"color:green\"<middle>"+bandenname+"</b></middle></span></a></li>";

var CMember = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Punkte: </span><span style=\"color:green\"<middle>"+hs2+"</b></middle></span></a></li>";

var CForum = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>ATT MIN: </span><span style=\"color:green\"<middle>"+attmin+"</b></middle></span></a></li>";

var CKasse = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>ATT MAX: </span><span style=\"color:green\"<middle>"+attmax+"</b></middle></span></a></li>"; 

var CMenuerest = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>Platz: </span><span style=\"color:green\"<middle>"+platz+"</b></middle></span></a></li>"; 

var CSuchen = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\">GELD:</span><span style=\"color:green\"<middle>"+geld+"</middle></span></a></li>";

var CSkill = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>ATT tier: </span><span style=\"color:green\"<middle>"+skill+"</b></middle></span></a></li>";
var CSkill1 = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>DEF tier: </span><span style=\"color:green\"<middle>"+skill1+"</b></middle></span></a></li>";
var CSkill2 = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"Spenden-Statistik\"><span style=\"color:white\"><b>MIT tier: </span><span style=\"color:green\"<middle>"+skill2+"</b></middle></span></a></li>";
 

if (kurs <= 1) {
 var CFlaschen = "<a href=\"http://berlin.pennergame.de/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\">Pfandflaschen <small><b>("+kurs+"ct)</b></small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}
else {
 var CFlaschen = "<a href=\"http://berlin.pennergame.de/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\"><span style=\"color:green\"><b>Pfandflaschen <small>(<big><span style=\"color:red\"><b>"+kurs+"ct</b></span></big>)</small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}


var Linkkette = ""+CSpenden + CName + CMenuepenner + CProfil + CBande + CFriends + CMenuerest + CMember + CWaschen + CUebersicht + CNachrichten + CHigh + CMenuebande + CForum + CKasse + CSuchen + CFlaschen + CSkill + CSkill1 + CSkill2 + ""

document.getElementById("footer").innerHTML += "<span style=\"position:fixed;bottom:2px;right:1px;-moz-border-radius:0px;-moz-opacity:2.7;opacity:2.7;border:15px solid #1D0BF3; background-color:#000000\"><div class=\"content\" style=\"padding-top:5px\"><ul><ul>"+Linkkette+"</ul></div></span>";

}
}
)
}
}
)
}
}
)

