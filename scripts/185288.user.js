// ==UserScript==
// @name           AC反白终结者
// @namespace      piscat.com
// @description    修改ACFUN页面中白色的字为红色。
// @match          http://*.acfun.*/v/*
// @match          http://*.acfun.*/a/*
// @author         piscat
// @version        1.1
// @grant          none
// ==/UserScript==
window.setTimeout(function(){
var arr = document.getElementsByTagName('font');
var num = arr.length;
for(var i=0;i<num;i++)
{
if(arr[i].color=="#FFFFFF")
arr[i].color="#FF0000";
}}, 6000);
