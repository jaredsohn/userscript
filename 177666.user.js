// ==UserScript==
// @name       tieba plus
// @author	   zachary.woo@163.com
// @namespace  http://weibo.com/lelily
// @version    0.1
// @description  贴吧加强脚本
// @match      http://tieba.baidu.com/f*
// @copyright  2013+, MZ
// ==/UserScript==
/*=============0.1===========================
add 默认打开帖子只看楼主
add 去掉提示框
===========================================*/
$('#thread_list>li div.threadlist_title>a').each(function(i,o){
	var href = $(o).attr('href');
	$(o).attr('href',href+'?see_lz=1');
});
$('#frs_list_pager').unbind('click');
$('.ui_bubble_wrap,.j_dl_bubble').hide();