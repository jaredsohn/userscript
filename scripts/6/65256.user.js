// ==UserScript==
// @name Pennergame Fight Koenig Hamburg Berlin 4.0 version 2.2 By Basti1012
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description Dieses Script sucht dir aus allen 1.600.000 Pennergame user die besten user raus mit der meisten kohle .auch suchen nach geld punkte bande namen rgEX namen und alles durcheinander geht auch 
// @include http://*pennergame.de/fight/overview/*
// ==/UserScript==
//GM_deleteValue("LastScriptUpdateCheck");


var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);
var Jahr = jetzt.getFullYear();
var Tag = jetzt.getDate();
var TagA = ((Tag < 10) ? "0" + Tag : Tag);
var Jahresmonat = jetzt.getMonth();
var Monat = (Number (Jahresmonat) + Number (1))
var MonatA = ((Monat < 10) ? "0" + Monat : Monat);

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



try {
	var body_split = document.body.innerHTML.split('href="/profil/id:');
	var body_split_2 = body_split[1].split('/');
	var id = body_split_2[0];
} catch (err){}


var mengefeld ='<br> Geben hier sie die Menge der gefundenen Pennern an :<input maxlength="128" name="menge" id="menge" size="15" value="'+GM_getValue("menge")+'" type="text">';

var suchfeld ='<h4>Highscore alles suche</h4>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Hinweis: Du kannst verschiedene Bedingungen miteinander kombinieren!</b></span></a><br><br>'

+'<h2>Punkte</h2>'
+'<b><u>min:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Leer lassen um keine minimale Punktzahl zu fordern.</b></span></a><br>'
+'<input maxlength="8" name="searchmin" id="" size="7" value="" class="form-text" type="text"><br>'
+'<b><u>max:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Leer lassen um keine maximale Punktzahl zu fordern.</b></span></a><br>'
+'<input maxlength="8" name="searchmax" id="searchmax" size="7" value="" class="form-text" type="text">'

+'<h2>Geld</h2>'
+'<b><u>min:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Leer lassen um keinen minimalen Kontostand zu fordern.</b></span></a><br>'
+'<input maxlength="8" name="searchcashmin" id="searchcashmin" size="6" value="" class="form-text" type="text">&euro;<br>'
+'<b><u>max:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Leer lassen um keinen maximalen Kontostand zu fordern.</b></span></a><br>'
+'<input maxlength="8" name="searchcashmax" id="searchcashmax" size="6" value="" class="form-text" type="text">&euro;'

+'<h2>Name</h2>'
+'<b><u>Name:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Suche nach einem bestimmten Penner.</b></span></a><br>'
+'<input maxlength="64" name="searchnamename" id="searchnamename" size="15" value="" class="form-text" type="text"><br>'
+'<b><u>Name:</u></b>'
+'<a class="tooltip" href="http://www.regular-expressions.info/" target="_blank">[Hinweis ?]<span><b>Suche nach ähnlichen Pennern. Z.B. findet "kirri[0-9]*" kirri1, kirri52, kirri735 usw. Siehe und klicke hier für mehr Details.</b></span></a><br>'
+'<input maxlength="128" name="searchnameregexp" id="searchnameregexp" size="15" value="" class="form-text" type="text">'

+'<h2>Gang</h2>'
+'<b><u>Name:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Suche nach einer bestimmten Bande. Gebe &lt;none&gt; ein um nach bandenlosen Pennern zu suchen.</b></span></a><br>'
+'<input maxlength="64" name="searchgangname" id="searchgangname" size="15" value="" class="form-text" type="text"><br>'
+'<b><u>Name:</u></b>'
+'<a class="tooltip" href="http://www.regular-expressions.info/" target="_blank" >[Hinweis ?]<span><b>Suche nach ähnlichen Banden. Z.B. findet I.e "sox[0-9]*" sox1, sox23, sox536 etc. Siehe und klicke  hier für mehr Details.</b></span></a><br>'
+'<input maxlength="128" name="searchgangregexp" id="searchgangregexp" size="15" value="" class="form-text" type="text">'

+'<h2>Registrierungsdatum</h2>'
+'<b><u>Von:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Leer lassen um kein frühestes Registrierungsdatum zu fordern. Format: dd.mm.yyyy z.B. 23.10.2008</b></span></a><br>'
+'<input maxlength="10" name="searchreg_datefrom" id="searchreg_datefrom" size="9" value="" class="form-text" type="text"><br>'
+'<b><u>Bis: </u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Leer lassen um kein spätestes Registrierungsdatum zu fordern. Format: dd.mm.yyyy z.B. 07.03.2009</b></span></a><br>'
+'<input maxlength="10" name="searchreg_date" id="searchreg_date" size="9" value="" class="form-text" type="text">'

+'<h2>Urlaubsstatus</h2>'
+'<b><u>Zeige Penner:</u></b>'
+'<a class="tooltip" >[Hinweis ?]<span><b>Wähle ob du alle Penner sehen möchtest oder nur Penner, die zu Hause bzw im Urlaub sind.</b></span></a><br>'
+'<input id="home" name="home" value="home" checked="checked" class="form-radio" type="radio"> zu Hause'
+'<input id="urlaub" name="urlaub" value="holiday" class="form-radio" type="radio"> im Urlaub'
+'<input id="beides" name="beides" value="both" class="form-radio" type="radio"> zuhause oder im Urlaub';



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
			tr.innerHTML += ''+suchfeld+mengefeld+''
			+'<input type="button" name="geldsucher"  id="geldsucher"  value="suchen">'
			+'<br>Mfg Basti1012<br><a href="http://pennerhack.foren-city.de/topic,2019,-pennergame-fight-koenig-hamburg-befrlin-4-0.html#11416" target="_blank"><img src="http://www.ipcount.net/count/10zylbx6wlqd/7.gif" title="Homepage des Scripteschreibers" border="0" /></a><div name="status" id="status"</div><div name="sbalki" id="sbalki"</div>'
			+'<div align="left" name="info" id="info"></div>'
			+'<table class="list" border="1" width="1600"><tbody>'
			+'<tr>'
			+'<th scope="col" align="center" width="20">t</th>'
			+'<th scope="col" align="center" width="190">Name link</th>'
			+'<th scope="col" align="center" width="80">Platz</th>'
			+'<th scope="col" align="center" width="100">Geld</th>'
			+'<th scope="col" align="center" width="100">punkte</th>'
			+'<th scope="col" align="center" width="100">Reg</th>'
			+'<th scope="col" align="center" width="200">Bande</th>'
			+'<th scope="col" align="center" width="100">Status</th>'
			+'<th scope="col" align="center" width="20">Promille</th>'
			+'<th scope="col" align="center" width="145">S-Plunder[x]</th>'
			+'<th scope="col" align="center" width="145">Stadt</th>'
			+'<th scope="col" align="center" width="145">Plunder</th>'
			+'<th scope="col" align="center" width="145">Haustier</th>'
			+'<th scope="col" align="center" width="10">S</th>'
			+'<th scope="col" align="center" width="10">F</th>'
			+'<th scope="col" align="center" width="10">g</th>'
			+'<th scope="col" align="center" width="10">O</th>'
			+'</tr>';



			GM_xmlhttpRequest({
  				method: 'GET',
   				url: "http://userscripts.org/scripts/show/65256",
       	        		onload: function(responseDetails) {
        				var acontent = responseDetails.responseText;
					var version = acontent.split('Berlin 4.0 version ')[1];			
					var version1 = version.split(' By Basti1012')[0];
					if (version1 != 2.2) {
						document.getElementsByName('status')[0].innerHTML = '<font style=\"color:yellow; font-size:150%;\"><b>Es gibt eine neue Version des Skriptes - Pennergame Fight König - Version : ' + version1 + '</font><br><font style=\"color:; font-size:150%;\">Die neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.<br>Hier gibt es weitere Infos über die neue Version:<br>Eine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.<br>Hinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.<br>Fals sie jetzt kein Update machen wollen kommt der Hinweiss morgen wieder.<br>Mfg Basti1012.</b></font><br>Update klicke hier : <input type="button" name="update" id="update" value="F&uuml;r neue version hier klicken">';
						document.getElementById('update').addEventListener('click', function linktklickerone() {
							document.getElementsByName('status')[0].innerHTML = '<b><font style="color:red; font-size:120%; >Instalations fenster wird geladen</font></b></span>';
							window.location.href = 'http://userscripts.org/scripts/source/65256.user.js';
						},false);	
					}
				}
			});

	


			document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
				anfang();
				document.getElementsByName('status')[0].innerHTML = '<b><font style="color:red; font-size:120%; >Suche gestartet.Ein moment Bitte.....</font></b></span>';
			},false);


			function anfang(){
				var menge = document.getElementsByName('menge')[0].value;
				var menge = GM_setValue("menge",menge);




var pmin = document.getElementsByName('searchmin')[0].value;
var pmax = document.getElementsByName('searchmax')[0].value;

var gmin = document.getElementsByName('searchcashmin')[0].value;
var gmax = document.getElementsByName('searchcashmax')[0].value;

var sname = document.getElementsByName('searchnamename')[0].value;
var snamer = document.getElementsByName('searchnameregexp')[0].value;

var sbande = document.getElementsByName('searchgangname')[0].value;
var sbander = document.getElementsByName('searchgangregexp')[0].value;

var regmin = document.getElementsByName('searchreg_date')[0].value;
var regmax = document.getElementsByName('searchreg_datefrom')[0].value;

var home = document.getElementsByName('home')[0].value;
var urlaub = document.getElementsByName('urlaub')[0].value;
var beides = document.getElementsByName('beides')[0].value;
//both
//home
//holiday
urlaub = '';

//http://www.mindf.org/content/pennergame-highscore-tool-berlin
//search%5Bpoints%5D%5Bmin%5D='+pmin+'&search%5Bpoints%5D%5Bmax%5D='+pmax+'&search%5Bcash%5D%5Bmin%5D='+gmin+'&search%5Bcash%5D%5Bmax%5D='+gmax+'&search%5Bname%5D%5Bname%5D='+sname+'&search%5Bname%5D%5Bregexp%5D='+snamer+'&search%5Bgang%5D%5Bname%5D='+sbande+'&search%5Bgang%5D%5Bregexp%5D='+sbander+'&search%5Breg_date%5D%5Bfrom%5D='+regmin+'&search%5Breg_date%5D%5Bto%5D='+regmax+'&search%5Bholiday%5D%5Bshow%5D='+urlaub+'&form_build_id=form-575f6a06774ab2bb8dbcb210e9ae4c84&form_id=dosser_highscore_search_form&dosser_form_id=form-575f6a06774ab2bb8dbcb210e9ae4c84&op=suchen

codesenden = 'search%5Bpoints%5D%5Bmin%5D='+pmin+'&search%5Bpoints%5D%5Bmax%5D='+pmax+'&search%5Bcash%5D%5Bmin%5D='+gmin+'&search%5Bcash%5D%5Bmax%5D='+gmax+'&search%5Bname%5D%5Bname%5D='+sname+'&search%5Bname%5D%5Bregexp%5D='+snamer+'&search%5Bgang%5D%5Bname%5D='+sbande+'&search%5Bgang%5D%5Bregexp%5D='+sbander+'&search%5Breg_date%5D%5Bfrom%5D='+regmin+'&search%5Breg_date%5D%5Bto%5D='+regmax+'&search%5Bholiday%5D%5Bshow%5D='+urlaub+'&form_build_id=  form-575f6a06778ab2bb8dbcb210e9ae4c84&form_id=dosser_highscore_search_form&dosser_form_id=form-575f6a06774ab2bb8dbcb210e9ae4c84&op=suchen'
ausgabe_data = encodeURI(codesenden+'');
ausgabe_data = ausgabe_data.replace(/%255/g, "%5")


///

   				GM_xmlhttpRequest({
     					 method: 'POST',
     					 url: 'http://mindf.org/dosser/search/pg_hamburg',
     					 headers: {'Content-type': 'application/x-www-form-urlencoded'},
// data: 'search%5Bpoints%5D%5Bmin%5D=1&search%5Bpoints%5D%5Bmax%5D=1111&search%5Bcash%5D%5Bmin%5D=&search%5Bcash%5D%5Bmax%5D=&search%5Bname%5D%5Bname%5D=&search%5Bname%5D%5Bregexp%5D=&search%5Bgang%5D%5Bname%5D=&search%5Bgang%5D%5Bregexp%5D=&search%5Breg_date%5D%5Bfrom%5D=&search%5Breg_date%5D%5Bto%5D=&search%5Bholiday%5D%5Bshow%5D=home&form_build_id=											     form-a668025606f1cd0593ce68e5ba8a559f&form_id=dosser_highscore_search_form&dosser_form_id=form-a668025606f1cd0593ce68e5ba8a559f&op=suchen',
 data: 'search%5Bpoints%5D%5Bmin%5D='+pmin+'&search%5Bpoints%5D%5Bmax%5D='+pmax+'&search%5Bcash%5D%5Bmin%5D='+gmin+'&search%5Bcash%5D%5Bmax%5D='+gmax+'&search%5Bname%5D%5Bname%5D='+sname+'&search%5Bname%5D%5Bregexp%5D='+snamer+'&search%5Bgang%5D%5Bname%5D='+sbande+'&search%5Bgang%5D%5Bregexp%5D='+sbander+'&search%5Breg_date%5D%5Bfrom%5D='+regmin+'&search%5Breg_date%5D%5Bto%5D='+regmax+'&search%5Bholiday%5D%5Bshow%5D='+urlaub+'&form_build_id=form-a668025606f1cd0593ce68e5ba8a559f&form_id=dosser_highscore_search_form&dosser_form_id=form-a668025606f1cd0593ce68e5ba8a559f&op=suchen',
      					 	onload: function(responseDetails){
                					var content = responseDetails.responseText;
							var menge = document.getElementsByName('menge')[0].value;

							for(a = 1; a <= menge; a++) {
								try{			 
									var freundid = content.split('id:')[a];
									var id2 = freundid.split('/')[0];
									var trend1 = '';
									mitte(id2,a,trend1);
								}catch(e){

									document.getElementsByName('status')[0].innerHTML = '<font style=\"color:yellow; font-size:120%;\"><b>Sorry....<br>Die suche wurde abgebrochen oder konnte keine Gegner mehr finden mit deinen Suchangaben<br>Habe '+a+' Gegner gefunden die zu deiner suchangabe passen <br>Versuche es nochmal mit einer anderen Suchfunktion</b></font>';
								}
							}
						}
				});
			}

//search%255Bpoints%255D%255Bmin%255D=        &search%255Bpoints%255D%255Bmax%255D=&search%255Bcash%255D%255Bmin%255D=111111&search%255Bcash%255D%255Bmax%255D=999999&search%255Bname%255D%255Bname%255D=&search%255Bname%255D%255Bregexp%255D=&search%255Bgang%255D%255Bname%255D=&search%255Bgang%255D%255Bregexp%255D=&search%255Breg_date%255D%255Bfrom%255D=&search%255Breg_date%255D%255Bto%255D=&search%255Bholiday%255D%255Bshow%255D=&form_build_id=form-575f6a06774ab2bb8dbcb210e9ae4c84&form_id=dosser_highscore_search_form&dosser_form_id=form-575f6a06774ab2bb8dbcb210e9ae4c84&op=suchen
//search%5  Bpoints%  5D%5  Bmin%5  D='+pmin+'&search%5  Bpoints%  5D%  5Bmax%5D='+pmax+'&search%5Bcash%5D%5Bmin%5D='+gmin+'&search%5Bcash%5D%5Bmax%5D='+gmax+'&search%5Bname%5D%5Bname%5D='+sname+'&search%5Bname%5D%5Bregexp%5D='+snamer+'&search%5Bgang%5D%5Bname%5D='+sbande+'&search%5Bgang%5D%5Bregexp%5D='+sbander+'&search%5Breg_date%5D%5Bfrom%5D='+regmin+'&search%5Breg_date%5D%5Bto%5D='+regmax+'&search%5Bholiday%5D%5Bshow%5D='+urlaub+'&form_build_id=form-575f6a06774ab2bb8dbcb210e9ae4c84&form_id=dosser_highscore_search_form&dosser_form_id=form-575f6a06774ab2bb8dbcb210e9ae4c84&op=suchen
//search%5  Bpoints%  5D%5  Bmin%5  D=        &search%5  Bpoints%  5D%5  Bmax%5D=        &search%5Bcash%5D%5Bmin%5D=       1&search%5Bcash%5D%5Bmax%5D=      11&search%5Bname%5D%5Bname%5D=         &search%5Bname%5D%5Bregexp%5D=&search%5Bgang%5D%5Bname%5D=&search%5Bgang%5D%5Bregexp%5D=&search%5Breg_date%5D%5Bfrom%5D=&search%5Breg_date%5D%5Bto%5D=&search%5Bholiday%5D%5Bshow%5D=home&form_build_id=form-1251f525d560d22ac008184e96bc3c06&form_id=dosser_highscore_search_form&dosser_form_id=form-1251f525d560d22ac008184e96bc3c06&op=suchen
//search%5  Bpoints%  5D%5  Bmin%5   =1       &search%5  Bpoints%  5D%5  Bmax%5D=       5&search%5Bcash%5D%5Bmin%5D=&search%5Bcash%5D%5Bmax%5D=&search%5Bname%5D%5Bname%5D=&search%5Bname%5D%5Bregexp%5D=&search%5Bgang%5D%5Bname%5D=&search%5Bgang%5D%5Bregexp%5D=&search%5Breg_date%5D%5Bfrom%5D=&search%5Breg_date%5D%5Bto%5D=&search%5Bholiday%5D%5Bshow%5D=home&form_build_id=form-d0318e6bb927e42b89690d051d6df431&form_id=dosser_highscore_search_form&dosser_form_id=form-d0318e6bb927e42b89690d051d6df431&op=suchen

			function mitte(id2,a,trend1){

				GM_xmlhttpRequest({
					method: 'GET',
					url: ''+link+'/dev/api/user.'+id2+'.xml',
					onload: function(responseDetails) {
						var parser = new DOMParser();
						var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
						var name = dom.getElementsByTagName('name')[0].textContent;
						var id = dom.getElementsByTagName('id')[0].textContent;
						var platz = dom.getElementsByTagName('position')[0].textContent;
						var punkte = dom.getElementsByTagName('points')[0].textContent;
						var reg = dom.getElementsByTagName('reg_since')[0].textContent;
						var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
						var city = dom.getElementsByTagName('city')[0].textContent;


						try{
							var cash = dom.getElementsByTagName('cash')[0].textContent/100;
						}catch(e){
							cash='- - -';
						}

						try{
							var bandeid = dom.getElementsByTagName('id')[1].textContent;
							var bande = dom.getElementsByTagName('name')[1].textContent;
							var status = dom.getElementsByTagName('status')[0].textContent;
							var joined = dom.getElementsByTagName('joined')[0].textContent;
						}catch(e){
							var bande = 'No';
							var bandeid = 'e';
						}

        					if (status==3) {
       							var statu = '<img src="http://media.pennergame.de/img/bande/admin.gif"><font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
 							var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
						}else if (status==2) {
        						var statu = '<img src="http://media.pennergame.de/img/bande/coadmin.gif"><font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
     							var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
						}else if (status==1) {
        						var statu = '<img src="http://media.pennergame.de/img/bande/member.gif"><font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
 							var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
						}else if (status==0) {-';//<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
							var statu = '-';
							var bandeergebniss = '-';
						}



						try{
							var cash = dom.getElementsByTagName('cash')[0].textContent/100;
							var promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>';
						}catch(e){
							var promille = '- - -';
						}

						var fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
						var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
						if (cash <= 1000000){
							farbe1 = "black";}
						if (cash <= 900000){
							var farbe1 = "gray";}
						if (cash <= 800000){
							farbe1 = "blue";}
						if (cash <= 700000){
							var farbe1 = "cyan";}
						if (cash <= 600000){
							farbe1 = "red";}
						if (cash <= 500000){
							var farbe1 = "green";}
						if (cash <= 400000){
							farbe1 = "magenta";}
						if (cash <= 300000){
							farbe1 = "orange";}
						if (cash <= 200000){
							var farbe1 = "yellow";}
						if (cash <= 100000){
							var farbe1 = "";}
						rest(a,trend1, link, id, name, platz, farbe1, cash, punkte, reg, bandeergebniss, statu, promille, sms, fight,id2,tr);
					}


				});
			}
		}
});





function rest(a,trend1,link,id,name,platz,farbe1,cash,punkte,reg,bandeergebniss,statu,promille,sms,fight,id2,tr){

	GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/profil/id:' + id2 + '/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;

		try{
			plunder = content.split('class="user_db.item.quality item">&nbsp;<strong>')[1];
			plunder1 = plunder.split('</strong>')[0];
		}catch(e){
			plunder1 = '-';
		}

		try{
    			var hausi5 = content.split('margin-top:12px;">')[1];
    			var hausi3 = hausi5.split('</div>')[0];

    			var hausi4 = hausi3.split('<img src="')[1];
    			var hausi2 = hausi4.split('"')[0];

			if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg'){var petname = 'Elefant';}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/25834.jpg'){var petname = 'Nashorn';}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/14896.jpg'){var petname = 'Eisb&auml;r';}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12536.jpg'){var petname = '&Auml;ffchen';}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/43703.jpg'){var petname = 'Tiger';}
     				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73953.jpg'){var petname = 'Krokodil';}
     				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/98962.jpg'){var petname  = "Giraffe";}
     				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/64220.jpg'){var petname  = "Nilpferd";}
     				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/90385.jpg'){var petname  = "Pferd";}
     				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/32563.jpg'){var petname  = "Chihuahua";}
      			          else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62456.jpg'){var petname  = "Cockerspaniel";}
      				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/15240.jpg'){var petname  = "Pitbull";}
      				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/09051.jpg'){var petname  = "Sch&auml;ferhund";}	
      				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/48263.jpg'){var petname  = "Adler";}
     				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12758.jpg'){var petname  = "Pudel";}
     				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62474.jpg'){var petname  = "Hausziege";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/61402.jpg'){var petname  = "Schlange";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/89386.jpg'){var petname  = "Falke";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73735.jpg'){var petname  = "Katze";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/21903.jpg'){var petname  = "Frettchen";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/77310.jpg'){var petname  = "Hase";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73684.jpg'){var petname  = "Ratte";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/31451.jpg'){var petname  = "Taube";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/52483.jpg'){var petname  = "Wellensittich";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73308.jpg'){var petname  = "Hamster";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/11836.jpg'){var petname  = "Maus";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/68930.jpg'){var petname  = "Goldfisch";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73933.jpg'){var petname  = "Maus (Geld)";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/00001.jpg'){var petname  = "Kakerlake";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48264.jpg'){var petname  = "Silberfisch";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/75284.jpg'){var petname  = "Grasfrosch";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/92653.jpg'){var petname  = "Rotkelchen";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/02634.jpg'){var petname  = "Clownfisch";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/01743.jpg'){var petname  = "Erdm&auml;nnchen";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11542.jpg'){var petname  = "M&ouml;we";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/66294.jpg'){var petname  = "Opossum";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11634.jpg'){var petname  = "Streifenh&ouml;rnchen";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11743.jpg'){var petname  = "Igel";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/47838.jpg'){var petname  = "Hausschwein";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/94652.jpg'){var petname  = "Schneeeule";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/65384.jpg'){var petname  = "Bisamratte";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/18540.jpg'){var petname  = "Moorschnucke";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/76538.jpg'){var petname  = "Yorkshire Terrier";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/64133.jpg'){var petname  = "Habicht";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48256.jpg'){var petname  = "Collie";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/98641.jpg'){var petname  = "Dogge";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/28463.jpg'){var petname  = "Retriever";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/32563.jpg'){var petname  = "Mops";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/96242.jpg'){var petname  = "Elch";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/85242.jpg'){var petname  = "Zebra";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/99624.jpg'){var petname  = "Kamel";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/13323.jpg'){var petname  = "Riesenschildkr&ouml;te";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/83290.jpg'){var petname  = "Leopard";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/37551.jpg'){var petname  = "Waschb?r";}
    				  else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/73933.jpg'){var petname  = "Maus (Geld)";}

    				  var suche = content.search("selbsterstelltes Haustier");
			if (suche != -1) {
    				var hausi55 = content.split('selbsterstelltes Haustier')[2];
    				var hausi33 = hausi55.split('Haustier zu erstellen')[0];
    				var hausi555 = hausi33.split('<b>')[1];
    				var hausi33 = hausi555.split('</b>')[0];
				var petname = '<a class="tooltip" href="/premium/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
			}
		}catch(e){
		var petname = '--';
		}
		var suche = content.search("http://static.pennergame.de/img/pv4/icons/female.jpg");
		try{
			if (suche != -1) {
				var geschlecht_image = '<img src="http://static.pennergame.de/img/pv4/icons/female.jpg" height="12" width="12"></img></div>';
			}else{
				var geschlecht_image = '<img src="http://static.pennergame.de/img/pv4/icons/male.jpg" height="12" width="12"></img></div>';
			}
		}catch(e){
			var geschlecht_image = '<font style=\"color:green; font-size:100%;\"><b>premium</b></font>';
		}
		var suche = content.search("Ist gerade Online");
			try{
				if (suche != -1) {
					var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>";
				}else {
				var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>";
				}
			}catch(e){
			var geschlecht_image = '<font style=\"color:green; font-size:100%;\">[X]</font>';
			}

			var suche = content.search("scht oder vom Spiel verbannt");
			try{
				if (suche != -1) {
			ganzereihe ='red';
				}else{
			ganzereihe = '';
			}
			}catch(e){
			}

			try{
     				 var location1 = content.split('Stadtteil</strong></td>')[1];
     				 var location2 = location1.split('td>')[0];
    				 var location22 = location2.split('>')[1];
    				 var location3 = location22.split('<')[0];
			}catch(e){
			var location3 = '<font style=\"color:red; font-size:100%;\"><b>premium</b></font>';
			}

			for(i=1; i<=30; i++){
				try{
    					 var spiel = content.split('<div align="center"><strong>')[i];
     					 var spiel1 = spiel.split('</strong>')[0];
				}catch(e){

				if(i==1){
					splunder = '-';
				}else{
					j=i-1;
					splunder ='['+j+']'+spiel1+'';
				}
				break;
				}
			}

			menge = GM_getValue("menge");
			ii=100/menge;
			ee=600/menge;

			if(a<=menge){
				var Stadterg = a*ii;//Math.round((Stadtpro*a)*1)/1
				var balkie = a*ee;//Math.round((Stadterg*3)*10)/10
				var reinmachen ='[Scanne Penner :<strong><b> '+a+' </b></strong>von '+menge+'.Fortschrit <strong><b> '+Stadterg+'  % </b></strong> Fertig  ]';
				document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; '+reinmachen+'<br><div class="processbar_clean" style="width: 600px;"><div id="active_process2" class="processbar" style="width: '+balkie+'px;"></div></div>';
			}


			tr.innerHTML +='<table class="list" border="1" width="1600"><tbody>'
			+'<tr bgcolor="'+ganzereihe+'">'
			+'<th scope="col" align="center" width="10">'+a+'</th>'
			+'<th scope="col" align="center" width="10">'+trend1+'</th>'
			+'<th scope="col" align="center" width="190"><a href='+link+'/profil/id:'+id+'/>'+name+'</a></th>'
			+'<th scope="col" align="center" width="80">'+platz+'</th>'
			+'<th scope="col" align="center" width="100"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+' &euro;</font></th>'
			+'<th scope="col" align="center" width="100">'+punkte+'</th>'
			+'<th scope="col" align="center" width="100">'+reg+'</th>'
			+'<th scope="col" align="center" width="200">'+bandeergebniss+'</th>'
			+'<th scope="col" align="center" width="100">'+statu+'</th>'
			+'<th scope="col" align="center" width="20">'+promille+'</th>'
			+'<th scope="col" align="center" width="145">'+splunder+'</th>'
			+'<th scope="col" align="center" width="145">'+location3+'</th>'
			+'<th scope="col" align="center" width="145">'+plunder1+'</th>'
			+'<th scope="col" align="center" width="145">'+petname+'</th>'
			+'<th scope="col" align="center" width="10">'+sms+'</th>'
			+'<th scope="col" align="center" width="10">'+fight+'</th>'
			+'<th scope="col" align="center" width="10">'+geschlecht_image+'</th>'
			+'<th scope="col" align="center" width="10">'+online2a+'</th>'
			+'</tr>';

			if(a==menge){
				 GM_xmlhttpRequest({
  					 method: 'GET',
  					 url: ''+link+'/other/statistics/',
                			 onload: function( response ) {
      						var content = response.responseText;
      						var alles = content.split('<dt>Registrierte Spieler:</dt>')[1].split('Impressum')[0];
     						var spieler = alles.split('<dd>')[1].split('</dd>')[0];
     						var sonline = alles.split('<dd>')[2].split('</dd>')[0];

						tr.innerHTML +='Statistik um der Aktuellen Zeit ('+StundeA+':'+MinutenA+':'+SekA+')<br>'
						+'Es sind '+spieler+'  Spieler Regestriert <br>'
						+'Davon sind '+sonline+' Spieler Online';
						document.getElementsByName('status')[0].innerHTML = '<font style=\"color:green; font-size:120%;\"><b>Suche erfolgreich beendet</b></font>';
					}
				});
			}
		}
	});
}




// Copyright by basti1012 .Eine enderung des Scriptes oder eine veroeffentlichung ist nur mit erlaubniss des Scriptehersteller erlaubt .
// Wer eine Kopie oder eine Veraenderte Version findet bitte bei den Hersteller melden .
// http://www.pennerhack.foren-city.de
