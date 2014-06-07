// ==UserScript==
// @name          豆瓣音乐2虾米插件
// @version	   1.9
// @include       http://music.douban.com/subject/*
// ==/UserScript==

var title=document.title;
var title1 = title.replace( '(豆瓣)', '' ).trim();
var reg = /(\(.+?\))/ig;
var title2=title1.replace(reg,'');
var reg1 = /(\[.+?\])/ig;
var title3=title2.replace(reg1,'');
var reg2 = /(\【.+?\】)/ig;
var title4=title3.replace(reg2,'');
var reg3 = /(\（.+?\）)/ig;
var title5=title4.replace(reg3,'');
var title6=title5.replace('&','%26');
var title7=title6.replace('?','%3F');
var title8=title7.replace('Pt. 1','');
var title9=title8.replace('Pt. 2','');



var div = document.getElementById("info");
if (div.children[0].innerHTML=="又名:")
{
var div1=div.children[2].innerHTML;
}
else
{
var div1=div.children[0].innerHTML;
}
var re=/<[^>]+>/gi;
var div2=div1.replace(re,'');
var div3=div2.replace('表演者:','').trim();
var biaodian=div3.indexOf('/');

var board = document.getElementById("info");
var e = document.createElement("input");
e.type = "button";
e.value = "在虾米中搜索该专辑";
e.style.backgroundColor="#e8ede9";

if(biaodian<0)
{
e.onclick=function(){
window.open('http://www.xiami.com/search/find?artist='+div3+'&album='+title9+'',"_blank"); 
}    
}
else
{
e.onclick=function(){
window.open('http://www.xiami.com/search/find?album='+title9+'',"_blank"); 
}
}

var object = board.appendChild(e);