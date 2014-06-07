// ==UserScript==
// @name           返利提示
// @namespace      LuciferSheng
// @description    提示并自动使用返利链接
// @include        http://www.360buy.com/*
// @include        http://www.newegg.com.cn/*
// @include        http://www.yihaodian.com/*
// @include        http://*.yihaodian.com/*
// @include        http://www.dangdang.com/*
// @include        http://www.amazon.cn/*
// @version           1.01
// ==/UserScript==

//autoupdater
//new Updater({name: "返利提示",id: "87429",version: "1.01"}).check();

(function(){

	function setCookie(c_name, value, expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie = c_name + '=' + escape(value) + ((expiredays==null) ? '' : ';expires=' + exdate.toGMTString());
	};
		
	function getCookie(c_name){
		if (document.cookie.length > 0){
			c_start = document.cookie.indexOf(c_name + '=');
			if (c_start != -1){
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(';',c_start);
				if (c_end == -1){c_end = document.cookie.length;};
				return unescape(document.cookie.substring(c_start,c_end));
			}
		};
		return '';
	};
	
	var fllink_360buy = 'http://click.linktech.cn/?m=360buy&a=A100070444&l=99999&l_cd1=0&l_cd2=1&u_id=vfans_1_gm&tu=http%3A%2F%2Fwww.360buy.com%2F';
	var fllink_newegg = 'http://click.linktech.cn/?m=newegg&a=A100070444&l=99999&l_cd1=0&l_cd2=1&u_id=vfans_1_gm&tu=http%3A%2F%2Fwww.newegg.com.cn%2F';
	var fllink_yihaodian = 'http://click.linktech.cn/?m=yihaodian&a=A100070444&l=99999&l_cd1=0&l_cd2=1&u_id=vfans_1_gm&tu=http%3A%2F%2Fwww.yihaodian.com%2F';
	var fllink_dangdang = 'http://click.linktech.cn/?m=dangdang&a=A100070444&l=99999&l_cd1=0&l_cd2=1&u_id=vfans_1_gm&tu=http%3A%2F%2Fwww.dangdang.com%2F';
	var fllink_amazon = 'http://click.linktech.cn/?m=joyo&a=A100070444&l=99999&l_cd1=0&l_cd2=1&u_id=vfans_1_gm&tu=http%3A%2F%2Fwww.amazon.cn%2F';
	
	switch (location.hostname){
		case 'www.360buy.com':
			if(getCookie('websiteId').search('A100070444vfans_1_gm') != -1) {
				//alert('现在购物可以有返利咯～');
			} else {
				alert(getCookie('npin') + '要用返利哦~');
				window.location = fllink_360buy;
			}
			break;
		case 'www.newegg.com.cn':
			if(getCookie('NewAdvEffectMonitor').search('A100070444vfans_1_gm') != -1) {
				//alert('现在购物可以有返利咯～');
			} else {
				alert('要用返利哦~');
				window.location = fllink_newegg;
			}
			break;
		case 'www.yihaodian.com':
			//alert(getCookie('LTINFO').search("A100070444vfans_1_gm"));
			if(getCookie('LTINFO').search("A100070444vfans_1_gm") != -1) {
				//alert('现在购物可以有返利咯～');
			} else {
				alert('要用返利哦~');
				window.location = fllink_yihaodian;
			}			
			
			break;
		case 'www.dangdang.com':
			if(getCookie('from').search("A100070444vfans_1_gm") != -1) {
				//alert('现在购物可以有返利咯～');
			} else {
				alert('要用返利哦~');
				window.location = fllink_dangdang;
			}			
			
			break;		
		case 'www.amazon.cn':
			if(getCookie('vfans')) {
				//alert('现在购物可以有返利咯～');
			} else {
				alert('要用返利哦~');
				setCookie('vfans', 1, 1)
				window.location = fllink_amazon;
			}			
			
			break;			
	}
	
	
	
})();