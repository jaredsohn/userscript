// ==UserScript==
// @name           Ikariam Moyenne de l'alliance
// @namespace      www.elouworld.tk
// @description    Affiche la moyenne de l'alliance dans le tableau de la page d'alliance.
// @include        http://*.ikariam.com/*?view=allyPage*
// ==/UserScript==

function addligne(table,val1,val2) {
TR = document.createElement ("tr");
TD1  = document.createElement ("td");
TXT1 = document.createTextNode (val1);
TD1.appendChild (TXT1);
TD2  = document.createElement ("td");
TXT2 = document.createTextNode (val2);
TD2.appendChild (TXT2);
TR.appendChild(TD1);
TR.appendChild(TD2);
table.getElementsByTagName('tbody')[0].appendChild (TR);
}
var moyenne = document.getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML;
var nbr = document.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
moyenne = moyenne.split("(")[1].split(")")[0];
moyenne = moyenne.replace(/,/g,"");
moyenne = parseFloat(moyenne)/parseFloat(nbr);
moyenne = moyenne.toFixed(2);
addligne(document.getElementById("allyinfo"),"Moyenne de l'alliance:",moyenne);