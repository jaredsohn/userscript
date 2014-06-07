// ==UserScript==
// @name           AutoHaggler
// @description    Smart autohaggles on any shop
// @include        http://*.neopets.*/haggle.phtml*
// @include        http://neopets.*/haggle.phtml*

// ==/UserScript==

function GetBetween(zStr, zStart, zEnd){
 var zStr = zStr; var zStart = zStart; var zEnd = zEnd;
 var z1 = zStr.indexOf(zStart); var z2 = zStr.indexOf(zEnd, z1);
 if(z2 > z1 && z1 > -1){
  return zStr.substring(z1 + zStart.length,z2);
 }else{
  return "";
 }
}

function SmartHaggle(priceth){
 var pricelength = priceth.length;
 var returnval = priceth.charAt(0) + priceth.charAt(1);
 for (i = 2; i < pricelength; i++) 
 {
     returnval = returnval + priceth.charAt( Math.round(Math.random()) );
 }
 return returnval;
}

var strHTML = document.body.innerHTML;
if(strHTML.indexOf("I want at least ") > 1){
 var haggle = GetBetween(strHTML,"<b>The Shopkeeper says 'I want at least "," Neopoints for this great item.'");
 document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(",",""));
}else if(strHTML.indexOf("I wont take less than ") > 1){
 var haggle = GetBetween(strHTML,"<b>The Shopkeeper says 'I wont take less than "," Neopoints for it.'");
 document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(",",""));
}