// ==UserScript==
// @name           Vimeo Downloader
// @namespace      pigeontech.com
// @description    For videos where download is not enabled by the uploader, it'll insert a download link anyway.
// @version        1.1
// @include        http://vimeo.com/*
// ==/UserScript==

location.href="javascript:("+function(){var a=document.getElementsByClassName("f player")[0].getAttribute("id"),b=eval(a.replace("player_","clip")),a=b.config.video.files.h264,e=b.config.request.timestamp,b=b.config.request.signature,f=document.getElementById("clip_id").getAttribute("value"),c;for(i=a.length-1;i>=0;i--){var d="//player.vimeo.com/play_redirect?quality="+a[i]+"&codecs=h264&clip_id="+f+"&time="+e+"&sig="+b+"&type=html5_desktop_local";c=i==a.length-1?'<a href="'+d+'">'+a[i]+"</a>":'<a href="'+
d+'">'+a[i]+"</a>, "+c}document.getElementsByClassName("download")[0].innerHTML.match(/.*Download this video.*/)?(a=document.createElement("li"),a.innerHTML="Download MP4: "+c,document.getElementsByClassName("file_details")[0].insertBefore(a,document.getElementsByClassName("file_details").firstChild)):document.getElementsByClassName("download")[0].innerHTML="<li>Download MP4: "+c+"</li>"}+")()";