// ==UserScript==
// @name BanStupidUsersVkontakte
// @description Выводит предупреждение если страница содержит искомые слова
// @author zzeneg
// @license GPL
// @version 1.0
// @include *vk.com/*
// ==/UserScript==
(function( ) {

	var div=document.getElementById('profile');
	
	var words=['Билан', 'Руки вверх']; //можно добавлять свои слова
	
	var ban=false;
	
	for (var i=0; i<words.length; i++)
	{
		var word=words[i].toLowerCase();
		if (div.innerText.toLowerCase().indexOf(word)!=-1)
			{
				ban=true;
			}
	}
	
	if (ban==true)
	{
		alert("На этой странице найдены подозрительные слова, советую Вам закрыть страницу или вернуться назад в безопасное место.");
	}
})();