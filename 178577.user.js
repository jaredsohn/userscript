// ==UserScript==
// @name        贴吧来了个新朋友
// @description 與機器人小風聊聊天
// @namespace   http://wiki.moztw.org/User:Shyangs#chatbot
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f*ct=*
// @include     http://tieba.baidu.com/f*kz=*
// @include     http://tieba.baidu.com/f*kw=*
// @updateURL   https://userscripts.org/scripts/source/178577.meta.js
// @downloadURL https://userscripts.org/scripts/source/178577.user.js
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM_addStyle
// @version     0.2
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==
let uw$ = unsafeWindow.$;
let $ = function(id) document.getElementById(id);
let flag=0, name, nick;
let nameMap = new Map();
nameMap.set("shyangs", "小害羞");
nameMap.set("月迷杜若", "小月");
nameMap.set("行云散月", "小不点");
nameMap.set("太过虚幻", "幻幻");
nameMap.set("总爱工藤", "漾漾");
nameMap.set("牛牛的约定", "牛牛");
nameMap.set("nukhuang", "奶黄包");
nameMap.set("ff176", "龙虾猫");
nameMap.set("温xi_寂寞", "寞寞");
nameMap.set("绯色起源", "小绯");
nameMap.set("梦游患者爱裸睡", "梦梦");

function userName(){
	if(typeof(nick)!=="undefined"){
		return nick;
	}else if(typeof(name)!=="undefined"){
		return name;
	}else{
		name=$("com_userbar").getElementsByClassName("u_username_show")[0].textContent;
		nick=nameMap.get(name);
		return userName();
	}
}
function show(str, src){
	if("user"===src){
		$("chat-record").innerHTML+='<div class="chat-user">'+userName()+': '+str+'</div>';
	}else if("bot"===src){
		$("chat-record").innerHTML+='<div class="chat-bot">小风: '+str.replace(/\n/g, " ").replace(/\u000D/g, "")+'</div>';
	}else{
		$("chat-record").innerHTML+='<div class="chat-sys">** '+str+' **</div>';
	}
	let chatScroll=$("chat-record");
	chatScroll.scrollTop = chatScroll.scrollHeight;
}
function send(str){
	$("chat-input").value="";//清空發言輸入區
	if(flag){
		show("【系統】輸入過快，請等待小風回應，再發言。", "sys");
		return;
	}
	flag=1;
	show(str, "user");
	GM_xmlhttpRequest({
		method : "GET",
		url : "http://xiaofengrobot.sinaapp.com/api.php?text="+encodeURIComponent(str),
		onload : function (response) {
			let status=response.status;
			switch (status) {
				case 200:
					show(response.responseText, "bot");
					flag=0;
					break;
				default:
					show("發生錯誤, status: "+status,"sys");
					flag=0;
			}
		}
	});
}

let elmt;
if(elmt = $('frs_nav_wrap')){
	elmt = elmt.firstElementChild;
}else if(elmt = $('tb_nav')){
	elmt = elmt.firstElementChild;
}else{
	elmt = $('star_class_nav')//明星貼吧
			||$('tb_header_search_form');
}
uw$(elmt).append('<li class="small_tab"><a href="#" id="chat-a">聊天</a></li>'+
'<div id="chat-b">\
	<p id="chat-close">ｘ</p>\
	<div id="chat-r">\
		<div id="chat-record"></div>\
	</div>\
	<div id="chat-h">\
	<img alt="" src="data:image/gif;base64,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" />'+
	'<img src="'+$("userlike_info_head_img").src+'" height="72" width="72" />'+
	'</div>\
	<div class="chat-m"><input value="清屏" id="chat-clear" type="button"><input value="复制" id="chat-copy" type="button"></div>\
	<div class="chat-m"><input type="text" id="chat-input"><input value="发送" id="chat-send" type="button"></div>\
</div>');
GM_addStyle("#chat-close {color:red; text-align:right; font-size:150%;}\
#chat-b {width: 600px; top:100px; background: rgba(244, 244, 244,.8); \
position:fixed; z-index:60000; display:none;}\
#chat-r {width: 500px; float:left;}\
#chat-record {width: 100%; height: 400px; overflow:auto;}\
#chat-h {width: 100px; float:left;}\
.chat-m {width: 600px; clear:both;}\
#chat-input {width: 500px;}\
.chat-user {color: HotPink}\
.chat-bot {color: DodgerBlue}\
.chat-sys {color: red}");

$("chat-a").addEventListener("click", function(){
	$("chat-b").style.display = "block";
}, false);
$("chat-close").addEventListener("click", function(){
	$("chat-b").style.display = "none";
}, false);
$("chat-clear").addEventListener("click", function(){
	$("chat-record").innerHTML="";
}, false);
$("chat-send").addEventListener("click", function(){
	send($("chat-input").value);
}, false);
$("chat-input").addEventListener("keyup", function(event){
	if (event.keyCode == 13) {
		send(this.value);
	}
}, false);
$("chat-copy").addEventListener("click", function(){
	let str="";
	uw$("#chat-record").find('div').each(function(){
		str+=this.textContent+"\n";
	});
	GM_setClipboard(str);
}, false);