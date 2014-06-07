// ==UserScript==
// @name           MCE Viewer
// @description    MarkdownColorExtension Viewer
// @namespace      klavogonki
// @include        http://klavogonki.ru/u/*
// @author         Fenex
// @version        1.5
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
(function() {
	setInterval(function() {
		var a = document.querySelectorAll('a[title]');
		
		for(var i=0; i<a.length; i++) {
			var title = a[i].getAttribute('title');
			if(!title)
				continue;
			var color = title.match(/^!mce.* color=(#?[A-z0-9]+)/i);
			var bgcolor = title.match(/^!mce.* bgcolor=(#?[A-z0-9]+)/i);
			if(color && color[1])
				color = color[1];
			if(bgcolor && bgcolor[1])
				bgcolor = bgcolor[1];

			if(!color && !bgcolor) continue;

			a[i].removeAttribute('href');
			a[i].removeAttribute('title');
			a[i].style.textDecoration = 'none';
			a[i].style.cursor = 'text';
			if(color)
				a[i].style.color = color;
			if(bgcolor)
				a[i].style.background = bgcolor;

		}
	}, 500);
})();