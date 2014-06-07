// ==UserScript==
// @name        weibo
// @namespace   soutear@gmail.com
// @description weibo
// @include		http://weibo.com/*
// @include		http://www.weibo.com/*
// @version     0.1
// @require     http://libs.baidu.com/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function(){
	// header
	$('div.gn_title[node-type="weiba"]').remove();
	$('div.gn_title[node-type="game"]').remove();
	$('div.gn_setting[node-type="member"]').remove();

	// top
	$('div.S_textb[node-type="recommendTopic"]').remove();

	// middle
	
	// right
	$('#trustPagelet_recom_allinonev5').remove();
	$('#trustPagelet_recom_memberv5').remove();

	// footer
	$('div.global_footer').remove();
	$('div[node-type="feed_list_shieldKeyword"]').remove();
});