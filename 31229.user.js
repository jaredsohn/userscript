// ==UserScript==
// @name           Facebook.com - image2profile linker
// @namespace      http://userscripts.org/scripts/show/31229
// @description    adds a link to the corresponding profile of a shown images
// @include        http://*.facebook.com/*
// ==/UserScript==

// all credits belong to Mikado
// http://userscripts.org/users/31647/scripts
// thank you very much for your big support!

function process() {
	document.body.removeEventListener('DOMNodeInserted', process, false);
		for (var i = 0; i < document.images.length; i++) {
			var ci = document.images[i], cid;
			if ((cid = ci.getAttribute('uid')) && (ci.parentNode.tagName != 'A')) {
				var cl = document.createElement('a');
				cl.href = 'http://www.new.facebook.com/profile.php?id=' + cid;
                                cl.target = '_blank';
				ci.parentNode.insertBefore(cl, ci).appendChild(ci);
			}
		}
	document.body.addEventListener('DOMNodeInserted', process, false);
}

process();
