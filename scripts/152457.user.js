// ==UserScript==
// @name        批量离线下载迅雷快传资源 
// @namespace   KsMaze
// @description 批量离线下载迅雷快传资源 
// @include     http://kuai.xunlei.com/d/*
// @version     2012.11.14
// ==/UserScript==

var textarea = document.createElement('textarea');
document.getElementsByClassName('download_w_new')[0].appendChild(textarea);

var getentry = function(){
	var urls = '';
	var files = document.getElementsByClassName('file_name');
	for(k in files)	{
		if (files[k].href != null)
			urls += files[k].href + '\n';
	}
	textarea.innerHTML = urls;
}
window.addEventListener('load', getentry, false);
