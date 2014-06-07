// ==UserScript==
// @name           download facebook video
// @author         frank38
// @version        1.0
// @namespace      http://www.facebook.com/
// @description    download facebook video
// @include		   http://www.facebook.com/*
// ==/UserScript==

var checker=setInterval(function(){
	var url = realUrl();
	if(!/(v=)(\d+)/.test(url))
		return;
	var video_id = url.match(/(v=)(\d+)/)[2];
    if(document.getElementById("video_actions") && !document.getElementById("download_video")) {
        //clearInterval(checker);
        req(video_id);
    }
}, 2000);

function realUrl() {
     if (window.location.hash.match(/\.php/)) {
        return 'http://'+window.location.host+window.location.hash.split('#')[1];
     } else if (window.location.href.indexOf('#') != -1) {
        return window.location.hash.split('#')[0];
     } else {
       return window.location.href;
     }
}

function req(id) {
	_url = "http://www.facebook.com/video/external_video.php?v=" + id;
	var video_info;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: _url,
	    onload: function(responseDetails) {
			video_info = eval('(' + unescape(responseDetails.responseText.substring(6)) + ')');
			video_src = video_info.content.video_src;
			video_title = video_info.content.video_title;
			appendUrl(video_src, video_title);
		}
	});
}

function appendUrl(src, title) {
	var ol;
	elements = document.getElementById("video_actions").children;
	for(var i=0; i< elements.length; i++) {
		if(elements[i].className === "actionspro")
			ol = elements[i];
	}
	if(!ol)
		return;
	var li = document.createElement("li");
	li.className = "actionspro_li";
	li.id = "download_video";
	li.innerHTML = "<a href=\"" + src + "\" title=\"" + title + "\" class=\"actionspro_a\">Download this video</a>";
	ol.appendChild(li);
}