// ==UserScript== 
// @name ficbook.net NS 
// @namespace ex.stein 
// @version 1.0 
// @description Remove slash fics from collections lists on ficbook.net 
// @match *://ficbook.net/collections/* 
// @icon http://teinon-st.cdn.ngenix.net/design/favicon.ico 
// @require http://code.jquery.com/jquery-1.8.3.min.js 
// @copyright 2013+, ex.stein 
// ==/UserScript== 

var list = $('.collection_fics');

jQuery.each(list, function(){
	var urls = $(this).find('.tip');
		var count = 0;
	urls.each(function(){
		if ($(this).attr('href') == '/genres/slash'){
			count++
		}
	});
	
	if (count > 0){
		$(this).remove();
	}
});