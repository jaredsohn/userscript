// ==UserScript==
// @name        RCdime sms Hack By Gambler_No.1
// @namespace   RcDime
// @description RCdime sms--earn 1.70/- daily in 10minutes, this script is under developement,So..manually logout after 50 SMS delivered.
// @include     http://www.rcdime.com/*
// @include     http://adf.ly/*
// @version     1
// ==/UserScript==
var path = window.location.pathname;

var url=window.location.href;

var pattern=/^http:\/\/adf.ly/g;

if(url.search(pattern)==0)
{
setInterval(function () {document.getElementById("skip_ad_button").click();}, 2000);
}

pattern=/^http:\/\/adf.ly\/ad/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/L158m";
}

if (path == "/dashboard/")
{
	location.href = 'http://www.rcdime.com/dashboard/send-sms/';
}
else if (path == "/dashboard/send-sms/")
{
        document.getElementById('sendmob').value=8654818096;
	document.getElementsByName('inpx_msg')[0].value="Hi..., Have a Nice Day...! '"+Math.floor((Math.random() * 1000000000) + 1)+"'";
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
location.href = 'http://adf.ly/L158m';
	}
}