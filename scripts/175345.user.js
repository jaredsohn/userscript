// ==UserScript==
// @name        hack_ytjp.com.cn
// @grant       GM_log
// @require     http://libs.baidu.com/jquery/1.7.2/jquery.js 
// @namespace   http://ytjp.com.cn/pages/video/zxpx
// @include     http://ytjp.com.cn/pages/video/zxpx
// @version     1
// ==/UserScript==

$(document).ready(function(){

    unsafeWindow.trainConfirm();

    function updateDuration(){
        var url =  "http://ytjp.com.cn/genStudentinfo";
        var accum_duration = "table tr:nth-child(6) td:nth-child(2)";
        $.get(url, function(response){
            window.duration = $(accum_duration, response).text().trim();
            //console.log(duration);
            $('.accum').text(duration);
        });
    }

   
    $('.order_top_right').css('margin-top', '-60px')
    var init = 15 * 60;
    var countdown = init;
    var now = new Date();
    var now_h_m  = now.getHours() + ":" + now.getMinutes();
    var round = 1;
    var div_timer= $('<div>累计时间： <span class="accum"> </span><br/> 首轮开始时间：' + now_h_m + '<br />本轮还剩：<span class="timer">' + countdown + '</span>秒<br />第 <span class="r">' + round + '</span> 轮（每轮15分钟）</div>');
    $(".order_top_left").after(div_timer);
    updateDuration();

    function myTimer(){
        countdown--;
        $(".timer").text(countdown);
        if ( countdown <=0 ){
            countdown = init + 1;
            round++;
            $('.r').text(round);
            updateDuration();
        }
    }
    var counter = setInterval(myTimer, 1000);
    
});


unsafeWindow.trainConfirm = function () {

    if(1){
    
        var now = new Date();
        console.log(now);
		var startstamp1 = Date.parse(now);
		//var fakeDate = "Mon Aug 06 2013 01:40:34 GMT+0800 (CST)"
		//var startstamp1 = Date.parse(fakeDate);
		var startstamp2 = startstamp1;
		var url = "http://ytjp.com.cn/zxpx/xzitem";
		var params = {
			"time" 			: startstamp2,
			"uid" 			: "uid",
			"sTime" 		: '20130807224259'
		};
		$.ajax( {
			type 			: "POST",
			url 			: url,
			data 			: {
				time 		: startstamp2,
				uid 		: "uid",
				idnum		: '370602199007234310',
				sTime 		: startstamp2
			},
			async 			: false,
			dataType 		: "json",
			success 		: function(data) {
				if (data == "timeout") {
					window.location.href = "/login";
				} else {
					setTimeout("trainConfirm()",15 * 60 * 1000);
				}
			}
		});
	}
	
}
