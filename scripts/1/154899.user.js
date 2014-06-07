// ==UserScript==
// @name          	Block comments on antipope.org
// @namespace     	http://valerieaurora.org
// @description   	Block Dirk Bruere's comments on Charlie Stross's blog
// @include       	http://www.antipope.org/*
// @grant       	none
// ==/UserScript==
//
// Released under GPL v 3.0
// Author: Valerie Aurora <valerie.aurora@gmail.com>
//

// All comments are in a div of class "comment"
var all_comments = document.querySelectorAll("div.comment");

if (all_comments) {
	for (var i = 0; i < all_comments.length; i++) {
		var comment = all_comments[i];

		// Dirk Bruere is the author if a child element of this node
		// of class "comment" contains:
		//   <span class="vcard author">dirk.bruere</span>			// 

		var author = comment.getElementsByClassName("author");
		var author_str = author[0].innerHTML;
		var is_dirk = author_str.search("dirk.bruere");
		if (is_dirk != -1) {
			comment.style.display = 'none';
		}
	}
}