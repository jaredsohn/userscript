// ==UserScript==

// @name           4chan Spam Blocker

// @namespace      http://www.userscripts.org

// @description    Blocks 4chan spam, Updated semi-regularly

// @include        http://*4chan.org*

// ==/UserScript==
(function() {

	var posts = document.getElementsByTagName("blockquote");

	for (i = 0; i < posts.length; i++)

	{

		if (posts[i].innerHTML.indexOf("I respect your position, but seriously, check out this CP") != -1 || posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=KcK2hRtIQ3E") != -1 || posts[i].innerHTML.indexOf("(no underage b&, I promise) *wink wink*") != -1 || posts[i].innerHTML.indexOf("pr0n to you,") != -1 || posts[i].innerHTML.indexOf"http://cardsharkisland.com") != -1 || posts[i].innerHTML.indexOf("here's how to hack") != -1 || posts[i].innerHTML.indexOf("want some porn?") != -1 || posts[i].innerHTML.indexOf("By golly, good chap, check this out!") != -1 || posts[i].innerHTML.indexOf("wan sum cp?") != -1 || posts[i].innerHTML.indexOf("porn dump") != -1 || posts[i].innerHTML.indexOf("learn to make her orgasm?") != -1 || posts[i].innerHTML.indexOf("orgasm vid") != -1 || posts[i].innerHTML.indexOf("squirt vid") != -1 || posts[i].innerHTML.indexOf("you're not an oldfag 'til you've seen this") != -1 || posts[i].innerHTML.indexOf("want some CP?") != -1 || posts[i].innerHTML.indexOf("learn to hack") != -1 || posts[i].innerHTML.indexOf("learn to make her orgasm") != -1 || posts[i].innerHTML.indexOf("#/b/ @ irc.slacknet.org) != -1)

		{

			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);

			i = i - 1;

		}

	}

})()