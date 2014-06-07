// ==UserScript==
// @name           InfoQ Content Helper
// @namespace      http://chaifeng.com/app
// @description    把 InfoQ 的内容部分变为100%，右边栏挪到下面，方便阅读内容
// @include        http://www.infoq.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){
	jQuery('div#columns_container').css('padding-right', '0');
	jQuery('div#rightbar').width('100%');
	jQuery('div#content').width('100%');
	jQuery('div.vendor-content-box-float').hide();
})();
