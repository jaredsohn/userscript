// ==UserScript==
// @name           analbreaker
// @namespace      hosamw
// @description    anal break
// @include        http://*.livetube.cc/*
// @include        http://livetube.cc/*
// ==/UserScript==

var override = document.createElement('script');
override.innerHTML ='var PrePostComment = function(){var tikan = ["まんこ", "チンコ", "ちんぽ", "アナル", "クリトリス", "おっぱい", "乳首", "ヒップ", "ケツ穴", "セックス", "sex", "オナニー", "スカトロ", "勃起", "バイブ", "オナホ", "セーラー服", "ニーソ", "スク水", "ホモ", "熟女", "裸エプロン", "マンコ","SEX"];for (var i=0; i < tikan.length; i++) {var re = new RegExp(String(tikan[i]), "g");$( "comment_area").value = $( "comment_area").value.replace(re, tikan[i].slice(0, 1) + " " + tikan[i].slice(1));};PostComment();};';
var head = document.getElementsByTagName('head')[0];
head.appendChild(override);

var btn = document.getElementsByTagName('button');
for (var i=0; i < btn.length; i++) {
	if(btn[i].getAttribute("onclick")=="PostComment();"){
		btn[i].setAttribute("onclick","PrePostComment();");
	}
};

document.getElementById("comment_area").setAttribute("onkeypress",
	"if( ( event.shiftKey || event.ctrlKey) && ( event.keyCode == 13 || event.keyCode == 14)){PrePostComment();}");