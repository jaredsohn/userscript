// ==UserScript==
// @name        repalcermdt
// @author      M沐灬yu丶(wy90314@163.com)
// @include     http://tieba.baidu.com/*
// @version     1.02
// ==/UserScript==

var objA = document.getElementsByTagName("a");
var m="^http://tieba.baidu.com/i/([0-9]{9})$";
var reg=new RegExp(m);
for(var i=0;i<objA.length;i++){
 var str=objA[i];
 if(str.href.search(reg)!=-1){
 	str.href=str.href+"/allfeed";
}
}
