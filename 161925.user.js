// ==UserScript==
// @name        Dmzj Manhua
// @author      9尾雪狐
// @namespace   http://weibo.com/gameclamp
// @description 给www.dmzj.com添加一个关灯按钮
// @include     http://manhua.dmzj.com/*
// @match       http://manhua.dmzj.com/*
// @updateURL   https://userscripts.org/scripts/source/161925.meta.js
// @downloadURL https://userscripts.org/scripts/source/161925.user.js
// @grant       none
// @version     1.0.4
// ==/UserScript==
function runit(){
	$(document).ready(function(){
		$(".bigimgborder").css({"z-index":"1001","position":"relative"});
	})
	if(localStorage.light){
		var light = localStorage.light;
	}else{
		var light = "on";
	}
	$("div[style='width:980px;margin:15px auto']").append('<a class="lightbt" style="position:relative;text-decoration:none;margin-left:20px;font-size:1.5em;text-align:center;display: inline-block; height: 30px;width:50px; color:#666666; background-color:rgb(180,180,180);z-index:1001" href="javascript:void(0)">关灯</a>');
	$("body").append('<div style="background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; top: 0px; left: 0px; display: none; height: 100%; width: 100%; z-index: 1000; opacity: 0.85;" id="heimu"></div>');
	if(light == "off"){	
			$("#heimu").css("display","block");
			$(".lightbt").text("开灯");
			localStorage.light = "off";
	};
	$(".lightbt").click(function(){
		if($(".lightbt")[0].innerHTML == "关灯"){
			$("#heimu").css("display","block");
			$(".lightbt").text("开灯");
			localStorage.light = "off";
		}else{
			$("#heimu").css("display","none");
			$(".lightbt").text("关灯");
			localStorage.light = "on";
		}
	});
}
script = document.createElement("script");
script.innerHTML = '(' + runit + ')()';
document.body.appendChild(script);