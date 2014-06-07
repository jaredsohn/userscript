// ==UserScript==
// @name           [PG] Pfandrechner
// @namespace      by _thetiger_ edit by das_bazie
// @version        1.1
// @description    pfandflaschenrechner fuer alle pennergame
// @include        *pennergame.de/stock/bottle/*
// @include        *bumrise.com/stock/bottle/*
// @include        *mendigogame.es/stock/bottle/*
// @include        *dossergame.co.uk/stock/bottle/*
// @include        *clodogame.fr/stock/bottle/*
// @include        *menelgame.pl/stock/bottle/*
// @include        *serserionline.com/stock/bottle/*
// @include        *faveladogame.com.br/stock/bottle/*
// ==/UserScript==


//Variablen
var regexp = /,/;
var flaschen = document.getElementById("max").value;
var wirkung = document.getElementById("wirkung");
var flaschenzahl = document.getElementById("menge_verkauf").value;
var geldort = document.getElementsByClassName("icon money")[0].innerHTML;
var preisort = document.getElementById("wirkung").innerHTML;


// seitenadresse ermitteln
var url = document.location.href;

if (url.indexOf("pennergame")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3},\d\d/m;
}
if (url.indexOf("malle.pennergame")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3}.\d\d/m;
}
if (url.indexOf("bumrise")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3}.\d\d/m;
}
if (url.indexOf("dossergame")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3}.\d\d/m;
}
if (url.indexOf("mendigogame")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3},\d\d/m;
}
if (url.indexOf("clodogame")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3},\d\d/m;
}
if (url.indexOf("menelgame")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3},\d\d/m;
}
if (url.indexOf("serserionline")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3},\d\d/m;
}
if (url.indexOf("faveladogame")>=0) {
var reg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3}.\d\d/m;
}
	  
      var komma = reg.exec(geldort).toString().split(/,/);

      if (komma[0].indexOf(".")!=-1) {
         var ganzzahl = komma[0].replace(/\./g, "");
         var money = parseFloat(ganzzahl+komma[1]);
      } else {
         var money = parseFloat(komma[0]+komma[1]);
      }
      //Preis auslesen
      var reg2 = /\d\d/m;
      var preis = reg2.exec(preisort);

//Zellvergr&ouml;&szlig;erung und Vergr&ouml;&szlig;erung des Pfandflaschenfeldes
document.getElementById("menge_verkauf").parentNode.parentNode.parentNode.parentNode.style.width="590px";
document.getElementById("menge_verkauf").parentNode.width= "300";
document.getElementById("menge_verkauf").size = "8";

wirkung.parentNode.parentNode.parentNode.parentNode.innerHTML += "<tr><td></td><td>Betrag durch Flaschen:</td><td id='geldzelle'></td></tr><tr><td></td><td>Gesamtbetrag:</td><td id='geldgeszelle'></td></tr><tr id='zeile4'></tr><tr id='zeile5'></tr>"
        //Eingabefeld Flaschenbetrag
				var flaschengeld = document.getElementById("geldzelle");
        var geldfelderst = document.createElement("input");
        geldfelderst.id= "flaschenbetrag";
        geldfelderst.type = "text";
        geldfelderst.size = "8";
        flaschengeld.appendChild(geldfelderst);
        var flaschenbetrag = document.getElementById("flaschenbetrag").value;
        //Eurozeichen
        flaschengeld.innerHTML += "&nbsp;&euro;"

				//Eingabefeld Gesamtbetrag
    		var geldges = document.getElementById("geldgeszelle");
        var geldgesfelderst = document.createElement("input");
        geldgesfelderst.id= "gesamtbetrag";
        geldgesfelderst.type = "text";
        geldgesfelderst.size = "8";
        geldges.appendChild(geldgesfelderst);
        var gesamtbetrag = document.getElementById("gesamtbetrag").value;
        //Eurozeichen
        geldges.innerHTML += "&nbsp;&euro;"

//HTML-Code Infos

document.getElementById("zeile4").innerHTML= "<td></td><td colspan='2'><hr><table border='0' rules='cols'><tr><td>Wechselkurs 10-15ct:</td><td width='60'>10ct</td><td width='60'>11ct</td><td width='60'>12ct</td><td width='60'>13ct</td><td width='60'>14ct</td><td width='60'>15ct</td></tr><tr bgcolor='#4b2929'><td bgcolor='#292929'>Geld:</td><td id='10' width='60'></td><td id='11' width='60'></td><td id='12' width='60'></td><td id='13' width='60'></td><td id='14' width='60'></td><td id='15' width='60'></td></tr></table></td>";

document.getElementById("zeile5").innerHTML= "<td></td><td colspan='2'><hr><table border='0' rules='cols'><tr><td>Wechselkurs 16-21ct:</td><td width='60'>16ct</td><td width='60'>17ct</td><td width='60'>18ct</td><td width='60'>19ct</td><td width='60'>20ct</td><td width='60'>21ct</td></tr><tr bgcolor='#4b2929'><td bgcolor='#292929'>Geld:</td><td id='16' width='60'></td><td id='17' width='60'></td><td id='18' width='60'></td><td id='19' width='60'></td><td id='20' width='60'></td><td id='21' width='60'></td></tr></table></td>";

var geldarray = new Array();
geldarray[0] = document.getElementById("10");
geldarray[1] = document.getElementById("11");
geldarray[2] = document.getElementById("12");
geldarray[3] = document.getElementById("13");
geldarray[4] = document.getElementById("14");
geldarray[5] = document.getElementById("15");
geldarray[6] = document.getElementById("16");
geldarray[7] = document.getElementById("17");
geldarray[8] = document.getElementById("18");
geldarray[9] = document.getElementById("19");
geldarray[10] = document.getElementById("20");
geldarray[11] = document.getElementById("21");

//Funktionen
function kaufm(x) {
  			 var k = (Math.round(x * 100) / 100).toString();
  			 k += (k.indexOf('.') == -1)? '.00' : '00';
  			 var p = k.indexOf('.');
  			 return k.substring(0, p) + ',' + k.substring(p+1, p+3);
}

function geldtabelle(element, index, array) {
				 element.innerHTML = kaufm(element.id * document.getElementById("menge_verkauf").value / 100) +"&nbsp;&euro;";
}

function geldtabellenull(element, index, array) {
         element.innerHTML = "0,00&nbsp;&euro;";
}

function allesauf0() {
         document.getElementById("gesamtbetrag").value = kaufm(money / 100);
         document.getElementById("menge_verkauf").value = "0";
         document.getElementById("flaschenbetrag").value = "0,00";

				 geldarray.forEach(geldtabellenull);
}

function betraggesamt() {
         var flaschenzahl = document.getElementById("menge_verkauf").value;
         var gesamtbetrag = document.getElementById("gesamtbetrag").value.replace(regexp, ".");
         if (Math.ceil((gesamtbetrag * 100 - money)/preis)>=0) {
             document.getElementById("menge_verkauf").value = Math.ceil((gesamtbetrag * 100 - money)/preis);
             document.getElementById("flaschenbetrag").value = kaufm(document.getElementById("menge_verkauf").value * preis / 100);

	       		 geldarray.forEach(geldtabelle);
         } else {
             document.getElementById("menge_verkauf").value = "0";
             document.getElementById("flaschenbetrag").value = "0,00";

						 geldarray.forEach(geldtabellenull);
         }
}


function betragflaschen() {
         var flaschenbetrag = document.getElementById("flaschenbetrag").value.replace(regexp, ".");
         document.getElementById("menge_verkauf").value = Math.ceil(flaschenbetrag * 100 / preis);
         document.getElementById("gesamtbetrag").value = kaufm(money / 100 + document.getElementById("menge_verkauf").value * preis /100);

         geldarray.forEach(geldtabelle);
}

function anzahlflaschen() {
         document.getElementById("gesamtbetrag").value = kaufm(money / 100 + document.getElementById("menge_verkauf").value * preis /100);
         document.getElementById("flaschenbetrag").value = kaufm(document.getElementById("menge_verkauf").value * preis /100);

         geldarray.forEach(geldtabelle);
}

//Timer
var gestimer=false;
var flatimer=false;
var anztimer=false;

function anzahltimer() {
				 if (!anztimer) {
				 		anztimer = setInterval(anzahlflaschen,100);
		 		 } else {
		 		 	  clearInterval(anztimer);
		 		 	  anztimer=false;
		 	  }
}
function flaschentimer() {
				 if (!flatimer) {
				 		flatimer = setInterval(betragflaschen,100);
		 		 } else {
		 		 	  clearInterval(flatimer);
		 		 	  flatimer=false;
		 	  }
}
function gesamttimer() {
				 if (!gestimer) {
				 		gestimer = setInterval(betraggesamt,100);
		 		 } else {
		 		 	  clearInterval(gestimer);
		 		 	  gestimer=false;
		 	  }
}

//Event-Listener
document.getElementById("menge_verkauf").addEventListener('focus',anzahltimer, false);
document.getElementById("menge_verkauf").addEventListener('blur',anzahltimer, false);

document.getElementById("flaschenbetrag").addEventListener('focus',flaschentimer, false);
document.getElementById("flaschenbetrag").addEventListener('blur',flaschentimer, false);

document.getElementById("gesamtbetrag").addEventListener('focus',gesamttimer, false);
document.getElementById("gesamtbetrag").addEventListener('blur',gesamttimer, false);

document.getElementById("menge_verkauf").parentNode.childNodes[7].addEventListener('click',anzahlflaschen, false);

window.addEventListener('load',allesauf0,false);