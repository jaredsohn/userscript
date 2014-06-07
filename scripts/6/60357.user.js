// ==UserScript==
// @name	[PG] Pfandrechner
// @Author	kingfr3sh
// @namespace	http://userscripts.org/scripts/show/60357 (thx@ the_tiger & bazie)
// @version	2.2 Test Updatefunktion
// @description	Pfandflaschenrechner fuer alle Städte

// @include	*pennergame.de/stock/bottle/*
// @include	*bumrise.com/stock/bottle/*
// @include	*mendigogame.es/stock/bottle/*
// @include	*dossergame.co.uk/stock/bottle/*
// @include	*clodogame.fr/stock/bottle/*
// @include	*menelgame.pl/stock/bottle/*
// @include	*serserionline.com/stock/bottle/*
// @include	*faveladogame.com.br/stock/bottle/*
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
if (url.indexOf("halloween.pennergame")>=0) {
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

wirkung.parentNode.parentNode.parentNode.parentNode.innerHTML += "<tr><td></td><td>Betrag durch Flaschen:</td><td id='geldzelle'></td></tr><tr><td></td><td>Gesamtbetrag:</td><td id='geldgeszelle'></td></tr><tr id='zeile4'></tr><tr id='zeile5'></tr><tr id='zeile6'></tr><tr id='zeile7'></tr>"
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

document.getElementById("zeile4").innerHTML= "<td></td><td colspan='2'><hr><table border='0' rules='cols'><tr><td>Wechselkurs 07-12ct:</td><td width='60'>07ct</td><td width='60'>08ct</td><td width='60'>09ct</td><td width='60'>10ct</td><td width='60'>11ct</td><td width='60'>12ct</td></tr><tr bgcolor='#4b2929'><td bgcolor='#292929'>Geld:</td><td id='07' width='60'></td><td id='08' width='60'></td><td id='09' width='60'></td><td id='10' width='60'></td><td id='11' width='60'></td><td id='12' width='60'></td></tr></table></td>";

document.getElementById("zeile5").innerHTML= "<td></td><td colspan='2'><hr><table border='0' rules='cols'><tr><td>Wechselkurs 13-18ct:</td><td width='60'>13ct</td><td width='60'>14ct</td><td width='60'>15ct</td><td width='60'>16ct</td><td width='60'>17ct</td><td width='60'>18ct</td></tr><tr bgcolor='#4b2929'><td bgcolor='#292929'>Geld:</td><td id='13' width='60'></td><td id='14' width='60'></td><td id='15' width='60'></td><td id='16' width='60'></td><td id='17' width='60'></td><td id='18' width='60'></td></tr></table></td>";

document.getElementById("zeile6").innerHTML= "<td></td><td colspan='2'><hr><table border='0' rules='cols'><tr><td>Wechselkurs 19-24ct:</td><td width='60'>19ct</td><td width='60'>20ct</td><td width='60'>21ct</td><td width='60'>22ct</td><td width='60'>23ct</td><td width='60'>24ct</td></tr><tr bgcolor='#4b2929'><td bgcolor='#292929'>Geld:</td><td id='19' width='60'></td><td id='20' width='60'></td><td id='21' width='60'></td><td id='22' width='60'></td><td id='23' width='60'></td><td id='24' width='60'></td></tr></table></td>";

document.getElementById("zeile7").innerHTML= "<td></td><td colspan='2'><hr><table border='0' rules='cols'><tr><td>Wechselkurs 25-30ct:</td><td width='60'>25ct</td><td width='60'>26ct</td><td width='60'>27ct</td><td width='60'>28ct</td><td width='60'>29ct</td><td width='60'>30ct</td></tr><tr bgcolor='#FF6600'><td bgcolor='#292929'>Geld:</td><td id='25' width='60'></td><td id='26' width='60'></td><td id='27' width='60'></td><td id='28' width='60'></td><td id='29' width='60'></td><td id='30' width='60'></td></tr></table></td>";

var geldarray = new Array();
geldarray[0] = document.getElementById("07");
geldarray[1] = document.getElementById("08");
geldarray[2] = document.getElementById("09");
geldarray[3] = document.getElementById("10");
geldarray[4] = document.getElementById("11");
geldarray[5] = document.getElementById("12");
geldarray[6] = document.getElementById("13");
geldarray[7] = document.getElementById("14");
geldarray[8] = document.getElementById("15");
geldarray[9] = document.getElementById("16");
geldarray[10] = document.getElementById("17");
geldarray[11] = document.getElementById("18");
geldarray[12] = document.getElementById("19");
geldarray[13] = document.getElementById("20");
geldarray[14] = document.getElementById("21");
geldarray[15] = document.getElementById("22");
geldarray[16] = document.getElementById("23");
geldarray[17] = document.getElementById("24");
geldarray[18] = document.getElementById("25");
geldarray[19] = document.getElementById("26");
geldarray[20] = document.getElementById("27");
geldarray[21] = document.getElementById("28");
geldarray[22] = document.getElementById("29");
geldarray[23] = document.getElementById("30");

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
         document.getElementById("menge_verkauf").value = "1";
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

// **********************************************************************************

// Version ermitteln
var oldVersion = 1;
if (document.getElementsByClassName('zleft profile-data').length > 0)
    oldVersion = 0;

/*-*/

var intervalTime = 4000;
var done = " -/-"; // text after counter reached 0:00
var done0 = "00:00"; // alternative text after counter reached 0:00
var time = String(new Date().getTime());
var counter = done;
var fcounter = done;
var nameTime = "time";
var nameLastCollectTime = "LastCollectTime";
var checkInterval;


var THISSCRIPTVERSION = "2.2";
var THISSCRIPTNUMMER = "60357";
var THISSCRIPTNAME = "Pfandflaschensammler";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/'+THISSCRIPTNUMMER+'';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/'+THISSCRIPTNUMMER+'.user.js'; // Skript-URL bei userscripts.org


// ***********************************************************************************************
// ***********************************************************************************************
// check for a new script version and display a message, if there is one
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate() {
    // create and format actual date
    var today = new Date();
    var tagesdatum = FormatDate(today);

    // if not searched for a new version of the script today
    if (GM_getValue("LastUpdateCheck","") != tagesdatum) {
        // load the script page on userscripts.org
        GM_xmlhttpRequest({
            method: 'GET', 
            url: THISSCRIPTINSTALL_URL, 
            onload: function(responseDetails) {
                var content = responseDetails.responseText;
                                
                // find the script version
                var scriptversion = content.split("<b>Version:</b>")[1];
                var scriptfullversion = trimString(scriptversion.split("</p")[0]);
                scriptversion = trimString(scriptversion.split("</p")[0]).substr(0, 5);
                
                // if there is a new version of the script
                if (scriptversion != THISSCRIPTVERSION) {
                    // build the message
                    var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlie&szlig;end durchgef&uuml;hrt werden.\n\nHinweis: Die &uuml;berpr&uuml;fung auf neue Versionen wird nur einmal pro Tag durchgef&uuml;hrt."

                    // display the message
                    alert(alerttext);
                    // load the page with the new script for installation
                    window.location.href = THISSCRIPTSOURCE_URL;
                }
            }
        });

        // memorize the new date
        GM_setValue("LastUpdateCheck", tagesdatum)
    }
}
