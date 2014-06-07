// ==UserScript==
// @name       Remove MyBB Header Notices
// @author      Frank.Barry
// @namespace   http://www.appnuke.com/
// @version     1.0
// @description Remove MyBB Header Notices
// @include     http://community.mybb.com/*
// @include     https://community.mybb.com/*
// ==/UserScript==

function mybbfrank(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
mybbfrank('p.alert{display:none;}p.notice2{display:none;}p.notice{display:none;}');