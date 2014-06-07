// ==UserScript==
// @name           	Gegner suche die keine chance gegenb dich haben By basti1012 pennergame alle games
// @namespace      	http://pennerhack.foren-city.de  (basti1012)(pennerhack).-  das scrtipt sucht gegner die schwacher sind als du fuer alle anderen pennergames egal welchbes game es werden nur gegner gezeigt die schwacher sind als du egal wie du gfewinnst immeer
// @description    	Man geht auf er fight seite und es werden sofort gegner
// @include 	   	*pennergame.de/fight/overview/*
// @include 	   	*berlin.pennergame.de/fight/overview/*
// @include 	   	*dossergame.co.uk/fight/overview/*
// @include 	   	*menelgame.pl/fight/overview/*
// @include 	   	*clodogame.fr/fight/overview/*
// @include 	   	*mendigogame.es/fight/overview/*
// @include        *serserionline.com/fight/overview/*
// @include        *bumrise.com/fight/overview/*
// @include        *muenchen.pennergame.de/fight/overview/*


// ==/UserScript==

mengea = '1';
var url = document.location.href;
if (url.indexOf("berlin.pennergame.de")>=0) {
var siglink = "http://inodes.pennergame.de/bl_DE/signaturen/";
var link = "http://berlin.pennergame.de"

}
if (url.indexOf("http://www.pennergame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.pennergame.de"

}
if (url.indexOf("dossergame")>=0) {
var siglink = "http://inodes.pennergame.de/en_EN/signaturen/";
var link = "http://www.dossergame.co.uk"

}
if (url.indexOf("menelgame")>=0) {
var siglink = "http://inodes.pennergame.de/pl_PL/signaturen/";
var link = "http://www.menelgame.pl/"

}
if (url.indexOf("clodogame")>=0) {
var siglink = "http://inodes.pennergame.de/fr_FR/signaturen/";
var link = "http://www.clodogame.fr/"
}
if (url.indexOf("mendigogame.es")>=0) {
var siglink1 = "http://inodes.pennergame.de/es_ES/signaturen/";
var link = "http://www.mendigogame.es/"

}
if (url.indexOf("serserionline.com")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.serserionline.com/"

}
if (url.indexOf("bumrise")>=0) {
var siglink1 = "http://inodes.pennergame.de/us_EN/signaturen/";
var link = "http://www.bumrise.com/"

}
if (url.indexOf("muenchen.pennergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/mu_DE/signaturen/";
var link = "http://muenchen.pennergame.de/"

}



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







var profilspeichern11 = document.getElementsByTagName("table")[0];
var profilspeichern22 = document.createElement("tr");
profilspeichern22.innerHTML = 'Es werden hier nur Gegner angezeigt die nicht so gut sinmd wie du das heisst <br>'
+'Die id ist schlechter ayls dein er eigener id <br>'
+'Dann sind die Punkte schlechter als deine<br>'
+' Und der Gegner hat seine signmatur angeschaltet unmd das hreiost das er minimum 1 euro aufg sein konto hat oder mehr<br>'
+'<b id="ich"</b>'
+'<b id="balken"</b>';
profilspeichern11.appendChild(profilspeichern22);
hoehe = '100';


var bodya = document.getElementById("my-profile").innerHTML;
body = bodya.split('/profil/id:')[1];
var myid = body.split('/')[0];

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/dev/api/user.'+myid+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var name = dom.getElementsByTagName('name')[0].textContent;
			var id = dom.getElementsByTagName('id')[0].textContent;
			var platz = dom.getElementsByTagName('position')[0].textContent;
			var punkte = dom.getElementsByTagName('points')[0].textContent;
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			document.getElementById('ich').innerHTML = 'Eigene Id = '+myid+'<br>Eigene punkte '+punkte+'<br>';
			weiter(name,id,platz,punkte,reg,hoehe)
	}});


function weiter(name,id,platz,punkte,reg,hoehe){

	for(x=1;x<=mengea;x++){
		GM_xmlhttpRequest({
       			method: 'GET',
            		url: ''+link+'/highscore/user/'+x+'/?min='+GM_getValue("attmin")+'&max='+GM_getValue("attmax")+'',
             		onload: function(responseDetails) {
            			var content = responseDetails.responseText;
					for(a=2;a<=21;a++){
						var table = content.split('<a href="/profil/id:')[a];
						var ida = table.split('/')[0];
						anfangemn(name,id,platz,punkte,reg,ida,hoehe);
					}
				}
		});
	}
}


function anfangemn(name,id,platz,punkte,reg,ida,hoehe){

if(ida<=id){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/dev/api/user.'+ida+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var namer = dom.getElementsByTagName('name')[0].textContent;
			var idr = dom.getElementsByTagName('id')[0].textContent;
			var platzr = dom.getElementsByTagName('position')[0].textContent;
			var punkter = dom.getElementsByTagName('points')[0].textContent;
			var regr = dom.getElementsByTagName('reg_since')[0].textContent;
try{
			var cashr = dom.getElementsByTagName('cash')[0].textContent;
}catch(e){
cashr = '0';
}
			var fight ='<a href="/fight/?to='+namer+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
			var sms ='<a href="/messages/write/?to='+idr+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';




try{
			var namer1 = dom.getElementsByTagName('name')[1].textContent;
			var idr1 = dom.getElementsByTagName('id')[1].textContent;
			var linkbande = '<a href="/profil/bande:'+idr1+'/">'+namer1+'</a>';

}catch(e){
var linkbande = '-';
}










			if(punkte>=punkter){
				if(cashr>=hoehe){
					if(platz<=platzr){
						cashr= cashr/100;

						var profilspeichern1 = document.getElementsByTagName("table")[0];
						var profilspeichern = document.createElement("table");
						profilspeichern.innerHTML = '<table class="list" border="1" width="1400"><tbody>'
						+'<tr>'

						+'<th scope="col" align="center" width="300"><a href="/profil/id:'+idr+'/">'+namer+'</a></th>'

						+'<th scope="col" align="center" width="200">'+linkbande+'</th>'

						+'<th scope="col" align="center" width="150">'+platzr+'</th>'
						+'<th scope="col" align="center" width="150">'+punkter+'</th>'
						+'<th scope="col" align="center" width="150">'+regr+'</th>'
						+'<th scope="col" align="center" width="150">'+cashr+' &euro;</th>'
						+'<th scope="col" align="center" width="100">'+fight+sms+'</th><tr>';
						profilspeichern1.appendChild(profilspeichern);





					}
				}
			}
		}});

	}
}


// copyright by basti1012