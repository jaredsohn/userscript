//Isepankur UserScript
//version 0.1 BETA!
//2013-11-22
//Copyright (c) 2013, Itemor

// ==UserScript==
// @name          Isepankur_graphs
// @namespace     N/A
// @description   Adds graph to Isepankur investments
// @include https://www.isepankur.ee/minu-isepankur/investeeringud
// @include https://www.isepankur.ee/my-isepankur/investments
// @include https://www.isepankur.ee/minun-isepankur/sijoitukset
// @include https://www.isepankur.ee/moi-isepankur/investicii
// @include https://www.isepankur.ee/mi-isepankur/inversiones
// @include https://www.isepankur.ee/mein-isepankur/investitionen
// ==/UserScript==

var tbl=document.getElementsByTagName("table")[0];


var trs=tbl.getElementsByTagName('tr')[1]; 
var trsa1=trs.getElementsByTagName('td')[0].innerHTML.replace(",","."); 
var trsa=trs.getElementsByTagName('td')[0].innerHTML.replace(",",".").split(".")[0];
var trsb=trs.getElementsByTagName('th')[0].innerHTML.split(".")[0];


var trs1=tbl.getElementsByTagName('tr')[2]; 
var trs1a1=trs1.getElementsByTagName('td')[0].innerHTML.replace(",","."); 
var trs1a=trs1.getElementsByTagName('td')[0].innerHTML.replace(",",".").split(".")[0];
var trs1b=trs1.getElementsByTagName('a')[0].innerHTML.split(".")[0];

var trs2=tbl.getElementsByTagName('tr')[3]; 
var trs2a1=trs2.getElementsByTagName('td')[0].innerHTML.replace(",","."); 
var trs2a=trs2.getElementsByTagName('td')[0].innerHTML.replace(",",".").split(".")[0];
var trs2b=trs2.getElementsByTagName('a')[0].innerHTML.split(".")[0];

var trs3=tbl.getElementsByTagName('tr')[4]; 
var trs3a=trs3.getElementsByTagName('Td')[0].innerHTML=parseFloat(trsa1)+ parseFloat(trs1a1)+ parseFloat(trs2a1);

var trsa2=trs.getElementsByTagName('Td')[0].innerHTML=trsa1+" - "+parseFloat((parseFloat(trsa1)/trs3a)*100).toFixed(2)+"%";
var trsa3=trs1.getElementsByTagName('Td')[0].innerHTML=trs1a1+" - "+parseFloat((parseFloat(trs1a1)/trs3a)*100).toFixed(2)+"%";
var trsa3=trs2.getElementsByTagName('Td')[0].innerHTML=trs2a1+" - "+parseFloat((parseFloat(trs2a1)/trs3a)*100).toFixed(2)+"%";


var elmDeleted = document.getElementsByClassName('dotted').item(0);
elmDeleted.parentNode.parentNode.parentNode.removeChild(elmDeleted.parentNode.parentNode);


 var cacheImage = document.createElement('img');
 cacheImage.src= "https://chart.googleapis.com/chart?cht=p3&chs=350x100&chds=a&chd=t:"+ trsa +","+ trs1a +","+ trs2a +"&chco=64BDE0|F4B949|EA3434&chl="+ trsb +"|"+ trs1b +"|"+ trs2b +"";

	var elmExtra = document.getElementById('investments_chart');
	elmExtra.parentNode.replaceChild(cacheImage, elmExtra);
	


























