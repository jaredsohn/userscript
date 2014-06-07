// ==UserScript==
// @name           Add Blogs Link to SG
// @namespace      http://suicidegirls.com/members/Conroy/
// @description    Adds a link to your friend's blogs on SG
// @include        http://suicidegirls.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){  
	  
	Username = $('ul.username > li > a').text();
	$('div.links div.left').prepend('<a href="/members/' + Username + '/friends/blogs/">BLOGS</a>   |  ');

}());
