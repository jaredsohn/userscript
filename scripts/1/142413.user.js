// ==UserScript==
// @name	Anti-bot by kornflexx
// @version	1.0
// @include	/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include	/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

/** Anti-bot **/
(function() {

	var Posts = document.querySelectorAll('.post');
	for(var i=0, c=Posts.length; i<c; i++) 
		{		
			var div=Posts[i].parentNode.parentNode;
			
					var ht=getComputedStyle(div,null).height;
					var nombre=parseFloat(ht);
					if (nombre>3000)
					{

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