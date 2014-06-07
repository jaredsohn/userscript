// ==UserScript==
// @name           @Удалить "День рождения пользователя"
// @namespace      GC_bdpr
// @description    Удаляет фразу "День рождения пользователя" из календаря Google
// @include        https://www.google.com/calendar/*
// @include        http://www.google.com/calendar/*
// ==/UserScript==

function main()
{
	document.body.innerHTML = document.body.innerHTML.replace(/День рождения пользователя/g,'');
}
main();