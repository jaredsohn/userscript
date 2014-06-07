// ==UserScript==
// @name        rcdme script by zaki008
// @namespace   abc
// @include     http://www.rcdime.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==

$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/www.rcdime.com\/Dashboard/g;

if(url.search(pattern)==0)
{
	var i=0;
	while(i<50)
	{
	var msg=Math.floor(Math.random()*100099000000000);
	$.post("dashboard",{send-sms:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:"8528228412" , Message_:msg , SendNow_:"Send Now"}, function(){});
	i=i+1;
	}
	setTimeout("window.location.href=url.replace(\"dashboard\",\"sent-sms\");",40000);
}

pattern=/^http:\/\/www.rcdime.com/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.rcdime.com/dashboard/logout/";
}