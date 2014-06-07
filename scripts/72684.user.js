// ==UserScript==
// @name           Przyciski Mycie/Piwo/Hamburger/Zbieranie Agent_0700 & NewMan & Basti1012
// @namespace      http://menelgame.org
// @description    Based on "Bier/Brot/Wasch/ Buttons V4" von NewMan and "10 minuten sammel button" by basti1012 with boggler's fixes. I've merged them, made a few fixes & changes and translater into polish.
// @include        http://*menelgame.pl*
// ==/UserScript==

Pos = document.getElementsByClassName("icon beer")[0].innerHTML.indexOf(".");
Alk = document.getElementsByClassName("icon beer")[0].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 299 - Alk;
Benoetigtbier = Math.floor(Benoetigtprozent/35);
Benoetigtbrot = Math.ceil(Alk/200);
host = 'http://'+window.location.hostname;
document.getElementsByTagName("form")[1].getElementsByTagName('div')[0].innerHTML += '<input type="button" id="wasch" value="Mycie" style="padding:0px;"/><input type="button" value="Piwo('+Benoetigtbier+')" id="bier" style="padding:0px;"/><input id="Hamburger" type="button" value="Burger(' + Benoetigtbrot + ')" style="padding:0px;"/><input type="button" id="sammeln" value="Puchy 10 min" style="padding:0px;" onklick="function fclick(ev)"/>';

var li = document.getElementsByTagName("form")[1].getElementsByTagName('div')[0];
function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}      
 

document.getElementById('bier').addEventListener('click', function bier_trinken(){
	document.getElementById('bier').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Bier&promille=35&id=1&menge='+Benoetigtbier),
		onload: function(responseDetails)
     	{
			location.reload();
      	}
  	});					
},false); 
document.getElementById('Hamburger').addEventListener('click', function brot_essen(){
	document.getElementById('Hamburger').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Hamburger&promille=-200&id=4&menge='+Benoetigtbrot),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });					
},false);
document.getElementById('wasch').addEventListener('click', function waschen(){																																										//Copyright by NewMan, Basti 1012, Boggler and Agent_0700
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



document.getElementById('sammeln').addEventListener('click',fclick,false);

var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName('Submit2')[0];
finputButton.click();
}


//Copyright by NewMan, Basti 1012, Boggler and Agent_0700