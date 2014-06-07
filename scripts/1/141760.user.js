// ==UserScript==
// @name        Auto sign in for TieBa in BaiDu
// @namespace   http:www.sbwtw.cn/
// @description 当浏览“我喜欢”的贴吧时自动签到
// @include     http://tieba.baidu.com/f?kw=*
// @include     http://tieba.baidu.com/f?*&kw=*
// @version     1.0.5
// @author      sbwtws@gmail.com
// ==/UserScript==

/**
 * 		v1.0.5
 * 			加快签到速度并防止漏签,增加对个别吧的兼容
 *
 * 		v1.0.3
 * 			解决了部分吧名为繁体无法签到的问题。
 *
 * 		v1.0.2：
 * 			解决了签到后没有显示“已签到”的问题。
 * */

//jQuery
var JQueryDiv = document.createElement("div");
JQueryDiv.setAttribute("onclick", "return $;");
$ = JQueryDiv.onclick();

//vars
var bar_name=unsafeWindow.PageData.forum.name;
var tbs=unsafeWindow.PageData.tbs;
var is_like=unsafeWindow.PageData.user.is_like;
var is_sign=unsafeWindow.PageData.is_sign_in;

//签到
function sign(){
	if(is_like&&!is_sign){
		//发送
		$.post("http://tieba.baidu.com/sign/add","ie=utf-8&kw="+bar_name+"&tbs="+tbs,function callback(Ajax_data){
			if(!Ajax_data.error){
				//成功
				is_sign=1;
				var pos_x="-336px";
				var pos_y=$('.sign_btn2').css("background-position").split(" ")[1];
				var inner_span="<span class='sign_keep_span'>连续签到<span id='sign_btn_keep' class='sign_btn_keep'>"+Ajax_data.data.uinfo.cont_sign_num+"</span>天</span>";
				$('.sign_btn2').css("background-position",pos_x+" "+pos_y);
				$('.sign_btn2').append(inner_span);
			}
		},"json");
	}
}

//定时器型
setTimeout(sign,100);

//事件型
window.addEventListener('load',sign,false);
