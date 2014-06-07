// ==UserScript==
// @name           4chan Spam remover
// @namespace      http://userscripts.org/scripts/show/47156
// @include        http://img.4chan.org/*
// ==/UserScript==


	(function() {
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		var contents = posts[i].innerHTML.toLowerCase();
		if ( contents.indexOf("bow down bitches") != -1 || contents.indexOf("anon can suck my dick") != -1 || contents.indexOf("i'll stop when i get 300 subscribers") != -1 || contents.indexOf("who the fuckkkkk are you?") != -1 ||  (contents.indexOf("brix will be shat") && contents.indexOf("tinyurl")) != -1 )
		{
			try {
				posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
				i = i - 1;
			} catch(e) {}
		}
	}
})()