// ==UserScript==
// @name		httpsFixer
// @author		Apostolos Giannakidis
// @version		0.3
// @description	Convert all absolute links of a secure web site to https:// instead of http://
// @include		https://*
// @namespace	http://userscripts.org/users/159112
// ==/UserScript==
	
	var window_host = window.content.location.host;
	
	if (document.location.host == "www.facebook.com")
document.getElementById("navSearch").setAttribute("action","https://www.facebook.com/search/");
	
	var allLinks = window.content.document.getElementsByTagName("a");
	
	httpsFixer = function(){
		for (var i=0; i<allLinks.length; i++) {
			elm = allLinks[i];
			if (elm.getAttribute("href")) {
				var link_href = elm.getAttribute("href");
				var this_protocol = link_href.substr(0,5);
				var matchPos1 = link_href.search("/"+window_host+"/");
					
				if (matchPos1 != -1)
					elm.href="https://"+window_host+"/"+link_href.substr((matchPos1+window_host.length+2),link_href.length);
			}
		}
	}
	
	httpsFixer();

// Execute function when new nodes are inserted via ajax
window.content.document.addEventListener("DOMNodeInserted", httpsFixer, true);
	
// Execute function when nodes are removed via ajax
window.content.document.addEventListener("DOMNodeRemoved",httpsFixer, true);
