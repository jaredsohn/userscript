// Bierdopje AllSeasonSubs user script
// version 0.3
// September 6, 2010
// Copyright (c) 2010, n2k3
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Bierdopje AllSeasonSubs", and click Uninstall.
//
// --------------------------------------------------------------------
// 
// Changelog:
// v0.3 - Better handling of subs within seasons, especially the 'all seasons' page. Other small bugs fixed and visuals improved.
// v0.2 - Changed subtitle episode detection, this fixes the script not showing up on certain pages.
// v0.1 - Initial release
//
// ==UserScript==
// @name          Bierdopje AllSeasonSubs
// @namespace     bierdopje.com
// @description   User Script that provides all subtitle links for one season in a single window.
// @include       http://*bierdopje.com*episodes/season*
// @include       http://*bierdopje.eu*episodes/season*
// ==/UserScript==

//*****************************************************************************************
//*       Javascript Libraries
//*****************************************************************************************

// use the JQuery JS library for querying the page
// Add jQuery explicitely if not yet loaded by the site (in GM the race condition with the site is unavoidable)
if(typeof unsafeWindow.jQuery == 'undefined') 
{
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://cdn.bierdopje.eu/x/jquery.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

//*****************************************************************************************
//*       Main
//*****************************************************************************************

// play nice: wait until the JQuery lib is loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') 
  {
    window.setTimeout(GM_wait,500); 
  }
  else
  {
    $ = unsafeWindow.jQuery; 
    //unsafeWindow.jQuery.noConflict();
    bdallsubs(); // execute the GM code
  }
}

GM_wait();


//*****************************************************************************************
//*       Helper functions
//*****************************************************************************************

// Check wether a number is even or odd.
function is_even(num) {
	return(isFinite(num)&(!(num&1)));
}

//*****************************************************************************************
//*       GM Code: Client-Side Page Modification
//*****************************************************************************************

// Query and process the page
function bdallsubs() {
	
	// Declare variables
	var allDutchSubsStr = allEnglishSubsStr = "<table cellpadding=\\\'0\\\' cellspacing=\\\'0\\\'><tr><td style=\\\'background-color: white; text-align: center;\\\'>";
	var lastEp = -1;
	var lastS = -1;
	
	// Store the episode table into a variable
	var htmlDump = $("table.listing").html();
	
	// Search through the html for each episode
	tableRows = htmlDump.match(/<td>S\d{2}E\d{2}<\/td>[\s\S]*?<\/td>\s{1,2}<\/tr>/img);
	
	// Search through all episodes for subtitles
	for(i = 0; i < tableRows.length; i++) {
		allDutchSubs = tableRows[i].match(/^<img.*nl(?:_gray)?\.gif.*$/img);
		allEnglishSubs = tableRows[i].match(/^<img.*us(?:_gray)?\.gif.*$/img);
		currentS = tableRows[i].match(/<td>S(\d{2})E(\d{2})<\/td>/im)[1];
		currentEp = tableRows[i].match(/<td>S(\d{2})E(\d{2})<\/td>/im)[2];
		
		if (is_even(i)) {
			bgColor = '#EEEEEE';
		}
		else {
			bgColor = 'white';
		}
		
		if (lastS >= 0) {
			if (currentS > lastS) {
				allDutchSubsStr += "</tr></td><tr><td style=\\\'background-color: white; text-align: center;\\\'><hr style=\\\'height: 2px; background-color: #4489E6;\\\'><b><br />Seizoen " + currentS + "</b><hr style=\\\'height: 2px; background-color: #4489E6;\\\'></tr></td><tr><td style=\\\'background-color: " + bgColor + "; padding: 1px 5px 1px 5px;\\\'>";
				allEnglishSubsStr += "</tr></td><tr><td style=\\\'background-color: white; text-align: center;\\\'><hr style=\\\'height: 2px; background-color: #4489E6;\\\'><b><br />Seizoen " + currentS + "</b><hr style=\\\'height: 2px; background-color: #4489E6;\\\'></tr></td><tr><td style=\\\'background-color: " + bgColor + "; padding: 1px 5px 1px 5px;\\\'>";
			}
		}
		else {
			if (currentS == "00") {
				allDutchSubsStr += "<b>Specials</b><hr style=\\\'height: 2px; background-color: #4489E6;\\\'>";
				allEnglishSubsStr += "<b>Specials</b><hr style=\\\'height: 2px; background-color: #4489E6;\\\'>";
			}
			else {
				allDutchSubsStr += "<b>Seizoen " + currentS + "</b><hr style=\\\'height: 2px; background-color: #4489E6;\\\'>";
				allEnglishSubsStr += "<b>Seizoen " + currentS + "</b><hr style=\\\'height: 2px; background-color: #4489E6;\\\'>";
			}
		}
		
		if (currentEp >= lastEp) {
			allDutchSubsStr += "</tr></td><tr><td style=\\\'background-color: " + bgColor + "; padding: 1px 5px 1px 5px;\\\'><b>Aflevering: " + currentEp + "</b><br />";
			allEnglishSubsStr += "</tr></td><tr><td style=\\\'background-color: " + bgColor + "; padding: 1px 5px 1px 5px;\\\'><b>Aflevering: " + currentEp + "</b><br />";
		}
		else {
			allDutchSubsStr += "<b>Aflevering: " + currentEp + "</b><br />";
			allEnglishSubsStr += "<b>Aflevering: " + currentEp + "</b><br />";
		}
		
		// Get a hold of each subtitle for this episode
		dutchSubs = allDutchSubs[0].match(/(<a (?:class.*?)? href=\\'\/downloads\/sub\/\d*\\'>.*?<\/a>)/img);
		englishSubs = allEnglishSubs[0].match(/(<a (?:class.*?)? href=\\'\/downloads\/sub\/\d*\\'>.*?<\/a>)/img);
		
		// Check if there are any dutch subs for this episode.
		if (dutchSubs != null) {
			// Add all individual subtitle matches found to the output variable
			for(j = 0; j < dutchSubs.length; j++) {
				allDutchSubsStr += dutchSubs[j] + '<br />';
			}
		}
		else {
			allDutchSubsStr += "Geen Nederlandse ondertitels gevonden."
		}
		
		// Check if there are any english subs for this episode.
		if (englishSubs != null) {
			for(j = 0; j < englishSubs.length; j++) {
				
				allEnglishSubsStr += englishSubs[j] + '<br />';
			}
		}
		else {
			allEnglishSubsStr += "Geen Engelse ondertitels gevonden."
		}
		
		lastS = currentS;
		lastEp = currentEp;
	}
	
	allDutchSubsStr += "</td></tr><tr><td style=\\\'padding: 0px;\\\'><hr style=\\\'height: 2px; background-color: #4489E6;\\\'></td></tr></table>";
	allEnglishSubsStr += "</td></tr><tr><td style=\\\'padding: 0px;\\\'><hr style=\\\'height: 2px; background-color: #4489E6;\\\'></td></tr></table>";
	
	// Create links and a Tip-box with the found subtitles
	$("span.rightfloat").css('text-align', "right")
	$("a[text=Alles gezien]").after(' | <a href="javascript:void();" onclick="Tip(\'' + allDutchSubsStr + '\', TITLE, \'Nederlandse ondertitel links:\', DURATION, 0, CLICKCLOSE, false, CLOSEBTNTEXT, \'<img border=\\\'0\\\' src=\\\'http://cdn.bierdopje.eu/g/if/icons/cross.gif\\\'>\');">Alle <img src="http://cdn.bierdopje.eu/g/if/icons/flags/nl.gif" border="0"> ondertitels</a> | <a href="javascript:void();" onclick="Tip(\'' + allEnglishSubsStr + '\', TITLE, \'Engelse ondertitel links:\', DURATION, 0, CLICKCLOSE, false, CLOSEBTNTEXT, \'<img border=\\\'0\\\' src=\\\'http://cdn.bierdopje.eu/g/if/icons/cross.gif\\\'>\');">Alle <img src="http://cdn.bierdopje.eu/g/if/icons/flags/us.gif" border="0"> ondertitels</a>');
}