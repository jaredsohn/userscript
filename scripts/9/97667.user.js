// ==UserScript==
// @name          google suggest parser
// @namespace     http://googletrustcheck.tk/suggest/
// @description   Google suggest parser, see demo at <a href="http://googletrustcheck.tk/suggest/">Google suggest</a>
// @include       http://googletrustcheck.tk/suggest/
// @include       http://googletrustcheck.tk/suggest/*
// @version       1.0
// ==/UserScript==

$(document).ready(function(){

	$('#tool_start').click(function() {
		$('#gkeywords').empty();
		var gkey = $("#gkeyword").val();
                gsuggest(gkey);
	});


});

function gsuggest(keyword) {
	$.ajax({
		url: 'http://www.google.com/complete/search?hl=en&js=true&qu='+escape(keyword),
		dataType: "jsonp",
		jsonpCallback: 'GCallback',
		cache: true
	});
}

function GCallback (data) {
	var keywords = '';
	$.each(data[1], function(i, keyword){
		keywords = keywords + keyword[0] + '\n';
	});
	$('#gkeywords').append(keywords);
}