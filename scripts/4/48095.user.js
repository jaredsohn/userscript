// ==UserScript==
// @name           AutoPagerizeTwitter
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// ==/UserScript==

//http://www.shuraba.com/?p=computing/js/scroll
function getScroll () {
	var Obj = new Object();
	var scrollX1 = scrollX2 = scrollX3 = scrollY1 = scrollY2 = scrollY3 = docW1 = docW2 = docH1 = docH2 = winW1 = winW2 = winW3 = winH1 = winH2 = winH3 = 0;
	if (document.documentElement) {
		scrollX1 = document.documentElement.scrollLeft || 0;
		scrollY1 = document.documentElement.scrollTop || 0;
		docW1 = document.documentElement.scrollWidth || 0;
		docH1 = document.documentElement.scrollHeight || 0;
		winW1 = document.documentElement.clientWidth;
		winH1 = document.documentElement.clientHeight;
	}
	if (document.body) {
		scrollX2 = document.body.scrollLeft || 0;
		scrollY2 = document.body.scrollTop || 0;
		docW2 = document.body.scrollWidth || 0;
		docH2 = document.body.scrollHeight || 0;
		winW2 = document.body.clientWidth;
		winH2 = document.body.clientHeight;
	}
	scrollX3 = window.scrollX || 0;
	scrollY3 = window.scrollY || 0;
	winW3 = window.innerWidth;
	winH3 = window.innerHeight;
	Obj.scrollX = Math.max(scrollX1, Math.max(scrollX2, scrollX3));
	Obj.scrollY = Math.max(scrollY1, Math.max(scrollY2, scrollY3));
	Obj.docW = Math.max(docW1, docW2);
	Obj.docH = Math.max(docH1, docH2);
	Obj.winW = Math.min(winW1, Math.min(winW2, winW3));
	Obj.winH = Math.min(winH1, Math.min(winH2, winH3));
	return Obj;
}

window.setInterval(function(){
	var o=getScroll()
	if(o.docH-o.scrollY-o.winH<200){
		var more=document.getElementById('more')||document.getElementById('search_more')
		if(more.getAttribute('class').indexOf('loading')<0){
			var e=document.createEvent("MouseEvents")
			e.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null)
			more.dispatchEvent(e)
		}
	}
},500)