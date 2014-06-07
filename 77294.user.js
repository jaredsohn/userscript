// ==UserScript==
// @name        PG Selbstspender
// @namespace	Madoe
// @description	Mit diesem kleinen Knopf auf der Login-Seite von Pennergame&Co könnt ihr euren Wunschlink speichern und ihn dann über 2x11 Proxys ansteuern! 
// @include	*
// @version     1.7.7
// ==/UserScript==



//Knopf und Linkzeile einfügen
var ur2 = document.location.href;

var No1= GM_getValue("No1in");
var No2= GM_getValue("No2in");
var No3= GM_getValue("No3in");
var No4= GM_getValue("No4in");
var No5= GM_getValue("No5in");
var No6= GM_getValue("No6in");
var No7= GM_getValue("No7in");
var No8= GM_getValue("No8in");
var No9= GM_getValue("No9in");
var No10= GM_getValue("N101in");
var No11= GM_getValue("No11in");
var No12= GM_getValue("No12in");



if (ur2.indexOf("login")<0){
GM_setValue("fin"," font-size:85%; ");
}
else if(ur2.indexOf("login")>=0){
GM_setValue("fin","");
}
if (ur2.indexOf("pennergame.de")>=0 || ur2.indexOf("clodogame")>=0 ||ur2.indexOf("mendigogame")>=0 ||ur2.indexOf("dossergame")>=0||window.location.href==No1||window.location.href==No2||window.location.href==No3||window.location.href==No4||window.location.href==No5||window.location.href==No6||window.location.href==No7||window.location.href==No8||window.location.href==No9||window.location.href==No10||window.location.href==No11||window.location.href==No12) {

var daswirdmeinlink = GM_getValue("deinlinkin");		//Cookie auslesen
if (daswirdmeinlink == null) {var daswirdmeinlink = "";}
// Onclick Evente sauber darstellen
var f= GM_getValue("fin");
var opendas = "window.open('http://ocaspro.com/'); window.open('http://blewpass.com'); window.open('http://internetbypass.com'); window.open('http://www.myunblockwebsites.com/'); window.open('http://adfreeproxy.com/'); window.open('http://proxyglype.com/'); window.open('http://www.gizlen.org/'); window.open('http://anonlite.uk.to/'); window.open('http://primeproxy13.info/'); window.open('http://www.coldbrain.info/'); window.open('http://proxy.m4lt.com/');"

var opendies = "window.open('http://www.schoolbuster.com/'); window.open(\'http://www.browserunblocker.com/\'); window.open(\'http://www.webnusense.com/\'); window.open(\'http://www.clearlydrunk.com/\'); window.open(\'http://www.zend2.com/\'); window.open(\'http://www.proximize.me/\'); window.open(\'http://www.randomproxy.info/\'); window.open(\'http://www.server99.info/\'); window.open(\'http://proxy.virtuaos.com/\'); window.open(\'http://www.whitefilter.info/\'); window.open(\'http://www.donefast.info/\'); window.open(\'http://www.schoolbuster.com/\');";

var Switch = "javascript:document.getElementById('adressid').setAttribute('style', 'position: absolute; left: 50%; margin-left: -500px; top: 88px; width: 681px;'); document.getElementById('so_gehts').setAttribute('style','color:red; position:absolute; left:50%; margin-left:-500px; top:65px; width:768px;'); document.getElementById('Ab_Gehts').setAttribute('style', 'visibility:hidden;position: absolute; left: 60%; margin-left: 50px; top: 90px; width: 80px;');document.getElementById('Einstellung').setAttribute('style','visibility: hidden; position:absolute; left:60%; margin-left:50px; top:126px; width:80px;');document.getElementById('Speichern').setAttribute('style', 'position: absolute; left: 60%; margin-left: 50px; top: 90px; width: 80px;');document.getElementById('Und_weiter').setAttribute('style', 'visibility: hidden; position: absolute; left: 60%; margin-left: 50px; top: 108px; width: 80px;')";

// Buttons deklarieren
var SpeicherButton = "<input type=\"button\" style=\"visibility: hidden; position: absolute; left: 60%; margin-left: 50px; top: 90px; width: 80px;\" id=\"Speichern\" value=\"Speichern\">";

var UndweiterButton= "<input type=\"button\" style=\""+f+"position: absolute; left: 60%; margin-left: 50px; top: 108px; width: 80px;\" id=\"Und_weiter\" value=\"Und weiter\" onClick=\"javascript:"+opendas+"\">";

var AbGehtsButton="<input type=\"button\" style=\""+f+"position: absolute; left: 60%; margin-left: 50px; top: 90px; width: 80px;\" id=\"Ab_Gehts\" value=\"Ab Gehts\" onClick=\"javascript:"+opendies+"\">";

var EinstellungsButton="<input type=\"button\" id=\"Einstellung\" name=\"Einstellungsbutton\" style=\""+f+"position:absolute; left:60%; margin-left:50px; top:126px; width:80px; \" value=\"Einstellung\"onClick=\""+Switch+"\">";

//in HTML einspeisen
document.body.innerHTML=document.body.innerHTML+"<form id=\"form1\"><font><div id=\"so_gehts\" bgcolor=\"#353535\" style=\"visibility:hidden; color:red; position:absolute; left:50%; margin-left:-500px; top:65px; font-size:140%; width:768px;\" font=\"20\">Öffne diesen Link über 2x10 Proxies </div><form name=\"Form1\"> <input type=\"text\" id=\"adressid\" name=\"Eingabe\" style=\"visibility: hidden; position:absolute; left:50%; margin-left:-500px; top:88px; width:681px;\" value=\""+daswirdmeinlink+"\"> "+AbGehtsButton+EinstellungsButton+SpeicherButton+UndweiterButton+"</font></form>";

document.getElementById('Speichern').addEventListener('click', function Schliessen () {

// Cookie Speichern
GM_setValue("deinlinkin", document.getElementById("adressid").value);
window.location.reload();
},false);
}


// cookie auslesen 
var deinlink = GM_getValue("deinlinkin");
var url = document.location.href;

// proxies verwenden
if (url.indexOf("browserunblocker")>=0) {  
document.getElementById("address_box").value = deinlink;
document.getElementById("go").click();
}



if (url.indexOf("clearlydrunk")>=0) { 
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("zend2")>=0) {  
document.getElementById("input").value= deinlink;
document.getElementsByClassName("LogButton")[0].click();
}

if (url.indexOf("proximize")>=0) { 
document.getElementById("urlinput").value= deinlink;
document.getElementById("submitbutton").click();
}
if (url.indexOf("randomproxy")>=0) { 
document.getElementById("stripJS").click();
document.getElementsByClassName("url_form")[0].value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("server99")>=0) {  
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("virtuaos")>=0) {  
document.getElementById("stripObjects").click();
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("coldbrain")>=0) { 			
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("m4lt")>=0) {				
document.getElementById("address_box").value= deinlink;
document.getElementById("go").click();
}

if (url.indexOf("schoolbuster")>=0) { 			
document.getElementById("url_textbox").value= deinlink;
document.getElementsByClassName("submitbutton")[0].click();
}
if (url.indexOf("donefast")>=0) { 
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}
if (url.indexOf("whitefilter")>=0) {
document.getElementById("stripJS").click();
document.getElementsByClassName("url_form")[0].value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("primeproxy13")>=0) { 			
document.getElementsByClassName("url_form")[0].value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("webnusense")>=0) { 
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("anonlite")>=0) { 			
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("gizlen")>=0) { 			
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}

if (url.indexOf("proxyglype")>=0) { 			
document.getElementById("input").value= deinlink;
document.getElementsByClassName("submitbutton")[0].click();
}
if (url.indexOf("adfreeproxy")>=0) { 			
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}
if (url.indexOf("myunblockwebsites")>=0) { 		
document.getElementById("input").value= deinlink;
document.getElementsByClassName("submitbutton")[0].click();
}
if (url.indexOf("internetbypass")>=0) { 		
document.getElementById("minime_url_textbox").value= deinlink;
document.getElementById("minime_submit").click();
}
if (url.indexOf("blewpass")>=0) { 			
document.getElementById("input").value= deinlink;
document.getElementsByClassName("button")[0].click();
}
if (url.indexOf("ocaspro")>=0) { 			
document.getElementById("url_textbox").value= deinlink;
document.getElementById("button").click();
}
// Jetzt kommt das Einstell-Menu
if (window.location.href=="http://userscripts.org/scripts/fans/77294") {
document.getElementById("footer").setAttribute("style","top:580px");

var No1= GM_getValue("No1in");
var No2= GM_getValue("No2in");
var No3= GM_getValue("No3in");
var No4= GM_getValue("No4in");
var No5= GM_getValue("No5in");
var No6= GM_getValue("No6in");
var No7= GM_getValue("No7in");
var No8= GM_getValue("No8in");
var No9= GM_getValue("No9in");
var No10= GM_getValue("N101in");
var No11= GM_getValue("No11in");
var No12= GM_getValue("No12in");

if (No1==null){var No1="erste Seite auf der das Script angewendet werden soll";}
if (No2==null){var No2="zweite Seite auf der das Script angewendet werden soll";}
if (No3==null){var No3="dritte Seite auf der das Script angewendet werden soll";}
if (No4==null){var No4="vierte Seite auf der das Script angewendet werden soll";}
if (No5==null){var No5="fünfte Seite auf der das Script angewendet werden soll";}
if (No6==null){var No6="sechste Seite auf der das Script angewendet werden soll";}
if (No7==null){var No7="siebte Seite auf der das Script angewendet werden soll";}
if (No8==null){var No8="achte Seite auf der das Script angewendet werden soll";}
if (No9==null){var No9="neunte Seite auf der das Script angewendet werden soll";}
if (No10==null){var No10="zehnte Seite auf der das Script angewendet werden soll";}
if (No11==null){var No11="elfte Seite auf der das Script angewendet werden soll";}
if (No12==null){var No12="letzte/zwölfte Seite auf der das Script angewendet werden soll";}



var Satz='<div style="color:white;font-weight:bold;position: absolute; left: 50%; margin-left: -500px; top: 400px; font-size: 240%;" id="h1">Hier könnt ihr speichern, auf welche Seiten euer LieblingsScript angewendet werden soll:</div>';
var Satz2='<div style="color:yellow;position: absolute; left: 50%; margin-left: -500px; top: 440px;" id="anleitung">So gehts: Anklicken, wieviele Links ihr braucht (auf diesen Seiten wird euer Anonymusme-Script zusätzlich zu den regulären Diebspielen, die in der Anleitung sind, noch angezeigt)</div>';
var Satz3='<div style="color:yellow;position: absolute; left: 50%; margin-left: -500px; top: 460px;" id="anleitung2">eure Links einfügen, oder verändern und auf Speichern klicken. Von nun an werden auf den betreffenden Seiten die berühmt berüchtigten 3 Anonymus-Buttons angezeigt :T, Viel Spaß!</div>';
var Zeile1='<input name="1" value="'+No1+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 580px;"/>';
var Zeile2='<input name="2" value="'+No2+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 580px;"/>';
var Zeile3='<input name="3" value="'+No3+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 580px;"/>';
var Zeile4='<input name="4" value="'+No4+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 580px;"/>';
var Zeile5='<input name="5" value="'+No5+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 870px; font-size: 140%; width: 580px;"/>';
var Zeile6='<input name="6" value="'+No6+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 920px; font-size: 140%; width: 580px;"/>';

var Zeile7='<input name="7" value="'+No7+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 670px; font-size: 140%; width: 580px;"/>';
var Zeile8='<input name="8" value="'+No8+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 720px; font-size: 140%; width: 580px;"/>';
var Zeile9='<input name="9" value="'+No9+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 770px; font-size: 140%; width: 580px;"/>';
var Zeile10='<input name="10" value="'+No10+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 820px; font-size: 140%; width: 580px;"/>';
var Zeile11='<input name="11" value="'+No11+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 870px; font-size: 140%; width: 580px;"/>';
var Zeile12='<input name="12" value="'+No12+'" type="text" style="visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 920px; font-size: 140%; width: 580px;"/>';

var Zeilen=""+Zeile1+Zeile2+Zeile3+Zeile4+Zeile5+Zeile6+Zeile7+Zeile8+Zeile9+Zeile10+Zeile11+Zeile12+"";


var K1="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('2')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 420px; font-size: 140%; width: 600px;');document.getElementsByName('3')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 470px; font-size: 140%; width: 600px;');document.getElementsByName('4')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 520px; font-size: 140%; width: 600px;');document.getElementsByName('5')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('6')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('7')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 970px; font-size: 140%; width: 600px;');document.getElementsByName('8')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1020px; font-size: 140%; width: 600px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1070px; font-size: 140%; width: 600px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1120px; font-size: 140%; width: 600px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1170px; font-size: 140%; width: 600px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1220px; font-size: 140%; width: 600px;');";

var K2="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('3')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 470px; font-size: 140%; width: 600px;');document.getElementsByName('4')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 520px; font-size: 140%; width: 600px;');document.getElementsByName('5')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('6')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('7')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 970px; font-size: 140%; width: 600px;');document.getElementsByName('8')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1020px; font-size: 140%; width: 600px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1070px; font-size: 140%; width: 600px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1120px; font-size: 140%; width: 600px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1170px; font-size: 140%; width: 600px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1220px; font-size: 140%; width: 600px;');";

var K3="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 600px;');document.getElementsByName('4')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 520px; font-size: 140%; width: 600px;');document.getElementsByName('5')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('6')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('7')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 970px; font-size: 140%; width: 600px;');document.getElementsByName('8')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1020px; font-size: 140%; width: 600px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1070px; font-size: 140%; width: 600px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1120px; font-size: 140%; width: 600px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1170px; font-size: 140%; width: 600px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1220px; font-size: 140%; width: 600px;');";

var K4="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 600px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 600px;');document.getElementsByName('5')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('6')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('7')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 970px; font-size: 140%; width: 600px;');document.getElementsByName('8')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1020px; font-size: 140%; width: 600px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1070px; font-size: 140%; width: 600px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1120px; font-size: 140%; width: 600px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1170px; font-size: 140%; width: 600px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1220px; font-size: 140%; width: 600px;');";

var K5="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 600px;');document.getElementsByName('4')[0].setAttribute('style' , ' position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 600px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 600px;');document.getElementsByName('6')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('7')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 370px; font-size: 140%; width: 600px;');document.getElementsByName('8')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1020px; font-size: 140%; width: 600px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1070px; font-size: 140%; width: 600px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1120px; font-size: 140%; width: 600px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1170px; font-size: 140%; width: 600px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1220px; font-size: 140%; width: 600px;');";

var K6="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 600px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 600px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 600px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 600px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 600px;');document.getElementsByName('6')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 600px;');document.getElementsByName('7')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 370px; font-size: 140%; width: 600px;');document.getElementsByName('8')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1020px; font-size: 140%; width: 600px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1070px; font-size: 140%; width: 600px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1120px; font-size: 140%; width: 600px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1170px; font-size: 140%; width: 600px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: -500px; top: 1220px; font-size: 140%; width: 580px;');";

var K7="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('6')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 580px;');document.getElementsByName('7')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('8')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1020px; font-size: 140%; width: 580px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1070px; font-size: 140%; width: 580px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1120px; font-size: 140%; width: 580px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1170px; font-size: 140%; width: 580px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1220px; font-size: 140%; width: 580px;');";

var K8="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('6')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 580px;');document.getElementsByName('7')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('8')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('9')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1070px; font-size: 140%; width: 580px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1120px; font-size: 140%; width: 580px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1170px; font-size: 140%; width: 580px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1220px; font-size: 140%; width: 580px;');";

var K9="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('6')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 580px;');document.getElementsByName('7')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('8')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('9')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('10')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1120px; font-size: 140%; width: 580px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1170px; font-size: 140%; width: 580px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1220px; font-size: 140%; width: 580px;');";

var K10="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width:580px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('6')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 580px;');document.getElementsByName('7')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('8')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('9')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('10')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('11')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1170px; font-size: 140%; width: 580px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1220px; font-size: 140%; width: 580px;');";

var K11="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('6')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 580px;');document.getElementsByName('7')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('8')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('9')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('10')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('11')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('12')[0].setAttribute('style' , 'visibility:hidden; position: absolute; left: 50%; margin-left: 100px; top: 1220px; font-size: 140%; width: 580px;');";

var K12="document.getElementsByName('1')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('2')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('3')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('4')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('5')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('6')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: -500px; top: 820px; font-size: 140%; width: 580px;');document.getElementsByName('7')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 570px; font-size: 140%; width: 580px;');document.getElementsByName('8')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 620px; font-size: 140%; width: 580px;');document.getElementsByName('9')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 670px; font-size: 140%; width: 580px;');document.getElementsByName('10')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 720px; font-size: 140%; width: 580px;');document.getElementsByName('11')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 770px; font-size: 140%; width: 580px;');document.getElementsByName('12')[0].setAttribute('style' , 'position: absolute; left: 50%; margin-left: 100px; top: 820px; font-size: 140%; width: 580px;');";



var Kreuz1='<input type=\"button\" id=\"eins\" value=\"1\" style=\"position: absolute; left: 50%; margin-left: -500px; top: 500px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K1+'\"/>';
var Kreuz2='<input type=\"button\" id=\"zwei\" value=\"2\" style=\"position: absolute; left: 50%; margin-left: -300px; top: 500px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K2+'\"/>';
var Kreuz3='<input type=\"button\" id=\"drei\" value=\"3\" style=\"position: absolute; left: 50%; margin-left: -100px; top: 500px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K3+'\"/>';
var Kreuz4='<input type=\"button\" id=\"vier\" value=\"4\" style=\"position: absolute; left: 50%; margin-left: 100px; top: 500px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K4+'\"/>';
var Kreuz5='<input type=\"button\" id=\"fuenf\" value=\"5\" style=\"position: absolute; left: 50%; margin-left: 300px; top: 500px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K5+'\"/>';
var Kreuz6='<input type=\"button\" id=\"sechs\" value=\"6\" style=\"position: absolute; left: 50%; margin-left: 500px; top: 500px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K6+'\"/>';

var Kreuz7='<input type=\"button\" id=\"sieben\" value=\"7\" style=\"position: absolute; left: 50%; margin-left: -500px; top: 525px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K7+'\"/>';
var Kreuz8='<input type=\"button\" id=\"acht\" value=\"8\" style=\"position: absolute; left: 50%; margin-left: -300px; top: 525px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K8+'\"/>';
var Kreuz9='<input type=\"button\" id=\"neun\" value=\"9\" style=\"position: absolute; left: 50%; margin-left: -100px; top: 525px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K9+'\"/>';
var Kreuz10='<input type=\"button\" id=\"zehn\" value=\"10\" style=\"position: absolute; left: 50%; margin-left: 100px; top: 525px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K10+'\"/>';
var Kreuz11='<input type=\"button\" id=\"elf\" value=\"11\" style=\"position: absolute; left: 50%; margin-left: 300px; top: 525px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K11+'\"/>';
var Kreuz12='<input type=\"button\" id=\"zwoelf\" value=\"12\" style=\"position: absolute; left: 50%; margin-left: 500px; top: 525px; font-size: 140%; width: 200px;\" onClick=\"javascript:'+K12+'\"/>';

var Kreuze=  ""+Kreuz1+Kreuz2+Kreuz3+Kreuz4+Kreuz5+Kreuz6+Kreuz7+Kreuz8+Kreuz9+Kreuz10+Kreuz11+Kreuz12+"";


var Buno='javascript:document.getElementById(\'alles\').setAttribute(\'style\',\'visibility:hidden\'); document.getElementById(\"Button1\").setAttribute(\'style\',\'visibility:hidden\');document.getElementById(\'Button2\').setAttribute(\'style\',\'visibility:visible\');';
var ButtonNo1='<input type=\"button\" id=\"Button1\" value=\"Hide Selbstpender-Menu\" style=\"position: absolute; left: 40%; top: 10px; font-size: 140%; width: 300px;\" onClick=\"'+Buno+';\"/>';
var Buno2="javascript:document.getElementById(\'alles\').setAttribute(\'style\',\'visibility:visible\');document.getElementById(\"Button1\").setAttribute(\"style\",\"visibility:visible\");;document.getElementById(\"Button2\").setAttribute(\"style\",\"visibility:hidden\");";
var ButtonNo2='<input type=\"button\" id=\"Button2\" value=\"Show Selbstpender-Menu\" style=\"visibility:hidden;position: absolute; left: 40%; top: 10px; font-size: 140%; width: 300px;\" onClick=\"'+Buno2+';\"/>';

var Save='<input type=\"button\" id=\"Save\" value=\"Speichern\" style=\"position: absolute; margin-left: 700px; top: 440px; width: 170px; left: 40%; font-size: 300%;\" />';

var Img5='<div style=\"position: absolute; left: 50%; margin-left: -550px; top: 890px; font-size: 140%; width: 21px; height:26px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_08.jpg)repeat;\"></div>';
var Img6='<div style=\"position: absolute; left: 50%; margin-left: -550px; top: 380px; font-size: 140%; width: 21px; height:30px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_01.jpg)repeat;\"></div>';
var Img7='<div style=\"position: absolute; left: 50%; margin-left: 750px; top: 890px; font-size: 140%; width: 22px; height:26px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_10.jpg)repeat;\"></div>';
var Img8='<div style=\"position: absolute; left: 50%; margin-left: 750px; top: 380px; font-size: 140%; width: 22px; height:24px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_04.jpg)repeat;\"></div>';

var Img4='<div style=\"position: absolute; left: 50%; margin-left: -540px; top: 890px; font-size: 140%; width: 1300px; height:26px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_09.jpg)repeat;\"></div>';
var Img3='<div style=\"position: absolute; left: 50%; margin-left: 750px; top: 390px; font-size: 140%; width: 22px; height:500px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_07.jpg)repeat;\"></div>';
var Img2='<div style=\"position: absolute; left: 50%; margin-left: -550px; top: 390px; font-size: 140%; width: 21px; height:500px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_05.jpg)repeat;\"></div>';
var Img1='<div style=\"position: absolute; left: 50%; margin-left: -540px; top: 380px; font-size: 140%; width: 1300px; height:30px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_02.jpg)repeat;\"></div>';
var Img='<div style=\"position: absolute; left: 50%; margin-left: -550px; top: 390px; font-size: 140%; width: 1300px; height:500px;background: url(http://www.damneddefiants.com/themes/XDuty/images/tables_06.jpg)repeat;\"></div>';
var Images = ""+Img+Img1+Img2+Img3+Img4+Img5+Img6+Img7+Img8+"";



document.body.innerHTML= document.body.innerHTML+"<form id='alles'>"+Images+Satz+Satz2+Satz3+Zeilen+Kreuze+Save+"</form>";

document.getElementById('Save').addEventListener('click', function Schliessen () {
GM_setValue ("No1in", document.getElementsByName("1")[0].value);
GM_setValue ("No2in", document.getElementsByName("2")[0].value);
GM_setValue ("No3in", document.getElementsByName("3")[0].value);
GM_setValue ("No4in", document.getElementsByName("4")[0].value);
GM_setValue ("No5in", document.getElementsByName("5")[0].value);
GM_setValue ("No6in", document.getElementsByName("6")[0].value);

GM_setValue ("No7in", document.getElementsByName("7")[0].value);
GM_setValue ("No8in", document.getElementsByName("8")[0].value);
GM_setValue ("No9in", document.getElementsByName("9")[0].value);
GM_setValue ("No10in", document.getElementsByName("10")[0].value);
GM_setValue ("No11in", document.getElementsByName("11")[0].value);
GM_setValue ("No12in", document.getElementsByName("12")[0].value);

window.location.reload();
},false);


}


//Und zum Schluss danke ich noch all meinen Fans, "ohne euch wär ich nie so weit gekommen"[sondern weiter]*kotz* :D