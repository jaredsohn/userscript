// ==UserScript==
// @name          E-SIM ID
// @description   ID collect	
// @include       http://primera.e-sim.org/citizenStatistics.html?statisticType=XP&countryId=8*
// ==/UserScript==
// this function fills out form fields
//

var tabla= document.getElementsByClassName('dataTable')[0].rows[1].cells;

alert(tabla[2].innerHTML);
