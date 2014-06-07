// ==UserScript==
// @name	Punktestatistik
// @namespace	???
// @author	Fapsi
// @description Speichert deine Punkte einmal taeglich...
// @include	http://uni*.ogame.de/*
// ==/UserScript==
 
//Global Consts----------------------------------------->
const c_PointStats="Punkte-Statistik";
const c_Players="Spielerzahl";
const c_Place="Platz";
const c_Points="Punkte";
const c_PointDates="Datum";
//End Global Consts------------------------------------->

//Global Funcs------------------------------------------>
function Speichern(key,value) 
{
GM_setValue(key,value);
}
function Laden(key,defaultvalue)
{
return GM_getValue(key,defaultvalue);
}
//End Global Funcs-------------------------------------->

// Global Vars------------------------------------------>


try{
var Session=document.URL.split("session=")[1].substring(0,12);
var Frame=document.URL.split("page=")[1].split("&")[0];
}catch(e){var Frame=""; var Session="";}

try {
var Uni=parseInt(document.URL.split("uni")[1].split(".ogame.de")[0]);
}catch(e){ /* alert("Achtung, Wahrscheinlich kein Deutsches Ogame!"); */}

try{
var ScriptSeite=document.URL.split("script_seite=")[1].substring(0,1);
}catch(e) {ScriptSeite=0;}

//End Global Vars--------------------------------------->

//*************************************************************************************************************************************************************************
function Punkte(){
var Datum=document.body.innerHTML.match(/([a-z]{1,3}) (\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/gi)[0];
try {
var PreString=document.body.innerHTML.match(/<th(.*)\(Platz(.*)\)/i)[0].replace(/\./g,'');
var Punkte=PreString.split(">")[1].split(" (")[0];
var Platz=PreString.split(">")[2].split("<")[0];
var AllePlatz=PreString.split("von ")[1].split(")")[0];
} catch(e) {return false;}
var Cache=Datum.substring(0,3);
switch(Cache){
	//Achtung noch erweitern !!!!!
case "Jan": var Monat=1; break;
case "Feb": var Monat=2; break;
case "Mar": var Monat=3; break;
case "Apr": var Monat=4; break;
}
var Tag=Datum.split(" ")[1];
var Jahr=2007;

var AllePunkte=Laden("Uni=" + Uni + "Punktedaten","");
if (AllePunkte.indexOf(Tag + "." + Monat + "." + Jahr) == -1){
Speichern("Uni=" + Uni + "Punktedaten", AllePunkte + "|" + Tag + "." + Monat + "." + Jahr);
Speichern("Uni=" + Uni + "Punkte" + Tag + "." + Monat + "." + Jahr , Punkte + "%" + Platz + "%" + AllePlatz);
Speichern("Uni=" + Uni + "Punkteanzahl", (parseInt(Laden("Uni=" + Uni + "Punkteanzahl",0)) + 1) );
}
}
//*************************************************************************************************************************************************************************
function Link(){

var Tabellen=document.getElementsByTagName("table");
for (var i=0;i<Tabellen.length;i++)
{
if ((Tabellen[i].getAttribute("width") == 110))
	{
	var Neu =Tabellen[i].appendChild(document.createElement("tr"));
	Neu.innerHTML="<td><div align=\"center\"><font color=\"#ffffff\"><a href=\"index.php?page=overview&session=" + Session + "&script_seite=1\">" + c_PointStats + "</a></font></div></td>";
	}//end if
}//end for
} // end func Link
//*************************************************************************************************************************************************************************

Link();

switch(Frame){
case "overview":
	switch(ScriptSeite){
	case "1":
	Text="";
	Abstand=0;
	var Cache=0;
	for (i=parseInt(Laden("Uni=" + Uni + "Punkteanzahl",0));i>=1;i--){
	var AllePunkte=Laden("Uni=" + Uni + "Punktedaten","");
	var Empfangen=Laden("Uni=" + Uni + "Punkte" + AllePunkte.split("|")[i],"");

	if (i>=2){ var Empfangeneinsvorher=Laden("Uni=" + Uni + "Punkte" + AllePunkte.split("|")[i-1],"");
		Abstand=Empfangeneinsvorher.split("%")[1]-Empfangen.split("%")[1];
		if (Abstand>0) Abstand="<font color=lime>+" + Abstand + "</font>";
		else Abstand="<font color=red>" + Abstand + "</font>"; 
	} else {Abstand="<font color='#87ceeb'>*</font>";}

	Text +="<tr><th>" + AllePunkte.split("|")[i] + "</th><th>" + Empfangen.split("%")[0] + "</th><th>"+Abstand+"</th><th>" + Empfangen.split("%")[1] + "</th><th>" + Empfangen.split("%")[2] + "</th></tr>";
	}//end for
	document.body.innerHTML="<div style='border-style:solid; border-width:0;width: 30%; height:50%;overflow:auto;'><table width='95%'><tr><td colspan=5 class=c>" + c_PointStats + "</td></tr><tr><td class=c>" + c_PointDates + "</td><td class=c>" + c_Points + "</td><td class=c>+/-</td><td class=c>" + c_Place + "</td><td class=c>" + c_Players + "</td></tr>" + Text + "</table></div><p><a href='index.php?page=overview&session=" + Session + "'>Zur&uuml;ck</a></p>";
	break;
	default:
	Punkte();
	break;}
break;
default:
break;}
