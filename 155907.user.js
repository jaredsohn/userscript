// ==UserScript==
// @name		百度文库自动评分
// @description		百度文库一键评分
// @namespace		http:www.sbwtw.cn/
// @include		http://wenku.baidu.com/view/*
// @updateURL		https://userscripts.org/scripts/source/155907.meta.js
// @downloadURL		https://userscripts.org/scripts/source/155907.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/b772d3eab5ced4dad0c4cdb70e0d
// @author		sbwtws@gmail.com、雨滴在心头
// @version		1.0.2
// ==/UserScript==

window.addEventListener('load',function(){
	var price=5-unsafeWindow.WkInfo.DocInfo.price*0.7;
	var ct=20009;
	var doc_id=unsafeWindow.WkInfo.DocInfo.docId;
	
	var xml_http_request=new XMLHttpRequest();

	//发送请求
	var url="http://wenku.baidu.com/submit";
	var data="ct="+ct+"&doc_id="+doc_id+"&value_score="+(price>0 ? price:1);
	xml_http_request.open("post",url,true);
	xml_http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xml_http_request.send(data);

	//alert(data);
},false);
