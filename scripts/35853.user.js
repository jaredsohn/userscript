// ==UserScript==
// @name          LeproNamesAndPages
// @namespace     ACTPOHABT (8110), Omen (12643)
// @description   Заменяет скучное "Лепрозорий / Убежище" на номер страницы или юзернэйм.
// @include       http://leprosorium.ru/users/*
// @include       http://leprosorium.ru/users/*/*
// @include       http://www.leprosorium.ru/users/*
// @include       http://www.leprosorium.ru/users/*/*
// @include       http://leprosorium.ru/pages/*
// @include       http://www.leprosorium.ru/pages/*
// @include       http://leprosorium.ru/comments/*
// @include       http://www.leprosorium.ru/comments/*
// @include       http://leprosorium.ru/votes/*
// @include       http://www.leprosorium.ru/votes/*
// @include       http://leprosorium.ru/my/*
// @include       http://www.leprosorium.ru/my/*
// @include       http://leprosorium.ru/
// @include       http://www.leprosorium.ru/
// @include       http://*.leprosorium.ru/comments/*
// @include       http://*.leprosorium.ru/votes/*
// ==/UserScript==

var newtitle='', page, url=document.URL, wannabetitle, karma='не определена', usernumber, length_title=98, pots, i, j=0; // Переменные

if (/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/users\/\d+(\/)?/.test(document.URL)) //страничка с чьим-то профайлом
  {
  wannabetitle=document.getElementsByClassName('username')[0].childNodes[0].innerHTML; // Грузим имярек
  if (/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/users\/\d+(\/)?$/.test(document.URL)) //страничка не с постами, комментами или подлепрами
	{
	karma=document.getElementsByClassName('rating')[0].childNodes[0].innerHTML; //вычисляем карму
	}
  usernumber=document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/users\/(\d+)(\/)?/)[2]; //вычисляем номер юзера
  newtitle=wannabetitle+' ('+usernumber+')'+', Карма: '+karma; //делаем заголовок
  }

if((/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/pages\/1(\/)?$/.test(document.URL))||(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru(\/)?$/.test(document.URL)))  //страничка с главной
  {
  newtitle='Главная / Лепрозорий / Убежище';
  }

if(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/pages\/\d+(\/)?$/.test(document.URL)) // страничка Лепры, но не главная
  {
  page = document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/pages\/(\d+)$/)[2];
  newtitle=page + '-я страница / Лепрозорий / Убежище';
  }
  
if((/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/my(\/)?$/.test(document.URL)))  //страничка с моими вещами
	{
newtitle=document.getElementById('things').childNodes[0].childNodes[0].childNodes[0].innerHTML;
	}

if((/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/my\/socialism(\/)?$/.test(document.URL)))  //страничка с социализмом
	{
  newtitle='Социализм';
	}
	
if((/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/my\/favourites(\/)?$/.test(document.URL)))  //страничка с favourites
	{
  newtitle='Избранное';
	}
	
if((/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/my\/details(\/)?$/.test(document.URL)))  //страничка с details
	{
  newtitle='Личная информация&Настройки';
	}

if((/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/my\/inbox(\/)?$/.test(document.URL)))  //страничка с Инбоксом
	{
	newtitle='инбокс '+document.getElementById('inbox').childNodes[0].childNodes[0].childNodes[0].innerHTML
	}
	
if ((/^http:\/\/([a–zA–Z0–9\.]+)?leprosorium\.ru\/comments\/\d+/.test(document.URL))||(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/my\/inbox\/\d+/.test(document.URL))) //страничка с постом 
	{
	pots=document.getElementsByClassName('dt'); // Грузим посты
	if (pots[j].textContent.length==0) // Проверка на пустой пост (одна картинка например) 
	{j=1;} // Как бы говорим взять первый коментарий, потому что в посте ничерта нет 
	if (pots[j].textContent.length>length_title){ // Есть ли лишние буквы 
	for (i=0;i<=length_title;i++) {newtitle=newtitle+pots[j].textContent[i];} // Да есть, избавимся от них
	newtitle=newtitle.toLowerCase()+'...';} // Ставим обрезанный заголовок	 
	else {newtitle=pots[j].textContent.toLowerCase();} // Или ставим заголовок как есть
	}

if(newtitle != '') {document.title=newtitle;} // Ставим заголовок
