// ==UserScript==
// @name		Reddit Linker
// @version		1.02
// @namespace	http://ictinus.com/rl/
// @description	Double click on a word and you will be presented a /r/word link. 
// @include 	http://*.reddit.com/*
// ==/UserScript==

// Author: Ictinus
// Released: v1.00 20 January 2011
// Updated: v1.01 25 January 2011, change clientX/Y to pageX/Y.
// Updated: v1.02 25 January 2011, added some rounded corners and shadow.

var redditLinker = {
	addGlobalStyle : function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	init: function () {
	var theDiv = document.createElement('div');
	theDiv.className = "redditLinker";
	theDiv.id = "redditLinker";
	var theLink = document.createElement('a');
	theLink.href = "#";
	theLink.className = "redditLink";
	theLink.id = "redditLink";
	theDiv.appendChild(theLink);

 	document.body.appendChild(theDiv);
	document.body.addEventListener('click', function () {
			document.getElementById('redditLinker').style.display = "none";
		}, false);
			
	document.body.addEventListener('dblclick', function (e) {
			e.stopPropagation();
			var strSelectedText = document.getSelection();
			var strURL = location.protocol + "//" + location.host + "/r/" + strSelectedText;
			var theDiv = document.getElementById('redditLinker');
			var theLink = theDiv.firstChild;
			theLink.href = strURL;
			theLink.innerHTML = "/r/" + strSelectedText;
			theDiv.style.top = e.pageY + "px";
			theDiv.style.left = e.pageX + "px";
			theDiv.style.display = "block";
		}, false);
	}
}	
if (document.body) {
	redditLinker.addGlobalStyle(' \
		div.redditLinker {display:none; position: absolute; background: white; padding:4px; border:1px solid orangeRed; \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888; \
			-webkit-border-radius: 4px; \
			-moz-border-radius: 4px; \
	 	} \
		div.redditLinker span { padding:2px; } a.redditLink {}')
	redditLinker.init();
}
