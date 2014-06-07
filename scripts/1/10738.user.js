// ==UserScript==
// @name		niconico downloader
// @namespace	http://www.nicovideo.jp/
// @include		http://www.nicovideo.jp/watch/*
// @description	add get flv link to nicovideo / MPL/GPL/LGPL triple license

GM_xmlhttpRequest({
	method : "GET",
	url : "http://www.nicovideo.jp/api/getflv?v=" + location.pathname.match(/\/[^\/]+\/(.*)$/)[1],
	onload : function(details){
		try {
			if (!unescape(details.responseText).match(/closed=1/)){
				var flvlink = document.createElement('a');
				flvlink.href = unescape(details.responseText).match(/\&url=([^\&]+)\&/i)[1];
				
				var button = document.createElement('img');
				button.src = "data:";
				button.alt = "[get flv]";
				button.style.border = "none";
				
				var h = document.getElementsByTagName('h1')[0];
				
				flvlink.appendChild(button);
				h.appendChild(flvlink);
			}
		}
		catch (e){
			alert(e);
		}
	},
	onerror : function(details){
		alert([
			details.status,
			details.statusText,
			details.readyState,
			details.responseHeaders,
			details.responseText
		].join("\n"));
	}
});
