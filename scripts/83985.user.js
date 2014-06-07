// ==UserScript==
// @name		4chan FireGPG Clearsign Fix
// @namespace		ScottSteiner@irc.rizon.net
// @description		Fixes 4chan's breaking of FireGPG clearsigning.  Requires FireGPG https://addons.mozilla.org/en-US/firefox/addon/4645/
// @include		http://boards.4chan.org/*
// @version		18.13.19.02
// @copyright		2010, Scott Steiner
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

posts = document.getElementsByTagName("blockquote");
for (i = 0; i < posts.length; i++) { posts[i].innerHTML = posts[i].innerHTML.replace(/BEGIN.*SIGNED MESSAGE/, 'BEGIN PGP SIGNED MESSAGE'); }