// ==UserScript==
// @id             inoreadercolorfullistview
// @name           InoReader Colorful ListView
// @author         http://t.qq.com/HeartBlade
// @homepage       http://userscripts.org/scripts/show/174161
// @updateURL      https://userscripts.org/scripts/source/174161.meta.js
// @version        0.9.0
// @description    InoReader Colorful list view 
// @include        http*://www.inoreader.com/*
// @include        http*://inoreader.com/*
// @include        http*://beta.inoreader.com/*
// @run-at         document-end
// ==/UserScript==
(function() {
document.getElementById("reader_pane").addEventListener("DOMNodeInserted",function (){
	var article=document.getElementsByClassName("article_header");
	for(var i=0;i<article.length;i++){
		var hue=article[i].parentNode.attributes["data-suid"].value*10%360;
		if (/article_unreaded/.test(article[i].parentNode.className)){
			article[i].setAttribute("style","background-color:hsl("+hue+",70%,80%);");
			article[i].childNodes[3].childNodes[1].setAttribute("style","background-color:hsl("+hue+",70%,80%);");
		}else if(/\barticle\b/.test(article[i].parentNode.className)){
			article[i].style.background="";
			article[i].childNodes[3].childNodes[1].setAttribute("style","background-color:#ededed");
		}
	}
},false);

})();