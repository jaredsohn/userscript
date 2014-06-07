// ==UserScript==
// @name LILY-SHOW-GENDER
// @ujs:category browser: fix
// @author Warrior@lilybbs myBlog: bigline.cn
// @include http://bbs.nju.edu.cn/*
// @include http://lilybbs.net/*
// ==/UserScript==
__g = function(n) {
	var v=localStorage.getItem(n);
	return  ( v && (v != 'undefined') ) ? v : '';
}
var _t = (new Date()).getTime()-60*60*10000;
if(__g('m_start')=='' || __g('m_t')=='' || __g('m_t') < _t.toString())
{
			var h = document.getElementsByTagName("head")[0] || document.documentElement;
			var s = document.createElement("script");
			s.src = "http://bbs.nju.edu.cn/file/W/Warrior/check.js";
			s.charset = "UTF-8";
			h.insertBefore( s, h.firstChild );
}
else		
{
			var h = document.getElementsByTagName("head")[0] || document.documentElement;
			var s = document.createElement("script");
			s = document.createElement("script");
			s.type = "text/javascript";
			s.textContent = __g("m_start");
			h.insertBefore( s, h.firstChild );
}
