// ==UserScript==
// @name          PM read helper
// @namespace     kottt's read helpers
// @description	  Nice and clean style for read
// @author        Anton 'kottt' Selutin
// @homepage      http://userscripts.org/users/99736
// @include       http://www.popmech.ru/*
// @include       http://popmech.ru/*
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	var pm_header = $(".block_header_main_inner").html();
	var pm_content = $(".block_main_inner .t_justify:first");
	
	
	var img = pm_content.find("table");
	pm_content.find("table").remove();
	pm_content.find(".grey_small:first").remove();
	var announce = pm_content.find("b:first");
	$(pm_content).find("b:first").remove();
	var added = pm_content.find("i");
	$(pm_content).find("i").remove();
	var text = pm_content.text();
	var content = $("<div></div>").append(announce).append("<br />").append(img)
		.append(text).append("<br />").append("<br />").append(added);
	
	$("body").find("table").remove();
	$("body").find("noindex").remove();
	$("body").append(pm_header);
	

	$("body").append(content);
}