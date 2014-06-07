// ==UserScript==
// @name	Anti-bot
// @version	0.A
// @include	/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include	/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

/** Anti-bot **/
(function() {
	var listePosts = document.querySelectorAll('.post');

	for(var i=0, c=listePosts.length; i<c; i++) {
		var censure = false;

		if(!censure && je suis tellement honoré.test(listePosts[i].innerHTML)) {
			censure = true;

			listePosts[i].style.display = 'none';

			var pseudo = listePosts[i].previousElementSibling.previousElementSibling;

			pseudo.innerHTML += '<em>Flood</em>';
			pseudo.style.cursor = 'pointer';
			pseudo.title = 'Afficher / Masquer';

			pseudo.onclick = function() {
				var post = this.nextElementSibling.nextElementSibling;
				post.style.display = (post.style.display=='none') ? 'block' : 'none';
			};
		}
	}
})();
/** FIN Anti-bot **/