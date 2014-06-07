// ==UserScript==
// @name           Добавить пост в мои вещи не отходя от глагне
// @author         http://leprosorium.ru/users/antyrat
// @namespace      http://leprosorium.ru/
// @description    Добавляет навигацию "в мои вещи"  на глагне
// @include        http://leprosorium.ru/
// @include        http://*.leprosorium.ru/
// @include        http://leprosorium.ru/pages/*
// @include        http://*.leprosorium.ru/pages/*
// @include        http://lepra.ru/
// @include        http://*.lepra.ru/
// @include        http://lepra.ru/pages/*
// @include        http://*.lepra.ru/pages/*
// ==/UserScript==

	//http://javascript.about.com/library/bldom08.htm
	if (!document.getElementsByClassName){
		document.getElementsByClassName = function(cl) {
		var retnode = [];
		var myclass = new RegExp('\\b'+cl+'\\b');
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
		}; 
	}

	var commentsBlocks = document.getElementsByClassName('p');
	for(var i=0; i<commentsBlocks.length;i++) {
		str = commentsBlocks[i].innerHTML;
		postId = commentsBlocks[i].parentNode.parentNode.id.replace("p","");
		commentsBlocks[i].innerHTML = str+'<span>| <a onclick="mythingsHandler.fav(\'add\', \''+postId+'\', this); return false;" href="#">в мои вещи</a></span> |';
	}	