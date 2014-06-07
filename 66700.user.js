// ==UserScript==
// @name           Hurtiglenke for Trafikanten
// @namespace      http://henrik.synth.no
// @include        http://*trafikanten.no/Travel.asp*
// ==/UserScript==

var version = 201001181053;

function letsFilter() {

   var content = '<ul><li>Trykk Søk-knappen for flere valg</li></ul>';
   if (location.href.indexOf("TypeOfRequest") > 0) {
     var oversikt = location.href.replace("TypeOfRequest2=0", "TypeOfRequest2=2");
     var detaljert = location.href.replace("TypeOfRequest2=2", "TypeOfRequest2=0");
     content = '<ul><li><a href="' + oversikt + '">Oversikt over flere avganger</a></li>'
             + '<li><a href="' + detaljert + '">Detaljert visning (én avgang)</a></li>'
             + '<li><a target=_blank href="' + location.href + '">Hurtiglenke til dette søket</a></li></ul>';
   }
   
   var newdiv = document.createElement('div');
   newdiv.innerHTML = content;

   var theform = document.getElementById("form1");
   if (theform == null) {
      theform = document.getElementById("buttons");
   }
   theform.appendChild(newdiv);
}

window.onload = letsFilter();
