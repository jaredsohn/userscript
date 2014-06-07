// ==UserScript==
// @name           diary_replier
// @namespace      ru.ryotsuke
// @description    Форма ответа везде!
// @include        http://*.diary.ru/*
// ==/UserScript==

var formd = document.getElementById("msg_form");
if (formd != null ) {
var divs = document.getElementsByTagName("div");
var divslen = divs.length;
var comment;
var rating;

for(var i = 0; i < divslen; i++) {
	comment = divs[i];
	if(comment.className.indexOf("postContent") != -1) {
    comment.innerHTML+="<span style='display: block;padding: 5px; cursor: hand; text-decoration: underline;' onclick='var mBlock = document.getElementById(\"msg_form\");var newPlace = document.getElementById(\"reply"+i+"\");mBlock.parentNode.removeChild(mBlock);newPlace.insertBefore(mBlock, newPlace.firstChild);var mBlock = document.getElementsByName(\"form\")[0];mBlock.parentNode.removeChild(mBlock);newPlace.insertBefore(mBlock, newPlace.firstChild);pp(newPlace.parentNode.parentNode.getElementsByTagName(\"strong\")[0].innerHTML);'>Ответить прямо сюда</span><div id=\"reply"+i+"\"></div>";        
	}
	
	if(comment.className.indexOf("formcontainer") != -1) {
	 comment.innerHTML+="<span style='display: block; padding: 5px;cursor: hand; text-decoration: underline;' onclick='var mBlock = document.getElementById(\"msg_form\");var newPlace = document.getElementById(\"reply"+i+"\");mBlock.parentNode.removeChild(mBlock);newPlace.insertBefore(mBlock, newPlace.firstChild);var mBlock = document.getElementsByName(\"form\")[0];mBlock.parentNode.removeChild(mBlock);newPlace.insertBefore(mBlock, newPlace.firstChild);'>Форму ответа - сюда!</span><div id=\"reply"+i+"\"></div>";
	}
	 
}
}