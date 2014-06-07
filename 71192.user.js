// ==UserScript==
// @name                屏蔽豆瓣推荐
// @namespace           Block Douban
// @description         屏蔽豆瓣推荐的书影音与评论
// @include             http://www.douban.com/
// @version             1.0
// ==/UserScript==


(function(){
	document.getElementsByClassName('content')[0].style.display = 'none';
	document.getElementsByClassName('block1')[1].style.display = 'none';
})();








