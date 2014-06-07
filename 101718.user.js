// ==UserScript==
// @name           Convert English MSDN To Chinese Version
// @namespace      demoshop
// @description    將英文版的 MSDN 轉換為 正體中文版
// @author         demo http://demo.tc
// @include        http://msdn.microsoft.com/en-us/library/*
// @include        http://msdn.microsoft.com/zh-tw/library/*
// @version 0.3
// ==/UserScript==
  
	var url = location.href;
	
	if(/en-us/.test(url))
		showButton("正體中文")
	else
		showButton("英文")
		
		
	function getElementsByClassName (className) {
	   var all = document.all ? document.all : document.getElementsByTagName('*');
	   var elements = new Array();
	   for (var e = 0; e < all.length; e++) {
		 if (all[e].className == className) {
		   elements[elements.length] = all[e];
		   break;
		 }
	   }
	   return elements;
	 }
	 
	 function showButton(txt){
	 var newUrl='';
	 switch(txt){
		 case '正體中文':
			newUrl=url.replace(/en-us/,'zh-tw');
			break;
		 case '英文':
			newUrl=url.replace(/zh-tw/,'en-us');
			break;
		}
		getElementsByClassName('toclevel1')[0].innerHTML +="<a href='"+newUrl+"'>切換為"+txt+"顯示</a>";
	 }