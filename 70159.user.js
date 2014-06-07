// ==UserScript==
// @name         Pennergame icq by basti1012 pennergame 4.0
// @namespace    http://www.pennerhack.foren-city.de
// @author       basti1012
// @description  dieses script baut icq nach . man kann gegner speichern und sehen ob die online und offline sind . woie bei icq . wenn dir einer aus deiner freundesliste ne nachricht geschrieben hat blinkt der name 
// @include      *pennergame.de*
// ==/UserScript==




//---------------------------------------------- style und menue herstellen mit farben positsion und co -------------------------

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div#main_container { position:'+GM_getValue("fix")+'; top:'+GM_getValue("MenueTop")+'px; left:'+GM_getValue("MenueLeft")+'%; width:'+GM_getValue("tranzparente")+'px;}')
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:black; text-decoration:underline; margin-bottom:-5px}')
addGlobalStyle('.inhalt_container { padding-top:15px; padding-bottom:12px; padding-left:4%; background-color:'+GM_getValue("MenueFontColorIn")+'; font-weight:bold; color:black; font-size:73%; text-align:left; } ')
addGlobalStyle('.inhalt_container {border: '+GM_getValue("bordbreite")+'px solid '+GM_getValue("MenueBorderColorIn")+'; background-color: '+GM_getValue("MenueFontColorIn")+';}')

addGlobalStyle('div#main_container1 { position:'+GM_getValue("fix")+'; top:333px; left:33%; width:567px;}')
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:black; text-decoration:underline; margin-bottom:-5px}')
addGlobalStyle('.inhalt_container1 { padding-top:15px; padding-bottom:12px; padding-left:4%; background-color:'+GM_getValue("MenueFontColorIn")+'; font-weight:bold; color:black; font-size:73%; text-align:left; } ')
addGlobalStyle('.inhalt_container1 {border: '+GM_getValue("bordbreite")+'px solid '+GM_getValue("MenueBorderColorIn")+'; background-color: '+GM_getValue("MenueFontColorIn")+';}')

GM_deleteValue("sms")
GM_deleteValue("lesen")

//-----------------------------------------------------------------------------------------------------------------------------------
// ----------------------Link ermitteln und vorgespeicherte einstellunden fuer das menue-----------------------------------------------

var url = document.location.href;
if (url.indexOf("http://www.berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}

if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var siglink = 'http://img.dossergame.co.uk';
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
var siglink = 'http://img.menelgame.pl';
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
var siglink = 'http://img.clodogame.fr';
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var siglink = 'http://img.mendigogame.es';
}
var MenueTop = GM_getValue("MenueTop");
if (MenueTop == null){
MenueTop = "11";};

var MenueLeft = GM_getValue("MenueLeft");
if (MenueLeft == null){
MenueLeft = "22";};

var MenueFontColor = GM_getValue("MenueFontColorIn");
if (MenueFontColor == null){
MenueFontColor = "yellow";};

var MenueBorderColor = GM_getValue("MenueBorderColorIn");
if (MenueBorderColor == null){
MenueBorderColor = "schwarz";};

var tranzparente = GM_getValue("tranzparente");
if (tranzparente == null){
tranzparente = "400";};

var bordbreite = GM_getValue("bordbreite");
if (bordbreite == null){
bordbreite = "2";};

var ColorIn = GM_getValue("ColorIn");
if (ColorIn == null){
ColorIn = "red";};

var fix = GM_getValue("fix");
if (fix == null){
fix = "fixed";};

var ColorIn2 = GM_getValue("ColorIn2");
if (ColorIn2 == null){
ColorIn2 = "blue";};


//---------------------------------------------------------------------------------------------------------------------------------------
//----------------------------- abfrage von namen und link zur nachricht fuer das nicht freundes anzeige------------------------------------

GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/messages/',
      onload: function(responseDetails) {
		var content = responseDetails.responseText;

			var ges = content.split('http://static.pennergame.de/img/pv4/icons/unread.gif')[1];
			var ges2 = ges.split('</span>')[0];
			var sms = ges2.split('/messages/read/')[1];
			var sms2 = sms.split('/')[0];
			var pro = ges2.split('/profil/id:')[1];
			var pro2 = pro.split('/')[0];
			GM_setValue("sms", pro2)
			GM_setValue("lesen", sms2)
		
	}
});
//--------------------------------------------------------------------------------------------------------------------------------------
//----------------------------erzeuge hier das div menue fuer die icq pennergame funktion----------------------------------------------


var Weiterbildung = document.createElement('div');
document.body.appendChild(Weiterbildung);
Weiterbildung.innerHTML = ""
+"<div id=\"main_container\" style=\"padding-bottom:21px \"><div class=\"inhalt_container\">"
+'<b id="nachricjht"</b>'
+'<font style=\"color:green; font-size:140%;\"><center><input type="button" id="min" value="+"><b><u>Penner Online </u></b><input type="button" id="max" value="-"></center></font><br><b id="onn"</b>'
+'<font style=\"color:red; font-size:140%;\"><br><center><input type="button" id="min1" value="+"><b><u>Penner Offline</u></b><input type="button" id="max1" value="-"></center></font><br><b id="offf"</b>'
+'<br><center><a id="einstell" name="einstell">[<span style=\"color:#FF0000;\">chat</span>]</a></center>'
+'<br><center><a id="einstellaa" name="einstellaa">[<span style=\"color:#FF0000;\">Freunde</span>]</a></center>'
+'<br><center><a id="einstella" name="einstella">[<span style=\"color:#FF0000;\">Einstellungen</span>]</a></center></div></span>';
+'<font style=\"color:red; font-size:140%;\"><br><center><b><u>Gel&ouml;schte</u></b></center></font><br><b id="losch"</b>'
document.body.appendChild(Weiterbildung);


document.getElementById('min').addEventListener('click', function einstell () {
anaus='1';
GM_setValue("anaus" ,anaus)
location.reload();
},false);


document.getElementById('max').addEventListener('click', function einstell () {
anaus='2';
GM_setValue("anaus" ,anaus)
location.reload();
},false);


document.getElementById('min1').addEventListener('click', function einstell () {
anaus1='1';
GM_setValue("anaus1" ,anaus1)
location.reload();
},false);


document.getElementById('max1').addEventListener('click', function einstell () {
anaus1='2';
GM_setValue("anaus1" ,anaus1)
location.reload();
},false);








//----------------------------------------------------------------------------------------------------------------------------------------
//----------------- abfrage alle 30 sekunden ob es neue bachrichten in pennergame nachricheten eingang gibt ------------------------------
smscheck()
function smscheck(){
	GM_xmlhttpRequest({
     		 method: 'GET',
      		 url: ''+link+'/overview/',
      		 onload: function(responseDetails) {
		 var content = responseDetails.responseText;
			try{
				var nachricht = content.split('/icons/new_msg.gif')[1];
				var nachricht2 = nachricht.split('</a>')[0];
				GM_xmlhttpRequest({
      					method: 'GET',
     					url: ''+link+'/messages/',
      					onload: function(responseDetails) {
						var content = responseDetails.responseText;
						document.getElementById('nachricjht').innerHTML = '<span style=\"color:yellow;\">Neue Nachricht(en) in Game </span><b id="von"</b>';
						for(a=1;a<=20;a++){
							try{
								var vonf = content.split('src="http://static.pennergame.de/img/pv4/icons/unread.gif')[a];
								var contenta = vonf.split('</span>')[0];
								var von = contenta.split('&nbsp;von')[1];
								var von2 = von.split('</span>')[0];
								var von3 = contenta.split('href="/messages/read/')[1];
								var von23 = von3.split('/')[0];
								document.getElementById('von').innerHTML += '<br><span style=\"color:yellow;\">'+von2+'</span><a href="/messages/read/'+von23+'/"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif">';
							}catch(e){}
						}
					}
				});
		 	}catch(e){
			document.getElementById('nachricjht').innerHTML = '<span style=\"color:yellow;\"></span>';
			}
		}
	});
	window.setTimeout(smscheck, 30000);
}


//----------------------------------------------------------------------------------------------------------------------------
// ---------------- hier wird die chat funktiopn erzeugt und abgefragt und nachrichten versenden um chat zu ermoeglichen----------

document.getElementsByName('einstell')[0].addEventListener('click', function einstell () {

var Weiterbildung1 = document.createElement('div');
document.body.appendChild(Weiterbildung1);
Weiterbildung1.innerHTML = ""

+"<div id=\"main_container1\" style=\"padding-bottom:21px \"><div class=\"inhalt_container1\">"
+'<font style=\"color:green; font-size:140%;\"><center><b><u>2 Mann Chat</u></b></center></font><br>'
+'<b id="wer"</b>'
+'<font style=\"color:green; font-size:140%;\">Chaten mit id </font><input type="text" name="idchat" id="idchat" value="Id des Penners eingeben">'
+'<b id="eingabe"</b>'
+'<br><font style=\"color:green; font-size:140%;\">Nachricht Eingeben:</font><br><textarea rows="5" cols="50" name="text" id="text"></textarea>'
+'<input type="button" name="senden" id="senden" value="Nachricht Senden" /></td>'

document.body.appendChild(Weiterbildung1);
document.getElementById('senden').addEventListener('click', function save_spenden () {
var text = document.getElementById('text').value;
var textid = document.getElementById('idchat').value;
		
	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/messages/write/send/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_toname=id:'+textid+'&f_subject=&f_text='+text+'&f_did=&submit=Nachricht+verschicken'),
		onload: function(responseDetails){
		document.getElementById('eingabe').innerHTML += '<br><font style=\"color:white; font-size:140%;\">'+text+'</font>';
	}
});
//-----------------------------------
// ------abfrage ob der vchat partner online oder offline ist 

GM_xmlhttpRequest({
       	method: 'GET',
        url: ''+link+'/profil/id:'+textid+'/',
        onload: function(responseDetails) {
            	var content = responseDetails.responseText;
		try{
			var name = content.split('/headline/')[1];
			var nam  = name.split('/"')[0];
			var id = content.split('/messages/write/?to=')[1];
			var idd  = id.split('"')[0];
		}catch(e){}
			var suche = content.search("Ist gerade Online");
				try{
					if (suche != -1) {
						document.getElementById('wer').innerHTML = '<br><font style=\"color:green; font-size:140%;\"><a href="'+link+'/profil/id:'+idd+'">'+nam+'</a> Ist online</font><br>';
					}else {
						document.getElementById('wer').innerHTML = '<br><font style=\"color:red; font-size:140%;\"><a href="'+link+'/profil/id:'+idd+'">'+nam+'</a> Ist offline</font><br>';
					};
				}catch(e){}
	}
});

//---------------------------------------------------------------------------------------------------------------------------------------------
//-----------abfrage fuer den chat ob neue nachrichten eingegangen sind und alle 10 sekunden wieder abfragen-----------------------------------

reloden()
function reloden(){
 	GM_xmlhttpRequest({
     		 method: 'GET',
     		 url: ''+link+'/messages/',
      		 onload: function(responseDetails) {
		 	var content = responseDetails.responseText;
			try{
				var ges = content.split('http://static.pennergame.de/img/pv4/icons/unread.gif')[1];
				var ges0 = ges.split('</span>')[0];
				var chater = ges0.split('href="/profil/id:')[1];
				var chater1 = chater.split('/')[0];
				var link = ges0.split('href="/messages/read/')[1];
				var link1 = link.split('/')[0];
			}catch(e){}
			if(chater1 == textid){
				GM_xmlhttpRequest({
     					 method: 'GET',
     					 url: 'http://www.pennergame.de/messages/read/'+link1+'/',
     					 onload: function(responseDetails) {
						var content = responseDetails.responseText;
						var ges1 = content.split('<strong>Inhalt</strong>')[1];
						var ges2 = ges1.split('<a href="/messages/delete/')[0];
						var ges3 = ges2.split('<p>')[1];
						var ges4 = ges3.split('</p>')[0];
						document.getElementById('eingabe').innerHTML += '<br><font style=\"color:red; font-size:140%;\">'+ges4+'</font>';
					}
				});
			}
		}
	});
	window.setTimeout(reloden, 10000);
}
},false);
},false);


//-------------------------------------------------------------------------------------------------------------------------------------------
// hier wird das meune erzeugt wo man seine freunde per hand speichern kann  --------------------------------------------------------------------


if(!GM_getValue("linkanzahl")) {
	GM_setValue("linkanzahl", "0");
};
var anzahllinks = GM_getValue("linkanzahl");


document.getElementById('einstellaa').addEventListener('click', function einstell () {
var menge = '<span style="color: red;">Anzahl der Freunde:</span> <input type="text" id="anzahl" size="1" value="'+GM_getValue("linkanzahl")+'" /><input type="button" id="anzahlspeichern" value="Speichern" />';
var Schl = '<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" /><input type="button" id="namenundlinksspeichern1" value="penner ids speichern" />';

var Weiterbildung = document.createElement('div');
document.body.appendChild(Weiterbildung);
Weiterbildung.innerHTML = ""
+"<div id=\"main_container\" style=\"padding-bottom:21px \"><div class=\"inhalt_container\">"
+'<div id="ids"</div>'+menge+Schl+'';
document.body.appendChild(Weiterbildung);

document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
	alert("close einstellungen")
	window.location.reload();
},false);

document.getElementById('anzahlspeichern').addEventListener('click', function speichern1() {
    var anzahl = document.getElementById('anzahl').value;
    GM_setValue("linkanzahl", anzahl);
    alert("Anzahl der Spendenlinks gespeichert! Seite wird neu geladen...");
    location.reload();
}, false);


for (var z=1; z<=anzahllinks; z++) {
	if(!GM_getValue("spendenname" + z)) {
		GM_setValue("spendenname" + z, "-");
	};
	if(!GM_getValue("spendenlink" + z)) {
		GM_setValue("spendenlink" + z, "-");
	};
	document.getElementById('ids').innerHTML += '<br><span style="color: red;"> id des penners:</span><input type="text" id="name'+z+'" size="10" value="'+GM_getValue("spendenname" + z)+'">';
}

document.getElementById('namenundlinksspeichern1').addEventListener('click', function speichern2() {
        for (var y=1; y<=anzahllinks; y++) {
       		var spendenname = document.getElementById('name' + y).value;
    		GM_setValue("spendenname" + y, spendenname);
        };
	alert("alle ids wurden gespeichert ...klicken sie jetzt auf schliessen")
},false);
},false);

//------------------------------------------------------------------------------------------------------------------------------------------
// --------------- hier wird das einstellungs menue erzeugt damit man positsion und farbe endern kann ------------------------------------

document.getElementById('einstella').addEventListener('click', function einstell () {
	var fixx = '<span align=\"center\" style=\"color:red;\">Fest/miotlaufend</span></a><center><select name=\"fix\"><option value=\"fixed\">fixed</option><option value=\"absolute\">absolute</option></select></center>';
	var Spei = '<br><input type="button" id="namenundlinksspeichern" value="Einstellungen Speichern" />';
	var hinter = '<span align=\"center\" style=\"color:red;\">Hintergrundsfarbe</span><center><select name=\"MenueFontColorIn\"><option value=\"white\">Weiss</option><option value=\"black\">Schwarz</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option><option value=\"#FFFFFF\">Pennergame Grau</option></select></center>';
	var ramen = '<span align=\"center\" style=\"color:red;\">Rahmenfarbe</span><center><select name=\"MenueBorderColorIn\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>';
	var schriftColor = '<span align=\"center\" style=\"color:red;\">Schrieftfarbe</span><center><select name=\"ColorIn\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>';
	var schriftColor2 = '<span align=\"center\" style=\"color:red;\">farbe bei erhaltener sms</span><center><select name=\"ColorIn2\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>';
	var tranzparente = '<span align=\"center\" style=\"color:red;\">menue breite</span><center><select name="tranzparente"><option value="100">100</option><option value="120">120</option><option value="140">140</option><option value="160">160</option><option value="180">180</option><option value="200">200</option><option value="222">222</option><option value="233">233</option><option value="244">244</option><option value="255">255</option><option value="266">266</option><option value="288">288</option><option value="311">311</option><option value="333">333</option><option value="355">355</option><option value="366">366</option><option value="388">388</option><option value="400">400</option><option value="422">422</option><option value="444">444</option><option value="455">455</option></select></center>';
	var bordbreite = '<a><span align=\"center\" style=\"color:red;\">Rahmenbreite</span></a><center><select name="bordbreite"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14 ">14</option><option value="15">15</option></select></center>';
	var oben ='<span align=\"center\" style=\"color:red;\">Von oben(px)</span></a><center><input name="MenueTop" size="10" type="text" value="'+MenueTop+'">';
	var links ='<br><a><span align=\"center\" style=\"color:red;\">Von Links(px)</span></a><center><input name="MenueLeft" type="text" size="10" value="'+MenueLeft+'" >';

	var Weiterbildung = document.createElement('div');
	document.body.appendChild(Weiterbildung);
	Weiterbildung.innerHTML = ""
	+"<div id=\"main_container\" style=\"padding-bottom:21px \"><div class=\"inhalt_container\">"
	+''+Spei+fixx+hinter+ramen+schriftColor+schriftColor2+tranzparente+bordbreite+oben+links+'';
	document.body.appendChild(Weiterbildung);

	document.getElementById('namenundlinksspeichern').addEventListener('click', function speichern2() {
	GM_setValue("tranzparente", document.getElementsByName('tranzparente')[0].value);
	GM_setValue("bordbreite", document.getElementsByName('bordbreite')[0].value);
	GM_setValue("MenueFontColorIn", document.getElementsByName('MenueFontColorIn')[0].value);
	GM_setValue("MenueBorderColorIn", document.getElementsByName('MenueBorderColorIn')[0].value);
	GM_setValue("ColorIn", document.getElementsByName('ColorIn')[0].value);
	GM_setValue("ColorIn2", document.getElementsByName('ColorIn2')[0].value);
	GM_setValue("MenueTop", document.getElementsByName('MenueTop')[0].value);
	GM_setValue("MenueLeft", document.getElementsByName('MenueLeft')[0].value);
	GM_setValue("fix", document.getElementsByName('fix')[0].value);

        alert("EINSTELLUNGEN GESPEICHERT! Seite wird neu geladen...");
        location.reload();
}, false);
},false);

//------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------  ab hier wird das menue fuer die immer ansicht erzeugt somit sieht man immer wer online und offline ist ---------------------------------------

for(a=1;a<=GM_getValue("linkanzahl");a++){
	GM_xmlhttpRequest({
       		method: 'GET',
            	url: ''+link+'/profil/id:'+GM_getValue("spendenname" + a)+'/',
             	onload: function(responseDetails) {
            		var content = responseDetails.responseText;
				try{
					var name = content.split('/headline/')[1];
					var nam  = name.split('/"')[0];

					var id = content.split('/messages/write/?to=')[1];
					var idd  = id.split('"')[0];

					GM_setValue("nam" +a , nam)
					GM_setValue("idd" +a , idd)

					abfragennacvhricht(nam,idd,content)
				}catch(e){}
			}
	});
}


function abfragennacvhricht(nam,idd,content){
	var suche = content.search("Ist gerade Online");
	try{
		if (suche != -1) {
			on='1';
			online(nam,idd,on,a);
		}else {
			on='2';
			online(nam,idd,on,a);
		};
	}catch(e){}
}



// ------------------------------------ hier wird der hblinkende name erzeugt wenn man eine nachricht bekommen hat ----------------------------
var blinkTimeout = 500;
var blinkIdx = 0;
function blink () {
	if ( document.all && document.all.blink ) {
		blinkIdx = (blinkIdx+=1) % 2 ;
		var color = blinkColTbl [ blinkIdx ];
		if ( document.all.blink.length ) {
			for(i=0;i<document.all.blink.length;i++)
			document.all.blink[i].style.color=color;
		} else
		document.all.blink.style.color=color;
		setTimeout( "blink();" , blinkTimeout);
	}
}
//----------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------abfragen und sortioeren wer onloine und offline ist --------------------------


function online(nam,idd,on,a){

anaus = GM_getValue("anaus");
if(anaus==1){
if(on==1){
	if(idd == GM_getValue("sms")){
		document.getElementById('onn').innerHTML += '<center>'
		+'<a href="'+link+'/messages/read/'+GM_getValue("lesen")+'/"><blink><span id="blink"><span style=\"color:'+GM_getValue("ColorIn2")+'; font-size:100%;\">'+nam+'</span></span></blink></a>'
		+'<a href="'+link+'/fight/?to='+nam+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/att.png" border="0">'
		+'<a href="'+link+'/messages/write/?to='+idd+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" border="0">'
		+'';


}else{
document.getElementById('onn').innerHTML += '<center>'
+'<a href="'+link+'/profil/id:'+idd+'/"><span style=\"color:'+GM_getValue("ColorIn")+';\">'+nam+'</span></a>'
+'<a href="'+link+'/fight/?to='+nam+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/att.png" border="0">'
+'<a href="'+link+'/messages/write/?to='+idd+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" border="0">'
+'';
}
}
}
if(anaus==2){}

anaus1 = GM_getValue("anaus1");
if(anaus1==1){


if(on==2){
if(idd == GM_getValue("sms")){
document.getElementById('offf').innerHTML += '<center>'
+'<a href="'+link+'/messages/read/'+GM_getValue("lesen")+'/"><blink><span id="blink"><span style=\"color:'+GM_getValue("ColorIn2")+'; font-size:100%;\">'+nam+'</span></span></blink></a>'
+'<a href="'+link+'/fight/?to='+nam+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/att.png" border="0">'
+'<a href="'+link+'/messages/write/?to='+idd+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" border="0">'
+'';



}else{
document.getElementById('offf').innerHTML += '<center>'
+'<a href="'+link+'/profil/id:'+idd+'/"><span style=\"color:'+GM_getValue("ColorIn")+';\">'+nam+'</span></a>'
+'<a href="'+link+'/fight/?to='+nam+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/att.png" border="0">'
+'<a href="'+link+'/messages/write/?to='+idd+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" border="0">'
+'';
}
}

}
if(anaus1==2){}
}
//---------------------------------------------------------------------------------------------------------------------------------------------
// wenn man auf ein pürofil geht kann man mit eoinen klick den penner ion der freundeslioste speichern

if (url.indexOf("/profil/id:")>=0) {

var profilspeichern = document.getElementsByTagName("table")[4];
var profilspeichern1 = profilspeichern.getElementsByTagName("td")[0];
var newp = document.createElement("tr");
profilspeichern1.appendChild(newp);
newp.innerHTML = '<input type="button" name="pennerspeichern" id="pennerspeichern" value="Diessen Penner in Pennergame-ICQ Speichern">'



document.getElementById('pennerspeichern').addEventListener('click', function speichern2() {

var profilspeichern = document.getElementsByTagName("table")[4];
var profilspeichern1 = profilspeichern.getElementsByTagName("td")[0];
var newp = document.createElement("tr");
profilspeichern1.appendChild(newp);



neuerpenner = GM_getValue("linkanzahl");
s='1';
l = Number(neuerpenner)+Number(s);
GM_setValue("linkanzahl", l);
var vorid = document.getElementById('profil_index').innerHTML.split('messages/write/?to=')[2].split('"')[0];
GM_setValue("spendenname" + l , vorid);

var vorname = document.getElementById('profil_index').innerHTML.split('friend=')[1].split('"')[0];
GM_setValue("vorname", vorname);


newp.innerHTML = ''
+'<br>Name des Penners : <span align=\"center\" style=\"color:red;\">'+vorname+'</span>'
+'<br>Id des Penners : <span align=\"center\" style=\"color:red;\">'+vorid+'</span>'
+'<br>Speicherplatz : <span align=\"center\" style=\"color:red;\">'+l+'</span>'
+'<br>Kontrolle : <span align=\"center\" style=\"color:green;\"><strong>alles gespeichert</strong></span>';
location.reload();
},false);
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
// copyright by basti1012 _____ Maerz 2010
