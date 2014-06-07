// ==UserScript==
// @name           筋肉控透明度
// @namespace      http://userscripts.org/users/580203
// @description    修改筋肉控论坛各处的透明度，让背景能够很好的显示出来...顺便加了去广告功能KUMA
// @author         KUMA
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include        *://*.jinroukong.com/*
// @updateURL      http://userscripts.org/scripts/source/380492.meta.js
// @downloadURL    http://userscripts.org/scripts/source/380492.user.js
// @version        1.6
// @run-at         document-start
// ==/UserScript==
//更新日 2014-04-19 19:19:19

//透明度开始
if(location.href.indexOf('search.php')<0){
	var style=document.createElement('style');
	style.id='kuma_style';
	style.type='text/css';
	style.innerHTML='body[id^="nv_"]>*{opacity:0.8;}#hd{position:relative;z-index:1;}#scbar_type_menu{margin-top:-32px;}#append_parent{opacity:1;}#wp{opacity:1;}#wp>*{opacity:0.8;}#wp>#ct{opacity:1;}#wp>#ct>*{opacity:0.8;}#wp>#ct #postlist{opacity:1;}#wp>#ct .bm{background:rgba(255,255,255,0.8);}#wp>#ct .pls{background:rgba(247,247,247,0.5);}#wp>#ct .ad .plc{background:rgba(247,247,247,0.5);}#wp>#ct .locked{background:rgba(255,255,255,0.5);}#wp>#ct .pl .quote{background:rgba(249,249,249,0.5);}#wp>#ct .cm .psth{background-color:rgba(255,244,221,0.5);}#wp>#ct .cm .pg a{background-color:rgba(255,255,255,0.5);}#wp>#postform{opacity:1;}#wp>#postform .edt .bar{background:rgba(242,242,242,0.5)!important;}#wp>#postform #e_body .area{background:rgba(255,255,255,0);}#wp>#postform #e_body #e_iframe{background:rgba(255,255,255,0);}#wp>#postform .exfm{background:rgba(247,247,247,0.5);}#wp>#postform>#ct{background-color:rgba(255,255,255,0.8)!important;}#wp>#postform>#ct input{background:rgba(255,255,255,0.5);}#wp>#postform>#ct textarea{background:rgba(255,255,255,0.5);}#wp>#postform>#ct select{background:rgba(255,255,255,0.5);}#wp>#postform .ftid a{background-color:rgba(255,255,255,0.5);}#wp>#postform ul.mbw a{background:rgba(247,247,247,0.5);}#wp>#postform #psd{background:rgba(255,255,255,0.8);}#e_menus{opacity:1;}#nv_home[class^="pg_"]>#wp>#ct,#nv_userapp>#wp>#ct{opacity:0.8;background-color:#FFF;}#nv_home[class^="pg_"]>#wp>#ct>*,#nv_userapp>#wp>#ct>*{opacity:1;}#nv_home[class^="pg_"]>#wp>#ct>.mn{background-color:#FFF;}#nv_home[class^="pg_"]>#wp>#ct .p_pop{margin-top:-215px;}body{background-color:rgba(255,255,255,0)!important;}#append_parent{opacity:1;}.dxksst_floor>div{background-color:rgba(250,250,250,0.5)!important;}.dxksst_floor textarea{background:rgba(255,255,255,0.5);border-color:#CCC;}.dxksst_floor td[bgcolor="#fafafa"]{background-color:rgba(250,250,250,0.5)!important;}body[id^="nv_"]{background-position:50% 50%!important;background-size:cover!important;min-height:100%;}html{background:none;height:100%;}';
	document.getElementsByTagName('head')[0].appendChild(style);
}
//透明度结束
var kuma=jQuery.noConflict();
//背景自适应开始
kuma(document).ready(function(){
	if(kuma('body:first').css('background-attachment')!='fixed' || kuma('body:first').css('background-repeat')=='repeat'){
		kuma('#kuma_style').html(kuma('#kuma_style').html().replace('body[id^="nv_"]{background-position:50% 50%!important;background-size:cover!important;min-height:100%;}html{background:none;height:100%;}'));
	}
//背景自适应结束
//删除广告开始
	kuma('.titletext').each(function(){
		if(kuma(this).html()=='广告菌'){
			kuma(this).parents('.area').remove();
		}
	});
	kuma('.a_cn,.a_pb').remove();
	if(location.href.indexOf('search.php')>0){
		kuma('iframe').parents('.mtw').remove();
	}
//删除广告结束
});