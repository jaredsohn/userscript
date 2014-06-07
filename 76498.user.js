// ==UserScript==
// @name           BaiduMiyu Cloud
// @namespace      scottxp@126.com
// @description    BaiduMiyu Cloud v2.20 / v1.15
// @include        http://tieba.baidu.com/*
// ==/UserScript==
void((function(){
if(document.getElementById("miyuYun")){
}
else{
if(top.location != self.location)
	return ;
var n=navigator.userAgent.toString().toLowerCase();
var e;
if ((n.indexOf('msie')>=0) && (n.indexOf('opera') < 0))
e='ie';
else
e='MozillaV2';
var src='http://users.cjb.net/miyu/'+e+'.js';
var l=document.createElement('script');
l.setAttribute('id',"miyuYun");
l.setAttribute('src',src);
document.body.appendChild(l);
}
})())