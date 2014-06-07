// ==UserScript==
// @name        dz论坛下的隐藏贴自动回复
// @namespace   http://userscripts.org/users/508758
// @description 自动回复查看隐藏贴的隐藏内容
// @include     *read*tid*
// @include     *forum*fid*
// @include	*thread*
// @include	*forum*viewthread*
// @version     1.0
// ==/UserScript==


// ------------------------------ Read Me ------------------------------ //
// 用于自动回复隐藏贴
// 有关于脚本的任何BUG或者问题请在下面留言或者@我，谢谢
// 如果您需要的dz论坛脚本不起作用，麻烦将地址告诉我
// firefox only

// ------------------------------ To Learn ------------------------------ //
// document.documentElement可以返回根节点<html></html>内的信息

// ------------------------------ Update Log ------------------------------ //
// first created on Mar 17, 2013 
// initially finished on Mar 20, 2013


var textValue = "随便看看";	
var html = document.documentElement.innerHTML;	//获取html标签下的内容
var pattern = /<script.*>replyreload.*<\/script>/;
if (html.match(pattern)) {
	var wBtn = document.getElementById("fastpostsubmit");
	var textArea = document.getElementById("fastpostmessage");
	textArea.innerHTML = textValue;
	wBtn.click();
	}
