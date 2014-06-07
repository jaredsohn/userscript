// ==UserScript==
// @name           VKHide
// @description    Скрывает репосты неведомым образом
// @namespace	   http://userscripts.org/scripts/show/106726
// @include        http://vk.com/feed*
// @include        http://vkontakte.ru/feed*
// ==/UserScript==


function hide() {
	var posts = document.querySelectorAll('.post');
	
	for(var i=0; i < posts.length; i++) {
		if(posts[i].querySelector("a.published_by") != null) {
			posts[i].querySelector('.delete_post div').click();
		}
	}	
}

document.addEventListener("DOMContentLoaded", function() {
	var tabs = document.getElementById('feed_news_tabs');

	var killAll = document.createElement('div');
	killAll.className = 'feed_tab';
	killAll.innerHTML = 'Скрыть репосты';

	killAll.addEventListener("click", function() {
		hide();
	} , false );

	setInterval(function () {
		hide(); 
	}, 10000);

	tabs.appendChild(killAll);	
}, false );