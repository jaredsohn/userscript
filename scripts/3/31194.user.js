// ==UserScript==
// @name           wuapi_download
// @namespace      wuapi
// @description    This is a script that gets the MP4 file to download from the web service Wuapi.com (The new Stage6)
// @include        http://wuapi.com/videos/*
// @creator	   necudeco <@necudeco.com>
// @date	   2008-08-05
// @version	   1
// @homepage	   http://necudeco.com
// ==/UserScript==


function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}else 
	{ 
		$ = unsafeWindow.jQuery; 
		letsJQuery(); 
	}
}

GM_wait();

function letsJQuery() 
{
	var url =  new String(document.location);
	url = url.split("?");
	url = url[0];


	url = url.substring(url.lastIndexOf("/")+1,url.length);
	video = url;
	url = "http://wuapi.com/v/"+url;

	$.get(url,function(data)
	{
		url = $("ruta_video",data).html();
		url = url.substring(11,url.length-5);

		var enlace = document.createElement("a");
		enlace.href=url;

		enlace.appendChild(document.createTextNode(video));

		$("div#video_center").after(enlace);


	},"xml");

}

var head = document.getElementsByTagName('head')[0];

var script = document.createElement('script');
script.src="http://jqueryjs.googlecode.com/files/jquery-1.2.2.pack.js";

head.appendChild(script);




