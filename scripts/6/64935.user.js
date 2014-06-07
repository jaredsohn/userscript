// ==UserScript==
// @name           	Fight Gegnersuche nach Geld Pennergame 4.0
// @namespace      	http://pennerhack.foren-city.de  (basti1012)(pennerhack)
// @description    	Mit einen klick werden euch nur Gegner angezeigt die in deinen Punkte bereich sind und fett kohle haben das man einstellen kannn
// @include 	   	*pennergame.de/fight/overview/*
// @include 	   	*berlin.pennergame.de/fight/overview/*
// @include 	   	*dossergame.co.uk/fight/overview/*
// @include 	   	*menelgame.pl/fight/overview/*
// @include 	   	*clodogame.fr/fight/overview/*
// @include 	   	*mendigogame.es/fight/overview/*
// ==/UserScript==

menge = '15';
y=0;
GM_setValue("y" , y);
// linkadressen ermitteln
var url = document.location.href;
// linkadresse berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
// Linkadressen fuer dossergame
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
}
// Linkadressen fuer menelgame
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
}
// Linkadressen fuer clodogame
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
}
// Linkadressen fuer mendigogame.es
if (url.indexOf("http://www.mendigogame.es")>=0) {
var link = "http://www.mendigogame.es"
}

var profilspeichern11 = document.getElementsByTagName("table")[0];
var profilspeichern22 = document.createElement("tr");
profilspeichern22.innerHTML = '<table class="list" border="3" width="600"><tbody>'
+'<tr><th scope="col" align="center" width="150" bgcolor="red">absteigend</th>'
+'<th scope="col" align="center" width="150" bgcolor="green">aufsteigend</th>'
+'<th scope="col" align="center" width="150" bgcolor="orange">gleichbleibend</th></tr>'
+'<b id="balken"</b>'
+'Minimum Geld ;<input id="menge" name="menge" maxlength="9" size="4" value="10000" type="text" /><input type="button" id="geldsucher" name="geldsucher" value="Gegner nach Geld suchen" />';
profilspeichern11.appendChild(profilspeichern22);


document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
hoehe = document.getElementById('menge').value;

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


for(x=1;x<=menge;x++){
		GM_xmlhttpRequest({
       			method: 'GET',
            		url: ''+link+'/highscore/user/'+x+'/?min='+GM_getValue("attmin")+'&max='+GM_getValue("attmax")+'',
             		onload: function(responseDetails) {
            			var content = responseDetails.responseText;
					for(a=2;a<=21;a++){
						var table = content.split('<a href="/profil/id:')[a];
						var id = table.split('/')[0];
						var aufab = content.split('<td class="col1 ')[a];
						var aufab1 = aufab.split('"')[0];
						if(aufab1 = 'down'){
							aufab2 = 'red';
						}else
						if(aufab1 = 'up'){
							aufab2 = 'green';
						}else
						if(aufab1 = 'neutral'){
							aufab2 = 'orange';
						}
						weiter(id,a,x,aufab2)
					}
				}
		});
	}

function weiter(id,a,x,aufab2){



y=GM_getValue("y");
y++;
GM_setValue("y" , y);

var mengepenner = menge*20;
var balkie = y;
var hunderta = 500/mengepenner;

var hundert = hunderta*y;

pro = hundert/5;
var reinmachen ='<strong>'+y+'</strong> von '+mengepenner+'.Fortschrit ';
document.getElementById('balken').innerHTML = ''+reinmachen+'<br><div class="processbar_bg" style="width: 500px;"><div id="active_process2" class="processbar" style="width: '+hundert+'px;">'+pro+' %</div></div>';






GM_xmlhttpRequest({
 	method: 'GET',
   	url: ''+link+'/dev/api/user.'+id+'.xml',
	onload: function(responseDetails) {
         	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var nam = dom.getElementsByTagName('name')[0].textContent;
	 		var id = dom.getElementsByTagName('id')[0].textContent;
			var platz = dom.getElementsByTagName('position')[0].textContent;
			var punkte = dom.getElementsByTagName('points')[0].textContent;
				try{
					var cash = dom.getElementsByTagName('cash')[0].textContent/100;
					var highlightita = 5000;
					var highlightit0 = 5001;
					var highlightit1 = 10000;
					var highlightit2 = 20000;
					var highlightit3 = 50000;
					var highlightit4 = 75000;
					var highlightit5 = 125000;

					if (cash <= highlightita){
						farbe = "white";
					}
					if (cash >= highlightit0){
						var farbe = "#F91805";
					}
					if (cash >= highlightit1){
						var farbe = "#EE4611";
					}
					if (cash >= highlightit2){
						var farbe = "#F6A008";
					}
					if (cash >= highlightit3){
						var farbe = "#D9EA14";
					}
					if (cash >= highlightit4){
						var farbe = "#0EF905";
					}
					if (cash >= highlightit5){
						var farbe = "#450FEF";
					}


					if(cash>=hoehe){
						ganzereihe = 'black';
						var profilspeichern1 = document.getElementsByTagName("table")[0];
						var profilspeichern = document.createElement("table");
						profilspeichern.innerHTML = '<table class="list" border="3" width="700"><tbody>'
						+'<tr bgcolor="'+ganzereihe+'">'
						+'<th scope="col" align="center" width="150" bgcolor="'+aufab2+'">'+platz+'</th>'
						+'<th scope="col" align="center" width="150"><a href="/profil/id:'+id+'/" class="username">'+nam+'</a></th>'
						+'<th scope="col" align="center" width="150"><font style=\"color:'+farbe+'; font-size:100%;\">'+cash+'</th>'
						+'<th scope="col" align="center" width="150">'+punkte+'</th>'
						+'<th scope="col" align="center" width="100"><a href="'+link+'/messages/write/?to='+id+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" border="0"><a href="'+link+'/friendlist/?friend='+nam+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/add.gif" border="0"><a href="'+link+'/fight/?to='+nam+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/att.png" border="0"></th><tr>';
						profilspeichern1.appendChild(profilspeichern);
					}
			}catch(e){}
		}
	});
}
},false);

// copyright by basti1012