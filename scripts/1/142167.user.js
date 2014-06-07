// ==UserScript==
// @name			Anti-bot
// @version			0.9.2
// @include			/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include			/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

/** Anti-flood **/

(function() {
	var listePosts  = document.querySelectorAll('.post');

	function substr_count(haystack, needle, offset, length) {

		var pos = 0, cnt = 0;

		if(isNaN(offset))
			offset = 0;
		if(isNaN(length))
			length = 0;

		offset--;
		while( (offset = haystack.indexOf(needle, offset+1)) != -1 ) {
			if(length > 0 && (offset+needle.length) > length)
				return false;
			else
				cnt++;
		}

		return cnt;
	}


	for(var i=listePosts.length-1; i>=0; i--) {
		var censure = false;

		// Messages blancs et Madgicforum
		if(!censure && (substr_count(listePosts[i].textContent, 'M4GICFORUM')>5 || /(( ?<br( \/)?>( |\n)?){25})|([m6dgicFORUM ]{5,})/.test(listePosts[i].innerHTML))) {
			listePosts[i].style.display = 'none';
			listePosts[i].previousElementSibling.previousElementSibling.innerHTML += '<em>Flood</em>';
			censure = true;
		}

		// Toggle des messages
		if(censure) {
			var pseudo          = listePosts[i].previousElementSibling.previousElementSibling;
			pseudo.style.cursor = 'pointer';
			pseudo.title        = 'Afficher / Masquer';
			pseudo.onclick      = function() {
				var post = this.nextElementSibling.nextElementSibling;
				post.style.display = (post.style.display=='none') ? 'block' : 'none';
			};
		}
	}
})();
/** FIN Anti-flood **/