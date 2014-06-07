// ==UserScript==
// @name           tieba_hide_someone_completely
// @namespace  a@b.com
// @description    彻底屏蔽某些人
// @include        http://tieba.baidu.com/*
// @author         xiaohaizi02009
// @version        2.1.5
// ==/UserScript==

var someone = ["Sonico俺の嫁","爱Q2665225245"]; //黑名单

for (j = 0; j < someone.length; j++) {
	$('tr,li').each(function () {
		if ($(this).find('.tb_icon_author>a,td:eq(3),.th_author').text().trim() == someone[j]) {
			$(this).detach();
		}
	});
	$('.l_post').each(function () {
		if ($(this).find('.d_author_anonym,.d_name>a').text().trim().indexOf(someone[j]) != -1) {
			$(this).detach();
		}
	});	
    $('.lzl_single_post').each(function () {
		if ($(this).find('.lzl_cnt>a').text().trim() == someone[j]) {
			$(this).detach();
		}
	});
    $('.j_feed_replyme').each(function () {
		if ($(this).find('.replyme_user>a').text().trim().indexOf(someone[j]) != -1) {
			$(this).detach();
		}
	});    
    $('.j_feed_atme').each(function () {
		if ($(this).find('.atme_user>a').text().trim().indexOf(someone[j]) != -1) {
			$(this).detach();
		}
	});
}