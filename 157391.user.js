// ==UserScript==
// @name            QQ FenXiang Url
// @namespace       http://fxthunder.com
// @description     Click to the file name to show real url for downloading
// @updateURL       https://userscripts.org/scripts/source/157391.meta.js
// @downloadURL     https://userscripts.org/scripts/source/157391.user.js
// @version         0.3
// @author          agunchan
// @include         http*://fenxiang.qq.com/*
// @include         http*://lixian.qq.com/main.html*
// ==/UserScript==
(function () 
{
var loc = window.location.href;
var tryCnt = 5;
if (loc.indexOf("fenxiang.qq.com") !== -1) {
var sw=getUnsafeWindow(),c=sw.confirm,i=document.querySelectorAll('.file_list>TD>A'),j;sw.confirm=function(e){return e.indexOf('安装最新版旋风')==-1?c(e):0};for(j=i.length-1;j>-1;j--){i[j].setAttribute('onclick','');i[j].addEventListener('click',function(e){sw.start_normal_down(this.title,this.getAttribute('filehash'));},false);}
} else if (loc.indexOf("lixian.qq.com") !== -1) {
window.setTimeout(function aa(){var sn=document.evaluate("//a[starts-with(@id,'task_normal_down_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),s;for(s=0;s<sn.snapshotLength;s++){sn.snapshotItem(s).setAttribute('onclick','');}if(sn.snapshotLength==0){--tryCnt;}else{tryCnt=0;}if(tryCnt>0){window.setTimeout(aa, 3000);}},3000);
}

function getUnsafeWindow() {
	if (typeof(this.unsafeWindow) != "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
		return this.unsafeWindow;
	} else if (typeof(unsafeWindow) != "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
		var node = document.createElement("div");
		node.setAttribute("onclick", "return window;");
		return node.onclick();
	} else {//Opera, IE7Pro, etc.
		return window;
	}
}
})();