// ==UserScript==
// @name          The Dilbert Blog comment order reverser
// @namespace     http://henrik.nyh.se
// @description   Reverses the order of comments in The Dilbert Blog, showing the oldest one first. Might or might not be applicable to all TypePad blogs.
// @include       http://dilbertblog.typepad.com/the_dilbert_blog/*/*/*.html*
// ==/UserScript==

var comments = '//div[@class="comments-content"]/div[@class="comment"]';

with_each(comments, function(comment) {
	comment.parentNode.insertBefore(comment, comment.parentNode.firstChild);
});


/* Utility functions */
	
function $x(xpath, root) {  // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}
function with_each(xpath, cb, root) {
	var results = $x(xpath, root);
	for (var i = 0, j = results.length; i < j; i++)
		cb(results[i]);
}

