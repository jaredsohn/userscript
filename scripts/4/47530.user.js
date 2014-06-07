// ==UserScript==

// @name           Kunstfilter
// @namespace      http://www.userscripts.org
// @description    Blendet auf StudiVZ in der Gruppe 'Schakke-line, komm wech von die Regale, du Arsch' im Thread 'Bilder, Bilder...nichts als Bilder' alle Beitraege von Nutzern mit 'Vercetti' im Namen aus. This is a dirty modification of *chan.js Spam Buster by thewhiteknight.
// @include        http://www.studivz.net/Forum/ThreadMessages/f7c91a33496fdefe/18fb9edfdcae016e*
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("a");
	for (i = 0; i < posts.length; i++)
	{
		if (posts[i].innerHTML.indexOf("Vercetti") != -1 )
		{
			posts[i].parentNode.parentNode.removeChild(posts[i].parentNode);
			i = i - 1;
		}
	}
})()