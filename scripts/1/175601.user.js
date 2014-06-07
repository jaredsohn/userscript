// ==UserScript==
// @name        神来一句替换人物
// @description 卡通人物替换为发言者的头像
// @namespace   yuxingyc
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct=*
// @include     http://tieba.baidu.com/f?kz=*
// @downloadURL	https://userscripts.org/scripts/source/170882.user.js
// @updateURL	https://userscripts.org/scripts/source/170882.meta.js
// @grant  unsafeWindow
// @version     1.0
// ==/UserScript==
$ = unsafeWindow.$;	
var coverPic="http://imgsrc.baidu.com/forum/w%3D580/sign=2db5568e8b82b9013dadc33b438ca97e/10dfa9ec8a1363278099bf9a908fa0ec08fac727.jpg";
function r(oldPic,coverPic,This)
{

	var p=$(This).closest("div.l_post");
	var t=p.attr("data-field").split(/portrait":"(\w+)"/)[1];
	var topPic="http://tb.himg.baidu.com/sys/portrait/item/ce535fc4cfeea7d2bbc3ce5f8436"+t;	
	return '<div style="position:relative">'+
		'<div style="position:absolute;z-index:3;padding-left:45px;padding-top:92px;"><img width="80" heigth="80" src="'+topPic+'"></div>'+
		'<div style="position:absolute;z-index:2"><img width="200" heigth="200" src="'+coverPic+'"></div>'+
		'<div style="position:absolute:z-index:1"><img width="200" heigth="200" src="'+oldPic+'"></div>'+
		'</div>';
}

$('.BDE_Smiley2').each(function() {
	var a=$(this).attr('src')
$(this).replaceWith(r(a,coverPic,this));
});

$('.BDE_Smiley').each(function() {
	var a=$(this).attr('src');
if (/qw_cat_\d+.(gif)+$/.test(a))
{
$(this).replaceWith(r(a,coverPic,this));
}
});