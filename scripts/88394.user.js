// ==UserScript==
// @name           SecKill for ChinaMobile
// @author         Garphy
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://gd.10086.cn/win/baiwan/index.asp
// ==/UserScript==
function get(){
	var timer = parseInt(document.getElementById('lastTimes').getElementsByTagName('span')[0].innerHTML);
	var o = document.getElementById('killBt');
	var code = document.getElementById('rndcode');
	var delay = timer<2 ? 1:1000;
	if(timer==0 && parseInt(code.value)>0){
		var ev = document.createEvent('MouseEvents');
		ev.initEvent('click', true, true);
		o.dispatchEvent(ev);
		code.value = '';
	}
	window.setTimeout( get ,delay);
}
window.setTimeout( get ,500);