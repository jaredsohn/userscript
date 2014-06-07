// ==UserScript==
// @name        RCdime sms Hack By Vikram Singh Bais
// @namespace   RcDime
// @description RCdime sms--earn 1.70/- daily in 10minutes,
// @include     http://www.rcdime.com/*
// @include     
// @version     1
// ==/UserScript==

var path = window.location.pathname;

var url=window.location.href;


if (path == "/dashboard/")
{
	location.href = 'http://www.rcdime.com/dashboard/send-sms/';
}
else if (path == "/dashboard/send-sms/")
{
        document.getElementById('sendmob').value=8654818096;
	document.getElementsByName('inpx_msg')[0].value="Hi..., Happy Holi...! '"+Math.floor((Math.random() * 1000000000) + 1)+"'";
setInterval(function () {document.getElementById("sendnow").click();}, 200);
	}

pattern=/^http:\/\/www.rcdime.com\/dashboard\/process_send-sms/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('b')[0].innerHTML;
	var pat="Opps";

	if(content.search(pat)==0)
	{
	window.location.href ="http://www.rcdime.com/?logged_out";
	}
else
	{
location.href = 'http://rcdime.com';
	}
}

