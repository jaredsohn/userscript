// ==UserScript==
// @name           3gokushi-hitokomekesu
// @namespace      3gokushi-hitokomekesu
// @description    ひとコメ消す
// @include        http://*.3gokushi.jp/*
// @include        http://mixi.jp/run_appli.pl?id=6598
// @include        http://*.mixi-platform.com/*
// @author         zusiou
// @version        1.0.1.20130723
// ==/UserScript==

// ver1.00.2013.07.23
// ver1.01.2013.07.23 ダブルクリックでトグルするようにしました。

var myEle = document.getElementById("commentList");
myEle.style.visibility = "hidden";
document.getElementById("comment").ondblclick = function(){
	if(myEle.style.visibility == "visible"){
		myEle.style.visibility = "hidden";
	}else{
		myEle.style.visibility = "visible";
	}
}