// ==UserScript==
// @name           jieke_forum_thanks_by_oneclick
// @description    捷克论坛一键感谢
// @include        http://206.108.50.19/thread-*
// @include        http://206.108.51.34/thread-*
// @include        http://www.jkforum.net/thread-*
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2013.3.24
// ==/UserScript==

var formhash = $("[name='formhash']:eq(0)").val();

if ($("#k_thankauthor").length > 0) {
	$("[id='k_thankauthor']").attr("myurl", function () {
		return this.href
	}).removeAttr("onclick").each(function () {
		this.href = "";
	}).click(function () {
		GM_log("开始运行一键感谢程序……");
		var urll = this.getAttribute("myurl") + "&formhash=" + formhash + "&handlekey=k_thankauthor&addsubmit=true&message=So%20good,thanks%20a%20lot!&formsubmit=true";
		this.href = "";
		GM_xmlhttpRequest({
			method : 'POST',
			synchronous : true,
			url : urll,
			onload : function () {
				GM_log("一键感谢 ok!");
				window.location.reload();
			}
		});
	})
}
