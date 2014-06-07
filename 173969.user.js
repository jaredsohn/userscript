// ==UserScript==
// @name        虎扑黑名单
// @namespace   maoanran
// @include     http://*.hupu.com/*
// @version     1
// ==/UserScript==

$ = unsafeWindow.$;
//黑名单词汇,可以自行添加,请按照格式自行修改 ['xxxx','xx','xxx']
var keywords = ['屌丝','火箭', '我火', '窝火', '莫雷', '火花', '霍华德', '哈登']
//新声
$('.J_reply_content').each(function(i) {
	for (var i = 0; i < keywords.length; i++) {
		if (this.innerHTML.indexOf(keywords[i]) != -1) {
			$(this).parent().parent().remove();
		}
	};
});
//bbs
$('.floor').find('.case').each(function(i) {
	if ($(this).parent().parent().attr('id') == 'tpc')
		return''
	for (var i = 0; i < keywords.length; i++) {
		if (this.childNodes[0].childNodes[0].childNodes[0].innerHTML.indexOf(keywords[i]) != -1) {
			$(this).parent().parent().remove();
		}
	};
}); 