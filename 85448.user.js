// ==UserScript==
// @name           FlickrMetaButtonsBelowComments
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
}
addGlobalStyle('#comments p.comment-head {margin-bottom:0px !important}');
addGlobalStyle('div.comment-body p {clear:both;}');
moveMeta();
comment = document.getElementById('comments');
comment.addEventListener('DOMNodeInserted', moveMeta, true);

function moveMeta () {
	var small = document.getElementsByClassName('comment-meta');
	for (i in small) {
		if (small[i].getAttribute('meta_below') != 'yes') {
			var parent = small[i].parentNode.parentNode;
			small[i].setAttribute('meta_below','yes');
			parent.insertBefore(small[i],null);	
		}
	}
}
