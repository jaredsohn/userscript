// ==UserScript==
// @name           Fightlog durchsuche ( Version 2 ) Pennergame 4.0 By Basti1012
// @namespace      http://pennerhack.foren-city.de basti102. Das script sucht nach banden penner geld punkte und co in den fightlog
// @include        */fight/fightlog/*
// @exclude *board*
// ==/UserScript==

var url = document.location.href;
// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var town ='hamburg';
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
var town ='berlin';
}


function FormatDate(DateToFormat) {
	var year = "";
	var month = "";
	var day = "";

	year = DateToFormat.getFullYear();
	month = DateToFormat.getMonth() + 1;
	month = "0" + month;
	if (month.length == 3) { 
		month = month.substr(1,2);
	}
	day = "0" + DateToFormat.getDate();
	if (day.length == 3) {
		day = day.substr(1,2);
	}

	return year + "-" + month + "-" + day;
}




function CheckForUpdate() {
	var today = new Date();
	var tagesdatum = FormatDate(today);
	if (GM_getValue("LastScriptUpdateCheck","") != tagesdatum) {
		GM_xmlhttpRequest({
			method: 'GET', 
			url: "http://userscripts.org/scripts/show/66897", 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var scriptversion = content.split("durchsuche ( Version ")[1];
				var scriptfullversion = scriptversion.split(" ) Pennergame 4.0 By")[0];
				if (scriptfullversion !=2) {


					document.getElementById('logo').innerHTML = 'Es gibt eine neue Version des Skriptes Lets Fight Kampflogdurchsuche Bitte lade die Aktuelle Version runter um immer auf den neusten Stand zu sein Hinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.';
					document.getElementById('logo').style.backgroundColor = "red";
					window.location.href ="http://userscripts.org/scripts/source/66897.user.js";
				}else{}
			}
		});
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}
CheckForUpdate()

var wiesuche = ''
+'<a class="tooltip" href="#">[?]<span> <font style=\"color:yellow;\"><u><strong>Such information und anleitung :</strong></u></font><br><br>'

 
+'<strong>1.</strong> Suche nach Pennern einfach namen oder Teil des Names eingeben und suchen ,das Script findet auch Leute wenn man nur ein Paar Buchstaben angeben tut.'
+'<br><br><strong>2.</strong> Suche nach Banden ,Hinweisse von Punkt 1 beachten.'
+'<br><br><strong>3.</strong> Suche nach Datum.man kann zb das ganze Datum angeben wie 12.12 oder auch Teil Datum um nach Dezember zu suchen dann einfach ( .12 )(Punkt beachten sonst findet er auch Tage mit 12) eingeben.Das gleiche ist mit Uhrzeit zb (12:) f&uuml;r  12 uhr oder (:12) f&uuml;r 12 Minuten .'
+'<br><br><strong>4.</strong> Suche nach Geld .Man kann einen Betrag eingeben nach dem er suchen tut .Man kann aber auch nur ein Plus (+) oder ein minus (-) eingeben um so Gewinn und verlust suchen.'
+'<br><br><strong>5.</strong> Suche nach Punkte.Hiweiss von Punkt 4 beachten ,weil gleiche Funktion.'
+'<br><br><strong>6.</strong> Suche nach Status( Icons die vor jeden Fight abgebildet sind ,Gewonnen verloren und co ).'
+'Dazu siehst du hier die Bilder und die erkl&auml;rungen dazu.'
+'Um nach Gegnern zu suchen die bestimmten Status hatten muss man bestimmte sachen eingeben,weil das Script den quelltext durchsucht und im Quelltext nur verschiedene BilderLinks sind .(deshalb habe ich etwas umgebaut damit die suche jeder verstehen kann weil euch zu erl&auml;ren was man sonst eingeben muss w&uuml;rde jetzt zu lange dauern .'
+'Vor den Jeweiligen Bild steht der Suchcode( in gelb dargestellt )  den ihr in der Suche eingeben m&uuml;sst.'

+'<br><br><font style=\"color:yellow;\"><u>0_0</u></font><img src="http://static.pennergame.de/img/pv4/dots/0_0.gif" alt="" border="0"> Du hast angegriffen und hast  Kampfverloren'
+'<br><font style=\"color:yellow;\"><u>0_1</u></font><img src="http://static.pennergame.de/img/pv4/dots/0_1.gif" alt="" border="0"> Du wurdest angegriffen und hast  Kampfverloren'

+'<br><font style=\"color:yellow;\"><u>2_0</u></font><img src="http://static.pennergame.de/img/pv4/dots/2_0.gif" alt="" border="0"> Du hast angegriffen und unentschieden gefightet'
+'<br><font style=\"color:yellow;\"><u>2_1</u></font><img src="http://static.pennergame.de/img/pv4/dots/2_1.gif" alt="" border="0"> Du wurdest angegriffen und unentschieden gefightet'
+'<br><font style=\"color:yellow;\"><u>1_0</u></font><img src="http://static.pennergame.de/img/pv4/dots/1_0.gif" alt="" border="0"> Du hast angegriffen und hast Kampf verloren '
+'<br><font style=\"color:yellow;\"><u>1_1</u></font><img src="http://static.pennergame.de/img/pv4/dots/1_1.gif" alt="" border="0"> Du wurdest angegriffen und hast Kampf verloren '
+'<br><font style=\"color:yellow;\"><u>evade</u></font><img src="http://static.pennergame.de/img/pv4/dots/evade.gif" alt="" border="0"> Der Spieler ist ausgewichen es gibt kein ergebniss</span></a>';


var wassuche = ''+wiesuche+'<select name=\"suchoption\">'


+'<option value=\"1\">Status</option>'
+'<option value=\"2\">Datum</option>'
+'<option value=\"3\">Penner</option>'
+'<option value=\"4\">Bande</option>'
+'<option value=\"5\">Geld</option>'
+'<option value=\"6\">Punkte</option></select>';



var tbody = document.getElementsByClassName('tiername')[0];
tbody.innerHTML = ''
+'Einfach Bandenname,Pennernamen,Datum ,Pennerid oder Fightstatus eingeben und das Script durchsucht euren Fightlog nach euren angaben.<br><center>Suche nach was : '+wassuche+'  Suchbegriff : <input type="text" id="text1" name="text1" value=""><input type="button" id="button1" name="button1" value="Suche nach alles " ></center><div id="sbalkie" name="sbalkie" </div>';

document.getElementById('button1').addEventListener('click', function waschen(){


	bandesuche = document.getElementsByName('text1')[0].value;
	suchoption = document.getElementsByName('suchoption')[0].value;
	tab1 = document.getElementsByClassName('tieritemA')[0];
	tab2 = tab1.getElementsByTagName('table')[0];
	tab2.innerHTML = 'Gegner oder Banden die das Suchwort <strong>'+bandesuche+'</strong> beinhalten';

	var body_split = document.body.innerHTML.split('/fight/fightlog/1/"><strong>');
	var body_split_2 = body_split[1].split('</strong>');
	var seiten = body_split_2.length-1;
	i=1;
	GM_setValue("l", "0")
	nochmal(i)

	function nochmal(i){
		if(i<=seiten){


			var Stadterg = Math.round((100/seiten)*1)/1
			var balkie1 = Math.round((Stadterg*i)*10)/10

var balkie1 = ((100/seiten)*i);

			var balkie = balkie1*6;

			document.title = '[Suche bei '+balkie1+' % ] Copyright by Basti1012';

			document.getElementsByName('sbalkie')[0].innerHTML = '<div class="processbar_bg" style="width: 600px;"><div id="active_process2" class="processbar" style="width: '+balkie+'px;"><center><h2>'+balkie1+' % </h2></center></div></div>';
			GM_xmlhttpRequest({
  				method: 'GET',
   				url: ""+link+"/fight/fightlog/"+i+"/",
        			onload: function(responseDetails) {
        				var acontent = responseDetails.responseText;
					var table = acontent.split('<strong>Erweiterte Kampflog</strong>')[1];			
					var table3 = table.split('</tbody>')[0];	
					for(x=3;x<=22;x++){
						try{
							var table1 = table3.split('<tr')[x];			
							var table12 = table1.split('</tr>')[0];	

							var table122 = table12.split('<td>')[1];			
							var s = table122.split('</td>')[0];	
if(suchoption==1){
var suche = s.search(bandesuche);
if (suche != -1) {
angaben (table12)
}}
							var table133 = table12.split('<td>')[2];			
							var ss = table133.split('</td>')[0];
if(suchoption==2){
var suche = ss.search(bandesuche);
if (suche != -1) {
angaben (table12)
}}
							var table1333 = table12.split('<td>')[3];			
							var sss = table1333.split('</td>')[0];
if(suchoption==3){
var suche = sss.search(bandesuche);
if (suche != -1) {
angaben (table12)
}}






							var table13333 = table12.split('<td>')[4];			
							var ssss = table13333.split('</td>')[0];
if(suchoption==4){
var suche = ssss.search(bandesuche);
if (suche != -1) {
angaben (table12)
}}




							var table133333 = table12.split('<td>')[5];			
							var sssss = table133333.split('</td>')[0];
if(suchoption==5){
var suche = sssss.search(bandesuche);
if (suche != -1) {
angaben (table12)
}}
							var table1333333 = table12.split('<td>')[6];			
							var ssssss = table1333333.split('</td>')[0];

if(suchoption==6){
var suche = ssssss.search(bandesuche);
if (suche != -1) {
angaben (table12)
}}



}catch(e){}
}
i++;
nochmal(i);
		
				}
			});
		}
	}






























							function angaben (table12){

							var table122 = table12.split('<td>')[1];			
							var s = table122.split('</td>')[0];	

							var table133 = table12.split('<td>')[2];			
							var ss = table133.split('</td>')[0];

							var table1333 = table12.split('<td>')[3];			
							var sss = table1333.split('</td>')[0];

							var table13333 = table12.split('<td>')[4];			
							var ssss = table13333.split('</td>')[0];

							var table133333 = table12.split('<td>')[5];			
							var sssss = table133333.split('</td>')[0];

							var table1333333 = table12.split('<td>')[6];			
							var ssssss = table1333333.split('</td>')[0];

							l = GM_getValue("l");
							l++;
							GM_setValue("l", l);
							anzeigen(s,ss,sss,ssss,sssss,ssssss);
							}

































function anzeigen(s,ss,sss,ssss,sssss,ssssss){

tab2.innerHTML += ''
					+'<table class="list" border="1" width="960"><tbody><tr bgcolor="#272727">'
					+'<th align="center" width="30">'+GM_getValue("l")+'</th>'
					+'<th align="center" width="30">'+s+'</th>'
					+'<th align="center" width="160">'+ss+'</th>'
					+'<th align="center" width="160">'+sss+'</th>'
					+'<th align="center" width="260">'+ssss+'</th> '
					+'<th align="center" width="160">'+sssss+'</th>'
					+'<th align="center" width="160">'+ssssss+'</th>'
					+'</tr></tbody></table>';
}
},false);



// copyright by basti1012