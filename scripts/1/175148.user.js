// ==UserScript==
// @name		Twitch.TV Custom Emotes
// @author		Hedja
// @icon		http://i.imgur.com/Lkl0EDA.png
// @description		Allows you to use custom emotes on your channel chat.
// @version		0.61
// @date		2013-08-06
// @updateURL		http://userscripts.org/scripts/source/175148.user.js
// @namespace		TwitchTVCustomEmotes_Hedja
// @include		*.twitch.tv/*
// ==/UserScript==

var emoteMap = [];
window.addEventListener ("load", setup, false);
var chatLineList = document.getElementById('chat_line_list');

chatLineList.addEventListener("DOMNodeInserted", setup, false);

function setup(event) {
	if(event.target.firstElementChild.innerHTML.indexOf('Welcome to the chat room!') == -1) return;

	//console.log('Setting up');
	createEmoteMap();
	chatLineList.removeEventListener("DOMNodeInserted", setup, false);
	chatLineList.addEventListener("DOMNodeInserted", chatAdded, false);
	parseExistingChat(); //Combat page load delay
	//console.log('Setup complete');
}

function createEmoteMap() {
	var elements = document.getElementsByTagName('h3');
	var text;
	//console.log(elements);
	for(var i = 0; i < elements.length; i++) {
		//console.log(elements[i]);
		if(elements[i].innerHTML == 'Emotes\n') {
			//console.log(elements[i].parentElement);
			//console.log(elements[i].parentElement.children);
			var children = elements[i].parentElement.children;
			//console.log(children[children.length-1].firstElementChild);
			text = children[children.length-1].firstElementChild.innerHTML;
			break;
		}
	}
	//console.log(text);
	var lines = text.split('\n');
	for(var i = 0; i < lines.length; i++) {
		var tokens = lines[i].split(',');
		emoteMap[tokens[0]] = tokens[1];
	}
	
	//console.log('Map created');
	//console.log(emoteMap['nid']);
}

function chatAdded(event) {
	//console.log(event);
	var chatLineElement = event.target;
	var chatText;
	if(chatLineElement.className != 'chat_line') {
		chatLineElement = chatLineElement.getElementsByClassName('chat_line')[0];
	}
	chatText = chatLineElement.innerHTML;
	//console.log("Initial Text: " + chatText);
	
	var leftIndex;
	var addedEmote = false;
	for(var i = 0; i < chatText.length; i++) {
		if(chatText.charAt(i) == ':') {
			if(leftIndex != null) {
				//console.log("Found Possible Emote");
				var token = chatText.slice(leftIndex, i);
				token = removeWBRIfAny(token);
				//console.log("\t Token : " + token);
				if(emoteMap[''+token]) {
					//console.log("Replacing Emote " + token);
					var imgElement = createImageElement(token);
					chatText = chatText.substr(0, leftIndex-1)
						+ imgElement
						+ chatText.substr(i+1);
					//console.log("Replaced to " + chatText);
					
					i = leftIndex + imgElement.length - 2;
					//console.log("Remaining Text : " + chatText.substr(i+1));
					
					addedEmote = true;
					leftIndex = null;
					continue;
				}
			}
			leftIndex = i+1;
		}
	}
	if(addedEmote) {
		//console.log("Text has been modified");
		chatLineElement.innerHTML = chatText;
	}
	//console.log("New Text: " + chatText);
}

function removeWBRIfAny(token) {
	var i;
	while((i = token.indexOf('<wbr>')) != -1) {
		token = token.substr(0,i) + token.substr(i+5);
	}
	return token;
} 

function createImageElement(token) {
	return '<img src="'+emoteMap[token]+'" style="height:32px"></img>';
}

function parseExistingChat() {
	//TODO refactor reused code
	//console.log('Parsing Existing Chat');
	var chatList = document.getElementById('chat_line_list');
	var chatLines = chatList.getElementsByClassName('chat_line');
	for(var i = 0; i < chatLines.length; i++) {
		var chatLineElement = chatLines[i];
	
		var chatText = chatLineElement.innerHTML;
		//console.log("Existing Text: " + chatText);
		
		var leftIndex;
		var addedEmote = false;
		for(var i = 0; i < chatText.length; i++) {
			if(chatText.charAt(i) == ':') {
				if(leftIndex != null) {
					//console.log("Found Possible Emote");
					var token = chatText.slice(leftIndex, i);
					token = removeWBRIfAny(token);
					console.log("\t Token : " + token);
					if(emoteMap[''+token]) {
						//console.log("Replacing Emote " + token);
						var imgElement = createImageElement(token);
						chatText = chatText.substr(0, leftIndex-1)
							+ imgElement
							+ chatText.substr(i+1);
						//console.log("Replaced to " + chatText);
						
						i = imgElement.length + leftIndex;
						//console.log("Remaining Text : " + chatText.substr(i));
						
						addedEmote = true;
						leftIndex = null;
						continue;
					}
				}
				leftIndex = i+1;
			}
		}
		if(addedEmote) {
			//console.log("Existing Text has been modified");
			chatLineElement.innerHTML = chatText;
		}
		//console.log("New Existing Text: " + chatText);
	}
	//console.log('Finished Parsing Existing Chat');
}