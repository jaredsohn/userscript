// ==UserScript==
// @name           No Comments
// @description    Försöker dölja kommentarsfält och länkar till desamma från Aftonbladet, Expressen och DN
// @namespace      http://nocomments.se
// @include        *
// ==/UserScript==

// Aftonbladet
hide('aftonbladet.se', '#abArtComSection', true);
hide('aftonbladet.se', '#abArtComProgress', true);
hide('aftonbladet.se', '.abArtCommentsCountTeaser');

// Expressen
hide('expressen.se', '.article-comment');

// DN
hide('dn.se', '#article-readers');
hide('dn.se', '.comments');
hide('dn.se', '.comments-link');

// Sundsvalls Tidning
hide('st.nu', '.comments');

// Dagbladet (Sundsvall)
hide('dagbladet.se', '.comments');

function hide(from, idOrClass, remove) {
	if (window.location.hostname.indexOf(from) != -1) {
		if (idOrClass[0] == '#') {
			var elem = document.getElementById(idOrClass.substring(1));
			if (elem) {
				if (remove) {
					elem.parentNode.removeChild(elem);
				} else {
					elem.style.display = 'none';
				}
			}
		} else {
			var elems = document.getElementsByClassName(idOrClass.substring(1));
			for (var i = 0; i < elems.length; i++) {
				if (remove) {
					elems[i].parentNode.removeChild(elems[i]);
				} else {
					elems[i].style.display = 'none';
				}
			}
		}
	}
}
