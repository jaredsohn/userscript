// ==UserScript==
// @name           自动关闭BYR校园网注销小窗口
// @namespace      http://211.68.68.41:9002/0
// @description	   屏蔽这个关不掉的小窗口
// @include        http://10.3.8.211:9002/0 
// @include        http://10.3.8.212:9002/0
// @include        http://gw.bupt.edu.cn:9002/0
// @include        http://211.68.68.41:9002/0
// @version        1.0
// @author         Bing
// ==/UserScript==

function onLoad(event) {
	window.close();
}
onLoad();