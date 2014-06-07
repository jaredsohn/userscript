// ==UserScript==
// @name            MyAnimeList.net: Com-to-Com Links
// @namespace       http://myanimelist.net/profile/N_Ox
// @description	    Add Com-to-Com link between user and comment user for every comment.
// @include         http://myanimelist.net/profile*
// @include         http://myanimelist.net/comments*
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

var blog_feed = $('.normal_header:contains(RSS)').nextAll().find('a:contains(Blog)[href]');
var url;

if (blog_feed.length)
	url = blog_feed.attr('href');
else
	url = document.location.href;

var i = url.indexOf('id=');
if (i == -1) return;
url = 'http://myanimelist.net/comtocom.php?id1=' + url.substr(i + 3) + '&id2=';

$('div[id^=comBox] > table > tbody > tr').each(function () {
	var avatar = $('.picSurround img', this);
	if (!avatar.length) return;

	var com = $('div[id^=com]:not([id^=comtext])', this);
	if (!com.length) return;
	if (com.children().length == 3) return;

	var id = avatar.attr('src');
	var i = id.indexOf('thumbs/');
	if (i == -1) return;
	id = id.substr(i + 7, id.indexOf('_') - i - 7);

	com.append(
		$('<div style="margin-top:10px"/>').append(
			$('<small/>').append(
				$('<a title="Comment-to-Comment">Com-to-Com</a>').attr('href', url + id))));
});

})();
