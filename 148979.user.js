// ==UserScript==
// @name           百度文库幸运星
// @version        0.1
// @namespace      WenKu_Get_Stars
// @description    百度文库每隔一小时自动领取幸运星。
// @include        http*
// @run-at         document-end
// ==/UserScript==
(function() {
	var interval = 60; // 每60分钟检查一次，可以自己设置。
	var link;
	var debug = false;

////////////////////////////////////////////////////
	if (!typeof GM_notification == "function") return;
	var lastcheck = GM_getValue('lastcheck');
	if (!lastcheck) {
		setNow();
		checkNow(); // 第一次安装运行先获取一下幸运星。
	}

	
	main();

	
	function main() {
		var lastcheck = GM_getValue('lastcheck');
		var now = new Date().getTime();
		if ((now - lastcheck) > interval * 60 * 1000) {
			checkNow();
			setTimeout(main, interval * 60 * 1000);
		} else {
			setTimeout(main, now - lastcheck);
		}
	}

	function checkNow(argument) {
		setNow();
		GM_xmlhttpRequest({
			method: "Post",
			url: "http://wenku.baidu.com/event/getstars",
			data: "event_id=3",

			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},

			onload: function(response) {
				var n = response.responseText;
				if (!n) GM_notification('网络错误或没有登录');

				var note = '';
				if (n === "{\"error_no\":\"0\"}") {
					note = '已成功领取百度文库幸运星！';
				}
				//if (n === "{\"error_no\":\"5\"}") {
				//	note = '未成功领取百度文库幸运星！';
				//}

				// 成功领取才提示！
				if(note||debug){				
					GM_notification(note,			
						'点击跳到百度文库抽奖页面',null,function(){GM_openInTab(link||'http://wenku.baidu.com/topic/kaixueji2012/index.html')});
					}
			}
		});
	}

	function setNow() {
		var lastcheck = Number(new Date()).toString();
		GM_setValue('lastcheck', lastcheck);
		return lastcheck;
	}
}());