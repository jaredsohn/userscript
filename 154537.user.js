// ==UserScript==
// @name           CC98 Smile Insertion
// @namespace      天天天蓝@cc98.org
// @description    指定位置插入表情
// @include		   http://www.cc98.org/reannounce.asp*
// @include		   http://www.cc98.org/announce.asp*
// @include        http://www.cc98.org/editannounce.asp*
// @include 	   http://www.cc98.org/vote.asp*
// @exclude      	
// @author         天天天蓝
// @version		   1.2.1 	
// @grant		   none
// ==/UserScript==

//设置光标位置为最后
var endOfContent = document.frmAnnounce.Content.value.length;
document.frmAnnounce.Content.setSelectionRange(endOfContent, endOfContent);

//获取所有图片标签
var smileImages = document.getElementsByTagName('img');

//修改所有表情图片的onclick方法
var i;
var srcRegex = /http:\/\/www.cc98.org\/emot\/em[0-9]{2}.gif/;
for(i=0;i<smileImages.length;i++)
{
	if(srcRegex.test(smileImages[i].src))
	{
		var emNumStr = smileImages[i].src.substring(27,29);
		var emNum = parseInt(emNumStr, 10) - 1;
		if(emNum <= 9)
			smileImages[i].onclick = new Function("onSmileClick('[em0"+emNum+"]')");
		else
			smileImages[i].onclick = new Function("onSmileClick('[em"+emNum+"]')");
		
		//修复“发表话题”页面表情的鼠标指针		
		smileImages[i].style.cursor = 'pointer';
	}
}

function onSmileClick(smileface)
{	
	//内容框及其属性
	var contentArea = document.frmAnnounce.Content;
	var content = contentArea.value;
	var start = contentArea.selectionStart;
	
	//在光标处分割内容
	var preString = content.substring(0, start);
	var sucString = content.substring(start, content.length);
	
	//设置内容为添加了表情标签的字符串
	document.frmAnnounce.Content.value = preString + smileface + sucString;
	
	//恢复选中位置
	document.frmAnnounce.Content.setSelectionRange(start+6,start+6);
}