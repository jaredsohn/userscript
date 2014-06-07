// ==UserScript==
// @name           Kongregate PM Notifier for Chrome
// @namespace      tag://kongregate
// @description    Blinks the favicon and prepends an unread count when the chat window loses focus and you receive PMs.
// @include        http://www.kongregate.com/games/*
// @author         MrSpontaneous
// @version        1.0
// @date           01/03/2010
// ==/UserScript==
// You cannot modify or redistribute this script without permission.

// Written by MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous) 01/03/2010

function init(){

	var dom;

	try{
		if(unsafeWindow && unsafeWindow.holodeck){
			dom = unsafeWindow;
		} else {
			dom = this;
		}
	}catch(e){
		dom = this;
	}

	dom._animatedFav = false;
	dom._pmCount = 0;
	dom._baseTitle = document.title;
	dom._blurred = false;
 
	dom._oldblur = dom.onblur;
	dom._oldfocus = dom.onfocus;
	
	dom.onblur = function() {
		dom._blurred = true;
		if (dom._oldblur) {
			dom._oldblur();
		}
	}
	
	dom.onfocus = function() {
		dom._blurred = false;
		dom.pmReset();
		if (dom._oldfocus) {
			dom._oldfocus();
		}
	}
	
	dom.pmReset = function() {
		if (dom._animatedFav) {
			dom.toggleFavLink();
		}
		dom._pmCount = 0;
		document.title = dom._baseTitle;
	}
 
	dom.createFavLink = function(attr) {
		var link = document.createElement("link");
		link.type = attr['type'];
		link.rel = attr['rel'];
		link.href = attr['href'];
		return link;
	}

	dom.toggleFavLink = function() {
		var head = document.getElementsByTagName("head")[0];
		var links = head.getElementsByTagName("link");
		for (var i=0; i<links.length; i++) {
		  var link = links[i];
		  if (link.rel=="shortcut icon") {
			head.removeChild(link);
		  }
		}
		if (dom._animatedFav) {
			head.appendChild(dom.createFavLink(dom._staticFavLinkAttr));
		}
		else {
			head.appendChild(dom.createFavLink(dom._animatedFavLinkAttr));
		}
		dom._animatedFav = !dom._animatedFav;
	}
	dom._staticFavLinkAttr = {'rel':'shortcut icon',  'href':'/favicon.ico', 'type':'image/x-icon'};
	dom._animatedFavLinkAttr = {'rel':'shortcut icon', 'href':'data:image/gif;base64,R0lGODlhIAAgAPQAAGYAAJkAAJkAM5krAJkrM5krZplVM5lVZswrM8xVM8xVZsyAZsyAmcyqmcyqzP+qzMzVzP/VzP/V////zP///6usrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAlkABUAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIAAgAAAF6SARjGRpnmiqrqhAinAQi6MwzHJOB0rk/8DIYzBiBI/DkYHCbDqZtMZzSqEpqM8o1kkjbJs0xpeJICkakmljoSidqRHG4rSYFlDXZ4QAQNWfCSdSTw0uKAB/TgcmYoQsjU6BJBBTbSyJTYsyD08QCH2PU4EEEU8POyx5XASUThMsJphMDBNUmrABkGNQuAGyYxG4iFh7qk0OuLrHRAGlT3OXUw8lXlMGoU/XJcoUEtFPliWtThArv6gjCFQMKAQE3A3oBIOEqNVbwSO/eju7VruW7m0ZMWzMNTm7GshxkJDbrocQI0qc2CQEACH5BAhkAAAALAAAAAAgACAAh5kAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiOAAMIHEiwoMGDCBMqXMiw4UEAECNKhDhwokWKFS9KzKgxIsGOHgWCDClyJEeQBTs+VLlyI8KLCi22nLhQZkqYNWl+tMmQZwCcDXkCDapzKNGRGB3+REryKFMASlkaTajxZNOYPpfqzOlyZ9aZSb1ufTlWbFeDVdGmNTsUKVufbq22Nan1qd27ePPq3WsxIAA7', 'type':'image/gif'};
	var CDialogue = dom.ChatDialogue;

	if (CDialogue){
	
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		
		CDialogue.prototype.new_private_message = function() {
			if (dom._blurred) {
				dom._pmCount++;
				if (!dom._animatedFav) {
					dom.toggleFavLink();
				}
				document.title = "[" + dom._pmCount + "] " + dom._baseTitle;
			}				
		}
		
		if(!CDialogue.prototype.showReceivedPM_notifier){
			CDialogue.prototype.showReceivedPM_notifier = CDialogue.prototype.receivedPrivateMessage;
			CDialogue.prototype.receivedPrivateMessage = function(a){
				if (a.data.success){
					this.new_private_message();
				}
				this.showReceivedPM_notifier(a);
			}
		}
	}
};

setTimeout(init, 600);
