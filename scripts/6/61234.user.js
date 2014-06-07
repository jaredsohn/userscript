// ==UserScript==
// @name           doubanToSCUOPAC
// @include        http://www.douban.com/subject/*
// @include        http://www.douban.com/isbn/*
//
// @description    Add links to SCUlib and Google Book on Douban
//	           
//
// ==/UserScript==

















$(document).ready(function(){
	if ($('#nav a.now span').text() == "读书") {
		// get book isbn
		$("#info .obmo .pl").each(function(i){
			if ($(this).text() == 'ISBN:'){
			  var isbn = $(this)[0].nextSibling.nodeValue;
			  isbn = isbn.substr(1,13);

//四川大学图书馆
var scuLibOpacUrl = "http://202.115.54.13:8080/F/?func=find-m&request="+isbn+"&find_code=ISB&adjacent=N&find_base=scu01&find_base=scu09";

//Google Book代码
var GoogleBookUrl = "http://books.google.com/books?vid=ISBN"+isbn;
var obj = document.getElementById('tablerm');
var  InsertPosition= obj.getElementsByTagName('h2')[1];



var  InsertMenu = document.createElement('p');
InsertMenu.innerHTML = "<h2>在哪借/看这本书  ·  ·  ·  ·  ·  ·   </h2>";
InsertMenu.innerHTML +="<div class=indent><li><a href='"+scuLibOpacUrl+"' target='_blank'>四川大学图书馆</a></li><li><a href='"+GoogleBookUrl+"' target='_blank'>Google Book</a></li></div>";

obj.insertBefore(InsertMenu, InsertPosition);
