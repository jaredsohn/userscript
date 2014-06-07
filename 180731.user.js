// ==UserScript==
// @name       显示吧务等级
// @version    0.2
// @description by huhu（h573980998）
// @namespace   http://jibushengdan.tk/
// @include     http://tieba.baidu.com/f?ct=*
// @include     http://tieba.baidu.com/p/*
// @updateURL      https://userscripts.org/scripts/source/180731.meta.js
// @downloadURL    https://userscripts.org/scripts/source/180731.user.js
// @grant     GM_addStyle
// @grant     unsafeWindow
// @run-at      document-end
// @license     Copyleft: All rights reversed.
// ==/UserScript==

//设置
var dbw=false;//是否隐藏吧务标签(true or fasle)
var xtb=0;//当显示吧务标签时，等级标签应该插入到吧务标签上面还是下面，0代表上面、1代表下面 (默认在上面)
var $ = unsafeWindow.$;
function getlv (author) {
	var l=author.grade_level;
	return'<div class="d_badge d_badge_icon'+(l<4?'1':(l<10?('2'+(l<6?'':(l<8?'_1':'_2'))):(l<16?('3'+(l<12?'':(l<14?'_1':'_2'))):'4')))+'" title="本吧头衔'+l+'级，经验值'+author.grade_exp+'"><div class="d_badge_title ">'+author.grade_name+'</div><div class="d_badge_lv">'+l+'</div></div>';
}
function run () {
	if(!unsafeWindow.PageData.thread)return;
	$('.l_post').each(function(){
		var a=$(this).data('field').author;
		if(a.has_grade&&a.bawu)xtb==1?$(this).find('.l_badge').append(getlv (a)):$(this).find('.l_badge').prepend(getlv (a));
	});
}

run();
if(dbw)GM_addStyle('.d_badge.d_badge_bawu1, .d_badge.d_badge_bawu2 {display: none;}');
