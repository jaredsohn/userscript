// ==UserScript==
// @name Super neue Gelduche mit neuen Funktionen By basti1012 Pennergame 4.0
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description mit diesen Script kann man gegner nach geldsuchen . es wird alles angezeigt was man woiissen muss . neue Funktionen sind dazu gekommen . anzeige von gewonnen kampfen bei gegner . anzeige von vorherschende bande . auf und abwaehrts trend und 3 uhr punkte rechner 
// @include http://*pennergame.de/fight/overview/*
// ==/UserScript==
//GM_deleteValue("LastScriptUpdateCheck");


var url = document.location.href;
// linkadresse berlin
if (url.indexOf("berlin.pennergame.de")>=0) {
var siglink = "http://inodes.pennergame.de/bl_DE/signaturen/";
var link = "http://berlin.pennergame.de"

}
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www.pennergame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.pennergame.de"

}
// Linkadressen fuer dossergame
if (url.indexOf("dossergame")>=0) {
var siglink = "http://inodes.pennergame.de/en_EN/signaturen/";
var link = "http://www.dossergame.co.uk"

}
// Linkadressen fuer menelgame
if (url.indexOf("menelgame")>=0) {
var siglink = "http://inodes.pennergame.de/pl_PL/signaturen/";
var link = "http://www.menelgame.pl/"

}
// Linkadressen fuer clodogame
if (url.indexOf("clodogame")>=0) {
var siglink = "http://inodes.pennergame.de/fr_FR/signaturen/";
var link = "http://www.clodogame.fr/"
}
// Linkadressen fuer mendigogame
if (url.indexOf("mendigogame.es")>=0) {
var siglink1 = "http://inodes.pennergame.de/es_ES/signaturen/";
var link = "http://www.mendigogame.es/"

}
// Linkadressen fuer www.serserionline.com
if (url.indexOf("serserionline.com")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.serserionline.com/"

}

// Linkadressen fuer bumrise
if (url.indexOf("bumrise")>=0) {
var siglink1 = "http://inodes.pennergame.de/us_EN/signaturen/";
var link = "http://www.bumrise.com/"

}
// Linkadressen fuer muenchen
if (url.indexOf("muenchen.pennergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/mu_DE/signaturen/";
var link = "http://muenchen.pennergame.de/"

}


GM_xmlhttpRequest({
   	 method: 'GET',
    	 url: ''+link+'/city_list/',
    	 onload: function(responseDetails) {
		var liste = responseDetails.responseText;
GM_setValue("liste", liste);

}});




GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/fight/overview/',
		onload: function( response ) {
			var lf = response.responseText;
			var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
			var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];
			GM_setValue("attmax" , attmax);
			GM_setValue("attmin" , attmin);
	}
});





var tr = document.getElementsByTagName("table")[0];
tr.innerHTML += '<b id="wieweit1"</b>dieses Script heist Super neue Gelduche mit neuen Funktionen By basti1012 Pennergame 4.0<br>Geben hier sie die Menge der SWeiten an die durchsucht werden sollen :'
+'<select id=\"menge\">'
	+'<option value=\"0\">0</option>'
	+'<option value=\"1\">1</option>'
	+'<option value=\"2\">2</option>'
	+'<option value=\"3\">3</option>'
	+'<option value=\"4\">4</option>'
	+'<option value=\"5\">5</option>'
	+'<option value=\"6\">6</option>'
	+'<option value=\"7\">7</option>'
	+'<option value=\"8\">8</option>'
	+'<option value=\"9\">9</option></select>'

+'Minimum Geld <select id=\"hoehe\">'
	+'<option value=\"0\">0</option>'
	+'<option value=\"1\">1</option>'
	+'<option value=\"2\">2</option>'
	+'<option value=\"3\">3</option>'
	+'<option value=\"4\">4</option>'
	+'<option value=\"5\">5</option>'
	+'<option value=\"6\">6</option>'
	+'<option value=\"7\">7</option>'
	+'<option value=\"8\">8</option>'
	+'<option value=\"9\">9</option></select>'





			+'<input type="button" name="geldsucher"  id="geldsucher"  value="suchen"><b id="balken"</b>'
			+'<br>Mfg Basti1012<br><div name="status" id="status"</div><div name="balken" id="balken"</div>'
			+'<div align="left" name="info" id="info"></div>'
			+'<table class="list" border="1" width="1720"><tbody>'
			+'<tr>'
			+'<th scope="col" align="center" width="20">t</th>'
			+'<th scope="col" align="center" width="20">h</th>'
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
			+'<th scope="col" align="center" width="100">g-Fights</th>'
			+'<th scope="col" align="center" width="145">Haustier</th>'
			+'<th scope="col" align="center" width="10">S</th>'
			+'<th scope="col" align="center" width="10">F</th>'
			+'<th scope="col" align="center" width="10">g</th>'
			+'<th scope="col" align="center" width="10">O</th>'
			+'</tr>';









document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
	hh = document.getElementById('menge').value;
	hoehe = document.getElementById('hoehe').value;







	GM_setValue("hoehe",hoehe);
	GM_setValue("hh",hh);
	GM_setValue("h",'0');
	GM_setValue("y" , '1');
document.getElementById('status').innerHTML = '<font style=\"color:green; font-size:120%;\"><b>Einen Moment ....Bereite suche vor...</b></font>';
	starten(hh)
},false);

	



















function starten(hh){
	for(i=1;i<=hh;i++){
		GM_xmlhttpRequest({
       			method: 'GET',
            		url: ''+link+'/highscore/user/'+i+'/?min='+GM_getValue("attmin")+'&max='+GM_getValue("attmax")+'',
             		onload: function(responseDetails) {
            			var content = responseDetails.responseText;
					for(a=2;a<=22;a++){
						var table = content.split('<a href="/profil/id:')[a];
						var id2 = table.split('/')[0];
						var aufab = content.split('class="col5">')[a];
						var aufab1 = aufab.split('<')[0];
						trend1=aufab1;
						mitte(id2,a,trend1);
					}
				}
		});
	}
}


		




















							
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

			punkteunterschied1 = trend1-punkte;
			if(punkteunterschied1==0){
				var punkteunterschied = '<font style=\"color:yellow; font-size:100%;\"><b>'+punkteunterschied1+'</font>';
				var punkti = '<img src="http://www.fotos-hochladen.net/gleichqk0vzp5y.jpg" height="12" width="12">';
			}else
			if(punkteunterschied1<0){
				var punkteunterschied = '<font style=\"color:red; font-size:100%;\"><b>'+punkteunterschied1+'</font>';
				var punkti = '<img src="http://www.fotos-hochladen.net/runter7dux6n8p.jpg" height="12" width="12">';
			}else
			if(punkteunterschied1>0){
				var punkteunterschied = '<font style=\"color:green; font-size:100%;\"><b>'+punkteunterschied1+'</font>';
				var punkti = '<img src="http://www.fotos-hochladen.net/hoch5qvl96dm.jpg" height="12" width="12">';
			}else{
				var punkteunterschied = '-';
			}


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





			var suche88 = GM_getValue("liste").search(bande);

			if (suche88 != -1) {
				farbe4='green';
			}else{
				farbe4='';
			}





        		if (status==3) {
       				var statu = '<img src="http://media.pennergame.de/img/bande/admin.gif"><font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
 				var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;"><font style=\"color:'+farbe4+'; font-size:100%;\"><b>'+bande+'</font></a>';
			}else if (status==2) {
        			var statu = '<img src="http://media.pennergame.de/img/bande/coadmin.gif"><font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
     				var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;"><font style=\"color:'+farbe4+'; font-size:100%;\"><b>'+bande+'</font></a>';
			}else if (status==1) {
        			var statu = '<img src="http://media.pennergame.de/img/bande/member.gif"><font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
 				var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;"><font style=\"color:'+farbe4+'; font-size:100%;\"><b>'+bande+'</font></a>';
			}else if (status==0) {
				var statu = '-';
				var bandeergebniss = '-';
			}




			try{
				var cash = dom.getElementsByTagName('cash')[0].textContent/100;
				var promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>';
			}catch(e){
				var promille = '- - -';
			}

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












y=GM_getValue("y");
y++;
GM_setValue("y" , y);


var mengepenner = GM_getValue("hh")*20;
var balkie = y;
var hunderta = 500/mengepenner;

var hundert = hunderta*y;
document.getElementById('status').innerHTML = '<font style=\"color:green; font-size:120%;\"><b>Die suche l&auml;uft.......</b></font>';
pro = hundert/5;

if(pro>=100){

document.getElementById('status').innerHTML = '<font style=\"color:green; font-size:120%;\"><b>Die suche ist nun beendet</b></font>';


}





var reinmachen ='<strong>'+y+'</strong> von '+mengepenner+'.Fortschrit ';
document.getElementById('balken').innerHTML = ''+reinmachen+'<br><div class="processbar_bg" style="width: 500px;"><div id="active_process2" class="processbar" style="width: '+hundert+'px;">'+pro+' %</div></div>';
















			if(cash>=GM_getValue("hoehe")){


				h = GM_getValue("h");
				h++;
				GM_setValue("h",h);
				document.getElementById('wieweit1').innerHTML = '<font style=\"color:red; font-size:150%;\"><b>'+h+'</font>';
				rest(punkteunterschied,punkti, link, id, name, platz, farbe1, cash, punkte, reg, bandeergebniss, statu, promille, id2);
			}
		}
	});
}




function rest(punkteunterschied,punkti,link,id,name,platz,farbe1,cash,punkte,reg,bandeergebniss,statu,promille,id2){

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
    			var hausi5 = content.split('&nbsp;Punkte')[1];
    			var hausi3 = hausi5.split('Auszeichnungen')[0];

    			var hausi4 = hausi3.split('/headline/')[1];
    			var petname = hausi4.split('/')[0];







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
		var suche = content.search('title="Online');
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

			var suche1 = content.search("100 gewonnene");
			var suche2 = content.search("200 gewonnene");
			var suche3 = content.search("250 gewonnene");
			var suche4 = content.search("400 gewonnene");
			var suche5 = content.search("500 gewonnene");
			var suche6 = content.search("800 gewonnene");
			var suche7 = content.search("1000 gewonnene");
			var suche8 = content.search("2000 gewonnene");

			if (suche1 != -1) {
				ergebniss = '100';
				farbe2='green';
			}else
			if (suche2 != -1) {
				ergebniss = '200';
				farbe2='green';
			}else
			if (suche3 != -1) {
				ergebniss = '250';
				farbe2='green';
			}else
			if (suche4 != -1) {
				ergebniss = '400';
				farbe2='yellow';
			}else
			if (suche5 != -1) {
				ergebniss = '500';
				farbe2='yellow';
			}else
			if (suche6 != -1) {
				ergebniss = '800';
				farbe2='orange';
			}else
			if (suche7 != -1) {
				ergebniss = '1000';
				farbe2='red';
			}else
			if (suche8 != -1) {
				ergebniss = '2000';
				farbe2='red';
			}else{
				farbe2='red';
				ergebniss = '-';
			}

			var fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
			var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';










			var tr = document.getElementsByTagName("table")[0];
			tr.innerHTML += '<table class="list" border="1" width="1720"><tbody>'
			+'<tr bgcolor="'+ganzereihe+'">'
			+'<th scope="col" align="center" width="10">'+GM_getValue("h")+'</th>'
			+'<th scope="col" align="center" width="20">'+punkti+'</th>'

			+'<th scope="col" align="center" width="10">'+punkteunterschied+'</th>'
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
			+'<th scope="col" align="center" width="145"><font style=\"color:'+farbe2+'; font-size:100%;\"><b>'+ergebniss+'</font</th>'
			+'<th scope="col" align="center" width="100">'+petname+'</th>'
			+'<th scope="col" align="center" width="10">'+sms+'</th>'
			+'<th scope="col" align="center" width="10">'+fight+'</th>'
			+'<th scope="col" align="center" width="10">'+geschlecht_image+'</th>'
			+'<th scope="col" align="center" width="10">'+online2a+'</th>'
			+'</tr>';

		}
	});
}




// Copyright by basti1012 .Eine enderung des Scriptes oder eine veroeffentlichung ist nur mit erlaubniss des Scriptehersteller erlaubt .
// Wer eine Kopie oder eine Veraenderte Version findet bitte bei den Hersteller melden .
// http://www.pennerhack.foren-city.de
