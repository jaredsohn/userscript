// ==UserScript==
// @name			Remove Meta refresh
// @author			极品ΦωΦ小猫
// @description		移除Meta标签中的刷新重定向功能，脚本头的include属性请输入你需要移除的网站，不推荐全局使用该脚本。
// @include			*
// ==/UserScript==

var metas=document.getElementsByTagName("meta");
for (var i=0,i<metas.length;i++){
	var thisMeta=metas[i];
	var thisText=thisMeta.getAttribute("http-equiv");
	if (thisText!=null && thisText.toLowerCase()=="refresh")
	{
		document.getElementsByTagName("head")[0].removeChild(thisMeta);
	}
}