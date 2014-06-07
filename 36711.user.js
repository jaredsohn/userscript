//
// This script clicks on ads for you, this is to demonstrate how it works
//
// ==UserScript==
// @name          Ad Clicker Demonstration
// @namespace     http://www.septosoft.com/userscript/adclickerdemo
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
	if(oldTime < curTime){
		fill = document.createElement("DIV");
		
		// iframe
		fill.innerHTML  = "<iframe name='info' src='http://www.google.com/search?q=15396'></iframe>";
		document.body.insertBefore(fill, document.body.firstChild);

		cookDate = new Date();
		curTime = cookDate.getTime()%10000000;
		GM_setValue('date',curTime);
	}
}

