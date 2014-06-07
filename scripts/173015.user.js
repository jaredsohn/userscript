// ==UserScript==
// @name          Simple blocking script for ff.net and ao3
// @namespace     flightblockscript
// @author     	  Michelle Khuu
// @description   Happy birthday Zerrat! Blocks specific authors from ff.net, summary keywords, and fics that don't meet a min word count. 
//					Also, thanks fmo for catching bugs~ 
// @grant       GM_getValue
// @grant       GM_setValue
// @include		  http://*.fanfiction.net/*
// @include		  https://*.fanfiction.net/*
// @include		  http://archiveofourown.org/*
// @include		  https://archiveofourown.org/*
// @version 1.1
// ==/UserScript==

// =================== <3 <3 <3 BASIC SETTINGS FOR NON-CODERS <3 <3 <3 ===================//

var enableFFNet = 1;			//Apply this script on fanfiction.net
var enableAO3 = 1;				//Apply this script on archiveofourown.org

var minWordCount = 0;			//Story must meet these minimum words in order to show up. No comma's please
								//LOWERCASE ONLY. Hide fic written by these authors on ffnet
var ffnetAuthorBlackList = ['thegadgetfish'];
								//LOWERCASE ONLY. Hide fic written by these authors on ao3
var ao3AuthorBlackList = ['thegadgetfish'];	
								//LOWERCASE ONLY. Show warnings on fic that contain these keywords
var wordsGreyList = ['vampires', 'werewolves'];
								//LOWERCASE ONLY. Hide fic that contain these keywords
var wordsBlackList = ['futa', 'rape', 'noncon', 'dubcon'];		

//Display options for how fic summaries will appear. Only applies to fics that match 'wordsGreyList'
//				0 = custom
//				1 = replace entire summaries with an image specified in picSource
//              2 = add warning to beginning of summary
//				3 = 50-50 chance of summary being replaced by frf gif, or one of the strings from 'awesomeComments'
//				4 = replace entire summary with random string from 'awesomeComments'
//				5 = add warning to beginning of summary, followed with random string from 'awesomeComments'

var mode = 2;					//Change this value according to ^^^

// -- Custom mode settings. Only applies if mode = 0 --//
//			0 = Disable
//			1 = Enable
var displayWarning = 1;			//Display matched words from 'wordsBlackList'
var displaySummary = 1;			//Display original summary
var displayExtra = 1;			//Display extra commentary
var displayTags = 1;			//Display story info (rating, reviews, chapters). FFNet Only!


// =================== <3 <3 <3 END BASIC SETTINGS <3 <3 <3 ===================//

// =================== <3 <3 <3 ADVANCED SETTINGS <3 <3 <3 ====================//

var fontColor = "red";			//font color used in summary replacements
var commentColor = "green";		//font color used for strings in 'awesomeComments'

var picSource = "";		//add a funny picture link here, for mode 1

//List of AWESOMEO COMMENTS (used in mode 4, 5)
var awesomeComments = ['Dont read this fic', 'hello friend how are you', 'hello friend what are you reading',
					'blah blah blah', 'this ship is sinking oh no'];
					
// ========= <3 <3 <3 END ADVANCED SETTINGS DON'T TOUCH UNLESS YOU'RE A DEV <3 <3 <3 =========//

var ffnet = 1;
var ao3 = 2;
var siteID;

var storylist = ""; 
var summarylist = ""; 
var authorBlackList = "";
var endTag = "";

if(location.hostname.match('archiveofourown.org') && enableAO3==1)
{
	siteID = ao3;
	authorBlackList = ao3AuthorBlackList;
	storylist = document.getElementsByClassName('work blurb group');
	summarylist = document.getElementsByClassName('userstuff summary');
    endlist = document.getElementsByClassName('stats');
}
else if (location.hostname.match('fanfiction.net') && enableFFNet==1)
{
	siteID = ffnet;
	authorBlackList = ffnetAuthorBlackList;
	storylist = document.getElementsByClassName('z-list');
	summarylist = document.getElementsByClassName('z-indent z-padtop');
    endlist = document.getElementsByClassName('z-padtop2 xgray');
}

//Author blocking
for(var a = 0; a < storylist.length; a++)
{
	var storyData = storylist[a].innerHTML.toLowerCase();
    
    
	for(var b = 0; b < authorBlackList.length; b++)
	{
		if(storyData.match(authorBlackList[b]))
		{
			storylist[a].style.display = 'none';
		}
	}
}

//Word count checking
for(var b = 0; b < endlist.length; b++)
{
    var endData = endlist[b].innerHTML.toLowerCase();
    checkWordCount(endData);
    if(checkWordCount(endData)==false)
    {
        storylist[b].style.display = 'none';
    }
}

//Searches summary info for select keywords
for(var i = 0; i < summarylist.length; i++)
{
	var summaryData = summarylist[i].innerHTML.toLowerCase();
        
	for(var j = 0; j < wordsBlackList.length; j++)
	{
		if(summaryData.match(wordsBlackList[j]))
		{
			storylist[i].style.display = 'none';
		}
	}
    
	//Loops through graylist and changes summary content
	for(var k = 0; k < wordsGreyList.length; k++)
	{
		if(summaryData.match(wordsGreyList[k]))
		{
			summarylist[i].innerHTML = replaceSummary(summarylist[i].innerHTML, wordsGreyList[k]);
		}
	}
}

function checkWordCount(origHTML)
{    
    var endTags = "";
    var wordString = "";
    
    switch(siteID)
	{
		case ffnet:
			endTags = origHTML.split("words:");
        	wordString = endTags[1].split("-");
			break;
            
		case ao3:	
            endTags = origHTML.split("words:</dt>");
      		  wordString = endTags[1].split("<dt>chapters:");
			break;     
	}

 	//Gets of commas in the number string  
    var wordCount = Number(wordString[0].replace(/[^0-9\.]+/g,""));
	
    if(wordCount > minWordCount)
        return true;
    else
        return false;
}

//Replace summaries that contain blacklist words with happier stuff	
function replaceSummary(origHTML, matchedWord)
{
	var chosenString = "";
	var rand = Math.floor((Math.random()*awesomeComments.length));
	var rand2 = Math.random();
	
	var summarywEnd = origHTML.split("<div class=\"z-padtop2 xgray\">");
	var summary = summarywEnd[0];
	var endTags = "";
	
	switch(siteID)
	{
		case ffnet:
			endTags = "<div class=\"z-padtop2 xgray\">" + summarywEnd[1];
			break;
		case ao3:	
			break;
	}

	switch(mode)
	{
		case 0:
			if(displayWarning == 1)
				chosenString += "<font color=" + fontColor + ">" + matchedWord.toUpperCase() + "</font> ";
			if(displaySummary == 1)
				chosenString += "<font color=\"grey\">" + summary + "</font> ";
			if(displayExtra == 1)
				chosenString += "<br><font color=" + commentColor + ">"
				+ awesomeComments[rand] + "</font>";
			if(displayTags == 1)
				chosenString += endTags;
			break;
		case 1:
			chosenString = "<img src=" + picSource + ">";
			break;
		case 2:
			chosenString = "<font color=" + fontColor + ">" + matchedWord.toUpperCase() 
			+ "</font> " + "<font color=\"grey\">" + summary + "</font>";
			break;
		case 3:
			if(rand2 > .5)
				chosenString = "<font color=" + fontColor + ">" + matchedWord.toUpperCase() 
				+ "</font> " + "<font color=" + commentColor + ">" + awesomeComments[rand] + "</font> ";
			else
				chosenString = "<img src=" + picSource + ">";
			break;
		case 4:
			chosenString = "<font color=" + commentColor + ">" + awesomeComments[rand] + "</font> ";
			break;
		case 5:
			chosenString = "<font color=" + fontColor + ">" + matchedWord.toUpperCase() 
			+ "</font> " + "<font color=" + commentColor + ">" + awesomeComments[rand] + "</font> ";
			break;
	}
	
	return chosenString;
}