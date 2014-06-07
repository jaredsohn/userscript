// ==UserScript==
// @name           League of Legends Twitter Feed
// @namespace      pitchShifter567
// @description    Allows you to view the twitter feeds from official Riot employees.
// @include        http://www.leagueoflegends.com/*
// ==/UserScript==

	
	
	function find_header( ) {
		var find = document.getElementById( "headerContainer" );
		find.innerHTML += "<span style=\"float:right; margin-right: 5%; color: white; font-size: 16px; font-weight: bold;\">Twitter Feed:<br /><iframe src=\"http://pastehtml.com/view/azo4mw8gv.html\" width=\"500px\" frameborder=\"0\"></iframe></span>";
	}
	
	find_header();