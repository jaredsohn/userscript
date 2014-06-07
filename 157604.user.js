// ==UserScript==
// @name        Fresh Baidu
// @namespace   std
// @description 清爽的百度首页
// @include     http://www.baidu.com/
// @version     1
// ==/UserScript==

//消除不必要元素
document.getElementById('ftCon').style.visibility='hidden';
document.getElementById('lk').style.visibility='hidden';
document.getElementById('nv').style.visibility='hidden';
document.getElementById('u').style.visibility='hidden';
document.getElementById('lg').style.visibility='hidden';
document.getElementById('lm').style.visibility='hidden';

//调整搜索栏位置
var fm=document.getElementById('fm');
fm.style.paddingTop='-20px';
fm.style.paddingLeft='170px';
fm.style.paddingRight='110px';
//调整搜索栏大小
var wrt=document.getElementsByTagName("SPAN"); 
wrt[1].style.width='310px';

var input=document.getElementsByTagName("input"); 
input[0].style.width='298px';






















