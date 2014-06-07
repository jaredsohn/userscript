// ==UserScript==
// @name           otvety.google.ru timestamps highlighting
// @namespace      otvety.google.ru
// @description    Highlight timestamps of posts for otvety.google.ru
// @include        http://otvety.google.ru/otvety/*
// @include        http://www.otvety.google.ru/otvety/*
// @grant          GM_getValue
// @grant          GM_setValue
// @version        1.5
// ==/UserScript==

// global variables
var currentMachineTimestamp = new Date();

// define what colors use to highlight timestamps
const bgColorOldPost = "#EB5B7F"; // background color for old post
const bgColorNewPost = "#66FF33"; // background color for new post
const txColor = "#000000"; // change the text color

// define magic numbers!
const milisecondsInDay = 86400000; // used in calculation
const daysDifference = 60; // modify this const to change the age of the post

var regExpDate = /^(\d\d\.\d\d\.\d\d)$/;	// date in format DD.MM.YY
var regExpDate1 = /^(.+\d+:\d\d)$/;			// date in formats 01:02, 3:04, Yesterday at 05:06 etc

function getDateFromTimestampText(pTimestampText) // parsing string
{
	var tmpDay   = (pTimestampText[0]+pTimestampText[1]);
	var tmpMonth = (pTimestampText[3]+pTimestampText[4]);
	var tmpYear  = (pTimestampText[6]+pTimestampText[7]);
	
	var result = new Date((20+tmpYear),tmpMonth,tmpDay,0,0,0,0);
	
	return (result)
}

function modRegularTimestampHTML(pTimestampHTML)
{
	var postingTimestampTextRaw = pTimestampHTML.innerHTML;
	
	var postingTimestampTextClean = "";
	
	for (var i=0; i<postingTimestampTextRaw.length; i++)
	{
		postingTimestampTextClean += postingTimestampTextRaw[i];
	}
	
	var postingDate = getDateFromTimestampText(postingTimestampTextClean);
	
	var postAgeInDays = ( currentMachineTimestamp.getTime() - postingDate.getTime() ) / milisecondsInDay;
	
	modifyTimestampColor(pTimestampHTML, postAgeInDays);

}

function modifyTimestampColor(pTimestampHTML, postAgeInDays)
{
	pTimestampHTML.style.setProperty ("color", txColor, null); // change text color
	
	if (postAgeInDays >= daysDifference)
	{
		pTimestampHTML.style.setProperty ("background-color", bgColorOldPost, null);
	}
	else
	{
		pTimestampHTML.style.setProperty ("background-color", bgColorNewPost, null);
	}
};

function findAndModifyTimestamps()
{
	var timestampsHTMLcollection=document.getElementsByClassName("smt");
    for (var i=0; i<timestampsHTMLcollection.length; i++)
	{
		var divContent = timestampsHTMLcollection[i].innerHTML;
		if ( divContent.match(regExpDate) )
			{
				modRegularTimestampHTML(timestampsHTMLcollection[i]);
			};
		if ( divContent.match(regExpDate1) )
			{
				modifyTimestampColor(timestampsHTMLcollection[i], 0);
			};
    }
}

findAndModifyTimestamps();
