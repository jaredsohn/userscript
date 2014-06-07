// ==UserScript==
// @name        remove18Big
// @namespace   cn.18big.remove
// @description 移除网易新闻的SB大内容
// @include     http://news.163.com/
// @require http://code.jquery.com/jquery-1.8.2.js
// @version     0.1.1
// ==/UserScript==

var remove18Big = function() {
	jQuery(".ntes-passport-nav-bg").remove();
	jQuery(".shibada-title").remove();
	jQuery(".content-18th").remove();
	jQuery("#shibada_bg_divId").remove();
	jQuery("body").removeClass("wrapperBody");
	jQuery(".wrapperbg").css("height", "160px");
	jQuery(".top-gg-area").remove();
	jQuery("#wrapperbgId").removeAttr("style");
	jQuery("#wrapperbgId").css("margin-top", "-877px");
	var links = jQuery("a[href='http://news.163.com/shibada']");
	jQuery(links).remove();
	var news = $("#news")[0];
	var html = $(news).html();
	if (html.indexOf("十八大") != -1) {
		$(news).remove();
	}
}	
//      18摸大会结束，相关代码会影响阅读，删除，感谢安装的童鞋们
//	remove18Big();

