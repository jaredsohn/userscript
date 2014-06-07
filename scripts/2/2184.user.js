// ==UserScript==
// @name          ShinyFeet Ad Remover
// @namespace     http://www.tyworks.net
// @include       http://*.shinyfeet.com/*
// @description	  Removes ads on ALL ShinyFeet.com pages
// ==/UserScript==

(function() {

	//remove banner on public photo gallery
	if(document.getElementsByTagName("div")[0] && document.getElementsByTagName("div")[0].innerHTML.indexOf("focusIN") != -1){
		document.getElementsByTagName("div")[0].style.display="none";
	}
	
	//remove top frame ad from logged-in page
	if(document.getElementsByTagName("frameset")[0] && document.getElementsByTagName("frameset")[0].getAttribute("rows")=="95,75,*"){
		document.getElementsByTagName("frameset")[0].setAttribute("rows", "0,75,*");
	}
	
	//remove google ads from logged-in folder sidebar
	var gAds = document.getElementById('googleads');
	if(gAds) gAds.style.display="none";
	//the ads take a few seconds to appear on the sidebar after refreshing
	setTimeout("if(document.getElementById('googleads')) document.getElementById('googleads').style.display=\"none\"; ", 7000);
	
	//remove Cool Ads
	var everyA = document.getElementsByTagName('a');
	var everyCenter = document.getElementsByTagName('center');
	for(i=0; i<everyA.length; i++) {
		if( everyA[i].className=="adText" || everyA[i].className=="adHeadline" || (everyA[i].innerHTML.indexOf("Use AdBrite to buy &amp; sell ads!") != -1) ) everyA[i].style.display="none";
	}
	for(i=0; i<everyCenter.length; i++) {
		if(everyCenter[i].innerHTML.indexOf("Cool Ads") != -1) everyCenter[i].style.display="none";
	}
	
	//remove "remove ads" text box and "toenails" text box
	var everyTable = document.getElementsByTagName('table');
	for(i=0; i<everyTable.length; i++) {
		if( (everyTable[i].innerHTML.indexOf("<table") == -1) && ( (everyTable[i].innerHTML.indexOf("Did you know you can get rid of the ads in your ShinyFeet account?") != -1) || (everyTable[i].innerHTML.indexOf("your favorite RSS feeds") != -1)) ) everyTable[i].innerHTML=""; everyTable[i].bgcolor="";
	}
	
})();
