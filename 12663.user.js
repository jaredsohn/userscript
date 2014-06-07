// ==UserScript==
// @name           MySpace MSPLinks Translator
// @namespace      Adrian232
// @description    Translates msplinks.com links on myspace pages to their original links, so you can see where you're going.
// @source         http://www.eternalbloodlust.com/gmscripts/myspacemsplinkstranslator.user.js
// @identifier     http://www.eternalbloodlust.com/gmscripts/myspacemsplinkstranslator.user.js
// @creator        Adrian (myspace.com/adrian232)
// @version        1.1.0
// @date           2008-2-27
// @include        *myspace.com/*
// ==/UserScript==
// Created by Adrian: http://www.myspace.com/adrian232

// Set to false if you don't want it to change the actual link
var change_link     = true;

// Set to true if you want a tooltip to pop up with the real link
var change_title    = false;

// Set to false if you don't want to see MySpace's warning page
var switch_on_click = true;

// Set to false if you don't care about text-only links (faster)
var text_search     = true;

(function Translate() {
	var links = document.getElementsByTagName("a");
	
	var find = /https?:\/\/[0-9a-zA-Z\-_]+\.msplinks\.com\/([A-Za-z0-9+\-_\/=]+)/gi;
	var replace = function(txt) { return txt.replace(find, function(l, b64) {
			return atob(b64).replace(/^01/, '');
	});};
	
	for (var i = 0; i < links.length; i++) {
		if (links[i].href && links[i].href.match(find)) {
			var link = links[i];
			var orig = link.href;
			var url = replace(link.href);
			if (links[i].textContent && links[i].textContent.match(find)) {
				links[i].textContent = replace(links[i].textContent);
			}
			//GM_log(url);
			if (change_link)
				link.href = url;
			if (change_title)
				link.title += url;
			if (switch_on_click) {
				function sb(e) { if (this.href) this.href = "http://www.msplinks.com/"+btoa("01"+this.href); }
				link.addEventListener('click', sb, false);
			}
		}
	}
	
	if (text_search && typeof document.evaluate == "function") {
		//var notInTags=['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea']; // these can work, too...
		var t,texts = document.evaluate("//text()",
			document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; t = texts.snapshotItem(i); i++) {
			var txt = t.textContent;
			if (txt && txt.match(find)) {
				var url = replace(txt);
				t.textContent = url;
			}
		}
	}
	
	// recursive, for any AJAX-ified pages (MySpace video comments)
	if (document.location && document.location.href && document.location.href.match(/\/vids\.myspace\.com\//))
		setTimeout(Translate, 2500);
})();
