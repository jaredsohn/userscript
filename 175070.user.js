// ==UserScript==
// @id             Feedly_Duplicate_Remover
// @name           Feedly Duplicate Remover
// @version        1.0
// @namespace      http://t.qq.com/HeartBlade
// @author         http://t.qq.com/HeartBlade
// @description    标题相同的文章仅保留一篇
// @include        http*://*.feedly.com/*
// @run-at         document-end
// ==/UserScript==
(function(){
document.getElementById("box").addEventListener("DOMNodeInserted",function(){
	var a=document.getElementsByClassName("u0Entry");
	var b=document.getElementsByClassName("u4Entry");
	var c=document.getElementsByClassName("u5Entry");
	var d=document.getElementsByClassName("u100Entry");
	var uEntry=a.length>0?a:(b.length>0?b:(c.length>0?c:(d.length>0?d:[])));
	var u0Arr = new Array();
	for(var i=0;i<uEntry.length;i++){
		u0Arr.push(uEntry[i].attributes["data-title"].value);/*data-alternate-link*/
	}
	for (i=0;i<u0Arr.length;i++){
		var tmp=u0Arr[i];
		var u0Arr2=u0Arr.slice(0);
		u0Arr2.splice(i,1,"HeartBlade");
		for (j=0;j<u0Arr2.length;j++){
			if (tmp==u0Arr2[j]){
				console.log("Feedly Duplicate Remover"+[j]);
				uEntry[j].parentNode.removeChild(uEntry[j]);
				/*uEntry[j].setAttribute("style","display:none");*/
			}
		}
	}
}, false);
})();