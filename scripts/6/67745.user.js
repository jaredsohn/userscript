// ==UserScript==
// @name           TargetKiller
// @namespace      http://userscripts.org/users/splurov/
// @include        *
// ==/UserScript==

(function(){

for (
	var links = document.links,
			linksLength = links.length,
			i = 0;
	i < linksLength;
	i++
) {
	if (links[i].target == '_blank') {
		links[i].removeAttribute('target');
	}
}

})();