// ==UserScript==
// @name        TuDouWideScreen
// @namespace   Dary
// @include     http://www.tudou.com/programs/view/*
// @include		http://www.tudou.com/listplay/*
// @description        使TuDou播放视频时自动宽屏
// @version     1.1.3
// ==/UserScript==



//宽屏
var body = document.querySelector('html body');
body.className ='widescreen';
//var tudouPlayer = document.body.querySelector('#playerObject');
//var normalDom = document.querySelector('.normal');
//if (tudouPlayer && normalDom) {
//	normalDom.className = normalDom.className.replace('normal','widescreen');
//}

//List分类的字体调整
var listinfo = document.querySelector('html body#p-pi.page_play div.videowrap div.vcate_2');
if (listinfo)
{
listinfo.style.fontSize='14px';
}

function replace(){
//获取信息
//不知为何,取"播客信息"那里的信息取不出来,取自"视频信息"上传于那里.
var info = document.querySelector('html body#p-pi.page_play div.videowrap div.auto div.con_main div.viewinfo_wrap div#videoInfo.con_mod div.bd div.v_detail p.v_user a#vUpUser');
if (info)
{
	var clonedInfo = info.cloneNode(true);
	//替换
	var title = document.querySelector('html body#p-pi.page_play div.videowrap div.vcate_2 ul.vci li a');
	if (title)
	{
		title.parentNode.replaceChild(clonedInfo,title);
	}
}
}

window.setTimeout(function() {replace()}, 3000);