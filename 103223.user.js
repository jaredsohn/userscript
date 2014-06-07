// ==UserScript==
// @name           xHamster video download
// @description    Download videos from xHamster
// @namespace      http://userscripts.org/users/334809
// @include        *xhamster.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	var jss = $('script');
	
	var js = "";
	$.each(jss, function(i, j) {
		if(j.text.indexOf("'file':") != -1) {
			js = j.text;
			return false;
		}
	});
	
	if(js == "") return false;
	
	var regex = /'file': '(.+?)'/;
	var url = "http://xhamster.com/flv2/" + regex.exec(js)[1]
	
	var link = $('<a>Download</a>');
	link.attr('href', url);
	
	$("h1").append(" ");
	$("h1").append(link);
});