// ==UserScript==
// @name           Auto-Focus Remover for Mac.6.cn
// @namespace      http:\\pto2k.blogspot.com
// @description    在MAC.6.CN，所有帖子列表页面都会在进入时把焦点放到右上角的搜索框里面。大多数人也许无所谓，但是对喜欢只用键盘浏览页面（用Firefox加两个古老但杰出的插件Hit-A-Hint/SurfKey可以完美的实现）的人来说，这个“功能”实在有点讨厌。JS也不是很懂，照葫芦画瓢的写的这个脚本，函数基本拷贝自M6自己的JS以及GM脚本Google Reader Quick Links。实现进入页面时取消自动对焦，另外加了两个按键控制聚焦搜索框与否，“\”进入搜索框，“Esc”取消，和Google的设定一样，呵呵^_^。
// @include http://mac.6.cn/*
// ==/UserScript==

/*Changelog

0.5 星期六 三月22日 2008,  00:53:57
修正添加按键响应的错误
增加取消焦点后将页面自动置于左上角 
0.4 2008-03-15
添加在修改帖子页面的屏蔽
屏蔽改为用网址判断
0.3 2008-03-14
添加在新贴页面的屏蔽
0.2 2008-03-13
添加在有文本框的帖子页面的屏蔽
0.1 2008-03-13
取消进入页面自动聚焦
“\”和“ESC”控制聚焦和取消

*/

//获得对象
var getObj = function(objId) {
 return document.all ? document.all[objId] : document.getElementById(objId);
}
//那个搜索框的名字是boxGo
var oGo = getObj("boxGo");
//放置焦点函数
var focusGo = function() {
	oGo.focus();
}
//取消焦点函数
var blurGo = function() {
	oGo.blur();
}
//将页面移动到左上角
var moveTop = function() {
	window.scrollTo(0, 0);
}
//根据按键控制焦点函数
var boxKeyFocus = function (event) {
    //var k = String.fromCharCode(event.which);	//代码转字符
	var k = event.which;
//	alert(k);
    if (k == "92"){
		focusGo();
    }
    if (k == "0"){
		blurGo();
    }
}
//进入页面就取消焦点
setTimeout(blurGo,100);
setTimeout(moveTop,150);

//添加按键检测
e1 = "topic/view/";
e2 = "topic/new/";
e3 = "post/modify/";

if (window.location.href.indexOf(e1)==-1 && window.location.href.indexOf(e2)==-1 && window.location.href.indexOf(e3)==-1 ){
document.addEventListener('keypress', boxKeyFocus, true);
}

/*

if (window.location.href.indexOf("http://mac.6.cn/go/bytopia")>-1){
	setTimeout(window.location.href="http://mac.6.cn/go/software",70000000);
}

if (window.location.href.indexOf("http://mac.6.cn/go/software")>-1){
	setTimeout(window.location.href="http://mac.6.cn/go/bytopia",50000);
}

*/
