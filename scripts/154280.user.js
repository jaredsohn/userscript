// ==UserScript==
// @name        Youtube - Hide Recommended for you
// @namespace   youtube-hide-recommended-for-you
// @include     *youtube.com/
// @include     *youtube.com/index?ytsession*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==


$("li>div.feed-item-container")  
            .has ("span.feed-item-rec")
			.hide ();

