// ==UserScript==
// @name           remove window.open
// @namespace      adobe.com
// @include        http://bugs.corp.adobe.com
// ==/UserScript==


links = document.getElementsByTagName('a');
if (links) {
	for (i = 0; i<links.length; i++) {
		
		href = links[i].getAttribute('href');
		
		//onclick = tds[i].firstChild.attributes.getNamedItem('onclick').nodeValue;
		re = /javascript: *void window.open\('([^']*)/;
		//. *)' *,
		match = re.exec(href);
		if (match) {
			links[i].setAttribute('href', match[1]);
		}
		}
	}
