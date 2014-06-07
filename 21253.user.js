// ==UserScript==
// @name           ExamDateCompute
// @namespace      uni-klu.ac.at
// @description    Berechnet An/Abmeldedatum automatisch
// @include        https://wwws.uni-klu.ac.at/uniklu/studien/lvleiter/pruefung/pruefungstermin_neu.jsp*
// ==/UserScript==

var anmeldeEnde = document.getElementsByName('anmeldeEnde')[0];
var abmeldeEnde = document.getElementsByName('abmeldeEnde')[0];
if (anmeldeEnde.value == abmeldeEnde.value) {
var anmeldeBeginn = document.getElementsByName('anmeldeBeginn')[0];

anmeldeBeginn.value = anmeldeBeginn.value.substring(0,anmeldeBeginn.value.indexOf(" ")) + " 00:00";

var val = anmeldeEnde.value;
var dat = val.substring(0,val.indexOf(" ")).split(".");
var datum = new Date(dat[2], dat[1]-1, dat[0]);
var ms = datum.getTime();
ms -= 3600*24*1000; //bis zu 1 tag zuvor abmelden d.h. 00:00	
datum.setTime(ms);
abmeldeEnde.value = twoDigits(datum.getDate()) + "." + twoDigits(datum.getMonth()+1) + "." + datum.getFullYear() + " 00:00";
				
ms -= 3600*24*1000 * 4; //bis zu 5 tage zuvor anmelden d.h. 23:59
datum.setTime(ms);
anmeldeEnde.value = twoDigits(datum.getDate()) + "." + twoDigits(datum.getMonth()+1) + "." + datum.getFullYear() + " 23:59";
}


function twoDigits(val) {
 var myval = ""+val;
 if (myval.length == 1) return "0"+myval;
 else return myval;
}