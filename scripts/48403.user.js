// ==UserScript==
// @name           Prevent Spoiler
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    ネタバレの可能性を表示するスクリプト
// @version        0.1.4
// @include        http://www.nicovideo.jp/watch/*
// @require        http://script41self.up.seesaa.net/user_js/nicoapiresult.js
// ==/UserScript==

(function(){
	var result = new NicoApiResult();
	result.ready(function () {
		var result = window.GM_NicoApiResult;
		var thread_id = result.thread_id;
		var video_length = parseInt(result.l);
		var comment_url = decodeURIComponent(result.ms);
		
		var comment_num = 1000;
		if(thread_id && video_length && comment_url){
			if(video_length < 60) {
				// 1分未満なら100件
				comment_num = 100;
			} else if(video_length < 300) {
				// 5分未満なら250件
				comment_num = 250;
			} else if(video_length < 600) {
				// 5分以上，10分未満で500件
				comment_num = 500;
			}/* else {
				// 10分以上なら1000件
				comment_num = 1000;
			}*/
			
			GM_xmlhttpRequest({
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 Greasemonkey (Prevent Spoiler)",
					"Content-type": "text/xml"
				},
				url: comment_url,
				data: "<thread res_from='-" + comment_num + "' version='20061206' thread='" + thread_id + "' />",
				onload: function(res) {
					var spoiler_count = 0;
					var comments = res.responseText.match(/<chat [^>]+>[^<]+<\/chat>/g);
					for(var i=0; i<comments.length; i++) {
						comments[i].match(/>([^<]+)</);
						var cm = RegExp.$1;
						if(cm.indexOf("ネタバレ") != -1) spoiler_count++;
						else if(cm.indexOf("ねたばれ") != -1) spoiler_count++;
						else if(cm.indexOf("ねたバレ") != -1) spoiler_count++;
						else if(cm.indexOf("ネタばれ") != -1) spoiler_count++;
						else if(cm.indexOf("寝たばれ") != -1) spoiler_count++;
						else if(cm.indexOf("寝たバレ") != -1) spoiler_count++;
						else if(cm.indexOf("netabare") != -1) spoiler_count++;
					}

					if(spoiler_count != 0) {
						var insrt_pos = document.getElementById("flvplayer_container");
						var div = document.createElement("div");
						div.innerHTML = "<font size='5' color='red'>コメントにネタバレの可能性あり！</font>（<strong>" + spoiler_count + "</strong> 件のコメントがネタバレについて言及しています。）";
						insrt_pos.parentNode.insertBefore(div, insrt_pos);
					}
				},
				onerror: function(res){ GM_log(res.status + ":" + res.statusText); }
			});
		}
	});

})();
