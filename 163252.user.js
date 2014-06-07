// ==UserScript==
// @name        小百合教你如何分享丧尸岛的丧尸串
// @namespace   http://my.opera.com/taxet
// @version     0.91
// @description 把丧尸岛上面奇怪的内容分享到微博，推她等正常的地方。
// @match       http://h.acfun.tv/*
// ==/UserScript==

(function(){
var posts = document.getElementsByTagName("blockquote");
for(var i = 0; i < posts.length; i++){
	var mess = posts[i].innerText;
	//delete space
	mess = mess.replace(/(^\s*)|(\s*$)/g, " ");
	//delete html format
	//mess.replace(/^<.*>$/g, "");
	//mess.replace(/<br>/g,"");
	if(mess.length>100)
		mess = mess.substr(0,100)+"……";
	mess += " #丧尸岛的丧尸串#";
	
	//get url of the post
	var urlAddr = posts[i].previousSibling;
	while(urlAddr.nodeType != 1) urlAddr = urlAddr.previousSibling;
	if(urlAddr.parentNode["id"] == "right_content"){ 
		urlAddr = urlAddr.previousSibling;
		while(urlAddr.nodeType != 1) urlAddr = urlAddr.previousSibling;
	}
	urlAddr = urlAddr.href;
	var param = {
		url:urlAddr,
		type:'3',
		count:'0', /**是否显示分享数，1显示(可选)*/
		appkey:'', /**您申请的应用appkey,显示分享来源(可选)*/
		title:mess, /**分享的文字内容(可选，默认为所在页面的title)*/
		pic:'', /**分享图片的路径(可选)*/
		searchPic:false,
		ralateUid:'', /**关联用户的UID，分享微博会@该用户(可选)*/
		language:'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
		rnd:new Date().valueOf()
	}
	var temp = [];
	for( var p in param ){
		temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
	}
	posts[i].innerHTML = posts[i].innerHTML + 
		' <a href="http://service.weibo.com/share/share.php?' + temp.join('&') + '" target="_blank">#微博</a>'
}
})();