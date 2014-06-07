// ==UserScript==
// @id             lor-fixer
// @name           LOR fixer
// @version        1.1
// @namespace      
// @author         Tenno Seremel
// @description    
// @include        http://www.linux.org.ru/forum/*
// @include        https://www.linux.org.ru/forum/*
// @exclude        http://www.linux.org.ru/forum/linux-org-ru/*
// @exclude        https://www.linux.org.ru/forum/linux-org-ru/*
// @run-at         document-end
// @homepage http://userscripts.org/scripts/show/477109
// @updateURL http://userscripts.org/scripts/source/477109.user.js
// ==/UserScript==
(function(){
	var pinned_posts = document.querySelectorAll('.message-table img[alt="Прикреплено"]');
	for(i = 0, len = pinned_posts.length; i < len; i++) {
		pinned_posts[i].parentNode.parentNode.style.display = "none";
	}
})();
