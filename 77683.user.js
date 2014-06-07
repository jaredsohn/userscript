// ==UserScript==
// @name           Crêpes
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php*screen=overview*
// @include        http://de*.die-staemme.de/game.php*screen=place*mode=sim*
// @exclude        http://de*.die-staemme.de/game.php*screen=overviews*
// ==/UserScript==


var zahl = /(\d+)/;
var truppen_eng = new Array();
var i=0;
truppen_eng[i++] = "spear";
truppen_eng[i++] = "sword";
truppen_eng[i++] = "axe"
truppen_eng[i++] = "archer";
truppen_eng[i++] = "spy";
truppen_eng[i++] = "light";
truppen_eng[i++] = "marcher";
truppen_eng[i++] = "heavy";
truppen_eng[i++] = "ram";
truppen_eng[i++] = "catapult";
truppen_eng[i++] = "knight";
truppen_eng[i++] = "snob";

if(document.URL.search(/screen=overview/) != -1)
{
 var truppen = new Array();
 var truppen2 = "&who=defense";
 var truppen3 = "&who=attack";    

 for(var i=1;i>0;i++)
 {
  if(document.getElementsByClassName("vis")[i].innerHTML.search(/Einheiten/) != -1)
  {
   for(var k=1;k>0;k++)
   {
    if(typeof document.getElementsByClassName("vis")[i].getElementsByTagName("tr")[k].firstChild.innerHTML == "string")
    {
     truppen[k-1] = document.getElementsByClassName("vis")[i].getElementsByTagName("tr")[k].firstChild.innerHTML.replace(/<img.*alt="">/, "").replace(/<strong>/, "").replace(/<\/strong>/, "");
    }
    else
    {
     break;
    }
   }
   break;
  }
 }  

 for(var j=0;j<truppen.length;j++)
 {
  if(truppen[j].search(/Speerträger/) != -1) {truppen2 += "&spear="+zahl.exec(truppen[j])[1];truppen3 += "&spear="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Schwertkämpfer/) != -1) {truppen2 += "&sword="+zahl.exec(truppen[j])[1];truppen3 += "&sword="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Axtkämpfer/) != -1) {truppen2 += "&axe="+zahl.exec(truppen[j])[1];truppen3 += "&axe="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Bogenschütze/) != -1) {truppen2 += "&archer="+zahl.exec(truppen[j])[1];truppen3 += "&archer="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Späher/) != -1) {truppen2 += "&spy="+zahl.exec(truppen[j])[1];truppen3 += "&spy="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Leichte Kavallerie/) != -1) {truppen2 += "&light="+zahl.exec(truppen[j])[1];truppen3 += "&light="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Beritten.*Bogenschütze/) != -1) {truppen2 += "&marcher="+zahl.exec(truppen[j])[1];truppen3 += "&marcher="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Schwere Kavallerie/) != -1) {truppen2 += "&heavy="+zahl.exec(truppen[j])[1];truppen3 += "&heavy="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Ramm/) != -1) {truppen2 += "&ram="+zahl.exec(truppen[j])[1];truppen3 += "&ram="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Kata/) != -1) {truppen2 += "&catapult="+zahl.exec(truppen[j])[1];truppen3 += "&catapult="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Pala/) != -1) {truppen2 += "&knight="+zahl.exec(truppen[j])[1];truppen3 += "&knight="+zahl.exec(truppen[j])[1];}
  if(truppen[j].search(/Adels/) != -1) {truppen2 += "&snob="+zahl.exec(truppen[j])[1];truppen3 += "&snob="+zahl.exec(truppen[j])[1];}
 }



 var link = document.createElement("tr");
 var linkk = document.createElement("td");
 var linkkk = document.createElement("a");
 linkkk.innerHTML = "Truppen in den Simulator einfügen (Verteidiger)";
 linkkk.href = document.URL.replace(/screen=overview/, "screen=place&mode=sim")+truppen2;
 linkk.appendChild(linkkk);
 link.appendChild(linkk);
 document.getElementsByClassName("vis")[i].appendChild(link);
 var link = document.createElement("tr");
 var linkk = document.createElement("td");
 var linkkk = document.createElement("a");
 linkkk.innerHTML = "Truppen in den Simulator einfügen (Angreifer)";
 linkkk.href = document.URL.replace(/screen=overview/, "screen=place&mode=sim")+truppen3;
 linkk.appendChild(linkkk);
 link.appendChild(linkk);
 document.getElementsByClassName("vis")[i].appendChild(link);
}

else
{
 var url = document.URL;
 var trsuch = "";
 var anzahl = 0;
 var was = -1;
 if(document.URL.search(/defense/) != -1) {was="def";} else if(document.URL.search(/attack/) != -1){was="att";}
 if(was != -1)
 {
  for(var i=0;i<truppen_eng.length;i++)
  {
   trsuch = new RegExp(truppen_eng[i]+"=(\\d+)", "");
   if(url.search(trsuch) != -1)
   {
    document.getElementsByName(was+"_"+truppen_eng[i])[0].value = RegExp.$1;
   }
  }
 }
}