// ==UserScript==
// @name AutoFocus2Input
// @author izml
// @description  自动激活鼠标指针下的输入框，鼠标移出则取消焦点
// @version 1.0
// @downloadURL  https://userscripts.org/scripts/source/163672.user.js
// @updateURL    https://userscripts.org/scripts/source/163672.meta.js
// @include http*
// @grant none
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function(){//return
	var outDelay=500;	//取消焦点延迟(ms)
	var es=document.getElementsByTagName('input');
	var allowedTypes={'password':1,'text':1,'search':1}
	for(var i=es.length-1;i>=0;i--){
		if(allowedTypes[es[i].type])
			AutoFocus2Input(es[i]);
	}
	es=document.getElementsByTagName('textarea');
	for(var i=es.length-1;i>=0;i--){
			AutoFocus2Input(es[i]);
	}
var ee;
function AutoFocus2Input(elem){
	elem.onmouseover=function(e){e.target.focus();};
	elem.onmouseout=function(e){ee=e.target;setTimeout(function(){ee.blur();},outDelay);};
}
},false);
