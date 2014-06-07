// ==UserScript==

// @name           emploi-kun must die

// @description    Fuck yeah!

// @namespace      http://dobrochan.ru/

// @include        http://dobrochan.ru/*

// ==/UserScript==




bad_posts = document.getElementsByClassName('message');

for(var i = 0; i < bad_posts.length; i++){
	if(bad_posts[i].innerHTML.search('(emploi\-kun)|(еmрlоі\-kun)|(еmрlоi\-kun)') != -1){
		parrent = bad_posts[i].parentNode.parentNode.parentNode.parentNode.parentNode;
		if(parrent.className == 'replypost'){
			parrent.style.display = 'none';
		}
	}
}