// ==UserScript==
// @name LL Ketchup
// @namespace shaldengeki
// @description Helps you catch up in topics by searching for phrases in a user-defined wordlist.
// @include http://boards.endoftheinter.net/showmessages.php?board=*&topic=*#m*
// @include https://boards.endoftheinter.net/showmessages.php?board=*&topic=*#m*

// ==/UserScript==

/*
	Lotta this is lifted straight from headbanger's Autoscroll script, so thanks to him for that.
*/

var scrollSpeed = 50; //How fast the page scrolls. Higher = faster. 10 is default.
var bottomDistance = 200; //The max distance from the bottom of the page for this to scroll. 200 is default.
var searchStrings = "shaldengeki||llanimu||Tomoyo||darkinsanity||entrO||Tiko||Kiffe||hollow life"; //List of search strings, each separated by a ||. There will be an easier way to input these in the future.

function getElementsByClass(searchClass,node,tag) {
	var classElements = [];
	if (node === null) {
		node = document;
	}
	if (tag === null) {
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(document.location.href);
  if (results === null) {
    return "";
  } else {
    return results[1];
  }
}

function getTotalPages() {
	var totalPages = document.getElementById('u0_2').getElementsByTagName('span')[0].innerHTML;
	return totalPages;
}

function scrollPage(newHeight) {
//	window.scrollBy(0,newHeight);
	if (newHeight > scrollSpeed) {
		window.scrollBy(0, scrollSpeed);
		window.setTimeout(scrollPage(newHeight - scrollSpeed), 10);
	} else {
		window.scrollBy(0, newHeight);
	}
}

function updateSearchStrings(newSearchString) {
	GM_setValue('LLKetchup', newSearchString);
}

function getSearchStrings() {
	var searchString = GM_getValue('LLKetchup', -1);
	if ( searchString == -1 ) {
		searchString = [];
		return searchString;
	} else {
		return searchString.split("||");
	}
}

var regexS = "(^(#m))*#m.*";
var regex = new RegExp(regexS);
var originalMessageID = parseInt(regex.exec(document.location.href)[0].substr(2));

if (gup('page')) {
	var thisPage = parseInt(gup('page'));
} else {
	var thisPage = 1;
}

function highlightMessage(messageObject) {
	//Higlight a message once a match from our wordlist has been found, and give user a chance to respond.
	for (var j = 0; j < wordArray.length; j++) {
		messageObject.innerHTML=messageObject.innerHTML.replace(regExpArray[j],"<span style='background-color: yellow;'>$1</span>");
	}
	var messagetopbar = getElementsByClass('message-top', messageObject, 'div')[0];
	var catchupRegex = new RegExp('<a href="\#ketchup">Catch Up<\/a>');
	if (!catchupRegex.test(messagetopbar.innerHTML)) {
		//if we don't already have a catch up link in the post header, append one with the current messageID.
		var messageObjectID = parseInt(messageObject.id.substr(1));
		var nextpostlink=document.createElement("span");
		nextpostlink.className = "ketchup";
		nextpostlink.addEventListener("click", function() { checkPage(messageObjectID); }, true);
		nextpostlink.innerHTML = " | <a href='#ketchup'>Catch Up</a>";
		messagetopbar.appendChild(nextpostlink);
	} else {
		//if we already do, point the eventlistener towards the right messageID.
		var messageObjectID = parseInt(messageObject.id.substr(1));
		var nextpostlink=getElementsByClass('ketchup', messageObject, 'span')[0].getElementsByTagName('a')[0];
		nextpostlink.removeEventListener("click", function() { checkPage(0); }, true);			
		nextpostlink.addEventListener("click", function() { checkPage(messageObjectID); }, true);	
	}
}

function checkPage(currentMessageID) {
	// loop over all the messages and pages, looking for words in our wordlist.
	var totalMessageTops = getElementsByClass('message-container', document.getElementById('u0_1'), 'div');
	var newMssgHeight = 0;
	var postFound = false;
	var sigregex = new RegExp("---<br>((\n).*?)*<\/td>", "gm");
	for (var i = 0; i < totalMessageTops.length; i++) {
		//get information about this message and check to see if we need to check it.
		thisMessageID = parseInt(totalMessageTops[i].id.substr(1));
		
		if (thisMessageID > currentMessageID) {
			//keep track of how far down the page we are, so we can scroll if need be.
			if (totalMessageTops[i].previousSibling) {
				newMssgHeight += totalMessageTops[i].previousSibling.clientHeight;
			}

			//check this message's text using our word array.
			if (sigregex.test(totalMessageTops[i].innerHTML)) {
				thisMessageText = totalMessageTops[i].innerHTML;
			} else {
				thisMessageText = totalMessageTops[i].innerHTML.substr(0,totalMessageTops[i].innerHTML.search(sigregex));
			}
			for (var j = 0; j < regExpArray.length; j++) {
				if (regExpArray[j].test(thisMessageText)) {
					//match found. scroll to this message and give the user a chance to reply to it.
					postFound = true;
					highlightMessage(totalMessageTops[i]);
					scrollPage(newMssgHeight);					
					return;
				}
			}
		}
	}

	if (!postFound) {
		//go to the next page, if there is one.
		var totalPages = getTotalPages();
		if (totalPages > thisPage) {
			if (gup('page')) {
				var newUrl = document.location.href.replace(/#[A-Za-z0-9]+/gi, '').replace(/page=[0-9]+/gi, 'page=' + (thisPage + 1) + "#m0");
			} else {
				var newUrl = document.location.href.replace(/#[A-Za-z0-9]+/gi, '') + "&page=2#m0";
			}
			document.location = newUrl;
		} else {
			//if there isn't one, scroll to the last message.
			scrollPage(document.body.clientHeight);
		}
	}
}
updateSearchStrings(searchStrings);
var wordArray = getSearchStrings();
var regExpArray = [];
for (var j = 0; j < wordArray.length; j++) {
	regExpArray[j] = new RegExp("("+wordArray[j]+")", "gi");
}
// append a link to catch up on the currently-viewed messsage.
var nextpostlink=document.createElement("span");
nextpostlink.className = "ketchup";
nextpostlink.addEventListener("click", function() { checkPage(originalMessageID); }, true);
nextpostlink.innerHTML = " | <a href='#ketchup'>Catch Up</a>";
var messagetopbar = getElementsByClass('message-top', document.getElementById('m'+originalMessageID), 'div')[0];
messagetopbar.appendChild(nextpostlink);