// ==UserScript==
// @name		SongMeanings Quick Fix Link
// @namespace		http://www.bingbangboom.us/
// @description		Adds a link to SongMeanings pages to the Incorrect Lyrics/Artists Thread
// @include		http://www.songmeanings.net/*
// ==/UserScript==

// add the link
document.body.innerHTML = document.body.innerHTML.replace(/<!-- end left boxes -->/,
	'<br/><a href="http://www.songmeanings.net/thread.php?tid=12520">Report incorrect</a> lyrics or artists!');