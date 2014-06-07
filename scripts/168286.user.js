// ==UserScript==
// @name       Feedly unread counter
// @namespace  yabes.3ms.fr.nf
// @version    1.0
// @description Show unread articles in title
// @match      http://www.feedly.com/*
// @copyright  2013+, Yabes
// ==/UserScript==

var element = document.getElementById("latesttab_header");
var target = document.getElementById("feedlyTabs");

function addUnread() {
	if((element = document.getElementById("latesttab_header")) != null) {
		var unread = parseInt(element.childNodes[1].innerHTML);
		if(unread > 0) {
			console.log('unread:'+unread);
			if (document.title.search(']') == -1) {
				document.title = "["+unread+"] " + document.title;
			} else {
				document.title = document.title.replace(/\[.*\] /gi, "["+unread+"] ");
			}
			console.log(document.title);
		}
	}
}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
  	setTimeout(function(){addUnread();}, 500);
  });    
});

var config = { 
   childList: true, 
   attributes: true, 
   characterData: true, 
   subtree: true, 
   attributeOldValue: true, 
   characterDataOldValue: true, 
   attributeFilter: true
};

function loadObserver() {
	if((target = document.getElementById("feedlyTabs")) == null) {
		setTimeout(function(){loadObserver();}, 1000);
	} else {
		observer.observe(target, config);
		addUnread();
	}
}

loadObserver();

console.log('Feedly unread counter loaded');

setTimeout(function(){addUnread();}, 500);
