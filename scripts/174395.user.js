// ==UserScript==
// @name           Bilibili下载器
// @description    直接在Bilibili网页上显示下载按钮
// @namespace      http://www.sylingd.com/
// @version        1.0
// @include        http://www.bilibili.tv/video/av*
// @run-at         document-end
// ==/UserScript==
var url=window.location.href;
var avnum=url.match('\/av\\d+\/');
var num1=avnum[0].match('\\d+');
var indexnum=url.match('index_\\d+.html');
if (indexnum==undefined || indexnum=="" || indexnum==null) {
var num2=1;  
} else {
var num2=indexnum[0].match('\\d+');
}
var tourl='http://bae.syun.ml/project/bilibili/down.php?id='+num1+'&count='+num2;
var my=document.createElement("div");
document.body.appendChild(my);
my.style.position="absolute";
my.style.top='50%';
my.style.margin='-50px 0 0 0';
my.style.left=0;
my.style.backgroundColor="rgb(63,188,239)";
my.style.height=30;
my.style.zIndex=999;
my.style.width=90;
my.innerHTML='<a style="text-decoration:none;line-height:30px;color:white;font-size:20px;font-weight:bold;" href="'+tourl+'" target="_blank">立即下载</a>';