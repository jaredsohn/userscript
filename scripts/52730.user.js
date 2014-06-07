// ==UserScript==
// @name Deff 
// @namespace Die Staemme
// @description Fügt in der Dorfübersicht einen Link ein um Unterstützung zu verschicken
// @include http://de*.die-staemme.de/game.php?village=*&screen=info_village&id=*
// @include http://de*.die-staemme.de/game.php?village=*&screen=place&mode=command&target=*
// @author 
// ==/UserScript==
//alert(document.URL);
var goOn = true;
var i = 0;
var l,s,a,t;
var truppen = new Array();
truppen[0] = 0; //spear
truppen[1] = 5000; //sword
truppen[2] = 7000; //axe
truppen[3] = 0; //archer
truppen[4] = 3881; //spy
truppen[5] = 2000; //light
truppen[6] = 0; //marcher
truppen[7] = 0; //heavy
truppen[8] = 0; //ram
truppen[9] = 0; //catapult
truppen[10] = 0; //knight
truppen[11] = 0; //snob
var RegExVlgInfo = /screen=info_village/;
if(RegExVlgInfo.test(document.URL))
{
 GM_setValue("Späh",false);
 for(i = 0, goOn = true; i < document.getElementsByTagName("a").length && goOn; i++)
 {
 l = document.getElementsByTagName("a")[i];
 if(l.hasChildNodes())
 {
 if(l.firstChild.nodeValue == "» Truppen schicken")
 goOn = false;
 //alert(l.firstChild.nodeValue);
 }
 }
 //alert(l.href);
 a = document.createElement("a");
 s = document.createTextNode(" ");
 t = document.createTextNode("» Deff");
 l.parentNode.appendChild(s);
 l.parentNode.appendChild(a);
 a.appendChild(t);
 a.setAttribute("href",l.href);
 a.addEventListener("click",function() {setVal();},true);
}
else if(GM_getValue("späh",false))
{
 for(i = 0; i < 12; i++)
 document.getElementsByTagName("input")[i].value = truppen[i];
 GM_setValue("späh",false); 
}
//alert(GM_getValue("späh"));
function setVal()
{
 //alert("TEST");
 GM_setValue('späh',true);
}