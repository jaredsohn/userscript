// ==UserScript==
// @name        Time clock in title bar
// @version     1.4.8
// @namespace   http://userscripts.org/users/497853
// @description Auto add time clock in title bar
// @include     http://*
// @include     https://*
// @grant none
// ==/UserScript==

if (/tunghoanh.com|hixx.info|itruyen.tk/i.test(document.domain)) {

var o_title = document.title;
function time_2_title_bar(){var e=new Date,b=e.getHours(),o=e.getMinutes(),k=e.getSeconds(),v=e.getDate(),f=e.getDay(),M=e.getMonth()+1;e=e.getFullYear();var I="",N="AM";if(b>=12)N="PM";if(b>12)b-=12;if(b==0)b=12;if(b<10)b="0"+b;if(o<10)o="0"+o;if(k<10)k="0"+k;switch(f){case 0:I="Ch\u1ee7 nh\u1eadt, ";break;case 1:I="Th\u1ee9 hai, ";break;case 2:I="Th\u1ee9 3, ";break;case 3:I="Th\u1ee9 4, ";break;case 4:I="Th\u1ee9 5, ";break;case 5:I="Th\u1ee9 6, ";break;case 6:I="Th\u1ee9 7, "}document.title=o_title+" ❂ "+b+":"+o+":"+k+" "+N+" - "+I+v+"/"+M+"/"+e;}
var my_title=setInterval(function(){time_2_title_bar()},1000);
}