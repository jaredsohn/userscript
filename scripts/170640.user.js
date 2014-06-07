// ==UserScript==
// @name Library.Dynamic.Script.Fri
// @description 动态插入脚本，并执行回调函数。
// ==/UserScript==

function insertScript(address, callback, delay){
	let s = document.createElement('script');
	s.type='text/javascript';
	s.src = address;
	document.body.appendChild(s);
	setTimeout(callback, delay);
};