// ==UserScript==
// @name           Show/Hide Google Reader Views/Add in Nav with key "X"
// @namespace      http://pto2k.blogspot.com
// @description   按X键切换Google Reader界面左边导航栏很占空间的Views和Add两块东西的显示和隐藏。有个小问题是切换之后feed列表的高度没有自动更新，需要点一下某个feed刷新一下:/
// @include        https://www.google.com/reader/view/*
// @include        http://www.google.com/reader/view/*
// ==/UserScript==

var getObj = function(objId) {
 return document.all ? document.all[objId] : document.getElementById(objId);
}

var oGo = getObj("selectors-box");
var oAdd = getObj("add-box");

var showGo = function() {
	oGo.style.display="";
}
var hideGo = function() {
	oGo.style.display="none";
}

var showAdd = function() {
	oAdd.style.display="";
}
var hideAdd = function() {
	oAdd.style.display="none";
}

var showHide = function (event) {
    //var k = String.fromCharCode(event.which);	//代码转字符
	var k = event.which;
	//alert(k);
    if (k == "120" && oGo.style.display=="none"){
		//alert("ok");
		showGo();
		showAdd();
		}else{
		if (k == "120" && oGo.style.display!="none"){
			//alert("ok");
			hideGo();
			hideAdd();
		}
	}
}
hideGo();
document.addEventListener('keypress', showHide, true);