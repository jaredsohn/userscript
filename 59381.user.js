// ==UserScript==
// @name          Plunder abot all version 2.2 by basti1012 Pennergame 4.0 auch muenchen 
// @namespace      by basti121o http://pennerhack.foren-city.de
// @include        *pennergame.de*
// @include        *clodogame.fr*
// @include        *berlin.pennergame.de*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// @include        *mendigogame.es*
// @include        *serserionline.com*
// @include        *bumrise.com*
// @include        *muenchen.pennergame.de*
// ==/UserScript==


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



for(a=0;a<=6;a++){
if(GM_getValue("einstellungenpa"+a) == null){
GM_setValue("einstellungenpa"+a , '1')
}
}








start()
function start(){
var spendendiv = document.createElement('div');
spendendiv.setAttribute('id', 'angriff');
spendendiv.setAttribute('align', 'middle');
spendendiv.setAttribute('titel', 'hier kommen die werte rein die gerade in der heweiligen stadt zu sehen sind');
spendendiv.setAttribute('style', 'background: url(http://www.fotos-hochladen.net/aaaa42uorhfn.jpg) ; position:absolute; top:'+GM_getValue("einstellungenpa5")+'px; left:'+GM_getValue("einstellungenpa6")+'px; font-size:x-small;-moz-border-radius:20px;-moz-opacity:'+GM_getValue("einstellungenpa4")+';opacity:'+GM_getValue("einstellungenpa4")+';border:'+GM_getValue("einstellungenpa3")+'px solid '+GM_getValue("einstellungenpa1")+'; background-color:'+GM_getValue("einstellungenpa0")+'; z-index:50;');
spendendiv.innerHTML = '<b id="id"</b><br><b id=ii"</b><br><b id="id1"</b><br><b id="id2"</b>';
document.body.appendChild(spendendiv);




	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/stock/plunder/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=1'),
		onload: function(responseDetails){
                	var content = responseDetails.responseText;
			var ange = content.split('<h3>Angelegt</h3>')[1].split('</div>')[0];

			var angelegt = ange.split('<h4>')[1].split('<h4>')[0];

			var bild = ange.split('src="')[1].split('"')[0];

			var texxt = angelegt.split('>')[1].split('<')[0];

			var texxt2 = ange.split('class="zclear">')[1].split('</ul>')[0];

			document.getElementById('id1').innerHTML = '<a href="/stock/plunder/"><img src="'+bild+'"</img></a><br><font style=\"color:'+GM_getValue("einstellungenpa2")+'; font-size:100%;\">'+texxt+'<br>'+texxt2+'</font>';
			var felda = content.split('class="col1">')[1].split('</tr>')[0];
				for(a=2;a<=felda.length;a++){
					var feld = content.split('class="col1">')[a].split('</tr>')[0];
					var id = feld.split('/stock/plunder/sell/')[1].split('/"')[0];
					var feld1 = feld.split('class="col2">')[1].split('class')[0];
					var was = feld1.split('">')[1].split('<')[0];
					var was1 = feld.split('src="')[2].split('"')[0];
					var was2 = feld.split('src="')[3].split('"')[0];
					GM_setValue("stadtid"+a, id);
					GM_setValue("stadtname"+a, was);
					var einstelungen = '<a id="einstell" name="einstell">[<span style=\"color:'+GM_getValue("einstellungenpa2")+';\">Einstellungen</span>]</a>';

					var selectin ='<a><b style=\"color:'+GM_getValue("einstellungenpa2")+'; font-size:100%;\">Plunder about all '+einstelungen+'</b><br>'
					+'<select id=\"plun\">'
+'<option value="'+GM_getValue("stadtid1")+'">'+GM_getValue("stadtname1")+'</option>'
+'<option value="'+GM_getValue("stadtid2")+'">'+GM_getValue("stadtname2")+'</option>'
+'<option value="'+GM_getValue("stadtid3")+'">'+GM_getValue("stadtname3")+'</option>'
+'<option value="'+GM_getValue("stadtid4")+'">'+GM_getValue("stadtname4")+'</option>'
+'<option value="'+GM_getValue("stadtid5")+'">'+GM_getValue("stadtname5")+'</option>'
+'<option value="'+GM_getValue("stadtid6")+'">'+GM_getValue("stadtname6")+'</option>'
+'<option value="'+GM_getValue("stadtid7")+'">'+GM_getValue("stadtname7")+'</option>'
+'<option value="'+GM_getValue("stadtid8")+'">'+GM_getValue("stadtname8")+'</option>'
+'<option value="'+GM_getValue("stadtid9")+'">'+GM_getValue("stadtname9")+'</option>'
+'<option value="'+GM_getValue("stadtid10")+'">'+GM_getValue("stadtname10")+'</option>'
+'<option value="'+GM_getValue("stadtid11")+'">'+GM_getValue("stadtname11")+'</option>'
+'<option value="'+GM_getValue("stadtid12")+'">'+GM_getValue("stadtname12")+'</option>'
+'<option value="'+GM_getValue("stadtid13")+'">'+GM_getValue("stadtname13")+'</option>'
+'<option value="'+GM_getValue("stadtid14")+'">'+GM_getValue("stadtname14")+'</option>'
+'<option value="'+GM_getValue("stadtid15")+'">'+GM_getValue("stadtname15")+'</option>'
+'<option value="'+GM_getValue("stadtid16")+'">'+GM_getValue("stadtname16")+'</option>'
+'<option value="'+GM_getValue("stadtid17")+'">'+GM_getValue("stadtname17")+'</option>'
+'<option value="'+GM_getValue("stadtid18")+'">'+GM_getValue("stadtname18")+'</option>'
+'<option value="'+GM_getValue("stadtid19")+'">'+GM_getValue("stadtname19")+'</option>'
+'<option value="'+GM_getValue("stadtid20")+'">'+GM_getValue("stadtname20")+'</option>'

+'<option value="'+GM_getValue("stadtid21")+'">'+GM_getValue("stadtname21")+'</option>'
+'<option value="'+GM_getValue("stadtid22")+'">'+GM_getValue("stadtname22")+'</option>'
+'<option value="'+GM_getValue("stadtid23")+'">'+GM_getValue("stadtname23")+'</option>'
+'<option value="'+GM_getValue("stadtid24")+'">'+GM_getValue("stadtname24")+'</option>'
+'<option value="'+GM_getValue("stadtid25")+'">'+GM_getValue("stadtname25")+'</option>'
+'<option value="'+GM_getValue("stadtid26")+'">'+GM_getValue("stadtname26")+'</option>'
+'<option value="'+GM_getValue("stadtid27")+'">'+GM_getValue("stadtname27")+'</option>'
+'<option value="'+GM_getValue("stadtid28")+'">'+GM_getValue("stadtname28")+'</option>'
+'<option value="'+GM_getValue("stadtid29")+'">'+GM_getValue("stadtname29")+'</option>'
+'<option value="'+GM_getValue("stadtid30")+'">'+GM_getValue("stadtname20")+'</option>'

+'<option value="'+GM_getValue("stadtid31")+'">'+GM_getValue("stadtname31")+'</option>'
+'<option value="'+GM_getValue("stadtid32")+'">'+GM_getValue("stadtname32")+'</option>'
+'<option value="'+GM_getValue("stadtid33")+'">'+GM_getValue("stadtname33")+'</option>'
+'<option value="'+GM_getValue("stadtid34")+'">'+GM_getValue("stadtname34")+'</option>'
+'<option value="'+GM_getValue("stadtid35")+'">'+GM_getValue("stadtname35")+'</option>'
+'<option value="'+GM_getValue("stadtid36")+'">'+GM_getValue("stadtname36")+'</option>'
+'<option value="'+GM_getValue("stadtid37")+'">'+GM_getValue("stadtname37")+'</option>'
+'<option value="'+GM_getValue("stadtid38")+'">'+GM_getValue("stadtname38")+'</option>'
+'<option value="'+GM_getValue("stadtid39")+'">'+GM_getValue("stadtname39")+'</option>'
+'<option value="'+GM_getValue("stadtid40")+'">'+GM_getValue("stadtname40")+'</option>'

+'<option value="'+GM_getValue("stadtid41")+'">'+GM_getValue("stadtname41")+'</option>'
+'<option value="'+GM_getValue("stadtid42")+'">'+GM_getValue("stadtname42")+'</option>'
+'<option value="'+GM_getValue("stadtid43")+'">'+GM_getValue("stadtname43")+'</option>'
+'<option value="'+GM_getValue("stadtid44")+'">'+GM_getValue("stadtname44")+'</option>'
+'<option value="'+GM_getValue("stadtid45")+'">'+GM_getValue("stadtname45")+'</option>'
+'<option value="'+GM_getValue("stadtid46")+'">'+GM_getValue("stadtname46")+'</option>'
+'<option value="'+GM_getValue("stadtid47")+'">'+GM_getValue("stadtname47")+'</option>'
+'<option value="'+GM_getValue("stadtid48")+'">'+GM_getValue("stadtname48")+'</option>'
+'<option value="'+GM_getValue("stadtid49")+'">'+GM_getValue("stadtname49")+'</option>'
+'<option value="'+GM_getValue("stadtid50")+'">'+GM_getValue("stadtname50")+'</option>'

+'<option value="'+GM_getValue("stadtid51")+'">'+GM_getValue("stadtname51")+'</option>'
+'<option value="'+GM_getValue("stadtid52")+'">'+GM_getValue("stadtname52")+'</option>'
+'<option value="'+GM_getValue("stadtid53")+'">'+GM_getValue("stadtname53")+'</option>'
+'<option value="'+GM_getValue("stadtid54")+'">'+GM_getValue("stadtname54")+'</option>'
+'<option value="'+GM_getValue("stadtid55")+'">'+GM_getValue("stadtname55")+'</option>'
+'<option value="'+GM_getValue("stadtid56")+'">'+GM_getValue("stadtname56")+'</option>'
+'<option value="'+GM_getValue("stadtid57")+'">'+GM_getValue("stadtname57")+'</option>'
+'<option value="'+GM_getValue("stadtid58")+'">'+GM_getValue("stadtname58")+'</option>'
+'<option value="'+GM_getValue("stadtid59")+'">'+GM_getValue("stadtname59")+'</option>'
+'<option value="'+GM_getValue("stadtid60")+'">'+GM_getValue("stadtname60")+'</option>'

+'<option value="'+GM_getValue("stadtid61")+'">'+GM_getValue("stadtname61")+'</option>'
+'<option value="'+GM_getValue("stadtid62")+'">'+GM_getValue("stadtname62")+'</option>'
+'<option value="'+GM_getValue("stadtid63")+'">'+GM_getValue("stadtname63")+'</option>'
+'<option value="'+GM_getValue("stadtid64")+'">'+GM_getValue("stadtname64")+'</option>'
+'<option value="'+GM_getValue("stadtid65")+'">'+GM_getValue("stadtname65")+'</option>'
+'<option value="'+GM_getValue("stadtid66")+'">'+GM_getValue("stadtname66")+'</option>'
+'<option value="'+GM_getValue("stadtid67")+'">'+GM_getValue("stadtname67")+'</option>'
+'<option value="'+GM_getValue("stadtid68")+'">'+GM_getValue("stadtname68")+'</option>'
+'<option value="'+GM_getValue("stadtid69")+'">'+GM_getValue("stadtname69")+'</option>'
+'<option value="'+GM_getValue("stadtid70")+'">'+GM_getValue("stadtname60")+'</option>'


+'<option value="'+GM_getValue("stadtid71")+'">'+GM_getValue("stadtname71")+'</option>'
+'<option value="'+GM_getValue("stadtid72")+'">'+GM_getValue("stadtname72")+'</option>'
+'<option value="'+GM_getValue("stadtid73")+'">'+GM_getValue("stadtname73")+'</option>'
+'<option value="'+GM_getValue("stadtid74")+'">'+GM_getValue("stadtname74")+'</option>'
+'<option value="'+GM_getValue("stadtid75")+'">'+GM_getValue("stadtname75")+'</option>'
+'<option value="'+GM_getValue("stadtid76")+'">'+GM_getValue("stadtname76")+'</option>'
+'<option value="'+GM_getValue("stadtid77")+'">'+GM_getValue("stadtname77")+'</option>'
+'<option value="'+GM_getValue("stadtid78")+'">'+GM_getValue("stadtname78")+'</option>'
+'<option value="'+GM_getValue("stadtid79")+'">'+GM_getValue("stadtname79")+'</option>'
+'<option value="'+GM_getValue("stadtid80")+'">'+GM_getValue("stadtname70")+'</option>'


+'<option value="'+GM_getValue("stadtid81")+'">'+GM_getValue("stadtname81")+'</option>'
+'<option value="'+GM_getValue("stadtid82")+'">'+GM_getValue("stadtname82")+'</option>'
+'<option value="'+GM_getValue("stadtid83")+'">'+GM_getValue("stadtname83")+'</option>'
+'<option value="'+GM_getValue("stadtid84")+'">'+GM_getValue("stadtname84")+'</option>'
+'<option value="'+GM_getValue("stadtid85")+'">'+GM_getValue("stadtname85")+'</option>'
+'<option value="'+GM_getValue("stadtid86")+'">'+GM_getValue("stadtname86")+'</option>'
+'<option value="'+GM_getValue("stadtid87")+'">'+GM_getValue("stadtname87")+'</option>'
+'<option value="'+GM_getValue("stadtid88")+'">'+GM_getValue("stadtname88")+'</option>'
+'<option value="'+GM_getValue("stadtid89")+'">'+GM_getValue("stadtname89")+'</option>'
+'<option value="'+GM_getValue("stadtid90")+'">'+GM_getValue("stadtname80")+'</option>'
+'</select><br><input type="button" id="an"  name="an" value="Anlegen" ><input type="button" id="be"  name="be" value="Benutzen" >'
					selectin = selectin.replace(/<option value="SSS/g,"");
					selectin = selectin.replace(/AAA</g,"");
					selectin = selectin.replace(/AAA">SSS/g,"");
					selectin = selectin.replace(/<option value="undefi/g,"");
					selectin = selectin.replace(/ned</g,"");
					selectin = selectin.replace(/ned">undefi/g,"");
					document.getElementById('id').innerHTML = selectin;
					document.getElementById('einstell').addEventListener('click', function einstell () {
					spendendiv.innerHTML = '<b id="id3"</b><br><b id="id4"</b><br><b id="id5"</b>';
					document.getElementById('id3').innerHTML = '<font style=\"color:'+GM_getValue("einstellungenpa2")+'; font-size:100%;\">Einsttelbereich fuer Plunder about all</font>';


					var FontColor = "<a><span align=\"center\" style=\"color:"+GM_getValue("einstellungenpa2")+"; font-size:100%;\">Hintergrundsfarbe</span></a><center><select name=\"einstellungenpa\"><option value=\"white\">Weiss</option><option value=\"black\">Schwarz</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option><option value=\"#FFFFFF\">Pennergame Grau</option></select></center>";
					var BorderColor = "<a><span align=\"center\" style=\"color:"+GM_getValue("einstellungenpa2")+"; font-size:100%;\">Rahmenfarbe</span></a><center><select name=\"einstellungenpa\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>";
					var schriftColor = "<a><span align=\"center\" style=\"color:"+GM_getValue("einstellungenpa2")+"; font-size:100%;\">Schrieftfarbe</span></a><center><select name=\"einstellungenpa\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>";
					var bordbreite = '<a><span align=\"center\" style=\"color:"+GM_getValue("einstellungenpa2")+"; font-size:100%;\">Rahmenbreite</span></a><center><select name="einstellungenpa">'
+'<option value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14 ">14</option><option value="15">15</option>'
+'</select></center>';

					var tranzparente = '<a><span align=\"center\" style=\"color:"+GM_getValue("einstellungenpa2")+"; font-size:100%;\">tranzparente</span></a><center><select name="einstellungenpa">'
+'<option value="0.5">0.5</option>'
+'<option value="0.6">0.6</option>'
+'<option value="0.7">0.7</option>'
+'<option value="0.8">0.8</option>'
+'<option value="0.9">0.9</option>'
+'<option value="1.0">1.0</option>'
+'<option value="1.1">1.1</option>'
+'<option value="1.2">1.2</option>'
+'<option value="1.3">1.3</option>'
+'<option value="1.4">1.4</option>'
+'<option value="1.5">1.5</option>'
+'<option value="1.6">1.6</option>'
+'<option value="1.7">1.7</option>'
+'<option value="1.8">1.8</option>'
+'<option value="1.9">1.9</option>'
+'<option value="2.0">2.0</option>'
+'</select></center><a><span align=\"center\" style=\"color:"+GM_getValue("einstellungenpa2")+"; font-size:100%;\">Von oben(px)</span></a><center><input name="einstellungenpa" size="10" type="text" >'
+'<br><a><span align=\"center\" style=\"color:"+GM_getValue("einstellungenpa2")+"; font-size:100%;\">Von Links(px)</span></a><center><input name="einstellungenpa" type="text" size="10"  >';



					document.getElementById('id4').innerHTML += '<font style=\"color:'+GM_getValue("einstellungenpa2")+'; font-size:100%;\">'+FontColor+BorderColor+schriftColor+bordbreite+tranzparente+'';


					document.getElementById('id5').innerHTML += '<input type="button" id="close" value="Schliessen"><input type="button" id="save" value="Speichern">';					
					for(i=0;i<=6;i++){
						document.getElementsByName("einstellungenpa")[i].value = GM_getValue("einstellungenpa"+i);
					}
					document.getElementById('save').addEventListener('click', function Setting_warner(){
						for(i=0;i<=6;i++){
							GM_setValue("einstellungenpa"+i, document.getElementsByName("einstellungenpa")[i].value);
						}
						alert("alles gespeichert")
					},false);
					document.getElementById('close').addEventListener('click', function Setting_warner(){
						spendendiv.innerHTML = '';
						start()
					},false);
				},false);



document.getElementById('an').addEventListener('click', function starten() {
	var plu1 = document.getElementById('plun').value;	

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/stock/plunder/change/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_plunder='+plu1+''),
		onload: function(responseDetails)
     	{
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/stock/plunder/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=1'),
		onload: function(responseDetails){
                	var content = responseDetails.responseText;
			var ange = content.split('<h3>Angelegt</h3>')[1].split('</div>')[0];

			var angelegt = ange.split('<h4>')[1].split('<h4>')[0];


			var bild = ange.split('src="')[1].split('"')[0];

			var texxt = angelegt.split('>')[1].split('<')[0];

			var texxt2 = ange.split('class="zclear">')[1].split('</ul>')[0];

			document.getElementById('id1').innerHTML = '<a href="/stock/plunder/"><img src="'+bild+'"</img></a><br><font style=\"color:'+GM_getValue("einstellungenpa2")+'; font-size:100%;\">'+texxt+'<br>'+texxt2+'</font>';
	}});
    	 }

 	 });	
}, false);









document.getElementById('be').addEventListener('click', function starten() {
	var plu2 = document.getElementById('plun').value;	
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/stock/plunder/use/'+plu2+'/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=1'),
		onload: function(responseDetails){
                	var content = responseDetails.responseText;
			alert("Habe benutzbaren Plunder mit der iod "+plu2+" benutzt");
	}});
}, false);







	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/fight/overview/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=1'),
		onload: function(responseDetails){
                	var content = responseDetails.responseText;

			try{
				var tempo = content.split('Deine Kampfkraft')[1].split('</span></a>')[0];

				var att = tempo.split('ATT:')[1].split('<br')[0];

				var benutzbar = tempo.split('Noch')[1].split('mal')[0];

				document.getElementById('id2').innerHTML = 'Habe durch Plunder <br> + '+att+' Att  '+benutzbar+' X Benutzbar';
			}catch(e){}
	}});
}
}});
}


