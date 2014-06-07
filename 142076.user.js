// ==UserScript==
// @name        TVTropes Outbound Links
// @namespace   tvtropes_outbound_links
// @description Modifies outbound links on TVTropes to go directly to their destination.
// @include     http://tvtropes.org/*
// @include     http://*.tvtropes.org/*
// @version     1.0
// ==/UserScript==

function modifyOutboundLinks() {
	var links = document.getElementsByTagName('a');
	var outbound = 'no_outbounds.php?o=';
	var offset = outbound.length;
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		var url = link.href;
		var index = url.indexOf(outbound);
		if (index != -1) {
			var destination = url.substr(index + offset);
			link.href = decodeURIComponent(destination);
		}
	}
}

modifyOutboundLinks();
