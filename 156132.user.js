
﻿// ==UserScript==
// @name antiATT
// @namespace http://antigate.com
// @version 1
// @source http://barbaros.hut2.ru
// @description Распознавание каптчи и обход АТТ
// ==/UserScript==




// ==Userscript==
var key=""; 	// Ключ аккаунта антигейта

	if (window.addEventListener){
	    window.addEventListener("message", listener,false);
	} else {
	    window.attachEvent("onmessage", listener);
	}

	function listener(event)
	{
		var iframe=document.createElement('iframe');
		iframe.src=event.origin+"/user/check" ;
		document.body.appendChild(iframe);

		iframe.onload=function()
		{

		if (window.top==window.parent) 
			send_captcha(event.data, event.origin);
		}
	}

function send_captcha(data, server)
{
var httpRequest = new XMLHttpRequest();
var boundary = '-----564AaBhdhdhd03x';
var requestBody = "--" + boundary + "\r\n" +
	"Content-Disposition: form-data; name=\"method\"\r\n" +
	"\r\n" +
	"base64" + "\r\n" +
	"--" + boundary + "\r\n" +
	"Content-Disposition: form-data; name=\"key\"\r\n" +
	"\r\n" +
	key + "\r\n" +
	"--" + boundary + "\r\n" +
	"Content-Disposition: form-data; name=\"body\"\r\n" +
	"\r\n" +
	data + "\r\n" +
	"--" + boundary + "\r\n" +
	"Content-Disposition: form-data; name=\"ext\"\r\n" +
	"\r\n" +
	"png" + "\r\n" +
	"--" + boundary + "\r\n" +
	"Content-Disposition: form-data; name=\"is_russian\"\r\n" +
	"\r\n" +
	"1" + "\r\n" +
	"--" + boundary + "\r\n" +
	"Content-Disposition: form-data; name=\"regsense\"\r\n" +
	"\r\n" +
	"1" + "\r\n" +
	"--" + boundary + "--";

httpRequest.open('POST', "http://antigate.com/in.php", true);
httpRequest.setRequestHeader('Content-Type','multipart/form-data; boundary=' + boundary); 
httpRequest.setRequestHeader("Content-length", requestBody.length);
httpRequest.send(requestBody);

httpRequest.onload = function() 
	{
		if (httpRequest.responseText.match('ERROR')) {
			window.top.postMessage("error", server);
		}
		else if (httpRequest.responseText.match('OK')) {
			sessionStorage.cap_id=/\d+/.exec(httpRequest.responseText);
			if ((sessionStorage.cap_id!=null)&&(sessionStorage.cap_id!=undefined))
			getid(server);
		}
	}
httpRequest.onerror = function() {window.top.postMessage("error", server);}
}
///welcome barbaros.hut2.ru//
function getid(server) 
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://antigate.com/res.php?key="+key+"&action=get&id="+sessionStorage.cap_id, true);
	xhr.onload = function() 
	{
		if (xhr.responseText.match("CAPCHA_NOT_READY")) 
			setTimeout(function(){getid(server);}, 5000);	
	
		else if (xhr.responseText.match('OK')) 
		{
			sessionStorage.removeItem("cap_id");
			var arr = xhr.responseText.split("|");
			window.top.postMessage(arr[1], server);
		}
		else //if (xhr.responseText.match('ERROR'))
		{	sessionStorage.removeItem("cap_id");
			window.top.postMessage("error", server);
		}
	}
	xhr.onerror = function() {window.top.postMessage("error", server);}
	xhr.send(null);
}