// ==UserScript==
// @name              新浪微博左侧消息盒展开
// @namespace     http://weibo.com/zheung
// @version           0.1
// @description     如题
// @updateURL     https://userscripts.org/scripts/source/173161.meta.js
// @downloadURL https://userscripts.org/scripts/source/173161.user.js
// @match            http://weibo.com/*
// @copyright       DanoR
// ==/UserScript==

//JQuery准备
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

//修改代码
function letsJQuery()
{
	$('div.lev2.lev2_new').show();
}