// ==UserScript==
// @name           coco漫画翻页增强
// @namespace      www.cococomic.com
// @include        http://www.cococomic.com/manhua/*/*
// @include        http://*.99manga.com/manhua/*/*/*
// @include        http://*.99manga.com/manga/*/*
// @include        http://*.99comic.com/manhua/*/*
// @include        http://*.99770.cc/*/*/*
// @description    改变coco漫画(cococomic.com)、99漫画网(dm.99manga.com/dm.99comic.com/www.i99770.com)漫画阅读模式。去除广告。点击漫画/按回车键即可翻页。并且在每一话的最后一页自动跳到下一话。
// @version        0.3.4
// ==/UserScript==


var $=function(o) {
	return document.querySelectorAll(o);
}

var ads=$("div.a,div.f,div.h");
for(var i in ads) {
	if(ads[i].parentNode) {
		ads[i].parentNode.removeChild(ads[i]);
	}
}

var img=$("#ComicPic")[0];
img.style.cursor="pointer";
img.setAttribute("onclick","nextpage();");

document.addEventListener("keydown",function(evt) {
	if(evt.target.tagName=="INPUT") {
		return;
	}
	if(evt.keyCode==13) {
		location.href="javascript:nextpage();";
	} else if(evt.keyCode==8) {
		location.href="javascript:prevpage();";
	}
},false);

if(unsafeWindow.page>=unsafeWindow.datas) {
	var addr=/http:\/\/.+?\/[a-zA-Z0-9]+\/[0-9]+/.exec(location.href).toString();
	var comicInfo=/(\/[a-zA-Z0-9]+\/)([0-9]+)\/([0-9]+)\//.exec(location.href);
	if(comicInfo==null) {
		comicInfo=/(\/[a-zA-Z0-9]+\/)([0-9]+)\/[^\/]*?([0-9]+)\./.exec(location.href);
	}
	var comicId=comicInfo[2];
	var current=parseInt(comicInfo[3]);
	GM_xmlhttpRequest({
		method:"GET",
		url:addr.replace(comicInfo[1],"/Comic/"),
		onload:function(o){
			if(o.status==200){
				var a=new Array();
				var exp=new RegExp("<div id=b><a href=/[^/]+/"+comicId+"/([0-9]+)", "ig");
				var append=/[\?*&](s=[0-9]+)/.exec(location.href)[1];
				var p;
				while(p=exp.exec(o.responseText)) {
					a.push(p[1]);
				}
				if(a.length==0) {
					// www.99comic.com
					exp=new RegExp("<li><a href=/[^/]+/"+comicId+"/([^/]*?[0-9]+[^?]*)", "ig");
					while(p=exp.exec(o.responseText)) {
						a.push(p[1]);
					}
				}
				// 排序
				a.sort(function(a,b){return parseInt(/[0-9]+/.exec(a))-parseInt(/[0-9]+/.exec(b))});
				// 二分法查找当前话ID
				var low=0,high=a.length-1;
				while(low<=high) {
					mid=parseInt((low+high)/2);
					if(current>parseInt(a[mid])) {
						low=mid+1;
					} else if(current<parseInt(a[mid])){
						high=mid-1;
					} else {
						low=mid;
						break;
					}
				}
				// 下一话ID
				var next=a[low+1];
				if(next!=null) {
					var link=addr+"/"+next+"?"+append;
					location.href="javascript:(function(){nextpage=function(){location.href='"+link+"'};})();";
				}
			}
		}
	});
}
