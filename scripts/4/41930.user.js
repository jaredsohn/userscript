// ==UserScript==
// @name		GardenWeb Forums Block User
// @version		0.0.2
// @description	Hide all comments from useless users 
// @include		http://forums.gardenweb.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	var removeUser = function(userId) {
		var posts = $('a[href$=/' + userId + ']'); //href ends with /userid
		for (var i = 0; i < posts.length; i++) {
			var id = posts[i].id;
			if (id && id.indexOf('GWCPostAuthor') == 0) {
				//if it's the first post we're in trouble, they have bad html
				if (id == 'GWCPostAuthor')
					$(posts[i]).html('blocked user');
				else
					$('#' + id).parent().html('user post removed');
				var bodyId = id.replace('Author', 'Body');
				$('#' + bodyId).attr('style', 'visibility:hidden'); //or display:none
			}
		}
	};
	removeUser('anoyinguser1');
	removeUser('anoyinguser2');
});
