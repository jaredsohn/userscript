// ==UserScript==

// @name           Xtra Menü

// @namespace      dieaerztearethebest

// @description    Ein extra Menü

// @include        http://*.pennergame.de/*

// @exclude        http://newboard.pennergame.de/*

// ==/UserScript==


//XtraMenü
GM_xmlhttpRequest({
  method: 'GET',
  url: "http://pennergame.de/overview/",
      onload: function( response ) {
		var content = response.responseText;
		var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
		var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
		var prom2 = content.match(/\u003E([0-9]\.[0-9]+)\u0026permil\u003B\u003C/)[1];
		var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
		var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];
		var kurs = content.split('<a href="/stock/bottle/"><span id="pfandflaschen_kurs_ajax">')[1].split('</span> Cent</a>')[0];

// Benoetigte Brot- und Biermenge ausrechnen:
var Benoetigtbier = Math.floor((299 - prom2)/35);
var Benoetigtbrot = Math.ceil(prom2/35);

// Banden-Infos bekommen
GM_xmlhttpRequest({
   	method: 'GET',
   	url: 'http://www.pennergame.de/dev/api/user.'+userid+'.xml',
	   onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var bandenid = content.split('<id>')[2].split('</id>')[0];
			var bandenname = content.split('<name>')[2].split('</name>')[0];
			var hs2 = content.split('<points>')[1].split('</points>')[0];

GM_xmlhttpRequest({
	method: 'GET',
	url: "http://pennergame.de/fight/overview/",
       onload: function( response ) {
			var content = response.responseText;
			var attmin = content.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
			var attmax = content.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];

var Name=prompt('Wie lautet dein Name?');


var hslink = 'http://highscore.pennergame.de/highscore/range/1/?max_points='+attmax+'&min_points='+attmin+'&serverload=low'

var hselink = 'http://pennergame.ath.cx/highscore-suche/?points_min='+attmin+'&points_max='+attmax+'&bande=egal&sortby=cash&sorttype=desc&action=Suchen'

// Bei unter 50 Spenden soll die Anzeige rot sein
var maxspenden = "50" //sollte PG wieder auf 200 Spenden umstellen, muss das hier angepasst werden.

if (spendenbisherpur<maxspenden) {
 var spendenbisher = "<span style=\"color:#FF0000; border-bottom:1px dashed #FF0000;\">"+spendenbisherpur+"</span>";
}
 else {
 var spendenbisher = spendenbisherpur;
}

var maxflaschen = "10"



// Menue-Punkte
var CTitle = "<li><a alt=\"by dieaerztearethebest\" title=\"by dieaerztearethebest\"><span style=\"color:#FF0000;\"><big>Hallo "+Name+" </big></span></a></li>"

var CNachrichtenIn = "<li><a href=\"/messages/\" alt=\"Nachrichten\" title=\"Nachrichten\">Nachrichten Eingang</a></li>";
 
var CNachrichtenOut = "<li><a href=\"/messages/out/\" alt=\"Ausgang\" title=\"Ausgang\">Nachrichten Ausgang</a></li>";
 
var CFriends = "<li><a href=\"/friendlist/\" alt=\"Freunde und Blockierte\" title=\"Freunde und Blockierte\">Freundesliste</a></li>";
 
var CBande = "<li><a href=\"/gang/\" alt=\"Deine Bande\" title="+bandenname+">Deine Bande</a></li>";

var CBandenprofil = "<li><a href=\"/profil/bande:"+bandenid+"/\" alt=\"Bandenprofil\" title= \"Bandenprofil\">Bandenprofil</a></li>";

var CMember = "<li><a href=\"/gang/memberlist/\" alt=\"Mitglieder\" title= \"Mitglieder\">Mitglieder</a></li>";

var CKasse = "<a href=\"/gang/credit/\" alt=\"Bandenkasse\" title= \"Bandenkasse\">Einzahlen</a><li><form method=\"post\" action=\"/gang/cash/add/\">.  <input name=\"f_money\" type=\"text\" id=\"f_money\" size=\"5\"><input type=\"submit\" name=\"Submit\" value=\"Zahlen\"><input name=\"f_comment\" type=\"hidden\" value=\"Zahlen, Leute...\"></form></li>";

var CAdmin = "<li><a href=\"/gang/admin/\" alt=\"(Co-)Adminbereich\" title= \"(Co-)Adminbereich\">(Co-)Adminbereich</a>";

var CForum = "<li><a href=\"/gang/forum/\" alt=\"Bandenforum\" title= \"Bandenforum\">Bandenforum</a>"

var CProfil = "<li><a href=\"/profil/id:" + userid + "/\" alt=\"Dein Profil\" title=" + Name + ">Dein Profil</a></li>";

var CHigh = "<li><a href="+hslink+" alt=\"Highscore\" >Highscore ("+hs2+")</a></li>";

var CHigher = "<li><a href="+hselink+" alt=\"Highscore\" >Highscore-Suche</a></li>";

var CSpenden = "<li><a href=\"/change_please/statistics/\" alt=\"Spenden Statistik\" title=\"Spenden-Statistik\">Spenden: "+spendenbisher+" / "+maxspenden+"</a></li>";


var CWaschen = "<li><a href=\"/city/washhouse/buy/\" alt=\"Waschen\" title=\"Waschen\">Waschen</a></li>";
 
 
var CPlunder = "<li><a href=\"/stock/plunder/\" alt=\"Plunder\" title=\"Plunder\">Plunder</a></li>";

var CSuchen = "<a>Spieler suchen:</a><li><form method=\"GET\" action=\"http://highscore.pennergame.de/highscore/search/\"><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/buddy/buddy_on.png\" alt=\"user\" title=\"user\"><font color=\"#262626\">.</color><input name=\"name\" type=\"text\" size=\"2\"><input class=\"formbutton\" type=\"submit\" value=\"Suchen\"></form></li>";
 
var CBier = "<a>Limo trinken:</a><li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Bier\"><input id=\"Bier\" type=\"hidden\" value=\"0.35\" /><input type=\"hidden\" name=\"promille\" value=\"35\" /><input type=\"hidden\" name=\"id\" value=\"1\" /><img src=\"http://media.pennergame.de/img/inventar/Bier.png\" alt=\"Bier\" title=\"Bier\" /><font color=\"#262626\">.</color><input id=\"menge_Bier\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbier+" /><input id=\"drink_Bier\" type=\"submit\" value=\"Trinken\"/></form></li>";
 
var CBrot = "<a>Brot essen:</a><li><form method=\"post\" action=\"/stock/foodstuffs/use/\"><input type=\"hidden\" name=\"item\" value=\"Brot\"><input id=\"Brot\" type=\"hidden\" value=\"-0.35\" /><input type=\"hidden\" name=\"promille\" value=\"-35\" /><input type=\"hidden\" name=\"id\" value=\"2\" /><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/inventar/Brot.png\" alt=\"Brot\" title=\"Brot\" /><font color=\"#262626\">.</color><input id=\"menge_Brot\" type=\"text\" size=\"1\" name=\"menge\" value="+Benoetigtbrot+" /><input id=\"drink_Brot\" type=\"submit\" value=\"Essen\" /></form></li></ul></div></span>";

var CAdminlog = "<li><a href=\"/gang/admin/log/\" alt=\"Adminlog\" title= \"Adminlog\">Adminlog</a>";


var CAktionen = "<li><a href=\"/activities/bottle/\" alt=\"Aktionen\" title=\"Aktionen\">Aktionen</a></li>";


//var CKasse = "<a>Geld einzahlen:</a><li><tr align=\"left\" valign=\"top\"><td width=\"2\">Euro:</td><td width=\"2\"><input name=\"f_money\" type=\"text\" id=\"f_money\"></td></tr><tr align=\"left\" valign=\"top\"><td>Kommentar:</td><td><input name=\"f_comment\" type=\"text\" id=\"f_comment\" maxlength=\"40\"></td></tr><tr align=\"left\" valign=\"top\"><td colspan=\"2\"><br><form method=\"post\" action=\"/gang/credit/?Submit=Einzahlen\"><input type=\"submit\" name=\"Submit\" value=\"Einzahlen\"></form></td></tr><li>"


// Hier wird der Kurs bei ueber/gleich 16ct rot gefaerbt
if (kurs <= 16) {
 var CFlaschen = "<a href=\"/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\">Pfandflaschen <small>("+kurs+"ct)</small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}
else {
 var CFlaschen = "<a href=\"/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\">Pfandflaschen <small>(<small><span style=\"color:#FF0000; border-bottom:1px dashed #FF0000;\">"+kurs+"ct</span></small>)</small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
}

var Linkkette = ""+ CTitle + CNachrichtenIn + CNachrichtenOut + CFriends + CBande + CMember + CKasse + CForum +CAdmin + CAdminlog + CBandenprofil + CProfil + CHigh + CHigher + CSpenden + CWaschen + CPlunder + CAktionen + CFlaschen + CSuchen + CBier + CBrot +""


// Hier wird nun das Menue gebildet
document.getElementById("footer").innerHTML += "<span style=\"position:fixed;top:10px;left:4px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:0.8;opacity:0.8;border:1px solid #000000; background-color:#313131\"><div class=\"content\" style=\"padding-top:20px\"><ul><ul>"+Linkkette+"</ul></div></span>";
}})
}})
}})