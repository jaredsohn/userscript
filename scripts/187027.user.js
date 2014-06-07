// ==UserScript==
// @name       诚通网盘屏蔽广告修复提交
// @namespace  
// @version    0.4
// @description  
// @match      http://www.400gb.com/*
// @copyright  2014+, Jast
// ==/UserScript==

if(location.href.indexOf('com/file')>-1){
	document.forms["user_form"].onsubmit=true;
	document.getElementById('ad_right_side').innerHTML='';
}
document.getElementsByClassName('help-dialog')[0].innerHTML='';
document.getElementById('bdshare_js').innerHTML='';
var pr = document.getElementById('bdshare_js');
pr.parentNode.removeChild(pr);