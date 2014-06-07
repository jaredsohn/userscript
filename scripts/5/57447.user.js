// ==UserScript==
// @name           Super Highscore Geld und Reg bande online faketier plunder  suche alle Pennergame clodogame menelgame dossergame und co by basti1012
// @namespace      sucht gegner nach geld oder nach regdatuim und gegner nach punkte in kombination mit geld und regdatum suche 
// @author         Basti1012
// @include        http://*berlin.pennergame.de/fight/overview/*
// @exclude        http://*berlin.pennergame.de/highscore/gang/*
// @include        http://*pennergame.de/fight/overview/*
// @exclude        http://*pennergame.de/highscore/gang/*
// @include        http://*dossergame.co.uk/fight/overview/*
// @exclude        http://*dossergame.co.uk/highscore/gang/*
// @include        http://*menelgame.pl/fight/overview/*
// @exclude        http://*menelgame.pl/highscore/gang/*
// @include        http://*clodogame.fr/fight/overview/*
// @exclude        http://*clodogame.fr/highscore/gang/*
// @include        http://*mendigogame.es/fight/overview/*
// @exclude        http://*mendigogame.es/highscore/gang/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
//1
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://pennergame")>=0) {
var link = "http://pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var siglink = 'http://img.dossergame.co.uk';
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
var siglink = 'http://img.menelgame.pl';
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
var siglink = 'http://img.clodogame.fr';
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var siglink = 'http://img.mendigogame.es';
}
var i = GM_getValue("i");
if (i == null){
i = '1';
GM_setValue("i" , i);
};
var Blinktext4 = '<font style=\"color:red; font-size:300%;\"><b>Suche beendet</b></font>';
var Blinktext3 = '<font style=\"color:green; font-size:300%;\"><b>Bitte warten suche l&auml;uft..</b></font>';
var Blinktext = '<font style=\"color:red; font-size:150%;\"><b>Suche beendet</b></font>';

document.getElementsByClassName('content')[0].innerHTML =
'<ul>'+
'<li><a href="/fight/overview/" alt="Kampf" title="Kampf">Kampf</a></li>'+
'<li><a href="/fight/pet/" alt="Haustierk&auml;mpfe" title="Haustierk&auml;mpfe">Haustierk&auml;mpfe</a>'+
'<li></li>'+
'<li><a name="PennergameSpam1" id="PennergameSpam1" alt="Pennergame Spam" title="Pennergame Spam" style="height: 263px;font-size:14px;"><b>Gegner nach Regdatum suchen<br>Gegner nach Geld suchen<br>Gegner nach Punkte suche<br>Gegner nach Tiere suchen<br>Gegner nach onlinestatus suchen <br>Gegner nach banden suchen <br></b></a></li>'+
'</ul>';

document.getElementById('PennergameSpam1').addEventListener('click', function linktklickerone() {

var anleitung = '<span style=\"color:yellow; font-size:150%;\"><b><strong>Such Beschreibung</strong></b></span><br>'
+'<span style=\"color:green; font-size:120%;\"><b>Suchangaben</b></span>'
+'<span style=\"color:yellow; font-size:110%;\"><b>Ab den Datum:</b></span>Zeigt Gegner an die sich vor dem Datum angemdet sind'
+'<span style=\"color:yellow; font-size:110%;\"><b>Vor dem Datum:</b></span>Zeigt Gegner die sich nach den Datum angemeldet sind'
+'<span style=\"color:yellow; font-size:110%;\"><b>Das gleiche Datum:</b></span>Zeigt Gegner an die sich am gleichen Tag angemeldet haben'
+'<span style=\"color:yellow; font-size:110%;\"><b>Nur Geld suchen:</b></span>Reg-Datum suche ist ausgeschaltet und suche nach Geld ist an '
+'<span style=\"color:yellow; font-size:110%;\"><b>Datumsangabe:</b></span>Hier wird das datum eingestellt f&ual;die Reg-datum suche.'
+'<span style=\"color:yellow; font-size:110%;\"><b>Geldangabe:</b></span>Hier stellt ihr das minimum Geld ein ab wann gesucht werden soll'
+'<span style=\"color:yellow; font-size:110%;\"><b>Onlinesuche:</b></span>Hier entscheidest du ob gegner die Online oder offline sein sollen.'
+'<span style=\"color:yellow; font-size:110%;\"><b>Bandensuche:</b></span>Nur gegner mit oder ohne Bande anzeigen'
+'<span style=\"color:yellow; font-size:110%;\"><b>Tiersuche:</b></span>Suche nach Spezielen Tiere oder alle Tiere.'

+'<span style=\"color:yellow; font-size:110%;\"><b>Plundersuche:</b></span>Zeigt nur Gegner an die ihr Plunder in Profil aktiviert haben .'
+'<span style=\"color:yellow; font-size:110%;\"><b>Faketiersuche:</b></span>Sucht nur Gegner die fake (Premium) Tiere haben .'


+'<span style=\"color:green; font-size:110%;\"><b>Die 6 Angaben muss bei jeder suche angegeben werden </b></span>'
+'<span style=\"color:yellow; font-size:110%;\"><b>Min-Punkte:</b></span> Minimal Punkte ab wann gesucht werden soll.'
+'<span style=\"color:yellow; font-size:110%;\"><b>Max-Punkte:</b></span> Maximal punkte bis wo gesucht werden soll.'
+'<span style=\"color:yellow; font-size:110%;\"><b>Menge:</b></span> Hier gibt ihr die seiten an die durchsucht werden sollen '

+'Pennergame hat ja immer mehrere seiten die man durchsuchen kann'
+'Hier gibt ihr zb 5 an und es werden 5 highscoreseiten durchsucht'
+'5 seiten sind ca 100 penner ,jenachdem wie schnell euer Pc ist '
+'k&ouml;nnt ihr die Zahl erh&ouml;hen oder niedriger stellen ,'
+'ich empfehle 5,kann aber jeder so machen wie er will '
+'Nach Punkte suchen = Ihr gibt euren Punkte von bis an wo gesucht '
+'werden soll und es werden dann auf der Highscoreliste die Penner '
+'angezeigt die in den Punkte Bereich liegen .'
+'Alle penner die in den Punkte reg oder Geld bereich sind werden aufgelistet,'
+'Die suche Stopt bei 100 prozent und dann wenn er die Seite erreicht hat,'
+'Wo ihr den menge bereich angegebe habt <br>'
+'<span style=\"color:red; font-size:130%;\"><b>Tier und online suche nur Hamburg und Berlin zur zeit </b></span><br>'

+'<br><strong>Mfg basti1012</strong><br><font style=\"color:white; font-size:100%;\"><b><div align="left" name="testi" id="testi"></div></b></font>';

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
//Suchangabe :
var suchangaben = '<select id="suchera" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="1">Ab den Datum</option>'
+'<option value="2">Vor dem Datum</option>'
+'<option value="3">Das Gleiche Datum</option>'
+'<option value="0">Nur Geldsuche </option>'
+'<option value="5">Gegner mit Tiere suchen</option>'
+'<option value="6">Gegner mit oder ohne Bande suchen</option>'
+'<option value="7">Gegner die online oder offline sind</option>'
+'<option value="8">Gegner mit Plunder suchen</option>'
+'<option value="9">Gegner mit Fake Tieren suchen</option>'

+'</select><br>';


var Datumsangaben = 'Gegner nach Regestrierungs Datum suchen :<select id="jahr" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="2007">2007</option>'
+'<option value="2008">2008</option>'
+'<option value="2009">2009</option>'
+'<option value="2010">2010</option>'
+'<option value="2011">2011</option>'
+'</select>'

+'<select id="monat" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="01">Januar</option>'
+'<option value="02">Februar</option>'
+'<option value="03">M&auml;rz</option>'
+'<option value="04">April</option>'
+'<option value="05">Mai</option>'
+'<option value="06">Juni</option>'
+'<option value="07">Juli</option>'
+'<option value="08">August</option>'
+'<option value="09">September</option>'
+'<option value="10">Oktober</option>'
+'<option value="11">November</option>'
+'<option value="12">Dezember</option>'
+'</select>'

+'<select id="tag" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="01">1</option>'
+'<option value="02">2</option>'
+'<option value="03">3</option>'
+'<option value="04">4</option>'
+'<option value="05">5</option>'
+'<option value="06">6</option>'
+'<option value="07">7</option>'
+'<option value="08">8</option>'
+'<option value="09">9</option>'
+'<option value="10">10</option>'
+'<option value="11">11</option>'
+'<option value="12">12</option>'
+'<option value="13">13</option>'
+'<option value="14">14</option>'
+'<option value="15">15</option>'
+'<option value="16">16</option>'
+'<option value="17">17</option>'
+'<option value="18">18</option>'
+'<option value="19">19</option>'
+'<option value="20">20</option>'
+'<option value="21">21</option>'
+'<option value="22">22</option>'
+'<option value="23">23</option>'
+'<option value="24">24</option>'
+'<option value="25">25</option>'
+'<option value="26">26</option>'
+'<option value="27">27</option>'
+'<option value="28">28</option>'
+'<option value="29">29</option>'
+'<option value="30">30</option>'
+'<option value="31">31</option>'
+'</select><br>';

var hutausend ='<select id="hutau" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option>'
+'<option value="7">7</option>'
+'<option value="8">8</option>'
+'<option value="9">9</option>'
+'</select>';

var zehntausend ='<select id="zehntau" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option>'
+'<option value="7">7</option>'
+'<option value="8">8</option>'
+'<option value="9">9</option>'
+'</select>';

var tausend ='<select id="tausend" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option>'
+'<option value="7">7</option>'
+'<option value="8">8</option>'
+'<option value="9">9</option>'
+'</select>';

var hunni ='<select id="hundert" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option>'
+'<option value="7">7</option>'
+'<option value="8">8</option>'
+'<option value="9">9</option>'
+'</select>';

var zehner ='<select id="zehn" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option>'
+'<option value="7">7</option>'
+'<option value="8">8</option>'
+'<option value="9">9</option>'
+'</select>';

var einer ='<select id="einzeln" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option>'
+'<option value="7">7</option>'
+'<option value="8">8</option>'
+'<option value="9">9</option>'
+'</select>';


var bandi ='<select id="bandensuche" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="32">Gegner ohne Bande</option>'
+'<option value="21">Gegner mit Bande</option>'
+'</select>';


var onoff ='<select id="onoffsuche" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="33">Gegner die online sind</option>'
+'<option value="44">Gegner die offline sind</option>'
+'</select>';


var tieri ='<select id="tiersuche" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="111111">Alle tiere</option>'
+'<option value="16342">Braunb&auml;r</option>'
+'<option value="73526">Dino</option>'
+'<option value="96242">Elch</option>'
+'<option value="37551">Waschb&auml;r</option>'
+'<option value="83290">Leopard	</option>'
+'<option value="13323">Riesenschildkr&ouml;te</option>'
+'<option value="99624">Kamel</option>'
+'<option value="88643">Tapir</option>'
+'<option value="85242">Zebra</option>'
+'<option value="32563">Mops</option>'
+'<option value="48256">Border Collie</option>'
+'<option value="98641">Dogge</option>'
+'<option value="28463">Golden Retriver</option>'
+'<option value="64133">Habicht	</option>'
+'<option value="76538">Yorkshire Terrier</option>'	
+'<option value="18540">Moorschnucke</option>'
+'<option value="65384">Bisamratte</option>'
+'<option value="94652">Schneeeule</option>'
+'<option value="47838">Hausschwein</option>'
+'<option value="11743">Igel</option>'
+'<option value="11634">Streifenh&ouml;rnchen</option>'
+'<option value="66294">Opossum	</option>'
+'<option value="11542">M&ouml;we</option>'	
+'<option value="01743">Erdm&auml;nnchen</option>'
+'<option value="02634">Clownfisch</option>'
+'<option value="92653">Rotkehlchen</option>'
+'<option value="75284">Grasfrosch</option>'     
+'<option value="48264">Silberfisch</option>'
+'</select>';

var one = suchangaben+Datumsangaben;
var tree ='Gegner mit oder ohne Bande suchen :'+bandi+'<br>Auswahl welches Tier du suchen wilst: '+tieri+'<br>Gegner die online oder offline sind :'+onoff+'<br>';
var two = 'Mindest Angabe wGeld des Gegners: '+hutausend+zehntausend+tausend+'.'+hunni+zehner+einer+' Euro suchen.<br>';

var knopfe ='Min-Punkte f&uaml;r gezielte suche:<input name="min_points" id="min_points" maxlength="8" size="4" value="'+GM_getValue("attmin")+'" type="text" /><br>'
+'Max-Punkte f&uaml;r gezielte suche:<input id="max_points" name="max_points" maxlength="8" size="4" value="'+GM_getValue("attmax")+'" type="text" /><br> '
+'Menge der Seiten die durchsucht werden sollen (5):<input id="menge" name="menge" maxlength="2" size="2" value="'+GM_getValue("menge")+'" type="text" /><br> '
+'<input type="button" id="geldsucher" name="geldsucher" value="gegner mit euren Einstellungen suchen " /><br>'
+'<input type="button" id="punkte" name="punkte" value="Gegner nach Punkte Suchen" /><br>'
+'<div align="left" name="wasgeht" id="wasgeht"></div>';

var inhalt = '<div class="settingpoint"><table border="0" cellspacing="0" cellpadding="0">'
+'<td width="500" height="70"><tr>'
+'<div align="left" name="sbalki" id="sbalki"></div><br><div align="left" name="sbalkia" id="sbalkia"></div>'
+''+one+''+tree+''+two+''+knopfe+'</div></td></tr>';

var butener1q =document.getElementById('content');
var tr = butener1q.getElementsByTagName('table')[0];
tr.innerHTML = ''+anleitung+''+inhalt+'<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
+'<th scope="col" align="left" width="20">E--</th>'
+'<th scope="col" align="left" bgcolor="#272727" width="50">Platz</th>'
+'<th scope="col" align="left" bgcolor="#272727" width="70">Punkte</th>'
+'<th align="right" width="100">Regdatum</th>'
+'<th align="left" width="50">SMS</th>'
+'<th align="center" width="50">FIGHT</th> '
+'<th scope="col" align="left" bgcolor="#272727" width="80">Geld:</th>'
+'<th align="center" width="200">Name</th>'
+'<th align="center" width="140">Bande</th>'
+'<th align="center" width="80">Tier</th>'
+'<th align="center" width="10">On</th>'
+'<th align="center" width="20">Plu</th>'
+'</tr>' ;





document.getElementById('punkte').addEventListener('click', function linktklickerone() {
		var max = document.getElementById('max_points').value;
		var min = document.getElementById('min_points').value;
		window.location.href = ''+link+'/highscore/range/?max_points='+max+'&min_points='+min+'';
		alert("Suche Penner in den Punktebereich von \nMin:"+min+"\nMax:"+max+"");
},false);

document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
var max = document.getElementById('max_points').value;
var min = document.getElementById('min_points').value;
var menge = document.getElementById('menge').value;
var jahrr = document.getElementById('jahr').value;
var monatt = document.getElementById('monat').value;
var tagg = document.getElementById('tag').value;
var sucherr = document.getElementById('suchera').value;	



var bande1 = document.getElementById('bandensuche').value;
var tier1 = document.getElementById('tiersuche').value;
var onoff1 = document.getElementById('onoffsuche').value;

		
var ht1 = document.getElementById('hutau').value;
var zt1 = document.getElementById('zehntau').value;
var et1 = document.getElementById('tausend').value;
var hu1 = document.getElementById('hundert').value;
var ze1 = document.getElementById('zehn').value;
var ei1 = document.getElementById('einzeln').value;
var geldsuchere =ht1+zt1+et1+hu1+ze1+ei1;
GM_setValue("geldsuchere" , geldsuchere);	

var suchangabe = jahrr+monatt+tagg;
GM_setValue("suchangabe" , suchangabe);
GM_setValue("sucherr" , sucherr);
GM_setValue("menge" , menge);
k=0;
x=1;
ee=1;
nochmal(x,k,ee);

		function nochmal(x,k,ee){
			var menge = GM_getValue("menge");
				if(i<=Number(menge)){
					if(x<=19){
					var insgesamt = menge*19;
					o=insgesamt;
					auf100 = 100/o;
					l=k+Number(1);
					
			var prozi = Math.round((auf100*l)*10)/10
			var balki = Math.round((prozi*3)*10)/10
			document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; ['+prozi+'%] Suche bei '+k+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balki+'px;"></div></div>';
			i = GM_getValue("i");
					GM_xmlhttpRequest({
       						method: 'GET',
            					 url: ''+link+'/highscore/range/'+i+'/?max_points='+max+'&min_points='+min+'',
            					 //url: ''+link+'/highscore/range/'+i+'/?max_points=11111&min_points=1111',
             			 			onload: function(responseDetails) {
            			 			var content = responseDetails.responseText;
							var table = content.split('class="settingpoint2')[1];
							var table1 = table.split('</table>')[0];
							var feld = table1.split('class="zeileB">')[x];
							var feld1 = feld.split('</tr>')[0];
							var id = feld1.split('<a href="/profil/id:')[1];
							var id2 = id.split('/')[0];
							k++;

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
var regm = reg.split('.')[1];
var regmm = regm.split('.')[0];
var regj = reg.split('.')[2];
var tage = reg.split('.')[0];
var suchergebnis = regj+regmm+tage;





try{
var cash = dom.getElementsByTagName('cash')[0].textContent/100;
}catch(e){
cash='Deaktiviert';
}

try{
var bande = dom.getElementsByTagName('name')[1].textContent;
var bandeid = dom.getElementsByTagName('id')[1].textContent;
var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
}catch(e){
var bandeergebniss = '---';
}



GM_xmlhttpRequest({
method: 'GET',
url: ''+link+'/profil/id:'+id+'/',
onload: function(responseDetails) {
var profil = responseDetails.responseText;


// --------------------Onlne offline suchen -----------------------------------------
var suche = profil.search("Ist gerade Online");
if (suche != -1) {
var onlinebaby="<img src='http://media.pennergame.de/img/on.gif'></img>";
}
else {
var onlinebaby="<img src='http://media.pennergame.de/img/off.gif'></img>";
}

// ---------------------gelseinstellungen geld suche -----------------------------------

if (cash <= 111111){
farbe1 = "black";}
if (cash <= 99999){
var farbe1 = "gray";}
if (cash <= 77777){
farbe1 = "blue";}
if (cash <= 66666){
var farbe1 = "cyan";}
if (cash <= 55555){
farbe1 = "red";}
if (cash <= 44444){
var farbe1 = "green";}
if (cash <= 33333){
farbe1 = "magenta";}
if (cash <= 22222){
farbe1 = "orange";}
if (cash <= 11111){
var farbe1 = "yellow";}
if (cash <= 1111){
var farbe1 = "white";}
// -------------------------------------farb einselluneg reg suche --------------------
if (suchergebnis <= 20080301){
farbe = "blue";}else
if (suchergebnis <= 20080701){
var farbe = "cyan";}else
if (suchergebnis <= 20081201){
farbe = "red";}else
if (suchergebnis <= 20090101){
var farbe = "green";}else
if (suchergebnis <= 20090401){
farbe = "magenta";}else
if (suchergebnis <= 20090901){
farbe = "orange";}else
if (suchergebnis <= 20091201){
var farbe = "yellow";}

// -----------------------------------------------tiere spliten ------------------------
var profil = responseDetails.responseText;
try{
var table = profil.split('<strong>Penner, weil</strong></td>')[1];
var table1 = table.split('Auszeichnungen')[0];
var table2 = table1.split('<img src="http://mediaberlin.pennergame.de/img/tiere/')[1];
var table3 = table2.split('.jpg">')[0];
}catch(e){
var table3 = 'no';
}
// ----------------plunder spliten ----------------------------------------------------
try{
var table = profil.split('id="item_main_tooltip"')[1];
var table2 = table.split('</table>')[0];
var feld = table2.split('<td width="4%">')[1];
var plunder = feld.split('</td>')[0];
}catch(e){
var plunder = 'no';
}
// --------------------------------------------------ab hier ist if kram abfrage ab wie und wo suchen -------
var cashangabe =GM_getValue("geldsuchere");
var sucher =GM_getValue("sucherr");
var suchergebnisa =GM_getValue("suchangabe");


// -----------------------------suche nache einzeltiere mit bestimmten namen und ids --------------------------




if(sucher == 5){

document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche Gegner mit diesen tier '+tier1+'</b></font>';

var profil = responseDetails.responseText;
try{
var table = profil.split('<strong>Penner, weil</strong></td>')[1];
var table1 = table.split('Auszeichnungen')[0];
var table2 = table1.split('<img src="http://mediaberlin.pennergame.de/img/tiere/')[1];
var table3 = table2.split('.jpg">')[0];
}catch(e){}

if(table3 == tier1){


		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>' 
			+'<th align="center" width="20"></th></tr>'
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;	
	}
// ----------------------------------- suche nach allen tiere -------------------------------------------


if(tier1 == 111111){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche Gegner mit allen tiere</b></font>';

            	var profil = responseDetails.responseText;
try{
		var table = profil.split('<strong>Penner, weil</strong></td>')[1];
		var table1 = table.split('Auszeichnungen')[0];
		var table2 = table1.split('<img src="http://mediaberlin.pennergame.de/img/tiere/')[1];
		var table3 = table2.split('.jpg">')[0];

		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>'
			+'<th align="center" width="20"></th></tr>' 
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;	

}catch(e){
var table3 = 'no';
}
}
}



// --------------------------------------------------------------   suche nach geld ---------------------------------
if(sucher == 0){
if(cash>Number(cashangabe)){					
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche nach Gegner nach Geld minimum '+cashangabe+' &euro;</b></font>';

		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>' 
			+'<th align="center" width="20"></th></tr>'
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			+'</tr></tr></tbody></table>';
			ee++;	
		}	
}
 // --------------------------------------- suche nach gegener die vor den datum angemeldet sind -----------------

if(sucher == 1){
if(Number(suchergebnisa)<Number(suchergebnis)){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche nach Gegner die ab dem '+tagg+'.'+monatt+'.'+jahrr+' Angemeldet sind</b></font>';

		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>'
			+'<th align="center" width="20"></th></tr>' 
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;	
		}
}			
// -----------------------------------------------gegner die nach den angemeldet sind ----------------------------
if(sucher == 2){
if(Number(suchergebnisa)>Number(suchergebnis)){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche nach Gegner die vor dem '+tagg+'.'+monatt+'.'+jahrr+' Angemeldet sind</b></font>';

		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>'
			+'<th align="center" width="20"></th></tr>' 
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;	
		}
}
// -----------------------------------------gegner die gleich des datums angemeldet sin d --------------------
if(sucher == 3){
if(Number(suchergebnisa)==Number(suchergebnis)){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche nach Gegner die sich am '+tagg+'.'+monatt+'.'+jahrr+' Angemeldet haben</b></font>';
		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>' 
			+'<th align="center" width="20"></th></tr>'
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;	
		}
}

// ---------------------------------------gegner die online sind -------------------------------------------
if(sucher == 7){
if(onoff1==33){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche Gegner die online sind</b></font>';

var suche = profil.search("Ist gerade Online");
if (suche != -1) {

		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>'
			+'<th align="center" width="20"></th></tr>' 
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;	
}
else {}
}


// -----------------------------------------GWGNWR DIE OFLINE SINDE D
if(onoff1==44){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche Gegner die offline sind</b></font>';

var suche = profil.search("Ist gerade Online");
if (suche != -1) {
}
else {
	tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>' 
			+'<th align="center" width="20"></th></tr>'
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;	
}
}
}

// -------------------------------------suche nach gegener ohhne bande ------------------------------------          
if(sucher == 6){
if(bande1==32){

document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche nach Gegner ohne Bande</b></font>';

var bandeida = dom.getElementsByTagName('id')[1].textContent;
if(bandeida == 0){				
		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>' 
			+'<th align="center" width="20"></th></tr>'
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">Keine bande</td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			+'</tr></tr></tbody></table>';
			ee++;
}
}
if(bande1==21){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche nach Gegner mit Bande</b></font>';

var bandea = dom.getElementsByTagName('name')[1].textContent;
var bandeida = dom.getElementsByTagName('id')[1].textContent;
	if(bandeida != 0){			
		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>'
			+'<th align="center" width="20"></th></tr>'
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center"><a href="/profil/bande:'+bandeida+'/" style="text-decoration: none;">'+bandea+'</a></td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			+'</tr></tr></tbody></table>';
			ee++;
}
}
}

















if(sucher == 8){




	GM_xmlhttpRequest({
       		method: 'GET',
            	url: ''+link+'/profil/id:'+id2+'/',
             			 onload: function(responseDetails) {
            			 var content2 = responseDetails.responseText;
try{
				var table2 = content2.split('id="item_main_tooltip"')[1];
				var table22 = table2.split('</table>')[0];
				var feld2 = table22.split('<td width="4%">')[1];
				var plunder2 = feld2.split('</td>')[0];


document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche Gegner die Plunder aktiviert haben</b></font>';



		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>' 
			+'<th align="center" width="20"></th></tr>' 
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center"><a href="/profil/bande:'+bandeida+'/" style="text-decoration: none;">'+bandea+'</a></td>'
			+'<td align="left" valign="bottom">'+table3+'</td>'
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder2+'</td>'
			+'</tr></tr></tbody></table>';
			ee++;


}catch(e){
var plunder2 = 'no plunder';
}




}});
}





if(sucher == 9){
document.getElementsByName('wasgeht')[0].innerHTML = '<span style=\"color:yellow; font-size:150%;\"><b>Suche Gegner mit Fake tieren (premium tiere )</b></font>';

var suche = profil.search("selbsterstelltes Haustier");
if (suche != -1) {
var tiertable = profil.split('<strong>&nbsp;Punkte</strong>')[1];
var tiertablew = tiertable.split('href="/premium/">')[0];
var tierfak = tiertablew.split('<img src="')[1];
var tier = tierfak.split('"')[0];


var welchestier = profil.split('Basiswerten von <b>')[1];
var welchestiera = welchestier.split('</b>')[0];

		tr.innerHTML += '<table class="list" border="1" width="860"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="20"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="200"></th>'
			+'<th align="left" width="140"></th>'
			+'<th align="center" width="80"></th> '
			+'<th align="center" width="10"></th>' 
			+'<th align="center" width="20"></th></tr>'
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+reg+'</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
			+'<td align="left" valign="bottom"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="center"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'<td align="center">'+bandeergebniss+'</td>'
			+'<td align="left" valign="bottom"><img src="'+tier+'height="52" width="52"></img>'+welchestiera+''
			+'<td align="left" valign="bottom">'+onlinebaby+'</td>'
			+'<td align="left" valign="bottom">'+plunder+'</td>'
			ee++;

}
else {}
}

//<img src="'+tierfake1+'height="22" width="22"></img>



                     

			x++;
			nochmal(x,k,ee);
			}
		});
	}
});
			    }});
}else{
x=1;
i++;

		document.getElementsByName('testi')[0].innerHTML = '<blink><span id="blink">'+Blinktext3+' Scanne Seite '+i+'</span></blink>';
GM_setValue("i" , i);
		nochmal(x,k,ee);
		}
		}else{

		document.getElementsByName('testi')[0].innerHTML = Blinktext4;
		document.getElementsByName('sbalkia')[0].innerHTML =  Blinktext;
		ff=ee-1;

		tr.innerHTML += '<table class="list" border="1" width="740"><tbody><tr bgcolor="#272727"><th scope="col" align="left" width="90"></th>'
		+'<th scope="col" align="left" bgcolor="#272727" width="50"></th><th scope="col" align="left" bgcolor="#272727" width="120"></th><th align="left" width="100"></th><th align="left" width="50"></th><th align="center" width="50"></th> <th align="center" width="80"></th><th align="center" width="200"></th> </tr>' 
		+'<tr bgcolor="red"><tr class="zeileB"><td align="left" valign="bottom"><strong>Ende</strong></td>'
		+'<td align="left" valign="bottom"><a href="http//www.penerhack.foren-city.de">Mehr scripte hier</a></td>'
		+'<td align="left" valign="bottom"></td><td align="left" valign="bottom"><font style=\"color:yellow; font-size:100%;\"><b>'+ff+'</b></font> Gegner gefunden</td>'
		+'<td align="left" valign="bottom"><a href="http//www.penerhack.foren-city.de"><img src="http://thx.spacequadrat.de/Smileys/sarcasmics/tongue.gif" border="0" height="33" width="33"></a> </td>'
		+'<td align="left" valign="bottom"><a href="http//www.penerhack.foren-city.de""><img src="http://thx.spacequadrat.de/Smileys/sarcasmics/tongue.gif" border="0" height="33" width="33"></a> </td></tr></tr></tbody></table>';

		GM_deleteValue("i");
		}
	}
},false);
},false);

