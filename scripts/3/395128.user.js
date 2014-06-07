// ==UserScript==
// @name        自动领取在线经验
// @namespace   https://userscripts.org/scripts/source/395128
// @version     1.7
// @include     http://me.qidian.com/profile/score.aspx
// @updateURL   https://userscripts.org/scripts/source/395128.meta.js
// @downloadURL https://userscripts.org/scripts/source/395128.user.js
// @grant       none
// @description 保持页面打开状态，脚本会自动触发领取方法，不用手动领取（起点服务器竟然还存着这时间，不怕服务器资源浪费吗）
// ==/UserScript==
(function(){
	//因为起点页面已经有JQuery引用，故不用@require     http://code.jquery.com/jquery-1.11.0.js
	var mins = $("#leftMins").text();
	var sec = $("#leftSec").text();
	var text = $(".tab-ctrl > ul:eq(0) > li:eq(0) > span").text();
	//当时间归0时
	if(mins == "" && sec == "" && text.indexOf("已完成今日领取") < 0){
		//因为油猴子脚本优先级比GetOnlineExp()方法高，此时要先初始化GetOnlineExp()方法，不然下面无法触发点击事件
		GetOnlineExp();
		//触发领取的点击方法
		$('a[id^=online-exp-get]').trigger("click");
		//无视弹出窗口，重新刷新页面
		//立刻刷新有问题，等待5秒后刷新
		window.setTimeout(function(){ location.reload(true); }, 5000);
	}
	//因客户端时间和服务器时间经常不匹配，每30分钟刷新一次页面，此时间可以自由修改
	//若不想使用请自行注释
	//30分钟=30*60*1000=1800000毫秒
	if(text.indexOf("已完成今日领取 ") > -1){
	
	}else{
		window.setInterval(function(){ location.reload(true); }, 1800000);
	}
})();