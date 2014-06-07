// ==UserScript==
// @name          LeproTitles
// @namespace     leprosorium.ru
// @description   Заменяет скучное "Лепрозорий / Убежище" на текст из открытого поста.
// @include       http://leprosorium.ru/comments/*
// @include       http://www.leprosorium.ru/comments/*
// @include       http://leprosorium.ru/my/inbox/*
// @include       http://www.leprosorium.ru/my/inbox/*
// @exclude       http://leprosorium.ru/my/inbox/
// @exclude       http://www.leprosorium.ru/my/inbox/
// ==/UserScript==

var newtitle='', pots, i, j=0, length_title=101; // Переменные
pots=document.getElementsByClassName('dt'); // Грузим посты
if (pots[j].textContent.length==0) // Проверка на пустой пост (одна картинка например) 
{j=1;} // Как бы говорим взять первый коментарий, потому что в посте ничерта нет 
if (pots[j].textContent.length>length_title){ // Есть ли лишние буквы 
for (i=0;i<=length_title;i++) {newtitle=newtitle+pots[j].textContent[i];} // Да есть, избавимся от них
document.title=newtitle.toLowerCase()+'...';} // Ставим обрезанный заголовок	 
else {document.title=pots[j].textContent.toLowerCase();} // Или ставим заголовок как есть
pots = ''; newtitle = ''; // Убираем за собой
