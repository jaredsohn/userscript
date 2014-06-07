// Weewar Unpreferred List
// version 0.1
// updated 2008-01-06
// Copyright (c) 2008, spadequack

// ==UserScript==
// @name Weewar Unpreferred List v0.1
// @description Allows you to keep an unpreferred player list (locally saved) and shows whether a player is unpreferred or WWPA greylisted on the player's profile.
// @namespace userscripts.org
// @include http://*.weewar.com/user/*
// @include http://weewar.com/user/*
// ==/UserScript==

var greyListIDs = new Array();

// get unpreferred list data stored locally
var unpreferredLength = GM_getValue('unpreferredLength', 0);
var unpreferredIDs = new Array(unpreferredLength);
for (var index = 0; index < unpreferredLength; index++) {
	unpreferredIDs[index] = GM_getValue('' + index);
}

// Alert the user if the GM_xmlhttpRequest function is not available
if (!GM_xmlhttpRequest) 
{
	alert('Please upgrade to the latest version of Greasemonkey.');
	return;
}

// Get greylist data 
GM_xmlhttpRequest(
{
	method: 'GET',
	url: 'http://weewar.purepistos.net/wwpa/greylist',
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',},
	onload: function(responseDetails)
	{
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,"application/xml");

		for(var greyListIndex = 0; 3*greyListIndex < dom.getElementsByTagName('td').length; greyListIndex++) {
			greyListIDs[greyListIndex] = dom.getElementsByTagName('td')[greyListIndex*3+1].firstChild.nodeValue;
		}
		
	}
});

// first need to find the index of the <li> element that lists the "Unique ID" because this changes 
// depending on if you are looking at a profile of a prefered player or not (adapted from Pluto's code)
var uniqueID;
var idIndex;
for (var element = 0; element < document.getElementsByTagName('li').length; element++) {
	if (document.getElementsByTagName('li')[element].innerHTML.substr(0,6) == 'Unique') {
		idIndex = element;
		uniqueID = document.getElementsByTagName('li')[element].childNodes[1].firstChild.nodeValue;
	}
}

// work around for getElementById('preferredControls')
// only make boxes if there is a preferredControls box (which is always, except for when viewing your own profile)
var elems = document.evaluate('//*[@id="preferredControls"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (elems.snapshotItem(0)) {

	// add styles for boxes
	addGlobalStyle("div.sideBox {border: 1px solid #DDDDDD; color: #333333; margin-bottom: 1em; padding: 0px 1em;}"); // copied from style of #preferredControls
	addGlobalStyle("div.sideBox span {background: transparent url(http://img242.imageshack.us/img242/773/thumbdownuj9.png) no-repeat scroll left top; display: block; font-size: 1.4em; padding-left: 23px; }"); // partially copied from style of #preferredControls.isPreferred span
	addGlobalStyle("a.unpreferred {display: block; font-size: 1em; font-weight: normal; margin-top: 0.5em;"); // copied from style of #preferredControls.isPreferred a
	addGlobalStyle("a.notUnpreferred {display: inline; font-size: 1.2em; font-weight: bold;"); // copied from style of #preferredControls

	// create box above stats box on profile
	var statsBox = document.getElementsByTagName('li')[idIndex].parentNode;
	var unpreferredDiv = document.createElement('div');
	unpreferredDiv.setAttribute('id', "unpreferredControls");
	unpreferredDiv.setAttribute('class', "sideBox");
	statsBox.parentNode.insertBefore(unpreferredDiv, statsBox);

	var p = document.createElement('p');
	var a = document.createElement('a');
	a.setAttribute('href', "#");

	// check if this player is on unpreferred list
	if (isIDInList(unpreferredIDs)) {
		var span = document.createElement('span');
		span.innerHTML = "Unpreferred player";
		p.appendChild(span);
		a.setAttribute('class', "unpreferred");
		a.innerHTML = "Remove from your unpreferred players list?";
		a.addEventListener("click", removeUnpreferred, true);
	} else {
		a.setAttribute('class', "notUnpreferred");
		a.innerHTML = "Add to your unpreferred players list?";
		a.addEventListener("click", addUnpreferred, true);
	}
	p.appendChild(a);
	unpreferredDiv.appendChild(p);
	
} // end if there is a preferredControls box

// use setTimeout to wait for the above GM_xmlhttpRequest to finish, otherwise the program will carry on 
// and not have the necessary greylist data
window.setTimeout(function() {

	if (isIDInList(greyListIDs)) {
		greyListDiv = document.createElement('div');
		greyListDiv.setAttribute('id', "greyList");
		greyListDiv.setAttribute('class', "sideBox");
		var p2 = document.createElement('p');
		var span2 = document.createElement('span');
		span2.innerHTML = '<a href="http://weewar.purepistos.net/wwpa/greylist"><div style="color: #ff0000">WWPA Greylisted Player</div></a>';
		p2.appendChild(span2);
		greyListDiv.appendChild(p2);
		statsBox.parentNode.insertBefore(greyListDiv, statsBox.parentNode.firstChild.nextSibling.nextSibling);
	}
	
}, 2000); // wait 2 sec for the first GM_xmlhttpRequest to finish - interferes with format of weewar spy though =\


// borrowed from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function isIDInList(listIDs) {
	for (var index = 0; index < listIDs.length; index++) {
		if (uniqueID == listIDs[index]) {
			return true;
		}
	}
	return false;
}

// Add Greasemonkey menu commands for adjusting unpreferred list
GM_registerMenuCommand('Weewar - Clear unpreferred list', clearUnpreferred);
GM_registerMenuCommand('Weewar - Pop up unpreferred list (wait 3s)', popUpUnpreferred);

function addUnpreferred() {
	for (var index = 0; index < unpreferredLength; index++) {
		if (unpreferredIDs[index] == uniqueID) {
			alert("Player with ID " + uniqueID + " already on unpreferred list.");
			return;
		}
	}
	GM_setValue('' + unpreferredLength, uniqueID);
	GM_setValue('unpreferredLength', unpreferredLength + 1);
	location.reload();
}

function removeUnpreferred() {
	for (var index = 0; index < unpreferredLength; index++) {
		if (unpreferredIDs[index] == uniqueID) {
			while(index < unpreferredLength - 1) { // shift everything down by 1
				GM_setValue(index, unpreferredIDs[index+1]);
				index++;
			}
			GM_setValue(index, 0);
			GM_setValue('unpreferredLength', index); // reduces unpreferredLength by 1
			location.reload();
			break;
		}
	}
}

function clearUnpreferred() {
	GM_setValue('unpreferredLength', 0); // data still stored around though, not sure how to delete these
	alert("Unpreferred list cleared.");
	location.reload();
}

function popUpUnpreferred() {
	if (unpreferredLength == 0) {
		alert("Unpreferred list is empty.");
		return;
	}
	
	var string = '';
	
	// Get names of players based on their IDs using the API. 
	// NOTE: API lists only players that have signed on in the last seven days, so if listed player hasn't signed on in the last week, 
	// an exception will take the place of the name. 
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://weewar.com/api1/users/all',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',},
		onload: function(responseDetails)
		{
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
			
			for (var index = 0; index < unpreferredLength; index++) {
				var lookFor = '//*[@id="' + unpreferredIDs[index] + '"]';
				var elem = dom.evaluate(lookFor, dom, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var name;
				if (elem.snapshotItem(0)) {
					name = elem.snapshotItem(0).attributes.getNamedItem('name').nodeValue;
				} else {
					name = '*API error // user has not signed on in the last 7 days.*';
				}
				string += (index+1) + '. ' + name + " id: " + unpreferredIDs[index] + '\n';
			}
		}
	});
	
	window.setTimeout(function()
	{
		alert('Unpreferred list:\n' + string);
	}, 3000); // wait 3 sec for the GM_xmlhttpRequest to finish
}