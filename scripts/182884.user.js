// ==UserScript==
// @name                BaiduMusicBox
// @namespace           SQLiu's Script
// @description         去右侧广告，调整列宽，默认高品质音乐
// @include             /^https?:\/\/play\.baidu\.com\/(\?.*)?$/i 
// @run-at		document-end
// ==/UserScript==

var a=document.createElement('script');
a.innerHTML="\
	$('.column4').width(0);\n\
	$('.column4').remove();\n\
	$('#lrcCol, .column2').css('right', '-=171');\n\
	$('#pauseAd, #rightAdTip').remove();\n\
	window.VIP.setVipInfo=function(a,b){\n\
		listView && listView.footer.footerTool('updateAmount');\n\
		if (b) {this.set('cloudLimit', b)}\n\
	}\n\
	window.VIP.defaults.cloud.service_level='gold';\n\
	window.VIP.set('cloud',window.VIP.defaults.cloud);\n\
	window.VIP.set('HQPrivileges',1);\n\
	window.VIP.set('HQMode',2);\n\
	window.VIP.set('vip',1);\
";
document.body.appendChild(a);

a=document.createElement('style');
a.innerHTML="\
	.c0 {left: 0%!important;right: 75%!important;}\n\
	.c1 {left: 25%!important;right: 50%!important;}\n\
	.c2 {left: 50%!important;}\
";
document.head.appendChild(a);

