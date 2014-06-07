// ==UserScript==
// @name           Last fight sender zur shoutbox und Forum mit 36 Stunden Wartezeit anzeige bumrise.com mit mehr infos ( MIT OHNE ATT SENDER) B und H
// Version         1.2
// @namespace      by basti1012 bearbeitet für bumrise.com by dartchecker777  (visit http://pennerhack.forren-city.de)
// @description    fügt hinter den letzen fights Buttons zum angreifen ein und mehr infos und shoutbox / Forum senden ein ( version mit und ohne att sender )
// @include        http://*bumrise.com/fight/*
// @exclude		   http://*.bumrise.com/fight/fightlog/*
// ==/UserScript==
// Dieses Script ist Copyright by basti1012 wem es nicht gefallen tut der muss es ja nicht benutzen
//
//		Hilfe:
//		Mit deise Version des Scripts ist es auch möglisch die last Fights in einem Forum Topic einzufügen 
//		Das ganze kann für Berlin und Hamburg unabhängig eingestellt werden.
//		Das heißt ihr könnt z.B. in Berlin ganz normal in die Soutbox senden.
//		Aber in Hamburg z.B. In ein Forum in dem ihr die Kampfberichte sammelt.
//
//		Install:
//		-	 Ganz einfach unten die 2. Link für addurl Hamburg und 1. addurl Link für Berlin anpassen
//		-	(Für ein Forum benötigt ihr diesen URL /gang/forum/newpost/000000/ Bei den 0en einfach die ForumID eintragen)
//		-	(Für dei Shoutbox muss nur dieser Link unten drinen stehen /gang/chat/add/) STANDARTEINSTELLUNG
//		-	Speichern
//		-	Installieren
//		-	Fertig
//



// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www")>=0) {
var pgurl = "http://www.bumrise.com"
var medialink = "http://static.pennergame.de"
var addurl = "/gang/chat/add/"
}
// Linkadressen fuer pennergame ohne www
if (url.indexOf("http://bumrise.com")>=0) {
var pgurl = "http://bumrise.com"
var medialink = "http://static.pennergame.de"
var addurl = "/gang/chat/add/"
}

function br(){document.write("<br>");}

var table = document.getElementsByTagName('table')[1];
var tr = table.getElementsByTagName('tr')[0];
var th = document.createElement('th');
tr.setAttribute('style', 'background-color:#232323 ');
th.innerHTML = '<table class="list" border="0" width="80"> &nbsp;&nbsp; 36 Stunden</table>';

tr.insertBefore(th,tr.getElementsByTagName('th')[3]);
var t = document.getElementsByTagName('table')[1];
var r = t.getElementsByTagName('tr');
for (a = 1; a < r.length - 1; a++){



var table = document.getElementsByTagName("table")[1];
var info = table.getElementsByTagName("tr")[a];
var id = info.innerHTML.split('/">')[2].split('</a>')[0];

	var data = r[a].getElementsByTagName('td')[1];
	var dzien = data.innerHTML.split('.')[0];
	var miesiac = data.innerHTML.split('.')[1];
	var godzina = data.innerHTML.split('.')[2].split(':')[0];
	var minuty = data.innerHTML.split('.')[2].split(':')[1];
	
	dzien = dzien * 1;
	miesiac = miesiac * 1;
	godzina = godzina * 1;
	minuty = minuty * 1;
	godzina += 36;

	while (godzina >= 24){
		godzina = godzina - 24;
		dzien++;
		if ((miesiac == 1) && (dzien == 32)) {miesiac = 2; dzien = 1; }
		if ((miesiac == 2) && (dzien == 29)) {miesiac = 3; dzien = 1; }
		if ((miesiac == 3) && (dzien == 32)) {miesiac = 4; dzien = 1; }
		if ((miesiac == 4) && (dzien == 31)) {miesiac = 5; dzien = 1; }
		if ((miesiac == 5) && (dzien == 32)) {miesiac = 6; dzien = 1; }
		if ((miesiac == 6) && (dzien == 31)) {miesiac = 7; dzien = 1; }
		if ((miesiac == 7) && (dzien == 32)) {miesiac = 8; dzien = 1; }
		if ((miesiac == 8) && (dzien == 32)) {miesiac = 9; dzien = 1; }
		if ((miesiac == 9) && (dzien == 31)) {miesiac = 10; dzien = 1; }
		if ((miesiac == 10) && (dzien == 32)) {miesiac = 11; dzien = 1; }
		if ((miesiac == 11) && (dzien == 31)) {miesiac = 12; dzien = 1; }
		if ((miesiac == 12) && (dzien == 32)) {miesiac = 1; dzien = 1; }		
	}
	if (dzien < 10) {dzien = '0' + dzien;}
	if (miesiac < 10) {miesiac = '0' + miesiac;}
	if (godzina < 10) {godzina = '0' + godzina;}
	if (minuty	 < 10) {minuty = '0' + minuty;}
	var nowa_data = '<font color="">&nbsp;' + dzien + '.' + miesiac + ' ' + godzina + ':' + minuty + '</font>';
	//r[a].getElementsByTagName('td')[4].innerHTML += nowa_data;
	
var td = document.createElement('td');
var tr = table.getElementsByTagName('tr');
td.innerHTML = '<table class="list" border="0" width="120">'+nowa_data+'</table>';
tr[a].insertBefore(td,tr[a].getElementsByTagName('td')[5]);

var tra = table.getElementsByTagName('tr')[a];
var tdd = tra.getElementsByTagName('td')[1];
}

wechseln(0);

var wert = document.getElementsByTagName("table")[1];

var newspana12 = document.createElement("td");
newspana12.setAttribute('id', 'news_blaa12');
newspana12.setAttribute('style', 'background-color:#232323');
var navigation = wert.getElementsByTagName("tr")[0];
navigation.appendChild(newspana12);
document.getElementById('news_blaa12').innerHTML = '<strong>Fight </strong>';

var newspana1 = document.createElement("td");
newspana1.setAttribute('id', 'news_blaa1');
newspana1.setAttribute('style', 'background-color:#232323');
var navigatio = wert.getElementsByTagName("tr")[0];
navigatio.appendChild(newspana1);
document.getElementById('news_blaa1').innerHTML = '<strong> Mit Att:</strong>';

var newspana = document.createElement("td");
newspana.setAttribute('id', 'news_blaa');
newspana.setAttribute('style', 'background-color:#232323');
var navigati = wert.getElementsByTagName("tr")[0];
navigati.appendChild(newspana);
document.getElementById('news_blaa').innerHTML = '<strong> ohne Att:</strong>';

var newspan = document.createElement("td");
newspan.setAttribute('id', 'news_bla');
newspan.setAttribute('style', 'background-color:#232323');
var navigat = wert.getElementsByTagName("tr")[0];
navigat.appendChild(newspan);
document.getElementById('news_bla').innerHTML = '<strong>[Info]</strong>';


function wechseln(f){
	if(f < 15){
		var table = document.getElementsByTagName("table")[1];
		var info_id = table.getElementsByTagName("tr")[f+1];
		var info_id1 = table.getElementsByTagName("tr")[f+1];
	
		var id = info_id.innerHTML.split('/">')[2].split('</a>')[0];
		var fightid = info_id.innerHTML.split('<td><a href="')[1].split('"><img')[0];

	
		info_id.innerHTML +='<a href="'+pgurl+'/fight/?to='+id+'"><img src="'+medialink+'/img/pv4/icons/att.png" width="16" height="16"</a>';
		info_id1.innerHTML +='<input type="button"  name="gang_friend'+f+'"  value="Mit'+f+'"><input type="button"  name="friend'+f+'"  value="Ohne'+f+'">';
		scannen(fightid, f);
	}
}

function scannen(fightid, f){
	GM_xmlhttpRequest({
		method:"GET",
		url: pgurl+fightid,
		onload:function(responseDetails) {
			content = responseDetails.responseText;
			var minimal1 = content.split('<div class="listshop">')[1];
			var minimala1a = minimal1.split('<div class="menubarright">')[0];


var infoatt = document.getElementsByTagName("tr")[2];
var infodef = document.getElementsByTagName("tr")[3];
var ida = infoatt.innerHTML.split('<td width="419">')[1].split('<a class')[0];
var id1 = infodef.innerHTML.split('<td>')[2].split('<a class')[0];
//var r_punkte = content.split('<span class="el1">Punkte:</span><span class="el2">')[1].split('</span>')[0];

var table = document.getElementsByTagName("table")[1];
var info = table.getElementsByTagName("tr")[f+1];
var id = info.innerHTML.split('<a href="/')[2].split('/">')[0];
var name = info.innerHTML.split('/">')[2].split('</a>')[0];
var nurid = info.innerHTML.split('href="/profil/id:')[1].split('/">')[0];
var geld = info.innerHTML.split('<td>')[4].split('</td>')[0];
var punkte = info.innerHTML.split(/<td>\s*/)[5].split(/\s*</)[0];
var datum = info.innerHTML.split('<td>')[2].split('</td>')[0];


	GM_xmlhttpRequest({
    	method: 'GET',
   		url: ''+pgurl+'/dev/api/user.' + nurid + '.xml',
		onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

		var id = dom.getElementsByTagName('id')[0].textContent;
		var namee = dom.getElementsByTagName('name')[0].textContent;
try{

		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
}catch(e){
var cash = 'Deaktiviert';
}

		var points = dom.getElementsByTagName('points')[0].textContent;
		var position = dom.getElementsByTagName('position')[0].textContent;
		var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
		var city = dom.getElementsByTagName('city')[0].textContent;
		var reg_since = dom.getElementsByTagName('reg_since')[0].textContent;
//banden info aus user api
try{
		var idbande = dom.getElementsByTagName('id')[1].textContent;
		var namebande = dom.getElementsByTagName('name')[1].textContent;
		var status = dom.getElementsByTagName('status')[0].textContent;
		var joined = dom.getElementsByTagName('joined')[0].textContent;

}catch(e){
var idbandeh = 'Error';
var nameh = 'Error';
var statush = 'Error';
var joinedh = 'Error';
}

var table = document.getElementsByTagName("table")[1];
var info_idf = table.getElementsByTagName("tr")[f+1];
info_idf.innerHTML +='<a class="tooltip" href="/gang/">[?]<span>'

+'<font style=\"color:green; font-size:120%;\"><b>Pennerid:</b></font><font style=\"color:red; font-size:120%;\"><b>'+id+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Pennername:</b></font><font style=\"color:red; font-size:120%;\"><b>'+namee+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Geld:</b></font><font style=\"color:red; font-size:120%;\"><b>'+cash+' &euro; </b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Punkte:</b></font><font style=\"color:red; font-size:120%;\"><b>'+points+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Platz:</b></font><font style=\"color:red; font-size:120%;\"><b>'+position+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Rankingpunkte:</b></font><font style=\"color:red; font-size:120%;\"><b>'+rankingpoints+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Wohnt in Stadt:</b></font><font style=\"color:red; font-size:120%;\"><b>'+city+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Reg-Datum:</b></font><font style=\"color:red; font-size:120%;\"><b>'+reg_since+'</b></font><br>'
+'<font style=\"color:yellow; font-size:140%;\"><b>Bandeninfos</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Bandenname:</b></font><font style=\"color:red; font-size:120%;\"><b>'+namebande+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Bandenid:</b></font><font style=\"color:red; font-size:120%;\"><b>'+idbande+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Status:</b></font><font style=\"color:red; font-size:120%;\"><b>'+status+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Bande erstelt an:</b></font><font style=\"color:red; font-size:120%;\"><b>'+joined+'</b></font><br>'
+'</span></a>';

var minimala1 = "[big][b]Meine Att: "+ida+" und Def: "+id1+".[/b][/big] \n Fight am:[b]"+datum+"[/b] Gegen:[b][url="+pgurl+"/profil/id:"+id+"/]"+name+"[/url][/b] \n Gesamt Punkte des Gegners: [b]"+points+"[/b] Registriert seit: [b]"+reg_since+"[/b] \n Bande des Gegners: [b][url="+pgurl+"/profil/bande:"+idbande+"/]"+namebande+"[/url][/b] \n \n [big][b][u]Beute:[/u][/b][/big] \n Geld:[b]"+geld+"[/b] Punkte:[b]"+punkte+"[/b] \n [big][b]Spieler angreifen: [/big][/b][url="+pgurl+"/fight/?to="+name+"][img]"+medialink+"/img/pv4/icons/att.png[/img][/url] ";

document.getElementsByName('gang_friend'+f)[0].addEventListener('click', function note(){
GM_xmlhttpRequest({
	method: 'POST',
	url: ''+pgurl+''+addurl+'',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: encodeURI('f_text='+minimala1+'&Submit=Abschicken'),
	onload: function(responseDetails)
				{
			location.reload();alert("Fight Daten "+f+" An Shoutbox gesendet\nGesendeter Text:\n"+minimala1+"");
		}
	});
},false); 

var mini = "Fight am:[b]"+datum+"[/b] Gegen:[b][url="+pgurl+"/profil/id:"+id+"/]"+name+"[/url][/b] \n Gesamt Punkte des Gegners: [b]"+points+"[/b] Registriert seit: [b]"+reg_since+"[/b] \n Bande des Gegners: [b][url="+pgurl+"/profil/bande:"+idbande+"/]"+namebande+"[/url][/b] \n \n [big][b][u]Beute:[/u][/b][/big] \n Geld:[b]"+geld+"[/b] Punkte:[b]"+punkte+"[/b] \n [big][b]Spieler angreifen: [/big][/b][url="+pgurl+"/fight/?to="+name+"][img]"+medialink+"/img/pv4/icons/att.png[/img][/url] ";

document.getElementsByName('friend'+f)[0].addEventListener('click', function note(){
GM_xmlhttpRequest({
	method: 'POST',
	url: ''+pgurl+''+addurl+'',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: encodeURI('f_text='+mini+'&Submit=Abschicken'),
	onload: function(responseDetails)
				{
			location.reload();alert("Fight Daten "+f+" An Shoutbox gesendet\nGesendeter Text:\n"+mini+"");
		}
	});
},false); 
		wechseln(f+1);
		}
	});
}});
}
//?berarbeitet und Hilfestellung von NewMan