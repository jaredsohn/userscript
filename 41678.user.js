// ==UserScript==
// @name          ctba quote
// @description   for ctba quote
// @include       http://www.ctba.cn/topic/*
// @include       http://www.ctba.cn/group/topic/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author        train/unbounder.train@gmail.com
// @version       1.0
// ==/UserScript==



/* 	var content; 引用内容
	var author; 引用作者
	var ip; 引用ip
	var step; 引用楼层
*/
	
	function wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(wait,100); }
		else { $ = unsafeWindow.jQuery;add();}
    }
    wait();
	
 	function add(){
		$(".replylist").each(function(){
			// 暂时不支持trim()，google说是因为firefox3.1之前的版本不兼容，故用正则代替
			$(this).find(".opt_arrow~ul").append("<li id='quote'><a>引用</a></li>");
				var content = "[quote]"+$(this).find("#rtext").text().replace(/(^\s*)|(\s*$)/g,"")+"[/quote]";
				var author = $(this).find(".userName").text();
				var ip = $(this).find("#rnameip>span").text(); 
 				var step = $(this).find(".fleft>span:first").text();
				step = step.substr(0,step.indexOf("/"));
				$(this).find("#quote").click(function(){
					$("#topicContent").val("");
					$("#topicContent").val("@#"+step+" "+ip+"/"+author+"\n"+content+"\n");
					$("#topicContent").focus();
				}); 
		});
	} 