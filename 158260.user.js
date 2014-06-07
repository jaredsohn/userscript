// ==UserScript==
// @name        YouKuWideScreen
// @namespace   Dary
// @include     http://v.youku.com/v_show/*
// @description        使YouKu播放视频时自动宽屏
// @version     1.1.4
// ==/UserScript==

//获取信息
var info = document.querySelector('.userName');
if (info)
{
	var clonedInfo = info.cloneNode(true);
	clonedInfo.style.fontSize='14px';
	var crumbs = document.querySelector('.crumbs');
	//替换
	if (crumbs)
	{
		crumbs.parentNode.replaceChild(clonedInfo,crumbs);
	}
	else
	{
	}
}
else
{
	var guide = document.querySelector('html body.page_v div.window div.screen 	div.s_body div.s_main div#vpvideotitlev5_wrap div#vpvideotitlev5 div.base div.base_info div.guide');
	if (guide)
	{
		guide.style.height='0px';
	}
	var base = document.querySelector('html body.page_v div.window div.screen div.s_body div.s_main div#vpvideotitlev5_wrap div#vpvideotitlev5 div.base');
	if (base)
	{
		base.style.height='30px';
		base.style.marginTop='5px';
	}
}

//宽屏
var normalDom = document.querySelector('.playBox');
if (normalDom) {
	normalDom.className = normalDom.className.replace('playBox','playBox_thx');
	if (document.getElementsByClassName('btn__hidelist').length != 0){
	   document.getElementsByClassName('btn__hidelist')[0].click();
	}
}