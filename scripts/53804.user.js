// ==UserScript==
// @name           Tmdfilter
// @namespace      ledudu
// @author		ledudu
// @description		掩耳盗铃
// @version		0.1111111	
// @include        https://www.tamiaode.com/txt/*.htm*
// @include        https://www.ruanmeizi.com/txt/*.htm*
// @include        https://www.ruanmeizi.com/new/info2.asp?id=*
// @include        https://www.tamiaode.com/new/info2.asp?id=*
// ==/UserScript==

(function(){

var list = "elf.cn,250";  //一定要修改此处,逗号分开  [kanl来hehe真的很招人烦呀--by boxey]

list = list.split(',');

var TagP;
TagP = document.getElementsByTagName("p");

for(var i=0;i<TagP.length;i++)
{
	for(var j = 0; j < list.length; j++)
	{
		var thisAuthor = TagP[i].innerHTML;
		sstr = '<span style="background-color: rgb(232, 232, 232);">';
		thisAuthor = thisAuthor.substring(thisAuthor.indexOf(sstr)+sstr.length);
		sstr = '</span>';
		thisAuthor = thisAuthor.substring(0,thisAuthor.indexOf(sstr));
		if(thisAuthor.lastIndexOf("【")!=-1) thisAuthor = thisAuthor.substring(0,thisAuthor.indexOf("【"));
		if(thisAuthor.lastIndexOf("</")!=-1) thisAuthor = thisAuthor.substring(0,thisAuthor.indexOf("</"));
		if(thisAuthor.lastIndexOf(">")!=-1) thisAuthor = thisAuthor.substring(thisAuthor.indexOf(">")+1);

		if(thisAuthor==list[j]&& list[j] != '')
		{
			TagP[i].innerHTML =  '<div style="background-color: #FFF;margin: 7px;padding: 7px;border: 2px solid #999;"><span title="点击查看被隐藏内容" onclick="javascript:var a=document.getElementById(\''+ i +'\');a.style.display=a.style.display==\'none\'?\'block\':\'none\'">' + list[j] + ' 的回复被隐藏</span><div style="background-color: #FFC;display: none" id="' + i + '">' + TagP[i].innerHTML + '</div>';
		}
	}
}
}());