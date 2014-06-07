//
// This script clicks on ads for you
// Potential problems: 1) Set to wait one second to load before it parses, may be too long or too short
// (it works on my machine) 2) There appears to be some javascript protection around the sponsored ads
// in the form of mouseover "return true" 3) please email me with information or comments dbunker@andrew.cmu.edu
//
// ==UserScript==
// @name          Ad Clicker
// @namespace     http://www.septosoft.com/userscript/adclicker
// @description   this clicks google ad for 15396
// @include       *
// @exclude       http://scienceoftheweb.org/*
// ==/UserScript==

function parseAndRed()
{
	// the regular expression should identify the 15396 ad
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

var href = window.location;
if(href == "http://www.google.com/search?q=15396")
{
	setTimeout(parseAndRed,1000);
}
else{
	// if length of time hasn't passed, don't click on ad again
	oldTime = GM_getValue('date',0);
	cookDate = new Date();
	curTime = cookDate.getTime()%10000000;
	
	// time to wait is 15 minutes
	// to have it perform run for every query set oldTime + 15*60*1000 to just oldTime
	if(oldTime + 15*60*1000 < curTime){
		fill = document.createElement("DIV");
		
		// to see the results in the iframe, remove width=0 height=0
		fill.innerHTML  = "<iframe name='info' width=0 height=0 src='http://www.google.com/search?q=15396'></iframe>";
		document.body.insertBefore(fill, document.body.firstChild);

		cookDate = new Date();
		curTime = cookDate.getTime()%10000000;
		GM_setValue('date',curTime);
	}
}

