// ==UserScript==
// @name        chan.yiffy.tk Downloader
// @namespace   http://localhost
// @description It changes chan.yiffy.tk gallery links to direct image links
// @include     http://chan.yiffy.tk/*
// @version     1.0
// ==/UserScript==

for (var x=0; x<23; x++){
	var src=document.getElementsByClassName("thumbnail")[x];
    var dir=src.getElementsByTagName("a")[0].getAttribute("href");
    var img=src.getElementsByTagName("img")[0].getAttribute("src");
    
    var dirNUM = dir.substring(dir.lastIndexOf("/"));
    var imgID = img.substring(30);
    
    var dlink = "http://file.yyz.chan.yiffy.tk" + dirNUM + imgID;

    var a = document.createElement('a');
    a.innerHTML = dlink;
    a.href = dlink;
    document.body.appendChild(a);
}