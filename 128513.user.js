// ==UserScript==
// @id             quote-post
// @name           What.CD : Quote Post
// @version        1
// @namespace      xrated
// @author         xrated
// @description    Make it even easier to quote post!
// @include        http*://*what.cd/forums.php*
// ==/UserScript==

(function() {
        var d         = document;
	var $posts    = d.querySelectorAll('.forum_post');
	var $postForm = d.getElementById('quickpostform') ;
	if($posts.length > 0) {
		for(i in $posts) {
			var $post      = $posts[i];
			var id         = $post.getAttribute('id');
			var a          = d.createElement('a');
			var $postItems = d.querySelectorAll('tbody tr.colhead_dark td span');
			var username   = d.querySelectorAll('tbody tr.colhead_dark td span strong a')[0].innerHTML;
			
			a.innerHTML = '[Post Quote]';
			a.onclick = function(e) {
				e.preventDefault();
				Quote(id, username);
				$postForm.submit();
			};
			
			$postItems.appendChild(a);
		}
	}
})();