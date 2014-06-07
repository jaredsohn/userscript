// ==UserScript==
// @name        google_addmemu
// @namespace   http://
// @description googleの上部メニューにTwitterとfacebookを追加します
// @include     https://www.google.co.jp/*
// @version     1
// ==/UserScript==
(function(){
	var gbzc = document.getElementById("gbzc");
	
	var li_t = document.createElement("li");
	var a_t = document.createElement("a");
	var span1_t = document.createElement("span");
	var span2_t = document.createElement("span");
	var str_t = document.createTextNode("Twitter");
	
	var li_f = document.createElement("li");
	var a_f = document.createElement("a");
	var span1_f = document.createElement("span");
	var span2_f = document.createElement("span");
	var str_f = document.createTextNode("facebook");
	
	span1_t.className = "bgtb2";
	span2_t.className = "gbts";
	span2_t.appendChild(str_t);
	
	a_t.className = "gbzt";
	a_t.href = "https://twitter.com";
	a_t.appendChild(span1_t);
	a_t.appendChild(span2_t);
	
	li_t.className = "gbt";
	li_t.appendChild(a_t);
	
	span1_f.className = "bgtb2";
	span2_f.className = "gbts";
	span2_f.appendChild(str_f);
	
	a_f.className = "gbzt";
	a_f.href = "http://ja-jp.facebook.com/";
	a_f.appendChild(span1_f);
	a_f.appendChild(span2_f);
	
	li_f.className = "gbt";
	li_f.appendChild(a_f);
	
	gbzc.insertBefore(li_t, gbzc.lastChild);
	gbzc.insertBefore(li_f, gbzc.lastChild);
	
})();
