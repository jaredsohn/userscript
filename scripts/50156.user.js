// ==UserScript==
// @name           excellent_teacher
// @namespace      learn.thu
// @include        http://zhjwjxpg.cic.tsinghua.edu.cn/pj.xspj_cpryb.do?*
// @include        http://zhjwjxpg.cic.thu.edu.cn/pj.xspj_cpryb.do?*
// ==/UserScript==

function main()
{
	for (var i=0; i<=10; i++) {
		var targets = document.getElementsByName("cpsj"+i);
		if (targets.length)
			targets[0].checked = true;
	}
}


window.addEventListener("load", main, false);
