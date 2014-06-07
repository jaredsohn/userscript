// <![CDATA[
// ==UserScript==
// @name           Weibo Revolution
// @fullname       Weibo Revolution
// @description    A Better Weibo.
// @homepage       http://userscripts.org/scripts/show/101181
// @author         Amio
// @version        0.1.5
// @created        2011.04.15
// @modified       2011.04.20
// @namespace      http://www.airmio.com
// @include        http://weibo.com/*
// @include        http://t.sina.com.cn/*
// ==/UserScript==

(function(){

	// Inject Style
	var sty = document.createElement('style');
	sty.type = 'text/css';
	sty.innerHTML =
		'.head_menu .menu_c { overflow: visible }' +
		'.head_menu .bg_menu_c { width: 100% }' +
		'.we_Menu { position: relative }' +
		'.we_Menu .bg_menu_c { height: 100% !important; z-index: -1; width: 130%; left: -15%; border-radius: 5px 5px 0 0 }' +
		'.we_Menu .more { display:none; position: absolute; bottom: 33px; height: auto }' +
		'.we_Menu .more a { display: block; line-height: 16px; padding-top: 7px; font-weight: normal !important }' +
		'.we_Menu:hover > div { display:block }' +

		'.goTop { top: 250px !important }' + // nice position

		// Fix Input Box Overflow on 4lines
		'.MIB_mbloghead { height: 170px; overflow: hidden }' +
		'.MIB_mbloghead textarea { height: 74px !important }' +

		// Remove Ads
		'.missionBox, .tips_player,' + // 横幅广告
		'.mainR .f_pro,' + // 侧栏所有乱七八糟
		'.mainR div[id^="ads_"],' + // 侧栏广告
		'.mainR div[name="app5"],' + // 关注的话题
		'.mainR div[name="app20"],' + // 感兴趣的人
		'.mainR div[name="app10005"],' + // 感兴趣的活动
		'.mainR > .f_pro' + // 手机和意见反馈
		'{ display:none }';

	document.querySelector('head').appendChild(sty);

	// Inject HTML
	var eNav = document.querySelector('.menu_c'),
	    eMyposts = eNav.getElementsByTagName('li')[2];
	eMyposts.className += ' we_Menu';
	eMyposts.innerHTML += '<div class="more"><div class="bg_menu_c"></div>' +
		'<a href="/atme">提到我的</a><a href="/comments">评论我的</a></div>';

})();

// ]]>