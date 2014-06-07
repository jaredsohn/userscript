// ==UserScript==
// @name           Tiempo restante barcos para los DKn
// @namespace      ikatips
// @description    tiempo restante en los viajes de barcos. 
// @include        http://*ikariam.*/index.php*
// @author         Original por Verx - Modificado por shi-tsu para la Alianza DKn -
// @version        20080619 120713 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';
//esta característica es casi estándar, utilizado en muchos scripts de Greasemonkey
if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addIKOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var IKOSTools_Link       = document.createElement('LI');
IKOSTools_Link.setAttribute('id', 'IKOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(IKOSTools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('IKOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>DKn</h2>'
+ '   <ul>'
+ '     <li><a target="_blank" href="http://deathknights.forocreacion.com/forum.htm" title="FORO DKn" align="left">&nbsp;Foro DKn</a></li>'
+ '     <li><a target="_blank" href="http://s4.ikariam.es/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=137557&position=5&type=50" title=" Mensaje a todos " align="left">&nbsp;Mensaje a todos</a></li>'
+ '     <li><a target="_blank" href="http://deathknights.forocreacion.com/chatbox/chatbox.forum?" title=" ChatBox " align="left">&nbsp;ChatBox</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();

// Ikariam Transport Countdown
// version 0.4.0
// 07-16-2008
// Copyright (c) 2008, Matthew Hancock
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ikariam Transport Countdown", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.2.0: Original Public Release
// 0.2.1: Update time increased from 5 seconds to 1 second
// 0.2.2: Fixed Bug that caused Hours not to be displayed
// correctly for long transport times
// 0.3.0: Added countdown to Trading Port
// 0.4.0: Overkill perfected countdown logic and NAN bugs
// ==================================================
//
// This script modifies the Time of Arrival and Mission End
// times on the Trade Fleet page and modifies the Time of 
// Arrival on the Trading Port so that they countdown
// instead of showing a static time.  This makes it easier
// to see how much time is remaining until your transports
// arrive at a glance.
//
// This script was originally created by matthewaaron and perfected by Overkill
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ikariam Transport Countdown PL
// @namespace     http://noobflash.com/gm/
// @description   Convert Ikariam transport times to a countdown instead of static timestamp
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*
// ==/UserScript==


function debug(aMsg) { setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0); }

function itime2Date(ikariamTime){
	var dateTimeString,thisDate,month,day,year,thisTime,hour,minute,second;
	dateTimeString = ikariamTime.split(" ");
	thisDate = dateTimeString[0].split(".");
	year     = parseInt(thisDate[2],10);
	month    = parseInt(thisDate[1],10) - 1;
	day      = parseInt(thisDate[0],10);
	thisTime = dateTimeString[1].split(":");
	hour     = parseInt(thisTime[0],10);
	minute   = parseInt(thisTime[1],10);
	second   = parseInt(thisTime[2],10);
	//debug(ikariamTime + " " + year + " " + month + " " + day);
	return new Date(year,month,day,hour,minute,second);
}

function duration(seconds){
	var x = [Math.floor(seconds/86400) ,	Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 ,	seconds % 60 ];
	var y = ['d'                       , 'h'                            , 'm'                         , 's'];
	var r = [];
	for (var i = 0; i < x.length; ++i){ if (x[i] > 0) { r.push(x[i].toString() + y[i]); } }
	return r.join(' ');
}

function returnTableCells_merchantNavy(serverTime){
	var contents, y;
	var parent = $('mainview').childNodes[3].childNodes[3];
	var TDs = parent.getElementsByTagName("td");
	for (var td=0;td<TDs.length;td++){
		contents = TDs[td].innerHTML;
		if (contents.search(/Pozostalo/) != -1){ contents = TDs[td].firstChild.title; }
		if (contents.search(/\..*\..*:.*:/) != -1){
			y = itime2Date(contents);
			finalTime = y.getTime()-serverTime.getTime();
			//debug("td : " + td + " finalTime : " + finalTime);
			if (finalTime <= 0) {
				clearInterval(ev_updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
				return;
			} else {
				TDs[td].innerHTML = '<span title=\"'+ contents +'\">'+duration(finalTime/1000)+'<br/>Pozostalo</span>';
			}
		}
	}
}

function returnTableCells_port(serverTime){
	var contents, y;
	var parent = $('mainview').childNodes[16].childNodes[3];
	var TDs = parent.getElementsByTagName("td");
	var obj_ServerTime = $('servertime');
	var serverDate     = obj_ServerTime.innerHTML.split(' ')[0];
	for(var td=0;td<TDs.length;td++){
		contents = TDs[td].innerHTML;
		if (contents.search(/Pozostalo/) != -1){ contents = TDs[td].firstChild.title; }
		if (contents.search(':') != -1){
			y = itime2Date(serverDate + " " + contents);
			finalTime = y.getTime()-serverTime.getTime();
			if (finalTime < -1) { finalTime += 86400; }
			if ((finalTime == 0) || (finalTime == -1)) {
				clearInterval(ev_updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
				return;
			}else{
				TDs[td].innerHTML = '<span title="'+ contents +'">'+duration(finalTime/1000)+'<br/>Pozostalo</span>';
			}
		}
	}
}

function $(id) {
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function updateMerchantNavy(){
	var serverTime = itime2Date(obj_ServerTime.innerHTML);
	returnTableCells_merchantNavy(serverTime);
}

function updatePort(){
	var serverTime = itime2Date(obj_ServerTime.innerHTML);
	returnTableCells_port(serverTime);
}

switch(document.body.id) {
	case 'merchantNavy' :
		var obj_ServerTime = $('servertime');
		var ev_updateServerTime = setInterval(updateMerchantNavy, 1000);
		break;
	case 'port' :
		var obj_ServerTime = $('servertime');
		var ev_updateServerTime = setInterval(updatePort, 1000);
		break;
}

// ==UserScript==
// @name          Arrival time of the attacks, blockades, transports and bet troops and fleets in Ikariam.  v0.3
// @namespace     http://
// @description	  Tiempo de llegada de los ataque en Ikariam  
// @include	 http://*.ikariam.*/index.php?view=plunder*
// @include	 http://*.ikariam.*/index.php?view=blockade*
// @include  http://*.ikariam.*/index.php?view=transport*
// @include  http://*.ikariam.*/index.php?view=deployment*
// ==/UserScript==

//Script creado por Elsanto510


//variable global para el texto
var hora_llegada;
var aux1;

//funcion para el idioma
function idioma() {
	if (navigator.userAgent.indexOf("Opera")!=-1) (language=navigator.language)
	else { if (navigator.appName == "Netscape") (language=navigator.language)
	else language=navigator.browserLanguage };

	if (language){
		language=language.substring(0,2)
	}
	else {
		language="en"
	}

	switch (language) {
		//case "en" : hora_llegada="Arrival Time"; break;
		case "en" : hora_llegada="Arrival Time"; break;
		case "es" : hora_llegada="Hora de llegada"; break;
		case "fr" : hora_llegada="Heure d'arrivÃ©e"; break;
		case "it" : hora_llegada="L'orario di arrivo"; break;
		case "pt" : hora_llegada="Hora de chegada"; break;
		case "de" : hora_llegada="Ankunftszeit"; break;
		case "tr" : hora_llegada="Geri DÃ¶nÃ¼s"; break;	
		case "ru" : hora_llegada="Ð’Ñ€ÐµÐ¼Ñ Ð¿Ñ€Ð¸Ð±Ñ‹Ñ‚Ð¸Ñ"; break;
		default : hora_llegada="Arrival Time" 
	} 
}


//aumentamos 1 seg hh:mm:ss
function aumentar(){
	
	var tiempo=aux1;

	var res_h= 0;
	var res_m= 0;
	var res_s= 0;
	
	//sacamos la hora, min y seg	
	str_h=new String(tiempo).substring(0,3);
	if (str_h[0]=="0"){
		str_h=str_h[1];
	}

	str_m=new String(tiempo).substring(3,5);
	if (str_m[0]=="0"){
		str_m=str_m[1];
	}

	str_s=new String(tiempo).substring(6,9);
	if (str_s[0]=="0"){
		str_s=str_s[1];
	}

	res_h= parseInt(str_h);
	res_m= parseInt(str_m);
	res_s= parseInt(str_s)+1; //sumamos a los segundos
	
	//document.getElementById("elsanto510").innerHTML=res_h+"-"+res_m+"-"+res_s;

	if (res_s>=60)
	{
		var res_s2= res_s%60;
		res_m= res_m+((res_s-res_s2)/60);
		res_s = res_s2;
	}

	if (res_m>=60)
	{
		var res_m2= res_m%60;
		res_h= res_h+((res_m-res_m2)/60);
		res_m = res_m2;
	}

	if (res_h>23)
	{
		res_h = res_h%24;
	}

	//los ceros
	if (new String(res_h).length==1)
	{
		res_h="0"+res_h;
	}
	
	if (new String(res_m).length==1)
	{
		res_m="0"+res_m;
	}
	
	if (new String(res_s).length==1)
	{
		res_s="0"+res_s;
	}

	var ret = res_h+":"+res_m+":"+res_s;
	aux1=ret;

	document.getElementById("elsanto510").innerHTML=ret;

	setTimeout(aumentar, 1000); 
}


//funcion que suma el tiempo
function sumar_tiempo(tiempo){

	//sacamos la hora actual
	var localTime = new Date();

	var hora = localTime.getHours();
	var min = localTime.getMinutes();
	var seg = localTime.getSeconds();

	//var ret = hora+"h "+min+"m "+seg+"s";

    //miramos si el tiempo tiene horas, min y segundos.
	var Bhora = false;
	var Ihora = 0;
	var Bmin = false;
	var Imin = 0;
	var Bseg = false;
	var Iseg = 0;

	//sacamos la hora, min y segundos del tiempo
	//el tiempo[47] es > del final del span, maximo de caracteres 11

	var ret = tiempo[47];

	var i = 48;
	var aux_i = 48;
	var finish=false;

    while(!finish){
		if (tiempo[i]=="h")
		{
			Bhora=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}
			
			Ihora= parseInt(aux);			

			//para quitar el espacio
			aux_i=i+1; 
			i++; 
		}

		if (tiempo[i]=="m")
		{
			Bmin=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}

			Imin= parseInt(aux);

			//para quitar el espacio
			aux_i=i+1; 
			i++; 

		}
			
		if (tiempo[i]=="s")
		{
			Bmin=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}
			
			Iseg= parseInt(aux);

			//para quitar el espacio
			aux_i=i+1; 
			i++; 
		}

		if ((i==59) || (tiempo[i]=="<")) //maximo 11 + 48 == 11  or el principio del div
		{
			finish=true;
		}

		i++;

	}

	var res_h= hora + Ihora;
	var res_m= min + Imin;
	var res_s= seg + Iseg;

	if (res_s>=60)
	{
		var res_s2= res_s%60;
		res_m= res_m+((res_s-res_s2)/60);
		res_s = res_s2;
	}

	if (res_m>=60)
	{
		var res_m2= res_m%60;

		res_h= res_h+((res_m-res_m2)/60);
		res_m = res_m2;
	}

	if (res_h>23)
	{
		res_h = res_h%24;
	}

	//los ceros
	if (new String(res_h).length==1)
	{
		res_h="0"+res_h;
	}
	
	if (new String(res_m).length==1)
	{
		res_m="0"+res_m;
	}
	
	if (new String(res_s).length==1)
	{
		res_s="0"+res_s;
	}

	ret = res_h+":"+res_m+":"+res_s;

	return ret;

}

//cuerpo del main
function main(){
	allElements = document.getElementsByTagName('div');

	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
	
		if (thisElement.className=='journeyTime')
			{
			thisElement.style.color = "#0000ff";

			var aux = thisElement.innerHTML;

			//var aux1 = sumar_tiempo(aux);
			aux1 = sumar_tiempo(aux);

			var aux2 = "\t <font color=#ff0000><b>"+hora_llegada+": </b></font><span id=\"elsanto510\">"+aux1+"</span>";
	
			thisElement.innerHTML+=aux2
			}
	}

	//setTimeout('aumentar(aux1)',1000);
	setTimeout(aumentar,1000);
}

idioma();
main();
