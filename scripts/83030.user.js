// ==UserScript==
// @name           CommentBoxOnTop
// @author		   vispillo
// @namespace      vispillo
// @grant          none
// @description    Pins the comment box to the top of the comments, even upon AJAX reload of the comment section.
// @include        *flickr.com/photos/*/*
// @exclude		   *flickr.com/photos/*/alltags*
// @exclude		   *flickr.com/photos/*/organize*
// ==/UserScript==

var comment = document.getElementById('comments');
var content = comment.innerHTML;
comment.insertBefore(document.getElementById('reply'),document.getElementById('comments-list'));
document.getElementById('reply').setAttribute('style','margin-bottom:40px;');
comment.addEventListener('DOMNodeInserted', reloadHandler, true);

function reloadHandler (foo) {
  if (!document.getElementById('reply').hasAttribute('style')) {
		if (comment.getElementsByClassName('comment-deleted').length > 0) {
			//alert('you just deleted a comment, didn\'t you?');
			comment.insertBefore(document.getElementById('reply'),document.getElementById('comments-list'));
      document.getElementById('reply').setAttribute('style','margin-bottom:40px;');
		}
		else if (document.getElementsByClassName('comment-editing').length > 0) {
			//alert('you are editing a post, aren\'t you?');
		}		
		else if (document.getElementsByClassName('previewing-comment').length > 0) {
			//alert('you are previewing a post, aren\'t you?');
		}
		else if (document.getElementsByClassName('new-comment').length > 0) {
			//alert('you just added a comment, didn\'t you?');
			comment.insertBefore(document.getElementById('reply'),document.getElementById('comments-list'));	
      document.getElementById('reply').setAttribute('style','margin-bottom:40px;');
		}
		comment.innerHTML;		
	}
}