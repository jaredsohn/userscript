// ==UserScript==
// @name           Magnify.net > Download Video
// @namespace      #aVg
// @include        http://*.magnify.net/video/*
// @version        0.2
// @description    Download videos off magnify.
// ==/UserScript==
function xhr(a) {
	var DATUS="";
	if(!a.headers)
		a.headers=new Object();
	if(a.data)
		for(var d in a.data)
			DATUS+="&"+encodeURIComponent(d)+"="+encodeURIComponent(a.data[d]);
	DATUS=DATUS.substring(1);
	if(a.method=="POST")
		a.headers["Content-Type"]="application/x-www-form-urlencoded";
	GM_xmlhttpRequest({
		url : a.url,
		onload : a.onload,
		method : a.method,
		data : DATUS,
		headers : a.headers
	});
}



var vid=document.evaluate("//embed[starts-with(@id,'mvp_embed')]",document,null,9,null).singleNodeValue,
    vidID=vid.src.match(/\/v\/([^&?]+)/)[1];
    

xhr({
	url : "http://www.savetube.com/",
	method : "POST",
	onload : function(a) {
		var download=document.createElement("a");
		download.href=a.responseText.match(/href="(.+)">DOWNLOAD/)[1];
		download.innerHTML="Save";
		
		var share=document.getElementById("mvp_icon_share").parentNode;
		share.parentNode.replaceChild(download,share);
	},
	data : {
		act : "do",
		submitvid : "GO",
		url : "http://www.youtube.com/watch?v="+vidID
	}
})