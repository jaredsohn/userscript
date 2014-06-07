// ==UserScript==
// @name           opaque_flash
// @namespace      http://nodegarden.net/
// ==/UserScript==

(function() {
for (var ems = document.embeds, i = 0, em; em = ems[i]; i++) {
	em.setAttribute('wmode', 'transparent');
	var nx = em.nextSibling, pn = em.parentNode;
	pn.removeChild(em);
	pn.insertBefore(em, nx);
}
}) ();