// ==UserScript==
// @name           anti - Ikariam PLUS aLL Worlds
// @include        http://*.ikariam.*
// @autor          Soleuu edited by: hda
// @email          sol-666@voila.Fr
// ==/UserScript==
//besoin de ikariam v.0.2.6



/*suppression des + sur les superviseurs */
var values = new Array ("advCities","advMilitary","advResearch","advDiplomacy");
var d = null; 
var old = null;
var supervisor = "";
for (i =0 ; i< values.length; i++){
   supervisor = values[i];
   old=document.getElementById(supervisor).childNodes[3];
   d=document.getElementById(supervisor);
   d.removeChild(old);
}

/*suppression des boites vers ikariam+ dans chacun des superviseurs */
values = new Array ("viewCityImperium","viewMilitaryImperium","viewResearchImperium","viewDiplomacyImperium");
old=null;
for (i=0;i<values.length && old ==null; i++){//récupère le bloc
   old=document.getElementById(values[i]);
}
if (old != null){//supprime le bloc
   d = document.getElementById("container2");
   d.removeChild(old);
}


