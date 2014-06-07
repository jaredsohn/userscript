// ==UserScript==
// @name           Pennergame 4.0 schaltzentrale( Luxusversion 1.1) By Basti1012
// @namespace      pennerhack.foren-city.de basti1012
// @description    man kann ueber 40 functionen  ein und ausschalten und damit die funktinen von jeder seite benutzen und ausfuehren .Zb verkaufshilfe ,mit einen klick laesst sich alles unnutzbare verkaufen waffen flaschen instrumente,plunder spiele plunder . extra biuttons .ö alles einkaufen und verkaufen . ueber 20 extra buttons auswaehlbar . losebot spieleplunder verkaufrsbot.Extra buttons speicherbare links . angrifswarner bandenangrifswarner wiwu warner extra post warner alles mit oder ohne soun d waehlbar.
// @include        http://pennergame.de*
// @include        http://www.pennergame.de*
// ==/UserScript==


/*
noch geplanbe futers
Gewinn verlust beim lose kauf beim losebot

10 minuten button noich defekt
*/

spenden_date = new Array(8);
//Abstand oben
if(!GM_getValue("uhr0")||GM_getValue("uhr0")=='')
uhr0 = 10;
else
uhr0 = GM_getValue("uhr0");
//Abstand links


if(!GM_getValue("uhr1")||GM_getValue("uhr1")=='')
uhr1 = 825;
else
uhr1 = GM_getValue("uhr1");

var dragspendenobjekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;
var spenden_cache;

if(!document.getElementById("basti_setting")){
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'basti_setting');
	newdiv.setAttribute('style', 'height:0px;');
	newdiv.innerHTML = '<div id="basti_buttons"></div><div id="basti_text"></div>';
	document.getElementsByTagName('body')[0].appendChild(newdiv);
}
var newspan = document.createElement('span');
newspan.setAttribute('id', 'setting_spenden');
newspan.innerHTML = '<input type="button" name="spenden_setting" id="spenden" value="Optionen von Alles-K&ouml:nner" />';
document.getElementById("basti_buttons").appendChild(newspan);


var table_uhr_uhr = '<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr>'
+'<th colspan="4" style="border-bottom: 5px groove;">Settingbereich Alles-K&ouml;nner. by basti1012</th></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'<h1><b>Positsions Eintellungen</b></h1>'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'&nbsp;Abstand oben:&nbsp;'
+'<input name="uhr0"id="uhrtop" type="text" size="5" maxlength="15" value="'+uhr0+'">&nbsp;px<br />&nbsp;Abstand links:'
+'&nbsp;<input name="uhr1" id="uhrleft" type="text" size="5" maxlength="15" value="'+uhr1+'">&nbsp;px'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'



+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h1><b>Relod Zeit der Uhr in Sekunden</b></h1></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'

+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'&nbsp;<input name="relod" id="relod" type="text" size="5" value="relkodsen"> Sekunden</td>'
+'</td><td colspan="2" style="border-bottom: 5px groove;"></td></tr>'




+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h3><b>Verkaus hilfen Auswahl</b> </h3></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+' Waffen Verkauf anzeigen : <input type="checkbox" name="waschfoodcheck" id="waffe"/>'
+' Plunder Verkauf anzeigen :<input type="checkbox" name="waschfoodcheck" id="plunder"/>'
+'Spieleplunder Verkauf : <input type="checkbox" name="waschfoodcheck" id="spieleplunder"/><br>'
+' Instrumenten verkauf : <input type="checkbox" name="waschfoodcheck" id="instrument"/>'
+'Flaschen verkauf :<input type="checkbox" name="waschfoodcheck" id="flaschen"/>'
+'</td><td colspan="2" style="border-bottom: 5px groove;"></td></tr>'




+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h3><b>Andere Funktionen </b></h3></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'plöunder aktivieren :<input type="checkbox" name="waschfoodcheck" id="plunderaktiv"/>'
+'Banden Plunder Einzahlung  :<input type="checkbox" name="waschfoodcheck" id="bandenplunder"/>'
+'Plunder About all aktivieren  :<input type="checkbox" name="waschfoodcheck" id="plunderall"/><br>'
+'Bandenklassen einzahlung : <input type="checkbox" name="waschfoodcheck" id="bandenkasse"/>'
+'Lose bot : <input type="checkbox" name="waschfoodcheck" id="losebot"/>'
+'10 sammel button:<input type="checkbox" name="waschfoodcheck" id="zehnminuten"/>'




+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h3><b>Extra anzeigen </b></h3></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'

+'Flaschen menge anzeigen : <input type="checkbox" name="waschfoodcheck" id="flaschenanzahl"/>'
+'Gewinn durch verkauf anzeigen :<input type="checkbox" name="waschfoodcheck" id="flaschengewinn"/>'
+'angelegten Plunder anzeigen :<input type="checkbox" name="waschfoodcheck" id="angelegt"/><br>'
+'Plunder Werte anzeigen :<input type="checkbox" name="waschfoodcheck" id="angelegtwerte"/>'
+'Sauberkeitsdanzeige  anzeigen :<input type="checkbox" name="waschfoodcheck" id="sauber"/>'
+'att def werte:<input type="checkbox" name="waschfoodcheck" id="sauberbalken"/><br>'
+'kampfwert anzeige:<input type="checkbox" name="waschfoodcheck" id="kampfwert"/>'
+'Kampfwert anzeige att def <input type="checkbox" name="waschfoodcheck" id="kampfwert"/>'
+'kampfwert anzeige dex mitrechnen<input type="checkbox" name="waschfoodcheck" id="kampfwertdex"/><br>'
+'Att factor :<input type="text" name="att" id="att" size="3" value="'+GM_getValue("att")+'">'
+'Def Factor :<input type="text" name="def" id="def" size="3" value="'+GM_getValue("def")+'">'
+'Dex Factot :<input type="text" name="dex" id="dex" size="3" value="'+GM_getValue("dex")+'"><br>'
+'Haustier anzeige:<input type="checkbox" name="waschfoodcheck" id="haustiere"/>'
+'Haustier mit werten:<input type="checkbox" name="waschfoodcheck" id="haustierwerte"/>'
+'</td><td colspan="2" style="border-bottom: 5px groove;"></td></tr>'





+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h3><b>% Speicherbare Buttons zu externen Seiten</b></h3></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'fight gegner suche aktivieren:<input type="checkbox" name="waschfoodcheck" id="fightsuche"/><br>'
+'link 1  anzeige:<input type="checkbox" name="waschfoodcheck" id="link1"/>Link : <input type="text" name="link11" id="link11" value="'+GM_getValue("link1")+'"><br>'
+'link 2  anzeige:<input type="checkbox" name="waschfoodcheck" id="link2"/>Link : <input type="text" name="link22" id="link22" value="'+GM_getValue("link1")+'"><br>'
+'link 3  anzeige:<input type="checkbox" name="waschfoodcheck" id="link3"/>Link : <input type="text" name="link33" id="link33" value="'+GM_getValue("link1")+'"><br>'
+'link 4  anzeige:<input type="checkbox" name="waschfoodcheck" id="link4"/>Link : <input type="text" name="link44" id="link44" value="'+GM_getValue("link1")+'"><br>'
+'link 5  anzeige:<input type="checkbox" name="waschfoodcheck" id="link5"/>Link : <input type="text" name="link55" id="link55" value="'+GM_getValue("link1")+'"><br>'
+'</td><td colspan="2" style="border-bottom: 5px groove;"></td></tr>'





+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h3><b>dVerschiede Warner</b></h3></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'wi-wu-warner und wut   anzeige:<input type="checkbox" name="waschfoodcheck" id="wiwu"/>'


+'angriffswqarner  anzeige:<input type="checkbox" name="waschfoodcheck" id="angriff"/>'
+'banden kampf  anzeige:<input type="checkbox" name="waschfoodcheck" id="bkampf"/>'
+'nachrichten warner:<input type="checkbox" name="waschfoodcheck" id="sms"/><br>'
+'mit sound:<input type="checkbox" name="waschfoodcheck" id="wiwumusik"/>'
+'mit sound:<input type="checkbox" name="waschfoodcheck" id="angriffmusik"/>'
+'mit sound:<input type="checkbox" name="waschfoodcheck" id="bvkampfsound"/>'
+'mit sound:<input type="checkbox" name="waschfoodcheck" id="smssound"/>'
+'</td><td colspan="2" style="border-bottom: 5px groove;"></td></tr>'


+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h3><b>Extra buttons wo mit man nahrung zu sich nehmen kann</b></h3></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'

+'alle Essen trinke buttons aktivieren: <input type="checkbox" name="waschfoodcheck" id="essentrinkeneinnahme"/><br>'

+'Brot benutzen: <input type="checkbox" name="waschfoodcheck" id="brotbenutzen"/>'
+'Hambuhrger benutzen: <input type="checkbox" name="waschfoodcheck" id="hamburgerbenutzen"/>'
+'Currywurst : <input type="checkbox" name="waschfoodcheck" id="currybenutzen"/><br>'
+'stollen benutzen: <input type="checkbox" name="waschfoodcheck" id="stollenbenutzen"/>'
+'sueses benutzen: <input type="checkbox" name="waschfoodcheck" id="suessesdbenutzen"/>'
+'Bier benutzen: <input type="checkbox" name="waschfoodcheck" id="bierbenutzen"/><br>'
+'Wodka benutzen: <input type="checkbox" name="waschfoodcheck" id="wodkabenutzen"/>'
+'schnaps benutzen: <input type="checkbox" name="waschfoodcheck" id="schnapsbenutzen"/>'
+'wein benutzen: <input type="checkbox" name="waschfoodcheck" id="weinbenutzen"/>'
+'</td><td colspan="2" style="border-bottom: 5px groove;"></td></tr>'


+'<tr><td colspan="2" style="border-bottom: 5px groove;"><h3><b>Extra >Buttons zum nahrung kaufen</b></h3></td>'+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'

+'Alle essen trinken kauf Buttons  aktiviueren<input type="checkbox" name="waschfoodcheck" id="essen trinkenkaufen"/><br>'

+'Brot kaufen: <input type="checkbox" name="waschfoodcheck" id="brotkaufen"/>'
+'Hambuhrger kaufen: <input type="checkbox" name="waschfoodcheck" id="hamburgerkaufen"/>'
+'Currywurst kaufen: <input type="checkbox" name="waschfoodcheck" id="currykaufen"/><br>'
+'stollen kaufen: <input type="checkbox" name="waschfoodcheck" id="stollenkaufen"/>'
+'sueses kaufen: <input type="checkbox" name="waschfoodcheck" id="suessesdkaufen"/>'
+'Bier kaufen: <input type="checkbox" name="waschfoodcheck" id="bierkaufen"/><br>'
+'Wodka kaufen: <input type="checkbox" name="waschfoodcheck" id="wodkakaufen"/>'
+'schnaps kaufen: <input type="checkbox" name="waschfoodcheck" id="schnapskaufen"/>'
+'wein kaufen: <input type="checkbox" name="waschfoodcheck" id="weinkaufen"/>'
+'</td><td colspan="2" style="border-bottom: 5px groove;"></td></tr>'








+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'Teste Anzeige Uhr und Datum<input type="button" name="testuhr" id="testuhr" value="Alle angaen Speichern" /><br>'

+'<a style=\"color:red; font-size:80%;\"><b>Diesesd Script ist eind der Groessten Pennergame Scripte die es zur Zeit geben tut.<br>'
+'Einige Funktionen habe ich schon in der einstelölung und so schon eingebaut aber gehen noch nicht oder wurden noch nicht getestet.<br>'
+'10 Minuten Button zur zeit ohne Funktion.'
+'waffen und instrumente Verkauf noch ohne funktion.'
+'Alkle warner wurden noch nicht getestet ,also bnitte testen danke.'
+'Der sound aller warner wurde noch nicht eingebaut .'

+'Sachen die noch eingebaut werden .<br>'
+'Gwinn verlust rechnung nach kauf aller lose.'
+'Errechnung der benoetigten essens und trinkens ware um auf 0 oder 3 promille zu kommen .'
+'Behebeung aller recvhtschreib fehler.'
+'anpassen auf alle 4.0 games.'
+'<br><br><br>Ansonsten sollte alles gehen soweit .wer noch fehler findet soll sie bitte mir schreiben damit ich alles beheben kann.</b></a>'

+'<div id="testuhrr" </div><div id="testdatum" </div></td></tr></table>';

var newspan2 = document.createElement('span');
newspan2.setAttribute('id', 'uhr_uhr');
newspan2.setAttribute('style', 'display:none;');
newspan2.innerHTML = table_uhr_uhr;
document.getElementById("basti_text").appendChild(newspan2);


for(i=0;i<=55;i++){

document.getElementsByName("waschfoodcheck")[i].checked = GM_getValue("waschfoodcheck"+i);
}




document.getElementById('spenden').addEventListener('click', function Setting_spenden(){
	if(document.getElementById('uhr_uhr').style.display == ""){
		document.getElementById('uhr_uhr').style.display = 'none';
		document.getElementById('spenden').value = 'Spenden Setting';
	}else if(document.getElementById('uhr_uhr').style.display == "none"){
		document.getElementById('uhr_uhr').style.display = '';
		document.getElementById('spenden').value = 'Close uhr Setting';
	}
},false);






document.getElementById('testuhr').addEventListener('click', function save_spenden () {
for(i=0;i<=55;i++){
GM_setValue("waschfoodcheck"+i, document.getElementsByName("waschfoodcheck")[i].checked);
}

att = document.getElementById('att').value;
def = document.getElementById('def').value;
dex = document.getElementById('dex').value;

link11 = document.getElementById('link11').value;
link22 = document.getElementById('link22').value;
link33 = document.getElementById('link33').value;
link44 = document.getElementById('link44').value;
link55 = document.getElementById('link55').value;

GM_setValue("link1", link11);
GM_setValue("link2", link22);
GM_setValue("link3", link33);
GM_setValue("link4", link44);
GM_setValue("link5", link55);

GM_setValue("att", att);
GM_setValue("def", def);
GM_setValue("dex", dex);

location.reload();
},false);




// ------------------------------Plunder der in meinenb besitz drop down leriste erstellen -------------------------
host = 'http://'+window.location.hostname
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+host+"/gang/stuff/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('Plunder einzahlen')[1];			
			var table2 = table.split('Anzahl:')[0];	
			var table5 = table2.split('<select name="pid" id="pid">')[1];			
			var table6 = table5.split('</select>')[0];	
			var plunder = '<select name="plunderid" id="plunderid" >'+table6+'</select>';
GM_setValue("plunder", plunder)
}});

// ----------------------  waffen besitz drop down erstellen -----------------------------------------------------
GM_xmlhttpRequest({
	method: 'GET',
  	url: 'http://www.pennergame.de/stock/armoury/',
	onload: function(responseDetails) {
		var contenta = responseDetails.responseText;
		for(x=1;x<=10;x++){
			try{
				scheckfeld = contenta.split('http://www.pennergame.de/stock/armoury/use/')[x].split('</table>')[0];
				waffe = scheckfeld.split('class="tiername">')[1].split('</span>')[0];
				geld = scheckfeld.split('value="F&uuml;r &euro;')[1].split(' verkaufen')[0];
				id = scheckfeld.split('value="')[1].split('"')[0];
 				var was = ''+waffe+' Für '+geld+' Verkaufen';
				var suche = scheckfeld.search('verkaufen');
				if (suche != -1) {
					GM_setValue("waffe" + x, was);
					GM_setValue("id" + x, id);
				}else{
					GM_setValue("stadtid" + x, "SSSAAA");
					GM_setValue("stadtname" + x, "SSSAAA");
				}
			}catch(e){
			GM_setValue("stadtname" + x,"SSSAAA");
			GM_setValue("stadtid" + x,"SSSAAA");
			}
		}
var waffena = ''
	+'<select id="waffen" name="waffen">'
	+'<option value="'+GM_getValue("id1")+'">'+GM_getValue("waffe1")+'</option>'
	+'<option value="'+GM_getValue("id2")+'">'+GM_getValue("waffe2")+'</option>'
	+'<option value="'+GM_getValue("id3")+'">'+GM_getValue("waffe3")+'</option>'
	+'<option value="'+GM_getValue("id4")+'">'+GM_getValue("waffe4")+'</option>'
	+'<option value="'+GM_getValue("id5")+'">'+GM_getValue("waffe5")+'</option>'
	+'<option value="'+GM_getValue("id6")+'">'+GM_getValue("waffe6")+'</option>'
	+'<option value="'+GM_getValue("id7")+'">'+GM_getValue("waffe7")+'</option>'
	+'<option value="'+GM_getValue("id8")+'">'+GM_getValue("waffe8")+'</option>'
	+'<option value="'+GM_getValue("id9")+'">'+GM_getValue("waffe9")+'</option>'
	+'<option value="'+GM_getValue("id10")+'">'+GM_getValue("waffe10")+'</option>'


+'</select>'
+'</div></div>';

waffena = waffena.replace(/<option value="SSS/g,"");
waffena = waffena.replace(/AAA</g,"");
waffena = waffena.replace(/AAA">SSS/g,"");
waffena = waffena.replace(/<option value="undefi/g,"");
waffena = waffena.replace(/ned</g,"");
waffena = waffena.replace(/ned">undefi/g,"");
GM_setValue("waffena" ,waffena);
}});

// ---------------------------- instrumenten drop down erstellen -----------------------------------------------------

GM_xmlhttpRequest({
	method: 'GET',
  	url: 'http://www.pennergame.de/stock/instruments/',
	onload: function(responseDetails) {
		var contenta = responseDetails.responseText;
		for(x=1;x<=13;x++){
			try{
				scheckfelda = contenta.split('http://www.pennergame.de/stock/instruments/use/')[x].split('</table>')[0];
				musi = scheckfelda.split('class="tiername">')[1].split('</span>')[0];
				gelda = scheckfelda.split('value="F&uuml;r &euro;')[1].split(' verkaufen')[0];
				idmusik = scheckfelda.split('value="')[1].split('"')[0];
 				var wass = ''+musi+' Für '+gelda+' Verkaufen';
				var suche = scheckfeld.search('verkaufen');
				if (suche != -1) {
					GM_setValue("musik" + x, wass);
					GM_setValue("d" + x, idmusik);
				}else{
					GM_setValue("stadtid" + x, "SSSAAA");
					GM_setValue("stadtname" + x, "SSSAAA");
				}
			}catch(e){
			GM_setValue("stadtname" + x,"SSSAAA");
			GM_setValue("stadtid" + x,"SSSAAA");
			}
		}

var waffenaa = ''
	+'<select id="musik" name="musik">'
	+'<option value="'+GM_getValue("d1")+'">'+GM_getValue("musik1")+'</option>'
	+'<option value="'+GM_getValue("d2")+'">'+GM_getValue("musik2")+'</option>'
	+'<option value="'+GM_getValue("d3")+'">'+GM_getValue("musik3")+'</option>'
	+'<option value="'+GM_getValue("d4")+'">'+GM_getValue("musik4")+'</option>'
	+'<option value="'+GM_getValue("d5")+'">'+GM_getValue("musik5")+'</option>'
	+'<option value="'+GM_getValue("d6")+'">'+GM_getValue("musik6")+'</option>'
	+'<option value="'+GM_getValue("d7")+'">'+GM_getValue("musik7")+'</option>'
	+'<option value="'+GM_getValue("d8")+'">'+GM_getValue("musik8")+'</option>'
	+'<option value="'+GM_getValue("d9")+'">'+GM_getValue("musik9")+'</option>'
	+'<option value="'+GM_getValue("d10")+'">'+GM_getValue("musik10")+'</option>'

+'</select>'
+'</div></div>';
waffenaa = waffenaa.replace(/<option value="SSS/g,"");
waffenaa = waffenaa.replace(/AAA</g,"");
waffenaa = waffenaa.replace(/AAA">SSS/g,"");
waffenaa = waffenaa.replace(/<option value="undefi/g,"");
waffenaa = waffenaa.replace(/ned</g,"");
waffenaa = waffenaa.replace(/ned">undefi/g,"");
GM_setValue("waffenaa" ,waffenaa);
}});



if(!document.getElementById('spendendiv')){
var spendendiv = document.createElement('div');
spendendiv.setAttribute('id', 'spendendiv');
spendendiv.setAttribute('align', 'middle');
spendendiv.setAttribute('style', 'position:absolute; top:'+uhr0+'px; left:'+uhr1+'px; z-index:50; font-size:15px; cursor:move;');
spendendiv.innerHTML = '<font color="white"><div id="status1" name="status1"</div>'

+'<a id="bandenkasse" name="bandenkasse"</a>'
+'<a id="waffe" name="waffe"</a>'
+'<a id="instrument" name="instrument"</a>'
+'<a id="spieleplunder" name="spieleplunder"</a>'
+'<a id="plunder" name="plunder"</a>'
+'<a id="flaschen" name="flaschen"</a>'
+'<a id="flaschenmenge" name="flaschenmenge"</a><br>'
+'<a id="flaschengewinn" name="flaschengewinn"</a>'
+'<a id="angelegt" name="angelegt"</a><br>'
+'<a id="angelegtwerte" name="angelegtwerte"</a><br>'
+'<a id="attdefdex" name="attdefdex"</a><br>'
+'<a id="kampfwert" name="kampfwert"</a><br>'
+'<div id="sauberbalken" name="sauberbalken"</div><br>'
+'<a id="haustier" name="haustier"</a><br>'
+'<a id="haustierwerte" name="haustierwerte"</a><br>'
+'<a id="gegner" name="gegner"</a><br>'
+'<a id="link1" name="link1"</a><br>'
+'<a id="link2" name="link2"</a><br>'
+'<a id="link3" name="link3"</a><br>'
+'<a id="link4" name="link4"</a><br>'
+'<a id="link5" name="link5"</a><br>'
+'<a id="zehnminuten" name="zehnminuten"</a><br>'
+'<a id="losee" name="losee"</a><br>'







+'<a id="Brotkaufen" name="Brotkaufen"</a><br>'
+'<a id="Hambuhrgerkaufen" name="Hambuhrgerkaufen"</a><br>'
+'<a id="Currywurstkaufen" name="Currywurstkaufen"</a><br>'
+'<a id="stollenkaufen" name="stollenkaufen"</a><br>'
+'<a id="sueseskaufen" name="sueseskaufen"</a><br>'
+'<a id="Bierkaufen" name="Bierkaufen"</a><br>'
+'<a id="Wodkakaufen" name="Wodkakaufen"</a><br>'
+'<a id="schnapskaufen" name="schnapskaufen"</a><br>'
+'<a id="weinkaufen" name="weinkaufen"</a><br>'


+'<a id="Brotessen" name="Brotessen"</a><br>'
+'<a id="Hambuhrgeressen" name="Hambuhrgeressen"</a><br>'
+'<a id="Currywurstessen" name="Currywurstessen"</a><br>'
+'<a id="stollenessen" name="stollenessen"</a><br>'
+'<a id="suesesessen" name="suesesessen"</a><br>'
+'<a id="Bieressen" name="Bieressen"</a><br>'
+'<a id="Wodkaessen" name="Wodkaessen"</a><br>'
+'<a id="schnapsessen" name="schnapsessen"</a><br>'
+'<a id="weinessen" name="weinessen"</a><br>'


+'<a id="wiwu" name="wiwu"</a><br>'
+'<a id="sms" name="sms"</a><br>'
+'<a id="bfight" name="bfight"</a><br>'
+'<a id="pfight" name="pfight"</a><br>'





+'<br>'
+'</font>';
document.body.appendChild(spendendiv);
}


	
if(document.getElementsByName("waschfoodcheck")[27].checked){

try{
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+host+'/gang/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
         var ges = content.split('<tr align="left" valign="top">')[2];
         var ges2 = ges.split('<tr align="left" valign="top">')[0];

	 GM_xmlhttpRequest({
   		method:"GET",
   		url: ''+host+'/stock/bottle/',
   		onload:function(responseDetails) {
   			content = responseDetails.responseText;
try{
   			ist1 = content.split('Wirtschaftswunder ')[1];
   			ist = ist1.split(' aktiv')[0];
			if(document.getElementsByName("waschfoodcheck")[28].checked){
				alert("wi wu mit sounbd");
				document.getElementsByName("wiwu")[0].innerHTML = ges2+ist;
			}else{
				document.getElementsByName("wiwu")[0].innerHTML = ges2+ist;
			}
}catch(e){
document.getElementsByName("wiwu")[0].innerHTML = 'Wi-wu warner aktiuv';

}
		}
	});
	}
});
}catch(e){
//document.getElementsByName("wiwu")[0].innerHTML = 'Wi-wu warner aktiuv';

}
}


















if(document.getElementsByName("waschfoodcheck")[29].checked){
GM_xmlhttpRequest({
	method: 'GET',
	url: ''+host+'/fight/overview/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/warning/)){
           	 	var part = content.split("warning")[1].split("<td>")[1];
            		var timee = part.split("</td>")[0];
			if(document.getElementsByName("waschfoodcheck")[30].checked){
				document.getElementsByName("pfight")[0].innerHTML = 'kampf endet an '+timee+'';
			}else{
				document.getElementsByName("pfight")[0].innerHTML = 'kampf endet an '+timee+' mit sound';
			}
		}
		document.getElementsByName("pfight")[0].innerHTML = 'angrifswarner aktiv';
	}
});
}























if(document.getElementsByName("waschfoodcheck")[31].checked){
	GM_xmlhttpRequest({
		method:"GET",
		url: ''+host+'/gang/fight/',
		onload:function(responseDetails) {
			content = responseDetails.responseText;
			if(content.match(/Keine laufenden/)|| content.match(/Aucun combat en cours/) || content.match(/cych sie walk/)|| content.match(/No current ones./)){
				document.getElementsByName("bfight")[0].innerHTML = 'Banden angrifswarner aktiv';
			}else{
			try{
				binfob = content.split('<a href="/gang/fight/view/')[1];
				binfo1b = binfob.split('/">Details</a>')[0];
				GM_xmlhttpRequest({
					method:"GET",
					url: ''+host+'/gang/fight/view/'+binfo1b+'/',
					onload:function(responseDetails) {
						content = responseDetails.responseText;
						gegner1 = content.split('style="vertical-align:middle;">')[1];// eigener bandenname
						gegner11 = gegner1.split('</span></div></td>')[0];
						gegnera1 = content.split('style="vertical-align:middle;">')[2];// gegner sein name
						gegnera11 = gegnera1.split('</span></div></td>')[0];
						erge1 = content.split('align="center"><span style="vertical-align:middle; font-size:16px">')[1];// eigene punkte von kampf
						erge11 = erge1.split('</span></div></td>')[0];
						ergea1 = content.split('align="center"><span style="vertical-align:middle;  font-size:16px">')[1];// generische punkte von kampf
						ergea11 = ergea1.split('</span></div></td>')[0];
						var suche = content.search("Status der besten Bande in");
							if(suche != -1){
								var wichtig1 = '(Kampf um besten Platz)';
							}else{
								var wichtig1 = '(unwichtig)';
							}
							GM_xmlhttpRequest({
								method:"GET",
								url: ''+host+'/highscore/gang/?gang='+gegner11+'&min=&max=',
								onload:function(responseDetails) {
									content = responseDetails.responseText;
									try{
										linka1 = content.split('class="col2">')[1];
										linkb1 = linka1.split('</td>')[0];
									}catch(e){}

if(document.getElementsByName("waschfoodcheck")[32].checked){
	document.getElementsByName("bfight")[0].innerHTML = ''
	+'<font style=\"color:red; font-size:120%;\"><b>'+gegner11+linkb1+' </b></font>'
	+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
	+'<font style=\"color:red; font-size:120%;\"><b> '+erge11+'</b></font><br>'
	+'<font style=\"color:green; font-size:120%;\"><b>Punkte von:</b></font><br>'
	+'<font style=\"color:red; font-size:120%;\"><b>'+gegnera11+' </b></font>'
	+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
	+'<font style=\"color:red; font-size:120%;\"><b> '+ergea11+'</b></font><br>'
	+'<font style=\"color:blue; font-size:120%;\"><b>'+wichtig1+'</b></font>';

}else{
document.getElementsByName("bfight")[0].innerHTML = ';mit sound'
	+'<font style=\"color:red; font-size:120%;\"><b>'+gegner11+' </b></font>'
	+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
	+'<font style=\"color:red; font-size:120%;\"><b> '+erge11+'</b></font><br>'
	+'<font style=\"color:green; font-size:120%;\"><b>Punkte von:</b></font><br>'
	+'<font style=\"color:red; font-size:120%;\"><b>'+gegnera11+' </b></font>'
	+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
	+'<font style=\"color:red; font-size:120%;\"><b> '+ergea11+'</b></font><br>'
	+'<font style=\"color:blue; font-size:120%;\"><b>'+wichtig1+'</b></font>';
}
								}
							});
						}
					});
				}catch(e){}
			}
		}
	})
}








// nachrichten warner aktivieren auslesen und wieder anzeige n ------------------------------------------------------






if(document.getElementsByName("waschfoodcheck")[33].checked){
	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+host+'/messages/',
		onload: function(gangresponseDetails) {
			var gangcontent = gangresponseDetails.responseText;
				smsfeld = gangcontent.split('<h1>Posteingang</h1>')[1].split('/messages/delete_all/')[0];
		document.getElementsByName("sms")[0].innerHTML = 'smswarner aktiv';
				for(x=1;x<=21;x++){
					try{
						scheckfeld = smsfeld.split('class="msglist')[x].split('</tr>')[0];
						if(scheckfeld.match(/unread.gif/)){
							id = scheckfeld.split('/messages/read/')[1].split('/')[0];
							GM_xmlhttpRequest({
								method: 'GET', 
								url: ''+host+'/messages/read/'+id+'/',
								onload: function(gangresponseDetails) {
									var gangcontent = gangresponseDetails.responseText;
									smsfel0 = gangcontent.split('Nachricht lesen')[1].split('/messages/delete/')[0];
									smsfel1 = smsfel0.split('href="/profil/')[1].split('/a>')[0];
									id1 = smsfel1.split('id:')[1].split('/')[0];
									name = smsfel1.split('/">')[1].split('<')[0];
									nachricht = smsfel0.split('<p>')[1].split('</p>')[0];
									betreff = smsfel0.split('<strong>')[1].split('</strong>')[0];



		if(document.getElementsByName("waschfoodcheck")[34].checked){
			document.getElementsByName("sms")[0].innerHTML = '<h2>Nachricht von </h2><a href="'+host+'/messages/read/'+id+'/"><span style=\"color:orange;"><b>'+name+'</b></span></a><a class="tooltip" href="/help/ATT/">[neue nachricht erhalten]<span><font style=\"color:orange;"><b>Betreff :</b></font><br>'+betreff+'<span><font style=\"color:orange;"><b>Nachrichten inhalt :</b></font><br>'+nachricht+'</span></a>';
		}else{
			document.getElementsByName("sms")[0].innerHTML = '<h2>Nachricht von mit sound</h2><a href="'+host+'/messages/read/'+id+'/"><span style=\"color:orange;"><b>'+name+'</b></span></a><a class="tooltip" href="/help/ATT/">[neue nachricht erhalten]<span><font style=\"color:orange;"><b>Betreff :</b></font><br>'+betreff+'<span><font style=\"color:orange;"><b>Nachrichten inhalt :</b></font><br>'+nachricht+'</span></a>';
		}




								}
							});
						}
					}catch(e){
					break;
					}





				}
			}
		});

} 



















if(document.getElementsByName("waschfoodcheck")[46].checked){
if(document.getElementsByName("waschfoodcheck")[47].checked){
document.getElementsByName("Hambuhrgeressen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen2" name="Brotessen2" size="2" value="1"><input type="button" id="brotessenklick2"  name="brotessenklick2" value="humburger essen" >';
document.getElementsByName('brotessenklick2')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen2').value;
promill = '200';
aszusivchnehmen = 'hamburger';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '4';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}
if(document.getElementsByName("waschfoodcheck")[48].checked){
document.getElementsByName("Currywurstessen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen3" name="Brotessen3" size="2" value="1"><input type="button" id="brotessenklick3"  name="brotessenklick3" value="currywurszt essen" >';
document.getElementsByName('brotessenklick3')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen3').value;
promill = '100';
aszusivchnehmen = 'Currywurst';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '3';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}
if(document.getElementsByName("waschfoodcheck")[49].checked){
document.getElementsByName("stollenessen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen4" name="Brotessen4" size="2" value="1"><input type="button" id="brotessenklick4"  name="brotessenklick4" value="stollen essen" >';
document.getElementsByName('brotessenklick4')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen4').value;
promill = '200';
aszusivchnehmen = 'stollen';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '4';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}
if(document.getElementsByName("waschfoodcheck")[50].checked){
document.getElementsByName("suesesessen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen5" name="Brotessen5" size="2" value="1"><input type="button" id="brotessenklick5"  name="brotessenklick5" value="suesses essen" >';
document.getElementsByName('brotessenklick5')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen5').value;
promill = '15';
aszusivchnehmen = 'suesses';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '9';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}

if(document.getElementsByName("waschfoodcheck")[54].checked){
document.getElementsByName("Brotessen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen9" name="Brotessen9" size="2" value="1"><input type="button" id="brotessenklick9"  name="brotessenklick9" value="Brot essen" >';
document.getElementsByName('brotessenklick9')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen9').value;
promill = '35';
aszusivchnehmen = 'brot';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '1';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}

if(document.getElementsByName("waschfoodcheck")[52].checked){
document.getElementsByName("Wodkaessen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen7" name="Brotessen7" size="2" value="1"><input type="button" id="brotessenklick7"  name="brotessenklick7" value="wodka essen" >';
document.getElementsByName('brotessenklick7')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen7').value;
promill = '250';
aszusivchnehmen = 'wodka';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '7';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}

if(document.getElementsByName("waschfoodcheck")[51].checked){
document.getElementsByName("Bieressen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen6" name="Brotessen6" size="2" value="1"><input type="button" id="brotessenklick6"  name="brotessenklick6" value="Bier essen" >';
document.getElementsByName('brotessenklick6')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen6').value;
promill = '35';
aszusivchnehmen = 'bier';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '2';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}

if(document.getElementsByName("waschfoodcheck")[53].checked){
document.getElementsByName("schnapsessen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen8" name="Brotessen8" size="2" value="1"><input type="button" id="brotessenklick8"  name="brotessenklick8" value="schnaps essen" >';
document.getElementsByName('brotessenklick8')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen8').value;
promill = '100';
aszusivchnehmen = 'schnaps';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '7';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}

if(document.getElementsByName("waschfoodcheck")[55].checked){
document.getElementsByName("weinessen")[0].innerHTML = '<a id="VERKAUFT1" name="VERKAUFT1"</a><br><input type="text" id="Brotessen10" name="Brotessen10" size="2" value="1"><input type="button" id="brotessenklick10"  name="brotessenklick10" value="gluehwein essen" >';
document.getElementsByName('brotessenklick10')[0].addEventListener('click', function weinkaufen () {
mengeb = document.getElementById('Brotessen10').value;

promill = '80';
aszusivchnehmen = 'gluehwein';
echnung = ((mengeb*promill)/100);
trinkentext = "Du hast gerade durch "+aszusivchnehmen+" saufen "+echnung+" Promille zu dir genommen\nGuten durst dabei mfg basti1012";
id = '10';
essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id)
},false);
}
}

function essengewhen(mengeb,trinkentext,aszusivchnehmen,promill,id){
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+host+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item='+aszusivchnehmen+'&promille='+promill+'&id='+id+'&menge='+mengeb),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert (trinkentext);
      }
  });

}

// brot kaufen daten sammeln und sendern
if(document.getElementsByName("waschfoodcheck")[36].checked){
if(document.getElementsByName("waschfoodcheck")[37].checked){
document.getElementsByName("Brotkaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen1" name="brotkaufen1" value="1"><input type="button" id="brotkaufenklick1"  name="brotkaufenklick1" value="Brot kaufen" >';
document.getElementsByName('brotkaufenklick1')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen1').value;
einzelpreis 	= '1.70';
id 		= '2';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '170';
name 		= 'brot';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für Brot ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}



// hamburger kaufen daten sammeln und sendern 
if(document.getElementsByName("waschfoodcheck")[38].checked){
document.getElementsByName("Hambuhrgerkaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen2" name="brotkaufen2" value="1"><input type="button" id="brotkaufenklick2"  name="brotkaufenklick2" value="Hamburger kaufen" >';
document.getElementsByName('brotkaufenklick2')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen2').value;
einzelpreis 	= '5.00';
id 		= '4';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '500';
name 		= 'hamburger';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für hamburger ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}


// currywurstz kaufen daten sammeln und sendern 
if(document.getElementsByName("waschfoodcheck")[39].checked){
document.getElementsByName("Currywurstkaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen3" name="brotkaufen3" value="1"><input type="button" id="brotkaufenklick3"  name="brotkaufenklick3" value="Currywurst kaufen" >';
document.getElementsByName('brotkaufenklick3')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen3').value;
einzelpreis 	= '3.50';
id 		= '3';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '350';
name 		= 'currywurst';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für currywurst ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}



// stollen kaufen daten sammeln und sendern 
if(document.getElementsByName("waschfoodcheck")[40].checked){
document.getElementsByName("stollenkaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen4" name="brotkaufen4" value="1"><input type="button" id="brotkaufenklick4"  name="brotkaufenklick4" value="Stollen kaufen" >';
document.getElementsByName('brotkaufenklick4')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen4').value;
einzelpreis 	= '5.00';
id 		= '4';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '500';
name 		= 'stollen';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für stollen ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}



// suessikeit kaufen daten sammeln und sendern nn kaufen daten sammeln und sendern 
if(document.getElementsByName("waschfoodcheck")[41].checked){
document.getElementsByName("sueseskaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen5" name="brotkaufen5" value="1"><input type="button" id="brotkaufenklick5"  name="brotkaufenklick5" value="Sch&uuml;ssigkeiten kaufen" >';
document.getElementsByName('brotkaufenklick5')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen5').value;
einzelpreis 	= '0.40';
id 		= '9';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '040';
name 		= 'Halloween - S??igkeiten';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für Halloween - S??igkeiten ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}




if(document.getElementsByName("waschfoodcheck")[42].checked){
document.getElementsByName("Bierkaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen6" name="brotkaufen6" value="1"><input type="button" id="brotkaufenklick6"  name="brotkaufenklick6" value="Bier kaufen" >';
document.getElementsByName('brotkaufenklick6')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen6').value;
einzelpreis 	= '1.70';
id 		= '1';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '170';
name 		= 'bier';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für bier ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}




if(document.getElementsByName("waschfoodcheck")[43].checked){
document.getElementsByName("Wodkakaufen")[0].innerHTML ='<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen7" name="brotkaufen7" value="1"><input type="button" id="brotkaufenklick7"  name="brotkaufenklick7" value="Wodcka kaufen" >';
document.getElementsByName('brotkaufenklick7')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen7').value;
einzelpreis 	= '10.00';
id 		= '7';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '1000';
name 		= 'wodka';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für wodka ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}



if(document.getElementsByName("waschfoodcheck")[44].checked){
document.getElementsByName("schnapskaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen8" name="brotkaufen8" value="1"><input type="button" id="brotkaufenklick8"  name="brotkaufenklick8" value="Schnaps  kaufen" >';
document.getElementsByName('brotkaufenklick8')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen8').value;
einzelpreis 	= '2.20';
id 		= '8';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '220';
name 		= 'Grusel-Schnaps';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für Grusel-Schnaps ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);}





if(document.getElementsByName("waschfoodcheck")[45].checked){
document.getElementsByName("weinkaufen")[0].innerHTML = '<a id="VERKAUFT" name="VERKAUFT"</a><br><input type="text" id="brotkaufen9" name="brotkaufen9" value="1"><input type="button" id="brotkaufenklick9"  name="brotkaufenklick9" value="Wein kaufen" >';
document.getElementsByName('brotkaufenklick9')[0].addEventListener('click', function weinkaufen () {
mengebrot = document.getElementById('brotkaufen9').value;
einzelpreis 	= '2.00';
id 		= '10';
ergebniss 	= mengebrot*einzelpreis;
einzelcent 	= '200';
name 		= 'gleuhwein';
cat 		= '2';
oktext 		= 'Du hast gerade insgesamt '+ergebniss+' euro Für gleuhwein ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012';
einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext)
},false);
}
}

function einkaufen(mengebrot,einzelpreis,id,einzelcent,ergebniss,name,cat,oktext){
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+host+'/city/supermarket/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+mengebrot+'&id='+id+'&cat='+cat+'&preis='+einzelpreis+'&preis_cent='+einzelcent+'&inventar_name='+name+'&submitForm=F%C3%BCr+%E2%82%AC'+ergebniss+'+kaufen'),
      onload: function(responseDetails) 
	  { 

document.getElementsByName("VERKAUFT")[0].innerHTML = '<a style=\"color:red; font-size:100%;\">'
+'Habe gerade '+mengebrot+' '+name+' gekauft und dabei '+ergebniss+' ausgegeben </b></a>';
		 //window.location.reload();alert(oktext);
      }
  });

}



// ------------------- haustier werte und bild auslesen ------------------------------------------------------

if(document.getElementsByName("waschfoodcheck")[18].checked){
	GM_xmlhttpRequest({
  		method: 'GET',
   		url: ""+host+"/overview/",
      		  onload: function(responseDetails) {
        		var acontent = responseDetails.responseText;
				var tier = acontent.split('src="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/')[1];			
				var tier1 = tier.split('.jpg')[0];
				var tierbild = 	'<img class="icons" alt="angelgetes haustieer was dfu geryade hast" src="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/'+tier1+'.jpg" title="Aktuielles engelegtes haustier" width="80"></img>';				
				var tieratt = acontent.split('class="att">')[1];					
				var tieratt1 = tieratt.split('</span>')[0];
				var tierdef = acontent.split('class="def">')[1];					
				var tierdef1 = tierdef.split('</span>')[0];
				var tierdex = acontent.split('class="mitleid">')[1];					
				var tierdex1 = tierdex.split('</span>')[0];
				document.getElementsByName("haustier")[0].innerHTML = tierbild;
				if(document.getElementsByName("waschfoodcheck")[19].checked){
					document.getElementsByName("haustierwerte")[0].innerHTML = 'Att: '+tieratt1+' Def : '+tierdef1+' Mitleid : '+tierdex1+'';
				}
			}
	});
}

// -------------------  lets fight gegner suchen button .werte wspliuten einfuegenb fertig ----------------------------------


if(document.getElementsByName("waschfoodcheck")[20].checked){
var userpuznkjtre = document.getElementsByTagName('html')[0].innerHTML.split('Punkte:</span><span class="el2">')[1];
var punktre = userpuznkjtre.split('</span>')[0];
var bis = Math.floor(punktre*1.5);
var von = Math.floor(punktre*0.8);
document.getElementsByName("gegner")[0].innerHTML = ' <input type="button" id="gegner2"  name="gegner2" value="Gegner von '+von+' bis '+bis+' Punkte suchen " >';
document.getElementById('gegner2').addEventListener('click', function linkklickerwone() {
alert(von+bis);
window.location.href = '/highscore/user/?min='+von+'&max='+bis+'';
},false);
}


// ---------------- 5 buttopns mit speicherbaren links ----------------------------------------------------------

if(document.getElementsByName("waschfoodcheck")[21].checked){
document.getElementsByName("link1")[0].innerHTML = ' <input type="button" id="link1"  name="link1" value="'+GM_getValue("link1")+'" >';
document.getElementById('link1').addEventListener('click', function linkklickerwone() {
window.location.href = '+GM_getValue("link1")+';
},false);}

if(document.getElementsByName("waschfoodcheck")[22].checked){
document.getElementsByName("link2")[0].innerHTML = ' <input type="button" id="link2"  name="link2" value="'+GM_getValue("link2")+'" >';
document.getElementById('link2').addEventListener('click', function linkklickerwone() {
window.location.href = '+GM_getValue("link2")+';
},false);}

if(document.getElementsByName("waschfoodcheck")[23].checked){
document.getElementsByName("link3")[0].innerHTML = ' <input type="button" id="link3"  name="link3" value="'+GM_getValue("link3")+'" >';
document.getElementById('link3').addEventListener('click', function linkklickerwone() {
window.location.href = '+GM_getValue("link3")+';
},false);}

if(document.getElementsByName("waschfoodcheck")[24].checked){
document.getElementsByName("link4")[0].innerHTML = ' <input type="button" id="link4"  name="link4" value="'+GM_getValue("link4")+'" >';
document.getElementById('link4').addEventListener('click', function linkklickerwone() {
window.location.href = '+GM_getValue("link4")+';
},false);}

if(document.getElementsByName("waschfoodcheck")[25].checked){
document.getElementsByName("link5")[0].innerHTML = ' <input type="button" id="link5"  name="link5" value="'+GM_getValue("link5")+'" >';
document.getElementById('link5').addEventListener('click', function linkklickerwone() {
window.location.href = '+GM_getValue("link5")+';
},false);}



// -------------------------- 10 minuten bgutrtonn ----------------------------------------------------

if(document.getElementsByName("waschfoodcheck")[26].checked){
fbutton = document.getElementsByName("link5")[0].innerHTML = ' <input type="button" id="fbutton"  name="fbutton" value="10 Minuten sammel gehen" >';
document.getElementById('fbutton').addEventListener('click', function linkklickerwone() {
window.location.href ="/activities/";	
var finputButton = document.getElementsByName('Submit2')[0];
},false);
}



// ---------------------- lose auslesen unde bot schreiben --------------------------------------------

if(document.getElementsByName("waschfoodcheck")[35].checked){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+host+'/city/games/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Du kannst heute noch ')[1];
			var text2 = text1.split(' Lose kaufen')[0];
			document.getElementsByName("losee")[0].innerHTML = ' Du Kannst noch <a id="lbotanzeige" name="lbotanzeige"</a> Lose kaufen.<input type="text" name="losmenge" id="losmenge" value="'+text2+'"><input type="button" id="losbot"  name="losbot" value="Lose Bot starten " >';

			document.getElementById('losbot').addEventListener('click', function linkklickerwone() {
				losmenge1 = document.getElementsByName("losmenge")[0].value;
				menge = '10';
				losmenge = losmenge1/10;
				a=1;
				start(losmenge,a)

				function start(losmenge,a){
					if(a<=losmenge){
						GM_xmlhttpRequest({
       							 method: 'POST',
        						url: 'http://'+window.location.hostname+'/city/games/buy/',
       							 headers: 
        						{'Content-type': 'application/x-www-form-urlencoded'},
        						data: encodeURI('menge='+menge+'&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC'+menge+'.00+kaufen'),
        						onload: function(){

								GM_xmlhttpRequest({
  									method: 'GET',
   									url: ''+host+'/city/games/',
        								onload: function(responseDetails) {
        									var content = responseDetails.responseText;
										var text1 = content.split('Du kannst heute noch ')[1];
										var noch = text1.split(' Lose kaufen')[0];
										a++;
										document.getElementsByName("lbotanzeige")[0].innerHTML = noch;
										start(losmenge,a)
									}
								});
							}
						});
					}else{alert("Ihre angegeben Anzahl der Lose wurde gekauft")}
				}
			},false);
		}
	});
}





















































































































/*
if(document.getElementsByName("waschfoodcheck")[55].checked){
alerr("essen trinken kaufen aktivieren");


	if(akt == 0){
		var Pos = document.getElementsByClassName("icon beer")[0].innerHTML.indexOf(".");
		var Alk = document.getElementsByClassName("icon beer")[0].innerHTML.substr(Pos - 1, 4).replace(".", "");
		safenessen(Alk);
	}else{
		GM_xmlhttpRequest({
			method: 'GET',
			url: host+'/overview/',
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var content_split = content.split('icon beer')[1].split('</li>')[0];
				var Pos = content_split.indexOf(".");
				var alk_split = content_split.substr(Pos - 1, 4);
				var Alk = alk_split.replace(".", "");
				document.getElementsByClassName("icon beer")[0].innerHTML = '<a class="ttip" rel="Klicke hier, um etwas zu trinken" href="/stock/">  '+alk_split+' ‰ </a>';
				safenessen(Alk);
			}
		});
	}










*/



























































































// flaschen aktuelkl im inventar anzeige -----------------------------------------------------------------------

GM_xmlhttpRequest({
	method: 'GET',
	url: ''+host+'/stock/bottle/',
	onload: function(responseDetails){
		var content = responseDetails.responseText;
		var text1 = content.split('name="max" value="')[1];
		var text2 = text1.split('"')[0];
		var kurs1 = content.split('name="chkval" value="')[1];
		var kurs = kurs1.split('"')[0];
		win = ((text2*kurs)/100);



if(document.getElementsByName("waschfoodcheck")[7].checked){
document.getElementsByName("flaschenmenge")[0].innerHTML = ''+text2+' Flaschen';
}

if(document.getElementsByName("waschfoodcheck")[8].checked){
document.getElementsByName("flaschengewinn")[0].innerHTML = ''+win+' &euro;';
}


}});



// plunder  angelegt und att def und dex werte des plunbders ------------------------------------------------

if(document.getElementsByName("waschfoodcheck")[9].checked){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+host+"/stock/plunder/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table1 = acontent.split('<h3>Angelegt</h3>')[1];			
			var table12 = table1.split('class="submenu">')[0];								
			var table13 = table12.split('src="')[1];					
			var table14 = table13.split('"')[0];
			var info = table12.split('<ul class="zclear">')[1];					
			var info1 = info.split('</ul>')[0];

var suche = info1.search("ATT:");
if (suche != -1) {
	var att1 = info1.split('ATT:')[1];
	var att = att1.split('</li>')[0];
	}else{
	var att ='-';
}

var suche1 = info1.search("DEF:");
if (suche1 != -1) {
	var def1 = info1.split('DEF:')[1];
	var def = def1.split('</li>')[0];
	}else{
	var def ='-';
}

var suche1 = info1.search("Geschick:");
if (suche1 != -1) {
	var ges1 = info1.split('Geschick:')[1];
	var ges = ges1.split('</li>')[0];
	}else{
	var ges ='-';
}

			var was11 = table12.split('>')[2];					
			var was2 = was11.split('<')[0];		
			//var einstelungen3 = '<img style="margin-bottom:-3px;" src="http://i46.tinypic.com/zvonc8.png"</img>';


var angelegt = 	'<b>Angelegt: <a class="tooltip" style=" color:red; font-size:12px;"  href="'+host+'/stock/plunder/">'+was2+'<span><font style=\"color:#FFFFFF; font-size:10px;\">'+info1+'</font></span></a></b>';
var papaistsocool = '<b>Att: '+att+'</b> &nbsp;<b>Def: '+def+'</b> &nbsp;<b>Geschick: '+ges+'</b>';

if(document.getElementsByName("waschfoodcheck")[10].checked){
document.getElementsByName("angelegt")[0].innerHTML = angelegt;}
if(document.getElementsByName("waschfoodcheck")[11].checked){
document.getElementsByName("angelegtwerte")[0].innerHTML = papaistsocool;}
}});

}



// sauberkeitsanzeige ---------------------------------------------------------------------------------------------


GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+host+"/overview/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table1 = acontent.split('Sauberkeit: ')[1];			
			var saubera = table1.split('%')[0];								



if(document.getElementsByName("waschfoodcheck")[13].checked){
document.getElementsByName("sauberbalken")[0].innerHTML = '<div class="processbar_bg_ov" style="width: 323px;"><div class="processbar_clean" style="width: '+saubera+'%;"></div>Sauberkeit: '+saubera+'%</div>';
}
}});

//ATT DEFanzeige  nund AMNPFWERT ERRECHNER------------------------------------------------------------------------------------------

if(document.getElementsByName("waschfoodcheck")[14].checked){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+host+'/activities/',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			dex = content.split('Deine Geschicklichkeit: ')[1].split('<')[0];

			GM_xmlhttpRequest({
				method: 'GET',
				url: ''+host+'/fight/',
				onload: function(responseDetails) { 
					var cont = responseDetails.responseText;
					att = cont.split('ATT:')[1].split('class="tooltip')[0].split('width="419">')[1].split('<')[0];
					def = cont.split('DEF:')[1].split('class="tooltip')[0].split('<td>')[1].split('<a')[0];

					if(document.getElementsByName("waschfoodcheck")[14].checked){
						document.getElementsByName("attdefdex")[0].innerHTML ='<img src=\"http://static.pennergame.de/img/pv4/icons/att.png\" border=\"2\">&nbsp;'+att+'&nbsp;<img src=\"http://media.pennergame.de/img/def.png\" border=\"2\">&nbsp;'+def+'<img src=\"http://static.pennergame.de/img/pv4/icons/mitleid.png\" border=\"2\">&nbsp;'+dex+'&nbsp;';
					}

					if(document.getElementsByName("waschfoodcheck")[16].checked){
						kampfwert = (Number(att)*GM_getValue("att"))	+	(Number(def)*GM_getValue("def"));
						document.getElementsByName("kampfwert")[0].innerHTML = kampfwert;
					}

					if(document.getElementsByName("waschfoodcheck")[17].checked){
						kampfwert = (Number(att)*GM_getValue("att"))    +	(Number(def)*GM_getValue("def"))	+	(Number(dex)*GM_getValue("dex"));
						document.getElementsByName("kampfwert")[0].innerHTML = kampfwert;
					}
				}
			});
		}
	});
}

// ------------------ wafen verkauf --------------------------------------------------
if(document.getElementsByName("waschfoodcheck")[1].checked){

document.getElementsByName("waffe")[0].innerHTML = 'Waffen Verkauf :'+GM_getValue("waffena")+'<input type="button" id="waffek"  name="waffek" value="Waffe Verkaufen" ><br>';
document.getElementsByName('waffek')[0].addEventListener('click', function wechseln2() {
id = document.getElementById('waffen').value;
alert(id)
},false);
}

// --------------------- instrumen verkaufen     ----------------------------------------------
if(document.getElementsByName("waschfoodcheck")[2].checked){

document.getElementsByName("instrument")[0].innerHTML = 'Musik instrumenten verkauf :'+GM_getValue("waffenaa")+'<input type="button" id="musikk"  name="musikk" value="Musikinstrument  Verkaufen" ><br>';
document.getElementsByName('musikk')[0].addEventListener('click', function wechseln2() {
musikid = document.getElementById('musik').value;
alert(musikid)
},false);
}



// ------------------------------------------------- plunder verkaufen und auislesen und co ---------------------------------

if(document.getElementsByName("waschfoodcheck")[3].checked){

document.getElementsByName("plunder")[0].innerHTML = 'normaler  plunder:'+GM_getValue("plunder")+''
+'menge :<input type="text" name="plundermenge" id="plundermenge" size="3" value="1"><input type="button" name="plundere1" id="plundere1" value="plunder Verkaufen"><a name="plundera"</a><a name="bandenplunder"</a><br>';




if(document.getElementsByName("waschfoodcheck")[6].checked){
document.getElementsByName("bandenplunder")[0].innerHTML = '<input type="button" name="bplunder" id="bplunder" value="BandenPlunderKasse einzahlen">';

}



if(document.getElementsByName("waschfoodcheck")[11].checked){
document.getElementsByName("plundera")[0].innerHTML = '<input type="button" name="plunderaboutall" id="plunderaboutall" value="augewaehlten plunder anlegen">';


document.getElementById('plunderaboutall').addEventListener('click', function brot_essen(){
var welcherplunder = document.getElementById('plunderid').value;
	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+host+'/stock/plunder/change/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_plunder='+welcherplunder+''),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });					
},false);
}

document.getElementsByName('plundere1')[0].addEventListener('click', function wechseln2() {
	plundermenge = document.getElementById('plundermenge').value;
	plunderid = document.getElementById('plunderid').value;
	a=0;
	nochmal(plundermenge,a,plunderid)
	function nochmal(plundermenge,a,plunderid){
		if(a<=plundermenge){
			a++;
			GM_xmlhttpRequest({
				method: 'GET',
				url: ''+host+'/stock/plunder/sell/'+plunderid+'/',
				onload: function(responseDetails) {
					var side = responseDetails.responseText;
					document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\">verkaufe Plunder Id: '+plunderid+' <br>Ausgewaehlte Menge : '+plundermenge+' <br> Verkaufe geradew Plunder Menge :'+a+'</a>';
					nochmal(plundermenge,a,plunderid)
				}
			});
		}else{
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+host+"/stock/plunder/",
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;

var haupttable = content.split('<a href="/stock/plunder/sell/'+plunderid+'/">')[1].split('</td>')[0];
var preis = haupttable.split('&euro;')[1].split('</a>')[0];
preis1 = preis.replace(/,/g,".");        
winplunder = preis1*plundermenge;
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\">Plunder Verkauf Beendet <br> Habe durch Verkauf '+winplunder+' &euro; Gewinn gemacht </b></a>';
}});
}
}
},false);
// -------------------------------baynden plunder einzahlung --------------------------------------------------
document.getElementsByName('bplunder')[0].addEventListener('click', function wechseln2() {
	plundermenge = document.getElementById('plundermenge').value;
	plunderid = document.getElementById('plunderid').value;
		GM_xmlhttpRequest({
			method: 'POST',
			url: ""+host+"/gang/stuff/payin/",
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('pid='+plunderid+'&f_count='+plundermenge+'&button=Einzahlen'),
				onload: function(responseDetails){
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\">Habe '+plundermenge+' x '+plunderid+' in BandenPlunder Kasse eingezahlt</a>';
      }
  });
},false);
}

// -------------------------------- floaschgen veerkaufen --------------------------------------------------------
if(document.getElementsByName("waschfoodcheck")[5].checked){

document.getElementsByName("flaschen")[0].innerHTML = 'Menge Flaschen :<input type="text name="h1" id="h1" size="10" value="15">'
+'<input type="button" name="verkaufe1" id="verkaufe1" value="Anzahl Flaschen Verkaufen"><br>';

document.getElementsByName('verkaufe1')[0].addEventListener('click', function wechseln2() {
pmenge1 = document.getElementById('h1').value;	
GM_xmlhttpRequest({
method: 'GET',
url: ''+host+'/stock/bottle/',
onload: function(responseDetails) 
{
var content = responseDetails.responseText;
var text1 = content.split('name="max" value="')[1];
var text2 = text1.split('"')[0];
var kurs1 = content.split('name="chkval" value="')[1];
var kurs = kurs1.split('"')[0];
win = Math.round((pmenge1*kurs)*10)/1000 
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+host+'/stock/bottle/sell/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('chkval='+kurs+'&max='+text2+'&sum='+pmenge1+''),
      onload: function(responseDetails) 
	  { 
		 //window.location.reload();//alert ("du hast gerade "+pmernge1+" Flaschen verkauf \nund hast dudurch "+win+" Euro \ndran verdient\nViel spass bei neue suchen Mfg basti1012");
      }
  });
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\">du hast gerade '+pmenge1+' Flaschen verkauf <br>und hast dudurch '+win+' Euro \ndran verdient<br>Viel spass bei neue suchen Mfg basti1012</a>';
}});

},false);
}

// banden kasse einzahlen -------------------------------------------------------------------------------
if(document.getElementsByName("waschfoodcheck")[0].checked){

document.getElementsByName("bandenkasse")[0].innerHTML = 'Banden Kasse :<input type="text name="bkasse1" id="bkasse1" size="7" value="15">'
+'Komentar :<input type="text name="komi" id="komi" value="komentar">'
+'<input type="button" name="bkasse" id="bkasse" value="Bandenkasse einzahlen"><br>';


document.getElementById('bkasse').addEventListener('click', function wechseln2() {
	Money = document.getElementById('bkasse1').value;
	kommi = document.getElementById('komi').value;
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+host+'/gang/cash/add/',
   headers:
   {'Content-type': 'application/x-www-form-urlencoded'},
          data: encodeURI('f_money='+Money+'&f_comment='+kommi+'&Submit=Einzahlen'),
      onload: function(responseDetails)
	  { 
		//window.location.reload();alert ("du hast gerade "+Money+" Euro  in der Kasse eingezahlt\n mit den Kommentar:\n "+kommi+" \nWünsche euch noch viel Glück im Spiel mfg basti1012");
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\">Du hast gerade '+Money+' &euro; in  der BandenKasse eingezahlt .<br> Komentar ist in den fall '+kommi+'</a>';
      }
  });
},false);
}

// ---------------------- spikle üplunder verkaufs hilfe bot-------------------------------------------------------------


if(document.getElementsByName("waschfoodcheck")[4].checked){

document.getElementsByName("spieleplunder")[0].innerHTML = 'Spiele Plunder :<input type="text name="h" id="h" size="4" value="15">'
+'<input type="button" name="verkaufe" id="verkaufe" value="Anzahl Plunder Verkaufen"><br>';

document.getElementsByName('verkaufe')[0].addEventListener('click', function wechseln2() {
	pmenge = document.getElementById('h').value;
	durch5 = Math.round(pmenge/5);
	GM_setValue("pmenge",pmenge)
	GM_setValue("ee",1)
	h=1;
	GM_setValue("durch5",durch5)
	eins(h)
},false);
function eins(h){
	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+host+'/stock/ug_plunder/'+h+'/',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			if(h<=GM_getValue("durch5")){
				h++;
				eins(h)
			}else{
				alert("Ende des Verkaufens/nSeite wird neu geladen");
				window.location.href = ''+host+'/stock/ug_plunder/1/';
			}
			zwei(content)
		}
	});
}
function zwei(content){
	for(y=1;y<=50;y++){
		try{
			var seitenmenge = content.split('class="pagenum">')[y].split('</a>')[0];
		}catch(e){
			GM_setValue("y",y)		
			drei(content)
			break;
		}
	}
}
function drei(content){
	for(x=1;x<=5;x++){
		try{
			ee = GM_getValue("ee");
			ee++;
			GM_setValue("ee",ee)
			GM_setValue("x",x)
			var plunder = content.split('/stock/ug_plunder/sell/')[x].split('/')[0];
			vier(plunder,x)
		}catch(e){
		}
	}
}
function vier(plunder,x){
	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+host+'/stock/ug_plunder/sell/'+plunder+'/',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\">'
			+'<b>Noch '+GM_getValue("y")+' Seiten <br>'
			+'Verkaufe Plunder Id : '+plunder+'<br>'
			+'Scan ; '+x+'<br>'
			+'Verkaufte Menge : '+GM_getValue("ee")+'<br>'
			+'von : '+GM_getValue("pmenge")+'</b>';
		}
	});
}
}






function int_bewegung_spenden(){
	document.getElementById("spendendiv").addEventListener('mousedown', dragspendenstart, false);
	document.addEventListener('mousemove', dragspenden, false);
	document.addEventListener('mouseup', dragspendenstop, false);

}

function dragspendenstart() {
	//Wird aufgerufen, wenn ein Objekt bewegt werden soll.
	element = document.getElementById("spendendiv");
	dragspendenobjekt = element;
	dragx = posx - dragspendenobjekt.offsetLeft;
	dragy = posy - dragspendenobjekt.offsetTop;
}

function dragspendenstop() {
	//Wird aufgerufen, wenn ein Objekt nicht mehr bewegt werden soll.
	dragspendenobjekt=null;
}
function dragspenden(ereignis) {
	//Wird aufgerufen, wenn die Maus bewegt wird und bewegt bei Bedarf das Objekt.
	posx = document.all ? window.event.clientX : ereignis.pageX;
	posy = document.all ? window.event.clientY : ereignis.pageY;
	if(dragspendenobjekt != null) {
		uhr1 = posx - dragx;//left
		uhr0 = posy - dragy;//top
		dragspendenobjekt.style.left = uhr1 + "px";
		dragspendenobjekt.style.top = uhr0 + "px";
		document.getElementById("spendendiv").style.left = uhr1 + "px";
		document.getElementById("spendendiv").style.top = uhr0 + "px";
		GM_setValue("uhr1", uhr1);
		GM_setValue("uhr0", uhr0);
		document.getElementById("uhrleft").value = uhr1;
		document.getElementById("uhrtop").value = uhr0;	
	}
}



int_bewegung_spenden();


/*
document.getElementsByName("waschfoodcheck")[1].checked = GM_getValue("waschfoodcheck1");
document.getElementsByName("waschfoodcheck")[2].checked = GM_getValue("waschfoodcheck2");
document.getElementsByName("waschfoodcheck")[3].checked = GM_getValue("waschfoodcheck3");
document.getElementsByName("waschfoodcheck")[4].checked = GM_getValue("waschfoodcheck4");
document.getElementsByName("waschfoodcheck")[5].checked = GM_getValue("waschfoodcheck5");
document.getElementsByName("waschfoodcheck")[6].checked = GM_getValue("waschfoodcheck6");

document.getElementsByName("waschfoodcheck")[7].checked = GM_getValue("waschfoodcheck7");
document.getElementsByName("waschfoodcheck")[8].checked = GM_getValue("waschfoodcheck8");

document.getElementsByName("waschfoodcheck")[9].checked = GM_getValue("waschfoodcheck9");
document.getElementsByName("waschfoodcheck")[10].checked = GM_getValue("waschfoodcheck10");
document.getElementsByName("waschfoodcheck")[11].checked = GM_getValue("waschfoodcheck11");
document.getElementsByName("waschfoodcheck")[12].checked = GM_getValue("waschfoodcheck12");
document.getElementsByName("waschfoodcheck")[13].checked = GM_getValue("waschfoodcheck13");
document.getElementsByName("waschfoodcheck")[14].checked = GM_getValue("waschfoodcheck14");

document.getElementsByName("waschfoodcheck")[15].checked = GM_getValue("waschfoodcheck15");

document.getElementsByName("waschfoodcheck")[16].checked = GM_getValue("waschfoodcheck16");
document.getElementsByName("waschfoodcheck")[17].checked = GM_getValue("waschfoodcheck17");




GM_setValue("waschfoodcheck1", document.getElementsByName("waschfoodcheck")[1].checked);
GM_setValue("waschfoodcheck2", document.getElementsByName("waschfoodcheck")[2].checked);
GM_setValue("waschfoodcheck3", document.getElementsByName("waschfoodcheck")[3].checked);
GM_setValue("waschfoodcheck4", document.getElementsByName("waschfoodcheck")[4].checked);
GM_setValue("waschfoodcheck5", document.getElementsByName("waschfoodcheck")[5].checked);
GM_setValue("waschfoodcheck6", document.getElementsByName("waschfoodcheck")[6].checked);

GM_setValue("waschfoodcheck7", document.getElementsByName("waschfoodcheck")[7].checked);
GM_setValue("waschfoodcheck8", document.getElementsByName("waschfoodcheck")[8].checked);
GM_setValue("waschfoodcheck9", document.getElementsByName("waschfoodcheck")[9].checked);
GM_setValue("waschfoodcheck10", document.getElementsByName("waschfoodcheck")[10].checked);
GM_setValue("waschfoodcheck11", document.getElementsByName("waschfoodcheck")[11].checked);
GM_setValue("waschfoodcheck12", document.getElementsByName("waschfoodcheck")[12].checked);
GM_setValue("waschfoodcheck13", document.getElementsByName("waschfoodcheck")[13].checked);// sauberkeitsanzeige
GM_setValue("waschfoodcheck14", document.getElementsByName("waschfoodcheck")[14].checked);// att def werte

GM_setValue("waschfoodcheck15", document.getElementsByName("waschfoodcheck")[15].checked);// kaMPFWERT


GM_setValue("waschfoodcheck16", document.getElementsByName("waschfoodcheck")[16].checked);//att
GM_setValue("waschfoodcheck17", document.getElementsByName("waschfoodcheck")[17].checked);// dex

location.reload();


*/


//copyright by basti1012