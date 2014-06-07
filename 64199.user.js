// ==UserScript==
// @name               Nach Geld suche - Hamburg / Berlin / Muenchen PG 4.0 abgespeckte Version
// @description    Mit diesem Script kannst du Gegner nach Geld und nach Punkten suchen.  Fügt auf der Highscoreseite einen neuen Menüpunkt ein. UPDATE Muenchen.
// @namespace    Basti1012 umsortiet und gefixt by niceguy0815 (visit http://pennerhack.forren-city.de)
// @version            2.3.4 Halloween update Ohne Tiere!!!
// @version            2.3.3 Malle update
// @version            2.3.2 Tiger Werte in Muenchen gefixt
// @version            2.3.1 Neue Updatefunktion prueft alle 24h, Tierupdate für Muenchen (jetzt fast komplett), kleiner Geschlechts fix. ACHTUN BITTE VORGÄNGERVERSION MANUEL AUS GM LOESCHEN!!!
// @version            2.2.0
// @include            *www.pennergame.de/highscore/*
// @include            *berlin.pennergame.de/highscore/*
// @include            *muenchen.pennergame.de/highscore/*
// ==/UserScript==



// ***********************************************************************************************
// ***********************************************************************************************
//--------------Update Funktion by Sageo----natuerlich mit seiner Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "2.3.4";
var THISSCRIPTNAME = "Nach Geld suche - Hamburg / Berlin / Muenchen PG 4.0 abgespeckte Version";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/64199';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/64199.user.js'; // Skript-URL bei userscripts.org

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = "";
	var month = "";
	var day = "";

	year = DateToFormat.getFullYear();
	month = DateToFormat.getMonth() + 1;
	month = "0" + month;
	if (month.length == 3) { 
		month = month.substr(1,2);
	}
	day = "0" + DateToFormat.getDate();
	if (day.length == 3) {
		day = day.substr(1,2);
	}

	return year + "-" + month + "-" + day;
}


// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion �berpr�ft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
// Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate() {
	// Aktuelles Tagesdatum erzeugen und formatieren
	var today = new Date();
	var tagesdatum = FormatDate(today);

	// Wenn heute noch nicht nach einem Skript-Update gesucht wurde	
	if (GM_getValue("LastScriptUpdateCheck","") != tagesdatum) {
		// Abrufen der Skriptseite von userscripts.org
		GM_xmlhttpRequest({
			method: 'GET', 
			url: THISSCRIPTINSTALL_URL, 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
								
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlie&szlig;end durchgef&uuml;hrt werden.\n\nHinweis: Die &uuml;berpr&uuml;fung auf neue Versionen wird nur einmal pro Tag durchgef&uuml;hrt."

					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu erm&ouml;glichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgef&uuml;hrt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

CheckForUpdate();

// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende----------------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************



var statics = 'http://static.pennergame.de/img/pv4/'
var ATT = '<img src="'+statics+'icons/att.png" height="15" width="15"></img>';
var DEF = '<img src="'+statics+'icons/def.png" height="15" width="15"></img>';
var DEX = '<img src="'+statics+'icons/mitleid.png" height="15" width="15"></img>';
var staticlink = "http://static.pennergame.de/img/pv4/shop/"

var url = document.location.href;
if (url.indexOf("http://www")>=0) {
var staticsnra = 9;
var staticsnrb = 10;
var link = "http://www.pennergame.de"
var siglink = 'http://inodes.pennergame.de/de_DE/signaturen/'
var medialink = "http://media.pennergame.de"

}
if (url.indexOf("http://berlin")>=0) {
var staticsnra = 9;
var staticsnrb = 10;
var link = "http://berlin.pennergame.de"
var siglink = 'http://inodes.pennergame.de/bl_DE/signaturen/'
var medialink = "http://mediaberlin.pennergame.de"

}
if (url.indexOf("http://muenchen")>=0) {
var staticsnra = 8;
var staticsnrb = 9;
var link = "http://muenchen.pennergame.de"
var siglink = 'http://inodes.pennergame.de/mu_DE/signaturen/'
var medialink = "http://mediamuenchen.pennergame.de"

}

if (url.indexOf("http://halloween")>=0) {
var staticsnra = 8;
var staticsnrb = 9;
var link = "http://halloween.pennergame.de"
var siglink = ''
var medialink = "http://mediahalloween.pennergame.de"

}
var table = document.getElementById('nav-2');
table.innerHTML += '<li><a name="PennergameSpam1" id="PennergameSpam1" alt="PennergameSpam1" title="Pennergame Spam" <span class="btn-right"><span class="btn-left"><b>Nach Geld suchen</b></span></span></a></li>';
document.getElementById('PennergameSpam1').addEventListener('click', function linktklickerone() {

var anleitung = '<div align="left" name="sbalki" id="sbalki"></div>';

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/fight/overview/',
			onload: function( response ) {
				var lf = response.responseText;
				var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
				var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];
        			hs2 = Math.round(attmin*1.25/3);
				GM_setValue("attmax" , attmax);
				GM_setValue("attmin" , attmin);
				GM_setValue("money" , hs2);
						}
			});

var knopfe ='<span align=\"left\" style=\"color:yellow;\">Suchmethode w&auml;hlen </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<left><select id="wassuche"  name="wassuche">'
+'<option value="5">Suche Geld</option>'
+'<option value="2">Suche online</option>'
+'<option value="4">Suche offline </option>'
+'<option value="1">Suche männliche </option>'
+'<option value="3">Suche weiblichen</option>'
//+'<option value="11">1.1</option>'
//+'<option value="12">1.2</option>'
//+'<option value="13">1.3</option>'
//+'<option value="14">1.4</option>'
//+'<option value="15">1.5</option>'
//+'<option value="16">1.6</option>'
//+'<option value="17">1.7</option>'
//+'<option value="18">1.8</option>'
//+'<option value="19">1.9</option>'
//+'<option value="20">2.0</option>'
+'</select><br>'
+'Min-Punkte:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="min_points" id="min_points" maxlength="11" size="7" value="'+GM_getValue("attmin")+'" type="text" /><br>'
+'Max-Punkte:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="max_points" name="max_points" maxlength="11" size="7" value="'+GM_getValue("attmax")+'" type="text" /><br> '
+'Geldangabe:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="geld" name="geld" maxlength="11" size="7" value="'+GM_getValue("geld")+'" type="text" /><br> '
+'Menge der Suchseiten (5):&nbsp;&nbsp;&nbsp;<input id="menge" name="menge" maxlength="3" size="4" value="'+GM_getValue("menge")+'" type="text" /><br> '
+'<input type="button" id="geldsucher" name="geldsucher" value="gegner mit euren Einstellungen suchen " /><br>'
+'<div align="left" name="wasgeht" id="wasgeht"></div>';

var inhalt = '<div class="settingpoint"><table border="0" cellspacing="0" cellpadding="0">'
+'<td width="600"><tr>'
+'<div align="left" name="sbalki" id="sbalki"></div><br><div align="left" name="sbalkia" id="sbalkia"></div>'
+''+knopfe+'</div></td></tr>';

var tr = document.getElementsByClassName('zrelative sitdown')[0];
	tr.innerHTML = ''+anleitung+''+inhalt+'<table class="list" border="0" width="960"><tbody><tr bgcolor="#272727">'
	+'<th align="center" width="30">Id</th>'
	+'<th align="center" width="80">Geld</th>'
	+'<th align="center" width="140">Profillink</th>'
	+'<th align="center" width="140">Bandenlink</th>'
	+'<th align="center" width="100">Tier</th>'
	+'<th align="center" width="90">Stadt</th>'
	+'<th align="center" width="70">Reg</th>'
	+'<th align="center" width="60">Punkte</th>'
	+'<th align="center" width="60">Platz</th>'
	+'<th align="center" width="90">Status</th>'
	+'<th align="center" width="40">Promille</th>'
	+'<th align="center" width="15"><img src="http://static.pennergame.de/img/pv4/icons/att.png" width="16" height="16"></th>'
	+'<th align="center" width="15"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif"></th>'
	+'<th align="center" width="15">g</th>'
	+'<th align="center" width="15">o</th>'
	+'</tr>' ;
document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
	  var menge = document.getElementById('menge').value;
	  var max = document.getElementById('max_points').value;
	  var min = document.getElementById('min_points').value;
	  var geld = document.getElementById('geld').value;
	  var wassuche = document.getElementById('wassuche').value;
	GM_setValue("wassuche" , wassuche);
	GM_setValue("max" , max);
	GM_setValue("min" , min);
	GM_setValue("menge" , menge);
	GM_setValue("geld" , geld);
	x=1;
	i=1;
	z=1;
	seitenwahl(x,i,z);
},false);

function seitenwahl(x,i,z){
	var mengea = GM_getValue("menge");
		if(i<=Number(mengea)){
		i++;
		anfang(x,i,z);
	}else{
document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:green; font-size:10%;\"><b>Suche Abgeschlossen!!!</b></font>';
	}
}


function anfang(x,i,z){

	var max = GM_getValue("max");
	var min = GM_getValue("min");
	var menge = GM_getValue("menge");
	var geld = GM_getValue("geld");

document.getElementsByName('wasgeht')[0].innerHTML = '<font style=\"color:red; font-size:14px;\"><b>Suche inerhalb Min: '+min+' Max: '+max+' Punkte .Nach minimum Geld: '+geld+' &euro; durchsuche '+menge+' Seiten.</b></font>';

	GM_xmlhttpRequest({
       		method: 'GET',
            	url: ''+link+'/highscore/user/'+i+'/?max='+max+'&min='+min+'',
             			onload: function(responseDetails) {
            			 var content = responseDetails.responseText;
					for (var x = 1; x<=20; x++){
						if(x>=20){
						seitenwahl(x,i,z);
					}
				var table = content.split('id="stadtteil"><div>Stadtteil</div>')[1];
				var table1 = table.split('<div id="pagination">')[0];
				var feld = table1.split('class="col1')[x];
				var feld1 = feld.split('</tr>')[0];
				var id = feld1.split('<a href="/profil/id:')[1];
				var id2 = id.split('/')[0];
				z++;
				var mengea = GM_getValue("menge");
			var prozi2 = Math.round(mengea*20)
			GM_setValue("prozi2" , prozi2);
			var prozi1 = Math.round((100/prozi2)*10)/10
			var prozi = Math.round(prozi1*z)
			var balki = Math.round(prozi*3)
document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; ['+prozi+'%] Suche bei '+z+' von '+prozi2+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balki+'px;"></div></div>';
mitte(id2,x,z);
		}
	}});
}

function mitte(id2,x,z){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/dev/api/user.'+id2+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var nam = dom.getElementsByTagName('name')[0].textContent;
			var id = dom.getElementsByTagName('id')[0].textContent;
			var platz = dom.getElementsByTagName('position')[0].textContent;
			var punkte = dom.getElementsByTagName('points')[0].textContent;
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;

				try{
					var cash = dom.getElementsByTagName('cash')[0].textContent/100;
				}catch(e){
					cash='- - -';
				}

				try{
					var bande = dom.getElementsByTagName('name')[1].textContent;
					var bandeid = dom.getElementsByTagName('id')[1].textContent;
					var status = dom.getElementsByTagName('status')[0].textContent;
					var joined = dom.getElementsByTagName('joined')[0].textContent;
					var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
				}catch(e){
				var bandeergebniss = '- - -';
				}
        if (status==3) {
       	var statu = '<img src="'+staticlink+'de_DE/bande/admin.gif"><font style=\"color:blue; font-size:100%;\"><b>Admin</b></font>';
        }
        else if (status==2) {
        var statu = '<img src="'+staticlink+'de_DE/bande/coadmin.gif"><font style=\"color:orange; font-size:100%;\"><b>Co-Admin</font>';
        }
        else if (status==1) {
        var statu = '<img src="'+staticlink+'de_DE/bande/member.gif"><font style=\"color:grey; font-size:100%;\"><b>Mitglied</font>';
        }
        else if (status==0) {
        var statu = 'No Bande';
};
	try{
		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
		var promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>';
	}catch(e){
		var promille = '- - -';
	}

var fight ='<a href="/fight/?to='+nam+'"><img src="http://static.pennergame.de/img/pv4/icons/att.png" width="16" height="16"</a>';
var sms ='<a href="/messages/write/?to='+id+'"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif"</a>';

if (cash <= 500000){
farbe1 = "#FFFFFF";}
if (cash <= 300000){
var farbe1 = "white";}
if (cash <= 250000){
farbe1 = "white";}
if (cash <= 200000){
var farbe1 = "white";}
if (cash <= 150000){
farbe1 = "white";}
if (cash <= 100000){
var farbe1 = "white";}
if (cash <= 50000){
farbe1 = "white";}
if (cash <= 25000){
farbe1 = "white";}
if (cash <= 10000){
var farbe1 = "white";}
if (cash <= 5000){
var farbe1 = "white";}

GM_xmlhttpRequest({
method: 'GET',
url: ''+link+'/profil/id:' + id + '/',
onload: function(responseDetails) {
			var content = responseDetails.responseText;
			var suche = content.search("Ist gerade Online");
			try{
			if (suche != -1) {
			var online2a = "<img src='http://static.pennergame.de/img/pv4/icons/on.png'></img>";
var on = '1';
			}
			else {
			var online2a = "<img src='http://i48.tinypic.com/n33d4w.png'></img>";
var on = '2';
			};
			}catch(e){
			var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
			}


try{
    var hausi5a = content.split('margin-top:12px;">')[1];
    var hausi3a = hausi5a.split('</div>')[0];

    var hausi4a = hausi3a.split('<img src="')[1];
    var hausi2a = hausi4a.split('"')[0];

//		Tiere Hamburg
	  if(hausi2a == ''+statics+'shop/de_DE/tiere/00001.jpg'){var petname2  = "Kakerlake";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/68930.jpg'){var petname2  = "Goldfisch";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/11836.jpg'){var petname2  = "Maus";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/73308.jpg'){var petname2  = "Hamster";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/52483.jpg'){var petname2  = "Wellensittich";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/31451.jpg'){var petname2  = "Taube";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/73684.jpg'){var petname2  = "Ratte [HH]";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/77310.jpg'){var petname2  = "Hase";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/21903.jpg'){var petname2  = "Frettchen";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/73735.jpg'){var petname2  = "Katze [HH]";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/89386.jpg'){var petname2  = "Falke";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/61402.jpg'){var petname2  = "Schlange";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/62474.jpg'){var petname2  = "Hausziege";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/12758.jpg'){var petname2  = "Pudel";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/48263.jpg'){var petname2  = "Adler";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/09051.jpg'){var petname2  = "Sch&auml;ferhund";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/15240.jpg'){var petname2  = "Pitbull";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/62456.jpg'){var petname2  = "Cockerspaniel";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/32563.jpg'){var petname2  = "Chihuahua";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/90385.jpg'){var petname2  = "Pferd";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/98962.jpg'){var petname2  = "Giraffe [HH]";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/64220.jpg'){var petname2  = "Nilpferd";}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/73953.jpg'){var petname2 = 'Krokodil [MU]';}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/43703.jpg'){var petname2 = 'Tiger [HH]';}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/12536.jpg'){var petname2 = '&Auml;ffchen';}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/25834.jpg'){var petname2 = 'Nashorn';}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/94826.jpg'){var petname2 = 'Elefant';}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/14896.jpg'){var petname2 = 'Eisb&auml;r';}
	  else if(hausi2a == ''+statics+'shop/de_DE/tiere/73933.jpg'){var petname2  = "Dressierte Maus";}


// 		Tiere Berlin	  
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/48264.jpg'){var petname2  = "Silberfisch";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/75284.jpg'){var petname2  = "Grasfrosch";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/92653.jpg'){var petname2  = "Rotkelchen";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/02634.jpg'){var petname2  = "Clownfisch";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/01743.jpg'){var petname2  = "Erdm&auml;nnchen";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/11542.jpg'){var petname2  = "M&ouml;we";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/66294.jpg'){var petname2  = "Opossum";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/11634.jpg'){var petname2  = "Streifenh&ouml;rnchen";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/11743.jpg'){var petname2  = "Igel";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/47838.jpg'){var petname2  = "Hausschwein";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/94652.jpg'){var petname2  = "Schneeeule";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/65384.jpg'){var petname2  = "Bisamratte [BL]";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/18540.jpg'){var petname2  = "Moorschnucke";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/76538.jpg'){var petname2  = "Yorkshire Terrier";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/64133.jpg'){var petname2  = "Habicht";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/48256.jpg'){var petname2  = "Collie";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/98641.jpg'){var petname2  = "Dogge";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/28463.jpg'){var petname2  = "Golden Retriever";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/32563.jpg'){var petname2  = "Mops";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/96242.jpg'){var petname2  = "Elch";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/85242.jpg'){var petname2  = "Zebra";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/99624.jpg'){var petname2  = "Kamel";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/13323.jpg'){var petname2  = "Schnappschildkr&ouml;te";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/83290.jpg'){var petname2  = "Leopard";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/37551.jpg'){var petname2  = "Waschb&auml;r";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/16342.jpg'){var petname2  = "Berliner-B&auml;r";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/88643.jpg'){var petname2  = "Tapir";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/73526.jpg'){var petname2  = "T-Rex";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/31337.jpg'){var petname2  = "Ph&ouml;nix";}
		else if(hausi2a == ''+statics+'shop/bl_DE/tiere/73933.jpg'){var petname2  = "Dressierte Maus";}


//		Tiere München		
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/s1.jpg'){var petname2  = "Premium-Spatz";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/00001.jpg'){var petname2  = "L&auml;use";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/68930.jpg'){var petname2  = "Schabe";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/11836.jpg'){var petname2  = "Hendl";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/73308.jpg'){var petname2  = "Ratte [MU]";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/52483.jpg'){var petname2  = "Zebramangusten";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/31451.jpg'){var petname2  = "Taube";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/73684.jpg'){var petname2  = "Emsen";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/77310.jpg'){var petname2  = "Schneehase";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/21903.jpg'){var petname2  = "Erdhenne";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/73735.jpg'){var petname2  = "Katze [MU]";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/89386.jpg'){var petname2  = "Steinadler";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/61402.jpg'){var petname2  = "Wolpertinger";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/62474.jpg'){var petname2  = "Mufflon";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/12758.jpg'){var petname2  = "Zamperl";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/48263.jpg'){var petname2  = "Oachkatzl";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/09051.jpg'){var petname2  = "G&auml;mse";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/15240.jpg'){var petname2  = "Facke";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/62456.jpg'){var petname2  = "Bisamratte [MU]";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/32563.jpg'){var petname2  = "Gartenschl&auml;fer";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/90385.jpg'){var petname2  = "Elwetritsch";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/98962.jpg'){var petname2  = "Giraffe [MU]";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/64220.jpg'){var petname2  = "Seel&ouml;we";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/73953.jpg'){var petname2  = "Krokodil [MU]";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/43703.jpg'){var petname2  = "Tiger [MU]";}	
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/12536.jpg'){var petname2  = "Affe";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/25834.jpg'){var petname2  = "Nashorn [MU]";}	
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/94826.jpg'){var petname2  = "Elefant [MU]";}	
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/14896.jpg'){var petname2  = "Eisb&auml;r [MU]";}
		else if(hausi2a == ''+statics+'shop/mu_DE/tiere/73933.jpg'){var petname2  = "Dressierte Maus";}



//		Tierwerte Hamburg
		if(petname2 == 'Kakerlake'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Kakerlake:</b></font><br><img src="'+statics+'shop/de_DE/tiere/00001.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 0 '+DEF+' 0 '+DEX+' 0 ';}
		else if(petname2 == 'Goldfisch'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Goldfisch:</b></font><br><img src="'+statics+'shop/de_DE/tiere/68930.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 1 '+DEF+' 1 '+DEX+' 1 ';}
		else if(petname2 == 'Maus'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Maus:</b></font><br><img src="'+statics+'shop/de_DE/tiere/11836.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 2 '+DEF+' 3 '+DEX+' 7 ';}
		else if(petname2 == 'Hamster'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Hamster:</b></font><br><img src="'+statics+'shop/de_DE/tiere/73308.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 5 '+DEF+' 4 '+DEX+' 12 ';}
		else if(petname2 == 'Wellensittich'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Wellensittich:</b></font><br><img src="'+statics+'shop/de_DE/tiere/52483.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 7 '+DEF+' 5 '+DEX+' 16 ';}
		else if(petname2 == 'Taube'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Taube:</b></font><br><img src="'+statics+'shop/de_DE/tiere/31451.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 8 '+DEF+' 3 '+DEX+' 1 ';}
		else if(petname2 == 'Ratte [HH]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Ratte [HH]:</b></font><br><img src="'+statics+'shop/de_DE/tiere/73684.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 10 '+DEF+' 5 '+DEX+' 0 ';}
		else if(petname2 == 'Hase'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Hase:</b></font><br><img src="'+statics+'shop/de_DE/tiere/77310.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 13 '+DEF+' 10 '+DEX+' 17 ';}
		else if(petname2 == 'Frettchen'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Frettchen:</b></font><br><img src="'+statics+'shop/de_DE/tiere/21903.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 18 '+DEF+' 15 '+DEX+' 19 ';}
		else if(petname2 == 'Katze [HH]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Katze [HH]:</b></font><br><img src="'+statics+'shop/de_DE/tiere/73735.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 25 '+DEF+' 20 '+DEX+' 32 ';}
		else if(petname2 == 'Falke'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Falke:</b></font><br><img src="'+statics+'shop/de_DE/tiere/89386.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 27 '+DEF+' 25 '+DEX+' 22 ';}
		else if(petname2 == 'Schlange'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Schlange:</b></font><br><img src="'+statics+'shop/de_DE/tiere/61402.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 44 '+DEF+' 38 '+DEX+' 10 ';}
		else if(petname2 == 'Hausziege'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Hausziege:</b></font><br><img src="'+statics+'shop/de_DE/tiere/62474.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 36 '+DEF+' 40 '+DEX+' 21 ';}
		else if(petname2 == 'Pudel'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Pudel:</b></font><br><img src="'+statics+'shop/de_DE/tiere/12758.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 28 '+DEF+' 29 '+DEX+' 62 ';}
		else if(petname2 == 'Adler'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Adler:</b></font><br><img src="'+statics+'shop/de_DE/tiere/48263.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 39 '+DEF+' 41 '+DEX+' 38 ';}
		else if(petname2 == 'Sch&auml;ferhund'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Sch&auml;ferhund:</b></font><br><img src="'+statics+'shop/de_DE/tiere/09051.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 55 '+DEF+' 45 '+DEX+' 43 ';}
		else if(petname2 == 'Pitbull'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Pitbull:</b></font><br><img src="'+statics+'shop/de_DE/tiere/15240.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 65 '+DEF+' 59 '+DEX+' 1 ';}
		else if(petname2 == 'Cockerspaniel'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Cockerspaniel:</b></font><br><img src="'+statics+'shop/de_DE/tiere/62456.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 59 '+DEF+' 40 '+DEX+' 56 ';}
		else if(petname2 == 'Chihuahua'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Chihuahua:</b></font><br><img src="'+statics+'shop/de_DE/tiere/32563.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 32 '+DEF+' 28 '+DEX+' 133 ';}
		else if(petname2 == 'Pferd'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Pferd:</b></font><br><img src="'+statics+'shop/de_DE/tiere/90385.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 62 '+DEF+' 69 '+DEX+' 80 ';}
		else if(petname2 == 'Giraffe [HH]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Giraffe  [HH]:</b></font><br><img src="'+statics+'shop/de_DE/tiere/98962.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 71 '+DEF+' 82 '+DEX+' 98 ';}
		else if(petname2 == 'Nilpferd'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Nilpferd:</b></font><br><img src="'+statics+'shop/de_DE/tiere/64220.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 74 '+DEF+' 89 '+DEX+' 34 ';}
		else if(petname2 == 'Krokodil [HH]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Krokodil [HH]:</b></font><br><img src="'+statics+'shop/de_DE/tiere/73953.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 95 '+DEF+' 75 '+DEX+' 30 ';}
		else if(petname2 == 'Tiger [HH]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Tiger [HH]:</b></font><br><img src="'+statics+'shop/de_DE/tiere/43703.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 136 '+DEF+' 46 '+DEX+' 69 ';}
		else if(petname2 == '&Auml;ffchen'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>&Auml;ffchen:</b></font><br><img src="'+statics+'shop/de_DE/tiere/12536.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 52 '+DEF+' 43 '+DEX+' 230 ';}
		else if(petname2 == 'Nashorn'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Nashorn:</b></font><br><img src="'+statics+'shop/de_DE/tiere/25834.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 100 '+DEF+' 95 '+DEX+' 39 ';}
		else if(petname2 == 'Elefant'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Elefant:</b></font><br><img src="'+statics+'shop/de_DE/tiere/94826.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 110 '+DEF+' 100 '+DEX+' 42 ';}
		else if(petname2 == 'Eisb&auml;r'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Eisb&auml;r:</b></font><br><img src="'+statics+'shop/de_DE/tiere/14896.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 138 '+DEF+' 87 '+DEX+' 64 ';}



//		Tierwerte Berlin
		else if(petname2 == 'Silberfisch'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Silberfisch:</b></font><br><img src="'+statics+'shop/bl_DE/tiere48264.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 0 '+DEF+' 0 '+DEX+' 0 ';}
		else if(petname2 == 'Grasfrosch'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Grasfrosch:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/75284.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 1 '+DEF+' 1 '+DEX+' 1 ';}
		else if(petname2 == 'Rotkehlchen'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Rotkehlchen:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/92653.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 2 '+DEF+' 3 '+DEX+' 7 ';}
		else if(petname2 == 'Clownfisch'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Clownfisch:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/02634.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 5 '+DEF+' 4 '+DEX+' 12 ';}
		else if(petname2 == 'Erdm&auml;nnchen'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Erdm&auml;nnchen:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/01743.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 7 '+DEF+' 5 '+DEX+' 16 ';}
		else if(petname2 == 'M&ouml;we'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>M&ouml;we:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/11542.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 8 '+DEF+' 3 '+DEX+' 1 ';}
		else if(petname2 == 'Opossum'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Opossum:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/66294.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 10 '+DEF+' 5 '+DEX+' 0 ';}
		else if(petname2 == 'Streifenh&ouml;rnchen'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Streifenh&ouml;rnchen:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/11634.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 13 '+DEF+' 10 '+DEX+' 17 ';}
		else if(petname2 == 'Igel'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Igel:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/11743.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 18 '+DEF+' 15 '+DEX+' 19 ';}
		else if(petname2 == 'Hausschwein'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Hausschwein:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/47838.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 25 '+DEF+' 20 '+DEX+' 32 ';}
		else if(petname2 == 'Schneeeule'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Schneeeule:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/94652.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 27 '+DEF+' 25 '+DEX+' 22 ';}
		else if(petname2 == 'Bisamratte [BL]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Bisamratte [BL]:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/65384.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 136 '+DEF+' 46 '+DEX+' 69 ';}
		else if(petname2 == 'Moorschnucke'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Moorschnucke:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/18540.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 36 '+DEF+' 40 '+DEX+' 21 ';}
		else if(petname2 == 'Yorkshire Terrier'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Yorkshire Terrier:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/76538.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 28 '+DEF+' 29 '+DEX+' 62 ';}
		else if(petname2 == 'Habicht'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Habicht:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/64133.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 39 '+DEF+' 41 '+DEX+' 38 ';}
		else if(petname2 == 'Border Collie'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Border Collie:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/48256.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 55 '+DEF+' 45 '+DEX+' 43 ';}
		else if(petname2 == 'Dogge'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Dogge:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/98641.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 65 '+DEF+' 59 '+DEX+' 1 ';}
		else if(petname2 == 'Golden Retriever'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Golden Retriever:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/28463.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 59 '+DEF+' 40 '+DEX+' 56 ';}
		else if(petname2 == 'Mops'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Mops:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/32563.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 32 '+DEF+' 28 '+DEX+' 133 ';}
		else if(petname2 == 'Elch'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Elch:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/96242.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 62 '+DEF+' 69 '+DEX+' 80 ';}
		else if(petname2 == 'Zebra'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Zebra:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/85242.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 71 '+DEF+' 82 '+DEX+' 98 ';}
		else if(petname2 == 'Kamel'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Kamel:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/99624.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 74 '+DEF+' 89 '+DEX+' 34 ';}
		else if(petname2 == 'Schnappschildkr&ouml;te'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Schnappschildkr&ouml;te:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/13323.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 95 '+DEF+' 75 '+DEX+' 30 ';}
		else if(petname2 == 'Leopard'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Leopard:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/83290.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 136 '+DEF+' 46 '+DEX+' 69 ';}
		else if(petname2 == 'Waschb&auml;r'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Waschb&auml;r:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/37551.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 52 '+DEF+' 43 '+DEX+' 230 ';}
		else if(petname2 == 'Tapir'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Tapir:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/88643.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 100 '+DEF+' 95 '+DEX+' 39 ';}
		else if(petname2 == 'T-Rex'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>T-Rex:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/73526.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 110 '+DEF+' 101 '+DEX+' 42 ';}
		else if(petname2 == 'Berliner-B&auml;r'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Berliner-B&auml;r:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/16342.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 138 '+DEF+' 87 '+DEX+' 64 ';}
		else if(petname2 == 'Ph&ouml;nix'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Ph&ouml;nix:</b></font><br><img src="'+statics+'shop/bl_DE/tiere/31337.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 146 '+DEF+' 107 '+DEX+' 95 ';}



//		Tierwerte München
		else if(petname2 == 'Premium-Spatz'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Premium-Spatz:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/s1.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 3 '+DEF+' 3 '+DEX+' 6 ';}
		else if(petname2 == 'L&auml;use'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>L&auml;use:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/00001.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 0 '+DEF+' 0 '+DEX+' 0 ';}
		else if(petname2 == 'Schabe'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Schabe:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/68930.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 1 '+DEF+' 1 '+DEX+' 1 ';}
		else if(petname2 == 'Hendl'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Hendl:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/11836.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 2 '+DEF+' 3 '+DEX+' 7 ';}
		else if(petname2 == 'Ratte [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Ratte [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/73308.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 5 '+DEF+' 4 '+DEX+' 12 ';}
		else if(petname2 == 'Zebramangusten'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Zebramangusten:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/52483.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 7 '+DEF+' 5 '+DEX+' 16 ';}
		else if(petname2 == 'Taube'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Taube:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/31451.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 8 '+DEF+' 3 '+DEX+' 1 ';}
		else if(petname2 == 'Emsen'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Emsen:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/73684.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 10 '+DEF+' 5 '+DEX+' 0 ';}
		else if(petname2 == 'Schneehase'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Schneehase:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/77310.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 13 '+DEF+' 10 '+DEX+' 17 ';}
		else if(petname2 == 'Erdhenne'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Erdhenne:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/21903.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 18 '+DEF+' 15 '+DEX+' 19 ';}
		else if(petname2 == 'Katze [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Katze [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/73735.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 25 '+DEF+' 20 '+DEX+' 32 ';}
		else if(petname2 == 'Steinadler'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Steinadler:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/89386.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 27 '+DEF+' 25 '+DEX+' 22 ';}
		else if(petname2 == 'Wolpertinger'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Wolpertinger:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/61402.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 44 '+DEF+' 38 '+DEX+' 10 ';}
		else if(petname2 == 'Mufflon'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Mufflon:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/62474.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 36 '+DEF+' 40 '+DEX+' 21 ';}
		else if(petname2 == 'Zamperl'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Zamperl:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/12758.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 28 '+DEF+' 29 '+DEX+' 62 ';}
		else if(petname2 == 'Oachkatzl'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Oachkatzl:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/48263.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 39 '+DEF+' 41 '+DEX+' 38 ';}
		else if(petname2 == 'G&auml;mse'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>G&auml;mse:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/09051.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 55 '+DEF+' 44 '+DEX+' 43 ';}
		else if(petname2 == 'Facke'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Facke:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/15240.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 65 '+DEF+' 59 '+DEX+' 1 ';}
		else if(petname2 == 'Bisamratte [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Bisamratte [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/62456.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 59 '+DEF+' 40 '+DEX+' 56 ';}
		else if(petname2 == 'Gartenschl&auml;fer'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Gartenschl&auml;fer:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/32563.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+'33 '+DEF+' 28 '+DEX+' 133 ';}
		else if(petname2 == 'Elwetritsch'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Elwetritsch:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/90385.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 62 '+DEF+' 69 '+DEX+' 80 ';}
		else if(petname2 == 'Giraffe [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Giraffe [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/98962.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 71 '+DEF+' 82 '+DEX+' 98 ';}
		else if(petname2 == 'Seel&ouml;we'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Seel&ouml;we:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/64220.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 74 '+DEF+' 89 '+DEX+' 34 ';}
		else if(petname2 == 'Krokodil [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Krokodil [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/73953.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 95 '+DEF+' 75 '+DEX+' 30 ';}
		else if(petname2 == 'Tiger [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Tiger [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/43703.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 136 '+DEF+' 46 '+DEX+' 69 ';}
		else if(petname2 == 'Affe'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Affe:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/12536.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 52 '+DEF+' 43 '+DEX+' 230 ';}
		else if(petname2 == 'Nashorn[MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Nashorn[MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/25834.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 100 '+DEF+' 95 '+DEX+' 39 ';}
				else if(petname2 == 'Elefant [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Elefant [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/94826.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 110 '+DEF+' 101 '+DEX+' 42 ';}
				else if(petname2 == 'Eisb&auml;r [MU]'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Eisb&auml;r [MU]:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/14896.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 145 '+DEF+' 98 '+DEX+' 51 ';}
		
		else if(petname2 == 'Dressierte Maus'){var tiertooltip2 = '<font style=\"color:yellow; font-size:140%;\"><b>Dressierte Maus:</b></font><br><img src="'+statics+'shop/mu_DE/tiere/73933.jpg" height="100" width="89"></img><br><u><b>Werte:</b></u><br>'+ATT+' 43 '+DEF+' 37 '+DEX+' 253 <br>(Mit Lockfutter gebastelt!)';}
		else {var tiertooltip2 = 'N/A';}
		var tierzusammenbauen2 = '<a class="tooltip"><font style=\"color:yellow; font-size:100%;\">'+petname2+'</font><span style= "width: 140px;"><center>'+tiertooltip2+'</center></span></a>';


//------------------------------------------------------//
// Selbsteerstelltes Haustier ermitteln		//
//----------------------------------------------------//

var suche = content.search("selbsterstelltes Haustier");
if (suche != -1) {


    var hausi55a = content.split('selbsterstelltes Haustier')[2];
    var hausi33a = hausi55a.split('Haustier zu erstellen')[0];
    var hausi555a = hausi33a.split('<b>')[1];
    var hausi33a = hausi555a.split('</b>')[0];


var tierzusammenbauen2 = '<a class="tooltip" href="/itemsale/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33a+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
}
}catch(e){
var petname2 = '<span style="font-size:10px; color:#555555;">N/A</span>';
var tierzusammenbauen2 = '<span style="font-size:10px; color:#555555;">N/A</span>';}

//------------------------------------------------------------------



//-------------------------------------------------------------------------//
// Gelöschte und Verbannte Spieler ermitteln		//
//-----------------------------------------------------------------------//

var suche = content.search("scht oder vom Spiel verbannt");
		try{
			if (suche != -1) {
				  var stadt = '<div><font style=\"font-size:100%; color:yellow;\"><b>gel&ouml;scht / verbannt</b></font></div>';
				var geschpic = ''+statics+'icons/icon-userkick.png';
				var geschpictooltip = 'Gel&ouml;scht oder vom Spiel verbannt!';
//				  tr[x].setAttribute('style', 'background:red;');
				  tr[x].setAttribute('style', 'background-image: url(http://i43.tinypic.com/vgk02b.png);');
				} else {
				
//---------------------------------------//
// Stadtteil ermitteln				//
//-------------------------------------//
				
				var location1 = content.split('td bgcolor="#232323">')[5];
				var stadt = location1.split('</td>')[0];
			};
		}catch(e){var stadt = '<div><font style=\"font-size:100%;\"><b>Premium Profil</b></font></div>';
}


//------------------------------------------------------------------------------------------------------//
// Geschlecht oder angelegter Plunder der sich auf Profiel auswirkt ermitteln			//
//----------------------------------------------------------------------------------------------------//

try { 

var suche = content.search("Neue Nachricht!");
		try{
			if (suche != -1) {
				var geschlecht2 = content.split(''+statics+'')['' + staticsnrb + ''];
				var geschlecht  = geschlecht2.split('"')[0];
				} else {
				var geschlecht2 = content.split(''+statics+'')['' + staticsnra + ''];
				var geschlecht  = geschlecht2.split('"')[0];
			};
		}catch(e){
		
		var geschpic = ''+statics+'icons/icon-userkick.png';
		var geschpictooltip = 'Gel&ouml;scht oder vom Spiel verbannt!';
}

		if(geschlecht == 'icons/female.jpg'){var geschpic = "http://i45.tinypic.com/2ztiu5c.png";}
      else if(geschlecht == 'icons/male.jpg'){var geschpic = "http://i47.tinypic.com/2zz3n86.png";}
	   else if(geschlecht == 'plunder/nikolaus.png'){var geschpic = ""+statics+"plunder/nikolaus.png";}
	   else if(geschlecht == 'plunder/valday.png'){var geschpic = ""+statics+"plunder/valday.png";}
	   else if(geschlecht == 'premiummedia/img/js/swfobject.js'){var geschpic = "http://i48.tinypic.com/16m4w2p.png";}
	  
		  if(geschpic == 'http://i48.tinypic.com/16m4w2p.png'){var geschpictooltip = "Premium Profil";}
		 else if(geschpic == ''+statics+'plunder/nikolaus.png'){var geschpictooltip = "Rote Schleife";}
		 else if(geschpic == ''+statics+'plunder/valday.png'){var geschpictooltip = "Be my Valentine!";}
		 else if(geschpic == 'http://i45.tinypic.com/2ztiu5c.png'){var geschpictooltip = "Frau";}
		 else if(geschpic == 'http://i47.tinypic.com/2zz3n86.png'){var geschpictooltip = "Mann";}
var geschlecht_image = '<div style="display:inline-block;"><img src="'+geschpic+'" height="12" width="12" title="'+geschpictooltip+'"></img></div>';

	} catch(err) {
var geschlecht_image = '<font style=\"color:green; font-size:15px;\"><b>P</b></font>';
var geschpic = "http://i48.tinypic.com/16m4w2p.png";
}





//-------------------------------------------------------------------


var wassuche = GM_getValue("wassuche");


if (wassuche == 5){
var hohe = GM_getValue("geld");
if (cash >= Number(hohe)){

			tr.innerHTML += '<table class="list" border="1" width="960" style=" font-size:"6px";"><tbody><tr  bgcolor="#272727" style="font-size:"6px"">'
			+'<th align="center" width="30">'+z+'</th>'
			+'<th align="center" width="80"><font style=\"color:'+farbe1+'; font-size:90%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" width="140"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" width="140">'+bandeergebniss+'</th>'
			+'<th align="center" width="100">'+tierzusammenbauen2+'</th>'
			+'<th align="center" width="90">'+stadt+'</th>'
			+'<th align="center" width="70">'+reg+'</th>'
			+'<th align="center" width="60">'+punkte+'</th>'
			+'<th align="center" width="60">'+platz+'</th>'
			+'<th align="center" width="90">'+statu+'</th>'
			+'<th align="center" width="40">'+promille+'</th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="15">'+geschlecht_image+'</th>'
			+'<th align="center" width="15">'+online2a+'</th>'
			+'</tr></tbody></table>';
}
}


function ein(x) {
 document.getElementById(x).style.backgroundColor="#FFFF8C";
}

function aus(x) {
 document.getElementById(x).style.backgroundColor="transparent";
}


// ------------------------ online suche ja nein ----------------------------------------------
if (wassuche == 2){
if (on == 1){
			tr.innerHTML += '<table class="list" border="1" width="960"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="30">'+z+'</th>'
			+'<th align="center" width="80"><font style=\"color:'+farbe1+'; font-size:90%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" width="140"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" width="140">'+bandeergebniss+'</th>'
			+'<th align="center" width="100">'+tierzusammenbauen2+'</th>'
			+'<th align="center" width="90">'+stadt+'</th>'
			+'<th align="center" width="70">'+reg+'</th>'
			+'<th align="center" width="60">'+punkte+'</th>'
			+'<th align="center" width="60">'+platz+'</th>'
			+'<th align="center" width="90">'+statu+'</th>'
			+'<th align="center" width="40">'+promille+'</th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="15">'+geschlecht_image+'</th>'
			+'<th align="center" width="15">'+online2a+'</th>'
			+'</tr></tbody></table>';
}
}


if (wassuche == 4){
if (on == 2){
			tr.innerHTML += '<table class="list" border="1" width="960"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="30">'+z+'</th>'
			+'<th align="center" width="80"><font style=\"color:'+farbe1+'; font-size:90%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" width="140"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" width="140">'+bandeergebniss+'</th>'
			+'<th align="center" width="100">'+tierzusammenbauen2+'</th>'
			+'<th align="center" width="90">'+stadt+'</th>'
			+'<th align="center" width="70">'+reg+'</th>'
			+'<th align="center" width="60">'+punkte+'</th>'
			+'<th align="center" width="60">'+platz+'</th>'
			+'<th align="center" width="90">'+statu+'</th>'
			+'<th align="center" width="40">'+promille+'</th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="15">'+geschlecht_image+'</th>'
			+'<th align="center" width="15">'+online2a+'</th>'
			+'</tr></tbody></table>';
}
}


// --------------------------geschlechter suche  mannb frau ------------------------------------------------
//female
//male

if (wassuche == 1){
if (geschlecht == 'male'){
			tr.innerHTML += '<table class="list" border="1" width="960"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="30">'+z+'</th>'
			+'<th align="center" width="80"><font style=\"color:'+farbe1+'; font-size:90%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" width="140"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" width="140">'+bandeergebniss+'</th>'
			+'<th align="center" width="100">'+tierzusammenbauen2+'</th>'
			+'<th align="center" width="90">'+stadt+'</th>'
			+'<th align="center" width="70">'+reg+'</th>'
			+'<th align="center" width="60">'+punkte+'</th>'
			+'<th align="center" width="60">'+platz+'</th>'
			+'<th align="center" width="90">'+statu+'</th>'
			+'<th align="center" width="40">'+promille+'</th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="15">'+geschlecht_image+'</th>'
			+'<th align="center" width="15">'+online2a+'</th>'
			+'</tr></tbody></table>';
}
}

if (wassuche == 3){
if (geschlecht == 'female'){
			tr.innerHTML += '<table class="list" border="1" width="960"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="30">'+z+'</th>'
			+'<th align="center" width="80"><font style=\"color:'+farbe1+'; font-size:90%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" width="140"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" width="140">'+bandeergebniss+'</th>'
			+'<th align="center" width="100">'+tierzusammenbauen2+'</th>'
			+'<th align="center" width="90">'+stadt+'</th>'
			+'<th align="center" width="70">'+reg+'</th>'
			+'<th align="center" width="60">'+punkte+'</th>'
			+'<th align="center" width="60">'+platz+'</th>'
			+'<th align="center" width="90">'+statu+'</th>'
			+'<th align="center" width="40">'+promille+'</th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="15">'+geschlecht_image+'</th>'
			+'<th align="center" width="15">'+online2a+'</th>'
			+'</tr></tbody></table>';
}
}


// -------------------------- suche nach tieren -----------------------------------------
if (wassuche == 6){
if (hausi2a == 'hausi4a'){
			tr.innerHTML += '<table class="list" border="1" width="960"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="30">'+z+'</th>'
			+'<th align="center" width="80"><font style=\"color:'+farbe1+'; font-size:90%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" width="140"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" width="140">'+bandeergebniss+'</th>'
			+'<th align="center" width="100">'+tierzusammenbauen2+'</th>'
			+'<th align="center" width="90">'+stadt+'</th>'
			+'<th align="center" width="70">'+reg+'</th>'
			+'<th align="center" width="60">'+punkte+'</th>'
			+'<th align="center" width="60">'+platz+'</th>'
			+'<th align="center" width="90">'+statu+'</th>'
			+'<th align="center" width="40">'+promille+'</th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="15">'+geschlecht_image+'</th>'
			+'<th align="center" width="15">'+online2a+'</th>'
			+'</tr></tbody></table>';
}
}


var prozi2 = GM_getValue("prozi2" , prozi2);
if(z >= prozi2){
document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:green; font-size:200%;\"><b>Suche Abgeschlossen!!!</b></font>';
}
}});
}});
}
},false);