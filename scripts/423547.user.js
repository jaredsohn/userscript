// ==UserScript==
// @name		Simunomics Main Retail Tweaks
// @description	Allow store actions from main retail screen
// @namespace	tag:seronis@gmail.com,2014-1-1:simunomics
// @version		1.3
// @match		http://simunomics.com/Retail-View.php
// @match		http://www.simunomics.com/Retail-View.php
// @require		http://code.jquery.com/jquery-latest.js
// @copyright	2014+, Seronis
// ==/UserScript==


var elems = new Array();
var hrefs0 = document.querySelectorAll('tr.d0 td:first-child a');
var hrefs1 = document.querySelectorAll('tr.d1 td:first-child a');

function add_options( hlink ) {
    var str_link = $(hlink).attr('href');
    var str_btype = $(hlink).text();
    var str_bland = $(hlink).parent().text().split(str_btype)[1].trim();
    var str_id = str_link.split('=')[1];
    
    var elmParent = $(hlink).parent();
    $(elmParent).empty();
    $(elmParent)
    	.append("&nbsp;" + str_id + ":&nbsp;" )
    	.append("<a href='" + str_link + "'>" + str_btype + "</a> " + str_bland + "&nbsp;--&nbsp;");
    
    var elemCash = document.createElement('a');
    $(elemCash).css("border","double thin #000")
    	.css("color","#550")
    	.css("background","#1C4")
    	.css("padding","0px 2px 0px")
    	.css("margin","0px 1px 0px")
    	.css("border-radius","5px")
    ;
    $(elemCash).attr('href', 'Retail-SlotCashOut.php?Property=' + str_id);
    $(elemCash).append("Cash");
    
    var elemStop = document.createElement('a');
    $(elemStop).css("border","double thin #000")
    	.css("color","#222")
    	.css("background","#F11")
    	.css("padding","0px 2px 0px")
    	.css("margin","0px 1px 0px")
    	.css("border-radius","5px")
    ;
    $(elemStop).attr('href', 'Retail-SlotCancel.php?Property=' + str_id + '&Slot=4');
    $(elemStop).append("Stop");
    
    var elemGrow = document.createElement('a');
    $(elemGrow).css("border","double thin #000")
    	.css("color","#222")
    	.css("background","#FA1")
    	.css("padding","0px 2px 0px")
    	.css("margin","0px 1px 0px")
    	.css("border-radius","5px")
    ;
    $(elemGrow).attr('href', 'Retail-Expand.php?Property=' + str_id + '&Slot=4');
    $(elemGrow).append("Grow");
    
    $(elmParent).append(elemCash);
    $(elmParent).append(elemStop);
    $(elmParent).append(elemGrow);
    $(elmParent)
    	.css("padding","2px 0px 2px")
    ;
}

$(hrefs0).each(function() {
    add_options(this);
});


$(hrefs1).each(function() {
    add_options(this);
});
