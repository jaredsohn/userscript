// ==UserScript==
// @name        HupuVideoHelper
// @namespace   http://www.fanrenxiu.com/proj/gm/hupu-video-helper.user.js
// @description 直接播放虎扑视频脚本, 针对2012年11月的虎扑视频页面改版
// @version     0.1
// @author      legendlee
// @include     http://v.hupu.com/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
	var btn = document.querySelectorAll('#play_box .play_btn')[0];
	if (btn) {
		var href = btn.getAttribute('href');
		if (href) {
			var box = document.querySelectorAll('#play_box')[0];
			if (box) {
				var template = {
					QQ: "<embed src='http://static.video.qq.com/TPout.swf?vid=[:vid:]&auto=1' allowFullScreen='true' quality='high' width='480' height='400' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>",
					sina_is_sb: "<embed src='[:swf:]' type='application/x-shockwave-flash' name='ssss' allowFullScreen='true' allowScriptAccess='always' width='480' height='370'></embed>"
				};
				if (/qq.com/.test(href) !== false) {
					// QQ视频
					var a = /([a-zA-Z0-9]+).html/.exec(href);
					if (a && a.length > 1) {
						var vid = a[1];
						var html = template.QQ.replace('[:vid:]', vid);
						box.innerHTML = html;
					}
				} else if (/sina.com/.test(href) !== false) {
					// Sina视频
					GM_xmlhttpRequest({
						method: "GET",
						url: href,
						onload: function(response) {
							if (response.status === 200) {
								var a = /var\s+\$SCOPE\s*=\s*([\s\S]+?)<\/script>/.exec(response.responseText);
								if (a && a.length > 1) {
									try {
										//var scope = JSON.parse(a[1]);
										eval("var scope = " + a[1]); // unsafe but works
										var html = template.sina_is_sb.replace('[:swf:]', scope.video.swfOutsideUrl);
										box.innerHTML = html;
									} catch (err) {
									}
								}
							}
						}
					});
					
				} else {
				}
			}
		}
	}
})();