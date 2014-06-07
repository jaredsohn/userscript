// ==UserScript==
// @id             cleanQQweibo@HeartBlade
// @name           企鹅免骚
// @version        1.2
// @namespace      http://t.qq.com/HeartBlade
// @author         http://t.qq.com/HeartBlade
// @updateURL      https://userscripts.org/scripts/source/176760.meta.js
// @downloadURL    https://userscripts.org/scripts/source/176760.user.js
// @description    屏蔽企鹅微博个人主页里未收听用户的微博（如微博推广、微活动等），适用2013新版
// @include        http://t.qq.com/*
// @run-at         document-end
// ==/UserScript==
(function(){
	document.getElementById("talkList").addEventListener("DOMNodeInserted",function(){
		var tmp=document.querySelectorAll("li[tv='2'] .addAttention");
		if (tmp.length>0){
		    for each(var a in tmp ){
		        if (a.parentNode.parentNode.parentNode){
			        a.parentNode.parentNode.parentNode.setAttribute("style","display:none")
		        }
		    }
		}
	},false)
})()