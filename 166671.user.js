// ==UserScript==
// @name           tieba_hide_someword
// @description    屏蔽包含特定关键字的主题
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/tb*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.5.5
// ==/UserScript==

var someone = ["关键字甲", "关键字乙"]; //黑名单

var $ = unsafeWindow.$;

for (j = 0; j < someone.length; j++) {
	$('tr').each(function () { //旧版
		if ($(this).find('.thread_title>a').text().indexOf(someone[j]) != -1) {
			$(this).remove();
		}
	});
	$('li').each(function () { //新版
		if ($(this).find('.j_th_tit').text().indexOf(someone[j]) != -1) {
			$(this).remove();
		}
	});
}