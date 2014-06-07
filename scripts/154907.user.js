// ==UserScript==
 
// @name           kankan
// @description    迅雷看看视频直接看，不再提示需要高清组件！
// @include        http://vod.kankan.com/v/*.shtml*
// @include        http://vod.kankan.com/trailer/*.shtml*
// @include        http://vod.kankan.com/1080p/*.shtml*
// @author         kafan(narutovsop&pcxfirefox&yndoc)
// @version        1.4
 
// ==/UserScript==

var div = document.getElementById("xmpInstallTips");
div.parentNode.removeChild(div);
if(location.href.indexOf('?id=731021')<0)location.href=location.href+'?id=731021';