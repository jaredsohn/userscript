// ==UserScript==
// @name           有未读通知时提醒
// @version        0.0.4
// @namespace      tieba_notification
// @description    
// @include        http*
// @run-at         document-end
// ==/UserScript==
(function() {
	var interval = 5; //每5分钟检查一次，可以自己设置
	var link;
	var debug = false;

////////////////////////////////////////////////////
	if (!typeof GM_notification == "function") return;
	var lastcheck = GM_getValue('lastcheck');
	if (!lastcheck) {
		setNow();
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
			method: "Get",
			url: "http://message.tieba.baidu.com/i/msg/get_data",
			onload: function(response) {
				var n = response.responseText
				if(!n)GM_notification('网络错误或没有登录');
				n=n.match(/\[(.*)\]/)[1].split(','); //
				//结构： [新粉丝,0,0,回复,精品,0,0,0,@]
				if(debug)console.log(response.responseText);
				
				var reply = n[3];
				var AtMe = n[8];
				var note='';
				if(reply!=0)note+='你有' + n[3] + '个新回复';
				if(AtMe!=0)note+='有'+n[8] + '个@你'
				if(note||debug){				
					GM_notification(note,			
						'点击跳到贴吧',null,function(){GM_openInTab(link||'http://tieba.baidu.com')});
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