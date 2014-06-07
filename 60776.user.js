// ==UserScript==
// @name downfight.de 7.a fuer pennergame 4.0 berlin  hamburg muenchen
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description downfight fuer pennergame version 7.a somit kann man nur gegner suchen auf welcher seite man gerade ist .Es werden nur gegner gesucht die in deinen bereich sind
// @include http://*pennergame.de/fight*
// ==/UserScript==


var url = document.location.href;
if (url.indexOf("berlin.pennergame.de")>=0) {
var siglink = "http://inodes.pennergame.de/bl_DE/signaturen/";
var linka = "http://berlin.pennergame.de"
var pgnormal = 'http://berlin.pennergame.de/'
var welchetowndropdown =''
+'<option value="1">Upfighterberlin</option>'
+'<option value="3">Downfighterberlin</option>'
+'<option value="6">zockberlin</option>'
}
if (url.indexOf("http://www.pennergame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var linka = "http://www.pennergame.de"
var pgnormal = 'http://www.pennergame.de/';
var welchetowndropdown =''
+'<option value="2">Upfighterhamburg</option>'
+'<option value="4">Downfighterhamburg</option>'
+'<option value="5">zockhamburg</option>'
}
if (url.indexOf("muenchen.pennergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/mu_DE/signaturen/";
var linka = "http://muenchen.pennergame.de/"
var pgnormal = 'http://www.pennergame.de/';
var welchetowndropdown ='<option value="8">Upfightermuenchen</option>'
+'<option value="9">Downfightermuenchen</option>'
+'<option value="7">zockmuenchen</option>'
}







GM_xmlhttpRequest({
  method: 'GET',
  url: ''+linka+'/overview/',
      onload: function( response ) {
      	var content = response.responseText;
      	var att = content.split('<span class="att">')[1].split('</span>')[0];
     	var def = content.split('<span class="def">')[1].split('</span>')[0];
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
				GM_setValue("min" , min);
				GM_setValue("max" , max);
				GM_setValue("att" , att);
				GM_setValue("def" , def);
				
}});


Tabels =document.getElementsByClassName('settingpoint2')[0];
var tr = document.getElementById('form1');
tr.innerHTML += '<font style=\"color:yellow; font-size:120%;\"><br>Downfight Script 7a <br>Mfg Basti1012<br>Bei Fragen und Probleme bitte <a href="http://pennerhack.foren-city.de/privmsg.php?mode=post&u=2">Hier melden</a></font>'
+'<select id="welchestadtupdown"  name="welchestadtupdown">'
+''+welchetowndropdown+''
+'</select><br>'
+'Eingabe der h&ouml;chsten Punkten :<input type="text"  id="hoch"    name="hoch"   value="'+GM_getValue("max")+'"><br>'
+'Eingabe der untersten Punkten :<input type="text"  id="runter"  name="runter" value="'+GM_getValue("min")+'"><br>'
+'Eingabe deines Att Wertes :<input type="text"  id="att"     name="att"    value="'+GM_getValue("att")+'"><br>'
+'Eingabe deines Det Wertes :<input type="text"  id="def"     name="def"    value="'+GM_getValue("def")+'"><br>'
+'Menge der Spieler die angezeigt werden sollen :<input type="text"  id="menge"     name="menge"    value="100"><br>'
+'<input type="button" id="suchenachupdown" name="suchenachupdown" value="Suche nach Gegner" ><br>'

+'<div align="left" name="test" id="test"></div>'
+'<div align="left" name="spalteins" id="spalteins"></div>';

document.getElementsByName('suchenachupdown')[0].addEventListener('click', function zockhamburg () {
var wasucheich = document.getElementById('welchestadtupdown').value;
var hoch = document.getElementById('hoch').value;
var runter = document.getElementById('runter').value;
var att = document.getElementById('att').value;
var def = document.getElementById('def').value;
var menge = document.getElementById('menge').value;
suchenachsuche(hoch,runter,att,def,wasucheich,menge);
},false);









function suchenachsuche(hoch,runter,att,def,wasucheich,menge){
document.getElementsByName('spalteins')[0].innerHTML =''
+'<div align="left" name="info" id="info"></div>'
+'<table class="list" border="1" width="900"><tbody>'
+'<tr>'
+'<th scope="col" align="center" width="10">E</th>'
+'<th scope="col" align="center" width="390">Name link</th>'
+'<th scope="col" align="center" width="100">Laufzeit</th>'
+'<th scope="col" align="center" width="100">Punkte</th>'
+'<th scope="col" align="center" width="100">Komentar</th>'
+'<th scope="col" align="center" width="100">Verlauf</th>'
+'<th scope="col" align="center" width="100">SMS/fight</th>'
+'</tr>';


getpost(hoch,runter,att,def,wasucheich,menge);
}



function getpost(hoch,runter,att,def,wasucheich,menge){


if(wasucheich == 1){
var link='http://downfight.de/?seite=hochfightberlin_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}else if(wasucheich == 2){
var link='http://downfight.de/?seite=hochfighthamburg_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}else if(wasucheich == 3){
var link='http://downfight.de/?seite=downfightberlin_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}else if(wasucheich == 4){
var link='http://downfight.de/?seite=downfighthamburg_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}else if(wasucheich == 5){
var link='http://downfight.de/?seite=listehhzock_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}else if(wasucheich == 6){
var link='http://downfight.de/?seite=listebzock_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}
else if(wasucheich == 7){
var link='http://downfight.de/?seite=listemuzock_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}
else if(wasucheich == 9){
var link='http://downfight.de/?seite=downfightmuenchen_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}
else if(wasucheich == 8){
var link='http://downfight.de/?seite=hochfightmuenchen_liebe_scripter_nutzt_doch_die_api_und_macht_das_mit_att_und_def_eingabe_IoI';
}





document.getElementById('info').innerHTML = '<font style=\"color:green; font-size:130%;\"><b>Min Punkte'+runter+'<br>Max Punkte :'+hoch+' <br>Att :'+att+' <br> Def :'+def+'</b></font>';



	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('unten='+runter+'&oben='+hoch+'&myatt='+att+'&mydef='+def+'&angemeldet=nein&auto='),
			onload: function(responseDetails){
			var contenty = responseDetails.responseText;

var content = contenty.split('Eingabe bei der Suche')[1].split('bgcolor="#4d3124">')[0];		

for(i=1;i<=menge;i++){
try{
var namee = content.split('/profil/')[i].split('/')[0];







 GM_xmlhttpRequest({
 method: 'GET',
   	 url: 'http://berlin.pennergame.de/dev/api/user.getname.xml?name='+namee+'',
	 onload: function(responseDetails) {
         var parser = new DOMParser();
         var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

	 	var name = dom.getElementsByTagName('name')[0].textContent;
		var id = dom.getElementsByTagName('id')[0].textContent;
	 	var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
		var position = dom.getElementsByTagName('position')[0].textContent;
	 	var reg_since = dom.getElementsByTagName('reg_since')[0].textContent;
	 	var points = dom.getElementsByTagName('points')[0].textContent;
	 	var city = dom.getElementsByTagName('city')[0].textContent;
try{
		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
}catch(e){
var cash = '--';
}
try{
		var idbande = dom.getElementsByTagName('id')[1].textContent;
		var namebande = dom.getElementsByTagName('name')[1].textContent;
}catch(e){
var idbande = '-';
var namebande = '-';
}
tr.innerHTML +='<table class="list" border="1" width="900"><tbody>'
+'<tr>'
+'<th scope="col" align="center" width="100"><a href="'+linka+'/profil/id:'+id+'/">'+name+'</a></th>'
+'<th scope="col" align="center" width="100">'+position+'</th>'
+'<th scope="col" align="center" width="100">'+reg_since+'</th>'
+'<th scope="col" align="center" width="100">'+points+'</th>'
+'<th scope="col" align="center" width="100">'+city+'</th>'

+'<th scope="col" align="center" width="100">'+idbande+'</th>'
+'<th scope="col" align="center" width="100">'+namebande+'</th>'
+'<th scope="col" align="center" width="100">'+cash+' &euro;:</th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://www.downfight.de/punkte.php?kommentarid=1258751368&username='+name+'&check=1">[Verlauf]<span><img src="http://www.downfight.de/punkte_smallpicture.php?kommentarid=1258751368&username='+name+'&gericht=0" border="0" height="800" width="1200"></span></a></th>'
+'</tr>';

}});
}catch(e){
document.getElementById('info').innerHTML = '<font style=\"color:red; font-size:150%;\">'
+'<b>Suche beendet,es wurden keine Gegner gefunden <br>'
+'oder nicht die menge erreicht die sie eingegeben haben.</b></font>';
break;
}
}

}});




}



// copyright by basti1012