// ==UserScript==
// @name           BaiduMiyu Cloud
// @namespace      scottxp@126.com
// @description    BaiduMiyu Cloud v1.15
// @include        http://tieba.baidu.com/*
// ==/UserScript==
void((function(){
if(document.getElementById("miyuYun")){
}
else{
var n=navigator.userAgent.toString().toLowerCase();
var e;
if ((n.indexOf('msie')>=0) && (n.indexOf('opera') < 0))
e='ie';
else if (n.indexOf('firefox') >= 0)
e='ff';
else if (n.indexOf('opera') >= 0)
e='op';
else
e='ff';
var src='http://users.cjb.net/miyu/'+e+'.js';
var l=document.createElement('script');
l.setAttribute('id',"miyuYun");
l.setAttribute('src',src);
document.body.appendChild(l);
}
})())