// ==UserScript==
// @name           DC-RU-Board-Sort
// @namespace      blog.laptev.info
// @version       1.01
// @author        rasdol

// @description    DC.RU-BOARD.COM extention
// @include        https://dc.ru-board.com/browse.*
// @include        http://dc.ru-board.com/browse.*
// ==/UserScript==
//
/*
Добавил значок "Добавить в закладки" ко всем выводимым торрентам.
Используйте возможности сортировки торрентов по макету ссылки:
http://dc.ru-board.com/browse.php?sort=X&type=Y

X :
1 - по алфавиту
2 - по количеству файлов
3 - по количеству комментариев
4 - по дате опубликования
5 - по размеру
6 - по количеству скачиваний
7 - по количеству сидеров
8 - по количеству личеров

Y :
desc - по убыванию
asc - по возрастанию
*/
 
var vodka = document.createElement('div');
	vodka.setAttribute('style', 'height:60px; width:187px');
	vodka.setAttribute('action', 'browse.php'); 
	vodka.setAttribute('method', 'get');
var select1 =  document.createElement('select');
	select1.setAttribute('style', 'height:17px; width:187px;');
	select1.setAttribute('align', 'left');
        select1.name = 'sort';


var option1 =  document.createElement('option');
	option1.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option1.text = '1 - по алфавиту';
	option1.value = '1';
select1.appendChild(option1); 
var option2 =  document.createElement('option');
	option2.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option2.text = '2 - по количеству файлов';
	option2.value = '2';
select1.appendChild(option2); 
var option3 =  document.createElement('option');
	option3.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option3.text = '3 - по количеству комментариев';
	option3.value = '3';
select1.appendChild(option3); 
var option4 =  document.createElement('option');
	option4.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option4.text = '4 - по дате опубликования';
	option4.value = '4';
select1.appendChild(option4); 
var option5 =  document.createElement('option');
	option5.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option5.text = '5 - по размеру';
	option5.value = '5';
select1.appendChild(option5); 
var option6 =  document.createElement('option');
	option6.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option6.text = '6 - по количеству скачиваний';
	option6.value = '6';
select1.appendChild(option6); 
var option7 =  document.createElement('option');
	option7.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option7.text = '7 - по количеству сидеров';
	option7.value = '7';
select1.appendChild(option7); 
var option8 =  document.createElement('option');
	option8.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option8.text = '8 - по количеству личеров';
	option8.value = '8';
select1.appendChild(option8); 

var select2 =  document.createElement('select');
	select2.setAttribute('style', 'height:17px; width:187px;');
	select2.setAttribute('align', 'left');
        select2.name = 'type';


var option11 =  document.createElement('option');
	option11.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option11.text = 'desc - по убыванию';
	option11.value = 'desc';
select2.appendChild(option11); 
var option12 =  document.createElement('option');
	option12.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold; background-color: rgb(247, 247, 247);');
        option12.text = 'asc - по возрастанию';
	option12.value = 'asc';
select2.appendChild(option12); 



var input1 =  document.createElement('input');
	input1.setAttribute('type', 'submit');
	input1.setAttribute('style', 'border-style: solid; border-width: 1px; font-family: Verdana; font-size: 8pt; font-weight: bold;');
        input1.setAttribute('value', 'Ok');

vodka.appendChild(select1);  
vodka.appendChild(select2);  
vodka.appendChild(input1); 



var body = document.getElementsByTagName('select'); 
for (var i=0; i<body.length; i++) {
if (body[i].name == "stype") {
  body[i].parentNode.parentNode.appendChild(vodka);
}
}

//Добавим значок "Добавить в закладки" ко всем торрентам на главной странице
 var tof = document.getElementsByTagName('form'); 
 var tot = tof[1].getElementsByTagName('table');
var fav1 = '&nbsp;<a href="http://dc.ru-board.com/bookmark.php?torrent=';  
var fav2 = '"><img src="https://dc.ru-board.com/imgs/bookmarksz.gif" border="0"></a>';
var fav3 = '';
var fav = '';
var ss = '';
var tn ='';
for (var ii=4; ii<tot.length-1; ii++) {
//Найдем номер торрента
ss = tot[ii].childNodes[0].childNodes[0].childNodes[1].innerHTML;
tn = ss.indexOf('id=', 1);
 fav3 = ss.substr(tn+3,5);
//Нашли
fav = fav1+fav3+fav2;
tot[ii].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML = 
tot[ii].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML + fav;

}
  