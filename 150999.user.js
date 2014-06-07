// ==UserScript==
// @name        Twitter: search user helper
// @author      your_mother
// @version     1.0
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// ==/UserScript==

	var screenname = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');

	var trgt = document.evaluate('//span[@class="screen-name"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var newspan = trgt.appendChild(document.createElement('span'));
		newspan.setAttribute("id", 'usersearch');
		newspan.setAttribute("style", 'font-size: 0.6em !important; font-style: italic !important;');
		newspan.innerHTML = "<br /><a href='http://twitter.com/search?q=%40" + screenname + "'>@" + screenname + "</a>, <a href='http://twitter.com/search?q=%23" + screenname + "'>#" + screenname + "</a>, <a href='http://twitter.com/search/realtime?q=" + screenname + "'>realtime:" + screenname + "</a>, <a href='http://twitter.com/search?q=" + screenname + "'>top:" + screenname + "</a>, <a href='http://twitter.com/search/users/" + screenname + "'>users:" + screenname + "</a>";
		newspan.title = "Search (" + screenname + ") on Twitter!";