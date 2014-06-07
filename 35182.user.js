// ==UserScript==
// @name           zshare_bypass plus
// @namespace      zshare_bypass plus
// @description    Bypass timer and  download starts automatically.
// @include        http://www.zshare.net/download/*
// ==/UserScript==
// Version 20081009


var dl_element = document.getElementById('download');
//If this is not the image button at http://www.zshare.com/images/download.gif
if (dl_element.type != 'hidden')
{
	var html_to_add = document.createElement("a");
	html_to_add.setAttribute("href",unsafeWindow.link);
	html_to_add.setAttribute("id","dd");
	html_to_add.innerHTML = "<center><b>I CANT WAIT</b></center>";
	var daddy = dl_element.parentNode;
	daddy.appendChild(html_to_add);

	//comment out this line to remove automatic downloads
    	setTimeout(clickDownload,1000);
}

	function clickDownload(){
		document.location.href=document.getElementById("dd").href;
    }
