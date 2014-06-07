// ==UserScript==
// @name        filebase Download Delay Bypass
// @description Auto click, redirect
// @include     http://filebase.to/files/*
// @include     http://*.filebase.to/files/*
// @version     1.0
// @author      lijun
// ==/UserScript==

function start() {
var obj = document.getElementsByTagName('form');

for (var i = obj.length - 1; i >= 0; i--)
{       
	if (obj[i].innerHTML.indexOf('id="dl_free3"') != -1)
	{
		obj[i].submit();	
}

        }
}
start();
function skip() {
 var obj = document.getElementsByTagName('form');

for (var i = obj.length - 1; i >= 0; i--)
{       
	if (obj[i].innerHTML.indexOf('id="submit"') != -1)
	{
		obj[i].submit();	
}
  
else { setTimeout(skip,1999);  }
        }
 }
skip();

function download() {
 var obj = document.getElementsByTagName('form');

for (var i = obj.length - 1; i >= 0; i--)
{       
	if (obj[i].action.indexOf('/download/') != -1)
	{
		obj[i].submit();	
}
  
else { setTimeout(download,1999);  }
        }
 }
download();