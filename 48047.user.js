/*
Created : 06/20/06 Initial Version

Change log:
1.0.0 06/20/06 Initial Version
1.1.0 06/15/07 Add score to title
1.2.0 05/02/09 Force ad_slug_table to display 'block'
1.3.0 05/04/09 Add getLastPlay to show last play in title
*/

// ==UserScript==
// @name  baseballbetter          
// @namespace     
// @description	yahoo baseball
// @include http://sports.yahoo.com/mlb/*
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////////
//
// The code aint pretty but it makes on-line baseball watching a little better
//
/////////////////////////////////////////////////////////////////////////////////////

// change page width to 100% cause I can
changeWidth();

// get the in-progress box score and set the title bar with 
// the good stuff like team names, current score, inning, strike-ball count, and runners on-base
getScore();

// remove an ugly in-the-middle of the page banner
removeBanner();

// get the score summary html
var summary = getSummary();

// get the ad block that's in the upper right corner
var ad = getAdvertisement();

// replace the ad block with the scoring summary
ad.innerHTML= summary;

/////////////////////////////////////////////////////////////////////////////////////

// this changes the main table width to 100%
// and lets the scoring summary fit a little nicer
function changeWidth() {
	var node = document.evaluate('//table[@width="974"]',
    		document,
    		null,
    		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);

	node.snapshotItem(0).width="100%";
}

// get the game score summary.
function getSummary() {
	var titleNode = document.evaluate(
    		'//td[. = "Scoring Summary"]',
    		document,
    		null,
    		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);
	if(!titleNode.snapshotLength) return;
  
   // this seems kinda weird and I don't remember why.  Looks like
   // I'm cleaning out some unneccessary table so that it can be repostioned cleaner
	var summaryNode = (titleNode.snapshotItem(0).parentNode.parentNode.parentNode);
	if (summaryNode) {
		var summary = summaryNode.innerHTML;
		summaryNode.innerHTML = "";
		return summary;
	}
	else return "";
}

// find the advertisement table that we'll use to display the scoring summary in it's place
function getAdvertisement() {
	var adNode = document.evaluate(
	    "//table[@class='ad_slug_table']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	adNode = (adNode.snapshotItem(0));
	adNode.setAttribute('class','');
	adNode.style.display="block";
	return adNode;	
}

// get the current game score, shorten team name, and get inning (top/bottom)
function getScore() {
   var scoreNode = document.evaluate(
	    '//td[@class="yspsctnhdln"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);	
	scoreNode = (scoreNode.snapshotItem(0));	

   // this is ugly but I want to shorten the team so all the info displays nice on the tab
	var str = scoreNode.textContent;
	str = str.replace(/\n/g, "");
	str = str.replace(/  /g, "");
	str = str.replace(/,/g, "");
	str = str.replace("Arizona", "AZ");
	str = str.replace("Atlanta", "Atl");
	str = str.replace("Baltimore", "Bal");
	str = str.replace("Boston", "Bos");
	str = str.replace("Chi Cubs", "Cub");
	str = str.replace("Chi White Sox", "CWS");
	str = str.replace("Cincinnati", "Cin");
	str = str.replace("Cleveland", "Cle");
	str = str.replace("Colorado", "Col");
	str = str.replace("Detroit", "Det");
	str = str.replace("Florida", "FL");
	str = str.replace("Houston", "Hou");
	str = str.replace("Kansas City", "KC");
	str = str.replace("Minnesota", "Min");
	str = str.replace("Milwaukee", "Mil");
	str = str.replace("LA Angels", "LAA");
	str = str.replace("LA Dodgers", "LAD");
	str = str.replace("NY Mets", "Met");
	str = str.replace("NY Yankees", "NYY");
	str = str.replace("Oakland", "Oak");
	str = str.replace("Philadelphia", "Phi");
	str = str.replace("Pittsburgh", "Pit");
	str = str.replace("San Diego", "SD");
	str = str.replace("San Francisco", "SF");
	str = str.replace("Seattle", "Sea");
	str = str.replace("St. Louis", "SL");
	str = str.replace("Tampa Bay", "Tam");
	str = str.replace("Toronto", "Tor");
	str = str.replace("Texas", "Tex");
	str = str.replace("Washington", "Was");
	str = str.replace(/ /g, "");
	
	// get inning and shorten
	var inning = getInning();
	inning = inning.replace(/\n/g, "");
	inning = inning.replace(/  /g, "");
	inning = inning.replace(/Bot /g, "B");
	inning = inning.replace(/Top /g, "T");
	inning = inning.replace(/End /g, "E");
	
	// get last playa nd add it to title also.  pigpile

	document.title = str + ' ' + inning + ' ' + getOut() + ' ' + getLastPlay();
}

// Yahoo occassionally display a big ugly banner on the page.  And sometime it doesn't
// It takes up too much room so, let's remove it, if present
function removeBanner() {
	var bannerNode = document.evaluate('//div[@class="bt1 header"]',
    		document,
    		null,
    		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);
	if(!bannerNode.snapshotLength) return;
	bannerNode.snapshotItem(0).innerHTML="";
}

// util to get current inning
function getInning() {
	var node = document.evaluate("//td[@class='yspscores'][@width='144']", 
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	return node.innerHTML;
}

// util to get how many outs and who's on base
function getOut() {
	var balls = document.evaluate("//*[contains(.,'O:')]/b", 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var count = "";
	if (balls) {
		var n= balls.nextSibling;
		var strikes = n.nextSibling;
		n = strikes.nextSibling;
		var outs= n.nextSibling;
		count = balls.innerHTML + '-' + strikes.innerHTML + ' O:'+ outs.innerHTML;
	}
	
	// find how many men are on base.  
	// do this by looking at what image is being displayed.
	// yeah, I need to clean this up but it works and I don't have time.  go for it
	var men = document.evaluate("//img[contains(@src,'tr_empty.gif')]", 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;		
	if (men) { 
		men = "empty";
	}
	else {
		men = document.evaluate("//img[contains(@src,'tr_1b.gif')]", 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
		if (men) {
			men = "1b";
		}	
		else {
			men = document.evaluate("//img[contains(@src,'tr_2b.gif')]", 
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (men) {
				men = "2b";
			}
			else {
				men = document.evaluate("//img[contains(@src,'tr_3b.gif')]", 
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (men) {
					men = "3b";
				}
				else {
					men = document.evaluate("//img[contains(@src,'tr_1b2b.gif')]", 
					document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;	
					if (men) {
						men = "1b2b";
					}
					else {
						men = document.evaluate("//img[contains(@src,'tr_1b3b.gif')]", 
						document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;	
						if (men) {
							men = "1b3b";
						}
						else {
							men = document.evaluate("//img[contains(@src,'tr_2b3b.gif')]", 
							document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;	
							if (men) {
								men = "2b3b";
							}
							else {
								men = document.evaluate("//img[contains(@src,'tr_full.gif')]", 
								document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
								if (men) {
									men = "full";
								}
								else {							
									men = "";
								}
							}
						}
					}
				}
			}
		}
	}
	return count + ' ' + men;
}

// get the last play
function getLastPlay() {
   var lastplay = document.evaluate("//span[contains(.,'Last Play:')]", 
	   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if (lastplay) {
	   lastplay=lastplay.innerHTML;
	   lastplay=lastplay.replace("<b>Last Play:</b>", "")
	}
	else {
	   lastplay="";
	}
	return lastplay;   
}
