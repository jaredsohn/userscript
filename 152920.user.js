// ==UserScript==
// @name	Qidian Helper
// @namespace	http://gera2ld.blog.163.com/
// @author	Gerald <gera2ld@163.com>
// @icon	http://s.gravatar.com/avatar/a0ad718d86d21262ccd6ff271ece08a3?s=80
// @version	0.4.4
// @description	起点助手 - Gerald倾情打造
// @homepage	https://userscripts.org/scripts/show/152920
// @downloadURL	https://userscripts.org/scripts/source/152920.user.js
// @updateURL	https://userscripts.org/scripts/source/152920.meta.js
// @match	http://*.qidian.com/*
// @grant	GM_openInTab
// ==/UserScript==

var callback=unsafeWindow.callback=function(j) {
	//var url='http://www.google.com.hk/search?hl=zh-CN&q='+callback.chapterName;
	var url='http://www.baidu.com/s?wd='+callback.chapterName;
	var r,reg=new RegExp(callback.chapterName.replace(/\s+/g,'\\s*'));
	if(j.responseData) for(var key in j.responseData.results) {
		r=j.responseData.results[key];
		if(!/\.qidian\.com$/.test(r.visibleUrl)&&reg.test(r.titleNoFormatting)) {
			url=r.unescapedUrl;
			break;
		}
	}
	callback.divstatus.style.display='none';
	if(callback.newTab) setTimeout(function(){GM_openInTab(url);},1); else location.href=url;
}
callback.newTab=true;		// 默认在新标签页打开
function $(i) {return document.getElementById(i);}
if(/^\/BookReader/i.test(location.pathname)||/^http:\/\/h5\.qidian\.com\/bookinfo.html\?bookid=/i.test(location.href)) (function(){
	var o=callback.divstatus=document.createElement('div');
	o.setAttribute('style','position:fixed;top:40%;left:25%;right:25%;height:50px;border:1px solid;background:orange;padding:20px;text-align:center;display:none;');
	document.body.appendChild(o);
	o=$('content')||$('dvchapter');
	if(o) return o.addEventListener('click',vipClick,false);
	o=$('lbChapterName');
	if(o) return getChapter(o.innerText||o.textContent,false);
})();
function vipClick(e) {
	var t=e.target;
	if(t.nodeName!='A') return;
	if(/^javascript:|vip,/.test(t.href)||t.href.indexOf('BuyChapter')>=0) {
		e.preventDefault();getChapter(t.innerText||t.textContent);
	}
}
function getChapter(chapterName,newTab) {
	if(newTab!=null) callback.newTab=newTab;
	var str=chapterName.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,'');
	var strarr=str.split(' ');
	//格式：第N卷 卷名 第N章 章名
	if(strarr.length==4) str=strarr[2]+' '+strarr[3];
	//格式：第N卷 第N章 章名
	else if(strarr.length==3) str=strarr[1]+' '+strarr[2];
	//格式：第N章 章名

	callback.chapterName = str;
	callback.divstatus.innerHTML='正在搜索：'+str.replace(/</g,'&lt;')+' ...';
	callback.divstatus.style.display='';
	var r = document.createElement('script');
	r.language = 'JavaScript';
	r.src = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=callback&q='+escape(str);
	document.body.appendChild(r);
}
