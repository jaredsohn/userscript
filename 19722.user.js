// ==UserScript==
// @name           blogger widget
// @author          ibad
// @provided by     http://jagan.co.nr
// @description    widget for blog
// @include       
// ==/UserScript==


// Ticker startup
var theCharacterTimeout = 50;
var thePostTimeout = 5000;
var theWidgetOne = "_";
var theWidgetTwo = "-";
var theWidgetNone = "";
var theLeadString = "RECENT POSTS:&nbsp;";

var thePostTitles = new Array();
var thePostLinks = new Array();
var objPost;
//var thePostCount = 4;

function  PostTicker(json){
		//Ticker data collection
		try{
			for(var post = 0; post < thePostCount; post++){
				objPost = json.feed.entry[post];
				thePostTitles[post] = objPost.title.$t;
				//thePostLinks[post]	= json.feed.entry[post].link[post].href;
				for (var nCounter = 0; nCounter < objPost.link.length; nCounter++) 
			   	{
                	if (objPost.link[nCounter].rel == 'alternate') 
					{
                  		thePostLinks[post] = objPost.link[nCounter].href;
                  		break;
    				}
    			}
			}
			thePostTitles[post] = "Hacked this part :)";
			thePostLinks[post] = "http://jagan123.blogspot.com";
			thePostCount++;
		}catch(exception){
			alert(exception);
		}
		startPostTicker();
}
//Ticker Startup
function startPostTicker()
 {
 // Define run time values
    theCurrentPost = -1;
    theCurrentLength = 0;
    // Locate base objects
    if (document.getElementById) {
        theAnchorObject = document.getElementById("tickerAnchor");
		runTheTicker();
    }
    else {
        document.write("<style>.ticki{display:none;}.ticko{border:0px; padding:0px;}</style>");
		return true;
    }
}
// Ticker main run loop
function runTheTicker()
 {
    var myTimeout;
    // Go for the next post data block
    if (theCurrentLength == 0)
    {
        theCurrentPost++;
        theCurrentPost = theCurrentPost % thePostCount;
        thePostTitle = thePostTitles[theCurrentPost].replace(/&quot;/g, '"');
        theTargetLink = thePostLinks[theCurrentPost];
        theAnchorObject.href = theTargetLink;
        thePrefix = "<span class=\"tickls\">" + theLeadString + "</span>";
    }
    // Stuff the current ticker text into the anchor
    theAnchorObject.innerHTML = thePostTitle.substring(0, theCurrentLength) + whatWidget();
    // Modify the length for the substring and define the timer
    if (theCurrentLength != thePostTitle.length)
    {
        theCurrentLength++;
        myTimeout = theCharacterTimeout;
    }
    else
    {
        theCurrentLength = 0;
        myTimeout = thePostTimeout;
    }
    // Call up the next cycle of the ticker
    setTimeout("runTheTicker()", myTimeout);
}
// Widget generator
function whatWidget()
 {
    if (theCurrentLength == thePostTitle.length)
    {
        return theWidgetNone;
    }
    if ((theCurrentLength % 2) == 1)
    {
        return theWidgetOne;
    }
    else
    {
        return theWidgetTwo;
    }
}