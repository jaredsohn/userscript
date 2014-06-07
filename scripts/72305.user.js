// ==UserScript==
// @name Очиститель Башорга
// @version 1.0
// @namespace /dev/head
// @description Даешь башорг без рекламы!
// @author Зарипов Камиль
// @include http://bash.org.ru/*
// @include http://bash.org.ru/*
// @include http://*.bash.org.ru/*
// @include http://*.bash.org.ru/*
// ==/UserScript==

document.getElementById('bar').style.display='none';

for (i=0; i<=document.getElementsByClassName('q').length; i++) {
	if (document.getElementsByClassName('q')[i].getElementsByTagName('div')[0].getAttribute('class')!='vote')
		document.getElementsByClassName('q')[i].getElementsByTagName('div')[0].style.display='none';
}

//Может и не место... Но занай Камила, я тебя люблю...
