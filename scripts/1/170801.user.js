// ==UserScript==
// @name 	 	   12306.CN 订票助手 For Firefox&Chrome
// @namespace		   http://www.u-tide.com/fish/
// @author			iFish@FishLee.net <ifish@fishlee.net> http://www.fishlee.net/
// @developer		iFish
// @contributor		
// @description		帮你订票的小助手 :-)
// @match			http://dynamic.12306.cn/otsweb/*
// @match			https://dynamic.12306.cn/otsweb/*
// @match			https://www.12306.cn/otsweb/*
// @icon			http://www.12306.cn/mormhweb/images/favicon.ico
// @run-at			document-idle
// @version 		5.0.0
// @updateURL		http://static.fishlee.net/_softdownload/12306_ticket_helper.user.js
// @supportURL		http://www.fishlee.net/soft/44/
// @homepage		http://www.fishlee.net/soft/44/
// @contributionURL	https://me.alipay.com/imfish
// @contributionAmount	￥5.00
// ==/UserScript==

//=======START=======

var version = "5.0.0";
var updates = [
	"* 修正订单提交页面助手无法工作的问题",
	"* 修改保存密码的操作流程",
	"* 修正铺位选择的席别代码",
	"+ 车次类型过滤加入城铁(C)"
];

var faqUrl = "http://www.fishlee.net/soft/44/faq.html";
//标记
var utility_emabed = false;
var compVersion = "5.80";


//#region -----------------UI界面--------------------------

function initUIDisplay() {
	injectStyle();
}

/**
 * 将使用的样式加入到当前页面中
 */
function injectStyle() {
	var s = document.createElement("style");
	s.id = "12306_ticket_helper";
	s.type = "text/css";
	s.textContent = "\
.fish_running, .fish_clock, .fish_error, .fish_ok {line-height:20px;text-indent:18px;background-repeat:no-repeat;background-position:2px 50%;font-size:12px;}\
.fish_running{background-image:url(data:image/gif;base64,R0lGODlhEAAQALMPAHp6evf394qKiry8vJOTk83NzYKCgubm5t7e3qysrMXFxe7u7pubm7S0tKOjo////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAPACwAAAAAEAAQAAAETPDJSau9NRDAgWxDYGmdZADCkQnlU7CCOA3oNgXsQG2FRhUAAoWDIU6MGeSDR0m4ghRa7JjIUXCogqQzpRxYhi2HILsOGuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSXmMmjhLAQjSWDAYQHmAz8GVQPIESxZwggIYS0AIATYAvAdh8OIQJwRAQbJkdjAlUCA6KfU0VEmyGWgWnpNfcEAoAo6SmWtBUtCuk9gjwQKeQAeWYQAHIZICKBoKBncTEQAh+QQJCAAPACwAAAAAEAAQAAAEWvDJORejGCtQsgwDAQAGGWSHMK7jgAWq0CGj0VEDIJxPnvAU0a13eAQKrsnI81gqAZ6AUzIonA7JRwFAyAQSgCQsjCmUAIhjDEhlrQTFV+lMGLApWwUzw1jsIwAh+QQJCAAPACwAAAAAEAAQAAAETvDJSau9L4QaBgEAMWgEQh0CqALCZ0pBKhRSkYLvM7Ab/OGThoE2+QExyAdiuexhVglKwdCgqKKTGGBgBc00Np7VcVsJDpVo5ydyJt/wCAAh+QQJCAAPACwAAAAAEAAQAAAEWvDJSau9OAwCABnBtQhdCQjHlQhFWJBCOKWPLAXk8KQIkCwWBcAgMDw4Q5CkgOwohCVCYTIwdAgPolVhWSQAiN1jcLLVQrQbrBV4EcySA8l0Alo0yA8cw+9TIgAh+QQFCAAPACwAAAAAEAAQAAAEWvDJSau9WA4AyAhWMChPwXHCQRUGYARgKQBCzJxAQgXzIC2KFkc1MREoHMTAhwQ0Y5oBgkMhAAqUw8mgWGho0EcCx5DwaAUQrGXATg6zE7bwCQ2sAGZmz7dEAAA7); color: green;}\
.fish_clock{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG/SURBVHjapJM/S8NQFMVvpaVfoEKojWL9U3DLIqjoooJDu/sFmnQoiIujQz+Aix3a1FUQXIR2UFA6+WeRUhBprERroGTopg6lSeo7iY1pq4sNHPpy3+8c7n0v9XW7XRrl8SFAlmVvbYFpmynOJHzXKkwlphOmxx4oiiL5sbAsi1KpFOVyuWQwGMzEYjEuGo0Sx3E2qOu6oKqqoChKst1u7zO2wNifDrLZLNbJUCgkLy2vEM/zv7araRrd3lxTq9US2WshnU7TGDZM01zwBwKZxaVlCkd4MtmxQDXlyVbvHXtgwMIDrx3Q6XS2Z2bnufDEJJkWuWIt2/LWwICFxw0wDCM+PTPXB0K4IGiwDhYeeP3fHQjjXIQMq3/mev3J/l0fqIOFxxtAxi+fg/rsBOztSE7QVpwpQT2PN6Dy1mgIYX7KNZcvipQ5yA+Fosum1rA93jMo1R6q7oxX50Va20wMzd4TWHi8t3BSvb/T1bpz4qsbf5vBgIXHDWB3+vj58b5fPj9jc9fcex8U9sCAhcc7Au1mDgtN7VU8Oz7SL0un9PbyTBYzQVijhj0wYOFxP2VJkv71Z8rn807AKM+XAAMArp1CsEFrDIIAAAAASUVORK5CYII=); color: blue;}\
.fish_error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVHjapJO/T1pRFMe/Dx7ypEXri4lUGUhsHF40hODSpQ61cTH+2HSoZaF1dHSxpU7+Ca04NE7dyuBiapcuLFokTdD4A01awNdBSkAf8ut5zhUoxq3e5OS+nPv5nnvuyfdJpmniPksSBd68aM1pFDMU4xS+ei5GsUHxmSLRJD9+hcx7rVqFZWwMtc3NIGy2Zam31yX19ABdXTdgNuszdd1nptNBlMtviQ0TC0ujg1LgGWNByelctQ4M4G8qhfN4HLmDA6HvpJzq9eJRXx+qlDPz+deUDrd9+i6KoFouazVg2erx4M/uLn5FItGLk5NX/qUliYO+I2o2C4vLBWaYZQ1rRYFyqTQDVXXl02mcb29HbXb7S+/CwjqKRSAaDXlHRqYwOoqdxUUww6zQNApUSqVxuaMDF8kk2hTlgxYIHMMwaHSxEB2/a4g7u7sjzDDLmn8dXF35ZJsNVWrzycTEOtxuYH//lpjWezqbZoZZ1rQ+AXyj3eEQO7a27oj9s7OhVkZoWjqIFXUdD1QVub29L3fEk5MhXF7y2RwzzLKmdQYb+UwGiqLwO6duiVdWxM2GrvfTfOaZYZY1TScmvE7NKsvf3B6PyzE8jB9ra6DJR2TTnBYXSNIcbfN021Mjl8Pv09OzaqXyXIvnE6LAT00RRlLa21cfk1kesgNpULBab5xITiUHokADzJDJioYhjDSUKNafUKlgaHAwXCCHJQ8Pz1JHRyhQm2RhEfzNOT5jhlnWNJ+w0y/918/kPzbrf+M91rUAAwCuQDz94e2kLwAAAABJRU5ErkJggg==); color: blue;}\
.fish_ok{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHsSURBVHjapFNBSBtBFH2xgoqmKipEC6XkYqhUWXOxUAQhpyJ4Wgi0l0rNsdBbL/WgF2/eV8hNSBF68uhFkOrFhCAGS8mWgmYjG9lCKVGTuP1vsrvuIac68HZm/n/vz5/9fyKu6+IhI8IA5k4kbHsuSAsWBZpnKwh2BTlBySfGdTmcAX7kOJc5r5hfhyw7/86t21/EVVbgmjb6yPG4SqsyONtWGaz0Dk8aYzMf0R+b65ju3+oR7OImrp3vGdluJd646KKj1ZK0H0XXRqfeo390Emg6HUEfOeQqjQwVoNFAOvpkPjYw8kw2NRgfFtQchm8jh1xqggDNJhYHY3Jy41IhmXodrDvZyKWG2m4vA23gcR9wa6m7Jue1YO2PsI1casIB5GPBWM8ilZLyvFzu+BPNwyz29oDM5+W2JhSg8NsqaRSTMHycxfg4MDHRJlUqgCWHO/IvyRGu0gQB5D671Z+mlpiZFXEejjSInrw/OS4wjiWwNFx8ehZnRVNpwlXI/SrXqvbFOfS3TxWRAtNpwxfTRw651AQZSE1Lrfrd6mmhZky96IGejuJgX5rL9HpbrvBKbHbFxunJDa6F67e0X0YsLWHr6uouc/StXi3m/yCRkNTjbXBNG33kkEtN8Jh2Pv3fY9I3vLfwkPFPgAEApRUigcIVl3AAAAAASUVORK5CYII=); color: purple;}\
.outerbox{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;color:#4c4c4c;width:100%;margin: 10px auto;}\
.box{border:1px solid #c6c6c6;}\
.box .title{padding:5px;line-height:23px;color:#fff;background:-webkit-linear-gradient(#707070,#2c2c2c 90%);background:-moz-linear-gradient(#707070,#2c2c2c 90%);background-color:#707070; position: relative;}\
.box .title a{color:#fff;}\
.box .time-comp{color:#fff;position:absolute;margin:2px;right:2px;top:2px;padding:1px 12px;border-radius:12px;text-shadow:0px 1px 2px rgba(0,0,0,0.6);box-shadow:0px 1px 1px rgba(255,255,255,0.2),inset 0px 0px 8px rgba(0,0,0,0.8);}\
.box .content{padding:5px;background-color:#fff}\
.box table{border-collapse:collapse;width:98%}\
.box table td{padding:5px;}\
.box table .tfooter{text-align:center;height:24px;background:-webkit-linear-gradient(#ffffff,#fafafa 90%);background:-moz-linear-gradient(#ffffff,#fafafa 90%);color:#707070;text-shadow:1px 1px 1px #fff,2px 2px 1px rgba(0,0,0,0.2);}\
.box table .tfooter a{color:#707070;}\
.box input[type=button],.fish_button{font-size:12px;font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;padding:3px 6px;letter-spacing:1px;border-radius:3px;cursor:pointer;}\
.box .name,.box .caption,.box .caption td{font-weight:bold;-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;background:-webkit-linear-gradient(#fafafa,#f0f0f0 90%);background:-moz-linear-gradient(#fafafa,#f0f0f0 90%);background-color:#fafafa;}\
.box .lineButton{margin:4px 6px 4px 2px;}\
.lineButton{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;line-height:16px;margin-right:6px;padding:2px 4px;color:#4c4c4c;backround:#f5f5f5;background:-webkit-linear-gradient(#fff,#f0f0f0);background:-moz-linear-gradient(#fff,#f0f0f0);border:1px solid #c8c8c8;border-radius:3px;box-shadow:inset 0 1px 3px rgba(255,255,255,0.2),0 0 3px rgba(0,0,0,0.2);text-shadow:.0em .1em .1em rgba(255,255,255,0.8);-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;cursor:pointer;}\
.lineButton:hover{background:#f0f0f0;text-shadow:.0em .1em .1em #fff;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s;}\
.lineButton:active{background:#f2f2f2;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#f2f2f2),color-stop(90%,#f2f2f2));background:-moz-linear-gradient(center bottom,#f2f2f2 0%,#f2f2f2 100%);box-shadow:inset 0px 1px 3px #cccccc,0px 0px 0px #0968bb;border-color:#d6d6d6;border-top-color:#d0d0d0;border-left-color:#d0d0d0;border-right-color:#e2e2e2;border-bottom-color:#e2e2e2;}\
.fishTab{border:5px solid #E5D9EC;font-size:12px;font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;}\
.fishTab .innerTab{border-width:1px;border-style:solid;border-color:#C7AED5;background-color:#fff}\
.fishTab .tabNav{font-weight:bold;color:#F5F1F8;background-color:#C7AED5;line-height:25px;overflow:hidden;margin:0px;padding:0px}\
.fishTab .tabNav li{float:left;list-style:none;cursor:pointer;padding-left:20px;padding-right:20px}\
.fishTab .tabNav li:hover{background-color:#DACAE3}\
.fishTab .tabNav li.current{background-color:#fff;color:#000}\
.fishTab .tabContent{padding:5px;display:none}\
.fishTab .tabContent p{margin:10px 0px 10px 0px}\
.fishTab div.current{display:block}\
.fishTab div.control{text-align:center;line-height:25px;background-color:#F0EAF4}\
.fishTab input[type=button]{padding:5px}\
.hide{display:none}\
.fish_area {font-weight:bold;background: -webkit-linear-gradient(#cfcfcf 0%, #bfbfbf 50%, #b5b5b5 50%, #cacaca 100%); color: #555; text-shadow: 1px 1px 2px #ddd;}\
.fish_area td {font-weight:bold; text-align:center;}\
.fish_sep td{border-top:1px solid #d0d0d0;}\
.fish_button{color:#fff;line-height:normal;margin:0 5px;background:#0f7edb;background:-webkit-linear-gradient(#0c96f8,#1960b7);background:-moz-linear-gradient(#0c96f8,#1960b7);border:1px solid #186fb7;box-shadow:inset 0 1px 3px rgba(255,255,255,0.2),0 0 3px rgba(0,0,0,0.3);text-shadow:.0em .1em .1em rgba(50,50,50,0.8);-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;}\
.fish_button:hover{background:#099bff;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#077ccc),color-stop(90%,#0abaff));background:-moz-linear-gradient(center bottom,#077ccc 0%,#0abaff 100%);border-color:#088be5;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s;}\
.fish_button:active{background:#0885e7;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#066ab8),color-stop(90%,#099fff));background:-moz-linear-gradient(center bottom,#066ab8 0%,#099fff 100%);border-color:#0777cf;box-shadow:inset 0px 1px 2px #0770c3,0px 0px 0px #000;border-top-color:#0775ca;border-left-color:#0775ca;border-right-color:#087edb;border-bottom-color:#087edb;}\
tr.steps td{background-color:#E8B7C2!important;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s}\
tr.stepsok td{background-color:#BDE5BD!important;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s}\
tr.steps span.indicator{display:inline-block!important}\
tr.stepsok span.indicator{display:inline-block!important}\
.highlightrow td{background-color:#D0C0ED!important;color:red}\
#randCodeTxt{font-weight:bold;font-size:18px;text-align:center;padding:3px 10px 3px 10px;font-family:verdana!important;text-transform:uppercase}\
tr.append_row{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;}\
#acathur{color:#fcfcfc;font-weight:bold;font-family:Segoe UI,Lucida Grande,Arial,Helvetica,Sans-serif;text-decoration:underline;text-shadow:0 0 1px #000,0px 0px 6px rgba(0,0,0,0.8);}\
div.gridbox_light .odd_light,div.gridbox_light .ev_light{background:-webkit-linear-gradient(#fff,#f6f6f6);background:-moz-linear-gradient(#fff,#f6f6f6);text-shadow:.0em .1em .1em rgba(255,255,255,0.8);}\
.validCell{ background:-webkit-linear-gradient(#e0ebff, #c7d9ff)!important; background:-moz-linear-gradient(#e0ebff, #c7d9ff)!important; color:green; }\
.validRow{background:-webkit-linear-gradient(#ffe0e5, #ffc7d0)!important;background:-moz-linear-gradient(#ffe0e5, #ffc7d0)!important;color:#700012;}\
.unValidRow{opacity:0.8;}\
.unValidCell{opacity:0.8;}\
.btn130_2 {text-shadow:none;}\
.warning{color:red;}\
input[type=checkbox].current{color:red;font-weight:bold;}\
span.leftTicketStatusSpan{color:green; font-weight:bold;}\
.gridtb { width:100%!important; }\
.gridtb th {text-align:center;padding: 5px; border-right: 1px solid #ccc; font-weight:bold;-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;background:-webkit-linear-gradient(#fafafa,#f0f0f0 90%);background:-moz-linear-gradient(#fafafa,#f0f0f0 90%);background-color:#fafafa;}\
.gridtb .last {border-right:none;}\
.gridtb td {border-right: 1px dotted #ccc; border-bottom: 1px solid #ccc; padding:5px; text-align: center;}\
.gridtb div {text-align:center;}\
#footRow {border-bottom:none; text-align: left;}\
.gridtb a{display:block; text-align:center;}\
.fish_opt {width:98%;padding:5px;margin:0;overflow:hidden;box-shadow:1px 1px 3px #ccc;border:1px solid #ddd;background-color:#fff;}\
.fish_opt li{width:175px; float:left;}\
.fishDialog {border-radius: 10px;  box-shadow: #7E9BCB 5px 5px 10px; width: 500px; display: none;}\
.fishDialogTitle { font-size:130%; line-height: 40px; text-align: center;font-weight: bold;color: #fff;background: -webkit-linear-gradient(#7292C6, #40649F);background: -moz-linear-gradient(#7292C6, #40649F); border-radius: 10px 10px 0 0;}\
.fishDialogContent { background-color: #fff; padding: 15px; }\
.fishDialogControls { padding: 5px;background-color: #f0f0f0;line-height: 30px;text-align: right; border-radius: 0 0 10px 10px; }\
.fishDialogMask{position:fixed;left:0;top:0;background-color:#4e7896;opacity:.5;z-index:9999;width:100%;display:block;-moz-background-size:40px 40px;-o-background-size:40px 40px;-webkit-background-size:40px 40px;background-size:40px 40px;background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.1) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.1) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,.1) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.1) 75%,transparent 75%,transparent);}\
	";

	document.head.appendChild(s);
}

function injectDom() {
	var html = [];
	html.push('<div id="fishOption" style="width: 600px; display:none; box-shadow: 7px 7px 10px #A67EBC;">');
	html.push('<div class="innerTab">');
	html.push('<ul class="tabNav" default="tabVersion">');
	html.push('<li tab="tabLogin">常规设置</li>');
	html.push('<li tab="tabReg">注册</li>');
	html.push('<li tab="tabFaq">常见问题</li>');
	html.push('<li tab="tabVersion">版本信息</li>');
	html.push('<li tab="tabLog">运行日志</li>');
	html.push('<li tab="tabLoginIE">登录到IE</li>');//获取登录到IE的代码 Add By XPHelper
	html.push('</ul>');
	html.push('<div class="tabContent tabLogin">');
	html.push('<table>');
	html.push('<tr>');
	html.push('<td>重试时间 ');
	html.push('<td>');
	html.push('<td><input type="text" name="login.retryLimit" size="6" value="2000" />');
	html.push('(ms)</td>');
	html.push('<td>');
	html.push('</td>');
	html.push('<td></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div>');
	html.push('<div class="tabContent tabReg" style="text-indent: 20px">');
	html.push('<p>为了阻止地球人他喵地拿作者无偿奉献的助手去卖钱钱，请注册唷。<strong>完全免费申请</strong>。</p>');
	html.push('<p style="color: red;"> <strong style="font-size:16px;">啊嘞……看这里！本助手完全免费啊诸位大人！</strong>任何在第三方网站上出售的软件全他喵的是侵权出售啊！！看到的时候请亲务必记得退款退货打差评向青天大老爷举报啊！！</p>');
	html.push('<p style="color:purple;"> 回家是一个单纯而简单的心愿，希望我们不会变得太复杂……</p>');
	html.push('<p>任何版本之间，功能上没有任何区别，So……不要问作者万一资助的话会有神马新功能，木有的说…… (=￣ω￣=) </p>');
	html.push('<p class="registered" style="display:none;">很高兴认识你，<strong>fishcn@foxmail.com</strong>，谢谢你的出现~~~~已注册版本：<strong>正式版</strong>【<a href="javascript:;" id="unReg">重新注册</a>】</p>');
	html.push('<table class="regTable" style="display:none;width:98%;">');
	html.push('<tr>');
	html.push('<td>请粘贴注册码 【<a href="http://www.fishlee.net/Apps/Cn12306/GetNormalRegKey?v=1" target="_blank" style="color:blue;font-weight:bold;text-decoration:underline;">戳我直接申请注册码啊！为什么你们舍不得戳我啊 ╮(╯▽╰)╭</a>】</td>');
	html.push('</tr><tr>');
	html.push('<td style="text-align:center;"><textarea id="regContent" style="width:98%; height:50px;"></textarea></td>');
	html.push('</tr><tr>');
	html.push('<td><input type="button" id="regButton" value="注册" /></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div>');
	html.push('<div class="tabContent tabVersion" style="text-indent: 20px">');
	html.push('<h4 style="font-size:18px; font-weight:bold; margin: 0px; line-height: 26px; border-bottom: 1px dotted #ccc;">12306 订票助手 <small>ver ' + window.helperVersion + '</small></h4>');
	html.push('<p> 12306 订票助手是一款用于订票的助手软件，嗯……看到这里相信你已经知道它支持神马浏览器了 =。=<strong>完全免费，无需付费使用，仅接受捐助。</strong> </p>');
	html.push('<p style="color: red;"> <strong style="font-size:16px;">啊嘞……看这里！本助手完全免费啊诸位大人！</strong>任何在第三方网站上出售的软件全他喵的是侵权出售啊！！看到的时候请亲务必记得退款退货打差评向青天大老爷举报啊！！</p>');
	html.push('<p style="color:purple;"> 回家是一个单纯而简单的心愿，希望我们不会变得太复杂……</p>');
	html.push('<p> 有很多朋友资助作者，小的感激涕零 ≥ω≤。<a href="http://www.fishlee.net/soft/44/donate.html" target="_blank">戳这里了解捐助详情</a>。 </p>');
	html.push('<p style="font-weight:bold;">当前版本更新内容</p>');
	html.push('<ol >');
	$.each(utility.getPref("updates").split('\t'), function (i, n) {
		html.push("<li style='padding:0 0 6px 20px;list-style:none;'>" + n + "</li>");
	});
	html.push('</ol>');
	html.push('</div>');
	html.push('<div class="tabContent tabFaq">');
	html.push('<table>');
	html.push('<tr>');
	html.push('<td colspan="4"> 你在订票过程中可能……会遇到各种问题，由于介个12306网站本身呢……木有没有任何介绍 ╮(╯▽╰)╭ ，所以老衲整理了相关问题，供客官参考。如果还有不明白的问题，加群讨论呗  (=￣ω￣=) 。 <br /><br />');
	html.push('1.放票非正点也，So在将近放票的时候，务必保持刷新状态哈，而且……当整点没有放票时，不要放弃继续刷新喔；<br />\
2.动车都是11点放票撒，切记切记；<br />\
3.第一波放票悲催地木有订到时，请耐心等待，因为现在放票有N多节点，随时会有票出来，晚很久才放票也正常，铁老大经常秀下限嘀；<br />\
4.如果您的车票很难买，请尽量发动你的七大姑八大姨神马的一堆朋友过来集体帮忙，同时建议用多个浏览器刷票，因为缓存的关系不同的浏览器出现票的时间可能不同；<br />\
5.最新版3.9.0中的预先选择铺位功能有点淡化了……要用的话，使用优选席别，第一个优选的将会被自动选中 ^_^<br />\
<br />\
好了，废话说完鸟，祝大家买票顺利，贫僧只希望不会帮倒忙就好了 ╮(╯▽╰)╭<br />\
如果您还有问题的话，<a href="http://www.fishlee.net/soft/44/tour.html" target="_blank">建议点击这里查看教程~~~~</a>\
');
	html.push('</td></tr>');
	html.push('<tr style="display:none;">');
	html.push('<td><a href="http://www.fishlee.net/soft/44/12306faq.html" target="_blank">订票常见问题</a></td>');
	html.push('<td><a href="http://www.fishlee.net/soft/44/faq.html" target="_blank">助手运行常见问题</a></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div><div class="tabLog tabContent"><div>下面是当前页面的记录。如果您的助手遇到功能上的问题，请全部复制后发成邮件给作者：ifish@fishlee.net 以便于老衲解决问题。<span style="color:red;font-weight:bold;">请在发送前务必剔除记录中包含的个人隐私如密码等信息。</span></div><textarea id="runningLog" style="width:100%;height:200px;"></textarea></div>');
	//获取登录到IE的代码 Add By XPHelper
	html.push('<div class="tabLoginIE tabContent"><div><strong>先在IE中打开 https://dynamic.12306.cn/otsweb，</strong>再将以下代码复制到IE浏览器的地址栏。确认地址栏最前面有“javascript:”字样，没有请手动加上（IE10会自动删除这样的代码），然后敲回车，等待页面刷新后，即可自动登录。</div><textarea id="LoginIECode" style="width:100%;height:200px;"></textarea></div>');
	html.push('<div class="control">');
	html.push('<input type="button" class=" fish_button close_button" value="关闭" />');
	html.push('</div>');
	html.push('</div>');
	html.push('</div>');

	$("body").append(html.join(""));

	var opt = $("#fishOption");
	$("#regButton").click(function () {
		var sn = $.trim($("#regContent").val());

		var rt = utility.verifySn(false, "", sn);
		if (rt.result != 0) {
			alert("很抱歉, 注册失败. 代码 " + rt.result + ", " + rt.msg);
		} else {
			utility.setSnInfo("", sn);
			alert("注册成功, 请刷新浏览器。\n注册给 - " + rt.name + " , 注册类型 - " + rt.typeDesc.replace(/<[^>]*>/gi, ""));

			try {
				utility.getTopWindow().location.reload();
			} catch (e) {
				alert("权限不足无法刷新页面， 请手动刷新当前页！");
			}
		}
	});
	$("#unReg, a.reSignHelper").live("click", function () {
		if (utility.regInfo.partner != 1 && utility.regInfo.result == 0 && utility.regInfo.type != 'DEMO') {
			if (!confirm("确定要重新注册吗?")) return;

			utility.setSnInfo("", "");
			utility.getTopWindow().location.reload();
		} else {
			utility.getTopWindow().utility.showOptionDialog("tabReg");
		}
	});

	//初始化设置
	utility.configTab = utility.fishTab(opt);
	opt.find("input[name]").each(function () {
		var el = $(this);
		var key = el.attr("name");
		var value = window.localStorage.getItem(key);
		if (!value) return;

		if (el.attr("type") == "checkbox") {
			el.attr("checked", value == "1");
		} else {
			el.val(value);
		}
	}).change(function () {
		var el = $(this);
		var key = el.attr("name");

		if (el.attr("type") == "checkbox") {
			window.localStorage.setItem(key, el[0].checked ? 1 : 0);
		} else {
			window.localStorage.setItem(key, el.val());
		}
	});
	$("#configLink, .configLink").live("click", function () {
		var el = $(this);
		var dp = el.attr("tab");
		console.log("require to show tab " + dp);

		utility.getTopWindow().utility.showLoginIE();
		utility.getTopWindow().utility.showOptionDialog(dp || "");
	});
	//新版本更新显示提示
	if (utility.getPref("helperVersion") != window.helperVersion) {
		//清空禁止标记位
		utility.clearFeatrueDisabled();
		//加入已知的不可用的功能标记
		var preDisabled = ['ontimequeuecount'];
		if (!utility.isAdvancedSupport()) preDisabled.push("ontimeleftticket");
		utility.setPref("disabled", preDisabled.join("|"));
		utility.disabledFeaturesCache = null;
		//删除Cookies，反检测。
		(function () { var p = new Date(); p.setTime(p.getTime() - 1000); for (var i = 0; i < arguments.length; i++) document.cookie = (arguments[i] + "=; path=/; domain=.12306.cn; expires=" + p.toGMTString()); })("helper.regUser", "helper.regSn");
		//删除联系人
		utility.setPref("pas", "");

		//检测老版本设置
		if (utility.getAudioUrl().indexOf("github") != -1 || utility.getAudioUrl().indexOf("resbak.") != -1) {
			utility.resetAudioUrl();
		}

		utility.setPref("helperVersion", window.helperVersion);
		//仅顶层页面显示
		try {
			if (parent == self)
				utility.showOptionDialog("tabVersion");
		} catch (ex) {
			//跨域了，也是顶级
			utility.showOptionDialog("tabVersion");
		}
	}

	//撤销禁用功能
	$(".resetFuncFlag").live("click", function () {
		var fun = this.dataset.function;
		var idx = $.inArray(fun, utility.disabledFeatures());
		if (idx == -1) return;

		utility.disabledFeaturesCache.splice(idx, 1);
		utility.disableFeature();
		utility.getTopWindow().location.reload();
	});

	//注册
	var result = utility.verifySn(true);
	if (result.result == 0 && result.type != 'DEMO') {
		var info = opt.find(".registered").show().find("strong");
		info.eq(0).html(result.name);
		info.eq(1).html(result.typeDesc);
	}
	if (result.partner == 1 || result.result != 0 || result.type == "DEMO") {
		opt.find(".regTable").show();

		if (result.result != 0) {
			if (location.pathname == "/otsweb/" || location.pathname == "/otsweb/main.jsp") {
				alert("为了阻止地球人趁火打劫然后拿着老衲免费奉献的东东去卖钱，贫僧斗胆麻烦客官……啊不，施主注册下下，一下子就好了啦！");
				window.open("http://www.fishlee.net/Apps/Cn12306/GetNormalRegKey");
				utility.showOptionDialog("tabReg");
			}
		}
	}
	utility.regInfo = result;
}

//#endregion

//#region -----------------执行环境兼容----------------------

var utility = {
	configTab: null,
	icon: "http://www.12306.cn/mormhweb/images/favicon.ico",
	regInfo: null,
	disabledFeaturesCache: null,
	isWebKit: function () {
		return window.webkitNotifications || false;
	},
	isFirefox: function () {
		return !utility.isWebKit();
	},
	parseJSON: function (text) {
		if (!JSON || !JSON.parse) alert("您的浏览器版本过低，请升级浏览器！");
		else return JSON.parse(text);
	},
	toJSON: function (obj) {
		if (!JSON || !JSON.parse) alert("您的浏览器版本过低，请升级浏览器！");
		else return JSON.stringify(obj);
	},
	disabledFeatures: function () {
		/// <summary>获得当前禁止的功能</summary>
		if (!utility.disabledFeaturesCache) {
			utility.disabledFeaturesCache = (utility.getPref("disabled") || "").split('|');
		}
		return utility.disabledFeaturesCache;
	},
	isfeatureDisabled: function (flag) {
		/// <summary>测试指定的功能是否已经被禁止</summary>
		/// <param name="flag" type="String">测试的功能标记</param>
		return $.inArray(flag, utility.disabledFeatures()) != -1;
	},
	disableFeature: function (flag) {
		if (flag) utility.disabledFeaturesCache.push(flag);
		utility.setPref("disabled", utility.disabledFeaturesCache.join('|'));
	},
	clearFeatrueDisabled: function () {
		/// <summary>清空禁止标记位</summary>
		utility.setPref("disabled", "");
		utility.disabledFeaturesCache = [];
	},
	getScriptVersion: function () {
		/// <summary>获得12306的网站脚本版本</summary>
		return /=([\d\.]+)$/i.exec($("script[src*=/otsweb/]:eq(0)").attr("src") + "")[1];
	},
	checkCompatible: function () {
		var sv = utility.getScriptVersion();
		if (sv != window.compVersion) {
			if (utility.getPref("compWarning") != sv) {
				utility.setPref("compWarning", sv);
				alert("警告：检测到12306已改版，助手功能可能会部分失效。请在正式购票前做好测试，以免耽误您的购票。\n出现任何异常时，请暂时手动或改用IE购票，并留意助手升级。");
			}
			$(".versionWarning").show();

			var istop = false;
			try {
				istop = self == parent;
			} catch (e) {
				istop = true;
			}
			if (!istop) {
				$("body").prepend("<div style='opacity:0.9;z-index:999; position:fixed; left:-350px; top:0px; width: 700px;margin-left:50%; color:#8A0023;border:1px solid #8A0023;line-height: 20px;background: -webkit-linear-gradient(#FFE4EA, #FFC3D1);background: -moz-linear-gradient(#FFE4EA, #FFC3D1);padding: 5px;'>亲，<strong>老衲用旁光发现网站改版鸟</strong>！由于还木有测试当前助手的兼容性，请务必在正式购票前做好测试哈！必要时请先用IE顶着喔。</div>");
			}
		} else {
			$(".versionWarning").hide();
		}
	},
	trim: function (data) {
		if (typeof ($) != 'undefined') return $.trim(data);

		return data.replace(/(^\s+|\s+$)/g, "");
	},
	getTopWindow: function () {
		try {
			if (parent == self) return self;
			else return parent.window.utility.getTopWindow();
		} catch (e) {
			//跨域的话，也是顶层
			return self;
		}
	},
	init: function () {
		$.extend({
			any: function (array, callback) {
				var flag = false;
				$.each(array, function (i, v) {
					flag = callback.call(this, i, v);
					if (flag) return false;
				});
				return flag;
			},
			first: function (array, callback) {
				var result = null;
				$.each(array, function (i, v) {
					result = callback.call(this, i, v);
					if (result) return false;
				});
				return result;
			},
			prompt: function (options) {
				options = $.extend({
					buttons: [],
					title: "10306订票助手",
					ele: null,
					content: null,
					onCancel: function () { },
					closeOnClick: true,
					to: null
				}, options);

				return (function (opt) {
					this.options = opt;
					var self = this;

					var ele = $("#fishPromptDlg");
					if (!ele.length) {
						$("body").append('<div id="fishPromptDlg" class="fishDialog"><div class="fishDialogTitle"></div><div class="fishDialogContent"></div><div class="fishDialogControls"><button class="close_button fish_button">关闭</button></div></div>');
						ele = $("#fishPromptDlg");
					}

					//按钮
					var controlbar = ele.find(".fishDialogControls");
					controlbar.find(":not(.close_button)").remove();
					$.each(this.options.buttons, function () {
						var button = $("<button class=\"fish_button " + this.cssClass + "\">" + this.text + "</button>");
						var handler = this.handler;
						if (handler) {
							button.click(function () {
								if (self.options.closeOnClick) self.close();
								handler.call(self, this);
							});
						}
						controlbar.prepend(button);
					});

					//标题
					ele.find(".fishDialogTitle").html(this.options.title);

					//内容
					var container = ele.find(".fishDialogContent");
					if (this.options.content) {
						container.html(this.options.content);
						ele.width(500);
					} else {
						ele.css("width", "auto");
						var prevContent = container.children();
						$("body").append(prevContent.hide());

						container.width(this.options.ele.innerWidth());
						container.append(this.options.ele);
						this.options.ele.show();
					}

					this.dialog = ele.fishDialog({ to: self.options.to });
					this.close = function () {
						self.dialog.closeDialog();
						if (self.options.onClose) {
							self.options.onClose.call(self);
						}
					};

				})(options);
			}
		});
		$.fn.extend({
			fishDialog: function (optx) {
				/// <summary>显示对话框。其中带有 close_button 样式的控件会自动作为关闭按钮</summary>
				var dataKey = "fs_dlg_opt";
				var object = this;

				return object.data(dataKey) ? object.data(dataKey) : (function (opt) {
					var e = this;

					e.options = $.extend({ maskOpacity: 0.5, bindControl: null, removeDialog: this.attr("autoCreate") == "1", onClose: null, animationMove: 20, speed: "fast", fx: "linear", show: "fadeInDown", hide: "fadeOutUp", onShow: null, timeOut: 0, to: null, mask: true }, opt);
					var top = "50%";
					var left = "50%";
					var thisWidth = e.width();
					var thisHeight = e.height();
					var marginLeft = -thisWidth / 2;
					var marginTop = -thisHeight / 2 - e.options.animationMove;
					var $body = $("body");
					var viewAreaWidth = document.body.scrollLeft + document.documentElement.clientWidth;
					var viewAreaHeight = document.body.scrollTop + document.documentElement.clientHeight;

					if (e.options.to) {
						var pos = e.options.to.position();
						top = pos.top;
						left = pos.left;

						if (top + thisHeight >= viewAreaHeight) top = viewAreaHeight - thisHeight - 1;
						if (left + thisWidth >= viewAreaWidth) left = viewAreaWidth - thisWidth - 1;

						left += "px";
						top += "px";
						marginLeft = 0;
						marginTop = -e.options.animationMove;
					}
					if (e.options.mask) {
						var mark = document.getElementById("fishDialogMask");
						if (!mark) {
							$("body").append("<div id='fishDialogMask' class='fishDialogMask'></div>");
							mark = document.getElementById("fishDialogMask");
						}
						$(mark).css({ "height": viewAreaHeight + "px", "opacity": 0 }).show().animate({ opacity: e.options.maskOpacity }, "fast", "linear");
					}

					e.css({
						"position": e.options.parent || e.options.to ? "absolute" : "fixed",
						"left": left,
						"top": top,
						"margin-left": marginLeft + "px",
						"margin-top": (marginTop - e.options.animationMove) + "px",
						"z-index": "10000"
					});
					e.changeLoadingIcon = function (icon) {
						/// <summary>更改加载对话框的图标</summary>
						e.removeClass().addClass("loadingDialog loadicon_" + (icon || "tip"));
						return e;
					};
					e.autoCloseDialog = function (timeout) {
						/// <summary>设置当前对话框在指定时间后自动关闭</summary>
						setTimeout(function () { e.closeDialog(); }, timeout || 2500);
						return e;
					};
					e.setLoadingMessage = function (msgHtml) {
						e.find("div").html(msgHtml);
						return e;
					};
					e.closeDialog = function () {
						/// <summary>关闭对话框</summary>
						$('.close_button', e).unbind("click", e.closeDialog);
						e.removeData(dataKey);
						e.animate({ "marginTop": (marginTop + e.options.animationMove) + "px", "opacity": "hide" }, e.options.speed, e.options.fx, function () {
							if (e.options.bindControl) e.options.bindControl.enable();
							if (e.options.onClose) e.options.onClose.call(e);
							if (e.options.removeDialog) e.options.remove();
						})
						$("#fishDialogMask").animate({ opacity: "hide" }, "fast", "linear");

						return e;
					};
					$('.close_button', e).click(e.closeDialog);
					//auto close
					if (e.options.timeOut > 0) {
						var handler = e.options.onShow;
						e.options.onShow = function () {
							setTimeout(function () { e.closeDialog(); }, e.options.timeOut);
							if (handler != null) handler.call(e);
						};
					}
					//show it
					if (e.options.bindControl) e.options.bindControl.disable();
					e.animate({ "marginTop": marginTop + "px", "opacity": "show" }, e.options.speed, e.options.fx, function () { e.options.onShow && e.options.onShow.call(e); });
					e.data(dataKey, e);

					return this;
				}).call(object, optx);
			}
		});


		if (utility.isWebKit) {
			$(document).ajaxSend(function (e, xhr, obj) { if (obj.refer) xhr.setRequestHeader("TRefer", obj.refer); });
		}
	},
	runningQueue: null,
	appendLog: function (settings) {
		/// <summary>记录日志</summary>
		if (!utility.runningQueue) utility.runningQueue = [];
		var log = { url: settings.url, data: settings.data, response: null, success: null };
		if (log.url.indexOf("Passenger") != -1) return;	//不记录对乘客的请求

		utility.runningQueue.push(log);
		settings.log = log;
	},
	showLog: function () {
		if (!utility.runningQueue) {
			alert("当前页面尚未产生日志记录。");
			return;
		}

		var log = [];
		$.each(utility.runningQueue, function () {
			log.push("成功：" + (this.success ? "是" : "否") + "\r\n地址：" + this.url + "\r\n提交数据：" + utility.formatData(this.data) + "\r\n返回数据：" + utility.formatData(this.response));
		});
		$("#runningLog").val(log.join("\r\n----------------------------------\r\n"));

		utility.showOptionDialog("tabLog");
	},
	//获取登录到IE的代码 Add By XPHelper
	showLoginIE: function () {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		var IECode = "javascript:";
		var cookie = [];
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr.length < 2 || arr[0].indexOf("helper.") != -1) continue;
			cookie.push("document.cookie=\"" + arr[0] + "=" + arr[1] + "\";");
		}
		IECode += cookie.join("");
		IECode += "self.location.reload();";
		$("#LoginIECode").val(IECode);
	},
	formatData: function (data) {
		if (!data) return "(null)";
		if (typeof (data) == "string") return data;
		var html = [];
		for (var i in data) {
			html.push('"' + i + '":\"' + (this[i] + "").replace(/(\r|\n|")/g, function (a) { "\\" + a; }) + '\"');
		}
		return "{" + html.join(",") + "}";
	},
	notify: function (msg, title, timeout) {
		var tw = utility.getTopWindow();
		if (tw == self) {
			var e = new CustomEvent("notify", { detail: { msg: msg, title: title || "", timeout: timeout || "" } });
			document.body.dispatchEvent(e);
		} else {
			tw.utility.notify(msg, title, timeout);
		}
	},
	setPref: function (name, value) {
		window.localStorage.setItem(name, value);
	},
	getPref: function (name) {
		return window.localStorage.getItem(name);
	},
	unsafeCallback: function (callback) {
		if (typeof (unsafeInvoke) == "undefined") callback();
		else unsafeInvoke(callback);
	},
	getTimeInfo: function () {
		var d = new Date();
		return d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":" + (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
	},
	savePrefs: function (obj, prefix) {
		var objs = obj.find("input, select");
		objs.change(function () {
			var type = this.getAttribute("type");
			if (type == "checkbox") utility.setPref(prefix + "_" + this.getAttribute("id"), this.checked ? 1 : 0);
			else utility.setPref(prefix + "_" + this.getAttribute("id"), $(this).val());
		})
	},
	reloadPrefs: function (obj, prefix) {
		var objs = obj.find("input, select");
		prefix = prefix || "";
		objs.each(function () {
			var e = $(this);
			var type = e.attr("type");
			var id = e.attr("id");
			var value = utility.getPref(prefix + "_" + id);
			if (typeof (value) == "undefined" || value == null) return;

			if (type == "checkbox") this.checked = value == "1";
			else e.val(value);
			e.change();
		});
		utility.savePrefs(obj, prefix);
	},
	getErrorMsg: function (msg) {
		/// <summary>获得给定信息中的错误信息</summary>
		var m = msg.match(/var\s+message\s*=\s*"([^"]*)/);
		return m && m[1] ? m[1] : "&lt;未知信息&gt;";
	},
	delayInvoke: function (target, callback, timeout) {
		target = target || "#countEle";
		var e = typeof (target) == "string" ? $(target) : target;
		if (timeout <= 0) {
			e.html("正在执行").removeClass("fish_clock").addClass("fish_running");
			callback();
		} else {
			var str = (Math.floor(timeout / 100) / 10) + '';
			if (str.indexOf(".") == -1) str += ".0";
			e.html(str + " 秒后再来!...").removeClass("fish_running").addClass("fish_clock");
			setTimeout(function () {
				utility.delayInvoke(target, callback, timeout - 500);
			}, 500);
		}
	},
	saveList: function (name) {
		/// <summary>将指定列表的值保存到配置中</summary>
		var dom = document.getElementById(name);
		window.localStorage["list_" + name] = utility.getOptionArray(dom).join("\t");
	},
	loadList: function (name) {
		/// <summary>将指定的列表的值从配置中加载</summary>
		var dom = document.getElementById(name);
		var data = window.localStorage["list_" + name];
		if (!data) return;

		if (data.indexOf("\t") != -1)
			data = data.split('\t');
		else data = data.split('|');
		$.each(data, function () {
			dom.options[dom.options.length] = new Option(this, this);
		});
	},
	addOption: function (dom, text, value) {
		/// <summary>在指定的列表中加入新的选项</summary>
		dom.options[dom.options.length] = new Option(text, value);
	},
	getOptionArray: function (dom) {
		/// <summary>获得选项的数组格式</summary>
		return $.map(dom.options, function (o) { return o.value; });
	},
	inOptionList: function (dom, value) {
		/// <summary>判断指定的值是否在列表中</summary>
		for (var i = 0; i < dom.options.length; i++) {
			if (dom.options[i].value == value) return true;
		}
		return false;
	},
	getAudioUrl: function () {
		/// <summary>获得音乐地址</summary>
		return window.localStorage["audioUrl"] || (navigator.userAgent.indexOf("Firefox") != -1 ? "http://static.fishlee.net/resources/audio/song.ogg" : "http://static.fishlee.net/resources/audio/song.ogg");
	},
	getFailAudioUrl: function () {
		return (utility.isWebKit() ? "http://static.fishlee.net/resources/audio/" : "http://static.fishlee.net/resources/audio/") + "music3.ogg";
	},
	playFailAudio: function () {
		if (!window.Audio) return;
		new Audio(utility.getFailAudioUrl()).play()
	},
	resetAudioUrl: function () {
		/// <summary>恢复音乐地址为默认</summary>
		window.localStorage.removeItem("audioUrl");
	},
	parseDate: function (s) { /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.exec(s); return new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3); },
	getDate: function (s) {
		/// <summary>获得指定日期的天单位</summary>
		return new Date(s.getFullYear(), s.getMonth(), s.getDate());
	},
	formatDate: function (d) {
		/// <summary>格式化日期</summary>
		var y = d.getFullYear();

		return y + "-" + utility.formatDateShort(d);
	},
	formatDateShort: function (d) {
		/// <summary>格式化日期</summary>
		var mm = d.getMonth() + 1;
		var d = d.getDate();

		return (mm > 9 ? mm : "0" + mm) + "-" + (d > 9 ? d : "0" + d);
	},
	formatTime: function (d) {
		function padTo2Digit(digit) {
			return digit < 10 ? '0' + digit : digit;
		}
		return utility.formatDate(d) + " " + padTo2Digit(d.getHours()) + ":" + padTo2Digit(d.getMinutes()) + ":" + padTo2Digit(d.getSeconds());
	},
	addTimeSpan: function (date, y, mm, d, h, m, s) {
		/// <summary>对指定的日期进行偏移</summary>
		return new Date(date.getFullYear() + y, date.getMonth() + mm, date.getDate() + d, date.getHours() + h, date.getMinutes() + m, date.getSeconds() + s);
	},
	serializeForm: function (form) {
		/// <summary>序列化表单为对象</summary>
		var v = {};
		var o = form.serializeArray();
		for (var i in o) {
			if (typeof (v[o[i].name]) == 'undefined') v[o[i].name] = o[i].value;
			else v[o[i].name] += "," + o[i].value;
		}
		return v;
	},
	getSecondInfo: function (second) {
		var show_time = "";
		var hour = parseInt(second / 3600);  //时
		if (hour > 0) {
			show_time = hour + "小时";
			second = second % 3600;
		}
		var minute = parseInt(second / 60);  //分
		if (minute >= 1) {
			show_time = show_time + minute + "分";
			second = second % 60;
		} else if (hour >= 1 && second > 0) {
			show_time = show_time + "0分";
		}
		if (second > 0) {
			show_time = show_time + second + "秒";
		}

		return show_time;
	},
	post: function (url, data, dataType, succCallback, errorCallback, featureFlag, refer) {
		var onError = function (xhr) {
			var code = utility.checkResponse(xhr);
			if (code < 1) {
				alert("警告：" + (code == 0 ? "操作失败" : "系统已强制退出登录") + "，可能是系统已升级。" +
					(featureFlag ? "\n为了保证您的安全，功能【" + featureFlag + "】已被自动禁用，请重新登录。\n在助手升级后，功能将会被自动重新开启。\n\n请重新登录。" : ""));
				utility.disableFeature(featureFlag);

				if (code == -1) {
					//被强退
					self.location = "/otsweb/loginAction.do?method=init";
				}
			} else {
				if (errorCallback) errorCallback.apply(this, arguments);
			}
		}
		$.ajax({
			url: url,
			data: data,
			timeout: 10000,
			type: "POST",
			success: function (data, state, xhr) {
				if (utility.checkResponse(xhr) < 1) onError(xhr);
				else {
					if (succCallback) succCallback.apply(this, arguments);
				}
			},
			error: onError,
			dataType: dataType,
			refer: utility.getFullUrl(refer)
		});
	},
	checkResponse: function (xhr) {
		var text = xhr.responseText;
		if (!text || text.indexOf("<title>登录</title>") != -1) return -1;
		if (text == "-1") return 0;
		return 1;
	},
	get: function (url, data, dataType, succCallback, errorCallback, featureFlag, refer) {
		var onError = function (xhr) {
			var code = utility.checkResponse(xhr);
			if (code < 1) {
				alert("警告：" + (code == 0 ? "操作失败" : "系统已强制退出登录") + "，可能是系统已升级。" +
					(featureFlag ? "\n为了保证您的安全，功能【" + featureFlag + "】已被自动禁用，请重新登录。\n在助手升级后，功能将会被自动重新开启。\n\n请重新登录。" : ""));
				utility.disableFeature(featureFlag);

				if (code == -1) {
					//被强退
					self.location = "/otsweb/loginAction.do?method=init";
				}
			} else {
				if (errorCallback) errorCallback.apply(this, arguments);
			}
		}
		$.ajax({
			url: url,
			data: data,
			timeout: 10000,
			type: "GET",
			success: function (data, state, xhr) {
				if (utility.checkResponse(xhr) < 1) onError(xhr);
				else {
					if (succCallback) succCallback.apply(this, arguments);
				}
			},
			error: onError,
			dataType: dataType,
			refer: utility.getFullUrl(refer)
		});
	},
	fishTab: function (obj, opt) {
		return (function (opt) {
			var self = this;
			opt = $.extend({ switchOnHover: false, switchOnClick: true }, opt);
			this.addClass("fishTab");


			this.showTab = function (tabid) {
				self.find(".current").removeClass("current");
				self.find("ul.tabNav li[tab=" + tabid + "], div." + tabid).addClass("current");
			};
			self.find(".tabNav li").hover(function () {
				if (!opt.switchOnHover) return;
				self.showTab($(this).attr("tab"));
			}).click(function () {
				if (!opt.switchOnClick) return;
				self.showTab($(this).attr("tab"));
			});
			this.showTab(self.find(".tabNav").attr("default") || self.find(".tabNav li:eq(0)").attr("tab"));

			return this;
		}).call(obj, opt);
	},
	getLoginRetryTime: function () {
		return parseInt(window.localStorage.getItem("login.retryLimit")) || 2000;
	},
	showOptionDialog: function (tab) {
		if (tab) utility.configTab.showTab(tab);
		$("#fishOption").fishDialog();
	},
	addCookie: function (name, value, expDays) {
		var cook = name + "=" + value + "; path=/; domain=.12306.cn";
		if (expDays > 0) {
			cook += "; expires=" + new Date(new Date().getTime() + expDays * 3600 * 1000 * 24).toGMTString();
		}
		document.cookie = cook;
	},
	getCookie: function (name) {
		var cook = document.cookie;
		var arr = cook.split("; ");
		for (var i = 0; i < arr.length; i++) {
			var arg = arr[i].split('=');
			if (arg[0] == name) return arg[1];
		}
	},
	setSnInfo: function (name, sn) {
		utility.setPref("helper.regUser", name);
		utility.setPref("helper.regSn", sn);
		utility.addCookie("helper.regUser", name, 999);
		utility.addCookie("helper.regSn", sn, 999);
	},
	verifySn: function (skipTimeVerify, name, sn) {
		name = name || utility.getPref("helper.regUser") || utility.getCookie("helper.regUser");
		sn = sn || utility.getPref("helper.regSn") || utility.getCookie("helper.regSn");
		if (!name && sn) return utility.verifySn2(skipTimeVerify, sn);
		if (!name || !sn) return { result: 0, msg: "未注册", name: "基本用户", typeDesc: "基本版", type: "DEMO" };

		utility.setSnInfo(name, sn);

		var args = sn.split(',');
		if (!skipTimeVerify) {
			if ((new Date() - args[0]) / 60000 > 5) {
				return { result: -1, msg: "序列号注册已失效" };
			}
		}
		var dec = [];
		var encKey = args[0] + args[1];
		var j = 0;
		for (var i = 0; i < args[2].length; i += 4) {
			dec.push(String.fromCharCode(parseInt(args[2].substr(i, 4), 16) ^ encKey.charCodeAt(j)));
			j++;
			if (j >= encKey.length) j = 0;
		}
		var data = dec.join("");
		data = { result: null, type: data.substring(0, 4), name: data.substring(4) };
		data.result = data.name == name ? 0 : -3;
		data.msg = data.result == 0 ? "成功验证" : "注册无效"
		data.typeDesc = data.type == "NRML" ? "正式版" : (data.type == "GROP" ? "内部版, <span style='color:blue;'>感谢您参与我们之中</span>!" : "<span style='color:red;'>捐助版, 非常感谢您的支持</span>!");

		return data;
	},
	verifySn2: function (skipTimeVerify, data) {
		data = utility.trim(data);
		try {
			var nameLen = parseInt(data.substr(0, 2), 16);
			var name = data.substr(2, nameLen);
			data = data.substring(2 + nameLen);

			var arr = [];
			for (var i = 0; i < data.length; i++) {
				var c = data.charCodeAt(i);
				if (c >= 97) arr.push(String.fromCharCode(c - 49));
				else arr.push(data.charAt(i));
			}
			data = arr.join("");
			var ticket = parseInt(data.substr(0, 14), 16);
			var key = parseInt(data.substr(14, 1), 16);
			var encKey = ticket.toString(16).toUpperCase() + key.toString().toUpperCase();
			data = data.substring(15);
			var dec = [];
			var j = 0;
			for (var i = 0; i < data.length; i += 4) {
				dec.push(String.fromCharCode(parseInt(data.substr(i, 4), 16) ^ encKey.charCodeAt(j)));
				j++;
				if (j >= encKey.length) j = 0;
			}
			dec = dec.join("").split('|');
			var regVersion = dec[0].substr(0, 4);
			var regName = dec[0].substring(4);
			var bindAcc = dec.slice(1, dec.length);

			if (!bindAcc && !skipTimeVerify && (new Date() - ticket) / 60000 > 5) {
				return { result: -1, msg: "注册码已失效， 请重新申请" };
			}
			if (regName != name) {
				return { result: -3, msg: "注册失败，用户名不匹配" };
			}
			var data = { name: name, type: regVersion, bindAcc: bindAcc, ticket: ticket, result: 0, msg: "成功注册" };
			switch (data.type) {
				case "NRML": data.typeDesc = "正式版"; break;
				case "GROP": data.typeDesc = "内部版, <span style='color:blue;'>感谢您参与我们之中</span>!"; break;
				case "DONT": data.typeDesc = "<span style='color:red;'>捐助版, 非常感谢您的支持</span>!"; break;
				case "PART": data.typeDesc = "合作版，欢迎您的使用";
			}
			data.regTime = new Date(ticket);
			data.regVersion = 2;

			return data;
		} catch (e) {
			return { result: -4, msg: "数据错误" };
		}
	},
	allPassengers: null,
	getAllPassengers: function (callback, ignoreLocalCache) {
		if (utility.allPassengers) {
			callback(utility.allPassengers);
			return;
		}

		var tw = utility.getTopWindow();
		if (tw != self) return tw.utility.getAllPassengers(callback, ignoreLocalCache);
		if (utility.isfeatureDisabled("pasload"))
			return [];

		//开始加载所有乘客
		utility.allPassengers = [];
		var pageIndex = 0;

		function loadPage() {
			utility.post("/otsweb/passengerAction.do?method=getPagePassengerAll", { pageSize: 10, pageIndex: pageIndex }, "json", function (json) {
				$.each(json.rows, function () { utility.allPassengers.push(this); });

				if (utility.allPassengers.length >= json.recordCount) {
					callback(utility.allPassengers);
				} else {
					pageIndex++;
					setTimeout(loadPage, 1000);
				}
			}, function () {
				setTimeout(loadPage, 3000);
			}, "pasload", "/otsweb/passengerAction.do?method=initUsualPassenger12306");
		}

		loadPage();
	},
	getFullUrl: function (path) {
		if (typeof (path) == 'undefined' || !path) return "";
		return location.protocol + "//" + location.host + path;
	},
	regCache: {},
	getRegCache: function (value) {
		return utility.regCache[value] || (utility.regCache[value] = new RegExp("^(" + value + ")$", "i"));
	},
	preCompileReg: function (optionList) {
		var data = $.map(optionList, function (e) {
			return e.value;
		});
		return new RegExp("^(" + data.join("|") + ")$", "i");
	},
	enableLog: function () {
		$("body").append('<button class="fish_button" style="width:100px;position:fixed;left:265px;top:8px;height:30px;" onclick="utility.showLog();">显示运行日志</button>');
		$(document).ajaxSuccess(function (a, b, c) {
			if (!c.log) return;
			c.log.response = b.responseText;
			c.log.success = true;
		}).ajaxSend(function (a, b, c) {
			utility.appendLog(c);
		}).ajaxError(function (a, b, c) {
			if (!c.log) return;
			c.log.response = b.responseText;
		});
	},
	//获取登录到IE的代码 Add By XPHelper
	enableLoginIE: function () {
		$("body").append('<button class="fish_button configLink" style="width:150px;position:fixed;right:14px;top:20px;height:35px;"tab="tabLoginIE">获取登录到IE的代码</button>');
	},
	analyzeForm: function (html) {
		var data = {};

		//action
		var m = /<form.*?action="([^"]+)"/.exec(html);
		data.action = m ? RegExp.$1 : "";

		//inputs
		data.fields = {};
		var inputs = html.match(/<input\s*(.|\r|\n)*?>/gi);
		$.each(inputs, function () {
			if (!/name=['"]([^'"]+?)['"]/.exec(this)) return;
			var name = RegExp.$1;
			data.fields[RegExp.$1] = !/value=['"]([^'"]+?)['"]/.exec(this) ? "" : RegExp.$1;
		});

		//tourflag
		m = /submit_form_confirm\('confirmPassenger','([a-z]+)'\)/.exec(html);
		if (m) data.tourFlag = RegExp.$1;

		return data;
	},
	selectionArea: function (opt) {
		var self = this;
		this.options = $.extend({ onAdd: function () { }, onRemove: function () { }, onClear: function () { }, onRemoveConfirm: function () { return true; }, syncToStorageKey: "", defaultList: null, preloadList: null }, opt);
		this.append('<div style="padding:5px; border:1px dashed gray; background-color:#fafafa; width:110px;">(还没有添加任何项)</div>');
		this.datalist = [];

		this.add = function (data) {
			if ($.inArray(data, self.datalist) > -1) return;

			var text = typeof (data) == "string" ? data : data.text;

			var html = $('<input type="button" class="lineButton" value="' + text + '" title="点击删除" />');
			self.append(html);
			html.click(self.removeByButton);
			self.datalist.push(data);
			self.syncToStorage();
			self.checkEmpty();
			self.options.onAdd.call(self, data, html);
		};

		this.removeByButton = function () {
			var obj = $(this);
			var idx = obj.index() - 1;
			var value = self.datalist[idx];

			if (!self.options.onRemoveConfirm.call(self, value, obj, idx)) {
				return;
			}

			obj.remove();
			self.datalist.splice(idx, 1);
			self.syncToStorage();
			self.checkEmpty();
			self.options.onRemove.call(self, value, obj);
		};

		this.emptyList = function () {
			self.datalist = [];
			self.find("input").remove();
			self.syncToStorage();
			self.checkEmpty();
			self.options.onClear.call(self);
		};

		this.isInList = function (data) {
			/// <summary>判断指定的值是否在列表中</summary>
			return $.inArray($.inArray(data, self.datalist)) > -1;
		};

		this.isInRegList = function (data) {
			/// <summary>判断指定的值是否在列表中。这里假定是字符串，使用正则进行判断</summary>
			for (var i = 0; i < self.datalist.length; i++) {
				if (utility.getRegCache(self.datalist[i]).test(data)) return true;
			}
			return false;
		};

		this.syncToStorage = function () {
			if (!self.options.syncToStorageKey) return;

			window.localStorage.setItem(self.options.syncToStorageKey, self.datalist.join("\t"));
		};

		this.checkEmpty = function () {
			if (self.find("input").length) {
				self.find("div").hide();
			} else {
				self.find("div").show();
			}
		};

		if (self.options.syncToStorageKey) {
			var list = self.options.preloadList;
			if (!list) {
				var list = window.localStorage.getItem(this.options.syncToStorageKey);
				if (!list) list = this.options.defaultList;
				else list = list.split('\t');
			}

			if (list) {
				$.each(list, function () { self.add(this + ""); });
			}
		}

		return this;
	},
	getUpdateUrl: function () {
		var ua = navigator.userAgent;
		if (ua.indexOf(" SE ") > 0) return "http://www.fishlee.net/Service/Download.ashx/44/68/12306_ticket_helper.sext";
		else if (ua.indexOf("Maxthon") > 0 && ua.indexOf("Macintosh") == -1) return "http://www.fishlee.net/Service/Download.ashx/44/62/mxaddon.mxaddon";
		else if (ua.indexOf("LBBROWSER") > 0) return "http://www.fishlee.net/Service/Download.ashx/44/69/12306_ticket_helper_for_liebaobrowser.crx";
		else if (ua.indexOf("Firefox") > 0) return "http://www.fishlee.net/Service/Download.ashx/44/47/12306_ticket_helper.user.js";
		else return "http://www.fishlee.net/Service/Download.ashx/44/63/12306_ticket_helper.crx";
	},
	isAdvancedSupport: function () {
		if (!utility.isWebKit()) return false;

		var ua = navigator.userAgent;
		if (ua.indexOf("Maxthon") != -1 && ua.indexOf("Macintosh") != -1) return true;
		return ua.indexOf(" SE ") == -1 && ua.indexOf("Maxthon") == -1;
	},
	getTicketInfo: function (v) {
		var data = {}, match = v.match(/([\dA-Za-z])\*{5}(\d{4})/gi);
		for (var i in match) {
			var cls = match[i][0];
			var ct = parseInt(/\*0*(\d+)/.exec(match[i])[1]);
			if (ct < 3000) { data[cls] = ct; }
			else {
				data['empty'] = ct - 3000;
			}
		}; return data;
	},
	isDemoUser: function () {
		return utility.regInfo == null || utility.regInfo.type == "DEMO";
	},
	associateSwitch: function () {
		this.change(function () {
			if (!this.dataset || !this.dataset.target) return;

			var target = $("#" + this.dataset.target);
			if (!target) return;
			(this.checked && target.show()) || target.hide();
		}).change();

		return this;
	}
}

function unsafeInvoke(callback) {
	/// <summary>非沙箱模式下的回调</summary>
	var cb = document.createElement("script");
	cb.type = "text/javascript";
	cb.textContent = buildCallback(callback);

	document.head.appendChild(cb);
}

function buildCallback(callback) {
	var content = "";
	if (!utility_emabed) {
		content += "window.helperVersion='" + version + "'; window.compVersion='" + compVersion + "'; if(typeof(window.utility)!='undefined' && navigator.userAgent.indexOf('Maxthon')==-1){ alert('我勒个去! 检测到您似乎同时运行了两只助手! 请转到『附加组件管理『（Firefox）或『扩展管理』（Chrome）中卸载老版本的助手！');}; \r\nwindow.utility=" + buildObjectJavascriptCode(utility) + "; window.utility.init();\r\n";
		utility_emabed = true;
	}
	content += "(" + buildObjectJavascriptCode(callback) + ")();";

	return content;
}

function buildObjectJavascriptCode(object) {
	/// <summary>将指定的Javascript对象编译为脚本</summary>
	if (!object) return null;

	var t = typeof (object);
	if (t == "string") {
		return "\"" + object.replace(/(\r|\n|\\)/gi, function (a, b) {
			switch (b) {
				case "\r":
					return "\\r";
				case "\n":
					return "\\n";
				case "\\":
					return "\\\\";
			}
		}) + "\"";
	}
	if (t != "object") return object + "";

	var code = [];
	for (var i in object) {
		var obj = object[i];
		var objType = typeof (obj);

		if ((objType == "object" || objType == "string") && obj) {
			code.push(i + ":" + buildObjectJavascriptCode(obj));
		} else {
			code.push(i + ":" + obj);
		}
	}

	return "{" + code.join(",") + "}";
}

var isChrome = utility.isWebKit();
var isFirefox = utility.isFirefox();

if (location.host == "dynamic.12306.cn" || (location.host == "www.12306.cn" && location.protocol == "https:")) {
	if (!isChrome && !isFirefox) {
		alert("很抱歉，未能识别您的浏览器，或您的浏览器尚不支持脚本运行，请使用Firefox或Chrome浏览器！\n如果您运行的是Maxthon3，请确认当前页面运行在高速模式而不是兼容模式下 :-)");
	} else if (isFirefox && typeof (GM_notification) == 'undefined') {
		alert("很抱歉，本脚本需要最新的Scriptish扩展、不支持GreaseMonkey，请禁用您的GreaseMonkey扩展并安装Scriptish！");
		window.open("https://addons.mozilla.org/zh-CN/firefox/addon/scriptish/");
	} else if (!window.localStorage) {
		alert("警告! localStorage 为 null, 助手无法运行. 请查看浏览器是否已经禁用 localStorage!\nFirefox请设置 about:config 中的 dom.storage.enabled 为 true .");
	} else {

		//记录更新
		utility.setPref("updates", updates.join("\t"));
		initUIDisplay();
		unsafeInvoke(injectDom);
		entryPoint();
	}
}

//#endregion

//#region -----------------入口----------------------

function entryPoint() {
	var location = window.location;
	var path = location.pathname;

	utility.regInfo = utility.verifySn(true);
	if (utility.regInfo.result != 0) {
		//return;
	}

	//
	unsafeInvoke(autoReloadIfError);
	if ((path == "/otsweb/loginAction.do" && location.search != '?method=initForMy12306') || path == "/otsweb/login.jsp") {
		//登录页
		unsafeInvoke(initLogin);
	}
	if (utility.regInfo.bindAcc && localStorage.getItem("_sessionuser") && utility.regInfo.bindAcc.length > 0 && utility.regInfo.bindAcc[0] && utility.regInfo.bindAcc[0] != "*") {
		var user = localStorage.getItem("_sessionuser");
		var ok = false;
		for (var i = 0; i < utility.regInfo.bindAcc.length; i++) {
			if (utility.regInfo.bindAcc[i] == user) {
				ok = true;
				break;
			}
		}
		if (!ok) return;
	}
	if (path == "/otsweb/order/querySingleAction.do") {
		if (location.search == "?method=init" && document.getElementById("submitQuery")) {
			injectQueryScripts();
		}
		if (location.search == "?method=submutOrderRequest") {
			unsafeInvoke(initSubmitOrderQuest);
		}
	}
	if (path == "/otsweb/order/orderAction.do") {
		if (location.search.indexOf("method=cancelMyOrderNotComplete") != -1 && document.getElementById("submitQuery")) {
			injectQueryScripts();
		}
	}
	if (path == "/otsweb/order/payConfirmOnlineSingleAction.do") {
		if (location.search.indexOf("method=cancelOrder") != -1 && document.getElementById("submitQuery")) {
			injectQueryScripts();
		}
	}
	if (path == "/otsweb/order/myOrderAction.do") {
		if (location.search.indexOf("method=resign") != -1 && document.getElementById("submitQuery")) {
			injectQueryScripts();
		}
		if (location.search.indexOf("queryMyOrder") != -1) {
			unsafeInvoke(queryMyOrder);
		}
	}
	if (path == "/otsweb/order/confirmPassengerAction.do") {
		if (location.search == "?method=init") {
			unsafeInvoke(initAutoCommitOrder);
			unsafeInvoke(autoCommitOrderInSandbox);
		}
		if (location.search.indexOf("?method=payOrder") != -1) {
			unsafeInvoke(initPagePayOrder);
			unsafeInvoke(utility.enableLoginIE);
		}
	}
	if (path == "/otsweb/order/myOrderAction.do") {
		if (location.search.indexOf("?method=laterEpay") != -1 || location.search.indexOf("?method=queryMyOrderNotComplete") != -1) {
			unsafeInvoke(initNotCompleteOrderPage);
			unsafeInvoke(initPayOrder);
			unsafeInvoke(utility.enableLoginIE);
		}
	}
	if (path == "/otsweb/passengerAction.do") {
		if (location.search.indexOf("?method=initUsualPassenger") != -1) {
			unsafeInvoke(storePasToLocal);
		}
	}
	if (path == "/otsweb/main.jsp" || path == "/otsweb/") {
		//主框架
		unsafeInvoke(injectMainPageFunction);

		document.body.addEventListener("notify", function (evt) {
			var detail = evt.detail;

			var msg = detail.msg;
			var title = detail.title;
			var timeout = detail.timeout;
			if (typeof (GM_notification) != 'undefined') {
				GM_notification(msg);
				return;
			}

			if (typeof (chrome) != 'undefined' && typeof (chrome.extension) != 'undefined') {
				chrome.extension.sendRequest({ "function": "notify", message: msg, timeout: timeout, title: title });
				return;
			}

			if (typeof (sogouExplorer) != 'undefined' && typeof (sogouExplorer.extension) != 'undefined') {
				sogouExplorer.extension.sendRequest({ "function": "notify", message: msg, timeout: timeout, title: title });
				return;
			}

			var notification = webkitNotifications.createNotification("http://www.12306.cn/mormhweb/images/favicon.ico", title || '订票助手', msg);
			setTimeout(function () {
				notification.close();
			}, timeout || 5000);
			notification.show();
		});
	} else {
		console.log("[INFO] 初始化框架高度自动调整");
		unsafeInvoke(function () {
			var bodyEle = $("div.conWrap");
			if (bodyEle.length != 1) {
				return;
			}

			var main = parent.$("#main");
			var lastHeight = 0;
			setInterval(function () {
				var h = bodyEle.height();
				if (h != lastHeight) {
					lastHeight = h;
					main.height(lastHeight + 10);
					parent.window.setHeight(parent.window);
				}
			}, 500);
		});
	}
}

function injectQueryScripts() {
	unsafeInvoke(initTicketQuery);
	unsafeInvoke(initAutoPreSubmitOrder);
	unsafeInvoke(initAdvancedTicketQuery);
	unsafeInvoke(initDirectSubmitOrder);
	unsafeInvoke(dgFilterQuery);
	unsafeInvoke(initQueryGuide);
}

//#endregion

//#region 查询我的订单

function queryMyOrder() {
	$(".table_clist").each(function () {
		var tb = $(this);
		tb.find("tr:gt(0):not(.table_plgq)").each(function () {
			var tr = $(this);
			var cell = tr.find("td:eq(3)");
			var html = cell.html();
			var code = /<!--\s*(.+?)-->/i.exec(html);

			if (code[1]) {
				cell.append(code[1]);
			}
		});
	});
}

//#endregion

//#region 未完成订单查询页面

function initNotCompleteOrderPage() {
	utility.checkCompatible();

	if (!OrderQueueWaitTime || !OrderQueueWaitTime.prototype.getWaitTime) return;
	var queueCheckUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(OrderQueueWaitTime.prototype.getWaitTime + '')[1];	//排队地址
	if (!queueCheckUrl) return;

	//处理显示时间的
	(function () {
		var tagInputs = $("input[name=cache_tour_flag]");
		var flags = $.map(tagInputs, function (e, i) { return e.value; });
		$.each(flags, function () { $("#showTime_" + this).hide().after("<span id='status_" + this + "'>正在查询...</span>"); });

		function doCheck() {
			var flag = flags.shift();
			flags.push(flag);

			utility.get(queueCheckUrl, { tourFlag: flag }, "json", function (data) {
				var obj = $("#status_" + flag);
				if (data.waitTime == 0 || data.waitTime == -1) {
					obj.css({ "color": "green" }).html("订票成功！");
					utility.notify("订票成功！请尽快付款！");
					parent.playAudio();
					self.location.reload();
					return;
				}

				if (data.waitTime == -2) {
					utility.notify("出票失败！请重新订票！" + data.msg);
					parent.playFailAudio();
					obj.css({ "color": "red" }).html("出票失败！" + data.msg);

					return;
				}
				if (data.waitTime == -3) {
					utility.notify("订单已经被取消！");
					parent.playFailAudio();
					obj.css({ "color": "red" }).html("订单已经被取消！！");

					return;
				}
				if (data.waitTime == -4) {
					utility.notify("正在处理中....");
					obj.css({ "color": "blue" }).html("正在处理中....");
				}

				if (data.waitTime > 0) {
					obj.css({ "color": "red" }).html("等待开奖中<br />排队数【" + (data.waitCount || "未知") + "】<br />预计时间【" + utility.getSecondInfo(data.waitTime) + "】<br />不过这时间不<br />怎么靠谱 ╮(╯▽╰)╭");
				} else {
					obj.css({ "color": "red" }).html("奇怪的状态码 [" + data.waitTime + "]....");
				}


				setTimeout(doCheck, 2000);
			}, function () {
				utility.notify("查询状态错误，正在刷新页面！");
				self.location.reload();
			});
		}

		if (flags.length > 0) doCheck();
	})();
}

//#endregion

//#region 提交页面出错

function initSubmitOrderQuest() {
	if ($("div.error_text").length > 0) {
		parent.window.resubmitForm();
	}
}

//#endregion

//#region 订票页面，声音提示

function initPagePayOrder() {
	new Audio(utility.getAudioUrl()).play();
}

//#endregion

//#region -----------------出错自动刷新----------------------

function autoReloadIfError() {
	if ($.trim($("h1:first").text()) == "错误") {
		$("h1:first").css({ color: 'red', 'font-size': "18px" }).html("&gt;_&lt; 啊吖!，敢踹我出门啦。。。2秒后我一定会回来的 ╮(╯▽╰)╭");
		setTimeout(function () {
			self.location.reload();
		}, 2000);
	}
}

//#endregion

//#region -----------------主框架----------------------

function injectMainPageFunction() {
	//资源
	var main = $("#main")[0];
	main.onload = function () {
		var location = null;
		try {
			location = main.contentWindow.location + '';
		} catch (e) {
			//出错了，跨站
		}
		if (!location || location == "http://www.12306.cn/mormhweb/logFiles/error.html") {
			resubmitForm();
		}
	}

	window.resubmitForm = function () {
		var form = $("#orderForm");
		if (form.length == 0 || form.attr("success") != "0") return;

		utility.notify("页面出错了！正在重新预定！");
		setTimeout(function () { document.getElementById("orderForm").submit(); }, 3000);
	}
	window.playAudio = function () {
		new Audio(utility.getAudioUrl()).play();
	};
	window.playFailAudio = function () {
		utility.playFailAudio();
	};
}

//#endregion

//#region -----------------自动提交----------------------
function initAutoCommitOrder() {
	utility.checkCompatible();

	var count = 0;
	var breakFlag = 0;
	var randCode = "";
	var submitFlag = false;
	var tourFlag = /'(dc|fc|wc|gc)'/.exec($("div.tj_btn :button:eq(1)")[0].onclick + '')[1] || "dc";
	var randEl = $("#rand");
	var autoSubmitFlag = "autocommitorder";
	var entryTime = new Date();

	//启用日志
	utility.enableLog();

	//#region 如果系统出错，那么重新提交

	if ($(".error_text").length > 0 && parent.$("#orderForm").length > 0) {
		parent.resubmitForm();

		return;
	}

	//#endregion

	//各地址
	var checkOrderInfoUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(submit_form_confirm + '')[1];					//检查订单信息
	var getQueueCountUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(showOrderDialog + '')[1];
	var confirmUrl = /tourFlag\s*==\s*['"]dc['"](.|\s)+?['"]([^'"]+)['"]/i.exec(queueOrder + '')[2];			//提交订单地址
	var queueCheckUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(OrderQueueWaitTime.prototype.getWaitTime + '')[1];	//排队地址
	var isAutoSubmitEnabled = checkOrderInfoUrl && getQueueCountUrl && confirmUrl && queueCheckUrl;
	if (!isAutoSubmitEnabled) {
		alert("嗯……看起来木有找到相关提交地址……so……自动提交已被自动禁用来着……");
	}

	function stop(msg) {
		setCurOperationInfo(false, "错误 - " + msg);
		setTipMessage(msg);
		$("div.tj_btn button, div.tj_btn input").each(function () {
			this.disabled = false;
			$(this).removeClass().addClass("long_button_u");
		});
		$("#btnCancelAuto").hide();
		submitFlag = false;
	}

	var reloadCode = function () {
		$("#img_rrand_code").click();
		$("#rand").val("")[0].select();
	};

	var getSleepTime = function () {
		return 1000 * Math.max(parseInt($("#pauseTime").val()), 1);
	};

	//订单等待时间过久的警告
	var waitTimeTooLong_alert = false;

	function submitForm() {
		if (window.isSafeMobeBlocked) {
			setCurOperationInfo(true, "正在等安全期再上……╮(╯▽╰)╭");
			return;	//保护期
		}

		randEl[0].blur();
		//$(document).trigger("stopcheckcount");
		if (!window.submit_form_check || !submit_form_check("confirmPassenger")) {
			setCurOperationInfo(false, "您的表单没有填写完整!");
			stop("请填写完整表单");
			return;
		}

		count++;
		setCurOperationInfo(true, "第 " + count + " 次试着买彩票");
		if (breakFlag) {
			stop("已取消自动提交");
			breakFlag = 0;
			return;
		}
		$("#btnCancelAuto").show().removeClass().addClass("long_button_u")[0].disabled = false; //阻止被禁用
		breakFlag = 0;
		waitTimeTooLong_alert = false;

		$("#confirmPassenger").ajaxSubmit({
			url: checkOrderInfoUrl + $("#rand").val(),
			type: "POST",
			data: { tFlag: tourFlag },
			dataType: "json",
			timeout: 10000,
			success: function (data) {
				if ('Y' != data.errMsg || 'N' == data.checkHuimd || 'N' == data.check608) {
					setCurOperationInfo(false, data.msg || data.errMsg);
					stop(data.msg || data.errMsg);
					reloadCode();
				}
				else {
					queryQueueCount();
				}
			},
			error: function (msg) {
				setCurOperationInfo(false, "当前请求发生错误");
				utility.delayInvoke(null, submitForm, 1000);
			}
		});
	}

	function queryQueueCount() {
		var queryLeftData = {
			train_date: $("#start_date").val(),
			train_no: $("#train_no").val(),
			station: $("#station_train_code").val(),
			seat: $("#passenger_1_seat").val(),
			from: $("#from_station_telecode").val(),
			to: $("#to_station_telecode").val(),
			ticket: $("#left_ticket").val()
		};
		utility.get(getQueueCountUrl, queryLeftData, "json", function (data) {
			console.log(data);
			if (data.op_2) {
				var errmsg = "系统说人多，不许买彩票了，看起来没办法了……等下再去看看服务器的心情 (据说人数=" + data.count + ")";
				setCurOperationInfo(true, errmsg);
				stop(errmsg);

				utility.delayInvoke(null, queryQueueCount, 1000);
				return;
			}

			setTimeout(submitConfirmOrder, 1000);
		}, function () { utility.delayInvoke(null, queryQueueCount, 2000); });
	}

	function submitConfirmOrder() {
		jQuery.ajax({
			url: confirmUrl,
			data: $('#confirmPassenger').serialize(),
			type: "POST",
			timeout: 10000,
			dataType: 'json',
			success: function (msg) {
				console.log(msg);

				var errmsg = msg.errMsg;
				if (errmsg != 'Y') {
					if (errmsg.indexOf("包含未付款订单") != -1) {
						alert("您有未支付订单! 等啥呢, 赶紧点确定支付去.");
						window.location.replace("/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y");
						return;
					}
					if (errmsg.indexOf("重复提交") != -1) {
						stop("重复提交错误，已刷新TOKEN，请重新输入验证码提交");
						reloadToken();
						reloadCode();
						return;
					}
					if (errmsg.indexOf("后台处理异常") != -1 || errmsg.indexOf("非法请求") != -1) {
						if (lastform) {
							utility.notify("后台处理异常，已自动重新提交表单，请填写验证码并提交！");
							lastform.submit();
						} else {
							stop("后台处理异常，请返回查询页重新预定！");
						}
						return;
					}
					if (errmsg.indexOf("包含排队中") != -1) {
						console.log("惊现排队中的订单， 进入轮询状态");
						waitingForQueueComplete();
						return;
					}


					setCurOperationInfo(false, errmsg);
					stop(errmsg);
					reloadCode();
				} else {
					utility.notify("彩票已买下, 正在等待开奖，请及时注意开奖状态");
					waitingForQueueComplete();
				}
			},
			error: function (msg) {
				setCurOperationInfo(false, "当前请求发生错误");
				utility.delayInvoke(null, submitForm, 3000);
			}
		});
	}

	function reloadToken(submit) {
		setCurOperationInfo(true, "正在刷新TOKEN....");
		utility.get(self.location + '', null, "text", function (text) {
			if (!/TOKEN"\s*value="([a-f\d]+)"/i.test(text)) {
				setCurOperationInfo(false, "无法获得TOKEN，正在重试");
				utility.delayInvoke("#countEle", reloadToken, 1000);
			} else {
				var token = RegExp.$1;
				setCurOperationInfo(false, "已获得TOKEN - " + token);
				console.log("已刷新TOKEN=" + token);
				$("input[name=org.apache.struts.taglib.html.TOKEN]").val(token);
			}
			safeMode.restart();	//重启安全模式
		}, function () { utility.delayInvoke("#countEle", reloadToken, 1000); });
	}

	function waitingForQueueComplete() {
		setCurOperationInfo(true, "彩票提交成功，请等待开奖....");

		$.ajax({
			url: queueCheckUrl,
			data: { tourFlag: tourFlag },
			type: 'GET',
			timeout: 10000,
			dataType: 'json',
			success: function (json) {
				console.log(json);

				if (json.waitTime == -1 || json.waitTime == 0) {
					utility.notify("中奖咯!");
					if (json.orderId)
						window.location.replace("/otsweb/order/confirmPassengerAction.do?method=payOrder&orderSequence_no=" + json.orderId);
					else window.location.replace('/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y');
					stop("中奖咯！");
				} else if (json.waitTime == -3) {
					var msg = "很抱歉, 铁道部无齿地撤销了您的订单, 赶紧重新下!";
					utility.notify(msg);
					setCurOperationInfo(false, msg);
					stop(msg);
					reloadCode();
				} else if (json.waitTime == -2) {
					var msg = "很抱歉, 铁道部说您占座失败 : " + json.msg + ', 赶紧重新来过! 当长时间出现占座失败时, 建议您更改车次!';
					reloadToken();
					utility.notify(msg);
					setCurOperationInfo(false, msg);
					stop(msg);
					reloadCode();
				}
				else if (json.waitTime < 0) {
					var msg = '很抱歉, 未知的状态信息 : waitTime=' + json.waitTime + ', 可能已成功，请验证未支付订单.';
					setTipMessage(msg);
					utility.notify(msg);
					location.href = '/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y';
				} else {
					var msg = "彩票还要 " + utility.getSecondInfo(json.waitTime) + " 开奖， 请等待，不过你知道的，铁道部说的一直不怎么准。（排队人数=" + (json.waitCount || "未知") + "）";
					if (json.waitTime > 1800) {
						msg += "<span style='color:red; font-weight: bold;'>警告：排队时间大于30分钟，请不要放弃电话订票或用小号重新排队等其它方式继续订票！</span>";
					}
					setTipMessage(msg);

					if (json.waitTime > 1800 && !waitTimeTooLong_alert) {
						waitTimeTooLong_alert = true;
						utility.notify("警告！排队时间大于30分钟，成功率较低，请尽快电话订票或用小号重新排队！");
					}

					utility.delayInvoke("#countEle", waitingForQueueComplete, 3000);
				}
			},
			error: function (json) {
				utility.notify("请求发生异常，可能是登录状态不对，请验证。如果没有问题，请手动进入未完成订单页面查询。");
				self.location.reload();
			}
		});
	}

	if (isAutoSubmitEnabled) {
		$("div.tj_btn").append("&nbsp;&nbsp;<button class='long_button_u' type='button' id='btnAutoSubmit'>自动提交</button> <button class='long_button_u' type='button' id='btnCancelAuto' style='display:none;'>取消自动</button>");
		$("#btnAutoSubmit").click(function () {
			count = 0;
			breakFlag = 0;
			submitFlag = true;
			submitForm();
		});
		$("#btnCancelAuto").click(function () {
			$(this).hide();
			breakFlag = 1;
			submitFlag = false;
		});
		randEl.keyup(function (e) {
			if (document.getElementById("autoStartCommit").checked && !breakFlag) {
				if (e.charCode == 13 || randEl.val().length == 4) {
					submitFlag = true;
					submitForm();
				}
			}
		});
	}

	//清除上次保存的预定信息
	var lastform = null;
	if (parent) {
		lastform = parent.$("#orderForm");
		lastform.attr("success", "1");
	}

	//进度提示框
	$("table.table_qr tr:last").before("<tr><td style='border-top:1px dotted #ccc;height:100px;' colspan='9' id='orderCountCell'></td></tr><tr><td style='border-top:1px dotted #ccc;' colspan='9'><ul id='tipScript'>" +
	"<li class='fish_clock' id='countEle' style='font-weight:bold;'>等待操作</li>" +
	"<li style='color:green;'><strong>操作信息</strong>：<span>休息中</span></li>" +
	"<li style='color:green;'><strong>最后操作时间</strong>：<span>--</span></li></ul></td></tr>");

	var tip = $("#tipScript li");
	var errorCount = 0;

	//以下是函数
	function setCurOperationInfo(running, msg) {
		var ele = $("#countEle");
		ele.removeClass().addClass(running ? "fish_running" : "fish_clock").html(msg || (running ? "正在操作中……" : "等待中……"));
	}

	function setTipMessage(msg) {
		tip.eq(2).find("span").html(utility.getTimeInfo());
		tip.eq(1).find("span").html(msg);
	}

	//提交频率差别
	$(".table_qr tr:last").before("<tr><td colspan='9'><div style='display:;'>\
失败时休息时间：<input type='text' size='4' class='input_20txt' style='text-align:center;' value='3' id='pauseTime' />秒 (设置自动重新提交时的时间间隔不得低于1)  </div>\
安全期时间长度：<input type='text' size='4' class='input_20txt' style='text-align:center;' value='3' id='safeModeTime' />秒 (默认为 <span class='defaultSafeModeTime'></span>