// ==UserScript==
// @name        verypsp搜索添加
// @namespace   verypsp搜索添加
// @description verypsp搜索添加
// @include     http://bbs.verypsp.com/*
// @version     1
// ==/UserScript==
tags = document.getElementsByTagName("a");
for(var i=0;i<tags.length;i++){
	var onclickvalue=tags[i].outerHTML;
	if(onclickvalue.indexOf("faq.php")>0){
		onclickvalue=onclickvalue.replace("帮助","搜索");
		onclickvalue=onclickvalue.replace("faq.php","search.php?mod=forum");
		tags[i].outerHTML=onclickvalue;
	}
}