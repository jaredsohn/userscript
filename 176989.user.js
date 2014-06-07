// ==UserScript==
// @name			V2EX自动领取每日签到登录奖励
// @namespace		http://userscripts.org/scripts/show/176989
// @description		每天打开V2EX网站任意页面时自动领取签到的登陆奖励。
// @updateURL		https://userscripts.org/scripts/source/176989.meta.js
// @downloadURL		https://userscripts.org/scripts/source/176989.user.js
// @icon			http://ww1.sinaimg.cn/large/4ec98f50jw1e85azvlnh9j206y06y3ye.jpg
// @author			me
// @include        http*://*.v2ex.com/*
// @include        http*://v2ex.com/*
// @version			2014.1.24
// ==/UserScript==


var load, execute, loadAndExecute;
load = function(a, b, c) {
	var d;
	d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d);
	return d
}, execute = function(a) {
	var b, c;
	typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
	return c
}, loadAndExecute = function(a, b) {
	return load(a, function() {
		return execute(b)
	})
};

loadAndExecute("//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.0.min.js", function() {
	if ( document.getElementById("money") && document.getElementById("money").getElementsByTagName("a")[0].href.indexOf("/balance") != -1 ) {
		function p(s) {return s < 10 ? '0' + s: s;} //自动补0
		var uid=document.getElementById("Rightbar").getElementsByTagName("a")[0].href.split("/member/")[1];
		var dateinfo=new Date().getUTCDate();
		var dateexp=new Date('2222-02-02').toGMTString();
		var cookiestr="IDINFO=:" + uid + ":" + dateinfo + ":";
		var date2="" + new Date().getUTCFullYear() + p(new Date().getUTCMonth()+1) +p(new Date().getUTCDate())
		//var daily = $('a[href="/mission/daily"]');
		var daily = $('input[id="q"]');
		if (daily.length && document.cookie.indexOf(cookiestr) == -1 ) {
			daily.val("正在检测每日签到状态...");
			$.ajax({
				url: "/mission/daily",
				success: function(data) {
					var awards = $(data).find('input[value^="领取"]');
					if (awards.length) {
						// daily.val("正在" + awards.attr("value") + "...");
						daily.val("正在领取今日的登录奖励......");
						$.ajax({
							url: awards.attr('onclick').match(/(?=\/).+?(?=\')/),
							success: function(data) {
								daily.val("正在提交...");
								var days=data.split("已连续登")[1].split(" ")[1];
								if ( $('a[href="/mission/daily"]').length==1 ) {$('a[href="/mission/daily"]').parent().parent().fadeOut(3000)}
								$.ajax({
									url: "/balance",
									success: function(data) {
										if (data.indexOf(date2+" 的每日登录奖励")!="-1") {
											daily.val( "已连续领取" + days + "天，本次领到" + data.split("每日登录")[2].split(" ")[1] + "铜币" );
											document.cookie =cookiestr + ";expires=" + dateexp;
										} else {
											daily.val( "自动领取遇到意外，你可以试试手动领。" );
										}
									}
								})
							},
							error: function() {
								daily.val("网络异常 :(");
							}
						});
					}else{
						if (data.indexOf("已领取") != -1) {
							daily.val("今日奖励领取过了");
							document.cookie =cookiestr + ";expires=" + dateexp;
						} else {
							daily.val("无法辩识领奖按钮 :("); 
						}
						
					}
				},
				error: function() {
					daily.val("请手动领取今日的登录奖励!");
				}
			});
		} else {
			console.log("Wish you a happy day :)");
		}
	}
});