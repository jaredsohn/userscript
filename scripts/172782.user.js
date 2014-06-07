// ==UserScript==
// @name        postCS
// @namespace   perzer.com
// @description postCS
// @include     http://chuangshi.qq.com/read/novel/bbs/showid/*.html
// @version     1
// ==/UserScript==
window.batchPost = function(code) {
	for (var i = 0; i < 15; i++ ) {
		$.ajax({
           url: "/read/novel/comment.html",
           data: {
               nid:nid,
               title: '今天的更新很给力',
               text:'作者继续加油！',
               verify:code
           },
           type: 'post',
           dataType: "json",
           success: function(data) {
           }
       });
	}
};