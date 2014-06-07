// ==UserScript==
// @name          Sheesh Simulatron
// @description   Quotes every post
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       http://www.nexopia.com/forumviewthread.php?tid=*
// ==/UserScript==

var sigLine = '________________________________';

function getPostUser(body) {
	return $('td.body > div > a.body > b', body).html();
}

function getPostContent(body) {
	var txt = $('td.body.forum_post_container', body).html();
	
	var idx = txt.indexOf(sigLine);
	
	if (idx >= 0) {
		txt = txt.substr(0, idx);
	}
	
	return txt;
}

function getPosts() {
	var a = $('div.forum_post_body_container');
	var b = $('div.forum_post_footer_container');
	
	var n = Math.min(a.length, b.length);
	
	var c = [];
	
	for (var i = 0; i < n; ++i) {
		c.push({
			body: $(a[i]), footer: $(b[i]),
			user: getPostUser($(a[i])),
			content: getPostContent($(a[i]))
		});
	}
	
	return c;
}
 
function makePostBody(user, text) {
	return $('<div class="forum_post_body_container">' +
		'<table width="100%" cellspacing="1" cellpadding="3">' +
			'<tbody><tr>' +
				'<td valign="top" nowrap="" style="width: 100px;" class="body">' +
					'<div style="width: 100px; overflow: hidden;"><a href="/users/Sheesh." class="body"><b>Sheesh.</b></a></div>' +
					'<div style="white-space:normal;width:100px;overflow:hidden">Dick Connoisseur</div>' +
					'- Online -<br>' +
					'<a href="/users/Sheesh." class="header"><img border="0" src="http://images.nexopia.com/gallerythumb/2/3876543/26.jpg"></a>' +
					'<br><br>' +
					'Age <i>22</i>, Male<br>' +
				'</td>' +
				'<td valign="top" class="body forum_post_container">' +
					'<div class="quote"><i>Originally posted by: <b>' +
					user +
					'</b></i><br>' +
					text +
					'</div>' +
				'</td>' +
			'</tr>' +
		'</tbody></table>' +
	'</div>');
}

function quotePosts() {
	var posts = getPosts();
	
	$.each(posts, function (i, post) {
		if (post.user != 'Sheesh.') {
			var el = makePostBody(post.user, post.content);
			el.insertAfter(post.footer);
			var ft = post.footer.clone();
			ft.insertAfter(el);
		}
	});
}

var header = $('div.forum_header_container.header');

if (header.length > 0) {
	var txt = header.text().trim();
	
	if (txt.indexOf('Forums > Off-Topic > Teens >') == 0) {
		quotePosts();
	}
}
