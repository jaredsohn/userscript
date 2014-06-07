// ==UserScript==
// @name           百度贴吧 转帖到i贴吧
// @version       1
// @author         sd
// @description   百度贴吧 转帖到i贴吧
// ==/UserScript==

try {
	Share.forward('pb');
} catch(e) {
	$.JsLoadManager.use('http://static.tieba.baidu.com/tb/js/Fe.js',
	function() {
		$.JsLoadManager.use('http://tb1.bdstatic.com/tb/static-itieba3/js/temp/itieba3_mixture.js',
		function() {
			$("p.d_forward_info").length ? $("p.d_forward_info").children("span.red").attr("id", "forward_num") : $("div#bdshare").after('<p class="d_forward_info" style="display: block;">分享次数：<span class="red" id="forward_num">0</span></p>');
			Share.forward('pb');
		});
	});
}