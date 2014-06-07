// ==UserScript==
// @name        lightnovel.cn Easy to Read
// @namespace   lightnovel.cn
// @description 轻国小说阅读脚本，隐藏左边栏，调整文字行距、字号及颜色。
// @include     http://www.lightnovel.cn/thread-*.html
// @version     1
// @grant       none
// ==/UserScript==
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.pls { display: none; } .t_f, .t_f td { color: #000; line-height: 30px; font-size: 16px; }');