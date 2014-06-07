// ==UserScript==
// @name           Kongregate View Link Fixer
// @namespace      tag://kongregate
// @description    This fixes the view links on Kong to actually take you to the page containing the post referenced
// @include        http://www.kongregate.com/forums/*/topics/*
// @author         MrSpontaneous	
// @version        1.5.1
// @date           12/05/10
// ==/UserScript==
//You may not modify or redistribute this script without permission.

// Written by MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous) 04/14/10
// Updated on 8/29/10 to address issues where some threads were two pages behind
// Updated on 12/05/10 fixed back button functionality, provided for being n pages behind

var baseURL = "http://www.kongregate.com" + window.location.pathname;

if (window.parent == window && window.location.hash != "") {
	if (window.location.search.indexOf("linkfixed") == -1) { //prevents infinite loops
		if (window.location.hash) {
			var anchor = window.location.hash.substring(1);
			if (!document.getElementById(anchor)) {
				var nextpage = parseInt(get_param("page")) + 1;
				window.location.replace(baseURL +  "?page=" + nextpage + "&linkfixed=1" + window.location.hash);
			}
		}
	}
	else if (get_param("linkfixed") == 1) { //if we're in the process of jumping forward
		var anchor = window.location.hash.substring(1);
		if (!document.getElementById(anchor) && document.getElementsByClassName("post").length == 25) { //sometimes caused by pagination, possible 2 page difference
			var nextpage = parseInt(get_param("page")) + 1;
			window.location.replace(baseURL + "?page=" + nextpage + "&linkfixed=1" + window.location.hash);
		}
	}
	if (window.location.search.indexOf("linkfixed") != -1) {
		if (document.getElementsByClassName("post").length == 0) { //uh-oh, got a little ahead of ourselves
			var prevpage = parseInt(get_param("page")) - 1;
			window.location.replace(baseURL +  "?page=" + prevpage + "&linkfixed=2" + window.location.hash);
		}
	}
}

function get_param( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}