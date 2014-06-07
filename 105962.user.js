// ==UserScript==
// @name           Haggler
// @description    En español
// @include        http://*.neopets.*/haggle.phtml*
// @include        http://neopets.*/haggle.phtml*

// ==/UserScript==

function GetBetween(zStr, zStart, zEnd){
//zStr=Codigo de la pagina
//zStart=Parte del codigo de inico de precio
//zEnd=Parte del codigo de fin de precio
 var zStr = zStr; var zStart = zStart; var zEnd = zEnd;
 var z1 = zStr.indexOf(zStart); var z2 = zStr.indexOf(zEnd, z1);
//z1=Valor de la pocision de "Quiero al menos  "
//z2=Valor de la pocision de "  Neopuntos por este estupendo objeto.", apartir del valor de z1.
 if(z2 > z1 && z1 > -1){
  return zStr.substring(z1 + zStart.length,z2);
 }else{
  return "00000";
 }
}

function SmartHaggle(priceth){
 var pricelength = priceth.length;
// var returnval = priceth.charAt(0) + priceth.charAt(1);
 var returnval = "0" + priceth.charAt(0) + priceth.charAt(1);
 for (i = 2; i < pricelength; i++) 
 {
     returnval = returnval + priceth.charAt( Math.round(Math.random()) );
 }
 return returnval;
}

var strHTML = document.body.innerHTML;
//strHTML= Codigo HTML de la pagina desde el body
if(strHTML.indexOf("Quiero al menos") != -1){ //IndexOf-Devuelve la posicion donde se encontro, de lo contrario regresa -1
 //var haggle = GetBetween(strHTML,"<b>El comerciante dice "No acepto menos de  ","  Neopuntos por eso."</b>");
 var haggle = GetBetween(strHTML,"Quiero al menos  ","  Neopuntos por este estupendo objeto.");
 document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(".",""));
}else if(strHTML.indexOf("No acepto menos de") != -1){
 var haggle = GetBetween(strHTML,"No acepto menos de  ","  Neopuntos por eso.");
 document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(".",""));
}