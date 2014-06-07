// ==UserScript==

// @name  Onsite links in same window

// @namespace http://diveintomark.org/projects/greasemonkey/

// @description Force onsite links to open in the same window

// @include *://*

// ==/UserScript==



var NUMBER_OF_PARTS = 2; 



	var sCurrentHost = window.location.host;

	var arParts = sCurrentHost.split('.');

	if (arParts.length > NUMBER_OF_PARTS) {

		sCurrentHost = [arParts[arParts.length - NUMBER_OF_PARTS],

				arParts[arParts.length - 1]].join('.');

	}

	var arLinks = document.getElementsByTagName('a');

	for (var i = arLinks.length - 1; i >= 0; i--) {

		var elmLink = arLinks[i];

		var sHost = elmLink.host;

		if (!sHost) { continue; }

	var arLinkParts = sHost.split('.');

		if (arLinkParts.length > NUMBER_OF_PARTS) {

			sHost = [arLinkParts[arLinkParts.length - NUMBER_OF_PARTS],

				 arLinkParts[arLinkParts.length - 1]].join('.');

		}

	if (sHost == sCurrentHost && ",_blank,_parent,_self,_top".indexOf(","+elmLink.target)!=-1) elmLink.removeAttribute("target");

	}