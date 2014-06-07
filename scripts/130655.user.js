// ==UserScript==
// @name           kafan bbs fix
// @namespace      [http://bbs.kafan.cn/]
// @description    使得卡饭子版面显示正常
// @include        http://bbs.kafan.cn/forum-*-*.html
// @include        http://bbs.kafan.cn/forum.php*
// ==/UserScript==

var tmps = document.getElementById("wp").childNodes;
var target = null;
for(var i = 0; i < tmps.length; i++){
	var tmp = tmps[i];
	if(tmp.className == "wp"){
		target = tmp;
		break;
	}
}

var newTable = document.createElement("iframe");
newTable.setAttribute("height", "3");
newTable.setAttribute("frameborder", "0");
newTable.setAttribute("style", "display:hidden;margin:0");
target.appendChild(newTable);

