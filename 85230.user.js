// ==UserScript==
// @name            MH Log Autoloader
// @namespace       http://www.hsuke.com/mhunt/
// @version         0.14
// @description     Extracts the Hunter's Journal from MouseHunt
// @include         http://www.hsuke.com/mhunt/*
// @author          Nathan Yang ( MHDataBank[at]gmail.com )
// ==/UserScript==

//Globals
var scriptVersion = '0.14';
var homeDomain = 'hsuke.com';
var logSummarizer_page = 'Log_Summarizer';
var KingsCreditMsg = "Claim Your Reward";
var KingsRewardFound = 0;
var isPagesLoaded = 1;

//For Log Summarizer/Parser auto-post
var numPages = 3;
var pages = new Array();

var autoLoadDivID = document.getElementById('autoLoadDiv');
var autoLoadButton = document.getElementById('autoLoadButton');
var noAutoLoadSpan = document.getElementById('noAutoLoadSpan');
var scriptVersionDiv = document.getElementById('scriptVersionDiv');
var installAutoloaderMsgDiv = document.getElementById('installAutoloaderMsg');
var dataLogID = document.getElementById('crData01');

/* King's Reward detection:
Look for the true/false string after has_puzzle
KR: "next_activeturn_seconds":0,"has_puzzle":true,"is_online":false,
No KR: "next_activeturn_seconds":891,"has_puzzle":false,"is_online":true,

Input: The response_html string containing "has_puzzle"
Output: If there's a King's Reward: true, else: false
*/
function isKR(htmlStr) {
	var startIndex = htmlStr.indexOf("has_puzzle");
		if (startIndex >= 0) {
			startIndex += 12;
			var endIndex = htmlStr.indexOf(",", startIndex);
			var KRFoundString = htmlStr.substring(startIndex, endIndex);
		}
		
		return (KRFoundString == 'false') ? false : true;
}

/* getPage(pageNum) gets xHR responses from MouseHunt's Journal pages.
* Credit for getPage() goes to Furoma's MouseHuntizer
*/
function getPage(pageNum) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.mousehuntgame.com/canvas/journal.php?page='+(pageNum+1),
		headers: {
				'Content-type':'application/x-www-form-urlencoded',
		},
		onload: function (response_xhr) {
			var journal_entries="Placeholder";
			
			var response_html = String(response_xhr.responseText);
			response_html = response_html.replace(/\n/g,'EOLEndofLine');
			
			if(response_html.indexOf("has_puzzle") != -1) {
				isPagesLoaded = 1;
				
				KingsRewardFound = isKR(response_html);
				
				//If NOT king's reward - different check (not 'The King wants to...') because of no JS due to XHR
				if ( !KingsRewardFound ) {	
					
					/*
					<div class='journaldate'>8:15 pm - Lagoon</div><div class='journaltext'>I went on a hunt with <a href="http://www.mousehuntgame.com/canvas/hunterprofile.php?snuid=606257824">Andre Tay</a> where I was successful in my hunt! I caught an 2 oz. <a href="http://www.mousehuntgame.com/canvas/adversaries.php?mouse=eagle_owl">Eagle Owl Mouse</a> worth 5,300 points and 2,250 gold.</div></div>
					*/
					response_html = String(response_html.match(/<div class='journalbody'>(.+)<div class='footer'>/)[0]);
					response_html = response_html.match(/<div class='journaldate'>.+?<\/div><\/div>/g);
					var allEntries = "";
					for (var i=0; i<response_html.length; i++) {
						allEntries += response_html[i] + '\n';
					}
					response_html = allEntries;
					//TEST: document.getElementById('crMainInfo01').value=response_html;
					
					response_html = response_html.replace(/<\/div><div class='journaltext'>/g,'\n');
					response_html = response_html.replace(/<div class='journaldate'>/g,'\n');
					response_html = response_html.replace(/<[^>]*>/g,'');
					response_html = response_html.replace(/EOLEndofLine/g,'\n');
					
					response_html = response_html.replace(/\t+/g, '');
					response_html = response_html.replace(/[ ]+/g, ' ');
					response_html = response_html.replace(/\n\s+/g, '\n');
					response_html = response_html.replace(/\n+/g, '\n');
					
					//alert("After all matches: \n\n"+response_html);
					journal_entries = response_html;	
				} else {
					journal_entries = "KR";
				}
			} else {
				isPagesLoaded = 0;
				autoLoadDivID.innerHTML = "Cannot load MH Journal entries. Please check that you're logged into MouseHunt.";
				autoLoadButton.value = "AutoLoad failed";
			}
			
			pages[pageNum] = journal_entries;
		} // End of onload
		
	}); // End of GM_xmlhttpRequest
	
} // End of getPage()

function get_all_pages(){
	
	autoLoadButton.style.visibility = "visible";
	autoLoadButton.style.display = "inline";
	for (var i=0; i<numPages; i++) {
		getPage(i);
		autoLoadButton.value = "Loading logs ... ";
	}
	
	displayPages();
}

function displayPages() {
	var loaded = true;
	var numLoaded = 0;
	for (var i=0; i<pages.length; i++) {
		if ((pages[i] == "")||(pages[i] == null)) {
			loaded=false;
		} else {
			numLoaded++;
		}
	}
	
	// Do not display pages unless they're all loaded async
	if ( loaded && (pages.length==numPages)) {
		var logs = "*** Auto-posted Hunt Logs \n";
		for (var i=0; i<pages.length; i++) {
			logs += pages[i];
		}
		
		if (KingsRewardFound) {
			logs = "King\'s Reward";
		}
		
		logs = logs.replace(/&#58;/g, ':');
		logs = logs.replace(/\s\n/g, '\n');
		
		// If you can't load the page, display this message.
		if (isPagesLoaded == 0) {
			autoLoadDivID.innerHTML = "Cannot load MH Journal entries. Please check that you're logged into MouseHunt.";
			autoLoadButton.value = "AutoLoad failed";
		} else {
			autoLoadDivID.innerHTML = logs.replace(/\s$/, '');
			autoLoadButton.value = "AutoLoad Hunts";
		}
		
	} else {
		autoLoadButton.value = "Loading logs ... "+(numPages - numLoaded);
		setTimeout(displayPages, 1000);
	}
}

// Run only if on a "Log_Summarizer.php" page
if (document.location.href.indexOf(logSummarizer_page) != -1) {
	noAutoLoadSpan.style.display = "none"; // Both of these need to be set, newer version
	noAutoLoadSpan.style.visibility = "hidden"; // Both of these need to be set, older version
	scriptVersionDiv.innerHTML = scriptVersion;
	installAutoloaderMsgDiv.style.display = "none";
	
	get_all_pages(); // Run scripts on this page
}