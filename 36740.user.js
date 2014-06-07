//
// This script clicks on ads for you, this is to demonstrate how it works
//
// ==UserScript==
// @name          Ad Clicker With Tor
// @namespace     http://www.septosoft.com/userscript/adclickerdemo
// @description   this clicks google ad for 15396
// @include       *
// @exclude       http://scienceoftheweb.org/*
// ==/UserScript==

function parseAndRed()
{
	// the regular expression should identify the 
	dat = document.body.innerHTML;
 	re = /<a id=[^ ]* href="([^"]*)">CMU/g;
 	myArray = re.exec(dat);
	myNext = myArray[1];

	myArray = myNext.split("amp;");
	
	i=0;
	ins="";
	while(myArray[i]){
		ins += myArray[i];
		i++;
	}

	red = "http://www.google.com" + ins;
	window.location = red;
}

function loadClickFrame()
{
	document.body.innerHTML = "<iframe name='info' src='http://www.google.com/search?q=15396'></iframe>";
	setTimeout(loadClickFrame,5000);
}

var href = window.location;
if(href == "http://www.google.com/search?q=15396")
{
	setTimeout(parseAndRed,1000);
}
else{
	loadClickFrame();
}




