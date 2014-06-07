// ==UserScript==
// @name       BaiduTiebaSuperReply
// @namespace  http://openszone.com
// @author  Myfreedom614 <openszone@gmail.com>
// @version    0.2.1
// @description  百度贴吧超级回复
// @homepage    https://userscripts.org/scripts/show/165296
// @updateURL   https://userscripts.org/scripts/source/165296.meta.js
// @downloadURL https://userscripts.org/scripts/source/165296.user.js
// @include	http://tieba.baidu.com/p/*
// @include http://tieba.baidu.com/f?ct=*
// @run-at	document-end
// @grant none
// @copyright  2013,Myfreedom614
// ==/UserScript==

var f = function() {
	$('.s_toolbar').length == 0 && _.Module.use('common/component/toolbar', [{
		'active': false,
		'reply' : true,
		'dataPostor': {
			canPostor : {
				isBlock: PageData.user.balv.is_block ? true : false,
				noUn: PageData.user.no_un,
				forbidFlag: '0',
				login: '1',
				canPost: '1'
			},
			data : {
				kw: PageData.forum_name,
				ie: 'utf-8',
				rich_text: '1',
				floor_num: PageData.total_post_num,
				fid: PageData.forum_id,
				tbs: PageData.tbs,
				tid: PageData.thread_url.replace(/.*\/([^/]*)$/, '$1'),
				lp_type: thread_topic_type,
				lp_sub_type: thread_topic_subtype
			}
		}
	}], function(instance) {
	})
},
s = document.documentElement.appendChild(document.createElement('script'));
s.textContent = '(' + f + ')()';