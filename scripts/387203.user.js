// ==UserScript==
// @name          My LJ Style
// @description   Modify all LiveJournal pages to your style.
// @include       http://*.livejournal.com/*
// @exclude       http://*.livejournal.com/*s2id=*
// @exclude       http://*.livejournal.com/tag/*
// @exclude       http://users.livejournal.com/*/tag/*
// @exclude       http://www.livejournal.com/*
// @exclude       http://pics.livejournal.com/*
// @exclude       http://l-pics.livejournal.com/*
// @exclude       http://l-userpic.livejournal.com/*
// @exclude       http://*.livejournal.com/*profile
// @exclude       http://l-stat.livejournal.com/*
// @exclude       http://stat.livejournal.com/*
// @exclude       http://*.livejournal.com/data/*
// @exclude       http://*.livejournal.com/*.bml*
// @exclude       http://*.livejournal.com/*style=*
// @exclude       http://*.livejournal.com/*format=*
// @exclude       http://maps.livejournal.com/*
// @exclude       http://*/*.livejournal.com/*
// @exclude       http://*.*.livejournal.com/*

// ==/UserScript==

(function() {
		var s = window.location.search;
	    window.location.replace(((s?s+'&':'?')+'format=light') + window.location.hash);
})();