// ==UserScript==
// @name       百度贴吧 - 礼物、随机礼物 - 附带自动签到
// @namespace  http://blog.csdn.net/isea533
// @version    0.2
// @description  百度贴吧自动获取礼物，自动签到，登录贴吧网页后自动执行。
// @match      http://tieba.baidu.com/*
// @copyright  2012+, abel533
// ==/UserScript==

$(function(){
    var isea_gifcount = 4;
    //5分钟间隔
    var isea_jg = 5*60*1000;
    var isea_iv;
    //开始方法
    function isea_run(){
        //自动签到
        if($('.j_cansign').length>0){
            //未签到
            console.log("未签到，自动签到");
        	$('.j_cansign').click();
            //验证签到结果
            setTimeout(function(){
                	if($(".signstar_signed").length>0){
                		console.log("自动签到成功");
                	}
                	else{
						$('.j_cansign').click();
						//再次签到
						setTimeout(function(){
								if($(".signstar_signed").length>0){
									console.log("自动签到成功");
								}
								else{

									console.log("自动签到失败!");
								}
							},1000);
                	}
            	},5000);
        }
        //随机礼物
        if($(".rand_gift").length>0){
        	console.log("自动获取随机礼物");
            $(".rand_gift").click();
        }
        //获取礼物
        if($('.time_gift').length>0){
            console.log("开始自动获取礼物");
    		var timePoint = Number($('.curren_len .time_point').text().substring(0,2));
            console.log("当前礼物时间点:"+timePoint);
            switch(timePoint){
                case 10:
                    isea_gifcount = 4;
                    break;
                case 30:
                    isea_gifcount = 3;
                    break;
                case 50:
                    isea_gifcount = 2;
                    break;
                case 90:
                    isea_gifcount = 1;
                    break;
                default:
                    isea_gifcount = 0;
            }
            console.log("礼物剩余个数:"+isea_gifcount);
            if(isea_gifcount>0){
                console.log("开始获取礼物");
                isea_getGift();
            }
        }
    }
    //获取礼物方法
    function isea_getGift(){
        //有礼物功能
        if($('.time_gift').length>0){
            if($('.unopen_gift').length>0){
                //有未打开的礼物 - 打开
                console.log("有未打开的礼物");
                //这里可以增加其他代码，例如提醒之类的
                $('.unopen_gift').click();
                console.log("打开礼物");
                //礼物数减1
                isea_gifcount--;
            }
            else{
            	console.log("礼物还未到时间");
            }
            //还有礼物
            if(isea_gifcount>0){
                setTimeout(isea_getGift,isea_jg);
            }
        }
    }
    console.log("自动获取礼物js载入");
    //5s后开始
	setTimeout(isea_run,5000);

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-47948359-2', 'baidu.com');
  ga('send', 'pageview');
});
