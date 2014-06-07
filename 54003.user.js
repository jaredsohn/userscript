// ==UserScript==
// @name		TamiaodeFilter
// @author		ledudu
// @namespace		ledudu
// @description		掩耳盗铃
// @version		0.2	
// @include		https://www.tamiaode.com/txt/*.htm*
// @include		https://www.ruanmeizi.com/txt/*.htm*
// @include        	https://www.ruanmeizi.com/new/info2.asp?id=*
// @include        	https://www.tamiaode.com/new/info2.asp?id=*
// ==/UserScript==
//////////////////////////////////////////////
//
//	软妹子GM专用掩耳盗铃
//	目的:绿坝不想看到的所有内容
//	作者:乐嘟嘟 
//	使用说明:1.需要屏蔽的ID以英文逗号(",")分割,避免出错可复制上面引号中的逗号
//		 2.点击绿坝内容即可查看原回复
//
//////////////////////////////////////////////
(function(){

GM_registerMenuCommand("掩耳盗铃设置", ShowMessage);

var list = GM_getValue("list");
if(GM_getValue("list") == null)
{
	GM_setValue("list", "test");
}
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

		if(thisAuthor == list[j] && list[j] != '')
		{
			TagP[i].innerHTML =  '<span style="color: #00e8e8" onclick="javascript:var a=document.getElementById(\''+ i +'\');a.style.display=a.style.display==\'none\'?\'block\':\'none\'">此楼 ' + list[j] + ' 已被绿坝,点击查看原回复</span><div style="display: none" id="' + i + '">' + TagP[i].innerHTML + '</div>';
		}
	}
}

function HiddenMessage()
{
	$("showMessage").style.display = 'none';
	GM_setValue("list", $("list").value);
}

function ShowMessage()
{
	$("showMessage").style.display = 'block';
}


function CreateShowMessage()
{
		bar = $N('div', {style:'color:#000000;font-family:"Microsoft Yahei", Verdana;font-weight:bold;font-size:12px;margin:0;text-align:center;padding:0.2em;border:0;position:fixed;right:1px;bottom:22px;z-index:1;display:none;line-height:1.2em;',id:'showMessage'}, '<label for="list" title="以英文逗号分割">输入屏蔽ID</label><input type="text" id="list" value="' + GM_getValue("list") + '"/><br /><input type="button" id="save" value="保存"/>');
	document.body.appendChild(bar);
	$('save').addEventListener('click', function() {
			HiddenMessage();
		}, false);
}
CreateShowMessage();

function $(id) {
	return document.getElementById(id);
}

function $N(name, attr, childs) {
	var result = document.createElement(name);
	for (var i in attr) {
		result.setAttribute(i, attr[i]);
	}
	if (childs) {
		if (typeof childs == 'string') {
			result.innerHTML = childs;
		}
		else {
			for (var i = 0, j = childs.length; i < j; ++i) {
				var child = childs[i];
				result.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
			}
		}
	}
	return result;
}

}());