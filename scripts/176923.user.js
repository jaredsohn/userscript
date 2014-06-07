// ==UserScript==
// @name        MOHandler
// @namespace   http://www.trollingparsite.bugs3.com/
// @description Handle your MOs
// @include     https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
// @version     1.02
// @include http://artemis.pardus.at/main.php
// @include http://artemis.pardus.at/building.php
// @include http://artemis.pardus.at/building_trade.php
// @include http://artemis.pardus.at/msgframe.php
// @include http://orion.pardus.at/msgframe.php
// @include http://orion.pardus.at/main.php
// @include http://orion.pardus.at/building.php
// @include http://orion.pardus.at/building_trade.php
// @updateURL  http://userscripts.org/scripts/source/176923.meta.js
// @downloadURL http://userscripts.org/scripts/source/176923.user.js
// ==/UserScript==

//User Settings
sendData = true; //Tell the script to run or not. true is to run false is to disable.
if(document.URL == "http://artemis.pardus.at/msgframe.php" || document.URL == "https://artemis.pardus.at/msgframe.php" || document.URL == "http://orion.pardus.at/msgframe.php" || document.URL == "https://orion.pardus.at/msgframe.php") {
playerName = document.getElementById("universe").alt;
playerName = playerName.replace('Artemis: ', '');
playerName = playerName.replace('Orion: ', '');
playerName = playerName.toLowerCase();
//alert(playerName);
}

//NOTE
//Sorry for sloppy coding! Threw it together fast. :)
//Just improving the code ***Latest update***

//Global Vars

if(sendData) { // Tells script to run or not
if (document.URL != "http://artemis.pardus.at/msgframe.php" && document.URL != "https://artemis.pardus.at/msgframe.php" && document.URL != "http://orion.pardus.at/msgframe.php" && document.URL != "https://orion.pardus.at/msgframe.php") {
var interval = setInterval(function() {getLoc()},0100);
//Get player location
function getLoc() {
if(document.getElementById("sector") != null) {
    sector = document.getElementById("sector").innerHTML;
}
if(document.getElementById("coords") != null) {
    coords = document.getElementById("coords").innerHTML;
    location = sector + " " + coords;
    GM_setValue("location", location);
    GM_setValue("sector", sector);
}
//alert(location);
}




//Ajax


function ajaxFunction(offset){
	var ajaxRequest;  // The variable that makes Ajax possible!
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			//alert(ajaxRequest.responseText); //Activate for testing purposes
		}
	}
	if(offset == "update") {
	   //alert(offset);
	   ajaxRequest.open("GET", "http://trollingsitepar.bugs3.com/updateMO.php?player="+playerName+"&loc="+GM_getValue("location")+"&en="+en+"&fuel="+fuel+"&max="+max, true);
	}
	if(offset == "building") {
	   //alert(offset);
	   ajaxRequest.open("GET", "http://trollingsitepar.bugs3.com/includeMO.php?player="+playerName+"&loc="+GM_getValue("location")+"&sector="+GM_getValue("sector")+"&owner="+a[0].innerHTML, true);
	}
	ajaxRequest.send(null); 
}
//End of Ajax

var a = document.getElementsByTagName("a");
if(a[0].innerHTML != "Account" && a[0].innerHTML != "<font color=\"#777777\" size=\"1\">Check Cluster &amp; Protection</font>" && a[0].innerHTML != "Military Outpost") {
   // alert("player="+playerName+"&owner="+a[0].innerHTML+"&sector="+GM_getValue("sector")+"&loc="+GM_getValue("location"));
    ajaxFunction("building");
}


//Get fuel and En
var td = document.getElementsByTagName("td");
max = td[32].innerHTML;
en = td[30].innerHTML;href= 
en = en.replace('<a href="javascript:useMax(\'buy_2\',', '');
en = parseInt(en);
fuel = td[37].innerHTML;
fuel = fuel.replace('<a href="javascript:useMax(\'buy_16\',', '');
fuel = parseInt(fuel);
if(fuel < 999 && en < 999) {
   // alert("player="+playerName+"&loc="+GM_getValue("location")+"&en="+en+"&fuel="+fuel+"&max="+max);
    ajaxFunction("update");
}

}

}