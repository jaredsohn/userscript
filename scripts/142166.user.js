// ==UserScript==
// @name	Anti-bot
// @version	2.0
// @include	/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include	/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

/** Anti-bot **/
(function() {
	var listePosts = document.querySelectorAll('.post');

	for(var i=0, c=listePosts.length; i<c; i++) {
		var censure = false;

		if(!censure && (listePosts[i].innerHTML.split("<br>").length) > 25) {
			censure = true;

			listePosts[i].style.display = 'none';

			var pseudo = listePosts[i].previousElementSibling.previousElementSibling;

			pseudo.innerHTML += '<em style="padding:1px;border:1px solid black;">Flood ou message trop long</em> ';
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