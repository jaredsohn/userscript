// ==UserScript==
// @name           KuKu动漫翻页增强
// @namespace      kukudm.com
// @include        http://kukudm.com/comiclist/*.htm
// @include        http://*.kukudm.com/comiclist/*.htm
// @include        http://*.kukudm.com:*/comiclist/*.htm
// @include        http://*.socomic.com/comiclist/*.htm
// @description    改变KuKu动漫(kukudm.com)阅读漫画模式。去除广告。点击漫画/按回车键即可翻页。并且在每一话的最后一页自动跳到下一话。
// @version        0.2.1
// ==/UserScript==

var $=function(o) {
	return document.querySelectorAll(o);
}

var ads=$("iframe");
for(var i in ads) {
	if(ads[i].parentNode) {
		ads[i].parentNode.removeChild(ads[i]);
	}
}

var img=$("img#comicpic")[0];
if(!img) {
	img=$("body>table>tbody>tr>td>img")[0];
}
img.style.cursor="pointer";

var next=$("img[src='/images/d.gif']")[0].parentNode;
if(next.href.match("/exit/exit.htm")) {
	next.href=/http:\/\/.*\/comiclist\/\d+\//.exec(location.href);
	GM_xmlhttpRequest({
		method:"GET",
		url:next.href,
		onload:function(o){
			if(o.status==200){
				try {
					var r=new RegExp("<dd><[aA] href='"+/\/comiclist\/\d+\/\d+/.exec(location.href)+".*?<dd><[aA] href='(.*?)'");
					next.href=r.exec(o.responseText)[1];
				} catch(err) {
				}
			}
		}
	});
}

var prev=$("img[src*='/images/t.gif']")[0];
if(prev) {
	prev=prev.parentNode;
}


img.addEventListener("click",function() {
	location.href=next.href;
},false);

document.addEventListener("keydown",function(evt) {
	if(evt.target.tagName=="INPUT") {
		return;
	}
	if(evt.keyCode==13) {
		location.href=next.href;
	} else if(evt.keyCode==8 && prev) {
		location.href=prev.href;
	}
},false);
