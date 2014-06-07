// ==UserScript==
// @name Hide Google Leftnav Bar
// @description Some people don't like the new navigation on the left hand side of google. They're stupid but this plugin is for them.
// @include http://www.google.com/*
// @include http://google.com/*
// ==/UserScript==

	var hi = document.getElementById('leftnav');
	    hi.style.display="none";