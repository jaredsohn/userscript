// ==UserScript==
// @name        OA系统火狐兼容脚本
// @namespace   OA系统火狐兼容脚本
// @description OA系统火狐兼容脚本
// @include     http://172.16.2.213:8080/*
// @version     1
// ==/UserScript==
//第五行的地址改成自己的OA系统的地址即可
tags = document.getElementsByTagName("a");
for(var i=0;i<tags.length;i++){
	x=i+4;
	var onclickvalue=tags[i].outerHTML;
	if(onclickvalue.indexOf("javascript:location.href")>0){
	id=onclickvalue.substring(onclickvalue.indexOf("DIA_ID=")+7,onclickvalue.indexOf("&amp"));
	onclickvalue=onclickvalue.replace("javascript:location.href(","window.location=");
	onclickvalue=onclickvalue.replace(')"',';"');
	if(tags[x].innerHTML=='查看全文'){
		if(tags[i].innerHTML=='查看全文'){
			onclickvalue=onclickvalue+' | <a title="编辑" onclick="'+'window.location=\'edit.php?DIA_ID='+id+'\';" href="#">编辑</a>';
		}
	}
		tags[i].outerHTML=onclickvalue;
	}
}