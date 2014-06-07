// ==UserScript==
// @name            IT2-Cookie
// @namespace       de
// @description     Versandpreis per Klick berechnen
// @author          orangenkonzentrat
// @include         http://www.itycoon2.de/transport/old/*
// @date            2013-6-6
// @version         1.6
// ==/UserScript==

//---------------main--------------------------
adblock=false;
var TransportVolumen=3000;


//immer 1?
/*
if(document.getElementById("calculator_dialog")==null) { var vip_form = document.getElementsByTagName("form")[0]; }
else { var vip_form = document.getElementsByTagName("form")[1];}
alert(vip_form)
*/
var vip_form = document.getElementsByTagName("form")[1];
//Transportmenge (TM)
var TM = get_value(1);

//test: tm_position=vip_form
//var tm_position2 = vip_form;
var tm_insert2 = vip_form.getElementsByTagName("div")[0];	//muss 1 oder hoher sein
//alert(tm_insert2)
var cookieName = document.cookie;
var lagergr=0;
var cookieGebaeudeNr=-1;
while(cookieName != ''){
	var SearchGleich = cookieName.search(/=+/);
	var cookiename = cookieName.substr(0,SearchGleich);
	cookieGebaeudeNr = cookieName.substr(cookieName.search(/#+/)+1,cookieName.search('#')+4);
	var cookiewert = cookieName.slice(cookieName.search(/Lagergroesse+/)+13,cookieName.search(/#+/)-1);
	//TODO fehler!
	//es darf hier nicht mehr als 100 gebaeude geben

	if(cookiewert == '')
	{cookiewert = cookieName.substr(SearchGleich+1,SearchGleich+5);}

	if(cookiename == ' Lagergroesse'){
		lagergr=cookiewert;
//		alert("cookiewerte: "+cookiewert);
//		alert("cookieGebaeudeNr: "+cookieGebaeudeNr);
		break;
	}else{
//		alert(">"+cookiename+"<");
		i = cookieName.search(';')+1;
		if(i == 0){i = cookieName.length;}
		cookieName = cookieName.substring(i,cookieName.length);
	}
}
//document.getElementsByTagName('select')[1].selectedIndex = 11;
//11 = fabrik 10
var select =0;
var cookieButton = document.createElement("button");
cookieButton.setAttribute('onClick',"javascript:set_value('stock_amount','" + CheckTP(TM,lagergr) + "');"+
		"document.getElementsByTagName('select')[1].selectedIndex = "+cookieGebaeudeNr+";");
var buttonText = document.createTextNode("cookieButton: "+lagergr+"");
cookieButton.appendChild(buttonText);
vip_form.insertBefore(cookieButton, tm_insert2);

//---------------end main------------------------------------

//transportmenge kleiner als verfügbar? 
//immer runden?!?
function CheckTP(TM,lagergr){
	if(lagergr>TransportVolumen){
		lagergr=TransportVolumen;
	}
	if(TM<lagergr){
		return TM-(TM%250);	
	}else{
		return lagergr-(lagergr%250);
	}
}

/////////////////////////// //
//Funktion: Werte ermitteln //
/////////////////////////// //

function get_value(elem) {
	var element = vip_form.getElementsByTagName("p")[elem].getElementsByTagName("a")[0];
	element = element.innerHTML;
	//	if(elem==2) { element = "215,17€" }			// Testparameter PP/MP
	//	else if(elem==3) { element = "2.415,17€" };	// Testparameter MP/PP
	element = element.slice(element.search(/\d+/),element.search(/\s/));
	//	if (emem==1){

	//	if(elem!=1) {
	//		alert(element);
	element = element.replace(/\./, "");		// Tausenderpunkt entfernen
	//		alert(element);
	element = element.replace(/\,/, ".");		// Komma in Punkt verwandeln
	//		alert(element);
	//	};				
	element = parseFloat(element); 	// € - Zeichen filtern
	//	alert(element);
	return element;
}

