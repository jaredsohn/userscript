// ==UserScript==
// @name           KOKA Order
// @version        0.2.1005
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
    url: 'http://erep.tw/order/koka.php',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
       
        
        var order_string = responseDetails.responseText;              
        var tags = order_string.split('|');
        var order = tags[0];
        var mission = tags[1];
        var mission_detail = tags[2];
	var announcement = tags[3];

	$("#isBattleList").before("<div><p><h1>KOKA 拐拐(77)通訊系統</h1></p></div>").addClass("battle_listing");
	$("#isBattleList").before("<h4>"+order+"</h4><hr>").addClass("goal_success");
	$("#isBattleList").before("<h4>"+mission+"</h4><hr>").addClass("goal_success");
	$("#isBattleList").before("<h4>"+mission_detail+"</h4><hr>").addClass("goal_success");
	$("#isBattleList").before("<h4>"+announcement+"</h4><hr>").addClass("goal_success");
        



        
    }
});