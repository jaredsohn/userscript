// JavaScript Document
// ==UserScript==
// @name        喵星人入侵
// @include     http://tieba.baidu.com/*
// @description 百度贴吧发帖没句话自动添加后缀
// @namespace	http://userscripts.org/scripts/show/150772
// @version     1.0.2
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant 	unsafeWindow
// @author  	Fate·Suzumiya
// @updateURL   https://userscripts.org/scripts/source/150772.meta.js
// @downloadURL https://userscripts.org/scripts/source/150772.user.js
// ==/UserScript==
var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;

var mm="~喵"//修改此处替换自动添加词语
//增加按钮
$('.subbtn_bg:eq(0)').after('<input type="button" value="喵" class="subbtn_bg" id="miao">');

//添加尾巴主函数
window.miao = function(){
var x=$("#edit_parent").find("div.tb-editor-editarea").html();
//换行判断
var a="引用";
var b="———————————————————————————";
if(x.substr(0,2)==a){
	var c=x.lastIndexOf(b);
	var x1=x.substr(0,c);
	var x2=x.substring(c,x.length);
	var y=x2.split("<br>");
	for (i=2;i<y.length;i++)
{
	if(y[i]==""){continue;}
	y[i]=y[i]+mm;	
}
z=x1+y.join("<br>");
	}
else{
	var y=x.split("<br>");
for (i=0;i<y.length;i++)
{
	if(y[i]==""){continue;}
	y[i]=y[i]+mm;	
}
z=y.join("<br>");
	}


$("#edit_parent").find("div.tb-editor-editarea").html(z);
$('.subbtn_bg[value=" 发 表 "]').click();

}
//事件监听
var f= document.getElementById("miao");
f.addEventListener("click",miao,false);