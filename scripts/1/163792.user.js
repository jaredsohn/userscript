// ==UserScript==
// @name        Rule34 Downloader
// @namespace   http://localhost
// @description It changes Rule 34 gallery links to direct image links
// @include     http://rule34.paheal.net/*
// @include     http://rule34.xxx/*
// @version     3.0
// ==/UserScript==

for (var x=0; x<60; x++){
    var src=document.getElementsByClassName("thumb")[x];
    var thumblink=src.getElementsByTagName("img")[0].getAttribute("src");
    
    
    var dirNum = thumblink.substring(33).substring(0,thumblink.substring(33).indexOf("/"));
    var img = thumblink.substring(((thumblink.lastIndexOf("thumbnail_"))+10));
    
    var dlink = "http://img.rule34.xxx//images/" + dirNum + "/" + img;

    if (dlink.contains("jpg"))
    {
        dlink = "http://img.rule34.xxx//images/" + dirNum + "/" + thumblink.substring(((thumblink.lastIndexOf("thumbnail_"))+10),thumblink.lastIndexOf(".")) + ".jpeg";

    }
    
    var a = document.createElement('a');
    a.innerHTML = dlink;
    a.href = dlink;
    document.body.appendChild(a);
}
   