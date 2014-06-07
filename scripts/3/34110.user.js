// ==UserScript==
// @name           Wurzelimperium
// @namespace      http://userscripts.org/scripts/show/34110
// @date           02.05.2011
// @version        1.0.1
// @include		   http://userscripts.org/scripts/show/34110
// @include        http://*bg.molehillempire.com/*
// @exclude        http://forum.bg.molehillempire.com/*
// @include        http://*zeleneimperium.cz/*
// @exclude        http://forum.zeleneimperium.cz/*
// @include        http://*wurzelimperium.de/*
// @exclude        http://wurzelforum.wurzelimperium.de/*
// @include        http://*molehillempire.es/*
// @exclude        http://forum.molehillempire.es/*
// @include        http://*molehillempire.fr/*
// @exclude        http://forum.molehillempire.fr/*
// @include        http://*kipourosendrasi.gr/*
// @exclude        http://forum.kipourosendrasi.gr/*
// @include        http://*kertbirodalom.hu/*
// @exclude        http://forum.kertbirodalom.hu/*
// @include        http://*molehillempire.nl/*
// @exclude        http://forum.molehillempire.nl/*
// @include        http://*zieloneimperium.pl/*
// @exclude        http://forum.zieloneimperium.pl/*
// @include        http://*pt.molehillempire.com/*
// @exclude        http://forum.pt.molehillempire.com/*
// @include        http://*molehillempire.se/*
// @exclude        http://forum.molehillempire.se/*
// @include        http://*bahcivanlardiyari.com/*
// @exclude        http://forum.bahcivanlardiyari.com/*
// @include        http://*molehillempire.com/*
// @exclude        http://board.molehillempire.com/*
// ==/UserScript==

const USO_ID    ="34110";
const USO_Home  ="http://userscripts.org/scripts/show/"+USO_ID;
const USO_Source="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
const USO_Meta  ="http://userscripts.org/scripts/source/"+USO_ID+".meta.js";

// ********* funtions ********************************************************************
// Umlaute
var ae = "\u00E4";	var oe = "\u00F6";	var ue = "\u00FC";
var Ae = "\u00C4";	var Oe = "\u00D6";	var Ue = "\u00DC";
var sz = "\u00DF";

function $(ID) {return document.getElementById(ID)}
function $top(ID) {return top.document.getElementById(ID);}
function removeElement(node){node.parentNode.removeChild(node)}
function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}
function click(A){
try{
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
	if (A.href){ location.href = A.href; }
}catch(err){
	GM_log("ERROR click: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
	throw ("ERROR click: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
}
}
function explode(str,debugName,defaultReturn){
	//GM_log("Begin explode "+ str);
	if(debugName==undefined){ debugName = ""; }
	if(str==undefined){ 
		throw ("Explode error "+debugName+". Argument is undefined."); 
	}
	if(typeof str != "number" && typeof str != "string"){
		throw ("Explode error "+debugName+". Argument is not a string nor a number."); 
	}
	if(str==""){ return undefined; }
	
	try{
		return eval('(' + str + ')');
	} catch(err){
		if(defaultReturn==undefined){
			GM_log("ERROR Explode "+debugName+". Argument:" + str+" \n" + err);
			throw ("Explode error "+debugName+". Argument:" + str+" \n" + err);
		}else{
			GM_log("WARNING Explode "+debugName+" returns given default. Argument:" + str+" \n" + err);
			return defaultReturn;
		}
	}
}
function implode(arr){
	try{
		var line = new String();
		var InternalCounter = -1;
		var NoKey = new Boolean(false);
		if (typeof arr == "string"){ return arr; }
		if (typeof arr == "boolean"){ return arr.toString(); }
		if (typeof arr == "number"){ return arr.toString(); }
		if (typeof arr != "object") throw("Argument not a Object or Array :" + typeof arr +"<br>");
		var type = (arr instanceof Array); //true->array | false->object

		line = (type)?"[":"{";
		for(var i in arr ){
			try{
				if(!arr.hasOwnProperty(i)){
					//GM_log("implode hasOwnProperty i:"+i);
					continue;
				}
				InternalCounter++;
				if (type){
					while (i>InternalCounter){
						line += ",";
						InternalCounter++;
					}
				}else{ //arr == object
					line += "\"" + i + "\"";
					line += ":";
				}
				if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
					line += arr[i];
				} else if (typeof arr[i] == "string"){
					line += "\"" + arr[i].replace(/\\/g,"\\\\").replace(/\"/g,"\\\"") + "\"";
				} else if(typeof arr[i] == "undefined"){
					line += 'undefined';
				} else if(arr[i] == null){
					line += 'null';
				} else {
					line += implode(arr[i]);
				}
				line += ",";
			}catch(err){
				GM_log("ERROR: implode i:"+i+"\n"+err);
				continue;
			}
		}
		var endChar = line.substring(line.length-1,line.length);
		return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
	} catch (err){
		GM_log("Implode error : " + err);
		throw ("Implode error : " + err);
	}
}
function getFrameByName(a){
	var fr = top.document.getElementsByTagName("iframe");
	for (var v=0;v<fr.length;v++){
		if (fr[v].name == a){ return fr[v]; }
	}
}
function numberFormat(number,decimals,dec_point,thousands_sep){
	// http://kevin.vanzonneveld.net
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +     bugfix by: Michael White (http://getsprink.com)
	// +     bugfix by: Benjamin Lupton
	// +     bugfix by: Allan Jensen (http://www.winternet.no)
	// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +     bugfix by: Howard Yeend
	// +    revised by: Luke Smith (http://lucassmith.name)
	// +     bugfix by: Diogo Resende
	// +     bugfix by: Rival
	// %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
	// *     example 1: numberFormat(1234.56);
	// *     returns 1: '1,235'
	// *     example 2: numberFormat(1234.56, 2, ',', ' ');
	// *     returns 2: '1 234,56'
	// *     example 3: numberFormat(1234.5678, 2, '.', '');
	// *     returns 3: '1234.57'
	// *     example 4: numberFormat(67, 2, ',', '.');
	// *     returns 4: '67,00'
	// *     example 5: numberFormat(1000);
	// *     returns 5: '1,000'
	// *     example 6: numberFormat(67.311, 2);
	// *     returns 6: '67.31'

	var n = number, prec = decimals;
	n = !isFinite(+n) ? 0 : +n;
	prec = !isFinite(+prec) ? 0 : Math.abs(prec);
	var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
	var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!

	var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

	var abs = Math.abs(n).toFixed(prec);
	var _, i;

	if (abs >= 1000) {
		_ = abs.split(/\D/);
		i = _[0].length % 3 || 3;

		_[0] = s.slice(0,i + (n < 0)) +
			 _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

		s = _.join(dec);
	} else {
		s = s.replace('.', dec);
	}
	return s;
}
function getRandom( min, max ){
	if ( min > max ){return( -1 );	}
	if ( min == max ){return( min );}
	return( min + parseInt( Math.random() * ( max-min+1 ),10 ) );
}

const GAMEPAGES = {"bg":"bg.molehillempire.com","cz":"zeleneimperium.cz","de":"wurzelimperium.de","es":"molehillempire.es","fr":"molehillempire.fr","gr":"kipourosendrasi.gr","hu":"kertbirodalom.hu","nl":"molehillempire.nl","pl":"zieloneimperium.pl","pt":"pt.molehillempire.com","se":"molehillempire.se","tr":"bahcivanlardiyari.com","uk":"molehillempire.com"};
var LNG = null;
var SERVER = null;
var PAGE = null;
var pageZusatz = new Object();
if(location.search!=""){
	var help = location.search.replace(/^\?/,"").split(/\&/);
	for(var v=0;v<help.length;v++){
		var help2 = help[v].split(/\=/);
		pageZusatz[help2[0]] = help2[1];
	}
}

var texte = new Object();
var delimThou = ".";
var regDelimThou = /\./g;
var delimDeci = ",";
var regDelimDeci = /,/;
const fieldsize = [17,12]; // width,height

window.addEventListener("load",function(){
if(location.href==USO_Home){
	//$("install_script").firstElementChild.innerHTML = "Already installed";
	return false;
}
// ********** Multilingual *****************************************************
if (location.hostname.match(GAMEPAGES["bg"])) {
	LNG = "bg";
}
else if (location.hostname.match(GAMEPAGES["cz"])) {
	LNG = "cz";
}
else if (location.hostname.match(GAMEPAGES["de"])) {
	LNG = "de";
}
else if (location.hostname.match(GAMEPAGES["es"])) {
	LNG = "es";
}
else if (location.hostname.match(GAMEPAGES["fr"])) {
	LNG = "fr";
}
else if (location.hostname.match(GAMEPAGES["gr"])) {
	LNG = "gr";
}
else if (location.hostname.match(GAMEPAGES["hu"])) {
	LNG = "hu";
}
else if (location.hostname.match(GAMEPAGES["nl"])) {
	LNG = "nl";
}
else if (location.hostname.match(GAMEPAGES["pl"])) {
	LNG = "pl";
}
else if (location.hostname.match(GAMEPAGES["pt"])) {
	LNG = "pt";
}
else if (location.hostname.match(GAMEPAGES["se"])) {
	LNG = "se";
}
else if (location.hostname.match(GAMEPAGES["tr"])) {
	LNG = "tr";
}
else if (location.hostname.match(GAMEPAGES["uk"])) {
	LNG = "uk";
	delimThou = ",";
	regDelimThou = /,/g;
	delimDeci = ".";
	regDelimDeci = /\./;
}

switch (LNG) {
case "bg": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "cz": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "de": {
texte["optionen"] = "Optionen";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Alles bepflanzen";
texte["uhrFertig"] = "%1% Uhr fertig";
texte["geheZuGartenX"] = "Gehe zu Garten %1%";
// settings
texte["anzahlGaerten"] = "Anzahl deiner G"+ae+"rten";
texte["schaedlingeKlickbar"] = "Ich will keine Maulw"+ue+"rfe anklicken k"+oe+"nnen.";
texte["giessbonus"] = "Dein Gie"+sz+"-Bonus";
texte["knappeBestaende"] = "Knappe Best"+ae+"nde hervorheben ab...";
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Passwort";
texte["loeschen"] = "l"+oe+"schen";
texte["zeigePasswoerter"] = "zeige Passw"+oe+"rter";
break;}
case "es": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "fr": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "gr": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "hu": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "nl": {
texte["optionen"] = "Opties";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Alles planten";
texte["uhrFertig"] = "Planten om %1% uur klaar";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Aantal van uw stranden";
texte["schaedlingeKlickbar"] = "Ik wil geen kolibries kunnen aanklikken.";
texte["giessbonus"] = "Uw bewaterings-bonus";
texte["knappeBestaende"] = "Highlight lage voorraad aantal bij ...";
texte["accountAktiv"] = "Actieve account";
texte["server"] = "Server";
texte["name"] = "Naam";
texte["passwort"] = "Paswoord";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "Paswoord tonen";
break;}
case "pl": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "pt": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "se": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "tr": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "uk": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
// settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the molehills.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
}
if(LNG==null){ return false; }

GM_registerMenuCommand("Wurzelimperium"+" "+"Update", function(){
	location.href=USO_Source;
});
GM_registerMenuCommand("Wurzelimperium"+" "+texte["scriptHomepage"], function(){
	window.open(USO_Home);
});
// *****************************************************************************

var loc = new RegExp("s(\\d+)\\."+GAMEPAGES[LNG].replace(/\./g,"\\."),"i").exec(location.hostname);
if(loc){
	SERVER = loc[1];
	PAGE = location.pathname.replace(/^\//,"").replace(/\.php.*$/,"");
	var username = GM_getValue(LNG+"_"+SERVER+"_username","");
//return;
	if(username==""){ 
		GM_log("USERNAME MISSING @ "+location.href)
		location.href = "http://www."+GAMEPAGES[LNG]; 
	}

	var valSchutz = GM_getValue(LNG+"_"+SERVER+"_"+username+"_valSchutz",true);
	var valGartencount = GM_getValue(LNG+"_"+SERVER+"_"+username+"_valGartencount",1);
	var valGiess = GM_getValue(LNG+"_"+SERVER+"_"+username+"_valGiess",5);
	var valRackLow = GM_getValue(LNG+"_"+SERVER+"_"+username+"_valRackLow",0);
	var valAutoNr = GM_getValue(LNG+"_"+SERVER+"_"+username+"_valAutoNr",-1);
	
	var ALL = document.getElementsByTagName("body")[0];
	
	// CSS
	GM_addStyle("table.hovercc9 tr:hover{background-color:#cc9;}");
	
	switch (PAGE) {
	case "main"	  : do_main();break;
	case "garten_map" : do_garten_map();break;
	case "verkauf_map": do_verkauf_map();break;
	case "login": do_login();break;
	}
} else {
	do_login(); 
}

// *****************************************************************************

function closeInfoPanel(){
	try{
		$top("infoPanel").setAttribute("name","");
		$top("infoPanel").style.display = "none";
	} catch(err){}
}

function do_main () {
	GM_addStyle(".formattedRackItem{position:absolute;top:3px;left:0;width:40px;font-size:7pt;color:#555555;text-align:center;}");
	GM_addStyle(".lowrack{background-color:orangered!important;color:#000!important;background-image:none!important;}");

	var candspan = document.getElementsByTagName("span");
	var candimg = document.getElementsByTagName("img");
	var rackInfo = $("rackInfo");
	
	var werbediv = $top("upsimtoolbar");
	if (werbediv) werbediv.style.display = "none";
	werbediv = $top("uptoolbar");
	if (werbediv) werbediv.style.display = "none";
	document.body.style.margin="0px";
	
	if(!unsafeWindow.lng_t_garten){
		unsafeWindow.lng_t_garten = new Object();
		for(var v=1;v<=valGartencount;v++){ unsafeWindow.lng_t_garten[v] = v.toString(); }
		unsafeWindow.lng_t_garten["stadt"] = unsafeWindow.t_stadt_name[1];
		unsafeWindow.lng_t_garten["stadt2"] = unsafeWindow.t_stadt_name[2];
	}
	var help = 5;
	for(var v=1;v<=valGartencount;v++){ 
		var newdiv = createElement("div",{"id":"divGartenChange"+v,"title":unsafeWindow.lng_t_garten[v].replace(/&nbsp;/g," "),"class":"link","onclick":"waehleGarten("+v+")","style":"position:fixed;top:"+help+"px;left:0px;width:36px;height:36px;background-color:blue;border:2px solid "+($top("garten_aktuell_nummer").innerHTML==v?"white":"#244510")+";"},ALL);
		createElement("img",{"border":"0","src":unsafeWindow._GFX+"pics/garten/garten"+v+".jpg","style":"width:36px;height:36px;"},newdiv); 
		help += 45;
	}
	help += 20;
	if(unsafeWindow.lng_t_garten["gh"]){
		var newdiv = createElement("div",{"title":unsafeWindow.lng_t_garten["gh"].replace(/&nbsp;/g," "),"class":"link","onclick":"zeigeGewaechshaus()","style":"position:fixed;top:"+help+"px;left:0px;width:36px;height:36px;background-color:blue;"},ALL);
		createElement("img",{"border":"0","src":unsafeWindow._GFX+"pics/greenhouse/greenhouse_out.gif","style":"width:36px;height:36px;"},newdiv); 
		// pics/garten/garten_gh.jpg
		help += 40;
	}
	if(unsafeWindow.zeigeStadtMain){
		var newdiv = createElement("div",{"title":unsafeWindow.lng_t_garten["stadt"].replace(/&nbsp;/g," "),"class":"link","onclick":"zeigeStadtMain(1)","style":"position:fixed;top:"+help+"px;left:0px;width:36px;height:36px;background-color:blue;"},ALL);
		createElement("img",{"border":"0","src":unsafeWindow._GFX+"pics/garten/garten_stadt.jpg","style":"width:36px;height:36px;"},newdiv); 
		help += 40;
		var weekday = new Date().getDay();
		if((unsafeWindow.player_auto>0)||(weekday==3)||(weekday==6)){
			newdiv = createElement("div",{"title":unsafeWindow.lng_t_garten["stadt2"].replace(/&nbsp;/g," "),"class":"link","onclick":"player_auto=1;zeigeStadtMain(2);","style":"position:fixed;top:"+help+"px;left:0px;width:36px;height:36px;background-color:blue;"},ALL);
			createElement("img",{"border":"0","src":unsafeWindow._GFX+"pics/garten/garten_stadt.jpg","style":"width:36px;height:36px;"},newdiv); 
		}
		// http://s29.wurzelimperium.de/stadt/index.php?karte=2
		/*
		parent.createBus();
		parent.Event.add(document.getElementById("bus"),"click",function(){ 
			parent.stadt_resetAnimation();
			location.href="http://s29.wurzelimperium.de/stadt/index.php?karte=2";
			parent.g("bedientext").innerHTML = "Schreberlingen"; 
			parent.g("erntewasserpic").style.display = "block"; 
			parent.g("erntewasserpic").src = "http://d3o68bgrbhx8hn.cloudfront.net/pics/stadt/stadt2_mini.gif";
			parent.g("lager_pic").className = "";
		}); 
		*/

	} else {
		var newdiv = createElement("div",{"title":unsafeWindow.lng_t_garten["stadt"].replace(/&nbsp;/g," "),"class":"link","onclick":"verkauframe.zeigeStadt()","style":"position:fixed;top:"+help+"px;left:0px;width:36px;height:36px;background-color:blue;"},ALL);
		createElement("img",{"border":"0","src":unsafeWindow._GFX+"pics/garten/garten_stadt.jpg","style":"width:36px;height:36px;"},newdiv); 
		// help += 40;
		// if(true){
		// 	newdiv = createElement("div",{"title":unsafeWindow.lng_t_garten["stadt2"].replace(/&nbsp;/g," "),"class":"link","onclick":"zeigeStadtMain(2)","style":"position:fixed;top:"+help+"px;left:0px;width:36px;height:36px;background-color:blue;"},ALL);
		// 	createElement("img",{"border":"0","src":unsafeWindow._GFX+"pics/garten/garten_stadt.jpg","style":"width:36px;height:36px;"},newdiv); 
		// }
	}
	
	if (valAutoNr>-1) $("garten").setAttribute("style","background: url('"+unsafeWindow._GFX+"pics/garten/garten_"+valAutoNr+".jpg') no-repeat scroll left top transparent;");
	
	// ********* settings ******************************************************************
	createElement("div",{"id":"infoPanel","name":"","style":"position:absolute;top:50px;left:50px;width:620px;height:580px;background-color:#b8a789;border:2px solid black;-moz-border-radius: 10px;z-index:101;display:none;"},$("garten_komplett"));
	function buildInfoPanel(mode){
		if(mode==$("infoPanel").getAttribute("name")){ closeInfoPanel(); }
		else {
			$("infoPanel").setAttribute("name",mode);
			$("infoPanel").innerHTML = "";
			$("infoPanel").style.display = "block";
			var divInfo = createElement("div",{"class":"tnormal","style":"position:absolute;width:560px;height:560px;margin:10px;overflow:auto;"},$("infoPanel"));
			var newimg = createElement("img",{"class":"link","src":unsafeWindow._GFX+"pics/close.jpg","style":"position:absolute;top:10px;right:10px;width: 20px;height: 20px;"},$("infoPanel"));
			newimg.addEventListener("click",closeInfoPanel,false);
			
			var newtable,newtr,newtd,newtd1,newdiv,newdiv1,newinput;
			switch(mode){
			case "options":{	
				createElement("div",{"align":"center","style":"line-height:30px;font-weight:bold;"},divInfo,texte["optionen"]);
				newtable = createElement("table",{"style":"width:100%;","border":"1","class":"hovercc9"},divInfo);
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("select",{"id":"selectvalGartencount"},newtd);
				for(var w=1;w<5;w++){ createElement("option",{"value":w},newinput,w); }
				newinput.value = valGartencount;
				newinput.addEventListener("change",function(){
					GM_setValue(LNG+"_"+SERVER+"_"+username+"_valGartencount",this.value);
				},false);
				createElement("td",{},newtr,texte["anzahlGaerten"]);

				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalSchutz","type":"checkbox","checked":valSchutz},newtd);
				newinput.addEventListener("click",function(){
					GM_setValue(LNG+"_"+SERVER+"_"+username+"_valSchutz",this.checked);
				},false);
				createElement("td",{},newtr,texte["schaedlingeKlickbar"]);
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalGiess","style":"width:21px;text-align:center;","value":valGiess,"maxlength":2},newtd);
				newinput.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					if(help>4){
						this.value=help;
						GM_setValue(LNG+"_"+SERVER+"_"+username+"_valGiess",help);
						showCropReadyTime();
					} else {
						this.value="";
					}
				},false);
				createElement("td",{},newtr,texte["giessbonus"]);
						
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalRackLow","style":"width:50px;text-align:center;","value":valRackLow,"maxlength":5},newtd);
				newinput.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					if(help>=0){
						this.value = help;
						valRackLow = help;
						GM_setValue(LNG+"_"+SERVER+"_"+username+"_valRackLow",valRackLow);
					} else {
						this.value = "";
					}
				},false);
				createElement("td",{},newtr,texte["knappeBestaende"]);
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalAutoNrActive","type":"checkbox","checked":(valAutoNr>-1),"maxlength":1},newtd);
				newinput.addEventListener("click",function(){
					if(this.checked){
						$("inputvalAutoNr").value="0";
						GM_setValue(LNG+"_"+SERVER+"_"+username+"_valAutoNr",0);
					} else {
						GM_setValue(LNG+"_"+SERVER+"_"+username+"_valAutoNr",-1);
					}
				},false);
				newinput = createElement("input",{"id":"inputvalAutoNr","style":"width:21px;text-align:center;","value":(valAutoNr>-1?valAutoNr:""),"maxlength":1},newtd);
				newinput.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					if(help>=0){
						this.value=help;
						GM_setValue(LNG+"_"+SERVER+"_"+username+"_valAutoNr",help);
					} else {
						this.value="";
					}
				},false);
				createElement("td",{},newtr,"Fahrzeug Nummer");
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputtmin","style":"width:50px;text-align:center;","value":GM_getValue(LNG+"_"+SERVER+"_"+username+"_tmin",1),"maxlength":4},newtd);
				newinput.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					if(help>0){
						this.value=help;
						GM_setValue(LNG+"_"+SERVER+"_"+username+"_tmin",help);
					} else {
						this.value = 1;
					}
				},false);
				createElement("span",{},newtd,"ms");
				createElement("td",{},newtr,"Minimale Klickzeit");
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputtmax","style":"width:50px;text-align:center;","value":GM_getValue(LNG+"_"+SERVER+"_"+username+"_tmax",1),"maxlength":4},newtd);
				newinput.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					if(help>0){
						this.value=help;
						GM_setValue(LNG+"_"+SERVER+"_"+username+"_tmax",help);
					} else {
						this.value = 1;
					}
				},false);
				createElement("span",{},newtd,"ms");
				createElement("td",{},newtr,"Maximale Klickzeit");
				
				// AutoLogin
				createElement("div",{"align":"center","style":"line-height:30px;margin-top:20px;font-weight:bold;"},divInfo,"AutoLogin");
				newtable=createElement("table",{"id":"tableAutologin","align":"center"},divInfo);
				function buildLoginTable(showPW) {
					var logindata = new Array();
					try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		
					function saveLogin(){
						GM_setValue("logindata",implode(logindata));
					}
					var newtable = createElement("table",{"align":"center"});
					$("tableAutologin").parentNode.replaceChild(newtable,$("tableAutologin"));
					newtable.id = "tableAutologin";
					newtable.addEventListener("change",saveLogin,false);
					var newtr = createElement("tr",{},newtable);
					createElement("th",{},newtr,texte["server"]);
					createElement("th",{},newtr,texte["name"]);
					createElement("th",{},newtr,texte["passwort"]);
					var newtd,newinput,newselect,newdiv
					for (var v=0;v<logindata.length;v++){
						newtr = createElement("tr",{},newtable);
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginActive"+v,"type":"checkbox","title":texte["accountAktiv"],"checked":logindata[v][4]},newtd);
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginActive","")][4] = this.checked; },false);				
						newinput = createElement("input",{"id":"loginServer"+v,"style":"width:20px","maxlength":"2"},newtd);
						if (isNaN(logindata[v][1])){ logindata[v][1]="0";}
						if (logindata[v][1]!="0"){ newinput.value = logindata[v][1]; }
						newinput.addEventListener("change",function(){
							var readin = parseInt(this.value,10);
							if (isNaN(readin) || (readin<1)) {alert("Ung"+ue+"ltiger Server!"); this.value="";}
							else { 
								this.value = readin; 
								logindata[this.id.replace("loginServer","")][1] = readin;
							}
						},false);
						newselect = createElement("select",{"id":"loginLng"+v},newtd);
						for(var w in GAMEPAGES)	createElement("option",{"value":w},newselect,w);
						newselect.value = logindata[v][0];
						newselect.addEventListener("change",function(){ logindata[this.id.replace("loginLng","")][0] = this.value; },false);				
		
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginName"+v,"style":"width:150px","value":logindata[v][2],"maxlength":"20"},newtd);
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginName","")][2] = this.value; },false);				
						
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginPW"+v,"style":"width:150px","value":logindata[v][3],"maxlength":"20"},newtd);
						if (!showPW){ newinput.type = "password"; }
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginPW","")][3] = this.value; },false);				
		
						newtd=createElement("td",{},newtr);
						if (v>0) {
							newdiv = createElement("div",{"id":"loginUp"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
							createElement("img",{"src":unsafeWindow._GFX+"pics/quest_up.gif","style":"width:14px;height:10px;"},newdiv);
							newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
							newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
							newdiv.addEventListener("click",function(){
								var currLine=parseInt(this.id.replace("loginUp",""),10);
								logindata.splice(currLine-1,2,logindata[currLine],logindata[currLine-1]);
								saveLogin();
								buildLoginTable(showPW);
							},false);
						}
						if (v<logindata.length-1) {
							newdiv = createElement("div",{"id":"loginDown"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
							createElement("img",{"src":unsafeWindow._GFX+"pics/quest_down.gif","style":"width:14px;height:10px;"},newdiv);
							newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
							newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
							newdiv.addEventListener("click",function(){
								var currLine=parseInt(this.id.replace("loginDown",""),10);
								logindata.splice(currLine,2,logindata[currLine+1],logindata[currLine]);
								saveLogin();
								buildLoginTable(showPW);
							},false);
						}
						
						newtd=createElement("td",{"title":texte["loeschen"],"id":"loginDelete"+v},newtr);
						createElement("img",{"src":unsafeWindow._GFX+"pics/popin/contracts/anullieren.gif","class":"link2","style":"width: 16px;height: 16px;"},newtd);
						newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
						newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
						newtd.addEventListener("click",function(){
							var currLine=this.id.replace("loginDelete","");
							logindata.splice(currLine,1);
							saveLogin();
							buildLoginTable(showPW);
						},false);
					}
					
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{colspan:"5","class":"link","style":"font-weight:bold;font-size:16px;text-align:right;"},newtr,"+");
					newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
					newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
					newtd.addEventListener("click",function(){
						logindata.push([LNG,"0","","",false]); // neue leere zeile
						saveLogin();
						buildLoginTable(showPW);
					},false);
					newtable=null;newtr=null;newtd=null;newinput=null;newselect=null;newdiv=null;
				}
				buildLoginTable(false);
				var newdiv = createElement("div",{"align":"center"},divInfo);
				newinput = createElement("input",{"type":"checkbox","class":"link","checked":false},newdiv);
				newinput.addEventListener("click",function(){buildLoginTable(this.checked);},false);
				createElement("span",{},newdiv,texte["zeigePasswoerter"]);
				
			}
			}
		}
	}
		
	var settingsDiv = $top("contentwrapper").getElementsByClassName("rahmen_hoch")[2];
	var newbutton = createElement("button",{"type":"button","class":"link"},settingsDiv,texte["optionen"]);
	newbutton.addEventListener("click",function(){ buildInfoPanel("options"); },false);	
	// newbutton = createElement("button",{"type":"button","class":"link"},settingsDiv,texte["scriptHomepage"]);
	// newbutton.addEventListener("click",function(){ window.open(USO_Home); },false);
	
	// ********* lager ******************************************************************
	
	function showCropReadyTime(){
		var jetzt = new Date();
		jetzt = (jetzt.getHours()*60 + jetzt.getMinutes())*60+jetzt.getSeconds();
		var giess = 1-valGiess*0.01;
		var help = /(\d+):(\d+):(\d\d)/.exec($("lager_zeit").innerHTML);
		var zeit = parseInt(help[1],10)*3600 + parseInt(help[2],10)*60 + parseInt(help[3],10);
		zeit = zeit * giess;
		while (zeit > 86400) { zeit = (zeit - 86400) *giess; }
		zeit = Math.round((zeit+jetzt) % 86400);
		var zeitstr = Math.floor(zeit/3600)+':';
		zeit = Math.floor((zeit%3600)/60);
		zeitstr += (zeit<10?"0":"")+ zeit;
		$("bedientext").innerHTML = '<font color="blue">'+texte["uhrFertig"].replace(/%1%/,zeitstr)+'</font>';
	}
	showCropReadyTime();
	unsafeWindow.regal._showProductInfo = unsafeWindow.regal.showProductInfo;
	unsafeWindow.regal.showProductInfo = function(pid){
		unsafeWindow.regal._showProductInfo(pid);
		showCropReadyTime();
	}	

	function doRack(){
		var cand = $("regal").getElementsByClassName("regalItem");
		var cell,cell2;
		for (var v=0;v<cand.length;v++) {
			if(cand[v].style.display=="none"){ continue; }
			cell = cand[v].getElementsByClassName("formattedRackItem");
			cell2 = cand[v].getElementsByClassName("anz")[0];
			if(cell[0]){
				cell = cell[0];
			} else {
				//cell = cand[v].parentNode.parentNode;
				//cell.setAttribute("class",(cell.getAttribute("class")+" link").replace(/(^|\s+)link\s+/g," ").replace(/^\s+/,""));
				cell = cell2.cloneNode(true);
				cand[v].appendChild(cell);
				cell2.style.display = "none";
			}
			var currProd = parseInt(cand[v].id.replace("regal_",""),10);
			var amount = parseInt(cell2.innerHTML,10)
			var str = numberFormat(amount,0,"","").replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
			if(cell.innerHTML!=str){ cell.innerHTML = str; }
			str = "anz formattedRackItem"+(amount<valRackLow?" lowrack":"");
			if(cell.getAttribute("class")!=str){ cell.setAttribute("class",str); }
		}
		cand=null;cell=null;cell2=null;
	}
	doRack();
	unsafeWindow.regal._updateRegal = unsafeWindow.regal.updateRegal;
	unsafeWindow.regal.updateRegal = function(container,mode,dragged) {	
		unsafeWindow.regal._updateRegal(container,mode,dragged);
		doRack();
	}

	//var rackamount = /< (\d+)/.exec(unsafeWindow.changeRack);
	//rackamount = (rackamount?parseInt(rackamount[1],10):3);
	//while($("regal_change").childNodes.length>0){ removeElement($("regal_change").firstChild); }
	if((unsafeWindow._PREMIUM=="0")&&(unsafeWindow._REGALZAHL>1)){
		var newimg = createElement("img",{"id":"rackchange_left","style":"position:absolute;top:478px;left:0;","class":"link","src":unsafeWindow._GFX+"pics/lager/links_still.gif"},$("lager2"));
		newimg.addEventListener("mouseover",function(){ this.src = unsafeWindow._GFX+"pics/lager/links_over.gif"; },false);
		newimg.addEventListener("mouseout",function(){ this.src = unsafeWindow._GFX+"pics/lager/links_still.gif"; },false);
		newimg.addEventListener("click",function(){
			unsafeWindow.regal.zeigeRegal(unsafeWindow.regal.aktRegal==1?unsafeWindow.regal.maxRegal:unsafeWindow.regal.aktRegal-1); 
		},false);
		newimg = createElement("img",{"id":"rackchange_right","style":"position:absolute;top:478px;right:0;","class":"link","src":unsafeWindow._GFX+"pics/lager/rechts_still.gif"},$("lager2"));
		newimg.addEventListener("mouseover",function(){ this.src = unsafeWindow._GFX+"pics/lager/rechts_over.gif"; },false);
		newimg.addEventListener("mouseout",function(){ this.src = unsafeWindow._GFX+"pics/lager/rechts_still.gif"; },false);
		newimg.addEventListener("click",function(){
			unsafeWindow.regal.zeigeRegal(unsafeWindow.regal.aktRegal<unsafeWindow.regal.maxRegal?unsafeWindow.regal.aktRegal+1:1); 
		},false);
	}
}

// **************************************************************************
var tmin = GM_getValue(LNG+"_"+SERVER+"_"+username+"_tmin",1);
var tmax = GM_getValue(LNG+"_"+SERVER+"_"+username+"_tmax",1);
if(tmax<tmin){ tmin = tmax; }
var linecount;
function autoPlant(v){
//GM_log("autoPlant BEGIN "+v);
	if (v<=fieldsize[0]*fieldsize[1]){
		var prodInfo = top.window.wrappedJSObject.regal.getProductInfos(top.window.wrappedJSObject.selected);
		if(top.window.wrappedJSObject.regal.getCount(top.window.wrappedJSObject.selected)>0){
			if (v%fieldsize[0]==1){ linecount = 0; }
			var frei = true;
			if (unsafeWindow.garten_kategorie[v] && ((unsafeWindow.garten_kategorie[v]!="v") || (unsafeWindow.garten_zeit[v]!="0"))){ 
				frei = false; // 1x1 not free
			} else {
				if (prodInfo.sx == "2"){
					if (v%fieldsize[0]==0){
						frei = false; // 2x1 but breaking right border
					} else {
						var w = v+1;
						if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ 
							frei = false; // 2x1 not free
						} else {
							if (prodInfo.sy == "2"){
								if (fieldsize[0]*(fieldsize[1]-1)<v){ frei = false; } // 2x2 but breaking bottom border
								else {
									w = v+fieldsize[0];
									if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ 
										frei = false; // 2x2 not free
									} else {
										w++;
										if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ 
											frei = false; // 2x2 not free
										}
									}
								}
							}
						}
					}
				}
			}
    
			if (frei){
				click($("f"+v));
				v += prodInfo.sx; // v += parseInt(top.window.wrappedJSObject.global_x,10);
				linecount += prodInfo.sx; // linecount += parseInt(top.window.wrappedJSObject.global_x,10);
				if (linecount>=fieldsize[0]){ v += fieldsize[0]*(prodInfo.sy-1); }
				// if (linecount>11){ v += 12*(parseInt(top.window.wrappedJSObject.global_y,10)-1); }
				window.setTimeout(function(){
					autoPlant(v);
				},getRandom(tmin,tmax));
			} else {
				autoPlant(v+1);
			}
		}
	}
}
/*
function autoWater(v){
	if (v<=fieldsize[0]*fieldsize[1]){
		if ((unsafeWindow.garten_kategorie[v]=="v") && (unsafeWindow.garten_zeit[v]!="0") && ((unsafeWindow.garten_wasser[v]=="0")||(unsafeWindow.garten_wasser[v]==""))){
			window.setTimeout(function(){
				click($("f"+v));
				autoWater(v+parseInt(unsafeWindow.garten_max_x[v],10));
			},getRandom(tmin,tmax));
		} else {
			autoWater(v+1);
		}
	}
}
*/
function autoWater(v){
try{
	if(top.window.wrappedJSObject.jsTimeStamp){
		if (v<=fieldsize[0]*fieldsize[1]){ // feldNr valid
			if ((unsafeWindow.garten_kategorie[v]=="v") && (unsafeWindow.garten_zeit[v]!="0")){ 
				// bepflanzt
				if ((unsafeWindow.garten_wasser[v]=="0")||(unsafeWindow.garten_wasser[v]=="")){	
					// noch nie gegossen
					window.setTimeout(function(){
						click($("f"+v)); // giesse
						autoWater(v+parseInt(unsafeWindow.garten_max_x[v],10));
					},getRandom(tmin,tmax));
				}else{
					var jetzt = top.window.wrappedJSObject.Zeit.Server;
					if(parseInt(unsafeWindow.garten_wasser[v],10) < jetzt-86400){ 
						// letztes giessen laenger als 24h alt
						window.setTimeout(function(){
							click($("f"+v)); // giesse
							autoWater(v+parseInt(unsafeWindow.garten_max_x[v],10));
						},getRandom(tmin,tmax));
					}else{
						// pflanze ist noch gegossen
						autoWater(v+1);
					}
				}
			}else{
				// nicht bepflanzt
				autoWater(v+1);
			}
		}
	}else{
		top.window.wrappedJSObject.jsTimeStamp = top.window.wrappedJSObject.Zeit.Client - top.window.wrappedJSObject.Zeit.Verschiebung;
		window.setTimeout(autoWater,100,v);
	}
}catch(err){ GM_log("ERROR autoWater v="+v+"\n"+err); }
}
function do_garten_map(){
	var v=1;
	while($top("divGartenChange"+v)){
		if($top("garten_aktuell_nummer").innerHTML == v){
			$top("divGartenChange"+v).style.border = "2px solid white";
		} else {
			$top("divGartenChange"+v).style.border = "2px solid #244510";
		}
		v++;
	}
	
	//var jetzt = Math.round((new Date()).getTime()/1000);
	var jetzt = top.window.wrappedJSObject.Zeit.Server;
	for (var i=1; i<=fieldsize[0]*fieldsize[1];i++) {
		feld = $("f"+i);
		// u Maulwurf, v Pflanze , z Deko , " leer
		if (valSchutz && unsafeWindow.garten_kategorie[i]=="u"){ feld.removeAttribute("onclick");	}
	
		if (unsafeWindow.garten_kategorie[i]=="v"){
			if (unsafeWindow.garten_zeit[i]>0){
				nextGiess = 86400 + parseInt(unsafeWindow.garten_wasser[i],10);
				if (jetzt<nextGiess && nextGiess<unsafeWindow.garten_zeit[i]) { 
					nextGiess = Math.floor((nextGiess-jetzt)/60);
					h = Math.floor(nextGiess/60);
					m = nextGiess - h*60;
					if (m<10) { newstr= h+":0"+m;}
					else {newstr = h+":"+m;};
					feld.title = newstr;
					if (unsafeWindow.garten_x[i]*unsafeWindow.garten_y[i]==1) { feld.innerHTML += newstr;}
				}
			}
		}
	}
	
	allbtn = createElement("button",{"id":"buttonPlantAll","type":"button","class":"link","style":"position:fixed;top:0px;left:0px;height:20px;"},ALL,texte["allesBepflanzen"]);
	allbtn.addEventListener("click",function(){
		switch(top.window.wrappedJSObject.mode){
		case(0):autoPlant(1);break;
		case(2):autoWater(1);break;
		}
	},true); 
	
	/*
	allbtn = createElement("button",{"type":"button","class":"link","style":"position:fixed;top:0px;left:100px;height:20px;"},ALL,"log data");
	allbtn.addEventListener("click",function(){
		var div = createElement("div",{"style":"position:absolute;top:0;left:0;height:90%;width:90%;background-color:white;z-index:999;overflow:auto;"},ALL);
		div.addEventListener("click",function(){
			removeElement(this);
		},false);
		var table = createElement("table",{"border":"1"},div);
		var tr,td;
		for (var i=1;i<205;i++){
			//GM_log(i+":"+
			tr = createElement("tr",{},table);
			createElement("td",{},tr,i                                  );
			createElement("td",{},tr,unsafeWindow.garten_kategorie[i]   );
			createElement("td",{},tr,unsafeWindow.garten_prod[i]        );
			createElement("td",{},tr,top.window.wrappedJSObject.global_x);
			createElement("td",{},tr,top.window.wrappedJSObject.global_y);
		}                                                               
	},true); 
	*/
}

// *****************************************************************************

function do_verkauf_map(){
try{
	function giess() {
		try{
		click($top("giessen"));
		window.setTimeout(function(){
			click(getFrameByName('garten').contentDocument.querySelector("#buttonPlantAll"));
		},1000);
		}catch(err){ GM_log("ERROR giess\n"+err); }
	}

	// var sensenzwerg = $("helfer_all").querySelector('span[onclick*='harvestAll']');
	// onclick="parent.gardenjs.harvestAll();"
	var newSpan = $("helfer_all").querySelector("span[onclick*='waterAll']");
	if(!newSpan){
		// Kannenzwerg
		var kannenzwergData = "data:image/gif;base64,R0lGODlhGQAtAPezAAAeSgAMNgAtWgAkUQA2ZQEDKUtRXj9BRTkwK0RJUzQsKQA0YnV4fAApVgNCcjs7PTQ4PxcNBQAZRAAwXywvNGNsfEM+PQEROzE1PGt0h0pKSl9gYiogGUVERQcKA6ODezc8RQA8bVBQU2xuc2BjZYGHk1dfbqaorBYZEQsXCx4UBSokI3FhXzEzM01NTmdxfoVuaFtkdHB4iScqLFhXWHl6fWhxhHyGmFBWZIxzbJZ6chMiE0k8Nzs0MkpOU5l8dmJdXUdOWgtLfG13ij9FUGZORFJVWnpgWEo2JkpBQ3plYAA5aDMqI3JcVnF7jkM4NXR9kmNRTVRTUZqAeUpMT2ZpbYGEi0MtDXV2eTstI2pzhZWDf3diXFxUTsCdk1pIQlxcXVNaaUJHSVlMR1Vda7aVjEQ2MldIRDUnEp+pvE0+OYRqYyIVExVShWpdTylCWF5rdpSapmteWgVHeMaimZF3cId1cMi3tNSupGJYVZmitIJ+fL/G0U1EOCQYB0ZWZigZAlFGSG96gDcjBlJDPz08M4mPm3pvbXZ0c317dhNAZV1MRmNlaIKMoIhuZ4NmXFk4SUI1PBROfWxYU/DCtVFaZ4h9e5+AdjA6Kr29wTpFVGpWT0lNSomRoEtGS1tQP6GQjUlOWJ6mtZyIg4+HfShgkY6SmFNca11hbLe5vdClmU1IRxciNHlpYruakZyfpHZhXDIlI4iKjf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALMALAAAAAAZAC0AAAj/AGcJHEiwoMGDCAUKSMiQIAACDRsGGLAgIsMAAARUtGiwAMYGEyByJFjggoQBAkSOnOXxAoABDRaotFjAo4SXDVI6GNnyJsoJC5bwDOAzp8wQQmgSfSlA45IQDnZGDOASpoCQUOcknQoA5wSsDrSWaniB1YweFpJ4SqDpjSIHbdo0pKCgyJE1OXR8+HBJB4s3khq2QMDikJ0fH8p4oYNH1Zg/DQ/0kAOEgaXEoE5kumMhIg0FCBSY6VJnChAgW0Y9iLhhhQIeHBBwUYIASZEmGiI+QMDji5oVhKIo+NKEy4iILcwcgQHryaY1k2C4qsMgoogVjxwleRAIjB06lPKc/7BIAcEqMZEgicDiRYkPjh1aHHjgQwQVRhvEWOFI5YCLAyRUAQYJI2zwikUcaOCCER0wwEAVJFhRgxQWeTADDS48wEANI4ggCyc7VJhCBxp0UAMWNGxAggchRpRCCjtYIMUeiGhgAQoodEFKRAhgggIbESgQCxtPRMDED1NswdAZMOjAgUBjyCFQImrkkEMUS7LwgxsEVVBdK1nwsAhDGJCBikAjkFGBAUGYIlAWHKiAUAQgdJZAKC9kYAAFFdgwUCEeRIBGQUyo0AMFs/ggyAsVQACHDVq8MFAEfgwqkAqADHKFQDMEAUcMRJiQQQZD+ClQH1wS9MkVSAyUQCUGGF8whBONQKHFSrMQgUMGN6SRhhMl4IqBCUPIcAMUNwS7EgUJxFCBDDLEgANBJxgSGQREGIDDKSaAgAEIEBihRwlxNPRtAgaEYUACB0AAwQF8iFJuQwkEEcZBqXSCK0MBAQA7";
		newSpan = createElement("span",{"style":"position:absolute;z-index:1;width:25px;height:45px;top:0px;right:210px;background:url('"+kannenzwergData+"') top left no-repeat;","class":"link"},$("helfer_all"));
		newSpan.addEventListener("click",giess,true);
		// Forscherzwerge
		for(var i=1;i<=3;i++){
			newSpan = $("helfer_all").querySelector("span[onclick*='show_fz("+i+")']");
			if(newSpan){ newSpan.style.right=(199+41*i)+"px"; }
		}
		// Pflanzautomat
		newSpan = $("automat");
		if(newSpan){ newSpan.style.right="363px"; }
	}
}catch(err){ GM_log("ERROR do_verkauf_map\n"+err); }
}

// *****************************************************************************

function do_login(){
	if(top!=self){ return false; }
	if(!((location.pathname=="/")||(location.pathname.match(/^\/login\.php/)))){
		window.setTimeout(function(){ location.href = "http://www."+GAMEPAGES[LNG]+"/"; },100); //auf start-seite leiten
	} else if (pageZusatz["logout"]){ 
		window.setTimeout(function(){ location.href = "http://www."+GAMEPAGES[LNG]+"/"; },100); //auf start-seite leiten
	} else { 
		// paypal
		var newform = createElement("form",{"id":"paypalForm","action":"https://www.paypal.com/cgi-bin/webscr","method":"post","style":"position:absolute;top:30px;left:100px;"},ALL);
		createElement("input",{"type":"hidden","name":"cmd","value":"_donations"},newform);
		createElement("input",{"type":"hidden","name":"business","value":"jessica_holtkamp@web.de"},newform);
		createElement("input",{"type":"hidden","name":"lc","value":((LNG=="de")?"DE":"US")},newform);
		createElement("input",{"type":"hidden","name":"item_name","value":"MyFreeFarm Script"},newform);
		createElement("input",{"type":"hidden","name":"no_note","value":"0"},newform);
		createElement("input",{"type":"hidden","name":"currency_code","value":"EUR"},newform);
		createElement("input",{"type":"hidden","name":"bn","value":"PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"},newform);
		createElement("input",{"type":"image","border":"0","src":"https://www.paypal.com/"+((LNG=="de")?"de_DE/DE":"en_US")+"/i/btn/btn_donate_LG.gif","name":"submit",alt:"PayPal"},newform);
		createElement("img",{"alt":"","border":"0","src":"https://www.paypal.com/en_US/i/scr/pixel.gif","width":"1","height":"1"},newform);
		newform=null;
	
		// login
		var Now = Math.floor((new Date()).getTime()/1000);
		var keydologin = /dologin=(\d+)/;
		var keydoserver = /doserver=(\d+)/;
		var logindata = new Array();
		try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		var c=0;
		var servers = new Object();
		for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
			c++;
			servers[logindata[v][0]+"_"+logindata[v][1]] = v;
		}
		var loginButton = $("form_login").querySelector("#submitlogin");
		while(loginButton.nodeType==3){ loginButton = loginButton.nextSibling; }
		loginButton.addEventListener("click",function(){
			var currServer = 1+$("form_login").getElementsByTagName("select")[0].selectedIndex;
			var currUser = $("form_login").querySelector("#login_user").value.toLowerCase();
			GM_setValue(LNG+"_"+currServer+"_username",currUser);
			// alert(currServer+":"+currUser+":"+GM_getValue(LNG+"_"+currServer+"_username",""));
		},false);
		function submit_login(accNr){
			if(logindata[accNr][0]==LNG){
				var form_login = $("form_login");
				form_login.getElementsByTagName("select")[0].selectedIndex=logindata[accNr][1]-1;
				form_login.querySelector("#login_user").value=logindata[accNr][2];
				form_login.querySelector("#login_pass").value=logindata[accNr][3];
				click(loginButton);	
				form_login=null;
			} else {
				location.href = "http://www."+GAMEPAGES[logindata[accNr][0]]+"/login.php?start=1&ref=&wid=&dologin="+accNr;
			}
		}
		var currDoLogin = keydologin.exec(location.href);
		var currDoServer = keydoserver.exec(location.href);
		if(currDoServer){
			var help = GM_getValue(LNG+"_"+currDoServer[1]+"_username","");
			for (var v=0;v<logindata.length;v++){
				if((logindata[v][4])&&(logindata[v][0]==LNG)&&(logindata[v][1]==currDoServer[1])&&(logindata[v][2].toLowerCase()==help)){ 
					currDoLogin = [,v]; 
					break;
				}
			}
			if(!currDoLogin){
				for (var v=0;v<logindata.length;v++){
					if((logindata[v][4])&&(logindata[v][0]==LNG)&&(logindata[v][1]==currDoServer[1])){ 
						currDoLogin = [,v]; 
						break;
					}
				}				
			}
		}
		if(currDoLogin){
			submit_login(currDoLogin[1]);
		} else {
			var newdiv=createElement("div",{"style":"position:absolute;top:-100px;left:300px;"},$("form_login").parentNode);
			var newbutton;
			GM_addStyle(".loginbutton{background-color:white;color:black;text-align:center;font-weight:bold;width:250px;line-height:20px;margin:3px;border:3px solid #6c441e;-moz-border-radius:10px;}");
			GM_addStyle(".loginbutton:hover{background-color:lightblue;}");
			for (var v=0;v<logindata.length;v++) if(logindata[v][4]){
				newbutton = createElement("div",{"class":"link loginbutton","id":"autologin"+v},newdiv,"Server "+logindata[v][1]+"."+logindata[v][0]+": "+logindata[v][2]);
				newbutton.addEventListener("click",function(){
					submit_login(this.id.replace("autologin",""));
				},false);
			}
		
			// Autologin
			var lastbusy = GM_getValue("loginbusy",0);
			if (isNaN(lastbusy) || Now<lastbusy) { lastbusy = 0; }
			if (GM_getValue("valAutoLogin",false) && (c>0) && (Now-lastbusy>15)){
				GM_setValue("loginbusy",Now);
				if (c==1) {
					// Soloaccount
					for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
						submit_login(v);
					}
				} else {
					// Multiaccount
					createElement("div",{"id":"divInfo","style":"position:absolute;top:190px;left:455px;height:200px;width:280px;background-color:#842;border:4px solid black;z-index:99;"},$("loginlayer"));
					$("divInfo").innerHTML = "<h1>"+"Ermittle aktive Sessions. Bitte 5 Sekunden warten<br>..."+"</h1>";
		
					for (var v in servers) {
						GM_setValue(v+"_sessionlost",true);
					}
					window.setTimeout(function(){
						var c = -1;
						for (var v in servers) {
							if (GM_getValue(v+"_sessionlost",true)) {
								if (c==-1) {c=servers[v];}
								else {window.open("http://www."+GAMEPAGES[logindata[servers[v]][0]]+"/login.php?start=1&ref=&wid=&dologin="+servers[v]);}
							}
						}
						GM_setValue("loginbusy",0);
						if (c==-1) {
							// window.close(); <-- funzt nicht :(
							$("divInfo").innerHTML = "<h1>"+"Alle Accounts eingeloggt."+"</h1>";
							window.setTimeout(function(){ location.href=location.href; },5000);
						} else { submit_login(c); }
					},5000);
				}
			}
			newdiv=null;newbutton=null;
		}
	}
}

},false);