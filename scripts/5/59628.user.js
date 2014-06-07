// ==UserScript==
// @name           Profilbesucher anzeige im Profil Pennergame 
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    Zeigt deine letzen besucher im Profil an so das es jeder lesen kann
// @include        http://*pennergame.de/*
// @version    1.0 Erste version im test und noch in bau
// ==/UserScript==

if(GM_getValue("reload")==null){
GM_setValue("reload",'30')
}




if (document.location.href.indexOf("berlin.pennergame.de")>=0) {var link = "http://berlin.pennergame.de"}
if (document.location.href.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}
if (document.location.href.indexOf("dossergame")>=0) {var link = "http://www.dossergame.co.uk"}
if (document.location.href.indexOf("menelgame")>=0) {var link = "http://www.menelgame.pl"}
if (document.location.href.indexOf("clodogame")>=0) {var link = "http://www.clodogame.fr"}
if (document.location.href.indexOf("mendigogame.es")>=0) {var link = "http://www.mendigogame.es"}
if (document.location.href.indexOf("serserionline.com")>=0) {var link = "http://www.serserionline.com"}
if (document.location.href.indexOf("bumrise")>=0) {var link = "http://www.bumrise.com"}
if (document.location.href.indexOf("muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}

var url = document.location.href;
if (url.indexOf("/settings/")>=0) {
	var neu = document.getElementsByTagName("table")[0];
	SubmitButtonHTML = '';
	var newp = document.createElement("tr");
	newp.innerHTML = '<br><br><br>'

	+'<font color=\"green\">Farbe der &Uuml;berschrieft</font><br>'

	+'<select name="farbe1">'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="#444444" class="genmed">Standard</option>'
	+'<option style="color: darkred; background-color: rgb(250, 250, 250);" value="darkred" class="genmed">Dunkelrot</option>'
	+'<option style="color: red; background-color: rgb(250, 250, 250);" value="red" class="genmed">Rot</option>'
	+'<option style="color: orange; background-color: rgb(250, 250, 250);" value="orange" class="genmed">Orange</option>'
	+'<option style="color: brown; background-color: rgb(250, 250, 250);" value="brown" class="genmed">Braun</option>'
	+'<option style="color: yellow; background-color: rgb(250, 250, 250);" value="yellow" class="genmed">Gelb</option>'
	+'<option style="color: green; background-color: rgb(250, 250, 250);" value="green" class="genmed">Grün</option>'
	+'<option style="color: olive; background-color: rgb(250, 250, 250);" value="olive" class="genmed">Oliv</option>'
	+'<option style="color: cyan; background-color: rgb(250, 250, 250);" value="cyan" class="genmed">Cyan</option>'
	+'<option style="color: blue; background-color: rgb(250, 250, 250);" value="blue" class="genmed">Blau</option>'
	+'<option style="color: darkblue; background-color: rgb(250, 250, 250);" value="darkblue" class="genmed">Dunkelblau</option>'
	+'<option style="color: indigo; background-color: rgb(250, 250, 250);" value="indigo" class="genmed">Indigo</option>'
	+'<option style="color: violet; background-color: rgb(250, 250, 250);" value="violet" class="genmed">Violett</option>'
	+'<option style="color: white; background-color: rgb(250, 250, 250);" value="white" class="genmed">Weiß</option>'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="black" class="genmed">Schwarz</option>'
	+'</select>'



	+'<font color=\"green\">Farbe des Datiums</font><br>'

	+'<select name="farbedatum">'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="#444444" class="genmed">Standard</option>'
	+'<option style="color: darkred; background-color: rgb(250, 250, 250);" value="darkred" class="genmed">Dunkelrot</option>'
	+'<option style="color: red; background-color: rgb(250, 250, 250);" value="red" class="genmed">Rot</option>'
	+'<option style="color: orange; background-color: rgb(250, 250, 250);" value="orange" class="genmed">Orange</option>'
	+'<option style="color: brown; background-color: rgb(250, 250, 250);" value="brown" class="genmed">Braun</option>'
	+'<option style="color: yellow; background-color: rgb(250, 250, 250);" value="yellow" class="genmed">Gelb</option>'
	+'<option style="color: green; background-color: rgb(250, 250, 250);" value="green" class="genmed">Grün</option>'
	+'<option style="color: olive; background-color: rgb(250, 250, 250);" value="olive" class="genmed">Oliv</option>'
	+'<option style="color: cyan; background-color: rgb(250, 250, 250);" value="cyan" class="genmed">Cyan</option>'
	+'<option style="color: blue; background-color: rgb(250, 250, 250);" value="blue" class="genmed">Blau</option>'
	+'<option style="color: darkblue; background-color: rgb(250, 250, 250);" value="darkblue" class="genmed">Dunkelblau</option>'
	+'<option style="color: indigo; background-color: rgb(250, 250, 250);" value="indigo" class="genmed">Indigo</option>'
	+'<option style="color: violet; background-color: rgb(250, 250, 250);" value="violet" class="genmed">Violett</option>'
	+'<option style="color: white; background-color: rgb(250, 250, 250);" value="white" class="genmed">Weiß</option>'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="black" class="genmed">Schwarz</option>'
	+'</select>'


	+'<font color=\"green\">Farbe des Pennersnamen</font><br>'

	+'<select name="farbe">'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="#444444" class="genmed">Standard</option>'
	+'<option style="color: darkred; background-color: rgb(250, 250, 250);" value="darkred" class="genmed">Dunkelrot</option>'
	+'<option style="color: red; background-color: rgb(250, 250, 250);" value="red" class="genmed">Rot</option>'
	+'<option style="color: orange; background-color: rgb(250, 250, 250);" value="orange" class="genmed">Orange</option>'
	+'<option style="color: brown; background-color: rgb(250, 250, 250);" value="brown" class="genmed">Braun</option>'
	+'<option style="color: yellow; background-color: rgb(250, 250, 250);" value="yellow" class="genmed">Gelb</option>'
	+'<option style="color: green; background-color: rgb(250, 250, 250);" value="green" class="genmed">Grün</option>'
	+'<option style="color: olive; background-color: rgb(250, 250, 250);" value="olive" class="genmed">Oliv</option>'
	+'<option style="color: cyan; background-color: rgb(250, 250, 250);" value="cyan" class="genmed">Cyan</option>'
	+'<option style="color: blue; background-color: rgb(250, 250, 250);" value="blue" class="genmed">Blau</option>'
	+'<option style="color: darkblue; background-color: rgb(250, 250, 250);" value="darkblue" class="genmed">Dunkelblau</option>'
	+'<option style="color: indigo; background-color: rgb(250, 250, 250);" value="indigo" class="genmed">Indigo</option>'
	+'<option style="color: violet; background-color: rgb(250, 250, 250);" value="violet" class="genmed">Violett</option>'
	+'<option style="color: white; background-color: rgb(250, 250, 250);" value="white" class="genmed">Weiß</option>'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="black" class="genmed">Schwarz</option>'
	+'</select>'




	+'<font color=\"green\">Menge der Letzen besucher anzeigen </font><br>'
	+'<select name="menge">'
	+'<option value="5">Die letzen 5 Besucher anzeigen</option>'
	+'<option value="10">Die letzen 10 Besucher anzeigen</option>'
	+'<option value="15">Die letzen 15 Besucher anzeigen</option>'
	+'<option value="20">Die letzen 20 Besucher anzeigen</option>'
	+'</select>'



	+'<font color=\"green\">Reload zeit wie oft reloadet werden soll</font><br>'
	+'<select name="reload">'
	+'<option value="10">alle 10 sekunden reloden</option>'
	+'<option value="20">alle 20 sekunden reloden</option>'
	+'<option value="30">alle 30 sekunden reloden</option>'
	+'<option value="45">alle 45 sekunden reloden</option>'
	+'<option value="60">alle 60 sekunden reloden</option>'
	+'</select>'
/*
	+'<font color=\"green\">Text angaben bei bestimmten besuchern</font><br>'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
+'<br>Name des Penners :<input type="text" name="pennernamenwer">Text der angezeigt werden soll:<input type="text" name="pennertext">'
*/
+'<br>Extra infos anzeigen Bande:<input type="checkbox" name="extrainfos">'
+'<br>Extra infos anzeigen Regdatum:<input type="checkbox" name="extrainfos">'
+'<br>Extra infos anzeigen Geld:<input type="checkbox" name="extrainfos">'
+'<br>Extra infos anzeigen Platz:<input type="checkbox" name="extrainfos">'
+'<br>Extra infos anzeigen Angifsbutton:<input type="checkbox" name="extrainfos">'
+'<br>Extra infos anzeigen Online:<input type="checkbox" name="extrainfos">'



	+'<br><input type="button" name="spinagesichern" value="Angegebene Profildaten(Script) speichern"><br>'
	var newli = document.createElement("tr");
	newli.appendChild(newp);
	newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
	neu.appendChild(newli);



for(i=0;i<=5;i++){
document.getElementsByName("extrainfos")[i].checked = GM_getValue("extrainfos"+i);
}
	document.getElementsByName("reload")[0].value = GM_getValue("reload");
	document.getElementsByName("farbe")[0].value = GM_getValue("farbe");
	document.getElementsByName("farbe1")[0].value = GM_getValue("farbe1");
	document.getElementsByName("farbedatum")[0].value = GM_getValue("farbedatum");
	document.getElementsByName("menge")[0].value = GM_getValue("menge");
	document.getElementsByName("description")[0].value = GM_getValue("description");



	document.getElementsByName('spinagesichern')[0].addEventListener('click', function save_spenden () {
		for(i=0;i<=5;i++){
			GM_setValue("extrainfos"+i, document.getElementsByName("extrainfos")[i].checked);
}
		GM_setValue("reload", document.getElementsByName("reload")[0].value);
		GM_setValue("farbe", document.getElementsByName("farbe")[0].value);
		GM_setValue("farbe1", document.getElementsByName("farbe1")[0].value);
		GM_setValue("farbedatum", document.getElementsByName("farbedatum")[0].value);
		GM_setValue("menge", document.getElementsByName("menge")[0].value);
		GM_setValue("description", document.getElementsByName("description")[0].value);
		alert("alle daten erfolgreich gespeichert")
		window.location.reload();
	},false);
}

profilbesucher()

































function profilbesucher(){
var bodya = document.getElementById("my-profile").innerHTML;
meineid = bodya.split('/profil/id:')[1].split('/')[0];


GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/profil/id:'+meineid+'/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;

		for(a=1;a<=GM_getValue("menge");a++){
			try{
		shoutboxfeld = content.split('Deine letzten Profilbesucher')[1].split('Impressum')[0];


				penner = shoutboxfeld.split("/profil")[a].split('a>')[0];
				idpenner = penner.split("/id:")[1].split('/')[0];
				namepenner = penner.split('>')[1].split('<')[0];
				datum = shoutboxfeld.split('120px;">')[a+1].split('div')[0].split(' ')[1].split('</')[0];
				datenchecken(idpenner,namepenner,datum,a)
			}catch(e){}
		}
	}
});
}


function datenchecken(idpenner,namepenner,datum,a){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/dev/api/user.'+idpenner+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var platz = dom.getElementsByTagName('position')[0].textContent;
			var punkte = dom.getElementsByTagName('points')[0].textContent;
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			try{var cash = dom.getElementsByTagName('cash')[0].textContent/100;}catch(e){cash='-';}
			try{var bandeid = dom.getElementsByTagName('id')[1].textContent;var bande = dom.getElementsByTagName('name')[1].textContent;}catch(e){var bande = '-';var bandeid = '-';}
			onlinecheck(idpenner,namepenner,datum,a,cash,bandeid,bande,reg,punkte,platz)
}});

}
function onlinecheck(idpenner,namepenner,datum,a,cash,bandeid,bande,reg,punkte,platz){

GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/profil/id:'+idpenner+'/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var suche = content.search("Ist gerade Online");
		try{if (suche != -1) {var online1 = "[img]http://media.pennergame.de/img/on.gif[/img]";} else {var online1 = "[img]http://media.pennergame.de/img/off.gif[/img]";}}catch(e){online1 ='';}
		namencheck(idpenner,namepenner,datum,a,cash,bandeid,bande,reg,punkte,platz,online1)
	}
});
}



function namencheck(idpenner,namepenner,datum,a,cash,bandeid,bande,reg,punkte,platz,online1){

if(GM_getValue("extrainfos0")==true){
bande = '[url='+link+'/profil/bande:'+bandeid+'/][color='+GM_getValue("farbe")+'][u]'+bande+'[/u][/color][/url]';
}else{
bande ='';
}

if(GM_getValue("extrainfos1")==true){
reg ='|Reg : '+reg+'';
}else{
reg ='';
}

if(GM_getValue("extrainfos2")==true){
geld = '|'+cash+' Euro';
}else{
geld ='';
}

if(GM_getValue("extrainfos3")==true){
platz = '|Platz: '+platz+'';
}else{
platz ='';
}

if(GM_getValue("extrainfos4")==true){
angriff = '|[url='+link+'/profil/id:'+idpenner+'/][img]http://static.pennergame.de/img/pv4/icons/att.png[/img][/url]';
}else{
angriff ='';
}

if(GM_getValue("extrainfos5")==true){
online = '';//|'+online1+'';
}else{
online ='';
}


var inputt = angriff+online+reg+geld+platz+bande;

	GM_setValue("profil"+a , '[color='+GM_getValue("farbedatum")+']'+datum+'[/color][url='+link+'/profil/id:'+idpenner+'/][color='+GM_getValue("farbe")+'][u]'+namepenner+'[/u][/color][/url]'+inputt+'\n');
	sende_ins_profil(a);

}



function sende_ins_profil(a){

mengederbesucher = GM_getValue("menge");
ueber ='[center][color='+GM_getValue("farbe1")+']Meine letzten '+mengederbesucher+' Profilbesucher[/color][/center]';
ende ='[small]Nein, ich aktualisiere die Besucher nicht manuell, das macht ein Skript(alle '+GM_getValue("reload")+' Selkunden). Und nein, das Skript hebelt PG nicht aus, die Profilbesucheranzeige muss aktiviert sein. Das Script gibt es bei Basti1012 auf der Homepage.[/small][url=http://pennerhack.foren-city.de]Seite von pennerhack[/url] ';


if(mengederbesucher==5){
text = ''+ueber+GM_getValue("profil1")+GM_getValue("profil2")+GM_getValue("profil3")+GM_getValue("profil4")+GM_getValue("profil5")+ende+GM_getValue("description")+'';
}else

if(mengederbesucher==10){
text = ''+ueber+GM_getValue("profil1")+GM_getValue("profil2")+GM_getValue("profil3")+GM_getValue("profil4")+GM_getValue("profil5")+GM_getValue("profil6")+GM_getValue("profil7")+GM_getValue("profil8")+GM_getValue("profil9")+GM_getValue("profil10")+ende+GM_getValue("description")+'';
}else

if(mengederbesucher==15){
text = ''+ueber+GM_getValue("profil1")+GM_getValue("profil2")+GM_getValue("profil3")+GM_getValue("profil4")+GM_getValue("profil5")+GM_getValue("profil6")+GM_getValue("profil7")+GM_getValue("profil8")+GM_getValue("profil9")+GM_getValue("profil10")+GM_getValue("profil11")+GM_getValue("profil12")+GM_getValue("profil13")+GM_getValue("profil14")+GM_getValue("profil15")+ende+GM_getValue("description")+'';
}else

if(mengederbesucher==20){
text =''+ueber+GM_getValue("profil1")+GM_getValue("profil2")+GM_getValue("profil3")+GM_getValue("profil4")+GM_getValue("profil5")+GM_getValue("profil6")+GM_getValue("profil7")+GM_getValue("profil8")+GM_getValue("profil9")+GM_getValue("profil10")+GM_getValue("profil11")+GM_getValue("profil12")+GM_getValue("profil13")+GM_getValue("profil14")+GM_getValue("profil15")+GM_getValue("profil16")+GM_getValue("profil17")+GM_getValue("profil18")+GM_getValue("profil19")+GM_getValue("profil20")+ende+GM_getValue("description")+'';
}


if(a==mengederbesucher){

		GM_xmlhttpRequest({
			method: 'POST',
			url: ''+link+'/settings/profil_save/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('vname=&nname=&age=0&city=&homepage=&fav_drink=&play=&sex=0&description='+text+'&award_display=1&plunder_show=1&plunder_stats=1&submitForm=Speichern'),
			onload: function(responseDetails) {}
		});
	}
}







reloada = GM_getValue("reload")*1000;
window.setInterval(profilbesucher, reloada);

