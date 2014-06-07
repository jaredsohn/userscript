// JavaScript Document
// ==UserScript==
// @name          Style Fixer for the testing site
// @namespace     http://pto2k.blogspot.com
// @description   temp modifications on m site
// @include        http://218.242.147.198/*
// ==/UserScript==

//去除警告
//var w = unsafeWindow;
//var f = function(){return true;};
//w.alert_ = w.alert;
//w.alert = f;
//w.confirm_ = w.confirm;
//w.confirm = f;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body{font-family:"Lucida Grande";font-size:12px;}');
addGlobalStyle('a{color:#FF0000;margin-left:2px;text-decoration:none;}');
addGlobalStyle('#FooterDIV{display:none;}');
addGlobalStyle('a.BtnGridLink{width:"120px";}');
addGlobalStyle('a.BtnGridLink1{width:"120px";}');

if (window.location.href.indexOf("Default.aspx")<0){
addGlobalStyle('#Container{width:1200px;}');
addGlobalStyle('#MainDIV{width:90%;padding:50px 10px 10px 20px;position:absolute;left:200px;}');
addGlobalStyle('#MiddleDIV{width:100%;	padding:10px 10px 10px 10px;}');
addGlobalStyle('#ContentInfoTable{width:95%}');
}

//房源页面
if (window.location.href.indexOf("ManagerHousingInfo.aspx")>-1){
	addGlobalStyle('#Container{width:1000px;}');
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//div[@style='overflow-x: scroll; width: 710px;']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		//alert("hello")
		thisDiv.style.overflowX = "hidden"
		thisDiv.style.width = "1200px"
	//	thisDiv.style.font-size = "10px"
	}
}
//门店管理
if (window.location.href.indexOf("EconomicPersonListPage.aspx")>-1 |window.location.href.indexOf("ManagerEconomicMan.aspx")>-1){
	addGlobalStyle('#Container{width:2000px;}');
	addGlobalStyle('#MainDIV{width:1500px;padding:50px 10px 10px 20px;position:absolute;left:200px;}');
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//div[@style='overflow-x: scroll; width: 710px;']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		//alert("hello")
		thisDiv.style.overflowX = "hidden"
		thisDiv.style.width = "100%"
	//	thisDiv.style.font-size = "10px"
	}
	
		var allTabs, thisTab;
	allTabs = document.evaluate(
		"//Table[@width='910']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allTabs.snapshotLength; i++) {
		thisTab = allTabs.snapshotItem(i);
		// do something with thisDiv
		thisTab.width="90%"
	}
	
}
//经纪人
if (window.location.href.indexOf("ManagerEconomicMan.aspx")>-1){
	addGlobalStyle('#Container{width:1600px;}');
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//table[@width='860']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		//alert("hello")
		thisDiv.style.width = "1200px"
		thisDiv.style.size = "10px"
	}
}



//  str   =   "塑料：是；安装：有；添加：否；"  
//  alert(str.indexOf("安装：有")>-1)  
//   
//  str   =   "塑料：是；安装：是有；添加：否；"  
//  alert(str.indexOf("安装：有")>-1)   

var jumpLink, linkText1, linkRef, linkText2;
jumpLink = document.getElementsByTagName('a');
if (jumpLink.length){//至少有一个链接
	linkText1 = jumpLink[0].text;
	linkRef = jumpLink[0].href;
	linkText2 ="跳转到登陆页面";
	if (linkText1 == linkText2){
		window.location.href = linkRef;	
	}
}
//获得对象
var getObj = function(objId) {
 return document.all ? document.all[objId] : document.getElementById(objId);
}

var focusCheck;
if (focusCheck=getObj('txtCheckCode')){
focusCheck.focus();
}