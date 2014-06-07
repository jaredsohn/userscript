// ==UserScript==
// @name           Unfollow ALL the users
// @namespace      http://userscripts.org/users/65153
// @include        http://activeden.net/user/Joost
// @include        http://graphicriver.net/user/Joost
// @include        http://codecanyon.net/user/Joost
// @include        http://audiojungle.net/user/Joost
// @include        http://3docean.net/user/Joost
// @include        http://videohive.net/user/Joost
// @include        http://photodune.net/user/Joost
// ==/UserScript==


var token = document.getElementsByName('csrf-token')[0];
var links = document.getElementsByClassName('following')[0].getElementsByClassName('avatar');
for(a in links) {
	GM_xmlhttpRequest({
		method: "post",
		url: links[a] + "/unfollow",
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: "utf8="+encodeURIComponent("&#x2713;")+"&authenticity_token="+encodeURIComponent(token.content),
	});
}
if (links.length == 9)
	setTimeout("location.reload(true);", 4000);