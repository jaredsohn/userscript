// JavaScript Document
// ==UserScript==
// @name        i贴吧链接改变+贴吧链接解除
// @include     http://tieba.baidu.com/*
// @version     1.0
// @author	Fate·Suzumiya
// @description 解析反和谐的链接，改变i贴吧默认连接
// @updateURL      https://userscripts.org/scripts/source/156388.meta.js
// @downloadURL    https://userscripts.org/scripts/source/156388.user.js
// @grant unsafeWindow
// ==/UserScript==
function it(x){
var i=x.attr("href");
i=i+"/allfeed";
x.attr("href",i);
}
function initLinkFix() {
	$('div.d_post_content,span.lzl_content_main').each(function(i,e) {
		$(e).contents().each(function(j,e){
			if(e.nodeName!='#text') return;
			while(e) {
				i=e.data.search(/(https?|ftp)(：|:)\/\/[!-~]/);
				if(i<0) return;
				e=e.splitText(i);
				i=e.data.search(/[^!-~:：。点]/);
				j=i>0?e.splitText(i):null;
				i=document.createElement('a');
				i.href=i.innerHTML=e.data.replace(/：/g,':').replace(/。/g,'.').replace(/点/g,'.');
				i.target='_blank';
				e.parentNode.replaceChild(i,e);
				e=j;
			}
		});
	});
};
var _window = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var $ = _window.$;
//i贴吧链接改变
it($(".nav_cur > a"));
it($(".userlike_info_head > a"));
it($(".aside_home_li > a"));
// 链接保护
initLinkFix();
