// ==UserScript==
// @name          LeproPreview
// @author     	  Vizzy
// @namespace	  http://leprosorium.ru/users/Vizzy
// @description   Смотрим, что в посте, не уходя с глагне
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// @include		  http://leprosorium.ru/my/
// @include		  http://leprosorium.ru/users/*/posts/
// @exclude		  http://*.leprosorium.ru/comments/*
// @exclude		  http://leprosorium.ru/comments/*

// ==/UserScript==

var posts, postParent, postURL, postLink, linkText; 

function createLink (postURL) {
	linkText = document.createTextNode('что там?');
	
	postLink = document.createElement('a');
//	postLink.setAttribute('href', '#'); с этим методом какая-то непонятная херня, лень разбираться
	postLink.setAttribute('onclick', "window.open('" + postURL + "', '', 'width=800px, height=600px, resizable, scrollbars');");
	postLink.appendChild(linkText);
	
	return postLink;
}

function appendPreviewLink()
{
	posts = document.getElementsByClassName('dt');
	for (x in posts)
	{
		postParent = posts[x].parentNode; //берем parent поста
		try
		{
			postURL = postParent.childNodes[3].childNodes[1].getElementsByTagName('span')[0].getElementsByTagName('a')[1].getAttribute('href');
			//postParent - общий div, childNodes[3] - div 'dd', его второй childNode - 'p', потом берем первый <span>, а оттуда уже ссылку на новые комментарии
		} catch (err) {
			postURL = postParent.childNodes[3].childNodes[1].getElementsByTagName('span')[0].getElementsByTagName('a')[0].getAttribute('href');
			//если новых комментариев нет, то просто возьмем ссылку на пост
		}
		
		postParent.childNodes[3].childNodes[1].appendChild(document.createTextNode(' | '));
		postParent.childNodes[3].childNodes[1].appendChild(createLink(postURL));
		postParent.childNodes[3].childNodes[1].appendChild(document.createTextNode(' '));
	}
}

appendPreviewLink();

	

