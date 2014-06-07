// ==UserScript==
// @name    antiCirno
// @include    http://www.iichan.ru/b/*
// @include    http://iichan.ru/b/*
// ==/UserScript==
                              		i=0;
                              		tab=document.getElementsByTagName('span')
                              		while(tab[++i])	
                              		if(tab[i].className=="postername"||tab[i].className=="commentpostername")	tab[i].innerHTML="Анонимус";
                              	