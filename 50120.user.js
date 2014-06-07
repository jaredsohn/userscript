// ==UserScript==
// @name          4chan generic extensible SPAM Blocker
// @namespace     http://www.userscripts.org
// @description   Gets rid of the spam on 4chan, including "I respect your position", and anonidate spam
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	//regular expressions to match against
	var phrases = [];
	phrases[0] = ".*I respect your position, but seriously, check out this CP.*";
	phrases[1] = ".*That's interesting, you should check out this CP though.*";
	phrases[2] = ".*http://www\.An.+nT.+lk\.com/.*";

	var posts = document.getElementsByTagName("blockquote");

	var re = new RegExp(".*/res/.*");
	var index = re.test(window.location);

	for (i = 0; i < posts.length; i++)
	{
		for (x = 0; x <= phrases.length; x++)
		{
			var re = new RegExp(phrases[x]);

			if(re.test(posts[i].innerHTML))
			{
				if (index)
				{
					posts[i].parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode);
				}
				else
				{
					posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
				}
				i--;
				break;
			}
		}
	}
})()