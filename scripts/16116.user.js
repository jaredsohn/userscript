// Weather Channel NoAds
// version 1.0
// 12-9-07
// Copyright (c) 2007, Matt Whorton
// email: pluto@plutosforge.com

// ==UserScript==
// @name           Weather Channel NoAds
// @namespace      www.plutosforge.com
// @description  A weather.com ad blocker that actually works - get's rid of those annoying dancing robots
// @include   http://www.weather.com/weather/*
// ==/UserScript==



if(window.location.href.search('local') > -1 ) cleanUpLocal();
else if(window.location.href.search('interactive') > -1) cleanUpRadar();
else
{ 
	//this is a catch all which works for the: monthy planner, hour-by-hour forecast, details/tomorrow forecast, 10-day forecast
	//it partially works for the weekend forecast, and the yesterday page
	cleanUpDetailedForecasts();
}

//delete the little yahoo search bar on the bottom... why would i want to do a web search if i came here to see the forecast???
document.getElementById('yahoosearchbar').parentNode.innerHTML = ""

function cleanUpLocal()
{
	//look for the id=cont div elements which is the stuff on the right side of all three table sections
	var firstContDivIndex = 0;  //this one is ads next to the current conditions
	var secondContDivIndex = 0; //this one is ads next to the 36-hr forecast
	var thirdContDivIndex = 0;  // this one is the radar, the ads are on the left
	for(var i = 0; i < document.getElementsByTagName('div').length; i++)
	{
		if(document.getElementsByTagName('div')[i].id == 'cont')
		{
			if(firstContDivIndex == 0)
			{
				GM_log("first div cont index: " + i);
				firstContDivIndex = i;
			}
			else if(secondContDivIndex == 0)
			{		
				GM_log("second div cont index: " + i);
				secondContDivIndex = i;
			}
			else
			{
				GM_log("third div cont index: " + i);
				thirdContDivIndex = i;
			}
		}
	} 

	//this will move up the DOM to get the whole table to be deleted later
	var secondTable = document.getElementsByTagName('div')[secondContDivIndex].parentNode.parentNode.parentNode.parentNode;
	var thirdTable = document.getElementsByTagName('div')[thirdContDivIndex].parentNode.parentNode.parentNode.parentNode;

	//this is the HTML of the stuff we want to keep
	var thirtySixHrForecast = '<TD VALIGN="TOP" WIDTH="453">' + document.getElementsByTagName('div')[secondContDivIndex].getElementsByTagName('table')[0].childNodes[1].childNodes[0].childNodes[1].innerHTML;
	var radar = '<div id="cont">' + document.getElementsByTagName('div')[thirdContDivIndex].innerHTML + '</div>';

	//this is the video crap right under the current conditions area.  we will stick the 36-hr forecast here
	var videoCrap = document.getElementById('VideoModuleContainer').parentNode.parentNode;
	//we will get rid of this ad by sticking the radar here
	var firstAdOnRight = document.getElementsByTagName('div')[firstContDivIndex].getElementsByTagName('table')[0].childNodes[1].childNodes[0].childNodes[5];
	//this is the stuff right under the video crap - we will just delete this guy later
	var underVideoCrap = document.getElementById('VideoModuleContainer').parentNode.parentNode.nextSibling.nextSibling;

	//ok, time to rearrange...
	videoCrap.innerHTML = thirtySixHrForecast;
	firstAdOnRight.innerHTML = radar;

	//ok, now we can delete that other crap
	secondTable.innerHTML = "";	
	thirdTable.innerHTML = "";	
	underVideoCrap.innerHTML = "";

	//finally, search for and delete the remaining iframe ads not already taken care of
	for(var iFrames = 0; iFrames < document.getElementsByTagName('iframe').length; iFrames++)
	{
		document.getElementsByTagName('iframe')[iFrames].parentNode.innerHTML = ""	
	}

	//now widen things up a bit to make it look nice and centered by altering the css
	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}
	var width = 910;
	addGlobalStyle('#bodyContainer { background-color:#FFFFFF; width:' + width + 'px; } ' + 
					'#alertContainer { width:' + width + 'px;} ' + 
					'#parent {  width:' + width + 'px;} ' +
					'#hbBannerDiv {  width:' + width + 'px;} ');

//call this function to load the radar without having to scroll first
	mapLoadImages();
}

function cleanUpDetailedForecasts()
{
	//this gets the column on the right by going to the first iframe on the right and then jumping up a node
	//but first need to find the first iframe in the right column because sometimes there will be one in the left column which is tricky
	//we are going to jump up to the TR parent node of every iframe and then look at how many TD elements it has.  
	//if there is only one then it's probably the iframe on the left.  if there are lots then its the one we want.
	var columnOnRight;
	var numTDelementsCutoff = 10;  //this is the default for being lots of TD elements
	for(var iFrames = 0; iFrames < document.getElementsByTagName('iframe').length; iFrames++)
	{
		var iFrameParentTR = document.getElementsByTagName('iframe')[iFrames].parentNode.parentNode;
		GM_log('i: ' + iFrames + ', tds: ' + iFrameParentTR.getElementsByTagName('td').length);
		if(iFrameParentTR.getElementsByTagName('td').length > numTDelementsCutoff)
		{
			//now set the column on the right to the parent TD element.
			columnOnRight = document.getElementsByTagName('iframe')[iFrames].parentNode;
			break;
		}		
	}
	 
	//this gets the column on the left buy jumping up through the middle column and the filler text and comments
	var columnOnLeft = columnOnRight.previousSibling.previousSibling.previousSibling.previousSibling;

	//this gets the hour-by-hour or 10-day forecast section  by jumping down to the table that contains the forecast within the left column
	//the node number of the table can vary, so we will look for it
	var forecastDetails;
	for(var i = 0; i < columnOnLeft.childNodes.length; i++)
	{
		GM_log("TABLE search, i: " + i);
		if(columnOnLeft.childNodes[i].tagName == 'TABLE')
		{			
			forecastDetails = columnOnLeft.childNodes[i];
			break;
		}
	}

	//now make the left column just have the hour-by-hour forecast, thereby deleting all the rest of the ads
	columnOnLeft.innerHTML = '<table width="453" cellspacing="0" cellpadding="0" border="0">' + forecastDetails.innerHTML + '</table>';

	//now delete the right column too
	columnOnRight.innerHTML = "";
}

function cleanUpRadar()
{
	//pretty easy to delete the ads on the right
	document.getElementById('pg_rightside').innerHTML = ""

	//the ads on the left are under the radar and contained in a div
	//but we can't just delete all the divs because there is an early on that looks to be important
	//so first bypass that by looking for tables (which contains the radar, then delete all the divs after the first table found
	var tableFound = false;
	for(var i = 0; i < document.getElementById('pg_leftside').childNodes.length; i++)
	{
		if(!tableFound)
		{
			if(document.getElementById('pg_leftside').childNodes[i].tagName == 'TABLE')
			{	
				GM_log("found a table: " + i);
				tableFound = true;
			}
		}
		else
		{
			if(document.getElementById('pg_leftside').childNodes[i].tagName == 'DIV')
			{		
				GM_log("found a div: " + i);
				document.getElementById('pg_leftside').childNodes[i].innerHTML = "";
			}
		}
	}
}