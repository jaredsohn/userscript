// PubMed Citations v0.31
// version 0.3
// 11-26-07
// Copyright (c) 2007, Pluto
// email: pluto@plutosforge.com

// ==UserScript==
// @name PubMed Citations
// @description lists the number of citations(with a link)  next to each search result in pubmed
// @namespace userscripts.org/scripts/show/13704
// @include http://www.ncbi.nlm.nih.gov/sites/entrez
// ==/UserScript==

var thisVersion = '0.31'; //need this for checking for updates at userscripts.org

var greekReSearchNotice = '   (Too much Greek?, re-searching...)';
var badGreekTitles = 0;  //an index for the badTitleResultLines array
var badTitleResultLines = new Array();  //an array to store the resultLines of the greek titles to re-search

var authorReSearchNotice = '   (No results found, trying author search...)';
var authorReSearches = 0;
var authorReSearchLines = new Array();

var allResults = new Array(); //an array to associate the <div> numbers of a result with it's title, and other possible info
var allResultsIndex = 0; //an indexer to keep track of the total number of titles found

//** need to put the variable declarations first because I guess greasemonkey does not instantiate them all first whereever they are, which is a problem for slower machines
//will wait a total of 5 sec, but check each 0.25 sec to see if the previous set of searches has finished yet
const maxWaits = 20;
const waitTime = 250;

var numWaits= 1; //keeps track of the number of times the recursive function has been called
var timeOutCounter = 0; //for debugging purposes - keeps track of the total time elapsed
var firstHaveAllComments = false;

main();  //DO IT!

function main()
{
	//in Pubmed's new design (11-9-07) each results title gets its own <div> tag
	//so this goes through all the <div> tags, finds the ones named "title", then pulls out the title, formats it and sends it off to Google as before
	for (var i = 0; i < document.getElementsByTagName('div').length; i++)
	{
		if (document.getElementsByTagName('div')[i].className == 'title')
		{		
			getCitations(getTitle(i),i,'first');
			
			//store each title in an array for use later
			allResults[i] = getTitle(i);
			allResultsIndex++;		
		}		
	}		

	firstRecursiveWait(); //wait for all the title searches to be done, then research the ones with greek titles that didn't return results
	
}


function firstRecursiveWait()
{
	GM_log('in first wait' + waitTime + '__' + numWaits);
	window.setTimeout(function()
	{	
		//if havent found all the comments yet (i.e. done searching) and havent maxed out the counter yet, then go on; else will be empty settimeout function
		if(!firstHaveAllComments && numWaits < maxWaits)
		{	
			//increment the counters before the recursive call
			timeOutCounter += waitTime;
			numWaits++;
			
			//check to see if all the results have had comments added (i.e. the search is done)
			if(checkResultComments() == allResultsIndex)
			{
				//if done, then set the trip variable
				haveAllComments = true;
				GM_log(timeOutCounter + ' ' + 'finally done' + ' ' + checkResultComments() + ' =? ' + allResultsIndex);
				
				//startup the google search for each specified result
				for (var i = 0; i < badGreekTitles; i++)
				{
					var badTitle = getTitle(badTitleResultLines[i]);
					//change the spelled out greek characters to the actual letters - the whole point of this re-searc
					badTitle = replaceGreek(badTitle);
					//send 'greek' as the third argument to tell getCitations() that this is a re-search for a greek title
					getCitations(badTitle,badTitleResultLines[i],'greek');
				} 
				
				//now, reset the global counters before calling the second recursive call function
				numWaits= 1;
				timeOutCounter = 0;
				secondRecursiveWait(); //check for all the greek searches to be done, then call the authors search
			}
			else //then still waiting, so call recursive call again
			{
				GM_log(timeOutCounter + ' ' + 'not done yet' + ' ' + checkResultComments() + ' =? ' + allResultsIndex);
				firstRecursiveWait();
			}
		}
	}, waitTime * numWaits); //sets the delay longer and longer as the recursion advances
}

//have a second loop trip because resetting the original one will cause the previous function to restart searching for comments
var secondHaveAllComments = false;
function secondRecursiveWait() //this function is nearly identical to the first one
{
	window.setTimeout(function()
	{
		if(!secondHaveAllComments && numWaits < maxWaits)
		{
			timeOutCounter += waitTime;
			numWaits++;
			if(checkGreekReSearchComments() == badTitleResultLines.length)
			{
				//debug  GM_log(timeOutCounter + ' ' + '2nd finally done' + ' ' + checkGreekReSearchComments());
				secondHaveAllComments = true;
				for (var i = 0; i < authorReSearches; i++)
				{
					//here the difference is that we search with authors instead of titles
					var authors = getAuthors(authorReSearchLines[i]);
					//debug GM_log('about to search for: ' + authors);
					//send 'authors'  as the third argument to tell getCitations() that this is a re-search with just authors
					getCitations(authors,authorReSearchLines[i],'author');
					
				checkForMultipleScripts();		
				} 
							

				checkForUpdates();
			}
			else
			{
				//debug GM_log(timeOutCounter + ' ' + '2nd not done yet' + ' ' + checkGreekReSearchComments());
				secondRecursiveWait();
			}
		}
	}, waitTime * numWaits); 
}

//########################################                    ##############################################
//##################################   FORMATTING FUNCTIONS  ########################################
//#######################################                    ##############################################

//each HTML comment has "!" as part of it, so lthis funciton looks for that to denote a comment and proof that the search finished
function checkResultComments()
{
	var numComments = 0;
	for(var i in allResults)
	{
		if(document.getElementsByTagName('div')[parseInt(i)+2].innerHTML.indexOf("!") != -1)
		{
			numComments++;
		}		
	}	
	return numComments;
}

//after a greek title re-search, I insert a "^greek search done", so lthis funciton looks for the "^" to denote show that the search finished
function checkGreekReSearchComments()
{
	var numComments = 0;
	for(var i = 0; i < badTitleResultLines.length; i++)
	{
		if(document.getElementsByTagName('div')[badTitleResultLines[i]+2].innerHTML.indexOf("^") != -1)
		{
			numComments++;
		}		
	}	
	return numComments;
}

//pull the title from the page and replace all the spaces with +'s for the search query  ---- may not have to do this - google may do it automatically - someting to try out
function getTitle(resultLine)
{	
	var title = document.getElementsByTagName('div')[resultLine].textContent;		
	while ((title.indexOf(" ") != -1) || (title.indexOf("&") != -1)) 
	{
		title = title.replace(' ','+');		
		title = title.replace('&','%26'); //ampersands screw up the URL
	}	
	return title;
}

//pull the authors from a result and remove the first,middle initials and just make a list of the last names because that's fine with google... actually initials last give no results
function getAuthors(resultLine)
{
	//this pops up, and back in through the CSS to get the list of authors... good chance this will be the first to break with a Pubmed page redesign
	var authorsString = document.getElementsByTagName('div')[resultLine].parentNode.parentNode.previousSibling.previousSibling.childNodes[1].textContent;
	
	//put all the authors into an array using ", " as the delimiter
	var authorsArray = authorsString.split(', ');
	
	var lastNames = ''; //a string of the author last names, separated by commas
	for(var i = 0; i < authorsArray.length; i++)
	{
		//this next line will take out the last name from the array, leaving the space that was separating the last name and initials
		lastNames += authorsArray[i].substring(0,authorsArray[i].indexOf(' '));
		if(i < authorsArray.length-1)
		{
			//don't slap on the comma if you're on the last author
			lastNames += ', ';
		}
	}
	return lastNames;
}

//replace all the spelled out greek words with the actual symbols
function replaceGreek(thisTitle)
{
	//set these string variables to the ASCII codes
	var alpha = String.fromCharCode(945);
	var beta = String.fromCharCode(946);
	var gamma = String.fromCharCode(947);
	var delta = String.fromCharCode(948);
	var kappa = String.fromCharCode(954);
	var mu = String.fromCharCode(956);
	
	while ((thisTitle.indexOf('alpha') != -1) || 
	(thisTitle.indexOf('beta') != -1) || 
	(thisTitle.indexOf('gamma') != -1) || 
	(thisTitle.indexOf('delta') != -1) || 
	(thisTitle.indexOf('kappa') != -1) ||
	(thisTitle.indexOf('mu-') != -1) || (thisTitle.indexOf('mu ') != -1) )
	{
		thisTitle = thisTitle.replace('alpha',alpha);
		thisTitle = thisTitle.replace('beta',beta);
		thisTitle = thisTitle.replace('gamma',gamma);
		thisTitle = thisTitle.replace('delta',delta);
		thisTitle = thisTitle.replace('kappa',kappa);		
		thisTitle = thisTitle.replace('mu-',mu + '-');   //  only deal with these two cases to not screw up words like muscarinc		
		thisTitle = thisTitle.replace('mu ',mu + ' ');  
	}	
	return thisTitle;
}


//########################################                    ##############################################
//##################################   SEARCHING FUNCTIONS  ########################################
//#######################################                    ##############################################


function getCitations(thisTitle,resultLine,searchMode)
{
	var searchURL;
	
	if(searchMode == 'author') 
	{	
		//then don't need the "intitle:" prefix
		searchURL = 'http://scholar.google.com/scholar?hl=en&lr=&q=' + thisTitle + '&btnG=Search';
	}
	else // add in the intitle prefix
	{
		searchURL = 'http://scholar.google.com/scholar?hl=en&lr=&q=intitle%3A%22' + thisTitle + '%22&btnG=Search';
	}
	
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: searchURL,
		headers: {/*  for some odd reason sending these headers caused Google to return a search with a greek character in the title as have no results when a manual search in the browser showed that there clearly was a result
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',    //so, commenting everything out sends the default blank string header and it works fine now
			'Accept': 'application/atom+xml,application/xml,text/xml',*/},
		onload: function(responseDetails)
		{			
			//an object for storing and manipulating the search result
			var searchResult = new searchResultObject();
			searchResult.init(responseDetails);
			
			//first check to see if you got locked out of google.
		 	if(searchResult.pageTitle() == '403 Forbidden')
			{
				var lockOutNotice = '   <a href="' + searchURL + '">' + 'Lockout! - 1)Delete your google.com cookie, 2)click here and enter in the phrase, 3)should work now' + '</a>';
				modifyPubmedResult(resultLine,lockOutNotice,'lockout');
			} 
			else //carry on with the rest of the search
			{
				//what to use as the marker for the search being done
				var doneComment = 'done';
				if(searchMode == 'greek') doneComment = '^greek search done';
				
				//if this the second search after inserting the greek characters, then remove the temporary notice saying that it's re-searching
				if(searchMode == 'greek') modifyPubmedResult(resultLine,greekReSearchNotice,'','replace');
				//if this the third search author search, then remove the temporary notice saying that it's re-searching
				if(searchMode == 'author') modifyPubmedResult(resultLine,authorReSearchNotice,'','replace');
				
				if (searchResult.hasResults())
				{						
					//if there are multiple results, then compare the actual pubmed result to each google result
					var bestMatchIndex = 0;
					var bestMatch;
					var multipleResults = false;
					if(searchResult.getNumResults() > 1)
					{
 						bestMatchIndex = searchResult.matchTitles(resultLine);
						bestMatch = searchResult.getBestMatch();
						multipleResults = true;
						//modifyPubmedResult(resultLine,'   <a href="' + searchURL + '">' + '(Multiple search results - ' + searchResult.getNumResults()  + '), using ' + bestMatch + '% match hit</a>');					
					}
					//if there were multiple results, bestMatchIndex is set to the index of the best google result match, otherwise the default is zero, or the first(and only) result
					if(searchResult.getCitedByLink(bestMatchIndex))
					{
						modifyPubmedResult(resultLine,searchResult.getCitedByLink(bestMatchIndex),doneComment);							
						//debug if(searchMode == 'greek') modifyPubmedResult(resultLine,'  (after greek fix)','^greek search done');								
						//debug if(searchMode == 'author') modifyPubmedResult(resultLine,'  (after author fix)');
						if(multipleResults)	modifyPubmedResult(resultLine,'   <a href="' + searchURL + '">' + '(' + bestMatch + '% hit)</a>');					
						//modifyPubmedResult(resultLine,'   <a href="' + searchURL + '">' + '(Multiple search results - ' + searchResult.getNumResults()  + '), using ' + bestMatch + '% match hit</a>');					

					}					
					else //if we found a result, but there are no citations
					{
						var noCitesLink = '   <a href="' + searchURL + '">' + 'No citations - see result' + '</a>';					
						modifyPubmedResult(resultLine,noCitesLink,doneComment);
						//debug if(searchMode == 'greek') modifyPubmedResult(resultLine,'  (after greek fix)','^greek search done');							
						//debug if(searchMode == 'author') modifyPubmedResult(resultLine,'  (after author fix)');
						if(multipleResults)	modifyPubmedResult(resultLine,'   <a href="' + searchURL + '">' + '(' + bestMatch + '% hit)</a>');					

					}					
				}
				
				//if no search results were found, then one reason could be that Pubmed spelled out a greek letter in the title, but Google stores it as the greek letter itself
				//so, check if there are any spelled out greek letters in the title, then tell the program to re-search them
				else if((thisTitle.match('alpha')) || (thisTitle.match('beta')) || (thisTitle.match('gamma')) || (thisTitle.match('delta')) || (thisTitle.match('kappa')))
				{
					//add this resultLine to the list of ones to search for later
					badTitleResultLines[badGreekTitles] = resultLine;
					//increment the index of greek titles for the next one
					badGreekTitles++;					
					modifyPubmedResult(resultLine,greekReSearchNotice,doneComment);			
				}
				else if(searchMode == 'author') // if this was an author search, then it was the last effort, no results found  //if nothing else, then link to a google search for the hell of it  ----- new feature: next version have this part store the result line for doing an author search
				{
					var noResultsLink = '   <a href="' + searchURL + '">' + 'No results - see search' + '</a>';			
					modifyPubmedResult(resultLine,noResultsLink,doneComment);
					//debug if(searchMode == 'author') modifyPubmedResult(resultLine,'  (after author fix)');
				}
				else // for the results where title alone, or greek-fixed title didn't work, then save them to do an author search next
				{												
					authorReSearchLines[authorReSearches] = resultLine;					
					authorReSearches++;					
					modifyPubmedResult(resultLine,authorReSearchNotice,doneComment);					
					//debug if(searchMode == 'greek') modifyPubmedResult(resultLine,'  (after greek fix)','^greek search done');
				}
			}
		}
	});	
}

function modifyPubmedResult(divIndex,linkText,commentText,type) //adds in the specified text to the search result; if 'type' is specifice as 'replace' then will remove the specified test
{
	if(type == 'replace')
	{
		document.getElementsByTagName('div')[divIndex+2].innerHTML = document.getElementsByTagName('div')[divIndex+2].innerHTML.replace(linkText,'');
	}
	else
	{
		document.getElementsByTagName('div')[divIndex+2].innerHTML += linkText + '<!--' + commentText + '-->';
	}
}

function searchResultObject()  //an object containing info for each Google scholar search result
{
	this.init = _init;
	this.getNumResults = _getNumResults;
	this.pageTitle = _pageTitle;
	this.hasResults = _hasResults;
	this.getCitedByLink = _getCitedByLink;
	this.matchTitles = _matchTitles;
	this.getBestMatch = _getBestMatch;
	
	var searchDocument;
	var numDivs;
	var numResults;
	
	var topMatch = 0;
	var topMatchIndex = 0;
	
	function _init(details)
	{
		//got this neat trick for parsing the HTML in responseDetails from http://blogs.pathf.com/agileajax/bjax/index.html????
		searchDocument = document.createElement(searchDocument);
		// do the XHR thing...
		searchDocument.innerHTML = details.responseText; // contains the full html of a page
		// voila, div now is the Root of an HTML DOM tree that can be traversed for screen scraping
		
		numDivs = searchDocument.getElementsByTagName('div').length;			
	}
	
	function _getNumResults()
	{
		if(searchDocument.getElementsByTagName('table')[3].getElementsByTagName('b')[4].previousSibling.textContent.substr(1,2) == 'of')
		{		
			numResults = searchDocument.getElementsByTagName('table')[3].getElementsByTagName('b')[4].textContent;
		}
		return numResults;
	}
	
	function _pageTitle()  //returns the title of the search result page
	{
		return searchDocument.getElementsByTagName('title')[0].textContent;
	}
	
	function _hasResults()  //if the  result page has a <div> element then there are results
	{		
		if(numDivs >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}		
	}
	
	function _getBestMatch()
	{
		return topMatch;
	}
	
	function _matchTitles(resultLine)
	{
		var firstResultIndex = 0;
		
		if(searchDocument.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent.substr(0,12) == 'Did you mean')
		{
			firstResultIndex++;
		}	
		
		var numResults = searchDocument.getElementsByTagName('div')[0].getElementsByTagName('p').length - firstResultIndex;
		
		var titleMatches = new Array();
		var titleCounter = 0;
		for (var i = firstResultIndex; i < numResults; i++)
		{
			var wordMatches = 0;
			
			var thisResultTitle = searchDocument.getElementsByTagName('div')[0].getElementsByTagName('p')[i].getElementsByTagName('a')[0].textContent.toLowerCase();
			var actualTitle = allResults[resultLine].toLowerCase();
			var thisResultTitleWords = thisResultTitle.split(' ');
			var actualTitleWords = actualTitle.split('+');
			//debug  GM_log('thisResultTitle ' + thisResultTitle + 'actualTitle ' + actualTitle + 'thisResultTitleWords ' + thisResultTitleWords + ' actualTitleWords ' + actualTitleWords);
			for(var at = 0; at < actualTitleWords.length; at++)
			{
				for(var trt = 0; trt < thisResultTitleWords.length; trt++)
				{
					if(actualTitleWords[at] == thisResultTitleWords[trt])
					{
						wordMatches++;
						break;
					}
				}
			}
			titleMatches[titleCounter] = Math.round(wordMatches / thisResultTitleWords.length * 100);
			titleCounter++;
		} 
		
		//debug GM_log(titleMatches);
		for (var i = 0; i < titleMatches.length; i++)
		{
			if(titleMatches[i] > topMatch)
			{
				topMatch = titleMatches[i];
				topMatchIndex = i;
			}
		}
		if(topMatch > 100)
			topMatch = 100;
		return topMatchIndex;
	}
	
	function _getCitedByLink(bestTitleIndex)
	{
		var newCitedLink;
		
		var firstResultIndex = 0;
		
		if(searchDocument.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent.substr(0,12) == 'Did you mean')
		{
			firstResultIndex++;
		}	
		//GM_log('result index: ' + firstResultIndex);
		firstResultIndex += bestTitleIndex;
		var numLinks = searchDocument.getElementsByTagName('div')[0].getElementsByTagName('p')[firstResultIndex].getElementsByTagName('a').length;

		for (var i = 0; i < numLinks; i++) //will iterate through the <a> links on the page; one of them is the cites
		{
			var citedText = searchDocument.getElementsByTagName('div')[0].getElementsByTagName('p')[firstResultIndex].getElementsByTagName('a')[i].textContent;
			
			// now check if each <a> link is the "Cited by", then modify the current page
			if(citedText.substr(0,5) == 'Cited')
			{	
				// pull out the link to the citing papers
				var citedLink = searchDocument.getElementsByTagName('div')[0].getElementsByTagName('p')[firstResultIndex].getElementsByTagName('a')[i].href;
				
				// for some reason, 'http://www.ncbi.nlm.nih.gov/' gets added to the "href" in place of 'http://scholar.google.com/' which is weird, but easy to fix
				newCitedLink = citedLink.replace('http://www.ncbi.nlm.nih.gov/','');
				
				// make up the new "Cited by" link, then insert it at the end of each pubmed reference.
				newCitedLink = '   <a href="http://scholar.google.com/' + newCitedLink + '">' + citedText + '</a>';
			
				 break;
			}		
		}
		return newCitedLink;
	} 
	
}

function checkForMultipleScripts()
{		
	var dupComments = 0;
	for(var i in allResults)
	{
		var resultText = document.getElementsByTagName('div')[parseInt(i)+2].textContent;
		if(resultText.indexOf("Cited by") != -1){
			if(resultText.indexOf("Cited by",resultText.indexOf("Cited by") + 1) != -1){
				dupComments++;
				//debug GM_log(resultText + ' ' + dupComments);
				}}
		else if(resultText.indexOf("No results") != -1){
			if(resultText.indexOf("No results",resultText.indexOf("No results") + 1) != -1){
				dupComments++;
				//debug GM_log(resultText + ' ' + dupComments);
				}}
		else if(resultText.indexOf("No citations") != -1){
			if(resultText.indexOf("No citations",resultText.indexOf("No citations") + 1) != -1){
				dupComments++;
				//debug GM_log(resultText + ' ' + dupComments);
				}}
		else if(resultText.indexOf("author search") != -1){
			if(resultText.indexOf("author search",resultText.indexOf("author search") + 1) != -1){
				dupComments++;
				//debug GM_log(resultText + ' ' + dupComments);
				}}
		else if(resultText.indexOf("much Greek") != -1){
			if(resultText.indexOf("much Greek",resultText.indexOf("much Greek") + 1) != -1){
				dupComments++;
				//debug GM_log(resultText + ' ' + dupComments);
				}}	
	}	
	//debug GM_log('dupcomments: ' + dupComments);
	
	if(dupComments > Math.round(allResultsIndex/3)){
		alert('It looks like you have multiple versions of this script running.  To delete the old one, go to go to Tools -> Greasemonkey -> Manage User Scripts..., then select the old script and click the Uninstall button at the bottom.');}
}

function checkForUpdates() //the autoupdater
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://userscripts.org/scripts/show/13704',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',},
		onload: function(responseDetails)
		{
			//got this neat trick for parsing the HTML in responseDetails from http://blogs.pathf.com/agileajax/bjax/index.html
			var div = document.createElement(div);
			// do the XHR thing...
			div.innerHTML = responseDetails.responseText; // contains the full html of a page
			// voila, div now is the Root of an HTML DOM tree that can be traversed for screen scraping
			
			//use this instead of the title as the version delimiter so users don't have to uninstall the old script
			var newVersion = div.getElementsByTagName('div')[3].getElementsByTagName('p')[0].textContent.replace('Current Version: ','');
			//debug GM_log('new version: _' + newVersion + '_');
			if(newVersion != thisVersion)
			{
				var x=window.confirm("There is a new version of PubMed Citations (v" +  newVersion + ") available at Userscripts.org \n                               You are currently using version " + thisVersion + " \n \n                                      Click \"Ok\" to download it.");
				if (x) {window.location = 'http://userscripts.org/scripts/source/13704.user.js'}
			}
			
		}
	});
}