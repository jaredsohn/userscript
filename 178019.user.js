// ==UserScript==
// @name        申请新供应商
// @namespace   http://diveintogreasemonkey.org/download/
// @description 供销平台申请新供应商辅助
// @include     http://gongxiao.tmall.com/*
// @version     1
// ==/UserScript==

/*var acceptLisence = document.getElementById('J_license_accept'); 
/*document.getElementById('J_license_accept').checked=true;*/
/*var button=document.getElementById('J_submit');
button.click();
document.getElementById('J_submit').click();
button.click();*/
window.setTimeout(function(){document.getElementById('J_license_accept').checked=true;document.getElementById('J_submit').click();},5000)