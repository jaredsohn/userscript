// ==UserScript==
// @name           Boire / manger/ propre

// @description  menu fast pour     Boire / manger/ propre
// @include        *clodogame*
// @exclude        *highscore*
// @exclude        *login/*
// @exclude        *logout*
// @exclude *change_please*
// ==/UserScript==

/*
THANK YOU TO DEVELOPER THAT MADE THIS SCRIPT.
SCRIPT FOR CLODOGAME AND TRANSLATED IN FRENCH!
*/

LienBabiole = 'http://static.pennergame.de/img/pv4/plunder/';
LienNouriture = 'http://static.pennergame.de/img/pv4/shop/fr_FR/inventar/';

//Pos = 50;//document.getElementsByClassName("icon beer")[0].innerHTML.indexOf(".");
//Alk = 50;//document.getElementsByClassName("icon beer")[0].innerHTML.substr(Pos - 1, 4).replace(".", "");
//Benoetigtprozent = 299 - Alk;
function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}  

BoireVin = 8;
MangerJB = 1;
MangerCrepe = 1;
MangerBaguettes = 8;
host = 'http://'+window.location.hostname;
document.getElementsByClassName("icon crowncap")[0].innerHTML = '<input type="button" id="wasch" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;25&euro;"style="background-image:url('+LienBabiole+'seife.png);background-repeat: no-repeat; background-position : 1px; padding:0px;position:absolute;top:175px;right:200px;font-size:100%;" style="padding:0px;"/><input type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;('+BoireVin+')" id="wirkung_Bier" style="background-image:url('+LienNouriture+'Bier.png);position:absolute;top:175px;right:163px; background-repeat: no-repeat; padding:0px;"/><input id="wirkung_Hamburger" type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerJB+')" style="background-image:url('+LienNouriture+'Hamburger.png); background-repeat: no-repeat; padding:0px;;position:absolute;top:175px;right:123px"/><input id="wirkung_Currywurst" type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerCrepe+')" style="background-image:url('+LienNouriture+'Currywurst.png);background-repeat: no-repeat;position:absolute;top:175px;right:83px; background-position : 1px; padding:0px;" style="padding:0px;"/><input id="wirkung_Brot" type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerBaguettes+')" style="background-image:url('+LienNouriture+'Brot.png); background-repeat: no-repeat; padding:0px;position:absolute;top:175px;right:43px;"/><input type="button" value="10 Minutos" id="sammeln" style="position:absolute;top:'+hoch+'px;right:'+breit+'px;padding:0px;" onklick="function fclick(ev)" >';document.getElementById('sammeln').addEventListener('click',fclick,false); 


// VIN
document.getElementById('wirkung_Bier').addEventListener('click', function bier_trinken(){
	document.getElementById('wirkung_Bier').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Bier&promille=35&id=1&menge='+BoireVin),
		onload: function(responseDetails)
     	{
			location.reload();
      	}
  	});					
},false); 

//JAMBON BEURRE
document.getElementById('wirkung_Hamburger').addEventListener('click', function generateWirkung(){
	document.getElementById('wirkung_Hamburger').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Hamburger&promille=-200&id=4&menge='+MangerJB),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });					
},false);

// CREPES
document.getElementById('wirkung_Currywurst').addEventListener('click', function generateWirkung(){
	document.getElementById('wirkung_Currywurst').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Currywurst&promille=-100&id=3&menge='+MangerCrepe),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });					
},false);

// BAGUETTE
document.getElementById('wirkung_Brot').addEventListener('click', function generateWirkung(){
	document.getElementById('wirkung_Brot').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Brot&promille=-35&id=2&menge='+MangerBaguettes),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });					
},false);

// NETTOYAGE
document.getElementById('wasch').addEventListener('click', function waschen(){
	document.getElementById('wasch').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/city/washhouse/buy/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=2'),
		onload: function(responseDetails)
		{
			location.reload();
		}
 	 });					
},false); 
var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName('Submit2')[0];
finputButton.click();
}
