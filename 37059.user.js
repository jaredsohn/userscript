// ==UserScript==
// @name           flip
// @namespace      ru.ryotsuke
// @description    Сворачивает поднятые посты
// @include        http://*.diary.ru/*
// @exclude        http://*.diary.ru/*.htm
// ==/UserScript==


var divs = document.getElementsByTagName("div");
var divslen = divs.length;
var comment;
var rating;

for(var i = 0; i < divslen; i++) {
	comment = divs[i];
	if(comment.className.indexOf("postContent") != -1) {
	  var bs= comment.getElementsByTagName("b");
	  if((bs!=null)&&(bs.length>0)) {	
	   if(bs[bs.length-1].innerHTML=="запись создана:")
      comment.innerHTML="<div id=div"+i+" style='display: none;'>"+comment.innerHTML+"</div><span id=undiv"+i+" style='display: block; padding: 5px;'><br>Тут была запись, которую вы уже читали. <span style='cursor: hand; text-decoration: underline;' onclick='document.getElementById(\"undiv"+i+"\").style.display=\"none\";document.getElementById(\"div"+i+"\").style.display=\"block\";'>Показать?</span><br><br></span>"; 
	  }        
	}
}
	 



