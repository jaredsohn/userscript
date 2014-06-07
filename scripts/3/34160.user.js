// ==UserScript==
// @name           doubanToFudanOPAC
// @include        http://www.douban.com/subject/*
// @include        http://www.douban.com/isbn/*
//
// @description    Add links to FDUlib and Google Book on Douban
//	           
//
// ==/UserScript==
var obj = document.getElementById('info');
var div = obj.getElementsByTagName('div')[0];
childnode = div.childNodes;
for (var i=0; i < childnode.length-1; i++)
{   
if ( childnode[i].innerHTML == "ISBN:" )
break;
}
i++;
var isbn = childnode[i].data;
isbn =isbn.substr(1,13);

//复旦图书馆
var FDULibOpacUrl = "http://202.120.227.6/F/?func=find-m&request="+isbn+"&find_code=ISB&adjacent=N&find_base=FDU01&find_base=FDU09";

//Google Book代码
var GoogleBookUrl = "http://books.google.com/books?vid=ISBN"+isbn;
var obj = document.getElementById('tablerm');
var  InsertPosition= obj.getElementsByTagName('h2')[1];



var  InsertMenu = document.createElement('p');
InsertMenu.innerHTML = "<h2>在哪借/看这本书  ·  ·  ·  ·  ·  ·   </h2>";
InsertMenu.innerHTML +="<div class=indent><li><a href='"+FDULibOpacUrl+"' target='_blank'>复旦大学图书馆</a></li><li><a href='"+GoogleBookUrl+"' target='_blank'>Google Book</a></li></div>";

obj.insertBefore(InsertMenu, InsertPosition);