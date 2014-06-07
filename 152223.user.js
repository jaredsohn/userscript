// ==UserScript==
// @name       lepronextnewcomment
// @namespace  http://leprosorium.ru/users/redux
// @version    0.1
// @description  o_o
// @match      http://leprosorium.ru/comments/*
// @copyright  2012+, Alexey Prilepskiy
// ==/UserScript==
var news = document.getElementsByClassName('new');
var count = news.length
var link = [];
var anchor = [];
for (var i=0; i<count-1; i++) {
	link[i] = document.createElement('a');
	anchor[i] = document.createElement('a');
	link[i].innerHTML = '>';
	anchor[i].setAttribute('name','new_'+i);
	link[i].setAttribute('href', '#new_'+(i+1));
	var curent = news[i];
	curent.getElementsByClassName('p')[0].appendChild(link[i]);
	curent.insertBefore(anchor[i], curent.getElementsByClassName('dt')[0]);
}