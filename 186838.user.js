// ==UserScript==
// @name        Discuz论坛新窗
// @namespace   http://userscripts.org/users/513815
// @description Discuz模板论坛“新窗口打开帖子”的复选框自动选中
// @include     http://bbs.*.*/*
// @include     http://game.ali213.net/*
// @version     1.0
// @grant       none
// ==/UserScript==
var loc=window.location.href,
	/*脚本支持的论坛，自行编辑时请注意格式。*/
	/*格式是这样的：网址以bbs开头的，比如http://bbs.kafan.cn，只需将"kafan"这几个字符提取出来，并用单引号包围，放入下面变量(arr)等号后的中括号中，字符串不止一个时用逗号分隔开；*/
	/*论坛地址不是以bbs开头的，比如游侠论坛的网址为http://game.ali213.net，在进行前面步骤的操作后，还要在脚本的元信息中包含该网址，必要时应在相关变量(mloc)等号后面的正则表达式部分加入该网址开头字段（即这里的"game"，已添加），判断方法是比较网址开头与"(?:bbs|game)"字段括号中的内容，如果没有相同或重复的话（这里是bbs或者game），则将其添加到此字段括号中的末尾，并用"|"与前面分隔开，具体均可参照脚本已给出的范例。*/
	arr=['kafan','saraba1st','a9vg','gfan','weiphone','duowan','zhibo8','tgbus','3dmgame','ali213','pcbeta'],
    mloc=loc.match(/http:\/\/(?:bbs|game)\.(.*?)\.[^\/]*\//)[1],
	nw=function(){
		var tc=document.cookie.indexOf('_atarget=1'),
			x=document.getElementById('atarget');
		if(tc<0&&x)
			x.click();
     };
if(arr.indexOf(mloc)>-1)
	nw();