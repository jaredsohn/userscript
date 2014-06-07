// ==UserScript==
// @name        小百合教你如何把myopera的博客分享到微博
// @namespace   http://my.opera.com/taxet
// @version     0.9
// @description 把myopera上面的博客分享到微博。
// @match       http://my.opera.com/*
// ==/UserScript==

var shareUl = document.getElementById("share");
//var blogName = document.getElementById("top2").firstChild.firstChild.innerHTML;
//blogName.substring(0,blogName.index("<a"));
var weiboContent = document.title + " #myopera#";
var _w = 72 , _h = 20;
var param = {
	url:location.href,
	type:'3',
	count:'1', /**是否显示分享数，1显示(可选)*/
	appkey:'', /**您申请的应用appkey,显示分享来源(可选)*/
	title:weiboContent, /**分享的文字内容(可选，默认为所在页面的title)*/
	pic:'', /**分享图片的路径(可选)*/
	ralateUid:'', /**关联用户的UID，分享微博会@该用户(可选)*/
	language:'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
	rnd:new Date().valueOf()
}
var temp = [];
for( var p in param ){
	temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
}
var weiboLi = document.createElement("li");
weiboLi.innerHTML = '<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'" style="margin:6px 0 0 8px"></iframe>'
shareUl.appendChild(weiboLi);
