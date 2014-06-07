// ==UserScript==
// @name           Central News Agency
// @version        0.3.0806
// @author         BillWilson
// @include        http://*.erepublik.com/*
// @require        http://code.jquery.com/jquery-1.6.1.min.js


// ==/UserScript==
var name = "IRC教學";
//$("#country_status").hide();
$(".user_notify a:eq(2)").hide();

	
$(".user_notify").after("<style>div.gh38{padding:3px 0;width:152px;color:#fff;text-align:center;font-size:11px;margin:1px 0;cursor:pointer;line-height:90%;border-radius:4px;margin:0 0 6px;background-color:#ffffff;color:#3C8FA7;border-bottom: 1px solid #DEDEDE;}</style>"+
                    "<div> </div><div class=\'gh38\'><a target=\'_blank\' href=\'http://erep.tw\'>e台灣論壇</a></div>"+
                    "<div class=\'gh38\'><a target=\'_blank\' href=\'http://epttformosa.conic.me/interaction/irc\'>"+name+"</a></div>"+
                    "<div class=\'gh38\'><a target=\'_blank\' href=\'http://www.erepublik.com/en/newspaper/roc-ministry-of-defense-245452/1\'>國防部公告及平民軍令</a></div>"); 
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://erep.tw/order/mod.php',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
       
        
        var order_string = responseDetails.responseText;              
        var tags = order_string.split('|');
        var order = tags[0];
        var message = tags[1];
	
        
	$(".zone_news > table > tbody > tr > td > ul > li:eq(0)").html("<h1>e中央社(77)廣播系統</h1>");
	$(".zone_news > table > tbody > tr > td > ul > li:eq(1)").html(order);
	$(".zone_news > table > tbody > tr > td > ul > li:eq(2)").html(message);
	$("#country_status .zone_news").css("background-image","url(\"http://i.imgur.com/b0M7J.png\")");
	//$(".order_flags").css("margin-top","3px");



        
    }
});