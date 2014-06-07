// ==UserScript==
// @name           ck101 A pen downloader
// @namespace      http://video.ck101.com
// @description    ck101 A pen downloader
// @include        http://video.ck101.com/play/detail/*
// ==/UserScript==

Main();

function Main()
{
	var result=/detail\/(.*?)\//.exec(location.href)
	
	if (!result.length) return;
	
	//alert("http://video.ck101.com/v/" + result[1] + "swf");
	//var btn = document.getElementsByClassName('downloadBj')[0];
	//btn.innerHTML = '<input name="0" id="MyDown" type="button" class="downloadButton" value="download" />';
	//document.getElementById('MyDown').setAttribute("onclick","alert(document.getElementById('videoplay1').innerHTML);");
	document.getElementById('videoplay1').innerHTML = '<embed name=flashtest id=flashtest src="http://video.ck101.com/v/'+ result[1] +'.swf" width="685" height="380"></embed>';
	document.getElementById('videoplay1').innerHTML += '<video name=flashtest2 id=flashtest2 src="http://video.ck101.com/v/'+ result[1] +'.swf" width="685" height="380"></video>';
}
