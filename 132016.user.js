// ==UserScript==
// @name           RemoveSinaUnderline
// @namespace      http://userscripts.org/
// @description    删除sina网站链接的下划线，优化显示体验
// @include        http://www.sina.com.cn/
// @run-at document-start
// ==/UserScript==

if ('loading' == document.readyState) {
  GM_log("This script is running at document-start time.");
} else {
  GM_log("This script is running with document.readyState: " + document.readyState);
}

window.addEventListener(
	//'readystatechange', 
	'DOMContentLoaded',
	function() { GM_addStyle('a{text-decoration:none! important;}\na:hover,a:active,a:focus{text-decoration:underline! important;}'); 
		GM_log(document.readyState)
		},
	true);
	
//addGlobalStyle('a{text-decoration:none! important;}\na:hover,a:active,a:focus{text-decoration:underline! important;}');
//GM_addStyle('a{text-decoration:none! important;}\na:hover,a:active,a:focus{text-decoration:underline! important;}');
// 在head中添加style

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}