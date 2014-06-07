// ==UserScript==
// @name           Wikipedia Donation Remover
// @version        0.1
// @date           2007-11-25
// @include        http://*.wikipedia.org/w*
// ==/UserScript==
sitenote=document.getElementById('siteNotice');
if (sitenote)
	sitenote.parentNode.removeChild(sitenote);
