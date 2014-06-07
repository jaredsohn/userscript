// ==UserScript==
// @name           Hoopchina4sina
// @namespace      hoopchina4sina
// @description    app for hoopchina
// @include        http://bbs.hoopchina.com/*.html*
// @include        http://bbs.goalhi.com/*.html*
// @include        http://my.hoopchina.com/*/blog/*.html*
// @include        http://news.hoopchina.com/*.html
// @include        http://news.goalhi.com/*.html
// @author         train/unbounder.train@gmail.com
// @version        beta
// ==/UserScript==
//更新1：增加日志和goalhi域名下的分享
//更新2：增加流言板分享和修正正则bug
//更新3：去掉jquery引用，实现chrome下功能，修正url的一些bug

function drawUI(){
	var url = encodeURIComponent(location.href);
	var str = "http://hits.sinajs.cn/A1/weiboshare.html?url="+url+"&appkey=1111277370&type=5";
	var obj=document.getElementsByTagName("h1");
	var obj1 = document.createElement("iframe");
	obj1.setAttribute("frameborder","0");
	obj1.setAttribute("scrolling","no");
	obj1.setAttribute("src",str);
	obj1.setAttribute("width","104");
	obj1.setAttribute("height","23");
	obj[0].appendChild(obj1);
}
drawUI();