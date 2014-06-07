// ==UserScript==
// @name        Ychan Downloader
// @namespace   http://localhost
// @description It changes Ychan gallery links to direct image links
// @include     http://ychan.ca/*
// @version     1.2
// ==/UserScript==
  
for (var x=0; x<25; x++){
    var src=document;
    var img=src.getElementsByTagName("strong")[x].innerHTML;
    var dlink = "http://file.yyz.chan.yiffy.tk/" + img;


    var a = document.createElement('a');
    a.innerHTML = dlink;
    a.href = dlink;
    document.body.appendChild(a);
}