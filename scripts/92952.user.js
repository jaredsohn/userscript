// ==UserScript==
// @name           IT2 - keine Voting- Box, Adblockmeldung & VIP Links entfernen
// @namespace      de
// @description  entfernt VIP Links + Premium Links + Adblock Meldung + Shop im Menü
// @include        http://www.itycoon2.de/*
// @exclude        http://chat.beta.itycoon2.de/*
// @author         XMANT1000
// @version        a0.5
// @date           02-22-2011 09:00 pm
// ==/UserScript==

// 0 = ausgeschaltet
// 1 = eingeschaltet

var kill_adblock = 1; //Adblockmeldung entfernen
var kill_voting = 1; //Voting Box entfernen
var kill_shop = 1; //Shop entfernen
var kill_VIP1 = 1; //VIP- Symbol entfernen
var kill_VIP2 = 1; //VIP- Symbol entfernen
var kill_Premium =1; //Premium-Link in Hauptnavi entfernen


// ############################################## //
//  Loeschen					  //
// ############################################## //

//Adblockmeldung entfernen
if (kill_adblock == 1)
{
if(document.getElementById("adblock")!=null) {
document.getElementById('adblock').style.display = 'none';
}		
}

//Voting Box entfernen
if (kill_voting == 1)
{

if(document.getElementsByClassName("box voting")[0]!=null) {
document.getElementsByClassName("box voting")[0].style.display = 'none';
}		
}
//Shop entfernen
if (kill_shop == 1)
{

if(document.getElementsByClassName("subnavigation")[0].getElementsByTagName("li")[0]!=null) {
document.getElementsByClassName("subnavigation")[0].getElementsByTagName("li")[0].style.display = 'none';
}		
}
//VIP entfernen
if (kill_VIP1 == 1)
{

if(document.getElementsByClassName("information")[0].getElementsByTagName("li")[3]!=null) {
document.getElementsByClassName("information")[0].getElementsByTagName("li")[3].style.display = 'none';
}		
}
//VIP2 entfernen 
if (kill_VIP2 == 1)
{

if(document.getElementsByClassName("vip")[0]!=null) {
document.getElementsByClassName("vip")[0].style.display = 'none'; 
 }       
}

//Premium-Link in Hauptnavi entfernen 
if (kill_Premium == 1)
{

if(document.getElementById('navigation').getElementsByTagName("li")[3]!=null) {
document.getElementById('navigation').getElementsByTagName("li")[3].style.display = 'none'; 
 }     
}
