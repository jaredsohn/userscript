// ==UserScript==
// @name           DoublePaginator
// @namespace      vispillo
// @description    Duplicate the paginator so it appears at the top of the comments section too.
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

checkAndDuplicate();
document.getElementById("comments").addEventListener('DOMNodeInserted', checkAndDuplicate, true);

function checkAndDuplicate () {
	paginator = document.getElementsByClassName('Pages');
	if (paginator.length == 1) {
		two = paginator[0].cloneNode(true);
		document.getElementById('comments').insertBefore(two,document.getElementById('photo-activity'));
	}
}
