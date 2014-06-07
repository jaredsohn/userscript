// ==UserScript==
// @name        dz论坛自动灌水机
// @namespace   http://userscripts.org/users/508758
// @description 实现dz论坛下自动灌水功能
// @include     *read*tid*
// @include     *forum*fid*
// @include	*thread*
// @include	*forum*viewthread*
// @version     1.0 Beta
// ==/UserScript==


// ------------------------------ Read Me ------------------------------ //
// 该脚本用于在dz论坛进行盖楼，请务必在灌水结束后关闭页面，不然可能会导致下次打开继续灌水，该BUG暂未想到合理的解决方案 (想法是关闭标签页触发清空GM中的value)
// 间隔时间如果设置过小，会导致回复无效；其实间隔时间也不准
// 一次只能在一个url里面灌水，不能同时作用于不同的两个url
// 有关于脚本的任何BUG或者问题请在下面留言或者@我，谢谢
// 如果您需要的论坛脚本不起作用，麻烦将地址告诉我
// firefox only

// ------------------------------ To Learn ------------------------------ //

// ------------------------------ Update Log ------------------------------ //
// first created on Mar 14, 2013
// 修正了灌水时如果打开新的@include中的页面也会同时灌水的BUG  Mar 17, 2013
// initially finished on Mar 21, 2013


/////////////////////////---函数---//////////////////////////
function Id(a) {
	return document.getElementById(a);
	}

	
///////////////////////---图形界面---////////////////////////
var curDiv = document.getElementById("f_pst");
var newDiv = document.createElement("div");
newDiv.innerHTML = '\
	<b>回复内容</b>\
	<input id = "textArea1" type = "text" style = "width : 400px" class = "tedt mtn">\
	<b>回复次数</b>\
	<input id = "textArea2" type = "text" style = "width : 30px" class = "tedt mtn">\
	<b>间隔时间(秒)</b>\
	<input id = "textArea3" type = "text" style = "width : 30px" class = "tedt mtn" >\
	<button id = "wBtn" class = "pn pnc vm" style = "float : right; margin-right : 200px"> <strong> 开启灌水模式 </strong> </button>\
	'
curDiv.parentNode.appendChild(newDiv);
var the_wBtn = document.getElementById("wBtn");
the_wBtn.addEventListener("click", startWater);	//按键监听
///////////////////////---图形界面---////////////////////////


if(GM_getValue("url") !== window.location.href)	return;	//不允许出现新的灌水页面


function startWater() {
	GM_setValue("url", window.location.href);	//设定灌水页面url
	GM_setValue("textArea", Id("textArea1").value);
	GM_setValue("count", parseInt(Id("textArea2").value));
	GM_setValue("interval", Id("textArea3").value * 1000);
	fun();	//每次需要重新载入url才能继续盖楼，原因不明
	}

	
if(GM_getValue("count")) {
	GM_setValue("count", GM_getValue("count") - 1);
	var textArea = document.getElementById("fastpostmessage");
	var wBtn = document.getElementById("fastpostsubmit");
	textArea.innerHTML = GM_getValue("textArea");
	wBtn.click();
	window.setTimeout(function() {fun()}, GM_getValue("interval"));
	}
else {	//灌水结束
	GM_deleteValue("url");
	GM_deleteValue("textArea");
	GM_deleteValue("count");
	GM_deleteValue("interval");
	}
	

function fun() {
	window.location.reload();
	}
////////////////////////////--END--//////////////////////////////



