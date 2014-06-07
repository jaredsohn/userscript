// ==UserScript==
// @name           12306
// @namespace      https://dynamic.12306.cn/
// @include        https://dynamic.12306.cn/*
// @description    A js snippet helps you to buy chinese train ticket online more efficiently.
// @require        http://lib.sinaapp.com/js/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var USERNAME = getCookie('_username');
var PASSWORD = getCookie('_password');
var FROM_STATION_TEXT = getCookie('_from_station_text');  // 出发站名称
var FROM_STATION_TELECODE = getCookie('_from_station_telecode');  // 出发站电报码
var TO_STATION_TEXT = getCookie('_to_station_text');  // 到达站名称
var TO_STATION_TELECODE = getCookie('_to_station_telecode');  // 到达站电报码
var DEPART_DATE = getCookie('_depart_date');  // 出发日期
var DEPART_TIME = getCookie('_depart_time'); // 出发时间

$(document).ready(function() {
	var l = window.location.href;

	if (window.frames.length == 0) {
		//alert(l);
		
		if (l.indexOf('loginAction') >= 0 || l.indexOf('querySingleAction') >= 0 || l.indexOf('confirmPassengerAction') >= 0) {	
			$("body").prepend('<style>p {margin: 5px 0;}</style><div style="padding: 20px; margin: 20px; border: solid 1px #ccc; background-color: #f1f1f1;">'
				+ '<p style="text-align: right;"><a id="lnkToggleSettings" class="ToggleSettings" href="javascript:void(0);">∧</a><a id="lnkToggleSettings" class="ToggleSettings" href="javascript:void(0);" style="display: none">∨</a></p>'
				+ '<p><strong>配置订票信息:</strong></p>'
				+ '<div id="pnlSettings">'
				+ '<p>&nbsp;</p>'
				+ '<p>用户名：<input type="text" id="_username" value="' + USERNAME + '" /></p>'
				+ '<p>密　码：<input type="text" id="_password" value="' + PASSWORD + '" /></p>'
				+ '<p>&nbsp;</p>'
				+ '<p>站名和电报码请在这里查询：<a href="http://wenku.baidu.com/view/6ef22f868762caaedd33d47e.html" target="_blank">http://wenku.baidu.com/view/6ef22f868762caaedd33d47e.html</a></p>'
				+ '<p>&nbsp;</p>'
				+ '<p>出发站名称：<input type="text" id="_from_station_text" value="' + FROM_STATION_TEXT + '" />如：北京西</p>'
				+ '<p>出发站电报码：<input type="text" id="_from_station_telecode" value="' + FROM_STATION_TELECODE + '" />如：BXP</p>'
				+ '<p>到达站名称：<input type="text" id="_to_station_text" value="' + TO_STATION_TEXT + '" />如：长治北</p>'
				+ '<p>到达站电报码：<input type="text" id="_to_station_telecode" value="' + TO_STATION_TELECODE + '" />如：CBF</p>'
				+ '<p>&nbsp;</p>'
				+ '<p>出发日期：<input type="text" id="_depart_date" value="' + DEPART_DATE + '" />如：2012-01-17</p>'
				+ '<p>出发时间：<input type="text" id="_depart_time" value="' + DEPART_TIME + '" />（00:00--24:00, 00:00--06:00, 06:00--12:00, 12:00--18:00, 18:00--24:00）</p>'
				+ '<p><input type="button" id="btnSet" value="设置" /></p>'
				+ '</div>'
				+ '</div>');
			
			if (getCookie('_to_station_text').length > 0) {
				toggleSettings();
			}
			
			$(".ToggleSettings").click(function() {
				toggleSettings();
			});
			
			$("#btnSet").click(function(){
				setCookie('_username', $("#_username").val());
				setCookie('_password', $("#_password").val());
				setCookie('_from_station_text', $("#_from_station_text").val());
				setCookie('_from_station_telecode', $("#_from_station_telecode").val());
				setCookie('_to_station_text', $("#_to_station_text").val());
				setCookie('_to_station_telecode', $("#_to_station_telecode").val());
				setCookie('_depart_date', $("#_depart_date").val());
				setCookie('_depart_time', $("#_depart_time").val());
				
				alert("设置成功");
			});
		}
	}
		
	// 登录页
	if (l == "https://dynamic.12306.cn/otsweb/loginAction.do?method=init"
		|| l == "https://dynamic.12306.cn/otsweb/loginAction.do?method=login") {
		$("#UserName").val(USERNAME);
		$("#password").val(PASSWORD);
		$("#randCode").get(0).focus();
	}
	
	// 车票查询
	if (l == "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init") {
		$("#fromStationText").val(FROM_STATION_TEXT);
		$("#fromStation").val(FROM_STATION_TELECODE);
		$("#toStationText").val(TO_STATION_TEXT);
		$("#toStation").val(TO_STATION_TELECODE);
		$("#startdatepicker").val(DEPART_DATE);
		$("#startTime").val(DEPART_TIME);
		
		$("#submitQuery").get(0).click();
	}
	
	// 预订（单程）
	if (l == "https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=init") {
		$("._checkbox_class").get(0).click();
	}
	
	//$("body").prepend("<div>当前路径：" + window.location.href + "</div>");
});

function toggleSettings() {
	$(".ToggleSettings").toggle();
	$("#pnlSettings").toggle();
}

function setCookie(name, value) {
    var Days = 30;
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return '';
}