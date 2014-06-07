// ==UserScript==
// @name          Xchar Minifier
// @namespace     http://www.xchar.de/
// @description   Blendet Avatare, Games, About, About2, Blog und Gruppen erstmal aus, sodass nur noch Bilder und das Gästebuch aufgeklappt sind
// @include       http://www.xchar.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

window.addEventListener('load', function(event) {

	/*
		user_wow
		user_avatars
		user_games
		user_gallery
		user_about
		user_about2
		user_blog
		user_groups
	*/
	
	var hides = ['wow', 'avatars', 'games', 'about', 'about2', 'blog', 'groups'];
	
	jQuery.each(hides, function(i, ele) {
		try {
			if ($('#user_'+ele)) $('#user_'+ele).hide();
		} catch(er) {}
	});
}, 'false');
