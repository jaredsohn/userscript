// ==UserScript==
// @name        Triplet Commas
// @namespace   http://*
// @include     http://192.168.200.7:8085/*
// @version     2
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant  GM_addStyle
// ==/UserScript==

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

$("td .csh:contains('Revenue')").each(function(){
      $(this).parent().parent().parent()
		.children("tbody").children("tr").children("td").children("table")
		.children("tbody").find("tr:first").children("td:contains('00')")
		.digits();


		
		
		
});
