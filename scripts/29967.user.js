// ==UserScript==
// @name          Enable mousewheel to zoom pictures/允许鼠标滚轮缩放图片
// @namespace      http://userscripts.org/users/59173/scripts
// @description  For Phpwind 5.3 forum, tested on www.jxcad.com.cn/适用于PHPWind5.3论坛，在中国机械CAD论坛测试成功
// @include        http://www.jxcad.com.cn/read.php*
// ==/UserScript==
var res =  document.evaluate("//img[@onmousewheel]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(res.snapshotLength){
	function wheel(e){
		e.target.width-=e.detail*12;
		e.preventDefault();
		e.returnValue = false;
	}
	for (var i=0;i<res.snapshotLength;i++) {
      		res.snapshotItem(i).addEventListener('DOMMouseScroll', wheel, false);
	}
}