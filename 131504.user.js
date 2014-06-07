// ==UserScript==
// @name		Wielki Shoutbox
// @namespace	http://www.hl2.boo.pl
// @version		1.1
// @description	Przenosi shoutbox na miejsce newsów na stronie sourcesdk.pl
// @match		http://sourcesdk.pl/*
// @copyright	2013+, Maciej Kuśnierz
// @require		http://code.jquery.com/jquery-2.0.2.min.js
// @noframes
// ==/UserScript==

function moveChat(){	
	//$chatTable = $("div > table > table > tr > td > table:contains('SHOUTBOX')");	
	$chatTable = $("td.naglowekramka:contains('SHOUTBOX')").parent().parent().parent();	
    
	$chatTable.css({"width" : "621px", "margin-bottom" : "10px"});
	$("input.input[name=text]", $chatTable).css({"width":"600px", "margin-bottom":"5px"});
	$("form#shoutbox", $chatTable).css({"width":"600px", "margin-bottom":"0px"});	
	
	$("div > table > tbody > tr > td > table > tbody > tr > td > table").eq(4).before($chatTable);
}

$(document).ready(function() {
	moveChat();
});
