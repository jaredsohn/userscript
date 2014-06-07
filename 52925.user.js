// ==UserScript==
// @name                Google Reader to delicious
// @namespace      		http://bylo.jp/greasemonkey
// @description       	Allows Google Reader items to be added to delicious
// @include             http://google.*/reader/*
// @include             http://*.google.*/reader/*
// ==/UserScript==

// Adapted from "del.icio.us Reader" (http://userscripts.org/scripts/show/11233).
// All bugs are mine, and not lan Oxley's.
//
// I modified the script to use original url of the feed instead of 
// google's gateway.
// 

(function() {
	
	var entries=document.getElementById("entries");
	entries.addEventListener('DOMNodeInserted',
		function(event) {nodeInserted(event); },
		true);
        
	/*
    function dumpNode(node, level, number) {
		var text = "";
		text += level + "." + number;
		for (var index = 0; index < level; index++) {
			text += "  ";
		}
		text += "<" + node.tagName;
		if (node.className != null)
			text += " class=" + node.className;
		text += ">";
		if (node.nodeValue != null)
			text += node.nodeValue;
			
		GM_log(text);
		
		for (var index = 0; index < node.childNodes.length; index++) {
			var child = node.childNodes[index];
			dumpNode(child, level + 1, index);
		}
    }
	*/
	
	function nodeInserted(event){	
		if (event.target.tagName=="DIV"){
			try {
				if (event.target.className!=""){
					var linkbar;
					if (event.target.className=="entry-actions"){
						linkbar=event.target;
					}
					else if (event.target.firstChild &&
						(event.target.firstChild.className=="card" ||
						 event.target.firstChild.className=="card card-common")){
						 var card_common = event.target.firstChild;
						 var card_actions = card_common.childNodes[2];
						 var entry_actions = card_actions.firstChild;
						linkbar = entry_actions;
					}
					else {
						return;
					}
					var deliciousLink = document.createElement("span");
					deliciousLink.className="item-star star link unselectable";
					deliciousLink.innerHTML="Add to delicious";
					deliciousLink.addEventListener("click", postBookmark, false);
					linkbar.appendChild(deliciousLink);
				}
			}
			catch(e){
				GM_log(e);
			}
		}
	}
	
	function postBookmark(event) {
		var entry_actions = event.target.parentNode;
		var card_actions = entry_actions.parentNode;
		var card = card_actions.parentNode;
		var card_content = card.firstChild;
		var entry_container = card_content.firstChild;
		var entry_main = entry_container.firstChild;
		var entry_title = entry_main.childNodes[1];
		var link = entry_title.firstChild;
//dumpNode(entry_title,0,0);
		openDelicious(link.href, link.firstChild.nodeValue);
	}

	function openDelicious(url, title) {
		GM_xmlhttpRequest(
			{
			method: 'HEAD',
			url: url,
			onload: function(response) {
					var deliciousUrl =
						'http://delicious.com/save?jump=yes&url=' +
						encodeURIComponent(response.finalUrl) +
						'&title=' + encodeURIComponent(title);

					var deliciousWin = window.open(deliciousUrl, "deliciousWindow");
					deliciousWin.focus();
				}
			});
	}
})();
