// ==UserScript==  
// @name         腾讯新闻反对按钮，你给我出来！
// @author       IamSigma.js@gmail.com  
// @description  把腾讯新闻的反对按钮揪出来。
// @version 1.0.1
// @match http://*.view.qq.com/*
// @match http://*.news.qq.com/*
// @run-at	document-idle
// @downloadURL	https://userscripts.org/scripts/source/134138.user.js
// @updateURL	https://userscripts.org/scripts/source/134138.meta.js
// @homepage	http://g8up.cn
// @contributionURL	https://me.alipay.com/duxing
// @contributionAmount	￥1.00
// ==/UserScript==
function showTencentNewsAntiLink(){
	setTimeout(function(){
		var b=document.querySelectorAll('.bar');
		for(var m=0;m<b.length;m++){
			var a=b[m].getElementsByTagName('a');
			a[1].style.display='block';
		}
	},1000);
}
window.onload = showTencentNewsAntiLink();