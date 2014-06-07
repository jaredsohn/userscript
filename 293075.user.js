// ==UserScript==
// @name           Tieba Gold ID
// @description    贴吧自慰金色ID
// @icon           http://tb.himg.baidu.com/sys/portrait/item/0b43e3f1d1c4501a
// @author         Shuangya
// @version        1.0
// @require        http://libs.baidu.com/jquery/1.9.1/jquery.min.js
// @include        *
// ==/UserScript==
(function(){
	if (typeof(PageData)=="undefined" || typeof(PageData.user)=="undefined") {
		console.log('undefined PageData');
		return false;
	}
	var userinfo=PageData.user;
	if (userinfo.is_login==true) { //已登录
		$('body').append('<style>.sy_golden_id{display:inline-block;height:18px;line-height:18px;background:url(/tb/static-common/img/icons/golden_bg.png) no-repeat 0 0;padding-left:2px;color:#b87226}.sy_golden_id span{background:url(/tb/static-common/img/icons/golden_bg.png?t=140123172413) no-repeat right -18px;display:inline-block;height:18px;line-height:18px;padding-left:1px;padding-right:3px;color:#b87226}</style>');
		var uid=userinfo.user_id;
		var datastr='{"user_id":'+uid+'}';
		$('.tb_icon_author').each(function(index,element){
			if ($(element).attr('data-field')==datastr) {
				console.log('Element:'+$(element).html());
				var thisa=$(element).find('a');
				$(thisa).addClass('sy_golden_id');
				var newhtml='<span>'+$(thisa).html()+'</span>';
				$(thisa).html(newhtml);
				console.log('New html:'+newhtml);
			}
		});
		$('.d_name').each(function(index,element){
			if ($(element).attr('data-field')==datastr) {
				console.log('Element:'+$(element).html());
				var thisa=$(element).find('a');
				$(thisa).addClass('sy_golden_id');
				var newhtml='<span>'+$(thisa).html()+'</span>';
				$(thisa).html(newhtml);
				console.log('New html:'+newhtml);
			}
		});
	}
})();