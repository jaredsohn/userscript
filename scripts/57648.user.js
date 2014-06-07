// ==UserScript==
// @name           lets fight sender in der shoutboxoo  version 3 mit mehr infos ( MIT OHNE ATT SENDER)
// Version         ll11ss
// @namespace      by basti1012 (visit http://pennerhack.forren-city.de)
// @description    fuegt hinter den letzen fights buttons zum angreifen ein und mehr infos und shoutbox senden ein ( version mit und ohne att sender )
// @include        http://*pennergame.de/fight/*
// @include        http://*dossergame.co.uk/fight/*
// @include        http://*menelgame.pl/fight/*
// @include        http://*clodogame.fr/fight/*
// @exclude        http://newboard.pennergame.de*
// ==/UserScript==
// Dieses Script ist Copyright by basti1012 wem es nicht gefallen tut der muss es ja nicht benutzen
//?berarbeitet und Hilfestellung von NewMan

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var pgurl = 'http://dossergame.co.uk/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var pgurl = 'http://clodogame.fr/';
};

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

	
		info_id.innerHTML +='<a href="/fight/?to='+id+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
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


var table = document.getElementsByTagName("table")[1];
var info = table.getElementsByTagName("tr")[f+1];
var id = info.innerHTML.split('<a href="/')[2].split('/">')[0];
var name = info.innerHTML.split('/">')[2].split('</a>')[0];
var nurid = info.innerHTML.split('href="/profil/id:')[1].split('/">')[0];
var geld = info.innerHTML.split('<td>')[4].split('</td>')[0];
var punkte = info.innerHTML.split(/<td>\s*/)[5].split('</td>')[0];
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

var minimala1 = " Att :"+ida+"  Def: "+id1+" \n Fight   am :"+datum+" Gegen :[url="+pgurl+"profil/id:"+id+"/]"+name+"[/url] Geld :"+geld+" Punkte:"+punkte+" Bande des Gegners:[url="+pgurl+"/profil/bande:"+idbande+"/]"+namebande+"[/url]";

document.getElementsByName('gang_friend'+f)[0].addEventListener('click', function note(){
GM_xmlhttpRequest({
	method: 'POST',
	url: ''+pgurl+'/gang/chat/add/',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: encodeURI('f_text='+minimala1+'&Submit=Abschicken'),
	onload: function(responseDetails)
				{
			location.reload();alert("Fight Daten "+f+" An Shoutbox gesendet\nGesendeter Text:\n"+minimala1+"");
		}
	});
},false); 

var mini = " Fight   am :"+datum+" Gegen :[url="+pgurl+"profil/id:"+id+"/]"+name+"[/url] Geld :"+geld+" Punkte:"+punkte+" Bande des Gegners:[url="+pgurl+"/profil/bande:"+idbande+"/]"+namebande+"[/url]";

document.getElementsByName('friend'+f)[0].addEventListener('click', function note(){
GM_xmlhttpRequest({
	method: 'POST',
	url: ''+pgurl+'/gang/chat/add/',
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