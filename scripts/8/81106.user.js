// BBS.NGACN.CC Ads clean.
// version 0.91
// 2012-11-26
// Copyright (c) 2010-2012, KKorange Zha
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBS.NGACN.CC Ads clean.
// @namespace     http://userscripts.org/users/130328
// @description   用于去掉 NGA艾泽拉斯国家地理论坛 主页、版块页、主题页中的广告.
// @version       0.91
// @include       http://bbs.ngacn.cc/*
// @include       http://nga.178.com/*
// @exclude       
// ==/UserScript==

var href = window.location.href;



//remove the banner
rightBanner = document.getElementById('adsc2');
if (rightBanner) rightBanner.parentNode.removeChild(rightBanner);

topBanner = document.getElementById('adsc1');
if (topBanner) topBanner.parentNode.removeChild(topBanner);

leftBanner = document.getElementById('adsc_cate_block2');
if (leftBanner) leftBanner.parentNode.removeChild(leftBanner);

middleBanner = document.getElementById('adsc11');
if (middleBanner) middleBanner.parentNode.removeChild(middleBanner);

middleBannerForum = document.getElementById('adsc9');
if (middleBannerForum) middleBannerForum.parentNode.removeChild(middleBannerForum);

rightBoxForum = document.getElementById('forumboxrightlist');
if (rightBoxForum) rightBoxForum.parentNode.removeChild(rightBoxForum);

rightBannerTopic = document.getElementById('postads0');
if (rightBannerTopic) rightBannerTopic.parentNode.removeChild(rightBannerTopic);

rightBannerTopic2 = document.getElementById('postads1');
if (rightBannerTopic2) rightBannerTopic2.parentNode.removeChild(rightBannerTopic2);

rightBannerTopic3 = document.getElementById('postads2');
if (rightBannerTopic3) rightBannerTopic3.parentNode.removeChild(rightBannerTopic3);

middleBannerTopic = document.getElementById('adsc10');
if (middleBannerTopic) middleBannerTopic.parentNode.removeChild(middleBannerTopic);

//adjust
var menu = document.getElementById('menu');
if (menu) menu.style.marginRight = '0';

var m_stat_top = document.getElementById('m_stat_top');
if (m_stat_top) m_stat_top.style.marginRight = '0';

var m_cate5 = document.getElementById('m_cate5');
if (m_cate5) m_cate5.style.marginRight = '0';

var m_cate2_title = document.getElementById('m_cate2_title');
if (m_cate2_title) m_cate2_title.style.marginLeft = '0';

var m_cate2 = document.getElementById('m_cate2');
if (m_cate2_title) m_cate2.style.marginLeft = '0';

var cate_level_2 = document.getElementById('cate_level_2');
if (cate_level_2) cate_level_2.style.height = '0';

//background color
allDivAreas = document.getElementsByTagName('div');
for (var i = 0; i < allDivAreas.length; i++) {
    thisDiv = allDivAreas[i];
	if(thisDiv.className == "forumboxrightlist") thisDiv.parentNode.removeChild(thisDiv);//列表右侧小条
	if(thisDiv.className == "module_wrap mr1 mt0") thisDiv.className = "module_wrap mt0";//列表右侧小条
	if(thisDiv.className == 'c b2') thisDiv.className = 'c';
	if(thisDiv.className == 'c b3') thisDiv.className = 'c';
	if(thisDiv.className == 'c b4 first') thisDiv.className = 'c';
	if(thisDiv.className == 'c b4 invert first') thisDiv.className = 'c';
	if(thisDiv.className == 'c b4') thisDiv.className = 'c';
	if(thisDiv.className == 'cr b2') thisDiv.className = 'cr';
	if(thisDiv.className == 'cr b4') thisDiv.className = 'cr';
	
}

//底部文本框右侧广告
allTdAreas = document.getElementsByTagName('td');
for (var i = 0; i < allTdAreas.length; i++) {
    thisTd = allTdAreas[i];
	if(thisTd.className == "adsc5") thisTd.parentNode.removeChild(thisTd);
}