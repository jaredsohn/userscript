// ==UserScript==
// @name        piraat autoklik
// @namespace   C:\wamp\www\grease_test
// @description piraat autoklik
// @include     http://s3.nl.ikariam.com/*
// @version     2.0
// ==/UserScript==

var url = "http://s3.nl.ikariam.com/index.php?action=PiracyScreen&function=capture&buildingLevel=1&view=pirateFortress&cityId="+bgViewData.currentCityId+"&position=17";
var interval = false;

function autoClickLink(neededLink)	{
	//alert("TERST");
	
	//elke keer nieuwe interval beginnen
	if( typeof interval !== 'false')	{
		clearInterval(interval);
	}
	
	if(document.getElementById("pirateFortress_c"))	{ 		
		var links = document.getElementsByTagName("a");		
		for (var i=0; i < links.length; i++) {
			if(links[i] == neededLink){  
				document.title = '##PIRAAT MISSIE PROBEREN##'; 				
				links[i].click();
				break;
			}   
		}	
		var nextOneIn = Math.floor((Math.random()*20000)+155000);
		interval = setInterval( function() {autoClickLink(url);}, nextOneIn);
	}	
	
}

function start()	{	
	interval = setInterval( function() {autoClickLink(url);}, 5000);
}

start();