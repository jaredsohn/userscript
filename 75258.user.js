// ==UserScript==
// @name           Clean Yahoo! Fantasy Team Screen
// @namespace http://snkcushers.com
// @include http://baseball.fantasysports.yahoo.com/b1/*
// @include http://basketball.fantasysports.yahoo.com/nba/* 
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 1500);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            runGM();
        }
    }

function runGM() {
	$(".mlb-view-video").css({"display":"inline-block", "height":"10px"});
	$(".teamtable td").css({"padding":"1px 2px"});
	$(".teamtable td.player div.emptyplayer").css({"padding":"0"}); 
 	$(".stat.wide").width("34px");
	$(".stat.wide div").width("37px");
    $(".teamtable tbody tr").height("20px");
    $(".teamtable td div").css({"font-size":"10px","float":"left"});
    $(".teamtable .gametime").css({"padding":"0 0 0 6px"});
    $(".teamtable td div a.name").css({"width":"100px", "display":"block"});
	$(".teamtable td div.detail").css({"padding-left":"6px"});
    $(".teamtable td div.detail span").css({"float":"none"});
    $(".teamtable .player").width("240px");
    $(".teamtable .opp").each(function () {
    $(this).css({"width":"60px", "padding":"0 3px 0 4px"});
	if($(this).text().substring(0,1) == "x") 
		$(this).css("background-color","red");
	else if($(this).text().substring(0,1) == "^") {
		if ($(this).next(".gametime").text().substring(0,1) == "W" || $(this).next(".gametime").text().substring(0,1) == "L") {
			$(this).css("background-color","green");
			$(this).css("color","white");
		} else
			$(this).css("background-color","#32CD32"); 
	}
});
}