// ==UserScript==
// @name           Download.com Redirect Remover
// @namespace      http://userscripts.org/scripts/show/56591
// @description    Adds direct links and to Download.com pages
// @include        http://download.cnet.com/*
//
// @copyright 	   2009+, Arithmomaniac (http://scr.im/2041)
// @license		   MPL 1.1+ / GPL 2.0+ / LGPL 2.1+ / CC BY-SA 3.0+ US
// @license		   GNU Lesser General Public License 2.1+; http://www.gnu.org/licenses/lgpl.html
// @license		   Mozilla Public License 1.1+ ; http://www.mozilla.org/MPL/
// @license		   GNU General Public License 2.0+; http://www.gnu.org/licenses/gpl.html
// @license		   Creative Commons Attribution-Noncommercial 3.0+ United States License; http://creativecommons.org/licenses/by-sa/3.0/us/
// @version		   2.0.4
// ==/UserScript==




//Version History
//1.1		(08/28/09) - first public publishing 
//1.2		(09/02/09) - countdown in download text
//1.3		(09/04/09) - Set pauseSecs with a user command
//1.3.1  	(09/11/09) - Regorganized and added xPathing
//1.5 		(09/21/09) - Direct file linking
//1.6		(09/21/09) - Global redirect stripping
//2.0a		(10/07/09) - Global direct file linking using global event listeners
//2.0b		(10/08/09) - Minor efficiency teaks
//2.0		(10/08/09) - Tidied and annotated code
//2.0.1		(10/12/09) - Auto-redirecting bug fix for referral pages; menu command cleanup
//2.0.2		(10/17/09) - Fixed auto-download bug for off-site referrals
//2.0.3		(10/24/09) - Works with more of download.com's file servers
//2.0.4		(10/26/09) - Failproof exe detection for AttrModifiedFunction


//--------- PRE-OPERATIONAL - adds generic functions and loads script variables ---------------

//This is my personal xPath helper function. It auto-detects the root node for the evaluate method.
function getElementsByXPath(obj, xPathString)
{
	var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var xPathArray = [];
	for (var i = 0; i < xPathSnapshot.snapshotLength; i++)
	{
		xPathArray[i] = xPathSnapshot.snapshotItem(i); //convert snapshot to node
	}
	
	return xPathArray;
}

//pauseSecs is an int that controls the redirecting.
// Positive: seconds before redirecting
// Negative: does not redirect
// Zero: redirects immediately
pauseSecs = (isNaN(GM_getValue("pauseSecs")) ? 0 : GM_getValue("pauseSecs")); //if invalid stored value, redirect immediately

GM_registerMenuCommand('Download.com: set timer', setPauseSecs);

function setPauseSecs() //sets the PauseSecs internal variable
{
	var pauseSecsEdit = prompt('Seconds before referrals grab the file (-1 or non-number for turning it off) . Current value is ' + GM_getValue("pauseSecs")); //popup
	if (pauseSecsEdit == Math.round(pauseSecsEdit)) // must be int
	{
		GM_setValue("pauseSecs", pauseSecsEdit);
	}
	else
	{
		GM_setValue("pauseSecs", defaultSecs);
	}
}

//--------- SCRIPT FUNCTIONS - functions for stripping redirects ---------------

//This runs on every page. un-redirects all links on the page
allLinks = getElementsByXPath(document, "//a[starts-with(@href, 'http://dw.com.com/redir?')]"); //all links that point to the download page
for (var i = 0; i < allLinks.length; i++)
{
	allLinks[i].href = unescape(allLinks[i].href.replace(/^http:\/\/dw\.com\.com\/redir\?.*&destUrl=/,'' )); // delete garbage and unescape
} 

function clickFunction(evt)
{
	if (evt.which == 3) //if a right-click, allow default action
	{
		return false;
	}
	var hrefParent = getElementsByXPath(evt.target, "ancestor-or-self::a[@href]")[0] //grabs the link, not the link text
	if (!(hrefParent))
	{
		return true; //if you didn't click on a link, don't do anything
	}
	//the server tries to tack on referral info, which is never necessary but ruins direct file links. This reverts it so the intended page is always grabbed.
	hrefParent.href = hrefParent.href.replace(/&tag=.*$/,''); 
	if 		( hrefParent.href.match(/^http:\/\/download\.cnet\.com\/[\w-]+\.html\?spi=[\w]*$/))
	{
		evt.stopPropagation(); //cancel the page-changing default link action
		evt.preventDefault();
		grabDLFile(hrefParent.href); //grab the direct download link
	}
}		

function attrModifiedFunction(evt)
{
	if 	( //a link's value was just changed to a direct download link
	getElementsByXPath(evt.relatedNode, "ancestor-or-self::a[@href]")[0] && 
	evt.attrName == 'href' && 
	evt.prevValue.match(/^http:\/\/download\.cnet\.com\/[\w-]+\.html\?spi=[\w]*$/) &&
	evt.newValue.match(/^http:\/\/[^.]+?files[^.]*\.cnet\.com\/\S+?/)
	)
	{
		window.location = evt.newValue; //open that page
	}
}

function grabDLFile(hrefToGrab) //given a "please wait for download" page, grabs the actual file URL
{		
	GM_xmlhttpRequest(
	{
method: 'GET',
url: hrefToGrab,
onload: function(x) {
			var pageText = x.responseText;
			wantedHref = pageText.match(/<META HTTP-EQUIV="Refresh" CONTENT="0; URL=(\S+)"\/>/i)[1]; //grabs download URL from page metadata
			var matchingLinks = getElementsByXPath(document, "//a[@href='" + hrefToGrab + "']"); //grabs all identical links
			for (var i = 0; i < matchingLinks.length; i++)
			{
				var currentItem = matchingLinks[i];
				currentItem.href = wantedHref;
			}
		}	
	}
	);		
}		

//------------------------------------------

document.addEventListener("click", clickFunction, false);

if(window.location.href.match(/^http:\/\/download\.cnet\.com\/[a-z\d-]+\/[\d_-]+\.html/i)) //a one-app info page
{
	toDLPageLinks = getElementsByXPath(document, "//*[@class='downloadNow']//a"); //all links that point to the download page for that file
	grabDLFile(toDLPageLinks[0].href);

	if(window.location.search.match(/\?part=dl-[\d]+/i)) //if it is a referral page from another site
	{

		//hyperlinks the bold text naming the software and takes it to the app's info page
		softwareLine = getElementsByXPath(document, '//*[@class="partnerIntro"]')[0];
		softwareName = getElementsByXPath(softwareLine, 'descendant::strong')[0]; //grabs software name
		softwareLink = document.createElement("a"); 
		softwareLink.setAttribute("href", window.location.href.replace(/\?[^?]+$/,'')); //creates link to main page
		softwareLink.appendChild(softwareName);
		softwareLine.appendChild(softwareLink); //linkifies software name

		downloadNowPP = getElementsByXPath(document, "//*[@class='partnerDLnow']//p")[0]; //a line we will change later
		downloadNowPPBackup = downloadNowPP.cloneNode(true); 	//creates a backup if we want to undo
		
		function fetchFile() 
		{ 
			pauseSecs--;
			if (pauseSecs > 0) 
			{
				downloadNowPP.innerHTML = 'Downloading in ' + pauseSecs + ' seconds. <a>click here</a> to cancel.'; 
				//turns the "download now" text into a countdown with a cancel-countdown option
				downloadNowPPLink = getElementsByXPath(downloadNowPP, 'descendant::a')[0]; //that link we just created
				function stopCountdown() //halts the countdown and reverts our changes
				{
					clearTimeout(redirInterval);
					downloadNowPP.parentNode.replaceChild(downloadNowPPBackup,downloadNowPP);
				}
				downloadNowPPLink.addEventListener('click', stopCountdown, false) //allows that link we created to do that
			}
			else
			{
				clearTimeout(redirInterval); //stops decrementing - no longer necessary
				while ("string" != typeof wantedHref) //while wantedHref does not exist (no file name fetched yet)
				{
					downloadNowPP.innerHTML = 'Fetching file...';
				}
				downloadNowPP.innerHTML = 'Thank you for downloading.';
				window.location = wantedHref; //grabs file

			}
		}

		if (pauseSecs >= 0) //if redirect is on
		{
			pauseSecs++; //allows first number to run, since script runs pauseSecs--
			redirInterval = setInterval(fetchFile, 1000 ); //sets countdown (optionally), then automatically fetches download file
		}
		

	}
}

else 	//on all other pages, the correct download file is only fetched when a link is clicked. So presumably, as soon as the
{ 		//file URL has been fetched, you want to download it. This checks all times any attribute is changed. The function 
	document.addEventListener("DOMAttrModified", attrModifiedFunction, false); //itself limits it to what we want.
}