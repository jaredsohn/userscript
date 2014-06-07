// ==UserScript==
// @name       SchnellFarmer_abstuerzerz
// @namespace  http://www.google.de/
// @version    0.1
// @description  SchnellFarmer_abstuerzerz
// @include    http://de*.die-staemme.de/game.php?village=*&screen=place
// @include    http://de*.die-staemme.de/game.php?village=*&screen=place&*
// @copyright  2011+, SenatorTim
// ==/UserScript==

var TD1 = document.createElement("td");
var TD2 = document.createElement("td");
var TD3 = document.createElement("td");
var TD4 = document.createElement("td");
var TD5 = document.createElement("td");
var Text = document.createElement("b");
var Textb = document.createTextNode("Vorlagen");
var TextAtt1 = document.createAttribute("style");
TextAtt1.nodeValue = "background-color:#708090;";
TD1.setAttributeNode(TextAtt1);

var TextAtt2 = document.createAttribute("style"); TextAtt2.nodeValue = "background-color:#b7c3c9;";
TD2.setAttributeNode(TextAtt2);
var TextAtt3 = document.createAttribute("style"); TextAtt3.nodeValue = "background-color:#b7c3c9;";
TD3.setAttributeNode(TextAtt3);
var TextAtt4 = document.createAttribute("style"); TextAtt4.nodeValue = "background-color:#b7c3c9;";
TD4.setAttributeNode(TextAtt4);
var TextAtt5 = document.createAttribute("style"); TextAtt5.nodeValue = "background-color:#b7c3c9;";
TD5.setAttributeNode(TextAtt5);

var Link01 = document.createElement("a"); var LinkT1 = document.createTextNode("100 Axt"); Link01.href  = "javascript:insertUnit(document.units.axe,100); document.units.attack.click();";
var Link02 = document.createElement("a"); var LinkT2 = document.createTextNode("10 Lkav"); Link02.href = "javascript:insertUnit(document.units.light,10); document.units.attack.click();";
var Link03 = document.createElement("a"); var LinkT3 = document.createTextNode("30 Lkav"); Link03.href = "javascript:insertUnit(document.units.light,30); document.units.attack.click();";
var Link04 = document.createElement("a"); var LinkT4 = document.createTextNode("Deff-Farm"); Link04.href = "javascript:insertUnit(document.units.spear,200); javascript:insertUnit(document.units.sword,200); document.units.attack.click();";

//document.getElementsByTagName("table")[18].insertRow(6).appendChild(TR1.appendChild(TD1)); TD1.appendChild(Text); Text.appendChild(Textb); 

if(!location.href.match("try=confirm")) {
    document.getElementsByTagName("table")[19].insertRow(4).appendChild(TD1); TD1.appendChild(Text); Text.appendChild(Textb);
    document.getElementsByTagName("table")[19].insertRow(5).appendChild(TD2); TD2.appendChild(Link01); Link01.appendChild(LinkT1);
    document.getElementsByTagName("table")[19].insertRow(6).appendChild(TD3); TD3.appendChild(Link02); Link02.appendChild(LinkT2);
    document.getElementsByTagName("table")[19].insertRow(7).appendChild(TD4); TD4.appendChild(Link03); Link03.appendChild(LinkT3);
    document.getElementsByTagName("table")[19].insertRow(8).appendChild(TD5); TD5.appendChild(Link04); Link04.appendChild(LinkT4);
}


if(location.href.match("try=confirm")) {
    var warnung = document.createElement("b");
    var warnunt = document.createTextNode("WICHTIG: Dieser Button wird automatisch nach 5 Sek. angeklickt!");
    var farbe = document.createAttribute("style"); farbe.nodeValue = "color:red;"; warnung.setAttributeNode(farbe);
    warnung.appendChild(warnunt);
    document.getElementsByTagName("form")[0].appendChild(warnung);
    setTimeout(function() {document.getElementsByName("submit")[0].click();},5000);
}
   