// ==UserScript==
// @name		1chan back to top
// @namespace		1chan.ru
// @include		http://1chan.ru/*
// @description		button up
// @version		0.2
// @icon		http://wakaba.ru/favicon.ico
// ==/UserScript==

if (typeof GM_addStyle == 'undefined') 
	var GM_addStyle = function(css) {
		var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
		if (!head) return;
		style.type = 'text/css';
		style.textContent = css;
		head.appendChild(style);
	}
GM_addStyle("\
.top-button {-moz-box-sizing: border-box;\
	background: rgba(234, 244, 255, 0.5);\
	border-right: 1px solid #DDDDDD;\
	bottom: 0;\
	color: #45688E !important;\
	font-size: 12px;\
	height: 100%;\
	left: 0;\
	padding: 14px;\
	position: fixed;\
	text-decoration: none !important;\
}\
.top-button:hover{ background: rgba(234, 244, 255, 1);}\
.top-button, .top-button:hover{ transition: 0.3s;}\
");

window.onload=function(){
	var d=document.createElement('a');
	d.className='top-button';
	d.innerHTML = '▲ Наверх';
	d.href = "javascript:scroll(0,0)";
	document.body.appendChild(d);
}