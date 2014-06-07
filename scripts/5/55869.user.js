// ==UserScript==
// @name           iTruewifi
// @namespace      
// @include        http*://portal.trueinternet.co.th/*
// ==/UserScript==

//--------- VARIABLES  CONFIG  THIS  -------------------

var macAddress = "";
var minuteWait = 80;
var VLAN = 851;

//------------------------------------------------------------------------

if(location.href.indexOf("login_result.php")!=-1){
	setTimeout(function() {document.location = 'https://portal.trueinternet.co.th/wifiauthen/logout_result.php';} ,minuteWait*60000);
}
else if(location.href.indexOf("logout_result.php")!=-1){
	document.location = 'http://portal.trueinternet.co.th/wifiauthen/login.do?VLAN='+VLAN+'&MAC='+macAddress+'&VERSION=V2';
}
else if(location.href.indexOf("login.php")!=-1){
	setTimeout("document.form.submit()",1000);
}