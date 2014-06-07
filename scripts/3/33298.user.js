// ==UserScript==
// @name		SnakeEyes
// @description	Simplified SnakeEyes browsing.
// @include		http://www.snakeeyes.nu/phpBB2/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; ++i) {
	var element = links[i];
	element.href = element.href.replace(/viewforum\.php/, 'viewforum_content.php');
	element.href = element.href.replace(/viewtopic\.php/, 'viewtopic_content.php');
	element.href = element.href.replace(/posting\.php/, 'posting_content.php');
}

var imgs = document.getElementsByTagName('img');
for (var i = 0; i < imgs.length; ++i) {
	var element = imgs[i];
	if (/http:\/\/www\.snakeeyes\.nu\/images\/avatars\/(.*)\.(\w+)/.test(element.src)) {
		element.src = 'http://www.snakeeyes.nu/images/avatars/burgermeal1222551855.jpg';
	}
}