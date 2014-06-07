// ==UserScript==
// @name       自动刷新会计继续教育网时间
// @namespace  自动刷新会计继续教育网时间
// @version    0.1
// @description  自动刷新会计继续教育网时间
// @match     http://www.sjdongao.com/*
// @copyright  2013+, loms126
// @run-at document-end
// ==/UserScript==


window.alert   =   function(str){return true;};
function alert(str) {return true;};
unsafeWindow.alert = function alert(message) {
	
		console.log(message);
	
}

window.setTimeout("document.getElementById('botton1').click();",60000);
