// ==UserScript==
// @name 		Fight Koenig 3.1 pennergame 4.0 Beta Script zum testen   By Basti1012 und Pennerzone
// @namespace 		http://pennerhack.foren-city.de by basti1012-pennerhack
// @description 	Dieses Script sucht dir aus der Pennergemeinde die Penner raus die an meisten Geld haben .Die suche kann nach Regestrierdatum und Banden Status verfeinert werden .Das Script nutzt die Datenbank von Pennerzone und holt sich eure suchanfrage von der Seite.
// @include 		http://*pennergame.de/fight/overview/*
// ==/UserScript==
// hier bitte eine zahl von 1 - 500 angeben um die menge der angezeigten penner anzugeben 

angezeigte_penner ='150';


// Dieses Script arbeitet mit der Seite Pennerzone zusammen und holt sich die daten fuer eure Suchanfrage von deren Datenbank .
// Das script zeigt das gleiche an wie auf der Pennerzone Seite.
// es gibt nur 2 Vorteile gegenueber der Seite .
// 1 ihr erspart euch das Seiten hin und her wechseln .
// 2 Das Script kann bis zu 500 Penner( geht auch mehr ist aber nur bis 500 Gescriptet) auf einmal anzeigen und so mit braucht ihr bei Pennerzone keine Seiten vor zappen.
// die stadtteil suche und die suche nach fast gleichen Pennernamen habe ich bewust weggelasen,weil das Script soll ja nicht alle Funktionen uebernehmen.
// Wir bedanken uns an Jaybe der uns die Datenbank zur verfuegung stellt und somit die Funktion des Scriptes zu gewaehrleisten .
// Copyright by Basti1012 http://pennerhack.foren-city.de
// copyright Pennerzone by Jaybe visit http://hamburg.pennerzone.de/highscore/


if(angezeigte_penner<=50){
	menge=1;
}else if(angezeigte_penner<=100){
	menge=2;
}else if(angezeigte_penner<=150){
	menge=3;
}else if(angezeigte_penner<=200){
	menge=4;
}else if(angezeigte_penner<=250){
	menge=5;
}else if(angezeigte_penner<=300){
	menge=6;
}else if(angezeigte_penner<=350){
	menge=7;
}else if(angezeigte_penner<=400){
	menge=8;
}else if(angezeigte_penner<=450){
	menge=9;
}else if(angezeigte_penner<=500){
	menge=10;
}


var url = document.location.href;
// linkadresse berlin
if (url.indexOf("berlin.pennergame.de")>=0) {
var siglink = "http://inodes.pennergame.de/bl_DE/signaturen/";
var link = "http://berlin.pennergame.de"
var suchlink = 'http://berlin.pennerzone.de/highscore/';
}
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www.pennergame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.pennergame.de"
var suchlink = 'http://hamburg.pennerzone.de/highscore/';
}
// Linkadressen fuer dossergame
if (url.indexOf("dossergame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.dossergame.co.uk"
var suchlink = 'http://berlin.pennerzone.de/highscore/';
}
// Linkadressen fuer menelgame
if (url.indexOf("menelgame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.menelgame.pl/"
var suchlink = 'http://berlin.pennerzone.de/highscore/';
}
// Linkadressen fuer clodogame
if (url.indexOf("clodogame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.clodogame.fr/"
}
// Linkadressen fuer mendigogame
if (url.indexOf("mendigogame.es")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.mendigogame.es/"
var suchlink = 'http://berlin.pennerzone.de/highscore/';
}
// Linkadressen fuer www.serserionline.com
if (url.indexOf("serserionline.com")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.serserionline.com/"
var suchlink = 'http://berlin.pennerzone.de/highscore/';
}


GM_xmlhttpRequest({
  	method: 'GET',
  	url: ''+link+'/overview/',
      	onload: function( response ) {
      		var content = response.responseText;
		var feld = content.split('<div class="display_punkte">')[1];
		var feld1 = feld.split('</div>')[0];

			try{
				var min2 = feld1.split('min_points=')[1];
				var min1 = min2.split('&')[0];
				var max = Math.round(min1*1.5);
				var min = Math.round(min1*0.8);
			}catch(e){
				var min2 = feld1.split('/headline/')[1];
				var min1 = min2.split('/?size=34"')[0];
				var max = Math.round(min1*1.5);
				var min = Math.round(min1*0.8);
			}


			Tabels =document.getElementsByClassName('settingpoint2')[0];
			var tr = document.getElementById('form1');
			tr.innerHTML += '<br>Hier die Besten Geldbetr&auml;e die es in deinen Punktebereich( Von :<b></b>  Bis :<b></b> gibt .( Bessere findest du nicht ).'
			+'<br> Bande: '
			+'<select name="gang" size="1" title="Auswahl des Bandenstatus">'
			+'<option value="egal" selected>egal</option>'
			+'<option value="nogang" >ohne Bande</option>'
			+'<option value="withgang" >mit Bande</option>'
			+'<option value="withgangadmin" >nur Admin</option>'
			+'<option value="withgangcoadmin" >nur CoAdmin</option>'
			+'<option value="withgangmember" >nur Member</option></select>'
			+'<br>Reg Datum '
			+ 'Von : '
			+'<select name="sDay"><option label="" value=""></option>'
			+'<option label="01" value="1">01</option><option label="02" value="2">02</option><option label="03" value="3">03</option><option label="04" value="4">04</option><option label="05" value="5">05</option><option label="06" value="6">06</option><option label="07" value="7">07</option><option label="08" value="8">08</option><option label="09" value="9">09</option><option label="10" value="10">10</option><option label="11" value="11">11</option><option label="12" value="12">12</option><option label="13" value="13">13</option><option label="14" value="14">14</option><option label="15" value="15">15</option>'
			+'<option label="16" value="16">16</option><option label="17" value="17">17</option><option label="18" value="18">18</option><option label="19" value="19">19</option><option label="20" value="20">20</option><option label="21" value="21">21</option><option label="22" value="22">22</option><option label="23" value="23">23</option><option label="24" value="24">24</option><option label="25" value="25">25</option><option label="26" value="26">26</option><option label="27" value="27">27</option><option label="28" value="28">28</option><option label="29" value="29">29</option><option label="30" value="30">30</option>'
			+'<option label="31" value="31">31</option></select>'
			+'<select name="sMonth"><option label="" value=""></option>'
			+'<option label="Jan" value="01">Jan</option><option label="Feb" value="02">Feb</option><option label="Mar" value="03">Mar</option><option label="Apr" value="04">Apr</option><option label="May" value="05">May</option><option label="Jun" value="06">Jun</option><option label="Jul" value="07">Jul</option><option label="Aug" value="08">Aug</option><option label="Sep" value="09">Sep</option><option label="Oct" value="10">Oct</option><option label="Nov" value="11">Nov</option><option label="Dec" value="12">Dec</option></select>'
			+'<select name="sYear"><option label="" value=""></option><option label="2008" value="2008">2008</option><option label="2009" value="2009">2009</option><option label="2010" value="2010">2010</option><option label="2011" value="2011">2011</option></select>'
			+'Bis'
			+'<select name="eDay"><option label="" value=""></option>'
			+'<option label="01" value="1">01</option><option label="02" value="2">02</option><option label="03" value="3">03</option><option label="04" value="4">04</option><option label="05" value="5">05</option><option label="06" value="6">06</option><option label="07" value="7">07</option><option label="08" value="8">08</option><option label="09" value="9">09</option><option label="10" value="10">10</option><option label="11" value="11">11</option><option label="12" value="12">12</option><option label="13" value="13">13</option><option label="14" value="14">14</option><option label="15" value="15">15</option>'
			+'<option label="16" value="16">16</option><option label="17" value="17">17</option><option label="18" value="18">18</option><option label="19" value="19">19</option><option label="20" value="20">20</option><option label="21" value="21">21</option><option label="22" value="22">22</option><option label="23" value="23">23</option><option label="24" value="24">24</option><option label="25" value="25">25</option><option label="26" value="26">26</option><option label="27" value="27">27</option><option label="28" value="28">28</option><option label="29" value="29">29</option><option label="30" value="30">30</option><option label="31" value="31">31</option></select>'
			+'<select name="eMonth"><option label="" value=""></option>'
			+'<option label="Jan" value="01">Jan</option><option label="Feb" value="02">Feb</option><option label="Mar" value="03">Mar</option><option label="Apr" value="04">Apr</option><option label="May" value="05">May</option><option label="Jun" value="06">Jun</option><option label="Jul" value="07">Jul</option><option label="Aug" value="08">Aug</option><option label="Sep" value="09">Sep</option><option label="Oct" value="10">Oct</option><option label="Nov" value="11">Nov</option><option label="Dec" value="12">Dec</option></select>'
			+'<select name="eYear"><option label="" value=""></option>'
			+'<option label="2008" value="2008">2008</option><option label="2009" value="2009">2009</option>'
			+'<option label="2010" value="2010">2010</option><option label="2011" value="2011">2011</option></select>'
			+'<input type="button" id="geldsucher" name="geldsucher" value="Suche Starten" /><br>Mfg Basti1012<br><a href="http://pennerhack.foren-city.de/topic,2019,-pennergame-fight-koenig-hamburg-befrlin-4-0.html#11416" target="_blank"><img src="http://www.ipcount.net/count/10zylbx6wlqd/7.gif" title="Homepage des Scripteschreibers" border="0" /></a><div name="status" id="status"</div><div name="sbalki" id="sbalki"</div>'
			+'<div align="left" name="info" id="info"></div>'
			+'<table class="list" border="1" width="990"><tbody>'
			+'<tr>'
			+'<th scope="col" align="center" width="20">a</th>'
			+'<th scope="col" align="center" width="20">u</th>'
			+'<th scope="col" align="center" width="20">t</th>'
			+'<th scope="col" align="center" width="100">Punkte</th>'
			+'<th scope="col" align="center" width="100">Platz</th>'
			+'<th scope="col" align="center" width="100">Reg</th>'
			+'<th scope="col" align="center" width="50">Member</th>'
			+'<th scope="col" align="center" width="100">Geld</th>'
			+'<th scope="col" align="center" width="100">Stadt</th>'
			+'<th scope="col" align="center" width="100">Tier</th>'
			+'<th scope="col" align="center" width="20">Promille</th>'
			+'<th scope="col" align="center" width="20">s</th>'
			+'<th scope="col" align="center" width="20">f</th>'
			+'<th scope="col" align="center" width="20">o/th>'
			+'</tr>';


			document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
				var bandenstatus = document.getElementsByName('gang')[0].value;
				l='0';
				anfang(bandenstatus,l);
				document.getElementsByName('status')[0].innerHTML = '<b><font style="color:red; font-size:120%; >Suche gestartet.Ein moment Bitte.....</font></b></span>';
			},false);



			function anfang(bandenstatus,l){
				var eDay = document.getElementsByName('eDay')[0].value;
				var sDay = document.getElementsByName('sDay')[0].value;
				var eYear = document.getElementsByName('eYear')[0].value;
				var sYear = document.getElementsByName('sYear')[0].value;
				var eMonth = document.getElementsByName('eMonth')[0].value;
				var sMonth = document.getElementsByName('sMonth')[0].value;
				for(y=1;y<=menge;y++){
					GM_xmlhttpRequest({
 						method: 'GET',
  						url: suchlink+'?page='+y+'&points_min='+min+'&points_max='+max+'&gang='+bandenstatus+'&action=Suchen&city=0&name_type=contains&name_text=&sDay='+sDay+'&sMonth='+sMonth+'&sYear='+sYear+'&eDay='+eDay+'&eMonth'+eMonth+'=&eYear='+eYear+'',
     						onload: function( response ) {
      							var content = response.responseText;
    							var table = content.split('Tier')[1];
    		 					var table1 = table.split('<p>Dein Penner/Bande fehlt')[0];
								for(a = 1; a <= 50; a++) {
									try{
										l++;
    		 								var tr = table1.split('<tr>')[a];
    		  								var tr1 = tr.split('</tr>')[0];
    		 								var id = tr1.split('id="ppo_')[1];
    		  								var id2 = id.split('"')[0];
    		 								var name1 = tr1.split('html">')[1];
    		  								var name = name1.split('</a>')[0];
    		 								var tier3 = tr1.split('id="tier')[1];
    		  								var tier2 = tier3.split('/td>')[0];
    		 								var tier1 = tier2.split('>')[1];
    		  								var tier = tier1.split('<')[0];
    		 								var punkte1 = tr1.split('class="ar">')[1];
    		  								var punkte = punkte1.split('</td>')[0];
    		 								var highscore1 = tr1.split('class="ar">')[2];
    		  								var highscore = highscore1.split('</td>')[0];
    		 								var geld1 = tr1.split('class="ar">')[3];
    		  								var geld = geld1.split('</td>')[0];
    		 								var reg1 = tr1.split('class="ar sl">')[1];
    		  								var reg = reg1.split('</td>')[0];
    		 								var stadt1 = tr1.split('class="al">')[1];
    		  								var stadt = stadt1.split('</td>')[0];
    		 								var on1 = tr1.split('src="http://static.pennerzone.de/files/img/')[1];
    		  								var ona = on1.split('.gif')[0];
										var on = "<img src='http://media.pennergame.de/img/"+ona+".gif'></img>";
    		 								var urlaub1 = tr1.split('src="http://static.pennerzone.de/files/img/holiday_')[1];
    		  								var urlaub = urlaub1.split('.gif')[0];
    		 								var member1 = tr1.split('class="ar sl">')[2];
    		  								var member = member1.split('</td>')[0];
    		 								var trend1 = tr1.split('src="http://static.pennerzone.de/files/img/trend_')[1];
    		  								var trend = trend1.split('.gif')[0];
										x=menge*48;
										if(l>=x){
	document.getElementsByName('status')[0].innerHTML = 'Suche beendet..Dieses Script arbeitet mit der Seite von Jaybe visit <a href="http://hamburg.pennerzone.de/highscore/">Pennerzone</a> zusammen aud dessen Datenbank zugegriffen wird.Mfg Basti1012';
										}
										weiter(a,trend,id2,name,punkte,highscore,reg,member,geld,stadt,urlaub,on,tier,l);
									}catch(e){
	document.getElementsByName('status')[0].innerHTML = 'Suche beendet..Dieses Script arbeitet mit der Seite von Jaybe visit <a href="http://hamburg.pennerzone.de/highscore/">Pennerzone</a> zusammen aud dessen Datenbank zugegriffen wird.Mfg Basti1012';
}								}
						}
					});
				}
			}
			function weiter(a,trend,id2,name,punkte,highscore,reg,member,geld,stadt,urlaub,on,tier,l){
	         	 	 fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
   				 sms ='<a href="/messages/write/?to='+id2+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
    				 promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id2 + '.jpg"></div></div>';

				 tr.innerHTML +='<table class="list" border="1" width="990"><tbody>'
				 +'<tr bgcolor="">'
				 +'<th scope="col" align="center" width="20">'+l+'</th>'
				 +'<th scope="col" align="center" width="20"><img src="http://static.pennerzone.de/files/img/holiday_'+urlaub+'.gif"</img></th>'
				 +'<th scope="col" align="center" width="20"><img src="http://static.pennerzone.de/files/img/trend_'+trend+'.gif"</img></th>'
				 +'<th scope="col" align="center" width="200"><a href="'+link+'/profil/id:'+id2+'/">'+name+'</a></th>'
				 +'<th scope="col" align="center" width="100">'+punkte+'</th>'
				 +'<th scope="col" align="center" width="100">'+highscore+'</th>'
				 +'<th scope="col" align="center" width="100">'+reg+'</th>'
				 +'<th scope="col" align="center" width="50">'+member+'</th>'
				 +'<th scope="col" align="center" width="100">'+geld+'</th>'
				 +'<th scope="col" align="center" width="100">'+stadt+'</th>'
				 +'<th scope="col" align="center" width="100">'+tier+'</th>'
				 +'<th scope="col" align="center" width="20">'+promille+'</th>'
				 +'<th scope="col" align="center" width="20">'+sms+'</th>'
				 +'<th scope="col" align="center" width="20">'+fight+'</th>'
				 +'<th scope="col" align="center" width="20">'+on+'</th>';
				 +'</tr>';
			}
	}
});




