// ==UserScript==
// @name           gmailscrollspeedup
// @namespace      http://ivan.homelinux.org
// @description    GMail optimize scrolling of Conversation view by removing next author tag
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*
// ==/UserScript==

window.showimg = function() {
	imgs = document.images;
	for (i = 0; i < imgs.length; i++) {
  	   if (imgs[i].src.match('images/dn-w.gif')) {
	      div = imgs[i].parentNode.parentNode;
	      document.body.removeChild(div);
	      return;
	   }
	}
	setTimeout(showimg, 1000);
}

window.addEventListener('load', function() {
    if (document.getElementById('canvas_frame')) {
       //alert('Greasemonkey detected!');
       setTimeout(showimg, 1000);
    }
}, true);

