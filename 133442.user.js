// ==UserScript==
// @name        Identi.ca Autocomplete
// @namespace   org.dmaggot
// @description Autocomplete feature for Identica (and probably other StatusNet installations)
// @include     http://identi.ca/*
// @include     http://www.identi.ca/*
// @version     1
// ==/UserScript==

var servicesURL = '/api/statusnet/app/service/';

var friendsLoaded = false;
var friends = [];

var groupsLoaded = false;
var groups = [];

var suggestionsID = 'identica_autocomplete_suggestions';
var suggesting = false;
var suggestedList = [];
var suggestionSelected = -1;

function Entity()
{
	this.name = null;
	this.username = null;
}


function isOnPostingPage()
{
	return (document.getElementsByName('status_textarea').length > 0) && (document.getElementsByClassName('profile_block_name').length > 0);
}

function getService(nick)
{
	var serviceRequest = new XMLHttpRequest();
	
	serviceRequest.onreadystatechange = function () {
		if (serviceRequest.readyState == 4)
		{
			var serviceDOM = serviceRequest.responseXML;
			var collections  = serviceDOM.getElementsByTagName('collection');
			
			for(var i in collections)
			{
				var href = collections[i].getAttribute('href');
				
				if(href.indexOf('subscriptions') > -1)
					getFriends(href);
					
				if(href.indexOf('memberships') > -1)
					getGroups(href);
			}
		}
	};
	
	serviceRequest.open('GET', servicesURL + nick + '.xml', true);
	serviceRequest.send();
}

function getFriends(friendsURL)
{
	unsafeWindow.console.log("Getting friends from " + friendsURL);
	processFeed(friendsURL, friends, '@', function() { friendsLoaded = true; });
}

function getGroups(groupsURL)
{
	unsafeWindow.console.log("Getting groups from " + groupsURL);
	processFeed(groupsURL, groups, '!', function() { groupsLoaded = true; });
}

function processFeed(feedURL, entities, usernamePrefix, finishCallback)
{
	var friendsRequest = new XMLHttpRequest();
	
	friendsRequest.onreadystatechange = function() {
		if(friendsRequest.readyState == 4)
		{
			// Nasty stuff we do because the responseXML is invalid
			var usernameRE = /<poco:preferredUsername>([^<]+)<\/poco:preferredUsername>/g;
			var displayNameRE = /<poco:displayName>([^<]+)<\/poco:displayName>/g;
			var userName;
			
			while((userName = usernameRE.exec(friendsRequest.responseText)) != null)
			{
				var displayName = displayNameRE.exec(friendsRequest.responseText);
				var e = new Entity();
				
				e.name = displayName[1];
				e.username = usernamePrefix + userName[1];
				
				entities.push(e);
			}
			
			var linksRE = /<link[^>]+>/g;
			var currentLinkMatch;
			var last = true;
			
			while((currentLinkMatch = linksRE.exec(friendsRequest.responseText)) != null)
			{
				if(currentLinkMatch[0].indexOf("rel=\"next\"") > -1)
				{
					var href = /href="([^"]+)"/.exec(currentLinkMatch[0]);
					
					processFeed(href[1], entities, usernamePrefix, finishCallback);
					last = false;
				}
			}
			
			if(last)
			{
				finishCallback();
			}
		}
	};
	
	friendsRequest.open('GET', feedURL, true);
	friendsRequest.send();
}

// UI Area

function suggest(postingTextArea)
{
	var currentText = postingTextArea.value;
	var listToFilter = null;
	var currentCandidate = "";
	
	if (currentText.lastIndexOf(' ') < currentText.lastIndexOf('@'))
	{
		currentCandidate = currentText.substring(currentText.lastIndexOf('@'));
		listToFilter = friends;
	}
	else if (currentText.lastIndexOf(' ') < currentText.lastIndexOf('!'))
	{
		currentCandidate = currentText.substring(currentText.lastIndexOf('!'));
		listToFilter = groups;
	}
	
	if ((currentCandidate.length > 1) && (listToFilter != null))
	{
		displaySuggestions(postingTextArea, listToFilter, currentCandidate);
		suggesting = true;
	}
	else if (suggesting)
	{
		cancelSuggestions();
	}
}

function displaySuggestions(postingTextArea, list, filter)
{
	var suggestionsNode = document.getElementById(suggestionsID);
	
	if (suggestionsNode == null)
	{
		suggestionsNode = document.createElement('div');
		suggestionsNode.id = suggestionsID;
		
		suggestionsNode.style.position = "absolute";
		suggestionsNode.style.top = postingTextArea.offsetHeight + "px";
		suggestionsNode.style.width = postingTextArea.offsetWidth + "px";
		suggestionsNode.style.backgroundColor = "white";
		suggestionsNode.style.zIndex = "100";
		
		postingTextArea.parentNode.appendChild(suggestionsNode);
	}
	
	while (suggestionsNode.children.length > 0)
	{
		suggestionsNode.removeChild(suggestionsNode.children[0]);
	}
	
	var currentSuggestedUsername = null;
	
	if ((suggestionSelected > -1) && (suggestedList.length > suggestionSelected))
	{
		currentSuggestedUsername = suggestedList[suggestionSelected].username;
	}
	
	suggestedList = [];
	suggestionSelected = -1;
	
	for (var i in list)
	{
		if (list[i].username.indexOf(filter) == 0)
		{
			var newSuggestion = document.createElement('div');
			
			newSuggestion.innerHTML = "<p><strong>" + list[i].username + "</strong> " + list[i].name + "</p>";
			newSuggestion.style.margin = "3px";
			
			if (list[i].username == currentSuggestedUsername)
			{
				suggestionSelected = suggestedList.length;
				newSuggestion.style.background = "silver";
			}
			
			suggestionsNode.appendChild(newSuggestion);
			suggestedList.push(list[i]);
		}
	}
	
	if (suggestionSelected == -1)
	{
		suggestionsNode.children[0].style.background = "silver";
	}
}

function cancelSuggestions()
{
	var suggestionsNode = document.getElementById(suggestionsID);
	
	suggestionsNode.parentNode.removeChild(suggestionsNode);
	suggestedList = [];
	suggestionSelected = -1;
}

function modifySuggestions(e)
{
	if (suggesting)
	{
		var postingTextArea = document.getElementsByName('status_textarea')[0];
		
		switch (e.keyCode)
		{
			case 38:
				if (suggestionSelected == -1)
					suggestionSelected = 0;
					
				if (suggestionSelected > 0)
				{
					suggestionSelected--;
					suggest(postingTextArea);
				}
				
				e.preventDefault();
			break;
			case 40:
				if (suggestionSelected == -1)
					suggestionSelected = 0;
					
				if (suggestionSelected < (suggestedList.length - 1))
				{
					suggestionSelected++;
					suggest(postingTextArea);
				}
				
				e.preventDefault();
			break;
			case 9:
				if (suggestionSelected == -1)
					suggestionSelected = 0;
					
				var currentSuggestedUsername = suggestedList[suggestionSelected].username;
				var currentText = postingTextArea.value;
				
				postingTextArea.value = currentText.substring(0, currentText.lastIndexOf(currentSuggestedUsername[0])) + currentSuggestedUsername + " ";
				cancelSuggestions();
				e.preventDefault();
			break;
			default:
			break;
		}
	}
}

if(isOnPostingPage())
{
	var postingTextArea = document.getElementsByName('status_textarea')[0];
	var nickURL = document.getElementsByClassName('profile_block_name')[0].getElementsByTagName('a')[0].href;
	var nick = nickURL.substring(nickURL.lastIndexOf('/') + 1);
	
	getService(nick);
	postingTextArea.addEventListener("input", function() { suggest(postingTextArea); });
	postingTextArea.addEventListener("keypress", modifySuggestions);
}