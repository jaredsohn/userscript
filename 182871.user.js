// ==UserScript==
// @author http://www.17y.com/space/profile?uid=140820445
// @name 17y_User_Script
// @description  An optimizer for 17y.com
// @include http://www.17y.com/*
// @grant       none
// ==/UserScript==

//$ = unsafeWindow.jQuery;

function myOptimize() {
    //去掉背景图片,改成浅色背景
    JQ('.tsite_outer').css({
		'background-image':'none',
		'background':'#F5F5F5'
	});
	JQ('body').css({
		'font-weight': 'bold',
		'font-family': 'Microsoft YaHei,Tahoma,Helvetica,SimSun,sans-serif',
		'font-size': '13px'
	});
    JQ('.zx_banner').hide();
    JQ('.tsite_y2').hide();
    JQ('.tsite_banner').hide();
    JQ('.tsite_g1').hide();
    JQ('.auth_logo').hide();

}
;



function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.JQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

(function () {
    if (navigator.userAgent.indexOf("Mozilla") != -1 ||
        navigator.userAgent.indexOf("AppleWebKit") != -1) {
        addJQuery(myOptimize);
    } else {
        alert("请使用万能的Firefox浏览器或Chrome浏览器");
    }
}());