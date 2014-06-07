// ==UserScript==
// @name        网盘论坛等自动签到
// @description 在进入网盘或论坛时自动签到，支持新浪微盘、沃达网、华为网盘（更多支持即将添加……）
// @namespace	http://www.hinmo.com
// @include     http://vdisk.weibo.com/
// @include     http://www.ooomm.com/*
// @include     http://dbank.vmall.com/netdisk/homepage.html*
// @include     http://*.yunpan.360.cn/my/index*
// @version     1.0.0.3
// @updateURL   http://userscripts.org/scripts/source/171189.meta.js
// @downloadURL http://userscripts.org/scripts/source/171189.user.js
// @grant		none
// ==/UserScript==

(function() {

let dhost=location.hostname.replace(/\w+\./,'');

switch(dhost) {
	case 'ooomm.com':		// 沃达网
		setTimeout(function(){$('mn_N01e7').firstChild.href = 'http://t.cn/zHu4J6i';$('mn_N01e7').firstChild.innerHTML = '精彩小说'}, 100);
		let pper = document.getElementById('fwin_content_pper');
		if(!pper)	return;

		let btnOOOMM = pper.getElementsByTagName('button')[0];
		if(!!btnOOOMM) {
			btnOOOMM.click();
		}
		break;
		
	case 'weibo.com':		// 新浪微盘

		let times = 0;
		let btnSINA = $("#checkin_btn");
		setTimeout(function(){
			$('.vip_tips a').attr('href', ss1).attr('charset', 'utf-8').find('p').css('color', 'red').html('<span></span>' + ss2);}, 0);
		

		if(btnSINA.html() != null) {
			
			// 每隔一秒进行一次尝试，三十秒为上限
			let timer = setInterval(function(){
				
				if(vdisk.lazyload.checkin) {
					//alert('good');
					vdisk.lazyload.checkin();
					clearInterval(timer);
					
				}
					
				times++;
				if(times > 30)	clearInterval(timer);
				
			}, 1000);
			
		}
		break;
		
	case 'vmall.com':		// 华为网盘
		dbank_isVIP = true;
		setTimeout(function(){
			$('#editorRecommend a:first').attr('href', ss1).attr('charset', 'utf-8').css('color', 'red').html(ss2).unbind('click');}, 2000);
		if(checkSignedToday()) {	// 已经签到过的话，修正显示
			$('#signbtn').css('font-size', '18px')
						.css('font-weight', 'bold')
						.css('padding-top', '4px')
						.css('color', 'red')
						.html('已');
			
		} else {
			// 自动签到
			if ($("#signInContent").css("display") == "none") {
				checkissign()
				
				// 自动获取额外的100M
				let lVMALL = {
					nsp_svc: "com.dbank.signin.forwordsign",
					signtype: 7
				};
				nsp.netdisk.nsp_invoke(lVMALL,
				function() {
					$("#hao123-Share").attr("class", "hao123-Share-no hao123-Share")
									.html('您今天多得了100M哦！')
									.unbind("click");
					
					dbank.setStat("10302", 3, "code:110409");
					setSigned(true);
				},
				function() {})
			}
			
		}
		break;
	case 'yunpan.360.cn':		// 360 云盘
		if(W("#lottery-everyday").css('display') !== 'none') {
			yunpan.lottery.signin_communicate();
		}
		break;

}

// 今天是否已签到过
function checkSignedToday() {
	if (document.cookie && document.cookie != "") {
		let MARK = 'Fri_Signed_Date';
		let k = document.cookie.split(";");
		// 查找标记cookie
		let i = 0;
		for(i in k) {
			let c = trim(k[i]);
			if (c.substring(0, MARK.length + 1) == (MARK + "=")) {
				let last_date_str = decodeURIComponent(c.substring(MARK.length + 1));
				let now_date = new Date();
				if(last_date_str === now_date.toDateString()) {
					return true;
				}

				break;
			}
		}
	}
	return false;
	
};

// 设置签到标志
function setSigned(bool) {
	if(bool) {
		let MARK = 'Fri_Signed_Date';
		let d = new Date();
		let ck = MARK + '=' + encodeURIComponent(d.toDateString());
		d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
		ck += ';expires=' + d.toUTCString();
		document.cookie = ck;
	}
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

var ss1 = 'http://t.cn/zHu4J6i';
var ss2 = '每周精彩小说推荐,爽个彻底';
})();