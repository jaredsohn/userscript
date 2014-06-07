Ã¯Â»Â¿// ==UserScript==
// @name Shacknews Comment Filter
// @namespace http://www.thomwetzel.com/greasemonkey/shackCommentsFilter/
// @description Filter out Shacknews comments you're not interested in.
// @include http://*.shacknews.com/ja.zz?*
// @include http://shacknews.com/ja.zz?*
// ==/UserScript==
/*

	Shacknews Comment Filter
	Author: ThomW 

	If you like this script 
	------------------------
	Help me get a PSP: http://www.freepsps.com/?r=16790492
	Buy me shiny things: http://amazon.com/gp/registry/1YRBQ22VGN9PR

	Version info:
	---------------------------------------------------------------------------
	2005.09.23: 
		Script updated for Greasemonkey 0.6.x support
	2005.07.01:
		Fix: Replaced addGlobalStyle function with faster version
	2005.06.08c:
		Fix: Removed event from filterBar option events for major speed up
		Fix: Condensed all style changes down to one function call for speed
		Removed: scrollIntoView() fix since it's now its own script 
	2005.06.08b:
		Fixed: Script no longer runs in iframe when dthread updates
	2005.06.08:
		Added scrollIntoView() fix
	2005.06.06:
		Reverse filter confirmation added
		Reverse filter status is now being published with the word list
	2005.06.03:
		Reverse filter added
	2005.06.01:
		Created 'filterBar' as suggested by ieGod
		Replaced pup's cookie code with GM_getValue and GM_setValue
		Added " as converted punctuation 
		Added option checkboxes and links to stats and shackmessage Thom
		Fixed stripPunctuation()
	2005.05.17:	
		Rewritten for Greasemonkey 0.3.3 
		Word list publishing added
	2005.05.13b: 
		Added user filtering
	2005.05.13:	
		Added nuke all filters option to menu
		Fixed mid-word filtering issue
		Added confirmation dialog when removing words
	2005.05.12: 
		List management code 
		Filter optimizations
	2005.05.10: 
		Initial release

	Credits:
	---------------------------------------------------------------------------
	ThomW - http://www.shacknews.com/ja.zz?person=thomw
		Filter cookie / list management code / filter optimizations /
		Greasemonkey 0.3.3 support / word list publishing ... 
	
	ezkilla2 - http://www.shacknews.com/ja.zz?person=ezkilla2
		Concept / Original author
	
	Other contributors:
	---------------------------------------------------------------------------
		pupismyname - - http://www.shacknews.com/ja.zz?person=pupismyname
			Xpath Code
			
		http://diveintogreasemonkey.org/
			Lots of useful information was obtained from here
	
		http://jdstiles.com/functions.html
			trim(), ltrim(), rtrim()
		
		http://www.crockford.com/javascript/remedial.html
			isArray(), isFunction(), isObject()
		
*/

(function() {

	// don't run the script from the dthread iframe	
	if (window.name == 'bufferFrame')
		return;
	
	// grab start time of filtering
	var scriptStartTime = getTime();

// ----------------------------------------------------------------------------
// utility functions
// ----------------------------------------------------------------------------

	function getTime() 
	{
		benchmarkTimer = new Date();
		return benchmarkTimer.getTime();
	}

	// from http://jdstiles.com/functions.html
	function ltrim(argvalue) {
		while (1) {
			if (argvalue.substring(0, 1) != " ")
				break;
			argvalue = argvalue.substring(1, argvalue.length);
		}
		return argvalue;
	}	
	function rtrim(argvalue) {
		while (1) {
			if (argvalue.substring(argvalue.length - 1, argvalue.length) != " ")
				break;
			argvalue = argvalue.substring(0, argvalue.length - 1);
		}
		return argvalue;
	}
	function trim(argvalue) { var tmpstr = ltrim(argvalue); return rtrim(tmpstr); }	


	// from http://diveintogreasemonkey.org/
	function addGlobalStyle(css) {
		if(/microsoft/i.test(navigator.appName) && !/opera/i.test(navigator.userAgent)){
			document.createStyleSheet().cssText=css;
		}
		else {
			var ele=document.createElement('link');
			ele.rel='stylesheet';
			ele.type='text/css';
			ele.href='data:text/css;charset=utf-8,'+escape(css);
			document.getElementsByTagName('head')[0].appendChild(ele);
		}
	}
	
	// from http://www.crockford.com/javascript/remedial.html
	function isFunction(a) { return typeof a == 'function'; }
	function isObject(a) { return (a && typeof a == 'object') || isFunction(a); }	
	function isArray(a) { return isObject(a) && a.constructor == Array; }


	// based on code from http://www.quirksmode.org/js/selected.html
	function getSel()
	{
		var txt = '';
		if (window.getSelection)
			txt = window.getSelection();
		else if (document.getSelection)
			txt = document.getSelection();
		else if (document.selection)
			txt = document.selection.createRange().text;
		else 
			return;
		return trim(String(txt));
	}
	

	function wrapQuotes(str)
	{
		if (typeof(str) != 'string')
			return "''";	
		else
			return "'" + str.replace("'", "\'") + "'";
	}
	
	
	function stripHtml(str)
	{
		var regExp=/<\S[^>]*>/g;
		return String(str).replace(regExp, ' ');
	}
	
	
	var reStripPunctuation = RegExp(/(!|\(|\)|\\|:\;|&quot;|"|'|,|\.|\/|\?|<|&lt;|>|&gt;)/g);
	function stripPunctuation(str)
	{
		// this function replaces any punctuation in str
		// with spaces
		//
		// 2005.06.01: 
		// 	I found that this function wasn't replacing all
		//		occurances of the substrings - it was only replacing
		//		the first occurance.  Converted it to use regular 
		//		expressions with global flag set.  
		
		str = String(str);
		
		str = str.replace(/!/g, " ");
		str = str.replace(/\(/g, " ");
		str = str.replace(/\)/g, " ");
		str = str.replace(/\\/g, " ");
		str = str.replace(/:/g, " ");
		str = str.replace(/;/g, " ");
		str = str.replace(/&quot;/g, " ");
		str = str.replace(/"/g, " ");
		str = str.replace(/'/g, " ");
		str = str.replace(/,/g, " ");
		str = str.replace(/\./g, " ");
		str = str.replace(/\//g, " ");
		str = str.replace(/\?/g, " ");
		str = str.replace(/</g, " ");
		str = str.replace(/&lt;/g, " ");
		str = str.replace(/>/g, " ");
		str = str.replace(/&gt;/g, " ");
		
		return str;

		/*		
		// This should run faster than the previous function ... need to benchmark
		str = String(str).replace(reStripPunctuation, " ");
		
		return str;
		*/
		
	}


	function getArrayIndex(needle, haystack)
	{
		// Author: Thom Wetzel
		for (var i=0; i<haystack.length; i++) {
			if (haystack[i] == needle) {
				return i;
			}
		}
		return -1;
	}
	
	
	function inArray(needle, haystack) {
		return (getArrayIndex(needle, haystack) != -1);
	}

// ----------------------------------------------------------------------------
//	Set up Greasemonkey menu items and callbacks
// ----------------------------------------------------------------------------
	
	// callback function for my Greasemonkey menu command
	function cb_addWord()
	{
		// author: ThomW

		// find text that's highlighted
		var word = getSel();
		if (!word) {
			alert("No words were highlighted!");
			return;
		}

		// convert to lower case
		word = word.toLowerCase();
		
		// search array to make sure word isn't already in the list
		if (inArray(word, arrWordFilter_EZ))
			return;
		
		// add the new word to our filter list
		arrWordFilter_EZ.push(word);
		
		// save the new filter list 
		GM_setValue(sFilteredWordList_EZ, String(arrWordFilter_EZ));
		
		// alert user 
		alert("'" + word + "' added to the comments filter");
		
		// update the filtered word list
		displayFilteredWordList();
		
		// update the page with the new filter
		doFilter();

		// publish updated word list
		publishWordList();
	}
	
	// Add word management tools to Greasemonkey menu
	GM_registerMenuCommand('Filter Highlighted Word(s)', cb_addWord)
	
	
	// Nuke all filters script
	function cb_NukeAllFilters()
	{
		// author: ThomW

		// confirm nuke
		var res = confirm("Delete all of the words and users from your Shack Comments Filter?");
		if (!res)
			return;
			
		// remove all words
		arrWordFilter_EZ = new Array();
		arrUserFilter_EZ = new Array();
		
		// save the new filter list 
		GM_setValue(sFilteredWordList_EZ, String(arrWordFilter_EZ));
		GM_setValue(sFilteredUserList_EZ, String(arrUserFilter_EZ));
		
		// alert user
		alert("Your Shack Comments Filter has been cleared.  You need to refresh the page for the change to take effect.");
		
		// update the filtered lists
		displayFilteredWordList();
		displayFilteredUserList();
	}
	
	// add nuke all filtered words option to the menu
	GM_registerMenuCommand('Clear Shack Comments Filter word list', cb_NukeAllFilters)
	
	
	function cb_setWoWFilter() {
		// author: ThomW
		resetWoWFilter();
	}
	GM_registerMenuCommand('WoW Filter', cb_setWoWFilter)
	
	// Create menu option to allow users to set their publish filtered words list preference
	function cb_setPublishFilteredWords() {
		// author: ThomW
		resetPublishFilteredWords();
	}
	GM_registerMenuCommand('Publish Filtered Words List?', cb_setPublishFilteredWords)
	

	
// ----------------------------------------------------------------------------
// filtering functions
// ----------------------------------------------------------------------------

function unFilter(event) 
{
	var elem = event.target;
	if (!elem)
		return;
	
	// hide the filteron span
	elem.style.display = "none";
	
	// get threadid
	var id = elem.getAttribute('id');
	if (!id.length)
		return;
	id = id.substr(8);
	
	// find filteron's next sibling
	elem = elem.nextSibling;
	if (!elem)
		return;
		
	// display filteroff
	elem.style.display = '';
	
	// display the prevblock
	elem = document.getElementById('prevblock' + id);
	if (!elem)
		return;
	elem.style.display = '';							
}



function collapsePost(postbody, threadid, reason)
{
	// author: ThomW
	// collapses a filtered post
	
	//modify the post to include a filtered message and an ID so we can display it later
	postbody.innerHTML = '<span id="filteron' + threadid + '" class="pseudolink">' + reason + '</span><span style="display:none">' + postbody.innerHTML + '</span>'
	
	// programmatically add filteron's unfilter function
	var filteron = document.getElementById('filteron' + threadid);
	filteron.addEventListener('click', unFilter, true);
	
	//hide preview block until we're ready to turn it back on
	document.getElementById('prevblock' + threadid).style.display = 'none';
	
}


function doFilter()
{

	

	// Original author: ezkilla2
	// 99.9% of this is ThomW's now
	
	// If the script is installed twice, this will prevent it from 
	// running twice (at least in the instance I saw here on my PC
	if ((!arrUserFilter_EZ) || (!arrWordFilter_EZ))
		return;
		
	if (boolReverseFilter)
		return doReverseFilter();
	
	// get collection of threads
	var items = document.evaluate("//div[@class='thread']/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var item, i, threadid;
	var postbody, postText;
	var postAuthor;
	var reg = new RegExp;
	
	// loop through root posts
	for (item = null, i = 0; item = items.snapshotItem(i); i++) 
	{
		// get thread id
		threadid = item.getAttribute("id").substring(11);
		
		// prevent double-filtering from happening
		if (document.getElementById('filteron' + threadid))
			continue;
		
		// get all the divs under each post
		var oThreadDivs = item.getElementsByTagName('div');
		
		// walk through divs and look for the div containing 'postbody' 
		for (var idxDiv = 0; idxDiv < oThreadDivs.length; idxDiv++)
		{
			// Grab user data for the current thread
			if (oThreadDivs[idxDiv].className.indexOf('postmeta') >= 0)
			{
				// init postAuthor for this go-around
				postAuthor = '';
				
				// search spans inside div#postmeta for author
				var oMetaSpans = oThreadDivs[idxDiv].getElementsByTagName('span');
				for (var idxSpan = 0; idxSpan < oMetaSpans.length; idxSpan++)
				{
					if (oMetaSpans[idxSpan].className.indexOf('author') >= 0)
					{
						postAuthor = oMetaSpans[idxSpan].innerHTML.toLowerCase();
						postAuthor = stripHtml(postAuthor);
						postAuthor = trim(postAuthor.substring(4));
					}
				}
			}
			else if (oThreadDivs[idxDiv].className.indexOf('postbody') >= 0)
			{
				// 
				postbody = oThreadDivs[idxDiv];
				
				// Now that we have postbody, check user filter
				for (var idx = 0; idx < arrUserFilter_EZ.length; idx++)
				{
					if (postAuthor == arrUserFilter_EZ[idx])
					{
						collapsePost(postbody, threadid, "Filtered Author: " + postAuthor);
						break; 
					}
				}

				// prevent double-filtering from happening
				if (document.getElementById('filteron' + threadid))
					break;

				// get the post text, and surround it with spaces
				postText = " " + postbody.innerHTML + " ";
				
				// strip the HTML out of the post
				postText = stripHtml(postText);
				
				// convert punctuation in the post to spaces
				postText = stripPunctuation(postText);
				
				// WoW filter!
				if (boolFilterWoW)
				{
					if (postText.indexOf(" WoW ") >= 0) 
					{
						collapsePost(postbody, threadid, "Filtered Word: WoW");
						break;
					}
				}
				
				// convert postText to lower case
				postText = postText.toLowerCase();
				
				//spin through the list of filtered words
				for (iWordFilterIndex_EZ = 0; iWordFilterIndex_EZ < arrWordFilter_EZ.length; iWordFilterIndex_EZ ++ ) 
				{
					// remove asterisks and add spaces where necessary
					var word = String(arrWordFilter_EZ[iWordFilterIndex_EZ]);
					if (word[0] == "*")
						word = word.substr(1);
					else
						word = " " + word;
					if (word[word.length - 1] == "*")
						word = word.substr(0, word.length - 1);
					else
						word += " ";

					//did we find a filtered word in the post?  tsk, tsk
					if (postText.indexOf(word) >= 0)
					{
						collapsePost(postbody, threadid, "Filtered Word: " + arrWordFilter_EZ[iWordFilterIndex_EZ]);
						
						//exit for loop - we only need one filter word hit to hide this comment, so now we're done with this loop
						break;
					}
				}
			}
		}
	}
}


function doReverseFilter()
{
	// get collection of threads
	var items = document.evaluate("//div[@class='thread']/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var item, i, threadid;
	var postbody, postText;
	var postAuthor;
	var reg = new RegExp;
	
	// loop through root posts
	for (item = null, i = 0; item = items.snapshotItem(i); i++) 
	{
		var bFilter = true;
		
		// get thread id
		threadid = item.getAttribute("id").substring(11);
		
		// prevent double-filtering from happening
		if (document.getElementById('filteron' + threadid))
			continue;
		
		// get all the divs under each post
		var oThreadDivs = item.getElementsByTagName('div');
		
		// walk through divs and look for the div containing 'postbody' 
		for (var idxDiv = 0; idxDiv < oThreadDivs.length; idxDiv++)
		{
			// Grab user data for the current thread
			if (oThreadDivs[idxDiv].className.indexOf('postmeta') >= 0) {
				
				// init postAuthor for this go-around
				postAuthor = '';
				
				// search spans inside div#postmeta for author
				var oMetaSpans = oThreadDivs[idxDiv].getElementsByTagName('span');
				for (var idxSpan = 0; idxSpan < oMetaSpans.length; idxSpan++) {
					if (oMetaSpans[idxSpan].className.indexOf('author') >= 0) {
						postAuthor = oMetaSpans[idxSpan].innerHTML.toLowerCase();
						postAuthor = stripHtml(postAuthor);
						postAuthor = trim(postAuthor.substring(4));
					}
				}
			}
			else if (oThreadDivs[idxDiv].className.indexOf('postbody') >= 0) {
				// 
				postbody = oThreadDivs[idxDiv];
				
				// Now that we have postbody, check user filter
				for (var idx = 0; idx < arrUserFilter_EZ.length; idx++) {
					if (postAuthor == arrUserFilter_EZ[idx]) {
						bFilter = false;
						break; 
					}
				}

				// jump out of the loop if the post author is filtered
				if (!bFilter)
					break;

				// get the post text, and surround it with spaces
				postText = " " + postbody.innerHTML + " ";
				
				// strip the HTML out of the post
				postText = stripHtml(postText);
				
				// convert punctuation in the post to spaces
				postText = stripPunctuation(postText);
				
				// WoW filter!
				if (boolFilterWoW) {
					if (postText.indexOf(" WoW ") >= 0) {
						bFilter = false;
						break;
					}
				}
				
				// convert postText to lower case
				postText = postText.toLowerCase();
				
				//spin through the list of filtered words
				for (iWordFilterIndex_EZ = 0; iWordFilterIndex_EZ < arrWordFilter_EZ.length; iWordFilterIndex_EZ ++ ) {
					if (postText.indexOf(" " + arrWordFilter_EZ[iWordFilterIndex_EZ] + " ") >= 0) {
						bFilter = false;
						break;
					}
				}
			}
		}
		
		// filter the post if bFilter is still true
		if (bFilter) {
			collapsePost(postbody, threadid, "Reverse Filter");
		}
	}
}



// ----------------------------------------------------------------------------
// list management functions
// ----------------------------------------------------------------------------

function loadFilterList(filterListName)
{
	// author: ThomW
	// reads in a specified list of names from the cookie

	var arr = new Array();
	
	arr = GM_getValue(filterListName);
	if (arr)
		arr = arr.split(",");
	
	if (!isArray(arr))
		arr = new Array();
		
	return arr;
}


function addWord(word)
{
	// Author: ThomW
	// This function is used when manually adding words to the list

	if (!word)
		return false;

	// convert to lower case
	word = word.toLowerCase();
	
	// search array to make sure word isn't already in the list
	if (inArray(word, arrWordFilter_EZ))
		return false;
	
	// add the new word to our filter list
	arrWordFilter_EZ.push(word);
	
	// save the new filter list
	GM_setValue(sFilteredWordList_EZ, String(arrWordFilter_EZ));
	
	// update the filtered word list 
	displayFilteredWordList();
	
	// re-filter 
	doFilter();
	
	// publish updated word list
	publishWordList();
	
	// 
	return true;
	
}


function addUser(userName)
{
	// Author: ThomW
	// function used to manually add users to the list

	if (!userName)
		return false;

	// convert to lower case
	userName = userName.toLowerCase();
	
	// search array to make sure word isn't already in the list
	if (inArray(userName, arrUserFilter_EZ))
		return false;
		
	switch (userName) {
		case 'thomw': 		alert("HAHAHAHA I DON'T THINK SO..."); return;
		case 'normality':	alert("NEED MORE BRAAAAAINS!!!"); return;
	}
		
	// add the new word to our filter list
	arrUserFilter_EZ.push(userName);
	
	// save the new filter list
	GM_setValue(sFilteredUserList_EZ, String(arrUserFilter_EZ));
	
	// update the filtered word list 
	displayFilteredUserList();
	
	// re-filter 
	doFilter();
	
	// 
	return true;
	
}


function displayFilteredWordList()
{
	displayFilterList("Word", arrWordFilter_EZ);
}


function displayFilteredUserList()
{
	displayFilterList("User", arrUserFilter_EZ);
}


function doAddButton(event) 
{
	var button = event.target;
	if (!button) {
		alert('error finding button');
		return;
	}
	
	// determine which list we're editing
	var listName = button.getAttribute('id');
	if (!listName) {
		alert("button id is blank");
		return;
	}
	listName = listName.substr(3,4);
	
	// set a reference to the input containing the new word/user being added
	var textBox = document.getElementById('add' + listName + 'Box');
	if (!textBox) {
		alert('error finding textBox');
		return;
	}
	
	// call the correct function to add the word/user to the list
	if (listName == 'Word')
		addWord(textBox.value);
	else if (listName == 'User')
		addUser(textBox.value);
	else {
		alert('Unknown listName: ' + listName);
		return;
	}

	// clear out textBox for the next word/user
	textBox.value = '';
	
}


function displayFilterList(listName, arr)
{
	// author: ThomW
	
	var list = '';
	for (var i = 0; i < arr.length; i++)
		list += '<span class="pseudolink">' + arr[i] + '</span> / ';

	// Look for an instance of the filter list in the document
	var filterDiv = document.getElementById("filtered" + listName + "s");
	
	// If filterDiv hasn't already been created, create it now.
	if (filterDiv == null) 
	{
		var filterDiv = document.createElement("div");
		filterDiv.setAttribute("id", "filtered" + listName + "s");
		
		// add filterDiv to filterBar
		filterBar.appendChild(filterDiv);
	}	

	// write filterDiv's innerHTML
	filterDiv.innerHTML = '<span class="listlabel">Filtered ' + listName + 's:</span>' + list  + '\
			<input type="text" \
				name="add' + listName + 'Box" \
				id="add' + listName + 'Box" \
				class="text" /> \
			<input type="button" \
				value="Add" \
				id="add' + listName + 'Button" \
				class="button" />';
				
	// Loop through the anchors in filterDiv and add javascript that 
	// runs on the 'onclick' event.
	var spans = filterDiv.getElementsByTagName("span");
	for (var i = 0; i < spans.length; i++)	
	{
		// don't add handling to non-pseudolinks
		if (spans[i].className.indexOf("pseudolink") == -1)
			continue;
			
		if (listName == 'Word') {
			spans[i].addEventListener('click', removeWord, true);
		}
		else if (listName == 'User') {
			spans[i].addEventListener('click', removeUser, true);
		}
		else {
			alert('Unknown listName: ' + listName);
			return;
		}
		
	}	
	
	// Add the javascript that runs in the event of an 'onclick' event.
	var button = document.getElementById('add' + listName + 'Button');
	if (!button) return;
	button.addEventListener('click', doAddButton, true);

}




function removeWord(event)
{
	// author: ThomW
	
	var word = event.target.innerHTML;

	// get the array index of the selected word
	var idx = getArrayIndex(word, arrWordFilter_EZ);
	
	// word isn't in the array
	if (idx == -1) 
	{
		alert("ERROR! Couldn't find '" + word + "' in the filtered word list");
		return;
	}
	
	// confirm word removal
	var res = confirm("Remove '" + word + "' from your Shack Comments Filter?");
	if (!res)
		return;
		
	// remove the word from the array
	arrWordFilter_EZ.splice(idx, 1);
	
	// save the new filter list 
	GM_setValue(sFilteredWordList_EZ, String(arrWordFilter_EZ));

	// alert user 
	alert("'" + word + "' removed from the comments filter list.  You must refresh the page to see the results.");
	
	// update the filtered word list 
	displayFilteredWordList();
	
	// publish updated word list
	publishWordList();
	
}


function removeUser(event)
{
	// author: ThomW
	
	var userName = event.target.innerHTML;
	
	// get the array index of the selected word
	var idx = getArrayIndex(userName, arrUserFilter_EZ);
	
	// word isn't in the array
	if (idx == -1) {
		alert("ERROR! Couldn't find '" + userName + "' in the filtered user list");
		return;
	}
	
	// confirm word removal
	var res = confirm("Remove '" + userName + "' from your Shack Comments Filter?");
	if (!res)
		return;
		
	// remove the word from the array
	arrUserFilter_EZ.splice(idx, 1);
	
	// save the new filter list 
	GM_setValue(sFilteredUserList_EZ, String(arrUserFilter_EZ));

	// alert user 
	alert("'" + userName + "' removed from the comments filter list.  You must refresh the page to see the results.");
	
	// update the filtered word list 
	displayFilteredUserList();
	
}

// ----------------------------------------------------------------------------
// WoW filter
// ----------------------------------------------------------------------------
function resetWoWFilter()
{
	// author: ThomW
	if (confirm("Click OK to activate the WoW filter."))
		boolFilterWoW = 1;
	else
		boolFilterWoW = 0;
	GM_setValue(sFilterWoW_EZ, boolFilterWoW);
}


// ----------------------------------------------------------------------------
// list upload functions for transmitting filter lists to my site
// ----------------------------------------------------------------------------


function resetPublishFilteredWords() 
{
	boolPublishFilteredWords = null;
	setPublishFilteredWords();
}
	

function setPublishFilteredWords()
{
	if (confirm("Welcome to the Shack Comments Filter Greasemonkey Script!\n\nThis script has a feature that allows you to share your filtered word list with the internet at large.  This feature is optional.  Your username and filtered word list will be transmitted to ThomW's site.  Your username will not be shown, and the data collected will be available in the form of a 'most filtered words' style list.\n\nAlso note, your filtered Author list is private and won't be transmitted by this script.  I don't think anyone wants to be known as the most-filtered Shacker.\n\nIf you're okay with sharing your list, click the OK button.  Click Cancel to disable this feature."))
		boolPublishFilteredWords = 1;
	else
		boolPublishFilteredWords = 0;
	GM_setValue(sPublishWordList_EZ, boolPublishFilteredWords);
}


function findUsername()
{
	var dbg = false;
	
	var div = document.getElementById('welcome');
	if (!div) {
		if (dbg) alert("Couldn't find div#welcome");
		return;
	}
	
	// make sure user is logged in
	if (!div.innerHTML.substr(0, 3) == "Hi ") {
		if (dbg) alert("Couldn't find 'Hi '");
		return;
	}
		
	// strip out the user link
	var anchors = div.getElementsByTagName('a');
	if (!anchors) {
		if (dbg) alert("Couldn't find anchors");
		return;
	}
		
	// get the first anchor's innerHTML and strip it,
	// which should leave us with just the user name
	str = anchors[0].innerHTML;
	str = stripHtml(str);
	
	// return the username
	return str;
}


function publishWordList()
{
	// author: ThomW
	// Uploads user's lists to my site so that I can create a 
	// database of the top blocked words/phrases.  I'm not 
	// collecting filtered users, because I dont' want to cause
	// anyone mental anguish.  ;)
	
	// exit if the user doesn't want to share their word list 
	if (!boolPublishFilteredWords)
		return;
	
	// find the user 
	var userName = findUsername();
	if (!userName) {
		alert('You have to be logged in to Shacknews to upload your filter list');
		return;
	}
	
	var length = arrWordFilter_EZ.length;
	if (boolFilterWoW) length++;
	
	// 
	var addr = 'http://www.thomwetzel.com/greasemonkey/shackCommentsFilter/stats_collect.php?update=' + length;
	for (var i = 0; i < arrWordFilter_EZ.length; i++)
		addr += '&' + i + '=' + escape(arrWordFilter_EZ[i]);
	
	if (boolFilterWoW) addr += '&' + i++ + '=' + escape('WoW');
	
	addr += '&userName=' + userName;
	
	addr += '&reverseFilter=' + boolReverseFilter;
	
	// use xmlhttpRequest to post the data 
  GM_xmlhttpRequest({ method:"GET", 
  			url: addr,
		    onload:function(result) {
		      try {
		      } catch (e) { alert('Connection failed'); }
		    }
  });
	
}


// ----------------------------------------------------------------------------
// main !
// ----------------------------------------------------------------------------

	var initStart = getTime();

	// read variables
	var sPublishWordList_EZ = 'publishFilteredWords';
	var boolPublishFilteredWords = GM_getValue(sPublishWordList_EZ, null);
	if (boolPublishFilteredWords == null) {
		setPublishFilteredWords();
	}

	var sFilterWoW_EZ = 'filterWoW';
	var boolFilterWoW = GM_getValue(sFilterWoW_EZ, false);
	
	var sReverseFilter = 'reverseFilter';
	var boolReverseFilter = GM_getValue(sReverseFilter, false);
	
	// declare and initialize filtered word list 
	var arrWordFilter_EZ = new Array();
	var sFilteredWordList_EZ = 'shackCommentsFilterList';
	arrWordFilter_EZ = loadFilterList(sFilteredWordList_EZ);
	
	// declare and initialize filtered user list 
	var arrUserFilter_EZ = new Array();
	var sFilteredUserList_EZ = 'shackUsersFilterList';
	arrUserFilter_EZ = loadFilterList(sFilteredUserList_EZ);

	GM_log('Variables loaded: ' + (getTime() - initStart));
	initStart = getTime();
		
	// style the filterBar 
	addGlobalStyle('span.pseudolink { color: #FFBB22; text-decoration: underline; cursor: pointer; } \
			div#filterBar { border-top: 1px solid #666666; background-color: #334444; line-height: 2.5em; padding-top: 0; padding-bottom: 0; padding-left: 4px; padding-right: 4px; margin-bottom: 10px; margin-left: 10px; margin-right: 10px; color: #ffffff; } \
			div#filterBar input.text {font-family: verdana; font-size: 12px; background-color: #333333; border: 1px solid #778888; color: #eeeeee; width: 7em; } \
			div#filterBar input.button {font-family: verdana; font-size: 12px; } \
			div#filterBar span.listlabel { width: 8.6em; display: block; float: left; margin-right: 0.76em; } \
			div#filterOptions { text-align: right; line-height: 1.5em; } \
			div#filterOptions input { margin-left: 10px; } \
			div#filterOptions a { text-decoration: none; } \
			div#filterOptions a:hover { text-decoration: underline; } \
			div.commentsbar { margin-bottom: 10px; }');
	
	GM_log('addGlobalStyle: ' + (getTime() - initStart));
	initStart = getTime();

	// add filterBar to the page
	var filterBar = document.createElement("div");
	filterBar.setAttribute("id", "filterBar");
	var commentsDiv = document.getElementById('comments');
	if (commentsDiv)
		commentsDiv.parentNode.insertBefore(filterBar, commentsDiv);

	// display the filtered words on the page
	displayFilteredWordList();
	displayFilteredUserList();
	
	// Create filterOptions and add them to the filterBar
	var divFilterOptions  = document.createElement("div");
	divFilterOptions.setAttribute("id", "filterOptions");
	// WoW checkbox
	var chkFilterWoW = document.createElement("input");
	chkFilterWoW.setAttribute("type", "checkbox");
	chkFilterWoW.setAttribute("name", "filterWoW");
	chkFilterWoW.setAttribute("id", "filterWoW");
	chkFilterWoW.checked = boolFilterWoW ? true : false;
	
	chkFilterWoW.addEventListener('click', function() {
				boolFilterWoW = !boolFilterWoW;
				GM_setValue(sFilterWoW_EZ, boolFilterWoW);
			}, true);
	divFilterOptions.appendChild(chkFilterWoW);
	
	// WoW label
	var lblFilterWoW = document.createElement("label");
	lblFilterWoW.innerHTML = "WoW Filter";
	lblFilterWoW.setAttribute("for", "filterWoW");
	divFilterOptions.appendChild(lblFilterWoW);
	
	// Reverse filter checkbox
	var chkReverseFilter = document.createElement("input");
	chkReverseFilter.setAttribute("type", "checkbox");
	chkReverseFilter.setAttribute("name", "reverseFilter");
	chkReverseFilter.setAttribute("id", "reverseFilter");
	chkReverseFilter.checked = boolReverseFilter ? true : false;
	chkReverseFilter.addEventListener('click', function() {
				var endis = boolReverseFilter ? 'disable' : 'enable';
				if (!confirm('Are you sure you want to ' + endis + ' Reverse Filtering?'))
					return false;
				boolReverseFilter = !boolReverseFilter;
				GM_setValue(sReverseFilter, boolReverseFilter);
			}, true);
	divFilterOptions.appendChild(chkReverseFilter);
	
	// Reverse Filter label
	var lblReverseFilter = document.createElement("label");
	lblReverseFilter.innerHTML = "Reverse Filter";
	lblReverseFilter.setAttribute("for", "reverseFilter");
	divFilterOptions.appendChild(lblReverseFilter);
	
	// publishing checkbox
	var chkPublishWords = document.createElement("input");
	chkPublishWords.setAttribute("type", "checkbox");
	chkPublishWords.setAttribute("name", "publishWords");
	chkPublishWords.setAttribute("id", "publishWords");
	chkPublishWords.checked = boolPublishFilteredWords ? true : false;
	chkPublishWords.addEventListener('click', function() {
				boolPublishFilteredWords = !boolPublishFilteredWords;
				GM_setValue(sPublishWordList_EZ, boolPublishFilteredWords);
			}, true);
	divFilterOptions.appendChild(chkPublishWords);
	
	// publishing label
	var lblPublishWords = document.createElement("label");
	lblPublishWords.innerHTML = "Publish Word List";
	lblPublishWords.setAttribute("for", "publishWords");
	divFilterOptions.appendChild(lblPublishWords);

	// stats link
	var viewStats = document.createElement("span");
	viewStats.innerHTML = ' [<a href="http://thomwetzel.com/greasemonkey/shackCommentsFilter/stats.php" target="_blank" />view</a>] ';
	divFilterOptions.appendChild(viewStats);
	
	// shackmessage ThomW link
	var smThom = document.createElement("span");
	smThom.innerHTML = '| <a href="http://www.shacknews.com/msgcenter/popup.x?person=ThomW" onclick="popup( \'ThomW\' ); return false;" title="ShackMessage Thom"><img src="/jazz/images/envelope.gif" alt="ShackMessage Thom" border="0" /> Thom</a>';
	divFilterOptions.appendChild(smThom);

	// timer display
	var spTimer = document.createElement('span');
	spTimer.setAttribute('id', 'filterBenchmark');
	spTimer.innerHTML = ' |';
	divFilterOptions.appendChild(spTimer);
	
	// add filterOptions to the filterBar
	filterBar.appendChild(divFilterOptions);
	
	GM_log('filterBar: ' + (getTime() - initStart));
	initStart = getTime();
	
	//SHUT UP DAGGAH!
	doFilter();
	
	GM_log('doFilter(): ' + (getTime() - initStart));
	initStart = getTime();

	// benchmark filter update
	spTimer.innerHTML = ' | ' + (getTime() - scriptStartTime) + 'ms';

	// log execution time
	GM_log((getTime() - scriptStartTime) + 'ms');

})();