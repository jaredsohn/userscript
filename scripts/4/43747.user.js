// ==UserScript==
// @name           百度帖吧大图还原器 Baidu Tieba Big Image
// @namespace      baidu_tieba_big_image
// @include        http://tieba.baidu.com/f?*z=*
// @include        http://tieba.baidu.com/f?*kz=*
// @include        http://tieba.baidu.com/club/*/p/*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.cn/f?*z=*
// @include        http://tieba.baidu.cn/f?*kz=*
// @include        http://tieba.baidu.cn/club/*/p/*
// @include        http://tieba.baidu.cn/p/*
// @include        http://tieba.baidu.com.cn/f?*z=*
// @include        http://tieba.baidu.com.cn/f?*kz=*
// @include        http://tieba.baidu.com.cn/club/*/p/*
// @include        http://tieba.baidu.com.cn/p/*
// @include        http://wapp.baidu.com/f/*m?kz=*
// @include        http://wapp.baidu.com/f/*m?*tn=bdPicLst*
// @match          http://tieba.baidu.com/f?*z=*
// @match          http://tieba.baidu.com/f?*kz=*
// @match          http://tieba.baidu.com/club/*/p/*
// @match          http://tieba.baidu.com/p/*
// @match          http://tieba.baidu.cn/f?*z=*
// @match          http://tieba.baidu.cn/f?*kz=*
// @match          http://tieba.baidu.cn/club/*/p/*
// @match          http://tieba.baidu.cn/p/*
// @match          http://tieba.baidu.com.cn/f?*z=*
// @match          http://tieba.baidu.com.cn/f?*kz=*
// @match          http://tieba.baidu.com.cn/club/*/p/*
// @match          http://tieba.baidu.com.cn/p/*
// @match          http://wapp.baidu.com/f/*m?kz=*
// @match          http://wapp.baidu.com/f/*m?*tn=bdPicLst*
// @version        0.7.2.110723
// ==/UserScript==

if (location.host != 'wapp.baidu.com') {
	// 如果图片太大，将其缩小到适合窗口宽度。设置为1启用
	var resize=1;

	// 删除右侧广告，腾出空间
	var e=document.getElementById("rightAd");
	e!=null && e.parentNode.removeChild(e);

	// 扩大宽度，填充右侧空白
	var snode=document.createElement("style");
	var cssStr=".c_post,div#thread_header,div#thread_footer,div#thread_title,.post,.post_split,div#content{width:100%}";
	snode.setAttribute("type","text/css");
	if(snode.styleSheet) {
		// IE
		snode.styleSheet.cssText=cssStr;
	} else {
		// w3c
		snode.appendChild(document.createTextNode(cssStr));
	}
	if(document.head) {
		document.head.appendChild(snode);
	} else {
		document.getElementsByTagName("head")[0].appendChild(snode);
	}

	// 将图片URL改成大图的，并去除尺寸限制
	for(var i=0;i<document.images.length;i++) {
		var image=document.images[i];
		var file=image.src;
		if(image.style.display!="none" && image.id=="" && image.alt=="" && file.search(/\/tb\/.*\/?img\//)==-1 && file.search(/\/tb\/.*\/?images\//)==-1 && file.search(/\?v=tbs$/)==-1 && file.search("http://tb.himg.baidu.com/")==-1 && file.search("http://tb.himg.baidu.cn/")==-1 && (image.parentNode.tagName!="A" || image.parentNode.href.indexOf("/tupian")==-1)) {
			image.style.width=null;
			image.style.height=null;
			image.removeAttribute("width");
			image.removeAttribute("height");
			image.removeAttribute("onload");
			if(/^http:\/\/.*\.baidu\.c[omn]{1,2}\/.*\/[am]?b?pic\/i?tem\/.+/.test(file)) {
				// 空间相册
				file=file.replace("/mpic/","/pic/");
				file=file.replace("/abpic/","/pic/");
				file=file.replace("/apic/","/pic/");
				if(file!=image.src) {
					image.src=file
				}
			}
			if(resize) {
				var rect=image.getBoundingClientRect();
				image.style.maxWidth=(document.documentElement.clientWidth-rect.left-10)+"px";
			}
		}
	}
} else {
	// 手机贴吧
	for (var i = 0; i < document.links.length; i++) {
		var link = document.links[i];
		if (link.href.match("http://.*?\\.baidu\\.c[omn]{1,2}/timg\\?.*?src=(http.*)")) {
			var src = unescape(RegExp.$1);
			var a = document.createElement("a");
			a.href = src;
			a.innerHTML = "\u5927\u56FE";
			a.style.marginLeft = "4px";
			link.parentNode.insertBefore(a, link.nextElementSibling);
		}
	}
}
