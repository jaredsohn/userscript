// ==UserScript==
// @name       Xunlei Download link for ffdy.cc
// @namespace  http://www.einverne.tk
// @version    2013.11.10
// @description  find the download link for xunlei
// @match       http://www.ffdy.cc/teleplay/*
// @match       http://www.ffdy.cc/movie/*
// @copyright  2013+, einverne
// ==/UserScript==

(function(){

	var textarea = document.createElement('textarea');
	var links = document.getElementsByClassName('XL_CLOUD_VOD_BUTTONyundianbo_btn_normal');
	console.log(links.length);
	for (var i = 0; i < links.length; i++) {
		var href = links[i].href;
        
        var url = /vod\/\?url=(.+)/;
        var downloadlinks = href.match(url);
        textarea.innerHTML += decodeURIComponent(downloadlinks[1])+'\n';
	};
    textarea.style.height="100px";
    textarea.style.width ="725px";
    document.getElementsByClassName('resourcesmain')[0].appendChild(textarea);

}());