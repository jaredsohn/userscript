// ==UserScript==
// @name           XuanFeng HTTP Download
// @author         ckz1211
// @namespace      ckz1211@gmail.com
// @description    Make the HTTP Download on XuanFeng files which are larger than 10M available.
// @version        1.0.0
// @create         2013-06-11
// @lastmodified   2013-06-11
// @include        http://fenxiang.qq.com/x/*
// @copyright      2013+, ckz1211
// ==/UserScript==

(function(){
var c=window.confirm,i=document.querySelectorAll('.file_list>TD>A'),j;
window.confirm=function(e){
return e.indexOf('最新版')==-1?c(e):0
};
for(j=i.length-1;j>-1;j--)
i[j].addEventListener('click',function(e){
start_normal_down(this.title,this.getAttribute('filehash'))
},false)})();