// ==UserScript==
// @name          Testing for steamfriends
// @description   basic url replace
// @include       http://steamcommunity.com/*
// ==/UserScript==

//(function() {
    var baseUrl = "steam://friends/add/";
	
	alert(baseUrl);
	
	var source = document.body.innerHTML;
	
	alert(source.match("[0-9]{17}"));
	
	//source.replace("//", "steam://friends/add/76561197991334232")
	//alert(source.replace("//", "steam://friends/add/76561197991334232"));
	
	
//})();