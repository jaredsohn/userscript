// ==UserScript==
// @name         贴吧自动领 T豆
// @namespace    http://jixun.org/
// @version      0.1.1.11
// @description  贴吧挂机自动领 T 豆
// @include      http://tieba.baidu.com/*
// @copyright    2013+, Jixun
// @run-at       document-end
// ==/UserScript==

(function (kira) {
	// 度娘闹哪样, 现在不能精准定时了
	// 于是… 循环检查吧~
	setInterval (kira, 15000);
	setTimeout  (kira,  3000);
})(function () {
	unsafeWindow.$('.time_gift.unopen_gift, .score_egg, .rand_gift, tb_paper_beg_btn_open').each(function () {
		$(this).click();
	});
});