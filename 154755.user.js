// ==UserScript==
// @name        youtube hide recommended sidebar
// @namespace   youtube-hide-recommended-side-bar
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==


$("a.related-video")
			.has ("span:contains('you')")
           	.hide ();