// ==UserScript==
// @name ForumElmoreBanModers
// @description Прячет сообщения от любого пользователя на форумах Elmore.ru
// @author zzeneg
// @license GPL
// @version 1.0
// @include *forumelmore.ru/*
// ==/UserScript==
(function( ) {
	var username='SoundChaser';
	var authors=document.getElementsByClassName('bigusername');
	var banposts=[];
	
	for (var i=0; i<authors.length;i++)
	{
		var author=authors[i];
		
		if (author.innerHTML.indexOf(username)!=-1)
			{
				var post=author.parentNode.parentNode.parentNode;
				banposts.push(post);
				
			}
	}

	for (var j=0; j<banposts.length; j++)
	{
		banposts[j].innerHTML='Пользователь '+username+' забанен лично Вами.';
	}
})();